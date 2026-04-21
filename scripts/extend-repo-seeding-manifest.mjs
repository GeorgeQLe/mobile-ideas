import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "tasks", "repo-seeding.md");
const ideasPath = path.join(root, "tasks", "ideas.md");
const specsRoot = path.join(root, "specs");
const owner = "GeorgeQLe";

function splitTableRow(line) {
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseIdeas() {
  return fs
    .readFileSync(ideasPath, "utf8")
    .split("\n")
    .filter((line) => /^\| \d+ \|/.test(line))
    .map((line) => {
      const cells = splitTableRow(line);
      return {
        id: Number(cells[0]),
        app: cells[1],
      };
    });
}

function indexSpecs() {
  const specs = new Map();
  for (const batch of fs.readdirSync(specsRoot).filter((name) => /^batch-\d{2}$/.test(name))) {
    for (const file of fs.readdirSync(path.join(specsRoot, batch))) {
      const match = file.match(/^(\d{3,4})-.+\.md$/);
      if (!match) continue;
      specs.set(Number(match[1]), `specs/${batch}/${file}`);
    }
  }
  return specs;
}

function parseExistingDone(markdown) {
  const done = new Map();
  const lines = markdown.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "## Per-Repo Checklist");
  if (headingIndex === -1) return done;
  const tableStart = lines.findIndex((line, index) => index > headingIndex && line.trim().startsWith("|"));
  if (tableStart === -1) return done;
  const headers = splitTableRow(lines[tableStart]);
  for (let i = tableStart + 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) break;
    const cells = splitTableRow(line);
    const record = Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
    done.set(Number(record.ID), record.Done === "[x]" || record.Done === "[X]");
  }
  return done;
}

function replaceChecklist(markdown, ideas, specs, done) {
  const lines = markdown.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "## Per-Repo Checklist");
  if (headingIndex === -1) throw new Error("Missing ## Per-Repo Checklist");
  const tableStart = lines.findIndex((line, index) => index > headingIndex && line.trim().startsWith("|"));
  if (tableStart === -1) throw new Error("Missing per-repo checklist table");
  let tableEnd = tableStart;
  while (tableEnd < lines.length && lines[tableEnd].trim().startsWith("|")) tableEnd += 1;

  const table = [
    "| Done | ID | App | Target Repo | Source Spec |",
    "|---|---:|---|---|---|",
  ];
  for (const idea of ideas) {
    const sourceSpec = specs.get(idea.id);
    if (!sourceSpec) throw new Error(`Missing source spec for ${idea.id} ${idea.app}`);
    const checked = done.get(idea.id) ? "[x]" : "[ ]";
    const id = String(idea.id).padStart(3, "0");
    table.push(`| ${checked} | ${id} | ${idea.app.replaceAll("|", "/")} | \`${owner}/${slugify(idea.app)}-mobile-clone\` | \`${sourceSpec}\` |`);
  }

  return [...lines.slice(0, tableStart), ...table, ...lines.slice(tableEnd)].join("\n");
}

function updateBatchTodo(markdown) {
  let next = markdown
    .replace("- [x] Verify all 100 target repos exist and link back to this spec store.", "- [x] Verify all 100 target repos exist and link back to this spec store.\n- [ ] Seed Batch 06 repos (IDs 101-120) private with rate-limit-aware serial execution.\n- [ ] Seed Batch 07 repos (IDs 121-140) private with rate-limit-aware serial execution.\n- [ ] Continue IDs 141-1000 only in controlled private batches after each prior batch verifies cleanly.");
  if (!next.includes("### 1000-Repo Seeding Rate-Limit Policy")) {
    next = next.replace("## Execution Status And Evidence Log", `## Execution Status And Evidence Log\n\n### 1000-Repo Seeding Rate-Limit Policy - 2026-04-21\n\n- User approval: private GitHub downstream repo creation batches approved on 2026-04-21.\n- Private-only constraint: every downstream repo must be created with private visibility; public visibility remains forbidden without separate explicit approval.\n- Conservative batch rule: seed serially, default 20 repos/hour, minimum 30 seconds between repo seeds. After two clean batches, a future session may raise to 40 repos/hour, still serial.\n- Stop conditions: stop immediately on any GitHub 403, 429, secondary-rate-limit message, auth/permission failure, naming failure, clone propagation failure, template placeholder failure, or non-private visibility result.\n- Rate-limit handling: check \`gh api rate_limit\` before and after each batch; obey \`retry-after\` or \`x-ratelimit-reset\`; otherwise wait at least one minute and use exponential backoff.\n- Verification required per repo: \`visibility == PRIVATE\`, README exists, source spec exists under \`docs/source-specs/\`, and default branch/root commit exists before marking the row done.\n- Draft-state note: IDs 101-1000 may be seeded as planning/scaffold repositories only while their specs remain Draft 1; downstream repos must not claim implementation-ready parity until exact-source verification and category risk review are complete.\n\n`);
  }
  return next;
}

const markdown = fs.readFileSync(manifestPath, "utf8");
const ideas = parseIdeas();
const specs = indexSpecs();
const done = parseExistingDone(markdown);
const replaced = replaceChecklist(markdown, ideas, specs, done);
fs.writeFileSync(manifestPath, updateBatchTodo(replaced), "utf8");
console.log(`Extended repo-seeding manifest to ${ideas.length} rows.`);
