# ABCmouse-Style Clone Spec

> Metadata
> - Inspiration app: ABCmouse
> - Category: Kids education (PreK-2 curriculum)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official ABCmouse/Age of Learning support pages, and public privacy/terms pages.
> - Manual verification blockers: subscription purchase/restore, trial conversion, parental gate, offline downloads, profile switching, progress reports, rewards, push payloads, and cancellation flows require lawful test accounts/devices before one-for-one native parity claims.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, characters, audio, and curriculum content. No proprietary curriculum or characters reuse.

## Overview

Build an original mobile kids-education app inspired by ABCmouse's public workflows: parent-owned subscription/account, child profiles, age/grade learning paths, books, videos, puzzles, songs, creative play, rewards, progress reporting, and offline lessons. COPPA-style review, no child-directed behavioral advertising, and strict adult controls are launch requirements.

## Goals

- Curriculum pathway by age/grade with activities and sequences.
- Library of books, videos, songs, and games (original assets).
- Per-child profiles with progress and rewards.
- Parent dashboard with progress and time controls.
- Offline download of lessons for sessions without connectivity.

## Non-Goals

- Do not copy proprietary characters, curriculum content, brand, or audio.
- Do not target advertising to children.
- Do not collect personal data beyond operational minimums.
- Do not allow open chat or social features.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/abcmouse-classic/id586328581 | Official iOS listing, subscription indicator, age rating, privacy labels, and classic app positioning | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.aofl.abcmouse | Official Android listing, free daily content, subscription disclosures, data safety, and Families Policy indicator | Verified 2026-05-02 |
| ABCmouse Support | https://support.abcmouse.com/ | Official support surface for accounts, subscriptions, child profiles, learning activities, and device issues | Verified 2026-05-02 |
| ABCmouse Privacy Policy | https://www.ageoflearning.com/abc-privacy-current/ | Public child/privacy, data rights, and state-specific privacy posture | Verified 2026-05-02 |
| ABCmouse Terms | https://www.ageoflearning.com/abc-tandc-current/ | Public subscription, account, cancellation, and service terms | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe parent-managed learning for kids ages 2-8 with reading, math, science, music, art, social studies, read-to-me books, videos, songs, puzzles, and creative activities.
- Parent onboarding must create an adult account, handle subscription/trial state, collect consent, and create one or more child profiles.
- Child profiles must enter a kid-safe home without exposing adult credentials, billing, support, external links, or account deletion.
- Learning paths must be age/grade aware, show next recommended activities, and preserve progress across devices when signed in.
- Activity player must support original interactive games, books, read-aloud narration, videos, songs, puzzles, art activities, and completion scoring.
- Parent dashboard must show progress summaries, subject coverage, time spent, recent activity, and profile controls without exposing raw child content unnecessarily.
- Rewards must be non-monetary, in-app only, age-appropriate, and unable to trigger purchases or external sharing from the child surface.
- Offline downloads must be adult-controlled, storage-aware, entitlement-aware, and cleared on profile/account deletion or subscription expiry as policy requires.
- Subscription surfaces must disclose trial, renewal, restore, cancellation, platform ownership, and locked/free daily content states.
- Push notifications must target parent devices for subscription, progress, and account events; no child-targeted marketing payloads.
- Original curriculum, books, songs, videos, art, characters, and reward assets are required; no ABCmouse catalog or characters may be reused.
- COPPA-style privacy posture must minimize child profile data, prohibit behavioral ads, isolate child analytics, and honor export/delete workflows.
- Accessibility must cover read-aloud controls, captions where applicable, dynamic type in parent surfaces, screen-reader labels, reduced motion, and color contrast.

## Core User Journeys

- Parent subscribes, creates child profile, selects age.
- Child signs in to kid-safe home via profile tile (no password for child).
- Child completes an activity; earns tokens.
- Child reads a storybook.
- Parent reviews progress and sets daily time limit.
- Child requests a reward; parent approves (if external).
- Parent downloads lessons for offline use.
- Parent pauses or cancels subscription.
- Child exits session; auto-logout after inactivity.
- Parent deletes child profile.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Parent Onboarding | Account, subscription | email, payment | new | payment fail |
| Child Profiles | Pick profile | tap | populated | none |
| Kid Home | Pathway and library | tap | loaded | offline |
| Activity Player | Play lesson | interactions | running | reward issue |
| Book Reader | Read-along | tap pages | loaded | audio fail |
| Rewards | Virtual store | redeem | populated | locked |
| Parent Dashboard | Progress and controls | view, set | loaded | signed-out |
| Downloads | Offline lessons | download | queued, done | storage full |
| Subscription | Plans, restore | plan | free trial, paid | restore fail |
| Privacy Center | Export, delete profile | actions | idle | pending |
| Parental Gate | Gate adult actions | challenge | pass, fail | skip |
| Support | Contact | form | idle | unavailable |

## Data Model

