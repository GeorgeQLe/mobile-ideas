# Goodreads-Style Clone Spec

> Metadata
> - Inspiration app: Goodreads
> - Category: Book database and reading social network
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, public help pages, and public API/program pages observed during source discovery.
> - Manual verification blockers: native capture, reading-challenge lifecycle, scanning ISBN via camera, push notification payloads, and third-party book-data licensing require hands-on verification.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, taxonomies, and recommendation logic. Book metadata must be sourced from licensed providers or open catalogs.

## Overview

Build an original mobile book-social app inspired by Goodreads: a searchable book database, user shelves (to-read/reading/read plus custom), ratings and reviews, friends feed, annual reading challenge, and recommendations.

The clone must not copy Goodreads branding, review text, cover art, private APIs, or proprietary recommendation outputs. Book metadata must come from licensed providers (e.g., publisher feeds, Open Library, Google Books with terms). Reviews are user-generated and must be moderated originally.

This spec is implementation-ready for a V1 targeting documented public behavior. Feature-flag anything requiring verification.

## Goals

- Provide book search, detail pages, shelves, ratings, reviews, and a personal library.
- Support friend follow, activity feed, and reading-challenge goals.
- Offer recommendations using original ranking signals.
- Support ISBN scan for quick shelving.
- Produce concrete routes, entities, contracts, analytics, and tests.

## Non-Goals

- Do not build a Goodreads-branded app or imply affiliation.
- Do not scrape Goodreads, reuse private APIs, or replay traffic.
- Do not copy user reviews or curated lists from Goodreads.
- Do not serve book content inside the app (it is a metadata/social layer).
- Do not claim store parity until manual verification completes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/goodreads/id355833469 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.goodreads | Source discovery — pending exact URL verification | Pending |
| Goodreads Help | https://help.goodreads.com/s/ | Source discovery — pending exact URL verification | Pending |
| Open Library API | https://openlibrary.org/developers/api | Source discovery — pending exact URL verification | Pending |
| Google Books API Terms | https://developers.google.com/books/terms | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe a mobile app with search, shelves, ratings, reviews, friends feed, and reading challenge.
- Users must be able to search by title/author/ISBN and scan ISBNs via camera.
- Shelves must include canonical to-read/reading/read plus user custom shelves.
- Ratings on a fixed numeric scale and text reviews with moderation.
- Activity feed of friends' reading events with privacy controls.
- Annual reading challenge with goal, progress, and completion states.
- Recommendations based on rated/shelved books with original scoring.
- Export/import of library to/from CSV.

## Core User Journeys

- New user signs up, picks initial interests, and sees onboarding recommendations.
- User searches a book, opens detail, rates, shelves, and writes a review.
- User scans ISBN via camera and adds to a shelf.
- User follows a friend and sees their activity in feed.
- User sets an annual challenge and tracks progress throughout the year.
- User imports a CSV of books from a previous system.
- User reports a review or user for policy violation.
- User exports library and deletes account.
- User marks a review as helpful and saves a quote.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social auth | new, returning | region block |
| Home Feed | Friends activity and recs | scroll, tap | empty, loaded | feed failure |
| Search | Find books by title/author/ISBN | text, scanner | empty, results | rate-limit, bad scan |
| ISBN Scanner | Camera-based ISBN capture | camera, manual entry | permission prompt, scanning, matched | permission denied, no-match |
| Book Detail | Metadata, ratings, reviews | shelve, rate, review | loaded, unavailable | licensing restriction |
| Shelves | User-curated collections | add/remove, reorder | empty, canonical, custom | sync error |
| Review Composer | Write review | text, rating, spoiler toggle | draft, posted | autosave fail |
| Profile | Stats, shelves, challenges | tap, follow | own, other, blocked | deleted account |
| Reading Challenge | Goal, progress | set goal, log book | active, completed | past year archived |
| Notifications | Follows, comments, replies | tap | unread, read | permission denied |
| Import/Export | CSV library transfer | pick file, export | idle, importing, exported | format error |
| Settings | Account, privacy, notifications | toggles | loaded, signed-out | managed account |

## Data Model

