# GoodRx-Style Clone Spec

> Metadata
> - Inspiration app: GoodRx
> - Category: Prescription price comparison and coupons
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store/Google Play listings, GoodRx support/legal pages, GoodRx Care telehealth disclosures, and NCPDP public standards orientation.
> - Manual verification blockers: pricing feed updates, coupon redemption at pharmacy POS, subscription (Gold-like) enrollment, and telehealth add-on flows require hands-on verification with a real pharmacy.
> - Legal scope: lawful functional parity only; original code, brand, copy, and pharmacy/PBM/telehealth partnerships. Operator is not a pharmacy or prescriber; no medical advice.

## Overview

Build an original prescription price-comparison and coupon app inspired by GoodRx: drug search, price comparison across nearby pharmacies, transferable discount coupons, pharmacy locator, a Gold-style optional subscription for deeper discounts, and optional telehealth add-ons via licensed partners.

The clone must use original copy and integrations. It must handle prescription PHI carefully and avoid offering medical advice. Licensing and partnership agreements with PBMs/pharmacies are prerequisites.

This spec is implementation-ready for a V1 that targets documented public behavior. PBM/pharmacy pricing feeds, coupon-at-POS redemption, and telehealth add-ons remain manual verification blockers and must ship behind partner, compliance, and launch-readiness flags until verified.

## Goals

- Search drugs by name and dosage/form; compare prices at nearby pharmacies.
- Present transferable discount coupons via a BIN/PCN/GROUP/MEMBER structure provided by PBM partner.
- Pharmacy locator with distance, hours, and directions; integrate map tiles via licensed provider.
- Optional subscription (Gold-like) for deeper discounts with transparent fees.
- Telehealth add-ons via licensed partner for limited conditions; clear "not for emergencies" messaging.
- Price-history and refill reminders with PHI-minimization.

## Non-Goals

- Do not offer medical advice; do not imply substitution recommendations.
- Do not copy GoodRx trademarks or marketing copy.
- Do not collect or display more PHI than necessary.
- Do not ship controlled-substance-specific flows without compliance review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/goodrx-prescription-coupons/id449815601 | iOS listing, coupon search, pharmacy prices, account, privacy labels | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.goodrx | Android listing, prescription coupons, medication prices, reminders, app data-safety claims | Verified 2026-05-01 |
| GoodRx Support | https://support.goodrx.com/hc/en-us | Coupon use, account, prices, Gold, Care, pharmacy and customer-support behavior | Verified 2026-05-01 |
| GoodRx Terms of Use | https://support.goodrx.com/hc/en-us/articles/115005225563-GoodRx-Terms-of-Use | Service scope, third-party pharmacy fulfillment, telehealth consent, SMS, rewards, privacy-notice references | Verified 2026-05-01 |
| GoodRx Privacy Policy | https://www.goodrx.com/privacy-policy | Privacy, health data, disclosures, sensitive data consent, user controls | Verified 2026-05-01 |
| GoodRx Care | https://www.goodrx.com/care | Telehealth entry, condition-oriented visits, provider handoff expectations | Verified 2026-05-01 |
| NCPDP | https://www.ncpdp.org/ | Pharmacy transaction standards orientation for BIN/PCN/GROUP-style routing language | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Drug search with autocomplete; drug identifiers (generic name, brand equivalents, dosage forms, strengths, quantities).
- Price comparison across nearby pharmacies using PBM pricing feed with timestamps.
- Coupon generation with BIN/PCN/GROUP/MEMBER that the pharmacy can process via NCPDP transaction.
- Save favorite pharmacies; save common prescriptions as saved Rx profiles.
- Subscription tier with deeper discounts; transparent pricing and cancel-anytime.
- Telehealth partner flows for a bounded set of conditions; redirect to partner UX where appropriate.
- Reminders for refills with local notifications and PHI-minimization.
- Coupon price screens must label prices as estimates, identify the pharmacy, dosage, form, quantity, timestamp, and coupon terms.
- Coupon presentation must avoid implying insurance processing; it must clearly distinguish discount-card use from insurance benefits.
- Coupon troubleshooting must capture minimal context and redact drug names from third-party support tooling unless necessary for partner resolution.
- Gold-style membership states must include free, trial, active, grace, canceled, refund pending, platform-managed, and web-managed states.
- Care/telehealth entry must route through licensed-provider partners and block emergencies, unsupported states, minors when unsupported, and controlled-substance requests.
- Privacy surfaces must expose sensitive-health-data consent, data deletion, SMS opt-out, and partner disclosure links.
- Drug images, dosage guidance, substitutions, side-effect education, and medication comparison content must be sourced from licensed drug databases or omitted.
- Pharmacy hours, participation, and price availability must be treated as partner-supplied and stale unless refreshed by the quote endpoint.
- Account deletion must separately reconcile saved Rx, reminders, SMS enrollment, membership billing, and open support cases.

