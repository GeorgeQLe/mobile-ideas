# Robinhood-Style Clone Spec

> Metadata
> - Inspiration app: Robinhood
> - Category: Investing, brokerage, stocks, ETFs, options, retirement, crypto, futures, prediction markets, cash sweep, subscriptions, advanced charts, and regulated account support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product pages, safety guidance, and current public listing notes.
> - Manual verification blockers: native iOS/Android screens, signup/login, identity/KYC, brokerage application, options application, margin approval, futures approval, Robinhood Gold subscription, cash sweep, IRA setup, funding, ACH/debit links, market data, quote refresh, stock/ETF/options/futures/crypto/event-contract order placement, order cancellation/replacement, extended-hours trading, transfers, account restrictions, tax forms, statements, support chat, push payloads, data export, account closure, and state/country eligibility require lawful test devices/accounts, regulated sandbox/provider approval, and compliance review before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, account identifiers, sample data, payment providers, banking partners, card issuer relationships, brokerage or crypto integrations, fraud systems, support scripts, and regulated-finance controls.

## Overview

Build an original mobile product inspired by Robinhood's public workflow: brokerage onboarding, portfolio, watchlists, stock/ETF/options detail, order tickets, quote refresh, buying power, cash sweep, Robinhood Gold-like subscription, crypto trading and transfers, retirement accounts, advanced charts, futures and prediction markets where eligible, disclosures, account restrictions, tax documents, support, privacy, and security.

The clone must not copy Robinhood branding, screenshots, marketing copy, protected UI artwork, private APIs, account identifiers, risk models, provider relationships, legal disclosure text, or support scripts. Functional parity should be expressed through original product language, licensed integrations, synthetic account data, independently designed risk and fraud controls, and jurisdiction-aware compliance gates.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and provider approval.

## Goals

