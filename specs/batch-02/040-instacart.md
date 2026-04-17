# Instacart-Style Clone Spec

> Metadata
> - Inspiration app: Instacart
> - Category: grocery, retail, alcohol, pickup, delivery, shopper, and retailer marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Instacart Help pages, Instacart legal/privacy pages, Instacart+ pages, SNAP/EBT and alcohol public pages, retailer/company pages, shopper public pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, address validation, live retailer availability, catalog item availability, replacement preferences, cart quote refresh, delivery-window selection, payment authorization, tipping, promo/credit behavior, Instacart+ enrollment/cancellation, SNAP/EBT checkout, alcohol checkout and ID handoff, live shopper tracking, shopper/customer messaging, support refund paths, retailer tools, push payloads, pickup handoff, account deletion, and regional regulated-item availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, retailer data, catalogs, item photos, ratings, reviews, maps, routing, pricing engines, payment providers, benefit-card providers, fraud/risk systems, support scripts, retailer tools, shopper tools, and regulated-item workflows.

## Overview

Build an original grocery and retail marketplace inspired by Instacart's public workflow: address-based store selection, grocery and retail catalog search, item detail, replacement preferences, cart building, delivery or pickup window selection, transparent fees/taxes/tips/promos, Instacart+-style membership benefits, shopper assignment and communication, order status, refunds/credits, reorder, privacy controls, SNAP/EBT, and regulated-item safeguards.

