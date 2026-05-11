# Grammarly-Keyboard-Style Clone Spec

> Metadata
> - Inspiration app: Grammarly Keyboard
> - Category: AI writing assistant, custom keyboard, grammar check, tone detection, rewrite suggestions
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: custom keyboard extension lifecycle on iOS and Android, InputMethodService rendering constraints, keyboard height and inset behavior per OEM, inline suggestion tap targets, tone detection latency on device, clipboard access permission prompts, subscription restore flows, and push notification payloads require lawful test accounts and physical devices before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary NLP models, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI writing assistant keyboard inspired by Grammarly Keyboard's public product: a system-wide custom keyboard extension that provides real-time grammar and spelling correction, tone detection with adjustable tone rewriting, full sentence rewrites, vocabulary enhancement, clarity and conciseness improvements, a writing quality score, personal dictionary management, writing statistics, keyboard themes, clipboard/snippet management, and emoji/GIF suggestions. The keyboard overlay sits atop the standard input method and surfaces suggestions inline as the user types across any app.

The clone must use original branding, UI copy, NLP models (open-source or self-trained), and licensed assets. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide a system-wide custom keyboard that delivers real-time grammar, spelling, and style corrections across all apps.
- Detect and display the tone of the user's writing (friendly, formal, confident, diplomatic, etc.) with controls to adjust tone.
- Offer full sentence and paragraph rewrite suggestions for clarity, conciseness, and tone.
- Surface vocabulary enhancement suggestions to replace weak or overused words.
- Present a writing quality score that reflects grammar, clarity, engagement, and tone.
- Maintain a personal dictionary of user-added words and ignored suggestions.
- Track writing statistics and insights over time (words typed, corrections accepted, top issues).
- Support keyboard themes, clipboard/snippet management, and emoji/GIF search.

## Non-Goals

- Do not imply affiliation with Grammarly, Inc. or use Grammarly trademarks, logos, or copyrighted copy.
- Do not copy proprietary NLP model weights, training data, system prompts, or private API schemas.
- Do not replicate exact correction heuristics, scoring algorithms, or internal ranking logic without independent verification.
- Do not access clipboard contents silently; always require explicit user action or permission.
- Do not process production user text without explicit consent and documented retention policies.
- Do not present writing suggestions as authoritative editorial, legal, or academic review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Grammarly Product Page | https://www.grammarly.com | Feature overview, tone detection, rewrite, quality score | Verified 2026-05-11 |
| Grammarly Keyboard — Google Play | https://play.google.com/store/apps/details?id=com.grammarly.android.keyboard | Android feature set, screenshots, permissions, description | Verified 2026-05-11 |
| Grammarly Keyboard — App Store | https://apps.apple.com/app/grammarly-keyboard/id1158877342 | iOS feature set, screenshots, permissions, description | Verified 2026-05-11 |
| Grammarly Blog | https://www.grammarly.com/blog | Product announcements, tone detector launch, rewrite feature | Verified 2026-05-11 |
| Grammarly Support | https://support.grammarly.com | Keyboard setup guides, personal dictionary, feature explanations | Verified 2026-05-11 |

## Detailed Design

### Custom Keyboard Extension

- On Android, implemented as an InputMethodService that replaces the system keyboard when the user selects it in Settings > Language & Input.
- On iOS, implemented as a Custom Keyboard Extension with Full Access enabled for network-based analysis.
- On React Native / Flutter / Expo, a native module bridges the keyboard extension to shared analysis logic; the keyboard UI itself must be native per platform.
- The keyboard renders a standard QWERTY layout with an integrated suggestion bar above the key rows.
- The suggestion bar shows: autocorrect candidates, grammar fix chips, and a Grammarly-style assistant icon to expand the full suggestion panel.

### Real-Time Grammar and Spelling Correction

- Text is analyzed incrementally as the user types; analysis triggers after a debounce interval (300ms default) following a keystroke pause.
- Detected issues appear as colored underlines in the input field (red for critical errors, blue for style, green for enhancements) when the host app supports rich text; otherwise, correction chips appear in the suggestion bar.
- Tapping a suggestion chip applies the fix inline and logs the correction for writing statistics.
- Users can dismiss suggestions individually or ignore a rule category for future sessions.
- Analysis runs against a local lightweight model for latency-sensitive checks (spelling, common grammar) and a server-side model for advanced style, tone, and rewrite suggestions.

