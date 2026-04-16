# 092 Google Calendar Clone Spec

## Legal Scope
- Clone calendar views, event creation, invites, reminders, and recurrence handling.
- Use original branding placeholders and custom calendar visuals.

## Product Goal
- Help a user schedule events, manage multiple calendars, and coordinate availability.

## Research Verification Checklist
- Public calendar views, event editor, and invite behaviors: verify.
- Time zone, recurrence, and notification semantics: verify.
- Shared calendar permissions and mobile editing limits: verify.

## Core User Journeys
- User creates a one-time event with reminder.
- User adds a recurring event and edits one occurrence.
- User shares availability or invites attendees.
- User switches between day, week, month, and agenda views.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Calendar | Main schedule | Date, view mode | Populated, empty | Time zone jump |
| Event Editor | Create/edit event | Title, time, guests | Draft, saved | Conflict |
| Invite Detail | Guest management | RSVP, notes | Pending, accepted | Bounced invite |
| Search | Find events | Query | Results, none | Permission denied |
| Settings | Calendar prefs | Defaults, notifications | Active, saved | Multiple accounts |

## Functional Requirements
- Support event create/update/delete with reminders and attendees.
- Support recurring events, all-day events, and time zones.
- Support multiple calendars, color coding, and visibility controls.
- Show conflict warnings and suggested times.
- Allow offline edits to draft events.

## Data Model
- `Account`, `Calendar`, `Event`, `RecurrenceRule`, `Attendee`, `Reminder`, `AvailabilityBlock`, `NotificationPref`.
- Store local timezone and event source metadata.

## API/Backend Contracts
- `GET /calendars`
- `GET /events?calendar_id=&range=`
- `POST /events`
- `PATCH /events/{id}`
- `POST /events/{id}/invitees`
- `POST /availability/suggest`

## Realtime/Push/Offline
- Push for invite updates and upcoming reminders.
- Realtime sync for shared calendars and RSVP changes.
- Offline event draft creation with later server reconciliation.

## Permissions/Privacy/Safety
- Calendar and notification permissions are optional until needed.
- Protect event details in lock-screen notifications.
- Respect shared calendar access levels.

## Analytics Events
- `event_created`, `event_updated`, `event_deleted`, `invite_sent`, `rsvp_changed`, `view_mode_changed`, `search_used`, `reminder_set`.

## Monetization
- Core consumer product may remain free; optional premium tier for advanced scheduling and admin tools.

## Acceptance Tests
- Create a recurring event and edit one instance only.
- Switch time zones and confirm event rendering remains correct.
- Receive a reminder notification for an upcoming event.
- Invite a guest and observe RSVP state updates.

## Implementation Notes
- Normalize recurrence expansion server-side for consistency.
- Keep calendar rendering virtualized for large event sets.
- Treat time zones as first-class data rather than display decoration.

