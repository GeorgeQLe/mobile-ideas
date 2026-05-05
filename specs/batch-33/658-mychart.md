# MyChart-Style Clone Spec

> Metadata
> - Inspiration app: MyChart
> - Category: Health and medical
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: provider-specific MyChart configuration, HIPAA-covered workflows, proxy access, test-result release rules, appointment availability, telehealth launch, billing, and medical-record export format.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, or unlicensed integrations.

## Overview

Build an original mobile product inspired by MyChart's public health, pharmacy, patient, or clinician workflow. The V1 clone focuses on patient-portal onboarding, organization selection, appointment scheduling, test results, medications, secure messages, proxy access, bill pay, telehealth launch, health summaries, and records export.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs, app-specific risk boundaries are explicit, and unverified native, account, subscription, hardware, regional, and regulated behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first health and medical experience with onboarding, dashboard, primary workflow, alerts/reminders, settings, support, and recovery flows.
- Preserve the functional job behind MyChart while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.
- Provide enough specificity for downstream implementation planning without claiming native one-for-one parity.

## Non-Goals

- Do not copy MyChart branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence for iOS, Android, account, subscription, push, and permission states.
- Do not control real devices, dispatch emergency services, process regulated health/pharmacy actions, or integrate paid/provider systems without separate legal, safety, and platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/mychart/id382952264 | iOS listing, privacy labels, release notes, supported device claims, and app support links | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=epic.mychart.android | Android listing, data safety, install requirements, and release cadence | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://www.mychart.org/ | Patient portal scope, organization selection, sign-in model, and public feature overview | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Official help | https://www.mychart.org/Help | Account access, appointments, messaging, test results, proxy access, billing, and troubleshooting | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.mychart.org/Privacy | Portal privacy disclosures and redirect boundaries for provider-specific policies | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Terms | https://www.mychart.org/Terms | Portal terms, account, content, provider organization, and medical-information boundaries | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support guest education, signup, returning-user recovery, required consent, permission primers, and blocked-account states appropriate for health and medical.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and must expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must distinguish public-source verified behavior, inferred clone behavior, and unverified native behavior in requirements and test evidence.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and account deletion entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking irreversible, regulated, hazardous, or unsafe writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: provider-specific MyChart configuration, HIPAA-covered workflows, proxy access, test-result release rules, appointment availability, telehealth launch, billing, and medical-record export format.

## Core User Journeys

- User creates or restores a MyChart-style account, completes consent and eligibility checks, and reaches a privacy-forward dashboard.
- User reviews a record, refill, message, appointment, or professional item with source/provenance, release status, and next action clearly labeled.
- User starts a care, pharmacy, communication, scheduling, or support request; required safety disclaimers appear before submission; the request receives a durable status.
- User edits notification/reminder preferences and sees the difference between transactional, care-critical, marketing, and optional wellness messages.
- User exports records or requests account/data deletion, sees provider-owned/legal-hold limitations, and receives an auditable request state.
- User attempts an urgent or clinically unsafe action and is routed to emergency disclaimers, support escalation, or provider-owned channels rather than generic app completion.
- User opens settings, reviews privacy and terms links, changes notification/privacy preferences, starts data export, and requests deletion with clear constraints.
- User contacts support with app-specific context, receives a durable case state, and can see whether the issue is account, provider, device, billing, or regional.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, identity proofing, organization selection, and consent | email, password, SSO, code, organization | new, returning, verified, proxy, locked | MFA required, unsupported provider, expired invite |
| Home/Dashboard | Personalized health, care, pharmacy, or clinician workspace summary | taps, pull refresh, filter, deep link | empty, loading, current, attention, stale | provider outage, consent missing, partial account link |
| Profile/Eligibility | Demographics, identity, benefits, professional or patient verification | forms, document upload, plan card, license | draft, verified, pending, rejected, expired | name mismatch, document rejected, eligibility unavailable |
| Care/Orders | Appointment, refill, message, telehealth, professional communication, or order flow | forms, date/time, clinician, location, payment | draft, submitted, confirmed, completed | clinical unavailable, refill denied, unsafe request |
| Records/Results | Clinical, pharmacy, professional, or activity record review | filter, open, download, share | empty, loaded, sensitive, delayed, exported | data withheld, release delay, mismatched patient |
| Messages/Notifications | Secure messages, reminders, alerts, results, order and appointment updates | compose, reply, category, preference | unread, sent, pending, escalated | urgent content warning, delivery failure, disabled push |
| Payments/Benefits | Bills, copays, insurance, rewards, subscriptions, or employer/provider benefits | card, wallet, coupon, claim, benefit id | eligible, active, denied, paid, refunded | price mismatch, benefit unavailable, regulatory hold |
| Find Care/Directory | Provider, pharmacy, location, service, clinician, or professional search | query, location, filters, specialty | empty, results, selected, unavailable | closed location, out-of-network, stale directory |
| Privacy/Data Rights | Consent, data sharing, export, delete, proxy, and communication preferences | toggles, request, confirmation | loaded, pending, exported, deleted | legal hold, proxy conflict, provider-owned data |
| Settings/Support | Account recovery, help, accessibility, terms, privacy, and escalation | forms, links, support case | loaded, editing, submitted, resolved | urgent medical disclaimer, support backlog, locked account |

