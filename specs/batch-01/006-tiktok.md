# TikTok-Style Clone Spec

> Metadata
> - Inspiration app: TikTok
> - Category: Short video, creator tools, social discovery, live/video commerce
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-16.
> - Verification basis: exact public marketplace pages, TikTok Help Center docs, TikTok legal/policy docs, TikTok Community Guidelines, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, lawful account lifecycle walkthrough, creator upload/posting walkthrough, direct messaging, LIVE, Shop checkout, Coins/gifts, notification payloads, and teen/family controls still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample media, sounds, ranking systems, moderation rules, commerce catalog, and creator content.

## Overview

Build an original short-video mobile app inspired by TikTok's public workflow: vertical personalized feeds, creator camera/editor, sound attribution, comments, follows, direct sharing, Duet/Stitch-like remixing, LIVE-style sessions, reporting/blocking, recommendation controls, teen safety controls, and optional commerce/virtual-item surfaces.

The clone must not copy TikTok branding, screenshots, marketing copy, protected UI artwork, music catalog, creator videos, private recommendation logic, moderation models, LIVE/gift economy, marketplace sellers, product catalog, or proprietary network contracts. Functional parity should be expressed through original product language, licensed media, original seed content, transparent recommendation controls, and independently designed policy enforcement.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first short-video feed with swipe navigation, video playback, engagement actions, follows, comments, sharing, saves, and reporting.
- Support creator workflows for capture, upload, multi-clip editing, sounds, effects, captions/text overlays, drafts, post settings, and deletion.
- Expose recommendation controls, content preferences, privacy settings, blocked/muted accounts, data download/deletion, and account deactivation/deletion.
- Preserve media-platform safety expectations around minors, harassment, bullying, sexual content, misinformation, dangerous challenges, regulated goods, scams, copyright, and AI-generated media.
- Produce concrete routes, entities, API contracts, offline rules, analytics, seed data needs, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a TikTok-branded app or imply affiliation with TikTok, ByteDance, TikTok USDS, creators, sellers, or music rights holders.
- Do not scrape TikTok, reuse private TikTok APIs, replay TikTok network traffic, copy videos/sounds/comments, or clone proprietary ranking/moderation behavior.
- Do not ship open-ended user-generated video distribution without a launch-blocking trust-and-safety review, takedown workflow, copyright process, and teen safety review.
- Do not ship real-money commerce, creator monetization, gifts, Coins, or subscriptions until payment, tax, refund, fraud, age, and platform-policy owners approve the design.
- Do not claim exact App Store, Play Store, or native-device parity until the manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/tiktok-videos-shop-live/id835599320 | Official iOS listing, category, age rating, privacy/safety positioning, supported devices, in-app purchases, current version notes, creation/feed/LIVE/Shop claims | Verified 2026-04-16 |
| Google Play | https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically | Official Android listing, package id, rating/download scale, ads/in-app purchases, data safety, creation/feed/sound/effects/Shop claims, support contact | Verified 2026-04-16 |
| TikTok Help Center: Making a Post | https://support.tiktok.com/en/using-tiktok/creating-videos/making-a-post | Video/photo/text post flow, capture/upload, edit, description, hashtags, people tags, location, link, privacy settings, post/draft states | Verified 2026-04-16 |
| TikTok Help Center: Editing Videos And Photos | https://support.tiktok.com/en/using-tiktok/creating-videos/editing-tiktok-videos-and-photos/ | Multi-clip edit tools, speed, transitions, text, overlays, sound replacement, voiceover, AI create availability caveat | Verified 2026-04-16 |
| TikTok Help Center: Sounds | https://support.tiktok.com/en/using-tiktok/creating-videos/sounds | Add/search/preview/favorite/edit sound flow and sound attribution expectations | Verified 2026-04-16 |
| TikTok Help Center: Effects | https://support.tiktok.com/en/using-tiktok/creating-videos/effects | Camera/effect/filter selection, preview, favorites, filter strength, effect availability before/after capture | Verified 2026-04-16 |
| TikTok Help Center: Duets | https://support.tiktok.com/en/using-tiktok/creating-videos/duets-settings/ | Side-by-side remix behavior, public-account requirement, reuse permissions, teen caveats | Verified 2026-04-16 |
| TikTok Help Center: Stitch | https://support.tiktok.com/en/using-tiktok/creating-videos/stitch | Clip-based remix behavior, privacy controls, associated-video management, draft/post states | Verified 2026-04-16 |
| TikTok Help Center: How TikTok Recommends Content | https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content | Feed inputs, user interactions, content information, user information, diversification, repeated-content handling | Verified 2026-04-16 |
| TikTok Help Center: Refresh Your For You Feed | https://support.tiktok.com/en/account-and-privacy/account-privacy-settings/refresh-your-for-you-feed/ | Recommendation reset flow, settings path, irreversible refresh, For You-only scope | Verified 2026-04-16 |
| TikTok Help Center: Account And Privacy | https://support.tiktok.com/en/account-and-privacy | Privacy settings, direct messages, comments, post privacy, downloads, account region, ads/data, data requests, account deletion/deactivation | Verified 2026-04-16 |
| TikTok Family Pairing | https://support.tiktok.com/en/safety-hc/account-and-user-safety/family-pairing | Teen screen time, scheduled breaks, muted notifications, guardian controls, defaults by teen age band | Verified 2026-04-16 |
| TikTok Community Guidelines | https://www.tiktok.com/community-guidelines/en | Safety, civility, youth protection, mental/behavioral health, misinformation, authenticity, regulated goods, privacy/security, FYF eligibility | Verified 2026-04-16 |
| TikTok Terms of Service | https://www.tiktok.com/legal/page/us/terms-of-service/en | Account rules, prohibited uses, content rights, IP/copyright enforcement, platform changes, user responsibilities | Verified 2026-04-16 |
| TikTok Privacy Policy | https://www.tiktok.com/legal/page/us/privacy-policy/en | Account/profile data, user content, location/device data, ads, personalization, data rights, deletion/export obligations | Verified 2026-04-16 |

