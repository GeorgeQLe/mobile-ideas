# Todo — Mobile Ideas

> Current phase: 11 of 27 — Implementation: AI & Assistants (~27 Apps × 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 11: Implementation — AI & Assistants (~27 Apps × 5 Variants)

### Goal

Build all five variants for every app in the AI & Assistants category cluster to functional completion, passing the benchmarking harness.

### Scope

- Apps: AI assistants (ChatGPT, Gemini, Claude, Copilot, etc.), AI companions, and related AI-first apps.
- Per app: implement all five variants (React Native, Flutter, Expo, Native iOS, Native Android) following the build plan from Phase 9.
- Each variant must pass lint, type check, test suite, and benchmarking harness from Phase 10.
- Functional parity with the source spec — all screens, flows, edge cases, and data contracts implemented with original code and assets.

### Acceptance Criteria

- [ ] All ~27 apps have 5 working variants each (~135 app builds).
- [ ] Every variant passes CI (build, lint, type check, tests).
- [ ] Every variant has benchmark scores recorded in the scorecard.
- [ ] No proprietary assets, no trademark infringement, no copied code.
- [ ] Manual verification blockers documented but not falsely claimed as resolved.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low (each app is an independent GitHub repo)
**Review gates:** CI passing, benchmark scores, spec compliance, legal/asset review

**Subagent lanes:** none (per-step lanes defined at execution time — each step scaffolds or implements one app in its own downstream repo with no cross-repo writes)

### App Inventory

| # | App | Repo | Spec | Tier |
|--:|-----|------|------|------|
| 001 | ChatGPT | `GeorgeQLe/chatgpt-mobile-clone` | `specs/batch-01/001-chatgpt.md` | Pilot (full spec) |
| 002 | Claude | `GeorgeQLe/claude-mobile-clone` | `specs/batch-01/002-claude.md` | Pilot (full spec) |
| 003 | Perplexity | `GeorgeQLe/perplexity-mobile-clone` | `specs/batch-01/003-perplexity.md` | Pilot (full spec) |
| 004 | Character.AI | `GeorgeQLe/character-ai-mobile-clone` | `specs/batch-01/004-character-ai.md` | Pilot (full spec) |
| 005 | Replika | `GeorgeQLe/replika-mobile-clone` | `specs/batch-01/005-replika.md` | Pilot (full spec) |
| 201 | Poe | `GeorgeQLe/poe-mobile-clone` | `specs/batch-03/201-poe.md` | Batch (Draft 1) |
| 202 | Gemini | `GeorgeQLe/gemini-mobile-clone` | `specs/batch-03/202-gemini.md` | Batch (Draft 1) |
| 203 | Microsoft Copilot | `GeorgeQLe/microsoft-copilot-mobile-clone` | `specs/batch-03/203-microsoft-copilot.md` | Batch (Draft 1) |
| 204 | Grok | `GeorgeQLe/grok-mobile-clone` | `specs/batch-03/204-grok.md` | Batch (Draft 1) |
| 205 | DeepSeek | `GeorgeQLe/deepseek-mobile-clone` | `specs/batch-03/205-deepseek.md` | Batch (Draft 1) |
| 206 | Meta AI | `GeorgeQLe/meta-ai-mobile-clone` | `specs/batch-03/206-meta-ai.md` | Batch (Draft 1) |
| 207 | You.com | `GeorgeQLe/you-com-mobile-clone` | `specs/batch-03/207-you-com.md` | Batch (Draft 1) |
| 208 | Pi | `GeorgeQLe/pi-mobile-clone` | `specs/batch-03/208-pi.md` | Batch (Draft 1) |
| 209 | Phind | `GeorgeQLe/phind-mobile-clone` | `specs/batch-03/209-phind.md` | Batch (Draft 1) |
| 210 | HuggingChat | `GeorgeQLe/huggingchat-mobile-clone` | `specs/batch-03/210-huggingchat.md` | Batch (Draft 1) |
| 211 | Wysa | `GeorgeQLe/wysa-mobile-clone` | `specs/batch-03/211-wysa.md` | Batch (Draft 1) |
| 212 | ELSA Speak | `GeorgeQLe/elsa-speak-mobile-clone` | `specs/batch-03/212-elsa-speak.md` | Batch (Draft 1) |
| 213 | OtterPilot | `GeorgeQLe/otterpilot-mobile-clone` | `specs/batch-03/213-otterpilot.md` | Batch (Draft 1) |
| 214 | Grammarly Keyboard | `GeorgeQLe/grammarly-keyboard-mobile-clone` | `specs/batch-03/214-grammarly-keyboard.md` | Batch (Draft 1) |
| 215 | Wordtune | `GeorgeQLe/wordtune-mobile-clone` | `specs/batch-03/215-wordtune.md` | Batch (Draft 1) |
| 216 | QuillBot | `GeorgeQLe/quillbot-mobile-clone` | `specs/batch-03/216-quillbot.md` | Batch (Draft 1) |
| 217 | Ask AI | `GeorgeQLe/ask-ai-mobile-clone` | `specs/batch-03/217-ask-ai.md` | Batch (Draft 1) |
| 218 | Genie | `GeorgeQLe/genie-mobile-clone` | `specs/batch-03/218-genie.md` | Batch (Draft 1) |
| 219 | Monica | `GeorgeQLe/monica-mobile-clone` | `specs/batch-03/219-monica.md` | Batch (Draft 1) |
| 220 | Notion AI | `GeorgeQLe/notion-ai-mobile-clone` | `specs/batch-03/220-notion-ai.md` | Batch (Draft 1) |
| 221 | Forefront AI | `GeorgeQLe/forefront-ai-mobile-clone` | `specs/batch-03/221-forefront-ai.md` | Batch (Draft 1) |
| 222 | Consensus | `GeorgeQLe/consensus-mobile-clone` | `specs/batch-03/222-consensus.md` | Batch (Draft 1) |

### Implementation

- [x] Step 11.1: Scaffold multi-variant structure across all 27 AI & Assistants repos
  - Files: all 27 downstream repos listed in App Inventory
  - For each repo: create `variants/` directories (react-native, flutter, expo, ios-native, android-native) with placeholder READMEs, `shared/` directories (assets, api-contracts, test-fixtures) with `.gitkeep`, and copy 6 CI/CD workflow templates from `mobile-ideas/templates/ci/` into `.github/workflows/`.
  - Disable GitHub Actions on each repo (Actions disabled until implementation is ready).
  - Serial execution per CLAUDE.md seeding constraints (30s minimum between repos).
  - Verify via `gh api`: variant READMEs exist, workflow files exist, shared dirs exist, visibility remains PRIVATE.

- [x] Step 11.2: Implement pilot app 1 — ChatGPT clone (all 5 variants)
  - Files: `GeorgeQLe/chatgpt-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/001-chatgpt.md` and build plan `docs/plans/README.md` from the downstream repo.
  - Implement all screens, navigation, data models, API contracts, and edge cases per spec across all 5 variants.
  - Shared patterns to establish: LLM streaming response rendering, conversation thread persistence, multimodal input (text/image/file), voice mode UI, memory/data controls, model picker, subscription gates.
  - Each variant must: compile, pass lint, pass type check, have basic test coverage.
  - Document any spec gaps or manual verification blockers as open questions.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  A ChatGPT-style mobile AI assistant app across 5 variant stacks. The source spec is at `specs/batch-01/001-chatgpt.md` in the `mobile-ideas` repo. The downstream repo is `GeorgeQLe/chatgpt-mobile-clone` (PRIVATE, scaffold already in place with variant dirs, shared dirs, and CI workflows).

  **Spec Summary (from `001-chatgpt.md`):**
  - 10 screens: Welcome/Auth, Assistant Home, Chat Thread, Composer Attachment Sheet, Voice Session, History Search, Memory & Personalization, Data Controls, Subscription, Support & Safety, Settings.
  - 14 data models: User, DeviceSession, Conversation, Message, ContentPart, Attachment, VoiceSession, MemoryRecord, PersonalizationSettings, Entitlement, SafetyReport, UsageLimit, AuditEvent.
  - 20+ API endpoints for auth, conversations, messages, streaming, uploads, voice, settings, memories, data export, entitlements, billing, safety.
  - Build plan phases: (1) app shell + auth + home + chat + streaming, (2) history/search + temp chat + data controls + memory, (3) image/file uploads, (4) voice sessions, (5) entitlements/billing, (6) safety/accessibility/offline.

  **Per-Variant File Structure:**
  Each variant dir (`variants/{react-native,flutter,expo,ios-native,android-native}/`) gets:
  - App entry point, navigation setup, screen components for all 10 screens.
  - Data models / types matching the spec's 14 entities.
  - API service layer with typed contracts for all endpoints.
  - State management (Redux/Zustand for RN/Expo, Riverpod for Flutter, SwiftUI state for iOS, ViewModel for Android).
  - Streaming message renderer (SSE/WebSocket consumer).
  - Basic test suite (unit tests for data models, state machines; integration tests for API contracts).
  - README updated from "scaffold" to "V1 implementation".

  **Approach:**
  1. Clone the downstream repo locally.
  2. Implement React Native variant first (establishes patterns for shared architecture).
  3. Port to Flutter, Expo, iOS Native, Android Native variants in sequence.
  4. For each variant: create project structure, implement all screens, wire navigation, add data models, create API service stubs, add streaming renderer, write tests.
  5. Commit each variant as a separate commit, push all at end.
  6. Verify each variant compiles and tests pass.

  **Key Technical Decisions:**
  - Use mock/stub API backend — no real AI provider integration in V1 scaffold (provider selection is an open question in the spec).
  - SSE streaming simulation for message rendering tests.
  - Auth flow uses placeholder — real OAuth/social auth deferred.
  - Subscription/entitlement states modeled but not connected to real payment providers.
  - Safety policy enforcement is client-side classification stubs.

  **Constraints:**
  - Serial execution within the repo (one variant at a time).
  - Must not copy OpenAI branding, plan names, model names, or proprietary UI artwork.
  - Manual verification blockers (native screenshots, real subscription purchase, push notifications, real-device voice) remain documented as open questions.

  **Acceptance Criteria:**
  - All 5 variants compile without errors.
  - All 5 variants pass lint and type check.
  - All 5 variants have basic test suites that pass.
  - All 10 screens have component stubs with navigation wiring.
  - All 14 data models are typed and used in state management.
  - API service layer has typed contracts for all documented endpoints.
  - Streaming message renderer handles token events, completion, and error states.
  - Variant READMEs updated from "scaffold" to "V1 implementation" status.
  - No proprietary assets, no trademark infringement, no copied code.

  **Execution Profile:**
  - Parallel mode: serial (one variant at a time within the single downstream repo)
  - Integration owner: main agent
  - Test strategy: tests-after (write tests as part of implementation)
  - Conflict risk: none (single repo, single branch)

  **Ship-one-step handoff contract:** Implement only Step 11.2, validate it (all 5 variants compile, lint, typecheck, tests pass), then run `/ship` when done.

  **Next work:** Step 11.2 — Implement ChatGPT clone across all 5 variants
  **Recommended next command:** `/run`

- [x] Step 11.3: Implement pilot app 2 — Claude clone (all 5 variants)
  - Files: `GeorgeQLe/claude-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/002-claude.md` and build plan.
  - Implement: conversational threads, file/context ingestion, project organization, artifact-style outputs, privacy controls, usage limits, subscriptions, safety review gates.
  - Reuse streaming and conversation patterns from Step 11.2; extend with project/workspace concepts and artifact rendering.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  A Claude-style mobile AI assistant app across 5 variant stacks. The source spec is at `specs/batch-01/002-claude.md` in the `mobile-ideas` repo. The downstream repo is `GeorgeQLe/claude-mobile-clone` (PRIVATE, scaffold already in place with variant dirs, shared dirs, and CI workflows).

  **Spec Summary (from `002-claude.md`):**
  - 11 screens: Welcome/Auth, Assistant Home, Chat Thread, Attachment & File Picker, Voice Dictation, Projects/Knowledge, Artifacts Preview, History Search, Privacy Controls, Subscription, Support & Safety.
  - 12 data models: User, DeviceSession, Conversation, Message, Attachment, ProjectSpace, GeneratedArtifact, VoiceDraft, PrivacySetting, Entitlement, SafetyReport, AuditEvent.
  - 20+ API endpoints for auth, account/settings, threads, messages, uploads, search, reports/blocks/mutes, notifications, entitlements/billing, data export/deletion, support.
  - Build plan phases: (1) app shell + auth + home + streaming, (2) conversation + uploads + drafts + offline, (3) search + history + projects + artifacts + notifications, (4) privacy + export + deletion, (5) entitlements/billing, (6) safety + accessibility.

  **Distinct from ChatGPT clone (Step 11.2):**
  - ProjectSpace entity: workspace/knowledge base with uploaded documents, context ingestion
  - GeneratedArtifact entity: structured outputs (code, documents, visualizations) rendered in preview pane
  - VoiceDraft entity: dictation-first input (not real-time voice conversation like ChatGPT)
  - PrivacySetting as standalone entity (not embedded in PersonalizationSettings)
  - No MemoryRecord, UsageLimit, ContentPart, VoiceSession (different model shape)
  - Search endpoint with suggestions (`POST /search`, `GET /search/suggestions`)
  - Block/mute lifecycle (`POST /blocks`, `POST /mutes`)

  **Per-Variant File Structure:**
  Each variant dir (`variants/{react-native,flutter,expo,ios-native,android-native}/`) gets:
  - App entry point, navigation setup, screen components for all 11 screens.
  - Data models / types matching the spec's 12 entities.
  - API service layer with typed contracts for all endpoints.
  - State management (Zustand for RN/Expo, Riverpod for Flutter, @Observable for iOS, ViewModel for Android).
  - Streaming message renderer (SSE/WebSocket consumer — reuse patterns from ChatGPT clone).
  - Artifact preview renderer (code blocks, markdown, structured output).
  - Basic test suite (unit tests for data models, state machines; integration tests for API contracts).
  - README updated from "scaffold" to "V1 implementation".

  **Approach:**
  1. Clone the downstream repo to `/tmp/claude-mobile-clone`.
  2. Create shared API contracts and test fixtures in `shared/`.
  3. Implement all 5 variants in parallel (independent directories, different languages).
  4. For each variant: create project structure, implement all screens, wire navigation, add data models, create API service stubs, add streaming + artifact renderer, write tests.
  5. Commit each variant as a separate commit, push all at end.
  6. Verify key files exist on remote via `gh api`.

  **Key Technical Decisions:**
  - Mock/stub API backend — no real AI provider integration in V1.
  - SSE streaming patterns reused from ChatGPT clone with same event protocol.
  - Artifact preview renders markdown/code blocks with syntax highlighting stubs.
  - ProjectSpace is a collection of conversations + uploaded documents.
  - Voice dictation is input-only (speech-to-text stub), not bidirectional voice mode.
  - Auth flow uses placeholder — real OAuth/social auth deferred.

  **Constraints:**
  - Serial commit, parallel implementation via subagents.
  - Must not copy Anthropic/Claude branding, plan names, model names, or proprietary UI artwork.
  - Manual verification blockers (native screenshots, paid flows, push notifications, dictation behavior) remain documented as open questions.

  **Acceptance Criteria:**
  - All 5 variants have complete source code pushed to `GeorgeQLe/claude-mobile-clone`.
  - All 11 screens have component stubs with navigation wiring.
  - All 12 data models are typed and used in state management.
  - API service layer has typed contracts for all documented endpoints.
  - Streaming message renderer handles token events, completion, and error states.
  - Artifact preview renderer handles code, markdown, and structured output types.
  - Variant READMEs updated from "scaffold" to "V1 implementation" status.
  - No proprietary assets, no trademark infringement, no copied code.

  **Execution Profile:**
  - Parallel mode: serial (one variant at a time within the single downstream repo, but subagents can parallelize)
  - Integration owner: main agent
  - Test strategy: tests-after (write tests as part of implementation)
  - Conflict risk: none (single repo, single branch)

  **Ship-one-step handoff contract:** Step 11.3 complete — implemented Claude clone across all 5 variants in `GeorgeQLe/claude-mobile-clone`. 230 files, 6 commits, all pushed and verified (PRIVATE, key files confirmed via `gh api`).

  **Next work:** Step 11.4 — Implement Perplexity clone across all 5 variants
  **Recommended next command:** `/run`

- [x] Step 11.4: Implement pilot app 3 — Perplexity clone (all 5 variants)
  - Files: `GeorgeQLe/perplexity-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/003-perplexity.md` and build plan.
  - Implement: query threads, cited source cards, follow-up exploration, collections, freshness controls, provider-backed retrieval, subscription gates, citation-quality tests.
  - Distinct pattern: citation/source attribution UI, search-first rather than chat-first paradigm.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  A Perplexity-style mobile AI search/answer app across 5 variant stacks. The source spec is at `specs/batch-01/003-perplexity.md` in the `mobile-ideas` repo. The downstream repo is `GeorgeQLe/perplexity-mobile-clone` (PRIVATE, scaffold already in place with variant dirs, shared dirs).

  **Spec Summary (from `003-perplexity.md`):**
  - 12 screens: Welcome/Auth, Ask Home, Answer Thread, Source Detail, Discover, Library, Voice Search, Attachment Prompt, Assistant Actions, Account & Data, Subscription, Support.
  - 12 data models: User, DeviceSession, SearchThread, Answer, Citation, SourceDocument, LibraryItem, AssistantAction, Upload, Entitlement, DataDeletionRequest, AuditEvent.
  - 20+ API endpoints for auth, account/settings, threads, messages, uploads, search/suggestions, reports/blocks/mutes, notifications, entitlements/billing, data export/deletion, support.
  - SSE streaming events: token, completion, error, citation_found, source_loaded, search_progress.

  **Distinct from Claude clone (Step 11.3):**
  - SearchThread entity: search-first paradigm with query mode (quick/pro/deep research)
  - Citation entity: source URL, title, snippet, relevance score, retrieval timestamp
  - SourceDocument entity: full source page metadata, domain, favicon, content type
  - LibraryItem entity: saved threads/answers for personal research library
  - AssistantAction entity: scheduling, drafting, booking integrations (opt-in)
  - DataDeletionRequest entity: self-serve deletion with 30-day window
  - Source Detail screen: full source view with citation context
  - Discover screen: public/community trending topics and curated content
  - Library screen: saved research, collections, history
  - Assistant Actions screen: integration-based actions
  - No ProjectSpace, GeneratedArtifact, or VoiceDraft (different model shape)
  - Citation-card UI pattern: every answer carries source attribution cards with domain, title, snippet

  **Per-Variant Implementation:**
  Each variant (`react-native`, `flutter`, `expo`, `ios-native`, `android-native`) gets:
  - App entry point + navigation (all 12 screens wired)
  - Typed data models for all 12 entities
  - API service layer with typed contracts
  - Streaming answer renderer (SSE with citation_found and source_loaded events)
  - Citation card component (source attribution: domain, favicon, title, snippet, relevance)
  - Source detail view (expandable source content)
  - State management (Zustand for RN/Expo, Riverpod for Flutter, @Observable for iOS, ViewModel for Android)
  - Basic test suite (6 files: models, auth store, search store, library store, streaming, API)
  - README updated from "scaffold" to "V1 implementation"

  **Approach:**
  1. Clone `GeorgeQLe/perplexity-mobile-clone` to `/tmp/`
  2. Create shared API contracts and test fixtures in `shared/` (endpoints.json, models.json, sse-events.json, test fixtures for threads, answers, citations, sources)
  3. Launch 5 parallel subagents (one per variant — independent directories, different languages)
  4. Each variant committed separately, all pushed at end
  5. Verify key files on remote via `gh api`

  **Execution Profile:**
  - Parallel mode: serial commits, parallel subagent implementation
  - Integration owner: main agent
  - Test strategy: tests-after (write tests as part of implementation)
  - Conflict risk: none (single repo, single branch)

  **Ship-one-step handoff contract:** Implement only Step 11.4, validate it (all 5 variants have complete source, key files verified on remote), then run `/ship` when done.

  **Next work:** Step 11.4 — Implement Perplexity clone across all 5 variants
  **Recommended next command:** `/run`

- [x] Step 11.5: Implement pilot app 4 — Character.AI clone (all 5 variants)
  - Files: `GeorgeQLe/character-ai-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/004-character-ai.md` and build plan.
  - Implement: character catalog, persona profiles, conversation rooms, creator tools, moderation, teen-safety controls, subscriptions, abuse reporting.
  - Distinct pattern: persona/character system, multi-character selection, safety controls for minors.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  A Character.AI-style mobile AI companion/entertainment app across 5 variant stacks. The source spec is at `specs/batch-01/004-character-ai.md` in the `mobile-ideas` repo. The downstream repo is `GeorgeQLe/character-ai-mobile-clone` (PRIVATE, scaffold already in place with variant dirs, shared dirs).

  **Spec Summary (from `004-character-ai.md`):**
  - 11 screens: Welcome/Age Gate, For You Characters, Character Detail, Chat Thread, Voice/Call Session, Create Character, Creator Profile, Search, Reports & Blocks, Subscription & Ads, Settings.
  - 12 data models: User, DeviceSession, Character, CreatorProfile, ChatThread, Message, CharacterMemory, VoiceSession, ModerationCase, Report, Entitlement, AuditEvent.
  - 20+ API endpoints for auth, account/settings, threads, messages, uploads, search/suggestions, reports/blocks/mutes, notifications, entitlements/billing, data export/deletion, support.
  - SSE streaming events: token, completion, error, typing_indicator, memory_update.

  **Distinct from Perplexity clone (Step 11.4):**
  - Character entity: persona name, greeting, visibility, example dialogue, avatar, tags, safety classification, popularity signals
  - CreatorProfile entity: creator identity, published characters, follower count, verification status
  - ChatThread entity: character-scoped conversation with persona context, not search-first
  - Message entity: user/character role with retry/edit affordances, not citation-based answers
  - CharacterMemory entity: per-character memory context for persona continuity
  - VoiceSession entity: call-style voice interaction with character
  - ModerationCase entity: content moderation lifecycle with policy categories
  - Report entity: user/character/creator reports with evidence, categories, and appeal path
  - No Citation, SourceDocument, LibraryItem, AssistantAction, DataDeletionRequest (different model shape)
  - Character discovery and creation UX (for-you feed, categories, creator profiles)
  - Teen/minor safety controls: age gates, content filtering, crisis escalation
  - Ad placement and ad-free subscription tier

  **Per-Variant Implementation:**
  Each variant (`react-native`, `flutter`, `expo`, `ios-native`, `android-native`) gets:
  - App entry point + navigation (all 11 screens wired)
  - Typed data models for all 12 entities
  - API service layer with typed contracts
  - Streaming character response renderer (SSE with typing_indicator and memory_update events)
  - Character card component (avatar, name, creator, description, popularity, tags)
  - Character detail view (full persona info, greeting, example dialogue, start chat)
  - Create character form (persona, greeting, visibility, avatar, tags, safety classification)
  - Age gate component (birth date entry, teen/adult routing)
  - State management (Zustand for RN/Expo, Riverpod for Flutter, @Observable for iOS, ViewModel for Android)
  - Basic test suite (6 files: models, auth store, character store, chat store, streaming, API)
  - README updated from "scaffold" to "V1 implementation"

  **Approach:**
  1. Clone `GeorgeQLe/character-ai-mobile-clone` to `/tmp/`
  2. Create shared API contracts and test fixtures in `shared/` (endpoints.json, models.json, sse-events.json, test fixtures for characters, threads, messages, creators)
  3. Launch 5 parallel subagents (one per variant — independent directories, different languages)
  4. Each variant committed separately, all pushed at end
  5. Verify key files on remote via `gh api`

  **Execution Profile:**
  - Parallel mode: serial commits, parallel subagent implementation
  - Integration owner: main agent
  - Test strategy: tests-after (write tests as part of implementation)
  - Conflict risk: none (single repo, single branch)

  **Ship-one-step handoff contract:** Implement only Step 11.5, validate it (all 5 variants have complete source, key files verified on remote), then run `/ship` when done.

  **Next work:** Step 11.5 — Implement Character.AI clone across all 5 variants
  **Recommended next command:** `/run`

- [x] Step 11.6: Implement pilot app 5 — Replika clone (all 5 variants)
  - Files: `GeorgeQLe/replika-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/005-replika.md` and build plan.
  - Implement: relationship onboarding, memory/profile state, mood and journal loops, voice/chat surfaces, avatar feature gates, wellbeing safeguards, subscription controls.
  - Distinct pattern: relationship-oriented companion, mood tracking, diary/journal integration.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  A Replika-style AI companion/relationship app across 5 variant stacks. The source spec is at `specs/batch-01/005-replika.md` in the `mobile-ideas` repo. The downstream repo is `GeorgeQLe/replika-mobile-clone` (PRIVATE, scaffold already in place with variant dirs, shared dirs).

  **Spec Summary (from `005-replika.md`):**
  - 12 screens: Welcome/Age Gate, Companion Home, Chat Thread, Voice/Video Session, Avatar Studio, Memory & Profile, Activities, Image Generation, Integrations, Subscription, Privacy & Safety, Support.
  - 13 data models: User, DeviceSession, Companion, Conversation, Message, MemoryRecord, AvatarAsset, CheckInRule, IntegrationGrant, GeneratedMedia, Entitlement, SafetyReport, AuditEvent.
  - 20+ API endpoints for auth, account/settings, conversations, messages, uploads, search/suggestions, reports/blocks/mutes, notifications, entitlements/billing, data export/deletion, support.
  - SSE streaming events: token, completion, error, typing_indicator, mood_update.

  **Distinct from Character.AI clone (Step 11.5):**
  - Companion entity: single long-running relationship companion (not multi-character catalog), relationship level, mood state, personality traits, relationship type
  - Conversation entity: ongoing companion conversation with mood/context tracking (not character-scoped threads)
  - MemoryRecord entity: relationship memory with categories (facts, preferences, experiences, emotions), not per-character persona memory
  - AvatarAsset entity: 3D avatar customization (body, clothing, accessories, background), entitlement-gated items
  - CheckInRule entity: proactive companion check-ins with scheduling, mood triggers, wellness prompts
  - IntegrationGrant entity: third-party app connections (calendar, music, fitness)
  - GeneratedMedia entity: AI-generated images within conversation
  - SafetyReport entity: wellbeing-focused safety reports with crisis escalation
  - No Character, CreatorProfile, ModerationCase, Report (different safety model)
  - Companion home with mood/relationship status, not character discovery feed
  - Avatar studio with 3D customization, not character creation form
  - Activities (guided conversations, games, journaling), not character search
  - Wellbeing safeguards with crisis resources, not teen/adult age gating

  **Per-Variant Implementation:**
  Each variant (`react-native`, `flutter`, `expo`, `ios-native`, `android-native`) gets:
  - App entry point + navigation (all 12 screens wired)
  - Typed data models for all 13 entities
  - API service layer with typed contracts
  - Streaming companion response renderer (SSE with typing_indicator and mood_update events)
  - Companion home component (avatar, mood, relationship level, recent activity)
  - Avatar studio view (customization categories, entitlement-gated items)
  - Memory & profile view (memory categories, relationship facts, personality)
  - Activities view (guided conversations, journaling prompts, games)
  - State management (Zustand for RN/Expo, Riverpod for Flutter, @Observable for iOS, ViewModel for Android)
  - Basic test suite (6 files: models, auth store, companion store, chat store, streaming, API)
  - README updated from "scaffold" to "V1 implementation"

  **Approach:**
  1. Clone `GeorgeQLe/replika-mobile-clone` to `/tmp/`
  2. Create shared API contracts and test fixtures in `shared/` (endpoints.json, models.json, sse-events.json, test fixtures for companions, conversations, messages, memories, avatars)
  3. Launch 5 parallel subagents (one per variant — independent directories, different languages)
  4. Each variant committed separately, all pushed at end
  5. Verify key files on remote via `gh api`

  **Execution Profile:**
  - Parallel mode: serial commits, parallel subagent implementation
  - Integration owner: main agent
  - Test strategy: tests-after (write tests as part of implementation)
  - Conflict risk: none (single repo, single branch)

  **Ship-one-step handoff contract:** Implement only Step 11.6, validate it (all 5 variants have complete source, key files verified on remote), then run `/ship` when done.

  **Next work:** Step 11.6 — Implement Replika clone across all 5 variants
  **Recommended next command:** `/run`

- [x] Step 11.7: Implement batch apps 201-205 — Poe, Gemini, Copilot, Grok, DeepSeek (all 5 variants each)
  - Files: 5 downstream repos (poe, gemini, microsoft-copilot, grok, deepseek)
  - These are conversational AI assistants with similar core architecture (chat, streaming, history, attachments, model routing).
  - Read each app's spec and build plan. Implement all 5 variants per app.
  - Reuse shared AI chat patterns from pilot apps; differentiate per app's unique features (model routing for Poe, workspace integration for Copilot, etc.).
  - Serial within each app, but apps are independent repos.

  **Implementation Plan (self-contained for clear-context execution):**

  **Prerequisite — Specs must be created first:**
  The batch app specs (201-205) are listed as "Draft 1" in the App Inventory but the spec files do NOT exist yet under `specs/`. Before implementation can begin, specs must be written for all 5 apps:
  - `specs/batch-03/201-poe.md`
  - `specs/batch-03/202-gemini.md`
  - `specs/batch-03/203-microsoft-copilot.md`
  - `specs/batch-03/204-grok.md`
  - `specs/batch-03/205-deepseek.md`

  Each spec must follow the same structure as the pilot specs (`specs/batch-01/001-chatgpt.md` etc.): Research Sources table with exact first-party URLs, Screen Inventory, Data Model, API And Backend Contracts, SSE events, Edge Cases, Test Plan, Build Plan. Use `/spec-interview` or research-based spec generation to create implementation-ready specs before coding.

  **What to Build (after specs exist):**
  5 conversational AI assistant apps, each across 5 variant stacks. All share a common AI chat architecture but each has distinct features:

  | App | Repo | Key Differentiator |
  |-----|------|--------------------|
  | 201 Poe | `GeorgeQLe/poe-mobile-clone` | Multi-model routing, bot marketplace, creator tools |
  | 202 Gemini | `GeorgeQLe/gemini-mobile-clone` | Google integration, multimodal (images, code), Extensions |
  | 203 Microsoft Copilot | `GeorgeQLe/microsoft-copilot-mobile-clone` | M365 workspace integration, GPT Builder, Copilot GPTs |
  | 204 Grok | `GeorgeQLe/grok-mobile-clone` | X/Twitter integration, real-time data, image generation |
  | 205 DeepSeek | `GeorgeQLe/deepseek-mobile-clone` | Deep thinking mode, code interpreter, reasoning chain display |

  **Per-App Approach (serial, one app at a time):**
  1. Read the app's spec from `specs/batch-03/`
  2. Create shared API contracts and test fixtures in the downstream repo's `shared/`
  3. Launch 5 parallel subagents (one per variant)
  4. Commit per variant, push, verify key files on remote

  **Reusable patterns from pilot apps:**
  - SSE streaming with token/completion/error events (all 5 pilots)
  - Auth/session model (all 5 pilots)
  - Zustand (RN/Expo), Riverpod (Flutter), @Observable (iOS), ViewModel (Android) state patterns
  - Test suite structure (6 files: models, auth, primary-store, chat, streaming, API)

  **Execution Profile:**
  - Parallel mode: serial across apps (5 apps × 5 variants = 25 variant implementations), parallel within each app (5 subagents)
  - Integration owner: main agent
  - Test strategy: tests-after
  - Estimated scope: ~1250 files across 5 repos

  **Step 1 (this execution): Create the 5 specs first.**
  If specs do not exist when execution begins, the session must create them before proceeding to implementation. Use public marketplace listings, help centers, and product pages as research sources. Each spec should be implementation-ready.

  **Acceptance Criteria:**
  - All 5 specs exist and are implementation-ready
  - All 5 repos have complete source code pushed (5 variants each)
  - Key files verified on remote via `gh api`
  - No proprietary assets or trademark infringement

  **Ship-one-step handoff contract:** Step 11.7 complete — created 5 specs and implemented all 5 apps × 5 variants (25 variant implementations total). ~1023 files across 5 repos, all pushed and verified (PRIVATE, 44-67 files per variant confirmed via `gh api`). 30 test suites across all apps.

  **Next work:** Step 11.8 — Implement batch apps 206-210
  **Recommended next command:** `/run`

- [ ] Step 11.8: Implement batch apps 206-210 — Meta AI, You.com, Pi, Phind, HuggingChat (all 5 variants each)
  - Files: 5 downstream repos (meta-ai, you-com, pi, phind, huggingchat)
  - Similar conversational AI architecture. Each app has distinct UX focus (social integration for Meta AI, developer focus for Phind, open-source emphasis for HuggingChat).
  - Read specs and build plans. Implement all 5 variants per app.

- [ ] Step 11.9: Implement batch apps 211-216 — Wysa, ELSA Speak, OtterPilot, Grammarly Keyboard, Wordtune, QuillBot (all 5 variants each)
  - Files: 6 downstream repos
  - These are specialized AI tools (mental health, language learning, transcription, writing assistance).
  - Distinct patterns: keyboard extension UI (Grammarly, QuillBot), audio processing (ELSA, OtterPilot), wellbeing safeguards (Wysa).
  - Category-specific risk review required for Wysa (mental health) per CLAUDE.md.

- [ ] Step 11.10: Implement batch apps 217-222 — Ask AI, Genie, Monica, Notion AI, Forefront AI, Consensus (all 5 variants each)
  - Files: 6 downstream repos
  - Mixed AI assistants and productivity-AI hybrids.
  - Distinct patterns: workspace integration (Notion AI), research/academic focus (Consensus), general-purpose chat (Ask AI, Genie, Monica, Forefront AI).

- [ ] Step 11.11: Enable GitHub Actions and run CI validation across all 27 repos
  - Re-enable GitHub Actions on all 27 repos.
  - Push a trigger commit (or use workflow dispatch) to run CI on each repo.
  - Verify: build passes, lint passes, type check passes, tests pass for all 5 variants in each repo.
  - Document any CI failures and fix before proceeding.

- [ ] Step 11.12: Run benchmarking harness and record scorecards
  - Run `mobile-benchmark-harness` against each of the 27 repos × 5 variants.
  - Record scorecard JSON output for each variant.
  - Verify all 7 benchmark dimensions are populated.
  - Generate cross-app comparison table and category rollup for AI & Assistants cluster.
  - Document any benchmark issues.

- [ ] Step 11.13: Phase 11 final validation and cleanup
  - Verify all acceptance criteria:
    - All 27 apps × 5 variants = 135 app builds exist and compile.
    - All variants pass CI.
    - All variants have benchmark scores.
    - No proprietary assets, trademarks, or copied code (audit shared/assets and source code).
    - Manual verification blockers documented per spec.
  - Fix any remaining issues.
  - Mark Phase 11 complete.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- CI/CD templates: `templates/ci/`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Source specs: `specs/batch-01/` (IDs 1-5), `specs/batch-03/` (IDs 201-222)
- Phase 10 infrastructure: benchmark harness, CI templates, variant convention
