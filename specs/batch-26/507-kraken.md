# Kraken-Style Clone Spec

> Metadata
> - Inspiration app: Kraken
> - Category: custodial crypto exchange app, KYC onboarding, portfolio, fiat funding, buy/sell/convert, transfer controls, alerts, support, market-risk disclosures, travel-rule and jurisdiction gates
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, help/support, privacy, terms/legal, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account creation/recovery, identity/KYC checks, funding instruments, payment authorization, withdrawals/payouts/repayments, push notifications, device permissions, support outcomes, provider integrations, sanctions/travel-rule/credit/partner-bank checks where applicable, and region-specific availability require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary financial data, private APIs, payment rails, customer records, provider contracts, model outputs, or unlicensed datasets.

## Overview

Build an original mobile product inspired by Kraken's public product, support, policy, and marketplace materials. V1 focuses on identity verification, account dashboard, fiat funding, crypto buy/sell, portfolio, alerts, withdrawals, support, market-risk disclosures. The clone must use original branding, original UI copy, synthetic sample data, licensed providers, and explicit disclosures whenever a requirement is inferred from public behavior rather than verified through lawful hands-on testing.

This spec is implementation-ready for a public-source V1. Behavior marked `Manual verification required` must stay behind a feature flag, simulator stub, or documented blocker until lawful device/account verification confirms exact native behavior.

## Goals

- Provide secure mobile onboarding, consent, account recovery, settings, support, export/delete, and accessibility flows.
- Support identity verification, account dashboard, fiat funding, crypto buy/sell, portfolio, alerts, withdrawals, support, market-risk disclosures with clear unavailable, pending, failed, blocked, held, canceled, expired, refunded, disputed, and recovered states.
- Preserve boundaries between identity, account, balance, quote, payment/funding, transfer/order/advance, recipient/wallet, alert, support, compliance, and provider data.
- Model guest, signed-in, verified, pending-review, rejected, restricted, region-blocked, provider-owned, expired, closed, refunded, disputed, and unavailable states without copying exact pricing, plan names, promotions, or legal copy.
- Require KYC/AML, sanctions screening, fraud/scam prevention, payment/payout/repayment correctness, licensing, disclosures, privacy, accessibility, support, and regulator-facing audit blockers before launch.
- Keep downstream scaffold repositories private and avoid parity claims until manual blockers are resolved.

## Non-Goals