The clone must not copy Instacart branding, screenshots, marketing copy, protected UI artwork, retailer inventory, catalog photos, ratings/reviews, recommendation systems, private APIs, pricing/risk models, shopper dispatch logic, retailer tooling, or support content. Functional parity should be expressed through original product language, licensed maps and payments, synthetic or licensed retailer catalogs, independently designed ranking/quote/risk logic, and jurisdiction-aware compliance.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first grocery and retail delivery/pickup marketplace with address setup, store discovery, catalog search, aisle/category browsing, item detail, replacement preferences, cart, checkout, delivery-window selection, order tracking, reorder, support, and privacy controls.
- Support a V1 shopper and retailer operations model for item picking, out-of-stock replacement/refund decisions, shopper/customer messaging, pickup staging, order issue reporting, retailer catalog availability, and support escalation.
- Preserve marketplace trust expectations around price transparency, item availability, substitutions, temperature-sensitive goods, alcohol age verification, SNAP/EBT eligibility, payments, refunds, promotions, tipping, fraud prevention, shopper/customer/retailer safety, and support escalation.
- Expose privacy controls for profile data, delivery addresses, precise/coarse location, order history, payment methods, benefit-card links, support content, ad personalization, data access/export, account deletion, and legal-retention caveats.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Instacart-branded app or imply affiliation with Instacart, Instacart+, partner retailers, shoppers, benefit-card processors, payment providers, or map providers.
- Do not scrape Instacart, reuse private Instacart APIs, replay network traffic, copy retailer catalogs, copy item photos, copy reviews, clone proprietary search/ranking/dispatch/risk systems, or reproduce Instacart policy/support copy.
- Do not process production payments, SNAP/EBT benefits, alcohol sales, refunds, chargebacks, tips, shopper payouts, identity documents, food-safety reports, or emergency support without separate legal, compliance, trust/safety, and payment-provider review.
- Do not publish retailer tooling, shopper handoff flows, alcohol checkout, health-adjacent retail products, promos/credits, support/dispute surfaces, customer/shopper messaging, or delivery proof workflows without abuse prevention, privacy review, audit logging, and escalation paths.
- Do not claim exact App Store, Play Store, native-device, checkout, fee, Instacart+, SNAP/EBT, alcohol, support/refund, substitution, order tracking, shopper app, retailer tools, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/instacart-grocery-delivery/id545599256 | Official iOS listing, grocery delivery positioning, public feature framing, release notes, privacy labels, age rating, support/developer links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.instacart.client | Official Android listing, package id, delivery/pickup/search/order claims, data-safety orientation, ratings/download scale | Verified 2026-04-17 |
| Instacart Marketplace | https://www.instacart.com/ | Public consumer marketplace entrypoint for address-based grocery/retail discovery, store selection, catalog search, delivery/pickup mode, cart context, and order entry | Verified 2026-04-17 |
| Instacart Help Center | https://www.instacart.com/help | Canonical consumer support entrypoint for orders, accounts, payments, refunds, replacements, delivery, pickup, membership, privacy, and issue routing | Verified 2026-04-17 |
| Instacart+ | https://www.instacart.com/instacart-plus | Membership benefit framing, eligible orders, plan positioning, discounts/credits where available, and entitlement context | Verified 2026-04-17 |
| SNAP/EBT | https://www.instacart.com/ebt-snap | Public SNAP/EBT positioning for eligible stores/items, benefit-card setup, mixed payment, and program availability | Verified 2026-04-17 |
| Alcohol Delivery | https://www.instacart.com/alcohol | Public regulated-delivery framing for alcohol availability, age requirements, local law, and handoff expectations | Verified 2026-04-17 |
| Retailers | https://www.instacart.com/company/retailers | Retailer marketplace participation, fulfillment, technology, catalog, and partnership context | Verified 2026-04-17 |
| Instacart Platform | https://www.instacart.com/company/platform | Public platform orientation for retailers, fulfillment, ads, data/technology services, and marketplace operations | Verified 2026-04-17 |
| Instacart Ads | https://www.instacart.com/company/advertising | Sponsored/product advertising context, retailer/brand monetization, and measurement considerations | Verified 2026-04-17 |
| Instacart Shopper | https://shoppers.instacart.com/ | Shopper-side public positioning for shopper work, app-based picking/delivery, requirements, and fulfillment context | Verified 2026-04-17 |
| Instacart Privacy Policy | https://www.instacart.com/company/privacy | Collection, use, sharing, retention, rights, ads, location, account, order, benefit-card, shopper, and support privacy orientation | Verified 2026-04-17 |
| Instacart Terms | https://www.instacart.com/terms | Public legal contract for platform use, orders, payments, disputes, user content, account obligations, membership, and arbitration | Verified 2026-04-17 |
| Instacart Accessibility | https://www.instacart.com/accessibility | Public accessibility commitment, support channels, and inclusive product expectations | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public mobile listings and Instacart marketplace pages position the product as a grocery and retail marketplace anchored on delivery address, pickup location, retailer selection, catalog search, and scheduled fulfillment.
- Home must expose address entry, permission-based location, manual address fallback, nearby stores, retailer categories, pickup/delivery mode, recent orders, promotions, membership eligibility, search, and unavailable-region states.
- Store discovery must support grocery, club, pharmacy, convenience, alcohol, retail, pet, beauty, pickup, delivery, membership-eligible, SNAP/EBT-eligible, open-now, delivery-window, and unavailable-reason filtering without copying Instacart ranking logic.
- Store detail must support retailer metadata, open/closed state, delivery/pickup availability, available windows, fees, minimum subtotal, membership eligibility, promo badges, item category navigation, and legal/regulatory notices.
- Catalog browse/search must support departments, aisles, dietary attributes, brand, size, unit pricing, sale state, sponsored placement, retailer availability, item limits, SNAP/EBT eligibility, alcohol flags, and replacement preferences.
- Item detail must support quantity, weight/produce handling, unit price, per-pound estimates, substitutions, replacement/refund preference, item notes where allowed, allergens/disclaimers, age/regulatory flags, inventory uncertainty, and media alt text.
- Cart must maintain retailer grouping, item quantity/weight, replacement choices, unavailable-item fallback, delivery or pickup mode, selected delivery window, promo/credit state, membership benefit snapshot, SNAP/EBT applied amount, tip, delivery instructions, and recalculated quote snapshots.
- Checkout must display subtotal, item prices, bags/deposits where configured, delivery fee, service fee, taxes/estimated taxes, regulatory fees, membership savings, promos/credits, SNAP/EBT amount, tip, total, payment method, quote expiry, and final confirmation.
- Price, tax, fee, delivery-window, retailer availability, item availability, replacement eligibility, membership benefit, SNAP/EBT eligibility, and promotion state must refresh before order placement and show clear recovery paths when the quote changes.
- Instacart+-style membership must support trial, monthly, annual, partner/complimentary, active, canceled, expired, unavailable, and missing-benefit states with eligible store indicators, checkout savings display, cancellation path, and support escalation.
- SNAP/EBT must support benefit-card setup, eligible retailer discovery, item-level eligibility, cart-level eligible amount, manual benefit amount adjustment, mixed eligible/ineligible carts, alternate payment for fees/taxes/tips/ineligible items, and provider errors.
- Alcohol and regulated categories must be gated by legal region, age, ID check, recipient presence, valid government ID, physical handoff, refusal conditions, shopper eligibility, and audit logs.
- Pickup must support store pickup order placement, retailer acceptance, item picking/staging, ready-time estimate, ready notification, handoff checklist, substitutions before pickup, and pickup-specific issue reporting.
- Delivery tracking must model placed, retailer/shopping started, shopper assigned, shopping, replacement requested, checkout at store, en route, arriving, delivered, canceled, delayed, and support-needed states with realtime reconciliation.
- Shopper/customer communication must use masked phone or in-app messaging, preserve replacement decisions, minimize address exposure until fulfillment requires it, preserve support handoff, and block harassment, unsafe instructions, and off-platform payment requests.
- Retailer operations must support catalog availability, price/stock feed staleness, substitutions, refunds/replacements where allowed, order picking state, pickup staging, shopper handoff, support cases, and cancellation reasons.
- Customer support must handle missing/incorrect items, poor-quality perishables, late orders, canceled orders, wrong address, payment issue, membership charge, promo failure, refund/credit request, shopper safety issue, retailer issue, alcohol refusal, SNAP/EBT issue, and account/privacy requests.
- Ratings and reviews must be eligible only after order completion, separate item/retailer quality from shopper/delivery experience where useful, prevent fake/abusive/private-content reviews, and allow support/moderation review.
- Account settings must expose profile, addresses, payment methods, benefit cards, membership, notifications, privacy, ad personalization, order history, help, accessibility, terms, data access/export, account deletion, and emergency/support links.

