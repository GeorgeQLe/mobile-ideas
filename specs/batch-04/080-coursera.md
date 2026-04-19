# Coursera-Style Clone Spec

> Metadata
> - Inspiration app: Coursera
> - Category: education marketplace, online courses, degrees/certificates, video lessons, quizzes, assignments, deadlines, subscriptions, enterprise learning, and credentials
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Coursera learner help center, Coursera privacy notice, terms, refund/subscription/product references, and public Coursera product pages.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, course enrollment, audit/free trial flows, subscription checkout/cancellation, video playback, downloads/offline behavior, quizzes, peer assignments, grades, deadlines, certificates, financial-aid paths, degree/professional-certificate flows, enterprise account behavior, notifications, data export/deletion, support escalation, and regional catalog availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, partner/university names, course catalogs, videos, assignments, quizzes, certificates, grading rubrics, credentials, subscription copy, learner data, and marketplace ranking logic.

## Overview

Build an original mobile learning marketplace inspired by Coursera's public workflow: browse courses, enroll, watch videos, complete modules, take quizzes, submit assignments, track deadlines and grades, earn original certificates or credentials where approved, manage subscriptions/payments, use downloads/offline where scoped, contact support, manage privacy controls, export data, and delete an account.

The clone must not copy Coursera branding, screenshots, marketing copy, university/partner catalogs, videos, quizzes, assignments, credentials, certificate templates, grading rubrics, private APIs, or learner reviews. Functional parity should use original or licensed course content, approved credential issuers, synthetic learner data, independently designed marketplace/ranking rules, and platform-approved billing.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first online learning marketplace with onboarding, catalog search, course detail, enrollment, modules, video lessons, quizzes/assignments, deadlines, grades, certificates, subscriptions, settings, support, privacy, and account controls.
- Support learner workflows: find a course, enroll or audit where allowed, learn by module, download content where scoped, complete assessments, manage deadlines, earn credentials, and recover from billing or progress issues.
- Preserve education marketplace trust expectations around licensed content, credentials, assessment integrity, peer review, refunds, subscriptions, enterprise learning, accessibility, data rights, and regional availability.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Coursera-branded app or imply affiliation with Coursera, universities, instructors, employers, app stores, credential issuers, or payment providers.
- Do not copy course catalogs, partner names/logos, lectures, quizzes, assignments, rubrics, certificates, reviews, rankings, pricing, subscription plans, or help copy without explicit rights.
- Do not scrape Coursera, reuse private APIs, replay network traffic, copy marketplace/recommendation algorithms, bypass paid gates, or mint credentials without approved issuers.
- Do not treat certificates, degrees, paid subscriptions, peer assessment, financial aid, enterprise learning, or academic integrity as generic features; each needs explicit owner and review before launch.
- Do not claim exact App Store, Play Store, native-device, course, enrollment, assessment, credential, subscription, deletion/export, support, notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/coursera-learn-career-skills/id736535961 | Official iOS listing, education category, course/skills positioning, certificates/subscriptions where shown, privacy labels, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=org.coursera.android | Official Android listing, package id, education category, in-app purchase disclosure where shown, course learning positioning, and data-safety orientation | Verified 2026-04-19 |
| Coursera Learner Help Center | https://www.coursera.support/s/learner-help-center | Public support entry for learner accounts, courses, payments, certificates, troubleshooting, and privacy support | Verified 2026-04-19 |
| Coursera Privacy Notice | https://www.coursera.org/about/privacy | Personal data, learner data, enterprise/partners, cookies, analytics, communications, access/deletion, and regional privacy controls | Verified 2026-04-19 |
| Coursera Terms Of Use | https://www.coursera.org/about/terms | Account, service-use, content, payments, certificates, acceptable-use, and legal constraints | Verified 2026-04-19 |
| Coursera Catalog | https://www.coursera.org/courses | Public course marketplace, catalog search, partner/course metadata, and enrollment context | Verified 2026-04-19 |
| Coursera Plus | https://www.coursera.org/courseraplus | Subscription product orientation and entitlement review context | Verified 2026-04-19 |
| Coursera Certificates | https://www.coursera.org/career-academy/ | Public career credential/certificate positioning; credential issuance requires separate provider/legal review | Verified 2026-04-19 |
| Coursera For Business | https://www.coursera.org/business/ | Enterprise learning context, admin/organization review area, and launch-blocking B2B privacy/support requirements | Verified 2026-04-19 |
| Coursera Campus | https://www.coursera.org/campus/ | Campus/institution deployment context; excluded from V1 unless separately scoped, verified, and legally reviewed | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Coursera product pages position the service as a course marketplace for career skills, videos, quizzes, certificates, subscriptions, and partner-backed learning.
- V1 must model signed-out browse, signed-in learner, enrolled learner, audit/free learner where chosen, paid subscriber, expired subscriber, certificate candidate, enterprise learner, restricted/suspended account, and deleted-account states.
- Onboarding must support account creation/sign-in, learning goals, topic/career interests, locale, accessibility preference, optional enterprise/institution link, notification/email preference, and paid-plan awareness without dark patterns.
- Catalog must support search, topic filters, provider/instructor metadata where licensed, level, duration, language, subtitles, credential type, price/entitlement state, ratings/reviews if licensed, and regional/unavailable states.
- Course detail must support syllabus, modules, videos, readings, quizzes, assignments, deadlines, credential outcome, enrollment/audit/checkout entry points, support owner, and refund/financial-aid blockers where scoped.
- Learning player must support module sequence, video playback, captions/transcripts, readings, downloads/offline where scoped, progress markers, quizzes, assignments, grades, and deadline reminders.
- Assessment workflows must support quiz attempts, assignment uploads, peer review where chosen, grading states, retakes, late work, plagiarism/academic-integrity checks, and certificate eligibility.
- Credential workflows must support certificate/credential issuance, verification links, revocation, name changes, sharing, export/download, and legal/provider approval before launch.
- Subscriptions/payments must support free, trial, paid, expired, canceled, refunded, unavailable, restore-pending, financial-aid or sponsored states where chosen, and server-verified entitlement state.
- Settings must expose profile, learning preferences, subscriptions/payments, enterprise link, notifications/email, privacy, data access/export, account deletion, help, terms, and privacy policy.

