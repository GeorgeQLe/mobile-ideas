# Reclaim.ai-Style Clone Spec

> Metadata
> - Inspiration app: Reclaim.ai
> - Category: Tasks and project management
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: account and calendar integration policy, AI scheduling algorithm behavior, task/habit auto-scheduling conflicts, Google Calendar/Outlook sync fidelity, smart meeting scheduling, buffer/travel time computation, team availability coordination, subscription restore, and regional compliance.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Reclaim.ai's public AI-powered time orchestration workflow. The V1 clone focuses on smart task scheduling with AI-driven time-slot optimization, habit routines with recurring auto-protection, meeting optimization with smart 1:1 scheduling, focus time protection with configurable defense levels, calendar sync across Google Calendar and Outlook, team scheduling links for external booking, time analytics and productivity stats, and paid plan entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, calendar, subscription, AI scheduling, team, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first AI scheduling experience with onboarding, calendar connection, task scheduling, habit management, focus protection, meeting optimization, analytics, settings, support, and recovery flows.
- Preserve the functional job behind Reclaim.ai while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.

## Non-Goals

- Do not copy Reclaim.ai branding, logos, screenshots, marketing copy, private APIs, proprietary scheduling algorithms, plan names, UI trade dress, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, account, calendar integration, permission, push, subscription, team, and region states.
- Do not reverse-engineer the proprietary AI scheduling engine; implement original scheduling heuristics that achieve functional parity with publicly documented behavior.
- Do not bypass calendar provider OAuth scopes, enterprise admin policies, subscription gates, or data loss prevention.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/reclaim-ai-smart-scheduling/id1600626541 | iOS listing, privacy labels, release notes, AI scheduling claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=ai.reclaim.android | Android listing, data safety, scheduling/calendar claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://reclaim.ai/ | AI scheduling, tasks, habits, focus time, meetings, team features, and product positioning | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help | https://help.reclaim.ai/ | Task scheduling, habit configuration, calendar sync, scheduling links, integrations, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://reclaim.ai/legal/privacy-policy | Account, calendar, scheduling, analytics, integrations, and privacy disclosures | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms | https://reclaim.ai/legal/terms-of-service | Service, subscriptions, calendar access, AI scheduling, team features, and acceptable-use boundaries | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support account creation via Google/Microsoft SSO, returning-user recovery, calendar connection consent, timezone detection, work-hours configuration, permission primers, and blocked-account states.
- Smart scheduling engine must accept tasks with duration estimates, priority levels, deadlines, and time-of-day preferences, then automatically find optimal calendar slots that respect existing events, work hours, focus blocks, and buffer policies.
- Calendar integration must support bidirectional sync with Google Calendar and Microsoft Outlook, including event creation, modification, deletion, conflict detection, multi-calendar awareness, and free/busy resolution.
- Task management must model tasks with title, duration estimate, min/max chunk size, priority (critical/high/medium/low), deadline, snooze, recurrence, project grouping, and auto-scheduling toggle with AI-driven rescheduling on conflicts.
- Habits must model recurring routines (exercise, lunch, reading, planning) with ideal time windows, frequency targets, defense levels (flexible/default/protected), and auto-rescheduling when conflicts arise.
- Focus time protection must create defended calendar blocks for deep work, support configurable defense levels, minimum session durations, preferred time-of-day, and auto-decline or auto-propose alternatives for conflicting meeting requests.
- Meeting optimization must support smart 1:1 scheduling with preferred cadence, auto-find mutual availability, meeting breaks/buffers, travel time injection, no-meeting days, and decompression time between consecutive meetings.
- Scheduling links must enable external booking pages with configurable availability windows, meeting durations, buffer before/after, priority relative to other events, and calendar-aware slot generation.
- Buffer and travel time must compute pre/post-meeting padding, commute estimates between in-person meetings, decompression time, and context-switching allowances.
- Team features must support shared availability views, team scheduling links, synchronized no-meeting days, team habits, and manager visibility into direct-report scheduling health.
- Analytics must show time allocation breakdowns (meetings, focus, habits, tasks, travel), productivity scores, scheduling efficiency metrics, weekly/monthly trends, and goal tracking.
- Settings must include profile, connected calendars, work hours, time policies, notification preferences, scheduling preferences, integrations, support, terms, privacy policy, data export, and deletion or account-closure entry points.
- Entitlements must model free, trial, paid (Starter/Business/Enterprise), expired, canceled, restored, refunded, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, and keyboard navigation where relevant.
- Offline behavior must preserve safe read-only calendar views and task lists with explicit stale-state labels while blocking scheduling actions, calendar writes, and AI optimization until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: account and calendar integration policy, AI scheduling algorithm behavior, task/habit auto-scheduling conflicts, Google Calendar/Outlook sync fidelity, smart meeting scheduling, buffer/travel time computation, team availability coordination, subscription restore, and regional compliance.

