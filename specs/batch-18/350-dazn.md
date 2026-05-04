# DAZN-Style Clone Spec

> Metadata
> - Inspiration app: DAZN
> - Category: Sports and fitness
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, support/help, privacy, terms, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, paid/subscription, eligibility, health/device, fantasy-league, permission prompts, push notifications, provider integrations, background activity/playback, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, sports data feeds, odds feeds, workout libraries, proprietary media, private APIs, recommendation models, customer data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile sports and fitness product inspired by DAZN's public product and policy materials. V1 focuses on live sports/video catalog, channel/event discovery, playback, subscriptions, regional rights, downloads/casting blockers, and support flows. The clone must use original branding, original UI copy, original sample data, licensed sports/fitness/media providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support live sports/video catalog, channel/event discovery, playback, subscriptions, regional rights, downloads/casting blockers, and support flows with clear retry, recovery, unavailable, region, entitlement, and provider-aware states.
- Preserve boundaries between account data, profile data, sports/fitness history, provider telemetry, analytics, support logs, rights/licensing records, billing records, ad records, and public league/team/player/workout data.
- Implement free, ad-supported, trial, paid, expired, restored, refunded, store-owned, web-owned, bundle-owned, region-blocked, provider-owned, and unavailable entitlement states without copying exact pricing, plan names, or promotional copy.
- Include export/delete, report abuse, responsible-use controls where relevant, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog/feed, sports data, health data, odds/stat feed, recommendation, subscription, device-integration, safety, advertising, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with DAZN or its publisher.
- Do not copy proprietary sports feeds, odds feeds, workout libraries, video catalogs, team/player databases, artwork, transcripts, recommendation models, screenshots, icons, brand names, or private API shapes.
- Do not send production user viewing, activity, health, precise-location, payment, eligibility, league-chat, support, or device telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present scores, odds, fantasy advice, fitness coaching, recommendations, injury guidance, or source-backed output as professional, medical, legal, financial, betting, or safety-critical advice.
- Do not enable autonomous external publication, purchases, account changes, creator monetization, public profile changes, real-money wagering, wallet movement, health diagnosis, or regulated workflows without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.dazn.com/ | Public product positioning, core surfaces, availability framing, account, catalog/feed, subscription, and app behavior | Verified 2026-05-04 |
| Support/help center | https://www.dazn.com/help | Public support taxonomy for account, playback/activity/scoring, billing, devices, permissions, troubleshooting, and deletion/export flows | Verified 2026-05-04 |
| Privacy policy | https://www.dazn.com/en-US/help/articles/privacy-policy | Account, profile, media/activity/history, device, advertising, analytics, support, children/profile, location, health, and user-rights handling | Verified 2026-05-04 |
| Terms of service | https://www.dazn.com/en-US/help/articles/terms | Service usage, licensed content, subscriptions, user conduct, provider limits, regulated-flow boundaries, and legal boundaries | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/dazn-live-sports-streaming/id1129523589 | Canonical iOS listing, category, age rating, privacy label, compatibility, in-app purchases where public, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.dazn | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, store purchase/restore, push payloads, background behavior, provider integrations, device pairing, regional availability, and regulated eligibility flows | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out preview where allowed, account creation or restore, blocked-account state, unavailable-region state, eligibility-blocked state where applicable, and entitlement-unavailable state.
- Home must expose the latest meaningful sports and fitness state, search/discovery, saved items, settings, and degraded offline/account variants.
- Search and discovery must distinguish first-party public evidence, licensed sports/feed/workout data, editorial recommendations, ads/sponsorship, user-generated content, and inferred behavior.
- Detail screens must show availability, provider timestamp, rights state, explicit/safety labels where relevant, save/follow/share actions, and manual-verification warnings for native-only behavior.
- Live, score, workout, activity, fantasy, eligibility, playback, provider-auth, device-control, or profile jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Library, history, watchlist, followed team/league/player, league, roster, training plan, subscription, profile, or device state must sync without trusting stale client-only state for paid, rights-limited, regulated, health-adjacent, or irreversible actions.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, subscription management, connected-provider controls, and responsible-use controls where relevant.
- Entitlements must model free, ad-supported, trial, paid, expired, canceled, refunded, restored, store-owned, web-owned, bundle-owned, quota-exhausted, provider-owned, region-blocked, and unavailable states.
- Analytics must avoid raw viewing/activity history at event granularity, precise GPS routes, health samples, payment credentials, eligibility identifiers, private league messages, child data, support attachments, and unredacted account identifiers.
- Moderation and support must cover copyright, impersonation, harassment, explicit content, unsafe uploads/comments, account takeover, fraud, private-league leaks, provider-auth failures, scoring disputes, and rights disputes.
- Sports data, odds/stat feeds, workout catalogs, licensed video/audio, article feeds, recommendations, ads, payments, downloads, device integrations, and health/sensor integrations require explicit provider/legal controls.
- Manual verification required: native permission prompts, marketplace privacy labels, subscription purchase/restore, push payloads, background activity/playback, Bluetooth/local-network integrations, device pairing, and region-specific availability.
- regional live-sports rights and blackout windows must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- subscription, trial, bundle, and refund state must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- concurrent stream and device limits must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- DVR/download expiry and casting blockers must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- payment-provider and app-store ownership must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- ad-tech and viewer-history privacy must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- subtitle/caption availability must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- support for provider outage and event cancellation must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.

