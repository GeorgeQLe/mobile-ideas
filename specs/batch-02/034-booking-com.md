# Booking.com-Style Clone Spec

> Metadata
> - Inspiration app: Booking.com
> - Category: Travel lodging
> - Spec status: Implementation-ready public-source V1; hands-on account/device verification blocked unless noted.
> - Legal scope: functional parity research only; use original code, branding, copy, media, sample data, ranking, policy language, and licensed integrations.

## Overview

Build an original mobile travel marketplace inspired by Booking.com's public lodging and trip-booking workflows, not its brand identity or proprietary systems.
The V1 centers on accommodation discovery, map/list comparison, property detail, room/rate selection, reservation management, Genius-style loyalty discounts, property messaging, cancellation/refund handling, and support.
Flights, rental cars, taxis, attractions, and travel communities are represented as extensible product modules because the public mobile listings position the app as a broader trip-booking surface.
The spec separates source-backed requirements from inferred clone implementation details and keeps native, paid, provider, account, notification, payment, refund, loyalty, and regional behavior blocked until lawful verification is complete.

## Goals

- Deliver a mobile-first lodging marketplace with signed-out search, signed-in booking, room/rate comparison, cancellation policy review, reservation management, and support.
- Replace generic Draft 1 assumptions with exact public sources, app-specific screen/data/API requirements, and explicit manual verification blockers.
- Support original marketplace inventory, licensed maps/geocoding, provider-backed payments, transparent fees/taxes, review trust, property messaging, and privacy/data-rights controls.
- Preserve a path for flights, rental cars, taxis, attractions, Genius-style loyalty, and partner handoffs without claiming parity for unverified or provider-dependent surfaces.
- Provide enough product, data, API, privacy, analytics, edge-case, test, and build-plan detail for downstream estimation.

## Non-Goals

