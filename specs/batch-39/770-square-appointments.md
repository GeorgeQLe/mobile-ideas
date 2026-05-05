# Square Appointments-Style Clone Spec

> Metadata
> - Inspiration app: Square Appointments
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: Square payment processing, POS hardware integration, staff calendar sync, client messaging, no-show fee enforcement, inventory management, contract/deposit handling, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Square Appointments's public user-facing workflow. The clone delivers appointment scheduling with integrated point-of-sale, staff management, client database, automated reminders, no-show protection, and invoicing — targeting service businesses (salons, spas, consultants, personal trainers) that need unified booking and payment in one platform.

Square Appointments combines calendar management with Square's payment ecosystem: clients book online or in-app, staff manage their availability, businesses collect payments at checkout or enforce no-show/cancellation fees, and reporting ties appointments to revenue.

## Goals

- Deliver a mobile-first appointment scheduling and POS experience with business onboarding, calendar management, client booking, staff scheduling, payment collection, and reporting.
- Reproduce the functional job behind Square Appointments: unified booking + payments for service businesses with staff management, automated reminders, and no-show protection.
- Support both the business-owner/staff perspective (manage calendar, clients, payments) and the client perspective (discover, book, pay, receive reminders).
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.

## Non-Goals

- Do not copy Square branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, or protected media.
- Do not integrate with actual Square hardware (readers, terminals, registers) — simulate POS interactions.
- Do not implement real payment processing without separate legal/platform review.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/square-appointments/id1052498614 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.squareup.appointments | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://squareup.com/us/en/appointments | Product features, pricing tiers, integration list | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Help center | https://squareup.com/help/us/en/article/5095-get-started-with-square-appointments | Setup guides, feature documentation, troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://squareup.com/us/en/legal/general/privacy | Data collection, sharing, retention policies | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://squareup.com/us/en/legal/general/tos | Usage terms, liability, dispute resolution | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Business onboarding**: Business owner creates account, sets business type (salon, spa, consulting, fitness, etc.), configures services with duration/pricing, adds staff members with individual availability, and sets booking policies (advance notice, cancellation window, no-show fees).
- **Calendar management**: Day/week/month views showing appointments color-coded by staff member or service type. Drag-to-reschedule, block time for breaks/personal, recurring availability patterns, and multi-location support.
- **Online booking site**: Auto-generated booking page shareable via link, embeddable widget, or social media. Clients select service, staff (or "any available"), date/time, and confirm with payment method on file.
- **Client management**: CRM with contact info, appointment history, notes, preferences, payment methods on file, outstanding invoices, and communication log. Import from contacts or CSV.
- **Staff management**: Individual staff profiles with services they perform, working hours, break schedules, commission rates, and calendar sync (Google Calendar, iCal). Staff can manage their own schedule via the app.
- **Payment integration**: Collect payment at checkout (card on file, in-person via simulated POS, invoice). No-show and late-cancellation fee enforcement. Tips, discounts, and package/membership pricing.
- **Automated communications**: Booking confirmations, reminders (email/SMS configurable timing), follow-up requests for reviews, and waitlist notifications.
- **Invoicing**: Create and send invoices for services rendered, deposits required, or package purchases. Track payment status.
- **Reporting**: Revenue by service/staff/time period, booking conversion rates, no-show rates, client retention metrics.
- **Offline behavior**: View upcoming appointments, client details, and service catalog offline. Queue new bookings and payments for sync when connectivity returns. Block payment processing and fee enforcement while offline.

## Core User Journeys

