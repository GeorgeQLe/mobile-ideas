# Day One-Style Clone Spec

> Metadata
> - Inspiration app: Day One
> - Category: Journaling
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace listings, Day One product/help/privacy/encryption pages, and public subscription/export feature descriptions.
> - Manual verification blockers: encrypted sync fidelity, audio/photo capture, widget/complication behavior, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, proprietary prompt library, private APIs, sync/encryption implementation, and customer journal content.

## Overview

Build an original mobile journaling app inspired by Day One's public product and support materials: dated entries, photos/audio/video-style media, multiple journals, timeline/calendar/map/on-this-day views, streaks, reminders, prompts, import/export, app lock, and end-to-end encrypted sync.

The clone must not copy Day One/Automattic branding, iconography, screenshots, UI copy, proprietary prompt library, private APIs, sync/encryption implementation, or customer journal content. V1 can reproduce comparable journaling jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Daily entries with text, photos, audio, location, weather.
- Multiple journals with per-journal color and settings.
- Timeline and map views.
- Streaks and on-this-day.
- Daily prompts (original or licensed).
- End-to-end encrypted sync (paid).
- App lock, import/export, reminders/widgets, original prompt catalog, and privacy-preserving media handling.
- Offline-first entry capture with explicit cloud backup/sync enrollment and key-loss warnings.

## Non-Goals

- Do not imply Automattic affiliation.
- Do not reuse the proprietary prompt library.
- Do not ship social sharing of entries without explicit consent UX.
- Do not claim exact Day One Sync or E2EE parity until hands-on sync/encryption verification is complete.
- Do not send entry text, media, location, weather, mood, or prompt answers to analytics/support without explicit consent.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/day-one-journal-private-diary/id1044867788 | Official iOS listing, feature positioning, in-app purchase signal, privacy labels, platform support | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.dayoneapp.dayone | Official Android listing, data-safety summary, feature list, subscription signals | Verified 2026-05-03 |
| Day One Product Page | https://dayoneapp.com/ | Public journaling positioning, entries, media, journals, prompts, privacy, sync, export, platform support | Verified 2026-05-03 |
| Day One Help Center | https://dayoneapp.com/guides/ | Help taxonomy for entries, journals, sync, encryption, import/export, reminders, media, settings | Verified 2026-05-03 |
| Day One E2EE FAQ | https://dayoneapp.com/guides/day-one-sync/end-to-end-encryption-faq/ | End-to-end encryption positioning, key behavior, sync/recovery warnings | Verified 2026-05-03 |
| Day One App Privacy Guide | https://dayoneapp.com/guides/settings/app-privacy/ | Privacy posture, journal-content handling, no-ad/no-sale positioning | Verified 2026-05-03 |
| Day One Privacy Policy | https://dayoneapp.com/privacy-policy/ | Personal-data, location, media, sync, account, support, and deletion context | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Entries include text, media (photo/audio), location, weather.
- Multiple journals, each with color and sync setting.
- Timeline, calendar, map, and on-this-day views.
- Daily prompts optional.
- E2EE sync (paid).
- Entry editor must support text, rich/Markdown-like formatting, photos, audio, video/file attachments where licensed, tags, favorites, and metadata editing.
- Location/weather capture must be just-in-time, optional, editable, and removable per entry.
- Multiple journals must support color/icon-like original metadata, per-journal sync/privacy settings, and clear premium gates.
- Timeline, calendar, map, search, tags, favorites, and on-this-day must work from local encrypted/offline data.
- Prompt content must be original or licensed; public-source V1 must include a small original prompt corpus or let users author prompts.
- E2EE enrollment must explain key storage, device enrollment, and unrecoverable-key scenarios before upload.
- Import/export must include PDF/JSON/Markdown-like open formats where feasible and preserve media references.
- App lock/biometric unlock must protect local app access while avoiding claims that biometrics replace encryption.
- Sharing must be explicit per entry/export and must strip location/EXIF by default unless the user opts in.

## Core User Journeys

