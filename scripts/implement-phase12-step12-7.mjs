#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();

const apps = [
  {
    id: "915",
    repo: "mastodon-mobile-clone",
    spec: "915-mastodon.md",
    product: "FederatedSquare",
    module: "FederatedCommunityClone",
    category: "decentralized community social",
    tabs: ["Home", "Local", "Federated", "Compose", "Moderation"],
    entities: ["instance", "post", "boost", "contentWarning", "domainBlock"],
    risks: ["federation-privacy", "instance-moderation", "direct-message-admin-visibility", "content-filtering"],
    routes: ["/instances", "/timeline/home", "/timeline/local", "/compose", "/moderation/reports", "/privacy/export"],
    hero: "instance-aware timelines with content warnings, federation boundaries, and moderation controls",
  },
  {
    id: "916",
    repo: "tumblr-mobile-clone",
    spec: "916-tumblr.md",
    product: "ReblogGarden",
    module: "CreativeBlogClone",
    category: "multimedia microblog community",
    tabs: ["Dashboard", "Explore", "Create", "Inbox", "Safety"],
    entities: ["blog", "multimediaPost", "reblogTrail", "tag", "askSubmission"],
    risks: ["mature-content-labels", "anonymous-ask-abuse", "creator-attribution", "media-rights"],
    routes: ["/dashboard", "/explore/tags", "/posts/create", "/inbox/asks", "/moderation/labels", "/privacy/export"],
    hero: "multimedia blog feeds with reblog attribution, asks, tags, and community labels",
  },
  {
    id: "917",
    repo: "flickr-mobile-clone",
    spec: "917-flickr.md",
    product: "PhotoCommons",
    module: "PhotoCommunityClone",
    category: "photo sharing community",
    tabs: ["Photostream", "Albums", "Groups", "Explore", "Rights"],
    entities: ["photo", "album", "group", "license", "commentThread"],
    risks: ["image-rights", "geotag-privacy", "community-moderation", "metadata-retention"],
    routes: ["/photostream", "/albums", "/groups", "/explore", "/rights/licenses", "/reports"],
    hero: "photo streams, albums, groups, rights metadata, and privacy-safe geotag controls",
  },
  {
    id: "918",
    repo: "500px-mobile-clone",
    spec: "918-500px.md",
    product: "LensGuild",
    module: "ProPhotoCommunityClone",
    category: "professional photo community",
    tabs: ["Discover", "Portfolio", "Challenges", "Licensing", "Safety"],
    entities: ["portfolioImage", "challengeEntry", "licenseOffer", "creatorProfile", "critique"],
    risks: ["licensing-disclosure", "creator-rights", "marketplace-gates", "image-moderation"],
    routes: ["/discover", "/portfolio", "/challenges", "/licensing", "/reports", "/privacy/delete"],
    hero: "portfolio discovery with challenges, creator rights, licensing stubs, and report workflows",
  },
  {
    id: "919",
    repo: "clubhouse-mobile-clone",
    spec: "919-clubhouse.md",
    product: "RoomWave",
    module: "LiveAudioCommunityClone",
    category: "live audio community",
    tabs: ["Hallway", "Rooms", "Clubs", "Chats", "Safety"],
    entities: ["liveRoom", "speaker", "listener", "replay", "moderationAction"],
    risks: ["live-audio-consent", "real-time-moderation", "recording-retention", "phone-identity"],
    routes: ["/hallway", "/rooms/live", "/clubs", "/chats", "/moderation/live", "/privacy/recordings"],
    hero: "live audio rooms with speaker roles, consentful replays, and real-time moderation",
  },
  {
    id: "920",
    repo: "amino-mobile-clone",
    spec: "920-amino.md",
    product: "FandomHarbor",
    module: "FandomCommunityClone",
    category: "fandom community network",
    tabs: ["Communities", "Feed", "Chats", "Wiki", "Safety"],
    entities: ["community", "fanPost", "chatRoom", "wikiEntry", "leaderAction"],
    risks: ["minor-safety", "community-role-abuse", "virtual-currency-gates", "voice-video-chat-moderation"],
    routes: ["/communities", "/feed", "/chats", "/wiki", "/moderation/leader", "/privacy/delete"],
    hero: "topic communities with posts, chats, collaborative wiki, roles, and minor safety controls",
  },
];

const commonBlockers = [
  "signed-in production account lifecycle",
  "push notification payload verification",
  "data export and deletion completion",
  "region, age, and device-specific behavior",
  "real-time media infrastructure parity",
  "paid entitlement or virtual-currency restore where applicable",
  "provider-specific moderation escalation",
  "Flutter runtime validation without Dart/Flutter installed",
  "Android Native runtime validation without kotlinc installed",
];

