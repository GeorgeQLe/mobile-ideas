# Khan Academy-Style Clone Spec

> Metadata
> - Inspiration app: Khan Academy
> - Category: education, course catalog, video lessons, practice, mastery, assignments, teacher tools, parent/child accounts, accessibility, and nonprofit learning
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Khan Academy Help Center articles, Khan Academy privacy policy, terms, teacher/student support references, and public product pages.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, learner profile creation, official app navigation, course catalog behavior, video playback, exercise attempts, mastery calculation, bookmarks, downloads/offline behavior, classroom roster/assignment flows, parent/child accounts, teacher reports, push/email notifications, data export/deletion, support escalation, and regional content availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, lesson videos, exercise content, curriculum sequences, mastery algorithms, teacher reports, translations, sample data, and learning analytics.

## Overview

Build an original mobile learning app inspired by Khan Academy's public workflow: browse courses, watch lessons, practice skills, track mastery, save content, manage learner profile, join a class or teacher context, receive assignments, review progress, use settings, contact support, manage privacy controls, export data, and delete an account.

The clone must not copy Khan Academy branding, screenshots, marketing copy, videos, exercises, article text, illustrations, curriculum taxonomy, mastery formulas, reports, private APIs, or translations. Functional parity should use original or licensed curriculum content, synthetic learners/classes, independently designed mastery rules, and explicit school/child privacy controls.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first learning product with onboarding, course catalog, video/article lessons, practice, mastery, bookmarks, assignments, profile, settings, support, privacy, and account controls.
- Support learner workflows: browse subjects, resume learning, watch lessons, practice skills, review mastery, save content, complete assignments, and recover from connectivity or progress issues.
- Preserve education trust expectations around minors, teacher/classroom visibility, content accuracy, accessibility, video captions, data rights, notifications, and account safety.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Khan Academy-branded app or imply affiliation with Khan Academy, schools, districts, app stores, curriculum licensors, or education standards bodies.
- Do not copy videos, exercises, articles, hints, answer keys, mastery points, course trees, report layouts, translations, educator resources, or help copy without explicit rights.
- Do not scrape Khan Academy, reuse private APIs, replay network traffic, copy mastery/recommendation formulas, bypass classroom privacy controls, or misrepresent nonprofit/official content.
- Do not treat child accounts, classroom assignments, teacher reports, video content, accessibility, or educational analytics as generic features; each needs explicit owner and review before launch.
- Do not claim exact App Store, Play Store, native-device, course catalog, mastery, classroom, parent, deletion/export, support, notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/khan-academy/id469863705 | Official iOS listing, education category, learning content positioning, offline/download claims where shown, age/privacy context, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=org.khanacademy.android | Official Android listing, package id, education category, video/practice positioning, installs, ratings context, and data-safety orientation | Verified 2026-04-19 |
| Khan Academy Official App Help | https://support.khanacademy.org/hc/en-us/articles/202487540-Does-Khan-Academy-have-an-official-mobile-app | Official mobile app support orientation and native-app scope | Verified 2026-04-19 |
| Khan Academy Help Center | https://support.khanacademy.org/hc/en-us | Public support taxonomy for accounts, learners, teachers, classes, assignments, progress, troubleshooting, and privacy-related support | Verified 2026-04-19 |
| Khan Academy Privacy Policy | https://www.khanacademy.org/about/privacy-policy | Personal data, child/student handling, school accounts, cookies, analytics, communications, access/deletion, and regional rights | Verified 2026-04-19 |
| Khan Academy Terms Of Service | https://www.khanacademy.org/about/docs/khan-academy-terms-of-service | Account, service-use, content, acceptable-use, school, and legal constraints | Verified 2026-04-19 |
| Khan Academy Learn Product Page | https://www.khanacademy.org/ | Public course, practice, and learning product positioning | Verified 2026-04-19 |
| Khan Academy Teachers Page | https://www.khanacademy.org/teachers | Teacher/classroom product orientation, assignment, progress, and class-management context | Verified 2026-04-19 |
| Khan Academy Parents Page | https://www.khanacademy.org/parents | Parent/child learning context, family workflows, and child-account review area | Verified 2026-04-19 |
| Khan Academy Kids | https://learn.khanacademy.org/khan-academy-kids/ | Adjacent early-learning product reference; excluded from V1 unless separately scoped, verified, and legally reviewed | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Khan Academy product pages position the service as a broad learning catalog with videos, articles, practice exercises, progress, mastery, and teacher/classroom use.
- V1 must model signed-out browse, signed-in learner, child learner, parent-supervised learner, classroom student, teacher, assignment-focused learner, offline viewer, restricted/suspended account, and deleted-account states.
- Onboarding must support learner profile setup, subject/grade/course selection, account creation or sign-in, optional teacher/class join, age/consent gating, accessibility preferences, and notification or email preference setup.
- Course catalog must support subjects, courses, units, lessons, exercises, articles, videos, filters, search, recommendations, grade/skill metadata, and unavailable/regional content states.
- Lesson detail must support video, article, transcript/caption, practice entry, bookmark/save, assignment relation, progress marker, offline/download indicator where implemented, and content-version state.
- Practice must support exercises, hints, answer validation, retries, mastery updates, assignment submission, teacher visibility, and accessibility alternatives for math notation, diagrams, and video.
- Mastery/progress must support course progress, unit mastery, skill-level states, assignment completion, learner history, teacher-visible summaries, and recalculation after content updates.
- Teacher/classroom tooling must support classes, rosters, assignments, due dates, progress reports, student removal, school privacy controls, and export/retention review.
- Settings must expose profile, learner settings, notifications/email, teacher/class links, language/locale, accessibility, privacy, data access/export, delete account, help, terms, and privacy policy.
- Content operations must support content authoring/import, licensing metadata, versioning, answer-key review, caption/transcript quality, standards alignment where chosen, and rollback for bad content.

