# Yelp-Style Clone Spec

> Metadata
> - Inspiration app: Yelp
> - Category: local business discovery, reviews, photos, messaging, booking, quotes, and business-owner tools
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace listings, first-party product/help/legal/privacy pages, support pages, and app-specific public feature documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, location permissions, review writing/editing, photo/video upload, check-ins, messaging, quote request, reservations/order handoff, ad/sponsored placement disclosure, recommendation software behavior, content moderation, business claim verification, Yelp for Business app flows, push payloads, account closure, and regional business data coverage still require lawful test devices/accounts and any required provider approvals before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, menus, listings, reviews, ratings, photos, store/business data, maps, payment providers, loyalty engines, recommendation systems, support scripts, merchant tools, and regulated workflows.

## Overview

Build an original mobile product inspired by Yelp's public workflow for local business discovery, reviews, photos, messaging, booking, quotes, and business-owner tools. The clone must preserve the functional interaction model users expect while using original product language, synthetic or licensed data, independent ranking/availability/quote logic, and jurisdiction-aware compliance.

The clone must not copy Yelp branding, screenshots, marketing copy, protected UI artwork, business/store data, menu copy, photos, reviews, ratings, private APIs, support scripts, recommendation logic, pricing formulas, or loyalty/offer terms. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first local discovery and review marketplace with complete onboarding, discovery, primary transaction, history, settings, support, privacy, and recovery flows.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around account security, payments, location, inventory/availability, support, refunds, reviews, loyalty, merchant/business tools, accessibility, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Yelp-branded app or imply affiliation with Yelp, its parent company, stores, restaurants, business owners, delivery partners, payment providers, or map providers.
- Do not scrape Yelp, reuse private APIs, replay network traffic, copy marketplace data, copy menu/listing/review/media content, clone proprietary ranking/risk/loyalty systems, or reproduce policy/support copy.
- Do not process production payments, refunds, tips, stored value, identity documents, regulated goods, food-safety reports, advertising spend, business payouts, or support disputes without separate legal, compliance, privacy, trust/safety, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, reward, notification, support, refund, business-tooling, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/yelp-food-services-reviews/id284910350 | Official iOS listing, Food & Drink category, Apple Watch support, feature claims for search, reservations, delivery/pickup, quotes, appointments, reviews, photos, check-ins, tips, and accessibility labels. | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.yelp.android | Official Android listing, app feature claims, data-safety orientation, support path, and release notes. | Verified 2026-04-17 |
| Yelp Consumer Site | https://www.yelp.com/ | Public local search, business categories, review, photo, and discovery marketplace entrypoint. | Verified 2026-04-17 |
| Yelp Support | https://www.yelp.com/support | Canonical support entrypoint for consumers and business owners. | Verified 2026-04-17 |
| Yelp Privacy Policy | https://terms.yelp.com/privacy/en_us/20200101_en_us/ | Privacy policy for account, public content, contacts, communications, transactions, activity, location, business sharing, retention, and rights. | Verified 2026-04-17 |
| Yelp Terms Of Service | https://terms.yelp.com/tos/en_us/20200101_en_us/ | Consumer terms, content, account, transactions, reviews, restrictions, IP, and dispute rules. | Verified 2026-04-17 |
| Yelp Content Guidelines | https://www.yelp.com/guidelines/content-guidelines | Guidelines for reviews, photos/videos, Ask the Community, messaging, events, conflicts of interest, privacy, and promotional content. | Verified 2026-04-17 |
| Yelp Moderation | https://www.yelp-support.com/article/How-we-moderate-content-at-Yelp?l=en_US | Human moderation, automated recommendation software, report handling, removal policy, fraud/inappropriate activity controls, and review trust posture. | Verified 2026-04-17 |
| Report A Review | https://www.yelp-support.com/article/How-do-I-report-a-review?l=en_US | Consumer and business-owner review reporting, moderation review, status, and notification paths. | Verified 2026-04-17 |
| Claimed Business | https://www.yelp-support.com/article/What-is-a-claimed-business?l=en_US | Business claim verification and free business-owner tools for responses, messages, leads, photos, and business info updates. | Verified 2026-04-17 |
| Yelp Business Page | https://business.yelp.com/products/business-page/ | Business-owner page product, claim flow, business profile features, and lead/reputation context. | Verified 2026-04-17 |
| Yelp For Business App | https://www.biz.yelp.com/support-center/article/What-is-the-Yelp-for-Business-app | Business app capabilities for leads, ads, reviews, messages, photos, reporting, password/profile updates, and multi-location switching. | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Home must support location-based category discovery, nearby recommendations, search, recent activity, bookmarks, deals/ads modules, review prompts, and privacy-safe personalization.
- Search must support business name, category, services, food, open-now, distance, rating, price, neighborhood, attributes, delivery/reservation/appointment availability, and sponsored result disclosure.
- Business detail must show original/synthetic business profile data, hours, address/map, phone, website, photos/videos, rating summary, reviews, tips, menu/services, quote/reservation/order entry, and claim status.
- Review creation must support rating, text, photos/videos, tips, drafts, edits within policy, conflict-of-interest warnings, personal-experience prompts, and AI-generated-review prohibition where applicable.
- Content moderation must support report reasons, status, human review, automated recommendation state, private-information detection, threats/hate/harassment filters, fraud patterns, and appeal/support paths.
- Messaging and quote request flows must support consumer-business conversations, request state, response status sharing, spam/fraud blocks, SMS/email notifications, and retention/disclosure rules.
- Transactions such as reservations, appointments, orders, or purchases must model third-party provider handoff, payment data minimization, vendor support owner, and review eligibility after transaction.
- Business-owner tools must support claim verification, profile updates, hours, photos, review responses, direct messages, quote leads, analytics, ad/lead state, multi-location switching, and report-review flows.
- Privacy controls must cover public profile/content visibility, contacts access, precise/background location, business data sharing, messages, transactions, account closure, and content dissociation.
- Developer/API surfaces must use licensed Yelp APIs or original data only; clone seed data must be synthetic or licensed and never scraped from Yelp listings or reviews.