- Do not imply affiliation with Kraken or its publisher.
- Do not copy proprietary screens, brand assets, marketing copy, private endpoint shapes, risk models, payment processor contracts, customer data, card data, wallet keys, or trading/remittance data.
- Do not move real money, issue credit, provide investment advice, custody crypto, transmit funds, execute trades, or connect production payment rails without separate legal, compliance, provider, and security approval.
- Do not store seed phrases, private keys, bank credentials, card PANs, identity documents, or sensitive support attachments in analytics, logs, crash reports, or noncompliant storage.
- Do not treat public marketplace blurbs as proof of exact native screen order, regional availability, fee math, support resolution, or regulated eligibility.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.kraken.com/features/cryptocurrency-apps | Public product positioning, core mobile workflow, availability framing, account/funding/payment surfaces, and support entry points | Verified 2026-05-04 |
| Support/help center | https://support.kraken.com/ | Public support taxonomy for onboarding, identity, funding, transfer/order/payment, dispute, refund, security, and account lifecycle flows | Verified 2026-05-04 |
| Privacy policy | https://www.kraken.com/legal/privacy | Personal, financial, device, location, analytics, support, fraud-prevention, retention, and privacy-rights handling | Verified 2026-05-04 |
| Terms or user agreement | https://www.kraken.com/legal | Eligibility, account obligations, prohibited use, fees, payment/transfer/credit/crypto risk disclosures, and legal boundaries | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/kraken-buy-bitcoin-crypto/id1481947260 | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.kraken.invest.app | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, KYC/payment/funding/withdrawal/repayment states, push payloads, provider integrations, support outcomes, and region-specific availability | Blocked pending lawful device/account verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out education, account creation, sign-in, recovery, eligibility notices, blocked account, unavailable region, and provider outage states.
- Identity and compliance checks must separate submitted, pending, approved, rejected, expired, escalated, and resubmission states with owner-visible recovery copy.
- Home must expose the latest account, quote, balance, transaction, repayment, transfer, wallet, or order state with loading, empty, degraded-network, stale-data, and support-needed variants.
- Primary quote flow must show source amount, destination/asset/recipient, fees, FX or price timestamp, estimated delivery, limits, risk notices, and required verification before consequential action.
- Recipient, bank, card, wallet, payroll, or repayment instrument management must distinguish verified, unverified, failed, expired, disabled, duplicate, and provider-owned states.
- Confirmation screens must summarize funding source, recipient/wallet/payee, delivery method, fee, rate/APR/repayment disclosure where applicable, cancellation/refund rules, and compliance review risk.
- Tracking/detail screens must expose pending, processing, held, sent, delivered, failed, canceled, refunded, disputed, chargeback, repayment-due, and support-escalated states.
- Settings must include profile, security, notification preferences, privacy policy, terms/legal, support, export/delete, linked providers, funding instruments, and regulatory disclosures.
- Entitlements and eligibility must model verified, unverified, waitlisted, restricted, suspended, region-blocked, provider-owned, quota/limit-exhausted, expired, refunded, and unavailable states.
- Provider calls require scoped credentials, redacted logs, idempotency keys, retry policies, canonical refetch, retention limits, and user-visible recovery.
- Analytics must avoid raw PII, bank credentials, card numbers, wallet addresses where unnecessary, seed phrases, identity documents, exact location trails, support attachments, and account identifiers.
- Fraud, scam prevention, account takeover, sanctions screening, KYC/AML, travel-rule/provider licensing, financial disclosures, credit or wage-access rules where relevant, and regulator-facing auditability are launch-blocking risk areas with named owners.
- Manual verification required: native permission prompts, marketplace privacy labels, identity review, funding/withdrawal/repayment execution, push payloads, provider integrations, support outcomes, and regional availability.

## Core User Journeys

