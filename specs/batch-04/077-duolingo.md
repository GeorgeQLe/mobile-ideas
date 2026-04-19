# Duolingo-Style Clone Spec

> Metadata
> - Inspiration app: Duolingo
> - Category: education, language learning, gamified lessons, streaks, quests, leaderboards, subscriptions, classrooms, math, music, chess, minors, and learning analytics
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Duolingo Help Center, Duolingo privacy/terms pages, Duolingo Schools privacy references, and public Duolingo product pages.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, placement tests, course switching, lesson exercise variants, speaking/listening permissions, hearts, streak freezes, XP boosts, quests, leagues, friend quests, classroom behavior, child/student accounts, Super/Max entitlement states, family plans, ads, push notifications, data export/deletion, support escalation, and regional/course availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, mascots, lesson content, voices, media, course data, exercise banks, ranking formulas, gamification economy, and learning models.

## Overview

Build an original mobile learning app inspired by Duolingo's public workflow: onboarding, language/course selection, optional placement, daily lesson path, practice, hearts or attempts, streaks, XP, quests, leagues, profile, friends, reminders, classroom participation, subscriptions, settings, support, privacy controls, data export, and account deletion.

The clone must not copy Duolingo branding, mascot characters, screenshots, marketing copy, voices, lesson text, exercise content, course ordering, reward economy, ranking logic, private APIs, or classroom data. Functional parity should use original pedagogy, licensed or internally authored curricula, synthetic learner data, independently designed progression rules, and platform-approved billing.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first gamified learning product with onboarding, course selection, placement, lesson path, practice, progress, social motivation, subscriptions, settings, support, privacy, and account controls.
- Support learner workflows: choose a subject, set a goal, start or place into a course, complete exercises, recover from mistakes, maintain streaks, compete or opt out, and review progress.
- Preserve education trust expectations around minors, classroom use, accessibility, language accuracy, speech/audio capture, paid entitlements, ads, notifications, data rights, and account safety.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Duolingo-branded app or imply affiliation with Duolingo, Duolingo English Test, schools, app stores, language providers, or curriculum licensors.
- Do not copy course content, sentences, audio, translations, characters, XP values, league tiers, quest text, streak economics, paywall copy, placement-test content, or classroom behavior without explicit rights.
- Do not scrape Duolingo, reuse private APIs, replay network traffic, copy ranking/recommendation algorithms, bypass ads, or mimic paid entitlement checks.
- Do not treat learning content, child/student privacy, classroom deployments, speech recognition, ads, subscriptions, or AI tutoring as generic features; each needs explicit owner and review before launch.
- Do not claim exact App Store, Play Store, native-device, course, classroom, subscription, data export/deletion, support, notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/duolingo-language-lessons/id570060128 | Official iOS listing, category, language-learning positioning, streaks, courses, Super-style in-app purchases, ratings, privacy labels, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.duolingo | Official Android listing, package id, education category, ads/in-app purchase disclosure where shown, learning paths, goals, streaks, and data-safety orientation | Verified 2026-04-19 |
| Duolingo Help Center | https://support.duolingo.com/hc/en-us | Public support taxonomy for account, lessons, hearts, streaks, subscriptions, troubleshooting, and classroom-adjacent help | Verified 2026-04-19 |
| Duolingo Terms | https://www.duolingo.com/terms | Account, service-use, content, payment, acceptable-use, and legal constraints | Verified 2026-04-19 |
| Duolingo Privacy Notice | https://www.duolingo.com/privacy | Personal data, children/student data, ads, analytics, communications, access/deletion, and regional privacy controls | Verified 2026-04-19 |
| Duolingo Schools | https://schools.duolingo.com/ | Teacher/classroom product orientation, classroom creation, student assignment, and education deployment context | Verified 2026-04-19 |
| Duolingo Schools Privacy FAQ | https://duolingoschools.zendesk.com/hc/en-us/articles/6830532051085-Is-Duolingo-compliant-with-my-school-or-district-s-privacy-policies | School privacy posture, student-data review area, and launch-blocking classroom privacy requirements | Verified 2026-04-19 |
| Duolingo Product Page | https://www.duolingo.com/ | Public product positioning around language learning, daily practice, courses, and gamified learning | Verified 2026-04-19 |
| Duolingo Blog | https://blog.duolingo.com/ | Public product updates and learning-category context for course/content evolution | Verified 2026-04-19 |
| Duolingo English Test | https://englishtest.duolingo.com/ | Adjacent testing product reference; excluded from V1 unless separately scoped, verified, and legally reviewed | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and official product pages position Duolingo as a daily learning app for languages and adjacent subjects with short lessons, progress, streaks, goals, reminders, and optional paid plans.
- V1 must model signed-out preview, new learner, returning learner, classroom student, teacher-linked learner, child/minor, paid subscriber, expired subscriber, ads-supported user, leaderboard participant, leaderboard opt-out, suspended account, and deleted-account states.
- Onboarding must support subject/course selection, motivation, daily goal, account creation or deferral, optional placement, accessibility preference, notification primer, and minors/classroom gating.
- The lesson path must support units, levels, lessons, practice nodes, review nodes, locked/unlocked progression, skill refresh, mistakes, hearts/attempt limits where chosen, retry, and level-up animations that can be disabled.
- Exercise rendering must support translation, multiple choice, matching, listening, speaking, typing, fill-in-blank, tap-to-compose, hint, explain, skip where allowed, and accessibility alternatives for audio/speech.
- Progress and motivation must support streaks, XP, daily quests, achievements, leaderboards, friend activity, reminders, goal edits, and opt-outs for competitive/social features.
- Subscriptions must support free, trial, paid, expired, family, unavailable, refunded, and platform-sync-pending states; entitlements cannot be trusted from the client alone.
- Classroom tooling must be isolated from consumer social/ads defaults, support teacher-created classes, assignments, learner progress, roster removal, student privacy, and district review.
- Settings must expose profile, course management, reminders, notifications, subscription management, privacy, data access/export, account deletion, classroom links, help, terms, and privacy policy.
- Content operations must support curriculum versioning, localization review, audio asset licensing, exercise quality feedback, correction workflow, and rollback for bad lesson content.

