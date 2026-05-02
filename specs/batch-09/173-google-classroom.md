# Google Classroom-Style Clone Spec

> Metadata
> - Inspiration app: Google Classroom
> - Category: Learning management (lightweight)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official Google Classroom Help pages, and public Google education privacy/terms pages.
> - Manual verification blockers: Google Workspace for Education account behavior, guardian summaries, Drive-like storage integration, district SSO/admin controls, assignment attachment permissions, push notifications, and native offline behavior require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, sample classes, Google-specific marks, private APIs, or proprietary ecosystem coupling.

## Overview

Build an original mobile lightweight LMS inspired by Google Classroom's public workflows: class creation, class codes, stream announcements, classwork, assignments, file turn-in, comments, grading, due dates, guardian summaries, and cloud-file integration. The V1 should use original product language and a provider-agnostic storage/integration layer rather than copying Google branding or proprietary Drive/Classroom behavior.

The clone may support standard OAuth cloud providers where contracts permit, but exact Workspace/Drive/Classroom parity is blocked until verified with lawful school or personal test accounts.

## Goals

- Support teacher, student, co-teacher, guardian, school admin, and support roles with role-specific permissions.
- Let teachers create classes, invite students/co-teachers, post announcements/materials/questions/assignments, grade submissions, and archive classes.
- Let students join classes, read stream/classwork, attach work from device/cloud, turn in/unsubmit/resubmit, comment where allowed, and view returned grades.
- Provide due-date calendars, to-do states, notifications, attachment handling, class folders/equivalent storage, and optional guardian summaries.
- Preserve student-data privacy with no advertising to students, institution-scoped records, minimal analytics, and export/delete pathways.
- Keep cloud integration provider-neutral with explicit OAuth scopes, permission checks, and fallback states.

## Non-Goals

- Do not build a Google-branded app or imply compatibility with Google Classroom, Google Drive, or Google Workspace.
- Do not copy Google trademarks, icons, screenshots, text, sample classes, private APIs, or exact ecosystem behavior.
- Do not target ads to students or use student/class content for advertising.
- Do not require proprietary Google services for the public-source V1; use generic cloud integration abstractions.
- Do not claim exact Classroom/Drive/Workspace parity until account- and institution-gated behavior is verified.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/google-classroom/id924620788 | Official iOS listing, class creation, assignments, Drive-file organization, communication, notifications, permissions, privacy labels | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.classroom | Official Android listing, class setup, assignments, stream, Drive filing, no ads/student-data advertising statement, permissions, data safety | Verified 2026-05-02 |
| About Classroom Help | https://support.google.com/edu/classroom/answer/6020279 | Official role capabilities for teachers, students, guardians, assignments, communication, and Workspace tool connections | Verified 2026-05-02 |
| Classroom Help Center | https://support.google.com/edu/classroom/ | Official help taxonomy for classes, classwork, assignments, grading, guardians, stream, people, settings, and troubleshooting | Verified 2026-05-02 |
| Google Workspace for Education Privacy & Security | https://edu.google.com/intl/ALL_us/why-google/privacy-security/ | Public education privacy/security posture, no-advertising expectations, and admin/student-data framing | Verified 2026-05-02 |
| Google Workspace for Education Terms | https://workspace.google.com/terms/education_terms/ | Public education service terms and customer-data obligations | Verified 2026-05-02 |
| Google Privacy Policy | https://policies.google.com/privacy | General public privacy reference for account/data rights and user controls | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe a free classroom service for schools, nonprofits, and personal accounts with class setup, class codes, paperless assignments, class materials, Drive-style folders, announcements, discussions, grades, and notifications.
- Teacher onboarding must create a class, set class details, generate class code/link, invite students/co-teachers, and configure stream/comment permissions.
- Student onboarding must join by class code/invite or roster assignment, view active/archived classes, and handle permission/account errors.
- Stream must show announcements, recent classwork, discussion/comment states, pinned or scheduled posts where supported, and role-specific composer actions.
- Classwork must organize assignments, questions, materials, and topics with due dates, points, attachments, instructions, and visibility/scheduling states.
- Assignment workflow must support teacher-created attachments, per-student copies/equivalents, student attachments, turn-in, unsubmit, resubmit, teacher review, return, grades, and private comments.
- Cloud storage integration must support provider-neutral file picking, permission grants, attachment references, copy-per-student semantics where supported, revocation, and expired-token states.
- People/roster management must support teachers, co-teachers, students, guardians, invite/resend/remove, and admin-managed restrictions.
- Guardian summaries must be opt-in, policy-controlled, email-based or equivalent, and limited to due/missing/upcoming work rather than raw classroom content by default.
- Calendar/to-do must aggregate assignment due dates across classes with timezone handling, completion states, overdue/missing labels, and reminders.
- Notifications must cover new posts, due dates, returned grades/work, comments, invitations, guardian summaries, and account/security changes using generic previews by default.
- Admin/school policies must cover class creation eligibility, roster sync, guardian access, storage providers, retention, exports, and audit logs.

