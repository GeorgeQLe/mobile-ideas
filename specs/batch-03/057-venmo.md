# Venmo-Style Clone Spec

> Metadata
> - Inspiration app: Venmo
> - Category: Finance, social peer payments, debit and credit cards, direct deposit, crypto, teen accounts, business profiles, and purchase protection
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product pages, safety guidance, and current public listing notes.
> - Manual verification blockers: native iOS/Android screens, signup/login, phone/email verification, identity verification, friends graph, contact sync, payment send/request/split, social feed visibility, QR scan, bank/card linking, Venmo balance, add money, standard and instant transfer, direct deposit, debit card order/activation/lock/dispute, credit card application, teen account setup and sponsor controls, business profile creation, Tap to Pay, goods-and-services purchase protection, crypto buy/sell/receive/transfer where available, tax forms, support chat, push payloads, data export, account closure, and regional availability require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, account identifiers, sample data, payment providers, banking partners, card issuer relationships, brokerage or crypto integrations, fraud systems, support scripts, and regulated-finance controls.

## Overview

Build an original mobile product inspired by Venmo's public workflow: social payments, payment notes and feeds, split requests, QR payments, linked funding sources, balance, debit and credit card surfaces, direct deposit, teen accounts, business profiles, merchant payments, disputes, privacy controls, support, and scam education.

The clone must not copy Venmo branding, screenshots, marketing copy, protected UI artwork, private APIs, account identifiers, risk models, provider relationships, legal disclosure text, or support scripts. Functional parity should be expressed through original product language, licensed integrations, synthetic account data, independently designed risk and fraud controls, and jurisdiction-aware compliance gates.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and provider approval.

## Goals

