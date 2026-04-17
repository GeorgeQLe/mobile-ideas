# Lyft-Style Clone Spec

> Metadata
> - Inspiration app: Lyft
> - Category: Rideshare, scheduled rides, bikes/scooters, rentals, transit, healthcare/assisted rides, safety tooling, and regulated transportation marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Lyft rider/help/safety/legal/privacy pages, pricing/cancellation documentation, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, phone/payment verification, ride request, upfront quote, Wait & Save/Priority/Green/XL/Black availability, driver matching, pickup verification, live trip tracking, scheduled rides, cancellation/no-show fees, tipping, Women+ Connect, Lyft Silver, bikes/scooters/rentals/transit, healthcare/assisted ride flows, safety toolkit, audio recording, ADT/check-in/PIN, push payloads, and regional ride-type availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, maps, routing, driver/rider data, trip data, price/risk/matching algorithms, payment providers, safety processes, support scripts, and marketplace operations.

## Overview

Build an original rideshare marketplace inspired by Lyft's public workflow: rider onboarding, pickup/dropoff search, upfront ride-type selection, driver matching, live trip tracking, scheduled rides, cancellation/no-show policy, ratings/tips, safety tools, Women+ Connect-like preferences, older-adult/assisted ride accommodations, bikes/scooters/rentals/transit handoffs, support, privacy controls, and regulated transportation safeguards.

