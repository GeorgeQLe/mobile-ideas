# Starbucks-Style Clone Spec

> Metadata
> - Inspiration app: Starbucks
> - Category: coffee ordering, store pickup, stored value, rewards, eGifts, and store locator
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace listings, first-party product/help/legal/privacy pages, support pages, and app-specific public feature documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, Starbucks Card add/reload, payment authorization, scan-to-pay barcode behavior, mobile order quote refresh, store inventory, pickup timing, tip handling, birthday/reward redemption, eGift purchase/send, in-app delivery handoff, support/refund routing, account deletion, push payloads, Apple Watch behavior, and region-specific Rewards rules still require lawful test devices/accounts and any required provider approvals before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, menus, listings, reviews, ratings, photos, store/business data, maps, payment providers, loyalty engines, recommendation systems, support scripts, merchant tools, and regulated workflows.

## Overview

Build an original mobile product inspired by Starbucks' public workflow for coffee ordering, store pickup, stored value, rewards, eGifts, and store locator. The clone must preserve the functional interaction model users expect while using original product language, synthetic or licensed data, independent ranking/availability/quote logic, and jurisdiction-aware compliance.

The clone must not copy Starbucks branding, screenshots, marketing copy, protected UI artwork, business/store data, menu copy, photos, reviews, ratings, private APIs, support scripts, recommendation logic, pricing formulas, or loyalty/offer terms. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first coffee chain mobile ordering and loyalty app with complete onboarding, discovery, primary transaction, history, settings, support, privacy, and recovery flows.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around account security, payments, location, inventory/availability, support, refunds, reviews, loyalty, merchant/business tools, accessibility, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Starbucks-branded app or imply affiliation with Starbucks, its parent company, stores, restaurants, business owners, delivery partners, payment providers, or map providers.
- Do not scrape Starbucks, reuse private APIs, replay network traffic, copy marketplace data, copy menu/listing/review/media content, clone proprietary ranking/risk/loyalty systems, or reproduce policy/support copy.
- Do not process production payments, refunds, tips, stored value, identity documents, regulated goods, food-safety reports, advertising spend, business payouts, or support disputes without separate legal, compliance, privacy, trust/safety, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, reward, notification, support, refund, business-tooling, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/starbucks/id331177714 | Official iOS listing, Food & Drink category, seller, device support, release notes, privacy labels, app feature claims for ordering, Rewards, stored cards, eGifts, and store finder. | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.starbucks.mobilecard | Official Android listing, ratings/download scale, updated date, data-safety orientation, app support path, and ordering/Rewards feature summary. | Verified 2026-04-17 |
| Starbucks App Page | https://www.starbucks.com/rewards/mobile-apps/ | Official app download/product page for order-ahead, menu exploration, nearby cafes, Rewards signup, card management, history, payment methods, privacy/data, and settings entry points. | Verified 2026-04-17 |
| Starbucks Customer Service | https://customerservice.starbucks.com/sbux | Canonical support entrypoint for account, order, card, Rewards, payment, and store issues. | Verified 2026-04-17 |
| Starbucks Rewards Terms | https://www.starbucks.com/rewards/terms/ | Rewards program eligibility, earning, redemption, account, and benefit constraints. | Verified 2026-04-17 |
| Starbucks Terms Of Use | https://www.starbucks.com/terms/starbucks-terms-of-use/ | Mobile payment, Mobile Order and Pay, in-app delivery, product availability, ordering limits, third-party delivery, messaging, account, IP, and acceptable-use terms. | Verified 2026-04-17 |
| Starbucks Privacy Notice | https://www.starbucks.com/terms/privacy-notice/ | North America privacy notice for app/site/store data, payments, location, marketing, retention, rights, and privacy controls. | Verified 2026-04-17 |
| Starbucks Menu | https://www.starbucks.com/menu | Public menu orientation for product categories, modifiers, nutrition/allergen disclaimers, and synthetic catalog modeling. | Verified 2026-04-17 |
| Starbucks Store Locator | https://www.starbucks.com/store-locator | Public store search orientation for location, hours, amenities, and pickup availability modeling. | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must combine account status, selected store, Rewards balance, recent/favorite orders, personalized offers, card balance, and quick access to scan, order, gift, and store finder.
- Store selection must support GPS, manual search, saved stores, current store status, hours, amenities, pickup availability, drive-thru indicators, and unavailable-region states.
- Menu browse must support categories, item detail, sizes, modifiers, nutritional/allergen notes, image alt text, price, availability by store, favorites, and recent customizations without copying Starbucks menu copy or media.
- Cart must preserve selected store, fulfillment mode, item modifiers, quantities, pricing, tax, tip, rewards/redemption state, stored value/card payment, payment-card fallback, and quote freshness.
- Mobile Order and Pay must validate store availability, item availability, ordering limits, modifiers, pickup estimate, payment authorization, duplicate submission, and restaurant handoff before order placement.
- Scan-to-pay must model a tokenized barcode or wallet credential, card balance, reload controls, backup payment, transaction history, and fraud controls without storing raw payment credentials.
- Rewards must model member status, Stars earning, redemption tiers, offers, birthday reward windows, benefit expiry, promo games/offers, and conflict rules between rewards, offers, and payment methods.
- eGifts must support card design selection from original assets, recipient delivery channel, message, payment, delivery status, resend, refund/support, and fraud review.
- In-app delivery must be treated as third-party delivery integration with separate price/fee, delivery partner, support, and liability states.
- Support must expose order issue, missing item, store issue, card/reload issue, reward issue, unauthorized charge, eGift issue, data export, deletion, and privacy request paths.

