# Canvas Student-Style Clone Spec

> Metadata
> - Inspiration app: Canvas Student
> - Category: Learning management system (student client)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official Instructure/Canvas guides and API documentation, and public Instructure privacy/terms pages.
> - Manual verification blockers: institution-hosted LMS endpoints, SSO/SAML/OIDC flows, LTI/external-tool launches, quiz/submission behavior, push notifications, offline course downloads, and real course data require lawful test institutions/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, course content, private institution data, proprietary feature names, or non-public LMS APIs.

## Overview

Build an original mobile LMS student client inspired by Canvas Student's public workflows: institution selection, student sign-in, course dashboard, modules, assignments, submissions, discussions, quizzes, grades, calendar, notifications, and offline learning. The clone targets a generic public-source LMS-compatible V1 with original UI/copy and an abstraction layer for institution-hosted backends.

The V1 may reference public Canvas-style REST concepts to shape contracts, but it must not scrape Canvas, reuse private APIs, copy Instructure branding, or ship with proprietary course content. Institution-specific behavior remains blocked until a lawful sandbox or test institution is available.

## Goals

- Provide a mobile student app for discovering an institution, signing in, and viewing authorized courses.
- Let students read course content, modules, pages, files, announcements, assignments, discussions, quizzes, grades, feedback, and calendar events.
- Support assignment submissions through text, URL, file, media, and external-tool placeholders where provider contracts allow.
- Provide offline read/draft support, resumable uploads, push reminders, and deterministic sync/conflict handling.
- Respect FERPA-adjacent student-record boundaries, institution retention/export policies, accessibility, and K-12 minor requirements.
- Keep LMS vendor integration swappable through documented adapter contracts rather than proprietary coupling.

## Non-Goals

- Do not build a Canvas-branded app or imply affiliation with Instructure.
- Do not copy Canvas UI text, icons, trademarks, screenshots, course sample data, private API identifiers, or institution content.
- Do not bypass school/institution SSO, scrape course pages, or collect credentials outside approved identity flows.
- Do not target advertising to students or analyze assignment/course content for ad personalization.
- Do not claim exact Canvas parity until institution-hosted flows are verified hands-on.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/canvas-student/id480883488 | Official iOS listing, course/assignment/grade/discussion/quiz/offline/push/accessibility claims, age rating, privacy labels | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.instructure.candroid | Official Android listing, grades, course content, submissions, to-do/calendar, messages, discussions, quizzes, push, data safety | Verified 2026-05-02 |
| Canvas Guides | https://community.canvaslms.com/t5/Canvas-Student-Guide/tkb-p/student | Official student guide taxonomy for account, courses, assignments, submissions, discussions, grades, calendar, and mobile workflows | Verified 2026-05-02 |
| Canvas API Docs | https://canvas.instructure.com/doc/api/ | Public REST reference for LMS resources, pagination, auth, assignments, submissions, courses, files, discussions, quizzes, and calendar patterns | Verified 2026-05-02 |
| Instructure Privacy Policy | https://www.instructure.com/policies/privacy | Public data-handling and student/customer-data obligations | Verified 2026-05-02 |
| Instructure Terms | https://www.instructure.com/policies/terms-of-use | Public account/service terms and acceptable-use posture | Verified 2026-05-02 |
| Instructure Accessibility | https://www.instructure.com/accessibility | Accessibility expectations and VPAT/accessibility posture for LMS surfaces | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe a learner app for viewing grades/course content, submitting assignments, tracking course work with to-do/calendar, messaging, discussions, videos, quizzes, push notifications, offline downloads, widgets, and accessibility.
- Institution discovery must let a student search/select a school/LMS host, verify the host, and start institution-owned SSO or token exchange.
- Auth must support SAML/OIDC/browser-based SSO, refresh-token handling where allowed, sign-out, and multiple institution profiles.
- Dashboard must show courses, to-dos, recent announcements, upcoming due dates, and offline/download state.
- Course navigation must expose modules, pages, files, syllabus/materials, announcements, assignments, discussions, quizzes, grades, people, and calendar where enabled by the institution.
- Modules must support requirements/prerequisites, locked states, completion/progression, embedded media, external URLs, and downloaded read-only content.
- Assignments must show instructions, due/available/until dates, attempts, allowed submission types, rubric, feedback, late/missing/excused states, and grade/points visibility.
- Submission composer must support text, URL, file upload, media upload, multiple attachments, draft persistence, upload progress, final submit, resubmit, and unsubmitted/pending states.
- Discussions must show topic, threaded replies, locked/closed state, attachments, unread indicators, and instructor moderation/deleted states.
- Quiz/timed-assessment support must be conservative: start/resume/submit attempts, autosave answers, timer warnings, network recovery, and launch-blocking institution verification.
- Grades must show course totals, assignment scores, rubrics, comments, hidden/posting policies, feedback files, and "not yet posted" states.
- Calendar/to-do must aggregate events and assignments across courses with filters, reminders, and completion states.
- Push notifications must be opt-in and cover announcements, due dates, grades, messages, and discussion replies without leaking sensitive content by default.
- Offline mode must support downloaded modules/files/pages, cached grades/to-dos, local drafts, and conflict-safe resubmission.