The clone must not copy Lyft branding, screenshots, marketing copy, private APIs, driver/rider data, pricing/matching/risk models, maps, support scripts, or safety process details. Functional parity should be expressed through original product language, licensed maps and payments, independently designed dispatch/quote/risk logic, and jurisdiction-aware operations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first ride marketplace with onboarding, pickup/dropoff entry, ride options, upfront quote, request, match, pickup, trip tracking, cancellation/no-show fee preview, receipt, rating/tip, support, and privacy controls.
- Support V1 driver/operations abstractions for availability, quote acceptance, ETA, pickup verification, route progress, contact masking, cancellation, earnings, safety events, and assistance preferences.
- Preserve trust expectations around identity, payments, driver screening, rider verification, real-time ride monitoring, safety tools, location sharing, emergency support, cancellation/no-show fees, fraud, accessibility, service animals, and regional transportation rules.
- Expose privacy controls for precise/background location, trip history, payment methods, messages/calls, safety recordings, ad personalization, data export, account deletion, and legal retention.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Lyft-branded app or imply affiliation with Lyft, drivers, fleets, bikeshare systems, rental partners, healthcare transportation providers, ADT, insurers, or payment providers.
- Do not scrape Lyft, reuse private Lyft APIs, replay network traffic, copy driver/rider data, clone proprietary matching/pricing/risk/ETA systems, or reproduce legal/support copy.
- Do not process production rideshare payments, driver payouts, taxes, insurance claims, healthcare rides, assisted rides, minors, safety emergencies, audio recordings, or regulated taxi/TNC dispatch without separate legal, trust/safety, privacy, and provider review.
- Do not claim exact App Store, Play Store, native-device, ride request, pricing, matching, scheduled ride, safety, Women+ Connect, Silver/assisted, bikes/scooters, rentals, support, push-notification, or regional parity until manual verification blockers are resolved.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/lyft/id529379082 | Official iOS listing, Travel category, ride types, route/cost upfront claims, Wait & Save, Priority Pickup, bikes/scooters, transit, rentals, privacy labels, release notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=me.lyft.android | Official Android listing, package id, ads/data-safety orientation, downloads/rating scale, ride options, upfront route/cost, regional ride-type caveats | Verified 2026-04-17 |
| Lyft Rider Product | https://www.lyft.com/rider | Public rider product overview for ride request, rider experience, and availability orientation | Verified 2026-04-17 |
| Rider Help Center | https://help.lyft.com/hc/en-us/rider/articles/2872191865 | Canonical rider help inventory for request, ride types, cost estimates, tipping, sharing, airport info, accessibility, and regional resources | Verified 2026-04-17 |
| Ride Types | https://help.lyft.com/hc/en-us/articles/115012927427-Lyft-ride-types-overview | Ride product taxonomy, Wait & Save, Priority Pickup, Green, XL, Black, bikes/scooters, car seat, Access, Assisted, Silver Select, Pet, and region caveats | Verified 2026-04-17 |
| Pricing And Charges | https://help.lyft.com/hc/en-us/all/articles/115012925707-The-rider- | Upfront price inputs, route/destination change caveats, included fees, pending authorizations, and dispute paths | Verified 2026-04-17 |
| Cancellation And No-Show | https://help.lyft.com/hc/en-us/rider/articles/115012922687-Cancellation-policy-for-passenger | Cancellation/no-show fee cases, scheduled ride cancellation conditions, temporary authorization behavior, and dispute steps | Verified 2026-04-17 |
| Lyft Safety | https://www.lyft.com/safety | Platform safety positioning, background checks, rider verification, location sharing, audio recording, PIN verification, Women+ Connect, Silver, and Community Guidelines framing | Verified 2026-04-17 |
| Rider Safety | https://www.lyft.com/safety/rider | Rider-specific safety tools, scheduled check-in, PIN verification, favorite/block driver, real-time ride monitoring, and ADT limits | Verified 2026-04-17 |
| Driver Safety | https://www.lyft.com/driver/safety | Driver-side rider verification, support, safety, and marketplace trust signals | Verified 2026-04-17 |
| Privacy Policy | https://www.lyft.com/privacy | Personal data, location, trip, communications, safety, advertising, retention, rights, and deletion/export obligations | Verified 2026-04-17 |
| Terms Of Service | https://www.lyft.com/terms | Platform terms, account responsibilities, payments, disputes, service limits, and legal constraints | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and help pages position Lyft around destination entry, route and ride cost upfront, Wait & Save, Priority Pickup, bikes/scooters, XL, premium rides, transit, rentals, and regional product variation.
- Home must support pickup location, destination entry, saved places, recent rides, ride/product modules, account/profile, wallet, promotions, safety, and unavailable-region fallback.
- Ride request must support pickup pin adjustment, destination, stops, ride type, ETA, upfront price, fare details, payment method, promo/voucher, accessibility/service-animal notes, assistance preferences, and quote expiry.
- Ride products must model Standard, Wait & Save, Priority, Green, Extra Comfort, XL/XXL, Black/SUV, Pet, Access, Car Seat, Assisted, Silver-like, bikes/scooters, rentals, and transit as region/eligibility-gated products.
- Dispatch must model candidate drivers, acceptance/timeout, pickup ETA, vehicle/license plate, driver profile, rating, contact masking, PIN verification options, favorite/block driver behavior, and cancellation windows.
- Pricing must display upfront quote before request, fees/tolls/third-party charges where known, authorizations, quote changes from route/stops/destination/waiting, and cancellation/no-show fee previews.
- Safety toolkit must represent real-time monitoring, trusted contacts/location sharing, audio recording where legal, scheduled check-in, PIN verification, favorite/block driver, support, emergency escalation, and community-guideline enforcement.
- Assisted, healthcare, older-adult, car seat, access, pet, and women/nonbinary preference products must have legal/provider/operations review, explicit eligibility rules, and anti-discrimination safeguards.
- Bikes/scooters/rentals/transit must be separate product modules with provider availability, terms, pricing, unlock/return, parking, safety, and insurance/liability blockers.
- Account settings must expose profile, payment, ride history, notifications, safety, privacy/ad controls, support, terms, data export, and account deletion.

## Core User Journeys

