# TomTom GO-Style Clone Spec

> Metadata
> - Inspiration app: TomTom GO
> - Category: Navigation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-06.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-06; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: TomTom account creation and subscription activation, TomTom proprietary map data rendering and offline tile management, TomTom Traffic real-time data integration and fastest route calculation, turn-by-turn navigation engine with lane guidance rendering, speed camera database (fixed, mobile, average speed, red-light) and alert system, speed limit data sourcing and speedometer display, offline map download and update management, 3D map rendering with landmarks and terrain elevation, multi-stop route planning with drag-to-edit route adjustment, departure time planning with traffic prediction algorithm, alternative route calculation with time comparison, My Places saved location management and sync, My Routes saved route management and import/export, fuel-efficient routing algorithm, Apple CarPlay and Android Auto integration, TomTom Road Trips curated route content, community speed camera reporting and moderation, POI search with category and along-route filtering, parking availability data integration near destination, EV charging station data sourcing and search, subscription entitlement management (trial, active, expired, renewal), and TomTom account integration.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by TomTom GO's public navigation workflow. The V1 clone focuses on premium turn-by-turn navigation app from TomTom with offline maps, real-time TomTom Traffic with fastest route calculations and traffic incident visualization, turn-by-turn voice navigation with lane guidance, speed camera alerts (fixed, mobile, average speed, red-light cameras), speed limit warnings and speedometer display, offline maps with regular updates, 3D map rendering with landmarks and terrain, route planning with multiple stops and drag-to-edit route adjustment, departure time planning with traffic prediction, alternative routes with time comparison, My Places for saved locations (home, work, favorites), My Routes for saved and planned routes, fuel-efficient routing option, Apple CarPlay and Android Auto compatibility, TomTom Road Trips curated scenic driving routes, community speed camera reporting, quick search for POIs with categories and along-route search, parking availability near destination, EV charging station search (for electric vehicles), and subscription-based model with free trial period.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, school, subscription, tenant, content, regional, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first navigation experience with onboarding, dashboard, primary workflow, reminders or notifications, settings, support, and recovery flows.
- Preserve the functional job behind TomTom GO while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.

## Non-Goals

- Do not copy TomTom GO branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, course libraries, textbook solutions, documents, school content, AI prompts, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, account, permission, push, subscription, role, tenant, and region states.
- Do not bypass academic-integrity rules, school controls, copyright, subscription gates, enterprise policies, child safety rules, or data loss prevention.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/tomtom-go-navigation/id884963367 | iOS listing, privacy labels, release notes, GPS navigation/traffic claims, and support links | Verified public URL or explicit platform blocker on 2026-05-06; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.tomtom.gplay.navapp | Android listing, data safety, turn-by-turn navigation/offline claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-06; hands-on native behavior still blocked. |
| Official product site | https://www.tomtom.com/navigation/mobile-app/ | TomTom GO navigation, traffic, offline maps, and product positioning | Verified public URL or explicit platform blocker on 2026-05-06; hands-on native behavior still blocked. |
| Official help | https://www.tomtom.com/support/ | TomTom GO app help, navigation, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-06; hands-on native behavior still blocked. |
| Privacy policy | https://www.tomtom.com/privacy/ | TomTom data collection, location data, and privacy disclosures | Verified public URL or explicit platform blocker on 2026-05-06; hands-on native behavior still blocked. |
| Terms | https://www.tomtom.com/legal/ | TomTom services, navigation terms, and acceptable-use boundaries | Verified public URL or explicit platform blocker on 2026-05-06; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support account creation, returning-user recovery, consent, role/tenant/school checks, permission primers, and blocked-account states.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, entitlement-missing, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must show provenance, freshness, source, ownership, copyright/subscription status, retention, and limitations for learning, school, answer, content, or document data.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and deletion or account-closure entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, sponsored, school/provider eligible, tenant eligible, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, keyboard navigation where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking school-owned, copyright-sensitive, assessment-sensitive, tenant-owned, paid, shared, or irreversible writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: TomTom account creation and subscription activation, TomTom proprietary map data rendering and offline tile management, TomTom Traffic real-time data integration and fastest route calculation, turn-by-turn navigation engine with lane guidance rendering, speed camera database (fixed, mobile, average speed, red-light) and alert system, speed limit data sourcing and speedometer display, offline map download and update management, 3D map rendering with landmarks and terrain elevation, multi-stop route planning with drag-to-edit route adjustment, departure time planning with traffic prediction algorithm, alternative route calculation with time comparison, My Places saved location management and sync, My Routes saved route management and import/export, fuel-efficient routing algorithm, Apple CarPlay and Android Auto integration, TomTom Road Trips curated route content, community speed camera reporting and moderation, POI search with category and along-route filtering, parking availability data integration near destination, EV charging station data sourcing and search, subscription entitlement management (trial, active, expired, renewal), and TomTom account integration.

