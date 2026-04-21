# ABCmouse-Style Clone Spec

> Metadata
> - Inspiration app: ABCmouse
> - Category: Kids education (PreK-2 curriculum)
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: subscription/entitlement flows, offline content download, and parental-gate behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, characters, audio, and curriculum content. No proprietary curriculum or characters reuse.

## Overview

Build an original mobile kids-education app inspired by ABCmouse: guided PreK-2 curriculum with activities, books, videos, puzzles, and songs; progress tracking; rewards; and parent dashboard. COPPA-style review required; no behavioral advertising and strict parental controls.

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
| Apple App Store | https://apps.apple.com/us/app/abcmouse-reading-math-more/id586328581 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=mobi.ageofLearning.abcmouse | Features, data safety | Source discovery — pending exact URL verification |
| ABCmouse help | https://help.abcmouse.com | Feature how-to | Source discovery — pending exact URL verification |
| ABCmouse privacy | https://www.abcmouse.com/abt/privacy | Data handling, COPPA | Source discovery — pending exact URL verification |
| ABCmouse terms | https://www.abcmouse.com/abt/termsofservice | Terms | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Parent-owned account with multiple child profiles.
- Per-child curriculum pathway adaptive by age.
- Activities across reading, math, science, art, music.
- Rewards system with virtual tokens redeemed for in-app items (non-monetary).
- Time controls and progress reports for parents.
- Offline lesson download.

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

## Test Plan

- Unit tests for pathway progression, rewards balance, time rules.
- Contract tests for all endpoints.
- Integration tests for subscription, child profile, progress.
- Privacy tests.
- Accessibility tests.
- Billing tests.
- Offline tests.
- Manual verification: parental gate, offline, subscription flow.

## Acceptance Criteria

- COPPA-style review complete.
- Parental gate, subscription, and offline download functional.
- Accessibility confirmed.
- No ads or behavioral tracking against children.

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
