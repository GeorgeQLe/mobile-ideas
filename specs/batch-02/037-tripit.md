# TripIt-Style Clone Spec

> Metadata
> - Inspiration app: TripIt
> - Category: Travel organization
> - Spec status: Implementation-ready public-source V1; hands-on account/device verification blocked unless noted.
> - Legal scope: functional parity research only; use original code, branding, copy, media, sample data, parsing models, policy language, and licensed integrations.

## Overview

Build an original travel organization app inspired by TripIt's public itinerary import, trip timeline, document, sharing, calendar, and Pro alert workflows.
The V1 focuses on aggregating travel plans from forwarded confirmation emails, authorized inbox sync, manual entry, PDFs/photos, and calendar feeds into a private itinerary wallet with offline access.
TripIt Pro-like features such as real-time flight alerts, fare tracker, risk alerts, travel guidance, airport maps, reward-program tracking, and SAP Concur eligibility are modeled as premium/provider-gated extensions.
Hands-on account, inbox sync, paid subscription, push/SMS, document parsing, Apple Watch/widget, calendar, Pro, SAP Concur, and regional behavior remain manual blockers.

## Goals

- Replace Draft 1 discovery placeholders with exact first-party App Store, Google Play, help, privacy, and user-agreement sources.
- Define app-specific requirements for email forwarding, inbox sync, plan parsing, itinerary timeline, documents, offline access, maps/directions, sharing/collaboration, calendar sync, Pro alerts, and data privacy.
- Treat imported emails, documents, passports, boarding passes, traveler names, confirmation numbers, rewards accounts, and shared itineraries as sensitive data.
- Keep unverified native, paid Pro, Inbox Sync, push/SMS, calendar, watch/widget, SAP Concur, AI/PDF import, and account deletion behavior blocked until lawful verification.
- Provide screen inventory, data model, API/backend contracts, offline/realtime behavior, safety/privacy controls, tests, acceptance criteria, and build plan.

## Non-Goals

