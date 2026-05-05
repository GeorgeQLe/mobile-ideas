# BusyCal-Style Clone Spec

> Metadata
> - Inspiration app: BusyCal
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: CalDAV/Exchange sync fidelity, natural language parsing accuracy, weather integration data source, travel time computation, Apple Watch complications, menu bar widget behavior, custom view configurations, and subscription restore.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by BusyCal's public power-user calendar workflow. The V1 clone focuses on customizable calendar views (day/week/month/year/list), natural language event creation, integrated to-do lists, weather overlay, travel time calculation, menu bar access, multiple calendar account sync (iCloud/Google/Exchange/CalDAV), color coding, alarms, graphics/stickers on events, location-aware alerts, and productivity-focused entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, calendar-sync, natural-language, weather, travel-time, watch, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first power-user calendar experience with onboarding, multi-view calendar, event creation, to-do management, weather, travel time, notifications, settings, and support flows.
- Reproduce the functional job behind BusyCal using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy BusyCal branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, macOS, Apple Watch, CalDAV, Exchange, and weather-provider states.
- Do not implement production payments without separate legal/platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/busycal-calendar-todos/id1173663647 | iOS listing, privacy labels, release notes, calendar claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://www.busymac.com/busycal/ | Product features, pricing, platform support, and integration claims | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help/support | https://support.busymac.com/ | CalDAV setup, Exchange sync, natural language, weather, travel time, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.busymac.com/privacy/ | Data collection, calendar access, location, weather, analytics, and third-party sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.busymac.com/terms/ | License, subscriptions, acceptable use, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support calendar account connection (iCloud, Google, Exchange, CalDAV, local), permission primers for calendar/location/notifications, returning-user restore, and trial/paid states.
- Calendar views must support day, week, month, year, and list with customizable start day, hour range, time granularity, and multi-calendar overlay with color coding.
- Event creation must support natural language input ("Lunch with Alex tomorrow at noon at Cafe Roma"), structured form entry, recurring events, travel time, alerts, attachments, URL, and invitees.
- To-do integration must show tasks alongside calendar events, support due dates, priorities, completion states, and CalDAV task sync.
- Weather overlay must display daily forecast on day/week/month views sourced from a licensed weather provider, scoped to the user's location or event location.
- Travel time must calculate estimated transit duration between consecutive events and display warnings for scheduling conflicts.
- Menu bar widget (macOS) / Today widget (iOS) must show upcoming events and quick-create entry point.
- Settings must include calendar accounts, default view, appearance, weather toggle, travel time toggle, notification preferences, subscription, support, terms, privacy policy, data export, and delete-account.
- Entitlements must model trial, one-time purchase (legacy), subscription, expired, restored, and family-sharing states.
- Accessibility must support dynamic type, VoiceOver labels for calendar grid cells, visible focus, contrast, reduced motion, and accessible event editing.
- Offline behavior must cache calendar data locally, allow event creation/editing offline, and sync changes on reconnect with conflict resolution.

## Core User Journeys

- New user installs, connects calendar accounts, grants calendar/location/notification permissions, and sees their existing events in the preferred view.
- User creates an event using natural language input and sees it parsed into structured fields (title, date, time, location, duration).
- User switches between day/week/month/year/list views and sees events rendered with color coding and weather overlay.
- User adds a to-do item with a due date and sees it appear on the relevant calendar day.
- User views travel time between consecutive events and receives a warning when insufficient buffer exists.
- User checks weather forecast on the calendar and adjusts outdoor event plans accordingly.
- User sets up recurring events with exceptions (skip specific dates, modify single occurrence).
- User receives location-based departure alerts and time-based alarms for upcoming events.
- User manages multiple calendar accounts, toggles visibility, and resolves sync conflicts.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Setup | Account connection, permissions, and onboarding | account credentials, permissions | new, returning, trial, paid | auth failure, permission denied, no accounts |
| Day View | Single day timeline with events and todos | tap event, drag to create, scroll | loaded, empty day, syncing | sync failure, conflict, offline |
| Week View | 7-day grid with time slots and events | tap, drag, pinch zoom | loaded, dense schedule, empty | overflow events, timezone change |
| Month View | Month grid with event dots/previews and weather | tap day, swipe month, create | loaded, empty month, syncing | too many events, weather unavailable |
| Year View | Year overview with heat map density | tap month to drill down | loaded, sparse, dense | performance with many events |
| List View | Chronological event list with grouping | scroll, search, filter | loaded, empty, filtered | no results, stale data |
| Event Create/Edit | Natural language and form-based event entry | NL input, form fields, recurrence | draft, editing, saving | parse failure, conflict, offline |
| To-Do List | Task management with calendar integration | create, complete, prioritize, due date | active, completed, overdue | sync failure, missing due date |
| Travel Time | Transit calculation between events | origin, destination, mode | calculated, unavailable, warning | no route, API limit, location denied |
| Weather | Daily/hourly forecast overlay | location, date range | available, unavailable, stale | provider error, location denied |
| Settings | Accounts, preferences, subscription, privacy | forms, toggles, account management | loaded, editing | sync error, subscription expired |

