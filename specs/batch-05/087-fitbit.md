# Fitbit-Style Clone Spec

> Metadata
> - Inspiration app: Fitbit
> - Category: health and fitness dashboard, wearable sync, activity, sleep, heart health, stress, nutrition, Premium insights, Google account migration, and sensitive health data
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, Google/Fitbit account migration, device pairing, Bluetooth sync, tracker/smartwatch firmware, heart-rate/sleep/stress data accuracy, ECG/regulated features if any, calls/text permissions, Wear OS behavior, Premium checkout/cancellation, notifications, data export/deletion, support escalation, and regional/device availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original health and fitness dashboard inspired by Fitbit's public workflow: sign in with Google/Fitbit account context, pair or sync wearable devices, view activity/sleep/heart/stress/nutrition stats, set goals, access Premium insights, manage notifications/support, export/delete data, and control sensitive health privacy.

The clone must not copy Fitbit and Google marks, wearable firmware behavior, device pairing flows, health algorithms, readiness/sleep profiles, workout content, recipes, social features, Premium copy, pricing, and support copy. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first fitbit-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a Fitbit-branded app or imply affiliation with Fitbit, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/fitbit-health-fitness/id462638897 | Official iOS listing, Health & Fitness category, activity/sleep/health positioning, device sync, Premium, iPhone compatibility, and privacy labels | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile | Official Android listing, package id, activity/sleep/nutrition/stress, trackers/Wear OS, Premium, calls/text permissions, and data-safety orientation | Verified 2026-04-19 |
| Fitbit Help Center | https://support.google.com/fitbit/?hl=en | Public support entry for accounts, devices, syncing, app, Premium, and troubleshooting | Verified 2026-04-19 |
| Fitbit Privacy Policy | https://support.google.com/product-documentation/answer/14815921?hl=en-en | Fitbit data collection, use, sharing, privacy rights, and account context | Verified 2026-04-19 |
| Fitbit Privacy FAQ | https://support.google.com/product-documentation/answer/13532616?hl=en | Google Account use with Fitbit, Google Privacy Policy applicability, data export/delete, and account controls | Verified 2026-04-19 |
| Google Privacy Policy | https://policies.google.com/privacy | Google account data handling, controls, export, deletion, and cross-product privacy context | Verified 2026-04-19 |
| Fitbit Contact Support | https://goo.gle/contactfitbit | Official support routing referenced from marketplace listing | Verified 2026-04-19 |
| Fitbit Premium Help | https://support.google.com/fitbit/topic/14236509?hl=en | Premium subscription and feature review area | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Fitbit/Google help pages position the app around activity, sleep, heart health, stress, nutrition, goals, wearable/device sync, Premium insights, and Google account privacy controls.
- V1 must model signed-out preview, Google-account user, legacy/migration user where scoped, phone-only user, paired-device user, sync-failed user, Premium subscriber, expired subscriber, child/family device user if scoped, restricted account, and deleted-account states.
- Onboarding must support account migration/selection, device pairing primer, Bluetooth/location/notification permissions, health data consent, goals, age/family constraints, and Premium education.
- Device sync must support pairing, firmware/device metadata, battery, sync status, duplicate samples, clock drift, missing days, manual refresh, and support evidence without copying Fitbit protocols.
- Dashboard must support steps, distance, active minutes, workouts, sleep score/stages where scoped, heart rate, stress/mindfulness, nutrition/water, goals, trends, and stale-data labels.
- Premium features must support original insights, readiness/sleep-style scores only with licensed/validated algorithms, workout/content library rights, recipes, entitlement states, and no medical claims.
- Calls/texts/notifications from wrist must remain launch-blocked until platform/device permissions and hardware behavior are verified.
- Settings must expose devices, permissions, Premium, privacy, Google/Fitbit account controls, data export/delete, notifications, support, terms, and privacy links.

### Manual Verification Required

