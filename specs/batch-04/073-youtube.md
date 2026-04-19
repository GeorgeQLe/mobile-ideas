# YouTube-Style Clone Spec

> Metadata
> - Inspiration app: YouTube
> - Category: user-generated video, Shorts, subscriptions, channels, comments, live streams, creator tools, ads, Premium, community, and supervised experiences
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, YouTube Help articles, YouTube Premium/product pages, Google privacy pages, YouTube terms, community-policy pages, upload/Shorts/analytics/monetization documentation, and public supervised-experience guidance.
> - Manual verification blockers: native iOS/Android screen capture, Google Account signup/login, recommendations, Shorts feed, upload flow, mobile live streaming, comments, channel/community posts, subscriptions, notifications, YouTube Premium purchase/restore/cancel, downloads/offline, background play, SharePlay, channel memberships, Super Chat/Super Stickers/Super Thanks, Shopping, monetization eligibility, ads delivery, creator analytics, data export/deletion, supervised-account behavior, copyright checks, and regional availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, videos, Shorts, comments, creator/channel metadata, recommendation models, ad technology, monetization products, payment integrations, content moderation systems, and licensing relationships.

## Overview

Build an original mobile video platform inspired by YouTube's public workflow: account entry, Home recommendations, Shorts-style vertical viewing, subscriptions, Explore/trending, search, video watch page, comments, playlists, Library, uploads, live streaming, channel pages, community posts, creator analytics, Premium gates, fan funding, ads, supervised experiences, safety reporting, support, privacy controls, and account deletion.

