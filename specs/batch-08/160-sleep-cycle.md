# Sleep Cycle-Style Clone Spec

> Metadata
> - Inspiration app: Sleep Cycle
> - Category: Sleep tracking
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store and Play Store listings, Sleep Cycle support/privacy pages, and public sleep-tracking/smart-alarm disclosures.
> - Manual verification blockers: microphone-based sleep detection algorithms, smart-alarm wake windows, snoring detection, and cross-device sync require hands-on verification on multiple device classes.
> - Legal scope: lawful functional parity only; original code, brand, copy, and content partnerships. Not a medical device; no clinical claims.

## Overview

Build an original sleep-tracking app inspired by Sleep Cycle: sound-based sleep analysis via the device microphone, smart alarm that wakes within a light-sleep window, trends over time, and snoring detection. The clone emphasizes local-only processing where feasible.

This spec is implementation-ready for a V1 that targets documented public behavior. Microphone algorithms, smart-alarm tuning, cough/snore/sleep-talk detection, AI coaching, integrations, and sleep-content licensing remain algorithm/content/manual verification blockers.

## Goals

- Sound-based sleep stage estimation via device mic overnight.
- Smart alarm within a user-set wake window.
- Sleep trends (duration, quality, time in bed) over time.
- Snoring detection and audio snippet storage with local-only default.
- Sleep notes and tag journaling.
- Optional sleep-aid content library.

## Non-Goals

- Do not provide medical diagnosis or advice (for example, no sleep-apnea diagnosis).
- Do not copy Sleep Cycle trademarks or marketing copy.
- Do not upload audio without explicit consent.
- Do not collect data beyond sleep needs.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/sleep-cycle-tracker-sounds/id320606217 | iOS listing, smart alarm, microphone/accelerometer tracking, snore/cough/sleep-talk recording, Apple Health sync, privacy labels | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.northcube.sleepcycle | Android listing, smart alarm, snore/sleep recorder, sleep notes, Google Fit, Wear OS, subscription features | Verified 2026-05-01 |
| Sleep Cycle Support | https://support.sleepcycle.com/hc/en-us | Account, alarm, tracking, recorder, subscription, integrations, troubleshooting support | Verified 2026-05-01 |
| Privacy Policy | https://www.sleepcycle.com/privacy-policy/ | Data handling, retention, user rights, terms/privacy orientation | Verified 2026-05-01 |
| Product Site | https://www.sleepcycle.com/ | Public feature orientation, science/wellness framing, app ecosystem links | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Overnight mic capture with on-device analysis by default.
- Sleep stage estimation and sleep quality score.
- Smart alarm that targets light sleep within a configurable window.
- Sleep trends with daily, weekly, monthly views.
- Snoring detection with local-only audio snippet storage by default; cloud sync opt-in.
- Sleep notes and tags.
- Optional sleep-aid content (sounds, stories).
- Onboarding must explain microphone/background execution, local processing defaults, charger/placement requirements, and non-diagnostic limitations.
- Sleep recorder must classify snoring, coughing, talking, and other night sounds with confidence and user-delete controls.
- Smart alarm must support configurable wake windows, snooze/stop behavior, fallback alarm, notification/audio failure states, and offline reliability.
- Trends must include sleep quality, regularity, bedtime/wake time, snore/cough events, notes correlation, and baseline confidence.
- AI/sleep-coach surfaces must avoid diagnosis, suppress advice on poor data quality, and route concerning symptoms to professional-care copy.
- Health integrations must support Apple Health/Google Fit scope review, write conflicts, revocation, and duplicate prevention.
- Premium content and cloud sync must be clearly gated, restoreable, and cancelable.

## Core User Journeys

- User sets bedtime and wake window; starts tracking.
- Device processes audio overnight; app shows morning report.
- Smart alarm wakes user within the window based on light-sleep estimate.
- User reviews sleep stages, duration, and quality.
- User listens to snoring snippets stored locally.
- User adds notes and tags (caffeine, stress, workout).
- User reviews weekly trends.
- User plays sleep-aid content at bedtime.
- User exports data or deletes account.
- User enables cloud sync for multi-device history.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Mic consent, setup | toggles | configured | mic denied |
| Bedtime | Start tracking | start CTA | tracking | interrupted |
| Wake Report | Last night's report | view | loaded | insufficient data |
| Sleep Detail | Stages and quality | browse dates | loaded | gap in data |
| Snoring | Snippets (local) | play, delete | loaded | storage full |
| Trends | Duration and quality | window | loaded | baseline pending |
| Notes And Tags | Journal | add tag | saved | sync error |
| Smart Alarm | Wake window | time, tone | set | notifications denied |
| Sleep Aid | Content library | play | played | media error |
| Sync | Cloud sync opt-in | toggle | synced | conflict |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |
| Recorder Review | Night sounds and events | play, classify, delete | loaded | no audio, permission revoked |
| Coach | Personalized sleep guidance | prompt, goal | answered | medical-advice prompt |
| Integrations | Health/Fit, lights, wearable | toggles | connected | provider outage |
| Subscription | Premium, restore, manage | plan, restore | active | expired |

## Data Model

- `User`: account, preferences, privacy settings, sync opt-in.
- `SleepSession`: start, end, stages, quality score, audio events.
- `SnoringSnippet`: local file ref, duration, timestamp.
- `SleepNote`: text, tags, timestamp.
- `AlarmConfig`: window, tone, smart flag.
- `ContentAsset`: id, title, media ref.
- `TrendSummary`: window, aggregates.
- `SyncState`: last sync, conflicts.
- `AuditEvent`: consent and scope events.
- `ExportRecord`: format, range, generated-at.
- `AudioEvent`: session id, class, confidence, local file ref, deleted-at.
- `CoachMessage`: prompt, response, safety class, data-quality state.
- `IntegrationScope`: provider, scopes, last sync, revoked-at.
- `Entitlement`: plan, platform, renewal/expiry state.