### Manual Verification Required

- Native iOS and Android navigation, marketplace modules, store pages, catalog item detail, screen copy, privacy-label details, release-note behavior, push payloads, and accessibility behavior.
- Signup/login, phone/email verification, saved address validation, payment method add/remove, SNAP/EBT card setup, promo redemption, membership enrollment/cancellation, account deletion, and data access/export.
- Live store availability, delivery-window selection, item availability, replacement preference UX, cart quote refresh, checkout authorization, tipping, cancellation eligibility, refund/credit routing, support chat, and rating eligibility.
- Shopper assignment, replacement messaging, live status tracking, masked calls/messages, no-contact delivery proof, alcohol ID handoff, pickup handoff, and retailer tool states.

### Build Plan

- Phase A: implement auth shell, address/location setup, store discovery, catalog search, department browsing, item detail, replacement preferences, cart validation, settings, privacy links, and synthetic retailer seed data.
- Phase B: add quote service, delivery-window service, checkout session, tokenized payment stub, SNAP/EBT simulation, order placement, order history, realtime status events, pickup flow, notification preferences, and support case creation.
- Phase C: add membership benefits, promotions/credits, shopper assignment simulator, replacement messaging, retailer catalog/order manager, masked contact, ratings/reviews, fraud holds, refund/credit review, and privacy export/delete workflows.
- Phase D: add regulated-category feature flags, alcohol handoff audit, retailer platform integrations, sponsored item controls, accessibility audits, payment/tax/provider integration, observability, and manual verification evidence capture.

## Core User Journeys