## Core User Journeys

- User creates an account via Google or Microsoft SSO, connects their primary calendar, configures work hours and timezone, and reaches the Planner dashboard showing today's optimized schedule.
- User creates a new task with duration, priority, and deadline; the AI scheduling engine finds the best available time slot and places a defended event on the calendar.
- User sets up a recurring habit (e.g., daily exercise at 7 AM, 30 minutes, flexible defense); the system protects this time and auto-reschedules when higher-priority conflicts arise.
- User enables focus time protection for 2-hour daily blocks; the system defends these slots by auto-declining or proposing alternatives to conflicting meeting invites.
- User creates a scheduling link for external parties to book meetings; available slots are generated dynamically based on real-time calendar state, buffers, and preferences.
- User views weekly analytics showing time spent in meetings vs. focus vs. habits; identifies trends and adjusts time policies.
- User experiences a calendar conflict where a new meeting overlaps a scheduled task; the AI engine automatically reschedules the task to the next best available slot and notifies the user.
- User denies calendar permission, receives a functional fallback explaining reduced capabilities, and can grant permission later from settings.
- User loses connectivity, sees cached schedule labeled as stale, and cannot create or modify scheduling actions until reconnected.
- User upgrades from free to paid plan and sees advanced features (multiple calendars, team features, priority scheduling, extended analytics) unlock.
- User requests data export or account deletion from settings and sees calendar-connected data limitations clearly explained.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Google/Microsoft SSO, calendar consent, timezone/work-hours setup | SSO tap, calendar selection, time config | new, returning, managed, locked | SSO failure, calendar permission denied, region unavailable |
| Planner/Today | Daily optimized schedule, upcoming events, tasks, habits, focus blocks | tap event, drag reschedule, quick-add | empty, loading, current, offline, conflict | calendar sync failure, stale data, AI scheduling unavailable |
| Tasks | Task list with priority, deadline, scheduling status, project groups | create, edit, prioritize, snooze, complete | empty, loading, scheduled, overdue, completed | scheduling failure, deadline passed, conflict cascade |
| Habits | Recurring routine management with defense levels and frequency tracking | create, edit frequency, adjust defense, view streak | empty, active, paused, conflicted, completed | habit displaced, frequency unmet, defense overridden |
| Focus Time | Focus block configuration, defense settings, and session history | enable, configure hours, set defense level | disabled, active, defended, breached | all slots taken, defense overridden, no available windows |
| Meetings | Smart 1:1 management, meeting breaks, no-meeting days, travel time | configure cadence, set buffers, block days | empty, optimized, over-scheduled, buffer-active | mutual availability failure, buffer squeeze, travel estimate error |
| Scheduling Links | External booking pages with configurable availability | create link, set duration, configure buffers | active, paused, expired, booked | no availability, overbooking, timezone mismatch |
| Stats/Analytics | Time allocation breakdowns, trends, productivity scores | view period, filter category, export | empty, loading, current, historical | insufficient data, sync gap, calculation error |
| Team | Shared availability, team scheduling, manager views | view team, sync availability, configure sharing | individual, team-member, manager | team sync failure, permission denied, plan-gated |
| Settings/Account | Connected calendars, work hours, time policies, integrations, privacy | forms, toggles, calendar connect/disconnect | loaded, editing, syncing | calendar disconnect failure, sync error, enterprise policy block |

