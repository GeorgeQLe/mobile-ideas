# Sleep Cycle-Style Clone Spec

> Metadata
> - Inspiration app: Sleep Cycle
> - Category: Sleep tracking
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and sleep-tracker disclosures pending exact URL verification.
> - Manual verification blockers: microphone-based sleep detection algorithms, smart-alarm wake windows, snoring detection, and cross-device sync require hands-on verification on multiple device classes.
> - Legal scope: lawful functional parity only; original code, brand, copy, and content partnerships. Not a medical device; no clinical claims.

## Overview

Build an original sleep-tracking app inspired by Sleep Cycle: sound-based sleep analysis via the device microphone, smart alarm that wakes within a light-sleep window, trends over time, and snoring detection. The clone emphasizes local-only processing where feasible.

This spec is Draft 1: surfaces ready; microphone algorithms, smart-alarm tuning, snoring analysis, and sleep-content licensing remain behind algorithm/content partner review.

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
| Apple App Store listing | https://apps.apple.com/us/app/sleep-cycle-sleep-tracker/id320606217 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.northcube.sleepcycle | Android feature list | Source discovery — pending exact URL verification |
| Help center | https://support.sleepcycle.com/ | Feature references | Source discovery — pending exact URL verification |
| Privacy and terms | https://www.sleepcycle.com/privacy-policy/ | Data handling references | Source discovery — pending exact URL verification |
| Methodology pages | https://www.sleepcycle.com/how-sleep-cycle-works/ | Metric descriptions | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Overnight mic capture with on-device analysis by default.
- Sleep stage estimation and sleep quality score.
- Smart alarm that targets light sleep within a configurable window.
- Sleep trends with daily, weekly, monthly views.
- Snoring detection with local-only audio snippet storage by default; cloud sync opt-in.
- Sleep notes and tags.
- Optional sleep-aid content (sounds, stories).

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

## Acceptance Criteria

- App never shows clinical claims or diagnoses.
- Audio never uploads without explicit opt-in.
- Export and deletion are user-initiated and complete.
- Smart alarm reliably fires within user-set window offline.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which on-device ML framework powers sleep analysis?
- Which sleep-aid content partner or in-house studio?
- How is background audio handled on restrictive Android OEMs?
- Will V1 offer wearable integration (HealthKit/Health Connect)?
- What subscription tier covers advanced analytics and cloud sync?

## Build Plan

- Phase 1: mic capture, local processing, bedtime/wake report.
- Phase 2: smart alarm and sleep detail.
- Phase 3: trends, notes, tags.
- Phase 4: snoring detection with local storage.
- Phase 5: optional cloud sync, sleep-aid content.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Audio ML and content partner RFPs.
- Privacy counsel review of mic and audio-retention policy.
- Replace discovery URLs with exact first-party URLs before implementation.