- native iOS/Android screen capture, Google/Fitbit account migration, device pairing, Bluetooth sync, tracker/smartwatch firmware, heart-rate/sleep/stress data accuracy, ECG/regulated features if any, calls/text permissions, Wear OS behavior, Premium checkout/cancellation, notifications, data export/deletion, support escalation, and regional/device availability.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default Fitbit-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and Google/Fitbit account context | Google auth, legacy prompt | new, returning, migrating | auth fail, migration required, offline |
| Device Setup | Pair tracker/watch or phone-only mode | Bluetooth, device scan, consent | searching, paired, skipped | device unsupported, firmware fail |
| Today Dashboard | Health and fitness overview | tile tap, refresh, edit | fresh, stale, empty | sync failed, missing day |
| Activity | Steps, workouts, active minutes | date, workout, goal | tracked, imported | duplicate workout, sensor gap |
| Sleep | Sleep duration, score/stages where scoped | date, trend, details | tracked, insufficient | device not worn, algorithm unavailable |
| Heart/Stress | Heart rate, zones, mindfulness, stress | metric, session, trend | tracked, premium | medical disclaimer, sensor error |
| Nutrition/Water | Food and hydration logging where scoped | log, edit, goal | empty, logged | stale food data, duplicate entry |
| Devices/Sync | Device list, battery, firmware, permissions | sync, update, revoke | connected, syncing | Bluetooth denied, token expired |
| Premium | Insights, content, restore/cancel | checkout, restore, manage | free, trial, paid, expired | refund, store pending |
| Notifications/Wrist | Calls/texts/app notifications where scoped | permission, category, test | enabled, disabled | platform denied, hardware unsupported |
| Settings/Privacy/Support | Data rights, help, delete | export, delete, case | loaded, exporting, deleting | account migration, retention hold |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `AccountLink`: app-specific accountlink state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Device`: app-specific device state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DevicePairingSession`: app-specific devicepairingsession state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SyncBatch`: app-specific syncbatch state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SensorSample`: app-specific sensorsample state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `ActivityMetric`: app-specific activitymetric state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Workout`: app-specific workout state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SleepSession`: app-specific sleepsession state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `HeartMetric`: app-specific heartmetric state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `StressMetric`: app-specific stressmetric state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `NutritionEntry`: app-specific nutritionentry state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Goal`: app-specific goal state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `PremiumInsight`: app-specific premiuminsight state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `NotificationPermission`: app-specific notificationpermission state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SupportCase`: user, category, target object, evidence, privacy redaction, status, owner, and resolution metadata.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/google`, `POST /auth/migration`, `DELETE /auth/session`: account auth and migration state.
- `POST /devices/pair`, `GET /devices`, `PATCH /devices/:id`, `DELETE /devices/:id`: device pairing, firmware, battery, permission, and unlink lifecycle.
- `POST /sync/batches`, `GET /sync/batches/:id`: device sample upload, duplicate detection, clock correction, and stale-data labels.
- `GET /dashboard`, `GET /metrics/activity`, `GET /metrics/sleep`, `GET /metrics/heart`, `GET /metrics/stress`: health dashboard tiles and trend data.
- `POST /workouts`, `PATCH /goals`, `POST /nutrition/entries`: workouts, goals, food/water logs, and manual corrections.
- `GET /premium/insights`, `GET /content/workouts`, `GET /content/recipes`: paid insights/content with licensing and validation metadata.
- `PATCH /notification-permissions`, `POST /wrist-notifications/test`: calls/texts/app notification configuration where hardware/platform permits.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: Premium entitlement verification.
- `POST /data-export`, `DELETE /account`, `POST /support/cases`: privacy rights, deletion, migration warnings, and device support workflows.

## Realtime, Push, And Offline Behavior

- Cache dashboard, device list, recent metrics, settings, goals, and entitlement snapshot with sample freshness and sync status.
- Allow local reads and manual entries offline; block pairing, firmware updates, subscription changes, export, deletion, and support evidence upload.
- Device sync must resume with ordered batches, idempotency keys, duplicate sample detection, and clock drift correction after reconnect.
- Metrics must distinguish phone-only, wearable-derived, user-entered, imported, stale, and unavailable data.
- Push/wrist payloads must avoid sensitive health details and require user category controls plus hardware/platform permission checks.
- Account migration and deletion flows must show data loss/retention warnings before destructive transitions.

## Permissions, Privacy, And Safety

- Sensitive health data, wearable pairing, heart/sleep/stress algorithms, regulated device features, calls/texts, Google account migration, Premium insights, and minors/family use are launch blockers with named owners.
- Do not claim medical diagnosis, treatment, ECG/arrhythmia detection, sleep disorder detection, or clinical accuracy unless separately validated and cleared.
- Wearable/device sync requires explicit consent, hardware compatibility matrix, revocation, firmware/version handling, and support runbooks.
- Insights/readiness/sleep-style scores need algorithm validation, explainability, disclaimers, and opt-out controls before launch.
- Data export/deletion must cover account migration, retained legal records, device unlinking, historical samples, and support cases.
- Accessibility must cover dashboard tiles, chart summaries, wearable setup alternatives, dynamic type, screen readers, and color-independent health zones.

## Analytics And Monetization

- Track privacy-safe events: account_migration_started, device_pairing_started, device_sync_completed, dashboard_tile_opened, sleep_detail_viewed, premium_insight_viewed, notification_permission_changed, data_export_requested.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- Bluetooth sync fails
- device clock wrong
- tracker not worn during sleep
- duplicate workout import
- legacy account migration deadline
- Premium score unavailable
- call/text permission denied
- delete account with paired device

## Test Plan

- Unit tests for validation, state machines, entitlement gates, privacy-safe analytics payloads, and deletion/export eligibility.
- Contract tests for every documented API route, including idempotency, validation errors, authorization, pagination, stale versions, and sensitive-state responses.
- Integration tests for auth, onboarding, home, core workflow, detail/history, settings, support, subscription, privacy export, and deletion.
- Offline tests for cached reads, queued drafts, blocked sensitive writes, stale data labels, corrupt cache, disk-full behavior, and reconnect reconciliation.
- Permission tests for denied, granted, revoked, limited, and platform-unavailable states for every scoped OS permission.
- Billing tests for free, trial, paid, canceled, expired, refunded, unavailable, restored, family/sponsored where scoped, and store-sync-pending states.
- Privacy tests for data minimization, consent withdrawal, export completeness, delete warnings, retained records, audit events, and sensitive analytics redaction.
- Safety tests for category-specific harms, report/escalation paths, blocked launch areas, age/region restrictions, and unsupported claim prevention.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, chart/media alternatives, and error recovery.
- Manual verification tests for native iOS/Android screen capture, Google/Fitbit account migration, device pairing, Bluetooth sync, tracker/smartwatch firmware, heart-rate/sleep/stress data accuracy, ECG/regulated features if any, calls/text permissions, Wear OS behavior, Premium checkout/cancellation, notifications, data export/deletion, support escalation, and regional/device availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Fitbit and Google marks, wearable firmware behavior, device pairing flows, health algorithms, readiness/sleep profiles, workout content, recipes, social features, Premium copy, pricing, and support copy.
- New and returning users can complete onboarding, use the core workflow, recover from permission/offline failures, manage entitlements, and reach settings/support with original or licensed data.
- All documented entities have lifecycle states, owners, authorization rules, audit behavior, and deletion/export handling.
- Signed-out, signed-in, paid, expired, permission-denied, offline, stale-data, restricted, and deleted-account states are covered by tests.
- Every manual verification blocker remains behind a launch-blocking feature flag or explicit owner/path until lawful test-device evidence is captured.
- Privacy, safety, accessibility, subscription, support, data export, and deletion flows have acceptance tests before app implementation starts.
- The spec uses exact first-party URLs and does not claim one-for-one native parity for unverified behavior.

## Open Questions

- Which original content, datasets, algorithms, providers, and licenses will back the downstream clone?
- Which features are V1 versus later, especially paid, device, health, community, AI, or partner/provider-dependent surfaces?
- Which jurisdictions, age gates, accessibility standards, privacy laws, app-store rules, and retention obligations are launch requirements?
- Which support, moderation, refund, safety, and escalation owners must approve the product before release?
- Which manual verification blockers can be resolved with lawful test accounts/devices before implementation begins?

## Build Plan

- Phase 1: app shell, Google-account auth, migration placeholder, device setup shell, dashboard, settings, and privacy-safe analytics.
- Phase 2: device pairing simulation, sync batches, activity/workout metrics, stale labels, and sync regression tests.
- Phase 3: sleep/heart/stress/nutrition tiles with disclaimers, goals, chart accessibility, and health-data tests.
- Phase 4: Premium insights/content with original algorithms/content, billing/restore, and entitlement tests.
- Phase 5: notification/wrist feature flags, support cases, export/delete, account migration warnings, and privacy tests.
- Phase 6: launch review for sensitive health data, wearable hardware, regulated features, Google account constraints, subscriptions, minors, accessibility, and regional availability.

## Next Steps

- Resolve Fitbit manual verification blockers before claiming one-for-one native device, account migration, Premium, or health-metric parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