## Data Model

- `User`: account identity, SSO provider, timezone, locale, work-hours configuration, notification preferences, entitlement state, team membership, deletion/export status, and audit metadata.
- `CalendarConnection`: provider (Google/Microsoft), OAuth tokens, sync state, connected calendars list, last-sync timestamp, error state, and permission scope.
- `Task`: title, duration estimate, min/max chunk duration, priority (critical/high/medium/low), deadline, project reference, recurrence, auto-schedule toggle, scheduled event references, completion state, snooze until, and reschedule history.
- `Habit`: title, ideal time window (start/end), duration, frequency (daily/weekly), defense level (flexible/default/protected), days of week, streak count, scheduled event references, displacement history, and pause state.
- `FocusBlock`: preferred time window, minimum session duration, defense level, days of week, auto-decline behavior, scheduled event references, breach history, and active/paused state.
- `Meeting`: title, participants, duration, cadence (weekly/biweekly/monthly), buffer before/after, travel time, no-meeting-day respect, smart scheduling preferences, and optimization state.
- `SchedulingLink`: slug, title, duration options, buffer before/after, availability window, priority level, active/paused/expired state, booking count, and connected calendar reference.
- `TimePolicy`: work hours per day of week, lunch block, no-meeting days, minimum focus time daily, maximum meeting hours daily, buffer defaults, and travel time defaults.
- `CalendarEvent`: external event ID, calendar reference, title (redacted for privacy), start/end, type (task/habit/focus/meeting/external), defense level, and sync state.
- `SchedulingDecision`: task/habit/focus reference, attempted slot, conflict reason, resolution action, rescheduled slot, timestamp, and AI confidence score.
- `TeamMembership`: team reference, role (member/manager/admin), shared availability scope, visibility permissions, and sync state.
- `AnalyticsSnapshot`: period (day/week/month), time-by-category breakdown, meeting count, focus hours, habit completion rate, scheduling efficiency score, and trend deltas.
- `Entitlement`: free, trial, starter, business, enterprise, expired, canceled, restored, refunded, or unavailable state with feature gates and usage limits.
- `AuditEvent`: append-only record for calendar access, scheduling decisions, team visibility, account changes, support actions, and entitlement transitions.
- `LocalCacheRecord`: device-local state for offline calendar views, queued task edits, sync attempts, conflict markers, stale-source labels, and cache expiry.

## API And Backend Contracts

