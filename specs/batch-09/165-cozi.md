# Cozi-Style Clone Spec

> Metadata
> - Inspiration app: Cozi
> - Category: Family organizer
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, Cozi product pages, public support/help pages, privacy policy, and terms.
> - Manual verification blockers: subscription/entitlement flows, calendar subscription behavior, native reminder/push payloads, shared-password household edge cases, recipe import, printable/export views, and widget/native month-view behavior require test accounts/devices before one-for-one parity claims; billing owner, privacy lead, accessibility owner, and release owner must keep these behind acceptance-test blockers.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, illustrations, or sample data. Do not reuse proprietary templates, recipes, newsletters, awards artwork, or marketing copy.

## Overview

Build an original mobile family organizer inspired by Cozi: shared family calendar, grocery and shopping lists, to-do lists, meal plans and recipes, chores, and a family journal. Optimized for multi-person households with simple, low-friction shared data.

## Goals

- Shared family calendar with per-person colors and category filters.
- Grocery and other shopping lists with aisle ordering and check-off.
- To-do lists and chores with assignees and recurrence.
- Meal plans linked to recipes and to grocery lists.
- Family journal entries and optional printable/exportable views.

## Non-Goals

- Do not copy proprietary feature names, branding, or content templates.
- Do not target advertising to child household members.
- Do not share household data beyond invited family members.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/cozi-family-organizer/id350556377 | Official iOS listing, family calendar/list/recipe positioning, subscription presence, age rating, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.cozi.androidfree | Official Android listing, shared calendar, reminders, shopping lists, to-do lists, recipe box, Cozi Gold, data safety | Verified 2026-05-01 |
| Feature overview | https://www.cozi.com/feature-overview/ | Calendar, shopping lists, recipes, Cozi Today, reminders, day-agenda positioning | Verified 2026-05-01 |
| Shopping lists | https://www.cozi.com/shopping-lists/ | Shared shopping-list access, multiple store lists, recipe-to-shopping-list flow | Verified 2026-05-01 |
| Cozi Gold | https://www.cozi.com/cozi-gold/ | Month view, no ads, calendar search, extra reminders, change notifications, premium gates | Verified 2026-05-01 |
| Cozi support | https://www.cozi.com/support/ | Support entry point and troubleshooting path | Verified 2026-05-01 |
| Cozi privacy policy | https://www.cozi.com/privacy-policy/ | Data handling, account/privacy obligations | Verified 2026-05-01 |
| Cozi terms | https://www.cozi.com/terms-of-use/ | Account, acceptable-use, subscription, and service limitations | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings and Cozi feature pages verify shared household calendar, reminders, shopping lists, to-do lists, recipe storage, meal planning, and cross-device access.
- Household access must support the verified shared-family account model while avoiding copied Cozi terminology; V1 can use individual member identities around one household workspace.
- Calendar must support color-coded family members, event reminders, daily/weekly agenda digests, recurring events, and mobile day/list views.
- Premium-style features can include month view, calendar search, extra reminders, change notifications, birthday tracking, and ad-free UI, but copy, plan name, price, and entitlement packaging must be original.
- Shopping lists must be editable by multiple household members, support multiple stores/lists, preserve item check-off state, and handle near-real-time updates.
- Recipe storage and meal planning must support recipe-to-shopping-list ingredient transfer and weekly meal scheduling; imported recipes remain blocked until manual verification.
- To-do and chore lists are inferred from public list/to-do behavior and review-visible chore use; any chore-rotation automation must be framed as an original V1 extension.
- External calendar subscriptions must be opt-in, revocable, and documented as read-only or two-way only after hands-on verification.
- Reminder, agenda-email, and change-notification payloads must exclude sensitive household details by default unless a household adult opts in.
- Household member removal must revoke all active sessions, shared calendar/list access, and notification tokens.
- Child/teen household members require age-appropriate account limits, no behavioral ads, and adult-controlled sharing.
- Export/delete workflows must cover household data, personal account data, and member-level removal semantics.

## Core User Journeys