- Do not copy Booking.com branding, trade dress, logos, icons, screenshots, listing photos, accommodation inventory, reviews, host/property data, marketing copy, policy text, ranking logic, or support scripts.
- Do not scrape private marketplace data, reverse-engineer APIs, bypass provider rules, or use unlicensed hotel, flight, car, taxi, attractions, review, map, or pricing content.
- Do not claim exact native parity for booking, cancellation, refund, messaging, loyalty, notification, payment, identity, account deletion, or provider handoff flows until verified with lawful test accounts/devices.
- Do not implement regulated travel insurance, payments, taxes, identity checks, or transportation fulfillment without legal, provider, and compliance review.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/booking-com-hotels-travel/id367003839 | Official iOS listing, category, seller, supported devices, privacy labels, release cadence, lodging/flights/cars/taxis/attractions, filters, paperless confirmation, property chat, mobile discounts, free-cancellation claims | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.booking | Official Android listing, package id, download/rating scale, data safety, accommodation types, filters, whole-trip booking, customer service, mobile discounts, reservation changes, and attractions | Verified 2026-04-17 |
| Booking.com Customer Service | https://www.booking.com/customer-service.html | Manage booking, contact property, contact customer service, cancellation/change/payment FAQs, customer support positioning, verified review explanation | Verified 2026-04-17 |
| Booking.com Traveler FAQ | https://www.booking.com/tpi_faq.html | Payment, incorrect charge, cancellation, modification, refund timing, partner-facilitated cancellation, confirmation, and request handling | Verified 2026-04-17 |
| Genius Loyalty Program | https://www.booking.com/genius.html | Free account-based loyalty, levels, stay/car discounts, flight price alerts, breakfast/room-upgrade benefits, priority support, booking progress | Verified 2026-04-17 |
| Privacy Notice For Travelers | https://www.booking.com/content/privacy.html | Traveler privacy scope, mobile apps, travel products, data categories, supplier sharing, rights, cookies, AI/automated decisions, retention, and minors | Verified 2026-04-17 |
| Terms And Conditions | https://www.booking.com/content/terms.html | Platform/service rules, trip-provider contracts, payment/cancellation/refund responsibility, traveler obligations, dispute/legal framing | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe Booking.com as a mobile app for accommodations, flights, rental cars, taxis, attractions, paperless confirmations, property chat, reservation management, mobile-only discounts, and 24/7 customer service in many languages.
- Lodging search must support destination, nearby search, dates, rooms, adults, children, pets where supported, price, review score, Wi-Fi quality, property type, special requests, free-cancellation, breakfast, accessibility, and availability filters.
- Results must render one canonical marketplace result as list cards and map markers with property type, location, review score, price/rate summary, Genius/member discount indicators, cancellation policy summary, availability, sponsored/original ranking tags where applicable, and stale-price warnings.
- Property detail must include media metadata, room types, rate plans, occupancy, bed configuration, amenities, accessibility, house rules, pet policy, payment policy, cancellation policy, taxes/fees, review summary, location/map preview, property contact, save/compare, and report issue actions.
- Room/rate selection must model multiple rooms, occupancy validation, rate availability, refundable/non-refundable plans, pay-now/pay-at-property treatment, preauthorization/deposit notes, breakfast/meal inclusions, local taxes, currency, and quote expiry.
- Checkout must present traveler details, special requests, card/payment or pay-later state, property-charged versus platform-charged responsibility, total price, taxes/fees/deposits, cancellation fees, loyalty discounts, and confirmation email/paperless itinerary state.
- Reservation management must support upcoming/current/past/canceled reservations, confirmation number/PIN or equivalent, property messaging, date/guest/room/payment request changes where policy allows, cancellation preview, refund state, support escalation, and offline cached essentials.
- Cancellation and refund flows must be policy-aware: free cancellation, partially refundable, non-refundable, no-show, property-canceled, partner-facilitated, prepayment/deposit, temporary card hold, and bank-processing timelines must be represented as explicit states.
- Genius-style loyalty must be original but account-based, with signed-in eligibility, level progress, participating-property/car indicators, discount application before taxes/fees where configured, upgrade/breakfast/priority support benefit states, and no copied names or artwork.
- Verified-review behavior must require completed bookings before review submission and must include authenticity checks, private-data redaction, moderation, right of reply where relevant, and report/removal workflows.
- Property messaging must keep traveler/property/support communications in app, minimize private data exposure, support translation or locale fallback as an extension, and block harassment, fraud, off-platform payment requests, and unsafe instructions.
- Flights, rental cars, taxis, and attractions should launch behind provider feature flags with separate provider contracts, booking confirmation, cancellation/refund rules, support ownership, and loyalty eligibility.
- Privacy controls must expose profile, payment methods, trips, traveler details, loyalty, marketing, cookies/ads, data access/export, account deletion, support, terms, and privacy links.

## Core User Journeys

