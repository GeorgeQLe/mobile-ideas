# Meta AI-Style Clone Spec

> Metadata
> - Inspiration app: Meta AI (by Meta)
> - Category: conversational AI assistant, image generation, social sharing, Meta ecosystem integration
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-10.
> - Verification basis: exact public marketplace listings, first-party product pages, and public feature claims.
> - Manual verification blockers: native iOS/Android screen capture, signed-in account lifecycle, Llama model streaming latency, Imagine image generation quality/limits, social sharing OAuth flows to Meta platforms, persona behavior tuning, subscription/billing flows, push notification payloads, cross-platform Meta integration behavior, and region/device-specific availability still require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, model weights, Meta platform integrations, ranking systems, persona libraries, and moderation tooling.

## Overview

Build an original mobile product inspired by Meta AI's public workflow: conversational AI assistant powered by large language models, AI image generation, social sharing to connected platforms, persona-driven conversations, real-time web information retrieval, and conversation history management. The clone must preserve the functional interaction model users expect while using original product language, independent model routing, original image generation pipelines, and jurisdiction-aware compliance.

The clone must not copy Meta branding, screenshots, marketing copy, protected UI artwork, Llama model weights, Meta platform APIs, proprietary ranking logic, or persona libraries. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first AI assistant with chat, image generation, persona selection, social sharing, web search, conversation history, and subscription management.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around model accuracy, response streaming, generated image safety, content moderation, billing transparency, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Meta-branded app or imply affiliation with Meta, Facebook, Instagram, WhatsApp, or any Meta subsidiary.
- Do not scrape Meta AI, reuse private APIs, replay network traffic, copy persona data, clone proprietary Llama inference infrastructure, or reproduce policy copy.
- Do not process production payments, identity documents, or subscription disputes without separate legal, compliance, privacy, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, notification, social-sharing, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/meta-ai/id6472838009 | iOS listing | Verified 2026-05-10 |
| Google Play | https://play.google.com/store/apps/details?id=com.facebook.metalite | Android listing | Verified 2026-05-10 |
| Meta AI Website | https://www.meta.ai | Product positioning, feature overview | Verified 2026-05-10 |
| Meta AI Product Pages | https://about.meta.com/ai/ | Feature descriptions, safety documentation | Verified 2026-05-10 |

## Detailed Design

The app is organized around five pillars: (1) conversational AI chat with SSE streaming, (2) AI image generation via an Imagine-style pipeline, (3) social sharing to connected platforms, (4) persona-driven conversation modes, and (5) real-time web information retrieval. The chat engine must support multi-turn context, inline image generation requests, citation rendering for web results, and seamless persona switching. Image generation must support text-to-image prompts, style controls, gallery management, and content safety filtering before display or sharing. Social sharing must handle OAuth to external platforms, preview rendering, and share-state tracking.

## Core User Journeys

1. **First launch and auth** -- user opens app, sees welcome screen, signs up via email/phone/social, completes onboarding with interest selection, lands on home feed.
2. **Text conversation** -- user taps new chat, types a prompt, sees streamed response token by token, continues multi-turn thread, bookmarks or shares result.
3. **Image generation** -- user types an image prompt or taps Imagine, views generation progress, receives image grid, selects favorite, saves to gallery or shares.
4. **Persona selection** -- user browses persona catalog, selects a persona, starts a conversation in that persona's style, switches persona mid-thread.
5. **Social sharing** -- user long-presses a response or image, selects share destination, authenticates to platform if needed, confirms share, sees confirmation.
6. **Web search** -- user asks a factual question, assistant fetches real-time web results, renders inline citations, user taps citation to view source.
7. **History and management** -- user opens conversation history, searches past threads, resumes a conversation, deletes or archives threads.

## Screen Inventory

