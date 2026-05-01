# SmartNews-Style Clone Spec

> Metadata
> - Inspiration app: SmartNews
> - Category: News aggregator with topic channels and offline news
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, publisher integrations, offline-news prefetch behavior, push payloads, and balanced-source views require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Publisher content must come through licensed partner feeds with honored opt-outs.

## Overview

Build an original mobile news aggregator inspired by SmartNews: a horizontally swipable channel strip (Top, Business, Sports, etc.), offline news prefetch for commutes, breaking alerts, and a balanced-source reading mode that shows coverage across outlets on the same story.

The clone must not copy SmartNews branding, private APIs, or partner-licensed content beyond terms.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Provide horizontal channel navigation with top stories per channel.
- Provide offline-news prefetch for a configurable window.
- Provide breaking alerts with topic granularity.
- Provide story clustering and a "coverage" view across sources for the same event.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a SmartNews-branded app or imply affiliation.
- Do not scrape SmartNews or reuse private APIs.
- Do not misrepresent balanced-source ratings; explain methodology.
- Do not copy trademarked navigation names.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/smartnews-local-breaking-news/id579581125 | iOS listing, local/breaking news, channels, notifications, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=jp.gocro.smartnews.android | Android listing, local/breaking news, channels, alerts, data safety | Verified 2026-05-01 |
| SmartNews About | https://www.smartnews.com/en/about/ | Company/product positioning, news discovery mission, and publisher ecosystem | Verified 2026-05-01 |
| SmartNews Privacy Policy | https://www.smartnews.com/en/privacy/ | Personalization, location, ads, account data, privacy rights, and retention | Verified 2026-05-01 |
| SmartNews Terms of Service | https://www.smartnews.com/en/terms/ | Content use, account, ads, acceptable use, and service terms | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Horizontal channels swipable on top bar.
- Each channel has top stories ranked by an original signal blend.
- Stories can cluster multiple sources for the same event.
- Offline prefetch downloads headlines + first paragraphs for a commute window.
- Breaking alerts are push-based with per-channel toggles.
- Publisher attribution and timestamps on every story.
- Search across stories and channels.

## Core User Journeys

- User installs app, grants push opt-in, and sees Top channel.
- User swipes to Business channel and reads clustered stories.
- User taps a story and sees other sources covering the same event.
- User sets up commute mode and prefetches offline news.
- User receives a breaking alert and opens it.
- User mutes a topic and reports a misleading article.
- User deletes account or exports data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Onboarding | Permission prompts and interests | topic selection | new, returning | region block |
| Channel Strip Home | Top channel feed | swipe, scroll | empty, loaded | feed failure |
| Channel Feed | Stories in channel | scroll, tap | empty, loaded | source error |
| Story Cluster | One event, multi-source | tap source | loaded | stale |
| Article Reader | Read an article | scroll, menu | online, offline | extraction fail |
| Commute/Offline | Offline cache status | prefetch, schedule | idle, prefetched, expired | quota exceeded |
| Search | Query stories | text | empty, results | rate-limit |
| Notifications | Breaking alerts | tap | unread, read | permission denied |
| Safety & Reports | Report content | reason | submitted, resolved | abuse |
| Settings | Account, channels, privacy | toggles | loaded, signed-out | managed |
| Source List | All sources with mute | toggle | empty, loaded | conflict |
| Topic Follow | Follow topics | add/remove | empty, loaded | sync error |

## Data Model

- `User`: identity, locale, consent, channel prefs.
- `Channel`: id, label.
- `Source`: publisher id, name, icon, terms.
- `Story`: canonical event id, headline, summary, sources.
- `Article`: source, story, url, content ref, published-at.
- `ChannelRanking`: channel id, story id, rank, window.
- `OfflineBundle`: user, channel, articles subset, expiry.
- `Follow`: user, topic/source, notify flag.
- `Notification`: type, payload.
- `SafetyReport`: target, reason.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /channels`, `GET /channels/:id/stories?cursor=&window=`.
- `GET /stories/:id`, `GET /stories/:id/sources`.
- `GET /articles/:id`, `GET /articles/:id/content`.
- `POST /offline/prefetch`: create commute bundle for channels.
- `GET /offline/bundles`, `DELETE /offline/bundles/:id`.
- `GET /search?q=&channel=`.
- `POST /follows`, `DELETE /follows/:id`.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `GET /notifications`, `POST /notifications/read`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Channel ranking recomputed on server window; client caches with TTL.
- Commute prefetch runs on schedule and surfaces status.
- Breaking alerts via push with topic channel granularity.
- Offline reader degrades gracefully when bundle expires.
- Story clustering recalculated server-side; client reflects clusters.

## Permissions, Privacy, And Safety

- Notifications opt-in; location optional for local news.
- Analytics exclude raw article content; aggregate only for ranking.
- Editorial integrity: sponsored content labeled; opinion labeled.
- Cluster/balance methodology documented and linkable.
- Minors: adult filter default; parental controls respected.
- Publisher opt-outs honored; rate-limited crawling.
- Accessibility: dynamic type, screen reader, reduced-motion channel-swipe fallback.
- Support tooling redacts user content.
- Launch owner: product/editorial/privacy leads, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: channel opened, story opened, cluster viewed, offline prefetched, report submitted.
- Monetization: ad-supported with sponsored labels; optional ad-free subscription.
- Ad targeting: contextual only in V1.
- Webhook reconciliation if subscription launches.

## Edge Cases

- Cluster merges two unrelated events; user report path.
- Offline bundle too large; quota enforcement.
- Publisher pulls article mid-bundle; graceful placeholder.
- Push for retracted news; correction push.
- Region change; channel availability re-evaluated.
- High-traffic breaking; rate-limit and batch pushes.
- Prefetch on cellular off; fail gracefully.
- Account deletion with active subscription.

## Test Plan

- Unit tests for ranking inputs, cluster merge, prefetch scheduling, report state machine.
- Contract tests for channels, stories, articles, offline, search, follows.
- Integration tests for channel-browse, cluster-view, prefetch-and-read-offline, push-alert.
- Privacy tests for analytics redaction, labels, minor defaults.
- Accessibility tests for swipe alternative, dynamic type, screen reader.
- Manual verification: native screenshots, push payloads, prefetch on device, publisher flows.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed publishers, documents cluster methodology.
- Users can channel-browse, cluster-read, prefetch, alert, report.
- Feed/offline/push flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which publishers/regions in V1?
- Cluster algorithm scope and explainability?
- Subscription tier in V1?
- Widgets in V1 or later?
- Local-news coverage scope?

## Build Plan

- Phase 1: scaffold app, auth, onboarding, channels, article reader.
- Phase 2: story clustering, multi-source view, search.
- Phase 3: offline prefetch, commute mode, notifications.
- Phase 4: ads/subscription, reports, editorial labels.
- Phase 5: regional variants, publisher integrations.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and publisher partnerships.
- Design original channel taxonomy and cluster methodology doc.
- Stand up downstream implementation repo.