- New user reviews consent and eligibility, creates an account, completes required identity/security steps, and reaches the main dashboard without unsupported permissions.
- Returning user reviews balance, quote, transaction, advance, wallet, or repayment state and resumes the most recent incomplete workflow safely.
- User creates a quote, reviews fee/rate/disclosure details, selects a funding or repayment instrument, confirms, and receives durable tracking state.
- User adds or edits a recipient, wallet address, bank account, card, payroll, or provider connection and handles verification failure without losing progress.
- User sees a compliance hold, fraud warning, provider outage, region block, quote expiry, insufficient funds, failed payment, rejected wallet address, or repayment issue and can recover or contact support.
- User configures alerts for status, security, repayment, price/rate, support, and marketing categories with opt-in controls.
- User requests cancellation, refund, dispute, chargeback help, data export, or account deletion and receives durable case state.
- Manual verification required: exact KYC, payment, payout, wallet signing, support, push, repayment, and region-specific native behavior.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Eligibility | Product education, legal eligibility, and account entry | taps, country/region, login, consent | signed-out, loading, eligible, ineligible, region-aware | unsupported region, legal restriction, network failure, stale app version |
| Auth / Recovery | Sign up, sign in, MFA, and account recovery | forms, OTP, biometrics, recovery links | empty, submitting, verified, locked, recovered | OTP expired, account locked, device risk, suspicious login |
| Identity / Compliance | KYC, verification, and compliance review | profile fields, documents, selfie, provider status | not-started, pending, approved, rejected, escalated | document failure, sanctions hit, manual review, resubmission required |
| Dashboard | Default account and latest activity surface | tabs, filters, refresh, deep links | empty, loading, loaded, degraded, stale | restricted account, provider outage, data mismatch |
| Quote / Calculator | Amount, destination/asset, fees, rate, and delivery estimate | amount, currency/asset, recipient, speed | quote-ready, expired, recalculating, blocked | limit exceeded, rate changed, unsupported corridor/asset |
| Recipient / Wallet / Instrument | Manage destination and funding/repayment methods | forms, scan, search, provider OAuth | verified, unverified, pending, disabled | invalid wallet/address, bank failure, duplicate, provider revoked |
| Confirmation | Final review before consequential action | quote, instrument, disclosure acceptance | ready, submitting, held, confirmed | payment failed, compliance hold, stale quote, user canceled |
| Activity / Detail | Track transfers, orders, advances, repayments, or wallet actions | transaction id, refresh, support link | pending, processing, completed, failed, canceled | refund pending, chargeback, delayed delivery, repayment overdue |
| Alerts / Messages | Status, security, marketing, repayment, and support alerts | toggles, quiet hours, categories | opted-in, opted-out, denied, muted | OS denied, push token expired, duplicate alert |
| Support / Dispute | Help articles, cases, refunds, disputes, and escalation | search, attachments, case forms | draft, submitted, in-review, resolved | missing evidence, unsafe attachment, duplicate case |
| Settings / Privacy | Profile, security, legal, providers, export/delete | toggles, links, destructive actions | loaded, saving, pending delete, exported | legal hold, active dispute, provider disconnect failed |
| Accessibility / Localization | Language, currency, dynamic type, screen-reader review | locale, font, motion, contrast | default, customized, reduced-motion | truncated disclosure, unsupported locale, contrast failure |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `AccountSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `IdentityCheck`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `RiskReview`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `SupportCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `AuditEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `LocalCacheRecord`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `NotificationPreference`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `PrivacyRequest`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `FiatAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `CryptoAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `Asset`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `OrderQuote`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `TradeOrder`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `Transfer`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `Deposit`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `Withdrawal`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `PriceAlert`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.
- `ComplianceHold`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, compliance flags, and audit metadata for Kraken-inspired workflows.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle with device-scoped audit events.
- `POST /identity/checks`, `GET /identity/checks/:id`, and `POST /identity/checks/:id/resubmit` for KYC, verification, and manual-review state.
- `GET /regions`, `GET /eligibility`, `GET /limits`, and `GET /disclosures` for jurisdiction, corridor, product, credit, crypto, or provider availability.
- `POST /quotes`, `GET /quotes/:id`, and `POST /quotes/:id/refresh` for fee, FX, price, delivery, repayment, or risk-disclosure quotes.
- `GET /instruments`, `POST /instruments`, `PATCH /instruments/:id`, and `DELETE /instruments/:id` for funding, payout, wallet, bank, card, payroll, or repayment methods.
- `POST /transactions`, `GET /transactions/:id`, `POST /transactions/:id/cancel`, `POST /transactions/:id/dispute`, and `GET /transactions/:id/events` for durable activity state.
- `GET /accounts`, `GET /balances`, `GET /statements`, `GET /alerts`, and `PATCH /notification-preferences` for dashboard and notification surfaces.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /refund-requests`, `POST /reports`, `POST /data-export`, and `GET /data-export/:id` for support and privacy lifecycle.
- Provider webhooks must include idempotency keys, signature validation, redacted payload logging, retry semantics, and canonical refetch after missed payment, payout, transfer, trade, repayment, or compliance events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, fraud hold review, compliance review, refund/dispute handling, account restriction, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, risk scores, or proprietary schemas from Kraken.

## Realtime, Push, And Offline Behavior

- Cache dashboard, recent activity, settings, legal links, support articles, and in-progress quotes with explicit size, TTL, and purge rules.
- Offline mode allows safe cached reads and low-risk drafts but blocks identity submission, money movement, crypto signing/trading, credit/advance acceptance, repayment changes, provider calls, and irreversible deletes.
- Reconnect must refetch canonical server state, de-duplicate submissions with idempotency keys, and show whether quotes, fees, repayments, transfers, trades, or support cases expired.
- Push notifications are opt-in by category and limited to account/security, quote expiry, transaction status, repayment/settlement, support, fraud/compliance, and marketing where allowed.
- Long-running workflows use polling, SSE, websocket, or provider webhook fallback with timeout, cancel, retry, and escalation states.
- Cached documents, identity data, wallet/payment references, support attachments, device metadata, and activity records purge on logout, account delete, retention expiry, policy change, or legal hold.

