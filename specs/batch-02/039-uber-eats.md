# Uber Eats-Style Clone Spec

> Metadata
> - Inspiration app: Uber Eats
> - Category: restaurant, grocery, convenience, retail, alcohol, pickup, and local delivery marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Uber Eats product pages, Uber Help pages, Uber legal/privacy pages, Uber One pages, Uber Eats Merchant pages, Uber delivery-person pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, phone verification, address validation, live store availability, menu item customization, cart quote refresh, payment authorization, tipping, promo/credit behavior, Uber One enrollment/cancellation, alcohol checkout and ID handoff, live order tracking, courier/customer messaging, support refund paths, merchant order-management tools, push payloads, pickup handoff, account deletion, and regional regulated-item availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, restaurant/store data, menus, item photos, ratings, reviews, maps, routing, pricing engines, payment providers, fraud/risk systems, support scripts, merchant tools, courier tools, and regulated-item workflows.

## Overview

Build an original local-commerce marketplace inspired by Uber Eats's public workflow: address-based restaurant and store discovery, search, menu browsing, item customization, cart building, delivery or pickup checkout, transparent fees/taxes/tips/promos, Uber One-style membership benefits, real-time order status, courier handoff, reorder, ratings, support, privacy controls, and regulated-item safeguards.

The clone must not copy Uber Eats branding, screenshots, marketing copy, protected UI artwork, merchant inventory, menu photos, ratings/reviews, recommendation systems, private APIs, fee/risk models, dispatch logic, courier tools, or support content. Functional parity should be expressed through original product language, licensed maps and payments, synthetic or licensed merchant catalogs, independently designed ranking/quote/risk logic, and jurisdiction-aware compliance.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first delivery and pickup marketplace with address setup, restaurant/grocery/convenience/retail discovery, search, filters, merchant detail, menu/item customization, cart, checkout, order tracking, reorder, support, and privacy controls.
- Support a V1 merchant operations model for menu availability, item and modifier edits, order acceptance, prep-time updates, substitutions/refunds where supported, pickup readiness, cancellation reasons, and masked customer/courier contact.
- Preserve marketplace trust expectations around price transparency, food safety, regulated deliveries, payments, refunds, promotions, tipping, fraud prevention, courier/customer/merchant safety, and support escalation.
- Expose privacy controls for profile data, delivery addresses, precise/coarse location, order history, payment methods, support content, ad personalization, data access/export, account deletion, and legal-retention caveats.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Uber Eats-branded app or imply affiliation with Uber, Uber Eats, Postmates, Uber One, merchants, couriers, payment providers, or map providers.
- Do not scrape Uber Eats, reuse private Uber APIs, replay network traffic, copy merchant menus, copy item photos, copy reviews, clone proprietary search/ranking/dispatch/risk systems, or reproduce Uber policy/support copy.
- Do not process production payments, alcohol sales, refunds, chargebacks, tips, merchant payouts, identity documents, food-safety reports, or emergency support without separate legal, compliance, trust/safety, and payment-provider review.
- Do not publish merchant tooling, courier handoff flows, alcohol checkout, health-adjacent retail products, promos/credits, support/dispute surfaces, customer/merchant messaging, or delivery proof workflows without abuse prevention, privacy review, audit logging, and escalation paths.
- Do not claim exact App Store, Play Store, native-device, checkout, fee, Uber One, alcohol, support/refund, substitution, order tracking, merchant dashboard, delivery-person app, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/uber-eats-food-delivery/id1058959277 | Official iOS listing, category, public feature framing for food/grocery/retail delivery, release notes, privacy labels, age rating, support/developer links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.ubercab.eats | Official Android listing, package id, delivery/pickup/search/tracking claims, data-safety orientation, ratings/download scale | Verified 2026-04-17 |
| Uber Eats Web Marketplace | https://www.ubereats.com/ | Public consumer marketplace entrypoint for address-based discovery, restaurant/store search, categories, pickup/delivery mode, menu browsing, cart context, and order entry | Verified 2026-04-17 |
| Uber Eats Product Page | https://www.uber.com/us/en/eats/ | Public product overview for food delivery, restaurant/store ordering, app/web access, delivery and pickup positioning | Verified 2026-04-17 |
| Uber Help - Eats | https://help.uber.com/ubereats | Canonical consumer support entrypoint for orders, accounts, payments, promos, Uber One, privacy, safety, and issue routing | Verified 2026-04-17 |
| Uber One | https://www.uber.com/us/en/u/uber-one/ | Membership benefit framing, eligible orders/rides, monthly/annual plans, savings positioning, and cross-product entitlement context | Verified 2026-04-17 |
| Uber Eats Merchants | https://merchants.ubereats.com/us/en/ | Merchant onboarding, restaurant/store marketplace participation, delivery/pickup, order management, growth tools, and operations context | Verified 2026-04-17 |
| Uber Eats Orders | https://merchants.ubereats.com/us/en/technology/orders/ | Merchant order-management surface, order acceptance, prep workflow, notifications, and fulfillment operations | Verified 2026-04-17 |
| Uber Eats Menu Management | https://merchants.ubereats.com/us/en/technology/menu-management/ | Menu, item, modifier, price, and availability management requirements for merchant tooling | Verified 2026-04-17 |
| Delivery With Uber Eats | https://www.uber.com/us/en/deliver/ | Courier-side public positioning for delivery opportunities, app-based work, requirements, and delivery-person context | Verified 2026-04-17 |
| Alcohol Delivery With Uber Eats | https://www.uber.com/us/en/drive/delivery/alcohol-delivery/ | Public regulated-delivery framing for alcohol eligibility, legal age, ID checks, delivery-person responsibilities, and refusal states | Verified 2026-04-17 |
| Uber Privacy Notice | https://www.uber.com/legal/en/document/?country=united-states&lang=en&name=privacy-notice | Collection, use, sharing, retention, rights, ads, location, account, order, and support privacy orientation | Verified 2026-04-17 |
| Uber Terms Of Use | https://www.uber.com/legal/en/document/?country=united-states&lang=en&name=general-terms-of-use | Public legal contract for platform use, orders, payments, disputes, content, and account obligations | Verified 2026-04-17 |
| Uber Accessibility | https://www.uber.com/us/en/about/accessibility/ | Public accessibility commitment, support channels, and inclusive product expectations | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public mobile listings and Uber Eats web pages position the product as a restaurant, grocery, convenience, retail, and pickup/delivery marketplace anchored on a delivery address or pickup location.
- Home must expose address entry, permission-based location, manual address fallback, restaurant/store categories, pickup toggle, recent orders, promotions, membership eligibility, search, and unavailable-region states.
- Search must support merchant, cuisine, item, category, grocery/retail, pickup/delivery, open-now, ETA, fee, rating, price, promo, membership-eligible, alcohol/regulatory, and unavailable-reason filtering without copying Uber ranking logic.
- Merchant detail must support hero metadata, open/closed state, delivery/pickup availability, ETA, distance, fees, minimum subtotal, membership eligibility, promo badges, ratings/review summary, hours, safety notes, and menu/category navigation.
- Menu item detail must support required and optional modifier groups, multiple-selection rules, quantity, size, preparation options, special instructions where permitted, media alt text, allergens/disclaimers, delivery/pickup price variants, item availability, and modifier stockouts.
- Cart must maintain merchant grouping, item modifiers, quantity edits, delivery or pickup mode, scheduled time where available, promo/credit state, membership benefit snapshot, tip, delivery instructions, no-contact preference, and recalculated quote snapshots.
- Checkout must display subtotal, item prices, delivery fee, service fee, taxes/estimated taxes, regulatory fees where configured, membership savings, promos/credits, tip, total, payment method, quote expiry, and final confirmation.
- Price, tax, fee, ETA, merchant availability, item availability, and promotion state must refresh before order placement and show clear recovery paths when the quote changes.
- Uber One-style membership must support trial, monthly, annual, partner/complimentary, active, canceled, expired, unavailable, and missing-benefit states with eligible merchant indicators, checkout savings display, cancellation path, and support escalation.
- Alcohol and regulated categories must be gated by legal region, age, ID check, recipient presence, valid government ID, physical handoff, refusal conditions, self-exclusion where supported, delivery-person eligibility, and audit logs.
- Pickup must support customer pickup order placement, merchant acceptance, ready-time estimate, ready notification, directions, handoff checklist, and pickup-specific issue reporting.
- Delivery tracking must model placed, merchant confirming, preparing, courier assigned, courier en route to merchant, picked up, approaching, delivered, canceled, delayed, and support-needed states with realtime reconciliation.
- Courier/customer communication must use masked phone or in-app messaging, minimize address exposure until fulfillment requires it, preserve support handoff, and block harassment, unsafe delivery instructions, and off-platform payment requests.
- Merchant operations must support store open/closed state, order acceptance, prep-time edits, menu item availability, modifier availability, refunds/replacements where allowed, courier arrival, printer/device health, order history, and support chat.
- Customer support must handle missing/incorrect items, late orders, canceled orders, wrong address, payment issue, membership charge, promo failure, refund/credit request, food safety issue, courier safety issue, merchant issue, alcohol refusal, and account/privacy requests.
- Ratings and reviews must be eligible only after order completion, separate merchant food/item quality from delivery experience where useful, prevent fake/abusive/private-content reviews, and allow support/moderation review.
- Account settings must expose profile, addresses, payment methods, membership, notifications, privacy, ad personalization, order history, help, accessibility, terms, data access/export, account deletion, and emergency/support links.

