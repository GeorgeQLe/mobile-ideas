# Lime-Style Clone Spec

> Metadata
> - Inspiration app: Lime
> - Category: Shared e-scooter/e-bike micromobility, vehicle discovery, unlock, ride zones, parking compliance, billing, safety, and city operations
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Lime Help Center pages, Lime safety/legal/privacy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, payment authorization, local pricing, vehicle map availability, QR/plate unlock, reserve, one-tap start, cable lock, group ride, pause, low-battery behavior, ride-zone speed restrictions, mandatory parking pins/stations, end-ride photo, penalties, accident reporting, LimePass/LimePrime, push payloads, wallet passes, city-specific rules, and physical vehicle behavior still require lawful test devices/accounts and provider/city approvals before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, maps, vehicle hardware integrations, fleet data, pricing, city permit data, safety rules, payment providers, support scripts, and operations workflows.

## Overview

Build an original shared micromobility app inspired by Lime's public workflow: account/payment setup, vehicle discovery on a map, reserve/unlock by QR or plate, ride-zone education, scooter/e-bike operation, pause, group ride, cable-lock/parking-station support, end-ride photo, parking compliance, billing, support, safety guidance, city rules, privacy controls, and fleet operations.

The clone must not copy Lime branding, vehicle hardware protocols, screenshots, private APIs, live fleet data, pricing, city contracts, support scripts, or safety copy. Functional parity should be expressed through original product language, licensed maps and payments, independently designed fleet operations, and jurisdiction-aware rules.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide mobile-first micromobility with onboarding, account/payment, vehicle map, reserve, unlock, ride, pause, group ride, ride zones, end ride, parking photo, billing, support, and privacy controls.
- Support V1 fleet operations for vehicle availability, battery, maintenance, retrieval, parking zones, city rules, fees/penalties, support cases, and safety incidents.
- Preserve trust expectations around age/ID requirements, payment authorization, helmet/safe riding, sidewalk bans, impaired riding, one rider per vehicle, no-parking/no-ride zones, accessibility, fraud, accident support, and city compliance.
- Expose privacy controls for precise/background location, ride history, payment methods, support evidence, ad/marketing preferences, data export, account deletion, and legal retention.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Lime-branded app or imply affiliation with Lime, Neutron Holdings, city agencies, universities, parking vendors, payment providers, insurers, or vehicle manufacturers.
- Do not scrape Lime, reuse private APIs, copy live vehicle data, clone hardware lock protocols, copy pricing, copy city rule data, or reproduce legal/support copy.
- Do not process production rides, payments, insurance claims, accident reports, city permit compliance, physical fleet control, or regulated telemetry without separate legal, operations, privacy, safety, provider, and city review.
- Do not claim exact App Store, Play Store, native-device, unlock, hardware, ride-zone, parking, pricing, penalty, support, push-notification, or city parity until manual verification blockers are resolved.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/lime-ridegreen/id1199780189 | Official iOS listing, Travel category, iPhone support, vehicle discovery, account/payment, QR/plate unlock, responsible riding, privacy labels, and version notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.limebike | Official Android listing, package id, downloads/rating scale, #RideGreen positioning, three-step start, data-safety orientation, and support contacts | Verified 2026-04-17 |
| Lime Help Center | https://help.li.me/hc/en-us | Canonical help topics for getting started, trouble with ride, account/payment, reporting, safety, and legal | Verified 2026-04-17 |
| How Lime Works | https://help.li.me/hc/en-us/articles/115004913928-How-Lime-works | Fleet scale, app download, nearby vehicle map, local riding/parking guidelines, QR unlock, local rates, and mission positioning | Verified 2026-04-17 |
| Starting Your Ride | https://help.li.me/hc/en-us/articles/115004745867-Starting-your-ride | Account/payment requirements, map vehicle discovery, reserve, one-tap start, QR/plate unlock, ride zones, and start failures | Verified 2026-04-17 |
| How To Ride | https://help.li.me/hc/en-us/articles/115004746027-How-to-ride-Lime-vehicles | Scooter/e-bike/LimeGlider operation, brake/throttle checks, one-rider rule, intoxication ban, and ride-zone education | Verified 2026-04-17 |
| Ending Your Ride | https://help.li.me/hc/en-us/articles/115004745967-Ending-your-ride | Parking pins, end-ride photo, upright/kickstand rules, incorrect parking warnings/penalties, and end-ride troubleshooting | Verified 2026-04-17 |
| Cable Lock | https://help.li.me/hc/en-us/articles/360039706294-Using-the-cable-lock | Cable lock unlock/lock workflow, bike rack rules, parking photo, and city regulation handling | Verified 2026-04-17 |
| Parking Stations | https://help.li.me/hc/en-us/articles/29147595964571-Using-a-parking-station | Parking station unlock/lock, helmet handling, automatic trip end, and Vancouver-specific availability | Verified 2026-04-17 |
| Group Ride | https://help.li.me/hc/en-us/articles/360035073193-Starting-a-Group-Ride | Unlock up to five vehicles, reserve duration, host agreement, lock all/end individually, and parking requirements | Verified 2026-04-17 |
| Pausing Your Ride | https://help.li.me/hc/en-us/articles/360017596953-Pausing-your-ride | Pause up to 15 minutes, continued charging, group ride limitation, and resume flow | Verified 2026-04-17 |
| Ride Costs And Rates | https://help.li.me/hc/en-us/articles/115004914208-Ride-costs-and-rates | Unlock fee, per-minute rates, rounding, city/university fees, local costs, insurance note, and end-ride billing caveat | Verified 2026-04-17 |
| Rules And Regulations | https://help.li.me/hc/en-us/articles/360001546234-Rules-and-regulations-for-riding-Lime | Age/ID requirements, traffic laws, one rider, intoxication ban, helmet guidance, and battery/brake safety | Verified 2026-04-17 |
| Safety Site | https://safety.li.me/ | Public safety education, responsible riding, helmet/parking guidance, and city-safety orientation | Verified 2026-04-17 |
| User Agreement | https://www.li.me/user-agreement | Terms, vehicle use, fees, city rules, safety, liability, and dispute orientation | Verified 2026-04-17 |
| Privacy Policy | https://www.li.me/legal/privacy-policy/ | Personal data, location, payment, ride, support, retention, privacy rights, and deletion/export obligations | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and help pages position Lime around downloading the app, account/payment setup, finding nearby e-bikes/e-scooters on a map, unlocking by QR/plate/app button, riding responsibly, local rates, and city-specific rules.
- Home must support location permission, manual map browsing, vehicle markers, battery/range, vehicle type, reserve, scan, ride zones, parking pins, account/payment, help, and no-vehicle/blocked-region states.
- Unlock must support QR scan, manual plate entry, reserved vehicle start, one-tap start where enabled, payment/preauthorization, local terms, damaged-code fallback, low-battery blocker, and hardware/provider errors.
- Ride mode must show timer, cost estimate, vehicle id, battery, speed/zone messages, pause, support, emergency/accident link, end ride, and city/rule reminders.
- Ride zones must model no-ride, slow, no-parking, mandatory parking, preferred parking, service area, and local rule zones with geofence confidence and map education.
- End ride must require valid parking, kickstand/upright state where applicable, cable/station lock where required, end-ride photo, network confirmation, charge finalization, and warning/penalty paths.
- Pricing must support unlock fee, per-minute fee, rounding, local permit/university fees, local costs, pause charges, group ride charges, preauthorization, credits/passes, refunds, and disputes.
- Group ride must support host account/payment, up to configured vehicle count, per-vehicle status, reserve duration, lock all, individual end, host liability acknowledgement, and blocked pause behavior.
- Fleet operations must support vehicle availability, battery, lock state, maintenance flag, retrieval, charging, damaged/unsafe report, incorrect parking report, city rules, and audit logs.
- Account settings must expose profile, payment, ride history, passes/credits, notifications, privacy, support, accident report, terms, data export, and account deletion.

