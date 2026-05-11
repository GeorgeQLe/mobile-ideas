# Notion AI-Style Clone Spec

> Metadata
> - Inspiration app: Notion AI
> - Category: AI workspace assistant, document AI, productivity
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, publicly documented features, help center articles.
> - Manual verification blockers: exact AI model routing per command type, block-level AI insertion UX details, database autofill confidence thresholds, AI chat retrieval-augmented generation behavior against workspace content, SSE streaming token throughput, subscription tier quota enforcement, workspace permission inheritance for AI features, and real-time collaboration conflict resolution with AI edits require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI workspace assistant inspired by Notion AI's public product: a workspace-aware AI layer that understands document context and provides document Q&A, writing assistance (draft, improve, summarize, translate, fix grammar, change tone), database/table property autofill, action item extraction from meeting notes, page and database summarization, AI-powered semantic search across the workspace, and block-level inline AI commands within documents. The workspace organizes content as pages, databases, and collections with a hierarchical navigation model. The clone includes a subscription model with a free workspace tier and an AI add-on, plus dark and light theme support.

The clone must use original branding, UI copy, and independently trained or licensed AI models. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile workspace with hierarchical pages, databases, and collections supporting rich block-based editing.
- Enable workspace-aware AI chat that answers questions grounded in the user's own documents and databases.
- Offer a writing assistant with draft, improve, summarize, translate, fix grammar, and change tone commands.
- Support AI autofill of database and table properties based on row content and column context.
- Extract structured action items from meeting notes and long-form pages via AI.
- Summarize individual pages and entire databases into concise overviews.
- Provide AI-powered semantic search that ranks results by relevance across all workspace content.
- Enable block-level inline AI commands so users can invoke AI assistance without leaving the editor.
- Support dark and light themes with system-preference detection.

## Non-Goals

- Do not imply affiliation with Notion Labs, Inc. or any upstream AI provider.
- Do not copy proprietary embedding pipelines, retrieval-augmented generation architectures, workspace indexing logic, or private API schemas.
- Do not replicate exact AI quota limits, internal model selection heuristics, or workspace permission hierarchies without independent verification.
- Do not present AI-generated summaries, action items, or Q&A answers as authoritative or factual without disclaimers.
- Do not process production user data without explicit consent and documented retention policies.
- Do not reproduce Notion's proprietary block schema, database formula engine, or relation/rollup internals.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Notion Product | https://www.notion.so | Workspace features, AI capabilities, pricing tiers, product overview | Verified 2026-05-11 |
| Notion AI Help Center | https://www.notion.so/help/guides/using-notion-ai | AI feature documentation, command descriptions, usage guidance | Verified 2026-05-11 |
| Google Play Listing | https://play.google.com/store/apps/details?id=notion.id | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/app/notion-notes-docs-tasks/id1232780281 | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |

## Detailed Design

### Workspace Structure

- A workspace contains pages, databases, and collections organized in a tree hierarchy.
- Pages are composed of ordered blocks: paragraph, heading (H1-H3), bulleted list, numbered list, toggle, callout, quote, divider, code, image placeholder, table, and database inline view.
- Databases are structured collections of rows with typed properties: text, number, select, multi-select, date, person, checkbox, URL, email, phone, formula (display-only), relation (display-only), and rollup (display-only).
- Collections group pages or databases under a parent page for organizational hierarchy.
- Navigation follows a sidebar tree with breadcrumb trail; pages and databases are searchable and favoritable.

### AI Chat Panel

- A slide-over panel accessible from any page or from workspace home via a floating AI button.
- Chat is workspace-aware: the AI retrieves relevant content from the user's pages and databases to ground its answers.
- Users type natural language questions; the system performs retrieval-augmented generation against indexed workspace content.
- Responses cite source pages with tappable links that navigate to the referenced document and highlight the relevant section.
- Conversation history persists per workspace; users can start new threads or continue existing ones.
- Supports follow-up questions with conversation context retained across turns.

### Document Q&A

- Within a specific page, users invoke "Ask about this page" to scope AI retrieval to the current document.
- The AI answers questions using only the content of the active page and its sub-pages.
- Useful for long documents, meeting notes, project briefs, and knowledge base articles.
- Responses include inline citations pointing to specific blocks within the page.

### Writing Assistant

