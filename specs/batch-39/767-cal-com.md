# Cal.com-Style Clone Spec

> Metadata
> - Inspiration app: Cal.com
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: self-hosted vs cloud deployment differences, webhook/workflow execution reliability, team round-robin algorithm, payment collection via Stripe, video conferencing integration, routing forms logic, and subscription/seat-based billing.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Cal.com's public open-source scheduling infrastructure workflow. The V1 clone focuses on event types (one-on-one, group, round-robin, collective), booking pages, availability management, calendar connections, workflows/automations (email/SMS reminders, webhooks), team scheduling, routing forms, payment collection, video conferencing integration, embed widgets, and API-first architecture with both self-hosted and cloud deployment options.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, webhook, team, payment, video, routing, and deployment behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first open-source scheduling infrastructure experience with onboarding, event type management, booking, availability, workflows, teams, and settings flows.
- Reproduce the functional job behind Cal.com using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, workflow execution, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Cal.com branding, logos, screenshots, marketing copy, or protected media (note: Cal.com is open-source under AGPL but clone uses original implementation, not forked code).
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, webhook delivery, payment processing, and team scheduling states.
- Do not implement production payments, video conferencing, or webhook execution without separate provider and legal review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/cal-com/id1596622498 | iOS listing, privacy labels, release notes, scheduling claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.calcom.cal | Android listing, data safety, feature claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://cal.com/ | Product features, pricing, open-source model, and integration directory | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official documentation | https://cal.com/docs | API reference, event types, workflows, teams, routing, embeds, and self-hosting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://cal.com/privacy | Data collection, calendar access, booking data, analytics, and third-party integrations | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://cal.com/terms | Service terms, AGPL license, subscriptions, acceptable use, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support account creation, calendar connection (Google/Outlook/Apple), availability setup, first event type creation, and profile completion.
- Event types must support one-on-one (single host), group (multiple bookers same slot), round-robin (rotate among team members), and collective (all team members must be free) scheduling.
- Booking pages must display available time slots based on host availability, connected calendar busy times, buffer times, and booking limits; allow booker to select time, enter details, and confirm.
- Availability must be configurable per event type with weekly schedules, date-specific overrides, timezone handling, minimum notice, and booking window limits.
- Workflows must support automated actions triggered by booking events: confirmation emails, reminder emails/SMS, follow-up emails, webhook notifications, and custom sequences with timing.
- Team scheduling must support shared event types, round-robin assignment, collective availability checking, member management, and team-level settings.
- Routing forms must collect information from bookers before showing available times, with conditional logic to route to different event types or team members.
- Payment collection must integrate with Stripe to require payment at booking time for paid consultations.
- Video conferencing must auto-generate meeting links (Zoom, Google Meet, or custom) upon booking confirmation.
- Embed widgets must allow event type booking to be embedded on external websites via iframe or popup.
- API must be comprehensive and well-documented for developer integrations and custom booking flows.
- Settings must include profile, availability, calendars, integrations, team management, billing, privacy, terms, and delete-account.
- Entitlements must model free (limited event types), pro (unlimited, workflows, teams), and enterprise (SSO, audit, SLA) states.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, and reduced motion.
- Offline behavior must cache event type configurations and recent bookings; block new booking acceptance while offline.

## Core User Journeys

- Host creates account, connects calendar, sets availability, creates first event type, and shares booking link.
- Booker opens booking link, selects available time slot, enters name/email, and confirms booking.
- Host receives booking notification, sees event on connected calendar, and booker receives confirmation email.
- Host creates a workflow: reminder email sent 24h before meeting, follow-up email sent 1h after.
- Team admin creates a round-robin event type; bookings rotate among team members based on availability and assignment weight.
- Host creates a routing form that asks booker questions and routes to appropriate event type based on answers.
- Host enables payment collection; booker must pay via Stripe before booking is confirmed.
- Host embeds booking widget on their website; visitors can book without leaving the host's site.
- Host views booking analytics: total bookings, popular times, cancellation rate, and no-show tracking.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Setup | Account, calendar, availability, first event type | credentials, calendar, schedule | new, returning, connecting | auth failure, calendar denied |
| Event Types | List and manage event types | create, edit, duplicate, delete | loaded, empty, team | limit reached, permission denied |
| Event Type Editor | Configure scheduling parameters | duration, availability, questions | draft, active, disabled | validation error, conflict |
| Booking Page (Host View) | Preview booking page as booker sees it | preview, share link, embed | active, disabled, unavailable | no availability, expired |
| Booking Page (Booker) | Select time and confirm booking | time selection, form, payment | available, confirming, confirmed | no slots, payment failed, expired |
| Availability | Weekly schedule and overrides | day/time ranges, overrides | configured, default, custom | overlap, invalid range |
| Workflows | Automated action sequences | trigger, action, timing | active, draft, failed | delivery failure, webhook timeout |
| Team Management | Members, roles, round-robin config | invite, assign, weight | active, pending invites | member unavailable, rotation error |
| Routing Forms | Conditional booking routing | questions, logic, destinations | active, draft | invalid logic, no route match |
| Bookings | Upcoming and past bookings | view, cancel, reschedule | upcoming, past, canceled | no bookings, stale data |
| Integrations | Calendar, video, payment connections | connect, disconnect, configure | connected, disconnected | auth expired, provider error |
| Settings | Profile, billing, privacy, account | forms, subscription, delete | loaded, editing | billing error, subscription expired |