### Tone Detection

- After the user types two or more sentences, the tone detector activates and displays a tone badge (e.g., "Friendly," "Formal," "Confident," "Worried") in the suggestion bar or an expandable panel.
- Tone is inferred from word choice, sentence structure, punctuation patterns, and phrase-level sentiment signals.
- Users can tap the tone badge to see a breakdown: primary tone, secondary tones, and a tone intensity meter.
- An "Adjust Tone" control lets users select a target tone; the system then generates rewrite suggestions that shift the text toward the selected tone.

### Full Sentence Rewrite

- Users can tap a dedicated rewrite button on the suggestion bar or long-press a sentence to invoke the rewrite panel.
- The panel offers three to five alternative rewrites, each labeled with its style emphasis (more concise, more formal, more engaging, etc.).
- Selecting a rewrite replaces the original text inline and logs the change.
- Rewrites are generated server-side via SSE streaming to show progressive rendering.

### Writing Quality Score

- A circular score badge (0–100) appears in the keyboard toolbar, updating in near real-time as the user types.
- Score is composed of four sub-scores: Correctness, Clarity, Engagement, and Tone.
- Tapping the badge opens a detail panel showing per-category scores and the top three improvement opportunities.

### Personal Dictionary and Ignored Words

- Users can add words to a personal dictionary from a dismissed suggestion ("Add to Dictionary") or from the settings screen.
- Dictionary entries sync across devices via the user's account.
- Ignored rules persist per user and can be reviewed and re-enabled in settings.

### Keyboard Themes and Customization

- Users choose from a set of keyboard color themes (light, dark, high-contrast, and accent color variants).
- Key press sound and haptic feedback intensity are configurable.
- Keyboard height can be adjusted (compact, default, tall) for accessibility.

### Clipboard and Snippet Manager

- A clipboard panel (accessible via keyboard toolbar) stores the last 20 copied text items.
- Users can pin frequently used snippets for quick insertion.
- Clipboard history is stored locally and encrypted at rest; items auto-expire after 24 hours unless pinned.

### Emoji and GIF Suggestions

- The keyboard offers contextual emoji suggestions based on typed text.
- A GIF search panel uses a licensed GIF API (e.g., Tenor or GIPHY) for media suggestions.
- Recent and frequently used emoji/GIFs are surfaced for quick access.

## Core User Journeys

