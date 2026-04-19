# CapCut-Style Clone Spec

> Metadata
> - Inspiration app: CapCut
> - Category: Creator tools, mobile video editing, photo editing, templates, effects, captions, AI editing, export, social sharing, and media licensing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, first-party help/support docs, first-party privacy/legal docs, and public product/developer/security references listed below.
> - Manual verification blockers: App Store/Play availability by region, signup/login, media import permissions, timeline gesture parity, caption accuracy, text-to-speech voices, music/effect licensing, template use, AI background/remove tools, export watermark/resolution gates, TikTok/social sharing, cloud project sync, subscription checkout, deletion/export, and support escalation still require lawful test devices/accounts, provider approvals, paid plans, hardware where applicable, and regional access before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, templates, media, sample data, AI prompts, automations, permission models, ranking systems, and provider integrations.

## Overview

Build an original mobile app inspired by CapCut's public workflow: multi-track video editor, trim/split/merge, speed curves, keyframes, chroma key, stabilization, auto captions, text-to-speech, background removal, templates, effects, filters, music/sound effects, export settings, cloud projects, and social sharing.

The clone must not copy CapCut branding, screenshots, marketing copy, protected UI artwork, proprietary assets, private APIs, internal ranking systems, unreleased behavior, paid content, or support scripts. Functional parity should be expressed through original product language, original or licensed assets, documented provider contracts, and explicit privacy/security boundaries.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag, blocked acceptance test, or non-parity fallback until lawful hands-on verification confirms native behavior and account-specific constraints.

## Goals

- Provide a mobile-first CapCut-inspired experience for multi-track video editor, trim/split/merge, speed curves, keyframes, chroma key, stabilization, auto captions, text-to-speech, background removal, templates, effects, filters, music/sound effects, export settings, cloud projects, and social sharing.
- Use exact first-party marketplace, help, privacy, terms, and product/developer/security URLs.
- Model account, content, sharing, notification, offline, entitlement, support, export, deletion, and audit behavior with deterministic owners and states.
- Preserve category trust expectations around user videos, likeness/voice rights, music/effect licensing, AI editing, templates, social sharing, minors/teen content, cloud drafts, ads/subscriptions, and regional availability.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a CapCut-branded product or imply affiliation with the inspiration app, its parent company, marketplace operators, creators, or integration partners.
- Do not scrape production services, reuse private APIs, replay network traffic, copy proprietary UI, import protected templates/media, or duplicate paid-plan names, prices, offers, or support copy.
- Do not use real user content, photos, videos, files, notes, tasks, calendar entries, home footage, payment details, account records, or customer metadata as seed data without explicit permission.
- Do not claim exact native, paid, account, notification, offline, AI, hardware, admin, export/delete, support, or regional parity until manual blockers are resolved.
- Do not build runtime app code in this repository; this repo remains a planning and specification workspace.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/capcut-photo-video-editor/id1500855883 | Official iOS listing, developer, category, age rating, platform support, privacy labels, in-app purchase disclosure, app positioning, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.lemon.lvoverseas | Official Android listing, package id, install/rating scale, data safety, in-app purchase disclosure where applicable, device support, and app positioning | Verified 2026-04-19 |
| Help Center | https://www.capcut.com/help | First-party support paths, feature docs, troubleshooting, account controls, and implementation blockers | Verified 2026-04-19 |
| Privacy Policy | https://www.capcut.net/clause/privacy | Personal data, content data, privacy controls, deletion/export, analytics, security, and regional disclosure requirements | Verified 2026-04-19 |
| Terms | https://www.capcut.com/clause/terms-of-service | User obligations, subscription/payment terms, acceptable use, content ownership, service limitations, and dispute/legal requirements | Verified 2026-04-19 |
| CapCut Product | https://www.capcut.com/ | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |
| Commercial Terms | https://www.capcut.com/clause/commercial-terms | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |
| Creator Tools | https://www.capcut.com/tools | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |
| Support Contact | https://www.capcut.com/contact | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support mobile-first project creation, media import, trim/split/merge, speed, keyframes, transitions, filters, effects, text, captions, audio, and export.
- AI editing features such as auto captions, background removal, text-to-speech, and template generation must be feature-flagged with provider, data-use, and safety controls.
- Every stock audio, effect, font, sticker, template, and sample asset must be original or licensed with creator-facing commercial-use metadata.
- Export must support resolution/fps/aspect choices, watermark/entitlement states, long-running progress, cancel/retry, and share-sheet handoff.
- Terms, privacy, app availability, and creator-content rights must be reviewed before accepting real user media or professional/client work.
- Account entry must support new, returning, expired-session, locked-account, underage/ineligible, region-blocked, provider-outage, and support-required states.
- Home surfaces must include empty, loading, personalized, offline, degraded provider, permission-limited, entitlement-limited, and signed-out variants.
- Settings must expose profile, privacy, notifications, connected providers, subscriptions, support, terms, privacy policy, data export, and account deletion.
- Entitlement logic must represent free, trial, paid, expired, canceled, refunded, platform-owned, web-owned, team-managed, unavailable, and region-blocked plan states without copying exact pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, sufficient contrast, reduced motion, keyboard/external input where relevant, and accessible alternatives for drag, timeline, map, media, or hardware controls.
- Manual verification required: native screen order, platform permission prompts, push payloads, billing restore/cancel, support handoff, export/delete, offline conflicts, and any paid/hardware/admin/provider-specific behavior.