- New rider signs up, verifies phone/payment, enters pickup and destination, compares ride options and upfront prices, requests a ride, matches with a driver, verifies vehicle details, completes the trip, tips, rates, and receives a receipt.
- Returning rider chooses Wait & Save or Priority, sees regional availability and price/wait tradeoff, shares ride location, and handles driver reassignment or cancellation.
- Rider schedules a future ride, receives reminders, favorites a trusted driver where supported, cancels within policy, or sees no-show/cancellation fee handling.
- Safety-focused rider configures trusted contacts, PIN verification, scheduled check-in, audio recording, and block/favorite driver preferences, then uses support after an incident.
- Rider uses a bike/scooter/rental/transit module, sees provider terms and availability, and handles handoff failure or region unavailability.
- Support user disputes a cancellation/no-show or fare, reports unsafe behavior, submits evidence, and receives an auditable decision.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, phone/email, terms, privacy | phone, email, OTP, legal links | new, returning, locked | OTP fail, underage, blocked region |
| Home/Pickup | Trip setup and saved places | pickup, destination, recenter, profile | current location, manual, no location | denied GPS, invalid pickup, venue rule |
| Ride Options | Compare products and prices | ride type, stops, payment, promo | quoted, expired, unavailable | high demand, quote changed, no cars |
| Request/Match | Driver assignment | request, cancel, contact | searching, matched, driver en route | timeout, driver cancel, fraud hold |
| Pickup | Verify driver and vehicle | PIN, call/text, pickup note | arriving, arrived, waiting | wrong car, no-show, unsafe pickup |
| Live Trip | Active ride tracking and safety | share, safety, contact, stop, cancel | active, rerouted, paused | off-route, crash signal, network loss |
| Safety Center | Safety preferences and tools | trusted contacts, PIN, audio, check-in | configured, active, disabled | region unavailable, permission denied |
| Receipt/Rating | Close trip and feedback | rating, tip, issue, receipt | completed, tipped, disputed | fare issue, failed payment, lost item |
| Scheduled Rides | Future ride management | time, pickup, product, cancel | scheduled, assigned, canceled | fee applies, no driver, region unavailable |
| Bikes/Scooters/Rentals | Adjacent mobility products | provider, unlock, reserve, return | available, active, completed | provider outage, parking issue, safety block |
| Accessibility/Assisted | Access, Silver-like, assisted preferences | assistance, vehicle, contact | eligible, requested, fulfilled | unavailable, policy conflict, provider block |
| Support | Fare, safety, lost item, account help | issue type, evidence, chat | submitted, reviewing, resolved | emergency, duplicate, legal hold |
| Settings/Privacy | Account, safety, data, notifications | toggles, export, delete, legal | active, pending delete | active trip block, retention caveat |

## Data Model

- `User`: identity, phone/email verification, locale, rider roles, accessibility/preferences, privacy settings, support restrictions, export/delete lifecycle, and fraud flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, audio-recording permission, safety capabilities, and last active state.
- `LocationPoint`: pickup/dropoff/stops, coordinates, address, venue rule, precision, access instructions, and accessibility notes.
- `RideProduct`: product type, capacity, wait/priority profile, accessibility/assistance flags, region availability, price rules, and feature flags.
- `RideQuote`: product, route estimate, upfront price, fees/tolls/surcharges, promo/voucher, payment method, expiry, and change caveats.
- `Trip`: rider, driver, product, route, status, quote snapshot, payment, cancellation/no-show, safety, support, receipt, and audit ids.
- `DriverProfile`: identity, photo, rating, vehicle, license plate, verification state, screening state, favorite/block state, and safety restrictions.
- `DispatchOffer`: candidate driver, ETA, acceptance deadline, cancellation reason, reassignment state, and fraud/risk signals.
- `SafetyPreference`: trusted contacts, PIN, audio, scheduled check-in, Women+ preference, favorite/block driver, and emergency/support settings.
- `AdjacentMobilitySession`: bike/scooter/rental/transit provider, quote, unlock/reserve/return state, parking, safety, and provider reconciliation.
- `PaymentIntent`: authorization, capture, refund, tip, voucher, failed state, and reconciliation.
- `SupportCase`: fare, cancellation/no-show, safety, lost item, payment, accessibility, or privacy issue with evidence, owner, decision, appeal, and legal hold.
- `AuditEvent`: append-only record for auth, trip, dispatch, payment, cancellation, safety, support, privacy, and account changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify-phone`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with verification, region, deletion, and restriction gates.
- `GET /home?lat=&lng=`, `GET /places/autocomplete`, `POST /locations/resolve`: pickup/dropoff setup with venue rules, accessibility hints, and provider errors.
- `GET /ride-products`, `POST /ride-quotes`: ride products, upfront quotes, fees/tolls, ETA, product availability, voucher, quote expiry, and limitation warnings.
- `POST /trips`, `GET /trips/:id`, `PATCH /trips/:id`: request, read, update destination/stops, cancellation, and server-owned trip state.
- `POST /dispatch/offers`, `PATCH /dispatch/offers/:id`: driver matching, acceptance, timeout, reassignment, and cancellation reason codes.
- `GET /trips/:id/tracking`, `POST /trips/:id/events`: trip progress, ETA, route changes, driver arrival, wait time, and reconciliation.
- `POST /trips/:id/contact`: masked rider/driver calls/messages with moderation, retention, and unsafe-contact blocks.
- `POST /trips/:id/cancel`, `POST /trips/:id/fare-review`: cancellation/no-show preview, final cancellation, fare dispute, and support handoff.
- `POST /safety/preferences`, `POST /safety/events`, `POST /safety/share-trip`, `POST /safety/audio-recordings`: safety preferences and events with region/legal gates and audit.
- `POST /mobility/sessions`, `PATCH /mobility/sessions/:id`: bike/scooter/rental/transit handoff with provider terms, quote, unlock/return, and reconciliation.
- `POST /payments/authorize`, `POST /payments/capture`, `POST /payments/refund`, `POST /payments/webhooks`: payment lifecycle with idempotency and reconciliation.
- `POST /ratings`, `POST /tips`, `GET /receipts/:id`: post-trip feedback, tipping, receipt, and metadata.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /appeals`: support workflow for ride, fare, safety, accessibility, lost item, payment, and privacy issues.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, active-trip constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Dispatch, driver ETA, driver arrival, trip start/end, route progress, cancellation/no-show, payment, safety, adjacent mobility, and support updates use websocket/SSE/push-assisted polling with stable event ids.
- The client may cache home, saved places, ride products, current trip, safety preferences, receipt summaries, settings, and support drafts with freshness indicators.
- Offline mode can show active trip snapshot and emergency guidance but must block new ride request, payment changes, cancellation finalization, safety report submission, adjacent mobility unlock/return, and privacy delete until reconnected.
- Quotes, driver availability, cancellation/no-show fees, and adjacent mobility availability must expire and refresh before confirmation.
- Push notifications must be opt-in and content-minimized for driver arrival, trip changes, cancellation/no-show, receipt, safety check-in, support, payment, scheduled rides, adjacent mobility, and account security.

