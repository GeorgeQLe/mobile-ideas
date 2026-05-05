# SavvyCal-Style Clone Spec

> Metadata
> - Inspiration app: SavvyCal
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: calendar overlay rendering for recipients, recipient time zone detection accuracy, multi-calendar aggregation display, routing rules logic, ranked availability algorithm, personalized link behavior, and subscription restore.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by SavvyCal's public recipient-first scheduling workflow. The V1 clone focuses on a scheduling overlay that lets recipients see proposed times overlaid on their own calendar (the key differentiator), personalized scheduling links, ranked availability (proposer indicates preferred times), multi-calendar connection for both proposer and recipient, time zone intelligent display, scheduling links with routing rules, team scheduling, and premium subscription entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, overlay-rendering, timezone, routing, aggregation, and subscription behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first recipient-first scheduling experience with onboarding, link creation, calendar overlay for recipients, ranked availability, routing, and settings flows.
- Reproduce the functional job behind SavvyCal using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, overlay rendering, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy SavvyCal branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for the overlay experience, timezone handling, and subscription states.
- Do not implement production payments without separate legal/platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Official product site | https://savvycal.com/ | Product features, pricing, recipient-first positioning, and integration directory | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help center | https://savvycal.com/help | Link creation, calendar overlay, routing, teams, integrations, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://savvycal.com/privacy | Data collection, calendar access, recipient data handling, and third-party sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://savvycal.com/terms | Service terms, subscriptions, acceptable use, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Platform note | No native mobile app in App Store/Play Store | SavvyCal is primarily web-based; mobile clone targets responsive web or native app | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support account creation, calendar connection (Google/Outlook/iCloud), availability setup, first scheduling link creation, and profile configuration.
- Calendar overlay (recipient experience) must allow recipients to temporarily connect their own calendar to see proposed times overlaid on their existing schedule, enabling informed time selection without back-and-forth.
- Ranked availability must let the proposer indicate preferred times (high/medium/low preference), which display to recipients with visual emphasis on preferred slots.
- Scheduling links must support personalized links (customized per recipient with specific availability windows), generic links (reusable), and one-off links.
- Routing rules must direct recipients to different meeting types or durations based on configurable conditions (e.g., new vs existing contacts, meeting purpose selection).
- Multi-calendar aggregation must combine busy times from multiple calendars (work + personal) for both proposer and recipient to find truly free times.
- Time zone handling must automatically detect recipient timezone, display all times in recipient's local zone, and handle DST transitions gracefully.
- Team scheduling must support round-robin assignment, collective availability, and shared scheduling links.
- Settings must include profile, calendars, availability, scheduling defaults, team management, integrations, subscription, privacy, terms, data export, and delete-account.
- Entitlements must model free (limited links), pro (unlimited links, routing, teams, personalized links), and enterprise states.
- Accessibility must support dynamic type, screen reader labels for calendar overlay, visible focus, contrast, and reduced motion.
- Offline behavior must cache link configurations and recent bookings; block booking confirmation while offline (requires real-time availability).

## Core User Journeys

- Proposer creates a scheduling link with their availability, optionally ranks preferred times, and shares the link with a recipient.
- Recipient opens the link, optionally connects their calendar to see the overlay, selects a time that works for both parties, and confirms.
- Recipient without calendar connection sees proposer's available times in their detected timezone and selects manually.
- Proposer creates a personalized link for a specific recipient with limited date range and custom meeting duration.
- Proposer sets up routing rules: "15-min intro call" for new contacts, "30-min follow-up" for existing contacts.
- Team admin creates a shared scheduling link with round-robin assignment among team members.
- Proposer reviews upcoming meetings, reschedules or cancels with automated notifications to recipients.
- Proposer connects multiple calendars and sees aggregated busy/free time reflected in scheduling link availability.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Setup | Account, calendar connection, availability | credentials, calendar, schedule | new, returning | auth failure, calendar denied |
| Dashboard | Links, upcoming meetings, recent activity | tap, search, create | loaded, empty | no links, no meetings |
| Link Creator | Configure scheduling link parameters | duration, availability, ranking, routing | draft, active, personalized | validation error, no availability |
| Availability Editor | Set weekly schedule and preferences | day/time ranges, ranking | configured, default | overlap, invalid range |
| Recipient Overlay | Calendar overlay with proposed times | connect calendar, select time | overlay active, time selected | calendar connect failed, no slots |
| Recipient Simple | Time selection without calendar overlay | select time, enter details | available, confirming | no slots, timezone mismatch |
| Routing Config | Conditional routing rules | questions, conditions, destinations | active, draft | invalid logic, no match |
| Team Management | Members, shared links, assignment | invite, configure, weight | active, pending | member unavailable |
| Bookings | Upcoming and past meetings | view, cancel, reschedule | upcoming, past, canceled | stale, no bookings |
| Settings | Profile, calendars, integrations, billing | forms, toggles, connect | loaded, editing | connection expired |

