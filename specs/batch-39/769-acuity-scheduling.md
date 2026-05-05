# Acuity Scheduling-Style Clone Spec

> Metadata
> - Inspiration app: Acuity Scheduling (by Squarespace)
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: intake form builder complexity, payment processing (Stripe/Square/PayPal), package/membership/gift certificate tracking, Squarespace integration depth, client self-service portal, HIPAA compliance mode, and subscription restore.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Acuity Scheduling's public appointment scheduling workflow. The V1 clone focuses on appointment type configuration, customizable intake forms, client self-scheduling, payment collection at booking (Stripe/Square/PayPal), packages and memberships, gift certificates, group classes, calendar sync, automated email/SMS reminders, client management, Squarespace website embedding, multiple staff/location support, and business-focused subscription entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, payment, intake-form, package, membership, Squarespace, HIPAA, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first appointment scheduling experience with onboarding, appointment type setup, client booking, payment, packages, reminders, and business management flows.
- Reproduce the functional job behind Acuity Scheduling using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, payment flows, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Acuity/Squarespace branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, payment processing, HIPAA, and Squarespace integration states.
- Do not implement production payments, HIPAA compliance, or regulated health scheduling without separate legal/compliance review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Official product site | https://acuityscheduling.com/ | Product features, pricing, integration claims, and business scheduling workflow | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Squarespace/Acuity help | https://support.squarespace.com/hc/en-us/categories/200337877-Acuity-Scheduling | Appointment setup, intake forms, payments, packages, clients, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.squarespace.com/privacy | Data collection, client data handling, payment processing, and third-party sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.squarespace.com/terms-of-service | Service terms, subscriptions, acceptable use, HIPAA BAA, and data processing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Apple App Store | https://apps.apple.com/us/app/acuity-scheduling/id1179891379 | iOS listing, privacy labels, release notes, and scheduling claims | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.squarespace.acuity | Android listing, data safety, feature claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support business account creation, business type selection, timezone/hours setup, first appointment type creation, calendar connection, and payment provider connection.
- Appointment types must support one-on-one services, group classes (with capacity), and virtual/in-person/phone location options with per-type durations, prices, and intake forms.
- Intake forms must be fully customizable per appointment type: text fields, dropdowns, checkboxes, file uploads, consent checkboxes, and conditional logic (show field X if answer Y).
- Client self-scheduling must present a branded booking page showing available appointment types, available times based on staff availability and calendar sync, intake form completion, and payment.
- Payment collection must integrate with Stripe, Square, and PayPal to collect payment at booking, require deposits, or allow pay-later with invoicing.
- Packages must allow businesses to sell bundles of appointments (e.g., "5 sessions for $400") with tracking of remaining sessions and expiry.
- Memberships must offer recurring subscription access to appointment types with member-only pricing or exclusive availability.
- Gift certificates must be purchasable, redeemable at booking, trackable by balance, and transferable.
- Group classes must support capacity limits, waitlists, and multiple participant booking for the same time slot.
- Staff management must support multiple providers with individual availability, appointment type assignments, and calendar connections.
- Location management must support multiple business locations with per-location availability and staff assignment.
- Automated notifications must include booking confirmation, reminder (customizable timing), follow-up, and cancellation emails/SMS with template customization.
- Client management must maintain client history, notes, upcoming/past appointments, package balances, and membership status.
- Squarespace embedding must allow booking widget to appear on Squarespace websites (and other sites via iframe/embed code).
- Settings must include business profile, hours, appointment types, staff, locations, payments, notifications, integrations, subscription, privacy, terms, and delete-account.
- Entitlements must model emerging (1 staff), growing (multiple staff), powerhouse (advanced features, HIPAA), and enterprise states.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, and reduced motion.
- Offline behavior must cache appointment schedule and client info locally; block booking acceptance and payment processing while offline.

## Core User Journeys

