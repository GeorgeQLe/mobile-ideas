# Things 3-Style Clone Spec

> Metadata
> - Inspiration app: Things 3
> - Category: Tasks
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public App Store listing, Cultured Code product/support/cloud/privacy pages, and public platform integration pages.
> - Manual verification blockers: native iOS keyboard interactions, widget behavior, Cloud sync, one-time purchase flows, and accessibility passes still require a test device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, proprietary sync engine, private APIs, and customer task content.

## Overview

Build an original mobile task manager inspired by Things 3's public product and support materials: Inbox capture, day planning, scheduled/deadline views, projects, areas, headings, tags, checklists, quick entry, widgets, reminders, and optional cross-device sync.

The clone must not copy Things/Cultured Code branding, iconography, screenshots, UI copy, proprietary sync implementation, private APIs, or customer task content. V1 can reproduce comparable task-management jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Bucket-based task organization.
- Projects with headings and checklists.
- Tags with nesting and filtering.
- Quick entry with natural language date parsing.
- iCloud-like cross-device sync for account.
- Widgets, shortcuts/share-sheet capture, local reminders, and privacy-preserving backup/export.
- Deterministic offline-first task storage with conflict screens for multi-device edits.

## Non-Goals

- Do not imply Cultured Code affiliation.
- Do not copy visual language or icons.
- Do not ship team collaboration in V1.
- Do not claim exact Things Cloud parity until sync behavior is manually verified.
- Do not upload task titles/notes to analytics, support logs, or third-party NLP providers.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/things-3/id904237743 | Official iPhone/Watch listing, pricing, platform support, privacy labels, Siri/Family Sharing signals | Verified 2026-05-03 |
| Things Product Page | https://culturedcode.com/things/ | Public positioning, Inbox/Today/Upcoming/Anytime/Someday, projects, areas, tags, headings, checklists, reminders, widgets, Apple-platform integrations | Verified 2026-05-03 |
| Cultured Code Support | https://culturedcode.com/things/support/ | Help taxonomy for tasks, projects, tags, dates, reminders, repeating to-dos, widgets, Shortcuts, troubleshooting | Verified 2026-05-03 |
| Things Cloud | https://culturedcode.com/things/cloud/ | Optional account sync positioning, privacy/security posture, multi-device sync context | Verified 2026-05-03 |
| Cultured Code Privacy Policy | https://culturedcode.com/things/privacy/ | Personal-data, task-content, account, diagnostics, and support-data handling context | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Inbox captures unsorted tasks.
- Today/Upcoming/Anytime/Someday are organizing views, not statuses.
- Projects hold tasks grouped by headings; can have target dates and areas.
- Tags support nesting and filter intersections.
- Quick entry includes natural-language date/deadline detection.
- Areas group projects and standalone tasks without imposing team/workspace semantics.
- Tasks support notes, checklists, deadlines, start/scheduled dates, reminders, repeating rules, completion, cancellation/deletion, and move/reorder operations.
- Today planning must separate scheduled items, deadlines, and manually chosen focus items without leaking hidden future tasks into Today.
- Upcoming must render calendar-style scheduled items and deadlines across timezone/DST boundaries.
- Someday and Anytime must be filterable by project, area, tag, deadline, and search query.
- Quick capture must support share-sheet/intents/shortcuts-style inputs where platform APIs allow; native integration details remain `Manual verification required`.
- Widget snapshots must hide sensitive titles when configured and degrade to counts/placeholders on locked devices.
- Sync must be optional, resumable, encrypted in transit, and conflict-aware; exact Things Cloud behavior remains blocked pending manual verification.
- App-store purchase/restore must be isolated from account sync entitlement state and support family-sharing/store-managed edge cases where platform APIs allow.

## Core User Journeys