## Permissions, Privacy, And Safety

- Location, background location, notifications, contacts for ride sharing, microphone for audio recording, camera/photos for evidence, and biometric/device auth must be requested only when invoked.
- Default analytics must exclude precise route trails, raw pickup/dropoff addresses, payment credentials, driver/rider phone numbers, audio recordings, support evidence, and private messages.
- Safety UX must show vehicle/license/driver checks, ride sharing, emergency paths, scheduled check-in, PIN verification, and support options without overclaiming prevention.
- Preference features such as Women+ Connect-like matching, older-adult services, assisted rides, healthcare transportation, accessibility, and service animals must be legal-reviewed for nondiscrimination, opt-in design, and provider obligations.
- Cancellations, no-shows, refunds, tips, vouchers, taxes, airport fees, driver payouts, and chargebacks must be auditable and provider-backed; never trust client-only financial state.
- Launch owners: marketplace dispatch owner, transportation compliance owner, payments owner, safety owner, privacy owner, accessibility/assisted rides owner, support owner, and fraud/risk owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, pickup set, destination searched, quote viewed, ride requested, driver matched, driver arrived, trip started/ended, safety opened, check-in scheduled, cancellation previewed, support opened, rating submitted, tip added, adjacent mobility started, data export requested, account deletion requested.
- Dispatch and pricing metrics must use coarse ids, product type, latency, quote freshness, match state, and failure code rather than raw addresses, exact GPS, or payment data.
- Monetization can include original ride marketplace fees, memberships, bike/scooter/rental partnerships, ads, healthcare/provider integrations, or premium support later, but pricing names, benefit claims, dispatch logic, and Lyft-specific positioning must be original and legal-reviewed.

## Edge Cases

- First launch offline, denied location, invalid phone, failed OTP, blocked payment, fraud hold, underage account, airport/venue restriction, or unsupported city.
- Pickup is inaccessible, driver cannot stop, rider is at wrong terminal, destination changes, service animal/accessibility issue arises, or assistance preference is unavailable.
- No drivers, repeated cancellations, driver mismatch, wrong vehicle, no-show, rider unsafe, route deviates, crash signal, or emergency support needed.
- Quote expires, fare changes due to route/stops/tolls, payment authorization fails, voucher invalid, scheduled ride has no driver, tip edit fails, or refund is disputed.
- Bike/scooter unlock fails, vehicle battery is low, parking is invalid, rental provider blocks, transit handoff unavailable, or provider terms are not accepted.
- Account deletion conflicts with active trip, payment dispute, safety investigation, insurance claim, tax record, legal hold, or law-enforcement request.

