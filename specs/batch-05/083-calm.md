# Calm-Style Clone Spec

> Metadata
> - Inspiration app: Calm
> - Category: meditation, sleep stories, soundscapes, breathwork, stretching, premium content, family/workplace wellness, subscriptions, and consumer health data
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, onboarding, meditation and sleep-story playback, music/soundscape loops, download/offline behavior, streak/session history, reminders, Calm Premium checkout/cancellation/refund, family/team products, Calm Sleep app overlap, notifications, data export/deletion, support escalation, and regional content availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original sleep and meditation product inspired by Calm's public workflow: onboard around stress or sleep goals, browse meditation and sleep content, play stories/music/soundscapes, set reminders, track session history, manage premium subscriptions, request support, and control privacy/data rights.

The clone must not copy marks, artwork, sleep stories, celebrity/narrator recordings, music, meditations, breathwork scripts, stretching videos, Calm Health materials, pricing, promotional copy, and support copy. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first calm-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a Calm-branded app or imply affiliation with Calm, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/calm/id571800810 | Official iOS listing, Health & Fitness category, sleep/meditation positioning, in-app purchases, age rating, privacy labels, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.calm.android | Official Android listing, package id, meditation/sleep positioning, in-app purchases, data-safety orientation, and product claims | Verified 2026-04-19 |
| Calm Help Center | https://support.calm.com/hc/en-us | Public support entry for subscriptions, accounts, playback, troubleshooting, and privacy support | Verified 2026-04-19 |
| Calm Privacy Policy | https://www.calm.com/privacy-policy | Personal information, usage data, privacy rights, retention, and service-provider context | Verified 2026-04-19 |
| Calm Terms | https://www.calm.com/terms | Service use, age/account rules, subscriptions, promotional offers, and legal constraints | Verified 2026-04-19 |
| Calm Consumer Health Data Privacy Policy | https://www.calm.com/calm-consumer-health-data-privacy-policy | Consumer health data handling review area for Calm Sleep/health-adjacent services | Verified 2026-04-19 |
| Calm Subscription Cancellation Help | https://support.calm.com/hc/en-us/articles/115002473607-How-to-cancel-my-subscription | Cancellation paths across web, Apple, Google Play, and billing-owner review area | Verified 2026-04-19 |
| Calm Data Access/Delete Help | https://support.calm.com/hc/en-us/articles/115003990133-Deleting-or-Accessing-your-Personal-Information | Access, deletion, irreversible account delete, subscription caveats, and support routing | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Calm help pages position the app around meditation, sleep stories, music, soundscapes, breathwork, stretching, daily practice, and Premium subscriptions.
- V1 must model signed-out preview, new member, returning member, trial user, paid subscriber, expired subscriber, family/team user where chosen, Calm Sleep-adjacent user, restricted account, and deleted-account states.
- Onboarding must support sleep/stress goals, preferred content length, bedtime schedule, account creation or deferral, reminders, age/locale, accessibility preference, and subscription education.
- Content library must support meditation, Sleep Stories-like original stories, music, soundscapes, breathwork, stretching, daily content, favorites, search/filtering, and licensed asset metadata.
- Playback must support timer, background audio, completion, favorite/save, download/offline where scoped, session history, and entitlement-aware locked content.
- Subscription flows must support free, trial, paid, lifetime if chosen, family/team if chosen, expired, refunded, store-managed, web-managed, restore-pending, and unavailable states.
- Settings must expose subscription management, reminder categories, content downloads, session history, support, terms, privacy, data access/export, account deletion, and product-specific caveats.
- Calm Health or clinical/consumer-health-adjacent surfaces must remain out of V1 unless separately scoped, sourced, and legally reviewed.

### Manual Verification Required

