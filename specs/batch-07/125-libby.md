# Libby-Style Clone Spec

> Metadata
> - Inspiration app: Libby
> - Category: Public-library e-book and audiobook borrowing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, library card validation against real library partners, hold/checkout lifecycle, audiobook playback, and push payloads require a test device/account and partner integration.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Library content and loan mechanics must use licensed partner APIs (e.g., OverDrive-equivalent) and library-consented integrations.

## Overview

Build an original mobile library-borrowing app inspired by Libby: connect a library card, browse the library catalog, place holds, check out e-books and audiobooks, read/listen offline, tag books with personal shelves, and return or renew.

The clone must not copy Libby branding, marketing copy, or private APIs. All catalog and loan operations must go through licensed library-integration providers.

This spec is implementation-ready for a V1 that targets documented public behavior. Feature-flag anything requiring verification.

## Goals

- Support library-card-based sign-in across multiple libraries.
- Provide catalog browse/search, holds, checkouts, returns, and renewals.
- Provide an e-book reader and an audiobook player with offline downloads.
- Support user tags/shelves independent of library loan state.
- Produce concrete routes, entities, contracts, offline/sync rules, analytics, and tests.

## Non-Goals

- Do not build a Libby-branded app or imply OverDrive affiliation.
- Do not scrape Libby or partner sites.
- Do not cache library member identifiers beyond what is needed for auth.
- Do not bypass library-imposed hold queues or loan limits.
- Do not claim store parity until manual verification completes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/libby-by-overdrive/id1076402606 | iOS listing, library cards, loans, holds, offline reading/listening, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.overdrive.mobile.android.libby | Android listing, public-library borrowing, ebooks/audiobooks/magazines, data safety | Verified 2026-05-01 |
| Libby Help | https://help.libbyapp.com/en-us/index.htm | Cards, loans, holds, tags, shelf, downloads, return/renew, and troubleshooting | Verified 2026-05-01 |
| OverDrive Privacy Policy | https://company.overdrive.com/privacy-policy/ | Library data, account data, privacy rights, and partner/library handling | Verified 2026-05-01 |
| OverDrive Partners | https://company.overdrive.com/partners/ | Library and publisher partner model informing lawful V1 constraints | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Users must be able to add one or more libraries via search and authenticate with a library card.
- Catalog must support search and filters (format, availability, language, audience).
- Holds queue and wait-time estimates must be visible.
- Checkouts must respect loan period and device limits.
- E-books supported via reflowable reader; audiobooks supported with chapters, bookmarks, and sleep timer.
- Offline: full download of loaned content within loan window.
- User-level tags (e.g., "read later") are independent of library loan state.
- Notifications for holds ready, loan expiring, and renewal opportunities.

## Core User Journeys

