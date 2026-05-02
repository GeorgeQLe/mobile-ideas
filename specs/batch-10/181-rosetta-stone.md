# Rosetta Stone-Style Clone Spec

> Metadata
> - Inspiration app: Rosetta Stone
> - Category: Language learning
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace listing, official product pages, support center, privacy policy, and subscription terms.
> - Manual verification blockers: native iOS/Android screen capture, speech-grading calibration on device, subscription purchase/restore, offline lesson pack delivery, and accessibility passes still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original curriculum copy, original voice talent, original iconography, original brand, and licensed or first-party ASR providers.

## Overview

Build an original mobile language-learning app inspired by immersion-style pedagogy: image-to-word association, in-context phrase building, speech grading against native reference, spaced review, stories/audio companions, and cross-device progress.

The clone must not copy Rosetta Stone branding, curriculum copy, voice recordings, artwork, private APIs, named features (e.g. the trademarked speech grader), plan names, or marketing language. The implementation can reproduce comparable user jobs and interaction patterns using original content and licensed or first-party speech recognition.

This spec is implementation-ready for a V1. Unverified native behaviors must ship behind feature flags until manual evidence resolves the blockers.

## Goals

- Offer a learner path across 20+ target languages with image-association, listening, reading, writing, and speaking exercises.
- Provide speech grading that returns per-phoneme or per-word scoring with an explanation the learner can act on.
- Support short stories, audio companions, and optional live tutoring entry points.
- Persist progress across devices, support offline lessons, and respect data/permissions minimization.
- Produce concrete routes, entities, API contracts, offline rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not imply affiliation with Rosetta Stone or any licensed curriculum provider.
- Do not scrape, replay, or reverse third-party lesson data or audio.
- Do not use learner audio for model training without explicit account-level consent.
- Do not ship certification claims without a verified accrediting partner.
- Do not claim exact native parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/rosetta-course/id435588892 | iOS listing, subscription terms, supported devices, offline lessons, progress sync, stories/audio companion, and no-ads framing | Verified 2026-05-02 |
| Rosetta Stone mobile apps | https://www.rosettastone.com/product/mobile-apps/ | Mobile/offline availability, speaking-focused lessons, Dynamic Immersion method, and Extended Learning feature orientation | Verified 2026-05-02 |
| TruAccent product page | https://www.rosettastone.com/features/truaccent-speech-recognition/ | Speech-recognition feedback, native-speaker comparison framing, and adjustable sensitivity | Verified 2026-05-02 |
| Phrasebook product page | https://www.rosettastone.com/features/phrasebook/ | Travel phrase categories, native-speaker audio guidance, and speech feedback for phrases | Verified 2026-05-02 |
| Rosetta Stone Support | https://support.rosettastone.com/ | Account, app access, subscription, device, and troubleshooting support surface | Verified 2026-05-02 |
| Rosetta Stone Privacy Policy | https://www.rosettastone.com/privacy-policy/ | Personal data handling, account controls, analytics, communications, and learner privacy posture | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public marketplace pages describe paid subscriptions with trial, cross-device progress, speech grading, and offline lessons.
- iOS and Android listings describe phone and tablet layouts; support for iPadOS is documented.
- Learner must pick a target language and level at onboarding, with ability to switch languages without losing prior progress.
- Lessons must be organized in units and composed of short exercise sets (image selection, listen-and-match, build-a-phrase, speak-the-phrase).
- Speech grading must request microphone permission at point of use and return a visible score with retry affordance.
- Stories or audio companions must be downloadable for offline playback.
- Subscription state must include free trial, active, lapsed, restored, refunded, web-managed, and app-store-managed states.
- Progress must sync per language and per unit and handle device loss / fresh install recovery.
- The App Store listing verifies all-language subscription access, 3-month, 12-month, and Lifetime options, app-store renewal/cancel mechanics, and Enterprise/Education learner variance.
- Offline lessons must be scoped to downloaded lesson packs, stories, and audio companions; all server-required speech grading and entitlement checks need graceful queued or blocked states.
- Phrasebook must cover travel-oriented categories such as greetings, politeness, time/money, dining, health/safety, and getting around with native-speaker audio and pronunciation attempts.
- Speech scoring must avoid the trademarked feature name while implementing comparable microphone capture, sensitivity setting, immediate feedback, retry, skip, and no-audio fallback.
- Enterprise/Education access must be modeled separately from direct consumer purchase because feature availability may vary for managed learners.

