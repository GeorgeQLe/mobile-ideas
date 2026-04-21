# Whoop-Style Clone Spec

> Metadata
> - Inspiration app: Whoop
> - Category: Fitness and recovery wearable companion
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and wearable-companion disclosures pending exact URL verification.
> - Manual verification blockers: strap firmware protocol, strain/recovery/sleep algorithms, coaching content licensing, and subscription hardware bundling require hands-on verification with a prototype device and partners.
> - Legal scope: lawful functional parity only; original code, brand, copy, and hardware partnerships. Not a medical device; no clinical claims.

## Overview

Build an original fitness and recovery companion app inspired by Whoop: continuous strap sensor sync, recovery/strain/sleep scoring, behavioral journaling, coaching, and a membership-only hardware model.

This spec is Draft 1: surfaces ready; strap pairing and firmware, algorithms, coaching content, and membership hardware logistics remain behind hardware/content partner review.

## Goals

- Strap pairing, continuous sync, battery and firmware management.
- Recovery, strain, and sleep scores with daily and weekly trends.
- Behavioral journal to correlate inputs with outcomes.
- Coaching content and training plans.
- Membership billing bundled with hardware.
- Explicit "not a medical device" framing.

## Non-Goals

- Do not provide medical diagnosis or advice.
- Do not copy Whoop trademarks or marketing copy.
- Do not share health data with advertisers or third parties without explicit opt-in.
- Do not collect data beyond fitness needs.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/whoop/id1143435522 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.whoop.android | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://support.whoop.com/ | Feature references | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.whoop.com/privacy | Data handling references | Source discovery — pending exact URL verification |
| Methodology pages | https://www.whoop.com/the-locker/ | Metric descriptions | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Strap pairing over BLE, firmware updates, battery pack management.
- Continuous sync and back-fill of sensor data.
- Recovery score (HRV-based), strain score (cardiovascular load), sleep score.
- Sleep coach with recommended bedtime.
- Behavioral journal tags (alcohol, stress, training type).
- Coaching library and training plans.
- Membership lifecycle, including pause and resume.

## Core User Journeys

- User pairs the strap and onboards with baseline captures.
- User checks morning recovery score and recommended strain.
- User records a workout with auto-detection or manual entry.
- User reviews sleep stages and a smart-wake recommendation for the next night.
- User logs journal tags to correlate with outcomes.
- User browses coaching content and training plans.
- User updates membership plan or pauses.
- User exports data or deletes account.
- User resolves sync issues with troubleshooting flow.
- User selects primary device from multiple paired straps.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Pair strap | pairing | paired | BLE denied |
| Home | Today's recovery/strain | quick actions | loaded | sync pending |
| Recovery Detail | Components and trend | view | loaded | insufficient data |
| Strain Detail | Activity load | workout list | loaded | missing workouts |
| Sleep Detail | Stages, coach | bedtime set | loaded | gap in data |
| Journal | Tags | add tag | saved | sync error |
| Workouts | Auto/manual entry | edit | saved | detection false-positive |
| Coaching | Library and plans | play | played | media error |
| Trends | Weekly and monthly | window | loaded | baseline pending |
| Membership | Plan and devices | pause, cancel | active | grace period |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |

## Data Model

- `User`: account, preferences, privacy settings.
- `StrapDevice`: id, firmware, battery, last sync.
- `RecoveryScore`: components, value, date.
- `StrainScore`: components, value, date.
- `SleepSession`: stages, recommended bedtime, score.
- `Workout`: type, intensity, duration, auto-detected flag.
- `JournalTag`: type, value, timestamp.
- `CoachingAsset`: id, title, media ref.
- `Membership`: plan, status, renewal.
- `AuditEvent`: consent and scope events.

## API And Backend Contracts

- `POST /auth/session`.
- `POST /devices/pair`, `PATCH /devices/:id/firmware`.
- `GET /recovery?date=`, `GET /strain?date=`, `GET /sleep/sessions`.
- `POST /workouts`, `PATCH /workouts/:id`.
- `POST /journal`, `PATCH /journal/:id`.
- `GET /trends?window=`.
- `GET /coaching/library`, `POST /coaching/play`.
- `POST /memberships/pause`, `POST /memberships/cancel`.
- `POST /account/export`, `POST /account/delete`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Continuous BLE sync per OS background rules.
- Push covers recovery score ready, workout detected, coach reminders.
- Push payloads avoid metric values; class-level copy only.
- Offline: last sync cached; all views render with local data.
- Workouts queue and upload when connectivity returns.

## Permissions, Privacy, And Safety

- Bluetooth permission required.
- Motion/activity permission for workout detection.
- Notification permission at contextual points.
- HealthKit/Health Connect optional with minimized scope.
- Explicit "not a medical device" disclosure; no clinical claims.
- Health data not shared with third parties without explicit opt-in.
- No health data in third-party analytics or ad SDKs.
- Export and delete controls explicit and complete.
- Minors require parental consent per app store rules.
- Launch owners: privacy counsel, hardware ops, security.

## Analytics And Monetization

- Privacy-safe events: app engagement, coaching usage class.
- Monetization via membership subscription (hardware included).
- No health data in third-party telemetry.

## Edge Cases

- Strap unworn; signals unavailable.
- BLE permission denied.
- Workout auto-detection false-positive; easy dismiss.
- Firmware update failure; retry flow.
- Time-zone/DST change; day-boundary recompute.
- Multiple straps per user; primary logic.
- Membership pause abuse; fair-use cap.
- Coaching media offline; retry.
- Account deletion with active membership.

## Test Plan

- Pairing and firmware lifecycle.
- Recovery, strain, and sleep algorithm boundary tests.
- Workout auto-detection accuracy and dismiss.
- Time-zone/DST day-boundary recompute.
- Membership lifecycle reconciliation.
- HealthKit/Health Connect scope toggle.
- Export and deletion completeness.
- Coaching media playback.
- Accessibility across scores and trends.
- Manual verification with strap hardware.

## Acceptance Criteria

- App never shows clinical claims or diagnoses.
- Health data never appears in third-party telemetry.
- Membership cancel-anytime with transparent fees.
- Export and deletion are user-initiated and complete.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which hardware partner supplies the strap?
- Which coaching content partner or in-house studio?
- Which markets and languages for V1?
- How are subscription pauses metered to prevent abuse?
- What retention for raw sensor data after deletion?

## Build Plan

- Phase 1: pairing, sync, home, recovery and strain.
- Phase 2: sleep detail and coach.
- Phase 3: workouts (auto and manual) and journal.
- Phase 4: coaching library and training plans.
- Phase 5: membership lifecycle and HealthKit/Health Connect.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Hardware and coaching partner RFPs.
- Privacy counsel review and "not a medical device" disclosure review.
- Replace discovery URLs with exact first-party URLs before implementation.
