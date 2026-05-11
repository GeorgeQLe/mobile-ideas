# Consensus-Style Clone Spec

> Metadata
> - Inspiration app: Consensus
> - Category: academic research, AI-powered paper search, evidence synthesis
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, publicly documented features.
> - Manual verification blockers: native iOS/Android screens, signup/login flows, consensus meter scoring algorithm, study snapshot generation quality, search ranking internals, citation formatting edge cases, subscription enforcement thresholds, push notification payloads, and SSE streaming event schemas require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary ranking algorithms, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI-powered academic research assistant inspired by Consensus's public product: a natural language search engine over peer-reviewed papers that synthesizes evidence-backed answers, generates structured study snapshots, visualizes scientific agreement via a consensus meter, and supports citation export in multiple formats. The clone focuses on making academic research accessible to researchers, students, and professionals who need evidence-based answers without manually reading hundreds of papers.

The clone must use original branding, UI copy, sample queries, and licensed data providers. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact native behavior.

## Goals

- Provide a mobile-first natural language search interface for querying academic literature and receiving evidence-backed answers.
- Synthesize study snapshots — structured summaries of individual papers including methods, findings, sample size, and study type.
- Visualize scientific agreement on research topics through a consensus meter with transparent methodology.
- Support citation export in APA, MLA, Chicago, and BibTeX formats with clipboard and share-sheet integration.
- Enable research topic exploration with related papers, follow-up questions, and topic clustering.
- Display rich paper metadata including authors, journal, publication year, citation count, study type, and abstract.
- Offer saved papers and user-created reading lists for organizing research across sessions.
- Provide search filters for year range, study type, journal, sample size, and open-access status.
- Support subscription tiers with a free tier offering limited searches and a premium tier with unlimited access.
- Offer dark and light theme with system-preference auto-detection.

## Non-Goals

- Do not imply affiliation with Consensus Technologies, Inc. or any associated entity.
- Do not copy proprietary ranking algorithms, evidence synthesis models, consensus scoring formulas, or private API schemas.
- Do not replicate exact search quotas, rate limits, or pricing without independent verification.
- Do not present AI-generated summaries as peer-reviewed conclusions; always include a synthesis disclaimer.
- Do not scrape or redistribute copyrighted full-text papers; link to publisher pages or open-access sources only.
- Do not provide medical, legal, or financial advice based on synthesized research; include domain-specific disclaimers.
- Do not process or store full-text PDFs without explicit licensing agreements with publishers.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Consensus Website | https://consensus.app | Product positioning, search interface, study snapshots, consensus meter, feature descriptions | Verified 2026-05-11 |
| Apple App Store | https://apps.apple.com/us/app/consensus-ai-search-engine/id6446308818 | iOS listing, category, rating, feature description, screenshots | Verified 2026-05-11 |
| Google Play | https://play.google.com/store/apps/details?id=com.consensus.app | Android listing, permissions, data safety, feature description | Verified 2026-05-11 |
| Consensus Blog | https://consensus.app/blog | Feature announcements, methodology explanations, product updates | Verified 2026-05-11 |

## Detailed Design

### Natural Language Search

- User submits a research question in natural language (e.g., "Does vitamin D supplementation reduce depression?"); the system returns evidence-backed results from peer-reviewed papers.
- Search results include an AI-synthesized answer summarizing the overall evidence, followed by individual paper cards ranked by relevance.
- Each paper card displays title, authors, journal, year, citation count, study type badge (RCT, meta-analysis, cohort, etc.), and a brief finding snippet.
- Autocomplete suggests popular research queries and related topics as the user types.
- Search history is persisted locally and synced to the user account for cross-device access.

### Study Snapshots

- Each paper result can be expanded into a study snapshot — a structured summary generated by AI.
- Snapshot sections include: population/sample, methods/design, key findings, limitations, and study quality indicators.
- Snapshots clearly label AI-generated content with a synthesis disclaimer and link to the original paper.
- Snapshots are cached after first generation to avoid redundant processing and are versioned if the underlying model improves.
- Users can share snapshots as formatted text or images.

### Consensus Meter

