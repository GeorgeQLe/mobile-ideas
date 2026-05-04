# ParkMobile-Style Clone Spec

> Metadata
> - Inspiration app: ParkMobile
> - Category: Transportation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-04.
> - Verification basis: exact public marketplace, official product, support, privacy, and legal URLs listed below; hands-on native/account/provider behavior remains blocked until verified.
> - Manual verification blockers: municipal zone rules, meter/session enforcement, extension availability, citation/refund handling, wallet/payment recovery, event parking validation, and city availability require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, media, policies, and integrations.

## Overview

Build an original mobile product inspired by ParkMobile's public user-facing workflow. The clone focus is zone lookup, mobile parking sessions, extensions, reservation/event parking, wallet/payment methods, receipts, alerts, support, and location privacy. This public-source V1 spec is implementation-ready for an original build, but every behavior marked `Manual verification required` must remain behind a documented blocker until lawful hands-on evidence confirms the exact native behavior.

## Goals

- Deliver a mobile-first experience centered on parking discovery, payment, reservation, or active-session flow.
- Preserve a clear distinction between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Model account, location, payment or entitlement, notification, support, privacy, and deletion/export behavior explicitly.
- Keep provider/operator/supplier data, maps, inventory, vehicle data, prices, ratings, and media synthetic or licensed until approved integrations exist.
- Support accessibility, localization, offline recovery, and safe retry behavior for high-consequence transaction, navigation, vehicle, or session states.

## Non-Goals

- Do not copy ParkMobile branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, ranking systems, route algorithms, vehicle integrations, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not implement production payments, ticketing, dispatch, vehicle controls, charging activation, parking enforcement, regulated mobility services, or real supplier bookings without separate legal/platform/provider review.
- Do not scrape private inventory or replay undocumented mobile APIs.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/parkmobile-park-pay-go/id365399299 | iOS listing, category, age rating, privacy labels, release notes, support links | Public source verified |
| Google Play listing | https://play.google.com/store/apps/details?id=net.sharewire.parkmobilev2 | Android listing, content rating, data safety, feature blurbs, update cadence | Public source verified |
| Official product site | https://parkmobile.io/ | Public product orientation for zone lookup, mobile parking sessions, extensions, reservation/event parking, wallet/payment methods, receipts, alerts, support, and location privacy | Public source verified |
| Help/support center | https://support.parkmobile.io/ | Support taxonomy, account, payment, cancellation, session, safety, dispute, and recovery flows | Public source verified |
| Privacy policy | https://parkmobile.io/privacy-policy/ | Personal data, location, payment, analytics, retention, export, deletion, and regional privacy rights | Public source verified |
| Terms/legal terms | https://parkmobile.io/terms-and-conditions/ | Eligibility, acceptable use, payment terms, cancellation, liability, content, and regional service constraints | Public source verified |

## Detailed Design

- Source-backed requirement: the app must provide a mobile home surface that launches directly into parking discovery, payment, reservation, or active-session flow.
- Source-backed requirement: discovery results must expose availability, location, timing, price or entitlement context, and provider/operator caveats before commitment.
- Source-backed requirement: detail pages must separate source-backed public facts from inferred clone data and synthetic seed content.
- Source-backed requirement: confirmation, session, remote-command, route, or recording flows must show validity, fees, safety warnings, cancellation terms, and provider handoff before the user confirms.
- Source-backed requirement: saved items, alerts, history, receipts, sessions, and support cases must be recoverable after app restart.
- Source-backed requirement: notification preferences must distinguish transactional, reminder, disruption, marketing, reward, safety, and account categories.
- Inferred V1 requirement: local drafts may be queued for low-risk planning edits, but payment, vehicle command, charging activation, parking enforcement, booking, or account deletion must require fresh server state.
- Inferred V1 requirement: provider/operator availability must carry timestamp, source, locale, currency, region, and stale-data markers.
- Manual verification required: municipal zone rules, meter/session enforcement, extension availability, citation/refund handling, wallet/payment recovery, event parking validation, and city availability.
- Manual verification required: marketplace privacy labels, OS permission prompts, push notification copy, subscription or payment recovery, and region-specific behavior.
- Legal implementation rule: use original names, original visual design, synthetic locations/offers/routes/vehicles, and licensed providers only.
- Accessibility requirement: all map, booking, charging, parking, vehicle, route, timer, live-status, and support controls must have screen-reader labels, visible focus, dynamic type support, contrast compliance, and reduced-motion alternatives.
- Privacy requirement: analytics must never include raw addresses, full route traces, payment credentials, identity documents, precise coordinates, vehicle identifiers, private messages, or support transcripts.
- Safety requirement: parking location, plate/zone/session details, payment methods, citations/disputes, and receipts data must be minimized, scoped, retained only as needed, and deleted/exported under user privacy requests unless retention is legally required.

