# Wattpad-Style Clone Spec

> Metadata
> - Inspiration app: Wattpad
> - Category: Serialized fiction reader and writer community
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native iOS/Android capture, paid-story coin purchase/restore, creator-program eligibility walkthrough, mature-content gating, and push notification payload inspection still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, cover art, sample stories, tag taxonomies, and recommendation logic.

## Overview

Build an original mobile serialized-fiction app inspired by Wattpad's core loop: discover stories, read chapter-by-chapter with inline paragraph reactions, follow authors, build reading lists, get notified of new chapters, and optionally compose and publish original stories from a mobile writing surface.

The clone must not copy Wattpad branding, cover imagery, tagline/marketing copy, ranking-system names, private APIs, recommendation model outputs, original stories, or user-generated content. All product language, taxonomy labels, and editorial surfaces must be original and lawful.

This spec is implementation-ready for a V1 that targets the documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a mobile-first reader surface with chapter navigation, inline comments, reading progress sync, offline caching, and follow-author notifications.
- Allow curated reading lists, tag and language filtering, and continue-reading resume across devices.
- Support original-work creation with draft management, chapter scheduling, tag selection, and publish/unpublish controls.
- Gate mature, safety-sensitive, and monetized content behind age verification, content warnings, and privacy-safe controls.
- Produce concrete routes, entities, API contracts, offline rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Wattpad-branded app or imply affiliation with Wattpad.
- Do not scrape stories, reuse private Wattpad APIs, replay network traffic, or copy recommendation outputs.
- Do not import user-generated content from other platforms without an explicit license and author consent.
- Do not ship authoritative medical, legal, financial, or mental-health content in stories marketed as fiction.
- Do not claim exact App Store or Play Store parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/wattpad-read-write-stories/id306310789 | iOS listing, privacy labels, in-app purchases, reader/writer positioning, offline/library/social feature claims | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=wp.wattpad | Android listing, ads/in-app purchases, downloads, reading/writing, offline, comments, alerts, data safety | Verified 2026-05-01 |
| Wattpad Support Center | https://support.wattpad.com/ | Account, reading, writing, notifications, billing, and safety support orientation | Verified 2026-05-01 |
| Wattpad Content Guidelines | https://policies.wattpad.com/content/ | Mature content, prohibited content, reports, and enforcement scope | Verified 2026-05-01 |
| Wattpad Creators | https://creators.wattpad.com/ | Creator-program and author growth surfaces that remain manually gated for exact parity | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings describe a mobile reader-and-writer app with free reading, optional paid story access, offline-read support, and social features such as follows, reading lists, and comments.
- Readers must be able to open a story, navigate chapters sequentially, resume where they left off across devices, and download chapters for offline reading.
- Inline paragraph-level comments must be supported with throttling, reporting, and owner moderation.
- Authors must be able to compose chapters, save drafts, insert inline media where allowed, schedule/publish, and unpublish.
- Mature, violent, or adult-themed content must be tagged, warned, and gated by age/consent before display.
- Paid/locked chapters must use an original entitlement/coin economy with store-validated purchases.
- Discovery must support tag, language, length, completion-status, and popularity-adjacent filters using original ranking signals.
- Push notifications must be opt-in and must not include spoiler content by default.

## Core User Journeys

