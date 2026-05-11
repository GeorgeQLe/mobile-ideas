# Genie-Style Clone Spec

> Metadata
> - Inspiration app: Genie
> - Category: AI assistant, conversational AI, task automation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, publicly documented features.
> - Manual verification blockers: exact streaming latency SLAs, premium tier token quotas, persona customization depth, voice input transcription pipeline behavior, image understanding model capabilities, content generation quality thresholds, and quick action integration scope require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary AI models, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI assistant inspired by Genie's public product: a conversational AI with multi-modal input (text, voice, image), chat threads with context memory, AI-powered content generation (text, summaries, translations), custom personas/assistants, quick action shortcuts for common tasks, task automation with smart suggestions, and personalization that learns from user preferences. The clone emphasizes natural conversational interaction, versatile content creation, and adaptive personalization as primary differentiators.

The clone must use original branding, UI copy, and independently trained or licensed AI models. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile-first conversational AI assistant with persistent chat threads and context memory.
- Support multi-modal input including text, voice dictation, and image attachment for visual understanding.
- Offer AI-powered content generation covering text composition, summarization, and translation.
- Enable custom personas/assistants with distinct personality, tone, and expertise profiles.
- Provide quick action shortcuts for frequent tasks (compose email, translate, summarize, brainstorm, explain).
- Personalize responses and suggestions by learning from user interaction history and stated preferences.
- Support dark and light themes with system-default auto-switching.
- Deliver a subscription model with free and premium tiers gating advanced capabilities.

## Non-Goals

- Do not imply affiliation with Genie, its parent company, or any upstream AI provider.
- Do not copy proprietary model weights, prompt engineering, fine-tuning data, or private API schemas.
- Do not replicate exact token quotas, rate limits, or internal model routing logic without independent verification.
- Do not present AI-generated content as authoritative professional, medical, legal, or financial advice.
- Do not process production user data without explicit consent and documented retention policies.
- Do not record or store voice input audio beyond the duration needed for transcription.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Genie Product | https://www.genie.ai | Product overview, feature descriptions, pricing | Verified 2026-05-11 |
| Google Play Listing | https://play.google.com/store/apps/details?id=com.genie.ai | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/app/genie-ai-chatbot/id1660018580 | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |

## Detailed Design

### Conversational AI with Context Memory

- Each conversation is a persistent thread with full message history available to the AI for context.
- The AI maintains conversational context across messages within a thread, referencing prior exchanges for coherent multi-turn dialogue.
- Users can start new conversations or continue existing threads; thread list is searchable and sortable by recency or title.
- Thread titles are auto-generated from the first user message but editable by the user.
- Context window management: when a conversation exceeds the model context limit, older messages are summarized and compressed into a context preamble while recent messages remain verbatim.

### Multi-Modal Input

- **Text**: standard keyboard input with markdown preview support for formatted queries.
- **Voice**: tap-to-dictate button in the input bar transcribes speech to text via on-device or cloud speech-to-text; transcribed text appears in the input field for review before sending.
- **Image**: attach images from camera or photo library; the AI analyzes image content and responds with descriptions, extracted text (OCR), or answers to questions about the image.
- Input modes are selectable via icons in the message composer bar; only one active at a time.
- Voice input shows a waveform animation during recording with a cancel gesture.

### Quick Action Shortcuts

- A grid or carousel of preset action tiles on the assistant home screen for common tasks: Compose Email, Translate Text, Summarize Article, Brainstorm Ideas, Explain Concept, Write Code, Create List, Draft Message.
- Tapping a quick action opens a pre-configured conversation with a system prompt tailored to that task.
- Users can pin, reorder, or hide quick actions; custom quick actions can be created with user-defined system prompts.
- Quick actions are synced across devices via the user account.

### AI Content Generation

