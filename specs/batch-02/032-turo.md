# Turo-Style Clone Spec

> Metadata
> - Inspiration app: Turo
> - Category: Peer-to-peer car rental marketplace, guest booking, host listings, vehicle protection, trip check-in/out, delivery, payments, claims, and trust/safety
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Turo Help Center pages, Turo legal/privacy/policy pages, host protection pages, trust/safety pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, driver eligibility, license verification, search filters, quote/checkout, protection plan selection, payment authorization, host approval/instant booking, messaging, pickup/return, trip photos, vehicle delivery, airport rules, cancellation/refund, roadside assistance, damage claim, guest/host reviews, host listing setup, earnings/protection plan, taxes, push payloads, Apple TV surface, and regional insurance/vehicle availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, vehicle listings, host/guest data, photos, reviews, maps, pricing/ranking/risk models, payment providers, protection/insurance language, claims workflows, support scripts, and marketplace operations.

## Overview

Build an original peer-to-peer car rental marketplace inspired by Turo's public workflow: destination/date search, vehicle results, listing detail, host profile, trip quote, protection selection, checkout, host/guest messaging, pickup/return instructions, trip photos, cancellations/refunds, reviews, host listing tools, earnings/protection plans, roadside assistance, damage/claims support, privacy controls, and regional vehicle-sharing compliance.

The clone must not copy Turo branding, screenshots, marketing copy, vehicle listings, host profiles, photos, reviews, private APIs, pricing/ranking/risk models, insurance/protection claims, or support content. Functional parity should be expressed through original product language, licensed maps and payments, synthetic or licensed vehicle inventory, independently designed trust/risk logic, and jurisdiction-aware compliance.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first car-sharing marketplace with search, filters, map/list results, vehicle detail, quote, checkout, protection, trip management, messaging, pickup/return, trip photos, support, reviews, and privacy controls.
- Support host-facing V1 flows for listing setup, availability/calendar, pricing, delivery, vehicle eligibility, protection/earnings plan, guest communication, check-in/out, damage reporting, payouts, and support.
- Preserve marketplace trust expectations around driver eligibility, license verification, vehicle safety, host/guest commitments, insurance/protection limits, cancellation/refund rules, pickup/return evidence, damage claims, roadside assistance, nondiscrimination, fraud, taxes, and regional vehicle-sharing laws.
- Expose privacy controls for profile data, driver/license data, payment methods, location, trip history, messages, vehicle photos, damage evidence, data export, account deletion, and legal retention.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Turo-branded app or imply affiliation with Turo, hosts, guests, insurers, Travelers, roadside providers, airports, vehicle manufacturers, payment providers, tax authorities, or regulators.
- Do not scrape Turo, reuse private Turo APIs, copy listings/photos/reviews, clone proprietary ranking/pricing/risk systems, reproduce insurance/protection claims, or copy support/legal language.
- Do not process production vehicle rentals, license checks, payments, host payouts, taxes, insurance claims, damage reimbursements, roadside emergencies, airport permits, or vehicle telematics without separate legal, compliance, trust/safety, privacy, and provider review.
- Do not claim exact App Store, Play Store, native-device, booking, protection plan, payment, host approval, pickup/return, trip photos, damage claim, roadside, host listing, payout, support, push-notification, or regional parity until manual verification blockers are resolved.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/turo-car-rental-marketplace/id555063314 | Official iOS listing, Travel category, supported devices, car rental marketplace claims, hosts, delivery caveats, cancellation, roadside/support, protection, privacy labels, and accessibility notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.relayrides.android.relayrides | Official Android listing, package id, downloads/rating scale, marketplace positioning, countries, host/guest workflows, and data-safety orientation | Verified 2026-04-17 |
| Turo Help Center | https://turo.com/us/en/help | Canonical guest/host help topics for booking, protection, account, pickup/return, payment, trip changes, airport delivery, damage, vehicle eligibility, and roadside | Verified 2026-04-17 |
| Terms Of Service | https://turo.com/us/en/policies/terms | Marketplace intermediary role, eligibility, registration, verification, fees/taxes, guest/host commitments, protection plans, prohibited activities, and legal constraints | Verified 2026-04-17 |
| Privacy Policy | https://turo.com/us/en/policies/privacy | Personal data, driver/license, payment, trip, vehicle, messages, claims, retention, privacy rights, and deletion/export obligations | Verified 2026-04-17 |
| Cancellation Policy | https://turo.com/us/en/policies/cancellation | Guest cancellation, free cancellation period, partial refunds, no-shows, trip modifications, and refund decision rules | Verified 2026-04-17 |
| Community Guidelines | https://turo.com/us/en/policies/community-guidelines | Marketplace conduct, host/guest expectations, safety, communication, vehicle treatment, and enforcement | Verified 2026-04-17 |
| Nondiscrimination Policy | https://turo.com/us/en/policies/nondiscrimination | Anti-discrimination expectations for hosts/guests and marketplace enforcement | Verified 2026-04-17 |
| Trust And Safety | https://turo.com/us/en/car-rental/united-states/trust-and-safety | Host/guest safety positioning, screening, vehicle eligibility, reviews, emergency/support, private info handling, and liability/protection notes | Verified 2026-04-17 |
| Vehicle Protection For Hosts | https://turo.com/us/en/how-turo-works/vehicle-protection/ | Host earnings/protection plans, liability insurance, physical damage reimbursement, host share, photos, damage reporting, and plan caveats | Verified 2026-04-17 |
| Insurance And Protection | https://turo.com/us/en/car-rental/united-states/insurance/ | Host insurance/protection overview, liability, roadside, plan options, exclusions, and not-insurance caveats | Verified 2026-04-17 |
| Car Rental Marketplace | https://turo.com/us/en/car-rental/united-states | Public marketplace orientation for search, destinations, vehicle types, and rental positioning | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position Turo as a car rental/car sharing marketplace across the US, UK, Canada, Australia, and France, with local hosts, vehicle variety, pickup or delivery, host businesses, cancellation windows, roadside assistance, support, and host protection/insurance framing.
- Search must support destination, dates/times, pickup/return location, delivery/airport, vehicle type, price, seats, transmission, EV/fuel, features, host rating, discounts, protection availability, and map/list display.
- Results must render one canonical result model as map markers and list cards with price quote, vehicle type, host summary, rating, location/delivery, availability, discount, protection/eligibility caveat, and unavailable reason.
- Vehicle detail must support photos, title, make/model/year, host, pickup/delivery, mileage/distance limit, extras, rules, ratings/reviews, protection summary, cancellation policy, trip cost, taxes/fees, share/save, and report listing.
- Checkout must support account/driver eligibility, license verification, approved drivers, protection plan selection, total trip cost, taxes/fees, discounts, payment authorization, host approval/instant booking, and confirmation state.
- Trip management must support upcoming/current/past trips, pickup/return instructions, host messaging, trip modifications/extensions, cancellation/refund preview, roadside assistance, and support actions.
- Trip photos/check-in/out must capture vehicle condition, fuel/charge/mileage, location, timestamps, host/guest evidence, and damage claim eligibility while protecting privacy.
- Host tools must support listing creation, vehicle eligibility, photos, description, features/extras, calendar availability, pricing/discounts, delivery/airport settings, guest requirements, protection/earnings plan, messages, trip handoff, damage reporting, earnings, tax profile, and support.
- Protection/insurance language must be original and legal-reviewed; V1 must model plan selection, liability/physical damage caveats, deductibles/contribution amounts, exclusions, roadside fees, regional differences, and "not insurance" disclaimers where applicable.
- Reviews and marketplace safety must require completed trips, prevent fake/retaliatory/private-info reviews, support report/removal/appeal, and enforce nondiscrimination/community standards.

