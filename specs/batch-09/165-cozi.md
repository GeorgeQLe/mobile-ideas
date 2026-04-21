# Cozi-Style Clone Spec

> Metadata
> - Inspiration app: Cozi
> - Category: Family organizer
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings and public help-center discovery. Exact URLs pending verification.
> - Manual verification blockers: subscription/entitlement flows, calendar sync across providers, push behavior, and household sharing specifics require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, and sample data. No proprietary templates or content reuse.

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
| Apple App Store | https://apps.apple.com/us/app/cozi-family-organizer/id350556377 | Features, age rating, screenshots | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.cozi.androidfree | Feature list, data safety | Source discovery — pending exact URL verification |
| Cozi help center | https://www.cozi.com/help | Feature how-to | Source discovery — pending exact URL verification |
| Cozi privacy policy | https://www.cozi.com/privacy | Data handling | Source discovery — pending exact URL verification |
| Cozi support | https://support.cozi.com | FAQ and troubleshooting | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Household creation with invites via email or code.
- Per-person accounts with roles (adult, teen, child) affecting permissions.
- Calendar with recurrence, categories, reminders, and iCal/Google/Apple calendar sync (opt-in).
- Multiple lists (grocery, to-do, others) with real-time check-off and assignees.
- Meal plans for the week linked to recipes and auto-adding ingredients to a shopping list.
- Chore rotations with recurrence and assignee auto-advance.
- Family journal with per-person entries and optional photos.

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

## Realtime, Push, And Offline Behavior

- Real-time list/calendar updates via websocket or polling.
- Offline edits queue and sync on reconnect with last-writer-wins plus audit.
- Push notifications for event reminders, list changes by others, chore due reminders (opt-in).
- Calendar sync with external providers runs server-side with incremental deltas.

## Permissions, Privacy, And Safety

- Child accounts limited: no external sharing, no third-party ads, minimal profile.
- COPPA-style review required for child accounts before launch.
- Data scoped to household; no cross-household discovery.
- Export and deletion accessible; deletion cascades household membership.
- External calendar sync scopes are explicit and revocable.
- Launch owner: privacy lead, accessibility owner.

## Analytics And Monetization

- Track privacy-safe events: household created, event added, list updated, meal plan saved, chore completed, subscription events.
- No event/list content in analytics.
- Free tier plus premium (advanced calendar, recipe import, ad removal); original paywall copy.
- Ads, if any, excluded from child-account surfaces and non-behavioral.

## Edge Cases

- Duplicate event when both calendar sync and manual add.
- Recurrence exceptions (cancel one instance).
- Timezone travel.
- Shared list concurrent edit; last-writer-wins plus undo.
- Child account attempts to invite externally.
- Household owner leaves; transfer required.
- Large recipe photo attachments.
- Calendar sync revoked mid-session.

## Test Plan

- Unit tests for recurrence, chore rotation, list conflict merge.
- Contract tests for all endpoints.
- Integration tests for invite, event, list, meal plan, recipe flows.
- Privacy tests: child account restrictions, export, delete.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Manual verification: calendar sync, push behavior, native widgets.

## Acceptance Criteria

- Multi-member household with calendar, lists, meal plans, chores, journal functional.
- External calendar sync optional and scoped.
- Child accounts restricted per COPPA-style review.
- Export and deletion accessible.

## Open Questions

- Which external calendar providers in V1.
- Widget coverage on iOS/Android.
- Whether to offer printable/email digest.
- Scope of premium tier.

## Build Plan

- Phase 1: scaffold, household, calendar, lists.
- Phase 2: meal plans, recipes, chores.
- Phase 3: journal, calendar sync, real-time.
- Phase 4: subscription, privacy, export/delete.
- Phase 5: accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Define external calendar sync model.
- Define child-account limits.
