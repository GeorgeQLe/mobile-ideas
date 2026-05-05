# Fresha-Style Clone Spec

> Metadata
> - Inspiration app: Fresha
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: payment processing at checkout only model, inventory management, marketing automation, partner onboarding, product sales integration, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Fresha's public user-facing workflow. Fresha is a beauty and wellness booking platform that is free for businesses (no subscription fees) and monetizes through payment processing at checkout. The platform provides appointment scheduling, POS, client management, inventory tracking, marketing automation, team management, and a consumer marketplace — all without monthly software fees to the business.

Fresha's differentiator is the business model: businesses pay nothing for the software itself; Fresha earns revenue from payment processing fees and optional paid marketing features (boost visibility, new client acquisition). This makes it attractive to small/independent beauty professionals.

## Goals

- Deliver a mobile-first beauty/wellness booking platform with zero-subscription business tools and consumer marketplace discovery.
- Reproduce Fresha's functional model: free business management software monetized through payment processing and optional marketing.
- Support both perspectives: business (schedule, clients, inventory, payments, marketing) and consumer (discover, book, pay, review).
- Define complete data model, API contracts, and test plan for implementation-ready V1.

## Non-Goals

- Do not copy Fresha branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not implement real payment processing without PCI compliance review.
- Do not replicate Fresha's exact commission/fee structure.
- Do not claim exact native behavior until hands-on verification.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/fresha-book-beauty-wellness/id1085237498 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.fresha.consumer | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.fresha.com/ | Product features, business signup, marketplace | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.fresha.com/privacy | Data practices, retention, sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.fresha.com/terms | Usage terms, payment terms, liability | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Consumer marketplace**: Browse local beauty/wellness venues by category (hair, nails, skin, massage, barbering, lashes, brows, body treatments), location, rating, availability, and price range.
- **Venue profile**: Photos, services with pricing, team member specialties, opening hours, reviews, location map, and instant booking availability.
- **Booking flow**: Select service(s), choose team member or "any available," pick date/time from live availability, add card for guaranteed booking, confirm. Multi-service bookings calculated for total duration.
- **Consumer account**: Upcoming and past appointments, favorite venues, saved payment methods, notifications preferences, and booking history.
- **Business scheduling (free)**: Full calendar management with drag-drop, multi-staff views, appointment details, and automated reminders — all without subscription fees.
- **Client management (free)**: Client database with contact info, visit history, preferences, notes, product purchases, and automated recall reminders.
- **POS and payments**: Process payments at checkout — card, cash, voucher, package. The platform earns from card processing fees (business pays per transaction, not monthly).
- **Inventory management**: Track product stock levels, set reorder alerts, link product sales to appointments, and manage suppliers.
- **Marketing (paid optional)**: Boost listing visibility in marketplace, send blast campaigns, create last-minute deals, automated no-show/recall messaging.
- **Team management**: Add staff with individual schedules, permission levels, commission tracking, and performance metrics.
- **Online store**: Sell products, gift vouchers, and packages through the booking page.
- **Automated communications**: Booking confirmations, reminders, thank-you messages, review requests — all included free.

## Core User Journeys

- **Consumer discovers venue**: Opens app, allows location, browses "Hair Salons Near Me," filters by rating and availability today, views venue profile, selects "Balayage" service, picks stylist, books 3pm slot, adds card, confirmed.
- **Consumer manages booking**: Views upcoming appointments, needs to reschedule, opens booking, selects new time from available slots, confirms change, old slot freed.
- **Business onboards (free)**: Downloads business app, creates account, adds venue name/location/photos, sets up services with pricing/duration, adds team members, sets opening hours, publishes to marketplace — pays nothing.
- **Staff manages appointments**: Opens calendar, sees day's appointments, taps appointment to view client details/notes, marks as arrived, performs service, processes checkout payment.
- **Business processes sale**: After appointment, staff opens checkout, adds services rendered plus product purchased, applies discount code, client pays by card, tip added, receipt sent.
- **Marketing boost**: Business owner notices slow Tuesday afternoons, creates a "20% off Tuesdays" deal, pays to boost in marketplace results, tracks new bookings from the promotion.
- **Inventory alert**: Product stock drops below threshold, business receives alert, reviews supplier list, places reorder (external to platform), updates stock count.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Explore/Home | Consumer marketplace discovery | location, category, search, filters | results populated, loading, first-time | location denied, no venues nearby, offline |
| Venue Profile | Business details and booking entry | scroll, select service, tap book | full profile, new venue, temporarily closed | venue deactivated, stale hours |
| Booking Flow | Service/staff/time selection and confirm | service select, staff, date/time, card | available, limited slots, multi-service | slot taken during selection, card declined |
| My Bookings | Consumer upcoming and past appointments | view, cancel, reschedule, rebook | has bookings, empty, past only | cancelled by venue |
| Business Calendar | Staff schedule management | tap slot, drag move, add appointment | busy day, empty, blocked time | conflict, offline cached |
| Client Detail | Individual client CRM view | view history, add note, view purchases | active, new client, archived | sync conflict |
| Checkout/POS | Process service and product payment | add items, select payment, tip | card, cash, voucher, mixed | declined, timeout |
| Inventory | Product stock management | search, update count, set alert | stocked, low stock, out of stock | count discrepancy |
| Marketing | Campaign and boost creation | select type, set budget, choose audience | active campaigns, none, results | budget exhausted, low engagement |
| Team | Staff list, schedules, permissions | add member, set hours, assign services | active staff, pending, deactivated | permission conflict |
| Online Store | Products and vouchers for sale | browse, purchase, send gift | stocked, sold out | payment failure |
| Reports | Revenue, booking, staff analytics | date range, filter, export | data available, new business (empty) | calculation delay |
| Settings | Venue profile, notifications, payments | edit fields, toggle features | complete, incomplete setup | payment setup incomplete |

