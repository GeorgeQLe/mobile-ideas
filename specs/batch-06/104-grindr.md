# Grindr-Style Clone Spec

> Metadata
> - Inspiration app: Grindr
> - Category: Dating / LGBTQ+ location-grid discovery
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public community guidelines.
> - Manual verification blockers: native iOS/Android screen capture, subscription purchase/restore, HIV/STI profile-field localization handling, and push-notification behavior require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, safety copy, and moderation pipelines.

## Overview

Build an original mobile dating/chat app inspired by Grindr's location-grid discovery pattern for LGBTQ+ users: a grid of nearby profiles sorted by proximity, quick chat without mutual-match gate, profile tags covering role/position/interests, HIV/STI status with reminder fields (opt-in), inclusive identity (gender, pronouns, orientation), discreet-app-icon option, and a heavy safety layer covering block/report, sensitive-location detection, and photo-discretion tools.

The clone must not copy Grindr branding, trademarked feature names, screenshots, marketing copy, protected iconography, private APIs, or proprietary moderation pipelines.

Any feature marked `Manual verification required` must ship behind a feature flag until hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first location-grid discovery surface with proximity-sorted tiles and quick chat without mutual-match gate.
- Support inclusive identity fields with broad gender, pronoun, orientation, and relationship-status options with opt-in visibility.
- Offer health-related optional fields (HIV status, last test date, PrEP use) with user-controlled visibility and no analytics leakage.
- Provide discreet-app-icon option, unsend, and safety-focused tools (block/report, sensitive-location warnings).
- Keep privacy and safety prominent given higher risk of doxxing/outing in hostile regions.
- Support subscription state without copying proprietary plan names or pricing.

## Non-Goals

- Do not build a Grindr-branded app or imply affiliation.
- Do not scrape Grindr or replay private APIs; do not reuse trademarked feature names or health-field copy verbatim.
- Do not ship adult/explicit content, minors, or dating under platform minimum age.
- Do not expose precise coordinates to other users; do not use health fields for ad targeting.
- Do not claim exact App Store/Play Store parity until manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/grindr-gay-dating-chat/id319881193 | iOS listing, category, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.grindrapp.android | Android listing, content rating, data safety | Source discovery — pending exact URL verification |
| Grindr Help Center | https://help.grindr.com/hc/en-us | Grid, chat, tags, subscription tiers, health fields, privacy | Source discovery — pending exact URL verification |
| Grindr Privacy Policy | https://www.grindr.com/privacy-policy | Data collection, retention, deletion, location handling | Source discovery — pending exact URL verification |
| Grindr Community Guidelines | https://help.grindr.com/hc/en-us/articles/360035843152 | Banned content, harassment policy, discrimination policy | Source discovery — pending exact URL verification |
| Grindr Holistic Security Guide | https://www.grindr.com/blog/safer-grindr | Sensitive-location warnings, doxxing mitigation | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding: email/phone auth, DOB age gate, photos, display name, identity fields (gender, pronouns, orientation, relationship status), profile tags (role, position, interests).
- Grid surface shows nearby profiles as tiles sorted by approximate distance with filters (tags, age range, online-now).
- Chat opens from tile tap without requiring mutual match; rate limiting and anti-harassment tooling mandatory.
- Profile allows optional health fields (HIV status, last test date, PrEP) with explicit visibility toggle; never leaked to analytics, ads, or third parties.
- Photo sharing in chat with unsend/retract; expiring photos optional.
- Discreet app icon and display name on home screen for users in hostile environments.
- Subscription state: free (ad-supported), paid (ad-free + features), expired, canceled, restored; extra consumables optional.

## Core User Journeys

