#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

const repos = [
  [6, "GeorgeQLe/tiktok-mobile-clone", "specs/batch-01/006-tiktok.md"],
  [7, "GeorgeQLe/instagram-mobile-clone", "specs/batch-01/007-instagram.md"],
  [8, "GeorgeQLe/snapchat-mobile-clone", "specs/batch-01/008-snapchat.md"],
  [9, "GeorgeQLe/bereal-mobile-clone", "specs/batch-01/009-bereal.md"],
  [10, "GeorgeQLe/reddit-mobile-clone", "specs/batch-01/010-reddit.md"],
  [11, "GeorgeQLe/x-mobile-clone", "specs/batch-01/011-x.md"],
  [12, "GeorgeQLe/bluesky-mobile-clone", "specs/batch-01/012-bluesky.md"],
  [13, "GeorgeQLe/threads-mobile-clone", "specs/batch-01/013-threads.md"],
  [14, "GeorgeQLe/pinterest-mobile-clone", "specs/batch-01/014-pinterest.md"],
  [15, "GeorgeQLe/lemon8-mobile-clone", "specs/batch-01/015-lemon8.md"],
  [101, "GeorgeQLe/tinder-mobile-clone", "specs/batch-06/101-tinder.md"],
  [102, "GeorgeQLe/bumble-mobile-clone", "specs/batch-06/102-bumble.md"],
  [103, "GeorgeQLe/hinge-mobile-clone", "specs/batch-06/103-hinge.md"],
  [104, "GeorgeQLe/grindr-mobile-clone", "specs/batch-06/104-grindr.md"],
  [105, "GeorgeQLe/match-mobile-clone", "specs/batch-06/105-match.md"],
  [106, "GeorgeQLe/coffee-meets-bagel-mobile-clone", "specs/batch-06/106-coffee-meets-bagel.md"],
  [915, "GeorgeQLe/mastodon-mobile-clone", "specs/batch-46/915-mastodon.md"],
  [916, "GeorgeQLe/tumblr-mobile-clone", "specs/batch-46/916-tumblr.md"],
  [917, "GeorgeQLe/flickr-mobile-clone", "specs/batch-46/917-flickr.md"],
  [918, "GeorgeQLe/500px-mobile-clone", "specs/batch-46/918-500px.md"],
  [919, "GeorgeQLe/clubhouse-mobile-clone", "specs/batch-46/919-clubhouse.md"],
  [920, "GeorgeQLe/amino-mobile-clone", "specs/batch-46/920-amino.md"],
  [921, "GeorgeQLe/weverse-mobile-clone", "specs/batch-47/921-weverse.md"],
  [922, "GeorgeQLe/patreon-mobile-clone", "specs/batch-47/922-patreon.md"],
  [923, "GeorgeQLe/buy-me-a-coffee-mobile-clone", "specs/batch-47/923-buy-me-a-coffee.md"],
  [924, "GeorgeQLe/ko-fi-mobile-clone", "specs/batch-47/924-ko-fi.md"],
  [925, "GeorgeQLe/cameo-mobile-clone", "specs/batch-47/925-cameo.md"],
  [926, "GeorgeQLe/guilded-mobile-clone", "specs/batch-47/926-guilded.md"],
  [927, "GeorgeQLe/geneva-mobile-clone", "specs/batch-47/927-geneva.md"],
  [928, "GeorgeQLe/fizz-mobile-clone", "specs/batch-47/928-fizz.md"],
  [929, "GeorgeQLe/yubo-mobile-clone", "specs/batch-47/929-yubo.md"],
  [930, "GeorgeQLe/poparazzi-mobile-clone", "specs/batch-47/930-poparazzi.md"],
  [931, "GeorgeQLe/ngl-mobile-clone", "specs/batch-47/931-ngl.md"],
  [932, "GeorgeQLe/tellonym-mobile-clone", "specs/batch-47/932-tellonym.md"],
  [933, "GeorgeQLe/rumble-mobile-clone", "specs/batch-47/933-rumble.md"],
  [934, "GeorgeQLe/truth-social-mobile-clone", "specs/batch-47/934-truth-social.md"],
  [986, "GeorgeQLe/mighty-networks-mobile-clone", "specs/batch-50/986-mighty-networks.md"],
  [987, "GeorgeQLe/circle-communities-mobile-clone", "specs/batch-50/987-circle-communities.md"],
  [988, "GeorgeQLe/skool-mobile-clone", "specs/batch-50/988-skool.md"],
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

const execute = process.argv.includes("--repair");

function gh(args, options = {}) {
  return execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options }).trim();
}

function git(args, options = {}) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...options }).trim();
}

function exists(repo, branch, path) {
  try {
    gh(["api", `repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`]);
    return true;
  } catch {
    return false;
  }
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const results = [];
let repairedCount = 0;

for (const [id, repo, specPath] of repos) {
  const info = JSON.parse(gh(["repo", "view", repo, "--json", "visibility,defaultBranchRef,isEmpty,nameWithOwner"]));
  const branch = info.defaultBranchRef?.name ?? "main";
  const specFile = `docs/source-specs/${basename(specPath)}`;
  const missing = [];

  if (info.visibility !== "PRIVATE") missing.push("private-visibility");
  if (info.isEmpty) missing.push("root-commit");
  if (!info.defaultBranchRef?.name) missing.push("default-branch");

  for (const file of [...requiredFiles, specFile]) {
    if (!exists(repo, branch, file)) missing.push(file);
  }

  for (const dir of requiredDirs) {
    if (!exists(repo, branch, dir)) missing.push(dir);
  }

  let commit = "";
  if (execute && missing.some((item) => requiredDirs.includes(item))) {
    const workRoot = mkdtempSync(join(tmpdir(), `phase12-${id}-`));
    try {
      git(["clone", `https://github.com/${repo}.git`, workRoot]);
      for (const dir of requiredDirs) {
        mkdirSync(join(workRoot, dir), { recursive: true });
        writeFileSync(join(workRoot, dir, ".gitkeep"), "");
      }
      const status = git(["status", "--short"], { cwd: workRoot });
      if (status) {
        git(["add", "variants", "shared"], { cwd: workRoot });
        git(["commit", "-m", "chore: add multi-variant scaffold"], { cwd: workRoot });
        commit = git(["rev-parse", "--short", "HEAD"], { cwd: workRoot });
        git(["push", "origin", branch], { cwd: workRoot });
        repairedCount += 1;
        sleep(30_000);
      }
    } finally {
      rmSync(workRoot, { recursive: true, force: true });
    }
  }

  results.push({ id, repo, branch, visibility: info.visibility, missing, commit });
  console.log(`${String(id).padStart(3, "0")} ${repo} ${missing.length ? `MISSING ${missing.join(",")}` : "ok"}${commit ? ` repaired=${commit}` : ""}`);
}

const failures = results.filter((row) => row.missing.some((item) => !requiredDirs.includes(item)) || (!execute && row.missing.length));
console.log(JSON.stringify({ checked: results.length, repairedCount, failures: failures.length }, null, 2));

if (failures.length) process.exitCode = 1;
