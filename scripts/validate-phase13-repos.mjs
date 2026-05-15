#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const repoRoot = process.cwd();
const cloneRoot = process.env.PHASE13_CLONE_ROOT ?? "/tmp";
const generatedDate = "2026-05-15";
const reportPath = join(repoRoot, "tasks", "phase-13-validation-report.md");
const summaryPath = join(repoRoot, "tasks", "scorecards", "phase-13", "validation-summary.json");

const apps = [
  [16, "WhatsApp", "GeorgeQLe/whatsapp-mobile-clone", "specs/batch-01/016-whatsapp.md"],
  [17, "Telegram", "GeorgeQLe/telegram-mobile-clone", "specs/batch-01/017-telegram.md"],
  [18, "Signal", "GeorgeQLe/signal-mobile-clone", "specs/batch-01/018-signal.md"],
  [19, "Discord", "GeorgeQLe/discord-mobile-clone", "specs/batch-01/019-discord.md"],
  [20, "Slack", "GeorgeQLe/slack-mobile-clone", "specs/batch-01/020-slack.md"],
  [21, "Messenger", "GeorgeQLe/messenger-mobile-clone", "specs/batch-02/021-messenger.md"],
  [22, "FaceTime", "GeorgeQLe/facetime-mobile-clone", "specs/batch-02/022-facetime.md"],
  [23, "Zoom", "GeorgeQLe/zoom-mobile-clone", "specs/batch-02/023-zoom.md"],
  [24, "Gmail", "GeorgeQLe/gmail-mobile-clone", "specs/batch-02/024-gmail.md"],
  [25, "Outlook", "GeorgeQLe/outlook-mobile-clone", "specs/batch-02/025-outlook.md"],
  [935, "Viber", "GeorgeQLe/viber-mobile-clone", "specs/batch-47/935-viber.md"],
  [936, "WeChat", "GeorgeQLe/wechat-mobile-clone", "specs/batch-47/936-wechat.md"],
  [937, "LINE", "GeorgeQLe/line-mobile-clone", "specs/batch-47/937-line.md"],
  [938, "KakaoTalk", "GeorgeQLe/kakaotalk-mobile-clone", "specs/batch-47/938-kakaotalk.md"],
  [939, "Skype", "GeorgeQLe/skype-mobile-clone", "specs/batch-47/939-skype.md"],
  [940, "Google Voice", "GeorgeQLe/google-voice-mobile-clone", "specs/batch-47/940-google-voice.md"],
  [941, "TextNow", "GeorgeQLe/textnow-mobile-clone", "specs/batch-48/941-textnow.md"],
  [942, "TextFree", "GeorgeQLe/textfree-mobile-clone", "specs/batch-48/942-textfree.md"],
  [943, "GroupMe", "GeorgeQLe/groupme-mobile-clone", "specs/batch-48/943-groupme.md"],
  [944, "Marco Polo", "GeorgeQLe/marco-polo-mobile-clone", "specs/batch-48/944-marco-polo.md"],
  [945, "Voxer", "GeorgeQLe/voxer-mobile-clone", "specs/batch-48/945-voxer.md"],
  [946, "Microsoft Teams", "GeorgeQLe/microsoft-teams-mobile-clone", "specs/batch-48/946-microsoft-teams.md"],
  [947, "Cisco Webex", "GeorgeQLe/cisco-webex-mobile-clone", "specs/batch-48/947-cisco-webex.md"],
  [948, "Google Meet", "GeorgeQLe/google-meet-mobile-clone", "specs/batch-48/948-google-meet.md"],
  [949, "GoTo", "GeorgeQLe/goto-mobile-clone", "specs/batch-48/949-goto.md"],
  [950, "BlueJeans", "GeorgeQLe/bluejeans-mobile-clone", "specs/batch-48/950-bluejeans.md"],
  [951, "Jitsi Meet", "GeorgeQLe/jitsi-meet-mobile-clone", "specs/batch-48/951-jitsi-meet.md"],
  [952, "Proton Mail", "GeorgeQLe/proton-mail-mobile-clone", "specs/batch-48/952-proton-mail.md"],
  [953, "Yahoo Mail", "GeorgeQLe/yahoo-mail-mobile-clone", "specs/batch-48/953-yahoo-mail.md"],
  [954, "AOL Mail", "GeorgeQLe/aol-mail-mobile-clone", "specs/batch-48/954-aol-mail.md"],
  [955, "Spark Mail", "GeorgeQLe/spark-mail-mobile-clone", "specs/batch-48/955-spark-mail.md"],
  [956, "Edison Mail", "GeorgeQLe/edison-mail-mobile-clone", "specs/batch-48/956-edison-mail.md"],
  [957, "BlueMail", "GeorgeQLe/bluemail-mobile-clone", "specs/batch-48/957-bluemail.md"],
  [958, "Canary Mail", "GeorgeQLe/canary-mail-mobile-clone", "specs/batch-48/958-canary-mail.md"],
  [959, "Fastmail", "GeorgeQLe/fastmail-mobile-clone", "specs/batch-48/959-fastmail.md"],
  [960, "HEY", "GeorgeQLe/hey-mobile-clone", "specs/batch-48/960-hey.md"],
  [961, "Tuta Mail", "GeorgeQLe/tuta-mail-mobile-clone", "specs/batch-49/961-tuta-mail.md"],
  [962, "Zoho Mail", "GeorgeQLe/zoho-mail-mobile-clone", "specs/batch-49/962-zoho-mail.md"],
  [963, "Spike", "GeorgeQLe/spike-mobile-clone", "specs/batch-49/963-spike.md"],
  [964, "Superhuman", "GeorgeQLe/superhuman-mobile-clone", "specs/batch-49/964-superhuman.md"],
  [965, "Shortwave", "GeorgeQLe/shortwave-mobile-clone", "specs/batch-49/965-shortwave.md"],
  [966, "Clean Email", "GeorgeQLe/clean-email-mobile-clone", "specs/batch-49/966-clean-email.md"],
  [967, "Unroll.Me", "GeorgeQLe/unroll-me-mobile-clone", "specs/batch-49/967-unroll-me.md"],
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

const optionalPackageScripts = ["lint", "typecheck", "build", "test"];

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
  const files = readdirSync(moduleDir)
    .filter((file) => file.endsWith(".swift"))
    .sort()
    .map((file) => join(moduleDir, file));
  if (!files.some((file) => basename(file) === "main.swift")) return null;
  return {
    command: "swiftc",
    args: ["-module-cache-path", "/tmp/swift-module-cache-phase13", ...files, "-o", `/tmp/phase13-${id}-ios`],
    runArgs: [`/tmp/phase13-${id}-ios`],
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

function countStatus(commands, status) {
  return commands.filter((command) => command.status === status).length;
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
let implementationBlockerCount = 0;

for (const [id, app, repo, specPath] of apps) {
  console.log(`validating ${String(id).padStart(3, "0")} ${repo}`);
  const info = ghJson(["repo", "view", repo, "--json", "visibility,defaultBranchRef,isEmpty,nameWithOwner"]);
  if (info.visibility !== "PRIVATE") {
    throw new Error(`Privacy verification failed for ${repo}: ${info.visibility}`);
  }

  const repoPath = refreshRepo(repo);
  const commit = runRequired("git", ["rev-parse", "--short", "HEAD"], { cwd: repoPath });
  const branch = runRequired("git", ["branch", "--show-current"], { cwd: repoPath });
  const missing = checkRepoStructure(repoPath, specPath);
  const commands = [];

  const scripts = packageScripts(repoPath);
  const requiredScripts = ["validate", "test:react-native", "test:expo"];
  for (const scriptName of requiredScripts) {
    if (scripts[scriptName]) {
      const result = run("npm", ["run", scriptName], { cwd: repoPath });
      commands.push({
        name: `npm run ${scriptName}`,
        status: result.status === 0 ? "pass" : "fail",
        detail: summarizeOutput(result),
      });
      if (result.status === 0) passedCommands += 1;
      else failureCount += 1;
    } else {
      commands.push({
        name: `npm run ${scriptName}`,
        status: "blocker",
        detail: "implementation package script is missing; repo remains scaffold-only for this evidence path",
      });
      blockerCount += 1;
      implementationBlockerCount += 1;
    }
  }

  for (const scriptName of optionalPackageScripts) {
    if (!scripts[scriptName] || requiredScripts.includes(scriptName)) continue;
    const result = run("npm", ["run", scriptName], { cwd: repoPath });
    commands.push({
      name: `npm run ${scriptName}`,
      status: result.status === 0 ? "pass" : "fail",
      detail: summarizeOutput(result),
    });
    if (result.status === 0) passedCommands += 1;
    else failureCount += 1;
  }

  const swift = swiftCommand(repoPath, id);
  if (!toolchains.swiftc) {
    commands.push({ name: "swiftc iOS Native model", status: "blocker", detail: "swiftc is not installed locally" });
    blockerCount += 1;
  } else if (!swift) {
    commands.push({
      name: "swiftc iOS Native model",
      status: "blocker",
      detail: "Swift model sources are missing or ambiguous; iOS Native remains scaffold-only",
    });
    blockerCount += 1;
    implementationBlockerCount += 1;
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
    status: "blocker",
    detail: toolchains.dart && toolchains.flutter
      ? "Flutter model stubs may exist, but no repo-local executable Flutter test command is defined"
      : "dart/flutter are not installed locally",
  });
  commands.push({
    name: "Android Native runtime validation",
    status: "blocker",
    detail: toolchains.kotlinc
      ? "Android Kotlin model stubs may exist, but no repo-local executable Android test command is defined"
      : "kotlinc is not installed locally",
  });
  blockerCount += 2;

  const diffCheck = run("git", ["diff", "--check"], { cwd: repoPath });
  commands.push({
    name: "git diff --check",
    status: diffCheck.status === 0 ? "pass" : "fail",
    detail: summarizeOutput(diffCheck) || "no whitespace errors",
  });
  if (diffCheck.status === 0) passedCommands += 1;
  else failureCount += 1;

  if (info.isEmpty || !info.defaultBranchRef?.name || missing.length) failureCount += 1;

  const implemented = requiredScripts.every((scriptName) => scripts[scriptName]) && Boolean(swift);
  results.push({
    id,
    app,
    repo,
    repoPath,
    visibility: info.visibility,
    defaultBranch: info.defaultBranchRef?.name ?? null,
    localBranch: branch,
    commit,
    implementationStatus: implemented ? "implemented" : "scaffold-only",
    missing,
    commands,
  });
}

const reportLines = [
  "# Phase 13 Validation Report",
  "",
  `Generated: ${generatedDate}`,
  "",
  "## Summary",
  "",
  `- Repos checked: ${results.length}`,
  `- Implemented repos with executable variant evidence: ${results.filter((row) => row.implementationStatus === "implemented").length}`,
  `- Scaffold-only repos with implementation blockers: ${results.filter((row) => row.implementationStatus === "scaffold-only").length}`,
  `- Executable command passes: ${passedCommands}`,
  `- Unexpected failures: ${failureCount}`,
  `- Explicit blockers: ${blockerCount}`,
  `- Implementation blockers: ${implementationBlockerCount}`,
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
  "| ID | App | Repo | Commit | Privacy | Implementation | Validation | Blockers |",
  "|---:|---|---|---|---|---|---|---|",
];

for (const row of results) {
  const passes = countStatus(row.commands, "pass");
  const failures = countStatus(row.commands, "fail");
  const blockers = countStatus(row.commands, "blocker");
  const validation = failures ? `${passes} pass, ${failures} fail` : `${passes} pass`;
  reportLines.push(`| ${String(row.id).padStart(3, "0")} | ${row.app} | \`${row.repo}\` | \`${row.commit}\` | ${row.visibility} | ${row.implementationStatus} | ${validation} | ${blockers} |`);
}

reportLines.push("", "## Command Evidence", "");
for (const row of results) {
  reportLines.push(`### ${String(row.id).padStart(3, "0")} ${row.app}`);
  reportLines.push("");
  reportLines.push(`- Repo: \`${row.repo}\``);
  reportLines.push(`- Local path: \`${row.repoPath}\``);
  reportLines.push(`- Branch: \`${row.localBranch}\`; default branch: \`${row.defaultBranch}\`; commit: \`${row.commit}\``);
  reportLines.push(`- Privacy: \`${row.visibility}\``);
  reportLines.push(`- Implementation: \`${row.implementationStatus}\``);
  reportLines.push(`- Structure: ${row.missing.length ? `missing ${row.missing.map((item) => `\`${item}\``).join(", ")}` : "all required scaffold/source files present"}`);
  for (const command of row.commands) {
    reportLines.push(`- ${command.status.toUpperCase()}: \`${command.name}\` - ${command.detail || "no output"}`);
  }
  reportLines.push("");
}

reportLines.push(
  "## Blocker Policy",
  "",
  "- Scaffold-only repositories are recorded as implementation blockers and are not counted as passing variant evidence.",
  "- Flutter and Android Native validation remain explicit local toolchain blockers where `dart`/`flutter` or `kotlinc` are unavailable.",
  "- Blocker rows are not counted as passing executable validation and must not be used as launch-readiness evidence.",
  "- GitHub Actions were not enabled, dispatched, or used for this validation sweep.",
);

mkdirSync(join(repoRoot, "tasks", "scorecards", "phase-13"), { recursive: true });
writeFileSync(reportPath, `${reportLines.join("\n")}\n`);
writeFileSync(summaryPath, `${JSON.stringify({
  generated: generatedDate,
  toolchains,
  passedCommands,
  failureCount,
  blockerCount,
  implementationBlockerCount,
  results,
}, null, 2)}\n`);

console.log(JSON.stringify({ repos: results.length, passedCommands, failureCount, blockerCount, implementationBlockerCount, reportPath, summaryPath }, null, 2));
if (failureCount > 0) process.exitCode = 1;
