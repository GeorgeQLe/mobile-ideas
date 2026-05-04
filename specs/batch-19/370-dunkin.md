# Dunkin-Style Clone Spec

> Metadata
> - Inspiration app: Dunkin
> - Category: Food and drink
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public first-party product, support/help, privacy, terms, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, paid/subscription or payment state, permission prompts, push notifications, provider integrations, store/franchise availability, menu/pricing/tax/fee correctness, loyalty redemption, refund/order-support behavior, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, proprietary menus/catalogs, workout libraries, maps/routes, media, private APIs, recommendation models, customer data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile restaurant ordering and loyalty product inspired by Dunkin's public product and policy materials. V1 focuses on order ahead, pickup methods, Dunkin Rewards-style points/offers, stored cards and auto-reload, menu customization, store locator, payment, and support/refund flows. The clone must use original branding, original UI copy, original sample data, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support order ahead, pickup methods, Dunkin Rewards-style points/offers, stored cards and auto-reload, menu customization, store locator, payment, and support/refund flows with clear retry, recovery, unavailable, region, entitlement, and provider-aware states.
- Preserve boundaries between account data, profile data, order/payment/location/loyalty data, analytics, support logs, rights/licensing records, billing records, ad records, and public catalog data.
- Implement guest, free, trial, paid, expired, restored, refunded, store-owned, web-owned, provider-owned, region-blocked, and unavailable states without copying exact pricing, plan names, promotions, or loyalty terms.
- Include export/delete, support/report flows, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog, location, subscription/payment, device/permission, safety, advertising, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with Dunkin or its publisher.
- Do not copy proprietary feeds, workout libraries, menus, prices, promotions, route data, media, artwork, recommendation models, screenshots, icons, brand names, or private API shapes.
- Do not send production user order, payment, precise-location, loyalty, support, or delivery telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present nutrition, allergen, price, delivery-time, reward, or availability output as professional, medical, legal, financial, or safety-critical advice.
- Do not enable autonomous purchases, account changes, public profile changes, health diagnosis, regulated workflows, or irreversible external actions without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.dunkindonuts.com/en/mobile-app | Public product positioning, core surfaces, availability framing, account, catalog/feed, subscription/payment, and app behavior | Verified 2026-05-04 |
| Support/help center | https://www.dunkindonuts.com/en/about/contact-us/faqs | Public support taxonomy for account, activity/order, billing/payment, devices/permissions, troubleshooting, and deletion/export flows | Verified 2026-05-04 |
| Privacy policy | https://www.dunkindonuts.com/en/terms-of-use/privacy-policy | Account, profile, activity/order history, location, device, advertising, analytics, support, and user-rights handling | Verified 2026-05-04 |
| Terms of service | https://www.dunkindonuts.com/en/terms-of-use | Service usage, licensed content, subscriptions/payments, user conduct, provider limits, regulated-flow boundaries, and legal boundaries | Verified 2026-05-04 |
| App Store listing | https://apps.apple.com/us/app/dunkin/id1056813463 | Canonical iOS listing, category, age rating, privacy label, compatibility, in-app purchases where public, and native metadata | Verified 2026-05-04 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.dunkinbrands.otgo | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified 2026-05-04 |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, store purchase/restore, push payloads, background behavior, provider integrations, regional availability, and store/payment/loyalty/refund behavior | Blocked pending lawful device/store verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest or signed-out preview where allowed, account creation or restore, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful ordering/loyalty state, search/discovery, saved items, settings, and degraded offline/account variants.
- Search and discovery must distinguish first-party public evidence, licensed catalog/provider data, editorial recommendations, ads/sponsorship, user-generated content, and inferred behavior.
- Detail screens must show availability, provider timestamp, rights state, safety labels where relevant, save/favorite/share actions, and manual-verification warnings for native-only behavior.
- Long-running cart, quote, payment, order, reward, gift-card, store check-in, or handoff jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Library, history, favorites, cart, order, reward, offer, gift card, payment, profile, or store state must sync without trusting stale client-only state for paid, rights-limited, health-adjacent, payment, or irreversible actions.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, subscription or payment management, connected-provider controls, and responsible-use controls where relevant.
- Entitlements must model guest, free, ad-supported, trial, paid, expired, canceled, refunded, restored, store-owned, web-owned, provider-owned, quota-exhausted, region-blocked, and unavailable states.
- Analytics must avoid raw orders, payment credentials, precise arrival paths, loyalty identifiers, support attachments, and unredacted account identifiers.
- Moderation and support must cover copyright, impersonation, harassment, unsafe uploads/comments, account takeover, fraud, provider failures, wrong/missing/late/canceled orders and refund disputes, and rights disputes.
- Provider calls require scoped credentials, redacted logs, request/response retention limits, per-provider data-processing notes, retry policies, and user-visible recovery.
- Manual verification required: native permission prompts, marketplace privacy labels, purchase/restore or payment, push payloads, background behavior, provider integrations, regional availability, and store/franchise/payment/loyalty/refund behavior.
- menu, price, promotion, tax, fee, and item-availability freshness must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- store/franchise participation, hours, throttling, and regional menu differences must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- payment authorization, stored-value, gift-card, refund, and chargeback handling must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- loyalty/rewards earning, redemption, expiry, fraud, and account takeover controls must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- pickup, curbside, drive-thru, delivery handoff, and failed-arrival recovery must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- nutrition, allergen, ingredient, substitution, and limited-time-item disclosures must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- location privacy, local offers, ad-tech, and personalization boundaries must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.
- support escalation for wrong, missing, late, canceled, duplicate, or unsafe orders must be treated as a launch-blocking risk area with owner, mitigation, acceptance tests, and manual-verification notes.

