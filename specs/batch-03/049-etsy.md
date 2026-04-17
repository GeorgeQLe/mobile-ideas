# Etsy-Style Clone Spec

> Metadata
> - Inspiration app: Etsy
> - Category: Handmade, vintage, custom goods marketplace, seller tools, messaging, purchase protection, and ads
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product-policy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, favorites personalization, custom-order messaging, cart/checkout, Etsy Payments-like authorization, taxes, seller onboarding, listing creation, shipping labels, seller payouts, ads, purchase protection, cases, reviews, push notifications, data export/deletion, and regional availability require lawful test devices/accounts.
> - Legal scope: functional parity only; use original code, brand, copy, icons, product data, listing media, reviews, ranking models, ad systems, payment providers, support scripts, moderation policy, shipping logic, and dispute workflows.

## Overview

Build an original marketplace inspired by Etsy public behavior: handmade/vintage/custom item discovery, shop pages, favorites, cart across shops, checkout, messaging, reviews, purchase protection, seller listings, shipping, payments, ads, and privacy controls.

The clone must not imply affiliation with Etsy. Public-source V1 parity means the product architecture is grounded in exact public sources while all unverified native, account, payment, seller, support, notification, deletion/export, and regional behavior remains launch-blocked until lawful hands-on verification is captured.

## Goals

- Support the public-source V1 buyer journey for Etsy: discovery, listing detail, saved state, transaction draft, checkout or handoff, order tracking, support, and privacy controls.
- Support shop operations where public behavior requires listing creation, inventory or availability, pricing, order handling, shipping, fees, payouts, reports, and appeals.
- Make trust and safety explicit for prohibited goods, counterfeit or quality risk, scams, off-platform payments, review abuse, support evidence, privacy, and regional rules.
- Provide concrete screens, entities, API contracts, offline/realtime behavior, analytics, edge cases, tests, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Etsy-branded app or imply affiliation with Etsy, parent companies, sellers, carriers, payment providers, ad products, or support programs.
- Do not copy branding, logos, screenshots, product photos, marketplace copy, private APIs, ranking systems, seller data, buyer data, messages, reviews, support scripts, fraud models, or policy text.
- Do not scrape production catalogs or reuse protected media; use licensed, synthetic, partner-provided, or user-owned data.
- Do not process production payments, refunds, payouts, financing, identity checks, regulated goods, or disputes without separate legal, compliance, trust/safety, and payment-provider review.
- Do not claim exact native-device, checkout, payment, notification, support, deletion/export, moderation, seller, shipping, payout, or region-specific parity until lawful manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/etsy-shop-gifts-goods/id477128284 | Official iOS listing, marketplace positioning, buyer/seller surfaces, privacy labels, and current app notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.etsy.android | Official Android listing, package id, Shopping category, app positioning, data safety, and support contact | Verified 2026-04-17 |
| Etsy Help Center | https://help.etsy.com/hc/en-us | Buyer, seller, order, payment, shipping, case, privacy, and account support entrypoint | Verified 2026-04-17 |
| Privacy Policy | https://www.etsy.com/legal/privacy | Personal data, marketplace activity, communications, ads, sharing, retention, and rights | Verified 2026-04-17 |
| Terms of Use | https://www.etsy.com/legal/terms-of-use | Legal account, marketplace, content, purchase, seller, and dispute obligations | Verified 2026-04-17 |
| Etsy Payments Policy | https://www.etsy.com/legal/etsy-payments | Payment processing, disbursement, refunds, reserves, and seller payout obligations | Verified 2026-04-17 |
| Fees and Payments Policy | https://www.etsy.com/legal/fees | Listing fees, transaction fees, payment fees, ads, currency, and tax-related seller obligations | Verified 2026-04-17 |
| Prohibited Items Policy | https://www.etsy.com/legal/prohibited | Restricted and prohibited marketplace goods and enforcement requirements | Verified 2026-04-17 |
| Purchase Protection Program | https://help.etsy.com/hc/en-us/articles/5850122619287-Etsy-Purchase-Protection-Program-for-Buyers | Buyer protection eligibility, cases, refunds, and order issue handling | Verified 2026-04-17 |
| Seller Handbook | https://www.etsy.com/seller-handbook | Seller education for listings, shops, SEO, shipping, photography, operations, and growth | Verified 2026-04-17 |
| Etsy Ads Help | https://help.etsy.com/hc/en-us/articles/360000338367-How-Etsy-Ads-Works | Public ad placement, budgets, promoted listings, reporting, and seller controls | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must expose search, gift modules, categories, favorites, cart, conversations, orders, seller entrypoints, and privacy/support links.
- Search must support text, category, handmade/vintage/custom filters, price, shop location, delivery date, free shipping, personalization availability, reviews, and ad disclosure.
- Listing detail must include media, title, price, variations, personalization fields, seller/shop profile, shipping/returns, estimated delivery, reviews, item details, favorite/save, message seller, report listing, and cart.
- Cart must support multi-shop grouping, shipping profiles, personalization validation, quantity, coupon/promo, gift message where implemented, tax/fees, and stale checks.
- Seller listing tools must support draft/publish, media, taxonomy, tags, attributes, variations, personalization, inventory, pricing, processing time, shipping, returns, policies, and prohibited-item screening.
- Ads must clearly disclose paid placements, separate ad diagnostics from organic ranking, and expose seller budget, listing eligibility, spend, and performance.
- Account settings must expose profile, addresses, payment tokens where applicable, saved items, orders, returns/refunds or claims, notifications, privacy settings, data export, account deletion, support, and legal links.
- Every money movement, identity, seller payout, return/refund, support decision, and moderation action must be server-owned, idempotent, auditable, and reversible only through explicit policy rules.
- Every public-source requirement that still depends on account, device, payment, notification, or regional behavior must remain launch-blocked until lawful hands-on notes are captured.

