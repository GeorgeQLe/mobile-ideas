# OpenTable-Style Clone Spec

> Metadata
> - Inspiration app: OpenTable
> - Category: restaurant discovery, reservations, waitlists, diner reviews, rewards, and restaurant operations
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace listings, first-party product/help/legal/privacy pages, support pages, and app-specific public feature documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, phone/email verification, live reservation search, booking, modify/cancel, waitlist join, Notify Me alerts, diner messaging, points/rewards redemption, restaurant no-show policy, restaurant owner app states, push payloads, account deletion/export, and regional restaurant availability still require lawful test devices/accounts and any required provider approvals before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, menus, listings, reviews, ratings, photos, store/business data, maps, payment providers, loyalty engines, recommendation systems, support scripts, merchant tools, and regulated workflows.

## Overview

Build an original mobile product inspired by OpenTable's public workflow for restaurant discovery, reservations, waitlists, diner reviews, rewards, and restaurant operations. The clone must preserve the functional interaction model users expect while using original product language, synthetic or licensed data, independent ranking/availability/quote logic, and jurisdiction-aware compliance.

The clone must not copy OpenTable branding, screenshots, marketing copy, protected UI artwork, business/store data, menu copy, photos, reviews, ratings, private APIs, support scripts, recommendation logic, pricing formulas, or loyalty/offer terms. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first restaurant reservation marketplace with complete onboarding, discovery, primary transaction, history, settings, support, privacy, and recovery flows.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around account security, payments, location, inventory/availability, support, refunds, reviews, loyalty, merchant/business tools, accessibility, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an OpenTable-branded app or imply affiliation with OpenTable, its parent company, stores, restaurants, business owners, delivery partners, payment providers, or map providers.
- Do not scrape OpenTable, reuse private APIs, replay network traffic, copy marketplace data, copy menu/listing/review/media content, clone proprietary ranking/risk/loyalty systems, or reproduce policy/support copy.
- Do not process production payments, refunds, tips, stored value, identity documents, regulated goods, food-safety reports, advertising spend, business payouts, or support disputes without separate legal, compliance, privacy, trust/safety, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, reward, notification, support, refund, business-tooling, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/opentable/id296581815 | Official iOS listing, Food & Drink category, ratings, Editors Choice status, app claims for discovery, availability search, Notify Me, reservation management, diner messaging, verified reviews, and points. | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.opentable | Official Android listing, app feature claims, data-safety orientation, and app support path. | Verified 2026-04-17 |
| OpenTable Consumer Marketplace | https://www.opentable.com/ | Public consumer marketplace for restaurant discovery, date/time/location search, filters, reviews, availability, reservations, rewards, and city/category landing pages. | Verified 2026-04-17 |
| OpenTable Help | https://help.opentable.com/ | Canonical diner support entrypoint for reservations, accounts, points, cancellation, messaging, and privacy questions. | Verified 2026-04-17 |
| OpenTable Privacy Policy | https://www.opentable.com/legal/privacy-policy | Consumer privacy policy for websites, apps, restaurant sharing, diner profiles, reviews, reservations, and rights. | Verified 2026-04-17 |
| OpenTable Terms | https://www.opentable.com/legal/terms-and-conditions | Consumer terms for marketplace use, reservations, reviews, accounts, dining rewards, and user responsibilities. | Verified 2026-04-17 |
| OpenTable Restaurant Solutions | https://www.opentable.com/restaurant-solutions/ | Restaurant-side product positioning for reservation demand, table management, reporting, reviews, and restaurant network scale. | Verified 2026-04-17 |
| OpenTable GuestCenter | https://www.opentable.com/restaurant-solutions/products/guestcenter/ | Restaurant management platform, plans, reputation, table management, relationship management, integrations, and direct messaging. | Verified 2026-04-17 |
| OpenTable Waitlist | https://www.opentable.com/restaurant-solutions/products/features/opentable-waitlist/ | Online waitlist, SMS notifications, party-size controls, real-time place in line, and staff waitlist operations. | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must expose location, date, time, party size, cuisine/category modules, guides, featured restaurants, upcoming reservations, saved restaurants, and rewards status.
- Search must support date, time, party size, location, cuisine, price, neighborhood, outdoor seating, dietary restriction, availability, special experiences, and no-result recovery.
- Restaurant detail must show availability slots, photos from licensed/original sources, menu links, reviews, ratings, cuisine, price, location, hours, experiences, policies, and messaging affordances.
- Reservation booking must validate party size, time slot, account/contact info, special request, dietary/accessibility notes, cancellation/no-show policy, and duplicate booking conflicts.
- Reservation management must allow view, modify, cancel, add to calendar, share, message restaurant, and support escalation with policy-aware state changes.
- Notify Me and waitlist flows must expose alert criteria, real-time availability changes, wait quotes, SMS/push/email preferences, timeout, and restaurant pause controls.
- Verified reviews must be eligible after completed dining events, separate diner feedback dimensions, moderation/reporting, privacy controls, and restaurant response surfaces.
- Dining rewards/points must model earning, bonus points, redemption eligibility, expiration, region rules, and support disputes without copying exact offers unless sourced and approved.
- Restaurant operations must model inventory, table management, shifts, holds, waitlist, guest profiles, messaging, reviews/reputation, integrations, no-show handling, and reporting.
- Support must cover booking failure, cancellation, no-show dispute, restaurant contact, review issue, points issue, account merge, privacy rights, and deletion/export.