- Provide a mobile-first product with account entry, secure sessions, primary home, transaction or order flows, activity/history, support, privacy, and security settings.
- Support category-specific trust expectations around identity verification, mistaken transactions, scams, unauthorized activity, provider outages, disputes, statements, tax records, account closure, and customer support escalation.
- Represent regulated finance, card, bank, crypto, brokerage, derivatives, teen, business, savings, or merchant features as provider-backed modules with explicit compliance, eligibility, and feature-flag gates.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Venmo-branded app or imply affiliation with Venmo, its parent companies, card issuers, banking partners, brokers, clearing firms, crypto providers, exchanges, support teams, or regulators.
- Do not copy branding, logos, screenshots, app icons, marketing copy, protected UI artwork, private APIs, risk models, support scripts, ranking systems, fee schedules, legal language, or proprietary account data.
- Do not process production money movement, deposits, card transactions, crypto transfers, securities trades, derivatives, tax records, disputes, chargebacks, credit, or identity decisions without separate legal, compliance, provider, and security approval.
- Do not treat financial, payment, crypto, investing, teen, business, tax, support, or data-rights behavior as generic app behavior.
- Do not claim exact native-device, account, notification, support, data export/deletion, regional, provider, or regulated-flow parity until lawful manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/venmo/id351727428 | Official iOS listing, Finance category, developer, age rating, social payment, split request, card, crypto, teen, direct deposit, business, privacy-label, and release-context notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.venmo&hl=en_US | Official Android listing, package id, download scale, data-safety notes, social payment, split request, debit card, teen account, business, crypto, and direct deposit positioning | Verified 2026-04-17 |
| Help Center | https://help.venmo.com/hc/en-us | First-party support taxonomy for accounts, payments, wallet, disputes, buying/selling, business profiles, tax center, and security | Verified 2026-04-17 |
| Sending And Requesting Money | https://help.venmo.com/hc/en-us/articles/210413477-Sending-Requesting-Money | Pay/request entrypoint, recipient lookup by name/username/phone/email, amount, note, multiple recipients, split amount editing, and verification warnings | Verified 2026-04-17 |
| Payments And Requests FAQ | https://help.venmo.com/hc/en-us/articles/235170748-Payments-Requests-FAQ | Immediate payment state, transaction feed review, wrong-recipient guidance, pending payments, and cancellation limits | Verified 2026-04-17 |
| Bank Accounts And Cards FAQ | https://help.venmo.com/hc/en-us/articles/235224088-Bank-Accounts-Cards-FAQ | Wallet payment methods, accepted cards, bank/card management, and verification orientation | Verified 2026-04-17 |
| Venmo Debit Card FAQ | https://help.venmo.com/hc/en-us/articles/360000743767-Venmo-Debit-Card-FAQ | Debit card, FDIC pass-through caveats, Bancorp issuer relationship, card usage, balance access, and card support | Verified 2026-04-17 |
| Teen Account FAQ | https://help.venmo.com/hc/en-us/articles/15126474078099-Teen-Account-FAQ-for-Teens | Teen account onboarding, parent-linked model, teen debit card, balance, direct deposit, QR, and send/request behavior | Verified 2026-04-17 |
| Business Profiles FAQ | https://help.venmo.com/hc/en-us/articles/360043677373-Business-Profiles-FAQ | Business profile eligibility, separate profile, QR acceptance, search marketing, Tap to Pay, fees, refunds, and support/dispute orientation | Verified 2026-04-17 |
| Suspicious Message Reporting | https://help.venmo.com/hc/en-us/articles/4410324103187-Reporting-Fake-or-Suspicious-Messages-or-Emails | Phishing indicators, fake-site reporting, official support guidance, and anti-impersonation controls | Verified 2026-04-17 |
| User Agreement | https://venmo.com/legal/us-user-agreement/ | Account closure blockers, identity verification, payment method linking, balance, Pay or Request terms, business profiles, teen accounts, privacy defaults, purchase protection, disputes, and scam warnings | Verified 2026-04-17 |
| Privacy Statement | https://venmo.com/legal/us-privacy-policy-nov-17-2025/ | Personal data categories, PayPal controller relationship, teen-user notice path, retention, sharing, and privacy contact path | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support phone/email signup, password/session recovery, device trust, profile handle, QR code, contact opt-in, friends/following graph, and signed-out, locked, limited, frozen, teen, and business-profile states.
- Pay/request must support recipient lookup by username, phone, email, QR, contact, business profile, or teen account, plus amount, note, audience/privacy, funding source, split request, group recipients, preview, confirmation, receipt, refund request, dispute/report, and duplicate-submit idempotency.
- The home surface must show balance, activity feed, payment partners, pending requests, social or private feed filters, offers/rewards, security alerts, card tiles, teen/business switcher where eligible, and stale or limited account warnings.
- Wallet must support Venmo balance, linked bank, linked debit card, linked credit card, direct deposit, add money, cash out, standard transfer, instant transfer, fee/arrival preview, failed transfer recovery, and statement export.
- Debit and credit card modules must expose eligibility, application/order, digital wallet, activation, lock, replacement, transaction alerts, rewards, unauthorized charge path, dispute states, and issuer/provider handoff without copying exact card art or bank scripts.
- Teen accounts must support parent/guardian creation, teen onboarding, privacy defaults, sponsor visibility, teen debit card, teen balance, direct deposit, ATM constraints, bank/card add notifications, graduation, and sponsor closure paths.
- Business profiles must support profile creation from a personal account, business identity/tax data, public profile, QR and Tap to Pay acceptance where eligible, refunds, fees, transaction exports, search visibility controls, support, and closure blockers.
- Crypto and purchase-protection surfaces must be feature-flagged by jurisdiction and provider approval, with explicit risk, irreversibility, tax, eligibility, dispute, and record-retention disclosures.
- Privacy settings must let users change transaction visibility, friends-list visibility, contact sync, push categories, personalization, data export, account closure, and legal links, with separate teen defaults and sponsor visibility.
- Fraud/scam education must appear for new recipients, goods/services ambiguity, suspicious requests, support impersonation, phishing links, accidental-payment scams, and irreversible payment mistakes.

### Build Plan

1. Foundation: model Venmo account variants, identity, sessions, profile, settings, legal consent, privacy, support cases, audit logs, feature flags, provider adapters, and synthetic fixtures.
2. Wallet or portfolio core: build home, account state, activity/history, search or recipient selection, detail pages, cached reads, notification center, and settings.
3. Primary transaction path: add server-owned previews, idempotent submissions, provider status, fee/quote refresh, receipt states, cancellation/refund/dispute paths where allowed, and support handoff.
4. Regulated modules: add cards, bank transfers, savings, crypto, brokerage, derivatives, teen, business, or merchant modules only behind eligibility, compliance, provider, and manual verification gates.
5. Trust and privacy: add scam/fraud education, blocked-action reason codes, statements, data export, account closure blockers, evidence redaction, role-based access, and privacy-safe analytics.
6. Native hardening: verify iOS/Android screens, permissions, push payloads, accessibility, offline/reconnect behavior, support paths, and regional/provider differences with lawful test devices/accounts.

## Core User Journeys

