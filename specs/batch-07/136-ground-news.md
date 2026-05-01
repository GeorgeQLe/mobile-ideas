# Ground News-Style Clone Spec

> Metadata
> - Inspiration app: Ground News
> - Category: Bias-rated news aggregation and source comparison
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, subscription purchase/restore, blindspot feed, factuality metric rendering, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Bias ratings must be from licensed or original methodology; publisher content via licensed partner feeds.

## Overview

Build an original mobile news app inspired by Ground News: every story shows coverage across sources labeled by political bias, factuality, and ownership; a blindspot feed highlights stories that one side of the spectrum under-covers.

The clone must not copy Ground News branding, private APIs, or bias-rating datasets without license. Methodology must be documented and transparent.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Aggregate news, cluster by story, and display per-source bias/factuality/ownership labels.
- Provide a blindspot feed highlighting asymmetric coverage.
- Provide source comparison (left/center/right distributions) per story.
- Provide subscriptions for advanced features.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Ground News-branded app or imply affiliation.
- Do not copy Ground News bias datasets without license.
- Do not present bias ratings without visible methodology.
- Do not misrepresent a source's stance.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/ground-news/id1324203419 | iOS listing, bias comparison, blindspot, ownership/factuality context, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.checkitt | Android listing, news comparison, bias/factuality, subscription features, data safety | Verified 2026-05-01 |
| Ground News Rating System | https://ground.news/rating-system | Bias, factuality, ownership, and source-rating methodology | Verified 2026-05-01 |
| Ground News Blindspot | https://ground.news/blindspot | Blindspot product concept and political-spectrum comparison surface | Verified 2026-05-01 |
| Ground News Terms of Use | https://ground.news/terms-and-conditions | Subscription, acceptable use, account, content, and service terms | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Story page shows source distribution by bias and factuality.
- Blindspot feed surfaces stories under-covered by left/center/right sources.
- Source detail shows ownership, bias rating, methodology link, and recent articles.
- Users can follow topics/sources and receive alerts.
- Subscription unlocks advanced features (historical data, deep-dives, more blindspots).
- Transparent methodology pages linked from every rating.

## Core User Journeys

- User opens app, sees top stories with bias bars.
- User taps a story and sees source distribution and sample sources.
- User opens blindspot feed and reads under-covered stories.
- User follows a topic and receives notifications.
- User opens a source page to review its methodology and ownership.
- User subscribes for advanced features.
- User reports a questionable rating and receives an appeals response.
- User deletes account or exports data.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Onboarding | Interests | tap topics | new, returning | region block |
| Home | Top stories with bias bars | scroll, tap | empty, loaded | feed failure |
| Story Detail | Source distribution + cluster | tap source, read | loaded | insufficient sources |
| Source Page | Methodology and ownership | read, follow | loaded | unrated |
| Blindspot Feed | Asymmetric coverage | tap | empty, loaded | insufficient data |
| Article Reader | Read partner article | scroll, menu | online, offline | extraction fail |
| My Topics | Followed topics/sources | manage | empty, loaded | sync conflict |
| Subscription | Plan management | manage, restore | free, paid | platform mismatch |
| Methodology | Rating explanation | read | loaded | offline |
| Reports | Appeal a rating | reason | submitted, in review | abuse |
| Notifications | Alerts | tap | unread, read | permission denied |
| Settings | Account, privacy, notifications | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `Topic`: id, label.
- `Source`: publisher id, name, bias rating, factuality rating, ownership, methodology ref.
- `Story`: canonical event id, summary.
- `Coverage`: story, source, article.
- `BiasRating`: source, scale, evidence refs, reviewed-at.
- `Blindspot`: story, spectrum side under-covering.
- `Follow`: user, topic/source.
- `Subscription`: plan, platform, state.
- `RatingAppeal`: source, user, reason, decision.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /home/top-stories`, `GET /blindspots`.
- `GET /stories/:id`, `GET /stories/:id/coverage`.
- `GET /sources/:id`, `GET /sources/:id/articles`.
- `GET /bias-ratings/:sourceId`, `GET /methodology`.
- `POST /appeals`, `GET /appeals/:id`.
- `POST /follows`, `DELETE /follows/:id`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /notifications`, `POST /notifications/read`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Story clustering and blindspot computation server-side.
- Cached top-stories and blindspots for offline.
- Push for breaking and blindspot alerts; per-topic toggles.
- Rating changes broadcast via signed methodology updates.
- Appeals reviewed asynchronously; status push.

## Permissions, Privacy, And Safety

- Notifications opt-in.
- Analytics exclude raw article content; aggregate only for ranking.
- Methodology must be visible, dated, and linkable.
- Bias ratings owned by editorial team with clear provenance.
- Editorial independence: ratings not influenced by advertisers.
- Minors: standard defaults.
- Publisher opt-outs honored.
- Accessibility: dynamic type, screen reader, color-independent bias indicators (labels + patterns, not color alone).
- Support tooling redacts user content.
- Launch owner: product/editorial/privacy leads, accessibility owner, legal for ratings IP.

## Analytics And Monetization

- Privacy-safe events: story viewed, coverage expanded, blindspot opened, source visited, subscription state changed, appeal submitted.
- Monetization via original subscription tier for advanced features.
- Paywall clarity: feature, state, restore, platform, support.
- Webhook reconciliation across platforms.

## Edge Cases

- Insufficient coverage to show distribution; display caveat.
- Source rating updated; historical stories re-evaluated.
- Appeal with merit; surface correction.
- Offline blindspot stale; indicator.
- Region-restricted source; graceful omission.
- Rating challenged by source; formal response process.
- Color-blind user; patterns and labels required.
- Account deletion with appeals in progress.

## Test Plan

- Unit tests for cluster/distribution math, blindspot detection, appeal state machine.
- Contract tests for stories, coverage, sources, ratings, appeals, subscription.
- Integration tests for home-story-distribution, blindspot-read, appeal-submit.
- Methodology-visibility tests (every rating links to explanation).
- Privacy tests for analytics redaction and minor defaults.
- Accessibility tests for color-independent bias indicators.
- Manual verification: native screenshots, purchase/restore, push, partner feeds.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed or original bias methodology with transparency.
- Users can view distributions, blindspots, sources, methodology, and appeal ratings.
- Subscription/editorial flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which bias-rating dataset/methodology in V1?
- Regions supported in V1 (US only or international)?
- Factuality rubric source?
- Appeals workflow staffing?
- Data retention for rating evidence?

## Build Plan

- Phase 1: scaffold app, auth, home, story detail, source page.
- Phase 2: blindspots, clustering, methodology pages.
- Phase 3: follows, notifications, reports/appeals.
- Phase 4: subscription, entitlements, webhooks.
- Phase 5: offline caches, color-independent indicators.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and rating-data licensing.
- Draft original methodology document.
- Stand up downstream implementation repo.