- Accessible via block-level slash command (`/ai`) or selection toolbar on highlighted text.
- Commands: Draft (generate new content from a prompt), Improve (enhance clarity and quality), Summarize (condense selected text), Translate (convert to a target language), Fix Grammar (correct errors), Change Tone (formal, casual, professional, friendly, direct).
- Draft command accepts a freeform prompt and generates content inserted as new blocks below the cursor.
- Improve, Summarize, Fix Grammar, and Change Tone operate on selected text and replace the selection with the AI output.
- Translate presents a language picker and replaces or appends the translated text.
- All writing commands stream output token-by-token for responsive feedback.

### Database Autofill

- For database views, users can invoke AI autofill on a column to populate empty cells based on row content and column context.
- The AI infers appropriate values by analyzing existing filled rows, column name, column type, and row content.
- Autofill operates on a per-column basis with a confirmation step before writing values.
- Supports text, select, multi-select, and number property types for autofill.
- Users can accept, edit, or reject each autofilled value individually or in bulk.

### Action Item Extraction

- Users invoke "Extract action items" on a page (typically meeting notes).
- The AI identifies tasks, owners (if mentioned), due dates (if mentioned), and priority indicators from the page content.
- Results display as a structured checklist that users can convert into a new database, append to an existing task database, or copy as text.
- Each extracted item links back to the source paragraph in the original page.

### Page and Database Summarization

- "Summarize this page" generates a concise overview of a single page's content.
- "Summarize this database" generates an aggregate overview of a database's rows, identifying patterns, key metrics, and notable entries.
- Summaries can be inserted as a block at the top of the page, copied to clipboard, or shared via the AI chat panel.
- Summary length adapts to content size: short pages get brief summaries, long pages get structured multi-paragraph summaries.

### AI-Powered Search

- The workspace search bar accepts natural language queries in addition to keyword search.
- AI search ranks results by semantic relevance, not just keyword match, using workspace-wide embeddings.
- Results display page titles, matched excerpts with highlighted relevant passages, and relevance indicators.
- Search covers pages, database rows, and block-level content.
- Recent and frequent searches are cached for quick re-access.

### Block-Level AI Commands

- Within the page editor, typing `/ai` opens an AI command palette with available actions.
- Users can also select text and tap the AI button in the selection toolbar.
- Commands execute inline: output streams directly into the document at the cursor position or replaces the selection.
- Undo support: AI-generated blocks can be reverted with a single undo action that removes all generated blocks.

### Theme Support

