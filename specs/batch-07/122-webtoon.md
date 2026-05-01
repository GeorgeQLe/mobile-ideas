# Webtoon-Style Clone Spec

> Metadata
> - Inspiration app: Webtoon
> - Category: Digital vertical-scroll comics reader
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native iOS/Android capture, coin purchase/restore, fast-pass/daily-pass unlock economics, creator upload flow, and push payload inspection still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, series art, sample episodes, and recommendation logic.

## Overview

Build an original mobile comics app inspired by Webtoon's vertical-scroll reading experience: daily-schedule discovery, episode-by-episode reading with pinch/zoom controls, coin-based unlocks and time-gated previews, creator profiles, and a creator-side episode uploader.

The clone must not copy Webtoon branding, series art, sample episodes, marketing copy, ranking labels, private APIs, recommendation outputs, or creator-uploaded content. Product language, reading-surface design, and editorial surfaces must be original.

This spec is implementation-ready for a V1 that targets the documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag until verified.

## Goals

- Deliver a vertical-scroll reader with progress sync, offline caching, zoom/brightness controls, and episode navigation.
- Support day-of-week schedule discovery, genre browsing, and personalized recommendations using original signals.
- Support episode unlocks via coins, time-gated previews, and lawful purchase/restore flows.
- Provide creator onboarding, episode upload with panel order, and moderation feedback.
- Produce concrete routes, entities, API contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Webtoon-branded app or imply affiliation.
- Do not scrape series, reuse private APIs, or replay network traffic.
- Do not import creator content without a license and creator consent.
- Do not ship sexual-minor, exploitation, or hateful content; content-policy review is launch-blocking.
- Do not claim App/Play store parity until manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/webtoon-comics/id894546091 | iOS listing, genres, daily webcomic reading, creator/community positioning, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.naver.linewebtoon | Android listing, episodes, downloads, comments, subscriptions, data safety | Verified 2026-05-01 |
| WEBTOON Help Center | https://help2.line.me/LINE_WEBTOON/ | Account, coins, reading, publishing, comments, and support flows | Verified 2026-05-01 |
| WEBTOON Terms of Use | https://www.webtoons.com/en/terms | User content, subscriptions/coins, acceptable use, account, and platform rules | Verified 2026-05-01 |
| WEBTOON Creators 101 | https://www.webtoons.com/en/creators101 | Creator onboarding, publishing concepts, and creator-program orientation | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe a mobile app with free daily episodes, optional paid unlocks, and creator uploads across multiple genres.
- Readers must scroll vertically through stitched panels with smooth memory behavior on long episodes.
- Daily schedule must surface by day-of-week with an "updated today" indicator.
- Episode unlocks require an original entitlement model (coins, daily-pass-equivalent, time-gated).
- Readers must be able to subscribe to a series and receive new-episode notifications.
- Creator tools must support series creation, episode upload with panel manifest, and publish scheduling.
- Mature content must be tagged and gated by age and regional rules.
- Comments on episodes must support reporting, creator moderation, and abuse throttling.

## Core User Journeys

- Reader opens app, sees today's updates and day-of-week schedule, and taps a series.
- Reader reads a free episode end-to-end, leaves a comment, and subscribes.
- Reader hits a locked episode, opens entitlement sheet, purchases coins, and unlocks.
- Reader uses a time-gated preview to read ahead and is reminded when the free timer expires.
- Reader downloads an episode for offline and continues on a flight.
- Creator signs up, sets up a series profile, uploads panels for episode 1, and schedules publish.
- Creator reviews episode analytics and responds to comments.
- User reports a series or comment and receives resolution status.
- User signs out, deletes account, or exports data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and legal consent | email/social auth | new, returning, guest | underage, region block |
| Daily Home | Today's updates and schedule | tap series, day filter | empty, loaded, loading | feed failure, offline |
| Genre Browse | Genre/sort filters | filter, sort | empty, results | rate-limit, maintenance |
| Series Detail | Series overview and episode list | subscribe, start reading, unlock | unread, in-progress, completed | removed, region-blocked |
| Vertical Reader | Panel-by-panel reading | scroll, zoom, brightness | online, offline, night mode | panel load fail, memory pressure |
| Entitlements | Coins and unlocks | purchase, restore, history | free, paid, expired | platform mismatch |
| Comments | Episode-scoped discussion | post, reply, report | empty, loaded, locked | rate-limited, muted |
| Subscriptions | Followed series and alerts | manage, unsubscribe | empty, loaded | sync error |
| Creator Home | Creator dashboard | new series, upload episode | none, active series | suspended, pending review |
| Episode Uploader | Upload panels and metadata | media, order, tags | draft, scheduled, published | upload fail, size limit |
| Notifications | Episode and reply alerts | tap to open | unread, read | permission denied |
| Safety & Reports | Report series/comment | reason, details | submitted, resolved | abuse of reporting |
| Settings | Account, notifications, privacy | toggles | loaded, signed-out | managed account |

## Data Model

