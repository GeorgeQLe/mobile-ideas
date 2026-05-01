# Kindle-Style Clone Spec

> Metadata
> - Inspiration app: Kindle
> - Category: Cross-device e-book reader with store
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, store purchase/restore, DRM provider integration, sync-across-devices, text-to-speech, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, store surfaces, and reader chrome. All sold/loaned book content must come from licensed content providers with author/publisher consent.

## Overview

Build an original mobile e-reader inspired by Kindle's workflow: an e-book library with cross-device progress sync, a reflowable reader with typography controls, in-line dictionary and definition tools, highlights and notes, contextual character/place references, and an in-app store gate.

The clone must not copy Kindle branding, store copy, trademarked features, private APIs, proprietary DRM systems, or publisher-licensed content metadata. Licensed content must be obtained through standard publisher/distributor agreements; the app provides the reader and library chrome.

This spec is implementation-ready for a V1 targeting documented public behavior. Feature-flag any unverified behavior.

## Goals

- Provide a reflowable e-book reader with typography, brightness, page-turn, and TTS controls.
- Support a user library with progress/highlight/note sync across devices.
- Offer an in-app store with account-managed purchases and loans.
- Provide a dictionary, translation, and a contextual character/place reference surface.
- Produce concrete routes, entities, contracts, offline/sync rules, analytics, and tests.

## Non-Goals

- Do not build a Kindle-branded app or imply Amazon affiliation.
- Do not copy Kindle UI chrome, marketing copy, or feature names.
- Do not reverse-engineer or replay Kindle or AWS private APIs.
- Do not support DRM-evading imports of third-party content.
- Do not claim store parity until manual verification completes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/amazon-kindle/id302584613 | iOS listing, e-book reading, samples, library sync, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.amazon.kindle | Android listing, books, magazines, comics, samples, sync, data safety | Verified 2026-05-01 |
| Amazon Kindle Help | https://www.amazon.com/gp/help/customer/display.html?nodeId=GJUXNRAHSH6LX6FA | Kindle app/library management, reading, download, sync, and account help | Verified 2026-05-01 |
| Amazon Conditions of Use | https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM | Account, digital content, payments, and service terms | Verified 2026-05-01 |
| EPUB 3 Specification | https://www.w3.org/TR/epub-33/ | Open e-book format reference for original downstream reader implementation | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe a cross-device reader with purchase, library sync, highlights, and TTS-adjacent features.
- Reader supports reflowable content with user-controlled typography, margins, theme, and brightness.
- Highlights and notes are per-book, anchored to stable content coordinates, and sync across devices.
- Dictionary and translation show on long-press selection.
- Contextual character/place references (generic "X-ray-like") summarize entity occurrences within the book.
- Store gating must respect platform purchase rules (iOS in-app purchase vs. web-owned library).
- Loans/samples supported via time-bound entitlements.
- TTS is per-book with original voice integration and rate controls.

## Core User Journeys

- New user signs up, sees onboarding, and views an empty library.
- User browses store, purchases a book, and opens it.
- User reads with custom typography, turns pages, and long-presses a word for definition.
- User highlights a passage and adds a note; opens highlights list later.
- User opens contextual reference to see a character's occurrences.
- User enables TTS and listens with auto-advance.
- User starts a book on phone and resumes on tablet with last-page sync.
- User downloads a book for offline.
- User returns a loan or deletes a book from library.
- User requests data export or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social auth | new, returning | region block |
| Library | Owned books and samples | sort, filter, tap | empty, loaded | sync error |
| Store | Browse and buy | search, tap, purchase | loaded, region-gated | platform-gated |
| Book Detail | Description, sample, buy/open | sample, buy, open | not owned, owned, loaned | expired loan |
| Reader | Reflowable reading | swipe, tap menu, select | online, offline, TTS | render error, DRM fail |
| Typography | Font/size/margin controls | sliders, pickers | loaded | preset conflict |
| Highlights/Notes | List and manage | edit, delete, share | empty, loaded | sync conflict |
| Dictionary Popup | Definition/translation | select text | loaded | offline, unsupported lang |
| Context Reference | Entity summaries | tap entity | loaded | no data |
| TTS Player | Text-to-speech controls | play/pause, rate | idle, playing, paused | engine error |
| Sync Settings | Device, progress, data | toggles | loaded | managed account |
| Settings | Account, privacy, storage | toggles | loaded, signed-out | enterprise |

## Data Model

