# BabyCenter-Style Clone Spec

> Metadata
> - Inspiration app: BabyCenter
> - Category: Pregnancy and parenting content/community
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center articles, and publicly available privacy/community guidelines. Exact URLs pending verification.
> - Manual verification blockers: community moderation tooling, subscription/entitlement flows, regional content availability, and child-directed content handling require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, editorial content, community guidelines, and illustrations. No proprietary clinical or editorial content reuse.

## Overview

Build an original mobile pregnancy-and-parenting companion inspired by BabyCenter's workflow: week-by-week pregnancy content, baby tracking and milestones, a moderated community for parents, and tools (due-date calculator, kick counter, contraction timer) with original copy and medically reviewed content.

## Goals

- Deliver week-by-week pregnancy content and week/month-based baby development content.
- Provide logging tools: kick counter, contraction timer, feeding, sleep, diaper, milestones.
- Support a parent community with groups (by due-date month, topic, region) and moderation.
- Offer original, medically reviewed articles with clear disclaimers.
- Keep sensitive-health privacy controls visible and auditable.

## Non-Goals

- Do not present app as medical device or diagnostic tool.
- Do not copy proprietary content, branding, or community text.
- Do not expose child profile data to advertisers or third-party analytics.
- Do not allow targeted advertising against child-directed content per COPPA-style review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/babycenter-pregnancy-baby/id436949545 | Features, category, age rating | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.babycenter.pregnancytracker | Feature list, data safety | Source discovery — pending exact URL verification |
| BabyCenter help center | https://www.babycenter.com/help | Feature how-to and community rules | Source discovery — pending exact URL verification |
| BabyCenter privacy policy | https://www.babycenter.com/privacy | Data handling, retention | Source discovery — pending exact URL verification |
| BabyCenter community guidelines | https://www.babycenter.com/community-guidelines | Moderation policy | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Three modes: pregnancy, baby, toddler/child, with transitions and child profiles.
- Due-date calculator, contraction timer, kick counter, feeding/sleep/diaper logging.
- Content hub with articles filtered by week/age with disclaimers.
- Community groups auto-joined by due-date month or child age; manual join for topical groups.
- Moderation: reporting, blocking, hiding, banned-keyword filter, human-review queue.
- Privacy controls for profile visibility, data export, and account deletion.

## Core User Journeys

- User installs, picks due date or baby DOB, creates pseudonymous community handle, sees home.
- User reads today's article and logs a symptom or milestone.
- User posts in a due-date group; moderation screens content before public posting if risk keywords detected.
- User uses kick counter during third trimester; data stored locally and optionally synced.
- User reports a post as harmful; moderator queue handles.
- User transitions from pregnancy to baby mode after birth; groups rotate accordingly.
- User blocks another user; all content hidden bi-directionally.
- User exports data and/or deletes account.
- User hits a premium feature paywall; sees original copy.
- Loss or complication path shows gentle content and resources.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Mode, due date, handle | dates, handle | new | duplicate handle |
| Home Feed | Today's content, quick log | none | loaded | offline |
| Article | Editorial content | id | loaded | unavailable |
| Tools | Kick counter, contraction timer, calculators | timer inputs | idle, running | interruption |
| Community Groups | List and detail of groups | join, post | joined, unjoined | region-restricted |
| Thread View | Community posts | replies | loaded, locked | banned user |
| Composer | New post | text, attachments | draft, posted | content blocked |
| Moderation And Reporting | Report a post/user | reason | submitted | abuse report |
| Profile Settings | Visibility, data | toggles | public, private | deleted |
| Privacy Center | Export, delete | actions | idle | pending |
| Subscription | Plans, restore | plan | free, paid | restore fail |
| Support And Safety | Contact, crisis | form | idle | unavailable |

## Data Model

