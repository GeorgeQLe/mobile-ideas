# Timepage-Style Clone Spec

> Metadata
> - Inspiration app: Timepage (by Moleskine)
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: Moleskine account integration, weather data accuracy and provider, heat map generation algorithm, map integration for event locations, subscription state management, gesture-based navigation, custom color themes, and Apple Watch complications.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Timepage's public elegant calendar workflow. The V1 clone focuses on a beautiful minimal calendar interface with weather integration, heat maps showing schedule density, map views for event locations, gesture-driven navigation, customizable color themes, smart notifications with travel time, duration bars, week weather forecast, multiple calendar sync, and premium subscription entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, weather, heat-map, map, gesture, subscription, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first elegant calendar experience with beautiful design, weather integration, heat maps, maps, gestures, smart alerts, and customizable appearance.
- Reproduce the functional job behind Timepage using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Timepage/Moleskine branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, color palettes, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Apple Watch, gesture interactions, and subscription states.
- Do not implement production payments without separate legal/platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/timepage-by-moleskine/id989178902 | iOS listing, privacy labels, release notes, calendar/weather claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://moleskinestudio.com/timepage/ | Product features, design philosophy, integration claims, and pricing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help/support | https://support.moleskinestudio.com/ | Calendar setup, weather, heat maps, gestures, themes, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://moleskinestudio.com/privacy/ | Data collection, calendar access, location, weather, analytics, and third-party sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://moleskinestudio.com/terms/ | License, subscriptions, acceptable use, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support calendar account connection, location permission for weather, notification permission for smart alerts, color theme selection, and Moleskine-style account (optional).
- Day view must show events as duration bars with weather conditions, temperature, and a minimal timeline with gesture-based scrolling.
- Week view must display a weather forecast row and schedule density indicators for each day.
- Month view must render a heat map showing busy/free days with color intensity based on event count and duration.
- Event detail must show location on an embedded map, travel time from current/previous location, attendees, and contextual weather.
- Event creation must support quick-add with natural language hints, date/time picker with haptic feedback, location search, and calendar selection.
- Smart notifications must alert with travel time context (e.g., "Leave in 15 minutes to arrive on time").
- Color themes must allow full customization of calendar appearance with curated palettes and custom color picker.
- Settings must include connected calendars, appearance/theme, weather units, notification preferences, subscription, privacy, terms, data export, and delete-account.
- Entitlements must model free (limited), premium subscription (full features), trial, expired, and restored states.
- Accessibility must support dynamic type, VoiceOver for duration bars and heat maps, contrast modes, and reduced motion alternatives to gesture animations.
- Offline behavior must cache calendar and weather data locally, allow event creation offline, and sync on reconnect.

## Core User Journeys

- New user installs, connects calendar, grants location/notification permissions, selects color theme, and sees today's schedule with weather.
- User navigates the day view with gesture-based scrolling, sees events as elegant duration bars with weather context.
- User views the month heat map, identifies busy days at a glance, and taps a day to drill into details.
- User checks the week view for upcoming weather forecast alongside their schedule to plan outdoor activities.
- User taps an event to see its location on a map with travel time estimate from current position.
- User creates a new event with quick-add, selects a time, adds location, and receives a smart travel-time notification before the event.
- User customizes the color theme to match their aesthetic preference.
- User views the Apple Watch complication for next-event-at-a-glance.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Setup | Calendar connection, permissions, theme selection | account, permissions, theme | new, returning, trial | auth failure, permission denied |
| Day View | Timeline with duration bars and weather | gesture scroll, tap event | loaded, empty day, offline | weather unavailable, sync error |
| Week View | 7-day overview with weather forecast | swipe, tap day | loaded, empty week | weather stale, many events |
| Month View | Heat map with density colors | tap day, swipe month | loaded, sparse, dense | performance with many events |
| Event Detail | Map, attendees, weather, travel time | tap actions, navigate | loaded, location available | map unavailable, no location |
| Event Create | Quick-add, date picker, location search | text, picker, search | draft, saving | parse error, offline, conflict |
| Map View | Event location and travel context | pan, zoom, directions | loaded, calculating | location denied, no route |
| Theme Settings | Color palette selection and preview | color picker, presets | loaded, previewing | theme not saved |
| Settings | Calendars, appearance, notifications, privacy | forms, toggles | loaded, editing | sync error, subscription expired |
| Notifications | Smart alerts with travel context | preferences, tap | enabled, smart mode | location denied, stale travel time |

