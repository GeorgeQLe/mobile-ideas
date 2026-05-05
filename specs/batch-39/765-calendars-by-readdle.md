# Calendars-by-Readdle-Style Clone Spec

> Metadata
> - Inspiration app: Calendars by Readdle
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: natural language parsing accuracy, CalDAV sync behavior, widget rendering and interaction, task-calendar integration specifics, gesture navigation fidelity, recurring event edge cases, and subscription restore.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Calendars by Readdle's public natural language calendar workflow. The V1 clone focuses on natural language event creation ("Meet John tomorrow at 3pm"), intuitive task management integrated with calendar views, multiple calendar views (day/week/month/list), widget support, CalDAV/Google/Exchange sync, recurring events, drag-and-drop rescheduling, event templates, and premium subscription entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, natural-language, CalDAV, widget, task, gesture, and subscription behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first natural language calendar experience with onboarding, event creation, task management, multiple views, widgets, sync, and settings flows.
- Reproduce the functional job behind Calendars by Readdle using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Readdle branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, widget, CalDAV, and subscription states.
- Do not implement production payments without separate legal/platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/calendars-by-readdle/id608834326 | iOS listing, privacy labels, release notes, natural language claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.readdle.calendars5 | Android listing, data safety, feature claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://readdle.com/calendars | Product features, pricing, integration claims, and natural language description | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help center | https://support.readdle.com/calendars | Calendar setup, natural language, tasks, sync, widgets, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://readdle.com/privacy | Data collection, calendar access, analytics, and third-party sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://readdle.com/terms | License, subscriptions, acceptable use, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support calendar account connection (iCloud, Google, Exchange, Outlook, CalDAV), permission primers for calendar/notifications, returning-user restore, and trial/subscription states.
- Natural language input must parse event descriptions into structured fields: title, date, time, duration, location, and recurrence from free-text input like "Team standup every weekday at 9am in Room A".
- Day view must show a scrollable timeline with events and tasks, current-time indicator, and tap-to-create at a time slot.
- Week view must display a 7-day grid with events positioned by time and tasks shown in a dedicated section.
- Month view must show event dots per day with task counts and allow tap to expand a day.
- List view must show upcoming events and tasks in chronological order with smart grouping (today, tomorrow, this week, later).
- Task management must integrate tasks alongside events: create tasks with optional due dates, priorities, notes, and completion tracking.
- Widgets must show today's schedule (events + tasks) and allow quick glance without opening the app.
- Drag-and-drop must allow rescheduling events by dragging in day/week views with haptic confirmation.
- Settings must include calendar accounts, default view, task preferences, notification preferences, widget configuration, subscription, privacy, terms, data export, and delete-account.
- Entitlements must model free (basic views), pro (all views, natural language, tasks, widgets), trial, expired, and restored states.
- Accessibility must support dynamic type, VoiceOver for calendar grid and task lists, visible focus, contrast, and reduced motion.
- Offline behavior must cache all calendar and task data locally, allow full event/task CRUD offline, and sync on reconnect.

## Core User Journeys

- New user installs, connects calendar accounts, grants permissions, and sees today's events in day view.
- User types a natural language description and the app parses it into a structured event with correct date, time, location, and recurrence.
- User creates a task with a due date and sees it appear on the calendar day view alongside events.
- User switches between day/week/month/list views to find the best perspective for their schedule.
- User drags an event in week view to reschedule it to a different time or day.
- User checks the widget on the home screen for a quick glance at today's schedule.
- User creates a recurring event and later modifies a single occurrence without affecting the series.
- User marks tasks as complete and sees them move to a completed section.
- User manages multiple calendar accounts, toggling visibility and color-coding.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Setup | Calendar connection and permissions | accounts, permissions | new, returning, trial | auth failure, permission denied |
| Day View | Timeline with events and tasks | scroll, tap, drag | loaded, empty, offline | sync error, overflow events |
| Week View | 7-day grid with drag-and-drop | tap, drag, swipe | loaded, dense, empty | many overlaps, drag conflict |
| Month View | Event dots and task counts | tap day, swipe month | loaded, sparse, dense | performance with many events |
| List View | Chronological upcoming schedule | scroll, tap, filter | loaded, empty, filtered | no upcoming events |
| Natural Language Input | Free-text event creation | text input, confirm/edit | parsing, parsed, ambiguous | parse failure, wrong date |
| Event Detail/Edit | Full event information and editing | form fields, recurrence | viewing, editing, saving | conflict, offline, deleted |
| Task Create/Edit | Task with due date and priority | title, date, priority, notes | draft, active, completed | no due date, overdue |
| Task List | All tasks with filtering | filter, sort, complete | active, completed, overdue | empty, many tasks |
| Widget Config | Widget appearance and calendars | select calendars, style | configured, previewing | too many events for widget |
| Settings | Accounts, preferences, subscription | forms, toggles, accounts | loaded, editing | sync error, expired subscription |

