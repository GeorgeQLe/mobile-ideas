# Headspace-Style Clone Spec

> Metadata
> - Inspiration app: Headspace
> - Category: mental wellness, meditation, sleep, mindfulness, therapy/coaching access, AI companion, workplace benefits, subscriptions, and consumer health data
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, goal onboarding, meditation playback, sleepcasts, downloads/offline if available, reminders, subscription checkout/cancellation, employer benefit eligibility, coaching/therapy scheduling, AI companion behavior, crisis/safety routing, notifications, data export/deletion, support escalation, and regional content availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original mental wellness product inspired by Headspace's public workflow: onboard around goals, browse guided meditations and sleep content, use daily mindfulness sessions, access eligible coaching or therapy surfaces, manage subscriptions or employer benefits, receive reminders, contact support, and control privacy/data rights.

The clone must not copy marks, illustrations, voices, meditations, sleepcasts, therapy content, coach/clinician workflows, Ebb-like AI behavior, playlists, scripts, clinical materials, pricing, and benefit copy. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first headspace-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a Headspace-branded app or imply affiliation with Headspace, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/headspace-mindful-meditation/id493145008 | Official iOS listing, Health & Fitness category, meditations, sleep, therapy/coaching/AI companion positioning, age rating, subscriptions, and privacy labels | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.getsomeheadspace.android | Official Android listing, package id, meditation/sleep/anxiety positioning, in-app purchases, data-safety orientation, and subscription context | Verified 2026-04-19 |
| Headspace Help Center | https://help.headspace.com/hc/en-us | Public support entry for account, subscription, content, workplace benefit, and troubleshooting topics | Verified 2026-04-19 |
| Headspace Privacy Policy | https://www.headspace.com/privacy-policy | Personal information, sensitive health data, care provider context, AI features, privacy rights, retention, and supplemental notices | Verified 2026-04-19 |
| Headspace Terms | https://www.headspace.com/terms-and-conditions | Product/service use, health information notice, subscriptions, account, and legal constraints | Verified 2026-04-19 |
| Headspace Privacy/Security/Confidentiality Help | https://help.headspace.com/hc/en-us/articles/39945279865371-Privacy-Security-Confidentiality | Coaching confidentiality, employer reporting limits, notes, and care support review area | Verified 2026-04-19 |
| Headspace Product Page | https://www.headspace.com/ | Public product positioning for meditation, sleep, mindfulness, coaching, therapy, and mental health support | Verified 2026-04-19 |
| Headspace Consumer Health Data Privacy Policy | https://www.headspace.com/consumer-health-data | Consumer health data handling review area where applicable | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Headspace pages position the service around guided meditation, sleep support, stress/anxiety tools, coaching, therapy access, and AI companion support.
- V1 must model signed-out preview, new member, returning member, trial user, paid subscriber, expired subscriber, employer/benefit user, coaching-eligible user, therapy-eligible user, crisis-risk user, restricted account, and deleted-account states.
- Onboarding must support goals, mood/stress context, sleep needs, content preferences, age/locale, notification reminders, accessibility preference, benefit eligibility, and clinical boundary disclosures.
- Content library must support courses, single sessions, daily content, sleep audio, breathwork, mindful movement, favorites, downloads/offline where scoped, and licensed content metadata.
- Care surfaces must separate general wellness content from coaching, therapy, psychiatry, or crisis support, with eligibility, consent, provider routing, and HIPAA/covered-entity review where applicable.
- AI companion-style features must disclose AI involvement, avoid diagnosis, provide crisis escalation, log safety events separately, and preserve opt-in and deletion/export rules.
- Subscription and benefits must support free, trial, paid, expired, refunded, employer-sponsored, unavailable, restore-pending, and benefit-ended states.
- Settings must expose reminders, subscription/benefit status, care privacy, content downloads, support, terms, privacy policy, data access/export, deletion, and crisis resources.

### Manual Verification Required

