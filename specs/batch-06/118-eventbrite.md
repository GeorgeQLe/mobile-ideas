# Eventbrite-Style Clone Spec

> Metadata
> - Inspiration app: Eventbrite
> - Category: Event discovery and ticketing
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public organizer policy pages.
> - Manual verification blockers: native iOS/Android screen capture, ticket purchase/refund, scannable-ticket generation and validation, organizer dashboard, calendar integration, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile app inspired by Eventbrite: event discovery, ticket purchase, scannable tickets, organizer dashboards, and calendar integration. The product handles payment processing for tickets, refunds, and transfers, with strong anti-fraud and accessibility requirements.

The clone must not copy Eventbrite branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or scraped event datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide event discovery with categories, dates, location, and price filters.
- Support ticket purchase (free and paid), scannable tickets, transfers, and refunds.
- Enable organizer dashboards for event creation, capacity, ticket tiers, and check-in.
- Integrate with device calendars and deliver reminders.
- Maintain anti-fraud, accessibility, and payments compliance.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build an Eventbrite-branded app or imply affiliation.
- Do not scrape Eventbrite, replay proprietary ranking, or reuse private APIs.
- Do not store raw card details; use PCI-compliant processor tokens only.
- Do not ship scraped event datasets or unlicensed ticketing feeds.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/eventbrite/id487255141 | iOS listing, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.eventbrite.attendee | Android listing, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Eventbrite Help | https://www.eventbrite.com/support | Tickets, refunds, organizer tools | Source discovery — pending exact URL verification |
| Eventbrite Privacy | https://www.eventbrite.com/l/legalterms/ | Data collection, retention, deletion | Source discovery — pending exact URL verification |
| Eventbrite Terms | https://www.eventbrite.com/l/LegalTerms/ | Acceptable use, scraping, termination | Source discovery — pending exact URL verification |
| Eventbrite Community Guidelines | https://www.eventbrite.com/support/articles/en_US/Troubleshooting/eventbrite-community-guidelines | Prohibited events, safety | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Event discovery with category, date, location, and price filters; map and list views.
- Event detail includes organizer, venue, ticket tiers, capacity, and refund policy.
- Ticket purchase with saved payment methods (processor tokens); supports paid and free tickets.
- Scannable ticket includes unique QR/barcode, validity window, anti-copy measures, and is revocable on refund/transfer.
- Ticket transfers to another attendee with email confirmation; transferred ticket invalidates prior QR.
- Refunds per organizer policy with processor reconciliation; self-service when policy allows.
- Organizer dashboard: create event, set tiers, manage capacity, view sales, check-in attendees.
- Calendar integration: ICS download, device calendar add, reminders.

## Core User Journeys