## Core User Journeys

- New learner installs the app, completes onboarding, selects a target language, level, and goal, and lands on today's lesson.
- Returning learner resumes the next uncompleted exercise and can replay prior exercises for review.
- Learner starts a speaking exercise, grants microphone permission, records a phrase, sees a score, and retries or moves on.
- Learner downloads a unit for offline use on Wi-Fi, then completes exercises on an airplane.
- Learner opens a story, plays audio at adjustable speed, views a transcript, and marks unfamiliar words.
- Learner reviews saved phrases in a spaced-review session that surfaces due items.
- Learner switches target language; progress is preserved per language.
- Learner upgrades to paid, sees entitlement update, and later restores purchase on a new device.
- Learner reaches a daily goal and receives an in-app celebration without a push-notification leak.
- Learner requests data export or account deletion from settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Language, level, goal selection | language picker, level quiz, goal | new, resuming, signed-out | unsupported language, network failure |
| Home / Today | Next lesson, streak, saved items | lesson card, review, stories | empty, in-progress, completed | offline, entitlement required |
| Lesson Player | Run an exercise sequence | tap, drag, listen, speak | running, paused, complete | mic denied, audio route lost |
| Speech Exercise | Record and grade speech | mic, retry, skip | ready, recording, grading, scored | mic denied, noisy env, ASR down |
| Story Player | Audio + transcript + glossary | play, speed, word tap | playing, paused, ended | asset missing, offline without download |
| Review / Spaced Practice | Revisit due items | rate, next | empty, due items, completed | schedule corrupted, sync delay |
| Downloads | Manage offline packs | download, remove | idle, downloading, complete | storage low, download failed |
| Profile / Progress | Streaks, accuracy, time-on-task | view, share | loaded, empty, new | analytics opt-out |
| Settings | Account, notifications, data controls | toggles, navigation | loaded, signed-out | enterprise/admin limits |
| Subscription | Plan, trial, restore | plan pick, checkout, restore | free, trial, paid, expired | webhook delay, refund |
| Support | Help, contact, report content | form, faq | loaded, submitted | attachment too large |

## Data Model

