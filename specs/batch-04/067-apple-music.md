# Apple Music-Style Clone Spec

> Metadata
> - Inspiration app: Apple Music
> - Category: Music/audio
> - Spec status: Draft 1, public-source research pass complete; hands-on account/device verification blocked unless noted.
> - Legal scope: functional parity research only; use original code, branding, copy, media, sample data, and licensed integrations.

## Overview
Build an original mobile product inspired by Apple Music's user-facing workflow, not its brand identity or proprietary implementation.
The clone target is: Library-first music app with albums, artists, radio, lyrics, downloads, spatial-audio-like labels, and playlists.
Primary product surface: home supported by search and catalog detail flows.
The implementation should preserve the interaction model users expect while replacing all marks, artwork, copy, content, ranking systems, and third-party data with original or licensed equivalents.
The spec intentionally separates verified public-source facts from inferred clone requirements.

## Goals
- Deliver a mobile-first music/audio experience with complete onboarding, core action, settings, and recovery flows.
- Implement the app-specific focus: Library-first music app with albums, artists, radio, lyrics, downloads, spatial-audio-like labels, and playlists.
- Provide enough product, data, API, privacy, analytics, and test detail for an engineering team to estimate and build a lawful clone.
- Make public-source verification and blocked hands-on research visible before implementation starts.
- Preserve a consistent spec shape across all 100 clone projects so future agents can compare, prioritize, and execute.

## Non-Goals
- Do not copy Apple Music branding, trade dress, logos, app icons, screenshots, marketing copy, or proprietary media.
- Do not use private APIs, scraped paywalled content, unlicensed catalog data, or reverse-engineered server contracts.
- Do not claim exact one-for-one behavior for any flow that has not been verified through lawful public or hands-on research.
- Do not implement production payments, regulated finance, clinical health advice, transport dispatch, or smart-home control without separate legal and platform review.
- Do not build the app in this repository; this repo remains a planning and specification workspace.

## Research Sources
- App Store source-discovery link: https://apps.apple.com/us/search?term=Apple%20Music
- Google Play source-discovery link: https://play.google.com/store/search?q=Apple%20Music&c=apps
- Official help/privacy source-discovery link: https://www.google.com/search?q=Apple%20Music%20official%20app%20help%20privacy
- Public listing items to verify: app description, category, screenshots, privacy labels, age rating, in-app purchases, latest release notes, and support/developer links.
- Public documentation items to verify: account model, subscription gates, deletion/export controls, safety policies, and support paths.
- Public review themes to collect: onboarding confusion, missing features, reliability complaints, pricing complaints, and retention drivers.
- Hands-on verification status: blocked for this pass; use a test device/account and document screen states before implementation.
- Research risk: source-discovery links may route through marketplace search; replace them with exact listing/help URLs during the next research pass.

## Detailed Design
- Onboarding: support guest, signup, returning-user, permission-primer, and blocked-region or blocked-account states as appropriate for music/audio.
- Home model: make Home the default returning-user surface with empty, loading, personalized, degraded-network, and signed-out variants.
- Core action: make Search the highest-priority creation or transaction flow and keep its primary action reachable within two taps from home.
- Detail surface: use Catalog Detail for preview, confirmation, or consumption states with clear ownership of saved, shared, unavailable, and error states.
- Notifications: support opt-in prompts, transactional notifications, preference categories, quiet hours, and revoked-permission fallback.
- Settings: include profile, privacy, notifications, subscriptions, support, terms, privacy policy, data export, and delete-account entry points.
- Entitlements: represent free, trial, paid, expired, refunded, and unavailable plan states without copying the inspiration app's pricing.
- Accessibility: support dynamic type, screen reader labels, visible focus, sufficient contrast, reduced motion, and captions/transcripts for media where applicable.
- The implementation must support catalog browse and search.
- The implementation must render creator, album, show, or title details.
- The implementation must provide player controls with durable position.
- The implementation must support queue, save, favorite, and library actions.
- The implementation must support downloads when licensed.
- The implementation must track entitlement and regional availability.
- The implementation must surface continue-watching/listening states.
- The implementation must support comments or reviews where relevant.
- The implementation must handle stream errors and DRM/licensing states.
- The implementation must separate licensed catalog from synthetic development data.
- The implementation must support parental or content controls where relevant.
- The implementation must preserve accessibility captions or transcript needs.

