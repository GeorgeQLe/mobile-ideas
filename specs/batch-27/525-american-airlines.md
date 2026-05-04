# American Airlines-Style Clone Spec

> Metadata
> - Inspiration app: American Airlines
> - Category: airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, loyalty account, disruption support, notifications, airport services, and passenger-data privacy
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, help/support, privacy, legal/contract-of-carriage, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account creation/recovery, booking and payment, check-in, passport/APIS document capture, mobile boarding pass issuance, seat/bag/upgrade purchase, loyalty redemption, push notifications, location/airport-map permissions, disruption/rebooking outcomes, support outcomes, and region/route-specific availability require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary fares/inventory, private APIs, customer records, airport/airline operational feeds, loyalty data, payment processor contracts, or unlicensed datasets.

## Overview

Build an original mobile product inspired by American Airlines's public product, support, policy, and marketplace materials. V1 focuses on flight search, booking shell, trip retrieval, check-in state, mobile boarding pass placeholder, seats/bags/extras, loyalty account, flight status, notifications, airport guidance, disruption handling, support, privacy, and accessibility. The clone must use original branding, original UI copy, synthetic itineraries, licensed providers, and explicit manual blockers for behavior that requires account, airport, route, document, payment, or regulated verification.

This spec is implementation-ready for a public-source V1. Behavior marked manual verification required must stay behind feature flags, simulator stubs, or documented blockers until lawful device/account evidence confirms exact native behavior.

## Goals

- Provide secure onboarding, guest trip lookup, account recovery, profile, support, export/delete, and accessibility flows.
- Support flight search, fare display, booking handoff, trip management, check-in readiness, boarding pass state, seats/bags/extras, loyalty account, flight status, airport guidance, and disruption support.
- Preserve boundaries between passenger, account, loyalty, booking, ticket, flight segment, check-in, travel document, boarding pass, ancillary purchase, payment, baggage, notification, support, and audit records.
- Model guest, signed-in, booking-found, booking-missing, ticketed, check-in-open, document-required, boarding-pass-issued, airport-control, delayed, canceled, reaccommodation-needed, refunded, and restricted states.
- Require passenger-data privacy, payment correctness, aviation/legal disclosures, travel-document handling, fraud controls, accessibility, support, and operational-data licensing blockers before launch.
- Keep downstream scaffold repositories private and avoid parity claims until manual blockers are resolved.

## Non-Goals

