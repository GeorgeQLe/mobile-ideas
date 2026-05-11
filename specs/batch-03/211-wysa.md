# Wysa-Style Clone Spec

> Metadata
> - Inspiration app: Wysa
> - Category: mental health AI companion, CBT/DBT exercises, mood tracking, wellbeing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: native iOS/Android screens, signup/onboarding flows, AI chatbot conversation quality and safety guardrails, exercise audio playback behavior, sleep story streaming, mood tracking visualization details, self-assessment scoring logic, push notification payloads, therapist referral CTA behavior, and crisis resource screen exact content require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary system prompts, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile mental health AI companion inspired by Wysa's public product: a conversational wellbeing chatbot using CBT, DBT, meditation, and mindfulness techniques alongside mood tracking, guided exercises, sleep stories, journaling, and self-assessment tools. The clone focuses on accessible emotional support, evidence-based exercises, and daily wellbeing check-ins with strict safety guardrails for mental health content.

The clone must use original branding, UI copy, exercise scripts, and licensed audio assets. Any manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact native behavior. This app is health-adjacent and requires a category-specific risk review before implementation per project conventions.

## Goals

- Provide a conversational AI companion using CBT, DBT, mindfulness, and motivational interviewing for emotional support.
- Support daily mood check-ins with visual mood history graphs and trend insights.
- Offer guided exercises: breathing, muscle relaxation, gratitude journaling, thought reframing, grounding.
- Provide sleep stories and ambient soundscapes for sleep support.
- Enable free-form journaling with mood-tagged entries and reflection prompts.
- Include original self-assessment tools modeled on validated instruments (not copyrighted PHQ-9/GAD-7).
- Surface an SOS/crisis resource screen with emergency contacts and helplines at all times.
- Track wellbeing goals, habits, and streaks with a progress dashboard.

## Non-Goals

- Do not imply affiliation with Wysa, Touchkin, or any associated entity.
- Do not copy proprietary model weights, system prompts, exercise scripts, audio assets, or private APIs.
- Do not provide clinical diagnoses, prescribe medication, or claim to replace professional therapy.
- Do not replicate copyrighted screening instruments (PHQ-9, GAD-7) or their exact scoring.
- Do not store mental health data without explicit consent and documented encryption/retention.
- Do not enable therapist matching or scheduling; limit to referral CTAs with disclaimers.
- Do not process real crisis interventions; always redirect to established emergency services.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Wysa Website | https://www.wysa.com | Product positioning, feature descriptions, therapeutic approach, safety commitments | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/us/app/wysa-anxiety-therapy-chatbot/id1166585565 | iOS listing, category, rating, feature description, privacy labels | Pending verification |
| Google Play | https://play.google.com/store/apps/details?id=bot.touchkin | Android listing, permissions, data safety section | Pending verification |
| Wysa Blog | https://www.wysa.com/blog | Feature announcements, therapeutic methodology, clinical evidence references | Verified 2026-05-11 |

## Detailed Design

### AI Chatbot Companion

- User opens a conversation; the bot uses CBT, DBT, mindfulness, and motivational interviewing techniques.
- Conversations structured around emotional check-ins: bot asks how the user feels, explores the emotion, offers a relevant exercise or reframe.
- Bot maintains session context and can reference recent mood entries and exercise completions.
- Streaming responses render progressively; exercise prompts and mood reflections are delivered as structured SSE events.
- Safety layer: every user message is screened for crisis indicators before response generation (see Permissions Privacy And Safety).

### Mood Tracking

- Daily mood check-in with 5-point scale selector (emoji-style icons), optional text note, and context tags (work, relationships, health, sleep).
- Mood history displayed as timeline graph showing trends over 7, 30, and 90 day windows.
- Check-in reminders delivered via local notification at user-configured times.

### Guided Exercises

