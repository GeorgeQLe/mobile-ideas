# Uber-Style Clone Spec

> Metadata
> - Inspiration app: Uber
> - Category: Rideshare, taxi, reserve rides, shared rides, rentals, delivery handoff, business travel, safety tooling, and regulated transportation marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Uber rider/help/safety/legal/privacy pages, Community Guidelines, upfront pricing documentation, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, payment setup, phone verification, ride request, upfront quote, driver matching, pickup verification, live trip tracking, driver/rider contact, cancellations/refunds, tipping, Uber One, Reserve, shared rides, teen/business profiles, rental/Connect/transit/charter surfaces, safety toolkit, audio recording, emergency/ADT flows, push payloads, and regional ride-type availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, maps, routing, driver/rider data, trip data, price/risk/matching algorithms, payment providers, safety processes, insurance claims, support scripts, and marketplace operations.

## Overview

Build an original rideshare marketplace inspired by Uber's public workflow: rider onboarding, pickup/dropoff search, upfront ride options and pricing, driver matching, live trip tracking, rider/driver contact, cancellations, receipts, ratings/tips, safety toolkit, scheduled rides, memberships, rentals/connect/transit handoffs, business profiles, support, privacy controls, and regulated transportation safeguards.

The clone must not copy Uber branding, screenshots, marketing copy, private APIs, driver/rider data, pricing/matching/risk models, maps, support scripts, or safety process details. Functional parity should be expressed through original product language, licensed maps and payments, independently designed dispatch/quote/risk logic, and jurisdiction-aware operations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first ride marketplace with onboarding, pickup/dropoff entry, ride options, upfront quote, request, match, pickup, trip tracking, cancellation, receipt, rating/tip, support, and privacy controls.
- Support V1 driver/dispatcher abstractions for availability, quote acceptance, ETA, pickup verification, route progress, contact masking, cancellation, earnings, and safety events without building a full driver app unless separately scoped.
- Preserve trust expectations around identity, payments, driver screening, safety toolkit, location sharing, emergency support, insurance, cancellation fees, fraud, accessibility, service animals, and regional transportation rules.
- Expose privacy controls for precise/background location, trip history, payment methods, messages/calls, safety recordings, ad personalization, data export, account deletion, and legal retention.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Uber-branded app or imply affiliation with Uber, drivers, fleets, taxis, rental companies, delivery merchants, public transit agencies, insurers, ADT, or payment providers.
- Do not scrape Uber, reuse private Uber APIs, replay network traffic, copy driver/rider data, clone proprietary matching/pricing/risk/ETA systems, or reproduce legal/support copy.
- Do not process production rideshare payments, driver payouts, taxes, insurance claims, safety emergencies, minors/teen rides, regulated taxi dispatch, airport operations, or audio recordings without separate legal, trust/safety, privacy, and provider review.
- Do not claim exact App Store, Play Store, native-device, ride request, pricing, matching, Reserve, shared ride, safety toolkit, emergency, rental, business, support, push-notification, or regional parity until manual verification blockers are resolved.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/uber-request-a-ride/id368677368 | Official iOS listing, Travel category, supported devices, ride types, upfront pricing, safety, Uber One, Reserve, rentals, Connect, transit, business, and privacy labels | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.ubercab | Official Android listing, package id, downloads/rating scale, ride products, upfront price, everyday travel, and data-safety orientation | Verified 2026-04-17 |
| Uber Ride | https://www.uber.com/us/en/ride/ | Public rider product overview for ride request, ride options, app workflow, pricing, and availability | Verified 2026-04-17 |
| Rider Help Center | https://help.uber.com/riders | Canonical support entrypoint for account, trip, payment, safety, cancellation, refund, and issue workflows | Verified 2026-04-17 |
| Rider Safety | https://www.uber.com/us/en/ride/safety/ | Safety toolkit, emergency button, ADT safety agent, Share My Trip, RideCheck, audio recording, PIN verification, number anonymization, driver screening, and support | Verified 2026-04-17 |
| Uber Safety | https://www.uber.com/us/en/safety/ | Platform safety principles, background checks, insurance, support, public safety portal, and location/phone privacy | Verified 2026-04-17 |
| Upfront Pricing | https://www.uber.com/us/en/marketplace/pricing/upfront-pricing/ | Upfront ride price display, rider clarity, route/destination/toll change caveats, and pricing transparency framing | Verified 2026-04-17 |
| Cancellation Help | https://help.uber.com/en/riders/article/cancelling-a-ride?nodeId=edf3d665-70c2-4e53-b890-00357de4012d | Rider cancellation steps, cancellation fee cases, wait-time and grace-period behavior, and region caveats | Verified 2026-04-17 |
| Community Guidelines | https://www.uber.com/legal/community-guidelines/us-en/ | Safety/respect/lawfulness expectations, platform access consequences, and behavior enforcement | Verified 2026-04-17 |
| Terms Of Use | https://www.uber.com/legal/en/document/?name=general-terms-of-use&country=united-states&lang=en | Platform terms, account responsibilities, payments, disputes, service limits, and legal constraints | Verified 2026-04-17 |
| Privacy Notice | https://www.uber.com/legal/en/document/?name=privacy-notice&country=united-states&lang=en | Personal data, location, trip, communications, safety, advertising, retention, rights, and deletion/export obligations | Verified 2026-04-17 |
| Cities Availability | https://www.uber.com/cities/ | Regional availability orientation for ride products and city-specific service gates | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position Uber around everyday rides, ride-type selection, upfront pricing, Reserve, shared/group/split fare concepts, Uber One benefits, rentals, delivery handoffs, Connect, transit, charter, business travel, and safety features.
- Home must support pickup location, destination entry, saved places, recent trips, ride/product modules, account/profile, wallet, promotions, safety, and unavailable-region fallback.
- Ride request must support pickup pin adjustment, destination, stops, ride type, ETA, upfront price, fare details, payment method, promo/voucher, accessibility/service-animal notes, business/personal profile, and quote expiry.
- Dispatch must model candidate drivers, acceptance/timeout, pickup ETA, vehicle/license plate, driver profile, rating, contact masking, PIN/verification options, and cancellation windows.
- Live trip must support driver arrival, wait timer, route progress, destination updates, stops, share trip, safety toolkit, emergency/help, contact, cancellation where allowed, and completion receipt.
- Pricing must display upfront quote before request, fees/tolls/surcharges where known, authorization holds, quote changes from route/stops/destination/tolls, and cancellation/no-show fee previews.
- Ratings/tips/receipts must support post-trip rating, issue tags, tip, fare review, receipt line items, business expensing, and support case creation.
- Safety toolkit must be represented as auditable product surfaces for emergency call, safety agent/contact, share trip, RideCheck-like anomaly detection, audio recording where legal, PIN verification, trusted contacts, and emergency contacts.
- Driver/marketplace operations must support driver screening status, document/vehicle verification, availability, acceptance, cancellation reasons, earnings, support, safety reports, and region-specific operating rules.
- Memberships, rentals, Connect, transit, teen, business, charter, and other non-core products must be feature-flagged until legal/provider/manual verification clears them.

