# HuggingChat-Style Clone Spec

> Metadata
> - Inspiration app: HuggingChat (by Hugging Face)
> - Category: open-source AI chat, multi-model selection, community-driven, web search integration
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-10.
> - Verification basis: exact public product pages, first-party blog posts, open-source repositories, privacy/terms pages.
> - Manual verification blockers: native mobile behavior (if applicable), Hugging Face OAuth flows, model loading latencies per model, web search result rendering, community model trust scores, push notification payloads, and quota enforcement thresholds require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no proprietary model weights, Hugging Face trademarks, logos, copyrighted UI copy, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI chat assistant inspired by HuggingChat's public product: a conversational interface offering multiple open-source language models (Llama, Mistral, Gemma, Command R, and others), per-conversation model switching, integrated web search for grounded answers, transparent model metadata (parameters, license, capabilities), and community model browsing. The clone emphasizes open-source transparency, model choice, and community participation as primary differentiators.

The clone must use original branding, UI copy, and licensed model providers. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile-first open-source AI chat experience with multiple selectable language models.
- Enable per-conversation model switching with clear capability, license, and parameter-count labels.
- Integrate web search for citation-backed, grounded responses.
- Surface transparent model information: architecture, parameter count, license, context length, and known limitations.
- Support community model browsing and discovery within the Hugging Face ecosystem.
- Offer conversation history management with search, rename, and delete.
- Maintain an open and transparent ethos: display model provenance and licensing on every interaction.

## Non-Goals

- Do not imply affiliation with Hugging Face, Inc. or any model provider.
- Do not copy proprietary model weights, system prompts, fine-tuning data, or private API schemas.
- Do not replicate exact rate limits, quotas, or internal model routing logic without independent verification.
- Do not present AI-generated content as professional, medical, legal, or financial advice.
- Do not host or redistribute model weights without verifying their open-source license permits it.
- Do not process production user data without explicit consent and documented retention policies.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| HuggingChat Product | https://huggingface.co/chat | Chat interface, model list, web search, feature set | Verified 2026-05-10 |
| Hugging Face Blog | https://huggingface.co/blog | Product announcements, model updates, feature launches | Verified 2026-05-10 |
| HuggingChat GitHub | https://github.com/huggingface/chat-ui | Open-source chat UI codebase, architecture, data model | Verified 2026-05-10 |
| Hugging Face Hub | https://huggingface.co/models | Model cards, licenses, parameter counts, community models | Verified 2026-05-10 |

## Detailed Design

### Multi-Model Selection

- Users choose from a curated set of open-source models before or during a conversation.
- Model picker displays: model name, provider, parameter count, license type, context window size, and a brief capability summary.
- Model selection persists per conversation but can be changed mid-thread; changing mid-thread starts new model responses from the next message.
- Unavailable or loading models show status indicators with estimated readiness.

### Web Search Integration

- Users toggle web search on/off per conversation or per message via a composer control.
- When enabled, the model invokes a search query mid-generation and injects results as context.
- Search results render as inline citation chips with source URL, title, and snippet.
- Users can expand citation chips to preview source content in a bottom sheet.
- If search returns zero or blocked results, the model continues without citations and displays a "no web results" indicator.

### Transparent Model Info

- Each model has a detail sheet accessible from the model selector or the chat header badge.
- Detail sheet shows: architecture diagram label, training data summary (public description only), license full text link, known limitations, benchmark highlights (if publicly available), and community rating.
- License badge is visible on every assistant message header so users always know the model's terms.

### Community Models

- A browsable directory of community-contributed models sourced from the Hugging Face Hub.
- Each entry shows: model card summary, downloads, likes, license, parameter count, and compatibility status.
- Users can add a community model to their personal model list for use in conversations.
- Community models carry a trust indicator: verified (by Hugging Face), popular (high downloads/likes), or unverified.
- Unverified models display a safety disclaimer before first use.

### Streaming Responses

