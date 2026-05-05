# Setmore-Style Clone Spec

> Metadata
> - Inspiration app: Setmore
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: Teleport video meeting hosting, social media booking page integration, payment gateway connections, staff scheduling, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Setmore's public user-facing workflow. Setmore is a free online appointment scheduling platform that differentiates through generous free-tier features, built-in video meetings (branded "Teleport"), social media booking page integration (Instagram, Facebook, Google), and broad payment gateway support (Square, Stripe, PayPal). It targets small businesses, freelancers, and service professionals who need scheduling without high software costs.

Setmore's positioning: free scheduling for up to 4 staff with unlimited appointments, a built-in video meeting solution for virtual appointments, and native integration with social media platforms so clients can book directly from Instagram or Facebook profiles.

## Goals

- Deliver a mobile-first free appointment scheduling platform with video meetings, social media booking integration, and multi-payment-gateway support.
- Reproduce Setmore's functional model: generous free tier + video meetings + social booking as differentiators for small businesses.
- Support the business workflow (schedule management, staff, clients, payments, video) and client workflow (book via any channel — web, social, direct link).
- Define complete data model, API contracts, and test plan for implementation-ready V1.

## Non-Goals

- Do not copy Setmore branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not implement real video conferencing infrastructure for V1 — design UX shell; actual WebRTC/streaming deferred.
- Do not implement real payment gateway connections without compliance review.
- Do not replicate Setmore's exact tier limits or pricing.
- Do not claim exact native behavior until hands-on verification.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/setmore-appointments/id543340498 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.setmore.business | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.setmore.com/ | Product features, pricing, integrations | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Help/support center | https://support.setmore.com/ | Setup guides, video meeting docs, integrations | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.setmore.com/privacy-policy | Data practices, retention, sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.setmore.com/terms-of-service | Usage terms, liability, disputes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Free scheduling**: Unlimited appointments for up to 4 staff members on the free tier. Booking page, reminders, and basic client management included at no cost.
- **Booking page**: Auto-generated public booking page with custom URL (business-name.setmore.com equivalent). Embeddable widget for websites. Mobile-responsive. Shows services, staff, and available times.
- **Social media booking**: Connect booking page to Instagram (Book button on profile), Facebook (Book Now button on page), and Google Business Profile. Clients book directly from social without leaving the platform.
- **Video meetings (Teleport)**: Built-in video conferencing for virtual appointments. When appointment is virtual, system auto-generates a meeting link shared with both parties. Join from browser or app. (V1: UX shell, actual WebRTC deferred.)
- **Staff scheduling**: Multiple staff members with individual services, availability patterns, and booking pages. Shared calendar with conflict detection.
- **Payment integration**: Connect Square, Stripe, or PayPal to collect payments at booking or after service. Multiple gateways configurable per business.
- **Client management**: Client list with contact info, appointment history, notes, and communication log. Import from CSV or Google Contacts.
- **Automated reminders**: Email and SMS appointment reminders (configurable timing). Confirmation on booking. Follow-up and review requests.
- **Recurring appointments**: Set up weekly/monthly recurring bookings for regular clients.
- **Calendar sync**: Two-way sync with Google Calendar, Outlook, Apple Calendar. Avoid double-booking across personal and business calendars.
- **Multi-location**: Manage multiple business locations under one account with separate staff and schedules.
- **Class scheduling**: Group sessions with capacity limits (paid tier feature).

## Core User Journeys

