# Webull-Style Clone Spec

> Metadata
> - Inspiration app: Webull
> - Category: trading and brokerage app, secure onboarding, portfolio, watchlists, trading simulation, options/crypto blockers, market data, community, alerts, and support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, support/help, privacy, terms, reward/membership/seller-program, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, seller/worker eligibility where relevant, payment/purchase/payout state, permission prompts, push notifications, provider integrations, store/merchant/courier/seller availability, catalog/menu/product inventory, pricing/tax/fee correctness, reward/membership/offer redemption, return/refund/order/support behavior, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary catalog/menu/product data, maps, media, private APIs, recommendation models, customer/seller/courier data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile product inspired by Webull's public product and policy materials. V1 focuses on secure brokerage onboarding, portfolio dashboard, watchlists, quote/detail pages, trading-ticket simulation, options and crypto blockers, market-data licensing, alerts, community surfaces, support, and compliance controls. The clone must use original branding, original UI copy, original sample data, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support secure brokerage onboarding, portfolio dashboard, watchlists, quote/detail pages, trading-ticket simulation, options and crypto blockers, market-data licensing, alerts, community surfaces, support, and compliance controls with clear retry, recovery, unavailable, region, entitlement, inventory, seller, and provider-aware states.
- Preserve boundaries between customer, identity, account, balance, transaction, card, payment, transfer, deposit, alert, statement, reward, dispute, fraud, support, compliance, and banking-provider data.
- Implement guest, member, free, paid, expired, restored, refunded, seller-ineligible, store-owned, web-owned, provider-owned, region-blocked, and unavailable states without copying exact pricing, plan names, promotions, reward terms, seller terms, or worker policies.
- Include export/delete, support/report flows, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog/menu/product, location, payment/payout, device/permission, seller/safety, advertising, claim-substantiation, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with Webull or its publisher.
- Do not copy proprietary feeds, menus, product catalogs, prices, promotions, media, artwork, recommendation models, screenshots, icons, brand names, seller policies, worker policies, or private API shapes.
- Do not send production user order, payment, payout, precise-location, loyalty, support, seller, delivery, scan, image, or try-on telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present nutrition, allergen, price, delivery-time, reward, membership, earnings, authenticity, warranty, fit, sizing, product safety, inventory, or availability output as professional, medical, legal, financial, employment, tax, or safety-critical advice.
- Do not enable autonomous purchases, account changes, seller-status changes, public listing changes, regulated workflows, age-restricted purchases, delivery dispatch, payout changes, returns, or irreversible external actions without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.webull.com/ | Public product positioning, shopping, delivery, catalog, marketplace, membership, account, and app behavior | Verified 2026-05-04 |
| Support/help center | https://www.webull.com/help | Public support taxonomy for account, ordering, payment, pickup, shipping, returns, seller, loyalty, troubleshooting, and deletion/export flows | Verified 2026-05-04 |
| Privacy policy | https://www.webull.com/privacy | Account, profile, order, listing, location, device, advertising, analytics, support, seller, and user-rights handling | Verified 2026-05-04 |
| Terms of service | https://www.webull.com/terms | Service usage, licensed content, payments, returns, marketplace conduct, seller/buyer limits, prohibited goods, and legal boundaries | Verified 2026-05-04 |
| Rewards, membership, or seller program | https://www.webull.com/pricing | Reward, membership, loyalty, seller, service, authenticity, or entitlement orientation where public | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/webull-investing-trading/id1179213067 | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=org.dayup.stocks | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, payment, push payloads, background location, provider integrations, regional availability, catalog/inventory, seller eligibility, payout, return, refund, and support behavior | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest or signed-out preview where allowed, account creation or restore, seller onboarding where relevant, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful order, listing, shopping, reward, membership, seller, store/merchant, and support state with signed-out, loading, empty, degraded-network, and stale-data variants.
- Store, merchant, address, seller zone, or location selection must distinguish GPS, manual search, saved/favorite locations, current hours, services, pickup/delivery/shipping/worker availability where relevant, and unavailable-region states.
- Catalog, menu, product, listing, service, batch, or offer browse must support categories, search, filters, availability, price/fee freshness, promotion labels, seller/route previews where relevant, safety notes, and original sample data.
- Detail screens must show availability, provider timestamp, rights state, seller/merchant disclosure, safety labels where relevant, save/favorite/share actions, and manual-verification warnings for native-only behavior.
- Cart, basket, offer, wallet, checkout, reward, order, pickup, delivery, courier, shipment, seller task, return, payout, or support jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Payment, payout, stored-value, earnings, reward, refund, and seller surfaces must be server-owned and tokenized; client-only state must never decide funds, rewards, credits, refunds, tips, memberships, payouts, listings, offers, or order dispatch.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, payment/payout or membership management, connected-provider controls, seller controls where relevant, and responsible-use controls.
- Entitlements must model guest, member, free, paid, expired, canceled, refunded, restored, seller-ineligible, store-owned, web-owned, provider-owned, quota-exhausted, region-blocked, and unavailable states.
- Analytics must avoid raw orders, payment credentials, payout credentials, exact arrival paths, loyalty identifiers, seller identifiers, support attachments, scan payloads, try-on media, and unredacted account identifiers.
- Provider calls require scoped credentials, redacted logs, request/response retention limits, per-provider data-processing notes, retry policies, and user-visible recovery.
- Manual verification required: native permission prompts, marketplace privacy labels, payment/payout, push payloads, background location, provider integrations, regional availability, and store/merchant/courier/seller/return/refund behavior.
- secure brokerage onboarding, portfolio dashboard, watchlists, quote/detail pages, trading-ticket simulation, options and crypto blockers, market-data licensing, alerts, community surfaces, support, and compliance controls must be treated as launch-blocking behavior with owners, mitigations, acceptance tests, and manual-verification notes.
- KYC/AML, financial licensing, money movement, account takeover, card fraud, credential safety, payment disputes, credit-score disclosures, rewards correctness, statement retention, GLBA-style privacy, and regulator-facing auditability must be treated as a launch-blocking risk area with owner, mitigation, and acceptance tests.
- Location privacy, local offers, ad-tech, personalization, fraud prevention, seller safety, product-safety claims, and support escalation must be treated as launch-blocking risk areas with explicit data minimization and user-visible recovery.