- Dark and light themes with automatic system-preference detection.
- Manual override available in settings.
- Theme applies consistently across workspace, editor, AI panel, and all modal surfaces.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with workspace overview, signs up or logs in, creates or joins a workspace, lands on workspace home.
2. **Create and Edit a Page**: User creates a new page, adds blocks (text, headings, lists), types content, and saves.
3. **AI Chat Q&A**: User opens AI chat panel, asks "What were the key decisions from last week's meeting?", receives an answer with citations to the meeting notes page, taps a citation to navigate there.
4. **Writing Assistance**: User selects a paragraph, taps AI in the selection toolbar, chooses "Improve", watches the text stream in as a replacement, accepts the result.
5. **Draft Generation**: User places cursor at end of a page, types `/ai`, selects "Draft", enters "Write an introduction for our Q3 product roadmap", watches content stream into the document.
6. **Database Autofill**: User opens a project database, notices empty "Status Summary" column, invokes AI autofill, reviews suggested values for each row, accepts all.
7. **Action Item Extraction**: User opens meeting notes, taps "Extract action items", reviews the generated checklist with owners and dates, converts items to a task database.
8. **Page Summary**: User opens a long design document, taps "Summarize this page", reads the concise overview, inserts it as a block at the top of the page.
9. **Semantic Search**: User types "budget projections for Q3" in search, receives ranked results from finance pages and database rows, taps the most relevant result.
10. **Translate Content**: User selects a paragraph, invokes AI translate, picks Spanish, reviews the streamed translation, accepts it as an appended block.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth, workspace overview carousel, consent |
| Workspace Home | Navigation hub | Sidebar with page tree, favorites, recent pages, quick actions, floating AI button, search bar |
| Page Editor | Content creation and editing | Block-based editor, slash command palette, selection toolbar with AI button, breadcrumb, share button |
| AI Chat Panel | Workspace-aware AI conversation | Chat input, message history, source citations with page links, new thread button, conversation list |
| Document Q&A | Page-scoped AI questions | Chat input scoped to current page, block-level citations, context indicator |
| Writing Assistant | AI writing commands | Command picker (draft, improve, summarize, translate, fix grammar, change tone), streaming output preview, accept/reject buttons |
| Action Items | Extracted tasks from notes | Checklist with owner, date, priority; bulk accept, convert to database, copy actions |
| Database Autofill | AI-populated table properties | Column selector, row-by-row value preview, accept/edit/reject per cell, bulk confirm |
| Search | AI-powered workspace search | Search input, semantic results with excerpts, filters (page type, date, creator), recent searches |
| Settings | Account and app preferences | Theme toggle (dark/light/system), workspace management, notification preferences, data export, account deletion |
| Subscription | AI add-on management | Free vs. AI tier comparison, current plan, upgrade/downgrade, billing history, restore purchases |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, avatar_url, locale, created_at, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, created_at, revoked_at |
| Workspace | id, name, owner_id, icon, member_ids[], ai_enabled, plan_tier, created_at, updated_at |
| Page | id, workspace_id, parent_id (nullable), title, icon, cover_url, is_favorited, is_archived, created_by, created_at, updated_at |
| Block | id, page_id, parent_block_id (nullable), type (paragraph/heading1/heading2/heading3/bulleted_list/numbered_list/toggle/callout/quote/divider/code/image/table/database_view), content, position, properties{}, created_at, updated_at |
| Database | id, workspace_id, parent_page_id, title, icon, property_schema[], view_configs[], created_by, created_at, updated_at |
| DatabaseRow | id, database_id, properties{}, created_by, created_at, updated_at |
| AIChat | id, workspace_id, user_id, title, page_scope_id (nullable), created_at, updated_at |
| AIMessage | id, chat_id, role (user/assistant), content, citations[], model_version, token_count, created_at |
| ActionItem | id, source_page_id, user_id, text, assignee_name, due_date, priority, is_completed, source_block_id, created_at |
| WritingTask | id, user_id, page_id, command (draft/improve/summarize/translate/fix_grammar/change_tone), input_text, output_text, target_language, target_tone, status, created_at |
| SearchResult | id, query, user_id, workspace_id, result_page_id, result_block_id, excerpt, relevance_score, created_at |
| Subscription | id, user_id, workspace_id, tier (free/ai_addon), status (active/cancelled/expired/trial), started_at, expires_at, store_receipt_ref |
| AuditEvent | id, user_id, workspace_id, event_type, resource_type, resource_id, metadata{}, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /workspaces | GET | List user workspaces |
| /workspaces | POST | Create a new workspace |
| /workspaces/:id | GET | Workspace details with member list |
| /workspaces/:id/members | POST | Invite member to workspace |
| /pages | GET | List pages in workspace (with parent filter) |
| /pages | POST | Create a new page |
| /pages/:id | GET | Page details with blocks |
| /pages/:id | PATCH | Update page metadata (title, icon, archive) |
| /pages/:id | DELETE | Move page to trash |
| /blocks | POST | Create a new block in a page |
| /blocks/:id | PATCH | Update block content or position |
| /blocks/:id | DELETE | Delete a block |
| /databases | GET | List databases in workspace |
| /databases | POST | Create a new database |
| /databases/:id | GET | Database schema and rows |
| /databases/:id/rows | POST | Create a new row |
| /databases/:id/rows/:rowId | PATCH | Update row properties |
| /ai/chat | POST | Send message to AI chat (SSE streaming response) |
| /ai/chat/:chatId/messages | GET | List messages in a chat thread |
| /ai/write | POST | Execute writing command on text (SSE streaming response) |
| /ai/autofill | POST | AI autofill database column (SSE streaming response) |
| /ai/summarize | POST | Summarize a page or database (SSE streaming response) |
| /ai/action-items | POST | Extract action items from a page (SSE streaming response) |
| /search | POST | Semantic and keyword search across workspace |
| /settings | GET | Read user and workspace settings |
| /settings | PATCH | Update user and workspace settings |
| /subscriptions | GET | Current subscription and usage status |
| /subscriptions/upgrade | POST | Initiate AI add-on upgrade via store IAP |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: AI chat, write, autofill, summarize, and action-items endpoints return SSE streams with event types: `ai_start`, `ai_delta`, `ai_done`, `autofill_result`, `action_item_delta`, `search_result`, `error`, `done`.

## Realtime Push And Offline Behavior

- AI responses (chat, write, summarize, action items) stream token-by-token via SSE with automatic reconnection on dropped connections.
- Database autofill results arrive as per-cell events during the SSE stream, enabling progressive review.
- Offline mode: workspace pages and databases are cached locally for reading; new edits are queued as local drafts; AI features are unavailable offline with a clear indicator.
- Page edits made offline sync to server on reconnection using operational transform or last-write-wins with conflict notification.
- AI chat history is cached locally; new messages are blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys on all POST endpoints to prevent duplicate submissions.
- Push notifications (opt-in): workspace invitation, page shared with you, action item assigned, subscription expiry reminder.
- Local draft persistence: unsaved page edits, pending AI commands, and queued block insertions survive app kill and restart.
- Search results are not cached offline; the search screen shows an offline indicator and suggests browsing recent pages instead.

