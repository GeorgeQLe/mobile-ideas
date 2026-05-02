# Epic!-Style Clone Spec

> Metadata
> - Inspiration app: Epic!
> - Category: Kids reading (books, audiobooks, videos)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official Epic support/help pages, and public privacy/terms pages.
> - Manual verification blockers: native capture, subscription purchase/restore, classroom login flows, offline downloads, and push payloads require hands-on verification.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Book, audiobook, and video catalog must be licensed; no proprietary content reuse. COPPA-style review required before launch.

## Overview

Build an original mobile kids-reading app inspired by Epic!: children's book, audiobook, and video subscription with reading logs, quizzes, and classroom teacher accounts. COPPA-aligned data handling; no behavioral advertising; strict parental/teacher controls.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Library of licensed children's books, audiobooks, and videos.
- Per-child reading log and badges.
- Parent and teacher accounts with class/roster management.
- Subscription gating for families; free tier for classrooms (inferred, verify).
- Offline download of content for trips.

## Non-Goals

- Do not copy proprietary characters, brand, or catalog metadata.
- Do not target advertising to children.
- Do not collect personal data beyond operational minimums.
- Do not allow open chat or social features between kids.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/epic-kids-books-reading/id719219382 | Official iOS listing, subscription indicator, privacy labels, and public catalog/reading feature framing | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.getepic.Epic | Official Android listing, books/audiobooks/videos, downloads, family subscription, school tier, data safety, and Families Policy indicator | Verified 2026-05-02 |
| Epic Help Center | https://help.getepic.com/ | Official support surface for family, educator, subscription, classroom, reading, and device flows | Verified 2026-05-02 |
| Epic Privacy Policy | https://www.getepic.com/privacy | Public privacy posture for children, families, educators, data rights, and retention | Verified 2026-05-02 |
| Epic Terms | https://www.getepic.com/tos | Public account, subscription, school, catalog, and service terms | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Parent-owned and teacher-owned accounts with child/student profiles.
- Library of books, audiobooks, and videos; search and category browse.
- Reading log and quizzes with badges.
- Classroom roster management for teachers.
- Subscription for family accounts; school tier handling (inferred, verify).
- Offline downloads.
- Licensed catalog ingestion must represent publisher, format, age band, reading level, locale/language, license window, offline eligibility, and removal rules.
- Search and browse must support category, subject, level, language, format, educator filters, and safe empty states.
- Family subscription and school access must be separate entitlement modes with clear time-of-day/school-day limitations where applicable.
- Reading tools may include read-to-me, audiobooks, dictionary/word help, quizzes, collections, assignments, and badges using original or licensed content only.
- Teacher/classroom flows must include verified educator onboarding, roster management, assignment sharing, progress reports, and student privacy controls.
- Push notifications must target parents/teachers for reading reminders, assignments, subscription/account events, and never include sensitive child reading details by default.
- COPPA/FERPA-adjacent review is required for family-child profiles, school rosters, assignments, reading logs, and teacher reports.
- Accessibility must support readable typography, read-aloud controls, captions/transcripts where applicable, audio controls, screen-reader navigation, and dyslexia-friendly display options.

## Core User Journeys

- Parent subscribes and creates child profiles.
- Child picks profile and opens the kid-safe library.
- Child reads a book; reading log updates.
- Child takes a quiz and earns a badge.
- Teacher imports a class roster and assigns a collection.
- Parent reviews reading progress and adjusts reading level.
- Parent downloads books for a trip.
- Parent pauses/cancels subscription.
- Teacher removes a student from the class.
- Parent deletes an account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Parent Onboarding | Account, subscription | email, payment | new | payment fail |
| Teacher Onboarding | Verify school affiliation | email, verification | new, pending | verification fail |
| Child/Student Profiles | Pick profile | tap | populated | none |
| Kid Home | Featured and categories | tap | loaded | offline |
| Book Reader | Read-along | tap pages | loaded | audio fail |
| Audiobook Player | Listen | play/seek | playing | stream fail |
| Video Player | Watch | play/seek | playing | stream fail |
| Quiz | Answer questions | select | running | grading fail |
| Reading Log | Progress and badges | view | loaded | signed-out |
| Classroom | Roster and assignments | add, assign | loaded | seat limit |
| Subscription | Plans, restore | select | free, paid | platform mismatch |
| Downloads | Offline content | download | queued, done | storage full |
| Parental Gate | Gate adult actions | challenge | pass, fail | skip |
| Privacy Center | Export, delete | actions | idle | pending |

## Data Model

- `ParentUser`: identity, billing.
- `TeacherUser`: identity, verification state.
- `ChildProfile` / `StudentProfile`: initials, age/grade, reading level, progress.
- `Classroom`: teacher, name, seat count, roster.
- `Assignment`: classroom, content ref, due-at.
- `ContentItem`: id, type (book|audiobook|video), license, metadata, age band.
- `ReadingLog`: profile, item, minutes, completion, last-position.
- `Badge`: id, criteria.
- `Download`: device, item, status.
- `Entitlement`: plan, platform, state.
- `CatalogLicense`: publisher/provider, content scope, territory, offline rights, expiration, takedown state.
- `Collection`: curated list, owner, audience, content items, assignment eligibility.
- `QuizAttempt`: profile, quiz, answers, score, feedback, completed-at.
- `VocabularyLookup`: profile, item, word, locale, shown-at, privacy-safe retention.
- `TeacherReport`: classroom, period, reading minutes, completion, assignment status.
- `NotificationPreference`: parent/teacher topic, channel, quiet hours.
- `AuditEvent`: billing, privacy, profile changes.

