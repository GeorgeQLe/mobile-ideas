# McDonald's-Style Clone Spec

> Metadata
> - Inspiration app: McDonald's
> - Category: quick-service restaurant ordering, deals, rewards, delivery, and pickup
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace listings, first-party product/help/legal/privacy pages, support pages, and app-specific public feature documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, location-gated restaurant availability, Mobile Order and Pay, curbside/front-counter/table-service/drive-thru check-in, payment authorization, PayPal/Venmo/wallet behavior, reward/deal redemption, cancellation timing, McDelivery vendor routing, support/refund handling, restaurant locator detail, push payloads, account deletion, and franchise-specific menu/pricing behavior still require lawful test devices/accounts and any required provider approvals before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, menus, listings, reviews, ratings, photos, store/business data, maps, payment providers, loyalty engines, recommendation systems, support scripts, merchant tools, and regulated workflows.

## Overview

Build an original mobile product inspired by McDonald's's public workflow for quick-service restaurant ordering, deals, rewards, delivery, and pickup. The clone must preserve the functional interaction model users expect while using original product language, synthetic or licensed data, independent ranking/availability/quote logic, and jurisdiction-aware compliance.

The clone must not copy McDonald's branding, screenshots, marketing copy, protected UI artwork, business/store data, menu copy, photos, reviews, ratings, private APIs, support scripts, recommendation logic, pricing formulas, or loyalty/offer terms. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first quick-service restaurant mobile ordering and rewards app with complete onboarding, discovery, primary transaction, history, settings, support, privacy, and recovery flows.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around account security, payments, location, inventory/availability, support, refunds, reviews, loyalty, merchant/business tools, accessibility, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a McDonald's-branded app or imply affiliation with McDonald's, its parent company, stores, restaurants, business owners, delivery partners, payment providers, or map providers.
- Do not scrape McDonald's, reuse private APIs, replay network traffic, copy marketplace data, copy menu/listing/review/media content, clone proprietary ranking/risk/loyalty systems, or reproduce policy/support copy.
- Do not process production payments, refunds, tips, stored value, identity documents, regulated goods, food-safety reports, advertising spend, business payouts, or support disputes without separate legal, compliance, privacy, trust/safety, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, reward, notification, support, refund, business-tooling, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/mcdonalds/id922103212 | Official iOS listing, Food & Drink category, ratings, release notes, app feature claims for deals, Rewards, Mobile Order and Pay, pickup, McDelivery, favorites, and restaurant locator. | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.mcdonalds.app | Official Android listing, data-safety orientation, app support, and public app feature claims. | Verified 2026-04-17 |
| McDonald's App Page | https://www.mcdonalds.com/us/en-us/download-app.html | Official app download/product page for app ordering, deals, rewards, pickup, delivery, and favorites. | Verified 2026-04-17 |
| Mobile Order And Pay | https://www.mcdonalds.com/us/en-us/mobile-order-and-pay.html | Pickup modes, payment methods, location-gated availability, cancellation, refunds, payment management, notifications, location settings, and fraud guidance. | Verified 2026-04-17 |
| MyMcDonald's Rewards | https://www.mcdonalds.com/us/en-us/mymcdonalds-rewards.html | Rewards earning/redemption, point mechanics, mobile redemption, and eligibility orientation. | Verified 2026-04-17 |
| McDelivery | https://www.mcdonalds.com/us/en-us/mcdelivery.html | Delivery availability and third-party delivery partner orientation. | Verified 2026-04-17 |
| Deals | https://www.mcdonalds.com/us/en-us/deals.html | Deal and promotion public product orientation. | Verified 2026-04-17 |
| Full Menu | https://www.mcdonalds.com/us/en-us/full-menu.html | Public menu category orientation and product availability modeling. | Verified 2026-04-17 |
| Terms And Conditions | https://www.mcdonalds.com/us/en-us/terms-and-conditions.html | Online services, account, age, MOP, pricing, restaurant/franchise responsibility, deals, communications, ordering, cancellation, refund, and IP/legal rules. | Verified 2026-04-17 |
| Privacy Statement | https://www.mcdonalds.com/us/en-us/privacy.html | Privacy, communications, location, account, marketing, transaction, rights, and retention orientation. | Verified 2026-04-17 |
| Customer Feedback | https://www.mcdonalds.com/us/en-us/feedback.html | Canonical customer care/feedback entrypoint for restaurant, order, app, and support concerns. | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must expose selected restaurant, location permission state, order entry, Rewards points, deals, favorites, delivery entry, and restaurant locator without requiring unsupported permissions.
- Restaurant selection must validate participating restaurants, distance/availability gates, hours, drive-thru/curbside/front-counter/table-service support, menu/pricing variance, and franchise-operated constraints.
- Menu and product detail must model category hours, regional availability, item customization, unavailable products, nutrition/allergen references, favorites, and reorder validation.
- Deals and Rewards must support activation, one-deal-per-visit constraints, reward redemption, point earning, reward restoration after eligible cancellation, expiration, and conflicts with cart state.
- Cart and checkout must show item price, restaurant-specific price, taxes/fees, pickup mode, payment method, rewards/deals, quote freshness, and selected restaurant before order placement.
- Mobile Order and Pay must charge only after explicit pay/place-order confirmation, support safe cancellation until preparation starts, and route refund requests to the restaurant or customer care path.
- Pickup must model curbside spot, table number, front counter, drive-thru code, check-in timing, preparation state, and wrong-location recovery.
- Delivery must model vendor identity and support handoff when Uber Eats, DoorDash, or another delivery partner owns fulfillment or issue resolution.
- Communication preferences must include email, SMS where applicable, push notifications, order progress, deals, product announcements, opt-out, and device-setting fallback.
- Support must handle mobile-order issue, refund, wrong/missing item, unauthorized charge, restaurant complaint, account issue, Rewards issue, delivery partner issue, and privacy/deletion request.

