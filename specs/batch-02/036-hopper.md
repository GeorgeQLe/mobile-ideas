# Hopper-Style Clone Spec

> Metadata
> - Inspiration app: Hopper
> - Category: Travel deals
> - Spec status: Implementation-ready public-source V1; hands-on account/device verification blocked unless noted.
> - Legal scope: functional parity research only; use original code, branding, copy, media, sample data, predictive models, policy language, and licensed integrations.

## Overview

Build an original mobile-first travel deals app inspired by Hopper's public price-prediction, watchlist, booking, price-freeze, and trip-flexibility workflows.
The V1 should support flight, hotel, home, and car search; deal calendars; watch notifications; booking checkout; price-freeze-style holds; cancel/change-for-any-reason-style add-ons; disruption assistance; support; and privacy controls.
Because Hopper-like products blend OTA booking with predictive recommendations and paid flexibility products, this spec treats prediction, freeze, refund, rebooking, and add-on claims as high-risk, auditable, legal-reviewed behavior.
Native parity, paid add-ons, push payloads, real provider booking, price prediction accuracy, rewards, refunds, rebooking, and regional eligibility remain manual blockers.

## Goals

- Replace Draft 1 discovery placeholders with exact first-party marketplace, product, help/legal, and privacy sources.
- Define app-specific requirements for price prediction, watchlists, color-coded deal calendars, flight/hotel/home/car booking, price freezes, trip-flexibility add-ons, disruption guarantees, and support.
- Model all prediction, quote, freeze, refund, rebooking, and paid add-on states as original, server-owned, legally reviewed contracts.
- Keep unverified native, account, paid, notification, supplier, prediction, refund, and regulated travel-product behavior blocked.
- Provide screen inventory, data model, API/backend contracts, offline/realtime behavior, safety/privacy controls, tests, acceptance criteria, and build plan.

## Non-Goals

- Do not copy Hopper branding, mascot, icons, screenshots, marketing copy, proprietary prediction models, deal rankings, price histories, supplier inventory, product names, legal terms, or support scripts.
- Do not present paid flexibility products as insurance unless legally approved and provider-backed.
- Do not claim exact prediction accuracy, freeze coverage, cancel/change refund, disruption guarantee, or customer-support behavior without verified product terms and lawful test bookings.
- Do not scrape private flight, lodging, home, car, fare, hotel-rate, or price-history data.
- Do not build application code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/hopper-flights-hotels-cars/id904052407 | Official iOS listing, category, seller, price prediction/watch, deal calendar, flights/hotels/homes/cars, Price Freeze, Cancel/Change For Any Reason, disruption guarantee, support, carbon/tree claims, privacy labels | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.hopper.mountainview.play | Official Android listing, package id, download/rating scale, data safety, flights/hotels/homes/cars, watch notifications, price freeze, flexible trip products, support contact | Verified 2026-04-17 |
| Hopper Web Product | https://hopper.com/ | Public Hopper web surface, sign-in deals, rewards/deals orientation, app download, destination deal modules, iOS/Android ratings | Verified 2026-04-17 |
| Hopper Help Center | https://help.hopper.com/ | Official support entrypoint referenced by listings; exact article-level behavior must be verified before implementation | Verified entrypoint 2026-04-17 |
| Hopper Privacy Notice | https://mobile-api.hopper.com/api/v1/legal/privacy-policy.html | Privacy scope, account phone verification, booking data, supplier sharing, notifications, marketing/analytics identifiers, access/deletion rights, security, minors | Verified 2026-04-17 |
| HTS Privacy Notice | https://hts.hopper.com/legal/privacy-policy | Hopper Technology Solutions privacy, services, vendors, personalization, fraud, rights, international transfer, minors, data controller details | Verified 2026-04-17 |
| Legal Overview | https://mobile-api.hopper.com/api/v1/legal/legal-overview.html | Flight booking caveats, airline rules, cancellation/change fees, non-refundable ticket/booking fee, baggage/additional service caveats, travel documentation, terms/privacy acceptance | Verified 2026-04-17 |
| Price Freeze For Hotels | https://media.hopper.com/news/hopper-announces-price-freeze-for-hotels-to-help-summer-travelers-lock-in | Public product description for hotel price freeze, coverage cap, deposit crediting, lower-price treatment, transferability claim, mobile availability | Verified 2026-04-17 |
| Cancel For Any Reason Terms | https://hts.hopper.com/legal/Travix-CFAR | Example CFAR terms, eligibility, cancellation deadline, refund handling, restrictions, non-transferability, service not offered on every booking | Verified 2026-04-17 |
| Disruption Assistance Example | https://hts.hopper.com/legal/Viva-Disruption | Example disruption assistance terms, delay/cancellation trigger, rebooking cap, service expiration, restrictions, taxes, passenger scope | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position Hopper as a mobile app for flights, hotels, homes, and rental cars with price prediction, watch notifications, cheapest-date calendar, price freeze, cancel/change add-ons, disruption rebooking, and 24/7 customer support.
- Search must support flights, hotels, homes, and cars with product-specific filters and one shared deal-orientation model: quote freshness, predicted trend, current recommendation, confidence, and provider availability.
- Price prediction must be original, explainable, and probabilistic; every recommendation needs model version, data source, confidence, freshness, and fallback copy when prediction is unavailable.
- Watchlists must let users watch a route/stay/car search, set date/range preferences, receive push/email alerts, pause/delete watches, and understand that recommendations are not guarantees.
- Deal calendars must show relative price bands for date combinations without copying Hopper colors/artwork; accessible labels must explain cheap/typical/expensive states without relying on color alone.
- Price-freeze-style holds must model deposit/fee, frozen product, freeze window, coverage cap, lower-price treatment, transferability, expiration, provider availability, purchase conversion, refundability, and tax/fee treatment.
- Cancel/change-for-any-reason-style add-ons must be presented as original service products with eligibility, purchase timing, covered booking scope, refund amount, deadline, excluded disruptions, passenger scope, and legal disclaimers.
- Disruption assistance must model eligible delay/cancellation events, rebooking offers, service caps, election window, traveler choice, no-election expiry, and supplier/provider limitations.
- Checkout must disclose base trip price, taxes/fees, paid add-ons, price-freeze fee/deposit, flexibility products, provider rules, booking fees, non-refundable amounts, payment method, and quote expiry before confirmation.
- Trip management must group booked travel, watches, freezes, support cases, add-ons, refund/rebooking states, confirmation emails, supplier contact, and offline essentials.
- Support must cover booking errors, paid add-on questions, refund/rebooking, flight disruption, hotel/car issues, payment problems, account access, privacy requests, and complaint escalation.
- Carbon/planting, rewards, subscription, or deal-club claims must remain feature-flagged until public terms, provider commitments, and legal substantiation are reviewed.