## Core User Journeys

- Student searches for an institution, confirms the LMS host, completes SSO, and lands on a course dashboard.
- Student opens a course, reads a module item, marks progress where required, and downloads course content for offline reading.
- Student opens an assignment, reviews rubric/due date, adds a file and text response, submits, and sees receipt/pending/late status.
- Student loses connectivity during a file upload; upload resumes or fails with recoverable draft state.
- Student joins a discussion, reads replies, posts a response, and handles a closed/locked topic state.
- Student starts a timed quiz, autosaves answers, backgrounds the app, returns, and submits before the timer expires.
- Student receives a push for a new grade, opens grades, reviews score, rubric, and instructor feedback.
- Student manages notification settings, removes an institution account from the device, and requests export/delete through institution policy.
- Multi-institution student switches between school profiles without leaking course data across tenants.
- Institution admin disables a course/tool; the app hides or locks related navigation with clear explanation.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Institution Picker | Find and verify LMS host | search, URL, recent school | results, no-results, verified | spoofed host, unsupported institution |
| SSO Sign-In | Institution-owned auth | browser auth, MFA, consent | loading, authenticated | IdP failure, expired token, blocked account |
| Dashboard | Courses, to-dos, recent activity | course select, filter, download | populated, empty, offline | sync failed, no enrollments |
| Course Home | Course summary/navigation | tab select, refresh | active, concluded, unpublished | permission denied, tool disabled |
| Modules | Sequential course content | module item, download | unlocked, locked, complete | prerequisite unmet, offline missing |
| Page/File Viewer | Read course materials | zoom, download, share | loaded, cached | unsupported file, access expired |
| Assignment Detail | Requirements and feedback | submit, resubmit, comment | open, submitted, graded | late, closed, hidden grade |
| Submission Composer | Build and send work | text, URL, file, media | draft, uploading, submitted | upload fail, duplicate submit |
| Discussions | Topic and threaded replies | reply, attach, mark read | open, locked, closed | deleted reply, moderation hold |
| Quiz/Assessment | Timed attempt | answer, flag, submit | not-started, running, submitted | timer expired, network loss |
| Grades | Scores, totals, feedback | course filter, assignment open | posted, hidden, excused | calculation unavailable |
| Calendar/To-Do | Due dates and events | date range, complete | upcoming, overdue, empty | timezone mismatch |
| Inbox/Messages | Course communication | compose, reply | unread, sent, archived | recipient unavailable |
| Offline Downloads | Manage cached content | download, delete, retry | queued, downloaded, stale | storage full, policy blocked |
| Settings And Privacy | Accounts, notifications, data | toggles, remove account | loaded, saving | institution-managed setting |
| Support | Help and problem report | issue, logs consent | submitted, in review | raw course data redaction |

## Data Model

- `User`: local account identity, institution profile ids, locale, accessibility preferences, consent/export state.
- `Institution`: display name, verified host, auth config, region, policy flags, adapter type.
- `AuthSession`: institution, token metadata, scopes, expiry, refresh state, device binding.
- `Enrollment`: user, course, role, section, status, term, permissions.
- `Course`: institution resource id, name, code, term, navigation tools, sync state, concluded/unpublished flags.
- `Module`: course, title, order, requirement policy, lock state, completion state.
- `ModuleItem`: module, content type, resource id, URL/file/page/video/external-tool refs, availability.
- `Page`: course, title, body reference, last updated, offline cache state.
- `FileAsset`: course, folder, MIME type, size, download URL/ref, scan/cache state, expiry.
- `Announcement`: course, author, body ref, posted timestamp, unread/comment state.
- `Assignment`: course, title, instructions ref, dates, submission types, points, rubric, attempts, visibility.
- `Submission`: assignment, user, attempt, content parts, workflow state, submitted-at, late/missing/excused flags.
- `SubmissionAttachment`: submission, upload session, file metadata, provider ref, scan state.
- `DiscussionTopic`: course, title, body ref, threaded/locked state, unread count, due/availability.
- `DiscussionEntry`: topic, author, body ref, parent id, attachment refs, moderation/deleted state.
- `Quiz`: course, assignment link, settings, time limit, attempts allowed, availability, verification-required flag.
- `QuizAttempt`: quiz, user, started/submitted timestamps, answers, autosave cursor, timer state.
- `Grade`: course/assignment, score, grade, feedback refs, rubric results, posted/hidden state.
- `CalendarEvent`: course, assignment/event kind, start/end/due, timezone, completion state.
- `NotificationPreference`: user, institution, course, event type, channel, quiet hours.
- `OfflineCacheEntry`: resource type/id, version, encryption key ref, expiry, sync status.
- `AuditEvent`: auth, submission, quiz, privacy, cache deletion, notification, and support changes.

