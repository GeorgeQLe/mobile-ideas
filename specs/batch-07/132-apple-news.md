# Apple News-Style Clone Spec

> Metadata
> - Inspiration app: Apple News
> - Category: News aggregator with topic follows and publisher subscriptions
> - Readiness status: Draft 1
> - Verification basis: public marketplace listing (iOS), public publisher program pages, and public help observed during source discovery.
> - Manual verification blockers: native iOS capture, News+-equivalent bundle subscription purchase/restore, publication landing pages, widgets, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Publisher content must come through licensed partner agreements.

## Overview

Build an original mobile news aggregator inspired by Apple News: follow topics and publications, browse curated top stories, save articles, and optionally subscribe to a premium bundle for premium publications. Widgets surface headlines.

The clone must not copy Apple News branding, editorial copy, private APIs, or partner trademarked feature names.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Provide a personalized top-stories feed and topic/publication follows.
- Support publication landing pages with the publication's original content (licensed).
- Support article reader with typography and saved-for-later.
- Provide premium-bundle subscription for partner publications with entitlement gating.
- Provide widgets for home screen and lock screen (where OS supports).
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build an Apple News-branded app or imply Apple affiliation.
- Do not copy editorial curation copy or proprietary ranking.
- Do not scrape partners or reuse private APIs.
- Do not misrepresent partner publications.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/apple-news/id1066498020 | Source discovery — pending exact URL verification | Pending |
| Apple News Publishers | https://www.apple.com/apple-news/ | Source discovery — pending exact URL verification | Pending |
| Apple News for Publishers | https://developer.apple.com/news-publisher/ | Source discovery — pending exact URL verification | Pending |
| WebWidgetKit | https://developer.apple.com/widgetkit/ | Source discovery — pending exact URL verification | Pending |
| Editorial Independence Standards | https://www.spj.org/ethicscode.asp | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding asks user to follow topics and publications.
- Top Stories is curated (originally) and time-sensitive.
- Publications have dedicated landing pages.
- Premium bundle unlocks participating publications.
- Articles include author, byline, publication badge, published-at.
- Save-for-later and history are first-class states.
- Widgets show "now trending" or "following" articles.
- Parental controls limit adult content.

## Core User Journeys

- New user selects interests and sees a personalized top-stories feed.
- User follows a publication and opens its landing page.
- User reads an article and saves it.
- User subscribes to premium bundle and unlocks premium content.
- User adds a widget to home screen.
- User mutes a topic and reduces related content.
- User reports a misleading article.
- User requests data export or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Onboarding | Interest selection | tap topics/pubs | new, returning | region block |
| Top Stories | Curated feed | scroll, tap | empty, loaded | feed failure |
| Following | Topics+pubs feed | scroll | empty, loaded | source error |
| Publication Page | Publication landing | tap, subscribe-within | loaded | licensed off |
| Article Reader | Read an article | scroll, select, menu | online, offline | premium-gate |
| Saved | Save-for-later | remove, mark read | empty, loaded | sync error |
| History | Recently read | tap | empty, loaded | limits |
| Subscription | Premium bundle | manage, restore | free, paid | platform mismatch |
| Widgets Host | OS widgets | OS event | configured | permission |
| Safety & Reports | Report article | reason | submitted, resolved | abuse |
| Notifications | Breaking alerts | tap | unread, read | permission denied |
| Settings | Account, privacy, notifications | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary, interest graph.
- `Publication`: licensed partner, title, icon, URL, premium flag.
- `Topic`: id, label, locale.
- `Follow`: user, target (topic/publication), notify flag.
- `Article`: publication, author, title, body ref, published-at, premium flag, categories.
- `Saved`: user, article, saved-at.
- `History`: user, article, opened-at.
- `Entitlement`: user, plan, platform, state.
- `WidgetSnapshot`: user, selection, updated-at.
- `SafetyReport`: target, reason.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /onboarding/interests`, `POST /follows`, `DELETE /follows/:id`.
- `GET /top-stories`, `GET /following`.
- `GET /publications/:id`, `GET /publications/:id/articles?cursor=`.
- `GET /topics/:id/articles?cursor=`.
- `GET /articles/:id`, `GET /articles/:id/content`.
- `POST /saved`, `DELETE /saved/:articleId`, `GET /saved`.
- `GET /history`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /widgets/selection`, `POST /widgets/selection`.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `GET /notifications`, `POST /notifications/read`.

## Realtime, Push, And Offline Behavior

- Server curates top stories; client polls on foreground.
- Breaking alerts via push with per-user throttle.
- Offline cache of recently opened and saved articles.
- Widgets refresh via OS background tasks.
- Subscription state refreshed on foreground and via webhook.
- Licensed articles respect offline license duration.

## Permissions, Privacy, And Safety

- Notifications opt-in with per-topic control.
- Analytics exclude raw article content and interest graph specifics (aggregate only).
- Editorial integrity policy: clearly label sponsored content, publisher identity, and opinion pieces.
- Minors: adult-content filter enforced; parental controls respected.
- Content policy: block violent extremism, hate, disinfo known to violate policy; appeals flow for publishers.
- Licensing: publisher-negotiated terms respected (territorial, offline).
- Support tooling redacts user content.
- Accessibility: VoiceOver/TalkBack, dynamic type, contrast, widget accessibility.
- Launch owner: product/privacy/editorial lead, legal for licensing, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: onboarding completed, follow added, article opened, saved, subscription state changed, report submitted.
- Monetization via original premium-bundle subscription; partner revenue-sharing model described separately.
- Paywall clarity: premium badge, entitlement, restore path, platform, support.
- Webhook reconciliation across platforms.
- No behavioral ads in V1.

## Edge Cases

- Licensed article unavailable offline after license expiry.
- Subscription canceled while article open; graceful revocation at next load.
- Follow a publication that gets pulled from partners; migrate followers.
- Widget stale after article pulled.
- Push for breaking news that's retracted; send correction.
- Minor toggle adult filter; recompute feed.
- Region change; re-evaluate licensing.
- Account deletion with active subscription.

## Test Plan

- Unit tests for follow graph, feed curation inputs, entitlement checks, saved/history.
- Contract tests for top-stories, following, publication, article, saved, subscription.
- Integration tests for onboarding-follow-read, subscribe-unlock, widget refresh.
- Offline tests for saved article access and license expiry.
- Privacy tests for analytics redaction, editorial labeling, minor defaults.
- Accessibility tests for reader and widgets.
- Manual verification: native screenshots, purchase/restore, push, widgets, publisher pages.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed publishers; editorial labels respected.
- Users can follow, read, save, subscribe, and widget.
- Subscription/licensing flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which publishers in V1 bundle?
- Editorial team for curation: in-house, partner, or algorithmic only?
- Widgets in V1 scope vs. later?
- Audio articles in V1?
- Political content balance/labeling rules?

## Build Plan

- Phase 1: scaffold app, auth, onboarding, follows, top stories.
- Phase 2: publication pages, article reader, saved/history.
- Phase 3: subscription, premium gating, webhooks.
- Phase 4: widgets, push, notifications.
- Phase 5: safety reports, editorial labeling, regional gating.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and publisher licensing.
- Design original editorial/curation framework.
- Stand up downstream implementation repo.
