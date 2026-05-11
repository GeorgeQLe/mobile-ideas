# 203 — Microsoft Copilot Clone

## Overview

A mobile AI assistant app powered by large language models, offering conversational AI, image generation, long-form notebook composition, custom AI agent discovery (Copilot GPTs), plugin extensibility, and workspace document integration. The clone reproduces Copilot's consumer and pro tiers without using Microsoft trademarks, branding, or proprietary backend services.

## Goals

- Deliver a conversational AI assistant with streaming text responses and multi-turn context.
- Support image generation via a diffusion model backend (DALL-E equivalent).
- Provide a Notebook mode for long-form content drafting with structured output.
- Offer a GPTs marketplace where users discover and use purpose-built AI agents.
- Integrate a plugins system for third-party tool access (web search, calculator, code interpreter).
- Support voice input with real-time transcription and conversational reply.
- Implement workspace document referencing (attach/summarize uploaded files).
- Differentiate free and Pro subscription tiers with usage limits and feature gates.

## Non-Goals

- No actual Microsoft 365 backend integration (Word, Excel, Outlook, Teams).
- No use of Microsoft branding, Copilot name, or trademarked assets in production builds.
- No replication of enterprise tenant management or Azure AD conditional access.
- No training or fine-tuning of foundation models within this app.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|--------|-----------|---------------|--------|
| Apple App Store | https://apps.apple.com/us/app/microsoft-copilot/id6738605755 | iOS listing, screenshots, feature list | Verified 2026-05-10 |
| Google Play | https://play.google.com/store/apps/details?id=com.microsoft.copilot | Android listing, permissions | Verified 2026-05-10 |
| Copilot Website | https://copilot.microsoft.com | Product positioning, tier comparison | Verified 2026-05-10 |
| Copilot Support | https://support.microsoft.com/copilot | Feature documentation, limits | Verified 2026-05-10 |

## Detailed Design

### Architecture

- **Client**: React Native (iOS + Android), local SQLite for conversation cache.
- **Backend**: Node.js API gateway, WebSocket streaming, LLM orchestration layer.
- **AI Layer**: Pluggable LLM provider (OpenAI-compatible API), image generation service, speech-to-text service.
- **Storage**: PostgreSQL (users, conversations, metadata), S3-compatible object store (images, attachments).
- **Auth**: OAuth 2.0 with PKCE (email/social sign-in), JWT access + refresh tokens.

### Conversation Engine

- Multi-turn conversations with system prompt per GPT persona.
- Server-sent events (SSE) for token-by-token streaming.
- Content parts support: text, image, code block, citation, file reference.
- Context window management: sliding window with summarization for long threads.

### Notebook Mode

- Single long-form document per notebook session.
- Iterative refinement: user provides instructions, AI rewrites/extends sections.
- Export to plain text, Markdown, or PDF.

### Copilot GPTs

- Curated and community-created AI agents with custom system prompts and tool configurations.
- Gallery with categories, ratings, and usage counts.
- Users can create personal GPTs (Pro tier).

### Plugins System

- Plugin manifest format (name, description, API spec, auth requirements).
- Runtime tool-call dispatch: LLM decides when to invoke a plugin.
- Built-in plugins: web search, code interpreter, image analysis.
- Third-party plugin grants with user consent flow.

### Image Generation

- Text-to-image with style presets (realistic, artistic, digital art).
- Image history gallery with re-generation and variation support.
- Content policy filtering pre- and post-generation.

### Voice Input

- Push-to-talk and hands-free activation modes.
- Real-time speech-to-text transcription displayed as user types.
- AI response optionally read aloud via TTS.

## Core User Journeys

1. **First Launch**: Welcome carousel → Sign in (email/social) → Home assistant screen.
2. **Ask a Question**: Tap input → Type or voice → Streaming response → Follow-up.
3. **Generate an Image**: Switch to Image Creator tab → Enter prompt → View/save result.
4. **Use Notebook**: Open Notebook mode → Provide topic → AI drafts → User refines iteratively.
5. **Discover GPTs**: Browse gallery → Select GPT → Start specialized conversation.
6. **Enable Plugin**: Settings → Plugins → Grant access → Plugin available in chat.
7. **Attach Document**: Tap attachment → Select file → AI summarizes/references content.
8. **Upgrade to Pro**: Hit free-tier limit → Prompt → Subscription flow → Unlocked features.

## Screen Inventory

| # | Screen | Key Components |
|---|--------|----------------|
| 1 | Welcome/Auth | Sign-in buttons, carousel, terms link |
| 2 | Home/Assistant | Greeting, suggested prompts, input bar, tab navigation |
| 3 | Chat Thread | Message bubbles, streaming indicator, action bar, context menu |
| 4 | Notebook Mode | Document editor, instruction input, version history |
| 5 | Image Creator | Prompt field, style selector, generated image grid |
| 6 | Copilot GPTs Gallery | Category tabs, GPT cards, search bar |
| 7 | GPT Detail | Description, capabilities list, start chat CTA |
| 8 | Plugins Manager | Installed list, available list, grant toggles |
| 9 | History/Search | Conversation list, search bar, filters |
| 10 | Subscription/Pro | Plan comparison, payment CTA, usage meter |
| 11 | Settings & Privacy | Account, appearance, data controls, clear history |
| 12 | Support & Safety | Report content, help center link, safety info |