## API And Backend Contracts

- `GET /institutions?q=`, `POST /institutions/verify-host`: institution discovery with spoofing checks.
- `POST /auth/sso/:institutionId`, `POST /auth/token/refresh`, `DELETE /auth/session`: SSO and session lifecycle.
- `GET /profiles`, `GET /courses`, `GET /courses/:id`, `GET /courses/:id/navigation`: dashboard/course contracts.
- `GET /courses/:id/modules`, `GET /modules/:id/items`, `POST /module-items/:id/complete`: modules and completion.
- `GET /courses/:id/pages/:pageId`, `GET /files/:id/download-url`: page/file retrieval with cache metadata.
- `GET /courses/:id/announcements`, `GET /courses/:id/assignments`, `GET /assignments/:id`: course work.
- `POST /assignments/:id/submissions`, `POST /submissions/:id/uploads`, `PUT /uploads/:id/content`, `POST /submissions/:id/submit`: submission workflow.
- `GET /courses/:id/discussions`, `GET /discussions/:id/entries`, `POST /discussions/:id/entries`: discussions.
- `POST /quizzes/:id/attempts`, `PATCH /quiz-attempts/:id/answers`, `POST /quiz-attempts/:id/submit`: quiz attempt lifecycle.
- `GET /courses/:id/grades`, `GET /assignments/:id/feedback`: grades and feedback.
- `GET /calendar?from=&to=&institution=&course=`, `PATCH /to-dos/:id`: calendar/to-do.
- `GET /messages`, `POST /messages`, `GET /messages/:id`: inbox/messages where enabled.
- `POST /offline/downloads`, `GET /offline/sync-plan`, `DELETE /offline/cache/:id`: offline cache management.
- `GET /settings/notifications`, `PATCH /settings/notifications`, `POST /data-export`, `DELETE /account`: settings/privacy.
- `POST /support/cases`: support with optional redacted diagnostic logs.

## Realtime, Push, And Offline Behavior

- Sync uses cursor-based polling plus push hints; institution adapters must tolerate stale permissions and deleted resources.
- Offline downloads store encrypted read-only course materials, module/page/file metadata, assignment details, and user drafts with explicit cache expiry.
- File submissions use chunked/resumable uploads with checksum, progress, retry, duplicate-submit protection, and final server receipt.
- Quiz attempts autosave answers frequently, reconcile with server time, and show conservative warnings when offline or time authority is uncertain.
- Push notifications are opt-in for announcements, grades, due dates, messages, and discussion replies; payloads default to generic course/event labels.
- Multi-institution cache and tokens are isolated per tenant and removed on sign-out/account removal.

## Permissions, Privacy, And Safety

- FERPA-adjacent posture: course membership, submissions, grades, messages, and files are institution-scoped and never shared across tenants.
- K-12/COPPA-style review is required for under-13 student accounts, push notifications, analytics, and offline storage.
- Credential handling must use institution-owned browser auth; the app must not collect or store raw school passwords.
- Course files/submissions are encrypted at rest on device; cache purge must occur on sign-out, remote revoke, institution policy change, or account removal.
- External links/tools require clear handoff, origin display, and blocked/unsupported states when contracts or SSO context are missing.
- No advertising to students and no course/submission content in analytics or support logs by default.
- Accessibility must be treated as core LMS functionality: screen readers, dynamic type, captions where available, high contrast, keyboard support, and reduced motion.
- Launch owners: education product lead, privacy/legal lead, security lead, LMS integration owner, accessibility owner, and support operations owner.

## Analytics And Monetization