- New user signs up, discovers events by category and location, and opens an event detail.
- User purchases tickets (free or paid) and receives scannable tickets.
- User adds event to device calendar and receives reminder.
- User transfers a ticket to a friend via email.
- User requests refund per organizer policy; processor refund triggered.
- At venue, organizer scans user's ticket QR and marks attendance.
- Organizer creates a new event with tiers, capacity, and refund policy; publishes.
- Organizer monitors sales dashboard, issues comp tickets, and closes sales.
- User reports a scam event; moderator takes down and issues refunds.
- User requests data export and account deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning | blocked region |
| Discovery | Browse events | filters, search | loaded, empty | location denied |
| Event Detail | Overview, tiers, RSVP | tap tier, tap buy | loaded, sold-out, canceled | scam-removed |
| Checkout | Purchase flow | payment, quantity | drafting, confirmed | payment decline, 3DS required |
| Tickets | My tickets | tap QR, transfer, refund | valid, used, refunded, transferred | revoked, expired |
| Ticket QR | Scannable ticket | display | valid, invalid | brightness low warning |
| Organizer Dashboard | Event management | create, edit, scan | draft, live, sold-out, closed | permission revoked |
| Check-In Scanner | Scan attendee ticket | camera | scanning, valid, duplicate | invalid QR, network failure |
| Refund Request | Request refund | reason | drafting, submitted | policy blocks |
| Calendar/Reminders | My upcoming events | add to device | loaded, synced | sync failure |
| Settings | Notifications, payment methods | toggles | loaded, saved | saved-card stale |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open ticket blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Event`: organizer, title, description, start/end, venue (online or physical), capacity, refund policy, visibility, moderation state.
- `TicketTier`: event, name, price, quantity, sale window, attendee fields.
- `Ticket`: tier, owner, qr_code (opaque), state (valid, used, refunded, transferred, revoked), issued_at.
- `Order`: user, tickets, processor reference, amount, fees, refund state.
- `PaymentMethod`: processor token reference; no raw card data.
- `Organizer`: verified organizer account with payout configuration.
- `CheckIn`: ticket, organizer scanner, timestamp, venue location.
- `Transfer`: ticket, old_owner, new_owner, accepted_at.
- `Refund`: order, amount, processor reference, reason, decided_by.
- `SafetyReport`, `AuditEvent`, `DataLicense`: standard records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `GET /events?filters=&cursor=`: event discovery.
- `GET /events/:id`: event detail with tiers.
- `POST /orders`, `GET /orders/mine`: purchase lifecycle with processor hand-off (3DS if required).
- `GET /tickets/mine`, `GET /tickets/:id/qr`: ticket retrieval and QR generation.
- `POST /tickets/:id/transfer`, `POST /tickets/:id/accept-transfer`: transfer flow.
- `POST /orders/:id/refund`: refund request with policy enforcement.
- `POST /events/:id/check-in`: scan ticket with idempotency.
- `POST /events`, `PATCH /events/:id`, `POST /events/:id/tiers`: organizer CRUD.
- `GET /events/:id/dashboard`: sales dashboard.
- `POST /reports`: event report.
- `GET /calendar/ics/:userId`: ICS feed.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Event reminders via push with configurable lead time; payload redacts venue precision.
- Purchase confirmations, refunds, transfer notifications delivered via push.
- Check-in scanner works offline with queued idempotent submissions; reconciles on reconnect.
- Tickets cached locally for offline display; QR rotates or includes anti-replay token.
- Payment callbacks (3DS, processor webhooks) reconciled server-side.
- Event capacity updates pushed to organizer dashboard in real-time.

## Permissions, Privacy, And Safety

- Payments compliance: PCI via processor tokens; never store raw PAN or CVV.
- 3DS where required; SCA for EU regions.
- Refund policy clear at purchase; processor refund reconciliation.
- Scam/fraud detection: duplicate events, unrealistic pricing, high-risk venues flagged.
- Organizer verification: identity/KYC for payout; AML checks where applicable.
- QR anti-copy: time-rotating token, device binding optional, revocation on refund/transfer.
- Location permission: coarse sufficient for discovery; precise only for venue map.
- Data minimization in analytics: no payment details, no ticket QR, no venue precise coords.
- Account deletion purges tickets (used state preserved for organizer records), payment methods, and messages.
- Minors: minimum age enforced; age-restricted events require verification.

## Analytics And Monetization

- Track privacy-safe events: signup, event viewed, tier selected, order started/completed, ticket transferred, refund requested/approved, check-in success, account deletion requested.
- No payment details, QR codes, or unbucketed amounts in analytics.
- Monetization: platform fees on paid tickets (disclosed); organizer-side premium plans for advanced tools with original plan names.
- Paywall only for organizer-premium; consumer UX is free for free events.
- Server-side webhook reconciliation for processor events, refunds, chargebacks, payouts.

## Edge Cases

- Double-scan at check-in; idempotent with duplicate-detected state.
- Refund after event started; policy enforcement, manual override path.
- Ticket transfer race (two transfers to different recipients); first-in-wins with clear error.
- Payment decline during checkout; retry with updated method.
- 3DS failure; re-initiate with user prompt.
- Chargeback received post-attendance; investigation queue.
- Event canceled by organizer; mass refund and attendee notification.
- Organizer account suspended; hold payouts pending review.
- Offline check-in then event canceled before sync; scanner reconciles.
- Account deletion with active tickets; prompt to transfer or refund first.

## Test Plan

- Unit tests for ticket state machine, capacity enforcement, refund policy, QR token rotation, check-in idempotency.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for purchase, transfer, refund, check-in online and offline.
- Payments tests: processor hand-off, 3DS, SCA, chargeback, payout reconciliation.
- Safety tests: scam-event detection, organizer KYC, ticket revocation on refund.
- Privacy tests: analytics redaction, data export, account deletion.
- Offline and realtime tests: queued check-ins, push payload redaction, capacity updates.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast, QR alternative for low-vision users.
- ICS tests: calendar export, time-zone handling, duplicate prevention.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, actual scanner hardware.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Eventbrite assets, private APIs, or trademarked feature names.
- Users can discover events, purchase tickets, transfer, refund, and check in with PCI-compliant payments.
- Organizer dashboards support event creation, sales, and check-in with offline support.
- QR anti-copy and ticket revocation covered by tests.
- Refund policy enforcement and processor reconciliation covered by tests.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which payments processor(s) and KYC vendor are used per region?
- What fee structure applies to paid tickets and how is it disclosed?
- Which QR anti-copy approach is used (rotating token vs. device binding)?
- What is the refund SLA and manual-override policy for canceled events?
- Will V1 support reserved-seating maps or only general admission?

## Build Plan

- Phase 1: auth, event discovery, event detail, free-ticket RSVP.
- Phase 2: paid ticket checkout with processor, tickets screen, QR generation.
- Phase 3: organizer dashboards, event creation, tier management, sales view.
- Phase 4: check-in scanner with offline queue, attendance tracking.
- Phase 5: refunds, transfers, chargeback handling, payouts.
- Phase 6: reminders, ICS, accessibility pass, safety tooling.
- Phase 7: organizer premium plans, manual native verification, regional compliance.

## Next Steps

- Replace discovery URLs with verified first-party URLs before implementation kickoff.
- Engage legal for payments, refund, and KYC posture.
- Confirm processor, KYC vendor, and scanner hardware compatibility.
