# Fantastical-Style Clone Spec

> Metadata
> - Inspiration app: Fantastical
> - Category: Calendar and tasks
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Flexibits product/support/privacy/terms pages, and public pricing pages.
> - Manual verification blockers: natural-language parsing fidelity, provider OAuth scopes, local notification/widget behavior, weather provider licensing, subscription purchase/restore, watch/complication behavior, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, natural-language parser implementation, private APIs, customer calendar data, and unconsented contacts/location data.

## Overview

Build an original mobile calendar and tasks app inspired by Fantastical's public product and support materials: unified calendar/task views, natural-language event/task entry, multiple calendar accounts, reminders/tasks, notifications, widgets, weather-aware agenda, conference links, and entitlement-aware premium features.

The clone must not copy Fantastical/Flexibits branding, screenshots, UI copy, icons, proprietary parser logic, private APIs, or customer calendar data beyond user-consented scopes. V1 can reproduce comparable calendar jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support multiple calendar accounts, local calendar data, tasks/reminders, agenda/day/week/month/year-style views, event detail/editing, and notifications.
- Support original natural-language quick entry for events and tasks with explicit parse confirmation, ambiguity handling, recurrence, alerts, attendees, and locations.
- Support task providers such as local tasks/reminders and later Todoist/Google Tasks-like adapters where scopes allow.
- Support widgets and optional watch/complication surfaces with privacy-preserving content controls.
- Enforce account permissions, provider OAuth minimization, local notification privacy, export/delete, subscription gates, and no raw calendar telemetry.

## Non-Goals

- Do not imply Flexibits affiliation or copy Fantastical brand assets.
- Do not copy proprietary natural-language parser code, UI copy, screenshots, icons, private APIs, or customer calendar data.
- Do not request contacts/location/calendar scopes before the user reaches a feature that needs them.
- Do not build full enterprise calendaring administration or shared mailbox policy management in V1.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/fantastical-calendar/id718043190 | Official iOS listing, mobile positioning, privacy labels, in-app purchase signal | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.flexibits.fantastical2 | Official Android listing, data-safety summary where available, cross-platform positioning | Verified 2026-05-03 |
| Fantastical Product Page | https://flexibits.com/fantastical | Public product capabilities, calendar/task views, quick entry, widgets/watch/platform positioning | Verified 2026-05-03 |
| Flexibits Support | https://flexibits.com/support | Calendar accounts, tasks, notifications, widgets, subscriptions, troubleshooting support taxonomy | Verified 2026-05-03 |
| Flexibits Pricing | https://flexibits.com/pricing | Premium feature and entitlement signals for Fantastical, scheduling, notifications, tasks, views | Verified 2026-05-03 |
| Flexibits Privacy Policy | https://flexibits.com/privacy | Personal-data, calendar/task/contact/location handling context | Verified 2026-05-03 |
| Flexibits Terms of Service | https://flexibits.com/terms | Account, acceptable-use, service, and subscription legal context | Verified 2026-05-03 |
| Flexibits Security | https://flexibits.com/security | Security contact/posture and responsible disclosure context | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support local calendar access first and provider connections only after explicit user intent.
- Calendar provider adapters must support iCloud/Apple calendar, Google, Microsoft/Office 365/Outlook, CalDAV-like sources, and local calendar APIs as staged integrations.
- Task adapters must support local tasks/reminders in V1 and provider-backed tasks as feature-flagged adapters.
- Views must include agenda/day and month in V1; week/year/quarter/full-screen variants can be tablet/premium or staged depending on platform constraints.
- Natural-language quick entry must parse date/time, duration, recurrence, alerts, location, attendees, calendar, task due date, and ambiguous terms with a confirmation UI.
- Event editing must support single/this-and-future/all recurring choices, attendee invitations, alerts, conference/location fields, calendar selection, and conflict labels.
- Weather must be optional, location-minimized, provider-licensed, and cached for agenda use without leaking exact location unless the user opts in.
- Widgets/watch/complications must hide sensitive titles by default when locked and refresh via platform-safe background mechanisms.
- Entitlements must gate advanced views, calendar sets, weather, task integrations, scheduling features, cross-device sync, widgets/watch features, and subscription-only settings server-side or locally as appropriate.
- Push/local notifications must minimize event detail and honor device lock-screen privacy settings.
- Analytics must exclude raw event titles, notes, attendees, locations, calendar names, task titles, contacts, and exact location.

## Core User Journeys

