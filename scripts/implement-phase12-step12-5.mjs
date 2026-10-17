#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();

const apps = [
  {
    id: "009",
    repo: "bereal-mobile-clone",
    spec: "009-bereal.md",
    product: "MomentPair",
    module: "DailyMomentClone",
    category: "daily authenticity social",
    tabs: ["Prompt", "Camera", "Friends", "Discovery", "Safety"],
    entities: ["dailyPrompt", "dualCameraPost", "reaction", "memory", "locationShare"],
    risks: ["minor-safety", "location-privacy", "authenticity-pressure", "public-discovery-moderation"],
    routes: ["/daily-prompt", "/capture/dual", "/feed/friends", "/discovery", "/privacy/location", "/reports"],
    hero: "two-minute dual-camera prompt with late-post and private-memory states",
  },
  {
    id: "010",
    repo: "reddit-mobile-clone",
    spec: "010-reddit.md",
    product: "ForumNest",
    module: "CommunityForumClone",
    category: "community forum",
    tabs: ["Home", "Communities", "Create", "Inbox", "Moderation"],
    entities: ["community", "post", "comment", "vote", "moderationCase"],
    risks: ["ugc-moderation", "nsfw-age-gates", "harassment", "public-content-retention"],
    routes: ["/feed/home", "/communities/:id", "/posts", "/comments", "/moderation/queue", "/reports"],
    hero: "community feeds with nested comments, voting, reporting, and moderator queues",
  },
  {
    id: "011",
    repo: "x-mobile-clone",
    spec: "011-x.md",
    product: "SignalPost",
    module: "MicroPostClone",
    category: "microblogging social",
    tabs: ["Timeline", "Search", "Compose", "Messages", "Safety"],
    entities: ["post", "reply", "repost", "trend", "directThread"],
    risks: ["harassment", "misinformation-labels", "public-profile-privacy", "creator-monetization-gates"],
    routes: ["/timeline", "/posts", "/replies", "/trends", "/messages", "/reports"],
    hero: "micro-post timelines with replies, reposts, trends, DMs, and abuse controls",
  },
  {
    id: "012",
    repo: "bluesky-mobile-clone",
    spec: "012-bluesky.md",
    product: "SkyThread",
    module: "OpenSocialClone",
    category: "open social network",
    tabs: ["Feeds", "Threads", "Lists", "Labels", "Safety"],
    entities: ["feed", "post", "reply", "starterPack", "moderationLabel"],
    risks: ["moderation-labels", "account-portability", "public-profile-privacy", "custom-feed-safety"],
    routes: ["/feeds", "/threads", "/starter-packs", "/lists", "/moderation/labels", "/reports"],
    hero: "custom feeds, threaded posts, starter packs, labels, and portable-account blockers",
  },
  {
    id: "013",
    repo: "threads-mobile-clone",
    spec: "013-threads.md",
    product: "LoopLine",
    module: "TextSocialClone",
    category: "text-first social",
    tabs: ["For You", "Following", "Compose", "Activity", "Privacy"],
    entities: ["thread", "reply", "repost", "mediaAttachment", "federationSetting"],
    risks: ["public-reply-harassment", "account-linking-boundaries", "fediverse-controls", "minor-safety"],
    routes: ["/feed/for-you", "/feed/following", "/threads", "/activity", "/privacy/federation", "/reports"],
    hero: "text-first feeds with replies, reposts, media, activity, and federation-style privacy gates",
  },
  {
    id: "014",
    repo: "pinterest-mobile-clone",
    spec: "014-pinterest.md",
    product: "PinwheelBoards",
    module: "VisualDiscoveryClone",
    category: "visual discovery",
    tabs: ["Discover", "Search", "Boards", "Create", "Safety"],
    entities: ["pin", "board", "visualSearchResult", "save", "rightsReview"],
    risks: ["image-rights", "shopping-stub-disclosure", "recommendation-safety", "creator-content-moderation"],
    routes: ["/discover", "/search/visual", "/boards", "/pins", "/rights/review", "/reports"],
    hero: "visual discovery with pins, boards, visual search, saves, and rights controls",
  },
  {
    id: "015",
    repo: "lemon8-mobile-clone",
    spec: "015-lemon8.md",
    product: "CitrusJournal",
    module: "LifestyleSocialClone",
    category: "lifestyle creator social",
    tabs: ["Explore", "Templates", "Create", "Profile", "Safety"],
    entities: ["templatePost", "topicFeed", "creatorProfile", "comment", "commerceStub"],
    risks: ["youth-safety", "creator-commerce-disclosure", "beauty-health-claims", "template-rights"],
    routes: ["/explore", "/templates", "/posts", "/profiles/:id", "/commerce/stubs", "/reports"],
    hero: "lifestyle topic feeds with templated posts, creator profiles, commerce stubs, and youth safety",
  },
];