## Core User Journeys

- User creates or restores a TomTom GO-style account, completes role, school, subscription, or tenant checks, and reaches the dashboard.
- User opens a lesson, course, problem, answer, activity, file, or workspace with source/provenance and limitations clearly labeled.
- User starts the primary learning, solving, practicing, submitting, editing, sharing, or support flow and receives a durable status.
- User edits notification/reminder preferences and sees distinctions between transactional, school-critical, collaboration-critical, marketing, and optional learning messages.
- User exports data or requests deletion, sees school-owned, tenant-owned, provider-owned, copyright, legal-hold, or subscription limitations, and receives an auditable request state.
- User attempts an unsafe, privacy-invasive, copyright-sensitive, assessment-sensitive, or policy-violating action and is routed to school, admin, support, or policy guidance instead of generic completion.
- User loses connectivity during the core flow, sees cached state labeled as stale, can inspect allowed history, and cannot submit unsafe or irreversible requests until reconnected.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Optional account creation or login, region/language selection, location permission for map centering, and initial map download for offline use | email, OAuth, select-region, select-language, grant-location, download-map | new, returning, authenticated, anonymous, location-granted, location-denied, downloading | auth failed, location unavailable, download failed, storage insufficient, network error |
| Map/Explore | Interactive map view with zoom, pan, rotate, tilt, POI markers, traffic overlay, transit lines, satellite/terrain layers, and current location indicator | pan, zoom, rotate, tilt, tap-POI, toggle-traffic, toggle-transit, toggle-satellite, center-location, long-press-pin | loading, loaded, traffic-overlay, transit-overlay, satellite-view, 3D-view, offline-mode, location-tracking | map tiles failed, location unavailable, traffic data stale, layer unavailable, offline data missing, network error |
| Search/Directions | POI search with categories, recent searches, and saved places, plus route planning with origin/destination, mode selection (driving, transit, walking, cycling), route alternatives, and departure time | search, select-category, select-recent, select-saved, set-origin, set-destination, select-mode, select-route, set-departure-time, add-waypoint | searching, results-loaded, route-calculated, alternatives-shown, departure-planned, no-results | search failed, route unavailable, mode unsupported, waypoint limit reached, geocoding failed, network error |
| Navigation/Turn-by-Turn | Active navigation with turn-by-turn voice guidance, lane guidance, speed limit display, ETA updates, rerouting on deviation, and speed camera warnings | start-navigation, mute-voice, adjust-volume, view-overview, cancel-navigation, report-incident | navigating, rerouting, voice-active, voice-muted, speed-warning, camera-alert, arrived | GPS signal lost, reroute failed, voice guidance unavailable, navigation interrupted, network error |
| Places/POI | Place detail view with name, address, category, ratings, reviews, photos, hours, contact info, and actions (navigate, call, save, share) | view-details, navigate-to, call, save-place, share, write-review, view-photos, view-hours | loading, loaded, saved, navigating-to, calling | place unavailable, reviews unavailable, photos failed, hours outdated, contact unavailable, network error |
| Offline Maps | Map download management with region selection, download progress, storage usage, update availability, and delete options | select-region, download, pause-download, resume-download, update, delete, view-storage | browsing-regions, downloading, paused, downloaded, update-available, storage-full | download failed, storage insufficient, update failed, region unavailable, network error |
| Settings/Preferences | Navigation preferences, map display options, voice guidance language, units (metric/imperial), traffic alerts, speed camera alerts, account management, and data/privacy controls | forms, toggle, select-voice-language, select-units, toggle-traffic-alerts, toggle-camera-alerts, manage-account, export-data, request-delete | loaded, editing, syncing | save failed, voice pack download failed, preference sync failed, account locked, network error |

