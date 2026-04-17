# Spotify-Style Clone Spec

> Metadata
> - Inspiration app: Spotify
> - Category: Music, podcasts, audiobooks, social listening, creator tools, subscriptions, and advertising-supported audio
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Spotify support articles, Spotify legal/privacy pages, Premium plan pages, Spotify for Artists/Creators references, Spotify Ads Manager references, and Spotify developer playback constraints.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, subscription purchase/restore/cancel, free-tier playback limits, ads delivery, personalized recommendations, downloads/offline playback, queue behavior, lyrics availability, audiobook entitlements, Spotify Connect-style device handoff, Jam/SharePlay, Family/Kids controls, creator dashboards, podcast publishing, push payloads, privacy export, account deletion, regional catalog availability, and rights-licensed catalog behavior still require lawful test devices/accounts and provider approvals before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, audio catalog, podcast catalog, audiobook catalog, recommendation models, ad tech, creator tooling, payment providers, device integrations, and licensing relationships.

## Overview

Build an original mobile audio app inspired by Spotify's public workflow: account entry, music/podcast/audiobook discovery, search, home recommendations, library, playlists, now playing, queue, lyrics, downloads, offline mode, cross-device playback, shared listening, subscriptions, ad-supported listening, family controls, creator entry points, support, privacy controls, and account deletion.

