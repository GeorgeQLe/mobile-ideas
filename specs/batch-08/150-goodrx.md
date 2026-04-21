# GoodRx-Style Clone Spec

> Metadata
> - Inspiration app: GoodRx
> - Category: Prescription price comparison and coupons
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and pharmacy-partnership disclosures pending exact URL verification.
> - Manual verification blockers: pricing feed updates, coupon redemption at pharmacy POS, subscription (Gold-like) enrollment, and telehealth add-on flows require hands-on verification with a real pharmacy.
> - Legal scope: lawful functional parity only; original code, brand, copy, and pharmacy/PBM/telehealth partnerships. Operator is not a pharmacy or prescriber; no medical advice.

## Overview

Build an original prescription price-comparison and coupon app inspired by GoodRx: drug search, price comparison across nearby pharmacies, transferable discount coupons, pharmacy locator, a Gold-style optional subscription for deeper discounts, and optional telehealth add-ons via licensed partners.

The clone must use original copy and integrations. It must handle prescription PHI carefully and avoid offering medical advice. Licensing and partnership agreements with PBMs/pharmacies are prerequisites.

This spec is Draft 1: surfaces ready; PBM/pharmacy pricing feeds, coupon-at-POS redemption, and telehealth add-ons remain behind compliance/partner review.

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
| Apple App Store listing | https://apps.apple.com/us/app/goodrx-prescription-coupons/id449815601 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.goodrx | Android features | Source discovery — pending exact URL verification |
| Product support | https://support.goodrx.com/ | Feature behavior | Source discovery — pending exact URL verification |
| Legal & disclosures | https://www.goodrx.com/legal | Partnership disclosures references | Source discovery — pending exact URL verification |
| NCPDP reference | https://www.ncpdp.org/ | BIN/PCN/GROUP structure education | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Drug search with autocomplete; drug identifiers (generic name, brand equivalents, dosage forms, strengths, quantities).
- Price comparison across nearby pharmacies using PBM pricing feed with timestamps.
- Coupon generation with BIN/PCN/GROUP/MEMBER that the pharmacy can process via NCPDP transaction.
- Save favorite pharmacies; save common prescriptions as saved Rx profiles.
- Subscription tier with deeper discounts; transparent pricing and cancel-anytime.
- Telehealth partner flows for a bounded set of conditions; redirect to partner UX where appropriate.
- Reminders for refills with local notifications and PHI-minimization.

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

## Acceptance Criteria

- No analytics pipeline records user+drug linkage beyond strictly necessary telemetry.
- Coupon details surface with valid BIN/PCN/GROUP/MEMBER and expiry.
- Subscription is cancel-anytime with transparent fees.
- Telehealth flows include "not for emergencies" and licensed-provider gating.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which PBM partner supplies pricing and coupon BIN/PCN profiles?
- Which pharmacy chains and independents are in V1 coverage?
- Which telehealth partner handles the add-on?
- Will V1 include mail-order fulfillment option?
- How are refund/dispute flows handled for subscription users?

## Build Plan

- Phase 1: drug search, price comparison, coupon generation, pharmacy locator.
- Phase 2: saved Rx, favorites, ZIP persistence, reminders.
- Phase 3: subscription tier and deeper pricing.
- Phase 4: telehealth add-ons via partner.
- Phase 5: price alerts and account data controls.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- PBM and pharmacy partnership RFPs.
- Privacy/HIPAA counsel review.
- Replace discovery URLs with exact first-party URLs before implementation.