## Core User Journeys

- New user installs, reviews an original value proposition, creates or restores an account, and reaches the primary home surface.
- Returning user searches or opens a saved item, compares options, and reaches a detail page with current availability and caveats.
- User filters by time, price, location, accessibility, cancellation, provider, connector, vehicle, map layer, or service type and understands why results changed.
- User starts parking discovery, payment, reservation, or active-session flow, sees all important terms or warnings, and can cancel before irreversible commitment.
- User receives a disruption, price, route, booking, command, charging, parking, or trip-status notification and lands on the correct recovery screen.
- User denies location, notification, camera, Bluetooth, motion, files, photos, biometrics, or contacts permission and receives a functional fallback.
- User loses connectivity mid-flow, sees local state preserved, and can retry, refresh, or discard without duplicate charges, duplicate bookings, unsafe commands, or lost tracks.
- User requests support, dispute, refund, safety help, or provider escalation and receives durable case status.
- User exports data, deletes the account, or changes privacy settings from the mobile app.
- User attempts a blocked paid, provider, region, hardware, vehicle, charging, parking, or outdoor-safety-dependent flow and sees a documented manual-verification blocker in non-production builds.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Core discovery and decision flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Zone Search | Core discovery and decision flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Map/List Results | Core discovery and decision flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Facility/Zone Detail | Core discovery and decision flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Start Session | Transaction, live state, or management flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Extend Session | Transaction, live state, or management flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Reservation Pass | Transaction, live state, or management flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Payment/Wallet | Trust, account, recovery, or support flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Receipts | Trust, account, recovery, or support flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |
| Support | Trust, account, recovery, or support flow | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |

## Data Model

- `DriverAccount`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `ParkingZone`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `ParkingFacility`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `ParkingSession`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `Reservation`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `PaymentMethod`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `Receipt`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `Reminder`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `NotificationPreference`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `SupportCase`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ParkMobile-style workflows.
- `User`: stores profile, auth lifecycle, locale, accessibility preferences, privacy settings, notification settings, export/delete state, and blocked-account status.
- `LocationContext`: stores coarse or precise coordinates, permission state, freshness, source, geofence/region rules, and minimization metadata.
- `PaymentIntent`: stores quoted amount, currency, taxes/fees, authorization state, idempotency key, refundability, provider handoff, and audit trail.
- `NotificationPreference`: stores transactional, reminder, disruption, safety, reward, and marketing opt-in state by device and channel.
- `SupportCase`: stores issue category, object reference, user-visible state, escalation path, attachments metadata, audit trail, and retention policy.
- `AuditEvent`: append-only record for account, payment, booking, command, charging, parking, route, support, privacy, safety, and entitlement state changes.
- `LocalCacheRecord`: device-local record for offline reads, queued low-risk drafts, stale markers, sync attempts, conflict resolution, and cache expiry.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions` with device-scoped session tracking.
- Profile: `GET /me`, `PATCH /me`, `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `DELETE /account`.
- Search: `GET /search` accepts query, coordinates, time window, filters, locale, currency, accessibility needs, safe-mode, and cursor.
- Results: `GET /results/{id}` returns source, freshness, availability, price/fare/entitlement caveats, cancellation terms, and localization keys.
- Detail: `GET /details/{id}` returns public facts, media-license metadata, synthetic-review markers, provider terms, and user-save state.
- Save/history: `POST /saved-items`, `DELETE /saved-items/{id}`, `GET /history`, and `DELETE /history/{id}`.
- Quote or session: `POST /quotes` or `POST /sessions/preview` returns validity, taxes/fees, provider availability, expiration, risk warnings, and idempotency keys.
- Commit: `POST /bookings`, `POST /parking-sessions`, `POST /charging-sessions`, `POST /vehicle-commands`, or `POST /tracks` requires fresh server state, policy acceptance, and audit event.
- Live state: `GET /active/{id}` plus websocket/SSE/polling fallback for status, alerts, provider updates, and missed-event reconciliation.
- Notifications: `GET /notification-preferences` and `POST /notification-preferences` with category, device token, locale, quiet-hours, and revocation support.
- Payments: `POST /checkout/session`, `POST /payment-methods`, `GET /receipts/{id}`, and webhook-backed payment/refund/chargeback reconciliation.
- Support: `POST /support-cases`, `GET /support-cases/{id}`, `POST /reports`, and `POST /refund-requests` with attachment metadata and escalation paths.
- Entitlements: `GET /entitlements`, `POST /entitlements/restore`, and webhook-backed trial, paid, expired, canceled, refunded, and unavailable states.
- Admin/review: internal endpoints must exist for fraud holds, safety reports, provider disputes, refund review, content moderation, command review, and privacy request processing before launch.

