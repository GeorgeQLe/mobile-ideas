# Vagaro-Style Clone Spec

> Metadata
> - Inspiration app: Vagaro
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: payment processing, payroll integration, membership billing cycles, live streaming, marketplace listings, loyalty programs, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Vagaro's public user-facing workflow. Vagaro is a comprehensive salon, spa, and fitness business management platform that combines appointment booking, point-of-sale, payroll, marketing, memberships, packages, gift cards, live streaming for classes, and a consumer marketplace for discovering local beauty/wellness providers.

The platform serves two audiences: business owners/staff (manage scheduling, clients, inventory, payroll, marketing) and consumers (discover providers, book appointments, purchase memberships, attend virtual classes).

## Goals

- Deliver a mobile-first salon/spa/fitness platform with business management, consumer booking marketplace, membership/package sales, and marketing automation.
- Reproduce the functional job behind Vagaro: all-in-one business management for beauty/wellness with consumer discovery and booking.
- Support dual-perspective: business owner/staff app (manage everything) and consumer app (discover, book, buy, attend).
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Vagaro branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, or protected media.
- Do not implement real payroll processing, tax filing, or W-2/1099 generation without separate legal review.
- Do not implement real payment processing without PCI compliance review.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/vagaro/id523498646 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.vagaro.android | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.vagaro.com/ | Product features, pricing, integrations | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.vagaro.com/privacypolicy | Data collection, sharing, retention | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.vagaro.com/termsandconditions | Usage terms, liability, disputes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Consumer marketplace**: Browse local salons/spas/fitness studios by location, service type, ratings, and availability. View business profiles with photos, services, pricing, staff bios, and reviews.
- **Appointment booking**: Select business, service, staff preference, date/time. Add multiple services in one visit. Pay deposit or full payment at booking. Receive confirmation and reminders.
- **Business dashboard**: Overview of today's appointments, revenue, new clients, upcoming availability gaps. Quick actions for walk-ins, block time, and message clients.
- **Calendar management**: Multi-staff calendar with day/week views, drag-to-reschedule, color coding by service or staff, and recurring appointments.
- **Client management**: Full CRM with visit history, preferences, formulas/notes (e.g., hair color formulas), photos (before/after), payment history, and communication log.
- **Memberships and packages**: Create membership plans (monthly unlimited yoga, 10-pack of facials), auto-billing, usage tracking, freeze/cancel options, and package expiration.
- **POS and checkout**: Process payments for services, products, tips, memberships, and gift cards. Split payments, apply discounts, track inventory.
- **Payroll**: Track staff hours, commissions, tips, and generate payroll summaries. (Simulated — actual tax filing blocked.)
- **Marketing**: Automated email/SMS campaigns for birthdays, re-engagement, promotions. Deal/offer creation with tracking.
- **Live streaming**: Business can stream fitness/wellness classes; members can join live or watch recordings. (Video infrastructure blocked for V1 — design the UX shell.)
- **Loyalty program**: Points earned per visit/dollar spent, redeemable for services or products.
- **Gift cards**: Digital gift cards purchasable by consumers, redeemable at checkout.
- **Reviews and ratings**: Consumers leave reviews after appointments; businesses can respond; moderation for inappropriate content.

## Core User Journeys