- **Business owner setup**: Install app, create business profile, add services with durations and prices, set availability, configure booking policies, share booking link.
- **Staff member onboarding**: Receive invite from business owner, create staff account, set personal availability, connect external calendar, begin receiving appointment assignments.
- **Client books appointment**: Client opens booking page/app, browses available services, selects preferred staff and time slot, adds payment method, confirms booking, receives confirmation.
- **Day-of appointment flow**: Staff views daily schedule, checks in client on arrival, performs service, processes payment (card on file or new payment), adds tip, appointment marked complete.
- **No-show handling**: Appointment time passes with no check-in, staff marks as no-show, system enforces no-show fee per policy, client notified of charge, dispute flow available.
- **Cancellation/reschedule**: Client requests cancellation within or outside policy window, system applies or waives fee based on policy, time slot freed for other bookings or waitlist notification sent.
- **Recurring appointments**: Client or staff sets up recurring booking (weekly haircut, monthly massage), system auto-creates future appointments, sends reminders, handles conflicts.
- **Reporting review**: Business owner opens dashboard, reviews weekly revenue, identifies top-performing services/staff, checks no-show rates, adjusts policies or pricing.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Business or client login, signup, role selection | email, password, social auth, business type | new user, returning, staff invite, blocked | invalid credentials, suspended account, network error |
| Calendar/Schedule | Daily/weekly/monthly appointment view | tap appointment, drag to reschedule, tap empty slot | empty day, fully booked, partial availability, multi-staff | sync conflict, stale data, offline cached view |
| Book Appointment | Service/staff/time selection flow | service picker, staff picker, date/time picker, notes | available slots, no availability, waitlist, recurring | double-booking conflict, payment method required, policy violation |
| Client List | CRM with search and filters | search, filter by last visit/service, sort | populated list, empty state, loading | offline with cached clients, sync conflicts |
| Client Detail | Individual client profile and history | edit contact, add note, view history, message | active client, archived, outstanding balance | client deleted account, payment dispute active |
| Service Catalog | Manage services, durations, prices | add/edit/archive service, set duration, price, staff | active services, archived, categories | service booked while editing, price change mid-booking |
| Staff Management | Staff list, permissions, schedules | invite staff, set hours, assign services | active staff, pending invite, deactivated | staff overlap conflict, permission denied |
| Payment/Checkout | Process payment for completed appointment | select payment method, apply tip, discount | card on file, new card, invoice, split payment | payment declined, timeout, offline queued |
| Invoice | Create/send/track invoices | line items, due date, send method | draft, sent, paid, overdue, disputed | delivery failure, partial payment |
| No-Show/Cancellation | Handle missed or cancelled appointments | mark no-show, apply fee, waive fee, dispute | within policy, outside policy, fee waived | dispute in progress, payment method expired |
| Booking Site Settings | Configure public booking page | toggle availability, set policies, customize link | active, paused, maintenance | link conflicts, embedded widget errors |
| Reports/Analytics | Revenue, booking, and performance metrics | date range, filter by staff/service | data available, insufficient data, loading | calculation errors, timezone mismatches |
| Notifications/Reminders | Configure automated communications | toggle channels, set timing, customize message | email enabled, SMS enabled, both disabled | delivery failures, client opted out |
| Settings | Business profile, policies, integrations | edit fields, toggle features, connect services | complete profile, incomplete, subscription limits | integration auth expired, feature locked |

## Data Model

- `Business`: id, name, type, timezone, address, phone, email, logo_url, booking_url_slug, subscription_tier, created_at, updated_at, deleted_at.
- `User`: id, email, phone, name, role (owner/staff/client), business_id (nullable for clients), avatar_url, auth_provider, status (active/suspended/deleted), created_at.
- `Staff`: id, user_id, business_id, display_name, bio, services (array of service_ids), commission_rate, status (active/invited/deactivated), created_at.
- `StaffAvailability`: id, staff_id, day_of_week, start_time, end_time, is_recurring, override_date (for one-off changes), break_start, break_end.
- `Service`: id, business_id, name, description, category, duration_minutes, buffer_minutes, price_cents, currency, is_active, requires_deposit, deposit_amount_cents.
- `Client`: id, business_id, user_id (nullable), name, email, phone, notes, tags, payment_method_token, lifetime_value_cents, last_visit_at, created_at.
- `Appointment`: id, business_id, service_id, staff_id, client_id, start_time, end_time, status (booked/confirmed/checked_in/completed/no_show/cancelled), source (online/in_person/phone), notes, recurring_series_id, created_at.
- `RecurringSeries`: id, appointment_template (service_id, staff_id, client_id, day_of_week, time), frequency (weekly/biweekly/monthly), end_date, status (active/paused/ended).
- `BookingPolicy`: id, business_id, advance_notice_hours, max_advance_days, cancellation_window_hours, no_show_fee_cents, late_cancel_fee_cents, requires_payment_method.
- `Payment`: id, appointment_id, invoice_id, client_id, amount_cents, tip_cents, discount_cents, method (card_on_file/new_card/cash/invoice), status (pending/completed/failed/refunded), processed_at.
- `Invoice`: id, business_id, client_id, line_items (jsonb), subtotal_cents, tax_cents, total_cents, status (draft/sent/paid/overdue/cancelled), due_date, sent_at, paid_at.
- `Reminder`: id, appointment_id, channel (email/sms/push), scheduled_at, sent_at, status (pending/sent/failed/cancelled).
- `CalendarSync`: id, staff_id, provider (google/ical/outlook), external_calendar_id, sync_direction (read/write/both), last_synced_at, status (active/error/disconnected).
- `AuditEvent`: id, actor_id, actor_type, action, resource_type, resource_id, metadata (jsonb), ip_address, created_at.
- `LocalCacheRecord`: device-local state for offline reads, queued writes, sync attempts, conflict resolution, and cache expiry.

