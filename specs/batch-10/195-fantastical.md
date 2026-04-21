# Fantastical-Style Clone Spec

> Metadata
> - Inspiration app: Fantastical
> - Category: Calendar
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Flexibits help pages — pending exact URL verification.
> - Manual verification blockers: natural-language parsing fidelity, calendar account scopes, widget/complication behavior, subscription purchase/restore, and accessibility passes still require a test device.
> - Legal scope: functional parity only; use original UI, branding, NLP, and OAuth integrations.

## Overview

Build an original mobile calendar app inspired by Fantastical: natural-language event entry, unified inbox of calendars/tasks, weather-aware agenda, and delightful mobile UX.

The clone must not copy Fantastical branding, iconography, feature names, or private APIs.

## Goals

- Natural-language event entry ("lunch with Alex tomorrow at noon").
- Unified view of multiple calendars and tasks.
- Day, week, month, year, and agenda views.
- Weather integration in agenda.
- Widgets and complications (Apple Watch optional in V1).

## Non-Goals

- Do not imply Flexibits affiliation.
- Do not parse or store private calendar data beyond user-consented scopes.
- Do not use NLP training data that includes proprietary sources.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/fantastical-calendar-tasks/id718043190 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Flexibits Support | https://flexibits.com/support | NLP, calendars, weather | Source discovery — pending exact URL verification |
| Flexibits Privacy | https://flexibits.com/privacy | Personal data, subscriptions | Source discovery — pending exact URL verification |
| Flexibits Product | https://flexibits.com/fantastical | Product features, views | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Natural-language parser recognizes date, time, duration, attendees (by contact), location, alerts.
- Calendar sources: iCloud, Google, Microsoft 365, CalDAV.
- Task sources: Reminders, Todoist, local.
- Multiple views selectable per screen size.
- Widgets on home screen and lock screen (iOS).

## Core User Journeys

- User connects primary calendar accounts and reminders.
- User types "dinner Fri 7pm with Sam" and confirms parsed event.
- User switches to week view and long-presses to create an event.
- User opens agenda; sees today's events with weather.
- User sets a task due date; task appears on calendar.
- User adds event with invitees; invitation sent via account provider.
- User adds a widget to home screen showing today.
- User subscribes to premium for advanced features.
- User exports data or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Connect accounts, permissions | provider pick, permission | waiting, connected | scope denied |
| Agenda | Today / upcoming | scroll, act | loaded, empty | offline |
| Day View | Hour-by-hour | scroll, tap | loaded | overlap |
| Week View | 7 days | scroll | loaded | perf limit |
| Month View | Calendar grid | tap day | loaded | grid dense |
| Year View | Heatmap | tap month | loaded | empty |
| Quick Entry (NLP) | Type to create | text | parsing, parsed, confirmed | parse failed |
| Event Detail | Edit event | fields, alerts | loaded, editing | conflict |
| Task Detail | Edit task | due, list | loaded | list removed |
| Accounts | Manage | add/remove | connected, disconnected | scope revoked |
| Settings | Preferences, notifications | toggles | loaded | restricted |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |

## Data Model

- `User`, `Account` (provider, tokens), `Calendar`, `Event`, `Task`, `TaskList`, `NLPParseResult`, `WeatherDaily`, `Widget`, `AlertRule`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `POST /accounts/:provider/connect`, `DELETE /accounts/:id`.
- `GET /events?from=&to=`, `POST /events`, `PATCH /events/:id`, `DELETE /events/:id`.
- `GET /tasks`, `POST /tasks`, `PATCH /tasks/:id`.
- `POST /nlp/parse` (text) -> proposed event/task structure.
- `GET /weather?lat=&lon=&date=`.
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Calendar sync via provider APIs; delta updates where supported.
- Events cached offline; edits queued and applied on reconnect.
- Notifications for alerts run locally when possible to avoid cloud leak.
- Weather fetched periodically; cached for offline agenda.

## Permissions, Privacy, And Safety

- Contacts scope requested only for attendee autocomplete (local-first).
- Location optional for weather; use approximate by default.
- NLP runs on-device where possible; cloud NLP opt-in.
- Calendar subjects excluded from analytics.
- Audit log for account connects/disconnects.
- Export + delete account.

## Analytics And Monetization

- Events: event created (via NLP vs manual), calendar connected, view switched, widget added.
- Tiers original; paywall identifies blocked feature (advanced NLP, weather, widgets).

## Edge Cases

- Ambiguous NLP parse ("next Friday").
- Provider API throttles.
- Recurring event edits (this/all/future).
- DST boundary.
- Deleted account with local widgets.
- Offline edit conflicting with provider change.

## Test Plan

- Unit tests for NLP across locales, recurrence rules, DST arithmetic.
- Contract tests for provider adapters and internal APIs.
- Integration tests for connect/create/edit/delete + widgets.
- Privacy tests for contacts minimization and location defaults.
- Billing tests.
- Accessibility tests for dynamic type, VoiceOver on calendar grid.
- Manual verification: widgets, complications, NLP on device.

## Acceptance Criteria

- Source URLs verified.
- NLP quick entry functional with at least one locale.
- Calendar and task integrations work with minimized scopes.
- Widgets functional on iOS.
- Manual blockers feature-flagged.

## Open Questions

- On-device NLP model or cloud?
- Which locales in V1?
- Watch app in V1?
- Android parity in V1?

## Build Plan

- Phase 1: auth + calendar sync (one provider) + day/agenda views.
- Phase 2: NLP quick entry (on-device).
- Phase 3: week/month/year views.
- Phase 4: tasks + weather.
- Phase 5: widgets + complications.
- Phase 6: billing + accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Pick NLP engine.
- Define calendar provider adapters.
