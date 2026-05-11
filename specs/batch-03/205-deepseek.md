# DeepSeek-Style Clone Spec

> Metadata
> - Inspiration app: DeepSeek
> - Category: AI chat assistant, reasoning engine, code interpreter, web-augmented search
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-10.
> - Verification basis: exact public marketplace listings, first-party product pages, API documentation, privacy/terms pages.
> - Manual verification blockers: native iOS/Android screens, signup/login flows, DeepThink streaming behavior, code interpreter sandbox limits, file upload size/type constraints, quota enforcement thresholds, push notification payloads, model routing internals, and region-specific availability require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, model weights, proprietary system prompts, private APIs, training data, evaluation datasets, or unlicensed assets.

## Overview

Build an original mobile AI assistant inspired by DeepSeek's public product: a conversational AI with extended reasoning (visible chain-of-thought), code interpretation with sandboxed execution, web search integration, file upload and analysis, multiple model options, and a generous free tier. The clone focuses on reasoning transparency, coding assistance, and research augmentation as primary differentiators.

The clone must use original branding, UI copy, sample prompts, and licensed model providers. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact native behavior.

## Goals

- Provide a mobile-first reasoning assistant with visible chain-of-thought (DeepThink-style extended reasoning).
- Support code interpretation with sandboxed execution, output capture, and error display.
- Integrate web search for grounded, citation-backed answers.
- Support file upload and multi-modal analysis (documents, images, code files).
- Expose multiple model options with clear capability and performance trade-offs.
- Offer a generous free tier with transparent usage quotas and optional paid upgrades.
- Preserve the distinction between thinking tokens (reasoning trace) and final output tokens.

## Non-Goals

- Do not imply affiliation with DeepSeek, High-Flyer, or any associated entity.
- Do not copy proprietary model weights, system prompts, RLHF data, evaluation benchmarks, or private API schemas.
- Do not replicate exact quota thresholds, rate limits, or pricing without independent verification.
- Do not present generated code, reasoning, or research as professional advice.
- Do not enable autonomous code execution outside sandboxed environments or allow file-system escape.
- Do not process production user data without explicit consent and documented retention policies.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/deepseek/id6737222587 | iOS listing, category, rating, feature description | Verified 2026-05-10 |
| Google Play | https://play.google.com/store/apps/details?id=com.deepseek.chat | Android listing, package id, permissions, data safety | Verified 2026-05-10 |
| DeepSeek Website | https://chat.deepseek.com | Product positioning, chat interface, model options, feature set | Verified 2026-05-10 |
| DeepSeek API Docs | https://platform.deepseek.com/docs | API contracts, streaming format, thinking tokens, model IDs, rate limits | Verified 2026-05-10 |

## Detailed Design

### DeepThink Mode (Extended Reasoning)

- User toggles DeepThink mode before or during a conversation to request extended reasoning.
- The model emits thinking tokens (chain-of-thought) before the final answer; these are streamed and rendered in a collapsible reasoning panel.
- Thinking tokens are visually distinct from the final response (e.g., indented, dimmed, or in a separate expandable section).
- Users can expand/collapse the reasoning trace per message.
- DeepThink uses a dedicated model variant (R1-class) with longer latency and higher token budgets.

### Code Interpreter

- Users can request code execution within a prompt; the system routes to a sandboxed runtime.
- Supported languages at minimum: Python. Additional languages behind feature flags.
- Execution produces stdout, stderr, images/plots, and structured output displayed inline.
- Sandbox has CPU/memory/time limits; exceeded limits produce a clear error with partial output preserved.
- File outputs from code execution (charts, CSVs) are downloadable.
- Code interpreter sessions maintain state within a conversation turn but reset between conversations.

### Web Search Integration

- The model can invoke web search mid-generation to ground answers in current information.
- Search results are rendered as inline citations with source URL, title, and snippet.
- Users can expand citation cards to preview source content.
- Web search can be toggled on/off per conversation or per message.

### File Upload and Analysis