## API And Backend Contracts

- Auth: `POST /auth/session` (login), `POST /auth/signup` (register business or client), `POST /auth/recover` (password reset), `POST /auth/invite/accept` (staff invite), `DELETE /auth/session`.
- Business: `GET /business/:id`, `PUT /business/:id` (update profile/policies), `GET /business/:id/booking-page` (public booking config).
- Services: `GET /business/:id/services`, `POST /business/:id/services`, `PUT /services/:id`, `DELETE /services/:id`.
- Staff: `GET /business/:id/staff`, `POST /business/:id/staff/invite`, `PUT /staff/:id`, `GET /staff/:id/availability`, `PUT /staff/:id/availability`.
- Clients: `GET /business/:id/clients`, `POST /business/:id/clients`, `PUT /clients/:id`, `GET /clients/:id/history`, `POST /clients/:id/message`.
- Appointments: `GET /business/:id/appointments?date_range&staff_id`, `POST /business/:id/appointments`, `PUT /appointments/:id`, `POST /appointments/:id/check-in`, `POST /appointments/:id/complete`, `POST /appointments/:id/no-show`, `POST /appointments/:id/cancel`.
- Availability: `GET /business/:id/availability?service_id&staff_id&date_range` (public slot query for booking).
- Payments: `POST /appointments/:id/payment`, `POST /invoices`, `GET /invoices/:id`, `POST /invoices/:id/send`, `POST /payments/:id/refund`.
- Reminders: `GET /business/:id/reminder-settings`, `PUT /business/:id/reminder-settings`.
- Reports: `GET /business/:id/reports/revenue?period`, `GET /business/:id/reports/bookings?period`, `GET /business/:id/reports/staff-performance?period`.
- Calendar sync: `POST /staff/:id/calendar-sync`, `DELETE /staff/:id/calendar-sync/:provider`, `POST /staff/:id/calendar-sync/refresh`.
- Privacy: `POST /data-export`, `DELETE /account`, `GET /privacy/settings`.

## Realtime, Push, And Offline Behavior

- Cache today's appointments, client list, service catalog, and business settings for offline access.
- Queue new appointment bookings locally with conflict detection on reconnect (double-booking prevention).
- Block payment processing, fee enforcement, and invoice sending while offline.
- Push notifications for: new booking received, appointment reminder (configurable: 24h, 2h, 30min before), cancellation received, no-show fee charged, payment received, staff schedule change.
- Realtime calendar updates via WebSocket for multi-staff businesses — when one staff member books, others see the slot filled immediately.
- SMS/email reminders sent server-side on schedule; client delivery failures logged and retried once.
- Background sync for external calendar integrations (Google Calendar) with conflict resolution favoring the most recently modified event.

## Permissions, Privacy, And Safety

- **Payment data**: PCI compliance required; never store raw card numbers; use tokenized payment methods; audit all payment state changes.
- **Client data**: Business can export/delete client data; clients can request data export/deletion via support; GDPR/CCPA compliance for client PII.
- **Staff permissions**: Owner can manage all; staff can only view/manage their own appointments and assigned clients unless elevated.
- **Booking page privacy**: Business controls what info is public (services, staff names, prices) vs private (client list, revenue).
- **No-show fees**: Must have clear disclosure to client at booking time; dispute resolution path required; cannot charge without prior consent to payment method storage.
- **Communication consent**: SMS/email reminders require opt-in; unsubscribe must be honored; no marketing without separate consent.
- Request location only for multi-location business selection; camera only for avatar/receipt photos; contacts only for client import (one-time, explicit).
- Minimize PII in analytics; never log payment tokens, client notes, or appointment details in crash reports.

## Analytics And Monetization

- Onboarding events: `business_created`, `first_service_added`, `first_staff_invited`, `booking_page_published`, `first_appointment_booked`.
- Core events: `appointment_created`, `appointment_completed`, `appointment_cancelled`, `appointment_no_show`, `payment_processed`, `invoice_sent`.
- Engagement events: `calendar_viewed`, `client_searched`, `report_viewed`, `reminder_configured`, `calendar_synced`.
- Monetization: free tier (single staff, limited appointments/month), paid tiers (multi-staff, unlimited appointments, advanced reporting, no-show protection, SMS reminders). Do not copy Square's exact tier names or pricing.
- Revenue events: `subscription_started`, `subscription_upgraded`, `subscription_cancelled`, `payment_processing_fee_collected`.

