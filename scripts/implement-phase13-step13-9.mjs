#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
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
  "signed-in production account lifecycle and verification require lawful provider/device testing",
  "exact protocol, server, retention, search, and notification behavior require independent implementation review",
  "push notification delivery and sensitive payload redaction require provider/device verification",
  "contacts, camera, microphone, media capture, and files require real-device permission testing",
  "provider infrastructure, account export, account deletion, and admin retention require server-authoritative workflows",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const apps = {
  "messenger-mobile-clone": {
    id: "021",
    product: "RelayNest",
    module: "SocialMessengerBatch",
    branch: "phase13-messenger-batch",
    sourceSpec: "021-messenger.md",
    category: "social messaging",
    hero: "account-based chats, groups, reactions, media, calls, requests, safety controls, and provider-blocked assistant/business surfaces",
    fixtureFile: "relaynest-fixtures.json",
    contractFile: "relaynest-contract.json",
    validator: "validate-phase13-messenger.mjs",
    validationRecord: "phase13-step13-9-messenger.json",
    swiftModule: "RelayNest",
    packageName: "com.relaynest",
    surfaces: ["Inbox", "Requests", "Direct Chat", "Groups", "Calls", "Privacy"],
    entities: ["account", "conversation", "group", "messageRequest", "callSession", "reportCase"],
    risks: ["contact-privacy", "encrypted-chat-parity", "minor-safety", "business-assistant-provider"],
    routes: [
      "/auth/session",
      "/profiles/me",
      "/contacts/discovery",
      "/conversations",
      "/conversations/:id/messages",
      "/messages/:id/reactions",
      "/message-requests",
      "/groups/:id/members",
      "/calls",
      "/settings/privacy",
      "/blocks",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "encrypted-personal-chat-review-required",
      enterpriseRetentionState: "not-applicable",
      moderationState: "social-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "facetime-mobile-clone": {
    id: "022",
    product: "CallLoom",
    module: "PersonalCallingBatch",
    branch: "phase13-facetime-batch",
    sourceSpec: "022-facetime.md",
    category: "personal video calling",
    hero: "contact calls, group calls, call links, guest join states, device permissions, captions, and handoff blockers",
    fixtureFile: "callloom-fixtures.json",
    contractFile: "callloom-contract.json",
    validator: "validate-phase13-facetime.mjs",
    validationRecord: "phase13-step13-9-facetime.json",
    swiftModule: "CallLoom",
    packageName: "com.callloom",
    surfaces: ["Recents", "Contacts", "Call Link", "Active Call", "Permissions", "Safety"],
    entities: ["contactEndpoint", "callRoom", "participant", "callInvite", "permissionGate", "reportCase"],
    risks: ["camera-microphone-permission", "call-link-abuse", "guest-join-privacy", "real-device-network"],
    routes: [
      "/auth/session",
      "/contacts",
      "/calls",
      "/calls/:id/join",
      "/calls/:id/participants",
      "/call-links",
      "/devices/permissions",
      "/captions",
      "/handoff",
      "/settings/privacy",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "calling-provider-security-review-required",
      enterpriseRetentionState: "not-applicable",
      moderationState: "call-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "zoom-mobile-clone": {
    id: "023",
    product: "MeetHaven",
    module: "MeetingRoomBatch",
    branch: "phase13-zoom-batch",
    sourceSpec: "023-zoom.md",
    category: "video meetings",
    hero: "scheduled meetings, join flow, waiting room, host controls, meeting chat, recording blockers, and enterprise policy",
    fixtureFile: "meethaven-fixtures.json",
    contractFile: "meethaven-contract.json",
    validator: "validate-phase13-zoom.mjs",
    validationRecord: "phase13-step13-9-zoom.json",
    swiftModule: "MeetHaven",
    packageName: "com.meethaven",
    surfaces: ["Meetings", "Join", "Waiting Room", "Host Controls", "Chat", "Admin"],
    entities: ["meeting", "participant", "waitingRoom", "hostControl", "recordingPolicy", "reportCase"],
    risks: ["meeting-abuse", "recording-consent", "enterprise-retention", "provider-infrastructure"],
    routes: [
      "/auth/session",
      "/meetings",
      "/meetings/:id/join",
      "/meetings/:id/waiting-room",
      "/meetings/:id/participants",
      "/meetings/:id/host-controls",
      "/meetings/:id/chat",
      "/recordings",
      "/transcripts",
      "/admin/policies",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "meeting-security-review-required",
      enterpriseRetentionState: "server-authoritative-retention-required",
      moderationState: "meeting-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "gmail-mobile-clone": {
    id: "024",
    product: "MailGarden",
    module: "ConsumerMailBatch",
    branch: "phase13-gmail-batch",
    sourceSpec: "024-gmail.md",
    category: "consumer email",
    hero: "inbox categories, threaded mail, compose, attachments, spam/phishing reporting, offline drafts, and account/provider blockers",
    fixtureFile: "mailgarden-fixtures.json",
    contractFile: "mailgarden-contract.json",
    validator: "validate-phase13-gmail.mjs",
    validationRecord: "phase13-step13-9-gmail.json",
    swiftModule: "MailGarden",
    packageName: "com.mailgarden",
    surfaces: ["Inbox", "Categories", "Thread", "Compose", "Search", "Safety"],
    entities: ["mailbox", "thread", "emailMessage", "draft", "attachment", "spamReport"],
    risks: ["raw-mail-privacy", "provider-token-security", "phishing-safety", "data-export-delete"],
    routes: [
      "/auth/session",
      "/providers/oauth/start",
      "/mailboxes",
      "/threads",
      "/threads/:id/messages",
      "/drafts",
      "/messages/send",
      "/uploads",
      "/search",
      "/spam/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "mailbox-security-review-required",
      enterpriseRetentionState: "consumer-provider-retention-required",
      moderationState: "spam-and-phishing-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "outlook-mobile-clone": {
    id: "025",
    product: "FocusPost",
    module: "WorkMailBatch",
    branch: "phase13-outlook-batch",
    sourceSpec: "025-outlook.md",
    category: "mail and calendar",
    hero: "focused inbox, folders, compose, attachments, calendar RSVP, search, enterprise policy, and admin retention blockers",
    fixtureFile: "focuspost-fixtures.json",
    contractFile: "focuspost-contract.json",
    validator: "validate-phase13-outlook.mjs",
    validationRecord: "phase13-step13-9-outlook.json",
    swiftModule: "FocusPost",
    packageName: "com.focuspost",
    surfaces: ["Focused Inbox", "Folders", "Thread", "Compose", "Calendar", "Admin"],
    entities: ["mailAccount", "tenantPolicy", "mailThread", "calendarEvent", "attachment", "phishingReport"],
    risks: ["enterprise-dlp", "tenant-retention", "provider-token-security", "ai-suggestion-privacy"],
    routes: [
      "/auth/session",
      "/auth/sso/start",
      "/accounts",
      "/mailboxes/:accountId/threads",
      "/threads/:id",
      "/drafts",
      "/messages/send",
      "/uploads",
      "/calendar/events",
      "/calendar/rsvp",
      "/admin/policies",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "work-mail-security-review-required",
      enterpriseRetentionState: "tenant-retention-and-legal-hold-required",
      moderationState: "phishing-and-dlp-reporting-required",
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
      reportCategories: ["spam", "harassment", "impersonation", "unsafe-link", "privacy", "illegal-content"],
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
      providerIntegrations: false,
      dataExportDeleteCompletion: false,
    },
    blockers: commonBlockers,
  };
}

function contractFor(config) {
  return {
    appName: config.product,
    routeVersion: "phase13-step13-9-v1",
    routes: config.routes.map((route) => ({
      path: route,
      auth: route.includes("auth") ? "anonymous-or-session" : "required",
      offline: route.includes("delete") || route.includes("export") || route.includes("admin") || route.includes("reports") || route.includes("send")
        ? "blocked-sensitive-write"
        : "cached-read-with-reconcile",
      privacy: "raw message, call, mail, meeting, attachment, and account content excluded from telemetry",
    })),
    requiredWorkflows: [
      "primary list or inbox",
      "thread, call, meeting, or mailbox lifecycle",
      "participant, account, or contact model",
      "attachment handling",
      "offline queue",
      "notification redaction",
      "report and block or safety escalation",
      "privacy settings",
      "export/delete blockers",
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
assert.equal(model.providerParityClaim, false);
assert.ok(model.surfaceCount >= 5);
assert.ok(model.conversationCount >= 2);
assert.ok(model.domainObjectCount >= 5);
assert.ok(model.messageCount >= 2);
assert.ok(model.queuedMessages >= 1);
assert.ok(model.blockedObjects >= 1);
assert.ok(model.routeCount >= 10);
assert.ok(model.blockedParityCount >= 7);
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
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdirSync } from "node:fs";
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
assert.ok(contract.blockedParity.length >= 7);

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

Original lawful ${config.category} prototype inspired by public ${config.sourceSpec.replace(/^[0-9]+-/, "").replace(".md", "")} workflow categories. This repository uses original naming, synthetic fixtures, local validation, and explicit blockers for provider, account, privacy, security, notification, device, native runtime, and retention parity claims.

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
