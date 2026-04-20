#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = join(ROOT, "tasks", "repo-seeding.md");
const TEMPLATE_ROOT = join(ROOT, "templates", "downstream");
const DEFAULT_SOURCE_STORE = "https://github.com/GeorgeQLe/mobile-ideas/blob/main";
const REQUIRED_COLUMNS = ["Done", "ID", "App", "Target Repo", "Source Spec"];
const PLACEHOLDER_PATTERN = /{{[A-Z0-9_]+}}/g;

class SeedError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "SeedError";
    this.row = options.row;
    this.recordable = options.recordable ?? true;
  }
}

function usage() {
  return `Usage:
  node scripts/seed-downstream-repos.mjs --target <id|app|owner/repo> --dry-run [--preview-dir <dir>]
  node scripts/seed-downstream-repos.mjs --target <id|app|owner/repo> --execute [--clone-dir <dir>] [--reconcile-existing]

Examples:
  node scripts/seed-downstream-repos.mjs --target 093 --dry-run
  node scripts/seed-downstream-repos.mjs --target GeorgeQLe/evernote-mobile-clone --dry-run --preview-dir /tmp/evernote-seed

Guardrails:
  - Single target only; batch creation is intentionally unsupported.
  - Repositories are private only; --public and --visibility public are refused.
  - Existing target repos are refused unless --reconcile-existing is provided.
  - --dry-run writes a local preview and never runs gh or git commands.`;
}

function parseArgs(argv) {
  const args = {
    dryRun: false,
    execute: false,
    reconcileExisting: false,
    recordBlockers: true,
    target: null,
    previewDir: null,
    cloneDir: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--target") {
      args.target = argv[++i];
      continue;
    }
    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (arg === "--execute") {
      args.execute = true;
      continue;
    }
    if (arg === "--preview-dir") {
      args.previewDir = argv[++i];
      continue;
    }
    if (arg === "--clone-dir") {
      args.cloneDir = argv[++i];
      continue;
    }
    if (arg === "--reconcile-existing") {
      args.reconcileExisting = true;
      continue;
    }
    if (arg === "--no-record-blockers") {
      args.recordBlockers = false;
      continue;
    }
    if (arg === "--public" || arg === "--all") {
      throw new SeedError(`${arg} is refused by the seeding contract.`, {
        recordable: false,
      });
    }
    if (arg === "--visibility") {
      const value = argv[++i];
      if (value === "public") {
        throw new SeedError("--visibility public is refused by the seeding contract.", {
          recordable: false,
        });
      }
      throw new SeedError(`Unsupported visibility "${value}". Only private repos are allowed.`, {
        recordable: false,
      });
    }
    throw new SeedError(`Unknown argument: ${arg}`, { recordable: false });
  }

  if (!args.target) {
    throw new SeedError("--target is required; batch seeding is intentionally unsupported.", {
      recordable: false,
    });
  }
  if (args.dryRun === args.execute) {
    throw new SeedError("Choose exactly one of --dry-run or --execute.", {
      recordable: false,
    });
  }
  return args;
}

function stripBackticks(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("`") && trimmed.endsWith("`")) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function splitTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) {
    throw new SeedError(`Invalid Markdown table row: ${line}`);
  }
  return trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
}

