# ClassDojo-Style Clone Spec

> Metadata
> - Inspiration app: ClassDojo
> - Category: School communication
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: school admin onboarding, district integration, subscription (if any), and push behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, avatars, sample data, and feature names. No proprietary content reuse.

## Overview

Build an original mobile school-community app inspired by ClassDojo: teachers run a classroom feed, message parents, collect student portfolios, and award behavior points with parent visibility. Role separation across teacher/parent/student, with FERPA-adjacent student-data handling and strong moderation.

## Goals

- Classroom feed with photos/videos from teachers to parents.
- Parent-teacher messaging with translation.
- Student portfolios for artifacts and assessments.
- Behavior points/skills tracking visible to parent and student.
- Role-based permissions and district/school admin oversight.

## Non-Goals

- Do not target advertising to students.
- Do not copy proprietary characters/avatars/brand.
- Do not expose student data cross-classroom without authorization.
- Do not operate outside FERPA-adjacent expectations for student-data privacy.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/classdojo/id552602056 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.classdojo.android | Features, data safety | Source discovery — pending exact URL verification |
| ClassDojo help | https://classdojo.zendesk.com | Feature how-to | Source discovery — pending exact URL verification |
| ClassDojo privacy | https://www.classdojo.com/privacy | Student-data handling | Source discovery — pending exact URL verification |
| ClassDojo terms | https://www.classdojo.com/terms | Account terms | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Three roles: teacher, parent, student; differing permissions.
- Classroom creation by teacher; parent/student onboarding via invite code.
- Feed posts (teacher-authored), with photos/videos limited to class audience.
- Messaging with translation support; message recall/hide by teacher.
- Student portfolio entries with teacher/student contribution.
- Behavior/skill points; redeemable for class rewards.
- District/school admin oversight optional; FERPA agreements.

## Core User Journeys

- Teacher creates classroom, generates parent invite codes.
- Parent joins classroom via code; sees feed.
- Teacher posts a photo update; parents receive notification.
- Parent messages teacher; translated in recipient language.
- Student logs in (age-appropriate), submits a portfolio item.
- Teacher awards points; parent and student view.
- Teacher archives classroom at year end; data retention applies.
- Parent manages multiple children across classrooms.
- Admin reviews a reported post.
- Parent exports or deletes student data per school policy.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Role selection, invite | role, code | new | invalid code |
| Classroom Feed | Posts from teacher | react | populated, empty | offline |
| Post Composer (Teacher) | Create feed post | text, media | draft, posted | upload fail |
| Messages | Direct messaging | text, attachments | loaded | translation fail |
| Student Portfolio | Artifacts | upload | loaded | approval pending |
| Points/Skills | Award and view | increment | loaded | locked by admin |
| Admin Console | Oversight for school | reports | loaded | unavailable |
| Reports | Flag posts/messages | reason | submitted | auto-handled |
| Settings | Account, notifications, privacy | toggles | loaded | signed-out |
| Privacy Center | Export, delete student data | actions | idle | pending |
| Subscription | Plans (if any), restore | plan | free, paid | restore fail |
| Support | Contact, help | form | idle | unavailable |

## Data Model

- `User`: identity, role, region, locale.
- `School`: optional, admin list, policies.
- `Classroom`: teacher, school, students, parents, invite codes, archive state.
- `Post`: classroom, author, content, media, audience, state.
- `Message`: sender, recipient, body, translation pair.
- `PortfolioEntry`: student, classroom, content, teacher comments.
- `Point`: student, category, value, awarded-by, note.
- `Report`: target, reason, status.
- `PrivacySettings`: per-student consent state, analytics opt-in.
- `AuditEvent`: moderation, privacy, role changes, billing.
- `Entitlement`: plan, platform (if paid).

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /classrooms`, `POST /classrooms/:id/invites`, `POST /invites/:code/accept`.
- `GET /classrooms/:id/posts`, `POST /classrooms/:id/posts`, `PATCH /posts/:id`, `DELETE /posts/:id`.
- `GET /messages`, `POST /messages`, `PATCH /messages/:id`.
- `GET /portfolios/:studentId`, `POST /portfolios/:studentId/entries`.
- `GET /points/:studentId`, `POST /points/:studentId`.
- `POST /reports`.
- `GET /settings/privacy`, `PATCH /settings/privacy`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Real-time feed and message updates via websocket.
- Offline drafts for teacher posts and messages.
- Push for new posts, messages, approvals; payloads generic.
- Media uploads resumable.

## Permissions, Privacy, And Safety

- FERPA-adjacent handling: student data scoped to classroom; admin/district governs retention and export.
- COPPA-style review for students under 13.
- No advertising to students.
- Moderation: reporting, teacher can delete posts/messages, admin can intervene.
- Parent consent required for student participation per school policy.
- Post retention configurable at school or classroom level.
- Launch owner: privacy lead, education-product lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: classroom created, post created, message sent, point awarded.
- No post/message content in analytics.
- Core product free to schools; optional premium with original paywall copy, not targeted at students.

## Edge Cases

- Student switches classrooms mid-year.
- Teacher leaves school; archive and handoff.
- Abusive messages; moderation and admin escalation.
- Parent custody disputes; data-access rules.
- District overrides classroom settings.
- Translation service failure; fallback message.
- Student under 13 direct sign-in; require parental consent.
- Media upload with face recognition risks; default off.

## Test Plan

- Unit tests for role permissions, classroom lifecycle, point calculation.
- Contract tests for all endpoints.
- Integration tests for invite, post, message, portfolio.
- Privacy tests: student data scoping, export, delete.
- Moderation tests.
- Billing tests (if applicable).
- Offline tests.
- Accessibility tests.
- Manual verification: teacher onboarding, admin oversight, push.

## Acceptance Criteria

- Role separation enforced.
- FERPA-adjacent student-data scoping implemented.
- COPPA-style review complete.
- Moderation and admin oversight functional.
- Export and deletion accessible.

## Open Questions

- District onboarding model and contracting.
- Scope of translation languages in V1.
- Student account lifecycle policy.
- Monetization scope.

## Build Plan

- Phase 1: role auth, classroom, feed, invites.
- Phase 2: messaging, translation, portfolio.
- Phase 3: points, admin console, moderation.
- Phase 4: privacy center, export/delete.
- Phase 5: subscription (if any), accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Commission FERPA-adjacent and COPPA-style review.
- Define district onboarding model.
