#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();

const apps = [
  {
    id: "927",
    repo: "geneva-mobile-clone",
    spec: "927-geneva.md",
    product: "RoomCircle",
    module: "GroupCommunityClone",
    category: "group community",
    tabs: ["Home", "Rooms", "Events", "Members", "Safety"],
    entities: ["group", "room", "event", "bulletin", "memberRole"],
    routes: ["/groups", "/rooms", "/events", "/members", "/moderation/reports", "/privacy/export"],
    risks: ["role-permission-abuse", "voice-video-consent", "community-moderation", "private-group-discovery"],
    hero: "group communities with rooms, events, bulletin posts, member roles, and moderation",
  },
  {
    id: "928",
    repo: "fizz-mobile-clone",
    spec: "928-fizz.md",
    product: "CampusPulse",
    module: "CampusAnonymousClone",
    category: "campus anonymous community",
    tabs: ["Campus", "Trending", "Post", "Market", "Safety"],
    entities: ["anonymousPost", "campusThread", "voteRecord", "event", "marketListing"],
    routes: ["/campus", "/feed/trending", "/compose", "/marketplace", "/moderation/reports", "/privacy/delete"],
    risks: ["anonymous-harassment", "doxxing-prevention", "campus-verification", "marketplace-safety"],
    hero: "campus-scoped anonymous posting with voting, events, marketplace stubs, and safety review",
  },
  {
    id: "929",
    repo: "yubo-mobile-clone",
    spec: "929-yubo.md",
    product: "LiveCircle",
    module: "LiveFriendCommunityClone",
    category: "live social friendship",
    tabs: ["Live", "Friends", "Swipe", "Chat", "Safety"],
    entities: ["liveRoom", "friendCard", "swipeMatch", "chatThread", "safetyCheck"],
    routes: ["/live", "/friends", "/swipe", "/chat", "/moderation/reports", "/privacy/export"],
    risks: ["minor-live-safety", "age-verification", "stranger-chat-consent", "live-video-moderation"],
    hero: "friend discovery with live room stubs, swipe matching, chat consent, and minor safety gates",
  },
  {
    id: "930",
    repo: "poparazzi-mobile-clone",
    spec: "930-poparazzi.md",
    product: "FriendFrame",
    module: "FriendPhotoClone",
    category: "friend-powered photo sharing",
    tabs: ["Feed", "Friends", "Camera", "Profile", "Safety"],
    entities: ["friendPhoto", "profileAlbum", "tagApproval", "commentThread", "privacyRequest"],
    routes: ["/feed", "/friends", "/camera", "/profile", "/moderation/reports", "/privacy/delete"],
    risks: ["consent-for-tagged-media", "minor-photo-safety", "image-reporting", "profile-privacy"],
    hero: "friend-generated photo profiles with tag approval, comments, privacy requests, and reporting",
  },
  {
    id: "931",
    repo: "ngl-mobile-clone",
    spec: "931-ngl.md",
    product: "AskCove",
    module: "AnonymousQuestionClone",
    category: "anonymous question community",
    tabs: ["Inbox", "Links", "Replies", "Insights", "Safety"],
    entities: ["questionLink", "anonymousQuestion", "replyCard", "hintStub", "abuseReport"],
    routes: ["/inbox", "/links", "/replies", "/insights", "/moderation/reports", "/privacy/export"],
    risks: ["anonymous-harassment", "identity-hint-boundaries", "minor-safety", "link-abuse"],
    hero: "anonymous question inboxes with share links, reply cards, hint stubs, and abuse controls",
  },
  {
    id: "932",
    repo: "tellonym-mobile-clone",
    spec: "932-tellonym.md",
    product: "TellBox",
    module: "SocialQuestionClone",
    category: "anonymous social questions",
    tabs: ["Inbox", "Discover", "Answers", "Profile", "Safety"],
    entities: ["tellPrompt", "anonymousMessage", "answerPost", "profilePrompt", "blockRecord"],
    routes: ["/inbox", "/discover", "/answers", "/profile", "/moderation/reports", "/privacy/delete"],
    risks: ["anonymous-bullying", "message-filtering", "underage-protection", "identity-disclosure"],
    hero: "anonymous social questions with filtered inboxes, answer posts, profile prompts, and blocking",
  },
  {
    id: "933",
    repo: "rumble-mobile-clone",
    spec: "933-rumble.md",
    product: "VideoCommons",
    module: "CreatorVideoCommunityClone",
    category: "creator video platform",
    tabs: ["Home", "Channels", "Upload", "Live", "Safety"],
    entities: ["videoPost", "channel", "liveStream", "commentThread", "monetizationStub"],
    routes: ["/home", "/channels", "/upload", "/live", "/moderation/reports", "/privacy/export"],
    risks: ["video-moderation", "copyright-dmca", "paid-message-stubs", "creator-analytics-privacy"],
    hero: "creator video feeds with channel profiles, upload and live stubs, comments, and moderation",
  },
  {
    id: "934",
    repo: "truth-social-mobile-clone",
    spec: "934-truth-social.md",
    product: "CivicStream",
    module: "PublicPostCommunityClone",
    category: "public conversation network",
    tabs: ["Feed", "Explore", "Post", "Messages", "Safety"],
    entities: ["publicPost", "reshare", "trendTag", "messageThread", "premiumVideoStub"],
    routes: ["/feed", "/explore", "/compose", "/messages", "/moderation/reports", "/privacy/delete"],
    risks: ["political-content-moderation", "subscription-video-stubs", "direct-message-safety", "public-figure-impersonation"],
    hero: "public conversation feeds with reposts, trends, messaging stubs, premium video gates, and safety review",
  },
];