## Core User Journeys

- New guest signs up, searches destination/dates, filters vehicle type, opens map/list results, views vehicle detail, chooses protection, verifies license/payment, books, messages host, completes pickup, uploads trip photos, returns vehicle, reviews, and receives receipt.
- Returning guest modifies or cancels a trip, sees refund policy impact, requests extension, contacts roadside/support, and handles host cancellation or vehicle safety concern.
- Host creates a listing, verifies vehicle eligibility, uploads photos, configures availability/pricing/delivery/protection, publishes, receives booking, messages guest, checks guest in/out, and reports damage within required windows.
- Guest/host handles airport delivery, parking instructions, late pickup/return, mileage/fuel/charge reimbursement, cleaning/smoking issue, and support escalation.
- Damage case user uploads photos/evidence, receives liability/protection explanation, sees payment/claim status, and can appeal support decision.
- Privacy-focused user reviews profile, license/payment, trip history, messages, vehicle photos, data export, account deletion, and retention/legal hold caveats.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, terms, privacy | email, phone, OTP, legal links | new, returning, locked | verification fail, underage, blocked region |
| Search Form | Trip location/date setup | destination, dates, time, delivery | valid, editing, saved | invalid dates, unsupported city |
| Map/List Results | Vehicle marketplace results | filters, map pan, sort, save | results, map, list, no results | stale availability, hidden fees, provider outage |
| Vehicle Detail | Inspect car and host | photos, rules, host, quote, save | available, unavailable, shared | unsafe vehicle, removed listing, host suspended |
| Quote/Checkout | Book trip and protection | protection, payment, driver, confirm | instant, request, confirmed | license fail, payment fail, host timeout |
| Trips | Upcoming/current/past rentals | trip, modify, cancel, support | upcoming, active, past, canceled | host cancel, no-show, late return |
| Messages | Guest/host/support communication | text, attachments, thread actions | sent, read, support | delivery fail, blocked user, moderation |
| Pickup/Check-In | Start trip and evidence | photos, fuel, mileage, location | ready, checked in, disputed | unsafe car, no host, missing photos |
| Return/Check-Out | End trip and evidence | photos, fuel, mileage, location | returned, late, disputed | damage, mileage overage, fuel issue |
| Roadside/Support | Emergency and trip help | issue type, evidence, contact | submitted, escalated, resolved | emergency, legal hold, duplicate |
| Damage/Claims | Claims and reimbursement | evidence, estimate, decision | open, reviewing, resolved | missed deadline, disputed liability |
| Host Dashboard | Listings, trips, earnings | listing, calendar, message, payout | no listing, active, pending | payout hold, policy warning |
| Listing Editor | Host vehicle setup | vehicle, photos, rules, price | draft, published, paused | ineligible car, missing insurance |
| Earnings/Protection | Host plans and payouts | plan, payout, tax, earnings | selected, paid, held | region blocker, tax missing |
| Settings/Privacy | Account, payments, data, legal | toggles, export, delete | active, pending delete | active trip block, retention caveat |

