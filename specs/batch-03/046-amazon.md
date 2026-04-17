# Amazon-Style Clone Spec

> Metadata
> - Inspiration app: Amazon Shopping
> - Category: Shopping, marketplace, retail media, subscriptions, fulfillment, and customer support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Amazon customer/order/return/privacy/legal pages, About Amazon retail articles, Amazon Prime pages, Amazon seller/FBA/Seller Central pages, Amazon Ads public pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, address validation, product search ranking, barcode/photo/voice search, personalized recommendations, product variation selection, cart quote refresh, payment authorization, gift cards, Prime enrollment/cancellation/sharing, Subscribe & Save creation/edit/cancel, coupon/deal behavior, order tracking, delivery-photo/map tracking, returns/refunds/replacements, support chat, marketplace seller messaging, review submission/moderation, sponsored listing placement, account deletion/data export, household/family controls, restricted-product flows, and regional availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, product catalog, photos, reviews, seller data, recommendation models, search ranking, ad auctions, fulfillment logic, payment providers, fraud systems, support scripts, and regulated-product workflows.

## Overview

Build an original mobile commerce marketplace inspired by Amazon Shopping's public workflow: personalized home, catalog search and category browsing, product detail pages with variations and seller offers, cart, checkout, Prime-style membership benefits, Subscribe & Save-style repeat orders, order tracking, returns/refunds/replacements, wish lists, reviews, customer service, gift cards, ads/sponsored listings, marketplace seller operations, household controls, and privacy/account settings.