## Permissions Privacy And Safety

- Camera/photo library: not required for V1 (image blocks use URL references only).
- Notifications: requested only after first relevant event (workspace invitation or shared page).
- No microphone, location, contacts, or calendar access required for V1.
- Workspace permissions: owner, admin, member, guest roles controlling page visibility and edit access; AI features respect the invoking user's read permissions (AI cannot surface content the user lacks access to).
- User content sent to AI endpoints is processed for the requested task only and not used for model training without explicit workspace-admin opt-in.
- All content in transit is encrypted (TLS); stored content is encrypted at rest (AES-256 or equivalent).
- AI-generated outputs carry a disclaimer: "AI-generated content. Review for accuracy before use."
- Action items and summaries carry a disclaimer: "Extracted by AI. Verify against the original document."
- Safety filters block: generation of harmful, illegal, or policy-violating content; attempts to extract other users' private workspace content via prompt injection.
- Data export includes all pages, databases, AI chat history, action items, and account data in a portable format.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Manual verification required: exact workspace permission inheritance model for AI features, content indexing consent flow, and data residency requirements.

## Analytics And Monetization

- Events tracked: session_start, page_created, page_edited, block_added, block_edited, ai_chat_opened, ai_chat_message_sent, ai_write_invoked, ai_write_command_selected, ai_autofill_invoked, ai_autofill_accepted, ai_summarize_invoked, ai_action_items_invoked, action_item_converted, search_executed, search_result_tapped, theme_changed, subscription_viewed, subscription_upgraded.
- Event properties: workspace_id (hashed), command type, coarse latency bucket, input length bucket, result accepted/rejected, error code. Never raw text content, page titles, personal data, or document contents.
- Monetization model: free workspace tier with full page/database functionality; AI add-on subscription unlocking AI chat, writing assistant, autofill, summarization, action item extraction, and semantic search.
- AI add-on billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate: basic page and database CRUD, workspace navigation, keyword search, data export/delete, account recovery, or access to existing content.
- Free tier may include a limited number of AI requests per month to demonstrate value before upgrade.

## Edge Cases

- Extremely long pages (500+ blocks): AI summarization and Q&A chunk the page into segments with a progress indicator; warn user of increased processing time.
- Empty page or database: AI commands return a friendly message ("This page has no content to summarize") instead of an error.
- Database with no filled rows for autofill context: autofill returns a message explaining insufficient context and suggests filling a few example rows first.
- AI chat question about content the user cannot access: return "I can only answer based on content you have access to" without revealing the existence of restricted content.
- Writing assistant on very short text (fewer than 5 words): improve and change tone commands warn that results may be limited; summarize declines with an explanatory message.
- Translate to unsupported language: show unsupported language message with list of available languages.
- Action item extraction on a page with no actionable content: return "No action items found" with suggestions for what constitutes extractable items.
- Concurrent AI requests from same user: queue or reject with "Please wait for the current AI request to complete."
- SSE stream interrupted mid-response: client reconnects and resumes from last received token using a stream offset; if resume fails, show partial result with a retry button.
- Subscription expired mid-session: complete the current AI request but block subsequent AI requests with an upgrade prompt.
- Workspace with thousands of pages: search indexing is progressive; newly created pages may take a short delay to appear in semantic search results.
- Block-level AI insert in a read-only page: AI button is hidden or disabled with a tooltip explaining insufficient permissions.
- Paste from clipboard into AI chat: accept plain text only, strip rich formatting, notify user if content was reformatted.
- AI generates content exceeding reasonable block size: split into multiple blocks automatically with a notification.

## Test Plan

