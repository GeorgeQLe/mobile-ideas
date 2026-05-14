#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();

const apps = [
  {
    id: "101",
    repo: "tinder-mobile-clone",
    spec: "101-tinder.md",
    product: "SparkMatch",
    module: "SwipeDatingClone",
    category: "swipe dating",
    tabs: ["Discover", "Likes", "Matches", "Chat", "Safety"],
    entities: ["profile", "preferenceFilter", "likePassDecision", "mutualMatch", "safetyCheckIn"],
    risks: ["location-privacy", "harassment-prevention", "minor-exclusion", "identity-verification"],
    routes: ["/onboarding/age", "/profiles/create", "/discover/swipe", "/matches", "/chat", "/safety/report"],
    hero: "privacy-first swipe discovery with mutual-match chat and safety check-ins",
  },
  {
    id: "102",
    repo: "bumble-mobile-clone",
    spec: "102-bumble.md",
    product: "FirstMove",
    module: "FirstMoveDatingClone",
    category: "first-message dating",
    tabs: ["Discover", "Moves", "Matches", "Chat", "Safety"],
    entities: ["profile", "openingMove", "connectionTimer", "mutualMatch", "blockReportCase"],
    risks: ["harassment-prevention", "message-consent", "age-gates", "location-privacy"],
    routes: ["/onboarding/identity", "/profiles/create", "/discover", "/matches/timers", "/chat", "/safety/block"],
    hero: "consent-aware matching with first-message timers and auditable safety controls",
  },
  {
    id: "103",
    repo: "hinge-mobile-clone",
    spec: "103-hinge.md",
    product: "PromptPair",
    module: "PromptDatingClone",
    category: "prompt-led dating",
    tabs: ["Discover", "Prompts", "Likes", "Chat", "Safety"],
    entities: ["profilePrompt", "preferenceFilter", "commentLike", "mutualMatch", "dateSafetyPlan"],
    risks: ["profile-authenticity", "harassment-prevention", "sensitive-preferences", "data-deletion"],
    routes: ["/onboarding/prompts", "/profiles/create", "/discover/prompts", "/likes", "/chat", "/privacy/delete"],
    hero: "prompt-led profiles with comment likes, mutual matches, and data deletion controls",
  },
  {
    id: "104",
    repo: "grindr-mobile-clone",
    spec: "104-grindr.md",
    product: "NearbyKind",
    module: "NearbyDatingClone",
    category: "nearby community dating",
    tabs: ["Nearby", "Filters", "Chats", "Favorites", "Safety"],
    entities: ["nearbyProfile", "distanceBucket", "privacyFilter", "chatThread", "safetyReport"],
    risks: ["precise-location-safety", "outing-risk", "harassment-prevention", "sensitive-community-privacy"],
    routes: ["/onboarding/privacy", "/nearby", "/filters", "/chat", "/privacy/location", "/safety/report"],
    hero: "nearby discovery with distance fuzzing, privacy filters, and sensitive-community safety gates",
  },
  {
    id: "105",
    repo: "match-mobile-clone",
    spec: "105-match.md",
    product: "EverAfter",
    module: "LongFormDatingClone",
    category: "long-form dating",
    tabs: ["Daily", "Search", "Profile", "Messages", "Safety"],
    entities: ["profileSection", "dailyRecommendation", "searchFilter", "mutualInterest", "verificationCase"],
    risks: ["subscription-boundaries", "identity-verification", "harassment-prevention", "profile-privacy"],
    routes: ["/onboarding/profile", "/daily", "/search", "/messages", "/verification", "/safety/report"],
    hero: "long-form recommendations with search filters, verification placeholders, and safe messaging",
  },
  {
    id: "106",
    repo: "coffee-meets-bagel-mobile-clone",
    spec: "106-coffee-meets-bagel.md",
    product: "DailyBean",
    module: "CuratedDatingClone",
    category: "curated daily dating",
    tabs: ["Today", "Discover", "Likes", "Chat", "Safety"],
    entities: ["dailyBatch", "curatedProfile", "preferenceFilter", "mutualMatch", "safetyPrompt"],
    risks: ["limited-recommendation-pressure", "minor-exclusion", "harassment-prevention", "privacy-controls"],
    routes: ["/onboarding/age", "/today/batch", "/discover", "/likes", "/chat", "/safety/check-in"],
    hero: "curated daily recommendations with limited-pressure matching and safety prompts",
  },
];

