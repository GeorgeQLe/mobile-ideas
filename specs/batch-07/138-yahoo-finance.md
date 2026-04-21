# Yahoo Finance-Style Clone Spec

> Metadata
> - Inspiration app: Yahoo Finance
> - Category: Stocks, portfolio tracking, and markets news
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help-center pages observed during source discovery.
> - Manual verification blockers: native capture, subscription purchase/restore, real-time quote upgrades, earnings alerts, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Market data via licensed vendors; news content via licensed feeds or original editorial.

## Overview

Build an original mobile stocks app inspired by Yahoo Finance: portfolio tracking, watchlists with quote detail, linked news and earnings events, and premium analytics behind a subscription. The clone must not copy Yahoo branding, proprietary screeners, article bodies, or private APIs.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Let users track multiple portfolios and watchlists with quote updates.
- Provide quote detail with charts, fundamentals summary, and news.
- Surface earnings calendar and per-symbol earnings alerts.
- Offer subscription tier for advanced analytics.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not imply affiliation with Yahoo.
- Do not copy proprietary screeners, article bodies, or ranked lists.
- Do not present tracked portfolios as brokerage accounts.
- Do not display quotes without delay/real-time labeling.
- Do not claim parity until manual verification completes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/yahoo-finance-stock-market/id328412701 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.finance | Source discovery — pending exact URL verification | Pending |
| Yahoo Finance Help | https://help.yahoo.com/kb/finance-for-mobile | Source discovery — pending exact URL verification | Pending |
| Yahoo Privacy | https://legal.yahoo.com/us/en/yahoo/privacy/ | Source discovery — pending exact URL verification | Pending |
| Yahoo Terms | https://legal.yahoo.com/us/en/yahoo/terms/ | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Multiple portfolios with holdings (symbol, quantity, cost basis).
- Watchlists distinct from portfolios; cross-sync across devices.
- Symbol detail with quote, chart ranges, fundamentals summary, related news, and earnings dates.
- Earnings calendar filtered by watchlist/portfolio.
- Alerts on price thresholds and earnings announcements.
- Subscription gate for advanced analytics (e.g., deeper historicals).
- Delayed vs real-time quote label on every quote surface.

## Core User Journeys

- User signs in, imports or creates a portfolio with cost basis.
- User views portfolio summary with day change and total return.
- User adds/removes symbols from a watchlist.
- User taps a symbol for detail, chart, fundamentals, and news.
- User enables an earnings alert for a symbol.
- User receives price threshold push and taps through to quote detail.
- User starts a trial for advanced analytics.
- User exports a portfolio CSV (privacy center).
- User disables personalized content and trackers.
- User deletes an entire portfolio and confirms.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Intro and sign-in | email/social | new, returning | region block |
| Portfolio List | All portfolios | tap, add | empty, populated | sync conflict |
| Portfolio Detail | Holdings and totals | edit, add | loaded | cost-basis missing |
| Watchlist | Tracked symbols | edit | empty, populated | sync conflict |
| Symbol Detail | Quote, chart, fundamentals | range, tab | loaded | unsupported symbol |
| News Feed | Headlines | scroll | loaded, empty | feed error |
| Article Reader | Full story | scroll | free, gated | extraction fail |
| Earnings Calendar | Upcoming earnings | filter | loaded | empty |
| Alerts | Manage thresholds and earnings | set | idle, active | permission denied |
| Subscription | Plans and restore | select | free, trial, paid | platform mismatch |
| Privacy Center | Export, delete | actions | idle | pending |
| Settings | Account, notifications | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `Portfolio`: owner, name, currency, created-at.
- `Holding`: portfolio, symbol, quantity, cost basis, acquired-at.
- `Watchlist`: owner, ordered symbols.
- `Symbol`: ticker, exchange, asset class.
- `Quote`: symbol, last, change, timestamp, real-time flag.
- `ChartSeries`: symbol, interval, bars.
- `EarningsEvent`: symbol, date, consensus summary.
- `Alert`: user, symbol, rule, delivery, state.
- `Entitlement`: plan, platform, state.
- `AuditEvent`: billing, privacy, portfolio changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /portfolios`, `POST /portfolios`, `PATCH /portfolios/:id`, `DELETE /portfolios/:id`.
- `POST /portfolios/:id/holdings`, `PATCH /holdings/:id`, `DELETE /holdings/:id`.
- `GET /watchlists`, `POST /watchlists`, `PATCH /watchlists/:id`, `DELETE /watchlists/:id`.
- `GET /symbols/:ticker`, `GET /symbols/:ticker/chart?range=`, `GET /symbols/:ticker/news`.
- `GET /earnings?watchlist=&portfolio=&cursor=`.
- `POST /alerts`, `PATCH /alerts/:id`, `DELETE /alerts/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /exports/portfolios`, `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Quote stream where licensed; otherwise polled refresh with visible cadence.
- Cached portfolios, watchlists, and most-recent quote snapshots for offline.
- Push for price thresholds, earnings reminders, and subscription events.
- Server is source of truth for portfolio totals; reconcile after reconnect.
- Chart data lazy-loaded with range-based caching.

