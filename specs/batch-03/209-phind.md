# Phind-Style Clone Spec

> Metadata
> - Inspiration app: Phind
> - Category: developer AI assistant, code generation, technical search, pair programming
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-10.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: native iOS/Android screens, signup/login flows, pair programming streaming behavior, code generation quality controls, context window limits, subscription enforcement thresholds, push notification payloads, model routing internals, and IDE integration details require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary system prompts, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile developer AI assistant inspired by Phind's public product: a code-aware AI search engine with conversational code generation, pair programming mode, multi-file context awareness, syntax-highlighted output, and technical documentation search. The clone focuses on developer productivity, code quality, and technical accuracy as primary differentiators over general-purpose AI assistants.

The clone must use original branding, UI copy, sample prompts, and licensed model providers. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact native behavior.

## Goals

- Provide a mobile-first developer search assistant with code-aware results ranked for technical relevance.
- Support conversational code generation with multi-turn context, syntax highlighting, and inline editing.
- Offer a pair programming mode where the assistant collaborates on multi-file tasks in real time.
- Integrate technical documentation search with source attribution and API reference linking.
- Expose an IDE-like code editor/preview for reviewing and editing generated code before use.
- Support multi-file context injection so the model understands project structure and cross-file dependencies.
- Offer a free tier with transparent usage quotas and optional paid upgrades for higher limits and priority routing.

## Non-Goals

- Do not imply affiliation with Phind, Inc. or any associated entity.
- Do not copy proprietary model weights, fine-tuning data, system prompts, ranking algorithms, or private API schemas.
- Do not replicate exact quota thresholds, rate limits, or pricing without independent verification.
- Do not present generated code as production-ready without user review; always include a verification disclaimer.
- Do not enable arbitrary code execution on user devices outside sandboxed preview environments.
- Do not process production user codebases without explicit consent and documented retention policies.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Phind Website | https://www.phind.com | Product positioning, search interface, code generation features, pair programming mode | Verified 2026-05-10 |
| Phind Blog | https://www.phind.com/blog | Feature announcements, model updates, product direction | Verified 2026-05-10 |
| Apple App Store | https://apps.apple.com/us/app/phind-ai-search-engine/id6468795653 | iOS listing, category, rating, feature description | Pending verification |
| Google Play | https://play.google.com/store/apps/details?id=com.phind.app | Android listing, permissions, data safety | Pending verification |

## Detailed Design

### Technical Search

- User submits a natural language or code-fragment query; the system returns code-aware results ranked by technical relevance.
- Results include synthesized answers with inline code blocks, source attributions with links to documentation pages, and follow-up question suggestions.
- Search results distinguish between documentation sources, Stack Overflow-style Q&A, GitHub references, and AI-generated synthesis.
- Users can filter results by language, framework, or source type.

### Code Chat (Conversational Code Generation)

- Users engage in multi-turn conversations focused on coding tasks; the assistant generates code with syntax highlighting.
- Each response can contain multiple code blocks with language labels, copy buttons, and line numbers.
- Users can request modifications to previously generated code within the same thread.
- The assistant tracks conversation context including all code blocks, file references, and stated requirements.
- Streaming responses render code blocks progressively with real-time syntax highlighting.

### Pair Programming Mode

- A dedicated mode where the assistant acts as a live pair programmer on a multi-step coding task.
- The user defines a task scope and the assistant breaks it into sub-tasks, generating code for each step.
- The assistant maintains awareness of all code generated so far within the session.
- Users can accept, reject, or request modifications to individual steps before proceeding.
- Session state persists across app kills and can be resumed.

### Code Editor and Preview

- Generated code blocks can be opened in an IDE-like editor with syntax highlighting, line numbers, and basic editing.
- Users can make manual edits before copying or sharing the code.
- Preview mode renders HTML/CSS/JS output in a sandboxed webview for front-end code.
- Diff view shows changes between iterations of generated code within a conversation.

### Multi-File Context

