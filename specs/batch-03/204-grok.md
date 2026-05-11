# Grok-Style Clone Spec

> Metadata
> - Inspiration app: Grok (xAI)
> - Category: AI assistant, social-data-augmented chat, image generation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-10.
> - Verification basis: exact public marketplace pages, product pages, X Help Center documentation, and current public feature notes.
> - Manual verification blockers: native iOS/Android screen capture, X account OAuth flow, Premium subscription purchase/restore, real-time trending data retrieval, image generation latency/quality, DeepSearch result rendering, voice input, push-notification behavior, and data export still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, model names, provider integrations, or X/Twitter platform APIs.

## Overview

Build an original mobile AI assistant inspired by Grok's public workflow: social-data-augmented conversational assistant, real-time trending context, image generation, image understanding, personality mode toggle (fun/regular), DeepSearch for comprehensive research, conversation history, subscription gating, and safety/reporting paths.

The clone must not copy Grok branding, xAI logos, X/Twitter trademarks, screenshots, marketing copy, protected UI artwork, model names (Aurora, Grok-2, etc.), private APIs, or proprietary moderation logic. The implementation reproduces comparable user jobs and interaction patterns using original product language and licensed or first-party AI providers.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked as manually blocked must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first AI assistant with text chat, streaming responses, real-time social/trending context, image generation, image analysis, and DeepSearch.
- Support personality mode toggle between a standard professional tone and an irreverent/humorous tone.
- Gate premium features behind a subscription tier without copying X Premium branding, pricing, or checkout copy.
- Keep privacy controls visible: data usage opt-out, conversation deletion, data export, and account deletion.
- Preserve safety expectations for generated text, generated images, uploaded content, minors, self-harm, misinformation, and abusive automation.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an xAI-branded or X-branded app or imply affiliation with xAI, X Corp, or Twitter.
- Do not scrape X/Twitter, reuse private X APIs, replay Grok network traffic, or copy proprietary prompts/model behavior.
- Do not use user content, uploaded images, or generated outputs for model training without explicit account-level consent.
- Do not ship medical, legal, financial, mental-health, political, or high-stakes decision advice as authoritative output.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.
- Do not reproduce X Premium subscription terms, pricing tiers, or bundled X features.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/grok/id6670324846 | Official iOS listing, app category, age rating, privacy labels, features | Verified 2026-05-10 |
| Google Play | https://play.google.com/store/apps/details?id=com.xai.grok | Official Android listing, rating/downloads, content rating, data safety | Verified 2026-05-10 |
| Grok Website | https://grok.x.ai | Product positioning, feature overview, model capabilities | Verified 2026-05-10 |
| X Help Center — Grok | https://help.x.com/en/using-x/grok | Feature documentation, usage limits, subscription requirements, safety policies | Verified 2026-05-10 |

## Detailed Design

### Authentication and Account Linking

Users authenticate via a social platform account (analogous to X account OAuth). The clone uses a generic OAuth2 provider or email/password with optional social-platform linking. Subscription state is checked post-auth to determine feature tier.

### Conversation Engine

- Streaming token delivery via SSE or WebSocket.
- Multi-turn context window with server-managed history.
- Messages support mixed content: text, inline images (generated or uploaded), code blocks, citations, and social-data cards.
- Each message records personality mode at send time for consistent re-rendering.

### Personality Mode

- Two modes: "Standard" (factual, professional) and "Witty" (irreverent, humorous, opinionated).
- Mode is a per-conversation setting, toggleable mid-conversation. New messages adopt the active mode; prior messages retain their original mode label.
- Backend passes mode as a system-prompt modifier. No model swap required.

### Real-Time Social/Trending Context

- A "Trending Context" module fetches current trending topics, summaries, and representative posts from a social-data provider.
- The assistant can reference trending data when answering questions about current events.
- Trending cards render inline with attribution to original public posts (title, handle, timestamp — no full-text replication of copyrighted post content).

### Image Generation

- Text-to-image generation via a backend image model (analogous to Aurora).
- Supports prompt input, style hints, aspect ratio selection.
- Generated images stored server-side and linked to the conversation message.
- Safety filters reject prompts requesting real people likenesses, CSAM, or violent content before generation.

### Image Understanding

- Users upload or capture images; the assistant analyzes and responds with descriptions, OCR text, or contextual answers.
- Supported formats: JPEG, PNG, WebP, HEIC. Max 20 MB per image.
- Images are processed server-side; thumbnails cached for conversation replay.

### DeepSearch

