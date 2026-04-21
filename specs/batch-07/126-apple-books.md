# Apple Books-Style Clone Spec

> Metadata
> - Inspiration app: Apple Books
> - Category: E-reader and audiobook app with integrated store
> - Readiness status: Draft 1
> - Verification basis: public marketplace listing (iOS), public help pages, and publishing docs observed during source discovery.
> - Manual verification blockers: native iOS capture, iCloud-equivalent sync, purchase/restore, audiobook controls, and widgets require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Book content must come from licensed distributors/publishers.

## Overview

Build an original mobile e-reader-and-audiobook app inspired by Apple Books: a personal library, a purchase/sample store, audiobooks with chapter navigation, collections, reading goals, and a system-integrated reading UI (widgets, share-sheet ingest of supported files).

The clone must not copy Apple Books branding, store copy, trademarked feature names, private APIs, or publisher-licensed content metadata.

This spec is implementation-ready for a V1 that targets documented public behavior. Feature-flag anything requiring verification.

## Goals

- Provide a reader and audiobook player with highlights, bookmarks, and progress.
- Provide an in-app store with purchase/sample flows respecting platform rules.
- Support user collections and original reading-goal framing.
- Integrate with OS share sheet to open supported document formats (e.g., EPUB, PDF).
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build an Apple Books-branded app or imply Apple affiliation.
- Do not clone Apple UI chrome or icons.
- Do not use private Apple APIs beyond public developer frameworks.
- Do not support DRM-evading imports.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/apple-books/id364709193 | Source discovery — pending exact URL verification | Pending |
| Apple Books Support | https://support.apple.com/books | Source discovery — pending exact URL verification | Pending |
| Apple Books for Authors | https://authors.apple.com/ | Source discovery — pending exact URL verification | Pending |
| EPUB 3 Specification | https://www.w3.org/publishing/epub3/ | Source discovery — pending exact URL verification | Pending |
| Apple StoreKit Docs | https://developer.apple.com/storekit/ | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Library surfaces owned books, audiobooks, samples, and system-ingested files.
- Reader supports reflowable EPUB-like content and PDFs.
- Audiobook player supports chapters, speed, sleep timer, and resume.
- Store supports search, browse, sample, and purchase via platform IAP.
- Collections (e.g., "Want to Read", custom) are user-managed.
- Reading-goal framing tracks daily/weekly completion.
- Share-sheet ingest opens user-provided EPUB/PDF files.
- Widgets surface "now reading" context.

## Core User Journeys

- User signs in, sees empty library or cloud-restored library after sign-in.
- User browses store, samples a book, purchases, and opens.
- User reads with typography controls and syncs to tablet.
- User highlights and adds notes; revisits from notes list.
- User listens to an audiobook with sleep timer.
- User creates a collection and organizes owned titles.
- User sets a daily reading-goal and sees streak UI.
- User imports an EPUB via share sheet.
- User adds the widget to home screen.
- User requests data export or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social/Sign In with Apple | new, returning | region block |
| Library | Owned books and audiobooks | sort, collection filter | empty, loaded | sync error |
| Store | Browse and buy | search, tap | loaded, region-gated | platform-gated |
| Book Detail | Description, sample, buy/open | sample, buy, open | not owned, owned | loan expired |
| Reader | Reflowable/PDF reading | swipe, menu, select | online, offline | render error |
| Audio Player | Audiobook playback | play/pause, chapter, sleep | idle, playing | engine error |
| Collections | User collections | add/remove, rename | empty, loaded | conflict |
| Highlights/Notes | List and manage | edit, delete, share | empty, loaded | sync conflict |
| Goals | Reading-goal tracking | set goal, log session | active, completed | reset |
| Share-Sheet Import | Receive external EPUB/PDF | OS share | imported, error | unsupported format |
| Widget Host | OS widget integration | OS event | configured, unconfigured | permission |
| Settings | Account, sync, privacy | toggles | loaded | enterprise |

## Data Model

