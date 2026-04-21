# Google Classroom-Style Clone Spec

> Metadata
> - Inspiration app: Google Classroom
> - Category: Learning management (lightweight)
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: Drive-like storage integration, district SSO, subscription (if any), and push behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, and feature names. No proprietary identifiers or ecosystem coupling.

## Overview

Build an original mobile LMS-lite app inspired by Google Classroom: class streams with posts, simple assignments with file turn-in, grading, and a generic cloud-storage integration via OAuth (institution Drive, Dropbox, OneDrive). Designed for teachers and students with minimal friction.

## Goals

- Class creation, class codes, and roster management.
- Class stream with announcements, assignments, and questions.
- Assignment turn-in with cloud-storage integrations.
- Grading with comments.
- Calendar view of due dates.
- SSO via institution identity providers.

## Non-Goals

- Do not imply integration with proprietary ecosystems beyond standard OAuth providers allowed by contract.
- Do not copy trademarks or brand.
- Do not target advertising to students.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/google-classroom/id924620788 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.classroom | Features, data safety | Source discovery — pending exact URL verification |
| Classroom help | https://support.google.com/edu/classroom | Feature how-to | Source discovery — pending exact URL verification |
| Classroom privacy | https://edu.google.com/intl/ALL_us/why-google/privacy-security | Data handling | Source discovery — pending exact URL verification |
| Classroom terms | https://edu.google.com/intl/ALL_us/terms | Terms | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Roles: teacher, student, co-teacher, guardian (optional).
- Class code invite; roster import optional.
- Post types: announcement, assignment, question, material, topic.
- Assignment with due date, points, rubric, attachments from cloud storage.
- Turn-in with file attachments; return with comments.
- Grading view per assignment and per student.
- Calendar of due dates across classes.

## Core User Journeys

- Teacher creates a class and shares class code.
- Students join via code.
- Teacher posts an assignment with Drive/Dropbox/OneDrive attachment.
- Student opens assignment, attaches files from cloud, and turns in.
- Teacher grades and returns with comment.
- Student receives notification of returned work.
- Teacher archives class at year end.
- Guardian (if enabled) receives weekly summary.
- Admin reviews school policies.
- User exports data or deletes account per policy.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Role, class code | code | new | invalid code |
| Classes | List of joined classes | none | populated | empty |
| Stream | Class posts | compose | populated | offline |
| Post Composer | Create post | type, content, attachments | draft, posted | upload fail |
| Assignment Detail | View, turn in | attach, submit | not-started, submitted, returned | late |
| Grading | Teacher view | comment, grade | populated | hidden |
| Calendar | Due dates | range | loaded | empty |
| Classwork | Topic/category view | filter | populated | unavailable |
| Guardian Summary | Weekly digest (opt-in) | none | enabled, disabled | no email |
| Settings And Privacy | Notifications, data | toggles | loaded | signed-out |
| Subscription | Plans (if any), restore | plan | free, paid | restore fail |
| Support | Contact | form | idle | unavailable |

## Data Model

- `User`: identity, role, locale.
- `Institution`: optional, SSO config.
- `Class`: teacher, co-teachers, code, archive state.
- `Membership`: user, class, role.
- `Post`: class, kind, content, attachments, topic, state.
- `Assignment`: post, due date, points, rubric.
- `Submission`: student, assignment, attachments, status, score, comments.
- `CloudIntegration`: user, provider, tokens, scopes.
- `GuardianLink`: student, guardian, email, schedule.
- `PrivacySettings`: analytics, notifications.
- `AuditEvent`: privacy, roles, billing.

## API And Backend Contracts

- `POST /auth/sso/:institutionId`, `DELETE /auth/session`.
- `POST /classes`, `POST /classes/:id/invites`, `POST /invites/:code/accept`.
- `GET /classes/:id/stream`, `POST /classes/:id/posts`, `PATCH /posts/:id`, `DELETE /posts/:id`.
- `GET /assignments/:id`, `POST /submissions`, `POST /submissions/:id/attach`, `POST /submissions/:id/turn-in`, `POST /submissions/:id/return`.
- `GET /calendar?range=`.
- `POST /integrations/cloud/connect`, `DELETE /integrations/cloud/:id`.
- `POST /guardian-links`, `DELETE /guardian-links/:id`.
- `POST /data-export`, `DELETE /account`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Push for new posts, returned work, upcoming due dates.
- Offline drafts and downloaded attachments.
- Cloud attachments link by reference; content fetched on demand.

## Permissions, Privacy, And Safety

- FERPA-adjacent scoping; institution governs retention.
- COPPA-style review for under-13 students; no behavioral ads.
- Cloud integrations use OAuth with minimal scopes.
- Guardian summaries opt-in per institution policy.
- Accessibility compliance required.
- Launch owner: privacy lead, education-product lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: class created, assignment posted, submission turned in, grade returned.
- No post/submission content in analytics.
- Typically free; no advertising.

## Edge Cases

- Cloud provider token expired.
- Large attachment download on mobile data.
- Student submits after due date.
- Teacher deletes post with submissions; preserve history.
- Multi-teacher conflicts.
- Guardian email bounces.
- Roster import with duplicates.
- Region without a supported cloud provider.

## Test Plan

- Unit tests for post-type state, submission state, guardian summary scheduling.
- Contract tests for all endpoints.
- Integration tests for class, post, submission, grading.
- Privacy tests.
- Accessibility tests.
- Manual verification: SSO, cloud OAuth, push.

## Acceptance Criteria

- Class stream, assignments, turn-in, and grading work end-to-end.
- At least one cloud integration functional.
- FERPA/COPPA review complete.
- Accessibility compliance confirmed.

## Open Questions

- Cloud provider set for V1.
- Guardian feature scope.
- SIS/roster import standards supported.
- Offline scope.

## Build Plan

- Phase 1: auth, class, stream, invite.
- Phase 2: posts and assignments.
- Phase 3: submissions and grading.
- Phase 4: calendar, guardian, cloud integrations.
- Phase 5: privacy center, accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Select cloud providers for V1.
- Commission FERPA/COPPA review.