## Detailed Design

### Source-Backed Product Requirements

- The public mobile listings position TikTok around personalized discovery, vertical video, creation tools, LIVE, shopping, safety/privacy controls, and in-app purchases.
- iOS must support iPhone, iPad, Apple Vision, and iMessage surfaces where the App Store listing exposes them; Android must support the Play listing's phone/tablet compatibility and Play data-safety expectations.
- The home experience must include at least For You, Following, and creator/profile entry points; V1 may omit Friends, STEM, LIVE, and Shop feeds only if clearly flagged as deferred.
- Feed ranking must support documented inputs such as user interactions, content metadata, user/device context, and diversification, but must use an independently designed ranking model with explainable controls.
- Users must be able to reset or adjust personalized recommendations from settings/content preferences; reset must be treated as irreversible and scoped to the personalized feed.
- Post creation must support capture and upload, description/caption, hashtags, people tags, optional location/link fields, privacy controls, publish, delete, and private drafts.
- Editor must support multi-clip media, trimming, rearranging, speed changes, text, overlays, transitions, filters, effects, sound selection/replacement, and voiceover where V1 includes the related media type.
- Sound use must include licensing metadata, attribution, search, preview, favorites, edit range, removal, and unavailable-sound fallback.
- Duet-like and Stitch-like remixing must honor original-post reuse permissions, public/private account settings, teen restrictions, takedown state, and attribution.
- Comments, direct messages, downloads, profile view state, post view history, reposts, and sharing must be privacy-controlled and age-aware.
- LIVE, gifts/Coins, subscriptions, creator monetization, and Shop are launch-blocked for V1 unless separate commerce, safety, age, fraud, refund, tax, and platform-policy reviews are completed.
- Account deletion, deactivation, data download, ad personalization, privacy settings, terms, policy links, report-a-problem, and support paths must be reachable from settings.

## Core User Journeys