1. **First Launch**: User installs the app, sees a welcome screen, creates an account, follows a guided keyboard setup flow to enable the custom keyboard in system settings.
2. **Everyday Typing**: User opens any messaging or email app, types a message, sees grammar and spelling suggestions in the suggestion bar, taps to accept corrections.
3. **Tone Check**: User types a sensitive email, sees the tone badge shift to "Worried," taps "Adjust Tone" to rewrite toward "Confident," accepts the suggested rewrite.
4. **Full Rewrite**: User composes a long reply, long-presses a sentence, reviews three rewrite options, selects the most concise version.
5. **Writing Score Review**: User notices their score is 72, taps the badge, sees Clarity is low, accepts three clarity suggestions, watches the score rise to 89.
6. **Personal Dictionary**: User types a technical term flagged as misspelled, taps "Add to Dictionary," the word is never flagged again.
7. **Clipboard Quick Insert**: User opens the clipboard panel, taps a pinned address snippet, the text is inserted into the active field.
8. **Writing Stats**: User opens the app, views the writing dashboard showing weekly statistics — words typed, corrections accepted, most common issues, score trend.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth, consent, branding |
| Keyboard Setup Guide | Enable keyboard | Step-by-step native settings walkthrough, deep link, verification check |
| Writing Dashboard | Home overview | Writing score trend, weekly stats, recent documents, quick actions |
| Document Editor | In-app writing | Full-screen text editor with inline suggestions, score badge, tone badge |
| Suggestions Detail | Expanded suggestions | Categorized issue list, explanations, accept/dismiss per suggestion |
| Tone Detector | Tone analysis | Primary/secondary tone badges, intensity meter, adjust tone controls, rewrite options |
| Writing Stats | Historical insights | Words typed, corrections accepted, top issue categories, score trend chart |
| Personal Dictionary | Word management | Alphabetical word list, add/remove, ignored rules list |
| Keyboard Settings | Keyboard config | Theme picker, sound/haptic toggles, height adjustment, autocorrect preferences, clipboard settings |
| Account/Subscription | Account management | Profile, subscription tier, billing, data export, delete account |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, locale, created_at, subscription_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, keyboard_enabled, token, created_at, revoked_at |
| Document | id, user_id, title, source_app, raw_text, score, created_at, updated_at |
| WritingSession | id, user_id, document_id, started_at, ended_at, words_typed, corrections_accepted, corrections_dismissed |
| Suggestion | id, document_id, writing_session_id, type (grammar/spelling/style/clarity/tone/rewrite), original_text, suggested_text, rule_id, status (pending/accepted/dismissed), created_at |
| GrammarIssue | id, suggestion_id, category, severity (critical/warning/info), explanation, position_start, position_end |
| ToneAnalysis | id, document_id, primary_tone, secondary_tones[], intensity_score, sentence_count, created_at |
| WritingStats | id, user_id, period_start, period_end, words_typed, corrections_accepted, corrections_dismissed, avg_score, top_issues[] |
| DictionaryEntry | id, user_id, word, language, created_at |
| KeyboardConfig | id, user_id, theme, sound_enabled, haptic_enabled, height_mode, autocorrect_enabled, emoji_suggestions_enabled, updated_at |
| RewriteOption | id, suggestion_id, variant_label, rewritten_text, tone_target, score_delta |
| Subscription | id, user_id, tier (free/premium), status, started_at, expires_at, store_receipt_ref, platform |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /documents | GET | List user documents with pagination |
| /documents | POST | Create or import a document |
| /documents/:id | GET | Fetch document with suggestions |
| /documents/:id | DELETE | Soft-delete document |
| /analyze | POST | Submit text for grammar, spelling, style, and clarity analysis (SSE streaming response) |
| /analyze/tone | POST | Analyze tone of submitted text |
| /analyze/rewrite | POST | Generate rewrite options for selected text (SSE streaming response) |
| /suggestions/:id/accept | PATCH | Mark a suggestion as accepted |
| /suggestions/:id/dismiss | PATCH | Mark a suggestion as dismissed |
| /stats | GET | Retrieve writing statistics for a time period |
| /stats/summary | GET | Aggregated writing insights (score trend, top issues) |
| /dictionary | GET | List personal dictionary entries |
| /dictionary | POST | Add a word to personal dictionary |
| /dictionary/:id | DELETE | Remove a word from personal dictionary |
| /keyboard/config | GET/PATCH | Read and update keyboard configuration |
| /subscriptions | GET | Current subscription status |
| /subscriptions | POST | Create or upgrade subscription |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: `/analyze` and `/analyze/rewrite` return SSE streams with event types: `analysis_start`, `grammar_issue`, `spelling_issue`, `style_suggestion`, `clarity_suggestion`, `tone_result`, `rewrite_option`, `score_update`, `analysis_complete`, `error`, `done`.

## Realtime Push And Offline Behavior

- Grammar and spelling analysis uses a hybrid approach: a local on-device model handles latency-sensitive spelling and common grammar checks; advanced style, tone, and rewrite features require server connectivity.
- On-device analysis results appear within 100ms; server-side results stream in via SSE within 500ms–2s depending on text length.
- Offline mode: basic spelling and grammar corrections continue to work via the local model; tone detection, rewrites, and score calculation are unavailable and show an "offline" indicator.
- Queued text analysis: if the user types while offline, pending analysis requests are queued and sent when connectivity returns.
- Writing statistics sync on app foreground or when a writing session ends.
- Push notifications (opt-in): weekly writing summary, subscription status changes, account security events.
- Personal dictionary syncs across devices with last-write-wins conflict resolution.
- Clipboard data is stored locally only and never transmitted to the server.

