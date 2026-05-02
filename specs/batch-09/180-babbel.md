# Babbel-Style Clone Spec

> Metadata
> - Inspiration app: Babbel
> - Category: Language learning
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official Babbel support pages, and public privacy/terms pages.
> - Manual verification blockers: native capture, subscription purchase/restore, speech recognition behavior, trial conversion, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Course content must be original or licensed; no proprietary curriculum reuse.

## Overview

Build an original mobile language-learning app inspired by Babbel: structured lessons organized by course/level, a review manager for spaced repetition, speech recognition for pronunciation practice, and a subscription unlock for most content. The clone must not copy Babbel branding, proprietary courses, or private APIs.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Offer structured lessons across multiple languages and proficiency levels.
- Provide a review manager using spaced repetition.
- Support speech-recognition exercises with clear mic consent.
- Gate most content behind a subscription with trial handling.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not imply affiliation with Babbel.
- Do not copy proprietary course content, brand, or private APIs.
- Do not require mic access for non-speech features.
- Do not present automated feedback as professional language assessment.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/babbel-language-learning/id829587759 | Official iOS listing, subscription indicator, privacy labels, and public lesson/review/speech feature framing | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.babbel.mobile.android.en | Official Android listing, supported languages, ad-free/subscription framing, support contact, privacy/terms links, and data safety | Verified 2026-05-02 |
| Babbel Help Center | https://support.babbel.com/hc/en-us | Official support surface for accounts, subscriptions, courses, lessons, speech recognition, and device support | Verified 2026-05-02 |
| Babbel Privacy Policy | https://about.babbel.com/en/privacy/ | Public privacy posture, audio/data handling, rights, analytics, and service data use | Verified 2026-05-02 |
| Babbel Terms | https://about.babbel.com/en/terms/ | Public account, subscription, trial, cancellation, content, and service terms | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Language picker and proficiency placement.
- Course structure: levels, lessons, exercises (choice, fill-in, speech, listening).
- Review manager with spaced repetition of learned items.
- Speech recognition with on-device or server pipeline and fallback.
- Daily goal and streak.
- Subscription unlock (trial, monthly, annual, family tier as applicable).
- Offline lesson download (optional).
- Course content must be original or licensed and represented by target language, source locale, proficiency level, skill, grammar theme, vocabulary set, and review eligibility.
- Placement must support skip, self-assessment, scored quiz, and later reset without overstating formal proficiency.
- Lesson player must handle multiple exercise types: choice, matching, fill-in, listen, speak, dialogue, grammar note, and review prompt.
- Speech recognition must request microphone consent at first use, provide non-speech alternatives, and separate pronunciation coaching from professional assessment.
- Review manager must implement spaced repetition with due queues, streak/goal updates, offline queueing, and deterministic conflict resolution.
- Subscription/paywall must disclose trial length, renewal, platform restore, web/mobile entitlement reconciliation, cancellation, refund, expired, and locked-content states.
- Notifications must be opt-in and limited to goals, review reminders, subscription/account events, and privacy/security messages.
- Minor-user handling must age-gate or route under-13 users to a separately reviewed kids flow; adult Babbel-style V1 should not collect children's data by default.
- Accessibility must include captions/transcripts for listening, screen-reader exercise controls, keyboard/focus order, dynamic type, reduced motion, and mic-denied alternatives.

## Core User Journeys

- User picks a target language and self-assesses level.
- User completes onboarding lesson and sees progress dashboard.
- User completes a lesson with mixed exercise types.
- User practices pronunciation via speech exercise.
- User reviews previously learned items via review manager.
- User hits a paywall and starts trial.
- User restores a subscription on a new device.
- User downloads a lesson pack for offline.
- User enables reminders and sets daily goal.
- User cancels subscription and views expiration date.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Language and goals | select | new, returning | region block |
| Placement | Proficiency check | answer | complete | skipped |
| Home | Course path and goal | tap | loaded | offline |
| Lesson Player | Run lesson | exercise inputs | running | asset fail |
| Speech Exercise | Pronunciation | mic | listening, scored | mic denied |
| Review Manager | Spaced repetition | answer | loaded | empty |
| Progress | Stats and streak | view | loaded | signed-out |
| Subscription | Plans, trial, restore | select | free, trial, paid | platform mismatch |
| Downloads | Offline lessons | download | queued, done | storage full |
| Settings | Account, notifications, mic | toggles | loaded, signed-out | managed |
| Privacy Center | Export, delete, analytics | actions | idle | pending |
| Support | Contact | form | idle | unavailable |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `LanguageCourse`: language, level, ordered lessons.
- `Lesson`: id, course, exercises, duration.
- `Exercise`: id, type (choice|fill|speech|listen), content refs, scoring rules.
- `Attempt`: user, exercise, score, duration, timestamp.
- `ReviewItem`: user, vocabulary/phrase ref, due-at, ease factor.
- `Goal`: user, daily target, streak count.
- `Download`: device, lesson, status.
- `Entitlement`: plan, platform, state.
- `AnalyticsPref`: opt-in flag.
- `PlacementResult`: user, target language, level estimate, source, reset history.
- `VocabularyItem`: phrase/word, language, translations, audio refs, grammar tags.
- `SpeechAttempt`: exercise, audio ref or local score, consent state, score, retention state.
- `DialogueTurn`: lesson, speaker, prompt, expected response, audio/caption refs.
- `NotificationPreference`: topic, channel, quiet hours, opt-in state.
- `PrivacyRequest`: export/delete/access request, fulfillment state, subscription/account linkage.
- `AuditEvent`: billing, privacy, profile changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /courses?language=`, `GET /courses/:id/lessons`.
- `GET /lessons/:id`, `POST /lessons/:id/attempt`.
- `POST /speech/score` (audio stream to scoring service).
- `GET /review`, `POST /review/answer`.
- `GET /goals`, `PATCH /goals`.
- `POST /downloads`, `DELETE /downloads/:id`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /data-export`, `DELETE /account`.
- `POST /support/cases`.
- `POST /placement/start`, `POST /placement/answer`, `POST /placement/reset`.
- `GET /vocabulary/:id`, `GET /dialogues/:id`.
- `POST /speech/consent`, `DELETE /speech/audio/:id`.
- `PATCH /notifications/preferences`.
- `GET /privacy/settings`, `PATCH /privacy/settings`.

