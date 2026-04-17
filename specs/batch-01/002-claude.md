# Claude-Style Clone Spec

> Metadata
> - Inspiration app: Claude
> - Category: AI assistant
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support surfaces, first-party legal/privacy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signed-in account lifecycle, paid/entitlement flows, notification payloads, deletion/export completion, and region/device-specific behavior still require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, policies, ranking systems, media, and integrations.

## Overview

Build an original mobile product inspired by Claude's public workflow: long-form assistant workflows for writing, analysis, coding, research, visual reasoning, file review, projects, artifacts-style outputs, voice dictation, conversation organization, and privacy controls.

The clone must not copy Claude branding, screenshots, marketing copy, protected UI artwork, ranking systems, private APIs, proprietary data, marketplace assets, moderation tooling, or paid-plan names. The implementation can reproduce comparable user jobs and interaction patterns with original product language and licensed or first-party providers.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms exact native behavior.

## Goals

- Provide a mobile-first assistant with conversation history, streaming output, attachments, voice entry, account settings, subscription state, and data controls.
- Keep provider, prompt, model, voice, memory, and personalization behavior original unless licensed through a documented integration.
- Represent safety controls for hallucination, self-harm, minors, abusive automation, sexual content, high-stakes advice, and emotional overdependence.
- Produce routes, entities, API contracts, offline behavior, analytics, and tests that a downstream implementation team can build without private APIs.

## Non-Goals

- Do not build a Claude-branded app or imply affiliation with Claude or its owner.
- Do not scrape production services, use private APIs, replay mobile network traffic, copy proprietary datasets, or bypass access controls.
- Do not copy plan names, prices, promotional copy, trust/safety labels, creator programs, or moderation decisions.
- Do not treat public listings as proof of exact native state machines; signed-in, paid, regional, notification, and device-specific behavior remains blocked until verified.
- Do not build runtime application code in this repository; this repo remains the planning and specification source of truth.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/claude/id6473753684 | Official iOS listing, category, age rating, supported devices, privacy labels, in-app purchases, version notes, and support/privacy links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.anthropic.claude | Official Android listing, package id, content rating, downloads, data safety, in-app purchases/ads, support contact, and public feature claims | Verified 2026-04-17 |
| Claude Help Center | https://support.claude.com/en/ | Public support entry point for account, mobile, billing, troubleshooting, and feature documentation | Verified 2026-04-17 |
| Anthropic Consumer Privacy Center | https://privacy.claude.com/en/collections/10663362-consumers | Consumer data handling, retention, model-improvement controls, export, delete, dictation, location, and privacy settings | Verified 2026-04-17 |
| Anthropic Consumer Terms | https://www.anthropic.com/legal/consumer-terms | Consumer account, subscription, app-store billing, acceptable access, and termination obligations | Verified 2026-04-17 |
| Anthropic Privacy Policy | https://www.anthropic.com/legal/privacy | Personal data processing, rights, retention, and controller obligations | Verified 2026-04-17 |
| Anthropic Usage Policy | https://www.anthropic.com/legal/aup | Safety and prohibited-use categories for AI output and abuse prevention | Verified 2026-04-17 |
| Claude Status | https://status.anthropic.com/ | Operational dependency and incident visibility for degraded service states | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Claude as an AI assistant for writing, coding, research, translation, visual analysis, file understanding, voice dictation, and multi-device productivity.
- The V1 must support conversational threads, streaming answers, attachment upload, image/file analysis, conversation rename/delete, response feedback, and recoverable provider errors.
- Project/workspace knowledge, artifacts-style generated outputs, and integrations must be represented as optional capability modules with clear account and entitlement gates.
- Voice dictation must request microphone access at point of use and persist transcripts only under the user's selected conversation/data policy.
- Consumer privacy controls must include model-improvement preference, data export, account deletion, conversation deletion, and support escalation.
- Subscription states must distinguish free, paid, max-style higher limit, team/work-managed, app-store-managed, expired, canceled, restored, and unavailable states without copying plan names or pricing.
- Safety policy must intercept high-risk advice, self-harm, sexual content, minor safety, harassment, deception, cyber abuse, and illegal facilitation before provider invocation.
- Manual verification remains required for exact iOS/Android navigation, subscription restore, push behavior, file picker behavior, dictation behavior, and enterprise/team account differences.

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
- Returning user opens the app, resumes recent activity, completes the primary conversation/search workflow, and sees state synchronize across sessions.
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
| Welcome/Auth | Entry, account creation, consent, and blocked-state education | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Assistant Home | Assistant Home workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Chat Thread | Chat Thread workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Attachment And File Picker | Attachment And File Picker workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Voice Dictation | Voice Dictation workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Projects/Knowledge | Projects/Knowledge workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Artifacts Preview | Artifacts Preview workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| History Search | History Search workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Privacy Controls | Privacy Controls workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Subscription | Subscription workflow and recovery states | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |
| Support And Safety | Account, policy, support, and recovery controls | taps, text, media, permissions, deep links | empty, loading, loaded, signed-out, restricted | denied permission, offline, stale data, blocked entitlement, unavailable content |

## Data Model

- - `User`: identity, age gate, locale, region, account status, consent state, deletion/export state.
- - `DeviceSession`: platform, app version, auth token state, notification token, last active timestamp.
- - `Conversation`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Message`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Attachment`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `ProjectSpace`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `GeneratedArtifact`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `VoiceDraft`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `PrivacySetting`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `Entitlement`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `SafetyReport`: Claude-specific lifecycle, ownership, authorization, sync, visibility, moderation, and deletion/export metadata.
- - `AuditEvent`: append-only sensitive account, privacy, billing, moderation, safety, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: device-scoped authentication with audit events and abuse throttles.
- `GET /me`, `PATCH /me`, `GET /settings`, `PATCH /settings`: account, profile, privacy, notification, and entitlement settings.
- `GET /threads?cursor=&filter=&mode=`: paginated primary surface with cache hints, authorization state, ranking explanation keys, and stale-data markers.
- `POST /messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: content lifecycle with idempotency keys, validation, moderation prechecks, and deletion semantics.
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

- Treat AI output safety as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat minor access as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat attachment scanning as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat model-cost abuse as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat privacy retention as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat workspace data leakage as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat subscription entitlement drift as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
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
- A downstream team can build the V1 without proprietary Claude assets, private APIs, network traffic, brand copy, ranking systems, or moderation tooling.
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