- `Learner`: account, locale, auth providers, age gate, consent, deletion state.
- `LanguagePair`: source, target, level, goal, streak, accuracy stats.
- `Unit`: target language, order, title, type, unlock requirements.
- `Lesson`: unit id, order, exercises, completion thresholds.
- `Exercise`: type (match/listen/build/speak), prompt, reference audio id, expected answer, scoring rubric.
- `Attempt`: exercise id, learner id, input, score, duration, retry count.
- `SpeechAttempt`: exercise id, audio asset, provider, phoneme scores, overall score, retention policy.
- `DownloadPack`: unit id, assets, bytes, expiration, integrity hash.
- `Story`: target language, level, audio asset, transcript, glossary, offline eligible.
- `ReviewItem`: learner id, content ref, ease/interval, due time, last outcome.
- `Entitlement`: plan key, platform, purchase id, trial/renewal/expiration state.
- `AuditEvent`: account, privacy, billing, safety, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`: device-scoped auth.
- `GET /languages`, `POST /languages/:code/enroll`: enrollment lifecycle per language pair.
- `GET /path?language=&level=`: unit/lesson/exercise tree with prerequisites.
- `GET /lessons/:id`, `POST /lessons/:id/complete`: load content and mark completion.
- `POST /exercises/:id/attempt`: submit text/tap answers; returns correctness + feedback.
- `POST /speech/attempts`: upload audio artifact with consent flag; returns score breakdown.
- `GET /reviews?due=true`, `POST /reviews/:id/outcome`: spaced review queue and outcome rating.
- `GET /stories`, `GET /stories/:id`: story list and asset manifest.
- `POST /downloads`, `DELETE /downloads/:id`: offline pack lifecycle and cleanup.
- `GET /progress`, `GET /progress/streak`: per-language progress and streaks.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: entitlements.
- `POST /data-export`, `DELETE /account`: privacy workflows.
- `POST /support/reports`: report incorrect content or grading.

## Realtime, Push, And Offline Behavior

- Lesson progress must be queued locally and flushed on reconnect with idempotent server writes.
- Speech grading must fall back to on-device scoring when configured; cloud scoring must stream partial results when available.
- Downloaded units must validate integrity hashes before first use and re-download on mismatch.
- Push notifications limited to streak reminders and billing receipts, never raw lesson content.
- Story audio must resume from last timestamp after app backgrounding or call interruption.

## Permissions, Privacy, And Safety

- Microphone requested at first speech exercise with clear purpose string.
- Speech audio retained only long enough to score by default; long-term retention requires opt-in.
- Notifications optional; streak copy must avoid shaming language and dark-pattern urgency.
- Children's policy: if under-13 support is offered, use a regulated minor flow (COPPA/GDPR-K) with parental consent and minimized analytics.
- Analytics exclude raw audio, transcripts, and precise location.
- Support tooling must redact audio unless user has consented to review.
- AI-generated or adaptive hints must be marked as such and must not replace human-authored curriculum.

## Analytics And Monetization

- Events: onboarding completed, lesson started/completed, exercise attempted, speech attempt scored, review completed, story played, download started/completed, streak earned, entitlement state changed.
- Monetization: original trial/paid tiers; plan names and pricing original; no borrowed copy.
- Paywall states must identify blocked feature, current entitlement, restore path, and support path.
- Usage-limit states (e.g. free daily lessons) must be testable independently from billing state.

## Edge Cases

- Mic permission revoked mid-exercise.
- Learner switches device mid-unit; progress must reconcile without double-counting streaks.
- Offline install followed by sign-in; downloads must re-bind to account.
- Speech grader degraded by background noise; UI must suggest retry in a quieter environment without shaming.
- Curriculum update invalidates a downloaded pack; app must migrate attempts to new content refs.
- Subscription purchased on web but opened on iOS; entitlements reconcile via server.
- Account deletion with pending speech audio in queue.
- Locale mismatch between device and target-language learning direction.

## Test Plan

- Unit tests for review scheduler, streak counter, attempt scoring, and idempotent progress writes.
- Contract tests for every documented API route, including offline-queued writes.
- Integration tests for onboarding, lesson completion, speech attempt, story playback, and download lifecycle.
- Speech tests for permission states, noisy inputs, and ASR timeout.
- Offline tests for pack integrity, cache corruption, and queued writes.
- Billing tests for trial, active, expired, refund, and restore across platforms.
- Accessibility tests for dynamic type, VoiceOver/TalkBack, captions on story audio, reduced motion.
- Privacy tests for audio retention defaults, minor accounts, export/delete flows.
- Manual verification: native screenshots, purchase/restore, mic handling on real devices.

## Acceptance Criteria

- Exact source links are refreshed and verified before implementation.
- Learner can enroll in a language, progress through units, complete speech exercises, and review due items.
- Entitlements reconcile across web and mobile.
- Privacy controls (audio retention, export, delete) are reachable from settings.
- Manual verification blockers are either resolved with evidence or feature-flagged.

## Open Questions

- Which ASR provider backs speech grading on device vs cloud?
- Will V1 include live tutoring or defer to a later phase?
- Which languages ship in V1 and which are fast-follow?
- Will minors be supported, and under which regulatory regime?

## Build Plan

- Phase 1: scaffold app shell, auth, onboarding, home, and tap/listen/build exercises.
- Phase 2: add speech grading (cloud first), retry flows, and progress sync.
- Phase 3: add stories, downloads, and offline exercise playback.
- Phase 4: add spaced review, streaks, and notifications.
- Phase 5: add entitlements, paywall, and billing reconciliation.
- Phase 6: accessibility, privacy controls, and manual native verification.

## Next Steps

- Replace source-discovery URLs with verified exact URLs.
- Select an ASR provider and document privacy DPA requirements.
- Confirm curriculum authoring pipeline and licensing for voice talent.
