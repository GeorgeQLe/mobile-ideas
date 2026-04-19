# Twitch-Style Clone Spec

> Metadata
> - Inspiration app: Twitch
> - Category: live streaming, channels, chat, clips, VODs, subscriptions, Bits-like fan funding, ads, creator monetization, community moderation, and safety
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Twitch legal pages, Twitch Safety Center documentation, public app descriptions, Terms of Service, Privacy Notice, Terms of Sale, community policy pages, and public Help Center entry points.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, following, live channel discovery, mobile broadcast, chat, moderation tools, clips, VOD resume, Drops, channel points, subscriptions, Bits/Cheers, gift subs, ads, creator dashboard, payouts/tax, raids/hosts, notifications, account deletion, privacy/export, support tickets, Apple TV/cast behavior, and regional monetization availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, emotes, badges, streams, clips, VODs, chat content, creator/channel metadata, moderation systems, monetization products, ad technology, payment integrations, game/service integrations, and licensing relationships.

## Overview

Build an original mobile live-streaming app inspired by Twitch's public workflow: account entry, Followed channels, live recommendations, Browse categories, channel pages, live player, chat, clips, VODs, mobile broadcasting, subscriptions, Bits-like fan funding, channel points-like rewards, creator monetization, ads, reports, moderation, support, privacy controls, and account deletion.

