# Affirm-Style Clone Spec

> Metadata
> - Inspiration app: Affirm
> - Category: BNPL and consumer-credit shopping app, purchasing power, installment loan quote, Affirm Card management, autopay, repayment schedule, disclosures, disputes, and regulated credit review
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, help/support, privacy, legal/disclosure, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account creation/recovery, identity and credit eligibility checks, funding instruments, payment authorization, virtual card provisioning, repayment execution, refunds/disputes, push notifications, provider integrations, support outcomes, and region/state availability require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary risk models, private APIs, payment rails, customer records, provider contracts, or unlicensed datasets.

## Overview

Build an original mobile product inspired by Affirm's public product, support, policy, and marketplace materials. V1 focuses on shopping discovery, purchasing power, installment quotes, merchant checkout, virtual or in-store payment, repayment management, refunds/disputes, support, and regulated disclosures. The clone must use original branding, original copy, synthetic sample data, licensed providers, and explicit manual blockers for behavior that requires account, device, payment, or regulated verification.

This spec is implementation-ready for a public-source V1. Behavior marked manual verification required must stay behind feature flags, simulator stubs, or documented blockers until lawful device/account evidence confirms exact native behavior.

## Goals

- Provide secure onboarding, consent, account recovery, profile, support, export/delete, and accessibility flows.
- Support shopping discovery, spending or purchasing-power preview, installment quote, merchant checkout, payment instrument management, repayment reminders, refunds, disputes, and hardship/support flows.
- Preserve boundaries between identity, credit eligibility, account, merchant, order, installment plan, payment instrument, repayment, dispute, support, compliance, and provider records.
- Model guest, signed-in, eligible, ineligible, pending-review, restricted, suspended, region-blocked, quote-expired, merchant-unavailable, payment-failed, refunded, disputed, and closed states.
- Require credit disclosures, KYC/AML where applicable, fraud/scam controls, payment correctness, data minimization, accessibility, support, and regulator-facing audit blockers before launch.
- Keep downstream scaffold repositories private and avoid parity claims until manual blockers are resolved.

## Non-Goals

- Do not imply affiliation with Affirm or its publisher.
- Do not copy proprietary screens, brand assets, marketing copy, private endpoint shapes, underwriting models, payment processor contracts, customer data, merchant catalogs, or credit-risk data.
- Do not issue credit, move real money, store card PANs, collect bank credentials, or connect production payment rails without separate legal, compliance, provider, and security approval.
- Do not treat public marketplace blurbs as proof of exact native screen order, regional availability, fee math, support resolution, or eligibility decisions.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.affirm.com/app | Public product positioning, app workflow, merchant/payment surfaces, eligibility framing, support entry points, and disclosure links | Verified 2026-05-04 |
| Support/help center | https://helpcenter.affirm.com/s/ | Public support taxonomy for account, orders, payments, refunds, disputes, repayment, security, and account lifecycle flows | Verified 2026-05-04 |
| Privacy policy | https://www.affirm.com/privacy | Personal, financial, device, analytics, support, fraud-prevention, retention, and privacy-rights handling | Verified 2026-05-04 |
| Terms or user agreement | https://www.affirm.com/terms | Eligibility, account obligations, prohibited use, payment terms, disclosures, fees, repayment duties, and legal boundaries | Verified 2026-05-04 |
| Legal/disclosure page | https://www.affirm.com/licenses | Installment, credit, licensing, repayment, consumer-protection, and regulated disclosure framing | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/affirm-buy-now-pay-over-time/id967040652 | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.affirm.central | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, account eligibility, payment/funding/repayment states, push payloads, provider integrations, support outcomes, and region-specific availability | Blocked pending lawful device/account verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out education, account creation, sign-in, recovery, eligibility notices, blocked account, unavailable region, and provider outage states.
- Identity and eligibility checks must separate not-started, submitted, pending, approved, rejected, expired, escalated, and resubmission states.
- Home must expose purchasing power, active orders, repayment schedule, merchant discovery, alerts, support, and privacy/settings with loading, empty, stale, and restricted variants.
- Quote flow must show order amount, repayment cadence, down payment where applicable, APR/fee disclosure where applicable, due dates, late-fee risk, merchant eligibility, and expiration before consequential action.
- Checkout and virtual-card flows must distinguish merchant accepted, merchant blocked, card provisioned, wallet add pending, authorization failed, partial refund, chargeback, and provider-owned states.
- Payment instrument management must distinguish verified, unverified, failed, expired, disabled, duplicate, network-tokenized, and provider-owned states.
- Repayment management must support upcoming, due, autopay-on, autopay-off, paid, late, failed, rescheduled where allowed, hardship-support, refunded, disputed, and closed states.
- Settings must include profile, security, notification preferences, privacy policy, terms/legal, support, export/delete, linked providers, instruments, and regulated disclosures.
- Provider calls require scoped credentials, redacted logs, idempotency keys, retry policies, canonical refetch, retention limits, and user-visible recovery.
- Analytics must avoid raw PII, card or bank details, credit decision inputs, support attachments, account identifiers, and merchant order details beyond coarse categories.
- Fraud, scam prevention, account takeover, KYC/AML where applicable, credit disclosures, payment/repayment correctness, privacy, accessibility, support, and regulator-facing auditability are launch-blocking risk areas with named owners.
- Manual verification required: native permission prompts, marketplace privacy labels, eligibility review, payment/repayment execution, push payloads, provider integrations, support outcomes, and regional availability.