- Business owner sets up account, configures business hours, creates appointment types with pricing and intake forms, connects payment provider, and shares booking link.
- Client opens booking page, selects appointment type, chooses available time, fills intake form, pays, and receives confirmation.
- Business owner views daily/weekly schedule, sees upcoming appointments with client details and intake form responses.
- Business owner creates a package (5 sessions), sells it to a client, and tracks remaining sessions as client books.
- Client purchases a gift certificate; recipient redeems it during booking to cover appointment cost.
- Business owner sets up automated reminders: email 24h before, SMS 2h before, follow-up email 1h after.
- Client manages their own appointments via self-service portal: view upcoming, reschedule, cancel (within policy), and purchase packages.
- Business owner adds a second staff member with their own availability and assigned appointment types.
- Business owner creates a group yoga class with 15-person capacity; clients book individual spots until full, then join waitlist.
- Business owner embeds booking widget on their Squarespace website for seamless client scheduling.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Setup | Business account, hours, first appointment type | business info, hours, type | new, returning, trial | validation, timezone error |
| Calendar/Schedule | Daily/weekly view of appointments | tap, create, drag | loaded, empty, busy | sync error, double-book |
| Appointment Types | Configure services, pricing, forms | create, edit, duplicate | active, inactive, draft | price error, form invalid |
| Intake Form Builder | Custom form fields per appointment type | add field, logic, reorder | editing, preview | invalid logic, too many fields |
| Booking Page (Client) | Client-facing scheduling interface | type, time, form, payment | available, confirming | no slots, payment failed |
| Client Management | Client list, history, notes, packages | search, view, edit | loaded, empty | no clients, stale data |
| Packages/Memberships | Bundle and subscription management | create, sell, track | active, expired, depleted | payment failed, expired |
| Gift Certificates | Create, sell, track, redeem | create, purchase, redeem | active, redeemed, expired | invalid code, zero balance |
| Group Classes | Capacity management and waitlists | create, enroll, waitlist | available, full, waitlisted | over-capacity, cancellation |
| Staff Management | Multiple providers and availability | add, assign, schedule | active, inactive | calendar conflict, unavailable |
| Notifications | Email/SMS template configuration | template, timing, enable | active, draft, failed | delivery failure, template error |
| Payments | Provider connection and transaction history | connect, view, refund | connected, processing | payment failure, refund error |
| Client Self-Service | Client portal for managing appointments | view, reschedule, cancel, buy | upcoming, past, packages | policy violation, no appointments |
| Settings | Business, integrations, billing, privacy | forms, connections, toggles | loaded, editing | connection expired, billing error |

## Data Model

