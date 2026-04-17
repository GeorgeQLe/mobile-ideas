# PayPal-Style Clone Spec

> Metadata
> - Inspiration app: PayPal
> - Category: Finance, digital wallet, checkout, peer payments, debit card, rewards, savings, crypto, pay-later, package tracking, disputes, and merchant payments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product pages, safety guidance, and current public listing notes.
> - Manual verification blockers: native iOS/Android screens, signup/login, identity verification, passkeys or device trust, wallet funding, bank/card linking, send/request, international send, Friends and Family versus Goods and Services selection, checkout with split funding, pay later underwriting, savings account opening, debit card request/activation/lock, direct deposit, cash a check, package tracking provider linking, crypto buy/sell/send/receive/spend, purchase protection claims, seller protection, disputes, unauthorized transaction reporting, support chat, push payloads, data export, account closure, and regional availability require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, account identifiers, sample data, payment providers, banking partners, card issuer relationships, brokerage or crypto integrations, fraud systems, support scripts, and regulated-finance controls.

## Overview

Build an original mobile product inspired by PayPal's public workflow: wallet, send and request money, checkout funding, PayPal balance, debit card, cash back offers, rewards, savings, direct deposit, pay later, crypto, package tracking, subscriptions, buyer/seller protection, disputes, account security, privacy controls, and support.

The clone must not copy PayPal branding, screenshots, marketing copy, protected UI artwork, private APIs, account identifiers, risk models, provider relationships, legal disclosure text, or support scripts. Functional parity should be expressed through original product language, licensed integrations, synthetic account data, independently designed risk and fraud controls, and jurisdiction-aware compliance gates.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and provider approval.

## Goals