## Core User Journeys

- User searches a drug, selects dosage/form/quantity, and sees prices at nearby pharmacies.
- User selects a pharmacy, generates a coupon, and presents it at the counter (digital card or sendable text).
- User saves a favorite pharmacy and a saved Rx; reorders coupons quickly.
- User enrolls in subscription, sees deeper prices, and can cancel.
- User consults a telehealth partner for a condition; a prescription is issued by the partner clinician.
- User sets a refill reminder without storing PHI beyond what is necessary.
- User reviews price history and sees alerts for significant price drops (opt-in).
- User changes ZIP, observes different prices and pharmacies.
- User reports an issue with a coupon at POS; support case opened with minimum PHI.
- User deletes account and data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Search | Drug autocomplete | query | results, empty | feed outage |
| Drug Detail | Dosage/form/quantity | selections | ready | unsupported combo |
| Price Comparison | Nearby pharmacies | ZIP, radius | results, empty | no pharmacies in range |
| Coupon | BIN/PCN/GROUP/MEMBER | view, send via text | generated | expired, inactive |
| Pharmacy Map | Locator, hours, directions | map, filters | loaded | tile provider outage |
| Saved Rx | Saved prescriptions | manage list | saved, empty | sync error |
| Subscription | Enroll/cancel | plan | active, canceled | platform mismatch |
| Telehealth Entry | Condition categories | category | supported, unsupported | not-for-emergencies gate |
| Refill Reminders | Configure | cadence | active, paused | notification disabled |
| Price Alerts | Opt-in thresholds | thresholds | on, off | feed outage |
| Account | Profile, privacy, delete | edits | loaded | locked |
| Support | Cases | category | submitted | escalated |

## Data Model