- **Business sets up free account**: Downloads app, creates account, adds business info, sets up 2 services (Consultation, Follow-up), sets availability (Mon-Fri 9-5), generates booking page link, shares link on social media — all free.
- **Client books via booking page**: Receives link from business's Instagram bio, opens booking page, selects "Consultation" service, picks available Thursday 2pm, enters name/email, confirms — no account needed.
- **Virtual appointment flow**: Client books a virtual consultation. Both receive email with video meeting link. At appointment time, business opens app, taps "Start Meeting," client clicks link in email, video call begins (simulated in V1).
- **Client books from Instagram**: Views business's Instagram profile, taps "Book" action button, redirected to booking page within Instagram browser, selects service and time, confirms.
- **Staff manages schedule**: Business owner adds 3 staff members, each with different services and hours. Staff member opens their app view, sees only their appointments, manages their own availability.
- **Payment collection**: Business connects Stripe to booking page. Client books a paid service, enters card during booking, payment collected immediately, business sees revenue in dashboard.
- **Recurring client setup**: Regular client wants weekly massage every Tuesday 4pm. Staff sets up recurring appointment, system auto-creates appointments 4 weeks ahead, client receives reminders each week.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Dashboard | Business overview: today's appointments, quick stats | view schedule, quick actions | busy day, empty, new account | sync error, offline cached |
| Calendar | Full calendar view (day/week/month) | tap slot, drag reschedule, switch staff | multi-staff, single staff, synced external | conflict with external, offline |
| Booking Page Preview | Preview public booking page appearance | customize colors, toggle services, preview link | customized, default, disabled | link expired |
| Appointment Detail | Individual appointment info and actions | start meeting, mark complete, reschedule, cancel | upcoming, in-progress, completed | client no-show, video unavailable |
| Services | Create and manage service catalog | add service, set duration, price, assign staff | multiple services, empty, class-type | service in use (cannot delete) |
| Staff | Manage team members and their schedules | invite staff, set hours, assign services | active staff, invited (pending), at-limit | invite failed, limit reached (free tier) |
| Video Meeting | Video call interface (Teleport equivalent) | join meeting, mute, camera toggle, end call | connected, connecting, ended, recording | connection failed, bandwidth low |
| Client List | Client database and search | search, add, import, view history | populated, empty, importing | import failed, sync error |
| Client Detail | Individual client profile | edit info, view history, add note | active, has recurring, new | deleted, data export requested |
| Payments | Payment setup and transaction history | connect gateway, view transactions, refund | connected (Stripe/Square/PayPal), not set up | gateway error, refund failed |
| Social Integrations | Connect Instagram/Facebook/Google booking | connect platform, view status, disconnect | connected, disconnected, pending auth | auth expired, platform error |
| Reminders | Configure automated reminder settings | toggle email/SMS, set timing, customize text | email on, SMS on, both, none | delivery failures |
| Recurring | Set up and manage recurring appointments | set frequency, duration, client | active recurring, paused, ended | conflict on future date |
| Reports | Booking stats, revenue, staff utilization | date range, filter by staff/service | data available, new account (empty) | calculation delay |
| Settings | Account, billing, calendar sync, locations | edit profile, upgrade plan, sync calendar | free tier, paid, multi-location | sync failed, upgrade error |

## Data Model

