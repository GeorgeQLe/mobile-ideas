# Ask AI-Style Clone Spec

> Metadata
> - Inspiration app: Ask AI
> - Category: General-purpose AI chatbot, multi-model access, image generation, writing tools
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, publicly documented features.
> - Manual verification blockers: exact free-tier daily message limits, model-specific rate limits, image generation resolution and style options, voice input transcription accuracy thresholds, file attachment size limits and supported formats, prompt template catalog completeness, subscription pricing tiers, streaming latency per model, and writing tool template behavior require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary routing logic, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI chatbot inspired by Ask AI's public product: a general-purpose conversational assistant offering multi-model access (GPT, Claude, Gemini, and other publicly available LLMs), persistent chat threads with full conversation history, image generation from text prompts, a suite of writing tools (email drafting, essay writing, code generation, summarization), a model selector allowing users to switch between AI providers per conversation, voice input for hands-free queries, file and image attachment for contextual prompts, a curated prompt template and suggestion library, and dark/light theme support. The clone emphasizes model choice flexibility, rich multimodal interaction, and practical writing productivity as primary differentiators.

The clone must use original branding, UI copy, and independently licensed or self-hosted AI model integrations. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile-first multi-model AI chat experience allowing users to converse with GPT, Claude, Gemini, and other models from a single interface.
- Maintain persistent conversation threads with full message history, search, and organization.
- Enable text-to-image generation with prompt input, style selection, and resolution options.
- Offer purpose-built writing tools for email drafting, essay composition, code generation, and text summarization.
- Allow per-conversation model selection so users can compare responses across providers.
- Support voice input for composing queries via speech-to-text transcription.
- Accept file and image attachments as context for AI prompts (documents, screenshots, photos).
- Provide a curated prompt template library with categorized suggestions for common tasks.
- Support dark and light themes with system-preference auto-detection.
- Deliver real-time token-by-token streaming responses for low-latency conversational feel.

## Non-Goals

- Do not imply affiliation with Ask AI, OpenAI, Anthropic, Google, or any upstream AI provider.
- Do not copy proprietary model routing logic, prompt engineering templates, rate-limit configurations, or private API schemas from Ask AI.
- Do not replicate exact subscription pricing, free-tier quotas, or internal model selection heuristics without independent verification.
- Do not present AI-generated content as factual, professional, medical, legal, or financial advice.
- Do not process production user data without explicit consent and documented retention policies.
- Do not store or retransmit uploaded files beyond the scope of the active conversation context window.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/app/ask-ai-chat-with-gpt-4o-mini/id6447191232 | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Google Play Listing | https://play.google.com/store/apps/details?id=com.suspended.suspended | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Ask AI Official Website | https://ask-ai.me | Product overview, feature descriptions, pricing tiers | Verified 2026-05-11 |

## Detailed Design

### Multi-Model Chat Engine

- Users converse with multiple AI models from a unified chat interface.
- Supported model families at V1: GPT (OpenAI-compatible), Claude (Anthropic-compatible), Gemini (Google-compatible), and a configurable slot for additional providers.
- Each conversation stores its selected model; users can switch models mid-thread via the model selector.
- Model switching mid-conversation preserves full message history and sends prior context to the new model.
- Responses stream token-by-token via SSE for real-time display with typing indicator.
- System prompts are configurable per model to optimize response quality for each provider.

### Chat Threads and History

- Conversations are organized as persistent threads with title, creation date, model used, and message count.
- Auto-titling: the first user message generates a concise thread title via the active model.
- Users can rename, pin, archive, or delete threads from the chat home screen.
- Full-text search across all conversation history with highlighted matching snippets.
- Threads are grouped by date (today, yesterday, previous 7 days, older) on the chat home screen.

### Image Generation

- A dedicated image generation mode accepts text prompts and produces images via a backend image model (DALL-E-compatible, Stable Diffusion-compatible, or equivalent).
- Users select style presets (photorealistic, illustration, digital art, oil painting, watercolor, pixel art) and aspect ratio (square, portrait, landscape).
- Generation progress streams via SSE with percentage updates before the final image result.
- Generated images display in a gallery within the conversation thread with download, share, and regenerate actions.
- Image generation counts against a separate quota from chat messages on the free tier.

### Writing Tools

