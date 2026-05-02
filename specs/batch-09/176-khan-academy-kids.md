# Khan Academy Kids-Style Clone Spec

> Metadata
> - Inspiration app: Khan Academy Kids
> - Category: Kids learning (PreK-2)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official Khan Academy Kids/support pages, and public privacy/terms pages.
> - Manual verification blockers: native capture, offline content download, parental-gate behavior, and push payloads require hands-on verification.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, illustrations, characters, audio, and curriculum content. No proprietary curriculum or characters reuse. COPPA-style review required before launch.

## Overview

Build an original mobile kids-learning app inspired by Khan Academy Kids: free adaptive PreK-2 lessons across reading, math, social-emotional learning, plus stories and creative play. COPPA-aligned data handling; no behavioral advertising; strict parental controls.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Free adaptive lesson pathway for ages 2-8 across literacy, math, and SEL.
- Library of stories (original), videos, and creative activities.
- Per-child profiles with adaptive progression.
- Parent dashboard with progress and usage controls.
- Offline download of lessons.

## Non-Goals

- Do not copy proprietary characters, curriculum content, brand, or audio.
- Do not target advertising to children.
- Do not collect personal data beyond operational minimums.
- Do not allow open chat, social features, or user-generated content visible to others.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/khan-academy-kids/id1378467217 | Official iOS listing, age rating, free/ad-free positioning, privacy labels, and public feature framing | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=org.khankids.android | Official Android listing, Teacher Approved badge, free/no ads/no subscriptions framing, activities/books/videos, and data safety | Verified 2026-05-02 |
| Khan Academy Kids Support | https://support.khankids.org/ | Official help center for families, teachers, account/profile, lessons, and device support | Verified 2026-05-02 |
| Khan Academy Privacy Policy | https://www.khanacademy.org/about/privacy-policy | Public privacy posture, child/account data handling, rights, and service boundaries | Verified 2026-05-02 |
| Khan Academy Terms | https://www.khanacademy.org/about/tos | Public usage, account, content, and service terms | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Parent-owned account with multiple child profiles.
- Per-child adaptive pathway by age.
- Activities across reading, math, SEL, and creative play.
- Library of stories, videos, and songs.
- Time controls and progress reports for parents.
- Offline download of lessons.
- Fully free (no IAP exposed to child); optional parent-side donations.
- Parent/teacher surfaces must stay separate from the child surface and protect account, privacy, support, and external-link actions behind adult gates.
- Lesson recommendations must be explainable enough for caregivers and teachers to understand progression without exposing sensitive child profiling.
- Original or licensed books, videos, characters, music, and learning activities are required; public references to partner content are evidence of content types, not reusable assets.
- Teacher/classroom use must support roster, class code, assignment/progress visibility, and school-data retention controls only after hands-on account verification.
- Microphone or speech-practice features are optional and must default to explicit consent, local processing where possible, and no raw-audio analytics.
- Offline downloads must be adult-controlled, versioned, storage-aware, and reconciled with progress sync on reconnect.
- Accessibility must cover read-aloud controls, captions, screen-reader labels, large targets, reduced motion, and high-contrast child UI.

## Core User Journeys

- Parent creates account, adds child profile with age.
- Child picks profile tile (no password for child).
- Child completes activity; adaptive next step chosen.
- Child listens to a story.
- Parent reviews progress report weekly.
- Parent sets daily time limit.
- Parent downloads lessons for travel.
- Parent deletes a child profile.
- Session ends via inactivity timeout.
- Parent signs in on second device and syncs.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Parent Onboarding | Account setup | email, age confirmation | new | region block |
| Child Profiles | Pick profile | tap | populated | none |
| Kid Home | Pathway and library | tap | loaded | offline |
| Activity Player | Play lesson | interactions | running | asset failure |
| Story Reader | Read-along | tap pages | loaded | audio fail |
| Creative Play | Drawing/coloring | interactions | running | save fail |
| Parent Dashboard | Progress and controls | view, set | loaded | signed-out |
| Downloads | Offline lessons | download | queued, done | storage full |
| Parental Gate | Gate adult actions | challenge | pass, fail | skip |
| Privacy Center | Export, delete profile | actions | idle | pending |
| Settings | Account, notifications | toggles | loaded, signed-out | managed |
| Support | Contact | form | idle | unavailable |

## Data Model

- `ParentUser`: identity, consent, locale.
- `ChildProfile`: initials, age, avatar (built-in), progress.
- `Pathway`: age, adaptive state, next-activity pointer.
- `Activity`: id, type, content reference, duration, skill tag.
- `Progress`: child, activity, state, score, completed-at.
- `StoryItem`: id, title, narration ref, reading level.
- `Download`: device, activity, status.
- `TimeRule`: child, daily limit.
- `PrivacySettings`: analytics opt-in (parent-set, off by default for child).
- `TeacherUser`: verified educator identity, class ownership, support state.
- `Classroom`: teacher, roster, class code, assignments, retention policy.
- `Assignment`: classroom, activity/story set, due window, assigned children.
- `ContentAsset`: original/licensed activity/book/video/audio asset, age band, locale, version.
- `ParentReport`: generated progress summary, period, skill coverage, redaction state.
- `ConsentRecord`: parent/teacher consent, child scope, feature, effective window.
- `AuditEvent`: privacy, profile, settings changes.

