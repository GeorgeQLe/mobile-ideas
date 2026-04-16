# Airbnb-Style Clone Spec

> Metadata
> - Inspiration app: Airbnb
> - Category: Travel lodging, short-term rental marketplace, services, experiences, guest/host messaging, and trip management
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-16.
> - Verification basis: exact public marketplace pages, Airbnb Help Center pages, Airbnb legal/privacy pages, Airbnb policy pages, Resource Center pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, identity verification, reservation checkout, payment plans, refunds, host payout setup, host onboarding, in-app messaging attachments, push payloads, trip offline behavior, services/experiences booking, host cancellation, damage/dispute resolution, safety line, account deletion, regional taxes, and lodging-regulation surfaces still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, property data, host profiles, listing photos, reviews, maps, pricing engines, risk systems, payment providers, identity vendors, moderation rules, tax logic, and customer-support workflows.

## Overview

Build an original mobile travel marketplace inspired by Airbnb's public workflow: search and personalized discovery, map/list lodging results, listing detail, availability calendars, transparent price breakdown, Instant Book or request-to-book checkout, wishlists, group trip coordination, host/guest messaging, Trips itinerary, cancellations/refunds, reviews, identity verification, host listing tools, services, experiences, safety/support, privacy controls, and account/data rights.

The clone must not copy Airbnb branding, screenshots, marketing copy, protected UI artwork, listing inventory, listing photos, host/guest reviews, recommendation systems, private APIs, price/risk models, trust/safety systems, or support content. Functional parity should be expressed through original product language, licensed maps and payments, original or licensed lodging data, independently designed search/ranking and risk logic, transparent policy handling, and jurisdiction-aware compliance.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first lodging marketplace with destination/date/guest search, map/list results, listing detail, wishlists, booking, checkout, trips, messaging, reviews, support, and privacy controls.
- Support host-facing V1 flows for listing setup, calendar/pricing controls, booking settings, house rules, guest safety disclosures, messages, reservations, payouts, taxes, and cancellation/refund impacts.
- Preserve marketplace trust expectations around identity verification, accurate listings, nondiscrimination, fee transparency, cancellation policies, property safety, guest/host conduct, damage claims, fraud prevention, and regional lodging rules.
- Expose privacy controls for profile data, payment data, precise/coarse location, search/browsing history, messages, photos/videos, identity documents, data export, account deletion, and third-party sharing.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Airbnb-branded app or imply affiliation with Airbnb, hosts, co-hosts, guests, insurers, map providers, payment providers, identity vendors, tax authorities, or local lodging regulators.
- Do not scrape Airbnb, reuse private Airbnb APIs, replay Airbnb network traffic, copy listing data, copy reviews/photos, copy host profiles, clone proprietary search/ranking/risk systems, or reproduce Airbnb policy copy.
- Do not process production lodging payments, payment plans, refunds, deposits, tax remittance, host payouts, identity documents, damage claims, insurance-like protections, or safety emergencies without separate legal, compliance, trust/safety, and payment-provider review.
- Do not publish marketplace listings, services, experiences, messages, reviews, host tools, or support/dispute surfaces without abuse prevention, privacy, moderation, audit logging, and escalation paths.
- Do not claim exact App Store, Play Store, native-device, checkout, payment-plan, identity-verification, host-onboarding, payout, tax, refund, safety-line, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/airbnb/id401626263 | Official iOS listing, category, supported devices, release notes, privacy labels, age rating, homes/experiences/services claims, Trips and messaging claims | Verified 2026-04-16 |
| Google Play | https://play.google.com/store/apps/details?id=com.airbnb.android | Official Android listing, package id, data-safety labels, downloads/rating scale, homes/experiences/services, filters, trip info, messaging, offline trip-detail claims, host listing claims | Verified 2026-04-16 |
| Airbnb Help Center | https://www.airbnb.com/help | Canonical help topic inventory for booking, cancellations, payments, pricing, messages, reviews, safety, hosting, privacy, and account support | Verified 2026-04-16 |
| How To Book A Home | https://www.airbnb.com/help/article/85 | Instant Book versus request-to-book, account setup, dates/guests, reserve, confirm/pay, request message, host approval | Verified 2026-04-16 |
| Instant Book | https://www.airbnb.com/help/article/523 | Guest Instant Book behavior, account setup, reservation length constraints, host response deadline for requests | Verified 2026-04-16 |
| Booking Settings For Hosts | https://www.airbnb.com/help/article/3728 | Host booking settings, Instant Book, guest requirements, advance notice, preparation time, minimum/maximum trip length | Verified 2026-04-16 |
| Search Filters | https://www.airbnb.com/help/article/479 | Destination/date/guest/pet search inputs, monthly stays, flexible dates, and stay/service/experience filters | Verified 2026-04-16 |
| Search Results | https://www.airbnb.com/help/article/39 | Search ranking factors, filter effects, host and guest signals, listing quality, popularity, price, location, variety | Verified 2026-04-16 |
| Recommendation Systems | https://www.airbnb.com/help/article/4083 | Homepage/search/review recommendation systems, ranking criteria, personalization factors, review ordering | Verified 2026-04-16 |
| Availability | https://www.airbnb.com/help/article/137 | Date/guest/pet availability, saved-place availability filtering, host calendar caveat, host message fallback | Verified 2026-04-16 |
| Wishlists | https://www.airbnb.com/help/article/1236/how-do-i-manage-my-list-of-saved-homes | Save listings, create/edit/delete wishlists, collaboration, share links, per-wishlist limits, saved search dates | Verified 2026-04-16 |
| Pricing For Homes | https://www.airbnb.com/help/article/125 | Nightly price, cleaning/extra guest/pet fees, deposits for selected hosts, VAT/GST/local taxes, payment timing | Verified 2026-04-16 |
| Pricing Display In The United States | https://www.airbnb.com/help/article/3610 | US fee-inclusive total price before taxes, tax display, jurisdictional tax caveats | Verified 2026-04-16 |
| Airbnb Service Fees | https://www.airbnb.com/help/article/1857/what-are-airbnb-service-fees | Guest/host service fee structures, cross-currency fees, single fee, service/experience fee treatment | Verified 2026-04-16 |
| Taxes For Guests | https://www.airbnb.com/help/article/318 | Local tax disclosure, Airbnb-collected taxes, host-collected taxes, VAT on service fees | Verified 2026-04-16 |
| Cancellations Hub | https://www.airbnb.com/help/article/3122 | Guest/host cancellation topics, request withdrawal, host cancellation, service/experience cancellation, major disruptive events | Verified 2026-04-16 |
| Cancellation Policy Location | https://www.airbnb.com/help/article/3016 | Listing and checkout cancellation-policy placement, confirmed-reservation cancellation path | Verified 2026-04-16 |
| Home Cancellation Refunds | https://www.airbnb.com/help/article/3066 | Refund amount dependency on policy/timing/stay length, service fee refunds, payment plan refunds, credits, property fees | Verified 2026-04-16 |
| Host Cancellation | https://www.airbnb.com/help/article/170 | Full refund when host cancels before check-in, rebooking help, booking credit flow, host-cancel requirement | Verified 2026-04-16 |
| During-Stay Cancellation | https://www.airbnb.com/help/article/544 | Host contact, 72-hour issue reporting, proof collection, partial/full refund request, Airbnb escalation | Verified 2026-04-16 |
| Messages | https://www.airbnb.com/help/article/145 | Login requirement, guest/host/co-host group threads, read receipts, threaded replies, messaging limits | Verified 2026-04-16 |
| Message Management | https://www.airbnb.com/help/article/3558 | Unified inbox, filters, search, group threads, photos/videos, guest/host/support messages | Verified 2026-04-16 |
| Identity Verification | https://www.airbnb.com/help/article/1237 | Identity verification purpose, requested data, timing, badge, data handling, host identity requests | Verified 2026-04-16 |
| Reviews Policy | https://www.airbnb.com/help/article/3048 | Authenticity, relevance, bias/incentive bans, policy moderation, reporting, response, removal | Verified 2026-04-16 |
| Reviews For Homes | https://www.airbnb.com/help/article/2825 | Home review basics, Guest Favorites/highlights, rating/reliability signals | Verified 2026-04-16 |
| Leave A Review | https://www.airbnb.com/help/article/3531 | 14-day review window, guest/host review paths, save-and-exit, reservation linkage | Verified 2026-04-16 |
| Terms Of Service | https://www.airbnb.com/terms | Search/book contract, total price, host contracts, platform rules, fees, refunds, recommendation transparency | Verified 2026-04-16 |
| Privacy Policy | https://www.airbnb.com/help/article/3175/ | Personal data categories, identity/payment/location/content data, controllers, sharing, rights, retention, security | Verified 2026-04-16 |
| Privacy Rights | https://www.airbnb.com/help/article/2273/ | Account deletion, data access/download request, security check, irreversible account closure caveat | Verified 2026-04-16 |
| Airbnb Privacy Index | https://www.airbnb.com/help/article/2855 | Privacy policy and supplemental privacy documents, cookie policy, service-specific privacy supplements | Verified 2026-04-16 |
| Nondiscrimination Policy | https://www.airbnb.com/help/article/3738 | Community commitment, protected characteristics, homes/services/experiences scope, anti-discrimination requirements | Verified 2026-04-16 |
| Community Standards | https://www.airbnb.com/standards | Safety, security, privacy, fairness, authenticity, reliability pillars | Verified 2026-04-16 |
| Privacy Community Policy | https://www.airbnb.com/help/article/3060 | Digital and physical privacy, private information sharing, indoor camera and recording-device policy | Verified 2026-04-16 |
| Security Devices | https://www.airbnb.com/help/article/2914 | Host disclosure requirements for exterior cameras, recording devices, noise monitors, and prohibited indoor monitoring | Verified 2026-04-16 |
| Safety Requirements For Homes | https://www.airbnb.com/help/article/2839 | Host safety disclosures, property hazards, safety devices, house rules, guest-safety section | Verified 2026-04-16 |
| Ground Rules For Guests | https://www.airbnb.com/help/article/2894 | Guest cleanliness, house rules, reporting, enforcement, appeals | Verified 2026-04-16 |
| Off-Platform And Fee Transparency Policy | https://www.airbnb.com/help/article/2799 | Off-platform booking/payment bans, fee disclosure, contact/identity limits, external feedback restrictions | Verified 2026-04-16 |
| Resolution Center | https://www.airbnb.com/help/article/767 | Send/request money, refund/payment requests, 60-day post-checkout window, damage reimbursement path | Verified 2026-04-16 |
| Damage Charges | https://www.airbnb.com/help/article/1415/ | Guest damage reporting, host reimbursement request, 24-hour response, Airbnb review escalation | Verified 2026-04-16 |
| AirCover For Hosts | https://www.airbnb.com/help/article/3142 | Host damage/liability protection, guest identity verification, reservation screening, safety line, claim workflow | Verified 2026-04-16 |
| Payouts For New Hosts | https://www.airbnb.com/help/article/3133 | Payout setup, timing, earnings dashboard, payout breakdown, payout method activation | Verified 2026-04-16 |
| Host Payout Timing | https://www.airbnb.com/help/article/425 | Reservation-type payout timing, processing delays, payout review, payout method settings | Verified 2026-04-16 |
| Add Payout Method | https://www.airbnb.com/help/article/54 | Host payout method setup, billing country/region, default method, micro-deposit confirmation | Verified 2026-04-16 |
| Host Taxes | https://www.airbnb.com/help/article/2524/how-does-tax-payout-and-reporting-work%3F | Local taxes, VAT/GST, tax payout/reporting, host tax responsibilities | Verified 2026-04-16 |

