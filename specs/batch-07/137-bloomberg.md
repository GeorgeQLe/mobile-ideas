# Bloomberg-Style Clone Spec

> Metadata
> - Inspiration app: Bloomberg
> - Category: Finance news and markets
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help/support pages observed during source discovery.
> - Manual verification blockers: native capture, subscription purchase/restore, real-time quote licensing, audio/podcast behavior, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Market data and news content must come from licensed partners or original editorial; no copying of proprietary indices, terminal workflows, or paywalled articles.

## Overview

Build an original mobile finance-news app inspired by Bloomberg: markets dashboard with quotes and indices, watchlists, live and on-demand articles, audio/radio streams, and a paid subscription gating premium analysis. The clone must not copy Bloomberg branding, article text, index names/logos, terminal UX, or private APIs.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Deliver markets dashboard (indices, movers, commodities, FX, rates) with licensed quote data.
- Offer user watchlists with per-symbol detail, charts, and news.
- Publish news articles and video/audio streams from original or licensed editorial.
- Support subscription tier gating premium content, with restore-purchase flows.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Bloomberg-branded app or imply affiliation.
- Do not copy article text, proprietary index methodology, terminal UX, or paywalled datasets.
- Do not present quotes as investment advice or personalized recommendations.
- Do not ship without visible market-data licensing and disclaimers.
- Do not claim parity until manual verification completes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/bloomberg-business-news/id281941097 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.bloomberg.android.plus | Source discovery — pending exact URL verification | Pending |
| Bloomberg Help | https://www.bloomberg.com/company/support/ | Source discovery — pending exact URL verification | Pending |
| Bloomberg Privacy | https://www.bloomberg.com/notices/privacy/ | Source discovery — pending exact URL verification | Pending |
| Bloomberg Terms | https://www.bloomberg.com/notices/tos/ | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Markets dashboard with major indices, sectors, commodities, FX, and rates.
- Per-symbol detail with quote, price history chart, fundamentals summary, and related news.
- Editable watchlists synchronized across devices.
- Article reader with live headlines, opinion, and long-form pieces; subscription gate for premium.
- Audio tab with live radio, podcasts, and on-demand segments.
- Push alerts for market-moving headlines and watchlist symbols.
- Disclaimers and data attributions on every quote screen.

## Core User Journeys

