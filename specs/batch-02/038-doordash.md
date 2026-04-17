# DoorDash-Style Clone Spec

> Metadata
> - Inspiration app: DoorDash
> - Category: Food, grocery, convenience, retail, alcohol, pickup, and local delivery marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, DoorDash product pages, DoorDash Help/legal/privacy pages, Dasher Central pages, Merchant Learning Center pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, address validation, live merchant availability, menu item customization, cart quote refresh, payment authorization, tipping, promo/credit behavior, DashPass enrollment/cancellation, SNAP/EBT checkout, alcohol ID upload and handoff, live order tracking, Dasher/customer chat, support refund paths, substitutions, merchant tablet workflows, push payloads, pickup handoff, account deletion, and regional regulated-item availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, restaurant/store data, menus, item photos, ratings, reviews, maps, routing, pricing engines, payment providers, fraud/risk systems, support scripts, merchant tools, Dasher tools, and regulated-item workflows.

## Overview

Build an original mobile local-commerce marketplace inspired by DoorDash's public workflow: location-based restaurant/store discovery, personalized search, menu browsing, item modifiers, cart building, delivery or pickup checkout, transparent fees/taxes/tips/promos, DashPass-style membership benefits, real-time order status, Dasher handoff, merchant substitutions/refunds, reorder, ratings, support, privacy controls, and regulated-item safeguards.