### Manual Verification Required

- Native iOS and Android navigation, course catalog, downloads/offline, video player, article rendering, exercise attempts, mastery/progress details, bookmarks, assignment/classroom flows, parent/child behavior, push/email preferences, data export/delete, support flows, and region/content differences.
- Exact teacher report fields, assignment status names, profile visibility, child consent paths, and mobile-specific accessibility behavior.

## Core User Journeys

- New learner installs the app, creates or signs into an account, selects grade/course interests, reaches Home, and starts a recommended lesson.
- Returning learner resumes a course, watches a video with captions, opens practice, uses a hint, submits answers, and sees mastery/progress update.
- Learner searches for a topic, opens a lesson from results, saves it, downloads or caches it where supported, and later finds it from saved content/history.
- Classroom student joins a teacher class, receives an assignment, completes practice, and understands which progress is visible to the teacher.
- Teacher creates a class, adds students, assigns a lesson or skill, reviews progress, identifies incomplete work, exports or shares records where allowed, and removes a student.
- Parent manages a child learner, reviews progress, adjusts settings, and understands privacy/deletion implications for child data.
- Offline learner opens cached lessons, watches available content, completes allowed local actions, reconnects, and resolves progress sync conflicts.
- Privacy-focused user changes notifications/email, requests data access/export, deletes account, and sees consequences for progress, classes, assignments, and support records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, signup, sign-in, signed-out browse | email, social auth, age, legal | guest, new, returning | auth fail, underage, suspended, offline |
| Learner Setup | Grade, subject, accessibility, class join | grade, course, code | complete, skipped | invalid class code, school block |
| Home | Resume learning, recommendations, assignments | lesson tap, course, assignment | personalized, signed-out | stale progress, no content, offline |
| Course Catalog | Browse/search subjects and courses | query, filter, subject | loaded, filtered, saved | no results, regional unavailable |
| Course/Unit Detail | Lessons, articles, videos, practice | unit, lesson, bookmark | not-started, in-progress, mastered | content version mismatch |
| Lesson Player | Video/article content consumption | play, caption, transcript | loading, playing, complete | blocked video, missing captions |
| Practice | Exercise attempt and feedback | answer, hint, submit | correct, incorrect, retry | malformed math, stale answer key |
| Mastery/Progress | Skill/course progress and history | course, skill, period | empty, active, mastered | recalculation, teacher visibility mismatch |
| Saved/Downloads | Saved lessons and offline content | save, remove, download | empty, saved, cached | expired cache, disk full |
| Class Assignments | Student assignment queue | assignment, submit | assigned, due, completed | removed from class, late state |
| Teacher Dashboard | Roster, assignments, reports | invite, assign, report | empty, active, archived | student privacy hold, export fail |
| Settings/Privacy/Support | Account, notifications, data rights, help | toggles, export, delete, case | loaded, pending export, deleting | retention hold, support unavailable |