### Manual Verification Required

- Native iOS and Android navigation, marketplace modules, screen copy, privacy-label details, release-note behavior, push payloads, and accessibility behavior.
- Signup/login, phone/email verification, saved address validation, payment method add/remove, promo redemption, membership enrollment/cancellation, account deletion, and data access/export.
- Live merchant availability, menu item customization, cart quote refresh, checkout authorization, tipping, cancellation eligibility, refund/credit routing, support chat, and rating eligibility.
- Courier assignment, live map tracking, masked calls/messages, no-contact delivery proof, failed handoff, alcohol ID scan, pickup handoff, and merchant dashboard order-management states.

### Build Plan

- Phase A: implement auth shell, address/location setup, marketplace home, search, merchant/menu detail, item customization, cart validation, settings, privacy links, and synthetic merchant seed data.
- Phase B: add quote service, checkout session, tokenized payment stub, order placement, order history, realtime status events, pickup flow, notification preferences, and support case creation.
- Phase C: add membership benefits, promotions/credits, merchant menu/order manager, courier assignment simulator, masked contact, ratings/reviews, fraud holds, refund/credit review, and privacy export/delete workflows.
- Phase D: add regulated-category feature flags, alcohol handoff audit, advanced merchant tooling, accessibility audits, payment-provider integration, tax/fee provider integration, observability, and manual verification evidence capture.

