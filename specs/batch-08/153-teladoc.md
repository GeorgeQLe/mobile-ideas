# Teladoc-Style Clone Spec

> Metadata
> - Inspiration app: Teladoc
> - Category: Telehealth
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store/Google Play listings, Teladoc support, notices, privacy-practices, and public service-line pages.
> - Manual verification blockers: state-by-state clinician licensure network, controlled-substance prescribing gating, behavioral-health escalation flows, and insurance claim integration require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical/insurer partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original telehealth platform inspired by Teladoc: on-demand virtual visits, scheduled appointments, prescription workflows, and behavioral-health services. The clone requires a licensed clinical organization to employ or contract clinicians and to hold state licenses.

This spec is implementation-ready for a V1 that targets documented public behavior. State licensure, controlled-substance policy, crisis escalation, payer integrations, provider network, and minor consent remain clinical/manual verification blockers.

## Goals

- On-demand general medical visits with a licensed clinician.
- Scheduled visits for specialties the partner supports.
- Prescription issuance per clinical partner's policies; pharmacy handoff.
- Behavioral-health visits with clinicians within scope.
- Insurance-aware visit cost estimation and claim handling.
- Clear "not for emergencies — call 911" guidance and crisis escalation.

## Non-Goals

- Do not provide medical advice outside a clinician visit.
- Do not copy Teladoc trademarks or marketing copy.
- Do not prescribe controlled substances without compliance gating.
- Do not collect PHI beyond what clinical workflows require.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/teladoc-health/id656872607 | iOS listing, virtual care, medical category, privacy labels, account and visit data classes | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.teladoc.members | Android listing, virtual care access, data-safety claims, member app behavior | Verified 2026-05-01 |
| Teladoc Support | https://www.teladochealth.com/support/ | Member support, visit prep, account, service access, clinical-scope orientation | Verified 2026-05-01 |
| Notices | https://www.teladochealth.com/notices/ | Privacy practices, legal notices, terms, HIPAA-related disclosures | Verified 2026-05-01 |
| Expert Medical Services | https://www.teladochealth.com/expert-medical-services/ | Specialty and expert medical service orientation | Verified 2026-05-01 |
| Mental Health | https://www.teladochealth.com/mental-health/ | Behavioral-health service orientation and risk category scope | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Visit intake with symptom and history capture; routes to appropriate service line.
- On-demand queue with estimated wait; scheduled calendar for specialties.
- Video and phone visits with clinician-selected modality.
- Prescription issuance per clinician decision; pharmacy search and handoff.
- Visit notes and after-visit summary; secure messaging within scope.
- Insurance-aware cost estimate and claim submission.
- Crisis/self-harm triage path with warm handoffs to crisis resources.
- Eligibility must be checked by plan/employer/payer configuration before showing service lines, copays, or appointment types.
- State and clinician licensure must be checked at intake, match, prescription, and dependent-profile changes.
- Visit room must support video, phone fallback, device checks, queue updates, clinician late/no-show, and handoff to support.
- Prescription workflows must require clinician decision, pharmacy selection, controlled-substance gating, allergy/medication review, and pharmacy send status.
- Behavioral-health flows must separate therapy, psychiatry, coaching, and crisis escalation with different consent and availability rules.
- After-visit summaries, invoices, claims, lab referrals, and clinical attachments must be downloadable and auditable.
- Dependent flows must support guardian consent, age-based service restrictions, context switching, and consent revocation.
- Push, SMS, and email notifications must be class-level and exclude diagnosis, medication, and clinician notes.
- Clinical operations dashboard must support queue management, escalation, adverse-event reporting, and audit trails.

## Core User Journeys

- User requests an on-demand visit, completes intake, and is matched to a clinician.
- User schedules a specialty visit (for example, dermatology or behavioral health).
- Clinician reviews intake, conducts visit, issues after-visit summary and optional Rx.
- User picks up Rx at chosen pharmacy; status updates surface.
- User messages clinician for follow-up within scope.
- User switches insurance; re-estimates costs and eligibility.
- User escalates safety concern; crisis path surfaces resources.
- User manages dependents with consent and minor-age rules.
- User downloads after-visit summary and shares with PCP.
- User deletes account and data with PHI-deletion guardrails.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home | Start visit, status | CTAs | loaded | state unsupported |
| Intake | Symptom and history | form answers | complete | gated by compliance |
| On-Demand Queue | Queue and wait | join, cancel | waiting, matched | clinician pool empty |
| Scheduled Visits | Calendar | slot | booked | no availability |
| Visit Room | Video/phone visit | camera, mic | connected | device permission denied |
| Prescription | Rx issued | pharmacy select | submitted | controlled-substance block |
| After-Visit Summary | Notes | download, share | ready | missing attachments |
| Messaging | Scope-limited DMs | text | sent | out-of-scope |
| Insurance | Eligibility and estimate | edits | verified | claim error |
| Crisis Resources | Escalation path | hotlines | visible | network offline |
| Dependents | Consent and access | add dependent | active | revoked |
| Account | Profile, privacy | edits | loaded | locked |

## Data Model

