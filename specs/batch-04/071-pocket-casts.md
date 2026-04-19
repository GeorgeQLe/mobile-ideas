# Pocket Casts-Style Clone Spec

> Metadata
> - Inspiration app: Pocket Casts
> - Category: Podcast discovery, subscriptions, playlists, Up Next queue, filters, playback effects, downloads, sync, and cross-device listening
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Pocket Casts product pages, Pocket Casts support documentation, Pocket Casts privacy/legal pages, and public Plus/sync/download documentation.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, Pocket Casts Plus/Patron purchase/restore/cancel, sync, Up Next ordering, filters/smart playlists, auto-downloads, bookmarks, cloud files, web/desktop/Watch/CarPlay/Chromecast/Sonos behavior, playback effects, push payloads, data export/deletion, OPML import/export, and regional podcast directory availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, podcast directory data, episode metadata, recommendations, hosted files, payment integrations, device integrations, and licensing relationships.

## Overview

Build an original podcast app inspired by Pocket Casts' public workflow: account entry, podcast discovery, subscriptions, show pages, episode detail, Up Next queue, playlists/smart filters, playback effects, chapters, bookmarks, downloads, auto-downloads, sync, OPML import/export, Plus/Patron-style entitlements, web/cloud files, support, privacy controls, and account deletion.

