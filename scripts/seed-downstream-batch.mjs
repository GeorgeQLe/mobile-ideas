#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const manifestPath = path.join(root, "tasks", "repo-seeding.md");
const cloneRoot = path.join(tmpdir(), "mobile-ideas-downstream-seeds");

function usage() {
  return `Usage:
  node scripts/seed-downstream-batch.mjs --from <id> --to <id> --execute [--delay-ms 30000] [--limit 20] [--repos-per-hour 20]
  node scripts/seed-downstream-batch.mjs --from <id> --to <id> --dry-run [--limit 20]

Guardrails:
  - Serial only.
  - Private-only; delegates each repo to seed-downstream-repos.mjs.
  - Default limit is 20 repos per run.
  - Default rolling cap is 20 repos/hour; maximum allowed cap is 40 repos/hour.
  - Default execute delay is 30000ms between repo seeds.
  - Stops on first failure.`;
}

function parseArgs(argv) {
  const args = { from: null, to: null, execute: false, dryRun: false, delayMs: 30000, limit: 20, reposPerHour: 20 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--from") args.from = Number(argv[++i]);
    else if (arg === "--to") args.to = Number(argv[++i]);
    else if (arg === "--execute") args.execute = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--delay-ms") args.delayMs = Number(argv[++i]);
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--repos-per-hour") args.reposPerHour = Number(argv[++i]);
    else throw new Error(`Unknown arg: ${arg}`);
  }
  if (!Number.isInteger(args.from) || !Number.isInteger(args.to) || args.from < 1 || args.to < args.from) {
    throw new Error("--from and --to must be a valid inclusive ID range.");
  }
  if (args.execute === args.dryRun) throw new Error("Choose exactly one of --execute or --dry-run.");
  if (!Number.isInteger(args.limit) || args.limit < 1 || args.limit > 40) throw new Error("--limit must be 1-40.");
  if (!Number.isInteger(args.reposPerHour) || args.reposPerHour < 1 || args.reposPerHour > 40) {
    throw new Error("--repos-per-hour must be 1-40.");
  }
  if (args.limit > args.reposPerHour) throw new Error("--limit cannot exceed --repos-per-hour.");
  if (!Number.isInteger(args.delayMs) || args.delayMs < 30000) throw new Error("--delay-ms must be at least 30000 for execute mode.");
  return args;
}

function splitTableRow(line) {
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

function stripBackticks(value) {
  return value.startsWith("`") && value.endsWith("`") ? value.slice(1, -1) : value;
}

function parseManifest() {
  const markdown = fs.readFileSync(manifestPath, "utf8");
  const lines = markdown.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "## Per-Repo Checklist");
  if (headingIndex === -1) throw new Error("Missing ## Per-Repo Checklist");
  const tableStart = lines.findIndex((line, index) => index > headingIndex && line.trim().startsWith("|"));
  if (tableStart === -1) throw new Error("Missing per-repo table");
  const headers = splitTableRow(lines[tableStart]);
  const rows = [];
  for (let i = tableStart + 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) break;
    const cells = splitTableRow(line);
    const record = Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
    rows.push({
      done: record.Done === "[x]" || record.Done === "[X]",
      id: Number(record.ID),
      idText: record.ID,
      app: record.App,
      targetRepo: stripBackticks(record["Target Repo"]),
      sourceSpec: stripBackticks(record["Source Spec"]),
      lineNumber: i,
    });
  }
  return { markdown, lines, rows };
}

function run(command, options = {}) {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });
  if (result.status !== 0) {
    const detail = options.capture ? `${result.stderr || result.stdout}`.trim() : "";
    throw new Error(`${command.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result;
}

function rateLimitSnapshot(label) {
  const result = run(["gh", "api", "rate_limit", "--jq", "{core:.resources.core,graphql:.resources.graphql,search:.resources.search}"], { capture: true });
  console.log(`${label} rate limit: ${result.stdout.trim()}`);
  return result.stdout.trim();
}

function verifyRepo(row) {
  const visibility = run(["gh", "repo", "view", row.targetRepo, "--json", "visibility,isEmpty,defaultBranchRef", "--jq", "{visibility:.visibility,isEmpty:.isEmpty,defaultBranch:(.defaultBranchRef.name // \"\")}"], { capture: true }).stdout.trim();
  if (!visibility.includes('"visibility":"PRIVATE"') && !visibility.includes("PRIVATE")) {
    throw new Error(`${row.targetRepo} did not verify as PRIVATE: ${visibility}`);
  }
  if (visibility.includes('"isEmpty":true')) {
    throw new Error(`${row.targetRepo} is still empty after seeding: ${visibility}`);
  }
  run(["gh", "api", `repos/${row.targetRepo}/readme`, "--jq", ".name"], { capture: true });
  run(["gh", "api", `repos/${row.targetRepo}/contents/docs/source-specs/${path.basename(row.sourceSpec)}`, "--jq", ".name"], { capture: true });
  return visibility;
}

function markDone(row) {
  const markdown = fs.readFileSync(manifestPath, "utf8");
  const lines = markdown.split("\n");
  const line = lines[row.lineNumber];
  if (!line) throw new Error(`Cannot mark row ${row.idText}; line not found.`);
  lines[row.lineNumber] = line.replace("| [ ] |", "| [x] |");
  fs.writeFileSync(manifestPath, lines.join("\n"), "utf8");
}

function appendEvidence(from, to, seeded, preRate, postRate, dryRun) {
  if (dryRun) return;
  const markdown = fs.readFileSync(manifestPath, "utf8");
  const lines = markdown.split("\n");
  const markerLine = lines.findIndex((line) => line.trim() === "### Failures And Blockers");
  if (markerLine === -1) throw new Error("Missing Failures And Blockers marker");
  const index = lines.slice(0, markerLine).join("\n").length + (markerLine === 0 ? 0 : 1);
  const now = new Date().toISOString();
  const rows = seeded.map((row) => `| ${row.idText} | \`${row.targetRepo}\` | PRIVATE | seeded |`).join("\n");
  const section = [
    `### Batch ${String(from).padStart(3, "0")}-${String(to).padStart(3, "0")} Seeding Evidence - ${now}`,
    "",
    `- Execution mode: serial private seeding with ${seeded.length} successful repo(s).`,
    `- Pre-batch rate limit: \`${preRate}\``,
    `- Post-batch rate limit: \`${postRate}\``,
    "- Verification: every successful repo returned PRIVATE visibility, non-empty default branch, README, and copied source spec under `docs/source-specs/`.",
    "",
    "| ID | Repo | Visibility | Status |",
    "|---:|---|---|---|",
    rows,
    "",
    "",
  ].join("\n");
  fs.writeFileSync(manifestPath, `${markdown.slice(0, index)}${section}${markdown.slice(index)}`, "utf8");
}

