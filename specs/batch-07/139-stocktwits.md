# Stocktwits-Style Clone Spec

> Metadata
> - Inspiration app: Stocktwits
> - Category: Investing social network
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help-center pages observed during source discovery.
> - Manual verification blockers: native capture, subscription purchase/restore, creator-room entitlement behavior, sentiment aggregation, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Market data via licensed vendors; user-generated posts require moderation and market-abuse policies.

## Overview

Build an original mobile investing-social app inspired by Stocktwits: cashtag-driven feed where users post short messages about symbols, tag sentiment (bullish/bearish), follow watchlists, and enter creator rooms. The clone must not copy Stocktwits branding, sentiment scores, or private APIs.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Host public posts tagged with cashtags and sentiment labels.
- Compute and display per-symbol sentiment aggregates.
- Offer user watchlists with per-symbol streams.
- Support creator rooms with gated subscription access.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not imply affiliation with Stocktwits.
- Do not copy sentiment methodology or leaderboards without original definitions.
- Do not allow solicitation, pump-and-dump schemes, or coordinated manipulation.
- Do not present aggregate sentiment as investment advice.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/stocktwits-stock-market-chat/id383889652 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.stocktwits.StockTwits | Source discovery — pending exact URL verification | Pending |
| Stocktwits Help | https://help.stocktwits.com | Source discovery — pending exact URL verification | Pending |
| Stocktwits Privacy | https://stocktwits.com/privacy | Source discovery — pending exact URL verification | Pending |
| Stocktwits Terms | https://stocktwits.com/terms | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Post composer with cashtag autocomplete, sentiment toggle, image/chart attachment.
- Feeds: home (followed users), symbol streams, trending.
- Per-symbol sentiment aggregates with methodology link.
- Watchlists with streams and alerts.
- Creator rooms: subscription-gated rooms with dedicated streams.
- Market-abuse policy: detection, reporting, moderation, and appeals.

## Core User Journeys