The clone must not copy Spotify branding, screenshots, marketing copy, protected UI artwork, private APIs, recommendation systems, playlist names, editorial collections, licensed recordings, podcasts, audiobooks, artist data, social graph, or ad targeting logic. Functional parity should be expressed with original product language, synthetic or licensed audio metadata, independently designed recommendation rules, and provider-approved catalog/playback integrations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first audio app with onboarding, home discovery, search, catalog detail, library, playlists, now playing, queue, downloads, social sharing, device handoff, subscriptions, ad-supported access, support, and privacy controls.
- Support music, podcasts, and audiobooks as separate content types with shared playback primitives and content-type-specific entitlements, metadata, rights, and progress rules.
- Preserve media-category trust expectations around licensing, copyright, explicit content, minors, creator impersonation, ads, recommendations, account privacy, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Spotify-branded app or imply affiliation with Spotify, Spotify AB, record labels, publishers, podcast networks, audiobook publishers, device partners, or advertising partners.
- Do not stream production music, podcasts, audiobooks, lyrics, canvases, videos, or live events without licensed content and provider approval.
- Do not scrape Spotify, reuse private Spotify APIs, replay network traffic, copy recommendation or ranking models, copy playlist/editorial names, or bypass rights-holder restrictions.
- Do not treat free-tier limits, ads, downloads, audiobook hours, family controls, creator dashboards, or device handoff as generic features; each needs explicit entitlement and provider design.
- Do not claim exact App Store, Play Store, native-device, catalog, personalization, ad-delivery, subscription, creator-tool, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580 | Official iOS listing, developer, Music category, 13+ age rating, platform support, privacy labels, music/podcast/audiobook positioning, Premium/offline claims, Connect/Jam references, latest version context | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.spotify.music | Official Android listing, package id, ads and in-app purchase disclosure, download scale, content rating, music/podcast/audiobook positioning, Wear OS/device support, data safety, support email | Verified 2026-04-17 |
| Spotify Premium | https://www.spotify.com/premium/ | Free vs Premium feature framing, Individual/Student/Duo/Family/Audiobooks Access plan types, ad-free listening, downloads, on-demand playback, queue organization, shared listening, and cancellation framing | Verified 2026-04-17 |
| Premium Duo | https://www.spotify.com/us/duo/ | Two-account household plan, plan manager billing, separate recommendations, address requirement, audiobook hours for manager, and cancellation framing | Verified 2026-04-17 |
| Premium Family | https://www.spotify.com/us/family/ | Family plan structure, up to 6 accounts, same-address requirement, managed accounts for young listeners, parental controls, and audiobook manager entitlement | Verified 2026-04-17 |
| Family Plan Help | https://support.spotify.com/us/article/family-plan-ios/ | Family manager role, invite/remove behavior, separate accounts, same-home requirement, explicit content filters, and member switching constraints | Verified 2026-04-17 |
| Spotify Kids | https://support.spotify.com/us/article/spotify-kids/ | Kids account creation, family-friendly audio, offline/ad-free listening, parent PIN/settings, shared playlists, blocked content, and child privacy notes | Verified 2026-04-17 |
| Listen Offline | https://support.spotify.com/us/article/listen-offline/ | Premium music/podcast downloads, free podcast downloads, device/track limits, 30-day online check-in, storage troubleshooting, and Offline Mode | Verified 2026-04-17 |
| Now Playing | https://support.spotify.com/us/article/now-playing/ | Play/pause/skip, save, shuffle, repeat, queue, and Connect entry points from the playback surface | Verified 2026-04-17 |
| Play Queue | https://support.spotify.com/us/article/play-queue/ | Queue visibility and editing across mobile, tablet, desktop, and web player | Verified 2026-04-17 |
| Lyrics | https://support.spotify.com/us/article/lyrics/ | Lyrics availability caveats, free/Premium access, device/market/rightsholder variation, and mobile lyric preview controls | Verified 2026-04-17 |
| Spotify Connect | https://support.spotify.com/us/article/spotify-connect/ | Remote playback control across devices, same-Wi-Fi first connection, device picker, local network permission, reconnect behavior, and lossless caveats | Verified 2026-04-17 |
| Jam | https://support.spotify.com/us/article/jam/ | Shared listening, host/guest roles, Premium host requirement, QR/link/proximity invite, remote joining requirements, volume and playback control rules | Verified 2026-04-17 |
| SharePlay | https://support.spotify.com/us/article/spotify-on-shareplay/ | Premium mobile/tablet SharePlay support, FaceTime session entry, shared control, supported OS, and session ending behavior | Verified 2026-04-17 |
| Audiobooks Purchase | https://support.spotify.com/us/article/audiobooks-purchase/ | Audiobook discovery, samples, save/unlock, web purchase, app playback after unlock, account-bound access, downloads, and extras | Verified 2026-04-17 |
| Audiobooks In Premium | https://support.spotify.com/us/article/audiobooks-premium-plans/ | Included monthly listening hours, plan eligibility, manager-only Family/Duo access, top-ups/add-ons, expiration, and offline tracking caveats | Verified 2026-04-17 |
| Data Rights And Privacy Choices | https://support.spotify.com/us/article/data-rights-and-privacy-settings/ | Privacy Center, data download, processing controls, tailored ads choices, portability, and personal-data updates | Verified 2026-04-17 |
| Account Closure | https://support.spotify.com/us/article/how-can-i-close-my-spotify-account/ | Premium/free account closure paths, deletion, audiobook/live-ticket loss warning, 7-day reactivation, and email reuse timing | Verified 2026-04-17 |
| Privacy Policy | https://www.spotify.com/legal/privacy-policy/ | User data, usage data, voice/message/payment data, public profile/playlists, search query retention, deletion/de-identification, security, and children/privacy controls | Verified 2026-04-17 |
| Platform Rules | https://www.spotify.com/us/safetyandprivacy/platform-rules | Dangerous, deceptive, sensitive, illegal, and infringing-content moderation frame for listeners and contributors | Verified 2026-04-17 |
| Explicit Content Filter | https://support.spotify.com/us/article/explicit-content/ | Explicit tags, reporting incorrect tags, account-level filtering, grayed/skipped content, Connect interaction, and Family manager controls | Verified 2026-04-17 |
| Private Listening | https://support.spotify.com/us/article/private-listening/ | Private Session availability on mobile/tablet/desktop and listening activity privacy behavior | Verified 2026-04-17 |
| Spotify for Artists | https://support.spotify.com/us/article/spotify-for-artists/ | Artist profile management, promotion, playlist pitching, stream/audience stats, and artist-help entry points | Verified 2026-04-17 |
| Spotify Ads Manager | https://help.adanalytics.spotify.com/about-spotify-ads-manager | Self-serve campaign creation, audio/video ads, minimum budget framing, targeting forecasts, reporting, asset library, and credential flow | Verified 2026-04-17 |
| Web Playback SDK | https://developer.spotify.com/documentation/web-playback-sdk | Developer playback surface, Spotify Connect device model, browser support, Premium/access-token requirement, iOS/autoplay limitations, and commercial/policy constraints | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position the app as a free music, podcast, and audiobook app with Premium upgrades for ad-free listening, downloads, on-demand playback, high audio quality, shared listening, and queue control.
- V1 must support email/social account entry, free account, Premium entitlement, expired subscription, unavailable plan, locked account, underage/managed account, and region-blocked states.
- Home must support personalized sections, recently played/resume, new releases, podcasts, audiobooks, charts, genre/mood/category browse, creator recommendations, events, editorial slots, and degraded recommendation fallbacks.
- Search must support typed search for songs, artists, albums, playlists, podcasts, episodes, audiobooks, categories, lyrics-like matching if licensed, empty/no-result states, safe/explicit filtering, and rights/region filtering.
- Catalog detail must support track, album, artist, playlist, podcast show, episode, audiobook, live event, and creator pages with save/follow/share/play/download/preview affordances as applicable.
- Playback must support Now Playing controls for play, pause, skip, save, shuffle, repeat, queue, device picker, lyrics, speed for podcasts/audiobooks where licensed, chapter/progress for audiobooks, and unavailable-content recovery.
- Queue must support view, add next, reorder, remove, clear, session-owned queue, shared-session queue, offline queue restrictions, and entitlement-dependent queue organization.
- Library must support liked songs, saved albums, followed artists, playlists, podcast shows, saved episodes, saved/unlocked audiobooks, downloads, recent activity, filters, sort, and empty library education.
- Playlist flows must support create, rename, delete, public/private, collaborative participation, add/remove tracks, duplicate detection, recommended additions, cover/artwork metadata, share links, reporting, and owner/moderator controls.
- Downloads/offline mode must support content-type-specific eligibility, device limits, storage checks, download status, corrupt-cache recovery, required online check-in, removed-rights handling, and account/sign-out invalidation.
- Lyrics must be treated as rights-dependent content; V1 must show unavailable lyrics, delayed sync, incorrect tag/report path, and device/market differences rather than assuming every track has lyrics.
- Spotify Connect-style handoff must support device discovery, same-network first connect, local-network permission on iOS, remote playback state, reconnect after pause, unavailable device, volume handoff, and multi-device conflict handling.
- Jam/SharePlay-style shared listening must support host/guest roles, invite links/QR/proximity, Premium host gating, remote/in-person join modes, participant list, queue contribution, control permissions, host leaving, and abuse/report controls.
- Podcasts must support show follow, episode save, episode progress, download, playback speed, chapters when available, transcripts if licensed, new-episode notifications, show ratings where supported, and explicit-content controls.
- Audiobooks must support browse/search, detail, sample, save, web unlock or plan-included access, listening-hour balance, monthly reset, top-ups/add-ons, account-bound access, offline download, progress/chapter state, and refund/support blockers.
- Premium plans must be modeled as original entitlements equivalent to free, trial, Individual, Duo, Family, Student, Basic-like, Audiobooks Access-like, add-on, top-up, expired, canceled, refunded, platform-owned, and web-owned states.
- Family and young-listener controls must support manager-owned billing, invites, same-household verification, member removal, separate recommendations, explicit filtering, managed/kids accounts, parent PIN, shared playlists, and young-listener privacy constraints.
- Ads must support ad-supported free listening, audio/video/display campaign slots, frequency caps, targeting eligibility, privacy choices, measurement events, muted/unfilled ad states, and advertiser tooling only through approved original ad infrastructure.
- Creator entry points must support artist/profile claims, profile metadata, release/pitching status, audience stats, content-policy checks, podcast/creator management links, and impersonation/mislabeled-content reports without copying Spotify tools.
- Support/privacy/settings must expose account, profile, notifications, explicit content, private session/listening activity, connected devices, downloads/storage, subscriptions, billing, ads/privacy choices, data export, account closure/deletion, legal links, and support/community paths.
- Developer playback integrations must be treated as non-production reference only unless provider terms allow commercial streaming, content alteration, synchronization, broadcasting, and data access for the intended clone.