The clone must not copy Amazon branding, screenshots, marketing copy, protected UI artwork, product listings, reviews, seller catalogs, ranking systems, ad models, private APIs, fulfillment logic, support content, or policy text. Functional parity should be expressed through original product language, licensed or synthetic product data, independently designed search/recommendation/ads systems, licensed payments and logistics integrations, and jurisdiction-aware trust and safety controls.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first shopping marketplace with account entry, address setup, personalized discovery, product/category search, product detail, variations, seller offers, cart, checkout, order tracking, returns, support, reviews, lists, notifications, and privacy controls.
- Support marketplace trust expectations around product authenticity, unsafe or restricted goods, seller/customer fraud, counterfeit prevention, review abuse, price transparency, ads disclosure, payment security, refunds, replacements, delivery evidence, and customer service escalation.
- Support optional V1 seller operations for product listing, inventory, pricing, order fulfillment, FBA-style outsourcing, returns, seller support, account health, ads, coupons/deals, product reviews, and marketplace policy enforcement.
- Represent Prime-style membership, Subscribe & Save-style recurring orders, gift cards, household/family sharing, personalized recommendations, and sponsored listings as original entitlement and commerce systems with clear opt-outs and controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Amazon-branded app or imply affiliation with Amazon, Prime, FBA, Seller Central, Amazon Ads, Alexa, Kindle, Whole Foods, carriers, payment providers, or third-party sellers.
- Do not scrape Amazon, reuse private Amazon APIs, replay Amazon network traffic, copy product catalogs, copy reviews/Q&A, copy price histories, copy seller data, clone proprietary ranking/recommendation/ad systems, or reproduce Amazon policy/support copy.
- Do not process production card payments, gift cards, subscriptions, refunds, marketplace seller payouts, identity documents, restricted goods, regulated products, tax collection, or customer support decisions without separate legal, compliance, trust/safety, and payment-provider review.
- Do not publish seller tooling, sponsored listing auctions, household/family controls, review moderation, Subscribe & Save, Prime-like benefits, support/refund automation, or restricted-product checkout without abuse prevention, privacy review, audit logging, and escalation paths.
- Do not claim exact App Store, Play Store, native-device, checkout, payment, Prime, Subscribe & Save, delivery tracking, returns/refunds, seller tools, review, ads, recommendation, account deletion, support, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/amazon-shopping/id297606951 | Official iOS listing, developer, Shopping category, age rating, in-app purchases, supported devices, app positioning, real-time tracking, product views, lists, support, scan search, privacy labels, and current listing text | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.amazon.mShop.android.shopping | Official Android listing, package id, ratings/download scale, ads/in-app purchases, delivery notifications, 360 product view, View in your room, lists/price alerts, biometric sign-in, live chat, scan search, permissions, data safety, and current release notes | Verified 2026-04-17 |
| Amazon Customer Service | https://www.amazon.com/gp/help/customer/display.html | Canonical customer help entrypoint for orders, returns, refunds, account, payments, Prime, shipping, devices, privacy, and contact support routing | Verified 2026-04-17 |
| Amazon Return Policy | https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7 | Public return-window and return/refund orientation for Amazon.com and marketplace seller orders | Verified 2026-04-17 |
| Track Amazon Packages | https://www.aboutamazon.com/news/retail/track-amazon-package/ | Public mobile and desktop order tracking path, app order history entrypoint, map tracking trigger, delivery push notification, share tracking, and gift-recipient tracking | Verified 2026-04-17 |
| Amazon Shipping Tracking | https://track.amazon.com/ | Public Amazon Shipping tracking states, tracking ID entry, delivered/missing package guidance, attempted/undeliverable states, photo-on-delivery, and sender support handoff | Verified 2026-04-17 |
| Amazon Shipping Visibility | https://shipping.amazon.com/features/visibility-and-tracking | Tracking notifications, pickup-to-delivery visibility, photo/GPS delivery confirmation, branded tracking, and delivery evidence implications | Verified 2026-04-17 |
| Amazon Prime | https://www.amazon.com/amazonprime | Prime membership positioning, fast/free delivery, entertainment, deals, plan exploration, trial/cancellation/help prompts, and household-benefit questions | Verified 2026-04-17 |
| Prime Benefits Overview | https://www.aboutamazon.com/news/retail/amazon-prime-benefits/ | Current public Prime benefit inventory, delivery benefits, deals, entertainment, grocery and other membership value framing | Verified 2026-04-17 |
| Subscribe & Save Seller Program | https://sell.amazon.com/programs/subscribe-and-save/ | Recurring-order model, subscription cadence, discount levels, seller funding, FBA eligibility, product enrollment, and seller management requirements | Verified 2026-04-17 |
| Seller Central | https://sell.amazon.com/tools/seller-central | Seller operations: listing, pricing, inventory, orders, returns, FBA, payments, coupons/deals, ads, reviews, account health, seller support, and mobile seller app orientation | Verified 2026-04-17 |
| Fulfillment by Amazon | https://sell.amazon.com/fulfillment-by-amazon.html/ | FBA model for storage, pick/pack/ship, Prime-speed fulfillment, customer service, returns, inventory shipments, and product restrictions | Verified 2026-04-17 |
| Fulfilled by Merchant | https://sell.amazon.com/programs/fulfilled-by-merchant | Seller-fulfilled order model, premium shipping, Seller Fulfilled Prime-style eligibility, returns/refunds tools, and support responsibilities | Verified 2026-04-17 |
| Amazon Ads Sponsored Products | https://advertising.amazon.com/solutions/products/sponsored-products | Sponsored product placement model, cost-per-click advertising, product visibility, campaign creation, and seller/brand advertising implications | Verified 2026-04-17 |
| Amazon Ads Audience Policies | https://advertising.amazon.com/resources/ad-policy/creative-acceptance/amazon-audience-policies | Audience policy, prohibited audience categories, legal responsibility, and customer-trust framing for interest-based advertising | Verified 2026-04-17 |
| Amazon Privacy Notice | https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ | Canonical privacy notice for Amazon services, personal data categories, sharing, retention, rights, and customer privacy obligations | Verified 2026-04-17 |
| Amazon Conditions of Use | https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM | Canonical legal terms for account use, platform conditions, disputes, and user obligations | Verified 2026-04-17 |
| Amazon Public Privacy Position | https://www.aboutamazon.com/about-us/public-policy/privacy | Privacy-by-design posture, data transparency, access/delete support, and statement that Amazon does not sell customer personal data | Verified 2026-04-17 |
| Amazon Accessibility | https://www.amazon.com/accessibility | Accessibility entrypoint for inclusive shopping, assistive technology support, feedback, and accessibility commitments | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public mobile listings position Amazon Shopping as a free shopping app with in-app purchases, product browse/search/detail/reviews/purchase flows, worldwide delivery claims, real-time package tracking, delivery notifications, lists, price-drop alerts, barcode/photo scanning, voice search/assistant integration, and customer support.
- iOS must support iPhone and iPad layouts; Android must support phone and compatible large-screen device surfaces where the Play listing exposes compatibility.
- Home must expose search, category shortcuts, personalized modules, recent views, deals, Prime-style benefit modules, cart, orders, account, lists, notifications, and signed-out or limited-personalization states.
- Search must support text, category, barcode, image/photo, voice, filters, sort, sponsored placements, unavailable-result states, spelling correction, and safe/restricted-category handling without copying Amazon ranking logic.
- Product detail must support title, media gallery, 360-style imagery where licensed, AR room preview where supported, variation selection, seller/fulfillment offer selection, price/deal/coupon states, delivery promise, stock, quantity, product details, Q&A, reviews, ratings, compare alternatives, recommendations, sharing, list save, report listing, and restricted-item notices.
- Cart must support mixed sellers, quantity edits, saved-for-later, variation changes, delivery option selection, gift options, coupons/promos, subscription/repeat-delivery upsell, Prime-style benefit indicators, stale price/availability refresh, and checkout readiness validation.
- Checkout must display shipping address, delivery options, payment method, gift card/credit balance, promo/coupon, tax/fees, total, membership savings, split shipment, item availability, restricted-item gates, fraud/security checks, and final confirmation.
- Order tracking must expose placed, preparing, shipped, out for delivery, delivered, attempted, delayed, canceled, returned, refunded, replaced, and support-needed states with push and in-app updates.
- Map tracking, GPS pins, photo-on-delivery, delivery instructions, share tracking, gift tracking, and missing-package recovery require manual verification and must be feature-flagged until legal, privacy, carrier, and device behavior is confirmed.
- Returns/refunds/replacements must support eligible item selection, reason codes, return window, label/QR generation, dropoff or pickup options, refund method, replacement item, seller-specific handling, status tracking, and support escalation.
- Prime-style membership must support trial, monthly, annual, student/discounted, household/shared, canceled, expired, payment-failed, refund, and ineligible-region states with original benefit names and cancellation paths.
- Subscribe & Save-style recurring orders must support eligible product discovery, cadence, quantity, discount snapshot, seller-funded/platform-funded discounts, skip, edit, cancel, out-of-stock, price-change, payment-failed, and shipment consolidation states.
- Lists must support default wish list, custom lists, private/shared/public visibility, price-drop alerts, gift ideas, item notes, purchased state, unavailable item, duplicate item, and invite/collaboration controls.
- Reviews and ratings must be post-purchase eligible where appropriate, separate product review from seller/shipping/support issues, include image/video upload review only with permission, detect incentive abuse, allow reporting, and preserve moderation/audit state.
- Recommendations must use original models and explainable modules such as recently viewed, related items, bought-together analogs, deal modules, and replenishment prompts without copying Amazon personalization logic.
- Sponsored listings and retail media must be clearly disclosed, governed by ad policies, separated from organic ranking diagnostics, and tied to privacy/ad-personalization controls.
- Seller operations must support product listing, inventory, price, fulfillment mode, order management, return handling, promotions/coupons, advertising, account health, review monitoring, support, and policy compliance at V1 depth if seller tooling is in scope.
- Customer service must include order issue triage, live chat or message case abstraction, return/refund support, Prime/subscription support, payment issue support, seller contact, safety report, account/privacy requests, and escalation/appeal state.
- Account settings must expose profile, addresses, payment methods, gift cards/credits, Prime-style membership, subscriptions, household/family controls, lists, reviews, notifications, language/country, privacy, ad preferences, accessibility, terms, data export, account deletion, and support.

