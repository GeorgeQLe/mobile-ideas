# Scribd-Style Clone Spec

> Metadata
> - Inspiration app: Scribd (Everand)
> - Category: All-you-can-read subscription across books, audiobooks, and documents
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, official help/support pages, official legal/privacy pages, and public standards where needed for lawful replacement infrastructure.
> - Manual verification blockers: native capture, subscription purchase/restore, throttling/unlock behaviors, audiobook playback, and document rendering require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Catalog content must come from licensed publishers.

## Overview

Build an original mobile subscription-reading app inspired by Scribd/Everand: one subscription unlocks a catalog of books, audiobooks, documents, magazines, and podcasts; the app provides unified reading, listening, and document viewing with progress sync, offline access, and saved lists.

The clone must not copy Scribd/Everand branding, copy, private APIs, or licensed content metadata.

This spec is implementation-ready for a V1 targeting documented public behavior. Feature-flag anything requiring verification.

## Goals

- Provide a subscription-gated catalog with search, browse, and personalized recommendations.
- Provide an e-book reader, audiobook player, and document viewer in one app.
- Support offline downloads with licensing-respecting revocation.
- Support saved lists, history, and resume across formats.
- Produce concrete routes, entities, contracts, offline rules, analytics, and tests.

## Non-Goals

- Do not build a Scribd/Everand-branded app or imply affiliation.
- Do not scrape Scribd or reuse private APIs.
- Do not host unlicensed user-uploaded copyrighted documents.
- Do not ship medical/legal/financial advice as authoritative content.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/everand-ebooks-audiobooks/id542557212 | iOS listing, ebooks, audiobooks, magazines, subscriptions, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.scribd.app.reader0 | Android listing, subscription reading/listening, downloads, data safety | Verified 2026-05-01 |
| Scribd Support | https://support.scribd.com/hc/en-us | Account, documents, subscriptions, billing, copyright, and support flows | Verified 2026-05-01 |
| Everand Help | https://help.everand.com/hc/en-us | Reading/listening, saved titles, downloads, subscription, and app help | Verified 2026-05-01 |
| Scribd Terms of Use | https://www.scribd.com/terms | User content, subscriptions, copyright, acceptable use, and account terms | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Subscription gates catalog access; free samples may be available without subscription.
- Search supports cross-format queries (books, audiobooks, documents, podcasts, magazines).
- Users can save titles, resume progress, and maintain listening/reading history.
- Offline downloads require active subscription; revocation on cancel.
- Recommendations are personal and signal-driven.
- Audiobooks support chapter, speed, sleep timer.
- Documents support pagination and basic annotation.
- Parental/content filters available.

## Core User Journeys

- User signs up, starts subscription trial, and lands on personalized home.
- User searches a title, samples, then opens under subscription.
- User reads, listens, and switches between formats for the same title where available.
- User downloads a book and audiobook for a trip.
- User saves a title to a list and resumes later.
- User cancels subscription and loses offline access after grace period.
- User opens a document, annotates, and shares a link to a section.
- User requests data export or deletes account.
- User reports a title or submits a support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Paywall | Entry and subscription | auth, plan select | new, returning, subscribed | trial expired, region block |
| Home | Recommendations and continue | tap | loaded, empty | feed failure |
| Search | Cross-format search | text, filters | empty, results | rate-limit |
| Title Detail | Description and formats | sample, start, download | subscribed, not subscribed | region restricted |
| Reader | E-book/document reading | swipe, menu, select | online, offline | render fail |
| Audio Player | Audiobook/podcast playback | play/pause, chapter | idle, playing | engine fail |
| Document Viewer | Paginated docs | scroll, annotate | online, offline | unsupported format |
| Saved Lists | User lists and history | add/remove | empty, loaded | sync error |
| Subscription | Plans and status | manage, restore | active, canceled, expired | platform mismatch |
| Downloads | Offline titles | manage, delete | empty, loaded | quota exceeded |
| Safety & Reports | Report content | reason | submitted, resolved | abuse |
| Settings | Account, privacy, downloads | toggles | loaded | managed |

## Data Model

