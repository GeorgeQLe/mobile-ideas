# MDLIVE-Style Clone Spec

> Metadata
> - Inspiration app: MDLIVE
> - Category: Health and medical
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: state regulations, insurance eligibility, prescription restrictions, controlled-substance exclusions, appointment availability, video quality, device data import, behavioral health policies, and clinical support outcomes.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, regulated provider contracts, or unlicensed integrations.

## Overview

Build an original mobile product inspired by MDLIVE's public health and medical workflow. The V1 clone focuses on virtual urgent care, behavioral health, dermatology, provider scheduling, on-demand queue, visit intake, video consultation, prescriptions, medical-device data sharing, and post-visit records.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, eligibility, provider, device, subscription, regional, and regulated behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first health and medical experience with consent-based onboarding, dashboard, primary care or tracking flow, reminders, records/export, privacy controls, support, and recovery flows.
- Preserve the functional job behind MDLIVE while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.
- Provide enough specificity for downstream implementation planning without claiming native one-for-one parity or regulated clinical correctness.

## Non-Goals

- Do not copy MDLIVE branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, clinical content, nutrition databases, provider directories, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence for iOS, Android, account, eligibility, provider, subscription, push, and permission states.
- Do not provide diagnosis, prescribing, emergency triage, regulated medical-device interpretation, medication administration guidance, or clinical advice without separately reviewed licensed-provider workflows.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/mdlive/id839671393 | iOS listing, privacy labels, release notes, medical category, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.mdlive.mobile | Android listing, data safety, release notes, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://www.mdlive.com/ | Telehealth categories, urgent care, behavioral health, dermatology, and visit flow | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official support | https://www.mdlive.com/faqs/ | Account, visits, insurance, prescriptions, payments, and technical support | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.mdlive.com/privacy-policy/ | Health, visit, account, payment, communication, and analytics disclosures | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms | https://www.mdlive.com/terms-of-use/ | Telehealth terms, prescribing limits, emergencies, account, and service boundaries | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support guest education where lawful, signup, returning-user recovery, identity/eligibility checks, consent capture, permission primers, and blocked-account states.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, consent-missing, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and must expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must show provenance, freshness, release status, source, and limitations for care, pharmacy, nutrition, sleep, device, or wellness data.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and account deletion entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, sponsored, employer/plan eligible, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking regulated, clinical, paid, provider-owned, hazardous, or irreversible writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: state regulations, insurance eligibility, prescription restrictions, controlled-substance exclusions, appointment availability, video quality, device data import, behavioral health policies, and clinical support outcomes.

## Core User Journeys

- User creates or restores a MDLIVE-style account, completes consent and eligibility checks, and reaches a privacy-forward dashboard.
- User reviews a medication, visit, message, nutrition entry, sleep/activity metric, device reading, or health record with source/provenance and limitations clearly labeled.
- User starts the primary care, pharmacy, tracking, device-sync, appointment, payment, or support request; safety disclaimers appear before submission; the request receives a durable status.
- User edits notification/reminder preferences and sees the difference between transactional, care-critical, marketing, and optional wellness messages.
- User exports records or requests account/data deletion, sees provider-owned/legal-hold limitations, and receives an auditable request state.
- User attempts an urgent or clinically unsafe action and is routed to emergency disclaimers, support escalation, or provider-owned channels rather than generic app completion.
- User loses connectivity, sees cached state labeled as stale, can inspect allowed history, and cannot submit unsafe or regulated requests until reconnected.
- User contacts support with app-specific context, receives a durable case state, and can distinguish account, clinical, benefit, subscription, device, billing, or regional issues.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, identity proofing, eligibility, and consent | email, password, SSO, member id, invite, device state | new, returning, verified, pending, locked | MFA required, unsupported region, expired invite, account mismatch |
| Profile/Eligibility | Patient, member, caregiver, clinician, or wellness profile and eligibility | forms, cards, plan data, demographic edits | draft, active, pending, rejected, expired | name mismatch, plan unavailable, sponsor missing |
| Home/Dashboard | Personalized summary of care, medication, nutrition, sleep, device, or wellness state | taps, pull refresh, filters, deep links | empty, loading, current, attention, stale | provider outage, device missing, consent missing |
| Primary Flow | Refill, appointment, visit, message, log, sync, record, or care action | forms, scans, provider, food, device, payment, date/time | draft, submitted, confirmed, completed | unsafe request, unavailable provider, invalid reading |
| Records/History | Medication, clinical, nutrition, sleep, activity, device, or visit history | filter, open, export, share | empty, loaded, sensitive, delayed, exported | withheld data, stale device sync, provider-owned record |
| Messages/Support | Secure messages, support cases, care team contact, or technical help | compose, reply, category, attachment | unread, sent, pending, escalated | urgent content warning, delivery failure, support backlog |
| Reminders/Notifications | Medication, appointment, hydration, sleep, logging, order, or wellness reminders | toggles, schedule, quiet hours, category | enabled, paused, missed, completed | push denied, duplicate reminder, time-zone skew |
| Search/Directory | Provider, pharmacy, clinic, food, device, article, program, or location search | query, filters, location, barcode, scan | empty, results, selected, unavailable | stale directory, unsupported barcode, out-of-network |
| Payments/Benefits | Bills, copays, insurance, benefits, subscriptions, rewards, or paid app entitlement | card, wallet, receipt, plan, restore | eligible, active, denied, paid, refunded | price mismatch, benefit unavailable, refund pending |
| Settings/Privacy | Account, consent, app permissions, data rights, terms, privacy, export, deletion | forms, toggles, links, request | loaded, editing, exported, deleting | legal hold, provider-owned data, active subscription |

