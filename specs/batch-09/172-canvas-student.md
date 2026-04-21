# Canvas Student-Style Clone Spec

> Metadata
> - Inspiration app: Canvas Student
> - Category: Learning management system (student client)
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: institution-hosted LMS endpoints, SSO, subscription (if any), and assignment-submission flows require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, and feature names. No proprietary LMS content.

## Overview

Build an original mobile LMS student client inspired by Canvas Student: connect to an institution's LMS, view courses, read announcements and modules, submit assignments, join discussions, take quizzes, see grades, and manage calendar. SSO via institution identity providers and FERPA-adjacent student-data handling.

## Goals

- Multi-institution sign-in via SSO (SAML/OIDC).
- Course list with announcements, modules, pages, files.
- Assignment submission (file, URL, media, text).
- Discussions and replies.
- Quizzes with timers and resume.
- Grades and feedback.
- Calendar with due dates and events.

## Non-Goals

- Do not copy proprietary LMS API identifiers, brand, or feature names.
- Do not store student PII beyond what the LMS provides.
- Do not target advertising to students.
- Do not operate as a general consumer app.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/canvas-student/id480883488 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.instructure.candroid | Features, data safety | Source discovery — pending exact URL verification |
| Canvas help | https://community.canvaslms.com | Feature how-to | Source discovery — pending exact URL verification |
| Instructure privacy | https://www.instructure.com/policies/privacy | Data handling | Source discovery — pending exact URL verification |
| Canvas API docs (generic LMS REST reference) | https://canvas.instructure.com/doc/api/ | LMS contract reference | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Institution picker and SSO; SAML/OIDC support.
- Course dashboard with configurable cards.
- Modules and pages with progression.
- Assignment details with submission types: file upload, URL, text, media, external tool.
- Discussion threads with reply/attachment.
- Quiz taking with timer and resume support.
- Grade summary and feedback.
- Calendar with multi-course events.
- Offline read for downloaded content.

## Core User Journeys

- Student searches institution, signs in via SSO.
- Student views dashboard and picks a course.
- Student reads module and progresses.
- Student submits a text/file assignment.
- Student posts a discussion reply.
- Student starts a quiz with a timer; resumes after network blip.
- Student views grade and feedback.
- Student adds a to-do from an assignment.
- Student receives push for a new announcement.
- Student exports data or removes account (per institution policy).

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Institution Picker | Select LMS instance | search | loaded | unsupported |
| SSO Sign-in | Sign in with institution IdP | credentials | loaded | failure |
| Dashboard | Courses and to-dos | none | populated | offline |
| Course Home | Course nav | none | loaded | unavailable |
| Modules | Module list with states | progress | loaded | locked |
| Assignment Detail | Details and submit | submission | loaded | late |
| Submission Composer | Build submission | text, files, URL | draft, submitted | upload fail |
| Discussions | Threads | reply | loaded | closed |
| Quiz | Take quiz | answers | running, paused | time expired |
| Grades | Summary and feedback | none | loaded | hidden by instructor |
| Calendar | Due dates and events | filter | populated | empty |
| Settings And Privacy | Notifications, data | toggles | loaded | signed-out |

## Data Model

- `User`: identity, institution, locale.
- `Institution`: name, SSO config, region.
- `Course`: id (LMS), name, term, enrollments.
- `Module`: course, items, prerequisites.
- `Assignment`: course, due date, submission types, points.
- `Submission`: assignment, user, content parts, status, score, feedback.
- `Discussion`: course, topic, posts.
- `Quiz`: course, time limit, questions, attempt state.
- `QuizAttempt`: user, quiz, answers, started-at, submitted-at.
- `Grade`: course, assignment, score, feedback.
- `CalendarEvent`: course, kind (assignment/event), start/end.
- `PrivacySettings`: notification prefs, retention.
- `AuditEvent`: privacy, account, submission state changes.

## API And Backend Contracts

- `GET /institutions?q=`: search.
- `POST /auth/sso/:institutionId`: initiate SSO flow; token exchange.
- `GET /courses`, `GET /courses/:id`, `GET /courses/:id/modules`.
- `GET /assignments?course=`, `GET /assignments/:id`.
- `POST /submissions`, `POST /submissions/:id/files` (chunked), `POST /submissions/:id/submit`.
- `GET /discussions`, `POST /discussions/:id/posts`.
- `POST /quizzes/:id/attempts`, `PATCH /attempts/:id`, `POST /attempts/:id/submit`.
- `GET /grades?course=`.
- `GET /calendar?range=`.
- `GET /settings`, `PATCH /settings`.
- `POST /data-export`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Push for announcements, new grades, assignment reminders (opt-in).
- Offline reads for downloaded modules, assignments, and drafts.
- Resumable uploads for large submissions.
- Quiz state preserved across reconnects.

## Permissions, Privacy, And Safety

- FERPA-adjacent handling: student data scoped per institution; institution governs retention and export.
- COPPA-style review for K-12 deployments with under-13 students.
- No advertising to students.
- File uploads scanned and size-limited.
- Accessibility required (dynamic type, screen reader, reduced motion, high contrast).
- Launch owner: privacy lead, education-product lead, accessibility owner, security lead.

## Analytics And Monetization

- Privacy-safe events only: course opened, assignment submitted, quiz started/submitted (ids, not content).
- No submission content in analytics.
- Client is typically free; licensing via institution.

## Edge Cases

- Institution SSO down; retry with backoff.
- Quiz time expires mid-submission.
- Large file uploads on slow networks; resume.
- Late submission handling per course policy.
- Offline mode while submitting; queue and retry.
- Multi-institution users (transfer students).
- Instructor hides grades.
- Course archived mid-semester.

## Test Plan

- Unit tests for quiz timer, submission state, offline queue.
- Contract tests for all endpoints.
- Integration tests for SSO, submission, quiz attempt.
- Privacy tests.
- Accessibility tests.
- Manual verification: institution SSO, submission at scale, push timing.

## Acceptance Criteria

- SSO works with SAML/OIDC across test institutions.
- Assignment submission and quiz-taking work offline where expected.
- FERPA-adjacent handling complete.
- Accessibility compliance confirmed.

## Open Questions

- Number of institution integrations in V1.
- LMS vendor list beyond Canvas-compatible APIs.
- SIS integration scope.
- Support for external tool submissions (LTI).

## Build Plan

- Phase 1: institution picker, SSO, dashboard, courses.
- Phase 2: modules, pages, assignments.
- Phase 3: submissions, discussions.
- Phase 4: quizzes and grades.
- Phase 5: calendar, privacy, accessibility.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Define LMS API abstraction for multi-vendor support.
- Commission FERPA/accessibility review.