- Provide a mobile-first product with account entry, secure sessions, primary home, transaction or order flows, activity/history, support, privacy, and security settings.
- Support category-specific trust expectations around identity verification, mistaken transactions, scams, unauthorized activity, provider outages, disputes, statements, tax records, account closure, and customer support escalation.
- Represent regulated finance, card, bank, crypto, brokerage, derivatives, teen, business, savings, or merchant features as provider-backed modules with explicit compliance, eligibility, and feature-flag gates.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Robinhood-branded app or imply affiliation with Robinhood, its parent companies, card issuers, banking partners, brokers, clearing firms, crypto providers, exchanges, support teams, or regulators.
- Do not copy branding, logos, screenshots, app icons, marketing copy, protected UI artwork, private APIs, risk models, support scripts, ranking systems, fee schedules, legal language, or proprietary account data.
- Do not process production money movement, deposits, card transactions, crypto transfers, securities trades, derivatives, tax records, disputes, chargebacks, credit, or identity decisions without separate legal, compliance, provider, and security approval.
- Do not treat financial, payment, crypto, investing, teen, business, tax, support, or data-rights behavior as generic app behavior.
- Do not claim exact native-device, account, notification, support, data export/deletion, regional, provider, or regulated-flow parity until lawful manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/robinhood-trading-investing/id938003185 | Official iOS listing, Finance category, developer, 18+ rating, stocks/options/ETFs, Gold, crypto, prediction markets, support, security, accessibility, privacy-label, and release context | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.robinhood.android&hl=en-US | Official Android listing, package id, download scale, data-safety notes, stocks/options/ETFs, Gold, crypto, instant deposits, disclosures, and support contacts | Verified 2026-04-17 |
| Investing Help Center | https://robinhood.com/us/en/support/investing/your-investments/ | Investing support taxonomy for account restrictions, market closures, buying power, options, margin, volatility, stock lending, IPO access, Gold, crypto, futures, and retirement | Verified 2026-04-17 |
| Gold Overview | https://robinhood.com/support/articles/gold-overview/ | Gold subscription cost, APY timing, instant deposits, research, margin benefit, IRA match, cancellation, cash program, SIPC/FDIC caveats, and disclosures | Verified 2026-04-17 |
| Options Product Page | https://robinhood.com/us/en/about/options | Options positioning, watchlists, cash accounts, index options, Gold benefits, fees, and brokerage/crypto/futures/spending disclosures | Verified 2026-04-17 |
| Buy Or Sell Crypto | https://robinhood.com/us/en/support/articles/buy-or-sell-crypto/ | Crypto order flow, app and web steps, order types, recurring investment, send/receive menu, and submission path | Verified 2026-04-17 |
| Crypto Account After Spending Closure | https://robinhood.com/us/en/support/articles/crypto-account-after-spending-closure/ | April 27, 2026 spending-account sunset, crypto account funding migration, automatic sale/closure risk, and crypto/brokerage separation disclosures | Verified 2026-04-17 |
| Robinhood Legend | https://robinhood.com/us/en/support/articles/get-started-with-robinhood-legend/ | Advanced trading platform setup, account switching, mobile widget connection, crypto, futures, and notification dependency | Verified 2026-04-17 |
| Futures Account | https://robinhood.com/us/en/support/articles/get-started-with-a-futures-account/?hcs=true | Futures eligibility, application review, buying power, transfer limits, restrictions, and liquidation constraints | Verified 2026-04-17 |
| Retirement | https://robinhood.com/us/en/about/retirement/ | IRA product positioning, tax caveats, product links, legal disclosures, and brokerage entity disclosure | Verified 2026-04-17 |
| Disclosure Library | https://robinhood.com/us/en/legal/ | User agreements, fee schedules, crypto risk disclosures, options agreement, margin, cash sweep, privacy, terms, and entity-specific disclosures | Verified 2026-04-17 |
| US User Privacy Statement | https://robinhood.com/us/en/support/articles/privacy-policy-eu/ | Financial-entity privacy scope, GLBA notices, data categories, rights, and entity coverage | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support adult-only onboarding, identity/KYC, brokerage account application, funding setup, tax profile, account restrictions, device/session security, and signed-out, pending-approval, restricted, closed, and unsupported-region states.
- Portfolio home must show account selector, buying power, positions, watchlists, cash sweep status, pending transfers, alerts, news/education, Gold state, market status, account restrictions, and stale quote labels.
- Instrument detail must support stocks, ETFs, options, crypto, futures, and event contracts as feature-flagged asset classes with charts, quotes, disclosures, watchlist, news, analyst/research where licensed, holdings, and action buttons.
- Order tickets must support buy/sell, order type, quantity/dollars, time in force, extended-hours eligibility, quote refresh, fee/regulatory disclosure, buying power check, preview, submit, cancel/replace where allowed, receipt, and audit events.
- Options must include eligibility, education, strategy level, options chain, greeks where licensed, spread/assignment/exercise risk, expiration, index option fees, retirement restrictions, and approval/rejection states.
- Crypto must include custody/provider status, supported asset list, recurring buys, send/receive where allowed, wallet/network selection, address validation, fees, price collars, volatility, tax, and non-FDIC/SIPC warnings.
- Gold and cash sweep must model subscription lifecycle, trial, billing, APY snapshot, cash sweep opt-in/status, instant deposit limits, research entitlement, margin benefit, cancellation, and rate-change disclosure.
- Retirement, futures, prediction markets, margin, stock lending, and managed/strategy products must stay behind explicit eligibility, risk disclosure, regulatory, and manual verification gates.
- Support and privacy must expose statements, confirms, tax documents, data rights, security controls, support chat, regulatory complaint paths, legal disclosures, account transfers, and closure blockers.
- The clone must use synthetic market data or licensed providers and must not provide investment advice, copy Robinhood's order-routing, risk, suitability, or support systems, or enable production trading without approvals.

### Build Plan

