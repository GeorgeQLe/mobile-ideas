# 202 — Google Gemini Clone

## Overview

A multimodal AI assistant mobile application modeled on Google Gemini. The app provides conversational AI with text, image, audio, and video input, integrates with productivity services via an extensions system, offers image generation, and grounds responses in real-time search results. A subscription tier unlocks the most capable model and advanced features.

## Goals

- Deliver a conversational AI chat interface supporting multimodal input (text, image, audio, video).
- Implement an extensions framework that connects to external services (email, documents, maps, video, flights, hotels).
- Provide AI image generation within conversation context.
- Ground model responses in live search results with source citations.
- Sync conversation history across devices via authenticated user accounts.
- Offer a free tier and a paid Advanced tier with access to the most capable model.

## Non-Goals

- Do not replicate Google's proprietary Gemini model weights or training data.
- Do not use Google trademarks, logos, or brand assets.
- Do not implement real Google Workspace OAuth — use mock/stub extension backends.
- Do not build a general-purpose voice assistant OS integration layer (on-device assistant replacement).
- Do not provide medical, legal, or financial advice features.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|--------|-----------|---------------|--------|
| Apple App Store | https://apps.apple.com/us/app/google-gemini/id6477141767 | iOS listing, screenshots, feature bullets | Verified 2026-05-10 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.bard | Android listing, permissions, description | Verified 2026-05-10 |
| Gemini Website | https://gemini.google.com | Product positioning, tier comparison | Verified 2026-05-10 |
| Gemini Help | https://support.google.com/gemini | Support documentation, extension docs | Verified 2026-05-10 |

## Detailed Design

### Architecture

- **Client**: React Native (iOS + Android) with platform-specific media capture modules.
- **Backend**: Node.js API gateway → LLM orchestration service → extension broker → search grounding service.
- **LLM Provider**: Pluggable — use OpenAI-compatible or Anthropic API as the backing model. Abstract behind an internal inference interface.
- **Storage**: PostgreSQL (relational data), S3-compatible blob store (uploads, generated images), Redis (session cache, rate limiting).
- **Streaming**: Server-Sent Events (SSE) for token-by-token response delivery.

### Extensions Framework

Extensions are server-side integrations that the LLM orchestrator can invoke mid-generation:
1. User grants permission to an extension (OAuth or API key).
2. During inference, the orchestrator detects extension-relevant queries via tool-use prompting.
3. The extension broker calls the third-party API, returns structured data to the model context.
4. Response includes cited extension data with provenance metadata.

Built-in extension stubs: Email, Documents, Maps, Video Search, Flights, Hotels.

### Search Grounding

When the model determines a query benefits from real-time information:
1. Orchestrator emits a search tool call.
2. Search grounding service queries a web search API (e.g., Brave Search, SerpAPI).
3. Top-N snippets are injected into the model context window.
4. Response includes inline citations linking to source URLs.

### Image Generation

- User requests image generation in natural language.
- Backend routes to an image generation API (Stable Diffusion, DALL-E, or self-hosted).
- Generated images are stored in blob storage, thumbnails returned inline.
- Safety filters applied pre- and post-generation.

### Subscription Tiers

| Feature | Free | Advanced |
|---------|------|----------|
| Base model | Standard | Ultra |
| Daily message limit | 50 | Unlimited |
| Image generation | 10/day | 100/day |
| Extensions | 3 active | Unlimited |
| Priority queue | No | Yes |
| Context window | 32K | 128K+ |

## Core User Journeys

1. **First Launch → Auth → First Message**: User opens app → signs in or creates account → lands on empty home → types a question → receives streamed response.
2. **Multimodal Input**: User taps camera/gallery → attaches image → asks "What is this?" → model describes image content.
3. **Extension Use**: User asks "Summarize my latest emails" → app prompts extension grant if not yet authorized → extension fetches data → model summarizes.
4. **Image Generation**: User types "Generate an image of a sunset over mountains" → loading state → generated image appears inline with download option.
5. **Search Grounding**: User asks a current-events question → model invokes search → response includes citations with expandable source cards.
6. **Subscription Upgrade**: User hits free-tier limit → paywall prompt → in-app purchase flow → immediate tier upgrade reflected.
7. **Conversation History**: User opens history drawer → sees past conversations → taps one → full thread loads with scroll-to-bottom.