- `ParentUser`: identity, billing.
- `ChildProfile`: name initials, age, avatar (built-in), progress.
- `Pathway`: age/grade, activity sequence.
- `Activity`: id, type, content reference, duration.
- `Progress`: child, activity, state, score, completed-at.
- `Reward`: virtual tokens.
- `RedemptionItem`: virtual store items.
- `Download`: device, activity, status.
- `TimeRule`: child, daily limit.
- `Entitlement`: plan, platform, state.
- `PrivacySettings`: analytics opt-in.
- `ContentAsset`: original/licensed media, age band, subject, license, version, offline eligibility.
- `LearningPathState`: child, subject, current node, mastery estimate, next recommendation.
- `ParentReport`: period, progress summaries, time totals, skill coverage, generated-at.
- `ParentalGateAttempt`: challenge type, result, adult action, timestamp.
- `NotificationPreference`: parent user, topic, channel, quiet hours.
- `AuditEvent`: billing, privacy, profile changes.

## API And Backend Contracts

- `POST /auth/parent/session`, `DELETE /auth/session`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `GET /pathways/:childId`, `GET /activities/:id`.
- `POST /progress`, `GET /progress?child=&range=`.
- `GET /rewards/:childId`, `POST /rewards/:childId/redeem`.
- `POST /downloads`, `DELETE /downloads/:id`.
- `GET /time-rules`, `PATCH /time-rules`.
- `GET /entitlements`, `POST /billing/checkout`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /data-export`, `DELETE /account`.
- `POST /support/cases`.
- `GET /content/catalog`, `GET /content/:id/assets`: versioned original content delivery.
- `POST /parent-gate/verify`: adult-gated action verification with rate limits.
- `GET /reports/progress?child=&range=`: parent-visible progress summaries.
- `PATCH /notifications/preferences`: parent notification controls.

## Realtime, Push, And Offline Behavior

- Offline play for downloaded lessons.
- Progress sync opportunistic.
- Push for parent dashboard updates (opt-in); never to child profile.
- Session watchdog to trigger inactivity logout.

## Permissions, Privacy, And Safety

- COPPA-style review required; strict no-ads.
- Child profile has no personal identifiers beyond what parent provides.
- Parental gate for all adult actions.
- No external sharing, chat, or user-generated content.
- Third-party analytics excluded from child sessions.
- Accessibility compliance required.
- Launch owner: privacy lead, child-safety lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: activity completed (id), reward earned, session started/ended — never child identifiers.
- Subscription product with free trial; original paywall copy.
- In-app "rewards" are virtual, not monetary; no IAP visible to child.

## Edge Cases

- Subscription lapse mid-session; show friendly locked state.
- Device storage full during download.
- Multiple children on one device.
- Audio permission issues for narration.
- Lesson content updated while downloaded version exists.
- Parental gate bypass attempts.
- Session backgrounded mid-activity.
- Payment method issues.
- Free daily content rotates while a child is offline or mid-activity.
- Parent deletes a child profile while downloads and progress sync are pending.
- Reward balance becomes inconsistent after offline play and server reconciliation.
- Trial expires or refund arrives while a child is in a locked lesson.
- Platform restore reports active entitlement for a different adult account.
- Child attempts to access billing, support, external links, or privacy pages without adult gate.

## Test Plan

- Unit tests for pathway progression, rewards balance, time rules.
- Contract tests for all endpoints.
- Integration tests for subscription, child profile, progress.
- Privacy tests.
- Accessibility tests.
- Billing tests.
- Offline tests.
- Manual verification: parental gate, offline, subscription flow.
- Content tests for original asset licensing flags, age/subject filtering, and versioned downloads.
- Parent-dashboard tests for progress aggregation, multi-child isolation, and report redaction.
- Notification tests for parent-only payloads, quiet hours, opt-in state, and subscription reminders.
- Deletion/export tests for profile removal, account deletion, downloaded content cleanup, and audit retention.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- COPPA-style review is complete and child sessions contain no behavioral ads, open chat, or external links.
- Parent account, subscription/trial/restore, child profiles, pathway, activity player, rewards, progress reports, and offline downloads work end-to-end.
- Original or licensed curriculum/media assets are in place; no ABCmouse characters, copy, songs, videos, or course content are reused.
- Parental gate protects billing, external links, support, privacy, downloads, and account/profile deletion.
- Accessibility, billing, privacy/export/delete, and manual device verification blockers are either resolved or feature-flagged.

## Open Questions

- Curriculum depth for V1.
- Offline-download licensing.
- Regional content variations.
- Translation languages.

## Build Plan

- Phase 1: parent auth, subscription, child profiles.
- Phase 2: pathway, activities, progress.
- Phase 3: library (books/videos/songs), rewards.
- Phase 4: parent dashboard, time rules, offline downloads.
- Phase 5: privacy center, accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Commission COPPA-style and accessibility review.
- Define original curriculum content strategy.