### Manual Verification Required

- Native iOS/Android screen capture.
- Signup/login.
- Location permissions.
- Review writing/editing.
- Photo/video upload.
- Check-ins.
- Messaging.
- Quote request.
- Reservations/order handoff.
- Ad/sponsored placement disclosure.
- Recommendation software behavior.
- Content moderation.
- Business claim verification.
- Yelp for Business app flows.
- Push payloads.
- Account closure.
- Regional business data coverage.

### Build Plan

- Phase A: auth shell, location setup, discovery home, search/list/map, business detail, bookmarks, synthetic business/review seed data, settings, and privacy links.
- Phase B: review/photo compose, moderation/reporting, messages, quote requests, transaction handoff placeholders, notification preferences, and support cases.
- Phase C: business claim verification stub, owner tools, review responses, lead analytics, sponsored listing disclosure, recommendation-state modeling, and account closure/export.
- Phase D: licensed local data/API provider integration, media scanning, ad billing review, manual business-owner evidence capture, accessibility audit, and trust/legal signoff.

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
| Welcome/Auth/Consent | Entry, account, location, contacts, notification, and legal consent | join, sign in, guest, legal | new, returning, signed-out | auth fail, underage, permission denied |
| Discovery Home | Personalized local discovery and category entry | search, category, location, bookmark | nearby, personalized, loading | no location, sparse market, offline |
| Search/List/Map | Find businesses and services with filters and map/list parity | query, filters, map, sort | results, no results, sponsored | stale hours, closed, ad disclosure issue |
| Business Detail | Profile, reviews, photos, contact, transaction, and trust context | call, route, review, message, reserve | claimed, unclaimed, open, closed | incorrect data, provider unavailable, report needed |
| Review/Photo Compose | User-generated reviews, tips, photos, and videos | rating, text, media, draft | draft, submitted, edited | policy warning, upload fail, duplicate |
| Review Feed/Moderation | Read, filter, report, and moderate content | filter, report, vote, reply | recommended, not recommended, reported | private data, hate/harassment, conflict |
| Messages/Quotes | Consumer-business messages, quote requests, and leads | message, request, attachment | sent, responded, closed | spam, unsafe request, blocked |
| Reservations/Orders/Appointments | Partner-backed local transactions | provider, time, item, payment | available, booked, handed off | provider outage, refund owner, eligibility unknown |
| Business Owner Tools | Claimed-business profile, leads, reviews, photos, ads, and analytics | claim, reply, edit, upload | claimed, pending, multi-location | verification fail, report pending, ad dispute |
| Settings/Privacy/Support | Profile, public activity, location, contacts, data rights, and help | toggles, close, export, support | verified, submitted, pending | content retained, identity check fail, legal hold |

## Data Model