- `User`: identity, locale, consent, entitlements summary.
- `Book`: title, author, format, DRM scheme, cover.
- `LibraryItem`: user, book, acquisition type, state.
- `Entitlement`: platform purchase reference, state.
- `AudiobookAsset`: chapter manifest, duration.
- `Collection`: owner, title, items.
- `Highlight`: user, book, coordinates, note.
- `ReadingGoal`: user, target, progress, streak.
- `ReadingProgress`: user, book, coordinate/time.
- `WidgetSnapshot`: user, now-reading reference, updated-at.
- `DownloadPackage`: user, book, encrypted asset ref.
- `AuditEvent`: account/privacy/billing changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /library?cursor=`, `GET /store/search?q=`, `GET /store/books/:id`.
- `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /library/:bookId/acquire`.
- `GET /books/:id/manifest`, `GET /books/:id/resource/:resId`.
- `POST /books/:id/progress`, `GET /books/:id/highlights`, `POST /highlights`.
- `GET /collections`, `POST /collections`, `POST /collections/:id/items`.
- `GET /goals`, `POST /goals`, `POST /goals/:id/events`.
- `POST /imports`: receive share-sheet file.
- `GET /widgets/now-reading`: widget snapshot.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Library and highlights sync via CRDT-like merge.
- Widgets refresh via OS background tasks.
- Offline reading with DRM package and revocation checks.
- Audiobook offline with chapter manifest and resume time sync.
- Push for sample-ready, new-release, goal reminders.
- Share-sheet imports processed on-device with optional cloud backup.

## Permissions, Privacy, And Safety

- Notifications opt-in; files permission only for import.
- Analytics exclude raw content, highlights, and notes.
- DRM isolates keys; revocation on refund/return.
- Minors: content rating enforced by store, library-level content filters.
- Licensing: honor distributor/publisher territories.
- Accessibility: VoiceOver/TalkBack, dynamic type, contrast, audio descriptions.
- Widgets must not leak private book titles in lock-screen states if user opts out.
- Launch owner: product/privacy lead, legal for licensing, security for DRM, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: library opened, store view, purchase completed, book opened, highlight created, goal milestone.
- Monetization via platform IAP for purchases and optional subscription tier.
- Paywall clarity: blocked title, entitlement, restore path, platform ownership.
- No ads in V1.

## Edge Cases

- Share-sheet import of unsupported or malformed file.
- Purchase on one device opens on another with delayed sync.
- Goal reset across year boundary.
- Audiobook chapter missing mid-stream.
- DRM license expired offline.
- Widget shows stale now-reading after book deletion.
- Collection deleted while member items still referenced by widgets.
- Account deletion with active loans/subscriptions.

## Test Plan

- Unit tests for library merge, highlight sync, goal state, audiobook resume.
- Contract tests for library, store, manifest, highlights, collections, goals, imports.
- Integration tests for acquire/open/read, audiobook listen, share-sheet import, widget refresh.
- Offline tests for DRM, revocation, resume.
- Privacy tests for analytics redaction, minor defaults, widget privacy.
- Accessibility tests for VoiceOver, dynamic type, contrast, audio descriptions.
- Manual verification: native screenshots, purchase/restore, audiobook controls, widgets.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed distributors; no DRM-evading imports.
- Users can buy, read, listen, highlight, collect, and set goals.
- Offline and sync flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which DRM/distribution partners for V1?
- Will V1 support PDF annotations or read-only PDFs?
- Is study-mode/TTS in V1?
- Will V1 support family sharing?
- Which widgets are in V1 versus later?

## Build Plan

- Phase 1: scaffold app, auth, library, reader.
- Phase 2: highlights, collections, progress sync.
- Phase 3: store, purchase, entitlements, samples.
- Phase 4: audiobook player, chapters, sleep timer.
- Phase 5: share-sheet import, widgets, goals.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and licensing.
- Design original chrome and typography presets.
- Stand up downstream implementation repo.