- New customer installs the app, grants or denies location, enters an address manually if needed, browses nearby grocery stores, opens a retailer, searches for items, picks replacement preferences, creates an account at checkout, schedules delivery, places a stubbed order, tracks it in real time, and rates the experience.
- Returning customer opens personalized home, searches across stores, compares delivery windows and fees, reorders a previous cart, applies a promo, adjusts tip, and confirms the quote before payment authorization.
- SNAP/EBT customer adds a benefit card, finds participating retailers, adds eligible and ineligible items, adjusts the benefit amount, pays remaining charges with another method, and handles refunds according to provider rules.
- Alcohol customer enters an eligible region, adds age-restricted items, confirms recipient requirements, receives reminders to meet the shopper with valid ID, passes handoff verification, or receives a refusal/cancellation state if legal requirements are not met.
- Pickup customer chooses pickup, receives item-picking and replacement updates, approves changes, sees ready-for-pickup notification, completes handoff, reports a missing or damaged item, and receives support resolution without a delivery lifecycle.
- Customer experiences out-of-stock items, receives replacement options, approves, declines, or requests refund, and sees cart/order totals updated before final settlement.
- Customer experiences a delayed delivery, opens order status, contacts the shopper through a masked channel, escalates to support, receives credit/refund decision, and sees the decision in order history.
- Shopper receives a live order, starts shopping, scans/marks items, asks about replacements, checks out with approved payment rails, stages pickup or starts delivery, completes handoff, and follows regulated-item refusal rules when required.
- Retailer updates catalog availability, sale pricing, pickup capacity, delivery-window capacity, and order issue reason codes; customer-facing carts refresh when affected data changes.
- Member manages trial or paid benefits, sees eligible stores and checkout savings, cancels renewal, and retains or loses benefits according to the documented entitlement state.
- Privacy-focused user updates account details, requests data access/export, opts out of ad personalization where supported, deletes the account after verification, and sees retention/legal-hold caveats for order, payment, benefit-card, regulated-item, shopper, and support records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, terms, privacy, and permission education | sign in, create account, continue, legal links | new, returning, signed-out, blocked region | auth failure, unsupported OS, underage, account locked |
| Address/Location Setup | Delivery availability and fulfillment anchor | GPS, address search, apartment, instructions | precise, approximate, manual, saved | denied permission, invalid address, outside service area |
| Store Discovery Home | Discovery across grocery, retail, alcohol, pickup, and delivery | category, search, promo, reorder, address | personalized, signed-out, loading, empty | no stores, stale personalization, location mismatch |
| Store Search And Filters | Find retailers/items and narrow marketplace results | query, category, fees, window, membership, SNAP | results, no results, corrected query | restricted category, closed stores, provider outage |
| Store Detail | Retailer page, departments, fees, windows, and trust summary | department, item tap, favorite, share, mode | open, closed, scheduled, pickup | paused store, stale fee, unavailable retailer, region block |
| Catalog Item Detail | Configure item, quantity, weight, and replacement preference | quantity, notes, replacement, add | valid, estimated, edited, added | out of stock, price changed, weight estimate variance |
| Cart | Durable grocery order draft and quote context | edit item, replacement, promo, mode, window, tip | valid, needs refresh, SNAP mixed | invalid item, expired quote, min not met, benefit-card issue |
| Delivery Window | Select scheduled delivery or pickup time | date, time, priority, pickup | available, selected, waitlisted | window sold out, retailer closed, quote expired |
| Checkout | Payment authorization and final order placement | address, payment, tip, promo, SNAP, confirm | ready, authorizing, placed, failed | payment fail, fraud hold, stale quote, store closed |
| Order Tracking | Live shopping/delivery lifecycle and recovery actions | status, map, contact, help, cancel | placed, shopping, en route, delivered | delayed, no shopper, wrong address, support escalation |
| Replacement Review | Approve, reject, or refund unavailable items | approve, reject, refund, message | pending, approved, declined | shopper unavailable, price changed, timeout |
| Pickup Status | Customer pickup progress and handoff | ETA, ready notification, directions, help | accepted, picking, staged, picked up | late staging, wrong order, retailer closed |
| Membership | Instacart+-style plan, benefits, eligibility, cancellation | plan, payment, cancel, manage | trial, active, partner, canceled | ineligible, payment fail, benefit missing, renewal dispute |
| SNAP/EBT Wallet | Benefit-card setup and eligible-store education | card, zip, payment split, help | added, verified, pending, removed | provider down, unsupported store, ineligible item |
| Alcohol Verification | Regulated-item checkout and handoff gate | ID, age, recipient, consent | verified, pending, handoff required | expired ID, underage, intoxication, refused delivery |
| Messages/Contact | Customer, shopper, retailer, and support communication | masked call, message, attachment, report | connected, sent, failed, escalated | harassment, blocked user, unsafe instruction, moderation |
| Order Issue/Support | Refund, credit, missing item, quality, safety, and help flows | issue type, evidence, chat, call | submitted, reviewing, resolved, denied | duplicate claim, legal hold, emergency, abuse pattern |
| Ratings/Reviews | Post-order feedback and reputation signals | rating, tags, text, report | eligible, submitted, published | expired, abusive content, fraud review, private data |
| Shopper Fulfillment | Shopping, replacement, checkout, delivery, and handoff | scan, replace, message, stage, deliver | assigned, shopping, staged, delivered | unavailable item, checkout issue, refused alcohol |
| Retailer Catalog/Order Tools | Retailer availability, orders, pickup capacity, and issue states | item, stock, price, window, order | synced, paused, staged | feed stale, conflict, order canceled, provider outage |
| Settings/Privacy | Account, addresses, payments, notifications, data rights | toggles, export, delete, legal links | signed-in, signed-out, verified | active order block, retention caveat, 2FA fail |

## Data Model