## Core User Journeys

- New user reviews consent, signs in or continues as guest where allowed, selects a store, merchant, address, region, or fulfillment context, and reaches the main catalog, ordering, selling, or shopping surface.
- Returning user reorders, rebuilds, relists, repeats, accepts, or resumes a favorite workflow, applies a qualifying reward, coupon, membership, earning, or offer, and checks out or completes the task.
- User switches pickup, curbside, delivery, shipping, in-store, seller, worker-zone, or courier mode where available and sees location-specific availability.
- User pays or receives payout with card, wallet, gift card, stored value, reward, membership benefit, split tender, tip, cashout, or provider-backed instrument where supported and handles authorization failure.
- User tracks order, pickup, delivery, courier, task, route, payout, shipment, return, or support status without exposing precise location unnecessarily.
- User sees item unavailable, merchant/store closed, catalog changed, fee changed, coupon invalid, variant sold out, subscription blocked, seller ineligible, route unsafe, authenticity review held, or promotion expired and can recover before consequential action.
- User requests support, refund, order correction, return, authenticity review, listing review, privacy export, or account deletion and receives durable case state.
- Manual verification required: background behavior, push payloads, OS permission prompts, marketplace labels, provider integrations, purchases/payments/payouts, seller eligibility, and regional availability.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth / Consent | Defines the welcome / auth / consent workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Identity / Security | Defines the identity / security workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Account Dashboard | Defines the account dashboard workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Account / Card Detail | Defines the account / card detail workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Transaction Detail | Defines the transaction detail workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Transfer / Payment / Deposit | Defines the transfer / payment / deposit workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Card Controls / Alerts | Defines the card controls / alerts workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Statements / Documents | Defines the statements / documents workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Rewards / Offers / Credit Score | Defines the rewards / offers / credit score workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Dispute / Fraud Support | Defines the dispute / fraud support workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Notifications / Messages | Defines the notifications / messages workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Settings / Privacy | Defines the settings / privacy workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Data Export / Delete | Defines the data export / delete workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |
| Support / Recovery | Defines the support / recovery workflow for Webull-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `AccountSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `IdentityCheck`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `BankAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `CardAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `BalanceSnapshot`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `Transaction`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `Transfer`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `BillPayment`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `MobileDeposit`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `CardControl`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `AlertPreference`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `Statement`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `RewardAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `DisputeCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `FraudCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `SupportCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `AuditEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.
- `LocalCacheRecord`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Webull-inspired workflows.

## API And Backend Contracts

