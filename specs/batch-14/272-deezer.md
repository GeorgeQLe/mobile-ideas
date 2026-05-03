# Deezer-Style Clone Spec

> Metadata
> - Inspiration app: Deezer
> - Category: Music and audio
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public first-party product, help/support, privacy, terms, and official product pages listed below; native marketplace listing IDs and privacy-label details remain manual verification blockers.
> - Manual verification blockers: native iOS/Android screen capture, marketplace listing IDs, app-store privacy labels and release notes, account lifecycle walkthrough, paid subscription or quota state, permission prompts, push notifications, provider integrations, creator/platform integrations, playback or render background behavior, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, proprietary presets/effects/templates/music/catalog data/model weights, private APIs, customer media, marketplace assets, licensed stock, and unlicensed training or evaluation datasets.

## Overview

Build an original mobile music/audio product inspired by Deezer's public product and policy materials. V1 focuses on music catalog discovery, playback queue, library/favorites, downloads/offline, Flow-style recommendations, subscriptions, and rights gates. The clone must use original branding, original UI copy, original sample media, licensed providers/assets, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support catalog discovery, playback, library management, downloads/offline where licensed, recommendations, rights-aware sharing, and device integration with clear retry/recovery behavior.
- Preserve boundaries between user content, edited output, provider telemetry, analytics, support logs, rights/licensing records, and billing records.
- Implement free, ad-supported where relevant, trial, paid, expired, restored, refunded, quota-exhausted, platform-owned, and unavailable entitlement states without copying exact pricing, plan names, or promotional copy.
- Include export/delete, report abuse, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, asset, catalog, rights, recommendation, subscription, device-integration, child-safety, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with Deezer or its publisher.
- Do not copy proprietary presets, effects, templates, audio catalogs, editorial rankings, recommendation models, screenshots, icons, brand names, or private API shapes.
- Do not send production user prompts, photos, videos, audio, transcripts, files, listening history, face/voice data, or workspace content to any third-party provider without explicit consent and a documented data-processing path.
- Do not present generated, edited, enhanced, captioned, transcribed, recommended, or source-backed output as professional, medical, legal, financial, scientific, therapeutic, educational, or safety-critical advice.
- Do not enable autonomous external publication, purchases, account changes, public creator actions, or regulated workflows without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.deezer.com/ | Public Deezer product positioning, workflow, feature surfaces, and account/subscription framing | Verified 2026-05-03 |
| Help/support | https://support.deezer.com/ | Public support taxonomy for app usage, subscriptions, exports/playback, troubleshooting, and native behavior to verify | Verified 2026-05-03 |
| Privacy policy | https://www.deezer.com/legal/personal-datas | Media, account, device, analytics, provider, retention, rights, and user-rights handling | Verified 2026-05-03 |
| Terms/legal | https://www.deezer.com/legal/cgu | User content, subscriptions, media/catalog tools, acceptable use, and legal boundaries | Verified 2026-05-03 |
| Native marketplace listings | Manual verification required | Canonical App Store/Google Play listing IDs, privacy labels, data safety, release notes, age ratings, and in-app purchase labels | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out preview, account creation, login/recovery, blocked-region state, blocked-account state, and entitlement-unavailable state.
- The home surface must expose recent listening, recommendations or stations, search, library entry points, and degraded offline/account states.
- Catalog discovery must model albums, tracks, artists, playlists, stations, podcasts, shows, live channels, editorial shelves, and unavailable-region states as applicable.
- Playback must support queue state, now-playing controls, background audio, remote controls, history, favorites, downloads/offline where allowed, and rights-expired behavior.
- Library surfaces must support saved items, playlists/stations, follows, downloads, purchase/download state where relevant, and sync conflict recovery.
- Creator/artist/channel surfaces must preserve rights, attribution, explicit content, takedown state, fan interactions, purchase/merch/payment blockers where relevant, and region/licensing constraints.
- Account settings must include privacy policy, terms, notification preferences, subscription restore/manage, support, data export, delete account, and listening-data controls where supported.
- Entitlements must handle free, ad-supported, trial, paid, expired, canceled, refunded, restored, family/student/Prime/bundle, store-owned, web-owned, and unavailable states.
- Analytics must avoid raw precise location, child data, payment credentials, private listening notes, contact lists, support attachments, and unredacted account identifiers.
- Abuse reporting must cover infringing uploads, impersonation, harmful creator content, explicit-content labeling, harassment, fraudulent purchases, and rights disputes.
- Licensed media, editorial rankings, recommendation models, radio schedules, podcast feeds, artist payouts, downloads, and device integrations require explicit provider/legal controls.
- Manual verification required: native subscription purchase/restore, exact playback background behavior, store privacy labels, CarPlay/Android Auto/Alexa/Siri integrations, push payloads, and region catalog differences.

