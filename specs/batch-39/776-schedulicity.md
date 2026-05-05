# Schedulicity-Style Clone Spec

> Metadata
> - Inspiration app: Schedulicity
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: fill/deal mechanics, payment processing, marketing tools, class vs appointment scheduling modes, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Schedulicity's public user-facing workflow. Schedulicity is a salon, spa, and fitness scheduling platform that differentiates through its "Fill" feature — last-minute deals that help businesses fill empty appointment slots at a discount, creating a win-win for both businesses (reduced idle time) and clients (discounted services). The platform supports both traditional appointment scheduling and class/group scheduling modes.

Schedulicity targets service businesses (hair salons, spas, fitness studios, wellness practitioners) with scheduling, payments, marketing, and the unique fill/deals marketplace that turns schedule gaps into revenue opportunities.

## Goals

- Deliver a mobile-first scheduling platform with dual-mode booking (appointments and classes), last-minute deals ("Fill"), marketing tools, and payment processing.
- Reproduce Schedulicity's functional model: scheduling + deals marketplace that incentivizes filling schedule gaps.
- Support both appointment-based businesses (salons, spas) and class-based businesses (fitness studios, yoga) in one platform.
- Define complete data model, API contracts, and test plan for implementation-ready V1.

## Non-Goals

- Do not copy Schedulicity branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not implement real payment processing without PCI compliance review.
- Do not replicate Schedulicity's exact deal pricing or algorithm.
- Do not claim exact native behavior until hands-on verification.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/schedulicity/id459498519 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.schedulicity.app | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.schedulicity.com/ | Product features, pricing, fill feature | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.schedulicity.com/privacy-policy | Data practices, retention, sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.schedulicity.com/terms-of-service | Usage terms, liability, disputes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Dual scheduling modes**: Appointment mode (one-on-one services: haircut, massage, facial) and class mode (group sessions: yoga class, fitness bootcamp, meditation circle). Businesses can operate in one or both modes.
- **Fill (last-minute deals)**: When a business has empty appointment slots within the next 24-72 hours, they can create a "Fill" — a discounted offer for that specific time. Clients browsing the marketplace see available fills sorted by proximity, discount, and time.
- **Consumer marketplace**: Browse local businesses and available fills by category, location, service type, and timing. Fills highlighted prominently as limited-time opportunities.
- **Appointment booking**: Select business, service, staff, date/time, confirm with payment method. Standard booking flow for non-deal appointments.
- **Class booking**: Browse class schedule, view capacity/spots remaining, book spot, join waitlist if full. Support recurring class enrollment.
- **Business calendar**: Unified view of appointments and classes, staff schedules, and fill opportunities (highlighted gaps). Drag-to-reschedule, block time, recurring patterns.
- **Marketing tools**: Email campaigns, automated reminders, deal announcements, client re-engagement messages, and fill notifications to interested clients.
- **Payment processing**: Collect payment at time of service, prepayment for classes, and deal redemption. Support tips, packages, and gift certificates.
- **Client management**: Client database with visit history, preferences, communication log, and deal redemption history.
- **Reporting**: Revenue by source (full-price vs fill/deal), class attendance rates, fill conversion metrics, staff utilization.

## Core User Journeys

- **Client books regular appointment**: Opens app, finds favorite salon, selects "Highlights" service, picks next Wednesday 10am, confirms booking, receives reminder.
- **Client claims a Fill deal**: Opens app, browses "Deals Near Me," sees "50% off Men's Haircut today 3pm" at nearby barbershop, claims deal, books the slot, pays discounted rate at appointment.
- **Client books a class**: Opens app, searches yoga studios, finds "Power Vinyasa 6pm Tuesday" with 3 spots left, books spot, adds to calendar.
- **Business creates a Fill**: Notices empty 2pm slot tomorrow, creates a Fill offer "30% off any color service," sets 24h expiration, publishes to marketplace, monitors claims.
- **Business manages class schedule**: Creates weekly "Spin Class" recurring session, sets capacity at 20, enables waitlist, publishes schedule, views enrollment numbers.
- **Fill conversion flow**: Client receives push "New deal near you: 40% off facial," taps notification, views deal details, claims and books, attends appointment, pays discounted rate.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Home/Deals Feed | Consumer marketplace with fills highlighted | location, category filter, browse deals | deals available, no deals, loading | location denied, offline, empty area |
| Business Profile | Service menu, schedule, and deals | browse services, view classes, tap book | full profile, has active deals, class schedule | business closed, stale data |
| Appointment Booking | Service/staff/time selection | select service, staff, time, confirm | available, limited, deal-applied | slot taken, deal expired during booking |
| Class Schedule | Group session listing and booking | browse times, view capacity, book spot | spots available, waitlist, full | class cancelled, schedule changed |
| Deal Detail | Fill offer details and claim action | view discount, terms, claim, book | active deal, expiring soon, claimed by others | deal expired, sold out |
| My Bookings | Upcoming appointments and classes | view, cancel, reschedule | appointments + classes, empty | cancelled by business |
| Business Calendar | Unified appointment + class view | manage slots, create fill, view bookings | mixed appointments/classes, gaps highlighted | conflict, offline |
| Create Fill | Business creates last-minute deal | set service, discount, expiry, publish | gap identified, manual creation | no eligible gaps, already have active fill |
| Class Management | Create/manage group class sessions | set capacity, schedule, recurring, waitlist | active classes, draft, paused | enrollment conflicts |
| Marketing | Campaign and deal notification tools | create campaign, target audience, schedule | active campaigns, none, results | delivery failures |
| Reports | Revenue, fill performance, utilization | date range, filter by source, compare | data available, new business | calculation delays |
| Client List | CRM with deal redemption history | search, filter, view history | populated, empty, deal-redeemed clients | offline |
| Payments | Transaction history and processing | view history, process payment, tips | successful, pending, failed | declined, timeout |
| Settings | Business profile, scheduling preferences | edit profile, set modes, payment setup | complete, appointment-only, class-only, both | setup incomplete |

