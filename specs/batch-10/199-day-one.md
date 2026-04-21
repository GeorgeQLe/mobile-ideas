# Day One-Style Clone Spec

> Metadata
> - Inspiration app: Day One
> - Category: Journaling
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Automattic/Day One support — pending exact URL verification.
> - Manual verification blockers: encrypted sync fidelity, audio/photo capture, widget/complication behavior, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, prompts, and encrypted sync.

## Overview

Build an original mobile journaling app inspired by Day One: daily entries with photos/audio, multiple journals, timeline, streaks, prompts, and end-to-end encrypted sync.

The clone must not copy Day One branding, iconography, prompt library, or private APIs.

## Goals

- Daily entries with text, photos, audio, location, weather.
- Multiple journals with per-journal color and settings.
- Timeline and map views.
- Streaks and on-this-day.
- Daily prompts (original or licensed).
- End-to-end encrypted sync (paid).

## Non-Goals

- Do not imply Automattic affiliation.
- Do not reuse the proprietary prompt library.
- Do not ship social sharing of entries without explicit consent UX.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/day-one-journal-private-diary/id1044867788 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.dayoneapp.dayone | Android listing, data safety | Source discovery — pending exact URL verification |
| Day One Help | https://help.dayoneapp.com/ | Journals, sync, prompts | Source discovery — pending exact URL verification |
| Day One Privacy | https://dayoneapp.com/privacy/ | Encryption, personal data | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Entries include text, media (photo/audio), location, weather.
- Multiple journals, each with color and sync setting.
- Timeline, calendar, map, and on-this-day views.
- Daily prompts optional.
- E2EE sync (paid).

## Core User Journeys

- User creates an entry with photo and audio; location and weather auto-filled.
- User browses timeline; opens an old entry; sees on-this-day.
- User creates a second journal (Work) with different color.
- User answers a daily prompt.
- User enables E2EE sync; passphrase required on second device.
- User exports PDF/Markdown of entries.
- User receives streak notification.
- User deletes an entry; sync replicates deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Timeline | Entries over time | scroll | empty, items | perf limit |
| Entry Editor | Compose | text, photo, audio | drafting, saved | mic/camera denied |
| Calendar View | Calendar grid | tap day | loaded | empty |
| Map View | Location pins | pan/zoom | loaded | location disabled |
| On This Day | Same-day past entries | scroll | empty, items | no history |
| Journals | Manage journals | add/edit | empty, loaded | sync error |
| Prompts | Daily prompt | answer | shown, answered | unavailable |
| Sync | Enable and passphrase | enter | off, on | passphrase wrong |
| Settings | Account, notifications | toggles | loaded | restricted |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |
| Export | PDF/Markdown | pick | generated | too large |

## Data Model

- `User`, `Journal`, `Entry` (text, media, location, weather, mood), `MediaAsset`, `Prompt`, `Streak`, `SyncOp` (encrypted), `DeviceKey`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`, `POST /data-export`.
- `GET /journals`, `POST /journals`, `PATCH /journals/:id`.
- `GET /entries?journalId=&from=&to=`, `POST /entries`, `PATCH /entries/:id`, `DELETE /entries/:id`.
- `POST /media/uploads`, `PUT /media/uploads/:id/content`.
- `POST /sync/ops`, `GET /sync/ops?since=` (E2EE blobs).
- `GET /prompts/today`.
- `GET /weather?lat=&lon=&date=`.
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Offline-first; entries queued and synced when online.
- Media uploads resumable.
- Push for prompt reminders and streaks — opaque.
- Sync uses E2EE; server stores ciphertext only.

## Permissions, Privacy, And Safety

- Camera, mic, location requested only at relevant actions.
- E2EE keys per user; device enrollment with passphrase.
- Biometric unlock optional.
- Analytics exclude entry content; only event types.
- No social share without explicit per-entry consent.
- Export + delete available.

## Analytics And Monetization

- Events: entry created, journal created, prompt answered, streak earned, sync enabled, export.
- Tiers original; paywall at multiple journals, sync, export.

## Edge Cases

- Entry with missing location (permission denied) — weather must degrade.
- Passphrase forgotten; data unrecoverable (by design) — warn at enrollment.
- Sync conflict: two devices edit same entry offline.
- Large media gallery on device.
- Streak broken by timezone change.

## Test Plan

- Unit tests for streak logic, timezone handling, E2EE blob sealing.
- Contract tests for entries, media, sync endpoints.
- Integration tests for create -> sync -> restore on second device.
- Permission tests for camera/mic/location.
- Privacy tests for biometric unlock, export, delete.
- Billing tests.
- Accessibility tests for dynamic type, VoiceOver, audio entry alternatives.
- Manual verification: streak notifications, E2EE sync, export formats.

## Acceptance Criteria

- Source URLs verified.
- Entries + multiple journals + timeline + map + on-this-day complete.
- E2EE sync testable across devices.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- Prompt library sourcing/licensing?
- On-device ML for mood detection (opt-in)?
- Watch app in V1?
- Shared journals (family) in V2?

## Build Plan

- Phase 1: local entries + timeline + editor.
- Phase 2: media + location + weather.
- Phase 3: multiple journals + prompts + streaks.
- Phase 4: E2EE sync + billing.
- Phase 5: export + widgets.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Source or commission prompt library.
- Design E2EE enrollment and recovery UX.