## Data Model

- `User`: account state, connected calendar accounts, default preferences (start day, hour range, view), locale, timezone, entitlement state, and deletion/export status.
- `CalendarAccount`: provider (iCloud/Google/Exchange/CalDAV/local), credentials/tokens, sync state, last sync timestamp, color, and enabled/disabled state.
- `Calendar`: account reference, name, color, visibility toggle, default alert, and read-only flag.
- `Event`: calendar reference, title, start/end (with timezone), all-day flag, location, URL, notes, recurrence rule, travel time, alerts, invitees, attachments, and sync ID.
- `RecurrenceRule`: frequency, interval, end condition (count/date/never), exceptions (deleted/modified occurrences), and expansion cache.
- `Todo`: calendar reference, title, due date, priority (1-9), completion state, completion date, notes, alert, and sync ID.
- `TravelTime`: event pair reference, origin, destination, mode (driving/transit/walking), duration estimate, departure time, and calculation timestamp.
- `WeatherForecast`: location, date, high/low temperature, condition (sunny/cloudy/rain/snow), icon reference, provider, and fetch timestamp.
- `Alert`: event/todo reference, trigger type (time-before/location-based), trigger value, delivery state, and snooze state.
- `Entitlement`: user reference, type (trial/purchased/subscription), platform, expiry, restore state, and family-sharing flag.
- `SyncConflict`: event/todo reference, local version, server version, resolution state (pending/local-wins/server-wins/merged), and timestamp.
- `LocalCacheRecord`: device-local calendar cache with TTL, dirty flags for pending changes, and conflict markers.

## API And Backend Contracts

