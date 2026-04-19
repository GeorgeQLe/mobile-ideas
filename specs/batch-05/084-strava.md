# Strava-Style Clone Spec

> Metadata
> - Inspiration app: Strava
> - Category: fitness social, GPS activity recording, routes, segments, clubs, challenges, leaderboards, device sync, subscriptions, and location privacy
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, GPS recording, map rendering, route creation, segment matching, leaderboards, clubs/challenges, privacy zones, beacon/location sharing, device integrations, Apple Health/Google Fit imports, subscription checkout/cancellation, API behavior, notifications, export/delete, support escalation, and regional safety defaults still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original fitness social product inspired by Strava's public workflow: record or import activities, view route maps and performance stats, share with followers, join clubs/challenges, compare segments, discover routes, manage subscriptions, export/delete data, and control location privacy.

The clone must not copy marks, maps styling, route/segment database, leaderboard logic, Athlete Intelligence-like output, community content, heatmap data, training metrics, subscription copy, pricing, and API contracts. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first strava-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a Strava-branded app or imply affiliation with Strava, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/strava-run-bike-walk/id426826309 | Official iOS listing, Health & Fitness category, activity recording, routes, social sharing, Apple Watch support, in-app purchases, and privacy labels | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.strava | Official Android listing, package id, activity tracking, routes, segments, device sync, in-app purchases, data-safety orientation, and supported-device notes | Verified 2026-04-19 |
| Strava Support | https://support.strava.com/hc/en-us | Public support entry for account, recording, routes, segments, privacy, subscriptions, and troubleshooting | Verified 2026-04-19 |
| Strava Data and Privacy Help | https://support.strava.com/hc/en-us/articles/360001487844-Data-and-Privacy | Data export, activity privacy, health-related data consent, community features, and user controls | Verified 2026-04-19 |
| Strava Privacy Policy | https://www.strava.com/legal/privacy | Personal information, location, health data, sharing, privacy rights, and 2026 policy context | Verified 2026-04-19 |
| Strava Terms | https://www.strava.com/legal/terms | Service use, subscriptions, content, geolocation responsibilities, disputes, and legal constraints | Verified 2026-04-19 |
| Strava Privacy Support Section | https://support.strava.com/hc/en-us/sections/360000520230-Privacy | Privacy defaults, controls, delete account, export, health data, under-18 defaults, and activity visibility topics | Verified 2026-04-19 |
| Supported Android Devices | https://support.strava.com/hc/en-us/articles/216919047-Supported-Android-devices-and-Android-operating-systems | Android support and GPS/device limitations review area | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Strava support pages position the service around GPS activity recording, social fitness sharing, routes, segments, clubs, challenges, device sync, analytics, and subscriptions.
- V1 must model signed-out preview, new athlete, returning athlete, private athlete, under-18 defaults, subscriber, expired subscriber, imported-device athlete, GPS-denied user, restricted account, and deleted-account states.
- Onboarding must support sport preferences, location permission primer, privacy defaults, health data consent, device/watch connection, notification preference, and subscription education.
- Recording must support GPS route capture, indoor/manual activities, pause/resume, sensor data where scoped, battery/permission warnings, map preview, privacy controls, and discard/save flows.
- Activity detail must support map, splits, elevation, heart-rate/power where scoped, photos, comments, kudos-like reactions, privacy visibility, edits, delete, and export.
- Social features must support feed, profile, follow, clubs, challenges, comments, reports, blocking, under-18 protections, and moderation queues.
- Routes and segments must support original route datasets or licensed map providers, privacy zones, stale GPS, leaderboard eligibility, disputed efforts, and safety copy.
- Settings must expose privacy controls, data export, delete account, connected apps/devices, subscriptions, notifications, support, terms, and privacy policy.

### Manual Verification Required