The clone must not copy Twitch branding, screenshots, marketing copy, protected UI artwork, private APIs, emotes, badges, channel data, chat logs, streams, clips, VODs, Drops integrations, recommendation systems, ad targeting logic, moderation tooling, or monetization policy implementation. Functional parity should use original product language, synthetic or licensed streams, provider-approved live infrastructure, independently designed community tools, and separately reviewed fan-funding and payout systems.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first live-streaming app with onboarding, Home/Following, Browse, Search, channel pages, live player, chat, clips, VODs, mobile broadcast, notifications, settings, support, privacy, and account controls.
- Support viewer, creator, moderator, and subscriber workflows: follow, chat, subscribe, cheer/fan-fund, clip, report, moderate, broadcast, manage channel state, inspect basic analytics, and handle ads.
- Preserve live-community trust expectations around minors, harassment, hate, private information, copyright, adult/sensitive content, gambling, scams, view manipulation, creator payments, ads, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Twitch-branded app or imply affiliation with Twitch, Amazon, streamers, game publishers, music labels, advertisers, payment providers, or event partners.
- Do not host production streams, VODs, clips, chat logs, emotes, badges, game metadata, music, or creator pages without licensed/user-owned content and provider approval.
- Do not scrape Twitch, reuse private Twitch APIs, replay network traffic, copy recommendation models, copy moderation systems, copy emote/badge catalogs, or bypass age, copyright, ads, subscription, payout, or safety restrictions.
- Do not treat live chat, moderation, subscriptions, Bits-like products, channel points-like rewards, Drops, mobile broadcasting, ads, or payouts as generic features; each requires product/legal/safety review and hands-on verification.
- Do not claim exact App Store, Play Store, native-device, live latency, chat, moderation, ad, subscription, fan-funding, creator-dashboard, notification, support, privacy, deletion/export, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/twitch-live-streaming/id460177396 | Official iOS listing, developer, Photo & Video category, 13+ age rating, in-app purchases for Sub Tokens and Bits, community/live/channel positioning, mobile broadcast claim, Terms/Support links, Nielsen notice, privacy labels, and accessibility support | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=tv.twitch.android.app | Official Android listing, package id, ads/in-app purchases, 100M+ downloads, live/community/channel/subscription/broadcast positioning, data safety, app support, and release context | Verified 2026-04-19 |
| Terms Of Service | https://legal.twitch.com/en/legal/terms-of-service/ | Account, minimum age, user content, license, prohibited conduct, simulcasting, advertisements, recommendations, copyright, third-party content, and service constraints | Verified 2026-04-19 |
| Privacy Notice | https://legal.twitch.com/en/legal/privacy-notice/ | Privacy categories, collection/use/disclosure, marketing/notifications, account deletion, retention, international transfer, children's privacy, and rights controls | Verified 2026-04-19 |
| Terms Of Sale | https://legal.twitch.com/en/legal/terms-of-sale/ | Paid products, subscriptions, Bits-like products, refunds, taxes, recurring billing, and payment constraints | Verified 2026-04-19 |
| Community Guidelines | https://safety.twitch.tv/articles/en_US/Knowledge/Community-Guidelines | Safety categories, private information, hateful conduct, illegal activity, intellectual property, sensitive content, usernames, spam/scams, rewards abuse, and enforcement expectations | Verified 2026-04-19 |
| Twitch Support Center | https://help.twitch.tv | First-party support entry point for account, subscriptions, chat, channel points, clips, moderation, broadcasting, and safety workflows | Verified 2026-04-19 |
| Twitch Developer Docs | https://dev.twitch.tv/docs/ | Public API/developer orientation, event-driven integrations, embeds/extensions context, and provider/API constraints for non-production reference | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and legal/safety pages position Twitch as a live community app for channels, chat, follows, subscriptions, mobile broadcasting, live categories, fan support, ads, and safety-moderated user content.
- V1 must model signed-out, signed-in viewer, streamer, moderator, subscriber, paid supporter, minor/underage-blocked, suspended, banned-from-channel, chat-restricted, ad-supported, monetization-ineligible, payout-pending, region-blocked, and rights-blocked states.
- Home/Following must support live followed channels, recommended live channels, offline followed channels, continue watching VODs, clips/promos where licensed, category rows, empty states, and stale/offline labels.
- Browse/Search must support categories, tags, live/offline filters, channel names, games/topics, languages, mature-content flags, viewer counts, followed/subscribed filters, and unavailable category states.
- Channel pages must support live/offline state, video player, chat, follow, subscribe, notifications, about panel, schedule, clips, VODs, categories/tags, social links, report path, and moderator/owner controls.
- Live player must support low-latency playback, pause/resume where provider allows, quality selection, chat overlay/sidecar, emote/sticker placeholders, ad breaks, stream drops, reconnect, mature-content interstitials, and VOD fallback.
- Chat must support messages, badges/emotes placeholders, slow mode, follower/subscriber-only modes, moderation actions, bans/timeouts, message deletion, report/block, rate limits, and safety filters.
- Clips/VODs must support create/share clip where rights allow, clip trim placeholder, VOD resume, chapters/markers if added, muted segments for rights, deletion/removal, and report/takedown states.
- Mobile broadcasting must support camera/microphone permissions, stream title/category/tags, preview, go-live, bitrate/network checks, chat/moderation, end stream, and VOD/clip availability flags.
- Monetization must support original subscription tiers, gift subscriptions, Bits-like fan funding, channel points-like rewards, ad breaks, creator revenue, payout/tax onboarding, refunds, chargebacks, and regional eligibility.
- Safety must support report flows, community guideline categories, private-info protection, hate/harassment detection, illegal/sensitive content controls, copyright takedown, scam/spam handling, account names, and appeal/support paths.
- Support/privacy/settings must expose account, security, notifications, chat, mature content, blocked users, subscriptions, payments, creator settings, privacy choices, data export/deletion, legal links, and support tickets.

### Manual Verification Required

- Native iOS and Android Home/Following/Browse tab names, player/chat layout, emote/badge display, mobile broadcast flow, clips/VOD UI, subscription purchase, Bits/Cheer purchase, ad playback, and release-note behavior.
- Signup/login, account age/region checks, chat restrictions, moderation actions, Drops/channel points, creator dashboard, payout/tax, notifications, support tickets, privacy/export/delete, Apple TV/cast behavior, raids/hosts, and regional monetization eligibility.

## Core User Journeys