- User opens app, lands on markets dashboard, and reviews indices movement.
- User taps a symbol to view detail, chart, and linked news.
- User adds symbols to a watchlist and reorders entries.
- User reads a free article, hits a subscription gate on a premium piece, and starts trial.
- User starts live radio while browsing; playback continues in background.
- User receives a breaking-news push and opens the article.
- User edits alert thresholds for a watchlist symbol.
- User manages subscription (restore, cancel path to account page).
- User shares an article via the system share sheet.
- User disables analytics and personalized suggestions in privacy controls.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Intro and sign-in | email/social, continue | new, returning | region block |
| Markets Dashboard | Indices, movers | scroll, tap | loaded, stale, offline | data feed outage |
| Symbol Detail | Quote and chart | range selector, tap | loaded | unsupported symbol |
| Watchlist | Tracked symbols | edit, reorder | empty, populated | sync conflict |
| News Feed | Headlines and topics | scroll, filter | loaded, empty | feed error |
| Article Reader | Full story | scroll, share | free, gated | extraction fail |
| Audio Player | Live radio and podcasts | play, seek | playing, buffering | stream fail |
| Alerts | Per-symbol thresholds | set, delete | idle, active | permission denied |
| Subscription | Plans, restore | select, manage | free, trial, paid | platform mismatch |
| Settings | Account, privacy, notifications | toggles | loaded, signed-out | managed |
| Privacy Center | Export, delete, analytics opt-out | actions | idle | pending |
| Search | Symbols and articles | query | empty, results | throttled |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `Symbol`: ticker, exchange, asset class, display name.
- `Quote`: symbol, bid/ask/last, change, timestamp, venue.
- `ChartSeries`: symbol, interval, bars.
- `Watchlist`: owner, ordered symbols, last-synced.
- `Article`: id, headline, body, tags, gated flag, published-at.
- `AudioStream`: id, type (live|episode), duration, asset refs.
- `Alert`: user, symbol, rule, delivery, state.
- `Entitlement`: plan, platform, state.
- `NotificationPref`: topic, enabled.
- `AuditEvent`: billing, privacy, alert changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /markets/overview`, `GET /markets/movers`.
- `GET /symbols/:ticker`, `GET /symbols/:ticker/chart?range=`.
- `GET /watchlists`, `POST /watchlists`, `PATCH /watchlists/:id`, `DELETE /watchlists/:id`.
- `GET /news?topic=&cursor=`, `GET /articles/:id`.
- `GET /audio/live`, `GET /audio/episodes`.
- `POST /alerts`, `PATCH /alerts/:id`, `DELETE /alerts/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /notifications`, `POST /notifications/read`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Quote updates via server-sent events where licensing permits; fall back to polled refresh.
- Watchlists, last-read articles, and cached dashboards available offline.
- Audio player supports background playback, lock-screen controls, and route changes.
- Push for breaking-news, watchlist alerts, and subscription events.
- Charts reconcile ticks after reconnect with out-of-order protection.

## Permissions, Privacy, And Safety

- No investment-advice disclaimers visible on quote, chart, and alert surfaces.
- Market-data licensing terms surfaced in About/Legal; delayed-quote labels where applicable.
- "Not a recommendation" framing on curated watchlists and editor's picks.
- Analytics exclude article body, specific symbol lookups, and precise location.
- Notifications opt-in; granular per topic and symbol.
- Microphone, camera, and location not required; requested only if related feature added.
- Accessibility: dynamic type, VoiceOver, high-contrast, color-independent change indicators.
- Regulatory review for SEC/FINRA-adjacent surfaces; never imply advisor or broker status.
- Launch owner: product/editorial/privacy leads, compliance counsel, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: dashboard viewed, symbol opened, watchlist edited, article opened, audio started, alert set, subscription state changed.
- Monetization via original subscription tier; original paywall copy.
- Paywall clarity: feature, state, restore, platform, support.
- Webhook reconciliation for purchase, renewal, refund, cancellation.
- No personalized ads targeting financial behaviors.

## Edge Cases

- Market closed/holiday state; show last-close indicator.
- Delayed vs. real-time quotes by symbol/exchange.
- Subscription active on web but opened on mobile; reconcile via login.
- Alert threshold crosses during push outage.
- Symbol delisted or renamed; watchlist fallback.
- Region-restricted content; graceful block.
- Audio stream interrupted by call; resume.
- Stale cache after long offline gap.

## Test Plan

- Unit tests for quote normalization, alert rule evaluation, watchlist sync.
- Contract tests for markets, symbols, watchlists, news, audio, alerts, subscription.
- Integration tests for dashboard-detail-watchlist, article-gate, audio-background.
- Privacy tests for analytics redaction and disclaimers.
- Billing tests for trial, paid, refund, restore, cross-platform.
- Offline tests for cached dashboards and watchlists.
- Accessibility tests for dynamic type and color-independent change indicators.
- Compliance tests for disclaimer presence on every quote/alert screen.
- Manual verification: native captures, purchase/restore, live audio, push payloads.

## Acceptance Criteria

- Exact source URLs verified before implementation.
- Licensed market data and editorial in place with disclaimers.
- Watchlists, alerts, audio, and subscriptions behave deterministically.
- Accessibility and regulatory review complete.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Market-data vendor and regions covered in V1.
- Which audio content (live radio, podcasts) licensed for V1.
- Which paywall bundles in V1.
- Alert delivery SLA and throttling rules.

## Build Plan

- Phase 1: scaffold app, auth, markets dashboard, symbol detail.
- Phase 2: watchlists, alerts, news feed, article reader.
- Phase 3: audio player (live + episodes), background playback.
- Phase 4: subscription, entitlements, webhooks.
- Phase 5: offline caches, accessibility, compliance review.
- Phase 6: manual verification, regression, rollout.

## Next Steps

- Resolve exact URLs and sign market-data licenses.
- Draft original editorial sourcing policy.
- Stand up downstream implementation repo.