function parseCompletedBatchEvents(markdown) {
  const lines = markdown.split("\n");
  const events = [];
  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^### Batch \d{3,4}-\d{3,4} Seeding Evidence - (.+)$/);
    if (!heading) continue;
    const timestamp = Date.parse(heading[1]);
    if (Number.isNaN(timestamp)) continue;
    const execution = lines[index + 2]?.match(/with (\d+) successful repo\(s\)\./);
    if (!execution) continue;
    events.push({ timestamp, count: Number(execution[1]) });
  }
  return events;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function enforceHourlyCap(markdown, targetCount, reposPerHour) {
  const windowMs = 60 * 60 * 1000;
  const now = Date.now();
  const recentEvents = parseCompletedBatchEvents(markdown)
    .filter((event) => event.timestamp > now - windowMs)
    .sort((a, b) => a.timestamp - b.timestamp);
  const recentCount = recentEvents.reduce((sum, event) => sum + event.count, 0);
  if (recentCount + targetCount <= reposPerHour) return;

  let eligibleAt = null;
  for (const event of recentEvents) {
    const candidate = event.timestamp + windowMs + 1000;
    const countAtCandidate = recentEvents
      .filter((recentEvent) => recentEvent.timestamp > candidate - windowMs)
      .reduce((sum, recentEvent) => sum + recentEvent.count, 0);
    if (countAtCandidate + targetCount <= reposPerHour) {
      eligibleAt = candidate;
      break;
    }
  }

  const waitMs = eligibleAt === null ? windowMs : eligibleAt - now;
  const eligibleIso = new Date(eligibleAt ?? now + windowMs).toISOString();
  throw new Error(
    `Rolling GitHub creation cap would be exceeded: ${recentCount} repo(s) recorded in the last hour, ` +
      `${targetCount} selected, cap ${reposPerHour}/hour. Try again after ${eligibleIso} ` +
      `(about ${formatDuration(waitMs)}).`
  );
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const args = parseArgs(process.argv.slice(2));
const { markdown, rows } = parseManifest();
const targets = rows
  .filter((row) => row.id >= args.from && row.id <= args.to && !row.done)
  .slice(0, args.limit);

if (targets.length === 0) {
  console.log("No unchecked targets in range.");
  process.exit(0);
}

if (args.execute) enforceHourlyCap(markdown, targets.length, args.reposPerHour);

console.log(`Selected ${targets.length} target(s): ${targets.map((row) => row.idText).join(", ")}`);
const preRate = args.execute ? rateLimitSnapshot("Pre-batch") : "dry-run";
const seeded = [];

fs.mkdirSync(cloneRoot, { recursive: true });
for (let index = 0; index < targets.length; index += 1) {
  const row = targets[index];
  const repoName = row.targetRepo.split("/")[1];
  const cloneDir = path.join(cloneRoot, repoName);
  if (fs.existsSync(cloneDir)) fs.rmSync(cloneDir, { recursive: true, force: true });

  const mode = args.execute ? "--execute" : "--dry-run";
  const command = ["node", "scripts/seed-downstream-repos.mjs", "--target", row.idText, mode, "--clone-dir", cloneDir];
  console.log(`\n[${index + 1}/${targets.length}] ${row.idText} ${row.app} -> ${row.targetRepo}`);
  run(command);

  if (args.execute) {
    verifyRepo(row);
    markDone(row);
    seeded.push(row);
    fs.rmSync(cloneDir, { recursive: true, force: true });
    if (index < targets.length - 1) {
      console.log(`Waiting ${args.delayMs}ms before next repo...`);
      sleep(args.delayMs);
    }
  }
}

const postRate = args.execute ? rateLimitSnapshot("Post-batch") : "dry-run";
appendEvidence(args.from, args.to, seeded, preRate, postRate, args.dryRun);
console.log(`Completed ${args.execute ? "seeding" : "dry run"} for ${targets.length} target(s).`);
