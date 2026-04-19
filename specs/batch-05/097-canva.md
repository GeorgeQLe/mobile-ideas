# Canva-Style Clone Spec

> Metadata
> - Inspiration app: Canva
> - Category: Creator tools, graphic design, photo/video editing, templates, AI design, brand kits, team collaboration, publishing, education controls, and content licensing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, first-party help/support docs, first-party privacy/legal docs, and public product/developer/security references listed below.
> - Manual verification blockers: signup/login, editor gestures, template licensing, upload permissions, real-time collaboration, comments, Brand Hub, AI generation/editing, education eligibility and age controls, social scheduler, public publish links, export formats/watermarks, subscription checkout, data export/delete, copyright reports, and support escalation still require lawful test devices/accounts, provider approvals, paid plans, hardware where applicable, and regional access before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, templates, media, sample data, AI prompts, automations, permission models, ranking systems, and provider integrations.

## Overview

Build an original mobile app inspired by Canva's public workflow: design editor, templates, photos/videos, presentations, social posts, resumes, logos, docs, whiteboards, Visual Suite, Magic Studio AI, brand hub, scheduler, real-time collaboration, content library, education controls, and subscriptions.

The clone must not copy Canva branding, screenshots, marketing copy, protected UI artwork, proprietary assets, private APIs, internal ranking systems, unreleased behavior, paid content, or support scripts. Functional parity should be expressed through original product language, original or licensed assets, documented provider contracts, and explicit privacy/security boundaries.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag, blocked acceptance test, or non-parity fallback until lawful hands-on verification confirms native behavior and account-specific constraints.

## Goals

- Provide a mobile-first Canva-inspired experience for design editor, templates, photos/videos, presentations, social posts, resumes, logos, docs, whiteboards, Visual Suite, Magic Studio AI, brand hub, scheduler, real-time collaboration, content library, education controls, and subscriptions.
- Use exact first-party marketplace, help, privacy, terms, and product/developer/security URLs.
- Model account, content, sharing, notification, offline, entitlement, support, export, deletion, and audit behavior with deterministic owners and states.
- Preserve category trust expectations around uploaded media, licensed templates/assets, AI-generated content, brand/team permissions, education/minor controls, public publishing, social scheduling, payments, and copyright reports.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Canva-branded product or imply affiliation with the inspiration app, its parent company, marketplace operators, creators, or integration partners.
- Do not scrape production services, reuse private APIs, replay network traffic, copy proprietary UI, import protected templates/media, or duplicate paid-plan names, prices, offers, or support copy.
- Do not use real user content, photos, videos, files, notes, tasks, calendar entries, home footage, payment details, account records, or customer metadata as seed data without explicit permission.
- Do not claim exact native, paid, account, notification, offline, AI, hardware, admin, export/delete, support, or regional parity until manual blockers are resolved.
- Do not build runtime app code in this repository; this repo remains a planning and specification workspace.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/canva-ai-video-photo-editor/id897446215 | Official iOS listing, developer, category, age rating, platform support, privacy labels, in-app purchase disclosure, app positioning, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.canva.editor | Official Android listing, package id, install/rating scale, data safety, in-app purchase disclosure where applicable, device support, and app positioning | Verified 2026-04-19 |
| Help Center | https://www.canva.com/help/ | First-party support paths, feature docs, troubleshooting, account controls, and implementation blockers | Verified 2026-04-19 |
| Privacy Policy | https://www.canva.com/policies/privacy-policy/ | Personal data, content data, privacy controls, deletion/export, analytics, security, and regional disclosure requirements | Verified 2026-04-19 |
| Terms | https://www.canva.com/policies/terms-of-use/ | User obligations, subscription/payment terms, acceptable use, content ownership, service limitations, and dispute/legal requirements | Verified 2026-04-19 |
| Legal Trust Center | https://www.canva.com/trust/legal/ | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |
| AI Product Terms | https://www.canva.com/policies/magic-studio-terms/ | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |
| Education | https://www.canva.com/education/ | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |
| Developers | https://www.canva.dev/ | Public product, developer, pricing, AI, security, or feature documentation used to scope V1 requirements | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support template discovery, design creation, multi-page editing, text/media/elements, photo/video editing, comments, sharing, export, and team workspaces.
- AI design tools must require prompt safety, provenance metadata where supported, content policy checks, usage limits, feedback, and admin/education controls.
- Template, stock media, font, audio, and element usage must carry original or licensed content metadata and commercial-use restrictions.
- Brand and team controls must support brand kits, roles, comments, approval, public link settings, and enterprise/education policies.
- Exports and publishing must support format/size/background choices, watermark/entitlement gates, social scheduling handoff, and takedown/report workflows.
- Account entry must support new, returning, expired-session, locked-account, underage/ineligible, region-blocked, provider-outage, and support-required states.
- Home surfaces must include empty, loading, personalized, offline, degraded provider, permission-limited, entitlement-limited, and signed-out variants.
- Settings must expose profile, privacy, notifications, connected providers, subscriptions, support, terms, privacy policy, data export, and account deletion.
- Entitlement logic must represent free, trial, paid, expired, canceled, refunded, platform-owned, web-owned, team-managed, unavailable, and region-blocked plan states without copying exact pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, sufficient contrast, reduced motion, keyboard/external input where relevant, and accessible alternatives for drag, timeline, map, media, or hardware controls.
- Manual verification required: native screen order, platform permission prompts, push payloads, billing restore/cancel, support handoff, export/delete, offline conflicts, and any paid/hardware/admin/provider-specific behavior.