### Build Plan

- Phase 1: implement auth shell, Project Home, Media Import, settings/privacy, seed data, and exact-source legal links with no proprietary assets.
- Phase 2: implement core objects (Project, MediaAsset, Timeline, Clip, Track), CRUD routes, search, notifications, offline cache, and permission-denied fallbacks.
- Phase 3: implement sharing/collaboration, provider/integration stubs, entitlement gates, support flows, export/delete, and audit logging.
- Phase 4: implement category-specific advanced surfaces for multi-track video editor, trim/split/merge, speed curves, keyframes, chroma key, stabilization, auto captions, text-to-speech, background removal, templates, effects, filters, music/sound effects, export settings, cloud projects, and social sharing behind feature flags and manual-verification blockers.
- Phase 5: complete accessibility, privacy/security review, contract tests, offline/realtime tests, billing tests, and manual verification before any parity claim.

## Core User Journeys

- New user installs the app, creates or signs into an account, accepts required terms, grants only action-triggered permissions, and reaches the primary CapCut home surface.
- Returning user opens the app, resumes the latest multi-track video editor context, completes the core action, and confirms sync state.
- User searches, filters, or browses recent content, opens a detail view, changes or shares the item, and later recovers it from history or search.
- User denies a requested permission, receives a working fallback, and can later re-enable the permission from settings without data loss.
- User loses connectivity during a write, sees local draft or queued-sync state, reconnects, and resolves duplicates or conflicts deterministically.
- User changes entitlement state through trial, paid, expired, canceled, refunded, or unavailable plan paths and sees accurate feature gates.
- User starts data export or account deletion, reviews ownership and shared-content consequences, confirms the request, and receives audit/support status.
- Support or admin user reviews a sensitive account, sharing, billing, safety, or policy issue with redacted evidence and append-only audit events.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Project Home | CapCut-specific workflow for project home | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Media Import | CapCut-specific workflow for media import | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Timeline Editor | CapCut-specific workflow for timeline editor | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Clip Inspector | CapCut-specific workflow for clip inspector | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Captions/Text | CapCut-specific workflow for captions/text | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Audio Library | CapCut-specific workflow for audio library | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Effects/Templates | CapCut-specific workflow for effects/templates | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| AI Tools | CapCut-specific workflow for ai tools | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Export/Share | CapCut-specific workflow for export/share | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Settings/Billing | CapCut-specific workflow for settings/billing | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |

## Data Model

