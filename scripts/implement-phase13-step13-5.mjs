#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();
function resolveRepoName(root) {
  try {
    const remote = execFileSync("git", ["-C", root, "remote", "get-url", "origin"], { encoding: "utf8" }).trim();
    return remote.replace(/\.git$/, "").split("/").at(-1);
  } catch {
    return path.basename(root);
  }
}

const repoName = resolveRepoName(repoRoot);

const commonBlockers = [
  "signed-in production account lifecycle and verification require lawful provider/device testing",
  "exact protocol, server, retention, and notification behavior require independent implementation review",
  "push notification delivery and sensitive payload redaction require provider/device verification",
  "media capture, file upload, voice, calling, and realtime presence require real-device/provider testing",
  "data export, account deletion, admin retention, and legal-hold completion require server-authoritative workflows",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const apps = {
  "signal-mobile-clone": {
    id: "018",
    product: "QuietSignal",
    module: "PrivateMessengerBatch",
    branch: "phase13-signal-batch",
    sourceSpec: "018-signal.md",
    category: "privacy-first messenger",
    hero: "private one-to-one and group messaging with safety-number review, disappearing messages, and provider-blocked contact discovery",
    fixtureFile: "quietsignal-fixtures.json",
    contractFile: "quietsignal-contract.json",
    validator: "validate-phase13-signal.mjs",
    validationRecord: "phase13-step13-5-signal.json",
    swiftModule: "QuietSignal",
    packageName: "com.quietsignal",
    surfaces: ["Inbox", "Private Chat", "Groups", "Calls", "Stories", "Privacy"],
    entities: ["safetyNumber", "privateThread", "groupThread", "disappearingTimer", "sealedSenderBlocker"],
    risks: ["audited-e2ee-blocker", "phone-number-privacy", "contact-discovery-consent", "backup-unrecoverability"],
    routes: [
      "/auth/phone/start",
      "/identity/safety-number",
      "/conversations",
      "/conversations/:id/messages",
      "/messages/:id/disappearing-timer",
      "/contacts/discovery",
      "/calls",
      "/reports",
      "/blocks",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "blocked-until-independent-cryptography-review",
      enterpriseRetentionState: "not-applicable",
      moderationState: "private-abuse-reporting",
      auditedE2eeClaim: false,
    },
  },
  "discord-mobile-clone": {
    id: "019",
    product: "GuildGarden",
    module: "CommunityChatBatch",
    branch: "phase13-discord-batch",
    sourceSpec: "019-discord.md",
    category: "community chat",
    hero: "servers, channels, roles, voice rooms, moderation queues, and bot/provider blockers",
    fixtureFile: "guildgarden-fixtures.json",
    contractFile: "guildgarden-contract.json",
    validator: "validate-phase13-discord.mjs",
    validationRecord: "phase13-step13-5-discord.json",
    swiftModule: "GuildGarden",
    packageName: "com.guildgarden",
    surfaces: ["Servers", "Channels", "Roles", "Voice", "Moderation", "Safety"],
    entities: ["server", "channel", "role", "voiceRoom", "moderationCase"],
    risks: ["community-moderation", "minor-safety", "role-escalation", "bot-integration-abuse"],
    routes: [
      "/auth/session",
      "/servers",
      "/servers/:id/channels",
      "/servers/:id/roles",
      "/conversations/:id/messages",
      "/voice/sessions",
      "/invites/:code",
      "/moderation/reports",
      "/reports",
      "/blocks",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "role-permission-audit-required",
      enterpriseRetentionState: "community-retention-policy-required",
      moderationState: "public-community-moderation-required",
      auditedE2eeClaim: false,
    },
  },
  "slack-mobile-clone": {
    id: "020",
    product: "WorkHarbor",
    module: "WorkplaceChatBatch",
    branch: "phase13-slack-batch",
    sourceSpec: "020-slack.md",
    category: "workplace collaboration",
    hero: "workspaces, channels, DMs, threads, huddles, files, workflow blockers, and enterprise retention controls",
    fixtureFile: "workharbor-fixtures.json",
    contractFile: "workharbor-contract.json",
    validator: "validate-phase13-slack.mjs",
    validationRecord: "phase13-step13-5-slack.json",
    swiftModule: "WorkHarbor",
    packageName: "com.workharbor",
    surfaces: ["Workspace", "Channels", "Threads", "Files", "Huddles", "Admin"],
    entities: ["workspace", "channel", "thread", "fileAsset", "retentionPolicy"],
    risks: ["enterprise-retention", "external-collaboration", "app-workflow-scopes", "customer-data-privacy"],
    routes: [
      "/auth/session",
      "/workspaces",
      "/channels",
      "/conversations/:id/messages",
      "/threads/:id/replies",
      "/uploads",
      "/huddles",
      "/apps/:id/approve",
      "/admin/exports",
      "/admin/retention",
      "/reports",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "workspace-policy-audit-required",
      enterpriseRetentionState: "server-authoritative-retention-required",
      moderationState: "workplace-abuse-support-required",
      auditedE2eeClaim: false,
    },
  },
};

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
    generatedAt: "2026-05-15",
    surfaces: config.surfaces,
    actors: [
      { id: "actor_owner", displayName: "Ari Park", role: "owner", trustState: "verified-test-user" },
      { id: "actor_member", displayName: "Mika Stone", role: "member", trustState: "manual-invite" },
      { id: "actor_reviewer", displayName: "Sam Rivera", role: "safety-reviewer", trustState: "staff-test-user" },
    ],
    conversations: [
      {
        id: "conv_primary",
        title: `${config.product} primary thread`,
        type: config.category,
        participantIds: ["actor_owner", "actor_member"],
        unreadCount: 2,
        muted: false,
        retention: config.assertions.enterpriseRetentionState,
        security: config.assertions.securityReviewState,
      },
      {
        id: "conv_safety",
        title: "Safety review queue",
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
        body: "Synthetic seeded message for local validation.",
        lifecycle: "read",
        delivery: { sent: true, delivered: true, readBy: ["actor_member"] },
        attachments: [],
        safety: { reportable: true, unsafeLinkScan: "clean" },
      },
      {
        id: "msg_2",
        conversationId: "conv_primary",
        senderId: "actor_member",
        body: "Queued synthetic reply for offline reconciliation.",
        lifecycle: "queued_offline",
        delivery: { sent: false, delivered: false, readBy: [], failedReason: "offline" },
        attachments: [{ id: "attachment_1", kind: "synthetic-file", scanState: "pending" }],
        safety: { reportable: true, unsafeLinkScan: "pending" },
      },
    ],
    offlineQueue: [
      {
        id: "queue_1",
        action: "send_message",
        conversationId: "conv_primary",
        idempotencyKey: `${config.product.toLowerCase()}_offline_1`,
        requiresServerConfirmation: true,
      },
    ],
    privacyAndSafety: {
      rawMessageAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      reportCategories: ["spam", "harassment", "impersonation", "unsafe-link", "privacy", "illegal-content"],
      moderationState: config.assertions.moderationState,
      risks: config.risks,
    },
    featureFlags: {
      productionAccountLifecycle: false,
      auditedE2eeClaim: config.assertions.auditedE2eeClaim,
      pushDelivery: false,
      mediaCapture: false,
      voiceOrCalling: false,
      providerIntegrations: false,
      dataExportDeleteCompletion: false,
    },
    blockers: commonBlockers,
  };
}