## Core User Journeys

- New rider signs up, adds payment, grants or denies location, finds a nearby vehicle, reviews local rates/rules, scans QR, checks brakes/battery, rides, parks at a valid pin, takes a photo, and receives receipt.
- Rider reserves a vehicle for a short window, approaches it, starts with one tap or QR scan, handles damaged-code fallback, and sees reservation expiry.
- Rider enters a slow/no-ride/no-parking zone, sees speed or parking restrictions, reroutes, and ends the ride only in an allowed area.
- Rider pauses a ride, resumes within allowed time, sees continued charges, and handles unsupported group-ride pause.
- Group host unlocks multiple vehicles, tracks each rider, ends vehicles individually or all together, and handles one vehicle failing to lock.
- Rider cannot end because GPS/network/payment/parking fails, receives troubleshooting, contacts support, and gets billing correction path.
- Operations user reviews low-battery, badly parked, damaged, accident, and parking-penalty reports with vehicle telemetry and audit history.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, terms, privacy | phone/email, OTP, legal links | new, returning, locked | underage, blocked region, OTP fail |
| Payment Setup | Ride eligibility and preauthorization | card, wallet, promo, pass | valid, pending, failed | insufficient funds, expired card |
| Vehicle Map | Find vehicles and rules | location, pan, vehicle, zone | vehicles, no vehicles, no location | provider outage, stale vehicle, no service |
| Vehicle Detail | Inspect vehicle before ride | reserve, scan, rate, battery | available, reserved, unavailable | low battery, maintenance, damaged |
| Unlock Scanner | Start ride | QR, plate, flashlight, one-tap | scanning, unlocked, failed | unreadable QR, lock error, payment error |
| Ride Active | Timer, cost, rules, controls | pause, end, help, map | riding, slow zone, paused | no-ride zone, GPS weak, accident |
| Group Ride | Multi-vehicle management | add, reserve, lock all, end one | active, partial, completed | vehicle lost, one fails, host liability |
| Parking/End Ride | Validate parking and finish | parking pin, lock, photo, end | valid, confirming, ended | invalid zone, photo fail, no network |
| Ride Receipt | Cost and support | receipt, dispute, tip if any | paid, refunded, disputed | overcharge, preauth pending |
| Support/Accident | Help, billing, safety, reports | issue type, evidence, contact | submitted, reviewing, resolved | emergency, legal hold, duplicate |
| Fleet Ops | Vehicle operations | battery, location, maintenance, retrieval | active, low battery, damaged | stolen, inaccessible, unsafe |
| Settings/Privacy | Account, payments, data, legal | toggles, export, delete | active, pending delete | active ride block, retention caveat |

