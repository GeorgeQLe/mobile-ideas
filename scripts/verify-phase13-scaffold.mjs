#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

const repos = [
  [16, "GeorgeQLe/whatsapp-mobile-clone", "specs/batch-01/016-whatsapp.md"],
  [17, "GeorgeQLe/telegram-mobile-clone", "specs/batch-01/017-telegram.md"],
  [18, "GeorgeQLe/signal-mobile-clone", "specs/batch-01/018-signal.md"],
  [19, "GeorgeQLe/discord-mobile-clone", "specs/batch-01/019-discord.md"],
  [20, "GeorgeQLe/slack-mobile-clone", "specs/batch-01/020-slack.md"],
  [21, "GeorgeQLe/messenger-mobile-clone", "specs/batch-02/021-messenger.md"],
  [22, "GeorgeQLe/facetime-mobile-clone", "specs/batch-02/022-facetime.md"],
  [23, "GeorgeQLe/zoom-mobile-clone", "specs/batch-02/023-zoom.md"],
  [24, "GeorgeQLe/gmail-mobile-clone", "specs/batch-02/024-gmail.md"],
  [25, "GeorgeQLe/outlook-mobile-clone", "specs/batch-02/025-outlook.md"],
  [935, "GeorgeQLe/viber-mobile-clone", "specs/batch-47/935-viber.md"],
  [936, "GeorgeQLe/wechat-mobile-clone", "specs/batch-47/936-wechat.md"],
  [937, "GeorgeQLe/line-mobile-clone", "specs/batch-47/937-line.md"],
  [938, "GeorgeQLe/kakaotalk-mobile-clone", "specs/batch-47/938-kakaotalk.md"],
  [939, "GeorgeQLe/skype-mobile-clone", "specs/batch-47/939-skype.md"],
  [940, "GeorgeQLe/google-voice-mobile-clone", "specs/batch-47/940-google-voice.md"],
  [941, "GeorgeQLe/textnow-mobile-clone", "specs/batch-48/941-textnow.md"],
  [942, "GeorgeQLe/textfree-mobile-clone", "specs/batch-48/942-textfree.md"],
  [943, "GeorgeQLe/groupme-mobile-clone", "specs/batch-48/943-groupme.md"],
  [944, "GeorgeQLe/marco-polo-mobile-clone", "specs/batch-48/944-marco-polo.md"],
  [945, "GeorgeQLe/voxer-mobile-clone", "specs/batch-48/945-voxer.md"],
  [946, "GeorgeQLe/microsoft-teams-mobile-clone", "specs/batch-48/946-microsoft-teams.md"],
  [947, "GeorgeQLe/cisco-webex-mobile-clone", "specs/batch-48/947-cisco-webex.md"],
  [948, "GeorgeQLe/google-meet-mobile-clone", "specs/batch-48/948-google-meet.md"],
  [949, "GeorgeQLe/goto-mobile-clone", "specs/batch-48/949-goto.md"],
  [950, "GeorgeQLe/bluejeans-mobile-clone", "specs/batch-48/950-bluejeans.md"],
  [951, "GeorgeQLe/jitsi-meet-mobile-clone", "specs/batch-48/951-jitsi-meet.md"],
  [952, "GeorgeQLe/proton-mail-mobile-clone", "specs/batch-48/952-proton-mail.md"],
  [953, "GeorgeQLe/yahoo-mail-mobile-clone", "specs/batch-48/953-yahoo-mail.md"],
  [954, "GeorgeQLe/aol-mail-mobile-clone", "specs/batch-48/954-aol-mail.md"],
  [955, "GeorgeQLe/spark-mail-mobile-clone", "specs/batch-48/955-spark-mail.md"],
  [956, "GeorgeQLe/edison-mail-mobile-clone", "specs/batch-48/956-edison-mail.md"],
  [957, "GeorgeQLe/bluemail-mobile-clone", "specs/batch-48/957-bluemail.md"],
  [958, "GeorgeQLe/canary-mail-mobile-clone", "specs/batch-48/958-canary-mail.md"],
  [959, "GeorgeQLe/fastmail-mobile-clone", "specs/batch-48/959-fastmail.md"],
  [960, "GeorgeQLe/hey-mobile-clone", "specs/batch-48/960-hey.md"],
  [961, "GeorgeQLe/tuta-mail-mobile-clone", "specs/batch-49/961-tuta-mail.md"],
  [962, "GeorgeQLe/zoho-mail-mobile-clone", "specs/batch-49/962-zoho-mail.md"],
  [963, "GeorgeQLe/spike-mobile-clone", "specs/batch-49/963-spike.md"],
  [964, "GeorgeQLe/superhuman-mobile-clone", "specs/batch-49/964-superhuman.md"],
  [965, "GeorgeQLe/shortwave-mobile-clone", "specs/batch-49/965-shortwave.md"],
  [966, "GeorgeQLe/clean-email-mobile-clone", "specs/batch-49/966-clean-email.md"],
  [967, "GeorgeQLe/unroll-me-mobile-clone", "specs/batch-49/967-unroll-me.md"],
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

const requiredFiles = ["README.md", "docs/plans/README.md"];
const repair = process.argv.includes("--repair");

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function run(command, args, options = {}) {
  const attempts = options.attempts ?? (command === "gh" ? 3 : 1);
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return execFileSync(command, args, {
        cwd: options.cwd,
        encoding: "utf8",
        stdio: options.inherit ? "inherit" : ["ignore", "pipe", "pipe"],
      }).trim();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      sleep(2_000 * attempt);
    }
  }
  throw lastError;
}

