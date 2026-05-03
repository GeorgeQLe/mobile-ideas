# LumaFusion-Style Clone Spec

> Metadata
> - Inspiration app: LumaFusion
> - Category: Photo/video editing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public first-party product, help/support, privacy, terms, and official product pages listed below; native marketplace listing IDs and privacy-label details remain manual verification blockers.
> - Manual verification blockers: native iOS/Android screen capture, marketplace listing IDs, app-store privacy labels and release notes, account lifecycle walkthrough, paid subscription or quota state, push notification prompts, media/file permission prompts, provider integrations, camera or hardware integrations, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, proprietary presets/filters/effects/templates/stickers/music/model weights, private APIs, customer media, marketplace assets, licensed stock, and unlicensed training or evaluation datasets.

## Overview

Build an original mobile photo/video editing product inspired by LumaFusion's public product and policy materials. V1 focuses on professional multitrack mobile editing, media library, timeline, audio/video effects, project export, and paid-app/feature gates. The clone must use original branding, original UI copy, original sample media, licensed providers/assets, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support media import, canvas/timeline editing, effect application, asset selection, preview, export, and share workflows with offline-safe drafts and clear retry/recovery behavior.
- Preserve boundaries between user content, generated or edited output, provider telemetry, analytics, support logs, and billing records.
- Implement free, trial, paid, expired, restored, refunded, quota-exhausted, platform-owned, and unavailable entitlement states without copying exact pricing, plan names, or promotional copy.
- Include export/delete, report abuse, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, asset, AI, media, subscription, copyright, child-safety, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with LumaFusion or its publisher.
- Do not copy proprietary presets, filters, brush engines, templates, stickers, music catalogs, model weights, marketplace assets, screenshots, icons, brand names, rankings, or private API shapes.
- Do not send production user prompts, photos, videos, drawings, face data, files, audio, or workspace content to any third-party provider without explicit consent and a documented data-processing path.
- Do not present generated, edited, enhanced, restored, or source-backed output as professional, medical, legal, financial, scientific, therapeutic, educational, or safety-critical advice.
- Do not enable autonomous external publication, purchases, account changes, or regulated workflows without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://luma-touch.com/lumafusion/ | Public LumaFusion product positioning, editor workflow, feature surfaces, and account/subscription framing | Verified 2026-05-03 |
| Help/support | https://luma-touch.helpscoutdocs.com/ | Public support taxonomy for app usage, subscriptions, exports, troubleshooting, and native behavior to verify | Verified 2026-05-03 |
| Privacy policy | https://luma-touch.com/privacy-policy/ | Media, account, device, analytics, provider, retention, and user-rights handling | Verified 2026-05-03 |
| Terms/legal | https://luma-touch.com/terms-of-use/ | User content, subscriptions, AI/media tools, acceptable use, and legal boundaries | Verified 2026-05-03 |
| Native marketplace listings | Manual verification required | Canonical App Store/Google Play listing IDs, privacy labels, data safety, release notes, age ratings, and in-app purchase labels | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out preview, account creation, login/recovery, blocked-region state, blocked-account state, and entitlement-unavailable state.
- The home surface must expose recent projects/drafts, templates or starters, a primary create action, and degraded offline/account states.
- The create flow must support camera/photo-library/file import, crop/resize, canvas or timeline setup, undo/redo, save draft, export, share, and delete controls.
- Editing must support non-destructive or explicitly confirmed destructive actions, before/after preview, export format choices, watermark/metadata handling, and recoverable local/cloud drafts.
- Tool surfaces must model filters, effects, retouching, text, stickers, templates, music/audio where relevant, AI/provider jobs where relevant, and locked/quota states.
- Asset and provider surfaces must show licensing, attribution, commercial-use restrictions, moderation status, and entitlement requirements.
- Account settings must include privacy policy, terms, notification preferences, subscription restore/manage, support, data export, delete account, and media/AI data-use controls where supported.
- Entitlements must handle free, trial, paid, expired, canceled, refunded, restored, quota-exhausted, store-owned, web-owned, team/enterprise, and unavailable states.
- Analytics must avoid raw prompts, generated answers, uploaded media, face geometry, photos/videos, drawings, transcripts, payment credentials, exact contacts, and child data.
- Abuse reporting must cover infringing content, non-consensual edits, impersonation, unsafe AI output, harassment, sexual content, child-safety issues, and fraud.
- Uploaded person/product/media rights, AI commercial-use disclosures, background/object edits, batch media retention, subscription quotas, and export metadata require explicit controls.
- Manual verification required: native purchase/restore, exact permission prompts, background export, push notifications, store privacy labels, platform-specific share sheets, and hardware/camera companion behavior.