### Manual Verification Required

- Native iOS/Android screen capture.
- Signup/login.
- Location-gated restaurant availability.
- Mobile Order and Pay.
- Curbside/front-counter/table-service/drive-thru check-in.
- Payment authorization.
- PayPal/Venmo/wallet behavior.
- Reward/deal redemption.
- Cancellation timing.
- McDelivery vendor routing.
- Support/refund handling.
- Restaurant locator detail.
- Push payloads.
- Account deletion.
- And franchise-specific menu/pricing behavior.

### Build Plan

- Phase A: auth shell, restaurant locator, menu, item detail, bag, checkout preview, deals/rewards read model, synthetic menu seed data, and settings.
- Phase B: MOP order stub, pickup check-in, payment-token stub, order history, cancellation eligibility, notification preferences, and support case entry.
- Phase C: deal/reward engine, delivery-vendor handoff, franchise menu/pricing simulator, fraud/unauthorized charge path, refund routing, and privacy export/delete flows.
- Phase D: payment provider integration, delivery partner contracts, manual pickup evidence capture, accessibility audit, observability, and legal/franchise policy review.

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
| Welcome/Auth/Consent | Entry, account, age/legal acceptance, and permission education | join, sign in, legal links | new, returning, signed-out, blocked | underage, auth fail, account locked |
| Home/Deals/Rewards | Primary hub for order, points, deals, favorites, and delivery | order, rewards, deal, delivery | signed-in, guest, personalized | stale points, expired deal, offline |
| Restaurant Locator | Select fulfillment restaurant and show availability | GPS, search, map, restaurant | nearby, selected, participating | denied location, too far, closed, MOP unavailable |
| Menu And Item Detail | Browse and customize food and beverages | category, item, modifier | loaded, customized, favorite | breakfast cutoff, unavailable item, price mismatch |
| Bag And Checkout | Validate order, deals, rewards, payment, pickup mode, and total | quantity, deal, reward, payment | valid, deal applied, reward applied | quote stale, restaurant changed, payment fail |
| Pickup Check-In | Guide arrival, code, curbside, table service, or counter pickup | spot, table, drive-thru code | arrived, preparing, ready | wrong restaurant, no spot, preparation started |
| Delivery | Vendor-backed McDelivery order context and support routing | address, vendor, tracking, help | available, ordered, tracking | vendor outage, support handoff, fee mismatch |
| Payment Methods | Manage cards, wallet methods, PayPal/Venmo where enabled | add, remove, select | saved, verified, default | authorization fail, unsupported card, fraud concern |
| Order History/Favorites | Reorder, receipt, saved favorites, and issue entry | reorder, receipt, favorite | eligible, unavailable, completed | item unavailable, restaurant mismatch |
| Settings/Privacy/Support | Profile, communications, payment, data rights, feedback, and deletion | toggles, forms, delete | verified, submitted, pending | email immutable, 2FA fail, retention caveat |

## Data Model

