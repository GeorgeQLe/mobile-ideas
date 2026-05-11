# QuillBot-Style Clone Spec

> Metadata
> - Inspiration app: QuillBot
> - Category: AI paraphrasing tool, grammar checker, summarizer, citation generator, co-writer
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: exact synonym slider thresholds per mode, custom keyboard extension behavior on iOS and Android, plagiarism checker source database coverage, premium tier quota limits, co-writer inline paraphrase insertion UX, citation format edge cases per style guide, and real-time grammar check latency require lawful test accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary NLP models, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI writing assistant inspired by QuillBot's public product: a paraphraser with multiple rewriting modes (standard, fluency, formal, simple, creative, expand, shorten), a synonym intensity slider, grammar checking with categorized error detection, text summarization in key-sentence and paragraph modes, citation generation across major academic styles, a co-writer composing assistant with inline paraphrase, and a compare view showing original versus rewritten text side by side. The clone emphasizes versatile text transformation, writing quality improvement, and academic productivity as primary differentiators.

The clone must use original branding, UI copy, and independently trained or licensed NLP models. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a mobile-first AI paraphrasing experience with seven distinct rewriting modes.
- Enable fine-grained control over word replacement intensity via a synonym slider.
- Offer grammar checking with categorized errors, inline suggestions, and fix-all capability.
- Support text summarization in key-sentence extraction and paragraph condensation modes.
- Generate properly formatted citations in APA, MLA, Chicago, and other major academic styles.
- Provide a co-writer composing environment with inline paraphrase and AI-assisted drafting.
- Allow users to freeze specific words from paraphrasing via a word flipper mechanism.
- Display original versus paraphrased text in a compare view for easy review.

## Non-Goals

- Do not imply affiliation with QuillBot, Learneo Inc., or any upstream NLP provider.
- Do not copy proprietary model weights, paraphrasing algorithms, grammar rules, or private API schemas.
- Do not replicate exact rate limits, daily free usage quotas, or internal model routing logic without independent verification.
- Do not present grammar or plagiarism results as authoritative academic or professional certification.
- Do not process production user data without explicit consent and documented retention policies.
- Do not reproduce copyrighted style guide content; cite formatting rules from publicly available standards only.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| QuillBot Product | https://quillbot.com | Paraphraser, grammar checker, summarizer, co-writer, citation generator | Verified 2026-05-11 |
| QuillBot Blog | https://quillbot.com/blog | Feature announcements, mode descriptions, product updates | Verified 2026-05-11 |
| Google Play Listing | https://play.google.com/store/apps/details?id=com.quillbot.paraphraser | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/app/quillbot-ai-writing-keyboard/id1570755857 | App description, screenshots, feature list, user reviews | Verified 2026-05-11 |

## Detailed Design

### Paraphraser with Modes

- Seven rewriting modes: Standard (balanced rewrite), Fluency (natural readability), Formal (professional register), Simple (plain language), Creative (significant rewording), Expand (add detail and length), Shorten (condense while preserving meaning).
- Users select a mode via a segmented control above the input area; mode persists across paraphrases until changed.
- Each mode applies distinct NLP transformation parameters affecting vocabulary, sentence structure, and length.
- Input accepts paste, typed text, or uploaded documents (plain text, .docx, .pdf extraction).
- Output renders in a result panel below or beside the input, with changed words highlighted.

### Synonym Slider

- A horizontal slider (0-100) controls word replacement intensity: low values preserve more original words, high values replace aggressively.
- Slider state persists per session and resets to mode-specific defaults on mode change.
- Individual replaced words are tappable to reveal a synonym dropdown with 3-5 alternatives ranked by contextual fit.
- Selecting an alternative synonym updates the result in place without re-running the full paraphrase.

### Word Flipper

- Users tap any word in the output to toggle its freeze state (locked/unlocked).
- Frozen words display a lock icon and are excluded from replacement on subsequent paraphrases.
- Freeze state persists for the current input text; clearing input resets all freezes.
- Bulk freeze/unfreeze toggle available via a toolbar action.