## Core User Journeys

- New user opens the app, reviews consent and data-use notices, signs in or continues with the allowed preview path, and reaches the home/create surface.
- Returning user resumes a recent draft project, completes the primary workflow, and exports or saves the result.
- User imports or attaches content only after the relevant permission prompt and sees processing, failure, and removal states.
- User applies a premium model, tool, preset, template, music asset, brush, effect, or quota-limited feature and sees a clear entitlement state.
- User uses before/after or timeline preview, adjusts the edit stack, and can undo, redo, duplicate, rename, or delete work.
- User loses connectivity during editing/export and can preserve the draft, retry safely, or reconcile duplicated work after reconnect.
- User reports unsafe, incorrect, infringing, private, non-consensual, or abusive output and receives a durable report state.
- User requests export/delete and can remove account data, drafts, uploads, generated/edited outputs, support cases, and billing references where legally deletable.
- Manual verification required: app-store subscription purchase/restore, permission prompts, push notifications, share extensions, and exact mobile UI states.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth | Account entry and consent | sign in, sign up, SSO, continue | signed-out, loading, authenticated | blocked region, blocked account, offline |
| Home / Studio | Recent work and primary entry | create, resume, search | empty, personalized, loading | stale cache, entitlement unavailable |
| Create / Import | Start media workflow | camera, photo, video, file | idle, importing, ready | permission denied, unsupported type, oversized file |
| Editor / Canvas | Main editing workspace | tools, gestures, layers | drafting, processing, saved | provider timeout, tool unavailable, corrupt draft |
| Timeline / Sequence | Video or multi-asset editing | clips, trim, split, reorder | empty, loaded, rendering | dropped frames, codec unsupported, audio drift |
| Tool / Effect Picker | Capability routing | mode, effect, model, preset | available, selected | plan locked, provider down, region locked |
| Asset Library | Templates, presets, stickers, audio | browse, search, select | loaded, filtered | license unavailable, removed asset |
| Preview / Result | Inspect output before save/share | compare, playback, export | complete, partial, watermarked | unsafe output, low quality, missing source |
| Project Detail | Manage saved work | rename, duplicate, delete | loaded, archived | sync conflict, retention hold |
| Export / Share | Output and publication | format, destination, metadata | ready, exporting, shared | failed upload, rights warning, metadata leak |
| Subscription / Quota | Plans and usage state | upgrade, restore, manage | free, trial, paid | refund, expired, store mismatch |
| Safety / Reports | Abuse and correctness feedback | report, reason, block | submitted, reviewed | duplicate report, urgent escalation |
| Settings / Privacy | Account and data controls | toggles, export, delete | loaded, pending request | delete blocked by billing/support hold |
| Notifications | Push and in-app notices | opt in, categories | enabled, denied | token expired, deep link stale |
| Support | Help and case tracking | search, contact, case | open, pending, resolved | attachment redacted, SLA unavailable |

## Data Model