function parseManifest() {
  const markdown = readFileSync(MANIFEST_PATH, "utf8");
  const lines = markdown.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "## Per-Repo Checklist");
  if (headingIndex === -1) {
    throw new SeedError("Manifest heading not found: ## Per-Repo Checklist");
  }

  let tableStart = -1;
  for (let i = headingIndex + 1; i < lines.length; i += 1) {
    if (lines[i].trim().startsWith("|")) {
      tableStart = i;
      break;
    }
  }
  if (tableStart === -1) {
    throw new SeedError("Per-repo checklist table not found.");
  }

  const headers = splitTableRow(lines[tableStart]);
  if (headers.length !== REQUIRED_COLUMNS.length) {
    throw new SeedError(`Manifest header count mismatch. Expected ${REQUIRED_COLUMNS.length}, found ${headers.length}.`);
  }
  for (let i = 0; i < REQUIRED_COLUMNS.length; i += 1) {
    if (headers[i] !== REQUIRED_COLUMNS[i]) {
      throw new SeedError(`Manifest header mismatch at column ${i + 1}. Expected "${REQUIRED_COLUMNS[i]}", found "${headers[i]}".`);
    }
  }

  const separator = splitTableRow(lines[tableStart + 1]);
  if (separator.length !== headers.length || !separator.every((cell) => /^:?-{3,}:?$/.test(cell))) {
    throw new SeedError("Manifest table separator is invalid.");
  }

  const rows = [];
  for (let i = tableStart + 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) {
      break;
    }
    const cells = splitTableRow(line);
    if (cells.length !== headers.length) {
      throw new SeedError(`Manifest row ${i + 1} has ${cells.length} columns; expected ${headers.length}.`);
    }
    const record = Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
    const doneMatch = record.Done.match(/^\[( |x|X)\]$/);
    if (!doneMatch) {
      throw new SeedError(`Manifest row ${i + 1} has invalid Done value: ${record.Done}`);
    }
    if (!/^\d{3}$/.test(record.ID)) {
      throw new SeedError(`Manifest row ${i + 1} has invalid ID: ${record.ID}`);
    }
    const targetRepo = stripBackticks(record["Target Repo"]);
    const sourceSpec = stripBackticks(record["Source Spec"]);
    validateRepo(targetRepo, record);
    if (!/^specs\/batch-\d{2}\/\d{3}-[a-z0-9-]+\.md$/.test(sourceSpec)) {
      throw new SeedError(`Manifest row ${i + 1} has invalid source spec path: ${sourceSpec}`, {
        row: record,
      });
    }
    rows.push({
      done: doneMatch[1].toLowerCase() === "x",
      id: record.ID,
      app: record.App,
      targetRepo,
      sourceSpec,
      lineNumber: i + 1,
    });
  }

  if (rows.length !== 100) {
    throw new SeedError(`Manifest must contain exactly 100 target rows; found ${rows.length}.`);
  }

  return { markdown, rows };
}

function validateRepo(targetRepo, row) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(targetRepo)) {
    throw new SeedError(`Invalid target repo "${targetRepo}". Expected owner/repo form.`, {
      row,
    });
  }
}

function findTarget(rows, target) {
  const normalized = target.trim().toLowerCase();
  const matches = rows.filter((row) => {
    return (
      row.id === target.trim().padStart(3, "0") ||
      row.app.toLowerCase() === normalized ||
      row.targetRepo.toLowerCase() === normalized ||
      row.targetRepo.split("/")[1].toLowerCase() === normalized
    );
  });

  if (matches.length === 0) {
    throw new SeedError(`No manifest row matches target: ${target}`, { recordable: false });
  }
  if (matches.length > 1) {
    throw new SeedError(`Target "${target}" matched multiple rows; use a three-digit ID or owner/repo.`, {
      recordable: false,
    });
  }
  return matches[0];
}

function parseSourceStore(markdown) {
  const match = markdown.match(/^- Canonical spec store:\s*`([^`]+)`/m);
  if (!match) {
    return DEFAULT_SOURCE_STORE;
  }
  return `https://github.com/${match[1]}/blob/main`;
}

