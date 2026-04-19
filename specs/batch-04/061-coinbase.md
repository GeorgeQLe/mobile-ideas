# Coinbase-Style Clone Spec

> Metadata
> - Inspiration app: Coinbase
> - Category: Crypto exchange, wallet, portfolio, payments, staking/rewards, subscription, tax records, and regulated account support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-18.
> - Verification basis: exact public marketplace pages, Coinbase public product pages, Coinbase Help Center, Coinbase legal/privacy/disclosure pages, and public security/support guidance.
> - Manual verification blockers: native iOS/Android screens, signup/login, email/phone verification, identity/KYC, region/state eligibility, linked bank/card setup, cash funding and cash out, buy/sell/convert, Advanced Trade, staking/rewards, Coinbase One subscription, card/payment features, crypto send/receive, address book, tax documents, statements, account recovery, account closure, support chat, push payloads, fraud/scam review, and all production crypto or fiat rails require lawful test accounts/devices, provider approval, and compliance review before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, branding, copy, icons, account identifiers, sample data, custody/trading providers, risk controls, fee schedules, support scripts, disclosures, and regulated-finance controls.

## Overview

Build an original mobile crypto product inspired by Coinbase's public workflow: secure account onboarding, identity verification, portfolio home, asset discovery, watchlists, buy/sell/convert, transfer send/receive, fiat funding/cash out, staking or rewards-style earning, Coinbase One-like subscription benefits, card/payment-adjacent surfaces where approved, alerts, tax documents, statements, support, privacy, and security settings.

The clone must not copy Coinbase branding, screenshots, marketing copy, protected UI artwork, private APIs, exchange routing, custody arrangements, fee tables, listing decisions, risk models, legal disclosure text, or support scripts. Functional parity must use original language, synthetic assets, licensed market data, approved crypto/fiat providers, independently designed risk controls, and jurisdiction-aware compliance gates.

This spec is implementation-ready for a public-source V1. Any regulated, account-specific, device-specific, notification, support, deletion/export, or money/crypto movement behavior remains manually blocked until lawfully verified.

## Goals

