# YouTube Kids-Style Clone Spec

> Metadata
> - Inspiration app: YouTube Kids
> - Category: Kids video
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help-center pages observed during source discovery.
> - Manual verification blockers: native capture, parental controls, timer behavior, content moderation escalation, and push payloads require hands-on verification.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Video catalog must be licensed or creator-submitted under original terms; no proprietary content reuse. COPPA-style review required before launch.

## Overview

Build an original mobile kids-video app inspired by YouTube Kids: age-tiered video library, parental controls, timer, approved-content mode, and creator profile pages. COPPA-aligned data handling; no behavioral advertising; strict parental controls.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Age-tiered video library (e.g., Preschool, Younger, Older) with original categories.
- Parental controls: content mode, timer, block/approve videos and creators.
- Per-child profiles.
- Creator profile pages with curated content.
- Offline download for subscribers (if included).

## Non-Goals

- Do not copy proprietary branding, catalog metadata, or private APIs.
- Do not target advertising to children.
- Do not allow open comments/chat between kids.
- Do not collect personal data beyond operational minimums.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/youtube-kids/id936971630 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.kids | Source discovery — pending exact URL verification | Pending |
| YouTube Kids Help | https://support.google.com/youtubekids | Source discovery — pending exact URL verification | Pending |
| YouTube Kids Privacy Notice | https://kids.youtube.com/privacynotice | Source discovery — pending exact URL verification | Pending |
| YouTube Kids Terms | https://kids.youtube.com/t/terms | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Parent-owned account with child profiles; per-profile age tier.
- Content modes: broad curated library, parent-approved-only, search on/off.
- Timer with lockout after limit.
- Block video or creator.
- Creator profile pages (licensed/submitted creators only).
- Activity insights for parents (what the child watched).
- Offline downloads for subscription tier (inferred).

## Core User Journeys

- Parent creates account, adds child profile with age.
- Parent picks a content mode and timer.
- Child picks profile and browses library.
- Child watches a video.
- Parent blocks a video/creator from the parent menu.
- Parent reviews activity.
- Parent switches to approved-only mode and curates a list.
- Parent manages subscription for offline downloads.
- Session ends at timer lockout.
- Parent deletes a child profile.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Parent Onboarding | Account, age confirmation | email | new | region block |
| Content Mode Setup | Pick mode and age tier | select | configured | skipped |
| Child Profiles | Pick profile | tap | populated | none |
| Kid Home | Categories and shelves | tap | loaded | offline |
| Video Player | Watch | play/seek | playing | stream fail |
| Creator Profile | Creator page and videos | tap | loaded | unavailable |
| Search | Query (if enabled) | type | enabled, disabled | no results |
| Timer/Lockout | Time's up | dismiss | active, locked | bypass attempt |
| Parent Menu | Controls | parental gate | unlocked | failed |
| Activity Insights | History per child | view | loaded | signed-out |
| Approved List | Curate videos/creators | add, remove | empty, populated | sync conflict |
| Subscription | Plans, restore | select | free, paid | platform mismatch |
| Privacy Center | Export, delete | actions | idle | pending |

## Data Model

- `ParentUser`: identity, consent, locale.
- `ChildProfile`: initials, age tier, mode, timer rule.
- `ContentMode`: broad, approved-only; search toggle.
- `TimerRule`: child, daily limit.
- `VideoItem`: id, title, creator, age tier, duration, license state.
- `CreatorProfile`: id, name, metadata.
- `Approval`: child, video or creator, allowed/blocked.
- `ActivityLog`: child, video, watched-at, duration.
- `Download`: device, video, status.
- `Entitlement`: plan, platform, state.
- `AuditEvent`: parental-control and privacy changes.

## API And Backend Contracts

- `POST /auth/parent/session`, `DELETE /auth/session`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `GET /home/:childId`, `GET /videos/:id`, `GET /creators/:id`.
- `GET /search?q=&child=` (when enabled).
- `POST /approvals`, `DELETE /approvals/:id`.
- `GET /activity?child=&range=`.
- `GET /timer-rules`, `PATCH /timer-rules`.
- `POST /downloads`, `DELETE /downloads/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /data-export`, `DELETE /account`.
- `POST /reports` (flag a video).

## Realtime, Push, And Offline Behavior

- Downloaded videos play offline (subscription tier).
- Activity sync opportunistic.
- Push only to parent device (weekly activity digest); never to child profile.
- Timer enforced client-side with server-side reconciliation.
- Content license updates may expire downloaded items; handle gracefully.

## Permissions, Privacy, And Safety

- COPPA-aligned review required before launch.
- No third-party advertising or behavioral tracking for under-13.
- Parental consent flow at account creation; age gate during parent sign-up.
- Catalog moderation: age-tier filtering, human + automated review, user flagging with rapid triage.
- Approved-only mode fully disables recommendations outside the curated list.
- No comments, chat, or UGC between children.
- Parental gate (math challenge) for all adult actions.
- Accessibility: dynamic type, captions, reduced motion, audio description where licensed.
- Launch owner: privacy lead, child-safety lead, content-policy lead, accessibility owner, legal counsel.

## Analytics And Monetization

- Privacy-safe events only: video opened (id), watch minutes bucketed, approval change, subscription state changed — never child identifiers or behavioral profiles.
- Monetization via optional subscription for ad-free and offline (if included); original paywall copy.
- No ads to children. Any parent-side ads gated by adult auth.
- Paywall clarity: feature, state, restore, platform, support.

## Edge Cases

- Content flagged by parents; rapid review and removal.
- Video license expired; hide with notice.
- Timer lockout during active stream; graceful stop.
- Approved-only list emptied; empty-state with guidance.
- Device storage full during download.
- Parental gate bypass attempts; fail-safe block.
- Region-restricted content; geofenced catalog.
- Account deletion with active downloads.

## Test Plan

- Unit tests for timer, approval rules, age-tier filtering.
- Contract tests for all endpoints.
- Integration tests for profile-mode-watch, approved-only, timer-lockout.
- COPPA-style privacy tests.
- Accessibility tests (captions, dynamic type).
- Moderation tests (report-to-removal latency).
- Billing tests.
- Offline tests.
- Manual verification: native captures, parental controls, timer, purchase/restore.

## Acceptance Criteria

- Exact source URLs verified.
- COPPA-style review complete.
- Content licensing/moderation pipeline in place.
- Parental gate, timer, approved-only, and subscription flows functional.
- Accessibility confirmed.

## Open Questions

- Catalog sourcing (licensed studios vs creator program) in V1.
- Subscription bundle (ad-free, offline, multiple profiles).
- International availability.
- Parental reporting SLA.

## Build Plan

- Phase 1: parent auth, child profiles, content modes.
- Phase 2: home, video player, creator profiles.
- Phase 3: approvals, timer, activity insights.
- Phase 4: search (toggled), flagging/moderation.
- Phase 5: subscription, offline downloads, webhooks.
- Phase 6: privacy, accessibility, legal review, manual verification.

## Next Steps

- Verify URLs.
- Build moderation pipeline (automated + human).
- Commission COPPA-style and accessibility review.