- New user installs the app, reviews age-appropriate onboarding, chooses signup or lawful signed-out browsing, configures core privacy defaults, and lands on the video feed without granting unsupported permissions.
- Returning user opens the app, scrolls the personalized feed, pauses/resumes playback, likes, saves, comments, follows a creator, shares a video, reports unsafe content, and sees recommendations respond over time.
- Creator taps Add Post, captures or uploads video/photo/text content, adds sound/effects/text, edits clips, sets visibility/comment/download/reuse permissions, saves a draft, then publishes.
- User opens a sound or hashtag page, browses related videos, saves the sound, starts a post using it, and sees licensing/unavailable-region fallback when the sound cannot be used.
- User creates a Duet/Stitch-like remix from an eligible public post, previews attribution and reuse rules, edits their own segment, posts, drafts, or cancels without modifying the source post.
- User resets or tunes the personalized feed, confirms the irreversible effect, receives popular or broad content, and rebuilds recommendations through watch/skip/like/comment/share behavior.
- Teen user or guardian configures screen time, scheduled breaks, muted notification windows, privacy limits, and content controls with stricter defaults than adult accounts.
- User is offline or loses connectivity during feed playback, upload, comment, or draft editing; cached reads continue where safe, irreversible writes are queued or blocked, and conflicts reconcile after reconnect.
- User requests data export, deactivates or deletes the account, and sees clear retention, reactivation, active-order, subscription, and appeal consequences.
- User encounters content involving harassment, self-harm, minors, scams, dangerous challenges, regulated goods, misinformation, copyright, or AI-generated media and can report it for policy review.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Age Gate | Entry, consent, login/signup, age-aware defaults | email/phone/social auth, birthday, legal consent | new, returning, signed-out, restricted teen | underage, blocked region, auth failure, network failure |
| Video Feed | Personalized vertical consumption | swipe, pause, like, comment, share, save, follow, not-interested | For You, Following, empty, loading, offline cached | unavailable video, muted sound, policy hold, stale rank |
| Video Detail/Comments | Conversation around a post | comments, replies, likes, report, creator profile | open, sorted, hidden, limited, creator-filtered | comment disabled, blocked user, moderation queue |
| Creator Camera | Capture or upload media | camera, mic, photos/files, record, upload, timer | permission prompt, recording, paused, selected clips | permission denied, disk full, media unsupported |
| Editor | Trim, arrange, annotate, and score media | clips, text, stickers, effects, filters, sound, voiceover | editing, preview, processing, saved draft | sound unavailable, effect unsupported, render failure |
| Post Settings | Publish metadata and privacy controls | description, hashtags, tags, location, links, visibility, reuse, comments | valid, draft, scheduled/deferred, published | duplicate submit, policy block, upload expired |
| Sound/Effect/Hashtag Pages | Discovery and reuse source | search, preview, favorite, use sound/effect | trending, results, saved, unavailable | rights blocked, region blocked, removed asset |
| Profile | Creator identity and content grid | follow, message, grid/list, likes, bio link | public, private, own, blocked, suspended | hidden likes, unavailable videos, appeal needed |
| Remix Composer | Duet/Stitch-like creation | source segment, layout, record/upload, publish | eligible, editing, attributed, draft | source deleted, reuse disabled, teen restriction |
| Inbox/Notifications | Activity, messages, system alerts | notification tap, DM, follow request, appeal update | unread, grouped, muted, denied permission | revoked push, blocked sender, expired deep link |
| LIVE/Commerce Placeholder | Future LIVE, gifts, Shop, or monetization | enter live, product link, gift, checkout | disabled, gated, region unavailable | launch-blocked, age blocked, payment blocked |
| Content Preferences | Recommendation controls | not interested, keyword filters, refresh feed, topics | saved, pending, reset confirmed | reset irreversible, sync delay, unsupported region |
| Privacy And Safety Settings | Account privacy, comments, DM, reuse, downloads, teen controls | toggles, lists, blocked accounts, family pairing | adult, teen, guardian-linked, private account | guardian lock, invalid age, feature unavailable |
| Data And Account Controls | Export, deactivate, delete, ads/data settings | export request, delete, deactivate, ad controls | pending export, cooling-off, deleted | active order, subscription, legal hold, failed email |
| Report And Appeal | Trust/safety issue resolution | report reason, evidence, appeal, support message | submitted, under review, actioned, appealed | abusive report, duplicate, urgent harm escalation |

## Data Model