- `User`: identity, locale, age/region gates, auth providers, consent state, deletion/export state, and support flags.
- `AccountSession`: device id, platform, token state, last active time, revocation reason, and suspicious-login markers.
- `Project`: owner, title, source type, draft state, retention policy, pinned/archive/deleted state, and export eligibility.
- `CanvasDocument`: content reference, edit/generation status, tool/model metadata, safety labels, asset refs, and deletion state.
- `TimelineSequence`: ordered clips, tracks, transitions, audio offsets, render settings, draft state, and conflict version.
- `ImportAsset`: photo/video/file/prompt/source refs, MIME type, dimensions, EXIF state, scan state, extraction state, license, and retention.
- `ToolCapability`: provider or local engine, feature category, input limits, output formats, safety category, availability, and entitlement requirement.
- `EditOperation`: tool id, parameters, before/after refs, undo group, destructive flag, processing state, and audit refs.
- `GenerationJob`: provider route, request id, status, retry count, timeout, error class, quota impact, and output refs.
- `AssetLicense`: template/preset/sticker/brush/music/source owner, usage scope, commercial-use flag, attribution, expiry, and takedown state.
- `ExportJob`: destination, format, dimensions, quality, metadata policy, watermark state, progress, and failure reason.
- `Entitlement`: plan class, trial, renewal, cancellation, refund, quota counters, store owner, team/workspace scope, and feature gates.
- `SafetyReport`: target object, reason, severity, submitted evidence, moderation state, reviewer notes, and appeal state.
- `NotificationPreference`: category, channel, quiet hours, token status, and consent timestamp.
- `AuditEvent`: import, edit, generation, asset use, export, billing, support, safety, privacy, and admin events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle.
- `GET /projects`, `POST /projects`, `GET /projects/:id`, `PATCH /projects/:id`, and `DELETE /projects/:id`.
- `POST /imports/uploads`, `PUT /imports/uploads/:id/content`, `GET /imports/:id`, and `DELETE /imports/:id`.
- `GET /tools`, `GET /tools/:id`, and `POST /tools/:id/preview` for capability and entitlement-aware routing.
- `POST /edit-jobs`, `GET /edit-jobs/:id`, `POST /edit-jobs/:id/cancel`, and `POST /edit-jobs/:id/commit`.
- `POST /generation-jobs`, `GET /generation-jobs/:id/events`, and `POST /generation-jobs/:id/cancel` where AI features are in scope.
- `GET /assets`, `GET /assets/:id/license`, `POST /assets/:id/use`, and `POST /assets/:id/report`.
- `POST /exports`, `GET /exports/:id`, `POST /exports/:id/share`, and `DELETE /exports/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, and `POST /billing/webhook`.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id`.
- `GET /support/articles`, `POST /support/cases`, and `GET /support/cases/:id`.
- `POST /reports`, `GET /reports/:id`, and `POST /reports/:id/appeal` for copyright, unsafe output, impersonation, and abuse reports.

## Realtime, Push, And Offline Behavior

