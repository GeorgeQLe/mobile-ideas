# Too Good To Go-Style Clone Spec

> Metadata
> - Inspiration app: Too Good To Go
> - Category: surplus food marketplace, Surprise Bags, pickup windows, impact metrics, and store partner tools
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace listings, first-party product/help/legal/privacy pages, support pages, and app-specific public feature documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, location permission, map/list browse, favorite store alerts, Surprise Bag purchase, payment authorization/refund, cancellation before pickup window, delegate collection, pickup swipe/proof, store sold-out/cancellation, customer support, Special Rewards availability, store signup, MyStore operations, payouts, push payloads, account deletion/export, and country-specific availability still require lawful test devices/accounts and any required provider approvals before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, menus, listings, reviews, ratings, photos, store/business data, maps, payment providers, loyalty engines, recommendation systems, support scripts, merchant tools, and regulated workflows.

## Overview

Build an original mobile product inspired by Too Good To Go's public workflow for surplus food marketplace, Surprise Bags, pickup windows, impact metrics, and store partner tools. The clone must preserve the functional interaction model users expect while using original product language, synthetic or licensed data, independent ranking/availability/quote logic, and jurisdiction-aware compliance.

The clone must not copy Too Good To Go branding, screenshots, marketing copy, protected UI artwork, business/store data, menu copy, photos, reviews, ratings, private APIs, support scripts, recommendation logic, pricing formulas, or loyalty/offer terms. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first food waste reduction marketplace with complete onboarding, discovery, primary transaction, history, settings, support, privacy, and recovery flows.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around account security, payments, location, inventory/availability, support, refunds, reviews, loyalty, merchant/business tools, accessibility, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Too Good To Go-branded app or imply affiliation with Too Good To Go, its parent company, stores, restaurants, business owners, delivery partners, payment providers, or map providers.
- Do not scrape Too Good To Go, reuse private APIs, replay network traffic, copy marketplace data, copy menu/listing/review/media content, clone proprietary ranking/risk/loyalty systems, or reproduce policy/support copy.
- Do not process production payments, refunds, tips, stored value, identity documents, regulated goods, food-safety reports, advertising spend, business payouts, or support disputes without separate legal, compliance, privacy, trust/safety, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, reward, notification, support, refund, business-tooling, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/too-good-to-go-end-food-waste/id1060683933 | Official iOS listing, Food & Drink category, ratings, Editors Choice status, feature claims for map discovery, Surprise Bags, affordable surplus food, pickup windows, Instant Alerts, and impact framing. | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.app.tgtg | Official Android listing, download scale, app feature claims, data-safety orientation, and support path. | Verified 2026-04-17 |
| Too Good To Go US | https://www.toogoodtogo.com/en-us | Official consumer/product entrypoint for surplus food marketplace, app download, mission, and impact orientation. | Verified 2026-04-17 |
| User Terms | https://www.toogoodtogo.com/en-us/terms-and-conditions-using-the-app | User terms for App, Stores, Surprise Bags, platform use, reservations, purchase/collection, and consumer responsibilities. | Verified 2026-04-17 |
| Privacy Policy | https://www.toogoodtogo.com/en-us/privacy | Privacy policy for Users, Stores/Partners, location, payment-provider responses, delivery information, preferences, support, rights, and sensitive/allergy data handling. | Verified 2026-04-17 |
| Refund Help | https://tgtg.zendesk.com/hc/en-us/articles/32645614595986-Can-I-get-a-refund | Refund and compensation rules for store closure, sold out, quality issues, technical error, missed collection, change of mind, preferences, and processing time. | Verified 2026-04-17 |
| Missed Collection Help | https://tgtg.zendesk.com/hc/en-us/articles/27684120279186-What-happens-if-I-don-t-collect-my-Surprise-Bag | Missed pickup behavior, collection-window finality, cancellation timing, delegate collection, and flexibility guidance. | Verified 2026-04-17 |
| Become A Partner | https://www.toogoodtogo.com/en-us/become-a-partner | Store partner signup, Surprise Bag creation, price details, collection time, discovery feed/map visibility, pickup proof, quarterly payouts, and partner impact metrics. | Verified 2026-04-17 |
| Claims | https://www.toogoodtogo.com/en-us/claims | Impact and food-waste claim substantiation orientation for CO2e and environmental metrics. | Verified 2026-04-17 |
| Special Rewards Terms | https://tgtg.zendesk.com/hc/en-gb/articles/32600853045650-Terms-and-Conditions-for-Special-Rewards-Programme | Special Rewards/Campaigns terms for reward incentives and participating store behavior where available. | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must expose location, map/list discovery, favorites, Instant Alerts, pickup time filters, category/store filters, impact summary, and unavailable-market states.
- Discovery must support nearby stores, cafes, restaurants, grocery, bakery, prepared meal, produce, price, rating, distance, collection window, quantity remaining, favorite store, and sold-out states.
- Surprise Bag detail must show store profile, bag category, approximate value/price, collection window, quantity, rating, distance, allergens/food-safety caveat, contents-are-surprise warning, cancellation policy, and pickup instructions.
- Reservation/purchase must validate inventory, collection window, account, payment authorization, cancellation cutoff, delegate collection, duplicate reservation, and support/refund eligibility before confirmation.
- Pickup must model upcoming, ready-for-window, collect-by, swipe/confirm collection, delegated collector, missed collection, store closed, store sold out, wrong store, and completed impact states.
- Refund/support must distinguish store-caused failures, technical errors, quality/food-safety issues, missed collection, late cancellation, dislike/preferences, distance mistakes, and bank processing delays.
- Favorite and alert flows must support store following, Instant Alerts for newly posted bags, pickup window reminders, quiet hours, opt-in/opt-out, and revoked-permission fallback.
- Impact metrics must be transparent and source-backed, with CO2e/meals-saved values treated as configurable claims requiring substantiation and regional review.
- Store partner tools must support signup, store profile, bag templates, quantity, price, collection time, auto-repost controls, pause/sold-out/cancel, customer pickup confirmation, revenue tracking, and payout state.
- Privacy and safety must cover precise/coarse location, purchase history, dietary/allergy preferences if voluntarily shared, customer support evidence, payment-provider responses, store contact data, and deletion/export rights.

