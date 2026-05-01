# Pocket-Style Clone Spec

> Metadata
> - Inspiration app: Pocket
> - Category: Read-later with offline reading and TTS
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, share-extension ingest, TTS voices, subscription purchase/restore, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Article content is retrieved from user-specified URLs under fair-use/reader-mode norms; no republishing.

## Overview

Build an original mobile read-later app inspired by Pocket: save articles via share sheet, fetch clean reader content, organize with tags and favorites, sync across devices, read offline, and listen via TTS.

The clone must not copy Pocket branding, copy, private APIs, or partner-licensed content beyond user-directed URL fetches.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Ingest URLs via share sheet, paste, email forward, and API.
- Render a clean article reader with typography and image support.
- Organize with tags, favorites, archive, and trash.
- Support offline reading with eviction policy.
- Provide TTS listening with voice/speed controls.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Pocket-branded app or imply Mozilla affiliation.
- Do not scrape Pocket or reuse private APIs.
- Do not store full pages that violate publisher terms; support publisher opt-outs.
- Do not include paid publisher content by default; require user authentication at publisher when relevant.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/pocket-save-read-grow/id309601447 | iOS listing, save/read/listen, offline access, recommendations, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro | Android listing, save-for-later, offline, listen, data safety | Verified 2026-05-01 |
| Pocket Help | https://support.mozilla.org/products/pocket | Save, list, archive, tags, reading, listening, account, and support flows | Verified 2026-05-01 |
| Pocket API | https://getpocket.com/developer/docs/overview | Public API shape for lawful save/list/read-state integration | Verified 2026-05-01 |
| Mozilla Privacy Policy | https://www.mozilla.org/privacy/ | Account, telemetry, saved content, and privacy-rights baseline | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Ingest sources: share-sheet, paste, email forward, in-app browser, API.
- Reader extracts main content with images and attribution to source.
- Tags, favorites, archive, and trash are first-class states.
- Offline cache with user-controlled storage limits and eviction.
- TTS plays article text with voice and rate controls.
- Full-text search over saved content.
- Sync across devices with last-writer-wins resolution.
- Publisher opt-outs honored.

## Core User Journeys

- User installs extension, shares an article, and sees it saved.
- User opens reader, adjusts typography, and finishes reading.
- User tags and favorites an article.
- User listens via TTS on a commute.
- User archives finished articles.
- User searches for a topic across saves.
- User exports their list as JSON/CSV.
- User subscribes to premium for unlimited TTS voices or enhanced search.
- User deletes account or requests data export.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social auth | new, returning | region block |
| Home/List | Saved articles | filter, sort, tap | empty, loaded | sync error |
| Reader | Article reading | scroll, menu, select | online, offline | extraction fail |
| Tag List | Browse by tag | tap | empty, loaded | rename conflict |
| Favorites | Starred items | tap, unstar | empty, loaded | sync conflict |
| Archive/Trash | Archived or deleted | restore, purge | empty, loaded | restore fail |
| Search | Full-text search | text, filters | empty, results | index building |
| Share Extension | Ingest URL from OS | OS share | saving, saved | extraction fail |
| TTS Player | Listen to article | play/pause, voice, rate | idle, playing | engine fail |
| Subscription | Plan management | manage, restore | free, paid | platform mismatch |
| Export | Export data | format select | idle, exporting, done | size cap |
| Settings | Account, storage, TTS | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `SavedItem`: user, url, canonical url, title, excerpt, author, added-at, state (unread/archive/trash).
- `ArticleContent`: extracted HTML, image refs, lang, word count, reading time.
- `Tag`: user, label.
- `Favorite`: user, saved-item, starred-at.
- `ReadingProgress`: saved-item, scroll/time position.
- `OfflineBundle`: saved-item, asset refs, expiry.
- `TTSSession`: saved-item, voice, rate, position.
- `SearchIndex`: per-user token references.
- `Subscription`: plan, platform, state.
- `Export`: user, format, status.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /items`: save URL with optional tags; idempotent by canonical URL.
- `GET /items?state=&tag=&cursor=&q=`.
- `GET /items/:id`: metadata and content ref.
- `GET /items/:id/content`: extracted article content.
- `PATCH /items/:id`: archive, trash, unstar, retag.
- `POST /items/:id/favorite`, `DELETE /items/:id/favorite`.
- `GET /tags`, `POST /tags`, `PATCH /tags/:id`, `DELETE /tags/:id`.
- `GET /search?q=`.
- `POST /tts/session`, `PATCH /tts/session/:id`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /exports`, `GET /exports/:id`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Share-sheet saves are queued on device and pushed on reconnect.
- Reader content cached per item; purged on archive/trash if user opts in.
- Sync uses last-writer-wins with conflict surfacing.
- Push for "new save processed", weekly digest opt-in, premium events.
- TTS engine is on-device where possible; fallback remote for premium voices.
- Publisher opt-outs checked on ingest; fallback to link-only.

## Permissions, Privacy, And Safety

- Notifications opt-in.
- Analytics exclude raw article content, tags, queries, and URLs.
- Credentials for publisher auth (when used) stored in OS secure storage.
- Content policy blocks malware/phishing links via URL reputation checks.
- Minors: parental controls optional; adult-content filter default on for minors.
- Publisher-opt-out must be respected; extracted content purged on publisher request.
- Support tooling redacts URLs and excerpts.
- Accessibility: TTS, dynamic type, screen reader, contrast.
- Launch owner: product/privacy lead, legal for publisher terms, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: save ingested, reader opened, tag added, archive, TTS started, subscription state changed.
- Monetization via original subscription tier for premium voices/search.
- Paywall clarity: blocked feature, state, restore path, platform, support.
- Webhook reconciliation across platforms.

## Edge Cases

- Extraction fails (JS-heavy site); fall back to original link.
- URL redirects; canonicalize and dedupe.
- Paywalled article; save link-only with paywall badge.
- Offline bundle exceeds quota; eviction prompt.
- Share-sheet duplicate saves; dedupe by canonical URL.
- Publisher requests takedown; purge and blocklist URL.
- TTS interrupted by call; resume.
- Account deletion with active export.

## Test Plan

- Unit tests for extraction, canonicalization, dedupe, sync, TTS session.
- Contract tests for items, tags, search, TTS, subscription, exports.
- Integration tests for share-save-read, tag-search, archive-restore, TTS playback.
- Publisher opt-out tests.
- Privacy tests for analytics redaction and minor defaults.
- Accessibility tests for reader, TTS, dynamic type.
- Manual verification: native screenshots, share extension, purchase/restore, push.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 honors publisher terms and blocks known malware.
- Users can save, read, organize, search, and TTS-listen offline.
- Sync/subscription flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which extraction engine in V1 (open-source or custom)?
- Will V1 include "Discover" recommendations? If so, licensing model?
- Highlighting and annotation in V1 or deferred?
- Family sharing in V1?
- Browser companion extension scope?

## Build Plan

- Phase 1: scaffold app, auth, save ingest, reader.
- Phase 2: tags, favorites, archive, search.
- Phase 3: TTS, offline bundles.
- Phase 4: share extension, subscription, entitlements, webhooks.
- Phase 5: publisher opt-outs, export, push.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and extraction engine choice.
- Design original reader chrome and TTS surface.
- Stand up downstream implementation repo.
