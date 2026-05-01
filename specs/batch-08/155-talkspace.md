# Talkspace-Style Clone Spec

> Metadata
> - Inspiration app: Talkspace
> - Category: Online therapy and psychiatry
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store/Google Play listings, Talkspace help center, privacy policy, terms, therapy/psychiatry pages, and crisis-resource guidance.
> - Manual verification blockers: state-licensed therapist and prescriber network, insurance claim submission, controlled-substance policy, crisis escalation flows, and minor-age gating require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical/insurer partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original messaging-first therapy platform inspired by Talkspace: async text/voice/video messaging with a licensed therapist, optional psychiatry add-on, insurance or self-pay plans, and care-plan tooling. The clone requires a licensed clinical organization for therapists and psychiatrists.

This spec is implementation-ready for a V1 that targets documented public behavior. Therapist/prescriber licensure, insurance, psychiatry prescribing, crisis escalation, minor support, and media-message retention remain clinical/manual verification blockers.

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
| Apple App Store listing | https://apps.apple.com/us/app/talkspace-therapy-counseling/id661829386 | iOS listing, online therapy, messaging, live sessions, privacy labels | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.talkspace.talkspaceapp | Android listing, licensed-state matching, text/audio/video messages, insurance coverage, privacy reference | Verified 2026-05-01 |
| Talkspace Help Center | https://help.talkspace.com/hc/en-us | Access, matching, messaging, live sessions, account, billing, safety support | Verified 2026-05-01 |
| How Talkspace Works | https://help.talkspace.com/hc/en-us/articles/360057792572-How-Does-Talkspace-Work | Licensed provider by state, async messaging, live sessions, encrypted room | Verified 2026-05-01 |
| Privacy Policy | https://www.talkspace.com/public/privacy-policy | Privacy, health data, communication, disclosures, user rights | Verified 2026-05-01 |
| Psychiatry | https://www.talkspace.com/online-therapy/psychiatry | Psychiatry scope, medication-management orientation, prescriber visit behavior | Verified 2026-05-01 |
| Crisis Resources | https://www.talkspace.com/emergency-resources | Emergency and crisis limitations, immediate-help routing | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Intake, state-licensure routing, therapist matching.
- Async messaging (text, voice, video) thread with therapist.
- Optional live video or phone sessions.
- Psychiatry add-on: scheduled visits and medication management.
- Insurance eligibility and claim submission; self-pay fallback.
- Care plan with goals, check-ins, and progress.
- Crisis escalation with one-tap hotline resources.
- Matching must enforce state residence, provider license, plan/benefit eligibility, modality entitlement, capacity, and provider conflict checks.
- Async therapy room must support text, voice, picture, and video messages with media size limits, encryption, deletion/retention policy, and clinician response-window labeling.
- Live sessions must support video, phone, live chat, no-show, late provider, reschedule, and modality-switch states.
- Psychiatry must be a distinct clinical workflow with prescriber license checks, medication history, pharmacy handoff, controlled-substance gates, and follow-up cadence.
- Insurance workflows must support employer/plan entry, eligibility, claim submission, copay estimate, denial, EOB/claim summary, and self-pay fallback.
- Care plans must support goals, check-ins, provider-updated progress, and patient-visible revisions.
- Teen/minor flows must require guardian/legal review and a separately licensed provider pool.
- Crisis indicators in messages, media, live sessions, or intake must route to immediate support and adverse-event workflow.

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
- Message media upload fails after therapist notification; reconcile or retract notification.
- Provider response window is missed; escalate to support without promising clinical outcome.
- Employer/insurance eligibility is revoked mid-treatment; convert to self-pay or pause care with disclosure.
- Psychiatry prescribing is requested in an unsupported state or controlled-substance category; block and document.
- Crisis signal appears in an async message outside business hours; trigger crisis protocol independent of therapist availability.
- Teen patient reaches age-of-majority; re-consent and account ownership transition.
- User switches therapist while media messages are pending review; freeze pending access until ownership resolves.

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
- Messaging tests cover text, audio, picture, video, media limits, offline draft, upload retry, deletion/retention, and therapist response-window states.
- Live-session tests cover video, phone, chat, no-show, late provider, reconnect, modality switch, and reschedule.
- Psychiatry tests cover state license, prescriber matching, medication history, controlled-substance block, pharmacy handoff, and follow-up.
- Insurance tests cover employer benefit, payer eligibility, copay estimate, claim submit/deny, self-pay fallback, and EOB download.
- Crisis tests cover intake, message, media, live session, offline resources, and adverse-event audit.
- Minor tests cover guardian consent, teen support, provider eligibility, age transition, and data access.

## Acceptance Criteria

- No PHI in third-party telemetry.
- Crisis resources surface one-tap everywhere.
- State-licensure routing correct for therapy and psychiatry.
- Controlled-substance flows gated behind compliance flag.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Therapy, psychiatry, crisis, insurance, minor, and controlled-substance workflows have clinical/legal/compliance launch signoff.
- Media-message retention and access controls are documented, tested, and visible to support/clinical operations.

## Open Questions

- Which clinical organization contracts therapists and prescribers?
- Which insurance clearinghouse handles eligibility and claims?
- Will V1 support voice and video messages day-one or phase in?
- Which pharmacy network handles psychiatry Rx?
- What retention policy for message media after account deletion?

## Build Plan

- Phase 1: account, intake, eligibility, therapist matching, encrypted messaging room, response-window and crisis indicators.
- Phase 2: text/audio/picture/video messaging, media upload/retention, live video/phone/chat sessions, reschedule/no-show.
- Phase 3: psychiatry intake, prescriber matching, medication management, controlled-substance gates, pharmacy handoff.
- Phase 4: insurance/employer benefits, claims, copay/self-pay states, claim-summary downloads, billing support.
- Phase 5: care plans, progress check-ins, therapist switches, teen/minor gates, provider operations dashboard.
- Phase 6: crisis/adverse-event workflow, privacy/security/access-control audit, accessibility, manual clinical verification, launch gate.

## Next Steps

- Clinical organization and clearinghouse RFPs.
- HIPAA, DEA, and state-licensure review.
- Select clinical, prescriber, pharmacy, payer/clearinghouse, video/media, crisis-response, and billing partners.
- Complete manual therapy, psychiatry, insurance, crisis, media, and minor verification before parity claims.
