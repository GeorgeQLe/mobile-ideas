# SoundCloud-Style Clone Spec

> Metadata
> - Inspiration app: SoundCloud
> - Category: Music discovery, creator uploads, social audio, comments, playlists, subscriptions, monetization, and advertising-supported listening
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, SoundCloud Help Center articles, SoundCloud creator/product pages, SoundCloud privacy/legal pages, and public subscription/monetization documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, free/ad-supported playback limits, SoundCloud Go/Go+ purchase/restore/cancel, creator upload flow, upload processing, timed comments, reposts, messages, Insights, monetization, fan-powered royalty reporting, downloads/offline, push payloads, data export/deletion, and regional catalog availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, tracks, comments, creator identities, recommendation models, ad technology, monetization infrastructure, payment integrations, and licensing relationships.

## Overview

Build an original social-audio and creator platform inspired by SoundCloud's public workflow: account entry, Home/discovery, search, stream/feed, track detail, waveform-style timed comments, likes, reposts, playlists, creator uploads, profile pages, insights, subscriptions, ad-supported listening, downloads/offline, messaging or fan contact, support, privacy controls, and account deletion.

The clone must not copy SoundCloud branding, screenshots, marketing copy, waveform artwork, private APIs, recommendation systems, track catalog, creator profiles, comments, fan-powered royalty logic, playlist names, or ad targeting logic. Functional parity should use original product language, synthetic or licensed user-generated audio metadata, provider-approved hosting/playback, and independently designed community/recommendation rules.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first social-audio app with onboarding, Home/Stream, search, track detail, player, waveform comments, likes, reposts, playlists, creator profiles, uploads, insights, subscriptions, support, privacy, and account controls.
- Support creator-first workflows: upload requirements, public/private tracks, release metadata, profile management, audience analytics, fan engagement, copyright/takedown handling, monetization eligibility, and payout blockers.
- Preserve media/community trust expectations around copyright, creator impersonation, explicit content, harassment/spam, ads, monetization, account privacy, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a SoundCloud-branded app or imply affiliation with SoundCloud, creators, labels, distributors, ad partners, payment providers, or fan-powered royalty partners.
- Do not stream production tracks, comments, profile data, waveforms, repost graphs, messages, or monetization data without licensed content and provider approval.
- Do not scrape SoundCloud, reuse private SoundCloud APIs, replay network traffic, copy recommendation/ranking models, copy creator metadata, or bypass rights-holder restrictions.
- Do not treat upload limits, Go/Go+ entitlements, DJ integrations, creator monetization, Insights, fan-powered royalties, messages, or timed comments as generic features; each requires explicit product/legal design.
- Do not claim exact App Store, Play Store, native-device, catalog, personalization, ad, subscription, creator-tool, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/soundcloud-the-music-you-love/id336353151 | Official iOS listing, developer, Music category, 13+ age rating, Apple Watch support, privacy links, large music-discovery positioning, independent artists, uploads, fan-powered streams, free/Go/Go+ feature framing, offline saves, DJ integration references, and support links | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.soundcloud.android | Official Android listing, package id, developer, ads/in-app purchase disclosure, download/support surface, data-safety context, and Android availability | Verified 2026-04-19 |
| SoundCloud Go | https://soundcloud.com/go | Public subscription positioning for ad-free listening, offline saves, Go/Go+ gates, and premium access framing | Verified 2026-04-19 |
| Creators On SoundCloud | https://creators.soundcloud.com/ | Creator product positioning, fanbase, audience/insights, monetization/distribution entry points, and creator workflow framing | Verified 2026-04-19 |
| Uploading Requirements | https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements | Confirmed email requirement, free/Artist/Artist Pro upload limits, supported file formats, file-size and duration limits, transcoding, and upload quality guidance | Verified 2026-04-19 |
| Copyright Help | https://help.soundcloud.com/hc/en-us/categories/115001842487-Copyright | Copyright, takedown, infringement, dispute, and rights-owner support category for upload/legal blockers | Verified 2026-04-19 |
| Creator Monetization | https://help.soundcloud.com/hc/en-us/categories/360003648473-Monetization-on-SoundCloud | Monetization, eligibility, revenue, payout, and creator account support category for monetized-audio blockers | Verified 2026-04-19 |
| Community Guidelines | https://soundcloud.com/community-guidelines | Platform safety, prohibited behavior, content policy, and moderation scope for community audio and comments | Verified 2026-04-19 |
| Privacy Policy | https://soundcloud.com/pages/privacy | Personal data, account/profile/uploads/comments/subscriptions/monetization data, usage/log/device data, privacy controls, contact path, and data-rights modeling | Verified 2026-04-19 |
| Terms Of Use | https://soundcloud.com/terms-of-use | Account, content, upload, copyright, service restrictions, subscription, and platform terms relevant to clone legal scope | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and SoundCloud pages position the app as a global music discovery and creator platform with free ad-supported listening, Go/Go+ subscription gates, uploads, creator profiles, fan engagement, comments, playlists, reposts, and creator monetization paths.
- V1 must model signed-out, free/ad-supported, Go-like, Go+-like, Artist-like, Artist Pro-like, monetization-pending, monetized, expired, canceled, refunded, platform-owned, upload-limit-reached, copyright-blocked, region-blocked, and catalog-rights-blocked states.
- Home/Stream must support followed-creator posts, personalized discovery, recently played, trending/genre rows, reposts, fresh-account fallback, personalization-disabled fallback, hidden content, and stale/offline states.
- Search must support tracks, artists/creators, albums/sets, playlists, profiles, tags, genres, and empty/no-result states with explicit/blocked/report filtering.
- Track detail must support waveform visualization from original generated waveform data, play, like, repost, add-to-playlist, share, follow creator, download if allowed, timed comments, report, unavailable content, and rights/copyright states.
- Timed comments must support position anchoring, edit/delete, moderation, report, spam detection, creator pin/highlight if added, blocked users, deleted track behavior, and waveform position drift handling.
- Creator profiles must support bio, links, tracks, albums/sets, playlists, reposts, likes if public, follower/following counts, verification-like status only if original, reports, and profile privacy/moderation.
- Uploads must support confirmed email, file validation, size/duration limits, lossy/lossless format handling, transcoding/processing, public/private visibility, metadata, artwork, tags, rights attestation, replace/delete, and takedown/dispute states.
- Insights must support creator-facing plays, likes, reposts, comments, downloads, followers, audience geography buckets, traffic sources, time ranges, delayed/stale data, and privacy-preserving aggregation.
- Monetization must support eligibility, identity/tax/payment setup, payout state, royalty/revenue reporting, fraud review, copyright conflicts, and creator support blockers before launch.
- Playlists and albums/sets must support create, rename, delete, reorder, add/remove tracks, public/private, duplicate warnings, cover/artwork metadata, share links, and moderation/report paths.
- Playback must support play, pause, skip, scrub, queue, continuous play, ad breaks for free users, Go/Go+ gated tracks, offline saves where licensed, unavailable-content recovery, and buffering/rights errors.
- Support/privacy/settings must expose account, profile, notifications, subscriptions, creator tools, upload limits, privacy controls, data export, account deletion, legal links, copyright help, monetization support, and support paths.

