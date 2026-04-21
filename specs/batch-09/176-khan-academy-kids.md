# Khan Academy Kids-Style Clone Spec

> Metadata
> - Inspiration app: Khan Academy Kids
> - Category: Kids learning (PreK-2)
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help-center pages observed during source discovery.
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
| Apple App Store | https://apps.apple.com/us/app/khan-academy-kids/id1378467217 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=org.khankids.android | Source discovery — pending exact URL verification | Pending |
| Khan Academy Kids Help | https://support.khankids.org | Source discovery — pending exact URL verification | Pending |
| Khan Academy Privacy | https://www.khanacademy.org/about/privacy-policy | Source discovery — pending exact URL verification | Pending |
| Khan Academy Terms | https://www.khanacademy.org/about/tos | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Parent-owned account with multiple child profiles.
- Per-child adaptive pathway by age.
- Activities across reading, math, SEL, and creative play.
- Library of stories, videos, and songs.
- Time controls and progress reports for parents.
- Offline download of lessons.
- Fully free (no IAP exposed to child); optional parent-side donations.

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

## Test Plan

- Unit tests for pathway adaptation, time rules, download lifecycle.
- Contract tests for all endpoints.
- Integration tests for profile-pathway-progress, offline-download-play.
- COPPA-style privacy tests (no PII leakage, no behavioral tracking).
- Accessibility tests (dynamic type, captions, reduced motion).
- Offline tests for downloaded play and progress sync.
- Parental-gate tests.
- Manual verification: native captures, offline, parental gate, progress digests.

## Acceptance Criteria

- Exact source URLs verified.
- COPPA-style review complete and documented.
- Parental gate, offline download, and progress reporting functional.
- Accessibility confirmed.
- No ads or behavioral tracking against children.

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