- **Text composition**: generate emails, messages, essays, social media posts, and other text from a brief prompt with tone and length controls.
- **Summarization**: paste or type long text and receive a concise summary with adjustable detail level (brief, standard, detailed).
- **Translation**: translate text between supported languages with source language auto-detection and target language selection.
- Content generation runs within a conversation thread so the user can iterate with follow-up instructions.
- Generated content displays with a copy button, share action, and regenerate option.

### Custom Personas

- Users select from a library of pre-built personas (e.g., Creative Writer, Code Assistant, Language Tutor, Business Advisor, Fitness Coach) or create custom personas.
- Each persona has: display name, avatar, description, system prompt defining personality/tone/expertise, and optional greeting message.
- Custom persona creation: user provides name, description, and instruction text; avatar is selected from a preset gallery or generated.
- Active persona applies to new conversations; switching persona mid-conversation starts a new context branch.
- Persona library is browsable with categories and a search bar.

### Personalization and Learning

- The system tracks user preferences: preferred response length, tone (casual/formal), language, frequently used quick actions, and topic interests.
- Preferences are inferred from interaction patterns (e.g., user consistently asks for shorter responses) and also settable explicitly in settings.
- A user preference profile is sent as context to the AI to tailor responses without retraining the model.
- Users can view and reset learned preferences at any time.

### Theme Support

- Dark and light themes with a system-default auto-switch option.
- Theme selection persists per device and syncs as a user preference.
- All screens, including chat bubbles, quick action tiles, and persona cards, adapt to the active theme.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with feature highlights, signs up or logs in, selects an initial persona or skips, lands on assistant home.
2. **Quick Conversation**: User taps the new chat button, types a question, receives a streaming AI response, continues the multi-turn dialogue.
3. **Voice Query**: User taps the microphone icon, speaks a question, reviews transcribed text, sends it, receives an AI response.
4. **Image Analysis**: User attaches a photo of a document, asks "What does this say?", receives OCR text extraction and a summary.
5. **Quick Action**: User taps "Translate Text" on the home screen, enters text and target language, receives the translation.
6. **Content Generation**: User taps "Compose Email", describes the purpose and tone, receives a draft email, iterates with "make it shorter" follow-ups.
7. **Persona Switch**: User opens persona selector, picks "Code Assistant", starts a new coding-focused conversation with the persona greeting.
8. **Custom Persona**: User creates a "Recipe Chef" persona with custom instructions, uses it to plan meals in a new conversation.
9. **History Browse**: User opens history, searches for a past conversation about travel, re-opens it and continues the thread.
10. **Subscription Upgrade**: User hits the free tier message limit, sees the upgrade prompt, subscribes to premium, continues without limits.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth providers, feature carousel, consent checkbox |
| Assistant Home | Hub and quick access | Quick action grid, recent conversations list, new chat FAB, persona indicator, greeting |
| Chat Thread | Conversational interaction | Message list with bubbles, streaming response indicator, input bar (text/voice/image), copy/share per message, regenerate button |
| Quick Actions | Browse and manage shortcuts | Action tile grid, pin/reorder controls, create custom action, search |
| Content Generator | Structured content creation | Task selector (compose/summarize/translate), input area, tone/length controls, output panel with copy/share/regenerate |
| Persona Selector | Choose or create AI personality | Persona card grid with categories, search, create custom button, active persona highlight |
| History | Past conversations | Date-grouped conversation list, search, filter by persona, swipe to delete, tap to reopen |
| Settings | Account and app preferences | Theme toggle, response length/tone preferences, language, notification prefs, learned preferences view/reset, data export, delete account |
| Subscription | Premium management | Tier comparison table, current plan badge, usage meter, upgrade/downgrade, billing history, restore purchases |
| Help & Tips | Onboarding and guidance | Feature tutorials, prompt tips, FAQ, contact support, changelog |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, avatar_url, locale, created_at, tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, theme, created_at, revoked_at |
| Conversation | id, user_id, persona_id, title, auto_title, context_summary, message_count, pinned, created_at, updated_at |
| Message | id, conversation_id, role (user/assistant/system), content_parts[], token_count, model_version, latency_ms, created_at |
| ContentPart | id, message_id, type (text/image/voice_transcript/code/markdown), body, mime_type, url, created_at |
| QuickAction | id, user_id, label, icon, system_prompt, is_builtin, sort_order, pinned, hidden, created_at |
| Persona | id, user_id, name, avatar_key, description, system_prompt, greeting, category, is_builtin, usage_count, created_at |
| ContentGeneration | id, conversation_id, task_type (compose/summarize/translate), input_text, output_text, tone, target_length, source_lang, target_lang, created_at |
| UserPreference | id, user_id, key, value, source (explicit/inferred), updated_at |
| Subscription | id, user_id, tier (free/premium), status (active/expired/cancelled/trial), message_limit, messages_used, started_at, expires_at, store_receipt_ref |
| AuditEvent | id, user_id, event_type, metadata, ip_hash, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /conversations | GET | List conversations with pagination, search, filter |
| /conversations | POST | Create new conversation with optional persona |
| /conversations/:id | GET | Fetch conversation with message history |
| /conversations/:id | PATCH | Update title, pin state |
| /conversations/:id | DELETE | Delete conversation and messages |
| /conversations/:id/messages | POST | Send message and receive streaming AI response (SSE) |
| /conversations/:id/messages/:mid/regenerate | POST | Regenerate a specific assistant message (SSE) |
| /quick-actions | GET | List quick actions (builtin and custom) |
| /quick-actions | POST | Create custom quick action |
| /quick-actions/:id | PATCH | Update quick action (pin, reorder, hide) |
| /quick-actions/:id | DELETE | Delete custom quick action |
| /personas | GET | List personas (builtin and custom) |
| /personas | POST | Create custom persona |
| /personas/:id | PATCH | Update custom persona |
| /personas/:id | DELETE | Delete custom persona |
| /content-generation | POST | Structured content task (compose/summarize/translate) within a conversation (SSE) |
| /preferences | GET | Read user preference profile |
| /preferences | PATCH | Update explicit preferences |
| /preferences/reset | POST | Reset inferred preferences |
| /settings | GET | Read app settings |
| /settings | PATCH | Update app settings (theme, notifications) |
| /subscription | GET | Current subscription status and usage |
| /subscription/upgrade | POST | Initiate premium upgrade via store IAP |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message send, regenerate, and content-generation endpoints return SSE streams with event types: `assistant_start`, `assistant_delta`, `assistant_done`, `content_delta`, `error`, `done`.

