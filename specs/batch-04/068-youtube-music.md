# YouTube Music-Style Clone Spec

> Metadata
> - Inspiration app: YouTube Music
> - Category: Music streaming, video/audio switching, podcasts, uploads, playlists, recommendations, subscriptions, and YouTube-adjacent listening
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, YouTube Music Help articles, YouTube paid-service/legal pages, Google privacy pages, and public YouTube Music product documentation.
> - Manual verification blockers: native iOS/Android screen capture, Google Account signup/login, YouTube Premium/Music Premium purchase/restore/cancel, ad-supported limits, background play, downloads/offline, audio/video switching, uploads, podcasts, Samples, sound search, collaborative playlists, supervised accounts, push payloads, data export/deletion, and regional catalog availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, music/video catalog, podcast catalog, uploaded-file storage, recommendation models, ad technology, payment integrations, device integrations, and licensing relationships.

## Overview

Build an original mobile music and podcast app inspired by YouTube Music's public workflow: Google-like account entry, Home recommendations, Samples-style short discovery, Explore, Search, Library, playlists, uploads, audio/video playback, lyrics, downloads, podcasts, Premium gates, ad-supported access, support, privacy controls, and account deletion.

The clone must not copy YouTube or Google branding, screenshots, marketing copy, protected UI artwork, private APIs, recommendation systems, music videos, creator channels, comments, Shorts/Samples ranking, uploaded storage implementation, playlist names, or ad targeting logic. Functional parity should use original product language, synthetic or licensed music/video/podcast metadata, provider-approved playback, and independently designed personalization.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first music and podcast app with onboarding, Home, Samples-style discovery, Explore, Search, Library, playlists, uploads, now playing, queue, lyrics, downloads, subscriptions, support, privacy, and account controls.
- Support audio/video switching where licensed, YouTube-like history/recommendation influence, music uploads, podcasts, collaborative playlists, and supervised-account restrictions.
- Preserve media and platform trust expectations around licensing, creator rights, copyright, explicit/made-for-kids content, ads, recommendations, account privacy, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a YouTube- or Google-branded app or imply affiliation with Google LLC, YouTube, artists, creators, record labels, podcast networks, advertisers, or device partners.
- Do not stream production music, music videos, podcasts, comments, captions, Shorts/Samples clips, or user uploads without licensed content and provider approval.
- Do not scrape YouTube, reuse private YouTube APIs, replay network traffic, copy recommendation or ranking models, copy creator metadata, or bypass rights-holder restrictions.
- Do not treat audio/video switching, uploads, sound search, YouTube history, supervised accounts, comments, ads, or YouTube Premium behavior as generic features; each requires product/legal review and hands-on verification.
- Do not claim exact App Store, Play Store, native-device, catalog, personalization, ad, subscription, upload, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/youtube-music/id1017492454 | Official iOS listing, developer, Music category, 13+ age rating, in-app purchases, platform support, privacy labels, catalog/discovery claims, lyrics, uploads, audio/video switching, Premium terms, and YouTube paid-service/privacy links | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.music | Official Android listing, package id, developer, Music & Audio category, ads/in-app purchase disclosure, install/support surface, and data-safety context | Verified 2026-04-19 |
| YouTube Music Premium | https://www.youtube.com/musicpremium | Music Premium positioning, ad-free access, background play, downloads, audio-only/video switching, trial/plan framing, and regional caveats | Verified 2026-04-19 |
| Find Music And Podcasts | https://support.google.com/youtubemusic/answer/13401025?hl=en | Home, Explore, Library, Search, recommendations based on YouTube listening/watching history, podcasts, sound search, and artist/channel pages | Verified 2026-04-19 |
| Download Offline | https://support.google.com/youtubemusic/answer/6313535?hl=en | Premium download/offline behavior, download management, smart downloads, storage/network caveats, and device-specific offline constraints | Verified 2026-04-19 |
| Audio Or Video Mode | https://support.google.com/youtubemusic/answer/6313574?co=GENIE.Platform%3DAndroid&hl=en | Music and podcast audio/video switching, Premium requirement for music audio mode, podcast audio availability, creator-video availability, and regional differences | Verified 2026-04-19 |
| Make Or Edit Playlists | https://support.google.com/youtubemusic/answer/7205933?co=GENIE.Platform%3DAndroid&hl=en | Playlist create/edit/delete, privacy, collaboration, invite links, owner deactivation, YouTube library overlap, and made-for-kids/supervised-account restrictions | Verified 2026-04-19 |
| Samples And Customization | https://support.google.com/youtubemusic/answer/6313542?hl=en | Samples tab, personalized video segments, library/save/share/full-video transitions, and recommendation customization | Verified 2026-04-19 |
| Stored Music Policy | https://support.google.com/youtube/answer/9744173?hl=en | User uploads, private stored music access, user responsibility for rights, storage/playback transformations, and supervised-account feature restrictions | Verified 2026-04-19 |
| Google Privacy Policy | https://policies.google.com/privacy | Account, activity, personalization, device, ads, deletion/export, and privacy-rights modeling | Verified 2026-04-19 |
| YouTube Paid Service Terms | https://www.youtube.com/t/terms_paidservice | Paid membership, billing, cancellation, trials, purchases, and YouTube paid-service constraints | Verified 2026-04-19 |
| YouTube Terms | https://www.youtube.com/t/terms | General platform terms, content, account, restrictions, and service availability constraints | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and help pages position YouTube Music as a music and podcast app with Home recommendations, Explore, Library, Search, artist/channel pages, playlists, uploads, Samples, sound search, lyrics, audio/video switching, downloads, ad-supported access, and Premium gates.
- V1 must model signed-out, free/ad-supported, trial, Premium-like, family-like, student-like, supervised, expired, canceled, refunded, platform-owned, unavailable-plan, region-blocked, rights-blocked, and upload-disabled states.
- Home must support personalized rows, mood/activity chips, recently played, YouTube-history-influenced recommendations if enabled, podcast rows, fresh-account fallback, hidden/recommendation removal, and stale/offline states.
- Explore must support new releases, charts, genres, moods, podcasts, episodes, and country/region-specific rows using original catalog data.
- Samples-style discovery must support short licensed preview clips, save/share/open-full-video actions, hide/report, autoplay/prefetch controls, age/explicit restrictions, and fallback when video clips are unavailable.
- Search must support songs, artists, albums, playlists, videos, podcasts, episodes, uploads, sound search if microphone permission is granted, empty/no-result states, safe-mode filtering, and rights/region filtering.
- Library must support saved songs, albums, artists/subscriptions, playlists, podcasts, episodes, uploads, downloads, recently played for Premium-like users, sort/filter, YouTube-like cross-surface overlap if enabled, and sync conflicts.
- Playlists must support create, edit, delete, privacy, collaboration, invite link, owner deactivation, voting/ranking if added, generated cover blockers, made-for-kids restrictions, supervised-account private defaults, and moderation/report paths.
- Playback must support play, pause, skip, scrub, queue, lyrics when licensed, audio/video toggle, background-play gate, cast/device output abstraction, buffering, rights errors, and creator-video unavailable fallback.
- Uploads must support user-owned file import, metadata, private-only availability, rights attestation, processing state, transcoding failure, storage limits, deletion/export, and supervised-account restrictions.
- Downloads/offline must support Premium gating, storage/network controls, smart-download-like automation, device-bound licenses, removed rights, sign-out invalidation, and periodic entitlement refresh.
- Ads must support ad-supported listening, ad breaks, no-fill, muted/skipped/failed ad states, age restrictions, personalized-ad privacy choices, and separation from royalty/provider accounting.
- Support/privacy/settings must expose account, playback, audio/video, downloads, notifications, subscriptions, supervised account restrictions, uploads, privacy choices, data export, account deletion, legal links, and support paths.