## Core User Journeys

- New user reviews consent and eligibility, creates an account, completes required identity/security steps, and reaches the main dashboard without unsupported permissions.
- Returning user reviews purchasing power, active orders, upcoming repayments, alerts, and support messages.
- User searches merchants, creates an installment quote, reviews disclosures, chooses a funding instrument, confirms, and receives durable tracking state.
- User creates or uses a virtual card, handles wallet provisioning failure, merchant rejection, stale quote, or authorization failure without losing account state.
- User changes notification preferences, repayment method, autopay status where allowed, or support contact details.
- User handles a refund, partial refund, dispute, payment failure, late payment, hardship question, account restriction, or provider outage.
- User requests data export or account deletion and receives durable case state with legal-hold exceptions.
- Manual verification required: exact eligibility, payment, virtual-card, support, push, repayment, and region-specific native behavior.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Eligibility | Product education, legal eligibility, and account entry | taps, region, login, consent | signed-out, loading, eligible, ineligible | unsupported region, age restriction, stale app version |
| Auth / Recovery | Sign up, sign in, MFA, and recovery | forms, OTP, biometrics, recovery links | empty, submitting, verified, locked | OTP expired, suspicious login, account locked |
| Identity / Credit Review | Identity, eligibility, and compliance review | profile fields, documents, provider status | not-started, pending, approved, rejected | manual review, adverse action notice, resubmission required |
| Dashboard | Purchasing power, orders, alerts, and shortcuts | tabs, refresh, deep links | empty, loading, loaded, stale | restricted account, provider outage, data mismatch |
| Merchant Discovery | Browse/search eligible merchants and offers | search, filters, categories | results, empty, saved, personalized | merchant unavailable, expired offer, disclosure missing |
| Quote / Installment Plan | Amount, cadence, due dates, fees/APR, and disclosure | amount, merchant, instrument | quote-ready, expired, recalculating, blocked | limit exceeded, disclosure not accepted, ineligible order |
| Virtual Card / Wallet | Provision and use payment credential | wallet action, merchant, authorization | ready, provisioning, added, used | wallet denied, authorization failed, merchant rejected |
| Order / Repayment Detail | Track order, payments, refunds, and disputes | order id, refresh, support link | active, due, paid, refunded, disputed | late, failed payment, chargeback, support escalation |
| Instruments | Manage cards, bank accounts, and repayment methods | forms, scan, provider OAuth | verified, unverified, pending, disabled | duplicate, expired, provider revoked |
| Alerts / Messages | Status, repayment, security, marketing, and support alerts | toggles, quiet hours, categories | opted-in, opted-out, denied, muted | OS denied, push token expired, duplicate alert |
| Support / Dispute | Help articles, cases, refunds, hardship, and escalation | search, attachments, case forms | draft, submitted, in-review, resolved | unsafe attachment, duplicate case, legal hold |
| Settings / Privacy | Profile, security, legal, providers, export/delete | toggles, links, destructive actions | loaded, saving, pending delete, exported | active order, legal hold, provider disconnect failed |
| Accessibility / Localization | Dynamic type, screen-reader, locale, and currency review | locale, font, motion, contrast | default, customized, reduced-motion | truncated disclosure, unsupported locale, contrast failure |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, retention policy, deletion/export behavior, risk flags, and audit metadata.
- `AccountSession`: device binding, MFA status, suspicious-login signals, token expiry, and revocation history.
- `IdentityCheck`: submitted fields, provider references, review status, resubmission reason, retention class, and audit trail.
- `EligibilityDecision`: region, amount, merchant, product, disclosure version, decision status, adverse-action placeholder, and expiry.
- `Merchant`: public profile, category, eligibility, offer metadata, blocked state, and disclosure requirements.
- `InstallmentQuote`: order amount, down payment, APR/fees where applicable, due dates, cadence, expiry, and disclosure acceptance.
- `PaymentInstrument`: card/bank token reference, verification status, provider owner, expiry, network token, and deletion rules.
- `VirtualCard`: tokenized credential state, merchant lock, wallet provisioning status, authorization status, and revocation rules.
- `Order`: merchant, amount, quote, lifecycle, refund/dispute state, fulfillment reference, and support linkage.
- `Repayment`: installment due date, status, autopay flag, retry state, failure code, late state, and hardship-support reference.
- `RefundCase`: refund amount, merchant status, repayment adjustment, dispute linkage, evidence, and case state.
- `SupportCase`: consented support access, attachments, category, status, staff actions, and resolution.
- `NotificationPreference`: category, channel, quiet hours, OS permission, and opt-in evidence.
- `PrivacyRequest`: export/delete type, legal hold, active-order exception, fulfillment state, and evidence links.
- `AuditEvent`: append-only record for sensitive writes, account changes, provider calls, support access, and disclosure acceptance.
- `LocalCacheRecord`: offline cache state, TTL, purge trigger, sync attempt, and conflict resolution.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle with device-scoped audit events.
- `POST /identity/checks`, `GET /identity/checks/:id`, and `POST /identity/checks/:id/resubmit` for identity and manual-review state.
- `GET /regions`, `GET /eligibility`, `GET /limits`, and `GET /disclosures` for jurisdiction, product, credit, and merchant availability.
- `GET /merchants`, `GET /merchants/:id`, and `GET /offers` for merchant discovery with localization, eligibility, and stale-data markers.
- `POST /quotes`, `GET /quotes/:id`, and `POST /quotes/:id/refresh` for installment, fee/APR, due-date, and disclosure quotes.
- `GET /instruments`, `POST /instruments`, `PATCH /instruments/:id`, and `DELETE /instruments/:id` for funding and repayment methods.
- `POST /virtual-cards`, `POST /virtual-cards/:id/wallet-token`, and `DELETE /virtual-cards/:id` for tokenized payment credentials.
- `POST /orders`, `GET /orders/:id`, `GET /repayments`, `POST /repayments/:id/pay`, and `POST /orders/:id/dispute` for durable activity state.
- `PATCH /notification-preferences`, `POST /support/cases`, `POST /refund-requests`, `POST /data-export`, and `GET /data-export/:id` for alerts, support, refunds, and privacy lifecycle.
- Provider webhooks must include idempotency keys, signature validation, redacted payload logging, retry semantics, and canonical refetch after payment, repayment, refund, dispute, or eligibility events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, fraud hold review, compliance review, refund/dispute handling, account restriction, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, risk scores, or proprietary schemas from Affirm.

