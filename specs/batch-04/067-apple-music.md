# Apple Music-Style Clone Spec

> Metadata
> - Inspiration app: Apple Music
> - Category: Music streaming, library, radio, lyrics, collaborative playlists, subscriptions, and Apple-device listening
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Apple Music product pages, Apple Support articles, Apple privacy/legal pages, and public subscription/support documentation.
> - Manual verification blockers: native iOS/Android screen capture, Apple Account signup/login, subscription purchase/restore/cancel, family/student eligibility, library sync, downloads/offline, lyrics translation/pronunciation, Sing, SharePlay, CarPlay, Apple Watch, HomePod/AirPlay, Siri, push payloads, data export/deletion, and regional catalog availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, song catalog, lyrics catalog, radio programming, artist content, recommendation models, payment integrations, device integrations, and licensing relationships.

## Overview

Build an original mobile music app inspired by Apple Music's public workflow: account entry, subscription access, Home recommendations, New/browse surfaces, search, library, playlists, albums, artists, radio/live programming, lyrics, Sing-like vocal controls, downloads, device handoff, SharePlay-style shared listening, family/student plans, support, privacy controls, and account deletion.

The clone must not copy Apple branding, screenshots, marketing copy, protected UI artwork, private APIs, recommendation systems, playlist/editorial names, Apple Music radio programming, Shazam data, lyrics, licensed recordings, artist imagery, or Apple-device integrations. Functional parity should use original product language, synthetic or licensed catalog metadata, provider-approved playback, and independently designed personalization.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first music app with onboarding, Home, browse, search, catalog detail, library, playlists, now playing, queue, lyrics, downloads, shared listening, subscriptions, support, privacy, and account controls.
- Support library-first listening with albums, songs, artists, playlists, stations, radio-like programming, recently played items, and recommendations.
- Preserve media-category trust expectations around catalog licensing, lyrics licensing, explicit content, minors/family sharing, payments, recommendations, account privacy, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build an Apple-branded app or imply affiliation with Apple Inc., Apple Music, Shazam, record labels, artists, publishers, device manufacturers, or car/headphone partners.
- Do not stream production music, lyrics, radio shows, live concerts, interviews, spatial audio, haptics data, or music videos without licensed content and provider approval.
- Do not scrape Apple Music, reuse private Apple APIs, replay network traffic, copy recommendation/ranking models, copy editorial collections, or bypass rights-holder restrictions.
- Do not treat SharePlay, CarPlay, Apple Watch, HomePod, Siri, AirPlay, Family Sharing, or Apple Account behavior as generic features; each requires platform review and hands-on verification.
- Do not claim exact App Store, Play Store, native-device, catalog, personalization, subscription, lyrics, device handoff, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/apple-music/id1108187390 | Official iOS listing, developer, Music category, 13+ age rating, platform support, privacy labels, accessibility claims, catalog scale, lyrics, AutoMix, Spatial Audio, lossless, SharePlay, CarPlay, Watch, and subscription renewal notes | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.apple.android.music | Official Android listing, package id, developer, Music & Audio category, install/support surface, data safety, and Android availability | Verified 2026-04-19 |
| Apple Music Product Page | https://www.apple.com/apple-music/ | Product positioning, catalog scale, ad-free access, plans, family sharing, student plan, lossless, Spatial Audio, discovery, lyrics, Sing, collaborative playlists, classical companion, device support, and FAQ | Verified 2026-04-19 |
| Add And Download Music | https://support.apple.com/en-us/118288 | Library add behavior, download/offline framing, device coverage, and subscription requirement for catalog downloads | Verified 2026-04-19 |
| Lyrics On iPhone/iPad | https://support.apple.com/en-us/HT204459 | Time-synced lyrics, full lyrics fallback, translation/pronunciation availability, Sing controls, missing lyric states, and reporting concerns | Verified 2026-04-19 |
| SharePlay With Apple Music | https://support.apple.com/en-us/108767 | Shared listening requirements, subscribed host, Bluetooth/device prerequisites, HomePod/Apple TV/CarPlay/Bluetooth speaker contexts, and join/start framing | Verified 2026-04-19 |
| Lossless Audio | https://support.apple.com/en-us/118295 | ALAC/lossless support, device requirements, data/storage implications, Hi-Res external equipment, unsupported content, and regional availability caveats | Verified 2026-04-19 |
| Family Sharing On Android | https://support.apple.com/en-us/109333 | Android family subscription sharing, invite acceptance, Apple Account requirements, and family membership lifecycle | Verified 2026-04-19 |
| Apple Privacy Policy | https://www.apple.com/legal/privacy/ | Apple privacy commitments and data-processing posture for account, personalization, and privacy rights modeling | Verified 2026-04-19 |
| Apple Media Services Terms | https://www.apple.com/legal/internet-services/itunes/ | Subscription, purchase, media-service, billing, content, and availability constraints relevant to clone legal scope | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Apple product pages position Apple Music as an ad-free subscription music service with a large song catalog, personalized discovery, library management, playlists, lyrics, radio/live content, lossless/Spatial Audio labels, downloads, and cross-device listening.
- V1 must model signed-out, trial, Individual-like, Family-like, Student-like, bundled, expired, canceled, refunded, platform-owned, unavailable-plan, underage, region-blocked, and catalog-rights-blocked states.
- Home must support recently played, personal recommendations, artist updates, discovery stations, genre/mood/category rows, editorial-like rows using original content, empty new-account states, personalization-disabled fallback, and stale/offline states.
- Browse/New must support new releases, charts, moods, genres, radio/station entries, artist interviews/live sessions if licensed, and classical/deep-catalog entry points without copying Apple editorial names.
- Search must support songs, artists, albums, playlists, stations, genres, lyrics-like matching if licensed, voice/Siri-like entry only through platform-approved APIs, empty/no-result states, explicit filtering, and rights/region filtering.
- Library must support songs, albums, artists, playlists, downloaded music, recently added, local/imported library references if supported, sort/filter, removed content, and sync conflicts.
- Playlists must support create, rename, delete, reorder, add/remove songs, duplicate handling, public/private state, collaborative participation, reactions if added, invite links, child/minor restrictions, and moderation/report paths.
- Playback must support play, pause, skip, scrub, repeat, shuffle, queue, lyrics, AirPlay-like device output abstraction, route changes, audio-quality labels, unavailable-track recovery, and buffering/rights errors.
- Lyrics must be rights-dependent; V1 must include synced, plain, translated, pronunciation, unavailable, wrong-lyrics, report-concern, offline, unsupported-language, and unsupported-track states.
- Sing-like controls, Spatial Audio-like labels, lossless labels, Music Haptics-like behavior, and AutoMix-like transitions must be original and gated by provider/device capability rather than assumed as universal features.
- Downloads/offline must support subscription gating, device-bound licenses, storage checks, quality settings, redownload after quality change, removed-rights handling, sign-out invalidation, and periodic entitlement refresh.
- Shared listening must support host/guest roles, invite/session lifecycle, device output context, control permissions, conflict resolution, host leaving, abuse handling, and platform availability blockers.
- Family/student/bundled plans must support manager/member roles, invite lifecycle, separate libraries/recommendations, student verification status, minor restrictions, platform-owned subscriptions, and renewal/cancel disclosure.
- Support/privacy/settings must expose account, subscription, notifications, explicit content, playback quality, downloads/storage, connected devices, family, data export, account deletion, legal links, and support paths.