## Core User Journeys

- New traveler installs the app, searches a flight route, views a cheapest-date calendar, receives a book-now-or-watch recommendation, creates an account, and starts a watch without booking.
- Returning traveler receives a price alert, opens the watched trip, reviews prediction confidence and fare rules, books the flight, and sees supplier confirmation plus support actions.
- Traveler searches hotels, freezes a rate with a fee/deposit, waits, returns before expiration, books at the frozen or lower rate where rules allow, or lets the freeze expire with clear outcome.
- Traveler buys a cancel-for-any-reason-style add-on at checkout, later cancels within the eligible window, sees the refund calculation, and tracks payout or denial reason.
- Traveler encounters a delayed or canceled flight, opens disruption assistance, receives eligible rebooking options up to a cap, selects or declines, and sees service-expiration warnings.
- Car renter searches rental cars, reviews age/deposit/provider terms, books, and receives pickup/dropoff details with provider-owned support caveats.
- Traveler loses connectivity during a trip, reads cached itinerary and support number, but cannot book, freeze, cancel, change, or request reimbursement until reconnected.
- Support user disputes a price-freeze, add-on, refund, rebooking, or supplier issue through evidence-backed case routing.
- Privacy-focused user reviews phone/email, search history, watched trips, booked trips, notifications, marketing/analytics choices, data access/deletion, and supplier sharing.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, phone/email account, terms, privacy | phone/email, OTP, passkey/password, legal links | new, returning, signed-out | OTP fail, locked account, underage, blocked region |
| Deals Home | Search, watches, deals, rewards/deal modules | vertical, destination, dates, watch, sign in | personalized, signed-out, empty | no deals, personalization disabled, provider outage |
| Flight Search | Route and fare discovery | origin, destination, dates, passengers, cabin | results, calendar, watch, book | prediction unavailable, fare expired, baggage ambiguity |
| Hotel/Home Search | Lodging deal discovery | destination, dates, guests, filters, map | list, map, calendar, freeze | stale rate, room sold out, provider unavailable |
| Car Search | Rental car discovery | location, dates, driver age, filters | results, selected, booked | age/deposit block, provider terms conflict |
| Deal Calendar | Flexible-date pricing | date grid, range, watch, select | cheap, typical, expensive, unknown | color-only risk, stale price, no inventory |
| Prediction Detail | Explain recommendation | trend, confidence, history, watch | book, wait, watch, unavailable | low confidence, model stale, provider missing |
| Watchlist | Watched trips and alerts | create, pause, delete, alert settings | active, paused, alerted | duplicate watch, notification denied, stale alert |
| Price Freeze | Hold a price/rate | freeze product, fee/deposit, window | active, converted, expired | price changed, cap exceeded, provider sold out |
| Checkout | Book trip and add products | traveler, payment, add-ons, terms | ready, authorizing, booked | payment fail, fraud review, quote expired |
| Trip Detail | Booked itinerary and recovery | booking, support, cancel/change, docs | upcoming, active, past, canceled | supplier change, offline stale, confirmation missing |
| Add-On Claims | Cancel/change/disruption service state | claim, reason, evidence, options | eligible, submitted, approved, denied | missed deadline, excluded event, cap exceeded |
| Support Case | Help and dispute handling | issue, evidence, contact, escalation | submitted, reviewing, resolved | urgent travel, duplicate, legal hold |
| Settings/Privacy | Account, notifications, data rights | toggles, export, delete, legal links | signed-in, signed-out, pending delete | active booking, retention caveat, OTP fail |