- Auth/identity: `POST /auth/session` (Google/Microsoft SSO), `POST /auth/refresh`, `DELETE /auth/session`, and `GET /auth/profile` with timezone, locale, and device metadata.
- Calendar sync: `POST /calendars/connect` (OAuth flow initiation), `GET /calendars`, `POST /calendars/sync` (trigger incremental sync), `GET /calendars/{id}/events` (time-range query), and `DELETE /calendars/{id}` (disconnect) with sync-state and error metadata.
- Tasks: `POST /tasks`, `GET /tasks`, `GET /tasks/{id}`, `PATCH /tasks/{id}`, `DELETE /tasks/{id}`, `POST /tasks/{id}/schedule` (trigger AI scheduling), and `POST /tasks/{id}/snooze` with priority, deadline, and scheduling-status metadata.
- Habits: `POST /habits`, `GET /habits`, `PATCH /habits/{id}`, `DELETE /habits/{id}`, and `POST /habits/{id}/pause` with frequency, defense-level, and streak metadata.
- Focus time: `POST /focus-blocks`, `GET /focus-blocks`, `PATCH /focus-blocks/{id}`, `DELETE /focus-blocks/{id}`, and `GET /focus-blocks/sessions` with defense-level and breach-history metadata.
- Scheduling engine: `POST /scheduling/optimize` (full reschedule), `GET /scheduling/suggestions` (next-best-slot proposals), `POST /scheduling/resolve-conflict` (user-directed resolution), and `GET /scheduling/decisions` (audit log of AI decisions) with confidence scores and conflict metadata.
- Meetings: `POST /meetings`, `GET /meetings`, `PATCH /meetings/{id}`, `DELETE /meetings/{id}`, and `POST /meetings/{id}/find-time` (mutual availability search) with buffer, travel, and cadence metadata.
- Scheduling links: `POST /scheduling-links`, `GET /scheduling-links`, `PATCH /scheduling-links/{id}`, `DELETE /scheduling-links/{id}`, and `GET /scheduling-links/{slug}/availability` (public slot query) with booking-count and active-state metadata.
- Time policies: `GET /time-policies`, `PATCH /time-policies`, and validation against connected calendar state.
- Availability: `GET /availability` (free/busy query for time range), `GET /availability/team` (team-wide availability), and `POST /availability/hold` (tentative slot reservation) with conflict and overlap metadata.
- Analytics: `GET /analytics/summary` (period-based breakdown), `GET /analytics/trends` (multi-period comparison), and `GET /analytics/export` with category, period, and granularity parameters.
- Team: `GET /team`, `POST /team/invite`, `DELETE /team/members/{id}`, `GET /team/availability`, and `PATCH /team/settings` with role-scoped authorization.
- Integrations: `GET /integrations`, `POST /integrations/connect` (Todoist, Asana, Jira, Slack, Zoom, Linear, ClickUp), `DELETE /integrations/{id}`, and `POST /integrations/{id}/sync` with permission-scoped imports.
- Notifications: `POST /notification-preferences`, `GET /notifications`, and server-side fanout for scheduling changes, conflict alerts, habit reminders, meeting updates, and team activity categories.
- Billing/entitlements: `GET /entitlements`, `POST /checkout/session`, `POST /entitlements/restore`, and webhook-backed entitlement updates; never trust client-only subscription state.
- Privacy/support: `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, and `POST /support-cases` with calendar-data, team-data, and integration-data limitations.
- Config: `GET /app-config` returns feature flags, supported regions, minimum versions, maintenance banners, and legal links.

## Realtime, Push, And Offline Behavior

- Cache the planner view, task list, habit list, focus block state, scheduling links, analytics summary, settings, and entitlement state with explicit TTL and stale-state labels.
- Realtime channels use websocket or SSE for calendar sync events, scheduling decisions, conflict alerts, meeting updates, and team availability changes; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category (scheduling changes, conflicts, habit reminders, meeting updates, team activity), mirrored in an in-app notification center, and deep-linked only after authorization checks.
- Queue only low-risk edits locally (task title changes, habit pause/resume); block calendar writes, scheduling actions, meeting creation, link generation, and irreversible deletes while offline.
- Long-running scheduling operations must expose pending, optimizing, complete, failed, conflict-detected, and user-action-required states.
- Background sync must tolerate app termination, OS permission changes, token expiry, calendar provider outages, clock skew, and replayed webhooks.
- Calendar sync must handle Google/Microsoft API rate limits, partial sync failures, event pagination, and incremental sync tokens gracefully.

## Permissions, Privacy, And Safety

- Treat calendar data access, scheduling decisions, team availability visibility, meeting participant data, integration OAuth scopes, analytics computation, and subscription state as launch-blocking review areas with owners, mitigations, and acceptance tests before implementation.
- Calendar OAuth consent must be explicit, minimal-scope, auditable, revocable, and clearly separate from marketing preferences.
- Do not send raw calendar event titles, participant emails, meeting content, scheduling link booking details, or team member schedules as analytics properties.
- Calendar provider tokens must be encrypted at rest, rotated on refresh, and revoked on disconnect or account deletion.
- Team visibility must respect role boundaries; individual contributors see only their own data unless explicit team sharing is configured.
- Enterprise/organization calendar policies must be respected; do not override admin-set restrictions on external sharing or booking.
- Native permission prompts for notifications and calendar access must be just-in-time with functional denial fallbacks.
- Safety copy must route calendar data concerns, privacy complaints, team visibility issues, and account security to appropriate human-owned channels.
- Use original scheduling algorithms and licensed third-party providers only after legal review.
- Do not store raw calendar event bodies, attendee lists, or meeting notes beyond what is necessary for scheduling optimization.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `calendar_connect_started`, `calendar_connect_completed`, `work_hours_configured`, `signup_completed`, `onboarding_blocked` with provider type, locale, and experiment IDs.
- Core action events: `planner_viewed`, `task_created`, `task_scheduled`, `task_completed`, `habit_created`, `habit_completed`, `focus_block_created`, `scheduling_link_created`, `meeting_optimized`, `conflict_resolved` with object type and coarse outcome only.
- Retention events: `notification_opened`, `analytics_viewed`, `streak_maintained`, `scheduling_link_booked`, `weekly_summary_viewed`, `settings_updated`.
- Safety/privacy events: `privacy_setting_changed`, `calendar_disconnected`, `data_export_requested`, `account_delete_requested`, `team_visibility_changed`, `integration_revoked`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_restored`, `entitlement_expired`.
- Monetization model: use original free/trial/paid entitlement logic with feature gating for multiple calendars, team features, advanced analytics, priority scheduling, and integrations; do not copy exact pricing, plan names, or promotional copy from Reclaim.ai.
- Analytics rule: do not send raw calendar event titles, participant emails, meeting content, scheduling decisions, team schedules, or payment credentials as event properties.