- New personal user creates an account with phone/email, verifies ownership, chooses a handle, reviews legal terms, optionally links a debit card, sets payment visibility, and lands on money home.
- Returning user opens home, sees balance and recent activity, sends money to a known friend with a note, reviews funding source and privacy, confirms, receives a receipt, and sees the activity feed update.
- User splits a dinner request across multiple friends, edits per-person amounts, receives partial payments, reminds one recipient, and closes the request after all payments settle.
- Teen user opens a parent-linked account, checks private-by-default activity, sends money to a trusted friend, receives sponsor-visible notification, and uses a teen debit card with ATM/support limits.
- Small seller switches to a business profile, accepts an in-person QR or Tap to Pay payment, issues a partial refund, exports records, and handles a buyer dispute through support.
- User cashes out from balance, compares standard and instant transfer, sees fee and arrival estimates, handles provider delay, and verifies final bank transfer state.
- Privacy-focused user changes past and future transaction visibility, disables contact sync, requests data export, starts account closure, and sees blockers for pending transactions, disputes, cards, teen accounts, and crypto.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, OTP, legal consent, and region/age gates | phone, email, code, passkey | new, returning, locked, teen invite | OTP fail, US-only block, frozen account, duplicate identity |
| Money Home | Balance, feed, shortcuts, cards, alerts, and requests | pay, request, split, QR, transfer | zero, loaded, private, business, teen | stale balance, risk hold, feed privacy mismatch, provider outage |
| Pay/Request Composer | Recipient, amount, note, privacy, and split flow | recipient, amount, note, funding | draft, preview, submitted, complete | wrong recipient, duplicate tap, limit exceeded, blocked recipient |
| Activity And Receipt | Payments, requests, card activity, disputes, and exports | filter, receipt, refund, report | pending, complete, refunded, disputed | chargeback, canceled unclaimed payment, support hold |
| Profile/Friends/QR | Public identity, friend graph, QR, and block/report | handle, QR, contacts, privacy | public, friends-only, private, blocked | impersonation, contact denied, teen privacy default |
| Wallet And Transfers | Balance, banks/cards, add money, cash out, direct deposit | source, destination, speed, amount | linked, verifying, transferred, failed | instant unavailable, bank mismatch, microdeposit fail |
| Card Center | Debit/credit card lifecycle and transaction controls | order, activate, lock, dispute | eligible, ordered, active, locked | declined, lost/stolen, issuer review, unauthorized charge |
| Teen Sponsor Center | Teen setup, visibility, limits, and graduation | invite, controls, activity, close | invited, active, limited, graduated | sponsor revocation, teen turns 18, prohibited payment |
| Business Profile | Seller identity, QR/Tap to Pay, refunds, records | profile, QR, refund, export | draft, active, suspended, closed | verification fail, tax threshold, dispute, fee mismatch |
| Settings/Privacy/Support | Security, privacy, data rights, legal, and help | toggles, export, delete, chat | verified, pending export, closure started | active dispute, legal retention, support impersonation warning |

## Data Model

- User: legal identity status, profile handle, phone/email, country, age/teen eligibility, account type, privacy defaults, limitations, and data-rights lifecycle.
- DeviceSession: device id, platform, app version, push token, passcode or biometric state, session expiry, and risk signals.
- PublicProfile: display name, handle, avatar metadata, QR token, friends visibility, teen/business marker, relationship summary, and block/report state.
- Payment: sender, recipient, amount, currency, note, privacy audience, funding source, goods/services marker, risk warnings, idempotency key, receipt, refund/dispute state, and audit ids.
- PaymentRequest: requester, recipients, per-person amounts, note, split metadata, reminder state, accepted/ignored/canceled state, and expiry.
- WalletInstrument: bank, debit card, credit card, direct deposit account, verification state, owner match, funding eligibility, transfer limits, and removal blockers.
- BalanceTransfer: add-money or cash-out request, source, destination, speed, fee, arrival estimate, provider status, failure reason, and receipt.
- CardAccount: debit or credit product, issuer/provider token, activation, digital-wallet token, lock state, rewards, dispute state, and replacement lifecycle.
- TeenAccount: sponsor, teen, permissions, privacy defaults, debit card, balance, direct deposit, sponsor notifications, graduation state, and closure rules.
- BusinessProfile: business identity, tax identifiers, profile media, QR/Tap to Pay eligibility, fee plan, refunds, records, support cases, and closure state.
- SupportCase: issue type, linked transaction/card/account, evidence, queue owner, SLA, fraud flag, decision, appeal, and legal hold.
- AuditEvent: append-only event for auth, profile, wallet, payment, request, card, teen, business, dispute, privacy, and security-sensitive writes.

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
- Manual verification test Venmo native screens, signup/login, primary transaction, account recovery, push payloads, support, data export, account closure, and provider-specific behavior before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party App Store, Google Play, help/support, privacy/legal, product, safety, and disclosure URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Venmo without copying assets, network traffic, private APIs, provider contracts, risk models, disclosure text, fee schedules, support scripts, or brand copy.
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