## Core User Journeys

- New customer installs the app, signs in or browses with limited personalization, sets a delivery address manually or with location permission, searches for a product, compares offers, adds an item to cart, creates or verifies an account at checkout, places an order, and tracks delivery.
- Returning customer opens personalized home, searches by keyword or category, filters/sorts results, opens a sponsored or organic product with clear disclosure, selects variation and seller offer, applies coupon, checks delivery promise, and saves to a list or cart.
- Customer uses barcode/photo/voice search, denies camera/microphone permission, receives a usable fallback, later grants permission from settings, and sees privacy-safe analytics for permission state only.
- Customer builds a cart across sellers, sees price/availability/delivery changes before confirmation, updates shipping address and payment method, uses gift card balance, handles payment failure, and confirms server-owned order state.
- Prime-style member sees eligible delivery benefits and exclusive deals, starts or manages membership, shares allowed household benefits, cancels renewal, and sees benefit state continue or expire according to the product policy.
- Subscribe & Save-style customer subscribes to an eligible consumable item, chooses cadence and quantity, receives pre-shipment reminders, skips an order, edits payment/address, handles price or stock change, and cancels without dark patterns.
- Customer receives delivery push notification, opens order tracking, sees shipment events or map tracking when verified, shares tracking for a gift, reports missing delivery after the required wait period, and reaches support.
- Customer starts a return or replacement from order history, chooses reason and item condition, receives label/QR/dropoff instructions, tracks return transit, receives refund or replacement status, and escalates a denied or delayed case.
- Customer writes a product review after an eligible purchase, adds media if permitted, edits or deletes the review, reports abusive content, and sees review moderation preserve seller/customer safety.
- Seller creates or matches a product listing, manages inventory and price, chooses FBA-style or merchant-fulfilled handling, receives an order, ships or monitors fulfillment, handles a return, reviews account health, and opens seller support.
- Advertiser or seller creates a sponsored product campaign, selects eligible products and budget, sees disclosure and policy checks, monitors impressions/clicks/orders, and pauses a campaign when policy or inventory changes.
- Privacy-focused user updates ad preferences, exports data, requests account deletion, deletes payment/address/list data where allowed, and sees retention caveats for orders, payments, support, tax, fraud, and regulated-product records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account creation, sign-in, terms, privacy, and permission education | sign in, create account, continue, legal links | new, returning, signed-out, blocked region | auth failure, unsupported OS, underage, account locked |
| Address And Region Setup | Delivery availability and marketplace localization | GPS, address search, manual address, country/language | precise, approximate, manual, saved | denied permission, invalid address, unsupported region |
| Marketplace Home | Personalized discovery, categories, deals, Prime-style benefits, recent views | search, category, deal, account, cart | personalized, signed-out, loading, empty | stale personalization, no service, experiment disabled |
| Search And Filters | Product/category discovery across catalog and sellers | query, barcode, photo, voice, filters, sort | results, no results, corrected query | sponsored-only results, restricted category, provider outage |
| Category/Deal Browse | Curated browsing, promotions, seasonal events, and departments | category, subcategory, filter, sort | loaded, personalized, deal live | expired deal, regional restriction, inventory mismatch |
| Product Detail | Product media, variations, offers, delivery promise, reviews, Q&A | variation, seller, quantity, list, cart | available, limited, backorder, unavailable | price changed, unsafe item, counterfeit report, age gate |
| Offer/Seller Selector | Compare sellers, fulfillment, shipping speed, condition, and price | offer selection, seller profile, shipping option | Prime-like, FBA-like, merchant fulfilled | seller suspended, shipping ineligible, stale offer |
| Cart | Durable order draft and checkout readiness | quantity, save, coupon, gift, subscription | valid, needs refresh, mixed sellers, signed-out | price change, stockout, min not met, restricted item |
| Checkout | Address, payment, tax, delivery, final confirmation | address, payment, promo, gift card, confirm | ready, authorizing, placed, failed | payment fail, fraud hold, expired quote, address block |
| Orders | Order history, shipment status, invoices, actions | order tap, filter, reorder, return | active, delivered, canceled, returned | hidden order, missing tracking, account mismatch |
| Package Tracking | Shipment timeline, delivery promise, map/photo/share tracking | status, map, share, help, delivery instructions | shipped, out for delivery, delivered | delayed, attempted, missing, carrier outage |
| Returns/Replacements | Return, refund, exchange, replacement, and label workflow | item, reason, dropoff, refund method | eligible, in progress, refunded, replaced | expired window, seller dispute, hazardous item, no label |
| Lists And Price Alerts | Saved products, wish lists, gift lists, shared lists | save, share, invite, alert, note | private, shared, public, price drop | removed item, duplicate, invite abuse, privacy leak |
| Prime-Style Membership | Membership plans, benefits, household sharing, cancellation | plan, payment, share, cancel | trial, active, shared, canceled | ineligible, payment fail, benefit missing, refund dispute |
| Subscribe & Save | Recurring order setup and management | cadence, quantity, skip, edit, cancel | active, upcoming, skipped, canceled | stockout, price change, payment fail, seller unenrolled |
| Reviews/Q&A | Product feedback and customer knowledge | rating, text, media, report, vote | eligible, submitted, published, moderated | review abuse, private data, seller retaliation |
| Customer Service | Guided support for orders, account, payment, returns, and safety | issue type, chat, evidence, callback | submitted, in review, resolved | duplicate claim, emergency, support abuse, legal hold |
| Seller Product Manager | Seller listing, inventory, price, and fulfillment controls | SKU, offer, inventory, price, fulfillment | draft, active, paused, suppressed | policy violation, stock mismatch, brand conflict |
| Seller Orders/Returns | Seller order fulfillment and post-order operations | accept, ship, refund, message, return | new, shipped, returned, refunded | late shipment, A-to-z-like claim, buyer abuse |
| Ads Campaign Manager | Sponsored listing campaign setup and monitoring | product, keyword, budget, bid, policy | draft, active, paused, rejected | prohibited audience, out of budget, policy block |
| Settings/Privacy | Account, addresses, payments, notifications, ads, data rights | toggles, export, delete, legal links | signed-in, verified, signed-out | active order block, retention caveat, 2FA fail |