- A research mode that performs multi-step retrieval, synthesizes sources, and returns a structured answer with citations.
- Triggered explicitly by user (button or slash command).
- Results render as an expandable card with summary, key findings, source list, and confidence indicators.
- Longer latency (10–60 s); UI shows progress steps.

### Subscription Gating

- Free tier: limited daily messages, no image generation, no DeepSearch, standard personality only.
- Premium tier: unlimited messages, image generation, DeepSearch, personality toggle, priority queue.
- Subscription managed via App Store/Play Store IAP. Server validates receipt and sets entitlement.

## Core User Journeys

1. **First launch → Auth → Home**: User opens app, authenticates, sees assistant home with prompt suggestions and trending context.
2. **Ask a question**: User types a message, receives streaming response with optional trending-data cards.
3. **Toggle personality**: User switches to Witty mode mid-conversation; next response adopts irreverent tone.
4. **Generate an image**: User requests image generation; sees progress indicator, then rendered image inline.
5. **Analyze an image**: User uploads a photo; assistant describes contents or answers questions about it.
6. **DeepSearch**: User triggers DeepSearch; sees step-by-step progress, then structured research result.
7. **View trending context**: User taps Explore/Trending; sees current topics with AI-generated summaries.
8. **Manage history**: User browses past conversations, deletes individual threads or bulk-clears.
9. **Upgrade subscription**: Free user hits limit, sees upgrade prompt, completes IAP.
10. **Report unsafe content**: User long-presses a message, selects Report, categorizes the issue.

## Screen Inventory

| # | Screen | Key Components |
|---|---|---|
| 1 | Welcome / Auth | Logo, sign-in button (OAuth or email), terms/privacy links |
| 2 | Home / Assistant | Greeting, prompt suggestions, trending context cards, composer bar |
| 3 | Chat Thread | Message bubbles (text/image/code/citation), personality badge, streaming indicator, composer with attach/camera/DeepSearch buttons |
| 4 | Image Generation | Prompt input, style/aspect options, progress indicator, generated image display, save/share actions |
| 5 | DeepSearch Results | Progress steps, summary card, key findings list, source citations, expand/collapse |
| 6 | Trending / Explore Context | Topic list, AI summaries, representative post cards, tap-to-ask integration |
| 7 | History | Conversation list (title, date, preview), swipe-to-delete, search, bulk actions |
| 8 | Subscription / Premium | Feature comparison table, plan selector, IAP button, restore purchases, terms |
| 9 | Settings & Personality | Personality mode toggle, default mode preference, display settings, notification prefs |
| 10 | Privacy & Data | Data usage toggle, conversation data export, delete all data, account deletion |
| 11 | Support & Safety | Report history, FAQ/help links, contact support, community guidelines |

## Data Model

| Entity | Key Fields | Notes |
|---|---|---|
| User | id, email, displayName, avatarUrl, authProvider, subscriptionTier, createdAt | OAuth or email auth |
| DeviceSession | id, userId, deviceId, platform, pushToken, lastActiveAt | Multi-device support |
| Conversation | id, userId, title, personalityMode, createdAt, updatedAt, isArchived | Title auto-generated from first message |
| Message | id, conversationId, role (user/assistant/system), contentParts[], personalityMode, createdAt | role enum; contentParts for mixed media |
| ContentPart | id, messageId, type (text/image/code/citation/trendCard), payload (JSON), orderIndex | Polymorphic content blocks |
| GeneratedImage | id, messageId, prompt, styleHint, aspectRatio, imageUrl, thumbnailUrl, status, safetyFlag | Linked to message; status: pending/complete/rejected |
| DeepSearchResult | id, messageId, query, summary, findings[], sources[], confidence, durationMs | Structured research output |
| TrendContext | id, topic, summary, representativePosts[], region, fetchedAt, expiresAt | Cached trending data; TTL-based refresh |
| PersonalityMode | enum: standard, witty | Stored per-conversation and per-message |
| Subscription | id, userId, tier (free/premium), platform, receiptId, expiresAt, autoRenew | IAP receipt validation |
| SafetyReport | id, reporterId, messageId, category, description, status, reviewedAt | User-submitted content reports |
| AuditEvent | id, userId, action, metadata (JSON), createdAt | Security and compliance audit trail |

## API And Backend Contracts