- New user adds a library, enters card, and authenticates.
- User searches catalog, places a hold on an unavailable title.
- User borrows an available e-book, downloads it, and starts reading offline.
- User switches to an audiobook, sets sleep timer, and listens with chapter navigation.
- User receives hold-ready notification and auto-borrows or delays.
- User tags a loan with a personal shelf and revisits later.
- User renews a loan before expiry.
- User returns a loan early.
- User adds a second library and switches between them.
- User reports a catalog issue or contacts support.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Library Setup | Find library and add card | search, credentials | none, connected, multiple | invalid card, offline, library down |
| Home | Loans, holds, shelves overview | tap | empty, loaded | sync error |
| Catalog | Browse/search | filters, search | empty, results, loading | partner error |
| Title Detail | Description, availability | hold, borrow, sample | available, held, borrowed, expired | region block |
| Holds | Hold queue | manage, delay, cancel | empty, queued, ready | partner sync delay |
| Loans | Current checkouts | read, listen, renew, return | active, expiring, expired | download fail |
| Reader | E-book reading | swipe, menu | online, offline | render fail, license expired |
| Audio Player | Audiobook playback | play/pause, seek, sleep timer | idle, playing, paused | engine fail |
| Shelves/Tags | User collections | add/remove | empty, loaded | conflict |
| Notifications | Holds/loans alerts | tap | unread, read | permission denied |
| Library Switcher | Manage multiple cards | add/remove | single, multi | card expired |
| Settings | Account, downloads, privacy | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent state, device downloads.
- `LibraryConnection`: library id, card token, display name, status.
- `CatalogItem`: source provider, title, author, format, cover, metadata.
- `Hold`: user, item, library, position, status, expected date.
- `Loan`: user, item, library, format, expires-at, renewals used.
- `DownloadPackage`: loan id, encrypted asset ref, expiry.
- `ReadingProgress`: loan id, coordinate/time, updated-at.
- `Bookmark`: loan id, coordinate/time, note.
- `Shelf`: owner, title, items (cross-library).
- `Notification`: type, payload, delivery state.
- `AuditEvent`: append-only connection/loan changes.
- `SafetyReport`: catalog issue or misuse.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /libraries/search?q=`, `POST /libraries/:id/connect`: library card auth via partner.
- `GET /catalog/search?libraryId=&q=&filter=`.
- `GET /catalog/items/:id?libraryId=`.
- `POST /holds`, `DELETE /holds/:id`, `POST /holds/:id/delay`.
- `POST /loans` (borrow), `POST /loans/:id/return`, `POST /loans/:id/renew`.
- `GET /loans/:id/manifest`: reader/player manifest.
- `GET /loans/:id/resource/:resId`: DRM-protected fetch.
- `POST /loans/:id/progress`, `POST /loans/:id/bookmarks`.
- `GET /shelves`, `POST /shelves`, `POST /shelves/:id/items`.
- `GET /notifications`, `POST /notifications/read`.
- `POST /safety/reports`, `GET /support/cases/:id`.

## Realtime, Push, And Offline Behavior

- Partner sync handled server-side; client polls and receives pushes.
- Hold-ready push with auto-borrow preference.
- Offline: full loan package download during loan window; revoked on return/expiry.
- Audiobook resume across devices with time-index sync.
- E-book progress merges via coordinate CRDT-like resolution.
- Push payloads omit book content.

## Permissions, Privacy, And Safety

- Notifications opt-in; no camera needed unless barcode scan of card is offered later.
- Analytics exclude card numbers, loan details, and raw progress.
- Library card credentials stored via OS secure storage; never shipped to analytics.
- Minors: library-side age verification respected; no mature content unlocks in client.
- Licensing: comply with partner terms including territorial and per-loan restrictions.
- DRM keys isolated and revocable.
- Support tooling redacts card numbers and loan content.
- Accessibility: screen reader, large text, audio descriptions where available.
- Launch owner: product/privacy lead, legal for partner contracts, security for card handling, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: library connected, search, hold placed, loan borrowed/returned/renewed, reader/player session started.
- No monetization in V1 — app is free and library-funded. Any future tip-jar or premium requires legal review.
- Partner billing is out of scope of the client.

## Edge Cases

- Library temporarily offline; catalog stale.
- Card expired during active loan.
- Hold ready while user offline; auto-borrow fallback to manual.
- Loan expiry during active reading/listening.
- Partner rate-limit on search.
- Audiobook large download on cellular — require opt-in.
- Multi-library same title; dedupe and disambiguate.
- Device limit reached; require loan release.

## Test Plan

- Unit tests for hold/loan state machines, DRM key lifecycle, progress merge, shelf isolation.
- Contract tests for partner auth, catalog, hold, loan, renew, return, progress.
- Integration tests for connect-library, search-hold-borrow-read, audio listen, renew.
- Offline tests for download, revocation, and resume.
- Privacy tests for card handling and analytics redaction.
- Accessibility tests for reader/player with screen reader and large text.
- Manual verification: native screenshots, real partner account, push payloads, audio on device.

## Acceptance Criteria

- Exact source links and partner integration verified before implementation.
- V1 connects libraries via licensed partner APIs only.
- Users can connect, browse, hold, borrow, read, listen, renew, and return.
- Loan/hold/DRM flows have deterministic contracts.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which partner(s) support V1 integration?
- Will V1 support family card sharing?
- Will V1 support device push across phones/tablets for the same account?
- Is cellular-download default opt-out?
- Will V1 include magazine loans if partners support them?

## Build Plan

- Phase 1: scaffold app, auth, library connect, catalog, title detail.
- Phase 2: holds, loans, returns, renewals.
- Phase 3: e-book reader, audiobook player, progress/bookmarks.
- Phase 4: offline downloads, DRM, revocation.
- Phase 5: shelves, notifications, multi-library switcher.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Identify and contract partner integration.
- Draft original reader/player chrome.
- Stand up downstream implementation repo.