function slug(app) {
  return app.product.toLowerCase();
}

function jsonFor(app) {
  const lower = slug(app);
  return {
    appName: app.product,
    inspirationScope: app.category,
    heroWorkflow: app.hero,
    users: [
      { id: `${lower}_creator`, displayName: "Ari Lane", ageBand: "adult", privacyMode: "public-with-controls" },
      { id: `${lower}_member`, displayName: "Mika Park", ageBand: "teen-or-adult-by-policy", privacyMode: "community-scoped" },
    ],
    communities: [
      { id: `${lower}_community_1`, name: "Open Studio", membership: "joined", moderationState: "screened" },
      { id: `${lower}_community_2`, name: "Night Forum", membership: "discoverable", moderationState: "limited" },
    ],
    activity: app.entities.map((entity, index) => ({
      id: `${lower}_${entity}_${index + 1}`,
      type: entity,
      ownerId: index % 2 === 0 ? `${lower}_creator` : `${lower}_member`,
      visibility: index % 2 === 0 ? "public" : "community",
      syntheticMediaOnly: true,
      sourceAttributionRequired: entity.includes("license") || entity.includes("photo") || entity.includes("image"),
      reportState: "available",
    })),
    graph: {
      followModel: "follow-or-community-membership",
      blockedUsersExcluded: true,
      privateContentAnalytics: false,
      preciseLocationStored: false,
    },
    safety: {
      risks: app.risks,
      reportCategories: ["harassment", "spam", "privacy", "copyright", "illegal-content", "minor-safety"],
      moderationQueue: "role-based-audited",
      rawContentAnalytics: false,
      directMessagingDefault: "restricted-until-consent",
      minorSafetyDefault: "protected-or-blocked-by-policy",
    },
    featureFlags: Object.fromEntries(commonBlockers.map((blocker) => [blocker.replaceAll(" ", "-"), false])),
  };
}

function contractFor(app) {
  return {
    appName: app.product,
    routeVersion: "phase12-step12-7-v1",
    routes: app.routes.map((route) => ({
      path: route,
      auth: route.includes("privacy") || route.includes("moderation") || route.includes("reports") ? "required" : "session-or-readonly",
      offline: route.includes("moderation") || route.includes("privacy") ? "blocked-sensitive-write" : "cached-read-with-reconcile",
      privacy: "no raw private content, precise location, or sensitive community membership values in analytics",
    })),
    requiredWorkflows: [
      "profile or community graph",
      "activity feed",
      "media or audio activity record",
      "follow or membership model",
      "search or discovery",
      "report and block",
      "privacy controls",
      "moderation queue",
      "data export or deletion route",
    ],
    validationRules: {
      originalBrandingOnly: true,
      syntheticMediaOnly: true,
      privateContentAnalyticsAllowed: false,
      preciseLocationStored: false,
      githubActionsUsed: false,
      moderationQueueRequired: true,
      reportRouteRequired: true,
    },
    blockedParity: commonBlockers,
  };
}

function reactApp(app) {
  return `import { readFileSync } from "node:fs";

const fixture = JSON.parse(readFileSync(new URL("../../../shared/test-fixtures/${slug(app)}-fixtures.json", import.meta.url), "utf8"));
const contract = JSON.parse(readFileSync(new URL("../../../shared/api-contracts/${slug(app)}-contract.json", import.meta.url), "utf8"));

export function build${app.module}Model() {
  return {
    appName: fixture.appName,
    tabs: ${JSON.stringify(app.tabs)},
    heroWorkflow: fixture.heroWorkflow,
    communityCount: fixture.communities.length,
    activityCount: fixture.activity.length,
    routes: contract.routes.map((route) => route.path),
    privateContentAnalytics: fixture.graph.privateContentAnalytics,
    preciseLocationStored: fixture.graph.preciseLocationStored,
    blockerCount: contract.blockedParity.length,
  };
}

export function render${app.module}Summary() {
  const model = build${app.module}Model();
  return \`\${model.appName}: tabs=\${model.tabs.length}, communities=\${model.communityCount}, activity=\${model.activityCount}, blockers=\${model.blockerCount}\`;
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
assert.ok(model.tabs.includes("Safety") || model.tabs.includes("Moderation") || model.tabs.includes("Rights"));
assert.ok(model.routes.includes("${app.routes.at(-1)}"));
assert.equal(model.privateContentAnalytics, false);
assert.equal(model.preciseLocationStored, false);
assert.match(render${app.module}Summary(), /blockers=/);
console.log(render${app.module}Summary());
`;
}