## Data Model

- User: account, identity-verification status, consent, locale, accessibility, communication preferences, deletion/export status, and support state.
- Profile: patient, member, caregiver, clinician, wellness, device-owner, or professional role with eligibility, organization, and verification metadata.
- CareRelationship: provider, clinic, pharmacy, plan, employer, device ecosystem, professional network, or benefit relationship with scope and expiry.
- HealthRecord: clinical, pharmacy, nutrition, sleep, activity, device, benefits, appointment, message, order, or wellness record with provenance and release status.
- Request: refill, appointment, telehealth visit, message, prescription, lab, food log, device sync, subscription, export, bill, or support request with validation and queue state.
- ConsentGrant: sharing, proxy, caregiver, professional, provider, marketing, notification, data export, research, HealthKit/Health Connect, or integration consent with revocation audit.
- Reminder: medication, appointment, refill, hydration, meal, sleep, weight, activity, benefit, wellness, or professional task reminder with quiet hours and delivery history.
- PaymentOrBenefit: copay, bill, card, subscription, paid app purchase, employer sponsorship, insurance eligibility, benefit card, claim, refund, or restore state.
- DirectoryEntry: provider, pharmacy, clinic, food, device, article, program, service, or organization listing with freshness and availability metadata.
- AuditEvent: sensitive reads/writes, identity checks, proxy changes, provider requests, exports, account deletion, support escalation, billing, and regulatory events.
- LocalCacheRecord: encrypted offline summary cache with TTL, redaction policy, retry state, stale-source label, and device-lock requirements.

## API And Backend Contracts

- Auth/identity: POST /auth/session, POST /auth/mfa, POST /identity/verify, POST /eligibility/check, and POST /proxy/accept with audit metadata.
- Profile/eligibility: GET /profile, PATCH /profile, GET /eligibility, and organization/provider/plan-scoped entitlement responses.
- Records: GET /records, GET /records/{recordId}, POST /records/export, and release-status metadata for provider-owned, device-owned, or delayed records.
- Requests: POST /requests, GET /requests/{requestId}, PATCH /requests/{requestId}, and type-specific validation for appointment, refill, visit, log, sync, bill, or support workflows.
- Messaging/reminders: GET /messages, POST /messages, POST /reminders, and transactional push categories that distinguish urgent, clinical, marketing, and optional wellness content.
- Directory/search: GET /directory with specialty, service, location, food, device, organization, and benefit filters plus cache freshness and availability disclaimers.
- Payments/benefits: GET /payments, POST /payments/session, GET /benefits, POST /entitlements/restore, and immutable receipt/claim metadata without storing raw card or regulated identifiers in the client.
- Device/integrations: GET /integrations, POST /integrations/connect, DELETE /integrations/{id}, and permission-scoped imports from HealthKit, Health Connect, wearables, pharmacy, provider, or nutrition systems.
- Privacy/support: GET /privacy/settings, PATCH /privacy/settings, POST /data-export, DELETE /account, and POST /support-cases with legal-hold and provider-owned-data limitations.
- Audit/config: GET /audit-events for user-visible sensitive activity where lawful; GET /app-config returns feature flags, supported regions, legal links, copy keys, minimum versions, and maintenance banners.

## Realtime, Push, And Offline Behavior

- Cache the dashboard, recent detail pages, settings, entitlement state, and in-progress safe drafts with explicit TTL and stale-state labels.
- Realtime channels may use websocket, SSE, polling, device-sync callbacks, or push-triggered refetch; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category, mirrored in an in-app notification center where relevant, and deep-linked only after authorization checks.
- Queue only low-risk drafts locally; block regulated care requests, medication/refill actions, paid transactions, clinical submissions, device-derived medical claims, irreversible deletes, and unsafe requests while offline.
- Long-running tasks must expose pending, complete, failed, canceled, expired, provider-review, benefit-review, and support-escalated states.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, duplicate events, stale wearable data, and replayed webhooks.

## Permissions, Privacy, And Safety