- `User`: account identity, age band, region, language, auth providers, consent state, safety strikes, deletion/deactivation/export lifecycle.
- `Profile`: handle, display name, avatar, bio, links, privacy level, verification-equivalent badge, follower counts, visibility restrictions.
- `DeviceSession`: device id, platform, app version, push token, playback capability, session expiry, last active timestamp.
- `Post`: creator, media type, caption, hashtags, sound, visibility, comment/download/reuse settings, moderation state, publish/delete timestamps.
- `MediaAsset`: upload session, storage key, duration, dimensions, codec, thumbnails, transcript/captions, scan state, rights metadata, derivative renders.
- `SoundAsset`: licensed/original sound id, owner, territory availability, attribution, clip range, usage count, takedown state.
- `FeedItem`: post id, feed surface, rank/debug reason code, impression id, eligibility state, diversity bucket, stale/cache state.
- `Engagement`: likes, saves, shares, reposts, watch events, skips, not-interested actions, follows, and privacy-safe counters.
- `CommentThread`: comment/reply tree, author, visibility, filters, moderation state, creator pin/delete/filter actions.
- `Relationship`: follow/friend/block/mute state, follow request state, DM eligibility, safety restrictions.
- `Draft`: local/server draft metadata, media references, editor timeline, privacy settings, unsynced changes, recovery state.
- `Remix`: source post, segment range, layout/mode, attribution, source eligibility snapshot, takedown dependency.
- `RecommendationPreference`: reset version, topic controls, keyword filters, not-interested signals, content maturity settings.
- `FamilyPairingLink`: guardian/teen accounts, screen-time limits, scheduled breaks, notification mute windows, override requests.
- `CommerceItem`: optional product/gift/coin/subscription object, seller/creator, entitlement/payment state, fraud/review state.
- `Report`: reported object, reason, reporter, policy category, evidence pointers, decision, appeal state, urgent escalation flag.
- `AuditEvent`: append-only record for account, privacy, safety, moderation, billing, deletion/export, and guardian-control changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions`: device-scoped auth with age/region gates.
- `GET /feed?surface=&cursor=&resetVersion=`: returns ranked feed items, media manifests, impression ids, cache hints, and eligibility reason codes.
- `POST /feed/events`: idempotent watch, skip, like, save, share, not-interested, follow, and report signals for recommendation updates.
- `GET /posts/:id`, `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`: post lifecycle with policy checks, visibility, comments, downloads, and reuse settings.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed media upload flow with size/type/codec validation, malware scanning, transcoding, and rights metadata.
- `GET /editor/assets?type=sound|effect|filter`, `GET /sounds/:id`, `POST /sounds/:id/favorite`: licensed asset discovery, preview, availability, and favorite state.
- `POST /drafts`, `PATCH /drafts/:id`, `DELETE /drafts/:id`, `POST /drafts/:id/publish`: local/server draft sync, conflict resolution, and publish promotion.
- `POST /remixes`, `GET /posts/:id/remix-eligibility`: Duet/Stitch-like flow with source permissions, teen restrictions, attribution, and takedown dependency checks.
- `GET /posts/:id/comments`, `POST /posts/:id/comments`, `PATCH /comments/:id`, `DELETE /comments/:id`: comment/reply lifecycle with filters, creator actions, and moderation states.
- `GET /profiles/:handle`, `POST /relationships/:profileId`: profile reads and follow/block/mute/friend states with DM eligibility updates.
- `GET /search?query=&type=&cursor=`, `GET /hashtags/:tag`, `GET /topics`: search and discovery surfaces with safe-mode, locale, and moderation filters.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `GET /settings/recommendations`, `PATCH /settings/recommendations`, `POST /settings/recommendations/refresh`: privacy and recommendation controls.
- `GET /family-pairing`, `POST /family-pairing/invitations`, `PATCH /family-pairing/:id`: guardian-linked controls, teen override requests, and audit events.
- `GET /notifications`, `PATCH /notification-preferences`, `POST /push/register`: in-app and push notification preferences with age-aware quiet-hour defaults.
- `POST /reports`, `GET /reports/:id`, `POST /appeals`: trust/safety reporting, moderation decision, appeal, and urgent harm escalation.
- `POST /data-export`, `DELETE /account`, `POST /account/deactivate`: privacy workflows with asynchronous status, retention notices, and commerce/subscription blockers.
- `GET /commerce/status`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: optional commerce/virtual-item contracts; disabled until launch blockers clear.

## Realtime, Push, And Offline Behavior

- Video playback must tolerate prefetch, variable bandwidth, app backgrounding, muted autoplay, stream expiration, and unavailable media manifests.
- The client may cache feed metadata, media thumbnails, recent video segments, profile summaries, settings, and drafts; cache entries must carry freshness and policy eligibility.
- Watch/skip/like/save/share/follow/comment signals must be idempotent and replay-safe after reconnect so ranking and counters do not double-count.
- Drafts may queue locally with media references, but publishing, deletion, comments, reports, account deletion, and commerce actions require canonical server confirmation.
- Uploads must resume or fail with visible recovery; unscanned, untranscoded, rights-blocked, or policy-held assets cannot publish.
- Comment, follow, notification, moderation, and LIVE-like state can use websocket/SSE with polling fallback and canonical refetch after missed events.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and mirrored in-app where useful; payloads must avoid sensitive raw content by default.
- Recommendation reset and family-pairing changes must sync across devices and invalidate stale local rank/preferences caches.

## Permissions, Privacy, And Safety

- Camera, microphone, photo library, files, contacts, notifications, location, and motion permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw videos, comments, DMs, precise location, face/voice biometric templates, minors' personal data, and private account identifiers.
- Teen accounts require stricter defaults for visibility, messaging, commenting, downloads, reuse, screen time, notifications, and content maturity.
- Creator tools must label or block AI-generated or significantly edited realistic media where policy requires disclosure.
- Copyright handling must include sound/media rights metadata, takedown intake, repeat-infringer enforcement path, and unavailable-sound fallbacks.
- Moderation must block, remove, label, reduce distribution, or hold for review content involving youth exploitation, harassment, hate, self-harm, dangerous challenges, sexual content, scams, regulated goods, misinformation, privacy violations, and platform manipulation.
- Reporting must exist for posts, comments, profiles, sounds/effects, DMs, LIVE-like sessions, and commerce objects before any public UGC launch.
- Support tooling must minimize exposure to raw media and require elevated access, audit logs, and redaction controls.
- Recommendation systems must expose user-facing controls: not interested, keyword/topic filters, feed refresh/reset, blocked/muted creators, and ad/data settings where applicable.
- Launch owner: product/security lead for safety policy, privacy owner for data controls, media owner for copyright/licensing, teen-safety owner for family controls, commerce owner for Shop/gifts/Coins.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, feed impression, playback started/completed/skipped, like/save/share/follow, comment submitted, search performed, post started/drafted/published/deleted, report submitted, recommendation reset, privacy setting changed, data export requested, account deletion requested.
- Every analytics event must use object ids, object types, policy categories, and failure codes rather than raw captions, comments, video pixels, audio, face/voice features, location, or DM text.
- Feed analytics must separate ranking diagnostics from user-visible event logs and must support audit sampling for safety and fairness reviews without exposing raw user content broadly.
- Monetization can include original subscriptions, virtual items, creator boosts, or commerce later, but names, pricing, offers, gifts, Coins, seller inventory, and promotional copy must be original.
- V1 should treat LIVE, gifts/Coins, creator monetization, and Shop as disabled states unless legal/payment/fraud/age/platform reviews are complete.
- Commerce analytics must treat product views, checkout, refunds, disputes, seller complaints, and fraud holds as sensitive and never trust client-only payment state.

## Edge Cases

- First launch offline, unsupported OS, underage user, age verification failure, blocked region, banned account, expired auth token, or guardian-linked restrictions.
- Feed contains removed, private, blocked, region-restricted, age-restricted, rights-restricted, already-seen, or moderation-held videos.
- User rapidly swipes, likes, unlikes, follows, unfollows, comments, deletes, reports, or resets feed preferences while offline or under poor network.
- Creator loses permission after recording, upload partially completes, transcoding fails, sound rights change before publish, or draft references a deleted local file.
- Duet/Stitch-like remix source is deleted, made private, reuse-disabled, age-restricted, copyright-blocked, or policy-removed after the remix is drafted.
- Comment filters hide a comment after optimistic display, creator disables comments, blocked users interact through old deep links, or moderation actions race with user deletion.
- Family pairing link expires, guardian and teen disagree on controls, teen ages into a new default band, or scheduled breaks conflict with platform notification rules.
- Data export email fails, account deletion requested with active commerce order/subscription, appeal pending after deletion, or legal retention prevents immediate erasure.

## Test Plan

- Unit tests for feed item state, playback events, recommendation preference resets, privacy defaults, teen restrictions, idempotency keys, and analytics redaction.
- Unit tests for editor timeline operations: trim, split, reorder, speed, overlay, text duration, sound replacement, draft recovery, and render-state transitions.
- Contract tests for every API route, including pagination, media manifest errors, upload states, policy holds, reuse eligibility, settings updates, export/delete status, and commerce disabled states.
- Integration tests for auth, feed load, watch/skip/like/save/share/follow, comment, report, search, profile open, and recommendation refresh.
- Creation tests for capture/upload, permission denied/granted/revoked, draft save, draft publish, upload resume, transcode failure, policy block, and post deletion.
- Remix tests for eligible source, reuse disabled, teen restriction, source deleted, source made private, attribution preserved, and takedown dependency.
- Safety tests for youth safety, harassment, hate, self-harm, dangerous challenges, sexual content, scams, regulated goods, misinformation, copyright, privacy violations, and spam.
- Privacy tests for private account defaults, comments/DM/download/reuse controls, blocked/muted users, data export, deactivation, deletion, and audit events.
- Offline tests for cached feed reads, queued low-risk engagements, blocked irreversible writes, corrupt cache, stale rank, upload retry, and reconnect reconciliation.
- Accessibility tests for captions, screen-reader labels, focus order, dynamic type, contrast, reduced motion, large tap targets, and playback controls.
- Notification tests for opt-in, denied, revoked, quiet hours, teen defaults, deep links, in-app fallback, grouped alerts, and sensitive-payload redaction.
- Manual verification tests: native iOS screenshots, native Android screenshots, account signup/deletion, creator posting, direct messages, LIVE, Shop checkout, Coins/gifts, push payloads, and family pairing on real devices/accounts.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing TikTok assets, videos, sounds, creator content, marketplace data, private APIs, brand copy, or proprietary ranking/moderation systems.
- New and returning users can browse a vertical feed, play videos, follow creators, comment, share, save, report, and tune recommendations.
- Creator users can capture/upload media, edit clips, select licensed/original sounds, apply effects/text, save drafts, publish, delete, and configure post privacy.
- Duet/Stitch-like remixing is implemented only with source eligibility, reuse controls, attribution, teen restrictions, and takedown dependency handling.
- Recommendation reset, content preferences, privacy settings, data export, deactivation, account deletion, report/appeal, and teen/family controls are accessible from settings and covered by tests.
- UGC safety categories are blocked, labeled, reduced, held, or reportable before public launch, with owner sign-off recorded for minors, harassment, self-harm, misinformation, copyright, scams, and regulated goods.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which original ranking approach will V1 use: chronological baseline, rules-based personalization, lightweight collaborative filtering, or a separately audited recommender service?
- Which media pipeline, CDN, transcoder, captioning provider, moderation provider, and licensed sound library will back creator content?
- Will V1 allow signed-out feed browsing, and if yes, what retention, personalization, age-gate, and analytics rules apply?
- Are LIVE, direct messages, Shop, gifts/Coins, subscriptions, creator monetization, and web uploads in V1, or explicitly deferred?
- Which age assurance and guardian-control requirements apply in the launch regions?

## Build Plan

- Phase 1: scaffold app shell, auth/age gate, video feed, playback engine, profile basics, follows, privacy-safe analytics, and original seed video data.
- Phase 2: add comments, likes, saves, shares, reporting, block/mute, notification preferences, search, hashtag/sound/effect discovery, and recommendation controls.
- Phase 3: add creator capture/upload, media upload/transcode contracts, editor timeline, sound/effect attribution, drafts, post settings, and publish/delete lifecycle.
- Phase 4: add Duet/Stitch-like remixing, source eligibility, reuse controls, attribution, takedown dependency, and creator privacy regression tests.
- Phase 5: add data export, deactivation/deletion, ad/data settings, family pairing, screen-time/scheduled-break controls, teen defaults, and cross-device sync.
- Phase 6: complete trust/safety tooling, moderation policy coverage, copyright workflow, accessibility pass, offline/reconnect pass, and manual native verification.
- Phase 7: evaluate LIVE/commerce/virtual-item scope only after separate legal, payment, age, fraud, tax, and platform-policy approvals.

## Next Steps

- Use this spec as the pattern for upgrading `016-whatsapp.md`, `026-google-maps.md`, and the remaining architecture-teaching specs.
- Resolve the manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
