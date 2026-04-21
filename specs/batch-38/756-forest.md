# Forest-Style Clone Spec

> Metadata
> - Inspiration app: Forest
> - Category: Tasks and project management
> - Readiness status: Draft 1
> - Verification basis: public marketplace/source-discovery links only; exact first-party URL replacement and hands-on verification are still required.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, subscription or payment state, permission prompts, push notifications, provider integrations, and region-specific behavior require lawful test evidence before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, media, policies, and integrations.

## Overview

Build an original mobile product inspired by Forest's public user-facing workflow. The clone focus is: Workspace/object creation, search, sharing, sync/offline conflict handling, import/export, permissions, and subscription state

This Draft 1 spec reserves ID 756 in the 1000-app backlog. It provides enough structure for downstream research, estimation, and lawful implementation planning, but it is not implementation-ready until exact first-party URLs replace source-discovery links and app-specific public evidence is added.

## Goals

- Deliver a mobile-first tasks and project management experience with onboarding, primary workflow, settings, support, and recovery flows.
- Reproduce the functional job behind Forest using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Forest branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, ranking systems, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not implement production payments, regulated services, medical advice, transport dispatch, smart-home control, or real-money game economies without separate legal/platform review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Discovery URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/search?term=Forest | iOS listing, category, age rating, privacy labels, release notes, support links | Source discovery -- pending exact URL verification |
| Google Play | https://play.google.com/store/search?q=Forest&c=apps | Android listing, content rating, data safety, feature blurbs | Source discovery -- pending exact URL verification |
| Official website/help search | https://www.google.com/search?q=Forest%20official%20app%20help%20privacy%20terms | Help center, privacy, terms, support, subscription, safety, and product docs to replace with first-party URLs | Source discovery -- pending exact URL verification |

## Detailed Design

- Onboarding must support guest, signup, returning-user, permission-primer, and blocked-account states appropriate for tasks and project management.
- Home must default to Home/Workspace with empty, loading, personalized, degraded-network, and signed-out variants.
- The primary action must be reachable from Create/Edit within two taps from home.
- Detail/Preview must represent preview, confirmation, or consumption state with saved, shared, unavailable, and error variants.
- Settings must include profile, privacy, notifications, subscriptions, support, terms, privacy policy, data export, and delete-account entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, and captions/transcripts where relevant.
- Offline behavior must preserve recoverable drafts and block irreversible or regulated writes until the client has canonical server state.

## Core User Journeys

- New user installs, reviews an original value proposition, creates or restores an account, and reaches Home/Workspace.
- Returning user opens Home/Workspace, resumes the latest meaningful state, and completes the primary action in Create/Edit.
- User searches or browses, opens Detail/Preview, saves or shares the item, and later finds it again from history or library.
- User denies a requested permission, receives a functional fallback, and can re-enable the permission from settings.
- User loses connectivity during the core flow, sees local state preserved, and can retry, reconcile, or safely discard the draft.
- User upgrades, downgrades, cancels, or expires an entitlement and sees correct locked/unlocked states.
- User requests support, submits a report or dispute where relevant, and receives a durable case state.
- User requests data export and account deletion from settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Entry, auth, and consent | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Home/Workspace | Default returning-user surface | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Create/Edit | Primary creation/action flow | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Detail/Preview | Inspect, consume, or confirm details | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Search | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Share | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Sync/Activity | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Templates/Library | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Permissions | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |
| Settings | Supporting workflow and recovery | taps, forms, deep links | empty, loading, loaded, signed-out | denied permission, offline, stale data, blocked entitlement |

## Data Model