- `User`: identity, public profile, location preferences, contacts consent, bookmarks, reviews, messages, notification settings, and account closure lifecycle.
- `Business`: profile, category, address, geocode, hours, attributes, claim state, contact methods, media, rating summary, and provider integrations.
- `Review`: author, business, rating, text, media links, edit history, recommendation state, moderation state, reports, and publication visibility.
- `MediaAsset`: photo/video metadata, owner, business link, review/tip link, moderation flags, privacy risk, and license status.
- `SearchResult`: business reference, ranking reason, sponsored flag, filters matched, distance, hours freshness, and personalization state.
- `MessageThread`: consumer, business, request context, responses, attachments, delivery state, moderation, and retention rules.
- `QuoteRequest`: service category, job details, matched businesses, response state, status shared with businesses, and support state.
- `Transaction`: reservation/order/appointment/provider reference, payment-owner metadata, confirmation, cancellation, review eligibility, and support owner.
- `BusinessClaim`: verification method, representative, roles, location access, claim state, inactivity state, and audit events.
- `AdLeadMetric`: business page views, leads, ad clicks, campaign metadata, attribution, and privacy-safe aggregation.
- `AuditEvent`: append-only record for auth, permission, search, availability, cart/reservation/order, payment/refund, support, moderation, business-tool, privacy, and safety-sensitive transitions.
- `LocalCacheRecord`: device-local cache entry for recent discovery results, detail pages, drafts, active transactions, settings, sync attempts, freshness markers, and conflict recovery.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` with device-scoped sessions, account locks, deletion state, and fraud/risk flags.
- `GET /home`, `GET /search`, `GET /businesses/:id`: discovery modules, filters, business detail, sponsored flags, and stale-data indicators.
- `POST /reviews`, `PATCH /reviews/:id`, `POST /media`: review/media creation, policy checks, upload validation, edit windows, and moderation enqueue.
- `POST /content/:id/report`, `GET /moderation/status/:id`: review/photo/profile/message reports, moderation status, notification, and appeal/support paths.
- `POST /messages`, `POST /quote-requests`, `GET /quote-requests/:id`: consumer-business messaging, quote fanout, response status sharing, spam blocks, and retention.
- `POST /transactions/:provider/start`, `GET /transactions/:id`: reservations/orders/appointments provider handoff, confirmation, support owner, and review eligibility.
- `POST /business-claims`, `PATCH /businesses/:id`, `POST /businesses/:id/responses`: claim verification, business profile edits, review responses, and owner audit events.
- `GET /businesses/:id/metrics`, `GET /ads/campaigns`: lead analytics, ad state, sponsored placement disclosure, privacy-safe aggregation, and billing placeholders.
- `POST /data-export`, `DELETE /account`, `PATCH /privacy/settings`: privacy rights, account closure, public content dissociation, and retention caveats.
- Observability: all sensitive writes require idempotency keys, structured validation errors, privacy-safe logs, redacted analytics, and audit events.

## Realtime, Push, And Offline Behavior

- Availability, cart/reservation/order/payment/support/business-tool state changes must use websocket, SSE, or push-assisted polling with stable event ids and server reconciliation after reconnect.
- The client may cache discovery modules, recent detail pages, saved/favorite objects, active transaction summaries, settings, and drafts; cached data must always expose freshness and must not hide quote, inventory, review, or availability expiry.
- Low-risk local drafts may queue with retry metadata; payment, refund, reward redemption, account deletion, business operational writes, reports, moderation decisions, and regulated actions must block while offline.
- Push notifications must be opt-in, category-controlled, and content-minimized for transactional, reminder, account security, support, offer/marketing, business-tool, and safety categories.
- Realtime recovery must handle duplicate events, missed events, stale client state, provider outage, simultaneous edits, token expiry, app termination, clock skew, and revoked OS permissions.
- All manual-blocker surfaces must be feature-flagged until lawful hands-on verification confirms native behavior and provider/legal requirements.

## Permissions, Privacy, And Safety

- Launch trust owner for review integrity, recommendation state, and moderation appeals.
- Launch privacy owner for public content, contacts, location, messages, and account closure.
- Launch business platform owner for claim verification and owner responses.
- Launch ads owner for sponsored disclosure and lead attribution.
- Launch support owner for content reports and transaction-provider handoff.
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
- Sponsored, promoted, recommended, personalized, or ranked content must be explainable enough for QA and privacy review, and must not copy Yelp's ranking or advertising logic.
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
- Manual verification tests for native iOS/Android screen capture, signup/login, location permissions, review writing/editing, photo/video upload, check-ins, messaging, quote request, reservations/order handoff, ad/sponsored placement disclosure, recommendation software behavior, content moderation, business claim verification, Yelp for Business app flows, push payloads, account closure, and regional business data coverage.
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
- What original seed data and media set will replace all Yelp business, store, menu, review, rating, photo, and promotional content?

## Next Steps

- Capture lawful hands-on evidence for the listed manual blockers before removing any feature flags or parity blockers.
- Pick downstream implementation providers for auth, maps/search, payments, notifications, support, analytics, moderation, and storage.
- Produce an implementation repo build plan with route map, component map, API schema, state machines, seed data, and acceptance test checklist.