## Core User Journeys

- New customer installs the app, grants or denies location, enters an address manually if needed, browses nearby restaurants and stores, opens a merchant, customizes an item, creates an account at checkout, places a delivery order, tracks it in real time, and rates the experience.
- Returning customer opens personalized home, searches by cuisine or item, filters for pickup or membership-eligible merchants, compares fees/ETAs, reorders a prior meal, applies a promo, adjusts tip, and confirms the quote before payment authorization.
- Grocery or convenience customer selects a store, searches catalog items, handles substitutions or out-of-stock recommendations where configured, schedules delivery or pickup, and sees availability refreshed before checkout.
- Alcohol customer enters an eligible region, verifies age before checkout, receives reminders to meet the courier with valid ID, passes handoff verification, or receives a refusal/cancellation state if legal requirements are not met.
- Pickup customer chooses pickup, pays online, receives merchant ready-time updates, sees ready-for-pickup notification, completes handoff, reports a missing item, and receives support resolution without a courier lifecycle.
- Customer experiences a delayed delivery, opens order status, contacts the courier through a masked channel, escalates to support, receives credit/refund decision, and sees the decision in order history.
- Merchant receives a live order, accepts it, changes prep time, marks an item or modifier unavailable, prepares the order, manages courier pickup or customer pickup, and resolves a cancellation/dispute from order history.
- Merchant updates menu categories, adds required and optional modifier groups with price changes, marks an option unavailable, previews customer-facing impact, and sees cart validation prevent invalid orders.
- Courier handoff flow receives pickup details, verifies order, communicates safely through masked contact, navigates to customer, completes no-contact or hand-to-me delivery, and follows regulated-item refusal rules when required.
- Member manages trial or paid benefits, sees eligible merchants and checkout savings, cancels renewal, and retains or loses benefits according to the documented entitlement state.
- Privacy-focused user updates account details, requests data access/export, opts out of ad personalization where supported, deletes the account after verification, and sees retention/legal-hold caveats for order, payment, regulated-item, and support records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, terms, privacy, and permission education | sign in, create account, continue, legal links | new, returning, signed-out, blocked region | auth failure, unsupported OS, underage, account locked |
| Address/Location Setup | Delivery availability and fulfillment anchor | GPS, address search, apartment, instructions | precise, approximate, manual, saved | denied permission, invalid address, outside service area |
| Marketplace Home | Discovery across restaurant, grocery, convenience, retail, alcohol, pickup | category, search, promo, reorder, address | personalized, signed-out, loading, empty | no merchants, stale personalization, location mismatch |
| Search And Filters | Find merchants/items and narrow marketplace results | query, cuisine, category, fees, ETA, membership | results, no results, corrected query | restricted category, closed stores, provider outage |
| Merchant Detail | Store page, menu, fees, ETA, hours, and trust summary | category, item tap, favorite, share, mode | open, closed, scheduled, pickup | paused store, stale fee, unavailable merchant, region block |
| Item Customization | Configure item, modifiers, quantity, instructions | modifier choices, quantity, notes, add | valid, invalid, edited, added | required modifier missing, out of stock, price changed |
| Cart | Durable order draft and quote context | edit item, promo, mode, schedule, tip | valid, needs refresh, benefit applied | invalid item, expired quote, min not met, split payment issue |
| Checkout | Payment authorization and final order placement | address, payment, tip, promo, confirm | ready, authorizing, placed, failed | payment fail, fraud hold, stale quote, merchant closed |
| Order Tracking | Live order lifecycle and recovery actions | status, map, contact, help, cancel | placed, preparing, picked up, delivered | delayed, no courier, wrong address, support escalation |
| Pickup Status | Customer pickup progress and handoff | ETA, ready notification, directions, help | accepted, preparing, ready, picked up | late prep, wrong order, merchant closed |
| Membership | Uber One-style plan, benefits, eligibility, cancellation | plan, payment, cancel, manage | trial, active, partner, canceled | ineligible, payment fail, benefit missing, renewal dispute |
| Alcohol Verification | Regulated-item checkout and handoff gate | ID, age, recipient, consent | verified, pending, handoff required | expired ID, underage, intoxication, refused delivery |
| Messages/Contact | Customer, courier, merchant, and support communication | masked call, message, attachment, report | connected, sent, failed, escalated | harassment, blocked user, unsafe instruction, moderation |
| Order Issue/Support | Refund, credit, missing item, safety, and help flows | issue type, evidence, chat, call | submitted, reviewing, resolved, denied | duplicate claim, legal hold, emergency, abuse pattern |
| Ratings/Reviews | Post-order feedback and reputation signals | rating, tags, text, report | eligible, submitted, published | expired, abusive content, fraud review, private data |
| Merchant Order Manager | Merchant acceptance, prep, item issue, and handoff | accept, busy, refund, replace, ready | new, confirmed, preparing, ready | canceled, item unavailable, tablet offline, dispute |
| Merchant Menu Manager | Menu items, modifiers, prices, and stock state | item, modifier, rule, price, availability | draft, published, paused | invalid required option, conflict, out of sync |
| Settings/Privacy | Account, addresses, payments, notifications, data rights | toggles, export, delete, legal links | signed-in, signed-out, verified | active order block, retention caveat, 2FA fail |