## Data Model

- `Business`: id, owner_id, name, type, address, coordinates, scheduling_mode (appointments/classes/both), rating_avg, review_count, timezone, status, created_at.
- `User`: id, email, phone, name, role (client/owner/staff), avatar_url, location, deal_notifications_enabled, status.
- `Staff`: id, user_id, business_id, display_name, services (service_ids), availability, commission_rate, status.
- `Service`: id, business_id, name, category, duration_minutes, price_cents, is_fillable (eligible for deals), is_active.
- `ClassDefinition`: id, business_id, name, description, category, duration_minutes, capacity, price_cents, instructor_id, is_recurring, recurrence_pattern.
- `ClassSession`: id, class_definition_id, instructor_id, start_time, end_time, capacity, spots_remaining, status (scheduled/in_progress/completed/cancelled).
- `Appointment`: id, business_id, staff_id, client_id, service_id, start_time, end_time, status (booked/confirmed/completed/cancelled/no_show), fill_id (nullable — if booked via deal), source.
- `Fill`: id, business_id, service_id, staff_id, original_price_cents, discount_percent, deal_price_cents, available_slot_start, available_slot_end, expiry_time, max_claims, claims_count, status (active/claimed/expired/cancelled), created_at.
- `FillClaim`: id, fill_id, client_id, appointment_id, claimed_at, status (claimed/redeemed/expired/cancelled).
- `ClassBooking`: id, class_session_id, client_id, status (booked/attended/cancelled/no_show/waitlisted), waitlist_position, booked_at.
- `Payment`: id, business_id, client_id, appointment_id, class_booking_id, amount_cents, tip_cents, discount_cents, source (full_price/fill_deal/class), method, status, processed_at.
- `Campaign`: id, business_id, type (email/sms/push), trigger (manual/fill_available/class_reminder/re_engagement), audience_filter, content, status, sent_count.
- `Client`: id, business_id, user_id, name, email, phone, notes, total_visits, total_spent_cents, fills_redeemed_count, last_visit_at.
- `GiftCertificate`: id, business_id, purchaser_id, recipient_email, amount_cents, balance_cents, code, status, expires_at.
- `AuditEvent`: id, actor_id, action, resource_type, resource_id, metadata, created_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup`, `POST /auth/recover`.
- Marketplace: `GET /marketplace/businesses?lat&lng&category&mode`, `GET /marketplace/fills?lat&lng&radius&category&available_within_hours`.
- Businesses: `GET /businesses/:id/profile`, `GET /businesses/:id/services`, `GET /businesses/:id/classes`.
- Availability: `GET /businesses/:id/availability?service_id&staff_id&date_range`.
- Appointments: `POST /businesses/:id/appointments`, `PUT /appointments/:id`, `POST /appointments/:id/complete`.
- Classes: `GET /businesses/:id/class-schedule?date_range`, `POST /class-sessions/:id/book`, `POST /class-sessions/:id/waitlist`, `DELETE /class-bookings/:id`.
- Fills: `GET /businesses/:id/fills`, `POST /businesses/:id/fills`, `PUT /fills/:id`, `POST /fills/:id/claim`.
- Payments: `POST /appointments/:id/payment`, `POST /class-bookings/:id/payment`.
- Marketing: `POST /businesses/:id/campaigns`, `GET /businesses/:id/campaigns`.
- Clients: `GET /businesses/:id/clients`, `PUT /clients/:id`.
- Reports: `GET /businesses/:id/reports/revenue?period&source`, `GET /businesses/:id/reports/fills?period`, `GET /businesses/:id/reports/classes?period`.
- Gift certificates: `POST /businesses/:id/gift-certificates`, `POST /gift-certificates/:code/redeem`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache business calendar, client list, and active fills offline.
- Client: cache upcoming bookings and favorite businesses; booking and deal claims require connectivity.
- Push: new fill available near you (configurable radius/categories), booking confirmation, class reminder, appointment reminder, fill expiring soon, class almost full.
- Realtime: fill claim count updates (showing "2 left" accuracy), class spots_remaining updates.
- Background: check for new fills in user's area; send fill expiry warnings; process scheduled campaigns.
- Offline: view schedule, client info; block all transactional actions (booking, claiming, payments).

## Permissions, Privacy, And Safety

- **Deal fairness**: Fills are first-come-first-served with transparent claim counts; no favoritism in ordering beyond proximity.
- **Client data**: Business-scoped; not shared between businesses; fill redemption history private to the business.
- **Staff permissions**: Configurable — view own schedule, create fills, manage clients, process payments.
- **Marketing consent**: Deal notifications require opt-in; clients choose categories/distance for fill alerts.
- **Class safety**: Capacity enforcement strict; no overbooking beyond waitlist; fire code compliance for physical venues.
- **Payment data**: Tokenized; PCI compliant; never logged.
- Location for fill proximity; notifications for deal alerts and reminders; camera for business photos.

## Analytics And Monetization

- Discovery events: `marketplace_viewed`, `fills_browsed`, `fill_detail_viewed`, `class_schedule_viewed`.
- Booking events: `appointment_booked`, `class_booked`, `fill_claimed`, `fill_redeemed`, `waitlist_joined`.
- Fill events: `fill_created`, `fill_claimed`, `fill_expired_unclaimed`, `fill_conversion_rate`.
- Revenue events: `payment_processed`, `payment_source_breakdown` (full_price vs fill vs class).
- Monetization: business subscription for scheduling features; additional fees or premium tier for marketing/fill features; payment processing percentage. Do not copy exact pricing.

## Edge Cases

- Fill claimed but client doesn't book the slot — fill reverts to available after configurable window (e.g., 30 minutes).
- Fill slot already booked by non-deal client while deal was live — expire deal immediately, notify claiming clients.
- Class overenrolled due to race condition — enforce server-side capacity check; last booker gets waitlisted with explanation.
- Multiple fills for same time slot — prevent overlapping deals for same staff/time.
- Business creates fill then goes offline — fill remains active in marketplace; business must manage from any connected device.
- Client claims fill then tries to upgrade to additional services — pay difference at full price for additions.
- Fill discount results in below-cost service — enforce minimum price threshold; warn business at creation.
- Class instructor sick, session cancelled — auto-notify all booked attendees, offer rebooking for next session.
- Gift certificate applied to fill-priced service — certificate deducts the deal price, not original price.

## Test Plan

- Unit tests: fill pricing calculation, class capacity enforcement, deal expiry logic, dual-mode calendar conflict detection, gift certificate balance deduction.
- Integration tests: fill creation-to-redemption flow, class booking with waitlist promotion, appointment booking-to-payment, marketing campaign delivery.
- Contract tests: fill availability API accuracy, class capacity endpoint consistency, payment processing with deal-price verification.
- Offline tests: cached calendar and fill list display, all transactional actions blocked, sync on reconnect.
- Permission tests: staff fill creation rights, client data scoping, marketing consent enforcement.
- Safety tests: capacity enforcement for classes, fill fairness (no gaming), deal minimum price validation.
- Accessibility tests: fill browsing via assistive tech, class booking accessible, calendar navigation via VoiceOver.
- Billing tests: full-price vs deal-price revenue tracking, subscription features, gift certificate balance accuracy.

## Acceptance Criteria

- Businesses can create fills (last-minute deals) for empty slots and publish them to the marketplace instantly.
- Clients can browse nearby fills, claim them, and book the discounted slot in a single flow.
- Platform supports both appointment (1:1) and class (group) scheduling modes, usable independently or together.
- Fill metrics (conversion rate, revenue recovered) are visible to business in reports.
- Class capacity is strictly enforced with functional waitlist and automatic promotion.
- Marketing tools allow targeted outreach based on service history, fill preferences, and location.
- At least 12 acceptance tests cover: appointment booking, class booking, fill creation, fill claiming, dual-mode calendar, waitlist, marketing, payments, gift certificates, fill expiry, offline behavior, and accessibility.

## Open Questions

- What is the exact fill expiry window and claim-to-book conversion time limit?
- How does Schedulicity handle businesses that abuse fill pricing (always discounted, never full price)?
- Are fills visible to all marketplace users or only those who opted into deal notifications?
- What percentage of Schedulicity revenue comes from fill-related transactions vs. subscriptions?

## Build Plan

- Phase 1: Verify URLs, document features including fill mechanics from public website.
- Phase 2: Build consumer marketplace with fills feed and standard business discovery.
- Phase 3: Implement appointment booking flow (standard and deal-applied).
- Phase 4: Build class scheduling mode with capacity, waitlist, and enrollment.
- Phase 5: Implement Fill system — creation, marketplace listing, claiming, redemption, expiry.
- Phase 6: Add payment processing, gift certificates, and revenue tracking by source.
- Phase 7: Build marketing tools and deal notification system.
- Phase 8: Implement reporting with fill performance metrics and revenue breakdown.
- Phase 9: Add offline support, accessibility, and comprehensive test suite.
- Phase 10: Conduct hands-on verification and resolve blockers.

## Next Steps

- Create a Schedulicity account to document fill mechanics and dual scheduling modes.
- Research fill timing, discount limits, and claim behavior from help center.
- Design original UI for the deals/fill marketplace and dual-mode calendar.
- Extend downstream repo-seeding manifest after spec confirmed implementation-ready.
