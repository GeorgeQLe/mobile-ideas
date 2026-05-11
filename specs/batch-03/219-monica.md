# Monica-Style Clone Spec

> Metadata
> - Inspiration app: Monica
> - Category: AI assistant, translation, writing, summarization
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, publicly documented features.
> - Manual verification blockers: exact daily free credit amounts per tier, multi-model routing logic and model availability per region, side panel overlay behavior on mobile platforms, SSE streaming reconnection thresholds, translation auto-detect confidence thresholds, writing mode transformation parameters, summarization length-to-ratio mapping, reading companion extraction fidelity for complex page layouts, and subscription tier feature gates require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI assistant inspired by Monica's public product: a multi-model chat assistant supporting threaded conversations with history and search, a translation tool with language pair selection and auto-detect source language, a writing assistant offering compose, rewrite, improve, and grammar fix modes, a text summarizer with adjustable output length, a reading companion for long articles and documents, a side panel concept adapted from browser overlay to mobile overlay, and document/URL analysis. The clone emphasizes versatile AI-powered text workflows across chat, translation, writing, and reading as primary differentiators.

The clone must use original branding, UI copy, and independently hosted or licensed language models. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile-first multi-model AI chat assistant with threaded conversations, history, and full-text search.
- Enable translation between language pairs with auto-detect source language and manual override.
- Offer a writing assistant with compose, rewrite, improve, and grammar fix modes for versatile text transformation.
- Support text summarization with adjustable output length (short, medium, long).
- Provide a reading companion that extracts and analyzes content from long articles, documents, and URLs.
- Adapt the browser side panel concept to a mobile overlay panel for quick AI access without leaving context.
- Allow document and URL analysis with content extraction and AI-powered Q&A.
- Support dark and light themes with user preference persistence.

## Non-Goals

- Do not imply affiliation with Monica, Monica.im, or any upstream model provider.
- Do not copy proprietary model routing logic, private API schemas, prompt templates, or internal credit accounting formulas.
- Do not replicate exact credit amounts, model availability per region, or internal rate-limiting logic without independent verification.
- Do not present translation, grammar, or summarization results as authoritative professional certification.
- Do not process production user data without explicit consent and documented retention policies.
- Do not reproduce copyrighted UI layouts, icons, or marketing copy from the original app.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Monica Website | https://monica.im | Product features, pricing tiers, model support, use cases | Verified 2026-05-11 |
| Apple App Store Listing | https://apps.apple.com/app/monica-ai-assistant/id... | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Google Play Listing | https://play.google.com/store/apps/details?id=... | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |

Note: placeholder App Store and Google Play URLs must be replaced with exact first-party links before implementation starts.

## Detailed Design

### Multi-Model Chat

- Users select from available AI models (e.g., GPT-4-class, Claude-class, open-source models) via a model picker in the chat interface.
- Model selection persists per conversation thread; users can switch models mid-thread with a clear model-change indicator in the message timeline.
- Chat input supports text, pasted content, and uploaded documents/URLs for contextual Q&A.
- Responses stream token-by-token via SSE with typing indicators, cancellation support, and retry on failure.
- Each message displays the model used, token count, and latency indicator.

### Chat Threads and History

- Conversations are organized as threads with user-defined or auto-generated titles.
- Thread list shows title, last message preview, timestamp, and model badge.
- Full-text search across all threads with result highlighting and jump-to-message navigation.
- Threads can be pinned, archived, or deleted; bulk actions available via long-press selection mode.
- Thread export as plain text or Markdown.

### Translation Tool

- Dedicated translation screen with source and target language selectors arranged as a language pair with a swap button.
- Auto-detect source language enabled by default; detected language displayed with confidence indicator; manual override available.
- Supported languages presented in a searchable picker grouped by script family (Latin, CJK, Cyrillic, Arabic, Devanagari, etc.).
- Input accepts typed text, pasted content, or voice-to-text (if microphone permission granted).
- Translation result streams via SSE with the full result replacing the stream on completion.
- Copy, share, and save translation actions on the result. Translation history accessible from the history screen.