## Data Model

- `User`: account state, connected calendars, selected theme, weather units, notification preferences, locale, timezone, entitlement state, and deletion/export status.
- `CalendarAccount`: provider (iCloud/Google/Exchange/CalDAV), credentials, sync state, and color assignments.
- `Calendar`: account reference, name, color, visibility, and default alert preference.
- `Event`: calendar reference, title, start/end with timezone, all-day flag, location (with coordinates), notes, URL, recurrence rule, attendees, alerts, and sync ID.
- `DurationBar`: visual representation metadata for event rendering: position, height, color, overlap index, and truncation state.
- `HeatMapCell`: date, event count, total event duration, density level (0-5), and computed color intensity.
- `WeatherData`: location, date, condition, high/low temperature, hourly forecast, precipitation probability, wind, UV index, provider, and cache timestamp.
- `TravelEstimate`: origin coordinates, destination coordinates, mode, duration, distance, departure recommendation, and calculation timestamp.
- `ColorTheme`: name, primary/secondary/accent/background/text colors, calendar color overrides, and system/custom flag.
- `SmartAlert`: event reference, alert type (travel-time/weather-change/schedule-conflict), trigger condition, delivery state, and timestamp.
- `Entitlement`: user reference, tier (free/premium), billing cycle, platform, expiry, trial state, and restore state.
- `LocalCacheRecord`: device-local calendar, weather, and map tile cache with TTL and stale indicators.

## API And Backend Contracts

- Auth/accounts: `POST /accounts/connect`, `GET /accounts`, `DELETE /accounts/{id}`, `POST /accounts/{id}/sync` with calendar provider OAuth.
- Calendar sync: `GET /calendars`, `GET /events?range=&calendars=` with incremental sync tokens and ETag support.
- Events: `POST /events`, `GET /events/{id}`, `PATCH /events/{id}`, `DELETE /events/{id}` with recurrence handling and conflict detection.
- Weather: `GET /weather?lat=&lon=&days=` returning daily and hourly forecast with appropriate cache headers.
- Travel time: `GET /travel-time?origin_lat=&origin_lon=&dest_lat=&dest_lon=&mode=` with departure time context.
- Heat map: `GET /heat-map?month=&year=&calendars=` returning per-day density levels (can be computed client-side from events).
- Themes: `GET /themes` for curated palettes; `POST /themes/custom` for user-created themes synced across devices.
- Notifications: `POST /notification-preferences`, smart alert configuration with travel-time and weather-change triggers.
- Billing: `GET /entitlements`, `POST /entitlements/restore` with App Store receipt validation.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings`.

## Realtime, Push, And Offline Behavior

- Cache full calendar data and recent weather forecasts locally for offline access.
- Queue event creates/edits offline; sync on reconnect with last-write-wins and user override for conflicts.
- Smart push notifications require background location for travel-time alerts; degrade to time-only alerts when location is denied.
- Weather data refreshes hourly when app is active; daily refresh via background fetch when inactive.
- Heat map computation runs locally from cached event data; no network required for density display.
- Apple Watch complications update via WatchConnectivity with next-event data and weather summary.

## Permissions, Privacy, And Safety

- Treat calendar data, precise location (for weather and travel), and notification access as launch-blocking review areas.
- Request calendar access during onboarding account connection; provide read-only sample view when denied.
- Request location when weather or travel time feature is first accessed; provide manual location entry or weather-disabled fallback.
- Request notifications when smart alerts are first configured; provide in-app reminder center as fallback.
- Do not send event titles, locations, attendee info, or calendar names as analytics properties.
- Location data used only for weather fetch and travel calculation; not stored server-side beyond cache TTL.
- Provide data export (ICS format), account deletion, and privacy controls from settings.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `calendar_connected`, `theme_selected`, `permission_granted`, `onboarding_completed`.
- Core action events: `day_viewed`, `week_viewed`, `month_viewed`, `event_created`, `event_detail_opened`, `map_viewed`, `travel_time_viewed`, `weather_checked`.
- Retention events: `smart_alert_received`, `theme_changed`, `widget_viewed`, `watch_complication_tapped`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_completed`, `subscription_canceled`, `entitlement_restored`.
- Monetization model: freemium with premium subscription for full features; do not copy exact Timepage pricing.
- Analytics rule: do not send event content, locations, attendee info, or calendar data as event properties.