- Provide a mobile-first product with account entry, secure sessions, primary home, transaction or order flows, activity/history, support, privacy, and security settings.
- Support category-specific trust expectations around identity verification, mistaken transactions, scams, unauthorized activity, provider outages, disputes, statements, tax records, account closure, and customer support escalation.
- Represent regulated finance, card, bank, crypto, brokerage, derivatives, teen, business, savings, or merchant features as provider-backed modules with explicit compliance, eligibility, and feature-flag gates.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a PayPal-branded app or imply affiliation with PayPal, its parent companies, card issuers, banking partners, brokers, clearing firms, crypto providers, exchanges, support teams, or regulators.
- Do not copy branding, logos, screenshots, app icons, marketing copy, protected UI artwork, private APIs, risk models, support scripts, ranking systems, fee schedules, legal language, or proprietary account data.
- Do not process production money movement, deposits, card transactions, crypto transfers, securities trades, derivatives, tax records, disputes, chargebacks, credit, or identity decisions without separate legal, compliance, provider, and security approval.
- Do not treat financial, payment, crypto, investing, teen, business, tax, support, or data-rights behavior as generic app behavior.
- Do not claim exact native-device, account, notification, support, data export/deletion, regional, provider, or regulated-flow parity until lawful manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/paypal-send-and-request-money-safely/id283646709 | Official iOS listing, Finance category, PayPal developer, app positioning, offers, send/request, debit card, savings, pay later, crypto, package tracking, privacy-label, and release context | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.paypal.android.p2pmobile&hl=en_US | Official Android listing, package id, download scale, data-safety notes, send/request, debit card, savings, crypto, pay later, rewards, and support contacts | Verified 2026-04-17 |
| Digital Wallet | https://www.paypal.com/us/digital-wallet | PayPal app overview for offers, send/request, subscriptions, package tracking, wallet management, notifications, and account activity | Verified 2026-04-17 |
| Manage Money | https://www.paypal.com/us/digital-wallet/manage-money | Balance, direct deposit, debit card, bill pay, savings, add cash, crypto, cash a check, and security positioning | Verified 2026-04-17 |
| PayPal Debit Card | https://www.paypal.com/us/digital-wallet/manage-money/paypal-debit-card | Debit card, cash back category, Balance account requirement, ATM, direct deposit, add cash, cash a check, mobile wallet, activation, and protection notes | Verified 2026-04-17 |
| PayPal Savings | https://www.paypal.com/us/digital-wallet/manage-money/start-saving | Savings product, APY timing, Synchrony Bank provider, FDIC caveats, goals, recurring transfers, and app management | Verified 2026-04-17 |
| PayPal Savings FAQ | https://www.paypal.com/us/cshelp/article/paypal-savings-faqs-HELP777 | Savings account setup, statement availability, transfer paths, Smart Route, FDIC limits, and provider separation | Verified 2026-04-17 |
| Crypto | https://www.paypal.com/us/digital-wallet/manage-money/crypto | Buy, sell, hold, send, receive, spend, PYUSD, custody/provider, fee/risk, and availability framing | Verified 2026-04-17 |
| Checkout With PayPal | https://www.paypal.com/us/digital-wallet/ways-to-pay/checkout-with-paypal | Online/in-store checkout, Pay Later, subscriptions, rewards, package tracking, split funding, encryption, and compromised-card alerts | Verified 2026-04-17 |
| How To Send Money | https://securepayments.paypal.com/us/cshelp/article/how-do-i-send-money-help293 | Send/request steps, recipient identifiers, app flow, payment type selection, payment method, international send, and no-cancel guidance | Verified 2026-04-17 |
| Friends And Family Versus Goods And Services | https://www.paypal.com/us/cshelp/article/whats-the-difference-between-friends-and-family-or-goods-and-services-payments-help277 | Payment-type distinction, personal payments, purchase coverage, fees, and recategorization constraints | Verified 2026-04-17 |
| User Agreement | https://www.paypal.com/us/legalhub/paypal/useragreement-full?locale.x=en-US | Receiving payments, reversals, purchase and seller protection, unauthorized transactions, errors, account statements, holds, limitations, and dispute procedures | Verified 2026-04-17 |
| Privacy Statement | https://www.paypal.com/us/legalhub/paypal/privacy-full?lang=en-US | PayPal personal information handling, excluded services, updates, sharing, retention, and privacy choices | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support personal account onboarding, login recovery, passkey or two-factor state, identity verification, region eligibility, PayPal balance, wallet funding methods, and signed-out, limited, restricted, business, and closed-account states.
- Send/request must support name, username, phone, email, PayPal.Me-like link, contacts, amount, currency, note, payment type, funding source, fee preview, international/remittance disclosures, confirmation, receipt, refund request, and no-cancel guidance after submission.
- Checkout must support online and in-store merchant payments, wallet selection, PayPal balance, bank, debit, credit, split funding where allowed, Pay Later handoff, rewards/cash-back offers, subscription management, and package tracking from linked providers.
- Wallet must support cards, banks, PayPal balance, debit card, direct deposit, add cash, cash a check, bill pay, savings, crypto, rewards, package tracking, notification preferences, and account activity.
- Debit card and savings modules must be provider-backed with eligibility, ID check, digital/physical card, activation, lock, ATM, rewards category, statements, FDIC/provider caveats, savings goals, recurring transfers, and statement availability.
- Crypto must support education, buy/sell quote, PYUSD and supported asset list, send/receive, spend, custody/provider status, fees, limits, tax reporting, irreversibility, volatility, and jurisdiction blocks.
- Disputes must distinguish personal payments, goods/services purchases, buyer protection, seller protection, unauthorized transactions, chargebacks, holds, limitations, reversals, evidence submission, deadlines, decisions, and appeals.
- Package tracking must support carrier/provider linking, order import, shipment events, delivery notifications, stale tracking, unlinking, and privacy controls.
- Business or merchant use must support invoices, checkout integrations, receiving payments, fees, reversals, tax reporting, protection eligibility, and business-account limits without copying PayPal's proprietary risk scripts.
- Privacy and safety must expose security center, session/device management, two-factor controls, alerts, data rights, account closure, scam education, and support paths.

### Build Plan

1. Foundation: model PayPal account variants, identity, sessions, profile, settings, legal consent, privacy, support cases, audit logs, feature flags, provider adapters, and synthetic fixtures.
2. Wallet or portfolio core: build home, account state, activity/history, search or recipient selection, detail pages, cached reads, notification center, and settings.
3. Primary transaction path: add server-owned previews, idempotent submissions, provider status, fee/quote refresh, receipt states, cancellation/refund/dispute paths where allowed, and support handoff.
4. Regulated modules: add cards, bank transfers, savings, crypto, brokerage, derivatives, teen, business, or merchant modules only behind eligibility, compliance, provider, and manual verification gates.
5. Trust and privacy: add scam/fraud education, blocked-action reason codes, statements, data export, account closure blockers, evidence redaction, role-based access, and privacy-safe analytics.
6. Native hardening: verify iOS/Android screens, permissions, push payloads, accessibility, offline/reconnect behavior, support paths, and regional/provider differences with lawful test devices/accounts.

## Core User Journeys