- New traveler opens the app, denies location, enters a destination and dates manually, filters results, compares map/list properties, saves options, and signs in only when a booking or loyalty action requires it.
- Returning traveler opens recent searches or trips, compares properties, reviews room/rate/cancellation details, applies an eligible loyalty discount, enters traveler/payment details, confirms, and receives a paperless reservation.
- Traveler reviews the price breakdown before checkout, sees property-collected versus platform-collected charges, understands taxes/fees/deposits, handles a quote refresh, and retries after a card failure without duplicate booking.
- Traveler cancels a booking, previews refund and fee consequences, confirms cancellation, receives email/in-app confirmation, and tracks refund processing or property/provider responsibility.
- Traveler requests a reservation change, contact-property action, or special request; the system distinguishes immediate self-serve changes from property approval and support-only paths.
- Traveler loses connectivity before check-in, opens cached reservation essentials, sees freshness warnings, and cannot perform money movement or cancellation until reconnected.
- Loyalty user signs in, sees level and discount eligibility, filters participating properties, books an eligible stay, and sees progress/benefits update only after provider-confirmed completion.
- Support user reports a mismatched room, incorrect charge, canceled booking, unsafe property, fraud, or privacy issue, attaches evidence, and receives an auditable case state.
- Property-side operator uses an original partner surface to update availability, room/rate plans, cancellation policies, amenities, house rules, messages, and booking requests without exposing proprietary Booking.com partner tooling.
- Privacy-focused user reviews collected data, marketing preferences, data export/deletion paths, and retention caveats for active bookings, payments, support cases, and legal holds.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, sign-in, account, terms, privacy, loyalty prompt | email, passkey/password, guest continue, legal links | signed-out, signed-in, returning, blocked | auth failure, underage, locked account, unsupported region |
| Destination Search | Destination/date/room setup | destination, dates, rooms, guests, pets, nearby | default, editing, valid, invalid | ambiguous destination, denied location, impossible occupancy |
| Map/List Results | Compare lodging inventory | filters, sort, map pan, save, property tap | loading, list, map, saved, no results | stale price, unavailable property, provider outage, no map |
| Filter And Sort | Narrow properties and policies | price, score, amenities, cancellation, accessibility | applied, cleared, saved | contradictory filters, hidden fee warning, provider lag |
| Property Detail | Inspect accommodation before room selection | media, amenities, reviews, policies, map, save | available, unavailable, saved | missing license, safety warning, removed listing, region block |
| Room And Rate Selection | Pick room/rate plan | room, occupancy, rate, meal, cancellation | selected, expired, sold out | price changed, non-refundable, deposit required, max occupancy |
| Price Breakdown | Explain total price and provider responsibility | currency, taxes, fees, loyalty, payment mode | complete, estimated, refreshed | local tax unknown, property-collected fee, quote expired |
| Checkout | Confirm reservation | traveler details, card, requests, terms, confirm | ready, authorizing, confirmed | payment fail, duplicate submit, fraud hold, provider timeout |
| Trips/Reservation Detail | Manage booking and offline essentials | reservation, message, cancel, change, support | upcoming, active, past, canceled | stale cache, missing confirmation, property canceled |
| Property Messages | Traveler/property/support conversation | text, attachments, translate, report | sent, delivered, support handoff | moderation hold, blocked contact, unsafe/off-platform request |
| Loyalty | Account benefits and progress | sign in, level, eligible property, benefit | signed-out, active, pending, ineligible | stale level, benefit missing, partner ineligible |
| Reviews | Read/write verified reviews | rating, text, property response, report | eligible, draft, submitted, moderated | unverified stay, expired window, private data, fake review |
| Support Case | Booking, payment, safety, refund, privacy help | issue, evidence, contact, escalation | submitted, reviewing, resolved | urgent safety, duplicate claim, provider-owned issue |
| Partner Console | Original property operations | availability, rooms, rates, policies, messages | draft, active, paused | overbooking, invalid policy, payout/tax blocker |
| Settings/Privacy | Account, notifications, payment, data rights | toggles, export, delete, legal links | signed-in, signed-out, pending delete | active booking, retention caveat, security check fail |

## Data Model