The clone must not copy YouTube or Google branding, screenshots, marketing copy, protected UI artwork, private APIs, ranking systems, videos, Shorts, comments, thumbnails, captions, Content ID systems, creator metadata, ad targeting logic, or monetization policy implementation. Functional parity should use original product language, synthetic or licensed media, provider-approved playback/upload/storage, independent ranking, and separately reviewed moderation and monetization systems.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first video app with onboarding, Home, Shorts-style discovery, Subscriptions, Explore, Search, Watch, comments, playlists, Library, channel pages, uploads, live streaming, notifications, settings, support, privacy, and account controls.
- Support creator and viewer workflows: create/upload, set metadata/visibility, disclose paid promotion/altered content, choose comments/ratings, manage playlists, inspect analytics, monetize where eligible, and report abuse.
- Preserve platform trust expectations around copyright, minors, made-for-kids, age restriction, hate/harassment, misinformation-sensitive categories, ads, recommendations, paid fan funding, account privacy, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a YouTube- or Google-branded app or imply affiliation with Google LLC, YouTube, creators, artists, advertisers, rights holders, or device partners.
- Do not host or stream production videos, Shorts, livestreams, captions, comments, thumbnails, music, creator channels, or user uploads without licensed content, user rights, and provider approval.
- Do not scrape YouTube, reuse private YouTube APIs, replay network traffic, copy recommendation or ranking models, copy community-policy enforcement systems, or bypass copyright, age, ad, Premium, or supervised-account restrictions.
- Do not treat uploads, live streaming, monetization, Shorts, comments, fan funding, paid memberships, Content ID-like checks, ads, downloads, or supervised experiences as generic features; each requires product/legal/safety review and hands-on verification.
- Do not claim exact App Store, Play Store, native-device, recommendation, ad, upload, livestream, monetization, notification, support, deletion/export, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/youtube/id544007664 | Official iOS listing, developer, Photo & Video category, 13+ age rating, in-app purchases, Home/Subscriptions/Library, Explore, community, upload, live streaming, family options, memberships, Premium, SharePlay, privacy labels, and platform support | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.youtube | Official Android listing, package id, ads/in-app purchases, 10B+ downloads, Home/Subscriptions/Library, Explore, comments/posts/live, upload/live, family options, memberships, Premium, data safety, support email, and release context | Verified 2026-04-19 |
| YouTube Premium | https://www.youtube.com/premium | Premium positioning, ad-free/background/offline benefits, YouTube Music Premium inclusion, and paid-service orientation | Verified 2026-04-19 |
| Upload Videos | https://support.google.com/youtube/answer/57407?hl=en | Upload flow, mobile upload availability, supervised-experience restriction, metadata, thumbnails, playlists, audience/COPPA, age restriction, paid promotion, altered content disclosure, comments/ratings, visibility, captions, end screens, cards, checks, monetization, and copyright review | Verified 2026-04-19 |
| YouTube Shorts | https://support.google.com/youtube/answer/10059070?hl=en | Shorts creation/discovery entry points, vertical short-form constraints, related video links, and Shorts-specific creator behavior | Verified 2026-04-19 |
| Creator Analytics Reach | https://support.google.com/youtube/answer/9314355?hl=en | YouTube/Studio analytics, Reach reports, traffic sources, Browse, channel pages, Shorts, notifications, playlists, suggested videos, ads, search, external sources, impressions, watch time, and unique viewers | Verified 2026-04-19 |
| Monetization | https://support.google.com/youtube/answer/94522?hl=en | YouTube Partner Program thresholds, Watch Page Ads, Shorts Feed Ads, Commerce Product Module, channel memberships, Super Chat/Stickers, Super Thanks, Shopping, Premium revenue, ad suitability, and rights confirmation | Verified 2026-04-19 |
| Supervised Accounts | https://support.google.com/youtube/answer/10314074?hl=en | Parent-managed supervised experiences, account setup, content settings, restricted features, and family safety framing | Verified 2026-04-19 |
| Community Guidelines | https://www.youtube.com/howyoutubeworks/our-policies/ | Safety-policy orientation, community standards, enforcement categories, and public platform governance context | Verified 2026-04-19 |
| YouTube Terms | https://www.youtube.com/t/terms | Service terms, account, content, permissions, restrictions, removals, copyright, and service availability constraints | Verified 2026-04-19 |
| Google Privacy Policy | https://policies.google.com/privacy | Account, activity, personalization, device, ads, deletion/export, privacy controls, and data-rights modeling | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and help pages position YouTube as a video app for Home recommendations, Subscriptions, Library, Explore, comments, community posts, Premieres, live streams, uploads, mobile live streaming, family/supervised options, channel memberships, Premium, and creator monetization.
- V1 must model signed-out, signed-in, creator, viewer, supervised, age-restricted, made-for-kids, upload-disabled, live-disabled, Premium-like, free/ad-supported, monetization-ineligible, YPP-eligible, channel-member, blocked-region, and account-struck states.
- Home must support personalized video rows, Shorts entry, topic chips, subscriptions prompts, watched/liked/saved history, hidden recommendations, signed-out fallback, stale/offline labels, and ads/promo slots where allowed.
- Shorts-style discovery must support vertical feed, swipe navigation, like/dislike/save/share, comments, subscribe, related video link, remix restrictions, age/made-for-kids restrictions, and fallback when clips are unavailable.
- Subscriptions/Explore must support channel activity, posts, Premieres, live streams, trending/topics, music/gaming/news/learning categories, regional availability, notification states, and fresh/empty channel states.
- Watch page must support playback, captions, quality, mini-player/background gate, title/description, channel subscribe/join, like/dislike, save/share, comments, live chat where relevant, chapters, cards/end screens, reporting, and unavailable-content reasons.
- Upload must support file selection, processing states, metadata, description, thumbnails, playlist assignment, audience/made-for-kids declaration, age restriction, paid promotion, altered/synthetic content disclosure, comments/ratings setting, visibility, captions, end screens, cards, checks, copyright issues, and monetization settings.
- Channel pages must support public profile, tabs, videos, Shorts, live, playlists, community posts, memberships, Shopping links where approved, analytics summaries for owner, and moderation/report paths.
- Monetization must support eligibility thresholds, ads modules, Shorts revenue, fan funding, memberships, Super Chat/Stickers/Thanks, Shopping, Premium revenue, ad suitability, rights confirmation, and regional program availability.
- Premium/downloads must support ad-free/background/offline gates, platform-owned subscriptions, restore/cancel, download eligibility, device-bound offline state, and unavailable Premium benefits by region/device.
- Support/privacy/settings must expose account, channel, notifications, playback, captions, uploads, privacy, recommendations/history, ads personalization, data export, account deletion, copyright, safety/reporting, legal links, and support/community paths.

### Manual Verification Required

- Native iOS and Android tab names, Home/Shorts/Subscriptions/Library ordering, mini-player, comment composer, upload UI, live controls, notification prompts, Premium paywalls, and release-note behavior.
- Google Account auth, upload processing, copyright checks, Shorts creation/remix, live streaming eligibility, comments/reports, channel memberships, Super Chat/Stickers/Thanks, Shopping, ad delivery, Premium purchase/restore/cancel, downloads, background play, supervised account behavior, push payloads, data export/delete, and regional availability.