- New user creates a personal account, verifies phone/email, links a bank or card, reviews wallet privacy choices, and lands on the wallet home.
- User sends money to a friend, chooses Friends and Family, reviews funding and fee details, confirms, and later sees the transaction in activity.
- Buyer pays an online merchant with PayPal, chooses a card plus balance where allowed, reviews Pay Later offer if eligible, receives a receipt, and tracks package delivery in the app.
- User opens a PayPal Savings goal, transfers from balance, enables recurring transfer, views interest and statement caveats, and handles a failed transfer.
- Debit-card user requests a card, chooses a reward category, adds it to mobile wallet, locks it after a suspicious transaction, and opens an unauthorized-charge case.
- Crypto user buys PYUSD or another supported asset after reviewing risk/fee disclosures, sends crypto to a compatible wallet, handles address warning, and exports tax/reporting records.
- Seller receives a Goods and Services payment, ships an item, receives a buyer dispute, uploads evidence, and sees hold, decision, reversal, or appeal states.
- Privacy-focused user reviews data use, turns down marketing, requests data export, starts account closure, and sees blockers for open disputes, balance, savings, crypto, Pay Later, or legal retention.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, verification, consent, and recovery | email, phone, code, passkey | new, returning, limited, locked | verification fail, unsupported region, risk review |
| Wallet Home | Balance, actions, rewards, cards, savings, crypto, tracking | send, request, pay, transfer | zero, loaded, restricted, business | stale balance, provider outage, limited account |
| Send/Request | Recipient, amount, payment type, funding, and review | recipient, amount, type, source | draft, preview, submitted, complete | wrong type, fee surprise, duplicate, cannot cancel |
| Checkout | Merchant payment and funding selection | merchant, wallet, pay later, rewards | ready, authorizing, paid, failed | merchant decline, split unavailable, risk hold |
| Activity And Resolution | Transactions, receipts, claims, and errors | filter, dispute, evidence, appeal | pending, complete, held, resolved | chargeback, reversal, missing package, unauthorized |
| Cards And Banks | Payment methods and debit card management | add, verify, lock, activate | linked, verifying, active, locked | owner mismatch, token expired, card declined |
| Savings | Savings setup, goals, recurring transfers, statements | goal, transfer, schedule | eligible, active, pending, closed | provider unavailable, negative balance, statement web-only |
| Crypto | Education, quote, order, send, receive, tax records | asset, quote, address, amount | educational, quoted, submitted, settled | jurisdiction block, volatility, irreversible transfer |
| Package Tracking | Linked order import and delivery updates | carrier, email link, tracking | linked, in transit, delivered, exception | carrier stale, provider disconnect, privacy opt-out |
| Settings/Security/Privacy | Security, alerts, legal, data rights, closure | toggles, export, delete, support | verified, pending export, closure blocked | active dispute, legal hold, recovery risk |

## Data Model

- User: identity, login identifiers, region, account type, verification, limitations, consent, privacy choices, and closure lifecycle.
- DeviceSession: device trust, passkey or two-factor state, push token, app version, risk score, session expiry, and revocation.
- Wallet: balance, funding instruments, preferred payment method, rewards state, product eligibility, stale timestamp, and transfer restrictions.
- FundingInstrument: bank, debit, credit, prepaid where allowed, token, verification state, owner match, currency, limits, and deletion blockers.
- Payment: sender, recipient, amount, currency, payment type, funding source, fee, note, idempotency key, lifecycle, receipt, refund, and dispute links.
- MerchantCheckout: merchant, cart/order reference, funding split, Pay Later offer, rewards, authorization, capture, receipt, refund, and protection eligibility.
- DebitCardAccount: provider token, digital/physical state, reward category, mobile-wallet token, lock state, ATM usage, transaction alerts, and dispute lifecycle.
- SavingsAccount: Synchrony-backed account reference, goals, transfer schedule, APY snapshot, statement metadata, FDIC caveat, and closure restrictions.
- CryptoAccount: assets, quote, fees, custody provider, order, transfer address, network, tax records, jurisdiction gate, and disclosure acknowledgements.
- PackageTrackingLink: provider connection, carrier, tracking number, shipment events, notification preferences, and unlink state.
- ResolutionCase: claim type, transaction, evidence, deadlines, hold, decision, appeal, reversal, and legal retention.
- AuditEvent: append-only record for auth, wallet, funding, payment, checkout, card, savings, crypto, claim, privacy, and security changes.

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
- Manual verification test PayPal native screens, signup/login, primary transaction, account recovery, push payloads, support, data export, account closure, and provider-specific behavior before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party App Store, Google Play, help/support, privacy/legal, product, safety, and disclosure URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by PayPal without copying assets, network traffic, private APIs, provider contracts, risk models, disclosure text, fee schedules, support scripts, or brand copy.
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