- `User`: identity, auth providers, locale, accessibility settings, notification preferences, consent state, export/delete state, and support profile.
- `DeviceSession`: platform, app version, push token, local cache encryption state, permission state, and last sync cursor.
- `WorkspaceOrAccount`: owner/admin/member context, plan, region, policy controls, lifecycle state, and billing owner where relevant.
- `Project`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `MediaAsset`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Timeline`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Clip`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Track`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Effect`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Caption`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Voiceover`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Template`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `ExportJob`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `LicenseGrant`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `CloudSyncJob`: CapCut-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Notification`: event type, actor, target object, delivery channel, read state, deep link, retry metadata, and permission recheck result.
- `Entitlement`: free, trial, paid, platform-owned, web-owned, expired, canceled, refunded, team-managed, unavailable, and region-blocked states.
- `SupportCase`: user report, billing request, privacy request, policy issue, attachments, redaction state, SLA status, and resolution audit.
- `AuditEvent`: append-only record for auth, sharing, permission, billing, export, deletion, admin, AI/provider, and sensitive content changes.
- `LocalCacheRecord`: device-local reads, queued writes, offline edits, cache expiry, conflict markers, and corrupt-cache recovery metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth, recovery, SSO/provider state, blocked account, and device-scoped session controls.
- `GET /me`, `PATCH /me`, `GET /settings`, `PATCH /settings`: profile, locale, accessibility, notification, privacy, and support preferences with audit events for sensitive changes.
- `GET /projects`, `POST /projects`, `PATCH /projects/:id`, `DELETE /projects/:id`: CapCut projects lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /media`, `POST /media`, `PATCH /media/:id`, `DELETE /media/:id`: CapCut media lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /timeline`, `POST /timeline`, `PATCH /timeline/:id`, `DELETE /timeline/:id`: CapCut timeline lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /captions`, `POST /captions`, `PATCH /captions/:id`, `DELETE /captions/:id`: CapCut captions lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /audio`, `POST /audio`, `PATCH /audio/:id`, `DELETE /audio/:id`: CapCut audio lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /effects`, `POST /effects`, `PATCH /effects/:id`, `DELETE /effects/:id`: CapCut effects lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /templates`, `POST /templates`, `PATCH /templates/:id`, `DELETE /templates/:id`: CapCut templates lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /ai-tools`, `POST /ai-tools`, `PATCH /ai-tools/:id`, `DELETE /ai-tools/:id`: CapCut ai tools lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /exports`, `POST /exports`, `PATCH /exports/:id`, `DELETE /exports/:id`: CapCut exports lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /licenses`, `POST /licenses`, `PATCH /licenses/:id`, `DELETE /licenses/:id`: CapCut licenses lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /search?q=&filters=&cursor=`: permission-aware search with query redaction, result explanations, empty states, pagination, and stale-index labels.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed upload flow with MIME/size validation, malware/content scanning where relevant, cancellation, and retention policy.
- `GET /notifications`, `PATCH /notifications/:id`, `PATCH /notification-preferences`: in-app inbox, push/email preferences, read state, quiet hours, and permission checks on open.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/cancel`, `POST /billing/webhook`: server-owned entitlement transitions and delayed platform webhook handling.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`: data export, account deletion, legal hold, ownership transfer, shared-content caveats, async completion, and support status.
- `POST /support/cases`, `GET /support/cases/:id`: support intake with evidence redaction, privacy-safe attachments, escalation owner, and SLA/audit trail.

## Realtime, Push, And Offline Behavior

- Server-owned state changes for multi-track video editor, trim/split/merge, speed curves, keyframes, chroma key, stabilization, auto captions, text-to-speech, background removal, templates, effects, filters, music/sound effects, export settings, cloud projects, and social sharing must reconcile through websocket, SSE, push-triggered refetch, or polling fallback with missed-event recovery.
- Clients may cache home, recent objects, settings, entitlement summary, notifications, support status, and explicitly offline-enabled content with visible stale labels.
- Offline mode may preserve local drafts and low-risk edits, but must block irreversible deletes, billing changes, account deletion, public sharing, admin/security changes, unsafe AI/provider submissions, and hardware/regulated actions while disconnected.
- Queued writes must carry idempotency keys, local revision ids, retry state, and user-visible conflict resolution for duplicate, deleted, moved, permission-changed, or provider-rejected objects.
- Push notifications must be opt-in, category-controlled, quiet-hours aware, revocable, and mirrored in an in-app notification center when action history matters.
- Push payloads must minimize sensitive content and avoid raw private content, media titles, file names, task details, calendar text, home/video evidence, AI prompts, payment details, or support evidence unless explicitly allowed by the user.
- Long-running import, export, upload, AI, sync, billing, support, or hardware jobs must expose pending, running, complete, failed, canceled, expired, held, and retryable states.
- Reconnect must refetch canonical state, dedupe writes, preserve recoverable user drafts, and explain unrecoverable provider or permission failures.