### Manual Verification Required

- Native iOS/Android screen capture.
- Signup/login.
- Phone/email verification.
- Live reservation search.
- Booking.
- Modify/cancel.
- Waitlist join.
- Notify Me alerts.
- Diner messaging.
- Points/rewards redemption.
- Restaurant no-show policy.
- Restaurant owner app states.
- Push payloads.
- Account deletion/export.
- Regional restaurant availability.

### Build Plan

- Phase A: auth shell, discovery home, search filters, restaurant detail, availability slots, reservation booking stub, settings, and synthetic restaurant seed data.
- Phase B: reservation modify/cancel, upcoming/past bookings, Notify Me, waitlist, notification preferences, reviews, support cases, and privacy export/delete flows.
- Phase C: restaurant manager inventory/table/waitlist tools, direct messaging, verified review moderation, points/rewards, no-show policy engine, and integration stubs.
- Phase D: calendar/SMS/push providers, POS/reservation integration review, manual booking evidence capture, accessibility audit, observability, and legal/privacy signoff.

## Core User Journeys

- New user installs the app, reviews original value proposition and legal links, grants or denies optional permissions, creates an account or continues where allowed, and reaches the primary discovery surface with usable fallback states.
- Returning user opens the app, sees fresh location/account/availability context, resumes a recent or saved item, completes the primary workflow, and confirms canonical server state after reconnect.
- User searches or browses with filters, opens a detail page, saves/favorites/bookmarks where applicable, starts the app-specific transaction, recovers from an unavailable item or stale quote, and completes or abandons safely.
- User denies location, notifications, camera/photos, contacts, or tracking permissions and still receives a clear fallback plus a settings path to re-enable the permission.
- User loses connectivity during browse, compose, cart, reservation, review, or support work; local state is preserved where safe, but money movement, irreversible writes, privacy actions, and regulated actions require server confirmation.
- User opens support from an active or historical object, selects an issue type, submits evidence where appropriate, receives status/decision updates, and can find the outcome later.
- Business or merchant operator manages the app-specific listing, availability, customer communication, support/reputation surface, and operational state from a separately authorized tool.
- Privacy-focused user updates profile and communication preferences, requests data export/access, deletes or closes the account where allowed, and sees retention caveats for orders, payments, reviews, business records, support cases, or legal holds.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, terms, location, and notification consent | join, sign in, guest, legal | new, returning, signed-out | auth fail, account conflict, region unsupported |
| Discovery Home | Restaurant discovery and initial reservation query | location, date, time, party | personalized, nearby, loading | denied location, no results, stale modules |
| Search And Filters | Find restaurants with availability and filters | query, cuisine, price, filters | results, no results, corrected | closed, no availability, unsupported party size |
| Restaurant Detail | Restaurant profile, reviews, photos, menu, policies, and slots | slot, save, share, message | available, waitlist, fully booked | slot expired, policy warning, data stale |
| Reservation Booking | Confirm diner, party, time, notes, and policy | contact, notes, confirm | draft, confirming, booked | duplicate, no-show block, slot taken |
| Reservation Details | Manage upcoming and past bookings | modify, cancel, message, calendar | upcoming, seated, completed | late cancel, restaurant change, support needed |
| Notify Me/Waitlist | Last-minute opening alerts and online waitlist | criteria, join, SMS, push | waiting, notified, expired | paused waitlist, quote changed, SMS fail |
| Reviews And Ratings | Post-dining verified review and read reputation | rating, tags, text, report | eligible, submitted, moderated | not eligible, private data, abuse |
| Restaurant Manager | Restaurant inventory, table, waitlist, guest, and messaging tools | shift, table, party, message | online, offline, paused | overbook, no-show, integration down |
| Settings/Privacy/Support | Profile, notifications, points, privacy, legal, support, deletion | toggles, forms, export, delete | verified, submitted, pending | retention caveat, active booking block |