## Realtime, Push, And Offline Behavior

- Cache dashboard, recent orders, repayment schedule, settings, legal links, support articles, and in-progress quotes with explicit TTL and purge rules.
- Offline mode allows safe cached reads and low-risk support drafts but blocks identity submission, payment authorization, virtual card provisioning, repayment changes, provider calls, and irreversible deletes.
- Reconnect must refetch canonical server state, de-duplicate submissions with idempotency keys, and show whether quotes, due dates, repayments, refunds, or support cases changed.
- Push notifications are opt-in by category and limited to account/security, quote expiry, order status, repayment, support, fraud/compliance, and marketing where allowed.
- Long-running workflows use polling, SSE, websocket, or provider webhook fallback with timeout, cancel, retry, and escalation states.
- Cached documents, support attachments, payment references, device metadata, and activity records purge on logout, account delete, retention expiry, policy change, or legal hold.

## Permissions, Privacy, And Safety

- Request camera, notifications, biometrics, files/photos, location for nearby/in-store features, clipboard, or provider OAuth only at feature use and with a clear fallback.
- Permission screens must explain what is captured, where it is processed, retention, support access, and what remains available if denied.
- Credit/compliance owner must approve eligibility, adverse-action notices where applicable, disclosure versioning, late-fee language, hardship support, and regional/state availability before launch.
- Payments owner must approve card/bank tokenization, wallet provisioning, authorization, capture, refund, chargeback, repayment, and ledger reconciliation tests before launch.
- Security owner must approve MFA, device binding, account takeover detection, phishing/scam warnings, instrument changes, webhook signatures, and redacted logs.
- Legal/regulatory owner must approve consumer-credit, money movement, bank/card network, merchant, privacy, accessibility, and marketing-copy boundaries.
- Support access to identity, financial, order, repayment, and support records requires user consent, role-based controls, and auditable staff access.
- Export/delete must cover account data, profile, instruments, orders, repayments, alerts, support cases, provider tokens, and legally deletable audit records while preserving legal holds.
- Analytics, crash logs, and support tooling must redact raw PII, payment credentials, identity documents, support attachments, and account identifiers.