- Provide a mobile-first crypto account with secure onboarding, portfolio, assets, watchlists, buy/sell/convert, send/receive, funding, activity, alerts, settings, support, and privacy controls.
- Model crypto-category trust expectations around custody, irreversible transfers, scams, identity verification, sanctions, travel-rule or address-screening obligations, statements, tax records, support escalation, and account restrictions.
- Represent trading, custody, staking/rewards, subscriptions, cards/payments, tax documents, and advanced trading as provider-backed modules with eligibility, disclosure, and feature-flag gates.
- Produce concrete screens, entities, API contracts, offline/realtime rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Coinbase-branded app or imply affiliation with Coinbase, Coinbase Advanced, Coinbase One, Coinbase Card, asset issuers, blockchain networks, banking partners, custody providers, regulators, or support teams.
- Do not process production fiat funding, card payments, crypto trades, crypto withdrawals, staking, tax reporting, disputes, sanctions review, identity decisions, or account restrictions without separate legal, compliance, provider, and security approval.
- Do not scrape Coinbase, reuse private APIs, replay network traffic, copy asset-ranking systems, copy fee schedules, copy disclosure text, copy support scripts, or bypass app-store rules.
- Do not treat crypto custody, fiat rails, staking, tax documents, sanctions, fraud/scam detection, account recovery, or account closure as generic app behavior.
- Do not claim exact native-device, regional, account, notification, support, trading, custody, tax, data-rights, or regulated-flow parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/coinbase-buy-bitcoin-ether/id886427730 | Official iOS listing, developer, Finance category, crypto portfolio/trade positioning, privacy labels, age rating, app capabilities, and release context | Verified 2026-04-18 |
| Google Play | https://play.google.com/store/apps/details?id=com.coinbase.android | Official Android listing, package id, data-safety orientation, crypto buy/sell/store/send positioning, update context, and support/developer links | Verified 2026-04-18 |
| Coinbase Home | https://www.coinbase.com/ | Public product positioning for buying, selling, storing, spending, earning, and managing crypto | Verified 2026-04-18 |
| Coinbase Help Center | https://help.coinbase.com/en/coinbase | First-party help taxonomy for account setup, identity, trading/funding, sending/receiving crypto, taxes, security, and support | Verified 2026-04-18 |
| Coinbase One | https://www.coinbase.com/one | Subscription benefits, fee/benefit framing, boosted rewards-style positioning, support benefits, and membership lifecycle requirements | Verified 2026-04-18 |
| Coinbase Staking | https://www.coinbase.com/earn/staking | Public staking/rewards orientation, eligibility-sensitive earning, asset support, and disclosure needs | Verified 2026-04-18 |
| Coinbase Tax Center | https://www.coinbase.com/tax-center | Public tax-document and transaction-reporting orientation for crypto activity | Verified 2026-04-18 |
| User Agreement | https://www.coinbase.com/legal/user_agreement/united_states | Account eligibility, transactions, fiat/crypto services, transfers, fees, restrictions, disputes, taxes, arbitration, and legal responsibilities | Verified 2026-04-18 |
| Privacy Policy | https://www.coinbase.com/legal/privacy | Personal data categories, identity/financial/device data, sharing, retention, security, choices, and privacy rights | Verified 2026-04-18 |
| Security | https://www.coinbase.com/security | Public account-security, storage, and trust posture used for security requirements | Verified 2026-04-18 |
| Legal And Disclosures | https://www.coinbase.com/legal | Disclosure library for Coinbase services, risks, terms, privacy, and product-specific legal references | Verified 2026-04-18 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support adult onboarding, email/phone authentication, identity/KYC state, legal consent, region/state eligibility, account restrictions, secure session controls, and signed-out, pending, verified, restricted, suspended, and closed states.
- Portfolio home must show total balance, asset balances, cash balance, watchlist, price movement, market status, pending orders/transfers, reward/staking tiles, subscription state, alerts, support notices, and freshness timestamps.
- Asset detail must show licensed or synthetic price/chart data, tradability, custody/send/receive eligibility, available balance, watchlist toggle, education, risk disclosures, and buy/sell/convert/send/receive actions where enabled.
- Buy, sell, and convert must use server-owned quote preview, fee/spread disclosure, quote expiry, funding source, order limits, risk checks, confirmation, receipt, activity entry, and idempotency key.
- Send and receive must support network selection, address validation, QR/address copy, address book, destination warnings, irreversible-transfer warnings, travel-rule or compliance hold states, transaction hash, and support handoff.
- Fiat funding and cash out must support linked bank/card provider state, deposit/withdrawal preview, arrival estimates, limits, failed/returned transfers, holds, and settlement status.
- Staking/rewards must stay eligibility-gated by asset, region, account status, lockup/unbonding rules, APY snapshot, reward accrual, provider status, tax caveats, and opt-in/opt-out confirmations.
- Coinbase One-like membership must model trial, active, grace, canceled, expired, billing failure, benefit availability, support benefit, fee-waiver limits, and legal-reviewed benefit copy.
- Advanced trade, derivatives, card/payment, and institutional surfaces must be excluded from V1 or shipped behind provider/compliance/manual verification gates.
- Tax, statements, account closure, data export, security, and support flows must remain visible from settings and activity detail.

### Build Plan

1. Foundation: account, identity, session, consent, privacy settings, feature flags, legal links, provider adapters, audit logs, and synthetic asset fixtures.
2. Portfolio core: home, asset list, watchlist, asset detail, activity, alerts, local cache, notification center, settings, and support entrypoints.
3. Transaction path: quote preview, buy/sell/convert, fiat funding/cash out, send/receive, receipts, provider state, quote expiry, limits, and idempotent submission.
4. Regulated modules: staking/rewards, membership, advanced trade, card/payment, tax documents, and account closure only behind eligibility, disclosure, legal, provider, and manual verification gates.
5. Trust hardening: scam warnings, address validation, account restrictions, disclosure acknowledgements, support evidence redaction, data export, deletion blockers, and privacy-safe analytics.
6. Native verification: confirm iOS/Android screens, permissions, push payloads, support paths, account recovery, and regional/provider differences with lawful test accounts.

## Core User Journeys