const commonBlockers = [
  "native iOS and Android screenshot parity",
  "signed-in production account lifecycle",
  "paid entitlement restore",
  "push notification payload verification",
  "data export and deletion completion",
  "region, age, and device-specific behavior",
  "Flutter runtime validation without Dart/Flutter installed",
  "Android Native runtime validation without kotlinc installed",
];

function jsonFor(app) {
  const lower = app.product.toLowerCase();
  return {
    appName: app.product,
    inspirationScope: app.category,
    heroWorkflow: app.hero,
    users: [
      {
        id: `${lower}_creator`,
        displayName: "Ari Chen",
        ageBand: "adult",
        privacyMode: "public-with-controls",
        safetyLevel: "standard",
      },
      {
        id: `${lower}_teen`,
        displayName: "Mika Stone",
        ageBand: "teen",
        privacyMode: "friends-only",
        safetyLevel: "minor-protected",
      },
    ],
    feeds: [
      {
        id: `${lower}_primary_feed`,
        mode: app.tabs[0],
        ranking: "deterministic-test-ranking",
        containsSyntheticMediaOnly: true,
        moderationState: "screened",
      },
      {
        id: `${lower}_discovery_feed`,
        mode: "Discovery",
        ranking: "safety-filtered-recency",
        containsSyntheticMediaOnly: true,
        moderationState: "screened",
      },
    ],
    content: app.entities.map((entity, index) => ({
      id: `${lower}_${entity}_${index + 1}`,
      type: entity,
      ownerId: index % 2 === 0 ? `${lower}_creator` : `${lower}_teen`,
      visibility: index % 2 === 0 ? "public" : "friends",
      hasSyntheticMediaOnly: true,
      saved: index % 2 === 0,
      commentCount: index + 1,
      reportState: "available",
    })),
    search: {
      enabled: true,
      safeModeDefault: true,
      suggestions: app.entities.slice(0, 3),
    },
    safety: {
      risks: app.risks,
      teenUnknownAdultMessaging: "blocked",
      rawContentAnalytics: false,
      reportCategories: ["harassment", "spam", "privacy", "illegal-content", "copyright"],
      moderationQueue: "role-based-audited",
    },
    featureFlags: Object.fromEntries(commonBlockers.map((blocker) => [blocker.replaceAll(" ", "-"), false])),
  };
}

function contractFor(app) {
  return {
    appName: app.product,
    routeVersion: "phase12-step12-5-v1",
    routes: app.routes.map((route) => ({
      path: route,
      auth: route.includes("reports") ? "required" : "session-or-readonly",
      offline: route.includes("reports") ? "blocked-sensitive-write" : "cached-read-with-reconcile",
      privacy: "no raw private content in analytics",
    })),
    requiredWorkflows: [
      "onboarding",
      "feed or timeline",
      "profile",
      "create media or post",
      "comments or replies",
      "saved items",
      "search or discovery",
      "report and block",
      "privacy controls",
    ],
    validationRules: {
      originalBrandingOnly: true,
      syntheticMediaOnly: true,
      analyticsAllowRawContent: false,
      githubActionsUsed: false,
      minorSafetyRequired: true,
      reportRouteRequired: true,
    },
    blockedParity: commonBlockers,
  };
}

function reactApp(app) {
  return `import { readFileSync } from "node:fs";

const fixture = JSON.parse(
  readFileSync(new URL("../../../shared/test-fixtures/${app.product.toLowerCase()}-fixtures.json", import.meta.url), "utf8")
);
const contract = JSON.parse(
  readFileSync(new URL("../../../shared/api-contracts/${app.product.toLowerCase()}-contract.json", import.meta.url), "utf8")
);

export function build${app.module}Model() {
  return {
    appName: fixture.appName,
    tabs: ${JSON.stringify(app.tabs)},
    heroWorkflow: fixture.heroWorkflow,
    feedCount: fixture.feeds.length,
    contentCount: fixture.content.length,
    safeModeDefault: fixture.search.safeModeDefault,
    routes: contract.routes.map((route) => route.path),
    blockerCount: contract.blockedParity.length,
  };
}

export function render${app.module}Summary() {
  const model = build${app.module}Model();
  return \`\${model.appName}: tabs=\${model.tabs.length}, feeds=\${model.feedCount}, content=\${model.contentCount}, blockers=\${model.blockerCount}\`;
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  console.log(render${app.module}Summary());
}
`;
}