## Data Model

- `User`: identity, phone/email verification, driver eligibility, license state, guest/host roles, privacy settings, support restrictions, export/delete lifecycle, and fraud flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, camera/photos permission, and last active state.
- `HostProfile`: public identity, verification badges, response stats, reviews, listings, protection plan, payout/tax state, and suspension state.
- `VehicleListing`: make/model/year, trim, type, seats, transmission, fuel/EV, features, photos, rules, delivery, airport, status, eligibility, and takedown state.
- `AvailabilityCalendar`: date/time inventory, minimum/maximum trip, advance notice, discounts, blocks, sync source, and stale-calendar state.
- `SearchQuery`: destination, coordinates/bounds, dates/times, delivery/airport, filters, locale, currency, and personalization context.
- `SearchResult`: listing id, rank, map marker, quote summary, availability, rating summary, host, delivery, saved state, and unavailable reason.
- `TripQuote`: trip price, trip fee, protection, delivery, taxes, discounts, extras, mileage/fuel/charge caveats, quote expiry, and jurisdiction display flags.
- `Reservation`: vehicle, guest, host, approved drivers, status, pickup/return, policy snapshot, quote snapshot, payment, cancellation/refund, and audit ids.
- `ProtectionPlan`: guest/host plan, region, liability/physical damage terms, deductible/contribution, exclusions, roadside fees, and effective booking date.
- `MessageThread`: participants, reservation/listing context, attachments, read receipts, support handoff, moderation state, delivery status, and retention.
- `TripInspection`: check-in/out photos, mileage, fuel/charge, location, timestamp, lock/key state, damage notes, and evidence retention.
- `DamageClaim`: reservation, issue, evidence, deadline, estimate, responsibility, reimbursement/payment, decision, appeal, and legal hold.
- `PaymentIntent`: authorization, capture, refund, deposit, reimbursement, host payout, failure state, and reconciliation.
- `SupportCase`: cancellation, refund, roadside, damage, safety, discrimination, payment, payout, listing, account, or privacy issue with evidence, owner, decision, appeal, and legal hold.
- `AuditEvent`: append-only record for auth, booking, pricing, payment, payout, protection, inspection, damage, support, privacy, and account changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify-phone`, `POST /identity/driver-license`, `DELETE /auth/session`: account and driver eligibility lifecycle with region, deletion, and restriction gates.
- `GET /search?destination=&lat=&lng=&dates=&filters=&cursor=`: vehicle discovery with ranking reason codes, quote snapshots, availability, map pins, pagination, and stale indicators.
- `GET /listings/:id`, `POST /listings`, `PATCH /listings/:id`, `PATCH /listings/:id/status`: listing reads/writes with host authorization, vehicle eligibility, moderation, and audit events.
- `GET /listings/:id/calendar`, `PATCH /listings/:id/calendar`: availability, blocks, discounts, lead times, sync source, version, and conflict errors.
- `POST /quotes`, `GET /quotes/:id`: trip quote generation with line items, protection, taxes/fees, delivery, quote expiry, and price-change warnings.
- `POST /reservations`, `GET /reservations`, `GET /reservations/:id`, `PATCH /reservations/:id`: instant/request booking, host approval, driver eligibility, policy snapshots, and trip details.
- `POST /reservations/:id/cancel`, `POST /reservations/:id/refund-preview`, `POST /reservations/:id/extend`: cancellation/refund/modification flows with policy engine and finality warnings.
- `POST /reservations/:id/check-in`, `POST /reservations/:id/check-out`, `POST /reservations/:id/photos`: pickup/return evidence, mileage/fuel/charge, and conflict handling.
- `GET /messages`, `GET /message-threads/:id`, `POST /message-threads/:id/messages`, `POST /message-threads/:id/attachments`: host/guest/support communication with moderation and retention.
- `GET /protection-plans`, `POST /protection-plans/select`: guest and host plan selection, region terms, effective dates, and legal caveats.
- `POST /payments/authorize`, `POST /payments/capture`, `POST /payments/refund`, `POST /payouts/webhooks`: payment, refund, reimbursement, payout, and idempotent reconciliation.
- `POST /damage-claims`, `GET /damage-claims/:id`, `POST /damage-claims/:id/evidence`, `POST /damage-claims/:id/appeal`: damage workflow, deadlines, decisions, and audit.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/escalate`: support, roadside, safety, cancellation, refund, payment, payout, and privacy cases.
- `POST /reviews`, `GET /reviews`, `POST /reviews/:id/report`: completed-trip reviews, moderation, response/removal, and appeal.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, active-trip constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Booking request, host approval/decline, cancellation, payment, message, trip modification, pickup/return, damage claim, support, roadside, payout, and review events use websocket/SSE/push-assisted polling with stable event ids.
- The client may cache recent searches, listing summaries, trip details, message drafts, inspection drafts, settings, and support drafts with freshness indicators.
- Offline mode may show cached trip details and preserve inspection photos locally, but booking, checkout, cancellation, payment, claim submission, support escalation, account deletion, and protection changes require server confirmation.
- Price quotes, availability, protection eligibility, delivery/airport rules, and taxes must expire and refresh before checkout confirmation.
- Push notifications must be opt-in and content-minimized for booking requests, confirmations, messages, pickup/return reminders, extension decisions, cancellation, support, damage, payout, review, and account security.