- For qualifying queries (those with sufficient supporting studies), a consensus meter visualizes the degree of scientific agreement.
- The meter displays a percentage or categorical label (e.g., "Strong consensus: Yes", "Mixed evidence", "Insufficient studies") based on the proportion of studies supporting, opposing, or being neutral on the queried claim.
- The meter includes a breakdown showing how many studies support, oppose, or are neutral, with the ability to tap into each category and see the underlying papers.
- Methodology transparency: a help tooltip explains how the meter is calculated and its limitations.
- The meter is not displayed when fewer than a configurable minimum number of studies are available.

### Citation Export

- Users can export citations for individual papers or bulk-export from reading lists.
- Supported formats: APA 7th edition, MLA 9th edition, Chicago 17th edition, and BibTeX.
- Export actions: copy to clipboard, share via system share sheet, or export as a .bib file for BibTeX.
- Citation formatting follows official style guide rules; edge cases (missing fields, preprints, non-English titles) use graceful fallbacks.
- Bulk export concatenates citations with proper separators per format.

### Search Filters

- Year range: slider or text input for start and end publication year.
- Study type: multi-select from categories (RCT, meta-analysis, systematic review, cohort study, case-control, cross-sectional, case report, review).
- Journal: typeahead search for specific journal names.
- Sample size: range filter (minimum sample size threshold).
- Open access: toggle to show only freely accessible papers.
- Filters are combinable and persist within a search session; clearing resets to defaults.

### Reading Lists and Saved Papers

- Users can save individual papers to a default "Saved Papers" collection with one tap.
- Users can create named reading lists and organize saved papers into them.
- Papers can belong to multiple reading lists.
- Reading lists support reordering, renaming, and deletion.
- Saved papers and reading lists sync across devices via the user account.

### Theme Support

