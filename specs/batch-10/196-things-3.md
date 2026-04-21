# Things 3-Style Clone Spec

> Metadata
> - Inspiration app: Things 3
> - Category: Tasks
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Cultured Code support — pending exact URL verification.
> - Manual verification blockers: native iOS keyboard interactions, widget behavior, Cloud sync, one-time purchase flows, and accessibility passes still require a test device.
> - Legal scope: functional parity only; use original UI, branding, and sync engine.

## Overview

Build an original mobile task manager inspired by Things 3: Inbox/Today/Upcoming/Anytime/Someday buckets, projects, headings, tags, deadlines, quick entry, and delightful single-purchase UX.

The clone must not copy Things branding, iconography, feature names, or private APIs.

## Goals

- Bucket-based task organization.
- Projects with headings and checklists.
- Tags with nesting and filtering.
- Quick entry with natural language date parsing.
- iCloud-like cross-device sync for account.

## Non-Goals

- Do not imply Cultured Code affiliation.
- Do not copy visual language or icons.
- Do not ship team collaboration in V1.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/things-3/id904237743 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Cultured Code Support | https://culturedcode.com/things/support/ | Buckets, projects, sync | Source discovery — pending exact URL verification |
| Things Cloud | https://culturedcode.com/things/cloud/ | Cross-device sync | Source discovery — pending exact URL verification |
| Cultured Code Privacy | https://culturedcode.com/things/privacy/ | Personal data | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Inbox captures unsorted tasks.
- Today/Upcoming/Anytime/Someday are organizing views, not statuses.
- Projects hold tasks grouped by headings; can have target dates and areas.
- Tags support nesting and filter intersections.
- Quick entry includes natural-language date/deadline detection.

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

## Data Model

- `User`, `Task` (title, notes, when, deadline, status), `Project`, `Heading`, `Area`, `Tag`, `Checklist`, `SyncChange`, `Widget`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `GET /tasks?bucket=`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id`.
- `GET /projects`, `POST /projects`, `PATCH /projects/:id`.
- `GET /tags`, `POST /tags`, `PATCH /tags/:id`.
- `GET /sync/changes?since=`, `POST /sync/changes`.
- `POST /nlp/parse` (optional on-device).
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Offline-first; all writes local, synced on reconnect.
- Sync uses change-log pattern with idempotency.
- Push for due/deadline alerts, scheduled locally when possible.
- Widgets render cached Today snapshot.

## Permissions, Privacy, And Safety

- No contacts/location scopes by default.
- Sync encrypts in transit; at-rest encryption per provider.
- Analytics exclude task content; only counts and event types.
- Export + delete available.
- No cross-device advertising identifiers.

## Analytics And Monetization

- Events: task created/completed, project created, tag applied, widget added, entitlement changed.
- Model: one-time purchase per platform (iOS + Android independent) or free with premium.
- Paywall identifies blocked feature.

## Edge Cases

- Clock skew between devices; sync must reconcile.
- Large project with 1000+ tasks performance.
- Deleted project with active tasks; tasks move to Inbox.
- Tag cycle attempted in nesting.
- Restore after fresh install with partial sync.

## Test Plan

- Unit tests for bucket assignment, deadline logic, nested tag filters, sync merge.
- Contract tests for sync/changes endpoint.
- Integration tests for capture -> schedule -> complete.
- NLP tests (on-device) for supported locales.
- Accessibility tests for dynamic type, VoiceOver, focus order.
- Billing tests: one-time purchase + restore.
- Manual verification: widgets, sync across devices.

## Acceptance Criteria

- Source URLs verified.
- Bucket views + projects + tags + quick entry complete.
- Sync works across two devices.
- Widgets functional.
- Manual blockers feature-flagged.

## Open Questions

- One-time purchase vs subscription?
- Which sync backend (custom, CloudKit-like)?
- Which locales for NLP in V1?
- Collaboration in V2?

## Build Plan

- Phase 1: local task + buckets + quick entry.
- Phase 2: projects + headings + tags.
- Phase 3: sync engine.
- Phase 4: widgets + notifications.
- Phase 5: NLP + deadlines.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Choose sync architecture.
- Decide monetization model.
