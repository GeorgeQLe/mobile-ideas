# Busuu-Style Clone Spec

> Metadata
> - Inspiration app: Busuu
> - Category: Language learning
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace listing, official product page, support articles, community-corrections page, and privacy policy.
> - Manual verification blockers: native iOS/Android screen capture, live class join flow, community correction moderation, subscription purchase/restore, and certification claims still require a test device/account.
> - Legal scope: functional parity only; use original curriculum, community guidelines, voice talent, iconography, copy, and certification partners.

## Overview

Build an original mobile language-learning app inspired by a structured course path enhanced by community feedback, live classes, and optional certification milestones. The clone must not reuse any proprietary curriculum, community data, instructor likeness, or branded certification names.

The implementation can reproduce comparable user jobs (structured path, community corrections on speaking/writing, live classes, study plan, certification checkpoints) using original language, original content, and licensed partners where needed.

## Goals

- Offer a structured learning path with leveled lessons across popular languages.
- Provide community review of learner submissions (text and voice) with safety moderation.
- Support live class scheduling, reminders, and join flow from mobile.
- Offer optional certification checkpoints with original accrediting partners.
- Produce concrete routes, entities, contracts, and tests.

## Non-Goals

- Do not imply affiliation with Busuu or any licensed curriculum.
- Do not reuse community correction data, instructor likenesses, or branded certification logos.
- Do not use learner content for model training without explicit opt-in.
- Do not offer regulated certifications without a signed accrediting partner.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/busuu-language-learning/id379968583 | iOS listing, course-language count, community feedback, expert-designed lessons, subscriptions, and privacy labels | Verified 2026-05-02 |
| Busuu product page | https://www.busuu.com/en-us | Language catalog, learner counts, course structure, community interactions, speaking confidence, and progress tracking | Verified 2026-05-02 |
| Community Corrections | https://www.busuu.com/en/how-to/corrections | Written/audio correction workflow, matching, feedback, ratings, premium priority, and notification behavior | Verified 2026-05-02 |
| Busuu Support | https://help.busuu.com/hc/en-us | Account, subscription, course, live lesson, review, certificate, and troubleshooting support surface | Verified 2026-05-02 |
| Busuu Certificates | https://help.busuu.com/hc/en-us/articles/16559434818321-What-are-Certificates-and-how-can-I-get-them | CEFR-aligned certificate fields, premium gating, supported course levels, and level-completion test dependency | Verified 2026-05-02 |
| Busuu Privacy Policy | https://www.busuu.com/en-us/privacy | Audio recordings, community corrections, AI conversations, moderation providers, and data handling | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe subscriptions with trial, cross-device progress, and community review.
- App must support a per-language path with units, lessons, and checkpoint tests.
- Learners must be able to submit writing and speaking for community review and to review others.
- Live class experience must expose schedule, join link, reminders, and post-class review.
- Progress must sync across devices.
- Subscription states: trial, active, lapsed, restored, refunded.
- Community Corrections must support both writing and voice submissions, optional algorithmic matching, friend-directed requests, star ratings, inline edits, written comments, thanks, and best-correction awards.
- Premium status must influence correction queue priority and submission limits without hiding safety tools from free users.
- Learner profile must store languages known well enough to correct others and must let users adjust those languages/levels.
- Certificates must be tied to level-completion tests, CEFR level, grade, issue date, learner display name, and course/level availability; unsupported courses stay blocked.
- Live lessons must be feature-flagged until provider join, instructor cancellation, capacity, reminders, and post-class content are manually verified.
- Audio-only Community Corrections and AI Conversations require explicit recording notice, retention policy, moderation coverage, and model-training opt-in/opt-out treatment.

## Core User Journeys

- New learner selects target language and level, completes a placement check, and lands on today's plan.
- Learner completes a lesson that includes a speaking submission the community can review.
- Learner reviews other learners' submissions and earns reputation points.
- Learner browses live classes, books a seat, adds a reminder, and joins at start time.
- Learner takes a level checkpoint test and earns a progress badge.
- Learner adjusts study goal and daily plan.
- Learner reports abusive content in a community submission.
- Learner upgrades to paid, manages plan, and restores on another device.
- Learner exports data or deletes account from settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Language, level, goal | pickers, placement | new, returning | unsupported language |
| Home / Plan | Today's plan and streak | lesson, live class, review | empty, active, complete | offline, entitlement limit |
| Lesson Player | Exercise sequence | tap/listen/type/speak | running, paused, complete | mic denied, save failed |
| Community Review | Give/receive corrections | submission card, rate, comment | pending, reviewed, reported | abusive content, queue empty |
| Live Class | Browse/book/join classes | schedule, book, join | upcoming, live, ended | booking full, join link invalid |
| Checkpoint Test | Level assessment | MCQ, speaking, writing | ready, in progress, scored | submission failed |
| Profile | Streak, badges, reputation | view, share | loaded, empty | analytics opt-out |
| Settings | Account, privacy, notifications | toggles | loaded, signed-out | admin-managed |
| Subscription | Plans and restore | plan pick, restore | free, trial, paid | webhook delay |
| Safety Report | Report submissions or users | reason, evidence | submitted, resolved | abuse, false report |