1. Foundation: model Robinhood account variants, identity, sessions, profile, settings, legal consent, privacy, support cases, audit logs, feature flags, provider adapters, and synthetic fixtures.
2. Wallet or portfolio core: build home, account state, activity/history, search or recipient selection, detail pages, cached reads, notification center, and settings.
3. Primary transaction path: add server-owned previews, idempotent submissions, provider status, fee/quote refresh, receipt states, cancellation/refund/dispute paths where allowed, and support handoff.
4. Regulated modules: add cards, bank transfers, savings, crypto, brokerage, derivatives, teen, business, or merchant modules only behind eligibility, compliance, provider, and manual verification gates.
5. Trust and privacy: add scam/fraud education, blocked-action reason codes, statements, data export, account closure blockers, evidence redaction, role-based access, and privacy-safe analytics.
6. Native hardening: verify iOS/Android screens, permissions, push payloads, accessibility, offline/reconnect behavior, support paths, and regional/provider differences with lawful test devices/accounts.

## Core User Journeys

- New investor applies for an individual brokerage account, completes identity and tax profile, links a bank, waits for approval, and lands on a zero-portfolio home with education.
- Returning investor checks portfolio, opens a stock detail page, reviews chart and quote freshness, places a fractional market buy after preview, and sees confirmation plus position update.
- Options-eligible user opens an options chain, selects a contract, reviews risk and fee disclosures, submits an order, and handles market-closed, assignment-risk, or insufficient-buying-power errors.
- Gold subscriber starts a trial, views APY and instant-deposit benefits, uses research, borrows margin within eligibility, then cancels and sees remaining billing-period access.
- Crypto user buys a supported asset, sets recurring purchase, sends to an external wallet after network/address warning, and later exports tax records.
- Futures-eligible user applies, waits for review, sees futures buying power, places a simulated contract order, and handles margin call or transfer restriction states.
- Privacy-focused user downloads statements/confirms/tax docs, requests data export, starts account closure, and sees blockers for open orders, unsettled funds, tax records, crypto, futures, or legal retention.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Adult onboarding, login, KYC, and consent | email, phone, SSN, documents | new, pending, approved, restricted | underage, KYC fail, unsupported state |
| Portfolio Home | Account summary, positions, watchlists, cash, alerts | account, search, transfer, trade | zero, loaded, market open, restricted | stale quote, trading halt, buying power mismatch |
| Instrument Detail | Charts, quote, holdings, news, disclosures, actions | symbol, timeframe, watch, trade | tradable, watch-only, market closed | halted, delisted, unsupported, data outage |
| Order Ticket | Order entry, preview, submit, and receipt | side, amount, order type, TIF | draft, preview, submitted, filled | quote expired, reject, partial fill, cancel unavailable |
| Options Chain | Options discovery, strategy level, ticket handoff | expiry, strike, side, strategy | eligible, education, quoted, submitted | approval denied, assignment risk, index fee |
| Crypto | Asset list, quote, recurring, send/receive, tax | asset, quote, network, address | enabled, quoted, pending, settled | jurisdiction block, wallet mismatch, irreversible transfer |
| Transfers And Cash | Bank link, deposits, withdrawals, cash sweep, APY | bank, amount, direction | linked, pending, settled, swept | ACH fail, instant unavailable, rate changed |
| Gold/Entitlements | Subscription benefits, billing, research, margin | trial, subscribe, cancel | trialing, active, expired, canceled | billing fail, margin ineligible, benefit removed |
| Retirement/Futures/Advanced | IRA, futures, Legend, prediction/event feature gates | apply, switch, trade, disclose | eligible, pending, active, blocked | review delay, margin call, transfer liquidation |
| Settings/Support/Privacy | Security, statements, tax, disclosures, data rights | download, export, delete, chat | verified, pending export, closure blocked | open order, legal hold, support escalation |

## Data Model

