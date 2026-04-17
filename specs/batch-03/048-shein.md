# SHEIN-Style Clone Spec

> Metadata
> - Inspiration app: SHEIN
> - Category: Fashion commerce, marketplace retail, promotions, sizing, returns, and social shopping
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product-policy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, style feed personalization, size recommendation, user community features, SHEIN LIVE/calendar behavior, coupons/points/VIP/wallet, cart quote refresh, payment authorization, buy-now-pay-later, checkout, order tracking, returns/refunds, support chat, review/media upload, data export/deletion, push notifications, seller/marketplace behavior, and regional availability require lawful test devices/accounts.
> - Legal scope: functional parity only; use original code, brand, copy, icons, product data, listing media, reviews, ranking models, ad systems, payment providers, support scripts, moderation policy, shipping logic, and dispute workflows.

## Overview

Build an original mobile fashion shopping app inspired by SHEIN public behavior: trend-led discovery, category browsing, product detail with size/fit context, reviews and user media, bag/checkout, coupons/points, order tracking, returns/refunds, customer service, and privacy controls.

The clone must not imply affiliation with SHEIN. Public-source V1 parity means the product architecture is grounded in exact public sources while all unverified native, account, payment, seller, support, notification, deletion/export, and regional behavior remains launch-blocked until lawful hands-on verification is captured.

## Goals

- Support the public-source V1 buyer journey for SHEIN: discovery, product detail, saved state, transaction draft, checkout or handoff, order tracking, support, and privacy controls.
- Support store operations where public behavior requires listing creation, inventory or availability, pricing, order handling, shipping, fees, payouts, reports, and appeals.
- Make trust and safety explicit for prohibited goods, counterfeit or quality risk, scams, off-platform payments, review abuse, support evidence, privacy, and regional rules.
- Provide concrete screens, entities, API contracts, offline/realtime behavior, analytics, edge cases, tests, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a SHEIN-branded app or imply affiliation with SHEIN, parent companies, sellers, carriers, payment providers, ad products, or support programs.
- Do not copy branding, logos, screenshots, product photos, marketplace copy, private APIs, ranking systems, seller data, buyer data, messages, reviews, support scripts, fraud models, or policy text.
- Do not scrape production catalogs or reuse protected media; use licensed, synthetic, partner-provided, or user-owned data.
- Do not process production payments, refunds, payouts, financing, identity checks, regulated goods, or disputes without separate legal, compliance, trust/safety, and payment-provider review.
- Do not claim exact native-device, checkout, payment, notification, support, deletion/export, moderation, seller, shipping, payout, or region-specific parity until lawful manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/shein-shopping-online/id878577184 | Official iOS listing, developer, category, permissions, promotions, payment methods, support, and privacy labels | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.zzkko | Official Android listing, package id, download scale, category, promotions, data safety, and support notes | Verified 2026-04-17 |
| SHEIN Customer Care | https://us.shein.com/contact-us.html | Support entrypoint for orders, payment, delivery, returns, account, and service contact | Verified 2026-04-17 |
| Privacy Center | https://us.shein.com/Privacy-Center-a-1060.html | Privacy rights, account data, personalization, tracking, and data-rights orientation | Verified 2026-04-17 |
| Terms and Conditions | https://us.shein.com/Terms-and-Conditions-a-399.html | Legal terms for account use, purchases, payments, promotions, content, and disputes | Verified 2026-04-17 |
| Return Policy | https://us.shein.com/Return-Policy-a-281.html | Return eligibility, return window, shipping, refunds, and excluded-item orientation | Verified 2026-04-17 |
| Shipping Info | https://us.shein.com/Shipping-Info-a-280.html | Shipping methods, tracking, delivery timing, and logistics expectations | Verified 2026-04-17 |
| SHEIN Points | https://us.shein.com/SHEIN-Points-a-317.html | Point earning, redemption, expiration, and reward mechanics | Verified 2026-04-17 |
| SHEIN homepage | https://us.shein.com/ | Public category, trend, product detail, price, review, shopping security, and promotion evidence | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must expose search, category tabs, new arrivals, trends, best sellers, flash sales, personalized picks, bag, wishlist, account, coupons/points, orders, and support.
- Search and browse must support text, category hierarchy, size, color, style, price, brand/store, material, shipping, sale, review, and availability filters.
- Product detail must include media gallery, title, SKU-like identifiers, price, sale price, variations, size guide, fit measurements, reviews, user media, shipping, return eligibility, and add-to-bag.
- Size and fit assistance must use original sizing tables and user-entered measurements; do not infer body data without consent and explain uncertainty.
- Coupons, points, flash sales, first-order offers, and VIP-style tiers must show source, expiration, exclusions, minimum spend, stacking rules, and revocation states.
- Community, review, live, outfit, and media upload features must moderate copyrighted content, private data, harmful body/beauty claims, spam, harassment, and review abuse.
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