- `User`: identity, locale, consent state, entitlements summary.
- `Book`: title, author, publisher, format (EPUB-like), DRM scheme, cover.
- `LibraryItem`: user, book, acquisition type (purchase/loan/sample), state.
- `Entitlement`: user, book, platform, purchase id, expires-at.
- `ReadingProgress`: user, book, CFI-equivalent coordinate, updated-at.
- `Highlight`: user, book, start/end coordinates, note text.
- `Note`: extends highlight with rich text.
- `Annotation`: arbitrary marker attached to content coordinates.
- `Entity`: book-scoped character/place reference index.
- `DownloadPackage`: user, book, encrypted asset ref, expiry.
- `TTSSession`: book, voice, rate, position.
- `AuditEvent`: append-only account/privacy/billing changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /library?cursor=&filter=`: library with entitlements.
- `GET /store/search?q=`, `GET /store/books/:id`.
- `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /library/:bookId/acquire`: acquire purchased/loaned item.
- `GET /books/:id/manifest`: reflowable manifest with resource keys.
- `GET /books/:id/resource/:resourceId`: DRM-protected content fetch.
- `POST /books/:id/progress`: idempotent progress write.
- `GET /books/:id/highlights`, `POST /highlights`, `PATCH /highlights/:id`, `DELETE /highlights/:id`.
- `GET /books/:id/entities`: contextual reference index.
- `POST /dictionary/lookup`, `POST /translate`: selection tools.
- `POST /tts/session`, `PATCH /tts/session/:id`: TTS lifecycle.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Progress/highlight sync via CRDT-like merge or last-writer-wins per-coordinate.
- Offline reading requires DRM package with licensed key caching and revocation checks.
- Loan expiry revokes local key; reader gracefully ejects.
- Push for loan-return reminders and new-book-in-series notifications.
- TTS uses on-device voices where licensed; fallback remote TTS for supported voices.
- Store updates via polling; entitlement refresh on app foreground.

## Permissions, Privacy, And Safety

- Notifications opt-in; microphone only if TTS voice-preview uses mic (typically no).
- Analytics exclude raw content, highlights, and notes.
- DRM system must isolate keys from user-accessible storage; rotate on revocation.
- Minors must have content-level restrictions and store gating.
- Accessibility: screen reader compatibility, high-contrast, large text, TTS voice selection.
- Publisher contracts dictate territorial availability; region blocking is enforced server-side.
- Support tooling redacts user content; raw access is elevated.
- Launch owner: product/privacy lead, legal for licensing, security for DRM, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: signup, store view, purchase completed, book opened, progress milestone, highlight created, TTS started, sample opened.
- Monetization: in-app purchase of books, optional subscription tier, loan programs via licensed partners only.
- Paywall clarity: blocked book, entitlement, restore path, platform ownership, support link.
- Webhook reconciliation across platforms and refund/return.
- No ad-supported reading in V1; advertising is an explicit later-phase decision.

## Edge Cases

- Purchase on web, open on iOS — library must reflect cross-platform ownership.
- DRM key expired offline; reader must prompt online refresh.
- Loan returned on another device; active reader must gracefully eject.
- Progress conflict between devices on the same page.
- Dictionary offline; fallback to cached languages only.
- TTS engine interrupted by call/Bluetooth change.
- Publisher pulls a title; library must mark unavailable without deleting highlights.
- Account deletion with active loans.

## Test Plan

- Unit tests for progress/highlight merge, entitlement checks, DRM key lifecycle, TTS session.
- Contract tests for library, store, manifest, resource, highlights, progress, entitlements.
- Integration tests for acquire/open/read, highlight/sync, loan return.
- Offline tests for key caching, revocation, and resume.
- Privacy tests for analytics redaction and minor defaults.
- Accessibility tests for screen reader, dynamic type, contrast, TTS.
- Manual verification: native screenshots, purchase/restore, push, TTS, sync across devices.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed content providers; no DRM-evading imports.
- Users can acquire, read, highlight, sync, and TTS-listen to books.
- Cross-device sync, DRM, and entitlement flows have deterministic contracts.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which DRM provider(s) in V1?
- Will V1 support audiobooks (Audible-like) or only e-books?
- Loan program in V1 or deferred?
- Will V1 expose collections/folders?
- Which TTS engine is licensed for V1 shipping?

## Build Plan

- Phase 1: scaffold app, auth, library, reader with reflowable content.
- Phase 2: highlights, notes, progress sync, typography.
- Phase 3: store, purchase, entitlements, platform webhooks.
- Phase 4: dictionary, translation, contextual references, TTS.
- Phase 5: offline DRM packages, loans, revocation.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and DRM/licensing agreements.
- Design original reader chrome and typography presets.
- Stand up downstream implementation repo.