## Data Model

- `Venue`: id, owner_id, name, slug, category, address, coordinates, phone, email, description, photos, rating_avg, review_count, timezone, opening_hours (jsonb), is_marketplace_visible, payment_setup_complete, created_at.
- `User`: id, email, phone, name, role (consumer/owner/staff), avatar_url, status, created_at.
- `TeamMember`: id, user_id, venue_id, display_name, title, photo_url, services (service_ids), commission_type, commission_rate, permissions (jsonb), status.
- `Service`: id, venue_id, name, category, duration_minutes, price_cents, currency, is_addon, processing_time_minutes, description, is_active.
- `ServiceCategory`: id, venue_id, name, sort_order, services.
- `Appointment`: id, venue_id, client_id, team_member_id, services (array with individual durations), start_time, end_time, status (booked/confirmed/arrived/completed/cancelled/no_show), source (marketplace/direct/walk_in), notes, created_at.
- `Client`: id, venue_id, user_id, name, email, phone, notes, tags, last_visit_at, total_visits, total_spent_cents, preferred_team_member_id.
- `Availability`: id, team_member_id, day_of_week, start_time, end_time, is_recurring, override_date, type (working/break/blocked).
- `Payment`: id, venue_id, appointment_id, client_id, line_items (jsonb), subtotal_cents, discount_cents, tip_cents, total_cents, method (card/cash/voucher/mixed), processing_fee_cents, status, processed_at.
- `Product`: id, venue_id, name, brand, sku, price_cents, cost_cents, stock_quantity, reorder_threshold, supplier_id, is_active.
- `InventoryMovement`: id, product_id, quantity_change, reason (sale/restock/adjustment/loss), reference_id, created_at.
- `Voucher`: id, venue_id, name, type (gift/package), value_cents_or_sessions, price_cents, valid_days, is_active.
- `ClientVoucher`: id, client_id, voucher_id, code, balance_remaining, purchased_at, expires_at, status.
- `Campaign`: id, venue_id, type (blast/deal/boost/automated), name, audience_filter, content, budget_cents, status, sent_at, metrics (jsonb).
- `Review`: id, venue_id, client_id, appointment_id, rating, text, response_text, status, created_at.
- `Reminder`: id, appointment_id, type (confirmation/reminder/thank_you/review_request), channel, scheduled_at, sent_at, status.
- `AuditEvent`: id, actor_id, action, resource_type, resource_id, metadata, created_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup` (consumer or business), `POST /auth/recover`, `POST /auth/team-invite/accept`.
- Marketplace: `GET /marketplace/venues?lat&lng&radius&category&rating_min&available_today`, `GET /venues/:id/profile` (public).
- Services: `GET /venues/:id/services`, `POST /venues/:id/services`, `PUT /services/:id`.
- Availability: `GET /venues/:id/availability?service_ids&team_member_id&date` (public slot query).
- Appointments: `POST /venues/:id/appointments`, `GET /venues/:id/appointments?date&team_member_id`, `PUT /appointments/:id`, `POST /appointments/:id/arrive`, `POST /appointments/:id/complete`.
- Clients: `GET /venues/:id/clients`, `POST /venues/:id/clients`, `PUT /clients/:id`, `GET /clients/:id/history`.
- Payments: `POST /appointments/:id/checkout`, `GET /venues/:id/payments?date_range`.
- Products: `GET /venues/:id/products`, `POST /venues/:id/products`, `PUT /products/:id/stock`.
- Vouchers: `GET /venues/:id/vouchers`, `POST /venues/:id/vouchers`, `POST /vouchers/:code/redeem`.
- Marketing: `POST /venues/:id/campaigns`, `GET /venues/:id/campaigns`, `PUT /campaigns/:id`.
- Reviews: `GET /venues/:id/reviews`, `POST /appointments/:id/review`, `PUT /reviews/:id/respond`.
- Reports: `GET /venues/:id/reports/revenue`, `GET /venues/:id/reports/team`, `GET /venues/:id/reports/clients`.
- Team: `GET /venues/:id/team`, `POST /venues/:id/team/invite`, `PUT /team-members/:id`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache venue calendar, client list, service catalog, and inventory counts offline.
- Queue appointment status changes (arrive, complete); block payment processing offline.
- Consumer: cache upcoming bookings and favorites offline; booking requires connectivity.
- Push: new booking received (business), booking confirmation (consumer), reminder (consumer), review request (consumer), low stock alert (business), new review received (business).
- Realtime: calendar slot updates when booking confirmed; inventory count sync after sale.
- Automated reminders sent server-side (24h and 2h before appointment).

## Permissions, Privacy, And Safety

- **Payment model transparency**: Businesses must clearly see per-transaction fees; no hidden charges; fee breakdown on every checkout.
- **Client data**: Venue-scoped; clients visible only to the venue they booked at; consumer can request deletion across all venues.
- **Staff permissions**: Configurable — view own calendar only, manage all bookings, process payments, access reports, manage team.
- **Review integrity**: Only verified attendees can review; business can respond but not delete; moderation for abuse.
- **Marketing consent**: Consumer opt-in required for promotional messages; transactional (confirmations/reminders) sent by default with unsubscribe.
- **Inventory**: Cost prices visible only to owner/manager, not staff or consumers.
- Location for proximity search (consumer); camera for venue photos (business); notifications for reminders.

## Analytics And Monetization

- Business events: `venue_created`, `first_service_added`, `team_member_invited`, `first_booking_received`, `payment_setup_completed`.
- Booking events: `appointment_booked`, `appointment_completed`, `appointment_cancelled`, `no_show_recorded`.
- Revenue events: `checkout_completed`, `processing_fee_collected`, `voucher_sold`, `product_sold`.
- Marketing events: `campaign_created`, `boost_purchased`, `deal_redeemed`, `new_client_acquired_via_marketplace`.
- Monetization: Zero subscription fee for businesses; revenue from payment processing fee per card transaction, paid marketplace boosts, and new client acquisition fees. Do not copy Fresha's exact percentages.

## Edge Cases

- Business never sets up payment processing — can still use calendar/client tools; POS features locked.
- Consumer books at venue that subsequently deactivates — refund any deposit, notify, suggest nearby alternatives.
- Voucher redeemed at checkout exceeds remaining balance — split payment (voucher + card) required.
- Multi-service booking where one service becomes unavailable (staff sick) — partial reschedule option.
- Inventory reaches zero during appointment — product marked "out of stock" at checkout, service still completable.
- Concurrent bookings for last available slot — first confirmed wins, second offered next available.
- Review dispute — business flags review, moderation team reviews, decision communicated to both parties.
- Marketing budget exhausted mid-day — campaign paused, business notified, option to increase budget.
- Card processing outage — fallback to cash recording; card payments queued for retry.

## Test Plan

- Unit tests: availability calculation with multi-service duration, processing fee computation, voucher balance deduction, inventory threshold alerts.
- Integration tests: full booking lifecycle (discover -> book -> arrive -> checkout -> review), voucher purchase-to-redemption, marketing campaign execution.
- Contract tests: marketplace API consistency, availability endpoint accuracy, checkout fee calculation correctness.
- Offline tests: cached calendar display, queued status changes sync on reconnect, payment blocked offline.
- Permission tests: staff role boundaries, client data venue-scoping, inventory cost visibility restrictions.
- Safety tests: review moderation, marketing consent enforcement, payment fee transparency.
- Accessibility tests: marketplace browsable via assistive tech, booking flow completable with VoiceOver.
- Billing tests: processing fee correctly applied per transaction, boost budget tracking, voucher balance accuracy.

## Acceptance Criteria

- Business can sign up, set up venue, add services/team, and start receiving bookings without paying any subscription fee.
- Consumer can discover venues by location/category, book appointments, pay at checkout, and leave reviews.
- Payment processing fees are transparently calculated and displayed to business on every transaction.
- Inventory management tracks stock levels and alerts when below threshold.
- Marketing tools (boosts, campaigns) are available as paid add-ons with clear budget tracking.
- Vouchers and product sales integrate seamlessly with appointment checkout.
- At least 12 acceptance tests cover: venue onboarding, marketplace discovery, booking flow, checkout/payment, inventory, vouchers, marketing, reviews, team management, offline behavior, accessibility, and data export.

## Open Questions

- What is Fresha's exact per-transaction fee structure (percentage + flat fee)?
- How does Fresha handle multi-location businesses under one account?
- What automated marketing messages are included free vs. paid?
- How does the "new client" acquisition fee work (charged once per new client sourced from marketplace)?

## Build Plan

- Phase 1: Verify URLs, document public features from website and app store listings.
- Phase 2: Build consumer marketplace discovery and venue profile pages.
- Phase 3: Implement booking flow with live availability and multi-service support.
- Phase 4: Build business calendar, client management, and team features (all free tier).
- Phase 5: Add checkout/POS with per-transaction fee model and inventory management.
- Phase 6: Implement vouchers, product sales, and online store.
- Phase 7: Build marketing tools (boosts, campaigns, deals) as paid features.
- Phase 8: Add offline support, automated reminders, reviews, and accessibility.
- Phase 9: Conduct hands-on verification and resolve blockers.

## Next Steps

- Create a free Fresha business account to document onboarding flow and free features.
- Research per-transaction pricing from public pricing page or help center.
- Design original UI for zero-subscription business tools and consumer marketplace.
- Extend downstream repo-seeding manifest after spec confirmed implementation-ready.