## Data Model

- `User`: account identity, locale, region, age/consent, auth providers, Prime-style membership, household links, notification preferences, ad preferences, privacy settings, export/delete lifecycle, and fraud/risk flags.
- `DeviceSession`: platform, app version, auth token, notification token, biometric sign-in state, permission states, offline cache version, and last active timestamp.
- `Address`: delivery address, geocode, delivery instructions, access codes, country/region, tax jurisdiction, restricted-item eligibility, and delivery-photo/map visibility rules.
- `CatalogItem`: product identity, title, description, category, media metadata, variation family, attributes, brand/seller owner, safety flags, regulatory flags, and listing moderation state.
- `VariationOption`: size/color/style/configuration, option availability, media overrides, price range, and compatibility constraints.
- `Offer`: seller, condition, fulfillment mode, price, list price, coupon/deal, delivery promise, stock, quantity limit, return policy, Prime-style eligibility, and offer expiry.
- `Seller`: public profile, business verification, brand registry state, fulfillment modes, account health, support contacts, return settings, tax settings, policy restrictions, and payout state.
- `Inventory`: SKU, warehouse or merchant stock, reservation, backorder, replenishment, safety stock, shipment plan, FBA-like inbound state, and conflict version.
- `Cart`: user/session, line items, saved-for-later, seller grouping, address, delivery options, gift options, coupons, subscription candidate, quote snapshot, validation errors, and stale flags.
- `CheckoutQuote`: subtotal, item discounts, coupons, gift card/credit, shipping, tax, regulatory fee, membership savings, total, split shipment, quote expiry, and explainability line items.
- `PaymentMethod`: tokenized card/wallet/bank/gift-card/credit representation, billing address, verification state, SCA/3DS state where relevant, deletion constraints, and failure reason.
- `Order`: customer, cart snapshot, quote snapshot, seller/fulfillment split, payment state, shipment groups, cancellation/refund/replacement state, support cases, review eligibility, and audit ids.
- `Shipment`: carrier, tracking id, shipment events, delivery promise, map tracking state, delivery photo/proof, attempted delivery, missing-package claim, and recipient sharing state.
- `ReturnRequest`: order item, reason, eligibility, window, label/QR/dropoff option, refund method, replacement link, seller review state, carrier state, and resolution.
- `SubscriptionOrder`: subscribed product, cadence, quantity, discount snapshot, next shipment, skip/edit/cancel state, seller/platform funding, payment state, and price/stock-change acknowledgement.
- `Membership`: plan, trial, renewal date, household/shared benefits, benefit eligibility, cancellation, expiration, refund state, payment source, and support disputes.
- `List`: owner, visibility, collaborators, saved items, notes, price alerts, purchased state, gift registry metadata, and abuse/privacy flags.
- `Review`: order eligibility, product link, rating, text, media, helpful votes, report state, moderation state, seller response where allowed, and publication timing.
- `AdCampaign`: advertiser, products, keywords/audiences, budget, bid, disclosure state, policy checks, metrics, billing, and audit events.
- `RecommendationSignal`: privacy-scoped event aggregates for viewed, searched, bought, saved, similar, sponsored, and suppressed items without raw private content exposure.
- `SupportCase`: issue type, order/item/seller/payment link, evidence, requester role, refund/replacement decision, safety escalation, SLA, appeal, legal hold, and owner queue.
- `AuditEvent`: append-only record for auth, address, catalog, price, inventory, cart, checkout, payment, membership, subscription, order, return, review, ad, seller, support, privacy, and safety-sensitive changes.
- `LocalCacheRecord`: cached home modules, recent products, cart draft, order summaries, tracking state, list items, settings, quote freshness, sync attempts, conflict markers, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with age, region, verification, deletion, fraud, and device gates.
- `GET /home?addressId=&region=&cursor=`, `GET /categories`, `GET /deals`: marketplace discovery with personalized modules, sponsored disclosures, category cards, deal eligibility, pagination, and stale-data indicators.
- `GET /search?query=&category=&filters=&sort=&cursor=`, `POST /search/photo`, `POST /search/barcode`, `POST /search/voice`: product discovery with organic/sponsored separation, corrections, filters, safe-mode, permission state, and provider errors.
- `GET /products/:id`, `GET /products/:id/variations`, `GET /products/:id/offers`: product detail, media, variation rules, seller offers, delivery promises, price/deal/coupon states, ratings summary, Q&A summary, and restricted-item warnings.
- `POST /carts`, `PATCH /carts/:id`, `POST /carts/:id/validate`: cart creation and validation with stock checks, seller grouping, address eligibility, coupons, subscription candidates, gift options, quote refresh, and stale price/availability warnings.
- `POST /checkout/quotes`, `GET /checkout/quotes/:id`: quote generation with item discounts, shipping, tax, gift-card/credit, membership savings, split shipments, quote expiry, and line-item explainability.
- `POST /checkout/session`, `POST /orders`, `POST /payments/webhooks`: payment authorization, idempotency, order placement, duplicate webhook handling, failure recovery, gift-card/credit reconciliation, and server-owned state.
- `GET /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`, `POST /orders/:id/reorder`: order history, detail, cancellation eligibility, reorder validation, unavailable item recovery, invoice links, and support affordances.
- `GET /shipments/:id/events`, `POST /shipments/:id/share`, `PATCH /shipments/:id/instructions`: tracking events, map/photo delivery state, share tracking, delivery instructions, missing-package flow, and reconciliation after reconnect.
- `POST /returns`, `GET /returns/:id`, `PATCH /returns/:id`, `POST /returns/:id/escalate`: return/replacement/refund workflows with item eligibility, reason code, label/dropoff, refund method, seller review, and support escalation.
- `GET /membership`, `POST /membership/subscribe`, `POST /membership/cancel`, `GET /membership/benefits`, `POST /household/invites`: Prime-style lifecycle, trials, renewal billing, cancellation, household sharing, benefit eligibility, and support disputes.
- `GET /subscriptions`, `POST /subscriptions`, `PATCH /subscriptions/:id`, `POST /subscriptions/:id/skip`, `DELETE /subscriptions/:id`: Subscribe & Save-style recurring orders, cadence, quantity, discount, price-change acknowledgement, skip, edit, and cancel.
- `GET /lists`, `POST /lists`, `PATCH /lists/:id`, `POST /lists/:id/items`, `DELETE /lists/:id/items/:itemId`: wish lists, shared lists, price alerts, item notes, invite/collaboration, gift metadata, and privacy controls.
- `POST /reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id`, `POST /reviews/:id/report`, `GET /products/:id/reviews`: review eligibility, moderation, helpful votes, media upload, abuse reporting, and seller-safe publication state.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/appeal`: order, return, payment, membership, seller, safety, product, account, and privacy support cases.
- `GET /seller/products`, `POST /seller/products`, `PATCH /seller/products/:id`, `PATCH /seller/offers/:id`: seller listing, inventory, pricing, fulfillment mode, policy checks, and product detail contribution conflicts.
- `GET /seller/orders`, `PATCH /seller/orders/:id`, `POST /seller/returns/:id/action`, `GET /seller/account-health`: seller order fulfillment, returns/refunds, claim handling, performance metrics, and policy compliance.
- `POST /seller/fba/shipments`, `GET /seller/fba/inventory`, `GET /seller/fba/returns`: FBA-style inbound inventory, warehouse stock, outsourced fulfillment status, customer service handoff, and return processing.
- `GET /ads/campaigns`, `POST /ads/campaigns`, `PATCH /ads/campaigns/:id`, `GET /ads/campaigns/:id/metrics`: sponsored product campaign setup, budget/bid, product eligibility, disclosure, audience policy checks, and reporting.
- `GET /recommendations?context=`, `POST /recommendations/feedback`: privacy-scoped recommendation modules, suppression feedback, sponsored/organic separation, and ad-personalization opt-out enforcement.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`, `PATCH /ads/preferences`: privacy rights, security checks, irreversible deletion warnings, active-order constraints, ad choices, and retention caveats.