- Purpose-built writing tool screens with structured input forms for common tasks:
  - **Email Drafting**: tone selector (formal, casual, friendly, professional), recipient context field, key points input, generates complete email with subject line.
  - **Essay Writing**: topic input, thesis statement, word count target, structure preference (5-paragraph, argumentative, narrative), generates outlined essay.
  - **Code Generation**: language selector, task description, generates code with inline comments and explanation.
  - **Summarization**: paste or attach text, select summary length (brief, medium, detailed), generates condensed version.
  - **Translation**: source and target language selectors, input text, generates translation with alternative phrasings.
- Writing tool results stream into the active conversation thread and are saved in history.
- Each tool has a dedicated entry point from the writing tools screen and is also invocable via prompt templates.

### Model Selector

- A bottom sheet or modal presenting available models with name, provider, capability badges (text, vision, code, image), and availability status.
- Models marked as premium display a lock icon on the free tier.
- Selecting a model updates the active conversation and persists the choice for new messages.
- Model availability is fetched from the backend and cached locally; unavailable models show a disabled state with an explanatory tooltip.

### Voice Input

- A microphone button in the chat input bar activates speech-to-text transcription.
- Transcription runs on-device where possible (iOS Speech Framework, Android SpeechRecognizer) with cloud fallback.
- Real-time transcription preview displays in the input field as the user speaks.
- Users can edit the transcribed text before sending.
- Voice input is available in chat threads and writing tool input fields.

### File and Image Attachments

- An attachment button in the chat input bar opens a picker for files (PDF, DOCX, TXT, CSV) and images (JPEG, PNG, HEIC).
- Attached files are uploaded to a temporary storage backend and their content is extracted (OCR for images, text extraction for documents) and included in the prompt context.
- Attachments display as inline previews (image thumbnails, file name with icon) in the message bubble.
- File size limit enforced client-side with a clear error message for oversized files.
- Attachments are purged from temporary storage after a configurable retention window (default 24 hours).

### Prompt Template Library

- A categorized library of pre-built prompt templates organized by use case: writing, coding, analysis, creativity, learning, business, fun.
- Each template has a title, description, category tag, and a parameterized prompt string with placeholder fields.
- Users tap a template to pre-fill the chat input with the prompt, replacing placeholders with their own context.
- Favorite/bookmark system for frequently used templates.
- Search and filter by category within the template library.
- Templates are fetched from the backend and cached locally; new templates appear via background sync.

### Theme Support