## Data Model

- `User`: identity, phone/email verification, age/ID state, locale, payment eligibility, passes/credits, privacy settings, export/delete lifecycle, and safety restrictions.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, camera permission, Bluetooth/local network, and last active state.
- `Vehicle`: id, type, battery, range, location, lock type, QR/plate, availability, maintenance, reservation, city program, and telemetry freshness.
- `RideZone`: geometry, type, speed limit, parking rule, local copy key, effective time, enforcement level, and provider/city source.
- `Reservation`: user, vehicle, start/end, expiry, pass eligibility, cancellation, and audit state.
- `RideSession`: user, vehicle(s), start/end, timer, route trace, zone events, pause events, pricing snapshot, parking photo, lock confirmation, and support ids.
- `GroupRide`: host, vehicles, per-vehicle rider alias, reservation, active status, end state, billing allocation, and host agreement.
- `PricingQuote`: unlock fee, per-minute rate, local fees, tax, pause charge, pass/credit, preauthorization, rounding rule, and expiry.
- `ParkingProof`: photo, location, zone, lock state, validation score, penalty state, review decision, and retention.
- `FleetEvent`: battery, unlock, lock, speed zone, crash/tilt, maintenance, retrieval, charging, relocation, and audit metadata.
- `SupportCase`: billing, unlock, end ride, parking, accident, damaged vehicle, payment, account, or privacy issue with evidence, owner, decision, appeal, and legal hold.
- `AuditEvent`: append-only record for auth, payment, unlock, ride, zone, parking, support, privacy, fleet, and account changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify-phone`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with verification, age, region, deletion, and restriction gates.
- `GET /vehicles?lat=&lng=&bounds=`, `GET /vehicles/:id`: vehicle availability, telemetry freshness, battery, lock type, city rules, and unavailable reasons.
- `GET /ride-zones?bounds=`, `GET /cities/:id/rules`: zone geometry, speed/parking/no-ride rules, local terms, and enforcement copy.
- `POST /reservations`, `DELETE /reservations/:id`: reserve vehicle with expiry, pass handling, cancellation, and stale-vehicle errors.
- `POST /rides/quote`: local pricing, unlock fee, per-minute rate, fees, pass/credit, preauthorization, and expiry.
- `POST /rides`, `PATCH /rides/:id`, `POST /rides/:id/pause`, `POST /rides/:id/resume`: unlock/start, active ride updates, pause/resume, zone event capture, and telemetry reconciliation.
- `POST /rides/:id/end`, `POST /rides/:id/parking-proof`: lock/end, parking validation, photo upload, final charge, and penalty/review state.
- `POST /group-rides`, `PATCH /group-rides/:id`, `POST /group-rides/:id/end`: multi-vehicle unlock, status, individual/all end, billing, and errors.
- `POST /payments/authorize`, `POST /payments/capture`, `POST /payments/refund`, `POST /payments/webhooks`: payment lifecycle with idempotency and reconciliation.
- `POST /fleet/events`, `PATCH /fleet/vehicles/:id`: vehicle telemetry, maintenance, retrieval, lock state, and operations audit.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /appeals`: support workflow for ride, billing, accident, parking, vehicle, payment, and privacy issues.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, active-ride constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Vehicle availability, reservation expiry, unlock, ride timer, zone entry/exit, pause/resume, end ride, parking validation, payment, fleet, and support updates use websocket/SSE/push-assisted polling with stable event ids.
- Client may cache map tiles, nearby vehicles, city rules, zones, active ride state, payment status, settings, and support drafts with freshness indicators.
- Offline mode may preserve active ride display and emergency guidance but must block new unlock, final end confirmation, parking proof publication, payment changes, support submission, and privacy delete until server confirmation.
- Ride charges continue until lock/end confirmation; UI must warn about network latency, phone battery, GPS accuracy, and no-confirmation billing risks.
- Push notifications must be opt-in and content-minimized for reservation expiry, ride still active, parking issue, charge/receipt, support decision, safety, pass renewal, and account security.