const commonBlockers = [
  "real identity, age, campus, or account verification",
  "production real-time chat, voice, video, or live streaming infrastructure",
  "content recommendation, ranking, or trend algorithm parity",
  "copyright, DMCA, and licensed media handling",
  "payment processing, subscription, tip, premium video, or marketplace transaction processing",
  "signed-in production account lifecycle",
  "push notification payload verification",
  "data export and deletion completion",
  "region, age, and device-specific behavior",
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
      { id: `${lower}_creator`, displayName: "Ari Lane", role: "creator", ageBand: "adult", privacyMode: "public-with-controls" },
      { id: `${lower}_supporter`, displayName: "Mika Park", role: "supporter", ageBand: "teen-or-adult-by-policy", privacyMode: "membership-scoped" },
    ],
    creatorSurfaces: [
      { id: `${lower}_profile`, title: "Studio updates", visibility: "public-preview", entitlement: "free" },
      { id: `${lower}_members`, title: "Supporter room", visibility: "members-only", entitlement: "stubbed-membership" },
    ],
    activity: app.entities.map((entity, index) => ({
      id: `${lower}_${entity}_${index + 1}`,
      type: entity,
      ownerId: index % 2 === 0 ? `${lower}_creator` : `${lower}_supporter`,
      visibility: index % 2 === 0 ? "public-preview" : "members-only",
      syntheticMediaOnly: true,
      entitlementRequired: index % 2 === 0 ? "none" : "stubbed-membership",
      reportState: "available",
    })),
    entitlement: {
      realPaymentsEnabled: false,
      rawCardDataStored: false,
      restoreRouteMode: "stubbed-contract-only",
      refundsAndPayouts: "blocked-provider-flow",
      ageRegionGateRequired: true,
    },
    safety: {
      risks: app.risks,
      reportCategories: ["harassment", "spam", "privacy", "copyright", "fraud", "minor-safety"],
      moderationQueue: "creator-and-platform-audited",
      rawContentAnalytics: false,
      supporterMessagingDefault: "restricted-until-consent",
      minorSafetyDefault: "protected-or-blocked-by-policy",
    },
    analytics: {
      privateContentAnalytics: false,
      paymentCredentialAnalytics: false,
      preciseLocationStored: false,
    },
    featureFlags: Object.fromEntries(commonBlockers.map((blocker) => [blocker.replaceAll(" ", "-"), false])),
  };
}