- Auth/accounts: `POST /accounts/connect`, `GET /accounts`, `DELETE /accounts/{id}`, `POST /accounts/{id}/sync` with OAuth/CalDAV/Exchange credential management.
- Calendar sync: `GET /calendars`, `POST /calendars/sync`, `GET /calendars/{id}/events?range=`, `GET /calendars/{id}/todos` with ETag-based incremental sync and conflict detection.
- Events: `POST /events`, `GET /events/{id}`, `PATCH /events/{id}`, `DELETE /events/{id}`, `POST /events/parse-natural-language` with recurrence expansion and timezone handling.
- Todos: `POST /todos`, `GET /todos`, `PATCH /todos/{id}`, `DELETE /todos/{id}` with due-date sorting and completion state.
- Travel time: `GET /travel-time?origin=&destination=&mode=&departure=` using a licensed directions API with caching.
- Weather: `GET /weather?location=&date=` using a licensed weather API with daily cache TTL.
- Notifications: `POST /notification-preferences`, `GET /notifications` for departure alerts, event reminders, and todo due-date alerts.
- Billing: `GET /entitlements`, `POST /entitlements/restore` with App Store receipt validation.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings` accessible from settings.

## Realtime, Push, And Offline Behavior

- Cache all calendar data locally for full offline read access; display stale indicators when last sync exceeds threshold.
- Queue event/todo creates, edits, and deletes locally when offline; sync on reconnect with conflict resolution (last-write-wins with user override option).
- Push notifications for departure alerts (location-based), time-based event reminders, todo due-date alerts, and calendar invitation responses.
- CalDAV/Exchange sync must use incremental sync tokens; full re-sync only on corruption or user request.
- Background sync must tolerate app termination, token expiry, and network transitions; use iOS background fetch and significant location change APIs.
- Weather data must cache with reasonable TTL and degrade gracefully when provider is unavailable.

## Permissions, Privacy, And Safety

- Treat calendar data, location access, contacts (for invitees), and weather location as launch-blocking review areas.
- Request calendar access at account connection time; provide local-only calendar fallback when denied.
- Request location for weather and travel time only when those features are first used; provide manual location entry fallback.
- Request contacts only when adding invitees; provide manual email entry fallback.
- Request notifications at first event creation or reminder setup; provide in-app reminder fallback.
- Do not send calendar event titles, locations, attendee emails, or todo content as analytics properties.
- Calendar credentials must be stored in secure keychain; CalDAV passwords never leave the device except to the calendar server.
- Provide data export (ICS format), account deletion, and privacy settings from settings.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `account_connected`, `permission_granted`, `view_selected`, `onboarding_completed` with account type and source.
- Core action events: `event_created`, `event_edited`, `todo_created`, `todo_completed`, `view_switched`, `natural_language_parsed`, `travel_time_viewed`, `weather_viewed` with coarse metadata only.
- Retention events: `app_opened`, `widget_viewed`, `notification_opened`, `sync_completed`, `calendar_toggled`.
- Monetization events: `trial_started`, `purchase_completed`, `subscription_renewed`, `subscription_canceled`, `entitlement_restored`.
- Monetization model: one-time purchase or subscription; do not copy exact BusyCal pricing or tier names.
- Analytics rule: do not send event titles, locations, attendee info, todo content, or calendar account credentials as event properties.

## Edge Cases

- CalDAV server returns malformed iCalendar data; parser must skip invalid events and surface sync warnings.
- Exchange server requires modern auth (OAuth2) instead of basic auth; connection flow must detect and redirect.
- Natural language input is ambiguous ("next Friday" when today is Friday); parser must clarify or use consistent rule.
- Recurring event with timezone that observes DST differently from user's timezone; expansion must handle DST transitions correctly.
- Two events overlap after a calendar sync brings in a new event; travel time warning must recalculate.
- Weather provider rate limit exceeded; cached forecast must display with staleness indicator.
- User deletes a calendar account while offline edits are queued; queued changes must be discarded with notification.
- Sync conflict between local edit and server edit on same event; user must be prompted to resolve.
- Large calendar (10,000+ events) must remain performant in month/year views.
- Location permission revoked after travel time was configured; degrade to no-travel-time with explanation.
- App terminated during background sync; resume on next launch without data loss.
- Family sharing entitlement where primary subscriber cancels; dependent users see expiration state.

## Test Plan

- Unit tests for natural language parsing, recurrence rule expansion, timezone conversion, travel time calculation, conflict resolution, and entitlement checks.
- Integration tests for CalDAV sync, Exchange sync, Google Calendar sync, iCloud sync, event CRUD, todo CRUD, and weather fetch.
- Contract tests for every CalDAV/CardDAV response shape, Exchange EWS/Graph response, weather API response, and directions API response.
- Offline tests for cached reads, queued writes, conflict detection, reconnect sync, and corrupt-cache recovery.
- Permission tests for calendar denied, location denied, contacts denied, notifications denied, and functional fallback behavior.
- Accessibility tests for calendar grid VoiceOver labels, event detail focus order, dynamic type in all views, and reduced motion.
- Billing tests for trial, purchase, subscription, renewal, cancellation, expiration, restore, and family sharing.
- Performance tests for large calendars (10K+ events), month view rendering, year view heat map, and search responsiveness.
- Natural language tests for date parsing edge cases, location extraction, duration inference, timezone handling, and ambiguity resolution.
- Sync conflict tests for last-write-wins, user override, deleted-on-server, and modified-on-both scenarios.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented power-user calendar workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can connect a calendar account and see existing events in their preferred view.
- Natural language event creation parses common date/time/location patterns correctly.
- To-do items appear on calendar days and sync via CalDAV VTODO.
- Weather overlay displays on day/week/month views when location is available.
- Travel time calculates and warns about scheduling conflicts between consecutive events.
- Multiple calendar accounts sync correctly with conflict resolution.
- All entities have owners, lifecycle states, authorization rules, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, sync conflict, permission denial, offline behavior, accessibility, natural language, weather, travel time, and billing.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact CalDAV extensions does BusyCal use for todo sync and alarm behavior?
- Which weather data provider offers appropriate licensing for a calendar clone?
- Which directions API provides travel time estimates with acceptable rate limits?
- Which natural language date/time parsing library handles international date formats and relative references?
- Are Apple Watch complications in scope for V1 or deferred to V2?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, and seed-data policy.
- Phase 2: Build onboarding, multi-view calendar (day/week/month/year/list), event creation, and settings shells with original copy and sample data.
- Phase 3: Add calendar account sync (CalDAV/Google/Exchange), to-do integration, offline cache, and conflict resolution.
- Phase 4: Add natural language parsing, weather overlay, travel time calculation, and notification/alert system.
- Phase 5: Complete accessibility, sync fidelity, performance, billing, permission, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture native iOS screen evidence for calendar views, event creation, natural language input, weather overlay, and travel time display.
- Record CalDAV/Exchange sync behavior, Apple Watch integration, and weather provider requirements in a dedicated research note.
- Confirm privacy retention behavior for calendar data and location history before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