### Manual Verification Required

- Native iOS/Android screen capture.
- Signup/login.
- Starbucks Card add/reload.
- Payment authorization.
- Scan-to-pay barcode behavior.
- Mobile order quote refresh.
- Store inventory.
- Pickup timing.
- Tip handling.
- Birthday/reward redemption.
- EGift purchase/send.
- In-app delivery handoff.
- Support/refund routing.
- Account deletion.
- Push payloads.
- Apple Watch behavior.
- Region-specific Rewards rules.

### Build Plan

- Phase A: auth shell, store finder, menu, item customization, cart, synthetic store/menu seed data, settings, privacy links, and accessibility baseline.
- Phase B: quote validation, stored-value card stub, scan token, Rewards/offer state, order placement stub, order status, receipt, reorder, and notification preferences.
- Phase C: eGift workflow, support/refund case routing, loyalty campaign engine, store-level inventory simulator, fraud holds, and privacy export/delete flows.
- Phase D: payment provider integration, tax/fee provider review, delivery partner flag, Apple Watch/manual evidence capture, production observability, and legal/compliance signoff.

## Core User Journeys

- New user installs the app, reviews original value proposition and legal links, grants or denies optional permissions, creates an account or continues where allowed, and reaches the primary discovery surface with usable fallback states.
- Returning user opens the app, sees fresh location/account/availability context, resumes a recent or saved item, completes the primary workflow, and confirms canonical server state after reconnect.
- User searches or browses with filters, opens a detail page, saves/favorites/bookmarks where applicable, starts the app-specific transaction, recovers from an unavailable item or stale quote, and completes or abandons safely.
- User denies location, notifications, camera/photos, contacts, or tracking permissions and still receives a clear fallback plus a settings path to re-enable the permission.
- User loses connectivity during browse, compose, cart, reservation, review, or support work; local state is preserved where safe, but money movement, irreversible writes, privacy actions, and regulated actions require server confirmation.
- User opens support from an active or historical object, selects an issue type, submits evidence where appropriate, receives status/decision updates, and can find the outcome later.
- Business or merchant operator manages the app-specific listing, availability, customer communication, support/reputation surface, and operational state from a separately authorized tool.
- Privacy-focused user updates profile and communication preferences, requests data export/access, deletes or closes the account where allowed, and sees retention caveats for orders, payments, reviews, business records, support cases, or legal holds.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account creation, sign-in, Rewards consent, and legal links | email, password, SSO, join, sign in | new, returning, signed-out, blocked | auth failure, underage, unavailable region, account locked |
| Home/Rewards | Returning-user hub for offers, stars, cards, recent orders, and primary actions | scan, order, gift, offers, card | signed-in, guest, personalized, loading | stale rewards, expired offer, card issue, offline |
| Store Finder | Choose cafe, pickup mode, and fulfillment context | GPS, address, store tap, amenities | nearby, saved, selected, closed | denied location, no stores, closed, pickup unavailable |
| Menu And Item Detail | Browse and customize drinks, food, and merchandise-like items | category, item, size, modifier | loaded, customized, favorite, unavailable | modifier limit, allergen warning, item sold out |
| Cart And Quote | Review order, rewards, tip, taxes, and payment before placing | quantity, reward, payment, tip | valid, stale quote, reward applied | store changed, item unavailable, payment missing |
| Order Status/Pickup | Show submitted order state and pickup instructions | status, receipt, help, reorder | submitted, preparing, ready, completed | delayed, store closed, missing item, duplicate |
| Scan And Pay | In-store payment credential and card balance | barcode, card, reload, history | ready, low balance, reloading | barcode expired, reload fail, fraud hold |
| Rewards And Offers | Manage Stars, status, benefits, games, and offers | redeem, activate, details | eligible, activated, redeemed, expired | conflict, store ineligible, reward unavailable |
| Gift Cards/eGifts | Send and manage stored cards and eGifts | recipient, design, amount, message | draft, sent, delivered, saved | delivery fail, fraud review, refund requested |
| Settings/Privacy/Support | Profile, payment, notifications, data rights, and help | toggles, forms, links, delete | verified, pending, submitted | 2FA fail, active order block, retention caveat |