### Manual Verification Required

- Native iOS and Android navigation, tab names, screen ordering, and release-note behavior.
- Apple Account signup/login, subscription purchase, restore, cancel, plan switch, Family Sharing, student verification, and platform billing ownership.
- Actual catalog availability, lyrics availability, translation/pronunciation coverage, Sing support, lossless/Spatial Audio labels, AutoMix, SharePlay, CarPlay, Watch, HomePod, AirPlay, Siri, Music Haptics, push payloads, and regional differences.

## Core User Journeys

- New listener installs the app, creates or signs into an account, reviews age/region and legal consent, chooses notification/personalization preferences, and lands on Home with original onboarding copy.
- Returning listener opens Home, resumes a recently played album, adds a song to Library, opens lyrics, switches to queue, and saves the album for later.
- Subscriber searches by song, artist, album, playlist, or lyrics-like text, opens catalog detail, starts playback, sees the correct quality/lyrics availability, and handles an unavailable-region result.
- Listener creates a playlist, adds songs, handles duplicate warnings, shares it privately, invites a collaborator, reviews collaborator changes, and removes an abusive contribution.
- Listener downloads an album, loses connectivity, plays only valid downloaded tracks, handles storage-full/corrupt-cache states, and reconnects to refresh rights and progress.
- Family manager invites a member, confirms separate library/recommendation state, handles underage collaboration restrictions, and removes a member.
- Student or trial user upgrades, cancels, expires, or loses eligibility and sees correct locked/unlocked states without client-trusting billing.
- Friends start a shared listening session, join from a compatible output context, add songs to the shared queue, resolve conflicting controls, and recover when the host leaves.
- Privacy-focused listener disables personalization, downloads personal data, requests account deletion, and sees warnings for active subscriptions, library data, and licensed downloads.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, legal consent, age/region gate | email/social/platform auth, DOB, country | new, returning, trial, subscribed | underage, blocked region, failed auth, account locked |
| Home | Personalized discovery and resume surface | row taps, play, save, hide, profile | loading, personalized, fresh account, offline | stale recommendations, personalization off, rights outage |
| Browse/New | Editorial-like discovery with original catalog rows | category, chart, mood, genre, station taps | loaded, filtered, regional | unavailable row, removed catalog, network failure |
| Search | Multi-type catalog search | query, filters, voice/sound entry if approved | suggestions, results, no-results | explicit hidden, region blocked, unsupported lyric match |
| Catalog Detail | Song/album/artist/playlist/station detail | play, save, share, download, report | available, saved, downloaded | removed rights, explicit filter, malformed metadata |
| Now Playing | Playback controls and media context | play, pause, skip, scrub, queue, lyrics | playing, paused, buffering | stream fail, license error, route loss, lyrics unavailable |
| Queue | Ordered upcoming playback | add, remove, reorder, clear | empty, editable, session queue | duplicate, shared conflict, entitlement lock |
| Lyrics/Sing | Synced/plain lyrics and optional vocal controls | lyric tap, report, translate, sing toggle | synced, plain, translated | unavailable, wrong lyrics, unsupported song/device |
| Library | User collection and downloads | filters, sort, item taps | empty, saved, downloaded | deleted item, sync conflict, signed out, corrupt cache |
| Playlist Editor | Create/manage personal and collaborative playlists | title, privacy, add/remove, invite | draft, published, collaborative | child restriction, abusive metadata, collaborator removed |
| Downloads/Storage | Offline content and quality settings | download toggles, quality, delete | downloading, downloaded, offline | storage full, rights expired, sign-out invalidation |
| Shared Listening | SharePlay-like group control | start, join, invite, control, leave | host, guest, active | incompatible output, host leaves, abuse, permission conflict |
| Subscription/Family | Plans, checkout, restore, family/student state | plan select, invite, restore, cancel | trial, paid, family, student | platform mismatch, verification failed, webhook delay |
| Settings/Privacy/Support | Account, playback, privacy, legal, help | toggles, export, delete, contact | loaded, pending export, deleting | active subscription blocker, support unavailable |