- New reader signs up, selects reading interests, and lands on a home feed of recommended stories with original ranking.
- Reader opens a story detail page, previews description/tags, and starts the first chapter.
- Reader scrolls through a chapter, reacts to a paragraph, and leaves an inline comment.
- Reader taps follow-author and enables new-chapter notifications.
- Reader adds a story to a reading list and downloads chapters for offline.
- Reader encounters a mature-content gate and either confirms age or backs out.
- Reader hits a paid/locked chapter, reviews entitlement options, purchases or restores, and resumes reading.
- Writer opens the writing surface, creates a story, drafts a chapter, adds tags and cover, and schedules publish.
- Writer reviews chapter comments, replies, and moderates abuse.
- Author receives a creator-program eligibility notice and reviews program terms.
- User reports a story, comment, or user and views the report status.
- User signs out, deletes account, or exports data from settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account creation, legal consent | email/social auth, continue as guest where allowed | new, returning, signed-out | underage, blocked region, auth error |
| Home Discovery | Recommended stories and categories | scroll, tag taps, filters | empty, loaded, loading, offline | feed failure, moderation hold |
| Story Detail | Story overview, cover, tags, chapters | follow, add to list, start reading | unread, in-progress, finished, paid | unavailable, removed, region-blocked |
| Reader | Chapter reading with inline reactions | scroll, comment, bookmark | online, offline, night mode | chapter missing, paid-gate, network loss |
| Inline Comment Thread | Paragraph-scoped discussion | reply, react, report | empty, loaded, locked | rate-limited, muted user |
| Reading Lists | User-curated collections | create, add/remove, rename | empty, private, public | sync error, quota reached |
| Writing Surface | Draft and publish chapters | text, formatting, media, tags | draft, scheduled, published | autosave failed, size limit |
| Author Profile | Author bio and works | follow, message-if-allowed | own, other, blocked | deleted account, hidden works |
| Notifications | New chapters, comments, follows | tap to open, mark read | unread, read, grouped | permission denied, delivery delay |
| Entitlements | Coin balance, paid chapter access | purchase, restore, history | free, paid, expired, refunded | platform mismatch, webhook delay |
| Safety & Reports | Report story/comment/user | reason, details | submitted, in review, resolved | abuse of reporting, region limits |
| Settings | Account, privacy, content filters, notifications | toggles, navigation | loaded, signed-out | enterprise/school restriction |

## Data Model

- `User`: identity, age gate, locale, reading/writing roles, consent state, moderation standing.
- `Story`: author, title, description, tags, language, maturity flags, completion status, monetization flags.
- `Chapter`: story id, order, title, content blocks, publish state, schedule time, paid/free flag.
- `ContentBlock`: text/media reference, formatting hints, moderation state.
- `ReadingProgress`: user, story, last chapter, last offset, updated-at timestamp.
- `ReadingList`: owner, title, privacy, stories, updated-at.
- `Follow`: follower, target (author or story), notification preferences.
- `Comment`: paragraph/chapter scope, author, text, moderation state, parent id.
- `Entitlement`: user, story/chapter, purchase id, platform, refund/restore state.
- `CoinWallet`: balance, transaction log, source (purchase, grant, refund).
- `Notification`: type, payload reference, delivery status, read state.
- `SafetyReport`: target type, reason, reporter, decision, audit trail.
- `AuditEvent`: append-only account, privacy, publishing, billing, and safety changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`: session lifecycle with device binding.
- `GET /discovery/home?locale=&cursor=`: ranked discovery feed using original signals.
- `GET /stories/:id`: story metadata with chapter manifest and entitlement summary.
- `GET /stories/:id/chapters/:chapterId`: chapter content with paid-gate enforcement.
- `POST /stories/:id/progress`: write reading progress, idempotent by chapter+offset.
- `GET /reading-lists`, `POST /reading-lists`, `PATCH /reading-lists/:id`, `POST /reading-lists/:id/items`.
- `POST /follows`, `DELETE /follows/:id`: follow authors or stories with notification preferences.
- `GET /comments?chapterId=&paragraphId=&cursor=`, `POST /comments`, `DELETE /comments/:id`.
- `POST /stories` and `PATCH /stories/:id`: author create/update with moderation hooks.
- `POST /stories/:id/chapters`, `PATCH /stories/:id/chapters/:chapterId`: draft, schedule, publish.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: cover/media upload with scanning.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /safety/reports`, `GET /support/cases/:id`: reporting and support lifecycle.
- `GET /notifications`, `POST /notifications/read`: notification feed and read-state sync.

## Realtime, Push, And Offline Behavior

- New-chapter notifications fan out via push with debounce and per-user quiet hours.
- Comment threads may stream new replies via a lightweight subscription where the user has the thread open.
- Offline reading requires signed download bundles per chapter with expiry and revocation on unpublish.
- Reading progress must reconcile across devices with last-writer-wins plus conflict notice.
- Writing drafts must autosave locally and reconcile with server versions on reconnect.
- Push payloads must not leak chapter spoilers; previews are opt-in per user.
- Moderation removals must invalidate offline copies on next sync.

## Permissions, Privacy, And Safety