## Realtime, Push, And Offline Behavior

- Order, payment, inventory reservation, shipment, delivery, return, refund, replacement, support, seller order, subscription, membership renewal, price drop, and campaign state changes must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache home modules, recent searches, recently viewed products, product detail summaries, cart drafts, saved lists, order summaries, shipment events, membership summary, subscription list, and settings; cached data must expose freshness and never hide price, availability, quote, or delivery-promise expiry.
- Offline mode may show cached home/product/order/list/settings data and preserve local cart/list/review/support drafts, but checkout, payment, gift-card redemption, membership changes, subscription changes, restricted-item actions, support escalation, account deletion, seller operations, returns, refunds, and ad changes require server confirmation.
- Low-risk local drafts such as search filters, comparison notes, list edits, review drafts, support evidence drafts, and delivery instruction drafts may queue with retry metadata; money movement, privacy actions, marketplace listing changes, seller payouts, and regulated-product decisions must block while offline.
- Checkout quotes, taxes, shipping fees, product price, seller offer, stock, delivery promises, coupons, Prime-style benefits, Subscribe & Save discounts, gift card balance, and restricted-product eligibility must expire and refresh before order confirmation.
- Package tracking must handle duplicate events, missed events, carrier outage, map unavailable, delivery-photo delay, attempted delivery, wrong address, safe-place failure, recipient unavailable, returned-to-sender, and missing-package escalation.
- Seller operations must tolerate inventory race conditions, simultaneous listing edits, suppressed listings, late shipment, fulfillment-center receiving delays, carrier scan gaps, return disputes, account health warnings, and version conflicts.
- Push notifications must be opt-in, category-controlled, and content-minimized for delivery status, price drops, deals, order issues, support decisions, return/refund status, subscription reminders, membership renewal, seller orders, ads alerts, account security, and privacy requests.
- Barcode/photo/voice search, AR room preview, map tracking, delivery photos, household/family sharing, Subscribe & Save, sponsored listings, seller tools, restricted categories, and external-brand shopping must be feature-flagged by region, legal approval, provider availability, and manual verification state.