### Manual Verification Required

- Native iOS and Android navigation, onboarding screen order, placement-test behavior, exact exercise states, hearts, streak freezes, XP boosts, daily quests, league mechanics, friends, classroom screens, ads, Super/Max paywalls, family plans, push payloads, data export/delete, and support flows.
- Course availability, regional language options, minors/student behavior, speech recognition, offline/cache behavior, accessibility details, and platform billing edge cases.

## Core User Journeys

- New learner installs the app, chooses a language or subject, selects motivation and daily goal, creates or defers account signup, takes placement or starts at the beginning, and lands on the lesson path.
- Returning learner opens Home, resumes the next lesson, answers mixed exercise types, handles mistakes, completes the lesson, receives XP/progress feedback, and sees the next recommended action.
- Learner runs out of hearts or attempts, reviews mistakes, waits, practices, or sees an entitlement-aware recovery path without dark-pattern copy.
- Competitive learner joins a leaderboard, earns XP, sees rank changes, opts out, blocks/report users where social features exist, and keeps core learning usable without competition.
- Classroom student joins a class, receives an assignment, completes lesson work, and understands which progress is visible to a teacher or school.
- Teacher creates a class, invites students, assigns content, reviews progress, removes a student, exports required records, and handles student privacy support.
- Subscriber starts a trial, unlocks paid practice or explanations, loses entitlement after cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user disables reminders/social ranking, requests data export, deletes account, and sees consequences for streak, progress, classroom records, and subscription ownership.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, sign-in, signup, signed-out preview | email, social auth, age, legal | new, returning, guest | auth fail, underage, suspended, offline |
| Course Picker | Select subject/language and goal | course tap, goal, level | available, recommended | region unavailable, unsupported locale |
| Placement | Place into course or start from zero | answers, skip, retry | not-started, in-progress, placed | abandoned, inconclusive, offline |
| Lesson Path | Daily learning home and progression | lesson tap, practice, quest | locked, unlocked, recommended | stale progress, content rollback |
| Lesson Player | Exercise sequence and feedback | answer, hint, audio, speech | correct, incorrect, retry | no mic, no audio, content dispute |
| Mistakes/Practice | Review weak skills and recover hearts | practice, retry, filter | empty, due, completed | entitlement locked, stale mastery |
| Progress/Profile | Streaks, XP, achievements, history | date, badge, edit profile | active, frozen, private | streak dispute, privacy opt-out |
| Leaderboards/Friends | Optional social motivation | join, follow, block, report | ranked, opt-out, private | abuse, cheating, sync delay |
| Classroom | Student assignment and teacher context | class code, assignment | joined, assigned, submitted | roster removed, school policy block |
| Teacher Dashboard | Class setup and progress review | invite, assign, export | empty, active, archived | student privacy hold, export fail |
| Subscription | Trial, paid plans, restore purchase | checkout, restore, cancel | free, trial, paid, expired | refund, store sync pending |
| Settings/Privacy/Support | Account, reminders, data rights, help | toggles, export, delete, case | loaded, pending export, deleting | retention hold, support unavailable |