## Core User Journeys

- New user reviews consent, signs in or continues as guest where allowed, selects a nearby store, and reaches the menu.
- Returning user reorders a favorite, edits modifiers, applies a qualifying reward or offer, and checks out.
- User switches pickup, curbside, drive-thru, dine-in, or delivery where available and sees store-specific availability.
- User pays with card, wallet, gift card, stored value, reward, or split payment where supported and handles authorization failure.
- User tracks order status, checks in or confirms arrival, and receives handoff instructions without exposing precise location unnecessarily.
- User sees item unavailable, store closed, menu changed, fee changed, or promotion invalid and can recover before payment.
- User requests support, refund, or order correction and receives durable case state.
- Manual verification required: background behavior, push payloads, OS permission prompts, marketplace labels, provider integrations, purchases/payments, and regional availability.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth | Defines the welcome / auth workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Restaurant / Store Locator | Defines the restaurant / store locator workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Menu Browse | Defines the menu browse workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Item Detail / Customizer | Defines the item detail / customizer workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Cart | Defines the cart workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Checkout / Payment | Defines the checkout / payment workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Order Status / Tracker | Defines the order status / tracker workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Pickup / Delivery Handoff | Defines the pickup / delivery handoff workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Rewards / Offers | Defines the rewards / offers workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Favorites / Reorder | Defines the favorites / reorder workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Gift Card / Stored Value | Defines the gift card / stored value workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Settings / Privacy | Defines the settings / privacy workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |
| Support / Refunds | Defines the support / refunds workflow for Dunkin-inspired restaurant ordering behavior | taps, forms, search, filters, deep links, location, payment, store selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, payment failed |

## Data Model

- `User`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `AccountSession`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `CustomerProfile`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `RestaurantLocation`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `MenuCatalog`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `MenuItem`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `ModifierGroup`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `Cart`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `Order`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `PaymentInstrument`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `RewardAccount`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `Offer`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `GiftCard`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `DeliveryOrPickupHandoff`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `SupportCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `RefundCase`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `AuditEvent`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.
- `LocalCacheRecord`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for Dunkin-inspired restaurant ordering workflows.

## API And Backend Contracts

- POST /auth/session, POST /auth/recover, DELETE /auth/session, and DELETE /account for account lifecycle.
- GET /locations, GET /locations/:id, GET /menus, GET /menus/:locationId, GET /items/:id, and GET /offers.
- POST /carts, PATCH /carts/:id, POST /carts/:id/items, PATCH /carts/:id/items/:itemId, and DELETE /carts/:id/items/:itemId.
- POST /checkout/quote, POST /orders, GET /orders/:id, POST /orders/:id/cancel, and GET /orders/:id/status.
- GET /rewards, POST /rewards/enroll, POST /rewards/redeem, GET /gift-cards, POST /gift-cards/reload, and GET /payment-instruments.
- POST /support/cases, GET /support/cases/:id, POST /refund-requests, POST /data-export, and DELETE /account.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id` for privacy lifecycle.
- `GET /support/articles`, `POST /support/cases`, `GET /support/cases/:id`, `POST /reports`, and `GET /reports/:id` for support, abuse, safety, and rights workflows.

## Realtime, Push, And Offline Behavior

