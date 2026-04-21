# Talkspace-Style Clone Spec

> Metadata
> - Inspiration app: Talkspace
> - Category: Online therapy and psychiatry
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and telehealth partner disclosures pending exact URL verification.
> - Manual verification blockers: state-licensed therapist and prescriber network, insurance claim submission, controlled-substance policy, crisis escalation flows, and minor-age gating require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical/insurer partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original messaging-first therapy platform inspired by Talkspace: async text/voice/video messaging with a licensed therapist, optional psychiatry add-on, insurance or self-pay plans, and care-plan tooling. The clone requires a licensed clinical organization for therapists and psychiatrists.

This spec is Draft 1: surfaces ready; state licensure orchestration, controlled-substance psychiatry prescribing, insurance claim submission, and crisis escalation remain behind compliance/clinical review.

## Goals

- Messaging-first therapy with async text, voice notes, and video messages.
- Optional live sessions (video or phone).
- Psychiatry add-on with scheduled visits for medication management.
- Insurance-aware coverage and claim submission; self-pay option.
- Care-plan tracking with goals and progress check-ins.
- "Not for emergencies" messaging and crisis escalation.

## Non-Goals

- Do not provide medical advice outside a clinician.
- Do not copy Talkspace trademarks or marketing copy.
- Do not prescribe controlled substances without compliance review.
- Do not collect PHI beyond clinical needs.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/talkspace-online-therapy/id661829386 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.talkspace.talkspaceapp | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://helpnow.talkspace.com/ | Messaging and session references | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.talkspace.com/public/privacy-policy | PHI handling references | Source discovery — pending exact URL verification |
| Psychiatry scope page | https://www.talkspace.com/online-therapy/psychiatry | Scope references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Intake, state-licensure routing, therapist matching.
- Async messaging (text, voice, video) thread with therapist.
- Optional live video or phone sessions.
- Psychiatry add-on: scheduled visits and medication management.
- Insurance eligibility and claim submission; self-pay fallback.
- Care plan with goals, check-ins, and progress.
- Crisis escalation with one-tap hotline resources.

## Core User Journeys

- User completes intake, verifies insurance, and is matched to a therapist.
- User messages therapist with text, voice, or video; therapist replies within policy-defined window.
- User books a live session; joins via video or phone.
- User adds psychiatry; books a prescriber visit; medication is managed over time.
- User checks progress on care plan goals.
- User switches therapist or cancels.
- User deletes account with PHI-aware deletion guardrails.
- User reaches crisis resources from any surface.
- User updates insurance plan; eligibility re-verified.
- User downloads claim summaries.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Intake | State, plan, focus | answers | submitted | state unsupported |
| Match | Therapist selection | pick, switch | matched | no match |
| Messaging Thread | Async messaging | text/voice/video | sent | size limit exceeded |
| Live Session Room | Video/phone visit | camera/mic | connected | device permission denied |
| Psychiatry Intake | Medical history | form | complete | compliance gate |
| Prescriber Visit | Scheduled visit | join | in-progress | rescheduled |
| Medication Tracker | Current Rx | adherence log | visible | controlled-substance note |
| Care Plan | Goals and check-ins | edits | updated | draft |
| Insurance | Card, eligibility | edits | verified | claim error |
| Crisis Resources | Hotlines | view | visible | offline fallback |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |

## Data Model

- `User`: account, state, insurance, privacy, age-gated flags.
- `Therapist`: id, licenses by state, modalities.
- `Prescriber`: id, licenses by state, specialties.
- `MessageThread`: participants, scope, messages.
- `Message`: type (text/voice/video), media refs, timestamps.
- `Session`: modality, clinician id, timestamps, notes.
- `Prescription`: drug, controlled flag, pharmacy id, status.
- `CarePlan`: goals, check-ins, progress.
- `InsurancePlan` and `Claim`: payer, member id, eligibility, remittance.
- `AuditEvent`: PHI access and consent events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /intake`, `POST /match`, `POST /match/switch`.
- `POST /messages`, `GET /messages/thread/:id`.
- `POST /sessions`, `POST /sessions/:id/join`.
- `POST /psychiatry/visits`, `POST /prescriptions`.
- `POST /care-plans`, `PATCH /care-plans/:id`.
- `POST /insurance/verify`, `POST /claims`, `GET /claims/:id`.
- `POST /consents`, `POST /account/delete`.
- `POST /media/upload` (voice/video messages).
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Messaging delivered near-real-time via push or WebSocket.
- Push covers new messages, session reminders, medication reminders.
- Push payloads exclude message bodies and diagnosis; class-level copy only.
- Offline: draft messages and cached thread metadata; media uploads queued.
- Crisis resources cached offline.

## Permissions, Privacy, And Safety

- "Not for emergencies — call 911" banners on all entry points.
- Camera, mic, and photo library requested only at contextual points.
- Notifications requested at contextual points.
- PHI minimization; encrypted-at-rest storage with customer-managed keys where supported.
- BAAs with clinical, telehealth, and infrastructure partners.
- No PHI in third-party analytics or ad SDKs.
- HIPAA-compliant posture with audit logging of PHI access.
- State-licensure routing before matching; psychiatry rules stricter.
- Controlled-substance prescribing gated behind compliance flag and DEA-aware review.
- Minor gating with parental consent per state rules.
- Crisis escalation path with warm hotline handoffs.
- Launch owners: clinical director, privacy/HIPAA counsel, compliance, security.

## Analytics And Monetization

- Privacy-safe events: message send class, session attendance, retention.
- Monetization via subscription and insurance reimbursement.
- No PHI-linked telemetry; metrics aggregated.

## Edge Cases

- Unsupported state for psychiatry even if therapy supported.
- Controlled-substance request; compliance-mediated handoff.
- Crisis indication in async message; escalation workflow.
- Insurance denial post-visit; member-cost notification.
- Media message too large; client-side chunking.
- Therapist out on leave; temporary cover policy.
- Minor across state lines; block and guide.
- Medication adherence log privacy.
- Partner outage; read-only mode with crisis resources intact.

## Test Plan

- Intake state-routing correctness.
- Messaging thread reliability and scope enforcement.
- Live session flow across modalities.
- Psychiatry add-on flow with prescriber mocks.
- Insurance verification and claim submission.
- Care plan progress tracking.
- Crisis escalation reachability under offline.
- PHI redaction in analytics, logs, and support tooling.
- Minor consent gating per state.
- Accessibility across messaging and live sessions.

## Acceptance Criteria

- No PHI in third-party telemetry.
- Crisis resources surface one-tap everywhere.
- State-licensure routing correct for therapy and psychiatry.
- Controlled-substance flows gated behind compliance flag.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which clinical organization contracts therapists and prescribers?
- Which insurance clearinghouse handles eligibility and claims?
- Will V1 support voice and video messages day-one or phase in?
- Which pharmacy network handles psychiatry Rx?
- What retention policy for message media after account deletion?

## Build Plan

- Phase 1: intake, matching, async messaging.
- Phase 2: live sessions (video and phone).
- Phase 3: psychiatry add-on and medication tracker.
- Phase 4: insurance verification and claims.
- Phase 5: care plans and progress.
- Phase 6: crisis escalation, minor gating, audit logs, manual verification.

## Next Steps

- Clinical organization and clearinghouse RFPs.
- HIPAA, DEA, and state-licensure review.
- Replace discovery URLs with exact first-party URLs before implementation.