- New user signs up, verifies email/phone, completes identity steps, accepts legal terms, lands on a zero-portfolio home, and sees funding education.
- Returning user unlocks the app, reviews portfolio freshness, opens Bitcoin detail, previews a buy quote, confirms before expiry, and receives a receipt/activity entry.
- User converts one asset into another, sees quote/fee/spread disclosure, handles quote expiry, and confirms server state after reconnect.
- User receives crypto by copying a network-specific address or QR code, then sees pending and confirmed transaction states.
- User sends crypto to a new address, reviews irreversible-transfer and scam warnings, handles address validation failure, and tracks on-chain/provider status.
- User links a bank, deposits fiat, withdraws to a bank, and handles ACH return, fraud review, or unavailable instant cash out.
- User enables a reward/staking feature, accepts eligibility/risk disclosures, sees pending/unbonding/reward states, and exports tax records.
- User starts and cancels a membership, sees benefit availability change, billing failure recovery, and support escalation.
- Security-conscious user reviews sessions, enables stronger authentication, reports a scam, downloads statements/tax records, requests data export, and attempts account closure.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Signup, login, consent, region and age gates | email, phone, password/passkey, OTP | new, returning, pending, verified | underage, unsupported region, locked, closed |
| Identity Verification | KYC steps and review status | legal name, DOB, address, ID, selfie | required, submitted, approved | rejected, expired document, manual review |
| Portfolio Home | Balances, market overview, assets, alerts | asset tap, trade, send, receive | zero, loaded, stale, restricted | price outage, account hold, provider degraded |
| Asset Detail | Chart, balance, education, actions | asset, watch, buy, sell, convert | tradable, custody-only, watch-only | delisted, network paused, disclosure missing |
| Trade Ticket | Buy, sell, convert quote and receipt | side, asset, amount, source | draft, quoted, submitted, settled | quote expired, limit, fee changed, rejected |
| Send Crypto | External transfer workflow | network, address, amount, memo | draft, preview, pending, confirmed | bad address, travel-rule hold, irreversible error |
| Receive Crypto | Deposit address and status | network, QR, copy | address ready, pending deposit | network paused, minimum unmet, stale address |
| Funding And Cash Out | Fiat instruments and transfers | bank, card, amount, speed | linked, pending, settled | ACH return, name mismatch, provider outage |
| Staking/Rewards | Eligibility, opt-in, reward history | asset, consent, opt-out | eligible, earning, unbonding | region blocked, slashing/lockup disclosure |
| Membership | Coinbase One-like benefits and billing | trial, subscribe, cancel | trial, active, canceled, expired | billing fail, benefit unavailable |
| Taxes/Statements | Reports and exports | year, download, share | available, preparing, downloaded | missing tax form, retention hold |
| Support/Security/Privacy | Help, scam report, sessions, export, deletion | case, session, export, delete | open, secured, pending export | active balance, legal hold, support escalation |

## Data Model