- New user onboards with age gate, identity fields, tags, and photo; lands on grid.
- User browses grid, filters by tag, opens profile, and sends chat.
- User receives chat request; sensitive-message scanner warns on explicit content; recipient can block/report.
- User toggles health fields visible/hidden per-viewer group (all, favorites only, hidden).
- User enables discreet app icon and alt display name.
- User enters a sensitive-location area (configurable country list); app surfaces doxxing/stalking warnings and auto-hides distance.
- User blocks/reports; report submits with reason, evidence, and escalation tier.
- User upgrades, cancels, restores subscription.
- User requests data export and account deletion; health fields purged per retention policy.
- User travels (explore) to another city via paid feature; grid shows that city with city-level precision only.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Email/phone, age gate | credentials, DOB | new, returning, auth-error | underage, region hostile |
| Onboarding | Photos, identity, tags | photos, fields | incomplete, complete | photo rejected |
| Grid | Proximity tiles | scroll, filter, tap tile | loaded, empty, offline | location denied, sensitive-area warning |
| Profile Detail | Expanded profile | scroll, favorite, chat | loaded, blocked, deleted | health-field hidden per policy |
| Chat Inbox | Conversations list | tap thread | empty, with threads | archived, blocked |
| Chat Thread | Messaging | text, photo, unsend, report | connecting, delivered, read | message blocked, photo removed |
| Filters | Tag/age/online filters | selectors | loaded, saved | conflict with profile |
| Discreet Mode | Icon and name toggle | toggle, icon choice | baseline, discreet-on | icon change restricted by OS |
| Safety Center | Block list, guides, report history | manage | baseline, sensitive-area flagged | verification failed |
| Subscription | Plan, checkout, restore | plan, payment | free, paid, expired, restored | platform mismatch |
| Report Flow | Reason, evidence | text, screenshot | drafting, submitted | NCII fast-path |
| Settings | Account, privacy, data export | navigation, toggles | loaded, signed-out | deletion pending |

## Data Model

- `User`: identity, email/phone, DOB, locale, region, age-gate decision, auth providers, deletion/export state, sensitive-region flag.
- `Profile`: display name, photos, identity fields (gender, pronouns, orientation, relationship), tags, bio, distance-visibility, health-fields-visibility.
- `HealthField`: field type (HIV status, last test, PrEP), value, visibility (all/favorites/hidden), last updated.
- `Tag`: tag id, name, category (role/position/interest), moderation state.
- `GridEntry`: viewer, candidate id, distance bucket, online state, surfaced_at.
- `Chat`: participants (no mutual-match required), created_at, archived state.
- `Message`: chat id, sender, content parts, safety classification, retracted state, delivered/read.
- `Photo`: storage key, expiring flag, TTL, scan result.
- `Favorite`: user, favorite user, created_at.
- `Block`: user, blocked user, created_at.
- `Entitlement`: plan key, platform, purchase id, trial/renewal/refund state.
- `SafetyReport`: reporter, reported, category, evidence, decision, escalation.
- `AuditEvent`: append-only account, privacy, billing, safety, discreet-mode, health-field changes.

## API And Backend Contracts

- `POST /auth/email`, `POST /auth/phone`, `DELETE /auth/session`: auth with age gate.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile CRUD including identity, tags, health fields, visibility.
- `GET /tags`: tag library.
- `POST /photos`, `PUT /photos/:id/content`, `DELETE /photos/:id`: photo upload with scans.
- `GET /grid?cursor=&filters=`: proximity grid with bucketed distance.
- `POST /chats`, `GET /chats`, `GET /chats/:id`: chat creation and list.
- `GET /chats/:id/messages`, `POST /chats/:id/messages`, `POST /messages/:id/retract`: messaging.
- `POST /uploads/chat-photo`: scan-before-deliver; TTL for expiring photos.
- `GET /settings/privacy`, `PATCH /settings/privacy`: distance visibility, health-field visibility, discreet mode.
- `POST /favorites`, `DELETE /favorites/:id`: favorites.
- `POST /blocks`, `DELETE /blocks/:id`: block list.
- `POST /reports`: harassment/NCII/discrimination reports.
- `POST /explore`, `GET /explore`: city-level location swap.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: billing.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Chat uses websocket with reconnect; push wakes for new message with content redacted by default.
- Online state best-effort; toggleable in privacy settings.
- Distance is server-computed with bucketing; precise coordinates never returned to client for other users.
- Offline cache: recent chats, tag library, own profile. Evict on block/unmatch sync.
- Unsend/retract must propagate to all clients within session; message replaced with placeholder for recipients but retained for moderation.
- Sensitive-region detection: server-side geo lookup; surfaces banner and auto-hides distance; user confirms before distance becomes visible.

## Permissions, Privacy, And Safety

- Age gate launch-blocking; minors protection with photo age estimation.
- Sensitive-location handling: dynamic list of hostile regions; auto-hide distance, auto-hide profile photos with face if user opts in, surface safety guide banner.
- Doxxing/outing mitigation: distance bucketed (e.g., "approx 1 mi"), never precise coords; discreet-app-icon/display-name option; ability to blur public-photo previews until user taps.
- Health-field handling: explicit-consent fields, user-controlled visibility (all/favorites/hidden), excluded from analytics, never shared with ad or marketing partners, deletion purges all historical values, regional compliance (HIPAA-adjacent in US, GDPR special category).
- NCII report fast-path with hashing and expedited takedown.
- Photo content policy: explicit nudity allowed/disallowed per region; minors/weapons/hate auto-blocked.
- Block/report: one-tap, no notification to blocked party, persist across reinstall.
- Unsend/retract: available for N-minute window; preserved server-side for moderation only.
- Sensitive-message scanning: opt-in for unsolicited-explicit-photo warnings with reconsider dialog.
- Harassment escalation: repeat offenders shadow-limited, suspended, banned with appeal; law-enforcement pipeline for threats.
- Discrimination policy: tags and filters must not enable race/ethnicity-based exclusion where applicable.