- Do not copy TripIt branding, icons, screenshots, marketing copy, parser models, supplier lists, airport maps, safety scores, Pro names, subscription prices, user agreement text, or support scripts.
- Do not read user inboxes without explicit OAuth consent, scoped access, revocation, and privacy review.
- Do not claim exact parsing accuracy, travel-alert coverage, fare-refund eligibility, travel-guidance accuracy, calendar sync timing, or SAP Concur eligibility until verified.
- Do not store raw documents, passports, emails, or confirmation details outside the minimum needed for itinerary organization and user-controlled sharing.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/tripit-travel-planner/id311035142 | Official iOS listing, category, devices, Apple Watch/iMessage, in-app purchase, itinerary import, plans@tripit.com, offline reservation details, documents, maps/directions, TripIt Pro, fare/risk alerts, Apple Intelligence/PDF import, accessibility features | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.tripit | Official Android listing, package id, download/rating scale, in-app purchases, itinerary import, calendar sharing, offline details, documents, maps/directions | Verified 2026-04-17 |
| Getting Started | https://help.tripit.com/en/support/solutions/articles/103000063304-getting-started | Free account, forwarding confirmations to plans@tripit.com, Inbox Sync, manual add, photos/documents, maps/directions, meetings, weather, calendar sync, sharing, mobile access, Pro feature orientation | Verified 2026-04-17 |
| Adding Travel Plans | https://help.tripit.com/en/support/solutions/articles/103000063275-adding-travel-plans-to-tripit | Email forwarding, Inbox Sync, manual plan entry, notification email after import, new trip versus existing trip behavior | Verified 2026-04-17 |
| Authorizing Inbox Sync | https://help.tripit.com/en/support/solutions/articles/103000063336-authorizing-inbox-sync | Gmail/Google Workspace/Outlook/Microsoft 365/Hotmail/Yahoo authorization, app/web setup, optional nature, no email password access, import timing, initial lookback, enterprise blocks | Verified 2026-04-17 |
| Inbox Sync Supported Providers | https://help.tripit.com/en/support/solutions/articles/103000063289-inbox-sync-supported-providers | Supported mailbox providers and provider-specific caveats for Inbox Sync | Verified 2026-04-17 |
| Calendar Feed Setup And Sync | https://help.tripit.com/en/support/solutions/articles/103000063280-calendar-feed-setup-and-sync | Calendar feed URL, app/web setup, include detailed items, third-party calendar refresh behavior | Verified 2026-04-17 |
| Flight Alerts | https://help.tripit.com/en/support/solutions/articles/103000063296-travel-alerts | TripIt Pro real-time flight alerts, schedule changes, check-in reminders, gate changes, delays/cancellations, weather, terminal/gate proximity push, alternate-flight actions | Verified 2026-04-17 |
| Fare Tracker | https://help.tripit.com/en/support/solutions/articles/103000063380-fare-tracker | Pro fare monitoring, U.S. itinerary limits, fare reduction notifications, airline/travel-agency decision ownership, price/date/currency prerequisites | Verified 2026-04-17 |
| Handling Itinerary Cancellations | https://help.tripit.com/en/support/solutions/articles/103000063408/ | Cancellation email import, Needs Review, supported vendor limits, manual delete fallback | Verified 2026-04-17 |
| Privacy Statement | https://www.tripit.com/uhp/privacyPolicy?l=en-US | TripIt/SAP Concur controller, app/site scope, personal data handling, privacy rights, sharing, security, and effective date | Verified 2026-04-17 |
| User Agreement | https://www.tripit.com/uhp/userAgreement/l/en-US | Service scope, mobile app, itinerary creation, travel monitoring/alerts, paid subscription services, accounts, user content, minors, privacy, voice controls, termination | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position TripIt as a travel planner that turns forwarded confirmation emails, Inbox Sync, PDFs/photos, and manual entries into comprehensive itineraries with offline reservation details, documents, maps/directions, sharing, calendar sync, and premium alerts.
- Plan ingestion must support forwarded email to an original intake address, authorized Inbox Sync, manual add, PDF/photo import, share-sheet import, and cancellation email handling with confidence/review states.
- Inbox Sync must be optional, OAuth-based, passwordless, provider-scoped, revocable, and clear about supported providers, enterprise blocks, import delay, initial lookback, and risk of importing other travelers' plans from the inbox.
- Parsing must produce normalized plan types: flight, hotel, rental car, train, ground transport, cruise, restaurant, meeting, activity, concert/event, document, travel guidance, and custom note.
- Itinerary timeline must group plans into trips, support unfiled items, merge/move/delete, Needs Review, duplicate detection, traveler names, confirmation numbers, provider contacts, local times/time zones, and trip image customization as an extension.
- Documents must support PDFs, photos, boarding passes, receipts, passport/driver-license references, digital passport QR codes, and other attachments with encryption, redaction, retention, and sharing controls.
- Calendar sync must expose an enabled/disabled feed, include detailed items toggle, reset/regenerate behavior, third-party calendar refresh caveats, and least-sensitive event display by default.
- Sharing must support view-only and collaborator modes, field-level hiding for confirmation numbers, rewards numbers, costs, documents, and traveler-only details, with revocation and access audit.
- Pro-like alerts must include schedule changes, check-in reminders, arrival/connection summaries, departure/gate changes, cancellations/delays, weather, alternate-flight actions, fare tracker, risk alerts, travel guidance, airport maps, reward-program alerts, and SMS/email/push preferences behind subscription/provider flags.
- Fare tracker must show airline/travel-agency decision ownership, limited carrier/region/class support, required price/currency data, alert timing, and no guarantee of refund/credit.
- Risk/travel guidance features must be sourced from licensed providers and explicitly avoid safety guarantees; category risk scoring, visa/vaccination/passport reminders, and neighborhood safety must remain legal/privacy-reviewed.
- SAP Concur eligibility must be modeled as enterprise entitlement integration, not assumed for consumer users.

## Core User Journeys

