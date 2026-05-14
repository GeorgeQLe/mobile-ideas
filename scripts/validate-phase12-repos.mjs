#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const repoRoot = process.cwd();
const cloneRoot = process.env.PHASE12_CLONE_ROOT ?? "/tmp";
const reportPath = join(repoRoot, "tasks", "phase-12-validation-report.md");
const summaryPath = join(repoRoot, "tasks", "scorecards", "phase-12", "validation-summary.json");

const apps = [
  [6, "TikTok", "GeorgeQLe/tiktok-mobile-clone", "specs/batch-01/006-tiktok.md"],
  [7, "Instagram", "GeorgeQLe/instagram-mobile-clone", "specs/batch-01/007-instagram.md"],
  [8, "Snapchat", "GeorgeQLe/snapchat-mobile-clone", "specs/batch-01/008-snapchat.md"],
  [9, "BeReal", "GeorgeQLe/bereal-mobile-clone", "specs/batch-01/009-bereal.md"],
  [10, "Reddit", "GeorgeQLe/reddit-mobile-clone", "specs/batch-01/010-reddit.md"],
  [11, "X", "GeorgeQLe/x-mobile-clone", "specs/batch-01/011-x.md"],
  [12, "Bluesky", "GeorgeQLe/bluesky-mobile-clone", "specs/batch-01/012-bluesky.md"],
  [13, "Threads", "GeorgeQLe/threads-mobile-clone", "specs/batch-01/013-threads.md"],
  [14, "Pinterest", "GeorgeQLe/pinterest-mobile-clone", "specs/batch-01/014-pinterest.md"],
  [15, "Lemon8", "GeorgeQLe/lemon8-mobile-clone", "specs/batch-01/015-lemon8.md"],
  [101, "Tinder", "GeorgeQLe/tinder-mobile-clone", "specs/batch-06/101-tinder.md"],
  [102, "Bumble", "GeorgeQLe/bumble-mobile-clone", "specs/batch-06/102-bumble.md"],
  [103, "Hinge", "GeorgeQLe/hinge-mobile-clone", "specs/batch-06/103-hinge.md"],
  [104, "Grindr", "GeorgeQLe/grindr-mobile-clone", "specs/batch-06/104-grindr.md"],
  [105, "Match", "GeorgeQLe/match-mobile-clone", "specs/batch-06/105-match.md"],
  [106, "Coffee Meets Bagel", "GeorgeQLe/coffee-meets-bagel-mobile-clone", "specs/batch-06/106-coffee-meets-bagel.md"],
  [915, "Mastodon", "GeorgeQLe/mastodon-mobile-clone", "specs/batch-46/915-mastodon.md"],
  [916, "Tumblr", "GeorgeQLe/tumblr-mobile-clone", "specs/batch-46/916-tumblr.md"],
  [917, "Flickr", "GeorgeQLe/flickr-mobile-clone", "specs/batch-46/917-flickr.md"],
  [918, "500px", "GeorgeQLe/500px-mobile-clone", "specs/batch-46/918-500px.md"],
  [919, "Clubhouse", "GeorgeQLe/clubhouse-mobile-clone", "specs/batch-46/919-clubhouse.md"],
  [920, "Amino", "GeorgeQLe/amino-mobile-clone", "specs/batch-46/920-amino.md"],
  [921, "Weverse", "GeorgeQLe/weverse-mobile-clone", "specs/batch-47/921-weverse.md"],
  [922, "Patreon", "GeorgeQLe/patreon-mobile-clone", "specs/batch-47/922-patreon.md"],
  [923, "Buy Me a Coffee", "GeorgeQLe/buy-me-a-coffee-mobile-clone", "specs/batch-47/923-buy-me-a-coffee.md"],
  [924, "Ko-fi", "GeorgeQLe/ko-fi-mobile-clone", "specs/batch-47/924-ko-fi.md"],
  [925, "Cameo", "GeorgeQLe/cameo-mobile-clone", "specs/batch-47/925-cameo.md"],
  [926, "Guilded", "GeorgeQLe/guilded-mobile-clone", "specs/batch-47/926-guilded.md"],
  [927, "Geneva", "GeorgeQLe/geneva-mobile-clone", "specs/batch-47/927-geneva.md"],
  [928, "Fizz", "GeorgeQLe/fizz-mobile-clone", "specs/batch-47/928-fizz.md"],
  [929, "Yubo", "GeorgeQLe/yubo-mobile-clone", "specs/batch-47/929-yubo.md"],
  [930, "Poparazzi", "GeorgeQLe/poparazzi-mobile-clone", "specs/batch-47/930-poparazzi.md"],
  [931, "NGL", "GeorgeQLe/ngl-mobile-clone", "specs/batch-47/931-ngl.md"],
  [932, "Tellonym", "GeorgeQLe/tellonym-mobile-clone", "specs/batch-47/932-tellonym.md"],
  [933, "Rumble", "GeorgeQLe/rumble-mobile-clone", "specs/batch-47/933-rumble.md"],
  [934, "Truth Social", "GeorgeQLe/truth-social-mobile-clone", "specs/batch-47/934-truth-social.md"],
  [986, "Mighty Networks", "GeorgeQLe/mighty-networks-mobile-clone", "specs/batch-50/986-mighty-networks.md"],
  [987, "Circle Communities", "GeorgeQLe/circle-communities-mobile-clone", "specs/batch-50/987-circle-communities.md"],
  [988, "Skool", "GeorgeQLe/skool-mobile-clone", "specs/batch-50/988-skool.md"],
];

