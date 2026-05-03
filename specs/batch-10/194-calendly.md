# Calendly-Style Clone Spec

> Metadata
> - Inspiration app: Calendly
> - Category: Scheduling
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Calendly Help pages, security/privacy/legal pages, and public pricing pages.
> - Manual verification blockers: calendar OAuth scopes per provider, iOS/Android notification behavior, timezone edge cases, team scheduling assignment rules, SSO/SAML, billing purchase/restore, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, private APIs, customer booking data, and unconsented calendar data.

## Overview

Build an original mobile scheduling app inspired by Calendly's public mobile and help documentation: meeting/event types, availability schedules, booking links, invitee booking pages, calendar connections, upcoming meetings, reschedule/cancel flows, notifications, integrations, team scheduling, and entitlement-aware administration.

The clone must not copy Calendly branding, screenshots, UI copy, icons, private APIs, customer booking data, or calendar provider data beyond user-consented scopes. V1 can reproduce comparable scheduling jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support account setup, meeting/event type creation, availability schedules, buffers, booking limits, locations, invitee questions, and shareable links/QR codes.
- Support public invitee booking with timezone-aware slot selection, confirmation, reschedule, cancellation, and calendar event creation.
- Support calendar connections to Google, Microsoft/Office 365/Outlook, and iCloud-like sources with minimized OAuth scopes and revocation handling.
- Support organizer mobile flows for viewing upcoming meetings, joining conference links, managing availability, editing event types, and receiving notifications.
- Enforce organization/team permissions, routing/round-robin/collective scheduling gates, SSO-ready sessions, audit events, export/delete, and subscription gates.

## Non-Goals

- Do not imply Calendly affiliation or copy Calendly brand assets.
- Do not copy pricing copy, screenshots, UI copy, icons, private APIs, or customer booking data.
- Do not store invitee PII beyond the booking lifecycle and configured retention.
- Do not bypass calendar OAuth consent, provider rate limits, anti-abuse controls, SSO, workspace policy, or billing state.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/calendly-mobile/id1451094657 | Official iOS listing, mobile positioning, privacy labels, in-app purchase signal | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.calendly.app | Official Android listing, data-safety summary, scheduling features, calendar integrations | Verified 2026-05-03 |
| Calendly Mobile App Overview | https://calendly.com/help/calendly-mobile-app-overview | Mobile capabilities: meetings, sharing links, booking, availability, event types, notifications | Verified 2026-05-03 |
| Calendly Mobile App FAQ | https://calendly.com/help/mobile-app-faq | Mobile support boundaries including event types, availability, and desktop-only connection changes | Verified 2026-05-03 |
| Calendly Platform Security and Compliance | https://help.calendly.com/hc/en-us/articles/360009867334-Calendly-Platform-Security-and-Compliance | Security, privacy, compliance, and least-privilege calendar access posture | Verified 2026-05-03 |
| Calendly Privacy Notice | https://calendly.com/legal/privacy-notice | Personal-data, invitee-data, and calendar-data handling context | Verified 2026-05-03 |
| Calendly Legal Terms | https://calendly.com/legal | Account, acceptable-use, service, and subscription legal context | Verified 2026-05-03 |
| Calendly Pricing | https://calendly.com/pricing/ | Public entitlement and feature-gating signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Sign-in must support email/OAuth now and be SSO/SAML-ready for managed organizations.
- Onboarding must connect at least one calendar provider, request minimal scopes, and show degraded mode when provider connection is skipped or revoked.
- Meeting/event types must include title, duration, location/conference option, availability schedule, buffers, minimum notice, daily limits, invitee questions, reminders, cancellation policy, and active/hidden state.
- Availability must compute slots from schedules, buffers, busy blocks, timezone, daylight-saving rules, booking limits, team assignment rules, and provider conflicts.
- Public booking page must support slot browsing, invitee form, confirmation, captcha/anti-abuse, ICS/calendar event, reschedule, cancellation, and token expiry.
- Mobile organizer dashboard must show upcoming meetings, invitee answers, join links, reschedule/cancel actions, booking status, and notification preferences.
- Share flows must provide copied links, one-time links where supported, QR code-like share, default message, and native share sheet behavior.
- Team scheduling must support round-robin and collective meeting types when entitlement and permissions allow; unsupported rules must remain gated.
- Calendar provider writes must be idempotent, revocable, least-privilege, and reconciled after webhook/provider failures.
- Entitlements must gate multiple event types, calendar connections, team scheduling, routing/forms, reminders, integrations, SSO/admin, audit logs, and usage volume server-side.
- Push/SMS/email payloads must minimize invitee and meeting details and fetch sensitive content only after session validation.
- Analytics must exclude raw invitee answers, calendar subjects, meeting notes, conference links, phone numbers, and customer identifiers.

## Core User Journeys