## Permissions, Privacy, And Safety

- Request camera, microphone, photos, files, contacts, calendar, location, Bluetooth/local network, speech recognition, notifications, or motion permissions only when a user invokes a feature that needs them.
- Treat user videos, likeness/voice rights, music/effect licensing, AI editing, templates, social sharing, minors/teen content, cloud drafts, ads/subscriptions, and regional availability as launch-blocking privacy and security review areas with named owners before implementation starts.
- Analytics, logs, crash reports, and support tools must redact raw content, filenames, notes, tasks, calendar details, media, prompts, home/video evidence, payment data, access tokens, and precise location unless required for a user-approved support case.
- Sharing and collaboration must recheck authorization on every open, notification tap, export, download, preview, AI retrieval, and support/admin access.
- AI or automated features must disclose provider use, permission boundaries, usage limits, generated-output caveats, safety filters, feedback controls, and admin/guardian disablement where relevant.
- Uploads and imports must validate file type, size, malware risk, copyright/licensing status, metadata, and retention policy before processing.
- Public links, community features, templates, exported media, shared boards/files/photos/videos, and published content need report, takedown, abuse, copyright, impersonation, and private-data leakage controls.
- Data export and account deletion must explain shared-content copies, team/admin ownership, legal holds, billing ownership, provider revocation, and irreversible deletion windows.
- Launch owners: privacy owner for user content and data rights; security owner for permissions, sharing, auth, and integrations; category owner for multi-track video editor, trim/split/merge, speed curves, keyframes, chroma key, stabilization, auto captions, text-to-speech, background removal, templates, effects, filters, music/sound effects, export settings, cloud projects, and social sharing; billing owner for entitlements; legal owner for content/licensing/terms; accessibility owner for mobile interaction parity.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, home viewed, object created/edited/deleted, search performed, share started/completed, notification opened, permission denied, offline draft queued, sync recovered, export requested, account deletion requested, entitlement changed, support case created, and category-specific core action completed.
- Event properties must use object type, surface, feature flag, entitlement state, role, region bucket, error code, latency bucket, provider status, and coarse size/count buckets rather than raw user content.
- Collaboration analytics must separate invite sent, access requested, permission changed, comment/reaction, notification opened, conflict resolved, and admin policy applied without exposing collaborator identities in product analytics.
- Search analytics must bucket query length/type and filters, avoid raw query logging by default, and separate local, server, provider, and AI-assisted search modes.
- AI/provider analytics must capture feature type, provider, usage bucket, safety code, permission-source count bucket, success/failure, feedback state, and admin-disabled state without storing prompts/outputs in product analytics.
- Monetization may include original free, paid individual, team, enterprise, storage, AI, premium export, advanced permission, admin/security, support, or hardware-adjacent tiers after legal review.
- Any paid feature must disclose price, renewal, cancellation, refund/support path, platform ownership, entitlement delay, family/team ownership, regional availability, and data-use implications before checkout.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, expired session, locked account, provider outage, account transfer, deleted workspace, or missing entitlement.
- Object opens through a stale deep link after deletion, move, permission change, subscription expiry, region change, provider revoke, or admin policy update.
- Two collaborators edit the same object while one is offline or after one user loses access.
- Permission is denied, granted with limited scope, later revoked in OS settings, or unavailable because of parental/admin/device policy.
- Upload, import, export, AI, sync, billing, support, or hardware job is interrupted by app termination, low storage, battery optimization, network switch, token expiry, rate limit, or provider timeout.
- Search or recommendation returns stale, hidden, deleted, unsafe, unlicensed, region-blocked, or entitlement-blocked content.
- Shared content is copied, downloaded, saved by another user, exported, or retained by a provider after the owner deletes their original.
- Account deletion is requested by a billing owner, last admin, shared-content owner, legal-hold subject, active support-case owner, or user with pending export/import jobs.
- Manual verification finds native behavior that conflicts with this public-source V1 spec; implementation must prefer documented observed behavior and update this spec before launch.

