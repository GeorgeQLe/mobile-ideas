# LoopNet-Style Clone Spec

> Metadata
> - Inspiration app: LoopNet
> - Category: Real estate and home services
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product, support, privacy, and legal URLs listed below; hands-on native/account/provider behavior remains blocked until verified.
> - Manual verification blockers: commercial listing freshness, broker lead routing, listing financial fields, video/media availability, saved alert delivery, market/country coverage, location prompts, push alerts, and commercial data licensing require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, media, policies, and integrations.

## Overview

Build an original mobile product inspired by LoopNet's public user-facing workflow. The clone focus is commercial real-estate search, sale and lease listing discovery, map/list comparison, property financial/detail pages, broker contact, saved properties, alerts, videos/photos, and data licensing controls. This public-source V1 spec is implementation-ready for an original build, but every behavior marked `Manual verification required` must remain behind a documented blocker until lawful hands-on evidence confirms the exact native behavior.

## Goals

- Deliver a mobile-first real estate and home services experience centered on listing/search, detail, lead/contact, booking, messaging, review, provider-tool, and trust/safety workflow.
- Preserve a clear distinction between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Model account, location, permission, notification, entitlement, support, privacy, and deletion/export behavior explicitly.
- Keep provider/operator/supplier/device/listing/catalog data, prices, media, reviews, hardware state, and maps synthetic or licensed until approved integrations exist.
- Support accessibility, localization, offline recovery, and safe retry behavior for high-consequence property, provider, lead, booking, and payment states.

## Non-Goals

- Do not copy LoopNet branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, ranking systems, device protocols, listing feeds, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not implement production lead sale, application/deposit submission, payment processing, contractor dispatch, brokerage, regulated lending, and provider payouts without separate legal/platform/provider review.
- Do not scrape private inventory, private listings, private messages, private device state, or replay undocumented mobile APIs.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/loopnet-real-estate/id349561448 | iOS listing, category, age rating, privacy labels, release notes, support links | Public source verified |
| Google Play listing | https://play.google.com/store/apps/details?id=com.loopnet.android | Android listing, content rating, data safety, feature blurbs, update cadence | Public source verified |
| Official product site | https://www.loopnet.com/ | Public product orientation for commercial real-estate search, sale and lease listing discovery, map/list comparison, property financial/detail pages, broker contact, saved properties, alerts, videos/photos, and data licensing controls | Public source verified |
| Help/support center | https://www.loopnet.com/help/ | Support taxonomy, account, onboarding, booking, lead, device, privacy, recovery, and troubleshooting flows | Public source verified |
| Privacy policy | https://www.costargroup.com/about/privacy-notice | Personal data, location, device, household, payment, analytics, retention, export, deletion, and regional privacy rights | Public source verified |
| Terms/legal terms | https://www.loopnet.com/solutions/terms-of-use | Eligibility, acceptable use, subscription, payment, lead, device, liability, content, and regional service constraints | Public source verified |

## Detailed Design