- User signs up, connects a calendar, creates a 30-minute event type, and shares the booking link.
- User edits availability, buffers, minimum notice, daily limits, and a custom invitee question from mobile.
- Invitee opens the public booking page, selects timezone/date/slot, fills the form, passes anti-abuse checks, and confirms.
- Organizer receives a notification, opens the meeting, reviews invitee answers, and joins a video link.
- Invitee reschedules through a signed token; provider calendar events update idempotently.
- Organizer cancels a booking and sees notification/reminder cleanup.
- Organizer connects a second calendar for conflict detection and later revokes it.
- Team admin creates a round-robin/collective event type and handles member availability differences.
- Admin-managed user signs in via SSO and sees locked settings, audit logging, and entitlement-gated controls.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Organization | Sign in and select org | email/OAuth/SSO, org | waiting, authenticated, selected | SSO failure, domain blocked |
| Onboarding / Calendar Connect | Connect provider | provider, scope consent | connected, skipped | scope denied, provider down |
| Dashboard | Upcoming meetings and quick links | open, join, share | empty, upcoming, loaded | offline, token stale |
| Event Types | Manage schedulable links | add, edit, clone, hide | empty, loaded, gated | required field missing |
| Event Type Editor | Configure booking rules | duration, location, questions | drafting, saved | invalid rule |
| Availability | Working hours and exceptions | hours, buffers, limits | loaded, saved | timezone mismatch |
| Public Booking Page | Invitee selects time | date, slot, form | loading, selected, confirmed | no slots, captcha failed |
| Booking Detail | View/reschedule/cancel | join, reschedule, cancel | active, past, canceled | token expired |
| Team Scheduling | Round-robin/collective rules | members, assignment, limits | saved, gated | no available members |
| Integrations | Calendar/app connections | connect, disconnect | connected, revoked | provider rate limited |
| Settings / Admin Notice | Account and policy | toggles, logout, cache | loaded, managed | admin locked, offline |
| Subscription | Plans and restore | plan, restore | free, trial, paid | webhook delay |

## Data Model