The clone must not copy Pocket Casts or Automattic branding, screenshots, marketing copy, protected UI artwork, private APIs, recommendation systems, podcast directory snapshots, show artwork, episode notes, playback-effect implementation, cloud-file storage, or sync contracts. Functional parity should use original product language, public RSS/provider-approved podcast metadata, licensed artwork where available, and independently designed sync/discovery logic.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first podcast app with onboarding, Discover, Podcasts, show pages, episode detail, player, Up Next queue, playlists/smart filters, downloads, playback effects, bookmarks, sync, Plus gates, support, privacy, and account controls.
- Support power-listener workflows: queue control, custom playback speed, trim silence, volume boost, skip intervals, chapters, sleep timer, auto-download rules, archiving, filters, OPML import/export, and cross-device sync.
- Preserve podcast trust expectations around RSS/provider rights, private feed URLs, explicit content, minors, analytics privacy, cloud-file storage, account sync, payments, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Pocket Casts-branded app or imply affiliation with Pocket Casts, Automattic, podcast creators, networks, Apple Podcasts, Spotify, RSS hosts, device partners, or payment providers.
- Do not copy podcast artwork, transcripts, private feeds, paid feeds, web player data, recommendations, user queues, filters, or cloud files without rights and provider approval.
- Do not scrape Pocket Casts, reuse private Pocket Casts APIs, replay network traffic, copy sync implementation, copy directory ranking, or bypass podcast-feed restrictions.
- Do not treat Plus/Patron, cloud files, web/desktop sync, Sonos, Chromecast, CarPlay, Apple Watch, OPML import/export, auto-downloads, or push notification behavior as generic features; each requires explicit platform/provider review.
- Do not claim exact App Store, Play Store, native-device, podcast directory, sync, subscription, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/pocket-casts-podcast-player/id414834813 | Official iOS listing, developer Automattic, News category, 9+ age rating, in-app purchases, Watch support, playlists/smart playlists, Up Next, trim silence, variable speed, volume boost, chapters, audio/video, sleep timer, AirPlay/Chromecast/Sonos/CarPlay, sync, notifications, auto-download, storage, OPML, and support links | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts | Official Android listing, package id, developer, in-app purchase disclosure, install/support surface, data-safety context, and Android availability | Verified 2026-04-19 |
| Pocket Casts Product Page | https://pocketcasts.com/ | Product positioning, podcast listening app, free app, Plus/Patron entry points, web/desktop support, and feature framing | Verified 2026-04-19 |
| Up Next Support | https://support.pocketcasts.com/knowledge-base/up-next/ | Queue behavior, episode ordering, add next/add last, sync expectations, and playback order modeling | Verified 2026-04-19 |
| Playlists And Filters | https://support.pocketcasts.com/knowledge-base/filters/ | Smart filters/playlists, rules, episode state criteria, manual organization, and auto-updating lists | Verified 2026-04-19 |
| Auto Download | https://support.pocketcasts.com/knowledge-base/auto-download/ | Auto-download settings, rules, network/storage behavior, episode limits, and offline management | Verified 2026-04-19 |
| Playback Effects | https://support.pocketcasts.com/knowledge-base/playback-effects/ | Variable speed, trim silence, volume boost, skip controls, per-podcast settings, and player configuration | Verified 2026-04-19 |
| Syncing | https://support.pocketcasts.com/knowledge-base/syncing/ | Account sync for subscriptions, playback progress, Up Next, filters, listening history, and multi-device recovery | Verified 2026-04-19 |
| Pocket Casts Plus | https://support.pocketcasts.com/knowledge-base/pocket-casts-plus/ | Plus entitlement, web/desktop apps, cloud files, themes/icons, folders, bookmarks, and paid feature boundaries | Verified 2026-04-19 |
| OPML Import/Export | https://support.pocketcasts.com/knowledge-base/opml-import-and-export/ | Podcast import/export lifecycle, interoperability, and feed subscription portability | Verified 2026-04-19 |
| Privacy Policy | https://pocketcasts.com/privacy/ | Account, usage, device, sync, subscription, support, analytics, and privacy-rights modeling | Verified 2026-04-19 |
| Terms Of Use | https://pocketcasts.com/terms/ | Account, content, subscriptions, service restrictions, third-party podcast content, and legal constraints | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Pocket Casts pages position the app as a podcast player with discovery, subscriptions, Up Next queue, playlists/smart filters, downloads, playback effects, chapters, audio/video episodes, sleep timer, sync, notifications, OPML, Plus/Patron features, and cross-device support.
- V1 must model signed-out, free, account-sync enabled, Plus-like, Patron-like, expired, canceled, refunded, platform-owned, private-feed, paid-feed, cloud-file, download-only, explicit-blocked, directory-unavailable, and region-blocked states.
- Discover must support curated/personalized podcast rows, charts, categories, networks, search, fresh-account fallback, privacy-disabled recommendations, and stale/offline states using provider-approved directory metadata.
- Podcasts/show grid must support subscribed shows, artwork, unplayed counts, latest episode, archive state, folders if Plus-like, sort order, failed refresh, feed unavailable, and private-feed restrictions.
- Episode detail must support show metadata, notes, chapters when embedded, play, add next/last, download, archive/unarchive, star/favorite, share, bookmark, mark played, explicit label, and unavailable enclosure states.
- Up Next must support add next, add last, drag reorder, remove, clear, auto-add rules, sync conflicts, offline queue, cross-device recovery, and episode deletion/availability changes.
- Playlists/smart filters must support rule-based lists by podcast, release date, duration, download state, starred/favorite, played/unplayed, media type, custom order, manual playlists, and stale-rule states.
- Playback effects must support variable speed, trim silence, volume boost, skip intro/outro or custom skip intervals, per-podcast defaults, global defaults, unsupported media fallback, and accessibility disclosures.
- Downloads/offline must support manual download, auto-download rules, Wi-Fi/cellular constraints, storage limits, episode cleanup, partial/corrupt files, private-feed authentication, and feed enclosure changes.
- Sync must support subscriptions, Up Next, progress, playback effects, filters, listening history, downloads metadata, bookmarks, folders, devices, web/desktop clients, conflict resolution, and account deletion/export behavior.
- Plus/Patron-like features must support paid entitlement, web/desktop access, cloud files, themes/icons, folders, bookmarks, payment platform ownership, renewal/cancel/refund state, and feature downgrade recovery.
- OPML import/export must support feed parsing, duplicate handling, invalid private feeds, large files, unsupported feeds, and privacy warnings about sharing subscription lists.
- Support/privacy/settings must expose account, sync, notifications, downloads/storage, playback effects, Plus billing, OPML, private feeds, data export, account deletion, legal links, and support paths.

### Manual Verification Required

- Native iOS and Android navigation, tab names, Up Next behavior, playlist/filter builder, playback-effect exact controls, bookmarks, folders, cloud files, and release-note behavior.
- Account signup/login, Plus/Patron purchase/restore/cancel, sync, downloads, auto-download, OPML import/export, private feeds, web/desktop/Watch/CarPlay/Chromecast/Sonos, push payloads, data export/delete, and regional podcast-directory differences.