- New shopper browses trends, filters by size/category, reviews measurements and user photos, adds a variation to bag, applies a coupon, and checks out.
- Returning shopper claims points, sees expiring coupon, edits bag quantity, handles price refresh, and completes payment after address validation.
- User denies notifications and calendar access for a live event, receives an in-app reminder fallback, and can update permissions later.
- Customer starts a return for multiple items, sees excluded categories, chooses refund destination, tracks refund status, and escalates if rejected.
- Privacy-focused user opens settings, changes notification and personalization controls, requests data export, starts account deletion, and sees active-order, tax, fraud, support, and legal-retention caveats.
- Trust reviewer receives a prohibited-item, counterfeit, scam, harassment, or policy report, reviews evidence, suppresses or restores the FashionItem, notifies affected users, and records appeal state.

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

- SizeProfile: user-entered measurements, preferred fit, unit system, consent state, retention, and deletion markers.
- CouponPointLedger: earn source, amount, currency/points, eligibility, expiration, redemption, reversal, and abuse state.
- ReviewContent: order eligibility, rating, text, media, size/fit tags, moderation state, and reports.
- User: identity, locale, region, buyer/seller roles, consent, notification preferences, privacy settings, risk flags, data-rights lifecycle.
- DeviceSession: platform, app version, auth token, notification token, permission states, cache version, and last-active timestamp.
- FashionItem: public title, description, category, media metadata, price or market state, availability, policy flags, moderation state, and source-specific attributes.
- StoreProfile: public profile, verification state, ratings or performance, account health, shipping/support policies, payout readiness, and enforcement history.
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

- GET /size-guides/:category and PATCH /users/me/size-profile: measurement tables and consented size profile updates.
- GET /coupons, GET /points, POST /drafts/:id/apply-coupon, POST /drafts/:id/redeem-points: reward lifecycle and abuse controls.
- POST /auth/session, POST /auth/recover, DELETE /auth/session: account lifecycle with age, region, verification, fraud, and device gates.
- GET /home?region=&cursor= and GET /categories: discovery modules, saved states, promotions, personalization, pagination, and stale indicators.
- GET /search?query=&filters=&sort=&cursor=: fashionitem discovery with facets, sponsored/promoted disclosure where relevant, safe-category suppression, and no-result recovery.
- GET /items/:id: fashionitem detail, media, seller/store context, availability, pricing, reviews, shipping, protection, and policy warnings.
- POST /drafts, PATCH /drafts/:id, POST /drafts/:id/validate: cart, offer, bid, bundle, or checkout draft with stock/price/eligibility refresh.
- POST /checkout/quotes and GET /checkout/quotes/:id: taxes, fees, shipping, discounts, rewards, protection, total, expiry, and line-item explainability.
- POST /orders and POST /payments/webhooks: idempotent order creation, payment authorization, duplicate webhook handling, and failure recovery.
- GET /orders, GET /orders/:id, GET /shipments/:id/events: order history, tracking timeline, delivery exceptions, and support affordances.
- POST /returns-or-claims, PATCH /returns-or-claims/:id, POST /returns-or-claims/:id/evidence: post-order recovery and appeal lifecycle.
- POST /messages, POST /support/cases, POST /reports: buyer/seller communication, support routing, and abuse or policy reports.
- POST /seller/products, PATCH /seller/products/:id, GET /seller/orders, GET /seller/payouts: seller operations where in scope.
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

- Track trend impressions, search/filter use, size-guide opens, size-profile consent, review/media engagement, wishlist adds, bag edits, coupon/point application, checkout conversion, BNPL selection, returns, support, and privacy changes.
- Monetization may include retail margin, marketplace commission, promoted placements, coupons, loyalty, BNPL referral revenue where lawful, and seller services with clear disclosure.
- Track privacy setting changes, permission grants/denials, data export requests, deletion starts, report outcomes, support contacts, and unresolved manual-verification blockers separately from business metrics.
- Do not use private messages, payment data, addresses, identity documents, connected email content, support evidence, claim photos, or moderation notes for ad targeting.

## Edge Cases

- Size chart uses garment measurements while user expects body measurements.
- Points expire while the bag is open.
- BNPL provider rejects eligibility after quote generation.
- User media includes private data or copyrighted content.
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

- Which SHEIN community, live, calendar, and social interaction surfaces are currently available by region and platform?
- What exact size recommendation behavior appears in native apps, and which measurements are stored locally versus server-side?
- Which wallet, coupon, point, and VIP rules apply to U.S. accounts as of the current app release?
- What push payloads are used for drops, price changes, order updates, returns, support, and live events?

## Next Steps

- Use lawful test accounts/devices to verify native screens, onboarding, checkout, payment authorization, push notifications, support, data rights, and region-specific behavior before removing blockers.
- Create synthetic products, sellers, products, reviews, orders, tracking events, disputes, support cases, and payout or reward records for implementation test fixtures.
- Run legal, trust/safety, payments, privacy, accessibility, and marketplace-risk review before enabling production transactions or seller operations.
