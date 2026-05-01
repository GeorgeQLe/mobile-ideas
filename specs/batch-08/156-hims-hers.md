# Hims & Hers-Style Clone Spec

> Metadata
> - Inspiration app: Hims & Hers
> - Category: Direct-to-consumer telehealth and wellness
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public app/web listings, Hims and Hers help/privacy/terms pages, category pages, telehealth disclosures, and public program/shop descriptions.
> - Manual verification blockers: state-by-state clinician licensure, async prescribing policies, subscription refill fulfillment via partner pharmacies, and category-specific compliance (sexual health, weight, mental health) require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical/pharmacy partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original direct-to-consumer telehealth and wellness platform inspired by Hims & Hers: condition-based intake, async clinician review, prescription fulfillment via partner pharmacies on subscription, and a complementary wellness product shop.

This spec is implementation-ready for a V1 that targets documented public behavior. Clinician licensure, category protocols, prescribing, pharmacy fulfillment, mental-health/crisis routing, compounded/weight-loss medication rules, insurance, and minor gates remain clinical/manual verification blockers.

## Goals

- Condition-based intake covering categories like dermatology, sexual health, hair, and mental wellness.
- Async clinician review, message-based follow-ups, and prescription issuance.
- Subscription refills shipped from partner pharmacy.
- Wellness shop with non-prescription products.
- Transparent pricing, pause/cancel, and shipment tracking.
- Crisis escalation path for mental-health category.

## Non-Goals

- Do not provide medical advice outside a clinician review.
- Do not copy Hims & Hers trademarks or marketing copy.
- Do not prescribe controlled substances without compliance review.
- Do not sell regulated products to unsupported states.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Hims App | https://app.hims.com/ | Care-team access, video/phone/chat, member shop, ordering, shipping, tracking, subscriptions | Verified 2026-05-01 |
| Hims Google Play listing | https://play.google.com/store/apps/details?id=com.himshers.hims | Android listing, telehealth categories, licensed providers, weight loss, labs, data-safety claims | Verified 2026-05-01 |
| Hers Google Play listing | https://play.google.com/store/apps/details?id=com.himshers.hers | Android listing, women-focused telehealth categories, care and fulfillment orientation | Verified 2026-05-01 |
| Hims Help Center | https://support.hims.com/hc/en-us | Account, orders, subscriptions, medical visits, pharmacy, shipping support | Verified 2026-05-01 |
| Hers Help Center | https://support.forhers.com/hc/en-us | Account, orders, subscriptions, medical visits, pharmacy, shipping support | Verified 2026-05-01 |
| Privacy Policy | https://www.hims.com/privacy-policy | Personal and health information handling, disclosures, rights, sensitive-data handling | Verified 2026-05-01 |
| Terms of Service | https://www.hims.com/terms-and-conditions | Telehealth service scope, subscriptions, medical relationship, user obligations | Verified 2026-05-01 |
| Categories | https://www.hims.com/categories | Category scope for condition-oriented care and wellness products | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Condition-based intake with tailored questionnaires.
- Clinician review queue with async messaging and video visits when required.
- Prescription issuance and recurring fulfillment via partner pharmacy.
- Subscription billing with pause/cancel; shipment tracking.
- Wellness shop separate from Rx catalog.
- Progress check-ins and refill reminders.
- Crisis resources for mental-health category.
- Category routing must separate Rx, OTC/wellness, mental health, sexual health, dermatology, hair, weight, labs, and shop workflows.
- Intake must include protocol version, contraindications, allergies, current meds, photos/labs where required, state eligibility, and age/category restrictions.
- Clinician review must support approve, decline, ask follow-up, require video, require labs, and emergency/crisis escalation states.
- Pharmacy fulfillment must support first fill, refill, shipment, pause, cancel, delay, adverse-event report, address change, and replacement shipment.
- Weight-loss and compounded-medication flows must include eligibility criteria, contraindication review, drug-shortage/availability states, and clinician-only dose changes.
- Mental-health flows must expose crisis resources and block emergencies before subscription or intake continuation.
- Member shop must segregate wellness products from prescription and clinical data; ad-tech must not join Rx care data.
- Subscription management must support category-specific cadence, shipment holds, refund policy, account deletion, and cross-platform support ownership.
- Progress entries/photos must require consent, retention rules, clinician access controls, and deletion/export behavior.