- **Consumer discovers and books**: Opens app, browses nearby salons, filters by service (haircut, massage), views business profile and reviews, selects service/staff/time, pays deposit, receives confirmation.
- **Business owner sets up**: Creates business profile, adds services with pricing/duration, invites staff, sets availability, uploads portfolio photos, publishes to marketplace.
- **Staff manages day**: Views personal schedule, checks in clients, adds notes/formulas after service, processes payment, views tips earned.
- **Membership purchase**: Consumer browses membership options at favorite studio, purchases monthly plan, auto-billed each cycle, uses membership to book included classes.
- **Marketing campaign**: Business owner creates birthday email campaign, sets template, system auto-sends to clients on their birthday with a discount offer, tracks redemption.
- **Live class (future)**: Instructor starts live stream, members receive notification, join stream, class recorded for on-demand viewing.
- **Walk-in flow**: Client arrives without appointment, receptionist adds walk-in to schedule, assigns available staff, processes service and payment.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Marketplace/Explore | Consumer discovery of local businesses | location, search, filters, category | results loaded, empty area, loading | location denied, no results, offline |
| Business Profile | View business details, services, reviews | scroll, tap service, tap book | full profile, minimal profile, closed business | business deactivated, stale data |
| Booking Flow | Service/staff/time selection and payment | service picker, staff, date/time, payment | slots available, no availability, waitlist | double-booking, payment failure, policy violation |
| Consumer Dashboard | Upcoming appointments, memberships, favorites | tap appointment, manage membership | has bookings, empty, membership active | expired membership, past-due payment |
| Business Dashboard | Today's overview, revenue, quick actions | tap stats, add walk-in, view calendar | busy day, empty day, alerts | sync error, stale revenue data |
| Calendar | Multi-staff appointment view | tap slot, drag reschedule, toggle staff | booked, available, blocked time | conflict, offline cached |
| Client List/Detail | CRM search and individual profiles | search, filter, edit, add note | populated, empty, recent | offline, sync conflict |
| Checkout/POS | Payment processing for services/products | select items, payment method, tip | card, cash, split, gift card, membership | declined, timeout, partial |
| Memberships | Create/manage/purchase membership plans | select plan, billing info, freeze/cancel | active, frozen, cancelled, expired | billing failure, usage exceeded |
| Marketing | Campaign creation and automation | template, audience, schedule, send | draft, scheduled, sent, completed | delivery failures, unsubscribes |
| Payroll | Staff hours, commissions, tips summary | date range, staff filter, export | data available, pending period | calculation discrepancy |
| Gift Cards | Purchase, send, redeem digital gift cards | amount, recipient, message | purchased, sent, partially redeemed, expired | delivery failure, balance dispute |
| Reviews | Leave/read/respond to reviews | star rating, text, photos | published, pending moderation, responded | inappropriate content flagged |
| Settings | Business and account configuration | toggle features, edit profile, integrations | complete, incomplete, subscription limits | auth expired, feature locked |

## Data Model