function gh(args, options) {
  return run("gh", args, options);
}

function git(args, options) {
  return run("git", args, options);
}

function placeholder(path) {
  return `# ${basename(path)}

Status: scaffold placeholder.

This directory is reserved for Phase 13 implementation work. Keep source code,
fixtures, assets, and validation evidence original to this repository.
`;
}

function repairRepo(id, repo, branch, missingDirs) {
  const workRoot = mkdtempSync(join(tmpdir(), `phase13-${id}-`));
  const laneBranch = `phase13-scaffold-${id}`;
  try {
    git(["clone", `https://github.com/${repo}.git`, workRoot]);
    git(["switch", "-c", laneBranch], { cwd: workRoot });
    for (const dir of missingDirs) {
      mkdirSync(join(workRoot, dir), { recursive: true });
      writeFileSync(join(workRoot, dir, ".gitkeep"), "");
      if (dir.startsWith("variants/")) {
        writeFileSync(join(workRoot, dir, "README.md"), placeholder(dir));
      }
    }
    const status = git(["status", "--short"], { cwd: workRoot });
    if (!status) return { laneBranch, commit: "", pr: "", merged: "" };

    git(["add", "variants", "shared"], { cwd: workRoot });
    git(["diff", "--cached", "--check"], { cwd: workRoot });
    git(["commit", "-m", "chore: add phase 13 multi-variant scaffold"], { cwd: workRoot });
    const commit = git(["rev-parse", "--short", "HEAD"], { cwd: workRoot });
    git(["push", "-u", "origin", laneBranch], { cwd: workRoot });
    const pr = gh([
      "pr",
      "create",
      "--repo",
      repo,
      "--base",
      branch,
      "--head",
      laneBranch,
      "--title",
      "chore: add phase 13 multi-variant scaffold",
      "--body",
      "Adds missing Phase 13 scaffold directories only. No GitHub Actions, proprietary assets, private APIs, runtime feature claims, or production data are introduced.",
    ]);
    gh(["pr", "merge", "--repo", repo, "--squash", "--delete-branch", "--admin", pr]);
    const merged = gh(["api", `repos/${repo}/commits/${branch}`, "--jq", ".sha[0:7]"]);
    return { laneBranch, commit, pr, merged };
  } finally {
    rmSync(workRoot, { recursive: true, force: true });
  }
}

const results = [];
let repairedCount = 0;

for (const [id, repo, specPath] of repos) {
  const info = JSON.parse(gh(["api", `repos/${repo}`]));
  const branch = info.default_branch ?? "main";
  const ref = JSON.parse(gh(["api", `repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`]));
  const tree = JSON.parse(gh(["api", `repos/${repo}/git/trees/${ref.object.sha}?recursive=1`]));
  const treeEntries = new Map(tree.tree.map((entry) => [entry.path, entry.type]));
  const specFile = `docs/source-specs/${basename(specPath)}`;
  const missing = [];

  if (info.visibility !== "private") missing.push("private-visibility");
  if (!branch) missing.push("default-branch");
  if (!ref.object?.sha) missing.push("root-commit");

  for (const file of [...requiredFiles, specFile]) {
    if (treeEntries.get(file) !== "blob") missing.push(file);
  }

  for (const dir of requiredDirs) {
    if (treeEntries.get(dir) !== "tree") missing.push(dir);
  }

  let repairResult = { laneBranch: "", commit: "", pr: "", merged: "" };
  const missingDirs = missing.filter((item) => requiredDirs.includes(item));
  const hardFailures = missing.filter((item) => !requiredDirs.includes(item));
  if (repair && hardFailures.length === 0 && missingDirs.length > 0) {
    repairResult = repairRepo(id, repo, branch, missingDirs);
    repairedCount += repairResult.commit ? 1 : 0;
  }

  results.push({ id, repo, branch, visibility: info.visibility, missing, ...repairResult });
  const status = missing.length ? `MISSING ${missing.join(",")}` : "ok";
  const repaired = repairResult.merged ? ` repaired=${repairResult.merged}` : "";
  console.log(`${String(id).padStart(3, "0")} ${repo} ${status}${repaired}`);
}

const failures = results.filter((row) => {
  const nonRepairable = row.missing.some((item) => !requiredDirs.includes(item));
  const unrepairedDirs = row.missing.some((item) => requiredDirs.includes(item)) && !repair;
  return nonRepairable || unrepairedDirs;
});

console.log(JSON.stringify({ checked: results.length, repairedCount, failures: failures.length }, null, 2));
if (failures.length) process.exitCode = 1;