## Core User Journeys

- New rider signs up, verifies phone/payment, enters pickup and destination, compares ride options, sees an upfront quote, requests a ride, matches with a driver, verifies vehicle details, completes the trip, tips, rates, and receives a receipt.
- Returning rider opens a saved destination, changes pickup pin, applies a voucher or business profile, requests priority or standard pickup, shares trip status, and handles driver cancellation/reassignment.
- Rider schedules a future ride, receives reminder/update, handles driver assignment, cancels within policy, or sees a fee preview if cancellation is late.
- Safety-focused rider opens the safety toolkit during a trip, shares location, uses PIN verification, reports an unsafe situation, or reaches emergency/support paths.
- Rider disputes a cancellation fee or fare, reviews receipt details, submits evidence, and receives support decision with audit history.
- Marketplace operator reviews driver/rider safety reports, cancellation abuse, fraud, payment failures, region blockers, airport rules, and support escalations.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, phone/email, terms, privacy | phone, email, OTP, legal links | new, returning, locked | OTP fail, underage, blocked region |
| Home/Pickup | Trip setup and saved places | pickup, destination, recenter, profile | current location, manual, no location | denied GPS, invalid pickup, airport rule |
| Ride Options | Compare ride products and quotes | ride type, stops, payment, promo | quoted, expired, unavailable | surge/high demand, quote changed, no cars |
| Request/Match | Dispatch and driver assignment | request, cancel, contact | searching, matched, driver en route | timeout, driver cancel, fraud hold |
| Pickup | Verify vehicle and driver | PIN, call/text, pickup note | arriving, arrived, waiting | wrong car, no-show, unsafe pickup |
| Live Trip | Active ride tracking and safety | share, safety, contact, stop, cancel | active, rerouted, paused | off-route, crash signal, network loss |
| Safety Toolkit | Emergency and trip safety tools | 911, safety agent, share, audio, report | available, recording, shared | region unavailable, permission denied |
| Receipt/Rating | Close trip and feedback | rating, tip, issue, expense | completed, tipped, expensed | fare dispute, failed payment, lost item |
| Trip History | Past/future rides and support | trip, receipt, help, rebook | upcoming, past, canceled | missing receipt, legal hold |
| Wallet/Promos | Payment, vouchers, memberships | card, wallet, voucher, Uber One-like | valid, pending, failed | authorization fail, expired promo |
| Reserve | Future ride scheduling | date/time, pickup, product, cancel | scheduled, assigned, canceled | fee applies, region unavailable |
| Business/Profile | Personal/business travel context | profile, expense code, policy | personal, business, managed | policy violation, missing approver |
| Support | Fare, safety, lost item, account help | issue type, evidence, chat | submitted, reviewing, resolved | emergency, duplicate, legal hold |
| Settings/Privacy | Account, safety, data, notifications | toggles, export, delete, legal | active, pending delete | active trip block, retention caveat |