### Manual Verification Required

- Native iOS and Android navigation, account creation, catalog/search, enrollment, audit/free trial flows, subscription checkout/cancellation, course player, downloads/offline, quizzes, assignments, grades, certificates, enterprise accounts, notifications, data export/delete, support flows, and regional differences.
- Exact refund, financial-aid, credential issuance, peer review, deadline, grade, and app-store billing behavior.

## Core User Journeys

- New learner installs the app, creates or signs into an account, selects career/topic interests, searches the catalog, opens course detail, and enrolls or saves the course.
- Returning learner opens an enrolled course, resumes a module video, reads transcript/captions, completes a quiz, sees grade/progress update, and schedules the next deadline.
- Learner downloads a video or reading where allowed, studies offline, completes allowed local actions, reconnects, and resolves progress sync conflicts.
- Subscriber starts a trial or paid plan, unlocks eligible courses, cancels or expires, and sees consistent entitlement and certificate eligibility state across devices.
- Certificate candidate completes required modules/assessments, receives original credential eligibility, downloads or shares a certificate, and handles name-change or revocation cases.
- Assignment learner submits work, receives grading or peer review, revises where allowed, handles late submission, and understands academic-integrity consequences.
- Enterprise learner signs in through an organization context, sees assigned learning, completes required coursework, and understands employer/admin visibility.
- Privacy-focused user changes notifications/email, requests data export, deletes account, and sees consequences for enrollments, certificates, grades, support cases, and payment records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, signup, sign-in, signed-out browse | email, SSO, legal | guest, new, returning | auth fail, SSO fail, suspended, offline |
| Learner Setup | Goals, topics, locale, org link | topic, career, org code | complete, skipped | org unavailable, invalid code |
| Home | Resume courses and recommendations | course tap, reminder, save | personalized, signed-out | stale progress, empty, offline |
| Catalog/Search | Find courses and credentials | query, filters, sort | suggestions, results, no-results | unavailable course, stale price |
| Course Detail | Syllabus, provider, enrollment, credential | enroll, save, checkout | open, enrolled, locked | regional block, entitlement conflict |
| Course Player | Module sequence and content | video, reading, quiz, assignment | not-started, active, complete | blocked media, missing captions |
| Quiz | Assessment attempts and scoring | answers, submit, retake | draft, submitted, graded | stale answer key, attempt limit |
| Assignment/Peer Review | Upload, rubric, review, grade | file, text, rubric | draft, submitted, reviewed | plagiarism hold, late state |
| Grades/Progress | Course progress and deadline tracking | module, grade, deadline | active, passed, failed | recalculation, grace period |
| Certificates | Credential eligibility and sharing | name, download, share | eligible, issued, revoked | name mismatch, provider hold |
| Subscription/Payments | Trial, paid plans, restore/cancel | checkout, restore, cancel | free, trial, paid, expired | refund, store sync pending |
| Settings/Privacy/Support | Account, notifications, data rights, help | toggles, export, delete, case | loaded, pending export, deleting | retention hold, support unavailable |