- Library organized by category: breathing, muscle relaxation, gratitude, thought reframing, grounding, visualization.
- Player screen with step-by-step instructions, optional audio narration, timer/progress bar, and completion tracking.
- Breathing exercises use animated visual guides (expanding/contracting circle) synced to inhale/hold/exhale timing.
- Thought reframing exercises use interactive prompts: identify thought, examine evidence, generate alternative perspective.

### Sleep Stories and Soundscapes

- Curated library of original sleep stories and ambient soundscapes (no copyrighted content).
- Audio playback with sleep timer (15/30/45/60 min or end of story), background playback, and lock-screen controls.
- Playback history and favorites tracking.

### Journaling

- Free-form journal entries with mood tag, date, and optional rotating daily prompt (gratitude, reflection, goal-setting, emotional processing themes).
- Entries searchable by date, mood tag, and keyword.

### Self-Assessment Tools

- Original wellbeing questionnaires inspired by validated instruments but rewritten to avoid copyright (not PHQ-9/GAD-7 verbatim).
- Assessments cover mood/depression indicators, anxiety indicators, sleep quality, and general wellbeing.
- Scores displayed with context ("your responses suggest you may benefit from speaking with a professional") and always paired with a disclaimer and therapist referral CTA.
- Assessment history shows score trends over time.

### Goal Setting and Progress