## Test Plan

- Unit tests for ride quote expiry, product availability, pickup/dropoff venue rules, cancellation/no-show preview, dispatch state machine, payment authorization, safety preferences, adjacent mobility state, privacy-safe analytics, and permission states.
- Contract tests for auth, locations, products, quotes, trips, dispatch, tracking, payments, safety, adjacent mobility, ratings, support, privacy, and webhook idempotency.
- Integration tests for signup, payment setup, ride quote, request, match, pickup verification, live tracking, cancellation/no-show, receipt/rating/tip, scheduled ride, support case, and privacy settings.
- Realtime tests for dispatch timeout, driver reassignment, ETA updates, destination edits, duplicate events, offline reconnect, and trip completion reconciliation.
- Safety tests for emergency flow, location sharing, PIN verification, audio recording region gate, scheduled check-in, unsafe report, blocked contact, accessibility/service-animal handling, and support escalation.
- Accessibility tests for screen reader labels, dynamic type, contrast, focus order, reduced motion, map/list alternatives, safety controls, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, live ride request, driver matching, pickup, safety toolkit, scheduled rides, Women+ Connect, Silver/assisted, bikes/scooters/rentals, support, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Lyft assets, private APIs, driver/rider data, proprietary matching/pricing/risk systems, safety process claims, brand copy, or protected trade dress.
- Riders can onboard, set pickup/dropoff, compare ride options, review upfront price, request, match, verify driver/vehicle, track trip, cancel with fee preview, pay, tip/rate, get receipt, and access support.
- Dispatch, quotes, payments, cancellations/no-shows, safety events, adjacent mobility sessions, support cases, privacy rights, and account deletion are auditable server-side state machines.
- Location privacy, contact masking, payment safety, ride sharing, emergency pathways, accessibility/assisted rides, fraud, fare review, data export, and account deletion controls are accessible from settings and covered by tests.
- Scheduled rides, Women+ Connect-like matching, Silver/assisted rides, bikes/scooters/rentals/transit, healthcare rides, audio recording, push payloads, airport, and regional features remain feature-flagged until legal/provider/manual verification clears them.

## Open Questions

- Which licensed map, routing, geocoding, payment, identity, background check, communication masking, safety-agent, insurance, bike/scooter/rental, analytics, notification, and support providers will back V1?
- Which launch cities determine ride products, airport rules, cancellation/no-show fees, accessibility requirements, TNC compliance, taxes, and insurance obligations?
- Will V1 include a driver app, fleet/admin tooling, scheduled rides, Women+ Connect-like preferences, assisted/healthcare rides, bikes/scooters/rentals/transit, or keep these behind feature flags?
- What retention applies to GPS traces, trip history, audio recordings, safety reports, support evidence, payment records, tax records, and law-enforcement requests?

## Build Plan

- Phase 1: rider app shell, auth/phone verification, pickup/dropoff search, ride products, quote service, wallet, settings/legal links, and privacy-safe analytics.
- Phase 2: dispatch simulator, driver profile/vehicle, request/match/pickup/trip tracking, cancellation/no-show preview, receipt/rating/tip, and trip tests.
- Phase 3: realtime reconciliation, masked contact, scheduled rides, support cases, fare review, payment webhooks, push categories, offline active-trip snapshot, and payment/support tests.
- Phase 4: safety center, trusted contacts, PIN verification, scheduled check-in, audio recording, accessibility/assisted ride preferences, adjacent mobility provider abstraction, and safety/accessibility tests.
- Phase 5: Women+ Connect-like matching, bikes/scooters/rentals/transit, healthcare integrations, regional compliance, provider approvals, and manual ride verification gates.

## Next Steps

- Resolve provider and launch-region choices for maps, payments, identity, masked contact, driver compliance, insurance, safety support, adjacent mobility, and notifications.
- Complete lawful native ride verification for request, matching, pickup, live trip, safety, scheduled rides, cancellation/no-show, support, push, and regional products.