- `User`: account, state, insurance, dependents, privacy settings.
- `Visit`: service line, modality, clinician id, state, status, notes.
- `IntakeResponse`: schema version, answers, signed-at.
- `Prescription`: Rx id, drug, pharmacy id, controlled flag, status.
- `PharmacyOrder`: pharmacy id, Rx ids, status.
- `InsurancePlan`: payer, member id, verification status.
- `Claim`: visit id, payer, status, remittance.
- `Message`: thread id, scope, sender, body.
- `ConsentArtifact`: type, signed-at, version.
- `AuditEvent`: PHI access and consent events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /visits/on-demand`, `POST /visits/scheduled`.
- `POST /intake`, `GET /intake/:id`.
- `POST /visits/:id/join` (WebRTC session token).
- `POST /prescriptions`, `POST /pharmacies/handoff`.
- `GET /visits/:id/summary`.
- `POST /messages`, `GET /messages/thread/:id`.
- `POST /insurance/verify`, `POST /claims`.
- `POST /consents`, `POST /dependents`, `PATCH /dependents/:id`.
- `POST /account/delete`, `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Real-time queue updates and clinician-matching events via server-sent events or WebSockets.
- Push covers visit ready, clinician arrival, Rx status, message replies, reminders.
- Push payloads never contain diagnosis or Rx details; class-level only.
- Offline: read-only history and after-visit summary download.
- Crisis resources cached for offline access.

## Permissions, Privacy, And Safety

- "Not for emergencies — call 911" banners on intake and visit start.
- Camera and mic requested only at visit join.
- Notifications at contextual points.
- PHI minimization with encrypted-at-rest storage and BAAs with all partners.
- No PHI in third-party analytics or ad SDKs.
- HIPAA-compliant posture with audit logging of PHI access.
- State licensure checks before matching; disallowed states return blocking message.
- Controlled-substance prescribing gated behind compliance flags and DEA-aware review.
- Minor visits require parental/guardian consent artifacts.
- Self-harm or crisis triage escalation path with crisis hotline references.
- Launch owners: clinical director, privacy/HIPAA counsel, compliance, security.

## Analytics And Monetization

- Privacy-safe events: visit started/completed at class level, wait times, feature usage without diagnosis exposure.
- Monetization via per-visit charge, subscription, or employer/payer contracts.
- No PHI-linked segments across analytics.

## Edge Cases

- State licensure mismatch; block and message.
- Clinician drops connection; reconnect and reassign.
- Controlled-substance request; compliance-mediated flow.
- Minor without guardian consent; block and guide.
- Crisis indication; escalation path activates.
- Insurance denial post-visit; member-cost notification.
- Rx send failure to pharmacy; retry with alternatives.
- Multiple concurrent dependents; context switching safety.
- Partner backend outage; queue suspended messaging.
- Member eligibility changes while queued; preserve intake but stop matching until confirmed.
- Clinician determines issue is emergency or out of scope; hand off with safety messaging and no diagnosis.
- Pharmacy rejects prescription or asks for clarification; clinician workflow gets a task, member gets status only.
- Behavioral-health crisis signal appears in intake, chat, or visit; activate crisis protocol and document outcome.
- Minor dependent becomes age-ineligible for a service line; require updated consent or block.
- Patient crosses state lines between intake and visit; re-run licensure and service availability checks.
- Insurance claim denies after visit; show member-cost state and appeal/support path.

## Test Plan

- Intake schema versioning and back-compatibility.
- Queue and scheduled booking flows with clinician mocks.
- Video and phone visit reliability.
- Prescription issuance and pharmacy handoff with mocks.
- Insurance verification and claim submission.
- Crisis escalation path functional tests.
- PHI redaction in analytics, logs, and support tooling.
- Minor consent and dependent flows.
- Accessibility across intake and visit rooms.
- Manual verification with clinical partner and pharmacies.
- Eligibility tests cover payer-plan unavailable, employer benefit inactive, copay unknown, and service-line disabled.
- Licensure tests cover state unsupported, patient changes location, dependent location mismatch, and clinician license expiry.
- Queue tests cover clinician unavailable, late, reconnect, phone fallback, cancel, refund, and reschedule.
- Prescription tests cover pharmacy selection, allergy review, controlled-substance block, pharmacy reject, and no-Rx visit.
- Crisis tests cover self-harm intake, live-session escalation, offline resources, and adverse-event audit logging.
- Claims tests cover submit, deny, member-cost update, payer outage, and remittance reconciliation.

## Acceptance Criteria

- Visits never initiate in unsupported states.
- PHI is never present in third-party telemetry.
- Crisis resources surface within one tap from any visit screen.
- Controlled-substance flows gated behind compliance flag.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Every clinical service line has a named clinical owner, licensure policy, crisis protocol, and privacy/compliance signoff.
- Emergency, crisis, controlled-substance, minor, pharmacy, and payer failure states are covered by tests and launch flags.

## Open Questions

- Which licensed clinical organization contracts clinicians?
- Which pharmacy network handles Rx fulfillment?
- Which insurance clearinghouse is used?
- How are crisis escalations handed off operationally?
- What age thresholds define minor flows per state?

## Build Plan

- Phase 1: member account, eligibility model, service-line routing, intake schemas, on-demand queue, video/phone visit room.
- Phase 2: clinician decisioning, after-visit summaries, prescription/pharmacy handoff, allergies/medication review, pharmacy status.
- Phase 3: scheduled visits, specialty routing, dependent profiles, consent artifacts, state/licensure checks.
- Phase 4: payer estimates, claims submission, invoices, remittance reconciliation, denial/member-cost states.
- Phase 5: behavioral health, psychiatry rules, crisis escalation, adverse-event reporting, clinician operations dashboard.
- Phase 6: HIPAA/security/privacy audit, accessibility, clinical partner manual verification, pharmacy verification, launch gate.

## Next Steps

- Clinical and pharmacy partner RFPs.
- HIPAA and DEA compliance review.
- Select licensed clinical, telehealth SDK, payer/clearinghouse, pharmacy, crisis-response, and notification partners.
- Complete manual clinical queue, visit, prescribing, crisis, claims, and dependent verification before parity claims.