## Data Model

- `User`: account state, profile (name, avatar, timezone, bio), connected calendars, availability defaults, entitlement, and deletion/export status.
- `EventType`: owner/team reference, title, slug, duration options, location options (in-person/phone/video), description, booking questions, availability schedule reference, buffer times, booking limits, payment config, and active/disabled state.
- `Availability`: user/event-type reference, weekly schedule (day + time ranges), date-specific overrides, timezone, minimum booking notice, and maximum future window.
- `Booking`: event type reference, booker info (name, email, responses), selected time, host assignment, status (confirmed/canceled/rescheduled/no-show), payment state, video link, and calendar event ID.
- `Workflow`: event type reference, trigger (booking-created/booking-reminder/booking-canceled/after-event), actions (email/SMS/webhook), timing (offset from trigger), active state, and execution log.
- `WorkflowAction`: workflow reference, type (email/SMS/webhook), template/URL, timing offset, delivery state, and retry count.
- `Team`: name, slug, members (with roles and weights), shared event types, billing state, and settings.
- `TeamMember`: user reference, team reference, role (owner/admin/member), round-robin weight, and active state.
- `RoutingForm`: event type reference, questions, conditional logic rules, destination event types/members, and active state.
- `Integration`: user reference, provider (Google/Outlook/Zoom/Stripe/etc), credentials/tokens, scope, and connection state.
- `Payment`: booking reference, amount, currency, Stripe payment intent ID, status (pending/completed/refunded/failed), and timestamp.
- `Embed`: event type reference, type (iframe/popup/inline), allowed origins, and configuration.
- `Entitlement`: user/team reference, plan (free/pro/enterprise), seat count, feature flags, billing cycle, and platform.
- `AuditEvent`: booking, workflow execution, team changes, payment, and security-sensitive actions.
- `LocalCacheRecord`: event types, recent bookings, and availability cache with sync state.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/sso`, `DELETE /auth/session` with API key support for developer integrations.
- Event types: `POST /event-types`, `GET /event-types`, `GET /event-types/{id}`, `PATCH /event-types/{id}`, `DELETE /event-types/{id}` with team/personal scoping.
- Availability: `GET /availability?eventTypeId=&dateRange=`, `POST /availability/schedules`, `PATCH /availability/schedules/{id}` with timezone-aware slot computation.
- Bookings: `POST /bookings` (create from booker), `GET /bookings`, `PATCH /bookings/{id}` (cancel/reschedule), `GET /bookings/{id}` with status transitions.
- Workflows: `POST /workflows`, `GET /workflows`, `PATCH /workflows/{id}`, `DELETE /workflows/{id}`, `GET /workflows/{id}/executions` with action delivery status.
- Teams: `POST /teams`, `GET /teams`, `POST /teams/{id}/members`, `DELETE /teams/{id}/members/{memberId}` with role and weight management.
- Routing: `POST /routing-forms`, `GET /routing-forms/{id}`, `POST /routing-forms/{id}/evaluate` with conditional logic execution.
- Integrations: `POST /integrations/connect`, `GET /integrations`, `DELETE /integrations/{id}` with OAuth flow management.
- Payments: `POST /payments/create-intent`, `POST /payments/confirm`, `GET /payments/{id}` with Stripe webhook handling.
- Webhooks: `POST /webhooks`, `GET /webhooks`, `DELETE /webhooks/{id}` for external system integration.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings`.

## Realtime, Push, And Offline Behavior

- Cache event types, availability configurations, and recent bookings locally for offline viewing.
- Block new booking acceptance while offline (requires real-time availability check against connected calendars).
- Push notifications for new bookings, cancellations, reschedules, upcoming meeting reminders, and workflow failures.
- Webhook delivery must use retry with exponential backoff; mark as failed after configurable retry limit.
- Workflow email/SMS delivery must track delivery state and surface failures to host.
- Real-time availability must check connected calendars at booking time to prevent double-booking.
- Background sync for booking status updates, calendar changes, and workflow execution results.

## Permissions, Privacy, And Safety