- Dark and light themes with a system-preference auto-detection default.
- Manual override in settings: light, dark, or system.
- Theme switch applies immediately without app restart.
- All screens, modals, and overlays respect the active theme.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with feature highlights, signs up or logs in, lands on chat home with an empty state prompting first conversation.
2. **Quick Chat**: User taps new chat, types a question, sees streaming response from the default model, continues the conversation with follow-up messages.
3. **Model Switch**: User opens model selector mid-conversation, switches from GPT to Claude, sends a new message, sees the response from the new model with prior context preserved.
4. **Image Generation**: User navigates to image generator, enters a prompt, selects a style and aspect ratio, watches progress stream, downloads the generated image.
5. **Email Drafting**: User opens writing tools, selects email drafting, fills in tone and key points, generates a complete email, copies it to clipboard.
6. **Code Generation**: User opens writing tools, selects code generation, picks a language, describes the task, reviews generated code with syntax highlighting.
7. **Voice Query**: User taps the microphone button, speaks a question, reviews the transcription in the input field, sends the message, receives a streaming response.
8. **File Context**: User attaches a PDF to the chat, asks the AI to summarize its contents, receives a summary referencing specific sections of the document.
9. **Prompt Template**: User browses the prompt library, selects a business analysis template, fills in the placeholder fields, sends the pre-filled prompt.
10. **History Search**: User searches conversation history for a past topic, finds the thread, continues the conversation or copies a previous response.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth, feature highlight carousel, consent |
| Chat Home | Conversation list and entry | Thread list grouped by date, search bar, new chat FAB, pinned threads, model indicator per thread |
| Chat Thread | Active conversation | Message bubbles, streaming indicator, input bar with voice/attachment/send buttons, model badge, scroll-to-bottom |
| Model Selector | AI model choice | Model list with provider, capability badges, premium lock icons, availability status, selection confirmation |
| Image Generator | Text-to-image creation | Prompt input, style preset grid, aspect ratio picker, generate button, progress indicator, result gallery |
| Writing Tools | Purpose-built writing screens | Tool category grid (email, essay, code, summary, translate), structured input forms per tool, result display |
| Prompt Library | Template browsing | Category tabs, template cards with title/description, search bar, favorite toggle, use-template action |
| History | Past conversation search | Full-text search, date-grouped thread list, filter by model, re-open thread, delete thread |
| Settings | App configuration | Theme toggle, default model, voice input preferences, notification prefs, data export, delete account |
| Subscription | Premium management | Tier comparison table, current plan badge, usage meters, upgrade/downgrade, billing history, restore purchases |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, locale, created_at, quota_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, theme_preference, created_at, revoked_at |
| Conversation | id, user_id, title, model_id, pinned, archived, message_count, last_message_at, created_at, deleted_at |
| Message | id, conversation_id, role (user/assistant/system), content_parts[], model_id, token_count, latency_ms, created_at |
| ContentPart | id, message_id, type (text/image/file/code), body, mime_type, file_url, thumbnail_url, metadata |
| ModelConfig | id, provider, model_name, display_name, capabilities[] (text/vision/code/image), max_context_tokens, premium_only, available, system_prompt_template |
| ImageGeneration | id, user_id, conversation_id, prompt, style_preset, aspect_ratio, status (pending/generating/complete/failed), progress_pct, result_url, created_at |
| WritingTemplate | id, tool_type (email/essay/code/summary/translate), input_schema, system_prompt, created_at |
| PromptTemplate | id, title, description, category, prompt_text, placeholder_fields[], favorited_count, created_at |
| Subscription | id, user_id, tier (free/premium), status (active/expired/cancelled), chat_daily_limit, image_daily_limit, started_at, expires_at, store_receipt_ref |
| AuditEvent | id, user_id, event_type, model_id, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /conversations | GET | List conversations with pagination, search, and filters |
| /conversations | POST | Create new conversation with selected model |
| /conversations/:id | GET | Fetch conversation with messages |
| /conversations/:id | PATCH | Update title, pin, archive status |
| /conversations/:id | DELETE | Soft-delete conversation |
| /conversations/:id/messages | POST | Send message and receive streaming response (SSE) |
| /conversations/:id/messages/:mid/regenerate | POST | Regenerate a specific assistant response (SSE) |
| /conversations/:id/model | PATCH | Switch model for an existing conversation |
| /models | GET | List available models with capabilities and availability |
| /images/generate | POST | Submit image generation request (SSE streaming progress) |
| /images/:id | GET | Fetch generated image metadata and URL |
| /writing/email | POST | Generate email draft (SSE streaming) |
| /writing/essay | POST | Generate essay (SSE streaming) |
| /writing/code | POST | Generate code (SSE streaming) |
| /writing/summarize | POST | Generate summary (SSE streaming) |
| /writing/translate | POST | Generate translation (SSE streaming) |
| /prompts | GET | List prompt templates with category filter and search |
| /prompts/:id/favorite | POST | Toggle favorite on a prompt template |
| /settings | GET/PATCH | Read and update user preferences |
| /subscription | GET | Current subscription status and usage counters |
| /subscription/upgrade | POST | Initiate premium upgrade via store IAP |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message, image generation, and writing tool endpoints return SSE streams with event types: `chat_start`, `chat_delta`, `chat_done`, `image_progress`, `image_result`, `writing_delta`, `error`, `done`.

- `chat_start` — metadata: model_id, conversation_id, message_id.
- `chat_delta` — partial token payload for incremental rendering.
- `chat_done` — final message metadata: total token count, latency.
- `image_progress` — progress_pct integer (0-100).
- `image_result` — result_url, dimensions, style applied.
- `writing_delta` — partial token payload for writing tool results.
- `error` — error_code, message, retryable boolean.
- `done` — stream termination signal.

## Realtime Push And Offline Behavior

