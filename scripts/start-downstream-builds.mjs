#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = join(ROOT, "tasks", "repo-seeding.md");
const CLONE_ROOT = join(tmpdir(), "mobile-ideas-downstream-builds");

function usage() {
  return `Usage:
  node scripts/start-downstream-builds.mjs --from <id> --to <id> --dry-run [--limit 20]
  node scripts/start-downstream-builds.mjs --from <id> --to <id> --execute [--limit 20] [--delay-ms 5000]

Purpose:
  Starts downstream build work without creating repos. Each selected seeded repo gets:
  - docs/decisions/stack.md
  - expanded docs/plans/README.md
  - updated tasks/todo.md
  - tasks/history.md entry

Guardrails:
  - Serial only.
  - Processes only manifest rows already marked done.
  - Verifies GitHub repo visibility is PRIVATE before execute changes.
  - Does not add runtime code or claim implementation-ready parity.`;
}

function parseArgs(argv) {
  const args = {
    from: null,
    to: null,
    dryRun: false,
    execute: false,
    limit: 20,
    delayMs: 5000,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--from") args.from = Number(argv[++i]);
    else if (arg === "--to") args.to = Number(argv[++i]);
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--execute") args.execute = true;
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--delay-ms") args.delayMs = Number(argv[++i]);
    else throw new Error(`Unknown arg: ${arg}`);
  }
  if (!Number.isInteger(args.from) || !Number.isInteger(args.to) || args.from < 1 || args.to < args.from) {
    throw new Error("--from and --to must be a valid inclusive ID range.");
  }
  if (args.dryRun === args.execute) throw new Error("Choose exactly one of --dry-run or --execute.");
  if (!Number.isInteger(args.limit) || args.limit < 1 || args.limit > 40) throw new Error("--limit must be 1-40.");
  if (!Number.isInteger(args.delayMs) || args.delayMs < 0) throw new Error("--delay-ms must be a non-negative integer.");
  return args;
}

function splitTableRow(line) {
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

function stripBackticks(value) {
  return value.startsWith("`") && value.endsWith("`") ? value.slice(1, -1) : value;
}

function parseManifest() {
  const markdown = readFileSync(MANIFEST_PATH, "utf8");
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
    });
  }
  return rows;
}