## Permissions, Privacy, And Safety

- Location, notifications, camera/photos for vehicle/trip evidence, files for support, contacts only if future sharing requires it, and device auth must be requested only when invoked.
- Default analytics must exclude precise pickup addresses, license images, payment credentials, private messages, vehicle photos, damage evidence, roadside details, payout/tax identifiers, and exact trip traces.
- Driver/license and protection data must be encrypted, access-controlled, purpose-limited, redacted from logs, and retained or deleted under legal/provider constraints.
- Host/guest communication must block off-platform payment, harassment, discrimination, private-data sharing, unsafe pickup/return demands, and policy evasion.
- Vehicle safety must require eligibility, inspections/photos, maintenance assertions, no open safety recall where launch policy requires, and roadside/emergency escalation.
- Protection, insurance, claims, taxes, payouts, airport permits, deposits, reimbursements, and chargebacks must be legal-reviewed and provider-backed; never trust client-only financial state.
- Launch owners: marketplace trust owner, legal/compliance owner, payments/payouts owner, protection/claims owner, safety/roadside owner, privacy owner, accessibility owner, and support owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, search performed, filter applied, listing opened, quote viewed, protection selected, booking requested, reservation confirmed, message sent, check-in started, check-out completed, support opened, damage claim opened, review submitted, data export requested, account deletion requested.
- Marketplace quality metrics must use object ids, reason codes, latency, provider status, quote freshness, inventory freshness, and failure codes rather than raw addresses, license data, payment data, private messages, or damage photos.
- Monetization can include original trip fees, host take rates, protection/provider fees, delivery fees, promoted listings, premium host tools, roadside partnerships, or insurance referrals later, but plan names, rates, claims, and Turo positioning must be original and legal-reviewed.

## Edge Cases

- First launch offline, unsupported OS, failed phone/email verification, driver ineligible, license expired, underage guest, blocked region, payment failure, or fraud hold.
- Search has unavailable dates, stale price, duplicate vehicle, unsafe/ineligible car, suspended host, unsupported airport, delivery not allowed, or hidden tax/fee.
- Host declines, misses response, cancels, swaps vehicle, changes pickup instructions, is unreachable, or vehicle is unsafe/dirty at pickup.
- Guest no-shows, returns late, exceeds mileage, returns low fuel/charge, damages vehicle, loses key, violates rules, adds unapproved driver, or uses vehicle commercially.
- Trip photos fail upload, offline check-in loses metadata, damage discovered after return, evidence deadline missed, claim disputed, or reimbursement exceeds limits.
- Roadside emergency, accident, theft, police report, discrimination, harassment, off-platform payment, privacy invasion, or unsafe vehicle requires escalation and legal hold.
- Account deletion conflicts with active trip, payment/refund, damage claim, insurance/protection claim, tax/payout record, support case, fraud investigation, or law-enforcement request.

