#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const HARNESS = process.env.MOBILE_BENCHMARK_HARNESS ?? "/tmp/mobile-benchmark-harness";
const DOWNSTREAM_ROOT = process.env.MOBILE_DOWNSTREAM_ROOT ?? "/tmp";
const OUT_DIR = join(ROOT, "tasks", "scorecards", "phase-11");
const RUN_ID = "phase-11-local-2026-05-13";
const CATEGORY = "AI & Assistants";
const VARIANTS = ["react-native", "flutter", "expo", "ios-native", "android-native"];

const APPS = [
  [1, "ChatGPT", "chatgpt-mobile-clone"],
  [2, "Claude", "claude-mobile-clone"],
  [3, "Perplexity", "perplexity-mobile-clone"],
  [4, "Character.AI", "character-ai-mobile-clone"],
  [5, "Replika", "replika-mobile-clone"],
  [201, "Poe", "poe-mobile-clone"],
  [202, "Gemini", "gemini-mobile-clone"],
  [203, "Microsoft Copilot", "microsoft-copilot-mobile-clone"],
  [204, "Grok", "grok-mobile-clone"],
  [205, "DeepSeek", "deepseek-mobile-clone"],
  [206, "Meta AI", "meta-ai-mobile-clone"],
  [207, "You.com", "you-com-mobile-clone"],
  [208, "Pi", "pi-mobile-clone"],
  [209, "Phind", "phind-mobile-clone"],
  [210, "HuggingChat", "huggingchat-mobile-clone"],
  [211, "Wysa", "wysa-mobile-clone"],
  [212, "ELSA Speak", "elsa-speak-mobile-clone"],
  [213, "OtterPilot", "otterpilot-mobile-clone"],
  [214, "Grammarly Keyboard", "grammarly-keyboard-mobile-clone"],
  [215, "Wordtune", "wordtune-mobile-clone"],
  [216, "QuillBot", "quillbot-mobile-clone"],
  [217, "Ask AI", "ask-ai-mobile-clone"],
  [218, "Genie", "genie-mobile-clone"],
  [219, "Monica", "monica-mobile-clone"],
  [220, "Notion AI", "notion-ai-mobile-clone"],
  [221, "Forefront AI", "forefront-ai-mobile-clone"],
  [222, "Consensus", "consensus-mobile-clone"],
];

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function blocker(appId, appName, repo, variant, reason, detail) {
  return {
    appId,
    appName,
    repo: `GeorgeQLe/${repo}`,
    category: CATEGORY,
    variant,
    status: "blocked",
    reason,
    detail,
    runId: RUN_ID,
  };
}

function average(values) {
  if (values.length === 0) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
}

await mkdir(OUT_DIR, { recursive: true });

const scorecards = [];
const blockers = [];

for (const [appId, appName, repo] of APPS) {
  const appPath = join(DOWNSTREAM_ROOT, repo);

  for (const variant of VARIANTS) {
    const variantPath = join(appPath, "variants", variant);
    const hasPackage = existsSync(join(variantPath, "package.json"));
    const hasSwiftPackage = existsSync(join(variantPath, "Package.swift"));
    const output = join(OUT_DIR, `${String(appId).padStart(3, "0")}-${slug(appName)}-${variant}.json`);

    if (variant === "flutter") {
      blockers.push(blocker(appId, appName, repo, variant, "missing-local-flutter-toolchain", "`flutter` is unavailable on PATH in the local validation environment."));
      continue;
    }

    if (variant === "android-native") {
      blockers.push(blocker(appId, appName, repo, variant, "missing-local-android-toolchain", "The macOS Java launcher is present but no Java runtime is installed, and Gradle is unavailable in the local validation environment."));
      continue;
    }

    if (!hasPackage && !hasSwiftPackage) {
      blockers.push(blocker(appId, appName, repo, variant, "missing-package-manifest", `No executable manifest found at variants/${variant}.`));
      continue;
    }

    const result = spawnSync("npm", [
      "run",
      "benchmark",
      "--",
      "--app",
      appPath,
      "--variant",
      variant,
      "--output",
      output,
      "--app-id",
      String(appId),
      "--app-name",
      appName,
      "--category",
      CATEGORY,
      "--run-id",
      RUN_ID,
    ], { cwd: HARNESS, encoding: "utf-8" });

    if (result.status !== 0) {
      throw new Error(`benchmark failed for ${repo} ${variant}\n${result.stdout}\n${result.stderr}`);
    }

    const card = JSON.parse(await readFile(output, "utf-8"));
    scorecards.push({
      appId,
      appName,
      repo: `GeorgeQLe/${repo}`,
      variant,
      composite: card.composite.score,
      dimensions: Object.fromEntries(Object.entries(card.dimensions).map(([key, value]) => [key, value.score])),
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

const summary = {
  generatedAt: new Date().toISOString(),
  runId: RUN_ID,
  category: CATEGORY,
  totalTargets: APPS.length * VARIANTS.length,
  scorecardCount: scorecards.length,
  blockerCount: blockers.length,
  averageComposite: average(scorecards.map((item) => item.composite)),
  byVariant,
  byReason,
  scorecards,
};

await writeFile(join(OUT_DIR, "benchmark-blockers.json"), `${JSON.stringify({ generatedAt: summary.generatedAt, runId: RUN_ID, blockers }, null, 2)}\n`);
await writeFile(join(OUT_DIR, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const rows = scorecards
  .map((item) => `| ${String(item.appId).padStart(3, "0")} | ${item.appName} | ${item.variant} | ${item.composite.toFixed(2)} | ${item.file} |`)
  .join("\n");
const blockerRows = Object.entries(byReason)
  .map(([reason, count]) => `| ${reason} | ${count} |`)
  .join("\n");

await writeFile(join(OUT_DIR, "README.md"), `# Phase 11 Benchmark Scorecards

Generated: ${summary.generatedAt}
Run ID: \`${RUN_ID}\`

## Summary

- Total benchmark targets: ${summary.totalTargets}
- Scorecards produced: ${summary.scorecardCount}
- Blocker records produced: ${summary.blockerCount}
- Average composite across scored variants: ${summary.averageComposite.toFixed(2)}

## Blockers By Reason

| Reason | Count |
| --- | ---: |
${blockerRows}

## Scorecards

| ID | App | Variant | Composite | File |
| ---: | --- | --- | ---: | --- |
${rows}

## Notes

- GitHub Actions were not used.
- Flutter and Android Native targets remain local-toolchain blocked.
- React Native/Expo targets without package manifests remain implementation gaps, not passing benchmark results.
- Performance, accessibility, and store-compliance dimensions are conservative when no local report/device evidence exists.
`);

console.log(JSON.stringify({
  scorecards: scorecards.length,
  blockers: blockers.length,
  byReason,
  averageComposite: summary.averageComposite,
}, null, 2));