## Data Model

- `User`: identity, contact, locale, Rewards membership, consent, notification preferences, privacy settings, and deletion/export lifecycle.
- `DeviceSession`: platform, app version, auth token, barcode token status, notification token, location permission, and offline cache version.
- `Store`: location, hours, amenities, pickup modes, status, menu version, availability flags, support contact, and region rules.
- `MenuItem`: category, size variants, modifier groups, nutrition/allergen notes, media metadata, price, inventory, and store-specific availability.
- `Cart`: selected store, items, modifiers, rewards, offers, tip, taxes, card/payment state, quote id, and validation errors.
- `Order`: cart snapshot, pickup mode, payment authorization, prep/pickup status, receipt, issue state, and audit ids.
- `StoredValueCard`: card token, balance, reload rules, transaction history, backup payment, fraud flags, and transfer/removal state.
- `RewardOffer`: Star balance, status tier, redemption value, expiration, campaign, activation, eligibility, and conflict rules.
- `EGift`: sender, recipient, design asset, amount, message, delivery channel, redemption status, refund state, and fraud review.
- `SupportCase`: issue type, order/card/reward link, evidence, decision, refund/credit outcome, owner queue, and SLA.
- `AuditEvent`: append-only record for auth, permission, search, availability, cart/reservation/order, payment/refund, support, moderation, business-tool, privacy, and safety-sensitive transitions.
- `LocalCacheRecord`: device-local cache entry for recent discovery results, detail pages, drafts, active transactions, settings, sync attempts, freshness markers, and conflict recovery.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` with device-scoped sessions, account locks, deletion state, and fraud/risk flags.
- `GET /home`, `GET /rewards`, `GET /offers`: personalized modules, card balance summary, Stars, offer eligibility, and stale-data indicators.
- `GET /stores`, `GET /stores/:id`, `GET /stores/:id/menu`: location search, store detail, hours, pickup modes, menu versions, and item availability.
- `POST /carts`, `PATCH /carts/:id`, `POST /carts/:id/validate`: cart and modifier validation, store availability, reward/offer conflicts, quote freshness, and idempotency.
- `POST /orders`, `GET /orders/:id`, `POST /orders/:id/reorder`: order placement, pickup status, receipt, support affordances, and reorder validation.
- `GET /cards`, `POST /cards/reload`, `POST /cards/:id/token`: stored-value balance, reload, transaction history, and short-lived scan token creation.
- `POST /egifts`, `GET /egifts/:id`, `POST /egifts/:id/resend`: eGift purchase, delivery status, resend, fraud review, and refund hooks.
- `POST /support/cases`, `GET /support/cases/:id`: order, card, reward, store, privacy, and payment support with evidence and decision state.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, ad/marketing preferences, active-order constraints, and retention caveats.
- Observability: all sensitive writes require idempotency keys, structured validation errors, privacy-safe logs, redacted analytics, and audit events.

## Realtime, Push, And Offline Behavior

- Availability, cart/reservation/order/payment/support/business-tool state changes must use websocket, SSE, or push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache discovery modules, recent detail pages, saved/favorite objects, active transaction summaries, settings, and drafts; cached data must always expose freshness and must not hide quote, inventory, review, or availability expiry.
- Low-risk local drafts may queue with retry metadata; payment, refund, reward redemption, account deletion, business operational writes, reports, moderation decisions, and regulated actions must block while offline.
- Push notifications must be opt-in, category-controlled, and content-minimized for transactional, reminder, account security, support, offer/marketing, business-tool, and safety categories.
- Realtime recovery must handle duplicate events, missed events, stale client state, provider outage, simultaneous edits, token expiry, app termination, clock skew, and revoked OS permissions.
- All manual-blocker surfaces must be feature-flagged until lawful hands-on verification confirms native behavior and provider/legal requirements.

## Permissions, Privacy, And Safety

- Launch payments owner for card/reload/order authorization.
- Launch loyalty owner for Stars and offer conflicts.
- Launch store operations owner for menu/inventory/pickup accuracy.
- Launch privacy owner for location, purchase, card, and marketing data.
- Launch support owner for refunds and unauthorized charges.
- Request location, notifications, camera/photos/files, contacts, tracking, biometric/device authentication, or Bluetooth only at the moment the user invokes a feature needing it.
- Default analytics must exclude raw payment credentials, precise location trails, private messages, support evidence, identity documents, sensitive health/allergy details, and user-generated review/photo content.
- Location UX must distinguish no location, approximate location, precise location, manually entered location, OS-revoked permission, outside-service-area, and unsupported-market states.
- Payments, refunds, stored value, tips, payouts, rewards, offers, advertising spend, and chargebacks must be provider-backed and jurisdiction-reviewed; never trust client-only financial state.
- User-generated content, reviews, photos/videos, messages, support evidence, and business responses require reporting, moderation, abuse prevention, appeal/support paths, and privacy redaction.
- Accessibility must target dynamic type, screen reader labels, focus order, visible focus, sufficient contrast, reduced motion, map/list alternatives, large touch targets, and accessible support channels.
- Data export, access, deletion, account closure, ad/marketing preferences, notification preferences, and privacy settings must be reachable from settings and covered by tests.

## Analytics And Monetization

- Track privacy-safe funnel events: onboarding started/completed, permission state changed, location selected, discovery viewed, search performed, filter applied, detail opened, primary action started/completed/failed, support opened, notification opened, data export requested, and account deletion requested.
- Track app-specific quality metrics with object ids, freshness timestamps, provider status, failure codes, quote or availability version, moderation state, and support SLA rather than raw addresses, payment data, private messages, or user content.
- Monetization can include original service fees, convenience fees, membership/loyalty benefits, advertising/sponsored placement, merchant tools, partner commissions, gift cards, or premium analytics only after legal, tax, consumer-protection, and disclosure review.
- Sponsored, promoted, recommended, personalized, or ranked content must be explainable enough for QA and privacy review, and must not copy Starbucks' ranking or advertising logic.
- Safety analytics must track report categories, fraud/risk signals, moderation states, support outcomes, refund reasons, appeal outcomes, and repeat-offender patterns without exposing private evidence to product analytics.

## Edge Cases

- First launch offline, expired session, unsupported OS, unsupported region, denied permissions, locked account, stale cache, and language/currency mismatch.
- Location is inaccurate, manually entered, outside service area, inside a restricted venue, crosses a regional boundary, or changes after cart/reservation/order creation.
- Listing, store, restaurant, product, bag, review, deal, reward, or business profile becomes unavailable, paused, sold out, closed, deleted, hidden, disputed, or region-blocked.
- Quote, price, tax, fee, reward, deal, inventory, availability, pickup, reservation, or support state changes between preview and confirmation.
- Duplicate taps, duplicate webhook delivery, retry after timeout, stale optimistic UI, provider outage, app termination, device clock skew, and partial local cache corruption.
- Payment fails, authorization succeeds but confirmation fails, refund is partial or delayed, benefit/reward is reversed, fraud hold appears, or support decision conflicts with user expectation.
- User-generated content contains private data, harassment, hate, illegal content, IP-infringing media, promotional spam, conflict of interest, extortion, or AI-generated review content.
- Data export, account deletion, payment method deletion, public content removal, support retention, business record retention, fraud investigation, or legal hold conflicts with a user request.

## Test Plan

- Unit tests for permission states, location selection, availability validation, primary object state machines, idempotency keys, quote freshness, support reason routing, and privacy-safe analytics payload construction.
- Unit tests for all app-specific financial or benefit states, including payment authorization, refund/credit, reward/deal/offer eligibility, cancellation cutoff, payout/lead/ad state, and duplicate webhook handling where relevant.
- Contract tests for every API route, including pagination, validation errors, stale-data indicators, idempotency, auth failures, provider outages, audit events, and privacy redaction.
- Integration tests for onboarding, signed-out browse where allowed, location fallback, search/filter, detail, primary action, history, support, notifications, settings, data export, and account deletion/closure.
- Offline tests for cached discovery/detail/history reads, queued low-risk drafts, blocked money/privacy/business/safety writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, approximate, and precise location; denied/revoked notifications; and camera/photos/files/contact gates where relevant.
- Trust/safety tests for report submission, moderation state transitions, fraud hold, unauthorized activity, abusive content, support escalation, and appeal or owner-response behavior.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, map/list alternatives, form errors, fee/policy comprehension, and support channel access.
- Manual verification tests for native iOS/Android screen capture, signup/login, Starbucks Card add/reload, payment authorization, scan-to-pay barcode behavior, mobile order quote refresh, store inventory, pickup timing, tip handling, birthday/reward redemption, eGift purchase/send, in-app delivery handoff, support/refund routing, account deletion, push payloads, Apple Watch behavior, and region-specific Rewards rules.
- Regression tests for every acceptance criterion before marking native/manual blockers resolved.

## Acceptance Criteria

- Exact marketplace, product, help/support, legal, privacy, and app-specific first-party URLs are listed; no source-discovery search URLs remain.
- A downstream team can build a public-source V1 with original branding, copy, data, media, integrations, maps, payment providers, support scripts, and ranking/availability logic.
- A new user can onboard, choose or deny optional permissions, reach discovery, inspect a detail surface, complete the app-specific primary action with stubs where needed, and recover from denied permissions or network loss.
- A returning user can search/filter, use saved/favorite/recent context, recover from stale availability, complete or safely cancel the primary workflow, and confirm server-owned state after reconnect.
- Business, merchant, restaurant, or store operator workflows are represented where relevant through routes, entities, permissions, audit logs, and tests.
- Payment, refund, reward/offer, cancellation, support, privacy, notification, moderation, analytics, and accessibility concerns are represented as server-owned contracts and testable states.
- Manual verification blockers remain explicit and feature-flagged until lawful test accounts/devices and any required provider approvals clear them.

## Open Questions

- Which launch regions determine availability, tax/fee display, payment methods, refund law, privacy rights, accessibility obligations, and support language?
- Which licensed data, map/geocoding, payment, messaging, notification, moderation, analytics, tax, and support providers will back V1?
- Which manual flows are feasible with ordinary lawful test accounts, and which require paid accounts, partner approval, business-owner accounts, physical devices, or regional access?
- What original seed data and media set will replace all Starbucks business, store, menu, review, rating, photo, and promotional content?

## Next Steps

- Capture lawful hands-on evidence for the listed manual blockers before removing any feature flags or parity blockers.
- Pick downstream implementation providers for auth, maps/search, payments, notifications, support, analytics, moderation, and storage.
- Produce an implementation repo build plan with route map, component map, API schema, state machines, seed data, and acceptance test checklist.