## Data Model

- `User`: account identity, age band, country/region, auth providers, Apple-like platform link state, consent, privacy choices, export/deletion state, and restrictions.
- `DeviceSession`: device id, platform, OS/app version, playback capability, route capability, notification token, download entitlement, and session expiry.
- `Subscription`: plan type, trial, individual, family, student, bundle, manager/member role, platform owner, renewal/cancel/refund state, eligibility, and feature gates.
- `FamilyGroup`: manager, members, invite lifecycle, separate-library flag, minor restrictions, collaborator eligibility, and audit history.
- `CatalogItem`: polymorphic song, album, artist, playlist, station, radio program, live event, video, or ad-free promo item with rights, region, explicit, availability, and display metadata.
- `Track`: recording metadata, artist/album links, ISRC-like original identifier, quality labels, lyrics availability, explicit flag, route/download eligibility, and unavailable reason.
- `ArtistProfile`: public metadata, releases, top songs, playlists, concerts/events if licensed, follow state, notification preferences, and report metadata.
- `Playlist`: owner, title, description, privacy, collaborative state, participant roles, track order, reactions, artwork metadata, report/moderation state, and version.
- `PlaybackSession`: current item, context, queue, position, output route, quality, lyrics state, shared-session id, repeat/shuffle, and reconciliation cursor.
- `QueueItem`: catalog reference, source context, order, added-by user, lock/edit state, shared-session permission, and duplicate metadata.
- `LyricAsset`: track id, provider, synced/plain/translation/pronunciation state, language, rights, report status, and cache policy.
- `DownloadAsset`: content reference, device, quality, bytes, entitlement, expiration/check-in, rights status, corrupt-cache marker, and retry count.
- `RecommendationSlot`: surface, seed signals, explanation key, item list, freshness, privacy-safe audit metadata, and fallback reason.
- `PrivacyRequest`: export, deletion, correction, portability, consent change, status, delivery method, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, entitlement, playback, playlist, download, family, privacy, support, and moderation-sensitive changes.
- `LocalCacheRecord`: cached home/library/detail/settings, downloads, queue drafts, offline plays, sync attempts, stale timestamps, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age, region, locked-account, and device state.
- `GET /home`, `GET /browse`, `GET /recommendations`: discovery surfaces with cache hints, entitlement context, personalization state, and fallback slots.
- `GET /search?q=&type=&cursor=&explicit=&region=`: multi-type search across songs, albums, artists, playlists, stations, and lyrics-like licensed matches.
- `GET /catalog/:type/:id`: canonical detail endpoint returning availability, rights, explicit filter state, playable actions, deep links, and stale-data indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, route id, queue context, position, and error codes.
- `POST /queue/items`, `PATCH /queue/items/:id`, `DELETE /queue/items/:id`, `POST /queue/reorder`: queue editing with entitlement and shared-session permissions.
- `GET /lyrics/:trackId`, `POST /lyrics/:trackId/report`: rights-aware lyrics retrieval with synced/plain/translation/pronunciation/unavailable states.
- `GET /library`, `POST /library/items`, `DELETE /library/items/:id`: saved songs, albums, artists, playlists, downloads, sort, filters, and sync conflict metadata.
- `POST /playlists`, `PATCH /playlists/:id`, `POST /playlists/:id/items`, `DELETE /playlists/:id/items/:itemId`: playlist lifecycle, collaboration, duplicate warnings, and moderation metadata.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: device-bound downloads, storage checks, rights refresh, quality changes, and corrupt-cache recovery.
- `POST /shared-sessions`, `POST /shared-sessions/:id/join`, `PATCH /shared-sessions/:id/controls`, `DELETE /shared-sessions/:id`: shared listening host/guest lifecycle and output-route constraints.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: plan lifecycle, platform ownership, restores, refunds, eligibility, and delayed state.
- `GET /family`, `POST /family/invites`, `PATCH /family/members/:id`: family manager/member lifecycle, minor restrictions, and audit events.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, account deletion, and subscription/library warnings.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: catalog, playlist, lyric, account, billing, and support workflows.