### Manual Verification Required

- Native iOS and Android navigation, Stream ordering, waveform behavior, timed comment placement, profile editing, upload entry points, playlist limits, and release-note behavior.
- Account signup/login, Go/Go+ purchase/restore/cancel, ad delivery, offline saves, creator upload, copyright/takedown flow, Insights, monetization, direct messages/contact, push payloads, data export/delete, and regional catalog differences.

## Core User Journeys

- New listener installs the app, creates an account, follows a few creators/genres, reviews legal consent, chooses notification/personalization preferences, and lands on Home/Stream.
- Returning free listener opens Stream, plays a track, sees ad-supported interruption where eligible, likes the track, reposts it, and follows the creator.
- Listener opens a track detail page, scrubs the waveform, reads timed comments, adds a timed comment, reports spam, and sees the comment survive playback/reload.
- Listener creates a playlist, adds multiple tracks, handles duplicate warnings, reorders items, toggles privacy, shares a link, and removes a track that was later deleted.
- Creator confirms email, uploads a lossless file, enters metadata/artwork/tags, sets public/private visibility, waits through processing, handles a failed transcode, and publishes.
- Creator reviews Insights, filters by time range, checks plays/likes/comments/reposts, sees delayed data warnings, and exports or summarizes metrics without exposing personal fan data.
- Monetizing creator completes eligibility, identity/tax/payment setup, submits tracks for monetization, handles copyright conflict, views payout pending/paid/held states, and opens support.
- Subscriber starts Go+-gated playback, saves tracks offline, loses connectivity, plays valid offline tracks, then reconnects to refresh rights and progress.
- Privacy-focused user changes visibility, removes comments, downloads personal data, deletes the account, and sees warnings for uploaded tracks, monetization, playlists, and support cases.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, age/region/legal consent | email/social auth, DOB, country | new, returning, free, subscribed | unconfirmed email, blocked region, failed auth |
| Home/Stream | Following feed and discovery | play, like, repost, follow, hide | loading, personalized, fresh account | stale feed, blocked creator, ad outage |
| Search/Explore | Track, creator, playlist, tag discovery | query, filters, genre/tag taps | suggestions, results, no-results | explicit hidden, copyright blocked, typo |
| Track Detail/Waveform | Playback, metadata, timed comments | play, scrub, comment, like, repost | available, commented, liked | deleted track, waveform drift, rights removed |
| Now Playing | Playback controls and queue context | play, pause, skip, scrub, queue | playing, paused, buffering | stream fail, ad break, Go+ gate, license error |
| Queue | Ordered continuous playback | add, remove, reorder, clear | empty, editable, autoplay | duplicate, removed track, entitlement lock |
| Creator Profile | Public creator identity and catalog | follow, message/contact, report | public, verified-like, owner | suspended, impersonation, private/deleted |
| Upload Manager | Creator audio upload and processing | file, metadata, artwork, rights | draft, processing, published | email unconfirmed, upload limit, transcode fail |
| Timed Comments | Position-based discussion | comment text, timestamp, report | visible, hidden, deleted | spam, harassment, blocked user, track deleted |
| Playlists/Sets | Collection creation and management | title, privacy, add/remove, reorder | draft, public, private | duplicate, cover reject, item deleted |
| Insights | Creator analytics | time range, metric filter | loading, current, delayed | not eligible, stale data, export fail |
| Monetization/Payouts | Creator eligibility and revenue state | identity, tax, payout, submit | pending, active, paid, held | copyright conflict, fraud hold, payout failure |
| Downloads/Offline | Offline saves for eligible tracks | save, quality, delete | downloading, downloaded, offline | storage full, rights expired, sign-out invalidation |
| Subscription/Ads | Go/Go+ gates and ad state | subscribe, restore, cancel, ad events | free, trial, paid, canceled | no-fill, platform mismatch, webhook delay |
| Settings/Privacy/Support | Account, profile, privacy, legal, help | toggles, export, delete, contact | loaded, pending export, deleting | upload/monetization deletion blocker |

