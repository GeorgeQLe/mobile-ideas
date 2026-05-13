#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const GENERATED_AT = "2026-05-13T00:00:00.000Z";
const CATEGORY = "AI & Assistants";
const OUT_DIR = path.join("tasks", "scorecards", "phase-11");

const apps = [
  [1, "ChatGPT", "GeorgeQLe/chatgpt-mobile-clone", true],
  [2, "Claude", "GeorgeQLe/claude-mobile-clone", true],
  [3, "Perplexity", "GeorgeQLe/perplexity-mobile-clone", true],
  [4, "Character.AI", "GeorgeQLe/character-ai-mobile-clone", false],
  [5, "Replika", "GeorgeQLe/replika-mobile-clone", true],
  [201, "Poe", "GeorgeQLe/poe-mobile-clone", true],
  [202, "Gemini", "GeorgeQLe/gemini-mobile-clone", true],
  [203, "Microsoft Copilot", "GeorgeQLe/microsoft-copilot-mobile-clone", true],
  [204, "Grok", "GeorgeQLe/grok-mobile-clone", true],
  [205, "DeepSeek", "GeorgeQLe/deepseek-mobile-clone", true],
  [206, "Meta AI", "GeorgeQLe/meta-ai-mobile-clone", true],
  [207, "You.com", "GeorgeQLe/you-com-mobile-clone", true],
  [208, "Pi", "GeorgeQLe/pi-mobile-clone", true],
  [209, "Phind", "GeorgeQLe/phind-mobile-clone", true],
  [210, "HuggingChat", "GeorgeQLe/huggingchat-mobile-clone", true],
  [211, "Wysa", "GeorgeQLe/wysa-mobile-clone", false],
  [212, "ELSA Speak", "GeorgeQLe/elsa-speak-mobile-clone", false],
  [213, "OtterPilot", "GeorgeQLe/otterpilot-mobile-clone", false],
  [214, "Grammarly Keyboard", "GeorgeQLe/grammarly-keyboard-mobile-clone", false],
  [215, "Wordtune", "GeorgeQLe/wordtune-mobile-clone", false],
  [216, "QuillBot", "GeorgeQLe/quillbot-mobile-clone", false],
  [217, "Ask AI", "GeorgeQLe/ask-ai-mobile-clone", false],
  [218, "Genie", "GeorgeQLe/genie-mobile-clone", false],
  [219, "Monica", "GeorgeQLe/monica-mobile-clone", false],
  [220, "Notion AI", "GeorgeQLe/notion-ai-mobile-clone", false],
  [221, "Forefront AI", "GeorgeQLe/forefront-ai-mobile-clone", false],
  [222, "Consensus", "GeorgeQLe/consensus-mobile-clone", false],
];

const variants = ["react-native", "flutter", "expo", "ios-native", "android-native"];

function blockerFor(hasJsManifest, variant) {
  if (variant === "react-native" || variant === "expo") {
    if (!hasJsManifest) {
      return {
        code: "missing-package-manifest",
        summary: `${variant} package manifest is absent on main`,
        evidence: "tasks/phase-11-validation-report.md#formal-implementation-gaps",
      };
    }
    return {
      code: "benchmark-harness-cli-unimplemented",
      summary: "mobile-benchmark-harness CLI exits before producing scorecard output",
      evidence: "`npm run benchmark -- --app /tmp/example --variant ios-native --output /tmp/example.json` exited 1 with placeholder CLI message",
    };
  }

  if (variant === "ios-native") {
    return {
      code: "benchmark-harness-cli-unimplemented",
      summary: "iOS Native validation passed, but benchmark harness CLI is not implemented",
      evidence: "`npm run build` passed in /tmp/mobile-benchmark-harness; CLI still exits 1 before measurement",
    };
  }

  if (variant === "flutter") {
    return {
      code: "missing-local-flutter-toolchain",
      summary: "Flutter is unavailable on PATH, so Flutter variants cannot be benchmarked locally",
      evidence: "tasks/phase-11-validation-report.md#toolchain-blockers",
    };
  }

  return {
    code: "missing-local-android-toolchain",
    summary: "Java/Gradle are unavailable, so Android Native variants cannot be benchmarked locally",
    evidence: "tasks/phase-11-validation-report.md#toolchain-blockers",
  };
}

function buildRecords() {
  return apps.flatMap(([appId, appName, repo, hasJsManifest]) =>
    variants.map((variant) => ({
      appId,
      appName,
      category: CATEGORY,
      repo,
      variant,
      status: "blocked",
      generatedAt: GENERATED_AT,
      blocker: blockerFor(hasJsManifest, variant),
      scorecardProduced: false,
    })),
  );
}

function summarize(records) {
  const byCode = {};
  const byVariant = {};
  for (const record of records) {
    byCode[record.blocker.code] = (byCode[record.blocker.code] ?? 0) + 1;
    byVariant[record.variant] = (byVariant[record.variant] ?? 0) + 1;
  }
  return {
    generatedAt: GENERATED_AT,
    category: CATEGORY,
    appCount: apps.length,
    variantCount: records.length,
    scorecardsProduced: 0,
    blockersProduced: records.length,
    byCode,
    byVariant,
    harnessValidation: {
      build: "passed",
      test: "failed: node --test cannot resolve src/scoring/composite.js from test/validate-pilot.ts",
      cli: "failed: dist/cli/index.js prints placeholder and exits 1",
    },
  };
}

function markdown(summary) {
  const codeRows = Object.entries(summary.byCode)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, count]) => `| ${code} | ${count} |`)
    .join("\n");

  return `# Phase 11 Benchmark Blocker Report

## Summary

Step 11.12 could not produce valid benchmark scorecards because the local benchmark harness has no implemented CLI runner.

- Generated at: ${summary.generatedAt}
- Category: ${summary.category}
- Apps covered: ${summary.appCount}
- Variants covered: ${summary.variantCount}
- Scorecards produced: ${summary.scorecardsProduced}
- Blocker records produced: ${summary.blockersProduced}

## Harness Evidence

- Build: ${summary.harnessValidation.build}
- Test: ${summary.harnessValidation.test}
- CLI: ${summary.harnessValidation.cli}

## Blockers By Code

| Blocker | Count |
| --- | ---: |
${codeRows}

## Disposition

No benchmark scores were invented. Step 11.12 remains blocked until the harness CLI can produce schema-valid scorecards or an alternate approved benchmark runner exists. The generated JSON records cover all 27 apps x 5 variants and preserve the Step 11.11 manifest/toolchain blockers.
`;
}

await mkdir(OUT_DIR, { recursive: true });
const records = buildRecords();
const summary = summarize(records);

await writeFile(path.join(OUT_DIR, "benchmark-blockers.json"), `${JSON.stringify({ summary, records }, null, 2)}\n`);
await writeFile(path.join(OUT_DIR, "README.md"), markdown(summary));

console.log(`Wrote ${records.length} blocker records to ${OUT_DIR}`);
