# BritBox-Style Clone Spec

> Metadata
> - Inspiration app: BritBox
> - Category: Streaming video
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, support/help, privacy, terms, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, paid/subscription or borrowing state, permission prompts, push notifications, provider integrations, background playback/download/casting behavior, app-store privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, proprietary media catalogs, private feeds, recommendation models, private APIs, customer media, marketplace assets, licensed stock, and unlicensed datasets.

## Overview

Build an original mobile streaming video product inspired by BritBox's public product and policy materials. V1 focuses on British TV streaming, series discovery, watchlists, subscriptions, downloads where supported, regional catalogs, and household/profile controls. The clone must use original branding, original UI copy, original sample media, licensed providers/assets, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support British TV streaming, series discovery, watchlists, subscriptions, downloads where supported, regional catalogs, and household/profile controls with clear retry, recovery, unavailable, region, and rights-aware states.
- Preserve boundaries between account data, viewing/reading history, provider telemetry, analytics, support logs, rights/licensing records, billing records, ad records, and public creator/publisher data.
- Implement free, ad-supported, trial, paid, expired, restored, refunded, quota-exhausted, provider-owned, bundle-owned, library-owned, and unavailable entitlement states without copying exact pricing, plan names, or promotional copy.
- Include export/delete, report abuse, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog/feed, rights, recommendation, subscription, device-integration, safety, advertising, child/profile, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with BritBox or its publisher.
- Do not copy proprietary media catalogs, scores feeds, article databases, artwork, transcripts, recommendation models, screenshots, icons, brand names, or private API shapes.
- Do not send production user video, audio, reading/viewing history, device telemetry, precise location, child-profile data, library-card data, payment data, or support attachments to any third-party provider without explicit consent and a documented data-processing path.
- Do not present recommendations, sports data, ratings, creator analytics, ad targeting, news/video content, or source-backed output as professional, medical, legal, financial, educational, betting, or safety-critical advice.
- Do not enable autonomous external publication, purchases, account changes, creator monetization, public profile changes, betting/wagering, or regulated workflows without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.britbox.com/ | Public product positioning, core surfaces, availability framing, account, catalog/feed, subscription, and app behavior | Verified 2026-05-04 |
| Support/help center | https://help.britbox.com/ | Public support taxonomy for account, playback/reading, billing, devices, downloads, provider auth, troubleshooting, and deletion/export flows | Verified 2026-05-04 |
| Privacy policy | https://www.britbox.com/privacy | Account, profile, media/history, device, advertising, analytics, support, children/profile, and user-rights handling | Verified 2026-05-04 |
| Terms of service | https://www.britbox.com/terms | Service usage, licensed content, subscriptions, user conduct, provider limits, and legal boundaries | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/britbox-by-bbc-itv/id1206838907 | Canonical iOS listing, category, age rating, privacy label, compatibility, in-app purchases where public, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.britbox.us | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, store purchase/restore, push payloads, background playback/download, casting, and regional catalog/feed differences | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out preview where allowed, account creation or restore, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful streaming video state, search/discovery, saved items, settings, and degraded offline/account variants.
- Search and discovery must distinguish first-party public evidence, licensed catalog/feed data, editorial recommendations, ads/sponsorship, user-generated content, and inferred behavior.
- Detail screens must show availability, rights state, explicit/safety labels where relevant, save/follow/share actions, and manual-verification warnings for native-only behavior.
- Playback, reading, download, DVR, borrowing, provider-auth, device-control, or profile jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Library, history, queue, watchlist, subscription, profile, channel, team, feed, or creator state must sync without trusting stale client-only state for paid, rights-limited, or irreversible actions.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, subscription management, and connected-provider controls.
- Entitlements must model free, ad-supported, trial, paid, expired, canceled, refunded, restored, store-owned, web-owned, bundle-owned, library-owned, quota-exhausted, and unavailable states.
- Analytics must avoid raw viewing/reading history at event granularity, private feed URLs, downloaded file paths, precise location, child data, payment credentials, library-card identifiers, support attachments, and unredacted account identifiers.
- Moderation and support must cover copyright, impersonation, harassment, explicit content, unsafe uploads/comments, account takeover, fraud, private-feed leaks, provider-auth failures, and rights disputes.
- Licensed media, live TV feeds, sports data, article feeds, recommendations, ads, payments, downloads, DVR state, library/institution entitlements, and device integrations require explicit provider/legal controls.
- Manual verification required: native permission prompts, marketplace privacy labels, subscription purchase/restore, push payloads, background playback/download, casting/device integrations, and region-specific availability.
- licensed regional catalogs, BBC/ITV content rights, subscription ownership, downloads, household controls, and mature-content ratings must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- Video, article, score, live-event, or playback surfaces must preserve profile, maturity rating, captions/subtitles, audio descriptions, spoilers, ad labels, download eligibility, concurrent-stream limits, and content-expiry state.
- Parental/profile controls must separate adult profiles, child profiles, PINs, ratings, search visibility, autoplay, recommendations, notifications, and account-owner controls where relevant.