## Data Model

- `Learner`: identity, locale, age gate, known languages, target languages, consent, deletion state.
- `LanguagePair`: source language, target language, CEFR level, goal, streak, placement state.
- `CourseUnit`: language, CEFR band, lesson order, checkpoint dependency, premium gate.
- `LessonAttempt`: learner, lesson, score, duration, completed exercises, sync state.
- `Submission`: text/audio artifact, prompt, learner, target language, visibility, moderation state.
- `Review`: reviewer, submission, inline edits, rating, comment, award, abuse state.
- `LiveClass`: provider session, topic, instructor alias, capacity, schedule, join state.
- `Booking`: learner, class, reminder preference, cancellation/refund state.
- `CheckpointAttempt`: level test, grade, passed flag, certificate dependency.
- `Certificate`: learner name, CEFR level, course, grade, issue date, share/export state.
- `Entitlement`: platform, plan, premium state, renewal, refund, restore state.
- `SafetyReport`: reporter, target, reason, evidence, moderation decision, appeal state.
- `Reputation`: correction counts, helpfulness, rate limits, violation state.
- `AuditEvent`: billing, privacy, community moderation, and account changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /path?language=&level=`, `POST /lessons/:id/complete`.
- `POST /submissions`, `GET /submissions/:id`, `DELETE /submissions/:id`.
- `GET /reviews/queue`, `POST /reviews`, `POST /reviews/:id/report`.
- `GET /live-classes`, `POST /live-classes/:id/book`, `POST /live-classes/:id/cancel`, `GET /live-classes/:id/join`.
- `GET /checkpoints`, `POST /checkpoints/:id/attempt`.
- `GET /profile`, `GET /progress`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Live class join requires network; app should show degraded state when offline.
- Lesson progress queued offline and flushed on reconnect.
- Push reminders for daily plan and upcoming live classes; never include raw submission content.
- Community review queue may be cached for offline triage; submission uploads must retry.

## Permissions, Privacy, And Safety

- Mic requested only when submitting speaking exercises or joining live class.
- Community submissions must pass pre-moderation signals (PII scrub, abuse classifier) before broadcast.
- Report/block flows for abusive reviewers; reviewer reputation adjusted after confirmed violations.
- Minors policy: if allowed, route through parental consent and disable community features.
- Analytics exclude raw submissions and class transcripts.

## Analytics And Monetization

- Events: plan created, lesson completed, submission posted, review given/received, class booked/joined, checkpoint completed, entitlement changed, abuse reported.
- Original paid tiers; no borrowed copy or named plans.
- Paywalls must identify blocked feature and restore path.

## Edge Cases

- Submission posted just as account is deleted.
- Live class instructor cancels; bookings must refund seats and notify.
- Community reviewer abuses flagging; rate-limit and require reputation threshold.
- Certification disputed; appeals flow.
- Cross-timezone class scheduling.
- Entitlement purchased on web, used on mobile.

## Test Plan

- Unit tests for booking state machine, review queue assignment, reputation adjustments.
- Contract tests for all APIs.
- Integration tests for submission/review loop, class booking/join, checkpoint attempt.
- Moderation tests for PII scrubbing, abuse classifier, report flow.
- Billing tests for trial/paid/expired/restore/refund.
- Accessibility tests for captions, dynamic type, screen reader.
- Privacy tests for export/delete and minors handling.
- Manual verification: native screenshots, live join on device, restore purchase.

## Acceptance Criteria

- Source URLs verified.
- Core loop (lesson -> submission -> review) works end to end.
- Live class booking and join flow is testable with mocked provider.
- Entitlements reconcile across platforms.
- Manual blockers are feature-flagged until resolved.

## Open Questions

- Which live-class video provider backs the V1?
- Will certification ship in V1 or after?
- Which moderation provider handles abuse classification?
- Will signed-out browsing be allowed?

## Build Plan

- Phase 1: app shell, auth, path, lessons.
- Phase 2: submissions + community review + moderation.
- Phase 3: live classes + booking + reminders.
- Phase 4: checkpoints + certifications.
- Phase 5: entitlements + billing.
- Phase 6: accessibility, privacy, manual verification.

## Next Steps

- Verify source URLs.
- Select video and moderation providers.
- Align on certification partner before implementation.
