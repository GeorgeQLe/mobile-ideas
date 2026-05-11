# Wordtune-Style Clone Spec

> Metadata
> - Inspiration app: Wordtune (by AI21 Labs)
> - Category: AI rewriting tool, sentence rewriter, tone adjustment, text summarization, translation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: native iOS/Android screens, signup/login flows, rewrite suggestion UI behavior, tone adjustment accuracy thresholds, Spices feature interaction patterns, daily free rewrite quotas, subscription enforcement timing, SSE streaming latency, translation language coverage, summarizer length controls, and push notification payloads require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary NLP models, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI rewriting assistant inspired by Wordtune's public product: a sentence-level and paragraph-level rewriting tool with tone adjustment, shorten/expand controls, document summarization, translation with style adaptation, enrichment add-ons (examples, statistics, analogies, counterarguments), and an AI writing assistant for composing from scratch. The clone focuses on helping users improve clarity, tone, and conciseness in their writing across casual and professional contexts.

The clone must use original branding, UI copy, sample text, and licensed model providers. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact native behavior.

## Goals

- Provide sentence-level rewriting with multiple alternative suggestions ranked by relevance and quality.
- Support tone adjustment controls: casual, formal, shortened, and expanded rewrites.
- Offer full document and paragraph summarization with configurable length targets.
- Enable translation with post-translation rewriting to produce natural target-language output.
- Provide Spices enrichment: inject examples, statistics, analogies, or counterarguments into user text.
- Support an AI writing assistant mode for composing new text from a prompt or outline.
- Maintain rewrite history with favorites so users can recall and reuse past suggestions.
- Offer a free tier with daily rewrite limits and a premium tier with unlimited access.

## Non-Goals

- Do not imply affiliation with AI21 Labs, Wordtune, or any associated entity.
- Do not copy proprietary model weights, fine-tuning data, system prompts, ranking algorithms, or private API schemas.
- Do not replicate exact daily free rewrite counts or pricing without independent verification.
- Do not present rewritten text as grammatically guaranteed; always surface a review disclaimer on generated output.
- Do not process text for regulated domains (legal, medical, financial) without domain-specific disclaimers.
- Do not retain user text beyond session or document lifetime without explicit consent.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Wordtune Website | https://www.wordtune.com | Product positioning, rewrite features, tone controls, Spices, summarizer, translator | Verified 2026-05-11 |
| Wordtune Blog | https://www.wordtune.com/blog | Feature announcements, product updates, use-case examples | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/us/app/wordtune-ai-writing-assistant/id1643645881 | iOS listing, category, rating, feature description | Pending verification |
| Google Play | https://play.google.com/store/apps/details?id=com.ai21.android.wordtune | Android listing, permissions, data safety | Pending verification |

## Detailed Design

### Sentence-Level Rewriting

- User selects or types a sentence; the system returns multiple rewrite alternatives displayed as a scrollable card list.
- Each suggestion shows a diff-style highlight indicating what changed from the original.
- Users can tap to replace the original, copy a suggestion, or favorite it for later.
- Rewrite quality is ranked by semantic similarity to the original intent combined with fluency scoring.
- Subsequent rewrites on the same sentence incorporate prior selections as implicit preference signals within the session.

### Tone Adjustment

- Four primary tone modes: casual, formal, shortened, and expanded.
- Casual rewrites simplify vocabulary and sentence structure for conversational contexts.
- Formal rewrites elevate register, remove contractions, and adopt professional phrasing.
- Shorten compresses the sentence while preserving core meaning; expand adds supporting detail and context.
- Tone selector is always visible in the rewrite toolbar; changing tone triggers a fresh set of suggestions.

### Document Summarization

- User pastes or imports a document (plain text, up to a configurable character limit per tier).
- The summarizer produces a concise summary with configurable target length (short, medium, detailed).
- Key points are extracted as bullet items beneath the prose summary.
- Users can regenerate with a different length setting or request a summary of a selected paragraph only.

### Translation with Rewrite

- User selects a source sentence and a target language from a supported language list.
- The system translates the sentence, then applies a style-aware rewrite pass in the target language to improve naturalness.
- Output shows both the raw translation and the rewritten version side by side.
- Supported languages are listed in a searchable picker; unsupported pairs show a clear unavailability notice.

### Spices (Enrichment)

- Four enrichment types: add an example, add a statistic, add an analogy, add a counterargument.
- User selects a sentence and chooses a Spice type; the system generates an enriched version with the requested element inserted.
- Each Spice result is clearly labeled with the enrichment type badge.
- Users can cycle through multiple Spice suggestions per type.

