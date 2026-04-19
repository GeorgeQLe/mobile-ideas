# Quizlet-Style Clone Spec

> Metadata
> - Inspiration app: Quizlet
> - Category: education, flashcards, study sets, learn/test modes, matching games, classes, folders, AI study tools, subscriptions, user-generated content, and academic integrity
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Quizlet Help Center, Quizlet privacy policy, terms, honor code, subscription/product references, and public support pages.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, set creation/import, scan/OCR flows, Magic Notes or AI study tools, Learn/Test/Match behavior, answer grading, class/folder behavior, teacher visibility, subscription entitlements, ads, offline/cache behavior, push/email notifications, content reports, data export/deletion, support escalation, and regional product availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, study sets, explanations, diagrams, textbook content, AI prompts/responses, class data, subscription copy, ranking/recommendation models, and user-generated content.

## Overview

Build an original mobile study app inspired by Quizlet's public workflow: account entry, study set discovery, flashcard set creation/import, Learn/Test/Match-style study modes, saved sets, folders, classes, teacher/student collaboration, AI-assisted study material generation where chosen, subscriptions, settings, support, privacy controls, data export, and account deletion.

The clone must not copy Quizlet branding, screenshots, marketing copy, flashcard sets, diagrams, explanations, textbooks, AI prompt templates, grading rules, private APIs, or community content. Functional parity should use original or user-authored content, licensed source material, synthetic class data, independently designed study algorithms, and explicit academic-integrity controls.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first study product with onboarding, search/discovery, set creation, flashcards, practice modes, tests, saved content, classes/folders, subscriptions, settings, support, privacy, and account controls.
- Support student workflows: create or find a set, study cards, review missed terms, take a test, play a matching mode, save/folder content, join a class, and recover from network or content issues.
- Preserve education trust expectations around minors, classroom privacy, user-generated content, copyright, AI-generated study material, academic integrity, ads, subscriptions, accessibility, data rights, and account safety.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Quizlet-branded app or imply affiliation with Quizlet, publishers, schools, teachers, app stores, AI providers, or textbook licensors.
- Do not copy public or private study sets, textbook explanations, diagrams, OCR training data, AI prompts, answer keys, class rosters, subscription plans, ads, or help copy without explicit rights.
- Do not scrape Quizlet, reuse private APIs, replay network traffic, copy learning/recommendation algorithms, bypass subscription checks, or misrepresent generated content as verified curriculum.
- Do not treat user-generated study content, teacher classes, copyrighted source material, AI tools, scans/imports, or academic integrity as generic features; each needs explicit owner and review before launch.
- Do not claim exact App Store, Play Store, native-device, study mode, class, subscription, content report, deletion/export, support, notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/quizlet-ai-powered-flashcards/id546473125 | Official iOS listing, education category, flashcard/study positioning, AI phrasing where shown, subscription context, privacy labels, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.quizlet.quizletandroid | Official Android listing, package id, education category, ads/in-app purchase disclosure where shown, study modes, and data-safety orientation | Verified 2026-04-19 |
| Quizlet Help Center | https://help.quizlet.com/hc/en-us | Public support taxonomy for accounts, sets, study modes, classes, folders, subscriptions, troubleshooting, and privacy support | Verified 2026-04-19 |
| Quizlet Privacy Policy | https://quizlet.com/privacy | Personal data, children/student data, user content, cookies, ads, analytics, communications, access/deletion, and regional rights | Verified 2026-04-19 |
| Quizlet Terms Of Service | https://quizlet.com/tos | Account, service-use, user content, subscription, acceptable-use, and legal constraints | Verified 2026-04-19 |
| Quizlet Honor Code | https://quizlet.com/honor-code | Academic-integrity posture, misuse review area, and launch-blocking integrity controls | Verified 2026-04-19 |
| Quizlet Product Page | https://quizlet.com/ | Public flashcard, practice, and study product positioning | Verified 2026-04-19 |
| Quizlet Plus | https://quizlet.com/upgrade | Paid plan orientation, subscription gating, and entitlement review context | Verified 2026-04-19 |
| Quizlet For Teachers | https://quizlet.com/features/for-teachers | Teacher/classroom product positioning, class/folder context, and education deployment review | Verified 2026-04-19 |
| Quizlet AI Study Tools | https://quizlet.com/features/ai-study-tools | Public AI study-tool positioning; implementation requires provider, privacy, accuracy, and academic-integrity review | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Quizlet pages position the service as a flashcard and study app with searchable study sets, creation tools, multiple practice modes, classes/folders, subscriptions, and AI-assisted study tools.
- V1 must model signed-out browse, signed-in learner, set creator, class student, teacher, minor, free user, paid subscriber, expired subscriber, ads-supported user, content reporter, restricted/suspended account, and deleted-account states.
- Onboarding must support account creation or sign-in, study goal/topic selection, age/consent gating, optional class join, accessibility preference, notification/email primer, and paid-plan awareness without blocking core free study.
- Discovery must support search, recommendations, subject filters, set preview, creator metadata, content warnings, duplicate set handling, unavailable/removed content, and safe-mode behavior.
- Set creation must support manual cards, imports, scan/OCR where chosen, AI-generated outlines/cards where chosen, terms, definitions, images/diagrams where licensed, language pairs, visibility settings, and draft recovery.
- Study modes must support flashcards, Learn-like adaptive practice, Test-like generated questions, Match-like game, spelling/writing where chosen, answer feedback, missed-term review, progress, and accessible alternatives.
- Classes/folders must support organization, teacher/student membership, set assignment, progress visibility where chosen, roster removal, class privacy, and school/minor review.
- Subscriptions must support free, trial, paid, expired, refunded, unavailable, restore-pending, and feature-locked states; entitlements cannot be trusted from the client alone.
- Settings must expose profile, content visibility, classes, folders, notifications/email, subscription management, privacy, data access/export, account deletion, help, terms, privacy policy, and honor-code guidance.
- Content operations must support copyright/IP reports, inappropriate content reports, answer quality feedback, AI content labeling, moderation status, takedowns, appeals/support, and rollback for bad content.