- User creates household, invites partner, adds kids as limited accounts.
- Household members view a shared calendar and filter by person.
- User adds a grocery item; partner checks it off in real time.
- User plans the week's meals and auto-adds ingredients to grocery list.
- User assigns chores with weekly recurrence.
- User imports Google Calendar; events display alongside household events.
- User exports calendar/list data.
- User upgrades to premium for advanced views.
- User removes a household member and revokes access.
- User writes a family journal entry.
- User turns on premium month view and extra reminders, then later restores purchase on a new device.
- User creates a birthday tracker reminder and confirms it appears without leaking private notes into push/email.
- User revokes an external calendar subscription and verifies imported events no longer refresh.
- Teen member views only household content and cannot invite an external account without adult approval.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Household setup, invite | name, members | new | duplicate household |
| Household Home | Today's agenda, lists, upcoming | none | loaded | offline |
| Calendar | Day/week/month views | event add/edit | populated | sync error |
| Event Composer | Create/edit event | date, people, reminder, repeat | draft, saved | conflict |
| Lists | Grocery, to-do, custom | add item, check | populated, empty | sync conflict |
| Meal Plans | Week view with recipes | assign meal | populated | unlinked recipe |
| Recipes | Recipe store and editor | recipe data | populated | import failed |
| Chores | Chores list with assignees | chore add, rotate | populated | overdue |
| Journal | Family journal feed | entry add | populated, empty | attachment failed |
| Members | Manage household | invite, role | loaded | revoked |
| Subscription | Plans, restore | plan | free, paid | restore fail |
| Settings And Privacy | Account, sync, export, delete | toggles | loaded | pending |
| Agenda Digest | Daily/weekly email and notification preferences | recipient, cadence | active, paused | email bounce |
| Premium Calendar | Month view, search, birthday tracker | search, event tap | free-gated, paid | entitlement stale |
| Data Export | Household and account archive | request, confirm | queued, ready | expired link |
| Member Removal | Revoke access and sessions | remove, transfer owner | pending, complete | sole adult |

## Data Model

- `User`: identity, role hint, locale.
- `Household`: owner, members, settings, color map.
- `Membership`: user, household, role (adult/teen/child), joined-at.
- `Event`: household, title, times, recurrence rule, attendees, category, reminders.
- `List`: household, type, name.
- `ListItem`: list, text, assignee, checked, aisle/order hint.
- `MealPlan`: week, day, meal slot, recipe id.
- `Recipe`: title, ingredients, steps, tags.
- `Chore`: title, assignee rotation, recurrence, last-completed.
- `JournalEntry`: author, body, attachments, date.
- `CalendarSync`: provider, scopes, last sync.
- `Invite`: household, code, role, expires-at.
- `Entitlement`: plan, platform, state.
- `AuditEvent`: membership, billing, privacy events.
- `AgendaDigest`: household, recipients, cadence, last sent, failure state.
- `NotificationPreference`: member, event/list/chore/reminder channels, quiet hours.
- `DataExportJob`: requester, scope, state, secure download expiry.
- `DeletionRequest`: account or household scope, grace period, cascading status.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /households`, `POST /households/:id/invites`, `POST /invites/:code/accept`, `DELETE /households/:id/members/:userId`.
- `GET /events`, `POST /events`, `PATCH /events/:id`, `DELETE /events/:id`.
- `GET /lists`, `POST /lists`, `GET /lists/:id/items`, `POST /lists/:id/items`, `PATCH /items/:id`, `DELETE /items/:id`.
- `GET /meal-plans?week=`, `PATCH /meal-plans`.
- `GET /recipes`, `POST /recipes`, `PATCH /recipes/:id`, `DELETE /recipes/:id`.
- `GET /chores`, `POST /chores`, `PATCH /chores/:id`.
- `GET /journal`, `POST /journal`, `DELETE /journal/:id`.
- `POST /calendar-sync/connect`, `DELETE /calendar-sync/:id`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /agenda-digests`, `PATCH /agenda-digests/:id`.
- `POST /notifications/test`, `PATCH /notification-preferences`.
- `GET /audit-events?household=`.

## Realtime, Push, And Offline Behavior

- Real-time list/calendar updates via websocket or polling.
- Offline edits queue and sync on reconnect with last-writer-wins plus audit.
- Push notifications for event reminders, list changes by others, chore due reminders (opt-in).
- Calendar sync with external providers runs server-side with incremental deltas.
- Agenda emails are asynchronous jobs with bounce/retry tracking.
- Premium entitlement changes must reconcile from app-store/webhook state before unlocking month view, extra reminders, or calendar search.