## Permissions Privacy And Safety

- Keyboard Full Access (iOS) / InputMethodService (Android): required for network-based analysis; explained clearly during setup with a privacy-first disclosure.
- Clipboard access: only when the user explicitly opens the clipboard panel; no background clipboard reading.
- Notifications: requested only after first relevant event (e.g., weekly summary opt-in).
- No camera, microphone, location, contacts, or calendar access required for V1.
- User-typed text sent to the server for analysis is processed ephemerally: not stored beyond the analysis session unless the user explicitly saves a document.
- All text in transit is encrypted (TLS 1.3); text at rest in documents is encrypted (AES-256 or equivalent).
- Local on-device model weights are bundled with the app and do not phone home.
- No user text is used for model training without explicit, granular opt-in consent.
- Safety filters block: analysis of content that appears to be credentials, credit card numbers, SSNs, or other PII patterns — these are flagged but never logged server-side.
- Data export includes all documents, suggestions, dictionary, stats, and account data.
- Account deletion purges all server-side data within documented retention window (legal holds excepted).
- Manual verification required: exact iOS Full Access permission prompt wording, Android InputMethodService permission flow, clipboard permission behavior per OS version.

## Analytics And Monetization

- Events tracked: session_start, keyboard_activated, text_analyzed, suggestion_shown, suggestion_accepted, suggestion_dismissed, tone_detected, tone_adjusted, rewrite_requested, rewrite_accepted, score_viewed, dictionary_word_added, clipboard_item_inserted, theme_changed, stats_viewed.
- Event properties: coarse text length bucket, suggestion category, tone label, score bucket, latency bucket, platform. Never raw user text, corrections, or personal content.
- Monetization model: free tier with basic grammar and spelling; premium tier unlocks tone detection, full rewrites, advanced style suggestions, writing stats, and unlimited analysis.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate basic spelling/grammar corrections, personal dictionary, data export/delete, account recovery, or existing document access.

## Edge Cases

- Host app uses a custom text field that does not expose the input connection: suggestion bar still shows corrections but inline underlines are unavailable; display a "limited mode" indicator.
- User types in a language the model does not support: disable grammar analysis for unsupported languages, show a "language not supported" badge, and still allow basic keyboard input.
- Extremely long text input (>5000 words): chunk analysis into segments, stream results progressively, show a progress indicator.
- Network timeout during server-side analysis: fall back to on-device results with a "partial analysis" indicator; retry server analysis in background.
- User revokes Full Access (iOS) or disables the keyboard mid-session: degrade gracefully to a standard keyboard with no suggestions; prompt re-enablement on next app open.
- Conflicting suggestions: if two rules produce overlapping corrections, prioritize by severity (critical > warning > info) and show only the higher-priority suggestion.
- Clipboard panel overflow: when the 20-item limit is reached, evict the oldest non-pinned item.
- Subscription expires mid-session: allow the current analysis to complete, then revert to free-tier features on the next analysis request.
- Multiple keyboards installed: the setup guide must detect whether the custom keyboard is the active input method and prompt if not.
- Device low-memory conditions: reduce on-device model precision or disable background pre-analysis to stay within memory limits.

## Test Plan