- Users can attach documents (PDF, DOCX, TXT), images (PNG, JPG, WEBP), and code files.
- Files are processed server-side: text extraction, OCR for images, syntax parsing for code.
- File context is injected into the conversation and referenced by the model.
- Upload limits: file size cap (per-file and per-conversation), file count cap, supported MIME types.
- Files are retained for the conversation duration and purged on conversation delete or retention expiry.

### Model Selection

- Users choose between model variants: a fast general model (V3-class) and a reasoning model (R1-class).
- Model picker shows capability labels: speed, reasoning depth, code quality, context length.
- Model selection persists per conversation but can be changed mid-thread.
- Unavailable models show status and estimated availability.

### Free Tier and Quotas

- Free tier provides daily/monthly message limits, context length caps, and code execution quotas.
- Quota state is visible in the UI (remaining messages, reset time).
- Quota exhaustion shows a clear block with reset countdown and optional upgrade path.
- Premium tier (if offered) unlocks higher limits, priority routing, and extended context.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with product value prop, creates account or continues as guest (if supported), lands on conversation home.
2. **Standard Chat**: User types a prompt, receives streaming response, can copy/share/regenerate.
3. **DeepThink Reasoning**: User enables DeepThink, submits a complex question, watches thinking tokens stream in the reasoning panel, then reads the final synthesized answer.
4. **Code Execution**: User asks to write and run code, sees generated code block, watches execution output appear inline, downloads any generated files.
5. **Web-Grounded Research**: User asks a current-events question with web search enabled, receives answer with inline citations, expands citation cards for source preview.
6. **File Analysis**: User uploads a PDF, asks questions about its content, receives answers referencing specific sections.
7. **Model Switch**: User switches from V3 to R1 mid-conversation for a harder problem, sees model label update and capability change.
8. **Quota Hit**: User reaches daily limit, sees quota exhaustion message with reset timer, decides whether to wait or upgrade.
9. **Conversation Management**: User searches history, renames a thread, pins important conversations, deletes old ones, exports a thread.
10. **Offline/Error Recovery**: User loses connection mid-stream, sees partial response preserved, reconnects and can retry or continue.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, guest mode, consent |
| Home/Conversations | Thread list and entry point | Recent conversations, new chat FAB, search, empty state |
| Chat Thread | Primary interaction | Message list, composer, model badge, DeepThink toggle, web search toggle, file attach |
| Deep Think Viewer | Reasoning trace display | Collapsible thinking panel, step indicators, timing, token count |
| Code Interpreter Output | Execution results | Code block, stdout/stderr, plots/images, download links, error state |
| Web Search Results | Citation display | Source cards, URL, title, snippet, expand/preview |
| File Manager | Attachment handling | Upload progress, file list, preview, remove, size/type indicators |
| Model Selector | Model choice | Model cards with capability labels, availability status, selection state |
| History/Search | Conversation discovery | Search bar, filters, date groups, pin/archive indicators |
| Settings & Privacy | Account and preferences | Theme, notifications, data export, delete account, privacy controls |
| Support & Safety | Help and reporting | Report output, feedback, help articles, contact |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, locale, created_at, quota_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, token, created_at, revoked_at |
| Conversation | id, user_id, title, model_id, deepthink_enabled, web_search_enabled, created_at, pinned, archived, deleted_at |
| Message | id, conversation_id, role (user/assistant/system), content_parts[], status, token_count, created_at |
| ContentPart | id, message_id, type (text/code/image/file_ref/citation), body, metadata |
| ThinkingStep | id, message_id, sequence, content, duration_ms, token_count, collapsed_default |
| CodeExecution | id, message_id, language, source_code, stdout, stderr, exit_code, output_files[], duration_ms, sandbox_id |
| WebSearchResult | id, message_id, query, source_url, title, snippet, retrieved_at, relevance_score |
| FileAttachment | id, conversation_id, user_id, filename, mime_type, size_bytes, storage_ref, extracted_text_ref, scan_state, uploaded_at, deleted_at |
| ModelSelection | id, conversation_id, model_id, selected_at, capability_snapshot |
| UsageQuota | id, user_id, tier, messages_used, messages_limit, code_executions_used, code_executions_limit, reset_at |
| SafetyReport | id, user_id, target_message_id, reason, description, status, created_at |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /conversations | GET | List user conversations |
| /conversations | POST | Create new conversation |
| /conversations/:id | GET | Fetch conversation with messages |
| /conversations/:id | PATCH | Rename, pin, archive |
| /conversations/:id | DELETE | Soft-delete conversation |
| /conversations/:id/messages | POST | Send message (streaming response via SSE) |
| /conversations/:id/messages/:mid/regenerate | POST | Regenerate assistant response |
| /conversations/:id/messages/:mid/thinking | GET | Fetch thinking steps for a message |
| /code/execute | POST | Submit code for sandboxed execution |
| /code/executions/:id | GET | Poll execution result |
| /code/executions/:id/files/:fid | GET | Download execution output file |
| /search/web | POST | Trigger web search (used by model internally or manually) |
| /files/upload | POST | Upload file attachment (multipart) |
| /files/:id | GET | Retrieve file metadata |
| /files/:id | DELETE | Remove file |
| /models | GET | List available models with capabilities |
| /models/:id/status | GET | Check model availability |
| /usage/quota | GET | Current quota state and reset time |
| /reports | POST | Submit safety/abuse report |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message creation returns an SSE stream with event types: `thinking_delta`, `thinking_done`, `content_delta`, `content_done`, `citation`, `code_execution_start`, `code_execution_output`, `code_execution_done`, `error`, `done`.