- `User`: identity, locale, language/currency, age/consent, contact channels, loyalty state, traveler profiles, privacy settings, export/delete lifecycle, and risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, offline cache version, and last active state.
- `Destination`: text query, canonical place id, coordinates/bounds, locale names, region restrictions, nearby-search state, and map provider provenance.
- `Property`: lodging type, title, description, location precision, media metadata, amenities, accessibility, house rules, safety/license fields, review summary, and provider status.
- `RoomRate`: room type, bed setup, occupancy, availability, meal plan, refundable policy, payment policy, deposit/preauth, taxes/fees, loyalty discount, and quote expiry.
- `SearchQuery`: destination, dates, rooms, adults, children, pets, filters, sort, currency, loyalty context, personalization opt-out, and pagination cursor.
- `SearchResult`: property id, rank, map marker, rate summary, review score, cancellation badge, loyalty badge, saved/compare state, and unavailable reason.
- `Reservation`: property, traveler party, room/rate snapshot, price snapshot, confirmation identifiers, policy snapshot, payment state, messages, change/cancel state, support cases, and audit ids.
- `PaymentInstrument`: tokenized card/wallet, billing region, cardholder permission state, preauthorization/deposit support, failure reason, and deletion constraints.
- `RefundCase`: cancellation reason, policy engine result, provider responsibility, refund amount, fee amount, processing timeline, payment method, and support owner.
- `LoyaltyAccount`: original level, eligible bookings, benefits, participating inventory flags, discount application, benefit expiry, and dispute state.
- `PropertyMessageThread`: participants, reservation link, content references, attachment scan, translation state, moderation state, delivery status, and support handoff.
- `Review`: reservation eligibility, rating dimensions, text, media, moderation, property response, report/removal, and publication timing.
- `SupportCase`: booking, payment, property, safety, refund, loyalty, privacy, fraud, or provider issue with evidence, owner queue, escalation, SLA, decision, and appeal.
- `PartnerInventoryRecord`: property operator, rooms, rates, availability calendar, cancellation rules, taxes/fees, amenities, safety disclosures, and version conflicts.
- `AuditEvent`: append-only record for auth, search, quote, checkout, payment, cancellation, refund, loyalty, messaging, review, support, privacy, and partner writes.
- `LocalCacheRecord`: cached searches, property summaries, reservation essentials, message drafts, support evidence drafts, settings, freshness, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with deletion, locked-account, age, locale, and device gates.
- `GET /destinations/suggest`, `GET /search/lodging`: destination suggestions and lodging search with filters, map bounds, pagination, ranking reason codes, quote freshness, and provider status.
- `GET /properties/:id`, `GET /properties/:id/rooms`: property details, room/rate inventory, policy snapshots, media metadata, review summaries, safety/license fields, and stale-data indicators.
- `POST /quotes`, `GET /quotes/:id`: room/rate quote with price, taxes, fees, currency, cancellation policy, loyalty discount, deposit/preauth, provider responsibility, and expiry.
- `POST /reservations`, `GET /reservations`, `GET /reservations/:id`: booking creation and trip reads with idempotency keys, confirmation identifiers, support affordances, and offline cache hints.
- `POST /reservations/:id/cancel-preview`, `POST /reservations/:id/cancel`, `POST /reservations/:id/change-request`: policy-aware cancellation/refund and change flows with provider response states.
- `GET /loyalty`, `POST /loyalty/enroll`, `GET /loyalty/eligible-inventory`: original loyalty progress, benefit eligibility, participating inventory, and missing-benefit dispute hooks.
- `GET /messages`, `POST /message-threads/:id/messages`, `POST /message-threads/:id/attachments`, `POST /message-threads/:id/report`: property/support messaging with moderation and malware scan.
- `POST /reviews`, `GET /properties/:id/reviews`, `POST /reviews/:id/report`, `POST /reviews/:id/respond`: verified review lifecycle, sorting, response, report, and moderation decisions.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/escalate`: payment, cancellation, property, safety, loyalty, and privacy support.
- `GET /partner/properties`, `PATCH /partner/properties/:id`, `PATCH /partner/properties/:id/inventory`: original partner inventory and policy management with authorization, validation, and audit events.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights with active-booking, fraud, payment, and legal-retention caveats.

## Realtime, Push, And Offline Behavior

- Booking confirmation, payment authorization, property message, change request, cancellation, refund, loyalty, support, and partner inventory updates must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation.
- The client may cache recent searches, property summaries, saved/compared items, settings, message drafts, and active reservation essentials; cached reservations must show freshness and cannot hide cancellation/provider changes.
- Offline mode may show cached trip essentials such as address, check-in/out, confirmation identifiers, and property contact where policy allows, but checkout, cancellation, refund, payment, support escalation, account deletion, and partner writes require server confirmation.
- Price quotes, taxes, fees, room availability, cancellation policy, loyalty eligibility, and provider availability must expire and refresh before confirmation.
- Push notifications must be opt-in and category-controlled for booking confirmation, property messages, check-in reminders, cancellation/refund updates, support, loyalty, price alerts, account security, and marketing.
- Flights, cars, taxis, attractions, Genius benefits, and provider support states must be feature-flagged by region, provider contract, legal review, and manual verification.

## Permissions, Privacy, And Safety

- Request location, notifications, camera/photos/files, calendar, contacts, and device authentication only when a related feature is invoked.
- Default analytics must exclude precise location, full address, payment credentials, cardholder data, raw property messages, traveler identity documents, support evidence, and confirmation identifiers.
- Lodging safety controls must cover unsafe property reports, mismatched room, hidden fees, discrimination, scams, off-platform payment, harassment, privacy invasion, review abuse, and emergency support paths.
- Payment, refund, deposit, preauthorization, tax, fee, loyalty discount, and currency behavior must be provider-backed, auditable, and jurisdiction-reviewed.
- Property/traveler messaging must block off-platform payment pressure, abusive content, sensitive data leakage, spam, fraud, and unsupported provider claims.
- Review authenticity must require stay eligibility, anti-coercion rules, private-information redaction, moderation, appeal, and property response controls.
- Privacy rights must support profile edits, marketing/cookie choices, data access/export, account deletion, and documented retention limits for active bookings, payments, taxes, disputes, fraud investigations, and legal holds.
- Launch owners: marketplace trust owner for fraud/reviews, legal/compliance owner for lodging/taxes/terms, payments owner for checkout/refunds, safety owner for property incidents, privacy owner for data rights, accessibility owner for inclusive travel filters, and support owner for booking disputes.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, destination searched, filter applied, map moved, property opened, room selected, quote refreshed, loyalty benefit viewed, checkout started, booking confirmed, cancellation previewed, support opened, review submitted, data export requested, account deletion requested.
- Marketplace quality metrics must use object ids, reason codes, latency, quote freshness, provider status, availability freshness, and support SLA without raw messages, payment credentials, exact addresses, or private traveler data.
- Search/ranking diagnostics must separate organic ranking, sponsored placements, availability, price, cancellation, loyalty, personalization, and legal-region logic, with privacy opt-out behavior.
- Monetization can include original marketplace fees, lodging commissions, loyalty benefits, ads/sponsored listings, partner booking handoffs, attractions, taxis, cars, premium support, or business travel tools, but fee names/rates and promotional language must be original and legal-reviewed.
- Fee/tax display must be transparent before confirmation and explicit about whether the platform, property, travel provider, tax authority, or payment provider collects each amount.

## Edge Cases

- First launch offline, expired session, unsupported OS, underage user, blocked region, language/currency mismatch, or all optional permissions denied.
- Destination is ambiguous, unavailable, unsafe, misspelled, embargoed, too broad, or unsupported by licensed maps/place providers.
- Property is sold out, duplicated, removed, overbooked, suspended, has stale rates, has undisclosed local fees, lacks accessibility data, or changes policy after quote.
- Room occupancy includes children, infants, pets, multiple rooms, extra beds, accessibility requirements, special requests, and contradictory property rules.
- Price quote expires, card preauthorization fails, property charges directly, deposit is required, currency changes, loyalty discount disappears, or payment webhook is delayed.
- Traveler cancels inside/outside free-cancellation window, no-shows, receives property cancellation, has partially refundable policy, or receives refund via provider-owned payment path.
- Property message is undelivered, translated poorly, contains off-platform payment request, includes private data, enters moderation hold, or requires support handoff.
- Review window expires, traveler did not complete stay, review contains private/safety content, property disputes review, or fraud system detects incentive abuse.
- Data export, account deletion, payment method deletion, message retention, reservation history, tax retention, support evidence, legal hold, and fraud investigation conflict.

## Test Plan

- Unit tests for destination parsing, filter validation, room/guest rules, availability conflicts, quote expiry, tax/fee line items, loyalty eligibility, and cancellation/refund state machines.
- Unit tests for privacy-safe analytics, sensitive-field redaction, account deletion eligibility, data export, location permission states, and notification category preferences.
- Contract tests for search, property, room/rate, quote, reservation, cancellation-preview, refund, loyalty, messaging, review, support, partner inventory, and privacy endpoints.
- Integration tests for signed-out search, signed-in booking, map/list results, property detail, room selection, checkout, payment failure recovery, trips, cancellation preview, support, and review submission.
- Offline tests for cached search/property/trip reads, queued message/support drafts, blocked checkout/cancel/payment/delete actions, corrupt cache, and reconnect reconciliation.
- Payment/refund tests for card failure, property-charged state, platform-charged state, preauthorization/deposit, duplicate submit, refund timeline, partial refund, and provider timeout.
- Messaging and support tests for property contact, attachment scan, moderation hold, off-platform request, unsafe property report, incorrect charge, duplicate claim, and emergency escalation.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, room/rate comparison, and fee/cancellation comprehension.
- Manual verification tests: native iOS/Android screenshots, account signup/login, checkout/payment, reservation modification, cancellation/refund, property messaging, push payloads, loyalty level/discount, flight/car/taxi/attraction modules, account deletion, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Booking.com assets, inventory, reviews, private APIs, policy text, ranking systems, pricing formulas, or support scripts.
- New and returning travelers can search destinations, compare map/list results, inspect properties, choose room/rate plans, review fees/taxes/cancellation rules, book a reservation, manage trips, message the property, cancel with refund preview, and recover from denied permissions or network loss.
- Checkout, pricing, payment responsibility, deposits/preauthorization, cancellation, refunds, loyalty discounts, reviews, support, and provider handoffs are represented as auditable server-owned state machines.
- Property safety, fraud, off-platform payment, review authenticity, privacy, payment data, support evidence, data export, and account deletion controls are accessible from settings/support and covered by tests.
- Flights, rental cars, taxis, attractions, Genius-like benefits, provider inventory, native push payloads, and regional legal/tax surfaces remain feature-flagged until provider, legal, privacy, safety, accessibility, and manual verification clear them.

## Open Questions

- Which licensed lodging, map/geocoding, payment, tax, messaging, review, support, fraud, analytics, notification, flight, car, taxi, and attractions providers will back V1?
- Which launch regions determine lodging taxes, fee display, card preauthorization, cancellation/refund rules, accessibility claims, local fees, and language/customer-support requirements?
- Will V1 include only lodging at launch, or also flight, car, taxi, and attraction modules behind provider flags?
- What original loyalty model replaces Genius without copying names, benefit design, discount rules, or promotional language?
- What policy posture governs free cancellation, non-refundable rates, no-shows, deposit/prepayment, property-collected taxes/fees, refunds, and support decisions?
- Which property trust requirements are mandatory before publication: business verification, address verification, license/tax setup, safety disclosures, photo review, payment setup, and support contact?

## Build Plan

- Phase 1: scaffold app shell, auth/guest mode, destination search, map/list results, property detail, saved/compare state, settings/legal links, privacy-safe analytics, and licensed map/provider attribution.
- Phase 2: add room/rate inventory, quote generation, fee/tax/cancellation breakdown, loyalty eligibility, checkout session, payment authorization, reservation confirmation, and booking tests.
- Phase 3: add Trips, offline reservation essentials, property messaging, support cases, cancellation/refund preview, reservation change requests, and notification categories.
- Phase 4: add verified reviews, review moderation, property response, fraud/risk gates, off-platform payment detection, safety reports, and support audit tooling.
- Phase 5: add original partner console for rooms/rates/availability/policies/messages and partner validation tests.
- Phase 6: evaluate flights, rental cars, taxis, attractions, advanced loyalty, price alerts, and business travel only after provider, legal, privacy, safety, accessibility, and manual verification approvals.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Use this lodging-marketplace spec with `033-airbnb.md` as the travel-booking pattern for related accommodation and marketplace specs.
- Continue the Batch 02 travel booking pass with `035-expedia.md`, `036-hopper.md`, and `037-tripit.md`.