## Test Plan

- Unit tests for validation, state machines, permission resolution, entitlement gates, idempotency keys, sync conflict detection, deletion/export rules, and privacy-safe analytics payload construction.
- Contract tests for every documented API route, including pagination, error codes, authorization denials, stale cursors, upload/export/import states, billing webhooks, and support case lifecycle.
- Integration tests for auth, onboarding, home load, core object CRUD, search/filter, detail view, share/permission changes, notifications, settings, support, data export, and account deletion.
- Realtime tests for duplicate events, missed events, reconnect, stale cursor, concurrent edit, permission change during open, token refresh, app foreground/background, and provider webhook delay.
- Offline tests for cached reads, queued drafts, blocked unsafe writes, corrupt cache, low storage, reconnect reconciliation, conflict UI, retry, discard, and local data wipe on logout/delete.
- Permission tests for denied, granted, limited, revoked, and admin/parent/device-blocked OS permission states.
- Privacy/security tests for analytics redaction, access rechecks, support redaction, public link leakage, shared-copy caveats, malware/content scans, account takeover recovery, and audit log completeness.
- Billing tests for free, trial, paid, expired, canceled, refunded, platform-owned, web-owned, team-managed, region-unavailable, and delayed webhook states.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, contrast, keyboard/external input, drag alternatives, and media/control alternatives.
- Manual verification tests: App Store/Play availability by region, signup/login, media import permissions, timeline gesture parity, caption accuracy, text-to-speech voices, music/effect licensing, template use, AI background/remove tools, export watermark/resolution gates, TikTok/social sharing, cloud project sync, subscription checkout, deletion/export, and support escalation.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary CapCut assets, private APIs, network traces, protected templates/media, internal ranking systems, or brand copy.
- New and returning users can complete onboarding, reach the primary home surface, perform the core action for multi-track video editor, trim/split/merge, speed curves, keyframes, chroma key, stabilization, auto captions, text-to-speech, background removal, templates, effects, filters, music/sound effects, export settings, cloud projects, and social sharing, recover from offline or provider failure, and confirm server state after reconnect.
- All documented entities have deterministic owners, lifecycle states, authorization rules, sync behavior, audit events, deletion/export handling, and support escalation paths.
- Sharing, notifications, offline behavior, entitlements, privacy controls, account deletion, data export, and support flows are represented in routes and tests.
- Category risks around user videos, likeness/voice rights, music/effect licensing, AI editing, templates, social sharing, minors/teen content, cloud drafts, ads/subscriptions, and regional availability are either implemented with mitigations or launch-blocked with owners.
- Manual verification blockers are either resolved with evidence or remain feature flags/blocking acceptance tests before parity claims.

## Open Questions

- Which V1 features are intentionally mobile-native versus web/provider handoff for CapCut?
- Which third-party providers will back auth, storage, search, notifications, billing, analytics, AI, media processing, maps/calendar, support, and export/delete workflows?
- Which exact paid, team, enterprise, hardware, regional, or regulated flows are in launch scope rather than blocked for later verification?
- What retention windows, audit obligations, and support SLAs should apply to user content, shared copies, deleted data, and support evidence?

## Next Steps

- Resolve manual verification blockers with lawful test accounts/devices and update this spec with observed native behavior.
- Create implementation tickets for the build plan phases, API contracts, seed data, privacy review, and acceptance tests.
- Confirm provider choices, data retention, deletion/export semantics, and entitlement rules before app implementation starts.
- Keep this spec linked from readiness and quality-audit summaries as implementation-ready public-source V1.