## Core User Journeys
- New user installs the app, reviews an original value proposition, creates an account, and reaches Home.
- Returning user opens Home, resumes the most recent meaningful activity, and completes the primary action in Search.
- User searches or browses from Player, opens Catalog Detail, saves or shares it, and later finds it again from history or library.
- User denies a requested permission, still receives a usable fallback, and can re-enable the permission from settings.
- User loses connectivity during the core flow, sees local state preserved, and can retry or safely discard the draft.
- User upgrades, downgrades, cancels, or expires an entitlement and sees the correct locked/unlocked product states.

## Screen Inventory
| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Entry, auth, and consent | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Home | Default returning-user surface | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Search | Primary creation or action flow | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Catalog Detail | Inspect, consume, or confirm item details | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Player | Find or filter content and actions | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Library | Identity, ownership, or sharing context | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Downloads | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Creator/Channel | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Comments/Reviews | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Settings | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |

## Data Model
- `User`: owns identity, preferences, locale, entitlements, consent, and deletion/export state.
- `CatalogItem`: represents the primary user-facing catalog object, ownership, availability, and display metadata.
- `Creator`: represents the main user-facing object in this clone's core flow.
- `Collection`: captures lifecycle state, ordering, timestamps, and failure reason codes.
- `PlaybackSession`: captures active workflow state, timestamps, metrics, pause/resume markers, and completion status.
- `QueueItem`: represents the primary user-facing catalog object, ownership, availability, and display metadata.
- `Download`: records notification, recommendation, or entitlement state.
- `Entitlement`: holds plan, trial, renewal, expiration, refund, and feature-access state.
- `Comment`: captures conversation content references, participants, moderation state, and delivery status.
- `RecommendationSlot`: holds derived analytics-safe state and sync metadata.
- `AuditEvent`: append-only server record for sensitive writes, account changes, moderation actions, and billing or entitlement transitions.
- `LocalCacheRecord`: device-local state for offline reads, queued writes, sync attempts, and conflict resolution metadata.

## API And Backend Contracts
- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions` with device-scoped session tracking.
- Reads: GET /users, GET /catalogitems, GET /creators, GET /collections, GET /playbacksessions; all reads return pagination, cache hints, authorization status, and stale-data indicators.
- Writes: POST /users, POST /catalogitems, POST /creators, POST /collections, POST /playbacksessions; all writes require validation errors, idempotency keys for user actions, and audit events for sensitive state changes.
- Search: `GET /search` accepts query, filters, cursor, locale, safe-mode, and entitlement context; returns empty-state copy keys rather than hard-coded UI copy.
- Upload/import: use signed upload URLs, MIME/size validation, malware or content scanning where relevant, and original asset licensing metadata.
- Realtime: expose websocket, SSE, or polling fallback for primary status updates; clients must handle missed events by refetching canonical state.
- Notifications: `POST /notification-preferences` and server-side fanout for transactional, reminder, marketing, and safety categories.
- Billing/entitlements: `GET /entitlements`, `POST /checkout/session`, and webhook-backed entitlement updates; never trust client-only subscription state.
- Privacy: `POST /data-export`, `DELETE /account`, and `GET /privacy/settings` must be available from settings and support flows.
- Admin/support: include internal review endpoints for reports, disputes, refund review, fraud holds, and policy decisions before production launch.

## Realtime, Push, And Offline Behavior
- Cache the home surface, recent detail pages, settings, entitlement state, and current in-progress action for offline reads.
- Queue low-risk drafts locally with retry metadata; block money movement, regulated actions, irreversible deletes, and unsafe submissions while offline.
- Push notifications must be opt-in, grouped by category, and mirrored in an in-app notification center when relevant.
- Realtime updates must be reconciled against server state after reconnect to avoid duplicate actions or stale status.
- Long-running tasks must expose pending, complete, failed, canceled, and expired states with recovery actions.
- Background work must tolerate app termination, OS permission changes, token expiry, and clock skew.

## Permissions, Privacy, And Safety
- Treat licensed media as a launch-blocking review area; document owner, mitigation, and test coverage before implementation.
- Treat copyright as a launch-blocking review area; document owner, mitigation, and test coverage before implementation.
- Treat content moderation as a launch-blocking review area; document owner, mitigation, and test coverage before implementation.
- Treat parental controls as a launch-blocking review area; document owner, mitigation, and test coverage before implementation.
- Treat download rights as a launch-blocking review area; document owner, mitigation, and test coverage before implementation.
- Request camera, microphone, photos, contacts, location, motion, Bluetooth, files, or notifications only at the moment the user invokes a feature needing it.
- Provide permission-denied fallbacks, settings education, and no dark patterns around consent.
- Minimize sensitive data in analytics, logs, crash reports, and support tooling.
- Provide user-visible privacy policy, terms, data export, delete account, report abuse, block/mute where relevant, and support escalation.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization
- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, `onboarding_skipped` with source, locale, and experiment ids.
- Core action events: `home_viewed`, `search_performed`, `detail_opened`, `primary_action_started`, `primary_action_completed`, `primary_action_failed` with object type and failure code.
- Retention events: `notification_opened`, `favorite_saved`, `history_opened`, `share_started`, `reminder_set`, `offline_recovered`.
- Safety events: `report_submitted`, `block_created`, `moderation_state_changed`, `privacy_setting_changed`, `data_export_requested`, `account_delete_requested`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_expired`.
- Monetization model: use original free/trial/paid entitlement rules; do not copy exact pricing, offers, bundle naming, or promotional copy from the inspiration app.
- Analytics rule: do not send raw user content, payment credentials, precise location, health entries, or private messages as event properties.

