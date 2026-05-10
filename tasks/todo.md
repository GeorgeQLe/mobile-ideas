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

- [ ] Step 11.3: Implement pilot app 2 — Claude clone (all 5 variants)
  - Files: `GeorgeQLe/claude-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/002-claude.md` and build plan.
  - Implement: conversational threads, file/context ingestion, project organization, artifact-style outputs, privacy controls, usage limits, subscriptions, safety review gates.
  - Reuse streaming and conversation patterns from Step 11.2; extend with project/workspace concepts and artifact rendering.

- [ ] Step 11.4: Implement pilot app 3 — Perplexity clone (all 5 variants)
  - Files: `GeorgeQLe/perplexity-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/003-perplexity.md` and build plan.
  - Implement: query threads, cited source cards, follow-up exploration, collections, freshness controls, provider-backed retrieval, subscription gates, citation-quality tests.
  - Distinct pattern: citation/source attribution UI, search-first rather than chat-first paradigm.

- [ ] Step 11.5: Implement pilot app 4 — Character.AI clone (all 5 variants)
  - Files: `GeorgeQLe/character-ai-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/004-character-ai.md` and build plan.
  - Implement: character catalog, persona profiles, conversation rooms, creator tools, moderation, teen-safety controls, subscriptions, abuse reporting.
  - Distinct pattern: persona/character system, multi-character selection, safety controls for minors.

- [ ] Step 11.6: Implement pilot app 5 — Replika clone (all 5 variants)
  - Files: `GeorgeQLe/replika-mobile-clone` — all 5 `variants/` directories
  - Read source spec `specs/batch-01/005-replika.md` and build plan.
  - Implement: relationship onboarding, memory/profile state, mood and journal loops, voice/chat surfaces, avatar feature gates, wellbeing safeguards, subscription controls.
  - Distinct pattern: relationship-oriented companion, mood tracking, diary/journal integration.

- [ ] Step 11.7: Implement batch apps 201-205 — Poe, Gemini, Copilot, Grok, DeepSeek (all 5 variants each)
  - Files: 5 downstream repos (poe, gemini, microsoft-copilot, grok, deepseek)
  - These are conversational AI assistants with similar core architecture (chat, streaming, history, attachments, model routing).
  - Read each app's spec and build plan. Implement all 5 variants per app.
  - Reuse shared AI chat patterns from pilot apps; differentiate per app's unique features (model routing for Poe, workspace integration for Copilot, etc.).
  - Serial within each app, but apps are independent repos.

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