- Unit tests: block CRUD operations, page tree navigation, database property type validation, AI command routing, action item parsing, search result ranking, theme toggle persistence, subscription state machine.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, quota exceeded, permission denied, and server error responses.
- Integration tests: full AI chat flow from question through streaming response with citations; writing assistant improve command on selected text with streaming replacement; database autofill with per-cell confirmation; action item extraction and conversion to database; page summarization inserted as block; semantic search with result navigation.
- Streaming tests: SSE reconnection on network drop, event ordering (ai_start before ai_delta before ai_done), cancellation on user interrupt, error event handling mid-stream, partial result display on timeout.
- Offline tests: page and database cache availability, edit queueing, reconnect sync with conflict resolution, AI feature unavailability indicator, draft persistence across app kill.
- Permission tests: AI respects user read access boundaries, guest users cannot invoke workspace-wide AI, admin can enable/disable AI for workspace, block-level AI hidden on read-only pages.
- Subscription tests: free tier AI quota enforcement, upgrade flow through IAP, downgrade preserves existing content, expired subscription blocks new AI requests, restore purchases.
- Accessibility tests: screen-reader labels for all AI buttons, chat panel announcements, streaming text progressive reading, block editor navigation, theme contrast ratios meet WCAG AA.
- Performance tests: AI chat response latency, writing assistant streaming throughput, search result ranking speed across large workspaces, page editor scroll performance with 500+ blocks, database rendering with 1000+ rows.
- Manual verification tests: exact block-level AI insertion UX, database autofill confidence behavior, workspace permission inheritance for AI features, SSE token throughput under load.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can create, edit, and navigate a workspace with hierarchical pages and databases.
- AI chat answers questions grounded in workspace content with tappable source citations.
- Writing assistant supports draft, improve, summarize, translate, fix grammar, and change tone commands with streaming output.
- Database autofill populates empty cells with AI-inferred values and per-cell accept/reject.
- Action item extraction generates structured checklists from meeting notes with assignees and dates.
- Page and database summarization produces concise overviews insertable as blocks.
- AI-powered search returns semantically ranked results across all workspace content.
- Block-level AI commands work inline within the page editor via slash command and selection toolbar.
- Dark and light themes apply consistently across all screens with system-preference detection.
- Streaming handles all SSE event types (ai_start, ai_delta, ai_done, autofill_result, action_item_delta, search_result, error, done) without UI corruption.
- Subscription model gates AI features while keeping workspace CRUD free.
- Manual verification blockers are documented and feature-flagged.
- At least 14 entities in the data model are specified with key fields.
- At least 11 screens are inventoried with purpose and key elements.

## Open Questions

- What is the exact retrieval-augmented generation architecture Notion AI uses for workspace Q&A (embedding model, chunk size, retrieval top-k)?
- How does Notion AI handle workspace content indexing consent and data residency per region?
- What are the exact monthly AI request quotas for the free trial and paid AI add-on?
- How does block-level AI insertion interact with real-time collaboration (conflict resolution when multiple users edit simultaneously)?
- Which languages does Notion AI support for translation and does it auto-detect source language?
- How does database autofill handle ambiguous column types or conflicting existing values?
- What is the exact permission model for AI features across workspace roles (owner, admin, member, guest)?
- Does Notion AI use different models for different command types (chat vs. writing vs. autofill)?
- How does Notion AI handle workspace-wide search indexing latency for newly created or edited pages?

## Build Plan

- **Phase 1 — App Shell + Auth + Workspace Core**: Auth flows (email and OAuth), workspace creation and listing, page CRUD with basic block types (paragraph, headings, lists), sidebar navigation with page tree, breadcrumb, theme toggle. Target: functional workspace with page editing.
- **Phase 2 — Database + Block Editor Polish**: Database creation with typed properties, database row CRUD, inline database views in pages, additional block types (toggle, callout, quote, divider, code, table), block reordering, slash command palette. Target: full content model.
- **Phase 3 — AI Chat + Document Q&A**: AI chat panel with SSE streaming, workspace-aware retrieval-augmented generation, source citations with page links, page-scoped Q&A mode, conversation persistence, new thread management. Target: core AI conversation.
- **Phase 4 — Writing Assistant + Block-Level AI**: Writing commands (draft, improve, summarize, translate, fix grammar, change tone) via slash command and selection toolbar, streaming inline output, undo support for AI-generated blocks. Target: inline AI editing.
- **Phase 5 — Autofill + Action Items + Summarization**: Database column autofill with per-cell review, action item extraction with checklist generation, page and database summarization with block insertion, search with semantic ranking. Target: advanced AI features.
- **Phase 6 — Subscription + Offline + Safety + Polish**: AI add-on subscription management with IAP, free tier quota enforcement, offline caching and sync, permission enforcement for AI, safety filter hardening, accessibility audit, performance optimization. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with a Notion AI account to capture exact AI command behavior, streaming UX, autofill confidence thresholds, and workspace permission model.
- Select or license independent AI models for chat, writing, autofill, and summarization distinct from Notion's proprietary models.
- Design original branding, UI copy, and feature names distinct from Notion's copyrighted materials.
- Define workspace content embedding and indexing strategy for retrieval-augmented generation.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