## Core User Journeys

- Teacher creates a class, configures stream permissions, shares class code, and invites a co-teacher.
- Student joins with a class code, lands on the class stream, and opens classwork.
- Teacher posts an assignment with instructions, due date, points, rubric, and a cloud attachment.
- Student opens the assignment, attaches a file from device/cloud, turns it in, then unsubmits and resubmits before the deadline.
- Teacher reviews submissions, adds a private comment, records grade/feedback, and returns work.
- Student receives a generic notification, opens returned work, views feedback, and resolves missing/late state.
- Teacher posts a question/material, moderates comments, and moves the item under a topic.
- Guardian accepts a summary invitation and receives a scheduled digest according to school policy.
- Admin disables an unauthorized cloud provider; existing attachments remain viewable where policy allows and new attachments are blocked.
- Teacher archives a class at the end of term while preserving required class records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account and role entry | email, SSO, role | new, returning, managed | underage, wrong domain, SSO fail |
| Class List | Active and archived classes | join, create, filter | populated, empty, archived | removed class, sync failed |
| Join Class | Enter code/invite | class code, link | valid, joined, pending | invalid code, full class, domain blocked |
| Create Class | Teacher class setup | name, section, subject, room | draft, created | not allowed, duplicate |
| Stream | Announcements and activity | compose, comment, open item | populated, empty, restricted | offline, comments disabled |
| Stream Composer | Announcement/question/material post | text, attachment, schedule, audience | draft, scheduled, posted | upload fail, policy denied |
| Classwork | Organized work by topic | topic, assignment, filter | populated, upcoming, overdue | hidden item, unavailable |
| Assignment Detail | Instructions, attachments, status | attach, turn in, unsubmit | assigned, submitted, returned | late, closed, missing |
| Submission Composer | Student work assembly | text, files, cloud refs | draft, uploading, turned-in | token expired, permission denied |
| Grading/Review | Teacher submission review | grade, comment, return | pending, graded, returned | rubric locked, hidden grade |
| People/Roster | Teachers, students, guardians | invite, remove, role change | active, pending | admin-managed, duplicate |
| Calendar/To-Do | Due dates and completion | date, class filter | upcoming, overdue, done | timezone conflict |
| Guardian Summary | Guardian digest controls | invite, schedule, opt-out | pending, active, disabled | bounced email, policy blocked |
| Cloud Integrations | Connect/manage providers | OAuth, pick file, revoke | connected, expired | scope denied, provider outage |
| Settings And Privacy | Notifications, data, account | toggles, export/delete | loaded, saving | managed setting, identity recheck |
| Admin Policies | School controls and audit | policy, roster, provider | configured, syncing | insufficient permission |
| Support And Safety | Report/help workflow | reason, case, logs consent | submitted, in review | content redaction, escalation |

## Data Model

- `User`: identity, roles, locale, managed-account flags, age/consent state, export/delete state.
- `Institution`: school/domain, SSO config, admin policies, storage providers, retention, region.
- `Classroom`: owner, co-teachers, institution, class code, section/subject metadata, archive state, stream policy.
- `Membership`: user, classroom, role, status, invite source, notification settings, guardian relation.
- `GuardianLink`: student, guardian contact, invite state, digest schedule, policy scope.
- `StreamPost`: classroom, kind, author, body, attachments, topic, schedule state, comment policy, visibility.
- `Topic`: classroom, title, order, hidden/archived state.
- `Assignment`: stream post, due/available dates, points, rubric, submission types, attachment policy, grade visibility.
- `Submission`: assignment, student, attempt, attachments, body, status, turned-in/unsubmitted/returned timestamps, late/missing flags.
- `PrivateComment`: assignment/submission, author, body, visibility, moderation state.
- `GradeRecord`: assignment, student, score, rubric results, feedback, posted/hidden state.
- `CloudIntegration`: provider, user, OAuth scopes, token metadata, revocation/expiry state, policy approval.
- `AttachmentRef`: owner, provider/local storage ref, MIME type, permission state, copy mode, scan/cache status.
- `CalendarEvent`: class/assignment, due/start/end, timezone, completion state, reminder state.
- `NotificationPreference`: user, class, event type, channel, quiet hours, preview policy.
- `AdminPolicy`: institution, class creation, roster, guardian, comment, storage, retention, export settings.
- `AuditEvent`: auth, class, roster, post, submission, grade, attachment, policy, privacy, moderation changes.