## Edge Cases

- First launch with no network, no Google/Microsoft account, expired OAuth token, unsupported calendar provider, unsupported region, or maintenance banner.
- Calendar permission denied, permission later revoked in OS or provider settings, OAuth scope reduced by admin policy, and permission granted after fallback use.
- AI scheduling finds no available slot for a task within its deadline window; must surface actionable alternatives (extend deadline, reduce duration, lower priority, override existing event).
- Multiple tasks/habits compete for the same optimal time slot; priority resolution must be deterministic and auditable.
- Calendar sync receives conflicting updates from multiple devices or calendar clients simultaneously; must resolve to canonical provider state.
- Timezone change (user travel) causes scheduled tasks/habits to shift; must reoptimize without losing user intent.
- Multi-calendar conflicts where work and personal calendars have overlapping events with different visibility.
- Scheduling link receives a booking request for a slot that became unavailable between page load and confirmation.
- Habit defense is overridden by a critical meeting; must track displacement, attempt rescheduling, and update streak.
- Focus block is breached by an accepted meeting invite from another calendar client; must detect and alert.
- Team member disconnects calendar or leaves team; must gracefully degrade team availability views.
- Duplicate taps, retry after timeout, duplicate webhook delivery from calendar provider, stale optimistic UI, and clock skew between client and server.
- Deleted, suspended, expired, or entitlement-locked scheduling features when plan downgrades mid-cycle.
- Partial calendar sync failure where some events update but others fail; must not leave calendar in inconsistent state.
- Calendar provider API outage (Google/Microsoft) with graceful degradation and recovery.
- Subscription restored on a different platform, refunded externally, or unavailable in the user's region.
- Legal/privacy request submitted while active calendar connections, team memberships, scheduling links, and integration tokens still exist.

## Test Plan