- Do not imply affiliation with American Airlines or its publisher.
- Do not copy proprietary screens, brand assets, marketing copy, private endpoint shapes, fare logic, seat maps, loyalty rules, operational feeds, customer data, or airport maps.
- Do not sell real tickets, issue boarding passes, alter reservations, process real payments, scan passports, or connect production airline/GDS/payment/airport systems without separate legal, compliance, provider, and security approval.
- Do not treat public marketplace blurbs as proof of exact native screen order, route availability, fare math, disruption handling, support resolution, or airport acceptance.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product/app page | https://www.aa.com/i18n/customer-service/support/mobile-app.jsp | Public mobile-app positioning, trip workflow, booking/check-in surfaces, loyalty framing, support entry points, and app capability claims | Verified 2026-05-04 |
| Support/help center | https://www.aa.com/i18n/customer-service/contact-american/american-customer-service.jsp | Public support taxonomy for booking, trips, check-in, seats, bags, disruption, refunds, loyalty, accessibility, and account lifecycle flows | Verified 2026-05-04 |
| Privacy policy | https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp | Passenger, contact, payment, travel-document, location, device, analytics, support, retention, and privacy-rights handling | Verified 2026-05-04 |
| Terms / contract of carriage | https://www.aa.com/i18n/customer-service/support/conditions-of-carriage.jsp | Passenger obligations, ticketing, check-in, baggage, refunds, delays/cancellations, liability, and legal boundaries | Verified 2026-05-04 |
| Legal/customer commitment | https://www.aa.com/i18n/customer-service/support/legal.jsp | Accessibility, customer commitment, operational-disruption, refund, passenger-rights, and legal notice framing | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/american-airlines/id382698565 | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.aa.android | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, account/login, booking/payment, check-in, passport/APIS capture, boarding pass issuance, push payloads, airport-map behavior, support outcomes, and route-specific availability | Blocked pending lawful device/account verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest mode, account sign-in, loyalty enrollment prompt, trip lookup, recovery, unavailable route/region, and provider outage states.
- Account and loyalty surfaces must separate profile, preferences, saved travelers, payment methods, loyalty balance/status, certificates/credits where supported, and privacy settings.
- Flight search must model origin/destination, dates, passengers, cabin, fare family, award/cash mode where supported, filters, sold-out state, and stale-price refetch.
- Booking shell must show itinerary, fare/tax/fee disclosure, passenger details, seat/bag/extras offers, payment state, confirmation, and post-booking recovery without connecting to real ticketing.
- Trip management must expose upcoming, past, canceled, delayed, changed, rebookable, refund-requested, partially flown, and airport-control states.
- Check-in readiness must distinguish not-open, open, document-required, payment-due, seat-required, bag-prompted, boarding-pass-issued, airport-agent-required, and blocked states.
- Boarding pass placeholders must include route, passenger, sequence, zone/group, seat, gate, time, barcode-disabled simulator state, offline cache rules, and refresh/revocation behavior.
- Seat, bag, upgrade, and ancillary flows must distinguish available, unavailable, paid, pending, failed, refunded, waitlisted, operationally reassigned, and provider-owned states.
- Flight status must reconcile scheduled, estimated, delayed, boarding, departed, arrived, canceled, diverted, gate changed, baggage carousel, and connection risk states.
- Airport guidance must request location or Bluetooth only when needed and provide non-location fallbacks for maps, terminal, lounge, bag drop, and connection guidance.
- Provider calls require scoped credentials, redacted logs, idempotency keys, retry policies, canonical refetch, retention limits, and user-visible recovery.
- Analytics must avoid raw passenger data, passport/APIS values, payment credentials, exact location trails, loyalty identifiers, support attachments, and operationally sensitive records.
- Passenger-data privacy, payment/booking correctness, travel-document handling, aviation/legal disclosures, loyalty-program boundaries, fraud/account-takeover controls, accessibility, support, and operational-data licensing are launch-blocking risk areas with named owners.
- Manual verification required: native permission prompts, marketplace privacy labels, booking/payment, check-in, boarding pass, document capture, seat/bag/extras, push payloads, disruption recovery, support outcomes, and regional/route availability.

## Core User Journeys