## API And Backend Contracts

- `POST /auth/sso/:institutionId`, `POST /auth/session`, `DELETE /auth/session`: account/session lifecycle.
- `GET /classes`, `POST /classes`, `PATCH /classes/:id`, `POST /classes/:id/archive`: class list and lifecycle.
- `POST /classes/:id/invites`, `POST /invites/:code/accept`, `DELETE /memberships/:id`: invites and membership.
- `GET /classes/:id/stream`, `POST /classes/:id/posts`, `PATCH /posts/:id`, `DELETE /posts/:id`: stream posts.
- `GET /classes/:id/classwork`, `POST /classes/:id/topics`, `PATCH /topics/:id`: classwork organization.
- `POST /assignments`, `GET /assignments/:id`, `PATCH /assignments/:id`: assignment lifecycle.
- `POST /assignments/:id/submissions`, `POST /submissions/:id/attachments`, `POST /submissions/:id/turn-in`, `POST /submissions/:id/unsubmit`, `POST /submissions/:id/return`: submission workflow.
- `POST /submissions/:id/comments`, `GET /assignments/:id/submissions`, `POST /grades`: comments and grading.
- `GET /classes/:id/people`, `POST /classes/:id/co-teachers`, `POST /guardian-links`, `DELETE /guardian-links/:id`: people and guardian access.
- `GET /calendar?from=&to=&class=`, `PATCH /to-dos/:id`: calendar/to-do state.
- `POST /integrations/cloud/connect`, `GET /integrations/cloud`, `POST /integrations/cloud/pick`, `DELETE /integrations/cloud/:id`: provider-neutral storage.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: local/device attachment upload.
- `GET /admin/policies`, `PATCH /admin/policies`, `GET /admin/audit-events`: admin policy/audit.
- `GET /settings/notifications`, `PATCH /settings/notifications`, `POST /data-export`, `DELETE /account`: settings/privacy.
- `POST /reports`, `POST /support/cases`: reporting and support.

## Realtime, Push, And Offline Behavior

- Stream, classwork, comments, submissions, and grades sync via cursor-based polling plus push hints, with duplicate event tolerance.
- Offline mode supports cached classes, classwork, assignment details, local drafts, selected attachments, and read-only files where provider policy allows.
- Submission uploads are resumable and idempotent; final turn-in is a distinct server action from attachment upload.
- Cloud attachments are stored as permissioned references; expired tokens, revoked permissions, deleted files, and provider outages have explicit UI states.
- Push notifications are generic by default for class posts, due dates, returned work, comments, invites, guardian summaries, and security events.
- Calendar events reconcile server timezones, device timezone changes, daylight-saving changes, and class-level due-date edits.

## Permissions, Privacy, And Safety

- FERPA-adjacent posture: class membership, assignments, submissions, grades, comments, guardian summaries, and attachments are institution-scoped records.
- COPPA-style review is required for under-13 student accounts, guardian summaries, cloud attachments, notifications, and analytics.
- Like the public inspiration's education posture, V1 must contain no student advertising and must not use student/class content for ad personalization.
- Cloud OAuth scopes must be minimal, provider-specific, revocable, and blocked by school policy when not approved.
- Guardian summaries must reveal only policy-approved student work metadata and must support bounced email, revoked guardian, and opt-out states.
- Teacher/student comments require moderation, delete/hide, report, and admin-audit flows for harassment, privacy issues, or inappropriate content.
- Analytics exclude class names, assignment text, student names, submissions, grades, comments, attachment names, and cloud file contents.
- Data export/delete requests must route through institution policy and legal holds where applicable.
- Launch owners: education product lead, privacy/legal lead, security/cloud integration owner, child-safety owner, accessibility owner, and school-operations owner.

## Analytics And Monetization

- Track privacy-safe events only: class created, invite accepted, stream post created, assignment posted, submission turned in, work returned, grade viewed, attachment added, cloud token expired, guardian summary sent, export requested.
- Events use opaque ids, role, feature area, platform, and failure code; no classwork content, grades, student names, comments, or file names.
- Monetization is school/district licensing, hosted support, or open-source deployment services; no student-directed ads or consumer classroom-content monetization.
- Any paid/admin state must be institution-scoped and must not block students from accessing already-assigned work or privacy controls.