### Writing Assistant

- Four modes accessible via a segmented control: Compose (generate new text from a prompt), Rewrite (rephrase existing text), Improve (enhance clarity and style), Grammar Fix (correct errors while preserving meaning).
- Each mode has a dedicated input prompt: Compose shows a topic/instruction field; Rewrite, Improve, and Grammar Fix show a text input area.
- Optional tone selector for Compose and Rewrite modes: professional, casual, friendly, academic, creative.
- Output streams token-by-token with a compare toggle showing original versus result for Rewrite, Improve, and Grammar Fix modes.
- Copy, share, and insert-into-chat actions on the result.

### Text Summarizer

- Input accepts pasted text, uploaded documents (plain text, PDF, DOCX extraction), or a URL for automatic content extraction.
- Adjustable length control with three presets: Short (1-2 sentences), Medium (1 paragraph), Long (multiple paragraphs).
- A continuous slider allows fine-grained length targeting between presets.
- Output streams via SSE with key points highlighted and source reference indicators.
- Bullet-point and prose output format toggle.

### Reading Companion

- Users provide a URL or upload a document; the system extracts and renders readable content.
- Extracted content displays in a clean reader view with adjustable font size and line spacing.
- AI-powered features on the reading content: summarize, explain highlighted text, translate selection, ask questions about the content.
- Contextual Q&A panel slides up from the bottom; questions and answers are scoped to the loaded content.
- Reading progress tracked per document with resume-from-position support.

### Side Panel Overlay

- A floating action button (FAB) or edge swipe gesture activates an overlay panel that slides in from the right edge.
- The panel provides quick access to chat, translate, summarize, and writing tools without navigating away from the current screen.
- Panel height is adjustable (half-screen, three-quarter, full-screen) via drag handle.
- The panel maintains its own navigation stack independent of the main app navigation.
- Panel state persists across app backgrounding; dismissed by swipe or tap outside.

### Document and URL Analysis

- URL input triggers server-side content extraction (HTML parsing, PDF extraction, DOCX parsing).
- Extracted content is chunked and indexed for retrieval-augmented Q&A within the conversation thread.
- Supported formats: web pages (HTML), PDF, DOCX, plain text, Markdown.
- Extraction failures (paywalled content, anti-scraping, unsupported format) display a clear error with fallback to manual paste.
- File size limit enforced client-side and server-side with user-facing size guidance.

### Theme Support

- Dark and light themes with system-default auto-detection option.
- Theme preference stored locally and synced to user profile for cross-device consistency.
- Theme toggle accessible from settings and via a quick-toggle in the app header.

## Core User Journeys

