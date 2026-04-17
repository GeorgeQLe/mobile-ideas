# Expedia-Style Clone Spec

> Metadata
> - Inspiration app: Expedia
> - Category: Travel booking
> - Spec status: Implementation-ready public-source V1; hands-on account/device verification blocked unless noted.
> - Legal scope: functional parity research only; use original code, branding, copy, media, sample data, ranking, policy language, and licensed integrations.

## Overview

Build an original mobile travel-booking app inspired by Expedia's public multi-product booking workflows, not its brand identity or proprietary implementation.
The V1 must support travel discovery, flights, stays, vacation packages, cars, activities, itinerary management, account/rewards state, member pricing, collaboration/sharing, cancellation/change support, refunds, and customer help.
Because Expedia aggregates third-party travel suppliers, the clone must represent supplier rules, provider ownership, booking confirmations, payment responsibility, and refund limits as explicit server-owned state.
The spec is implementation-ready for public-source V1, while native app parity, paid bookings, rewards accounting, supplier handoff, push payloads, refunds, and regional behavior remain manual blockers.

## Goals

- Replace Draft 1 discovery placeholders with exact first-party marketplace, help, privacy, terms, and rewards sources.
- Define an original multi-product booking surface for flights, lodging, packages, cars, activities, itinerary wallet, member/rewards benefits, cancellation/change, support, and privacy controls.
- Model supplier rules, Pay Now/Pay Later, OneKeyCash-like rewards, coupons/credits, taxes/fees, refunds, and provider limitations as auditable backend contracts.
- Keep account, payment, loyalty, notification, cancellation, refund, package, supplier, and native-device behavior blocked until lawful verification.
- Provide app-specific screen inventory, data model, API contracts, offline/realtime behavior, tests, acceptance criteria, and build plan.

## Non-Goals

- Do not copy Expedia branding, trade dress, logos, icons, screenshots, marketing copy, supplier inventory, travel content, reviews, member labels, reward names, prices, terms, or support scripts.
- Do not scrape private supplier data, use private APIs, or imply direct airline/hotel/car/activity fulfillment without licensed providers.
- Do not claim exact cancellation, refund, loyalty credit, flight disruption, package, supplier, or customer-service behavior until verified through lawful accounts and test bookings.
- Do not implement regulated travel insurance, payment financing, cross-border tax, identity, or supplier settlement without separate legal/provider review.
- Do not build application code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/expedia-travel-companion/id427916203 | Official iOS listing, Travel category, seller, ratings scale, trip planner/deals positioning, flights/hotels/cars/packages/activities, One Key rewards, member prices, collaboration, and itinerary management | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.expedia.bookings | Official Android listing, package id, download/rating scale, ads disclosure, travel planning, One Key, member discounts, package savings, and booking management claims | Verified 2026-04-17 |
| Expedia Help Center | https://www.expedia.com/service | Canonical help entrypoint for flights, refunds/charges, packages, stays, cars, cruises, activities, coupons, travel documents, traveler rights, and support | Verified 2026-04-17 |
| Expedia Terms Of Service | https://www.expedia.com/terms | Platform rules, traveler age/authority, supplier rules/restrictions, Pay Now/Pay Later, cancellation/change limits, refunds, fraud, and provider responsibility | Verified 2026-04-17 |
| Expedia Privacy Statement | https://www.expedia.com/lp/lg-privacypolicy | Data collection, booking support, supplier sharing, loyalty processing, AI, rights, retention, security, minors, and cross-border transfers | Verified 2026-04-17 |
| One Key Terms | https://www.expedia.com/one-key-terms | Loyalty eligibility, Expedia/Hotels.com/Vrbo participating brands, earning/redemption, trip elements, tiers, Pay Now/Pay Later limits, exclusions, and account deletion effects | Verified 2026-04-17 |
| Expedia Accessibility | https://www.expedia.com/service/#/articles/702/34/16223 | Accessibility/support orientation and accessible customer-service requirements; verify exact regional page before launch | Public-source orientation 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position Expedia as a whole-trip planner for flights, hotels, vacation rentals, packages, cars, activities, inspiration, expert tips, personalized recommendations, collaboration, booking, and trip management.
- Search must support product-specific verticals: stays, flights, packages, cars, activities, cruises as future flag, and cross-sell modules with original ranking and provider-backed availability.
- Package booking must treat flight, hotel, car, and activity components as distinct supplier-backed trip elements with combined quote display, component rules, change/cancel dependencies, and partial failure handling.
- Stays search must support destination, dates, travelers, rooms, vacation rental/hotel type, amenities, accessibility, cancellation, payment mode, member price, loyalty eligibility, map/list display, and unavailable reason codes.
- Flight search must support origin/destination, dates, passengers, cabin, bags, stops, airline, departure/arrival time, fare class, baggage/change/refund rule summaries, seat/provider handoff, and schedule-change states.
- Car/activity search must support pickup/dropoff or location/date/time, driver/traveler age gates, provider terms, deposits, insurance/add-ons, cancellation windows, vouchers, and supplier confirmation state.
- Itinerary wallet must group all trip components, confirmation numbers, supplier contact, rules/restrictions, price/payment state, cancellation/change actions, support cases, documents, offline essentials, and sharing/collaboration state.
- One Key-style loyalty must be original but account-based, with eligible bookings, rewards currency, tier progress, member prices, redemption, pending/available rewards, exclusions, account deletion effects, and dispute handling.
- Checkout must display Pay Now/Pay Later, supplier payment responsibility, taxes/fees, coupons/credits/rewards, payment method, cancellation/change rules, traveler authority, quote expiry, and final confirmation by component.
- Cancellation/change flows must defer to supplier rules and restrictions, surface fees before confirmation, handle no-show and partial-use cases, and identify whether refund is platform- or supplier-processed.
- Privacy settings must cover account details, traveler profiles, rewards data, marketing, cookies/ads, data access/update, deletion, retention, supplier sharing, and support data.
- Recommendations and personalization must be original, explainable enough for audit, opt-out capable, and avoid using raw sensitive itinerary or payment data in analytics.

