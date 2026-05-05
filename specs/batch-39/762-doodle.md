# Doodle-Style Clone Spec

> Metadata
> - Inspiration app: Doodle
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: poll voting mechanics, calendar integration behavior, participant notification delivery, premium poll features, time zone handling across participants, deadline enforcement, admin dashboard behavior, and subscription restore.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Doodle's public group scheduling workflow. The V1 clone focuses on creating time-based polls, collecting participant availability votes, determining optimal meeting times, connecting calendars, sending reminders, managing recurring polls, booking pages, one-on-one scheduling links, group polls with deadlines, admin controls, and premium entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, subscription, calendar-sync, notification, time-zone, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first group scheduling and polling experience with onboarding, dashboard, poll creation, voting, results, calendar sync, notifications, settings, and support flows.
- Reproduce the functional job behind Doodle using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Doodle branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, account, permission, push, subscription, and calendar-sync states.
- Do not implement production payments, regulated services, or real-money economies without separate legal/platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/doodle-easy-scheduling/id434981618 | iOS listing, privacy labels, release notes, scheduling claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.doodle.android | Android listing, data safety, scheduling claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://doodle.com/ | Product positioning, features, pricing, integrations, and scheduling workflow | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help center | https://help.doodle.com/ | Poll creation, voting, calendar sync, notifications, admin, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://doodle.com/en/privacy-policy/ | Data collection, calendar access, participant data, analytics, and third-party sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://doodle.com/en/general-terms-and-conditions/ | Service terms, subscriptions, acceptable use, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support guest poll participation (no account required), email signup, Google/Microsoft SSO, returning-user recovery, calendar connection primer, and blocked-account states.
- Dashboard must show upcoming polls, active polls awaiting responses, completed polls, booking pages, and one-on-one links with empty, loading, personalized, degraded-network, and signed-out variants.
- Poll creation must support group polls (multiple time options, participant voting), one-on-one meeting links, and booking pages within two taps from home.
- Poll voting must allow yes/no/if-need-be responses per time slot, display participant counts, show the optimal time, and handle deadline expiry.
- Calendar integration must connect Google Calendar, Outlook, Apple Calendar (CalDAV), display busy times during poll creation, and auto-book the final time.
- Settings must include profile, connected calendars, notification preferences, time zone, subscription, support, terms, privacy policy, data export, and delete-account entry points.
- Entitlements must model free (limited polls, ads), pro (no ads, custom branding, reminders, deadlines), team (admin dashboard, multiple organizers), and enterprise states.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, and accessible poll voting grids.
- Offline behavior must preserve draft polls locally and block poll finalization, vote submission, and calendar booking until server state is confirmed.

## Core User Journeys

- Organizer creates a new group poll: selects time options, adds title/location/description, sets deadline, invites participants via link/email, and publishes.
- Participant receives poll invitation, views proposed times, marks availability (yes/no/if-need-be), optionally adds comments, and submits vote.
- Organizer reviews poll results, sees the optimal time highlighted, closes the poll, and books the final meeting time.
- User connects a calendar, sees busy times overlaid during poll creation, and receives calendar events when polls are finalized.
- Organizer creates a booking page with available time slots, shares the link, and recipients self-schedule.
- User creates a one-on-one scheduling link, shares it, and the recipient picks from the organizer's available times.
- User sets reminders for pending polls, receives push notifications for new votes, deadlines approaching, and poll closures.
- User upgrades to premium, removes ads, gains custom branding and deadline features, and can manage team polls.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Entry, auth, guest access, and consent | email, SSO, deep link | new, returning, guest, locked | SSO failure, expired invite, blocked account |
| Dashboard | Active polls, booking pages, scheduling links | tap, pull-refresh, search | empty, loading, loaded, offline | no polls, expired polls, degraded network |
| Create Poll | Title, time options, location, deadline, invites | form fields, date picker, contacts | draft, publishing, published | validation error, offline, calendar unavailable |
| Vote/Respond | Time grid, yes/no/if-need-be selection, comments | toggle buttons, text, submit | open, submitted, deadline passed | duplicate vote, expired poll, offline |
| Poll Results | Participant responses, optimal time, close/book | close poll, book meeting | open, closed, booked | tie votes, no consensus, calendar conflict |
| Booking Page | Organizer availability, recipient self-schedule | time slot selection, confirm | available, booked, full | no availability, time zone mismatch |
| One-on-One | Scheduling link configuration and sharing | availability, duration, link | active, disabled, expired | calendar disconnect, overlap |
| Calendar Sync | Connected calendars, busy/free display | connect, disconnect, refresh | connected, disconnected, syncing | auth expired, sync failure, permission denied |
| Notifications | Vote alerts, deadline reminders, booking confirmations | preferences, tap-to-open | enabled, disabled, quiet hours | push denied, deep link stale |
| Settings | Profile, timezone, subscription, privacy, support | forms, toggles, links | loaded, editing, requested | subscription restore failure |