- New viewer installs the app, creates an account, accepts terms/privacy, follows initial categories or creators, configures notifications, and lands on live recommendations.
- Returning viewer opens Following, taps a live channel, watches with chat open, follows or subscribes, sends a chat message, and handles an ad break or reconnect.
- Viewer browses a game/category, filters by language/tag, opens a channel, sees mature-content or blocked-region state, and reports unsafe content if needed.
- Subscriber buys a subscription or gift subscription where allowed, receives badge/perk state, renews/cancels, and sees refund/support owner for failed purchase.
- Fan buys a Bits-like product, cheers in chat, hits rate or eligibility limits, and sees chargeback/refund and moderation states.
- Moderator opens channel chat, deletes a message, times out a user, enables slow mode, reviews reports, and handles chat reconnect during a live stream.
- Creator starts a mobile broadcast, grants camera/mic permissions, sets category/tags/title, goes live, monitors chat, inserts or tolerates ads where applicable, ends stream, and reviews VOD/clip state.
- Privacy-focused user blocks another user, updates marketing/notification settings, exports data, deletes account, and sees user-content retention caveats.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, age/legal consent, signed-out browse | email, username, DOB, terms | signed-out, new, returning | underage, suspended, auth fail |
| Home/Following | Followed live channels and recommendations | channel tap, follow, notify | loading, live, offline, empty | stale, no follows, network loss |
| Browse/Search | Categories, channels, tags, and filters | query, category, tag, language | results, no-results, live | mature block, region block, removed category |
| Channel | Creator profile, live/VOD/chat/actions | play, follow, subscribe, report | live, offline, subscriber, owner | banned, suspended, no VODs |
| Live Player | Low-latency stream and controls | play, quality, chat, ad | playing, buffering, ad break | stream ended, reconnect, rights muted |
| Chat | Realtime community conversation | message, emote, report, moderate | open, slow, sub-only, mod | banned, timed out, rate-limited |
| Clips/VOD | Past content and shareable moments | create, trim, share, play | clip, VOD, processing | muted, removed, rights blocked |
| Broadcast | Mobile go-live flow | camera, mic, title, category | preview, live, ended | permission denied, bitrate low, stream fail |
| Subscriptions/Fan Funding | Paid support and perks | subscribe, gift, cheer, renew | active, gifted, canceled | payment fail, region ineligible, refund |
| Creator Dashboard | Streamer status, analytics, monetization | title, schedule, payout, ads | eligible, pending, active | tax fail, policy hold, payout blocked |
| Moderation/Safety | Reports, bans, timeouts, appeals | report, block, delete, appeal | pending, actioned, appealed | duplicate report, abuse flood |
| Settings/Privacy/Support | Account, notifications, privacy, deletion, help | toggles, export, delete, contact | loaded, pending export, deleting | legal retention, support unavailable |

## Data Model