- Unit tests for scheduling algorithm heuristics, priority resolution, time-slot optimization, conflict detection, buffer computation, timezone conversion, and privacy-safe analytics payload construction.
- Integration tests for Google Calendar OAuth flow, Microsoft Outlook OAuth flow, calendar sync (create/update/delete), task scheduling round-trip, habit auto-protection, focus block defense, and scheduling link availability generation.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event from calendar providers, and realtime reconciliation path.
- Offline tests for cached planner reads, stale labels on schedule data, blocked scheduling actions, reconnect reconciliation with calendar state, and corrupt-cache recovery.
- Permission tests for calendar access denied, granted, revoked, scope-reduced, OAuth expired, and OS-settings recovery states.
- Scheduling engine tests for no-available-slot scenarios, multi-task priority conflicts, habit displacement and recovery, focus block defense levels, meeting buffer squeeze, and travel time estimation.
- Calendar sync tests for incremental sync tokens, partial failure recovery, multi-calendar merge, timezone normalization, all-day event handling, recurring event expansion, and provider rate-limit backoff.
- Safety/privacy tests for calendar data redaction in logs/analytics, OAuth token rotation, team visibility boundaries, enterprise policy enforcement, and data export completeness.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, and keyboard navigation.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, feature-gate enforcement on calendar count and team size.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences (conflicts, habits, meetings, team), deep links, and in-app notification center behavior.
- Manual verification tests for account and calendar integration policy, AI scheduling algorithm behavior, task/habit auto-scheduling conflicts, Google Calendar/Outlook sync fidelity, smart meeting scheduling, buffer/travel time computation, team availability coordination, subscription restore, and regional compliance.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow of AI-powered schedule optimization.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can complete onboarding, connect a calendar, configure work hours, and reach the Planner dashboard without unsupported permissions.
- A returning user can create a task, observe AI-scheduled placement, resolve a conflict, and confirm canonical calendar state after sync.
- Planner, Tasks, Habits, Focus Time, Meetings, Scheduling Links, Analytics, Team, and Settings flows are represented in routes and tests.
- All entities have owners, lifecycle states, authorization rules, retention, audit events, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, calendar permission denial, offline behavior, scheduling conflict resolution, accessibility, support/safety, entitlement gating, notifications, data deletion/export, and regression behavior.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact iOS and Android native screens, permission prompts, and push payloads differ materially from public marketplace claims?
- Which account, calendar, subscription, team, enterprise, or integration states require paid, managed, or provider-specific test access?
- Which third-party providers will supply calendar sync, identity, payments, notifications, analytics, scheduling optimization, video conferencing, or task-import services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, enterprise-policy, or platform-policy reasons?
- What retention, export, and deletion limits apply to calendar-connected data, scheduling history, team data, analytics, integration tokens, and audit records?
- How does the scheduling engine handle edge cases around daylight saving transitions, half-hour timezone offsets, and calendar systems beyond Gregorian?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, seed-data policy, and safety-review checklist.
- Phase 2: Build onboarding, calendar connection, Planner dashboard, task creation, and settings shells with original copy and sample data.
- Phase 3: Implement scheduling engine with priority resolution, conflict detection, time-slot optimization, and habit/focus auto-protection.
- Phase 4: Add calendar sync contracts (Google/Microsoft), realtime updates, offline caching, notification preferences, scheduling links, and team availability views.
- Phase 5: Add analytics computation, meeting optimization, buffer/travel time, integration connectors, data export/delete flows, and entitlement gating.
- Phase 6: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, billing, and regression tests.
- Phase 7: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, calendar connection, Planner, task scheduling, habit management, focus blocks, scheduling links, analytics, team features, settings, permissions, notifications, entitlement states, and account deletion.
- Record app-specific calendar integration, AI scheduling, team coordination, enterprise policy, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for calendar-connected data and scheduling history; update API contracts before downstream implementation.
- Extend the Phase 6 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
