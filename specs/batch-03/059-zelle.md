# Zelle-Style Clone Spec

> Metadata
> - Inspiration app: Zelle
> - Category: Finance, bank-linked instant payments, aliases, enrolled-bank network routing, debit-card app fallback, requests, limits, and scam-safety education
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product pages, safety guidance, and current public listing notes.
> - Manual verification blockers: native iOS/Android screens, signup/login, bank-app handoff, standalone-app enrollment, U.S. mobile/email alias verification, eligible debit card linking, network financial institution lookup, send/request, recipient confirmation, cancellation of non-enrolled recipient payments, delayed/blocked transfers, direct bank account settlement, notification payloads, profile cancellation, data deletion, support calls, financial-institution-specific terms, limits, and regional availability require lawful test devices/accounts and financial-institution/provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, account identifiers, sample data, payment providers, banking partners, card issuer relationships, brokerage or crypto integrations, fraud systems, support scripts, and regulated-finance controls.

## Overview

Build an original mobile product inspired by Zelle's public workflow: bank-linked send and receive, enrollment through banking apps or the standalone app, email/mobile aliases, recipient verification, request money, direct-to-bank movement, limits, cancellation constraints, delay/block states, support, privacy notices, and Pay it Safe education.

The clone must not copy Zelle branding, screenshots, marketing copy, protected UI artwork, private APIs, account identifiers, risk models, provider relationships, legal disclosure text, or support scripts. Functional parity should be expressed through original product language, licensed integrations, synthetic account data, independently designed risk and fraud controls, and jurisdiction-aware compliance gates.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and provider approval.

## Goals