### Manual Verification Required

- Native iOS/Android screen capture.
- Signup/login.
- Location permission.
- Map/list browse.
- Favorite store alerts.
- Surprise Bag purchase.
- Payment authorization/refund.
- Cancellation before pickup window.
- Delegate collection.
- Pickup swipe/proof.
- Store sold-out/cancellation.
- Customer support.
- Special Rewards availability.
- Store signup.
- MyStore operations.
- Payouts.
- Push payloads.
- Account deletion/export.
- And country-specific availability.

### Build Plan

- Phase A: auth shell, location setup, discovery feed, map/list browse, bag detail, checkout stub, pickup pass, synthetic store/bag seed data, settings, and privacy links.
- Phase B: reservation state machine, payment stub, cancellation/refund routing, favorites, Instant Alerts, pickup reminders, impact metric display, and support cases.
- Phase C: partner store tools, bag templates, auto-repost/pause controls, revenue/payout state, food-safety issue escalation, Special Rewards flags, and privacy export/delete flows.
- Phase D: payment provider integration, claims substantiation/legal review, partner onboarding contracts, manual pickup evidence capture, accessibility audit, observability, and market rollout controls.

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
| Welcome/Auth/Consent | Entry, account, location, notification, payment, and legal consent | join, sign in, guest, legal | new, returning, signed-out | auth fail, unsupported market, permission denied |
| Discovery Feed | Nearby Surprise Bags and mission/product entry | location, filter, favorite, alert | nearby, personalized, loading | no bags, no market, stale inventory |
| Map/List Browse | Geographic search and pickup-window comparison | map, list, radius, time | available, sold out, favorite | distance misleading, location denied, offline |
| Surprise Bag Detail | Store, bag, price, value, collection window, and policy context | quantity, reserve, favorite | available, low quantity, sold out | window expired, allergen concern, policy warning |
| Checkout/Reservation | Authorize payment and reserve bag | payment, confirm, cancel | draft, authorizing, reserved | payment fail, duplicate, inventory gone |
| Order/Pickup Pass | Upcoming order and in-store collection proof | directions, delegate, swipe, help | upcoming, active window, collected | missed window, store closed, wrong store |
| Favorites/Instant Alerts | Follow stores and get real-time bag alerts | favorite, alert toggle, quiet hours | enabled, muted, notified | permission revoked, alert stale, store paused |
| Impact | Meals saved, CO2e claims, and personal/community progress | time range, share, detail | personal, community, loading | claim unavailable, regional caveat |
| Store Partner Tools | Store account, bag creation, collection windows, revenue, and payouts | bag, quantity, price, window | draft, live, paused, payout | sold out, no-show, payout hold |
| Settings/Privacy/Support | Profile, notifications, payment, help, privacy, export, deletion | toggles, forms, export, delete | verified, submitted, pending | active order block, refund denied, retention caveat |

## Data Model