- New user opens guest mode, searches a flight, reviews fare disclosure, and reaches a simulated booking confirmation without unsupported permissions.
- Returning user signs in, views AAdvantage status, retrieves an upcoming trip, and sees current flight and check-in readiness.
- User looks up a trip by confirmation code and surname, handles no-match, canceled, changed, and airport-control states.
- User starts check-in, resolves passenger details, travel document prompts, seat/bag prompts, and receives a simulator boarding pass or an airport-agent-required blocker.
- User changes seat, adds a bag or ancillary, handles payment failure, refund state, unavailable inventory, or operational reassignment.
- User receives flight delay, gate change, boarding, baggage, connection, or disruption notification and can recover from stale/offline state.
- User requests support, refund help, accessibility assistance, special-service information, data export, or account deletion and receives durable case state.
- Manual verification required: exact booking, payment, check-in, document, boarding pass, airport map, loyalty redemption, support, push, and route-specific native behavior.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Mode Select | Guest, sign-in, enrollment, and trip lookup entry | taps, deep links, locale | signed-out, loading, guest, signed-in | unsupported region, stale app version, provider outage |
| Auth / Recovery | Sign in, MFA, account recovery, loyalty enrollment | forms, OTP, biometrics, recovery links | empty, submitting, verified, locked | OTP expired, suspicious login, duplicate account |
| Search Flights | Search routes, dates, passengers, cabin, cash/award mode | forms, filters, calendar | results, empty, loading, stale | sold out, route disabled, stale price |
| Booking Review | Itinerary, fare, passenger, seats, bags, payment, confirmation | forms, payment, disclosure acceptance | ready, submitting, confirmed | payment failed, fare changed, ticketing failed |
| Trips / Timeline | Upcoming and past trips with status | tabs, refresh, deep links | empty, loading, loaded, stale | canceled, delayed, airport-control, rebook needed |
| Trip Detail | Segment, passenger, seat, bag, services, support | reservation id, refresh | scheduled, changed, checked-in, completed | partial flown, duplicate booking, missing traveler |
| Check-In | Eligibility, documents, seat/bag prompts, boarding pass | passenger data, documents, forms | not-open, open, complete, blocked | APIS required, agent required, payment due |
| Boarding Pass | Offline pass placeholder and refresh state | trip id, wallet action, refresh | issued, cached, refreshed, revoked | barcode disabled, gate changed, expired pass |
| Seats / Bags / Extras | Select ancillaries and manage purchases | seat map, bag count, payment | available, selected, paid, pending | unavailable, reassigned, refund pending |
| Flight Status / Airport | Flight status, terminal, gate, map, baggage, connection | flight number, location, filters | scheduled, boarding, arrived, mapped | diverted, gate change, location denied |
| Alerts / Messages | Travel, security, marketing, support, and disruption alerts | toggles, quiet hours, categories | opted-in, opted-out, denied, muted | push token expired, duplicate alert |
| Support / Refund | Help articles, cases, refunds, disruption, accessibility | search, attachments, case forms | draft, submitted, in-review, resolved | duplicate case, legal hold, unsafe attachment |
| Settings / Privacy | Profile, travelers, payments, loyalty, legal, export/delete | toggles, links, destructive actions | loaded, saving, pending delete, exported | active trip, legal hold, provider disconnect failed |
| Accessibility / Localization | Language, dynamic type, screen-reader, reduced motion | locale, font, motion, contrast | default, customized, reduced-motion | truncated fare text, unsupported locale, contrast failure |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, retention policy, deletion/export behavior, fraud flags, and audit metadata.
- `AccountSession`: device binding, MFA status, suspicious-login signals, token expiry, and revocation history.
- `LoyaltyAccount`: program id, tier/status, balance placeholder, certificates/credits, linked travelers, and privacy rules.
- `TravelerProfile`: name, contact, secure traveler fields, assistance needs, document references, retention class, and export/delete behavior.
- `TravelDocument`: redacted passport/APIS reference, validation status, expiry, issuing country, retention policy, and manual verification blocker.
- `SearchQuery`: origin, destination, dates, passengers, cabin, cash/award mode, filters, and cache metadata.
- `FareOffer`: itinerary, fare family, taxes/fees, availability, quote expiry, disclosure version, and provider owner.
- `Booking`: confirmation code, travelers, segments, ticketing status, payment status, disruption state, and support linkage.
- `FlightSegment`: flight number, airports, times, aircraft placeholder, gate, terminal, status, and operational update source.
- `CheckInState`: eligibility, open/close window, document needs, seat/bag prompts, boarding-pass state, and airport-control blocker.
- `BoardingPass`: passenger, segment, group/zone, seat, gate, offline cache, barcode-disabled simulator flag, and revocation state.
- `SeatAssignment`: cabin, seat, availability, payment status, operational reassignment, refund state, and accessibility flags.
- `BagRecord`: allowance, purchased bags, tags, tracking placeholder, status, carousel, and support case linkage.
- `AncillaryPurchase`: product type, price, payment state, provider owner, fulfillment state, refund rules, and receipt.
- `PaymentInstrument`: token reference, verification status, provider owner, expiry, billing address, and deletion rules.
- `DisruptionCase`: delay/cancel/divert event, rebooking options, refund eligibility, support status, and traveler notification state.
- `SupportCase`: consented support access, attachments, category, status, staff actions, and resolution.
- `NotificationPreference`: category, channel, quiet hours, OS permission, and opt-in evidence.
- `PrivacyRequest`: export/delete type, legal hold, active-trip exception, fulfillment state, and evidence links.
- `AuditEvent`: append-only record for sensitive writes, booking changes, provider calls, support access, and disclosure acceptance.
- `LocalCacheRecord`: offline cache state, TTL, purge trigger, sync attempt, and conflict resolution.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle with device-scoped audit events.
- `GET /profile`, `PATCH /profile`, `GET /loyalty`, and `PATCH /travelers/:id` for profile, loyalty, saved travelers, and preferences.
- `GET /airports`, `GET /routes`, `POST /flight-searches`, and `GET /fare-offers/:id` for route discovery and quote/fare availability.
- `POST /bookings/simulated`, `GET /bookings/:id`, `PATCH /bookings/:id`, and `POST /bookings/:id/cancel-request` for simulated booking lifecycle.
- `POST /trip-lookup`, `GET /trips`, `GET /trips/:id`, and `GET /trips/:id/timeline` for reservation retrieval and trip state.
- `GET /trips/:id/check-in`, `POST /trips/:id/check-in/start`, `POST /trips/:id/documents`, and `POST /trips/:id/check-in/complete` for gated check-in simulation.
- `GET /boarding-passes/:id`, `POST /boarding-passes/:id/refresh`, and `POST /boarding-passes/:id/wallet-token` for boarding-pass placeholder and wallet handoff.
- `GET /seat-maps/:segmentId`, `POST /seat-assignments`, `POST /bags`, `POST /ancillaries`, and `POST /payments/simulated` for seats, bags, extras, and payment simulation.
- `GET /flight-status`, `GET /airport-guidance`, `PATCH /notification-preferences`, `POST /support/cases`, `POST /refund-requests`, `POST /data-export`, and `GET /data-export/:id` for status, airport, alerts, support, refunds, and privacy lifecycle.
- Provider webhooks must include idempotency keys, signature validation, redacted payload logging, retry semantics, and canonical refetch after booking, payment, check-in, boarding-pass, baggage, disruption, or loyalty events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, disruption review, refund handling, account restriction, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, fare logic, loyalty logic, or proprietary schemas from American Airlines.

