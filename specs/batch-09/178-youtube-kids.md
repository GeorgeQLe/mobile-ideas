# YouTube Kids-Style Clone Spec

> Metadata
> - Inspiration app: YouTube Kids
> - Category: Kids video
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official YouTube Kids help/privacy/terms pages, and public Google/YouTube policy pages.
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
| Apple App Store | https://apps.apple.com/us/app/youtube-kids/id936971630 | Official iOS listing, age rating, privacy labels, and public parental-control/video feature framing | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.kids | Official Android listing, age modes, approved content, timer, watch-again, data safety, and Families Policy indicator | Verified 2026-05-02 |
| YouTube Kids Help | https://support.google.com/youtubekids/ | Official help center for parental controls, profiles, search, approved content, timer, blocking, and reporting | Verified 2026-05-02 |
| YouTube Kids Privacy Notice | https://kids.youtube.com/t/privacynotice | Public YouTube Kids-specific privacy notice and child-use data posture | Verified 2026-05-02 |
| YouTube Kids Terms | https://kids.youtube.com/t/terms | Public service terms for YouTube Kids usage boundaries | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Parent-owned account with child profiles; per-profile age tier.
- Content modes: broad curated library, parent-approved-only, search on/off.
- Timer with lockout after limit.
- Block video or creator.
- Creator profile pages (licensed/submitted creators only).
- Activity insights for parents (what the child watched).
- Offline downloads for subscription tier (inferred).
- Parent setup must choose signed-in or unsigned child profile mode, age tier, search availability, and content controls before child use where required.
- Age modes must influence catalog eligibility, home shelves, search scope, recommendations, and reporting labels without copying YouTube taxonomy copy.
- Approved-content-only mode must fully suppress search and recommendations outside parent-selected videos, channels, collections, or licensed equivalents.
- Blocking must work for a video, creator/channel, or collection and take effect across home, search, watch-again, and recommendations.
- Timer must lock the child surface at expiry and require adult action or next allowed window to resume.
- Reporting must capture content, reason, profile context, evidence, reviewer state, and takedown/escalation decisions.
- Video catalog must be licensed, creator-submitted, or otherwise lawfully sourced under original terms; no YouTube metadata, thumbnails, private APIs, or brand assets may be reused.
- Commercial content and sponsorship policy must be explicit; V1 should avoid child-directed ads unless legal review separately approves a compliant model.
- Accessibility must support captions, audio descriptions where licensed, screen-reader player controls, reduced motion, focus visibility, and TV/tablet layouts.

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
- `ContentReview`: video/creator, age tier, policy labels, reviewer, decision, expiration.
- `Report`: target, reporter profile/adult, reason, severity, review state, action.
- `RecommendationEvent`: child profile, source shelf, opaque content ids, policy reason, redacted analytics.
- `CommercialDisclosure`: video/creator, disclosure type, eligibility, region.
- `PrivacyRequest`: parent request, child profile scope, export/delete state.
- `NotificationPreference`: parent topic, channel, quiet hours.

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
- `POST /profiles/:id/age-mode`, `PATCH /profiles/:id/search`.
- `GET /controls/:childId`, `PATCH /controls/:childId`.
- `POST /blocks`, `DELETE /blocks/:id`, `GET /approved-content/:childId`.
- `POST /moderation/reviews`, `GET /moderation/queue`.
- `POST /privacy/export`, `DELETE /profiles/:id/data`.

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
- Approved-only list contains only blocked, expired, or region-unavailable videos.
- Search is disabled but a deep link or watch-again item points to unavailable content.
- Timer expires during casting, background playback, or offline playback.
- Parent blocks a creator while a child is watching one of its videos.
- Content report arrives after a video was removed, reclassified, or license-expired.
- Commercial disclosure status changes after a video is downloaded.

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
- Moderation tests for report intake, triage priority, age reclassification, takedown, and audit retention.
- Recommendation tests for age-tier filtering, approved-only suppression, blocks, search-off state, and watch-again eligibility.
- Privacy tests for signed-in and unsigned profiles, child data export/delete, analytics redaction, and parent controls.
- Commercial-policy tests if any monetization exists: disclosure, region, child-directed restriction, and no behavioral targeting.
- Notification tests for parent-only payloads, no child marketing, quiet hours, and account/security events.
- Manual verification: native captures, parental setup, approved-only, timer, blocking, reporting, purchase/restore if downloads are paid, and push payloads.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- COPPA-style child-video privacy review and content-policy review are complete.
- Parent setup, child profiles, age modes, approved-only, search toggle, block/report, timer, video playback, activity insights, and offline/subscription states work deterministically.
- Licensed/creator-submitted catalog, original thumbnails/copy, and original policy labels replace all YouTube branding, metadata, private APIs, and assets.
- Moderation, commercial disclosure, privacy export/delete, analytics redaction, and parent-only notification controls are covered by tests.
- Accessibility, native parental-control, timer, reporting, and push blockers are resolved or feature-flagged.

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