## Edge Cases

- Weather provider returns no data for remote locations; display "weather unavailable" gracefully.
- Heat map for month with 200+ events; density computation must cap at maximum intensity.
- Event with no location set; travel time section must hide rather than show error.
- Location permission revoked after smart alerts configured; downgrade to time-only alerts with explanation.
- Calendar sync brings overlapping all-day events; duration bar renderer must handle stacking.
- Custom theme with insufficient contrast; validate accessibility before saving.
- Offline event creation with location that cannot be geocoded until reconnect; queue geocoding.
- DST transition day showing incorrect event times; timezone-aware rendering required.
- Apple Watch complication data stale because phone was not reachable; show last-known with staleness indicator.
- Very long event (multi-day) in day view; duration bar must clip with continuation indicator.
- Subscription expires mid-session; premium features must lock gracefully without data loss.

## Test Plan

- Unit tests for heat map density calculation, duration bar layout, travel time formatting, weather display logic, theme contrast validation, and timezone handling.
- Integration tests for calendar sync, event CRUD, weather fetch, travel time calculation, and theme persistence.
- Contract tests for calendar provider API responses, weather API responses, and directions API responses.
- Offline tests for cached calendar reads, weather staleness handling, queued event creates, and reconnect sync.
- Permission tests for calendar denied, location denied, notifications denied, and graceful degradation.
- Accessibility tests for VoiceOver on duration bars, heat map cells, gesture alternatives, dynamic type, and contrast.
- Gesture tests for scroll, swipe navigation, haptic feedback, and reduced-motion alternatives.
- Billing tests for trial, purchase, subscription, cancellation, expiration, and restore.
- Performance tests for month heat map rendering, year view with many events, and smooth gesture animations.
- Visual regression tests for theme rendering, duration bar colors, and weather icon display.

## Acceptance Criteria

- The app can be implemented with original branding and design while preserving the documented elegant calendar workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers.
- Day view shows events as duration bars with weather context.
- Month view renders a heat map showing schedule density.
- Event detail includes embedded map and travel time estimate.
- Smart notifications alert with travel time context when location is available.
- Color themes are customizable with accessible contrast validation.
- All entities have owners, lifecycle states, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, weather unavailable, location denied, offline, accessibility, gestures, heat map, travel time, and billing.
- Hands-on native parity remains blocked until manual verification blockers have recorded lawful evidence.

## Open Questions

- Which weather data provider offers terms compatible with embedding in a calendar app?
- What is the exact heat map algorithm (linear scaling vs logarithmic vs custom curve)?
- Which gesture library provides the fluid animations characteristic of Timepage?
- Are Apple Watch complications in scope for V1?
- What is the correct behavior when Moleskine account integration is unavailable?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, and analytics schema.
- Phase 2: Build day/week/month views with duration bars, heat map, and gesture navigation with original design.
- Phase 3: Add calendar sync, event creation, weather integration, and travel time calculation.
- Phase 4: Add smart notifications, color themes, Apple Watch support, and subscription flows.
- Phase 5: Complete accessibility, gesture, performance, visual regression, billing, and permission tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture native iOS screen evidence for day view duration bars, month heat map, gesture interactions, and weather overlay.
- Record weather provider, map integration, and Apple Watch complication requirements in a dedicated research note.
- Confirm Moleskine account integration scope and subscription behavior before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