## Detailed Design

### Source-Backed Product Requirements

- The public mobile listings position Airbnb around homes, experiences, and services in one app, with lodging discovery across many countries/regions, extensive filters, listing pages, ratings/reviews, trip details, in-app messaging, day-by-day Trips, offline access to key trip details, and host listing tools.
- Search must support destinations, flexible dates, monthly stays, check-in/check-out dates, guests, children, infants, pets, home/service/experience type, filters, availability, map/list display, wishlist-aware availability, and transparent no-results states.
- Search and recommendation ranking must be original, explainable, and privacy-reviewed; public Airbnb docs disclose factors such as location, price, availability, reviews, customer service/cancellation history, popularity, prior trips, saved listings, host requirements, seasonality, search history, language, and similar guest interest.
- Results must render one canonical result model as both map markers and list cards, with total price handling, fee/tax caveats, rating/review highlights, Guest Favorite-like original labels, accessibility attributes, saved state, instant-book/request state, and unavailable reason codes.
- Listing detail must support photos, title, location summary, room/property type, capacity, bedrooms/beds/baths, amenities, accessibility features, house rules, host/co-host profiles, cancellation policy, safety devices, property hazards, reviews, map preview, price breakdown, taxes/fees, availability calendar, share/save, and report listing.
- Booking must support Instant Book and request-to-book variants, account setup gates, guest count validation, house-rule agreement, cancellation-policy review, total price review, payment authorization, request message to host, host approval/decline/expiration, and confirmation state.
- Checkout must display the total price and its components before payment, including nightly rate, host-set fees, service fees, taxes that can be calculated, offline/onsite fee disclosures, currency conversion caveats, credits/coupons, payment plan state, and refund implications.
- US users must see fee-inclusive total price before taxes where applicable; other regions need jurisdiction-specific price, tax, and fee display rules that are configuration-driven and legal-reviewed.
- Trips must show confirmed/pending/canceled reservations, day-by-day itinerary, check-in/out times, entry instructions, address or approximate location as policy allows, wifi/details, booked services/experiences, support actions, cancellation actions, and offline cached key details.
- Messaging must require an account, unify guest/host/co-host/support threads, create reservation group threads, support search/filters/read receipts/threaded replies, allow photos/videos where permitted, and enforce messaging limits plus abuse/moderation gates.
- Wishlists must support saving homes/experiences, creating/editing/deleting lists, collaborative lists, view-only share links, per-list limits, saved search dates, availability filtering, sync conflicts, and unavailable/deleted-listing states.
- Reviews must be tied to genuine stays/services/experiences, support a limited post-stay review window, prevent biased/incentivized/fake/irrelevant content, expose host/guest response/removal/report paths, and support original relevance/recency/rating sorting.
- Identity verification must be modeled as a trust gate that can ask for profile, contact, payment, government ID, selfie, date-of-birth, address, or digital identity data where legally allowed, with badge state, retry/failure, data-retention, and host-request boundaries.
- Host tools must support listing creation, calendar availability, pricing/fees, booking settings, Instant Book, guest requirements, minimum/maximum nights, preparation time, house rules, safety/property disclosures, amenities/accessibility, payout setup, taxes, reservations, messages, reviews, and support.
- Services and experiences must be separate listing types with their own schedule, capacity, quality/safety rules, cancellation/refund policies, host application/approval, service fee model, and guest review behavior.
- Cancellations/refunds must use policy-aware state machines for guest cancel, host cancel, pending request withdrawal, during-stay issues, service/experience cancellation, payment-plan refund limits, credits/coupons, rebooking help, and Major Disruptive Event-style overrides.
- Damage/dispute flows must support host reimbursement requests, guest response windows, evidence, Resolution Center requests, platform review, audit logs, payout deduction/recovery, and escalation without making unsupported insurance claims.
- Safety and privacy controls must cover nondiscrimination, off-platform payments/contact, indoor camera bans, exterior camera/noise-monitor disclosures, property hazards, house rules, weapons/dangerous objects, guest conduct, host conduct, report/block, emergency guidance, and 24-hour safety support escalation.
- Account settings must expose profile, payments, payout methods for hosts, taxes, notifications, privacy/sharing, data download, account deletion, terms, policies, support, accessibility, language/currency, and regional supplements.