- `User`: identity, age gate, locale, reader/creator flags, moderation standing.
- `Series`: creator, title, genre, schedule day, maturity flags, completion state.
- `Episode`: series id, order, title, panel manifest, publish state, unlock policy.
- `Panel`: image reference, order index, alt text, processing state.
- `ReadingProgress`: user, episode, last-panel index, updated-at.
- `Subscription`: user, series, notification prefs.
- `CoinWallet`: balance, transactions, source type.
- `Entitlement`: user, episode/series, purchase id, platform, restore state.
- `Comment`: scope, author, text, moderation state.
- `Notification`: type, payload, delivery state.
- `SafetyReport`: target, reason, reporter, decision.
- `CreatorProfile`: display name, bio, series list, payout eligibility.
- `AuditEvent`: append-only account, publishing, billing, and safety changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`: session lifecycle.
- `GET /home/daily?day=`: daily schedule and today's updates.
- `GET /genres`, `GET /genres/:id/series?cursor=`: browse endpoints.
- `GET /series/:id`: metadata, episodes, entitlement summary.
- `GET /series/:id/episodes/:episodeId`: panel manifest with signed image URLs; enforces unlock.
- `POST /series/:id/progress`: reading progress with idempotency.
- `POST /subscriptions`, `DELETE /subscriptions/:id`.
- `GET /comments?episodeId=&cursor=`, `POST /comments`, `DELETE /comments/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /creator/series`, `POST /creator/series/:id/episodes`: creator authoring.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: panel uploads with scan.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `GET /notifications`, `POST /notifications/read`.

## Realtime, Push, And Offline Behavior

- New-episode push fan-out with quiet hours and per-series mute.
- Offline episode bundles with panel manifests, signed URLs, expiry, and revocation on takedown.
- Reading progress reconciliation across devices with conflict resolution.
- Comment stream for active threads; throttle on spike.
- Push previews omit spoilers by default; opt-in for teaser.
- Uploads resume via chunked signed URLs and must fail closed on scan errors.

## Permissions, Privacy, And Safety

- Camera/photo library for creator uploads; notifications; prompted at use.
- Analytics exclude raw panel content, comment text, and precise location.
- Age gate at signup; mature content requires re-verification.
- Minors have restricted defaults and no access to mature content.
- Content policy blocks sexual-minor content, exploitation, harassment, self-harm facilitation, and hate.
- Copyright/IP takedown workflow required for creator disputes.
- Comment moderation tools for creators, with abuse-throttling and blocklists.
- Creator payout (if any) requires KYC separated from reader accounts.
- Support tooling redacts user content; elevated access for raw inspection.
- Launch owner: product/safety lead, privacy owner, billing owner, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: signup, home opened, episode started/completed, unlock shown, purchase completed, subscribe added, comment posted, report submitted.
- Stable object types and failure codes; never raw content.
- Monetization via original coin economy, optional subscription tier, and ad-supported reading where allowed.
- Paywall clarity: blocked episode, entitlement, restore, platform, support link.
- Time-gated preview counters must be testable.
- Webhook reconciliation for all platforms.

## Edge Cases

- First launch offline, underage user, region-blocked series, panel too large for memory.
- Panel loads partially; stitch fails mid-scroll.
- Episode unpublished while reader has offline bundle.
- Coin refund after unlock; entitlement must revoke gracefully.
- Creator uploads out-of-order panels; uploader must enforce manifest integrity.
- Push delivered after episode deletion.
- Comment section mass-abuse on new episode; throttling kicks in.
- Account deletion during active subscription.

## Test Plan

- Unit tests for reading progress, unlock/entitlement logic, panel manifest integrity, and comment moderation.
- Contract tests for home/daily, series, episode, progress, subscriptions, comments, entitlements.
- Integration tests for signup, read, unlock, subscribe, creator upload.
- Offline tests for bundle expiry, revocation, and reconciliation.
- Safety tests for policy classes, report submission, and support escalation.
- Billing tests for free/paid/refunded/restored, platform reconciliation.
- Accessibility tests for dynamic type, alt text, screen reader, reduced motion, color contrast.
- Manual verification: native screenshots, purchase/restore, push payloads, creator upload.

## Acceptance Criteria

- Exact source links are verified before implementation.
- Downstream team can build V1 without proprietary Webtoon assets.
- Readers can discover, read, comment, subscribe, unlock, and download.
- Creators can create series, upload episodes, and moderate.
- Entitlement, offline, and safety workflows have deterministic contracts.
- Manual verification blockers are resolved or feature-flagged.

## Open Questions

- Which V1 unlock model: coins only, daily-pass-equivalent, ad-unlock, or combination?
- Will V1 support original translation tooling or community translations?
- Is creator payout in V1 or deferred?
- Will V1 support offline bundles globally or selectively by license?
- What is the panel-size ceiling for memory on low-end devices?

## Build Plan

- Phase 1: app shell, auth, daily home, series detail, reader, reading progress.
- Phase 2: subscriptions, comments, notifications.
- Phase 3: coin wallet, entitlements, checkout/restore, webhooks.
- Phase 4: creator uploader, panel pipeline, moderation.
- Phase 5: offline bundles, push, and safety reporting.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs with exact first-party links.
- Draft original genre taxonomy and maturity rubric.
- Stand up downstream implementation repo when Phase 1 is ready.