## Data Model

- `User`: account identity, locale, age/consent, phone/email verification, saved addresses, notification preferences, privacy settings, membership state, support restrictions, export/delete lifecycle, and fraud/risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, ad personalization status, offline cache version, and last active state.
- `Address`: geocoded delivery location, apartment/unit, dropoff instructions, precise/coarse coordinates, delivery zone, regulated-item eligibility, and courier visibility rules.
- `Merchant`: restaurant/store identity, category, location, hours, status, delivery/pickup modes, membership eligibility, fee settings, rating summary, support contacts, and operational restrictions.
- `Menu`: categories, sort order, availability windows, pickup/delivery price variants, schedule rules, and version for conflict detection.
- `MenuItem`: title, description, media metadata, base price, nutrition/allergen/disclaimer fields, age/regulatory flags, stock state, and substitution policy.
- `ModifierGroup`: required/optional setting, min/max selections, duplicate selection rule, free option count, per-option pricing, pickup/delivery price, and stock state.
- `Cart`: merchant, items, modifiers, delivery/pickup mode, schedule, address, instructions, promo codes, membership benefit snapshot, tip, quote id, and validation errors.
- `PriceQuote`: subtotal, delivery fee, service fee, taxes, regulatory fees, promo/credit, membership savings, tip, total, quote expiry, region, and line-item explainability.
- `PaymentMethod`: tokenized card/wallet representation, billing region, verification state, SCA/3DS state where relevant, and deletion constraints.
- `Order`: customer, merchant, cart snapshot, quote snapshot, payment state, mode, status, cancellation/refund state, support cases, rating eligibility, and audit ids.
- `Fulfillment`: delivery or pickup lifecycle, courier assignment, pickup ETA, dropoff ETA, route provider reference, handoff type, no-contact proof, regulated-item status, and failed handoff reason.
- `CourierProfile`: public first name/initial, masked contact, vehicle where relevant, regulated-delivery eligibility, assignment state, safety restrictions, and handoff audit metadata.
- `Membership`: plan, trial, renewal date, payment source, country, eligible benefits, cancellation, expiration, partner entitlement, and dispute state.
- `PromotionCredit`: campaign, redemption rules, merchant/category eligibility, min subtotal, expiration, stackability, fraud checks, and audit events.
- `SupportCase`: issue type, order/item, evidence, requester role, refund/credit decision, safety escalation, SLA, appeal, legal hold, and owner queue.
- `MerchantDispute`: canceled order, reason code, payout impact, evidence, dispute window, review decision, and merchant communication state.
- `Review`: order link, merchant/item/delivery dimensions, rating, tags, text, moderation state, report, removal decision, and publication timing.
- `AuditEvent`: append-only record for auth, address, pricing, cart, checkout, payment, regulated delivery, support, refunds, merchant changes, privacy, and safety-sensitive actions.
- `LocalCacheRecord`: cached merchants, menus, carts, order statuses, message drafts, settings, quote freshness, sync attempts, conflict markers, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with age, region, verification, deletion, fraud, and device gates.
- `GET /home?addressId=&lat=&lng=`, `GET /search?query=&category=&filters=&cursor=`: marketplace discovery with category modules, merchant cards, ETA/fee snippets, personalization status, eligibility badges, pagination, and stale-data indicators.
- `GET /merchants/:id`, `GET /merchants/:id/menu`, `GET /merchants/:id/status`: merchant detail, menu version, hours, delivery/pickup modes, fees, availability, membership/regulatory flags, and status reason codes.
- `POST /carts`, `PATCH /carts/:id`, `POST /carts/:id/validate`: cart creation and validation with item modifier rules, stock checks, address eligibility, min subtotal, promo validation, and quote refresh requirement.
- `POST /quotes`, `GET /quotes/:id`: price quote generation with fee/tax/credit/tip line items, membership savings, quote expiry, jurisdiction display flags, and price-change warnings.
- `POST /checkout/session`, `POST /orders`, `POST /payments/webhooks`: payment authorization, idempotency, order placement, duplicate webhook handling, failure recovery, credit/refund hooks, and server-owned state.
- `GET /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`, `POST /orders/:id/reorder`: order history, live status, cancellation eligibility, reorder validation, unavailable item recovery, and support affordances.
- `GET /orders/:id/tracking`, `GET /fulfillments/:id/events`: status events with stable ids, courier assignment, ETA updates, proof-of-delivery metadata, regulated handoff state, and reconciliation after reconnect.
- `POST /orders/:id/contact`, `POST /message-threads/:id/messages`: masked customer/courier/merchant/support contact with delivery context, moderation, unsafe-instruction blocks, and retention policy.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/appeal`: missing item, late order, refund, membership, payment, alcohol, safety, food quality, account, and privacy cases.
- `GET /membership`, `POST /membership/subscribe`, `POST /membership/cancel`, `GET /membership/benefits`: membership lifecycle, trials, renewal billing, cancellation, partner eligibility, merchant eligibility, and checkout savings.
- `POST /regulated/alcohol/verify`, `POST /fulfillments/:id/regulated-handoff`: age verification, ID check, recipient match, courier verification, refusal reason, region rules, and audit logging.
- `GET /promotions`, `POST /promotions/redeem`, `DELETE /promotions/:id`: promo discovery, redemption, stackability, expiration, fraud checks, and quote integration.
- `POST /ratings`, `GET /ratings/:merchantId`, `POST /reviews/:id/report`: post-order rating eligibility, moderation, report/removal flow, and separation of merchant/item/delivery feedback.
- `GET /merchant/orders`, `PATCH /merchant/orders/:id`, `POST /merchant/orders/:id/adjust`: merchant order acceptance, prep-time updates, item replacement/refund, ready status, cancellation, and support chat.
- `GET /merchant/menus`, `PATCH /merchant/menus/:id`, `PATCH /merchant/modifiers/:id`: merchant menu, item, modifier, stock, pricing, required/optional rules, and version conflicts.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, security checks, irreversible deletion warnings, active-order constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Order, payment, merchant confirmation, item adjustment, courier assignment, ETA, pickup-ready, delivery, cancellation, refund, support, regulated handoff, and merchant-dispute state changes must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache home modules, recent merchants, menu summaries, full menus opened in the session, cart drafts, saved addresses, membership status, order history, and in-progress order status; cached data must expose freshness and never hide quote or availability expiry.
- Offline mode may show cached merchants/menus/order history and preserve local cart drafts, but checkout, payment, regulated verification, merchant order adjustment, cancellation, refund, support escalation, account deletion, and safety reports require server confirmation.
- Low-risk local drafts such as search filters, item notes, cart edits, support evidence drafts, and rating drafts may queue with retry metadata; money movement, regulated items, privacy actions, and merchant operational writes must block while offline.
- Price quotes, tax calculations, delivery fees, merchant availability, item availability, membership benefits, alcohol eligibility, and ETA must expire and refresh before checkout confirmation.
- Realtime tracking must handle duplicate events, missed events, courier reassignment, route provider outage, merchant prep delay, customer address edits, no-contact proof upload, failed handoff, and canceled order while offline.
- Merchant order manager must tolerate tablet disconnect, printer failure, duplicate notifications, busy mode, simultaneous portal/mobile edits, and conflict recovery through version checks.
- Push notifications must be opt-in, category-controlled, and content-minimized for order status, courier arrival, message, pickup ready, support decision, refund, membership renewal, promo, account security, and regulated-item reminders.

## Permissions, Privacy, And Safety

- Location, notifications, camera/photos/files for support evidence or regulated ID capture, contacts only if a future sharing feature requires it, and biometric/device authentication must be requested only when the user invokes a related feature.
- Default analytics must exclude precise addresses, raw delivery instructions, payment credentials, ID images, support evidence, private messages, phone numbers, and exact courier/customer location trails.
- Location UX must distinguish no location, approximate location, precise location, manually entered address, OS-revoked permission, region-blocked category, and unsupported delivery zone with usable pickup/search fallback.
- Regulated-item data must be purpose-limited, encrypted, access-controlled, redacted from logs, retained only under documented policy/legal constraints, and auditable for every verification and refusal decision.
- Merchants, customers, and couriers must be blocked from moving payments, required support communication, refunds, reviews, or regulated-item delivery off-platform unless a policy-reviewed exception exists.
- Food safety controls must cover temperature-sensitive items, missing/tampered items, allergens/disclaimers, wrong-order handoff, photo/evidence upload, and escalation to support.
- Regulated categories must cover alcohol, OTC medicine, age-restricted products, and region-specific product bans with legal configuration and checkout guards.
- Courier/customer safety must cover no-contact delivery, unsafe dropoff, harassment, threats, weapons, intoxication, underage recipient, blocked user, emergency escalation, and masked contact.
- Payment, refund, credit, promo, tip, chargeback, membership renewal, and cross-currency behavior must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- Reviews and ratings must include authenticity checks, anti-coercion rules, eligibility windows, policy moderation, report/removal flows, and appeal handling.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, clear fee breakdowns, and accessible support channels.
- Launch owners: marketplace trust owner for fraud/risk, legal/compliance owner for regulated items and terms, payments owner for checkout/refunds/tips, safety owner for food/courier incidents, privacy owner for data rights, accessibility owner for inclusive ordering, and merchant operations owner for dashboard/menu workflows.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, address added, permission state changed, home viewed, search performed, filter applied, merchant opened, item customized, cart validated, quote refreshed, checkout started, order placed, order tracked, support opened, reorder started, rating submitted, data export requested, account deletion requested.
- Marketplace quality metrics must use object ids, reason codes, latency, provider status, quote freshness, merchant availability freshness, ETA confidence, and failure codes rather than raw addresses, payment credentials, ID images, or support evidence.
- Search/ranking diagnostics must separate organic ranking, personalization, availability, ETA, fee, promo, membership, regulated-category, and legal-region logic, with opt-out and retention behavior reviewed for privacy.
- Payment analytics must capture checkout funnel and failure categories using tokenized payment references, not card details; refund analytics must hide private support evidence and merchant dispute details.
- Trust/safety analytics must track report categories, moderation states, regulated refusal reasons, food-safety issue types, fraud/risk signals, appeal outcomes, SLA, and repeat-offender status without exposing private evidence to product analytics.
- Monetization can include original service fees, delivery fees, subscription membership, merchant promotion tools, pickup ordering, retail partnerships, ads/sponsored listings, convenience stores, gift cards, or premium merchant analytics later, but pricing, names, fee rates, protection claims, and promotional copy must be original and legal-reviewed.
- Fee display must be transparent before confirmation, configurable by jurisdiction, testable in checkout, and explicit about what is collected by platform, merchant, courier/tip, provider, or tax authority.
- Merchant-side monetization must show commission/rate effects, promo spend, refund/error charges, cancellation payout implications, pickup fee differences, and ad attribution without copying Uber merchant pricing.

## Edge Cases

- First launch offline, unsupported OS, expired session, underage user, account locked, blocked region, language/currency mismatch, or user denies all optional permissions.
- Address is invalid, apartment missing, gated community inaccessible, hospital/school/business policy restricted, hotel room unclear, unsafe dropoff, outside delivery zone, or location provider inaccurate.
- Merchant is closed, paused, too busy, menu hours stale, item out of stock, modifier unavailable, pickup only, alcohol unavailable, membership ineligible, or prices differ by delivery/pickup.
- Search results have stale ETA, stale fees, duplicate merchant, missing tax, unavailable promo, region-restricted item, inaccessible merchant details, fake listing, or legal category warning.
- Cart includes required modifier missing, mutually exclusive options, duplicate selections, delivery/pickup price mismatch, invalid special instructions, scheduled time outside hours, quote expiry, or min subtotal failure.
- Checkout starts after merchant closes, payment fails, promo expires, membership benefit is unavailable, tax provider is unavailable, tip edit races with authorization, credit is reversed, or order is duplicate-submitted.
- Alcohol user cannot provide valid ID, recipient is absent, recipient appears intoxicated, recipient is underage, courier refuses delivery, or local law blocks delivery.
- Merchant misses confirmation, updates prep time repeatedly, marks item out of stock after courier assignment, gives wrong order to courier, cancels after prep, disputes payout, or tablet goes offline.
- Courier is reassigned, route provider fails, no-contact photo upload fails, customer changes address, customer is unreachable, building access fails, or delivery is disputed after completion.
- Support receives duplicate refund attempts, abusive evidence, food-safety emergency, privacy request during active order, legal hold, chargeback, or account takeover report.

## Test Plan

- Unit tests for address validation, menu modifier validation, cart state machines, quote expiry, membership eligibility, promo rules, support reason routing, privacy-safe analytics payloads, and idempotency key generation.
- Contract tests for home/search, merchant/menu, cart validation, quote, checkout, order, tracking, support, membership, merchant order, menu management, and privacy endpoints.
- Integration tests for signup, manual address fallback, browse/search, item customization, cart edits, quote refresh, payment authorization stub, order placement, realtime status updates, support case, rating, export, and account deletion.
- Offline tests for cached home/menu/order reads, queued local drafts, blocked checkout/payment/support/privacy writes, reconnect reconciliation, stale quote warnings, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, approximate, and precise location; denied and revoked notifications; camera/photo evidence; and regulated ID capture gates.
- Marketplace tests for open/closed merchants, pickup-only merchants, fee/ETA refresh, merchant paused states, required modifiers, unavailable modifiers, min subtotal, promo expiry, and membership eligibility.
- Safety tests for food-safety reports, harassment, unsafe delivery instruction blocks, alcohol refusal, fraud hold, duplicate refund, account takeover, review abuse, and support escalation.
- Merchant tooling tests for order acceptance, prep-time edit, item unavailable, ready-for-pickup, menu version conflict, printer/device outage, cancellation reason, and dispute creation.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, map/list alternatives, fee-breakdown comprehension, and support channel access.
- Regression tests for every acceptance criterion before marking native/manual blockers resolved.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, maps, payments, merchants, menus, courier tools, support scripts, and integrations while preserving documented public workflow.
- Exact marketplace, help, legal, privacy, product, merchant, courier, accessibility, and membership URLs are listed; no search or marketplace discovery URLs remain as evidence.
- A new user can set an address, browse merchants, customize an item, create an account at checkout, place a stubbed order, and see realtime status without unsupported permissions.
- A returning user can search, reorder, apply a promo, evaluate membership benefits, recover from network failure, and confirm canonical server state after reconnect.
- Merchant menu, order acceptance, prep update, item availability, pickup readiness, cancellation, support, and dispute paths are represented in routes, data model, and tests.
- Delivery, pickup, regulated-item, support/refund, rating/review, privacy, notification, settings, export, and deletion flows are all represented in screens, API contracts, and tests.
- Every sensitive write has an idempotency key, audit event, authorization rule, privacy classification, and deletion/export behavior.
- At least 12 acceptance tests cover happy path, empty state, permission denial, offline behavior, quote refresh, checkout failure, support/refund, membership, merchant tool, regulated item, accessibility, and privacy.

## Open Questions

- Which payment, tax, map, identity, address-validation, push, fraud, customer-support, and merchant-catalog providers will supply original clone infrastructure?
- Which Uber Eats regions and categories should the V1 emulate first: restaurant only, restaurant plus grocery/convenience, pickup only, or regulated categories behind feature flags?
- Which merchant tools are in scope for V1 versus simulated admin fixtures: menu management, order tablet, prep-time edits, cancellation disputes, promotions, and ads?
- What legal/compliance review is required before alcohol, OTC medicine, age-restricted retail, tips, courier messaging, refunds, and membership renewal flows can ship?
- Which hands-on native flows can be verified with lawful test accounts/devices, and which must remain blocked because of account, region, payment, merchant, or regulated-item constraints?

## Next Steps

- Capture lawful iOS and Android hands-on notes for signup, address setup, menu customization, cart quote, checkout, tracking, support, membership, account deletion, and notification behavior.
- Decide V1 scope for restaurants only versus broader local-commerce categories and document feature flags for regulated items, merchant tools, and courier simulator.
- Produce downstream route map, component map, API schema, seed merchant catalog, and acceptance test checklist from this public-source V1 spec.
- Keep manual blockers unresolved until evidence from test devices/accounts is added with date, platform, region, and account conditions.
