# You.com-Style Clone Spec

> Metadata
> - Inspiration app: You.com
> - Category: AI search engine, source-cited answers, multi-mode chat, custom AI agents
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-10.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, and public feature claims.
> - Manual verification blockers: native iOS/Android screen capture, signed-in account lifecycle, SSE streaming latency across chat modes, code sandbox execution limits, agent builder workflows, citation accuracy against live web indexes, subscription/billing restore flows, push notification payloads, and region/device-specific behavior still require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, search indexes, ranking systems, model weights, provider integrations, and agent marketplace curation.

## Overview

Build an original mobile product inspired by You.com's public workflow: AI-powered search with inline source citations, multi-mode chat (Smart, Genius, Research), custom AI agent creation and marketplace, code generation with sandbox execution, privacy-focused search, and multi-model support. The clone must preserve the functional interaction model users expect while using original product language, independent search infrastructure, original agent marketplace logic, and jurisdiction-aware compliance.

The clone must not copy You.com branding, screenshots, marketing copy, protected UI artwork, search index data, agent marketplace data, private APIs, proprietary ranking algorithms, or model provider agreements. Any feature marked manual verification required must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms behavior.

## Goals

- Provide a mobile-first AI search and chat platform with source-cited results, multi-mode conversations, agent creation, code execution, and subscription management.
- Replace discovery placeholders with exact public sources and translate those sources into implementation-ready product, data, API, safety, analytics, and test requirements.
- Preserve category trust expectations around citation accuracy, search privacy, response streaming, agent quality, code execution safety, billing transparency, and privacy rights.
- Produce concrete screens, entities, API contracts, realtime/offline behavior, analytics events, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a You.com-branded app or imply affiliation with You.com or any model provider.
- Do not scrape You.com, reuse private APIs, replay network traffic, copy search index data, copy agent content, clone proprietary ranking/citation systems, or reproduce policy copy.
- Do not process production payments, identity documents, or subscription disputes without separate legal, compliance, privacy, and provider review.
- Do not claim exact App Store, Play Store, native-device, checkout, account, notification, or regional parity until manual verification blockers are resolved.
- Do not build runtime application code in this repository; this repo remains the planning and specification source.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/you-com-ai-search-assistant/id1611646910 | iOS listing | Verified 2026-05-10 |
| Google Play | https://play.google.com/store/apps/details?id=com.you.app | Android listing | Verified 2026-05-10 |
| You.com Website | https://you.com | Product positioning, feature overview | Verified 2026-05-10 |
| You.com Blog | https://blog.you.com | Feature announcements, mode descriptions | Verified 2026-05-10 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position You.com as a privacy-focused AI search engine that delivers source-cited answers, multi-mode chat with varying depth/cost tradeoffs, custom agent building, and code generation.
- The V1 must separate search queries, citation graphs, chat conversations, agent definitions, code executions, and subscription state into explicit data lifecycles.
- Search results must render inline source citations with numbered references, snippet previews, and clickable source links so users can verify claims.
- Chat modes must expose Smart (fast, concise), Genius (deeper reasoning, premium models), and Research (multi-step, multi-source synthesis) with clear mode indicators and credit cost visibility.
- Custom agents must support system prompts, model selection, tool access configuration, visibility settings, and marketplace publishing.
- Code generation must include a sandboxed execution environment with language detection, output rendering, timeout enforcement, and resource limits.
- Content safety must address prompt injection, jailbreak attempts, harmful content generation, citation fabrication, and agent abuse.
- Manual verification remains required for exact streaming token delivery, citation source freshness, code sandbox resource limits, agent marketplace ranking, and subscription restore flows.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Keep all user-generated content, AI outputs, agent configurations, code executions, and payment state under explicit data ownership and deletion rules.
- Model every LLM provider and search backend as an adapter with feature flags, timeout behavior, cost tracking, and provider-specific error mapping.
- Keep entitlement and mode-access checks server-authoritative; the client may cache plan summaries but cannot grant premium mode access alone.
- Store only normalized event codes in analytics; raw queries, responses, code outputs, and payment details are disallowed in logs.
- Include localization, accessibility, age-gate, and regional availability states in route and API schemas.

