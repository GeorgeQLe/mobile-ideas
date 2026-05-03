# Bear-Style Clone Spec

> Metadata
> - Inspiration app: Bear
> - Category: Notes
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public App Store listing, Bear product/FAQ/privacy pages, and public subscription/export feature descriptions.
> - Manual verification blockers: cross-device sync fidelity, themes, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, proprietary themes/typography, private APIs, sync implementation, and customer note content.

## Overview

Build an original mobile Markdown notes app inspired by Bear's public product and marketplace materials: plain-text/Markdown writing, hashtag organization, nested tags, tasks, links/backlinks, attachments, themes, export, Siri/Shortcuts-style capture, lock/privacy features, and paid sync.

The clone must not copy Bear/Shiny Frog branding, iconography, screenshots, UI copy, proprietary themes/typography, private APIs, sync implementation, or customer note content. V1 can reproduce comparable note-taking jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Markdown editor with inline hashtag organization.
- Nested hashtags automatically form a tag tree.
- Rich-link previews and image embedding.
- Themes and customizable typography.
- Cross-device sync (paid tier).
- Tasks/checklists, note linking/backlinks, Spotlight/search, export formats, and lock/privacy controls.
- Offline-first local editing with explicit paid sync and restore flows.

## Non-Goals

- Do not imply Shiny Frog affiliation.
- Do not copy themes or typography assets.
- Do not ship team collaboration in V1.
- Do not claim exact Bear Pro parity until subscription, iCloud/sync, and theme behavior are manually verified.
- Do not send note text, attachments, OCR text, or tag paths to analytics/support without explicit consent.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/bear-markdown-notes/id1016366447 | Official iOS/iPad/Watch listing, feature list, in-app purchase signal, privacy labels, platform support | Verified 2026-05-03 |
| Bear Product Page | https://bear.app/ | Public product capabilities: Markdown, tags, backlinks, tasks, export, themes, Siri/Shortcuts, privacy, Bear Pro positioning | Verified 2026-05-03 |
| Bear FAQ / Support | https://bear.app/faq/ | Hashtags, sync, encryption/lock, import/export, search, troubleshooting support taxonomy | Verified 2026-05-03 |
| Bear Privacy Policy | https://bear.app/privacy/ | Personal-data, diagnostics, subscription, sync, and support-data handling context | Verified 2026-05-03 |
| Bear Terms | https://bear.app/terms/ | Account, subscription, acceptable-use, and service legal context | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Notes are Markdown with inline #hashtag organization.
- Nested hashtags with slash (e.g. #work/meetings) form a tree.
- Rich-link previews render in notes for URLs.
- Image embedding with local storage.
- Paid sync across devices with encryption in transit and at rest.
- Editor must preserve Markdown/plain-text portability while offering rendered affordances for headings, links, tasks, tables, images, and attachments.
- Tags are parsed from note content and can include multi-word and nested forms; duplicate/case variants must be normalized consistently.
- Backlinks/wiki links must update a note-info panel and support unresolved links.
- Search must support text, tags, special filters such as todo/images-like queries, attachments/OCR where licensed, and Spotlight/platform indexing where allowed.
- Export must support Markdown/plain text in V1 and premium/staged rich formats only when generated with original templates.
- Themes, fonts, app icons, and typography settings must be original or properly licensed; no Bear theme assets may be copied.
- Note lock/biometric unlock must keep encrypted note content local and document sync/backup limitations.
- Sync must be paid/entitlement-aware, resumable, conflict-aware, and manually verified across devices before parity claims.
- Link preview fetching must be SSRF-safe and never fetch private-network URLs.

## Core User Journeys

- User creates a note with #work and #work/meetings; tag tree updates.
- User pastes a URL; preview card appears with fetched metadata.
- User embeds image from library.
- User changes theme and typography.
- User enables sync (paid) and sees notes across devices.
- User searches by text or hashtag.
- User pins favorite notes.
- User exports note as Markdown/PDF.
- User creates a task list inside a note and filters all notes with incomplete tasks.
- User links two notes and sees backlinks in the note info panel.
- User locks a sensitive note and unlocks with biometrics.
- User imports Markdown/text files and verifies tags are parsed.
- User restores Bear Pro-like entitlement and syncs notes on a second device.
- User deletes account/sync data while retaining local export.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Sidebar | Tag tree + smart folders | navigate | empty, loaded | tag cycle |
| Notes List | Filtered notes | search, sort | empty, items | stale index |
| Editor | Markdown + preview | type, paste, embed | editing, saved | conflict |
| Link Preview | Fetched metadata | auto | loaded, failed | blocked domain |
| Themes | Switch appearance | pick | applied | resource missing |
| Settings | Sync, typography | toggles | loaded | sync error |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |
| Export | Export formats | pick, share | generated | format unsupported |
| Note Info / Backlinks | Metadata and related notes | open panel, tap link | loaded, empty | stale index |
| Search / Special Filters | Find notes and attachments | query, token | results, empty | OCR unavailable |
| Import | Bring in text/Markdown | file, folder | imported | unsupported format |
| Lock / Privacy | Protect notes/app | password, biometric | locked, unlocked | key lost |
| Attachments / OCR | Manage media and documents | add, scan | indexed, failed | file too large |

## Data Model

- `Note`: content reference, title, Markdown AST/index, tags, backlinks, pinned/archived/trashed state, lock state, order/sort keys.
- `Tag`: normalized path, display label, parent, icon/color if original, pinned state, note count.
- `TaskMarker`: note, line/block reference, checked state, text reference, due metadata if original.
- `Attachment`: note, local URI, type, dimensions/bytes, OCR text reference, upload state.
- `LinkPreviewCache`: URL hash, metadata, fetch status, expiry, SSRF validation result.
- `BacklinkIndex`: source note, target note/path, unresolved flag, block/heading anchor.
- `SearchIndex`: note tokens, tag tokens, attachment/OCR tokens, updated revision.
- `Theme`: original palette/font settings, dark/light variants, premium gate, license metadata.
- `TypographySetting`: font family/license, line height, paragraph spacing, editor width.
- `SyncOp`: encrypted payload, entity, revision, conflict base, idempotency key.
- `Entitlement`: Bear-Pro-like plan, store/web owner, trial, restore, expiration, feature flags.
- `AuditEvent`: sync, import/export, lock/unlock, billing, privacy, support, and account deletion events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `GET /notes`, `POST /notes`, `PATCH /notes/:id`, `DELETE /notes/:id`.
- `GET /sync/ops?since=`, `POST /sync/ops`.
- `POST /link-previews` (server-side fetch with safe rules).
- `GET /entitlements`, `POST /billing/webhook`.
- `POST /imports`, `POST /exports`, `POST /data-export`, `DELETE /account`: data lifecycle.
- `GET /search?q=`, `POST /index/rebuild`: local or backend-backed search facade for tests.
- `POST /locks/:noteId/enroll`, `POST /locks/:noteId/unlock`: local encryption test surfaces.

## Realtime, Push, And Offline Behavior

- Offline-first; sync opportunistic.
- Link previews cached; refresh on demand.
- Push for sync status (optional).
- Images stored locally; uploaded to sync service when paid.
- Local edits must never require network and must be recoverable after app restart.
- Sync conflicts preserve both versions and identify changed blocks where possible.
- Search/OCR indexing runs incrementally and degrades when permission or entitlement is missing.
- Share extension/Siri/Shortcuts capture lands in Inbox/untagged notes with retry state.

## Permissions, Privacy, And Safety

- No telemetry by default; opt-in.
- Link-preview fetcher uses SSRF-safe rules; no fetch from private networks.
- Sync E2EE optional (preferred) or in-transit encrypted; document the tradeoff.
- Analytics exclude note content.
- Export + delete account.
- Treat note titles, tags, backlinks, attachment filenames, OCR text, and theme names as sensitive.
- Link-preview service strips credentials/fragments and blocks private networks, localhost, metadata IPs, and oversized downloads.
- Locked notes use local encryption keys, biometric gate as convenience only, and clear lost-key behavior.
- Sync credentials, store receipts, and lock keys require encrypted storage and redacted logs.
- Support diagnostics require explicit consent before including note metadata, tag paths, or attachment details.

## Analytics And Monetization

- Events: note created/edited, tag created, link preview fetched, theme changed, sync enabled.
- Tiers: free + paid sync; original names.
- Paywall only at sync and premium themes.
- Analytics payloads use event type, counts, latency, failure codes, feature gate, and vault/note-size buckets only.
- Entitlements may gate sync, premium themes, export formats, OCR/PDF search, app icons, and advanced typography.
- Billing must handle trial, active, expired, canceled, refunded, restored, family/shared, store-owned, and web-owned states.

## Edge Cases

- Nested hashtag with special chars.
- Link preview fetch timeout.
- Huge image embedded; resize on insert.
- Sync conflict with identical edits.
- Theme resource missing after update.
- Hashtag inside code block or URL should not become a tag.
- Multi-word/nested tag rename conflicts with existing path.
- Link preview fetch redirects to private network or huge file.
- Locked note syncs to new device without local unlock key.
- OCR text extraction fails or exposes sensitive attachment text.
- Export format fails for large embedded images.
- Store entitlement restored before sync account is available.

## Test Plan

- Unit tests for hashtag parser, tag tree builder, sync merge.
- Contract tests for notes and sync endpoints.
- Integration tests for create -> tag -> search -> export.
- SSRF-safety tests for link preview fetcher.
- Billing tests for sync subscription.
- Accessibility tests for editor and tag tree.
- Manual verification: themes, sync across devices.
- Unit tests for Markdown parsing, hashtag extraction, nested tag tree, backlink index, link-preview SSRF rules, lock encryption, search filters, and sync merges.
- Contract tests for notes, sync, link previews, import/export, entitlements, billing webhook, data export/delete, and audit events.
- Integration tests for create -> tag -> task marker -> backlink -> search -> export.
- Offline/conflict tests for note edits, tag renames, attachment uploads, locked notes, and deleted notes.
- Privacy/security tests for analytics redaction, link-preview fetcher, support diagnostics consent, encrypted storage, lock key handling, and account delete.
- Accessibility tests for editor, tag tree, search results, attachment controls, lock prompts, dynamic type, VoiceOver, reduced motion, and keyboard alternatives.
- Manual verification tests: Bear Pro purchase/restore, iCloud/sync behavior, themes/app icons, widgets/watch/Siri/Shortcuts, export formats, and mobile accessibility.

## Acceptance Criteria

- Source URLs verified.
- Notes + hashtags + link previews + themes complete.
- Sync works across two devices (paid).
- Entitlements reconcile.
- Manual blockers feature-flagged.
- A downstream team can build V1 without Bear/Shiny Frog brand assets, proprietary themes/typography, private APIs, sync code, screenshots, UI copy, or customer notes.
- Markdown editing, tags, backlinks, tasks, attachments, search, lock/privacy, sync, import/export, billing, and account deletion have deterministic contracts and failure states.
- Analytics, logs, link previews, OCR/search indexes, support diagnostics, and sync metadata minimize note-content, tag, attachment, and backlink exposure.
- Premium gates, restore, sync account state, locked-note state, and local data ownership reconcile safely.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- E2EE or server-side encryption for sync?
- Which platforms in V1 (iOS only? Android parity?)
- Desktop companion in V2?
- Typography licensing?
- Which export formats are V1 versus premium/staged?
- Is OCR/PDF text search in scope or deferred behind licensing and privacy review?
- Should note locking encrypt entire note bodies only, attachments too, or both?

## Build Plan

- Phase 1: scaffold local Markdown note store, editor/preview, hashtag parser/tree, task markers, and privacy-safe analytics.
- Phase 2: add backlinks, search/special filters, attachments, import/export Markdown/text, link previews with SSRF defenses, and indexing.
- Phase 3: add original themes/typography, note/app lock, encrypted local storage for locked notes, and accessibility alternatives.
- Phase 4: add paid sync account, encrypted sync/change log, conflict screens, billing/restore, entitlement gates, and cache purge.
- Phase 5: add premium/staged export formats, OCR/PDF search if licensed, widgets/shortcuts/share capture, support diagnostics, and data export/delete.
- Phase 6: complete security/privacy review, billing/sync/manual native verification, accessibility, and launch blockers.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 sync encryption, export, OCR, typography, lock, and platform-integration scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