- `Business`: account state, name, timezone, hours, locations, branding (logo, colors), booking page slug, subscription, and deletion/export status.
- `Staff`: business reference, name, email, availability schedule, assigned appointment types, calendar connection, and active state.
- `Location`: business reference, name, address, timezone, assigned staff, and active state.
- `AppointmentType`: business reference, name, description, duration, price, deposit amount, location options, assigned staff, intake form reference, capacity (for groups), buffer time, and active/inactive state.
- `IntakeForm`: appointment type reference, fields (ordered list), conditional logic rules, and required/optional flags.
- `IntakeFormField`: form reference, type (text/email/phone/dropdown/checkbox/file/consent), label, options, validation rules, and conditional visibility.
- `Appointment`: type reference, client reference, staff reference, location reference, start/end time, status (scheduled/completed/canceled/no-show/rescheduled), intake responses, payment reference, package redemption, and calendar event ID.
- `Client`: business reference, name, email, phone, notes, tags, appointment history count, package balances, membership state, and self-service portal access.
- `Package`: business reference, name, appointment type(s), session count, price, expiry period, and active state.
- `ClientPackage`: client reference, package reference, sessions remaining, purchase date, expiry date, payment reference, and status.
- `Membership`: business reference, name, recurring price, billing interval, included appointment types, member pricing, and active state.
- `ClientMembership`: client reference, membership reference, status (active/canceled/expired), next billing date, and payment method.
- `GiftCertificate`: business reference, code, initial value, remaining balance, purchaser, recipient, expiry, and redemption history.
- `GroupClass`: appointment type reference, date/time, capacity, enrolled count, waitlist, and status.
- `NotificationTemplate`: business reference, trigger (confirmation/reminder/follow-up/cancellation), channel (email/SMS), timing offset, subject, body template, and active state.
- `Payment`: appointment/package/membership/gift reference, provider (Stripe/Square/PayPal), amount, currency, status (pending/completed/refunded/failed), and transaction ID.
- `CalendarConnection`: staff reference, provider (Google/Outlook/iCloud), tokens, sync state, and two-way sync enabled.
- `Entitlement`: business reference, plan (emerging/growing/powerhouse/enterprise), staff limit, feature flags, HIPAA mode, and billing state.
- `AuditEvent`: appointment, payment, client data access, staff changes, and security-sensitive actions.
- `LocalCacheRecord`: schedule, client list, appointment types, and package balances with sync state.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/sso`, `DELETE /auth/session` with business and staff role context.
- Appointment types: `POST /appointment-types`, `GET /appointment-types`, `PATCH /appointment-types/{id}`, `DELETE /appointment-types/{id}` with intake form and pricing configuration.
- Intake forms: `POST /appointment-types/{id}/form`, `GET /appointment-types/{id}/form`, `PATCH /forms/{id}` with field and logic management.
- Availability: `GET /availability?appointmentTypeId=&staffId=&dateRange=` computing available slots from staff hours, calendar busy times, buffer rules, and existing appointments.
- Bookings: `POST /appointments` (client books), `GET /appointments?range=&status=`, `PATCH /appointments/{id}` (reschedule/cancel), with intake form validation and payment processing.
- Clients: `POST /clients`, `GET /clients`, `GET /clients/{id}`, `PATCH /clients/{id}` with history, packages, and membership data.
- Packages: `POST /packages`, `GET /packages`, `POST /clients/{id}/packages` (sell), `POST /appointments/{id}/redeem-package` (use session).
- Memberships: `POST /memberships`, `POST /clients/{id}/memberships`, `PATCH /client-memberships/{id}` (cancel), with recurring billing management.
- Gift certificates: `POST /gift-certificates`, `POST /gift-certificates/purchase`, `POST /gift-certificates/redeem`, `GET /gift-certificates/{code}/balance`.
- Group classes: `POST /group-classes`, `GET /group-classes`, `POST /group-classes/{id}/enroll`, `POST /group-classes/{id}/waitlist`.
- Staff: `POST /staff`, `GET /staff`, `PATCH /staff/{id}`, `DELETE /staff/{id}` with availability and assignment management.
- Notifications: `POST /notification-templates`, `GET /notification-templates`, `PATCH /notification-templates/{id}` with template variables and timing.
- Payments: `POST /payments/connect-provider`, `GET /payments/transactions`, `POST /payments/{id}/refund` with provider-specific handling.
- Calendar sync: `POST /calendars/connect`, `GET /calendars/sync-status`, `POST /calendars/sync` with two-way sync support.
- Embed: `GET /embed/config` returning booking page configuration for iframe/widget embedding.
- Privacy: `POST /data-export`, `DELETE /account`, `DELETE /clients/{id}` (client data deletion), `GET /privacy/settings`.

## Realtime, Push, And Offline Behavior

- Cache daily/weekly schedule, client list, appointment type configurations, and package balances for offline viewing.
- Block booking acceptance, payment processing, and package sales while offline (require server validation).
- Push notifications for new bookings, cancellations, reschedules, upcoming appointments, and payment confirmations.
- Automated email/SMS reminders executed server-side on schedule; delivery failures surfaced in notification dashboard.
- Calendar sync runs on booking creation/modification; background sync keeps external calendars current.
- Two-way calendar sync detects external bookings and blocks those times from client scheduling.

## Permissions, Privacy, And Safety

- Treat client PII, intake form responses (potentially health data), payment processing, and HIPAA compliance as launch-blocking review areas.
- HIPAA mode (if offered) requires BAA, encrypted intake form storage, audit logging, and restricted staff access to PHI.
- Payment data handled exclusively by payment provider (Stripe/Square/PayPal); PCI compliance via client-side tokenization.
- Client intake form responses may contain sensitive data (health conditions, personal notes); encrypt at rest and restrict access to assigned staff.
- Do not send client names, emails, intake responses, appointment details, or payment amounts in analytics.
- Provide business data export, account deletion, and client-level data deletion capability.
- Client self-service portal must authenticate clients before showing appointment history or package balances.
- Cancellation/reschedule policies must be clearly communicated and enforced (minimum notice period, fees).
- Rate-limit booking page to prevent abuse; CAPTCHA for suspicious booking patterns.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `business_configured`, `appointment_type_created`, `payment_connected`, `booking_page_shared`.
- Core action events: `appointment_booked`, `appointment_canceled`, `appointment_completed`, `package_sold`, `membership_created`, `gift_certificate_purchased`, `group_class_enrolled`.
- Retention events: `app_opened`, `schedule_viewed`, `client_viewed`, `reminder_sent`, `notification_opened`.
- Monetization events: `paywall_viewed`, `trial_started`, `plan_upgraded`, `subscription_canceled`, `staff_seat_added`.
- Monetization model: tiered subscription based on staff count and features; do not copy exact Acuity pricing.
- Analytics rule: do not send client PII, intake responses, appointment details, health data, or payment amounts as event properties.

## Edge Cases

- Client books last available slot while another client is in checkout for same slot; atomic reservation required.
- Package expires with remaining sessions; client must be notified and business policy determines refund eligibility.
- Group class at capacity receives cancellation; next waitlist member must be automatically notified and offered the spot.
- Payment provider connection expires; new bookings requiring payment must be blocked with clear business notification.
- Intake form with file upload when client is on poor connection; upload must resume or fail gracefully.
- Staff member deleted while having future appointments; appointments must be reassigned or canceled with client notification.
- Gift certificate used for partial payment; remaining balance must be tracked and available for future use.
- Membership payment fails; grace period before access revocation with retry attempts.
- Client attempts to reschedule within cancellation policy window; enforce minimum notice period.
- Multiple timezones: business in one timezone, staff in another, client in a third; all displays must be correct.
- Squarespace embed on HTTPS site with mixed content; widget must load securely.
- HIPAA mode enabled after existing non-compliant data exists; migration path must be defined.
- Two-way calendar sync creates a loop (Acuity syncs to Google, Google syncs back); loop detection required.

## Test Plan

- Unit tests for availability computation, package session tracking, membership billing calculation, gift certificate balance, and intake form validation.
- Integration tests for booking flow, payment processing, calendar sync, notification delivery, and client management.
- Contract tests for API response shapes, payment provider webhooks, calendar provider responses, and embed configuration.
- Payment tests for successful charge, failed charge, refund, deposit, package purchase, membership recurring billing, and gift certificate redemption.
- Concurrency tests for simultaneous booking attempts, group class capacity enforcement, and package session deduction.
- Intake form tests for field validation, conditional logic, file upload, consent checkbox, and data encryption.
- Notification tests for email/SMS template rendering, timing accuracy, delivery failure handling, and retry logic.
- Group class tests for enrollment, capacity limit, waitlist promotion, and cancellation handling.
- Client portal tests for authentication, appointment viewing, rescheduling within policy, and package balance display.
- Accessibility tests for booking page screen reader labels, form field focus, dynamic type, and contrast.
- HIPAA tests for data encryption, access logging, BAA requirements, and PHI handling (if in scope).
- Billing tests for plan tiers, staff seat limits, feature gating, trial, and subscription lifecycle.

## Acceptance Criteria

- The app can be implemented with original branding while preserving the documented appointment scheduling workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers.
- Appointment types support configurable durations, prices, intake forms, and staff assignment.
- Client booking page shows real-time availability, collects intake responses, and processes payment.
- Packages track remaining sessions; memberships manage recurring access; gift certificates track balance.
- Group classes enforce capacity and manage waitlists.
- Automated notifications send on configurable triggers with customizable templates.
- Client self-service portal allows viewing, rescheduling, and canceling within business policy.
- Multiple staff and locations are supported with independent availability.
- All entities have owners, lifecycle states, and deletion/export behavior.
- At least 10 acceptance tests cover booking flow, payment, packages, memberships, group classes, notifications, client portal, intake forms, concurrency, and billing.
- Hands-on native parity remains blocked until manual verification blockers have recorded lawful evidence.

## Open Questions

- What is the exact HIPAA compliance scope and BAA implementation requirement?
- How does two-way calendar sync handle conflict resolution with external calendar changes?
- What are the exact cancellation policy enforcement rules (time-based, fee-based, staff-override)?
- Which payment providers are supported beyond Stripe/Square/PayPal?
- What is the Squarespace integration depth beyond iframe embedding?
- How does waitlist promotion handle partial group class cancellations?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, and analytics schema.
- Phase 2: Build onboarding, appointment type management, availability configuration, and basic client booking page.
- Phase 3: Add payment integration, intake form builder, calendar sync, and notification system.
- Phase 4: Add packages, memberships, gift certificates, group classes, staff management, and client portal.
- Phase 5: Complete payment, concurrency, intake form, notification, group class, accessibility, billing, and regression tests.
- Phase 6: Conduct lawful hands-on verification, HIPAA compliance review, and resolve manual blockers before parity claims.

## Next Steps

- Capture native iOS/Android screen evidence for schedule view, booking page, intake form builder, and payment flow.
- Record payment provider integration, HIPAA requirements, Squarespace embedding, and notification delivery in a dedicated research note.
- Confirm payment provider licensing, PCI compliance approach, and HIPAA scope before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