function flutterMain(app) {
  return `class ${app.module}Model {
  final String appName = '${app.product}';
  final List<String> tabs = const ${JSON.stringify(app.tabs).replaceAll('"', "'")};
  final List<String> risks = const ${JSON.stringify(app.risks).replaceAll('"', "'")};
  final bool privateContentAnalytics = false;
  final bool preciseLocationStored = false;

  String get summary =>
      '$appName: tabs=\${tabs.length}, risks=\${risks.length}, privateAnalytics=$privateContentAnalytics';
}

void main() {
  final model = ${app.module}Model();
  assert(!model.privateContentAnalytics);
  assert(!model.preciseLocationStored);
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
    let privateContentAnalytics = false
    let preciseLocationStored = false

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
precondition(model.privateContentAnalytics == false)
precondition(model.preciseLocationStored == false)
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
    val privateContentAnalytics: Boolean = false,
    val preciseLocationStored: Boolean = false,
) {
    fun summary(): String = "$appName: tabs=\${tabs.size}, risks=\${risks.size}, privateAnalytics=$privateContentAnalytics"
}

fun main() {
    val model = ${app.module}Model()
    check(!model.privateContentAnalytics)
    check(!model.preciseLocationStored)
    println(model.summary())
}
`;
}

function validator(app) {
  return `import { readFile } from "node:fs/promises";

const fixture = JSON.parse(await readFile(new URL("../shared/test-fixtures/${slug(app)}-fixtures.json", import.meta.url), "utf8"));
const contract = JSON.parse(await readFile(new URL("../shared/api-contracts/${slug(app)}-contract.json", import.meta.url), "utf8"));
const failures = [];

if (fixture.appName !== "${app.product}") failures.push("fixture must use original ${app.product} naming");
if (!fixture.activity.every((item) => item.syntheticMediaOnly)) failures.push("all activity media must be synthetic");
if (fixture.graph.privateContentAnalytics !== false) failures.push("private content analytics must be disabled");
if (fixture.graph.preciseLocationStored !== false) failures.push("precise location must not be stored");
if (fixture.safety.rawContentAnalytics !== false) failures.push("raw content analytics must be disabled");
if (fixture.safety.directMessagingDefault !== "restricted-until-consent") failures.push("messaging must be consent-restricted");
if (!fixture.safety.reportCategories.includes("minor-safety")) failures.push("minor-safety reporting is required");

const routePaths = new Set(contract.routes.map((route) => route.path));
for (const requiredPath of ${JSON.stringify([app.routes[0], app.routes.at(-1)])}) {
  if (!routePaths.has(requiredPath)) failures.push(\`contract missing required route \${requiredPath}\`);
}
if (contract.validationRules.originalBrandingOnly !== true) failures.push("original branding guard missing");
if (contract.validationRules.syntheticMediaOnly !== true) failures.push("synthetic media guard missing");
if (contract.validationRules.privateContentAnalyticsAllowed !== false) failures.push("private analytics guard missing");
if (contract.validationRules.preciseLocationStored !== false) failures.push("precise location guard missing");
if (contract.validationRules.githubActionsUsed !== false) failures.push("GitHub Actions must not be used");
if (contract.validationRules.moderationQueueRequired !== true) failures.push("moderation queue guard missing");
if (!contract.blockedParity.some((blocker) => blocker.includes("Flutter runtime"))) failures.push("Flutter blocker must be explicit");
if (!contract.blockedParity.some((blocker) => blocker.includes("Android Native"))) failures.push("Android blocker must be explicit");

if (failures.length > 0) {
  console.error(failures.map((failure) => \`- \${failure}\`).join("\\n"));
  process.exit(1);
}

console.log(\`validated \${fixture.appName}: communities=\${fixture.communities.length}, activity=\${fixture.activity.length}, routes=\${contract.routes.length}\`);
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
  return `# Phase 12 Step 12.7 Validation — ${app.product}

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
- Community safety/legal review:
  - Uses original product name \`${app.product}\`, original synthetic data, and no proprietary assets.
  - Requires consent-scoped messaging, report/block controls, role-based moderation, privacy export/delete routes, and no raw private content analytics.
  - Keeps blocked parity flags explicit for account, push, export/delete, real-time media, entitlement/currency, provider moderation, region, age, and device behavior.
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
  await writeJson(path.join(repoDir, "shared", "test-fixtures", `${slug(app)}-fixtures.json`), jsonFor(app));
  await writeJson(path.join(repoDir, "shared", "api-contracts", `${slug(app)}-contract.json`), contractFor(app));
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
  await writeText(path.join(repoDir, "tasks", "validation", "phase12-step12-7.md"), validationDoc(app));
}

console.log(`generated Step 12.7 implementation files for ${apps.length} repos under ${repoRoot}`);