## Data Model

- `User`: identity, phone/email verification, locale, language/currency, traveler profiles, notification preferences, rewards/deals state, privacy settings, export/delete lifecycle, and risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, attribution identifiers, offline cache version, and last active state.
- `TravelSearch`: vertical, route/destination, dates/flexible range, travelers, cabin/rooms/driver age, filters, sort, personalization state, and cursor.
- `ProviderOffer`: flight, hotel, home, or car offer with supplier id, fare/rate class, availability token, price, taxes/fees, rules, add-on eligibility, and expiry.
- `Prediction`: watched search, model version, data source, recommendation, confidence, price bands, expected movement, generated time, and unavailable reason.
- `Watch`: user, search criteria, alert channels, price threshold, recommendation status, pause/delete state, last alert, and dedupe key.
- `DealCalendarCell`: date/date-range, product type, price band, quote reference, confidence, inventory state, accessible label, and freshness.
- `PriceFreeze`: offer snapshot, fee/deposit, freeze window, coverage cap, converted booking, lower-price handling, transferability, expiration, refundability, and audit ids.
- `FlexProduct`: cancel/change/disruption add-on, eligible product, service terms version, deadline, refund/rebooking cap, passenger scope, excluded events, and legal disclaimer state.
- `Booking`: booked offer, traveler profiles, payment state, supplier confirmation, add-ons, price-freeze link, support cases, cancellation/change state, and audit ids.
- `Claim`: flex/disruption/refund claim, eligibility result, evidence, traveler election, payout/rebooking result, denial reason, SLA, and appeal state.
- `PaymentMethod`: tokenized card/wallet, billing country, SCA/3DS state, add-on fee/refund support, failure reason, and deletion constraints.
- `SupportCase`: booking, freeze, prediction, watch, add-on, disruption, supplier, payment, privacy, or account issue with evidence, owner queue, decision, and legal hold.
- `AuditEvent`: append-only record for auth, search, prediction, watch, quote, freeze, checkout, payment, add-on purchase, claim, support, privacy, and supplier callbacks.
- `LocalCacheRecord`: cached watches, predictions, trip summaries, support drafts, settings, provider contacts, freshness, and conflict markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify`, `POST /auth/recover`, `DELETE /auth/session`: phone/email account lifecycle with fraud, deletion, and device gates.
- `GET /search/flights`, `GET /search/hotels`, `GET /search/homes`, `GET /search/cars`: product search with provider availability, fare/rate rules, pagination, quote freshness, and add-on eligibility.
- `POST /predictions`, `GET /predictions/:id`: original price recommendation with model version, confidence, freshness, accessible explanation, and unavailable states.
- `GET /deal-calendar`: date-band reads with price bands, confidence, inventory status, and stale-price handling.
- `GET /watches`, `POST /watches`, `PATCH /watches/:id`, `DELETE /watches/:id`: watched searches, alert preferences, pause/delete, dedupe, and notification state.
- `POST /price-freezes`, `GET /price-freezes/:id`, `POST /price-freezes/:id/convert`, `POST /price-freezes/:id/transfer`: freeze purchase, expiry, conversion, lower-price handling, cap, and audit events.
- `GET /flex-products`, `POST /flex-products/purchase`, `POST /claims`, `GET /claims/:id`: add-on eligibility, purchase timing, service terms, claim submission, refund/rebooking decision, and appeal path.
- `POST /checkout/session`, `POST /bookings`, `GET /trips`, `GET /trips/:id`: booking creation and itinerary reads with idempotency, add-ons, supplier confirmations, and support affordances.
- `POST /supplier/webhooks/flights`, `POST /supplier/webhooks/hotels`, `POST /supplier/webhooks/cars`: confirmation, schedule, cancellation, refund, and provider status callbacks with dedupe.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/escalate`: account, booking, freeze, add-on, disruption, payment, supplier, and privacy cases.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights with active-trip, payment, add-on, fraud, support, and legal-retention caveats.