- New user creates a free account, forwards a flight confirmation to the intake email, receives import notification, opens a generated trip, edits parsed fields, and accesses flight details offline.
- User enables Inbox Sync for a supported provider, reviews OAuth scope and import delay, sees travel emails imported into trips or Unfiled Items, and revokes sync later.
- User manually adds a hotel, car, meeting, activity, and custom note to an existing trip, reorders timeline items, and resolves a duplicate plan.
- User imports a PDF or screenshot, the parser creates a candidate plan with confidence score, the user reviews fields, attaches the source document, and confirms.
- Traveler shares a trip with family, hides confirmation/cost/reward/document fields, grants collaborator rights to a co-traveler, and revokes access after the trip.
- User enables calendar feed, chooses whether detailed items appear, adds it to a calendar app, and handles delayed refresh or reset.
- Pro subscriber receives schedule-change, gate-change, delay/cancellation, fare tracker, risk, and check-in notifications, then opens alternate flight or travel guidance actions.
- User forwards a cancellation email, sees Needs Review, deletes or updates affected plan, and confirms the itinerary no longer shows canceled details.
- Privacy-focused user reviews imported emails/documents, deletes a trip/document, exports data, deletes account, and sees retention caveats for support, security, subscription, and legal obligations.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Account entry, terms, privacy, email intake education | email, password/passkey, SSO, legal links | new, returning, signed-out | auth fail, underage, locked account |
| Trips Home | Upcoming/past trips and unfiled items | trip tap, add, import, search | empty, upcoming, past, unfiled | parser backlog, sync delayed, offline |
| Add Plans | Manual, email, inbox, PDF/photo import | plan type, file, inbox provider, email | manual, forwarded, synced, imported | unsupported vendor, low confidence, duplicate |
| Inbox Sync | OAuth provider setup and revocation | provider, consent, toggle, revoke | enabled, disabled, pending | enterprise block, provider error, lookback issue |
| Trip Timeline | Ordered plans and travel context | plan tap, reorder, edit, share | upcoming, active, past, needs review | timezone conflict, duplicate, canceled plan |
| Plan Detail | Reservation details and documents | fields, document, map, contact | parsed, edited, offline | missing confirmation, stale alert, supplier mismatch |
| Documents | Travel files and sensitive records | upload, scan, attach, delete | attached, private, shared | unsupported file, OCR fail, sensitive data |
| Calendar Sync | Feed URL and display preferences | enable, include details, reset | enabled, disabled, copied | calendar cache delay, leaked detail risk |
| Sharing | Trip access and roles | invite, role, visible fields, revoke | private, shared, collaborator | stale invite, wrong recipient, private data exposure |
| Alerts | Pro/free notification preferences | email, push, SMS, category toggle | free, Pro, disabled | push denied, carrier unsupported, alert late |
| Fare/Risk Guidance | Premium travel intelligence | flight, destination, passport, settings | eligible, unavailable, alert | provider unavailable, refund not guaranteed |
| Subscription/Entitlement | Pro or enterprise benefit state | subscribe, manage, restore, enterprise link | free, trial, paid, enterprise | payment fail, restore fail, eligibility unknown |
| Support Case | Import, sync, billing, privacy, alert help | issue, evidence, contact | submitted, reviewing, resolved | duplicate, urgent trip, legal hold |
| Settings/Privacy | Account, data, sync, sharing, legal | toggles, export, delete, revoke | signed-in, pending delete | active sync, retention caveat, security check |

## Data Model

