# Krispy Kreme-Style Clone Spec

> Metadata
> - Inspiration app: Krispy Kreme
> - Category: doughnut ordering, rewards, Hot Light notifications, shop locator, gift cards, and support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, support/help, privacy, terms, reward/membership, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, payment/purchase state, permission prompts, push notifications, provider integrations, store/franchise availability, catalog/menu/pricing/tax/fee correctness, loyalty redemption, refund/order-support behavior, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, proprietary catalog/menu/product data, maps, media, private APIs, recommendation models, customer data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile product inspired by Krispy Kreme's public product and policy materials. V1 focuses on Krispy Kreme Rewards, pickup/delivery ordering, Hot Light shop notifications, offers, gift cards, birthday rewards, payment, and support. The clone must use original branding, original UI copy, original sample data, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support Krispy Kreme Rewards, pickup/delivery ordering, Hot Light shop notifications, offers, gift cards, birthday rewards, payment, and support with clear retry, recovery, unavailable, region, entitlement, and provider-aware states.
- Preserve boundaries between account, profile, order/cart/list, payment, location, loyalty, analytics, support, pharmacy/health-adjacent, advertising, and public catalog data.
- Implement guest, member, free, paid, expired, restored, refunded, store-owned, web-owned, provider-owned, region-blocked, and unavailable states without copying exact pricing, plan names, promotions, or loyalty terms.
- Include export/delete, support/report flows, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog, location, payment, device/permission, safety, advertising, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with Krispy Kreme or its publisher.
- Do not copy proprietary feeds, menus, product catalogs, prices, promotions, media, artwork, recommendation models, screenshots, icons, brand names, or private API shapes.
- Do not send production user order, payment, precise-location, loyalty, support, prescription/pharmacy, or delivery telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present nutrition, allergen, price, delivery-time, reward, membership, pharmacy, or availability output as professional, medical, legal, financial, or safety-critical advice.
- Do not enable autonomous purchases, account changes, public profile changes, regulated workflows, pharmacy actions, age-restricted purchases, or irreversible external actions without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.krispykreme.com/ | Public product positioning, catalog/menu or retail surfaces, ordering/shopping, account, location, membership/reward, and app behavior | Verified 2026-05-04 |
| Support/help center | https://www.krispykreme.com/contact-us | Public support taxonomy for account, order/activity, billing/payment, store/provider issues, troubleshooting, and deletion/export flows | Verified 2026-05-04 |
| Privacy policy | https://www.krispykreme.com/privacy | Account, profile, order/purchase, location, device, advertising, analytics, support, and user-rights handling | Verified 2026-05-04 |
| Terms of service | https://www.krispykreme.com/terms-of-use | Service usage, licensed content, payments, user conduct, provider limits, regulated-flow boundaries, and legal boundaries | Verified 2026-05-04 |
| Rewards or membership terms | https://www.krispykreme.com/rewards | Reward, membership, loyalty, offer, stored-value, or entitlement orientation where public | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/krispy-kreme/id482752836 | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.krispykreme.HotLights | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, payment, push payloads, background behavior, provider integrations, regional availability, and store/payment/loyalty/refund behavior | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest or signed-out preview where allowed, account creation or restore, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful order, shopping, reward, membership, store, and support state with signed-out, loading, empty, degraded-network, and stale-data variants.
- Store or location selection must distinguish GPS, manual search, saved/favorite locations, current hours, services, pickup/delivery/shipping/fuel/pharmacy availability, and unavailable-region states.
- Catalog, menu, or product browse must support categories, search, filters, availability, price/fee freshness, promotion labels, nutrition/allergen or product-safety notes, and original sample data.
- Detail screens must show availability, provider timestamp, rights state, safety labels where relevant, save/favorite/share actions, and manual-verification warnings for native-only behavior.
- Cart, list, wallet, checkout, reward, gift-card, order, pickup, delivery, shipping, fuel, pharmacy, or support jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Payment and stored-value surfaces must be server-owned and tokenized; client-only state must never decide funds, rewards, credits, refunds, tips, fuel discounts, memberships, or order acceptance.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, payment or membership management, connected-provider controls, and responsible-use controls where relevant.
- Entitlements must model guest, member, free, paid, expired, canceled, refunded, restored, store-owned, web-owned, provider-owned, quota-exhausted, region-blocked, and unavailable states.
- Analytics must avoid raw orders, payment credentials, precise arrival paths, loyalty identifiers, pharmacy/prescription details, support attachments, and unredacted account identifiers.
- Provider calls require scoped credentials, redacted logs, request/response retention limits, per-provider data-processing notes, retry policies, and user-visible recovery.
- Manual verification required: native permission prompts, marketplace privacy labels, payment, push payloads, background behavior, provider integrations, regional availability, and store/franchise/payment/loyalty/refund behavior.
- Hot Light notification accuracy, reward earning/redemption, limited-time offer pricing, multiple gift-card handling, phone-number account lock, shop availability, payment authorization, and support escalation must be treated as launch-blocking risk areas with owners, mitigations, acceptance tests, and manual-verification notes.
- Menu, product, promotion, tax, fee, availability, and substitution freshness must be treated as a launch-blocking risk area with owner, mitigation, and acceptance tests.
- Location privacy, local offers, ad-tech, personalization, and support escalation must be treated as launch-blocking risk areas with explicit data minimization and user-visible recovery.