- Recent home, catalog, settings, entitlement, and in-progress state cache locally with explicit size, retention, and purge rules.
- Long-running jobs use polling, SSE, websocket, or provider webhook fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and low-risk local drafts where allowed but blocks provider calls, billing/payment changes, public publication, rights-affecting writes, profile-owner changes, health diagnosis, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether quota, promotions, licenses, rewards, device syncs, orders, or subscriptions were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription/payment, support, order status, rewards/offers, store arrival, delivery handoff, and moderation states.
- Background tracking, location checks, wearable sync, Bluetooth/local-network/device behavior, watch behavior, payment authorization, loyalty redemption, store check-in, and cloud sync behavior are `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached uploads, activities/orders, payment references, device metadata, location history, support attachments, and catalog refs purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, precise location, approximate location, motion/fitness, camera, media library, files, clipboard, contacts/share sheet, local network, Bluetooth, health-store access, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw order histories, payment credentials, exact arrival trails, loyalty tokens, support attachments, or private messages in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, support attachments, and order issue photos must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, and private tags before export/share.
- Menu, order, payment, reward, delivery, offer, nutrition, and allergen features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe behavior, fraud, and misleading attribution.
- Recommended, ad-targeted, factual, wellness, price, nutrition, allergen, location, or availability output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, store-limited, injury-sensitive, or unavailable before consequential use.
- Catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, embargo, region, store, and availability restrictions in metadata.
- Support access to uploads, activity/order history, profile data, diagnostics, and account data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, activity/order history, generated outputs, reports, support cases, device associations, payment tokens, rewards references, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, item opened, cart updated, quote viewed, order submitted/failed, favorite saved, report submitted, export/delete requested, paywall/payment viewed, and notification preference changed.
- Event properties must use coarse category, provider capability class, latency buckets, error codes, duration buckets, ad state, entitlement/payment state, and region/store class only.
- Monetization may gate premium plans, advanced analytics, offline maps/downloads, device integrations, coaching plans, subscriptions, delivery fees, service fees, offers, rewards, stored value, gift cards, or priority processing.
- Billing/payment must handle app-store, web, in-store, wallet, gift-card, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, quota-exhausted, and payment-failed states.
- Paywalls and payment gates must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/provider, unsupported store/device, or blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed catalog, route, workout, menu item, promotion, reward, price, store, provider, activity, or order becomes unavailable, renamed, corrected, expired, geo-blocked, or takedown-blocked.
- Background tracking, order status, payment authorization, workout recording, device sync, feed refresh, score/order alert, or offline license refresh is interrupted by app termination.
- Subscription renews, refunds, expires, switches owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, ad records, or provider logs remain active.
- Uploaded, indexed, or saved data contains child data, private conversations, health data, financial data, copyrighted material, or third-party confidential content.
- Provider/CDN/feed/device/store/payment outage occurs after the user starts an action but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, copyright infringement, unsafe exercise, fraud, promotion abuse, refund abuse, or unsafe public sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, sensor/order data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, provider, bundle, health, territory, regulator, store, franchise, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement/payment checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for catalog validation, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for profile, favorite, history, active job, provider-auth, retry gates, destructive confirmations, and license/availability propagation.
- Contract tests for auth, home, catalog, jobs, billing/payment, privacy, support, reports, and provider routes where scoped.
- Integration tests for onboarding -> discover -> detail -> start/order -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, provider timeouts, and availability failures.
- Offline tests for cached reads, allowed local drafts, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for reports, explicit-content gates, child/profile controls, fraud, impersonation, ad disclosures, delayed/provider data, responsible-use controls, unsafe behavior, and privacy redaction.
- Billing/payment tests for trial, purchase, restore, renewal, refund, expiration, gift card, stored value, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts where applicable, controls, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, purchase/payment, push notifications, provider integrations, background behavior, and regional availability.

## Acceptance Criteria

- All source-discovery links are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed catalog/data.
- Onboarding, home, discover, detail, active-use/order, notifications, export/share, settings, support, safety report, export/delete, and entitlement/payment screens are specified.
- Account, profile, provider, billing/payment, support, analytics, and order/location/loyalty/store data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing/payment, publication, rights, profile-owner, health-diagnosis, or irreversible operations while offline.
- Safety tests cover reports, explicit content, non-consensual uploads, impersonation, ad disclosures, provider delays, responsible-use controls, unsafe behavior, fraud, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions/payments, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active job failure, quota exhaustion, offline recovery, export/delete, billing/payment restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog data, maps/location, media, notifications, billing/payment, analytics, support, recommendations, ads, or device integrations in the original implementation?
- Which uploads, drafts, histories, diagnostics, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, or legal obligations?
- Which regions, ages, stores, providers, devices, profiles, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, nutrition/allergen, safety, ad-tech, location, health, payment, refund, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, special hardware, background permissions, platform integrations, geolocation, health-store access, payment methods, real orders, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, payment/health/location model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery, detail, active-use/order, settings, support, and entitlement/payment shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing/payment, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve native, device/store, provider, marketplace, region, subscription/payment, health/location, and regulated-flow blockers before parity claims.

## Next Steps

- Keep native marketplace, permission-prompt, subscription/payment, provider, health/device, geolocation, store/franchise, and regional behavior marked as manual verification blockers until lawful hands-on evidence is captured.
- Select licensed providers for catalog data, maps/location, media, notifications, billing/payment, analytics, support, and provider integrations before downstream implementation.
- Preserve exact source URLs and dated verification notes whenever public product, support, privacy, terms, or marketplace links change.