- `User`: identity, locale, privacy level, consent state.
- `Book`: title, authors, ISBN(s), publisher, year, cover id, source provider.
- `Shelf`: owner, type (canonical/custom), items.
- `ShelfItem`: shelf, book, added-at, notes.
- `Rating`: user, book, score, updated-at.
- `Review`: user, book, text, spoiler flag, moderation state.
- `Follow`: follower, target, notification prefs.
- `ActivityEvent`: user, type (rated, shelved, reviewed), target, privacy scope.
- `Challenge`: user, year, goal, progress.
- `RecommendationProfile`: user, genre weights, author affinities.
- `Import`: user, source, file ref, status.
- `SafetyReport`: target, reason, reporter, decision.
- `AuditEvent`: append-only privacy/account changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /search?q=&kind=book|author|isbn`: searches licensed book catalog.
- `POST /isbn/lookup`: resolves scanned ISBN to Book id.
- `GET /books/:id`: metadata, aggregate rating, review summary.
- `GET /shelves`, `POST /shelves`, `POST /shelves/:id/items`, `DELETE /shelves/:id/items/:bookId`.
- `POST /ratings`, `POST /reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id`.
- `POST /follows`, `DELETE /follows/:id`.
- `GET /feed?cursor=`: friends activity with privacy filters.
- `GET /challenges/:year`, `POST /challenges`, `PATCH /challenges/:year`.
- `POST /library/import`, `GET /library/export`: CSV flows.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `GET /recommendations`: ranked personal list.
- `GET /notifications`, `POST /notifications/read`.

## Realtime, Push, And Offline Behavior

- Activity feed updated via polling with cursor reconciliation.
- Friend notifications via push with privacy-aware previews.
- Library shelves cached offline for read-only access; writes queued.
- ISBN scanning works offline only for cached catalog hits; otherwise queued.
- Reviews authored offline autosave locally and sync on reconnect.
- Moderation decisions invalidate local caches on next sync.

## Permissions, Privacy, And Safety

- Camera permission requested at ISBN scan.
- Notifications opt-in with per-type control.
- Default analytics exclude raw review text.
- Privacy controls: profile visibility, activity visibility, friend-only or public.
- Content policy blocks harassment, doxxing, spoilers-without-tags (best effort), hateful review content.
- Minors must have restricted defaults and reduced discoverability.
- Licensed book metadata must honor provider terms (attribution, no republishing where disallowed).
- Review moderation: automated plus reporting flow with appeals.
- Support redacts user content; elevated access for raw inspection.
- Launch owner: product/privacy lead, legal for content licensing, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: signup, search, book detail viewed, shelved, rated, reviewed, challenge set, friend added, report submitted.
- Monetization options (if any) limited to ad-supported or original subscription for advanced features; no copying of proprietary programs.
- No affiliate purchase flow in V1 without an explicit licensed partner and disclosure.
- Webhook reconciliation if monetization tier launches.

## Edge Cases

- ISBN not in catalog; fallback to manual add with user-supplied metadata (quarantined).
- Duplicate books in catalog; merge logic with user-editable corrections.
- Friend removed mid-feed; activity visibility must be recomputed.
- Review edited after report; moderation must re-evaluate.
- Challenge goal lowered after already exceeding; UI must handle gracefully.
- CSV import with malformed rows; row-level error report.
- Account deletion with outstanding reports.
- Provider rate-limit during high traffic; graceful degradation.

## Test Plan

- Unit tests for shelf state machines, rating aggregation, challenge progress, and review moderation.
- Contract tests for search, book, shelves, ratings, reviews, feed, challenges, import/export.
- Integration tests for signup, search-and-shelve, review-and-feed, friend-and-feed.
- ISBN scanner tests for permission states, no-match, and unreadable codes.
- Privacy tests for profile/activity visibility and minor defaults.
- Import/export tests for CSV integrity and row errors.
- Accessibility tests for dynamic type, screen reader, camera-scan alternatives, reduced motion.
- Manual verification: native screenshots, push payloads, scanner behavior on real devices.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed/open book metadata without scraping Goodreads.
- Users can search, shelve, rate, review, follow, challenge, import/export.
- Privacy, moderation, and safety workflows have deterministic contracts.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which catalog provider(s) in V1: Open Library, Google Books, publisher feeds, or hybrid?
- Will V1 support reading-progress tracking per book?
- Is friends-based messaging in V1 or deferred until safety review completes?
- Will V1 include book-club groups?
- Monetization model: free with ads, premium subscription, or free entirely?

## Build Plan

- Phase 1: scaffold app, auth, search, book detail, canonical shelves.
- Phase 2: ratings, reviews, moderation, and review-composer autosave.
- Phase 3: friends, activity feed, notifications.
- Phase 4: challenge, recommendations, import/export.
- Phase 5: ISBN scanner, offline library cache.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and licensing for catalog providers.
- Draft original taxonomy and moderation policy.
- Stand up downstream implementation repo.