## Permissions, Privacy, And Safety

- Request camera, notifications, biometrics, contacts/share sheet, location, files, clipboard, or provider OAuth only at feature use and with a clear fallback.
- Permission screens must explain what is captured, where it is processed, retention, support access, and what remains available if denied.
- KYC/AML owner must approve identity-document handling, sanctions screening, politically exposed person review, adverse media handling where relevant, and resubmission flows before launch.
- Payments/compliance owner must approve money-movement, card/bank, wallet, repayment, refund, chargeback, and ledger reconciliation tests before launch.
- Security owner must approve MFA, device binding, account takeover detection, phishing/scam warnings, withdrawal/address-change holds, and sensitive-action reauthentication.
- Legal/regulatory owner must approve money-transmission, credit, wage-access, banking partner, crypto custody, securities/market-risk, tax, travel-rule, disclosure, and regional availability copy where relevant.
- Support access to identity, financial, wallet, transaction, repayment, and support records requires user consent, role-based controls, and auditable staff access.
- Export/delete must cover account data, profile, instruments, activity, alerts, support cases, documents, provider tokens, and legally deletable audit records while preserving legal holds.
- Safety copy must warn against scams, irreversible crypto sends, wrong recipients, quote/rate changes, repayment obligations, credit impact where relevant, and unsupported jurisdiction use.
- Analytics, crash logs, and support tooling must redact raw PII, payment credentials, bank details, seed phrases/private keys, identity documents, wallet addresses where unnecessary, and precise location.

## Analytics And Monetization

- Analytics events: onboarding started/completed, eligibility viewed, identity submitted, quote viewed/refreshed/expired, instrument added, confirmation submitted, activity viewed, support case submitted, export/delete requested, and notification preference changed.
- Event properties must use coarse product type, corridor/asset class, provider capability class, latency bucket, error code, status, disclosure version, entitlement state, and region class only.
- Monetization may include transfer fees, FX spread, subscription, interchange, referral, partner-bank economics, advance fee/tip, BNPL merchant fee, crypto spread, or on-ramp provider fee only after legal, tax, consumer-protection, and disclosure review.
- Payment, repayment, payout, withdrawal, refund, and fee logic must handle pending, authorized, captured, failed, reversed, charged back, settled, expired, provider-owned, tax-hold, and region-blocked states.
- Paywalls, fees, or account restrictions must not block safety reporting, account recovery, export/delete, privacy settings, dispute access, or legally required disclosures.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled corridor/asset/provider, blocked account, or stale app version.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate webhooks, timeout retry, quote expiry, rate changes, stale optimistic state, and idempotency-key replay.
- Recipient, wallet, bank, card, payroll, payout, repayment, or provider becomes unavailable, invalid, closed, sanctioned, restricted, expired, or region-blocked during an active workflow.
- Identity review fails, enters manual review, expires, requires resubmission, or conflicts with an existing account.
- Payment authorization, payout, withdrawal, cash pickup, mobile-wallet delivery, trade, advance, repayment, refund, or support case is interrupted by app termination.
- User requests export/delete while transactions, repayments, disputes, refunds, chargebacks, compliance holds, legal holds, or support cases remain active.
- Uploaded identity/support documents contain third-party data, children, health data, financial data, copyrighted material, or confidential material.
- Provider outage occurs after the user confirms an action but before canonical state is persisted.
- User attempts fraud, scam inducement, mule activity, sanctions evasion, account takeover, promo abuse, repayment avoidance, chargeback abuse, phishing, or unsafe sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, webhook order changes, or reconnect creates conflicting state.
- Regulator, banking partner, payment network, app store, crypto network, employer/payroll provider, or support policy disables a feature after data has been cached locally.

## Test Plan