## Data Model

- User: account, identity, role, consent, locale, accessibility, notification preferences, deletion/export status, and support state.
- Profile: learner, parent, teacher, instructor, admin, workspace owner, tenant member, subscription holder, or child profile with eligibility and verification metadata.
- Relationship: school, class, course, family, instructor, workspace, tenant, group, subscription, or provider relationship with scope and expiry.
- ContentRecord: lesson, assignment, answer, explanation, video, audio, flashcard, file, document, scan, comment, grade, certificate, or activity with provenance and copyright/subscription status.
- Request: enrollment, answer submission, assignment upload, quiz attempt, file edit, share invite, export, deletion, subscription, refund, or support request with validation and queue state.
- ConsentGrant: child/minor consent, school/institution access, tenant access, marketing, notification, camera/media, files, contacts, calendar, microphone, or integration consent with revocation audit.
- Reminder: course, streak, assignment, due-date, practice, certificate, collaboration, document, or subscription reminder with quiet hours and delivery history.
- Entitlement: free, trial, paid, restored, refunded, expired, sponsored, school, provider, tenant, family, or unavailable entitlement state.
- AuditEvent: sensitive reads/writes, role changes, school access, tenant access, content sharing, assignment/test submission, exports, account deletion, support escalation, and billing events.
- LocalCacheRecord: encrypted offline summary cache with TTL, redaction policy, retry state, conflict markers, stale-source label, and device-lock requirements.

## API And Backend Contracts

- Auth/identity: POST /auth/session, POST /auth/mfa, POST /identity/verify, POST /eligibility/check, POST /tenant/select, and POST /invites/accept with audit metadata.
- Profile/roles: GET /profile, PATCH /profile, GET /relationships, and role-scoped authorization responses.
- Content: GET /content, GET /content/{contentId}, POST /content/search, and source/copyright/subscription metadata for course, answer, assignment, or document records.
- Requests: POST /requests, GET /requests/{requestId}, PATCH /requests/{requestId}, and type-specific validation for enrollment, answer, quiz, submission, edit, share, export, delete, refund, or support workflows.
- Messages/reminders: GET /messages, POST /messages, POST /reminders, and transactional push categories that distinguish school-critical, collaboration-critical, marketing, and optional learning content.
- Directory/search: GET /directory with course, class, language, topic, document, provider, subscription, tenant, and availability filters plus freshness disclaimers.
- Payments/entitlements: GET /entitlements, POST /checkout/session, POST /entitlements/restore, and receipt metadata without storing raw card or protected identifiers in the client.
- Integrations: GET /integrations, POST /integrations/connect, DELETE /integrations/{id}, and permission-scoped imports from LMS, cloud storage, calendars, files, camera scan, SSO, or document systems.
- Privacy/support: GET /privacy/settings, PATCH /privacy/settings, POST /data-export, DELETE /account, and POST /support-cases with legal-hold, school-owned, tenant-owned, copyright, and child-data limitations.
- Audit/config: GET /audit-events for user-visible sensitive activity where lawful; GET /app-config returns feature flags, supported regions, legal links, copy keys, minimum versions, and maintenance banners.

## Realtime, Push, And Offline Behavior

- Cache the dashboard, recent detail pages, settings, entitlement state, and safe drafts with explicit TTL and stale-state labels.
- Realtime channels may use websocket, SSE, polling, sync callbacks, LMS sync, document coauthoring, or push-triggered refetch; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category, mirrored in an in-app notification center where relevant, and deep-linked only after authorization checks.
- Queue only low-risk drafts locally; block tests, graded submissions, protected document shares, paid transactions, copyright-sensitive downloads, irreversible deletes, and unsafe requests while offline.
- Long-running tasks must expose pending, complete, failed, canceled, expired, review, conflict, and support-escalated states.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, duplicate events, stale LMS/cloud data, and replayed webhooks.