- Users can paste or upload multiple code files to establish project context before querying.
- The assistant references specific files and line ranges when generating responses.
- Context files are listed in a sidebar with language icons and can be added/removed mid-conversation.
- Context size is capped per tier; approaching the limit shows a warning with options to trim or upgrade.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with developer-focused value prop, creates account or signs in, lands on search home.
2. **Technical Search**: User types a coding question, receives synthesized answer with code blocks and source links, follows up for clarification.
3. **Code Generation Chat**: User starts a chat asking to build a function, iterates through multiple turns refining the code, copies final result.
4. **Pair Programming**: User enters pair mode, defines a task, reviews step-by-step code generation, accepts or modifies each step, exports the complete result.
5. **Context-Aware Query**: User uploads project files, asks a question referencing the codebase, receives an answer grounded in the provided context.
6. **Code Editing**: User opens a generated code block in the editor, makes manual changes, copies the modified version.
7. **History Recall**: User searches saved conversations, reopens a previous code chat, continues the thread.
8. **Quota Hit**: User reaches daily limit, sees quota exhaustion message with reset timer, decides whether to wait or upgrade.
9. **Offline Browsing**: User loses connectivity, browses cached conversation history, queues a new message as a draft.
10. **Safety Report**: User reports problematic generated content, receives confirmation, content is flagged for review.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth (GitHub, Google), consent |
| Search Home | Primary entry point | Search bar, suggested queries, recent searches, language filter |
| Technical Search Results | Answer display | Synthesized answer, code blocks, source cards, follow-up suggestions |
| Code Chat Thread | Conversational coding | Message list, composer, code blocks with copy/edit, context indicator |
| Pair Programming View | Collaborative coding | Task scope, step list, code generation area, accept/reject controls, progress |
| Code Editor/Preview | Code review and editing | Syntax-highlighted editor, line numbers, diff view, copy/share, webview preview |
| History/Saved Searches | Conversation discovery | Search bar, date groups, pinned threads, language tags |
| Profile/Settings | Account and preferences | Theme, default language, editor preferences, data export, delete account |
| Subscription | Billing and tier management | Plan comparison, current usage, upgrade/downgrade, billing history |
| Support & Safety | Help and reporting | Report output, feedback form, help articles, contact |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, preferred_language, created_at, quota_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, token, created_at, revoked_at |
| TechnicalQuery | id, user_id, query_text, language_filter, framework_filter, source_filter, result_count, created_at |
| SearchResult | id, query_id, rank, source_type (doc/qa/github/synthesis), source_url, title, snippet, relevance_score |
| CodeSnippet | id, message_id, language, source_code, line_count, copy_count, version, parent_snippet_id |
| Conversation | id, user_id, title, mode (search/chat/pair), model_id, context_file_count, created_at, pinned, deleted_at |
| Message | id, conversation_id, role (user/assistant/system), content_parts[], status, token_count, created_at |
| ContentPart | id, message_id, type (text/code/source_ref/diff), body, language, metadata |
| CodeContext | id, conversation_id, filename, language, content_hash, size_bytes, line_count, uploaded_at, removed_at |
| PairSession | id, conversation_id, task_description, steps_total, steps_completed, status (active/paused/completed), created_at |
| Subscription | id, user_id, tier, store_product_id, started_at, expires_at, auto_renew, cancellation_at |
| SafetyReport | id, user_id, target_message_id, reason, description, status, created_at |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email/password or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /search/technical | POST | Submit technical search query, returns synthesized answer |
| /conversations | GET | List user conversations |
| /conversations | POST | Create new conversation (chat or pair mode) |
| /conversations/:id | GET | Fetch conversation with messages |
| /conversations/:id | PATCH | Rename, pin, change mode |
| /conversations/:id | DELETE | Soft-delete conversation |
| /conversations/:id/messages | POST | Send message (streaming response via SSE) |
| /conversations/:id/messages/:mid/regenerate | POST | Regenerate assistant response |
| /conversations/:id/context | GET | List context files |
| /conversations/:id/context | POST | Upload context file |
| /conversations/:id/context/:cid | DELETE | Remove context file |
| /pair/:id/steps | GET | List pair programming steps |
| /pair/:id/steps/:sid/accept | POST | Accept a pair step |
| /pair/:id/steps/:sid/reject | POST | Reject and request revision |
| /code/preview | POST | Render HTML/CSS/JS in sandboxed preview |
| /models | GET | List available models |
| /usage/quota | GET | Current quota state and reset time |
| /subscriptions | GET | Current subscription state |
| /subscriptions | POST | Create or change subscription |
| /reports | POST | Submit safety/abuse report |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message creation returns an SSE stream with event types: `content_delta`, `content_done`, `code_block_start`, `code_block_delta`, `code_block_done`, `source_ref`, `pair_step_start`, `pair_step_done`, `error`, `done`.