- Source-backed requirement: the app must provide a mobile home surface that launches directly into listing/search, detail, lead/contact, booking, messaging, review, provider-tool, and trust/safety workflow.
- Source-backed requirement: discovery and detail views must expose availability, freshness, location, price, capability, entitlement, and provider/operator caveats before commitment.
- Source-backed requirement: detail pages must separate source-backed public facts from inferred clone data and synthetic seed content.
- Source-backed requirement: lead, contact, booking, quote, project, listing, and provider-handoff flows must show validity, safety warnings, fees or subscription caveats, cancellation terms, and provider handoff before the user confirms.
- Source-backed requirement: saved items, favorites, alerts, messages, history, receipts, devices, automations, and support cases must be recoverable after app restart where applicable.
- Source-backed requirement: notification preferences must distinguish transactional, reminder, security, device, lead, marketing, reward, and account categories.
- Inferred V1 requirement: local drafts may be queued for low-risk edits, but payment, lead submission, booking, provider dispatch, device control, automation execution, security action, or account deletion must require fresh server state.
- Inferred V1 requirement: provider/device/listing availability must carry timestamp, source, locale, currency, region, permission, and stale-data markers.
- Manual verification required: commercial listing freshness, broker lead routing, listing financial fields, video/media availability, saved alert delivery, market/country coverage, location prompts, push alerts, and commercial data licensing.
- Manual verification required: marketplace privacy labels, OS permission prompts, push notification copy, subscription or payment recovery, and region-specific behavior.
- Legal implementation rule: use original names, original visual design, synthetic listings/projects/devices, and licensed providers only.
- Accessibility requirement: all search, map, booking, message, device, live-status, timer, automation, camera, and support controls must have screen-reader labels, visible focus, dynamic type support, contrast compliance, and reduced-motion alternatives.
- Privacy requirement: analytics must never include raw addresses, full home layouts, precise coordinates, payment credentials, private messages, camera/audio content, device identifiers, access codes, or support transcripts.
- Safety requirement: home search locations, saved properties, project requests, lead/contact data, messages, provider profiles, reviews, household intent, and payment/support history must be minimized, scoped, retained only as needed, and deleted/exported under user privacy requests unless retention is legally required.

## Core User Journeys

- New user installs, reviews an original value proposition, creates or restores an account, and reaches the primary home surface.
- Returning user searches, opens a saved item, or checks a device/dashboard and sees current availability, status, and caveats.
- User filters by price, location, category, provider, feature, compatibility, safety, accessibility, or service type and understands why results changed.
- User starts listing/search, detail, lead/contact, booking, messaging, review, provider-tool, and trust/safety workflow, sees all important terms or warnings, and can cancel before irreversible commitment.
- User receives a lead, booking, price, availability, device, security, automation, or support notification and lands on the correct recovery screen.
- User denies location, notification, camera, microphone, Bluetooth, motion, files, photos, contacts, or local-network permission and receives a functional fallback.
- User loses connectivity mid-flow, sees local state preserved, and can retry, refresh, or discard without duplicate payments, duplicate leads, unsafe device actions, or lost messages.
- User requests support, dispute, refund, safety help, trust review, or provider escalation and receives durable case status.
- User exports data, deletes the account, or changes privacy settings from the mobile app.
- User attempts a blocked paid, provider, region, hardware, security, brokerage, or regulated flow and sees a documented manual-verification blocker in non-production builds.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Commercial Search | Core discovery and control flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Map Results | Core discovery and control flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| List Results | Core discovery and control flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Property Detail | Core discovery and control flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Financials | Commitment, live state, or management flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Media Gallery | Commitment, live state, or management flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Broker Contact | Commitment, live state, or management flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Saved Properties | Commitment, live state, or management flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Alerts | Trust, account, privacy, or support flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Market Filters | Trust, account, privacy, or support flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Settings | Trust, account, privacy, or support flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |
| Support | Trust, account, privacy, or support flow | taps, forms, filters, map gestures, messages, deep links | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale data, offline, region-locked, provider error, blocked entitlement |

## Data Model

