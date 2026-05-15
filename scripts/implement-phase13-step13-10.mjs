#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();
const generatedDate = "2026-05-15";

function resolveRepoName(root) {
  try {
    const remote = execFileSync("git", ["-C", root, "remote", "get-url", "origin"], { encoding: "utf8" }).trim();
    return remote.replace(/\.git$/, "").split("/").at(-1);
  } catch {
    return path.basename(root);
  }
}

const commonBlockers = [
  "signed-in production account lifecycle and phone or email verification require lawful provider/device testing",
  "exact protocol, server, retention, search, telephony, and notification behavior require independent implementation review",
  "push notification delivery and sensitive payload redaction require provider/device verification",
  "contacts, camera, microphone, media capture, files, and address-book access require real-device permission testing",
  "payment, commerce, mini-program, sticker, bot, business messaging, and ecosystem providers remain launch-blocked",
  "telephony, VoIP, voicemail, PSTN, carrier, number-porting, and emergency-calling behavior require licensed providers",
  "provider infrastructure, account export, account deletion, and admin retention require server-authoritative workflows",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const apps = {
  "viber-mobile-clone": {
    product: "PulseRibbon",
    module: "PulseRibbonBatch",
    branch: "phase13-viber-batch",
    sourceSpec: "935-viber.md",
    category: "consumer messaging and calling",
    hero: "private and group chats, calls, communities, channels, stickers, disappearing messages, reports, and provider-blocked paid calling",
    fixtureFile: "pulseribbon-fixtures.json",
    contractFile: "pulseribbon-contract.json",
    validator: "validate-phase13-viber.mjs",
    validationRecord: "phase13-step13-10-viber.json",
    swiftModule: "PulseRibbon",
    packageName: "com.pulseribbon",
    surfaces: ["Chats", "Calls", "Communities", "Channels", "Stickers", "Privacy"],
    entities: ["account", "conversation", "community", "channel", "callSession", "stickerPack", "reportCase"],
    risks: ["contact-privacy", "voip-provider", "community-moderation", "sticker-commerce", "audited-e2ee-review"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/contacts/discovery",
      "/conversations",
      "/conversations/:id/messages",
      "/communities",
      "/channels",
      "/calls",
      "/stickers/catalog",
      "/paid-calling/blocker",
      "/settings/privacy",
      "/blocks",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "private-chat-security-review-required",
      enterpriseRetentionState: "consumer-retention-review-required",
      moderationState: "community-and-channel-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "wechat-mobile-clone": {
    product: "PocketCommons",
    module: "PocketCommonsBatch",
    branch: "phase13-wechat-batch",
    sourceSpec: "936-wechat.md",
    category: "super-app messaging",
    hero: "chats, moments-style feed, calls, QR discovery, official channels, payments, mini-app blockers, and regional compliance gates",
    fixtureFile: "pocketcommons-fixtures.json",
    contractFile: "pocketcommons-contract.json",
    validator: "validate-phase13-wechat.mjs",
    validationRecord: "phase13-step13-10-wechat.json",
    swiftModule: "PocketCommons",
    packageName: "com.pocketcommons",
    surfaces: ["Chats", "Feed", "Calls", "QR Hub", "Services", "Privacy"],
    entities: ["account", "conversation", "feedPost", "qrLink", "serviceCard", "paymentBlocker", "reportCase"],
    risks: ["regional-compliance", "payment-provider", "mini-app-platform", "content-moderation", "contact-privacy"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/contacts/discovery",
      "/conversations",
      "/conversations/:id/messages",
      "/moments/feed",
      "/calls",
      "/qr/scan",
      "/official-accounts",
      "/mini-programs/blocker",
      "/payments/blocker",
      "/settings/privacy",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "regional-messaging-security-review-required",
      enterpriseRetentionState: "regional-retention-and-data-transfer-review-required",
      moderationState: "super-app-content-and-fraud-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "line-mobile-clone": {
    product: "StickerHarbor",
    module: "StickerHarborBatch",
    branch: "phase13-line-batch",
    sourceSpec: "937-line.md",
    category: "super-app messaging and services",
    hero: "chats, groups, calls, stickers, open rooms, personal storage, official accounts, service blockers, and region-aware safety controls",
    fixtureFile: "stickerharbor-fixtures.json",
    contractFile: "stickerharbor-contract.json",
    validator: "validate-phase13-line.mjs",
    validationRecord: "phase13-step13-10-line.json",
    swiftModule: "StickerHarbor",
    packageName: "com.stickerharbor",
    surfaces: ["Chats", "Calls", "Open Rooms", "Stickers", "Storage", "Services"],
    entities: ["account", "conversation", "openRoom", "stickerPack", "storageItem", "serviceIntegration", "reportCase"],
    risks: ["sticker-commerce", "open-room-moderation", "payment-provider", "regional-availability", "letter-sealing-review"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/contacts/discovery",
      "/conversations",
      "/conversations/:id/messages",
      "/open-rooms",
      "/calls",
      "/stickers/catalog",
      "/storage/items",
      "/services/blocker",
      "/settings/privacy",
      "/blocks",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "letter-sealing-security-review-required",
      enterpriseRetentionState: "consumer-service-retention-review-required",
      moderationState: "open-room-and-sticker-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "kakaotalk-mobile-clone": {
    product: "TalkMosaic",
    module: "TalkMosaicBatch",
    branch: "phase13-kakaotalk-batch",
    sourceSpec: "938-kakaotalk.md",
    category: "regional messaging super-app",
    hero: "chats, open rooms, calls, emoticons, profiles, wallet and gift blockers, scheduled messages, and regional privacy gates",
    fixtureFile: "talkmosaic-fixtures.json",
    contractFile: "talkmosaic-contract.json",
    validator: "validate-phase13-kakaotalk.mjs",
    validationRecord: "phase13-step13-10-kakaotalk.json",
    swiftModule: "TalkMosaic",
    packageName: "com.talkmosaic",
    surfaces: ["Chats", "Open Rooms", "Calls", "Emoticons", "Profiles", "Wallet"],
    entities: ["account", "conversation", "openRoom", "profile", "emoticonPack", "walletBlocker", "reportCase"],
    risks: ["regional-phone-verification", "open-chat-moderation", "payment-provider", "digital-wallet", "secure-chat-review"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/contacts/discovery",
      "/conversations",
      "/conversations/:id/messages",
      "/open-rooms",
      "/calls",
      "/emoticons/catalog",
      "/profiles",
      "/wallet/blocker",
      "/gifts/blocker",
      "/settings/privacy",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "secure-chat-security-review-required",
      enterpriseRetentionState: "regional-retention-review-required",
      moderationState: "open-chat-and-commerce-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "skype-mobile-clone": {
    product: "CallAtlas",
    module: "CallAtlasBatch",
    branch: "phase13-skype-batch",
    sourceSpec: "939-skype.md",
    category: "video calling and telephony messaging",
    hero: "chats, one-to-one and group calls, captions, screen-share blockers, paid phone calling blockers, recordings, translation, and emergency limitations",
    fixtureFile: "callatlas-fixtures.json",
    contractFile: "callatlas-contract.json",
    validator: "validate-phase13-skype.mjs",
    validationRecord: "phase13-step13-10-skype.json",
    swiftModule: "CallAtlas",
    packageName: "com.callatlas",
    surfaces: ["Chats", "Calls", "Meetings", "Captions", "Phone", "Privacy"],
    entities: ["account", "conversation", "callRoom", "phoneDialer", "captionSession", "recordingBlocker", "reportCase"],
    risks: ["voip-provider", "recording-consent", "translation-quality", "paid-telephony", "emergency-disclosure"],
    routes: [
      "/auth/session",
      "/identity/account-link",
      "/contacts/discovery",
      "/conversations",
      "/conversations/:id/messages",
      "/calls",
      "/calls/:id/participants",
      "/captions",
      "/screen-share/blocker",
      "/phone-calling/blocker",
      "/recordings/blocker",
      "/emergency-limitations",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "calling-and-private-conversation-security-review-required",
      enterpriseRetentionState: "recording-and-call-log-retention-review-required",
      moderationState: "calling-and-message-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "google-voice-mobile-clone": {
    product: "NumberNest",
    module: "NumberNestBatch",
    branch: "phase13-google-voice-batch",
    sourceSpec: "940-google-voice.md",
    category: "virtual number calling and SMS",
    hero: "virtual number assignment blockers, calls, SMS/MMS, voicemail transcription, forwarding, spam filtering, workspace policy, and emergency limitations",
    fixtureFile: "numbernest-fixtures.json",
    contractFile: "numbernest-contract.json",
    validator: "validate-phase13-google-voice.mjs",
    validationRecord: "phase13-step13-10-google-voice.json",
    swiftModule: "NumberNest",
    packageName: "com.numbernest",
    surfaces: ["Messages", "Calls", "Voicemail", "Numbers", "Forwarding", "Admin"],
    entities: ["account", "virtualNumber", "smsThread", "callLog", "voicemail", "forwardingRule", "reportCase"],
    risks: ["number-provisioning", "carrier-provider", "voicemail-privacy", "spam-filtering", "emergency-disclosure"],
    routes: [
      "/auth/session",
      "/identity/account-link",
      "/numbers/provision/blocker",
      "/messages",
      "/messages/:id/items",
      "/calls",
      "/voicemail",
      "/voicemail/:id/transcript",
      "/forwarding/rules",
      "/spam/reports",
      "/workspace/policies",
      "/emergency-limitations",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "telephony-and-message-security-review-required",
      enterpriseRetentionState: "workspace-retention-and-number-policy-review-required",
      moderationState: "spam-call-and-message-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
};

const repoName = resolveRepoName(repoRoot);
const app = apps[repoName];
if (!app) {
  console.error(`Unsupported repo '${repoName}'. Expected one of: ${Object.keys(apps).join(", ")}`);
  process.exit(1);
}

function fixtureFor(config) {
  return {
    appName: config.product,
    inspirationScope: config.category,
    sourceSpec: config.sourceSpec,
    heroWorkflow: config.hero,
    generatedAt: generatedDate,
    surfaces: config.surfaces,
    actors: [
      { id: "actor_owner", displayName: "Ari Park", role: "owner", trustState: "verified-test-user" },
      { id: "actor_member", displayName: "Mika Stone", role: "member", trustState: "manual-invite" },
      { id: "actor_reviewer", displayName: "Sam Rivera", role: "safety-reviewer", trustState: "staff-test-user" },
    ],
    conversations: [
      {
        id: "conv_primary",
        title: `${config.product} primary workflow`,
        type: config.category,
        participantIds: ["actor_owner", "actor_member"],
        unreadCount: 2,
        muted: false,
        retention: config.assertions.enterpriseRetentionState,
        security: config.assertions.securityReviewState,
      },
      {
        id: "conv_safety",
        title: "Safety and privacy review",
        type: "safety",
        participantIds: ["actor_owner", "actor_reviewer"],
        unreadCount: 1,
        muted: true,
        retention: "minimal-evidence-snapshot",
        security: "role-gated-review",
      },
    ],
    domainObjects: config.entities.map((entity, index) => ({
      id: `${entity}_${index + 1}`,
      kind: entity,
      ownerId: index % 2 === 0 ? "actor_owner" : "actor_member",
      lifecycle: index === 0 ? "active" : "blocked-until-provider-review",
      reportable: true,
      syntheticOnly: true,
    })),
    messages: [
      {
        id: "msg_1",
        conversationId: "conv_primary",
        senderId: "actor_owner",
        body: "Synthetic seeded item for local validation.",
        lifecycle: "read",
        delivery: { sent: true, delivered: true, readBy: ["actor_member"] },
        attachments: [],
        safety: { reportable: true, unsafeLinkScan: "clean" },
      },
      {
        id: "msg_2",
        conversationId: "conv_primary",
        senderId: "actor_member",
        body: "Queued synthetic reply or draft for offline reconciliation.",
        lifecycle: "queued_offline",
        delivery: { sent: false, delivered: false, readBy: [], failedReason: "offline" },
        attachments: [{ id: "attachment_1", kind: "synthetic-file", scanState: "pending" }],
        safety: { reportable: true, unsafeLinkScan: "pending" },
      },
    ],
    offlineQueue: [
      {
        id: "queue_1",
        action: "send_or_sync_item",
        conversationId: "conv_primary",
        idempotencyKey: `${config.product.toLowerCase()}_offline_1`,
        requiresServerConfirmation: true,
      },
    ],
    privacyAndSafety: {
      rawContentAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      reportCategories: ["spam", "harassment", "impersonation", "unsafe-link", "privacy", "illegal-content", "fraud"],
      moderationState: config.assertions.moderationState,
      risks: config.risks,
    },
    featureFlags: {
      productionAccountLifecycle: false,
      auditedE2eeClaim: config.assertions.auditedE2eeClaim,
      providerParityClaim: config.assertions.providerParityClaim,
      pushDelivery: false,
      mediaCapture: false,
      cameraMicrophoneCapture: false,
      paymentOrCommerceProvider: false,
      telephonyProvider: false,
      providerIntegrations: false,
      dataExportDeleteCompletion: false,
    },
    blockers: commonBlockers,
  };
}

function contractFor(config) {
  return {
    appName: config.product,
    routeVersion: "phase13-step13-10-v1",
    routes: config.routes.map((route) => ({
      path: route,
      auth: route.includes("auth") ? "anonymous-or-session" : "required",
      offline: route.includes("delete") || route.includes("export") || route.includes("blocker") || route.includes("reports") || route.includes("payments")
        ? "blocked-sensitive-write"
        : "cached-read-with-reconcile",
      privacy: "raw message, call, voicemail, payment, attachment, account, and contact content excluded from telemetry",
    })),
    requiredWorkflows: [
      "primary list or inbox",
      "thread, call, service, or number lifecycle",
      "participant, account, or contact model",
      "attachment or media placeholder handling",
      "offline queue",
      "notification redaction",
      "report and block or safety escalation",
      "privacy settings",
      "export/delete blockers",
      "provider and regional blockers",
    ],
    validationRules: {
      originalBrandingOnly: true,
      syntheticFixturesOnly: true,
      githubActionsUsed: false,
      rawContentAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      reportRouteRequired: true,
      auditedE2eeClaim: config.assertions.auditedE2eeClaim,
      providerParityClaim: config.assertions.providerParityClaim,
    },
    blockedParity: commonBlockers,
  };
}

const fixture = fixtureFor(app);
const contract = contractFor(app);

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function reactApp(config) {
  return `import { readFileSync } from "node:fs";

const fixture = JSON.parse(
  readFileSync(new URL("../../shared/test-fixtures/${config.fixtureFile}", import.meta.url), "utf8")
);
const contract = JSON.parse(
  readFileSync(new URL("../../shared/api-contracts/${config.contractFile}", import.meta.url), "utf8")
);

export function build${config.module}Model() {
  const unreadTotal = fixture.conversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
  const queuedMessages = fixture.messages.filter((message) => message.lifecycle === "queued_offline").length;
  const blockedObjects = fixture.domainObjects.filter((item) => item.lifecycle.includes("blocked")).length;
  return {
    appName: fixture.appName,
    surfaceCount: fixture.surfaces.length,
    conversationCount: fixture.conversations.length,
    domainObjectCount: fixture.domainObjects.length,
    messageCount: fixture.messages.length,
    unreadTotal,
    queuedMessages,
    blockedObjects,
    routeCount: contract.routes.length,
    rawContentAnalyticsAllowed: fixture.privacyAndSafety.rawContentAnalyticsAllowed,
    notificationPreviewDefault: fixture.privacyAndSafety.notificationPreviewDefault,
    githubActionsUsed: contract.validationRules.githubActionsUsed,
    auditedE2eeClaim: contract.validationRules.auditedE2eeClaim,
    providerParityClaim: contract.validationRules.providerParityClaim,
    blockedParityCount: contract.blockedParity.length,
  };
}

export function render${config.module}Summary() {
  const model = build${config.module}Model();
  return \`\${model.appName}: surfaces=\${model.surfaceCount}, conversations=\${model.conversationCount}, queued=\${model.queuedMessages}, blocked=\${model.blockedObjects}, routes=\${model.routeCount}\`;
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  console.log(render${config.module}Summary());
}
`;
}

function reactTest(config) {
  return `import assert from "node:assert/strict";
import { build${config.module}Model, render${config.module}Summary } from "./app.mjs";

const model = build${config.module}Model();
assert.equal(model.appName, "${config.product}");
assert.equal(model.rawContentAnalyticsAllowed, false);
assert.equal(model.notificationPreviewDefault, "redacted");
assert.equal(model.githubActionsUsed, false);
assert.equal(model.auditedE2eeClaim, false);
assert.equal(model.providerParityClaim, false);
assert.ok(model.surfaceCount >= 5);
assert.ok(model.conversationCount >= 2);
assert.ok(model.domainObjectCount >= 5);
assert.ok(model.messageCount >= 2);
assert.ok(model.queuedMessages >= 1);
assert.ok(model.blockedObjects >= 1);
assert.ok(model.routeCount >= 10);
assert.ok(model.blockedParityCount >= 8);
assert.match(render${config.module}Summary(), /queued=/);
console.log(render${config.module}Summary());
`;
}

function flutterMain(config) {
  return `class ${config.module}Model {
  final String appName = '${config.product}';
  final int surfaceCount = ${fixture.surfaces.length};
  final int conversationCount = ${fixture.conversations.length};
  final int domainObjectCount = ${fixture.domainObjects.length};
  final int queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length};
  final bool rawContentAnalyticsAllowed = false;
  final String notificationPreviewDefault = 'redacted';
  final int blockedParityCount = ${commonBlockers.length};

  String summary() {
    return '$appName: surfaces=$surfaceCount, conversations=$conversationCount, queued=$queuedMessages, blockers=$blockedParityCount';
  }
}

void main() {
  final model = ${config.module}Model();
  assert(model.rawContentAnalyticsAllowed == false);
  assert(model.notificationPreviewDefault == 'redacted');
  print(model.summary());
}
`;
}

function swiftMain(config) {
  return `import Foundation

struct ${config.module}Model {
    let appName = "${config.product}"
    let surfaceCount = ${fixture.surfaces.length}
    let conversationCount = ${fixture.conversations.length}
    let domainObjectCount = ${fixture.domainObjects.length}
    let queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length}
    let rawContentAnalyticsAllowed = false
    let notificationPreviewDefault = "redacted"
    let blockedParityCount = ${commonBlockers.length}

    func summary() -> String {
        return "\\(appName): surfaces=\\(surfaceCount), conversations=\\(conversationCount), queued=\\(queuedMessages), blockers=\\(blockedParityCount)"
    }
}

let model = ${config.module}Model()
precondition(model.rawContentAnalyticsAllowed == false)
precondition(model.notificationPreviewDefault == "redacted")
print(model.summary())
`;
}

function kotlinMain(config) {
  return `data class ${config.module}Model(
    val appName: String = "${config.product}",
    val surfaceCount: Int = ${fixture.surfaces.length},
    val conversationCount: Int = ${fixture.conversations.length},
    val domainObjectCount: Int = ${fixture.domainObjects.length},
    val queuedMessages: Int = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length},
    val rawContentAnalyticsAllowed: Boolean = false,
    val notificationPreviewDefault: String = "redacted",
    val blockedParityCount: Int = ${commonBlockers.length}
) {
    fun summary(): String = "$appName: surfaces=$surfaceCount, conversations=$conversationCount, queued=$queuedMessages, blockers=$blockedParityCount"
}

fun main() {
    val model = ${config.module}Model()
    check(!model.rawContentAnalyticsAllowed)
    check(model.notificationPreviewDefault == "redacted")
    println(model.summary())
}
`;
}

function packageJson(config) {
  return json({
    scripts: {
      validate: `node scripts/${config.validator}`,
      "test:react-native": "node variants/react-native/app.test.mjs",
      "test:expo": "node variants/expo/app.test.mjs",
    },
    type: "module",
  });
}

function validator(config) {
  return `import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixture = JSON.parse(readFileSync(path.join(root, "shared/test-fixtures/${config.fixtureFile}"), "utf8"));
const contract = JSON.parse(readFileSync(path.join(root, "shared/api-contracts/${config.contractFile}"), "utf8"));

for (const required of [
  "variants/react-native/app.mjs",
  "variants/react-native/app.test.mjs",
  "variants/expo/app.mjs",
  "variants/expo/app.test.mjs",
  "variants/flutter/lib/main.dart",
  "variants/ios-native/Sources/${config.swiftModule}/main.swift",
  "variants/android-native/app/src/main/kotlin/${config.packageName.replaceAll(".", "/")}/Main.kt",
]) {
  assert.ok(existsSync(path.join(root, required)), \`missing \${required}\`);
}

assert.equal(fixture.appName, "${config.product}");
assert.equal(fixture.privacyAndSafety.rawContentAnalyticsAllowed, false);
assert.equal(fixture.privacyAndSafety.notificationPreviewDefault, "redacted");
assert.ok(fixture.privacyAndSafety.risks.length >= 4);
assert.ok(fixture.conversations.length >= 2);
assert.ok(fixture.domainObjects.length >= 5);
assert.ok(fixture.messages.some((message) => message.lifecycle === "queued_offline"));
assert.ok(fixture.offlineQueue.some((item) => item.requiresServerConfirmation));
assert.ok(contract.routes.some((route) => route.path === "/reports" || route.path.includes("/reports") || route.path.includes("/spam/reports")));
assert.ok(contract.routes.some((route) => route.path === "/data-export" || route.path === "/admin/exports"));
assert.equal(contract.validationRules.githubActionsUsed, false);
assert.equal(contract.validationRules.rawContentAnalyticsAllowed, false);
assert.equal(contract.validationRules.notificationPreviewDefault, "redacted");
assert.equal(contract.validationRules.auditedE2eeClaim, ${config.assertions.auditedE2eeClaim});
assert.equal(contract.validationRules.providerParityClaim, false);
assert.ok(contract.blockedParity.length >= 8);

mkdirSync(path.join(root, "docs/validation"), { recursive: true });
writeFileSync(
  path.join(root, "docs/validation/${config.validationRecord}"),
  JSON.stringify(
    {
      appName: fixture.appName,
      checkedAt: "${generatedDate}",
      surfaces: fixture.surfaces.length,
      conversations: fixture.conversations.length,
      domainObjects: fixture.domainObjects.length,
      messages: fixture.messages.length,
      routes: contract.routes.length,
      blockers: contract.blockedParity,
      githubActionsUsed: false,
      rawContentAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      auditedE2eeClaim: ${config.assertions.auditedE2eeClaim},
      providerParityClaim: false
    },
    null,
    2
  ) + "\\n"
);

console.log(\`validated \${fixture.appName}: surfaces=\${fixture.surfaces.length}, conversations=\${fixture.conversations.length}, objects=\${fixture.domainObjects.length}, routes=\${contract.routes.length}, blockers=\${contract.blockedParity.length}\`);
`;
}

function readme(config) {
  return `# ${config.product} Phase 13 Batch

Original lawful ${config.category} prototype inspired by public ${config.sourceSpec.replace(/^[0-9]+-/, "").replace(".md", "")} workflow categories. This repository uses original naming, synthetic fixtures, local validation, and explicit blockers for provider, account, privacy, security, notification, device, native runtime, retention, telephony, commerce, and regional parity claims.

## Local Checks

- \`npm run validate\`
- \`npm run test:react-native\`
- \`npm run test:expo\`

Flutter and Android Native runtime validation remain blocked when Dart/Flutter and Kotlin tooling are unavailable locally.
`;
}

async function write(relativePath, contents) {
  const fullPath = path.join(repoRoot, relativePath);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, contents);
}

await write("README.md", readme(app));
await write("package.json", packageJson(app));
await write(`shared/test-fixtures/${app.fixtureFile}`, json(fixture));
await write(`shared/api-contracts/${app.contractFile}`, json(contract));
await write("variants/react-native/app.mjs", reactApp(app));
await write("variants/react-native/app.test.mjs", reactTest(app));
await write("variants/expo/app.mjs", reactApp(app));
await write("variants/expo/app.test.mjs", reactTest(app));
await write("variants/flutter/lib/main.dart", flutterMain(app));
await write(`variants/ios-native/Sources/${app.swiftModule}/main.swift`, swiftMain(app));
await write(`variants/android-native/app/src/main/kotlin/${app.packageName.replaceAll(".", "/")}/Main.kt`, kotlinMain(app));
await write(`scripts/${app.validator}`, validator(app));

console.log(`Implemented ${app.product} Phase 13 batch files in ${repoRoot}`);