- User signs up, confirms age/eligibility, follows initial cashtags.
- User posts with cashtag and sentiment label; post appears in relevant streams.
- User views symbol stream with sentiment aggregate.
- User follows a creator and joins a paid room.
- User reports a post for manipulation or harassment.
- User edits watchlist and receives push when thresholds hit.
- User appeals a moderation decision.
- User manages subscription (restore, cancel).
- User deletes their own posts and account.
- Moderator reviews flagged content.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Intro, age gate | email/social, age | new, returning | underage |
| Home Feed | Followed posts | scroll, tap | empty, loaded | feed failure |
| Symbol Stream | Posts by cashtag | scroll | loaded, sentiment | no data |
| Composer | New post | text, tag, sentiment | idle, posting | rate-limited |
| Post Detail | Thread | scroll, reply | loaded | deleted |
| Watchlist | Tracked symbols | edit | empty, populated | sync conflict |
| Creator Room | Gated stream | enter, post | member, non-member | gate denied |
| Profile | User posts | follow | loaded | suspended |
| Reports | File/review reports | reason | submitted, in review | abuse |
| Subscription | Plans, restore | select | free, paid | platform mismatch |
| Privacy Center | Export, delete | actions | idle | pending |
| Settings | Account, notifications | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, handle, locale, consent, moderation state.
- `Post`: author, body, cashtags, sentiment, attachments, room id, created-at.
- `Symbol`: ticker, exchange, display name.
- `SentimentAggregate`: symbol, window, bullish/bearish counts, methodology version.
- `Follow`: follower, followed user/cashtag/room.
- `Watchlist`: owner, ordered symbols.
- `Room`: id, creator, subscription requirement.
- `Report`: reporter, target post/user, reason, state.
- `ModerationAction`: target, moderator, decision, reason.
- `Entitlement`: room or app-level, plan, state.
- `AuditEvent`: billing, privacy, moderation changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /feed/home`, `GET /symbols/:ticker/stream`.
- `POST /posts`, `GET /posts/:id`, `POST /posts/:id/reply`, `DELETE /posts/:id`.
- `GET /symbols/:ticker/sentiment`, `GET /methodology/sentiment`.
- `GET /watchlists`, `POST /watchlists`, `PATCH /watchlists/:id`, `DELETE /watchlists/:id`.
- `POST /follows`, `DELETE /follows/:id`.
- `GET /rooms/:id`, `GET /rooms/:id/stream`, `POST /rooms/:id/join`.
- `POST /reports`, `GET /reports/:id`, `POST /reports/:id/appeal`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Streams (home, symbol, room) via websocket or SSE with backfill on reconnect.
- Cached home feed and watchlists for offline browsing.
- Push for replies, mentions, watchlist alerts, and room events.
- Post delivery is at-least-once; client deduplicates.
- Sentiment aggregates computed server-side; methodology versioned.

## Permissions, Privacy, And Safety

- "Not investment advice" banner on posts, sentiment aggregates, and creator rooms.
- Market-abuse policy: explicit ban on pump-and-dump, insider information, and coordinated manipulation.
- Insider-trading policy: prohibition of posts based on material non-public information with moderation hooks.
- Authenticity marks (verified source labels) for official issuer or regulator accounts; clearly distinguished.
- Analytics exclude post bodies and private identifiers.
- Notifications opt-in; granular per event.
- Rate limiting to deter spam/manipulation; bot-detection signals collected lawfully.
- Accessibility: dynamic type, VoiceOver, color-independent sentiment indicators (labels plus patterns).
- Regulatory review for SEC/FINRA-adjacent surfaces; never imply advisor or broker status.
- Launch owner: product/trust-and-safety/privacy/compliance leads, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: post created, stream viewed, room joined, report submitted, subscription state changed.
- Monetization via creator-room subscriptions and optional app-wide subscription; original paywall copy.
- Paywall clarity: feature, state, restore, platform, support.
- Webhook reconciliation; room access reconciled via entitlement.
- No ads targeting individual post content.

## Edge Cases

- Post with invalid or delisted cashtag; flag gracefully.
- Creator-room refund mid-cycle; entitlement revocation.
- Sentiment aggregate skewed by bot activity; moderation review.
- Report floods on a single account; rate-limit review queue.
- Region-restricted content; geofenced stream.
- Stream outage; show last snapshot and retry.
- Account deletion with active room subscription.
- Manipulation campaign detected; throttle or quarantine posts.

## Test Plan

- Unit tests for sentiment aggregation, cashtag parsing, rate limits.
- Contract tests for posts, streams, rooms, reports, subscription.
- Integration tests for compose-post-stream, room-join-stream, report-appeal.
- Privacy tests for analytics redaction.
- Billing tests for room and app subscriptions.
- Offline tests for cached feeds and watchlists.
- Accessibility tests for sentiment indicators without color dependence.
- Compliance tests for disclaimer and policy visibility.
- Manual verification: native captures, purchase/restore, room gating, push payloads.

## Acceptance Criteria

- Exact source URLs verified.
- Market-abuse policy in force with active moderation.
- Sentiment methodology documented and linked.
- Accessibility and compliance review complete.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Age gate: 13+ or 18+ for V1.
- Moderation staffing model.
- Creator-room payout economics.
- Bot-detection vendor or in-house.

## Build Plan

- Phase 1: scaffold app, auth, home feed, composer, symbol stream.
- Phase 2: watchlists, sentiment aggregates, follows.
- Phase 3: creator rooms, reports, moderation.
- Phase 4: subscription, entitlements, webhooks.
- Phase 5: offline caches, accessibility, compliance review.
- Phase 6: manual verification, regression, rollout.

## Next Steps

- Resolve exact URLs.
- Finalize market-abuse and moderation policies.
- Stand up downstream implementation repo.