## Core User Journeys

- User selects a condition, completes intake, and is placed in clinician queue.
- Clinician reviews intake, optionally messages the user, and issues Rx or decline.
- User subscribes to refills and receives shipments with tracking.
- User messages clinician for follow-up within scope.
- User browses wellness shop and purchases non-Rx products.
- User pauses or cancels subscription.
- User updates address; recalculates eligibility and shipping.
- User deletes account and PHI.
- User receives crisis resources when mental-health intake flags concerns.
- User reviews progress photos or weight logs where applicable.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Category Select | Pick condition | selection | selected | state unsupported |
| Intake | Condition questionnaire | answers | submitted | compliance block |
| Clinician Review | Queue and updates | status, messages | pending, approved, declined | escalate to video |
| Messaging | Scope-limited DMs | text | sent | out-of-scope |
| Video Visit | Live visit when needed | camera/mic | joined | device permission denied |
| Prescription | Rx summary | view | active | controlled-substance block |
| Subscription | Refill plan | pause, cancel | active | grace period |
| Shipment Tracking | Status | timeline | shipped, delivered | carrier error |
| Wellness Shop | Non-Rx products | cart, checkout | in cart, purchased | out of stock |
| Progress | Photos/logs | upload, log | recorded | privacy opt-out |
| Crisis Resources | Hotlines | view | visible | offline fallback |
| Account | Profile, privacy | edits | loaded | locked |

## Data Model

- `User`: account, state, privacy settings, age flags.
- `IntakeResponse`: category, schema version, answers.
- `ClinicianReview`: intake id, clinician id, decision, notes.
- `Prescription`: drug, cadence, controlled flag, status.
- `Subscription`: plan, cadence, next-shipment, status.
- `Shipment`: carrier, tracking id, status timeline.
- `Product`: SKU, category (Rx/wellness), price.
- `Order`: items, totals, address, status.
- `ProgressEntry`: type (photo/weight), data, timestamps.
- `AuditEvent`: PHI access and consent events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /intake`, `GET /intake/:id`.
- `POST /clinician-reviews` (server-side from clinician workflow).
- `POST /messages`, `GET /messages/thread/:id`.
- `POST /visits/video`, `POST /visits/:id/join`.
- `POST /subscriptions`, `POST /subscriptions/pause`, `POST /subscriptions/cancel`.
- `GET /shipments/:id`.
- `POST /shop/orders`, `GET /shop/orders/:id`.
- `POST /progress`, `GET /progress`.
- `POST /account/delete`, `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Push covers intake status, clinician messages, shipment updates, refill reminders.
- Push payloads exclude diagnosis, drug names, and bodies.
- Offline: intake drafts with safe local encryption; tracking cache.
- Real-time messaging via WebSocket or push fallback.
- Crisis resources cached offline for mental-health surfaces.

## Permissions, Privacy, And Safety

- Camera and photo library only for progress photos and intake where needed.
- Mic and camera only at video visit.
- Notifications at contextual points.
- "Not for emergencies — call 911" banners and crisis hotline resources.
- PHI minimization; encrypted-at-rest; BAAs with clinical and pharmacy partners.
- No PHI in third-party analytics or ad SDKs.
- HIPAA-compliant posture with audit logging of PHI access.
- State-licensure routing per condition; some categories are stricter.
- Controlled-substance flows gated behind compliance flag.
- Minor gating; some categories are adult-only.
- Launch owners: clinical director, privacy/HIPAA counsel, compliance, security, fulfillment ops.

## Analytics And Monetization

- Privacy-safe events: intake category class, approval rate class, subscription lifecycle.
- Monetization via Rx subscription and wellness shop.
- No PHI-linked telemetry; ad SDKs excluded from Rx surfaces.

## Edge Cases