## Screen Inventory

| # | Screen | Key Components |
|---|--------|----------------|
| 1 | Welcome/Auth | Sign-in buttons (email, OAuth), terms acceptance, onboarding carousel |
| 2 | Home/Conversations | Conversation list, new-chat FAB, search bar, profile avatar |
| 3 | Chat Thread | Message bubbles, streaming indicator, input bar, attachment menu, suggested prompts |
| 4 | Image Generation | Generation progress, result gallery, regenerate/edit/download actions |
| 5 | Extensions Manager | Extension cards, grant/revoke toggles, status indicators |
| 6 | Search Grounding Detail | Source cards, snippet previews, open-in-browser links |
| 7 | History/Recent | Chronological conversation list, swipe-to-delete, search/filter |
| 8 | Subscription/Advanced | Tier comparison table, subscribe CTA, manage subscription link |
| 9 | Settings & Privacy | Model preference, theme, data export, delete account, safety controls |
| 10 | Support | FAQ, contact form, feedback submission |
| 11 | Accessibility | Font size, high contrast, screen reader hints, reduced motion |

## Data Model

| Entity | Key Fields | Relationships |
|--------|------------|---------------|
| User | id, email, displayName, avatarUrl, tier, createdAt | has many Conversations, Subscriptions |
| DeviceSession | id, userId, deviceFingerprint, pushToken, lastActiveAt | belongs to User |
| Conversation | id, userId, title, createdAt, updatedAt, isArchived | has many Messages |
| Message | id, conversationId, role (user/assistant/system), createdAt | has many ContentParts |
| ContentPart | id, messageId, type (text/image/audio/video/file), content, mimeType, blobUrl | belongs to Message |
| Extension | id, slug, displayName, description, iconUrl, category, isBuiltin | has many ExtensionGrants |
| ExtensionGrant | id, userId, extensionId, scopes, grantedAt, revokedAt | belongs to User, Extension |
| GeneratedImage | id, messageId, prompt, imageUrl, thumbnailUrl, safetyScore, createdAt | belongs to Message |
| SearchGrounding | id, messageId, query, sources (JSON array), retrievedAt | belongs to Message |
| Subscription | id, userId, tier, platform, purchaseToken, startsAt, expiresAt, status | belongs to User |
| UserPreference | id, userId, key, value | belongs to User |
| SafetyReport | id, messageId, reporterId, reason, status, createdAt | belongs to Message |
| AuditEvent | id, userId, action, metadata, createdAt | belongs to User |

## API And Backend Contracts

### Authentication
- `POST /auth/register` — email/password registration
- `POST /auth/login` — returns JWT access + refresh tokens
- `POST /auth/oauth` — OAuth provider login (Google, Apple)
- `POST /auth/refresh` — rotate refresh token

### Conversations
- `GET /conversations` — paginated list (cursor-based)
- `POST /conversations` — create new conversation
- `GET /conversations/:id` — full conversation with messages
- `PATCH /conversations/:id` — rename, archive
- `DELETE /conversations/:id` — soft delete

### Messages (Streaming)
- `POST /conversations/:id/messages` — send user message, response streamed via SSE
  - Request: `{ parts: [{ type, content, blobRef? }] }`
  - Response: SSE stream with `event: token`, `event: done`, `event: error`
- `POST /conversations/:id/messages/:msgId/regenerate` — regenerate assistant response

### Multimodal Uploads
- `POST /uploads` — multipart upload, returns `blobRef`
  - Accepts: image/png, image/jpeg, image/webp, audio/wav, audio/mp4, video/mp4
  - Max size: 20 MB (images), 50 MB (audio/video)