## Core User Journeys

- New user installs the app, reviews onboarding, creates or restores an account, and reaches the search home surface.
- User enters a search query and receives an AI-synthesized answer with numbered inline citations and source cards.
- User taps a citation to view the source page, or expands the sources panel to browse all references.
- User switches to YouChat and selects Smart mode for a quick conversational answer with streaming delivery.
- User upgrades to Genius mode for a complex question requiring deeper reasoning and premium model access.
- User initiates a Research mode query that performs multi-step web research and delivers a structured report with citations.
- User creates a custom agent with a system prompt, selects tools and model, and publishes it to the marketplace.
- User browses the agent marketplace, selects an agent, and starts a conversation with it.
- User generates code in chat, runs it in the sandbox, and iterates on the output.
- User manages subscription, views usage, and purchases additional credits when limits are reached.
- User reports unsafe content, blocks an agent, and receives safety feedback.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account creation, consent | taps, text, OAuth, deep links | empty, loading, signed-out, restricted | offline, auth failure, blocked region |
| Search Home | Primary search entry point | search query, voice input, mode selector | empty, loading, suggestions | offline, service outage |
| Search Results | AI answer with source citations | taps, scroll, citation expansion | loading, streaming, loaded, paginated | offline, no results, citation failures |
| YouChat Thread | Multi-mode conversational chat | text, attachments, mode switch | empty, streaming, loaded, error | offline queue, model timeout, credits exhausted |
| Agent Builder | Create and configure custom agents | text, model selector, tool toggles | draft, published, suspended | validation errors, quota exceeded |
| Agent Marketplace | Browse and discover agents | search, filters, taps | empty, loading, loaded, paginated | offline, no results, stale data |
| Code Sandbox | Execute and view code output | code input, run, language selector | empty, running, completed, error | timeout, resource limit, unsupported language |
| History/Saved | Search and chat history | search, filters, delete | empty, loading, loaded | offline, no results |
| Profile/Settings | Account, privacy, preferences | toggles, taps, text | loaded, saving | save failure, sync conflict |
| Subscription | Plans, credits, billing | taps, purchase, restore | free, paid, expired, restoring | purchase failure, restore failure |
| Support & Safety | Reports, blocks, help | text, category, submit | empty, submitted, resolved | offline, rate limited |

## Data Model

- `User`: identity, email, OAuth providers, locale, region, account status, consent state, deletion/export state.
- `DeviceSession`: platform, app version, auth token state, notification token, last active timestamp.
- `SearchQuery`: user reference, query text, mode (search/smart/genius/research), created timestamp, result reference.
- `SearchResult`: query reference, AI answer text, model used, token count, created timestamp, citation list reference.
- `SourceCitation`: result reference, ordinal position, source URL, domain, title, snippet, freshness timestamp, verification status.
- `Conversation`: user reference, agent reference (nullable), mode, title, created/updated timestamps, message count, pinned state.
- `Message`: conversation reference, role (user/assistant/system), content parts, token count, model used, citations, created timestamp, feedback state.
- `ContentPart`: message reference, type (text/image/file/code/citation-ref), body or media reference, rendering hints.
- `CustomAgent`: creator reference, name, description, system prompt, model selection, tool permissions, visibility, usage count, published state.
- `AgentConfig`: agent reference, temperature, max tokens, allowed tools (web search, code exec, image gen), knowledge sources.
- `Subscription`: user reference, tier (free/pro/team), platform owner, status, period start/end, credit balance, auto-renew state.
- `SafetyReport`: reporter, target (message/agent/search result), category, evidence, status, moderator notes, resolution.
- `AuditEvent`: append-only sensitive account, privacy, billing, moderation, safety, and agent lifecycle changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/oauth`, `DELETE /auth/session`: device-scoped authentication with OAuth providers and abuse throttles.
- `POST /search` (SSE streaming response), `GET /search/suggestions?q=`: search with mode selection, streaming AI answer, and inline citation delivery; suggestions for autocomplete.
- `GET /search/:id/citations`: paginated citation list for a completed search result with source metadata.
- `GET /conversations?cursor=&agent=`, `POST /conversations`, `DELETE /conversations/:id`: conversation lifecycle with mode and agent scoping.
- `POST /conversations/:id/messages` (SSE streaming response), `GET /conversations/:id/messages?cursor=`: message send with SSE streaming for token and citation delivery.
- `POST /agents`, `GET /agents?cursor=&category=&sort=`, `GET /agents/:id`, `PATCH /agents/:id`, `DELETE /agents/:id`: agent CRUD with marketplace discovery and creator authorization.
- `POST /code/execute`: sandboxed code execution with language, timeout, and resource limits; returns stdout, stderr, and exit code.
- `GET /history?cursor=&type=`, `DELETE /history/:id`: unified search and chat history with type filtering and bulk deletion.
- `GET /settings`, `PATCH /settings`: user preferences, privacy controls, and notification configuration.
- `GET /subscriptions/current`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /credits/purchase`: subscription and credit management.
- `POST /reports`, `POST /blocks`: trust-and-safety lifecycle with category, evidence, and moderator audit trails.