- Unit tests: debounce logic, suggestion state machine (pending/accepted/dismissed), score calculation from sub-scores, tone label classification, dictionary add/remove, clipboard eviction, theme application.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, and server error responses.
- Integration tests: full flow from keystroke through debounce, analysis request, SSE response, suggestion rendering, and inline correction application; tone detection end-to-end; rewrite request through selection.
- Keyboard extension tests: InputMethodService lifecycle on Android (create, show, hide, destroy); iOS keyboard extension memory limits and lifecycle; input connection edge cases per host app.
- Streaming tests: SSE reconnection on network drop, partial analysis fallback, progressive chunked analysis for long text, cancellation on text field switch.
- Offline tests: on-device grammar/spelling without connectivity, queued analysis on reconnect, stats sync after offline period.
- Safety tests: PII pattern detection and suppression, ephemeral processing verification (no server-side text persistence), clipboard data locality.
- Accessibility tests: suggestion bar screen-reader labels, tone badge announcements, score badge VoiceOver/TalkBack descriptions, keyboard height adjustment for accessibility.
- Performance tests: analysis latency under 100ms for on-device checks, keyboard render time under 16ms per frame, memory usage within extension limits (iOS 60MB, Android varies).
- Manual verification tests: iOS Full Access permission flow, Android keyboard enablement flow, clipboard access behavior, subscription restore, push notification delivery.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Custom keyboard extension activates system-wide and provides text input across third-party apps.
- Real-time grammar and spelling suggestions appear within 300ms of typing pause.
- Tone detection displays primary and secondary tones with intensity after two or more sentences.
- Full sentence rewrites offer at least three variant options with style labels.
- Writing quality score (0–100) updates in near real-time with four sub-score categories visible.
- Personal dictionary syncs across devices and suppresses future suggestions for added words.
- Keyboard themes, sound, haptic, and height settings apply immediately.
- Clipboard panel stores up to 20 items with pin, auto-expire, and local-only storage.
- Offline mode provides basic grammar/spelling via on-device model with clear offline indicator.
- Safety: no raw user text is logged server-side; PII patterns are detected and suppressed.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What is the exact latency profile of Grammarly Keyboard's server-side analysis for texts of varying length?
- How does Grammarly handle languages beyond English in the mobile keyboard (partial support, separate models, or unsupported)?
- What is the exact iOS keyboard extension memory limit enforced at runtime, and how does Grammarly stay within it?
- Does Grammarly Keyboard use on-device models for any analysis, or is all processing server-side?
- How does the tone detector handle mixed-tone text (e.g., a message that is both friendly and assertive)?
- What is the exact clipboard access behavior on iOS 16+ and Android 13+ with stricter clipboard permissions?
- How does Grammarly handle host apps with custom input fields that do not use standard text input APIs?
- What are the exact free-tier vs. premium-tier feature boundaries on the mobile keyboard?

## Build Plan

- **Phase 1 — App Shell + Auth + Keyboard Setup**: Auth flows (email and OAuth), guided keyboard setup with deep links to system settings, keyboard enablement verification, basic app shell with dashboard placeholder. Target: user can install and activate the custom keyboard.
- **Phase 2 — Custom Keyboard + Basic Corrections**: Native keyboard extension (InputMethodService / iOS Keyboard Extension), QWERTY layout with suggestion bar, on-device spelling and common grammar model, inline correction chips, accept/dismiss flow. Target: functional keyboard with basic spelling/grammar.
- **Phase 3 — Server-Side Analysis + Tone + Score**: Server-side analysis endpoint with SSE streaming, advanced grammar/style/clarity suggestions, tone detection with badge and detail panel, writing quality score with sub-scores. Target: full analysis pipeline with tone and score.
- **Phase 4 — Rewrites + Vocabulary**: Full sentence rewrite panel with streaming variants, vocabulary enhancement suggestions, "Adjust Tone" rewrite flow, rewrite acceptance and logging. Target: AI-powered rewriting capabilities.
- **Phase 5 — Stats + Dictionary + Clipboard**: Writing statistics dashboard with trends, personal dictionary management and sync, clipboard/snippet panel with pin and auto-expire, emoji/GIF suggestion integration. Target: complete utility features.
- **Phase 6 — Themes + Subscription + Polish**: Keyboard theme picker, sound/haptic/height settings, premium subscription with IAP, paywall enforcement, offline polish, accessibility audit, safety hardening, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with a Grammarly Keyboard free account to capture exact suggestion UX, tone detection behavior, keyboard layout, and permission prompt flows.
- Evaluate open-source NLP models (LanguageTool, GECToR, or similar) for on-device grammar and spelling as a starting point for the local analysis engine.
- Design original keyboard UI, branding, app icon, and onboarding copy distinct from Grammarly's copyrighted materials.
- Prototype the custom keyboard extension on both iOS and Android to validate memory limits, input connection APIs, and suggestion bar rendering constraints.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