## Core User Journeys

- New user opens the app, reviews consent and data-use notices, signs in or continues with the allowed preview path, and reaches the primary sports/fitness surface.
- Returning user resumes the latest session, followed team, league, workout, event, stream, roster, activity, or alert state and can recover from stale data.
- User searches or browses public content, opens a detail page, saves or follows the item, and later finds it again from library/history.
- User starts a live, score, workout, roster, fantasy, eligibility, provider-auth, device-sync, playback, or another core action, sees progress and cancellation, handles unavailable/provider-failed states, and confirms canonical state after completion.
- User denies a permission, receives a functional fallback, and can re-enable the permission from settings without data loss.
- User goes offline, opens cached safe content, continues allowed local work, queues low-risk local updates where allowed, and reconciles on reconnect.
- User upgrades, downgrades, restores, cancels, or loses an entitlement and sees correct ads, quota, premium, download, quality, feature, and provider gates.
- User reports rights, explicit-content, account, device, score, roster, safety, article, health, odds, or abuse issues and receives a durable case state.
- User requests export/delete and can remove account data, user content, activity history, support cases, device associations, and billing references where legally deletable.
- Manual verification required: background behavior, push payloads, store purchase/restore, OS permission prompts, marketplace labels, device integrations, and regional availability.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth | Defines the welcome / auth workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Plan Gate | Defines the plan gate workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Home / Live Sports | Defines the home / live sports workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Guide / Schedule | Defines the guide / schedule workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Event Detail | Defines the event detail workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Video Player | Defines the video player workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| DVR / Replays | Defines the dvr / replays workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Downloads / Offline | Defines the downloads / offline workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Casting Devices | Defines the casting devices workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Notifications | Defines the notifications workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Settings / Privacy | Defines the settings / privacy workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |
| Support / Reports | Defines the support / reports workflow for DAZN-inspired sports and fitness behavior | taps, forms, search, filters, deep links, media controls, sensor/device permissions | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, rights unavailable, provider failed, region unavailable, eligibility blocked |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `AccountSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `Profile`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `ChannelOrEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `PlaybackSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `ReplayOrDvrItem`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `DownloadLicense`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `DeviceRegistration`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `Entitlement`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `AdSlot`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `NotificationPreference`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `SupportCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `AuditEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.
- `LocalCacheRecord`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for DAZN-inspired sports and fitness workflows.

## API And Backend Contracts

- POST /auth/session and DELETE /auth/session for account lifecycle.
- GET /home, GET /guide, GET /events, GET /events/:id, and GET /channels with region and entitlement metadata.
- POST /playback/session, PATCH /playback/session/:id, and POST /playback/events with ad, rights, and concurrency state.
- POST /dvr/recordings, GET /dvr/recordings, DELETE /dvr/recordings/:id, and GET /replays.
- POST /downloads, GET /downloads/:id, POST /downloads/:id/refresh, and DELETE /downloads/:id.
- GET /devices, POST /devices/cast-session, DELETE /devices/:id, GET /entitlements, POST /billing/restore, and POST /billing/webhook.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id` for privacy lifecycle.
- `GET /support/articles`, `POST /support/cases`, `GET /support/cases/:id`, `POST /reports`, and `GET /reports/:id` for support, abuse, safety, and rights workflows.

## Realtime, Push, And Offline Behavior