## Realtime, Push, And Offline Behavior

- Offline lesson play for downloaded packs; review manager available offline with local queue.
- Attempt sync opportunistic; conflict resolved by latest-timestamp win.
- Push for daily-goal reminders (opt-in) and subscription events.
- Speech scoring streams audio to service; fallback to local heuristic if offline and allowed.
- Course content versioned; downloaded packs refresh on reconnect.

## Permissions, Privacy, And Safety

- Microphone consent requested only at the first speech exercise; revocable in settings.
- Audio sent to scoring service retained briefly for QA; delete-on-finish default with opt-in retention.
- Analytics exclude raw audio and lesson content; aggregate metrics only.
- Notifications opt-in; per-topic.
- Subscription/trial disclosures visible before conversion.
- No medical, legal, or professional-language-assessment claims.
- Accessibility: dynamic type, VoiceOver, captions for listening exercises, reduced motion.
- Minor-user policy: age gate; under-13 disabled or routed to a COPPA-compliant kids flow if offered.
- Launch owner: product/privacy leads, accessibility owner, legal counsel.

## Analytics And Monetization

- Privacy-safe events: lesson started/completed, exercise scored (type only), review answered, goal met, subscription state changed.
- Monetization via subscription with trial; original paywall copy.
- Paywall clarity: feature, state, restore, platform, support.
- Webhook reconciliation across platforms (trial, paid, refund, cancel).
- Transparent trial-to-paid conversion terms.

## Edge Cases

- Mic denied; fall back to non-speech exercise variant.
- Speech scoring unavailable; defer exercise with notice.
- Subscription active on web only; reconcile via login.
- Offline review queue conflicts with server after reconnect.
- Lesson content updated while downloaded; refresh prompt.
- Trial expired mid-session; friendly gate.
- Timezone change affects streak.
- Account deletion with active subscription.
- User changes target language, source language, or proficiency level after completing lessons.
- Speech score differs materially between on-device and cloud scoring paths.
- Trial starts on web but mobile platform restore cannot see it immediately.
- Review queue is completed offline on two devices and syncs out of order.
- Daily streak crosses timezone, travel, daylight-saving, or offline boundaries.
- Downloaded lesson pack contains content retired, corrected, or relicensed by curriculum team.
- Minor user fails age gate or parent account attempts to add a child profile to adult product.

## Test Plan

- Unit tests for spaced-repetition scheduling, streak logic, attempt scoring.
- Contract tests for courses, lessons, attempts, speech, review, subscription.
- Integration tests for onboarding-placement-lesson, review-answer-sync.
- Privacy tests for mic consent, audio retention default, analytics redaction.
- Billing tests for trial, paid, refund, restore, cross-platform.
- Offline tests for downloaded lessons and review queue.
- Accessibility tests (dynamic type, captions, reduced motion).
- Speech fallback tests (mic denied, scoring outage).
- Manual verification: native captures, purchase/restore, speech exercise, push payloads.
- Placement tests for skip, self-assessment, scored quiz, reset, and level/course mapping.
- Content tests for original/licensed lesson assets, grammar notes, dialogue audio/captions, and locale fallback.
- Speech tests for consent, mic denied, on-device fallback, cloud outage, retention deletion, and score determinism.
- Subscription tests for trial, paid, expired, canceled, refund, restore, web/mobile reconciliation, and webhook duplicate states.
- Notification tests for opt-in reminders, quiet hours, no sensitive payloads, and subscription/security topics.
- Privacy tests for audio retention, analytics opt-out, export/delete, account deletion with subscription, and minor age gate.
- Manual verification: native captures, purchase/restore, speech recognition, trial conversion, cancellation, offline lessons, and push payloads.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- Original or licensed courses, lesson media, vocabulary, audio, dialogue, and grammar content are in place.
- Onboarding, placement, course path, lesson player, review manager, speech recognition, goals/streaks, subscription/trial/restore, and offline downloads work end-to-end.
- Microphone consent, audio retention/deletion, analytics redaction, minor age gate, and privacy export/delete are deterministic and tested.
- Accessibility covers listening/speech alternatives, captions/transcripts, screen readers, dynamic type, focus order, and reduced motion.
- Manual verification blockers for purchase/restore, speech, trial conversion, cancellation, offline behavior, and push payloads are resolved or feature-flagged.

## Open Questions

- Languages supported in V1.
- Speech-scoring vendor (on-device vs cloud).
- Trial length and refund policy.
- Family-tier scope.

## Build Plan

- Phase 1: scaffold app, auth, language picker, placement, home.
- Phase 2: lesson player with non-speech exercises, review manager.
- Phase 3: speech exercises with mic consent and scoring.
- Phase 4: subscription, entitlements, webhooks, trial handling.
- Phase 5: offline downloads, accessibility, privacy center.
- Phase 6: manual verification, regression, rollout.

## Next Steps

- Resolve exact URLs.
- Draft original course content strategy.
- Select speech-scoring vendor and sign DPA.
- Stand up downstream implementation repo.