- native iOS/Android screen capture, account signup/login, GPS recording, map rendering, route creation, segment matching, leaderboards, clubs/challenges, privacy zones, beacon/location sharing, device integrations, Apple Health/Google Fit imports, subscription checkout/cancellation, API behavior, notifications, export/delete, support escalation, and regional safety defaults.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default Strava-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, privacy defaults | email, SSO, age, locale | guest, new, returning | auth fail, underage, suspended, offline |
| Sport Setup | Activity preferences and devices | sport, device, health consent | complete, skipped | device unavailable, health denied |
| Feed/Home | Social activity feed and resume | scroll, kudos, comment | personalized, empty, stale | privacy-hidden, offline |
| Record Activity | GPS or indoor recording | start, pause, stop, sensors | ready, recording, paused | GPS denied, low battery, poor signal |
| Save Activity | Title, sport, visibility, stats review | edit, privacy, save | draft, saving, saved | duplicate, stale sensor data |
| Activity Detail | Map, stats, comments, social actions | kudos, comment, share | public, followers, private | deleted, flagged, privacy zone |
| Routes/Maps | Route discovery and planning | search, filters, save | results, route detail | unsafe route, map provider fail |
| Segments/Leaderboards | Effort comparison | segment, filter, rank | eligible, ranked | privacy block, GPS anomaly |
| Clubs/Challenges | Community participation | join, invite, post | active, completed | moderation hold, underage block |
| Devices/Integrations | Wearables and import connections | connect, sync, revoke | connected, syncing | token expired, duplicate import |
| Subscription | Paid insights and restore/cancel | checkout, restore, manage | free, trial, paid, expired | refund, store pending |
| Settings/Privacy/Support | Controls, export, delete, help | toggle, export, delete | loaded, exporting, deleting | public contribution retention |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `AthleteProfile`: app-specific athleteprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `PrivacyPreference`: app-specific privacypreference state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Activity`: app-specific activity state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `ActivityStream`: app-specific activitystream state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Route`: app-specific route state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Segment`: app-specific segment state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Effort`: app-specific effort state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SensorSample`: app-specific sensorsample state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DeviceConnection`: app-specific deviceconnection state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Club`: app-specific club state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Challenge`: app-specific challenge state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Comment`: app-specific comment state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Reaction`: app-specific reaction state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Report`: app-specific report state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SubscriptionEntitlement`: plan, provider, trial, renewal, expiration, refund, feature flags, and server verification status.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: auth with age, locale, device, and deletion state.
- `PATCH /athlete/profile`, `GET /feed`, `GET /athletes/:id`: athlete profile, social graph, privacy state, and pagination.
- `POST /activities/start`, `PATCH /activities/:id/stream`, `POST /activities/:id/finish`: recording lifecycle with sensor samples, GPS confidence, and idempotency.
- `POST /activities/import`, `GET /device-connections`, `DELETE /device-connections/:id`: device/app imports, token state, duplicate detection, and revocation.
- `GET /activities/:id`, `PATCH /activities/:id`, `DELETE /activities/:id`: activity detail, edits, visibility, deletion, and audit events.
- `GET /routes`, `POST /routes`, `GET /routes/:id`: route search, planning, map provider metadata, safety labels, and privacy rules.
- `GET /segments/:id`, `GET /segments/:id/leaderboard`, `POST /segments/:id/flag`: segment matching, leaderboard eligibility, flags, and dispute states.
- `POST /clubs/:id/join`, `POST /challenges/:id/join`, `POST /comments`, `POST /reports`: community, moderation, report, block, and abuse workflows.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: subscription verification and paid feature gates.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy controls, export, deletion, and public contribution warnings.

## Realtime, Push, And Offline Behavior

- Recording must continue through short connectivity gaps using local GPS/sensor storage with crash recovery and battery/permission warnings.
- Allow local recording, draft activity review, and cached feed/activity reads offline; block publish, comments, kudos, checkout, export, deletion, and public route creation.
- Activity upload must be chunked, idempotent, resumable, and validated for GPS anomalies before route/segment matching.
- Realtime/polling must reconcile comments, kudos, leaderboard rank, challenge progress, device imports, subscription changes, data export, and deletion state.
- Push payloads must avoid precise location, route start/end, health metrics, private activity titles, and under-18 sensitive details.
- Privacy zones and hidden details must be applied before map rendering, sharing, notifications, and analytics emission.

## Permissions, Privacy, And Safety

- Precise location, health data, under-18 defaults, routes/heatmaps, leaderboards, device sync, subscriptions, and harassment/moderation are launch blockers with named owners.
- Default privacy must avoid exposing home/work start-end points, live location, precise health metrics, or under-18 activity without explicit controls.
- Segment and leaderboard systems require anti-cheat, GPS anomaly detection, manual flagging, disputes, and fair ranking rules.
- Route discovery must include safety disclaimers, map-provider licensing, unsafe-route reporting, and blocked sensitive-area handling.
- Connected apps/devices require scoped consent, token revocation, duplicate import handling, and no unauthorized downstream data use.
- Accessibility must cover map alternatives, screen-reader stats summaries, dynamic type, color-independent zones, and reduced-motion activity playback.

## Analytics And Monetization

- Track privacy-safe events: recording_started, recording_saved, activity_uploaded, route_opened, segment_viewed, club_joined, challenge_joined, privacy_setting_changed.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- GPS drift near home
- recording crash recovery
- duplicate wearable import
- segment cheating flag
- under-18 public activity
- subscription insight mismatch
- route crosses unsafe area
- delete account with public routes

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
- Manual verification tests for native iOS/Android screen capture, account signup/login, GPS recording, map rendering, route creation, segment matching, leaderboards, clubs/challenges, privacy zones, beacon/location sharing, device integrations, Apple Health/Google Fit imports, subscription checkout/cancellation, API behavior, notifications, export/delete, support escalation, and regional safety defaults.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing marks, maps styling, route/segment database, leaderboard logic, Athlete Intelligence-like output, community content, heatmap data, training metrics, subscription copy, pricing, and API contracts.
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

- Phase 1: app shell, auth, athlete setup, privacy defaults, feed, profile, settings, and privacy-safe analytics.
- Phase 2: activity recording, GPS stream storage, save flow, activity detail, upload reconciliation, and recording tests.
- Phase 3: routes/maps, privacy zones, device imports, Apple Health/Google Health-style connectors, and map/provider tests.
- Phase 4: segments, leaderboards, challenges, clubs, moderation, anti-cheat, and location safety regression tests.
- Phase 5: subscriptions, paid insights, restore/cancel, support cases, export/delete, and billing/privacy tests.
- Phase 6: launch review for location privacy, health data, minors, map licensing, connected devices, subscriptions, accessibility, and regional availability.

## Next Steps

- Resolve Strava manual verification blockers before claiming one-for-one native GPS, segment, privacy, subscription, or device-sync parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