## Realtime, Push, And Offline Behavior

- Playback state, queue changes, shared-session membership, subscription changes, family changes, downloads, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Home, Browse, search suggestions, catalog detail, library summaries, playlists, settings, entitlement summary, recent activity, and support status with stale labels.
- Offline mode may play valid downloaded content, preserve a queue composed of downloaded items, track local progress, and queue low-risk library/playlist changes for sync.
- Offline mode must block non-downloaded streams, subscription purchase/cancel, account deletion, family membership changes, shared-session starts, support evidence upload, and irreversible playlist deletion.
- Downloads must be device-bound, storage-aware, quality-aware, resumable, and invalidated on sign-out, revoked entitlement, region loss, deleted catalog item, or expired provider rights.
- Lyrics, quality labels, SharePlay-like sessions, and output route changes must tolerate missing provider data, unsupported devices, app backgrounding, token refresh, route loss, and clock skew.
- Push notifications must be opt-in and category-controlled for artist releases, playlist collaboration, shared-session invites, subscription/billing, family changes, support cases, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact listening history, private playlist names, child details, payment state, and support evidence.

## Permissions, Privacy, And Safety

- Notifications, local network, Bluetooth/proximity, microphone, media library, contacts, camera/QR, files, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact listening history, lyrics text, playlist titles, child profile data, payment details, device names, IP-level location, and support evidence.
- Music catalog, lyrics, radio/live programming, concert data, spatial/haptic metadata, and high-quality audio files are licensed-content launch blockers with legal/catalog/provider owners.
- Copyright, trademark, rightsholder takedown, royalty reporting, stream fraud, explicit-content labeling, playlist abuse, and creator impersonation require launch-blocking review.
- Explicit content must support account-level filters, family/minor restrictions, grayed/skipped content, reporting incorrect tags, and region/age-specific handling.
- Recommendations must avoid sensitive inference leakage, support privacy-safe explanations, respect personalization controls, and provide fallback content when history is disabled.
- Account deletion/export must warn about active subscriptions, family membership, downloaded content, playlist ownership, support cases, and legal/rights retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, captions/transcripts where licensed, accessible media controls, and nonvisual alternatives for shared-session joins.
- Launch owners: catalog/legal owner for licensed music and lyrics; privacy owner for data rights; trust/safety owner for explicit content and playlist abuse; billing owner for entitlements; family/minors owner for managed restrictions; accessibility owner for playback/library UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, home section viewed, catalog opened, playback started/completed/failed, queue edited, playlist created, download started/completed/failed, lyrics opened/reported, shared session started/joined, entitlement changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, region bucket, error code, latency bucket, and provider status rather than raw titles, search text, lyrics text, playlist names, exact listening history, or child identifiers.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, skip, save, hide, and report actions without exposing private user content.
- Playback analytics must support royalty/provider accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Monetization may include original free trial, paid individual, household, student, bundle-like plan, and provider-approved add-ons after legal review.
- Any paid plan must disclose price, renewal/cancellation, refund/support path, platform ownership, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, underage account, expired session, locked account, passwordless login failure, or social/platform auth revoked.
- Search result exists but is not playable because of region, explicit filter, removed rights, expired license, unavailable plan, hidden item, or malformed catalog metadata.
- Track starts then rights change mid-session, playback transfers to another output route, queue is edited on two devices, or stream fails during a quality switch.
- Lyrics are delayed, missing, unsynced, wrong, unavailable on a device, hidden by content restrictions, untranslated for the selected language, or removed by rights-holder changes.
- Download exceeds device/storage limits, app cache is cleared, user changes quality, battery saver kills download, downloaded rights expire, or user signs out while offline.
- Shared-session invite expires, incompatible output is selected, host loses subscription, guest abuses queue, host leaves, Bluetooth/local-network permission is denied, or route disappears.
- Family member fails invite acceptance, student verification expires, manager loses payment method, child is blocked from collaboration, or family owner closes account.
- Privacy export email fails, account deletion requested with active subscription/family/playlist ownership, or legal retention prevents full deletion.

