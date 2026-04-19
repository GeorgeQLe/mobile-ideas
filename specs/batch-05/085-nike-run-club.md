# Nike Run Club-Style Clone Spec

> Metadata
> - Inspiration app: Nike Run Club
> - Category: running tracker, GPS runs, guided runs, training plans, challenges, badges, shoe tagging, Apple Health/device sync, and fitness safety
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, Nike member signup/login, GPS/treadmill run recording, Apple Watch behavior, Apple Health sync, music integration, guided-run playback, training-plan availability by country, challenges, badges/trophies, shoe tagging, real-time location sharing, Strava/device upload, notifications, data export/deletion, support escalation, and regional availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original running product inspired by Nike Run Club's public workflow: set goals, record GPS or treadmill runs, follow guided runs or training plans, tag shoes, join challenges, share achievements, sync health data, manage Nike member data, and control privacy/support paths.

The clone must not copy Nike marks, run plans, guided-run audio, coach/athlete voices, badges, challenge names, visual design, playlists, training copy, member data model, and support copy. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first nike run club-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a Nike Run Club-branded app or imply affiliation with Nike Run Club, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/nike-run-club-running-coach/id387771637 | Official iOS listing, Health & Fitness category, GPS runs, training plans, guided runs, Apple Watch, Apple Health, music, challenges, and privacy labels | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.nike.plusgps | Official Android listing, package id, running tracker, guided runs, training plans, challenges, data-safety orientation, and support contact | Verified 2026-04-19 |
| Nike NRC/NTC Help | https://www.nike.com/help/a/ntc-plan | Public Nike help hub for NRC setup, settings, plans, tracking, sync, social sharing, and troubleshooting | Verified 2026-04-19 |
| Nike Apple Health Help | https://www.nike.com/help/a/connect-nrc-health-app/nrc-settings | Apple Health connection, shared workout/heart-rate/distance data, and permission review area | Verified 2026-04-19 |
| Nike Data Protection Help | https://www.nike.com/help/a/nike-data-protection/ | Nike member data retention, export, inactive account aggregation/deletion, and missing workout data review area | Verified 2026-04-19 |
| Nike Privacy Webform | https://www.nike.com/help/privacy/ | Privacy rights, deletion, correction, export, and support routing | Verified 2026-04-19 |
| Nike NRC Feature Release | https://about.nike.com/newsroom/releases/nike-run-club-app-new-features | Public release context for localized run tips, real-time location sharing, guided runs, plans, languages, countries, and device uploads | Verified 2026-04-19 |
| Nike Help Center | https://www.nike.com/help/ | General official Nike support entry and legal/privacy navigation | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Nike help pages position NRC around run recording, guided runs, training plans, challenges, badges, shoe tagging, Apple Watch/Health, community sharing, and member data controls.
- V1 must model signed-out preview, new runner, returning runner, GPS-denied runner, indoor/treadmill runner, Apple Watch/device user, Apple Health-connected user, training-plan user, challenge participant, inactive account, restricted account, and deleted-account states.
- Onboarding must support running level, goal distance, location primer, health data consent, music/notification preferences, member account, regional plan availability, and injury-risk disclaimers.
- Run recording must support outdoor GPS, indoor/treadmill manual entry where scoped, pause/resume, splits, pace, distance, elevation, heart rate where permitted, route map, and save/discard recovery.
- Guided runs and training plans must use original licensed audio/coaching content, availability rules, download/offline where scoped, progress, missed workout handling, and accessibility alternatives.
- Challenges, badges, shoe tagging, and sharing must support privacy controls, report/block where social features exist, anti-abuse, and no copied Nike economies or badge designs.
- Nike-member-like data handling must support export, inactive-data aggregation, deletion, missing run support, and clear retention warnings.
- Settings must expose run settings, devices, health permissions, notifications, privacy/data rights, connected apps, support, terms/privacy links, and deletion.

### Manual Verification Required