## Data Model

- `User`: account, identity-verification status, consent, locale, accessibility, communication preferences, deletion/export status, and support state.
- `Profile`: patient, proxy, caregiver, clinician, pharmacy, member, or professional role with eligibility, organization, and verification metadata.
- `CareRelationship`: provider, clinic, pharmacy, organization, plan, or professional network relationship with scope and expiry.
- `HealthRecord`: clinical, pharmacy, benefits, appointment, message, refill, order, or professional record with provenance and release status.
- `Request`: refill, appointment, message, telehealth, bill, fax, document, or support request with validation, queue, and resolution state.
- `ConsentGrant`: sharing, proxy, marketing, notification, data export, research, or integration consent with revocation audit.
- `Reminder`: medication, appointment, result, refill, benefit, wellness, or professional task reminder with quiet hours and delivery history.
- `PaymentOrBenefit`: copay, bill, card, wallet, ExtraCare-style reward, benefit card, subscription, claim, or eligibility state.
- `DirectoryEntry`: provider, location, service, pharmacy, clinician, or organization listing with freshness and availability metadata.
- `AuditEvent`: sensitive reads/writes, identity checks, proxy changes, data exports, account deletion, support escalation, and regulatory events.
- `LocalCacheRecord`: encrypted offline summary cache with TTL, redaction policy, retry state, and device-lock requirements.

## API And Backend Contracts

- Auth/identity: `POST /auth/session`, `POST /auth/mfa`, `POST /identity/verify`, `POST /organizations/select`, and `POST /proxy/accept` with audit metadata.
- Profile/eligibility: `GET /profile`, `PATCH /profile`, `GET /eligibility`, and organization/provider/plan-scoped entitlement responses.
- Records: `GET /records`, `GET /records/{recordId}`, `POST /records/export`, and release-status metadata for provider-owned or delayed records.
- Requests: `POST /requests`, `GET /requests/{requestId}`, and type-specific validation for appointment, refill, message, telehealth, fax, bill, or support workflows.
- Messaging/reminders: `GET /messages`, `POST /messages`, `POST /reminders`, and transactional push categories that distinguish urgent, clinical, marketing, and optional wellness content.
- Directory/search: `GET /directory` with specialty/service/location/organization filters, cache freshness, and availability disclaimers.
- Payments/benefits: `GET /payments`, `POST /payments/session`, `GET /benefits`, and immutable receipt/claim metadata without storing raw card or regulated identifiers in the client.
- Privacy/support: `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, and `POST /support-cases` with legal-hold and provider-owned-data limitations.
- Audit: `GET /audit-events` for user-visible sensitive activity where lawful, plus internal append-only logs for clinical, pharmacy, professional, and account events.
- Localization/config: `GET /app-config` returns feature flags, supported regions, legal links, copy keys, app minimum versions, and maintenance banners.
- Idempotency and audit: all sensitive writes require idempotency keys, actor IDs, device IDs, request IDs, conflict responses, and immutable audit events.

## Realtime, Push, And Offline Behavior

- Cache the home dashboard, recent detail pages, settings, entitlement state, and in-progress safe drafts with explicit TTL and stale-state labels.
- Realtime channels may use websocket, SSE, polling, or push-triggered refetch; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category, mirrored in an in-app notification center where relevant, and deep-linked only after authorization checks.
- Queue only low-risk drafts locally; block money movement, regulated actions, emergency/dispatch claims, real-device hazardous commands, irreversible deletes, and unsafe submissions while offline.
- Long-running tasks must expose pending, complete, failed, canceled, expired, and support-escalated states.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, duplicate events, and replayed webhooks.

## Permissions, Privacy, And Safety

- Treat health, pharmacy, patient, clinician, benefits, and professional data as sensitive; encrypt at rest and in transit and require device lock for cached views where appropriate.
- Do not provide diagnosis, prescribing, emergency triage, or clinical advice unless a separately reviewed licensed-provider workflow exists; urgent content must route to emergency guidance.
- Consent, proxy, caregiver, professional, and organization access must be explicit, auditable, revocable where lawful, and clearly separate from marketing preferences.
- Do not send PHI, raw health entries, prescription data, professional identifiers, payment details, precise location, or message contents as analytics properties.
- Provider-owned, payer-owned, pharmacy-owned, or organization-owned records may not be deletable or exportable solely by the clone; display limitations and request status honestly.
- Native permission prompts for notifications, camera/document scan, location/store search, HealthKit/fitness integrations, contacts, photos, and files must be just-in-time and have functional denial fallbacks.
- Provide user-visible privacy policy, terms, data export, delete-account, report/support, and account recovery flows from settings.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, `organization_or_home_selected`, and `onboarding_blocked` with source, locale, and experiment IDs.
- Core action events: `home_viewed`, `detail_opened`, `primary_action_started`, `primary_action_completed`, `primary_action_failed`, and `support_started` with object type and coarse failure code only.
- Retention events: `notification_opened`, `reminder_or_alert_configured`, `history_opened`, `share_started`, `offline_recovered`, and `settings_updated`.
- Safety/privacy events: `privacy_setting_changed`, `data_export_requested`, `account_delete_requested`, `access_grant_created`, `access_grant_revoked`, and `safety_block_shown`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_restored`, and `entitlement_expired` where monetization is in scope.
- Monetization model: use original free/trial/paid entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, or partner offers from MyChart.
- Analytics rule: do not send raw content, device credentials, precise location, camera/audio, PHI, pharmacy records, professional identifiers, payment credentials, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, unsupported OS, expired session, revoked token, unsupported region, or maintenance banner.
- Permission denied, permission later revoked in OS settings, limited permission granted, and permission granted after fallback use.
- Duplicate taps, retry after timeout, duplicate webhook delivery, stale optimistic UI, conflict after reconnect, and clock skew.
- Deleted, suspended, blocked, expired, unavailable, region-locked, entitlement-locked, provider-owned, or hardware-unavailable objects.
- Partial upload/download, corrupt cache, disk full, app termination during background work, and push delivered before local cache is ready.
- Abuse/fraud: account takeover, invite abuse, overbroad sharing, support social engineering, false emergency claims, unsafe commands, and policy escalation.
- Subscription or benefit restored on a different platform, refunded externally, unavailable in region, or contradicted by server state.
- Legal/privacy request submitted while active devices, monitoring, pharmacy/care records, professional communications, bills, or support cases still exist.