All streaming responses include a `request_id` header for idempotency and reconnection. The `assistant_delta` event carries a `token` field with incremental text. The `assistant_done` event carries `total_tokens`, `model_version`, and `latency_ms` metadata. The `error` event carries `code` and `message` fields.

## Realtime Push And Offline Behavior

- Assistant responses stream token-by-token via SSE with automatic reconnection using the last received event ID.
- Content generation (compose, summarize, translate) streams deltas via the same SSE contract, cancellable by the user tapping a stop button.
- Offline mode: conversation history and past messages are readable from local cache; new messages are queued as pending drafts; send is blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys to prevent duplicate message submissions.
- Conversations auto-save locally; sync to server on reconnection with conflict resolution (server-authoritative message ordering).
- Push notifications (opt-in): subscription expiry reminders, new persona library additions, usage quota reset alerts.
- Local draft persistence: unsent messages and in-progress voice transcriptions survive app kill/restart.
- Image attachments are uploaded before the message is sent; upload progress is shown inline; failed uploads can be retried.

## Permissions Privacy And Safety

- Microphone: requested on first voice input tap; clearly scoped to speech-to-text transcription only.
- Camera/photo library: requested on first image attachment; scoped to selected images only (no background access).
- Notifications: requested after first relevant event (subscription reminder or persona update).
- No location, contacts, calendar, health, or biometric access required for V1.
- Voice audio is processed for transcription only and discarded after transcription completes; no audio is stored server-side.
- Attached images are stored encrypted for the duration of the conversation context; deleted when the conversation is deleted.
- User text inputs are processed for the requested AI task only and not used for model training without explicit opt-in consent.
- All data in transit is encrypted (TLS 1.2+); stored data is encrypted at rest (AES-256 or equivalent).
- AI responses carry a disclaimer: "AI-generated content. May contain inaccuracies. Review before use."
- Safety filters block: generation of harmful, illegal, or CSAM content; impersonation of real individuals; medical/legal/financial advice presented as authoritative; personally identifiable information leakage.
- Content moderation: both user inputs and AI outputs are filtered through a safety classifier; flagged content is blocked with an explanatory message.
- Data export includes all conversations, messages, personas, preferences, and account data in a portable format.
- Account deletion purges all user data within the documented retention window (legal holds excepted).
- Manual verification required: exact voice transcription pipeline data handling, image analysis model data retention, and per-platform permission dialog behavior.