## Core User Journeys

- New viewer installs the app, signs in or browses signed out, reviews terms/privacy, configures notification/personalization settings, and lands on Home with original copy.
- Returning viewer opens Home, starts a recommended video, expands description, changes captions/quality, saves to Watch Later, comments, and continues in mini-player.
- Viewer swipes through Shorts-style clips, likes one, opens comments, subscribes to a creator, follows a related-video link, and reports inappropriate content.
- Subscriber opens Subscriptions, sees a new video, joins a channel membership where eligible, turns on notifications, and handles a creator going live.
- Creator uploads a video from mobile, sets title/description/audience/visibility, discloses paid promotion or altered content, waits through processing/checks, handles a copyright issue, and publishes.
- Creator starts a live stream, manages live chat/moderation, receives fan funding where eligible, ends stream, and reviews analytics.
- Premium-like viewer downloads an eligible video, watches offline, tries background play, manages expired downloads, and cancels/restores subscription.
- Parent sets up a supervised experience, selects content settings, blocks restricted features, and verifies upload/comment/age-restricted flows are unavailable.
- Privacy-focused user pauses or clears watch/search history, adjusts ad personalization, exports data, deletes account content, and sees creator/channel consequences.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, signed-out browse, consent | Google-like auth, DOB, terms | signed-out, new, returning | supervised, underage, blocked, auth fail |
| Home | Personalized discovery and resume | row taps, chips, hide, play | loading, personalized, signed-out | stale, history off, ad outage |
| Shorts | Vertical short-form discovery and creation entry | swipe, like, comment, share | playing, paused, saved | restricted, removed, low bandwidth |
| Subscriptions | Channel activity and notification context | channel, video, live, bell | empty, fresh, live | channel removed, notification denied |
| Explore/Trending | Topic and regional discovery | topic, category, trend | loaded, regional, filtered | unsupported region, sensitive topic |
| Search | Multi-type search | query, filters, voice if added | suggestions, results, no-results | typo, restricted result, history off |
| Watch Page | Video playback, metadata, comments, actions | play, caption, like, save, comment | playing, paused, live, premiere | removed, age block, copyright block, ad break |
| Comments/Live Chat | Conversation and moderation | comment, reply, report, moderate | open, held, disabled | made-for-kids, abuse, rate limited |
| Channel | Creator profile, videos, posts, membership | subscribe, join, tab, report | owner, viewer, member | suspended, no content, join unavailable |
| Upload/Studio | Creator upload, metadata, checks, publish | file, metadata, visibility, checks | draft, processing, published | copyright claim, strike, supervised blocked |
| Library/Playlists | History, Watch Later, liked videos, playlists | save, sort, remove, play | empty, saved, downloaded | sync conflict, deleted video |
| Premium/Monetization | Subscription and creator earning states | subscribe, restore, module, payout | free, paid, eligible, ineligible | region block, webhook delay, rights fail |
| Settings/Privacy/Support | Account, history, ads, safety, data rights | toggles, export, delete, contact | loaded, pending export, deleting | legal hold, support unavailable |

## Data Model

