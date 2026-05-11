# Forefront AI-Style Clone Spec

> Metadata
> - Inspiration app: Forefront AI
> - Category: Multi-model AI platform, personas, team workspaces
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, publicly documented features.
> - Manual verification blockers: exact per-model token quotas per subscription tier, model comparison latency characteristics, team workspace permission granularity, file upload size and format limits, persona system prompt injection safeguards, web search result ranking and citation behavior, branching/forking thread merge UX, and SSE reconnect semantics require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary routing logic, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile multi-model AI chat platform inspired by Forefront AI's public product: a conversational interface that lets users select from multiple large language models (GPT-4, Claude, Gemini, Llama, and others), create custom personas with system prompts, perform internet-connected chat with web search integration, collaborate in team workspaces with shared conversations, upload files for document analysis, branch and fork chat threads, compare model responses side by side, manage workspace membership and roles, track per-model usage, and subscribe across free, pro, and team tiers. The clone emphasizes model flexibility, persona customization, and team collaboration as primary differentiators.

The clone must use original branding, UI copy, and independently sourced or licensed model access. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile-first multi-model AI chat experience with seamless model switching mid-conversation.
- Enable custom persona creation with editable system prompts, avatar, and behavioral constraints.
- Support internet-connected chat via web search integration with inline source citations.
- Offer team workspaces with collaborative conversations, membership management, and role-based access.
- Allow file uploads (PDF, DOCX, images, CSV) for document analysis within chat threads.
- Provide chat thread branching and forking so users can explore alternative conversation paths.
- Enable side-by-side model comparison showing responses from different models to the same prompt.
- Track per-model usage with dashboard visibility into token consumption and cost allocation.
- Support subscription tiers (free limited, pro, team) with clear upgrade paths.
- Offer dark and light theme with system-preference auto-detection.

## Non-Goals

- Do not imply affiliation with Forefront AI, Inc. or any upstream model provider.
- Do not copy proprietary model routing logic, rate-limiting algorithms, persona templates, or private API schemas.
- Do not replicate exact token quotas, pricing tiers, or internal load-balancing strategies without independent verification.
- Do not present model outputs as authoritative professional, medical, legal, or financial advice.
- Do not process production user data without explicit consent and documented retention policies.
- Do not host or redistribute model weights; access models exclusively through licensed API providers.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Forefront AI Product | https://forefront.ai | Multi-model chat, personas, workspaces, file uploads, model comparison | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/app/forefront-chat/id6446901523 | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Google Play Listing | https://play.google.com/store/apps/details?id=ai.forefront.chat | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |

## Detailed Design

### Multi-Model Chat

- Users select a model from a dropdown or modal picker before or during any conversation.
- Supported model families include GPT-4, Claude, Gemini, Llama, Mistral, and other publicly available LLMs routed through licensed API providers.
- Model selection persists per conversation but can be changed mid-thread; a system message notes the switch.
- Each model displays its name, provider badge, context window size, and capability tags (e.g., code, reasoning, creative).
- Responses stream token-by-token via SSE; the active model indicator remains visible during generation.

### Custom Personas

- Users create personas by defining a display name, avatar (upload or select from library), system prompt, default model, and optional behavioral constraints (tone, verbosity, domain focus).
- Personas are applied at the conversation level; switching persona mid-thread inserts a system-level transition message.
- A persona library lists built-in starter personas (General Assistant, Code Expert, Creative Writer, Research Analyst) and user-created custom personas.
- Personas can be shared within a team workspace or kept private to the creator.
- System prompts are validated for length limits and screened for injection patterns before storage.

### Internet-Connected Chat with Web Search

- When web search is enabled (per-conversation toggle), the system performs a web search before generating a response.
- Search results are summarized and injected into the model context as grounding references.
- Inline citations appear as numbered superscript links within the model response, tappable to reveal source URL, title, and snippet.
- Users can toggle web search on or off at any point in a conversation.
- Web search results are included as a separate SSE event type for progressive rendering.

### Team Workspaces

- Workspaces are named containers for conversations, personas, and files shared among members.
- Roles: owner (full control, billing), admin (manage members, conversations, personas), member (read/write conversations), viewer (read-only).
- Workspace settings include name, description, default model, allowed models, and member invitation (email or link).
- Conversations within a workspace are visible to all members with appropriate role permissions.
- Workspace audit log tracks member joins, leaves, role changes, conversation creates, and persona modifications.

### File Uploads and Document Analysis