- Provide a mobile-first product with account entry, secure sessions, primary home, transaction or order flows, activity/history, support, privacy, and security settings.
- Support category-specific trust expectations around identity verification, mistaken transactions, scams, unauthorized activity, provider outages, disputes, statements, tax records, account closure, and customer support escalation.
- Represent regulated finance, card, bank, crypto, brokerage, derivatives, teen, business, savings, or merchant features as provider-backed modules with explicit compliance, eligibility, and feature-flag gates.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Zelle-branded app or imply affiliation with Zelle, its parent companies, card issuers, banking partners, brokers, clearing firms, crypto providers, exchanges, support teams, or regulators.
- Do not copy branding, logos, screenshots, app icons, marketing copy, protected UI artwork, private APIs, risk models, support scripts, ranking systems, fee schedules, legal language, or proprietary account data.
- Do not process production money movement, deposits, card transactions, crypto transfers, securities trades, derivatives, tax records, disputes, chargebacks, credit, or identity decisions without separate legal, compliance, provider, and security approval.
- Do not treat financial, payment, crypto, investing, teen, business, tax, support, or data-rights behavior as generic app behavior.
- Do not claim exact native-device, account, notification, support, data export/deletion, regional, provider, or regulated-flow parity until lawful manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/zelle/id1260755201 | Official iOS listing, developer Early Warning Services, Finance category, bank-network positioning, app support, privacy-label, and release context | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.zellepay.zelle&hl=en_US | Official Android listing, package id, download scale, data-safety notes, bank/credit-union lookup, safety education, and support contacts | Verified 2026-04-17 |
| Homepage | https://www.zellepay.com/homepage | Public explanation of direct bank account movement, enrolled banking apps, email/mobile recipient entry, free consumer positioning, and bank lookup | Verified 2026-04-17 |
| How It Works | https://www.zellepay.com/how-it-works | Enrollment through mobile banking, recipient trust model, amount entry, enrolled and unenrolled recipient behavior, minute-level settlement caveat, and bank account requirement | Verified 2026-04-17 |
| About The Zelle Network | https://www.zellepay.com/safety-education/about-zelle-networkr | Network financial institution model, standalone app fallback, eligible debit card path, no sensitive account detail sharing, and directory lookup explanation | Verified 2026-04-17 |
| Safety Education Center | https://www.zellepay.com/zelle-safety | Pay it Safe education, trusted-recipient guidance, scam warning, direct-to-bank speed, and no-fee survey note | Verified 2026-04-17 |
| Zelle Safety 101 | https://www.zellepay.com/pay-it-safe/zeller-safety-101 | Trust-only usage, no-cancel warning once recipient is enrolled, correct alias verification, cash-like framing, and scam prevention | Verified 2026-04-17 |
| Network User Service Agreement | https://www.zellepay.com/legal/user-service-agreement | Direct-app eligibility, U.S. mobile/email/debit requirements, profile aliases, prohibited uses, send/receive/request terms, limits, delayed/blocked transfer, unauthorized-transfer procedures, cancellation, and arbitration | Verified 2026-04-17 |
| App Privacy Notice | https://www.zellepay.com/legal/legal-and-privacy | Zelle app privacy notice, data categories, retention, app versus bank-channel scope, choices, and contact paths | Verified 2026-04-17 |
| Website Privacy Notice | https://www.zellepay.com/legal/website-privacy-notice | Website privacy scope, cross-context advertising, data rights, cookies/tracking, retention, and contact paths | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support bank-network lookup, mobile-banking app handoff, standalone app enrollment fallback, email alias, U.S. mobile alias, eligible debit card linking, device trust, profile cancellation, and signed-out, unsupported-bank, unsupported-card, duplicate-alias, and suspended states.
- Send money must require known/trusted recipient education, recipient alias confirmation, bank/network availability, amount entry, review, scam warning, submission, notification, direct-to-bank status, and no-cancel warning when the recipient is already enrolled.
- Receive money must support enrolled direct deposit into linked account, non-enrolled recipient invitation, pending return window, delayed/blocked transfer, failed delivery, and financial-institution support handoff.
- Request money must support recipient selection, amount, message, request sent, reject/ignore behavior, reminders where allowed, prohibition of debt-collection or unlawful requests, and no-guarantee disclosure.
- Limits must be bank-aware and direct-app-aware, including weekly send/receive limits, transaction count, risk-based reductions, non-user invite constraints, and clear copy when a transfer exceeds the current limit.
- Safety must make trust, correct mobile/email verification, cash-like finality, scam detection, unauthorized-transfer reporting, phone-loss/password-loss reporting, and bank-contact escalation central to the flow.
- Privacy must distinguish app users from bank-app users, expose notification preferences, profile cancellation/deletion, data retention, alias updates, marketing opt-out, and financial-institution privacy handoff.
- The clone must not hold customer deposits; all money movement must be represented as provider or partner-bank initiated with auditable directory messages, bank settlement events, and provider status.
- Business or commercial payments must be blocked unless a partner bank-specific small-business path is explicitly modeled and separately approved.
- Support must include customer-service phone/contact paths, financial-institution escalation, unauthorized transfer workflow, error investigation, and profile recovery.

### Build Plan

1. Foundation: model Zelle account variants, identity, sessions, profile, settings, legal consent, privacy, support cases, audit logs, feature flags, provider adapters, and synthetic fixtures.
2. Wallet or portfolio core: build home, account state, activity/history, search or recipient selection, detail pages, cached reads, notification center, and settings.
3. Primary transaction path: add server-owned previews, idempotent submissions, provider status, fee/quote refresh, receipt states, cancellation/refund/dispute paths where allowed, and support handoff.
4. Regulated modules: add cards, bank transfers, savings, crypto, brokerage, derivatives, teen, business, or merchant modules only behind eligibility, compliance, provider, and manual verification gates.
5. Trust and privacy: add scam/fraud education, blocked-action reason codes, statements, data export, account closure blockers, evidence redaction, role-based access, and privacy-safe analytics.
6. Native hardening: verify iOS/Android screens, permissions, push payloads, accessibility, offline/reconnect behavior, support paths, and regional/provider differences with lawful test devices/accounts.

## Core User Journeys