### AI Writing Assistant

- User provides a brief prompt, topic, or outline; the assistant generates a multi-paragraph draft.
- Generated text streams progressively and can be edited inline after completion.
- Users can request tone changes or expansions on the generated draft using the same rewrite controls.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with writing-improvement value prop, creates account or signs in, lands on the home editor.
2. **Quick Rewrite**: User types or pastes a sentence, taps Rewrite, reviews multiple suggestions, selects one and copies it.
3. **Tone Change**: User enters a sentence, selects Formal tone, reviews formal alternatives, picks the best fit.
4. **Shorten/Expand**: User highlights a verbose sentence, taps Shorten, reviews compressed alternatives; or taps Expand on a terse sentence.
5. **Document Summary**: User pastes a long article, taps Summarize, reviews the summary and key points, adjusts length target and regenerates.
6. **Translate and Rewrite**: User enters a sentence, picks a target language, reviews both the raw translation and the style-adapted rewrite.
7. **Add a Spice**: User selects a sentence, picks "Add Analogy" from the Spices menu, reviews enriched suggestions, inserts the chosen one.
8. **Compose from Scratch**: User enters a writing prompt in the assistant, reviews the generated draft, applies tone adjustments to individual paragraphs.
9. **History and Favorites**: User opens rewrite history, filters by favorites, taps a past rewrite to reuse it.
10. **Quota Exhaustion**: User hits daily free rewrite limit, sees upgrade prompt with reset countdown, decides whether to wait or subscribe.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth (Google, Apple), consent |
| Home/Editor | Primary text input and rewrite hub | Text input area, rewrite button, tone selector toolbar, paste/import actions |
| Rewrite Results | Suggestion display | Original sentence, suggestion cards with diff highlights, copy/favorite/replace actions |
| Summarizer | Document summarization | Text input/import, length selector (short/medium/detailed), summary output, key points list |
| Translator | Translation with rewrite | Source text, language picker, raw translation, rewritten translation, copy actions |
| Spices/Enrichment | Text enrichment | Sentence display, Spice type selector (example/statistic/analogy/counterargument), enriched suggestions |
| Rewrite History | Past rewrite discovery | Date-grouped list, favorites filter, search, tap to reuse |
| Writing Assistant | AI composition | Prompt input, generated draft with inline editing, tone/rewrite controls on paragraphs |
| Settings | Account and preferences | Theme, default tone, language preferences, data export, delete account |
| Subscription | Billing and tier management | Plan comparison, current usage, daily rewrite counter, upgrade/downgrade, billing history |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, preferred_tone, preferred_language, created_at, quota_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, token, created_at, revoked_at |
| Document | id, user_id, title, content_text, source_type (paste/type/import), character_count, created_at, updated_at |
| RewriteRequest | id, user_id, document_id, original_text, tone (casual/formal/shorten/expand/neutral), language, created_at |
| RewriteResult | id, request_id, suggestion_text, diff_markers, rank, quality_score, selected, created_at |
| Summary | id, user_id, document_id, source_text_hash, length_target (short/medium/detailed), summary_text, key_points[], created_at |
| Translation | id, user_id, source_text, source_language, target_language, raw_translation, rewritten_translation, created_at |
| SpiceResult | id, user_id, original_text, spice_type (example/statistic/analogy/counterargument), enriched_text, rank, created_at |
| WritingSession | id, user_id, prompt_text, generated_draft, tone, status (drafting/complete), created_at, updated_at |
| RewriteHistory | id, user_id, request_id, result_id, action (selected/copied/favorited), created_at |
| FavoriteRewrite | id, user_id, result_id, original_text, rewritten_text, tone, created_at |
| Subscription | id, user_id, tier (free/premium), store_product_id, daily_rewrites_used, daily_reset_at, started_at, expires_at, auto_renew, cancellation_at |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email/password or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /documents | GET | List user documents |
| /documents | POST | Create or import a document |
| /documents/:id | GET | Fetch document content |
| /documents/:id | PATCH | Update document content |
| /documents/:id | DELETE | Soft-delete document |
| /rewrite | POST | Submit sentence for rewriting (streaming response via SSE) |
| /rewrite/:id/select | POST | Mark a rewrite suggestion as selected |
| /summarize | POST | Submit text for summarization (streaming response via SSE) |
| /translate | POST | Submit text for translation with rewrite (streaming response via SSE) |
| /spices | POST | Submit text for Spice enrichment (streaming response via SSE) |
| /writing/compose | POST | Submit prompt for AI writing assistant (streaming response via SSE) |
| /history | GET | List rewrite history with pagination and filters |
| /favorites | GET | List favorited rewrites |
| /favorites | POST | Add a rewrite to favorites |
| /favorites/:id | DELETE | Remove a favorite |
| /subscriptions | GET | Current subscription state and daily usage |
| /subscriptions | POST | Create or change subscription |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Rewrite, summarize, translate, spice, and compose endpoints return SSE streams with event types: `rewrite_start`, `rewrite_option`, `summary_delta`, `translation_result`, `spice_suggestion`, `content_delta`, `content_done`, `error`, `done`.