- Users attach files (PDF, DOCX, TXT, CSV, PNG, JPG) to a conversation via a file picker or drag-and-drop.
- Uploaded files are processed server-side: text extraction for documents, OCR for images, tabular parsing for CSV.
- Extracted content is injected into the model context window; large documents are chunked with retrieval-augmented generation (RAG).
- File analysis progress streams via SSE events; users see a processing indicator until extraction completes.
- File metadata (name, size, type, upload timestamp) is stored per conversation; file content is retained only for the conversation's lifetime unless workspace retention policy overrides.

### Chat Thread Branching and Forking

- Users can fork a conversation at any message to create an alternative branch exploring a different direction.
- The fork point is visually indicated; users navigate between branches via a branch selector or tree view.
- Each branch maintains its own message history from the fork point forward; the shared prefix is read-only.
- Branches can use different models or personas from the fork point.
- Branch metadata includes creation timestamp, creator, model, and persona at fork time.

### Model Comparison

- Side-by-side mode sends the same prompt to two or more selected models simultaneously.
- Responses render in parallel columns (or stacked cards on narrow screens) with model name headers.
- Users can rate, copy, or continue the conversation with any single model's response.
- Comparison history is stored as a special conversation type with multi-model message groups.
- Comparison is available for any user prompt; users tap a "Compare" action on the message input bar.

### Usage Tracking

- A usage dashboard displays token consumption grouped by model, time period (day, week, month), and workspace.
- Visual charts (bar or line) show usage trends; a quota indicator shows remaining allowance per tier.
- Team workspace owners see aggregate usage across all members with per-member breakdown.
- Usage records are updated in near-real-time as streaming responses complete.
- Export usage data as CSV for billing reconciliation.

### Subscription Tiers

- Free tier: limited daily messages, access to a subset of models, single workspace, no file uploads.
- Pro tier: higher daily limits, access to all models, unlimited workspaces, file uploads, model comparison, priority processing.
- Team tier: all pro features plus team workspaces, role management, shared personas, aggregate usage dashboard, admin controls.
- Billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Tier enforcement is server-side; client displays appropriate upgrade prompts when limits are reached.

### Theme