- User captures a task in Inbox during the day.
- User opens Today, schedules a Someday task to tomorrow.
- User creates a project for a trip with headings (Pack, Book, Contact).
- User sets deadline on a task; task shows in Upcoming.
- User tags tasks "work" and filters Today.
- User completes task with swipe; sees celebration.
- User adds a Today widget.
- User enables cross-device sync and restores on new device.
- User purchases one-time unlock (if tiered).
- User deletes account and local data.
- User repeats a task every weekday and verifies the next occurrence appears only after completion.
- User drags tasks between headings inside a project while offline; changes sync later with conflict labels.
- User captures a task from a share extension or shortcut and sees it land in Inbox.
- User exports all local data and then deletes local/cloud account data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Inbox | Capture | quick entry | empty, items | save failed |
| Today | Today focus | act, schedule | empty, items | overload |
| Upcoming | Scheduled + deadlines | calendar, act | empty, items | DST mis-render |
| Anytime | All ungated | filter | empty, items | perf limit |
| Someday | Deferred | act | empty, items | corruption |
| Projects | Tree of projects | create, reorder | empty, loaded | depth limit |
| Project Detail | Headings + tasks | add heading, add task | loaded, editing | save conflict |
| Tags | Manage tags | add, nest | empty, loaded | circular |
| Settings | Sync, notifications | toggles | loaded | sync error |
| Purchase | Unlock features | buy, restore | free, purchased | restore failed |
| Quick Entry / Share Capture | Capture outside main flow | text, URL, intent | parsing, saved | extension unavailable |
| Reminders | Configure alerts/repeats | date, time, recurrence | scheduled, disabled | notification denied |
| Search / Filter | Find tasks by text/tag/project | query, tag | results, empty | stale index |
| Account / Data | Sync, export, delete | login, export, delete | signed out, syncing | delete pending |

## Data Model

- `User`: account identity, locale, timezone, sync state, privacy settings.
- `Task`: title reference, notes reference, project/area, heading, checklist, tags, start date, deadline, reminder, recurrence, status, order key, local revision.
- `Project`: title reference, area, target date, completion state, heading order, task order, archive flag.
- `Area`: title reference, project refs, standalone task refs, archive flag.
- `Heading`: project, title reference, order key, collapsed state.
- `Tag`: title reference, parent tag, color/icon metadata if original, visibility, order key.
- `ChecklistItem`: task, title reference, completion, order key.
- `RecurrenceRule`: cadence, interval, weekdays/month days, after-completion behavior, next occurrence.
- `ReminderSchedule`: task, local notification id, timezone, delivery state.
- `SyncChange`: device, entity, operation, encrypted payload, conflict base, idempotency key.
- `WidgetSnapshot`: list type, privacy mode, redacted titles, generated time.
- `Entitlement`: platform purchase, family/shared state, restore status, expiration if subscription alternative is chosen.
- `AuditEvent`: sync, export/delete, billing, notification, account, and support events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `GET /tasks?bucket=`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id`.
- `GET /projects`, `POST /projects`, `PATCH /projects/:id`.
- `GET /tags`, `POST /tags`, `PATCH /tags/:id`.
- `GET /sync/changes?since=`, `POST /sync/changes`.
- `POST /nlp/parse` (optional on-device).
- `GET /entitlements`, `POST /billing/webhook`.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`: privacy lifecycle.
- `POST /reminders/schedule`, `DELETE /reminders/:id`: local scheduling facade for tests; implementation may be platform-local only.
- `POST /imports/share`, `POST /imports/file`: share-extension/file import entry points.

## Realtime, Push, And Offline Behavior

- Offline-first; all writes local, synced on reconnect.
- Sync uses change-log pattern with idempotency.
- Push for due/deadline alerts, scheduled locally when possible.
- Widgets render cached Today snapshot.
- Recurrence generation happens locally and must be deterministic across timezone changes.
- Conflict screens preserve both task versions when title/notes/checklist edits diverge.
- Sync queue redacts task content from logs and supports retry/backoff without duplicate task creation.
- Account logout leaves local data only after explicit user choice; cloud delete remains a separate confirmed action.

## Permissions, Privacy, And Safety

- No contacts/location scopes by default.
- Sync encrypts in transit; at-rest encryption per provider.
- Analytics exclude task content; only counts and event types.
- Export + delete available.
- No cross-device advertising identifiers.
- Local notification text must support redacted lock-screen mode.
- Support diagnostics require explicit user opt-in before task titles/notes are attached.
- Optional NLP parsing should run on-device first; cloud parsing is out of scope unless content redaction and consent are implemented.
- Store receipts, sync credentials, and backup keys require encrypted storage and log redaction.
- Family/shared purchases must not expose one family member's task content to another account.

## Analytics And Monetization