| Method | Path | Purpose | Auth | Subscription |
|---|---|---|---|---|
| POST | /auth/login | Authenticate via OAuth or email | None | — |
| POST | /auth/refresh | Refresh access token | Token | — |
| DELETE | /auth/session | Logout / revoke session | Token | — |
| GET | /conversations | List user conversations | Token | — |
| POST | /conversations | Create new conversation | Token | — |
| GET | /conversations/:id | Get conversation with messages | Token | — |
| DELETE | /conversations/:id | Delete conversation | Token | — |
| POST | /conversations/:id/messages | Send message (returns SSE stream) | Token | Rate-limited on free |
| POST | /conversations/:id/messages/:mid/image-upload | Upload image for analysis | Token | — |
| POST | /images/generate | Generate image from prompt | Token | Premium only |
| GET | /images/:id | Retrieve generated image | Token | — |
| POST | /deepsearch | Initiate DeepSearch query | Token | Premium only |
| GET | /deepsearch/:id | Poll DeepSearch result | Token | Premium only |
| GET | /trending | Get current trending context | Token | — |
| GET | /trending/:topic | Get detailed topic context | Token | — |
| PUT | /settings/personality | Update default personality mode | Token | Witty requires Premium |
| GET | /subscription | Get current subscription state | Token | — |
| POST | /subscription/validate | Validate IAP receipt | Token | — |
| POST | /reports | Submit safety report | Token | — |
| POST | /account/export | Request data export | Token | — |
| DELETE | /account | Request account deletion | Token | — |

### Streaming Protocol

Message responses use Server-Sent Events (SSE). Event types: `token` (incremental text), `content_part` (complete image/citation/card block), `done` (stream complete), `error` (generation failure). Client reconnects with `Last-Event-ID` for resumption.

## Realtime, Push, And Offline Behavior

- **Streaming**: SSE for message generation; WebSocket optional for presence/typing indicators.
- **Push notifications**: Generation complete (for long DeepSearch), subscription expiry warning, safety report resolution, new feature announcements.
- **Offline queue**: Composed messages queued locally; sent on reconnect. Read-only access to cached conversation history.
- **Trending cache**: Client caches trending data with 5-minute TTL; stale indicator shown when offline.
- **Image cache**: Generated and uploaded image thumbnails cached on-device; full-resolution fetched on demand.
- **Background generation**: DeepSearch and image generation continue server-side if app is backgrounded; push notification on completion.

## Permissions, Privacy, And Safety

| Permission | Purpose | Required/Optional |
|---|---|---|
| Camera | Image capture for analysis | Optional, requested on first use |
| Photo Library | Image upload for analysis | Optional, requested on first use |
| Notifications | Push for async generation results | Optional, prompted post-onboarding |
| Microphone | Voice input (future) | Optional, not in V1 |

### Privacy Controls

- Conversation data is not used for model training by default. Opt-in toggle available.
- Users can delete individual conversations, bulk-clear history, export all data (JSON), or delete account entirely.
- Data export delivered within 48 hours via secure download link.
- Account deletion is irreversible; 30-day grace period with cancellation option.

### Safety Controls

- Pre-generation prompt filter rejects disallowed image requests (real person likenesses, CSAM, extreme violence, self-harm instructions).
- Post-generation image classifier flags unsafe outputs before delivery.
- Text responses include refusal patterns for dangerous requests (weapons synthesis, self-harm methods, illegal activity guidance).
- User reporting flow with category selection (harmful content, misinformation, harassment, privacy violation, CSAM, other).
- Automated escalation for CSAM reports. Manual review queue for other categories.
- Minor protection: age gate at signup (13+ requirement); enhanced filtering for accounts flagged as under-18.

## Analytics And Monetization

### Analytics Events

- `session_start`, `session_end`, `message_sent`, `message_received`, `personality_toggled`, `image_generated`, `image_uploaded`, `deepsearch_initiated`, `deepsearch_completed`, `trending_viewed`, `subscription_prompted`, `subscription_completed`, `report_submitted`.

### Monetization

- Freemium model with Premium subscription (monthly/annual IAP).
- Free tier: limited messages/day (e.g., 10), text-only responses, standard personality, basic trending context.
- Premium tier: unlimited messages, image generation, image analysis, DeepSearch, personality toggle, priority inference queue.
- No ads in V1. Future consideration: sponsored trending topics (clearly labeled).

## Edge Cases

- **Rate limit hit (free tier)**: Show upgrade prompt with remaining cooldown timer. Do not silently drop messages.
- **Image generation safety rejection**: Return user-friendly explanation; do not reveal filter internals. Offer to rephrase.
- **DeepSearch timeout**: If exceeds 90 s, return partial results with "incomplete" flag and option to retry.
- **Streaming interruption**: Client reconnects with last event ID; server replays from checkpoint. If gap > 5 min, start fresh response.
- **Subscription lapse**: Gracefully downgrade to free tier; preserve conversation history; show re-subscribe prompt on premium feature access.
- **Concurrent sessions**: Last-write-wins for settings; conversations sync across devices via server state.
- **Trending data unavailable**: Show cached data with staleness indicator; degrade gracefully to non-contextual responses.
- **Large image upload**: Reject > 20 MB with clear size error. Compress client-side if between 10–20 MB.
- **Empty conversation list**: Show onboarding prompt suggestions rather than blank state.
- **Account deletion with active subscription**: Warn user to cancel subscription first; link to platform subscription management.
- **Personality mode confusion**: If user switches mode mid-conversation, show brief toast explaining tone change.