### Manual Verification Required

- Native iOS and Android navigation, set creation/import/scan, exact flashcard/Learn/Test/Match states, answer grading, class/folder behavior, AI study tools, subscription gates, ads, offline/cache, notifications, data export/delete, content reporting, support flows, and regional differences.
- Teacher visibility, minor account behavior, academic-integrity warnings, and platform-specific billing/cancellation behavior.

## Core User Journeys

- New learner installs the app, signs up, selects study topics, searches for a set, previews cards, saves it, and starts a flashcard session.
- Returning learner resumes a set, studies flashcards, switches to adaptive practice, reviews missed terms, takes a test, and sees progress update.
- Creator builds a study set manually, imports terms, optionally uses scan/OCR or AI tooling, edits cards, selects visibility, and publishes or keeps it private.
- Student joins a class, opens assigned sets, studies them, and understands what activity is visible to a teacher.
- Teacher creates a class, adds sets or folders, invites students, organizes content, reviews allowed progress, and removes a student.
- Subscriber starts a trial, unlocks paid study features or offline/customization where chosen, loses entitlement after cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Content moderator/support user handles a copyright report, inappropriate set report, AI quality issue, or academic-integrity complaint with status and appeal paths.
- Privacy-focused user changes visibility, disables notifications/email, requests data export, deletes account, and sees consequences for sets, classes, reports, and subscription ownership.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, signup, sign-in, signed-out browse | email, social auth, age, legal | guest, new, returning | auth fail, underage, suspended, offline |
| Home | Resume studying, recommendations, classes | set tap, search, class | personalized, signed-out | stale content, empty, offline |
| Search/Discover | Find study sets and subjects | query, filters, safe mode | suggestions, results, no-results | removed set, unsafe content |
| Set Detail | Preview cards, creator, modes, save | save, study, report | public, private, class-only | deleted, blocked, copyright hold |
| Set Editor | Create/import/edit cards | term, definition, image, import | draft, published, private | import fail, OCR mismatch |
| Flashcards | Card review and self-check | flip, know, miss | active, complete | missing media, stale card |
| Learn/Practice | Adaptive study and missed terms | answer, retry, hint | correct, incorrect, due | grading dispute, entitlement locked |
| Test | Generated assessment from set | question, submit, score | draft, submitted, reviewed | duplicate question, stale key |
| Match/Game | Timed matching practice | drag, tap, timer | ready, playing, complete | touch issue, accessibility fallback |
| Classes/Folders | Organize sets and classroom content | join, invite, folder | empty, active, archived | roster removed, privacy hold |
| Subscription | Trial, paid plans, restore purchase | checkout, restore, cancel | free, trial, paid, expired | refund, store sync pending |
| Settings/Privacy/Support | Account, visibility, data rights, help | toggles, export, delete, case | loaded, pending export, deleting | retention hold, support unavailable |