## Permissions, Privacy, And Safety

- Child accounts limited: no external sharing, no third-party ads, minimal profile.
- COPPA-style review required for child accounts before launch.
- Data scoped to household; no cross-household discovery.
- Export and deletion accessible; deletion cascades household membership.
- External calendar sync scopes are explicit and revocable.
- Launch owner: privacy lead, accessibility owner.
- Household location is out of scope; do not add location tracking under the family-organizer umbrella.
- Domestic-abuse review: member removal, password reset, and shared-account semantics must not trap a person in an unwanted household; support must provide an account-separation path.
- Child/teen accounts must show a clear disclosure that household adults can see shared calendar/list content.
- Support tooling must redact recipe notes, shopping-list content, journal entries, and calendar descriptions by default.

## Analytics And Monetization

- Track privacy-safe events: household created, event added, list updated, meal plan saved, chore completed, subscription events.
- No event/list content in analytics.
- Free tier plus premium (advanced calendar, recipe import, ad removal); original paywall copy.
- Ads, if any, excluded from child-account surfaces and non-behavioral.
- Analytics must use object counts and feature names only, never event titles, grocery items, recipes, journal text, member names, or imported calendar content.

## Edge Cases

- Duplicate event when both calendar sync and manual add.
- Recurrence exceptions (cancel one instance).
- Timezone travel.
- Shared list concurrent edit; last-writer-wins plus undo.
- Child account attempts to invite externally.
- Household owner leaves; transfer required.
- Large recipe photo attachments.
- Calendar sync revoked mid-session.
- Email agenda bounces or goes to a removed member.
- Premium expires while a user has future events beyond the free edit window.
- External calendar creates duplicate recurring instances during daylight-saving time.
- Household owner is a minor or all adult accounts leave.
- Deleted member remains on a shared device with cached data.
- Recipe import creates malformed ingredient quantities.
- Journal attachment upload finishes after entry deletion.

## Test Plan

- Unit tests for recurrence, chore rotation, list conflict merge.
- Contract tests for all endpoints.
- Integration tests for invite, event, list, meal plan, recipe flows.
- Privacy tests: child account restrictions, export, delete.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Manual verification: calendar sync, push behavior, native widgets.
- Entitlement tests for free, trial, paid, expired, canceled, app-store restore, web-owned subscription, and webhook delay.
- Security tests for revoked member sessions, shared-password reset, invite replay, and export-link expiry.
- Privacy tests for child/teen restrictions, no behavioral ad events, support redaction, household delete, member remove, and data export.
- Email/push tests for digest opt-in, quiet hours, bounce handling, and sensitive-content suppression.

## Acceptance Criteria

- Multi-member household with calendar, lists, meal plans, chores, journal functional.
- External calendar sync optional and scoped.
- Child accounts restricted per COPPA-style review.
- Export and deletion accessible.
- Premium-gated month view/search/extra reminder behavior is original, testable, and server-authorized.
- Shared-account/member-removal flows pass domestic-abuse and account-separation review.
- Manual verification blockers are either resolved with dated evidence or remain launch-blocking feature flags.

## Open Questions

- Which external calendar providers in V1.
- Widget coverage on iOS/Android.
- Whether to offer printable/email digest.
- Scope of premium tier.
- Whether V1 supports shared-password compatibility, individual member accounts only, or both.
- Whether recipe import is included in V1 or deferred behind a manual verification flag.
- Exact supported external-calendar providers and sync direction.

## Build Plan

- Phase 1: scaffold, household, calendar, lists.
- Phase 2: meal plans, recipes, chores.
- Phase 3: journal, calendar sync, real-time.
- Phase 4: subscription, privacy, export/delete.
- Phase 5: accessibility, legal review.
- Phase 6: manual verification, rollout.
- Phase 7: complete household account-separation review, support redaction review, and native widget/month-view verification before parity claims.

## Next Steps

- Resolve manual verification blockers for subscription restore, push/email payloads, external calendar sync, widgets, and recipe import.
- Define whether the downstream implementation uses shared household passwords, individual accounts, or a compatibility migration path.
- Keep this spec as the source for downstream scaffold repos; do not claim exact Cozi parity until hands-on evidence closes the blockers.
