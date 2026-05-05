# Find My Kids-Style Clone Spec

> Metadata
> - Inspiration app: Find My Kids
> - Category: Parenting and family safety
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: child consent and COPPA-style controls, background location, companion app pairing, audio/listen features, subscription restore, location accuracy, geofence timing, and device removal prevention.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, school/provider contracts, child data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Find My Kids's public parenting and family safety workflow. The V1 clone focuses on family GPS location, child companion pairing, route history, places/geofences, loud signal, battery/app usage checks, chat, subscriptions, and child-location safety.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, subscription, school, provider, family, regional, and regulated behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first parenting and family safety experience with onboarding, dashboard, primary workflow, reminders or notifications, settings, support, and recovery flows.
- Preserve the functional job behind Find My Kids while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.

## Non-Goals

- Do not copy Find My Kids branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, community content, school content, health content, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, account, permission, push, subscription, role, and region states.
- Do not provide clinical advice, child surveillance bypasses, school-record control, emergency routing, or regulated services without separate legal and safety review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/findmykids-gps-phone-tracker/id994098803 | iOS listing, privacy labels, background location note, and subscription claims | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=org.findmykids.app | Android listing, data safety, companion pairing, subscriptions, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://findmykids.org/ | Family locator, companion app, subscriptions, and safety positioning | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official support | https://findmykids.zendesk.com/ | Setup, pairing, subscriptions, location, device, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://findmykids.org/docs/privacy-policy/ios/en | Child location, account, device, purchase, analytics, and sharing disclosures | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms | https://findmykids.org/docs/terms-of-use/ios/en | User agreement, child safety, subscriptions, device use, and acceptable-use terms | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support account creation, returning-user recovery, consent, role or eligibility checks, permission primers, and blocked-account states.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, consent-missing, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must show provenance, freshness, source, ownership, retention, and limitations for health, family, location, media, or school data.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and deletion or account-closure entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, sponsored, school/provider eligible, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking regulated, safety-sensitive, school-owned, provider-owned, child-location, or irreversible writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: child consent and COPPA-style controls, background location, companion app pairing, audio/listen features, subscription restore, location accuracy, geofence timing, and device removal prevention.

## Core User Journeys

- User creates or restores a Find My Kids-style account, completes required consent, role, or eligibility checks, and reaches the dashboard.
- User reviews a health metric, family item, child safety state, course item, message, or record with source/provenance and limitations clearly labeled.
- User starts the primary tracking, learning, sharing, scheduling, control, search, or support flow and receives a durable status.
- User edits notification/reminder preferences and sees distinctions between transactional, care/safety-critical, school-critical, marketing, and optional wellness messages.
- User exports data or requests deletion, sees provider-owned, school-owned, child-owned, legal-hold, or subscription limitations, and receives an auditable request state.
- User attempts an urgent, unsafe, privacy-invasive, or clinically/school-sensitive action and is routed to emergency, caregiver, school, provider, or support channels instead of generic completion.
- User loses connectivity, sees cached state labeled as stale, can inspect allowed history, and cannot submit unsafe or regulated requests until reconnected.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Parent, caregiver, family, or community entry | email, invite, child profile, location | new, returning, invited, locked | age gate, consent missing, region unsupported |
| Family Dashboard | Children, pregnancy, family members, activity, content, or shared state | tap, refresh, filter, invite | empty, loading, current, alerting | stale location, missing child profile, invite expired |
| Primary Flow | Track, share, schedule, message, control, search, or log | forms, media, location, calendar, device | draft, active, shared, completed | unsafe sharing, denied permission, stale data |
| Community/Sharing | Family invites, parent community, reviews, messages, or shared media | invite, post, comment, report | private, public, pending, reported | abuse, over-sharing, revocation delay |
| Settings/Privacy | Consent, child data, family roles, support, export, and deletion | toggles, requests, links | loaded, editing, requested | child data limits, active subscription, legal hold |

## Data Model