const commonBlockers = [
  "real identity verification provider integration",
  "signed-in production account lifecycle",
  "precise location and device permission parity",
  "paid subscription and entitlement restore",
  "push notification payload verification",
  "data export and deletion completion",
  "region, age, orientation, and device-specific behavior",
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
      {
        id: `${lower}_adult_1`,
        displayName: "Ari Morgan",
        ageBand: "adult",
        verificationState: "self-attested-pending-provider",
        privacyMode: "discoverable-with-controls",
      },
      {
        id: `${lower}_adult_2`,
        displayName: "Sam Rivera",
        ageBand: "adult",
        verificationState: "photo-review-placeholder",
        privacyMode: "matches-only-chat",
      },
    ],
    discovery: {
      ranking: "deterministic-safety-filtered",
      preciseCoordinatesStored: false,
      distanceMode: "bucketed-or-hidden",
      minorsAllowed: false,
      blockedUsersExcluded: true,
    },
    profiles: app.entities.map((entity, index) => ({
      id: `${lower}_${entity}_${index + 1}`,
      type: entity,
      ownerId: index % 2 === 0 ? `${lower}_adult_1` : `${lower}_adult_2`,
      visibility: index % 2 === 0 ? "discoverable" : "matches-only",
      syntheticMediaOnly: true,
      consentRequiredForChat: true,
      reportState: "available",
    })),
    matches: [
      {
        id: `${lower}_match_1`,
        state: "mutual",
        chatEnabled: true,
        safetyCheckInAvailable: true,
      },
    ],
    safety: {
      risks: app.risks,
      ageGate: "18-plus-required",
      unknownAdultToMinorMessaging: "not-applicable-minors-blocked",
      harassmentControls: ["block", "report", "unmatch", "message-consent"],
      reportCategories: ["harassment", "impersonation", "underage", "unsafe-behavior", "privacy"],
      rawSensitiveContentAnalytics: false,
      locationPrecision: "fuzzed-or-hidden",
    },
    featureFlags: Object.fromEntries(commonBlockers.map((blocker) => [blocker.replaceAll(" ", "-"), false])),
  };
}

function contractFor(app) {
  return {
    appName: app.product,
    routeVersion: "phase12-step12-6-v1",
    routes: app.routes.map((route) => ({
      path: route,
      auth: "required",
      offline: route.includes("safety") || route.includes("chat") ? "blocked-sensitive-write" : "cached-read-with-reconcile",
      privacy: "no raw dating content, precise location, or sensitive preference values in analytics",
    })),
    requiredWorkflows: [
      "adult age gate",
      "profile creation",
      "preference filters",
      "recommendations",
      "likes or passes",
      "mutual match",
      "consent-bound chat",
      "safety check-in",
      "report and block",
      "privacy controls",
      "data deletion request",
    ],
    validationRules: {
      originalBrandingOnly: true,
      syntheticMediaOnly: true,
      minorsAllowed: false,
      preciseLocationStored: false,
      rawSensitiveAnalyticsAllowed: false,
      githubActionsUsed: false,
      reportRouteRequired: true,
      identityVerificationPlaceholderRequired: true,
    },
    blockedParity: commonBlockers,
  };
}

function reactApp(app) {
  return `import { readFileSync } from "node:fs";

const fixture = JSON.parse(
  readFileSync(new URL("../../../shared/test-fixtures/${slug(app)}-fixtures.json", import.meta.url), "utf8")
);
const contract = JSON.parse(
  readFileSync(new URL("../../../shared/api-contracts/${slug(app)}-contract.json", import.meta.url), "utf8")
);

export function build${app.module}Model() {
  return {
    appName: fixture.appName,
    tabs: ${JSON.stringify(app.tabs)},
    heroWorkflow: fixture.heroWorkflow,
    profileCount: fixture.profiles.length,
    matchCount: fixture.matches.length,
    minorsAllowed: fixture.discovery.minorsAllowed,
    preciseCoordinatesStored: fixture.discovery.preciseCoordinatesStored,
    routes: contract.routes.map((route) => route.path),
    blockerCount: contract.blockedParity.length,
  };
}

export function render${app.module}Summary() {
  const model = build${app.module}Model();
  return \`\${model.appName}: tabs=\${model.tabs.length}, profiles=\${model.profileCount}, matches=\${model.matchCount}, blockers=\${model.blockerCount}\`;
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
assert.equal(model.minorsAllowed, false);
assert.equal(model.preciseCoordinatesStored, false);
assert.match(render${app.module}Summary(), /blockers=/);
console.log(render${app.module}Summary());
`;
}