- Drafts, selected tools, local edit stacks, timeline state, and export settings cache locally with explicit size, retention, and purge rules.
- Long-running AI/edit/render/export jobs use polling, SSE, or websocket fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows opening cached drafts and low-risk local edits but blocks provider calls, publication, billing changes, irreversible deletes, and unsafe reports.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether quota or credits were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to export completion, account/security, subscription, support, collaboration, and moderation states.
- Background export, upload, camera capture, video render, and cloud sync behavior is `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached prompts, uploads, originals, previews, generated outputs, edited exports, timelines, and asset manifests purge on logout, account delete, retention expiry, workspace policy change, or legal hold.

## Permissions, Privacy, And Safety

- Request camera, microphone, speech recognition, photo library, files, clipboard, contacts/share sheet, notifications, local network, Bluetooth, or workspace OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw prompts, answers, citations, photos, videos, drawings, face geometry, EXIF, transcripts, files, audio, or exports in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports must strip or let users control EXIF, GPS, face tags, camera serials, filenames, embedded captions, and private metadata before export/share.
- AI, beauty, face, body, object, background, restoration, and identity edits must block non-consensual sexualization, child imagery, deepfake impersonation, doxxing, harassment, and illegal content.
- Generated or edited output must show that results can be inaccurate, synthetic, altered, or rights-limited before consequential or commercial use.
- Asset libraries must preserve source, license, attribution, commercial-use, takedown, and region restrictions in project and export metadata.
- Music/audio handling must separate user-owned imports, platform-provided tracks, licensed stock, and blocked copyrighted media.
- Support access to prompts, originals, uploads, drafts, exports, and account data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, originals, uploads, drafts, edit stacks, generated outputs, exports, reports, support cases, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, import started/completed, tool selected, edit applied, render completed/failed, export completed, report submitted, export/delete requested, and paywall viewed.
- Event properties must use coarse file type classes, tool categories, model capability class, latency buckets, error codes, output dimensions buckets, render-duration buckets, and entitlement state only.
- Monetization may gate premium tools, higher quotas, batch exports, cloud sync, stock/templates, music/audio, AI generation, high-resolution output, watermark removal, team features, or priority processing.
- Billing must handle app-store, web, team/workspace, trial, paid, expired, canceled, refunded, restored, unavailable, and quota-exhausted states.
- Paywalls must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content.

## Edge Cases

- User imports a huge file, unsupported format, corrupt image/video, low-storage clip, DRM-protected media, or media with sensitive EXIF/location.
- Provider outage after the user submits an edit, generation, enhancement, restoration, render, or export job but before output is persisted.
- User cancels processing after credits or quota are consumed.
- Tool, model, preset, brush, template, sticker, music, or asset becomes unavailable, renamed, region-locked, or takedown-blocked between draft and export.
- Generated or edited output includes unsafe, infringing, non-consensual, misleading, or missing-attribution content.
- Draft is deleted on one device while another device is exporting, rendering, or processing it.
- Subscription renews, refunds, or expires while a premium export, render, or generation is in progress.
- Account/team policy disables AI, cloud sync, commercial assets, music, or public sharing after content has been cached locally.
- Camera, photo library, files, microphone, clipboard, or notifications are revoked in OS settings mid-flow.
- User requests export/delete while processing jobs, reports, support cases, or billing disputes remain active.
- Uploaded media appears to contain child data, health data, financial documents, private keys, third-party confidential material, or copyrighted assets.
- User attempts to use generated/edited output for identity deception, financial/scientific claims, regulated advertising, unauthorized commercial use, or non-consensual publication.

## Test Plan

- Unit tests for project state machines, idempotency keys, entitlement checks, quota counters, provider error mapping, and analytics redaction.
- Unit tests for import validation, MIME/size/codec limits, EXIF policy, scan states, retention flags, and deletion/export eligibility.
- Unit tests for edit stack undo/redo, timeline trim/split/reorder, destructive-confirmation gates, asset license propagation, watermark state, and export metadata policy.
- Contract tests for auth, projects, imports, tools, edit jobs, generation jobs, assets/licenses, exports, billing, privacy, support, and reports.
- Integration tests for onboarding -> import/create -> edit/render -> preview -> export/share -> delete.
- Integration tests for permission denied, granted, revoked, limited photo access, oversized files, unsupported inputs, provider timeouts, and render failures.
- Offline tests for cached drafts, local edits, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for hallucination/source disclaimers where applicable, face/body/media abuse, non-consensual edits, child-safety prompts, copyright reports, and moderation states.
- Billing tests for trial, purchase, restore, renewal, refund, expiration, region unavailable, quota exhausted, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, EXIF/GPS stripping, prompt/log scrubbing, export, delete, and retention expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts, non-gesture alternatives, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, subscription purchase/restore, push notifications, camera/photo/file behavior, background processing, and region-specific availability.

## Acceptance Criteria

- All source-discovery links are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed assets.
- Onboarding, home/studio, import/create, editor/canvas, timeline where applicable, tool/effect picker, asset library, preview/result, export/share, settings, support, safety report, export/delete, and entitlement screens are specified.
- Prompt/media/import/export/provider/billing/support/analytics data boundaries are documented and testable.
- Offline draft recovery and reconnect reconciliation are covered without allowing unsafe provider, billing, publication, or irreversible operations while offline.
- Safety tests cover hallucinations or source claims where relevant, face/body/media abuse, non-consensual edits, copyright reports, generated-content attribution, music/asset licensing, and commercial-use warnings.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions, devices, permissions, marketplace labels, camera/hardware integration, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, import failure, quota exhaustion, offline recovery, export/delete, billing restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace listing IDs and app-store privacy labels should be treated as canonical after native verification?
- Which provider(s) will power AI, image/video processing, media storage, moderation, stock/template libraries, billing, analytics, and notifications in the original implementation?
- Which prompts, uploads, originals, drafts, generated outputs, edit operations, asset refs, and exports are retained for product improvement, support, abuse prevention, or legal obligations?
- Which regions, ages, teams, schools, or enterprise policies should block or alter feature availability?
- Which generated-content attribution, watermarking, license, citation, or disclosure rules are required by platform policy or local law?
- Which hands-on flows require paid access, workspace/admin access, special hardware, background permissions, camera integrations, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace URLs, source notes, provider choices, legal names, and feature flags for all manual blockers.
- Phase 2: Implement auth, home/studio, import/create, editor/canvas shell, timeline where applicable, project history, settings, and support routes.
- Phase 3: Add tool/model routing, asset library, edit/generation/render jobs, preview/result states, quota states, and provider error handling.
- Phase 4: Add offline draft recovery, reconnect reconciliation, notification preferences, export/delete, report handling, and audit events.
- Phase 5: Add billing/restore, privacy controls, analytics redaction, provider retention controls, accessibility, media safety, copyright/music checks, and policy tests.
- Phase 6: Run lawful hands-on native verification and remove or preserve blockers with dated evidence before parity claims.

## Next Steps

- Capture native app-store listing IDs, privacy labels, release notes, and permission prompts during a lawful device verification session.
- Select original providers for media processing, AI generation, moderation, storage, billing, analytics, notifications, licensed music, and asset libraries.
- Keep presets, brushes, templates, stickers, sample prompts, generated examples, and seed media original to the clone implementation.
- Extend the Phase 5 implementation-plan queue after this spec range is incorporated into the broader readiness pipeline.