- User: legal identity, tax profile, age, region, account permissions, risk flags, consent, privacy choices, and closure lifecycle.
- DeviceSession: device id, app version, push token, two-factor/passkey state, session expiry, and suspicious-login markers.
- BrokerageAccount: account type, approval state, cash, buying power, margin status, cash sweep, restrictions, tax docs, statements, and transfer eligibility.
- PortfolioPosition: account, instrument, quantity, cost basis, market value, unrealized gain/loss, lot metadata, and corporate-action state.
- Instrument: asset class, symbol, exchange/network, quote, chart data, market status, tradability, disclosure requirements, and provider source.
- Order: account, instrument, side, quantity/notional, order type, time in force, quote snapshot, fee lines, preview, lifecycle, fill events, and audit ids.
- OptionsApproval: account, requested level, questionnaire, approval decision, strategy permissions, education acknowledgements, and restrictions.
- CryptoAccount: asset balances, provider account, quote, network/address, send/receive eligibility, tax records, jurisdiction gate, and risk acknowledgements.
- GoldSubscription: plan, trial, billing source, APY snapshot, benefits, research entitlement, margin benefit, IRA match eligibility, cancellation, and renewal.
- FuturesOrEventAccount: eligibility, application, buying power, contract permissions, margin call, liquidation rule, and provider status.
- SupportCase: account, order, transfer, tax, restriction, crypto, futures, privacy, evidence, owner queue, SLA, decision, and escalation.
- AuditEvent: append-only record for auth, KYC, account, funding, quote, order, option, crypto, subscription, support, privacy, and disclosure-sensitive changes.

## API And Backend Contracts

- Auth: POST /auth/session, POST /auth/verify, POST /auth/recover, DELETE /auth/session, and DELETE /auth/sessions/:id with device-scoped session tracking, risk state, and account limitation responses.
- Profile and eligibility: GET /profile, PATCH /profile, GET /eligibility, and POST /eligibility/recheck return account type, region, identity, provider, feature-flag, and manual-verification gates.
- Home and activity: GET /home, GET /activity?cursor=&filter=, and GET /activity/:id return cached-safe summaries, stale timestamps, authorization state, linked support actions, and pagination.
- Instruments and accounts: GET /instruments, POST /instruments, PATCH /instruments/:id, and DELETE /instruments/:id manage linked banks, cards, balances, brokerage accounts, crypto accounts, or provider references with tokenization and owner-match checks.
- Preview: POST /transactions/preview validates recipient, instrument, amount, order, quote, fee, disclosure, risk, limit, and provider state before any sensitive write.
- Submit: POST /transactions creates the payment, request, transfer, checkout, order, or claim with an idempotency key, audit event, disclosure acknowledgement, and provider correlation id.
- Status: GET /transactions/:id, POST /transactions/:id/cancel, POST /transactions/:id/refund, POST /transactions/:id/dispute, and POST /transactions/:id/report expose lifecycle state, cancellation eligibility, support handoff, evidence needs, and immutable receipt data.
- Realtime: GET /events?cursor=, websocket, SSE, or polling fallback returns stable event ids for balance, account, transfer, order, support, privacy, and security changes.
- Notifications: GET /notification-preferences, PATCH /notification-preferences, and server-side fanout support transactional, security, support, marketing, teen/business, and regulated-product categories.
- Privacy: GET /privacy/settings, PATCH /privacy/settings, POST /data-export, GET /data-export/:id, and DELETE /account expose data rights, closure blockers, legal retention, and provider-specific caveats.
- Support/admin: POST /support/cases, GET /support/cases/:id, POST /support/cases/:id/evidence, POST /support/cases/:id/appeal, and internal review endpoints manage fraud, dispute, identity, provider, and privacy queues.

## Realtime, Push, And Offline Behavior