### Compare Mode

- Side-by-side or stacked view showing original text and paraphrased result with diff highlighting.
- Changed words, inserted phrases, and removed segments are color-coded (green for additions, red for removals, yellow for substitutions).
- Users can copy either version or the combined diff to clipboard.

### Grammar Checker

- Accepts pasted or typed text and scans for grammar, spelling, punctuation, and style errors.
- Errors are categorized: grammar, spelling, punctuation, style, wordiness, passive voice.
- Each error is underlined in context with a tap-to-expand card showing the issue, explanation, and suggested fix.
- Fix-all button applies all suggestions in one action; individual fixes can be accepted or dismissed.
- Error count summary displayed as a quality score badge.

### Summarizer

- Two modes: Key Sentences (extracts the most important sentences) and Paragraph (generates a condensed rewrite).
- A length slider controls output brevity: short, medium, or long summary.
- Input accepts text paste or document upload; output renders below with sentence-level highlights linking back to source text.

### Citation Generator

- Supports APA 7th, MLA 9th, Chicago 17th, Harvard, IEEE, and AMA formats.
- Users enter source metadata (author, title, publication, date, URL, DOI) via structured form fields.
- Auto-fill from URL or DOI: paste a link and the system extracts metadata from publicly available sources.
- Generated citations display in formatted text with a copy button.
- Citation list management: save, organize, and export citation lists as plain text or BibTeX.

### Co-Writer

- A composing environment where users write freely and invoke inline paraphrase on selected text.
- AI-assisted suggestions appear as ghost text or inline completions that users accept, reject, or modify.
- Toolbar provides quick access to paraphrase selection, grammar check selection, expand, and shorten actions.
- Document auto-save with version history for undo/redo across sessions.

### Custom Keyboard Extension