- User searches for their bank, finds Zelle in the banking app, enrolls an email or U.S. mobile number, and sees an education screen about only paying people they trust.
- Standalone-app user whose bank is not in network enrolls an eligible debit card, verifies identity, links one email/mobile alias, and sees direct-app send/receive limits.
- Sender chooses a trusted recipient by mobile number, reviews name/alias confirmation, enters amount, accepts scam/finality warning, submits, and receives direct-to-bank status.
- Sender enters a non-enrolled recipient alias, sees invitation and return-window behavior, cancels while allowed, or waits for automatic return if the recipient never enrolls.
- User receives a request, reviews who sent it and why, rejects or pays, and sees no-guarantee and debt-collection warning paths where applicable.
- User reports a lost phone or unauthorized transfer, is instructed to contact both Zelle and their financial institution, and sees claim, investigation, and decision states.
- Privacy-focused user updates alias and notification settings, cancels the direct-app profile, deletes the app, and sees data retention and bank-channel limitations.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Bank Lookup | Entry, bank search, and channel selection | bank, email, mobile, debit | bank found, app fallback, unsupported | bank missing, card ineligible, U.S. block |
| Enrollment | Alias, debit/bank profile, identity, and consent | mobile, email, card, address | new, verifying, enrolled, suspended | duplicate alias, burner phone, identity fail |
| Pay It Safe Primer | Trust, scam, finality, and correct-alias education | continue, learn, report | first-use, repeated, dismissed | high-risk recipient, suspicious request |
| Send Money | Recipient, amount, review, and submission | alias, amount, memo | draft, review, sent, failed | limit exceeded, blocked, delayed, cannot cancel |
| Request Money | Request creation and response | recipient, amount, note | sent, ignored, rejected, paid | debt-collection warning, recipient unavailable |
| Activity/Status | Transfer, request, delay, and return history | filter, detail, support | pending, complete, delayed, returned | technical failure, bank outage, fraud block |
| Profile/Aliases | Email/mobile aliases and linked account/card | alias, card, bank, update | active, updating, unlinked, canceled | number changed, alias conflict, profile inactive |
| Support/Error Resolution | Unauthorized transfer, app support, bank handoff | issue, call, evidence | submitted, investigating, resolved | bank term conflict, missing documents |
| Settings/Privacy | Notifications, marketing, deletion, legal notices | toggles, delete, privacy | active, cancellation requested, closed | retention caveat, bank-channel limitation |

## Data Model

- UserProfile: name, U.S. address, email aliases, mobile aliases, app enrollment state, bank-channel marker, eligibility, and profile cancellation lifecycle.
- DeviceSession: device id, app version, push token, password or biometric state, lost-device flag, session expiry, and risk signals.
- NetworkInstitution: bank or credit union id, Zelle availability, channel, routing constraints, small-business support, limits, and support handoff metadata.
- LinkedDebitOrAccount: direct-app debit card or partner-bank account reference, verification state, ability to receive in minutes, owner match, and removal constraints.
- AliasDirectoryEntry: email/mobile alias, verification, attached profile, bank/institution marker, visibility, and last-confirmed timestamp.
- Transfer: sender, recipient alias, amount, memo, institution pair, submitted time, status, delay/block reason, cancellation eligibility, return status, and audit ids.
- PaymentRequest: requester, recipient, amount, message, status, reminders, reject/ignore state, prohibited-purpose flags, and expiry.
- LimitRule: channel, institution, send cap, receive cap, rolling window, risk adjustment, and user-facing explanation.
- SafetyWarning: trigger, trusted-recipient category, scam taxonomy, shown/accepted state, and blocked-action reason.
- SupportCase: unauthorized-transfer, error, lost-device, alias issue, bank escalation, evidence, investigation deadline, decision, and appeal path.
- PrivacyPreference: notification channels, marketing opt-out, profile cancellation, data-rights request, and retention caveat.
- AuditEvent: append-only record for enrollment, alias, transfer, request, delay, support, privacy, and security-sensitive changes.

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
- Manual verification test Zelle native screens, signup/login, primary transaction, account recovery, push payloads, support, data export, account closure, and provider-specific behavior before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party App Store, Google Play, help/support, privacy/legal, product, safety, and disclosure URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Zelle without copying assets, network traffic, private APIs, provider contracts, risk models, disclosure text, fee schedules, support scripts, or brand copy.
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