- `User`: identity, age/legal acceptance, contact, Rewards enrollment, communication preferences, payment references, and deletion/export lifecycle.
- `Restaurant`: franchise/operator flag, location, hours, menu version, pickup modes, MOP eligibility, delivery partners, and support phone.
- `MenuItem`: category hours, product metadata, modifier groups, nutrition/allergen references, price, availability, and regional flags.
- `Deal`: campaign, restaurant eligibility, redemption code, Mobile Order eligibility, expiration, frequency limits, and conflict rules.
- `RewardAccount`: points balance, earning rules, redemption catalog, reward state, expiration, and restoration rules.
- `Cart`: restaurant, items, pickup mode, deals, rewards, taxes/fees, quote id, payment method, and validation errors.
- `Order`: restaurant purchase contract, cart snapshot, payment state, preparation state, pickup check-in, receipt, cancellation/refund state, and audit ids.
- `PaymentMethod`: tokenized card/wallet/PayPal/Venmo reference, billing region, verification, default state, and removal constraints.
- `DeliveryOrder`: vendor, address, fee/tax/tip snapshot, tracking reference, issue routing, and support handoff.
- `SupportCase`: issue type, restaurant/order/vendor link, evidence, decision, refund route, owner queue, and SLA.
- `AuditEvent`: append-only record for auth, permission, search, availability, cart/reservation/order, payment/refund, support, moderation, business-tool, privacy, and safety-sensitive transitions.
- `LocalCacheRecord`: device-local cache entry for recent discovery results, detail pages, drafts, active transactions, settings, sync attempts, freshness markers, and conflict recovery.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` with device-scoped sessions, account locks, deletion state, and fraud/risk flags.
- `GET /home`, `GET /deals`, `GET /rewards`: points, available deals, mobile-order eligibility, favorite modules, and stale indicators.
- `GET /restaurants`, `GET /restaurants/:id`, `GET /restaurants/:id/menu`: location-based restaurants, pickup modes, hours, restaurant-level prices, and availability flags.
- `POST /bag`, `PATCH /bag/:id`, `POST /bag/:id/validate`: item customization, unavailable product recovery, deal/reward application, pickup mode, and quote validation.
- `POST /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`: Mobile Order and Pay placement, status, cancellation eligibility, receipt, and refund-support path.
- `POST /orders/:id/check-in`: curbside spot, table service, front counter, drive-thru code, arrival state, and duplicate check-in handling.
- `GET /delivery/vendors`, `POST /delivery/orders`: McDelivery vendor availability, quote handoff, partner tracking reference, and support owner metadata.
- `GET /payment-methods`, `POST /payment-methods`, `DELETE /payment-methods/:id`: tokenized payment management, provider verification, and fraud/risk errors.
- `POST /support/cases`, `POST /data-export`, `DELETE /account`, `PATCH /communication-preferences`: support, privacy rights, deletion, and messaging controls.
- Observability: all sensitive writes require idempotency keys, structured validation errors, privacy-safe logs, redacted analytics, and audit events.

## Realtime, Push, And Offline Behavior

- Availability, cart/reservation/order/payment/support/business-tool state changes must use websocket, SSE, or push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache discovery modules, recent detail pages, saved/favorite objects, active transaction summaries, settings, and drafts; cached data must always expose freshness and must not hide quote, inventory, review, or availability expiry.
- Low-risk local drafts may queue with retry metadata; payment, refund, reward redemption, account deletion, business operational writes, reports, moderation decisions, and regulated actions must block while offline.
- Push notifications must be opt-in, category-controlled, and content-minimized for transactional, reminder, account security, support, offer/marketing, business-tool, and safety categories.
- Realtime recovery must handle duplicate events, missed events, stale client state, provider outage, simultaneous edits, token expiry, app termination, clock skew, and revoked OS permissions.
- All manual-blocker surfaces must be feature-flagged until lawful hands-on verification confirms native behavior and provider/legal requirements.

## Permissions, Privacy, And Safety

- Launch payments owner for MOP, wallet, PayPal, Venmo, refunds, and unauthorized charge handling.
- Launch loyalty owner for points, deals, and reward restoration.
- Launch restaurant operations owner for franchise menu/pricing and pickup states.
- Launch privacy owner for age, location, transaction, and communication preferences.
- Launch support owner for delivery partner handoff and restaurant complaints.
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
- Sponsored, promoted, recommended, personalized, or ranked content must be explainable enough for QA and privacy review, and must not copy McDonald's's ranking or advertising logic.
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
- Manual verification tests for native iOS/Android screen capture, signup/login, location-gated restaurant availability, Mobile Order and Pay, curbside/front-counter/table-service/drive-thru check-in, payment authorization, PayPal/Venmo/wallet behavior, reward/deal redemption, cancellation timing, McDelivery vendor routing, support/refund handling, restaurant locator detail, push payloads, account deletion, and franchise-specific menu/pricing behavior.
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
- What original seed data and media set will replace all McDonald's business, store, menu, review, rating, photo, and promotional content?

## Next Steps

- Capture lawful hands-on evidence for the listed manual blockers before removing any feature flags or parity blockers.
- Pick downstream implementation providers for auth, maps/search, payments, notifications, support, analytics, moderation, and storage.
- Produce an implementation repo build plan with route map, component map, API schema, state machines, seed data, and acceptance test checklist.