- `User`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Workspace`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Document`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Asset`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Project`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Version`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `ShareGrant`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Template`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `SyncJob`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `Notification`: stores lifecycle state, authorization boundaries, audit metadata, deletion/export behavior, and sync state for Forest-style workflows.
- `AuditEvent`: append-only record for sensitive writes, account changes, support actions, moderation decisions, and entitlement transitions.
- `LocalCacheRecord`: device-local state for offline reads, queued writes, sync attempts, conflict resolution, and cache expiry.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions` with device-scoped session tracking.
- Reads: GET /users, GET /workspaces, GET /documents, GET /assets, GET /projects; all reads return authorization status, pagination, cache hints, stale-data markers, and localization keys.
- Writes: POST /users, POST /workspaces, POST /documents, POST /assets, POST /projects; all writes require validation errors, idempotency keys, optimistic-state reconciliation, and audit events for sensitive state.
- Search: `GET /search` accepts query, filters, cursor, locale, safe-mode, and entitlement context.
- Upload/import: use signed upload URLs, MIME/size validation, malware/content scanning where relevant, and original asset licensing metadata.
- Realtime: expose websocket, SSE, or polling fallback for primary status updates; clients must refetch canonical state after missed events.
- Notifications: `POST /notification-preferences` and server-side fanout for transactional, reminder, marketing, and safety categories.
- Billing/entitlements: `GET /entitlements`, `POST /checkout/session`, and webhook-backed entitlement updates; never trust client-only subscription state.
- Privacy: `POST /data-export`, `DELETE /account`, and `GET /privacy/settings` must be available from settings and support flows.
- Admin/support: include internal review endpoints for reports, disputes, refund review, fraud holds, and policy decisions before production launch.

## Realtime, Push, And Offline Behavior

- Cache the home surface, recent detail pages, settings, entitlement state, and current in-progress action for offline reads.
- Queue low-risk drafts locally with retry metadata; block money movement, regulated actions, irreversible deletes, and unsafe submissions while offline.
- Push notifications must be opt-in, grouped by category, and mirrored in an in-app notification center when relevant.
- Realtime updates must reconcile against server state after reconnect to avoid duplicate actions or stale status.
- Long-running tasks must expose pending, complete, failed, canceled, and expired states with recovery actions.
- Background work must tolerate app termination, OS permission changes, token expiry, and clock skew.

## Permissions, Privacy, And Safety

- Treat data loss as a launch-blocking review area with owner, mitigation, and acceptance tests before implementation.
- Treat permission leakage as a launch-blocking review area with owner, mitigation, and acceptance tests before implementation.
- Treat copyrighted assets as a launch-blocking review area with owner, mitigation, and acceptance tests before implementation.
- Treat collaboration access as a launch-blocking review area with owner, mitigation, and acceptance tests before implementation.
- Treat device security as a launch-blocking review area with owner, mitigation, and acceptance tests before implementation.
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
- Monetization model: use original free/trial/paid entitlement logic; do not copy exact pricing, bundle naming, or promotional copy from the inspiration app.
- Analytics rule: do not send raw user content, payment credentials, precise location, health entries, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, no account, expired session, or unsupported OS version.
- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.
- Duplicate taps, duplicate webhook delivery, retry after timeout, and stale optimistic UI.
- Deleted, suspended, blocked, expired, unavailable, region-locked, or entitlement-locked objects.
- Partial upload, interrupted download, corrupt cache, disk full, and app terminated during background work.
- Abuse and policy: spam, fraud, harassment, prohibited content, account takeover, and support escalation.
- Subscription restored on a different platform, refunded externally, or unavailable in the user's region.
- Legal/privacy request submitted while transactions, messages, or support cases are still active.

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
- Public source-discovery links are replaced with exact listing/help/privacy URLs or explicitly marked blocked before build start.
- A new user can complete onboarding and reach the default home surface without unsupported permissions.
- A returning user can complete the primary action, recover from a network failure, and confirm server state after reconnect.
- Search/browse, detail, save/share, notification, settings, support, and deletion/export flows are represented in routes and tests.
- All data entities have owners, lifecycle states, authorization rules, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, billing, notifications, data deletion/export, and regression behavior.

## Open Questions

- Which exact marketplace listing, help center, privacy policy, and support docs should be treated as canonical for this inspiration app?
- Which hands-on flows require a test account, paid subscription, region-specific availability, physical device, regulated sandbox, or provider credentials?
- Which third-party providers will supply maps, media, catalog, payment, identity, notification, analytics, AI, or storage services for the original clone?
- Are any features intentionally out of scope for legal, safety, budget, or platform-policy reasons?

## Build Plan

- Phase 1: Replace source-discovery rows with exact first-party URLs and classify each requirement as verified or inferred.
- Phase 2: Define route map, component map, domain entities, API schema, permissions, analytics schema, and seed-data policy.
- Phase 3: Build onboarding, home, primary action, detail, search, settings, support, and entitlement shells with original copy and sample data.
- Phase 4: Add backend contracts, offline/retry handling, notification preferences, data export/delete, and safety/reporting flows.
- Phase 5: Complete accessibility, privacy, safety, billing, permission, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Replace source-discovery links with exact first-party URLs from a verified research session.
- Capture public screenshots, privacy-label notes, release notes, support docs, and user-review themes in a dedicated research note without committing proprietary media.
- Resolve open questions and update this spec before downstream implementation starts.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest after the spec reaches implementation-ready V1.