## Data Model

- `User`: identity, phone/email verification, age/consent, rider roles, business profiles, privacy settings, support restrictions, export/delete lifecycle, and fraud flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, audio-recording permission, safety capabilities, and last active state.
- `LocationPoint`: pickup/dropoff/stops, coordinates, address, geofence, airport/venue rule, precision, and access instructions.
- `RideProduct`: product type, capacity, accessibility/service-animal notes, region availability, price rules, driver eligibility, and feature flags.
- `RideQuote`: product, route estimate, upfront price, fees/tolls/surcharges, promo/voucher, payment method, expiry, and change caveats.
- `Trip`: rider, driver, product, route, status, quote snapshot, payment, cancellation, safety, support, receipt, and audit ids.
- `DriverProfile`: identity, photo, rating, vehicle, license plate, verification state, screening state, region eligibility, and safety restrictions.
- `DispatchOffer`: candidate driver, ETA, acceptance deadline, cancellation reason, reassignment state, and fraud/risk signals.
- `SafetyEvent`: toolkit open, share trip, emergency call, ADT-like contact, RideCheck-like anomaly, audio recording, report, escalation, and outcome.
- `PaymentIntent`: authorization, capture, refund, tip, voucher, business expense, failure state, and reconciliation.
- `SupportCase`: fare, cancellation, safety, lost item, payment, account, accessibility, or privacy issue with evidence, owner, decision, appeal, and legal hold.
- `AuditEvent`: append-only record for auth, trip, dispatch, payment, cancellation, safety, support, privacy, and account changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify-phone`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with verification, region, deletion, and restriction gates.
- `GET /home?lat=&lng=`, `GET /places/autocomplete`, `POST /locations/resolve`: pickup/dropoff setup with geofencing, venue rules, and provider errors.
- `POST /ride-quotes`, `GET /ride-products`: ride products, upfront quotes, fees/tolls, ETA, product availability, voucher, quote expiry, and limitation warnings.
- `POST /trips`, `GET /trips/:id`, `PATCH /trips/:id`: request, read, update destination/stops, cancellation, and server-owned trip state.
- `POST /dispatch/offers`, `PATCH /dispatch/offers/:id`: driver matching, acceptance, timeout, reassignment, and cancellation reason codes.
- `GET /trips/:id/tracking`, `POST /trips/:id/events`: trip progress, ETA, route changes, driver arrival, wait time, and reconciliation.
- `POST /trips/:id/contact`: masked rider/driver calls/messages with moderation, retention, and unsafe-contact blocks.
- `POST /trips/:id/cancel`, `POST /trips/:id/fare-review`: cancellation preview, fee, final cancellation, fare dispute, and support handoff.
- `POST /payments/authorize`, `POST /payments/capture`, `POST /payments/refund`, `POST /payments/webhooks`: payment lifecycle with idempotency and reconciliation.
- `POST /safety/events`, `POST /safety/share-trip`, `POST /safety/emergency`, `POST /safety/audio-recordings`: safety event lifecycle with region/legal gates, retention, and audit.
- `POST /ratings`, `POST /tips`, `GET /receipts/:id`: post-trip feedback, tipping, receipt, and business expense metadata.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /appeals`: support workflow for ride, fare, safety, lost item, payment, and privacy issues.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, active-trip constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Dispatch, driver ETA, driver arrival, trip start/end, route progress, destination changes, cancellation, payment, safety, and support updates use websocket/SSE/push-assisted polling with stable event ids.
- The client may cache home, saved places, ride products, current trip, receipt summaries, settings, and support drafts with freshness indicators.
- Offline mode can show active trip snapshot and emergency guidance but must block new ride request, payment changes, cancellation finalization, safety report submission, and privacy delete until reconnected unless emergency local call is available.
- Payment authorizations, quotes, driver availability, and cancellation fees must expire and refresh before confirmation.
- Push notifications must be opt-in and content-minimized for driver arrival, trip changes, cancellation, receipt, safety, support, payment, Reserve reminders, and account security.

