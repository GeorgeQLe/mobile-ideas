import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ideasPath = path.join(root, "tasks", "ideas.md");
const specsRoot = path.join(root, "specs");

const ideas = fs
  .readFileSync(ideasPath, "utf8")
  .split("\n")
  .filter((line) => /^\| \d+ \|/.test(line))
  .map((line) => {
    const cells = line.split("|").map((cell) => cell.trim());
    return {
      id: Number(cells[1]),
      app: cells[2],
      category: cells[3],
      focus: cells[4],
    };
  });

const existingFiles = new Map();
for (const batch of fs.readdirSync(specsRoot).filter((name) => /^batch-\d+$/.test(name))) {
  for (const file of fs.readdirSync(path.join(specsRoot, batch))) {
    const match = file.match(/^(\d{3})-.+\.md$/);
    if (match) existingFiles.set(Number(match[1]), path.join(specsRoot, batch, file));
  }
}

const categoryProfiles = [
  {
    match: /\bAI\b|assistant|companion|\bai search\b/i,
    domain: "ai_assistant",
    screens: ["Welcome/Auth", "Home", "Conversation", "Attachment Picker", "Voice Session", "Memory/Persona Settings", "History Search", "Share/Export", "Subscription", "Safety Review"],
    entities: ["User", "Session", "Conversation", "Message", "Attachment", "MemoryEntry", "ModelPreset", "SafetyDecision", "ShareLink", "Entitlement"],
    requirements: ["stream generated responses with resumable state", "support message edit, retry, copy, and delete actions", "validate uploads before model processing", "show capability and cost labels before premium actions", "separate personalization memory from raw conversation logs", "support conversation search and archive states", "provide explicit data retention controls", "gate unsafe outputs through policy-aware review states", "queue drafts when offline", "explain failures with recoverable actions", "support export and deletion requests", "keep assistant persona copy original"],
    risks: ["content safety", "privacy retention", "attachment scanning", "model-cost abuse", "user data export"],
  },
  {
    match: /Social|Messaging|Community|video|Discovery|Lifestyle|calling|Email|chat|messenger|media/i,
    domain: "social_comm",
    screens: ["Welcome/Auth", "Home Feed", "Create/Compose", "Detail/Thread", "Search/Explore", "Profile", "Inbox/Notifications", "Moderation/Report", "Settings", "Subscription"],
    entities: ["User", "Profile", "Post", "Comment", "Reaction", "Follow", "MessageThread", "Notification", "Report", "ModerationAction"],
    requirements: ["support account onboarding and profile setup", "render ranked or chronological feeds with pagination", "support creation, editing, deletion, and draft recovery", "support reactions, comments, sharing, and saves", "provide search and discovery filters", "support notifications with granular preferences", "include reporting and blocking controls", "apply privacy defaults consistently", "moderate abusive or illegal content", "cache recent content for poor network reads", "handle deleted or unavailable content", "keep creator/user identity original"],
    risks: ["moderation", "harassment", "minor safety", "spam", "privacy leakage"],
  },
  {
    match: /Maps|Navigation|Mobility|Micromobility|Car sharing|Travel|lodging|booking/i,
    domain: "location_marketplace",
    screens: ["Welcome/Auth", "Search", "Map/List Results", "Detail", "Booking/Request", "Checkout", "Live Trip", "Messages", "History", "Support"],
    entities: ["User", "Location", "Listing", "Availability", "Booking", "PaymentIntent", "MessageThread", "Route", "Review", "SupportCase"],
    requirements: ["support location/date/availability search", "render map and list views from one result model", "show total price or ETA before confirmation", "handle availability conflicts before payment", "support saved places or wishlists", "provide provider/host/driver communication where relevant", "track live status updates and history", "support cancellations and refunds by policy", "request location only at user action", "cache active trip details offline", "prevent fraud and unsafe interactions", "show support entry points from every active transaction"],
    risks: ["location privacy", "payment disputes", "fraud", "personal safety", "regulatory constraints"],
  },
  {
    match: /Food|Grocery|Reservations|Local|Shopping|Marketplace|Resale|Commerce/i,
    domain: "commerce_marketplace",
    screens: ["Welcome/Auth", "Browse/Search", "Listing/Menu/Product Detail", "Cart/Selection", "Checkout", "Order/Reservation Status", "Messages", "Reviews", "Returns/Support", "Seller/Admin Tools"],
    entities: ["User", "Merchant", "CatalogItem", "Inventory", "Cart", "Order", "Payment", "Fulfillment", "Review", "Dispute"],
    requirements: ["support catalog browse, search, and filters", "show availability, modifiers, fees, taxes, and total cost", "support cart edits and saved favorites", "validate inventory before checkout", "support payment authorization and failure recovery", "track order/reservation lifecycle states", "support merchant or seller communication", "collect reviews only after eligible events", "support refunds, returns, disputes, and support", "detect spam, fraud, and prohibited listings", "cache recent orders and saved items", "keep all product/media content original or licensed"],
    risks: ["payment security", "consumer protection", "fraud", "unsafe goods", "review abuse"],
  },
  {
    match: /Finance|Investing|Crypto|Budgeting|Wallet|Personal finance/i,
    domain: "finance",
    screens: ["Welcome/Auth", "Dashboard", "Transfer/Trade Ticket", "Account Detail", "Transaction Detail", "Identity/Security", "Alerts", "Statements", "Support", "Settings"],
    entities: ["User", "IdentityCheck", "Account", "Balance", "Transaction", "Transfer", "Instrument", "AlertRule", "Statement", "DeviceSession"],
    requirements: ["support secure onboarding with session controls", "show balances with timestamp and stale-state warnings", "render transactions with filterable history", "preview all money movement before submission", "require idempotency keys for writes", "support alerts and security notifications", "export statements or transaction history", "block high-risk actions with reason codes", "minimize PII in logs and analytics", "support account deletion and data export", "use sandbox rails until licensed", "show disclosures before regulated actions"],
    risks: ["KYC/AML", "financial licensing", "fraud", "PII leakage", "irreversible transfer mistakes"],
  },
  {
    match: /Music|audio|Audiobooks|Podcasts|Streaming|Video platform|Live streaming|Entertainment/i,
    domain: "media_streaming",
    screens: ["Welcome/Auth", "Home", "Search", "Catalog Detail", "Player", "Library", "Downloads", "Creator/Channel", "Comments/Reviews", "Settings"],
    entities: ["User", "CatalogItem", "Creator", "Collection", "PlaybackSession", "QueueItem", "Download", "Entitlement", "Comment", "RecommendationSlot"],
    requirements: ["support catalog browse and search", "render creator, album, show, or title details", "provide player controls with durable position", "support queue, save, favorite, and library actions", "support downloads when licensed", "track entitlement and regional availability", "surface continue-watching/listening states", "support comments or reviews where relevant", "handle stream errors and DRM/licensing states", "separate licensed catalog from synthetic development data", "support parental or content controls where relevant", "preserve accessibility captions or transcript needs"],
    risks: ["licensed media", "copyright", "content moderation", "parental controls", "download rights"],
  },
  {
    match: /Education|learning|solver|language|course|flashcard/i,
    domain: "education",
    screens: ["Welcome/Auth", "Placement/Setup", "Home", "Lesson", "Practice", "Progress", "Search/Catalog", "Saved Content", "Subscription", "Settings"],
    entities: ["User", "Course", "Lesson", "Exercise", "Attempt", "Progress", "Streak", "Recommendation", "Certificate", "Entitlement"],
    requirements: ["support learner onboarding and level selection", "render lessons with step-by-step progression", "record attempts and mastery state", "support review, retry, and spaced repetition where relevant", "show progress, streaks, and goals", "support search or course catalog", "cache active lessons offline", "gate premium explanations or certificates by entitlement", "protect minors and classroom data", "avoid unsupported academic-integrity claims", "provide accessibility for audio, math, and video content", "export learner progress where required"],
    risks: ["minor privacy", "academic misuse", "accessibility", "subscription gating", "content accuracy"],
  },
  {
    match: /Wellness|Fitness|Health|tracking|cycle|nutrition|meditation/i,
    domain: "health_fitness",
    screens: ["Welcome/Auth", "Dashboard", "Activity/Session", "Tracker Entry", "History", "Insights", "Reminders", "Privacy Controls", "Onboarding", "Subscription"],
    entities: ["User", "Profile", "Session", "Metric", "Entry", "Goal", "Reminder", "Insight", "DeviceSync", "Entitlement"],
    requirements: ["support consent-based onboarding", "record sessions or health-adjacent entries", "show history and trends with clear timestamps", "support reminders and streaks", "cache active sessions locally", "provide export and deletion of sensitive data", "avoid clinical diagnosis unless reviewed", "support permission-denied fallbacks", "handle device sync conflicts", "gate premium insights by entitlement", "use original coaching/content assets", "present safety disclaimers where needed"],
    risks: ["sensitive health data", "medical-adjacent claims", "location privacy", "device permissions", "subscription trust"],
  },
  {
    match: /Productivity|Cloud|Creator|Photo|Smart home|utility/i,
    domain: "productivity_creator",
    screens: ["Welcome/Auth", "Home/Workspace", "Create/Edit", "Detail/Preview", "Search", "Share", "Sync/Activity", "Templates/Library", "Permissions", "Settings"],
    entities: ["User", "Workspace", "Document", "Asset", "Project", "Version", "ShareGrant", "Template", "SyncJob", "Notification"],
    requirements: ["support creation and editing of primary objects", "persist autosave and version history", "support search and recent items", "support sharing with role-based permissions", "handle offline edits and sync conflicts", "support import/export workflows", "gate premium templates, storage, or tools by entitlement", "request file/camera/device permissions only on action", "render previews without data leakage", "support deletion and recovery windows", "keep all templates and assets original or licensed", "provide clear failed-sync recovery"],
    risks: ["data loss", "permission leakage", "copyrighted assets", "collaboration access", "device security"],
  },
];