## Realtime, Push, And Offline Behavior

- Cache home, recent searches, details, saved items, settings, entitlements, active sessions, active routes, and support cases for offline reads.
- Mark every cached result with freshness, source, locale, and user-visible stale-state copy.
- Queue only low-risk drafts while offline; block booking, payment, charging activation, remote vehicle commands, parking enforcement writes, cancellation, and deletion until canonical server state is reachable.
- Realtime transport must reconcile after reconnect and reject duplicate status changes with idempotency keys.
- Push notifications must deep-link into route, booking, charging, parking, vehicle, receipt, support, privacy, or safety states without exposing sensitive content on the lock screen.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, time-zone changes, and provider outage.
- Long-running actions must expose pending, complete, failed, canceled, expired, refunded, disputed, and provider-unavailable states with recovery actions.
- Offline support must preserve accessibility state and avoid map-only recovery paths.

## Permissions, Privacy, And Safety

- Treat parking location, plate/zone/session details, payment methods, citations/disputes, and receipts as a launch-blocking privacy review area with owner, mitigation, retention policy, and acceptance tests.
- Treat payments, fees, passes, bookings, refunds, penalties, deposits, subscriptions, claims, and receipts as a launch-blocking financial/support review area with owner, mitigation, refund/dispute rules, and acceptance tests.
- Treat fraud, spam, review abuse, unsafe pickup/meeting points, identity misuse, provider impersonation, account takeover, unsafe remote commands, and unsafe outdoor guidance as launch-blocking safety risks.
- Request location, notifications, camera, Bluetooth, motion, contacts, photos, files, microphone, biometrics, or calendar access only at the moment the user invokes a feature needing it.
- Provide denied-permission fallbacks, settings education, and no dark patterns around consent.
- Use coarse location by default for discovery and require explicit justification for precise/background location.
- Minimize sensitive data in analytics, logs, crash reports, support tooling, and A/B experiments.
- Provide privacy policy, terms, data export, delete account, report abuse/safety issue, block/mute where relevant, and support escalation from settings.
- Keep provider/supplier/operator credentials, private APIs, production ticketing, dispatch, vehicle controls, charging activation, parking enforcement, insurance, and payment capabilities out of V1 until approved.
- Use synthetic or licensed sample data only; do not commit real user trips, routes, receipts, messages, identity documents, vehicle identifiers, charging records, parking records, or payment artifacts.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, and `onboarding_skipped` with source, locale, and experiment ids.
- Search events: `search_started`, `filter_changed`, `map_moved`, `result_opened`, `availability_refreshed`, and `provider_handoff_started`.
- Transaction events: `quote_requested`, `quote_expired`, `commit_started`, `commit_completed`, `commit_failed`, `receipt_opened`, and `refund_requested`.
- Retention events: `favorite_saved`, `trip_saved`, `alert_created`, `notification_opened`, `history_opened`, and `offline_recovered`.
- Safety events: `safety_tool_opened`, `report_submitted`, `support_case_created`, `privacy_setting_changed`, `data_export_requested`, and `account_delete_requested`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, and `entitlement_expired`.
- Monetization model: support original free/trial/paid, referral, reward, booking-fee, pass, or subscription mechanics using original naming and synthetic pricing; do not copy exact plan names or promotional copy.
- Analytics rule: never send raw addresses, precise coordinates, route traces, payment credentials, identity documents, private messages, support transcripts, health/disability information, child data, or vehicle identifiers as event properties.

## Edge Cases

- First launch with no network, no account, expired session, unsupported OS, or unavailable region.
- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.
- Search results become stale, sold out, canceled, rerouted, delayed, hidden, region-locked, unavailable, occupied, or provider-unavailable after display.
- Quote expires, fare changes, taxes/fees differ, payment authorization fails, duplicate tap occurs, or webhook delivery repeats.
- Provider handoff opens the wrong locale, currency, vehicle, station, zone, garage, or deep link; user returns without confirmed status.
- Live session, command, route, recording, parking, or charging status misses an event and must reconcile from canonical server state.
- Support case, refund, safety report, or privacy request remains active while the account is deleted.
- Subscription restored on another platform, refunded externally, expired offline, or unavailable in the user's region.
- Map data, station data, vehicle location, parking inventory, route data, reviews, or place metadata has conflicting providers or missing accessibility attributes.
- User-generated content, reviews, routes, photos, reports, or messages are spam, abusive, fraudulent, unsafe, or policy-violating.
- Device clock/time zone changes during booking, session timing, vehicle command, charge window, parking expiration, route navigation, or offer expiration.
- App terminated during checkout, parking session, charging session, vehicle command, upload, route navigation, recording, or cancellation.