- Treat health, pharmacy, patient, clinician, nutrition, sleep, reproductive, device, benefits, and wellness data as sensitive; encrypt at rest and in transit and require device lock for cached views where appropriate.
- Do not provide diagnosis, prescribing, emergency triage, eating-disorder treatment, medication administration guidance, or clinical advice unless a separately reviewed licensed-provider workflow exists.
- Consent, proxy, caregiver, professional, provider, organization, device, and employer/plan access must be explicit, auditable, revocable where lawful, and clearly separate from marketing preferences.
- Do not send PHI, raw health entries, prescription data, food diary details, sleep audio, professional identifiers, payment details, precise location, message contents, or child data as analytics properties.
- Provider-owned, payer-owned, pharmacy-owned, device-owned, employer-sponsored, or organization-owned records may not be deletable or exportable solely by the clone; display limitations and request status honestly.
- Native permission prompts for notifications, camera/document scan, microphone/audio, location/store search, Bluetooth/device sync, HealthKit, Health Connect, contacts, photos, and files must be just-in-time and have functional denial fallbacks.
- Safety copy must route urgent symptoms, mental-health crisis, suspected medication reactions, abnormal device readings, pregnancy emergency concerns, and severe nutrition/sleep risks to emergency or clinician-owned channels.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: onboarding_started, permission_primer_viewed, signup_started, signup_completed, eligibility_checked, organization_or_plan_selected, and onboarding_blocked with source, locale, and experiment IDs.
- Core action events: home_viewed, detail_opened, primary_action_started, primary_action_completed, primary_action_failed, and support_started with object type and coarse failure code only.
- Retention events: notification_opened, reminder_configured, history_opened, export_started, device_sync_recovered, subscription_restored, and settings_updated.
- Safety/privacy events: privacy_setting_changed, data_export_requested, account_delete_requested, access_grant_created, access_grant_revoked, safety_block_shown, and urgent_disclaimer_viewed.
- Monetization events: paywall_viewed, trial_started, purchase_started, purchase_completed, purchase_failed, subscription_canceled, entitlement_restored, benefit_eligible, and entitlement_expired where monetization is in scope.
- Monetization model: use original free/trial/paid/sponsored/benefit entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, employer offers, or partner offers from MDLIVE.
- Analytics rule: do not send raw content, medical symptoms, medication names, pharmacy records, food logs, sleep audio, precise location, professional identifiers, payment credentials, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, unsupported OS, expired session, revoked token, unsupported region, missing benefit, or maintenance banner.
- Permission denied, permission later revoked in OS settings, limited permission granted, device disconnected, and permission granted after fallback use.
- Duplicate taps, retry after timeout, duplicate webhook delivery, stale optimistic UI, conflict after reconnect, and clock skew.
- Deleted, suspended, blocked, expired, unavailable, region-locked, entitlement-locked, provider-owned, payer-owned, pharmacy-owned, device-owned, or account-merged objects.
- Partial upload/download, corrupt cache, disk full, app termination during background work, and push delivered before local cache is ready.
- Abuse/fraud: account takeover, invite abuse, overbroad sharing, support social engineering, false clinical claims, unsafe requests, and policy escalation.
- Subscription, paid purchase, employer benefit, plan eligibility, or device service restored on a different platform, refunded externally, unavailable in region, or contradicted by server state.
- Legal/privacy request submitted while active care relationships, prescriptions, device syncs, provider messages, bills, support cases, or audit records still exist.

## Test Plan

- Unit tests for validation, state machines, permission gates, entitlement checks, idempotency keys, safety copy routing, and privacy-safe analytics payload construction.
- Integration tests for auth, onboarding, eligibility, primary reads/writes, settings, support, notifications, entitlement transitions, data export, and account deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event, provider/device import, and realtime reconciliation path.
- Offline tests for cached reads, stale labels, queued safe drafts, blocked unsafe writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, limited-access, OS-settings recovery, HealthKit, Health Connect, camera, microphone, location, notification, and files states.
- Safety/privacy tests for sensitive-data redaction, consent/proxy/sharing revocation, support escalation, audit events, urgent disclaimers, and legal-link accessibility.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, media alternatives, and error text.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, employer/plan eligibility, and unavailable states where applicable.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences, reminder timing, deep links, and in-app notification center behavior.
- Manual verification tests for state regulations, insurance eligibility, prescription restrictions, controlled-substance exclusions, appointment availability, video quality, device data import, behavioral health policies, and clinical support outcomes.

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
- Which account, subscription, provider, pharmacy, device, employer/plan, professional, organization, region, or eligibility states require paid, sponsored, physical, or regulated test access?
- Which third-party providers will supply identity, payments, notifications, analytics, maps, pharmacy, telehealth, nutrition, device cloud, HealthKit, Health Connect, storage, media, or support services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, medical-device, or platform-policy reasons?
- What retention, export, and deletion limits apply to provider-owned, device-owned, health/pharmacy, billing, subscription, support, or audit records?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, seed-data policy, and safety-review checklist.
- Phase 2: Build onboarding, dashboard, detail, primary workflow, settings, support, and entitlement shells with original copy and sample data.
- Phase 3: Add backend contracts, audit logging, offline/retry handling, notification preferences, consent/proxy/sharing controls, integrations, and data export/delete flows.
- Phase 4: Add app-specific safety controls for virtual urgent care, behavioral health, dermatology, provider scheduling, on-demand queue, visit intake, video consultation, prescriptions, medical-device data sharing, and post-visit records.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, billing, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, subscription/benefit states, and account deletion.
- Record app-specific account, provider, pharmacy, device, employer/plan, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for MDLIVE-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