## Data Model

- `User`: account state, connected calendar accounts, default view preference, task settings, locale, timezone, entitlement state, and deletion/export status.
- `CalendarAccount`: provider (iCloud/Google/Exchange/Outlook/CalDAV), credentials/tokens, sync state, last sync, and enabled flag.
- `Calendar`: account reference, name, color, visibility toggle, default alerts, and read-only flag.
- `Event`: calendar reference, title, start/end with timezone, all-day flag, location, notes, URL, recurrence rule, alerts, attendees, and sync ID.
- `RecurrenceRule`: frequency (daily/weekly/monthly/yearly), interval, end condition, weekday selection, exceptions, and expansion cache.
- `Task`: title, due date (optional), priority (none/low/medium/high), notes, completion state, completion date, calendar reference, sort order, and sync ID.
- `NaturalLanguageParseResult`: input text, extracted title, date, time, duration, location, recurrence, confidence score, and ambiguity flags.
- `Widget`: type (today/upcoming), selected calendars, visible task counts, refresh timestamp, and layout preference.
- `DragOperation`: event reference, original time, target time, confirmation state, and undo metadata.
- `Entitlement`: user reference, tier (free/pro), billing cycle, platform, trial state, expiry, and restore state.
- `SyncRecord`: account reference, sync token, last sync, pending changes queue, conflict state, and error log.
- `LocalCacheRecord`: device-local calendar and task cache with dirty flags, conflict markers, and TTL.

## API And Backend Contracts

- Auth/accounts: `POST /accounts/connect`, `GET /accounts`, `DELETE /accounts/{id}`, `POST /accounts/{id}/sync` with OAuth and CalDAV credential management.
- Calendar sync: `GET /calendars`, `GET /events?range=&calendars=`, `GET /tasks?calendars=&status=` with incremental sync and ETags.
- Events: `POST /events`, `GET /events/{id}`, `PATCH /events/{id}`, `DELETE /events/{id}` with recurrence and conflict handling.
- Tasks: `POST /tasks`, `GET /tasks`, `PATCH /tasks/{id}`, `DELETE /tasks/{id}` with due-date, priority, and completion state.
- Natural language: `POST /events/parse` accepting free text and returning structured event fields with confidence score.
- Drag/reschedule: `PATCH /events/{id}/reschedule` with old/new time, conflict check, and undo token.
- Notifications: `POST /notification-preferences` with per-calendar and per-task alert configuration.
- Billing: `GET /entitlements`, `POST /entitlements/restore` with platform receipt validation.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings`.

## Realtime, Push, And Offline Behavior

- Cache complete calendar and task data locally for full offline CRUD capability.
- Queue all changes (creates, edits, deletes, completions, reschedules) with retry metadata when offline.
- Sync on reconnect using incremental tokens; detect conflicts (event modified on both client and server) and prompt user.
- Push notifications for event reminders, task due-date alerts, and calendar invitation responses.
- Widget refreshes via iOS WidgetKit timeline with next-event data; updates when app syncs.
- Background sync via iOS background fetch to keep widget and notifications current.

## Permissions, Privacy, And Safety

- Treat calendar data access, notification delivery, and widget data exposure as launch-blocking review areas.
- Request calendar access during account connection; provide local-only calendar option when denied.
- Request notifications when first event alert or task reminder is configured; provide in-app badge fallback.
- Do not send event titles, task content, attendee info, or calendar names in analytics.
- Calendar credentials stored in secure keychain; sync tokens never exposed to analytics or crash reports.
- Provide ICS export, data export, account deletion, and privacy controls from settings.
- Widget must not display sensitive event details on lock screen unless user explicitly enables it.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `account_connected`, `permission_granted`, `view_selected`, `onboarding_completed`.
- Core action events: `event_created`, `event_created_natural_language`, `task_created`, `task_completed`, `event_rescheduled_drag`, `view_switched`.
- Retention events: `app_opened`, `widget_viewed`, `notification_opened`, `sync_completed`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_completed`, `subscription_canceled`, `entitlement_restored`.
- Monetization model: freemium with pro subscription for advanced features; do not copy exact Readdle pricing.
- Analytics rule: do not send event/task content, attendee info, or calendar data as properties.