### Build Plan

1. Foundation: model accounts, regions, item/listing records, media, search, saved items, privacy settings, support cases, audit logs, and synthetic fixtures.
2. Discovery and detail: build home, search, filters, item/listing detail, seller/store/profile surfaces, recommendation placeholders, and moderation labels.
3. Commerce path: add cart, offer, bid, bundle, or checkout drafts, quote refresh, payment-token placeholder, taxes/fees, shipping options, order creation, tracking timeline, cancellation, and support handoff behind provider adapters.
4. Marketplace trust: add buyer/seller protection states, return/refund/dispute workflows, prohibited-item checks, counterfeit or quality reports, review integrity, fraud queues, and appeal paths.
5. Seller operations: add listing creation, inventory/availability, pricing/offer controls, order fulfillment, shipping labels or handoff, payout ledger, seller support, account health, and policy enforcement where applicable.
6. Native hardening: verify iOS/Android layouts, permissions, push payloads, accessibility, offline reconciliation, account deletion/export, and region-specific behavior with lawful test devices/accounts.

## Core User Journeys

- Buyer searches for a custom gift, filters by delivery date and personalization, messages a seller, adds a personalized variation to cart, and checks out across shops.
- Seller creates a listing with variations and shipping profile, receives an order, purchases or enters tracking, messages the buyer, and receives payout.
- Customer opens a not-received case, seller submits tracking evidence, support decides protection eligibility, and both parties see case history.
- Privacy-focused user opens settings, changes notification and personalization controls, requests data export, starts account deletion, and sees active-order, tax, fraud, support, and legal-retention caveats.
- Trust reviewer receives a prohibited-item, counterfeit, scam, harassment, or policy report, reviews evidence, suppresses or restores the Listing, notifies affected users, and records appeal state.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, consent, and regional setup | email, phone, passkey, guest | guest, signed-in, verified, blocked | auth failure, underage, unsupported region |
| Home | Primary discovery and status hub | search, category, saved, cart/order | guest, personalized, loading, empty | stale modules, service outage |
| Search And Filters | Find products, listings, shops, or merchants | query, category, filters, sort | results, no results, corrected query | restricted category, provider error |
| Item Detail | Product/listing media, seller context, price, and actions | variation, save, offer, buy, report | available, limited, sold, restricted | price changed, policy flag, seller inactive |
| Seller Or Store Profile | Public seller, shop, closet, or merchant context | follow, message, listings, report | active, limited, suspended, empty | account restriction, policy investigation |
| Transaction Draft | Cart, bag, offer, bid, bundle, or checkout draft | quantity, offer, coupon, shipping | valid, pending, expired, needs refresh | stockout, quote expired, invalid promo |
| Checkout | Address, payment, shipping, fees, and confirmation | address, payment, reward, confirm | ready, authorizing, placed, failed | payment failure, fraud hold, ineligible item |
| Orders And Tracking | Order history, shipment status, and actions | order tap, tracking, help, return | processing, shipped, delivered, canceled | missing tracking, delayed, wrong item |
| Returns Claims And Refunds | Post-order recovery and dispute handling | reason, evidence, label, appeal | eligible, open, reviewing, resolved | expired window, seller dispute, legal hold |
| Messages And Support | Buyer/seller messages and support cases | message, attachment, issue, evidence | active, archived, blocked, resolved | off-platform payment, harassment, duplicate case |
| Seller Tools | Listing, inventory, orders, shipping, ads, and payouts | media, price, order, payout, campaign | draft, active, paused, held | policy violation, payout hold, account limit |
| Settings And Privacy | Account, notifications, security, and data rights | toggles, export, delete, legal links | verified, pending, disabled | active order block, retention caveat |