- User grants local calendar access, selects visible calendars, and lands on agenda.
- User connects Google or Microsoft calendar with minimal scopes and sees sync status.
- User types a natural-language event, reviews parsed fields, resolves ambiguity, and saves it.
- User creates a task/reminder with due date, list, priority-like metadata, and completion state.
- User switches between agenda, day, month, and week/tablet views and opens an event.
- User edits a recurring event and chooses this occurrence, future occurrences, or all occurrences.
- User adds attendees from contacts after a scoped permission prompt and sends invitations through the provider.
- User enables weather with approximate location and sees cached weather on agenda.
- User adds a widget and sees sensitive event titles hidden while the device is locked.
- User upgrades/restores premium and sees advanced views or integrations unlocked.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding / Permissions | Connect calendars/tasks | permission, provider | waiting, connected, skipped | scope denied |
| Agenda | Upcoming events/tasks | scroll, open, complete | loaded, empty, offline | stale sync |
| Day View | Hour-by-hour schedule | scroll, tap, long press | loaded, overlap | dense schedule |
| Week View | Multi-day review | swipe, pinch, open | loaded, gated | small screen fallback |
| Month View | Calendar grid | tap day, create | loaded, selected | too many indicators |
| Year / Quarter View | Long-range overview | month select | loaded, gated | premium required |
| Quick Entry | Natural-language create | text, confirm | parsing, parsed, ambiguous | parse failed |
| Event Detail / Editor | Read/edit event | fields, attendees, alerts | loaded, editing, syncing | recurrence conflict |
| Task Detail / Editor | Read/edit task | title, due, list, complete | loaded, editing | provider unavailable |
| Accounts / Calendars | Manage providers and visibility | connect, toggle, remove | connected, revoked | provider rate limited |
| Weather / Location | Configure forecast | approximate/exact, provider | enabled, disabled | license/provider failure |
| Widget / Notification Settings | Privacy and display controls | toggles, preview | loaded, saved | platform unsupported |
| Subscription | Plans and restore | plan, restore | free, trial, paid | webhook delay |

## Data Model

- `User`: identity, preferences, locale, timezone, entitlement, privacy settings.
- `CalendarAccount`: provider, scopes, token reference, sync cursor, revoked state, local-only flag.
- `Calendar`: account, title reference, color, visibility, write permission, default flag.
- `Event`: calendar, title reference, notes reference, start/end, timezone, recurrence, location, attendees, alerts, sync metadata.
- `RecurringSeries`: recurrence rule, exceptions, provider IDs, edit-scope history.
- `TaskList`: provider/list metadata, visibility, sync cursor.
- `Task`: list, title reference, notes reference, due date, completion, priority-like flag, sync metadata.
- `NaturalLanguageParse`: input reference, parsed entities, confidence, ambiguity flags, chosen result.
- `WeatherForecast`: approximate location key, provider, day/hour forecast, license metadata, cache expiry.
- `ContactSuggestion`: local-only contact reference, display metadata, permission state.
- `WidgetConfiguration`: view, calendar set, privacy mode, refresh policy, platform.
- `NotificationRule`: event/task, alert offset, channel/local schedule, privacy mode.
- `AuditEvent`: auth, account connect, calendar/task change, privacy, billing, export/delete, and settings changes.
- `Entitlement`: tier, feature flags, usage counters, renewal/expiration, billing owner.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`, `DELETE /account`: account lifecycle where cloud sync/premium is used.
- `POST /accounts/:provider/connect`, `DELETE /accounts/:id`, `GET /accounts`: provider connections.
- `POST /accounts/:id/sync`, `POST /provider-webhooks/:provider`: provider sync.
- `GET /calendars`, `PATCH /calendars/:id`, `GET /events?from=&to=`, `POST /events`, `PATCH /events/:id`, `DELETE /events/:id`: calendars/events.
- `GET /tasks`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id`: tasks.
- `POST /natural-language/parse`: original parser returning proposed event/task fields with confidence and ambiguity.
- `GET /weather?locationKey=&from=&to=`, `PATCH /weather/settings`: weather.
- `GET /widgets/configurations`, `POST /widgets/configurations`: widget sync where applicable.
- `GET /entitlements`, `POST /billing/webhook`, `POST /data-export`, `GET /audit-events`: billing/privacy/admin.

## Realtime, Push, And Offline Behavior

- Provider sync uses local calendar APIs, provider APIs/webhooks, and delta cursors where available; stale provider state must be labeled.
- Offline mode supports cached events/tasks, local calendar edits where platform allows, queued provider edits, and conflict screens after reconnect.
- Natural-language parsing should run on-device where possible; any cloud parse path requires explicit opt-in and content redaction policy.
- Notifications for event/task alerts run locally where possible to avoid cloud leakage.
- Widgets/watch complications refresh from platform-safe snapshots and respect lock-screen privacy.
- Weather fetches use approximate location by default, cache forecasts, and degrade silently when provider/license limits fail.
- Cache purge must run on logout, account disconnect, provider revocation, platform permission revocation, or account delete.

## Permissions, Privacy, And Safety