- Balance, account, transfer, payment, order, request, card, crypto, brokerage, subscription, support, privacy, and security states must reconcile from server-owned events.
- The client may cache home, activity summaries, receipts, saved recipients or watchlists, settings, support cases, legal links, and low-risk drafts with visible freshness timestamps.
- Offline mode may preserve draft payments, requests, orders, support messages, profile edits, and preference changes, but must block regulated writes, money movement, card lock/unlock, crypto transfer, brokerage order, account deletion, and support decisions while offline.
- Quotes, fees, limits, APY, buying power, transfer arrival estimates, rewards, merchant eligibility, market data, and provider statuses must expire and refresh before confirmation.
- Realtime updates must be idempotent and ordered with stable event ids; clients must refetch canonical state after reconnect, app foreground, token refresh, clock skew detection, or provider outage.
- Push notifications must be opt-in, category-controlled, and deep-link through authenticated refresh rather than trusting client-side payload state.
- Push payloads must minimize sensitive content and avoid full names, amounts, balances, bank/card details, crypto addresses, investment symbols/order details, teen data, tax data, or support evidence unless explicitly allowed by policy.
- Long-running flows must expose pending, complete, failed, canceled, reversed, disputed, expired, held, restricted, and provider-degraded states with recovery actions.

## Permissions, Privacy, And Safety

- Request contacts, camera, photo library, files, location, notifications, biometric authentication, and digital-wallet permissions only when the related feature is invoked.
- Default analytics must exclude raw phone numbers, emails, account/routing numbers, card numbers, balances, payment notes, exact transaction amounts, precise locations, crypto addresses, investment holdings, tax records, teen details, identity documents, and support evidence.
- Identity verification, money movement, bank/card linking, disputes, chargebacks, tax reporting, crypto, investing, derivatives, teen accounts, business profiles, and account closure require launch owners, provider contracts, audit logs, and manual verification gates.
- Fraud/scam controls must include suspicious-recipient warnings, support impersonation warnings, phishing reporting, duplicate-submit prevention, high-risk action holds, report/block controls, and official support channel guidance.
- Payment, card, bank, crypto, brokerage, futures, business, and support flows must include fee/quote refresh, provider status, user-visible disclosures, receipt records, statements, and appeal/escalation paths where applicable.
- Account closure and data export must warn about balances, pending transactions, cards, disputes, tax forms, crypto, investments, teen/business accounts, support cases, legal holds, and regulatory retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, clear fee/total breakdowns, accessible QR alternatives, chart alternatives, and accessible support paths.
- Launch owners: compliance owner for regulated finance, identity, money movement, crypto, investing, derivatives, tax, and minors; payments owner for transfer/card/merchant rails; privacy owner for data rights; trust/safety owner for fraud/scams; accessibility owner for inclusive finance UX; support owner for disputes and escalations.

## Analytics And Monetization

- Track privacy-safe events for onboarding started/completed, eligibility check, home viewed, recipient or instrument selected, preview shown, disclosure accepted, transaction submitted, transaction completed, transaction failed, support case opened, data export requested, and account deletion requested.
- Every event must use object type, flow step, provider status, reason code, latency bucket, feature flag, and coarse category rather than raw financial, identity, tax, contact, support, or investment data.
- Risk analytics must separate scam-warning impressions, new-recipient friction, duplicate prevention, support impersonation reports, account takeover signals, device/session changes, suspicious requests, provider declines, and dispute outcomes.
- Product analytics must capture quote freshness, fee disclosure display, funding or buying-power category, provider decline category, receipt state, support route, and recovery path without exposing financial account data.
- Regulated-product analytics for crypto, investing, derivatives, savings, cards, or teen accounts must capture only education, disclosure acceptance, eligibility gate, provider latency, jurisdiction block, and error category unless compliance explicitly approves more.
- Monetization may include original instant-transfer fees, card rewards economics, merchant acceptance, subscription, pay-later provider economics, crypto spread/fees, brokerage economics, marketplace or business fees, and partner offers, but pricing, names, fee rates, and promotional copy must be original and legal-reviewed.
- Any monetized financial product must disclose fees before confirmation, support receipts/statements, expose cancellation where applicable, and record provider/legal approval before launch.

## Edge Cases