- Dark and light themes selectable in settings or auto-detected from system preference.
- Theme preference persists per device session and syncs to user profile.
- All screens, modals, and overlays respect the active theme without manual reload.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with feature highlights, signs up or logs in, lands on chat home with a default conversation.
2. **Quick Chat**: User selects a model, types a message, receives a streaming response, copies or continues the conversation.
3. **Model Switch**: User taps the model selector mid-conversation, picks a different model, sends the next message, sees a system note and response from the new model.
4. **Persona Chat**: User navigates to persona library, selects "Code Expert," starts a conversation with the persona's system prompt active, receives domain-specific responses.
5. **Custom Persona Creation**: User opens persona editor, enters a name, writes a system prompt, selects a default model, saves, and starts a conversation with the new persona.
6. **Web Search Chat**: User enables web search toggle, asks a current-events question, receives a response with inline citations, taps a citation to view the source.
7. **File Analysis**: User attaches a PDF to a conversation, waits for extraction progress, asks questions about the document, receives contextually grounded answers.
8. **Thread Fork**: User reads a response, taps fork at that message, types an alternative follow-up, explores the branch, switches back to the original branch.
9. **Model Comparison**: User types a prompt, taps compare, selects two models, views side-by-side responses, picks the preferred one to continue.
10. **Team Collaboration**: Workspace owner invites a colleague, colleague joins, both contribute to a shared conversation, owner reviews the conversation history.
11. **Usage Review**: User navigates to usage dashboard, reviews token consumption by model, checks remaining quota, exports CSV for the current month.
12. **Subscription Upgrade**: Free user hits daily limit, sees upgrade prompt, navigates to subscription screen, purchases pro tier, resumes chatting with expanded limits.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth providers, feature carousel, consent toggles |
| Chat Home | Conversation list and entry | Conversation list grouped by recency, new chat button, workspace switcher, search |
| Chat Thread | Active conversation | Message list, input bar, model indicator, web search toggle, file attach, fork action, streaming indicator |
| Model Selector | Choose active model | Model list with provider badges, context window info, capability tags, search/filter |
| Persona Editor | Create or edit persona | Name, avatar upload, system prompt textarea, default model picker, constraints, save/cancel |
| Persona Library | Browse and select personas | Grid or list of built-in and custom personas, search, filter by category, share toggle |
| Team Workspace | Workspace management | Member list with roles, conversation list, shared personas, settings, invite link, audit log |
| File Upload | Attach and process files | File picker, upload progress, extraction status, file list per conversation |
| Usage Dashboard | Token and cost tracking | Per-model bar chart, time period selector, quota indicator, workspace breakdown, CSV export |
| Settings | Account and app preferences | Theme toggle, notification prefs, default model, language, data export, delete account |
| Subscription | Plan management | Tier comparison table, current plan badge, upgrade/downgrade, billing history, restore purchases |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, avatar_url, locale, theme_preference, created_at, updated_at, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, app_version, created_at, revoked_at |
| Workspace | id, owner_id, name, description, default_model, allowed_models[], invite_code, created_at, updated_at |
| WorkspaceMember | id, workspace_id, user_id, role (owner/admin/member/viewer), invited_by, joined_at, removed_at |
| Conversation | id, workspace_id, creator_id, title, model_id, persona_id, web_search_enabled, parent_conversation_id, fork_message_id, created_at, updated_at, archived_at |
| Message | id, conversation_id, sender_type (user/assistant/system), model_id, content_parts[], token_count, created_at |
| ContentPart | id, message_id, part_type (text/citation/file_ref/code_block/image), content, metadata, order |
| ModelConfig | id, provider, model_name, display_name, context_window, capability_tags[], tier_required, enabled, created_at |
| Persona | id, creator_id, workspace_id, name, avatar_url, system_prompt, default_model_id, constraints, is_shared, is_builtin, created_at, updated_at |
| FileUpload | id, conversation_id, uploader_id, filename, mime_type, size_bytes, storage_key, extraction_status, extracted_text_ref, created_at |
| UsageRecord | id, user_id, workspace_id, model_id, conversation_id, input_tokens, output_tokens, cost_millicents, recorded_at |
| Subscription | id, user_id, tier (free/pro/team), status (active/trial/cancelled/expired), daily_message_limit, started_at, expires_at, store_receipt_ref |
| AuditEvent | id, workspace_id, user_id, event_type, target_type, target_id, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /workspaces | GET | List workspaces for authenticated user |
| /workspaces | POST | Create a new workspace |
| /workspaces/:id | GET | Workspace details |
| /workspaces/:id | PATCH | Update workspace settings |
| /workspaces/:id | DELETE | Delete workspace (owner only) |
| /workspaces/:id/members | GET | List workspace members |
| /workspaces/:id/members | POST | Invite member by email or link |
| /workspaces/:id/members/:uid | PATCH | Update member role |
| /workspaces/:id/members/:uid | DELETE | Remove member |
| /conversations | GET | List conversations (filtered by workspace) |
| /conversations | POST | Create a new conversation |
| /conversations/:id | GET | Conversation details with messages |
| /conversations/:id | PATCH | Update conversation settings (model, persona, title) |
| /conversations/:id | DELETE | Delete conversation |
| /conversations/:id/fork | POST | Fork conversation at a specified message |
| /conversations/:id/messages | GET | Paginated message history |
| /conversations/:id/messages | POST | Send a user message (SSE streaming response) |
| /conversations/:id/messages/compare | POST | Send prompt to multiple models (SSE streaming response) |
| /models | GET | List available models with capabilities and tier requirements |
| /personas | GET | List personas (personal and workspace-shared) |
| /personas | POST | Create a new persona |
| /personas/:id | GET | Persona details |
| /personas/:id | PATCH | Update persona |
| /personas/:id | DELETE | Delete persona |
| /files/upload | POST | Upload file to a conversation (multipart) |
| /files/:id | GET | File metadata and extraction status |
| /files/:id | DELETE | Delete uploaded file |
| /usage | GET | Usage records filtered by model, workspace, and time range |
| /usage/export | GET | Export usage data as CSV |
| /settings | GET | Read user preferences |
| /settings | PATCH | Update user preferences |
| /subscription | GET | Current subscription status and limits |
| /subscription/upgrade | POST | Initiate tier upgrade via store IAP |
| /subscription/restore | POST | Restore purchases from app store |
| /account/export | POST | Request full data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message send, compare, and file analysis endpoints return SSE streams with event types: `chat_start`, `chat_delta`, `chat_done`, `web_search_result`, `file_analysis_delta`, `error`, `done`.

- `chat_start`: includes model_id, message_id, and conversation metadata.
- `chat_delta`: incremental token payload with optional citation references.
- `chat_done`: final message metadata including token counts and processing time.
- `web_search_result`: search result object (url, title, snippet) injected before or during generation.
- `file_analysis_delta`: progressive extraction status and chunked content availability.
- `error`: error code and user-facing message; client must handle gracefully mid-stream.
- `done`: terminal event signaling stream completion; client closes connection.

## Realtime Push And Offline Behavior