### Manual Verification Required

- Native iOS and Android tab names, Samples behavior, Explore ordering, Now Playing state, queue editing, comments/activity feed exposure, and release-note behavior.
- Google Account signup/login, Premium purchase/restore/cancel, background play, ad delivery, audio/video switching, uploads, downloads, sound search, supervised accounts, family/student eligibility, push payloads, export/delete, and regional catalog differences.

## Core User Journeys

- New listener installs the app, signs in, reviews age/region/legal consent, chooses notification and personalization preferences, and lands on Home with original onboarding copy.
- Returning free listener opens Home, starts a recommended track, hears or sees an ad-supported interruption where eligible, tries background play, and sees a Premium gate.
- Premium-like listener searches for a music video, starts playback, switches to audio mode, opens lyrics, adds the song to a queue, and downloads the playlist for offline use.
- Listener browses Samples-style clips, saves one to Library, opens the full song/video, shares it, and hides unrelated recommendations.
- User uploads an owned audio file, waits through processing, edits metadata, plays it privately, deletes it, and confirms export/deletion behavior.
- Podcast listener follows a show, saves an episode, switches between audio/video if available, downloads it, changes progress, and handles unavailable video.
- Playlist owner creates a playlist, changes privacy, invites collaborators, removes a collaborator, handles made-for-kids restrictions, and deletes the playlist.
- Supervised account opens Library and Search, sees private/default restrictions, cannot save restricted content, and receives age-appropriate error states.
- Privacy-focused listener pauses personalized history, removes recommendations from Home, exports data, deletes account content, and sees upload/library consequences.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, age/region/legal consent | Google-like auth, DOB, country, terms | new, returning, free, Premium | supervised, underage, blocked region, failed auth |
| Home | Personalized recommendations and resume | row taps, chips, play, hide | loading, personalized, fresh account | history off, stale recommendations, ads outage |
| Explore | New releases, charts, genres, podcasts | category, chart, genre, podcast taps | loaded, regional, filtered | unavailable category, rights-blocked row |
| Samples | Short preview discovery | swipe, save, share, open, hide | loading, playing, saved | video unavailable, explicit blocked, low bandwidth |
| Search/Sound Search | Multi-type discovery | text query, filters, microphone | suggestions, results, no-results | mic denied, no match, supervised restriction |
| Catalog Detail | Song/video/album/artist/playlist/podcast detail | play, save, share, download | available, saved, downloaded | removed rights, made-for-kids lock, malformed metadata |
| Now Playing | Playback controls and media context | play, pause, skip, scrub, toggle | audio, video, buffering | background gate, video unavailable, ad break |
| Queue | Ordered playback | add, remove, reorder, clear | empty, editable, session queue | duplicate, free-tier lock, sync conflict |
| Library | Saved content, uploads, downloads | filters, sort, item taps | empty, saved, uploaded, downloaded | deleted upload, sync conflict, signed out |
| Uploads | Private user-stored music | file import, metadata, delete | pending, processed, failed | copyright attestation missing, storage full |
| Playlist Editor | Create/manage playlists and collaboration | title, privacy, invite, add/remove | draft, private, public, collaborative | supervised default, made-for-kids lock, owner disabled link |
| Downloads/Offline | Download manager and smart downloads | download toggles, quality, delete | downloading, downloaded, offline | storage full, expired rights, sign-out invalidation |
| Subscription/Ads | Premium gates and ad state | subscribe, restore, cancel, ad events | free, trial, paid, canceled | platform mismatch, no-fill, webhook delay |
| Settings/Privacy/Support | Account, history, uploads, privacy, legal | toggles, export, delete, contact | loaded, pending export, deleting | active membership blocker, support unavailable |

