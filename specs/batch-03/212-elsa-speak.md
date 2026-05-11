# ELSA-Speak-Style Clone Spec

> Metadata
> - Inspiration app: ELSA Speak
> - Category: AI pronunciation coach, language learning, speech analysis, phoneme scoring
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: real-time phoneme scoring latency on device, exact pronunciation grading thresholds, adaptive difficulty algorithm behavior, native speaker audio comparison UX, waveform visualization rendering during recording, speech model accuracy across accents, push notification payloads, subscription tier enforcement, and leaderboard ranking algorithm require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary speech models, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI pronunciation coach inspired by ELSA Speak's public product: a speech analysis application that records user speech, scores pronunciation at the phoneme level, provides real-time visual and textual feedback, and guides learners through structured lesson curricula organized by topic, difficulty, and skill area. The clone emphasizes phoneme-level granularity, adaptive daily lesson plans, fluency and intonation analysis, vocabulary building with a pronunciation-first approach, and conversation practice scenarios.

The clone must use original branding, UI copy, audio assets, and independently trained or licensed speech recognition models. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide phoneme-level pronunciation scoring (0-100) for individual sounds, words, and sentences.
- Deliver real-time visual feedback during speech recording with waveform visualization and color-coded phoneme results.
- Offer a structured lesson curriculum organized by topic, difficulty level, and target skill area.
- Generate adaptive daily lesson plans that adjust to each learner's strengths and weaknesses.
- Analyze fluency, intonation, and stress patterns beyond single-phoneme accuracy.
- Enable vocabulary building with a pronunciation-first approach where each word is practiced aloud.
- Support conversation practice scenarios that simulate real-world dialogues.
- Track progress over time with skill radar charts and historical score trends.

## Non-Goals

- Do not imply affiliation with ELSA Corp or any speech technology provider.
- Do not copy proprietary speech recognition models, phoneme scoring algorithms, training data, or private API schemas.
- Do not replicate exact scoring thresholds, adaptive difficulty curves, or internal curriculum sequencing without independent verification.
- Do not present pronunciation feedback as professional speech therapy or medical advice.
- Do not process voice recordings for model training without explicit opt-in consent.
- Do not store raw audio beyond the documented retention window unless the user opts in.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| ELSA Speak Website | https://elsaspeak.com | Product overview, feature descriptions, pricing tiers | Verified 2026-05-11 |
| ELSA App Store Listing | https://apps.apple.com/app/elsa-speak-english-learning/id1083804886 | Feature list, screenshots, user reviews, app description | Verified 2026-05-11 |
| ELSA Play Store Listing | https://play.google.com/store/apps/details?id=us.nobarriers.elsa | Feature list, screenshots, user reviews, app description | Verified 2026-05-11 |
| ELSA Blog | https://elsaspeak.com/blog | Product updates, feature announcements, methodology | Verified 2026-05-11 |

## Detailed Design

### Phoneme-Level Speech Analysis

- User records a word or sentence by pressing and holding a microphone button or tapping to start/stop.
- Audio is uploaded to the backend for server-side analysis by an independently trained speech recognition model.
- The model segments the utterance into individual phonemes and scores each on a 0-100 scale.
- Results are returned via SSE streaming: phoneme scores arrive incrementally so the UI can animate results progressively.
- Each phoneme is color-coded: green (80-100, good), yellow (50-79, needs work), red (0-49, incorrect).
- Word-level and sentence-level aggregate scores are computed from weighted phoneme scores.
- Tapping a scored phoneme opens a detail view with mouth position diagram, native speaker audio clip, and retry button.

### Waveform Visualization

- During recording, a real-time waveform displays audio amplitude to confirm microphone input.
- After analysis, the waveform is annotated with color-coded regions corresponding to each phoneme's score.
- Users can tap waveform segments to replay specific portions of their recording aligned with the phoneme breakdown.

### Lesson Curriculum