function contractFor(app) {
  return {
    appName: app.product,
    routeVersion: "phase12-step12-9-v1",
    routes: app.routes.map((route) => ({
      path: route,
      auth: route.includes("privacy") || route.includes("moderation") || route.includes("entitlements") ? "required" : "session-or-readonly",
      offline: route.includes("moderation") || route.includes("privacy") || route.includes("entitlements") ? "blocked-sensitive-write" : "cached-read-with-reconcile",
      privacy: "no raw private content, payment credentials, precise location, or sensitive membership values in analytics",
    })),
    requiredWorkflows: [
      "creator profile",
      "membership or support surface",
      "community posts",
      "fan or member messaging",
      "payment and entitlement stubs",
      "report and block",
      "privacy controls",
      "moderation queue",
      "age and region gate",
      "data export or deletion route",
    ],
    validationRules: {
      originalBrandingOnly: true,
      syntheticMediaOnly: true,
      privateContentAnalyticsAllowed: false,
      paymentCredentialAnalyticsAllowed: false,
      realPaymentProcessingAllowed: false,
      preciseLocationStored: false,
      githubActionsUsed: false,
      moderationQueueRequired: true,
      reportRouteRequired: true,
      ageRegionGateRequired: true,
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
    creatorSurfaceCount: fixture.creatorSurfaces.length,
    activityCount: fixture.activity.length,
    routes: contract.routes.map((route) => route.path),
    realPaymentsEnabled: fixture.entitlement.realPaymentsEnabled,
    paymentCredentialAnalytics: fixture.analytics.paymentCredentialAnalytics,
    privateContentAnalytics: fixture.analytics.privateContentAnalytics,
    blockerCount: contract.blockedParity.length,
  };
}

export function render${app.module}Summary() {
  const model = build${app.module}Model();
  return \`\${model.appName}: tabs=\${model.tabs.length}, creatorSurfaces=\${model.creatorSurfaceCount}, activity=\${model.activityCount}, blockers=\${model.blockerCount}\`;
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
assert.ok(model.tabs.includes("Safety"));
assert.ok(model.routes.includes("${app.routes.at(-1)}"));
assert.equal(model.realPaymentsEnabled, false);
assert.equal(model.paymentCredentialAnalytics, false);
assert.equal(model.privateContentAnalytics, false);
assert.match(render${app.module}Summary(), /blockers=/);
console.log(render${app.module}Summary());
`;
}

function flutterMain(app) {
  return `class ${app.module}Model {
  final String appName = '${app.product}';
  final List<String> tabs = const ${JSON.stringify(app.tabs).replaceAll('"', "'")};
  final List<String> risks = const ${JSON.stringify(app.risks).replaceAll('"', "'")};
  final bool realPaymentsEnabled = false;
  final bool paymentCredentialAnalytics = false;

  String get summary =>
      '$appName: tabs=\${tabs.length}, risks=\${risks.length}, payments=$realPaymentsEnabled';
}

void main() {
  final model = ${app.module}Model();
  assert(!model.realPaymentsEnabled);
  assert(!model.paymentCredentialAnalytics);
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
    let realPaymentsEnabled = false
    let paymentCredentialAnalytics = false

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
precondition(model.realPaymentsEnabled == false)
precondition(model.paymentCredentialAnalytics == false)
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
    val realPaymentsEnabled: Boolean = false,
    val paymentCredentialAnalytics: Boolean = false,
) {
    fun summary(): String = "$appName: tabs=\${tabs.size}, risks=\${risks.size}, payments=$realPaymentsEnabled"
}

fun main() {
    val model = ${app.module}Model()
    check(!model.realPaymentsEnabled)
    check(!model.paymentCredentialAnalytics)
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
if (fixture.entitlement.realPaymentsEnabled !== false) failures.push("real payments must be disabled");
if (fixture.entitlement.rawCardDataStored !== false) failures.push("raw card data must not be stored");
if (fixture.entitlement.ageRegionGateRequired !== true) failures.push("age/region gate is required");
if (fixture.analytics.privateContentAnalytics !== false) failures.push("private content analytics must be disabled");
if (fixture.analytics.paymentCredentialAnalytics !== false) failures.push("private content or sensitive provider analytics must be disabled");
if (fixture.safety.rawContentAnalytics !== false) failures.push("raw content analytics must be disabled");
if (fixture.safety.supporterMessagingDefault !== "restricted-until-consent") failures.push("messaging must be consent-restricted");
if (!fixture.safety.reportCategories.includes("fraud")) failures.push("fraud reporting is required for monetization flows");
if (!fixture.safety.reportCategories.includes("minor-safety")) failures.push("minor-safety reporting is required");

const routePaths = new Set(contract.routes.map((route) => route.path));
for (const requiredPath of ${JSON.stringify([app.routes[0], app.routes.at(-1)])}) {
  if (!routePaths.has(requiredPath)) failures.push(\`contract missing required route \${requiredPath}\`);
}
if (contract.validationRules.originalBrandingOnly !== true) failures.push("original branding guard missing");
if (contract.validationRules.syntheticMediaOnly !== true) failures.push("synthetic media guard missing");
if (contract.validationRules.privateContentAnalyticsAllowed !== false) failures.push("private analytics guard missing");
if (contract.validationRules.paymentCredentialAnalyticsAllowed !== false) failures.push("payment analytics guard missing");
if (contract.validationRules.realPaymentProcessingAllowed !== false) failures.push("real payment processing must be blocked");
if (contract.validationRules.githubActionsUsed !== false) failures.push("GitHub Actions must not be used");
if (contract.validationRules.ageRegionGateRequired !== true) failures.push("age/region gate guard missing");
if (!contract.blockedParity.some((blocker) => blocker.includes("payment processing"))) failures.push("payment processing blocker must be explicit");
if (!contract.blockedParity.some((blocker) => blocker.includes("Flutter runtime"))) failures.push("Flutter blocker must be explicit");
if (!contract.blockedParity.some((blocker) => blocker.includes("Android Native"))) failures.push("Android blocker must be explicit");

if (failures.length > 0) {
  console.error(failures.map((failure) => \`- \${failure}\`).join("\\n"));
  process.exit(1);
}

console.log(\`validated \${fixture.appName}: creatorSurfaces=\${fixture.creatorSurfaces.length}, activity=\${fixture.activity.length}, routes=\${contract.routes.length}\`);
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
  return `# Phase 12 Step 12.9 Validation — ${app.product}

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
  - Real identity, age, campus, account, payment, subscription, marketplace, live media, and licensed-content provider flows are blocked until verified.
  - Requires consent-scoped messaging, fraud/minor-safety reporting, moderation queues, privacy export/delete routes, and no raw private content or private content or sensitive provider analytics.
  - Keeps blocked parity flags explicit for account, push, export/delete, region, age, device, provider moderation, real-time media/voice, Flutter, and Android behavior.
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
  await writeText(path.join(repoDir, "tasks", "validation", "phase12-step12-9.md"), validationDoc(app));
}

console.log(`generated Step 12.9 implementation files for ${apps.length} repos under ${repoRoot}`);