## API And Backend Contracts

- `POST /auth/session` (if account used).
- `POST /sleep/sessions` (metadata only; audio stays local unless opt-in).
- `GET /sleep/sessions?from=&to=`.
- `POST /notes`, `PATCH /notes/:id`.
- `POST /alarms`, `PATCH /alarms/:id`.
- `GET /content/library`, `POST /content/play`.
- `POST /sync/opt-in`, `POST /sync/conflict-resolve`.
- `POST /account/export`, `POST /account/delete`.
- `POST /support/cases`.
- `POST /snoring/cloud-backup` (explicit opt-in only).
- `POST /audio-events/classify` (local metadata or opted-in cloud only).
- `POST /coach/queries`, `GET /coach/history`.
- `POST /integrations/health/scope`, `DELETE /integrations/:id`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- App operates offline for tracking; mic processing is local by default.
- Push covers bedtime reminders, weekly summary.
- Push payloads avoid metric values; class-level copy only.
- Cloud sync optional; conflict resolution surfaced to user.
- Smart alarm runs locally even without connectivity.

## Permissions, Privacy, And Safety

- Microphone permission with clear explanation; processing local-by-default.
- Notification permission for alarms and reminders.
- Background audio execution requires OS-specific handling.
- Explicit "not a medical device" disclosure; no clinical claims (for example, sleep apnea).
- Health data not shared without explicit opt-in.
- Snoring audio snippets stored locally by default; cloud backup is opt-in with explicit consent.
- No health data in third-party analytics or ad SDKs.
- Export and delete controls explicit and complete.
- Minors require parental consent per app store rules.
- Launch owners: privacy counsel, audio ML partner, security.

## Analytics And Monetization

- Privacy-safe events: app engagement, content playback class.
- Monetization via optional subscription (trends, content, cloud sync).
- No health or audio data in third-party telemetry.

## Edge Cases

- Mic permission denied or revoked mid-session.
- Background audio suspended by OS; recovery flow.
- Device moved mid-night; gap handling.
- Multiple tracking apps competing for mic access.
- Storage full for snoring snippets; rotation policy.
- Time-zone/DST change; day-boundary recompute.
- Smart alarm during DST fallback/spring forward.
- Cloud-sync conflicts across devices.
- Account deletion with local-only data; ensure local wipe.
- Fallback alarm must fire if sleep classification crashes or OS kills the app.
- User shares room with partner; app must avoid claiming speaker identity unless manually tagged.
- Cough/snore spikes suggest concern; app uses wellness copy and professional-care routing only.
- Phone not charging overnight; low-power mode warning and safe alarm fallback.
- Wear OS/watch session conflicts with phone session; reconcile explicitly.
- Premium expires; local deletion/export and alarm access remain available.

## Test Plan

- Mic capture and local processing on supported devices.
- Smart alarm wake-window accuracy tests.
- Trends aggregation across time windows.
- Snoring snippet storage and rotation policy.
- Local-only data deletion verification.
- Cloud-sync opt-in and conflict resolution.
- Time-zone/DST handling.
- Accessibility across reports and trends.
- Export and deletion completeness.
- Content playback in background audio mode.
- Recorder classification tests for snore, cough, sleep talk, silence, and noisy rooms.
- Fallback alarm tests when ML/classification/background execution fails.
- Health/Fit integration scope, revocation, and duplicate-session tests.
- Coach safety tests for medical-advice prompts, low-confidence data, and crisis phrasing.
- Privacy tests proving audio snippets, classifications, and metrics are excluded from push/support/analytics unless explicitly consented.

## Acceptance Criteria

- App never shows clinical claims or diagnoses.
- Audio never uploads without explicit opt-in.
- Export and deletion are user-initiated and complete.
- Smart alarm reliably fires within user-set window offline.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Microphone, background execution, AI coach, Health/Fit, premium, and content features are launch-flagged until manual/device verification passes.
- Sleep, cough, and snore insights consistently avoid diagnosis and treatment claims.

## Open Questions

- Which on-device ML framework powers sleep analysis?
- Which sleep-aid content partner or in-house studio?
- How is background audio handled on restrictive Android OEMs?
- Will V1 offer wearable integration (HealthKit/Health Connect)?
- What subscription tier covers advanced analytics and cloud sync?

## Build Plan

- Phase 1: onboarding, microphone/background permissions, local encrypted store, tracking session, fallback alarm, wake report.
- Phase 2: smart alarm, sleep detail, sleep quality, audio-event recorder, local delete/rotation policy.
- Phase 3: trends, notes/tags, coach safety shell, Health/Fit integrations, and wearable/light-provider stubs.
- Phase 4: sleep-aid content, premium entitlements, cloud sync opt-in, conflict resolution, and billing restore.
- Phase 5: privacy center, export/delete, analytics redaction, support tooling, and accessibility.
- Phase 6: device/manual verification, audio ML review, privacy/legal review, content licensing, and launch gates.

## Next Steps

- Audio ML and content partner RFPs.
- Privacy counsel review of mic and audio-retention policy.
- Select audio ML, sleep-content, billing, health-integration, and optional smart-light partners.
- Complete microphone/background, smart-alarm, recorder, Health/Fit, subscription, export/delete, and privacy manual verification before parity claims.
