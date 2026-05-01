# Meetup-Style Clone Spec

> Metadata
> - Inspiration app: Meetup
> - Category: Events and interest groups
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS screen capture, Android walkthrough, organizer subscription purchase/restore, event creation, RSVP/check-in, group moderation, location recommendation, and push behavior remain blocked; events owner, billing owner, safety lead, privacy owner, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile app inspired by Meetup: interest-based group discovery, event RSVPs, organizer tools, attendee lists, and calendar integration. The product emphasizes recurring community events organized around topics and geographies.

The clone must not copy Meetup branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or scraped group/event datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide interest-based group discovery with location and topic filters.
- Support event creation, RSVPs, waitlists, attendee lists, and organizer tools.
- Offer calendar integration (ICS export, device calendar add) and reminders.
- Maintain safety: harassment reporting, minor protection, scam-group detection.
- Provide organizer-side tools for dues (optional), messaging, and attendance tracking.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Meetup-branded app or imply affiliation.
- Do not scrape Meetup, replay proprietary ranking, or reuse private APIs.
- Do not ship scraped group/event datasets or unlicensed location data.
- Do not process dues without clear disclosure and refund policies.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/meetup-social-events-groups/id375990038 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.meetup | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| Meetup Help Center | https://help.meetup.com/hc/en-us | Groups, events, RSVPs, organizer tools, messaging, payments, and account controls | Verified 2026-05-01 |
| Meetup Privacy Policy | https://www.meetup.com/privacy/ | Data collection, location, retention, deletion, advertising, and privacy rights | Verified 2026-05-01 |
| Meetup Terms of Service | https://www.meetup.com/terms/ | Acceptable use, organizer obligations, payments, scraping limits, and account terms | Verified 2026-05-01 |
| Meetup Community Guidelines | https://help.meetup.com/hc/en-us/articles/360045019691 | Harassment, discrimination, event safety, reporting, and moderation | Verified 2026-05-01 |
| Meetup Organizer Subscription Help | https://help.meetup.com/hc/en-us/categories/360000878612-Organizer-subscriptions | Organizer subscription and billing surfaces | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Local/online event discovery, groups, organizer tools, discussions, direct messaging, and location-based recommendations are verified from official store/help/legal pages.
- Organizer subscription entitlements, fraud controls, and in-person safety requirements remain inferred until lawful organizer testing.
- Group discovery by topic, location, and language; map and list views.
- Group pages show description, organizer, members, upcoming events, rules.
- Event creation by organizers with title, description, time, venue (in-person or online), capacity, RSVP policy, and optional dues.
- RSVP states: going, waitlisted, not going; capacity enforcement; waitlist promotion.
- Attendee list visibility controlled by organizer (members only, public, hidden).
- Calendar integration: ICS download, device calendar add, reminders (local and push).
- Organizer tools: member management, announcements, attendance mark-up, dues settings.
- Messaging: organizer-to-members announcements plus member-to-member chat with consent.

## Core User Journeys