## Data Model

- `User`: account state, auth method (email/SSO/guest), display name, email, timezone, locale, connected calendars, notification preferences, entitlement state, and deletion/export status.
- `Poll`: poll type (group/one-on-one/booking), title, description, location, organizer, time options, deadline, state (draft/open/closed/booked), created/updated timestamps, and participant limit.
- `TimeOption`: proposed date/time, duration, poll reference, vote counts (yes/no/if-need-be), and final-selection flag.
- `Vote`: participant reference, poll reference, time option reference, response (yes/no/if-need-be), comment, submission timestamp, and IP/device metadata for anti-spam.
- `Participant`: name, email, user reference (optional for guests), poll reference, invitation state (pending/viewed/voted), and notification preference.
- `BookingPage`: organizer, title, description, duration options, availability rules, buffer time, timezone, link slug, and active/disabled state.
- `ScheduledMeeting`: poll or booking reference, confirmed time, participants, calendar event ID, location, conferencing link, and cancellation state.
- `CalendarConnection`: user reference, provider (Google/Outlook/Apple), auth tokens, sync state, last sync timestamp, and permission scope.
- `Reminder`: poll/booking reference, recipient, trigger type (deadline approaching/new vote/poll closed), delivery state, and scheduled time.
- `Entitlement`: user reference, plan (free/pro/team/enterprise), billing cycle, platform (iOS/Android/web), expiry, and restore state.
- `AuditEvent`: append-only record for poll creation, poll closure, vote submission, calendar booking, account changes, and entitlement transitions.
- `LocalCacheRecord`: device-local state for draft polls, pending votes, sync attempts, and cache expiry.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/sso`, `POST /auth/guest`, `DELETE /auth/session` with device-scoped session tracking.
- Polls: `POST /polls`, `GET /polls`, `GET /polls/{pollId}`, `PATCH /polls/{pollId}`, `POST /polls/{pollId}/close`, `DELETE /polls/{pollId}` with organizer authorization and idempotency keys.
- Votes: `POST /polls/{pollId}/votes`, `GET /polls/{pollId}/votes`, `PATCH /polls/{pollId}/votes/{voteId}` with participant validation, deadline enforcement, and duplicate detection.
- Booking pages: `POST /booking-pages`, `GET /booking-pages`, `GET /booking-pages/{slug}/availability`, `POST /booking-pages/{slug}/book` with conflict detection.
- Calendar: `POST /calendars/connect`, `GET /calendars/busy-times`, `DELETE /calendars/{connectionId}`, and `POST /calendars/sync` with OAuth token refresh.
- Notifications: `POST /notification-preferences`, `GET /notifications`, and server-side fanout for vote, deadline, closure, and booking categories.
- Billing: `GET /entitlements`, `POST /checkout/session`, `POST /entitlements/restore` with platform receipt validation.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings` accessible from settings and support flows.
- Invitations: `POST /polls/{pollId}/invitations`, `GET /invitations/{token}` for deep-link resolution, and `POST /invitations/{token}/remind` for re-sends.

## Realtime, Push, And Offline Behavior

- Cache the dashboard, active poll states, booking page configurations, and user settings for offline reads.
- Queue draft polls and pending votes locally with retry metadata; block poll finalization, calendar booking, and payment actions while offline.
- Push notifications must be opt-in, grouped by category (new votes, deadline reminders, poll closed, booking confirmed), and mirrored in an in-app notification center.
- Realtime updates for vote counts must use polling or websocket with server reconciliation after reconnect to avoid duplicate votes or stale results.
- Long-running calendar sync must expose pending, complete, failed, and retry states with user-visible feedback.
- Background work must tolerate app termination, OS permission changes, token expiry, and clock skew across participant time zones.

## Permissions, Privacy, And Safety