## Permissions, Privacy, And Safety

- Camera, photos, microphone, location, contacts, notifications, biometric/device authentication, files for support evidence, and local network permissions must be requested only when the user invokes a related feature.
- Default analytics must exclude precise addresses, raw delivery instructions, payment credentials, gift-card codes, ID images, support evidence, private messages, phone numbers, raw review text, household relationships, and exact delivery location trails.
- Location UX must distinguish no location, approximate location, precise location, manually entered address, OS-revoked permission, unsupported delivery zone, and restricted-product region block with usable browse/search fallback.
- Payment, gift card, wallet, refund, subscription, marketplace payout, chargeback, tax, cross-border, and currency behavior must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- Product safety controls must cover counterfeit reports, prohibited goods, recalls, hazardous materials, age-restricted products, medical/health claims, child safety, food/grocery, batteries, chemicals, weapons, and region-specific bans.
- Seller trust controls must cover identity/business verification, product authenticity, brand conflict, listing abuse, fake inventory, review manipulation, off-platform payment, customer harassment, late shipment, refund abuse, and account takeover.
- Customer trust controls must cover package theft, missing delivery, return fraud, payment fraud, promo abuse, gift card scams, account takeover, support abuse, review abuse, and abusive seller/customer communication.
- Reviews and Q&A must include authenticity checks, anti-incentive rules, eligibility windows, private-information detection, report/removal flows, seller retaliation prevention, and appeal handling.
- Ads and recommendations must clearly distinguish sponsored from organic content, honor ad-personalization preferences, avoid prohibited audience categories, and provide auditability for ranking/recommendation experiments.
- Household/family controls must prevent unauthorized purchase, list sharing, benefit sharing, child-directed recommendations, payment method misuse, and privacy leaks between household members.
- Returns/refunds/replacements must account for hazardous items, high-value items, serial-number mismatch, empty-box fraud, seller dispute, cross-border shipping, refund timing, replacement stock, and legal retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen reader labels, focus order, contrast, reduced motion, accessible carousel/product media alternatives, clear price/fee breakdowns, and accessible support channels.
- Launch owners: marketplace trust owner for seller/customer fraud, legal/compliance owner for restricted goods and terms, payments owner for checkout/refunds/gift cards/subscriptions, privacy owner for data rights and ads preferences, accessibility owner for inclusive shopping, retail media owner for sponsored disclosures, and operations owner for fulfillment/returns.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, address added, permission state changed, home viewed, search performed, filter applied, sponsored impression, product opened, variation selected, offer selected, list item saved, cart validated, checkout started, order placed, package tracked, return started, review submitted, support opened, data export requested, and account deletion requested.
- Commerce quality metrics must use object ids, reason codes, latency, provider status, quote freshness, inventory freshness, delivery-promise confidence, and failure codes rather than raw addresses, payment credentials, gift card codes, delivery photos, or support evidence.
- Search/recommendation diagnostics must separate organic ranking, personalization, category eligibility, availability, price, delivery promise, promotion, Prime-style benefit, sponsored placement, and legal-region logic, with opt-out and retention behavior reviewed for privacy.
- Payment/refund analytics must capture checkout funnel and failure categories using tokenized payment references, not card, gift card, bank, or benefit details.
- Trust/safety analytics must track report categories, counterfeit flags, restricted-product decisions, review moderation states, return abuse signals, package theft claims, seller account health, fraud/risk signals, appeal outcomes, SLA, and repeat-offender status without exposing private evidence to product analytics.
- Monetization can include original marketplace commissions, shipping fees, subscription membership, Subscribe & Save-style discounts, seller services, retail media, sponsored listings, coupons/deals, gift cards, fulfillment services, or premium seller analytics later, but pricing, names, fee rates, protection claims, and promotional copy must be original and legal-reviewed.
- Sponsored listing analytics must show eligible impressions, clicks, spend, budget exhaustion, product availability, conversion attribution, invalid traffic, policy rejection, and organic/sponsored separation without dark patterns.
- Membership analytics must show benefit eligibility, delivery savings, trial conversion, cancellation, household sharing, missing-benefit disputes, refund state, and renewal communication without copying Prime naming or retention tactics.
- Seller monetization analytics must show listing fees where applicable, fulfillment cost, storage cost, return cost, ad spend, coupon/deal spend, referral/commission model, payouts, refunds, and account health impact with explainable line items.