function profileFor(category, focus) {
  return (
    categoryProfiles.find((profile) => profile.match.test(category)) ??
    categoryProfiles.find((profile) => profile.match.test(`${category} ${focus}`)) ??
    categoryProfiles.at(-1)
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function searchUrl(base, term) {
  return `${base}${encodeURIComponent(term)}`;
}

function appStoreUrl(term) {
  return searchUrl("https://apps.apple.com/us/search?term=", term);
}

function playStoreUrl(term) {
  return `https://play.google.com/store/search?q=${encodeURIComponent(term)}&c=apps`;
}

function webSearchUrl(term) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${term} official app help privacy`)}`;
}

function sentenceList(items, prefix) {
  return items.map((item) => `- ${prefix} ${item}.`);
}

function pluralize(value) {
  const slug = slugify(value);
  if (slug.endsWith("y")) return `${slug.slice(0, -1)}ies`;
  if (slug.endsWith("s")) return slug;
  return `${slug}s`;
}

function entityDescription(entity, index) {
  const lower = entity.toLowerCase();
  if (lower.includes("user")) return "owns identity, preferences, locale, entitlements, consent, and deletion/export state";
  if (lower.includes("profile")) return "stores public identity, display preferences, privacy level, and relationship metadata";
  if (lower.includes("account")) return "stores account-level status, balances or settings, authorization state, and lifecycle flags";
  if (lower.includes("payment") || lower.includes("order") || lower.includes("booking") || lower.includes("reservation")) return "tracks checkout, confirmation, cancellation, refund, dispute, and audit states";
  if (lower.includes("message") || lower.includes("thread") || lower.includes("comment")) return "captures conversation content references, participants, moderation state, and delivery status";
  if (lower.includes("notification") || lower.includes("alert") || lower.includes("reminder")) return "records delivery preferences, trigger rules, read state, and retry metadata";
  if (lower.includes("session") || lower.includes("activity") || lower.includes("run")) return "captures active workflow state, timestamps, metrics, pause/resume markers, and completion status";
  if (lower.includes("asset") || lower.includes("catalog") || lower.includes("listing") || lower.includes("item")) return "represents the primary user-facing catalog object, ownership, availability, and display metadata";
  if (lower.includes("review") || lower.includes("report") || lower.includes("support") || lower.includes("dispute")) return "stores trust, safety, support, escalation, decision, and resolution metadata";
  if (lower.includes("entitlement") || lower.includes("subscription")) return "holds plan, trial, renewal, expiration, refund, and feature-access state";
  if (index === 1) return "stores the primary workspace, account, or grouping context";
  if (index === 2) return "represents the main user-facing object in this clone's core flow";
  if (index === 3) return "captures lifecycle state, ordering, timestamps, and failure reason codes";
  if (index === 4) return "tracks durable interaction history and audit metadata";
  if (index === 5) return "stores sharing, collaboration, or permission relationships";
  if (index === 6) return "records notification, recommendation, or entitlement state";
  if (index === 7) return "supports safety, review, policy, or moderation decisions";
  if (index === 8) return "stores support or user feedback records";
  return "holds derived analytics-safe state and sync metadata";
}

function specFor(item) {
  const profile = profileFor(item.category, item.focus);
  const screens = profile.screens.slice(0, 10);
  const entities = profile.entities.slice(0, 10);
  const focus = item.focus.replace(/\.$/, "");
  const appLabel = `${item.app}-Style Clone`;
  const cloneSlug = slugify(item.app);
  const requirements = profile.requirements;
  const risks = profile.risks;
  const readApi = entities.slice(0, 5).map((entity) => `GET /${pluralize(entity)}`).join(", ");
  const writeApi = entities.slice(0, 5).map((entity) => `POST /${pluralize(entity)}`).join(", ");

  const lines = [
    `# ${appLabel} Spec`,
    "",
    "> Metadata",
    `> - Inspiration app: ${item.app}`,
    `> - Category: ${item.category}`,
    "> - Spec status: Draft 1, public-source research pass complete; hands-on account/device verification blocked unless noted.",
    "> - Legal scope: functional parity research only; use original code, branding, copy, media, sample data, and licensed integrations.",
    "",
    "## Overview",
    `Build an original mobile product inspired by ${item.app}'s user-facing workflow, not its brand identity or proprietary implementation.`,
    `The clone target is: ${focus}.`,
    `Primary product surface: ${screens[1].toLowerCase()} supported by ${screens[2].toLowerCase()} and ${screens[3].toLowerCase()} flows.`,
    "The implementation should preserve the interaction model users expect while replacing all marks, artwork, copy, content, ranking systems, and third-party data with original or licensed equivalents.",
    "The spec intentionally separates verified public-source facts from inferred clone requirements.",
    "",
    "## Goals",
    `- Deliver a mobile-first ${item.category.toLowerCase()} experience with complete onboarding, core action, settings, and recovery flows.`,
    `- Implement the app-specific focus: ${focus}.`,
    "- Provide enough product, data, API, privacy, analytics, and test detail for an engineering team to estimate and build a lawful clone.",
    "- Make public-source verification and blocked hands-on research visible before implementation starts.",
    "- Preserve a consistent spec shape across all 100 clone projects so future agents can compare, prioritize, and execute.",
    "",
    "## Non-Goals",
    `- Do not copy ${item.app} branding, trade dress, logos, app icons, screenshots, marketing copy, or proprietary media.`,
    "- Do not use private APIs, scraped paywalled content, unlicensed catalog data, or reverse-engineered server contracts.",
    "- Do not claim exact one-for-one behavior for any flow that has not been verified through lawful public or hands-on research.",
    "- Do not implement production payments, regulated finance, clinical health advice, transport dispatch, or smart-home control without separate legal and platform review.",
    "- Do not build the app in this repository; this repo remains a planning and specification workspace.",
    "",
    "## Research Sources",
    `- App Store source-discovery link: ${appStoreUrl(item.app)}`,
    `- Google Play source-discovery link: ${playStoreUrl(item.app)}`,
    `- Official help/privacy source-discovery link: ${webSearchUrl(item.app)}`,
    "- Public listing items to verify: app description, category, screenshots, privacy labels, age rating, in-app purchases, latest release notes, and support/developer links.",
    "- Public documentation items to verify: account model, subscription gates, deletion/export controls, safety policies, and support paths.",
    "- Public review themes to collect: onboarding confusion, missing features, reliability complaints, pricing complaints, and retention drivers.",
    "- Hands-on verification status: blocked for this pass; use a test device/account and document screen states before implementation.",
    "- Research risk: source-discovery links may route through marketplace search; replace them with exact listing/help URLs during the next research pass.",
    "",
    "## Detailed Design",
    `- Onboarding: support guest, signup, returning-user, permission-primer, and blocked-region or blocked-account states as appropriate for ${item.category.toLowerCase()}.`,
    `- Home model: make ${screens[1]} the default returning-user surface with empty, loading, personalized, degraded-network, and signed-out variants.`,
    `- Core action: make ${screens[2]} the highest-priority creation or transaction flow and keep its primary action reachable within two taps from home.`,
    `- Detail surface: use ${screens[3]} for preview, confirmation, or consumption states with clear ownership of saved, shared, unavailable, and error states.`,
    "- Notifications: support opt-in prompts, transactional notifications, preference categories, quiet hours, and revoked-permission fallback.",
    "- Settings: include profile, privacy, notifications, subscriptions, support, terms, privacy policy, data export, and delete-account entry points.",
    "- Entitlements: represent free, trial, paid, expired, refunded, and unavailable plan states without copying the inspiration app's pricing.",
    "- Accessibility: support dynamic type, screen reader labels, visible focus, sufficient contrast, reduced motion, and captions/transcripts for media where applicable.",
    ...sentenceList(requirements, "The implementation must"),
    "",
    "## Core User Journeys",
    `- New user installs the app, reviews an original value proposition, creates an account, and reaches ${screens[1]}.`,
    `- Returning user opens ${screens[1]}, resumes the most recent meaningful activity, and completes the primary action in ${screens[2]}.`,
    `- User searches or browses from ${screens[4]}, opens ${screens[3]}, saves or shares it, and later finds it again from history or library.`,
    "- User denies a requested permission, still receives a usable fallback, and can re-enable the permission from settings.",
    "- User loses connectivity during the core flow, sees local state preserved, and can retry or safely discard the draft.",
    "- User upgrades, downgrades, cancels, or expires an entitlement and sees the correct locked/unlocked product states.",
    "",
    "## Screen Inventory",
    "| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |",
    "|---|---|---|---|---|",
    ...screens.map((screen, index) => {
      const purpose = index === 0 ? "Entry, auth, and consent" : index === 1 ? "Default returning-user surface" : index === 2 ? "Primary creation or action flow" : index === 3 ? "Inspect, consume, or confirm item details" : index === 4 ? "Find or filter content and actions" : index === 5 ? "Identity, ownership, or sharing context" : "Supporting workflow and recovery";
      return `| ${screen} | ${purpose} | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |`;
    }),
    "",
    "## Data Model",
    ...entities.map((entity, index) => `- \`${entity}\`: ${entityDescription(entity, index)}.`),
    "- `AuditEvent`: append-only server record for sensitive writes, account changes, moderation actions, and billing or entitlement transitions.",
    "- `LocalCacheRecord`: device-local state for offline reads, queued writes, sync attempts, and conflict resolution metadata.",
    "",
    "## API And Backend Contracts",
    "- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions` with device-scoped session tracking.",
    `- Reads: ${readApi}; all reads return pagination, cache hints, authorization status, and stale-data indicators.`,
    `- Writes: ${writeApi}; all writes require validation errors, idempotency keys for user actions, and audit events for sensitive state changes.`,
    "- Search: `GET /search` accepts query, filters, cursor, locale, safe-mode, and entitlement context; returns empty-state copy keys rather than hard-coded UI copy.",
    "- Upload/import: use signed upload URLs, MIME/size validation, malware or content scanning where relevant, and original asset licensing metadata.",
    "- Realtime: expose websocket, SSE, or polling fallback for primary status updates; clients must handle missed events by refetching canonical state.",
    "- Notifications: `POST /notification-preferences` and server-side fanout for transactional, reminder, marketing, and safety categories.",
    "- Billing/entitlements: `GET /entitlements`, `POST /checkout/session`, and webhook-backed entitlement updates; never trust client-only subscription state.",
    "- Privacy: `POST /data-export`, `DELETE /account`, and `GET /privacy/settings` must be available from settings and support flows.",
    "- Admin/support: include internal review endpoints for reports, disputes, refund review, fraud holds, and policy decisions before production launch.",
    "",
    "## Realtime, Push, And Offline Behavior",
    "- Cache the home surface, recent detail pages, settings, entitlement state, and current in-progress action for offline reads.",
    "- Queue low-risk drafts locally with retry metadata; block money movement, regulated actions, irreversible deletes, and unsafe submissions while offline.",
    "- Push notifications must be opt-in, grouped by category, and mirrored in an in-app notification center when relevant.",
    "- Realtime updates must be reconciled against server state after reconnect to avoid duplicate actions or stale status.",
    "- Long-running tasks must expose pending, complete, failed, canceled, and expired states with recovery actions.",
    "- Background work must tolerate app termination, OS permission changes, token expiry, and clock skew.",
    "",
    "## Permissions, Privacy, And Safety",
    ...risks.map((risk) => `- Treat ${risk} as a launch-blocking review area; document owner, mitigation, and test coverage before implementation.`),
    "- Request camera, microphone, photos, contacts, location, motion, Bluetooth, files, or notifications only at the moment the user invokes a feature needing it.",
    "- Provide permission-denied fallbacks, settings education, and no dark patterns around consent.",
    "- Minimize sensitive data in analytics, logs, crash reports, and support tooling.",
    "- Provide user-visible privacy policy, terms, data export, delete account, report abuse, block/mute where relevant, and support escalation.",
    "- Use original sample data and licensed third-party providers only after legal review.",
    "",
    "## Analytics And Monetization",
    "- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, `onboarding_skipped` with source, locale, and experiment ids.",
    "- Core action events: `home_viewed`, `search_performed`, `detail_opened`, `primary_action_started`, `primary_action_completed`, `primary_action_failed` with object type and failure code.",
    "- Retention events: `notification_opened`, `favorite_saved`, `history_opened`, `share_started`, `reminder_set`, `offline_recovered`.",
    "- Safety events: `report_submitted`, `block_created`, `moderation_state_changed`, `privacy_setting_changed`, `data_export_requested`, `account_delete_requested`.",
    "- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_expired`.",
    "- Monetization model: use original free/trial/paid entitlement rules; do not copy exact pricing, offers, bundle naming, or promotional copy from the inspiration app.",
    "- Analytics rule: do not send raw user content, payment credentials, precise location, health entries, or private messages as event properties.",
    "",
    "## Edge Cases",
    "- First launch with no network, no account, or expired session.",
    "- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.",
    "- Duplicate taps, duplicate webhook delivery, retry after timeout, and stale optimistic UI.",
    "- Deleted, suspended, blocked, expired, unavailable, region-locked, or entitlement-locked objects.",
    "- Partial upload, interrupted download, corrupt cache, disk full, and app terminated during background work.",
    "- Abuse and policy: spam, fraud, harassment, prohibited content, account takeover, and support escalation.",
    "",
    "## Test Plan",
    "- Unit tests for validation, state machines, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.",
    "- Integration tests for auth, primary reads, primary writes, search, notification preferences, billing/entitlement transitions, and account deletion/export.",
    "- Contract tests for every documented API response shape, error code, pagination behavior, and realtime reconciliation path.",
    "- Offline tests for cached reads, queued drafts, blocked writes, reconnect reconciliation, and corrupt-cache recovery.",
    "- Permission tests for denied, granted, revoked, and limited-access OS permission states.",
    "- Safety tests for report submission, moderation state changes, blocked users, fraud holds, and policy warning copy.",
    "- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, and media alternatives.",
    "- Billing tests for trial, purchase, renewal, cancellation, refund, expiration, and unavailable entitlement states.",
    "- Notification tests for opt-in, denied, revoked, quiet-hours, deep link, and in-app notification center behavior.",
    "- Regression tests for every acceptance criterion before marking the spec implementation-ready.",
    "",
    "## Acceptance Criteria",
    "- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.",
    "- Public source links are replaced with exact listing/help/privacy URLs or explicitly marked blocked before build start.",
    "- A new user can complete onboarding and reach the default home surface without unsupported permissions.",
    "- A returning user can complete the primary action, recover from a network failure, and confirm server state after reconnect.",
    "- Search/browse, detail, save/share, notification, settings, support, and deletion/export flows are all represented in routes and tests.",
    "- All data entities have owners, lifecycle states, authorization rules, and deletion/export behavior.",
    "- At least 10 acceptance tests exist and cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, billing, notifications, data deletion/export, and regression behavior.",
    "",
    "## Open Questions",
    "- Which exact marketplace listing, help center, privacy policy, and support docs should be treated as canonical for this inspiration app?",
    "- Which hands-on flows require a test account, paid subscription, region-specific availability, physical device, or regulated sandbox?",
    "- Which third-party providers will supply maps, media, catalog, payment, identity, notification, analytics, or storage services for the original clone?",
    "- Are any features intentionally out of scope for legal, safety, budget, or platform-policy reasons?",
    "",
    "## Next Steps",
    "- Replace source-discovery links with exact first-party URLs from a verified research session.",
    "- Capture public screenshots, privacy-label notes, release notes, and user-review themes in a dedicated research note.",
    "- Resolve open questions and update this spec before app implementation starts.",
    "- Produce a build plan with route map, component map, API schema, seed data plan, and test checklist.",
    "",
  ];

  return lines.join("\n");
}

for (const item of ideas) {
  const file = existingFiles.get(item.id);
  if (!file) {
    throw new Error(`Missing existing spec file for ${item.id} ${item.app}`);
  }
  fs.writeFileSync(file, specFor(item));
}

for (let batch = 1; batch <= 5; batch += 1) {
  const from = (batch - 1) * 20 + 1;
  const to = batch * 20;
  const batchItems = ideas.filter((item) => item.id >= from && item.id <= to);
  const lines = [
    `# Batch ${String(batch).padStart(2, "0")} Draft 1 Specs`,
    "",
    "> Metadata",
    `> - App range: ${String(from).padStart(3, "0")}-${String(to).padStart(3, "0")}`,
    "> - Status: Draft 1 canonical spec rewrite",
    "> - Research state: public source-discovery links included; exact source replacement and hands-on verification still required before implementation.",
    "",
    "## Overview",
    `This batch contains canonical Draft 1 clone specs for apps ${from}-${to} from tasks/ideas.md.`,
    "",
    "## Included Specs",
    "",
    ...batchItems.map((item) => `- ${String(item.id).padStart(3, "0")} ${item.app} - ${item.category}`),
    "",
    "## Quality Gate",
    "",
    "- Each numbered spec uses canonical hygiene sections.",
    "- Each numbered spec includes source-discovery links, functional requirements, data model, API contracts, edge cases, test plan, acceptance criteria, open questions, and next steps.",
    "- Each numbered spec remains legally scoped to functional parity with original assets and licensed data.",
    "",
    "## Next Steps",
    "",
    "- Replace source-discovery links in every spec with exact verified first-party URLs.",
    "- Complete hands-on verification where lawful and feasible before app implementation starts.",
    "",
  ];
  fs.writeFileSync(path.join(specsRoot, `batch-${String(batch).padStart(2, "0")}`, "README.md"), lines.join("\n"));
}
