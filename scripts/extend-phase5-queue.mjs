import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ideasPath = path.join(root, "tasks", "ideas.md");
const roadmapPath = path.join(root, "tasks", "roadmap.md");
const specsRoot = path.join(root, "specs");

const START_ID = 101;
const END_ID = 1000;

function padId(id) {
  return String(id).padStart(3, "0");
}

function batchDir(id) {
  const batch = Math.ceil(id / 20);
  return `batch-${String(batch).padStart(2, "0")}`;
}

function findSpecFile(id) {
  const dir = path.join(specsRoot, batchDir(id));
  const prefix = `${padId(id)}-`;
  try {
    const files = fs.readdirSync(dir);
    const match = files.find((f) => f.startsWith(prefix) && f.endsWith(".md"));
    return match ? path.join(dir, match) : null;
  } catch {
    return null;
  }
}

function specRelPath(id) {
  const dir = batchDir(id);
  const prefix = `${padId(id)}-`;
  try {
    const files = fs.readdirSync(path.join(specsRoot, dir));
    const match = files.find((f) => f.startsWith(prefix) && f.endsWith(".md"));
    return match ? `specs/${dir}/${match}` : null;
  } catch {
    return null;
  }
}

function extractOverviewFirstSentence(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  let inOverview = false;
  for (const line of lines) {
    if (/^## Overview\s*$/.test(line)) {
      inOverview = true;
      continue;
    }
    if (inOverview && /^## /.test(line)) break;
    if (inOverview && line.trim().length > 0) {
      const first = line.trim().match(/^(.+?\.)\s/);
      if (first) return first[1];
      return line.trim().replace(/\.$/, "") + ".";
    }
  }
  return null;
}

function parseIdeas() {
  const content = fs.readFileSync(ideasPath, "utf-8");
  const rows = new Map();
  for (const line of content.split("\n")) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|/);
    if (m) {
      const id = parseInt(m[1], 10);
      const app = m[2].trim();
      if (id >= START_ID && id <= END_ID) rows.set(id, app);
    }
  }
  return rows;
}

const ideas = parseIdeas();
console.log(`Parsed ${ideas.size} ideas for IDs ${START_ID}-${END_ID}`);

const rows = [];
const missing = [];

for (let id = START_ID; id <= END_ID; id++) {
  const app = ideas.get(id);
  if (!app) {
    missing.push(id);
    continue;
  }
  const rel = specRelPath(id);
  if (!rel) {
    missing.push(id);
    continue;
  }
  const absPath = findSpecFile(id);
  let plan = extractOverviewFirstSentence(absPath);
  if (!plan) {
    plan = `Build an original ${app}-style mobile app with onboarding, core workflows, settings, notifications, and monetization gates.`;
  }
  rows.push(`| ${padId(id)} | ${app} | \`${rel}\` | ${plan} |`);
}

if (missing.length > 0) {
  console.error(`Missing ideas or specs for IDs: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`Generated ${rows.length} rows`);

const roadmap = fs.readFileSync(roadmapPath, "utf-8");

const tableEnd = roadmap.lastIndexOf(
  "| 100 | Ring |"
);
if (tableEnd === -1) {
  console.error("Could not find end of existing Phase 5 table (ID 100 row)");
  process.exit(1);
}

const insertAfter = roadmap.indexOf("\n", tableEnd);
const before = roadmap.slice(0, insertAfter + 1);
const after = roadmap.slice(insertAfter + 1);

const updated = before + rows.join("\n") + "\n" + after;
fs.writeFileSync(roadmapPath, updated, "utf-8");

const finalCount = updated.split("\n").filter((l) => /^\| \d{3,4} /.test(l)).length;
console.log(`Phase 5 table now has ${finalCount} rows`);
