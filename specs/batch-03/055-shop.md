# Shop-Style Clone Spec

> Metadata
> - Inspiration app: Shop by Shopify
> - Category: Shopping companion, package tracking, Shop Pay wallet, Shop Cash, merchant discovery, and order updates
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, first-party help/support pages, privacy/legal pages, product-policy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screens, signup/login, email connection/import, order-source parsing, Shop Pay wallet verification, passkeys/SMS codes, installments, Shop Cash earning/redemption, merchant discovery ranking, in-app checkout, package tracking maps, return/support handoff, push payloads, data export/deletion, and regional availability require lawful test devices/accounts.
> - Legal scope: functional parity only; use original code, brand, copy, icons, product data, listing media, reviews, ranking models, ad systems, payment providers, support scripts, moderation policy, shipping logic, and dispute workflows.

## Overview

Build an original shopping companion inspired by Shop public behavior: package tracking, email/order-source imports, merchant and product discovery, Shop Pay-style accelerated wallet, Shop Cash-style rewards, saved products, collections, merchant follows, push updates, order details, returns/support handoff, and privacy controls.

The clone must not imply affiliation with Shop by Shopify. Public-source V1 parity means the product architecture is grounded in exact public sources while all unverified native, account, payment, seller, support, notification, deletion/export, and regional behavior remains launch-blocked until lawful hands-on verification is captured.

## Goals

- Support the public-source V1 buyer journey for Shop by Shopify: discovery, product detail, saved state, transaction draft, checkout or handoff, order tracking, support, and privacy controls.
- Support merchant operations where public behavior requires listing creation, inventory or availability, pricing, order handling, shipping, fees, payouts, reports, and appeals.
- Make trust and safety explicit for prohibited goods, counterfeit or quality risk, scams, off-platform payments, review abuse, support evidence, privacy, and regional rules.
- Provide concrete screens, entities, API contracts, offline/realtime behavior, analytics, edge cases, tests, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Shop by Shopify-branded app or imply affiliation with Shop by Shopify, parent companies, sellers, carriers, payment providers, ad products, or support programs.
- Do not copy branding, logos, screenshots, product photos, marketplace copy, private APIs, ranking systems, seller data, buyer data, messages, reviews, support scripts, fraud models, or policy text.
- Do not scrape production catalogs or reuse protected media; use licensed, synthetic, partner-provided, or user-owned data.
- Do not process production payments, refunds, payouts, financing, identity checks, regulated goods, or disputes without separate legal, compliance, trust/safety, and payment-provider review.
- Do not claim exact native-device, checkout, payment, notification, support, deletion/export, moderation, seller, shipping, payout, or region-specific parity until lawful manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/shop-all-your-favorite-brands/id1223471316 | Official iOS listing, package tracker, brand shopping, saved items, Shop Pay wallet, email scanning, privacy labels, and current notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.shopify.arrive | Official Android listing, package id, download scale, Shop Cash, Shop Pay, tracking, data safety, and support contact | Verified 2026-04-17 |
| Shop Help Center - Track Orders | https://help.shop.app/hc/en-us/articles/360058869972-Automatically-track-orders | Automatic/manual tracking, Gmail/Outlook connection, forwarding, tracking number handling, and order sources | Verified 2026-04-17 |
| Shop App Customer Experience | https://help.shopify.com/en/manual/online-sales-channels/shop/customer-experience | Customer capabilities: tracking, discovery, purchases, saved products, search, Shop Cash, installments, and sync | Verified 2026-04-17 |
| Delivery Tracking With Shop | https://help.shopify.com/en/manual/online-sales-channels/shop/delivery-tracking | Merchant tracking setup, Shop app status updates, push notifications, live map tracking, and order status links | Verified 2026-04-17 |
| Shop Merchant Guidelines | https://help.shopify.com/en/manual/online-sales-channels/shop/eligibility | Merchant eligibility, product restrictions, tax, responsibility for delivery/support/refunds, and moderation | Verified 2026-04-17 |
| Shop Cash | https://help.shopify.com/en/manual/payments/shop-cash | Reward earning/redemption, region eligibility, merchant payout, refund handling, and analytics implications | Verified 2026-04-17 |
| Using Shop Pay | https://help.shop.app/en/shop/shop-pay/overview | Wallet contents, saved payment/shipping details, app wallet management, and security orientation | Verified 2026-04-17 |
| Shop Pay Customer Experience | https://help.shopify.com/en/manual/payments/shop-pay/shop-pay | Checkout verification, passkeys/SMS/email codes, pickup/local delivery, supported methods, and installments | Verified 2026-04-17 |
| Shopify Privacy Policy | https://www.shopify.com/legal/privacy | Consumers using Shop/Shop Pay, personal data, rights, retention, cookies, and machine learning | Verified 2026-04-17 |
| Shopify App Store - Shop | https://apps.shopify.com/Shop | Merchant-facing Shop channel positioning, product sync, order sync, analytics, Shop Pay, and Shop Minis | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Order tracking must support automatic import from supported email/order sources, manual tracking number entry, carrier updates, live map where verified, delivery notifications, and stale carrier states.
- Email connection must explain scan scope, provider, keywords/order-source limits, revocation, retention, and manual fallback before authorization.
- Shop Pay-like wallet must store email, phone, shipping addresses, payment token references, verification method, passkey/SMS/email challenge state, and deletion controls.
- Shop Cash-like rewards must show region eligibility, earning source, redemption rules, boost offers, expiration, refund behavior, and merchant payout implications.
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

- Shopper connects Gmail or Outlook after consent, imported shipments appear, carrier updates arrive by push, and user manually adds missing tracking number.
- Shopper follows a brand, saves products into a collection, receives restock alert, checks out with wallet verification, earns rewards, and tracks order.
- Merchant activates sales channel, syncs products and tracking, reviews eligibility restrictions, and sees Shop-originated analytics.
- Privacy-focused user opens settings, changes notification and personalization controls, requests data export, starts account deletion, and sees active-order, tax, fraud, support, and legal-retention caveats.
- Trust reviewer receives a prohibited-item, counterfeit, scam, harassment, or policy report, reviews evidence, suppresses or restores the ShopProduct, notifies affected users, and records appeal state.

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
- ShopProduct: public title, description, category, media metadata, price or market state, availability, policy flags, moderation state, and source-specific attributes.
- MerchantProfile: public profile, verification state, ratings or performance, account health, shipping/support policies, payout readiness, and enforcement history.
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
- GET /search?query=&filters=&sort=&cursor=: shopproduct discovery with facets, sponsored/promoted disclosure where relevant, safe-category suppression, and no-result recovery.
- GET /items/:id: shopproduct detail, media, seller/store context, availability, pricing, reviews, shipping, protection, and policy warnings.
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

- Which order-source import providers and scopes are current in native iOS/Android apps?
- What exact Shop Pay wallet, Shop Cash, installments, and verification screens are mobile-visible by region?
- Which merchant support/return handoffs occur in-app versus browser or merchant site?
- What push payloads are used for shipping milestones, delivery, restocks, price drops, rewards, and wallet security?

## Next Steps

- Use lawful test accounts/devices to verify native screens, onboarding, checkout, payment authorization, push notifications, support, data rights, and region-specific behavior before removing blockers.
- Create synthetic products, sellers, products, reviews, orders, tracking events, disputes, support cases, and payout or reward records for implementation test fixtures.
- Run legal, trust/safety, payments, privacy, accessibility, and marketplace-risk review before enabling production transactions or seller operations.