## Permissions, Privacy, And Safety

- Location, background location, notifications, contacts for trip sharing, microphone for audio recording, camera/photos for evidence, and biometric/device auth must be requested only when invoked.
- Default analytics must exclude precise route trails, raw pickup/dropoff addresses, payment credentials, driver/rider phone numbers, audio recordings, support evidence, and private messages.
- Safety UX must show vehicle/license/driver checks, share-trip controls, emergency paths, support options, and ride verification without overclaiming prevention.
- Driver/rider communications must use masked contact, harassment/off-platform payment blocks, evidence retention rules, and support escalation.
- Cancellations, refunds, tips, vouchers, taxes, airport fees, driver payouts, and chargebacks must be auditable and provider-backed; never trust client-only financial state.
- Launch owners: marketplace dispatch owner, transportation compliance owner, payments owner, safety owner, privacy owner, accessibility owner, support owner, and fraud/risk owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, pickup set, destination searched, quote viewed, ride requested, driver matched, driver arrived, trip started/ended, safety opened, share trip used, cancellation previewed, support opened, rating submitted, tip added, data export requested, account deletion requested.
- Dispatch and pricing metrics must use coarse ids, product type, latency, quote freshness, match state, and failure code rather than raw addresses, exact GPS, or payment data.
- Monetization can include original ride marketplace fees, memberships, business accounts, rental referrals, delivery handoffs, ads, or premium support later, but pricing names, benefit claims, dispatch logic, and Uber One positioning must be original and legal-reviewed.

## Edge Cases