| Screen | Key Elements | Nav |
|---|---|---|
| Welcome/Auth | Brand hero, sign-up/sign-in buttons, social auth, terms link | Entry |
| Home Feed | Suggested prompts, recent conversations, trending topics, persona carousel | Tab bar root |
| Chat Thread | Message bubbles, streaming indicator, input bar, attach/imagine button, persona badge | Push from feed |
| Image Generation (Imagine) | Prompt input, style selector, generation progress, image grid, save/share buttons | Modal or push |
| Social Sharing | Platform picker, preview card, caption input, share confirmation | Sheet |
| Search/Discovery | Search bar, topic categories, trending prompts, persona browse | Tab bar |
| Conversation History | Thread list, search, swipe to delete/archive, sort/filter | Tab bar |
| Profile/Settings | Account info, preferences, connected accounts, data export, delete account | Tab bar |
| Subscription | Plan comparison, billing info, payment method, receipt history | Push from settings |
| Support & Safety | Report form, block/mute, safety center link, FAQ | Push from settings |
| Notifications | Notification list, read/unread state, deep links to threads | Push from settings |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, phone, displayName, avatarUrl, authProvider, locale, createdAt, updatedAt |
| DeviceSession | id, userId, deviceFingerprint, pushToken, platform, appVersion, lastActiveAt |
| Conversation | id, userId, personaId, title, summary, messageCount, createdAt, updatedAt, archivedAt |
| Message | id, conversationId, role (user/assistant/system), contentParts[], tokenCount, createdAt |
| ContentPart | id, messageId, type (text/image/citation/code), body, mediaUrl, citationUrl, ordering |
| GeneratedImage | id, conversationId, messageId, prompt, stylePreset, imageUrl, thumbnailUrl, width, height, safetyScore, createdAt |
| SharedContent | id, userId, contentType (message/image), contentId, platform, shareUrl, status, sharedAt |
| Persona | id, name, description, avatarUrl, systemPrompt, category, isDefault, sortOrder |
| Subscription | id, userId, plan, status, platformProductId, expiresAt, renewalType, createdAt |
| NotificationPreference | id, userId, channel (push/email), category, enabled |
| SafetyReport | id, reporterUserId, contentType, contentId, reason, status, reviewedAt |
| AuditEvent | id, userId, action, resourceType, resourceId, metadata, createdAt |

## API And Backend Contracts

| Method | Path | Purpose |
|---|---|---|
| POST | /api/v1/auth/register | Create account |
| POST | /api/v1/auth/login | Email/phone login |
| POST | /api/v1/auth/social | Social OAuth login |
| POST | /api/v1/auth/refresh | Refresh access token |
| DELETE | /api/v1/auth/account | Delete account and data |
| GET | /api/v1/conversations | List conversations (paginated) |
| POST | /api/v1/conversations | Create conversation |
| GET | /api/v1/conversations/:id | Get conversation with messages |
| DELETE | /api/v1/conversations/:id | Delete conversation |
| PATCH | /api/v1/conversations/:id | Archive/rename conversation |
| POST | /api/v1/conversations/:id/messages | Send message, returns SSE stream |
| POST | /api/v1/imagine | Generate images from prompt |
| GET | /api/v1/imagine/:id/status | Poll image generation status |
| GET | /api/v1/imagine/gallery | List user's generated images |
| POST | /api/v1/share | Share content to external platform |
| GET | /api/v1/share/platforms | List connected sharing platforms |
| POST | /api/v1/share/connect | OAuth connect external platform |
| GET | /api/v1/personas | List available personas |
| GET | /api/v1/personas/:id | Get persona detail |
| GET | /api/v1/search/web | Real-time web search for citations |
| GET | /api/v1/search/prompts | Search suggested prompts |
| GET | /api/v1/settings | Get user settings |
| PATCH | /api/v1/settings | Update user settings |
| GET | /api/v1/subscriptions/plans | List subscription plans |
| POST | /api/v1/subscriptions | Create subscription |
| GET | /api/v1/subscriptions/current | Get current subscription |
| POST | /api/v1/safety/report | Submit safety report |
| GET | /api/v1/notifications | List notifications |
| PATCH | /api/v1/notifications/preferences | Update notification preferences |

## Realtime Push And Offline Behavior

- Chat responses stream via SSE on the message endpoint; the client renders tokens incrementally and commits the full message on stream close.
- Image generation uses polling with exponential backoff (1s, 2s, 4s) or an optional WebSocket status channel.
- Push notifications deliver new persona recommendations, generation completions, and account alerts via APNs/FCM.
- Offline: the client caches the last 50 conversations and their messages in local storage; new prompts queue locally and send on reconnect; image generation requires connectivity.
- Conflict resolution: last-write-wins for settings; server-authoritative for conversation state; queued messages replay in order on reconnect.

## Permissions Privacy And Safety

- Permissions requested: camera (optional, for profile photo), photo library (save generated images), notifications (push alerts), microphone (optional, voice input).
- Auth tokens stored in platform keychain; refresh tokens rotated on each use.
- All generated images pass through a content safety classifier before display; images scoring above the safety threshold are blocked with a user-facing explanation.
- PII is encrypted at rest; conversation data is deletable via account deletion endpoint; data export available within 48 hours of request.
- COPPA: age gate at sign-up; users under 13 are blocked; users 13-17 receive restricted persona access and stricter image generation filters.
- GDPR/CCPA: consent collection at sign-up, data portability endpoint, right-to-delete endpoint, cookie/tracking opt-out.