## Data Model

- User: identity, locale, region, buyer/seller roles, consent, notification preferences, privacy settings, risk flags, data-rights lifecycle.
- DeviceSession: platform, app version, auth token, notification token, permission states, cache version, and last-active timestamp.
- Listing: public title, description, category, media metadata, price or market state, availability, policy flags, moderation state, and source-specific attributes.
- ShopProfile: public profile, verification state, ratings or performance, account health, shipping/support policies, payout readiness, and enforcement history.
- CartOrTransactionDraft: user/session, selected items, offers or bids, shipping choices, coupon/reward state, quote snapshot, stale flags, and validation errors.
- CheckoutQuote: subtotal, discounts, rewards, shipping, tax/fees, buyer/seller protection, payment eligibility, total, expiry, and explainability lines.
- PaymentToken: provider reference, billing details, verification state, challenge state, failure reason, and deletion constraints.
- Order: transaction snapshot, payment state, fulfillment groups, tracking ids, cancellation/return/refund/claim state, support links, and audit ids.
- Shipment: carrier, tracking events, delivery estimate, label source, delivery confirmation, exception state, and reconciliation timestamps.
- ReturnRefundOrClaim: order/item link, issue type, evidence, eligibility, decision, refund or replacement, appeal, owner queue, and legal hold.
- MessageOrSupportCase: participants, order/listing/payment links, attachments, moderation flags, SLA, decision, appeal, and retention policy.
- ReviewOrRating: transaction eligibility, rating, text/media, seller response where allowed, report state, moderation state, and publication timing.
- RewardPromotionOrAd: source, eligibility, budget or balance, expiration, disclosure, redemption/spend, reversal, and abuse state.
- AuditEvent: append-only record for auth, profile, listing, search, cart, checkout, payment, shipment, return/refund, message, support, payout, privacy, and moderation changes.

## API And Backend Contracts

- POST /auth/session, POST /auth/recover, DELETE /auth/session: account lifecycle with age, region, verification, fraud, and device gates.
- GET /home?region=&cursor= and GET /categories: discovery modules, saved states, promotions, personalization, pagination, and stale indicators.
- GET /search?query=&filters=&sort=&cursor=: listing discovery with facets, sponsored/promoted disclosure where relevant, safe-category suppression, and no-result recovery.
- GET /items/:id: listing detail, media, seller/store context, availability, pricing, reviews, shipping, protection, and policy warnings.
- POST /drafts, PATCH /drafts/:id, POST /drafts/:id/validate: cart, offer, bid, bundle, or checkout draft with stock/price/eligibility refresh.
- POST /checkout/quotes and GET /checkout/quotes/:id: taxes, fees, shipping, discounts, rewards, protection, total, expiry, and line-item explainability.
- POST /orders and POST /payments/webhooks: idempotent order creation, payment authorization, duplicate webhook handling, and failure recovery.
- GET /orders, GET /orders/:id, GET /shipments/:id/events: order history, tracking timeline, delivery exceptions, and support affordances.
- POST /returns-or-claims, PATCH /returns-or-claims/:id, POST /returns-or-claims/:id/evidence: post-order recovery and appeal lifecycle.
- POST /messages, POST /support/cases, POST /reports: buyer/seller communication, support routing, and abuse or policy reports.
- POST /seller/listings, PATCH /seller/listings/:id, GET /seller/orders, GET /seller/payouts: seller operations where in scope.
- POST /data-export, GET /data-export/:id, DELETE /account: privacy rights with security checks and retention caveats.

## Realtime, Push, And Offline Behavior

- Order, payment, shipment, return/refund, claim, listing, inventory, offer, bid, message, payout, moderation, notification, and account-security changes must use websocket/SSE/push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache home modules, search history, item summaries, saved items, transaction drafts, order summaries, message previews, settings, support status, and tracking events with visible freshness timestamps.
- Checkout quotes, taxes, fees, shipping promises, buyer/seller protection eligibility, seller availability, reward balances, payment authorization, and payout state must expire server-side and refresh before confirmation.
- Offline mode may preserve low-risk drafts such as searches, saved items, listing drafts, message drafts, review drafts, and support evidence, but money movement, identity, checkout, seller payout, deletion/export, and moderation decisions require server confirmation.
- Push payloads must be minimal, avoid sensitive product names when the user opts out, and deep-link through authenticated refresh rather than trusting client-side state.

## Permissions, Privacy, And Safety