## Data Model

- `User`: account state, profile (name, avatar, timezone, bio), connected calendars, availability defaults, entitlement, and deletion/export status.
- `SchedulingLink`: owner/team reference, title, slug, duration options, availability schedule, ranked times, routing rules, personalization (recipient-specific overrides), meeting location, and active/disabled state.
- `RankedTimeSlot`: link reference, date/time range, preference level (high/medium/low), and display emphasis.
- `Availability`: user reference, weekly schedule (day + time ranges), date-specific overrides, timezone, minimum notice, and maximum future window.
- `Booking`: link reference, proposer, recipient info (name, email), selected time, status (confirmed/canceled/rescheduled), meeting location/link, and calendar event IDs.
- `RecipientOverlay`: booking session reference, recipient's temporarily connected calendar ID, busy times extracted (not stored permanently), overlay render state, and session expiry.
- `RoutingRule`: link reference, condition (question/answer, contact type, purpose), destination link/duration, priority order, and fallback behavior.
- `Team`: name, members (with roles and weights), shared links, billing state, and settings.
- `CalendarConnection`: user reference, provider (Google/Outlook/iCloud), tokens, sync state, busy-time extraction scope, and last sync.
- `PersonalizedLink`: parent link reference, recipient identifier, custom date range, custom duration, custom message, and expiry.
- `Entitlement`: user/team reference, plan (free/pro/enterprise), feature flags, link limits, billing cycle, and platform.
- `AuditEvent`: booking, link creation, calendar connection, team changes, and security-sensitive actions.
- `LocalCacheRecord`: link configurations, recent bookings, and availability cache with sync state.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/sso`, `DELETE /auth/session` with session management.
- Links: `POST /links`, `GET /links`, `GET /links/{slug}`, `PATCH /links/{id}`, `DELETE /links/{id}` with availability and routing configuration.
- Availability: `GET /links/{slug}/availability?timezone=&dateRange=` returning available slots with ranking metadata for recipient display.
- Recipient overlay: `POST /overlay/connect` (temporary calendar connection for recipient), `GET /overlay/busy-times` (extract recipient busy times for overlay render), `DELETE /overlay/disconnect` (cleanup after booking).
- Bookings: `POST /bookings` (recipient confirms time), `GET /bookings`, `PATCH /bookings/{id}` (cancel/reschedule), with conflict detection.
- Routing: `POST /links/{id}/routing`, `POST /links/{id}/route-evaluate` with condition evaluation and destination resolution.
- Teams: `POST /teams`, `GET /teams`, `POST /teams/{id}/members`, `DELETE /teams/{id}/members/{memberId}`.
- Personalized links: `POST /links/{id}/personalize` with recipient-specific overrides and expiry.
- Calendars: `POST /calendars/connect`, `GET /calendars/busy-times?range=`, `DELETE /calendars/{id}`.
- Notifications: `POST /notification-preferences`, automated booking confirmation/reminder/cancellation emails.
- Billing: `GET /entitlements`, `POST /checkout/session`, `POST /entitlements/restore`.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `DELETE /recipient-data/{email}` for recipient data deletion requests.

## Realtime, Push, And Offline Behavior

- Cache link configurations, availability schedules, and recent bookings locally for offline viewing.
- Block booking confirmation while offline (requires real-time calendar availability check).
- Recipient overlay requires active network connection to fetch recipient's busy times from their calendar provider.
- Push notifications for new bookings, cancellations, reschedules, and upcoming meeting reminders.
- Real-time availability must check all connected calendars at booking time to prevent conflicts.
- Personalized link expiry must be enforced server-side; expired links show clear messaging to recipients.

## Permissions, Privacy, And Safety

- Treat recipient calendar data, overlay session data, and proposer calendar access as launch-blocking review areas.
- Recipient calendar overlay is temporary: busy times are extracted for the overlay session only, not stored permanently on proposer's servers.
- Clear consent UI for recipients connecting their calendar: explain what data is accessed, that it's session-only, and how to disconnect.
- Proposer calendar access requires explicit consent during onboarding; busy/free extraction only, not full event content.
- Do not send recipient emails, calendar contents, or meeting details in analytics.
- Provide proposer data export, account deletion, and recipient data deletion capability.
- Rate-limit link visits and booking attempts to prevent abuse.
- Personalized links must not expose recipient identity in the URL slug.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `calendar_connected`, `availability_set`, `link_created`, `link_shared`.
- Core action events: `link_viewed`, `overlay_connected`, `time_selected`, `booking_confirmed`, `booking_canceled`, `routing_evaluated`.
- Retention events: `app_opened`, `dashboard_viewed`, `link_duplicated`, `personalized_link_created`, `team_member_added`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_completed`, `subscription_canceled`, `entitlement_expired`.
- Monetization model: freemium with pro tier for advanced features; do not copy exact SavvyCal pricing.
- Analytics rule: do not send recipient emails, calendar contents, meeting details, or routing responses as event properties.