## Realtime Push And Offline Behavior

- Rewrite, summarize, translate, and compose responses stream via SSE with automatic reconnection and resume from last event ID.
- Rewrite suggestions stream one option at a time; the UI appends each card as it arrives.
- Summary text streams progressively; key points appear after the prose summary completes.
- Offline mode: cached documents, rewrite history, and favorites are readable; new rewrite requests are queued as drafts.
- Reconnect reconciliation uses idempotency keys to prevent duplicate rewrite submissions.
- Push notifications (opt-in): daily rewrite quota reset, subscription renewal reminders, account security events.
- Local draft persistence: unsent text and pending rewrite requests survive app kill/restart.
- Document cache invalidation: poll on app foreground or use lightweight sync endpoint.

## Permissions Privacy And Safety

- Camera/photo library: not required for V1 (text input only).
- File access: requested only when user initiates document import from device storage.
- Notifications: requested only after first relevant event (e.g., daily quota reset notification preference).
- Clipboard: read only on explicit paste action; no background clipboard monitoring.
- No microphone, location, contacts, or calendar access required.
- User text, documents, and rewrite results are not used for model training without explicit opt-in consent.
- Documents and rewrite results are retained for account lifetime and purged on document delete or account deletion.
- Generated rewrites carry a disclaimer: "AI-generated suggestion. Review before use."
- Safety filters block: hate speech generation, harassment amplification, misinformation enhancement, CSAM-adjacent content, and personal data extraction.
- Crisis content (self-harm, violence) triggers refusal with resource referral.
- Data export includes all documents, rewrite history, favorites, writing sessions, and account data.
- Account deletion purges all user data within documented retention window.
- Manual verification required: exact permission prompt timing, app-store privacy labels, push payload format, daily quota reset behavior.

## Analytics And Monetization

- Events tracked: session_start, rewrite_requested, rewrite_selected, rewrite_copied, tone_changed, summary_requested, translation_requested, spice_requested, compose_started, favorite_added, history_viewed, quota_viewed, subscription_started.
- Event properties: tone type, spice type, target language, suggestion rank selected, latency bucket, quota tier. Never raw user text, document content, or rewrite suggestions.
- Monetization model: free tier with daily rewrite limit (exact count requires verification); premium tier for unlimited rewrites, priority model routing, longer document summarization, and all Spice types.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate safety features, data export/delete, account recovery, or access to existing rewrite history and favorites.

## Edge Cases

- Rewrite returns suggestions nearly identical to the original: deduplicate and display a "your text is already clear" message.
- User submits a single word or fragment too short to rewrite meaningfully: return a minimum-length error with guidance.
- Document exceeds character limit for summarization: reject with clear size error and tier upgrade prompt.
- Translation requested for an unsupported language pair: display unavailability notice with list of supported languages.
- Spice enrichment generates a factually questionable statistic: label all statistics as "AI-generated, verify independently."
- Streaming response interrupted mid-suggestion: preserve partial suggestions with visual indicator that generation was interrupted.
- Quota exhausted mid-stream: complete current rewrite response but block next request with reset countdown.
- User pastes extremely large text (>50,000 characters): reject with size error before processing begins.
- Multiple rapid rewrite requests on the same sentence: debounce and cancel in-flight requests before sending new ones.
- Writing assistant generates content in the wrong language: detect mismatch and offer to regenerate with explicit language instruction.
- Tone selector changed while rewrite is streaming: cancel current stream and start a new rewrite with the updated tone.
- User deletes a document while a summarization is in progress: cancel in-flight generation and confirm deletion.

## Test Plan