- Lessons are organized in a three-level hierarchy: skill area (vowels, consonants, intonation, stress, fluency) > topic > individual lesson.
- Each lesson contains 5-15 practice items: words, sentences, or short dialogues.
- Lessons are tagged with difficulty (beginner, intermediate, advanced) and estimated duration.
- Completing a lesson records scores and unlocks the next lesson in the sequence.

### Adaptive Daily Plans

- Each day, the system generates a personalized lesson plan based on the user's weakest phonemes and skill areas.
- The plan targets 10-15 minutes of practice with a mix of review (weak areas) and new material.
- Plan difficulty adjusts based on rolling 7-day score averages per skill area.
- Users can skip or replace individual plan items without breaking the streak.

### Fluency, Intonation, and Stress Analysis

- Beyond phoneme accuracy, the system evaluates speaking rate (words per minute), pause placement, pitch contour (intonation), and syllable stress patterns.
- Fluency score reflects natural pacing without excessive hesitation or rushed delivery.
- Intonation feedback shows a pitch curve overlay compared to a reference native speaker pattern.
- Stress analysis highlights which syllables received correct or incorrect emphasis.

### Conversation Practice

- Scripted dialogue scenarios simulate real-world contexts (ordering food, job interview, travel).
- The user speaks one side of the conversation; the app provides the other side via text-to-speech or pre-recorded audio.
- Each user turn is scored for pronunciation, fluency, and completeness.
- Scenarios adapt: if the user struggles, the app offers simplified alternatives or pronunciation drills for difficult words.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with value proposition, creates account or logs in, takes an initial pronunciation assessment to establish baseline scores, receives a personalized skill profile.
2. **Daily Practice**: User opens app, sees today's adaptive lesson plan on the dashboard, taps the first item, records pronunciation, receives phoneme-level feedback, progresses through the plan.
3. **Word Practice**: User browses a lesson, selects a word, listens to native speaker audio, records their attempt, sees color-coded phoneme scores, taps a red phoneme to view mouth position guidance, retries until score improves.
4. **Sentence Practice**: User records a full sentence, sees word-by-word and phoneme-by-phoneme scores, reviews fluency and intonation overlays, replays specific segments via waveform tapping.
5. **Conversation Drill**: User enters a conversation scenario, speaks their dialogue turns, receives per-turn pronunciation and fluency scores, completes the scenario and sees an overall conversation score.
6. **Progress Review**: User opens the progress screen, views skill radar chart across phoneme categories, checks weekly score trends, identifies weakest areas, navigates to targeted practice.
7. **Vocabulary Building**: User browses vocabulary items organized by topic, taps a word to hear native pronunciation, records their attempt, adds difficult words to a review list.
8. **Streak and Leaderboard**: User completes daily plan to maintain streak, views position on weekly leaderboard, sees streak milestone badges.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, language selection, consent |
| Home/Dashboard | Daily hub | Today's plan, streak counter, overall score, quick-start buttons, leaderboard rank |
| Lesson Browser | Curriculum navigation | Skill area tabs, topic cards, difficulty filters, progress indicators per lesson |
| Lesson Player | Practice session | Current item (word/sentence), microphone button, native audio playback, skip/next |
| Pronunciation Practice | Recording and scoring | Waveform visualizer, record button, phoneme result grid, retry, native comparison |
| Speech Analysis Results | Detailed feedback | Color-coded phoneme breakdown, word scores, fluency/intonation/stress overlays, mouth diagrams |
| Progress/Skills | Performance tracking | Skill radar chart, score history graphs, weakest phonemes list, streak calendar |
| Vocabulary | Word bank | Topic-organized word list, pronunciation score per word, review list, search |
| Conversation Practice | Dialogue scenarios | Scenario picker, dialogue transcript, user turn recording, per-turn scores |
| Settings | Account and preferences | Profile, subscription status, audio quality, notification prefs, data export, delete account |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, native_language, target_accent, created_at, overall_score, streak_count, streak_last_date, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, microphone_permission, token, created_at, revoked_at |
| Lesson | id, skill_area, topic, title, difficulty, estimated_minutes, item_count, sort_order, created_at |
| LessonProgress | id, user_id, lesson_id, status (not_started/in_progress/completed), best_score, attempts, started_at, completed_at |
| PronunciationAttempt | id, user_id, target_type (word/sentence), target_id, recording_ref, overall_score, fluency_score, intonation_score, stress_score, created_at |
| PhonemeScore | id, attempt_id, phoneme_ipa, position_index, score, start_ms, end_ms |
| Word | id, text, ipa_transcription, native_audio_ref, difficulty, lesson_id, sort_order |
| Sentence | id, text, ipa_transcription, native_audio_ref, difficulty, lesson_id, word_ids[], sort_order |
| VocabularyItem | id, user_id, word_id, best_score, attempt_count, in_review_list, last_practiced_at |
| SpeechRecording | id, user_id, attempt_id, audio_url, duration_ms, sample_rate, format, uploaded_at, retention_expires_at |
| DailyPlan | id, user_id, date, items[] (lesson_id, item_type, target_id), completed_count, total_count, generated_at |
| Subscription | id, user_id, tier (free/premium/pro), status, started_at, expires_at, store_receipt_ref |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation with native language and target accent |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /lessons | GET | List lessons with filters (skill_area, difficulty, topic) and pagination |
| /lessons/:id | GET | Fetch lesson detail with words and sentences |
| /lessons/:id/progress | GET | Fetch user progress for a specific lesson |
| /pronunciation/score | POST | Upload audio recording for phoneme-level analysis (SSE streaming response) |
| /pronunciation/attempts | GET | List user's pronunciation attempts with scores and pagination |
| /pronunciation/attempts/:id | GET | Fetch detailed attempt with phoneme scores |
| /vocabulary | GET | List user's vocabulary items with scores and review status |
| /vocabulary/:word_id | POST | Add word to vocabulary / update review list status |
| /daily-plan | GET | Fetch today's adaptive daily plan |
| /daily-plan/generate | POST | Force-regenerate daily plan |
| /progress/summary | GET | Fetch overall progress: skill radar data, score trends, streak info |
| /progress/leaderboard | GET | Fetch weekly leaderboard with pagination |
| /conversations/scenarios | GET | List available conversation practice scenarios |
| /conversations/scenarios/:id/start | POST | Start a conversation practice session |
| /settings | GET/PATCH | Read and update user preferences |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: The `/pronunciation/score` endpoint returns an SSE stream with event types: `analysis_start`, `phoneme_score` (per phoneme as analyzed), `word_score` (aggregate per word), `sentence_score` (aggregate per sentence), `fluency_result`, `analysis_complete`, `error`, `done`.