- First launch offline, denied location, invalid phone, failed OTP, blocked payment, fraud hold, underage account, airport/venue restriction, or unsupported city.
- Pickup pin is inaccessible, driver cannot stop, rider is at wrong terminal, destination changes, multiple stops conflict, or service animal/accessibility need is mishandled.
- No drivers, repeated cancellations, driver mismatch, wrong vehicle, no-show, rider unsafe, route deviates, accident detected, or emergency support needed.
- Quote expires, fare changes due to route/stops/tolls, payment authorization fails, voucher is invalid, business profile policy blocks, tip edit fails, or refund is disputed.
- Push is disabled, phone dies, network drops mid-trip, GPS is stale, driver/rider contact fails, or trip completion event duplicates.
- Account deletion conflicts with active trip, payment dispute, safety investigation, insurance claim, tax record, legal hold, or law-enforcement request.

## Test Plan

- Unit tests for ride quote expiry, product availability, pickup/dropoff geofences, cancellation fee preview, dispatch state machine, payment authorization, tip/receipt, privacy-safe analytics, and permission states.
- Contract tests for auth, locations, products, quotes, trips, dispatch, tracking, payments, safety, ratings, support, privacy, and webhook idempotency.
- Integration tests for signup, payment setup, ride quote, request, match, pickup verification, live tracking, cancellation, receipt/rating/tip, support case, and privacy settings.
- Realtime tests for dispatch timeout, driver reassignment, ETA updates, destination edits, duplicate events, offline reconnect, and trip completion reconciliation.
- Safety tests for emergency flow, share trip, PIN verification, audio recording region gate, unsafe report, blocked contact, and support escalation.
- Accessibility tests for screen reader labels, dynamic type, contrast, focus order, reduced motion, map/list alternatives, safety controls, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, phone/payment, live ride request, driver matching, pickup, safety toolkit, Reserve, shared rides, membership, rentals, business, support, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Uber assets, private APIs, driver/rider data, proprietary matching/pricing/risk systems, safety process claims, brand copy, or protected trade dress.
- Riders can onboard, set pickup/dropoff, compare ride options, review upfront price, request, match, verify driver/vehicle, track trip, cancel with fee preview, pay, tip/rate, get receipt, and access support.
- Dispatch, quotes, payments, cancellations, safety events, support cases, privacy rights, and account deletion are represented as auditable server-side state machines.
- Location privacy, contact masking, payment safety, trip sharing, emergency pathways, accessibility, fraud, fare review, data export, and account deletion controls are accessible from settings and covered by tests.
- Reserve, shared rides, memberships, business, teen, rental, Connect, transit, audio recording, emergency-agent, push payload, airport, and regional features remain feature-flagged until legal/provider/manual verification clears them.

## Open Questions

- Which licensed map, routing, geocoding, payment, identity, background check, communication masking, safety-agent, insurance, analytics, notification, and support providers will back V1?
- Which launch cities determine ride products, airport rules, cancellation fees, accessibility requirements, taxi/TNC compliance, taxes, and insurance obligations?
- Will V1 include a driver app, fleet/admin tooling, Reserve, shared rides, membership, business travel, rentals, or keep these behind feature flags?
- What retention applies to GPS traces, trip history, audio recordings, safety reports, support evidence, payment records, tax records, and law-enforcement requests?

## Build Plan

- Phase 1: rider app shell, auth/phone verification, pickup/dropoff search, ride products, quote service, wallet, settings/legal links, and privacy-safe analytics.
- Phase 2: dispatch simulator, driver profile/vehicle, request/match/pickup/trip tracking, cancellation preview, receipt/rating/tip, and trip tests.
- Phase 3: realtime reconciliation, masked contact, support cases, fare review, payment webhooks, push categories, offline active-trip snapshot, and payment/support tests.
- Phase 4: safety toolkit, share trip, PIN verification, anomaly detection, emergency/support paths, accessibility audit, and safety/privacy tests.
- Phase 5: Reserve, memberships, business profiles, rentals/Connect/transit, driver/fleet tooling, regional compliance, and manual ride verification gates.

## Next Steps

- Resolve provider and launch-region choices for maps, payments, identity, masked contact, driver compliance, insurance, safety support, and notifications.
- Complete lawful native ride verification for request, matching, pickup, live trip, safety, cancellation, support, push, and regional products.