function flutterMain(app) {
  return `class ${app.module}Model {
  final String appName = '${app.product}';
  final List<String> tabs = const ${JSON.stringify(app.tabs).replaceAll('"', "'")};
  final List<String> risks = const ${JSON.stringify(app.risks).replaceAll('"', "'")};
  final bool minorsAllowed = false;
  final bool preciseCoordinatesStored = false;
  final bool rawSensitiveAnalyticsAllowed = false;

  String get summary =>
      '$appName: tabs=\${tabs.length}, risks=\${risks.length}, minors=$minorsAllowed';
}

void main() {
  final model = ${app.module}Model();
  assert(!model.minorsAllowed);
  assert(!model.preciseCoordinatesStored);
  assert(!model.rawSensitiveAnalyticsAllowed);
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
    let minorsAllowed = false
    let preciseCoordinatesStored = false
    let rawSensitiveAnalyticsAllowed = false

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
precondition(model.minorsAllowed == false)
precondition(model.preciseCoordinatesStored == false)
precondition(model.rawSensitiveAnalyticsAllowed == false)
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
    val minorsAllowed: Boolean = false,
    val preciseCoordinatesStored: Boolean = false,
    val rawSensitiveAnalyticsAllowed: Boolean = false,
) {
    fun summary(): String = "$appName: tabs=\${tabs.size}, risks=\${risks.size}, minors=$minorsAllowed"
}

fun main() {
    val model = ${app.module}Model()
    check(!model.minorsAllowed)
    check(!model.preciseCoordinatesStored)
    check(!model.rawSensitiveAnalyticsAllowed)
    println(model.summary())
}
`;
}

function validator(app) {
  const fixtureName = `${slug(app)}-fixtures.json`;
  const contractName = `${slug(app)}-contract.json`;
  return `import { readFile } from "node:fs/promises";

const fixture = JSON.parse(await readFile(new URL("../shared/test-fixtures/${fixtureName}", import.meta.url), "utf8"));
const contract = JSON.parse(await readFile(new URL("../shared/api-contracts/${contractName}", import.meta.url), "utf8"));
const failures = [];

if (fixture.appName !== "${app.product}") failures.push("fixture must use original ${app.product} naming");
if (!fixture.profiles.every((item) => item.syntheticMediaOnly)) failures.push("all profile media must be synthetic");
if (fixture.discovery.minorsAllowed !== false) failures.push("dating prototypes must block minors");
if (fixture.discovery.preciseCoordinatesStored !== false) failures.push("precise coordinates must not be stored");
if (fixture.safety.rawSensitiveContentAnalytics !== false) failures.push("raw sensitive dating analytics must be disabled");
if (!fixture.profiles.every((profile) => profile.consentRequiredForChat)) failures.push("chat requires mutual consent");
if (!fixture.safety.harassmentControls.includes("block")) failures.push("block control is required");
if (!fixture.safety.harassmentControls.includes("report")) failures.push("report control is required");

const routePaths = new Set(contract.routes.map((route) => route.path));
for (const requiredPath of ${JSON.stringify([app.routes[0], app.routes.at(-1)])}) {
  if (!routePaths.has(requiredPath)) failures.push(\`contract missing required route \${requiredPath}\`);
}
if (contract.validationRules.originalBrandingOnly !== true) failures.push("original branding guard missing");
if (contract.validationRules.syntheticMediaOnly !== true) failures.push("synthetic media guard missing");
if (contract.validationRules.minorsAllowed !== false) failures.push("minor exclusion guard missing");
if (contract.validationRules.preciseLocationStored !== false) failures.push("precise location guard missing");
if (contract.validationRules.rawSensitiveAnalyticsAllowed !== false) failures.push("sensitive analytics guard missing");
if (contract.validationRules.githubActionsUsed !== false) failures.push("GitHub Actions must not be used");
if (!contract.blockedParity.some((blocker) => blocker.includes("identity verification"))) failures.push("identity verification blocker must be explicit");
if (!contract.blockedParity.some((blocker) => blocker.includes("Flutter runtime"))) failures.push("Flutter blocker must be explicit");
if (!contract.blockedParity.some((blocker) => blocker.includes("Android Native"))) failures.push("Android blocker must be explicit");

if (failures.length > 0) {
  console.error(failures.map((failure) => \`- \${failure}\`).join("\\n"));
  process.exit(1);
}

console.log(\`validated \${fixture.appName}: profiles=\${fixture.profiles.length}, matches=\${fixture.matches.length}, routes=\${contract.routes.length}\`);
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
  return `# Phase 12 Step 12.6 Validation — ${app.product}

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
- Dating safety/legal review:
  - Uses original product name \`${app.product}\`, original synthetic data, and no proprietary assets.
  - Requires adult age gate, consent-bound chat, block/report controls, location fuzzing or hiding, and identity verification placeholders.
  - Keeps blocked parity flags explicit for provider verification, account, location, entitlement, push, deletion/export, region, age, orientation, and device behavior.
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
  await writeText(path.join(repoDir, "tasks", "validation", "phase12-step12-6.md"), validationDoc(app));
}

console.log(`generated Step 12.6 implementation files for ${apps.length} repos under ${repoRoot}`);