## Edge Cases

- First launch offline, unsupported OS, expired session, underage user, account locked, blocked region, language/currency mismatch, or user denies all optional permissions.
- Address is invalid, apartment missing, gated community inaccessible, business/school/hospital policy restricted, unsafe dropoff, outside delivery zone, P.O. box item too large, or location provider inaccurate.
- Search query returns irrelevant results, only sponsored results, duplicate products, counterfeit suspect, restricted item, unavailable item, adult/age-gated item, recalled product, or region-specific compliance warning.
- Product detail has stale price, stale offer, unavailable variation, seller suspended, brand conflict, inaccurate media, missing accessibility alt text, fake review suspicion, or safety report.
- Cart includes stale inventory, seller offer expiration, mixed shipping speeds, gift options conflict, coupon expired, subscription ineligible item, hazardous item, gift card restriction, or address/product mismatch.
- Checkout starts after price changes, payment fails, gift card balance changes, tax provider is unavailable, fraud hold triggers, item goes out of stock, seller is suppressed, or duplicate order is submitted.
- Prime-style member loses benefits mid-cart, household invite is abused, renewal payment fails, trial eligibility differs by region, cancellation refund is disputed, or benefit does not apply to a seller offer.
- Subscribe & Save item changes price, seller unenrolls, stock is unavailable, shipment date conflicts with address, discount tier changes, payment fails, or cancellation occurs after cutoff.
- Package tracking is missing, first scan delayed, map tracking unavailable, delivery photo missing, package marked delivered but not found, access code missing, safe location unavailable, or recipient rejects delivery.
- Return window expired, item is non-returnable, hazardous item requires special handling, seller disputes condition, return label expires, carrier loses return, refund method fails, or replacement is unavailable.
- Review contains private data, seller/order/shipping issue, harassment, incentivized content, fake vote activity, image rights issue, or product safety claim requiring escalation.
- Seller misses shipment SLA, inventory count is wrong, FBA-style inbound shipment is delayed, product is suppressed, brand owner disputes listing, return fraud is suspected, or account health is at risk.
- Sponsored listing violates audience/product policy, campaign spends unexpectedly, organic and paid placement are confused, out-of-stock item continues showing, or advertiser targets prohibited categories.
- Data export, account deletion, address deletion, payment method deletion, gift card retention, order-history retention, seller tax retention, support case retention, law-enforcement request, fraud investigation, or legal hold conflicts with user request.

## Test Plan

- Unit tests for address validation, location permission states, product/category eligibility, product variation rules, offer selection, seller eligibility, stock reservation, and cart validation.
- Unit tests for quote line items: subtotal, item discount, coupon, gift card/credit, shipping, tax, regulatory fee, membership savings, subscription discount, total, split shipment, and quote expiry.
- Unit tests for order state machines: placed, preparing, shipped, out for delivery, delivered, attempted, delayed, canceled, returned, refunded, replaced, support escalated, and legal hold.
- Unit tests for Prime-style membership lifecycle: trial, monthly, annual, household/shared, canceled, expired, payment failed, refund requested, benefit eligible, and benefit missing.
- Unit tests for Subscribe & Save-style recurring orders: eligible item, cadence, quantity, discount tier, skip, edit, cancel, price-change acknowledgement, stockout, seller unenrolled, and payment failure.
- Unit tests for review eligibility, moderation, private-data detection, incentive-abuse flags, helpful vote abuse, seller retaliation prevention, and report/appeal states.
- Unit tests for privacy-safe analytics payload construction, sensitive field redaction, ad personalization opt-out, account deletion eligibility, data archive requests, and retention caveats.
- Contract tests for every API route, including pagination, stale data, product/offer version conflicts, quote snapshots, idempotency keys, payment webhook reconciliation, return transitions, seller operation states, and ad policy states.
- Integration tests for signed-out browsing, address setup, signed-in search, product detail, variation selection, seller offer selection, cart, checkout, payment failure recovery, order tracking, support contact, return, reorder, and review.
- Integration tests for gift card/credit flow, Prime-style membership flow, Subscribe & Save flow, price-drop/list flow, barcode/photo/voice search fallback, seller listing/order flow, and sponsored campaign flow.
- Offline tests for cached home/product/order/list reads, local cart drafts, blocked checkout/payment/membership/subscription/return/support/delete/seller/ad actions, corrupt cache, reconnect reconciliation, and stale quote warnings.
- Payment/refund tests for card failure, wallet failure, duplicate authorization, gift-card partial redemption, partial refund, full refund, replacement, promo reversal, chargeback marker, and duplicate webhook.
- Trust/safety tests for counterfeit report, unsafe product report, restricted-product checkout block, account takeover, seller fraud, return fraud, review abuse, ad policy rejection, gift card scam, and support abuse.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, product media alternatives, variation selection, cart/checkout comprehension, tracking map alternatives, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, signup/login, address validation, search ranking, barcode/photo/voice search, personalized recommendations, variation selection, cart quote refresh, checkout/payment/gift card, Prime, Subscribe & Save, order tracking, delivery map/photo/share tracking, returns/refunds/replacements, support chat, seller messaging/tools, review submission/moderation, sponsored placement, account deletion/export, household controls, restricted products, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Amazon assets, product catalogs, reviews, seller data, private APIs, brand copy, proprietary recommendation/search/ad/fulfillment/risk systems, fee formulas, policy text, or support scripts.
- New and returning users can set an address, browse categories, search/filter, inspect products, choose variations/offers, validate cart, review shipping/tax/discount/membership/subscription handling, place an order, track delivery, start a return, contact support, and recover from denied permissions or network loss.
- Seller users can create or match listings, manage inventory/prices, choose fulfillment mode, monitor orders, handle returns, review account health, create coupons/deals or sponsored campaigns, and contact support with deterministic error states.
- Checkout, payment, gift cards, taxes, shipping, Prime-style benefits, Subscribe & Save-style discounts, coupons, refunds, replacements, returns, seller payout impact, and support decisions are represented as auditable server-side state machines.
- Product safety, counterfeit reports, restricted categories, review authenticity, ad disclosures, seller fraud, payment fraud, return fraud, package theft, privacy rights, household controls, and support evidence include moderation, audit, appeal, and abuse-prevention paths.
- Location, payment data, gift cards, delivery instructions, delivery photos, reviews, support evidence, order history, ad personalization, recommendations, data export, and account deletion controls are accessible from settings and covered by tests.
- Barcode/photo/voice search, AR room preview, map tracking, delivery photos, Prime-style membership, Subscribe & Save, external-brand shopping, sponsored listings, seller tools, household controls, and restricted-product surfaces are feature-flagged until legal, provider, and manual verification clear them.