- Unit tests for eligibility gates, state machines, quote expiry, idempotency keys, disclosure versioning, provider error mapping, and analytics redaction.
- Unit tests for identity, recipient/wallet/instrument validation, account restriction, refund/dispute eligibility, repayment status, and deletion/export rules.
- Contract tests for auth, identity, eligibility, quotes, instruments, transactions, alerts, support, privacy, and provider webhook routes.
- Integration tests for onboarding -> identity -> quote -> instrument -> confirmation -> tracking -> support/settings/delete.
- Integration tests for permission denial, unsupported region, provider timeout, quote refresh, stale data, compliance hold, failed payment, and support escalation.
- Offline tests for cached reads, draft preservation, blocked regulated writes, reconnect reconciliation, duplicate-submit prevention, and corrupt-cache recovery.
- Security tests for MFA, reauthentication, device binding, suspicious login, address/instrument changes, webhook signatures, and redacted logs.
- Safety/compliance tests for scam warnings, sanctions/AML holds, wrong-recipient warnings, irreversible crypto sends where relevant, credit/repayment disclosures where relevant, and support consent.
- Billing/payment tests for authorization, capture, settlement, reversal, refund, chargeback, payout, repayment, provider owner, tax hold, and region unavailable states.
- Privacy tests for provider request redaction, support access consent, metadata stripping, log scrubbing, export, delete, retention expiry, and legal hold exceptions.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, disclosure readability, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, account verification, payment/payout/repayment, push notifications, provider integrations, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/terms/marketplace URLs or explicit manual blockers for native/account evidence.
- A lawful V1 can be built with original branding, UI copy, sample data, licensed providers, and regulated workflows disabled until approved.
- Onboarding, identity, dashboard, quote, instrument, confirmation, activity detail, alerts, support, settings, export/delete, and accessibility screens are specified.
- Account, identity, provider, quote, transaction, instrument, support, analytics, privacy, compliance, and audit boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe money movement, crypto signing/trading, repayment changes, provider calls, profile-owner changes, or irreversible operations while offline.
- Category risks for KYC/AML, sanctions, financial licensing, provider licensing, money movement, payment/payout/repayment, fraud/scams, privacy, accessibility, support, and regulator-facing auditability have owners and tests.
- Manual verification blockers remain for native behavior that requires accounts, devices, permissions, marketplace labels, geolocation, payment methods, payout instruments, repayment instruments, identity documents, provider credentials, or regulated review.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active workflow failure, quota/limit exhaustion, compliance hold, offline recovery, export/delete, payment/payout/repayment restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact native marketplace privacy labels, release-note details, and screenshots should be treated as canonical after device verification?
- Which providers will power identity, KYC/AML, bank/card funding, wallet/on-chain data, quote/rate data, payroll, repayment, notifications, analytics, support, fraud prevention, and sanctions screening?
- Which regions, states, countries, corridors, assets, employers, banking partners, credit products, wallet networks, or regulators alter feature availability?
- Which uploads, identity records, transaction histories, support cases, risk signals, provider logs, and exports are retained for support, fraud prevention, legal obligations, or product improvement?
- Which disclosures are required for fees, FX spread, APR/repayment, wage-access, crypto risk, custody, no-investment-advice, partner-bank status, payment reversibility, or tax treatment?
- Which hands-on flows require paid access, special hardware, physical cards, geolocation, wallet funds, identity documents, real transfers, repayment instruments, support contact, or regulated sandbox review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, legal names, provider choices, regulated-feature flags, identity/KYC path, quote model, disclosure matrix, and manual blocker owners.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, identity, dashboard, quote, instrument, confirmation, activity, alerts, support, settings, and export/delete shells with original copy and synthetic data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, fraud/scam controls, compliance holds, dispute/refund/repayment flows, and privacy lifecycle.
- Phase 5: Complete accessibility, privacy, security, compliance, payment/payout/repayment, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before any one-for-one parity claim.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, account verification, and provider behavior.
- Verify identity, payment, payout, repayment, transfer/trade/advance, refund, dispute, support, and regional availability states with test accounts where allowed.
- Extend the Phase 5 implementation-plan queue after this ID is included in the readiness batch.
- Keep downstream scaffold repos private and label this source spec as implementation-ready only for original public-source V1 work.