### Build Plan

- Phase 1: implement auth shell, Home/Templates, Design Editor, settings/privacy, seed data, and exact-source legal links with no proprietary assets.
- Phase 2: implement core objects (Design, Page, Element, Template, MediaAsset), CRUD routes, search, notifications, offline cache, and permission-denied fallbacks.
- Phase 3: implement sharing/collaboration, provider/integration stubs, entitlement gates, support flows, export/delete, and audit logging.
- Phase 4: implement category-specific advanced surfaces for design editor, templates, photos/videos, presentations, social posts, resumes, logos, docs, whiteboards, Visual Suite, Magic Studio AI, brand hub, scheduler, real-time collaboration, content library, education controls, and subscriptions behind feature flags and manual-verification blockers.
- Phase 5: complete accessibility, privacy/security review, contract tests, offline/realtime tests, billing tests, and manual verification before any parity claim.

## Core User Journeys

- New user installs the app, creates or signs into an account, accepts required terms, grants only action-triggered permissions, and reaches the primary Canva home surface.
- Returning user opens the app, resumes the latest design editor context, completes the core action, and confirms sync state.
- User searches, filters, or browses recent content, opens a detail view, changes or shares the item, and later recovers it from history or search.
- User denies a requested permission, receives a working fallback, and can later re-enable the permission from settings without data loss.
- User loses connectivity during a write, sees local draft or queued-sync state, reconnects, and resolves duplicates or conflicts deterministically.
- User changes entitlement state through trial, paid, expired, canceled, refunded, or unavailable plan paths and sees accurate feature gates.
- User starts data export or account deletion, reviews ownership and shared-content consequences, confirms the request, and receives audit/support status.
- Support or admin user reviews a sensitive account, sharing, billing, safety, or policy issue with redacted evidence and append-only audit events.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home/Templates | Canva-specific workflow for home/templates | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Design Editor | Canva-specific workflow for design editor | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Photo Editor | Canva-specific workflow for photo editor | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Video Editor | Canva-specific workflow for video editor | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| AI Magic Studio | Canva-specific workflow for ai magic studio | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Brand Hub | Canva-specific workflow for brand hub | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Content Library | Canva-specific workflow for content library | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Share/Publish | Canva-specific workflow for share/publish | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Team Comments | Canva-specific workflow for team comments | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |
| Settings/Billing | Canva-specific workflow for settings/billing | taps, forms, deep links, permissions, account context | empty, loading, loaded, offline, read-only, signed-out | permission denied, stale sync, entitlement blocked, deleted object, provider error |

## Data Model