- native iOS/Android screen capture, account signup/login, goal onboarding, meditation playback, sleepcasts, downloads/offline if available, reminders, subscription checkout/cancellation, employer benefit eligibility, coaching/therapy scheduling, AI companion behavior, crisis/safety routing, notifications, data export/deletion, support escalation, and regional content availability.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default Headspace-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, signup, login, benefit routing | email, SSO, benefit code | guest, new, returning | auth fail, benefit unavailable, offline |
| Wellness Setup | Goals, stress/sleep context, reminders | goal, mood, schedule | complete, skipped | crisis signal, underage, unsupported region |
| Today/Home | Daily recommendation and resume state | session tap, favorite, search | personalized, empty, stale | offline, entitlement conflict |
| Library/Search | Browse meditation, sleep, movement, courses | query, filters, category | results, no-results | licensed content unavailable |
| Session Player | Meditation/sleep playback | play, pause, timer, download | not-started, active, complete | audio fail, expired download |
| Sleep | Sleepcasts, soundscapes, bedtime routines | category, timer, favorite | library, playing | content gate, offline missing |
| Coaching/Therapy Eligibility | Benefit and provider access | eligibility, schedule, consent | eligible, ineligible, waitlisted | provider unavailable, crisis redirect |
| AI Companion | Opt-in reflective support | prompt, consent, feedback | available, opted-out | safety escalation, unsupported locale |
| Reminders/Progress | Streaks, check-ins, history | toggle, schedule, check-in | active, paused | notification denied, clock skew |
| Subscription/Benefits | Trial, paid, employer coverage | checkout, restore, link | free, trial, paid, sponsored | refund, benefit ended, store pending |
| Settings/Privacy/Support | Account, data rights, help | export, delete, case | loaded, exporting, deleting | care retention, identity verification |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `MemberProfile`: app-specific memberprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `GoalPreference`: app-specific goalpreference state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `ContentItem`: app-specific contentitem state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Course`: app-specific course state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SessionPlayback`: app-specific sessionplayback state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SleepProgram`: app-specific sleepprogram state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DownloadAsset`: app-specific downloadasset state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `CheckIn`: app-specific checkin state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Reminder`: app-specific reminder state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `BenefitEligibility`: app-specific benefiteligibility state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `CareProviderSession`: app-specific careprovidersession state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `AICompanionExchange`: app-specific aicompanionexchange state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SubscriptionEntitlement`: plan, provider, trial, renewal, expiration, refund, feature flags, and server verification status.
- `SupportCase`: user, category, target object, evidence, privacy redaction, status, owner, and resolution metadata.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso`, `POST /auth/recover`, `DELETE /auth/session`: account and benefit auth with locale, age, and deletion state.
- `PATCH /member/profile`, `GET /home`, `GET /recommendations`: goals, personalization, daily content, and cache hints.
- `GET /library`, `GET /content/:id`, `GET /courses/:id`: content catalog, licensing metadata, transcripts, download eligibility, and entitlement gates.
- `POST /playback/start`, `PATCH /playback/:id`, `POST /favorites`: playback state, completion, favorites, and idempotency.
- `GET /downloads/:id/license`, `POST /downloads/:id/complete`: offline content rights, expiry, and device binding where scoped.
- `POST /check-ins`, `GET /progress`, `PATCH /reminders`: mood check-ins, streaks, reminder schedule, and privacy-safe aggregates.
- `GET /benefits/eligibility`, `POST /benefits/link`: employer or payer benefit routing without exposing session content to sponsors.
- `POST /care/appointments`, `GET /care/appointments/:id`: coaching/therapy scheduling where eligible, with provider privacy state.
- `POST /ai/exchanges`, `POST /safety/escalations`: AI companion input, safety classifier, crisis escalation, and opt-in/out records.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: subscription and sponsored entitlement verification.
- `GET /privacy/settings`, `POST /data-export`, `DELETE /account`, `POST /support/cases`: privacy, deletion, support, and care-retention warnings.

## Realtime, Push, And Offline Behavior

- Cache Today, saved content metadata, downloaded sessions, settings, reminders, and entitlement snapshots with content-license freshness labels.
- Allow downloaded audio playback and local completion drafts offline; block checkout, benefit linking, AI companion, care scheduling, data export, deletion, and support evidence upload.
- Downloaded content must support pending, available, expired, removed, device-limit, disk-full, and license-revoked states.
- Check-ins may be drafted locally but must sync with server time and preserve opt-in consent before personalization or analytics use.
- Push payloads must avoid mental-health details, session titles that reveal sensitive conditions, benefit status, care appointments, or AI prompts.
- Care and crisis surfaces must remain reachable with offline-safe emergency copy and local resource links where legally reviewed.

## Permissions, Privacy, And Safety

- Mental-health claims, crisis handling, coaching/therapy, AI companion, employer benefits, sensitive health data, subscriptions, and minors are launch blockers with named owners.
- Separate general wellness content from medical advice, therapy, psychiatry, diagnosis, and emergency support; route crisis language to reviewed resources.
- Employer or sponsor reports must be aggregate-only and never expose individual session content, care notes, check-ins, or AI prompts.
- AI companion responses require opt-in, disclosure, safety filtering, escalation, retention policy, and human-review boundaries before launch.
- Content licenses must cover audio, voices, scripts, music, sleep stories, and transcripts; do not copy source app content.
- Accessibility must cover audio controls, transcripts/captions where applicable, dynamic type, screen readers, reduced motion, and sleep-mode contrast.

## Analytics And Monetization

- Track privacy-safe events: onboarding_goal_selected, session_started, session_completed, sleep_content_played, check_in_submitted, reminder_set, benefit_link_started, care_eligibility_checked.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- crisis-risk text
- benefit eligibility changes
- expired downloaded audio
- subscription restore conflict
- offline session completion
- AI companion opt-out
- care note retention
- deleted account with active subscription

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
- Manual verification tests for native iOS/Android screen capture, account signup/login, goal onboarding, meditation playback, sleepcasts, downloads/offline if available, reminders, subscription checkout/cancellation, employer benefit eligibility, coaching/therapy scheduling, AI companion behavior, crisis/safety routing, notifications, data export/deletion, support escalation, and regional content availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing marks, illustrations, voices, meditations, sleepcasts, therapy content, coach/clinician workflows, Ebb-like AI behavior, playlists, scripts, clinical materials, pricing, and benefit copy.
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

- Phase 1: app shell, auth, goal setup, Today, library/search, session player, settings, and privacy-safe analytics.
- Phase 2: sleep content, downloads/offline licensing, reminders, progress history, favorites, and accessibility playback tests.
- Phase 3: subscription checkout/restore, benefit eligibility, sponsored entitlement states, support, and billing tests.
- Phase 4: coaching/therapy eligibility placeholder, provider scheduling contracts, confidentiality copy, and care privacy review.
- Phase 5: AI companion prototype behind feature flag, safety escalation, crisis resources, retention controls, and red-team tests.
- Phase 6: legal/provider review for licensed content, mental-health claims, care workflows, AI, accessibility, regions, and platform APIs.

## Next Steps

- Resolve Headspace manual verification blockers before claiming one-for-one native, care, subscription, or AI companion parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