## Core User Journeys

- New guest installs the app, browses signed-out, searches a destination, filters by dates/guests/pets and accessibility needs, opens map/list results, saves listings, and creates an account only when a gated action requires it.
- Returning guest opens personalized discovery, resumes a recent search or trip, compares map/list options, opens a listing, checks reviews/cancellation/safety/fees, messages the host if needed, and completes Instant Book or sends a request.
- Guest submits a request-to-book with payment details and a host message, waits for host approval, handles approval/decline/expiration, receives confirmation, and sees the reservation in Trips.
- Traveler opens Trips before arrival, shares reservation details with co-travelers, reads check-in instructions and wifi details, uses offline cached trip details, messages the host, books a service or experience, and contacts support from the trip.
- Guest cancels before or during a stay, previews the refund amount, sees policy-specific treatment for service fees, credits, payment plans, and taxes, submits evidence for a covered issue, and escalates to support if host resolution fails.
- Host creates a listing, adds photos and amenities, configures house rules, safety devices, accessibility, calendar availability, prices, fees, taxes, cancellation policy, booking settings, and payout method, then reviews listing readiness.
- Host receives an Instant Book or booking request, reviews guest/identity/trip details allowed by policy, accepts/declines or handles automatic confirmation, messages the guest, prepares check-in instructions, and tracks payout status.
- Host and guest use a reservation group thread with co-hosts/co-travelers, attachments, read receipts, support handoff, abuse reporting, and fallback when message delivery or notification permission fails.
- Guest and host complete post-trip reviews within the review window, handle response/removal/report states, and see the impact on profile/listing reputation without allowing fake or retaliatory reviews.
- Host opens a Resolution Center reimbursement request for damage, adds evidence, guest responds within the allowed window, support reviews the claim, and audit events capture decisions and payout impacts.
- Privacy-focused user reviews profile, payment, location, search history, messages, identity data, data download, deletion, notification, language/currency, and third-party sharing controls.
- Trust/safety user reports discrimination, unsafe property conditions, hidden cameras, off-platform payment requests, harassment, fraud, weapons, privacy invasion, or emergency concerns through an auditable escalation path.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, terms, privacy, and permission education | sign in, create account, guest continue, legal links | new, returning, signed-out, managed/region state | auth failure, unsupported OS, underage, blocked region |
| Explore Home | Discovery, personalized recommendations, recent searches, categories | search, category, date, guest count, location prompt | signed-out, signed-in, personalized, empty | no network, recommendation disabled, privacy opt-out |
| Search Form | Destination/date/guest/pet/monthly search setup | destination, dates, flexible dates, guests, pets, filters | default, editing, valid, invalid | ambiguous destination, unavailable dates, invalid guest mix |
| Map/List Results | Marketplace results with shared map/list state | pan/zoom, filters, sort, save, card tap | loading, results, map, list, saved | no results, stale prices, provider outage, unavailable listing |
| Listing Detail | Inspect lodging/service/experience before booking | photos, calendar, reviews, host, rules, reserve | available, unavailable, saved, shared | missing license, safety warning, removed listing, region block |
| Price Breakdown | Explain total price, fees, taxes, credits, currency | expand sections, currency, coupon, payment plan | complete, estimate, tax pending, fee-inclusive | offline fees, manual tax, currency conversion, stale quote |
| Booking/Checkout | Instant Book or request-to-book reservation flow | dates, guests, payment, rules, message, confirm | instant, request pending, confirmed, declined | payment fail, identity required, host approval timeout |
| Trips/Itinerary | Confirmed/pending/canceled trip management | reservation, day, share, cancel, support | upcoming, active, past, canceled | offline cached, missing entry code, host canceled, support case |
| Messages | Guest/host/co-host/support communication | text, attachments, search, filters, thread actions | all inbox, reservation thread, support thread | delivery failed, blocked user, moderation hold, limits reached |
| Wishlists | Save, compare, share, and collaborate on listings | save, list edit, invite, share, date filter | private, collaborative, shared, empty | listing unavailable, 100-item limit, sync conflict, wrong account |
| Reviews | Leave, read, sort, report, and respond to reviews | rating, text, sort, report, response | draft, submitted, published, removed | expired window, fake review hold, policy dispute, retaliation risk |
| Host Today | Host dashboard for reservations, tasks, payouts | reservation, calendar, message, earnings | no listings, active listing, pending tasks | payout hold, policy warning, suspended listing, tax missing |
| Listing Editor | Host listing setup and maintenance | photos, amenities, rules, safety, price, calendar | draft, ready, published, paused | missing disclosure, invalid license, unsafe content, duplicate |
| Booking Settings | Host controls for Instant Book and requests | guest requirements, notice, prep time, trip length | instant on/off, request review, seasonal | conflicting rules, last-minute block, policy consequence |
| Payouts/Taxes | Host payout setup, earnings, tax info | payout method, tax forms, currency, dashboard | pending, verified, paid, held | verification failed, tax withholding, overpayment recovery |
| Resolution Center | Refund/payment/damage requests and disputes | request, evidence, response, escalation | open, awaiting response, resolved, appealed | missed deadline, unsupported claim, payout deduction, legal hold |
| Trust/Safety Report | Report discrimination, privacy, safety, fraud, abuse | report type, evidence, emergency path | submitted, triaged, escalated, closed | emergency, retaliation risk, duplicate report, bad-faith report |
| Settings/Privacy | Account, payments, privacy, notifications, data rights | toggles, export, delete, legal links | signed-in, signed-out, pending delete | active reservation block, retention caveat, security check fail |
| Service/Experience Detail | Book host-led services or experiences | schedule, guest count, requirements, cancel policy | available, requested, booked, reviewed | safety requirement, age/fitness gate, host approval, refund issue |

