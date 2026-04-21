# BetterHelp-Style Clone Spec

> Metadata
> - Inspiration app: BetterHelp
> - Category: Online therapy
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and therapy-platform disclosures pending exact URL verification.
> - Manual verification blockers: state-licensed therapist matching, insurance billing policies, crisis escalation flows, and minor-age gating require hands-on verification with a licensed clinical organization.
> - Legal scope: lawful functional parity only; original code, brand, copy, and clinical partnerships. Operator is not a clinical provider; no medical advice.

## Overview

Build an original therapy-matching platform inspired by BetterHelp: questionnaire-based therapist matching, recurring video/phone/chat sessions, journaling, and worksheets. The clone requires a licensed clinical organization to employ or contract therapists.

This spec is Draft 1: surfaces ready; state licensure orchestration, crisis escalation, minor-age gating, and billing remain behind compliance/clinical review.

## Goals

- Questionnaire to match a user to licensed therapists by state, modality, and focus.
- Recurring therapy sessions across video, phone, or chat.
- Secure messaging between sessions within scope.
- Journaling tools and assigned worksheets.
- Subscription billing with transparent pricing.
- "Not for emergencies" messaging and crisis escalation path.

## Non-Goals

- Do not provide medical or psychiatric advice outside a therapist session.
- Do not copy BetterHelp trademarks or marketing copy.
- Do not offer psychiatric prescribing (out of scope for therapy-only platform).
- Do not collect PHI beyond what clinical workflows require.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/betterhelp-therapy/id995252384 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.betterhelp | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://www.betterhelp.com/faq/ | Matching and session references | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.betterhelp.com/privacy/ | PHI handling references | Source discovery — pending exact URL verification |
| Clinical scope pages | https://www.betterhelp.com/what-is-online-counseling/ | Scope references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Match questionnaire (state, language, focus areas, modality preferences).
- Therapist profile with credentials, approach, availability.
- Recurring weekly sessions with modality choice.
- Secure, async messaging with scope boundaries.
- Journaling with private or shared-with-therapist mode.
- Assigned worksheets and progress tracking.
- Subscription billing with pause/cancel flows.

## Core User Journeys

- User completes questionnaire and is matched to a therapist within supported state.
- User books and joins a weekly session across video, phone, or chat.
- User messages therapist between sessions.
- User writes journal entries and optionally shares with therapist.
- User completes an assigned worksheet.
- User requests a therapist switch; relink to a new therapist.
- User pauses or cancels subscription.
- User sees crisis resources on any surface.
- User changes state of residence; rematch to available therapist.
- User deletes account and data with PHI-deletion guardrails.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Intake Questionnaire | Match inputs | answers | submitted | gated by state |
| Match | Therapist selection | pick, switch | matched | no match available |
| Therapist Profile | Credentials and style | book CTA | viewed | unavailable |
| Session Room | Video/phone/chat visit | camera/mic/text | connected | device permission denied |
| Messaging | Async threads | text | sent | out-of-scope |
| Journal | Entries | text | saved | sync error |
| Worksheets | Assignments | completion | submitted | partial save |
| Schedule | Recurring slots | change slot | booked | slot conflict |
| Subscription | Billing | pause, cancel | active | grace period |
| Crisis Resources | Hotlines | view | visible | offline fallback |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |

## Data Model

- `User`: account, state, preferences, privacy settings, age-gated flags.
- `Therapist`: id, licenses by state, focus areas, calendars.
- `Match`: user id, therapist id, created-at, switch history.
- `Session`: type, timestamps, status, notes (clinical).
- `Message`: thread id, sender, body, scope.
- `JournalEntry`: body, shared-flag, timestamps.
- `Worksheet`: template id, answers, status.
- `Subscription`: plan, status, renewal.
- `ConsentArtifact`: type, version, signed-at.
- `AuditEvent`: PHI access and consent events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /intake`, `POST /match`, `POST /match/switch`.
- `GET /therapists/:id`.
- `POST /sessions`, `POST /sessions/:id/join`.
- `POST /messages`, `GET /messages/thread/:id`.
- `POST /journal`, `PATCH /journal/:id`, `DELETE /journal/:id`.
- `POST /worksheets/:id/responses`.
- `POST /subscriptions`, `POST /subscriptions/pause`, `POST /subscriptions/cancel`.
- `POST /consents`, `POST /account/delete`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Real-time chat and session signaling via WebSocket; fall back to polling.
- Push covers session reminders, new messages, worksheet assignments.
- Push payloads avoid clinical content; class-level only.
- Offline: read-only journal and worksheet drafts with safe local encryption.
- Crisis resources cached for offline access.

## Permissions, Privacy, And Safety

- "Not for emergencies — call 911" banners on intake and session join.
- Crisis hotline references prominent and one-tap reachable.
- Camera and mic requested only at session join.
- Notification permission at contextual points.
- PHI minimization; encrypted-at-rest storage; BAAs with clinical and infrastructure partners.
- No PHI in third-party analytics or ad SDKs.
- HIPAA-compliant posture with audit logging of PHI access.
- State-licensure routing before matching.
- Minor-age gating with parental consent for supported states; otherwise block.
- Suicide or self-harm triage escalation path with warm handoffs.
- Launch owners: clinical director, privacy/HIPAA counsel, trust and safety, security.

## Analytics And Monetization

- Privacy-safe events: matching success class, session show-up class, retention.
- Monetization via subscription with transparent fees and cancel-anytime.
- No therapist-patient linkage in third-party telemetry.

## Edge Cases

- State without available therapists; block with clear message.
- Therapist leaves platform; automatic switch flow.
- Minor user in unsupported state.
- Crisis indication during chat; escalation path activates.
- Subscription pause abuse; fair-use cap.
- Duplicate journal entries; dedupe.
- Device mic/camera permission denied at session start.
- Worksheet assignment after cancellation; read-only mode.
- Cross-device session join collision.

## Test Plan

- Questionnaire validation and routing.
- Matching logic across states and modalities.
- Session reliability across video/phone/chat.
- Messaging scope enforcement.
- Journal encryption and share-flag handling.
- Worksheet completion and progress.
- Subscription lifecycle and billing reconciliation.
- Crisis escalation path and resource reachability.
- PHI redaction in analytics, logs, and support tooling.
- Accessibility across intake and session flows.

## Acceptance Criteria

- Matching never routes across unsupported states.
- Crisis resources surface within one tap on all surfaces.
- No PHI in third-party telemetry.
- Minor gating enforced per state policy.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which clinical organization contracts therapists?
- Which video SDK supports the session modality?
- Will V1 support insurance billing or subscription only?
- How are therapist switches throttled to prevent abuse?
- What is the retention period for journal data after account deletion?

## Build Plan

- Phase 1: account, intake, matching, therapist profiles.
- Phase 2: session room across video/phone/chat.
- Phase 3: messaging, journaling, worksheets.
- Phase 4: subscription billing and pause/cancel.
- Phase 5: crisis escalation path and minor gating.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Clinical organization partnership RFP.
- HIPAA and state-licensure review.
- Replace discovery URLs with exact first-party URLs before implementation.