function extractMetadata(specContent, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^> - ${escaped}:\\s*(.+)$`, "m");
  return specContent.match(regex)?.[1]?.trim() ?? null;
}

function sentenceList(value) {
  if (!value) {
    return "- Manual verification blockers remain unresolved until lawful hands-on evidence is recorded.";
  }
  return `- ${value}`;
}

function buildContext(row, sourceStoreUrl) {
  const sourceSpecPath = join(ROOT, row.sourceSpec);
  if (!existsSync(sourceSpecPath)) {
    throw new SeedError(`Source spec does not exist: ${row.sourceSpec}`, { row });
  }

  const sourceSpecContent = readFileSync(sourceSpecPath, "utf8");
  const manualBlockers = extractMetadata(sourceSpecContent, "Manual verification blockers");
  const legalScope =
    extractMetadata(sourceSpecContent, "Legal scope") ??
    "Functional parity only; use original code, original brand, original copy, original assets, public-source behavior requirements, and explicit privacy/security boundaries.";

  return {
    APP_ID: row.id,
    APP_NAME: row.app,
    PROJECT_NAME: `Original Mobile Implementation - Spec ${row.id}`,
    PROJECT_SUMMARY: `An original mobile implementation workspace seeded from the public-source functional research spec for ${row.app}. This project is independent and exists for lawful functional-parity planning.`,
    TARGET_REPO: row.targetRepo,
    SOURCE_SPEC_PATH: row.sourceSpec,
    SOURCE_SPEC_FILENAME: basename(row.sourceSpec),
    SOURCE_SPEC_STORE_URL: sourceStoreUrl,
    NON_AFFILIATION_NOTICE: `This project is independent and is not affiliated with, endorsed by, sponsored by, certified by, or connected to ${row.app}, its owner, marketplace operators, integration providers, or any third-party platform named in the source spec.`,
    LEGAL_SCOPE: legalScope,
    ORIGINAL_ASSETS_REQUIREMENT:
      "Use original code, original UI composition, original text, synthetic seed data, and original, generated, or permissively licensed assets with recorded provenance.",
    MANUAL_VERIFICATION_BLOCKERS: sentenceList(manualBlockers),
  };
}

function listFiles(root) {
  const files = [];
  for (const entry of readdirSync(root)) {
    const absolute = join(root, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) {
      files.push(...listFiles(absolute));
    } else if (stat.isFile()) {
      files.push(absolute);
    }
  }
  return files.sort();
}

function renderTemplate(content, context, templatePath) {
  let rendered = content;
  for (const [key, value] of Object.entries(context)) {
    rendered = rendered.replaceAll(`{{${key}}}`, value);
  }
  const leftovers = rendered.match(PLACEHOLDER_PATTERN);
  if (leftovers) {
    throw new SeedError(`Unresolved placeholders in ${relative(ROOT, templatePath)}: ${[...new Set(leftovers)].join(", ")}`);
  }
  return rendered;
}

function prepareSeedDirectory(row, context, outputDir) {
  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true });
  }
  mkdirSync(outputDir, { recursive: true });

  const renderedFiles = [];
  for (const templatePath of listFiles(TEMPLATE_ROOT)) {
    const relativeTemplatePath = relative(TEMPLATE_ROOT, templatePath);
    const destinationPath = join(outputDir, relativeTemplatePath);
    mkdirSync(dirname(destinationPath), { recursive: true });
    const content = readFileSync(templatePath, "utf8");
    const rendered = renderTemplate(content, context, templatePath);
    writeFileSync(destinationPath, rendered, "utf8");
    renderedFiles.push(relativeTemplatePath);
  }

  const specDestination = join(outputDir, "docs", "source-specs", basename(row.sourceSpec));
  mkdirSync(dirname(specDestination), { recursive: true });
  copyFileSync(join(ROOT, row.sourceSpec), specDestination);
  renderedFiles.push(relative(outputDir, specDestination));
  renderedFiles.sort();

  return renderedFiles;
}

function copySeedIntoClone(seedDir, cloneDir) {
  for (const sourcePath of listFiles(seedDir)) {
    const targetPath = join(cloneDir, relative(seedDir, sourcePath));
    mkdirSync(dirname(targetPath), { recursive: true });
    copyFileSync(sourcePath, targetPath);
  }
}

function shellQuote(value) {
  if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(value)) {
    return value;
  }
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function describeCommands(row, cloneDir) {
  const description = `${row.app} inspired lawful mobile clone implementation`;
  const commands = [
    ["gh", "repo", "create", row.targetRepo, "--private", "--description", description, "--clone=false"],
    ["gh", "repo", "clone", row.targetRepo, cloneDir],
    ["git", "-C", cloneDir, "add", "."],
    ["git", "-C", cloneDir, "commit", "-m", `chore: seed ${row.app} implementation workspace`],
    ["git", "-C", cloneDir, "push", "origin", "HEAD"],
  ];
  return commands.map((command) => command.map(shellQuote).join(" "));
}

function runCommand(command, options = {}) {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: options.cwd ?? ROOT,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });
  if (result.status !== 0) {
    const detail = options.capture ? `${result.stderr || result.stdout}`.trim() : "";
    throw new SeedError(`${command.map(shellQuote).join(" ")} failed${detail ? `: ${detail}` : ""}`, {
      row: options.row,
    });
  }
  return result;
}

function repoExists(targetRepo) {
  const result = spawnSync("gh", ["repo", "view", targetRepo, "--json", "nameWithOwner", "--jq", ".nameWithOwner"], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status === 0) {
    return true;
  }
  const output = `${result.stderr}\n${result.stdout}`.toLowerCase();
  if (output.includes("could not resolve") || output.includes("not found")) {
    return false;
  }
  throw new SeedError(`Unable to check target repo existence for ${targetRepo}: ${`${result.stderr || result.stdout}`.trim()}`);
}

function appendBlocker(row, message) {
  const markdown = readFileSync(MANIFEST_PATH, "utf8");
  const marker = "### Failures And Blockers\n";
  const markerIndex = markdown.indexOf(marker);
  if (markerIndex === -1) {
    throw new SeedError("Cannot record blocker because the Failures And Blockers section is missing.", {
      row,
      recordable: false,
    });
  }
  const insertionIndex = markerIndex + marker.length;
  const timestamp = new Date().toISOString();
  const bullet = `\n- Step 6.3 blocker (${timestamp}) for ${row.targetRepo}: ${message}\n`;
  writeFileSync(MANIFEST_PATH, `${markdown.slice(0, insertionIndex)}${bullet}${markdown.slice(insertionIndex)}`, "utf8");
}

function printPlan(row, previewDir, cloneDir, renderedFiles) {
  console.log(`Target: ${row.id} ${row.app}`);
  console.log(`Repo: ${row.targetRepo}`);
  console.log(`Source spec: ${row.sourceSpec}`);
  console.log(`Preview directory: ${previewDir}`);
  console.log("");
  console.log("Seeded files:");
  for (const file of renderedFiles) {
    console.log(`- ${file}`);
  }
  console.log("");
  console.log("Exact commands for execution mode:");
  for (const command of describeCommands(row, cloneDir)) {
    console.log(command);
  }
}

function executeSeed(row, context, seedDir, cloneDir, reconcileExisting) {
  runCommand(["gh", "auth", "status"], { row });
  const existing = repoExists(row.targetRepo);
  if (existing && !reconcileExisting) {
    throw new SeedError(`Target repo already exists: ${row.targetRepo}. Re-run with --reconcile-existing to seed or reconcile it.`, {
      row,
    });
  }
  if (!existing) {
    runCommand([
      "gh",
      "repo",
      "create",
      row.targetRepo,
      "--private",
      "--description",
      `${row.app} inspired lawful mobile clone implementation`,
      "--clone=false",
    ], { row });
  }
  if (existsSync(cloneDir)) {
    throw new SeedError(`Clone destination already exists: ${cloneDir}`, { row });
  }
  runCommand(["gh", "repo", "clone", row.targetRepo, cloneDir], { row });
  copySeedIntoClone(seedDir, cloneDir);
  runCommand(["git", "-C", cloneDir, "add", "."], { row });
  runCommand(["git", "-C", cloneDir, "commit", "-m", `chore: seed ${context.APP_NAME} implementation workspace`], { row });
  runCommand(["git", "-C", cloneDir, "push", "origin", "HEAD"], { row });
}

function main() {
  let args;
  let row;
  try {
    args = parseArgs(process.argv.slice(2));
    const manifest = parseManifest();
    row = findTarget(manifest.rows, args.target);
    const sourceStoreUrl = parseSourceStore(manifest.markdown);
    const context = buildContext(row, sourceStoreUrl);
    const repoName = row.targetRepo.split("/")[1];
    const previewDir = args.previewDir
      ? resolve(args.previewDir)
      : mkdtempSync(join(tmpdir(), `mobile-ideas-seed-${row.id}-`));
    const cloneDir = args.cloneDir ? resolve(args.cloneDir) : resolve(ROOT, "..", repoName);
    const renderedFiles = prepareSeedDirectory(row, context, previewDir);

    printPlan(row, previewDir, cloneDir, renderedFiles);

    if (args.dryRun) {
      console.log("");
      console.log("Dry run complete. No gh or git commands were executed.");
      return;
    }

    executeSeed(row, context, previewDir, cloneDir, args.reconcileExisting);
    console.log("");
    console.log(`Seeded ${row.targetRepo} successfully.`);
  } catch (error) {
    if (!(error instanceof SeedError)) {
      throw error;
    }
    console.error(`ERROR: ${error.message}`);
    if (args?.execute && args.recordBlockers && error.recordable && (error.row || row)) {
      try {
        appendBlocker(error.row || row, error.message);
        console.error("Recorded blocker in tasks/repo-seeding.md.");
      } catch (recordError) {
        console.error(`ERROR: failed to record blocker: ${recordError.message}`);
      }
    }
    process.exit(1);
  }
}

main();