- `User`: account identity, username/display name, age band, country/region, auth providers, roles, notification settings, privacy choices, blocked users, export/deletion state, and restrictions.
- `Channel`: owner, display metadata, category/tags, live state, mature flag, schedule, followers, subscription tiers, chat settings, moderation team, monetization state, and suspension state.
- `Stream`: channel, title, category, tags, ingest state, playback URL/provider, quality ladder, latency mode, live viewers, ad state, start/end times, and VOD policy.
- `ChatMessage`: channel, author, body, badges/emote references, timestamp, moderation state, deletion state, report state, and export/deletion metadata.
- `ModeratorAction`: moderator, target user/message, action type, duration, reason, appeal status, and audit references.
- `Clip`: source stream/VOD, creator, start/end, processing state, visibility, rights/mute state, share URL, and takedown state.
- `VOD`: source stream, playback asset, chapters/markers, muted segments, resume position, visibility, expiration, and rights state.
- `Follow`: user, channel, notification level, followed timestamp, and recommendation influence.
- `Subscription`: user, channel, tier, gift giver/recipient, platform owner, renewal/cancel/refund state, badge/perk state, and entitlement expiry.
- `FanFundingTransaction`: user, channel, product type, amount, message, payment owner, eligibility, refund/chargeback, and fraud/safety state.
- `ChannelReward`: channel, reward definition, point balance, redemption state, moderation state, cooldown, and abuse controls.
- `CreatorPayout`: channel, tax profile, payout method, earned revenue, hold/review state, payout status, and audit trail.
- `AdBreak`: stream/VOD, placement, creative id, frequency cap, impression/completion/skip state, no-fill state, and playback resume cursor.
- `Report`: reported content/user/channel, reporter, policy category, evidence metadata, moderation queue, action state, appeal, and audit references.
- `PrivacyRequest`: export, deletion, marketing/notification change, status, delivery method, identity verification, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, broadcast, chat, moderation, monetization, payout, ads, support, privacy, deletion, and safety-sensitive transitions.
- `LocalCacheRecord`: cached Following/Browse/channel/settings, VOD resume, stream reconnect state, draft chat, stale timestamps, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age, region, suspension, and device state.
- `GET /home`, `GET /following`, `GET /browse`, `GET /search`: discovery surfaces with cache hints, mature flags, language/category filters, live state, and fallback slots.
- `GET /channels/:id`, `PATCH /channels/:id`, `POST /channels/:id/follow`, `DELETE /channels/:id/follow`: channel detail, owner edits, follows, notifications, and stale-data indicators.
- `POST /streams`, `PATCH /streams/:id`, `DELETE /streams/:id`: mobile broadcast lifecycle with ingest status, permissions, category/tags, quality, and error codes.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: live/VOD playback lifecycle with latency, quality, ad state, reconnect, and rights errors.
- `GET /chat/:channelId/messages`, `POST /chat/:channelId/messages`, `DELETE /chat/messages/:id`: chat send/read/delete with rate limits, room modes, emote/badge references, and moderation state.
- `POST /moderation/actions`, `GET /moderation/actions`, `POST /reports`, `GET /reports/:id`: bans, timeouts, message deletions, reports, appeals, and safety status.
- `POST /clips`, `PATCH /clips/:id`, `GET /clips/:id`, `DELETE /clips/:id`: clip creation, trimming, processing, rights/mute state, sharing, and takedowns.
- `GET /vods`, `PATCH /vods/:id/progress`, `DELETE /vods/:id`: VOD listing, resume, visibility, expiration, and rights state.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: subscriptions, gift subs, fan funding, platform ownership, restores, refunds, and delayed state.
- `GET /creator/monetization`, `PATCH /creator/monetization`, `GET /creator/payouts`, `POST /creator/payouts/setup`: creator eligibility, tax, payout, holds, and audit state.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/error`: ad selection, no-fill, completed/skipped states, frequency caps, and privacy-safe measurement.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, deletion, closure, and retention caveats.
- `POST /support/cases`, `GET /support/cases/:id`: account, chat, subscription, payout, safety, broadcast, privacy, and support workflows with redaction.

## Realtime, Push, And Offline Behavior

- Live stream state, chat messages, moderation actions, subscriptions, fan funding, ad breaks, channel rewards, clips, VOD processing, payout state, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Following, Browse, channel pages, VOD lists, settings, entitlement summary, creator dashboard summary, and support status with explicit freshness labels.
- Offline mode may show cached followed channels, past channel pages, support status, and VOD resume metadata; it must not pretend live state is current.
- Offline mode must block live playback, chat, follows, subscriptions, fan funding, rewards, reports, broadcast, moderation actions, payout setup, account deletion, and support evidence upload.
- Live playback must handle stream start/end, reconnect, ad break, quality fallback, low-latency drift, creator disconnect, server failover, and mature-content interstitials.
- Chat realtime must handle ordering, duplicate messages, slow mode, follower/subscriber-only mode, deleted messages, bans/timeouts, moderator updates, and reconnect gaps.
- Push notifications must be opt-in and category-controlled for followed-channel live events, subscription renewals, channel activity, moderation/support updates, payout status, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact chat messages, payout amounts, support evidence, banned-user details, and private channel/moderation state.

## Permissions, Privacy, And Safety

- Notifications, camera, microphone, photos/files, local network/cast, Bluetooth/proximity, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw chat text where possible, private messages, exact watch history, payout/tax details, payment data, device names, support evidence, and creator-private analytics.
- Live streams, VODs, clips, chat, emotes, badges, music, game data, creator likeness, Drops-like integrations, ads, and fan-funding products are launch blockers with legal/content/provider owners.
- Copyright, trademark, rightsholder takedown, music rights, game publisher restrictions, stream fraud, account sharing/selling, rewards abuse, and creator impersonation require launch-blocking review.
- Safety controls must cover harassment, hate, threats, private information, illegal activity, sexual content, extreme violence, gambling, scams, spam, self-harm, minors, usernames, and appeals.
- Minors must be age-gated according to launch regions, with parental-supervision requirements, sensitive content restrictions, monetization limits, data minimization, and reporting coverage.
- Ads and monetization must honor privacy choices, age restrictions, sensitive categories, regional ad/payment/tax rules, chargebacks, refunds, and measurement minimization.
- Recommendations must avoid sensitive inference leakage, support user controls, and provide explainable fallbacks when personalization is disabled.
- Account deletion/export must warn about channel content, clips, chat, subscriptions, fan funding, payout/tax records, reports, support cases, and legal/financial retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, captions where available, accessible media controls, and nonvisual chat/moderation alternatives.
- Launch owners: content/legal owner for live/VOD/clips/music; trust/safety owner for chat/moderation/reports/minors; monetization owner for subscriptions/fan funding/payouts; privacy owner for data rights; accessibility owner for player/chat UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, live channel opened, stream started/completed/failed, chat sent/failed, follow changed, subscription changed, fan funding sent, clip created, broadcast started/ended, report submitted, moderation action taken, ad impression/completion, payout state changed, support case opened, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, role, entitlement state, region bucket, mature-content flag, error code, latency bucket, and provider status rather than raw chat text, exact watch history, payment details, or support evidence.
- Creator analytics must aggregate live viewers, unique chatters, follows, subscriptions, fan funding, ad revenue, VOD views, clip shares, stream health, category traffic, and moderation load with role-based access.
- Playback analytics must support stream-health/provider accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Ad analytics must capture impression, completion, skip, no-fill, creative error, frequency cap, placement, privacy choice, and channel eligibility without exposing sensitive viewer identity.
- Monetization may include original subscriptions, gift subscriptions, fan funding, creator rewards, ads, paid events, sponsorship disclosure, creator services, and partner integrations after legal/provider review.
- Any paid plan, fan-funding product, creator payout, reward, ad product, or partner integration must disclose price, renewal/cancellation, refund/support path, platform ownership, tax/payout duties, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, underage user, expired session, account suspended, channel banned, chat banned, auth revoked, or creator account locked.
- Followed channel goes live while cache says offline, stream ends during ad, player reconnects behind live edge, VOD is muted by rights, or clip source is removed.
- Chat floods, slow mode changes mid-send, follower/sub-only mode blocks user, moderator deletes a message before report, or ban expires during reconnect.
- Mobile broadcast loses camera/mic permission, network bitrate drops, ingest fails, stream title/category is invalid, or app terminates while live.
- Subscription purchase succeeds but entitlement webhook delays, gift recipient is ineligible, Bits-like transaction is charged back, payout is held for tax review, or region blocks monetization.
- Channel points-like redemption is abused, Drops-like integration misfires, reward cooldown races, or bot/scam behavior inflates engagement.
- Report duplicates, appeal conflicts with account deletion, private information appears in chat/stream, or legal hold prevents full deletion.
- Ad service no-fills, creative fails, viewer uses restricted account, creator disables ads, or frequency caps conflict across devices.

## Test Plan

- Unit tests for role/permission gates, live stream state machine, chat modes, moderation actions, entitlement gating, fan-funding transactions, payout states, ad states, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, realtime cursors, idempotency keys, validation errors, room modes, entitlement states, payment webhooks, report states, and deletion/export states.
- Integration tests for auth, Following, Browse, Search, channel page, live player, chat send, follow, subscribe, clip create, VOD resume, broadcast start/end, settings, support, data export, and account deletion.
- Realtime tests for stream start/end, reconnect, chat ordering, duplicate messages, moderation action propagation, subscription/fan-funding events, ad breaks, clip processing, and VOD availability.
- Chat/safety tests for slow mode, follower/subscriber-only, ban, timeout, delete, report, block, private-info detection, harassment/hate filters, spam/scam controls, and appeal/support paths.
- Broadcast tests for camera/mic denied, bitrate low, category invalid, go-live, backgrounding, stream end, VOD creation, and creator outage recovery.
- Monetization tests for subscriptions, gift subs, fan funding, refunds, chargebacks, regional ineligibility, tax setup, payout hold, ad eligibility, and webhook duplicates.
- Offline tests for cached channel pages, VOD resume metadata, blocked live/chat/payment/safety writes, stale labels, and reconnect reconciliation.
- Privacy tests for blocked users, notification/marketing choices, data export, account deletion, chat/content retention, payout/tax retention, support redaction, and analytics minimization.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, captions where available, chat navigation, moderation controls, and media controls.
- Manual verification tests: native iOS/Android screenshots, auth, live discovery, mobile broadcast, chat, clips, VOD resume, Drops, channel points, subscriptions, Bits/Cheers, ads, creator dashboard, payouts, notifications, support, export/delete, TV/cast, and regional monetization.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Twitch assets, network traffic, private APIs, recommendation systems, stream/chat/channel data, monetization systems, ad infrastructure, moderation tooling, or brand copy.
- New and returning users can discover, watch, follow, chat, subscribe, clip, broadcast, report, moderate, and recover live content using original licensed or synthetic data.
- Viewer, creator, moderator, channel, stream, chat, clip, VOD, subscription, fan-funding, payout, ad, safety, privacy, support, and deletion workflows have deterministic data models and API contracts.
- Signed-out, viewer, streamer, moderator, subscriber, paid supporter, banned, suspended, mature-content, monetization-ineligible, payout-held, region-blocked, and rights-blocked states are covered by tests.
- Live playback, chat, mobile broadcasting, clips, VODs, subscriptions, fan funding, ads, rewards, moderation, payouts, and privacy workflows have explicit blockers where exact native behavior is not verified.
- User-generated live media, minors, chat safety, copyright, ads/privacy, payment/payout, accessibility, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which live streaming, VOD, chat, moderation, emote/badge, payments, payouts, ad, analytics, and notification providers will back the original clone?
- Which features are V1 versus later: mobile broadcast, clips, VODs, subscriptions, gift subs, fan funding, channel rewards, Drops-like integrations, raids/hosts, or creator dashboard?
- Will V1 support real livestreaming, or begin with synthetic/demo livestreams and internal creator accounts?
- Which payment platforms own subscriptions, fan funding, refunds, chargebacks, tax, and payout workflows?
- Which regions, languages, content categories, age rules, monetization programs, music/game rights, and device integrations are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Following, Browse, Search, channel page, live player shell, synthetic channel/stream seed data, settings, and privacy-safe analytics.
- Phase 2: add realtime chat, room modes, follow/notification actions, report/block flows, moderation actions, and safety regression tests.
- Phase 3: add live streaming provider abstraction, playback health, quality, reconnect, VOD resume, clips, and provider error handling.
- Phase 4: add mobile broadcast, camera/mic permissions, stream setup, live status, VOD/clip creation, and broadcast regression tests.
- Phase 5: add subscriptions, gift subscriptions, fan-funding products, reward placeholders, checkout/restore/webhooks, and billing regression tests.
- Phase 6: add creator dashboard, monetization eligibility, payout/tax state, ad breaks, ad measurement minimization, and monetization/ad regression tests.
- Phase 7: add push notifications, support cases, data export/deletion, accessibility pass, TV/cast review, and manual native verification.
- Phase 8: complete legal/provider launch review for user-generated live media, copyright/music, chat safety, ads, payouts, minors, data rights, regional availability, and platform APIs.

## Next Steps

- Resolve Twitch manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 video/entertainment implementation-readiness upgrades with `075-letterboxd.md`.