- New user signs up, selects topics and location, and discovers groups.
- User joins a group, RSVPs to an upcoming event, and adds it to device calendar.
- User receives reminder the day-of event and marks attendance at the venue.
- Organizer creates a new event with venue, capacity, and RSVP policy; publishes to members.
- Organizer sends announcement to all RSVP'd members with opt-out support.
- User cancels RSVP; waitlist promotion triggered.
- User reports a member or group for policy violation.
- User searches events by keyword and attends with one-click RSVP.
- Organizer collects optional dues with clear disclosure and refund flow.
- User requests data export and account deletion; RSVPs and memberships cleared.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning | blocked region |
| Onboarding | Topics, location, notifications | picks, toggles | incomplete, complete | location denied |
| Group Discovery | Browse groups | filters, search | loaded, empty | no matches |
| Group Page | Overview, events, members | join, leave | loaded, joined, left | group paused |
| Event Detail | Title, venue, RSVP | RSVP action | open, full, waitlist, closed | canceled event |
| RSVP List | Attendees list | scroll | public, members-only, hidden | visibility restricted |
| Event Composer | Create/edit event | fields, capacity, dues | drafting, posted | venue conflict |
| Organizer Tools | Member management, announcements | actions | loaded, saved | permission revoked |
| Calendar/Reminders | View upcoming RSVPs | add to device | loaded, synced | sync failure |
| Messaging | Organizer-member or member-member | text, attachment | connecting, delivered, read | blocked, quota |
| Settings/Privacy | Notifications, visibility | toggles | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open dues block delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Group`: name, topic tags, location, description, rules, organizer roster, membership policy.
- `Membership`: user, group, role (member, organizer, co-organizer), joined_at.
- `Event`: group, title, description, start/end, venue (online or physical), capacity, RSVP policy, dues, visibility.
- `RSVP`: user, event, state (going, waitlisted, not-going), timestamps.
- `Attendance`: event, user, marked-present-at, method (self, organizer).
- `Announcement`: organizer, group, body, opt-out scope.
- `DuesPayment`: user, event/group, amount, processor reference, refund state.
- `Message`, `Conversation`: chat with moderation flags.
- `SafetyReport`, `Block`, `AuditEvent`: standard records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `GET /groups?filters=&cursor=`: group discovery.
- `GET /groups/:slug`, `POST /groups/:slug/join`, `DELETE /groups/:slug/membership`: group lifecycle.
- `POST /groups/:slug/events`, `PATCH /events/:id`, `DELETE /events/:id`: event lifecycle (organizer).
- `GET /events?filters=&cursor=`: event discovery.
- `POST /events/:id/rsvp`: RSVP change.
- `GET /events/:id/attendees`: attendee list with visibility check.
- `POST /events/:id/attendance`: mark attendance.
- `POST /groups/:slug/announcements`: organizer announcement.
- `POST /events/:id/dues`: dues payment with processor hand-off.
- `GET /conversations`, `POST /conversations/:id/messages`: chat.
- `POST /reports`, `POST /blocks`: safety actions.
- `GET /calendar/ics/:userId`: signed ICS feed URL.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Event reminders delivered via push with configurable lead time; payload redacts venue precision by default.
- RSVP changes, waitlist promotions, and announcements delivered via push.
- Messages via websocket/SSE with resume cursor; push payload redacts body.
- Cached group/event data available offline; RSVP actions queue with idempotency keys.
- Waitlist promotion is server-side; race conditions handled with atomic capacity decrement.
- ICS feed resync every N minutes to keep device calendar current.

## Permissions, Privacy, And Safety

- Location permission: coarse sufficient for discovery; precise only for venue map.
- Attendee-list visibility controlled by organizer; members can opt-out of public listing.
- Harassment, hate, and discrimination policy enforced via classifier plus moderator review.
- Minor protection: groups and events may restrict by age; platform minimum age enforced.
- Scam/pyramid group detection via pattern matching and user reports.
- Dues handling: clear disclosure, refund policy, processor compliance (PCI); refund flows tested.
- Venue safety: encourage public venues for in-person; warn on private-residence venues.
- Block list persists across reinstall; blocked user hidden from attendee list and can't RSVP to same event as blocker (optional).
- Data minimization in analytics: no chat body, no precise venue, no dues amounts in analytics.
- Account deletion purges RSVPs, memberships, messages, and dues history per retention.

## Analytics And Monetization

- Track privacy-safe events: signup, group joined, event RSVP, attendance marked, announcement sent/opened, dues paid (bucketed amount), message sent, account deletion requested.
- No chat body, precise venue coordinates, or exact dues amounts in analytics.
- Monetization: organizer subscription for group hosting, pro features, and analytics with original plan names.
- Paywall only for organizer-side; member UX remains free.
- Server-side webhook reconciliation for organizer billing and dues payouts.

## Edge Cases

- Event over-RSVP due to concurrent updates; atomic capacity handling and waitlist.
- Organizer disables group mid-event; preserve attendance records.
- Dues refund request after event; refund policy enforcement and processor reconciliation.
- Minor attempts to RSVP to adult-only event; age gate enforcement.
- Scam group reported; rapid takedown SLA.
- User attempts to re-join after ban; block enforcement.
- Calendar sync conflict (duplicate events); ICS uniqueness.
- Venue change notifications; push to all RSVPs with redacted payload.
- Precise-location denied; coarse-location fallback for discovery.
- Account deletion with unrefunded dues; refund processing prioritized before purge.

## Test Plan

- Unit tests for RSVP state machine, capacity and waitlist promotion, announcement opt-out, attendance marking.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for group join, event create/RSVP/attendance, announcement, dues payment with processor stub.
- Safety tests: harassment classifier, scam-group detection, minor protection.
- Privacy tests: attendee visibility, analytics redaction, data export, account deletion.
- Billing tests: organizer plan purchase/refund, dues refund, payout reconciliation.
- Offline and realtime tests: queued RSVP, message resume, push payload redaction, reminder delivery.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast.
- ICS tests: calendar export, duplicate prevention, time-zone handling.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, calendar sync.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Meetup assets, private APIs, or trademarked feature names.
- Users can discover groups, RSVP, attend, and receive reminders with privacy-respecting defaults.
- Organizers can create events, manage attendance, send announcements, and optionally collect dues with refund policy.
- Waitlist promotion, capacity enforcement, and attendance tracking covered by tests.
- ICS export and push reminders covered by tests.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which payments processor handles dues and what are refund windows?
- Will V1 include paid events with tickets or only optional dues?
- What retention window applies to attendance records and messages?
- Which age-verification method (if any) is used for age-restricted events?
- How are cross-group bans enforced and appealed?

## Build Plan

- Phase 1: auth, onboarding, group discovery, group page, join/leave.
- Phase 2: event creation, RSVPs, waitlist, attendee list visibility.
- Phase 3: reminders, ICS export, device calendar integration, attendance marking.
- Phase 4: organizer tools — announcements, member management, message opt-out.
- Phase 5: dues with processor integration and refund flows.
- Phase 6: safety tooling, moderation, accessibility pass.
- Phase 7: monetization (organizer plans), manual native verification, regional compliance.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for dues refund policy and age-verification posture.
- Confirm payments processor, calendar vendor, and harassment classifier targets.
