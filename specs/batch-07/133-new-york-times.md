# New York Times-Style Clone Spec

> Metadata
> - Inspiration app: The New York Times
> - Category: Premium news publication with sections, saved articles, games, and audio
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, public help pages, and publisher site observed during source discovery.
> - Manual verification blockers: native capture, subscription purchase/restore, audio-article playback, games entry, and push payloads require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. This is a template for a premium news publisher app — the operator must own or license all editorial content; no copying of NYT articles, logos, photography, or marketing copy.

## Overview

Build an original mobile premium-news app inspired by The New York Times: sectioned article feed, paywalled reading with subscription, saved articles, audio articles, and a games/puzzles entry point.

The clone must not copy NYT branding, editorial content, photography, private APIs, or trademarked puzzle names.

This spec is implementation-ready for a V1. Feature-flag anything unverified.

## Goals

- Provide sectioned article browsing (politics, business, culture, etc. — original taxonomy).
- Provide an article reader with typography, byline, photos, and share.
- Provide paywall gating by subscription state.
- Provide saved-for-later and reading history.
- Provide audio-article playback.
- Provide a games/puzzles entry (generic puzzle clones) with their own entitlements.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build an NYT-branded app or imply affiliation.
- Do not copy NYT editorial content or puzzles.
- Do not scrape NYT or reuse private APIs.
- Do not misrepresent source editorial as authoritative without independent editorial oversight.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/the-new-york-times/id284862083 | Source discovery — pending exact URL verification | Pending |
| Google Play | https://play.google.com/store/apps/details?id=com.nytimes.android | Source discovery — pending exact URL verification | Pending |
| NYT Help | https://help.nytimes.com/ | Source discovery — pending exact URL verification | Pending |
| Society of Professional Journalists Code | https://www.spj.org/ethicscode.asp | Source discovery — pending exact URL verification | Pending |
| Apple StoreKit Docs | https://developer.apple.com/storekit/ | Source discovery — pending exact URL verification | Pending |

## Detailed Design

### Source-Backed Product Requirements

- Home surfaces top stories and section shortcuts.
- Articles have a paywall for non-subscribers; limited free previews may be allowed.
- Audio articles stream with offline cache; queue/player controls.
- Games/puzzles area has its own navigation and entitlement (all-access or games-only).
- Save-for-later and reading history persist across devices.
- Push for breaking news with per-topic toggles.
- Newsletter sign-up from account (delivered externally).

## Core User Journeys

- User installs app, sees limited free articles, and is prompted to subscribe.
- User subscribes to all-access or news-only plan.
- User reads an article, listens to audio, saves, and shares.
- User opens games and plays a puzzle.
- User sets breaking-news push preferences.
- User browses a section and filters by topic.
- User cancels subscription and loses paywalled access after renewal.
- User requests data export or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Paywall | Entry and subscription | auth, plan select | new, returning, subscribed | trial expired, region block |
| Home | Top stories | scroll, tap | empty, loaded | feed failure |
| Section | One section feed | scroll, filter | empty, loaded | partner error |
| Article Reader | Read an article | scroll, menu | online, offline | paywall |
| Audio Player | Audio-article playback | play/pause, queue | idle, playing | engine fail |
| Games Hub | Puzzle entry | tap | free, paid | entitlement required |
| Games Player | Puzzle play | taps, input | active, completed | save/resume fail |
| Saved | Save-for-later | add/remove | empty, loaded | sync conflict |
| History | Recently read | tap | empty, loaded | limits |
| Subscription | Plan management | manage, restore | free, paid | platform mismatch |
| Notifications | Breaking alerts | tap | unread, read | permission denied |
| Settings | Account, privacy, push | toggles | loaded, signed-out | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `Section`: id, label.
- `Article`: section, author, title, body ref, published-at, paywall tier, audio asset ref.
- `AudioAsset`: article, duration, stream refs.
- `Saved`: user, article, saved-at.
- `History`: user, article, opened-at.
- `Puzzle`: id, kind, schedule date.
- `PuzzleSession`: user, puzzle, state.
- `Entitlement`: user, plan tier (all-access/news/games), platform, state.
- `Notification`: type, payload.
- `AuditEvent`: append-only changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /home`, `GET /sections`, `GET /sections/:id/articles?cursor=`.
- `GET /articles/:id`, `GET /articles/:id/content`, `GET /articles/:id/audio`.
- `POST /saved`, `DELETE /saved/:articleId`, `GET /saved`.
- `GET /history`, `POST /history/clear`.
- `GET /games`, `GET /games/:id`, `POST /games/:id/session`, `PATCH /games/:id/session`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /notifications/prefs`, `PATCH /notifications/prefs`.
- `POST /data-export`, `DELETE /account`.
- `POST /safety/reports`.

## Realtime, Push, And Offline Behavior

- Breaking-news push via topic channels; per-user throttle.
- Offline cache of sections, saved, and audio queue.
- Games offline play where puzzle content allows; sync grades on reconnect.
- Subscription state refreshed on foreground and webhook.
- Audio resume sync across devices.

## Permissions, Privacy, And Safety

- Notifications opt-in; per-topic controls.
- Analytics exclude raw article content and user reading sequences beyond aggregate.
- Editorial standards: separate news and opinion sections; corrections tracked.
- Paywall previews respect free-article quotas without device-fingerprint abuse (use account-based quotas).
- Minors: standard defaults.
- Games: no gambling mechanics; minor-safe UI.
- Accessibility: dynamic type, VoiceOver/TalkBack, audio-article captions/transcripts.
- Support tooling redacts user content.
- Launch owner: product/editorial lead, privacy owner, billing owner, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: home opened, article opened, paywall shown, subscription state changed, audio started, saved, game completed.
- Monetization via original news/games/all-access subscription tiers.
- Paywall clarity: paywalled article, tier, restore, platform, support.
- Webhook reconciliation across platforms.
- Newsletter signups tracked as consent events.

## Edge Cases

- Article retracted; correction banner required.
- Subscription canceled mid-article; render paywall on next load.
- Audio asset missing mid-playback; graceful stop.
- Game state lost on device switch; server-side resume.
- Push retraction after false alert.
- Minor with parental controls; hide games with ad-adjacent content.
- Region change; re-evaluate subscription availability.
- Account deletion with active subscription.

## Test Plan

- Unit tests for paywall gating, saved/history, game session resume, audio queue.
- Contract tests for home, section, article, audio, games, saved, subscription.
- Integration tests for paywall-subscribe-read, audio-listen, game-complete.
- Offline tests for sections, audio queue, games where allowed.
- Privacy tests for analytics redaction, editorial labels, minor defaults.
- Accessibility tests for reader, audio captions, games input methods.
- Manual verification: native screenshots, purchase/restore, push, audio, games on device.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 is a template; operator must own/license all content.
- Users can read, listen, save, play, and subscribe.
- Subscription/paywall flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which tiers in V1 (all-access, news-only, games-only)?
- Audio article sourcing: in-house voice actors, TTS, or licensed voice?
- Games roster in V1?
- Newsletter integration vendor?
- Widget scope in V1?

## Build Plan

- Phase 1: scaffold app, auth, home, sections, article reader.
- Phase 2: saved, history, audio-article player.
- Phase 3: paywall, subscription tiers, webhooks.
- Phase 4: games hub and puzzle players.
- Phase 5: push, notifications, newsletter signup.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and content licensing for operator.
- Design original editorial taxonomy and corrections policy.
- Stand up downstream implementation repo.