## Core User Journeys

- New user opens the app, reviews consent and data-use notices, signs in or continues with the allowed preview path, and reaches the primary surface.
- Returning user resumes the latest session, queue, profile, episode, stream, title, article, score, download, DVR item, creator dashboard, or feed state and can recover from stale data.
- User searches or browses public content, opens a detail page, saves or follows the item, and later finds it again from library/history.
- User starts playback, reading, borrowing, DVR, provider-auth, download, or another core action, sees progress and cancellation, handles unavailable/provider-failed states, and confirms canonical state after completion.
- User denies a permission, receives a functional fallback, and can re-enable the permission from settings without data loss.
- User goes offline, opens cached safe content, plays licensed downloads where allowed, queues low-risk local work where allowed, and reconciles on reconnect.
- User upgrades, downgrades, restores, cancels, or loses an entitlement and sees correct ads, quota, premium, download, quality, profile, and provider gates.
- User reports rights, explicit-content, account, creator, publisher, feed, title, device, score, article, or abuse issues and receives a durable case state.
- User requests export/delete and can remove account data, user content, viewing/reading history, support cases, and billing references where legally deletable.
- Manual verification required: background behavior, push payloads, store purchase/restore, OS permission prompts, marketplace labels, casting/device integrations, and regional catalog/feed differences.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth | Defines the welcome / auth workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Plan / Bundle Gate | Defines the plan / bundle gate workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Home / For You | Defines the home / for you workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Search / Browse | Defines the search / browse workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Title / Story Detail | Defines the title / story detail workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Series / Season | Defines the series / season workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Subscription Restore | Defines the subscription restore workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Episode / Event Detail | Defines the episode / event detail workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Player / Reader | Defines the player / reader workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Profiles / Kids Profile | Defines the profiles / kids profile workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Watchlist / Saved | Defines the watchlist / saved workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Downloads / Offline | Defines the downloads / offline workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Notifications | Defines the notifications workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Settings / Privacy | Defines the settings / privacy workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |
| Support / Reports | Defines the support / reports workflow for BritBox-inspired streaming video behavior | taps, forms, search, filters, deep links, media controls, permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `AccountSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `Profile`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `CatalogOrFeedItem`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `CreatorOrPublisher`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `EpisodeOrTitle`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `PlaybackSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `QueueOrWatchlist`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `Download`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `ProviderJob`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `Entitlement`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `AdOrSponsorshipSlot`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `NotificationPreference`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `RightsOrSafetyReport`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `SupportCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `AuditEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.
- `LocalCacheRecord`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for BritBox-inspired streaming video workflows.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle.
- `GET /home`, `GET /profiles`, `POST /profiles`, `PATCH /profiles/:id`, and `DELETE /profiles/:id`.
- `GET /library`, `POST /library/items`, `PATCH /library/items/:id`, and `DELETE /library/items/:id`.
- `GET /catalog`, `GET /catalog/:id`, `GET /search`, and `POST /catalog/:id/save` for licensed media, article, event, feed, title, creator, or publisher discovery.
- `GET /live/guide`, `GET /live/channels/:id`, `POST /dvr/recordings`, `GET /dvr/recordings`, and `DELETE /dvr/recordings/:id` where live TV or DVR behavior is in scope.
- `GET /scores`, `GET /teams/:id`, `GET /games/:id`, `POST /teams/:id/follow`, and `GET /articles` where sports feed behavior is in scope.
- `POST /jobs`, `GET /jobs/:id`, `GET /jobs/:id/events`, `POST /jobs/:id/cancel`, and `POST /jobs/:id/commit` for download, DVR, provider auth, playback sync, feed refresh, or device work.
- `POST /playback/session`, `PATCH /playback/session/:id`, and `POST /playback/events` for streaming, reading, viewing, live, or device playback.
- `GET /assets`, `GET /assets/:id/license`, `POST /assets/:id/use`, and `POST /assets/:id/report` for catalogs, feeds, artwork, subtitles, transcripts, channels, ads, articles, scores, or publisher assets.
- `POST /downloads`, `GET /downloads/:id`, `POST /downloads/:id/refresh`, and `DELETE /downloads/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, and `POST /billing/webhook`.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id`.
- `GET /support/articles`, `POST /support/cases`, `GET /support/cases/:id`, `POST /reports`, and `GET /reports/:id`.