- Chat responses stream token-by-token via SSE with automatic reconnection on connection drop.
- Image generation progress streams as periodic percentage events before the final image result event.
- Writing tool results stream as incremental text deltas, cancellable by user tapping stop.
- SSE reconnection uses the last received event ID to resume without duplicate tokens.
- Offline mode: cached conversations and history are fully readable; new messages are queued as pending drafts.
- Pending drafts display a clock icon and auto-submit when connectivity returns.
- Reconnect reconciliation uses idempotency keys to prevent duplicate message submissions.
- Local conversation cache persists across app kill/restart using on-device storage.
- Push notifications (opt-in): image generation completion (if app is backgrounded), subscription expiry reminders, new prompt template additions.
- Background sync: prompt template library and model availability refresh on app foreground.

## Permissions Privacy And Safety

- Microphone: requested on first voice input tap with explanatory rationale string; never requested at launch.
- Camera/photo library: requested on first image attachment tap; file picker does not require camera permission for document selection.
- Notifications: requested after first relevant background event (image generation completion).
- No location, contacts, calendar, health, or biometric access required for V1.
- User message content is transmitted to the selected AI model provider for response generation only and is not used for model training without explicit opt-in.
- Uploaded files are stored in temporary encrypted storage and purged after 24 hours.
- All data in transit is encrypted (TLS 1.2+); stored data is encrypted at rest (AES-256 or equivalent).
- AI responses carry a disclaimer: "AI-generated content. Verify important information independently."
- Safety filters block: generation of harmful, illegal, or abusive content; attempts to extract system prompts; CSAM-related queries; and regulated advice (medical, legal, financial) without disclaimers.
- Image generation filters block: NSFW content, deepfakes of real individuals, copyrighted character reproduction, and violent imagery.
- Data export includes all conversations, messages, generated images, settings, and account data in machine-readable format.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Conversations and files are user-scoped with no cross-user data leakage in multi-tenant storage.

## Analytics And Monetization

- Events tracked: session_start, conversation_created, message_sent, model_selected, model_switched, image_generated, writing_tool_used, voice_input_used, file_attached, prompt_template_used, prompt_favorited, history_searched, theme_changed, subscription_viewed, subscription_upgraded, subscription_cancelled.
- Event properties: model_id, tool_type, category, coarse latency bucket, input length bucket, attachment type, error code, quota tier. Never raw message content, personal data, file contents, or generated images.
- Monetization model: free tier with daily limits on chat messages and image generations; premium tier unlocking unlimited messages, all models (including premium-only models), unlimited image generations, priority processing, and advanced writing tools.
- Premium billing via app-store IAP with trial period, auto-renewal, cancellation, refund handling, restore purchases, and cross-platform entitlement sync.
- Paywalls must not gate data export/delete, account recovery, access to existing conversation history, or basic single-model chat.

## Edge Cases

- Extremely long conversation context (exceeds model token limit): automatic context windowing with oldest messages summarized and a "context truncated" indicator.
- Model becomes unavailable mid-conversation: display availability error, suggest switching to an alternative model, preserve unsent message as draft.
- Image generation fails (content filter, timeout, provider error): display specific error message, preserve prompt for retry, do not count against quota.
- Voice input in noisy environment: show confidence indicator on transcription, allow easy re-record before sending.
- File attachment extraction fails (corrupt PDF, unsupported format): display format error, list supported formats, allow retry with different file.
- Streaming connection drops mid-response: reconnect and resume from last received token; if unrecoverable, display partial response with "response interrupted" indicator and regenerate option.
- Daily quota exhausted mid-conversation: complete current streaming response but block subsequent messages with upgrade prompt and reset countdown timer.
- Model switch with vision-only attachment in thread: warn if new model lacks vision capability, suggest compatible models.
- Concurrent sessions on multiple devices: last-write-wins for settings; conversations sync via server with eventual consistency.
- Prompt template placeholder left empty: validate required fields before submission, highlight missing fields.
- Image generation prompt in unsupported language: attempt translation to English before generation, notify user of automatic translation.
- Network timeout on large file upload: retry with exponential backoff, show progress indicator, allow cancel.

## Test Plan