- Intake declined by clinician; refund/flow guidance.
- Shipment delayed; refill timing reminder.
- Controlled-substance request; handoff flow.
- Minor user in adult-only category.
- State unsupported for a category; block and guide.
- Subscription paused mid-cycle; prorate policy.
- Progress photo privacy; never shared without explicit consent.
- Crisis indication in mental-health intake; escalation path activates.
- Partner outage; fulfillment queue delay message.
- Clinician declines treatment based on contraindications; explain non-medical operational result and support/refund path.
- State becomes unsupported for a category after subscription starts; pause fulfillment and clinician review.
- Weight-loss medication supply changes or dose escalation unavailable; show clinician-managed alternative plan state.
- Mental-health intake suggests self-harm; activate crisis protocol and stop ordinary checkout.
- Shipping address changes to unsupported state; block shipment and require review.
- User orders wellness SKU and Rx subscription together; split privacy, fulfillment, returns, and support handling.
- Progress photo includes another person or sensitive background; warn and allow deletion before upload.
- Pharmacy recalls or shipment temperature issue; trigger notification and clinical/pharmacy workflow.

## Test Plan

- Intake schemas per category with compliance checks.
- Clinician review decision routing and messaging.
- Video visit reliability for escalation cases.
- Subscription and shipment lifecycle reconciliation.
- Wellness shop checkout including address mismatch.
- PHI redaction in analytics, logs, and support tooling.
- Minor gating and adult-only category enforcement.
- Crisis escalation path.
- Accessibility across intake and messaging.
- Manual verification with clinical and pharmacy partners.
- Category intake tests cover contraindications, photos/labs, adult-only gating, state unsupported, crisis flag, and clinician follow-up.
- Clinician-review tests cover approve, decline, request info, require video, require labs, adverse-event report, and audit trails.
- Fulfillment tests cover first fill, refill, shipment delay, address change, pharmacy reject, recall, replacement, pause, cancel, and refund.
- Weight-loss tests cover BMI/comorbidity eligibility, contraindications, dose changes, medication unavailable, compounded-drug disclosures, and lab requirements.
- Mental-health tests cover crisis resources, emergency block, provider handoff, and PHI-safe notifications.
- Shop tests assert wellness catalog analytics are separated from prescription and clinical care telemetry.

## Acceptance Criteria

- No PHI in third-party telemetry.
- Subscriptions are cancel-anytime and refund policy disclosed.
- Controlled-substance flows gated behind compliance flag.
- Crisis resources one-tap reachable on mental-health surfaces.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Every care category has clinical protocol ownership, licensure rules, prescribing policy, fulfillment policy, and privacy/compliance launch signoff.
- Rx, mental-health, weight-loss, labs, shop, and subscription flows are separable by flags and tested independently.

## Open Questions

- Which clinical organization contracts clinicians?
- Which pharmacy network handles fulfillment per category?
- Will V1 support insurance or cash-pay only?
- Which video SDK supports escalations?
- How are returns handled for wellness SKUs vs Rx?

## Build Plan

- Phase 1: account, category routing, protocol-versioned intake, eligibility gates, clinician-review workflow, privacy-safe analytics.
- Phase 2: prescriptions, pharmacy fulfillment, subscriptions, shipment tracking, address/state checks, pause/cancel/refund.
- Phase 3: care-team messaging, video/phone/chat escalation, follow-up requests, adverse-event and support workflows.
- Phase 4: weight-loss/lab/progress modules, dose-change workflow, photos/logs, lab results, clinician access controls.
- Phase 5: member shop, wellness checkout, category-specific marketing boundaries, crisis/minor/adult-only gates, operations dashboard.
- Phase 6: HIPAA/security/privacy/compliance audit, pharmacy/manual category verification, accessibility, launch gate.

## Next Steps

- Clinical and pharmacy partner RFPs.
- HIPAA/DEA compliance review.
- Select clinical, pharmacy, lab, fulfillment, video/chat, crisis-response, billing, and compliance partners.
- Complete manual category, prescription, shipment, mental-health, weight-loss, shop, and deletion verification before parity claims.
