# Snapchat-Style Clone Spec

> Metadata
> - Inspiration app: Snapchat
> - Category: Camera social
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support surfaces, first-party legal/privacy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signed-in account lifecycle, paid/entitlement flows, notification payloads, deletion/export completion, and region/device-specific behavior still require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, policies, ranking systems, media, and integrations.

## Overview

Build an original mobile product inspired by Snapchat's public workflow: camera-first capture, snaps, chat, stories, spotlight, lenses/filters, memories, friend map, streaks, subscriptions, My AI-style assistant blockers, privacy, and teen safety.

The clone must not copy Snapchat branding, screenshots, marketing copy, protected UI artwork, ranking systems, private APIs, proprietary data, marketplace assets, moderation tooling, or paid-plan names. The implementation can reproduce comparable user jobs and interaction patterns with original product language and licensed or first-party providers.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms exact native behavior.

## Goals

- Provide a mobile-first social product with onboarding, profile setup, feed/discovery, creation, reactions, comments or replies, notifications, messaging where relevant, settings, support, and account controls.
- Use original ranking, recommendation, moderation, and notification systems with licensed or first-party sample content.
- Preserve privacy, safety, reporting, block/mute, data access, deletion, teen/minor, and creator controls as first-class product requirements.
- Produce routes, entities, API contracts, offline behavior, analytics, and tests that a downstream implementation team can build without private APIs.

## Non-Goals

- Do not build a Snapchat-branded app or imply affiliation with Snapchat or its owner.
- Do not scrape production services, use private APIs, replay mobile network traffic, copy proprietary datasets, or bypass access controls.
- Do not copy plan names, prices, promotional copy, trust/safety labels, creator programs, or moderation decisions.
- Do not treat public listings as proof of exact native state machines; signed-in, paid, regional, notification, and device-specific behavior remains blocked until verified.
- Do not build runtime application code in this repository; this repo remains the planning and specification source of truth.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/snapchat/id447188370 | Official iOS listing, category, age rating, supported devices, privacy labels, in-app purchases, version notes, and support/privacy links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.snapchat.android | Official Android listing, package id, content rating, downloads, data safety, in-app purchases/ads, support contact, and public feature claims | Verified 2026-04-17 |
| Snapchat Support | https://help.snapchat.com/ | Public support entry point for accounts, camera, chat, stories, maps, privacy, safety, and subscriptions | Verified 2026-04-17 |
| Snap Privacy Center | https://help.snapchat.com/hc/en-us/articles/18522569739156-Privacy-Center | Privacy summary for collection, sharing, storage, controls, data download, and account deletion | Verified 2026-04-17 |
| Snap Terms | https://www.snap.com/en-US/terms | Service terms for Snapchat, Bitmoji, My AI, personalization, and account obligations | Verified 2026-04-17 |
| Snap Privacy Policy | https://values.snap.com/privacy/privacy-policy | Personal data processing, retention, advertising, rights, and controls | Verified 2026-04-17 |
| Snap Community Guidelines | https://values.snap.com/privacy/safety/safety-and-impact/community-guidelines | Community safety and content policy categories | Verified 2026-04-17 |
| Snap Safety Center | https://values.snap.com/safety/safety-center | Safety, family, teen, reporting, and wellbeing resources | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Snapchat as a camera-first app with snaps, lenses, filters, chat, group stories, video chat, stories, spotlight, discover, memories, map, subscriptions, ads, and in-app purchases.
- Camera launch must handle capture, upload fallback, lenses/filters, captions, stickers, drawings, recipients, story posting, memories save, and failed media export.
- Ephemeral messaging must model viewed, replayed, saved, screenshot-detected, expired, deleted, blocked, reported, and legally retained states without promising impossible privacy.
- Stories, Spotlight, and Discover must separate friend content, public creator content, recommended content, ads, age gates, and unavailable/reported media.
- Snap Map-style location sharing must be opt-in, audience-scoped, revocable, cached carefully, and disabled for users who have not granted precise location.
- Streaks, memories storage, paid subscription, and restore purchases must be represented as original entitlements and not copy plan names or pricing.
- My AI-style assistant features, face/AR lenses, teen safeguards, location sharing, private media retention, and discover moderation are launch-blocking review areas.
- Manual verification remains required for exact native camera behavior, screenshot notifications, location states, memories storage, subscription restore, push payloads, and My AI-style surfaces.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Keep all user-generated content, AI outputs, private messages, uploaded media, location, contacts, and payment state under explicit data ownership and deletion rules.
- Keep all recommendations and ranking behavior deterministic in test mode; production ranking must be independently designed and auditable.
- Treat public content differently from private content in storage, deletion, export, moderation, analytics, and support tooling.
- Model every external dependency as an adapter with feature flags, timeout behavior, provider-specific error mapping, and privacy review.
- Keep entitlement checks server-authoritative; the client may cache feature summaries but cannot grant paid or sensitive access alone.
- Store only normalized event codes in analytics and operational logs; raw prompts, posts, messages, media, contact lists, precise location, and payment details are disallowed.
- Provide support and safety tooling with role-based access, redaction, escalation reasons, and immutable audit events.
- Include localization, accessibility, age-gate, and regional availability states in route and API schemas.