### Extensions
- `GET /extensions` — list available extensions
- `POST /extensions/:id/grant` — authorize extension with scopes
- `DELETE /extensions/:id/grant` — revoke extension access
- `GET /extensions/:id/status` — connection health check

### Image Generation
- `POST /images/generate` — `{ prompt, style?, aspectRatio? }` → returns job ID
- `GET /images/:jobId` — poll status or retrieve result

### Search Grounding
- `GET /messages/:id/sources` — retrieve grounding sources for a message

### Preferences
- `GET /preferences` — current user preferences
- `PUT /preferences` — bulk update preferences

### Billing
- `POST /subscriptions` — initiate subscription (App Store / Play Store receipt validation)
- `GET /subscriptions/current` — active subscription details
- `POST /subscriptions/restore` — restore purchases

### Reports
- `POST /reports` — submit safety report for a message

## Realtime, Push, And Offline Behavior

- **Streaming**: SSE connection opened per message send; auto-reconnect with exponential backoff on disconnect.
- **Push Notifications**: Extension alerts (e.g., "Your flight status changed"), subscription expiry reminders, new feature announcements. Delivered via APNs (iOS) and FCM (Android).
- **Offline**:
  - Conversation list and last 50 messages per conversation cached in local SQLite.
  - New messages queued locally and sent when connectivity resumes.
  - Uploads queued with retry; progress persisted across app restarts.
  - Image generation and search grounding require connectivity — show clear offline state.

## Permissions, Privacy, And Safety

| Permission | Purpose | When Requested |
|------------|---------|----------------|
| Camera | Photo/video capture for multimodal input | On first camera attachment tap |
| Photo Library | Select existing media | On first gallery tap |
| Microphone | Audio input | On first voice message tap |
| Notifications | Push alerts | After first successful conversation |

### Privacy Controls
- Conversation data encrypted at rest (AES-256) and in transit (TLS 1.3).
- Users can export all data (GDPR Article 20 compliant).
- Users can delete account and all associated data within 30 days.
- Extension data is not retained after session ends unless user opts in.
- Opt-out of conversation data used for model improvement.

### Safety
- Input/output content filters for harmful, illegal, and CSAM content.
- Image generation blocked for prohibited categories (violence, sexual, minors, real persons).
- Rate limiting per user to prevent abuse.
- Automated + human review pipeline for SafetyReports.
- Age-gating: 13+ (16+ in EU) per app store metadata.

## Analytics And Monetization

### Analytics Events
- `app_open`, `sign_in`, `conversation_start`, `message_send`, `extension_grant`, `image_generate`, `search_ground`, `subscription_view`, `subscription_purchase`, `error_displayed`.
- Funnel: onboarding → first message → return day 1 → return day 7 → subscription.

### Monetization
- Freemium with usage caps driving upgrade.
- In-app subscriptions via App Store / Google Play (monthly, annual).
- No advertising in-app.
- Revenue share: 70/30 (standard app store) or 85/15 (after year 1 on iOS).

## Edge Cases

- **Token limit exceeded**: Truncate oldest messages in context window; show indicator that context was trimmed.
- **Extension timeout**: 10-second timeout per extension call; fallback response without extension data + user notification.
- **Image generation failure**: Retry once; if safety filter triggers, explain to user without revealing filter internals.
- **Concurrent sessions**: Last-write-wins for preferences; conversations merge chronologically.
- **Subscription lapse**: Grace period of 3 days; downgrade to free tier silently; notify user.
- **Upload too large**: Client-side validation before upload; server rejects with 413 and user-friendly message.
- **Network mid-stream disconnect**: Client buffers partial response; on reconnect, request continuation from last token offset.
- **Blocked region**: Geo-check at auth; show unavailability notice with no data collection.
- **Model unavailable**: Queue with estimated wait time (Advanced tier priority); timeout after 60 seconds with apology.

## Test Plan

### Unit Tests
- Message parsing and ContentPart assembly.
- Extension broker routing logic.
- Subscription tier gate enforcement.
- Safety filter rule matching.