1. **First Launch**: User opens app, views feature overview carousel, signs up or logs in, lands on chat home with an empty thread list and a prominent new-chat button.
2. **New Chat**: User taps new chat, selects a model, types a question, receives a streaming response, continues the conversation thread.
3. **Model Switch**: User taps model picker mid-conversation, selects a different model, sends a follow-up, sees the model badge change on the new message.
4. **Search History**: User taps search on the chat home, types a keyword, sees matching threads and messages, taps a result to jump directly to that message in its thread.
5. **Quick Translation**: User navigates to the translation tool, types text, auto-detect identifies the source language, selects target language, receives streaming translation, copies result.
6. **Writing Rewrite**: User navigates to writing assistant, selects Rewrite mode, pastes a paragraph, selects professional tone, receives an improved version, compares original vs. result.
7. **Article Summary**: User navigates to summarizer, pastes a URL, selects Medium length, receives a paragraph summary with key points highlighted.
8. **Reading Companion**: User navigates to reading companion, enters a URL, reads extracted content in reader view, highlights a confusing paragraph, asks the AI to explain it, receives a contextual explanation.
9. **Side Panel Access**: User is reading a long thread, swipes to open the side panel, quickly translates a phrase, dismisses the panel, continues reading.
10. **Credit Check and Upgrade**: User notices credit balance is low, taps the credit indicator, views usage breakdown, taps upgrade, selects premium tier, completes IAP.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth, feature overview carousel, consent |
| Chat Home | Thread management | Thread list with search, model filter, new chat FAB, pinned threads, credit balance indicator |
| Chat Thread | Active conversation | Message timeline, model picker, text input with attachments, streaming indicator, retry/cancel, export |
| Translation Tool | Language translation | Source/target language selectors, swap button, auto-detect badge, text input, streaming result, copy/share |
| Writing Assistant | Text transformation | Mode segmented control (compose/rewrite/improve/grammar fix), tone selector, text input, streaming result, compare toggle |
| Summarizer | Content condensation | Text/URL/document input, length slider with presets, format toggle (bullets/prose), streaming result |
| Reading Companion | Long-form reading | Reader view, font/spacing controls, highlight-to-ask, contextual Q&A bottom panel, reading progress |
| Side Panel Overlay | Quick-access overlay | Draggable panel with mini chat/translate/summarize/write tabs, resize handle, dismiss gesture |
| History | Cross-tool history | Date-grouped list, tool type filter tabs, full-text search, re-open, bulk delete |
| Settings | Account and preferences | Theme toggle, default model, language, notification prefs, data export, delete account, about/legal |
| Subscription | Premium management | Tier comparison table, current plan badge, credit balance and usage chart, upgrade/downgrade, billing history, restore purchases |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, avatar_url, locale, theme_preference, default_model, created_at, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, os_version, app_version, push_token, created_at, revoked_at |
| Conversation | id, user_id, title, model_id, pinned, archived, message_count, last_message_at, created_at, deleted_at |
| Message | id, conversation_id, role (user/assistant/system), model_id, content_parts[], token_count, latency_ms, created_at |
| ContentPart | id, message_id, part_type (text/document_ref/url_ref/image_ref), content, extracted_text, mime_type, byte_size, created_at |
| Translation | id, user_id, source_lang, target_lang, source_text, translated_text, auto_detected_lang, confidence, model_id, created_at |
| WritingTask | id, user_id, mode (compose/rewrite/improve/grammar_fix), tone, input_text, output_text, model_id, created_at |
| Summary | id, user_id, source_type (text/url/document), source_ref, input_text, summary_text, target_length, output_format (bullets/prose), model_id, created_at |
| ReadingSession | id, user_id, source_url, source_type, extracted_content, reading_progress_pct, font_size, line_spacing, created_at, last_read_at |
| CreditBalance | id, user_id, total_credits, used_credits, reset_at, tier, last_deducted_at |
| Subscription | id, user_id, tier (free/premium), status (active/cancelled/expired/trial), started_at, expires_at, store_product_id, store_receipt_ref, auto_renew |
| AuditEvent | id, user_id, event_type, tool_used, model_id, credits_consumed, metadata, ip_hash, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation with email or OAuth |
| /auth/login | POST | Session creation (email/password or OAuth token exchange) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /conversations | GET | List conversations with pagination, search, and filters |
| /conversations | POST | Create a new conversation thread |
| /conversations/:id | GET | Fetch conversation detail with message history |
| /conversations/:id | PATCH | Update title, pinned state, archived state |
| /conversations/:id | DELETE | Soft-delete a conversation |
| /conversations/:id/messages | POST | Send a message and receive streaming response (SSE) |
| /conversations/:id/messages/:mid/retry | POST | Retry a failed assistant message (SSE) |
| /conversations/:id/messages/:mid/cancel | POST | Cancel an in-progress streaming response |
| /conversations/:id/export | GET | Export conversation as plain text or Markdown |
| /translate | POST | Submit translation request (SSE streaming response) |
| /translate/languages | GET | List supported languages with auto-detect metadata |
| /write | POST | Submit writing task (SSE streaming response) |
| /summarize | POST | Submit summarization request (SSE streaming response) |
| /summarize/extract | POST | Extract content from URL or document for summarization |
| /reading/sessions | GET | List reading sessions |
| /reading/sessions | POST | Create reading session from URL or document upload |
| /reading/sessions/:id | GET | Fetch reading session with extracted content |
| /reading/sessions/:id/progress | PATCH | Update reading progress |
| /reading/sessions/:id/ask | POST | Ask contextual question about reading content (SSE) |
| /credits | GET | Current credit balance and usage breakdown |
| /credits/history | GET | Credit usage history with per-request detail |
| /settings | GET | Fetch user settings |
| /settings | PATCH | Update user settings (theme, default model, locale) |
| /subscription | GET | Current subscription status and tier |
| /subscription/upgrade | POST | Initiate premium upgrade via store IAP |
| /subscription/restore | POST | Restore purchases from app store receipt |
| /account/export | POST | Request full data export |
| /account | DELETE | Request account deletion |