## Edge Cases

- Double-booking: two clients attempt to book the same slot simultaneously — last-write-wins with notification to loser, or waitlist.
- Staff availability conflict: staff marks time as unavailable after client has already booked — require reschedule flow, not silent cancellation.
- No-show fee with expired card: attempt charge, fail gracefully, flag client account, notify business owner.
- Timezone handling: business in one timezone, client booking from another — always display in business timezone with client's local time noted.
- Recurring appointment on holiday/closure: skip and notify, or offer alternative slot.
- Mid-appointment payment failure: complete the service, flag invoice as outstanding, follow up via invoice.
- Staff deletion with future appointments: require reassignment or cancellation of all future appointments before deactivation.
- Client disputes no-show fee: freeze fee, create support case, business owner adjudicates.
- Booking page abuse: rate-limit booking attempts, CAPTCHA for suspicious patterns, block known spam accounts.
- Calendar sync conflict: external event blocks a slot that has existing booking — alert staff, do not auto-cancel client booking.

## Test Plan

- Unit tests: service duration/buffer calculation, availability slot generation, no-show fee policy evaluation, timezone conversion, recurring series generation.
- Integration tests: full booking flow (select service -> pick slot -> confirm -> reminder sent -> check-in -> payment), staff invite acceptance, calendar sync round-trip.
- Contract tests: all API endpoints return documented shapes; availability endpoint never returns double-bookable slots; payment endpoint enforces idempotency.
- Offline tests: cached calendar renders correctly, queued booking syncs on reconnect with conflict detection, payment blocked while offline.
- Permission tests: staff cannot access other staff's clients; client cannot see business revenue; deactivated staff loses access.
- Safety tests: no-show fee requires prior payment method consent; client dispute creates case; PCI-sensitive fields never logged.
- Accessibility tests: calendar navigation via VoiceOver, booking flow completable with keyboard/switch control, contrast ratios on time slots.
- Billing tests: subscription upgrade unlocks multi-staff immediately; downgrade at period end; expired subscription limits features gracefully.

## Acceptance Criteria

- Business owner can create account, add services, set availability, and publish a booking page within 5 minutes of first launch.
- Client can discover available slots, book an appointment, receive confirmation, and get a reminder — all without contacting the business directly.
- Staff member can view their daily schedule, check in a client, process payment, and see it reflected in reports.
- No-show and cancellation policies are enforced automatically with clear client disclosure and dispute path.
- Calendar sync with external providers keeps availability accurate without manual intervention.
- Offline mode shows cached appointments and queues bookings; payment processing is blocked until online.
- All data entities have ownership, lifecycle states, and deletion/export support.
- At least 12 acceptance tests cover: booking happy path, double-booking prevention, no-show fee, cancellation policy, staff permissions, offline behavior, recurring appointments, payment processing, client management, reporting accuracy, accessibility, and data export/deletion.

## Open Questions

- Which Square Appointments features are behind specific paid tiers vs. available on free?
- How does Square handle multi-location businesses in the mobile app specifically (vs. web dashboard)?
- What is the exact SMS reminder delivery infrastructure (Twilio equivalent) and cost model?
- How does the real app handle partial-day availability changes (e.g., staff leaves early)?

## Build Plan

- Phase 1: Verify all research source URLs; document public feature set from help center and app store listings.
- Phase 2: Build business onboarding, service catalog, and staff availability management.
- Phase 3: Implement appointment booking flow (business-side and client-side), calendar views, and slot availability engine.
- Phase 4: Add payment processing simulation, no-show/cancellation policy enforcement, and invoicing.
- Phase 5: Implement automated reminders, calendar sync, and real-time multi-staff updates.
- Phase 6: Build reporting dashboard, client CRM features, and booking page customization.
- Phase 7: Complete offline support, accessibility, permission tests, and regression suite.
- Phase 8: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Conduct hands-on verification with a free Square Appointments account to document exact booking flow and UI patterns.
- Determine SMS/notification provider for reminders (original implementation, not Square's infrastructure).
- Design original UI components for calendar, booking, and checkout flows.
- Extend downstream repo-seeding manifest after this spec is confirmed implementation-ready.