- Chat responses stream token-by-token via SSE with automatic reconnection on network interruption.
- Model comparison streams arrive as interleaved events tagged by model_id; client demultiplexes into parallel columns.
- File analysis progress streams as extraction events; client renders a progress bar until extraction completes.
- Web search results arrive as early SSE events before the main chat_delta stream begins.
- Offline mode: conversation list and cached message history are readable; new messages are queued as drafts; send is blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys to prevent duplicate message submissions.
- Push notifications (opt-in): team workspace mentions, conversation replies in shared threads, subscription expiry reminders, file analysis completion.
- Local draft persistence: unsent messages and in-progress persona edits survive app kill/restart.
- Team workspace membership changes propagate via lightweight polling or server-sent workspace events.

## Permissions Privacy And Safety

- Camera/photo library: requested only for persona avatar upload and image file attachment.
- Notifications: requested only after first relevant event (workspace mention or file analysis completion).
- No microphone, location, contacts, or calendar access required for V1.
- User messages and file contents are processed for the requested AI task only and not used for model training without explicit opt-in.
- All data in transit is encrypted (TLS); stored data is encrypted at rest (AES-256 or equivalent).
- File uploads are scanned for malware before processing; rejected files return a clear error.
- AI responses carry a disclaimer: "AI-generated content. Verify important information independently."
- Persona system prompts are screened for prompt injection patterns, harmful content generation instructions, and impersonation of real individuals.
- Web search citations link to original sources; the app does not cache or redistribute full web page content.
- Team workspace data is isolated; members of one workspace cannot access another workspace's conversations or files.
- Data export includes all conversations, messages, personas, files metadata, usage records, and account data.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Safety filters block: generation of harmful, illegal, or deceptive content; attempts to bypass model safety guidelines via persona prompts; file uploads containing illegal material.
- Manual verification required: exact file size limits, model-specific content policies, team data isolation enforcement, and persona prompt screening effectiveness.

## Analytics And Monetization

- Events tracked: session_start, message_sent, model_selected, model_switched, persona_selected, persona_created, web_search_toggled, file_uploaded, file_analysis_completed, conversation_forked, comparison_started, comparison_model_chosen, workspace_created, member_invited, member_role_changed, usage_dashboard_viewed, usage_exported, subscription_viewed, subscription_upgraded, theme_changed, settings_updated.
- Event properties: model_id, workspace_id (hashed), persona_type (builtin/custom), message_count_bucket, token_count_bucket, file_type, tier, error_code. Never raw message content, file contents, system prompts, personal data, or workspace names.
- Monetization model: free tier with limited daily messages and model subset; pro tier with expanded limits, all models, file uploads, and model comparison; team tier with all pro features plus workspaces, role management, shared personas, and aggregate usage.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate data export/delete, account recovery, access to existing conversation history, or account settings.

## Edge Cases

- Extremely long conversation threads (500+ messages): paginate message history; warn when approaching model context window limits; offer summarization of earlier messages.
- Model API unavailability: display model-specific error with fallback suggestion to switch models; queue retry with exponential backoff; do not silently switch models.
- File upload exceeds size limit: reject with clear error message showing allowed limits per tier; do not partially process.
- File extraction fails (corrupted PDF, unsupported format): mark file as extraction_failed; allow user to remove and re-upload; do not inject partial content into model context.
- Persona system prompt exceeds token limit: reject on save with character/token count guidance; do not silently truncate.
- Web search returns zero results: proceed with model-only response; append a note that no web results were found.
- Web search returns results but model hallucinates citations: citation verification layer flags unreferenced citation numbers; show warning to user.
- Fork at first message creates a near-empty branch: allow but display branch context clearly; prevent forking at system messages.
- Model comparison with one model slow and another fast: render available responses immediately; show loading indicator for pending model; do not block the fast response.
- Team workspace owner leaves: require ownership transfer before departure; block orphan workspaces.
- Concurrent edits to same persona in a team workspace: last-write-wins with conflict notification and version history.
- Subscription downgrade while team workspace has more members than free tier allows: grandfather existing members with read-only access; block new invitations until upgraded.
- SSE stream interrupted mid-response: reconnect with last received event ID; resume from the last delta; do not duplicate content.
- Daily message limit reached mid-stream: complete the current response but block subsequent messages with upgrade prompt and reset countdown.
- User attempts to upload file in free tier: show upgrade prompt with clear tier comparison.

## Test Plan