Streaming contract: Chat message, translate, write, summarize, and reading-ask endpoints return SSE streams. Event types:

| Event Type | Payload | Used By |
|---|---|---|
| chat_start | { conversation_id, message_id, model_id } | Chat |
| chat_delta | { delta_text, token_index } | Chat |
| chat_done | { message_id, token_count, latency_ms, credits_consumed } | Chat |
| translation_result | { translated_text, detected_lang, confidence } | Translation |
| writing_delta | { delta_text, token_index } | Writing |
| summary_delta | { delta_text, token_index } | Summarizer |
| reading_delta | { delta_text, token_index } | Reading Companion |
| error | { code, message, retry_eligible } | All |
| done | { credits_remaining } | All |

## Realtime Push And Offline Behavior

- All AI response endpoints stream token-by-token via SSE with automatic reconnection on transient network failures.
- Chat messages show a typing indicator during streaming; the indicator is replaced by the complete message on `chat_done`.
- Translation results stream progressively and finalize on `done`; partial results are visible during streaming.
- Offline mode: conversation history, past translations, writing results, summaries, and reading sessions are cached locally and readable offline.
- New requests submitted offline are queued as drafts with a pending indicator; submission is blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys (client-generated UUIDs) to prevent duplicate message submissions.
- Reading companion content is cached for offline reading after initial extraction.
- Push notifications (opt-in): daily credit reset reminders, subscription expiry warnings, new model availability announcements.
- Local draft persistence: unsent chat messages, translation inputs, and writing inputs survive app kill/restart.
- Side panel state (open/closed, active tool, partial input) persists across app backgrounding.

## Permissions Privacy And Safety

- Microphone: requested only when user taps voice-to-text in translation tool; not required for core functionality.
- Camera/photo library: requested only for document upload (photo of text); not required for V1 core features.
- Notifications: requested only after first relevant event (credit reset, subscription expiry).
- No location, contacts, calendar, or health data access required.
- User text inputs are processed for the requested AI task only and not used for model training without explicit opt-in consent.
- All data in transit is encrypted (TLS 1.2+); stored data is encrypted at rest (AES-256 or equivalent).
- AI responses carry a disclaimer: "AI-generated content. Verify important information independently."
- Translation results carry a disclaimer: "Machine translation may contain errors. Not suitable for certified translation."
- Safety filters block: generation of harmful, illegal, or policy-violating content; attempts to extract system prompts or model internals.
- Credit balance and subscription data are treated as financial data with audit logging.
- Data export includes all conversations, translations, writing tasks, summaries, reading sessions, and account metadata.
- Account deletion purges all user data within the documented retention window (legal holds excepted).
- Content extraction from URLs respects robots.txt and publicly available content only; paywalled or restricted content returns an extraction error.
- Manual verification required: exact model provider data processing agreements, credit deduction formulas, and regional data residency requirements.