## Data Model

- `Diner`: identity, contact, preferences, dietary/accessibility notes, saved restaurants, points, notification preferences, and privacy lifecycle.
- `Restaurant`: profile, location, cuisine, price, hours, policies, photos, menu links, experiences, messaging, and availability configuration.
- `AvailabilitySlot`: date, time, party-size range, table inventory, booking source, hold expiry, and waitlist relationship.
- `Reservation`: diner, restaurant, party size, time, notes, policy, confirmation, status, modification, cancellation, no-show, and audit state.
- `WaitlistEntry`: party, quote, position, SMS/push alert state, expiry, restaurant pause state, and seating outcome.
- `NotifyMeAlert`: restaurant/search criteria, time window, alert channel, sent state, conversion state, and expiry.
- `Review`: reservation link, rating, text, tags, photos, moderation state, report state, restaurant response, and publication status.
- `DinerReward`: points balance, bonus eligibility, redemption state, expiration, region rules, and dispute state.
- `RestaurantUser`: role, permissions, owner app session, location access, messaging, inventory controls, and audit state.
- `SupportCase`: reservation/review/reward link, issue type, evidence, decision, owner queue, and SLA.
- `AuditEvent`: append-only record for auth, permission, search, availability, cart/reservation/order, payment/refund, support, moderation, business-tool, privacy, and safety-sensitive transitions.
- `LocalCacheRecord`: device-local cache entry for recent discovery results, detail pages, drafts, active transactions, settings, sync attempts, freshness markers, and conflict recovery.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` with device-scoped sessions, account locks, deletion state, and fraud/risk flags.
- `GET /discovery`, `GET /search`: restaurant modules, filters, availability summaries, guides, and no-result recovery metadata.
- `GET /restaurants/:id`, `GET /restaurants/:id/availability`: profile, policies, reviews, experiences, slots, waitlist state, and stale indicators.
- `POST /reservations`, `PATCH /reservations/:id`, `POST /reservations/:id/cancel`: booking, modification, cancellation, policy warnings, idempotency, and audit events.
- `POST /waitlist`, `PATCH /waitlist/:id`, `POST /notify-me`: waitlist join, quote refresh, alert criteria, channel preference, and expiry.
- `POST /messages`, `GET /messages/:reservationId`: diner-restaurant messaging, dietary/accessibility notes, moderation, and retention rules.
- `POST /reviews`, `POST /reviews/:id/report`, `POST /restaurants/:id/responses`: verified review creation, moderation, reporting, and restaurant response.
- `GET /restaurant-admin/shifts`, `PATCH /restaurant-admin/inventory`, `GET /restaurant-admin/waitlist`: restaurant operations, table inventory, wait quotes, and integration state.
- `POST /support/cases`, `POST /data-export`, `DELETE /account`, `GET /privacy/settings`: support, privacy rights, retention caveats, and active-reservation constraints.
- Observability: all sensitive writes require idempotency keys, structured validation errors, privacy-safe logs, redacted analytics, and audit events.

## Realtime, Push, And Offline Behavior

- Availability, cart/reservation/order/payment/support/business-tool state changes must use websocket, SSE, or push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache discovery modules, recent detail pages, saved/favorite objects, active transaction summaries, settings, and drafts; cached data must always expose freshness and must not hide quote, inventory, review, or availability expiry.
- Low-risk local drafts may queue with retry metadata; payment, refund, reward redemption, account deletion, business operational writes, reports, moderation decisions, and regulated actions must block while offline.
- Push notifications must be opt-in, category-controlled, and content-minimized for transactional, reminder, account security, support, offer/marketing, business-tool, and safety categories.
- Realtime recovery must handle duplicate events, missed events, stale client state, provider outage, simultaneous edits, token expiry, app termination, clock skew, and revoked OS permissions.
- All manual-blocker surfaces must be feature-flagged until lawful hands-on verification confirms native behavior and provider/legal requirements.

## Permissions, Privacy, And Safety

- Launch marketplace owner for availability accuracy and duplicate booking prevention.
- Launch restaurant operations owner for table/waitlist inventory and no-show policy.
- Launch privacy owner for diner profiles and restaurant data sharing.
- Launch trust owner for verified reviews and response moderation.
- Launch support owner for cancellation, rewards, and account disputes.
- Request location, notifications, camera/photos/files, contacts, tracking, biometric/device authentication, or Bluetooth only at the moment the user invokes a feature needing it.
- Default analytics must exclude raw payment credentials, precise location trails, private messages, support evidence, identity documents, sensitive health/allergy details, and user-generated review/photo content.
- Location UX must distinguish no location, approximate location, precise location, manually entered location, OS-revoked permission, outside-service-area, and unsupported-market states.
- Payments, refunds, stored value, tips, payouts, rewards, offers, advertising spend, and chargebacks must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- User-generated content, reviews, photos/videos, messages, support evidence, and business responses require reporting, moderation, abuse prevention, appeal/support paths, and privacy redaction.
- Accessibility must target dynamic type, screen reader labels, focus order, visible focus, sufficient contrast, reduced motion, map/list alternatives, large touch targets, and accessible support channels.
- Data export, access, deletion, account closure, ad/marketing preferences, notification preferences, and privacy settings must be reachable from settings and covered by tests.

## Analytics And Monetization

- Track privacy-safe funnel events: onboarding started/completed, permission state changed, location selected, discovery viewed, search performed, filter applied, detail opened, primary action started/completed/failed, support opened, notification opened, data export requested, and account deletion requested.
- Track app-specific quality metrics with object ids, freshness timestamps, provider status, failure codes, quote or availability version, moderation state, and support SLA rather than raw addresses, payment data, private messages, or user content.
- Monetization can include original service fees, convenience fees, membership/loyalty benefits, advertising/sponsored placement, merchant tools, partner commissions, gift cards, or premium analytics only after legal, tax, consumer-protection, and disclosure review.
- Sponsored, promoted, recommended, personalized, or ranked content must be explainable enough for QA and privacy review, and must not copy OpenTable's ranking or advertising logic.
- Safety analytics must track report categories, fraud/risk signals, moderation states, support outcomes, refund reasons, appeal outcomes, and repeat-offender patterns without exposing private evidence to product analytics.

## Edge Cases

- First launch offline, expired session, unsupported OS, unsupported region, denied permissions, locked account, stale cache, and language/currency mismatch.
- Location is inaccurate, manually entered, outside service area, inside a restricted venue, crosses a regional boundary, or changes after cart/reservation/order creation.
- Listing, store, restaurant, product, bag, review, deal, reward, or business profile becomes unavailable, paused, sold out, closed, deleted, hidden, disputed, or region-blocked.
- Quote, price, tax, fee, reward, deal, inventory, availability, pickup, reservation, or support state changes between preview and confirmation.
- Duplicate taps, duplicate webhook delivery, retry after timeout, stale optimistic UI, provider outage, app termination, device clock skew, and partial local cache corruption.
- Payment fails, authorization succeeds but confirmation fails, refund is partial or delayed, benefit/reward is reversed, fraud hold appears, or support decision conflicts with user expectation.
- User-generated content contains private data, harassment, hate, illegal content, IP-infringing media, promotional spam, conflict of interest, extortion, or AI-generated review content.
- Data export, account deletion, payment method deletion, public content removal, support retention, business record retention, fraud investigation, or legal hold conflicts with a user request.

## Test Plan

- Unit tests for permission states, location selection, availability validation, primary object state machines, idempotency keys, quote freshness, support reason routing, and privacy-safe analytics payload construction.
- Unit tests for all app-specific financial or benefit states, including payment authorization, refund/credit, reward/deal/offer eligibility, cancellation cutoff, payout/lead/ad state, and duplicate webhook handling where relevant.
- Contract tests for every API route, including pagination, validation errors, stale-data indicators, idempotency, auth failures, provider outages, audit events, and privacy redaction.
- Integration tests for onboarding, signed-out browse where allowed, location fallback, search/filter, detail, primary action, history, support, notifications, settings, data export, and account deletion/closure.
- Offline tests for cached discovery/detail/history reads, queued low-risk drafts, blocked money/privacy/business/safety writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, approximate, and precise location; denied/revoked notifications; and camera/photos/files/contact gates where relevant.
- Trust/safety tests for report submission, moderation state transitions, fraud hold, unauthorized activity, abusive content, support escalation, and appeal or owner-response behavior.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, map/list alternatives, form errors, fee/policy comprehension, and support channel access.
- Manual verification tests for native iOS/Android screen capture, signup/login, phone/email verification, live reservation search, booking, modify/cancel, waitlist join, Notify Me alerts, diner messaging, points/rewards redemption, restaurant no-show policy, restaurant owner app states, push payloads, account deletion/export, and regional restaurant availability.
- Regression tests for every acceptance criterion before marking native/manual blockers resolved.

## Acceptance Criteria

- Exact marketplace, product, help/support, legal, privacy, and app-specific first-party URLs are listed; no source-discovery search URLs remain.
- A downstream team can build a public-source V1 with original branding, copy, data, media, integrations, maps, payment providers, support scripts, and ranking/availability logic.
- A new user can onboard, choose or deny optional permissions, reach discovery, inspect a detail surface, complete the app-specific primary action with stubs where needed, and recover from denied permissions or network loss.
- A returning user can search/filter, use saved/favorite/recent context, recover from stale availability, complete or safely cancel the primary workflow, and confirm server-owned state after reconnect.
- Business, merchant, restaurant, or store operator workflows are represented where relevant through routes, entities, permissions, audit logs, and tests.
- Payment, refund, reward/offer, cancellation, support, privacy, notification, moderation, analytics, and accessibility concerns are represented as server-owned contracts and testable states.
- Manual verification blockers remain explicit and feature-flagged until lawful test accounts/devices and any required provider approvals clear them.

## Open Questions

- Which launch regions determine availability, tax/fee display, payment methods, refund law, privacy rights, accessibility obligations, and support language?
- Which licensed data, map/geocoding, payment, messaging, notification, moderation, analytics, tax, and support providers will back V1?
- Which manual flows are feasible with ordinary lawful test accounts, and which require paid accounts, partner approval, business-owner accounts, physical devices, or regional access?
- What original seed data and media set will replace all OpenTable business, store, menu, review, rating, photo, and promotional content?

## Next Steps

- Capture lawful hands-on evidence for the listed manual blockers before removing any feature flags or parity blockers.
- Pick downstream implementation providers for auth, maps/search, payments, notifications, support, analytics, moderation, and storage.
- Produce an implementation repo build plan with route map, component map, API schema, state machines, seed data, and acceptance test checklist.