## Data Model

- `User`: identity, age/consent bucket, locale, country, role, preferences, accessibility settings, privacy choices, deletion/export state, and restrictions.
- `LearnerProfile`: grade/level, active courses, saved content, progress summary, assignments, parent/teacher links, notification settings, and learning preferences.
- `TeacherProfile`: classes, rosters, assignments, report permissions, school context, export rights, and support state.
- `Course`: subject, grade band, standards tags where chosen, language, version, release state, regional availability, and content license.
- `Unit`: ordered course section, lesson list, prerequisites, mastery goals, assignment eligibility, and version metadata.
- `Lesson`: video/article/practice bundle, objective, transcript/caption metadata, estimated duration, offline eligibility, and content version.
- `VideoAsset`: source provider, license, caption files, transcript, thumbnails, duration, streaming/offline state, and accessibility review state.
- `Exercise`: prompt, answer rules, hints, worked solution, diagram/math assets, difficulty, skill tags, and quality-report state.
- `Attempt`: answer, correctness, hint usage, retries, latency, offline flag, assignment context, and privacy-safe audit data.
- `MasteryState`: skill, level, confidence, due practice, evidence history, recalculation source, and teacher visibility.
- `Bookmark`: learner, content object, saved timestamp, offline/cache status, and removal state.
- `Classroom`: teacher, roster, join code, assignments, visibility policy, school policy state, archive/removal rules, and export requirements.
- `Assignment`: class, content target, due date, completion criteria, student attempts, status, and report visibility.
- `PrivacyRequest`: data access/export, deletion, child/classroom record handling, identity verification, status, delivery, and retention notes.
- `AuditEvent`: append-only auth, profile, progress, classroom, assignment, support, privacy, deletion, and content-sensitive transitions.
- `LocalCacheRecord`: cached home/course/lesson/video/article, offline practice queue, progress snapshot, stale timestamp, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age/consent, device, locale, role, and deletion state.
- `GET /home`, `GET /recommendations`, `PATCH /learner/profile`: learner home, course suggestions, assignments, saved content, and profile setup.
- `GET /courses`, `GET /courses/:id`, `GET /courses/:id/units`: catalog, course detail, unit structure, version, availability, and cache hints.
- `GET /lessons/:id`, `GET /lessons/:id/media`, `POST /lessons/:id/complete`: lesson content, videos/articles, captions, completion, and idempotency.
- `POST /practice/session`, `POST /practice/:id/attempts`, `GET /practice/:id/result`: exercise scoring, hints, retries, answer validation, and stale-key handling.
- `GET /mastery`, `GET /progress`, `POST /mastery/recalculate`: mastery state, course progress, assignment context, and recalculation status.
- `POST /bookmarks`, `DELETE /bookmarks/:id`, `GET /downloads`, `POST /downloads`: saved/offline content lifecycle with device limits and stale content handling.
- `POST /classrooms`, `POST /classrooms/:id/join`, `GET /classrooms/:id/roster`, `DELETE /classrooms/:id/students/:studentId`: class and roster workflows.
- `POST /assignments`, `GET /assignments`, `GET /assignments/:id/progress`: teacher assignment creation, student assignment queue, and report data.
- `POST /content-reports`, `GET /content-versions/:id`: exercise/video/article quality feedback, content triage, and rollback.
- `GET /notification-preferences`, `PATCH /notification-preferences`: assignment, learning reminder, account, support, and privacy notification settings.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export/access, deletion, and warning state.
- `POST /support/cases`, `GET /support/cases/:id`: account, classroom, content, progress, privacy, and technical support workflows.