## Core User Journeys

- New listener installs the app, creates an account, confirms age/region, reviews terms/privacy, chooses optional notification and personalization preferences, and lands on Home with original onboarding copy.
- Returning free listener opens Home, searches for an artist, plays a permitted track/playlist state, hears ad-supported interruptions where eligible, saves a track, and sees Premium-gated affordances for downloads or full control.
- Premium listener searches for an album, starts playback, opens Now Playing, views lyrics when licensed, adds songs to the queue, switches to another device, and resumes after reconnect.
- Listener creates a playlist, adds multiple tracks, handles duplicate warnings, toggles public/private state, shares a link, makes it collaborative, removes an abusive collaborator, and reports inappropriate artwork or title text.
- Listener loses connectivity, uses downloaded content in Offline Mode, sees unavailable non-downloaded tracks grayed out, handles corrupt cache or expired online check-in, and reconciles play counts after reconnect.
- Podcast listener follows a show, saves an episode, downloads it, changes playback speed, resumes from progress, receives a new-episode notification, and manages explicit-content visibility.
- Audiobook listener browses a title, plays a sample, unlocks or uses plan-included listening time, tracks remaining hours, downloads the book, handles expired monthly hours/top-up state, and opens refund/support help.
- Family manager subscribes to a household plan, invites members, sets explicit filters, creates a young-listener account, shares an approved playlist, adjusts parental controls, and removes a member.
- Friends start a shared session, invite guests by QR/link/proximity, add songs to the shared queue, adjust host playback permissions, handle one guest leaving, and close the session when the host exits.
- Privacy-focused listener starts a Private Session, changes tailored-ad choices, downloads personal data, closes the account, and handles reactivation and purchased-content loss warnings.
- Creator claims an artist profile, edits public metadata, reviews stream/audience stats, pitches or schedules content through provider-approved tooling, and reports mislabeled or impersonating content.
- Advertiser or internal operator creates an original audio/video ad campaign in approved tooling, uploads assets, forecasts reach, launches, monitors reporting, and respects user privacy/ad-choice settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, age/region/legal consent, and return login | email/social auth, DOB, country, terms | new, returning, free, Premium, locked | underage, blocked region, failed auth, account closed |
| Home | Personalized discovery and resume surface | play, save, filter, section taps | loading, personalized, fresh account, offline | stale recommendations, unavailable catalog, ad outage |
| Search/Browse | Query and category discovery | query, filters, categories, voice/search text if added | empty, suggestions, results, no-results | explicit filtered, rights-blocked, typo, network failure |
| Catalog Detail | Track/album/artist/playlist/show/episode/audiobook detail | play, save, follow, share, download | available, saved, followed, unlocked | removed rights, region lock, explicit block, malformed metadata |
| Now Playing | Playback controls and media context | play, pause, skip, save, lyrics, queue, device | playing, paused, buffering, ended | stream fail, DRM/license error, lyrics unavailable, ad break |
| Queue | Ordered upcoming playback | add, remove, reorder, clear | empty, editable, session queue | free-tier locked, shared-session conflict, duplicate item |
| Library | User collection and downloads | filters, sort, playlist/show/audiobook selection | empty, saved, downloaded, filtered | deleted item, corrupt cache, signed-out, storage full |
| Playlist Editor | Create and manage playlists | title, description, privacy, add/remove, collaborators | draft, published, collaborative | duplicate track, abusive metadata, owner removed, artwork reject |
| Downloads/Offline | Download manager and offline mode | download toggles, storage settings, refresh | downloading, downloaded, offline | device limit, 30-day check-in expired, rights removed, disk full |
| Devices/Connect | Cross-device playback handoff | device picker, Wi-Fi/Bluetooth/local network | local, remote, connecting, connected | permission denied, duplicate names, stale device, reconnect needed |
| Jam/Shared Listening | Synchronous group listening | invite, QR, proximity, add queue, host controls | host, guest, remote, in-person | host leaves, guest abuse, Premium gate, volume unsupported |
| Podcasts | Show follow, episode detail, playback progress | follow, save, download, speed | following, new episode, resumed | explicit filtered, transcript missing, download failed |
| Audiobooks | Discovery, unlock, listening hours, chapters | sample, save, unlock, listen, top-up | sample, unlocked, included, exhausted | web-only purchase, hours expired, region unavailable, refund |
| Subscription/Billing | Plans, checkout, restore, cancel, add-ons | plan select, payment, restore, cancel | free, trial, paid, canceled | platform mismatch, webhook delay, refund, student verification fail |
| Family/Kids | Household membership and parental controls | invites, address, filters, PIN, managed accounts | manager, member, child, filtered | address mismatch, member switch limit, forgotten PIN, explicit leak |
| Creator Tools | Artist/podcast profile and stats entry | claim, edit, pitch, stats, report | unclaimed, claimed, pending, active | impersonation, distributor mismatch, policy violation, stats delay |
| Ads/Promotions | Ad inventory and advertiser campaign support | campaign, asset, targeting, report | draft, active, paused, complete | disapproved asset, no fill, privacy opt-out, measurement delay |
| Settings/Privacy/Support | Account, notifications, privacy, deletion, help | toggles, export, delete, contact | loaded, pending export, deleting | account closure blocker, support unavailable, legal hold |

