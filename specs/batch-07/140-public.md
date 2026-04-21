# Public-Style Clone Spec

> Metadata
> - Inspiration app: Public
> - Category: Commission-free brokerage with social investing feed
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help-center pages observed during source discovery.
> - Manual verification blockers: native capture, brokerage onboarding/KYC, funding/withdrawal flows, trade execution, and push payloads require a regulated sandbox and test account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Brokerage functions must be provided by a licensed partner (clearing broker); market data via licensed vendors; user-generated content moderated under market-abuse rules.

## Overview

Build an original mobile brokerage app inspired by Public: account opening with KYC, commission-free equities trading via a licensed clearing partner, themed watchlists, analyst insights, and a social feed around positions. The clone must not copy Public branding, order-routing logic, or proprietary content.

This spec is implementation-ready for a V1. Brokerage-related flows are blocked until a licensed partner and regulated sandbox are in place.

## Goals

- Open a brokerage account with KYC via licensed partner.
- Place and manage equities orders (market, limit) through clearing broker.
- Provide watchlists, themes, and analyst-style insights.
- Host a social feed where users can share positions with privacy controls.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not operate brokerage directly without a licensed partner.
- Do not copy Public branding, proprietary themes, or private APIs.
- Do not provide personalized investment advice.
- Do not allow sharing non-public information or coordinated manipulation.
- Do not claim parity until manual verification in regulated sandbox.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/public-investing-social/id1404187308 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.public.publicapp | Source discovery — pending exact URL verification | Pending |
| Public Help | https://help.public.com | Source discovery — pending exact URL verification | Pending |
| Public Privacy | https://public.com/disclosures/privacy-policy | Source discovery — pending exact URL verification | Pending |
| Public Terms | https://public.com/disclosures/terms-of-service | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding with KYC, identity verification, and agreement e-signing via partner.
- Funding through ACH or partner-supported methods.
- Equities trading with market and limit orders during market hours.
- Portfolio view with positions, cash balance, and day change.
- Watchlists and themed lists.
- Social feed where users opt in to share positions or commentary.
- Analyst-style insights clearly labeled as opinion, not advice.

## Core User Journeys

- Prospect creates account, completes KYC, and signs disclosures.
- User funds account and waits for settlement.
- User searches a symbol, places a market order, and reviews confirmation.
- User places a limit order and monitors status.
- User reviews portfolio with cost basis and day change.
- User follows another investor; shares a post about a position.
- User reports market-abuse or harassment on the feed.
- User requests tax documents and data export.
- User closes an account with balance checks.
- User manages subscription for advanced features.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Open account | PII, docs | new, pending, approved | rejected |
| Funding | Transfer funds | bank link, amount | pending, settled | funding failure |
| Home | Portfolio and feed | scroll | loaded | market closed |
| Symbol Detail | Quote and trade entry | buy/sell, size | loaded | halted |
| Order Ticket | Confirm order | confirm | idle, submitted | rejection |
| Order History | Prior orders | scroll | loaded | none |
| Watchlists/Themes | Tracked lists | edit | empty, populated | sync conflict |
| Social Feed | Posts from follows | scroll | loaded | feed failure |
| Profile | User posts, positions opt-in | follow | loaded | private |
| Reports | File/review reports | reason | submitted, in review | abuse |
| Subscription | Plans, restore | select | free, paid | platform mismatch |
| Settings | Account, privacy, tax | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, KYC state, locale, consent.
- `BrokerageAccount`: partner account id, status, agreements.
- `FundingSource`: bank link, state.
- `Cash`: balance, pending.
- `Position`: symbol, quantity, cost basis, acquired-at.
- `Order`: symbol, side, type, qty, price, state, placed-at, filled-at.
- `Symbol`: ticker, exchange, asset class.
- `Quote`: symbol, last, change, timestamp, real-time flag.
- `Post`: author, body, attachments, linked position (opt-in), created-at.
- `Follow`: follower, followed.
- `Report`: reporter, target, reason, state.
- `Entitlement`: plan, platform, state.
- `TaxDocument`: year, type, storage ref.
- `AuditEvent`: regulated actions append-only.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /kyc/start`, `POST /kyc/documents`, `GET /kyc/status`.
- `POST /funding/sources`, `POST /funding/transfers`, `GET /funding/transfers/:id`.
- `GET /portfolio`, `GET /positions`, `GET /orders`.
- `POST /orders`, `PATCH /orders/:id`, `DELETE /orders/:id` (cancel).
- `GET /symbols/:ticker`, `GET /symbols/:ticker/chart?range=`.
- `GET /watchlists`, `POST /watchlists`, `PATCH /watchlists/:id`, `DELETE /watchlists/:id`.
- `POST /posts`, `GET /feed/home`, `POST /follows`, `DELETE /follows/:id`.
- `POST /reports`, `GET /reports/:id`, `POST /reports/:id/appeal`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /tax/documents`, `POST /data-export`, `POST /account/close`.

