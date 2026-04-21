# Zocdoc-Style Clone Spec

> Metadata
> - Inspiration app: Zocdoc
> - Category: Doctor booking and provider search
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and provider marketplace disclosures pending exact URL verification.
> - Manual verification blockers: insurance eligibility verification with clearinghouse partners, provider calendar integrations, digital intake forms, and review moderation flows require hands-on verification with real providers.
> - Legal scope: lawful functional parity only; original code, brand, copy, and provider/insurer partnerships. Operator is not a provider; no medical advice.

## Overview

Build an original doctor-booking marketplace inspired by Zocdoc: search providers by specialty, insurance, and availability; book appointments; complete intake forms; and read patient reviews. The clone must use original copy and integrations. Provider onboarding, insurance eligibility verification, and review moderation require legal and compliance review.

This spec is Draft 1: surfaces ready; clearinghouse insurance eligibility, provider calendar integrations, digital intake schemas, and review moderation policies remain behind compliance/partner review.

## Goals

- Search providers by specialty, insurance, language, distance, and availability.
- Book an in-person or telehealth appointment with a provider.
- Digital intake forms routed to the provider before the visit.
- Patient reviews with moderation and defamation guardrails.
- Reminders and rescheduling flows.
- Insurance eligibility check before booking where supported.

## Non-Goals

- Do not provide medical advice or triage; surface "not for emergencies" guidance.
- Do not copy Zocdoc trademarks or marketing copy.
- Do not expose PHI to third-party analytics or ad SDKs.
- Do not bypass provider vetting or licensure checks.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/zocdoc-find-a-doctor/id391062219 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.zocdoc.android | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://www.zocdoc.com/faq | Booking and review policy | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.zocdoc.com/about/privacypolicy/ | PHI handling references | Source discovery — pending exact URL verification |
| Review policy | https://www.zocdoc.com/about/guidelines/ | Review moderation references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Search with filters: specialty, insurance plan, language, gender preference, distance, visit type.
- Provider profile with credentials, accepted insurance, hours, and review summary.
- Appointment booking with in-person and telehealth options.
- Digital intake forms with conditional logic, saved per patient.
- Patient reviews filtered by verified visit; moderation queue for guideline violations.
- Insurance eligibility verification via clearinghouse partner pre-booking.
- Reminders with reschedule and cancel actions.

## Core User Journeys

- User enters symptom or specialty and insurance; sees matching providers with next-available slots.
- User selects a provider, reviews profile, and books a slot.
- User completes intake forms before visit; data is routed to provider.
- User checks into a telehealth visit or gets directions to in-person visit.
- User reschedules or cancels with policy-aware messaging.
- User leaves a review after a verified visit; review enters moderation.
- User receives reminders and pre-visit checklist.
- User updates insurance card and rechecks eligibility.
- User reports a provider for guideline violation.
- User deletes account and intake data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Search | Providers by filters | specialty, insurance | results, empty | eligibility partner outage |
| Provider Profile | Credentials and slots | book CTA | available, full | no insurance match |
| Booking | Select slot and visit type | slot, in-person/tele | confirmed | slot just taken |
| Intake Forms | Pre-visit forms | answers | complete | partial save |
| Appointments | Upcoming and past | actions | loaded | empty |
| Reschedule | Change slot | new slot | rescheduled | cancellation fee |
| Telehealth Check-in | Join visit | camera/mic | joined | device permission denied |
| Reviews | Write or browse | rating, text | submitted | moderation pending |
| Insurance | Cards and plans | add, verify | verified, failed | plan not supported |
| Reminders | Pre-visit alerts | list | scheduled | notification disabled |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |

## Data Model