- `User`: identity, auth providers, locale, accessibility settings, notification preferences, consent state, export/delete state, and support profile.
- `DeviceSession`: platform, app version, push token, local cache encryption state, permission state, and last sync cursor.
- `WorkspaceOrAccount`: owner/admin/member context, plan, region, policy controls, lifecycle state, and billing owner where relevant.
- `Design`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Page`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Element`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Template`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `MediaAsset`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `BrandKit`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Comment`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `ShareLink`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `AiGeneration`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `ExportJob`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `ContentLicense`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `TeamWorkspace`: Canva-specific object with owner, lifecycle, authorization, sync version, privacy classification, and audit metadata.
- `Notification`: event type, actor, target object, delivery channel, read state, deep link, retry metadata, and permission recheck result.
- `Entitlement`: free, trial, paid, platform-owned, web-owned, expired, canceled, refunded, team-managed, unavailable, and region-blocked states.
- `SupportCase`: user report, billing request, privacy request, policy issue, attachments, redaction state, SLA status, and resolution audit.
- `AuditEvent`: append-only record for auth, sharing, permission, billing, export, deletion, admin, AI/provider, and sensitive content changes.
- `LocalCacheRecord`: device-local reads, queued writes, offline edits, cache expiry, conflict markers, and corrupt-cache recovery metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth, recovery, SSO/provider state, blocked account, and device-scoped session controls.
- `GET /me`, `PATCH /me`, `GET /settings`, `PATCH /settings`: profile, locale, accessibility, notification, privacy, and support preferences with audit events for sensitive changes.
- `GET /designs`, `POST /designs`, `PATCH /designs/:id`, `DELETE /designs/:id`: Canva designs lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /editor`, `POST /editor`, `PATCH /editor/:id`, `DELETE /editor/:id`: Canva editor lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /templates`, `POST /templates`, `PATCH /templates/:id`, `DELETE /templates/:id`: Canva templates lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /media`, `POST /media`, `PATCH /media/:id`, `DELETE /media/:id`: Canva media lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /brand`, `POST /brand`, `PATCH /brand/:id`, `DELETE /brand/:id`: Canva brand lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /comments`, `POST /comments`, `PATCH /comments/:id`, `DELETE /comments/:id`: Canva comments lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /sharing`, `POST /sharing`, `PATCH /sharing/:id`, `DELETE /sharing/:id`: Canva sharing lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /ai`, `POST /ai`, `PATCH /ai/:id`, `DELETE /ai/:id`: Canva ai lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /exports`, `POST /exports`, `PATCH /exports/:id`, `DELETE /exports/:id`: Canva exports lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /teams`, `POST /teams`, `PATCH /teams/:id`, `DELETE /teams/:id`: Canva teams lifecycle with pagination, validation, authorization, idempotency keys, stale-data indicators, and audit metadata.
- `GET /search?q=&filters=&cursor=`: permission-aware search with query redaction, result explanations, empty states, pagination, and stale-index labels.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed upload flow with MIME/size validation, malware/content scanning where relevant, cancellation, and retention policy.
- `GET /notifications`, `PATCH /notifications/:id`, `PATCH /notification-preferences`: in-app inbox, push/email preferences, read state, quiet hours, and permission checks on open.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/cancel`, `POST /billing/webhook`: server-owned entitlement transitions and delayed platform webhook handling.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`: data export, account deletion, legal hold, ownership transfer, shared-content caveats, async completion, and support status.
- `POST /support/cases`, `GET /support/cases/:id`: support intake with evidence redaction, privacy-safe attachments, escalation owner, and SLA/audit trail.

## Realtime, Push, And Offline Behavior

- Server-owned state changes for design editor, templates, photos/videos, presentations, social posts, resumes, logos, docs, whiteboards, Visual Suite, Magic Studio AI, brand hub, scheduler, real-time collaboration, content library, education controls, and subscriptions must reconcile through websocket, SSE, push-triggered refetch, or polling fallback with missed-event recovery.
- Clients may cache home, recent objects, settings, entitlement summary, notifications, support status, and explicitly offline-enabled content with visible stale labels.
- Offline mode may preserve local drafts and low-risk edits, but must block irreversible deletes, billing changes, account deletion, public sharing, admin/security changes, unsafe AI/provider submissions, and hardware/regulated actions while disconnected.
- Queued writes must carry idempotency keys, local revision ids, retry state, and user-visible conflict resolution for duplicate, deleted, moved, permission-changed, or provider-rejected objects.
- Push notifications must be opt-in, category-controlled, quiet-hours aware, revocable, and mirrored in an in-app notification center when action history matters.
- Push payloads must minimize sensitive content and avoid raw private content, media titles, file names, task details, calendar text, home/video evidence, AI prompts, payment details, or support evidence unless explicitly allowed by the user.
- Long-running import, export, upload, AI, sync, billing, support, or hardware jobs must expose pending, running, complete, failed, canceled, expired, held, and retryable states.
- Reconnect must refetch canonical state, dedupe writes, preserve recoverable user drafts, and explain unrecoverable provider or permission failures.

## Permissions, Privacy, And Safety

- Request camera, microphone, photos, files, contacts, calendar, location, Bluetooth/local network, speech recognition, notifications, or motion permissions only when a user invokes a feature that needs them.
- Treat uploaded media, licensed templates/assets, AI-generated content, brand/team permissions, education/minor controls, public publishing, social scheduling, payments, and copyright reports as launch-blocking privacy and security review areas with named owners before implementation starts.
- Analytics, logs, crash reports, and support tools must redact raw content, filenames, notes, tasks, calendar details, media, prompts, home/video evidence, payment data, access tokens, and precise location unless required for a user-approved support case.
- Sharing and collaboration must recheck authorization on every open, notification tap, export, download, preview, AI retrieval, and support/admin access.
- AI or automated features must disclose provider use, permission boundaries, usage limits, generated-output caveats, safety filters, feedback controls, and admin/guardian disablement where relevant.
- Uploads and imports must validate file type, size, malware risk, copyright/licensing status, metadata, and retention policy before processing.
- Public links, community features, templates, exported media, shared boards/files/photos/videos, and published content need report, takedown, abuse, copyright, impersonation, and private-data leakage controls.
- Data export and account deletion must explain shared-content copies, team/admin ownership, legal holds, billing ownership, provider revocation, and irreversible deletion windows.
- Launch owners: privacy owner for user content and data rights; security owner for permissions, sharing, auth, and integrations; category owner for design editor, templates, photos/videos, presentations, social posts, resumes, logos, docs, whiteboards, Visual Suite, Magic Studio AI, brand hub, scheduler, real-time collaboration, content library, education controls, and subscriptions; billing owner for entitlements; legal owner for content/licensing/terms; accessibility owner for mobile interaction parity.

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
- Manual verification tests: signup/login, editor gestures, template licensing, upload permissions, real-time collaboration, comments, Brand Hub, AI generation/editing, education eligibility and age controls, social scheduler, public publish links, export formats/watermarks, subscription checkout, data export/delete, copyright reports, and support escalation.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary Canva assets, private APIs, network traces, protected templates/media, internal ranking systems, or brand copy.
- New and returning users can complete onboarding, reach the primary home surface, perform the core action for design editor, templates, photos/videos, presentations, social posts, resumes, logos, docs, whiteboards, Visual Suite, Magic Studio AI, brand hub, scheduler, real-time collaboration, content library, education controls, and subscriptions, recover from offline or provider failure, and confirm server state after reconnect.
- All documented entities have deterministic owners, lifecycle states, authorization rules, sync behavior, audit events, deletion/export handling, and support escalation paths.
- Sharing, notifications, offline behavior, entitlements, privacy controls, account deletion, data export, and support flows are represented in routes and tests.
- Category risks around uploaded media, licensed templates/assets, AI-generated content, brand/team permissions, education/minor controls, public publishing, social scheduling, payments, and copyright reports are either implemented with mitigations or launch-blocked with owners.
- Manual verification blockers are either resolved with evidence or remain feature flags/blocking acceptance tests before parity claims.

## Open Questions

- Which V1 features are intentionally mobile-native versus web/provider handoff for Canva?
- Which third-party providers will back auth, storage, search, notifications, billing, analytics, AI, media processing, maps/calendar, support, and export/delete workflows?
- Which exact paid, team, enterprise, hardware, regional, or regulated flows are in launch scope rather than blocked for later verification?
- What retention windows, audit obligations, and support SLAs should apply to user content, shared copies, deleted data, and support evidence?

## Next Steps

- Resolve manual verification blockers with lawful test accounts/devices and update this spec with observed native behavior.
- Create implementation tickets for the build plan phases, API contracts, seed data, privacy review, and acceptance tests.
- Confirm provider choices, data retention, deletion/export semantics, and entitlement rules before app implementation starts.
- Keep this spec linked from readiness and quality-audit summaries as implementation-ready public-source V1.