## Realtime, Push, And Offline Behavior

- Price alerts, watch recommendations, price-freeze expiry, booking confirmation, supplier schedule changes, disruption eligibility, claim status, support, and account-security updates must use push-assisted polling/websocket events with stable ids.
- The client may cache active watches, recent predictions, deal calendars, trip summaries, provider contacts, support drafts, and settings; cached predictions must display generated time and cannot be treated as current.
- Offline mode may show cached watches, trip details, and support contact, but search refresh, booking, price freeze, add-on purchase, cancellation, claim submission, payment, and account deletion require server confirmation.
- Provider offers, predictions, deal calendar cells, price-freeze conversion eligibility, add-on eligibility, taxes/fees, and payment sessions must expire and refresh before transaction.
- Push notification categories must include price alerts, watch updates, freeze expiry, booking confirmation, disruption, claim decision, support, account security, rewards/deals, and marketing.
- Price freeze, CFAR/change, disruption, carbon/rewards, homes, cars, and partner products must be feature-flagged by provider contract, legal review, jurisdiction, and manual verification.

## Permissions, Privacy, And Safety

- Request notifications, location, calendar, camera/photos/files, contacts, and device authentication only when a related feature is invoked.
- Default analytics must exclude raw payment credentials, government IDs, full date of birth, exact travel documents, supplier confirmation numbers, private support evidence, and precise location trails.
- Predictions and recommendations must be labeled as estimates, include confidence/freshness, avoid manipulative urgency, and degrade gracefully when model input is insufficient.
- Paid flexibility products must show clear eligibility, non-refundable fees, exclusions, caps, deadlines, and legal disclaimers before purchase.
- Payment, refund, freeze, claim, rebooking, coupon/reward, tax, and supplier settlement behavior must be server-owned, auditable, and provider/legal-reviewed.
- Support and safety controls must cover stranded travelers, supplier cancellation, payment disputes, add-on denial, fraud, account takeover, privacy incidents, and urgent disruption escalation.
- Privacy rights must support account update, marketing/analytics choices, data access/export, deletion, and retention caveats for bookings, payments, claims, support, fraud, and legal obligations.
- Launch owners: prediction owner for model quality, legal/compliance owner for paid add-ons and claims, supplier owner for inventory/booking, payments owner for checkout/refunds, privacy owner for data rights, support owner for disruption/claims, and accessibility owner for deal calendar/prediction UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, calendar viewed, prediction generated, watch created, alert opened, freeze offered/purchased/converted/expired, checkout started, add-on viewed/purchased, trip booked, claim submitted, support opened, data export requested, account deletion requested.
- Prediction analytics must record model version, confidence band, outcome category, alert latency, and error code without exposing raw user itinerary, payment, or private supplier data.
- Monetization can include original booking commissions, paid price holds, paid flexibility products, subscription/deal programs, rewards, supplier promotions, carbon contributions, or premium support, but claims, fees, benefit names, and promotional copy must be original and legally substantiated.
- Paid add-on analytics must separate quote, eligibility, purchase, claim, approval, denial, payout, rebooking, appeal, and complaint states for audit.
- Fee display must distinguish base fare/rate, taxes, provider fees, platform fees, freeze fee/deposit, paid add-ons, refunds, caps, and non-refundable amounts.

## Edge Cases

- First launch offline, OTP failure, locked account, underage user, unsupported region, language/currency mismatch, or notifications denied.
- Prediction unavailable, low confidence, stale model, provider outage, duplicate watch, alert arrives after price changes, or user books elsewhere.
- Deal calendar price band changes, no inventory remains, color-only accessibility fails, date range crosses holidays, or quote expires.
- Price freeze expires, offer sells out, cap is exceeded, lower price appears, fee/deposit is non-refundable, transfer target is invalid, or provider rejects conversion.
- CFAR/change add-on is unavailable, purchased too late, canceled after deadline, partial trip scope, excluded event, multiple passengers, or refund amount is capped.
- Disruption event is outside threshold, election window expires, rebooking cap is exceeded, traveler no-shows, supplier changes status late, or replacement fare is unavailable.
- Payment fails, duplicate authorization occurs, add-on and base booking settle separately, refund returns to closed card, or chargeback conflicts with claim.
- Support case is urgent, duplicate, outside policy, supplier-owned, fraud-sensitive, legal-hold constrained, or safety-critical.
- Data export, account deletion, watch history, booking history, payment retention, claim evidence, support logs, fraud investigation, and legal hold conflict.

