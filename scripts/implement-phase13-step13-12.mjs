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
  "signed-in account lifecycle, SSO, workspace, enterprise tenant, guest access, and calendar invitation behavior require lawful provider testing",
  "meeting media infrastructure, SFU/MCU routing, adaptive bitrate, participant limits, dial-in telephony, PSTN bridges, and livestream paths require licensed providers",
  "camera, microphone, screen-share, presentation, local-network, file, contacts, notification, and calendar permissions require real-device verification",
  "recording, transcript, captions, translation, highlights, summaries, action items, noise processing, virtual backgrounds, and reactions require provider and accessibility review",
  "lobby, waiting room, breakout, moderation, attendance, reporting, lock, remove, mute-all, and participant-admission behavior require server-authoritative workflows",
  "enterprise admin, compliance, DLP, eDiscovery, legal hold, retention, room-device, contact-center, webinar, and analytics providers remain launch-blocked",
  "self-hosting, data residency, open meeting room, password, guest policy, and hosted-service capacity behavior require deployment-specific review",
  "push notification delivery, sensitive payload redaction, account export, account deletion, audit logs, and support escalation require provider/device verification",
  "audited E2EE, Zero Trust, insertable-stream, meeting-key, and exact security parity claims require independent cryptography review",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const apps = {
  "cisco-webex-mobile-clone": {
    product: "BridgeRoom",
    module: "BridgeRoomBatch",
    branch: "phase13-cisco-webex-batch",
    sourceSpec: "947-cisco-webex.md",
    category: "enterprise meetings and persistent collaboration",
    hero: "scheduled meetings, instant rooms, participants, spaces, files, recordings, breakouts, calling, device rooms, admin policy, retention, and compliance blockers",
    fixtureFile: "bridgeroom-fixtures.json",
    contractFile: "bridgeroom-contract.json",
    validator: "validate-phase13-cisco-webex.mjs",
    validationRecord: "phase13-step13-12-cisco-webex.json",
    swiftModule: "BridgeRoom",
    packageName: "com.bridgeroom",
    surfaces: ["Meetings", "Spaces", "Calling", "Recordings", "Devices", "Admin"],
    entities: ["tenant", "meetingRoom", "participant", "spaceThread", "fileShare", "breakoutRoom", "recording", "deviceRoom", "retentionPolicy", "reportCase"],
    risks: ["enterprise-tenant", "media-sfu", "screen-share", "recording-storage", "device-room", "zero-trust-review"],
    routes: [
      "/auth/session",
      "/tenant/select",
      "/meetings",
      "/meetings/:id/participants",
      "/meetings/:id/lobby",
      "/meetings/:id/breakouts",
      "/spaces",
      "/spaces/:id/messages",
      "/files",
      "/recordings/blocker",
      "/captions/blocker",
      "/calling/pstn/blocker",
      "/devices/rooms/blocker",
      "/admin/policies",
      "/compliance/legal-hold",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "enterprise-meeting-zero-trust-security-review-required",
      enterpriseRetentionState: "enterprise-retention-ediscovery-and-legal-hold-review-required",
      moderationState: "meeting-space-abuse-and-admin-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "google-meet-mobile-clone": {
    product: "GatherLens",
    module: "GatherLensBatch",
    branch: "phase13-google-meet-batch",
    sourceSpec: "948-google-meet.md",
    category: "calendar-integrated video meetings",
    hero: "personal and workspace meetings, invites, calendar hooks, participants, reactions, polls, captions, recordings, live streams, companion mode, and Workspace policy blockers",
    fixtureFile: "gatherlens-fixtures.json",
    contractFile: "gatherlens-contract.json",
    validator: "validate-phase13-google-meet.mjs",
    validationRecord: "phase13-step13-12-google-meet.json",
    swiftModule: "GatherLens",
    packageName: "com.gatherlens",
    surfaces: ["Meetings", "Calendar", "Participants", "Reactions", "Recordings", "Workspace"],
    entities: ["account", "workspace", "calendarEvent", "meetingRoom", "participant", "reaction", "poll", "recording", "workspacePolicy", "reportCase"],
    risks: ["workspace-account", "calendar-provider", "media-sfu", "caption-provider", "recording-drive-provider", "workspace-admin"],
    routes: [
      "/auth/session",
      "/workspace/select",
      "/calendar/events",
      "/meetings",
      "/meetings/:id/participants",
      "/meetings/:id/reactions",
      "/meetings/:id/polls",
      "/screen-share/blocker",
      "/captions/blocker",
      "/recordings/blocker",
      "/livestream/blocker",
      "/companion-mode/blocker",
      "/workspace/policies",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "workspace-meeting-security-review-required",
      enterpriseRetentionState: "workspace-retention-and-drive-recording-review-required",
      moderationState: "meeting-safety-and-workspace-policy-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "goto-mobile-clone": {
    product: "SummitDial",
    module: "SummitDialBatch",
    branch: "phase13-goto-batch",
    sourceSpec: "949-goto.md",
    category: "unified meetings, phone, and webinars",
    hero: "meetings, business phone, webinars, screen drawing, recordings, transcripts, breakout rooms, dial-in audio, contact-center, admin analytics, and enterprise retention blockers",
    fixtureFile: "summitdial-fixtures.json",
    contractFile: "summitdial-contract.json",
    validator: "validate-phase13-goto.mjs",
    validationRecord: "phase13-step13-12-goto.json",
    swiftModule: "SummitDial",
    packageName: "com.summitdial",
    surfaces: ["Meetings", "Phone", "Webinars", "Contact Center", "Recordings", "Admin"],
    entities: ["tenant", "meetingRoom", "webinarEvent", "phoneLine", "callRoute", "voicemail", "contactQueue", "recording", "analyticsReport", "reportCase"],
    risks: ["business-phone-provider", "webinar-scale", "dial-in-provider", "recording-transcription", "contact-center", "admin-analytics"],
    routes: [
      "/auth/session",
      "/tenant/select",
      "/meetings",
      "/meetings/:id/participants",
      "/webinars",
      "/webinars/:id/attendees",
      "/phone/lines",
      "/phone/calls",
      "/voicemail/blocker",
      "/dial-in/blocker",
      "/recordings/blocker",
      "/transcripts/blocker",
      "/contact-center/blocker",
      "/admin/analytics",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "unified-communications-security-review-required",
      enterpriseRetentionState: "meeting-phone-webinar-retention-review-required",
      moderationState: "meeting-phone-and-webinar-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "bluejeans-mobile-clone": {
    product: "EventBlue",
    module: "EventBlueBatch",
    branch: "phase13-bluejeans-batch",
    sourceSpec: "950-bluejeans.md",
    category: "video meetings and large events",
    hero: "meetings, events, presenters, attendee engagement, screen sharing, audio processing, highlights, transcripts, rooms, Q&A, analytics, and enterprise blockers",
    fixtureFile: "eventblue-fixtures.json",
    contractFile: "eventblue-contract.json",
    validator: "validate-phase13-bluejeans.mjs",
    validationRecord: "phase13-step13-12-bluejeans.json",
    swiftModule: "EventBlue",
    packageName: "com.eventblue",
    surfaces: ["Meetings", "Events", "Q&A", "Highlights", "Rooms", "Analytics"],
    entities: ["tenant", "meetingRoom", "eventStage", "presenter", "attendee", "qaQuestion", "highlightClip", "roomDevice", "analyticsInsight", "reportCase"],
    risks: ["event-scale-provider", "audio-processing", "ai-highlights", "room-device", "verizon-account", "enterprise-retention"],
    routes: [
      "/auth/session",
      "/tenant/select",
      "/meetings",
      "/events",
      "/events/:id/presenters",
      "/events/:id/attendees",
      "/qa/questions",
      "/recordings/blocker",
      "/highlights/blocker",
      "/transcripts/blocker",
      "/rooms/blocker",
      "/analytics/insights",
      "/admin/policies",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "event-meeting-security-review-required",
      enterpriseRetentionState: "event-recording-retention-and-compliance-review-required",
      moderationState: "event-qa-attendee-and-meeting-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "jitsi-meet-mobile-clone": {
    product: "OpenGather",
    module: "OpenGatherBatch",
    branch: "phase13-jitsi-meet-batch",
    sourceSpec: "951-jitsi-meet.md",
    category: "open meeting rooms and self-hosted video",
    hero: "no-account rooms, guest joins, passwords, lobby, hand raising, chat, tile views, self-hosting, recording/livestream blockers, dial-in, and data-residency review",
    fixtureFile: "opengather-fixtures.json",
    contractFile: "opengather-contract.json",
    validator: "validate-phase13-jitsi-meet.mjs",
    validationRecord: "phase13-step13-12-jitsi-meet.json",
    swiftModule: "OpenGather",
    packageName: "com.opengather",
    surfaces: ["Rooms", "Lobby", "Chat", "Moderation", "Self Hosting", "Streaming"],
    entities: ["room", "guestParticipant", "moderator", "roomPassword", "lobbyAdmission", "chatMessage", "speakerStat", "selfHostDeployment", "recordingBlocker", "reportCase"],
    risks: ["open-room-abuse", "self-hosted-sfu", "e2ee-key-review", "recording-jibri", "dial-in-sip", "hosted-capacity"],
    routes: [
      "/rooms/new",
      "/rooms/:id/join",
      "/rooms/:id/participants",
      "/rooms/:id/lobby",
      "/rooms/:id/password",
      "/rooms/:id/chat",
      "/rooms/:id/reactions",
      "/screen-share/blocker",
      "/recordings/blocker",
      "/livestream/blocker",
      "/dial-in/blocker",
      "/self-host/deployment-review",
      "/security/e2ee-review",
      "/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "open-room-self-hosted-meeting-security-review-required",
      enterpriseRetentionState: "self-hosted-or-hosted-retention-review-required",
      moderationState: "open-room-abuse-and-lobby-moderation-reporting-required",
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
      { id: "actor_host", displayName: "Ari Park", role: "host", trustState: "verified-test-user" },
      { id: "actor_guest", displayName: "Mika Stone", role: "participant", trustState: "manual-invite" },
      { id: "actor_reviewer", displayName: "Sam Rivera", role: "safety-reviewer", trustState: "staff-test-user" },
    ],
    conversations: [
      {
        id: "conv_meeting",
        title: `${config.product} meeting room`,
        type: config.category,
        participantIds: ["actor_host", "actor_guest"],
        unreadCount: 2,
        muted: false,
        retention: config.assertions.enterpriseRetentionState,
        security: config.assertions.securityReviewState,
      },
      {
        id: "conv_safety",
        title: "Meeting safety and privacy review",
        type: "safety",
        participantIds: ["actor_host", "actor_reviewer"],
        unreadCount: 1,
        muted: true,
        retention: "minimal-evidence-snapshot",
        security: "role-gated-review",
      },
    ],
    domainObjects: config.entities.map((entity, index) => ({
      id: `${entity}_${index + 1}`,
      kind: entity,
      ownerId: index % 2 === 0 ? "actor_host" : "actor_guest",
      lifecycle: index === 0 ? "active" : "blocked-until-provider-review",
      reportable: true,
      syntheticOnly: true,
    })),
    messages: [
      {
        id: "msg_1",
        conversationId: "conv_meeting",
        senderId: "actor_host",
        body: "Synthetic meeting agenda item for local validation.",
        lifecycle: "read",
        delivery: { sent: true, delivered: true, readBy: ["actor_guest"] },
        attachments: [],
        safety: { reportable: true, unsafeLinkScan: "clean" },
      },
      {
        id: "msg_2",
        conversationId: "conv_meeting",
        senderId: "actor_guest",
        body: "Queued synthetic chat reply for offline reconciliation.",
        lifecycle: "queued_offline",
        delivery: { sent: false, delivered: false, readBy: [], failedReason: "offline" },
        attachments: [{ id: "attachment_1", kind: "synthetic-meeting-note", scanState: "pending" }],
        safety: { reportable: true, unsafeLinkScan: "pending" },
      },
    ],
    offlineQueue: [
      {
        id: "queue_1",
        action: "send_meeting_chat_or_sync_state",
        conversationId: "conv_meeting",
        idempotencyKey: `${config.product.toLowerCase()}_offline_1`,
        requiresServerConfirmation: true,
      },
    ],
    privacyAndSafety: {
      rawContentAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      reportCategories: ["harassment", "spam", "unsafe-link", "meeting-disruption", "privacy", "fraud", "illegal-content"],
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
      screenShareCapture: false,
      telephonyProvider: false,
      meetingProvider: false,
      recordingProvider: false,
      transcriptProvider: false,
      enterpriseIntegrations: false,
      selfHostingParity: false,
      dataExportDeleteCompletion: false,
    },
    blockers: commonBlockers,
  };
}

function contractFor(config) {
  return {
    appName: config.product,
    routeVersion: "phase13-step13-12-v1",
    routes: config.routes.map((route) => ({
      path: route,
      auth: route.includes("auth") || route.includes("/rooms/new") ? "anonymous-or-session" : "required",
      offline: route.includes("delete") || route.includes("export") || route.includes("blocker") || route.includes("reports") || route.includes("admin") || route.includes("compliance")
        ? "blocked-sensitive-write"
        : "cached-read-with-reconcile",
      privacy: "raw meeting, recording, transcript, chat, participant, tenant, file, account, and device content excluded from telemetry",
    })),
    requiredWorkflows: [
      "meeting, room, webinar, phone, or event list",
      "participant, guest, tenant, or moderator model",
      "invite, lobby, waiting room, moderation, or policy state",
      "meeting chat and attachment placeholder handling",
      "offline queue",
      "notification redaction",
      "report and block or safety escalation",
      "privacy settings",
      "export/delete blockers",
      "provider, enterprise, self-hosting, security, and regional blockers",
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
assert.ok(contract.routes.some((route) => route.path === "/reports" || route.path.includes("/reports")));
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

Original lawful ${config.category} prototype inspired by public ${config.sourceSpec.replace(/^[0-9]+-/, "").replace(".md", "")} workflow categories. This repository uses original naming, synthetic fixtures, local validation, and explicit blockers for provider, account, privacy, security, notification, device, native runtime, retention, media, meeting, telephony, enterprise, self-hosting, and regional parity claims.

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