## Permissions, Privacy, And Safety

- Location, background location, camera for QR/photo/evidence, Bluetooth/local network for locks, notifications, and device auth must be requested only when invoked.
- Default analytics must exclude raw GPS traces, exact route history, payment credentials, parking photos, accident evidence, support content, and precise home/work inference.
- Safety UX must enforce one rider per vehicle, sober riding, helmet guidance, brake/battery checks, road rules, no sidewalk riding where prohibited, parking accessibility, and emergency/accident support.
- City rules, ride zones, parking penalties, local fees, age/ID requirements, and insurance/liability notes must be configuration-driven and legal-reviewed.
- Fleet telemetry and lock control must be authenticated, auditable, abuse-resistant, and resilient to replay, stolen vehicle, vandalism, and false parking reports.
- Launch owners: micromobility safety owner, city compliance owner, fleet operations owner, payments owner, privacy owner, accessibility/parking owner, and support owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, payment added, map viewed, vehicle selected, reserve started, unlock attempted, ride started, zone entered, pause started, end attempted, parking photo submitted, ride completed, support opened, data export requested, account deletion requested.
- Fleet metrics use vehicle ids, zone ids, battery, lock status, error codes, and maintenance categories, not raw user identity or exact route history in product analytics.
- Monetization can include original unlock/per-minute fees, passes, subscriptions, city programs, promotions, fleet partnerships, or ads later, but pricing, pass names, penalty structure, and Lime positioning must be original and legal-reviewed.

## Edge Cases