## Realtime, Push, And Offline Behavior

- Cache trips, boarding pass placeholders, flight status, airport guidance, settings, legal links, support articles, and in-progress check-in with explicit TTL and purge rules.
- Offline mode allows safe cached reads and low-risk support drafts but blocks booking, payment, check-in submission, travel-document capture, boarding-pass issuance, seat/bag purchases, provider calls, and irreversible deletes.
- Reconnect must refetch canonical server state, de-duplicate submissions with idempotency keys, and show whether fares, seats, bags, gates, boarding times, or disruption states changed.
- Push notifications are opt-in by category and limited to account/security, check-in, flight status, gate, boarding, baggage, disruption, support, and marketing where allowed.
- Long-running workflows use polling, SSE, websocket, or provider webhook fallback with timeout, cancel, retry, and escalation states.
- Cached documents, passenger records, boarding-pass placeholders, payment references, support attachments, location traces, and activity records purge on logout, account delete, retention expiry, policy change, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, biometrics, camera/document scan, location, Bluetooth, calendar, wallet, files/photos, or provider OAuth only at feature use and with a clear fallback.
- Permission screens must explain what is captured, where it is processed, retention, support access, and what remains available if denied.
- Passenger-data owner must approve profile, saved traveler, passport/APIS, secure traveler, special-service, minor traveler, and data-retention flows before launch.
- Payments/booking owner must approve fare quote, ticketing simulation, seat/bag/ancillary purchase, refund, payment, and ledger reconciliation tests before launch.
- Security owner must approve MFA, device binding, account takeover detection, document redaction, wallet tokenization, webhook signatures, and redacted logs.
- Legal/regulatory owner must approve contract-of-carriage, passenger-rights, refunds, baggage liability, accessibility, privacy, marketing, loyalty, and regional/route availability copy.
- Support access to passenger, booking, payment, loyalty, travel-document, and support records requires user consent, role-based controls, and auditable staff access.
- Export/delete must cover account data, profile, travelers, trips, payments, alerts, support cases, provider tokens, and legally deletable audit records while preserving legal holds and active-trip exceptions.
- Safety copy must warn about simulated booking limitations, travel-document sensitivity, airport-agent-required states, stale operational data, refund limits, and offline boarding-pass risks.
- Analytics, crash logs, and support tooling must redact raw PII, passport/APIS values, payment credentials, loyalty identifiers, support attachments, and exact location trails.