- Users set wellbeing goals (e.g., "meditate 5 minutes daily", "journal 3 times per week").
- Habit tracker with streak counters, completion calendar, and weekly/monthly summaries.
- Progress dashboard aggregates mood trends, exercise completions, journal frequency, and goal streaks.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with AI companion concept and privacy commitment, creates account, completes initial mood check-in, lands on home dashboard.
2. **Daily Check-In**: Reminder notification opens mood check-in; user selects mood, adds context, sees updated graph, gets exercise suggestion.
3. **AI Chat Session**: User describes feelings; bot explores emotion via CBT techniques, suggests breathing exercise, user completes it in-chat.
4. **Guided Exercise**: User browses library, selects progressive muscle relaxation, follows audio-guided session, marks complete, sees streak update.
5. **Crisis Flow**: Distress keywords in chat trigger immediate crisis resource screen with 988 Lifeline and emergency numbers; normal conversation pauses.
6. **Journaling**: User writes reflection using daily prompt, tags mood, saves entry, reviews past entries.
7. **Sleep Support**: User selects sleep story, sets 30-minute timer, listens with screen off.
8. **Self-Assessment**: User completes questionnaire, reviews score with context and trend, gets therapist referral CTA.
9. **Progress Review**: User reviews weekly mood trend, exercise streak, and goal completion on insights dashboard.
10. **Account Management**: User exports data, adjusts privacy/notification settings, or deletes account.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry and onboarding | Sign up, sign in, privacy commitment, initial mood check-in |
| Home Dashboard | Daily hub | Mood summary, quick check-in button, suggested exercise, streak counter, recent chat preview |
| AI Chat | Conversational companion | Message list, composer, exercise prompts inline, crisis resource banner, mood reflection cards |
| Mood Check-In | Daily mood entry | Mood scale selector, context tags, text note, save button, mood graph preview |
| Exercise Library | Browse exercises | Category filters, exercise cards with duration/type, favorites, completion indicators |
| Exercise Player | Guided exercise session | Step instructions, audio controls, animated visual guide, timer/progress, complete button |
| Journal | Mood-tagged entries | Entry list, compose button, daily prompt, search/filter by mood or date |
| Sleep Stories | Sleep audio content | Story/soundscape cards, play button, sleep timer, favorites, playback history |
| Progress/Insights | Wellbeing dashboard | Mood trend graph, exercise streaks, goal completion, assessment score history |
| Settings | Account and preferences | Notification schedule, data export, privacy controls, therapist referral link, delete account |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, timezone, onboarding_complete, created_at, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, created_at, revoked_at |
| Conversation | id, user_id, title, started_at, last_message_at, message_count, deleted_at |
| Message | id, conversation_id, role (user/assistant/system), content, content_type (text/exercise_prompt/mood_reflection/crisis_alert), safety_flagged, created_at |
| MoodEntry | id, user_id, mood_score (1-5), context_tags[], note, source (check_in/chat/journal), created_at |
| Exercise | id, category, title, description, duration_seconds, audio_url, steps[], difficulty, sort_order |
| ExerciseSession | id, user_id, exercise_id, started_at, completed_at, duration_seconds, completion_status |
| JournalEntry | id, user_id, mood_tag, prompt_text, body, word_count, created_at, updated_at |
| SleepStory | id, title, category (story/soundscape), duration_seconds, audio_url, narrator, sort_order |
| WellbeingGoal | id, user_id, title, frequency (daily/weekly), target_count, current_streak, longest_streak, created_at, archived_at |
| SelfAssessment | id, user_id, assessment_type (mood/anxiety/sleep/wellbeing), responses[], total_score, severity_label, created_at |
| SafetyReport | id, user_id, trigger_message_id, trigger_type (crisis_keyword/user_report/model_flag), action_taken, created_at |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation with consent capture |
| /auth/login | POST | Session creation (email/password or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /conversations | GET | List user conversations |
| /conversations | POST | Create new conversation |
| /conversations/:id | GET | Fetch conversation with messages |
| /conversations/:id | DELETE | Soft-delete conversation |
| /conversations/:id/messages | POST | Send message (streaming response via SSE) |
| /mood | GET | List mood entries with date range filter |
| /mood | POST | Create mood check-in entry |
| /exercises | GET | List exercises with category filter |
| /exercises/:id/sessions | POST | Start or complete an exercise session |
| /journal | GET | List journal entries with search/filter |
| /journal | POST | Create journal entry |
| /journal/:id | PATCH | Update journal entry |
| /sleep-stories | GET | List sleep stories and soundscapes |
| /goals | GET | List wellbeing goals |
| /goals | POST | Create wellbeing goal |
| /goals/:id/check-in | POST | Record goal completion for today |
| /assessments | GET | List past assessment results |
| /assessments | POST | Submit completed assessment |
| /crisis/resources | GET | Fetch current crisis resource list (region-aware) |
| /reports | POST | Submit safety or content report |
| /account/export | POST | Request full data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message creation returns an SSE stream with event types: `content_delta`, `content_done`, `exercise_prompt`, `mood_reflection`, `safety_flag`, `error`, `done`. Safety flags halt normal content streaming and inject crisis resource payloads.

## Realtime Push And Offline Behavior

- Response streaming uses SSE with automatic reconnection and resume from last event ID.
- Safety flag events interrupt normal streaming and immediately surface crisis resources client-side.
- Mood check-in reminders and streak milestones use local notifications at user-configured times.
- Offline: cached conversations, mood history, journal entries, and exercises are readable; new messages queued as drafts.
- Sleep story audio supports background playback with lock-screen controls; sleep timer fires locally.
- Reconnect reconciliation uses idempotency keys to prevent duplicate submissions.
- Push notifications (opt-in): check-in reminders, weekly summaries, streak-at-risk warnings.

## Permissions Privacy And Safety

- Notifications: requested after onboarding for mood check-in reminders; deferrable.
- Microphone: not required for V1 (text-only chat; audio is playback-only).
- Camera/photo library/location/contacts: not required.
- Clipboard: no background monitoring; paste only on explicit user action.

### Category-Specific Risk Review: Mental Health

This application is health-adjacent per project conventions and requires heightened safety measures.

**Mental health content safety**: Every user message is screened for crisis indicators (self-harm, suicidal ideation, abuse, severe distress) before AI response generation. When detected, normal generation halts and the app surfaces a crisis resource screen with the 988 Suicide and Crisis Lifeline (call/text 988), Crisis Text Line (text HOME to 741741), and local emergency services (911 or regional equivalent). The safety_flag SSE event triggers this client-side interruption.

**No clinical diagnosis claims**: All AI responses and assessment results include a persistent disclaimer: "This app is not a replacement for professional therapy or medical advice. If you are in crisis, please contact emergency services or a crisis helpline." Assessment scores use descriptive language and never diagnostic labels.

**Content moderation**: The AI is constrained to supportive, evidence-based therapeutic techniques. It must not provide medication advice, diagnose conditions, or validate harmful behaviors. User-reported and model-flagged messages are logged to SafetyReport for review.

**Data sensitivity**: Mood entries, journal content, chat transcripts, and assessment scores are sensitive health data. All data encrypted at rest and in transit. Retention policies are documented and user-facing. Data never used for model training without explicit opt-in. Data export includes all health data in machine-readable format.

**Therapist referral CTAs**: The app surfaces "Talk to a professional" CTAs on assessment results and in settings. These link to general therapist-finding resources (e.g., Psychology Today directory, SAMHSA helpline) with a disclaimer: "We do not provide therapist matching, scheduling, or clinical services. These links are informational resources only."

**Risk review conclusion**: Implementation must not proceed without the safety screening pipeline, crisis resource interruption flow, clinical disclaimer system, and sensitive data encryption all in place and tested. Any feature surfacing mental health scores, AI emotional guidance, or crisis detection must pass safety-specific acceptance tests before release.

## Analytics And Monetization

- Events tracked: session_start, mood_check_in, chat_message_sent, exercise_started, exercise_completed, journal_entry_created, sleep_story_played, assessment_completed, goal_created, goal_checked_in, crisis_resource_viewed.
- Event properties: coarse mood bucket, exercise category, duration bucket, streak bucket, assessment type. Never raw chat content, journal text, or assessment responses.
- Monetization model: free tier with access to AI chat, basic exercises, mood tracking, and journaling; premium tier for full exercise library, all sleep stories, advanced insights, and unlimited assessments.
- Premium billing via app-store IAP; handles trial, renewal, cancellation, refund, restore, and cross-platform sync.
- Paywalls must not gate crisis resources, safety features, basic mood tracking, data export/delete, or account recovery.

## Edge Cases

- Crisis keywords in chat: halt AI generation immediately and surface crisis resources; never attempt AI crisis counseling.
- Multiple mood check-ins per day: allow all entries, display on timeline, use latest for daily summary.
- Exercise audio fails to load: show text-only fallback with step instructions; log error.
- Sleep timer fires while buffering: stop playback immediately regardless of buffer state.
- Assessment edge-case score (all min or max): display appropriate messaging with therapist referral CTA.
- Empty journal body: block save with inline validation.
- Offline mood check-in: save locally, sync on reconnect with idempotency key.
- AI bypasses safety filter: client-side secondary keyword check as fallback; log to SafetyReport.
- Goal streak timezone: use user-configured timezone, not server time.
- Chat exceeds context window: summarize earlier messages transparently; never silently drop context.
- Account deletion during active exercise: cancel playback, purge all data within retention window.
- Phone call interrupts sleep story: pause and resume on call end; respect sleep timer during pause.

## Test Plan

- Unit tests: mood score validation, streak calculation, assessment scoring, crisis keyword detection, SSE event parsing, sleep timer countdown, timezone-aware date bucketing.
- Contract tests: all API endpoints with success, validation error, auth error, and server error responses.
- Integration tests: chat flow through streaming response; mood check-in through graph update; exercise start through completion and streak increment; assessment submission through score display.
- Safety tests: crisis keyword detection accuracy, safety_flag SSE triggers crisis screen, AI never generates diagnostic claims, disclaimer presence on all assessments and AI responses, therapist referral CTAs are informational only.
- Streaming tests: SSE reconnection, exercise_prompt rendering, safety_flag interruption mid-stream, mood_reflection card display.
- Offline tests: mood entry local persistence and sync, journal draft preservation, chat message queueing, duplicate prevention on reconnect.
- Audio tests: sleep story background playback, sleep timer accuracy, lock-screen controls, phone call interruption, audio load failure fallback.
- Accessibility tests: mood selector screen-reader labels, exercise timer announcements, crisis resource screen keyboard navigation.
- Performance tests: mood graph rendering with 90 days of data, chat scroll with long history, exercise library load.
- Manual verification tests: native permission prompts, store purchase/restore, push delivery, audio background mode on device.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- AI chat delivers supportive responses using CBT/DBT/mindfulness techniques with streaming.
- Crisis keyword detection halts AI response and surfaces crisis resources within one second.
- All AI responses and assessment results display clinical disclaimers.
- Mood check-in supports 5-point scale with context tags and history graph (7/30/90 day windows).
- Exercise library browsable by category with guided player (audio, visual guide, timer).
- Sleep stories support background playback with sleep timer and lock-screen controls.
- Journal supports free-form entries with mood tags, prompts, and search.
- Self-assessments display scores with descriptive context and therapist referral CTAs.
- Goal tracking maintains accurate streaks with timezone-aware date boundaries.
- Offline mode preserves mood entries, journal drafts, and chat messages with sync on reconnect.
- Safety screening pipeline, crisis interruption flow, and disclaimer system pass all safety tests.
- Category-specific mental health risk review documented and all mitigations implemented.
- Manual verification blockers documented and feature-flagged.
- At least 13 data model entities and 10 screens specified.

## Open Questions

- What crisis keyword detection approach does Wysa use (regex, ML classifier, or hybrid)?
- What are the exact free vs. premium feature boundaries on mobile?
- Does Wysa use its own LLM or a third-party provider for the chatbot?
- What is the exact set of exercise categories and count per category?
- How many sleep stories/soundscapes are available and what is the average duration?
- Are self-assessments available on free tier or premium only?
- Does the app support multiple languages or region-specific crisis resources?
- What is the exact onboarding flow (screens, initial assessment, personalization)?
- What is the data retention period after account deletion?

## Build Plan

- **Phase 1 — App Shell, Auth, Mood Tracking**: Auth flows, onboarding with initial mood check-in, home dashboard, daily check-in with 5-point scale and context tags, mood history graph. Target: functional mood tracking shell.
- **Phase 2 — AI Chat with Safety Pipeline**: Conversational AI with SSE streaming, crisis keyword detection, safety flag interruption, crisis resource screen, clinical disclaimers. Target: safe AI chat.
- **Phase 3 — Exercise Library and Player**: Exercise catalog by category, guided player with audio, breathing animation, muscle relaxation, thought reframing prompts, completion tracking. Target: full exercise experience.
- **Phase 4 — Journaling, Sleep, Assessments**: Journal with mood tags and prompts, sleep story library with playback and timer, self-assessment with scoring and trends. Target: complete content features.
- **Phase 5 — Goals, Progress, Insights**: Goal creation, habit tracking, streak calculation, progress dashboard aggregating all wellbeing data. Target: holistic progress view.
- **Phase 6 — Premium, Polish, Safety Hardening**: IAP billing, paywall enforcement (never gating safety), accessibility audit, safety hardening, push notifications, offline polish. Target: app-store-ready.

## Next Steps

- Verify Wysa iOS and Android app store listings; update Research Sources status accordingly.
- Conduct lawful hands-on verification to capture exact onboarding flow, chat behavior, exercise catalog, and premium boundaries.
- Complete category-specific mental health risk review with implementation team before Phase 2.
- Select original providers for inference, audio narration, and exercise content creation.
- Design original branding, UI copy, exercise scripts, and assessment questionnaires distinct from Wysa's materials.
- Scaffold downstream repo with Phase 1 structure and feature flags for all manual verification blockers.