## Analytics And Monetization

- Events tracked: session_start, conversation_start, message_sent, message_streamed, image_generated, image_saved, content_shared, persona_selected, subscription_started, subscription_cancelled, safety_report_submitted.
- Monetization: freemium model with daily message/image limits on free tier; premium subscription unlocks unlimited messages, higher image generation limits, priority streaming, and exclusive personas.
- Subscription managed via App Store / Play Store in-app purchase; server validates receipts and provisions entitlements.

## Edge Cases

- Image generation timeout: if generation exceeds 60 seconds, show a retry prompt and log the failure; do not charge against the user's daily limit.
- Social sharing auth failure: if OAuth token is expired or revoked, prompt re-authentication before retrying the share.
- Model timeout: if the LLM does not begin streaming within 15 seconds, show a timeout message with retry option; implement circuit breaker after 3 consecutive timeouts.
- Persona switching mid-conversation: insert a system message noting the persona change; preserve conversation context but apply the new persona's system prompt from that point forward.
- Content moderation for generated images: if an image is flagged post-generation, remove it from the gallery, notify the user, and log a safety event; repeated violations trigger account review.
- Conversation length limits: cap conversations at 200 messages; prompt the user to start a new conversation when approaching the limit.
- Network transition: if the device switches from Wi-Fi to cellular mid-stream, the SSE connection drops and the client must reconnect and request a continuation from the last received token offset.
- Concurrent sessions: allow up to 3 active device sessions; the oldest session is deauthorized when a 4th device signs in.

## Test Plan

- Unit tests for message parsing, content part rendering, image prompt sanitization, persona prompt injection, and offline queue logic.
- Integration tests for auth flows (register, login, social, refresh, delete), conversation CRUD, message streaming end-to-end, image generation lifecycle, and social sharing OAuth.
- UI tests for onboarding flow, chat thread interaction, image generation modal, persona switching, and subscription purchase flow.
- Safety tests for image content classifier accuracy, age gate enforcement, PII scrubbing in logs, and rate-limit enforcement.
- Performance tests for SSE streaming latency (p95 under 200ms per token), image generation throughput, and offline queue replay under poor connectivity.
- Accessibility tests for VoiceOver/TalkBack on all screens, dynamic type support, and color contrast compliance.

## Acceptance Criteria

- User can register, sign in, and manage account lifecycle including deletion.
- User can create conversations, send messages, and receive streamed responses.
- User can generate images from text prompts, view results in a grid, and save to gallery.
- User can share messages and images to at least one external platform via OAuth.
- User can browse and select personas, and persona context is applied to subsequent messages.
- User can search the web via the assistant and see inline citations with tappable source links.
- Conversation history is searchable, archivable, and deletable.
- Free tier enforces daily message and image generation limits; premium subscription unlocks higher limits.
- Content safety classifier blocks unsafe generated images before display.
- All screens pass accessibility audit (VoiceOver, TalkBack, dynamic type, contrast).
- Offline mode caches recent conversations and queues outbound messages for replay.

## Open Questions

- Exact daily message and image generation limits for free tier need competitive benchmarking.
- Whether voice input should be included in V1 or deferred to V2.
- Optimal image generation model and hosting strategy for cost-effective inference at scale.
- Whether social sharing should support all Meta platforms (WhatsApp, Messenger, Instagram, Facebook) in V1 or start with a subset.
- Regional availability restrictions for image generation features (some jurisdictions may restrict AI-generated imagery).

## Build Plan

| Phase | Scope | Milestone |
|---|---|---|
| 1 | App shell, auth (email/phone/social), chat thread UI, SSE streaming, basic conversation CRUD | MVP chat functional |
| 2 | Image generation pipeline, Imagine UI, gallery, image save/download | Image generation live |
| 3 | Social sharing OAuth, share sheet, platform connectors, persona catalog and switching | Sharing and personas live |
| 4 | Web search integration, citation rendering, conversation history search, archive/delete | Search and history complete |
| 5 | Subscription plans, in-app purchase, receipt validation, entitlement gating, billing UI | Monetization live |
| 6 | Content safety classifier, age gate, accessibility audit, safety reporting, performance tuning | Safety and accessibility complete |

## Next Steps

- Verify Apple App Store and Google Play listing URLs are current and extract latest feature claims.
- Set up downstream implementation repo (private) and seed with this spec under `docs/source-specs/`.
- Begin Phase 1 implementation: app shell, auth, chat thread, and SSE streaming.
- Procure lawful test accounts for manual verification of blocked features.
- Schedule legal review for social sharing OAuth flows and image generation content policies.