- `User`: account identity, locale, age/consent, phone/email verification, saved addresses, notification preferences, privacy settings, membership state, benefit-card wallet links, support restrictions, export/delete lifecycle, and fraud/risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, ad personalization status, offline cache version, and last active state.
- `Address`: geocoded delivery location, apartment/unit, dropoff instructions, precise/coarse coordinates, delivery zone, regulated-item eligibility, and shopper visibility rules.
- `Retailer`: store identity, category, location, hours, status, delivery/pickup modes, membership eligibility, SNAP/EBT support, fee settings, rating summary, support contacts, and operational restrictions.
- `Catalog`: departments, aisles, sort order, availability windows, pickup/delivery rules, sponsored placement metadata, and version for conflict detection.
- `CatalogItem`: title, brand, description, media metadata, size, unit price, estimated weight, nutrition/allergen/disclaimer fields, age/regulatory flags, SNAP eligibility, stock confidence, and replacement policy.
- `ReplacementPreference`: customer-selected replacement item, refund instruction, shopper message, approval status, price delta, timeout, and audit trail.
- `Cart`: retailer, items, quantities, weights, replacements, delivery/pickup mode, delivery window, address, instructions, promo codes, membership benefit snapshot, SNAP/EBT applied amount, tip, quote id, and validation errors.
- `DeliveryWindow`: retailer, mode, start/end time, capacity, fee/speed tier, reservation expiry, and unavailable reason.
- `PriceQuote`: subtotal, estimated final amount, delivery fee, service fee, bag/deposit fees, taxes, regulatory fees, promo/credit, membership savings, SNAP eligible amount, tip, total, quote expiry, region, and line-item explainability.
- `PaymentMethod`: tokenized card/wallet/SNAP representation, billing region, verification state, SCA/3DS state where relevant, provider status, and deletion constraints.
- `Order`: customer, retailer, cart snapshot, quote snapshot, payment state, mode, status, replacement decisions, cancellation/refund state, support cases, rating eligibility, and audit ids.
- `Fulfillment`: shopping, pickup, or delivery lifecycle; shopper assignment; pickup ETA; dropoff ETA; route provider reference; handoff type; proof metadata; regulated-item status; and failed handoff reason.
- `ShopperProfile`: public first name/initial, masked contact, vehicle where relevant, alcohol eligibility, assignment state, safety restrictions, and handoff audit metadata.
- `Membership`: plan, trial, renewal date, payment source, country, eligible benefits, cancellation, expiration, partner entitlement, and dispute state.
- `BenefitProgramCard`: SNAP/EBT token, verification state, region, eligible retailer/item rules, applied amount, provider errors, and sensitive-data retention constraints.
- `PromotionCredit`: campaign, redemption rules, retailer/category eligibility, min subtotal, expiration, stackability, fraud checks, and audit events.
- `SupportCase`: issue type, order/item, evidence, requester role, refund/credit decision, safety escalation, SLA, appeal, legal hold, and owner queue.
- `RetailerIssue`: stale feed, unavailable item, wrong item, pickup staging failure, price mismatch, cancellation reason, dispute window, decision, and communication state.
- `Review`: order link, retailer/item/shopper/delivery dimensions, rating, tags, text, moderation state, report, removal decision, and publication timing.
- `AuditEvent`: append-only record for auth, address, pricing, cart, checkout, payment, SNAP/EBT, regulated delivery, support, refunds, retailer changes, privacy, and safety-sensitive actions.
- `LocalCacheRecord`: cached retailers, catalogs, carts, order statuses, message drafts, settings, quote freshness, sync attempts, conflict markers, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with age, region, verification, deletion, fraud, and device gates.
- `GET /home?addressId=&lat=&lng=`, `GET /stores?filters=&cursor=`, `GET /search?query=&retailerId=&filters=&cursor=`: store and catalog discovery with category modules, retailer cards, item cards, window/fee snippets, personalization status, eligibility badges, pagination, and stale-data indicators.
- `GET /retailers/:id`, `GET /retailers/:id/catalog`, `GET /retailers/:id/status`, `GET /retailers/:id/windows`: store detail, catalog version, hours, delivery/pickup modes, fees, windows, availability, membership/SNAP/regulatory flags, and status reason codes.
- `POST /carts`, `PATCH /carts/:id`, `POST /carts/:id/validate`: cart creation and validation with quantity/weight rules, replacement preferences, stock confidence, address eligibility, min subtotal, promo validation, SNAP split, delivery-window reservation, and quote refresh requirement.
- `POST /quotes`, `GET /quotes/:id`: price quote generation with fee/tax/credit/tip line items, membership savings, SNAP eligible amount, quote expiry, jurisdiction display flags, weight-estimate variance, and price-change warnings.
- `POST /checkout/session`, `POST /orders`, `POST /payments/webhooks`: payment authorization, idempotency, order placement, duplicate webhook handling, failure recovery, credit/refund hooks, benefit-card provider states, and server-owned status.
- `GET /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`, `POST /orders/:id/reorder`: order history, live status, cancellation eligibility, reorder validation, unavailable item recovery, and support affordances.
- `GET /orders/:id/tracking`, `GET /fulfillments/:id/events`: status events with stable ids, shopper assignment, replacement prompts, ETA updates, proof metadata, regulated handoff state, and reconciliation after reconnect.
- `POST /orders/:id/replacements`, `PATCH /orders/:id/replacements/:replacementId`: approve, reject, refund, or message about unavailable items with timeout, price delta, and audit events.
- `POST /orders/:id/contact`, `POST /message-threads/:id/messages`: masked customer/shopper/retailer/support contact with fulfillment context, moderation, unsafe-instruction blocks, and retention policy.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/appeal`: missing item, poor quality, late order, refund, membership, payment, SNAP, alcohol, safety, account, and privacy cases.
- `GET /membership`, `POST /membership/subscribe`, `POST /membership/cancel`, `GET /membership/benefits`: membership lifecycle, trials, renewal billing, cancellation, partner eligibility, retailer eligibility, and checkout savings.
- `POST /benefit-cards/snap-ebt`, `GET /benefit-cards`, `DELETE /benefit-cards/:id`, `POST /snap/eligibility`: SNAP/EBT tokenization, provider status, item/store eligibility, applied amount, and alternate-payment requirements.
- `POST /regulated/alcohol/verify`, `POST /fulfillments/:id/regulated-handoff`: age verification, ID check, recipient match, shopper verification, refusal reason, region rules, and audit logging.
- `GET /promotions`, `POST /promotions/redeem`, `DELETE /promotions/:id`: promo discovery, redemption, stackability, expiration, fraud checks, and quote integration.
- `POST /ratings`, `GET /ratings/:retailerId`, `POST /reviews/:id/report`: post-order rating eligibility, moderation, report/removal flow, and separation of retailer/item/shopper feedback.
- `GET /shopper/orders`, `PATCH /shopper/orders/:id`, `POST /shopper/orders/:id/items/:itemId/issue`: shopper picking, replacement request, checkout, staging, delivery, and handoff updates.
- `GET /retailer/catalog`, `PATCH /retailer/catalog/:id`, `PATCH /retailer/windows/:id`, `GET /retailer/orders`: retailer catalog, item, stock, pricing, delivery-window capacity, pickup staging, and order status sync.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, security checks, irreversible deletion warnings, active-order constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Order, payment, retailer confirmation, shopper assignment, item unavailable, replacement prompt, checkout-at-store, ETA, pickup-ready, delivery, cancellation, refund, support, regulated handoff, and retailer issue changes must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache home modules, recent retailers, catalog summaries, full catalogs opened in the session, cart drafts, replacement choices, saved addresses, membership status, order history, and in-progress order status; cached data must expose freshness and never hide quote or availability expiry.
- Offline mode may show cached retailers/catalogs/order history and preserve local cart drafts, but checkout, payment, SNAP/EBT application, regulated verification, shopper replacement approval, cancellation, refund, support escalation, account deletion, and safety reports require server confirmation.
- Low-risk local drafts such as search filters, item notes, replacement preferences, cart edits, support evidence drafts, and rating drafts may queue with retry metadata; money movement, benefit-card actions, regulated items, privacy actions, and retailer operational writes must block while offline.
- Price quotes, estimated weights, tax calculations, delivery fees, delivery-window reservations, retailer availability, item availability, membership benefits, SNAP eligibility, alcohol eligibility, and ETA must expire and refresh before checkout confirmation.
- Realtime tracking must handle duplicate events, missed events, shopper reassignment, route provider outage, retailer delay, customer address edits, no-contact proof upload, replacement timeout, failed handoff, and canceled order while offline.
- Shopper and retailer tools must tolerate device disconnect, duplicate notifications, stale catalog feeds, simultaneous edits, delivery-window capacity conflicts, and conflict recovery through version checks.
- Push notifications must be opt-in, category-controlled, and content-minimized for order status, shopper messages, replacement approvals, pickup ready, support decision, refund, membership renewal, promo, account security, and regulated-item reminders.

## Permissions, Privacy, And Safety

- Location, notifications, camera/photos/files for support evidence or regulated ID capture, contacts only if a future sharing feature requires it, and biometric/device authentication must be requested only when the user invokes a related feature.
- Default analytics must exclude precise addresses, raw delivery instructions, payment credentials, SNAP/EBT numbers, ID images, support evidence, private messages, phone numbers, and exact shopper/customer location trails.
- Location UX must distinguish no location, approximate location, precise location, manually entered address, OS-revoked permission, region-blocked category, and unsupported delivery zone with usable pickup/search fallback.
- SNAP/EBT data must be tokenized through approved providers, scoped to eligible items and participating retailers, and prevented from paying fees, taxes, tips, or ineligible items unless program rules allow otherwise.
- Regulated-item data must be purpose-limited, encrypted, access-controlled, redacted from logs, retained only under documented policy/legal constraints, and auditable for every verification and refusal decision.
- Retailers, customers, and shoppers must be blocked from moving payments, required support communication, refunds, reviews, or regulated-item delivery off-platform unless a policy-reviewed exception exists.
- Food safety controls must cover temperature-sensitive items, produce quality, missing/tampered items, allergens/disclaimers, item substitutions, wrong-order handoff, photo/evidence upload, and escalation to support.
- Regulated categories must cover alcohol, OTC medicine, age-restricted products, SNAP/EBT, HSA/FSA-eligible items, and region-specific product bans with legal configuration and checkout guards.
- Shopper/customer safety must cover no-contact delivery, unsafe dropoff, harassment, threats, weapons, intoxication, underage recipient, blocked user, emergency escalation, and masked contact.
- Payment, refund, credit, promo, tip, chargeback, membership renewal, SNAP split payment, and cross-currency behavior must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- Reviews and ratings must include authenticity checks, anti-coercion rules, eligibility windows, policy moderation, report/removal flows, and appeal handling.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, clear fee breakdowns, and accessible support channels.
- Launch owners: marketplace trust owner for fraud/risk, legal/compliance owner for regulated items and terms, payments owner for checkout/refunds/tips, safety owner for food/alcohol/shopper incidents, privacy owner for data rights, accessibility owner for inclusive shopping, and retailer operations owner for catalog/window workflows.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, address added, permission state changed, home viewed, store opened, search performed, filter applied, item viewed, item added, replacement selected, cart validated, delivery window selected, quote refreshed, checkout started, order placed, order tracked, support opened, reorder started, rating submitted, data export requested, account deletion requested.
- Marketplace quality metrics must use object ids, reason codes, latency, provider status, quote freshness, catalog freshness, delivery-window availability, ETA confidence, and failure codes rather than raw addresses, payment credentials, SNAP/EBT numbers, ID images, or support evidence.
- Search/ranking diagnostics must separate organic ranking, personalization, availability, delivery window, fee, promo, sponsored placement, membership, SNAP, alcohol, and legal-region logic, with opt-out and retention behavior reviewed for privacy.
- Payment analytics must capture checkout funnel and failure categories using tokenized payment references, not card or benefit-card details; refund analytics must hide private support evidence and retailer issue details.
- Trust/safety analytics must track report categories, moderation states, regulated refusal reasons, poor-quality item issue types, fraud/risk signals, appeal outcomes, SLA, and repeat-offender status without exposing private evidence to product analytics.
- Monetization can include original service fees, delivery fees, subscription membership, retailer promotion tools, pickup ordering, retail partnerships, ads/sponsored listings, convenience stores, or premium retailer analytics later, but pricing, names, fee rates, protection claims, and promotional copy must be original and legal-reviewed.
- Fee display must be transparent before confirmation, configurable by jurisdiction, testable in checkout, and explicit about what is collected by platform, retailer, shopper/tip, provider, or tax authority.
- Retailer-side monetization must show commission/rate effects, promo spend, refund/error charges, cancellation implications, pickup fee differences, sponsored placement, and attribution without copying Instacart retailer pricing.

## Edge Cases

- First launch offline, unsupported OS, expired session, underage user, account locked, blocked region, language/currency mismatch, or user denies all optional permissions.
- Address is invalid, apartment missing, gated community inaccessible, hospital/school/business policy restricted, hotel room unclear, unsafe dropoff, outside delivery zone, or location provider inaccurate.
- Retailer is closed, pickup only, delivery only, too busy, catalog feed stale, item out of stock, produce unavailable, alcohol unavailable, SNAP unsupported, membership ineligible, or prices differ by in-store/delivery/pickup channel.
- Search results have stale delivery windows, stale fees, duplicate retailer, missing tax, unavailable promo, region-restricted item, inaccessible item details, fake listing, sponsored placement conflict, or legal category warning.
- Cart includes weighted items, unavailable replacements, duplicate items, delivery/pickup price mismatch, invalid special instructions, sold-out delivery window, quote expiry, min subtotal failure, or mixed SNAP/ineligible items.
- Checkout starts after retailer closes, payment fails, SNAP provider is down, promo expires, membership benefit is unavailable, tax provider is unavailable, tip edit races with authorization, credit is reversed, or order is duplicate-submitted.
- Shopper cannot find item, replacement is rejected, customer does not respond, price changes, produce quality is poor, item limit applies, checkout at store fails, or settlement differs from estimate.
- Alcohol user cannot provide valid ID, recipient is absent, recipient appears intoxicated, recipient is underage, shopper refuses delivery, or local law blocks delivery.
- Retailer misses fulfillment update, delivery-window capacity changes, catalog feed goes stale, pickup staging fails, wrong order is handed off, or retailer disputes an issue.
- Support receives duplicate refund attempts, abusive evidence, food-safety emergency, privacy request during active order, legal hold, chargeback, account takeover report, or benefit-card dispute.

## Test Plan

- Unit tests for address validation, catalog item validation, weighted item estimates, replacement preference state machines, delivery-window reservation, cart validation, quote expiry, membership eligibility, SNAP eligibility, promo rules, support routing, privacy-safe analytics payloads, and idempotency key generation.
- Contract tests for home/stores, catalog search, retailer detail, delivery windows, item detail, cart validation, quote, checkout, order, tracking, replacements, support, membership, SNAP/EBT, shopper, retailer, and privacy endpoints.
- Integration tests for signup, manual address fallback, store search, item add, replacement selection, cart edits, window selection, quote refresh, payment authorization stub, SNAP split payment stub, order placement, realtime status updates, support case, rating, export, and account deletion.
- Offline tests for cached home/catalog/order reads, queued local drafts, blocked checkout/payment/support/privacy writes, reconnect reconciliation, stale quote warnings, delivery-window expiry, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, approximate, and precise location; denied and revoked notifications; camera/photo evidence; and regulated ID capture gates.
- Marketplace tests for open/closed retailers, pickup-only stores, delivery-window capacity, fee/ETA refresh, required replacements, unavailable items, min subtotal, promo expiry, membership eligibility, and SNAP eligibility.
- Safety tests for poor-quality perishable reports, harassment, unsafe delivery instruction blocks, alcohol refusal, fraud hold, duplicate refund, account takeover, review abuse, and support escalation.
- Shopper/retailer tooling tests for assignment, item unavailable, replacement request, checkout-at-store, pickup staging, delivery handoff, catalog version conflict, delivery-window capacity conflict, cancellation reason, and issue creation.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, map/list alternatives, fee-breakdown comprehension, replacement prompts, and support channel access.
- Regression tests for every acceptance criterion before marking native/manual blockers resolved.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, maps, payments, retailers, catalogs, shopper tools, support scripts, and integrations while preserving documented public workflow.
- Exact marketplace, help, legal, privacy, product, retailer, shopper, accessibility, membership, SNAP/EBT, and alcohol URLs are listed; no search or marketplace discovery URLs remain as evidence.
- A new user can set an address, choose a store, search catalog items, choose replacements, create an account at checkout, reserve a delivery window, place a stubbed order, and see realtime status without unsupported permissions.
- A returning user can search, reorder, apply a promo, evaluate membership benefits, recover from network failure, and confirm canonical server state after reconnect.
- Shopper replacement, item unavailable, delivery-window, retailer catalog, pickup readiness, cancellation, support, and dispute paths are represented in routes, data model, and tests.
- Delivery, pickup, SNAP/EBT, regulated-item, support/refund, rating/review, privacy, notification, settings, export, and deletion flows are all represented in screens, API contracts, and tests.
- Every sensitive write has an idempotency key, audit event, authorization rule, privacy classification, and deletion/export behavior.
- At least 12 acceptance tests cover happy path, empty state, permission denial, offline behavior, quote refresh, delivery-window expiry, checkout failure, replacement workflow, support/refund, membership, SNAP/EBT, regulated item, accessibility, and privacy.

## Open Questions

- Which payment, tax, map, address-validation, push, fraud, customer-support, retailer-catalog, benefit-card, and shopper-simulator providers will supply original clone infrastructure?
- Which Instacart regions and categories should the V1 emulate first: grocery only, grocery plus retail, pickup only, or regulated/SNAP categories behind feature flags?
- Which retailer and shopper tools are in scope for V1 versus simulated admin fixtures: catalog feed, delivery-window capacity, item picking, replacement messaging, pickup staging, and issue resolution?
- What legal/compliance review is required before SNAP/EBT, alcohol, OTC medicine, tips, shopper messaging, refunds, and membership renewal flows can ship?
- Which hands-on native flows can be verified with lawful test accounts/devices, and which must remain blocked because of account, region, payment, retailer, shopper, benefit-card, or regulated-item constraints?

## Next Steps

- Capture lawful iOS and Android hands-on notes for signup, address setup, store selection, item detail, replacements, cart quote, delivery windows, checkout, tracking, support, membership, SNAP/EBT, account deletion, and notification behavior.
- Decide V1 scope for grocery only versus broader grocery/retail categories and document feature flags for SNAP/EBT, alcohol, retailer tools, and shopper simulator.
- Produce downstream route map, component map, API schema, seed retailer catalog, and acceptance test checklist from this public-source V1 spec.
- Keep manual blockers unresolved until evidence from test devices/accounts is added with date, platform, region, and account conditions.
