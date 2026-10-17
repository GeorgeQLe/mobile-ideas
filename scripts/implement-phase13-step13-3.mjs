#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.argv[2] ?? process.cwd();
const product = "HarborChat";
const moduleName = "PrivateMessengerPilot";

const blockers = [
  "phone-number and SMS or voice verification require lawful provider/device testing",
  "exact end-to-end encryption protocol guarantees require independent cryptography design and review",
  "push notification delivery and sensitive payload redaction require provider/device verification",
  "contact discovery and address-book permission behavior require real-device consent testing",
  "media capture, backup provider integration, export/delete completion, linked-device sync, and account recovery remain blocked",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const fixture = {
  appName: product,
  inspirationScope: "lawful private messaging prototype",
  heroWorkflow: "privacy-forward chats with synthetic contacts, receipts, attachments, reporting, and explicit encryption blockers",
  generatedAt: "2026-05-15",
  users: [
    {
      id: "u_alex",
      displayName: "Alex Rivera",
      phoneHash: "phone_hash_alex",
      trustLevel: "verified-test-contact",
      safetyState: "normal",
      privacy: { readReceipts: true, lastSeen: "contacts", profilePhoto: "contacts" },
    },
    {
      id: "u_mina",
      displayName: "Mina Patel",
      phoneHash: "phone_hash_mina",
      trustLevel: "imported-with-consent",
      safetyState: "normal",
      privacy: { readReceipts: false, lastSeen: "nobody", profilePhoto: "contacts" },
    },
    {
      id: "u_sam",
      displayName: "Sam Okafor",
      phoneHash: "phone_hash_sam",
      trustLevel: "manual-invite",
      safetyState: "blocked-by-user",
      privacy: { readReceipts: false, lastSeen: "nobody", profilePhoto: "nobody" },
    },
  ],
  conversations: [
    {
      id: "c_family",
      type: "group",
      title: "Family Harbor",
      participantIds: ["u_alex", "u_mina"],
      unreadCount: 2,
      pinned: true,
      muted: false,
      locked: false,
      disappearingMessages: { enabled: true, durationHours: 24 },
      encryption: {
        label: "Private by design",
        state: "design-goal-not-audited-e2ee",
        securityCodeVerified: false,
      },
      retention: { localCache: "recent-only", exportBlockedUntilServerConfirmation: true },
    },
    {
      id: "c_support",
      type: "one_to_one",
      title: "Mina Patel",
      participantIds: ["u_mina"],
      unreadCount: 0,
      pinned: false,
      muted: true,
      locked: true,
      disappearingMessages: { enabled: false, durationHours: null },
      encryption: {
        label: "Private by design",
        state: "design-goal-not-audited-e2ee",
        securityCodeVerified: true,
      },
      retention: { localCache: "locked-thread", exportBlockedUntilServerConfirmation: true },
    },
  ],
  messages: [
    {
      id: "m_1001",
      conversationId: "c_family",
      senderId: "u_alex",
      body: "Synthetic dinner plan message",
      lifecycle: "read",
      delivery: { sent: true, delivered: true, readBy: ["u_mina"], failedReason: null },
      attachments: [],
      reactions: [{ userId: "u_mina", emoji: "thumbs-up" }],
      safety: { reportable: true, unsafeLinkScan: "clean" },
    },
    {
      id: "m_1002",
      conversationId: "c_family",
      senderId: "u_mina",
      body: "Synthetic attachment placeholder",
      lifecycle: "delivered",
      delivery: { sent: true, delivered: true, readBy: [], failedReason: null },
      attachments: [
        {
          id: "a_photo_1",
          kind: "image",
          syntheticOnly: true,
          scanState: "clean",
          sizeLimitState: "within-limit",
        },
      ],
      reactions: [],
      safety: { reportable: true, unsafeLinkScan: "not-applicable" },
    },
    {
      id: "m_1003",
      conversationId: "c_support",
      senderId: "u_alex",
      body: "Queued offline reply",
      lifecycle: "queued_offline",
      delivery: { sent: false, delivered: false, readBy: [], failedReason: "offline" },
      attachments: [],
      reactions: [],
      safety: { reportable: true, unsafeLinkScan: "pending" },
    },
  ],
  offlineQueue: [
    {
      id: "q_1",
      action: "send_message",
      conversationId: "c_support",
      idempotencyKey: "idem_support_reply_1",
      retryPolicy: "network-only",
      requiresServerConfirmation: true,
    },
  ],
  privacyAndSafety: {
    contactDiscovery: "permission-gated-consented-hashes-only",
    notificationPreviewDefault: "redacted",
    unknownCallerHandling: "silence-and-review",
    reportCategories: ["spam", "scam", "harassment", "impersonation", "unsafe-link"],
    blockStateStoredLocally: true,
    rawMessageAnalyticsAllowed: false,
  },
  featureFlags: {
    realPhoneVerification: false,
    auditedEndToEndEncryption: false,
    pushDelivery: false,
    contactUpload: false,
    backupRestore: false,
    accountExportDelete: false,
    businessMessaging: false,
    payments: false,
  },
  blockers,
};

const contract = {
  appName: product,
  routeVersion: "phase13-step13-3-v1",
  routes: [
    { path: "/auth/phone/start", auth: "anonymous", offline: "blocked", privacy: "phone hashes only in tests" },
    { path: "/auth/phone/verify", auth: "anonymous", offline: "blocked", privacy: "provider verification blocked" },
    { path: "/contacts/sync", auth: "required", offline: "blocked-sensitive-write", privacy: "consented hashed contacts only" },
    { path: "/conversations", auth: "required", offline: "cached-read-with-reconcile", privacy: "no raw message analytics" },
    { path: "/conversations/:id/messages", auth: "required", offline: "queued-with-idempotency", privacy: "message body excluded from telemetry" },
    { path: "/messages/:id/reactions", auth: "required", offline: "queued-low-risk", privacy: "coarse event telemetry only" },
    { path: "/uploads", auth: "required", offline: "intent-queued-content-blocked", privacy: "synthetic fixtures only" },
    { path: "/reports", auth: "required", offline: "blocked-sensitive-write", privacy: "minimal evidence snapshot policy" },
    { path: "/blocks", auth: "required", offline: "blocked-sensitive-write", privacy: "local block list mirrors server after confirmation" },
    { path: "/settings/privacy", auth: "required", offline: "cached-read-server-confirm-write", privacy: "privacy-safe toggles only" },
    { path: "/backups/restore", auth: "required", offline: "blocked", privacy: "provider and encrypted backup blocked" },
    { path: "/account/delete", auth: "required", offline: "blocked", privacy: "server-confirmed lifecycle required" },
  ],
  validationRules: {
    originalBrandingOnly: true,
    syntheticFixturesOnly: true,
    githubActionsUsed: false,
    rawMessageAnalyticsAllowed: false,
    auditedEndToEndEncryptionClaim: false,
    reportAndBlockRequired: true,
    offlineQueueRequired: true,
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
  readFileSync(new URL("../../shared/test-fixtures/harborchat-fixtures.json", import.meta.url), "utf8")
);
const contract = JSON.parse(
  readFileSync(new URL("../../shared/api-contracts/harborchat-contract.json", import.meta.url), "utf8")
);

export function build${moduleName}Model() {
  const unreadTotal = fixture.conversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
  const queued = fixture.messages.filter((message) => message.lifecycle === "queued_offline").length;
  const reportRoutes = contract.routes.filter((route) => route.path.includes("reports") || route.path.includes("blocks"));
  return {
    appName: fixture.appName,
    conversationCount: fixture.conversations.length,
    messageCount: fixture.messages.length,
    unreadTotal,
    queuedMessages: queued,
    reportRouteCount: reportRoutes.length,
    encryptionStates: [...new Set(fixture.conversations.map((conversation) => conversation.encryption.state))],
    rawMessageAnalyticsAllowed: fixture.privacyAndSafety.rawMessageAnalyticsAllowed,
    notificationPreviewDefault: fixture.privacyAndSafety.notificationPreviewDefault,
    blockedParityCount: contract.blockedParity.length,
  };
}

export function render${moduleName}Summary() {
  const model = build${moduleName}Model();
  return \`\${model.appName}: conversations=\${model.conversationCount}, messages=\${model.messageCount}, queued=\${model.queuedMessages}, blockers=\${model.blockedParityCount}\`;
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
assert.ok(model.conversationCount >= 2);
assert.ok(model.messageCount >= 3);
assert.ok(model.queuedMessages >= 1);
assert.ok(model.reportRouteCount >= 2);
assert.ok(model.encryptionStates.includes("design-goal-not-audited-e2ee"));
assert.ok(model.blockedParityCount >= 7);
assert.match(render${moduleName}Summary(), /blockers=/);
console.log(render${moduleName}Summary());
`;
}

function flutterMain() {
  return `class ${moduleName}Model {
  final String appName = '${product}';
  final int conversationCount = ${fixture.conversations.length};
  final int messageCount = ${fixture.messages.length};
  final int queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length};
  final bool rawMessageAnalyticsAllowed = false;
  final String encryptionState = 'design-goal-not-audited-e2ee';
  final int blockedParityCount = ${blockers.length};

  String summary() {
    return '$appName: conversations=$conversationCount, messages=$messageCount, queued=$queuedMessages, blockers=$blockedParityCount';
  }
}

void main() {
  final model = ${moduleName}Model();
  assert(model.rawMessageAnalyticsAllowed == false);
  assert(model.encryptionState == 'design-goal-not-audited-e2ee');
  print(model.summary());
}
`;
}

function swiftMain() {
  return `import Foundation

struct ${moduleName}Model {
    let appName = "${product}"
    let conversationCount = ${fixture.conversations.length}
    let messageCount = ${fixture.messages.length}
    let queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length}
    let rawMessageAnalyticsAllowed = false
    let encryptionState = "design-goal-not-audited-e2ee"
    let blockedParityCount = ${blockers.length}

    func summary() -> String {
        return "\\(appName): conversations=\\(conversationCount), messages=\\(messageCount), queued=\\(queuedMessages), blockers=\\(blockedParityCount)"
    }
}

let model = ${moduleName}Model()
precondition(model.rawMessageAnalyticsAllowed == false)
precondition(model.encryptionState == "design-goal-not-audited-e2ee")
print(model.summary())
`;
}

function kotlinMain() {
  return `data class ${moduleName}Model(
    val appName: String = "${product}",
    val conversationCount: Int = ${fixture.conversations.length},
    val messageCount: Int = ${fixture.messages.length},
    val queuedMessages: Int = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length},
    val rawMessageAnalyticsAllowed: Boolean = false,
    val encryptionState: String = "design-goal-not-audited-e2ee",
    val blockedParityCount: Int = ${blockers.length}
) {
    fun summary(): String = "$appName: conversations=$conversationCount, messages=$messageCount, queued=$queuedMessages, blockers=$blockedParityCount"
}

fun main() {
    val model = ${moduleName}Model()
    check(!model.rawMessageAnalyticsAllowed)
    check(model.encryptionState == "design-goal-not-audited-e2ee")
    println(model.summary())
}
`;
}

function packageJson() {
  return json({
    scripts: {
      validate: "node scripts/validate-phase13-whatsapp.mjs",
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
const fixture = JSON.parse(readFileSync(path.join(root, "shared/test-fixtures/harborchat-fixtures.json"), "utf8"));
const contract = JSON.parse(readFileSync(path.join(root, "shared/api-contracts/harborchat-contract.json"), "utf8"));

for (const required of [
  "variants/react-native/app.mjs",
  "variants/react-native/app.test.mjs",
  "variants/expo/app.mjs",
  "variants/expo/app.test.mjs",
  "variants/flutter/lib/main.dart",
  "variants/ios-native/Sources/HarborChat/main.swift",
  "variants/android-native/app/src/main/kotlin/com/harborchat/Main.kt",
]) {
  assert.ok(existsSync(path.join(root, required)), \`missing \${required}\`);
}

assert.equal(fixture.appName, "${product}");
assert.equal(fixture.privacyAndSafety.rawMessageAnalyticsAllowed, false);
assert.equal(fixture.privacyAndSafety.notificationPreviewDefault, "redacted");
assert.ok(fixture.conversations.some((conversation) => conversation.encryption.state === "design-goal-not-audited-e2ee"));
assert.ok(fixture.messages.some((message) => message.lifecycle === "queued_offline"));
assert.ok(contract.routes.some((route) => route.path === "/reports"));
assert.ok(contract.routes.some((route) => route.path === "/blocks"));
assert.equal(contract.validationRules.githubActionsUsed, false);
assert.equal(contract.validationRules.auditedEndToEndEncryptionClaim, false);
assert.ok(contract.blockedParity.length >= 7);

mkdirSync(path.join(root, "docs/validation"), { recursive: true });
writeFileSync(
  path.join(root, "docs/validation/phase13-step13-3.json"),
  JSON.stringify(
    {
      appName: fixture.appName,
      checkedAt: "2026-05-15",
      conversations: fixture.conversations.length,
      messages: fixture.messages.length,
      routes: contract.routes.length,
      blockers: contract.blockedParity,
      githubActionsUsed: false,
      rawMessageAnalyticsAllowed: false,
      auditedEndToEndEncryptionClaim: false
    },
    null,
    2
  ) + "\\n"
);

console.log(\`validated \${fixture.appName}: conversations=\${fixture.conversations.length}, messages=\${fixture.messages.length}, routes=\${contract.routes.length}, blockers=\${contract.blockedParity.length}\`);
`;
}

function readme() {
  return `# ${product} Phase 13 Pilot

Original lawful private-messaging prototype inspired by public WhatsApp workflow categories. This repository uses original naming, synthetic fixtures, and explicit blockers for account, provider, cryptography, device, and native parity claims.

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
await write("shared/test-fixtures/harborchat-fixtures.json", json(fixture));
await write("shared/api-contracts/harborchat-contract.json", json(contract));
await write("variants/react-native/app.mjs", reactApp());
await write("variants/react-native/app.test.mjs", reactTest());
await write("variants/expo/app.mjs", reactApp());
await write("variants/expo/app.test.mjs", reactTest());
await write("variants/flutter/lib/main.dart", flutterMain());
await write("variants/ios-native/Sources/HarborChat/main.swift", swiftMain());
await write("variants/android-native/app/src/main/kotlin/com/harborchat/Main.kt", kotlinMain());
await write("scripts/validate-phase13-whatsapp.mjs", validator());

console.log(`Implemented ${product} pilot files in ${repoRoot}`);