- Assistant responses stream token-by-token via SSE.
- Web search citations arrive as discrete SSE events interleaved with content deltas.
- Streaming handles model switching gracefully: if a user switches models mid-generation, the current stream is cancelled and a new generation begins.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen explaining open-source AI chat, signs up or logs in, lands on chat home.
2. **Quick Chat**: User taps new chat, types a prompt, receives streaming response from the default model, copies or shares the answer.
3. **Model Selection**: User opens model picker, browses available models with parameter/license info, selects a different model, sends a prompt and sees the new model's response.
4. **Web-Grounded Chat**: User enables web search, asks a current-events question, receives answer with inline citations, expands a citation to preview the source.
5. **Model Deep-Dive**: User taps the model badge on a message, opens the model info sheet, reads architecture, license, and limitations.
6. **Community Browse**: User navigates to community models, filters by category, adds a new model to their list, starts a conversation with it.
7. **History Management**: User searches conversation history, renames a thread, deletes old conversations, returns to a pinned conversation.
8. **Offline/Error**: User loses connectivity mid-stream, sees partial response preserved, reconnects and retries.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth (Hugging Face-style), consent |
| Chat Home | Thread list and new chat | Recent conversations, new chat FAB, search, model badge per thread |
| Chat Thread | Primary interaction | Message list, composer, model badge, web search toggle, attach |
| Model Selector | Model choice | Model cards with name, params, license, context length, availability |
| Model Info/Details | Model transparency | Architecture, license, limitations, benchmarks, community rating |
| Web Search Results | Citation display | Source cards with URL, title, snippet, expand/preview |
| Community/Models | Model discovery | Browse, filter, sort, add to personal list, trust indicators |
| Conversation History | Thread management | Search, date groups, rename, pin, delete |
| Profile/Settings | Account and preferences | Theme, default model, notification prefs, data export, delete account |
| Support & Safety | Help and reporting | Report output, feedback form, help articles, safety info |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, locale, created_at, quota_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, token, created_at, revoked_at |
| Conversation | id, user_id, title, model_id, web_search_enabled, created_at, pinned, deleted_at |
| Message | id, conversation_id, role (user/assistant/system), content_parts[], status, model_id, token_count, created_at |
| ContentPart | id, message_id, type (text/image/file_ref/citation), body, metadata |
| ModelInfo | id, name, provider, architecture, parameter_count, license_type, license_url, context_length, capabilities[], availability_status, community_rating, updated_at |
| WebSearchResult | id, message_id, query, source_url, title, snippet, retrieved_at, relevance_score |
| CommunityModel | id, hub_model_id, name, provider, parameter_count, license_type, downloads, likes, trust_level (verified/popular/unverified), compatibility_status, added_at |
| UserModelPreference | id, user_id, model_id, is_default, added_at |
| Subscription | id, user_id, tier, status, started_at, expires_at, store_receipt_ref |
| SafetyReport | id, user_id, target_message_id, reason, description, status, created_at |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /conversations | GET | List user conversations with pagination |
| /conversations | POST | Create new conversation with model selection |
| /conversations/:id | GET | Fetch conversation with messages |
| /conversations/:id | PATCH | Rename, pin, toggle web search |
| /conversations/:id | DELETE | Soft-delete conversation |
| /conversations/:id/messages | POST | Send message (SSE streaming response) |
| /conversations/:id/messages/:mid/regenerate | POST | Regenerate assistant response |
| /conversations/:id/model | PATCH | Switch model mid-conversation |
| /models | GET | List available models with metadata |
| /models/:id | GET | Full model info (architecture, license, benchmarks) |
| /models/:id/status | GET | Check model availability and load state |
| /models/community | GET | Browse community models with filters and pagination |
| /models/community/:id/add | POST | Add community model to user's personal list |
| /search/web | POST | Trigger web search for grounded responses |
| /history | GET | Search and filter conversation history |
| /settings | GET/PATCH | Read and update user preferences |
| /reports | POST | Submit safety/abuse report |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Message creation returns an SSE stream with event types: `content_delta`, `content_done`, `citation`, `web_search_start`, `web_search_result`, `model_loading`, `error`, `done`.

## Realtime Push And Offline Behavior

- Response streaming uses SSE with automatic reconnection and resume from last event ID.
- Web search results arrive as discrete SSE events, rendered as citation chips in real time.
- Model loading state is communicated via SSE before content tokens begin.
- Offline mode: cached conversation history is readable; new messages are queued as drafts; submit is blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys to prevent duplicate message submission.
- Push notifications (opt-in): model availability changes, quota resets, account security events.
- Local draft persistence: unsent messages survive app kill/restart.
- Conversation cache invalidation: poll on app foreground or use lightweight sync endpoint.

## Permissions Privacy And Safety

- Camera/photo library: requested only when user initiates image attachment.
- Notifications: requested only after first relevant event.
- No microphone, location, contacts, or calendar access required for V1.
- User prompts and responses are not used for model training without explicit opt-in consent.
- All conversations are encrypted in transit (TLS) and at rest (AES-256 or equivalent).
- Community models display a safety disclaimer for unverified entries before first use.
- Generated content carries a disclaimer: "AI-generated using open-source models. Verify before use."
- Safety filters block: CSAM, weapons instructions, personal information extraction, malware generation.
- Crisis content (self-harm, violence) triggers a refusal with resource referral.
- Data export includes all conversations, messages, model preferences, and account data.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Manual verification required: exact permission prompt timing, OAuth flow details, push payload format.

## Analytics And Monetization

- Events tracked: session_start, conversation_created, message_sent, model_selected, model_switched, web_search_toggled, citation_expanded, community_model_added, history_searched, report_submitted, export_requested.
- Event properties: coarse latency bucket, model class, message count bucket, error code, quota tier. Never raw prompts, responses, or personal content.
- Monetization model: generous free tier with optional premium tier for higher rate limits, priority model access, longer context windows, and advanced community model features.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate safety features, data export/delete, account recovery, or access to existing conversation history.