## API And Backend Contracts

- `POST /auth/parent/session`, `POST /auth/teacher/session`, `DELETE /auth/session`.
- `POST /profiles`, `PATCH /profiles/:id`, `DELETE /profiles/:id`.
- `GET /library`, `GET /content/:id`, `GET /search?q=`.
- `POST /reading-log`, `GET /reading-log?profile=&range=`.
- `POST /quizzes/:id/submit`.
- `POST /classrooms`, `PATCH /classrooms/:id`, `POST /classrooms/:id/roster`, `POST /classrooms/:id/assignments`.
- `POST /downloads`, `DELETE /downloads/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /data-export`, `DELETE /account`.
- `POST /support/cases`.
- `GET /collections`, `POST /collections`, `POST /collections/:id/assign`.
- `GET /reports/reading?profile=&range=`, `GET /reports/classroom/:id`.
- `GET /licenses/:contentId`, `POST /catalog/takedowns`.
- `POST /vocabulary/lookups`, `GET /badges/:profileId`.
- `PATCH /notifications/preferences`.

## Realtime, Push, And Offline Behavior

- Offline reading/listening/watching for downloaded items.
- Progress sync opportunistic; last-write-wins per item.
- Push only to parent/teacher device (weekly digest, assignment reminders); never to child profile.
- Content license updates may expire downloaded items; handle gracefully.
- Session watchdog triggers inactivity logout.

## Permissions, Privacy, And Safety

- COPPA-aligned review required before launch.
- No third-party advertising or behavioral tracking for under-13.
- Parental consent flow at account creation; age gate during sign-up.
- School/teacher accounts follow FERPA-aligned practices for US classroom use.
- Child/student profile contains minimal identifiers (initials, age/grade).
- Parental gate for all adult actions.
- No open chat or social features between kids.
- Catalog moderation: age-band filtering and content review.
- Accessibility: dynamic type, captions for videos, read-along highlighting, reduced motion.
- Launch owner: privacy lead, child-safety lead, accessibility owner, legal counsel.

## Analytics And Monetization

- Privacy-safe events only: content opened (id), reading minutes bucketed, badge earned, subscription state changed — never child identifiers or behavioral profiles.
- Monetization via family subscription; classroom tier (inferred).
- Original paywall copy; restore-purchase supported.
- No ads.

## Edge Cases

- Device storage full during download.
- Multiple children on one device; fast profile switch.
- Subscription lapse mid-session; show friendly locked state.
- Assignment due while student offline.
- Content license expired; hide item with notice.
- Classroom seat limit reached; block add with message.
- Parental gate bypass attempts.
- Account deletion with active classroom.
- Family subscription allows home access but school entitlement is limited by policy/time window.
- Publisher license expires while an item is downloaded, assigned, or mid-read.
- Teacher assignment includes content unavailable to a student's region, level, or entitlement.
- Reading log sync conflicts after offline reading on two devices.
- Parent and teacher both request export/delete for the same child/student profile.
- Dictionary, quiz, or read-to-me asset missing for a licensed book.

## Test Plan

- Unit tests for reading log, quiz grading, badge rules.
- Contract tests for all endpoints.
- Integration tests for profile-read-progress, classroom-assign-complete.
- COPPA-style privacy tests.
- Accessibility tests.
- Billing tests.
- Offline tests.
- Classroom-role tests (teacher vs parent permissions).
- Manual verification: native captures, purchase/restore, offline, classroom login.
- Catalog-license tests for territory, expiration, takedown, offline rights, and assignment restrictions.
- Search/filter tests for age band, reading level, language, format, educator filters, and safe no-results states.
- Reporting tests for parent dashboard, teacher classroom reports, assignment completion, and redacted exports.
- Notification tests for parent/teacher-only payloads, reminders, quiet hours, and assignment notifications.
- Deletion/export tests across family profiles, classroom profiles, reading logs, downloads, and license records.
- Manual verification: native captures, purchase/restore, offline downloads, classroom login, school-day access, reading tools, and push payloads.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- COPPA-style and FERPA-adjacent reviews are complete for family profiles, classrooms, reading logs, and educator reports.
- Licensed catalog, search/browse, reader/player, quizzes, badges, reading logs, assignments, subscription, and offline flows work end-to-end.
- Original UI/copy and licensed metadata/content replace all Epic branding, private catalog data, and protected assets.
- Family subscription and educator access are clearly separated with deterministic entitlement, restore, expiry, and school-policy states.
- Accessibility, billing, classroom, push, export/delete, and license-expiry blockers are resolved or feature-flagged.

## Open Questions

- Content licensing partners for V1.
- FERPA scope for classroom tier.
- Subscription tier pricing and trial structure.
- International availability.

## Build Plan

- Phase 1: parent/teacher auth, profiles, library browse.
- Phase 2: readers/players (book/audio/video).
- Phase 3: reading log, quizzes, badges.
- Phase 4: classrooms, rosters, assignments.
- Phase 5: subscription, entitlements, webhooks, offline downloads.
- Phase 6: privacy, accessibility, legal review, manual verification.

## Next Steps

- Verify URLs.
- Sign licensing agreements for V1 catalog.
- Commission COPPA-style and accessibility review.