- User: account, identity, role, consent, locale, accessibility, notification preferences, deletion/export status, and support state.
- Profile: health profile, child profile, parent/caregiver profile, student profile, instructor profile, school profile, or household member with eligibility and verification metadata.
- Relationship: provider, device, app integration, child/caregiver, family invite, school/institution, course, teacher/student, or subscription relationship with scope and expiry.
- Record: health metric, sleep/audio item, location event, family media item, childcare listing, activity, course material, assignment, grade, message, or support case with provenance and release status.
- Request: tracking session, app/device sync, family share, parental-control command, childcare contact, assignment submission, message, export, deletion, bill, subscription, or support request with validation and queue state.
- ConsentGrant: permission, child consent, caregiver/proxy access, school/institution access, marketing, notification, HealthKit, Health Connect, location, media, or integration consent with revocation audit.
- Reminder: health, sleep, activity, pregnancy, child, calendar, assignment, due-date, safety, or family reminder with quiet hours and delivery history.
- Entitlement: free, trial, paid, restored, refunded, expired, sponsored, family, school, provider, or unavailable entitlement state.
- AuditEvent: sensitive reads/writes, role changes, child/family access, location/media access, school submissions, exports, account deletion, support escalation, and billing events.
- LocalCacheRecord: encrypted offline summary cache with TTL, redaction policy, retry state, stale-source label, and device-lock requirements.

## API And Backend Contracts

- Auth/identity: POST /auth/session, POST /auth/mfa, POST /identity/verify, POST /eligibility/check, and POST /invites/accept with audit metadata.
- Profile/roles: GET /profile, PATCH /profile, GET /relationships, and role-scoped authorization responses.
- Records: GET /records, GET /records/{recordId}, POST /records/export, and release-status metadata for provider-owned, school-owned, family-owned, or device-owned records.
- Requests: POST /requests, GET /requests/{requestId}, PATCH /requests/{requestId}, and type-specific validation for tracking, sharing, control, assignment, message, calendar, or support workflows.
- Messages/reminders: GET /messages, POST /messages, POST /reminders, and transactional push categories that distinguish urgent, child-safety, school-critical, marketing, and optional wellness content.
- Directory/search: GET /directory with service, school, course, provider, childcare, food/content, location, category, and availability filters plus freshness disclaimers.
- Payments/entitlements: GET /entitlements, POST /checkout/session, POST /entitlements/restore, and receipt metadata without storing raw card or regulated identifiers in the client.
- Integrations: GET /integrations, POST /integrations/connect, DELETE /integrations/{id}, and permission-scoped imports from HealthKit, Health Connect, calendars, wearables, school LMS, or location systems.
- Privacy/support: GET /privacy/settings, PATCH /privacy/settings, POST /data-export, DELETE /account, and POST /support-cases with legal-hold, school-owned, provider-owned, and child-data limitations.
- Audit/config: GET /audit-events for user-visible sensitive activity where lawful; GET /app-config returns feature flags, supported regions, legal links, copy keys, minimum versions, and maintenance banners.

## Realtime, Push, And Offline Behavior

- Cache the dashboard, recent detail pages, settings, entitlement state, and safe drafts with explicit TTL and stale-state labels.
- Realtime channels may use websocket, SSE, polling, device-sync callbacks, LMS sync, location updates, or push-triggered refetch; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category, mirrored in an in-app notification center where relevant, and deep-linked only after authorization checks.
- Queue only low-risk drafts locally; block regulated care requests, child-location control, school submissions/tests, paid transactions, irreversible deletes, and unsafe requests while offline.
- Long-running tasks must expose pending, complete, failed, canceled, expired, provider-review, school-review, family-review, and support-escalated states.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, duplicate events, stale wearable/location/LMS data, and replayed webhooks.

## Permissions, Privacy, And Safety