## Test Plan

- **Unit tests**: Message parsing, content-part rendering, personality-mode injection, subscription-state checks, safety-filter logic, SSE parser, retry/reconnect logic.
- **Integration tests**: Auth flow (OAuth + email), conversation CRUD, message streaming end-to-end, image generation pipeline, DeepSearch pipeline, IAP receipt validation, trending data fetch and cache.
- **UI tests**: All 11 screens render correctly, personality toggle state persists, subscription gate blocks premium features for free users, image generation progress and display, DeepSearch progress steps.
- **Safety tests**: Prompt filter blocks disallowed image requests, text refusal patterns fire for dangerous queries, report submission flow completes, minor-protection gates active.
- **Performance tests**: SSE stream renders tokens within 100 ms of receipt, trending cache hit rate > 80%, image thumbnail loads < 500 ms, DeepSearch progress updates every 3 s.
- **Offline tests**: Queued messages send on reconnect, cached conversations viewable offline, stale trending indicator displays.
- **Subscription tests**: Free-tier limits enforced, premium unlock immediate post-purchase, lapse downgrades gracefully, restore purchases works cross-device.

## Acceptance Criteria

- User can authenticate, send messages, and receive streaming responses.
- Personality mode toggle changes assistant tone in subsequent messages.
- Image generation produces and displays images for premium users; free users see upgrade prompt.
- Image upload triggers analysis response from assistant.
- DeepSearch returns structured research results with citations for premium users.
- Trending context displays current topics and integrates into assistant responses.
- Subscription gating correctly enforces free/premium feature boundaries.
- Safety filters block disallowed content before and after generation.
- Conversation history persists, is searchable, and is deletable.
- Data export and account deletion flows function end-to-end.
- All manual verification blockers are documented and feature-flagged.

## Open Questions

- What is the exact daily message limit for free-tier users on Grok? (Manual verification required — requires X Premium account testing.)
- Does Grok support voice input/output on mobile? (Manual verification required — not confirmed in public docs as of 2026-05-10.)
- What specific image generation styles/presets does Grok offer? (Manual verification required — requires Premium account.)
- How does Grok handle multi-language support and localization? (Manual verification required.)
- What is the exact DeepSearch result structure and citation format? (Manual verification required.)
- Does trending context vary by user region or X account follows? (Manual verification required.)

## Build Plan

### Phase 1 — Foundation (Weeks 1–2)

- Project scaffold (React Native or Flutter), navigation, design system.
- Auth flow: email/password + OAuth placeholder.
- Basic conversation CRUD and local persistence.
- Skeleton screens for all 11 views.

### Phase 2 — Core Chat (Weeks 3–4)

- SSE streaming message delivery and rendering.
- Multi-content-part message bubbles (text, code blocks).
- Personality mode toggle and per-message mode tracking.
- Conversation history list with search.

### Phase 3 — Image Features (Weeks 5–6)

- Image upload and analysis pipeline.
- Image generation endpoint integration with progress UI.
- Safety filter integration (pre-generation prompt check, post-generation classifier).
- Generated image display, save, and share.

### Phase 4 — DeepSearch and Trending (Weeks 7–8)

- DeepSearch initiation, progress tracking, and structured result rendering.
- Trending context fetch, cache, and display.
- Inline trending cards in assistant responses.
- Citation rendering and source linking.

### Phase 5 — Subscription and Monetization (Weeks 9–10)

- IAP integration (App Store + Play Store).
- Receipt validation backend.
- Feature gating enforcement across all premium features.
- Subscription management screen, restore purchases.

### Phase 6 — Safety, Polish, and Launch Prep (Weeks 11–12)

- Safety reporting flow and moderation queue.
- Data export and account deletion pipelines.
- Push notification integration.
- Performance optimization, offline hardening, accessibility audit.
- Final QA against acceptance criteria.

## Next Steps

- Resolve open questions via hands-on testing with an X Premium account on iOS and Android devices.
- Confirm social-data provider integration approach (licensed API vs. synthetic trending data for V1).
- Select AI inference provider for text generation and image generation backends.
- Create downstream implementation repository and seed with this spec.
- Begin Phase 1 scaffold.