## Test Plan

- Unit tests for validation, state machines, permission gates, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.
- Integration tests for auth, onboarding, primary reads/writes, settings, support, notifications, entitlement transitions, data export, and account deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event, and realtime reconciliation path.
- Offline tests for cached reads, stale labels, queued safe drafts, blocked unsafe writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, limited-access, and OS-settings recovery states.
- Safety/privacy tests for sensitive-data redaction, sharing/revocation, support escalation, audit events, and legal-link accessibility.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, media alternatives, and error text.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, and unavailable states where applicable.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences, deep links, and in-app notification center behavior.
- Manual verification tests for provider-specific MyChart configuration, HIPAA-covered workflows, proxy access, test-result release rules, appointment availability, telehealth launch, billing, and medical-record export format.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can complete onboarding and reach the default dashboard without unsupported permissions.
- A returning user can complete the primary workflow, recover from network failure, and confirm canonical server state after reconnect.
- Dashboard, detail, primary action, alerts/reminders, sharing/access, settings, support, notifications, entitlement, and deletion/export flows are represented in routes and tests.
- All entities have owners, lifecycle states, authorization rules, retention, audit events, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, entitlement, notifications, data deletion/export, and regression behavior.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact iOS and Android native screens, permission prompts, and push payloads differ materially from public marketplace claims?
- Which account, subscription, provider, device, hardware, organization, region, or eligibility states require paid or physical test access?
- Which third-party providers will supply identity, payments, notifications, analytics, maps, device cloud, health/pharmacy, storage, media, or support services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, or platform-policy reasons?
- What retention, export, and deletion limits apply to provider-owned, device-owned, health/pharmacy, billing, monitoring, support, or audit records?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, and seed-data policy.
- Phase 2: Build onboarding, dashboard, detail, primary workflow, settings, support, and entitlement shells with original copy and sample data.
- Phase 3: Add backend contracts, audit logging, offline/retry handling, notification preferences, access/sharing controls, and data export/delete flows.
- Phase 4: Add app-specific safety controls for patient-portal onboarding, organization selection, appointment scheduling, test results, medications, secure messages, proxy access, bill pay, telehealth launch, health summaries, and records export.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, subscription/benefit states, and account deletion.
- Record app-specific account, hardware, provider, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for MyChart-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