## Data Model

- `User`: identity, age/consent bucket, locale, country, role, preferences, accessibility settings, visibility defaults, deletion/export state, and restrictions.
- `StudyProfile`: active sets, saved sets, folders, classes, study history, recommendations, notification settings, and learning preferences.
- `StudySet`: owner, title, description, subject, language, visibility, source/license metadata, card count, moderation state, class associations, and version.
- `Card`: term, definition, examples, images/diagrams, audio where licensed, language, accepted answers, order, quality flags, and version metadata.
- `ImportJob`: source type, raw file/image/OCR text, parse status, generated cards, quality warnings, and deletion state.
- `AIStudyJob`: source material, prompt context, provider, generated output, confidence/warnings, review state, and academic-integrity label.
- `StudySession`: mode, set version, started/completed timestamps, device/offline state, progress, score, and recovery state.
- `AnswerAttempt`: card, prompt type, answer, correctness, confidence, retry, latency, hint usage, and privacy-safe audit data.
- `TestInstance`: generated questions, set version, score, answer key, review state, retake rules, and export/deletion behavior.
- `Classroom`: teacher, roster, sets/folders, visibility policy, join code, school policy state, archive/removal rules, and export requirements.
- `Folder`: owner, title, ordered sets, class relation, visibility, share state, and unavailable-set handling.
- `SubscriptionEntitlement`: plan, store, trial, renewal, expiration, refund, feature flags, and server verification status.
- `ContentReport`: target set/card/user, reason, evidence, copyright/IP flag, academic-integrity flag, status, resolution, and appeal/support state.
- `PrivacyRequest`: data access/export, deletion, class/content handling, identity verification, status, delivery, and retention notes.
- `AuditEvent`: append-only auth, content creation, class, subscription, report, support, privacy, deletion, and sensitive transitions.
- `LocalCacheRecord`: cached sets/cards/sessions, offline answer queue, draft edits, entitlement snapshot, stale timestamp, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age/consent, device, locale, role, and deletion state.
- `GET /home`, `GET /recommendations`, `PATCH /study-profile`: personalized home, active sets, class content, and study preferences.
- `GET /search`, `GET /sets/:id`, `POST /sets`, `PATCH /sets/:id`, `DELETE /sets/:id`: discovery and set lifecycle with visibility, moderation, version, and licensing metadata.
- `POST /sets/:id/cards`, `PATCH /cards/:id`, `DELETE /cards/:id`: card lifecycle with validation, accepted answers, media/license checks, and versioning.
- `POST /imports`, `GET /imports/:id`, `POST /ai-study-jobs`, `GET /ai-study-jobs/:id`: import/OCR/AI generation jobs with warnings and review state.
- `POST /study-sessions`, `POST /study-sessions/:id/attempts`, `POST /study-sessions/:id/complete`: flashcards, practice, match, and test session lifecycle with idempotency.
- `POST /tests`, `GET /tests/:id`, `POST /tests/:id/submit`: generated assessment lifecycle with scoring, review, retake, and stale-key handling.
- `POST /classes`, `POST /classes/:id/join`, `GET /classes/:id/roster`, `DELETE /classes/:id/students/:studentId`: classroom membership and roster workflows.
- `POST /folders`, `PATCH /folders/:id`, `POST /folders/:id/sets`, `DELETE /folders/:id/sets/:setId`: organization and sharing workflows.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/webhook`, `POST /billing/restore`: subscription verification with server-owned feature state.
- `POST /content-reports`, `GET /content-reports/:id`: copyright, inappropriate content, AI quality, academic-integrity, and abuse reports.
- `GET /notification-preferences`, `PATCH /notification-preferences`: study reminders, class notifications, account, support, and privacy settings.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export/access, deletion, and warning state.
- `POST /support/cases`, `GET /support/cases/:id`: account, billing, content, classroom, privacy, and technical support workflows.

## Realtime, Push, And Offline Behavior

- Clients may cache saved sets, active study sessions, set drafts, class lists, settings, and entitlement snapshots with explicit set-version and freshness labels.
- Offline mode may allow cached set study, flashcards, drafts, and local answer queues when the set version is bundled and no public/classroom write is required.
- Offline mode must block publishing new sets, imports requiring server processing, AI generation, class roster changes, content reports, subscription checkout, account deletion, data export, and support evidence upload.
- Study session sync must be idempotent, preserve mode-specific order/timer state, and mark attempts stale if set/card versions changed while offline.
- Realtime or polling updates must reconcile class membership, set takedowns, report status, entitlement changes, data-export readiness, support cases, and account/deletion status.
- Import/OCR/AI jobs must expose pending, processing, needs-review, completed, failed, canceled, and expired states.
- Push/email notifications must be opt-in and category-controlled for study reminders, class activity, account/security, support, and privacy requests.
- Push payloads must avoid raw card content, class membership, child identifiers, AI source material, answer attempts, and support evidence.

## Permissions, Privacy, And Safety

- Camera, photos/files, microphone/audio if ever added, notifications, and storage must be requested only when the related feature is invoked.
- User-generated content is a launch blocker with copyright/IP, inappropriate content, spam, harassment, academic-integrity, takedown, appeal, and moderation owners.
- AI/OCR/import features must label generated content, require user review before publish, avoid training on private classroom/minor content without approval, and support deletion/export.
- Child/minor and classroom workflows require privacy/legal owners, consent policy, teacher visibility rules, school contract posture, retention, export, deletion, and ads restrictions.
- Academic-integrity controls must explain acceptable study use, support report/appeal paths, avoid unsupported anti-cheating claims, and prevent answer-sharing product copy from implying official exam support.
- Subscription/paywall flows must avoid dark patterns, support store cancellation routes, trial disclosure, refund/expiration states, and server-side verification.
- Ads must respect age, class, privacy choices, sensitive categories, and regional rules; child/classroom ads require separate launch review.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, keyboard/focus order, non-drag alternatives for matching, and accessible card/media content.
- Account deletion/export must warn about sets, classes, folders, reports, AI/import jobs, subscription ownership, support cases, and legal/IP retention.
- Launch owners: content safety owner for UGC/reports; privacy owner for minors/classes/export; AI owner for generated study material; billing owner for subscriptions; accessibility owner for study modes.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, set opened, set saved, set created, import started/completed, AI job started/completed, study session started/completed, test submitted, match completed, class joined, subscription started, content report submitted, export requested, and account deletion requested.
- Every event must use set id, version, subject bucket, mode, result bucket, account state, class flag, entitlement state, locale, and error code rather than raw card content, answers, AI source text, class roster, or child identifiers.
- Learning analytics must separate product telemetry from adaptive study models and provide deletion/export hooks for study history, sets, imports, and class data where required.
- Trust analytics may capture takedown volume, report reasons, AI quality flags, import failures, duplicate sets, and suspicious publishing velocity without exposing private study content.
- Monetization may include original subscriptions, optional school plans, ads for eligible contexts, or licensed content bundles only after legal, privacy, and platform review.
- Any paid feature, AI feature, ads model, publisher content, or school product must disclose pricing, support owner, data sharing, regional availability, and school/privacy obligations before launch.

## Edge Cases

- First launch offline, signed-out user tries to save progress, underage learner without consent, class code invalid, search returns removed sets, or set visibility changes while open.
- Creator imports malformed files, OCR misreads terms, AI generates wrong or unsafe cards, duplicate card names conflict, image license missing, or set is taken down during study.
- Study session continues offline, set version changes before sync, timer/game state is lost after app termination, test answer key changes, or progress appears inconsistent across modes.
- Student joins wrong class, teacher removes student, class set is deleted, school requests data deletion, or teacher visibility rules change.
- Subscription restored from another device, refund webhook arrives late, app store unavailable, ads fail to load, or feature lock conflicts with server entitlement.
- Content report is disputed, copyright notice requires removal, support case includes child/classroom data, export requested during deletion, or legal retention prevents full deletion.

## Test Plan

- Unit tests for set/card validation, import parsing, AI job states, study session mode state, answer grading, test generation, class membership, entitlement gates, content reports, and privacy-safe analytics.
- Contract tests for every documented API route, including pagination, idempotency, validation errors, set versions, visibility, report states, class visibility, entitlement states, and deletion/export states.
- Integration tests for auth, onboarding, Home, search, set detail, set editor, imports, AI jobs, flashcards, Learn/practice, Test, Match, classes/folders, subscription, settings, support, export, and deletion.
- Offline tests for cached sets, queued attempts, draft edits, set-version mismatch, blocked publish/import/AI/class/privacy writes, reconnect reconciliation, timer recovery, and duplicate submission.
- Classroom/minor tests for age gates, class join, teacher roster, set assignment, progress visibility, roster removal, export, deletion, ads restriction, and school policy states.
- Content safety tests for copyright/IP reports, inappropriate content, academic-integrity flags, AI unsafe output, duplicate spam, moderation status, appeals, and support escalation.
- Billing tests for free, trial, paid, expired, refund, restore, unavailable, and store-sync-pending states.
- Accessibility tests for flashcards, answer forms, Match alternatives, dynamic type, screen reader labels, focus order, contrast, reduced motion, and media alternatives.
- Notification tests for opt-in, denied, revoked, quiet hours, study reminders, class activity, account/security, support, and privacy-safe payloads.
- Manual verification tests: native iOS/Android screenshots, set creation/import/scan, AI tools, study modes, grading, classes/folders, subscriptions, ads, offline/cache, reports, export/delete, support, and regional behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Quizlet assets, private APIs, study sets, explanations, diagrams, textbook content, AI prompts, grading algorithms, class data, or brand copy.
- New and returning learners can discover, create, save, organize, and study original sets across flashcards, practice, test, and matching modes with offline recovery where scoped.
- User, study profile, study set, card, import, AI job, study session, answer attempt, test, class, folder, entitlement, content report, support, privacy, and deletion workflows have deterministic data models and API contracts.
- Signed-out, signed-in, creator, classroom student, teacher, minor, free, paid, expired, ads-supported, content-reported, offline, restricted, and deleted-account states are covered by tests.
- Set creation/import, AI tools, study modes, classes/folders, subscriptions, ads, notifications, content reports, export/deletion, and support workflows have explicit blockers where exact native behavior is not verified.
- UGC licensing, academic integrity, minors/classroom privacy, AI/OCR safety, subscriptions, ads, accessibility, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which content types are V1 versus later: manual flashcards, imports, scan/OCR, AI generation, diagrams/images, audio, textbook-like explanations, or teacher-created materials?
- Which study modes are V1 versus later: flashcards, adaptive practice, tests, matching, spelling/writing, team modes, or progress reports?
- Will V1 support minors/classes immediately, or launch self-directed study first until school privacy and moderation workflows are complete?
- Which AI/OCR providers, content moderation systems, copyright workflows, subscription tiers, and ads policies are in launch scope?
- Which regions, languages, accessibility standards, student privacy laws, copyright obligations, and retention policies are launch requirements?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, search, set detail, set editor, flashcards, synthetic seed sets, settings, and privacy-safe analytics.
- Phase 2: add practice, test, matching mode, answer grading, missed-term review, progress, saved sets, folders, and study-mode regression tests.
- Phase 3: add imports/OCR, AI study jobs where chosen, content review labels, content quality reports, and copyright/academic-integrity moderation.
- Phase 4: add classes, teacher roster, set assignment, class progress visibility, child/minor restrictions, and export/deletion handling.
- Phase 5: add subscriptions, restore purchase, entitlement gates, ads where eligible, billing tests, support cases, and accessibility pass.
- Phase 6: add offline set cache, queued sessions, reconnect reconciliation, push/email preferences, and manual native verification.
- Phase 7: complete legal/provider launch review for UGC, AI/OCR, copyright/IP, minors/classrooms, ads, subscriptions, accessibility, regional availability, and platform APIs.

## Next Steps

- Resolve Quizlet manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 implementation-readiness upgrades with `080-coursera.md`.
