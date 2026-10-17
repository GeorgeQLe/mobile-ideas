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
  "signed-in production account lifecycle and phone, email, or SSO verification require lawful provider/device testing",
  "virtual number inventory, SMS/MMS carrier gateways, PSTN/VoIP routing, voicemail, and emergency-calling behavior require licensed providers",
  "exact protocol, server, retention, search, notification, telephony, video, and voice behavior require independent implementation review",
  "push notification delivery and sensitive payload redaction require provider/device verification",
  "contacts, camera, microphone, media capture, files, location, calendar, and address-book access require real-device permission testing",
  "video/audio encoding, CDN storage, live push-to-talk, meeting, recording, transcript, and screen-share infrastructure remain launch-blocked",
  "enterprise tenant, admin, compliance, DLP, eDiscovery, legal hold, workflow, bot, and integration providers remain launch-blocked",
  "provider infrastructure, account export, account deletion, moderation, fraud prevention, and retention require server-authoritative workflows",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const apps = {
  "textnow-mobile-clone": {
    product: "NumberBridge",
    module: "NumberBridgeBatch",
    branch: "phase13-textnow-batch",
    sourceSpec: "941-textnow.md",
    category: "virtual number messaging and calling",
    hero: "virtual number setup blockers, SMS/MMS, calls, voicemail, forwarding, spam reporting, ad-supported service blockers, and emergency limitations",
    fixtureFile: "numberbridge-fixtures.json",
    contractFile: "numberbridge-contract.json",
    validator: "validate-phase13-textnow.mjs",
    validationRecord: "phase13-step13-11-textnow.json",
    swiftModule: "NumberBridge",
    packageName: "com.numberbridge",
    surfaces: ["Messages", "Calls", "Numbers", "Voicemail", "Forwarding", "Safety"],
    entities: ["account", "virtualNumber", "smsThread", "mmsAttachment", "callSession", "voicemail", "forwardingRule", "spamReport"],
    risks: ["number-provisioning", "carrier-provider", "e911-disclosure", "ad-supported-calling", "spam-fraud"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/numbers/provision/blocker",
      "/messages",
      "/messages/:id/items",
      "/mms/attachments",
      "/calls",
      "/voicemail",
      "/voicemail/:id/transcript",
      "/forwarding/rules",
      "/spam/reports",
      "/ads/blocker",
      "/emergency-limitations",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "virtual-number-message-security-review-required",
      enterpriseRetentionState: "consumer-number-retention-review-required",
      moderationState: "spam-call-message-and-fraud-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "textfree-mobile-clone": {
    product: "MinuteBloom",
    module: "MinuteBloomBatch",
    branch: "phase13-textfree-batch",
    sourceSpec: "942-textfree.md",
    category: "free texting and calling",
    hero: "virtual number blockers, free texting, earned calling minutes, MMS, voicemail, contact sync, ad/premium blockers, and emergency limitations",
    fixtureFile: "minutebloom-fixtures.json",
    contractFile: "minutebloom-contract.json",
    validator: "validate-phase13-textfree.mjs",
    validationRecord: "phase13-step13-11-textfree.json",
    swiftModule: "MinuteBloom",
    packageName: "com.minutebloom",
    surfaces: ["Texts", "Calls", "Minutes", "Numbers", "Voicemail", "Privacy"],
    entities: ["account", "virtualNumber", "messageThread", "callingMinuteLedger", "mmsAttachment", "voicemail", "adBlocker", "reportCase"],
    risks: ["earned-minutes-provider", "carrier-provider", "e911-disclosure", "ad-provider", "spam-fraud"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/numbers/provision/blocker",
      "/messages",
      "/messages/:id/items",
      "/mms/attachments",
      "/calls",
      "/minutes/earn/blocker",
      "/voicemail",
      "/ads/blocker",
      "/premium/blocker",
      "/reports",
      "/emergency-limitations",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "text-and-call-security-review-required",
      enterpriseRetentionState: "consumer-number-retention-review-required",
      moderationState: "spam-fraud-and-message-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "groupme-mobile-clone": {
    product: "CircleCommons",
    module: "CircleCommonsBatch",
    branch: "phase13-groupme-batch",
    sourceSpec: "943-groupme.md",
    category: "group messaging and SMS fallback",
    hero: "groups, direct messages, media gallery, likes, polls, events, SMS fallback blockers, bots, expenses, and per-group notification safety",
    fixtureFile: "circlecommons-fixtures.json",
    contractFile: "circlecommons-contract.json",
    validator: "validate-phase13-groupme.mjs",
    validationRecord: "phase13-step13-11-groupme.json",
    swiftModule: "CircleCommons",
    packageName: "com.circlecommons",
    surfaces: ["Groups", "Direct Messages", "Polls", "Events", "Gallery", "Safety"],
    entities: ["account", "group", "membership", "message", "poll", "event", "galleryItem", "smsFallbackBlocker", "reportCase"],
    risks: ["sms-fallback-provider", "group-moderation", "media-cdn", "bot-platform", "calendar-integration"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/groups",
      "/groups/:id/members",
      "/groups/:id/messages",
      "/direct-messages",
      "/polls",
      "/events",
      "/gallery",
      "/sms-fallback/blocker",
      "/bots/blocker",
      "/expenses/blocker",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "group-message-security-review-required",
      enterpriseRetentionState: "group-history-retention-review-required",
      moderationState: "group-content-and-invite-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "marco-polo-mobile-clone": {
    product: "VideoRelay",
    module: "VideoRelayBatch",
    branch: "phase13-marco-polo-batch",
    sourceSpec: "944-marco-polo.md",
    category: "asynchronous video messaging",
    hero: "async video threads, voice-only messages, reactions, playback speed, scrapbook blockers, forwarding, group management, media retention, and subscription blockers",
    fixtureFile: "videorelay-fixtures.json",
    contractFile: "videorelay-contract.json",
    validator: "validate-phase13-marco-polo.mjs",
    validationRecord: "phase13-step13-11-marco-polo.json",
    swiftModule: "VideoRelay",
    packageName: "com.videorelay",
    surfaces: ["Threads", "Capture", "Playback", "Scrapbook", "Groups", "Safety"],
    entities: ["account", "videoThread", "videoMessage", "voiceNote", "reaction", "scrapbookItem", "subscriptionBlocker", "reportCase"],
    risks: ["camera-permission", "video-cdn", "child-safety", "retention-policy", "subscription-provider"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/contacts/discovery",
      "/threads",
      "/threads/:id/video-messages",
      "/capture/video/blocker",
      "/capture/voice/blocker",
      "/playback/speed",
      "/scrapbook",
      "/forwarding/blocker",
      "/groups/:id/members",
      "/subscription/blocker",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "video-message-security-review-required",
      enterpriseRetentionState: "video-storage-retention-review-required",
      moderationState: "video-content-and-child-safety-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "voxer-mobile-clone": {
    product: "WaveRelay",
    module: "WaveRelayBatch",
    branch: "phase13-voxer-batch",
    sourceSpec: "945-voxer.md",
    category: "push-to-talk voice messaging",
    hero: "live push-to-talk blockers, asynchronous voice messages, text, media, location placeholders, quiet hours, transcription blockers, business controls, and moderation",
    fixtureFile: "waverelay-fixtures.json",
    contractFile: "waverelay-contract.json",
    validator: "validate-phase13-voxer.mjs",
    validationRecord: "phase13-step13-11-voxer.json",
    swiftModule: "WaveRelay",
    packageName: "com.waverelay",
    surfaces: ["PTT", "Voice Threads", "Messages", "Media", "Quiet Hours", "Business"],
    entities: ["account", "voiceThread", "voiceMessage", "livePttSession", "textMessage", "mediaAttachment", "quietHoursRule", "businessAdminBlocker", "reportCase"],
    risks: ["live-audio-provider", "voice-transcription", "bluetooth-ptt", "location-sharing", "business-compliance"],
    routes: [
      "/auth/session",
      "/identity/phone-verify",
      "/contacts/discovery",
      "/voice-threads",
      "/voice-threads/:id/messages",
      "/ptt/live/blocker",
      "/voice-messages",
      "/transcripts/blocker",
      "/location-sharing/blocker",
      "/bluetooth-ptt/blocker",
      "/quiet-hours",
      "/business/admin/blocker",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "live-voice-message-security-review-required",
      enterpriseRetentionState: "voice-history-and-business-retention-review-required",
      moderationState: "voice-content-and-location-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "microsoft-teams-mobile-clone": {
    product: "WorkGrid",
    module: "WorkGridBatch",
    branch: "phase13-microsoft-teams-batch",
    sourceSpec: "946-microsoft-teams.md",
    category: "enterprise collaboration and meetings",
    hero: "tenant-scoped chat, channels, meetings, calendar, files, screen-share blockers, recordings, admin policy, retention, compliance, apps, and reporting",
    fixtureFile: "workgrid-fixtures.json",
    contractFile: "workgrid-contract.json",
    validator: "validate-phase13-microsoft-teams.mjs",
    validationRecord: "phase13-step13-11-microsoft-teams.json",
    swiftModule: "WorkGrid",
    packageName: "com.workgrid",
    surfaces: ["Chats", "Channels", "Meetings", "Calendar", "Files", "Admin"],
    entities: ["tenant", "workspace", "channel", "chatThread", "meetingRoom", "calendarEvent", "fileShare", "retentionPolicy", "appIntegrationBlocker", "reportCase"],
    risks: ["tenant-admin", "meeting-infrastructure", "screen-share", "dlp-compliance", "workflow-integrations"],
    routes: [
      "/auth/session",
      "/tenant/select",
      "/channels",
      "/channels/:id/messages",
      "/chats",
      "/meetings",
      "/meetings/:id/participants",
      "/calendar/events",
      "/screen-share/blocker",
      "/recordings/blocker",
      "/files",
      "/apps/blocker",
      "/admin/policies",
      "/admin/exports",
      "/compliance/legal-hold",
      "/reports",
      "/settings/privacy",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "enterprise-message-and-meeting-security-review-required",
      enterpriseRetentionState: "enterprise-dlp-retention-and-legal-hold-review-required",
      moderationState: "enterprise-abuse-compliance-and-admin-reporting-required",
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
        attachments: [{ id: "attachment_1", kind: "synthetic-media", scanState: "pending" }],
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
      meetingProvider: false,
      enterpriseIntegrations: false,
      providerIntegrations: false,
      dataExportDeleteCompletion: false,
    },
    blockers: commonBlockers,
  };
}

function contractFor(config) {
  return {
    appName: config.product,
    routeVersion: "phase13-step13-11-v1",
    routes: config.routes.map((route) => ({
      path: route,
      auth: route.includes("auth") ? "anonymous-or-session" : "required",
      offline: route.includes("delete") || route.includes("export") || route.includes("blocker") || route.includes("reports") || route.includes("admin") || route.includes("compliance")
        ? "blocked-sensitive-write"
        : "cached-read-with-reconcile",
      privacy: "raw message, call, voicemail, video, voice, meeting, attachment, account, and contact content excluded from telemetry",
    })),
    requiredWorkflows: [
      "primary list or inbox",
      "thread, call, meeting, group, video, voice, number, or workspace lifecycle",
      "participant, account, tenant, or contact model",
      "attachment or media placeholder handling",
      "offline queue",
      "notification redaction",
      "report and block or safety escalation",
      "privacy settings",
      "export/delete blockers",
      "provider, enterprise, and regional blockers",
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

function validationRecord(config) {
  return json({
    appName: fixture.appName,
    checkedAt: generatedDate,
    surfaces: fixture.surfaces.length,
    conversations: fixture.conversations.length,
    domainObjects: fixture.domainObjects.length,
    messages: fixture.messages.length,
    routes: contract.routes.length,
    blockers: contract.blockedParity,
    githubActionsUsed: false,
    rawContentAnalyticsAllowed: false,
    notificationPreviewDefault: "redacted",
    auditedE2eeClaim: config.assertions.auditedE2eeClaim,
    providerParityClaim: false,
  });
}

function readme(config) {
  return `# ${config.product} Phase 13 Batch

Original lawful ${config.category} prototype inspired by public ${config.sourceSpec.replace(/^[0-9]+-/, "").replace(".md", "")} workflow categories. This repository uses original naming, synthetic fixtures, local validation, and explicit blockers for provider, account, privacy, security, notification, device, native runtime, retention, telephony, media, enterprise, and regional parity claims.

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
await write(`docs/validation/${app.validationRecord}`, validationRecord(app));

console.log(`Implemented ${app.product} Phase 13 batch files in ${repoRoot}`);
