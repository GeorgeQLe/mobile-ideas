# Calendly-Style Clone Spec

> Metadata
> - Inspiration app: Calendly
> - Category: Scheduling
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, help center — pending exact URL verification.
> - Manual verification blockers: calendar OAuth scopes per provider, timezone edge cases, push notifications, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, and OAuth integrations to user-consented calendars only.

## Overview

Build an original mobile scheduling app inspired by Calendly: meeting types, availability rules, booking links, calendar connections, and invitee experience.

The clone must not copy Calendly branding, iconography, feature names, or private APIs.

## Goals

- Create meeting types with duration, availability rules, location.
- Connect calendars (Google, Microsoft, Apple) with minimal scopes.
- Share booking links; invitee selects time and confirms.
- Send reminders and reschedule/cancel flows.
- Team scheduling (round robin, collective).

## Non-Goals

- Do not imply Calendly affiliation.
- Do not store invitee PII beyond booking lifecycle.
- Do not bypass calendar scopes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/calendly-meeting-scheduling/id1187711434 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.calendly.app | Android listing, data safety | Source discovery — pending exact URL verification |
| Calendly Help | https://help.calendly.com/ | Meeting types, availability, integrations | Source discovery — pending exact URL verification |
| Calendly Security | https://calendly.com/security | SSO, data handling | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Meeting types have duration, buffer, availability windows, location (conference or in-person).
- Calendar connections supply busy times and create events.
- Booking link is public; invitee confirms with name, email, answers.
- Reminders via email and/or SMS (with consent).
- Reschedule/cancel via signed token link.

## Core User Journeys

- User signs up, connects a calendar, creates a 30-min meeting type.
- User customizes availability rules and buffer times.
- User shares a booking link; invitee picks a slot and confirms.
- Invitee receives confirmation with ICS and calendar event.
- Organizer receives a push and sees booking in app.
- Invitee reschedules via link; calendars update.
- Organizer connects a second calendar for conflict detection.
- Organizer sets round-robin for a team meeting type.
- Organizer disconnects calendar; active events preserved, future bookings pause.
- Organizer deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth | Sign-in and calendar connect | provider pick | waiting, connected | scope denied |
| Dashboard | Upcoming meetings | act | empty, items | offline |
| Meeting Types | Manage | add/edit | empty, loaded | required field |
| Meeting Editor | Configure type | duration, rules | drafting, saved | invalid rule |
| Availability | Working hours | edit | loaded | time zone mismatch |
| Booking Page (invitee) | Pick time and confirm | date, slot, form | loading, selected, confirmed | all slots full |
| Event Detail | View booking | reschedule, cancel | active, canceled, past | token expired |
| Integrations | Calendar connections | connect/disconnect | connected, disconnected | scope revoked |
| Settings | Account, notifications | toggles | loaded | admin-managed |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |

## Data Model

- `User`, `Organization` (optional), `MeetingType`, `AvailabilityRule`, `BufferRule`, `CalendarConnection` (provider, tokens), `BusyBlock` (cached), `Booking` (time, invitee, answers), `ReminderSchedule`, `ReschedToken`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `POST /calendar/connect/:provider`, `DELETE /calendar/connect/:id`.
- `GET /meeting-types`, `POST /meeting-types`, `PATCH /meeting-types/:id`, `DELETE /meeting-types/:id`.
- `GET /availability?meetingTypeId=&date=` (public endpoint for invitee).
- `POST /bookings` (public, requires captcha), `POST /bookings/:token/reschedule`, `POST /bookings/:token/cancel`.
- `GET /bookings?view=upcoming|past` (auth).
- `POST /reminders/schedule` (internal).
- `GET /entitlements`, `POST /billing/webhook`.
- `POST /teams/:id/round-robin` (team scheduling config).

## Realtime, Push, And Offline Behavior

- Calendar conflict check runs at invitee selection time.
- Push for new booking, reschedule, cancel — opaque payloads.
- Offline read of recent bookings; no public booking endpoints offline.
- Reminder worker sends on schedule regardless of app state.

## Permissions, Privacy, And Safety

- Calendar OAuth scopes minimized: read busy blocks, create event in primary.
- Meeting subjects redacted in analytics; stored events use organizer-chosen titles.
- SMS reminders require invitee opt-in with clear terms.
- Captcha on public booking endpoint.
- Export + delete available.
- Audit log for disconnects and policy changes.

## Analytics And Monetization

- Events: meeting type created, calendar connected, booking created/canceled/rescheduled, reminder sent.
- Tiers original; paywall identifies blocked feature (team scheduling, integrations).

## Edge Cases

- Timezone DST boundary on booking.
- Calendar scope revoked mid-booking cycle.
- Invitee browser out of sync with server time.
- Double-booking race; server must hold and validate.
- Reschedule token expired.
- Team member leaves org with active bookings.

## Test Plan

- Unit tests for availability calculation across DST, buffers, round-robin assignment.
- Contract tests for public/private endpoints.
- Integration tests for end-to-end booking + reschedule + cancel.
- Timezone tests with multiple DST scenarios.
- Privacy tests for minimum calendar scopes.
- Billing tests.
- Accessibility tests for date/time pickers.
- Manual verification: OAuth per provider, push, calendar event creation.

## Acceptance Criteria

- Source URLs verified.
- Meeting type + calendar connect + public booking + reschedule flows complete.
- Scopes minimized and revocable.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- SMS provider?
- Which calendar providers in V1?
- Team scheduling in V1 or later?
- Captcha provider?

## Build Plan

- Phase 1: auth + meeting types + availability + public booking.
- Phase 2: calendar integrations (Google first).
- Phase 3: reminders (email) + reschedule/cancel.
- Phase 4: SMS reminders + captcha.
- Phase 5: team scheduling + billing.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Select SMS and captcha providers.
- Define OAuth scopes per provider.