## Analytics And Monetization

- Events tracked: session_start, conversation_created, message_sent, voice_input_used, image_attached, quick_action_tapped, persona_selected, persona_created, content_generated, message_regenerated, subscription_viewed, subscription_upgraded, theme_changed, preference_updated, history_searched.
- Event properties: conversation length bucket, persona category, quick action label, content task type, input modality, coarse latency bucket, tier. Never raw message text, personal data, image contents, or voice audio.
- Monetization model: free tier with a daily message limit and access to basic personas and quick actions; premium tier unlocking unlimited messages, all personas, custom persona creation, image analysis, priority response speed, and advanced content generation.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate data export/delete, account recovery, access to existing conversation history, or basic text conversations within the daily limit.

## Edge Cases

- Extremely long conversation (500+ messages): context window management compresses older messages into a summary preamble; user is notified when compression occurs with an option to start a new thread.
- Voice transcription in noisy environment: show confidence indicator; allow user to edit transcribed text before sending.
- Voice transcription language mismatch: auto-detect language; if detection confidence is low, prompt user to confirm or select language.
- Image upload fails (large file, unsupported format, network error): show inline error with retry button; suggest resizing for large images.
- AI response generation timeout: show timeout message after 30 seconds with retry option; partial streamed content is preserved.
- SSE connection drops mid-response: reconnect using last event ID; resume streaming from the interruption point; if resume fails, show partial response with a "continue" button.
- Free tier daily limit reached mid-conversation: complete the current response but block subsequent messages with an upgrade prompt and reset countdown timer.
- Persona system prompt exceeds model context budget: truncate persona prompt with a warning; suggest shortening the custom persona instructions.
- User sends message with both image and voice: process voice transcription as text, attach image, send combined message.
- Concurrent edits to quick action order on two devices: server-authoritative ordering synced on next fetch; local order may snap to server state.
- Content generation with empty or nonsensical input: validate minimum input length; return a helpful error message suggesting what to provide.
- Conversation deletion while streaming: cancel active SSE stream, delete conversation, confirm to user.
- App killed during voice recording: discard partial audio; show draft indicator for any text already in the input field.

## Test Plan