## Realtime, Push, And Offline Behavior

- Response streaming uses SSE with automatic reconnection and resume from last event ID.
- Thinking tokens stream separately from content tokens, enabling real-time reasoning panel updates.
- Code execution results are pushed via the same SSE channel when execution completes.
- Offline mode: cached conversation history is readable; new messages are queued as drafts; submit is blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys to prevent duplicate message submission.
- Push notifications (opt-in): long-running code execution completion, quota reset, account security events.
- Local draft persistence: unsent messages and file selections survive app kill/restart.
- Conversation cache invalidation: poll on app foreground or use lightweight sync endpoint.

## Permissions, Privacy, And Safety

- Camera/photo library: requested only when user initiates image upload.
- File access: requested only when user initiates document upload.
- Notifications: requested only after first relevant event (e.g., background execution completes).
- No microphone, location, contacts, or calendar access required for V1.
- User prompts and responses are not used for model training without explicit opt-in consent.
- File attachments are processed server-side with retention limited to conversation lifetime.
- Code execution sandbox is isolated: no network access, no persistent storage, CPU/memory/time bounded.
- Generated content carries a disclaimer: "AI-generated. Verify before use."
- Safety filters block: CSAM, weapons instructions, personal information extraction, malware generation.
- Crisis content (self-harm, violence) triggers a refusal with resource referral.
- Data export includes all conversations, messages, thinking steps, files, and account data.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Manual verification required: exact permission prompt timing, app-store privacy labels, push payload format, regional content restrictions.

## Analytics And Monetization

- Events tracked: session_start, conversation_created, message_sent, deepthink_toggled, code_executed, web_search_triggered, file_uploaded, model_switched, quota_viewed, report_submitted, export_requested.
- Event properties: coarse latency bucket, model class, message count bucket, error code, quota tier. Never raw prompts, responses, files, or thinking content.
- Monetization model: generous free tier (daily message cap, code execution cap) with optional premium tier for higher limits, priority model access, and extended context.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate safety features, data export/delete, account recovery, or access to existing conversation history.

## Edge Cases

- DeepThink produces extremely long reasoning chains (>10K tokens): truncate display with "show more" but preserve full trace server-side.
- Code execution timeout: display partial stdout captured before kill, show timeout error.
- Code execution produces large output files: enforce download size cap, offer truncated preview.
- Web search returns zero results or all results are blocked: display "no results" state, model continues without citations.
- File upload fails mid-transfer: show retry option, preserve other attachments in the message draft.
- Model becomes unavailable after conversation started with it: offer fallback model with capability warning.
- User switches models mid-reasoning: cancel current generation, restart with new model.
- Quota exhausted mid-stream: complete current response but block next message.
- Thinking tokens stream but final answer fails: show thinking trace with error state on final answer.
- Concurrent sessions submit to same conversation: last-write-wins with conflict indicator.
- Extremely large file upload (beyond limit): reject with clear size/type error before transfer begins.
- User deletes conversation while code execution is in-flight: cancel execution, purge results.