- `User`: identity, age gate, handle, region, consent.
- `Journey`: mode, baseline dates, active child id.
- `ChildProfile`: initials, DOB, measurements, milestones.
- `LogEntry`: tool/category, value, timestamp.
- `Article`: id, week/age, title, body, disclaimers.
- `Group`: id, type (due-date/topic/region), moderators.
- `Post`: group id, author id, content, state, attachments, moderation flags.
- `Report`: target id, reason, status.
- `BlockList`: user pair.
- `PrivacySettings`: visibility, analytics opt-in.
- `Entitlement`: plan, platform, state.
- `AuditEvent`: moderation, privacy, billing events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /journey`, `PATCH /journey`.
- `POST /logs`, `GET /logs?range=`, `PATCH /logs/:id`.
- `GET /articles?week=`, `GET /articles/:id`.
- `GET /groups`, `POST /groups/:id/join`, `DELETE /groups/:id/join`.
- `GET /groups/:id/posts`, `POST /groups/:id/posts`, `PATCH /posts/:id`, `DELETE /posts/:id`.
- `POST /reports`, `POST /blocks`, `DELETE /blocks/:id`.
- `GET /settings/privacy`, `PATCH /settings/privacy`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Community threads update via polling or websocket; offline reads from cache.
- Logging fully offline with sync.
- Push for replies, milestone reminders; payloads exclude sensitive content.
- Temporary drafts stored locally.
- Moderation queue runs server-side before publish when risk signals detected.

## Permissions, Privacy, And Safety

- COPPA-style review required for any parenting/child-content surface before launch.
- No targeted advertising to child-directed content areas.
- Health and child data excluded from third-party analytics.
- Community moderation with banned keywords, rate limiting, and human review for reports.
- Crisis resources (loss, postpartum mental health, domestic violence) accessible from support.
- Post-Dobbs stance: minimize retention, publish LEO response policy, support export/delete.
- Age gate at minimum supported age; region-specific compliance review.
- Launch owner: privacy lead, community trust-and-safety lead, medical-content reviewer, accessibility owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, tool used, article viewed (id), post created/reported, subscription events.
- No sensitive health content in analytics.
- Free tier plus optional paid tier for ad-free or extras.
- Ad-supported tier must exclude behavioral targeting on child/health topics.

## Edge Cases

- Loss or complication requires mode and content rotation with gentle copy.
- Abusive community behavior requires rapid escalation.
- Fake or malicious handles; add verification friction for high-risk actions.
- Regional content restrictions for clinical topics.
- Duplicate child profile handling.
- Account deletion with pending moderation cases.
- Push notification to locked device shouldn't reveal sensitive content.
- Handle collision and impersonation.
- Over-age user in kids-adjacent group.

## Test Plan

- Unit tests for journey transitions, moderation rules, rate limits.
- Contract tests for all endpoints.
- Integration tests for post lifecycle, report, block.
- Privacy tests: analytics redaction, no child-data in ads.
- Moderation tests: banned-keyword, rate limit, report escalation.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Safety tests for loss and crisis flows.
- Manual verification of community moderation behavior on real devices.

## Acceptance Criteria

- Pregnancy, baby, and community modes functional.
- Moderation queue and reporting tested end-to-end.
- COPPA-style review complete; no targeted ads in child-directed content.
- Export and deletion accessible.
- Legal and medical review complete.

## Open Questions

- Scope of V1 community moderation (in-house or vendor).
- Should V1 include live expert Q&A features, or defer?
- Minimum supported age and parental consent flows.
- Which regions require explicit regulatory review.

## Build Plan

- Phase 1: scaffold, onboarding, journey, content, logging.
- Phase 2: community groups, composer, moderation.
- Phase 3: reporting, blocking, trust-and-safety tooling.
- Phase 4: subscription, privacy center, export, deletion.
- Phase 5: safety/crisis, accessibility, legal/medical review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify marketplace and help URLs.
- Commission content review and COPPA-style review.
- Define moderation vendor or in-house model.
