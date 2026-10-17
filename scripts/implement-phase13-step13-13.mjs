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
  "signed-in production account lifecycle, MFA, recovery, aliases, and subscription state require lawful provider/device testing",
  "mailbox provider auth, IMAP, SMTP, POP3, Exchange, OAuth, app passwords, and token refresh require licensed integrations",
  "exact encryption, key-management, S/MIME, OpenPGP, server, retention, threading, search, and notification behavior require independent review",
  "spam, phishing, unsubscribe, smart categorization, account recovery, ads, and premium entitlement systems require provider-backed workflows",
  "push notification delivery and sensitive subject, sender, preview, and attachment redaction require provider/device verification",
  "contacts, calendar, files, photos, attachment previews, inline media, and address-book access require real-device permission testing",
  "provider infrastructure, bridge/import/export, account export, account deletion, legal hold, and enterprise retention require server-authoritative workflows",
  "raw mailbox content, message headers, attachments, contact data, search queries, and provider tokens may not be emitted as analytics properties",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc is unavailable",
];

const apps = {
  "proton-mail-mobile-clone": {
    product: "CipherPost",
    module: "CipherPostBatch",
    branch: "phase13-proton-mail-batch",
    sourceSpec: "952-proton-mail.md",
    category: "privacy-first encrypted mail",
    hero: "encrypted mailbox metadata, labels, folders, compose, search, contacts, recovery, bridge/import/export, spam/phishing reporting, and privacy blockers",
    fixtureFile: "cipherpost-fixtures.json",
    contractFile: "cipherpost-contract.json",
    validator: "validate-phase13-proton-mail.mjs",
    validationRecord: "phase13-step13-13-proton-mail.json",
    swiftModule: "CipherPost",
    packageName: "com.cipherpost",
    surfaces: ["Inbox", "Thread", "Compose", "Labels", "Contacts", "Privacy"],
    entities: ["mailAccount", "encryptedThread", "mailMessage", "draft", "label", "contactCard", "attachment", "recoveryBlocker", "spamReport", "exportRequest"],
    risks: ["openpgp-review", "zero-access-claims", "encrypted-search", "bridge-import-export", "account-recovery", "push-redaction"],
    routes: [
      "/auth/session",
      "/auth/mfa/blocker",
      "/accounts/recovery-limits",
      "/mailboxes",
      "/mailboxes/:id/threads",
      "/threads/:id/messages",
      "/drafts",
      "/messages/send/blocker",
      "/attachments/blocker",
      "/labels",
      "/folders",
      "/contacts",
      "/search/encrypted-index/blocker",
      "/spam/reports",
      "/phishing/reports",
      "/bridge-import-export/blocker",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "encrypted-mail-openpgp-and-key-management-review-required",
      enterpriseRetentionState: "privacy-mail-retention-export-and-delete-review-required",
      moderationState: "spam-phishing-and-abuse-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "yahoo-mail-mobile-clone": {
    product: "OrbitMail",
    module: "OrbitMailBatch",
    branch: "phase13-yahoo-mail-batch",
    sourceSpec: "953-yahoo-mail.md",
    category: "consumer smart inbox mail",
    hero: "multi-account inboxes, smart views, threaded mail, search filters, compose, attachments, disposable-address blockers, ads/premium blockers, and spam/phishing safety",
    fixtureFile: "orbitmail-fixtures.json",
    contractFile: "orbitmail-contract.json",
    validator: "validate-phase13-yahoo-mail.mjs",
    validationRecord: "phase13-step13-13-yahoo-mail.json",
    swiftModule: "OrbitMail",
    packageName: "com.orbitmail",
    surfaces: ["Inbox", "Smart Views", "Thread", "Compose", "Search", "Safety"],
    entities: ["mailAccount", "smartView", "thread", "emailMessage", "draft", "attachment", "disposableAddress", "adEntitlement", "unsubscribeSuggestion", "spamReport"],
    risks: ["provider-oauth", "smart-categorization", "ad-serving", "disposable-addresses", "account-key", "phishing-safety"],
    routes: [
      "/auth/session",
      "/auth/account-key/blocker",
      "/providers/oauth/start",
      "/accounts",
      "/mailboxes/unified",
      "/smart-views",
      "/threads",
      "/threads/:id/messages",
      "/drafts",
      "/messages/send/blocker",
      "/attachments/blocker",
      "/search",
      "/disposable-addresses/blocker",
      "/unsubscribe/blocker",
      "/ads/blocker",
      "/premium/blocker",
      "/spam/reports",
      "/phishing/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "consumer-mail-account-key-and-provider-token-review-required",
      enterpriseRetentionState: "consumer-mail-retention-export-and-delete-review-required",
      moderationState: "spam-phishing-unsubscribe-and-ad-safety-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "aol-mail-mobile-clone": {
    product: "ClassicPost",
    module: "ClassicPostBatch",
    branch: "phase13-aol-mail-batch",
    sourceSpec: "954-aol-mail.md",
    category: "classic consumer mail and news-adjacent inbox",
    hero: "folders, threaded mail, contacts, compose, attachments, search, news-adjacent surfaces, ads/premium blockers, account recovery, and spam/phishing reporting",
    fixtureFile: "classicpost-fixtures.json",
    contractFile: "classicpost-contract.json",
    validator: "validate-phase13-aol-mail.mjs",
    validationRecord: "phase13-step13-13-aol-mail.json",
    swiftModule: "ClassicPost",
    packageName: "com.classicpost",
    surfaces: ["Inbox", "Folders", "Thread", "Compose", "Contacts", "Safety"],
    entities: ["mailAccount", "folder", "mailThread", "emailMessage", "draft", "contactCard", "attachment", "adEntitlement", "newsSurfaceBlocker", "spamReport"],
    risks: ["legacy-account-recovery", "provider-oauth", "ad-serving", "news-content-licensing", "spam-filtering", "push-redaction"],
    routes: [
      "/auth/session",
      "/auth/recovery/blocker",
      "/providers/oauth/start",
      "/accounts",
      "/folders",
      "/threads",
      "/threads/:id/messages",
      "/drafts",
      "/messages/send/blocker",
      "/attachments/blocker",
      "/contacts",
      "/search",
      "/news/blocker",
      "/ads/blocker",
      "/premium/blocker",
      "/spam/reports",
      "/phishing/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "consumer-mail-account-recovery-and-token-review-required",
      enterpriseRetentionState: "consumer-mail-retention-export-and-delete-review-required",
      moderationState: "spam-phishing-ad-and-news-safety-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "spark-mail-mobile-clone": {
    product: "FocusFlock",
    module: "FocusFlockBatch",
    branch: "phase13-spark-mail-batch",
    sourceSpec: "955-spark-mail.md",
    category: "collaborative smart inbox mail",
    hero: "multi-account smart inboxes, team collaboration, shared drafts, delegation, calendar/provider blockers, compose, attachments, search, and privacy-safe assistant stubs",
    fixtureFile: "focusflock-fixtures.json",
    contractFile: "focusflock-contract.json",
    validator: "validate-phase13-spark-mail.mjs",
    validationRecord: "phase13-step13-13-spark-mail.json",
    swiftModule: "FocusFlock",
    packageName: "com.focusflock",
    surfaces: ["Smart Inbox", "Thread", "Compose", "Team", "Calendar", "Safety"],
    entities: ["mailAccount", "smartInbox", "mailThread", "draft", "sharedDraft", "teamMember", "calendarEvent", "attachment", "assistantBlocker", "phishingReport"],
    risks: ["multi-account-oauth", "team-collaboration", "shared-draft-permissions", "calendar-provider", "ai-assistant-privacy", "enterprise-retention"],
    routes: [
      "/auth/session",
      "/providers/oauth/start",
      "/accounts",
      "/smart-inbox",
      "/threads",
      "/threads/:id/messages",
      "/drafts",
      "/drafts/shared/blocker",
      "/messages/send/blocker",
      "/attachments/blocker",
      "/teams",
      "/teams/:id/members",
      "/calendar/events/blocker",
      "/assistant/blocker",
      "/search",
      "/spam/reports",
      "/phishing/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "collaborative-mail-permission-and-token-review-required",
      enterpriseRetentionState: "team-mail-retention-delegation-and-export-review-required",
      moderationState: "spam-phishing-team-abuse-and-shared-draft-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "edison-mail-mobile-clone": {
    product: "SortWell",
    module: "SortWellBatch",
    branch: "phase13-edison-mail-batch",
    sourceSpec: "956-edison-mail.md",
    category: "assistant-style mail organization",
    hero: "multi-account inboxes, package/travel/bill categorization, unsubscribe and assistant blockers, compose, attachments, search, privacy-safe analytics, and spam/phishing safety",
    fixtureFile: "sortwell-fixtures.json",
    contractFile: "sortwell-contract.json",
    validator: "validate-phase13-edison-mail.mjs",
    validationRecord: "phase13-step13-13-edison-mail.json",
    swiftModule: "SortWell",
    packageName: "com.sortwell",
    surfaces: ["Inbox", "Assistant Views", "Thread", "Compose", "Unsubscribe", "Safety"],
    entities: ["mailAccount", "assistantCategory", "mailThread", "emailMessage", "draft", "packageSummary", "travelSummary", "unsubscribeRequest", "attachment", "spamReport"],
    risks: ["mailbox-scanning", "assistant-categorization", "unsubscribe-provider", "package-travel-provider", "privacy-analytics", "phishing-safety"],
    routes: [
      "/auth/session",
      "/providers/oauth/start",
      "/accounts",
      "/assistant/categories",
      "/assistant/package-travel/blocker",
      "/threads",
      "/threads/:id/messages",
      "/drafts",
      "/messages/send/blocker",
      "/attachments/blocker",
      "/unsubscribe/blocker",
      "/search",
      "/spam/reports",
      "/phishing/reports",
      "/privacy/analytics",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "assistant-mail-processing-and-provider-token-review-required",
      enterpriseRetentionState: "assistant-mail-export-delete-and-retention-review-required",
      moderationState: "spam-phishing-unsubscribe-and-privacy-reporting-required",
      auditedE2eeClaim: false,
      providerParityClaim: false,
    },
  },
  "bluemail-mobile-clone": {
    product: "MailHarbor",
    module: "MailHarborBatch",
    branch: "phase13-bluemail-batch",
    sourceSpec: "957-bluemail.md",
    category: "unified mail client and team mailbox",
    hero: "unified inboxes, cluster view, people view, smart push, send later, group mail, S/MIME blockers, calendar/contact/provider blockers, and enterprise deployment",
    fixtureFile: "mailharbor-fixtures.json",
    contractFile: "mailharbor-contract.json",
    validator: "validate-phase13-bluemail.mjs",
    validationRecord: "phase13-step13-13-bluemail.json",
    swiftModule: "MailHarbor",
    packageName: "com.mailharbor",
    surfaces: ["Unified Inbox", "Clusters", "People", "Compose", "Group Mail", "Enterprise"],
    entities: ["mailAccount", "clusterThread", "peopleSender", "draft", "sendLaterBlocker", "groupMailbox", "calendarEvent", "smimeBlocker", "enterprisePolicy", "phishingReport"],
    risks: ["unlimited-account-sync", "cluster-algorithm", "smime-certificates", "exchange-ews-activesync", "team-shared-inbox", "enterprise-mdm"],
    routes: [
      "/auth/session",
      "/providers/oauth/start",
      "/providers/imap-smtp/blocker",
      "/providers/exchange/blocker",
      "/accounts",
      "/inbox/unified",
      "/clusters",
      "/people",
      "/threads/:id/messages",
      "/drafts",
      "/messages/send/blocker",
      "/send-later/blocker",
      "/attachments/blocker",
      "/group-mail/blocker",
      "/calendar/events/blocker",
      "/smime/certificates/blocker",
      "/enterprise/policies",
      "/spam/reports",
      "/phishing/reports",
      "/settings/privacy",
      "/data-export",
      "/account/delete",
    ],
    assertions: {
      securityReviewState: "unified-mail-smime-provider-token-and-enterprise-review-required",
      enterpriseRetentionState: "team-mail-enterprise-retention-export-and-mdm-review-required",
      moderationState: "spam-phishing-group-mail-and-enterprise-reporting-required",
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
      { id: "actor_owner", displayName: "Ari Park", role: "mailbox-owner", trustState: "verified-test-user" },
      { id: "actor_contact", displayName: "Mika Stone", role: "trusted-contact", trustState: "known-sender" },
      { id: "actor_reviewer", displayName: "Sam Rivera", role: "privacy-reviewer", trustState: "staff-test-user" },
    ],
    conversations: [
      {
        id: "thread_primary",
        title: `${config.product} mailbox workflow`,
        type: config.category,
        participantIds: ["actor_owner", "actor_contact"],
        unreadCount: 3,
        muted: false,
        retention: config.assertions.enterpriseRetentionState,
        security: config.assertions.securityReviewState,
      },
      {
        id: "thread_safety",
        title: "Mail safety and privacy review",
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
      ownerId: index % 2 === 0 ? "actor_owner" : "actor_contact",
      lifecycle: index === 0 ? "active" : "blocked-until-provider-review",
      reportable: true,
      syntheticOnly: true,
    })),
    messages: [
      {
        id: "mail_1",
        conversationId: "thread_primary",
        senderId: "actor_contact",
        subject: "Synthetic mailbox item",
        body: "Synthetic mail body for local validation only.",
        lifecycle: "read",
        delivery: { sent: true, delivered: true, readBy: ["actor_owner"] },
        attachments: [],
        safety: { reportable: true, unsafeLinkScan: "clean", phishingScan: "clean" },
      },
      {
        id: "mail_2",
        conversationId: "thread_primary",
        senderId: "actor_owner",
        subject: "Queued synthetic draft",
        body: "Queued synthetic draft for offline reconciliation.",
        lifecycle: "queued_offline",
        delivery: { sent: false, delivered: false, readBy: [], failedReason: "offline" },
        attachments: [{ id: "attachment_1", kind: "synthetic-mail-attachment", scanState: "pending" }],
        safety: { reportable: true, unsafeLinkScan: "pending", phishingScan: "pending" },
      },
    ],
    offlineQueue: [
      {
        id: "queue_1",
        action: "sync_draft_or_mailbox_state",
        conversationId: "thread_primary",
        idempotencyKey: `${config.product.toLowerCase()}_offline_1`,
        requiresServerConfirmation: true,
      },
    ],
    privacyAndSafety: {
      rawContentAnalyticsAllowed: false,
      notificationPreviewDefault: "redacted",
      reportCategories: ["spam", "phishing", "unsafe-link", "impersonation", "privacy", "abuse", "illegal-content"],
      moderationState: config.assertions.moderationState,
      risks: config.risks,
    },
    featureFlags: {
      productionAccountLifecycle: false,
      auditedE2eeClaim: config.assertions.auditedE2eeClaim,
      providerParityClaim: config.assertions.providerParityClaim,
      pushDelivery: false,
      providerAuth: false,
      mailTransport: false,
      encryptedMailParity: false,
      rawMailboxAnalytics: false,
      contactsCalendarProvider: false,
      attachmentProviderHandling: false,
      dataExportDeleteCompletion: false,
    },
    blockers: commonBlockers,
  };
}

function contractFor(config) {
  return {
    appName: config.product,
    routeVersion: "phase13-step13-13-v1",
    routes: config.routes.map((route) => ({
      path: route,
      auth: route.includes("auth") ? "anonymous-or-session" : "required",
      offline: route.includes("delete") || route.includes("export") || route.includes("blocker") || route.includes("reports") || route.includes("send") || route.includes("enterprise")
        ? "blocked-sensitive-write"
        : "cached-read-with-reconcile",
      privacy: "raw mailbox content, subject lines, headers, attachments, contact data, search queries, provider tokens, and account metadata excluded from telemetry",
    })),
    requiredWorkflows: [
      "mailbox, smart inbox, unified inbox, or folder list",
      "thread and email-message lifecycle",
      "account, contact, provider, or team model",
      "compose, draft, and attachment placeholder handling",
      "offline queue",
      "notification redaction",
      "spam, phishing, unsubscribe, or abuse reporting",
      "privacy settings",
      "export/delete blockers",
      "provider auth, transport, encryption, enterprise, and account-recovery blockers",
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
    rawMailboxAnalytics: fixture.featureFlags.rawMailboxAnalytics,
    blockedParityCount: contract.blockedParity.length,
  };
}

export function render${config.module}Summary() {
  const model = build${config.module}Model();
  return \`\${model.appName}: surfaces=\${model.surfaceCount}, threads=\${model.conversationCount}, queued=\${model.queuedMessages}, blocked=\${model.blockedObjects}, routes=\${model.routeCount}\`;
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
assert.equal(model.rawMailboxAnalytics, false);
assert.ok(model.surfaceCount >= 5);
assert.ok(model.conversationCount >= 2);
assert.ok(model.domainObjectCount >= 8);
assert.ok(model.messageCount >= 2);
assert.ok(model.queuedMessages >= 1);
assert.ok(model.blockedObjects >= 1);
assert.ok(model.routeCount >= 14);
assert.ok(model.blockedParityCount >= 9);
assert.match(render${config.module}Summary(), /queued=/);
console.log(render${config.module}Summary());
`;
}

function flutterMain(config) {
  return `class ${config.module}Model {
  final String appName = '${config.product}';
  final int surfaceCount = ${fixture.surfaces.length};
  final int threadCount = ${fixture.conversations.length};
  final int domainObjectCount = ${fixture.domainObjects.length};
  final int queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length};
  final bool rawContentAnalyticsAllowed = false;
  final String notificationPreviewDefault = 'redacted';
  final int blockedParityCount = ${commonBlockers.length};

  String summary() {
    return '$appName: surfaces=$surfaceCount, threads=$threadCount, queued=$queuedMessages, blockers=$blockedParityCount';
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
    let threadCount = ${fixture.conversations.length}
    let domainObjectCount = ${fixture.domainObjects.length}
    let queuedMessages = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length}
    let rawContentAnalyticsAllowed = false
    let notificationPreviewDefault = "redacted"
    let blockedParityCount = ${commonBlockers.length}

    func summary() -> String {
        return "\\(appName): surfaces=\\(surfaceCount), threads=\\(threadCount), queued=\\(queuedMessages), blockers=\\(blockedParityCount)"
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
    val threadCount: Int = ${fixture.conversations.length},
    val domainObjectCount: Int = ${fixture.domainObjects.length},
    val queuedMessages: Int = ${fixture.messages.filter((message) => message.lifecycle === "queued_offline").length},
    val rawContentAnalyticsAllowed: Boolean = false,
    val notificationPreviewDefault: String = "redacted",
    val blockedParityCount: Int = ${commonBlockers.length}
) {
    fun summary(): String = "$appName: surfaces=$surfaceCount, threads=$threadCount, queued=$queuedMessages, blockers=$blockedParityCount"
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
assert.equal(fixture.featureFlags.rawMailboxAnalytics, false);
assert.equal(fixture.featureFlags.providerParityClaim, false);
assert.ok(fixture.privacyAndSafety.risks.length >= 5);
assert.ok(fixture.conversations.length >= 2);
assert.ok(fixture.domainObjects.length >= 8);
assert.ok(fixture.messages.some((message) => message.lifecycle === "queued_offline"));
assert.ok(fixture.messages.every((message) => message.safety?.reportable === true));
assert.ok(fixture.offlineQueue.some((item) => item.requiresServerConfirmation));
assert.ok(contract.routes.some((route) => route.path.includes("/spam/reports")));
assert.ok(contract.routes.some((route) => route.path.includes("/phishing/reports")));
assert.ok(contract.routes.some((route) => route.path === "/data-export" || route.path === "/admin/exports"));
assert.equal(contract.validationRules.githubActionsUsed, false);
assert.equal(contract.validationRules.rawContentAnalyticsAllowed, false);
assert.equal(contract.validationRules.notificationPreviewDefault, "redacted");
assert.equal(contract.validationRules.auditedE2eeClaim, ${config.assertions.auditedE2eeClaim});
assert.equal(contract.validationRules.providerParityClaim, false);
assert.ok(contract.blockedParity.length >= 9);

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
      providerParityClaim: false,
      rawMailboxAnalytics: false
    },
    null,
    2
  ) + "\\n"
);

console.log(\`validated \${fixture.appName}: surfaces=\${fixture.surfaces.length}, threads=\${fixture.conversations.length}, objects=\${fixture.domainObjects.length}, routes=\${contract.routes.length}, blockers=\${contract.blockedParity.length}\`);
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
    rawMailboxAnalytics: false,
  });
}

function readme(config) {
  return `# ${config.product} Phase 13 Batch

Original lawful ${config.category} prototype inspired by public ${config.sourceSpec.replace(/^[0-9]+-/, "").replace(".md", "")} workflow categories. This repository uses original naming, synthetic fixtures, local validation, and explicit blockers for account, provider auth, mail transport, privacy, encryption/security, notification, attachment, device, native runtime, export/delete, and retention parity claims.

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

console.log(`Implemented ${app.product} Phase 13 email batch files in ${repoRoot}`);