## Edge Cases

- Model loading latency varies significantly between models (small vs. 70B+ parameter): show loading progress with estimated wait time, allow cancellation.
- Open-source model quality variance: some community models produce lower-quality output; display model trust level and quality disclaimer.
- Web search integration failures (timeout, provider outage): degrade gracefully, continue generation without citations, show "search unavailable" indicator.
- Community model trust/safety: unverified models may produce unsafe content; apply safety filters regardless of model source, block flagged models.
- Model size vs. device constraints: large models may have longer cold-start times; display queue position and ETA.
- User switches model mid-stream: cancel current generation cleanly, restart with new model, preserve prior messages.
- Community model removed from Hub: mark as unavailable in user's list, suggest alternatives, preserve old conversation history.
- Concurrent sessions submit to same conversation: last-write-wins with conflict indicator.
- Extremely long responses (model generates beyond context window): truncate gracefully with "response truncated" indicator.
- Rate limit hit during streaming: complete current response but block next message with reset countdown.

## Test Plan

- Unit tests: message state machine, model selection logic, SSE event parsing, citation rendering, idempotency key generation, trust level classification, web search toggle state.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, and server error responses.
- Integration tests: full flow from prompt through streaming response; model switch mid-conversation; web search with citation rendering; community model add and use.
- Streaming tests: SSE reconnection, interleaved citation events, model loading events before content, cancellation on model switch.
- Offline tests: draft preservation, queue behavior, reconnect reconciliation, duplicate prevention.
- Safety tests: blocked content categories, crisis prompt handling, unverified model disclaimer display, report submission flow.
- Model tests: all curated models respond correctly, community model fallback on unavailability, license badge accuracy.
- Accessibility tests: model selector screen-reader labels, citation chip announcements, streaming progress indicators, focus management.
- Performance tests: token render rate across model sizes, large conversation scroll performance, model selector load time with many models.
- Manual verification tests: OAuth flow, permission prompts, push notification delivery, model switching latency on device, community model loading times.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can select from at least four open-source models with visible parameter count, license, and capability labels.
- Model switching mid-conversation works with clean stream cancellation and restart.
- Web search produces inline citations with expandable source cards.
- Model info sheet displays architecture, license, limitations, and community rating.
- Community model browser shows trust indicators and safety disclaimers for unverified models.
- Streaming handles all SSE event types (content, citation, web search, model loading) without UI corruption.
- Conversation history supports search, rename, pin, and delete.
- Offline mode preserves drafts and blocks unsafe operations.
- Safety filters and AI-generated disclaimers are present and tested.
- Manual verification blockers are documented and feature-flagged.
- At least 12 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- Does HuggingChat enforce per-user rate limits or quotas on the free tier, and what are the exact thresholds?
- Which models are available by default vs. requiring community opt-in?
- What is the exact OAuth scope set required for Hugging Face account integration?
- How does HuggingChat handle model cold-start latency for large models (queuing, pre-warming)?
- Are conversation histories stored server-side indefinitely or subject to retention limits?
- What web search provider does HuggingChat use, and what are the fallback behaviors?
- Does the mobile experience differ from the web experience in feature set or model availability?
- How are community model safety reviews conducted before they appear in the browser?

## Build Plan

- **Phase 1 — App Shell + Auth + Chat + Streaming**: Auth flows (email and OAuth), conversation CRUD, basic chat with SSE streaming from a default open-source model. Target: functional chat shell with one model.
- **Phase 2 — Model Selector + Model Info**: Model picker with curated model list, parameter/license/capability display, model info detail sheet, per-conversation model persistence and mid-thread switching. Target: multi-model chat with transparency.
- **Phase 3 — Web Search Integration**: Web search toggle, search-triggered citation events in SSE stream, citation chip rendering, source preview bottom sheet, graceful degradation on search failure. Target: grounded answers with citations.
- **Phase 4 — Community Models + Browsing**: Community model directory with filters and search, trust indicators, add-to-personal-list flow, unverified model safety disclaimer, model availability tracking. Target: community model discovery and use.
- **Phase 5 — History + Settings**: Conversation history search and management (rename, pin, delete), user preferences (default model, theme, notifications), data export and account deletion. Target: complete user management.
- **Phase 6 — Safety + Accessibility**: Safety filter hardening, content reporting flow, accessibility audit, push notifications, offline mode polish, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with a HuggingChat account to capture exact model list, switching UX, web search behavior, and rate limit thresholds.
- Select original inference providers for hosting open-source models (Llama, Mistral, Gemma, etc.) with appropriate licensing.
- Design original branding, UI copy, and onboarding content distinct from Hugging Face's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