## Core User Journeys

- New listener installs the app, optionally creates an account, imports OPML or searches for shows, subscribes, chooses notification/download preferences, and lands on Podcasts/Discover.
- Returning listener opens Podcasts, sees new episode counts, opens a show, adds an episode to Up Next, reorders the queue, and starts playback.
- Power listener creates a smart playlist/filter for downloaded unplayed episodes under a duration limit, confirms it auto-updates, and uses it as a daily queue.
- Listener changes playback speed, trim silence, volume boost, and skip intervals globally and for one podcast, then confirms settings sync across devices.
- Listener enables auto-download for selected shows, loses connectivity, plays valid downloads offline, hits storage cleanup rules, and reconciles progress after reconnect.
- Plus-like user uploads a cloud audio file, bookmarks a moment, plays from web/desktop, and handles downgrade where cloud files or bookmarks become locked.
- User imports OPML with duplicate/invalid/private feeds, resolves errors, exports current subscriptions, and understands privacy implications.
- Privacy-focused listener deletes listening history, exports data, deletes account, and sees warnings for subscriptions, sync state, cloud files, bookmarks, and support cases.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, OPML/import prompt, legal consent | email/social auth, skip, import | new, returning, free, Plus | failed auth, blocked region, sync outage |
| Discover | Podcast discovery and search entry | category, chart, search, subscribe | loading, curated, personalized | directory unavailable, stale recs |
| Podcasts | Subscribed show grid/list | show tap, sort, folder, refresh | empty, subscribed, foldered | feed fail, artwork missing, sync conflict |
| Show Detail | Show and episode list | subscribe, play, download, filter | subscribed, unsubscribed, refreshing | private feed auth, removed feed, malformed RSS |
| Episode Detail | Episode notes and actions | play, add, download, star, share | available, downloaded, archived | enclosure missing, explicit blocked, note parse fail |
| Player | Playback and effects | play, pause, speed, skip, effects | playing, paused, buffering | media fail, chapter missing, effects unsupported |
| Up Next | Queue management | add next/last, reorder, remove, clear | empty, ordered, synced | duplicate, deleted episode, conflict |
| Playlists/Filters | Rule-based and manual episode lists | rules, sort, save, play | empty, auto-updating, manual | invalid rule, stale feed, sync conflict |
| Downloads/Storage | Offline files and cleanup | download, auto rules, delete | downloading, downloaded, offline | storage full, corrupt file, private-feed auth |
| Bookmarks | Saved listening moments | add, edit, delete, jump | empty, saved, synced | entitlement lock, episode deleted, sync conflict |
| Cloud Files | Plus-like hosted personal audio | upload, metadata, play, delete | pending, processed, failed | storage full, file unsupported, downgrade |
| OPML | Import/export subscriptions | file import, export, resolve | parsed, duplicate, exported | invalid file, private feed, huge file |
| Sync/Devices | Account sync and connected clients | sign in, refresh, device remove | synced, pending, conflict | server outage, stale device, merge conflict |
| Subscription | Plus/Patron plans and billing | subscribe, restore, cancel | free, trial, paid, canceled | platform mismatch, webhook delay, refund |
| Settings/Privacy/Support | Account, playback, downloads, legal | toggles, export, delete, contact | loaded, pending export, deleting | active subscription, cloud-file retention |

## Data Model