## Data Model

- `User`: identity, age/consent bucket, locale, country, preferences, accessibility settings, privacy choices, deletion/export state, and restrictions.
- `LearnerProfile`: active courses, goals, daily target, streak state, XP summary, achievements, social opt-in, classroom memberships, and learning preferences.
- `Course`: subject, source curriculum, locale pair, CEFR or internal level, version, release state, regional availability, and content license.
- `Unit`: ordered course segment with prerequisites, placement boundaries, unlock rules, completion criteria, and version metadata.
- `Lesson`: exercise sequence, objective, skill tags, estimated duration, unlock state, review state, offline eligibility, and content version.
- `Exercise`: prompt type, prompt assets, answer rules, hints, accepted variants, accessibility alternatives, scoring mode, and quality-report state.
- `Attempt`: user answer, correctness, latency, hint usage, audio/speech metadata, retries, offline flag, and privacy-safe audit data.
- `MasteryState`: per-skill strength, due date, mistake history, placement confidence, spaced-repetition schedule, and recalculation source.
- `Streak`: daily activity, freezes, grace state, timezone, dispute state, and notification schedule.
- `QuestAchievement`: quest type, progress, reward, expiry, completion state, and anti-abuse markers.
- `LeaderboardEntry`: cohort, rank, XP bucket, privacy state, opt-out state, report/block state, and season reset.
- `Classroom`: teacher, roster, join codes, assignments, student progress visibility, school policy state, and archive/removal rules.
- `SubscriptionEntitlement`: plan, store, trial, renewal, expiration, refund, family relation, feature flags, and server verification status.
- `ContentQualityReport`: exercise, learner feedback, issue type, severity, triage status, resolution, and rollback reference.
- `PrivacyRequest`: data access/export, deletion, classroom record handling, identity verification, status, delivery, and retention notes.
- `AuditEvent`: append-only auth, progress, classroom, subscription, support, moderation, privacy, deletion, and content-sensitive transitions.
- `LocalCacheRecord`: cached path, lessons, audio, attempts queue, progress snapshot, entitlement snapshot, stale timestamp, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age/consent, device, locale, and deletion state.
- `GET /courses`, `GET /courses/:id`, `POST /learner/courses`: course catalog, availability, placement support, active-course selection, and version metadata.
- `POST /placement/start`, `POST /placement/:id/answers`, `POST /placement/:id/finish`: placement lifecycle with abandonment, confidence, and safe fallback to beginner path.
- `GET /lesson-path`, `GET /lessons/:id`, `POST /lessons/:id/start`, `POST /lesson-attempts`: path, lesson content, attempt submission, scoring, and idempotency keys.
- `GET /mastery`, `POST /practice/session`, `GET /mistakes`: skill strength, due practice, mistake review, and entitlement-aware limits.
- `GET /streak`, `PATCH /goals`, `GET /quests`, `POST /quests/:id/claim`: streak, goal, quest, reward, timezone, and anti-abuse behavior.
- `GET /leaderboards`, `POST /leaderboards/join`, `DELETE /leaderboards/join`, `POST /users/:id/report`: optional competitive/social surfaces with privacy and abuse controls.
- `POST /classrooms/join`, `GET /classrooms/:id/assignments`, `POST /classrooms/:id/assignments`, `GET /classrooms/:id/progress`: student and teacher classroom workflows.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/webhook`, `POST /billing/restore`: subscription verification with server-owned feature state.
- `POST /content-reports`, `GET /content-versions/:id`: learner feedback, content quality triage, curriculum versioning, and rollback.
- `GET /notification-preferences`, `PATCH /notification-preferences`: reminders, streak alerts, classroom notices, subscription notices, and social notifications.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export/access, deletion, and warning state.
- `POST /support/cases`, `GET /support/cases/:id`: account, streak dispute, billing, classroom, content, safety, and privacy support.

## Realtime, Push, And Offline Behavior

- Clients may cache the lesson path, active lessons, audio assets, progress snapshot, settings, and entitlement snapshot with explicit content-version and freshness labels.
- Offline mode may allow already-downloaded lesson attempts, local draft answers, and cached review, then reconcile against server scoring and content version after reconnect.
- Offline mode must block account deletion, data export, classroom roster changes, subscription checkout, public social actions, reports, support evidence upload, and irreversible progress overrides.
- Lesson attempt sync must be idempotent, ordered per lesson session, resilient to duplicate submissions, and able to mark attempts as stale when curriculum versions change.
- Streak and goal updates must use server time with timezone handling, grace/freeze logic, and dispute support rather than device clock alone.
- Realtime or polling updates must reconcile leaderboard rank, quest completion, classroom assignments, entitlement changes, and support/data-export status.
- Push notifications must be opt-in and category-controlled for reminders, streak risk, classroom assignments, subscription/account events, support, and privacy requests.
- Push payloads must avoid sensitive exact course progress, student/classroom details, child data, payment state, support evidence, and raw answer content.

## Permissions, Privacy, And Safety

- Microphone, speech recognition, notifications, camera/photos for classroom evidence if ever added, and files for support evidence must be requested only when the related feature is invoked.
- Child/minor and classroom workflows are launch blockers with named privacy/legal owners, parental/school consent policy, data minimization, retention, export, deletion, and teacher visibility rules.
- Speech/audio processing must disclose recording state, provider, retention, model training use, failure fallback, and accessibility alternatives.
- Learning analytics must avoid exposing raw answer content, child identifiers, classroom membership, exact disability/accommodation settings, and sensitive demographic inference.
- Leaderboards/friends require opt-out, block/report, anti-cheat, harassment controls, private-profile behavior, and child/classroom restrictions.
- Ads must be disabled or specially reviewed for child/classroom contexts and must respect privacy choices, age restrictions, sensitive categories, and regional rules.
- Subscription/paywall flows must avoid dark patterns, support store cancellation routes, trial disclosure, refund/expiration states, family entitlements, and server-side verification.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, color-independent feedback, captions/transcripts, and non-speech alternatives.
- Account deletion/export must warn about progress, streak, classroom records, content reports, subscription ownership, legal retention, and downstream school obligations.
- Launch owners: curriculum owner for lesson content; privacy owner for minors/classrooms/export; safety owner for social/leaderboards; billing owner for subscriptions; accessibility owner for exercise UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, course selected, placement started/completed, lesson started/completed, exercise answered, mistake practiced, streak updated, quest completed, leaderboard joined/left, class joined, assignment completed, paywall viewed, purchase started/completed, export requested, and account deletion requested.
- Every event must use course id, content version, exercise type, result bucket, latency bucket, entitlement state, account state, classroom flag, locale, and error code rather than raw answers, audio, exact child identifiers, or teacher notes.
- Learning analytics must separate product telemetry from pedagogy models and provide deletion/export hooks for learner progress where required.
- Anti-abuse analytics may capture impossible XP velocity, repeated answer spam, suspicious leaderboard jumps, and classroom join-code abuse without exposing private learner content.
- Monetization may include original subscriptions, optional family plans, school plans, ads for eligible adults, or licensed curriculum bundles only after legal, privacy, and platform review.
- Any paid feature must disclose pricing, trial, renewal, cancellation path, support owner, regional availability, data sharing, and student/classroom exclusions before launch.

## Edge Cases

- First launch offline, no account, unsupported locale, course unavailable in region, underage learner without consent, or classroom policy blocks signup.
- Placement test abandoned, placement score ambiguous, learner switches course mid-unit, curriculum version changes during an offline lesson, or answer key is corrected after submission.
- Speech permission denied, mic unavailable, noisy audio, no headphones, hearing-impaired learner, screen reader user, or reduced-motion setting conflicts with gamified feedback.
- Streak crosses timezone, server clock differs from device clock, streak freeze applied late, XP boost expires mid-lesson, quest reward duplicated, or leaderboard season resets during sync.
- Student joins wrong classroom, teacher removes student, assignment is deleted after completion, school requests data deletion, or parent/student account ownership changes.
- Subscription restored from another device, refund webhook arrives late, family member loses access, app store is unavailable, or paywall state conflicts with server entitlement.
- Push reminder arrives after goal completion, ad fails to load, support case includes child data, data export is requested during account deletion, or legal retention prevents full deletion.

## Test Plan

- Unit tests for course/lesson unlock rules, placement scoring, exercise validation, mastery updates, streak timezone logic, quest rewards, leaderboard opt-out, entitlement gates, and privacy-safe analytics.
- Contract tests for every documented API route, including pagination, idempotency, validation errors, stale content versions, classroom visibility, entitlement states, and deletion/export states.
- Integration tests for auth, course picker, placement, lesson path, lesson player, mistakes/practice, progress/profile, leaderboards, classroom join, teacher assignments, subscription, settings, support, export, and deletion.
- Offline tests for cached lessons, queued attempts, curriculum-version mismatch, corrupt audio cache, blocked social/billing/privacy writes, reconnect reconciliation, and duplicate submission.
- Classroom/minor tests for age gates, teacher roster, assignment completion, student progress visibility, ads/social restrictions, export, deletion, and school policy states.
- Billing tests for free, trial, paid, expired, refund, restore, family, unavailable, and store-sync-pending states.
- Safety tests for reports, blocking, anti-cheat, spam, classroom join-code abuse, content quality reports, and support escalation.
- Accessibility tests for exercise alternatives, audio/speech fallback, screen reader labels, focus order, color-independent correctness, dynamic type, reduced motion, and error recovery.
- Notification tests for opt-in, denied, revoked, quiet hours, streak risk, classroom assignment, subscription/account events, and privacy-safe payloads.
- Manual verification tests: native iOS/Android screenshots, onboarding, placement, exercise variants, hearts, streaks, quests, leagues, friends, classroom, Super/Max, ads, push, export/delete, support, and regional/course behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Duolingo assets, private APIs, course content, voices, ranking formulas, mascot/trade dress, lesson banks, school records, or paywall copy.
- New and returning learners can select a course, place or start, complete lessons, review mistakes, track progress, handle offline recovery, manage reminders, and use settings with original licensed content.
- User, learner profile, course, unit, lesson, exercise, attempt, mastery, streak, quest, leaderboard, classroom, entitlement, content report, support, privacy, and deletion workflows have deterministic data models and API contracts.
- Signed-out, signed-in, classroom student, teacher, minor, paid subscriber, expired subscriber, ads-supported, leaderboard opt-out, offline, content-stale, suspended, and deleted-account states are covered by tests.
- Placement tests, exercise variants, hearts, streaks, quests, leaderboards, classroom, subscription, ads, notifications, export/deletion, and support workflows have explicit blockers where exact native behavior is not verified.
- Curriculum licensing, minors/classroom privacy, speech/audio processing, subscriptions, ads, accessibility, social safety, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which languages, subjects, levels, curriculum providers, voice/audio providers, speech-recognition providers, and localization review workflows will back the original clone?
- Which gamification features are V1 versus later: hearts, streak freezes, quests, XP boosts, leagues, friends, achievements, classroom assignments, or teacher dashboards?
- Will V1 support minors/classrooms immediately, or launch consumer-only until education privacy, consent, and school contracts are complete?
- Which subscription tiers, family plans, ads policy, app-store billing flows, cancellation routes, and regional offers are in scope?
- Which regions, languages, accessibility standards, student privacy laws, advertising rules, and data retention obligations are launch requirements?

## Build Plan

- Phase 1: scaffold app shell, auth, course picker, goal setup, lesson path, lesson player, synthetic curriculum seed data, settings, and privacy-safe analytics.
- Phase 2: add placement, exercise variants, mastery/practice, mistakes, progress/profile, offline lesson cache, and curriculum versioning tests.
- Phase 3: add streaks, quests, achievements, reminders, notification preferences, accessibility alternatives, and reduced-motion handling.
- Phase 4: add optional leaderboards/friends, report/block, anti-cheat, privacy opt-outs, and social safety regression tests.
- Phase 5: add subscriptions, restore purchase, entitlement gates, family-like relations where chosen, paywall tests, and support cases.
- Phase 6: add classroom student/teacher flows, roster/assignment/progress visibility, export/deletion handling, and minors/school privacy review.
- Phase 7: complete legal/provider launch review for curriculum, audio/speech, minors/classrooms, ads, subscriptions, accessibility, regional availability, and platform APIs.

## Next Steps

- Resolve Duolingo manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 implementation-readiness upgrades with `078-khan-academy.md`, `079-quizlet.md`, and `080-coursera.md`.