- Light and dark themes with a system-preference auto-detection option.
- Theme preference persists in user settings and syncs across devices.
- All screens, including study snapshots and the consensus meter, adapt to the active theme.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen with academic research value prop, creates account or signs in, lands on search home with suggested research topics.
2. **Evidence Search**: User types a research question, views AI-synthesized answer and paper cards, scrolls through results, applies filters to narrow by study type and year.
3. **Study Snapshot**: User taps a paper card, views the structured study snapshot with methods, findings, and limitations, shares the snapshot with a colleague.
4. **Consensus Check**: User asks a yes/no research question, views the consensus meter showing scientific agreement, taps into supporting and opposing studies.
5. **Citation Export**: User finds a relevant paper, taps export, selects APA format, copies citation to clipboard, pastes into their manuscript.
6. **Reading List Management**: User saves multiple papers during a search session, creates a new reading list, moves saved papers into it, exports all citations as BibTeX.
7. **Filter Refinement**: User searches broadly, gets too many results, applies year range and study type filters, narrows to recent meta-analyses only.
8. **Returning Researcher**: User reopens app, views recent searches on home screen, taps a previous query to see updated results.
9. **Offline Browsing**: User loses connectivity, browses previously viewed study snapshots and saved papers from cache, queues a new search as a draft.
10. **Subscription Upgrade**: User hits free tier search limit, views subscription comparison, upgrades to premium, immediately resumes searching.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth (Google, Apple), academic use consent |
| Search Home | Primary entry point | Search bar, suggested topics, recent searches, trending questions |
| Search Results | Evidence display | AI-synthesized answer, paper cards, consensus meter preview, filter bar, sort options |
| Paper Detail / Study Snapshot | Individual paper deep dive | Study snapshot sections, paper metadata, citation export button, save button, original paper link |
| Consensus Meter | Agreement visualization | Percentage/category display, study breakdown (for/against/neutral), methodology tooltip, paper list per category |
| Saved Papers | Personal paper library | Paper cards, sort/filter, bulk select, bulk export, remove |
| Reading Lists | Organized collections | List of reading lists with paper counts, create/rename/delete, reorder |
| Citation Export | Format selection and output | Format picker (APA/MLA/Chicago/BibTeX), preview, copy/share/export actions |
| Settings | App configuration | Theme toggle, notification preferences, search defaults, data export, delete account, about |
| Subscription | Billing and tier management | Plan comparison, current usage counter, upgrade/downgrade, billing history, restore purchases |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, institution, role (researcher/student/professional), created_at, quota_tier, consent_state, theme_preference, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, app_version, created_at, revoked_at |
| SearchQuery | id, user_id, query_text, filters_applied (json), result_count, consensus_available, created_at |
| SearchResult | id, query_id, paper_id, rank, relevance_score, finding_snippet, created_at |
| Paper | id, external_id, title, authors (json array), journal, publication_year, doi, citation_count, study_type, abstract, open_access, source_url, indexed_at, updated_at |
| StudySnapshot | id, paper_id, population, methods, key_findings, limitations, quality_indicators (json), model_version, generated_at, cached_until |
| ConsensusMeter | id, query_id, total_studies, supporting_count, opposing_count, neutral_count, consensus_label, consensus_percentage, methodology_note, generated_at |
| Citation | id, paper_id, format (apa/mla/chicago/bibtex), formatted_text, generated_at |
| ReadingList | id, user_id, name, description, paper_count, sort_order, created_at, updated_at |
| SavedPaper | id, user_id, paper_id, reading_list_id (nullable), saved_at, sort_position |
| Subscription | id, user_id, tier (free/premium), store_product_id, started_at, expires_at, auto_renew, cancellation_at, platform |
| AuditEvent | id, user_id, event_type, metadata (json), created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation (email or OAuth) |
| /auth/login | POST | Session creation |
| /auth/logout | DELETE | Session revocation |
| /auth/refresh | POST | Token refresh |
| /search | POST | Submit natural language research query (returns SSE stream) |
| /search/suggestions | GET | Autocomplete and trending query suggestions |
| /search/history | GET | List user search history |
| /search/history/:id | DELETE | Remove a search from history |
| /papers/:id | GET | Fetch paper metadata |
| /papers/:id/snapshot | GET | Fetch or generate study snapshot for a paper |
| /papers/:id/citations | GET | Get formatted citations (query param: format) |
| /papers/:id/citations/bulk | POST | Bulk citation export for multiple papers |
| /consensus/:queryId | GET | Fetch consensus meter for a search query |
| /consensus/:queryId/studies | GET | List studies grouped by stance (supporting/opposing/neutral) |
| /reading-lists | GET | List user reading lists |
| /reading-lists | POST | Create a new reading list |
| /reading-lists/:id | PATCH | Rename or reorder a reading list |
| /reading-lists/:id | DELETE | Delete a reading list |
| /reading-lists/:id/papers | GET | List papers in a reading list |
| /reading-lists/:id/papers | POST | Add a paper to a reading list |
| /reading-lists/:id/papers/:paperId | DELETE | Remove a paper from a reading list |
| /saved-papers | GET | List all saved papers |
| /saved-papers | POST | Save a paper |
| /saved-papers/:id | DELETE | Unsave a paper |
| /settings | GET | Fetch user settings (theme, notifications, defaults) |
| /settings | PATCH | Update user settings |
| /subscriptions | GET | Current subscription state and usage |
| /subscriptions | POST | Create or change subscription |
| /subscriptions/restore | POST | Restore purchases from app store |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: The `/search` endpoint returns an SSE stream with the following event types:

| Event | Payload | Purpose |
|---|---|---|
| search_start | `{ query_id, estimated_results }` | Acknowledge query receipt, provide query ID |
| search_result | `{ paper_id, rank, title, authors, year, study_type, snippet }` | Individual paper result as it becomes available |
| consensus_delta | `{ supporting, opposing, neutral, label, percentage }` | Progressive consensus meter update |
| snapshot_delta | `{ paper_id, section, content }` | Streaming study snapshot section content |
| error | `{ code, message }` | Error during search or synthesis |
| done | `{ total_results, consensus_available }` | Stream complete signal |

## Realtime Push And Offline Behavior

- Search response streaming uses SSE with automatic reconnection and resume from last event ID.
- Paper cards render incrementally as `search_result` events arrive; the consensus meter animates as `consensus_delta` events update.
- Study snapshots stream section-by-section via `snapshot_delta` events for perceived responsiveness.
- Offline mode: previously viewed search results, study snapshots, saved papers, and reading lists are readable from local cache.
- New search queries entered offline are queued as drafts and submitted automatically on reconnect.
- Reconnect reconciliation uses idempotency keys to prevent duplicate search submissions.
- Push notifications (opt-in): subscription status changes, weekly research digest (if enabled), account security events.
- Local cache uses a TTL strategy; paper metadata and snapshots are cached for 7 days, search results for 24 hours.
- Cache invalidation occurs on app foreground via a lightweight sync endpoint that returns changed entity timestamps.
- Reading list and saved paper mutations are queued offline and synced with last-write-wins conflict resolution on reconnect.