function run(command, options = {}) {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: options.cwd ?? ROOT,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });
  if (result.status !== 0) {
    const detail = options.capture ? `${result.stderr || result.stdout}`.trim() : "";
    throw new Error(`${command.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result;
}

function sleep(ms) {
  if (ms > 0) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function slugFromRepo(targetRepo) {
  return targetRepo.split("/")[1].replace(/-mobile-clone$/, "");
}

function readSpecSummary(row) {
  const spec = readFileSync(join(ROOT, row.sourceSpec), "utf8");
  const h1 = spec.match(/^#\s+(.+)$/m)?.[1] ?? row.app;
  const headings = [...spec.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);
  return { h1, headings };
}

function stackDecision(row) {
  const now = new Date().toISOString().slice(0, 10);
  return `# Stack Decision

Date: ${now}

## Decision

Use Expo, React Native, and TypeScript for the initial ${row.app} downstream implementation baseline.

## Rationale

- The source spec is mobile-first and includes app-state, navigation, offline, permission, entitlement, and native-device concerns that fit React Native.
- Expo keeps the first build portable across iOS, Android, and web preview while the exact native parity blockers remain unresolved.
- TypeScript gives route, data, API, fixture, and blocked-gate contracts enough structure before a backend is selected.

## Initial Scope

- App-specific route map, data model, API contract, fixture policy, and test strategy.
- Original UI composition and synthetic data only.
- Explicit blocked gates for account, subscription, region, permission, hardware, regulator, native integration, and third-party approval behavior.

## Deferred

- Production auth, billing, push, provider integrations, private APIs, real user data, app-store assets, screenshots, logos, and exact parity claims.
- Backend framework selection until the V1 route and data contracts are complete.
`;
}

function planReadme(row) {
  const { h1, headings } = readSpecSummary(row);
  const sourceHeadingList = headings.length > 0
    ? headings.map((heading) => `- ${heading}`).join("\n")
    : "- Source spec headings need manual review.";

  return `# Implementation Plan - ${row.app}

> Source spec: \`${row.sourceSpec}\`
> Seeded spec copy: \`docs/source-specs/${basename(row.sourceSpec)}\`
> Target repository: \`${row.targetRepo}\`

## Scope

Start an original mobile implementation workspace for ${row.app} based on the seeded public-source spec. This plan records implementation intent only; it does not claim implementation-ready parity while source verification and risk review remain incomplete.

## Source Orientation

- Source spec title: ${h1}
- Source app for research orientation: ${row.app}
- Canonical spec store: \`GeorgeQLe/mobile-ideas\`
- Downstream repo slug: \`${slugFromRepo(row.targetRepo)}\`

## Source Spec Sections

${sourceHeadingList}

## Stack Baseline

- Runtime: Expo React Native.
- Language: TypeScript.
- Tests: Node test runner for pure domain parsing and contract helpers; app-level tests can be added after route contracts settle.
- Data: synthetic fixtures only.
- Assets: original, generated, or permissively licensed assets only with provenance recorded before commit.

## V1 Contract Work

- Define the route map for the primary mobile workflows.
- Define screen-level state contracts for empty, loading, error, offline, entitlement, permission, and blocked-gate states.
- Define local domain models and synthetic fixtures.
- Define API mocks before real providers.
- Define tests for deterministic domain helpers and fixture contracts.

## Manual Verification Blockers

Keep account-gated, paid, region-specific, native-device, hardware, regulator-gated, third-party approval, and sensitive-data behavior blocked until verified and recorded. Do not infer private APIs or exact native behavior from public-source research alone.

## Next Build Step

Complete \`tasks/todo.md\` Step 1.3 by turning the source spec into a route map, data model, API contract, seed-data policy, and test plan. Runtime app scaffolding should follow only after those contracts are specific enough to review.
`;
}

function todo(row) {
  return `# Todo - ${row.app}

> Current phase: 1 of 3 - Implementation Plan And Technical Baseline
> Source roadmap: \`tasks/roadmap.md\`
> Source spec: \`docs/source-specs/${basename(row.sourceSpec)}\`

## Phase 1: Implementation Plan And Technical Baseline

### Completed

- [x] Step 1.1: Reviewed the seeded source spec and created an app-specific implementation plan.
- [x] Step 1.2: Selected Expo React Native TypeScript as the initial downstream stack baseline.

### Next

- [ ] Step 1.3: Define route, data, API, seed-data, and test contracts.
  - Files: modify \`docs/plans/README.md\`, modify \`tasks/todo.md\`
  - Convert source-spec requirements into app-specific implementation contracts.
  - Define synthetic seed data only; do not use production exports or real user records.
  - Preserve blocked behavior for account, subscription, region, permission, hardware, regulator, native integration, and third-party approval gates.

- [ ] Step 1.4: Prepare the first runtime build phase.
  - Files: modify \`tasks/roadmap.md\`, modify \`tasks/todo.md\`
  - Replace this planning phase with the first concrete implementation phase once contracts are ready.

## Manual Verification Blockers

- [ ] Account, login, signup, recovery, and provider prompts remain blocked.
- [ ] Paid subscription, checkout, restore, cancel, and entitlement behavior remains blocked.
- [ ] Native permissions, push notifications, widgets, extensions, watch, camera, microphone, contacts, health, payment, hardware, and regional behavior remains blocked where applicable.
- [ ] Data export, deletion, privacy, support, moderation, regulated, and third-party approval behavior remains blocked until verified.

## Acceptance Criteria

- [x] \`docs/plans/README.md\` is expanded into an app-specific implementation plan.
- [x] The implementation stack is selected and documented.
- [ ] Core route, screen, data model, and API contracts are listed.
- [ ] Manual verification blockers from the source spec are preserved in task docs.
- [ ] Legal/name/asset guardrails are still satisfied.
`;
}

function historyEntry(row) {
  return `# History - ${row.app}

## ${new Date().toISOString()} - Build Planning Baseline

- Added app-specific implementation plan at \`docs/plans/README.md\`.
- Added Expo React Native TypeScript stack decision at \`docs/decisions/stack.md\`.
- Updated \`tasks/todo.md\` to mark Phase 1 Steps 1.1 and 1.2 complete and keep runtime work gated on route/data/API contracts.
- Preserved legal, original-assets, synthetic-data, and manual-verification blockers.
`;
}

function writeBuildBaseline(repoDir, row) {
  const decisionsDir = join(repoDir, "docs", "decisions");
  mkdirSync(decisionsDir, { recursive: true });
  writeFileSync(join(decisionsDir, "stack.md"), stackDecision(row), "utf8");
  writeFileSync(join(repoDir, "docs", "plans", "README.md"), planReadme(row), "utf8");
  writeFileSync(join(repoDir, "tasks", "todo.md"), todo(row), "utf8");
  writeFileSync(join(repoDir, "tasks", "history.md"), historyEntry(row), "utf8");
}

function verifyPrivate(row) {
  const output = run([
    "gh",
    "repo",
    "view",
    row.targetRepo,
    "--json",
    "visibility,nameWithOwner",
    "--jq",
    "{nameWithOwner:.nameWithOwner,visibility:.visibility}",
  ], { capture: true }).stdout.trim();
  if (!output.includes("PRIVATE")) throw new Error(`${row.targetRepo} is not PRIVATE: ${output}`);
}

const args = parseArgs(process.argv.slice(2));
const targets = parseManifest()
  .filter((row) => row.id >= args.from && row.id <= args.to && row.done)
  .slice(0, args.limit);

if (targets.length === 0) {
  console.log("No completed manifest rows selected.");
  process.exit(0);
}

console.log(`Selected ${targets.length} completed target(s): ${targets.map((row) => row.idText).join(", ")}`);
mkdirSync(CLONE_ROOT, { recursive: true });

for (let index = 0; index < targets.length; index += 1) {
  const row = targets[index];
  const repoName = row.targetRepo.split("/")[1];
  const workDir = args.dryRun
    ? mkdtempSync(join(tmpdir(), `mobile-ideas-build-${row.idText}-`))
    : join(CLONE_ROOT, repoName);

  console.log(`\n[${index + 1}/${targets.length}] ${row.idText} ${row.app} -> ${row.targetRepo}`);

  if (args.execute) {
    verifyPrivate(row);
    if (existsSync(workDir)) rmSync(workDir, { recursive: true, force: true });
    run(["gh", "repo", "clone", row.targetRepo, workDir]);
  } else {
    mkdirSync(join(workDir, "docs", "plans"), { recursive: true });
    mkdirSync(join(workDir, "tasks"), { recursive: true });
  }

  writeBuildBaseline(workDir, row);

  if (args.dryRun) {
    console.log(`Dry-run preview: ${workDir}`);
    continue;
  }

  const status = run(["git", "status", "--short"], { cwd: workDir, capture: true }).stdout.trim();
  if (!status) {
    console.log("No build-baseline changes needed.");
    rmSync(workDir, { recursive: true, force: true });
    continue;
  }

  run(["git", "add", "docs/decisions/stack.md", "docs/plans/README.md", "tasks/todo.md", "tasks/history.md"], { cwd: workDir });
  run(["git", "commit", "-m", `chore: start ${row.app} build planning`], { cwd: workDir });
  run(["git", "push", "origin", "HEAD"], { cwd: workDir });
  console.log(`Pushed build planning baseline for ${row.targetRepo}.`);
  rmSync(workDir, { recursive: true, force: true });
  if (index < targets.length - 1) sleep(args.delayMs);
}

console.log(`Completed ${args.execute ? "build planning" : "dry run"} for ${targets.length} target(s).`);