- Unit tests: model selector filtering and sorting, persona validation (system prompt length, injection screening), conversation fork tree construction, usage record aggregation, subscription tier enforcement logic, theme preference persistence, branch navigation state.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, quota exceeded, permission denied, and server error responses.
- Integration tests: full chat flow from model selection through streaming response; web search with citation rendering; file upload through extraction to contextual Q&A; conversation fork and branch switching; model comparison with parallel rendering; workspace creation, member invite, and role enforcement; persona creation and application to conversation.
- Streaming tests: SSE reconnection mid-response, event ordering (chat_start before chat_delta before chat_done), cancellation on new message, web_search_result before chat_delta, file_analysis_delta progress, error event handling mid-stream, comparison interleaved events demultiplexing.
- Offline tests: draft message persistence, queue behavior, reconnect reconciliation, duplicate prevention via idempotency keys, conversation list cache readability.
- Quota tests: daily message limit enforcement, per-model token tracking accuracy, tier-based feature gating, quota exhaustion mid-stream handling, reset timing.
- Team tests: workspace isolation (cross-workspace data inaccessible), role-based permission enforcement (viewer cannot send messages, member cannot manage roles), ownership transfer, member removal cascading.
- Accessibility tests: model selector screen-reader labels, streaming response live-region announcements, file upload progress descriptions, comparison column navigation, branch tree traversal, theme contrast ratios.
- Performance tests: streaming latency across models, comparison parallel rendering, large conversation pagination, file extraction time across formats and sizes, usage dashboard chart rendering with large datasets.
- Manual verification tests: exact per-model token quotas per tier, file size and format limits, persona prompt screening effectiveness, web search result quality, team workspace permission edge cases.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can select from at least five model families and switch models mid-conversation with visible system notes.
- Custom personas with system prompts, avatars, and default models can be created, edited, and applied to conversations.
- Web search integration provides inline numbered citations tappable to reveal source details.
- File uploads are processed with visible extraction progress and contextual answers reference uploaded content.
- Conversation forking creates navigable branches with independent message histories from the fork point.
- Model comparison renders parallel responses from at least two models for the same prompt.
- Team workspaces enforce role-based access: owner, admin, member, viewer with appropriate permissions.
- Usage dashboard displays per-model token consumption with time-period filtering and CSV export.
- Subscription tiers enforce feature and quota limits server-side with clear client-side upgrade prompts.
- Dark and light themes apply consistently across all screens with system-preference auto-detection.
- Streaming handles all SSE event types without UI corruption, dropped events, or duplicate content on reconnect.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 11 screens are inventoried with purpose and key elements.

## Open Questions

- What are the exact daily message limits and per-model token quotas for each subscription tier?
- Which specific model versions and providers does Forefront route through, and how frequently are new models added?
- How does Forefront handle model context window overflow in long conversations — truncation, summarization, or sliding window?
- What file formats and size limits are supported per tier, and how is RAG chunking configured?
- How does the web search integration select and rank sources, and what search provider is used?
- What are the exact workspace member limits per tier?
- How does Forefront handle persona prompt screening — keyword blocklist, classifier, or manual review?
- What is the branch/fork limit per conversation, and how deep can fork trees nest?
- How does model comparison handle streaming when one model is significantly slower than another — timeout, partial display, or wait-for-all?
- What audit log retention period applies to team workspaces?

## Build Plan

- **Phase 1 — App Shell + Auth + Single-Model Chat**: Auth flows (email and OAuth), chat home with conversation list, basic chat thread with a single default model, SSE streaming, message persistence, dark/light theme. Target: functional single-model chat app.
- **Phase 2 — Multi-Model + Model Selector + Personas**: Model selector with provider badges and capability tags, mid-conversation model switching, persona editor and library with built-in starters, persona application to conversations. Target: multi-model chat with persona customization.
- **Phase 3 — Web Search + File Uploads**: Web search toggle with citation rendering and source preview, file upload with extraction progress and contextual Q&A, RAG chunking for large documents. Target: grounded and document-aware chat.
- **Phase 4 — Branching + Model Comparison**: Conversation forking with branch tree navigation, branch selector UI, model comparison with parallel streaming and side-by-side rendering, comparison history. Target: advanced conversation exploration.
- **Phase 5 — Team Workspaces + Usage Dashboard**: Workspace creation and management, member invitation and role enforcement, shared conversations and personas, usage tracking dashboard with charts and CSV export, audit log. Target: team collaboration and usage visibility.
- **Phase 6 — Subscription + Safety + Polish**: Subscription tier enforcement with IAP integration, quota management with upgrade prompts, safety filter hardening, persona prompt screening, accessibility audit, offline mode polish, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with a Forefront AI account to capture exact model availability, quota thresholds, file limits, and workspace permission behavior.
- Select licensed API providers for each model family (OpenAI, Anthropic, Google, Meta) with appropriate terms of service.
- Design original branding, UI copy, persona names, and visual assets distinct from Forefront AI's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