- A system keyboard extension enabling paraphrasing and grammar checking in any app.
- Keyboard displays a compact toolbar with paraphrase, grammar, and synonym controls.
- Selected text in any text field can be paraphrased in place via the keyboard toolbar.
- Manual verification required: exact keyboard extension APIs, permission flows, and text replacement behavior on iOS and Android.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with tool overview, signs up or logs in, lands on paraphraser home.
2. **Quick Paraphrase**: User pastes text, selects a mode, adjusts synonym slider, taps paraphrase, reviews highlighted output, copies result.
3. **Synonym Refinement**: User taps a highlighted word in the output, selects an alternative from the synonym dropdown, sees the result update in place.
4. **Word Freeze**: User freezes key terms, re-paraphrases, confirms frozen words remain unchanged in the new output.
5. **Grammar Check**: User navigates to grammar checker, pastes an essay, reviews categorized errors, applies fix-all, copies corrected text.
6. **Summarize**: User navigates to summarizer, pastes a long article, selects key sentences mode, adjusts length slider, copies summary.
7. **Generate Citation**: User navigates to citation generator, pastes a URL, auto-fill extracts metadata, selects APA format, copies formatted citation.
8. **Co-Writer Session**: User opens co-writer, begins drafting, selects a paragraph, invokes inline paraphrase, accepts the rewrite, continues writing.
9. **Compare Review**: User taps compare mode after paraphrasing, reviews side-by-side diff, copies the preferred version.
10. **Keyboard Paraphrase**: User activates the custom keyboard in a messaging app, selects text, taps paraphrase on the keyboard toolbar, replaces text in place.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth, tool overview carousel, consent |
| Paraphraser Home | Primary paraphrasing | Input area, mode selector, synonym slider, paraphrase button, result panel, word flipper, compare toggle |
| Grammar Checker | Error detection and correction | Input area, error list with categories, inline underlines, fix-all button, quality score |
| Summarizer | Text condensation | Input area, mode toggle (key sentences/paragraph), length slider, result panel |
| Citation Generator | Academic citation creation | Source type selector, metadata form, auto-fill from URL/DOI, format picker, citation list |
| Co-Writer | AI-assisted composing | Rich text editor, inline paraphrase toolbar, ghost text suggestions, version history |
| Plagiarism Checker | Originality verification (premium) | Input area, scan progress, similarity percentage, source match list, highlighted overlaps |
| History | Past paraphrases and documents | Date-grouped list, search, filter by tool type, re-open, delete |
| Settings | Account and preferences | Theme, default mode, language, notification prefs, data export, delete account |
| Subscription | Premium management | Tier comparison, current plan, upgrade/downgrade, billing history, restore purchases |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, locale, created_at, quota_tier, daily_usage_count, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, token, keyboard_extension_enabled, created_at, revoked_at |
| ParaphraseRequest | id, user_id, input_text, mode, synonym_intensity, frozen_words[], created_at |
| ParaphraseResult | id, request_id, output_text, word_changes[], diff_map, processing_ms, created_at |
| GrammarCheck | id, user_id, input_text, language, created_at |
| GrammarIssue | id, check_id, category (grammar/spelling/punctuation/style/wordiness/passive), offset, length, message, suggestion, accepted, created_at |
| SummaryRequest | id, user_id, input_text, mode (key_sentences/paragraph), target_length, created_at |
| SummaryResult | id, request_id, output_text, source_sentence_refs[], compression_ratio, created_at |
| Citation | id, user_id, source_type, authors[], title, publication, date, url, doi, format_style, formatted_text, list_id, created_at |
| CoWriterSession | id, user_id, title, content_versions[], current_content, auto_saved_at, created_at |
| PlagiarismCheck | id, user_id, input_text, similarity_pct, source_matches[], status, created_at |
| Subscription | id, user_id, tier (free/premium), status, daily_limit, started_at, expires_at, store_receipt_ref |
| AuditEvent | id, user_id, event_type, tool_used, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /paraphrase | POST | Submit text for paraphrasing (SSE streaming response) |
| /paraphrase/:id/synonym | PATCH | Replace a single word with an alternative synonym |
| /paraphrase/:id/freeze | PATCH | Update frozen word list and re-paraphrase |
| /grammar/check | POST | Submit text for grammar analysis (SSE streaming response) |
| /grammar/check/:id/fix | PATCH | Apply individual or bulk fix to grammar issues |
| /summarize | POST | Submit text for summarization (SSE streaming response) |
| /citations | POST | Generate formatted citation from metadata |
| /citations/autofill | POST | Extract metadata from URL or DOI |
| /citations/list | GET | List saved citations with pagination |
| /citations/:id | DELETE | Remove a saved citation |
| /cowriter/sessions | GET | List co-writer sessions |
| /cowriter/sessions | POST | Create new co-writer session |
| /cowriter/sessions/:id | PATCH | Update session content, invoke inline paraphrase |
| /cowriter/sessions/:id/suggest | POST | Request AI completion suggestion (SSE streaming) |
| /plagiarism/check | POST | Submit text for plagiarism scan (premium, SSE streaming) |
| /history | GET | Search and filter past tool usage across all tools |
| /settings | GET/PATCH | Read and update user preferences |
| /subscription | GET | Current subscription status and usage |
| /subscription/upgrade | POST | Initiate premium upgrade via store IAP |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Paraphrase, grammar, summarize, co-writer suggest, and plagiarism endpoints return SSE streams with event types: `paraphrase_start`, `paraphrase_result`, `grammar_issue`, `summary_delta`, `citation_result`, `cowriter_delta`, `plagiarism_result`, `error`, `done`.

## Realtime Push And Offline Behavior

- Paraphrase, grammar, and summarization results stream token-by-token via SSE with automatic reconnection.
- Co-writer suggestions stream as ghost text deltas, cancellable by user input.
- Plagiarism scan results arrive as progressive source match events during the SSE stream.
- Offline mode: cached history and past results are readable; new tool requests are queued as drafts; submit is blocked until connectivity returns.
- Reconnect reconciliation uses idempotency keys to prevent duplicate submissions.
- Co-writer sessions auto-save locally; sync to server on reconnection with conflict resolution (last-write-wins with user notification).
- Push notifications (opt-in): plagiarism scan completion, subscription expiry reminders, daily usage quota resets.
- Local draft persistence: unsent paraphrase and grammar inputs survive app kill/restart.