## Test Plan

- Unit tests for search filters, availability conflicts, quote expiry, protection plan selection, cancellation/refund policy, driver eligibility, payment authorization, inspection state, damage deadlines, privacy-safe analytics, and permission states.
- Contract tests for auth, identity, search, listings, calendar, quotes, reservations, messages, inspections, protection, payments, damage claims, reviews, support, privacy, and webhook idempotency.
- Integration tests for signup, license verification, search/filter, listing detail, quote/checkout, booking request, host approval, messaging, pickup/check-in, return/check-out, cancellation, support, and privacy settings.
- Host tests for listing setup, vehicle eligibility, photos, pricing/calendar, delivery, protection plan, booking decision, guest messaging, inspection evidence, damage report, payout, and tax profile.
- Payment/protection tests for failed authorization, refund, deposit, reimbursement, payout hold, chargeback marker, protection exclusions, and duplicate webhook.
- Trust/safety tests for nondiscrimination, off-platform payment, unsafe vehicle, unapproved driver, late return, damage claim abuse, roadside emergency, harassment, fraud, and support escalation.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, photo upload, checkout comprehension, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, driver eligibility, license check, booking, protection, payment, host approval, pickup/return, trip photos, damage claim, roadside, host listing, payout, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Turo assets, private APIs, vehicle listings, host/guest data, photos, reviews, proprietary ranking/pricing/risk systems, protection claims, legal copy, or protected trade dress.
- Guests can search, filter, inspect vehicle listings, quote trips, choose protection, book, message host, check in/out with evidence, cancel with refund preview, get support, review, and recover from denied permissions or network loss.
- Hosts can create listings, manage availability/pricing/delivery, select protection/earnings plan, accept/decline bookings, message guests, check trips in/out, report damage, view earnings, and access support.
- Bookings, quotes, payments, protection, cancellations/refunds, inspections, damage claims, roadside/support cases, reviews, privacy rights, and account deletion are auditable server-side state machines.
- Driver/license data, vehicle evidence, payment/payout safety, nondiscrimination, protection/legal caveats, support evidence, data export, and account deletion controls are accessible from settings and covered by tests.
- Protection/insurance, driver eligibility, physical pickup/return, vehicle delivery, airport rules, claims, roadside, payout/tax, push payload, Apple TV, and regional features remain feature-flagged until legal/provider/manual verification clears them.

## Open Questions

- Which licensed map, payment, identity/license, insurance/protection, roadside, messaging, support, moderation, analytics, notification, payout, tax, and storage providers will back V1?
- Which launch regions determine driver eligibility, vehicle eligibility, protection plans, taxes, airport delivery, insurance, roadside, cancellation/refund policy, and host payout rules?
- Will V1 include real hosts/vehicles, a simulated marketplace, partner fleet, instant booking, airport delivery, protection plans, claims, and payouts at launch, or keep some behind feature flags?
- What retention applies to license data, trip photos, messages, GPS/pickup data, damage evidence, payment records, payout/tax records, and law-enforcement requests?

## Build Plan

- Phase 1: app shell, auth, search/date/location, map/list results, vehicle detail, saved listings, settings/legal links, privacy-safe analytics, and search/listing tests.
- Phase 2: quote, protection selection, checkout, payment authorization, booking request/confirmation, trips, messaging, cancellation/refund preview, and booking/payment tests.
- Phase 3: pickup/check-in, return/check-out, trip photos, host dashboard, listing editor, calendar/pricing, delivery settings, support cases, and host/trip tests.
- Phase 4: damage claims, roadside, reviews, trust/safety moderation, payout/tax profile, protection/earnings plans, privacy rights, accessibility audit, and claims/support tests.
- Phase 5: regional legal review, provider approvals, airport/insurance/roadside verification, native/manual trip verification, push payload validation, and launch-blocker burn-down.

## Next Steps

- Resolve provider and launch-region choices for maps, payments, identity/license, protection/insurance, roadside, payouts, taxes, support, and notifications.
- Complete lawful native and marketplace verification for booking, protection, payment, pickup/return, trip photos, claims, host tools, support, push payloads, and regional rules.