## Analytics And Monetization

- Analytics events: onboarding started/completed, eligibility viewed, merchant searched, quote viewed/refreshed/expired, instrument added, virtual card provisioned, order confirmed, repayment viewed/paid, support case submitted, export/delete requested, and notification preference changed.
- Event properties must use coarse merchant category, product type, latency bucket, error code, disclosure version, eligibility state, repayment state, and region class only.
- Monetization may include merchant fees, interchange, service fees, interest/APR where legally supported, affiliate economics, subscriptions, referrals, or promotional placement only after legal, tax, consumer-protection, and disclosure review.
- Payment and repayment logic must handle pending, authorized, captured, failed, reversed, refunded, charged back, settled, expired, provider-owned, and region-blocked states.
- Paywalls, fees, or account restrictions must not block safety reporting, account recovery, export/delete, privacy settings, dispute access, or legally required disclosures.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled merchant, blocked account, or stale app version.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate webhooks, timeout retry, quote expiry, disclosure change, stale optimistic state, and idempotency-key replay.
- Merchant, wallet, card, bank, repayment provider, or offer becomes unavailable, invalid, closed, restricted, expired, or region-blocked during checkout.
- Identity or eligibility review fails, enters manual review, expires, requires resubmission, or conflicts with an existing account.
- Payment authorization, repayment, refund, dispute, or support case is interrupted by app termination.
- User requests export/delete while orders, repayments, disputes, refunds, chargebacks, compliance holds, legal holds, or support cases remain active.
- Uploaded identity/support documents contain third-party data, children, health data, financial data, copyrighted material, or confidential material.
- Provider outage occurs after the user confirms an action but before canonical state is persisted.
- User attempts fraud, scam inducement, account takeover, promo abuse, repayment avoidance, chargeback abuse, phishing, or unsafe sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, webhook order changes, or reconnect creates conflicting state.
- Regulator, bank/card network, payment provider, app store, merchant, or support policy disables a feature after data has been cached locally.

## Test Plan