## Realtime Push And Offline Behavior

- Stream search answers and chat responses via SSE with token-level granularity, inline citation markers, typing indicators, and graceful timeout/reconnect handling.
- Cache the search home, recent history, agent marketplace, settings, and subscription state for offline reads.
- Queue user search queries and messages locally when offline with retry metadata; block irreversible actions (deletion, purchases) while offline.
- Realtime updates must reconcile against server state after reconnect to avoid duplicate messages or stale citation data.
- Push notifications must be opt-in, category-scoped (research completions, agent updates, credit alerts), and free of raw content by default.
- Background work must tolerate app termination, token expiry, OS permission revocation, and provider timeouts.
- Deleted or suspended agents must be removed from caches and active conversation lists consistently.

## Permissions Privacy And Safety

- Treat citation fabrication and hallucinated sources as a launch-blocking review area with verification, flagging, and audit coverage.
- Treat prompt injection and jailbreak attempts as a launch-blocking review area with detection, mitigation, and audit coverage.
- Treat code sandbox escapes and resource abuse as a launch-blocking review area with sandboxing, limits, and monitoring.
- Treat minor access to unfiltered search or chat as a launch-blocking review area with age-gate and safe-search enforcement.
- Request camera, photos, files, microphone, and notifications only when the user invokes a feature that needs them.
- Provide permission-denied fallbacks, settings education, no dark patterns, and no silent re-prompts.
- Provide user-visible privacy policy, terms, data export, delete account, report abuse, block, and support escalation paths.
- Minimize sensitive data in analytics, crash reports, and model provider logs; never log raw queries, responses, or code in analytics pipelines.
- Include age, region, regulated content, and accessibility review before launch.

## Analytics And Monetization

- Track privacy-safe lifecycle events: onboarding completed, search performed, citation tapped, mode selected, conversation started, message sent, agent created, agent used, code executed, subscription changed, credit purchased, report submitted.
- Every event must use stable object types and failure codes, not raw queries, responses, or private identifiers.
- Monetization tiers: free (limited daily searches and Smart mode), Pro (higher limits, Genius and Research modes, premium models, priority), Team (shared workspace, admin controls, volume credits).
- Credit system must expose balance, usage rate, mode-specific costs, and top-up paths transparently.
- Billing tests must cover free, pro, team, expired, canceled, refunded, restored, and credit-purchased states.

## Edge Cases