- Treat child data, family location, pregnancy/fertility information, private family media, parental controls, caregiver access, community moderation, COPPA-style consent, invite revocation, and oversharing safety as launch-blocking review areas with owners, mitigations, and acceptance tests before implementation.
- Consent, proxy, caregiver, parent, school, provider, organization, device, and integration access must be explicit, auditable, revocable where lawful, and clearly separate from marketing preferences.
- Do not send raw health entries, child location, school content, grades, family media, private messages, precise location, payment data, or child/student data as analytics properties.
- Provider-owned, school-owned, device-owned, family-owned, or organization-owned records may not be deletable or exportable solely by the clone; display limitations and request status honestly.
- Native permission prompts for notifications, camera/media, microphone/audio, location, Bluetooth/device sync, HealthKit, Health Connect, calendars, contacts, photos, files, and local network must be just-in-time and have functional denial fallbacks.
- Safety copy must route urgent symptoms, child safety risk, abuse reports, location misuse, school emergencies, privacy concerns, and severe wellness risks to appropriate human-owned channels.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: onboarding_started, permission_primer_viewed, signup_started, signup_completed, eligibility_checked, role_selected, and onboarding_blocked with source, locale, and experiment IDs.
- Core action events: home_viewed, detail_opened, primary_action_started, primary_action_completed, primary_action_failed, and support_started with object type and coarse failure code only.
- Retention events: notification_opened, reminder_configured, history_opened, export_started, sync_recovered, subscription_restored, and settings_updated.
- Safety/privacy events: privacy_setting_changed, data_export_requested, account_delete_requested, access_grant_created, access_grant_revoked, safety_block_shown, and urgent_disclaimer_viewed.
- Monetization events: paywall_viewed, trial_started, purchase_started, purchase_completed, purchase_failed, subscription_canceled, entitlement_restored, benefit_eligible, and entitlement_expired where monetization is in scope.
- Monetization model: use original free/trial/paid/sponsored/school/provider entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, school contracts, or partner offers from Find My Kids.
- Analytics rule: do not send raw content, symptoms, child/student identifiers, school records, grades, family media, location traces, professional identifiers, payment credentials, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, unsupported OS, expired session, revoked token, unsupported region, missing school/provider/family benefit, or maintenance banner.
- Permission denied, permission revoked in OS settings, limited permission granted, device disconnected, school SSO expired, child profile missing, and permission granted after fallback use.
- Duplicate taps, retry after timeout, duplicate webhook delivery, stale optimistic UI, conflict after reconnect, and clock skew.
- Deleted, suspended, blocked, expired, unavailable, region-locked, entitlement-locked, provider-owned, school-owned, child-owned, device-owned, or account-merged objects.
- Partial upload/download, corrupt cache, disk full, app termination during background work, and push delivered before local cache is ready.
- Abuse/fraud: account takeover, invite abuse, location misuse, overbroad sharing, school impersonation, unsafe requests, support social engineering, and policy escalation.
- Subscription, paid purchase, school eligibility, provider eligibility, family plan, or device service restored on a different platform, refunded externally, unavailable in region, or contradicted by server state.
- Legal/privacy request submitted while active care relationships, family invites, child data, school courses, messages, subscriptions, support cases, or audit records still exist.

## Test Plan

- Unit tests for validation, state machines, permission gates, role checks, entitlement checks, idempotency keys, safety copy routing, and privacy-safe analytics payload construction.
- Integration tests for auth, onboarding, eligibility, primary reads/writes, settings, support, notifications, entitlement transitions, data export, and account deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event, provider/device/LMS import, and realtime reconciliation path.
- Offline tests for cached reads, stale labels, queued safe drafts, blocked unsafe writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, limited-access, OS-settings recovery, HealthKit, Health Connect, camera, microphone, location, notification, calendar, contacts, and files states.
- Safety/privacy tests for sensitive-data redaction, consent/sharing revocation, support escalation, audit events, urgent disclaimers, legal links, child/student data, and school/provider-owned records.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, media alternatives, and error text.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, sponsored/school/provider eligibility, and unavailable states where applicable.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences, reminder timing, deep links, and in-app notification center behavior.
- Manual verification tests for child consent and COPPA-style controls, background location, companion app pairing, audio/listen features, subscription restore, location accuracy, geofence timing, and device removal prevention.

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
- Which account, subscription, provider, school, child, family, device, organization, region, or eligibility states require paid, sponsored, physical, or regulated test access?
- Which third-party providers will supply identity, payments, notifications, analytics, maps, childcare listings, device cloud, HealthKit, Health Connect, LMS, storage, media, or support services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, school-contract, medical-device, child-data, or platform-policy reasons?
- What retention, export, and deletion limits apply to provider-owned, school-owned, device-owned, family-owned, child/student, billing, subscription, support, or audit records?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, seed-data policy, and safety-review checklist.
- Phase 2: Build onboarding, dashboard, detail, primary workflow, settings, support, and entitlement shells with original copy and sample data.
- Phase 3: Add backend contracts, audit logging, offline/retry handling, notification preferences, consent/proxy/sharing controls, integrations, and data export/delete flows.
- Phase 4: Add app-specific safety controls for family GPS location, child companion pairing, route history, places/geofences, loud signal, battery/app usage checks, chat, subscriptions, and child-location safety.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, billing, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, entitlement states, and account deletion.
- Record app-specific account, provider, school, family, child, device, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for Find My Kids-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