- Unit tests for eligibility gates, quote expiry, installment state machines, idempotency keys, disclosure versioning, provider error mapping, and analytics redaction.
- Unit tests for identity, payment instrument validation, account restriction, refund/dispute eligibility, repayment status, and deletion/export rules.
- Contract tests for auth, identity, eligibility, merchants, quotes, instruments, virtual cards, orders, repayments, alerts, support, privacy, and provider webhook routes.
- Integration tests for onboarding -> identity -> merchant -> quote -> instrument -> confirmation -> repayment -> support/settings/delete.
- Integration tests for permission denial, unsupported region, provider timeout, quote refresh, stale data, compliance hold, failed payment, and support escalation.
- Offline tests for cached reads, draft preservation, blocked regulated writes, reconnect reconciliation, duplicate-submit prevention, and corrupt-cache recovery.
- Security tests for MFA, reauthentication, device binding, suspicious login, instrument changes, webhook signatures, and redacted logs.
- Compliance tests for disclosure acceptance, adverse-action placeholder, repayment reminders, late payment, refunds, disputes, hardship support, and support consent.
- Payment tests for authorization, capture, settlement, reversal, refund, chargeback, repayment, provider ownership, and region unavailable states.
- Privacy tests for provider request redaction, support access consent, metadata stripping, log scrubbing, export, delete, retention expiry, and legal hold exceptions.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, disclosure readability, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, account verification, payment/repayment, push notifications, provider integrations, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/legal/marketplace URLs or explicit manual blockers for native/account evidence.
- A lawful V1 can be built with original branding, UI copy, sample data, licensed providers, and regulated workflows disabled until approved.
- Onboarding, identity, dashboard, merchant discovery, quote, virtual card, instruments, order detail, repayment, alerts, support, settings, export/delete, and accessibility screens are specified.
- Account, identity, provider, quote, order, instrument, repayment, support, analytics, privacy, compliance, and audit boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe payment authorization, virtual-card provisioning, repayment changes, provider calls, profile-owner changes, or irreversible operations while offline.
- Category risks for credit disclosures, KYC/AML where applicable, financial licensing, provider licensing, payment/repayment, fraud/scams, privacy, accessibility, support, and regulator-facing auditability have owners and tests.
- Manual verification blockers remain for native behavior that requires accounts, devices, permissions, marketplace labels, geolocation, payment methods, repayment instruments, identity documents, provider credentials, or regulated review.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active workflow failure, limit exhaustion, compliance hold, offline recovery, export/delete, repayment restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact native marketplace privacy labels, release-note details, and screenshots should be treated as canonical after device verification?
- Which providers will power identity, credit eligibility, bank/card funding, virtual cards, repayments, notifications, analytics, support, fraud prevention, and compliance screening?
- Which regions, states, merchant categories, credit products, payment networks, or regulators alter feature availability?
- Which identity records, transaction histories, support cases, risk signals, provider logs, and exports are retained for support, fraud prevention, legal obligations, or product improvement?
- Which disclosures are required for fees, APR/repayment, late payment, merchant financing, bank partner status, payment reversibility, adverse action, or tax treatment?
- Which hands-on flows require paid access, physical cards, geolocation, wallet funds, identity documents, real purchases, repayment instruments, support contact, or regulated sandbox review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, legal names, provider choices, regulated-feature flags, identity/eligibility path, quote model, disclosure matrix, and manual blocker owners.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, identity, dashboard, merchant discovery, quote, virtual card, instrument, order, repayment, alerts, support, settings, and export/delete shells with original copy and synthetic data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, fraud/scam controls, compliance holds, dispute/refund/repayment flows, and privacy lifecycle.
- Phase 5: Complete accessibility, privacy, security, compliance, payment/repayment, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before any one-for-one parity claim.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, account verification, payment authorization, virtual-card provisioning, repayment, and provider behavior.
- Select licensed providers for identity, payment tokenization, merchant catalog, repayment processing, notifications, analytics, and support.
- Convert manual blockers into launch checklist items owned by compliance, payments, security, privacy, accessibility, and support leads.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest after the full Step 8.3 readiness range lands.