## Test Plan

- Unit tests: message state machine, thinking step accumulation, quota counter logic, model selection rules, file validation (MIME/size), SSE event parsing, idempotency key generation.
- Contract tests: all API endpoints with success, validation error, auth error, quota exceeded, and server error responses.
- Integration tests: full flow from prompt submission through thinking stream through final response; code execution end-to-end; file upload through analysis response; web search citation rendering.
- Streaming tests: SSE reconnection, partial thinking followed by content, interleaved citations, code execution events mid-stream.
- Offline tests: draft preservation, queue behavior, reconnect reconciliation, duplicate prevention.
- Code sandbox tests: timeout enforcement, memory limit, no-network verification, output file capture, error propagation.
- Safety tests: blocked content categories, crisis prompt handling, hallucination disclaimer presence, report submission flow.
- Quota tests: increment on message send, block on exhaustion, reset on timer, premium tier bypass, cross-device sync.
- Accessibility tests: thinking panel screen-reader announcements, code output labeling, streaming progress indicators, focus management.
- Performance tests: thinking token render rate, large conversation scroll performance, file upload progress accuracy.
- Manual verification tests: native app permission prompts, store purchase/restore, push notification delivery, model switching latency on device.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- DeepThink mode streams visible chain-of-thought in a collapsible panel distinct from final output.
- Code interpreter executes user-requested code in a sandbox and displays stdout, stderr, plots, and downloadable files.
- Web search produces inline citations with expandable source cards.
- File upload supports PDF, DOCX, TXT, PNG, JPG, WEBP with extraction and model-referenced analysis.
- Model selector exposes at least two model tiers with clear capability/speed labels.
- Free tier quota is enforced with visible counters and graceful exhaustion UX.
- Streaming handles all event types (thinking, content, citation, code execution) without UI corruption.
- Offline mode preserves drafts and blocks unsafe operations.
- Safety filters and disclaimers are present and tested.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 11 screens are inventoried with purpose and key elements.

## Open Questions

- What are the exact daily/monthly message limits for the free tier on mobile vs. web?
- Does the mobile app support guest/anonymous usage or require account creation?
- What specific code execution languages and library sets are available in the sandbox?
- Are thinking tokens counted against the user's quota or only final output tokens?
- What is the maximum file size and count per conversation on mobile?
- Which regions have restricted access or modified feature sets?
- Does the mobile app support voice input or is it text/file only?
- What is the exact SSE event schema for thinking vs. content token streaming?

## Build Plan

- **Phase 1 — Foundation**: Auth flows, conversation CRUD, basic chat with streaming text responses, model selection persistence. Target: functional chat shell.
- **Phase 2 — DeepThink**: Thinking token streaming, collapsible reasoning panel, step timing display, R1-class model routing. Target: visible chain-of-thought working end-to-end.
- **Phase 3 — Code Interpreter**: Sandbox infrastructure, code execution endpoint, output rendering (text, images, files), timeout/error handling. Target: run Python and display results inline.
- **Phase 4 — Web Search & Files**: Web search integration with citation rendering, file upload pipeline with extraction, multi-modal context injection. Target: grounded answers and document analysis.
- **Phase 5 — Quota & Monetization**: Usage tracking, quota enforcement, premium tier billing, cross-platform entitlement sync, paywall UX. Target: sustainable free tier with upgrade path.
- **Phase 6 — Polish & Verification**: Offline mode, push notifications, accessibility audit, safety filter hardening, manual native verification, performance optimization. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on native verification session to capture exact permission prompts, streaming UX, quota thresholds, and model switching behavior.
- Select original providers for inference (reasoning and general models), code sandbox, web search, file processing, and billing.
- Design original branding, UI copy, and sample prompts distinct from DeepSeek's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