## Data Model

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| User | id, email, displayName, avatarUrl, tier, createdAt | has many Conversations, Subscriptions |
| DeviceSession | id, userId, deviceId, platform, pushToken, lastActiveAt | belongs to User |
| Conversation | id, userId, copilotGptId?, title, mode(chat/notebook), createdAt, updatedAt | belongs to User, has many Messages |
| Message | id, conversationId, role(user/assistant/system), createdAt | belongs to Conversation, has many ContentParts |
| ContentPart | id, messageId, type(text/image/code/citation/fileRef), body, metadata | belongs to Message |
| CopilotGPT | id, name, description, systemPrompt, iconUrl, category, authorId, isPublic, ratingAvg | has many Conversations |
| Plugin | id, name, description, manifestUrl, authType, isBuiltin | has many PluginGrants |
| PluginGrant | id, userId, pluginId, grantedAt, revokedAt | belongs to User, Plugin |
| GeneratedImage | id, userId, prompt, stylePreset, imageUrl, createdAt, safetyStatus | belongs to User |
| WorkspaceDocument | id, userId, conversationId, fileName, mimeType, storageKey, sizeBytes | belongs to Conversation |
| Notebook | id, conversationId, title, content, version, exportFormat | belongs to Conversation |
| Subscription | id, userId, plan(free/pro), status, startedAt, expiresAt, platformTxId | belongs to User |
| SafetyReport | id, reporterId, messageId?, imageId?, reason, status, createdAt | belongs to User |
| AuditEvent | id, userId, action, resourceType, resourceId, metadata, createdAt | belongs to User |

## API And Backend Contracts

### Auth
- `POST /auth/token` — Exchange OAuth code for JWT pair.
- `POST /auth/refresh` — Refresh access token.
- `DELETE /auth/session` — Sign out, revoke tokens.

### Conversations
- `POST /conversations` — Create conversation (mode: chat|notebook, copilotGptId?).
- `GET /conversations` — List with pagination, search, filters.
- `GET /conversations/:id` — Fetch thread with messages.
- `DELETE /conversations/:id` — Soft-delete.

### Messages (Streaming)
- `POST /conversations/:id/messages` — Send user message; response streams via SSE.
- `POST /conversations/:id/messages/:mid/regenerate` — Re-generate assistant response.
- `POST /conversations/:id/stop` — Cancel in-progress generation.

### Image Generation
- `POST /images/generate` — Prompt + style → queued job.
- `GET /images/:jobId` — Poll status or receive via push.
- `GET /images` — User's image history.

### Copilot GPTs
- `GET /gpts` — Browse gallery (category, search, sort).
- `GET /gpts/:id` — Detail.
- `POST /gpts` — Create custom GPT (Pro tier).
- `PUT /gpts/:id` — Update own GPT.

### Plugins
- `GET /plugins` — Available plugins list.
- `POST /plugins/:id/grant` — User grants plugin access.
- `DELETE /plugins/:id/grant` — Revoke.

### Workspace Documents
- `POST /conversations/:id/documents` — Upload file (multipart).
- `GET /documents/:id/summary` — AI-generated summary.

### Notebook
- `PUT /notebooks/:id` — Save notebook content/version.
- `POST /notebooks/:id/export` — Export to format.

### Billing
- `GET /subscription` — Current plan and usage.
- `POST /subscription/checkout` — Initiate IAP flow.
- `POST /subscription/webhook` — Platform receipt validation.

### Safety
- `POST /reports` — Submit safety report.

## Realtime, Push, And Offline Behavior

- **Streaming**: SSE connection for active chat; reconnect with last-event-id on drop.
- **Push Notifications**: Image generation complete, GPT update from followed creator, subscription expiry warning.
- **Offline**: Read cached conversations and images. Queue outgoing messages; send on reconnect. Show offline banner.
- **Background**: No background LLM calls; generation requires active session.
- **Sync**: Conversations sync across devices via server; last-write-wins for notebook edits.

## Permissions, Privacy, And Safety

- **Device Permissions**: Microphone (voice input), Camera (optional photo input), Photo Library (image save/upload), Notifications.
- **Data Minimization**: Conversations stored server-side with user-controlled retention (30/90/forever). Local cache clearable.
- **Content Filtering**: Pre-generation prompt safety check; post-generation image classifier; real-time text output filter.
- **BLOCKED — Manual Verification Required**: Content moderation thresholds require testing with real model outputs to calibrate false-positive rates.
- **Child Safety**: Age gate at sign-up; stricter content filter for users under 18.
- **Enterprise Isolation**: Pro/enterprise conversations are tenant-scoped; no cross-tenant data leakage.
- **Audit Trail**: All generation requests logged in AuditEvent for compliance.
- **GDPR/CCPA**: Data export, deletion endpoint, consent records.