## Core User Journeys

- New user opens the app, reviews consent and data-use notices, signs in or continues with the allowed preview path, and reaches the home/listen surface.
- Returning user resumes the last track, station, channel, podcast, show, or playlist and controls playback from the app and OS media controls.
- User searches or browses the catalog, opens a detail page, saves or follows the item, and later finds it again from library/history.
- User starts a station, queue, playlist, or live stream and sees buffering, unavailable, explicit-filtered, and region-blocked states.
- User downloads eligible content, goes offline, refreshes licenses, and sees expired/unavailable download handling.
- User upgrades, downgrades, restores, cancels, or loses an entitlement and sees correct ad, skip, quality, offline, and catalog gates.
- User reports rights, explicit-content, account, creator, or abuse issues and receives a durable case state.
- User requests export/delete and can remove account data, listening history, saved library, support cases, and billing references where legally deletable.
- Manual verification required: background audio, lock-screen controls, CarPlay/Android Auto, voice assistant/device integrations, and exact region catalog behavior.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth | Account entry and consent | sign in, sign up, SSO, continue | signed-out, loading, authenticated | blocked region, blocked account, offline |
| Home / Listen | Personalized listening entry | play, search, resume, browse | empty, personalized, loading | stale catalog, entitlement unavailable |
| Search / Browse | Catalog discovery | query, filters, categories | results, no results, loading | rights removed, region blocked |
| Catalog Detail | Track/album/show/channel details | play, save, follow, share | available, explicit, saved | unlicensed, removed, preview-only |
| Now Playing | Playback controls and queue | play, pause, skip, scrub | playing, paused, buffering | rights expired, network loss |
| Queue / Station | Playback sequence management | reorder, remove, seed, thumbs | loaded, personalized | duplicate, unavailable, explicit filtered |
| Library | Saved content and downloads | save, remove, sort | empty, synced, offline | download expired, sync conflict |
| Downloads / Offline | Offline entitlement behavior | download, remove, refresh | available, expired | storage full, license expired |
| Creator / Channel | Artist/station/show presence | follow, share, buy where relevant | loaded, followed | takedown, payout/payment blocker |
| Subscription / Entitlement | Plans and usage state | upgrade, restore, manage | free, ad-supported, paid | refund, expired, store mismatch |
| Notifications | Push and in-app notices | opt in, categories | enabled, denied | token expired, deep link stale |
| Settings / Privacy | Account and data controls | toggles, export, delete | loaded, pending request | delete blocked by billing/support hold |
| Support | Help and case tracking | search, contact, case | open, pending, resolved | attachment redacted, SLA unavailable |
| Safety / Reports | Rights and abuse feedback | report, reason, evidence | submitted, reviewed | duplicate report, legal hold |

## Data Model

- `User`: identity, locale, age/region gates, auth providers, consent state, deletion/export state, and support flags.
- `AccountSession`: device id, platform, token state, last active time, revocation reason, and suspicious-login markers.
- `ProjectOrLibraryItem`: owner, title, source type, saved/draft state, retention policy, pinned/archive/deleted state, and availability.
- `ImportAsset`: photo/video/audio/file/source refs, MIME type, dimensions/duration, EXIF state, scan state, extraction state, license, and retention.
- `TimelineOrQueue`: ordered clips/tracks/items, transitions or playback rules, audio offsets, render/playback settings, draft state, and conflict version.
- `ToolCapability`: provider or local engine, feature category, input limits, output formats, safety category, availability, and entitlement requirement.
- `EditOrPlaybackOperation`: tool/playback id, parameters, before/after or queue refs, undo group, destructive flag, processing state, and audit refs.
- `ProviderJob`: provider route, request id, status, retry count, timeout, error class, quota or rights impact, and output refs.
- `AssetOrCatalogLicense`: template/preset/sticker/music/catalog/source owner, usage scope, commercial-use flag, attribution, expiry, and takedown state.
- `ExportOrDownloadJob`: destination, format, quality, metadata policy, watermark or license state, progress, expiry, and failure reason.
- `Entitlement`: plan class, trial, renewal, cancellation, refund, quota counters, store owner, family/bundle scope, and feature gates.
- `RightsOrSafetyReport`: target object, reason, severity, submitted evidence, moderation state, reviewer notes, and appeal state.
- `NotificationPreference`: category, channel, quiet hours, token status, and consent timestamp.
- `SupportCase`: user-visible case id, category, redacted attachments, status, owner, SLA, and deletion/export eligibility.
- `AuditEvent`: import, edit, playback, catalog, generation, asset use, export/download, billing, support, safety, privacy, and admin events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle.
- `GET /home`, `GET /library`, `POST /library/items`, `PATCH /library/items/:id`, and `DELETE /library/items/:id`.
- `POST /imports/uploads`, `PUT /imports/uploads/:id/content`, `GET /imports/:id`, and `DELETE /imports/:id` where user media import is in scope.
- `GET /catalog`, `GET /catalog/:id`, `GET /search`, and `POST /catalog/:id/save` for licensed media/catalog discovery where applicable.
- `GET /tools`, `GET /tools/:id`, and `POST /tools/:id/preview` for capability and entitlement-aware routing.
- `POST /jobs`, `GET /jobs/:id`, `GET /jobs/:id/events`, `POST /jobs/:id/cancel`, and `POST /jobs/:id/commit` for render, transcript, generation, recognition, or provider work.
- `POST /playback/session`, `PATCH /playback/session/:id`, and `POST /playback/events` where streaming or recognition playback is in scope.
- `GET /assets`, `GET /assets/:id/license`, `POST /assets/:id/use`, and `POST /assets/:id/report`.
- `POST /exports`, `GET /exports/:id`, `POST /exports/:id/share`, and `DELETE /exports/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, and `POST /billing/webhook`.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id`.
- `GET /support/articles`, `POST /support/cases`, `GET /support/cases/:id`, `POST /reports`, and `GET /reports/:id`.