## Analytics And Monetization

- Events: onboarding, profile publish, grid viewed, filter applied, chat opened, message sent, photo sent, unsend used, block/report, subscription lifecycle, export/deletion.
- No raw content, DOB, precise location, health-field values, identity attributes, or biometric data in analytics.
- Monetization: free ad-supported tier, paid ad-free tier with feature boosts, consumables (visibility, explore credits).
- Ad partners receive no health-field data, identity attributes, or precise location; ad SDK isolated from health scope.
- Paywall states identify blocked feature, entitlement, restore path, platform ownership, support.
- Server-side webhook reconciliation for all billing events.

## Edge Cases

- User in hostile region with auto-distance-hide; user overrides; log override for safety review.
- Health-field visibility toggled from "all" to "hidden" mid-session; server must immediately purge from other users' caches.
- Unsend issued after recipient already saw message; UI replaces but retains server-side for report.
- Discreet-app-icon change blocked by OS version (Android alias limitations); fallback messaging.
- Explore used while traveling to a country where app distribution is restricted.
- Ad SDK requests identifier for advertising (IDFA/AAID) while in sensitive region; block or anonymize.
- Reported user deletes account; evidence retained per policy.
- Data export requested including health-field history; export includes field values but encrypted with user-provided key.
- Subscription purchased on web, opened on iOS; restore after refund.
- NCII report with minor depicted; law-enforcement pipeline triggered.

## Test Plan

- Unit tests for distance bucketing, sensitive-region detection, health-field visibility enforcement, discreet-icon switching, age gate.
- Contract tests for all API routes; pagination; webhook idempotency.
- Integration tests: auth, onboarding, grid, chat, photo send/unsend, block/report, export/deletion.
- Photo pipeline tests: NSFW, minors, expiring TTL, retraction propagation.
- Safety tests: harassment, NCII, discrimination, sensitive-location warnings, discreet-icon.
- Privacy tests: distance visibility, health-field visibility, analytics redaction, ad-SDK scoping.
- Billing tests: free/paid/expired/canceled/refunded/restored/cross-platform.
- Realtime tests: push redaction, unsend propagation, reconnect.
- Accessibility tests: dynamic type, screen reader, reduced motion, contrast.
- Manual verification: native screenshots, subscription purchase/restore, push payloads, discreet-icon switching on device.

## Acceptance Criteria

- Downstream team can build V1 without proprietary Grindr assets or trademarked feature names.
- Age gate, minors, NCII, sensitive-region handling, discreet-mode, health-field visibility covered by tests and safety-center docs.
- Subscriptions reconcile across platforms with webhooks.
- Precise location, DOB, identity attributes, and health-field values never leak to other users, analytics, or ad partners.
- Manual verification blockers resolved or remain launch-blocking flags.

## Open Questions

- Which regions require explicit consent flows for health fields under GDPR special-category / HIPAA-adjacent rules?
- Will V1 include video chat or only photo/text?
- What is the exact hostile-region list and governance for updates?
- Which ad networks can be integrated while preserving health-field isolation?
- Will V1 ship expiring-photo TTL?

## Build Plan

- Phase 1: auth, age gate, onboarding with identity/tags, grid, chat without match gate, photo upload.
- Phase 2: safety center — block/report/unmatch, NCII, sensitive-region detection, unsend, discreet-icon, data export, deletion.
- Phase 3: health fields with per-viewer visibility and regional compliance; favorites; filters.
- Phase 4: subscriptions, explore (city swap), consumables, webhook reconciliation.
- Phase 5: ad isolation, realtime hardening, push redaction, rate limiting, abuse analytics.
- Phase 6: accessibility, manual verification, regional compliance review, appeal flows.

## Next Steps

- Replace discovery URLs with verified first-party URLs.
- Engage trust & safety, legal, and LGBTQ+ community consultant for sensitive-region list and health-field compliance.
- Draft original tag library with legal/discrimination review.