- `User`: account, locale, ZIP, subscription id, privacy settings.
- `Drug`: generic, brand equivalents, dosage/form/strength, quantity units.
- `PriceQuote`: drug id, pharmacy id, price, timestamp, coupon profile ref.
- `Pharmacy`: partner id, address, hours, phone, geo.
- `CouponProfile`: BIN/PCN/GROUP/MEMBER, valid-from/to, payer ref.
- `SavedRx`: drug id + parameters, pharmacy preference.
- `Subscription`: plan key, status, platform.
- `Reminder`: drug id, cadence, quiet hours.
- `SupportCase`: issue, minimum context, resolution.
- `AuditEvent`: append-only consent and PHI-related events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/magic-link` (optional signed-in).
- `GET /drugs/search?q=`, `GET /drugs/:id`.
- `POST /prices/quote` (drug + ZIP + parameters), `GET /pharmacies?zip=&radius=`.
- `POST /coupons/generate` (scoped to quote id), `POST /coupons/:id/send-sms`.
- `POST /saved-rx`, `PATCH /saved-rx/:id`, `DELETE /saved-rx/:id`.
- `POST /subscriptions`, `POST /subscriptions/cancel`, `POST /billing/webhook`.
- `POST /telehealth/sessions` (handoff to partner), `GET /telehealth/sessions/:id`.
- `POST /reminders`, `PATCH /reminders/:id`, `DELETE /reminders/:id`.
- `POST /price-alerts`, `PATCH /price-alerts/:id`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Prices refresh on demand; cached quotes labeled with timestamps.
- Offline: saved Rx and coupons accessible; new price quotes require connectivity.
- Push covers refill reminders, price alerts, support updates.
- Push payloads avoid PHI; class-level messaging only.

## Permissions, Privacy, And Safety

- Location permission requested only for pharmacy locator (ZIP entry is default).
- Notifications for reminders/alerts at point of use.
- PHI minimization: drug/pharmacy combinations are minimized and encrypted.
- Do not share PHI with third-party analytics or ad SDKs.
- HIPAA-adjacent handling posture even where operator is not a covered entity; BAAs where required with partners.
- "Not medical advice" disclosures throughout; "not for emergencies" on telehealth entry.
- Launch owners: privacy/HIPAA counsel, pharmacy partner ops, security, compliance.

## Analytics And Monetization

- Privacy-safe events only: search class, pharmacy selection class (without PHI coupling), subscription events, reminder settings changes.
- Monetization via subscription and partner economics (PBM/pharmacy/telehealth) per contracts.
- Price-alert mechanics must not expose drug/user linkage to third-party analytics.

## Edge Cases

- Drug not in partner catalog; graceful fallback messaging.
- ZIP with no participating pharmacies.
- Coupon expired at counter; regenerate flow.
- Controlled-substance flag on drug; limited display, legal messaging.
- Subscription started on one platform, used on another.
- Telehealth state-by-state provider availability.
- Duplicate saved Rx entries; dedupe on save.
- Account deletion with active subscription; subscription must cancel and prorate if required.
- Feed outages; show last-known timestamps.
- Pharmacy refuses or cannot process the coupon; regenerate, switch pharmacy, or open minimal-PHI support case.
- User tries to combine a discount coupon with insurance; show non-insurance disclosure and require confirmation.
- Price changes between quote and counter; display timestamp and partner terms without guaranteeing final price.
- Drug search returns high-risk or controlled-substance terms; require compliance-reviewed display rules and block telehealth shortcuts.
- SMS coupon is sent to the wrong number; include opt-out and do not include unnecessary medication details in the message body.
- Subscription discount is not better than free coupon; disclose comparison and avoid dark-pattern upgrade pressure.
- Telehealth partner declines treatment; explain refund/next-step state without giving medical advice.

## Test Plan

- Drug search and autocomplete correctness.
- Price quote pipeline with stale-timestamp handling.
- Coupon generation and BIN/PCN/GROUP/MEMBER binding.
- Saved Rx and reminder flows.
- Subscription lifecycle with webhook reconciliation.
- Telehealth handoff flows with partner mocks.
- PHI redaction in analytics, logs, and support tooling.
- Controlled-substance display constraints.
- Accessibility across search, detail, and coupon screens.
- Manual verification: real pharmacy coupon redemption.
- Support-case tests confirm drug/pharmacy linkage is redacted from analytics and visible only in restricted partner-resolution views.
- Membership tests cover app-store purchase, web purchase, restore, cancellation, grace, refund, and cross-platform entitlement mismatch.
- Telehealth tests cover unsupported state, emergency disclaimer, minor gating, prescription declined, and partner handoff failure.
- Price freshness tests assert all quote and coupon screens display timestamps and stale-data messaging.
- SMS tests verify opt-in, coupon delivery, opt-out, wrong-number report, and PHI-minimized body content.

## Acceptance Criteria

- No analytics pipeline records user+drug linkage beyond strictly necessary telemetry.
- Coupon details surface with valid BIN/PCN/GROUP/MEMBER and expiry.
- Subscription is cancel-anytime with transparent fees.
- Telehealth flows include "not for emergencies" and licensed-provider gating.
- Manual verification blockers resolved or feature-flagged.
- All exact source links are current or refreshed before implementation starts.
- Any telehealth, pharmacy, PBM, or SMS partner integration has a documented contract, BAA or equivalent privacy review where required, and launch owner.
- Price, coupon, and membership screens avoid guaranteed-savings claims unless the partner contract supports them.

## Open Questions

- Which PBM partner supplies pricing and coupon BIN/PCN profiles?
- Which pharmacy chains and independents are in V1 coverage?
- Which telehealth partner handles the add-on?
- Will V1 include mail-order fulfillment option?
- How are refund/dispute flows handled for subscription users?

## Build Plan

- Phase 1: drug catalog, pharmacy locator, quote freshness model, coupon-generation contract, non-insurance disclosures, privacy-safe analytics.
- Phase 2: saved Rx, favorite pharmacies, ZIP/location fallback, refill reminders, SMS coupon delivery, and support-case redaction.
- Phase 3: membership entitlement service, app-store/web billing reconciliation, deeper-price display, cancellation/refund flows.
- Phase 4: telehealth partner handoff, state/minor/emergency gates, provider-status webhooks, and prescription-decline handling.
- Phase 5: price alerts, account deletion, sensitive-data consent controls, audit logging, and partner disclosure surfaces.
- Phase 6: PBM/pharmacy/manual coupon redemption verification, HIPAA-adjacent privacy review, accessibility, incident-response drill, launch gate.

## Next Steps

- PBM and pharmacy partnership RFPs.
- Privacy/HIPAA counsel review.
- Resolve PBM, pharmacy, SMS, telehealth, and licensed drug-database partners before unflagging production flows.
- Complete manual coupon-at-POS and telehealth handoff verification before claiming one-for-one parity.