### Integration Tests
- End-to-end message send → SSE stream → message persisted.
- Upload flow → blob stored → blobRef usable in message.
- Extension grant → extension invocation → data returned in response.
- Subscription purchase receipt validation → tier upgrade.

### E2E / UI Tests
- Onboarding flow completion.
- Send text message and verify streamed response renders.
- Attach image and verify multimodal response.
- Grant extension and verify extension data appears in response.
- Upgrade subscription and verify limits change.

### Manual Verification Blockers
- **BLOCKED**: Real App Store / Google Play subscription validation requires developer accounts and review.
- **BLOCKED**: Push notification delivery requires physical devices with valid push tokens.
- **BLOCKED**: OAuth extension grants with real third-party services require registered OAuth apps.
- **BLOCKED**: Voice input on iOS requires physical device (simulator microphone is unreliable).
- **BLOCKED**: Regional geo-blocking requires VPN or regional test infrastructure.

## Acceptance Criteria

1. User can sign up, sign in, and sync conversations across devices.
2. User can send text messages and receive streamed AI responses.
3. User can attach images, audio, or video and receive multimodal responses.
4. User can enable extensions and receive extension-augmented responses.
5. User can request image generation and view/download results.
6. Responses include search grounding citations when applicable.
7. Free tier enforces daily limits; Advanced tier removes them.
8. Conversation history persists and is searchable.
9. Safety filters block prohibited content in both input and output.
10. App functions offline for cached content and queues actions for sync.

## Open Questions

1. Which backing LLM provider offers the best cost/quality ratio for the Ultra-equivalent tier?
2. Should extensions support user-contributed (third-party) extensions, or only built-in stubs?
3. What is the acceptable p95 latency target for first-token delivery?
4. Should conversation sharing (public link) be included in v1?
5. Is on-device model inference (small model for offline) in scope for v1?
6. What moderation SLA is required for SafetyReport review queue?

## Build Plan

### Phase 1 — Auth & Scaffold (Week 1-2)
- Project setup: React Native, navigation, state management, API client.
- Auth screens (register, login, OAuth stub).
- JWT token management and refresh flow.
- Basic profile and settings screens.

### Phase 2 — Core Chat (Week 3-4)
- Conversation CRUD (list, create, delete, rename).
- Chat thread UI with message bubbles and input bar.
- SSE streaming integration with token-by-token rendering.
- Local SQLite cache for offline conversation access.

### Phase 3 — Multimodal Input (Week 5-6)
- Camera and gallery integration with permission flows.
- Audio recording UI and upload.
- Video capture (limited duration) and upload.
- Upload service with progress tracking and retry.
- ContentPart rendering (inline images, audio player, video player).

### Phase 4 — Extensions & Search Grounding (Week 7-8)
- Extensions manager screen and grant/revoke UI.
- Extension broker backend with stub implementations.
- Search grounding service integration.
- Source citation cards in chat UI.
- Extension status indicators and error handling.

### Phase 5 — Image Generation & Subscription (Week 9-10)
- Image generation request flow and polling UI.
- Result gallery with download/share actions.
- Subscription tier comparison screen.
- In-app purchase integration (StoreKit / Google Play Billing).
- Tier-based rate limiting and feature gating.

### Phase 6 — Polish & Safety (Week 11-12)
- Content safety filters (input + output).
- Safety reporting flow.
- Push notification integration.
- Accessibility pass (VoiceOver, TalkBack, dynamic type).
- Performance optimization (list virtualization, image caching).
- Analytics instrumentation.
- QA and manual verification of non-blocked items.

## Next Steps

- Validate backing LLM provider selection and cost modeling.
- Design extension protocol specification for third-party extensibility decision.
- Create wireframes for chat thread streaming UX and multimodal attachment flow.
- Set up downstream implementation repository (private) per seeding conventions.
- Begin Phase 1 implementation after open questions 1 and 3 are resolved.