## Realtime, Push, And Offline Behavior

- Clients may cache Home, course catalog, lessons, videos, transcripts, articles, assignments, saved content, settings, and progress snapshots with explicit content-version and freshness labels.
- Offline mode may allow cached video/article viewing and locally queued practice attempts only when scoring rules are bundled and content versions match.
- Offline mode must block classroom roster changes, assignment creation, teacher reports, account deletion, data export, support evidence upload, and irreversible progress overrides.
- Practice attempt sync must be idempotent, preserve ordering per session, and mark attempts stale if answer keys or lesson versions changed while offline.
- Realtime or polling updates must reconcile assignments, teacher-visible progress, content version changes, data-export readiness, support cases, and account/deletion status.
- Downloads/offline content must support pending, downloaded, expired, removed, disk-full, provider-error, and content-updated states.
- Push/email notifications must be opt-in and category-controlled for assignments, learning reminders, account/security, support, and privacy requests.
- Push payloads must avoid exact child progress, classroom membership, assignment grades, raw answers, support evidence, and sensitive learning accommodations.

## Permissions, Privacy, And Safety

- Notifications, files for support evidence, and device storage/download access where platform-relevant must be requested only when the related feature is invoked.
- Child/minor, parent, and classroom workflows are launch blockers with named privacy/legal owners, consent policy, school contract posture, data minimization, retention, export, deletion, and teacher visibility rules.
- Video and transcript content must include caption quality checks, alternative text for diagrams where possible, playback accessibility, and fallback content for unsupported devices.
- Math/science exercises must handle notation accessibly and must not imply certified tutoring, grading, or academic-integrity guarantees without separate review.
- Teacher reports must minimize sensitive data, expose visibility to learners/parents where appropriate, and support roster removal and school data requests.
- Learning analytics must avoid raw answers where possible, child identifiers, exact class membership in generic analytics, disability/accommodation settings, and sensitive demographic inference.
- Account deletion/export must warn about progress, assignments, class membership, child records, support cases, legal retention, and teacher/school obligations.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, captions/transcripts, reduced motion, keyboard/focus order, and math notation alternatives.
- Launch owners: curriculum owner for lesson/exercise accuracy; privacy owner for minors/classrooms/export; accessibility owner for video/math UX; support owner for school/parent escalations; data owner for analytics.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, course opened, lesson opened, video played, article opened, practice started/completed, hint used, mastery updated, bookmark saved, assignment opened/completed, class joined, teacher assignment created, export requested, and account deletion requested.
- Every event must use content id, version, subject bucket, role, classroom flag, result bucket, latency bucket, locale, and error code rather than raw answers, child identity, teacher notes, or exact class rosters.
- Learning analytics must separate product telemetry from mastery calculations and provide deletion/export hooks for learner progress and classroom records where required.
- Teacher analytics may capture assignment completion rates and report generation without exposing raw answers to generic product analytics.
- Monetization is not required for V1; possible future models such as school licensing, premium content, tutoring, or donations require separate legal, privacy, and positioning review.
- Any paid, donation, partner, certification, tutoring, or school product must disclose pricing, support owner, data sharing, regional availability, and school/privacy obligations before launch.

## Edge Cases

- First launch offline, unsupported locale, underage learner without consent, school policy blocks account, signed-out learner tries to save progress, or teacher code is invalid.
- Course content unavailable, video provider fails, captions missing, transcript out of sync, article includes unsupported math notation, or exercise answer key is corrected after submission.
- Learner completes practice while offline, content version changes before sync, teacher assignment is deleted, mastery recalculates downward, or bookmark points to retired content.
- Student joins wrong class, teacher removes student, parent requests deletion, school requests data export, or learner changes from child to adult account state.
- Download expires, disk full, video cache corrupt, network drops mid-video, app terminates during practice, or progress shows stale data across devices.
- Push/email arrives after assignment completion, support case includes child data, data export is requested during deletion, or legal retention prevents full deletion.