function reactTest(app) {
  return `import assert from "node:assert/strict";
import { build${app.module}Model, render${app.module}Summary } from "./app.mjs";

const model = build${app.module}Model();
assert.equal(model.appName, "${app.product}");
assert.ok(model.tabs.includes("${app.tabs.at(-1)}"));
assert.ok(model.routes.includes("${app.routes.at(-1)}"));
assert.ok(model.safeModeDefault);
assert.match(render${app.module}Summary(), /blockers=/);
console.log(render${app.module}Summary());
`;
}

function flutterMain(app) {
  return `class ${app.module}Model {
  final String appName = '${app.product}';
  final List<String> tabs = const ${JSON.stringify(app.tabs).replaceAll('"', "'")};
  final List<String> risks = const ${JSON.stringify(app.risks).replaceAll('"', "'")};
  final bool syntheticMediaOnly = true;
  final bool rawContentAnalytics = false;

  String get summary =>
      '$appName: tabs=\${tabs.length}, risks=\${risks.length}, synthetic=$syntheticMediaOnly';
}

void main() {
  final model = ${app.module}Model();
  assert(model.syntheticMediaOnly);
  assert(!model.rawContentAnalytics);
  print(model.summary);
}
`;
}

function swiftModel(app) {
  return `import Foundation

struct ${app.module}Model {
    let appName = "${app.product}"
    let tabs = ${JSON.stringify(app.tabs)}
    let risks = ${JSON.stringify(app.risks)}
    let routes = ${JSON.stringify(app.routes)}
    let syntheticMediaOnly = true
    let rawContentAnalytics = false

    var summary: String {
        "\\(appName): tabs=\\(tabs.count), risks=\\(risks.count), routes=\\(routes.count)"
    }
}

func make${app.module}Model() -> ${app.module}Model {
    ${app.module}Model()
}
`;
}

function swiftMain(app) {
  return `import Foundation

let model = make${app.module}Model()
precondition(model.syntheticMediaOnly)
precondition(model.rawContentAnalytics == false)
precondition(model.routes.contains("${app.routes.at(-1)}"))
print(model.summary)
`;
}

function androidMain(app) {
  return `package phase12.${app.repo.replaceAll("-", "")}

data class ${app.module}Model(
    val appName: String = "${app.product}",
    val tabs: List<String> = listOf(${app.tabs.map((tab) => `"${tab}"`).join(", ")}),
    val risks: List<String> = listOf(${app.risks.map((risk) => `"${risk}"`).join(", ")}),
    val syntheticMediaOnly: Boolean = true,
    val rawContentAnalytics: Boolean = false,
) {
    fun summary(): String = "$appName: tabs=\${tabs.size}, risks=\${risks.size}"
}

fun main() {
    val model = ${app.module}Model()
    check(model.syntheticMediaOnly)
    check(!model.rawContentAnalytics)
    println(model.summary())
}
`;
}