## Realtime Push And Offline Behavior

- Pronunciation scoring uses SSE streaming so phoneme results animate progressively as analysis completes server-side.
- Audio upload uses chunked transfer or multipart form to handle recordings up to 60 seconds.
- Offline mode: lesson content and vocabulary are cached locally; users can browse lessons and review vocabulary without connectivity.
- Offline recordings are queued locally and submitted for scoring when connectivity returns.
- Daily plan is cached at generation time; if the user opens the app offline, the cached plan is displayed.
- Push notifications (opt-in): daily practice reminders, streak at-risk warnings, weekly progress summaries.
- Local draft persistence: in-progress lesson state survives app kill/restart.
- Audio cache management: native speaker reference audio is pre-downloaded per lesson; eviction uses LRU with configurable cache size.

## Permissions Privacy And Safety

- Microphone: requested on first recording attempt with a clear explanation of why audio access is needed.
- Notifications: requested only after the user completes their first lesson, with explanation of reminder benefits.
- No camera, location, contacts, or calendar access required for V1.
- Voice recordings are encrypted in transit (TLS) and at rest (AES-256 or equivalent).
- Recordings are retained only for the documented retention window (default 30 days) unless the user opts in to longer retention for progress tracking.
- Voice data is not used for model training without explicit opt-in consent, presented as a separate toggle.
- All pronunciation feedback carries a disclaimer: "AI-generated feedback for language practice. Not a substitute for professional speech therapy."
- Child safety: if age-gating is required by jurisdiction, implement age verification before account creation; COPPA/GDPR-K compliance for users under 13/16.
- Data export includes all recordings, scores, lesson progress, and account data.
- Account deletion purges all user data including audio recordings within documented retention window (legal holds excepted).
- Manual verification required: exact permission prompt timing, microphone access behavior across OS versions, push payload format, recording quality across devices.