- Events: task created/completed, project created, tag applied, widget added, entitlement changed.
- Model: one-time purchase per platform (iOS + Android independent) or free with premium.
- Paywall identifies blocked feature.
- Analytics payloads use counts, route names, entity types, latency, error codes, and coarse timezone class only.
- Billing must distinguish app-store purchase, restore, refund/revocation, family sharing, and cross-platform sync account state.
- Premium gates may cover widgets, advanced shortcuts, cloud sync, or platform-specific unlocks, but V1 must document the chosen model before implementation.

## Edge Cases

- Clock skew between devices; sync must reconcile.
- Large project with 1000+ tasks performance.
- Deleted project with active tasks; tasks move to Inbox.
- Tag cycle attempted in nesting.
- Restore after fresh install with partial sync.
- Repeating task crosses DST or travel timezone boundary.
- Start date and deadline disagree; Today/Upcoming must label each reason separately.
- Same tag name appears under different parent tags.
- User completes a task offline while another device edits notes.
- Notification permission revoked after reminders are scheduled.
- Widget refresh budget expires or snapshot contains deleted task.
- Store receipt restored before sync account login.

## Test Plan

- Unit tests for bucket assignment, deadline logic, nested tag filters, sync merge.
- Contract tests for sync/changes endpoint.
- Integration tests for capture -> schedule -> complete.
- NLP tests (on-device) for supported locales.
- Accessibility tests for dynamic type, VoiceOver, focus order.
- Billing tests: one-time purchase + restore.
- Manual verification: widgets, sync across devices.
- Unit tests for recurrence generation, Today/Upcoming bucketing, order-key moves, checklist completion, tag inheritance, and data redaction.
- Contract tests for sync changes, export/delete, billing webhook, and share/import endpoints.
- Integration tests for capture -> schedule -> remind -> complete -> recurrence regeneration.
- Offline conflict tests for task title, notes, checklist, project moves, and deleted project recovery.
- Permission tests for notifications, Siri/Shortcuts/share extension, widget privacy, and account logout.
- Privacy/security tests for analytics redaction, support diagnostics consent, credential storage, and export/delete audit trail.
- Accessibility tests for dynamic type, VoiceOver task rows, reorder alternatives, focus order, reduced motion, and keyboard navigation.
- Manual verification tests: native quick entry/share extension, widgets, Things Cloud-like sync, store purchase/restore, watch/Siri behavior, and mobile accessibility.

## Acceptance Criteria

- Source URLs verified.
- Bucket views + projects + tags + quick entry complete.
- Sync works across two devices.
- Widgets functional.
- Manual blockers feature-flagged.
- A downstream team can build V1 without Things/Cultured Code brand assets, proprietary sync code, private APIs, screenshots, UI copy, or customer task content.
- Task bucketing, recurrence, reminders, projects/headings/areas/tags, search, widgets, billing, sync, export/delete, and offline conflicts have deterministic contracts and failure states.
- Analytics, logs, notifications, support diagnostics, widgets, and sync metadata minimize task-title and task-note exposure.
- Store entitlement, local data, cloud sync account, and family-sharing states reconcile without granting access to another user's task content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- One-time purchase vs subscription?
- Which sync backend (custom, CloudKit-like)?
- Which locales for NLP in V1?
- Collaboration in V2?
- Which platform integrations are V1: widgets, watch, Siri/Shortcuts, share extension, or Android equivalents?
- Which recurrence grammar and date-parser locale set are required before launch?
- Should sync be account-backed from day one or local-only first with export/import?

## Build Plan

- Phase 1: scaffold local encrypted task store, Inbox/Today/Upcoming/Anytime/Someday, task editor, project/area primitives, and privacy-safe analytics.
- Phase 2: add projects, headings, checklists, tags, search/filtering, drag/reorder alternatives, and deterministic recurrence/deadline bucketing.
- Phase 3: add quick entry, share/import capture, local notifications, widgets/snapshots, shortcut hooks, and redacted lock-screen modes.
- Phase 4: add optional sync account, encrypted change log, conflict screens, export/delete, support diagnostics consent, and cache purge.
- Phase 5: add billing/restore/family-sharing reconciliation, entitlement gates, receipt/webhook handling, and platform purchase tests.
- Phase 6: complete accessibility, timezone/recurrence/offline tests, manual native verification, security/privacy review, and launch blockers.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 sync, purchase, recurrence grammar, and platform-integration scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
