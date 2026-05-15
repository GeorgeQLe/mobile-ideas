#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();
const product = "CloudCourier";
const moduleName = "CloudMessengerPilot";

const blockers = [
  "phone-number account lifecycle and SMS or voice verification require lawful provider/device testing",
  "exact Telegram protocol/server behavior and cloud sync semantics require independent architecture and review",
  "secret-chat cryptography guarantees require independent security design, implementation, and audit",
  "push notification delivery and sensitive payload redaction require provider/device verification",
  "contact discovery and address-book permission behavior require real-device consent testing",
  "bot platform, bot payments, stories, calls, premium limits, public discovery, export, and account deletion remain provider-blocked",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const fixture = {
  appName: product,
  inspirationScope: "lawful cloud messaging prototype",
  heroWorkflow: "cloud-synced chats, folders, groups, channels, saved messages, bot disclosure, secret-chat blockers, and privacy controls",
  generatedAt: "2026-05-15",
  users: [
    {
      id: "u_nia",
      displayName: "Nia Torres",
      username: "nia.test",
      phoneHash: "phone_hash_nia",
      trustLevel: "verified-test-contact",
      privacy: { phoneVisibility: "contacts", lastSeen: "contacts", profilePhoto: "contacts" },
    },
    {
      id: "u_omar",
      displayName: "Omar Chen",
      username: "omar.cloud",
      phoneHash: "phone_hash_omar",
      trustLevel: "manual-invite",
      privacy: { phoneVisibility: "nobody", lastSeen: "nobody", profilePhoto: "contacts" },
    },
    {
      id: "bot_updates",
      displayName: "Updates Bot",
      username: "updates.bot",
      phoneHash: null,
      trustLevel: "third-party-bot-disclosed",
      privacy: { phoneVisibility: "not-applicable", lastSeen: "bot-managed", profilePhoto: "public-bot" },
    },
  ],
  folders: [
    { id: "f_all", title: "All Chats", includedTypes: ["one_to_one", "group", "channel", "saved_messages", "bot"], unreadCount: 7 },
    { id: "f_channels", title: "Channels", includedTypes: ["channel"], unreadCount: 4 },
  ],
  conversations: [
    {
      id: "c_sync",
      type: "one_to_one",
      title: "Omar Chen",
      participantIds: ["u_nia", "u_omar"],
      unreadCount: 1,
      pinned: true,
      muted: false,
      syncPolicy: "cloud-synced",
      encryption: { mode: "cloud-chat", state: "transport-and-storage-design-not-protocol-parity" },
      retention: { deleteForBothSupported: true, exportBlockedUntilServerConfirmation: true },
    },
    {
      id: "c_builders",
      type: "group",
      title: "Builder Circle",
      participantIds: ["u_nia", "u_omar"],
      unreadCount: 2,
      pinned: false,
      muted: false,
      syncPolicy: "cloud-synced",
      adminControls: { topics: true, slowModeSeconds: 30, inviteLinks: "review-required" },
      encryption: { mode: "cloud-chat", state: "transport-and-storage-design-not-protocol-parity" },
      retention: { deleteForBothSupported: true, exportBlockedUntilServerConfirmation: true },
    },
    {
      id: "c_release_notes",
      type: "channel",
      title: "Release Notes",
      participantIds: ["u_nia"],
      unreadCount: 4,
      pinned: false,
      muted: true,
      syncPolicy: "cloud-synced-broadcast",
      channelState: { adminPosting: true, commentsLinked: false, boostBlocked: true, publicDiscoveryBlocked: true },
      encryption: { mode: "cloud-chat", state: "broadcast-content-not-private-chat" },
      retention: { deleteForBothSupported: false, exportBlockedUntilServerConfirmation: true },
    },
    {
      id: "c_saved",
      type: "saved_messages",
      title: "Saved Messages",
      participantIds: ["u_nia"],
      unreadCount: 0,
      pinned: true,
      muted: false,
      syncPolicy: "cloud-synced-private-storage",
      encryption: { mode: "cloud-chat", state: "private-storage-design-not-secret-chat" },
      retention: { deleteForBothSupported: false, exportBlockedUntilServerConfirmation: true },
    },
    {
      id: "c_secret_blocked",
      type: "secret_chat_placeholder",
      title: "Secret chat pending security review",
      participantIds: ["u_nia", "u_omar"],
      unreadCount: 0,
      pinned: false,
      muted: true,
      syncPolicy: "launch-blocked-local-only",
      encryption: { mode: "secret-chat-style", state: "blocked-until-independent-cryptography-review" },
      retention: { selfDestructTimerSeconds: 60, serverRecovery: false, launchBlocked: true },
    },
  ],
  messages: [
    {
      id: "m_2001",
      conversationId: "c_sync",
      senderId: "u_omar",
      body: "Synthetic cloud chat message",
      lifecycle: "read",
      delivery: { sent: true, delivered: true, readBy: ["u_nia"], failedReason: null },
      editState: "editable",
      deleteState: "delete-for-both-available",
      attachments: [],
      safety: { reportable: true, unsafeLinkScan: "clean" },
    },
    {
      id: "m_2002",
      conversationId: "c_builders",
      senderId: "u_nia",
      body: "Synthetic group poll placeholder",
      lifecycle: "delivered",
      delivery: { sent: true, delivered: true, readBy: [], failedReason: null },
      editState: "editable",
      deleteState: "admin-policy-controlled",
      attachments: [{ id: "poll_1", kind: "poll", syntheticOnly: true, scanState: "not-applicable" }],
      safety: { reportable: true, unsafeLinkScan: "not-applicable" },
    },
    {
      id: "m_2003",
      conversationId: "c_release_notes",
      senderId: "u_nia",
      body: "Synthetic channel broadcast",
      lifecycle: "delivered",
      delivery: { sent: true, delivered: true, readBy: [], failedReason: null },
      editState: "admin-editable",
      deleteState: "channel-admin-delete",
      attachments: [],
      safety: { reportable: true, unsafeLinkScan: "clean" },
    },
    {
      id: "m_2004",
      conversationId: "c_sync",
      senderId: "u_nia",
      body: "Queued offline cloud reply",
      lifecycle: "queued_offline",
      delivery: { sent: false, delivered: false, readBy: [], failedReason: "offline" },
      editState: "not-sent",
      deleteState: "local-discard-only",
      attachments: [],
      safety: { reportable: true, unsafeLinkScan: "pending" },
    },
  ],
  offlineQueue: [
    {
      id: "q_cloud_1",
      action: "send_cloud_message",
      conversationId: "c_sync",
      idempotencyKey: "idem_cloud_reply_1",
      retryPolicy: "network-only",
      requiresServerConfirmation: true,
    },
    {
      id: "q_reaction_1",
      action: "add_reaction",
      conversationId: "c_builders",
      idempotencyKey: "idem_group_reaction_1",
      retryPolicy: "low-risk-retry",
      requiresServerConfirmation: true,
    },
  ],
  privacyAndSafety: {
    contactDiscovery: "permission-gated-consented-hashes-only",
    notificationPreviewDefault: "redacted",
    botDisclosureRequired: true,
    secretChatLaunchState: "blocked-until-security-review",
    reportCategories: ["spam", "scam", "harassment", "impersonation", "unsafe-link", "illegal-public-content", "bot-abuse"],
    rawMessageAnalyticsAllowed: false,
  },
  featureFlags: {
    realPhoneVerification: false,
    auditedSecretChatCryptography: false,
    telegramProtocolParity: false,
    pushDelivery: false,
    contactUpload: false,
    botPlatform: false,
    calls: false,
    stories: false,
    premiumEntitlements: false,
    publicDiscovery: false,
    accountExportDelete: false,
  },
  blockers,
};

const contract = {
  appName: product,
  routeVersion: "phase13-step13-4-v1",
  routes: [
    { path: "/auth/phone/start", auth: "anonymous", offline: "blocked", privacy: "phone hashes only in tests" },
    { path: "/auth/phone/verify", auth: "anonymous", offline: "blocked", privacy: "provider verification blocked" },
    { path: "/contacts/sync", auth: "required", offline: "blocked-sensitive-write", privacy: "consented hashed contacts only" },
    { path: "/folders", auth: "required", offline: "cached-read-with-reconcile", privacy: "folder metadata only" },
    { path: "/conversations", auth: "required", offline: "cached-read-with-reconcile", privacy: "no raw message analytics" },
    { path: "/conversations/:id/messages", auth: "required", offline: "queued-with-idempotency", privacy: "message body excluded from telemetry" },
    { path: "/messages/:id/edit", auth: "required", offline: "blocked-until-server-confirmed", privacy: "message body excluded from telemetry" },
    { path: "/messages/:id/delete", auth: "required", offline: "queued-sensitive-write", privacy: "delete-for-both requires server confirmation" },
    { path: "/secret-conversations/start", auth: "required", offline: "launch-blocked", privacy: "blocked until cryptography review" },
    { path: "/groups/:id/admin", auth: "required", offline: "blocked-sensitive-write", privacy: "admin audit event only" },
    { path: "/channels/:id/posts", auth: "required", offline: "blocked-sensitive-write", privacy: "public/broadcast safety review required" },
    { path: "/bots/:id/commands", auth: "required", offline: "blocked-provider", privacy: "bot disclosure and revocation required" },
    { path: "/calls", auth: "required", offline: "blocked-provider", privacy: "call content never logged" },
    { path: "/stories", auth: "required", offline: "blocked-provider", privacy: "audience-scoped ephemeral content" },
    { path: "/reports", auth: "required", offline: "blocked-sensitive-write", privacy: "minimal evidence snapshot policy" },
    { path: "/blocks", auth: "required", offline: "blocked-sensitive-write", privacy: "local block list mirrors server after confirmation" },
    { path: "/settings/privacy", auth: "required", offline: "cached-read-server-confirm-write", privacy: "privacy-safe toggles only" },
    { path: "/data-export", auth: "required", offline: "blocked", privacy: "server-confirmed lifecycle required" },
    { path: "/account/delete", auth: "required", offline: "blocked", privacy: "server-confirmed lifecycle required" },
  ],
  validationRules: {
    originalBrandingOnly: true,
    syntheticFixturesOnly: true,
    githubActionsUsed: false,
    rawMessageAnalyticsAllowed: false,
    telegramProtocolParityClaim: false,
    auditedSecretChatClaim: false,
    reportAndBlockRequired: true,
    offlineQueueRequired: true,
    botDisclosureRequired: true,
    notificationPreviewDefault: "redacted",
  },
  blockedParity: blockers,
};

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function reactApp() {
  return `import { readFileSync } from "node:fs";

const fixture = JSON.parse(
  readFileSync(new URL("../../shared/test-fixtures/cloudcourier-fixtures.json", import.meta.url), "utf8")
);
const contract = JSON.parse(
  readFileSync(new URL("../../shared/api-contracts/cloudcourier-contract.json", import.meta.url), "utf8")
);

export function build${moduleName}Model() {
  const unreadTotal = fixture.conversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
  const queued = fixture.messages.filter((message) => message.lifecycle === "queued_offline").length;
  const secretBlocked = fixture.conversations.filter((conversation) => conversation.type === "secret_chat_placeholder" && conversation.retention.launchBlocked);
  const botRoutes = contract.routes.filter((route) => route.path.includes("/bots/"));
  return {
    appName: fixture.appName,
    folderCount: fixture.folders.length,
    conversationCount: fixture.conversations.length,
    messageCount: fixture.messages.length,
    unreadTotal,
    queuedMessages: queued,
    secretChatBlockedCount: secretBlocked.length,
    botRouteCount: botRoutes.length,
    encryptionStates: [...new Set(fixture.conversations.map((conversation) => conversation.encryption.state))],
    rawMessageAnalyticsAllowed: fixture.privacyAndSafety.rawMessageAnalyticsAllowed,
    notificationPreviewDefault: fixture.privacyAndSafety.notificationPreviewDefault,
    blockedParityCount: contract.blockedParity.length,
  };
}

export function render${moduleName}Summary() {
  const model = build${moduleName}Model();
  return \`\${model.appName}: folders=\${model.folderCount}, conversations=\${model.conversationCount}, queued=\${model.queuedMessages}, secretBlocked=\${model.secretChatBlockedCount}, blockers=\${model.blockedParityCount}\`;
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  console.log(render${moduleName}Summary());
}
`;
}

function reactTest() {
  return `import assert from "node:assert/strict";
import { build${moduleName}Model, render${moduleName}Summary } from "./app.mjs";

const model = build${moduleName}Model();
assert.equal(model.appName, "${product}");
assert.equal(model.rawMessageAnalyticsAllowed, false);
assert.equal(model.notificationPreviewDefault, "redacted");
assert.ok(model.folderCount >= 2);
assert.ok(model.conversationCount >= 5);
assert.ok(model.messageCount >= 4);
assert.ok(model.queuedMessages >= 1);
assert.ok(model.secretChatBlockedCount >= 1);
assert.ok(model.botRouteCount >= 1);
assert.ok(model.encryptionStates.includes("blocked-until-independent-cryptography-review"));
assert.ok(model.blockedParityCount >= 8);
assert.match(render${moduleName}Summary(), /secretBlocked=/);
console.log(render${moduleName}Summary());
`;
}

function flutterMain() {
  return `class ${moduleName}Model {
  final String appName = '${product}';
  final int folderCount = ${fixture.folders.length};
  final int conversationCount = ${fixture.conversations.length};
  final int messageCount = ${fixture.messages.length};
  final int queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length};
  final int secretChatBlockedCount = ${fixture.conversations.filter((conversation) => conversation.type === "secret_chat_placeholder").length};
  final bool rawMessageAnalyticsAllowed = false;
  final String secretChatState = 'blocked-until-independent-cryptography-review';
  final int blockedParityCount = ${blockers.length};

  String summary() {
    return '$appName: folders=$folderCount, conversations=$conversationCount, queued=$queuedMessages, secretBlocked=$secretChatBlockedCount, blockers=$blockedParityCount';
  }
}

void main() {
  final model = ${moduleName}Model();
  assert(model.rawMessageAnalyticsAllowed == false);
  assert(model.secretChatState == 'blocked-until-independent-cryptography-review');
  print(model.summary());
}
`;
}

function swiftMain() {
  return `import Foundation

struct ${moduleName}Model {
    let appName = "${product}"
    let folderCount = ${fixture.folders.length}
    let conversationCount = ${fixture.conversations.length}
    let messageCount = ${fixture.messages.length}
    let queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length}
    let secretChatBlockedCount = ${fixture.conversations.filter((conversation) => conversation.type === "secret_chat_placeholder").length}
    let rawMessageAnalyticsAllowed = false
    let secretChatState = "blocked-until-independent-cryptography-review"
    let blockedParityCount = ${blockers.length}

    func summary() -> String {
        return "\\(appName): folders=\\(folderCount), conversations=\\(conversationCount), queued=\\(queuedMessages), secretBlocked=\\(secretChatBlockedCount), blockers=\\(blockedParityCount)"
    }
}

let model = ${moduleName}Model()
precondition(model.rawMessageAnalyticsAllowed == false)
precondition(model.secretChatState == "blocked-until-independent-cryptography-review")
print(model.summary())
`;
}

function kotlinMain() {
  return `data class ${moduleName}Model(
    val appName: String = "${product}",
    val folderCount: Int = ${fixture.folders.length},
    val conversationCount: Int = ${fixture.conversations.length},
    val messageCount: Int = ${fixture.messages.length},
    val queuedMessages: Int = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length},
    val secretChatBlockedCount: Int = ${fixture.conversations.filter((conversation) => conversation.type === "secret_chat_placeholder").length},
    val rawMessageAnalyticsAllowed: Boolean = false,
    val secretChatState: String = "blocked-until-independent-cryptography-review",
    val blockedParityCount: Int = ${blockers.length}
) {
    fun summary(): String = "$appName: folders=$folderCount, conversations=$conversationCount, queued=$queuedMessages, secretBlocked=$secretChatBlockedCount, blockers=$blockedParityCount"
}

fun main() {
    val model = ${moduleName}Model()
    check(!model.rawMessageAnalyticsAllowed)
    check(model.secretChatState == "blocked-until-independent-cryptography-review")
    println(model.summary())
}
`;
}

function packageJson() {
  return json({
    scripts: {
      validate: "node scripts/validate-phase13-telegram.mjs",
      "test:react-native": "node variants/react-native/app.test.mjs",
      "test:expo": "node variants/expo/app.test.mjs",
    },
    type: "module",
  });
}

function validator() {
  return `import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixture = JSON.parse(readFileSync(path.join(root, "shared/test-fixtures/cloudcourier-fixtures.json"), "utf8"));
const contract = JSON.parse(readFileSync(path.join(root, "shared/api-contracts/cloudcourier-contract.json"), "utf8"));

for (const required of [
  "variants/react-native/app.mjs",
  "variants/react-native/app.test.mjs",
  "variants/expo/app.mjs",
  "variants/expo/app.test.mjs",
  "variants/flutter/lib/main.dart",
  "variants/ios-native/Sources/CloudCourier/main.swift",
  "variants/android-native/app/src/main/kotlin/com/cloudcourier/Main.kt",
]) {
  assert.ok(existsSync(path.join(root, required)), \`missing \${required}\`);
}

assert.equal(fixture.appName, "${product}");
assert.equal(fixture.privacyAndSafety.rawMessageAnalyticsAllowed, false);
assert.equal(fixture.privacyAndSafety.notificationPreviewDefault, "redacted");
assert.equal(fixture.privacyAndSafety.secretChatLaunchState, "blocked-until-security-review");
assert.ok(fixture.conversations.some((conversation) => conversation.type === "channel"));
assert.ok(fixture.conversations.some((conversation) => conversation.type === "saved_messages"));
assert.ok(fixture.conversations.some((conversation) => conversation.type === "secret_chat_placeholder" && conversation.retention.launchBlocked));
assert.ok(fixture.messages.some((message) => message.lifecycle === "queued_offline"));
assert.ok(contract.routes.some((route) => route.path === "/secret-conversations/start"));
assert.ok(contract.routes.some((route) => route.path === "/bots/:id/commands"));
assert.ok(contract.routes.some((route) => route.path === "/reports"));
assert.ok(contract.routes.some((route) => route.path === "/blocks"));
assert.equal(contract.validationRules.githubActionsUsed, false);
assert.equal(contract.validationRules.telegramProtocolParityClaim, false);
assert.equal(contract.validationRules.auditedSecretChatClaim, false);
assert.equal(contract.validationRules.botDisclosureRequired, true);
assert.ok(contract.blockedParity.length >= 8);

mkdirSync(path.join(root, "docs/validation"), { recursive: true });
writeFileSync(
  path.join(root, "docs/validation/phase13-step13-4.json"),
  JSON.stringify(
    {
      appName: fixture.appName,
      checkedAt: "2026-05-15",
      folders: fixture.folders.length,
      conversations: fixture.conversations.length,
      messages: fixture.messages.length,
      routes: contract.routes.length,
      blockers: contract.blockedParity,
      githubActionsUsed: false,
      rawMessageAnalyticsAllowed: false,
      telegramProtocolParityClaim: false,
      auditedSecretChatClaim: false
    },
    null,
    2
  ) + "\\n"
);

console.log(\`validated \${fixture.appName}: folders=\${fixture.folders.length}, conversations=\${fixture.conversations.length}, messages=\${fixture.messages.length}, routes=\${contract.routes.length}, blockers=\${contract.blockedParity.length}\`);
`;
}

function readme() {
  return `# ${product} Phase 13 Pilot

Original lawful cloud-messaging prototype inspired by public Telegram workflow categories. This repository uses original naming, synthetic fixtures, and explicit blockers for account, provider, protocol, cryptography, device, bot, call, story, premium, and native parity claims.

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

await write("README.md", readme());
await write("package.json", packageJson());
await write("shared/test-fixtures/cloudcourier-fixtures.json", json(fixture));
await write("shared/api-contracts/cloudcourier-contract.json", json(contract));
await write("variants/react-native/app.mjs", reactApp());
await write("variants/react-native/app.test.mjs", reactTest());
await write("variants/expo/app.mjs", reactApp());
await write("variants/expo/app.test.mjs", reactTest());
await write("variants/flutter/lib/main.dart", flutterMain());
await write("variants/ios-native/Sources/CloudCourier/main.swift", swiftMain());
await write("variants/android-native/app/src/main/kotlin/com/cloudcourier/Main.kt", kotlinMain());
await write("scripts/validate-phase13-telegram.mjs", validator());

console.log(`Implemented ${product} pilot files in ${repoRoot}`);