- First launch offline, denied location/camera, invalid phone, failed payment, underage/ID blocker, blocked city, no vehicles, stale vehicle, or unsupported OS.
- QR damaged, plate unreadable, vehicle low battery, lock jammed, vehicle not found, reservation expires, Bluetooth fails, or unlock succeeds but ride state is missing.
- No-ride/slow/no-parking zone entered, GPS drifts near boundary, city rule changes mid-ride, sidewalk ban warning needed, or parking pin is inaccessible.
- Phone dies, network drops, rider cannot end, parking photo fails, lock confirmation is delayed, preauthorization remains pending, or charge continues.
- Group ride has mixed vehicle states, one rider crashes, one vehicle fails to lock, host tries to pause, or payment method cannot cover all rides.
- Accident, damaged vehicle, theft, bad parking, ADA obstruction, underage riding, intoxication, vandalism, or support abuse requires escalation and audit preservation.
- Account deletion conflicts with active ride, payment dispute, accident investigation, city penalty, insurance claim, legal hold, or law-enforcement request.

## Test Plan

- Unit tests for vehicle availability, reserve expiry, unlock fallback, ride zone rules, end-ride validation, parking photo state, pricing/rounding, group ride state, privacy-safe analytics, and permission states.
- Contract tests for auth, vehicles, zones, pricing, reservations, rides, group rides, parking proof, payments, fleet events, support, privacy, and webhook idempotency.
- Integration tests for signup, payment setup, map vehicle selection, reserve, QR unlock, active ride, zone warnings, pause/resume, end ride, receipt, support case, and privacy settings.
- Realtime tests for vehicle state changes, reservation expiry, lock/unlock event duplication, zone entry, no network end attempt, reconnect reconciliation, and ride completion.
- Safety tests for age/ID blocker, one-rider rule, helmet/brake copy, no-ride/slow/no-parking zones, accident report, ADA parking obstruction, and support escalation.
- Accessibility tests for screen reader labels, dynamic type, contrast, focus order, reduced motion, map/list alternatives, scanner fallback, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, payment, real vehicle unlock, reserve, group ride, pause, cable lock, parking station, end-ride photo, penalties, passes, push payloads, city rules, and physical vehicle behavior.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Lime assets, private APIs, live fleet data, hardware protocols, pricing, city contracts, brand copy, or protected trade dress.
- Riders can onboard, add payment, find vehicles, reserve, unlock, ride, pause, understand zones, end with valid parking/photo, receive receipt, and recover from denied permissions or network loss.
- Vehicles, reservations, rides, zones, pricing, parking proof, payments, fleet events, support cases, privacy rights, and account deletion are auditable server-side state machines.
- Location privacy, payment safety, ride safety, city compliance, accessibility/parking, support evidence, data export, and account deletion controls are accessible from settings and covered by tests.
- Hardware unlock, cable lock, parking station, physical vehicle telemetry, city penalties, passes, push payloads, and regional rule parity remain feature-flagged until provider/city/manual verification clears them.

## Open Questions

- Which vehicle hardware, lock, fleet, map, geofence, payment, identity, support, analytics, notification, and city-rule providers will back V1?
- Which launch cities determine age/ID, helmet rules, sidewalk bans, parking pins, speed zones, fees, insurance, penalties, and fleet operations?
- Will V1 include physical vehicles, a simulated fleet, partner fleet integration, group ride, passes, parking stations, or keep these behind feature flags?
- What retention applies to GPS traces, parking photos, accident evidence, payment records, city penalty records, fleet telemetry, and law-enforcement requests?

## Build Plan

- Phase 1: app shell, auth/phone verification, payment setup, vehicle map, zone display, vehicle detail, settings/legal links, and privacy-safe analytics.
- Phase 2: reservation, QR/plate unlock abstraction, active ride, pricing, pause/resume, end ride, parking photo, receipt, and ride tests.
- Phase 3: fleet operations, vehicle telemetry, maintenance/retrieval, support cases, payment webhooks, push categories, offline active ride snapshot, and operations tests.
- Phase 4: group ride, cable lock, parking station, city rule engine, penalties/reviews, accessibility audit, and safety/compliance tests.
- Phase 5: physical hardware/provider integration, city approvals, passes/subscriptions, manual vehicle verification, and launch-blocker burn-down.

## Next Steps

- Resolve launch model: simulated fleet, partner fleet, or owned hardware, plus city/legal/provider requirements.
- Complete lawful device and physical vehicle verification for unlock, ride, zones, parking, billing, support, push payloads, and city rules.