## Data Model

- `User`: identity, locale, country, role, SSO/enterprise link, preferences, accessibility settings, privacy choices, deletion/export state, and restrictions.
- `LearnerProfile`: goals, topics, active courses, saved courses, progress summary, credentials, notifications, organization memberships, and learning preferences.
- `OrganizationMembership`: enterprise/campus sponsor, role, assigned learning, admin visibility, policy state, and removal rules.
- `Course`: provider, title, description, level, language, duration, modules, credential type, price/entitlement state, regional availability, and content license.
- `Module`: course, sequence, lessons, quizzes, assignments, deadline, completion criteria, and version metadata.
- `Lesson`: video/reading object, transcript/caption metadata, estimated duration, download eligibility, progress marker, and content version.
- `Assessment`: quiz or assignment, prompt, answer rules, rubric, attempt limits, due date, integrity policy, grading state, and version metadata.
- `AssessmentAttempt`: learner, assessment, answers/files, score, feedback, late flag, plagiarism/integrity state, retry state, and audit data.
- `PeerReview`: reviewer, target attempt, rubric scores, feedback, conflict/dispute state, and privacy constraints.
- `Enrollment`: user, course, status, entitlement, deadlines, progress, grade, certificate eligibility, refund window, and completion state.
- `Certificate`: learner, course/credential, issuer, display name, issue date, verification URL, revocation state, share/export state, and legal metadata.
- `SubscriptionEntitlement`: plan, store, trial, renewal, expiration, refund, financial-aid/sponsor relation, feature flags, and server verification status.
- `SupportCase`: user, course/enrollment/payment/certificate target, category, evidence, status, owner, and privacy redaction state.
- `PrivacyRequest`: data access/export, deletion, credential/payment retention, identity verification, status, delivery, and retention notes.
- `AuditEvent`: append-only auth, enrollment, assessment, grade, credential, billing, support, privacy, deletion, and sensitive transitions.
- `LocalCacheRecord`: cached catalog/course/lesson, downloaded media, offline progress queue, entitlement snapshot, stale timestamp, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `POST /auth/sso`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with device, locale, SSO, role, and deletion state.
- `GET /home`, `GET /recommendations`, `PATCH /learner/profile`: personalized home, goals, saved courses, active enrollments, and organization context.
- `GET /catalog`, `GET /courses/:id`, `GET /courses/:id/modules`: catalog, course detail, syllabus, pricing/entitlement, availability, and cache hints.
- `POST /enrollments`, `GET /enrollments`, `PATCH /enrollments/:id`: enrollment lifecycle, audit/free/paid state, deadlines, progress, and refund/sponsor metadata.
- `GET /lessons/:id`, `GET /lessons/:id/media`, `POST /lessons/:id/progress`: video/reading content, captions/transcripts, downloads, completion, and idempotency.
- `POST /assessments/:id/attempts`, `GET /assessments/:id/attempts/:attemptId`, `POST /attempts/:id/submit`: quiz/assignment attempt lifecycle with validation and late/integrity states.
- `POST /peer-reviews`, `GET /peer-reviews/:id`: peer grading, rubric feedback, conflict/dispute, and privacy constraints where scoped.
- `GET /grades`, `GET /deadlines`, `POST /deadlines/:id/reset`: grade/progress/deadline state with grace and recalculation behavior.
- `GET /certificates`, `POST /certificates/:id/share`, `POST /certificates/:id/name-change`: certificate issuance, verification, sharing, and revocation state.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/webhook`, `POST /billing/restore`: subscription/payment verification with server-owned feature state.
- `GET /notification-preferences`, `PATCH /notification-preferences`: learning reminders, deadlines, grades, payments, certificates, account, support, and privacy settings.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export/access, deletion, and warning state.
- `POST /support/cases`, `GET /support/cases/:id`: course, payment, certificate, assessment, enterprise, privacy, and technical support workflows.

## Realtime, Push, And Offline Behavior

- Clients may cache Home, catalog slices, course detail, lessons, videos/readings, deadlines, settings, and entitlement snapshots with explicit content-version and freshness labels.
- Offline mode may allow downloaded video/reading viewing and local progress markers for content already authorized to the learner.
- Offline mode must block enrollment, checkout, subscription changes, quiz/assignment final submission, peer review submission, certificate issuance, account deletion, data export, and support evidence upload.
- Progress sync must be idempotent, preserve module/lesson ordering, and mark local progress stale if course or lesson versions changed while offline.
- Assessment attempts must preserve drafts but require server validation before grading, certificate eligibility, or public/peer submission.
- Realtime or polling updates must reconcile grades, deadlines, peer reviews, certificate readiness, entitlement changes, refunds, enterprise assignments, data-export readiness, support cases, and account/deletion status.
- Downloads/offline content must support pending, downloaded, expired, removed, disk-full, provider-error, and content-updated states.
- Push/email notifications must be opt-in and category-controlled for learning reminders, deadlines, grades, certificates, payment/account events, support, and privacy requests.
- Push payloads must avoid exact grades, assignment content, certificate identifiers, payment state, enterprise membership, support evidence, and sensitive learning accommodations.

## Permissions, Privacy, And Safety

- Notifications, files/photos for assignment or support upload, camera if scan/upload is added, and storage/download access where platform-relevant must be requested only when the related feature is invoked.
- Licensed course content, partner/provider metadata, certificate issuance, and credential verification are launch blockers with legal/content owners and revocation/support policy.
- Assessment integrity must support attempt limits, late rules, plagiarism/integrity checks where scoped, honor-code policy, appeals, and no unsupported academic-credit claims.
- Peer review must minimize exposed learner data, handle harassment/abuse, support dispute paths, and avoid exposing private files beyond review scope.
- Enterprise/campus workflows require privacy/legal owners, admin visibility disclosures, sponsor/payment ownership, data-sharing controls, retention, export, deletion, and account unlinking.
- Subscription/payment flows must avoid dark patterns, support store cancellation routes, refund/expiration states, financial-aid/sponsor states where chosen, and server-side verification.
- Learning analytics must avoid raw assignment text/files, exact grades in generic analytics, enterprise membership leakage, payment details, and sensitive demographic inference.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, captions/transcripts, keyboard/focus order, reduced motion, and assessment-form alternatives.
- Account deletion/export must warn about enrollments, grades, certificates, assessment submissions, peer reviews, enterprise records, payment records, support cases, and legal/provider retention.
- Launch owners: content/legal owner for courses/credentials; privacy owner for enterprise/export; integrity owner for assessments; billing owner for subscriptions/refunds; accessibility owner for video/assessment UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, catalog searched, course opened, enrollment started/completed, lesson opened, video played, download started/completed, quiz submitted, assignment submitted, grade viewed, certificate issued, subscription started/canceled, support case opened, export requested, and account deletion requested.
- Every event must use course id, module id, content version, credential type, entitlement state, organization flag, result bucket, latency bucket, locale, and error code rather than raw answers, assignment files, exact grades, payment credentials, enterprise membership details, or support evidence.
- Learning analytics must separate product telemetry from grading/certificate eligibility and provide deletion/export hooks for progress, attempts, peer reviews, and credentials where required.
- Marketplace analytics may capture course discovery, availability, stale pricing, provider latency, and completion funnels without copying partner ranking logic or exposing private learner work.
- Monetization may include original subscriptions, one-off course purchases, sponsor/enterprise plans, certificate fees, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid course, subscription, certificate, financial-aid-like program, enterprise plan, or partner credential must disclose pricing, refund/cancellation path, support owner, data sharing, regional availability, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported locale, signed-out learner tries to enroll, course unavailable in region, enterprise SSO fails, or catalog price/entitlement state is stale.
- Video provider fails, captions missing, download expires, disk full, course content changes mid-module, lesson is retired, or transcript/version mismatch occurs.
- Quiz submission duplicates, answer key changes, assignment upload fails, file type unsupported, deadline passes during offline work, or grade is recalculated.
- Peer reviewer is abusive, peer review is incomplete, integrity/plagiarism hold blocks certificate, learner appeals a grade, or certificate name is wrong.
- Subscription restored from another device, refund webhook arrives late, financial-aid/sponsor state conflicts with store entitlement, or cancellation path differs by platform.
- Enterprise learner leaves organization, admin assignment changes, employer visibility is disputed, data export requested during deletion, or legal/provider retention prevents full deletion.
- Push/email arrives after deadline reset, support case includes assessment files, certificate verification link expires, or regional laws require different privacy notices.

## Test Plan

- Unit tests for catalog filtering, enrollment state, entitlement gates, lesson progress, download state, quiz scoring, assignment status, deadline logic, grade state, certificate eligibility, and privacy-safe analytics.
- Contract tests for every documented API route, including pagination, idempotency, validation errors, content versions, entitlement states, attempt states, certificate states, refund states, and deletion/export states.
- Integration tests for auth, learner setup, Home, catalog search, course detail, enrollment, course player, video/reading, downloads, quizzes, assignments, peer review, grades/progress, certificates, payments, settings, support, export, and deletion.
- Offline tests for cached catalog/course, downloaded media, local progress queue, blocked enrollment/billing/assessment/privacy writes, content-version mismatch, corrupt cache, disk full, reconnect reconciliation, and duplicate progress.
- Assessment/integrity tests for quiz attempts, retakes, late work, assignment upload, peer review, plagiarism/integrity hold, grade recalculation, appeals, and certificate eligibility.
- Enterprise/privacy tests for SSO, assigned learning, admin visibility, organization removal, sponsor entitlement, export, deletion, and data-sharing controls.
- Billing tests for free, trial, paid, canceled, expired, refund, restore, financial-aid/sponsored, unavailable, and store-sync-pending states.
- Accessibility tests for captions, transcripts, video controls, assessment forms, dynamic type, screen reader labels, focus order, contrast, reduced motion, and file upload errors.
- Notification tests for opt-in, denied, revoked, quiet hours, deadlines, grades, certificates, payment/account events, support, and privacy-safe payloads.
- Manual verification tests: native iOS/Android screenshots, signup, catalog, enrollment, subscription, video, downloads/offline, quizzes, assignments, grades, certificates, enterprise, notifications, export/delete, support, and regional behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Coursera assets, private APIs, partner catalogs, videos, quizzes, assignments, credentials, certificates, grading rubrics, pricing, reviews, or brand copy.
- New and returning learners can discover courses, enroll, watch lessons, complete scoped assessments, track deadlines/grades, manage paid entitlements, and use settings with original or licensed content.
- User, learner, organization, course, module, lesson, assessment, attempt, peer review, enrollment, certificate, entitlement, support, privacy, and deletion workflows have deterministic data models and API contracts.
- Signed-out, signed-in, enrolled, audit/free, paid, expired, certificate candidate, enterprise, offline, content-stale, restricted, and deleted-account states are covered by tests.
- Enrollment, subscriptions, downloads/offline, quizzes, assignments, grades, certificates, enterprise, notifications, export/deletion, and support workflows have explicit blockers where exact native behavior is not verified.
- Licensed content, credential issuance, assessment integrity, enterprise privacy, subscriptions/refunds, accessibility, data rights, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which course subjects, instructors/providers, video platforms, assessment models, credential issuers, certificate templates, and content licenses will back the original clone?
- Which features are V1 versus later: audit mode, subscriptions, one-off purchases, certificates, peer review, financial aid, enterprise learning, or degrees/professional credentials?
- Will V1 issue real credentials, or start with internal completion records until provider/legal approval is complete?
- Which payment/refund model, app-store billing behavior, cancellation path, financial-aid/sponsor state, and enterprise entitlement model are in scope?
- Which regions, languages, accessibility standards, credential laws, student privacy obligations, tax/payment rules, and retention policies are launch requirements?

## Build Plan

- Phase 1: scaffold app shell, auth, learner setup, Home, catalog/search, course detail, enrollment, synthetic course seed data, settings, and privacy-safe analytics.
- Phase 2: add course player, video/readings, captions/transcripts, progress tracking, deadlines, downloads/offline cache, and content-version tests.
- Phase 3: add quizzes, assignments, grade/progress views, integrity states, appeal/support hooks, and assessment regression tests.
- Phase 4: add subscriptions/payments, restore purchase, entitlement gates, refund/expiration states, support cases, and billing tests.
- Phase 5: add certificates/credentials, verification links, name changes, revocation states, sharing/export, and credential legal/provider review.
- Phase 6: add enterprise/campus-like organization context where chosen, assigned learning, admin visibility disclosures, export/deletion handling, and privacy review.
- Phase 7: complete legal/provider launch review for course content, credentials, assessments, peer review, enterprise, payments/refunds, accessibility, regional availability, and platform APIs.

## Next Steps

- Resolve Coursera manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with Batch 05 education, wellness, fitness, and health specs: `081-photomath.md`, `082-headspace.md`, `083-calm.md`, `084-strava.md`, `085-nike-run-club.md`, `086-myfitnesspal.md`, `087-fitbit.md`, and `088-flo.md`.