- Followed teams/leagues/players, schedules, scores, rosters, workouts, activity history, subscriptions, profiles, downloads, selected settings, and export/download settings cache locally with explicit size, retention, and purge rules.
- Long-running score-refresh, live-event, workout-session, device-sync, provider-auth, geofence, playback-sync, feed-refresh, or eligibility jobs use polling, SSE, or websocket fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and allowed local activity capture but blocks provider calls, billing changes, public publication, rights-affecting writes, profile-owner changes, real-money wagering, wallet movement, health diagnosis, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether quota, licenses, promotions, score snapshots, device syncs, or subscriptions were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription, support, team/league/player, game alerts, workout reminders, device sync, recommendations, and moderation states.
- Background playback, live streaming, score alerts, workout recording, wearable sync, Bluetooth/local-network/device behavior, watch/TV behavior, geolocation checks, and cloud sync behavior are `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached uploads, activity records, downloads, viewing/history, private league data, device metadata, team interests, health samples, and catalog refs purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request microphone, media library, photo library, files, clipboard, contacts/share sheet, notifications, local network, Bluetooth, precise location, approximate location, motion/fitness, camera, TV/cast access, health-store access, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw viewing/activity histories, private league messages, precise GPS routes, health samples, payment data, eligibility identifiers, downloaded file paths, or support attachments in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, activity uploads, and support attachments must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, voice metadata, and private tags before export/share.
- Sports, score, odds, fantasy, video, article, recommendation, ad, workout, sensor, and device features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe exercise, wagering evasion, and misleading attribution.
- Recommended, ad-targeted, sports, fantasy, odds, factual, wellness, or licensed output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, injury-sensitive, or unavailable before consequential use.
- Asset/catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, spoiler, embargo, blackout, and region restrictions in metadata.
- Support access to uploads, feeds, activity history, playback history, profile data, diagnostics, and account data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, feeds, reviews, generated outputs, playback/activity/history where legally available, downloads, reports, support cases, device associations, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, item opened, game/workout/event started/completed/failed, follow saved, report submitted, export/delete requested, paywall viewed, and alert preference changed.
- Event properties must use coarse sport/activity classes, catalog category, provider capability class, latency buckets, error codes, duration buckets, ad state, rating class, entitlement state, and region class only.
- Monetization may gate premium playback, live events, sports packages, ad-free mode, advanced stats, fantasy tools, coaching plans, offline downloads, device integrations, bundles, family profiles, or priority processing.
- Billing must handle app-store, web, bundle/family, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, and quota-exhausted states.
- Paywalls must not block safety reporting, responsible-use controls, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/feed, unsupported provider, or eligibility-blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed media, game, workout, score, stat, odds line, roster, article, event, or feed becomes unavailable, renamed, explicit-filtered, geo-blocked, blackout-blocked, embargoed, corrected, or takedown-blocked.
- Background playback, workout recording, device sync, live stream, feed refresh, score alert, or offline license refresh is interrupted by app termination.
- Subscription renews, refunds, expires, switches bundle owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, ad records, or provider logs remain active.
- Uploaded, indexed, or saved media/activity contains child data, private conversations, health data, financial data, copyrighted material, or third-party confidential content.
- Provider/CDN/feed/device outage occurs after the user starts playback, workout, activity sync, roster change, alert change, or purchase but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, private-league sharing, copyright infringement, spoiler abuse, wagering evasion, unsafe exercise, or unsafe public sharing.
- Device storage fills, cache corrupts, download expires, token expires, clock skew occurs, sensor data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, kids, league, provider, bundle, health, territory, regulator, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for sports/feed/workout/odds/stat validation, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for follow/library/profile/playback/activity/device/provider-auth behavior, retry gates, destructive confirmations, and license propagation.
- Contract tests for auth, home, library, search/discovery, catalog/feed, jobs, playback/activity, billing, privacy, support, reports, and score/stat/provider routes where scoped.
- Integration tests for onboarding -> discover -> detail -> follow/start -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, CDN/feed/device timeouts, sports-data delays, and rights failures.
- Offline tests for cached reads, allowed local activity capture, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for copyright reports, explicit-content gates, child/profile controls, private-league leakage, harassment, impersonation, ad disclosures, sports-data delays, responsible-use controls, and privacy redaction.
- Billing tests for trial, purchase, restore, renewal, refund, expiration, bundle owner, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, media/activity metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts, media controls, workout controls, score update announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, subscription purchase/restore, push notifications, device integrations, background behavior, and regional availability.

## Acceptance Criteria

- All source-discovery links are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed sports/fitness/media data.
- Onboarding, home, discover, detail, follow/save, active-use, notifications, export/share, settings, support, safety report, export/delete, and entitlement screens are specified.
- Sports/feed/workout/activity/provider/billing/support/analytics data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing, publication, rights, profile-owner, real-money wagering, health-diagnosis, or irreversible operations while offline.
- Safety tests cover copyright reports, explicit content, private-league leakage, non-consensual uploads, impersonation, ad disclosures, sports-data delays, responsible-use controls, unsafe exercise, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, activity/playback failure, quota exhaustion, offline recovery, export/delete, billing restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power sports data, stat feeds, odds feeds, workout libraries, media playback, moderation, storage, billing, analytics, notifications, recommendations, ads, or device integrations in the original implementation?
- Which uploads, feeds, drafts, activity histories, health samples, playback histories, device diagnostics, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, or legal obligations?
- Which regions, ages, teams, leagues, families, bundles, providers, devices, profiles, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, subtitle, transcript, ad-tech, sports-data, odds, blackout, injury-warning, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, fantasy commissioner/admin access, special hardware, background permissions, platform integrations, geolocation, health-store access, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, health/sensor model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery, detail, follow/save, active-use, settings, support, and entitlement shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve native, device, provider, marketplace, region, subscription, health, and regulated-flow blockers before parity claims.

## Next Steps

- Keep native marketplace, permission-prompt, subscription, provider, health/device, geolocation, and regional behavior marked as manual verification blockers until lawful hands-on evidence is captured.
- Select licensed providers for sports data, stats/odds where applicable, workout/activity data, media, notifications, billing, analytics, and support before downstream implementation.
- Convert this spec into a downstream implementation plan only after provider choices, risk owners, feature flags, and acceptance-test fixtures are assigned.
- Continue Phase 8 Step 8.3 with IDs 361-380 after this batch validates.