- Request camera, photo library, microphone, contacts, location, calendar, email-import, notification, and biometric permissions only at the feature moment and provide non-permission fallbacks.
- Tokenize payment methods, shipping addresses, payout accounts, identity evidence, support evidence, and connected-account credentials; never store raw card, bank, document, email, or carrier credentials in the mobile client.
- Keep messages, addresses, tracking details, return reasons, claim evidence, payout data, moderation notes, and support decisions access-controlled with role-based audit logs.
- Expose controls for personalization, ad measurement, push categories, search history, saved items, connected accounts, data export, and account deletion with retention caveats for tax, fraud, order, support, and legal records.
- Block prohibited goods, unsafe products, counterfeit indicators, off-platform payment requests, harassment, review manipulation, fraud, sanctions risk, underage use, and regulated categories with review queues and appeal paths.
- Accessibility requirements include dynamic type, screen-reader labels, keyboard order, reduced motion, sufficient contrast, non-color status indicators, and alternative text for user-uploaded media where feasible.

## Analytics And Monetization

- Track discovery impressions, searches, filters, item views, saved items, transaction draft starts, checkout conversion, payment failures, tracking opens, return/refund or claim starts, seller actions, support contacts, policy reports, notification engagement, and privacy changes.
- Monetization may include marketplace fees, payment services, shipping labels, promoted placements, reward campaigns, seller tools, or merchant services only with clear disclosure and opt-outs.
- Track privacy setting changes, permission grants/denials, data export requests, deletion starts, report outcomes, support contacts, and unresolved manual-verification blockers separately from business metrics.
- Do not use private messages, payment data, addresses, identity documents, connected email content, support evidence, claim photos, or moderation notes for ad targeting.

## Edge Cases

- A reward, coupon, bid, offer, price, shipping promise, or eligibility state changes while the user is confirming checkout.
- A seller or merchant becomes unavailable after the buyer starts a transaction draft.
- A shipment is marked delivered while the buyer reports missing, damaged, or wrong item.
- Refund destination is unavailable because a payment token, wallet, reward balance, or payout method changed.
- A listing is reported as counterfeit, unsafe, recalled, prohibited, or infringing after orders have already been placed.
- A message thread contains private contact details, harassment, phishing, or off-platform payment pressure.
- Account deletion is requested with active orders, returns, claims, support cases, seller payouts, tax records, or legal holds.
- Regional availability changes payment methods, buyer protection, seller fees, shipping, returns, or policy wording.

## Test Plan

- Validate exactly one H1 and all canonical sections.
- Validate all exact source URLs are first-party marketplace/help/privacy/legal/product URLs and no generic source placeholders remain.
- Unit test search filters, item/listing status, quote expiry, promotion/reward rules, permission fallbacks, and privacy toggles.
- Unit test prohibited-item, counterfeit/scam, payment, payout, return/refund, dispute, support, and moderation state machines.
- Integration test account, discovery, detail, saved item, transaction draft, checkout or handoff, order, shipment, return/refund, support, and data-rights flows.
- Integration test seller listing, order handling, shipping label or tracking handoff, payout, account health, ads/promotions, and appeal flows where in scope.
- Contract test idempotent order creation, webhook replay, refund reversal, payout hold, claim update, and push deep-link refresh.
- Accessibility test dynamic type, screen readers, focus order, reduced motion, contrast, media alt text, and non-color status indicators.
- Security test payment tokenization, private messages, evidence access control, signed media uploads, connected-account revocation, account deletion, and audit logs.
- Abuse test off-platform payment, spam, harassment, prohibited goods, review manipulation, counterfeit claims, and seller/buyer retaliation.
- Offline test cached discovery/detail/order states, draft preservation, stale quote warnings, and reconnect reconciliation.
- Manual test native iOS/Android screens and all blockers before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party App Store, Google Play, help/support, privacy/legal, and category-policy URLs replace generic research placeholders.
- Every account, payment, checkout, refund/return, payout, seller, support, notification, deletion/export, and native-device behavior that lacks lawful hands-on verification remains explicitly blocked.
- The downstream implementation can derive screens, entities, backend contracts, realtime/offline behavior, analytics, risk controls, edge cases, tests, and build phases without unstated product assumptions.

## Open Questions

- Which custom-order and offer mechanics are visible in current native buyer apps by region?
- What exact seller onboarding, identity, tax, fee, and payout screens appear in mobile versus web?
- Which Etsy Ads controls are available in mobile seller surfaces?
- What push payloads are used for messages, favorites, orders, cases, reviews, ads, and seller payouts?

## Next Steps

- Use lawful test accounts/devices to verify native screens, onboarding, checkout, payment authorization, push notifications, support, data rights, and region-specific behavior before removing blockers.
- Create synthetic listings, sellers, products, reviews, orders, tracking events, disputes, support cases, and payout or reward records for implementation test fixtures.
- Run legal, trust/safety, payments, privacy, accessibility, and marketplace-risk review before enabling production transactions or seller operations.