## Core User Journeys

- New user reviews consent, signs in or continues as guest where allowed, selects a store or fulfillment context, and reaches the main catalog or shopping surface.
- Returning user reorders, rebuilds, or repeats a favorite workflow, applies a qualifying reward, coupon, membership, or offer, and checks out.
- User switches pickup, curbside, drive-thru, dine-in, delivery, shipping, scan-and-go, fuel, pharmacy, or in-store mode where available and sees location-specific availability.
- User pays with card, wallet, gift card, stored value, reward, membership benefit, split tender, or provider-backed instrument where supported and handles authorization failure.
- User tracks order, pickup, delivery, shipping, fuel, prescription, or support status without exposing precise location unnecessarily.
- User sees item unavailable, store closed, catalog changed, fee changed, coupon invalid, substitution needed, membership blocked, or promotion expired and can recover before payment.
- User requests support, refund, order correction, privacy export, or account deletion and receives durable case state.
- Manual verification required: background behavior, push payloads, OS permission prompts, marketplace labels, provider integrations, purchases/payments, and regional availability.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth / Consent | Defines the welcome / auth / consent workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Home / Personalized Hub | Defines the home / personalized hub workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Store / Location Selector | Defines the store / location selector workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Catalog / Menu Browse | Defines the catalog / menu browse workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Item Detail / Customizer | Defines the item detail / customizer workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Cart / List | Defines the cart / list workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Checkout / Payment | Defines the checkout / payment workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Order / Fulfillment Status | Defines the order / fulfillment status workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Hot Light | Defines the hot light workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Rewards | Defines the rewards workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Gift Cards | Defines the gift cards workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Settings / Privacy | Defines the settings / privacy workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Support / Refunds | Defines the support / refunds workflow for Krispy Kreme-inspired behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `AccountSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `CustomerProfile`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `StoreLocation`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `Catalog`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `CatalogItem`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `InventorySnapshot`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `Cart`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `Order`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `PaymentInstrument`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `RewardAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `Offer`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `Fulfillment`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `SupportCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `RefundCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `AuditEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.
- `LocalCacheRecord`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Krispy Kreme-inspired workflows.

## API And Backend Contracts

- POST /auth/session, POST /auth/recover, DELETE /auth/session, and DELETE /account for account lifecycle.
- GET /locations, GET /locations/:id, GET /catalogs, GET /catalogs/:locationId, GET /items/:id, and GET /offers.
- POST /carts, PATCH /carts/:id, POST /carts/:id/items, PATCH /carts/:id/items/:itemId, and DELETE /carts/:id/items/:itemId.
- POST /checkout/quote, POST /orders, GET /orders/:id, POST /orders/:id/cancel, and GET /orders/:id/status.
- GET /rewards, POST /rewards/enroll, POST /rewards/redeem, GET /gift-cards, POST /gift-cards/reload, and GET /payment-instruments.
- GET /inventory, GET /substitutions, PATCH /substitutions/:id, GET /fulfillment-windows, and POST /arrival-checkins where fulfillment requires store handoff.
- POST /support/cases, GET /support/cases/:id, POST /refund-requests, POST /data-export, and DELETE /account.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id` for privacy lifecycle.
- `GET /support/articles`, `POST /support/cases`, `GET /support/cases/:id`, `POST /reports`, and `GET /reports/:id` for support, abuse, safety, and rights workflows.

## Realtime, Push, And Offline Behavior