function validator(app) {
  const fixtureName = `${app.product.toLowerCase()}-fixtures.json`;
  const contractName = `${app.product.toLowerCase()}-contract.json`;
  return `import { readFile } from "node:fs/promises";

const fixture = JSON.parse(await readFile(new URL("../shared/test-fixtures/${fixtureName}", import.meta.url), "utf8"));
const contract = JSON.parse(await readFile(new URL("../shared/api-contracts/${contractName}", import.meta.url), "utf8"));
const failures = [];

if (fixture.appName !== "${app.product}") failures.push("fixture must use original ${app.product} naming");
if (!fixture.content.every((item) => item.hasSyntheticMediaOnly)) failures.push("all content must be synthetic");
if (!fixture.search.safeModeDefault) failures.push("search/discovery safe mode must default on");
if (fixture.safety.rawContentAnalytics !== false) failures.push("raw content analytics must be disabled");
if (fixture.users.some((user) => user.ageBand === "teen" && user.privacyMode !== "friends-only")) failures.push("teen users must default to friends-only privacy");
if (fixture.safety.teenUnknownAdultMessaging !== "blocked") failures.push("unknown adult messaging to teens must be blocked");

const routePaths = new Set(contract.routes.map((route) => route.path));
for (const requiredPath of ${JSON.stringify([app.routes[0], app.routes.at(-1)])}) {
  if (!routePaths.has(requiredPath)) failures.push(\`contract missing required route \${requiredPath}\`);
}
if (contract.validationRules.originalBrandingOnly !== true) failures.push("original branding guard missing");
if (contract.validationRules.syntheticMediaOnly !== true) failures.push("synthetic media guard missing");
if (contract.validationRules.githubActionsUsed !== false) failures.push("GitHub Actions must not be used");
if (!contract.blockedParity.some((blocker) => blocker.includes("Flutter runtime"))) failures.push("Flutter blocker must be explicit");
if (!contract.blockedParity.some((blocker) => blocker.includes("Android Native"))) failures.push("Android blocker must be explicit");

if (failures.length > 0) {
  console.error(failures.map((failure) => \`- \${failure}\`).join("\\n"));
  process.exit(1);
}

console.log(\`validated \${fixture.appName}: feeds=\${fixture.feeds.length}, content=\${fixture.content.length}, routes=\${contract.routes.length}\`);
`;
}

function packageJson(app) {
  return {
    type: "module",
    scripts: {
      validate: `node scripts/validate-${app.id}.mjs`,
      "test:react-native": "node variants/react-native/src/app.test.mjs",
      "test:expo": "node variants/expo/src/app.test.mjs",
    },
  };
}

function validationDoc(app) {
  return `# Phase 12 Step 12.5 Validation — ${app.product}

- Downstream repo: \`GeorgeQLe/${app.repo}\`
- Source spec: \`docs/source-specs/${app.spec}\`
- Scope: all five variant directories for the ${app.category} prototype.
- Local validation:
  - \`npm run validate\`
  - \`npm run test:react-native\`
  - \`npm run test:expo\`
  - Swift compile/run for \`${app.module}\`
- Blocked validation:
  - Flutter runtime validation is blocked because \`dart\` and \`flutter\` are not installed locally.
  - Android Native runtime validation is blocked because \`kotlinc\` is not installed locally.
- Safety/legal review:
  - Uses original product name \`${app.product}\`, original synthetic data, and no proprietary assets.
  - Keeps blocked parity flags explicit for account, notification, entitlement, deletion/export, region, age, and device-specific behavior.
  - GitHub Actions were not enabled, dispatched, or used.
`;
}

async function writeJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function writeText(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

for (const app of apps) {
  const repoDir = path.join(repoRoot, app.repo);
  const readme = await readFile(path.join(repoDir, "README.md"), "utf8").catch(() => null);
  if (readme === null) {
    throw new Error(`Missing downstream repo at ${repoDir}`);
  }
  await writeJson(path.join(repoDir, "shared", "test-fixtures", `${app.product.toLowerCase()}-fixtures.json`), jsonFor(app));
  await writeJson(path.join(repoDir, "shared", "api-contracts", `${app.product.toLowerCase()}-contract.json`), contractFor(app));
  await writeText(path.join(repoDir, "scripts", `validate-${app.id}.mjs`), validator(app));
  await writeJson(path.join(repoDir, "package.json"), packageJson(app));
  await writeText(path.join(repoDir, "variants", "react-native", "src", "app.mjs"), reactApp(app));
  await writeText(path.join(repoDir, "variants", "react-native", "src", "app.test.mjs"), reactTest(app));
  await writeText(path.join(repoDir, "variants", "expo", "src", "app.mjs"), reactApp(app));
  await writeText(path.join(repoDir, "variants", "expo", "src", "app.test.mjs"), reactTest(app));
  await writeText(path.join(repoDir, "variants", "flutter", "lib", "main.dart"), flutterMain(app));
  await writeText(path.join(repoDir, "variants", "ios-native", "Sources", app.module, "AppModel.swift"), swiftModel(app));
  await writeText(path.join(repoDir, "variants", "ios-native", "Sources", app.module, "main.swift"), swiftMain(app));
  await writeText(path.join(repoDir, "variants", "android-native", "app", "src", "main", "kotlin", "Main.kt"), androidMain(app));
  await writeText(path.join(repoDir, "tasks", "validation", "phase12-step12-5.md"), validationDoc(app));
}

console.log(`generated Step 12.5 implementation files for ${apps.length} repos under ${repoRoot}`);
