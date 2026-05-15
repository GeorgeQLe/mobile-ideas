#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const HARNESS_CLI = process.env.MOBILE_BENCHMARK_HARNESS_CLI ?? "/tmp/mobile-benchmark-harness/dist/cli/index.js";
const OUT_DIR = join(ROOT, "tasks", "scorecards", "phase-13");
const VALIDATION_SUMMARY = join(OUT_DIR, "validation-summary.json");
const RUN_ID = "phase-13-local-2026-05-15";
const CATEGORY = "Messaging & Email";
const VARIANTS = ["react-native", "flutter", "expo", "ios-native", "android-native"];
const BENCHMARKABLE_VARIANTS = new Set(["react-native", "expo", "ios-native"]);

function padId(id) {
  return String(id).padStart(3, "0");
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function average(values) {
  if (values.length === 0) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
}

function variantCommandName(variant) {
  if (variant === "react-native") return "npm run test:react-native";
  if (variant === "expo") return "npm run test:expo";
  if (variant === "ios-native") return "swiftc iOS Native model";
  if (variant === "flutter") return "Flutter runtime validation";
  if (variant === "android-native") return "Android Native runtime validation";
  throw new Error(`Unsupported variant: ${variant}`);
}

function blocker(result, variant, reason, detail) {
  return {
    appId: result.id,
    appName: result.app,
    repo: result.repo,
    repoPath: result.repoPath,
    commit: result.commit,
    implementationStatus: result.implementationStatus,
    category: CATEGORY,
    variant,
    status: "blocked",
    reason,
    detail,
    validationEvidence: {
      command: variantCommandName(variant),
      status: "blocker",
      detail,
    },
    runId: RUN_ID,
  };
}

function commandFor(result, variant) {
  const commandName = variantCommandName(variant);
  return result.commands.find((command) => command.name === commandName);
}

function reasonForBlockedVariant(result, variant, detail) {
  if (result.implementationStatus !== "implemented") return "implementation-not-started";
  if (variant === "flutter") return "missing-local-flutter-toolchain";
  if (variant === "android-native") return "missing-local-android-toolchain";
  return detail.toLowerCase().includes("script is missing") ? "implementation-not-started" : "validation-blocked";
}

function readComposite(card) {
  const score = Number(card?.composite?.score);
  if (!Number.isFinite(score)) {
    throw new Error(`Benchmark scorecard missing composite score for ${card?.meta?.appName ?? "unknown"}`);
  }
  return score;
}

await mkdir(OUT_DIR, { recursive: true });

if (!existsSync(HARNESS_CLI)) {
  throw new Error(`mobile-benchmark-harness CLI not found at ${HARNESS_CLI}`);
}

const validation = JSON.parse(await readFile(VALIDATION_SUMMARY, "utf-8"));
if (!Array.isArray(validation.results)) {
  throw new Error(`validation results missing from ${VALIDATION_SUMMARY}`);
}

const scorecards = [];
const blockers = [];

for (const result of validation.results) {
  if (result.visibility !== "PRIVATE") {
    throw new Error(`${result.repo} visibility is ${result.visibility}; refusing to benchmark non-private repo`);
  }
  if (!existsSync(result.repoPath)) {
    throw new Error(`${result.repo} local path missing: ${result.repoPath}`);
  }

  for (const variant of VARIANTS) {
    if (result.implementationStatus !== "implemented") {
      blockers.push(blocker(
        result,
        variant,
        "implementation-not-started",
        `${result.repo} remains scaffold-only in Step 13.6 validation; no ${variant} benchmark score was generated.`,
      ));
      continue;
    }

    const validationCommand = commandFor(result, variant);
    if (!validationCommand) {
      blockers.push(blocker(result, variant, "missing-validation-evidence", `No Step 13.6 validation command found for ${variant}.`));
      continue;
    }

    if (validationCommand.status === "blocker") {
      blockers.push(blocker(result, variant, reasonForBlockedVariant(result, variant, validationCommand.detail), validationCommand.detail));
      continue;
    }

    if (validationCommand.status !== "pass") {
      blockers.push(blocker(result, variant, "validation-not-passing", validationCommand.detail));
      continue;
    }

    if (!BENCHMARKABLE_VARIANTS.has(variant)) {
      blockers.push(blocker(result, variant, "unsupported-harness-variant", `${variant} is not enabled for Phase 13 local benchmarking.`));
      continue;
    }

    const output = join(OUT_DIR, `${padId(result.id)}-${slug(result.app)}-${variant}.json`);
    const args = [
      HARNESS_CLI,
      "--app",
      result.repoPath,
      "--variant",
      variant,
      "--output",
      output,
      "--app-id",
      String(result.id),
      "--app-name",
      result.app,
      "--category",
      CATEGORY,
      "--run-id",
      RUN_ID,
    ];
    const benchmark = spawnSync("node", args, { encoding: "utf-8" });
    if (benchmark.status !== 0) {
      throw new Error(`benchmark failed for ${result.repo} ${variant}\n${benchmark.stdout}\n${benchmark.stderr}`);
    }

    const card = JSON.parse(await readFile(output, "utf-8"));
    scorecards.push({
      appId: result.id,
      appName: result.app,
      repo: result.repo,
      repoPath: result.repoPath,
      commit: result.commit,
      implementationStatus: result.implementationStatus,
      variant,
      composite: readComposite(card),
      dimensions: Object.fromEntries(Object.entries(card.dimensions).map(([key, value]) => [key, value.score])),
      command: `node ${HARNESS_CLI} --app ${result.repoPath} --variant ${variant} --output ${output.replace(`${ROOT}/`, "")}`,
      validationEvidence: {
        command: validationCommand.name,
        status: validationCommand.status,
        detail: validationCommand.detail,
      },
      file: output.replace(`${ROOT}/`, ""),
    });
  }
}

scorecards.sort((a, b) => b.composite - a.composite || a.appId - b.appId || a.variant.localeCompare(b.variant));

const byReason = blockers.reduce((acc, item) => {
  acc[item.reason] = (acc[item.reason] ?? 0) + 1;
  return acc;
}, {});

const byVariant = Object.fromEntries(VARIANTS.map((variant) => [
  variant,
  {
    scorecards: scorecards.filter((item) => item.variant === variant).length,
    blockers: blockers.filter((item) => item.variant === variant).length,
  },
]));

const byImplementationStatus = validation.results.reduce((acc, result) => {
  acc[result.implementationStatus] = (acc[result.implementationStatus] ?? 0) + 1;
  return acc;
}, {});

const summary = {
  generatedAt: new Date().toISOString(),
  runId: RUN_ID,
  category: CATEGORY,
  harnessCli: HARNESS_CLI,
  sourceValidationSummary: VALIDATION_SUMMARY.replace(`${ROOT}/`, ""),
  totalApps: validation.results.length,
  byImplementationStatus,
  variants: VARIANTS,
  totalTargets: validation.results.length * VARIANTS.length,
  scorecardCount: scorecards.length,
  blockerCount: blockers.length,
  averageComposite: average(scorecards.map((item) => item.composite)),
  byVariant,
  byReason,
  scorecards,
};

if (summary.totalTargets !== summary.scorecardCount + summary.blockerCount) {
  throw new Error(`scorecard accounting mismatch: targets=${summary.totalTargets}, scorecards=${summary.scorecardCount}, blockers=${summary.blockerCount}`);
}

await writeFile(join(OUT_DIR, "benchmark-blockers.json"), `${JSON.stringify({ generatedAt: summary.generatedAt, runId: RUN_ID, blockers }, null, 2)}\n`);
await writeFile(join(OUT_DIR, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const rows = scorecards
  .map((item) => `| ${padId(item.appId)} | ${item.appName} | ${item.variant} | ${item.composite.toFixed(2)} | ${item.file} |`)
  .join("\n");
const blockerRows = Object.entries(byReason)
  .map(([reason, count]) => `| ${reason} | ${count} |`)
  .join("\n");
const variantRows = Object.entries(byVariant)
  .map(([variant, counts]) => `| ${variant} | ${counts.scorecards} | ${counts.blockers} |`)
  .join("\n");
const implementationRows = Object.entries(byImplementationStatus)
  .map(([status, count]) => `| ${status} | ${count} |`)
  .join("\n");

await writeFile(join(OUT_DIR, "README.md"), `# Phase 13 Benchmark Scorecards

Generated: ${summary.generatedAt}
Run ID: \`${RUN_ID}\`

## Summary

- Total benchmark targets: ${summary.totalTargets}
- Scorecards produced: ${summary.scorecardCount}
- Blocker records produced: ${summary.blockerCount}
- Average composite across scored variants: ${summary.averageComposite.toFixed(2)}
- GitHub Actions used: no

## Accounting By Implementation Status

| Status | Repos |
| --- | ---: |
${implementationRows}

## Accounting By Variant

| Variant | Scorecards | Blockers |
| --- | ---: | ---: |
${variantRows}

## Blockers By Reason

| Reason | Count |
| --- | ---: |
${blockerRows}

## Scorecards

| ID | App | Variant | Composite | File |
| ---: | --- | --- | ---: | --- |
${rows}

## Notes

- Scorecards are generated only for variants with Step 13.6 executable validation evidence.
- Flutter and Android Native targets remain local-toolchain blocked and have blocker records instead of invented benchmark scores.
- The 38 scaffold-only repos are represented as implementation blockers for every variant until implementation evidence exists.
- The harness uses local source structure and available report files as conservative proxies when device, accessibility, or store-compliance reports are absent.
- No GitHub Actions workflows were created, modified, enabled, dispatched, or used.
`);

console.log(JSON.stringify({
  scorecards: scorecards.length,
  blockers: blockers.length,
  totalTargets: summary.totalTargets,
  byReason,
  averageComposite: summary.averageComposite,
}, null, 2));