## Permissions, Privacy, And Safety

- Treat precise location data (GPS coordinates, movement history, route history, speed data, altitude), map interaction data (search queries, saved places, bookmarks, visited POIs, route preferences), navigation data (turn-by-turn route history, destination history, departure times, travel patterns), traffic and road data (speed reports, incident reports, road condition data, speed camera locations), offline map data (downloaded regions, storage usage, update preferences), transit data (route preferences, frequently used stops, transit card information where integrated), vehicle data (speed, fuel consumption, EV charging preferences where applicable), voice interaction data (voice search queries, navigation voice preferences), personal places data (home address, work address, saved favorites, custom waypoints), device identifiers and session tokens, push notification tokens and delivery preferences, account profile data (name, email, subscription status, payment history), and crowd-sourced contribution data (map edits, POI reviews, road reports, speed camera reports) as launch-blocking review areas with owners, mitigations, and acceptance tests before implementation.
- Consent, child/minor, parent, school, teacher, admin, tenant, provider, device, and integration access must be explicit, auditable, revocable where lawful, and clearly separate from marketing preferences.
- Do not send raw answers, homework prompts, student identifiers, school records, grades, private documents, file contents, AI prompts, precise location, payment data, private messages, or child data as analytics properties.
- School-owned, tenant-owned, provider-owned, copyright-owned, child/student, or organization-owned records may not be deletable or exportable solely by the clone; display limitations and request status honestly.
- Native permission prompts for notifications, camera/media scan, microphone/audio, files, photos, contacts, calendar, cloud storage, and local network must be just-in-time and have functional denial fallbacks.
- Safety copy must route academic integrity issues, child safety risk, abuse reports, copyright concerns, school emergencies, data-loss risk, and privacy concerns to appropriate human-owned channels.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: onboarding_started, permission_primer_viewed, signup_started, signup_completed, eligibility_checked, role_selected, tenant_selected, and onboarding_blocked with source, locale, and experiment IDs.
- Core action events: home_viewed, detail_opened, primary_action_started, primary_action_completed, primary_action_failed, and support_started with object type and coarse failure code only.
- Retention events: notification_opened, reminder_configured, history_opened, export_started, sync_recovered, subscription_restored, assignment_due_viewed, and settings_updated.
- Safety/privacy events: privacy_setting_changed, data_export_requested, account_delete_requested, access_grant_created, access_grant_revoked, safety_block_shown, and policy_disclaimer_viewed.
- Monetization events: paywall_viewed, trial_started, purchase_started, purchase_completed, purchase_failed, subscription_canceled, entitlement_restored, school_or_tenant_eligible, and entitlement_expired where monetization is in scope.
- Monetization model: use original free/trial/paid/sponsored/school/provider/tenant entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, school contracts, tenant offers, or partner offers from TomTom GO.
- Analytics rule: do not send raw content, answers, homework, prompts, student identifiers, school records, grades, file contents, private documents, payment credentials, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, unsupported OS, expired session, revoked token, unsupported region, missing school/provider/tenant eligibility, or maintenance banner.
- Permission denied, permission revoked in OS settings, limited permission granted, SSO expired, child profile missing, tenant policy blocked, and permission granted after fallback use.
- Duplicate taps, retry after timeout, duplicate webhook delivery, stale optimistic UI, conflict after reconnect, and clock skew.
- Deleted, suspended, blocked, expired, unavailable, region-locked, entitlement-locked, school-owned, tenant-owned, copyright-owned, child-owned, or account-merged objects.
- Partial upload/download, corrupt cache, disk full, app termination during background work, and push delivered before local cache is ready.
- Abuse/fraud: account takeover, invite abuse, overbroad sharing, school impersonation, cheating workflows, copyright uploads, prompt injection, support social engineering, and policy escalation.
- Subscription, paid purchase, school eligibility, tenant eligibility, family plan, or cloud service restored on a different platform, refunded externally, unavailable in region, or contradicted by server state.
- Legal/privacy request submitted while active classes, assignments, certificates, files, shared links, courses, subscriptions, support cases, or audit records still exist.

## Test Plan