- First launch offline, unsupported country/state, underage user, phone/email reuse, lost phone, OTP delivery failure, SIM-swap risk, account locked, account restricted, deceased user, or old account recovery.
- Recipient, merchant, instrument, order, or account is new, blocked, reported, deleted, suspended, business-marked, teen-linked, non-user, outside contacts, outside network, or has multiple matching aliases.
- Amount, quote, fee, APY, buying power, reward, market price, transfer limit, provider eligibility, or disclosure changes while the user is on the confirmation screen.
- Transaction has insufficient funds, linked source failure, provider decline, risk hold, duplicate submit, typo in amount, wrong recipient, non-user acceptance timeout, refund request, chargeback, or dispute.
- Provider outage, bank holiday, weekend, market close, trading halt, maintenance window, stale cache, corrupt local state, push token expiry, clock skew, or app termination during a long-running flow.
- Support case is duplicated, escalated, has missing evidence, contains sensitive uploads, conflicts with legal retention, or continues after account closure.
- Data export or deletion is requested with active balances, pending transfers, open orders, disputes, teen/business relationships, tax records, crypto, investments, or legal holds.
- Regional availability changes supported features, transfer limits, cards, fees, tax forms, crypto assets, investing products, support paths, disclosures, or privacy rights.

## Test Plan

- Validate exactly one H1 and all canonical sections.
- Validate all exact source URLs are first-party marketplace, help, support, privacy, legal, product, safety, or disclosure URLs and no generic research placeholders remain.
- Unit test account state, identity gates, session recovery, limits, quote or fee expiry, idempotency keys, blocked-action reason codes, and privacy-safe analytics construction.
- Unit test payment, request, transfer, card, savings, crypto, brokerage, dispute, support, privacy, and deletion/export state machines where applicable.
- Integration test onboarding, primary home, primary transaction preview, submission, receipt, activity/history, support case, settings, notification preferences, and data-rights flows.
- Contract test every documented API route, response shape, pagination cursor, provider status, error code, webhook or event replay, and disclosure acknowledgement.
- Offline/realtime test cached reads, draft preservation, blocked regulated writes while offline, reconnect reconciliation, stale quote or balance warnings, duplicate events, and push deep links.
- Security test tokenized financial instruments, PII redaction, support evidence access, device/session revocation, account restrictions, audit events, and provider secrets.
- Accessibility test screen reader labels, focus order, dynamic type, contrast, reduced motion, amount entry, chart alternatives, QR alternatives, error recovery, and support paths.
- Manual verification test Robinhood native screens, signup/login, primary transaction, account recovery, push payloads, support, data export, account closure, and provider-specific behavior before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party App Store, Google Play, help/support, privacy/legal, product, safety, and disclosure URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Robinhood without copying assets, network traffic, private APIs, provider contracts, risk models, disclosure text, fee schedules, support scripts, or brand copy.
- Every financial, account, card, bank, crypto, investing, tax, teen, business, support, notification, deletion/export, and native-device behavior without lawful hands-on verification remains explicitly blocked.
- All sensitive writes require server-owned preview, idempotency, audit events, provider status, risk checks, disclosure acknowledgements, and user-visible receipt or failure state.
- Privacy, security, scam/fraud controls, statements, data export, account closure, and support escalation are represented in screens, entities, APIs, and tests.
- Regulated modules remain feature-flagged until legal, compliance, provider, security, accessibility, and manual verification owners approve launch.

## Open Questions

- Which native iOS and Android screens differ from public web/help documentation by account type, region, device, and app version?
- Which provider, bank, card, crypto, brokerage, tax, teen, business, support, notification, and data-rights flows can be lawfully verified with test accounts?
- Which features should be removed from V1 rather than shipped behind launch blockers because provider, legal, compliance, or budget approval is unlikely?
- Which synthetic fixtures, licensed datasets, sandbox providers, and downstream implementation repos will be used for V1?

## Next Steps

- Use lawful test accounts/devices to verify native screens, onboarding, primary transactions, provider handoffs, push notifications, support, data rights, and region-specific behavior before removing blockers.
- Create synthetic users, accounts, instruments, recipients, merchants, orders, transfers, cards, disputes, support cases, statements, tax records, and provider events for implementation test fixtures.
- Run legal, compliance, trust/safety, payments, privacy, accessibility, and regulated-product review before enabling production money movement or trading.