## Realtime, Push, And Offline Behavior

- Queues, watchlists, subscriptions, profiles, downloads, history, DVR/library state, score follows, team follows, selected settings, and export/download settings cache locally with explicit size, retention, and purge rules.
- Long-running download/DVR/feed-refresh/playback-sync/provider-auth/device jobs use polling, SSE, or websocket fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and licensed downloads but blocks provider calls, billing changes, public publication, rights-affecting writes, profile-owner changes, wagering-adjacent flows, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether quota, credits, licenses, rights windows, ad counters, DVR recordings, or downloads were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to downloads, account/security, subscription, support, creator/publisher/channel, live events, game alerts, recommendations, and moderation states.
- Background playback, live streaming, download refresh, casting, local-network/device behavior, watch/TV behavior, and cloud sync behavior is `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached uploads, originals, previews, downloads, subtitles, transcripts, viewing/reading history, queues, profiles, private feed URLs, device metadata, team interests, and catalog refs purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request microphone, media library, photo library, files, clipboard, contacts/share sheet, notifications, local network, Bluetooth, location, motion, camera, TV/cast access, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw viewing/reading histories, private feed URLs, precise location, child-profile data, downloaded file paths, payment data, library-card identifiers, or support attachments in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, and support attachments must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, voice metadata, and private tags before export/share.
- Audio, video, article, score, news, recommendation, ad, and creator features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe device behavior, wagering evasion, and misleading attribution.
- Recommended, ad-targeted, creator-claimed, sports, news, factual, wellness, or licensed output must show that results can be inaccurate, sponsored, rights-limited, region-limited, age-restricted, spoiler-sensitive, delayed, or unavailable before consequential or commercial use.
- Asset/catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, spoiler, embargo, and region restrictions in playback/download metadata.
- Media handling must separate user-owned imports, public feeds, platform-provided tracks/titles/articles, licensed stock, streaming catalog rights, downloads, ad inventory, sports data feeds, and blocked copyrighted media.
- Support access to uploads, feeds, drafts, downloads, playback history, profile data, diagnostics, and account data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, feeds, reviews, generated outputs, playback/history where legally available, downloads, reports, support cases, device associations, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, item opened, playback or article started/completed/failed, download completed, report submitted, export/delete requested, paywall viewed, and alert preference changed.
- Event properties must use coarse media/feed/title/article/device classes, catalog category, provider capability class, latency buckets, error codes, playback-duration buckets, ad state, rating class, team/league category, and entitlement state only.
- Monetization may gate premium playback, live channels, sports packages, higher quality, offline downloads, ad-free mode, cloud DVR, creator/publisher tools, paid content, bundles, family profiles, or priority processing.
- Billing must handle app-store, web, bundle/family, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, borrowing/library-owned, and quota-exhausted states.
- Paywalls must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/feed, or unsupported institution/provider.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate downloads, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed media, show, episode, book, channel, article, game, feed, or video title becomes unavailable, renamed, explicit-filtered, geo-blocked, blackout-blocked, embargoed, or takedown-blocked.
- Background playback, download, live stream, DVR, feed refresh, score alert, or offline license refresh is interrupted by app termination.
- Subscription renews, refunds, expires, switches bundle owner, changes platform owner, or loses institution/provider authorization during active playback/download.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, ad records, or content-provider logs remain active.
- Uploaded, indexed, or saved media contains child data, private conversations, health data, financial data, copyrighted material, or third-party confidential content.
- Provider/CDN/feed outage occurs after the user starts playback, download, DVR, article read, or purchase but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, private-feed sharing, copyright infringement, spoiler abuse, wagering evasion, or unsafe public sharing.
- Device storage fills, cache corrupts, download expires, token expires, clock skew occurs, or reconnect creates a profile/queue conflict.
- Account, family, kids, school, library, enterprise, bundle, or territory policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement checks, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for media/feed/catalog/article/score validation, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for queue/watchlist/profile/playback/download/DVR/provider-auth behavior, retry gates, destructive confirmations, and license propagation.
- Contract tests for auth, home, library, search/discovery, catalog/feed, jobs, playback, downloads, billing, privacy, support, scores/articles where scoped, and reports.
- Integration tests for onboarding -> discover -> detail -> play/read/watch -> save/download/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, CDN/feed timeouts, sports-data delays, and rights failures.
- Offline tests for cached reads, licensed downloads, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for copyright reports, explicit-content gates, child profile controls, private-feed leakage, harassment, impersonation, ad disclosures, misleading attribution, and wagering-adjacent controls.
- Billing tests for trial, purchase, restore, renewal, refund, expiration, bundle owner, institution owner, region unavailable, quota exhausted, ad-supported, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, media metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts, subtitles, audio descriptions, media controls, article reader controls, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, subscription purchase/restore, push notifications, casting, background playback/download, and regional availability.

## Acceptance Criteria

- All source-discovery links are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed assets/catalogs.
- Onboarding, home, discover/listen/watch/read, detail, queue/watchlist/feed/library, player/reader, downloads, export/share, settings, support, safety report, export/delete, and entitlement screens are specified.
- Media/feed/catalog/playback/provider/billing/support/analytics data boundaries are documented and testable.
- Offline cache/download recovery and reconnect reconciliation are covered without allowing unsafe provider, billing, publication, rights, profile-owner, wagering-adjacent, or irreversible operations while offline.
- Safety tests cover copyright reports, explicit content, child profiles, private-feed leakage, non-consensual uploads, impersonation, ad disclosures, media licensing, sports-data delays, commercial-use warnings, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions, devices, permissions, marketplace labels, casting integration, background playback/download, institution/provider auth, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, playback/read failure, quota exhaustion, offline recovery, export/delete, billing restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog/feed ingestion, sports data, article feeds, CDN playback, moderation, storage, billing, analytics, notifications, recommendations, ads, creator monetization, institution auth, or device integrations in the original implementation?
- Which uploads, feeds, drafts, user content, viewing/reading histories, downloads, device diagnostics, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, or legal obligations?
- Which regions, ages, teams, families, bundles, institutions, devices, profiles, or enterprise policies should block or alter feature availability?
- Which attribution, rating, subtitle, transcript, download, ad-tech, private-feed, sports-data, blackout, library-patron, or disclosure rules are required by platform policy, rights contracts, provider contracts, or local law?
- Which hands-on flows require paid access, creator/admin access, special hardware, background permissions, platform integrations, institution/library cards, TV-provider auth, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, and feature flags for all manual blockers.
- Phase 2: Implement auth, home, discovery, primary playback/reading shell, library/history, settings, and support routes.
- Phase 3: Add catalog/feed/profile routing, asset library, download/playback/sync/DVR/provider-auth jobs, alert states, quota states, and provider error handling.
- Phase 4: Add offline download/cache recovery, reconnect reconciliation, notification preferences, export/delete, report handling, rights state, and audit events.
- Phase 5: Add billing/restore, privacy controls, analytics redaction, provider retention controls, accessibility, media/sports/news safety, copyright checks, and policy tests.
- Phase 6: Run lawful hands-on native verification and remove or preserve blockers with dated evidence before parity claims.

## Next Steps

- Capture native app-store privacy labels, release notes, screenshots, and permission prompts during a lawful device verification session.
- Select original providers for catalog/feed ingestion, CDN playback, moderation, storage, billing, analytics, notifications, recommendations, ads, sports data, article feeds, institution auth, and device integrations.
- Replace any inferred native-only behavior with dated hands-on evidence or keep it behind explicit blockers.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest after this spec range remains implementation-ready.