## Permissions Privacy And Safety

- Camera/photo library: not required for V1.
- Notifications: requested only after first relevant event (e.g., subscription change or weekly digest opt-in).
- Clipboard: write only on explicit citation copy action; no background clipboard monitoring.
- No microphone, location, contacts, calendar, or file access required.
- User search queries and reading lists are not used for model training without explicit opt-in consent.
- Paper metadata is sourced from licensed or open-access academic databases; no copyrighted full-text is stored or redistributed.
- Study snapshots carry a disclaimer: "AI-generated summary. Verify findings against the original paper before citing."
- Consensus meter carries a disclaimer: "Automated synthesis of available studies. Not a substitute for systematic review."
- Safety filters block: health misinformation amplification, pseudoscience promotion as consensus, fabricated study references, and personally identifiable researcher information beyond public metadata.
- Domain-specific disclaimers for medical, legal, and financial research topics: "This synthesis is not professional advice. Consult a qualified professional."
- Data export includes all search history, saved papers, reading lists, and account data.
- Account deletion purges all user data within the documented retention window (30 days).
- Manual verification required: exact permission prompt timing, app-store privacy labels, push payload format, GDPR/CCPA compliance flows.

## Analytics And Monetization

- Events tracked: session_start, search_submitted, search_filter_applied, paper_viewed, snapshot_viewed, snapshot_shared, consensus_meter_viewed, citation_exported, paper_saved, reading_list_created, reading_list_paper_added, subscription_viewed, subscription_upgraded, quota_limit_reached.
- Event properties: coarse latency bucket, study type filter, result count bucket, export format, quota tier. Never raw query text, paper content, or user research topics.
- Monetization model: free tier with a daily search limit (exact threshold requires verification); premium tier for unlimited searches, bulk citation export, priority snapshot generation, and advanced filters.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate: saved papers access, reading list browsing, previously cached snapshots, data export/delete, account recovery, or safety disclaimers.

## Edge Cases

- AI synthesis produces a factually incorrect summary: snapshot disclaimer is always visible; users can report inaccuracies via a feedback button on each snapshot.
- Consensus meter disagrees with established scientific consensus: methodology tooltip explains limitations; a "report concern" option is available.
- Search returns zero results: display "no results" state with suggestions to broaden the query, remove filters, or try related terms.
- Paper has incomplete metadata (missing authors, journal, or year): display available fields with "Not available" placeholders; citation export uses graceful fallbacks per format spec.
- Citation format edge cases (preprints, non-English titles, papers with >20 authors): follow official style guide truncation and transliteration rules.
- Consensus meter has fewer than the minimum study threshold: hide meter and display "Insufficient studies for consensus analysis" message.
- User saves a paper that is later retracted: if retraction data is available, display a retraction badge and warning on the paper card and snapshot.
- Streaming response interrupted mid-snapshot: preserve partial snapshot with visual indicator that generation was interrupted; offer retry.
- Quota exhausted mid-search-stream: complete current streaming results but block the next search with a reset countdown.
- Bulk citation export exceeds reasonable size (>500 papers): warn user and paginate or cap the export with a clear message.
- Reading list sync conflict (multiple devices): last-write-wins with a conflict indicator showing which device made the latest change.
- External paper link is broken (publisher URL changed): display the DOI-based fallback URL; if DOI is missing, show "Source unavailable" with the last-known URL.
- User applies contradictory filters (e.g., year range that excludes all results): display empty state with a hint about the active filter combination.

## Test Plan