- Track privacy-safe events only: institution selected, course opened, module viewed, assignment opened/submitted, upload failed, discussion reply posted, quiz started/submitted, grade viewed, offline download completed, notification opened.
- Events use opaque ids and coarse resource types; no course names, assignment text, submission content, grades, messages, file names, or student identifiers in analytics.
- Monetization is institution licensing or open-source self-hosting support; no student-directed ads or consumer upsell in V1.
- Admin/license states, if any, must be tenant-scoped and never alter a student's right to export/delete local app data.

## Edge Cases

- Student chooses a spoofed or unsupported institution URL.
- SSO requires MFA, parental consent, district-managed device policy, or blocks embedded browser flows.
- Student is enrolled in two institutions with overlapping course ids.
- Course is unpublished, concluded, deleted, or hidden while cached offline.
- Module prerequisite changes after student downloads content.
- Assignment permits one submission type on web but not mobile adapter.
- File upload completes after due date or after instructor closes submissions.
- Student taps submit repeatedly during slow network and creates duplicate attempts.
- Quiz timer expires while device clock is wrong or app is backgrounded.
- Grade is hidden/posting policy-delayed while push notification arrives.
- External tool launch fails because LTI/session context is unavailable.
- Instructor deletes a discussion reply after it was cached.
- Storage is full during offline download or encrypted cache migration fails.

## Test Plan

- Unit tests for institution discovery, host verification, token lifecycle, tenant isolation, course navigation, module locks, submission state, quiz timer, and offline cache expiry.
- Contract tests for every documented route, adapter errors, pagination, permission denial, stale resource versions, idempotency, and async upload states.
- Integration tests for SSO sandbox, dashboard sync, module read, assignment submission, file upload resume, discussion reply, grade feedback, calendar aggregation, and account removal.
- Quiz tests for start, autosave, resume, submit, timer expiration, backgrounding, network loss, duplicate submit, and unsupported quiz setting.
- Privacy tests for cross-tenant isolation, cached course purge, analytics redaction, support-log redaction, export/delete routing, and hidden grade protection.
- Offline tests for downloaded modules, stale cache refresh, draft sync, upload retry, token expiry while offline, and cache corruption.
- Accessibility tests for dynamic type, screen reader order, high contrast, reduced motion, keyboard navigation, captions/alt text where available, and tablet layouts.
- Security tests for auth redirect validation, token storage, file URL expiry, malicious attachment names, external link warnings, and institution-host spoofing.
- Manual verification tests: real institution SSO, real course/assignment/quiz/submission flows, LTI/external tools, push payloads, offline course downloads, and grade posting behavior.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- A downstream team can build a V1 without proprietary Canvas/Instructure assets, private APIs, screenshots, brand copy, or course data.
- Institution selection, SSO, dashboard, course navigation, modules, assignments, submissions, discussions, grades, calendar, notifications, and offline cache have documented contracts.
- Student records are tenant-scoped with no cross-institution leakage in cache, analytics, support logs, or notifications.
- Submission, quiz, upload, push, offline, and external-tool states are deterministic and covered by tests.
- K-12 privacy, no-advertising, accessibility, export/delete, and support-redaction requirements are explicit and testable.
- Institution-specific and exact native parity claims remain feature-flagged or blocked until lawful hands-on verification is recorded.

## Open Questions

- Which LMS adapters are included in V1: Canvas-compatible only, generic IMS standards, or a custom demo LMS?
- What lawful sandbox institutions and SSO providers are available for verification?
- Which submission types are in V1: text, URL, file, media, external tool, annotation, or quiz file upload?
- Are quizzes included in V1 or held behind an institution-verified feature flag?
- What offline download limits and retention policies are acceptable for institution-owned course content?
- Which accessibility standard and VPAT-like evidence format should downstream implementation produce?

## Build Plan

- Phase 1: implement institution discovery, verified host registry, SSO shell, tenant-scoped auth/session storage, dashboard, and course list.
- Phase 2: add course navigation, modules, pages/files, announcements, calendar/to-do, notification preferences, and offline read cache.
- Phase 3: add assignments, submission composer, resumable file uploads, receipts, draft sync, and feedback display.
- Phase 4: add discussions, inbox/messages where enabled, grades/rubrics, and privacy-safe analytics.
- Phase 5: add conservative quiz support, external-tool placeholders, adapter conformance tests, cache purge/export/delete, and accessibility coverage.
- Phase 6: complete security/privacy review, K-12 minor review, real institution verification, push/offline native testing, and rollout readiness.

## Next Steps

- Choose the V1 LMS adapter scope and create a lawful demo/sandbox institution.
- Keep quiz, LTI/external tools, and exact offline parity behind verification flags until real accounts confirm behavior.
- Propagate the refreshed canonical spec to the corresponding downstream scaffold repo after source-spec synchronization.