## Analytics And Monetization

- Analytics events: onboarding started/completed, trip lookup submitted, search performed, fare viewed/refreshed/expired, booking simulated, check-in started/blocked/completed, boarding pass viewed, seat/bag/extra selected, flight status viewed, support case submitted, export/delete requested, and notification preference changed.
- Event properties must use coarse route region, cabin class, product type, latency bucket, error code, disclosure version, check-in state, disruption state, and region class only.
- Monetization may include booking fees, ancillaries, seat fees, bags, loyalty offers, subscriptions, referrals, co-brand offers, hotel/car/insurance partners, or advertising only after legal, tax, consumer-protection, and disclosure review.
- Payment logic must handle pending, authorized, captured, failed, reversed, refunded, charged back, settled, expired, provider-owned, and region-blocked states.
- Paywalls, fees, or account restrictions must not block safety reporting, accessibility assistance, account recovery, export/delete, privacy settings, refund/disruption support, or legally required disclosures.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable route, sold-out flight, blocked account, or stale app version.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate webhooks, timeout retry, fare expiry, schedule change, gate change, stale optimistic state, and idempotency-key replay.
- Airport, route, fare, seat, bag, ancillary, check-in, loyalty, or payment provider becomes unavailable, invalid, closed, restricted, expired, or region-blocked during a workflow.
- Travel document validation fails, enters manual review, expires, requires resubmission, or conflicts with passenger profile.
- Booking, payment, check-in, boarding pass, seat/bag purchase, refund, disruption, or support case is interrupted by app termination.
- User requests export/delete while active trips, tickets, refunds, disputes, chargebacks, legal holds, or support cases remain active.
- Uploaded documents/support attachments contain third-party data, minors, health data, financial data, copyrighted material, or confidential material.
- Provider outage occurs after the user confirms an action but before canonical state is persisted.
- User attempts fraud, account takeover, fare abuse, loyalty abuse, refund abuse, unsafe document sharing, phishing, or prohibited travel behavior.
- Device storage fills, cache corrupts, token expires, clock skew occurs, webhook order changes, or reconnect creates conflicting state.
- Airline, airport, government, payment provider, app store, loyalty program, or support policy disables a feature after data has been cached locally.

## Test Plan