- Unit tests: search query parsing and normalization, citation formatting for all four formats with edge cases (missing fields, long author lists, preprints), consensus meter percentage calculation and label assignment, filter combination validation, SSE event parsing, cache TTL logic, reading list sort/reorder operations.
- Contract tests: all API endpoints with success, validation error, auth error, quota exceeded, and server error responses.
- Integration tests: full flow from natural language query through synthesized answer and paper results; study snapshot generation and caching; consensus meter display for qualifying and non-qualifying queries; citation export in all formats; reading list CRUD with paper management.
- Streaming tests: SSE reconnection and resume from last event ID, progressive paper card rendering, consensus meter animation during delta events, snapshot section streaming, error event handling mid-stream.
- Offline tests: cached content availability, draft search queuing, reconnect sync with idempotency, reading list offline mutation queuing.
- Filter tests: individual and combined filter application, filter persistence within session, filter reset behavior, empty-result filter combinations.
- Subscription tests: free tier quota enforcement, premium tier unlimited access, trial activation, renewal, cancellation, restore purchases, cross-platform entitlement sync, paywall bypass for non-gated features.
- Safety tests: synthesis disclaimer presence on all snapshots, consensus meter methodology tooltip, domain-specific disclaimers for medical/legal/financial queries, blocked content categories, report submission flow.
- Accessibility tests: screen reader announcements for paper cards with metadata, consensus meter percentage and label, citation formatted text, search result streaming progress, filter state changes, theme switching.
- Performance tests: search result streaming render rate, snapshot generation latency, citation bulk export timing, reading list with >100 papers scroll performance, cache read/write speed.
- Manual verification tests: native app permission prompts, store purchase/restore, push notification delivery, exact search UX on device, consensus meter animation fidelity.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Natural language search returns AI-synthesized answers with individual paper results and metadata.
- Study snapshots provide structured summaries with population, methods, findings, limitations, and quality indicators.
- Consensus meter visualizes scientific agreement with study counts and methodology transparency.
- Citation export produces correctly formatted output in APA, MLA, Chicago, and BibTeX formats.
- Search filters (year, study type, journal, sample size, open access) are combinable and functional.
- Saved papers and reading lists support full CRUD with cross-device sync.
- Streaming handles all event types (search_result, consensus_delta, snapshot_delta, error, done) without UI corruption.
- Free tier quota is enforced with visible counters and graceful exhaustion UX.
- Offline mode preserves cached content and queues new searches as drafts.
- Safety disclaimers are present on all AI-generated content (snapshots and consensus meter).
- Dark and light themes are functional across all screens.
- Manual verification blockers are documented and feature-flagged.
- At least 12 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What is the exact daily search limit for the free tier on mobile?
- Which academic paper databases does Consensus source from (Semantic Scholar, PubMed, OpenAlex, proprietary index)?
- What is the minimum number of studies required before the consensus meter is displayed?
- How does the consensus scoring algorithm weight study type (e.g., RCT vs. observational)?
- Does the mobile app support full offline paper reading or only metadata/snapshot caching?
- What specific model(s) power the evidence synthesis and study snapshot generation?
- Are there region-specific access restrictions or language limitations?
- What is the exact SSE event schema for snapshot streaming vs. search result streaming?
- Does the app support institutional/university SSO authentication?
- What is the retention policy for cached study snapshots when the underlying model version changes?

## Build Plan

- **Phase 1 — App Shell, Auth, Search**: Auth flows (email, Google/Apple OAuth), natural language search with streaming paper results, basic paper card display with metadata. Target: functional search shell.
- **Phase 2 — Study Snapshots and Paper Detail**: Study snapshot generation and display, paper detail screen with full metadata, original paper linking, snapshot caching and versioning. Target: individual paper deep dive.
- **Phase 3 — Consensus Meter**: Consensus meter visualization, study breakdown by stance, methodology transparency tooltip, minimum study threshold enforcement. Target: evidence agreement visualization.
- **Phase 4 — Citations and Export**: Citation formatting engine for APA/MLA/Chicago/BibTeX, copy/share/export actions, bulk export from reading lists, edge case formatting. Target: citation workflow.
- **Phase 5 — Reading Lists and Saved Papers**: Save paper flow, reading list CRUD, paper organization across lists, cross-device sync, offline caching for saved content. Target: personal research library.
- **Phase 6 — Filters, Subscription, and Polish**: Search filter UI and backend integration, subscription billing via IAP, quota enforcement, dark/light theme, accessibility audit, safety disclaimer hardening, manual native verification. Target: app-store-ready quality.

## Next Steps

- Verify exact App Store and Google Play listing URLs; update Research Sources status accordingly.
- Conduct lawful hands-on verification session to capture exact search UX, study snapshot format, consensus meter behavior, and quota thresholds.
- Identify licensed academic paper data sources (Semantic Scholar API, OpenAlex, PubMed) for the paper index.
- Select original providers for AI synthesis (evidence summarization model, snapshot generation model).
- Design original branding, UI copy, and sample research queries distinct from Consensus's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
