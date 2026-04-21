# Hims & Hers-Style Clone Spec

> Metadata
> - Inspiration app: Hims & Hers
> - Category: Direct-to-consumer telehealth and wellness
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and telehealth partner disclosures pending exact URL verification.
> - Manual verification blockers: state-by-state clinician licensure, async prescribing policies, subscription refill fulfillment via partner pharmacies, and category-specific compliance (sexual health, weight, mental health) require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical/pharmacy partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original direct-to-consumer telehealth and wellness platform inspired by Hims & Hers: condition-based intake, async clinician review, prescription fulfillment via partner pharmacies on subscription, and a complementary wellness product shop.

This spec is Draft 1: surfaces ready; state licensure orchestration, controlled-substance policy, insurance handling, and minor gating remain behind compliance/clinical review.

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
| Apple App Store listing | https://apps.apple.com/us/app/hims-hers-health/id1478720487 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.himshers.app | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://www.hims.com/help | Visit and subscription references | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.hims.com/privacy-policy | PHI handling references | Source discovery — pending exact URL verification |
| Condition category pages | https://www.hims.com/categories | Category scope | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Condition-based intake with tailored questionnaires.
- Clinician review queue with async messaging and video visits when required.
- Prescription issuance and recurring fulfillment via partner pharmacy.
- Subscription billing with pause/cancel; shipment tracking.
- Wellness shop separate from Rx catalog.
- Progress check-ins and refill reminders.
- Crisis resources for mental-health category.

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

## Acceptance Criteria

- No PHI in third-party telemetry.
- Subscriptions are cancel-anytime and refund policy disclosed.
- Controlled-substance flows gated behind compliance flag.
- Crisis resources one-tap reachable on mental-health surfaces.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which clinical organization contracts clinicians?
- Which pharmacy network handles fulfillment per category?
- Will V1 support insurance or cash-pay only?
- Which video SDK supports escalations?
- How are returns handled for wellness SKUs vs Rx?

## Build Plan

- Phase 1: category select, intake, clinician review stub.
- Phase 2: subscription and shipment, wellness shop.
- Phase 3: messaging and video escalation.
- Phase 4: progress tracking and refills cadence.
- Phase 5: crisis escalation, minor gating, audit logging.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Clinical and pharmacy partner RFPs.
- HIPAA/DEA compliance review.
- Replace discovery URLs with exact first-party URLs before implementation.