- `Business`: id, owner_id, name, type (salon/spa/fitness/other), address, coordinates, phone, email, description, photos, rating_avg, review_count, subscription_tier, is_marketplace_visible, timezone, created_at.
- `User`: id, email, phone, name, role (consumer/owner/staff), avatar_url, status, created_at.
- `Staff`: id, user_id, business_id, display_name, title, bio, photo_url, services (service_ids), commission_type (percentage/flat/hourly), commission_rate, status.
- `Service`: id, business_id, name, description, category, duration_minutes, price_cents, is_addon, requires_deposit, deposit_cents.
- `Appointment`: id, business_id, client_id, staff_id, services (array), start_time, end_time, status (booked/confirmed/arrived/in_progress/completed/no_show/cancelled), source, notes, recurring_id.
- `Client`: id, business_id, user_id, name, email, phone, notes, formulas, tags, photos, loyalty_points, lifetime_value_cents, last_visit_at.
- `Membership`: id, business_id, name, description, price_cents, billing_cycle (monthly/annual), included_services, usage_limit, is_active.
- `ClientMembership`: id, client_id, membership_id, status (active/frozen/cancelled/expired), billing_day, next_billing_at, usage_this_cycle, freeze_until.
- `Package`: id, business_id, name, services_included, total_sessions, price_cents, expiry_days.
- `ClientPackage`: id, client_id, package_id, sessions_remaining, purchased_at, expires_at.
- `Payment`: id, business_id, client_id, appointment_id, amount_cents, tip_cents, discount_cents, method, status, line_items (jsonb).
- `GiftCard`: id, business_id, purchaser_id, recipient_email, amount_cents, balance_cents, code, status, expires_at.
- `Review`: id, business_id, client_id, appointment_id, rating, text, photos, response_text, status (published/pending/removed), created_at.
- `Campaign`: id, business_id, type (email/sms), trigger (manual/birthday/re_engagement/promotion), template, audience_filter, status, sent_count, open_count, redemption_count.
- `LoyaltyProgram`: id, business_id, points_per_dollar, points_per_visit, redemption_rules (jsonb).
- `PayrollRecord`: id, business_id, staff_id, period_start, period_end, hours_worked, commission_earned_cents, tips_cents, total_cents, status.
- `AuditEvent`: id, actor_id, action, resource_type, resource_id, metadata, created_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup`, `POST /auth/recover`, `POST /auth/staff-invite/accept`.
- Marketplace: `GET /marketplace/businesses?lat&lng&radius&category&service_type&rating_min`, `GET /businesses/:id/profile` (public).
- Services: `GET /businesses/:id/services`, `POST /businesses/:id/services`, `PUT /services/:id`.
- Availability: `GET /businesses/:id/availability?service_ids&staff_id&date_range` (public slot query).
- Appointments: `GET /businesses/:id/appointments`, `POST /businesses/:id/appointments`, `PUT /appointments/:id/status`, `POST /appointments/:id/check-in`.
- Clients: `GET /businesses/:id/clients`, `POST /businesses/:id/clients`, `PUT /clients/:id`, `GET /clients/:id/history`.
- Memberships: `GET /businesses/:id/memberships`, `POST /businesses/:id/memberships`, `POST /memberships/:id/subscribe`, `PUT /client-memberships/:id` (freeze/cancel).
- Payments: `POST /appointments/:id/checkout`, `POST /gift-cards/purchase`, `POST /gift-cards/:code/redeem`.
- Reviews: `GET /businesses/:id/reviews`, `POST /appointments/:id/review`, `PUT /reviews/:id/respond`.
- Marketing: `GET /businesses/:id/campaigns`, `POST /businesses/:id/campaigns`, `PUT /campaigns/:id`, `POST /campaigns/:id/send`.
- Payroll: `GET /businesses/:id/payroll?period`, `POST /businesses/:id/payroll/finalize`.
- Loyalty: `GET /businesses/:id/loyalty`, `PUT /businesses/:id/loyalty`, `POST /clients/:id/loyalty/redeem`.
- Reports: `GET /businesses/:id/reports/revenue`, `GET /businesses/:id/reports/clients`, `GET /businesses/:id/reports/staff`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache business dashboard, today's appointments, client list, and service catalog offline.
- Queue walk-in additions and appointment status changes; block payment processing offline.
- Push: new booking notification, appointment reminder, membership billing success/failure, review received, marketing campaign results.
- Realtime calendar updates for multi-staff businesses via WebSocket.
- Marketplace search requires connectivity; show cached favorites/recent businesses offline.
- Live streaming (future) requires persistent connection; offline viewing of recorded classes.

## Permissions, Privacy, And Safety

- **Client formulas/notes**: Sensitive professional data (hair color formulas, skin conditions); access restricted to assigned staff and owner; excluded from exports unless explicitly requested.
- **Payment data**: PCI compliance; tokenized storage only; never log card details.
- **Reviews**: Moderation required; cannot edit client reviews; business can respond publicly; flagging for inappropriate content.
- **Marketplace visibility**: Business controls what appears publicly; client list, revenue, and internal notes never exposed.
- **Staff permissions**: Configurable per role (view own schedule only, manage all clients, access reports, process payments).
- **Consumer privacy**: Booking history visible only to the business booked with; not shared across businesses.
- Request location for marketplace proximity; camera for portfolio/before-after photos; contacts for client import.

## Analytics And Monetization

- Business events: `business_created`, `service_added`, `staff_invited`, `first_booking_received`, `marketplace_listing_published`.
- Booking events: `appointment_booked`, `appointment_completed`, `appointment_cancelled`, `walk_in_added`, `waitlist_joined`.
- Revenue events: `payment_processed`, `membership_sold`, `gift_card_purchased`, `package_sold`.
- Marketing events: `campaign_sent`, `campaign_opened`, `offer_redeemed`.
- Monetization: subscription tiers for businesses (basic scheduling, premium with marketing/payroll/marketplace). Consumer app is free. Do not copy Vagaro's exact tier names or pricing.

## Edge Cases

- Consumer books at business that then deactivates — refund deposit, notify consumer, suggest alternatives.
- Membership auto-billing fails — grace period, retry, freeze if unresolved, notify client and business.
- Staff leaves business with future appointments — require reassignment or cancellation before removal.
- Review posted for wrong appointment — moderation queue, business can flag, support adjudicates.
- Gift card redeemed at business that doesn't honor it — gift cards scoped to issuing business only.
- Concurrent booking attempts for last slot — optimistic lock, first confirmed wins, second gets waitlist offer.
- Payroll dispute — staff can flag discrepancy, owner reviews and adjusts before finalization.
- Marketplace search in area with no businesses — suggest expanding radius, show popular categories.
- Live stream drops mid-class — auto-reconnect, recording continues, attendees notified of pause.

## Test Plan

- Unit tests: availability slot generation, membership billing cycle calculation, loyalty point accumulation, commission calculation, timezone handling.
- Integration tests: full booking flow (discover -> book -> remind -> arrive -> checkout -> review), membership lifecycle, gift card purchase-to-redemption.
- Contract tests: marketplace API returns consistent shapes, availability never returns conflicting slots, payment endpoints enforce idempotency.
- Offline tests: cached dashboard renders, queued status changes sync correctly, payment blocked offline.
- Permission tests: staff role boundaries, consumer data isolation between businesses, marketplace visibility controls.
- Safety tests: review moderation flow, inappropriate content flagging, payment dispute handling.
- Accessibility tests: marketplace browsable via VoiceOver, booking completable with assistive technology.
- Billing tests: subscription tier changes, membership auto-billing, gift card balance tracking.

## Acceptance Criteria

- Consumer can discover local businesses, view profiles/reviews, book appointments, and manage memberships from a single app.
- Business owner can manage calendar, staff, clients, payments, marketing, and payroll from the business app.
- Membership auto-billing, gift card redemption, and loyalty points function correctly across billing cycles.
- Marketplace search returns relevant results by location, category, and availability.
- Multi-staff calendar displays accurate availability and prevents double-booking.
- Offline mode shows cached data; payment and billing are blocked until online.
- At least 12 acceptance tests cover: marketplace discovery, booking flow, membership lifecycle, payment processing, staff management, marketing campaigns, reviews, gift cards, loyalty, offline behavior, accessibility, and data export.

## Open Questions

- What is the exact tier structure for Vagaro's business subscriptions (features per tier)?
- How does Vagaro's live streaming infrastructure work (proprietary vs. third-party)?
- What payroll integrations are supported and what requires manual export?
- How does the marketplace ranking algorithm work (proximity, reviews, response time)?

## Build Plan

- Phase 1: Verify URLs, document public feature set from marketplace listings and help center.
- Phase 2: Build consumer marketplace discovery, business profiles, and booking flow.
- Phase 3: Implement business dashboard, calendar management, and staff scheduling.
- Phase 4: Add client CRM, appointment workflow (check-in through checkout), and payment simulation.
- Phase 5: Build memberships, packages, gift cards, and loyalty programs.
- Phase 6: Implement marketing automation, reviews system, and payroll summaries.
- Phase 7: Add offline support, real-time updates, accessibility, and regression tests.
- Phase 8: Design live streaming UX shell (actual streaming infrastructure deferred).
- Phase 9: Conduct lawful hands-on verification and resolve manual blockers.

## Next Steps

- Conduct hands-on verification with a Vagaro consumer account to document marketplace and booking UX.
- Research Vagaro's business subscription tiers from public pricing page.
- Design original UI for marketplace discovery and business management dashboard.
- Extend downstream repo-seeding manifest after this spec is confirmed implementation-ready.