- Unit tests: model selector state management, conversation CRUD logic, message streaming buffer assembly, content part type discrimination, theme toggle persistence, prompt template placeholder parsing, quota counter increment and reset, voice input state machine, file attachment validation.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, quota exceeded, model unavailable, and server error responses.
- Integration tests: full chat flow from message send through streaming response to persistence; model switch mid-conversation with context preservation; image generation from prompt through progress to result display; writing tool structured input through streaming to result; file attachment upload through extraction to contextual response; voice input through transcription to message send.
- Streaming tests: SSE reconnection on network drop, event ordering (chat_start before chat_delta before chat_done), cancellation mid-stream, error event handling, image_progress ordering, concurrent stream prevention.
- Offline tests: draft preservation on message send without connectivity, queue behavior, reconnect reconciliation, duplicate prevention via idempotency keys, local conversation cache integrity across app kill/restart.
- Quota tests: daily limit enforcement per tier, counter reset at UTC midnight, premium bypass, quota exhaustion mid-stream handling, image quota separate from chat quota.
- Accessibility tests: chat bubble screen-reader labels, streaming text live region announcements, model selector focus management, voice input button accessibility actions, image generation alt-text, theme contrast ratios.
- Performance tests: streaming first-token latency per model, message list scroll performance with 1000+ messages, conversation list load time with 500+ threads, image generation total time, file upload and extraction latency, prompt library load time.
- Manual verification tests: exact free-tier daily limits, model-specific rate limiting behavior, image generation style accuracy, voice transcription accuracy across accents, file attachment format support and size limits.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can send messages and receive streaming responses from at least three distinct AI model families.
- Model selector allows per-conversation model switching with full context preservation.
- Chat threads persist with full message history, search, rename, pin, archive, and delete.
- Image generation accepts prompts with style and aspect ratio selection and displays streaming progress.
- At least four writing tools (email, essay, code, summary) produce structured streaming results.
- Voice input transcribes speech to text in the chat input field with real-time preview.
- File and image attachments upload, display inline, and provide context for AI responses.
- Prompt template library displays categorized templates with search, filter, and favorite.
- Dark and light themes apply consistently across all screens with system-preference auto-detection.
- Streaming handles all SSE event types without UI corruption, dropped tokens, or duplicate content.
- Daily free quota enforces limits with clear upgrade prompts and reset countdowns.
- Manual verification blockers are documented and feature-flagged.
- At least 11 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What are the exact daily free-tier limits for chat messages and image generations?
- Which specific AI models and versions does Ask AI route to for each model family?
- What is the maximum file size for attachments and which exact formats are supported?
- How does Ask AI handle model-specific context window limits when conversations grow long?
- What image generation provider and model does Ask AI use, and what resolution options are available?
- How does voice input handle multiple languages and accents?
- What is the exact prompt template catalog size and how frequently are new templates added?
- Does Ask AI offer conversation export or sharing features?
- How does the subscription handle cross-platform entitlement when a user has both iOS and Android devices?
- What safety filters are applied to image generation prompts, and how are edge cases (artistic nudity, satire) handled?

## Build Plan

- **Phase 1 — App Shell + Auth + Single-Model Chat**: Auth flows (email and OAuth), chat home with conversation list, single-model chat thread with SSE streaming, message persistence, basic input bar. Target: functional single-model chatbot.
- **Phase 2 — Multi-Model + Model Selector + History**: Model configuration backend, model selector UI, per-conversation model switching with context preservation, conversation search and organization (pin, archive, rename). Target: multi-model chat with history management.
- **Phase 3 — Image Generation + Voice Input**: Image generation screen with prompt input, style presets, aspect ratio, streaming progress, and result gallery. Voice input with on-device transcription, real-time preview, and edit-before-send. Target: multimodal input and output.
- **Phase 4 — Writing Tools + File Attachments**: Writing tool screens (email, essay, code, summary, translate) with structured input forms and streaming results. File and image attachment upload, extraction, and contextual prompting. Target: productivity tool suite.
- **Phase 5 — Prompt Library + Themes + Subscription**: Prompt template library with categories, search, and favorites. Dark/light theme with system auto-detection. Subscription management with daily quota enforcement, IAP integration, and tier comparison. Target: content discovery and monetization.
- **Phase 6 — Offline + Safety + Polish**: Offline draft queue with reconnect reconciliation, safety filter hardening, image content filters, accessibility audit, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with an Ask AI account to capture exact model roster, daily limits, image generation options, and writing tool behavior.
- Select or license independent AI model API providers for each supported model family (OpenAI, Anthropic, Google) with documented terms of service.
- Design original branding, UI copy, app icon, and marketing materials distinct from Ask AI's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