## Core User Journeys

- New traveler browses signed-out, searches a city, compares lodging map/list results, sees member-only benefits gated behind account creation, signs in at checkout, and books a refundable stay.
- Returning traveler searches flight plus hotel, compares package savings, reviews each component's rules, applies eligible rewards/coupon value, pays, and receives one grouped itinerary with component confirmations.
- Traveler searches a flight, filters by time/stops/airline/bag needs, opens fare details, sees baggage/change/refund restrictions, books, and later receives a schedule-change state requiring supplier support.
- Traveler books a car or activity, reviews provider terms, age/deposit/cancellation requirements, receives voucher/confirmation, and accesses it offline during the trip.
- Rewards member checks balance/tier, sees eligible and ineligible inventory, redeems partial rewards at checkout where allowed, and handles a pending reward or missing-credit support case.
- Traveler cancels a hotel, flight, or package component, sees supplier-specific fee/refund consequences, confirms cancellation, tracks refund back to the original payment method, and escalates if supplier processing is opaque.
- Traveler shares itinerary with a co-traveler, hides payment/reward data, receives plan edits, and revokes access.
- Traveler loses network during trip, reads cached confirmation details and supplier contact info, but cannot cancel/change/pay until reconnected.
- Support user reports a charge, refund delay, supplier cancellation, overbooking, missed connection, accessibility issue, privacy request, or suspected fraud through auditable case routing.
- Privacy-focused user reviews data sharing with suppliers, updates account details, opts out of marketing, requests data export/deletion, and sees active-booking and legal-retention caveats.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, rewards, legal consent | email, passkey/password, guest continue | signed-out, signed-in, returning | auth fail, underage, fraud hold, unsupported region |
| Travel Home | Search modules, recommendations, recent trips | vertical, destination, date, traveler | personalized, signed-out, empty | personalization disabled, no inventory, provider outage |
| Stays Search | Lodging discovery | destination, dates, rooms, filters, map | list, map, no results, saved | stale price, hidden fee, unavailable property |
| Flight Search | Airfare discovery | route, dates, cabin, passengers, filters | results, no results, selected fare | schedule change, fare expired, baggage ambiguity |
| Package Builder | Combine trip components | flight, stay, car, activity, traveler | valid package, partial, invalid | component sold out, supplier mismatch, quote split |
| Car/Activity Search | Ancillary trip booking | location, date/time, age, provider | available, selected, voucher | age/deposit block, provider terms conflict |
| Trip Detail | Itinerary wallet and recovery | component, share, cancel, support | upcoming, active, past, canceled | supplier canceled, offline stale, missing confirmation |
| Price And Rules | Explain quote and restrictions | expand line items, rewards, coupon | complete, estimated, expired | supplier fee unknown, currency changed, Pay Later caveat |
| Checkout | Traveler/payment confirmation | traveler profiles, payment, rewards, terms | ready, authorizing, confirmed | payment fail, fraud review, duplicate submit |
| Rewards | Loyalty balance, tier, benefits | sign in, balance, redemption, help | pending, available, ineligible | missing credit, expired reward, account deletion |
| Collaboration | Share itinerary and permissions | invite, role, revoke, hide details | shared, collaborator, revoked | private data leak, stale invite, wrong account |
| Notifications | Alerts and preferences | category toggle, push, email, SMS | enabled, denied, quiet | revoked permission, supplier alert missing |
| Support Case | Refunds, charges, changes, supplier help | issue, evidence, chat/call | submitted, reviewing, resolved | urgent disruption, duplicate case, provider-owned refund |
| Settings/Privacy | Account, payment, rewards, data rights | toggles, export, delete, legal links | signed-in, signed-out, pending delete | active trip, retention caveat, identity check fail |

