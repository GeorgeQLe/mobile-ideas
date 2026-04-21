# Oura-Style Clone Spec

> Metadata
> - Inspiration app: Oura
> - Category: Sleep and wellness wearable companion
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and wearable-companion disclosures pending exact URL verification.
> - Manual verification blockers: ring firmware protocol, sensor fusion for sleep and temperature, HealthKit/Health Connect sync depth, and coaching content licensing require hands-on verification with a ring prototype and partners.
> - Legal scope: lawful functional parity only; original code, brand, copy, and hardware partnerships. Not a medical device; no clinical claims.

## Overview

Build an original sleep and wellness companion app inspired by Oura: sleep, readiness, and activity scoring from a wearable ring, trends for heart rate and temperature, and coaching content. The clone requires a companion ring; this spec focuses on the mobile app.

This spec is Draft 1: surfaces ready; ring pairing protocol, sensor algorithms, HealthKit/Health Connect scope, and coaching licensing remain behind hardware/content partner review.

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
| Apple App Store listing | https://apps.apple.com/us/app/oura/id1043837948 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.ouraring.oura | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://support.ouraring.com/ | Feature references | Source discovery — pending exact URL verification |
| Privacy and terms | https://ouraring.com/legal/privacy-policy | Data handling references | Source discovery — pending exact URL verification |
| Science references | https://ouraring.com/science | Metric descriptions | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Ring pairing over BLE, battery status, firmware updates.
- Sleep detection and stages with daily score.
- Readiness score combining recovery signals.
- Activity goals and step-like metrics.
- Heart rate and temperature trends over time windows.
- Coaching library with audio/video sessions.
- Optional write to HealthKit/Health Connect; user-controlled scope.

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

## Acceptance Criteria

- App never shows clinical claims or diagnoses.
- Health data never appears in third-party telemetry.
- Export and deletion are user-initiated and complete.
- HealthKit/Health Connect scope is user-controlled.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- What sampling rates for sensors in V1?
- Which coaching content partner or in-house studio?
- Which markets and languages in V1?
- What subscription tier, if any, for advanced insights?
- How is menstrual-cycle integration handled responsibly?

## Build Plan

- Phase 1: pairing, sync, home, sleep detail.
- Phase 2: readiness and activity scoring.
- Phase 3: HR and temperature trends.
- Phase 4: coaching library and tagging.
- Phase 5: HealthKit/Health Connect integration, export, delete.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Hardware and coaching partner RFPs.
- Privacy counsel review and "not a medical device" disclosure review.
- Replace discovery URLs with exact first-party URLs before implementation.
