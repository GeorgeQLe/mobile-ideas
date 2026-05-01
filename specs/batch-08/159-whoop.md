# Whoop-Style Clone Spec

> Metadata
> - Inspiration app: Whoop
> - Category: Fitness and recovery wearable companion
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store and Play Store listings, WHOOP support/privacy pages, public membership/wearable disclosures, and general-fitness wellness disclaimers.
> - Manual verification blockers: strap firmware protocol, strain/recovery/sleep algorithms, coaching content licensing, and subscription hardware bundling require hands-on verification with a prototype device and partners.
> - Legal scope: lawful functional parity only; original code, brand, copy, and hardware partnerships. Not a medical device; no clinical claims.

## Overview

Build an original fitness and recovery companion app inspired by Whoop: continuous strap sensor sync, recovery/strain/sleep scoring, behavioral journaling, coaching, and a membership-only hardware model.

This spec is implementation-ready for a V1 that targets documented public behavior. Strap pairing and firmware, sensor algorithms, coaching content, HealthKit/Health Connect behavior, and membership hardware logistics remain hardware/content/manual verification blockers.

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
| Apple App Store listing | https://apps.apple.com/us/app/whoop/id933944389 | iOS listing, health/fitness privacy labels, wearable companion scope | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.whoop.android | Android listing, Sleep/Strain/Recovery/Stress/Healthspan descriptions, Health Connect, wellness disclaimer | Verified 2026-05-01 |
| WHOOP Support | https://support.whoop.com/ | Account, device, membership, data, troubleshooting, and feature support | Verified 2026-05-01 |
| Privacy Policy | https://www.whoop.com/privacy | Health-data handling, disclosures, rights, retention, security references | Verified 2026-05-01 |
| WHOOP The Locker | https://www.whoop.com/the-locker/ | Public product education, metric orientation, coaching/membership context | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Strap pairing over BLE, firmware updates, battery pack management.
- Continuous sync and back-fill of sensor data.
- Recovery score (HRV-based), strain score (cardiovascular load), sleep score.
- Sleep coach with recommended bedtime.
- Behavioral journal tags (alcohol, stress, training type).
- Coaching library and training plans.
- Membership lifecycle, including pause and resume.
- Setup must separate account, membership status, strap pairing, charger/battery pack education, firmware update, and first-baseline expectations.
- Recovery must show components, confidence, missing-data states, and recommendations that avoid diagnosis or treatment claims.
- Strain must combine workouts, daily cardiovascular load, target/recommended strain, and overreaching warnings with wellness-only framing.
- Stress and health-insight surfaces must show trends, baselines, alerts, and "consult a professional" routing for concerning patterns without clinical conclusions.
- Health Connect/HealthKit integrations must be opt-in, scoped, revocable, deduplicated, and never required for core wearable sync.
- Membership must include free-trial/activation, renewal, pause, cancellation, device replacement, failed payment, and grace-period states.
- Coaching and AI-style guidance must be explainable, non-diagnostic, and suppress advice when data quality is poor.

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
| Device Setup | Pair strap and firmware | BLE scan, firmware confirm | paired, updating | wrong strap, update failed |
| Coach | Personalized guidance | prompt, goal | answered | low-confidence data |
| Stress/Health Insights | Baseline wellness trends | metric, range | loaded | baseline pending |
| Health Integrations | HealthKit/Health Connect scopes | toggles | connected | revoked, duplicate data |

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
- `StressSummary`: score, zone, contributors, confidence.
- `HealthInsight`: metric, baseline, trend, status, disclaimer.
- `FirmwareUpdate`: device id, version, state, failure reason.
- `IntegrationScope`: provider, read/write scopes, revoked-at.

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
- `GET /stress?date=`, `GET /health-insights?window=`.
- `POST /coach/queries`, `GET /coach/history`.
- `GET /membership`, `POST /membership/restore`.
- `POST /integrations/health-connect/scope`, `DELETE /integrations/:id`.

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
- First seven days lack baseline; coach and scores show "learning" states.
- Battery pack or strap firmware update fails mid-session.
- User changes training goal; strain recommendations update without rewriting history.
- Health Connect imports duplicate workouts; app reconciles and explains.
- Health insight appears concerning; app routes to professional-care copy without diagnosis.
- Membership expires while export/delete and basic account controls remain available.

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
- Firmware interruption and strap replacement tests.
- Health Connect/HealthKit duplicate and revocation tests.
- Membership trial, pause, cancel, failed-payment, and grace-period tests.
- Coach suppression tests for low-confidence data and medical-advice prompts.
- Privacy tests proving no raw metrics in support logs, push payloads, or third-party analytics.

## Acceptance Criteria

- App never shows clinical claims or diagnoses.
- Health data never appears in third-party telemetry.
- Membership cancel-anytime with transparent fees.
- Export and deletion are user-initiated and complete.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Device, firmware, HealthKit/Health Connect, membership, and coaching flows are launch-flagged until manual/partner verification passes.
- Recovery, strain, stress, and health-insight copy consistently uses general wellness framing.

## Open Questions

- Which hardware partner supplies the strap?
- Which coaching content partner or in-house studio?
- Which markets and languages for V1?
- How are subscription pauses metered to prevent abuse?
- What retention for raw sensor data after deletion?

## Build Plan

- Phase 1: account, membership activation, strap pairing, firmware state machine, sync cache, recovery/strain home.
- Phase 2: sleep detail, stress/health insights, baseline confidence, and wellness-only guidance.
- Phase 3: workouts, auto-detection review, journal correlations, trends, and HealthKit/Health Connect imports.
- Phase 4: coaching library, coach prompts, training plans, notifications, and support flows.
- Phase 5: membership lifecycle, device replacement, export/delete, privacy center, and analytics redaction.
- Phase 6: hardware/manual verification, security/privacy/legal review, accessibility, and launch gates.

## Next Steps

- Hardware and coaching partner RFPs.
- Privacy counsel review and "not a medical device" disclosure review.
- Select wearable, firmware, coaching, billing, and health-integration partners.
- Complete strap pairing, firmware, sensor, HealthKit/Health Connect, membership, export/delete, and privacy manual verification before parity claims.