## Test Plan

- Unit tests for course/unit unlock rules, lesson completion, exercise validation, hint usage, mastery recalculation, bookmarks, downloads, assignment states, privacy-safe analytics, and deletion/export warnings.
- Contract tests for every documented API route, including pagination, idempotency, validation errors, content versions, roster visibility, assignment status, and deletion/export states.
- Integration tests for auth, learner setup, Home, catalog search, course/unit detail, lesson player, video/article playback, practice, mastery/progress, saved/downloads, classroom join, teacher assignments, settings, support, export, and deletion.
- Offline tests for cached video/article, queued attempts, content-version mismatch, blocked classroom/privacy writes, corrupt cache, disk full, reconnect reconciliation, and duplicate submission.
- Classroom/minor tests for age gates, teacher roster, assignment completion, progress visibility, roster removal, export, deletion, parent/school support, and policy states.
- Content quality tests for answer-key correction, retired content, missing captions, inaccessible diagrams, broken video assets, and rollback behavior.
- Accessibility tests for captions, transcripts, screen reader labels, focus order, math notation, dynamic type, reduced motion, contrast, and form errors.
- Notification tests for opt-in, denied, revoked, quiet hours, assignment reminders, account/security, support, and privacy-safe payloads.
- Manual verification tests: native iOS/Android screenshots, official app navigation, catalog, videos, practice, mastery, bookmarks, downloads/offline, classes, reports, parent/child behavior, export/delete, support, and regional behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Khan Academy assets, private APIs, videos, exercises, course trees, mastery formulas, report layouts, translations, or brand copy.
- New and returning learners can browse courses, watch lessons, practice skills, track mastery, save content, handle offline recovery, complete assignments, and use settings with original or licensed content.
- User, learner, teacher, course, unit, lesson, video, exercise, attempt, mastery, bookmark, classroom, assignment, support, privacy, and deletion workflows have deterministic data models and API contracts.
- Signed-out, signed-in, child, parent, classroom student, teacher, offline, content-stale, restricted, and deleted-account states are covered by tests.
- Course catalog, video, practice, mastery, bookmarks, downloads/offline, classroom, parent/child, notifications, export/deletion, and support workflows have explicit blockers where exact native behavior is not verified.
- Curriculum licensing, child/classroom privacy, content accuracy, accessibility, learning analytics, support, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which subjects, grades, curricula, exercise providers, video providers, standards taxonomies, translations, and caption workflows will back the original clone?
- Which classroom features are V1 versus later: join codes, teacher assignments, progress reports, parent views, exports, roster sync, or district integrations?
- Will V1 support child accounts and school deployments immediately, or launch adult/self-directed learning first until privacy contracts are complete?
- Will offline video/practice be supported at launch, and what content licensing, storage, and scoring constraints apply?
- Which regions, languages, accessibility standards, student privacy laws, school records obligations, and retention policies are launch requirements?

## Build Plan

- Phase 1: scaffold app shell, auth, learner setup, Home, course catalog, course/unit detail, lesson player, synthetic content seed data, settings, and privacy-safe analytics.
- Phase 2: add video/article playback, captions/transcripts, practice exercises, mastery/progress, bookmarks, and content-version regression tests.
- Phase 3: add downloads/offline cache, queued attempts, reconnect reconciliation, corrupt-cache handling, and offline tests.
- Phase 4: add classroom student join, teacher class/roster, assignments, progress reports, export/deletion handling, and child/school privacy review.
- Phase 5: add support cases, content quality reports, parent/child flows where chosen, notifications/email preferences, and accessibility pass.
- Phase 6: complete legal/provider launch review for curriculum, videos, exercises, captions, minors/classrooms, accessibility, analytics, regional availability, and platform APIs.

## Next Steps

- Resolve Khan Academy manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 implementation-readiness upgrades with `079-quizlet.md` and `080-coursera.md`.