- `User`: account, insurance cards, privacy settings.
- `Provider`: id, specialty, credentials, locations, accepted plans, calendars.
- `Appointment`: provider id, patient id, slot, visit type, status.
- `IntakeForm`: schema, answers, signed-at, visit link.
- `InsurancePlan`: payer, member id, group id, verification status.
- `Review`: provider id, rating, text, verified flag, moderation status.
- `Reminder`: appointment id, cadence, status.
- `SupportCase`: topic, context, resolution.
- `AuditEvent`: PHI access and consent events.
- `ModerationQueueItem`: review id, flags, reviewer notes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/magic-link`.
- `GET /providers/search?q=&specialty=&plan=&zip=`.
- `GET /providers/:id`, `GET /providers/:id/slots`.
- `POST /appointments`, `PATCH /appointments/:id` (reschedule/cancel).
- `POST /intake-forms`, `GET /intake-forms/:id`, `PATCH /intake-forms/:id`.
- `POST /insurance/verify` (clearinghouse proxy).
- `POST /reviews`, `PATCH /reviews/:id`.
- `POST /moderation/reports`.
- `POST /telehealth/sessions/:id/join`.
- `POST /support/cases`, `POST /account/delete`.

## Realtime, Push, And Offline Behavior

- Push for booking confirmations, reminders, reschedules, and review moderation outcomes.
- Push payloads avoid PHI and provider identity specifics.
- Slot availability refreshed on demand; writes require connectivity.
- Telehealth joins rely on real-time session tokens refreshed per visit.
- Offline: read-only appointment summary, directions caching.

## Permissions, Privacy, And Safety

- "Not for emergencies — call 911" banners on triage-adjacent surfaces.
- Camera and microphone only at telehealth check-in.
- Location only for map-based discovery; ZIP entry is default.
- PHI minimization across search, booking, and intake telemetry.
- No PHI or insurance data in third-party analytics or ad SDKs.
- HIPAA-adjacent posture with BAAs with clearinghouse and telehealth partners.
- Review moderation policy to prevent PHI exposure or defamation.
- Licensure and state-availability checks before booking.
- Launch owners: privacy/HIPAA counsel, provider ops, trust and safety, security.

## Analytics And Monetization

- Privacy-safe events: search class, booking conversion, reschedule rate, without provider-patient linkage in third-party pipelines.
- Monetization via provider subscription or per-booking economics.
- Review-flagging and moderation metrics internal-only.

## Edge Cases

- Insurance plan unsupported; fallback messaging.
- Double-booked slot race condition; first-write-wins with retry.
- Intake form partially completed; resume safely.
- Review from non-verified visit; gate or label.
- Defamatory review; moderation removal path.
- Telehealth state-licensure mismatch after booking; reschedule path.
- Minor patient booking; parental consent flow.
- Provider leaves platform; appointment reassignment.
- Clearinghouse outage; offline eligibility fallback.

## Test Plan

- Search filters and ranking.
- Booking, rescheduling, and cancellation flows.
- Intake form schemas and conditional logic.
- Insurance eligibility handoff with clearinghouse mocks.
- Review submission and moderation pipeline.
- Telehealth join reliability.
- PHI redaction in analytics, logs, and support tooling.
- Minor-patient consent flows.
- Accessibility across search and booking.
- Manual verification with provider partners.

## Acceptance Criteria

- Booking never succeeds for unsupported insurance without clear disclosure.
- Analytics pipelines do not contain patient-provider linkage.
- Reviews are gated to verified visits and moderated per policy.
- "Not for emergencies" guidance surfaces on triage-adjacent screens.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which clearinghouse partner handles eligibility?
- Which telehealth SDK handles video visits?
- Which review-moderation vendor is used and what SLA?
- Will V1 cover specialty filtering beyond primary-care list?
- How are no-show fees policy-set per provider?

## Build Plan

- Phase 1: provider search, profile, booking (in-person only).
- Phase 2: intake forms and reminders.
- Phase 3: telehealth visits.
- Phase 4: insurance eligibility verification.
- Phase 5: reviews, moderation, and reporting.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Clearinghouse and telehealth partner RFPs.
- Privacy/HIPAA counsel and trust and safety review.
- Replace discovery URLs with exact first-party URLs before implementation.