- Unit tests: conversation context summarization logic, message role assignment, quick action sort/pin/hide state, persona system prompt assembly, preference inference engine, subscription tier limit enforcement, theme switching propagation.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, quota exceeded, and server error responses.
- Integration tests: full conversation flow from message send through streaming response; voice input transcription and message send; image attachment upload and AI analysis; quick action to conversation creation; persona selection and greeting display; content generation with tone and length controls.
- Streaming tests: SSE reconnection on network drop, event ordering (assistant_start before assistant_delta before assistant_done), cancellation via stop button, error event handling mid-stream, partial response preservation.
- Offline tests: draft message persistence, queue behavior, reconnect reconciliation, duplicate prevention via idempotency, local conversation cache accuracy.
- Quota tests: daily message limit enforcement, counter reset at midnight UTC, premium bypass, limit-reached mid-conversation handling.
- Multi-modal tests: text-only message, voice-only message, image-only message, combined text+image message, voice transcription accuracy edge cases.
- Persona tests: builtin persona loading, custom persona creation/edit/delete, persona switch starts new context, persona system prompt inclusion in API calls.
- Accessibility tests: chat bubble screen-reader labels, voice input button announcements, image attachment alt text, quick action tile descriptions, streaming response progressive announcements.
- Performance tests: response streaming latency across message lengths, conversation list scroll performance with 500+ threads, image upload and analysis round-trip time, voice transcription latency, theme switch rendering speed.
- Manual verification tests: exact voice transcription pipeline behavior, image analysis model capabilities, premium quota thresholds, quick action integration scope.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can create conversations with persistent context memory across multi-turn dialogue.
- Multi-modal input supports text, voice dictation, and image attachment with appropriate permission flows.
- Quick action shortcuts launch pre-configured conversations for at least eight common tasks.
- Content generation supports compose, summarize, and translate tasks with tone and length controls.
- Persona selector offers at least five builtin personas and supports custom persona creation with name, description, and system prompt.
- AI responses stream token-by-token via SSE with reconnection and partial response preservation.
- Conversation history is searchable, filterable by persona, and re-openable for continuation.
- Dark and light themes are selectable with system-default auto-switching.
- Free tier enforces a daily message limit with clear upgrade prompts and reset countdowns.
- Premium tier unlocks unlimited messages, all personas, image analysis, and advanced content generation.
- Manual verification blockers are documented and feature-flagged.
- At least 11 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What is the exact daily message limit for the free tier?
- Which AI model(s) does Genie use for conversation, and are different models used for different personas or tasks?
- What languages are supported for voice transcription and translation?
- What is the maximum image size and which formats are accepted for image analysis?
- How does the context memory summarization work when conversations exceed the model context window?
- What is the exact scope of personalization inference (which interaction patterns are tracked and how do they influence responses)?
- Does Genie support conversation export or sharing of individual message threads?
- How does the premium subscription handle cross-platform entitlement sync between iOS and Android?
- What safety classifier is used for content moderation, and what are the exact blocked content categories?

## Build Plan

- **Phase 1 — App Shell + Auth + Basic Chat**: Auth flows (email and OAuth), assistant home with recent conversations, new chat creation, basic text message send and streaming AI response, conversation persistence. Target: functional single-turn and multi-turn text chat.
- **Phase 2 — Multi-Modal Input + Context Memory**: Voice input with transcription, image attachment with upload and AI analysis, context window management with summarization for long conversations. Target: full multi-modal conversational AI.
- **Phase 3 — Quick Actions + Content Generation**: Quick action grid on home screen with builtin actions, custom action creation, content generation screen with compose/summarize/translate tasks, tone and length controls. Target: task-oriented AI features.
- **Phase 4 — Personas + Personalization**: Persona library with builtin and custom personas, persona creation flow, preference tracking and inference engine, explicit preference settings. Target: personalized AI experience.
- **Phase 5 — History + Subscription + Themes**: Conversation history with search and filters, subscription management with free/premium tiers, daily limit enforcement, dark/light theme support with auto-switching. Target: complete user account lifecycle.
- **Phase 6 — Safety + Offline + Polish**: Content moderation and safety filters, offline mode with draft persistence and reconnection, accessibility audit, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with a Genie account to capture exact conversation behavior, voice input pipeline, image analysis capabilities, persona depth, and quota thresholds.
- Select or license independent AI models for conversation, content generation, and image analysis distinct from Genie's proprietary models.
- Select or license independent speech-to-text service for voice input transcription.
- Design original branding, UI copy, persona names, and quick action labels distinct from Genie's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