- `User`: account identity, country/region, auth providers, sync state, consent, privacy choices, export/deletion state, and restrictions.
- `DeviceSession`: device id, platform, app version, playback capability, cast/car/watch/web capability, notification token, sync cursor, and session expiry.
- `Entitlement`: free, Plus-like, Patron-like, platform owner, renewal/cancel/refund state, web/cloud/bookmark/folder gates, and feature downgrade state.
- `PodcastShow`: feed URL, canonical id, title, artwork, author/network, categories, explicit flag, private-feed auth, refresh state, and availability.
- `Episode`: show id, title, notes, audio/video enclosure, duration, chapters, release date, explicit flag, download state, archive/play state, and unavailable reason.
- `Subscription`: user/show relationship, notification preference, auto-download rule, playback defaults, folder assignment, sort order, and sync version.
- `UpNextQueue`: ordered episode references, source, added-by rule/manual action, device origin, conflict version, and last sync cursor.
- `PlaylistFilter`: manual or smart type, rule set, sort, included shows, media/download/played/starred criteria, version, and stale reason.
- `PlaybackSession`: current episode, position, speed, trim-silence state, volume boost state, skip settings, output device, queue cursor, and sync state.
- `DownloadAsset`: episode reference, file URL, device, bytes, checksum, private-feed auth state, storage policy, corrupt-cache marker, and retry count.
- `Bookmark`: episode id, timestamp, note, device origin, entitlement state, sync state, deleted state, and export/deletion behavior.
- `CloudFile`: user file, metadata, MIME/codec, bytes, processing state, storage quota, playback derivative, deletion/export status, and entitlement gate.
- `OpmlImport`: uploaded file, parsed feeds, duplicates, invalid/private feed warnings, import results, and export job metadata.
- `PrivacyRequest`: export, deletion, correction, listening-history removal, cloud-file deletion, status, delivery method, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, entitlement, sync, subscription, queue, download, cloud file, OPML, privacy, support, and billing-sensitive changes.
- `LocalCacheRecord`: cached Discover/Podcasts/show/detail/settings, queue, downloads, playback progress, filters, queued writes, stale timestamps, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with region, sync state, locked-account, and device state.
- `GET /discover`, `GET /charts`, `GET /categories`, `GET /search?q=&cursor=`: podcast directory discovery with cache hints, region context, explicit filter, and fallback slots.
- `GET /podcasts/:id`, `POST /podcasts/refresh`, `POST /subscriptions`, `PATCH /subscriptions/:id`, `DELETE /subscriptions/:id`: show detail, feed refresh, subscription, notifications, playback defaults, and folders.
- `GET /episodes/:id`, `PATCH /episodes/:id/state`: episode detail, notes, chapters, archive/play/star state, unavailable enclosure, and stale-data indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, effects, queue context, position, and sync cursor.
- `GET /up-next`, `POST /up-next/items`, `PATCH /up-next/items/:id`, `DELETE /up-next/items/:id`, `POST /up-next/reorder`: queue lifecycle, add-next/last, reorder, clear, and conflict resolution.
- `POST /filters`, `PATCH /filters/:id`, `DELETE /filters/:id`, `GET /filters/:id/items`: manual/smart playlist rules, episode matching, stale rule state, and sync version.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: manual/auto downloads, storage checks, private-feed auth, retry, and corrupt-cache recovery.
- `POST /bookmarks`, `PATCH /bookmarks/:id`, `DELETE /bookmarks/:id`, `GET /bookmarks`: bookmark lifecycle with timestamp, note, entitlement, sync, and deleted-episode handling.
- `POST /cloud-files`, `PATCH /cloud-files/:id`, `DELETE /cloud-files/:id`, `GET /cloud-files/:id/status`: Plus-like file upload, processing, quota, playback, deletion, and export state.
- `POST /opml/import`, `GET /opml/export/:jobId`: import/export, duplicate handling, invalid/private feed warnings, and privacy-safe export.
- `GET /sync/state`, `POST /sync/merge`, `POST /devices/:id/remove`: subscriptions, queue, progress, filters, bookmarks, and conflict merge state.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: plan lifecycle, platform ownership, restores, refunds, and delayed state.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, account deletion, cloud-file warnings, and retention state.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: podcast, episode, feed, billing, sync, account, and support workflows.

## Realtime, Push, And Offline Behavior

- Playback progress, Up Next, subscriptions, feed refreshes, filters, bookmarks, cloud-file processing, downloads, subscription changes, support updates, and privacy-export readiness must reconcile from server-owned sync events.
- Clients may cache Discover, search suggestions, podcast/show detail, episode detail, Podcasts grid, filters, queue, settings, entitlement summary, and support status with stale labels.
- Offline mode may play valid downloaded episodes, preserve Up Next, track local progress, add/remove low-risk queue items, create bookmarks where entitlement allows, and update filter state from cached episode metadata.
- Offline mode must block feed refresh, cloud-file upload, OPML import/export, subscription purchase/cancel, account deletion, private-feed auth refresh, support evidence upload, and irreversible cloud-file deletion.
- Downloads must be device-bound, feed/enclosure-aware, storage-aware, resumable, and invalidated on sign-out, feed removal, private-feed auth failure, deleted enclosure, or user cleanup rules.
- Sync must be conflict-aware, idempotent, cursor-based, and able to recover from stale devices, duplicate episodes, cross-device queue edits, clock skew, and local cache corruption.
- Push notifications must be opt-in and category-controlled for new episodes, playlist/filter updates if added, subscription/billing, cloud-file processing, sync alerts, support cases, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact listening history, private feed names, cloud-file names, payment state, and support evidence.