## Core User Journeys

- New user installs the app, reviews original onboarding and legal/permission education, creates or restores an account, and reaches the default home surface.
- Returning user opens the app, resumes recent activity, completes the primary feed/create/discovery workflow, and sees state synchronize across sessions.
- User creates or uploads content, reviews validation and safety checks, publishes or saves a draft, and can edit/delete where the product model allows.
- User searches or browses, opens a detail view, saves/shares/reacts, and later finds the item from history, profile, library, or saved surfaces where relevant.
- User denies a requested permission and still receives a functional fallback with clear education for re-enabling the permission.
- User loses connectivity during a write, sees local state preserved, retries safely, and reconciles with canonical server state after reconnect.
- User reports content or behavior, blocks/mutes the actor, receives safety feedback, and can follow a support or appeal path.
- User upgrades, restores, cancels, expires, or loses entitlement access and sees the correct locked/unlocked product state.
- User requests data export or account deletion and sees confirmation, retention timing, cancellation options where available, and final status.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Camera | Entry, account creation, consent, and blocked-state education | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Send To | Send To workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Chat Thread | Chat Thread workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Stories | Stories workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Spotlight | Spotlight workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Discover | Discover workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Lens Carousel | Lens Carousel workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Memories | Memories workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Map | Map workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Profile | Profile workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Subscription | Subscription workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Privacy And Safety | Account, policy, support, and recovery controls | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |

## Data Model