## Realtime Push And Offline Behavior

- Response streaming uses SSE with automatic reconnection and resume from last event ID.
- Code blocks stream progressively; syntax highlighting is applied incrementally as tokens arrive.
- Pair programming step completions trigger local notifications if the app is backgrounded.
- Offline mode: cached conversations and search results are readable; new queries are queued as drafts.
- Reconnect reconciliation uses idempotency keys to prevent duplicate message submission.
- Push notifications (opt-in): pair session step completion, quota reset, account security events.
- Local draft persistence: unsent messages and context file selections survive app kill/restart.
- Conversation cache invalidation: poll on app foreground or use lightweight sync endpoint.

## Permissions Privacy And Safety

- Camera/photo library: not required for V1 (text and file paste only).
- File access: requested only when user initiates code file upload for context.
- Notifications: requested only after first relevant event (e.g., pair session step completes in background).
- Clipboard: read only on explicit paste action; no background clipboard monitoring.
- No microphone, location, contacts, or calendar access required.
- User prompts, code context, and responses are not used for model training without explicit opt-in consent.
- Uploaded context files are retained for conversation lifetime and purged on conversation delete or retention expiry.
- Code preview runs in a sandboxed webview with no access to device APIs, local storage, or network.
- Generated code carries a disclaimer: "AI-generated code. Review and test before production use."
- Safety filters block: malware generation, credential extraction prompts, exploit code, CSAM, and personal information harvesting.
- Crisis content (self-harm, violence) triggers refusal with resource referral.
- Data export includes all conversations, messages, code snippets, context files, and account data.
- Account deletion purges all user data within documented retention window.
- Manual verification required: exact permission prompt timing, app-store privacy labels, push payload format.

## Analytics And Monetization

- Events tracked: session_start, search_submitted, conversation_created, message_sent, code_copied, pair_session_started, pair_step_accepted, context_file_uploaded, editor_opened, quota_viewed, report_submitted.
- Event properties: coarse latency bucket, language tag, message count bucket, error code, quota tier. Never raw prompts, code content, or context files.
- Monetization model: free tier with daily search and message limits; premium tier for higher limits, priority model routing, larger context windows, and advanced pair programming features.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate safety features, data export/delete, account recovery, or access to existing conversation history.

## Edge Cases

- Code generation produces syntactically invalid code: display with error highlighting and offer auto-fix regeneration.
- Pair programming session has more than 20 steps: paginate step list, warn user about context window approaching capacity.
- Multi-file context exceeds tier limit: reject additional uploads with clear size/count error and upgrade prompt.
- Syntax highlighting fails for uncommon languages: fall back to plain monospace rendering with language label.
- Pair programming session sync conflict (multiple devices): last-write-wins with conflict indicator on reconnect.
- Technical search returns zero relevant results: display "no results" state with suggestions to rephrase the query.
- User pastes extremely large code file (>1MB): reject with size error before upload begins.
- Streaming response interrupted mid-code-block: preserve partial code block with visual indicator that generation was interrupted.
- Code preview (webview) attempts to navigate away or execute network requests: block silently, log attempt.
- Quota exhausted mid-stream: complete current response but block next message with reset countdown.
- Model becomes unavailable during conversation: offer fallback model with capability warning.
- User deletes conversation while pair session is active: cancel in-flight generation, purge all session data.

## Test Plan

