# TP-Link Tapo-Style Clone Spec

> Metadata
> - Inspiration app: TP-Link Tapo
> - Category: Smart home
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: Tapo Care subscriptions, SD-card playback, camera privacy modes, local network pairing, Matter/voice integrations, device firmware, and region-specific product catalogs.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, or unlicensed integrations.

## Overview

Build an original mobile product inspired by TP-Link Tapo's public smart-home security and device-control workflow. The V1 clone focuses on Tapo camera, sensor, lighting, plug, robot-vacuum, and Matter device control with homes/rooms, scenes, automations, notifications, cloud/local storage, and device sharing.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs, app-specific risk boundaries are explicit, and unverified native, account, subscription, hardware, regional, and regulated behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first smart home experience with onboarding, dashboard, primary workflow, alerts/reminders, settings, support, and recovery flows.
- Preserve the functional job behind TP-Link Tapo while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.
- Provide enough specificity for downstream implementation planning without claiming native one-for-one parity.

## Non-Goals

- Do not copy TP-Link Tapo branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence for iOS, Android, account, subscription, push, and permission states.
- Do not control real devices, dispatch emergency services, process regulated health/pharmacy actions, or integrate paid/provider systems without separate legal, safety, and platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/tp-link-tapo/id1472718009 | iOS listing, privacy labels, release notes, and in-app purchase surface | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.tplink.iot | Android listing, data safety, compatibility, and release cadence | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://www.tapo.com/ | Device families, room/home model, automation positioning, storage, and subscription information | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Official support | https://www.tapo.com/support/ | Setup, firmware, troubleshooting, cloud service, notification, and compatibility docs | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.tapo.com/privacy-policy/ | Account, device, camera/audio, location, analytics, sharing, and retention disclosures | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |
| Terms | https://www.tapo.com/terms-of-use/ | Service terms, accounts, content, subscriptions, support, and acceptable-use boundaries | Verified public URL on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support guest education, signup, returning-user recovery, required consent, permission primers, and blocked-account states appropriate for smart home.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and must expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must distinguish public-source verified behavior, inferred clone behavior, and unverified native behavior in requirements and test evidence.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and account deletion entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking irreversible, regulated, hazardous, or unsafe writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: Tapo Care subscriptions, SD-card playback, camera privacy modes, local network pairing, Matter/voice integrations, device firmware, and region-specific product catalogs.

## Core User Journeys

- User creates a home, pairs supported TP-Link Tapo-style devices, names rooms, grants only required permissions, and sees devices on the dashboard.
- User opens a device, sees current state with freshness, issues a low-risk command, and receives confirmation after canonical server reconciliation.
- User configures an automation or schedule, reviews affected devices, receives a safety warning for risky conditions, and can pause or delete the rule.
- User receives a push alert, opens the event, reviews related media or telemetry, acknowledges it, and can escalate to support or emergency contacts where lawful.
- Owner invites a household member or guest with scoped access, the invitee accepts, and the owner can audit and revoke access.
- User loses connectivity, sees cached state labeled as stale, can inspect history where allowed, and cannot perform unsafe or irreversible commands until reconnected.
- User opens settings, reviews privacy and terms links, changes notification/privacy preferences, starts data export, and requests deletion with clear constraints.
- User contacts support with app-specific context, receives a durable case state, and can see whether the issue is account, provider, device, billing, or regional.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, legal acceptance, restored session, or invite acceptance | email, password, SSO, invite link, region | new, returning, invited, locked, migrated | offline, MFA required, region unsupported, account suspended |
| Home/Dashboard | Homes, rooms, locations, devices, and summary alerts | taps, pull refresh, home switch, filter | empty, loading, healthy, alerting, partial outage | stale device state, cloud outage, permission revoked |
| Device Setup | Pair or claim a supported device | QR code, Bluetooth, Wi-Fi, hub, serial | permission primer, scanning, joining, naming, success | unsupported device, bad QR, wrong network, firmware update |
| Device Detail | Control and inspect one device | toggle, slider, mode, schedule, live view | online, offline, updating, locked, shared | unsafe command blocked, stale telemetry, conflicting owner change |
| Camera/Media | Live view, clips, events, zones, and audio controls where applicable | play, scrub, talk, download, zone edit | live, buffering, recorded, expired, gated | camera offline, no plan, clip missing, microphone denied |
| Scenes/Automations | Rules, schedules, routines, geofences, and device triggers | conditions, actions, time, location, members | draft, enabled, paused, invalid, completed | unsafe automation, missing device, conflicting rules |
| Activity/Alerts | Security, device, automation, and account event feed | filter, acknowledge, deep link | empty, unread, grouped, critical, archived | duplicate push, delayed event, missing media |
| Members/Sharing | Household, guest, installer, or temporary access management | role, invite, code, expiration | owner, admin, guest, pending, revoked | stale invite, overbroad access, revocation delay |
| Subscriptions | Entitlements for history, AI, monitoring, storage, or advanced controls | plan selection, restore, cancel, receipt | free, trial, active, expired, unavailable | cross-platform mismatch, refund, billing outage |
| Settings/Support | Account, privacy, device maintenance, help, data rights, and deletion | forms, toggles, links, support case | loaded, editing, exporting, deleting | pending support case, account deletion with active devices |