- - `User`: identity, age gate, locale, region, account status, consent state, deletion/export state.
- - `DeviceSession`: platform, app version, auth token state, notification token, last active timestamp.
- - `Friendship`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Snap`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `MediaAsset`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `ChatMessage`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Story`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `SpotlightPost`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Lens`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Memory`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `LocationShare`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Entitlement`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `SafetyReport`: Snapchat-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `AuditEvent`: append-only sensitive account, privacy, billing, moderation, safety, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: device-scoped authentication with audit events and abuse throttles.
- `GET /me`, `PATCH /me`, `GET /settings`, `PATCH /settings`: account, profile, privacy, notification, and entitlement settings.
- `GET /feed?cursor=&filter=&mode=`: paginated primary surface with cache hints, authorization state, ranking explanation keys, and stale-data markers.
- `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`: content lifecycle with idempotency keys, validation, moderation prechecks, and deletion semantics.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed upload flow with MIME/size validation, malware scanning, rights metadata, and processing states.
- `POST /search`, `GET /search/suggestions`: query/search surface with filters, safe-mode, locale, cursor, and empty-state copy keys.
- `POST /reports`, `POST /blocks`, `POST /mutes`: trust-and-safety lifecycle with policy category, evidence references, user feedback, and moderator audit trails.
- `GET /notifications`, `PATCH /notification-preferences`: in-app and push notification preferences with categories, quiet hours, delivery state, and permission fallback.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: server-authoritative paid feature lifecycle with duplicate/refund/cancel/restore handling.
- `POST /data-export`, `DELETE /account`, `GET /privacy/requests/:id`: privacy workflows with confirmation, asynchronous status, retention notes, and support fallback.
- `GET /support/cases/:id`, `POST /support/cases`: support escalation with redaction, abuse controls, and account recovery states.

## Realtime, Push, And Offline Behavior

- Cache the default home surface, recent detail objects, settings, entitlement summary, and safe drafts for offline reads.
- Queue low-risk drafts locally with retry metadata; block irreversible privacy actions, paid transactions, destructive moderation, account deletion, and regulated or high-risk actions while offline.
- Realtime updates must reconcile against server state after reconnect to avoid duplicate writes, stale visibility, or entitlement drift.
- Uploads must resume or fail with visible recovery; partially uploaded or unscanned media cannot be published or processed by downstream providers.
- Push notifications must be opt-in, category-scoped, revocable, quiet-hour aware, and free of sensitive message, prompt, media, precise-location, or payment details by default.
- Background work must tolerate app termination, token expiry, OS permission revocation, clock skew, duplicate webhooks, and provider timeouts.
- Deleted, private, expired, blocked, muted, region-locked, age-restricted, and entitlement-locked objects must be removed or redacted consistently from caches and notifications.

## Permissions, Privacy, And Safety

- Treat ephemeral privacy expectations as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat minor safety as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat location safety as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat AR/face processing as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat discover moderation as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat private media retention as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat subscription storage limits as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Request camera, microphone, photos, contacts, location, notifications, files, clipboard, Bluetooth, or motion only when the user invokes a feature that needs it.
- Provide permission-denied fallbacks, settings education, no dark patterns, and no silent re-prompts.
- Provide user-visible privacy policy, terms, data export, delete account, report abuse, block/mute, and support escalation paths.
- Minimize sensitive data in analytics, crash reports, model/provider logs, support tooling, and moderation queues.
- Redact or hash private identifiers in logs; store raw content only where needed for product function, legal obligation, or user-requested support.
- Include age, teen/minor, region, regulated content, and accessibility review before launch.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Track privacy-safe lifecycle events: onboarding started/completed, home viewed, search performed, detail opened, create started/completed/failed, report submitted, block/mute created, privacy setting changed, export requested, delete requested, entitlement state changed.
- Every event must use stable object types and failure codes, not raw user-visible text, prompts, messages, media URLs, contact data, precise location, payment credentials, or private identifiers.
- Monetization can include original free, trial, paid, creator, ad, or premium tiers where relevant, but names, prices, bundles, benefits, and promotional copy must be original.
- Paywall states must identify blocked feature, current entitlement, restore path, platform owner, server confirmation state, and support path.
- Ads or recommendations must separate targeting signals from sensitive content and must expose opt-out or privacy controls where required.
- Billing tests must cover app-store-owned, web-owned, restored, expired, canceled, refunded, grace-period, family/shared where applicable, and unavailable states.

## Edge Cases

- First launch offline, unsupported OS, blocked region, underage user, expired session, suspended account, compromised account, or service outage.
- Permission denied, permission revoked in OS settings, limited photo library access, microphone/camera interruption, and location downgrade from precise to approximate.
- Duplicate taps, duplicate webhooks, retry after timeout, stale optimistic UI, stale cache, corrupt cache, and app termination during upload or background sync.
- Deleted, private, blocked, muted, suspended, age-restricted, region-locked, entitlement-locked, reported, removed, or unavailable objects.
- User requests export/deletion while subscription, moderation review, support case, upload, or legal retention is active.
- Abuse and policy: spam, harassment, impersonation, fraud, self-harm, sexual exploitation, minors, illegal goods, copyright violation, and support escalation.

## Test Plan

- Unit tests for validation, state machines, visibility rules, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.
- Contract tests for every documented API response shape, error code, pagination behavior, upload state, realtime resume path, privacy request, and webhook idempotency rule.
- Integration tests for auth, default home load, primary read/write, search, detail open, create/publish/delete, report/block/mute, notification preferences, billing restore, data export, and account deletion.
- Offline tests for cached reads, queued drafts, blocked sensitive writes, reconnect reconciliation, corrupt-cache recovery, and deleted-object cache cleanup.
- Permission tests for denied, granted, revoked, limited, and unavailable OS permission states.
- Safety tests for every launch-blocking risk area plus report submission, enforcement decisions, appeal/support escalation, and policy copy keys.
- Privacy tests for data minimization, export, deletion, account closure, analytics redaction, support redaction, retention windows, and cache purge.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and unavailable entitlements.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, captions/alt text where relevant, color contrast, and keyboard/external input on tablets.
- Manual verification tests for native iOS screenshots, native Android screenshots, paid purchase/restore, push payloads, signed-in account settings, deletion/export completion, and region/device-specific behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary Snapchat assets, private APIs, network traffic, brand copy, ranking systems, or moderation tooling.
- New and returning users can complete onboarding, primary workflow, settings, support, report/block or safety action, and data/account lifecycle paths.
- All documented entities have ownership, authorization, lifecycle states, visibility rules, deletion/export behavior, and audit coverage.
- Realtime, offline, upload, notification, billing, privacy, safety, and support behavior have deterministic API contracts and failure codes.
- Category-specific launch blockers are either resolved with evidence or remain behind explicit feature flags and acceptance-test blockers.
- Manual verification blockers are preserved until lawful hands-on evidence confirms exact native behavior.

## Open Questions

- Which downstream implementation repository, framework, and provider stack will own this clone?
- Which first-party sources should be rechecked immediately before build start because mobile listings and help pages change frequently?
- Which paid, account-linked, age-gated, regional, notification, or device-specific flows can be lawfully verified with available test accounts/devices?
- Which features should be deferred if legal, safety, moderation, provider, or platform-policy review cannot be completed before V1?

## Build Plan

- Phase 1: scaffold app shell, auth/session model, default home surface, primary read API, settings/legal links, privacy-safe analytics, and accessibility baseline.
- Phase 2: add primary creation or conversation flow, upload/media validation where relevant, detail screens, local drafts, and offline cache/reconnect behavior.
- Phase 3: add search/discovery, saved/history/library/profile surfaces, notifications, support/report/block/mute flows, and moderation state machines.
- Phase 4: add privacy controls, data export, account deletion, retention jobs, audit events, and support redaction.
- Phase 5: add entitlements, paywall states, checkout/restore/webhooks, ads or creator monetization where relevant, and billing regression tests.
- Phase 6: complete category-risk mitigations, accessibility pass, performance/offline validation, policy review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party help/legal URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