- Recent home, catalog, settings, entitlement, and in-progress state cache locally with explicit size, retention, and purge rules.
- Long-running jobs use polling, SSE, websocket, or provider webhook fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and low-risk local drafts where allowed but blocks provider calls, billing/payment changes, public publication, rights-affecting writes, profile-owner changes, pharmacy/health actions, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether coupons, promotions, licenses, rewards, memberships, orders, or payments were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription/payment, support, order status, rewards/offers, store arrival, delivery handoff, and moderation states.
- Background tracking, location checks, local-network/device behavior, payment authorization, loyalty redemption, store check-in, pharmacy status, and cloud sync behavior are `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached uploads, activity/order history, payment references, device metadata, location history, support attachments, catalog refs, and pharmacy-adjacent records purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, precise location, approximate location, motion/fitness, camera, media library, files, clipboard, contacts/share sheet, local network, Bluetooth, health-store access, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw order histories, payment credentials, exact arrival trails, loyalty tokens, pharmacy/prescription details, support attachments, or private messages in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, support attachments, and order issue photos must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, and private tags before export/share.
- Menu, order, payment, reward, delivery, offer, membership, nutrition, allergen, pharmacy, age-restricted, and product-safety features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe behavior, fraud, and misleading attribution.
- Recommended, ad-targeted, factual, price, nutrition, allergen, location, pharmacy, or availability output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, store-limited, or unavailable before consequential use.
- Catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, embargo, region, store, and availability restrictions in metadata.
- Support access to uploads, activity/order history, profile data, diagnostics, account data, and pharmacy-adjacent data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, activity/order history, generated outputs, reports, support cases, device associations, payment tokens, rewards references, membership references, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, item opened, cart/list updated, quote viewed, order submitted/failed, favorite saved, report submitted, export/delete requested, payment viewed, and notification preference changed.
- Event properties must use coarse category, provider capability class, latency buckets, error codes, duration buckets, ad state, entitlement/payment state, and region/store class only.
- Monetization may include subscriptions, memberships, service fees, convenience fees, delivery fees, fuel savings, rewards, stored value, gift cards, sponsored placement, retail media, marketplace commissions, or premium fulfillment only after legal, tax, consumer-protection, and disclosure review.
- Billing/payment must handle app-store, web, in-store, wallet, gift-card, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, quota-exhausted, and payment-failed states.
- Paywalls and payment gates must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/provider, unsupported store/device, or blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed catalog, route, menu item, promotion, reward, price, store, provider, activity, or order becomes unavailable, renamed, corrected, expired, geo-blocked, or takedown-blocked.
- Background tracking, order status, payment authorization, feed refresh, score/order alert, or offline license refresh is interrupted by app termination.
- Subscription, membership, reward, coupon, or stored value renews, refunds, expires, switches owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, ad records, or provider logs remain active.
- Uploaded, indexed, or saved data contains child data, private conversations, health data, financial data, copyrighted material, or third-party confidential content.
- Provider/CDN/feed/device/store/payment outage occurs after the user starts an action but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, copyright infringement, unsafe behavior, fraud, promotion abuse, refund abuse, or unsafe public sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, sensor/order data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, provider, bundle, health, territory, regulator, store, franchise, membership, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement/payment checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for catalog validation, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for profile, favorite, history, active job, provider-auth, retry gates, destructive confirmations, and license/availability propagation.
- Contract tests for auth, home, catalog, jobs, billing/payment, privacy, support, reports, and provider routes where scoped.
- Integration tests for onboarding -> discover -> detail -> start/order/shop -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, provider timeouts, and availability failures.
- Offline tests for cached reads, allowed local drafts, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for reports, explicit-content gates, child/profile controls, fraud, impersonation, ad disclosures, delayed/provider data, responsible-use controls, unsafe behavior, and privacy redaction.
- Billing/payment tests for trial, purchase, restore, renewal, refund, expiration, gift card, stored value, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts where applicable, controls, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, purchase/payment, push notifications, provider integrations, background behavior, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed catalog/data.
- Onboarding, home, discover, detail, active-use/order/shop, notifications, export/share, settings, support, safety report, export/delete, and entitlement/payment screens are specified.
- Account, profile, provider, billing/payment, support, analytics, and order/location/loyalty/store data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing/payment, publication, rights, profile-owner, pharmacy/health, age-restricted, or irreversible operations while offline.
- Safety tests cover reports, explicit content, non-consensual uploads, impersonation, ad disclosures, provider delays, responsible-use controls, unsafe behavior, fraud, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions/payments, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active job failure, quota exhaustion, offline recovery, export/delete, billing/payment restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog data, maps/location, media, notifications, billing/payment, analytics, support, recommendations, ads, or device integrations in the original implementation?
- Which uploads, drafts, histories, diagnostics, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, or legal obligations?
- Which regions, ages, stores, providers, devices, profiles, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, nutrition/allergen, safety, ad-tech, location, payment, refund, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, special hardware, background permissions, platform integrations, geolocation, payment methods, real orders, pharmacy access, age verification, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, payment/location model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery, detail, active-use/order/shop, settings, support, and entitlement/payment shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing/payment, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture lawful hands-on evidence for the listed manual blockers before removing any feature flags or parity blockers.
- Pick downstream implementation providers for auth, maps/search, payments, notifications, support, analytics, moderation, catalog/inventory, tax/fees, and storage.
- Produce an implementation repo build plan with route map, component map, API schema, state machines, seed data, and acceptance test checklist.