## Data Model

- `User`: account, MFA state, locale, notification preferences, deletion/export status, and support state.
- `Home`: location, rooms, members, subscription region, privacy settings, and shared-access rules.
- `Device`: model, claimed owner, room, firmware, connection state, capability flags, safety class, and last telemetry.
- `DeviceCredential`: encrypted pairing token, hub relationship, credential rotation metadata, and revocation state.
- `Scene`: name, trigger, conditions, actions, owner, enabled state, safety review status, and last run result.
- `Event`: append-only device, camera, security, automation, and account event with severity, media references, and retention class.
- `MediaAsset`: camera clip or snapshot metadata, storage location, retention expiry, entitlement gate, and share permissions.
- `ShareGrant`: household, guest, installer, or temporary access with role, scope, expiration, and revocation audit data.
- `Entitlement`: free, trial, active, expired, restored, refunded, and unavailable states for storage, AI, monitoring, or advanced controls.
- `AuditEvent`: security-sensitive writes including commands, member changes, automation edits, support actions, exports, and deletes.
- `LocalCacheRecord`: offline dashboard, device, event, and settings cache with staleness, retry, and conflict markers.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/mfa`, `POST /auth/recover`, `DELETE /auth/session`, and invite-token acceptance with device-scoped session metadata.
- Homes: `GET /homes`, `POST /homes`, `PATCH /homes/{homeId}`, `GET /homes/{homeId}/members`, and role-scoped membership writes.
- Devices: `GET /devices`, `POST /devices/claim`, `PATCH /devices/{deviceId}`, `POST /devices/{deviceId}/command`, and `POST /devices/{deviceId}/firmware-check` with capability flags and idempotency keys.
- Events/media: `GET /events`, `GET /media`, signed clip URLs, retention metadata, entitlement gates, and immutable audit identifiers.
- Automations: `GET /scenes`, `POST /scenes`, `PATCH /scenes/{sceneId}`, `POST /scenes/{sceneId}/test`, and server-side validation for unsafe or impossible conditions.
- Sharing: `POST /share-grants`, `PATCH /share-grants/{grantId}`, and revocation endpoints that fan out invalidation events.
- Notifications: `POST /notification-preferences`, token registration, category-specific quiet hours, critical alert eligibility, and in-app inbox mirrors.
- Entitlements: `GET /entitlements`, `POST /checkout/session`, restore receipt endpoints, and webhook-backed subscription/storage/monitoring updates.
- Privacy/support: `POST /data-export`, `DELETE /account`, `POST /support-cases`, and explicit dependency checks for active devices, monitoring, or household ownership.
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

- Treat real-world device control as safety-sensitive: doors, locks, alarms, cameras, thermostats, garage doors, and monitoring actions require server-side authorization and explicit state confirmation.
- Never expose live camera/audio, clip URLs, device credentials, Wi-Fi details, location history, or household membership in analytics, logs, crash reports, or support transcripts without redaction.
- Permission prompts must be just-in-time for camera QR scan, microphone talk, Bluetooth pairing, local network discovery, location/geofence, notifications, and photos/files export.
- Shared access must be scoped by home, room, device, feature, expiration, and role; revocation must invalidate local tokens and queued commands.
- Automation safety rules must block contradictory, repeated, irreversible, hazardous, or high-frequency commands and require a dry-run preview for risky actions.
- Camera/security events must include retention, download, deletion, and share rules; emergency or professional monitoring language must avoid implying verified dispatch behavior until legally integrated.
- Provide user-visible privacy policy, terms, data export, delete-account, report/support, and account recovery flows from settings.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `permission_primer_viewed`, `signup_started`, `signup_completed`, `organization_or_home_selected`, and `onboarding_blocked` with source, locale, and experiment IDs.
- Core action events: `home_viewed`, `detail_opened`, `primary_action_started`, `primary_action_completed`, `primary_action_failed`, and `support_started` with object type and coarse failure code only.
- Retention events: `notification_opened`, `reminder_or_alert_configured`, `history_opened`, `share_started`, `offline_recovered`, and `settings_updated`.
- Safety/privacy events: `privacy_setting_changed`, `data_export_requested`, `account_delete_requested`, `access_grant_created`, `access_grant_revoked`, and `safety_block_shown`.
- Monetization events: `paywall_viewed`, `trial_started`, `purchase_started`, `purchase_completed`, `purchase_failed`, `subscription_canceled`, `entitlement_restored`, and `entitlement_expired` where monetization is in scope.
- Monetization model: use original free/trial/paid entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, or partner offers from TP-Link Tapo.
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
- Manual verification tests for Tapo Care subscriptions, SD-card playback, camera privacy modes, local network pairing, Matter/voice integrations, device firmware, and region-specific product catalogs.

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
- Phase 4: Add app-specific safety controls for Tapo camera, sensor, lighting, plug, robot-vacuum, and Matter device control with homes/rooms, scenes, automations, notifications, cloud/local storage, and device sharing.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, subscription/benefit states, and account deletion.
- Record app-specific account, hardware, provider, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for TP-Link Tapo-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