## Test Plan

- Unit tests for validation, state machines, quote expiry, entitlement checks, idempotency keys, stale markers, and privacy-safe analytics payload construction.
- Integration tests for auth, search, filters, map/list results, detail, saved items, history, notification preferences, support, export, and deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, quote freshness, provider handoff, and realtime reconciliation path.
- Offline tests for cached reads, queued low-risk drafts, blocked high-risk writes, reconnect reconciliation, corrupt-cache recovery, and app termination.
- Permission tests for denied, granted, revoked, limited, approximate, precise, background, notification, camera, Bluetooth, motion, files, biometrics, and photos states where relevant.
- Payment and entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, unavailable market, failed authorization, duplicate webhook, and receipt generation.
- Safety tests for report submission, fraud hold, unsafe pickup/location warning, unsafe remote command warning, account takeover recovery, support escalation, and moderation/policy state changes.
- Accessibility tests for screen-reader labels, map alternatives, focus order, dynamic type, contrast, reduced motion, timers, live status, and media alternatives.
- Localization tests for currency, taxes/fees, distance units, time zones, translated legal links, regional inventory, and right-to-left layouts where supported.
- Regression tests for every acceptance criterion before marking downstream implementation complete.
- Manual verification checklist tests for municipal zone rules, meter/session enforcement, extension availability, citation/refund handling, wallet/payment recovery, event parking validation, and city availability.
- Legal/source tests confirming no copied brand assets, screenshots, marketing copy, private APIs, unlicensed datasets, or proprietary media enter the implementation repo.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- Public source-discovery links are replaced with exact marketplace, product, support, privacy, and legal URLs.
- Every source-backed behavior is distinguishable from inferred V1 behavior and manual-verification blockers.
- A new user can complete onboarding and reach the default home surface without unsupported permissions.
- A returning user can complete parking discovery, payment, reservation, or active-session flow, recover from a network failure, and confirm canonical server state after reconnect.
- Search/browse, detail, save/share, notification, settings, support, receipt, and deletion/export flows are represented in routes and tests.
- All data entities have owners, lifecycle states, authorization rules, source provenance, and deletion/export behavior.
- Location, payment, provider/operator, safety, support, accessibility, and regional availability risks have explicit blockers and acceptance tests.
- At least 12 acceptance tests cover happy path, empty state, permission denial, offline behavior, stale data, accessibility, support/safety, billing/entitlements, notifications, data deletion/export, region lock, and regression behavior.

## Open Questions

- Which hands-on flows require paid access, production provider credentials, identity verification, physical vehicle/device access, hardware access, regulated sandbox, or region-specific availability?
- Which providers will supply maps, route data, parking/charging/vehicle inventory, pricing, payment, identity, notification, analytics, and support services for the original clone?
- Which public-source claims need a dedicated research note before downstream implementation starts?
- Which features should be excluded from V1 because they require regulated review, production partnerships, hardware access, safety operations, or legal approval?
- What retention periods apply to parking location, plate/zone/session details, payment methods, citations/disputes, and receipts, support cases, receipts, and audit records in each launch region?

## Build Plan

- Phase 1: Build the route map, design system, synthetic seed-data policy, source-provenance model, and legal asset guardrails.
- Phase 2: Implement onboarding, auth shell, home, search, map/list results, detail, saved/history, and settings with original copy.
- Phase 3: Add quote, booking/referral/session/command/recording shells, receipts, notification preferences, entitlement states, and support flows with blocked production-provider integrations.
- Phase 4: Add backend contracts, offline/retry handling, realtime reconciliation, stale-data markers, privacy export/delete, and audit events.
- Phase 5: Add safety/reporting, fraud-hold, provider-dispute, refund/cancellation, accessibility, localization, and regional-availability test coverage.
- Phase 6: Integrate approved providers only after legal/platform review; keep production payment, parking enforcement, charging activation, vehicle controls, insurance, and supplier bookings disabled until approved.
- Phase 7: Conduct lawful hands-on verification for municipal zone rules, meter/session enforcement, extension availability, citation/refund handling, wallet/payment recovery, event parking validation, and city availability, then update this spec with evidence before any one-for-one parity claim.

## Next Steps

- Promote the next Step 8.3 slice only after this slice passes structural and readiness validation.
- Add implementation-plan queue rows in Phase 5 only after corresponding specs reach implementation-ready V1.
- Keep downstream scaffold repositories private and avoid claiming implementation-ready parity until this source spec is copied forward.
- Capture any future hands-on verification in a separate dated research note before converting blocked behavior into verified native parity.