## Analytics And Monetization

- Events tracked: session_start, lesson_started, lesson_completed, recording_submitted, phoneme_score_viewed, word_retried, daily_plan_opened, daily_plan_completed, vocabulary_word_added, conversation_started, conversation_completed, leaderboard_viewed, streak_milestone, settings_changed.
- Event properties: coarse score bucket (0-25/26-50/51-75/76-100), skill_area, difficulty, session_duration_bucket, device_platform. Never raw audio, transcripts, or personal content.
- Monetization model: free tier with limited daily recordings and basic lessons; premium tier unlocks unlimited recordings, all lessons, advanced analytics (fluency/intonation/stress), conversation practice, and detailed progress insights.
- Premium billing via app-store IAP with trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate: basic pronunciation scoring, daily streak tracking, account management, data export/delete, or safety features.

## Edge Cases

- Background noise during recording: detect ambient noise level before scoring, warn user if noise exceeds threshold, offer retry with guidance to find a quieter environment.
- Accent variation: users may speak with regional accents that differ from the target accent model; display accent selection in onboarding and allow switching; scores should reflect target accent, not penalize native accent features unrelated to the target.
- Very short or silent recordings: detect recordings under 0.5 seconds or below minimum amplitude; reject with "no speech detected" feedback rather than scoring silence.
- Extremely long recordings: cap recording duration at 60 seconds; truncate gracefully with indicator if user exceeds limit.
- Speech model latency spikes: if server-side analysis exceeds 10-second timeout, show progress indicator with estimated wait; allow cancellation and retry.
- Unsupported phonemes: if the target language contains phonemes not covered by the model, skip scoring for those phonemes and display "not yet supported" rather than incorrect scores.
- Device microphone quality variance: low-quality microphones may reduce scoring accuracy; detect sample rate and warn if below minimum threshold (16kHz).
- Concurrent daily plan generation: if user triggers plan generation while one is in progress, deduplicate and return the in-progress result.
- Subscription expiry mid-lesson: allow current lesson to complete but block starting new premium lessons until renewed.
- Leaderboard tie-breaking: ties in weekly score are broken by fewer attempts (efficiency), then by earlier completion time.

## Test Plan