- Treat calendar access, booker PII collection, payment processing, and webhook data exposure as launch-blocking review areas.
- Request calendar access during onboarding; required for availability computation (no fallback for manual-only availability).
- Booker data (name, email, form responses) must be handled per privacy policy; provide data deletion for bookers.
- Payment data never touches the app server; Stripe handles PCI compliance via client-side tokenization.
- Webhook payloads must not include booker PII unless host explicitly configures it with appropriate data processing agreements.
- Do not send booker emails, phone numbers, form responses, or payment details in analytics.
- Provide host data export, account deletion, and booking data retention configuration.
- Team admin must not access individual member's personal calendar contents; only busy/free status.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `calendar_connected`, `availability_set`, `event_type_created`, `booking_link_shared`.
- Core action events: `booking_created`, `booking_canceled`, `booking_rescheduled`, `workflow_triggered`, `workflow_action_delivered`, `routing_form_submitted`.
- Retention events: `app_opened`, `booking_page_viewed`, `event_type_duplicated`, `team_member_added`, `integration_connected`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_completed`, `seat_added`, `subscription_canceled`, `entitlement_expired`.
- Monetization model: freemium with pro/enterprise tiers; do not copy exact Cal.com pricing or plan names.
- Analytics rule: do not send booker PII, form responses, payment amounts, calendar contents, or webhook URLs as event properties.

## Edge Cases

- Booker selects a time slot that becomes unavailable between page load and confirmation (race condition); must return conflict error with refresh.
- Round-robin assignment when all team members are at capacity; must show "no availability" rather than over-assign.
- Workflow email delivery fails (bounced email); must surface failure to host and retry within limits.
- Payment authorization succeeds but booking confirmation fails; must refund automatically and notify booker.
- Calendar connection token expires between availability check and booking confirmation; must re-validate before confirming.
- Booker in timezone with DST transition during booking window; all times must render correctly.
- Team member removed while having future bookings; bookings must be reassigned or canceled with notification.
- Routing form logic produces no valid destination; must show fallback or error state.
- Self-hosted deployment with different feature set than cloud; mobile app must handle feature flags dynamically.
- Embed widget loaded on untrusted origin; must validate allowed origins before rendering.
- Large number of concurrent booking attempts for same group slot; must enforce capacity atomically.
- Webhook endpoint returns 5xx; retry with backoff, mark failed after limit, alert host.

## Test Plan

- Unit tests for availability computation, round-robin assignment, routing form logic evaluation, workflow timing, and timezone handling.
- Integration tests for calendar sync, booking creation, payment flow, workflow execution, team management, and API endpoints.
- Contract tests for every API response shape, webhook payload format, Stripe integration, and calendar provider responses.
- Concurrency tests for double-booking prevention, group capacity enforcement, and round-robin fairness.
- Offline tests for cached event types, blocked booking acceptance, and reconnect sync.
- Workflow tests for email delivery, SMS delivery, webhook delivery, retry logic, and failure surfacing.
- Payment tests for successful payment, failed payment, refund on booking failure, and subscription billing.
- Team tests for round-robin rotation, collective availability, member addition/removal, and weight-based assignment.
- Routing tests for conditional logic evaluation, fallback handling, and destination validation.
- Accessibility tests for booking page screen reader labels, focus order, dynamic type, and contrast.
- Billing tests for free limits, pro upgrade, enterprise features, seat-based billing, and entitlement enforcement.

## Acceptance Criteria

- The app can be implemented with original branding while preserving the documented open-source scheduling infrastructure workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers.
- Event types support one-on-one, group, round-robin, and collective scheduling modes.
- Booking pages compute real-time availability from connected calendars.
- Workflows execute automated actions (email, SMS, webhook) on booking lifecycle events.
- Team scheduling rotates among members fairly based on availability and weight.
- Payment collection integrates with Stripe for paid event types.
- Routing forms conditionally direct bookers to appropriate event types.
- All entities have owners, lifecycle states, and deletion/export behavior.
- At least 10 acceptance tests cover booking flow, availability, workflows, teams, routing, payments, concurrency, offline, accessibility, and billing.
- Hands-on native parity remains blocked until manual verification blockers have recorded lawful evidence.

## Open Questions

- What is the exact round-robin algorithm (weighted random vs sequential vs least-recently-booked)?
- How does the self-hosted deployment differ in feature availability from the cloud version?
- What are the exact retry limits and backoff strategy for webhook and workflow delivery?
- Which video conferencing providers are supported and what is the link generation protocol?
- What data isolation exists between team members' personal calendars and team scheduling?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, and analytics schema.
- Phase 2: Build onboarding, event type management, availability configuration, and basic booking flow with original design.
- Phase 3: Add calendar sync, real-time availability computation, booking confirmation, and notification system.
- Phase 4: Add workflows, team scheduling, routing forms, payment integration, and embed widgets.
- Phase 5: Complete concurrency, workflow, payment, team, accessibility, billing, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture native iOS/Android screen evidence for event type creation, booking page, workflow editor, and team management.
- Record webhook delivery, payment flow, round-robin algorithm, and self-hosted differences in a dedicated research note.
- Confirm Stripe integration requirements and video conferencing provider scope before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