## Data Model

- `User`: account identity, age band, country/region, auth providers, supervised status, consent, personalization settings, privacy choices, export/deletion state, and restrictions.
- `DeviceSession`: device id, platform, app version, playback capability, video capability, cast capability, notification token, download entitlement, and session expiry.
- `Entitlement`: free, trial, Premium-like, family, student, platform owner, renewal/cancel/refund state, background-play gate, download gate, and audio/video gate.
- `CatalogItem`: polymorphic song, video, album, artist, channel, playlist, podcast, episode, upload, or ad unit with rights, region, explicit, made-for-kids, availability, and display metadata.
- `TrackVideoPair`: mapping between song audio and video asset, creator/channel, rights, region, quality, availability, and fallback behavior.
- `PodcastEpisode`: show owner, episode metadata, audio/video availability, progress, download state, explicit flag, and notification status.
- `UploadAsset`: user file, metadata, album art, processing state, rights attestation, private visibility, storage bytes, deletion/export status, and playback derivatives.
- `Playlist`: owner, title, description, privacy, collaborative state, voting/ranking settings, participant roles, item order, cover metadata, and report/moderation state.
- `PlaybackSession`: current item, audio/video mode, context, queue, position, device, ad break state, quality, repeat/shuffle, and reconciliation cursor.
- `QueueItem`: catalog reference, source context, order, added-by user, lock/edit state, duplicate metadata, and supervised/made-for-kids restrictions.
- `RecommendationSlot`: surface, seed signals, YouTube-history flag, item list, explanation key, freshness, privacy-safe audit metadata, and fallback reason.
- `AdBreak`: placement, creative id, privacy choice, frequency cap, impression/click/skip state, no-fill state, and playback resume cursor.
- `PrivacyRequest`: export, deletion, correction, personalization/history change, upload deletion, status, delivery method, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, entitlement, playback, upload, playlist, download, privacy, support, ad, and moderation-sensitive changes.
- `LocalCacheRecord`: cached home/explore/library/detail/settings, downloads, upload drafts, queue state, offline plays, sync attempts, stale timestamps, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with supervised, age, region, locked-account, and device state.
- `GET /home`, `GET /explore`, `GET /samples`, `GET /recommendations`: discovery surfaces with cache hints, entitlement context, history flag, safe-mode state, and fallback slots.
- `GET /search?q=&type=&cursor=&safe=&region=`, `POST /search/sound`: text and microphone-based search with permission, no-match, and privacy-safe handling.
- `GET /catalog/:type/:id`: canonical detail endpoint returning availability, rights, explicit/made-for-kids state, playable actions, deep links, and stale-data indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, audio/video mode, queue context, position, ad state, and error codes.
- `POST /queue/items`, `PATCH /queue/items/:id`, `DELETE /queue/items/:id`, `POST /queue/reorder`: queue editing with entitlement, supervised, and made-for-kids permissions.
- `GET /lyrics/:trackId`, `POST /lyrics/:trackId/report`: rights-aware lyrics retrieval with synced/plain/unavailable states and incorrect-lyrics reports.
- `POST /uploads`, `PATCH /uploads/:id`, `DELETE /uploads/:id`, `GET /uploads/:id/status`: user-owned stored music import, processing, metadata edit, deletion, and export status.
- `GET /library`, `POST /library/items`, `DELETE /library/items/:id`: saved songs, albums, artists, playlists, podcasts, uploads, downloads, sort, and filters.
- `POST /playlists`, `PATCH /playlists/:id`, `POST /playlists/:id/items`, `DELETE /playlists/:id/items/:itemId`: playlist lifecycle, collaboration, privacy, voting, duplicate warnings, and moderation metadata.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: device-bound downloads, smart-download settings, storage checks, rights refresh, and corrupt-cache recovery.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/click`, `POST /ads/error`: ad selection, client-safe measurement, no-fill, skipped, completed, and privacy-choice states.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: plan lifecycle, platform ownership, restores, refunds, and delayed state.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, history controls, upload deletion, export, account deletion, and warning state.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: catalog, upload, playlist, ad, account, billing, and support workflows.

## Realtime, Push, And Offline Behavior

- Playback state, queue changes, ad breaks, downloads, upload processing, playlist collaboration, subscription changes, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Home, Explore, Samples manifests, search suggestions, catalog detail, library summaries, upload status, playlists, settings, entitlement summary, and support status with stale labels.
- Offline mode may play valid downloads and locally available uploads, preserve a queue composed of offline-eligible items, track local progress, and queue low-risk library/playlist changes for sync.
- Offline mode must block non-downloaded streams, ad-required streams when ad service is unavailable, uploads, sound search, subscription purchase/cancel, account deletion, support evidence upload, and irreversible deletes.
- Downloads must be device-bound, storage-aware, resumable, and invalidated on sign-out, revoked entitlement, region loss, deleted catalog item, or expired provider rights.
- Audio/video mode must reconcile with available assets, entitlement gates, bandwidth constraints, app backgrounding, cast route state, and creator-video availability.
- Push notifications must be opt-in and category-controlled for artist/channel activity, playlist collaboration, podcast updates, subscription/billing, upload processing, support cases, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact listening history, private upload names, child/supervised details, payment state, and support evidence.

## Permissions, Privacy, And Safety

- Notifications, microphone/sound search, local network/cast, Bluetooth/proximity, camera/QR, photos/files/uploads, contacts, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact listening/watching history, uploaded file names, playlist titles, child/supervised identifiers, payment details, device names, IP-level location, and support evidence.
- Music catalog, music videos, podcast files, lyrics/captions, comments/activity, uploads, and Samples clips are licensed-content launch blockers with legal/catalog/provider owners.
- Copyright, trademark, rightsholder takedown, Content ID-like matching, user upload abuse, stream fraud, creator impersonation, comments abuse, and made-for-kids restrictions require launch-blocking review.
- Explicit and supervised-account controls must support hidden/blocked content, private playlist defaults, save/share restrictions, reporting, and region/age-specific handling.
- Ads must honor privacy choices, age restrictions, sensitive categories, frequency caps, regional ad rules, and measurement minimization.
- Recommendations must avoid sensitive inference leakage, support privacy-safe explanations, respect history/personalization controls, and provide fallback content when personalization is disabled.
- Account deletion/export must warn about uploads, playlists, subscriptions, support cases, ads accounts if any, and legal/rights retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, captions/transcripts where licensed, accessible queue controls, and nonvisual alternatives for sound search.
- Launch owners: catalog/legal owner for licensed media and uploads; privacy owner for data rights and ads choices; trust/safety owner for supervised, explicit, upload, comments, and creator abuse; billing owner for entitlements; accessibility owner for playback/library UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, sound search attempted, home/explore/sample viewed, catalog opened, playback started/completed/failed, audio/video mode changed, queue edited, playlist created, upload processed, download completed, ad impression/completion, entitlement changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, supervised flag bucket, region bucket, error code, latency bucket, and provider status rather than raw titles, search text, upload names, exact listening/watching history, or child identifiers.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, skip, save, hide, and report actions without exposing private user content.
- Playback analytics must support royalty/provider accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Ad analytics must capture impression, completion, skip, click, no-fill, creative error, frequency cap, placement, and privacy-choice state without exposing sensitive listener identity.
- Monetization may include original free/ad-supported access, Premium-like subscriptions, household plans, student verification, upload storage add-ons, and provider-approved promotion products after legal review.
- Any paid plan, upload storage product, ad product, or creator promotion must disclose price, renewal/cancellation, refund/support path, platform ownership, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, supervised account, expired session, account locked, passwordless login failure, or social/platform auth revoked.
- Search result exists but is not playable because of region, explicit/made-for-kids restriction, removed rights, expired license, unavailable plan, hidden item, or malformed catalog metadata.
- Audio mode is requested for content with no audio-only asset, video mode is requested on low bandwidth, creator removes video, or background playback is gated by entitlement.
- Samples preview fails, save/share is blocked by age restrictions, preview clip maps to unavailable full content, or personalized discovery is disabled.
- Upload exceeds storage limit, lacks rights attestation, processing fails, metadata is malformed, user deletes while offline, or export/delete races with processing.
- Download exceeds storage, smart-download deletes expected content, rights expire, app cache is cleared, user signs out while offline, or ad-required content cannot play offline.
- Playlist invite expires, owner disables collaboration, supervised account defaults private, made-for-kids content blocks saving/sharing, voting is disabled for safety, or collaborator abuses metadata.
- Ad service returns no fill, creative fails mid-playback, listener opted out of personalized ads, campaign target is age-sensitive, or measurement is delayed.
- Privacy export email fails, account deletion requested with uploads/playlists/subscription, or legal retention prevents full deletion.

## Test Plan

- Unit tests for entitlement gating, playback state machine, audio/video mode, queue edits, download validation, upload processing, supervised restrictions, ad state, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, cursor reconciliation, idempotency keys, error codes, rights states, ad states, upload states, and webhook duplicates.
- Integration tests for auth, Home, Explore, Samples, search, sound search denial, catalog detail, playback start/stop, save/follow, playlist create/edit, upload import/delete, queue edit, library filters, and settings.
- Playback tests for buffering, background gate, ad break, audio/video toggle, video unavailable, cast route change, lyrics unavailable, rights failure, and local cache stale state.
- Offline tests for valid downloads, missing downloads, uploaded content, corrupt cache, disk full, expired rights, sign-out invalidation, queued low-risk writes, and reconnect reconciliation.
- Playlist/supervised tests for create/edit/delete, collaboration invite, privacy, made-for-kids restrictions, private default, voting off, owner deactivation, and abuse/report path.
- Privacy tests for personalization/history controls, ads choices, data export, upload deletion, account deletion, deletion blockers, support redaction, and analytics minimization.
- Ads tests for ad-supported playback, no-fill, skipped/completed ad, privacy opt-out, frequency cap, underage block, campaign state, and measurement delay.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, captions/transcripts, queue reordering, media controls, and sound-search alternatives.
- Manual verification tests: native iOS/Android screenshots, Premium purchase/restore/cancel, ad delivery, background play, downloads, audio/video toggle, uploads, Samples, podcasts, sound search, supervised accounts, push payloads, export/delete, and regional catalog behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing YouTube assets, network traffic, private APIs, recommendation systems, catalog/video data, ad infrastructure, upload storage implementation, or brand copy.
- New and returning users can discover, search, play, save, queue, organize, upload, share, and recover music/podcast content using original licensed or synthetic data.
- Music, podcast, video, upload, playlist, queue, download, subscription, ad, supervised, privacy, and support workflows have deterministic data models and API contracts.
- Free/ad-supported, Premium-like, household, student, supervised, upload-enabled, expired, canceled, refunded, and unavailable entitlement states are covered by tests.
- Offline playback, downloads, audio/video switching, uploads, ads, recommendations, sound search, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Licensed-media, uploads/copyright, made-for-kids/supervised controls, ads/privacy, billing, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which licensed music catalog provider, video provider, podcast provider, upload-storage provider, lyrics provider, and ad provider will back the original clone?
- Which features are V1 versus later: Samples, audio/video toggle, uploads, sound search, downloads, podcasts, comments/activity, collaborative playlists, supervised accounts, or ads?
- Will V1 support a free ad-funded tier, or start with synthetic/demo catalog plus paid internal test entitlements?
- Which payment platforms own subscriptions and restores: app stores, web checkout, both, or a provider-managed subscription service?
- What privacy posture should YouTube-like history use by default, and how should history-disabled listening affect recommendations, ads, and analytics?
- Which regions, languages, explicit/made-for-kids rules, upload rights, and device integrations are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, Explore, Search, catalog detail, Library, Now Playing, queue, synthetic catalog seed data, and privacy-safe analytics.
- Phase 2: add playlist CRUD/collaboration, save/follow actions, podcasts, library filters, explicit/supervised restrictions, report/support/settings, and account privacy controls.
- Phase 3: add licensed playback provider abstraction, audio/video asset mapping, playback state machine, lyrics provider abstraction, queue reconciliation, and provider error handling.
- Phase 4: add uploads, rights attestation, processing states, private library behavior, deletion/export hooks, and upload regression tests.
- Phase 5: add downloads/offline mode, smart-download settings, storage management, entitlement-aware rights refresh, corrupt-cache recovery, and offline regression tests.
- Phase 6: add subscriptions, checkout/restore/webhooks, Premium gates, ad-supported playback, ad measurement minimization, and billing/ad regression tests.
- Phase 7: add Samples-style discovery, sound search, push notifications, cast/device review, accessibility pass, and manual native verification.
- Phase 8: complete legal/provider launch review for licensed catalog, uploads, ads, recommendations, supervised accounts, data deletion/export, regional availability, and platform APIs.

## Next Steps

- Resolve YouTube Music manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 audio implementation-readiness upgrades with `069-soundcloud.md`.