## Open Questions

- Which licensed product catalog, image/media, tax, payment, gift card, shipping/carrier, returns, fraud, review moderation, search, recommendation, ads, analytics, and notification providers will back V1?
- Which launch regions determine product restrictions, tax display, delivery options, return windows, payment methods, subscription rules, household/family rules, ad policies, and consumer refund law?
- Will V1 include marketplace sellers, seller tools, FBA-style fulfillment, sponsored listings, Prime-style membership, Subscribe & Save, gift cards, household controls, and restricted categories at launch, or keep some behind feature flags?
- Will V1 support signed-out browsing, and if yes, which address, cart, checkout, tracking, support, review, list, and privacy features remain account-gated?
- What is the accepted policy posture for price changes, list prices, coupons, deal badges, shipping/tax estimates, membership savings, subscription discounts, refunds, replacements, and seller chargebacks in each launch region?
- Which seller trust requirements are mandatory before publication: business verification, brand authorization, product compliance, tax profile, payout method, return address, customer service contact, inventory proof, and support SLA?
- What safety escalation model will cover counterfeit goods, recalled products, unsafe goods, restricted items, harassment, scams, review abuse, privacy invasion, account takeover, and law-enforcement requests?
- What original search, ranking, recommendation, ad auction, fulfillment, fraud, and support-decision model will be explainable enough for user trust and regulator expectations without copying Amazon logic?

## Build Plan

- Phase 1: scaffold app shell, auth/guest mode, address setup, Marketplace home, category browse, search/filters, product detail, variation/offer selection, cart, settings/legal links, privacy-safe analytics, and licensed product-media seed data.
- Phase 2: add quote generation, shipping/tax/discount/gift-card breakdown, checkout session, payment authorization, order placement, order history, reorder validation, support entrypoint, and checkout/order tests.
- Phase 3: add package tracking, delivery instructions, share tracking, missing-package support, push categories, offline cached order status, returns/refunds/replacements, and fulfillment reconciliation tests.
- Phase 4: add Prime-style membership, eligible benefit indicators, trial/renewal/cancel states, household sharing, benefit disputes, membership billing tests, and cancellation-path review.
- Phase 5: add Subscribe & Save-style recurring orders, eligible product prompts, cadence management, discount snapshots, skip/edit/cancel flows, pre-shipment reminders, price/stock-change handling, and subscription tests.
- Phase 6: add lists, price alerts, gift lists, review/Q&A submission, review moderation, seller/customer reporting, recommendation feedback, ad-personalization controls, and trust/safety tests.
- Phase 7: add seller operations: listing/inventory/price management, fulfillment mode, seller order handling, return management, account health, seller support, coupons/deals, FBA-style inventory, and seller operations tests.
- Phase 8: add sponsored product campaigns, disclosure rendering, budget/bid controls, policy checks, metrics, organic/sponsored diagnostics, privacy/ad preference enforcement, and retail-media tests.
- Phase 9: complete product safety, restricted-category gates, fraud/risk controls, privacy rights automation, accessibility audit, support escalation, native/manual verification, and legal/provider approvals before broad release.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Use this spec as the broad-shopping-marketplace pattern for `047-temu.md`, `048-shein.md`, `049-etsy.md`, `050-ebay.md`, and related commerce specs.
- Continue the architecture-teaching upgrades with `089-notion.md`.