## Test Plan

- Unit tests for search filters, deal-calendar bands, prediction freshness/confidence, watch dedupe, alert rules, quote expiry, price-freeze state machine, and add-on eligibility.
- Unit tests for CFAR/change/disruption claim windows, caps, passenger scope, excluded events, refund/rebooking decisions, appeal states, and legal disclaimer display.
- Unit tests for privacy-safe analytics, sensitive-field redaction, account deletion eligibility, data export, notification permission states, and model-outcome logging.
- Contract tests for search, prediction, deal calendar, watch, price freeze, flex product, claim, checkout, booking, supplier webhook, support, and privacy endpoints.
- Integration tests for flight search, hotel search, car search, deal calendar, watch creation, price alert open, freeze purchase/conversion, checkout, trip detail, claim submission, and support.
- Offline tests for cached watches/predictions/trips, blocked booking/freeze/add-on/claim/payment/delete actions, stale prediction warnings, corrupt cache, and reconnect reconciliation.
- Payment/refund tests for fee/deposit, add-on fee, duplicate submit, provider failure, partial refund, claim payout, rebooking cap, closed-card refund, and webhook delay.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, deal calendar alternatives, prediction explanation, and claim disclosure comprehension.
- Manual verification tests: native iOS/Android screenshots, phone/email signup, flight/hotel/car checkout, price alerts, price freeze, paid flexibility products, disruption assistance, support, push payloads, refunds, account deletion, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Hopper assets, mascot, supplier inventory, proprietary prediction models, private APIs, product names, legal terms, price histories, ranking systems, or support scripts.
- Travelers can search flights/hotels/homes/cars, view accessible deal calendars, watch trips, receive alerts, understand prediction confidence, book travel, manage trips, purchase clearly disclosed original flexibility products, and recover from denied permissions or network loss.
- Predictions, watches, quotes, price freezes, paid add-ons, claims, disruption assistance, payments, refunds, support decisions, and privacy rights are represented as auditable server-side state machines.
- Price-freeze, CFAR/change, disruption, supplier booking, rewards/deals, carbon claims, native push payloads, and regional legal/tax surfaces remain feature-flagged until provider, legal, privacy, safety, accessibility, and manual verification clear them.

## Open Questions

- Which licensed flight, lodging, home, car, pricing, prediction data, payment, tax, support, notification, fraud, and analytics providers will back V1?
- What source data and evaluation process will support original price predictions without copying Hopper models or making misleading savings claims?
- Which paid flexibility products are legal to offer in each launch region, and are they services, warranties, insurance, or another regulated category?
- What are the acceptable coverage caps, refund methods, deadlines, exclusions, tax treatment, and support SLAs for freeze and flexibility products?
- Will V1 include homes, cars, rewards/deals, carbon contributions, and subscription-like benefits at launch or keep them behind feature flags?
- How should urgent disruption support be staffed and audited for travelers already in transit?

## Build Plan

- Phase 1: scaffold app shell, auth/OTP, Deals Home, flight search, hotel search, car placeholder, deal calendar, prediction explanation, watchlists, settings/legal links, and privacy-safe analytics.
- Phase 2: add provider-backed quotes, checkout session, booking confirmation, trip detail, offline cached essentials, price alert notifications, and search/booking tests.
- Phase 3: add original prediction model service, model versioning, watch alert pipeline, confidence/freshness UX, outcome analytics, and model-quality tests.
- Phase 4: add price-freeze-style product, freeze purchase/conversion/expiry, fee/deposit accounting, coverage caps, provider conversion, and legal/audit tests.
- Phase 5: add cancel/change/disruption products, claim submission, eligibility engine, refund/rebooking decisions, appeal/support routing, and paid-add-on tests.
- Phase 6: add homes, rewards/deals, carbon/substantiation review, richer supplier callbacks, privacy rights automation, accessibility audit, and native/manual verification after provider/legal approvals.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Treat paid flexibility and prediction claims as legal-review blockers before any downstream implementation.
- Continue the Batch 02 travel booking pass with `037-tripit.md`.