## Edge Cases

- Student tries to join a class with an expired, disabled, or wrong-domain code.
- Teacher creates a class but admin policy later disallows unmanaged classes.
- Co-teacher edits an assignment while another teacher is grading submissions.
- Student attaches a cloud file but lacks share permission for teacher review.
- Cloud token expires after attachment but before turn-in.
- Teacher deletes an assignment with existing submissions; audit/retention preserves required history.
- Student unsubmits after teacher has opened the work.
- Due date changes after a student receives a notification.
- Guardian summary email bounces or is sent after guardian access is revoked.
- Comment is reported after deletion or after class archive.
- Student transfers classes while grades and submissions need retention.
- Storage provider is unavailable in the student's region.
- App is offline when student taps turn in; upload completes but final submit does not.

## Test Plan

- Unit tests for class code validation, membership roles, stream policies, topic ordering, assignment state, submission state, grading visibility, guardian summaries, and cloud-token states.
- Contract tests for every documented route, permission errors, idempotency, pagination, async uploads, cloud-provider failures, and privacy request states.
- Integration tests for teacher class creation, student join, stream post, assignment creation, attachment pick/upload, turn-in/unsubmit/resubmit, grading/return, comments, class archive, and guardian summary.
- Cloud tests for OAuth connect/revoke, minimal scopes, expired token, file deleted, permission denied, copy-per-student fallback, provider outage, and local upload fallback.
- Privacy tests for cross-class isolation, guardian revocation, hidden grades, export/delete/legal hold, analytics redaction, support-log redaction, and cache purge.
- Offline/realtime tests for draft preservation, upload retry, cursor reconciliation, duplicate events, timezone changes, delayed push hints, and stale classwork.
- Moderation tests for abusive comments, reported posts, inappropriate attachments, admin audit review, and support escalation.
- Accessibility tests for screen-reader labels, dynamic type, focus order, high contrast, reduced motion, keyboard navigation, tablet layouts, and long-assignment text.
- Manual verification tests: Workspace-like account setup, Drive-like cloud integration, guardian summaries, push payloads, SSO/admin policy, native permissions, and real assignment flows.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- A downstream team can build the V1 without Google trademarks, proprietary Classroom/Drive APIs, screenshots, brand copy, or sample class content.
- Class creation, class codes, stream, classwork, assignments, submissions, grading, comments, calendar, guardian summaries, and cloud attachments have deterministic contracts.
- Student records are class/institution scoped with no content in ads, analytics, push previews, or support logs.
- Cloud integration uses provider-neutral OAuth contracts, minimal scopes, revocation, and policy-gated provider approval.
- Offline, realtime, push, submission, grading, guardian, moderation, and privacy workflows are covered by tests.
- Manual verification blockers remain feature-flagged or launch-blocking until lawful test accounts/devices confirm behavior.

## Open Questions

- Which cloud providers are approved for V1: local uploads only, WebDAV/S3-compatible storage, Dropbox, OneDrive, Google Drive, or institution-hosted storage?
- Is guardian summary support in V1 or deferred until school policy and email-delivery testing are complete?
- Which account types are supported first: personal accounts, school SSO, teacher-created demo schools, or institution-managed tenants?
- How should copied-per-student files be represented when a provider lacks native copy semantics?
- Which SIS/roster import standards belong in V1, if any?
- Are quizzes/forms included in V1 or deferred to a later LMS expansion?

## Build Plan

- Phase 1: implement auth, roles, institution policy shell, class creation, class codes, class list, and membership management.
- Phase 2: add stream posts, classwork/topics, assignments, comments, calendar/to-do, and notification preferences.
- Phase 3: add submission composer, local uploads, provider-neutral cloud attachment contracts, turn-in/unsubmit/resubmit, and grading/return.
- Phase 4: add guardian summaries, co-teacher workflows, admin policies, audit logs, moderation/reporting, and privacy center.
- Phase 5: add offline cache, realtime/push reconciliation, cloud provider adapters, analytics redaction, and accessibility coverage.
- Phase 6: complete school/privacy/legal review, hands-on Workspace/cloud/push verification, native device testing, and rollout readiness.

## Next Steps

- Choose V1 cloud-provider scope and build a lawful demo institution before enabling exact cloud/classroom parity claims.
- Keep guardian summaries, school SSO/admin policy, and exact push/offline behavior behind verification flags until real accounts confirm them.
- Propagate the refreshed canonical spec to the downstream scaffold repo after source-spec synchronization.