## Data Model

- `User`: account identity, locale, language/currency, age/consent, profile, verification state, guest/host roles, trust/safety restrictions, export/delete lifecycle, and privacy settings.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, attachment permission, offline cache version, and last active state.
- `HostProfile`: public host identity, verification badges, languages, response stats, co-host links, hosting history, reviews, policy warnings, and suspension state.
- `Listing`: lodging/service/experience type, title, description, location precision, capacity, bedrooms/beds/baths, amenities, accessibility, media, host/co-hosts, status, license/compliance metadata, and takedown state.
- `ListingSafety`: cameras, recording devices, noise monitors, smart devices, hazards, weapons/disclosures, child suitability, pool/water/heights/animals, house rules, and guest safety notes.
- `AvailabilityCalendar`: date inventory, min/max nights, advance notice, preparation time, blocks, seasonal rules, instant/request eligibility, sync source, and stale-calendar state.
- `PriceQuote`: nightly/service/experience price, host fees, service fees, taxes, offline fees, credits, coupons, currency conversion, payment-plan schedule, quote expiry, and jurisdiction display flags.
- `SearchQuery`: destination, coordinates/bounds, dates, flexible/monthly flags, guests/children/infants/pets, filters, accessibility needs, locale, currency, and personalization context.
- `SearchResult`: listing id, rank, map marker, price quote summary, availability, rating summary, original highlight labels, saved state, host requirement state, and unavailable reason.
- `Wishlist`: owner, collaborators, share link, visibility, listings, saved search dates, guest counts, item limit, sync version, and deleted/unavailable item references.
- `Reservation`: listing, guest party, host/co-hosts, status, instant/request flow, check-in/out, policy snapshot, price snapshot, payment state, cancellation/refund state, trip details, and audit ids.
- `BookingRequest`: guest message, requested dates/guests, payment authorization, host decision, 24-hour expiry, withdrawal, decline reason, and notification state.
- `PaymentInstrument`: tokenized method, billing country, currency, verification state, payment-plan provider reference, failure state, and deletion constraints.
- `PayoutAccount`: host payout method, country/region, currency, verification, minimum payout, default state, processing delay, tax withholding, hold/review, and payout history.
- `TaxProfile`: guest tax location, listing tax jurisdiction, host taxpayer details, platform-collected taxes, manually disclosed taxes, VAT/GST/JCT treatment, forms, and reporting obligations.
- `MessageThread`: participants, reservation/listing context, messages, attachments, read receipts, threaded replies, support handoff, moderation state, delivery status, and retention policy.
- `Review`: reservation link, reviewer/reviewee, rating categories, text/media references, draft/submitted/published/removed state, response, report/dispute, deadline, and policy decision.
- `ExperienceServiceOffering`: schedule, capacity, venue, host requirements, safety equipment, guest requirements, cancellation/refund policy, approval state, and liability review flags.
- `SupportCase`: cancellation, refund, safety, discrimination, damage, privacy, off-platform, payment, payout, listing, or account issue with evidence, owner, escalation, decision, appeal, and legal hold.
- `DamageClaim`: reservation, host request, evidence, requested amount, guest 24-hour response state, support review, payout deduction/recovery, reimbursement state, and audit events.
- `AuditEvent`: append-only record for auth, booking, pricing, payment, payout, identity, privacy, listing, messaging, review, support, tax, moderation, and safety-sensitive actions.
- `LocalCacheRecord`: cached searches, listing summaries, trip details, message drafts, review drafts, settings, sync attempts, conflict markers, and offline freshness.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with age, region, role, deletion, and verification gates.
- `GET /explore`, `GET /search?destination=&lat=&lng=&bounds=&dates=&guests=&filters=&cursor=`: discovery/search reads with ranking reason codes, personalization status, price quote snapshots, availability, map pins, pagination, and stale-data indicators.
- `GET /listings/:id`, `POST /listings`, `PATCH /listings/:id`, `PATCH /listings/:id/status`: listing reads/writes with provenance, host authorization, safety disclosures, license/compliance fields, moderation, and audit events.
- `GET /listings/:id/calendar`, `PATCH /listings/:id/calendar`: availability, blocks, min/max nights, preparation time, advance notice, sync source, version, and conflict errors.
- `POST /quotes`, `GET /quotes/:id`: price quote generation with line items, tax/fee jurisdiction, currency conversion, payment-plan eligibility, quote expiry, and price-change warnings.
- `POST /booking-requests`, `PATCH /booking-requests/:id`, `DELETE /booking-requests/:id`: request-to-book lifecycle with payment authorization, guest message, host decision, expiry, withdrawal, and notifications.
- `POST /reservations`, `GET /reservations`, `GET /reservations/:id`, `PATCH /reservations/:id`: Instant Book and reservation reads with policy snapshots, guest party, trip details, offline cache hints, and support/cancellation affordances.
- `POST /reservations/:id/cancel`, `POST /reservations/:id/refund-preview`, `POST /reservations/:id/rebooking-help`: cancellation/refund/rebooking flows with policy engine, payment-plan limits, credits/coupons, tax handling, evidence needs, and finality warnings.
- `GET /wishlists`, `POST /wishlists`, `PATCH /wishlists/:id`, `DELETE /wishlists/:id`, `POST /wishlists/:id/items`, `DELETE /wishlists/:id/items/:listingId`: saved listings, collaborative access, share links, per-list limits, dates, and sync conflicts.
- `GET /messages`, `GET /message-threads/:id`, `POST /message-threads/:id/messages`, `POST /message-threads/:id/attachments`, `PATCH /message-threads/:id/read`: unified inbox, reservation threads, read receipts, limits, malware scan, moderation, and support handoff.
- `GET /reviews`, `POST /reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id`, `POST /reviews/:id/report`, `POST /reviews/:id/respond`: review lifecycle with reservation eligibility, deadlines, policy checks, response/removal, dispute, and appeal.
- `POST /identity/verifications`, `GET /identity/verifications/:id`, `DELETE /identity/verifications/:id`: identity workflow with required fields, vendor status, retry, badge update, retention policy, and access control.
- `GET /payment-methods`, `POST /payment-methods`, `DELETE /payment-methods/:id`, `POST /checkout/session`, `POST /payments/webhooks`: tokenized guest payments, Strong Customer Authentication where relevant, payment plans, idempotency, refunds, and webhook reconciliation.
- `GET /payout-methods`, `POST /payout-methods`, `PATCH /payout-methods/:id`, `GET /payouts`, `GET /earnings`: host payout setup, verification, default method, currency, minimum payout, hold/review, tax withholding, and processing status.
- `GET /tax/profile`, `PATCH /tax/profile`, `GET /tax/quote`, `GET /tax/reports`: guest/host tax treatment, collected/remitted/manual taxes, VAT/GST/JCT, forms, reporting, and legal-region configuration.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/escalate`: support, safety, cancellation, refund, privacy, discrimination, listing, payment, and payout cases with SLA and owner state.
- `POST /resolution-requests`, `PATCH /resolution-requests/:id`, `POST /damage-claims`, `PATCH /damage-claims/:id`: money requests, damage claims, guest response windows, evidence, platform review, payout impact, and audit logging.
- `GET /services-experiences`, `POST /services-experiences`, `POST /services-experiences/:id/book`: services/experiences listing and booking with schedule/capacity, safety requirements, cancellation policy, host approval, and review eligibility.
- `POST /reports`, `GET /reports/:id`, `POST /blocks`, `POST /appeals`: trust/safety reports for discrimination, fraud, off-platform behavior, privacy, cameras, unsafe conditions, harassment, weapons, reviews, and policy enforcement.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, security checks, irreversible deletion warnings, active-reservation constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Reservation, booking request, host approval/decline, cancellation, refund, payment, payout, support, damage-claim, and identity-verification state changes must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache recent searches, listing summaries, wishlists, settings, message drafts, review drafts, and active trip details; cached trip details must expose freshness and avoid hiding changed/canceled reservations.
- Offline mode may show cached Trips details such as check-in time, address/detail fields, wifi, and instructions where policy allows, but checkout, cancellation, payment, refund, identity, payout, account deletion, support escalation, and safety reports require server confirmation.
- Low-risk local drafts such as messages, wishlist edits, review drafts, and listing-edit drafts may queue with retry metadata; money movement, host approval, refund requests, identity uploads, policy reports, and tax/payout changes must block while offline.
- Price quotes, tax calculations, availability, and booking eligibility must expire and refresh before checkout confirmation to prevent stale reservations or misleading total prices.
- Messaging must handle read receipt updates, attachment upload progress, duplicate-send suppression, blocked users, moderation holds, push notification revocation, and support-thread handoff.
- Host calendar and booking settings edits must use optimistic UI only with version checks; conflicts from simultaneous host/co-host edits or external calendar sync must surface with recoverable merge states.
- Push notifications must be opt-in, category-controlled, and content-minimized for booking requests, confirmations, cancellations, message previews, trip reminders, review prompts, refund/support updates, safety issues, payment failures, and payout changes.
- Background work must tolerate app termination, token expiry, notification permission changes, clock skew, attachment upload failures, payment webhook delay, and duplicate provider callbacks.
- Services/experiences and host tools must be feature-flagged by region, policy approval, provider availability, and manual verification state.

## Permissions, Privacy, And Safety

- Location, camera, photos/files, contacts, calendar, notifications, and biometric/device authentication must be requested only when the user invokes a related feature.
- Default analytics must exclude precise addresses, raw guest/host messages, identity documents, payment credentials, payout details, tax identifiers, private listing notes, safety reports, damage evidence, and exact trip locations.
- Location UX must distinguish no location, approximate, precise, manually entered destination, OS-revoked permission, and region-blocked location services with usable search fallback.
- Marketplace identity data must be purpose-limited, encrypted, access-controlled, redacted from logs, vendor-reviewed, and deletable or retained only under documented policy/legal constraints.
- Hosts and guests must be blocked from moving bookings, payments, required guest interactions, reviews, or feedback off-platform unless an explicitly allowed policy exception applies.
- Nondiscrimination requirements must be enforced across search, booking, host acceptance/decline, messages, reviews, profile language, support cases, and account actions.
- Listing safety must require explicit host disclosure for hazards, exterior cameras, noise monitors, smart devices, weapons/dangerous objects, animals, pools/water/heights, accessibility limitations, and house rules.
- Indoor cameras and hidden recording devices must be prohibited in original policy and enforced through listing review, guest reporting, moderation, and emergency escalation.
- Guest and host conduct rules must cover cleanliness, property respect, house rules, harassment, fraud, scams, privacy invasion, unsafe activity, threats, weapons, discrimination, fake reviews, and bad-faith claims.
- Cancellations, refunds, rebooking, damages, fees, taxes, and payout deductions must be auditable, explainable, and support-reviewed before irreversible money movement.
- Payment, payout, tax, refund, credit, coupon, payment-plan, and cross-currency handling must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- Reviews and ratings must include authenticity checks, anti-coercion rules, eligibility windows, policy moderation, report/removal flows, and appeal handling.
- Services and experiences must require venue/activity safety, equipment, age/fitness requirements, specialized activity review, host preparedness, and emergency instructions.
- Launch owners: marketplace trust owner for identity/risk/fraud, legal/compliance owner for lodging/taxes/terms, payments owner for checkout/refunds/payouts, safety owner for property/emergency/discrimination reports, privacy owner for data rights, accessibility owner for inclusive travel filters, and support owner for cancellation/damage disputes.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, filter applied, map moved, listing opened, price breakdown expanded, wishlist saved, booking started, request submitted, reservation confirmed, trip opened, message sent, cancellation previewed, support case opened, review submitted, data export requested, account deletion requested.
- Marketplace quality metrics must use object ids, reason codes, latency, provider status, quote freshness, inventory freshness, and failure codes rather than raw addresses, private messages, payment credentials, identity documents, or damage evidence.
- Search/ranking diagnostics must separate organic ranking, recommendation, personalization, availability, pricing, fee, and legal-region logic, with opt-out and retention behavior reviewed for privacy.
- Payment analytics must capture checkout funnel and failure categories using tokenized payment references, not card/bank details; payout analytics must hide tax identifiers and account numbers.
- Trust/safety analytics must track report categories, moderation states, appeal outcomes, SLA, fraud/risk signals, and repeat-offender status without exposing private evidence to product analytics.
- Monetization can include original marketplace service fees, host subscription/tools, travel services, experiences, insurance/referral integrations, partner booking handoffs, or premium host analytics later, but pricing, names, fee rates, protection claims, and promotional copy must be original and legal-reviewed.
- Fee display must be transparent before confirmation, configurable by jurisdiction, testable in checkout, and explicit about what is collected by platform, host, provider, or tax authority.
- Host-side monetization must show payout implications, service fees, co-host splits, taxes, minimum payout, payout method fees where relevant, and refund/damage deductions.
- Services, experiences, grocery/provider handoffs, payment-plan providers, identity vendors, map providers, analytics vendors, storage vendors, and customer-support tooling must be disclosed and governed by data-sharing agreements.

## Edge Cases

- First launch offline, unsupported OS, expired session, underage user, managed account, blocked region, language/currency mismatch, or user denies all optional permissions.
- Destination is ambiguous, unsafe, regulated, embargoed, unavailable, misspelled, too broad, across borders, or unsupported by licensed map/place providers.
- Search results have stale availability, stale price, duplicate listing, hidden tax, undisclosed offline fee, inaccessible property, fake listing, suspended host, or safety warning.
- Guest count includes children, infants, pets, service animals, extra guests, long stays, monthly stays, last-minute booking, minimum-night conflict, or host requirement conflict.
- Price quote changes after result view, checkout starts after quote expiry, tax service is unavailable, currency rate changes, coupon is invalid, payment-plan provider rejects, or offline fee must be disclosed.
- Host declines, misses the response window, cancels, asks guest to cancel, changes house rules, removes listing, updates calendar, or claims unavailable dates after guest saves a listing.
- Guest cancels during free cancellation, after deadline, during stay, due to covered issue, with payment plan, with credits/coupons, after host cancellation, or during Major Disruptive Event-like conditions.
- Trip instructions are missing, entry code changes, wifi details are stale, offline cache is corrupt, host message is undelivered, support is unavailable, or reservation is canceled while offline.
- Message attachment fails malware scan, delivery duplicates, read receipt is delayed, participant leaves group trip, co-host loses access, user is blocked, or thread enters moderation hold.
- Review window expires, one party submits early, both reviews publish, review is reported, review contains private info/discrimination/extortion, or service/experience review rules differ from home rules.
- Identity verification fails, document is expired, name mismatch occurs, selfie cannot be captured, vendor is down, badge is removed, host requests more ID than allowed, or retention deletion conflicts with legal hold.
- Host payout method fails verification, bank holiday delays payout, payout is held for review, tax info is missing, refund exceeds payout, overpayment recovery occurs, or co-host split conflicts.
- Listing includes hidden camera report, exterior camera disclosure issue, unsafe pool/water/heights, animal hazard, weapon disclosure, noise monitor, smart device, or child-safety risk.
- Discrimination, harassment, scam, fake review, off-platform payment, safety emergency, privacy invasion, damage claim, or bad-faith support report requires escalation, appeal, and audit preservation.
- Data export, account deletion, payment method deletion, identity data deletion, message retention, tax retention, active reservation, support case, legal hold, or fraud investigation has conflicting retention rules.

## Test Plan

- Unit tests for search filters, flexible/monthly date rules, guest/pet validation, availability-calendar conflicts, quote expiry, fee/tax line items, and wishlist limits.
- Unit tests for booking state machines: Instant Book, request pending, host accept/decline, request expiry, withdrawal, payment authorization, confirmation, cancellation, and refund preview.
- Unit tests for host tools: listing required fields, safety disclosures, booking settings, min/max nights, preparation time, calendar version conflicts, payout method status, and tax profile validation.
- Unit tests for privacy-safe analytics payload construction, location permission states, account deletion eligibility, data export requests, identity verification states, and sensitive field redaction.
- Contract tests for every API route, including pagination, stale data, price quote snapshots, policy snapshots, idempotency keys, payment webhook reconciliation, payout holds, and support case transitions.
- Integration tests for signed-out browsing, signed-in search, map/list results, listing detail, save/share, checkout, request-to-book, Trips, messaging, cancellation preview, and support contact.
- Offline tests for cached search/listing/trip reads, queued message/review/wishlist drafts, blocked checkout/cancel/payment/delete actions, corrupt cache, reconnect reconciliation, and stale trip warnings.
- Payment/refund tests for card failure, payment plan eligibility/rejection, coupon/credit behavior, service fee refund, tax handling, host payout deduction, duplicate webhook, and currency conversion.
- Host payout/tax tests for payout setup, default method changes, micro-deposit verification, minimum payout, payout delay, tax withholding, overpayment recovery, co-host split, and report generation.
- Messaging tests for reservation group thread, co-host/co-traveler access, attachment upload, read receipts, message search/filter, blocked user, moderation hold, and push deep links.
- Review tests for 14-day review window, draft save, publish timing, response, removal request, policy report, biased/fake review detection, group guest review behavior, and service/experience variants.
- Trust/safety tests for nondiscrimination report, indoor camera report, exterior camera disclosure, unsafe property hazard, off-platform payment request, harassment, weapon/dangerous object, scam, and emergency path.
- Resolution/damage tests for host reimbursement request, guest 24-hour response, evidence upload, support review, payout recovery, dispute appeal, missed deadline, and legal hold.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, accessible filters, price breakdown comprehension, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, signup/login, identity verification, checkout/payment plan, host payout setup, host onboarding, messaging attachments, push payloads, offline trip behavior, services/experiences booking, safety line, account deletion, taxes, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Airbnb assets, listing inventory, listing photos, reviews, host profiles, private APIs, brand copy, proprietary recommendation/ranking/risk systems, policy text, or support scripts.
- New and returning users can search destinations, view map/list results, inspect listings, save wishlists, review price/cancellation/safety details, book or request a stay, message participants, manage Trips, cancel with refund preview, and recover from denied permissions or network loss.
- Host users can create and manage listings, availability, pricing, booking settings, safety disclosures, messages, reservations, payout methods, taxes, reviews, and support cases with deterministic error states.
- Checkout, fees, taxes, payment plans, refunds, payouts, damage claims, credits/coupons, and cross-currency behavior are represented as auditable server-side state machines.
- Nondiscrimination, privacy, camera/device disclosures, off-platform behavior, safety hazards, review authenticity, fraud, disputes, and emergency/support reports include moderation, audit, appeal, and abuse-prevention paths.
- Location, identity verification, messages, payment data, payout data, tax data, search history, listing media, support evidence, data export, and account deletion controls are accessible from settings and covered by tests.
- Services, experiences, payment plans, insurance/protection-like claims, host onboarding, safety line, native push payloads, regional taxes, and regulated lodging surfaces are feature-flagged until legal, provider, and manual verification clear them.

## Open Questions

- Which licensed lodging inventory, map/geocoding, identity, payment, payout, tax, messaging, support, moderation, and analytics providers will back V1?
- Which launch regions determine lodging licenses, short-term rental rules, taxes, age requirements, payment methods, identity document handling, accessibility claims, and cancellation/refund law?
- Will V1 include services and experiences at launch, or keep them behind feature flags until host application, scheduling, insurance/liability, and safety requirements are reviewed?
- Will V1 support signed-out browsing, and if yes, which wishlist, messaging, booking, trip, review, and host features remain account-gated?
- What is the accepted policy posture for total price display, offline fees, host-collected taxes, service fees, payment plans, refunds, coupons, credits, deposits, and damage claims in each launch region?
- Which host trust requirements are mandatory before listing publication: identity verification, address verification, license upload, property safety disclosures, payout/tax setup, calendar proof, and photo review?
- What safety escalation model will cover hidden cameras, discrimination, property hazards, threats, weapons, scams, privacy invasion, emergencies, and local law enforcement contact?
- What original review, recommendation, and search ranking model will be explainable enough for user trust and regulator expectations without copying Airbnb logic?

## Build Plan

- Phase 1: scaffold app shell, auth/guest mode, Explore home, search form, map/list results, listing detail, wishlists, settings/legal links, privacy-safe analytics, and licensed map/provider attribution.
- Phase 2: add price quotes, fee/tax breakdown, availability calendar, Instant Book, request-to-book, checkout session, reservation confirmation, Trips, offline cached trip details, and booking/cancellation tests.
- Phase 3: add host listing editor, host calendar, booking settings, house rules, safety disclosures, pricing/fees, host reservations, messages, payout setup, tax profile, and host validation tests.
- Phase 4: add unified messaging with group reservation threads, attachments, read receipts, support handoff, review flows, reputation summaries, wishlist collaboration, and notification categories.
- Phase 5: add cancellation/refund policy engine, rebooking help, Resolution Center, damage claims, evidence upload, payout deductions, support case escalation, and audit/event review tooling.
- Phase 6: add identity verification, fraud/risk gates, nondiscrimination reporting, camera/privacy/safety reports, off-platform behavior detection, moderation appeals, and trust/safety dashboards.
- Phase 7: evaluate services, experiences, payment plans, advanced host tools, regional tax/remittance, insurance/protection-like programs, 24-hour safety support, and native/manual verification only after legal, privacy, safety, accessibility, and provider approvals.

## Next Steps

- Use this spec as the pattern for upgrading `038-doordash.md`, `046-amazon.md`, and the remaining architecture-teaching specs.
- Resolve the manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