- Unit tests: phoneme score aggregation, color-code thresholds, waveform segment mapping, daily plan generation logic, streak calculation, leaderboard ranking, recording duration validation, noise detection threshold.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, and server error responses.
- Integration tests: full flow from recording through SSE analysis to phoneme display; lesson completion updating progress; daily plan generation reflecting weak areas; vocabulary add and review cycle.
- Streaming tests: SSE event ordering (analysis_start before phoneme_scores before done), reconnection mid-analysis, error event handling, cancellation during analysis.
- Audio tests: recording at various sample rates, upload of various formats (WAV, M4A, OGG), chunked upload for large files, offline queue and deferred upload.
- Offline tests: lesson cache availability, recording queue persistence, daily plan cache display, reconnect submission of queued recordings.
- Safety tests: age-gate flow (if applicable), recording consent display, data export completeness, account deletion purge verification, disclaimer presence.
- Accessibility tests: microphone button screen-reader labels, phoneme score announcements, waveform non-visual alternatives, lesson navigation focus management.
- Performance tests: recording-to-first-phoneme-score latency, waveform rendering frame rate during recording, large lesson list scroll performance, audio cache eviction behavior.
- Manual verification tests: microphone permission prompts across iOS/Android versions, recording quality on low-end devices, push notification delivery, subscription state transitions.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can record speech and receive phoneme-level scores (0-100) with color-coded visual feedback.
- At least three skill areas (vowels, consonants, fluency) have populated lesson curricula.
- Daily adaptive plans generate based on the user's weakest skill areas and adjust over a 7-day rolling window.
- Waveform visualization displays during recording and annotates with phoneme score colors after analysis.
- Fluency, intonation, and stress scores are returned alongside phoneme accuracy for sentence-level attempts.
- Conversation practice scenarios allow the user to speak dialogue turns and receive per-turn scores.
- Progress screen displays a skill radar chart and historical score trends.
- Vocabulary items track best pronunciation score and support a review list.
- SSE streaming delivers phoneme scores progressively without UI corruption.
- Offline mode caches lessons and queues recordings for deferred scoring.
- Safety disclaimers, recording consent, and data retention policies are present and tested.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What exact phoneme inventory does ELSA Speak support, and does it vary by target accent (American, British, Australian)?
- What are the precise scoring thresholds for pass/fail per phoneme and per lesson completion?
- How does the adaptive difficulty algorithm weight recent performance vs. historical performance?
- What speech recognition model architecture does ELSA use (end-to-end, hybrid HMM, or custom), and what open-source alternatives achieve comparable phoneme-level accuracy?
- Does ELSA Speak process audio entirely server-side or use on-device models for initial analysis?
- What is the exact daily recording limit on the free tier?
- How are native speaker reference audio clips sourced and licensed?
- Does the leaderboard rank by overall score, daily score, or improvement rate?
- How does ELSA handle languages beyond English (if at all) in terms of phoneme model coverage?
- What is the retention period for user voice recordings, and can users opt out of server-side storage entirely?

## Build Plan

- **Phase 1 — App Shell + Auth + Basic Recording**: Auth flows (email and OAuth), microphone permission handling, basic audio recording with waveform visualization, audio upload to backend. Target: functional recording shell with account management.
- **Phase 2 — Pronunciation Scoring Engine**: Server-side speech analysis pipeline with an open-source phoneme recognition model, SSE streaming of phoneme scores, color-coded phoneme result display, word and sentence aggregate scores. Target: end-to-end pronunciation scoring.
- **Phase 3 — Lesson Curriculum + Lesson Player**: Lesson data model and CRUD, lesson browser with skill area and difficulty filters, lesson player with sequential word/sentence practice, native speaker audio playback, lesson progress tracking. Target: structured learning flow.
- **Phase 4 — Daily Plans + Adaptive Difficulty**: Daily plan generation algorithm based on weakest phonemes, plan display on dashboard, plan item completion tracking, rolling 7-day score-based difficulty adjustment, streak tracking. Target: personalized daily practice.
- **Phase 5 — Advanced Analysis + Conversation Practice**: Fluency, intonation, and stress scoring; pitch contour visualization; conversation practice scenarios with dialogue turns; per-turn scoring; vocabulary builder with review list. Target: full analysis depth and conversation mode.
- **Phase 6 — Progress + Leaderboards + Polish**: Skill radar chart, historical score trend graphs, weekly leaderboard, streak milestones, push notifications, offline mode polish, accessibility audit, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with an ELSA Speak free-tier account to capture exact scoring UX, phoneme display format, lesson structure, daily plan behavior, and recording limits.
- Evaluate open-source speech recognition models (e.g., Wav2Vec 2.0, Whisper with phoneme alignment, Montreal Forced Aligner) for phoneme-level scoring accuracy comparable to a production pronunciation coach.
- Source or record original native speaker reference audio clips under appropriate licensing for lesson content.
- Design original branding, UI copy, and onboarding content distinct from ELSA's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