- User creates an entry with photo and audio; location and weather auto-filled.
- User browses timeline; opens an old entry; sees on-this-day.
- User creates a second journal (Work) with different color.
- User answers a daily prompt.
- User enables E2EE sync; passphrase required on second device.
- User exports PDF/Markdown of entries.
- User receives streak notification.
- User deletes an entry; sync replicates deletion.
- User imports entries from a local archive and verifies timestamps/media.
- User removes location from one entry and sees map/search update.
- User locks the app, receives a reminder, and opens safely from notification.
- User exports all journals with media and then requests account deletion.
- User loses E2EE key/passphrase and sees recovery limitation guidance.
- User restores premium on a second device and enrolls sync.

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
| Search / Tags | Find entries | query, tag, favorite | results, empty | index stale |
| Import | Bring in archive | file, provider | imported | malformed archive |
| App Lock / Privacy | Protect local app | passcode, biometric | locked, unlocked | key unavailable |
| Media Detail | Inspect photos/audio/video | play, edit metadata | loaded | file missing |
| Account / Data | Sync, export, delete | login, delete | signed out, syncing | delete pending |

## Data Model

- `User`: account identity, locale, timezone, privacy settings, sync/encryption state, reminder preferences.
- `Journal`: title reference, color/icon metadata, sync state, entry count, archive state, premium gate.
- `Entry`: journal, timestamp, timezone, text reference, formatting AST, tags, favorite, location/weather refs, mood, lock state, local revision.
- `MediaAsset`: entry, type, local URI, encrypted upload ref, bytes, duration/dimensions, EXIF-stripped flag, transcription ref if any.
- `LocationMetadata`: entry, coordinate precision, place name, source, user-edited/removed state.
- `WeatherSnapshot`: provider, coarse location key, timestamp, units, cache/license metadata.
- `Prompt`: original/licensed prompt text, category, date, answered state, license metadata.
- `Streak`: local date ledger, timezone, reminder state, repair history.
- `SearchIndex`: text/tag/media/prompt tokens, updated revision, corruption marker.
- `SyncOp`: encrypted entity payload, device, base revision, conflict marker, idempotency key.
- `DeviceKey`: device public key, wrapped journal key, recovery status, last enrollment.
- `Entitlement`: premium plan, store/web owner, trial, restore, expiration, feature flags.
- `AuditEvent`: sync, encryption, import/export, media, billing, privacy, support, and account deletion events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`, `POST /data-export`.
- `GET /journals`, `POST /journals`, `PATCH /journals/:id`.
- `GET /entries?journalId=&from=&to=`, `POST /entries`, `PATCH /entries/:id`, `DELETE /entries/:id`.
- `POST /media/uploads`, `PUT /media/uploads/:id/content`.
- `POST /sync/ops`, `GET /sync/ops?since=` (E2EE blobs).
- `GET /prompts/today`.
- `GET /weather?lat=&lon=&date=`.
- `GET /entitlements`, `POST /billing/webhook`.
- `POST /imports`, `POST /exports`, `GET /exports/:id`: data portability.
- `POST /device-enrollments`, `DELETE /device-enrollments/:id`: E2EE device lifecycle.
- `GET /search?q=`, `POST /index/rebuild`: local or backend-backed test facade.
- `POST /data-export`, `DELETE /account`: privacy lifecycle.

## Realtime, Push, And Offline Behavior

- Offline-first; entries queued and synced when online.
- Media uploads resumable.
- Push for prompt reminders and streaks — opaque.
- Sync uses E2EE; server stores ciphertext only.
- Media uploads are encrypted, resumable, and linked to encrypted entry metadata.
- Offline edits queue locally and conflict screens preserve both versions of changed entries.
- Reminders and widgets use local snapshots and hide sensitive content when locked.
- Import/export jobs run resumably and report per-entry/media failures.

## Permissions, Privacy, And Safety

- Camera, mic, location requested only at relevant actions.
- E2EE keys per user; device enrollment with passphrase.
- Biometric unlock optional.
- Analytics exclude entry content; only event types.
- No social share without explicit per-entry consent.
- Export + delete available.
- Entry text, tags, prompts, media filenames, coordinates, weather, mood, streaks, and journal names are sensitive.
- Location defaults to off; exact location and weather enrichment require separate prompts and can be removed later.
- EXIF and precise coordinates are stripped from shared/exported media unless the user opts in.
- Sync keys, app-lock secrets, store receipts, and media upload credentials require encrypted storage and log redaction.
- Support diagnostics require explicit consent before including entry metadata, journal names, or sync logs that could reveal content.

## Analytics And Monetization

- Events: entry created, journal created, prompt answered, streak earned, sync enabled, export.
- Tiers original; paywall at multiple journals, sync, export.
- Analytics payloads use event type, counts, media type class, latency, failure code, coarse timezone class, and entitlement gate only.
- Entitlements may gate multiple journals, sync, media volume, audio/video, export formats, prompts, widgets, and premium reminders.
- Billing must handle trial, active, expired, canceled, refunded, restored, store-owned, web-owned, and cross-platform states.

## Edge Cases

- Entry with missing location (permission denied) — weather must degrade.
- Passphrase forgotten; data unrecoverable (by design) — warn at enrollment.
- Sync conflict: two devices edit same entry offline.
- Large media gallery on device.
- Streak broken by timezone change.
- E2EE key lost, device reset, or second-device enrollment fails mid-sync.
- Media upload succeeds but encrypted entry op fails.
- Location permission revoked after weather/location metadata exists.
- Import archive has duplicate IDs, malformed timestamps, or missing media.
- On-this-day crosses leap day or timezone-travel boundary.
- Notification opens while app lock is active.
- Export/delete request intersects with store subscription records and local-only entries.

## Test Plan

- Unit tests for streak logic, timezone handling, E2EE blob sealing.
- Contract tests for entries, media, sync endpoints.
- Integration tests for create -> sync -> restore on second device.
- Permission tests for camera/mic/location.
- Privacy tests for biometric unlock, export, delete.
- Billing tests.
- Accessibility tests for dynamic type, VoiceOver, audio entry alternatives.
- Manual verification: streak notifications, E2EE sync, export formats.
- Unit tests for entry timestamps, timezone/streak logic, prompt scheduling, E2EE envelope sealing, location/weather redaction, media metadata stripping, and search indexing.
- Contract tests for entries, journals, media upload, encrypted sync ops, device enrollment, billing, import/export, data export/delete, and audit events.
- Integration tests for create -> attach media -> add location/weather -> sync -> restore on second device.
- Offline/conflict tests for concurrent entry edits, media upload retries, deleted journal, and import/export interruption.
- Privacy/security tests for analytics redaction, app lock, key storage, EXIF stripping, support diagnostics consent, account delete, and encrypted media.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, platform-store, and web-owned states.
- Accessibility tests for timeline, editor, media controls, map alternatives, app-lock prompts, dynamic type, VoiceOver, keyboard alternatives, and reduced motion.
- Manual verification tests: native media capture, widgets/complications, reminders, E2EE sync/enrollment/recovery, subscription purchase/restore, export formats, and mobile accessibility.

## Acceptance Criteria

- Source URLs verified.
- Entries + multiple journals + timeline + map + on-this-day complete.
- E2EE sync testable across devices.
- Entitlements reconcile.
- Manual blockers feature-flagged.
- A downstream team can build V1 without Day One/Automattic brand assets, proprietary prompts, private APIs, sync/encryption code, screenshots, UI copy, or customer journal content.
- Entries, journals, media, prompts, streaks, timeline/calendar/map/search, app lock, sync, import/export, billing, and account deletion have deterministic contracts and failure states.
- Analytics, logs, support diagnostics, notifications/widgets, exports, media, sync metadata, and location/weather handling minimize journal-content exposure.
- E2EE enrollment, key loss, device enrollment, local-only entries, premium gates, and store restore reconcile safely.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Prompt library sourcing/licensing?
- On-device ML for mood detection (opt-in)?
- Watch app in V1?
- Shared journals (family) in V2?
- Which media types and file-size limits are V1?
- Which export/import formats are required first?
- Should location/weather be default-off or prompted from the first media entry?

## Build Plan

- Phase 1: scaffold local encrypted entry store, timeline/calendar/search, editor, journal model, app lock, and privacy-safe analytics.
- Phase 2: add media capture/import, metadata editing, location/weather with opt-in prompts, EXIF stripping, and map/list alternatives.
- Phase 3: add multiple journals, original prompt system, streak/reminder engine, on-this-day, tags/favorites, and import/export basics.
- Phase 4: add E2EE sync, device enrollment, encrypted media upload, conflict screens, key-loss UX, export/delete, and support diagnostics consent.
- Phase 5: add billing/restore/entitlements, premium gates, widgets/complications/staged platform surfaces, advanced exports, and subscription reconciliation.
- Phase 6: complete accessibility, media/sync/security/privacy tests, manual native verification, and launch blockers.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 media, prompt, location/weather, E2EE, export, and platform-integration scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
