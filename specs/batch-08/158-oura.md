# Oura-Style Clone Spec

> Metadata
> - Inspiration app: Oura
> - Category: Sleep and wellness wearable companion
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store and Play Store listings, Oura support/legal/science pages, and public wearable wellness disclosures.
> - Manual verification blockers: ring firmware protocol, sensor fusion for sleep and temperature, HealthKit/Health Connect sync depth, and coaching content licensing require hands-on verification with a ring prototype and partners.
> - Legal scope: lawful functional parity only; original code, brand, copy, and hardware partnerships. Not a medical device; no clinical claims.

## Overview

Build an original sleep and wellness companion app inspired by Oura: sleep, readiness, and activity scoring from a wearable ring, trends for heart rate and temperature, and coaching content. The clone requires a companion ring; this spec focuses on the mobile app.

This spec is implementation-ready for a V1 that targets documented public behavior. Ring pairing protocol, sensor algorithms, HealthKit/Health Connect scope, firmware, membership operations, and coaching licensing remain hardware/content/manual verification blockers.

## Goals

- Ring pairing and firmware updates.
- Daily sleep, readiness, and activity scores.
- Heart rate and temperature trend visualizations.
- Coaching content with sessions and plans.
- Optional HealthKit/Health Connect integration with minimal scope.
- Explicit "not a medical device" framing.

## Non-Goals

- Do not provide medical diagnosis or advice.
- Do not copy Oura trademarks or marketing copy.
- Do not share health data with advertisers or third parties without explicit opt-in.
- Do not collect data beyond wellness and sensor needs.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/oura/id1043837948 | iOS listing, Sleep/Activity/Readiness scores, Apple Watch support, biometrics, privacy labels | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.ouraring.oura | Android listing, wellness-device disclaimer, data-safety posture, wearable requirement | Verified 2026-05-01 |
| Oura Help Center | https://support.ouraring.com/ | Account, ring setup, troubleshooting, membership, integrations, feature support | Verified 2026-05-01 |
| Privacy Policy | https://ouraring.com/legal/privacy-policy | Health-data handling, privacy rights, disclosures, retention controls | Verified 2026-05-01 |
| Oura Science | https://ouraring.com/science | Public metric framing, general wellness/science orientation, non-diagnostic posture | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Ring pairing over BLE, battery status, firmware updates.
- Sleep detection and stages with daily score.
- Readiness score combining recovery signals.
- Activity goals and step-like metrics.
- Heart rate and temperature trends over time windows.
- Coaching library with audio/video sessions.
- Optional write to HealthKit/Health Connect; user-controlled scope.
- Guided setup must separate account creation, ring sizing/ownership, Bluetooth permission, charger education, firmware update, and first-night baseline expectations.
- Daily summary must show readiness, sleep, and activity cards with component breakdowns, trend deltas, missing-data states, and clear non-diagnostic wording.
- Sleep analysis must support bedtime/wake detection, stages, timing, efficiency, latency, restfulness, overnight HR/HRV, respiratory-rate, and low-confidence nights.
- Readiness analysis must show contributors such as HRV balance, resting HR, body temperature deviation, sleep balance, recovery index, and prior activity load without clinical claims.
- Activity must support goals, inactivity alerts, workout import/logging, calorie/step-style metrics, recovery-balanced recommendations, and low-battery/off-wrist states.
- Temperature features must be framed as personal baseline deviations, not fever, fertility, pregnancy, or disease diagnosis.
- Health integrations must support read/write scope review, revocation, backfill limits, duplicate handling, and provider-specific error states.
- Membership or subscription gates must be transparent, restoreable, cancelable, and separated from hardware ownership and account deletion.

## Core User Journeys

- User pairs the ring over BLE; firmware updates apply if available.
- User wakes and sees last night's sleep score and stages.
- User checks readiness score and recommendations.
- User logs activity and completes a coaching session.
- User views temperature trend relative to baseline.
- User enables HealthKit/Health Connect selective export.
- User pauses data collection on demand.
- User deletes account and exports data.
- User reviews tags (workouts, caffeine) to annotate days.
- User changes measurement units and privacy settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Pair ring | pairing | paired | BLE denied |
| Home | Today's scores | quick actions | loaded | sync pending |
| Sleep Detail | Stages, HR overnight | browse dates | loaded | gap in data |
| Readiness Detail | Components and trend | view | loaded | insufficient history |
| Activity | Goals and history | log activity | loaded | sensor offline |
| Heart Rate Trends | Resting HR, HRV | window select | loaded | anomaly |
| Temperature Trends | Baseline and deviations | window select | loaded | baseline pending |
| Coaching | Library and plans | play | played | media error |
| Tags | Annotations | add tag | saved | sync error |
| HealthKit/Health Connect | Scope toggle | permissions | granted | denied |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |
| Ring Setup | Size, ownership, charger, firmware | BLE scan, firmware confirm | paired, updating | wrong ring, update failed |
| Today Summary | Three score cards and guidance | date, score card | complete, partial | no baseline, low battery |
| Trends | Longitudinal wellness charts | metric, range | populated | sparse history |
| Membership | Plan, restore, billing status | restore, manage | active, expired | hardware without membership |

## Data Model