## Data Model

- `User`: account identity, age band, country/region, auth providers, email-confirmation state, creator status, consent, privacy choices, export/deletion state, and restrictions.
- `CreatorProfile`: public profile, handle, bio, links, artwork, verification-like status, follower counts, owner roles, monetization eligibility, report state, and suspension state.
- `Subscription`: free, Go-like, Go+-like, Artist-like, Artist Pro-like, platform owner, renewal/cancel/refund state, upload limits, offline gate, premium-track gate, and feature gates.
- `Track`: uploaded or licensed track metadata, creator id, waveform id, duration, format, processing state, rights, explicit flag, availability, download permission, monetization status, and unavailable reason.
- `WaveformAsset`: track id, generated peaks, duration mapping, version, processing state, drift correction, cache policy, and accessibility transcript/description where available.
- `TimedComment`: track id, timestamp, author, body, moderation state, spam score, deleted/hidden state, report metadata, and edit history.
- `Repost`: user/creator id, track/playlist reference, comment/caption if allowed, visibility, timestamp, and moderation state.
- `PlaylistSet`: owner, title, description, privacy, item order, artwork, duplicate metadata, report state, and version.
- `UploadJob`: file reference, MIME/codec, bytes, duration, rights attestation, validation errors, transcode states, retries, and publish target.
- `InsightMetric`: creator id, track id, metric type, time range, geography bucket, source bucket, freshness, aggregation threshold, and privacy-safe notes.
- `MonetizationAccount`: creator id, eligibility, identity/tax/payment state, payout destination, revenue share state, fraud/copyright holds, and support cases.
- `PlaybackSession`: current item, context, queue, position, device, ad break state, entitlement, quality, repeat/shuffle, and reconciliation cursor.
- `AdBreak`: placement, creative id, privacy choice, frequency cap, impression/click/skip state, no-fill state, and playback resume cursor.
- `PrivacyRequest`: export, deletion, correction, portability, profile removal, upload removal, status, delivery method, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, entitlement, upload, copyright, monetization, payout, playback, comment, playlist, privacy, support, and moderation-sensitive changes.
- `LocalCacheRecord`: cached stream/search/detail/profile/settings, offline saves, upload drafts, queue state, offline plays, sync attempts, stale timestamps, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `POST /auth/confirm-email`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with email confirmation, age, region, and device state.
- `GET /stream`, `GET /explore`, `GET /recommendations`: feed/discovery surfaces with cache hints, entitlement context, creator-follow graph, and fallback slots.
- `GET /search?q=&type=&cursor=&explicit=&region=`: multi-type search across tracks, creators, playlists, albums/sets, tags, and genres with rights filtering.
- `GET /tracks/:id`, `GET /profiles/:handle`: canonical detail endpoints returning availability, rights, actions, deep links, report state, and stale-data indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, ad state, queue context, position, and error codes.
- `POST /queue/items`, `PATCH /queue/items/:id`, `DELETE /queue/items/:id`, `POST /queue/reorder`: queue editing with entitlement, removed-track, and ad-break constraints.
- `POST /comments`, `PATCH /comments/:id`, `DELETE /comments/:id`, `POST /comments/:id/report`: timed comment lifecycle with timestamp, moderation, spam, and report state.
- `POST /likes`, `DELETE /likes/:id`, `POST /reposts`, `DELETE /reposts/:id`, `POST /follows`, `DELETE /follows/:id`: social audio actions with idempotency and moderation checks.
- `POST /uploads`, `PATCH /uploads/:id`, `POST /uploads/:id/publish`, `DELETE /uploads/:id`, `GET /uploads/:id/status`: upload validation, metadata, processing, publish, delete, and rights state.
- `POST /playlists`, `PATCH /playlists/:id`, `POST /playlists/:id/items`, `DELETE /playlists/:id/items/:itemId`: playlist/set lifecycle, privacy, duplicate warnings, and moderation metadata.
- `GET /insights`, `GET /insights/tracks/:id`: creator metrics with aggregation thresholds, delayed-state indicators, and export-safe summaries.
- `GET /monetization`, `POST /monetization/apply`, `PATCH /monetization/payout`, `GET /payouts`: eligibility, identity/tax/payment state, revenue, fraud holds, and support handoff.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: offline saves, storage checks, rights refresh, and corrupt-cache recovery.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/click`, `POST /ads/error`: ad selection, client-safe measurement, no-fill, skipped, completed, and privacy-choice states.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: plan lifecycle, platform ownership, restores, refunds, and delayed state.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, account deletion, upload/monetization warnings, and retention state.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: track, profile, comment, copyright, monetization, billing, and support workflows.

## Realtime, Push, And Offline Behavior

- Playback state, queue changes, timed comments, likes/reposts, upload processing, takedown/dispute changes, insights refresh, monetization/payout state, downloads, subscription changes, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Stream, Explore, search suggestions, track detail, creator profiles, comments, playlists, settings, entitlement summary, upload status, insights summaries, and support status with stale labels.
- Offline mode may play valid offline-saved tracks, preserve a queue composed of offline-eligible items, track local progress, and queue low-risk likes/playlist changes for sync.
- Offline mode must block new uploads, comment posting if moderation cannot run, monetization edits, payout changes, copyright disputes, subscription purchase/cancel, account deletion, support evidence upload, and irreversible track deletion.
- Upload processing must tolerate app backgrounding, network loss, duplicate retries, signed-upload expiry, transcode delay, rights review, malware checks, and malformed metadata.
- Timed comments must reconcile with server timestamps, track duration changes, waveform regeneration, hidden/deleted comments, blocked users, and duplicate offline retries.
- Push notifications must be opt-in and category-controlled for creator activity, comments, reposts, follows, upload processing, takedowns, monetization/payouts, subscription/billing, support cases, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact listening history, private track names, payout amounts, tax/payment details, and support evidence.

## Permissions, Privacy, And Safety

- Notifications, microphone/recording if added, local files/uploads, photos/artwork, camera/QR, contacts, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact listening history, private track titles, comment bodies, payout/tax details, payment details, device names, IP-level location, and support evidence.
- User uploads, licensed tracks, waveform data, artwork, comments, messages, creator profiles, and monetization data are launch blockers with legal/catalog/provider owners.
- Copyright, trademark, rightsholder takedown, royalty reporting, stream fraud, upload abuse, creator impersonation, harassment/spam, and payout fraud require launch-blocking review.
- Explicit content must support creator labeling, reporting incorrect labels, age/region handling, account-level filters, and moderation escalation.
- Ads must honor privacy choices, age restrictions, sensitive categories, frequency caps, regional ad rules, and measurement minimization.
- Creator analytics and monetization must avoid exposing personal fan data, enforce aggregation thresholds, require role-based access, and record payout/identity audit events.
- Account deletion/export must warn about uploaded tracks, comments, playlists, reposts, monetization accounts, payout/tax retention, copyright disputes, support cases, and legal/rights retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, accessible waveform/comment navigation, media controls, and alternatives for visual waveform context.
- Launch owners: catalog/legal owner for uploaded/licensed media; privacy owner for data rights and ads choices; trust/safety owner for comments, harassment, copyright, and impersonation; billing owner for entitlements; monetization owner for payouts; accessibility owner for waveform/player UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, stream item viewed, track opened, playback started/completed/failed, queue edited, like/repost/follow/comment submitted, playlist created, upload started/processed/published/failed, insight viewed, monetization applied, payout updated, ad impression/completion, entitlement changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, creator role, region bucket, error code, latency bucket, and provider status rather than raw titles, search text, comment text, private upload names, exact listening history, or payout details.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, skip, save, hide, and report actions without exposing private user content.
- Playback analytics must support royalty/provider accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Ad analytics must capture impression, completion, skip, click, no-fill, creative error, frequency cap, placement, and privacy-choice state without exposing sensitive listener identity.
- Creator analytics must aggregate plays, likes, reposts, comments, followers, audience regions, and traffic sources with role-based access, aggregation thresholds, and anti-fraud protections.
- Monetization may include original free/ad-supported access, listener subscriptions, creator subscription tiers, upload limits, promotion tools, advertiser campaigns, distribution/monetization products, and original payout systems after legal review.
- Any paid plan, creator tool, monetization product, payout feature, or ad product must disclose price, renewal/cancellation, refund/support path, platform ownership, tax/payment implications, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, underage account, unconfirmed email, expired session, account locked, passwordless login failure, or social auth revoked.
- Search result exists but is not playable because of region, explicit filter, removed rights, takedown, expired license, unavailable plan, hidden item, or malformed upload metadata.
- Track starts then rightsholder takedown arrives, waveform regenerates while comments are visible, queue is edited on two devices, or stream fails during an ad break.
- Comment is posted at a timestamp beyond track duration, track is replaced, comment author is blocked, spam score changes after display, or moderation hides a comment mid-session.
- Upload exceeds time/storage/file-size limits, email is unconfirmed, transcode clips, rights attestation fails, copyright claim appears after publish, or creator deletes while offline.
- Monetization application lacks identity/tax data, payout destination fails, revenue is held for fraud/copyright review, metrics are delayed, or creator support case is unresolved.
- Download/offline save exceeds storage, rights expire, app cache is cleared, ad-required free content cannot play offline, or user signs out while offline.
- Ad service returns no fill, creative fails mid-playback, listener opted out of personalized ads, campaign target is age-sensitive, or measurement is delayed.
- Privacy export email fails, account deletion requested with uploads/monetization/payout/takedown disputes, or legal retention prevents full deletion.

## Test Plan

- Unit tests for entitlement gating, playback state machine, queue edits, upload validation, waveform/comment positioning, copyright states, monetization eligibility, ad state, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, cursor reconciliation, idempotency keys, error codes, rights states, upload states, ad states, monetization states, and webhook duplicates.
- Integration tests for auth, Stream, Explore, search, track detail, playback start/stop, like/repost/follow/comment, playlist create/edit, upload publish/delete, queue edit, creator profile, insights, and settings.
- Playback tests for buffering, ad break, Go/Go+ gate, waveform progress, skip/repeat/shuffle, removed rights, takedown mid-playback, and local cache stale state.
- Offline tests for valid offline saves, missing downloads, corrupt cache, disk full, expired rights, sign-out invalidation, queued low-risk writes, and reconnect reconciliation.
- Upload/creator tests for email confirmation, file validation, transcode processing, rights attestation, public/private publish, delete, takedown, dispute, insight delay, and monetization/payout blockers.
- Comment/moderation tests for timestamp anchoring, edit/delete, report, spam hide, blocked user, deleted track, harassment escalation, and appeal/support path.
- Privacy tests for profile visibility, data export, account deletion, deletion blockers, support evidence redaction, payout/tax retention, and analytics minimization.
- Ads tests for ad-supported playback, no-fill, skipped/completed ad, privacy opt-out, frequency cap, underage block, campaign state, and measurement delay.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, waveform navigation, comments, media controls, and upload form alternatives.
- Manual verification tests: native iOS/Android screenshots, Go/Go+ purchase/restore/cancel, ad delivery, offline saves, creator uploads, timed comments, reposts, messages/contact, Insights, monetization, push payloads, export/delete, and regional catalog behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing SoundCloud assets, network traffic, private APIs, recommendation systems, catalog/upload data, ad infrastructure, royalty logic, or brand copy.
- New and returning users can discover, search, play, like, repost, comment, queue, upload, organize, share, and recover audio content using original licensed, synthetic, or user-owned data.
- Track, upload, waveform, timed-comment, playlist, creator-profile, insight, monetization, queue, download, subscription, ad, privacy, and support workflows have deterministic data models and API contracts.
- Free/ad-supported, Go-like, Go+-like, creator, monetization-pending, monetized, expired, canceled, refunded, copyright-blocked, and unavailable entitlement states are covered by tests.
- Offline playback, downloads, uploads, comments, monetization, ads, recommendations, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Licensed/user-generated media, copyright, explicit-content, harassment/spam, creator impersonation, monetization/payout, ads/privacy, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which licensed music catalog provider, creator-hosting provider, waveform generator, ad provider, copyright/takedown tooling, monetization provider, and payout provider will back the original clone?
- Which features are V1 versus later: uploads, timed comments, reposts, direct messages, offline saves, Insights, monetization, payouts, DJ integrations, or ads?
- Will V1 support user-generated uploads, synthetic demo tracks, licensed catalog, or a creator-only private beta first?
- Which payment platforms own subscriptions and restores: app stores, web checkout, both, or a provider-managed subscription service?
- What privacy posture should social audio activity use by default, and how should private tracks, comments, and creator analytics affect recommendations and analytics?
- Which regions, languages, explicit-content rules, upload rights, monetization markets, and payout/tax requirements are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home/Stream, Search, track detail, creator profile, player, queue, synthetic catalog seed data, and privacy-safe analytics.
- Phase 2: add likes, reposts, follows, playlists/sets, timed comments, comment moderation/reporting, explicit controls, support/settings, and account privacy controls.
- Phase 3: add upload pipeline, file validation, signed uploads, transcode processing, waveform generation, rights attestation, public/private publishing, and upload regression tests.
- Phase 4: add licensed playback provider abstraction, ad-supported playback, Go/Go+ gates, queue reconciliation, provider error handling, and ad/privacy tests.
- Phase 5: add downloads/offline saves, storage management, entitlement-aware rights refresh, corrupt-cache recovery, and offline regression tests.
- Phase 6: add creator Insights, monetization eligibility, identity/tax/payment states, payout holds, fraud/copyright review, and creator-support workflows.
- Phase 7: add subscriptions, checkout/restore/webhooks, push notifications, direct contact/messaging if approved, accessibility pass, and manual native verification.
- Phase 8: complete legal/provider launch review for licensed/user-generated catalog, copyright, ads, monetization, payouts, data deletion/export, regional availability, and platform APIs.

## Next Steps

- Resolve SoundCloud manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 audio implementation-readiness upgrades with `070-audible.md`.