- `User`: account identity, age band, country/region, auth providers, supervised status, privacy choices, history controls, notification settings, export/deletion state, and restrictions.
- `Channel`: owner, handle, public metadata, verification, monetization eligibility, community settings, membership configuration, moderation roles, and suspension state.
- `Video`: title, description, creator, upload state, visibility, audience/made-for-kids, age restriction, paid-promotion disclosure, altered-content disclosure, rights/copyright state, captions, chapters, cards, monetization, and analytics.
- `Short`: video reference, vertical asset, sound/remix permissions, related-video link, engagement state, availability, and safety restrictions.
- `LiveStream`: channel, schedule, stream key/provider state, live chat, moderation, monetization, DVR/replay state, and outage markers.
- `Comment`: video/channel/post reference, author, body, parent, held/reviewed state, report state, moderation action, and deletion/export metadata.
- `Playlist`: owner, visibility, title, description, ordered videos, collaboration if added, Watch Later/liked/history flags, and unavailable-item handling.
- `Subscription`: viewer, channel, notification level, membership tier, renewal/cancel/refund state, platform owner, and member perks.
- `MonetizationAccount`: channel, YPP threshold progress, accepted modules, ad suitability, fan funding, Shopping, payout, tax, policy review, and regional eligibility.
- `PlaybackSession`: current video, position, quality, captions, ad break, Premium/background gate, live latency, device, and reconciliation cursor.
- `UploadAsset`: source file, transcoding states, thumbnails, captions, checks, copyright claims, processing errors, storage bytes, and publication state.
- `RecommendationSlot`: surface, seed signals, history flag, item list, explanation key, freshness, privacy-safe audit metadata, and fallback reason.
- `AdBreak`: placement, creative id, privacy choice, frequency cap, impression/click/skip state, no-fill state, and playback resume cursor.
- `Report`: content/user/category, reporter, evidence metadata, safety queue, action state, appeal/support status, and audit references.
- `PrivacyRequest`: export, deletion, history purge, ads personalization, status, delivery method, identity verification, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, upload, publish, monetization, playback, comment, report, privacy, billing, and moderation-sensitive transitions.
- `LocalCacheRecord`: cached home/search/watch/channel/library/settings, uploads, downloads, offline plays, stale timestamps, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with supervised, age, region, locked-account, and device state.
- `GET /home`, `GET /shorts`, `GET /subscriptions`, `GET /explore`, `GET /recommendations`: discovery surfaces with cache hints, entitlement context, history flag, safety state, and fallback slots.
- `GET /search?q=&type=&cursor=&safe=&region=`: multi-type video/channel/playlist/post search with safety, rights, age, and supervised filters.
- `GET /videos/:id`, `GET /channels/:id`, `GET /playlists/:id`: canonical detail endpoints returning availability, actions, monetization gates, safety state, and stale indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, captions, quality, live latency, ads, Premium/background gates, and error codes.
- `GET /comments`, `POST /comments`, `PATCH /comments/:id`, `DELETE /comments/:id`: comments/replies with disabled, held, rate-limited, made-for-kids, and moderation states.
- `POST /subscriptions`, `PATCH /subscriptions/:id`, `DELETE /subscriptions/:id`: channel subscription, notification level, membership tier, and cancellation/renewal state.
- `POST /uploads`, `PATCH /uploads/:id`, `POST /uploads/:id/publish`, `GET /uploads/:id/checks`: upload, metadata, visibility, disclosures, checks, copyright, and publish lifecycle.
- `POST /live-streams`, `PATCH /live-streams/:id`, `DELETE /live-streams/:id`: mobile live setup, stream status, chat state, replay, and moderation hooks.
- `POST /playlists`, `PATCH /playlists/:id`, `POST /playlists/:id/items`, `DELETE /playlists/:id/items/:itemId`: playlist lifecycle with unavailable-item and privacy handling.
- `GET /creator/analytics`, `GET /creator/monetization`, `PATCH /creator/monetization`: reach metrics, traffic sources, eligibility thresholds, accepted modules, payout/tax, and policy state.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/click`, `POST /ads/error`: ad selection, client-safe measurement, no-fill, skipped, completed, and privacy-choice states.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: Premium and membership lifecycle, platform ownership, restores, refunds, and delayed state.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, `POST /history/clear`: privacy choices, history controls, export, account deletion, and warning state.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: content, comment, channel, ad, copyright, account, billing, and support workflows.

## Realtime, Push, And Offline Behavior

- Playback, live stream status, live chat, comments, upload processing, copyright checks, notifications, subscriptions, monetization, ad breaks, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Home, Shorts manifests, search suggestions, watch pages, channel pages, playlist/library summaries, upload status, settings, entitlement summary, and support status with stale labels.
- Offline mode may play valid Premium-like downloads, preserve queue/library state for offline-eligible videos, and queue low-risk playlist/library changes for sync.
- Offline mode must block non-downloaded streams, ad-required playback when ad service is unavailable, uploads, live streaming, comments, fan funding, subscription changes, account deletion, support evidence upload, and irreversible moderation/privacy actions.
- Uploads and live streams must expose pending, processing, checks-running, copyright-claimed, failed, published, scheduled, live, ended, replay-processing, and removed states.
- Push notifications must be opt-in and category-controlled for channel uploads, livestreams, comments/replies, memberships, billing, upload checks, support cases, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact watch history, private video titles, child/supervised identifiers, payment state, copyright details, and support evidence.
- Ads and Premium/background playback must tolerate app backgrounding, no-fill, creative errors, network loss, region change, and entitlement refresh without corrupting playback progress.

## Permissions, Privacy, And Safety

- Notifications, microphone, camera, photos/files, local network/cast, contacts, location, and Bluetooth/proximity must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact watch history, unpublished video titles, private comments, child/supervised identifiers, payment details, device names, support evidence, and copyright-confidential material.
- User-uploaded video, Shorts, live streams, captions, comments, thumbnails, music, creator identity, and monetized content are launch blockers with legal/content/provider owners.
- Copyright, trademark, rightsholder takedown, automated/manual checks, remix permissions, altered/synthetic content disclosure, paid promotion, and creator impersonation require launch-blocking review.
- Safety controls must cover hate/harassment, threats, sexual content, child safety, self-harm, dangerous acts, spam/scams, misinformation-sensitive categories, illegal goods, privacy violations, and appeals.
- Supervised and made-for-kids controls must restrict uploads, comments, saving/sharing, personalized ads, age-restricted videos, and data handling according to launch policy.
- Ads and monetization must honor privacy choices, age restrictions, sensitive categories, advertiser-friendly rules, regional ad law, and revenue/accounting minimization.
- Recommendations must avoid sensitive inference leakage, support user controls for history and hidden recommendations, and provide fallback content when personalization is disabled.
- Account deletion/export must warn about channels, uploads, comments, playlists, monetization/payout/tax records, memberships, support cases, and legal/copyright retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, captions, transcripts, accessible media controls, and nonvisual alternatives for Shorts/live chat.
- Launch owners: content/legal owner for uploads and copyright; privacy owner for history/data/ads; trust/safety owner for comments, live, minors, reports, and appeals; monetization owner for ads/fan funding; accessibility owner for video UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, home viewed, Shorts viewed, search performed, watch started/completed/failed, caption changed, comment submitted, subscription changed, playlist changed, upload processed, livestream started, ad impression/completion, entitlement changed, monetization module changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, supervised flag bucket, creator/viewer role, region bucket, error code, latency bucket, and provider status rather than raw titles, search text, comments, exact watch history, or child identifiers.
- Creator analytics must aggregate impressions, CTR, watch time, traffic source, views, unique viewers, Shorts engagement, notification traffic, external sources, and revenue buckets with role-based access.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, click, watch, hide, save, and report signals without exposing private user content.
- Playback analytics must support rights/provider accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Ad analytics must capture impression, completion, skip, click, no-fill, creative error, frequency cap, placement, privacy choice, and monetization eligibility without exposing sensitive viewer identity.
- Monetization may include original ads, Premium-like subscriptions, channel memberships, fan funding, Shopping, paid content, creator promotion, and revenue sharing after legal/provider review.
- Any paid plan, membership, fan funding, Shopping, or ad product must disclose price, renewal/cancellation, refund/support path, platform ownership, tax/payout duties, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, supervised account, expired session, account locked, channel suspended, auth revoked, or history disabled.
- Video exists but is blocked by age, made-for-kids restrictions, copyright, privacy, removed creator, region, live-ended state, paid membership gate, or malformed metadata.
- Shorts feed loops unavailable clips, swipe prefetch fails, related video is removed, sound/remix rights change, or comments are disabled mid-session.
- Upload fails due to file size, processing, copyright claim, missing audience declaration, altered-content disclosure, active strike, invalid thumbnail, or user closes before visibility is set.
- Live stream drops, chat floods, moderator action races, Super Chat fails, stream becomes age restricted, or replay processing fails.
- Comment is held for review, deleted by author, removed by moderation, rate-limited, reported, or hidden because of made-for-kids/supervised settings.
- Premium entitlement expires while a download is offline, background playback is gated, platform restore is delayed, ad service no-fills, or payment webhook duplicates.
- Creator meets thresholds but region is ineligible, tax/payout setup fails, ad suitability is rejected, fan funding is disabled, or monetization modules change.
- Data export conflicts with account deletion, copyright retention prevents full purge, channel owner deletes videos used in playlists, or private videos were shared externally.

## Test Plan

- Unit tests for entitlement gates, age/supervised/made-for-kids rules, upload state machine, playback state machine, comment moderation, monetization eligibility, ad state, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, idempotency keys, validation errors, rights states, safety states, upload/check states, ad states, webhook duplicates, and deletion/export states.
- Integration tests for auth, signed-out browse, Home, Shorts, Subscriptions, Explore, Search, Watch, comments, playlists, Library, channel page, upload, live stream, settings, support, data export, and account deletion.
- Playback tests for buffering, quality change, captions, background gate, ad break, live latency, mini-player, removed video, age block, copyright block, and stale cache.
- Upload/live tests for file import, metadata edit, audience declaration, paid promotion disclosure, altered-content disclosure, checks, copyright claim, publish, schedule, live start/end, and replay.
- Comment/safety tests for comments disabled, held for review, report flow, abusive content, moderation action, appeal/support, live chat flood, and supervised/made-for-kids restrictions.
- Monetization tests for YPP thresholds, ads module, Shorts revenue state, membership tier, Super Chat/Stickers/Thanks, Shopping, Premium revenue, payout/tax, and regional ineligibility.
- Offline tests for valid downloads, expired downloads, entitlement loss, missing downloads, corrupt cache, queued low-risk writes, and reconnect reconciliation.
- Privacy tests for history controls, ads choices, data export, account deletion, channel/video/comment consequences, support redaction, and analytics minimization.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, captions/transcripts, Shorts controls, live chat navigation, and media controls.
- Manual verification tests: native iOS/Android screenshots, auth, recommendations, Shorts, upload, live, comments, memberships, fan funding, Shopping, ads, Premium, downloads, background play, supervised accounts, push payloads, export/delete, and regional behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing YouTube assets, network traffic, private APIs, recommendation systems, video/comment/channel data, ad infrastructure, monetization policy systems, copyright systems, or brand copy.
- New and returning users can discover, search, watch, save, comment, subscribe, upload, organize, and recover video content using original licensed or synthetic data.
- Viewer, creator, channel, video, Short, live, comment, playlist, upload, monetization, ad, supervised, privacy, support, and deletion workflows have deterministic data models and API contracts.
- Free/ad-supported, Premium-like, supervised, creator, monetization-eligible, member, age-restricted, made-for-kids, copyright-blocked, region-blocked, and account-struck states are covered by tests.
- Offline playback, downloads, uploads, live streaming, comments, fan funding, ads, recommendations, supervised experiences, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Copyright, minors/supervision, user-generated content, ads/privacy, monetization/payout, billing, accessibility, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which video storage/transcoding, live streaming, captions, moderation, copyright matching, recommendation, ad, and analytics providers will back the original clone?
- Which features are V1 versus later: Shorts, uploads, livestreaming, comments, memberships, fan funding, Shopping, Premium downloads, background play, or supervised accounts?
- Will V1 support a free ad-funded tier, or start with synthetic/demo catalog plus internal creator accounts?
- Which payment platforms own Premium, channel memberships, fan funding, refunds, tax, and payout workflows?
- Which regions, languages, age rules, upload rights, caption requirements, safety categories, and device integrations are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, Search, Watch page, Channel page, Library, playlists, synthetic video/channel seed data, settings, and privacy-safe analytics.
- Phase 2: add Shorts feed, subscriptions, Explore, comments, reports, notification preferences, supervised/made-for-kids restrictions, and safety regression tests.
- Phase 3: add playback provider abstraction, captions, quality, mini-player, live playback model, ad break model, and provider error handling.
- Phase 4: add upload flow, metadata, visibility, disclosures, processing/check states, copyright placeholder, creator dashboard, and upload regression tests.
- Phase 5: add live streaming, live chat, moderation tools, replay states, fan-funding placeholders, and live/chat regression tests.
- Phase 6: add Premium entitlements, downloads/offline, background-play gates, checkout/restore/webhooks, ads, monetization eligibility, and billing/ad regression tests.
- Phase 7: add creator analytics, YPP/funding modules, Shopping placeholders, push notifications, support cases, data export/deletion, accessibility pass, and manual native verification.
- Phase 8: complete legal/provider launch review for user-generated video, copyright, ads, recommendations, minors, monetization, data rights, regional availability, and platform APIs.

## Next Steps

- Resolve YouTube manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 video/entertainment implementation-readiness upgrades with `074-twitch.md`.
