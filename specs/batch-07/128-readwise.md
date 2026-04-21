# Readwise-Style Clone Spec

> Metadata
> - Inspiration app: Readwise
> - Category: Highlight sync and spaced-repetition review
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, public help pages, and public integration docs observed during source discovery.
> - Manual verification blockers: native capture, subscription purchase/restore, third-party integration flows (Kindle-like, Instapaper-like, Pocket-like), and push payload inspection require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Imported highlights remain owned by the user; third-party integrations must honor each partner's terms.

## Overview

Build an original mobile highlights-and-review app inspired by Readwise: centralize highlights from connected reading apps and e-readers, surface a daily digest of past highlights, and present a spaced-repetition review queue.

The clone must not copy Readwise branding, copy, private APIs, or partner-specific trademarked names.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Aggregate user highlights from multiple connected sources into a unified corpus.
- Provide a daily digest surface with configurable volume and cadence.
- Provide a spaced-repetition review mode with grading.
- Support tagging, notes, and search across the corpus.
- Export highlights to common formats.
- Produce concrete routes, entities, contracts, offline/sync rules, analytics, and tests.

## Non-Goals

- Do not build a Readwise-branded app or imply affiliation.
- Do not scrape partner services or reuse private APIs.
- Do not retain partner credentials beyond what is needed for integration.
- Do not ship authoritative advice in surfaced highlights.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/readwise/id1388926410 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=io.readwise.readwise | Source discovery — pending exact URL verification | Pending |
| Readwise Help | https://help.readwise.io/ | Source discovery — pending exact URL verification | Pending |
| Spaced Repetition Overview | https://en.wikipedia.org/wiki/Spaced_repetition | Source discovery — pending exact URL verification | Pending |
| Open API Standards | https://www.openapis.org/ | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Users connect reading sources (generic: e-readers, read-later apps, web highlighters, PDFs, podcasts transcripts).
- Highlights import on a schedule and dedupe across sources.
- Daily review delivers a configurable number of highlights.
- Spaced-repetition review grades individual highlights (e.g., good/again scheduling intervals).
- Search supports text, tags, book/author, and source filters.
- Tags and notes can be added to any highlight.
- Export to plain text, Markdown, CSV.
- Notifications remind users to review.

## Core User Journeys

- New user signs up, connects a source, and imports initial highlights.
- User opens daily digest and reads a curated set.
- User starts review mode and grades highlights.
- User searches for a topic and tags relevant highlights.
- User adds a note to a highlight and shares plain text.
- User exports all highlights to Markdown.
- User disconnects a source and purges imported items.
- User upgrades to premium subscription for increased limits.
- User requests data export or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social auth | new, returning | region block |
| Source Connect | Link reading sources | OAuth, credentials | empty, connected, error | partner down, revoked token |
| Home/Daily | Daily digest | tap highlight | empty, loaded | sync delay |
| Library | All highlights | filter, search | empty, loaded | quota |
| Highlight Detail | Highlight with note/tags | edit, tag, note | loaded | sync conflict |
| Review Mode | Spaced-repetition grading | grade buttons | empty, active | reset needed |
| Tags | Manage tags | add/rename/delete | empty, loaded | conflict |
| Search | Query corpus | text, filters | empty, results | rate-limit |
| Notifications | Review reminders | tap | unread, read | permission denied |
| Subscription | Plan management | manage, restore | free, paid | platform mismatch |
| Export | Export corpus | format select | idle, exporting, done | size cap |
| Settings | Account, privacy, cadence | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, cadence prefs, subscription summary.
- `SourceConnection`: user, partner id, credentials token ref, scopes, state.
- `Book`: canonical book ref across sources.
- `Highlight`: user, book, text, location ref, created-at, source.
- `Note`: user, highlight, text.
- `Tag`: user, label.
- `ReviewState`: highlight id, interval, due-at, ease factor.
- `DailyDigest`: user, date, selected highlights.
- `Export`: user, format, status.
- `Subscription`: plan, platform, state.
- `AuditEvent`: account/privacy/billing changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /sources`, `POST /sources/:partner/connect`, `DELETE /sources/:id`.
- `POST /imports/trigger?sourceId=`: manual import; otherwise scheduled.
- `GET /highlights?cursor=&bookId=&tag=&q=`: corpus query.
- `GET /highlights/:id`, `PATCH /highlights/:id`, `DELETE /highlights/:id`.
- `GET /notes?highlightId=`, `POST /notes`, `PATCH /notes/:id`.
- `GET /tags`, `POST /tags`, `POST /highlights/:id/tags`.
- `GET /digests/today`, `POST /digests/:date/mark-seen`.
- `GET /review/queue`, `POST /review/grade`.
- `GET /exports`, `POST /exports`: create export job.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /notifications`, `POST /notifications/read`.

## Realtime, Push, And Offline Behavior

- Source imports scheduled; client polls for status.
- Offline review caches the day's queue; grades sync on reconnect.
- Push reminders for daily review with opt-in.
- Export generated server-side; push on completion.
- Source reconnect flows handle revoked tokens gracefully.
- Dedupe logic runs server-side across sources.

## Permissions, Privacy, And Safety

- Notifications opt-in.
- Analytics exclude raw highlight text, notes, and tags.
- Partner credentials stored server-side with encryption at rest; never shipped to client analytics.
- Minors: standard default privacy.
- Imported content ownership: user retains rights; export/delete always available.
- Disconnect must purge associated highlights if the user opts in.
- Support tooling redacts highlight/note text.
- Accessibility: dynamic type, screen reader, contrast.
- Launch owner: product/privacy lead, partner integrations owner, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: signup, source connected, import completed, daily digest opened, review graded, export completed, subscription state changed.
- Monetization via original subscription tier with original pricing.
- Paywall clarity: blocked feature, subscription state, restore path, platform, support.
- Webhook reconciliation across platforms.

## Edge Cases

- Partner API rate-limits or outages; import backoff and surface state.
- Source credential revoked; prompt reconnect.
- Duplicate highlight imports after re-connect; dedupe.
- Highlight edited on source after import; conflict resolution policy.
- Review queue empty; fallback to digest.
- Export job fails mid-run; resume or restart.
- Account deletion with active export.
- Subscription downgrade with limits exceeded.

## Test Plan

- Unit tests for dedupe, review scheduling, digest selection, export formatting.
- Contract tests for sources, highlights, notes, tags, digests, review, export, subscription.
- Integration tests for connect-import-review, grade-schedule, export.
- Partner integration tests with sandbox or recorded fixtures.
- Privacy tests for analytics redaction and purge-on-disconnect.
- Accessibility tests for dynamic type, screen reader, review-mode focus.
- Manual verification: native screenshots, purchase/restore, push payloads, real partner flows.

## Acceptance Criteria

- Exact source links and partner integrations verified before implementation.
- V1 imports from at least one documented partner with consent.
- Users can aggregate, review, tag, note, search, and export highlights.
- Subscription/partner flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which partners in V1 (e-reader, read-later, web highlighter)?
- Will V1 support PDF import and OCR?
- Review algorithm details (original SM-2-like or custom)?
- Family-sharing or team tier in V1?
- Offline review volume limit?

## Build Plan

- Phase 1: scaffold app, auth, source connect, import pipeline.
- Phase 2: library, search, tags, notes.
- Phase 3: daily digest, review mode, scheduling.
- Phase 4: export, notifications, subscription.
- Phase 5: additional partners, dedupe improvements.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and partner contracts.
- Draft original digest selection and review algorithm.
- Stand up downstream implementation repo.
