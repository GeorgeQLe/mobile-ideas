# Instapaper-Style Clone Spec

> Metadata
> - Inspiration app: Instapaper
> - Category: Minimalist read-later with highlights, notes, and folders
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, share-extension ingest, speed-reading mode, subscription purchase/restore, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Article content retrieved from user-specified URLs under reader-mode norms.

## Overview

Build an original mobile read-later app inspired by Instapaper: save URLs, present an uncluttered typographic reader, highlight passages and attach notes, organize with folders, and export.

The clone must not copy Instapaper branding, copy, private APIs, or trademarked speed-reading names.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Ingest URLs and render clean article content with first-class typography.
- Support highlights with notes, private by default.
- Provide folders (including "Archive" and "Liked") plus a main list.
- Provide search across saves including highlights.
- Support export to common formats.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build an Instapaper-branded app or imply affiliation.
- Do not scrape Instapaper or reuse private APIs.
- Do not include paid publisher content bypass.
- Do not ship ads in V1.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/instapaper/id288545208 | iOS listing, save/read, highlights, notes, offline, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.instapaper.android | Android listing, offline reader, folders, highlights, data safety | Verified 2026-05-01 |
| Instapaper Help | https://www.instapaper.com/help | Save, read, folders, highlights, search, account, and support flows | Verified 2026-05-01 |
| Instapaper API | https://www.instapaper.com/api | Public API shape for lawful save/list/archive/read integration | Verified 2026-05-01 |
| Instapaper Privacy Policy | https://www.instapaper.com/privacy | Saved article/account data, cookies, retention, and privacy rights | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Reader emphasizes typography, margins, and dark/sepia/light themes.
- Highlights anchor to stable content ranges and support notes.
- Folders organize saves beyond the default list.
- Optional speed-reading mode (generic "fast-reading") with word-by-word display and configurable WPM.
- Export to plain text, Markdown, HTML, CSV.
- Full-text search over saves and highlights.
- Share extension ingests URLs.
- Optional subscription for premium features (unlimited notes, speed-reading, full-text search).

## Core User Journeys

- User installs extension, saves an article, and opens reader.
- User adjusts typography and theme.
- User highlights a passage and attaches a note.
- User organizes saves into folders.
- User searches across saves and highlights.
- User enters speed-reading mode for a commute read.
- User exports their library.
- User subscribes to premium.
- User deletes account or exports data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social auth | new, returning | region block |
| Home/List | Saved articles | tap, swipe | empty, loaded | sync error |
| Reader | Typographic article | scroll, select, menu | online, offline | extraction fail |
| Highlight Composer | Add note to highlight | text | saved, edited | conflict |
| Folders | Organize saves | create, move, rename | empty, loaded | conflict |
| Search | Query saves/highlights | text, filters | empty, results | index building |
| Speed-Read Mode | Fast word display | play/pause, WPM | idle, playing | size cap |
| Share Extension | Ingest URL | OS share | saving, saved | extraction fail |
| Subscription | Plan management | manage, restore | free, paid | platform mismatch |
| Export | Export library | format select | idle, exporting, done | size cap |
| Settings | Account, typography, privacy | toggles | loaded, signed-out | managed |
| Liked/Favorites | Starred saves | tap, unstar | empty, loaded | sync conflict |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `SavedItem`: user, url, canonical url, title, author, added-at, folder.
- `ArticleContent`: extracted content, image refs, lang.
- `Folder`: user, name, default flags (archive/liked).
- `Highlight`: user, item, start/end anchors, text.
- `Note`: user, highlight, text.
- `ReadingProgress`: item, position.
- `SpeedReadSession`: item, wpm, position.
- `SearchIndex`: per-user token refs including highlights.
- `Subscription`: plan, platform, state.
- `Export`: user, format, status.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /items`, `GET /items?folder=&q=&cursor=`, `GET /items/:id`, `GET /items/:id/content`.
- `PATCH /items/:id`: move folder, star, archive.
- `POST /highlights`, `PATCH /highlights/:id`, `DELETE /highlights/:id`.
- `GET /highlights?itemId=`: list.
- `POST /notes`, `PATCH /notes/:id`.
- `GET /folders`, `POST /folders`, `PATCH /folders/:id`.
- `GET /search?q=&scope=items|highlights`.
- `POST /speed-read/session`, `PATCH /speed-read/session/:id`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /exports`, `GET /exports/:id`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Share-sheet saves queued offline.
- Offline reading per item with user quota.
- Highlights/notes sync last-writer-wins per anchor.
- Push for save-processed and weekly digest opt-in.
- Search index built/updated server-side; client has minimal cache.

## Permissions, Privacy, And Safety

- Notifications opt-in.
- Analytics exclude raw content, highlights, notes, and URLs.
- Publisher opt-out honored; purge on request.
- Minors: standard defaults.
- Accessibility: dynamic type, screen reader, contrast, reduced motion (speed-read mode must offer pause-for-accessibility).
- Support tooling redacts user content.
- Launch owner: product/privacy lead, legal for publisher terms, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: save, reader opened, highlight created, note added, folder created, speed-read used, subscription state changed.
- Monetization via original subscription tier.
- Paywall clarity: feature, state, restore path, platform, support.
- Webhook reconciliation across platforms.

## Edge Cases

- Extraction fails on JS-heavy page; fallback to web view.
- Highlight anchor drift after content update; graceful "approximate" label.
- Duplicate save via canonicalization.
- Folder rename conflict with default names.
- Speed-read mode mid-article with connectivity loss.
- Publisher takedown purges cached content.
- Account deletion with active export.
- Subscription downgrade past feature usage.

## Test Plan

- Unit tests for extraction, anchor drift, search indexing, speed-read session, folder rules.
- Contract tests for items, highlights, notes, folders, search, subscription, exports.
- Integration tests for share-save-read, highlight-note, search-across, speed-read.
- Privacy tests for analytics redaction and publisher takedown.
- Accessibility tests for reader, speed-read pause, dynamic type.
- Manual verification: native screenshots, share extension, purchase/restore, push.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 honors publisher opt-outs.
- Users can save, read, highlight, note, organize, search, export.
- Sync/subscription flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which extraction engine in V1?
- TTS in V1 or later?
- Community/public highlights in V1 (default off for privacy)?
- Family sharing in V1?
- Speed-read configuration defaults?

## Build Plan

- Phase 1: scaffold app, auth, save ingest, reader.
- Phase 2: highlights, notes, folders.
- Phase 3: search, speed-read mode.
- Phase 4: subscription, entitlements, webhooks.
- Phase 5: share extension, export, push.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and extraction engine.
- Design original typographic presets.
- Stand up downstream implementation repo.
