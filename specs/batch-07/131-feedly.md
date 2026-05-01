# Feedly-Style Clone Spec

> Metadata
> - Inspiration app: Feedly
> - Category: RSS reader with source organization and smart filters
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, OPML import, AI-based filter outputs, subscription purchase/restore, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Feed content comes from publisher-published RSS/Atom with honored robots/rate-limit rules.

## Overview

Build an original mobile RSS/Atom reader inspired by Feedly: subscribe to sources, organize into feeds/collections, read in a clean reader, apply smart filters/keyword alerts, save for later, and share.

The clone must not copy Feedly branding, copy, private APIs, or proprietary ML models/outputs.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Subscribe to RSS/Atom/JSON feeds with validation and OPML import/export.
- Organize sources into user-named collections.
- Provide reader-mode article content where publisher allows.
- Support smart filters, muted phrases, and alert rules.
- Support save-for-later, boards, and export.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Feedly-branded app or imply affiliation.
- Do not scrape Feedly or reuse private APIs.
- Do not republish paywalled publisher content; respect feed access levels.
- Do not market as news source of record.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/feedly-smart-news-reader/id396069556 | iOS listing, RSS/news reader, boards, AI assistant, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.devhd.feedly | Android listing, feeds, sources, boards, data safety | Verified 2026-05-01 |
| Feedly Help Center | https://docs.feedly.com/ | Feeds, boards, sources, Leo, teams, and account help | Verified 2026-05-01 |
| Feedly API Documentation | https://developers.feedly.com/ | Public API/feed model for lawful integration contracts | Verified 2026-05-01 |
| RSS 2.0 Specification | https://www.rssboard.org/rss-specification | Open feed standard for downstream source ingestion | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Subscribe by URL, feed discovery, or OPML import.
- Collections group sources; feeds list articles from one source.
- Unread/read counts per source/collection.
- Article reader with source content or full-content extraction where permitted.
- Smart filters (keyword include/exclude, source mute, language).
- Save-for-later and boards; share to external apps.
- Background refresh; user-configurable cadence.
- Offline cache for unread items in subscribed feeds.

## Core User Journeys

- User signs up, imports OPML from another reader, and sees collections populated.
- User adds a new source via URL or discovery search.
- User opens the "All" view and reads articles in reader mode.
- User mutes keywords and reduces noise in feed.
- User saves an article to a board and shares it.
- User sets a keyword alert and receives a push when matched.
- User exports OPML and migrates elsewhere.
- User subscribes to premium for advanced filters.
- User deletes account or exports data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry and consent | email/social auth | new, returning | region block |
| Home/All | All unread | filter, sort | empty, loaded | sync error |
| Collection | One collection | filter | empty, loaded | source error |
| Source | Articles from one source | tap, mark read | empty, loaded | broken feed |
| Reader | Article view | scroll, menu | online, offline | extraction fail |
| Add Source | Search/URL | text | empty, results | invalid feed |
| OPML Import/Export | Migrate subscriptions | pick file, export | idle, progress, done | format error |
| Filters/Alerts | Smart rules | rule editor | empty, active | conflict |
| Saved/Boards | Save-for-later | add/remove | empty, loaded | sync error |
| Notifications | Alerts | tap | unread, read | permission denied |
| Subscription | Plan management | manage, restore | free, paid | platform mismatch |
| Settings | Account, refresh, privacy | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `Source`: feed URL, title, icon, format (RSS/Atom/JSON), health state.
- `Subscription`: user, source, collection.
- `Collection`: user, name.
- `Article`: source, guid, title, author, url, published-at, content ref.
- `ReadState`: user, article, read/unread, saved.
- `Filter`: user, scope, rules (include/exclude/keyword/source).
- `Alert`: user, query, delivery prefs.
- `Board`: user, name, items.
- `OPMLImport`: user, file, status.
- `Subscription`: plan, platform, state.
- `AuditEvent`: account/billing changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /feed/discover?q=`, `POST /sources`, `DELETE /sources/:id`.
- `GET /collections`, `POST /collections`, `POST /collections/:id/sources`.
- `GET /articles?collectionId=&sourceId=&cursor=&q=&state=`.
- `GET /articles/:id`, `GET /articles/:id/content`.
- `POST /read-state`: batch mark read/saved.
- `GET /filters`, `POST /filters`, `PATCH /filters/:id`.
- `GET /alerts`, `POST /alerts`, `DELETE /alerts/:id`.
- `GET /boards`, `POST /boards`, `POST /boards/:id/items`.
- `POST /opml/import`, `GET /opml/export`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /notifications`, `POST /notifications/read`.

## Realtime, Push, And Offline Behavior

- Server-side background refresh of feeds; rate-limit per-source.
- Client syncs latest unread on foreground with pagination.
- Offline cache of most-recent unread per collection, bounded by quota.
- Push for alerts and breaking matches.
- OPML import processed asynchronously with status updates.
- Source health state prevents runaway retries on 4xx/5xx.

## Permissions, Privacy, And Safety

- Notifications opt-in.
- Analytics exclude raw article content, filter keywords, and URLs.
- Honor robots/feed terms where stated; rate-limit crawling.
- Minors: age-gate optional; no adult-source auto-recommendations.
- Content policy: block known malware/phishing sources; allow user report.
- Publisher takedown/opt-out honored.
- Accessibility: dynamic type, screen reader, contrast, reader-mode preserves semantics.
- Support tooling redacts user queries/content.
- Launch owner: product/privacy lead, legal for publisher terms, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: source added, article opened, filter created, alert fired, saved-to-board, subscription state changed.
- Monetization via original subscription tier.
- Paywall clarity: feature, state, restore path, platform, support.
- Webhook reconciliation across platforms.

## Edge Cases

- Feed moved/renamed; redirect following and dedupe.
- Feed returns malformed XML; quarantine source with user notice.
- Rate-limited publisher; surface state to user.
- Duplicate article across sources; dedupe option.
- Offline cache exceeds quota; eviction.
- OPML import with thousands of feeds; throttled ingest.
- Alert storm on trending keyword; cap and batch.
- Account deletion during active alerts.

## Test Plan

- Unit tests for feed parsing, dedupe, filter/alert evaluation, read-state batching.
- Contract tests for sources, articles, filters, alerts, OPML, subscription.
- Integration tests for discover-subscribe-read, filter-create, alert-fire, OPML-import.
- Feed-health tests for malformed/redirect/404/rate-limit.
- Privacy tests for analytics redaction and publisher takedown.
- Accessibility tests for dynamic type, screen reader, reader-mode semantics.
- Manual verification: native screenshots, purchase/restore, push payloads, OPML on device.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 honors publisher terms and rate-limits.
- Users can subscribe, read, filter, alert, save, and export.
- Feed/subscription flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Will V1 include AI-assisted summarization or defer?
- Which ranking signals for "Top" views?
- Team/enterprise tier in V1?
- Podcast/YouTube feed support in V1?
- Offline reader extraction allowed or link-only?

## Build Plan

- Phase 1: scaffold app, auth, feed parser, sources, collections.
- Phase 2: reader, read-state, saved/boards.
- Phase 3: filters, alerts, notifications.
- Phase 4: OPML import/export, subscription, webhooks.
- Phase 5: source-health, dedupe, offline cache.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and crawler policy.
- Design original reader chrome and filter DSL.
- Stand up downstream implementation repo.