- `User`: identity, locale, language/time zone, contact channels, subscription/enterprise entitlement, privacy settings, export/delete lifecycle, and security flags.
- `DeviceSession`: platform, app version, auth token, notification token, calendar/watch/widget capability, offline cache version, and last active state.
- `EmailAlias`: primary/secondary addresses, verification, forwarding eligibility, Inbox Sync status, provider, OAuth scopes, revocation, and import lookback metadata.
- `ImportSource`: forwarded email, synced inbox item, manual entry, PDF, photo, share-sheet file, cancellation email, provider, received time, parser version, and retention state.
- `Trip`: title, destination summary, date range, cover image, owner, travelers, collaborators, visibility, timeline, past/upcoming state, and deleted/archive state.
- `Plan`: normalized plan type, supplier, confirmation, traveler names, times/time zones, addresses, contact info, cost fields, parser confidence, review state, cancellation state, and source link.
- `FlightPlan`: airline, flight number, airports, terminals/gates, segments, schedule changes, delay/cancel state, fare tracker data, alternate-flight state, and check-in reminder.
- `LodgingPlan`: property, address, check-in/out, confirmation, contact, room, loyalty number, cancellation marker, map location, and offline display permissions.
- `GroundTransportPlan`: rental car, train, shuttle, rideshare, parking, or custom transfer with pickup/dropoff, provider, confirmation, and delay/cancel state.
- `Document`: file metadata, MIME type, OCR/AI extraction, sensitivity class, encryption key reference, attached plan/trip, sharing visibility, deletion state, and source provenance.
- `CalendarFeed`: feed token, enabled state, include-details flag, reset history, shared URL, last generated time, and revocation state.
- `TripShare`: recipient, role, visible fields, collaborator rights, invite state, revoke state, expiration, and access audit.
- `AlertPreference`: email/push/SMS, categories, quiet hours, Pro/free eligibility, route/trip scope, and permission state.
- `TravelAlert`: schedule, gate, delay, cancellation, check-in, fare, risk, guidance, reward, weather, or airport alert with provider, severity, delivery state, and action links.
- `SubscriptionEntitlement`: free, trial, paid, expired, refunded, restored, enterprise, SAP Concur-like eligibility, billing provider, renewal, and support state.
- `SupportCase`: import, sync, parsing, alert, billing, subscription, sharing, privacy, or account issue with evidence, owner queue, decision, and legal hold.
- `AuditEvent`: append-only record for auth, import, parsing, edit, document, sync, sharing, calendar, alert, subscription, support, privacy, and deletion actions.
- `LocalCacheRecord`: cached trips, plan details, documents allowed offline, alert summaries, support drafts, settings, freshness, and conflict markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with deletion, security, subscription, and device gates.
- `POST /imports/email`, `POST /imports/file`, `POST /imports/manual`, `GET /imports/:id`: import intake, source retention, parser state, confidence, errors, and notification callbacks.
- `GET /inbox-sync/providers`, `POST /inbox-sync/authorize`, `PATCH /inbox-sync/:id`, `DELETE /inbox-sync/:id`: provider authorization, OAuth scopes, enterprise block, import lookback, and revocation.
- `GET /trips`, `POST /trips`, `GET /trips/:id`, `PATCH /trips/:id`, `DELETE /trips/:id`: trip CRUD, archive/delete, collaborators, cover image, and timeline metadata.
- `POST /trips/:id/plans`, `PATCH /plans/:id`, `DELETE /plans/:id`, `POST /plans/:id/move`: plan creation, edit, delete, move, unfiled item resolution, and audit events.
- `POST /plans/:id/cancellation-review`, `PATCH /plans/:id/cancellation`: cancellation email handling, Needs Review, supported vendor caveat, and manual delete fallback.
- `POST /documents`, `GET /documents/:id`, `DELETE /documents/:id`, `PATCH /documents/:id/visibility`: document storage, OCR/AI extraction, sensitivity, sharing, and deletion.
- `GET /calendar-feed`, `POST /calendar-feed/enable`, `PATCH /calendar-feed/settings`, `POST /calendar-feed/reset`, `DELETE /calendar-feed`: feed token, detail toggle, regeneration, and revocation.
- `POST /trip-shares`, `PATCH /trip-shares/:id`, `DELETE /trip-shares/:id`: sharing roles, visible fields, collaborator permissions, invite state, and access audit.
- `GET /alerts`, `PATCH /alert-preferences`, `POST /alerts/:id/action`: Pro/free alert delivery, notification preferences, alternate flight/action links, and delivery receipts.
- `GET /subscriptions`, `POST /subscriptions/checkout`, `POST /subscriptions/restore`, `POST /enterprise/eligibility`: Pro-like subscription and enterprise entitlement state.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`: import, parsing, sync, calendar, alert, billing, subscription, sharing, and privacy support.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights with import, document, subscription, support, security, and legal-retention caveats.

## Realtime, Push, And Offline Behavior

- Import completion, parser review, Inbox Sync status, trip-share invites, calendar reset, subscription changes, schedule/gate/delay/cancel alerts, fare/risk alerts, and support decisions must use websocket/SSE/push-assisted polling with stable event ids.
- The client may cache trip timelines, plan details, selected documents, alert summaries, sharing settings, and support drafts for offline reads; sensitive documents need explicit offline allowance and local encryption.
- Offline mode may show cached itinerary and documents, but Inbox Sync changes, import parsing, document upload, sharing, calendar reset, subscription purchase, alert actions, data export, and account deletion require server confirmation.
- Alert providers, fare tracker, travel guidance, risk scores, airport maps, document parsing, and AI/PDF import must show freshness, provider attribution, and unavailable states.
- Push/email/SMS categories must include import complete, parser review, flight schedule/gate/delay/cancel, check-in, fare tracker, risk/travel guidance, sharing, calendar, subscription, support, and account security.
- Apple Watch, widgets, Siri/voice controls, iMessage, Apple Intelligence/PDF import, SAP Concur, Pro alerts, and regional travel guidance must be feature-flagged until native/provider/manual verification clears them.

## Permissions, Privacy, And Safety

- Request notifications, calendar, camera/photos/files, location, contacts, Siri/voice, and device authentication only when a related feature is invoked.
- Inbox Sync must require explicit OAuth consent, limited scopes where possible, no password collection, revocation, import transparency, and clear handling of other travelers' confirmations.
- Default analytics must exclude raw email bodies, documents, passports, driver's licenses, boarding passes, confirmation numbers, reward numbers, costs, precise plan locations, and private trip notes.
- Documents and travel IDs must be encrypted, access-controlled, redacted from logs, scoped to user-selected sharing, and deletable subject to support/security/legal retention.
- Sharing must default to private, hide confirmation/rewards/cost/document fields unless explicitly permitted, and support revoke plus access audit.
- Fare tracker and risk/travel guidance must clearly state provider limits, region/class/carrier constraints, and no guaranteed refund, safety, visa, or health outcome.
- Account deletion and data export must address active sync, imported emails, raw source retention, documents, subscriptions, support cases, security logs, and legal retention.
- Launch owners: privacy owner for inbox/documents/data rights, security owner for OAuth/storage, parsing owner for extraction accuracy, subscriptions owner for Pro billing, provider owner for alerts/guidance, accessibility owner for native surfaces, and support owner for import/billing/privacy cases.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, import started/completed, parser review opened, trip created, plan edited, document attached, Inbox Sync authorized/revoked, calendar feed enabled, trip shared, alert delivered/opened, subscription viewed/purchased/restored, support opened, data export requested, account deletion requested.
- Parser quality metrics must use source type, plan type, confidence band, correction count, error category, and latency without raw email text, documents, confirmation codes, or traveler names.
- Alert quality metrics must use provider, category, latency, delivery state, and user action without exposing private itinerary fields to product analytics.
- Monetization can include original premium subscriptions, enterprise entitlements, provider alerts, document automation, travel guidance, airport maps, or business travel tools, but names, prices, benefits, and copy must be original and legal-reviewed.
- Subscription billing must show plan, trial, renewal, cancellation, refund, restore, enterprise entitlement, and app-store/provider state with deterministic support paths.

## Edge Cases

- First launch offline, auth failure, duplicate account, unverified secondary email, unsupported provider, enterprise OAuth block, or user denies notification/calendar/file permission.
- Forwarded confirmation is unsupported, low confidence, duplicate, belongs to another traveler, already canceled, missing dates, has wrong timezone, or contains private data.
- Inbox Sync imports someone else's forwarded itinerary, misses travel email in folder/label, imports delayed beyond 24 hours, provider revokes token, or company blocks app access.
- PDF/photo import has poor OCR, multiple plans, ambiguous traveler, document contains passport/credit-card data, Apple Intelligence unavailable, or user discards source file.
- Calendar feed leaks details, calendar app caches old data, token is shared accidentally, detailed-items toggle is off, or reset does not propagate quickly.
- Trip share goes to wrong recipient, collaborator edits incorrectly, confirmation numbers are hidden unexpectedly, invite expires, or revoked user has cached data.
- Flight alert is late, airline data changes twice, alternate flights unavailable, fare tracker carrier unsupported, price data missing, or airline/travel agency denies credit.
- Risk/travel guidance provider is unavailable, country advice changes, passport data is stale, safety score is disputed, or user treats guidance as guarantee.
- Subscription restore fails, app-store receipt differs from server, enterprise entitlement expires, refund occurs, or user deletes account with paid subscription.
- Data export, account deletion, document deletion, source email retention, sync logs, support evidence, subscription records, security logs, and legal hold conflict.

## Test Plan

- Unit tests for import parser state, plan normalization, duplicate detection, unfiled item movement, cancellation review, timezone handling, calendar feed visibility, and trip-share field hiding.
- Unit tests for Inbox Sync provider authorization, revocation, enterprise block, import lookback, other-traveler detection, and OAuth token lifecycle.
- Unit tests for document sensitivity classification, encryption references, OCR confidence, sharing visibility, deletion eligibility, and privacy-safe analytics payloads.
- Unit tests for Pro/free entitlement, subscription restore, alert category eligibility, fare tracker constraints, risk guidance provider states, and notification preferences.
- Contract tests for import, inbox sync, trip, plan, document, calendar, sharing, alert, subscription, enterprise eligibility, support, and privacy endpoints.
- Integration tests for forwarded email import, manual plan creation, PDF/photo import, trip timeline edit, offline trip access, calendar enable/reset, sharing/revoke, flight alert, fare tracker, and support.
- Offline tests for cached trip/plan/document reads, blocked upload/import/share/calendar/subscription/delete actions, corrupt cache, freshness warnings, and reconnect reconciliation.
- Security/privacy tests for OAuth scope display, token revocation, document redaction from logs, private field hiding in shared trips, data export, account deletion, and retention caveats.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, timeline navigation, document controls, calendar copy, and alert comprehension.
- Manual verification tests: native iOS/Android screenshots, account signup/login, forwarding to intake email, Inbox Sync, PDF/photo import, calendar sync, sharing, Pro subscription, push/SMS/email alerts, Apple Watch/widgets/Siri/iMessage, SAP Concur eligibility, account deletion, and regional guidance.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build V1 without TripIt assets, parser models, private APIs, supplier lists, Pro names, subscription prices, user-agreement text, airport maps, safety scores, or support scripts.
- Users can create an account, import travel plans by email/manual/file, organize trips and unfiled items, edit timeline details, attach documents, access allowed itinerary details offline, share/revoke trips, sync calendar feeds, and recover from denied permissions or network loss.
- Inbox Sync, parsing, documents, sharing, calendar feeds, alerts, subscriptions, support decisions, data export, and account deletion are represented as auditable server-side state machines.
- Raw emails, documents, passports, confirmation numbers, rewards numbers, costs, calendar feeds, shared trips, alert providers, subscription state, support evidence, and privacy rights are covered by tests.
- Pro alerts, fare tracker, risk/travel guidance, airport maps, SAP Concur, Apple Watch/widgets/Siri/iMessage, Apple Intelligence/PDF import, push/SMS payloads, and regional guidance remain feature-flagged until provider, legal, privacy, safety, accessibility, and manual verification clear them.

## Open Questions

- Which licensed email/OAuth, parser/OCR/AI, calendar, flight-status, fare, airport-map, risk, visa/health guidance, weather, notification, subscription, support, and analytics providers will back V1?
- What raw source retention policy will apply to forwarded emails, synced emails, PDFs/photos, passports, boarding passes, documents, and parser training data?
- Which plan types are in V1: flights, lodging, cars, trains, ground transport, activities, meetings, restaurants, cruises, events, documents, and custom notes?
- Will V1 include premium subscription at launch, or ship free itinerary organization first and add Pro-like alerts after provider contracts?
- How should enterprise/SAP Concur-style eligibility integrate without exposing corporate travel data or requiring unsupported admin flows?
- What privacy posture governs shared trips, calendar feed URLs, hidden confirmation/cost/reward fields, and collaborator edits?

## Build Plan

- Phase 1: scaffold app shell, auth, Trips Home, manual plan creation, trip timeline, plan detail, settings/legal links, offline cache, privacy-safe analytics, and data model migrations.
- Phase 2: add forwarded email intake, parser service, unfiled items, duplicate detection, cancellation review, import notifications, source retention controls, and parser tests.
- Phase 3: add Inbox Sync OAuth, provider support, revocation, enterprise block states, import lookback, other-traveler safeguards, and sync tests.
- Phase 4: add documents/PDF/photo import, OCR/AI extraction review, sensitivity classification, encryption, sharing visibility, and document tests.
- Phase 5: add trip sharing/collaboration, calendar feed, detailed-item toggle, feed reset, notification categories, and privacy/security tests.
- Phase 6: add premium entitlement, flight alerts, fare tracker, travel/risk guidance, airport maps, provider attribution, subscription billing, support workflows, and alert tests.
- Phase 7: evaluate Apple Watch/widgets/Siri/iMessage, SAP Concur-style enterprise entitlement, passport renewal reminders, neighborhood safety scores, and native/manual verification after provider/legal/privacy approvals.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Treat Inbox Sync, document import, travel IDs, shared calendars, and Pro alerts as privacy/security launch blockers.
- Continue Phase 3 upgrades with the next Batch 03 food/local discovery specs: `041-starbucks.md`, `042-mcdonalds.md`, `043-opentable.md`, `044-yelp.md`, and `045-too-good-to-go.md`.