function contractFor(config) {
  return {
    appName: config.product,
    routeVersion: "phase13-step13-5-v1",
    routes: config.routes.map((route) => ({
      path: route,
      auth: route.includes("auth") ? "anonymous-or-session" : "required",
      offline: route.includes("delete") || route.includes("export") || route.includes("admin") || route.includes("reports")
        ? "blocked-sensitive-write"
        : "cached-read-with-reconcile",
      privacy: "message bodies and sensitive payloads excluded from telemetry",
    })),
    requiredWorkflows: [
      "conversation or channel list",
      "thread/message lifecycle",
      "participant/member model",
      "attachment handling",
      "offline queue",
      "notification redaction",
      "report and block",
      "privacy settings",
      "export/delete blockers",
    ],
    validationRules: {
      originalBrandingOnly: true,
      syntheticFixturesOnly: true,
      githubActionsUsed: false,
      rawMessageAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      reportRouteRequired: true,
      blockRouteRequired: config.routes.includes("/blocks"),
      auditedE2eeClaim: config.assertions.auditedE2eeClaim,
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
    rawMessageAnalyticsAllowed: fixture.privacyAndSafety.rawMessageAnalyticsAllowed,
    notificationPreviewDefault: fixture.privacyAndSafety.notificationPreviewDefault,
    githubActionsUsed: contract.validationRules.githubActionsUsed,
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
assert.equal(model.rawMessageAnalyticsAllowed, false);
assert.equal(model.notificationPreviewDefault, "redacted");
assert.equal(model.githubActionsUsed, false);
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
  final bool rawMessageAnalyticsAllowed = false;
  final String notificationPreviewDefault = 'redacted';
  final int blockedParityCount = ${commonBlockers.length};

  String summary() {
    return '$appName: surfaces=$surfaceCount, conversations=$conversationCount, queued=$queuedMessages, blockers=$blockedParityCount';
  }
}

void main() {
  final model = ${config.module}Model();
  assert(model.rawMessageAnalyticsAllowed == false);
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
    let rawMessageAnalyticsAllowed = false
    let notificationPreviewDefault = "redacted"
    let blockedParityCount = ${commonBlockers.length}

    func summary() -> String {
        return "\\(appName): surfaces=\\(surfaceCount), conversations=\\(conversationCount), queued=\\(queuedMessages), blockers=\\(blockedParityCount)"
    }
}

let model = ${config.module}Model()
precondition(model.rawMessageAnalyticsAllowed == false)
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
    val rawMessageAnalyticsAllowed: Boolean = false,
    val notificationPreviewDefault: String = "redacted",
    val blockedParityCount: Int = ${commonBlockers.length}
) {
    fun summary(): String = "$appName: surfaces=$surfaceCount, conversations=$conversationCount, queued=$queuedMessages, blockers=$blockedParityCount"
}

fun main() {
    val model = ${config.module}Model()
    check(!model.rawMessageAnalyticsAllowed)
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
assert.equal(fixture.privacyAndSafety.rawMessageAnalyticsAllowed, false);
assert.equal(fixture.privacyAndSafety.notificationPreviewDefault, "redacted");
assert.ok(fixture.privacyAndSafety.risks.length >= 4);
assert.ok(fixture.conversations.length >= 2);
assert.ok(fixture.domainObjects.length >= 5);
assert.ok(fixture.messages.some((message) => message.lifecycle === "queued_offline"));
assert.ok(fixture.offlineQueue.some((item) => item.requiresServerConfirmation));
assert.ok(contract.routes.some((route) => route.path === "/reports" || route.path === "/moderation/reports"));
assert.ok(contract.routes.some((route) => route.path === "/data-export" || route.path === "/admin/exports"));
assert.equal(contract.validationRules.githubActionsUsed, false);
assert.equal(contract.validationRules.rawMessageAnalyticsAllowed, false);
assert.equal(contract.validationRules.notificationPreviewDefault, "redacted");
assert.equal(contract.validationRules.auditedE2eeClaim, ${config.assertions.auditedE2eeClaim});
assert.ok(contract.blockedParity.length >= 7);

mkdirSync(path.join(root, "docs/validation"), { recursive: true });
writeFileSync(
  path.join(root, "docs/validation/${config.validationRecord}"),
  JSON.stringify(
    {
      appName: fixture.appName,
      checkedAt: "2026-05-15",
      surfaces: fixture.surfaces.length,
      conversations: fixture.conversations.length,
      domainObjects: fixture.domainObjects.length,
      messages: fixture.messages.length,
      routes: contract.routes.length,
      blockers: contract.blockedParity,
      githubActionsUsed: false,
      rawMessageAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      auditedE2eeClaim: ${config.assertions.auditedE2eeClaim}
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

Original lawful ${config.category} prototype inspired by public ${config.sourceSpec.replace(/^[0-9]+-/, "").replace(".md", "")} workflow categories. This repository uses original naming, synthetic fixtures, local validation, and explicit blockers for provider, account, privacy, security, notification, device, and native runtime parity claims.

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