## API And Backend Contracts

- `POST /auth/parent/session`, `DELETE /auth/session`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `GET /pathways/:childId`, `POST /pathways/:childId/advance`.
- `GET /activities/:id`, `GET /stories/:id`.
- `POST /progress`, `GET /progress?child=&range=`.
- `POST /downloads`, `DELETE /downloads/:id`.
- `GET /time-rules`, `PATCH /time-rules`.
- `POST /data-export`, `DELETE /account`.
- `POST /support/cases`.
- `POST /teachers/session`, `POST /classrooms`, `POST /classrooms/:id/roster`, `POST /classrooms/:id/assignments`.
- `GET /reports/progress?child=&range=`, `GET /reports/classroom/:id`.
- `GET /content/catalog`, `GET /content/:id/assets`.
- `PATCH /settings/privacy`, `PATCH /notifications/preferences`.
- `POST /consents`, `DELETE /consents/:id`.

## Realtime, Push, And Offline Behavior

- Offline play for downloaded lessons.
- Progress sync opportunistic; last-write-wins per activity.
- Push only to parent device (weekly progress digest opt-in); never to child profile.
- Session watchdog triggers inactivity logout.
- Content updates versioned; downloads refreshed on next connection.

## Permissions, Privacy, And Safety

- COPPA-aligned review required before launch.
- No third-party advertising or behavioral tracking for under-13.
- Parental-consent flow at account creation; age gate during parent sign-up.
- Child profile contains no personal identifiers beyond parent-supplied initials/age.
- Parental gate for all adult actions (settings, deletion, external links).
- No external sharing, chat, or UGC visible to other users.
- Microphone used only for in-lesson speech practice with explicit consent and local processing where possible.
- Accessibility compliance required (dynamic type, captions for narration, reduced motion).
- Launch owner: privacy lead, child-safety lead, accessibility owner, legal counsel.

## Analytics And Monetization

- Privacy-safe events only: activity completed (id), session started/ended, download completed — never child identifiers or behavioral profiles.
- Fully free; no IAP visible to child.
- Optional parent-side donation flow (adult-only, behind parental gate).
- No ads.

## Edge Cases

- Device storage full during download.
- Multiple children on one device; fast profile switch.
- Audio/narration asset failure; visual fallback.
- Lesson content updated while offline download exists.
- Parental gate bypass attempts; fail-safe block.
- Session backgrounded mid-activity; resume.
- Microphone permission denied during speech activity.
- Account deletion with active downloads.
- Teacher roster import conflicts with parent-owned child profiles.
- Child switches profile during an adaptive recommendation update.
- Free content service outage on first launch; app must show cached/offline fallback where available.
- Donation or external support link is tapped from child surface; adult gate blocks it.
- Speech-practice audio capture starts while microphone permission is revoked or shared by another app.
- Classroom assignment is removed while child is offline completing it.

## Test Plan

- Unit tests for pathway adaptation, time rules, download lifecycle.
- Contract tests for all endpoints.
- Integration tests for profile-pathway-progress, offline-download-play.
- COPPA-style privacy tests (no PII leakage, no behavioral tracking).
- Accessibility tests (dynamic type, captions, reduced motion).
- Offline tests for downloaded play and progress sync.
- Parental-gate tests.
- Manual verification: native captures, offline, parental gate, progress digests.
- Classroom tests for teacher signup, roster/class code, assignment, progress visibility, and child/parent isolation.
- Content tests for original/licensed asset metadata, age filters, locale fallback, and versioned download refresh.
- Consent tests for child profile creation, teacher classroom use, microphone/speech, notifications, export, and deletion.
- Notification tests for parent/teacher-only payloads and no child-directed marketing.
- Manual verification: native captures, offline, parental gate, classroom flows, teacher progress views, push payloads, and any speech practice.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- COPPA-style review is complete and documented; no ads, subscriptions, open chat, or behavioral tracking target children.
- Parent/teacher account, child profile, adaptive pathway, activity/story/video library, progress reporting, and offline download flows work end-to-end.
- Original or licensed curriculum, characters, stories, videos, music, and learning assets replace all protected Khan Academy Kids content.
- Parental/adult gates protect external links, support, privacy, donations, teacher setup, exports, and deletion.
- Accessibility, classroom, push, offline, and speech-practice blockers are resolved or feature-flagged with dated evidence.

## Open Questions

- Curriculum depth for V1.
- Translation languages in V1.
- Regional content variations.
- Speech-recognition on-device vs server.

## Build Plan

- Phase 1: parent auth, child profiles, kid home.
- Phase 2: adaptive pathway, activities, progress.
- Phase 3: stories, creative play, library.
- Phase 4: parent dashboard, time rules, downloads.
- Phase 5: privacy center, accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Commission COPPA-style and accessibility review.
- Define original curriculum content strategy.