- First launch offline, unsupported OS, blocked region, underage user, expired session, suspended account, or service outage.
- Citation verification failure: source URL returns 404, content has changed since citation was generated, or domain is unreachable.
- Search index latency: query returns stale results, new sources not yet indexed, or index temporarily unavailable.
- Agent creation validation: system prompt exceeds length limit, selected model unavailable, tool combination invalid, or duplicate agent name.
- Code sandbox timeout: execution exceeds time limit, infinite loop detection, excessive memory usage, or unsupported language runtime.
- Mode switching mid-conversation: user changes from Smart to Genius while a response is streaming, requiring graceful transition.
- Duplicate search sends from retry, stale optimistic UI, SSE reconnect delivering duplicate tokens, and app termination during stream.
- Credits exhausted mid-response during Genius or Research mode, requiring graceful degradation or upgrade prompt.
- Agent deleted or suspended while user has active conversation, agent creator account banned with published agents still cached.

## Test Plan

- Unit tests for validation, state machines, credit calculations, citation parsing, streaming parsers, code sandbox limits, and privacy-safe analytics construction.
- Contract tests for every API response shape, SSE event format, error codes, pagination, citation structures, and webhook idempotency.
- Integration tests for auth, search with citations, chat in each mode, agent create/publish/use, code execution, billing restore, and account deletion.
- Offline tests for cached reads, queued queries/messages, blocked sensitive writes, reconnect reconciliation, and deleted-object cache cleanup.
- Streaming tests for token delivery order, inline citation marker delivery, partial failure recovery, timeout handling, and SSE reconnect without duplication.
- Citation tests for source URL validation, freshness checks, ordinal consistency, and fabrication detection.
- Safety tests for prompt injection detection, jailbreak mitigation, code sandbox escape prevention, age-gate enforcement, and report submission.
- Privacy tests for data export, deletion, analytics redaction, search history purge, and cache cleanup.
- Billing tests for free, pro, team, expired, canceled, refunded, restored, and credit-purchased states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, color contrast, and streaming content announcements.
- Manual verification tests for native screenshots, paid purchase/restore, push payloads, streaming latency, citation accuracy, and code sandbox behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary You.com assets, private APIs, search index data, model provider agreements, or agent marketplace content.
- New and returning users can complete onboarding, search, citation browsing, multi-mode chat, agent creation, code execution, subscription, and data lifecycle paths.
- All documented entities have ownership, authorization, lifecycle states, visibility rules, deletion/export behavior, and audit coverage.
- Streaming, offline, citation, code sandbox, notification, billing, privacy, safety, and agent behavior have deterministic API contracts and failure codes.
- Category-specific launch blockers are either resolved with evidence or remain behind explicit feature flags and acceptance-test blockers.
- Manual verification blockers are preserved until lawful hands-on evidence confirms exact native behavior.

## Open Questions

- Which downstream implementation repository, framework, and provider stack will own this clone?
- Which LLM providers and search index backends are available for multi-model and citation-capable search at launch?
- Which first-party sources should be rechecked immediately before build start because mobile listings and product pages change frequently?
- What credit pricing and tier limits should each mode (Smart, Genius, Research) use?
- Which paid, account-linked, age-gated, regional, or device-specific flows can be lawfully verified with available test accounts/devices?
- What code sandbox runtime languages and resource limits should the V1 support?

## Build Plan

- Phase 1: scaffold app shell, auth/session model, search home, basic search with streaming AI answer, settings/legal links, privacy-safe analytics, and accessibility baseline.
- Phase 2: add source citations with inline references, citation panel, source card rendering, search history, and offline cache/reconnect.
- Phase 3: add YouChat with Smart/Genius/Research modes, conversation management, mode switching, streaming per mode, and credit cost indicators.
- Phase 4: add agent builder, agent configuration, marketplace browsing/search, agent-scoped conversations, and creator profile surfaces.
- Phase 5: add code sandbox with language detection, execution, output rendering, timeout enforcement, and resource limits.
- Phase 6: add subscription/checkout flows, credit purchase, billing restore, tier-gated mode access, and billing regression tests.
- Phase 7: complete safety mitigations (citation verification, prompt injection, code sandbox escapes, age-gate), accessibility pass, performance validation, policy review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and product page URLs immediately before implementation kickoff.
- Identify and secure LLM provider and search index agreements for multi-model and citation-capable search.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