## Edge Cases
- First launch with no network, no account, or expired session.
- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.
- Duplicate taps, duplicate webhook delivery, retry after timeout, and stale optimistic UI.
- Deleted, suspended, blocked, expired, unavailable, region-locked, or entitlement-locked objects.
- Partial upload, interrupted download, corrupt cache, disk full, and app terminated during background work.
- Abuse and policy: spam, fraud, harassment, prohibited content, account takeover, and support escalation.

## Test Plan
- Unit tests for validation, state machines, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.
- Integration tests for auth, primary reads, primary writes, search, notification preferences, billing/entitlement transitions, and account deletion/export.
- Contract tests for every documented API response shape, error code, pagination behavior, and realtime reconciliation path.
- Offline tests for cached reads, queued drafts, blocked writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, and limited-access OS permission states.
- Safety tests for report submission, moderation state changes, blocked users, fraud holds, and policy warning copy.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, and media alternatives.
- Billing tests for trial, purchase, renewal, cancellation, refund, expiration, and unavailable entitlement states.
- Notification tests for opt-in, denied, revoked, quiet-hours, deep link, and in-app notification center behavior.
- Regression tests for every acceptance criterion before marking the spec implementation-ready.

## Acceptance Criteria
- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- Public source links are replaced with exact listing/help/privacy URLs or explicitly marked blocked before build start.
- A new user can complete onboarding and reach the default home surface without unsupported permissions.
- A returning user can complete the primary action, recover from a network failure, and confirm server state after reconnect.
- Search/browse, detail, save/share, notification, settings, support, and deletion/export flows are all represented in routes and tests.
- All data entities have owners, lifecycle states, authorization rules, and deletion/export behavior.
- At least 10 acceptance tests exist and cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, billing, notifications, data deletion/export, and regression behavior.

## Open Questions
- Which exact marketplace listing, help center, privacy policy, and support docs should be treated as canonical for this inspiration app?
- Which hands-on flows require a test account, paid subscription, region-specific availability, physical device, or regulated sandbox?
- Which third-party providers will supply maps, media, catalog, payment, identity, notification, analytics, or storage services for the original clone?
- Are any features intentionally out of scope for legal, safety, budget, or platform-policy reasons?

## Next Steps
- Replace source-discovery links with exact first-party URLs from a verified research session.
- Capture public screenshots, privacy-label notes, release notes, and user-review themes in a dedicated research note.
- Resolve open questions and update this spec before app implementation starts.
- Produce a build plan with route map, component map, API schema, seed data plan, and test checklist.