## Realtime, Push, And Offline Behavior

- Order status updates via websocket; cached last-known states for brief offline.
- Quote stream where licensed; otherwise polled refresh with visible cadence.
- Push for order fills, cancellations, transfer events, mentions/replies.
- Offline mode is read-only for positions; trading disabled when disconnected.
- Critical lifecycle events always confirmed by server round-trip before UI state changes.

## Permissions, Privacy, And Safety

- KYC/PII stored under strict retention and access controls; encryption at rest and in transit.
- No investment-advice disclaimers on quotes, watchlists, analyst insights, and social posts.
- Insider-trading and market-abuse policy: ban on MNPI-based posts and coordinated manipulation; moderation and appeals.
- Authenticity marks for verified issuer, regulator, or partner accounts.
- Position-sharing is strictly opt-in; defaults private.
- Analytics exclude PII, account balances, and trade details.
- Biometric re-authentication required for trades above threshold.
- Accessibility: dynamic type, VoiceOver, color-independent change indicators.
- Regulatory review: SEC/FINRA-adjacent; never imply advisor status. Clearing broker relationship disclosed.
- Launch owner: product/compliance/privacy/trust-and-safety leads, accessibility owner, legal counsel.

## Analytics And Monetization

- Privacy-safe events: onboarding step completed, funding initiated, order submitted (no qty/price), post created, report submitted, subscription state changed.
- Monetization via optional subscription for advanced analytics; original paywall copy.
- No payment for order flow UX dark patterns; disclose order routing economics.
- Paywall clarity: feature, state, restore, platform, support.
- Webhook reconciliation across platforms.

## Edge Cases

- Market closed/halted symbol; block trade with message.
- Funding reversal or failure; notify and adjust buying power.
- KYC rejected or manual review pending; gate trading.
- Post links a position that was sold; indicate historical.
- Rapid repeat orders; client and server deduplication.
- Regulatory notice requires restricting a symbol; blocklist.
- Account deletion with open orders or positions.
- Tax document unavailable; deferred notice.

## Test Plan

- Unit tests for order state machine, buying-power math, cost-basis, deduplication keys.
- Contract tests for KYC, funding, orders, portfolio, feed, reports, subscription.
- Integration tests for onboarding-funding-trade, order-cancel, feed-post-report.
- Privacy tests for PII handling, analytics redaction, biometric gates.
- Billing tests for trial, paid, refund, restore, cross-platform.
- Offline tests for read-only portfolio and disabled trading.
- Accessibility tests for dynamic type and color-independent indicators.
- Compliance tests: disclosures presence, blocklist enforcement, MNPI moderation.
- Manual verification: regulated sandbox end-to-end, KYC docs, tax documents, push payloads.

## Acceptance Criteria

- Exact source URLs verified.
- Licensed clearing partner and market-data vendor in place.
- KYC, funding, trading, and social flows behave deterministically in sandbox.
- Accessibility and compliance review complete.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which clearing broker partner.
- Which asset classes in V1 (equities only vs equities + ETFs + fractional).
- Subscription feature bundle.
- State-by-state regulatory coverage.

## Build Plan

- Phase 1: scaffold app, auth, KYC, funding pipes (sandbox).
- Phase 2: symbol detail, watchlists, quote stream, order entry.
- Phase 3: portfolio, order history, tax documents.
- Phase 4: social feed, follows, reports, moderation.
- Phase 5: subscription, entitlements, webhooks.
- Phase 6: accessibility, compliance review, manual sandbox verification.

## Next Steps

- Resolve exact URLs and sign partner agreements.
- Complete compliance policy drafting.
- Stand up downstream implementation repo behind a regulated sandbox.