- `CommercialListing`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `PropertyFinancials`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `BrokerProfile`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `LeadRequest`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `SavedProperty`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `AlertRule`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `ListingMedia`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `MarketRegion`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `LeaseTerm`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `DataAttribution`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for LoopNet-style workflows.
- `User`: stores profile, auth lifecycle, locale, accessibility preferences, privacy settings, notification settings, export/delete state, and blocked-account status.
- `LocationContext`: stores coarse or precise coordinates, permission state, freshness, source, geofence/region rules, and minimization metadata.
- `PaymentIntent`: stores quoted amount, currency, taxes/fees, authorization state, idempotency key, refundability, provider handoff, and audit trail.
- `NotificationPreference`: stores transactional, reminder, security, device, lead, reward, and marketing opt-in state by device and channel.
- `SupportCase`: stores issue category, object reference, user-visible state, escalation path, attachments metadata, audit trail, and retention policy.
- `AuditEvent`: append-only record for account, payment, lead, booking, message, device, automation, security, support, privacy, safety, and entitlement state changes.
- `LocalCacheRecord`: device-local record for offline reads, queued low-risk drafts, stale markers, sync attempts, conflict resolution, and cache expiry.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions` with device-scoped session tracking.
- Profile: `GET /me`, `PATCH /me`, `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `DELETE /account`.
- Search/status: `GET /search` or `GET /dashboard` accepts query, coordinates, filters, locale, accessibility needs, entitlement context, permission state, and cursor.
- Results: `GET /results/{id}` returns source, freshness, availability, price/capability caveats, cancellation terms, and localization keys.
- Detail: `GET /details/{id}` returns public facts, media-license metadata, synthetic-review markers, provider terms, capability state, and user-save state.
- Save/history: `POST /saved-items`, `DELETE /saved-items/{id}`, `GET /history`, and `DELETE /history/{id}`.
- Lead/quote/command preview: `POST /previews` returns validity, fees, provider availability, safety warnings, expiration, policy requirements, and idempotency keys.
- Commit: `POST /lead-requests`, `POST /bookings`, `POST /messages`, `POST /device-commands`, or `POST /automations` requires fresh server state, policy acceptance, authorization, and audit event.
- Live state: `GET /active/{id}` plus websocket/SSE/polling fallback for status, alerts, provider updates, device telemetry, and missed-event reconciliation.
- Notifications: `GET /notification-preferences` and `POST /notification-preferences` with category, device token, locale, quiet-hours, and revocation support.
- Payments/entitlements: `POST /checkout/session`, `GET /entitlements`, `POST /entitlements/restore`, `GET /receipts/{id}`, and webhook-backed payment/refund/subscription reconciliation.
- Support/trust: `POST /support-cases`, `GET /support-cases/{id}`, `POST /reports`, and `POST /refund-requests` with attachment metadata and escalation paths.
- Admin/review: internal endpoints must exist for fraud holds, provider disputes, listing review, device-security review, refund review, content moderation, and privacy request processing before launch.

## Realtime, Push, And Offline Behavior

- Cache home, recent searches, details, saved items, settings, entitlements, active leads/bookings/devices, automations, and support cases for offline reads.
- Mark every cached result or device state with freshness, source, locale, permission state, and user-visible stale-state copy.
- Queue only low-risk drafts while offline; block payment, lead submission, booking, provider dispatch, device control, automation execution, security action, cancellation, and deletion until canonical server state is reachable.
- Realtime transport must reconcile after reconnect and reject duplicate status changes with idempotency keys.
- Push notifications must deep-link into lead, booking, message, device, alert, automation, receipt, support, privacy, or safety states without exposing sensitive content on the lock screen.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, time-zone changes, provider outage, and device offline state.
- Long-running actions must expose pending, complete, failed, canceled, expired, refunded, disputed, and unavailable states with recovery actions.
- Offline support must preserve accessibility state and avoid map-only, camera-only, or device-only recovery paths.

## Permissions, Privacy, And Safety