- Unit tests: rewrite suggestion deduplication, diff marker generation, tone classifier mapping, quota counter increment/reset logic, character count validation, SSE event parsing, idempotency key generation, favorite toggle state.
- Contract tests: all API endpoints with success, validation error, auth error, quota exceeded, and server error responses.
- Integration tests: full flow from text input through rewrite suggestion selection; summarize document with length target changes; translate and compare raw vs. rewritten output; Spice enrichment cycle through all four types; writing assistant compose and edit.
- Streaming tests: SSE reconnection, partial suggestion rendering, multiple rewrite options arriving sequentially, summary delta accumulation.
- Offline tests: draft preservation, queue behavior, reconnect reconciliation, duplicate prevention.
- Safety tests: blocked content categories (hate speech, harassment, misinformation), disclaimer presence on all generated text, report submission flow.
- Quota tests: increment on rewrite/summarize/translate/spice, block on exhaustion, reset on daily timer, premium tier bypass, cross-device sync.
- Accessibility tests: suggestion card screen-reader announcements with tone labels, diff highlight descriptions, streaming progress indicators, focus management on suggestion selection.
- Performance tests: rewrite suggestion rendering latency for long sentences, history list scroll with many entries, document import parsing speed.
- Manual verification tests: native app permission prompts, store purchase/restore, push notification delivery, daily quota reset timing on device.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Sentence-level rewriting returns multiple ranked suggestions with diff-style change highlights.
- Tone adjustment (casual, formal, shorten, expand) produces distinct suggestion sets per mode.
- Document summarization produces configurable-length summaries with extracted key points.
- Translation with rewrite displays both raw and style-adapted translations side by side.
- Spices enrichment generates labeled suggestions for all four enrichment types.
- AI writing assistant composes multi-paragraph drafts from user prompts with streaming output.
- Rewrite history and favorites persist across sessions with search and filter support.
- Free tier quota is enforced with visible counters and graceful exhaustion UX.
- Streaming handles all event types (rewrite options, summary deltas, translation results, spice suggestions) without UI corruption.
- Offline mode preserves drafts and blocks unsafe operations.
- Safety filters and AI-generated disclaimers are present and tested.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What is the exact daily free rewrite count on the Wordtune mobile app?
- Does the mobile app support document import from cloud storage (Google Drive, iCloud) or only local files?
- Which languages are supported for the translation-with-rewrite feature on mobile?
- Are all four Spice types available on the free tier or are some premium-only?
- Does the mobile app offer a browser extension integration or is it standalone only?
- What is the maximum document length (in characters or words) supported for summarization per tier?
- Does the writing assistant support structured output formats (bullet points, numbered lists) or only prose?
- What is the exact SSE event schema for rewrite option streaming vs. summary delta streaming?

## Build Plan

- **Phase 1 — App Shell, Auth, Basic Rewrite**: Auth flows (email, Google/Apple OAuth), home editor screen, basic sentence rewriting with multiple suggestions, copy and replace actions. Target: functional rewrite shell.
- **Phase 2 — Tone Adjustment and Shorten/Expand**: Tone selector toolbar (casual, formal, shorten, expand), tone-specific suggestion generation, diff-style change highlighting on suggestion cards. Target: complete tone rewriting experience.
- **Phase 3 — Summarizer and Translator**: Document summarization with length controls and key point extraction, translation with post-translation rewriting, language picker with supported pair validation. Target: multi-modal text processing.
- **Phase 4 — Spices and Writing Assistant**: All four Spice enrichment types with labeled suggestions, AI writing assistant with prompt-based composition and streaming output. Target: full feature coverage.
- **Phase 5 — History, Favorites, and Subscription**: Rewrite history with date grouping and search, favorites collection, daily quota tracking, premium tier billing via IAP, cross-platform entitlement sync. Target: sustainable free tier with upgrade path.
- **Phase 6 — Safety, Accessibility, and Polish**: Safety filter hardening, AI-generated disclaimer enforcement, accessibility audit (VoiceOver/TalkBack for suggestion cards and diff highlights), push notifications, offline polish, manual native verification. Target: app-store-ready quality.

## Next Steps

- Verify Wordtune mobile app availability and exact feature set on iOS and Android app stores; update Research Sources status accordingly.
- Conduct lawful hands-on verification session to capture exact rewrite UX, tone suggestion behavior, Spices interaction flow, daily quota thresholds, and summarizer length limits.
- Select original providers for inference (rewriting, summarization, and translation models), diff rendering library, and billing infrastructure.
- Design original branding, UI copy, and sample text prompts distinct from Wordtune's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