- `User`: identity, contact, location preferences, dietary/allergy preferences if provided, favorites, alert settings, purchase history, and privacy lifecycle.
- `Store`: partner profile, location, category, hours, pickup instructions, rating summary, status, payout configuration, and market rules.
- `SurpriseBag`: store, category, approximate value, price, quantity, collection window, availability, food-safety caveats, media metadata, and campaign state.
- `Reservation`: user, bag snapshot, payment state, cancellation cutoff, collection window, delegate state, pickup proof, refund state, and audit ids.
- `PaymentIntent`: provider reference, authorization, capture/refund state, currency, duplicate prevention, and bank processing metadata.
- `PickupEvent`: active window, user/store confirmation, swipe state, missed collection, store cancellation, sold-out reason, and support trigger.
- `FavoriteAlert`: store, bag criteria, notification channel, sent state, quiet-hours handling, and expiry.
- `ImpactMetric`: meals saved, CO2e value, calculation version, region, source claim, user total, and share-safe display state.
- `PartnerAccount`: store owner, role, verification, bag templates, revenue, payout schedule, tax/bank references, and support state.
- `SupportCase`: reservation/store/payment link, issue type, evidence, refund decision, owner queue, appeal, and SLA.
- `AuditEvent`: append-only record for auth, permission, search, availability, cart/reservation/order, payment/refund, support, moderation, business-tool, privacy, and safety-sensitive transitions.
- `LocalCacheRecord`: device-local cache entry for recent discovery results, detail pages, drafts, active transactions, settings, sync attempts, freshness markers, and conflict recovery.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` with device-scoped sessions, account locks, deletion state, and fraud/risk flags.
- `GET /discovery`, `GET /stores`, `GET /surprise-bags`: nearby bags, filters, map/list payloads, favorites, inventory freshness, and market availability.
- `GET /surprise-bags/:id`, `POST /reservations`, `POST /reservations/:id/cancel`: bag detail, purchase authorization, inventory lock, cancellation cutoff, and idempotency.
- `GET /reservations/:id`, `POST /reservations/:id/delegate`, `POST /reservations/:id/collect`: pickup pass, delegate collection, collection proof, missed-window state, and audit events.
- `POST /payments/session`, `POST /payments/webhooks`, `POST /refunds`: payment authorization, capture, refund, duplicate webhook handling, and provider error mapping.
- `GET /favorites`, `POST /favorites`, `POST /alerts/preferences`: favorite stores, Instant Alerts, reminders, quiet hours, revoked-permission fallback, and alert expiry.
- `GET /impact`, `GET /claims/:region`: impact metrics, calculation version, substantiation links, regional caveats, and share-safe values.
- `GET /partner/stores`, `POST /partner/bags`, `PATCH /partner/bags/:id`, `GET /partner/payouts`: store profile, bag quantity/price/window, pause/cancel/sold-out, revenue, and payout state.
- `POST /support/cases`, `POST /data-export`, `DELETE /account`, `PATCH /privacy/settings`: support, refund review, privacy rights, active-reservation constraints, and retention caveats.
- Observability: all sensitive writes require idempotency keys, structured validation errors, privacy-safe logs, redacted analytics, and audit events.

## Realtime, Push, And Offline Behavior

- Availability, cart/reservation/order/payment/support/business-tool state changes must use websocket, SSE, or push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache discovery modules, recent detail pages, saved/favorite objects, active transaction summaries, settings, and drafts; cached data must always expose freshness and must not hide quote, inventory, review, or availability expiry.
- Low-risk local drafts may queue with retry metadata; payment, refund, reward redemption, account deletion, business operational writes, reports, moderation decisions, and regulated actions must block while offline.
- Push notifications must be opt-in, category-controlled, and content-minimized for transactional, reminder, account security, support, offer/marketing, business-tool, and safety categories.
- Realtime recovery must handle duplicate events, missed events, stale client state, provider outage, simultaneous edits, token expiry, app termination, clock skew, and revoked OS permissions.
- All manual-blocker surfaces must be feature-flagged until lawful hands-on verification confirms native behavior and provider/legal requirements.

## Permissions, Privacy, And Safety

- Launch marketplace owner for inventory freshness, pickup windows, and no-show handling.
- Launch payments owner for purchase, refund, and duplicate charge handling.
- Launch food safety owner for quality/allergen/escalation rules.
- Launch privacy owner for location, preferences, purchases, and support data.
- Launch partner operations owner for store setup, bag accuracy, payouts, and auto-repost controls.
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
- Sponsored, promoted, recommended, personalized, or ranked content must be explainable enough for QA and privacy review, and must not copy Too Good To Go's ranking or advertising logic.
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
- Manual verification tests for native iOS/Android screen capture, signup/login, location permission, map/list browse, favorite store alerts, Surprise Bag purchase, payment authorization/refund, cancellation before pickup window, delegate collection, pickup swipe/proof, store sold-out/cancellation, customer support, Special Rewards availability, store signup, MyStore operations, payouts, push payloads, account deletion/export, and country-specific availability.
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
- What original seed data and media set will replace all Too Good To Go business, store, menu, review, rating, photo, and promotional content?

## Next Steps

- Capture lawful hands-on evidence for the listed manual blockers before removing any feature flags or parity blockers.
- Pick downstream implementation providers for auth, maps/search, payments, notifications, support, analytics, moderation, and storage.
- Produce an implementation repo build plan with route map, component map, API schema, state machines, seed data, and acceptance test checklist.