## Analytics And Monetization

### Analytics Events
- `conversation_started`, `message_sent`, `image_generated`, `gpt_used`, `plugin_activated`, `notebook_exported`, `voice_input_used`, `subscription_viewed`.

### Monetization
- **Free Tier**: Limited daily messages, standard model, basic image generation, no custom GPTs.
- **Pro Tier** (monthly/annual IAP): Unlimited messages, priority model access, advanced image generation, custom GPT creation, plugin ecosystem, notebook export.
- **BLOCKED — Manual Verification Required**: Exact free-tier daily limits and Pro pricing require real-account verification against current Copilot plans.

## Edge Cases

- Streaming interrupted mid-response: client displays partial content with "Continue" button.
- Image generation fails content policy: show user-friendly rejection with reason category.
- Plugin API timeout: display timeout message, allow retry, do not block conversation.
- Notebook content exceeds context window: chunk and summarize prior sections transparently.
- Voice transcription in noisy environment: show confidence indicator, allow manual correction.
- Concurrent edits to same notebook from two devices: last-write-wins with conflict toast.
- Subscription lapse during active session: allow current generation to complete, then gate subsequent requests.
- GPT system prompt injection attempt: sanitize user input, maintain system prompt isolation.
- File upload exceeds size limit: reject with clear size guidance before upload completes.
- Rate limiting during high demand: queue position indicator for free-tier users.

## Test Plan

- **Unit Tests**: Message parsing, content part rendering, context window truncation logic, safety filter rules.
- **Integration Tests**: Auth flow, conversation CRUD, streaming message delivery, image generation pipeline, plugin dispatch.
- **E2E Tests**: Full user journeys (sign-in → chat → image → GPT → notebook → export).
- **Performance Tests**: Streaming latency p50/p95, image generation queue time, app cold start < 2s.
- **Safety Tests**: Prompt injection resistance, content filter coverage, PII detection in outputs.
- **Offline Tests**: Cache read, queue send, reconnect sync, offline banner display.
- **Subscription Tests**: Tier gating enforcement, IAP receipt validation, grace period handling.

## Acceptance Criteria

1. User can sign in, start a conversation, and receive streaming AI responses.
2. Multi-turn context is maintained across messages within a conversation.
3. Image generation produces results from text prompts with style options.
4. Notebook mode supports iterative long-form content creation and export.
5. GPTs gallery loads, GPT detail displays, and specialized conversations function.
6. Plugins can be granted, invoked during chat, and revoked.
7. Voice input transcribes and submits as a message.
8. File upload attaches to conversation and AI can reference content.
9. Free-tier limits are enforced; Pro upgrade flow completes via IAP.
10. Offline mode displays cached content and queues messages.
11. Content safety filters block policy-violating inputs and outputs.
12. All 12 screens render correctly on iOS and Android.

## Open Questions

1. What are the current exact daily message limits for free-tier Copilot users? (Requires real-account verification.)
2. Does Copilot support collaborative notebooks or is it single-user only? (Blocked on account testing.)
3. What is the plugin manifest format — OpenAPI-based or proprietary? (Requires developer documentation access.)
4. Are GPT creation tools available on mobile or desktop-only? (Requires device testing.)
5. How does Copilot handle multi-language voice input switching? (Requires regional testing.)

## Build Plan

### Phase 1 — Auth and Core Shell (Week 1-2)
- OAuth sign-in flow with email/social providers.
- Tab navigation shell: Home, Chat, Image, GPTs, Settings.
- User and DeviceSession persistence.

### Phase 2 — Conversation Engine (Week 3-4)
- Conversation CRUD and message persistence.
- SSE streaming integration with LLM backend.
- Multi-turn context management and UI (bubbles, streaming indicator).
- Message actions: copy, regenerate, share.

### Phase 3 — Image Generation and Voice (Week 5-6)
- Image generation endpoint integration and queue/poll UI.
- Style presets and image gallery.
- Voice input (speech-to-text) integration.
- TTS response playback.

### Phase 4 — Notebook and Documents (Week 7-8)
- Notebook mode UI with iterative instruction input.
- Version history and export (Markdown, PDF).
- File upload, storage, and AI summarization.

### Phase 5 — GPTs and Plugins (Week 9-10)
- GPTs gallery, detail screen, and specialized conversation routing.
- Custom GPT creation flow (Pro tier).
- Plugin manifest loader, grant system, and runtime dispatch.
- Built-in plugins: web search, code interpreter.

### Phase 6 — Monetization, Safety, and Polish (Week 11-12)
- Subscription tier enforcement and IAP integration (App Store, Play Store).
- Content safety filters (input and output).
- Offline caching and sync.
- Analytics instrumentation.
- Performance optimization and accessibility pass.

## Next Steps

- Resolve open questions via real-account verification sessions.
- Finalize LLM provider selection and API key provisioning.
- Design system token extraction for all 12 screens.
- Set up CI pipeline with streaming integration test harness.
- Begin Phase 1 implementation in downstream repository.