- POST /auth/session, POST /auth/recover, DELETE /auth/session, and DELETE /account for account lifecycle.
- GET /regions, GET /locations, GET /locations/:id, GET /stores, GET /merchants, GET /catalogs/:locationId, GET /products/:id, GET /listings/:id, and GET /offers.
- POST /carts, PATCH /carts/:id, POST /carts/:id/items, PATCH /carts/:id/items/:itemId, and DELETE /carts/:id/items/:itemId.
- POST /checkout/quote, POST /orders, GET /orders/:id, POST /orders/:id/cancel, GET /orders/:id/status, POST /returns, and GET /returns/:id.
- GET /rewards, POST /rewards/enroll, POST /rewards/redeem, GET /memberships, GET /payment-instruments, and GET /payout-instruments where seller flows exist.
- GET /inventory, GET /variants, GET /fulfillment-windows, GET /seller/listings, POST /seller/listings, PATCH /seller/listings/:id, POST /offers/:id/accept, and POST /arrival-checkins where fulfillment requires store, merchant, seller, or courier handoff.
- POST /support/cases, GET /support/cases/:id, POST /refund-requests, POST /disputes, POST /incident-reports, POST /data-export, and DELETE /account.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id` for privacy lifecycle.
- `GET /support/articles`, `POST /support/cases`, `GET /support/cases/:id`, `POST /reports`, and `GET /reports/:id` for support, abuse, safety, counterfeit, prohibited-goods, and rights workflows.
- Provider webhook contracts must include idempotency keys, redacted payload logging, retry semantics, and canonical refetch after missed order, payment, payout, inventory, membership, seller, shipment, return, or delivery events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, refund/credit review, fraud hold review, payment dispute handling, authenticity review, seller incident/deactivation review, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, or proprietary provider schemas from Webull.

## Realtime, Push, And Offline Behavior

- Recent home, catalog/menu/product, listing, settings, entitlement, earnings, and in-progress state cache locally with explicit size, retention, and purge rules.
- Long-running jobs use polling, SSE, websocket, or provider webhook fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and low-risk local drafts where allowed but blocks provider calls, billing/payment/payout changes, public publication, rights-affecting writes, profile-owner changes, age-restricted purchases, delivery dispatch, seller task acceptance, return submission, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether coupons, promotions, rewards, memberships, orders, tips, payments, payouts, seller offers, returns, or listing changes were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription/payment/payout, support, order/shipment/task status, rewards/offers, store/merchant arrival, delivery handoff, seller safety, listing moderation, and return/dispute states.
- Background tracking, location checks, local-network/device behavior, payment authorization, payout/cashout, loyalty redemption, store check-in, courier tracking, seller route state, scan/search, virtual try-on, AR/3D preview, and cloud sync behavior are `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached uploads, product/listing media, activity/order/task history, payment/payout references, device metadata, location history, support attachments, catalog/menu refs, and seller records purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, precise location, approximate location, camera, media library, files, clipboard, contacts/share sheet, local network, Bluetooth, motion, background location, AR/3D sensors, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw order histories, payment credentials, payout credentials, exact arrival trails, loyalty tokens, seller identifiers, support attachments, scan images, try-on media, or private messages in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, support attachments, listing photos, delivery issue photos, identity documents, scan images, AR captures, and order issue photos must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, and private tags before export/share.
- Menu, order, payment, payout, reward, delivery, offer, membership, seller, nutrition, allergen, ingredient, product-safety, warranty, age-restricted, and resale-authenticity features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe behavior, fraud, and misleading attribution.
- Recommended, ad-targeted, factual, price, nutrition, allergen, location, authenticity, warranty, fit, sizing, ETA, or availability output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, store-limited, merchant-limited, seller-limited, or unavailable before consequential use.
- Catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, embargo, region, store, merchant, seller, warranty, product-safety, and availability restrictions in metadata.
- Support access to uploads, activity/order/listing/task history, profile data, diagnostics, account data, and seller data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, activity/order/listing/task history, generated outputs, reports, support cases, device associations, payment/payout tokens, rewards references, membership references, return/dispute records, and billing references where legally deletable.
- Fraud, account takeover, payment abuse, coupon/reward abuse, refund abuse, return abuse, courier/merchant/seller disputes, worker safety, counterfeit goods, prohibited goods, alcohol/age-gated goods where relevant, and unsafe delivery instructions require explicit review queues before production launch.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, product/listing opened, cart/list updated, quote viewed, order submitted/failed, offer viewed/accepted, favorite saved, report submitted, export/delete requested, payment/payout viewed, and notification preference changed.
- Event properties must use coarse category, provider capability class, latency buckets, error codes, duration buckets, ad state, entitlement/payment/payout state, and region/store/merchant/seller class only.
- Monetization may include subscriptions, memberships, service fees, convenience fees, delivery fees, rewards, stored value, gift cards, sponsored placement, retail media, marketplace commissions, tips, seller fees, payment processing, payouts, or premium fulfillment only after legal, tax, consumer-protection, labor, and disclosure review.
- Billing/payment/payout must handle app-store, web, in-store, wallet, gift-card, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, quota-exhausted, payment-failed, payout-failed, tax-hold, and region-blocked states.
- Paywalls and payment gates must not block safety reporting, account recovery, export/delete, privacy settings, returns/disputes, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/provider, unsupported store/merchant/device/seller status, or blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed catalog, route, menu item, product variant, listing, promotion, reward, price, store, merchant, provider, courier, seller offer, return, or order becomes unavailable, renamed, corrected, expired, geo-blocked, or takedown-blocked.
- Background tracking, order/task/shipment status, payment authorization, payout, feed refresh, score/order alert, courier tracking, scan/search, AR/3D preview, try-on render, or offline license refresh is interrupted by app termination.
- Subscription, membership, reward, coupon, stored value, payout, seller status, tip, return window, warranty status, or offer renews, refunds, expires, switches owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, return disputes, seller disputes, ad records, or provider logs remain active.
- Uploaded, indexed, listed, or saved data contains child data, private conversations, health data, financial data, identity documents, copyrighted material, counterfeit goods, recalled products, hazardous materials, or third-party confidential content.
- Provider/CDN/feed/device/store/merchant/payment/payout outage occurs after the user starts an action but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, copyright infringement, unsafe behavior, fraud, promotion abuse, refund abuse, return abuse, courier harassment, seller harassment, counterfeit sales, prohibited goods, or unsafe public sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, sensor/order/listing/task data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, provider, bundle, territory, regulator, store, merchant, franchise, membership, seller, warranty, authenticity, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement/payment/payout checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for catalog/menu/product validation, listing rules, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for profile, favorite, history, active job, provider-auth, retry gates, destructive confirmations, seller states, product-safety states, and license/availability propagation.
- Contract tests for auth, home, catalog/menu/products/listings, jobs, billing/payment/payout, privacy, support, reports, and provider routes where scoped.
- Integration tests for onboarding -> discover/shop/sell -> detail -> order/listing/task -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, provider timeouts, seller ineligibility, and availability failures.
- Offline tests for cached reads, allowed local drafts, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for reports, explicit-content gates, child/profile controls, fraud, impersonation, ad disclosures, delayed/provider data, responsible-use controls, seller safety, counterfeit/prohibited goods, unsafe behavior, and privacy redaction.
- Billing/payment/payout tests for trial, purchase, restore, renewal, refund, expiration, gift card, stored value, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, web-owned, tax-hold, cashout, and payout-failed states.
- Privacy/security tests for provider request redaction, support access consent, metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts where applicable, controls, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, purchase/payment/payout, push notifications, provider integrations, background behavior, seller eligibility, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/terms/marketplace URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed catalog/data.
- Onboarding, home, discover/shop/sell, detail, active-use/order/shipment/listing/task, notifications, export/share, settings, support, safety report, export/delete, and entitlement/payment/payout screens are specified.
- Account, profile, provider, billing/payment/payout, support, analytics, seller, order/location/loyalty/store/merchant/courier/product data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing/payment/payout, publication, rights, profile-owner, age-restricted, delivery-dispatch, seller-task, return/dispute, or irreversible operations while offline.
- Safety tests cover reports, explicit content, non-consensual uploads, impersonation, ad disclosures, provider delays, responsible-use controls, seller safety, counterfeit/prohibited goods, unsafe behavior, fraud, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions/payments/payouts, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, seller eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active job failure, quota exhaustion, seller ineligibility, offline recovery, export/delete, billing/payment/payout restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog data, maps/location, media, notifications, billing/payment/payout, analytics, support, recommendations, ads, courier tracking, seller eligibility, authenticity review, scan/search, AR/3D, try-on, or device integrations in the original implementation?
- Which uploads, drafts, histories, diagnostics, seller records, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, labor compliance, or legal obligations?
- Which regions, ages, stores, merchants, providers, devices, profiles, seller statuses, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, nutrition/allergen, ingredient, product-safety, warranty, authenticity, ad-tech, location, payment, payout, refund, courier, seller, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, special hardware, background permissions, platform integrations, geolocation, payment methods, payout instruments, identity documents, real orders, age verification, courier handoff, seller handoff, return shipment, authenticity review, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, payment/payout/location model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery/shop/sell, detail, active-use/order/shipment/listing/task, settings, support, and entitlement/payment/payout shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, fraud controls, seller controls, product-safety controls, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing/payment/payout, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, background behavior, and seller/location behavior where relevant.
- Verify account, payment, payout, reward/membership, seller eligibility, store/merchant availability, order, substitution, delivery, shipment, refund, return, authenticity, and support states with test accounts where allowed.
- Extend the Phase 5 implementation-plan queue after this ID is included in the readiness batch.
- Keep downstream scaffold repos private and label this source spec as implementation-ready only for original public-source V1 work.
