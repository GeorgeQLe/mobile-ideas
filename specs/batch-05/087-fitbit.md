# 087 Fitbit Clone Spec

## Legal Scope
- Clone health dashboarding, device sync, activity summaries, sleep, and goals.
- Use original branding, charts, and copy.

## Product Goal
- Present a consolidated health dashboard with device-backed metrics and easy trend review.

## Research Verification Checklist
- Public listing, device pairing, and premium hierarchy: verify.
- Health metric types, sleep views, and notification behavior: verify.
- Sync expectations across phone and wearable: verify.

## Core User Journeys
- User pairs a device and waits for first sync.
- User opens the dashboard for steps, heart rate, and sleep.
- User reviews trends for a week or month.
- User upgrades for deeper analytics and reports.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Dashboard | Health summary | Tiles, time range | Loading, synced | Partial data |
| Device Setup | Pair hardware | BLE, account | Scanning, paired | Pair failure |
| Sleep Detail | Review sleep | Night, stages | Normal, missing | Wear not worn |
| Trends | Historical charts | Metric, range | Empty, populated | Timezone jump |
| Paywall | Subscription | Plan, restore | Trial, error | No entitlement |

## Functional Requirements
- Ingest steps, distance, heart rate, sleep, weight, and workouts.
- Display daily tile summaries and longer trend charts.
- Support device pairing and re-sync actions.
- Track goals and badges.
- Allow user-configured dashboard cards.

## Data Model
- `User`, `Device`, `MetricSample`, `SleepSession`, `Workout`, `Goal`, `Badge`, `Subscription`.
- Store samples in a normalized time-series format.

## API/Backend Contracts
- `POST /devices/pair`
- `POST /sync`
- `GET /dashboard`
- `GET /metrics?type=&range=`
- `GET /sleep/{date}`

## Realtime/Push/Offline
- Realtime only for sync progress and device pairing status.
- Push for goal achievements and reminders.
- Offline cache for last synced metrics.

## Permissions/Privacy/Safety
- Explicit consent for health and motion data.
- Show data provenance so users know phone vs device source.
- Avoid diagnostic claims.

## Analytics Events
- `device_pair_started`, `device_pair_succeeded`, `sync_completed`, `metric_tile_opened`, `sleep_viewed`, `goal_updated`, `badge_unlocked`, `paywall_viewed`.

## Monetization
- Subscription for advanced insights, premium reports, and expanded trend windows.

## Acceptance Tests
- Pair a device and sync samples.
- Open dashboard offline and view cached metrics.
- Review last night sleep and a seven-day trend.
- Restore purchase and unlock premium reporting.

## Implementation Notes
- Use source tags on every sample to distinguish device, phone, and manual entry.
- Make sync idempotent and tolerant of duplicate packets.
- Keep charts renderable even with sparse or missing days.