- `User`: identity status, region, age gate, consent, account restrictions, privacy choices, tax profile, and closure lifecycle.
- `DeviceSession`: device id, platform, auth method, push token, session expiry, suspicious-login markers, and revocation state.
- `PortfolioAccount`: cash balance, asset balances, pending funds, holds, restrictions, provider state, and freshness timestamp.
- `CryptoAsset`: symbol, network support, tradability, custody eligibility, quote/chart source, disclosures, and availability flags.
- `Quote`: side, asset pair, source/destination, amount, fee, spread, expiry, limits, and disclosure acknowledgement.
- `Order`: quote snapshot, idempotency key, lifecycle, provider correlation id, receipt, tax lot metadata, and audit ids.
- `CryptoTransfer`: asset, network, address, memo/tag, amount, fee, risk flags, hash, confirmations, hold state, and support route.
- `FundingInstrument`: bank/card/provider token, verification state, owner match, limits, transfer eligibility, and removal constraints.
- `RewardPosition`: asset, eligibility, principal, reward rate snapshot, accruals, lock/unbonding state, tax treatment, and opt-out state.
- `Membership`: plan, trial, billing source, benefits, renewal, cancellation, billing failure, and support benefit.
- `TaxStatement`: year, source transactions, generated files, availability, corrections, and retention rules.
- `SupportCase`: issue type, linked transaction/account, evidence, owner queue, SLA, decision, appeal, and fraud/scam flag.
- `AuditEvent`: append-only record for auth, KYC, quote, trade, transfer, funding, reward, membership, support, privacy, and disclosure actions.
- `LocalCacheRecord`: cached home, assets, watchlist, receipts, settings, drafts, sync attempts, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` manage secure account access, device risk, and recovery.
- `GET /profile`, `PATCH /profile`, `GET /eligibility`, and `POST /identity/checks` return region, identity, restriction, feature-flag, and manual-verification gates.
- `GET /portfolio`, `GET /assets`, `GET /assets/:id`, `GET /activity?cursor=`, and `GET /activity/:id` return balances, stale timestamps, authorization state, and support actions.
- `POST /quotes`, `POST /orders`, `GET /orders/:id`, and `POST /orders/:id/cancel` handle buy/sell/convert preview, disclosure acknowledgement, idempotent submit, status, and cancellation where allowed.
- `POST /transfers/preview`, `POST /transfers`, `GET /transfers/:id`, and `POST /transfers/:id/report` handle crypto send/receive state, address validation, network fees, provider status, and support handoff.
- `GET /funding-instruments`, `POST /funding-instruments`, `POST /fiat-transfers/preview`, and `POST /fiat-transfers` handle bank/card links, deposits, cash out, returns, and limits.
- `GET /rewards`, `POST /rewards/:asset/enable`, `POST /rewards/:asset/disable`, and `GET /rewards/history` model eligibility, rate snapshots, rewards, unbonding, and tax caveats.
- `GET /membership`, `POST /membership/checkout`, and `POST /membership/cancel` model trial, billing, benefits, cancellation, and webhook-backed entitlement updates.
- `GET /tax-documents`, `GET /statements`, `POST /data-export`, `GET /privacy/settings`, `PATCH /privacy/settings`, and `DELETE /account` expose data rights and closure blockers.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, and `POST /support/cases/:id/appeal` handle support, fraud/scam reports, and evidence-safe workflows.

## Realtime, Push, And Offline Behavior

- Portfolio, quotes, orders, transfers, funding, rewards, membership, support, tax-document, privacy, and security states must reconcile from server-owned events.
- The client may cache home, asset details, watchlist, receipts, legal links, settings, support cases, and low-risk drafts with visible stale timestamps.
- Offline mode may preserve quote/trade drafts and support messages but must block buy/sell/convert, fiat transfers, crypto transfers, staking/reward changes, membership changes, and account deletion.
- Quotes, fees, spreads, transfer fees, reward rates, limits, market prices, address risk results, and provider statuses must expire before confirmation.
- Push notifications must be opt-in and category-controlled for security, order status, transfer status, price alerts, reward status, support, tax/export readiness, and marketing.
- Push payloads must avoid raw balances, full addresses, precise trade amounts, tax data, identity data, and support evidence unless explicitly allowed by policy.
- Reconnect must refetch canonical state after app foreground, token refresh, clock skew, missed event, or provider outage.

## Permissions, Privacy, And Safety

- Request camera, notifications, contacts, photos/files, location, and biometric permissions only when a feature requires them.
- Default analytics must exclude raw identity data, bank/card data, balances, precise trade amounts, crypto addresses, tax documents, recovery phrases, and support evidence.
- Identity, fiat rails, custody, trading, crypto transfers, staking/rewards, cards/payments, taxes, sanctions, account restrictions, and account closure require launch owners, audit logs, provider contracts, and manual verification gates.
- Crypto transfers must include address validation, network/memo warnings, new-address friction, scam education, irreversible-transfer warnings, duplicate-submit prevention, and report/support actions.
- Account closure and data export must warn about balances, open orders, unsettled transfers, staking/unbonding, tax documents, support cases, legal holds, and regulatory retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, accessible charts, readable fee disclosures, and accessible support paths.
- Launch owners: compliance owner for identity/trading/custody/staking/tax; payments owner for fiat rails; privacy owner for data rights; trust/safety owner for scam/fraud; accessibility owner for inclusive crypto UX; support owner for escalations.

## Analytics And Monetization

- Track privacy-safe events for onboarding, KYC state, home viewed, asset opened, quote previewed, disclosure accepted, order submitted, transfer previewed, reward enabled, membership started/canceled, support case opened, data export requested, and account deletion requested.
- Events must use object type, flow step, provider status, reason code, latency bucket, feature flag, and coarse category rather than balances, addresses, exact amounts, identity data, bank details, or tax records.
- Risk analytics must separate scam-warning impressions, address-risk friction, duplicate prevention, account takeover signals, provider declines, transfer holds, and support outcomes.
- Monetization may include original trading fees/spreads, subscription benefits, staking provider economics, card/payment economics, and partner offers only with legal-reviewed pricing, disclosures, receipts, and cancellation support.

## Edge Cases

- First launch offline, unsupported country/state, underage user, lost phone, OTP failure, SIM-swap risk, account locked, account restricted, account closed, or deceased account owner.
- Asset is unsupported, delisted, watch-only, network-paused, deposit-only, withdrawal-only, region-blocked, quote-unavailable, or price feed stale.
- Quote expires, fee/spread changes, market moves, limit exceeded, funding source fails, provider rejects order, duplicate submit occurs, or partial provider outage happens.
- Crypto address is invalid, missing memo/tag, wrong network, high-risk, sanctioned, reused unexpectedly, or transfer gets stuck with low confirmations.
- Fiat transfer hits ACH return, name mismatch, fraud hold, bank holiday, weekend delay, instant transfer unavailable, or destination removed.
- Rewards rate changes, asset becomes ineligible, unbonding delays, reward calculation is corrected, or tax document changes after generation.
- Support case is duplicated, escalated, contains sensitive evidence, conflicts with legal retention, or continues after closure request.

## Test Plan

- Validate exactly one H1, all canonical sections, exact source URLs, and no generic research placeholders.
- Unit test account state, identity gates, quote expiry, fee disclosure, idempotency keys, transfer state machines, reward eligibility, membership lifecycle, closure blockers, and privacy-safe analytics.
- Contract test every documented API route, response shape, pagination cursor, provider status, error code, event replay, and disclosure acknowledgement.
- Integration test onboarding, portfolio home, asset detail, buy/sell/convert preview and submit, send/receive, funding, reward opt-in, membership, support, settings, data export, and account deletion.
- Offline/realtime test cached reads, blocked regulated writes while offline, stale labels, reconnect reconciliation, duplicate events, push deep links, and provider outage.
- Security test tokenized instruments, PII redaction, address validation, session revocation, support evidence access, audit events, and provider secret isolation.
- Accessibility test screen readers, focus order, dynamic type, contrast, reduced motion, chart alternatives, QR alternatives, fee disclosure, and support paths.
- Manual verification test native screens, signup/login, KYC, trades, transfers, staking, membership, support, notifications, data export, account closure, and regional/provider behavior before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party marketplace, help/support, privacy/legal, product, security, tax, staking, and disclosure URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Coinbase without copying assets, network traffic, private APIs, provider contracts, risk models, fee schedules, disclosure text, support scripts, or brand copy.
- Every account, fiat, crypto, trading, custody, staking, membership, card/payment, tax, support, notification, data export/deletion, regional, and native-device behavior without lawful hands-on verification remains explicitly blocked.
- All sensitive writes require server-owned preview, idempotency, audit events, provider status, risk checks, disclosure acknowledgement, and user-visible receipt or failure state.
- Privacy, security, scam/fraud controls, statements, tax records, data export, account closure, and support escalation are represented in screens, entities, APIs, and tests.
- Regulated modules remain feature-flagged until legal, compliance, provider, security, accessibility, and manual verification owners approve launch.

## Open Questions

- Which native iOS and Android Coinbase screens differ by region, asset, account status, subscription state, and app version?
- Which crypto/fiat provider sandboxes, licensed market data, custody model, tax provider, and support tooling will the implementation use?
- Which advanced trade, card/payment, staking/reward, tax, or membership features should be removed from V1 instead of shipped behind blockers?
- Which synthetic assets, transaction histories, risk scenarios, and downstream implementation repos will be used for test fixtures?

## Next Steps

- Use lawful test accounts/devices to verify native screens, onboarding, KYC, trades, funding, transfers, rewards, membership, push notifications, support, data rights, and region-specific behavior.
- Create synthetic users, identities, assets, quotes, orders, transfers, funding instruments, rewards, statements, tax records, support cases, and provider events.
- Run legal, compliance, trust/safety, payments, privacy, accessibility, and regulated-product review before enabling production crypto or fiat movement.