- `User`: identity, locale, consent, subscription summary.
- `Title`: metadata, formats available (book/audiobook/document/podcast/magazine).
- `FormatAsset`: title id, format, manifest ref, DRM scheme.
- `Subscription`: plan, platform, state, renewal/expiry.
- `LibraryItem`: user, title, state (saved, reading, completed, downloaded).
- `ReadingProgress`: user, title, format, coordinate/time.
- `Annotation`: user, title, coordinate, text.
- `DownloadPackage`: user, title, encrypted asset ref, expiry.
- `List`: user-curated saves.
- `Notification`: type, payload.
- `SafetyReport`: target, reason.
- `AuditEvent`: account/billing/privacy changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `GET /home`: personalized recommendations.
- `GET /search?q=&format=`: cross-format search.
- `GET /titles/:id`: detail with formats and entitlements.
- `GET /titles/:id/manifest?format=`: reader/player/viewer manifest.
- `GET /titles/:id/resource/:resId`: DRM-gated content.
- `POST /titles/:id/progress?format=`: progress writes.
- `GET /annotations?titleId=`, `POST /annotations`.
- `GET /lists`, `POST /lists`, `POST /lists/:id/items`.
- `GET /subscription`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `GET /downloads`, `POST /downloads`, `DELETE /downloads/:id`.
- `POST /safety/reports`, `GET /support/cases/:id`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Offline downloads with DRM; revoked on subscription cancel or title pull.
- Progress merges across format (book/audiobook) and device.
- Push for recommendations, saved-title updates, subscription events.
- Subscription state refreshed on foreground and via webhook.
- Audiobook chapter sync resumes across devices.
- Document viewer caches pages with eviction policy.

## Permissions, Privacy, And Safety

- Notifications opt-in.
- Analytics exclude raw content, annotations, and queries.
- DRM isolates keys and enforces revocation.
- Minors: content rating filter enforced in-app and at store level.
- Licensing: honor publisher/podcast/magazine territorial terms.
- Documents: user-uploaded content is out of scope for V1 to avoid copyright issues; community docs limited to licensed partners.
- Support tooling redacts user annotations; elevated access required.
- Accessibility: screen reader, dynamic type, contrast, TTS where licensed.
- Launch owner: product/privacy lead, legal for licensing, security for DRM, accessibility owner.

## Analytics And Monetization

- Privacy-safe events: signup, subscription started, search, title opened, format switched, download, annotation created.
- Monetization via platform IAP subscription; original plan names/prices.
- Paywall clarity: blocked title, subscription state, restore path, platform, support.
- Webhook reconciliation across platforms.
- Trial/conversion metrics without raw content leakage.

## Edge Cases

- Subscription canceled during active download; revocation behavior.
- Title pulled from catalog while user reading.
- Cross-format resume conflict (audiobook vs. book progress).
- Large document with render timeout on low-end device.
- Offline cache corruption; graceful re-download.
- Webhook delay; client must reconcile on foreground.
- Refund after download; revoke entitlement.
- Account deletion with active subscription.

## Test Plan

- Unit tests for entitlement checks, cross-format progress, DRM lifecycle, annotation sync.
- Contract tests for search, title, manifest, resource, progress, subscription.
- Integration tests for signup-subscribe-read, audiobook listen, document view, cancel-and-revoke.
- Offline tests for download, revocation, and resume.
- Privacy tests for analytics redaction and minor defaults.
- Accessibility tests for reader/player/viewer.
- Manual verification: native screenshots, purchase/restore, playback, push payloads.

## Acceptance Criteria

- Exact source links verified before implementation.
- V1 uses licensed catalog providers.
- Users can subscribe, browse, read, listen, annotate, and download.
- Subscription/DRM flows deterministic.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which V1 formats: books+audiobooks only or include documents/podcasts/magazines at launch?
- Will V1 support throttling if licensing requires it?
- Family-sharing in V1?
- Community/reviews in V1 or deferred?
- TTS for e-books in V1?

## Build Plan

- Phase 1: scaffold app, auth, paywall, home, title detail.
- Phase 2: reader, audiobook player, document viewer.
- Phase 3: subscription, entitlements, webhooks.
- Phase 4: offline downloads, DRM, revocation.
- Phase 5: lists, annotations, recommendations, push.
- Phase 6: accessibility, manual verification, regression.

## Next Steps

- Resolve source URLs and catalog partners.
- Design original reader/player/viewer chrome.
- Stand up downstream implementation repo.