- native iOS/Android screen capture, account signup/login, onboarding, meditation and sleep-story playback, music/soundscape loops, download/offline behavior, streak/session history, reminders, Calm Premium checkout/cancellation/refund, family/team products, Calm Sleep app overlap, notifications, data export/deletion, support escalation, and regional content availability.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default Calm-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, legal, subscription primer | email, SSO, skip | guest, new, returning | auth fail, suspended, offline |
| Goal Setup | Stress, sleep, focus, mood preferences | goal, schedule, reminder | complete, skipped | underage, unsupported region |
| Home/Daily Calm | Daily recommendation and resume | session tap, favorite, search | personalized, empty, stale | offline, entitlement conflict |
| Library/Search | Browse meditations, sleep, music, breathwork | query, filters, category | results, no-results | licensed content unavailable |
| Sleep | Stories, soundscapes, bedtime timers | play, timer, favorite | library, playing | premium locked, expired download |
| Session Player | Audio or movement playback | play, pause, timer, download | active, complete | audio fail, background interruption |
| Breathwork/Movement | Guided breathing or stretching | start, pace, finish | active, complete | motion sensitivity, injury warning |
| Progress/History | Session history, streaks, goals | date, filter, delete | empty, active | deleted session, clock skew |
| Premium Subscription | Trial, paid, restore, cancel guidance | checkout, restore, manage | free, trial, paid, expired | refund, store mismatch, web purchase |
| Settings/Privacy/Support | Account, data rights, help | export, delete, case | loaded, exporting, deleting | subscription active, support unavailable |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `MemberProfile`: app-specific memberprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `GoalPreference`: app-specific goalpreference state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `ContentItem`: app-specific contentitem state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Collection`: app-specific collection state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `PlaybackSession`: app-specific playbacksession state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SleepStory`: app-specific sleepstory state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Soundscape`: app-specific soundscape state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `BreathworkSession`: app-specific breathworksession state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `MovementSession`: app-specific movementsession state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DownloadAsset`: app-specific downloadasset state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Reminder`: app-specific reminder state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SessionHistory`: app-specific sessionhistory state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SubscriptionEntitlement`: plan, provider, trial, renewal, expiration, refund, feature flags, and server verification status.
- `SupportCase`: user, category, target object, evidence, privacy redaction, status, owner, and resolution metadata.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: account auth with device, locale, subscription, and deletion state.
- `PATCH /member/profile`, `GET /home`, `GET /daily`: goals, personalization, daily content, and stale markers.
- `GET /library`, `GET /content/:id`, `GET /collections/:id`: content catalog, licensing metadata, transcripts where available, and entitlement gates.
- `POST /playback/start`, `PATCH /playback/:id`, `POST /favorites`: playback state, completion, favorites, and idempotency.
- `GET /downloads/:id/license`, `POST /downloads/:id/complete`: offline rights, expiry, and device limits where scoped.
- `PATCH /reminders`, `GET /history`, `DELETE /history/:id`: reminders, session history, deletion, and export eligibility.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: Premium-like entitlement verification across web/app-store providers.
- `POST /support/cases`, `GET /support/cases/:id`: subscription, refund, playback, account, and privacy support workflows.
- `GET /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy, export, irreversible deletion, and subscription warnings.

## Realtime, Push, And Offline Behavior

- Cache Home, library metadata, downloaded audio, reminders, settings, session history, and entitlement snapshots with license freshness labels.
- Allow downloaded content playback and local completion history offline; block checkout, restore, support evidence upload, data export, deletion, and account changes.
- Downloads must support pending, available, expired, removed, device-limit, disk-full, content-updated, and entitlement-revoked states.
- Session completion sync must be idempotent and server-time reconciled to avoid duplicate streak or history entries.
- Push payloads must avoid sensitive health/stress goals, sleep concerns, subscription disputes, and support content.
- Background playback must handle OS audio interruptions, sleep timers, revoked notification permissions, and expired subscription snapshots.

## Permissions, Privacy, And Safety

- Mental-health claims, sleep/health content, licensed audio, celebrity/narrator rights, subscriptions, consumer health data, and minors are launch blockers with named owners.
- Do not claim diagnosis, treatment, guaranteed stress reduction, or clinical outcomes unless separate clinical/legal review approves the exact copy and workflow.
- Content licenses must cover scripts, voices, music, soundscapes, images, transcripts, downloads, and region/language rights.
- Breathwork and movement require safety copy, pacing controls, injury warnings, and accessibility alternatives.
- Account deletion must warn about session history, saved sessions, subscription cancellation, refund implications, and irreversible data loss.
- Accessibility must cover playback controls, sleep timers, screen readers, dynamic type, reduced motion, captions/transcripts where available, and high-contrast nighttime UI.

## Analytics And Monetization

- Track privacy-safe events: goal_selected, daily_content_viewed, session_started, session_completed, sleep_content_played, download_started, reminder_set, subscription_manage_opened.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- audio expires offline
- web subscription on mobile
- delete account before refund
- background playback interrupted
- sleep timer crosses day
- licensed content removed
- trial converts unexpectedly
- minor user sees mature content

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
- Manual verification tests for native iOS/Android screen capture, account signup/login, onboarding, meditation and sleep-story playback, music/soundscape loops, download/offline behavior, streak/session history, reminders, Calm Premium checkout/cancellation/refund, family/team products, Calm Sleep app overlap, notifications, data export/deletion, support escalation, and regional content availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing marks, artwork, sleep stories, celebrity/narrator recordings, music, meditations, breathwork scripts, stretching videos, Calm Health materials, pricing, promotional copy, and support copy.
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

- Phase 1: app shell, auth, goal setup, Home/Daily, library, session player, settings, and privacy-safe analytics.
- Phase 2: sleep section, soundscapes, favorites, downloads/offline, timers, progress history, and playback/accessibility tests.
- Phase 3: Premium entitlement gates, web/app-store billing states, cancellation/refund support, and subscription regression tests.
- Phase 4: breathwork/movement with safety copy, reduced-motion alternatives, and health-claim legal review.
- Phase 5: family/team or Calm Health-adjacent surfaces only if separately scoped with privacy, care, and legal approval.
- Phase 6: licensed content review, regional availability, data access/delete, support runbooks, and launch readiness review.

## Next Steps

- Resolve Calm manual verification blockers before claiming one-for-one native playback, subscription, or health-data parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