## Analytics And Monetization

- Events tracked: session_start, chat_message_sent, model_selected, chat_search_used, translation_submitted, language_pair_selected, auto_detect_used, writing_task_submitted, writing_mode_selected, tone_selected, summary_submitted, summary_length_selected, reading_session_created, reading_question_asked, side_panel_opened, side_panel_tool_selected, history_searched, theme_changed, subscription_viewed, upgrade_initiated, upgrade_completed.
- Event properties: tool type, model ID, coarse latency bucket, input length bucket, output length bucket, credits consumed, error code, subscription tier. Never raw text content, personal data, or document contents.
- Monetization model: daily free credit allowance (limited number of AI requests per day across all tools) with premium tier unlocking unlimited requests, access to premium models, priority processing, and extended document size limits.
- Premium billing via app-store IAP; handles trial period, renewal, cancellation, refund, restore purchases, and cross-platform entitlement sync.
- Credit costs vary by model and task complexity; credit cost is displayed before submission and confirmed in the `done` event.
- Paywalls must not gate data export/delete, account recovery, access to existing saved results, theme settings, or conversation history viewing.

## Edge Cases

- Extremely long chat threads (1000+ messages): virtualized message list with lazy loading; oldest messages fetched on scroll-up.
- Model unavailability: if the selected model is temporarily down, display a model status banner and suggest an available alternative; do not silently switch models.
- Translation auto-detect failure: if confidence is below threshold, prompt user to manually select source language with the detected candidate pre-selected.
- Translation of unsupported language pair: display a clear unsupported message listing available target languages for the detected source.
- Writing assistant input too short for Improve/Grammar Fix modes (fewer than 10 characters): prompt user to provide more text.
- Summarizer URL extraction failure (paywall, anti-scraping, unsupported format): display extraction error with fallback to manual paste and list of supported formats.
- Summarizer input exceeds maximum length: truncate with a warning and suggest splitting or using the reading companion for full document analysis.
- Reading companion content extraction produces garbled text (complex layouts, heavy JavaScript rendering): display extraction quality warning and offer manual paste fallback.
- Side panel overlay conflicts with system gestures (edge swipe for back navigation on Android/iOS): use FAB as primary activation; edge swipe as secondary with conflict-avoidance margin.
- Credit balance reaches zero mid-streaming response: complete the current in-progress stream but block subsequent requests with an upgrade prompt and credit reset countdown.
- SSE stream interrupted mid-response: display partial content with a retry button; do not charge credits for incomplete responses.
- Document upload exceeds size limit: reject client-side before upload with a clear size guidance message.
- Concurrent sessions on multiple devices: conversation state syncs via server; concurrent edits to the same thread use last-write-wins with notification.
- Dark/light theme switch mid-stream: theme transition applies without interrupting the active SSE stream.

## Test Plan