- Unit tests for route/date validation, fare expiry, booking state machines, idempotency keys, disclosure versioning, provider error mapping, and analytics redaction.
- Unit tests for profile/traveler validation, document redaction, check-in eligibility, boarding-pass cache state, refund/disruption eligibility, and deletion/export rules.
- Contract tests for auth, profile, loyalty, search, fare offers, bookings, trips, check-in, boarding passes, seats, bags, payments, status, airport guidance, support, privacy, and provider webhook routes.
- Integration tests for onboarding -> search -> fare -> simulated booking -> trip -> check-in -> boarding pass -> support/settings/delete.
- Integration tests for permission denial, unsupported route, provider timeout, fare refresh, stale operational data, document blocker, payment failure, and support escalation.
- Offline tests for cached trip/boarding pass reads, draft preservation, blocked regulated writes, reconnect reconciliation, duplicate-submit prevention, and corrupt-cache recovery.
- Security tests for MFA, reauthentication, device binding, suspicious login, document redaction, wallet handoff, webhook signatures, and redacted logs.
- Compliance tests for contract-of-carriage links, refund/passenger-rights copy, baggage disclosures, accessibility assistance, minor traveler handling, and support consent.
- Payment tests for authorization, capture, settlement, reversal, refund, chargeback, ancillary purchase, provider ownership, and region unavailable states.
- Privacy tests for provider request redaction, support access consent, metadata stripping, log scrubbing, export, delete, retention expiry, and legal hold exceptions.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, fare/disclosure readability, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, booking/payment, check-in, travel documents, boarding passes, push notifications, airport maps, support outcomes, and route availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/legal/marketplace URLs or explicit manual blockers for native/account evidence.
- A lawful V1 can be built with original branding, UI copy, sample data, licensed providers, and production airline/payment/check-in workflows disabled until approved.
- Onboarding, auth, flight search, booking review, trips, trip detail, check-in, boarding pass, seats/bags/extras, flight status/airport, alerts, support, settings, export/delete, and accessibility screens are specified.
- Account, passenger, loyalty, booking, flight, check-in, boarding pass, payment, support, analytics, privacy, compliance, and audit boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe booking, payment, check-in, travel-document capture, boarding-pass issuance, provider calls, profile-owner changes, or irreversible operations while offline.
- Category risks for passenger-data privacy, travel documents, payment/booking, operational-data licensing, loyalty, fraud/account takeover, accessibility, support, and regulator/passenger-rights auditability have owners and tests.
- Manual verification blockers remain for native behavior that requires accounts, devices, permissions, marketplace labels, geolocation, airport presence, travel documents, payment methods, loyalty credentials, provider credentials, or route-specific review.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active workflow failure, sold-out/unavailable route, document blocker, offline recovery, export/delete, payment restore, disruption support, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact native marketplace privacy labels, release-note details, and screenshots should be treated as canonical after device verification?
- Which providers will power flight shopping, fare quotes, airport maps, operational status, baggage, loyalty, payments, notifications, analytics, support, fraud prevention, and document validation?
- Which countries, states, airports, routes, fare families, cabins, passenger types, loyalty tiers, partner airlines, or regulators alter feature availability?
- Which passenger records, travel documents, trip histories, support cases, risk signals, provider logs, and exports are retained for support, fraud prevention, legal obligations, or product improvement?
- Which disclosures are required for fare/tax/fee display, refunds, baggage, delays/cancellations, passenger rights, loyalty, accessibility, airport-agent-required flows, and payment reversibility?
- Which hands-on flows require paid tickets, airport presence, passport/APIS data, physical baggage, loyalty credentials, payment instruments, support contact, or airline/provider sandbox review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, legal names, provider choices, production-feature flags, passenger/travel-document path, fare model, disclosure matrix, and manual blocker owners.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, auth, search, booking review, trips, trip detail, check-in, boarding pass, seats/bags/extras, flight status, alerts, support, settings, and export/delete shells with original copy and synthetic data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, fraud/account-takeover controls, disruption states, refund/support flows, and privacy lifecycle.
- Phase 5: Complete accessibility, privacy, security, compliance, payment/booking, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before any one-for-one parity claim.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, account login, booking/payment, check-in, travel-document capture, boarding pass issuance, airport guidance, and provider behavior.
- Select licensed providers for flight shopping/status, airport maps, payment tokenization, loyalty simulation, notifications, analytics, and support.
- Convert manual blockers into launch checklist items owned by passenger-data, booking/payments, security, legal, privacy, accessibility, and support leads.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest after the full Step 8.3 readiness range lands.