- Request calendar, reminders/tasks, contacts, notifications, location, and widget/watch permissions just in time and only for user-visible features.
- Calendar provider OAuth scopes must be minimal, provider-specific, revocable, and documented before implementation.
- Contacts are used for local attendee autocomplete only unless the user explicitly sends invitations.
- Location defaults to approximate for weather; exact location requires separate user opt-in.
- Analytics exclude raw event titles, notes, attendees, locations, calendar names, task titles, contacts, exact location, and provider IDs.
- Support diagnostics default to metadata; raw calendar/task data inspection requires user consent and audit logging.
- Provider tokens require encryption, rotation, least-privilege access, revocation cleanup, and secret redaction in logs.
- Export/delete workflows must account for cloud account data, local-only data limitations, provider-owned artifacts, retention, and subscription records.

## Analytics And Monetization

- Track privacy-safe events: calendar connected, view switched, quick entry parsed, event created, task completed, recurrence edit chosen, widget configured, weather enabled, provider sync failed, entitlement gate hit.
- Event payloads use object types, counts, role class, timezone class, latency, failure codes, and non-reversible IDs.
- Original free/premium tiers may gate advanced views, calendar sets, weather, task integrations, cross-device sync, scheduling helpers, widgets/watch features, and premium notifications.
- Paywalls must identify blocked capability, current entitlement, restore path, account owner, and support path.

## Edge Cases

- Natural-language input is ambiguous across locale/timezone, such as "next Friday" or "tonight".
- Daylight-saving transition creates missing or duplicated local times.
- Recurring event edit differs across provider capabilities.
- Provider API throttles or local calendar permission changes mid-edit.
- Attendee contact lookup returns duplicate or stale contact records.
- Widget displays stale data after account disconnect or lock-screen privacy change.
- Weather provider license expires, location permission is revoked, or forecast cache is stale.
- Offline edit conflicts with provider-side deletion or calendar move.
- Subscription downgrade hides advanced views/widgets while screen is open.
- Local notifications remain scheduled after event deletion unless cancellation succeeds.
- Export/delete intersects with local-only platform data the service cannot remove remotely.
- Accessibility user cannot rely on dense calendar grids, color-only calendar indicators, or drag gestures.

## Test Plan

- Unit tests for natural-language parsing, ambiguity handling, recurrence rules, DST arithmetic, provider mapping, local notification scheduling, permission checks, widget privacy, and entitlement gates.
- Contract tests for auth, provider account connections, sync, events, tasks, natural-language parse, weather, widgets, billing, export/delete, and audit routes.
- Integration tests for onboarding, calendar connect, agenda/day/month views, quick entry, event create/edit/delete, recurring edit, task create/complete, widget setup, weather enable, and logout.
- Provider tests for Google, Microsoft/Office 365/Outlook, iCloud/Apple calendar, CalDAV-like behavior, local calendar APIs, and scope revocation where lawfully available.
- Timezone tests across DST, leap day, crossing midnight, travel timezone changes, floating all-day events, and server clock drift.
- Privacy/security tests for analytics redaction, notification opacity, provider token encryption, local permission prompts, widget lock-screen privacy, weather location minimization, and raw-content access controls.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and platform-store-managed states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, dense calendar alternatives, date/time picker alternatives, color contrast, reduced motion, and hardware keyboard.
- Manual verification tests: parsing fidelity, provider OAuth scopes, local notifications/widgets, weather provider licensing, subscription purchase/restore, watch/complication behavior, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Fantastical/Flexibits brand assets, proprietary parser code, private APIs, customer calendar data, or unconsented contacts/location data.
- Calendar accounts, event/task views, quick entry, event editing, recurring events, notifications, widgets, weather, billing, and settings have deterministic contracts and failure codes.
- Provider scopes, local permissions, entitlements, offline conflicts, recurrence rules, and notification/widget privacy reconcile safely.
- Export/delete, account disconnect, provider revocation, and subscription restore are supported or explicitly feature-flagged.
- Analytics, notifications, support, cache, logs, and widget snapshots minimize calendar/task/contact/location data.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which providers are V1: local calendar only, Google, Microsoft, iCloud, CalDAV, or a staged subset?
- Which natural-language locales and recurrence patterns are required first?
- Are weather, widgets, watch/complications, and task integrations V1 or premium/staged modules?
- Which parser runs fully on-device and what fallback exists for unsupported languages?
- What default lock-screen privacy policy should widgets/notifications use?
- Which platform surfaces are iOS-only versus Android parity for V1?

## Build Plan

- Phase 1: scaffold local calendar permission flow, agenda/day/month views, event detail/edit, task primitives, and privacy-safe analytics.
- Phase 2: add provider account abstraction, sync/write adapters, recurrence handling, notification scheduling, and conflict screens.
- Phase 3: add original natural-language parser, ambiguity UI, attendee/contact autocomplete, calendar sets, and advanced view fallbacks.
- Phase 4: add widgets, weather, offline queue/cache purge, task-provider adapters, provider retry/idempotency, and privacy controls.
- Phase 5: add entitlements, subscription restore, export/delete, support diagnostics, security/privacy review, and billing reconciliation.
- Phase 6: complete accessibility, provider/timezone/parser tests, widget/watch verification, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 provider, parser locale, widget/weather, and task-integration scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