## Permissions, Privacy, And Safety

- "Not investment advice" banner on portfolio totals and analyst consensus surfaces.
- Delayed/real-time quote label on every quote screen.
- Market-data licensing and attribution visible in About/Legal.
- Analytics exclude cost basis, portfolio values, and precise symbol lookups.
- Notifications opt-in; granular per symbol and event type.
- No brokerage functionality; explicit "tracked positions, not brokerage" copy.
- Accessibility: dynamic type, VoiceOver, color-independent change indicators.
- Regulatory review for SEC/FINRA-adjacent surfaces; never imply advisor or broker status.
- Launch owner: product/editorial/privacy leads, compliance counsel, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: portfolio created, holding added, watchlist edited, quote viewed, article opened, alert set, subscription state changed.
- Monetization via original subscription for advanced analytics.
- Paywall clarity: feature, state, restore, platform, support.
- Webhook reconciliation across platforms.
- No ads targeting specific tickers or portfolio values.

## Edge Cases

- Market closed/holiday; show last-close indicator.
- Stock split or ticker change; adjust holdings.
- Currency mismatch across holdings; display conversion with disclaimer.
- Alert during outage; replay policy.
- Cost basis missing; prompt without blocking portfolio view.
- Subscription active on web only; reconcile.
- Portfolio CSV export too large; chunk.
- Account deletion with active alerts.

## Test Plan

- Unit tests for portfolio math, alert rules, currency conversion.
- Contract tests for portfolios, holdings, watchlists, quotes, earnings, alerts, subscription.
- Integration tests for add-holding, watchlist-sync, earnings-filter, price-alert.
- Privacy tests for analytics redaction and disclaimer presence.
- Billing tests for trial, paid, refund, restore, cross-platform.
- Offline tests for cached portfolios and last snapshot.
- Accessibility tests for dynamic type and color-independent indicators.
- Compliance tests confirming no advisor or brokerage language.
- Manual verification: native captures, purchase/restore, real-time upgrade, push payloads.

## Acceptance Criteria

- Exact source URLs verified.
- Licensed market data and news in place; delayed/real-time labeled.
- Portfolios, watchlists, alerts, and subscription behave deterministically.
- Accessibility and compliance review complete.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Market-data vendor and regions in V1.
- Real-time upgrade as in-app purchase vs subscription bundle.
- Currency conversion data source.
- Earnings data provider and consensus attribution.

## Build Plan

- Phase 1: scaffold app, auth, watchlists, symbol detail.
- Phase 2: portfolios with holdings and cost basis.
- Phase 3: news feed, earnings calendar, alerts.
- Phase 4: subscription, entitlements, webhooks.
- Phase 5: offline caches, accessibility, compliance review.
- Phase 6: manual verification, regression, rollout.

## Next Steps

- Resolve exact URLs and sign data licenses.
- Draft original editorial and disclaimer copy.
- Stand up downstream implementation repo.