- Unit tests for validation, state machines, permission gates, role checks, entitlement checks, idempotency keys, safety copy routing, and privacy-safe analytics payload construction.
- Integration tests for auth, onboarding, eligibility, primary reads/writes, settings, support, notifications, entitlement transitions, data export, and account deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event, LMS/cloud import, document sync, and realtime reconciliation path.
- Offline tests for cached reads, stale labels, queued safe drafts, blocked unsafe writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, limited-access, OS-settings recovery, camera, microphone, files, photos, calendar, notification, contacts, and cloud storage states.
- Safety/privacy tests for sensitive-data redaction, consent/sharing revocation, support escalation, audit events, policy disclaimers, legal links, child/student data, and school/tenant-owned records.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, captions/transcripts, keyboard navigation, and error text.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, sponsored/school/provider/tenant eligibility, and unavailable states where applicable.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences, reminder timing, deep links, and in-app notification center behavior.
- Manual verification tests for TomTom account creation and subscription activation, TomTom proprietary map data rendering and offline tile management, TomTom Traffic real-time data integration and fastest route calculation, turn-by-turn navigation engine with lane guidance rendering, speed camera database (fixed, mobile, average speed, red-light) and alert system, speed limit data sourcing and speedometer display, offline map download and update management, 3D map rendering with landmarks and terrain elevation, multi-stop route planning with drag-to-edit route adjustment, departure time planning with traffic prediction algorithm, alternative route calculation with time comparison, My Places saved location management and sync, My Routes saved route management and import/export, fuel-efficient routing algorithm, Apple CarPlay and Android Auto integration, TomTom Road Trips curated route content, community speed camera reporting and moderation, POI search with category and along-route filtering, parking availability data integration near destination, EV charging station data sourcing and search, subscription entitlement management (trial, active, expired, renewal), and TomTom account integration.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can complete onboarding and reach the default dashboard without unsupported permissions.
- A returning user can complete the primary workflow, recover from network failure, and confirm canonical server state after reconnect.
- Dashboard, detail, primary action, reminders, records/history, settings, support, notifications, entitlement, and deletion/export flows are represented in routes and tests.
- All entities have owners, lifecycle states, authorization rules, retention, audit events, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, entitlement, notifications, data deletion/export, and regression behavior.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact iOS and Android native screens, permission prompts, and push payloads differ materially from public marketplace claims?
- Which account, subscription, school, learner, child, teacher, tenant, provider, content, region, or eligibility states require paid, sponsored, physical, or institution-managed test access?
- Which third-party providers will supply identity, payments, notifications, analytics, LMS, cloud storage, documents, AI, content libraries, courses, files, media, or support services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, school-contract, copyright, child-data, enterprise, or platform-policy reasons?
- What retention, export, and deletion limits apply to school-owned, tenant-owned, provider-owned, copyright-owned, child/student, billing, subscription, support, or audit records?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, seed-data policy, and safety-review checklist.
- Phase 2: Build onboarding, dashboard, detail, primary workflow, settings, support, and entitlement shells with original copy and sample data.
- Phase 3: Add backend contracts, audit logging, offline/retry handling, notification preferences, consent/proxy/sharing controls, integrations, and data export/delete flows.
- Phase 4: Add app-specific safety controls for premium turn-by-turn navigation app from TomTom with offline maps, real-time TomTom Traffic with fastest route calculations and traffic incident visualization, turn-by-turn voice navigation with lane guidance, speed camera alerts (fixed, mobile, average speed, red-light cameras), speed limit warnings and speedometer display, offline maps with regular updates, 3D map rendering with landmarks and terrain, route planning with multiple stops and drag-to-edit route adjustment, departure time planning with traffic prediction, alternative routes with time comparison, My Places for saved locations (home, work, favorites), My Routes for saved and planned routes, fuel-efficient routing option, Apple CarPlay and Android Auto compatibility, TomTom Road Trips curated scenic driving routes, community speed camera reporting, quick search for POIs with categories and along-route search, parking availability near destination, EV charging station search (for electric vehicles), and subscription-based model with free trial period.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, billing, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, entitlement states, and account deletion.
- Record app-specific account, school, learner, child, teacher, tenant, content, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for TomTom GO-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