## Realtime, Push, And Offline Behavior

- Drafts, selected tools, local edit stacks, playback queues, library saves, and export/download settings cache locally with explicit size, retention, and purge rules.
- Long-running recognition/edit/render/export/download jobs use polling, SSE, or websocket fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows opening cached drafts or licensed downloads but blocks provider calls, publication, billing changes, irreversible deletes, and unsafe reports.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether quota, credits, rights windows, or downloads were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to export/download completion, account/security, subscription, support, creator/channel, collaboration, and moderation states.
- Background playback, export, upload, render, recognition, download refresh, and cloud sync behavior is `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached prompts, uploads, originals, previews, generated outputs, edited exports, timelines, catalog manifests, and downloads purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request camera, microphone, speech recognition, photo library, files, clipboard, contacts/share sheet, notifications, local network, Bluetooth, media library, or creator-platform OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw prompts, photos, videos, audio, transcripts, files, listening history, face geometry, EXIF, exports, or private notes in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports must strip or let users control EXIF, GPS, face tags, camera serials, filenames, embedded captions, and private metadata before export/share.
- AI, captions, voice, face/body, restoration, recognition, and recommendation features must block non-consensual sexualization, child imagery, deepfake impersonation, doxxing, harassment, illegal content, and misleading attribution.
- Generated, edited, recognized, recommended, or licensed output must show that results can be inaccurate, synthetic, altered, rights-limited, or region-limited before consequential or commercial use.
- Asset/catalog libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, and region restrictions in project and export/download metadata.
- Music/audio handling must separate user-owned imports, platform-provided tracks, licensed stock, streaming catalog rights, downloads, and blocked copyrighted media.
- Support access to prompts, originals, uploads, drafts, exports, playback history, and account data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, originals, uploads, drafts, edit stacks, generated outputs, playback/history where legally available, exports, reports, support cases, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, import started/completed, search performed, item opened, tool selected, edit/playback/render completed or failed, export/download completed, report submitted, export/delete requested, and paywall viewed.
- Event properties must use coarse file/media type classes, tool categories, catalog category, model capability class, latency buckets, error codes, output dimensions buckets, render-duration buckets, playback state, and entitlement state only.
- Monetization may gate premium tools, higher quotas, batch exports, cloud sync, stock/templates, music/audio, AI generation, high-resolution output, watermark removal, downloads/offline, ad-free playback, family/bundle features, or priority processing.
- Billing must handle app-store, web, bundle/family, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, and quota-exhausted states.
- Paywalls must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- User imports a huge file, unsupported format, corrupt image/video/audio, low-storage clip, DRM-protected media, or media with sensitive EXIF/location.
- Provider outage after the user submits an edit, transcription, recognition, render, download, or export job but before output is persisted.
- User cancels processing after credits, quota, skips, or rights windows are consumed.
- Tool, model, preset, template, sticker, music, catalog item, station, podcast, or asset becomes unavailable, renamed, region-locked, explicit-filtered, or takedown-blocked.
- Generated, edited, recognized, recommended, or exported output includes unsafe, infringing, non-consensual, misleading, missing-attribution, or rights-limited content.
- Draft, library item, playlist, station, or download is deleted on one device while another device is playing, exporting, rendering, or processing it.
- Subscription renews, refunds, or expires while a premium export, render, download, recognition, or playback session is in progress.
- Account/team/family policy disables AI, cloud sync, commercial assets, explicit content, downloads, creator features, or public sharing after content has been cached locally.
- Camera, photo library, files, microphone, clipboard, media library, Bluetooth, local network, or notifications are revoked in OS settings mid-flow.
- User requests export/delete while processing jobs, reports, support cases, billing disputes, creator payouts, or rights disputes remain active.
- Uploaded or played media appears to contain child data, health data, financial documents, private keys, third-party confidential material, or copyrighted assets.
- User attempts to use generated/edited/recognized output for identity deception, financial/scientific claims, regulated advertising, unauthorized commercial use, or non-consensual publication.

## Test Plan

- Unit tests for project/library state machines, idempotency keys, entitlement checks, quota counters, provider error mapping, and analytics redaction.
- Unit tests for import/catalog validation, MIME/size/codec limits, EXIF policy, scan states, rights states, retention flags, and deletion/export eligibility.
- Unit tests for edit stack undo/redo, timeline trim/split/reorder or playback queue behavior, destructive-confirmation gates, asset license propagation, watermark/download state, and metadata policy.
- Contract tests for auth, home, library, imports, catalog/search, tools, jobs, assets/licenses, playback, exports/downloads, billing, privacy, support, and reports.
- Integration tests for onboarding -> import/search -> edit/play -> preview/now-playing -> export/download/share -> delete.
- Integration tests for permission denied, granted, revoked, limited photo/media access, oversized files, unsupported inputs, provider timeouts, and rights failures.
- Offline tests for cached drafts, licensed downloads, local edits, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for hallucination/source disclaimers where applicable, face/body/media abuse, non-consensual edits, child-safety prompts, copyright reports, explicit-content gates, and moderation states.
- Billing tests for trial, purchase, restore, renewal, refund, expiration, region unavailable, quota exhausted, ad-supported, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, EXIF/GPS stripping, prompt/log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts, non-gesture alternatives, media controls, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, subscription purchase/restore, push notifications, camera/photo/file/media behavior, background playback/export, and region-specific availability.

## Acceptance Criteria

- All source-discovery links are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed assets/catalogs.
- Onboarding, home, import/search, editor or playback, tool/effect/catalog picker, asset/library, preview/now-playing, export/download/share, settings, support, safety report, export/delete, and entitlement screens are specified.
- Media/import/export/playback/provider/billing/support/analytics data boundaries are documented and testable.
- Offline draft/download recovery and reconnect reconciliation are covered without allowing unsafe provider, billing, publication, rights, or irreversible operations while offline.
- Safety tests cover hallucinations or source claims where relevant, face/body/media abuse, non-consensual edits, copyright reports, generated-content attribution, music/catalog licensing, explicit content, and commercial-use warnings.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions, devices, permissions, marketplace labels, camera/hardware integration, background playback/export, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, import/playback failure, quota exhaustion, offline recovery, export/delete, billing restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace listing IDs and app-store privacy labels should be treated as canonical after native verification?
- Which provider(s) will power AI, video/audio processing, media storage, moderation, stock/template/music/catalog libraries, billing, analytics, notifications, and recommendations in the original implementation?
- Which prompts, uploads, originals, drafts, generated outputs, edit operations, playback history, catalog refs, and exports/downloads are retained for product improvement, support, abuse prevention, rights accounting, or legal obligations?
- Which regions, ages, teams, schools, families, bundles, or enterprise policies should block or alter feature availability?
- Which generated-content attribution, watermarking, license, citation, explicit-content, download, or disclosure rules are required by platform policy, rights contracts, or local law?
- Which hands-on flows require paid access, creator/admin access, special hardware, background permissions, platform integrations, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace URLs, source notes, provider choices, legal names, rights model, and feature flags for all manual blockers.
- Phase 2: Implement auth, home, import/search, editor or playback shell, project/library history, settings, and support routes.
- Phase 3: Add tool/model/catalog routing, asset library, edit/render/recognition/playback jobs, preview/now-playing states, quota states, and provider error handling.
- Phase 4: Add offline draft/download recovery, reconnect reconciliation, notification preferences, export/delete, report handling, rights state, and audit events.
- Phase 5: Add billing/restore, privacy controls, analytics redaction, provider retention controls, accessibility, media safety, copyright/music checks, and policy tests.
- Phase 6: Run lawful hands-on native verification and remove or preserve blockers with dated evidence before parity claims.

## Next Steps

- Capture native app-store listing IDs, privacy labels, release notes, and permission prompts during a lawful device verification session.
- Select original providers for media processing, recognition/transcription, moderation, storage, billing, analytics, notifications, recommendations, licensed music, and asset/catalog libraries.
- Keep presets, templates, sample prompts, generated examples, playlists, editorial shelves, and seed media original to the clone implementation.
- Extend the Phase 5 implementation-plan queue after this spec range is incorporated into the broader readiness pipeline.