- `User`: account, preferences, units, privacy settings.
- `RingDevice`: id, firmware version, battery, last sync.
- `SleepSession`: start, end, stages, score.
- `ReadinessScore`: components, value, date.
- `ActivitySummary`: steps, active minutes, goal.
- `HeartRateSeries`: type (resting/HRV), samples.
- `TemperatureSample`: baseline, deviation, date.
- `Tag`: type, note, timestamp.
- `CoachingAsset`: id, title, media ref.
- `AuditEvent`: consent and scope events.
- `WellnessBaseline`: metric, window, baseline value, confidence.
- `FirmwareUpdate`: device id, version, state, failure reason.
- `Membership`: plan, platform, renewal, grace-period state.
- `IntegrationScope`: provider, read scopes, write scopes, revoked-at.

## API And Backend Contracts

- `POST /auth/session`.
- `POST /devices/pair`, `PATCH /devices/:id/firmware`.
- `POST /sleep/sessions`, `GET /sleep/sessions?from=&to=`.
- `GET /readiness`, `GET /activity`.
- `GET /heart-rate/series`, `GET /temperature/samples`.
- `POST /tags`, `PATCH /tags/:id`.
- `GET /coaching/library`, `POST /coaching/play`.
- `POST /integrations/healthkit/scope`.
- `POST /account/export`, `POST /account/delete`.
- `POST /support/cases`.
- `GET /baselines`, `POST /baselines/recompute`.
- `POST /workouts/import`, `POST /workouts/manual`.
- `GET /membership`, `POST /membership/restore`, `POST /membership/cancel`.
- `POST /integrations/health-connect/scope`, `DELETE /integrations/:id`.

## Realtime, Push, And Offline Behavior

- BLE sync on open and background per OS rules.
- Push covers sync reminders, coaching recommendations.
- Push payloads avoid metric values; class-level copy only.
- Offline: last sync cached; all views render with local data.
- Firmware updates require connectivity and user confirmation.

## Permissions, Privacy, And Safety

- Bluetooth permission required for pairing and sync.
- Notification permission at contextual points.
- HealthKit/Health Connect requested only when user opts in; scope minimized.
- Explicit "not a medical device" disclosure and no clinical claims.
- Data stays on device or in user's account; no sharing with third parties without opt-in.
- Heart-rate and temperature data treated as sensitive health data with encryption.
- No health data in third-party analytics or ad SDKs.
- Export and delete controls explicit and complete.
- Minors require parental consent per app store rules.
- Launch owners: privacy counsel, hardware partner ops, security.

## Analytics And Monetization

- Privacy-safe events: app engagement, coaching usage class.
- Monetization via hardware margin and optional subscription for advanced insights.
- No health data in third-party telemetry or ad SDKs.

## Edge Cases

- Ring not worn; sleep score unavailable.
- BLE permission denied; guidance to settings.
- Firmware update failure; retry flow.
- Temperature baseline pending; transparent messaging.
- Time-zone change; recompute day boundaries.
- HealthKit/Health Connect revocation mid-session.
- Coaching media offline; retry or download.
- Multiple devices per user; primary selection.
- Account deletion with pending sync.
- Ring is lost, replaced, or reassigned to another account.
- First week lacks enough baseline data; all score cards show educational placeholders.
- Health integration creates duplicate workouts or contradictory sleep sessions.
- Temperature deviation is high; app routes to general "consult a professional" copy without diagnosis.
- Subscription expires while local ring data continues to sync; advanced history is gated but export remains available.
- Firmware update drains battery or disconnects; recovery flow preserves prior firmware state.

## Test Plan

- Pairing and firmware update flows.
- Sleep and readiness algorithm boundary cases (edge nights, gaps).
- Time-zone and DST handling.
- HealthKit/Health Connect scope toggle and revocation.
- Temperature baseline formation logic.
- Accessibility across score and trend screens.
- Health data redaction in analytics and logs.
- Export and deletion completeness.
- Coaching media playback.
- Manual verification with ring hardware.
- Health integration duplicate prevention and scope revocation tests.
- Firmware interruption, reconnect, and rollback-state tests.
- Membership restore/cancel/grace-period reconciliation tests.
- Baseline formation tests for sparse data, time-zone changes, and ring-not-worn periods.
- Privacy tests proving no raw health metrics enter push payloads, support logs, or third-party analytics.

## Acceptance Criteria

- App never shows clinical claims or diagnoses.
- Health data never appears in third-party telemetry.
- Export and deletion are user-initiated and complete.
- HealthKit/Health Connect scope is user-controlled.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Wearable, firmware, HealthKit/Health Connect, membership, and coaching features are launch-flagged until partner/manual verification passes.
- Temperature, readiness, HRV, and sleep guidance consistently use non-diagnostic wellness framing.

## Open Questions

- What sampling rates for sensors in V1?
- Which coaching content partner or in-house studio?
- Which markets and languages in V1?
- What subscription tier, if any, for advanced insights?
- How is menstrual-cycle integration handled responsibly?

## Build Plan

- Phase 1: account, ring setup, BLE sync shell, firmware state machine, local encrypted cache, today summary.
- Phase 2: sleep, readiness, activity, baseline formation, missing-data states, and trend cards.
- Phase 3: HR/HRV, temperature deviation, workout import/logging, tags, and recovery-balanced guidance.
- Phase 4: coaching library, membership/entitlements, notifications, support, and restore/cancel flows.
- Phase 5: HealthKit/Health Connect scope controls, export/delete, privacy center, and analytics redaction.
- Phase 6: hardware/firmware/manual verification, security/privacy/legal review, accessibility, and launch gates.

## Next Steps

- Hardware and coaching partner RFPs.
- Privacy counsel review and "not a medical device" disclosure review.
- Select hardware, firmware, coaching, billing, and health-integration partners.
- Complete ring pairing, firmware, sensor, HealthKit/Health Connect, membership, export/delete, and privacy manual verification before parity claims.
