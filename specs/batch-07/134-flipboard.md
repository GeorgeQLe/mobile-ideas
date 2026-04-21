# Flipboard-Style Clone Spec

> Metadata
> - Inspiration app: Flipboard
> - Category: Magazine-style news aggregator with user-curated smart magazines
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and public help/publisher pages observed during source discovery.
> - Manual verification basis: native capture, page-flip animations, publisher integrations, purchase/restore, and push require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Publisher content must be sourced via licensed partners or public RSS/Atom with honored terms.

## Overview

Build an original mobile magazine-style news app inspired by Flipboard: topic-following, magazine-style page layout, user-curated "smart magazines" of saved items, and social flipping to shared magazines.

The clone must not copy Flipboard branding, magazine layout trademarks, private APIs, or partner-licensed content beyond terms.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Topic follows and a personalized magazine feed.
- Magazine-style layout with page-turn interactions and typographic variety.
- User-created magazines (smart magazines) to flip/save articles into.
- Public/private magazines shareable by link.
- Producer pipeline: editorial curation hooks.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Flipboard-branded app or imply affiliation.
- Do not copy proprietary layouts, iconography, or editorial copy.
- Do not scrape Flipboard or reuse private APIs.
- Do not republish paywalled content.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/flipboard/id358801284 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=flipboard.app | Source discovery — pending exact URL verification | Pending |
| Flipboard Support | https://about.flipboard.com/support/ | Source discovery — pending exact URL verification | Pending |
| RSS 2.0 Specification | https://www.rssboard.org/rss-specification | Source discovery — pending exact URL verification | Pending |
| Atom Syndication Format | https://tools.ietf.org/html/rfc4287 | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding selects topics of interest.
- Home presents a magazine-like layout with mixed article cards and imagery.
- Flipping to a smart magazine adds article reference and attribution.
- Magazines can be private or public (shareable URL).
- Article reader supports clean typography and source attribution.
- Editorial/curated magazines available for discovery.
- Push for breaking news and magazine followers.
- Sign-in with multiple providers.

## Core User Journeys

- New user picks topics and lands on personalized magazine.
- User swipes through magazine pages and taps an article.
- User flips article into a smart magazine (existing or new).
- User shares a public magazine link.
- User follows a curator and sees their magazine.
- User opens a topic page for deep dive.
- User mutes a topic or source.
- User requests data export or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Onboarding | Topic selection | tap topics | new, returning | region block |
| Home Magazine | Personalized feed | swipe pages | empty, loaded | feed failure |
| Topic Page | Topic deep-dive | swipe, tap | empty, loaded | source error |
| Article Reader | Read an article | scroll, menu | online, offline | extraction fail |
| Flip Sheet | Add to smart magazine | select magazine, new | idle, flipping, done | duplicate |
| My Magazines | User magazines | create, rename, delete | empty, loaded | sync error |
| Magazine Detail | One magazine | follow, share | public, private | removed |
| Curator Profile | Curator bio+magazines | follow | own, other, blocked | deleted |
| Notifications | Breaking/follower alerts | tap | unread, read | permission denied |
| Search | Topics, magazines, publishers | text | empty, results | rate-limit |
| Safety & Reports | Report content | reason | submitted, resolved | abuse |
| Settings | Account, privacy, notifications | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, interests.
- `Topic`: id, label, locale.
- `Publisher`: source id, name, icon, terms.
- `Article`: publisher, title, url, content ref, hero image.
- `Magazine`: owner (user/editorial), title, privacy, cover.
- `MagazineItem`: magazine, article, added-at, annotation.
- `Follow`: user, target (topic/magazine/curator).
- `Notification`: type, payload.
- `SafetyReport`: target, reason.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /onboarding/topics`, `POST /follows`, `DELETE /follows/:id`.
- `GET /home/magazine?cursor=`, `GET /topics/:id/magazine?cursor=`.
- `GET /articles/:id`, `GET /articles/:id/content`.
- `GET /magazines/:id`, `POST /magazines`, `PATCH /magazines/:id`, `DELETE /magazines/:id`.
- `POST /magazines/:id/items`: flip article into magazine.
- `GET /curators/:id`, `GET /search?q=&type=`.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `GET /notifications`, `POST /notifications/read`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Feed built server-side; client pages through.
- Offline cache of recent pages and smart-magazine contents.
- Push for breaking news (per-topic), curator updates, and magazine followers.
- Magazine share links resolve via public page with privacy enforcement.
- Image-heavy pages use adaptive loading to avoid cellular overuse.

## Permissions, Privacy, And Safety

- Notifications opt-in; per-topic/curator control.
- Analytics exclude raw article content and magazine annotations.
- Public magazines subject to community guidelines; reporting flow required.
- Editorial curation must label sponsored/ads distinctly.
- Minors: adult content filter default; parental controls respected.
- Publisher opt-outs honored.
- Accessibility: dynamic type, screen reader, reduced-motion alternative to page-flip.
- Support tooling redacts user content.
- Launch owner: product/privacy lead, editorial owner, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: onboarding completed, follow added, article opened, magazine created, flipped, shared.
- Monetization: ad-supported with clearly labeled sponsored content; optional ad-free subscription.
- Ad targeting: non-behavioral or contextual in V1.
- Webhook reconciliation if subscription launches.

## Edge Cases

- Magazine with deleted article references; graceful placeholders.
- Publisher takedown; purge article and notify curator.
- Duplicate flip into same magazine; dedupe.
- Shared public magazine viewed by signed-out user; gated preview.
- Reduced-motion user; disable page-flip animation.
- Feed ranking for new user with few signals; cold-start strategy.
- Abusive magazine name/description; moderation.
- Account deletion with public magazines; orphan/archive choice.

## Test Plan

- Unit tests for magazine CRUD, flip dedupe, follow graph, feed paging, reduced-motion fallback.
- Contract tests for home, topic, article, magazine, follows, search, reports.
- Integration tests for onboarding-follow-read, flip-and-share, curator-follow.
- Privacy tests for analytics redaction, ad labeling, minor defaults.
- Accessibility tests for dynamic type, screen reader, reduced motion.
- Manual verification: native screenshots, page-flip behavior, push, purchase/restore.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed publishers and honors opt-outs.
- Users can follow, read, flip, curate, share, report.
- Feed/magazine/subscription flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which publisher partnerships in V1?
- Ad model vs subscription in V1?
- Curator monetization in V1?
- Offline magazine bundles?
- Social follow/DM in V1 or deferred for safety?

## Build Plan

- Phase 1: scaffold app, auth, onboarding, home magazine, article reader.
- Phase 2: magazines CRUD, flip flow, public sharing.
- Phase 3: follows, curator pages, notifications.
- Phase 4: ads/subscription, reports, editorial labeling.
- Phase 5: offline caches, reduced-motion alternative, push.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and publisher partnerships.
- Design original magazine layout and animation fallback.
- Stand up downstream implementation repo.