The clone must not copy DoorDash branding, screenshots, marketing copy, protected UI artwork, merchant inventory, menu photos, ratings/reviews, recommendation systems, private APIs, fee/risk models, dispatch logic, Dasher tools, or support content. Functional parity should be expressed through original product language, licensed maps and payments, synthetic or licensed merchant catalogs, independently designed ranking/quote/risk logic, and jurisdiction-aware compliance.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first local delivery marketplace with address setup, restaurant/grocery/convenience/retail discovery, search, filters, merchant detail, menu/item customization, cart, checkout, order tracking, pickup, reorder, support, and privacy controls.
- Support a V1 merchant operations model for menu modifiers, out-of-stock handling, order acceptance, prep-time updates, refunds/replacements, pickup readiness, cancellation disputes, and masked customer/Dasher contact.
- Preserve marketplace trust expectations around price transparency, food safety, substitution consent, alcohol age verification, SNAP/EBT eligibility, payments, refunds, promotions, tipping, fraud prevention, Dasher/customer/merchant safety, and support escalation.
- Expose privacy controls for profile data, precise/coarse location, delivery addresses, order history, payment methods, SNAP/EBT and regulated-item data, support content, ad personalization, data archive, account deletion, and law-enforcement disclosure boundaries.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a DoorDash-branded app or imply affiliation with DoorDash, Caviar, DashPass, DashMart, merchants, Dashers, grocers, alcohol retailers, payment providers, benefit administrators, or map providers.
- Do not scrape DoorDash, reuse private DoorDash APIs, replay DoorDash network traffic, copy merchant menus, copy item photos, copy reviews, clone proprietary search/ranking/dispatch/risk systems, or reproduce DoorDash policy/support copy.
- Do not process production payments, SNAP/EBT benefits, alcohol sales, refunds, chargebacks, tips, merchant payouts, identity documents, food-safety reports, or emergency support without separate legal, compliance, trust/safety, and payment-provider review.
- Do not publish merchant tooling, Dasher handoff flows, alcohol/SNAP/EBT checkout, health-adjacent OTC products, promos/credits, support/dispute surfaces, or customer/merchant messaging without abuse prevention, privacy review, audit logging, and escalation paths.
- Do not claim exact App Store, Play Store, native-device, checkout, fee, DashPass, SNAP/EBT, alcohol, support/refund, substitution, order tracking, merchant tablet, Dasher app, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/doordash/id719972451 | Official iOS listing, seller, Food & Drink category, supported device notes, release notes, privacy labels, age rating, delivery/pickup/tracking/DashPass/SNAP payment claims | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.dd.doordash | Official Android listing, package id, ratings/download scale, food/grocery/convenience/retail positioning, same-day delivery/takeout claims, data-safety orientation | Verified 2026-04-17 |
| DoorDash Product Overview | https://about.doordash.com/en-us | Public product inventory for restaurants, grocery, convenience, retail, alcohol, flowers, pets, DashPass, gift cards, Package Pickup, DashMart, real-time tracking, and support paths | Verified 2026-04-17 |
| DoorDash Customer Help Center | https://help.doordash.com/consumers/s/?language=en_US | Canonical consumer support entrypoint for account, order history, help, emergency, support, terms, privacy, and platform-specific help routing | Verified 2026-04-17 |
| DashPass FAQ | https://about.doordash.com/faq/products/dashpass | Membership benefits, eligible merchant indicators, subtotal minimums, pickup credits, auto-renewal, cancellation, regional availability, pricing examples, and support path | Verified 2026-04-17 |
| Pricing Transparency | https://about.doordash.com/en-us/news/transparency-and-affordability | Public explanation of service fee, delivery fee, small-order fee, fee placement on marketplace and merchant pages, and DashPass fee treatment | Verified 2026-04-17 |
| SNAP/EBT Product Page | https://www.doordash.com/p/snap-ebt | Add EBT card, find participating stores, SNAP icon/filter, eligible-item handling, checkout SNAP amount, mixed eligible/ineligible carts, alternate payment requirement | Verified 2026-04-17 |
| SNAP/EBT Expansion | https://about.doordash.com/en-us/news/new-doordash-merchants-accept-snap | Current public SNAP/EBT expansion, merchant eligibility, access scale, grocery delivery implications, and affordability program context | Verified 2026-04-17 |
| Alcohol Delivery Page | https://www.doordash.com/p/alcohol-delivery | Alcohol category browse, 21+ requirement, location variation, checkout ID upload, delivery ID scan, refusal conditions, and secure ID handling prompt | Verified 2026-04-17 |
| Alcohol Safety Features | https://about.doordash.com/en-us/news/doordash-launches-industry-leading-safety-features-for-alcohol-delivery | Dual ID verification, Dasher scan at delivery, intoxication check, customer reminders, self-exclusion, and responsible-delivery framing | Verified 2026-04-17 |
| Dasher Alcohol Delivery | https://dasher.doordash.com/en-us/blog/how-does-alcohol-delivery-work | Dasher legal obligations, valid government ID, training/module expectations, age verification, sobriety check, delivery refusal, and handoff safety | Verified 2026-04-17 |
| Merchant Modifiers | https://merchants.doordash.com/en-us/learning-center/modifiers | Merchant menu modifier model, required/optional rules, multiple selections, pricing, pickup/delivery prices, item availability, and mobile/portal management | Verified 2026-04-17 |
| Merchant Order Adjustments | https://help.doordash.com/merchants/s/article/Marking-an-item-Out-of-Stock?language=en_US | Merchant out-of-stock workflow, replacements, refunds, added charge, prep-time adjustment, customer/Dasher contact, and support chat | Verified 2026-04-17 |
| Merchant Tablet Management | https://help.doordash.com/merchants/s/article/How-do-I-troubleshoot-my-printer?language=en_US | Store status, busy mode, automatic confirmation, order alerts, Dasher arrival alerts, order history, printer, and tablet settings | Verified 2026-04-17 |
| Merchant Canceled Orders | https://help.doordash.com/merchants/s/article/Do-I-get-paid-for-cancelled-orders?language=en_US | Canceled order states, merchant payout policy, cancellation reasons, dispute timing, prevention guidance, and order history evidence | Verified 2026-04-17 |
| Merchant Pickup | https://help.doordash.com/merchants/s/article/Accept-and-Manage-Pickup-Orders | Pickup workflow, order protocols, ready-time notifications, handoff readiness, staff tips, and pickup analytics | Verified 2026-04-17 |
| DoorDash Privacy Overview | https://about.doordash.com/en-us/privacy | Consumer privacy controls, account updates, data archive, ad personalization opt-out, account deletion, Dasher-visible customer data, and law-enforcement disclosure notes | Verified 2026-04-17 |
| Consumer Privacy Policy | https://help.doordash.com/legal/document?locale=en-US&region=US&type=dx-privacy-policy | Canonical consumer privacy legal document for collection, use, disclosure, retention, security, and rights review | Verified 2026-04-17 |
| Consumer Terms | https://help.doordash.com/legal/document?locale=en-US&region=US&type=cx-terms-and-conditions | Canonical consumer terms/legal contract for platform use, orders, payments, fees, disputes, account rules, and regional supplements | Verified 2026-04-17 |
| Accessibility | https://about.doordash.com/en-us/accessibility | WCAG 2.2 AA commitment, annual audits, accessibility training, feedback phone/email, and continuous improvement posture | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public mobile listings position DoorDash as a food, grocery, convenience, retail, pet, flower, alcohol, pickup, and same-day delivery marketplace with address-based availability, advanced scheduling, real-time tracking, no-contact delivery by request, multiple payment options, SNAP/EBT at participating merchants, and DashPass membership benefits.
- The product overview describes DoorDash as an on-demand delivery platform where customers place an order through the app or website, a Dasher picks it up from a restaurant or store, and orders can be tracked in real time.
- Home must be location-first and expose address entry, permission-based location, manual location fallback, restaurant/grocery/convenience/retail/alcohol/pickup categories, promotions, DashPass eligibility, recent orders, search, and unavailable-region states.
- Search must support merchant, cuisine, store, item, category, dietary, pickup/delivery, distance/ETA, rating, price, promo, DashPass, SNAP/EBT, alcohol, open-now, scheduled, and unavailable reason filters without copying DoorDash ranking logic.
- Merchant detail must support hero metadata, open/closed state, delivery/pickup availability, ETA, distance, delivery fee, service fee preview, minimum subtotal, DashPass indicator, promo badges, ratings/reviews summary, store hours, food safety or regulated-item notes, and menu/category navigation.
- Menu item detail must support required and optional modifier groups, multiple-selection rules, quantity, size, spice/prep choices, special instructions where allowed, image alt text, allergen/disclaimer fields, delivery/pickup price variants, item availability, and modifier stockouts.
- Cart must maintain merchant grouping, item modifiers, quantity edits, delivery or pickup mode, scheduled time, substitution preference, SNAP/EBT eligibility, promo/credit state, tip, delivery instructions, no-contact preference, and recalculated quote snapshots.
- Checkout must display subtotal, merchant item prices, delivery fee, service fee, small-order fee, taxes/estimated taxes, regulatory fees where configured, DashPass savings, promos/credits, SNAP amount, tip, total, payment method, quote expiry, and final confirmation.
- Fee display must be transparent before order placement; public DoorDash materials distinguish service fees, delivery fees, possible small-order fees, taxes, gratuity, and DashPass delivery-fee/reduced-service-fee treatment.
- DashPass-style membership must support trial, monthly, annual, student/partner, complimentary, family/shared benefit, canceled, expired, and ineligible states, with eligible merchant indicators, subtotal minimum handling, checkout savings display, and cancellation path.
- SNAP/EBT must support adding a benefit card, participating-store discovery, item-level eligibility badges, cart-level eligible amount, manual SNAP amount adjustment, mixed eligible/ineligible carts, alternate payment for fees/taxes/tips/ineligible items, and region/provider blockers.
- Alcohol and regulated items must be gated by legal region, age, ID upload, recipient presence, valid government ID, physical ID check, ID scan, intoxication refusal, self-exclusion/opt-out, customer reminders, Dasher training state, and audit logs.
- Pickup must support customer pickup order placement, merchant acceptance, ready-time estimate, ready notification, staff tip where configured, handoff checklist, wrong-order prevention, and pickup-specific issue reporting.
- Delivery tracking must model placed, merchant confirmed, preparing, Dasher assigned, Dasher en route to merchant, picked up, approaching, delivered, canceled, delayed, and support-needed states with realtime reconciliation.
- Dasher/customer communication must use masked phone or in-app messaging, minimize address exposure until needed for fulfillment, preserve support handoff, and block harassment, unsafe delivery instructions, and off-platform payment requests.
- Merchant operations must support store open/closed/busy state, order auto-confirmation, prep-time edits, item out-of-stock, substitutions, refund/replacement, added charge for allowed customization, Dasher arrival alert, printer/device health, order history, and support chat.
- Merchant cancellation and dispute workflows must represent reason codes such as did-not-confirm, staff-requested cancel, too busy, item out of stock, store closed, long fulfillment time, excessive Dasher wait, wrong order handed off, duplicate order, and merchant unresponsive.
- Customer support must handle missing/incorrect items, late orders, canceled orders, wrong address, payment issue, DashPass charge, promo failure, refund/credit request, food safety issue, Dasher safety issue, merchant issue, alcohol refusal, SNAP/EBT issue, and account/privacy request.
- Ratings and reviews must be eligible only after order completion, separate merchant food/item quality from delivery experience where useful, prevent fake/abusive/private-content reviews, and allow support/moderation review.
- Account settings must expose profile, addresses, payment methods, SNAP/EBT card, DashPass, notifications, privacy, ad personalization, order history, help, accessibility, terms, data archive, account deletion, and emergency/support links.