## Data Model

- `User`: identity, age/consent, locale, language/currency, contact channels, traveler profiles, rewards state, marketing preferences, privacy rights, and risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, offline cache version, and last active state.
- `TravelerProfile`: name, date of birth where required, document/passport references, loyalty numbers, accessibility needs, emergency contact, and deletion constraints.
- `TravelSearch`: vertical, origin/destination, dates, travelers, rooms, cabin, car pickup/dropoff, activity location, filters, sort, personalization status, and cursor.
- `TravelProduct`: stay, flight, car, activity, package, or cruise placeholder with supplier id, terms snapshot, availability, media, price summary, and policy flags.
- `FareOrRate`: component type, inventory token, class/category, cancellation/change/refund rules, baggage/add-ons, taxes/fees, rewards eligibility, and quote expiry.
- `PackageQuote`: components, bundle discount, individual rules, combined total, component expiry, partial failure state, rewards/coupon application, and payment mode.
- `Booking`: trip id, components, traveler profiles, supplier confirmations, payment state, reward redemption, change/cancel state, support cases, and audit ids.
- `ItineraryComponent`: flight segment, stay, car, activity, package component, cruise placeholder, voucher/document links, offline cache hint, and supplier contact.
- `RewardsAccount`: original tier, points/cash-like balance, pending/available rewards, trip elements, eligible brands/products, redemption rules, expiration, and account deletion effects.
- `PaymentMethod`: tokenized card/wallet, billing country, Pay Now/Pay Later eligibility, SCA/3DS state, failure reason, and deletion constraints.
- `RefundOrChangeCase`: booking component, supplier rule snapshot, fees, refund amount, original payment method, provider responsibility, SLA, and appeal path.
- `CouponCredit`: campaign, eligibility, stackability, expiration, fraud checks, reward interaction, and audit events.
- `ItineraryShare`: owner, invitee, role, visible fields, hidden payment/reward data, expiration, revoke state, and access audit.
- `SupportCase`: flight, stay, package, car, activity, payment, rewards, refund, privacy, fraud, accessibility, or supplier issue with evidence, owner queue, decision, and legal hold.
- `AuditEvent`: append-only record for auth, search, quote, booking, payment, rewards, cancellation, refund, sharing, support, privacy, and supplier callbacks.
- `LocalCacheRecord`: cached trips, component summaries, documents/vouchers, support drafts, settings, reward summaries, freshness, and conflict markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with age, fraud, deletion, rewards, and device gates.
- `GET /home`, `GET /search/stays`, `GET /search/flights`, `GET /search/cars`, `GET /search/activities`: product search with filters, supplier availability, pagination, quote freshness, ranking reason codes, and provider outage states.
- `POST /packages/quote`, `GET /packages/:quoteId`: package composition, component rules, bundle discounts, partial expiry, supplier mismatch, rewards/coupon application, and final quote.
- `POST /quotes`, `GET /quotes/:id`: component quote with taxes/fees, Pay Now/Pay Later, cancellation/change/refund rules, rewards eligibility, and expiry.
- `POST /bookings`, `GET /trips`, `GET /trips/:id`: booking creation and itinerary wallet reads with idempotency, supplier confirmations, offline cache hints, and support affordances.
- `POST /bookings/:id/cancel-preview`, `POST /bookings/:id/cancel`, `POST /bookings/:id/change-preview`, `POST /bookings/:id/change`: supplier-rule-driven changes/cancellations with fees, refund path, component dependencies, and finality warnings.
- `GET /rewards`, `POST /rewards/redeem-preview`, `POST /rewards/missing-credit`: rewards balance, tier, eligible products, redemption rules, pending/available rewards, exclusions, and disputes.
- `GET /coupons`, `POST /coupons/apply`: coupon/credit eligibility, stackability, fraud checks, expiration, and quote integration.
- `POST /itinerary-shares`, `PATCH /itinerary-shares/:id`, `DELETE /itinerary-shares/:id`: itinerary collaboration with role, visible fields, revocation, and access logs.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/escalate`: supplier, refund, charge, rewards, accessibility, privacy, and fraud support.
- `POST /supplier/webhooks/flights`, `POST /supplier/webhooks/stays`, `POST /supplier/webhooks/cars`, `POST /supplier/webhooks/activities`: supplier confirmation, schedule change, cancellation, refund, and voucher events with deduplication.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights with active-trip, rewards, payment, tax, support, and legal-retention caveats.

## Realtime, Push, And Offline Behavior

- Booking confirmation, ticketing, supplier schedule changes, cancellation, refund, reward posting, itinerary sharing, support, and account-security changes must use webhook-backed server state plus websocket/SSE/push-assisted client updates.
- The client may cache trip summaries, supplier confirmations, vouchers, documents, support drafts, reward summaries, and settings; cached trip data must show freshness and avoid hiding supplier changes.
- Offline mode may show itinerary essentials, vouchers, supplier contact, and cached documents, but booking, payment, cancellation, change, reward redemption, account deletion, and support escalation require server confirmation.
- Quotes, fares, rates, taxes, fees, reward eligibility, coupons, supplier availability, and package bundles must expire and refresh before payment.
- Push/email/SMS notification categories must include booking confirmations, schedule changes, check-in reminders, cancellation/refund updates, support, rewards, price alerts, account security, and marketing.
- Flights, packages, cars, activities, cruises, rewards, and provider-owned support states must be feature-flagged by supplier contract, region, legal review, and manual verification.

## Permissions, Privacy, And Safety

- Request location, notifications, calendar, camera/photos/files, contacts, and device authentication only when a related feature is invoked.
- Default analytics must exclude passport data, government IDs, full birth dates, payment credentials, exact accommodation addresses before disclosure, raw support evidence, private itinerary notes, and supplier confirmation codes.
- Supplier sharing must be purpose-limited to booking fulfillment, travel support, payment, legal compliance, fraud prevention, and customer-authorized sharing.
- Payment, reward redemption, coupons, refunds, Pay Now/Pay Later, taxes, fees, chargebacks, supplier settlement, and currency conversion must be server-owned and auditable.
- Travel safety controls must cover fraud, suspicious bookings, overbooking, schedule disruption, accessibility failure, unsafe accommodation/activity, stranded traveler, privacy incident, and emergency escalation.
- Itinerary sharing must hide payment/reward data by default, allow revoke, minimize confirmation exposure, and audit collaborator access.
- Privacy rights must expose account update, marketing opt-out, cookie choices, data export, deletion, retention caveats, and supplier-sharing explanations.
- Launch owners: supplier integration owner for travel inventory, payments owner for checkout/refunds/rewards, legal/compliance owner for terms/taxes/supplier rules, privacy owner for data rights, safety owner for disruption/accessibility/fraud, support owner for refunds/changes, and accessibility owner for inclusive planning.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, vertical searched, package quote built, product opened, fare/rate rules viewed, checkout started, booking confirmed, trip opened, cancellation previewed, reward redeemed, itinerary shared, support opened, data export requested, account deletion requested.
- Product quality metrics must use object ids, supplier ids, reason codes, quote freshness, latency, provider status, and failure categories without raw traveler documents, payment data, support evidence, or private itinerary details.
- Rewards analytics must separate earning, pending, available, redeemed, expired, tier progress, and missing-credit cases without exposing supplier confirmation details to product analytics.
- Monetization can include original marketplace commissions, package discounts, sponsored placements, member prices, reward program economics, insurance/provider add-ons, activities, cars, cruises, or premium support, but names, rates, benefit language, and supplier terms must be original and legal-reviewed.
- Fee/tax/reward display must be transparent before confirmation and explicit about what the platform, supplier, payment provider, or tax authority collects.

## Edge Cases

- First launch offline, expired session, unsupported OS, blocked region, underage traveler, language/currency mismatch, or denied optional permissions.
- Flight fare expires, airline schedule changes, ticketing fails, passenger data is invalid, baggage rules differ, connection is risky, or supplier cancels.
- Hotel is overbooked, rate changes, property closes, resort fee is supplier-collected, Pay Later charge fails, or no-show rules apply.
- Package component sells out, one component confirms while another fails, partial cancellation affects bundle price, or component rules conflict.
- Rewards are pending, ineligible, expired, not redeemable with Pay Later, tied to deleted account, converted across currency, or disputed as missing.
- Coupon stacks incorrectly, provider refuses payment, duplicate authorization occurs, refund returns to a closed card, or supplier handles refund outside platform visibility.
- Itinerary share exposes too much data, collaborator uses wrong account, invite expires, confirmation code is hidden, or shared trip is canceled.
- Support case is duplicate, urgent disruption, outside refund window, supplier-owned, legal-hold constrained, abusive, or accessibility/safety-sensitive.
- Data export, account deletion, rewards deletion, payment deletion, itinerary history, support case retention, tax retention, fraud investigation, and legal hold conflict.

## Test Plan

- Unit tests for vertical search filters, fare/rate rules, package quote composition, quote expiry, Pay Now/Pay Later, rewards eligibility, coupon stackability, and cancellation/change state machines.
- Unit tests for privacy-safe analytics, traveler-profile redaction, itinerary sharing visibility, account deletion eligibility, data export, and notification preference states.
- Contract tests for stays, flights, cars, activities, package, quote, booking, trip, cancellation, change, rewards, coupons, sharing, supplier webhook, support, and privacy endpoints.
- Integration tests for signed-out browsing, signed-in booking, stays search, flight search, package builder, checkout, payment failure recovery, trip wallet, cancellation preview, rewards redemption, sharing, and support.
- Offline tests for cached trip/voucher/document reads, blocked booking/payment/cancel/change/reward/delete actions, corrupt cache, and supplier-event reconciliation after reconnect.
- Payment/refund tests for duplicate submit, Pay Now, Pay Later, coupon/reward application, partial refund, supplier refund, original payment method, chargeback marker, and webhook delay.
- Rewards tests for enrollment, tier progress, pending/available rewards, redemption exclusions, missing credit, account deletion effect, and expired reward handling.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, map/list alternatives, fare/rule comprehension, and support reachability.
- Manual verification tests: native iOS/Android screenshots, account signup/login, flight/stay/package checkout, rewards earning/redemption, member prices, collaboration, push payloads, cancellation/change, refund, supplier support, account deletion, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Expedia assets, supplier inventory, private APIs, brand copy, terms text, proprietary recommendation/ranking systems, reward names, or support scripts.
- Travelers can search stays/flights/cars/activities, build a package, inspect rules, review transparent prices, apply eligible original rewards/coupons, book, manage an itinerary, share it, cancel/change with preview, and recover from denied permissions or network loss.
- Supplier rules, package dependencies, Pay Now/Pay Later, rewards, coupons, taxes, fees, refunds, changes, fraud, support decisions, and privacy rights are represented as auditable server-side state machines.
- Payment data, traveler profiles, reward data, supplier confirmations, itinerary sharing, support evidence, data export, and account deletion controls are accessible from settings/support and covered by tests.
- Flights, packages, cars, activities, cruises, insurance/add-ons, rewards accounting, native push payloads, supplier settlement, and regional legal/tax surfaces remain feature-flagged until provider, legal, privacy, safety, accessibility, and manual verification clear them.

## Open Questions

- Which licensed flight, lodging, car, activity, package, cruise, map, payment, tax, rewards, support, analytics, notification, and fraud providers will back V1?
- Which launch regions determine cancellation/change law, travel supplier disclosures, taxes/fees, insurance/add-on rules, payment methods, passenger data, and consumer refund obligations?
- Will V1 launch with packages, or start with separate flight/stay/car/activity bookings until supplier contracts and package refund logic are proven?
- What original rewards model replaces One Key without copying names, earning rates, tiers, benefit labels, or promotional language?
- How should supplier-owned support, platform-owned support, refund ownership, and chargeback handling be divided?
- What safety escalation model covers overbooking, flight disruption, stranded travelers, accessibility failures, fraud, privacy incidents, and urgent supplier failures?

## Build Plan

- Phase 1: scaffold app shell, auth/guest mode, Travel Home, vertical search tabs, stays search, flight search, product detail, settings/legal links, privacy-safe analytics, and provider attribution.
- Phase 2: add quote generation, fare/rate rules, checkout session, payment authorization, booking confirmation, itinerary wallet, offline cached trip essentials, and booking tests.
- Phase 3: add package builder, component dependency rules, coupons/credits, original rewards earning/redemption, member price indicators, and package/rewards tests.
- Phase 4: add cancellation/change previews, refund tracking, supplier webhooks, schedule-change handling, itinerary sharing/collaboration, notification categories, and support escalation.
- Phase 5: add cars, activities, documents/vouchers, accessibility/disruption support, fraud/risk gates, privacy rights automation, and audit dashboards.
- Phase 6: evaluate cruises, insurance/add-ons, advanced personalization, business travel, native widgets, and deeper supplier parity only after provider, legal, privacy, safety, accessibility, and manual verification approvals.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Use this as the multi-product OTA pattern for later travel, package, and marketplace specs.
- Continue the Batch 02 travel booking pass with `036-hopper.md` and `037-tripit.md`.