- native iOS/Android screen capture, Nike member signup/login, GPS/treadmill run recording, Apple Watch behavior, Apple Health sync, music integration, guided-run playback, training-plan availability by country, challenges, badges/trophies, shoe tagging, real-time location sharing, Strava/device upload, notifications, data export/deletion, support escalation, and regional availability.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default Nike Run Club-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, member account, legal | email, SSO, skip | guest, new, returning | auth fail, suspended, offline |
| Runner Setup | Goals, level, permissions, devices | goal, distance, health consent | complete, skipped | region block, health denied |
| Home/Plan | Recommended run, plan progress, challenges | run tap, plan, challenge | personalized, empty | offline, plan unavailable |
| Run Recorder | GPS or indoor run tracking | start, pause, stop, audio | ready, recording, paused | GPS denied, low battery, watch lost |
| Run Summary | Stats, effort, route, save/share | edit, tag shoes, save | draft, saving, saved | duplicate, GPS anomaly |
| Guided Run Player | Original coached audio run | play, skip, download | ready, playing, complete | audio missing, music conflict |
| Training Plan | Plan schedule and workouts | select, reschedule, complete | active, missed, complete | country unavailable, injury warning |
| Challenges/Badges | Goals, trophies, social motivation | join, share, invite | active, achieved | cheat/duplicate, privacy block |
| Shoes/Gear | Track mileage by shoe | add, assign, retire | empty, active, retired | missing run, duplicate shoe |
| Devices/Health Sync | Apple Watch/Health and partner sync | connect, revoke, import | connected, syncing | token expired, permission revoked |
| Settings/Data/Support | Privacy, export, delete, help | export, delete, case | loaded, exporting, deleting | inactive retention, support unavailable |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `RunnerProfile`: app-specific runnerprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `RunActivity`: app-specific runactivity state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `RunStream`: app-specific runstream state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Split`: app-specific split state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `RouteMap`: app-specific routemap state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `TrainingPlan`: app-specific trainingplan state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `PlanWorkout`: app-specific planworkout state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `GuidedRun`: app-specific guidedrun state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `AudioAsset`: app-specific audioasset state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Challenge`: app-specific challenge state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Badge`: app-specific badge state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Shoe`: app-specific shoe state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DeviceConnection`: app-specific deviceconnection state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `HealthPermission`: app-specific healthpermission state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SupportCase`: user, category, target object, evidence, privacy redaction, status, owner, and resolution metadata.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: member auth with locale, region, device, and deletion state.
- `PATCH /runner/profile`, `GET /home`, `GET /plans`: setup, recommendations, plan availability, and cache hints.
- `POST /runs/start`, `PATCH /runs/:id/stream`, `POST /runs/:id/finish`: run recording with GPS/sensor samples and idempotency.
- `PATCH /runs/:id`, `DELETE /runs/:id`, `POST /runs/:id/share`: run edits, shoe tags, visibility, deletion, and social sharing.
- `GET /guided-runs`, `GET /guided-runs/:id/license`, `POST /guided-runs/:id/progress`: original audio catalog, downloads, progress, and region eligibility.
- `POST /training-plans`, `PATCH /training-plans/:id/workouts/:workoutId`: plan selection, rescheduling, missed workouts, and completion.
- `POST /challenges/:id/join`, `GET /badges`, `POST /shoes`: challenges, badges, shoe tagging, retirement, and mileage calculations.
- `GET /device-connections`, `POST /device-connections`, `DELETE /device-connections/:id`: health/watch/partner sync with scoped permissions and revocation.
- `POST /data-export`, `DELETE /account`, `POST /support/cases`: data rights, inactive-data warnings, missing run support, and deletion.

## Realtime, Push, And Offline Behavior

- Run recording must continue offline with local GPS/sensor buffering, crash recovery, and battery/permission warnings.
- Allow downloaded guided run playback, local run drafts, plan viewing, and shoe tagging offline; block publishing, sharing, challenges, export, deletion, and support evidence upload.
- Run upload must be chunked, idempotent, resumable, and validated for GPS anomalies and duplicate watch/phone recordings.
- Training plan progress must reconcile server time, missed workouts, regional plan availability, and user edits after reconnect.
- Push payloads must avoid precise location, route start/end, health metrics, and private plan details.
- Health sync must preserve explicit user consent for each metric and handle revoked permissions without losing local runs.

## Permissions, Privacy, And Safety

- GPS location, health data, injury risk, guided coaching, music/audio licensing, device sync, live sharing, data retention, and minors are launch blockers with named owners.
- Do not copy Nike training plans, guided-run scripts, voices, badges, or challenge economies; all coaching content must be original or licensed.
- Training plans and guided runs require injury-risk disclaimers, rest-day logic, accessibility alternatives, and emergency stop/fallback controls.
- Live location sharing or friend features require explicit opt-in, revocation, expiry, block/report, and under-18 restrictions.
- Health sync must disclose data types, destination, retention, revoke behavior, and downstream provider limitations.
- Accessibility must cover audio transcripts/summaries, screen-reader run stats, dynamic type, reduced motion, haptic alternatives, and color-independent pace zones.

## Analytics And Monetization

- Track privacy-safe events: runner_setup_completed, run_started, run_paused, run_saved, guided_run_started, plan_workout_completed, challenge_joined, health_sync_connected.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- watch and phone duplicate run
- GPS drops mid-run
- treadmill manual correction
- music interrupts guided audio
- shoe retired during plan
- inactive data aggregation
- live location sharing revoked
- country unavailable plan

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
- Manual verification tests for native iOS/Android screen capture, Nike member signup/login, GPS/treadmill run recording, Apple Watch behavior, Apple Health sync, music integration, guided-run playback, training-plan availability by country, challenges, badges/trophies, shoe tagging, real-time location sharing, Strava/device upload, notifications, data export/deletion, support escalation, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Nike marks, run plans, guided-run audio, coach/athlete voices, badges, challenge names, visual design, playlists, training copy, member data model, and support copy.
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

- Phase 1: app shell, member auth, runner setup, Home, settings, privacy/data support, and privacy-safe analytics.
- Phase 2: run recorder, GPS streams, run summary, shoe tagging, local recovery, and recording tests.
- Phase 3: guided-run catalog with original audio, download/offline, plan schedule, and playback/accessibility tests.
- Phase 4: challenges, badges, sharing, live-location feature flag, moderation/reporting, and safety tests.
- Phase 5: device/health sync, Apple Watch-style companion contracts, Strava-like upload if scoped, export/delete, and support tests.
- Phase 6: launch review for location, health data, injury risk, audio licensing, regional plans, minors, accessibility, and platform APIs.

## Next Steps

- Resolve Nike Run Club manual verification blockers before claiming one-for-one native run, watch, guided-run, or health-sync parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