## Core User Journeys

- New customer installs the app, grants or denies location, enters an address manually if needed, browses nearby restaurants and stores, opens a merchant, customizes an item, creates an account at checkout, places a delivery order, tracks it in real time, and rates the experience.
- Returning customer opens personalized home, searches by cuisine or item, filters for DashPass and open-now merchants, compares fees/ETAs, reorders a prior meal, applies a promo, adjusts tip, and confirms the quote before payment authorization.
- Grocery customer adds an EBT card, finds participating stores with SNAP/EBT indicators, adds eligible and ineligible items, adjusts the SNAP applied amount, pays the remainder with another method, and handles an out-of-stock substitution or refund.
- Alcohol customer enters an eligible region, verifies age before checkout, uploads ID as required, receives reminders to meet the Dasher with valid ID, passes handoff verification, or receives a refusal/cancellation state if requirements are not met.
- Pickup customer chooses pickup, pays online, receives merchant ready-time updates, sees ready-for-pickup notification, completes handoff, reports a missing item, and receives support resolution without a Dasher lifecycle.
- Customer experiences a delayed delivery, opens order status, contacts the Dasher through a masked channel, escalates to support, receives credit/refund decision, and sees the decision in order history.
- Merchant receives a live order, confirms it, changes prep time, marks one item out of stock, offers replacement/refund, prepares the order, manages Dasher pickup or customer pickup, and resolves a cancellation/dispute from order history.
- Merchant updates menu modifiers, adds required and optional options with price changes, marks a modifier unavailable, previews customer-facing impact, and sees checkout validation prevent invalid carts.
- Dasher handoff flow receives pickup details, verifies order, communicates safely through masked contact, navigates to customer, completes no-contact or hand-to-me handoff, and follows alcohol refusal rules when regulated items are present.
- DashPass member manages trial or paid membership, sees eligible merchant logos and subtotal minimums, gets savings displayed at checkout, cancels renewal, and keeps benefits through the correct period where applicable.
- Privacy-focused user updates account details, requests data archive, opts out of ad personalization, deletes the account after verification, and sees retention/legal-hold caveats for order, payment, regulated-item, and support records.
- Trust/safety user reports food safety, harassment, unsafe delivery, fraud, off-platform payment, alcohol issue, account takeover, or privacy incident through an auditable support path with emergency escalation.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, terms, privacy, and permission education | sign in, create account, continue, legal links | new, returning, signed-out, blocked region | auth failure, unsupported OS, underage, account locked |
| Address/Location Setup | Delivery availability and fulfillment anchor | GPS, address search, apartment, instructions | precise, approximate, manual, saved | denied permission, invalid address, outside service area |
| Marketplace Home | Discovery across restaurant, grocery, convenience, retail, alcohol, pickup | category, search, promo, reorder, address | personalized, signed-out, loading, empty | no merchants, stale personalization, location mismatch |
| Search And Filters | Find merchants/items and narrow marketplace results | query, cuisine, category, fees, ETA, DashPass, SNAP | results, no results, corrected query | restricted category, closed stores, provider outage |
| Merchant Detail | Store page, menu, fees, ETA, hours, and trust summary | category, item tap, favorite, share, mode | open, closed, scheduled, pickup | paused store, stale fee, unavailable merchant, region block |
| Item Customization | Configure item, modifiers, quantity, instructions | modifier choices, quantity, notes, add | valid, invalid, edited, added | required modifier missing, out of stock, price changed |
| Cart | Durable order draft and quote context | edit item, promo, mode, schedule, tip | valid, needs refresh, mixed SNAP, DashPass | invalid item, expired quote, min not met, split payment issue |
| Checkout | Payment authorization and final order placement | address, payment, tip, promo, SNAP, confirm | ready, authorizing, placed, failed | payment fail, fraud hold, stale quote, merchant closed |
| Order Tracking | Live order lifecycle and recovery actions | status, map, contact, help, cancel | placed, preparing, picked up, delivered | delayed, no Dasher, wrong address, support escalation |
| Pickup Status | Customer pickup progress and handoff | ETA, ready notification, directions, help | accepted, preparing, ready, picked up | late prep, wrong order, merchant closed |
| DashPass | Membership plan, benefits, eligibility, cancellation | plan, payment, cancel, manage | trial, active, shared, canceled | ineligible, payment fail, benefit missing, renewal dispute |
| SNAP/EBT Wallet | Benefit-card setup and eligible-store education | card, zip, payment split, help | added, verified, pending, removed | provider down, unsupported store, ineligible item |
| Alcohol Verification | Regulated-item checkout and handoff gate | ID upload, age, recipient, consent | verified, pending, handoff required | expired ID, underage, intoxication, refused delivery |
| Messages/Contact | Customer, Dasher, merchant, and support communication | masked call, message, attachment, report | connected, sent, failed, escalated | harassment, blocked user, unsafe instruction, moderation |
| Order Issue/Support | Refund, credit, missing item, safety, and help flows | issue type, evidence, chat, call | submitted, reviewing, resolved, denied | duplicate claim, legal hold, emergency, abuse pattern |
| Ratings/Reviews | Post-order feedback and reputation signals | rating, tags, text, report | eligible, submitted, published | expired, abusive content, fraud review, private data |
| Merchant Order Manager | Merchant acceptance, prep, item issue, and handoff | accept, busy, refund, replace, ready | new, confirmed, preparing, ready | canceled, item unavailable, tablet offline, dispute |
| Merchant Menu Manager | Menu items, modifiers, prices, and stock state | item, modifier, rule, price, availability | draft, published, paused | invalid required option, conflict, out of sync |
| Settings/Privacy | Account, addresses, payments, notifications, data rights | toggles, export, delete, legal links | signed-in, signed-out, verified | active order block, retention caveat, 2FA fail |