- Treat home search locations, saved properties, project requests, lead/contact data, messages, provider profiles, reviews, household intent, and payment/support history as a launch-blocking privacy review area with owner, mitigation, retention policy, and acceptance tests.
- Treat payments, deposits, lead fees, subscriptions, pro payouts, receipts, refunds, chargebacks, and commerce handoffs as launch-blocking financial/support review areas.
- Treat fraud, spam, review abuse, unsafe in-home meetings, identity misuse, provider impersonation, account takeover, unauthorized device control, camera/audio exposure, and unsafe automations as launch-blocking safety risks.
- Request location, notifications, camera, microphone, Bluetooth, motion, contacts, photos, files, local network, biometrics, or calendar access only at the moment the user invokes a feature needing it.
- Provide denied-permission fallbacks, settings education, and no dark patterns around consent.
- Use coarse location by default for discovery and require explicit justification for precise/background location.
- Minimize sensitive data in analytics, logs, crash reports, support tooling, and A/B experiments.
- Provide privacy policy, terms, data export, delete account, report abuse/safety issue, block/mute where relevant, and support escalation from settings.
- Keep provider/supplier/operator credentials, private APIs, production listing feeds, device credentials, security operations, and payment capabilities out of V1 until approved.
- Use synthetic or licensed sample data only; do not commit real user addresses, property leads, projects, messages, camera/audio content, device identifiers, access codes, receipts, or payment artifacts.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, and `onboarding_skipped` with source, locale, and experiment ids.
- Discovery/status events: `search_started`, `filter_changed`, `dashboard_viewed`, `result_opened`, `availability_refreshed`, and `provider_handoff_started`.
- Commitment events: `preview_requested`, `commit_started`, `commit_completed`, `commit_failed`, `message_sent`, `receipt_opened`, and `refund_requested`.
- Retention events: `favorite_saved`, `alert_created`, `device_checked`, `notification_opened`, `history_opened`, and `offline_recovered`.
- Safety events: `safety_tool_opened`, `report_submitted`, `support_case_created`, `privacy_setting_changed`, `data_export_requested`, and `account_delete_requested`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, and `entitlement_expired`.
- Monetization model: support original free/trial/paid, referral, lead, marketplace, commerce, pro, device, security, or subscription mechanics using original naming and synthetic pricing; do not copy exact plan names or promotional copy.
- Analytics rule: never send raw addresses, precise coordinates, full home layouts, access codes, payment credentials, identity documents, private messages, support transcripts, camera/audio content, device identifiers, or child data as event properties.

## Edge Cases

- First launch with no network, no account, expired session, unsupported OS, unavailable region, or unsupported device/platform.
- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.
- Listing, provider, product, device, or automation state becomes stale, sold out, unavailable, offline, hidden, region-locked, or provider-unavailable after display.
- Quote, lead, booking, device command, automation, subscription, or checkout expires, changes, fails authorization, duplicates, or receives repeated webhook events.
- Provider handoff opens the wrong locale, property, project, device, product, or deep link; user returns without confirmed status.
- Live lead/booking/message/device/automation/security status misses an event and must reconcile from canonical server state.
- Support case, refund, safety report, trust review, or privacy request remains active while the account is deleted.
- Subscription restored on another platform, refunded externally, expired offline, or unavailable in the user's region.
- Map/listing/provider/device data has conflicting sources or missing accessibility attributes.
- User-generated content, reviews, messages, listings, projects, photos, or reports are spam, abusive, fraudulent, unsafe, or policy-violating.
- Device clock/time zone changes during booking windows, scheduled automations, alerts, subscriptions, offers, or provider appointments.
- App terminated during checkout, lead submission, upload, messaging, device setup, automation execution, or cancellation.

## Test Plan