## Permissions Privacy And Safety

- Camera/photo library: not required for V1 (document upload uses file picker only).
- Notifications: requested only after first relevant event (plagiarism scan completion).
- Keyboard extension: requires explicit system permission grant for full access on iOS; input method enable on Android.
- No microphone, location, contacts, or calendar access required for V1.
- User text inputs are processed for the requested NLP task only and not used for model training without explicit opt-in.
- All text in transit is encrypted (TLS); stored text is encrypted at rest (AES-256 or equivalent).
- Grammar and paraphrase results carry a disclaimer: "AI-assisted suggestion. Review before use."
- Plagiarism results carry a disclaimer: "Similarity detection is not exhaustive. Consult your institution's policies."
- Safety filters block: attempts to use paraphrasing to disguise plagiarism of copyrighted works, generation of harmful content, or evasion of content policies.
- Data export includes all saved paraphrases, grammar checks, citations, co-writer sessions, and account data.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Manual verification required: exact keyboard extension permission flows, text replacement scope, and data access policies per platform.

## Analytics And Monetization

- Events tracked: session_start, paraphrase_submitted, mode_selected, synonym_slider_changed, synonym_replaced, word_frozen, grammar_check_submitted, fix_applied, fix_all_applied, summary_submitted, citation_generated, citation_autofilled, cowriter_session_created, cowriter_suggest_accepted, plagiarism_scan_submitted, compare_viewed, history_searched, keyboard_paraphrase_used.
- Event properties: tool type, mode, coarse latency bucket, input length bucket, error code, quota tier. Never raw text content, personal data, or document contents.
- Monetization model: daily free usage tier (limited paraphrases and grammar checks per day) with premium unlimited tier unlocking unlimited usage, all paraphrase modes, plagiarism checker, advanced grammar categories, and priority processing.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate data export/delete, account recovery, access to existing saved results, or basic grammar checking.

## Edge Cases

- Extremely long input text (10,000+ words): chunk processing with progress indicator; warn user of increased processing time.
- Synonym slider at extremes: 0% returns near-identical text (minimal changes); 100% may produce awkward phrasing; show quality warning at high intensity.
- All words frozen in input: paraphrase returns identical text with an explanatory message.
- Paraphrase mode produces output longer than input (Expand mode on already verbose text): display length comparison and offer Shorten mode.
- Grammar checker on non-English text: detect language, show unsupported language message if not in supported set, suggest switching language.
- Citation auto-fill fails (URL returns 404, DOI not found): fall back to manual entry with pre-filled partial data.
- Citation format ambiguity (missing required fields per style): highlight missing fields, generate best-effort citation with bracketed placeholders.
- Co-writer session conflict (edited on two devices): last-write-wins with diff notification and manual merge option.
- Plagiarism scan timeout on large documents: progressive partial results with option to resume.
- Daily free quota exhausted mid-paraphrase: complete current request but block subsequent requests with upgrade prompt and reset countdown.
- Keyboard extension loses connection to host app: cache last action, retry on reconnection, show error indicator in keyboard toolbar.
- Paste from clipboard contains rich text/HTML: strip formatting, process plain text only, notify user of format conversion.

## Test Plan