const requiredDirs = [
  "variants/react-native",
  "variants/flutter",
  "variants/expo",
  "variants/ios-native",
  "variants/android-native",
  "shared/assets",
  "shared/api-contracts",
  "shared/test-fixtures",
];

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...options.env },
  });
  return {
    command: [command, ...args].join(" "),
    status: result.status ?? 1,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

function runRequired(command, args, options = {}) {
  const result = run(command, args, options);
  if (result.status !== 0) {
    throw new Error(`${result.command}\n${result.stderr || result.stdout}`);
  }
  return result.stdout;
}

function commandAvailable(command) {
  return spawnSync("/usr/bin/which", [command], { stdio: "ignore" }).status === 0;
}

function ghJson(args) {
  return JSON.parse(execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
}

function refreshRepo(repo) {
  const localName = repo.split("/").at(-1);
  const localPath = join(cloneRoot, localName);
  if (existsSync(join(localPath, ".git"))) {
    runRequired("git", ["fetch", "--prune", "origin"], { cwd: localPath });
    const branch = runRequired("git", ["remote", "show", "origin"], { cwd: localPath })
      .split("\n")
      .find((line) => line.includes("HEAD branch:"))
      ?.split(":")
      .at(-1)
      ?.trim() ?? "main";
    runRequired("git", ["checkout", branch], { cwd: localPath });
    runRequired("git", ["pull", "--ff-only", "origin", branch], { cwd: localPath });
  } else {
    runRequired("git", ["clone", `https://github.com/${repo}.git`, localPath]);
  }
  return localPath;
}

function packageScripts(repoPath) {
  const packagePath = join(repoPath, "package.json");
  if (!existsSync(packagePath)) return {};
  return JSON.parse(readFileSync(packagePath, "utf8")).scripts ?? {};
}

function swiftCommand(repoPath, id) {
  const sourceRoot = join(repoPath, "variants", "ios-native", "Sources");
  if (!existsSync(sourceRoot)) return null;
  const modules = readdirSync(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  if (modules.length !== 1) return null;
  const moduleDir = join(sourceRoot, modules[0].name);
  const files = ["AppModel.swift", "main.swift"].map((file) => join(moduleDir, file));
  if (!files.every(existsSync)) return null;
  return {
    command: "swiftc",
    args: ["-module-cache-path", "/tmp/swift-module-cache-phase12", ...files, "-o", `/tmp/phase12-${id}-ios`],
    runArgs: [`/tmp/phase12-${id}-ios`],
  };
}

function checkRepoStructure(repoPath, specPath) {
  const missing = [];
  for (const dir of requiredDirs) {
    if (!existsSync(join(repoPath, dir))) missing.push(dir);
  }
  for (const file of ["README.md", "docs/plans/README.md", `docs/source-specs/${basename(specPath)}`]) {
    if (!existsSync(join(repoPath, file))) missing.push(file);
  }
  return missing;
}

function summarizeOutput(result) {
  const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
  return output.split("\n").filter(Boolean).slice(-2).join(" | ");
}

const toolchains = {
  node: commandAvailable("node"),
  npm: commandAvailable("npm"),
  swiftc: commandAvailable("swiftc"),
  dart: commandAvailable("dart"),
  flutter: commandAvailable("flutter"),
  kotlinc: commandAvailable("kotlinc"),
};

const results = [];
let failureCount = 0;
let passedCommands = 0;
let blockerCount = 0;

for (const [id, app, repo, specPath] of apps) {
  console.log(`validating ${String(id).padStart(3, "0")} ${repo}`);
  const info = ghJson(["repo", "view", repo, "--json", "visibility,defaultBranchRef,isEmpty,nameWithOwner"]);
  const repoPath = refreshRepo(repo);
  const commit = runRequired("git", ["rev-parse", "--short", "HEAD"], { cwd: repoPath });
  const branch = runRequired("git", ["branch", "--show-current"], { cwd: repoPath });
  const missing = checkRepoStructure(repoPath, specPath);
  const commands = [];

  const scripts = packageScripts(repoPath);
  for (const scriptName of ["validate", "test:react-native", "test:expo"]) {
    if (scripts[scriptName]) {
      const result = run("npm", ["run", scriptName], { cwd: repoPath });
      commands.push({ name: `npm run ${scriptName}`, status: result.status === 0 ? "pass" : "fail", detail: summarizeOutput(result) });
      if (result.status === 0) passedCommands += 1;
      else failureCount += 1;
    } else {
      commands.push({ name: `npm run ${scriptName}`, status: "blocker", detail: "package script is missing" });
      blockerCount += 1;
    }
  }

  const swift = swiftCommand(repoPath, id);
  if (!toolchains.swiftc) {
    commands.push({ name: "swiftc iOS Native model", status: "blocker", detail: "swiftc is not installed locally" });
    blockerCount += 1;
  } else if (!swift) {
    commands.push({ name: "swiftc iOS Native model", status: "blocker", detail: "Swift model sources are missing or ambiguous" });
    blockerCount += 1;
  } else {
    const compile = run(swift.command, swift.args, { cwd: repoPath });
    const execute = compile.status === 0 ? run(swift.runArgs[0], [], { cwd: repoPath }) : null;
    const passed = compile.status === 0 && execute?.status === 0;
    commands.push({
      name: "swiftc iOS Native model",
      status: passed ? "pass" : "fail",
      detail: passed ? summarizeOutput(execute) : summarizeOutput(compile),
    });
    if (passed) passedCommands += 1;
    else failureCount += 1;
  }

  commands.push({
    name: "Flutter runtime validation",
    status: toolchains.dart && toolchains.flutter ? "blocker" : "blocker",
    detail: toolchains.dart && toolchains.flutter
      ? "Flutter model stubs exist, but no repo-local executable Flutter test command is defined"
      : "dart/flutter are not installed locally",
  });
  commands.push({
    name: "Android Native runtime validation",
    status: toolchains.kotlinc ? "blocker" : "blocker",
    detail: toolchains.kotlinc
      ? "Android Kotlin model stubs exist, but no repo-local executable Android test command is defined"
      : "kotlinc is not installed locally",
  });
  blockerCount += 2;

  if (info.visibility !== "PRIVATE" || info.isEmpty || missing.length) failureCount += 1;

  results.push({
    id,
    app,
    repo,
    repoPath,
    visibility: info.visibility,
    defaultBranch: info.defaultBranchRef?.name ?? null,
    localBranch: branch,
    commit,
    missing,
    commands,
  });
}

const reportLines = [
  "# Phase 12 Validation Report",
  "",
  `Generated: 2026-05-14`,
  "",
  "## Summary",
  "",
  `- Repos checked: ${results.length}`,
  `- Executable command passes: ${passedCommands}`,
  `- Unexpected failures: ${failureCount}`,
  `- Explicit blockers: ${blockerCount}`,
  `- GitHub Actions used: no`,
  `- Flutter/Dart toolchain: ${toolchains.dart && toolchains.flutter ? "available" : "blocked locally"}`,
  `- Android Kotlin toolchain: ${toolchains.kotlinc ? "available" : "blocked locally"}`,
  "",
  "## Toolchain Probes",
  "",
  `- node: ${toolchains.node ? "available" : "missing"}`,
  `- npm: ${toolchains.npm ? "available" : "missing"}`,
  `- swiftc: ${toolchains.swiftc ? "available" : "missing"}`,
  `- dart: ${toolchains.dart ? "available" : "missing"}`,
  `- flutter: ${toolchains.flutter ? "available" : "missing"}`,
  `- kotlinc: ${toolchains.kotlinc ? "available" : "missing"}`,
  "",
  "## Results",
  "",
  "| ID | App | Repo | Commit | Privacy | Validation | Blockers |",
  "|---:|---|---|---|---|---|---|",
];

for (const row of results) {
  const passes = row.commands.filter((command) => command.status === "pass").length;
  const failures = row.commands.filter((command) => command.status === "fail").length;
  const blockers = row.commands.filter((command) => command.status === "blocker").length;
  const validation = failures
    ? `${passes} pass, ${failures} fail`
    : `${passes} pass`;
  reportLines.push(`| ${String(row.id).padStart(3, "0")} | ${row.app} | \`${row.repo}\` | \`${row.commit}\` | ${row.visibility} | ${validation} | ${blockers} |`);
}

reportLines.push("", "## Command Evidence", "");
for (const row of results) {
  reportLines.push(`### ${String(row.id).padStart(3, "0")} ${row.app}`);
  reportLines.push("");
  reportLines.push(`- Repo: \`${row.repo}\``);
  reportLines.push(`- Local path: \`${row.repoPath}\``);
  reportLines.push(`- Branch: \`${row.localBranch}\`; default branch: \`${row.defaultBranch}\`; commit: \`${row.commit}\``);
  reportLines.push(`- Privacy: \`${row.visibility}\``);
  reportLines.push(`- Structure: ${row.missing.length ? `missing ${row.missing.map((item) => `\`${item}\``).join(", ")}` : "all required scaffold/source files present"}`);
  for (const command of row.commands) {
    reportLines.push(`- ${command.status.toUpperCase()}: \`${command.name}\` — ${command.detail || "no output"}`);
  }
  reportLines.push("");
}

reportLines.push(
  "## Blocker Policy",
  "",
  "- Flutter and Android Native validation remain explicit local toolchain blockers where `dart`/`flutter` or `kotlinc` are unavailable.",
  "- Blocker rows are not counted as passing executable validation and must not be used as launch-readiness evidence.",
  "- GitHub Actions were not enabled, dispatched, or used for this validation sweep.",
);

mkdirSync(join(repoRoot, "tasks", "scorecards", "phase-12"), { recursive: true });
writeFileSync(reportPath, `${reportLines.join("\n")}\n`);
writeFileSync(summaryPath, `${JSON.stringify({ generated: "2026-05-14", toolchains, passedCommands, failureCount, blockerCount, results }, null, 2)}\n`);

console.log(JSON.stringify({ repos: results.length, passedCommands, failureCount, blockerCount, reportPath, summaryPath }, null, 2));
if (failureCount > 0) process.exitCode = 1;
