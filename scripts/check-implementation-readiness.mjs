#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const specsDir = join(root, "specs");
const discoveryNeedles = [
  "Source discovery -- pending exact URL verification",
  "Source discovery — pending exact URL verification",
];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function idFromPath(file) {
  const match = file.match(/\/(\d{3,4})-[^/]+\.md$/);
  return match ? Number(match[1]) : null;
}

function readinessLine(text) {
  return (
    text
      .split("\n")
      .find((line) => line.startsWith("> - Readiness status:") || line.startsWith("> - Spec status:"))
      ?.replace(/^> - (Readiness|Spec) status:/, "")
      .trim() ?? ""
  );
}

const files = walk(specsDir)
  .filter((file) => /\/batch-\d+\//.test(file))
  .filter((file) => statSync(file).isFile())
  .map((file) => ({ file, id: idFromPath(file) }))
  .filter((item) => item.id !== null)
  .sort((a, b) => a.id - b.id);

const summary = {
  specs: files.length,
  implementationReady: 0,
  draft: 0,
  discoveryRows: 0,
  filesWithDiscoveryRows: 0,
  ids101To1000DiscoveryRows: 0,
  ids101To1000FilesWithDiscoveryRows: 0,
};

const byRange = new Map();

for (const { file, id } of files) {
  const text = readFileSync(file, "utf8");
  const readiness = readinessLine(text);
  if (readiness.startsWith("Implementation-ready")) {
    summary.implementationReady += 1;
  } else {
    summary.draft += 1;
  }

  const discoveryRows = discoveryNeedles.reduce((count, needle) => {
    return count + (text.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length;
  }, 0);
  if (discoveryRows > 0) {
    summary.filesWithDiscoveryRows += 1;
  }
  summary.discoveryRows += discoveryRows;

  if (id >= 101 && id <= 1000) {
    summary.ids101To1000DiscoveryRows += discoveryRows;
    if (discoveryRows > 0) {
      summary.ids101To1000FilesWithDiscoveryRows += 1;
    }
  }

  const rangeStart = Math.floor((id - 1) / 100) * 100 + 1;
  const rangeEnd = Math.min(rangeStart + 99, 1000);
  const key = `${String(rangeStart).padStart(3, "0")}-${String(rangeEnd).padStart(3, "0")}`;
  const range = byRange.get(key) ?? { specs: 0, ready: 0, discoveryRows: 0, filesWithDiscoveryRows: 0 };
  range.specs += 1;
  if (readiness.startsWith("Implementation-ready")) {
    range.ready += 1;
  }
  range.discoveryRows += discoveryRows;
  if (discoveryRows > 0) {
    range.filesWithDiscoveryRows += 1;
  }
  byRange.set(key, range);
}

console.log("Implementation readiness audit");
console.log(`Specs: ${summary.specs}`);
console.log(`Implementation-ready specs: ${summary.implementationReady}`);
console.log(`Draft/non-ready specs: ${summary.draft}`);
console.log(`Source-discovery placeholder rows: ${summary.discoveryRows}`);
console.log(`Files with source-discovery placeholders: ${summary.filesWithDiscoveryRows}`);
console.log(
  `IDs 101-1000 placeholder rows: ${summary.ids101To1000DiscoveryRows} across ${summary.ids101To1000FilesWithDiscoveryRows} files`,
);
console.log("");
console.log("| Range | Specs | Ready | Files With Placeholders | Placeholder Rows |");
console.log("|---|---:|---:|---:|---:|");
for (const [range, value] of byRange) {
  console.log(
    `| ${range} | ${value.specs} | ${value.ready} | ${value.filesWithDiscoveryRows} | ${value.discoveryRows} |`,
  );
}

if (summary.ids101To1000DiscoveryRows > 0) {
  process.exitCode = 1;
}
