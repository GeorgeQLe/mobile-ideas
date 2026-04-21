# Teladoc-Style Clone Spec

> Metadata
> - Inspiration app: Teladoc
> - Category: Telehealth
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and telehealth partner disclosures pending exact URL verification.
> - Manual verification blockers: state-by-state clinician licensure network, controlled-substance prescribing gating, behavioral-health escalation flows, and insurance claim integration require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical/insurer partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original telehealth platform inspired by Teladoc: on-demand virtual visits, scheduled appointments, prescription workflows, and behavioral-health services. The clone requires a licensed clinical organization to employ or contract clinicians and to hold state licenses.

This spec is Draft 1: surfaces ready; state-licensure orchestration, controlled-substance prescribing policies, crisis escalation, insurance claim filing, and minor consent flows remain behind compliance/clinical/partner review.

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
| Apple App Store listing | https://apps.apple.com/us/app/teladoc/id656872607 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.teladoc.members | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://www.teladochealth.com/support/ | Visit flow and scope | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.teladochealth.com/notices/ | PHI handling references | Source discovery — pending exact URL verification |
| Clinical scope pages | https://www.teladochealth.com/expert-medical-services/ | Specialty references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Visit intake with symptom and history capture; routes to appropriate service line.
- On-demand queue with estimated wait; scheduled calendar for specialties.
- Video and phone visits with clinician-selected modality.
- Prescription issuance per clinician decision; pharmacy search and handoff.
- Visit notes and after-visit summary; secure messaging within scope.
- Insurance-aware cost estimate and claim submission.
- Crisis/self-harm triage path with warm handoffs to crisis resources.

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

## Acceptance Criteria

- Visits never initiate in unsupported states.
- PHI is never present in third-party telemetry.
- Crisis resources surface within one tap from any visit screen.
- Controlled-substance flows gated behind compliance flag.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which licensed clinical organization contracts clinicians?
- Which pharmacy network handles Rx fulfillment?
- Which insurance clearinghouse is used?
- How are crisis escalations handed off operationally?
- What age thresholds define minor flows per state?

## Build Plan

- Phase 1: account, intake, on-demand queue, video visit.
- Phase 2: prescription issuance and pharmacy handoff.
- Phase 3: scheduled visits and specialty routing.
- Phase 4: insurance verification and claim submission.
- Phase 5: behavioral health visits and crisis escalation.
- Phase 6: minor consent, dependents, audit logging, manual verification.

## Next Steps

- Clinical and pharmacy partner RFPs.
- HIPAA and DEA compliance review.
- Replace discovery URLs with exact first-party URLs before implementation.