- Treat participant email collection, calendar access, vote anonymity, poll sharing scope, and guest data retention as launch-blocking review areas.
- Request calendar access only when the user initiates calendar connection; provide functional fallback (manual time entry) when denied.
- Request contacts only when user initiates participant invitation from contacts; provide email entry fallback.
- Request notification permission at the moment of first poll creation or first vote, not at launch.
- Minimize PII in analytics: do not log participant emails, calendar contents, or poll titles as event properties.
- Provide user-visible privacy policy, terms, data export, delete account, and support escalation from settings.
- Guest participants must be able to vote without creating an account; their data retention must respect privacy policy limits.
- Anti-spam: rate-limit vote submissions, detect duplicate votes from same IP/device, and block poll flooding.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `signup_completed`, `guest_vote_started`, `calendar_connected`, `onboarding_skipped` with source and locale.
- Core action events: `poll_created`, `poll_published`, `vote_submitted`, `poll_closed`, `meeting_booked`, `booking_page_created`, `scheduling_link_shared` with poll type and participant count.
- Retention events: `notification_opened`, `reminder_sent`, `poll_revisited`, `calendar_synced`, `dashboard_viewed`.
- Safety events: `spam_vote_blocked`, `privacy_setting_changed`, `data_export_requested`, `account_delete_requested`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_expired`.
- Monetization model: free tier with limited polls and ads; paid tiers remove ads and add premium features; do not copy exact Doodle pricing or plan names.
- Analytics rule: do not send participant emails, calendar contents, poll titles, vote details, or payment credentials as event properties.

## Edge Cases

- First launch with no network, expired session, or unsupported OS version.
- Guest participant votes on a poll that has already been closed or deleted.
- Participant votes after the deadline has passed; vote must be rejected with clear messaging.
- Organizer closes poll with a tie; system must not auto-select without organizer confirmation.
- Calendar connection token expires between poll creation and finalization; busy-time display degrades gracefully.
- Poll shared via link receives spam votes from bots; rate limiting and CAPTCHA fallback required.
- Time zone mismatch: participant in different timezone sees times in their local zone; edge cases around DST transitions.
- Duplicate vote submission from retry after timeout; server must enforce idempotency.
- Subscription restored on different platform; entitlement must reconcile across iOS/Android/web.
- Large group poll (50+ participants) must remain performant in vote display and optimal-time calculation.
- Poll with no votes at deadline; organizer notified and poll transitions to expired state.
- Booking page with no available slots; recipient sees clear "no availability" state.

## Test Plan

- Unit tests for vote tallying, optimal time calculation, deadline enforcement, time zone conversion, idempotency keys, and entitlement checks.
- Integration tests for auth, poll CRUD, vote submission, calendar connection, booking flow, notification delivery, and entitlement transitions.
- Contract tests for every API response shape, error code, pagination, webhook event, and calendar OAuth flow.
- Offline tests for cached dashboard, queued draft polls, blocked vote submission while offline, and reconnect reconciliation.
- Permission tests for calendar denied, contacts denied, notifications denied, and functional fallback behavior.
- Safety tests for spam vote detection, rate limiting, guest data handling, and privacy-safe analytics payloads.
- Accessibility tests for poll voting grid screen reader labels, focus order, dynamic type, contrast, and reduced motion.
- Billing tests for trial, purchase, renewal, cancellation, refund, expiration, and cross-platform restore.
- Notification tests for opt-in, denied, quiet hours, deep link to poll, and in-app notification center.
- Time zone tests for DST transitions, cross-timezone participant display, and calendar event creation in correct zone.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented group scheduling workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can create a group poll, share it, collect votes, and close the poll without unsupported permissions.
- A guest participant can vote on a poll via shared link without creating an account.
- Calendar integration displays busy times during poll creation and books finalized meetings.
- Booking pages allow recipients to self-schedule from organizer availability.
- Dashboard, poll creation, voting, results, booking, calendar sync, notifications, settings, and deletion/export flows are represented in routes and tests.
- All entities have owners, lifecycle states, authorization rules, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, time zones, spam protection, billing, notifications, and data deletion/export.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact iOS and Android native screens, permission prompts, and push payloads differ materially from public marketplace claims?
- Which account, subscription, or calendar-provider states require paid or provider-specific test access?
- Which third-party providers will supply calendar sync, notifications, analytics, payments, identity, and anti-spam services?
- Are any features intentionally out of scope for legal, safety, budget, or platform-policy reasons?
- What retention and deletion limits apply to guest participant data, expired polls, and closed poll history?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, and seed-data policy.
- Phase 2: Build onboarding, dashboard, poll creation, voting, results, and settings shells with original copy and sample data.
- Phase 3: Add calendar integration, booking pages, one-on-one links, notification preferences, and offline/retry handling.
- Phase 4: Add billing/entitlement flows, admin dashboard for team plans, custom branding, and deadline enforcement.
- Phase 5: Complete accessibility, privacy, safety, time zone, billing, permission, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture native iOS and Android screen evidence for poll creation, voting grid, results display, calendar connection, and booking flows.
- Record app-specific calendar provider, notification, time zone, and subscription blockers in a dedicated research note.
- Confirm privacy retention behavior for guest participant data and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