- Unit tests: model picker selection and persistence logic, language pair swap and auto-detect state machine, writing mode segmented control state, summary length slider mapping, credit balance calculation and deduction, theme toggle propagation, side panel state management.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, quota exceeded, model unavailable, and server error responses.
- Integration tests: full chat flow from new conversation through streaming response and history persistence; translation with auto-detect and manual override; writing in all four modes with tone selection; summarization from URL with extraction and length control; reading companion with contextual Q&A; side panel activation and tool switching.
- Streaming tests: SSE reconnection on network drop, event ordering (chat_start before chat_delta before chat_done), cancellation mid-stream, error event handling, partial content display on interruption, credit accounting on incomplete streams.
- Offline tests: conversation history availability, draft preservation, queue behavior for pending requests, reconnect reconciliation with idempotency keys, reading companion cached content access.
- Credit tests: daily free limit enforcement, credit deduction per model and task type, balance display accuracy, reset timing, premium bypass, zero-balance mid-stream handling.
- Side panel tests: activation via FAB and edge swipe, height adjustment, independent navigation stack, state persistence across backgrounding, gesture conflict avoidance.
- Accessibility tests: model picker screen-reader labels, language selector announcements, writing mode descriptions, summary length slider labels, chat message role announcements, side panel open/close announcements, theme contrast compliance (WCAG AA).
- Performance tests: chat streaming latency across models, translation response time, writing mode processing speed, summarizer extraction and generation time, large conversation list scroll performance, side panel animation frame rate.
- Manual verification tests: exact credit amounts per tier and model, model availability and routing behavior, side panel overlay behavior on iOS and Android, auto-detect language confidence thresholds, subscription tier feature gates.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date (placeholder URLs replaced before implementation).
- Users can create chat conversations, select from multiple models, and receive streaming responses with visible model badges.
- Chat history supports full-text search with result highlighting and jump-to-message navigation.
- Translation tool supports language pair selection with auto-detect source language and swap functionality.
- Writing assistant provides compose, rewrite, improve, and grammar fix modes with optional tone selection.
- Summarizer accepts text, URLs, and documents with adjustable length control and bullet/prose format toggle.
- Reading companion extracts content from URLs and documents with contextual Q&A capability.
- Side panel overlay provides quick access to all tools without full-screen navigation.
- All AI response endpoints stream via SSE with correct event type ordering and reconnection handling.
- Daily free credit system enforces limits with clear balance display, usage breakdown, and upgrade prompts.
- Dark and light themes are fully implemented with system-default auto-detection.
- Manual verification blockers are documented and feature-flagged.
- At least 12 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What are the exact daily free credit amounts and how do they map to different models and task types?
- Which specific AI models does Monica offer and what is the routing/fallback logic when a model is unavailable?
- How does the side panel overlay interact with system navigation gestures on iOS and Android?
- What is the exact auto-detect language confidence threshold below which manual selection is prompted?
- What document size limits apply per tier (free vs. premium) for upload and URL extraction?
- How does Monica handle multi-turn context window limits when a conversation exceeds the model's token capacity?
- What is the credit cost differential between models (e.g., GPT-4-class vs. open-source models)?
- How does cross-device conversation sync handle conflicts when the same thread is active on multiple devices simultaneously?

## Build Plan

- **Phase 1 — App Shell + Auth + Basic Chat**: Auth flows (email and OAuth), chat home with thread list, new conversation creation, single-model chat with SSE streaming, message history persistence, dark/light theme. Target: functional single-model chat assistant.
- **Phase 2 — Multi-Model + Chat Features**: Model picker with per-conversation persistence, model switch mid-thread, full-text search across threads, pin/archive/delete, conversation export, retry and cancel controls. Target: full chat feature set.
- **Phase 3 — Translation + Writing Assistant**: Translation tool with language pair selection, auto-detect, swap, and streaming result. Writing assistant with all four modes, tone selector, compare toggle. Target: text transformation tools.
- **Phase 4 — Summarizer + Reading Companion**: Summarizer with text/URL/document input, length slider, format toggle. Reading companion with content extraction, reader view, contextual Q&A. Target: content analysis tools.
- **Phase 5 — Side Panel + Document Analysis**: Side panel overlay with FAB activation, draggable height, independent navigation, tool tabs. Document and URL analysis with chunked extraction and retrieval-augmented Q&A. Target: overlay and advanced analysis.
- **Phase 6 — Credits + Subscription + Polish**: Credit balance system with daily free limits and per-request deduction, subscription management with IAP, history screen with cross-tool search, offline mode hardening, accessibility audit, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Replace placeholder App Store and Google Play URLs with exact first-party links.
- Conduct lawful hands-on verification session with a Monica account to capture exact credit amounts, model availability, side panel UX, and auto-detect behavior.
- Select or license independent language models for chat, translation, writing, and summarization distinct from Monica's model providers.
- Design original branding, UI copy, and feature names distinct from Monica's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