- `Business`: id, owner_id, name, type, slug (booking page URL), address, phone, email, timezone, branding (colors, logo_url), subscription_tier (free/premium/pro), staff_limit, locations (array), created_at.
- `User`: id, email, phone, name, role (owner/staff/client), business_id (nullable for clients), avatar_url, status.
- `Staff`: id, user_id, business_id, display_name, title, services (service_ids), location_id, status (active/invited/deactivated).
- `StaffAvailability`: id, staff_id, day_of_week, start_time, end_time, is_recurring, override_date, type (working/break/off).
- `Service`: id, business_id, name, description, duration_minutes, buffer_minutes, price_cents (nullable — free services), type (appointment/class), capacity (for class type), payment_required (boolean), staff_ids, is_virtual_enabled, is_active.
- `Appointment`: id, business_id, service_id, staff_id, client_id, start_time, end_time, status (booked/confirmed/in_progress/completed/cancelled/no_show), type (in_person/virtual), video_meeting_id (nullable), recurring_series_id, source (booking_page/social/manual/recurring), payment_id, notes, created_at.
- `VideoMeeting`: id, appointment_id, meeting_url, host_url, participant_url, status (pending/active/ended), started_at, ended_at, duration_seconds, recording_url.
- `RecurringSeries`: id, business_id, staff_id, client_id, service_id, frequency (weekly/biweekly/monthly), day_of_week, time, end_date, status (active/paused/ended), appointments_created_until.
- `Client`: id, business_id, user_id (nullable — guest bookings), name, email, phone, notes, source (booking_page/social/manual/import), total_appointments, last_appointment_at, created_at.
- `Payment`: id, business_id, appointment_id, client_id, amount_cents, tip_cents, gateway (stripe/square/paypal), gateway_transaction_id, status (pending/completed/refunded/failed), processed_at.
- `PaymentGateway`: id, business_id, provider (stripe/square/paypal), credentials_token, status (active/disconnected/error), connected_at.
- `SocialIntegration`: id, business_id, platform (instagram/facebook/google), status (connected/disconnected/pending), external_page_id, connected_at.
- `BookingPage`: id, business_id, slug, is_active, branding (jsonb: primary_color, logo_url, cover_photo_url), services_visible (array), staff_visible (array), custom_text.
- `Reminder`: id, appointment_id, type (confirmation/reminder/followup), channel (email/sms), timing_before_minutes, scheduled_at, sent_at, status.
- `CalendarSync`: id, staff_id, provider (google/outlook/apple), external_calendar_id, sync_direction (one_way/two_way), last_synced_at, status.
- `AuditEvent`: id, actor_id, action, resource_type, resource_id, metadata, created_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup`, `POST /auth/recover`, `POST /auth/staff-invite/accept`.
- Business: `GET /business/:id`, `PUT /business/:id`, `GET /business/:id/stats`.
- Services: `GET /business/:id/services`, `POST /business/:id/services`, `PUT /services/:id`, `DELETE /services/:id`.
- Staff: `GET /business/:id/staff`, `POST /business/:id/staff/invite`, `PUT /staff/:id`, `GET /staff/:id/availability`, `PUT /staff/:id/availability`.
- Booking page: `GET /booking/:slug` (public), `GET /booking/:slug/availability?service_id&staff_id&date`, `PUT /business/:id/booking-page` (customize).
- Appointments: `POST /booking/:slug/appointments` (public client booking), `POST /business/:id/appointments` (manual), `PUT /appointments/:id`, `POST /appointments/:id/complete`, `POST /appointments/:id/cancel`.
- Video meetings: `POST /appointments/:id/meeting/start`, `GET /appointments/:id/meeting/join-url`, `POST /meetings/:id/end`.
- Recurring: `POST /business/:id/recurring`, `PUT /recurring/:id`, `DELETE /recurring/:id`.
- Clients: `GET /business/:id/clients`, `POST /business/:id/clients`, `PUT /clients/:id`, `POST /business/:id/clients/import`.
- Payments: `POST /appointments/:id/payment`, `GET /business/:id/payments?period`, `POST /payments/:id/refund`.
- Gateways: `POST /business/:id/payment-gateways/connect`, `DELETE /business/:id/payment-gateways/:provider`.
- Social: `POST /business/:id/social/connect/:platform`, `DELETE /business/:id/social/:platform`, `GET /business/:id/social/status`.
- Calendar sync: `POST /staff/:id/calendar-sync`, `DELETE /staff/:id/calendar-sync/:provider`, `POST /staff/:id/calendar-sync/refresh`.
- Reminders: `GET /business/:id/reminder-settings`, `PUT /business/:id/reminder-settings`.
- Reports: `GET /business/:id/reports/bookings?period`, `GET /business/:id/reports/revenue?period`, `GET /business/:id/reports/staff?period`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache today's appointments, client list, service catalog, and booking page config offline.
- Booking page (public) requires connectivity; show error state if business page offline.
- Push: new booking received, appointment reminder (to client and staff), video meeting starting, cancellation, recurring appointment created.
- Realtime: calendar updates when client books via booking page; multi-staff conflict detection.
- Video meeting: requires persistent connection; reconnection UX on drop; recording saved on end.
- Calendar sync: periodic background refresh; conflict detection on pull; notify staff of external events blocking availability.
- Offline: view schedule and client info; block bookings, payments, and video.

## Permissions, Privacy, And Safety

- **Free tier limits**: Enforce staff limit (4 on free); graceful upgrade prompts, not hard blocks on existing data.
- **Client data**: Business-scoped; guest bookers' data stored minimally (name, email for reminders); GDPR deletion on request.
- **Video privacy**: Meeting links time-limited and single-use; recordings stored encrypted; host controls recording consent.
- **Social integration**: Platform OAuth tokens stored encrypted; disconnection removes access immediately; no data pulled from social accounts beyond booking button functionality.
- **Payment security**: Gateway credentials never stored directly (use platform's token/key system); PCI compliance through gateway responsibility.
- **Staff access**: Staff see only their own calendar and clients by default; owner can grant broader access.
- **Booking page**: Public but business controls what's visible; no client data exposed on booking page.
- Notifications for appointments and meetings; camera/microphone for video (request at meeting start); contacts for client import.

## Analytics And Monetization

- Business events: `business_created`, `first_service_added`, `booking_page_published`, `first_booking_received`, `staff_invited`, `video_meeting_started`.
- Booking events: `appointment_booked`, `appointment_completed`, `appointment_cancelled`, `recurring_created`, `booking_source_breakdown` (page/social/manual).
- Integration events: `social_connected`, `payment_gateway_connected`, `calendar_synced`, `video_meeting_completed`.
- Monetization: free tier (4 staff, unlimited appointments, booking page, reminders, 1 social integration); paid tiers unlock: more staff, video meetings, SMS reminders, multiple social integrations, custom branding, calendar sync. Do not copy Setmore's exact tier pricing.

## Edge Cases

- Staff limit reached on free tier — cannot invite more; existing staff remain active; prompt upgrade.
- Video meeting — one party has no camera/microphone permission — audio-only fallback; prompt permission in settings.
- Social platform API changes break booking button — detect broken integration, notify business, show manual link fallback.
- Client books while calendar sync is delayed — double-booking possible; detect on next sync, alert staff, offer resolution options.
- Recurring appointment conflicts with a one-off booking — one-off takes priority; skip recurring instance; notify both parties.
- Payment gateway disconnected mid-booking — allow booking without payment; notify business to collect manually.
- Video meeting recording storage limit reached — warn before meeting; option to delete old recordings or upgrade.
- Business deletes staff member with future appointments — require reassignment before deletion.
- Booking page URL slug conflict — append numeric suffix; notify business of URL change.
- Guest client (no account) returns for second booking — match by email; merge into single client record.

## Test Plan

- Unit tests: availability calculation with calendar sync events, recurring series generation, staff limit enforcement, meeting URL generation, slug uniqueness.
- Integration tests: full booking-via-page flow, video meeting lifecycle (create/join/end), social integration connect/disconnect, recurring appointment creation with conflict detection.
- Contract tests: public booking page API consistency, availability endpoint accuracy with synced events, payment gateway webhook handling.
- Offline tests: cached calendar display, booking page errors gracefully offline, video meeting requires connectivity.
- Permission tests: staff visibility boundaries, free tier limit enforcement, client data scoping, guest vs. registered client handling.
- Safety tests: video meeting link expiry, recording consent enforcement, social token revocation, payment security.
- Accessibility tests: booking page WCAG compliant, calendar navigable via assistive tech, video controls accessible.
- Billing tests: tier upgrade/downgrade, payment gateway transaction accuracy, refund processing.

## Acceptance Criteria

- Business can set up and start receiving bookings completely free (up to 4 staff, unlimited appointments).
- Clients can book via public booking page without creating an account (guest booking).
- Video meeting links are auto-generated for virtual appointments and functional for both parties (UX shell complete).
- Social media booking integration connects and provides a booking path from Instagram/Facebook/Google.
- Calendar sync prevents double-booking by incorporating external calendar events into availability calculation.
- Multiple payment gateways can be connected and used for collecting pre-payment or post-service payment.
- Free tier limitations are enforced gracefully with clear upgrade paths.
- At least 12 acceptance tests cover: free-tier booking, booking page flow, video meeting UX, social integration, calendar sync, payment processing, staff management, recurring appointments, reminders, guest clients, offline behavior, and accessibility.

## Open Questions

- How does Setmore's Teleport video meeting compare to Zoom/Meet in terms of features (screen share, recording, group calls)?
- What is the exact free tier boundary (number of social integrations, SMS limits)?
- How does calendar sync handle all-day events vs. timed events for availability blocking?
- What happens to a business's data if they downgrade from paid to free (staff over limit)?

## Build Plan

- Phase 1: Verify URLs, document free tier features and paid tier boundaries from public pricing page.
- Phase 2: Build business onboarding, service catalog, and staff management with free tier limits.
- Phase 3: Implement booking page generation, customization, and public booking flow (guest-friendly).
- Phase 4: Add calendar views, availability engine, and recurring appointments.
- Phase 5: Build video meeting UX shell (create, join, controls) with placeholder infrastructure.
- Phase 6: Implement social media integration connections (Instagram, Facebook, Google booking buttons).
- Phase 7: Add payment gateway connections (Stripe, Square, PayPal) with collection at booking or after service.
- Phase 8: Build calendar sync (Google, Outlook, Apple) with conflict detection.
- Phase 9: Implement reminders, client management, and reporting.
- Phase 10: Add offline support, accessibility, and comprehensive test suite.
- Phase 11: Conduct hands-on verification and resolve blockers.

## Next Steps

- Create a free Setmore account to document onboarding, booking page, and video meeting UX.
- Research Teleport video feature set from help center documentation.
- Test social booking button setup from public documentation.
- Design original UI for booking page generator and video meeting interface.
- Extend downstream repo-seeding manifest after spec confirmed implementation-ready.