## Data Model

- `User`: account identity, age band, country/region, auth providers, plan ownership, consent, privacy choices, deletion/export state, and restrictions.
- `DeviceSession`: device id, platform, app version, playback capability, local network permission, notification token, download entitlement, and session expiry.
- `Subscription`: plan type, manager/member role, platform owner, trial/renewal/cancel/refund state, add-ons, top-ups, eligibility, and feature gates.
- `FamilyGroup`: manager, address verification state, members, managed accounts, explicit filters, shared playlists, invite lifecycle, and member-switch constraints.
- `CatalogItem`: polymorphic track, album, artist, playlist, show, episode, audiobook, event, or ad unit with rights, region, explicit, availability, and display metadata.
- `Track`: recording metadata, artist links, album, ISRC-like original identifier, lyrics availability, audio-quality rights, explicit flag, and unavailable reason.
- `PodcastEpisode`: show owner, episode metadata, progress, download state, transcript/chapter availability, explicit flag, and notification status.
- `AudiobookTitle`: author/narrator, unlock state, sample, chapter list, listening-hour accounting, top-up/add-on eligibility, extras, and refund/support status.
- `Playlist`: owner, title, description, privacy, collaborative state, track order, recommendations, artwork metadata, report/moderation state, and version.
- `PlaybackSession`: current item, context, queue, position, device, ad break state, shared-session id, quality, repeat/shuffle, and reconciliation cursor.
- `QueueItem`: catalog reference, source context, added-by user, order, lock/edit state, shared-session permissions, and duplicate/reference metadata.
- `DownloadAsset`: content reference, entitlement, device, quality, bytes, expiration/check-in, rights status, corrupt-cache marker, and retry count.
- `RecommendationSlot`: surface, algorithm version, seed signals, item list, explanation key, freshness, privacy-safe audit metadata, and fallback reason.
- `AdCampaign`: advertiser, campaign objective, approved assets, targeting categories, frequency caps, budget, pacing, measurement, and policy state.
- `CreatorProfile`: artist/podcast owner, claim state, distributor link, public metadata, stats summaries, pitch/release status, and impersonation reports.
- `ContentReport`: reported object, reporter, policy category, evidence metadata, moderation queue, action state, appeal, and audit references.
- `PrivacyRequest`: export, deletion, correction, portability, tailored-ad opt-out, account closure, status, delivery method, and retention/legal hold notes.
- `AuditEvent`: append-only auth, entitlement, playback, privacy, deletion, family, creator, ad, moderation, and support-sensitive changes.
- `LocalCacheRecord`: cached home/library/detail/settings, downloads, queue drafts, offline plays, sync attempts, stale timestamps, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age, region, blocked account, and device state.
- `GET /home`, `GET /browse/categories`, `GET /recommendations`: personalized surfaces with cache hints, recommendation explanations, entitlement context, and fallback slots.
- `GET /search?q=&type=&cursor=&explicit=&region=`: multi-type search for catalog, creators, playlists, podcasts, episodes, audiobooks, and categories with rights filtering.
- `GET /catalog/:type/:id`: canonical detail endpoint returning availability, rights, explicit filter state, actions, deep links, and stale-data indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, device id, queue context, position, and error codes.
- `POST /queue/items`, `PATCH /queue/items/:id`, `DELETE /queue/items/:id`, `POST /queue/reorder`: queue editing with entitlement, shared-session permissions, and conflict resolution.
- `GET /lyrics/:trackId`, `POST /lyrics/:trackId/report`: rights-aware lyrics retrieval with synced/plain/unavailable states and incorrect-lyrics reports.
- `GET /library`, `POST /library/items`, `DELETE /library/items/:id`: saved songs, albums, artists, playlists, shows, episodes, audiobooks, downloads, sort, and filters.
- `POST /playlists`, `PATCH /playlists/:id`, `POST /playlists/:id/items`, `DELETE /playlists/:id/items/:itemId`: playlist lifecycle, collaboration, privacy, duplicate warnings, and moderation metadata.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: device-bound download state, storage checks, rights refresh, 30-day validation, and corrupt-cache recovery.
- `GET /devices`, `POST /devices/:id/connect`, `PATCH /devices/:id/playback`: Connect-style device discovery and handoff with local-network permission, capability, and reconnect handling.
- `POST /jams`, `POST /jams/:id/invites`, `POST /jams/:id/join`, `PATCH /jams/:id/controls`, `DELETE /jams/:id`: shared listening host/guest lifecycle, invite tokens, queue rights, and host close.
- `GET /podcasts/:id`, `POST /podcasts/:id/follow`, `GET /episodes/:id/progress`, `PATCH /episodes/:id/progress`: show follow and episode progress/download contracts.
- `GET /audiobooks`, `POST /audiobooks/:id/unlock`, `GET /audiobooks/:id/hours`, `POST /audiobooks/top-ups`: audiobook access, web purchase handoff, monthly hours, add-ons, and account-bound unlocks.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: plan lifecycle, platform/web ownership, webhooks, restores, refunds, and delayed state.
- `GET /family`, `POST /family/invites`, `PATCH /family/members/:id`, `POST /family/managed-accounts`: household members, explicit filters, young-listener accounts, PIN actions, and audit events.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: content/user/report/support workflows with moderation status and escalation.
- `GET /creator/profile`, `POST /creator/claim`, `PATCH /creator/profile`, `GET /creator/stats`: artist/podcast claim, public profile edit, stats summaries, and policy review handoff.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/click`, `POST /ads/error`: ad selection, client-safe measurement, no-fill, skipped, completed, and privacy-choice states.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, account deletion, closure reactivation window, and purchased-content warnings.

## Realtime, Push, And Offline Behavior

- Playback state, queue changes, device handoff, shared-session membership, ads, downloads, subscription changes, family changes, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache home, search suggestions, catalog detail, library summaries, playlists, settings, entitlement summary, recent activity, and support status with stale labels.
- Offline mode may play valid downloaded content, preserve queue state for downloaded items, track local progress, and queue low-risk library changes for sync.
- Offline mode must block non-downloaded streams, ad-required streams when ad service is unavailable, subscription purchase/cancel, account deletion, family changes, creator edits, ad campaign edits, and support evidence upload.
- Downloads must be device-bound, periodically revalidated, rights-aware, storage-aware, resumable, and invalidated on sign-out, revoked entitlement, region loss, deleted catalog item, or expired check-in.
- Realtime playback events must be idempotent, ordered by server cursor, and reconciled after reconnect, app foreground, token refresh, device switch, and clock skew.
- Push notifications must be opt-in and category-controlled for new episodes, creator releases, shared playlist/Jam invites, subscription/billing alerts, family activity, support cases, privacy export, and account security.
- Push payloads must minimize sensitive content; default payloads should avoid exact listening history, private playlist names, young-listener details, payment state, and support evidence.
- Ad breaks must tolerate no-fill, failed creative, muted app, offline transition, backgrounding, and frequency-cap conflicts without corrupting playback state.
- Long-running flows must expose pending, complete, failed, canceled, expired, blocked, held, and provider-degraded states with recovery actions.

## Permissions, Privacy, And Safety

- Notifications, local network, Bluetooth/proximity, microphone, contacts, photos/files, camera/QR, location, and health/fitness integrations must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, precise listening history, audio content, playlist titles, child profile data, payment details, device names, IP-level location, support evidence, and creator private stats.
- Music, podcast, audiobook, lyrics, video, Canvas-like visuals, transcripts, and live-event data are licensed-content launch blockers with legal, catalog, and provider owners.
- Copyright, trademark, rightsholder takedown, royalty reporting, stream fraud, creator impersonation, mislabeled releases, and distributor disputes require launch-blocking review.
- Explicit content must support account-level filters, family-manager filters, managed-account restrictions, grayed/skipped content, reporting incorrect tags, and region/age-specific handling.
- Young-listener and family features require age gates, parent/manager controls, privacy minimization, restricted social features, clear sponsor/manager visibility, and deletion/export behavior.
- Recommendations must avoid sensitive inference leakage, support privacy-safe explanations, respect Private Session/listening-activity controls, and provide fallback content when personalization is disabled.
- Ads must honor privacy choices, age restrictions, sensitive categories, frequency caps, regional ad rules, and measurement minimization.
- Account deletion/export must warn about purchased audiobooks, live tickets/events, subscriptions, family membership, creator profiles, ads accounts, support cases, and legal/rights retention.
- Creator tools must include authorization, team roles, public-profile review, prohibited-content policy, impersonation handling, and support appeals.
- Developer/API integrations must be reviewed against provider terms before any production use; commercial streaming, content alteration, sync-to-video, broadcasting, and restricted catalog data are explicit blockers.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, captions/transcripts where licensed, accessible queue controls, and nonvisual alternatives for QR/proximity joins.
- Launch owners: catalog/legal owner for licensed media; privacy owner for data rights and ads choices; trust/safety owner for explicit, abuse, and creator impersonation; billing owner for entitlements; family/minors owner for managed accounts; accessibility owner for playback and library UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, home section viewed, catalog opened, playback started/completed/failed, queue edited, playlist created, download started/completed/failed, device connected, Jam started/joined, podcast followed, audiobook sampled/unlocked, entitlement changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, region bucket, error code, latency bucket, and provider status rather than raw titles, search text, playlist names, exact listening history, or child identifiers.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, skip, save, hide, and report actions without exposing private user content.
- Playback analytics must support royalty/provider accounting separately from product analytics and must minimize data shared outside required licensing/reporting pipelines.
- Ad analytics must capture impression, completion, skip, click, no-fill, creative error, frequency cap, placement, and privacy-choice state without exposing sensitive listener identity.
- Creator analytics must aggregate streams, saves, follows, audience regions, and campaign outcomes with role-based access and anti-fraud protections.
- Monetization may include original free/ad-supported access, Premium-like subscriptions, household plans, student verification, audiobook add-ons/top-ups, creator promotion tools, advertiser campaigns, and original merchandise/event integrations after legal review.
- Any paid plan, top-up, ad product, creator promotion, or event/ticket feature must disclose price, renewal/cancellation, refund/support path, platform ownership, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, underage user, managed child account, expired session, account locked, passwordless login failure, or social auth revoked.
- Search result exists but is not playable because of region, explicit filter, removed rights, expired license, unavailable plan, hidden item, or malformed catalog metadata.
- Track starts then rights change mid-session, playback transfers to another device, queue is edited on two devices, or stream fails during an ad break.
- Lyrics are delayed, missing, unsynced, wrong for a track, unavailable on a device, hidden by content restrictions, or removed by rights-holder changes.
- Download exceeds device limit, storage fills, 30-day check-in expires, app cache is cleared, battery saver kills download, or user signs out while offline.
- Shared session invite expires, QR is screenshotted, proximity join fails, host loses Premium, guest abuses queue, host leaves, or remote participant has incompatible device.
- Family member fails address verification, exceeds plan-switch cadence, manager loses payment method, child forgets PIN, explicit content is mislabeled, or manager closes account.
- Audiobook hours expire, top-up is purchased near renewal, offline audiobook progress delays hour accounting, purchase is web-only, title is removed, or refund is requested after listening.
- Ad service returns no fill, creative is disapproved after campaign start, listener opted out of tailored ads, campaign target is underage-sensitive, or measurement pixel is delayed.
- Creator claim conflicts with another team, distributor metadata routes a release to the wrong profile, public stats are delayed, or content is removed after policy review.
- Privacy export email fails, account deletion requested with active subscription/family/creator/ad account, 7-day reactivation expires, or legal retention prevents full deletion.

## Test Plan

- Unit tests for entitlement gating, playback state machine, queue edits, download validation, explicit filters, family roles, audiobook hour accounting, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, cursor reconciliation, idempotency keys, error codes, rights states, and webhook duplicates.
- Integration tests for auth, Home, search, catalog detail, playback start/stop, save/follow, playlist create/edit, queue edit, library filters, and settings.
- Playback tests for buffering, skip, repeat, shuffle, lyrics unavailable, device transfer, remote reconnect, ad break, rights failure, and local cache stale state.
- Offline tests for valid downloads, missing downloads, corrupt cache, disk full, expired check-in, sign-out invalidation, queued low-risk writes, and reconnect reconciliation.
- Shared listening tests for host create, QR/link/proximity invite, guest join, remote gate, queue contribution, permission changes, host leaving, and abuse/report path.
- Podcast/audiobook tests for follow/save, episode progress, speed, download, chapter/progress restore, sample, unlock, included hours, top-up, expired hours, and refund/support blocker.
- Family/minors tests for manager invite/remove, member address verification, explicit filter, managed account creation, PIN failure, shared playlist review, and privacy export/deletion.
- Privacy tests for Private Session, listening activity controls, tailored-ad choices, data export, account deletion, reactivation window, and analytics redaction.
- Ads tests for ad-supported playback, no-fill, skipped/completed ad, privacy opt-out, frequency cap, underage block, campaign state, and measurement delay.
- Creator tests for claim pending/approved/rejected, profile edit, stat visibility, content report, impersonation report, and team permission boundaries.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, lyrics/captions alternatives, queue reordering, media controls, and QR alternatives.
- Manual verification tests: native iOS/Android screenshots, subscription purchase/restore/cancel, free-tier limits, ads delivery, personalized recommendations, downloads, Connect, Jam/SharePlay, Family/Kids, creator dashboards, push payloads, export/delete, and region catalog behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Spotify assets, network traffic, private APIs, recommendation systems, catalog data, ad infrastructure, or brand copy.
- New and returning users can discover, search, play, save, queue, organize, share, and recover audio content using original licensed or synthetic data.
- Music, podcast, audiobook, playlist, queue, download, device, shared-listening, subscription, family, creator, ad, privacy, and support workflows have deterministic data models and API contracts.
- Free, Premium-like, household, student, audiobook, add-on, top-up, expired, canceled, refunded, and unavailable entitlement states are covered by tests.
- Offline playback, downloads, device handoff, shared listening, ads, recommendations, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Licensed-media, explicit-content, minors/family, creator impersonation, ads/privacy, and developer/API constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which licensed catalog provider, podcast provider, audiobook provider, lyrics provider, and ad provider will back the original clone?
- Which features are V1 versus later: downloads, Connect-like handoff, shared listening, audiobooks, creator tools, ads manager, family/managed accounts, events, or live video/music videos?
- Will V1 support a free ad-funded tier, or start with synthetic/demo catalog plus paid internal test entitlements?
- Which payment platforms own subscriptions and restores: app stores, web checkout, both, or a provider-managed subscription service?
- What privacy posture should personalization use by default, and how should Private Session/listening activity affect recommendations and analytics?
- Which regions, languages, explicit-content rules, and minor-account rules are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, Search, catalog detail, library, Now Playing, queue, synthetic catalog seed data, and privacy-safe analytics.
- Phase 2: add playlist CRUD/collaboration, save/follow actions, podcast progress, library filters, content reports, explicit filter, and support/settings.
- Phase 3: add licensed playback provider abstraction, playback state machine, lyrics provider abstraction, queue reconciliation, and device/session model.
- Phase 4: add downloads/offline mode, storage management, entitlement-aware rights refresh, corrupt-cache recovery, and offline regression tests.
- Phase 5: add subscriptions, checkout/restore/webhooks, Premium gates, audiobook access/hour accounting, add-ons/top-ups, and billing regression tests.
- Phase 6: add Family/Kids controls, managed accounts, explicit filters, parent PIN, child privacy tests, and accessibility pass.
- Phase 7: add shared listening, Connect-like device handoff, push notifications, ads/ad-supported playback, creator-tool entry points, and manual native verification.
- Phase 8: complete legal/provider launch review for licensed catalog, ads, recommendations, minors, creator tools, data deletion/export, regional availability, and developer API constraints.

## Next Steps

- Continue the architecture-teaching upgrades with `089-notion.md`.
- Resolve Spotify manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