- Unit tests: paraphrase mode selection logic, synonym slider intensity mapping, word freeze toggle state, diff generation for compare view, grammar issue categorization, citation format string assembly, co-writer version history management.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, quota exceeded, and server error responses.
- Integration tests: full paraphrase flow from input through streaming result; synonym replacement in place; grammar check with fix-all; summarization in both modes; citation auto-fill from URL; co-writer inline paraphrase; plagiarism scan with progressive results.
- Streaming tests: SSE reconnection, event ordering (paraphrase_start before paraphrase_result), cancellation on new request, error event handling mid-stream.
- Offline tests: draft preservation, queue behavior, reconnect reconciliation, duplicate prevention, co-writer auto-save and sync.
- Quota tests: daily limit enforcement, counter reset timing, premium bypass, quota exhaustion mid-request handling.
- Keyboard extension tests: text selection and replacement in third-party apps, permission grant flow, toolbar rendering, offline fallback.
- Accessibility tests: mode selector screen-reader labels, synonym dropdown announcements, grammar underline descriptions, compare view diff narration, keyboard toolbar VoiceOver support.
- Performance tests: paraphrase latency across input sizes, grammar check response time, summarizer compression speed, co-writer suggestion latency, large history list scroll performance.
- Manual verification tests: keyboard extension behavior on iOS and Android, exact quota thresholds, plagiarism source coverage, citation format accuracy against published style guides.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can paraphrase text in all seven modes with visible mode descriptions and output highlighting.
- Synonym slider adjusts word replacement intensity with real-time output updates on re-paraphrase.
- Word flipper freezes and unfreezes individual words across paraphrase iterations.
- Compare mode shows color-coded diff between original and paraphrased text.
- Grammar checker detects and categorizes errors with inline suggestions and fix-all capability.
- Summarizer produces output in both key-sentence and paragraph modes with adjustable length.
- Citation generator formats citations in at least four academic styles with auto-fill from URL/DOI.
- Co-writer provides inline paraphrase and AI-assisted suggestions with session persistence.
- Streaming handles all SSE event types without UI corruption or dropped events.
- Daily free quota enforces limits with clear upgrade prompts and reset countdowns.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What are the exact daily free usage limits per tool (paraphrases, grammar checks, summaries)?
- How does the synonym slider map to internal NLP parameters at each intensity level?
- Which languages beyond English does QuillBot support for paraphrasing and grammar checking?
- What plagiarism source database coverage does QuillBot use (web, academic, proprietary)?
- How does the custom keyboard extension handle data privacy and text transmission on each platform?
- What is the exact word/character limit per single paraphrase request on free vs. premium tiers?
- Does QuillBot use a single model or different models per paraphrase mode?
- How does co-writer handle version conflicts across multiple device sessions?

## Build Plan

- **Phase 1 — App Shell + Auth + Paraphraser Core**: Auth flows (email and OAuth), paraphraser home with Standard mode, synonym slider, basic result panel with word highlighting, copy output. Target: functional single-mode paraphraser.
- **Phase 2 — All Paraphrase Modes + Word Flipper + Compare**: Remaining six modes with distinct transformation behavior, word freeze/unfreeze toggle, compare view with diff highlighting, synonym dropdown replacement. Target: full paraphraser feature set.
- **Phase 3 — Grammar Checker + Summarizer**: Grammar check with categorized errors, inline suggestions, fix-all, quality score. Summarizer with key-sentence and paragraph modes, length slider. Target: writing quality tools.
- **Phase 4 — Citation Generator + Co-Writer**: Citation form with auto-fill from URL/DOI, multi-format output, citation list management. Co-writer composing environment with inline paraphrase, AI suggestions, auto-save. Target: academic and composing tools.
- **Phase 5 — Plagiarism Checker + History + Subscription**: Plagiarism scan with progressive results (premium-gated), cross-tool history with search and filters, subscription management with daily quota enforcement. Target: premium features and usage management.
- **Phase 6 — Keyboard Extension + Safety + Polish**: Custom keyboard extension with paraphrase and grammar toolbar, safety filter hardening, accessibility audit, offline mode polish, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with a QuillBot account to capture exact mode behavior, synonym slider thresholds, daily limits, and keyboard extension UX.
- Select or train independent NLP models for paraphrasing, grammar checking, and summarization distinct from QuillBot's proprietary models.
- Design original branding, UI copy, and mode names distinct from QuillBot's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