## Permissions, Privacy, And Safety

- Notifications, local files/cloud upload, OPML file access, local network/cast, Bluetooth/car/watch output, contacts/share sheet, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact listening history, private feed URLs, cloud-file names, episode notes, payment details, device names, IP-level location, and support evidence.
- Podcast directory metadata, RSS feeds, private feeds, paid feeds, artwork, transcripts, episode notes, chapters, cloud files, and playback effects are launch blockers with legal/catalog/provider owners.
- Copyright, trademark, rightsholder takedown, private-feed leakage, paid-feed bypass, explicit-content labeling, recommendation safety, and creator impersonation require launch-blocking review.
- Explicit content must support show/episode labeling, account-level filters, reporting incorrect tags, private-feed caution, and region/age-specific handling.
- Sync and cloud files must minimize retained personal data, encrypt sensitive metadata where appropriate, document export/deletion, and separate support access from production data.
- Account deletion/export must warn about sync data, subscriptions, listening history, queue, filters, bookmarks, cloud files, OPML, support cases, and legal/provider retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, accessible queue reordering, media controls, chapter navigation, and nonvisual filter-builder alternatives.
- Launch owners: catalog/legal owner for podcast feeds and private/paid feeds; privacy owner for sync/cloud/export; trust/safety owner for explicit/reporting and feed abuse; billing owner for Plus/Patron; accessibility owner for player/queue UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, discover item viewed, show opened, subscription added/removed, episode opened, playback started/completed/failed, queue edited, filter created, download completed, bookmark created, cloud file processed, OPML imported/exported, sync conflict resolved, entitlement changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, region bucket, error code, latency bucket, and provider status rather than raw episode titles, feed URLs, cloud-file names, exact listening history, or private notes.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, subscribe, play, hide, and report actions without exposing private user content.
- Playback analytics must minimize podcast listening detail, separate product analytics from any provider/royalty accounting, and avoid sharing private-feed behavior outside required support workflows.
- Monetization may include original free access, Plus-like subscription, Patron-like subscription, cloud-file storage, web/desktop access, themes/icons, folders, bookmarks, and provider-approved premium features after legal review.
- Any paid plan, cloud storage, web/desktop feature, or promotional offer must disclose price, renewal/cancellation, refund/support path, platform ownership, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, expired session, account locked, passwordless login failure, or social/platform auth revoked.
- Search result exists but feed is gone, podcast artwork is missing, explicit filter hides episodes, private-feed auth fails, paid feed cannot be accessed, or RSS is malformed.
- Episode enclosure redirects, download starts then file changes, episode is deleted while in Up Next, chapter metadata is malformed, or video episode cannot play audio-only.
- Up Next is edited on two devices, add-next/add-last conflicts, queue includes deleted episodes, auto-add rules duplicate episodes, or sync cursor is stale.
- Smart filter rule matches zero episodes after feed refresh, rule uses unavailable metadata, or manual playlist contains archived/deleted episodes.
- Playback effects are unsupported for a media type, trim silence over-skips, volume boost clips audio, speed setting syncs incorrectly, or per-podcast defaults conflict with global defaults.
- Auto-download exceeds storage, cellular restriction blocks a download, private-feed token expires, app cache is cleared, or sign-out invalidates local files.
- OPML import has duplicate, private, invalid, or huge feeds; export includes a private feed; user imports while offline; or support case blocks migration.
- Privacy export email fails, account deletion requested with cloud files/subscription/support case, or legal retention prevents full deletion.

## Test Plan