## Edge Cases

- Natural language input with ambiguous dates ("next Saturday" when today is Saturday); must use consistent forward-looking rule.
- Natural language input in non-English locales; parser must handle locale-specific date formats.
- Drag event to a time that overlaps with existing event; warn but allow overlap.
- Task with no due date appears in task list but not on any calendar day.
- Recurring event exception conflicts with sync; exception must not resurrect deleted occurrences.
- Widget shows stale data because background fetch was throttled by OS; show staleness indicator.
- CalDAV server returns VTODO without DTSTART; task must still display in task list.
- Very long event title in natural language input; truncate display but preserve full text.
- Multiple accounts have calendars with same name; distinguish by account label and color.
- Offline drag-and-drop followed by sync reveals server-side move; conflict resolution needed.
- Subscription expires while app is in background; on next launch lock pro features without losing data.

## Test Plan

- Unit tests for natural language parsing (date extraction, time extraction, location extraction, recurrence detection, ambiguity handling).
- Integration tests for CalDAV sync, Google sync, event CRUD, task CRUD, and drag-reschedule.
- Contract tests for calendar provider responses, natural language parse API, and widget timeline generation.
- Offline tests for cached reads, queued writes, conflict detection, reconnect sync, and widget staleness.
- Permission tests for calendar denied, notifications denied, and functional fallback behavior.
- Accessibility tests for VoiceOver on calendar grid, task list, natural language feedback, and dynamic type.
- Widget tests for data freshness, layout with varying event counts, and lock-screen privacy.
- Drag-and-drop tests for snap-to-grid, overlap warning, undo, and offline queuing.
- Natural language tests for 50+ common patterns across locales and edge cases.
- Billing tests for trial, purchase, subscription, cancellation, restore, and feature locking.

## Acceptance Criteria

- The app can be implemented with original branding while preserving the documented natural language calendar workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers.
- Natural language input correctly parses common event descriptions into structured fields.
- Tasks appear alongside events in calendar views with due-date positioning.
- Drag-and-drop reschedules events with visual feedback and undo capability.
- Widget displays today's schedule and updates via background fetch.
- Multiple calendar accounts sync correctly with conflict resolution.
- All entities have owners, lifecycle states, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, natural language, tasks, drag-drop, widget, offline, accessibility, sync conflict, billing, and data export.
- Hands-on native parity remains blocked until manual verification blockers have recorded lawful evidence.

## Open Questions

- Which natural language parsing approach (local ML model vs server-side vs regex library) best fits mobile performance?
- What is the exact task-calendar integration behavior when tasks are synced via CalDAV VTODO?
- How does the widget handle more than 10 events in a day?
- Which CalDAV extensions are required for full task sync (VTODO properties)?
- Is Android widget support in scope for V1?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, and analytics schema.
- Phase 2: Build day/week/month/list views, event creation, and task management with original design.
- Phase 3: Add natural language parsing, calendar sync, drag-and-drop rescheduling, and offline cache.
- Phase 4: Add widgets, notification system, subscription flows, and multi-account management.
- Phase 5: Complete natural language, accessibility, widget, sync, billing, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture native iOS/Android screen evidence for natural language input, day view, task integration, and widget rendering.
- Record CalDAV task sync behavior, widget interaction patterns, and natural language edge cases in a dedicated research note.
- Confirm privacy and data retention behavior before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