- Unit tests for validation, state machines, quote/command expiry, entitlement checks, idempotency keys, stale markers, and privacy-safe analytics payload construction.
- Integration tests for auth, search/dashboard, filters, map/list/detail, saved items, messages, notification preferences, support, export, and deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, freshness, provider handoff, and realtime reconciliation path.
- Offline tests for cached reads, queued low-risk drafts, blocked high-risk writes, reconnect reconciliation, corrupt-cache recovery, and app termination.
- Permission tests for denied, granted, revoked, limited, approximate, precise, background, notification, camera, microphone, Bluetooth, local-network, files, and photos states where relevant.
- Payment and entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, unavailable market, failed authorization, duplicate webhook, and receipt generation.
- Safety tests for report submission, fraud hold, unsafe in-home meeting warning, unauthorized device-control warning, account takeover recovery, support escalation, and moderation/policy state changes.
- Accessibility tests for screen-reader labels, map alternatives, focus order, dynamic type, contrast, reduced motion, timers, live status, media alternatives, and non-visual device controls.
- Localization tests for currency, taxes/fees, distance units, time zones, translated legal links, regional inventory/device support, and right-to-left layouts where supported.
- Regression tests for every acceptance criterion before marking downstream implementation complete.
- Manual verification checklist tests for commercial listing freshness, broker lead routing, listing financial fields, video/media availability, saved alert delivery, market/country coverage, location prompts, push alerts, and commercial data licensing.
- Legal/source tests confirming no copied brand assets, screenshots, marketing copy, private APIs, unlicensed datasets, device secrets, listing feeds, or proprietary media enter the implementation repo.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- Public source-discovery links are replaced with exact marketplace, product, support, privacy, and legal URLs or documented platform blockers.
- Every source-backed behavior is distinguishable from inferred V1 behavior and manual-verification blockers.
- A new user can complete onboarding and reach the default home surface without unsupported permissions.
- A returning user can complete listing/search, detail, lead/contact, booking, messaging, review, provider-tool, and trust/safety workflow, recover from a network failure, and confirm canonical server state after reconnect.
- Search/browse/dashboard, detail/control, save/share, notification, settings, support, receipt, and deletion/export flows are represented in routes and tests.
- All data entities have owners, lifecycle states, authorization rules, source provenance, and deletion/export behavior.
- Location, device, payment, provider/operator, safety, support, accessibility, and regional availability risks have explicit blockers and acceptance tests.
- At least 12 acceptance tests cover happy path, empty state, permission denial, offline behavior, stale data, accessibility, support/safety, billing/entitlements, notifications, data deletion/export, region lock, and regression behavior.

## Open Questions

- Which hands-on flows require paid access, production provider credentials, identity verification, physical device access, regulated sandbox, in-home service operations, brokerage review, or region-specific availability?
- Which providers will supply maps, listings, projects, professionals, product catalog, device integrations, payments, identity, notifications, analytics, and support services for the original clone?
- Which public-source claims need a dedicated research note before downstream implementation starts?
- Which features should be excluded from V1 because they require regulated review, production partnerships, hardware access, security operations, or legal approval?
- What retention periods apply to home search locations, saved properties, project requests, lead/contact data, messages, provider profiles, reviews, household intent, and payment/support history, support cases, receipts, and audit records in each launch region?

## Build Plan

- Phase 1: Build the route map, design system, synthetic seed-data policy, source-provenance model, and legal asset guardrails.
- Phase 2: Implement onboarding, auth shell, home, search/dashboard, map/list/detail or device-control surfaces, saved/history, and settings with original copy.
- Phase 3: Add lead/contact/booking/message/device-command/automation shells, receipts, notification preferences, entitlement states, and support flows with blocked production-provider integrations.
- Phase 4: Add backend contracts, offline/retry handling, realtime reconciliation, stale-data markers, privacy export/delete, and audit events.
- Phase 5: Add safety/reporting, fraud-hold, provider-dispute, device-security, refund/cancellation, accessibility, localization, and regional-availability test coverage.
- Phase 6: Integrate approved providers only after legal/platform review; keep production lead sale, application/deposit submission, payment processing, contractor dispatch, brokerage, regulated lending, and provider payouts disabled until approved.
- Phase 7: Conduct lawful hands-on verification for commercial listing freshness, broker lead routing, listing financial fields, video/media availability, saved alert delivery, market/country coverage, location prompts, push alerts, and commercial data licensing, then update this spec with evidence before any one-for-one parity claim.

## Next Steps

- Keep this spec as the source contract for a downstream private scaffold until hands-on verification clears the listed blockers.
- Capture public-source research notes for marketplace privacy labels, release notes, support taxonomy, and user-review themes without committing proprietary media.
- Select synthetic or licensed data providers for maps, listings, projects, devices, product catalogs, reviews, and notifications before implementation.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest only after the relevant promoted ID range is reconciled.