## Data Model

- `User`: account identity, locale, age/consent, phone/email verification, saved addresses, notification preferences, privacy settings, DashPass state, SNAP/EBT wallet links, support restrictions, export/delete lifecycle, and fraud/risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, location permission, ad personalization status, offline cache version, and last active state.
- `Address`: geocoded delivery location, apartment/unit, dropoff instructions, precise/coarse coordinates, delivery zone, regulated-item eligibility, and Dasher visibility rules.
- `Merchant`: restaurant/store identity, category, location, hours, status, delivery/pickup modes, DashPass eligibility, fee settings, rating summary, support contacts, and operational restrictions.
- `Menu`: categories, sort order, availability windows, pickup/delivery price variants, schedule rules, and version for conflict detection.
- `MenuItem`: item title, description, media metadata, base price, nutrition/allergen/disclaimer fields, age/regulatory flags, SNAP eligibility, stock state, and substitution policy.
- `ModifierGroup`: required/optional setting, min/max selections, duplicate selection rule, free option count, per-option pricing, pickup/delivery price, and stock state.
- `Cart`: merchant, items, modifiers, delivery/pickup mode, schedule, address, instructions, substitution preference, promo codes, DashPass benefit snapshot, SNAP applied amount, tip, quote id, and validation errors.
- `PriceQuote`: subtotal, delivery fee, service fee, small-order fee, taxes, regulatory fees, promo/credit, DashPass savings, SNAP eligible amount, tip, total, quote expiry, region, and line-item explainability.
- `PaymentMethod`: tokenized card/wallet/PayPal/Venmo/SNAP/credit representation, billing region, verification state, SCA/3DS state where relevant, and deletion constraints.
- `Order`: customer, merchant, cart snapshot, quote snapshot, payment state, mode, status, cancellation/refund state, support cases, rating eligibility, and audit ids.
- `Fulfillment`: delivery or pickup lifecycle, Dasher assignment, pickup ETA, dropoff ETA, route provider reference, handoff type, no-contact proof, alcohol ID status, and failed handoff reason.
- `DasherProfile`: public first name/initial, masked contact, vehicle where relevant, alcohol eligibility, assignment state, safety restrictions, and handoff audit metadata.
- `DashPassMembership`: plan, trial, renewal date, payment source, country, eligible benefits, family/shared link, cancellation, expiration, partner entitlement, and dispute state.
- `BenefitProgramCard`: SNAP/EBT card token, verification state, region, eligible merchant/item rules, applied amount, provider errors, and sensitive-data retention constraints.
- `PromotionCredit`: campaign, redemption rules, merchant/category eligibility, min subtotal, expiration, stackability, fraud checks, and audit events.
- `SupportCase`: issue type, order/item, evidence, requester role, refund/credit decision, safety escalation, SLA, appeal, legal hold, and owner queue.
- `MerchantDispute`: canceled order, reason code, payout impact, evidence, dispute window, DoorDash-like review decision, and merchant communication state.
- `Review`: order link, merchant/item/delivery dimensions, rating, tags, text, moderation state, report, removal decision, and publication timing.
- `AuditEvent`: append-only record for auth, address, pricing, cart, checkout, payment, SNAP/EBT, alcohol ID, delivery, support, refunds, merchant changes, privacy, and safety-sensitive actions.
- `LocalCacheRecord`: cached merchants, menus, carts, order statuses, message drafts, settings, quote freshness, sync attempts, conflict markers, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with age, region, verification, deletion, fraud, and device gates.
- `GET /home?addressId=&lat=&lng=`, `GET /search?query=&category=&filters=&cursor=`: marketplace discovery with category modules, merchant cards, ETA/fee snippets, personalization status, eligibility badges, pagination, and stale-data indicators.
- `GET /merchants/:id`, `GET /merchants/:id/menu`, `GET /merchants/:id/status`: merchant detail, menu version, hours, delivery/pickup modes, fees, availability, DashPass/SNAP/alcohol flags, and status reason codes.
- `POST /carts`, `PATCH /carts/:id`, `POST /carts/:id/validate`: cart creation and validation with item modifier rules, stock checks, address eligibility, min subtotal, promo validation, SNAP split, and quote refresh requirement.
- `POST /quotes`, `GET /quotes/:id`: price quote generation with fee/tax/credit/tip line items, DashPass savings, SNAP eligible amount, quote expiry, jurisdiction display flags, and price-change warnings.
- `POST /checkout/session`, `POST /orders`, `POST /payments/webhooks`: payment authorization, idempotency, order placement, duplicate webhook handling, failure recovery, credit/refund hooks, and server-owned state.
- `GET /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`, `POST /orders/:id/reorder`: order history, live status, cancellation eligibility, reorder validation, unavailable item recovery, and support affordances.
- `GET /orders/:id/tracking`, `GET /fulfillments/:id/events`: status events with stable ids, Dasher assignment, ETA updates, proof-of-delivery metadata, alcohol handoff state, and reconciliation after reconnect.
- `POST /orders/:id/contact`, `POST /message-threads/:id/messages`: masked customer/Dasher/merchant/support contact with delivery context, moderation, unsafe-instruction blocks, and retention policy.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/appeal`: missing item, late order, refund, DashPass, payment, SNAP, alcohol, safety, food quality, account, and privacy cases.
- `GET /dashpass`, `POST /dashpass/subscribe`, `POST /dashpass/cancel`, `GET /dashpass/benefits`: membership lifecycle, trials, renewal billing, cancellation, partner eligibility, merchant eligibility, and checkout savings.
- `POST /benefit-cards/snap-ebt`, `GET /benefit-cards`, `DELETE /benefit-cards/:id`, `POST /snap/eligibility`: SNAP/EBT tokenization, provider status, item/store eligibility, applied amount, and alternate-payment requirements.
- `POST /regulated/alcohol/verify`, `POST /fulfillments/:id/alcohol-handoff`: age verification, ID upload, recipient match, Dasher ID scan, sobriety/refusal reason, region rules, and audit logging.
- `GET /promotions`, `POST /promotions/redeem`, `DELETE /promotions/:id`: promo discovery, redemption, stackability, expiration, fraud checks, and quote integration.
- `POST /ratings`, `GET /ratings/:merchantId`, `POST /reviews/:id/report`: post-order rating eligibility, moderation, report/removal flow, and separation of merchant/item/delivery feedback.
- `GET /merchant/orders`, `PATCH /merchant/orders/:id`, `POST /merchant/orders/:id/adjust`: merchant order acceptance, prep-time updates, item replacement/refund, extra charge, ready status, cancellation, and support chat.
- `GET /merchant/menus`, `PATCH /merchant/menus/:id`, `PATCH /merchant/modifiers/:id`: merchant menu, item, modifier, stock, pricing, required/optional rules, and version conflicts.
- `POST /merchant/disputes`, `GET /merchant/disputes/:id`: merchant cancellation and error-charge dispute handling with evidence, reason codes, deadlines, and payout impact.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, security checks, irreversible deletion warnings, active-order constraints, and retention caveats.

## Realtime, Push, And Offline Behavior

- Order, payment, merchant confirmation, item adjustment, Dasher assignment, ETA, pickup-ready, delivery, cancellation, refund, support, alcohol handoff, and merchant-dispute state changes must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache home modules, recent merchants, menu summaries, full menus opened in the session, cart drafts, saved addresses, DashPass status, order history, and in-progress order status; cached data must expose freshness and never hide quote or availability expiry.
- Offline mode may show cached merchants/menus/order history and preserve local cart drafts, but checkout, payment, SNAP/EBT application, alcohol verification, merchant order adjustment, cancellation, refund, support escalation, account deletion, and safety reports require server confirmation.
- Low-risk local drafts such as search filters, item notes, cart edits, support evidence drafts, and rating drafts may queue with retry metadata; money movement, regulated items, privacy actions, and merchant operational writes must block while offline.
- Price quotes, tax calculations, delivery fees, merchant availability, item availability, DashPass benefits, SNAP eligibility, alcohol eligibility, and ETA must expire and refresh before checkout confirmation.
- Realtime tracking must handle duplicate events, missed events, Dasher reassignment, route provider outage, merchant prep delay, customer address edits, no-contact proof upload, failed handoff, and canceled order while offline.
- Merchant order manager must tolerate tablet disconnect, printer failure, duplicate notifications, auto-confirm toggles, busy mode, simultaneous portal/mobile edits, and conflict recovery through version checks.
- Push notifications must be opt-in, category-controlled, and content-minimized for order status, Dasher arrival, message, pickup ready, support decision, refund, DashPass renewal, promo, account security, and regulated-item reminders.
- Alcohol, SNAP/EBT, DashPass partner entitlements, Package Pickup, grocery substitutions, retail/OTC, and merchant tools must be feature-flagged by region, legal approval, provider availability, and manual verification state.

## Permissions, Privacy, And Safety

- Location, notifications, camera/photos/files for support evidence or ID upload, contacts only if a future sharing feature requires it, and biometric/device authentication must be requested only when the user invokes a related feature.
- Default analytics must exclude precise addresses, raw delivery instructions, payment credentials, SNAP/EBT numbers, ID images, support evidence, private messages, phone numbers, and exact Dasher/customer location trails.
- Location UX must distinguish no location, approximate location, precise location, manually entered address, OS-revoked permission, region-blocked category, and unsupported delivery zone with usable pickup/search fallback.
- Alcohol data must be purpose-limited, encrypted, access-controlled, redacted from logs, retained only under documented policy/legal constraints, and auditable for every verification and refusal decision.
- SNAP/EBT data must be tokenized through approved providers, scoped to eligible items and participating merchants, and prevented from paying fees, taxes, tips, or ineligible items unless program rules allow otherwise.
- Merchants, customers, and Dashers must be blocked from moving payments, required support communication, refunds, reviews, or regulated-item delivery off-platform unless a policy-reviewed exception exists.
- Food safety controls must cover temperature-sensitive items, missing/tampered items, allergen disclaimers, item substitutions, wrong-order handoff, photo/evidence upload, and escalation to support.
- Regulated categories must cover alcohol, OTC medicine, age-restricted products, SNAP/EBT, HSA/FSA-eligible items, and region-specific product bans with legal configuration and checkout guards.
- Dasher/customer safety must cover no-contact delivery, unsafe dropoff, harassment, threats, weapons, intoxication, underage recipient, blocked user, emergency escalation, and masked contact.
- Payment, refund, credit, promo, tip, chargeback, DashPass renewal, SNAP split payment, and cross-currency behavior must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- Reviews and ratings must include authenticity checks, anti-coercion rules, eligibility windows, policy moderation, report/removal flows, and appeal handling.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, clear fee breakdowns, and accessible support channels.
- Launch owners: marketplace trust owner for fraud/risk, legal/compliance owner for regulated items and terms, payments owner for checkout/refunds/tips, safety owner for food/alcohol/Dasher incidents, privacy owner for data rights, accessibility owner for inclusive ordering, and merchant operations owner for tablet/menu workflows.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, address added, permission state changed, home viewed, search performed, filter applied, merchant opened, item customized, cart validated, quote refreshed, checkout started, order placed, order tracked, support opened, reorder started, rating submitted, data export requested, account deletion requested.
- Marketplace quality metrics must use object ids, reason codes, latency, provider status, quote freshness, merchant availability freshness, ETA confidence, and failure codes rather than raw addresses, payment credentials, SNAP/EBT numbers, ID images, or support evidence.
- Search/ranking diagnostics must separate organic ranking, personalization, availability, ETA, fee, promo, DashPass, SNAP, alcohol, and legal-region logic, with opt-out and retention behavior reviewed for privacy.
- Payment analytics must capture checkout funnel and failure categories using tokenized payment references, not card or benefit-card details; refund analytics must hide private support evidence and merchant dispute details.
- Trust/safety analytics must track report categories, moderation states, alcohol refusal reasons, food-safety issue types, fraud/risk signals, appeal outcomes, SLA, and repeat-offender status without exposing private evidence to product analytics.
- Monetization can include original service fees, delivery fees, subscription membership, merchant promotion tools, pickup ordering, retail partnerships, ads/sponsored listings, convenience stores, gift cards, or premium merchant analytics later, but pricing, names, fee rates, protection claims, and promotional copy must be original and legal-reviewed.
- Fee display must be transparent before confirmation, configurable by jurisdiction, testable in checkout, and explicit about what is collected by platform, merchant, Dasher/tip, provider, or tax authority.
- Merchant-side monetization must show commission/rate effects, promo spend, refund/error charges, cancellation payout implications, pickup fee differences, and ad attribution without copying DoorDash merchant pricing.
- DashPass-like membership analytics must show eligible orders, benefit application, minimum subtotal failures, trial conversion, cancellation, partner entitlement, and missing-benefit disputes without dark patterns.

## Edge Cases

- First launch offline, unsupported OS, expired session, underage user, account locked, blocked region, language/currency mismatch, or user denies all optional permissions.
- Address is invalid, apartment missing, gated community inaccessible, hospital/school/business policy restricted, hotel room unclear, unsafe dropoff, outside delivery zone, or location provider inaccurate.
- Merchant is closed, paused, too busy, menu hours stale, item out of stock, modifier unavailable, pickup only, alcohol unavailable, SNAP unsupported, DashPass ineligible, or prices differ by delivery/pickup.
- Search results have stale ETA, stale fees, duplicate merchant, missing tax, unavailable promo, region-restricted item, inaccessible merchant details, fake listing, or legal category warning.
- Cart includes required modifier missing, mutually exclusive options, duplicate selections, delivery/pickup price mismatch, invalid special instructions, scheduled time outside hours, quote expiry, or min subtotal failure.
- Checkout starts after merchant closes, payment fails, promo expires, DashPass minimum not met, tax provider is unavailable, tip edit races with authorization, credit is reversed, or order is duplicate-submitted.
- SNAP/EBT card is rejected, provider is down, item eligibility changes, mixed cart needs alternate payment, applied amount exceeds eligible subtotal, or refunded SNAP amount needs provider reconciliation.
- Alcohol user cannot upload ID, ID is expired, name/photo mismatch occurs, recipient is absent, recipient appears intoxicated, recipient is underage, Dasher refuses delivery, or local law blocks delivery.
- Merchant misses confirmation, updates prep time repeatedly, marks item out of stock after Dasher assignment, gives wrong order to Dasher, cancels after prep, disputes payout, or tablet goes offline.
- Dasher is reassigned, waits too long, cannot reach merchant/customer, cannot enter building, has route outage, loses connection, uploads failed proof, or reports unsafe delivery.
- Pickup customer arrives early, merchant marks ready incorrectly, staff hands wrong order, customer cannot prove pickup, staff tip issue occurs, or pickup order requires support refund.
- Support claim is duplicate, abusive, outside refund window, lacks evidence, involves food safety, includes regulated item, requests emergency help, impacts merchant payout, or enters legal hold.
- Review window expires, review contains private information or harassment, customer rates Dasher for merchant issue, merchant disputes review, or fraud system detects incentive abuse.
- Data export, account deletion, payment method deletion, SNAP card deletion, ID data deletion, order-history retention, support case retention, law-enforcement request, fraud investigation, or legal hold conflicts with user request.

## Test Plan

- Unit tests for address validation, location permission states, merchant eligibility, open/closed hours, delivery/pickup modes, menu versioning, item availability, modifier min/max rules, and cart validation.
- Unit tests for quote line items: subtotal, delivery fee, service fee, small-order fee, tax, regulatory fee, promo, credit, DashPass savings, SNAP eligible amount, tip, total, and quote expiry.
- Unit tests for order state machines: placed, merchant confirmed, preparing, Dasher assigned, picked up, approaching, delivered, canceled, delayed, refunded, credited, disputed, and support escalation.
- Unit tests for DashPass lifecycle: trial, monthly, annual, partner entitlement, family/shared benefit, eligible merchant, minimum subtotal failure, cancellation, renewal, expired, and benefit missing.
- Unit tests for SNAP/EBT eligibility, card tokenization states, mixed-cart split payment, alternate payment requirements, refund handling, and provider error mapping.
- Unit tests for alcohol age verification, ID upload, recipient match, Dasher scan, intoxication refusal, underage rejection, self-exclusion, and regional blocking.
- Unit tests for privacy-safe analytics payload construction, sensitive field redaction, ad personalization opt-out, account deletion eligibility, data archive requests, and retention caveats.
- Contract tests for every API route, including pagination, stale data, menu version conflicts, quote snapshots, idempotency keys, payment webhook reconciliation, support transitions, and merchant dispute states.
- Integration tests for signed-out browsing, address setup, signed-in search, merchant detail, item customization, cart, checkout, payment failure recovery, order tracking, support contact, reorder, and rating.
- Integration tests for grocery/SNAP flow, alcohol flow, pickup flow, DashPass flow, promo/credit flow, merchant out-of-stock adjustment, and merchant cancellation dispute.
- Offline tests for cached home/merchant/menu reads, local cart drafts, blocked checkout/payment/SNAP/alcohol/support/delete actions, corrupt cache, reconnect reconciliation, and stale quote warnings.
- Merchant tests for order acceptance, busy mode, prep-time update, item refund/replacement, added customization charge, customer/Dasher contact, pickup-ready state, printer/tablet failure, and order history.
- Payment/refund tests for card failure, wallet failure, duplicate authorization, partial refund, full refund, credit issuance, promo reversal, tip adjustment, chargeback marker, and duplicate webhook.
- Trust/safety tests for food safety report, harassment, unsafe dropoff, off-platform payment request, alcohol refusal, account takeover, support abuse, merchant fraud, and emergency path.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, fee breakdown comprehension, modifier selection, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, signup/login, address validation, menu customization, checkout/payment/tip, promo/credit behavior, DashPass cancellation, SNAP/EBT checkout, alcohol ID/handoff, live tracking, Dasher contact, support refund, merchant tablet, pickup, push payloads, account deletion, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without DoorDash assets, merchant inventory, menu photos, reviews, private APIs, brand copy, proprietary recommendation/ranking/dispatch/risk systems, fee formulas, policy text, or support scripts.
- New and returning users can set an address, browse restaurants/stores, search/filter, inspect merchants, customize items, validate cart, review fees/taxes/tip/promo/DashPass/SNAP handling, place an order, track delivery or pickup, reorder, rate, and recover from denied permissions or network loss.
- Merchant users can manage store status, accept orders, update prep time, adjust out-of-stock items, configure menu modifiers, mark pickup ready, review canceled orders, and submit disputes with deterministic error states.
- Checkout, fees, taxes, tips, promos, credits, DashPass, SNAP/EBT, alcohol, refunds, cancellation, merchant payout impact, and support decisions are represented as auditable server-side state machines.
- Food safety, alcohol ID verification, SNAP eligibility, privacy, support evidence, masked contact, no-contact delivery, review authenticity, fraud, disputes, and emergency reports include moderation, audit, appeal, and abuse-prevention paths.
- Location, payment data, benefit card data, ID verification data, delivery instructions, messages, support evidence, order history, ad personalization, data export, and account deletion controls are accessible from settings and covered by tests.
- Alcohol, SNAP/EBT, OTC/HSA/FSA products, Package Pickup, DashPass partner entitlements, merchant tablet parity, Dasher app parity, native push payloads, and regional regulated surfaces are feature-flagged until legal, provider, and manual verification clear them.

## Open Questions

- Which licensed merchant/menu, map/geocoding, payment, SNAP/EBT, ID verification, tax, messaging, support, moderation, analytics, and notification providers will back V1?
- Which launch regions determine alcohol delivery, SNAP/EBT availability, age requirements, food safety rules, OTC/HSA/FSA eligibility, fee/tax display, payment methods, and consumer refund law?
- Will V1 include grocery, convenience, retail, alcohol, SNAP/EBT, Package Pickup, and DashPass-like membership at launch, or keep some behind feature flags until provider and legal review?
- Will V1 support signed-out browsing, and if yes, which address, cart, checkout, tracking, support, rating, and privacy features remain account-gated?
- What is the accepted policy posture for delivery/service/small-order fees, tips, merchant markups, tax estimates, promos, credits, DashPass benefits, refunds, and merchant chargebacks in each launch region?
- Which merchant trust requirements are mandatory before publication: business verification, address verification, food permit, alcohol license, menu proof, tax profile, payout method, photo review, and support contact?
- What safety escalation model will cover food safety, alcohol refusal, harassment, unsafe delivery, weapons, scams, privacy invasion, account takeover, and law-enforcement/emergency contact?
- What original search, ranking, dispatch, ETA, fraud, and support-decision model will be explainable enough for user trust and regulator expectations without copying DoorDash logic?

## Build Plan

- Phase 1: scaffold app shell, auth/guest mode, address setup, Marketplace home, search/filters, merchant detail, menu browsing, item customization, cart, settings/legal links, privacy-safe analytics, and licensed map/provider attribution.
- Phase 2: add quote generation, fee/tax/tip/promo breakdown, checkout session, payment authorization, order placement, order history, reorder validation, support entrypoint, and checkout/order tests.
- Phase 3: add realtime order tracking, Dasher assignment abstraction, masked contact, delivery instructions, no-contact proof, pickup flow, push categories, offline cached status, and fulfillment reconciliation tests.
- Phase 4: add DashPass-like membership, eligible merchant indicators, subtotal minimum rules, trial/renewal/cancel states, pickup credits, partner entitlements, and membership billing tests.
- Phase 5: add grocery/convenience/retail extensions, SNAP/EBT card tokenization, item eligibility, mixed cart split payment, substitution/refund preferences, and benefit-provider tests.
- Phase 6: add alcohol and regulated-item flows: region gating, ID verification, Dasher handoff scan, refusal states, self-exclusion, audit logs, and legal/safety review tooling.
- Phase 7: add merchant portal/tablet workflows for order acceptance, busy mode, prep-time updates, item replacement/refund, modifiers, pickup readiness, cancellation disputes, menu versioning, and merchant operations tests.
- Phase 8: add advanced trust/safety, food safety reports, support case routing, refund/credit policy engine, review moderation, fraud/risk gates, privacy rights automation, accessibility audit, and native/manual verification only after legal, privacy, safety, accessibility, and provider approvals.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Use this spec as the food-delivery marketplace pattern for `039-uber-eats.md`, `040-instacart.md`, and related local-commerce specs.
- Continue the architecture-teaching upgrades with `046-amazon.md`.