- Unit tests for entitlement gating, feed parsing, queue state machine, filter matching, playback effects, download validation, sync conflict merge, OPML parsing, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, cursor reconciliation, idempotency keys, error codes, feed states, download states, cloud-file states, sync states, and webhook duplicates.
- Integration tests for auth, Discover, search, podcast subscribe/unsubscribe, show detail, episode detail, playback start/stop, Up Next add/reorder, filter create/edit, download, bookmark, OPML import/export, cloud file, and settings.
- Playback tests for buffering, chapters, speed, trim silence, volume boost, skip intervals, sleep timer, audio/video toggle, output route, failed enclosure, and local cache stale state.
- Offline tests for valid downloads, missing downloads, corrupt cache, disk full, private-feed auth failure, sign-out invalidation, queued low-risk writes, cached filters, and reconnect reconciliation.
- Sync tests for subscriptions, progress, Up Next, filters, bookmarks, listening history, stale devices, conflict merge, duplicate episodes, and account deletion/export.
- Billing tests for Plus-like trial, purchase, restore, cancellation, refund, expired plan, platform-owned subscription, downgrade from Plus features, and web/desktop gate.
- Privacy tests for private feeds, cloud files, data export, account deletion, deletion blockers, support evidence redaction, listening-history removal, and analytics minimization.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, queue reordering, filter builder, media controls, chapters, and OPML/import alternatives.
- Manual verification tests: native iOS/Android screenshots, Plus/Patron purchase/restore/cancel, sync, Up Next, filters/smart playlists, auto-downloads, bookmarks, cloud files, web/desktop/Watch/CarPlay/Chromecast/Sonos, playback effects, push payloads, export/delete, and regional directory behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Pocket Casts assets, network traffic, private APIs, recommendation systems, directory snapshots, user sync data, cloud files, or brand copy.
- New and returning users can discover, subscribe, search, play, queue, filter, download, bookmark, sync, import/export, and recover podcast listening using original licensed, public RSS, or synthetic data.
- Podcast, episode, subscription, Up Next, filter, playback effect, download, bookmark, cloud-file, OPML, sync, subscription, privacy, and support workflows have deterministic data models and API contracts.
- Free, account-sync, Plus-like, Patron-like, cloud-file, private-feed, paid-feed, expired, canceled, refunded, and unavailable entitlement states are covered by tests.
- Offline playback, downloads, sync, filters, bookmarks, cloud files, OPML, web/device handoff, recommendations, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Podcast-feed rights, private/paid feeds, explicit-content, sync/cloud privacy, billing, and platform-device constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which podcast directory provider, RSS parser, artwork cache, sync backend, cloud-file provider, transcript/chapter provider, and billing provider will back the original clone?
- Which features are V1 versus later: Plus, Patron, cloud files, web/desktop, filters, smart playlists, bookmarks, OPML, private feeds, Chromecast/Sonos/CarPlay/Watch, or auto-downloads?
- Will V1 support only public RSS feeds, or private/paid feeds and cloud files from launch?
- Which payment platforms own subscriptions and restores: app stores, web checkout, both, or a provider-managed subscription service?
- What privacy posture should listening history and sync use by default, and how should private feeds/cloud files affect analytics and support access?
- Which regions, languages, explicit-content rules, podcast directories, feed-auth models, and device integrations are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth optionality, Discover, Search, Podcasts, show detail, episode detail, Player, Up Next, synthetic/public RSS seed data, and privacy-safe analytics.
- Phase 2: add subscriptions, playback progress, archive/star states, manual queue editing, playback effects, sleep timer, support/settings, and account privacy controls.
- Phase 3: add feed refresh service, RSS parser, chapter/enclosure handling, private-feed auth model, OPML import/export, and feed regression tests.
- Phase 4: add downloads/offline mode, auto-download rules, storage management, corrupt-cache recovery, and offline regression tests.
- Phase 5: add smart filters/playlists, folders if approved, bookmarks, cross-device sync, conflict resolution, stale-device recovery, and sync regression tests.
- Phase 6: add Plus/Patron entitlements, checkout/restore/webhooks, cloud files, web/desktop gate, downgrade recovery, and billing/cloud regression tests.
- Phase 7: add push notifications, cast/car/watch/device integrations, accessibility pass, and manual native verification.
- Phase 8: complete legal/provider launch review for podcast feeds, private/paid feeds, sync/cloud data, recommendations, data deletion/export, regional directory availability, and platform APIs.

## Next Steps

- Resolve Pocket Casts manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the next Batch 04 video specs.