- `Organization`: tenant, domain, entitlement, SSO policy, retention settings, admin configuration.
- `User`: identity, org role, notification preferences, locale, timezone, managed flags.
- `CalendarConnection`: provider, account metadata, scopes, token reference, sync cursor, revoked state.
- `Calendar`: provider calendar metadata, primary/write target, conflict-check flag.
- `MeetingType`: owner/team, slug, duration, location, schedule, buffers, limits, questions, active state, entitlement flags.
- `AvailabilitySchedule`: weekly windows, date overrides, timezone, holidays/blocked dates, version.
- `BusyBlock`: provider, calendar, start/end, opaque source ID, sync status.
- `Booking`: meeting type, assigned host(s), start/end, invitee reference, answers reference, provider event IDs, status.
- `Invitee`: name, email, phone optional, timezone, consent flags, retention state.
- `ReminderSchedule`: booking, channel, send time, consent state, delivery status.
- `RescheduleCancelToken`: booking, capability, expiry, consumed state, audit metadata.
- `TeamAssignmentRule`: round-robin/collective members, weights, availability constraints, fallback.
- `Integration`: video/app provider, OAuth connection, webhook status, entitlement gate.
- `AuditEvent`: auth, calendar, meeting type, booking, reminder, team rule, billing, export/delete, and admin changes.
- `Entitlement`: tier, seats, feature flags, usage counters, renewal/expiration, billing owner.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /organizations`, `GET /users/me`, `GET /settings`: context.
- `POST /calendar/connect/:provider`, `DELETE /calendar/connections/:id`, `GET /calendar/connections`: calendar OAuth.
- `POST /calendar/webhooks/:provider`, `POST /calendar/sync/:connectionId`: provider sync.
- `GET /meeting-types`, `POST /meeting-types`, `GET /meeting-types/:id`, `PATCH /meeting-types/:id`, `DELETE /meeting-types/:id`: event types.
- `GET /availability?slug=&from=&to=&timezone=`, `POST /bookings`: public booking.
- `GET /bookings?view=upcoming|past`, `GET /bookings/:id`, `POST /bookings/:token/reschedule`, `POST /bookings/:token/cancel`: booking lifecycle.
- `POST /teams/:id/assignment-rules`, `PATCH /teams/:id/assignment-rules/:ruleId`: team scheduling.
- `POST /reminders/schedule`, `POST /reminders/webhook/:provider`: reminders.
- `GET /integrations`, `POST /integrations/:provider/connect`, `DELETE /integrations/:id`: app/video integrations.
- `GET /entitlements`, `POST /billing/webhook`, `POST /data-export`, `DELETE /account`, `GET /audit-events`: billing/privacy/admin.

## Realtime, Push, And Offline Behavior

- Calendar sync uses provider APIs/webhooks and delta cursors where available; stale provider state must be labeled.
- Public slot selection must revalidate availability at booking time and use short-lived holds to prevent double booking.
- Booking, reschedule, cancellation, reminder, and provider-write events are idempotent with retry-safe mutation IDs.
- Offline mode supports cached upcoming bookings and event-type drafts; public booking and provider writes require connectivity.
- Push payloads use opaque IDs for bookings, reschedules, cancellations, reminders, and calendar-connection failures.
- Reminder workers send email/SMS/push according to consent and cancellation/reschedule state regardless of app state.
- Cache purge must run on logout, SSO deprovisioning, organization policy change, calendar revocation, or account delete.

## Permissions, Privacy, And Safety

- Enforce organization, user, team, meeting type, booking, calendar connection, integration, reminder, and admin roles on every operation.
- Calendar OAuth scopes must be minimal, provider-specific, revocable, and documented before implementation.
- Public booking endpoints require anti-abuse controls: captcha/risk scoring, rate limits, token entropy, email validation, and spam throttles.
- SMS reminders require explicit invitee opt-in, unsubscribe handling, and telecom compliance review.
- Analytics exclude raw invitee answers, calendar subjects, notes, phone numbers, conference links, and customer identifiers.
- Support diagnostics default to metadata; raw booking data inspection requires user/admin consent and audit logging.
- Provider tokens require encryption, rotation, least-privilege access, revocation cleanup, and secret redaction in logs.
- Export/delete workflows must account for organizer data, invitee data, calendar-provider artifacts, retention, and legal obligations.

## Analytics And Monetization

- Track privacy-safe events: calendar connected, meeting type created, availability saved, link shared, slot viewed, booking created, booking canceled/rescheduled, reminder sent, provider sync failed, team assignment used, entitlement gate hit.
- Event payloads use object types, counts, role class, timezone class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers may gate multiple event types, multiple calendars, team scheduling, routing/forms, reminders, integrations, SSO/SAML, audit logs, admin policy, and usage volume.
- Paywalls must identify blocked capability, current entitlement, billing owner/admin contact, restore path, and support path.

## Edge Cases

- Daylight-saving transition creates missing or duplicated local times.
- Invitee and organizer timezones change during slot selection.
- Calendar provider webhook is delayed, duplicated, or lost.
- Calendar OAuth scope is revoked mid-booking.
- Double-booking race occurs between slot display and confirmation.
- Team member leaves organization with active bookings.
- Round-robin host has a private busy block that conflicts after assignment.
- Reschedule/cancel token is expired, reused, guessed, or revoked.
- SMS reminder lacks consent or telecom delivery fails.
- SSO session expires during event-type save or integration connect.
- Entitlement downgrade hides team scheduling/integrations while screen is open.
- Export/delete intersects with legal retention and invitee notification requirements.

## Test Plan

- Unit tests for availability calculation, DST arithmetic, buffers, daily limits, booking holds, round-robin assignment, token expiry, permission checks, provider idempotency, and entitlement gates.
- Contract tests for auth, calendar OAuth/sync, meeting types, public availability, bookings, reschedule/cancel, reminders, integrations, team rules, billing, export/delete, and audit routes.
- Integration tests for onboarding, calendar connect, event-type create/edit/share, public booking, reschedule, cancel, upcoming detail, join link, team scheduling, and logout.
- Provider tests for Google, Microsoft/Office 365/Outlook, iCloud/CalDAV-like behavior where lawfully available, including scope revocation and rate limits.
- Timezone tests across DST, leap day, crossing midnight, organizer/invitee timezone changes, and server clock drift.
- Privacy/security tests for analytics redaction, push opacity, provider token encryption, public endpoint rate limits, captcha, signed tokens, and raw-content access controls.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and enterprise-managed states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, date/time picker alternatives, form validation, color contrast, reduced motion, and hardware keyboard.
- Manual verification tests: provider OAuth scopes, iOS/Android notifications, timezone edge cases, team scheduling rules, SSO/SAML, billing purchase/restore, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Calendly brand assets, private APIs, customer booking data, or unconsented calendar data.
- Event types, availability, public booking, calendar sync, reschedule/cancel, reminders, team scheduling, notifications, integrations, and settings have deterministic contracts and failure codes.
- Calendar scopes, permissions, entitlements, provider idempotency, booking holds, and timezone logic reconcile safely.
- Enterprise SSO/SAML, audit, export/delete, and admin-managed behavior are supported or explicitly feature-flagged.
- Analytics, push, support, cache, logs, and reminder payloads minimize invitee and calendar data.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which calendar providers are V1: Google, Microsoft, iCloud/CalDAV, or a staged subset?
- Which video/integration providers are V1: Zoom, Google Meet, Microsoft Teams, or manual links?
- Is SMS reminder support V1 or deferred due to telecom compliance?
- Which team scheduling rules are V1: round-robin, collective, routing forms, or one-on-one only?
- Which captcha/risk provider and public endpoint abuse strategy will be used?
- What invitee-data retention period is acceptable by default?

## Build Plan

- Phase 1: scaffold auth, calendar connection abstraction, meeting types, availability engine, public booking page, and privacy-safe analytics.
- Phase 2: add provider sync/write integration, booking holds, reschedule/cancel tokens, upcoming dashboard, and email reminders.
- Phase 3: add mobile sharing, availability editor, invitee questions, integrations, team scheduling, and notification preferences.
- Phase 4: add push/SMS reminder workers, anti-abuse controls, offline cached organizer views, provider retry/idempotency, and cache purge.
- Phase 5: add SSO/SAML-ready admin, entitlements, audit events, export/delete, support diagnostics, and billing reconciliation.
- Phase 6: complete accessibility, security/privacy review, provider/timezone tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 provider, team scheduling, reminder, and integration scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