- Unit tests: message state machine, code block parsing and language detection, syntax highlighter token mapping, quota counter logic, context file validation (size/type), SSE event parsing, idempotency key generation.
- Contract tests: all API endpoints with success, validation error, auth error, quota exceeded, and server error responses.
- Integration tests: full flow from search query through synthesized answer; code chat multi-turn with code block iteration; pair programming step accept/reject cycle; context file upload through context-aware response.
- Streaming tests: SSE reconnection, partial code block rendering, interleaved source references, pair step events mid-stream.
- Offline tests: draft preservation, queue behavior, reconnect reconciliation, duplicate prevention.
- Code preview tests: sandboxed webview isolation (no network, no device API access), rendering accuracy for HTML/CSS/JS.
- Safety tests: blocked content categories (malware, exploits, credential extraction), disclaimer presence on all generated code, report submission flow.
- Quota tests: increment on search/message, block on exhaustion, reset on timer, premium tier bypass, cross-device sync.
- Accessibility tests: code block screen-reader announcements with language labels, editor keyboard navigation, streaming progress indicators, focus management.
- Performance tests: syntax highlighting render rate for large code blocks, conversation scroll with many code blocks, context file upload progress accuracy.
- Manual verification tests: native app permission prompts, store purchase/restore, push notification delivery, pair programming latency on device.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Technical search returns synthesized answers with inline code blocks and source attributions.
- Code chat supports multi-turn conversational code generation with syntax highlighting and copy/edit.
- Pair programming mode breaks tasks into reviewable steps with accept/reject workflow.
- Code editor provides syntax highlighting, line numbers, basic editing, and diff view.
- Multi-file context upload injects project awareness into model responses.
- Free tier quota is enforced with visible counters and graceful exhaustion UX.
- Streaming handles all event types (content, code blocks, source references, pair steps) without UI corruption.
- Offline mode preserves drafts and blocks unsafe operations.
- Safety filters and code disclaimers are present and tested.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- Does the Phind mobile app exist as a standalone native app or is it a responsive web wrapper?
- What are the exact daily/monthly search and message limits for the free tier on mobile?
- Which languages and frameworks does the syntax highlighter support on mobile?
- What is the maximum context window size (in tokens or files) for each subscription tier?
- Does pair programming mode support real-time collaboration between multiple users or is it single-user only?
- What specific model(s) power the search and code generation on mobile vs. web?
- Are there region-specific access restrictions or feature availability differences?
- What is the exact SSE event schema for code block streaming vs. text content streaming?

## Build Plan

- **Phase 1 — App Shell, Auth, Search, Chat**: Auth flows (email, GitHub OAuth), technical search with synthesized results, basic code chat with streaming text and code blocks. Target: functional search and chat shell.
- **Phase 2 — Code Generation and Syntax Highlighting**: Multi-language syntax highlighting, code block copy/edit actions, language detection, inline code editing. Target: polished code output rendering.
- **Phase 3 — Pair Programming and Code Context**: Pair programming mode with step-based workflow, multi-file context upload and management, context-aware responses. Target: collaborative coding workflow.
- **Phase 4 — History and Saved Searches**: Conversation history with search and filters, pinned threads, search history with replay, code editor with diff view. Target: discoverable work history.
- **Phase 5 — Subscription and Billing**: Usage tracking, quota enforcement, premium tier billing via IAP, cross-platform entitlement sync, paywall UX. Target: sustainable free tier with upgrade path.
- **Phase 6 — Safety and Accessibility**: Safety filter hardening, code disclaimer enforcement, accessibility audit (VoiceOver/TalkBack for code blocks), push notifications, offline polish, manual native verification. Target: app-store-ready quality.

## Next Steps

- Verify whether Phind has a native mobile app on iOS/Android app stores; update Research Sources status accordingly.
- Conduct lawful hands-on verification session to capture exact search UX, code generation behavior, pair programming flow, and quota thresholds.
- Select original providers for inference (code-specialized and general models), syntax highlighting library, and billing infrastructure.
- Design original branding, UI copy, and sample developer prompts distinct from Phind's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