## Edge Cases

- Recipient connects calendar but has no events (empty overlay); overlay still shows proposer availability clearly.
- Recipient's calendar provider is temporarily unavailable; offer to proceed without overlay with explanation.
- Ranked availability where all high-preference times are in recipient's busy periods; deemphasize ranking display.
- Personalized link accessed after expiry; show clear "expired" state with option to request new link from proposer.
- Routing rule conditions produce no match; must show fallback destination or error.
- Time zone detection fails (VPN, privacy browser); allow manual timezone selection with clear prompt.
- Multiple recipients attempt same slot simultaneously; first confirmation wins, second gets conflict error.
- Proposer's connected calendar token expires between link creation and recipient booking; availability must re-validate.
- Recipient overlay session timeout (e.g., 30 minutes); must prompt re-authentication or proceed without overlay.
- Team round-robin when preferred member is unavailable; must rotate to next eligible member.
- Very long date range on personalized link; must paginate or limit displayed availability window.
- Booking during DST transition period; times must be unambiguous for both parties.

## Test Plan

- Unit tests for availability computation, ranked slot generation, routing rule evaluation, timezone conversion, and overlay busy-time aggregation.
- Integration tests for calendar connection, availability fetch, booking creation, overlay session lifecycle, and team assignment.
- Contract tests for API response shapes, calendar provider busy-time responses, and notification delivery.
- Overlay tests for recipient calendar connection, busy-time extraction, overlay rendering accuracy, and session cleanup.
- Timezone tests for detection, manual selection, DST transitions, and cross-timezone booking display.
- Routing tests for conditional logic evaluation, fallback handling, and multi-step routing.
- Concurrency tests for simultaneous booking attempts, availability race conditions, and conflict resolution.
- Team tests for round-robin fairness, collective availability, and member unavailability handling.
- Privacy tests for recipient data session-only storage, overlay cleanup, and data deletion requests.
- Accessibility tests for overlay calendar screen reader labels, time selection focus, dynamic type, and contrast.
- Billing tests for free limits, pro features, link count enforcement, and subscription lifecycle.

## Acceptance Criteria

- The app can be implemented with original branding while preserving the documented recipient-first scheduling overlay workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers.
- Recipients can optionally connect their calendar to see proposed times overlaid on their schedule.
- Ranked availability displays proposer's preferred times with visual emphasis.
- Routing rules direct recipients to appropriate meeting types based on conditions.
- Personalized links provide recipient-specific availability windows with expiry.
- Multi-calendar aggregation correctly identifies truly free times across multiple calendars.
- Recipient calendar data is session-only and not permanently stored.
- All entities have owners, lifecycle states, and deletion/export behavior.
- At least 10 acceptance tests cover overlay, ranking, routing, personalization, timezone, concurrency, team, privacy, accessibility, and billing.
- Hands-on native parity remains blocked until manual verification blockers have recorded lawful evidence.

## Open Questions

- What is the exact overlay rendering approach (iframe calendar view vs abstracted busy-time bars)?
- How long does the recipient overlay session persist before requiring re-authentication?
- What recipient calendar providers are supported for the overlay feature?
- How does ranked availability interact with round-robin team scheduling?
- Is there a mobile-native app planned or is the product web-only with responsive design?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, and analytics schema.
- Phase 2: Build onboarding, link creation, availability management, and basic recipient booking page.
- Phase 3: Add calendar overlay for recipients, ranked availability display, and multi-calendar aggregation.
- Phase 4: Add routing rules, personalized links, team scheduling, notification system, and subscription flows.
- Phase 5: Complete overlay, timezone, routing, concurrency, privacy, accessibility, billing, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture web/responsive screen evidence for recipient overlay, ranked time display, routing forms, and personalized links.
- Record overlay session mechanics, timezone detection approach, and team scheduling behavior in a dedicated research note.
- Confirm recipient data handling and privacy compliance requirements before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