## Test Plan

- Unit tests for entitlement gating, playback state machine, queue edits, download validation, lyrics availability, explicit filters, family roles, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, cursor reconciliation, idempotency keys, error codes, rights states, and webhook duplicates.
- Integration tests for auth, Home, Browse, search, catalog detail, playback start/stop, save/follow, playlist create/edit, queue edit, library filters, subscription restore, and settings.
- Playback tests for buffering, skip, repeat, shuffle, route change, lyric unavailable, quality fallback, rights failure, and local cache stale state.
- Offline tests for valid downloads, missing downloads, corrupt cache, disk full, expired rights, sign-out invalidation, queued low-risk writes, and reconnect reconciliation.
- Shared listening tests for host create, invite, guest join, queue contribution, permission changes, host leaving, incompatible device, and abuse/report path.
- Family/subscription tests for manager invite/remove, member role, minor restrictions, student eligibility, trial, renewal, cancellation, refund, expired plan, and platform-owned subscription.
- Privacy tests for personalization controls, data export, account deletion, deletion blockers, support evidence redaction, and analytics minimization.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, lyric alternatives, queue reordering, media controls, and shared-session alternatives.
- Manual verification tests: native iOS/Android screenshots, subscription purchase/restore/cancel, downloads, lyrics translation/pronunciation, Sing, SharePlay, CarPlay, Watch, HomePod/AirPlay, Siri, push payloads, export/delete, and regional catalog behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Apple assets, network traffic, private APIs, recommendation systems, catalog data, lyrics data, device integrations, or brand copy.
- New and returning users can discover, search, play, save, queue, organize, share, and recover music content using original licensed or synthetic data.
- Music catalog, library, playlist, queue, lyric, download, shared-listening, subscription, family, privacy, and support workflows have deterministic data models and API contracts.
- Trial, individual, family, student, bundle-like, expired, canceled, refunded, and unavailable entitlement states are covered by tests.
- Offline playback, downloads, lyrics, device handoff, shared listening, recommendations, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Licensed-media, lyrics, explicit-content, minors/family, privacy, billing, and platform-device constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which licensed music catalog provider, lyrics provider, radio/live provider, concert provider, and device-output integrations will back the original clone?
- Which features are V1 versus later: downloads, lyrics translation, Sing-like controls, lossless labels, shared listening, collaborative playlists, family/student plans, radio/live content, or classical/deep-catalog search?
- Will V1 support a free trial only, a demo synthetic catalog, or paid internal test entitlements before licensing is complete?
- Which payment platforms own subscriptions and restores: app stores, web checkout, both, or a provider-managed subscription service?
- What privacy posture should personalization use by default, and how should history-disabled listening affect recommendations and analytics?
- Which regions, languages, explicit-content rules, family restrictions, and device integrations are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, Browse, Search, catalog detail, library, Now Playing, queue, synthetic catalog seed data, and privacy-safe analytics.
- Phase 2: add playlist CRUD/collaboration, save/follow actions, library filters, lyric unavailable/report states, explicit filter, support/settings, and account privacy controls.
- Phase 3: add licensed playback provider abstraction, playback state machine, lyrics provider abstraction, quality labels, route abstraction, queue reconciliation, and provider error handling.
- Phase 4: add downloads/offline mode, storage management, entitlement-aware rights refresh, corrupt-cache recovery, and offline regression tests.
- Phase 5: add subscriptions, checkout/restore/webhooks, plan gates, family/student lifecycle, platform-owned subscription handling, and billing regression tests.
- Phase 6: add shared listening, push notifications, collaborative playlist invites, device-output integration review, accessibility pass, and manual native verification.
- Phase 7: complete legal/provider launch review for licensed catalog, lyrics, radio/live programming, recommendations, minors/family, data deletion/export, regional availability, and platform APIs.

## Next Steps

- Resolve Apple Music manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 audio implementation-readiness upgrades with `068-youtube-music.md`.