- Camera, photo library, and notification permissions are requested at point of use.
- Default analytics exclude raw story content, comment text, and precise location.
- Age gate must be explicit at signup and re-verified when enabling mature content.
- Minors must have stricter default privacy, restricted messaging, and limited mature-content exposure.
- Content policy must block or transform content involving sexual exploitation, minors, self-harm facilitation, harassment, doxxing, and illegal activity.
- Paragraph comments must support rate limits, blocklists, and author moderation.
- Writer tools must surface plagiarism and IP-violation reporting flows.
- Creator payouts, where enabled, require KYC collection separated from standard account data.
- Support tooling must redact user content and require elevated access for raw inspection.
- Launch owner: product/safety lead for policy, privacy owner for data controls, billing owner for entitlements, accessibility owner for dynamic type/screen reader coverage.

## Analytics And Monetization

- Track privacy-safe events: signup completed, story opened, chapter completed, reading-list created, follow added, comment posted, paid-gate shown, purchase completed, report submitted.
- Use stable object types and failure codes, never raw user text.
- Monetization can include original coin/subscription tiers with original pricing, offers, and copy.
- Paywall states must identify the blocked chapter, entitlement, restore path, platform ownership, and support path.
- Usage limits (e.g., free-daily paid previews) must be testable independently from payment state.
- App-store and web subscriptions must reconcile via server-side webhooks.

## Edge Cases

- First launch offline, expired auth, unsupported OS, underage user, blocked region, school-managed device.
- Story unpublished mid-read, chapter deleted with comments still attached, or maturity re-flagged after purchase.
- Reading-progress conflict between devices; list renamed while offline.
- Autosave conflict when the same draft is edited on two devices.
- Push notification delivered after chapter deletion.
- Paid chapter purchased on one platform and opened on another.
- Abusive comment storm on a single paragraph; author mute rules must apply in real time.
- Minor user upgrades to adult; historical mature-content gating must be re-evaluated.

## Test Plan

- Unit tests for reading-progress conflict resolution, entitlement checks, moderation state machines, and autosave.
- Contract tests for discovery, chapter read, comment, reading-list, and entitlement routes.
- Integration tests for signup, read flow, follow, comment, reading-list, and publish flow.
- Offline tests for download bundle expiry, revocation, and progress reconciliation.
- Safety tests for each policy class plus report submission and support escalation.
- Billing tests for free, paid, refunded, restored, web-owned, and app-store-owned entitlements.
- Privacy tests for analytics redaction, mature-content gating, and minor defaults.
- Accessibility tests for dynamic type, screen reader, reduced motion, color contrast, and night-mode readability.
- Manual verification tests: native screenshots, push payload inspection, purchase/restore, creator-program eligibility flow.

## Acceptance Criteria

- Exact source links are verified and refreshed before implementation kickoff.
- A downstream team can build V1 without proprietary Wattpad assets, stories, or private APIs.
- Readers can discover, read, comment, follow, list, download, and resume stories.
- Writers can draft, schedule, publish, and moderate their works.
- Mature-content gating, minor defaults, and safety reporting are covered by tests.
- Entitlement, offline, and push behaviors have deterministic contracts and failure codes.
- Manual verification blockers are resolved or remain feature-flagged.

## Open Questions

- Which recommendation signals are in V1 versus later phases?
- Will V1 support private messaging between users, or defer until safety review completes?
- What is the V1 monetization model: coins, subscription, ad-supported, or hybrid?
- Will V1 support translations or author-provided multi-language editions?
- Is author payout in V1 or deferred until KYC/tax tooling is ready?

## Build Plan

- Phase 1: scaffold app shell, auth, discovery home, story detail, reader, and reading progress.
- Phase 2: add reading lists, follows, inline comments, and notifications.
- Phase 3: add writing surface with drafts, scheduling, publishing, and moderation hooks.
- Phase 4: add entitlements, coin wallet, paid gates, checkout/restore, and webhooks.
- Phase 5: add offline downloads, push notifications, and safety reporting.
- Phase 6: accessibility pass, manual native verification, and content-policy regression.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff.
- Draft original tag taxonomy, maturity rubric, and moderation playbook.
- Stand up a downstream implementation repo when Phase 1 is ready.
