# Audible-Style Clone Spec

> Metadata
> - Inspiration app: Audible
> - Category: Audiobooks, podcasts, originals, credits, Plus-catalog listening, offline playback, kids profiles, and spoken-word subscriptions
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Audible membership pages, Audible Help Center articles, Audible/Amazon privacy/legal pages, and public listening/account documentation.
> - Manual verification blockers: native iOS/Android screen capture, Amazon/Audible signup/login, membership purchase/restore/cancel, Premium Plus credits, cash purchases, returns/exchanges, Plus Catalog expiry, Kids Profile, Whispersync, Kindle handoff, CarPlay/Watch, sleep timer, bookmarks/clips, downloads/offline, push payloads, data export/deletion, and regional catalog availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, audiobook catalog, narrator/author data, podcast catalog, originals, recommendation models, payment integrations, device integrations, and licensing relationships.

## Overview

Build an original spoken-word audio app inspired by Audible's public workflow: account entry, membership plans, audiobook discovery, library, wishlist, samples, credits, purchase/unlock, Plus-like catalog access, podcasts/originals, chapter playback, sleep timer, bookmarks/clips, downloads, Kids Profile-like sharing, device handoff, support, privacy controls, and account deletion.

The clone must not copy Audible or Amazon branding, screenshots, marketing copy, protected UI artwork, private APIs, recommendation systems, audiobook/podcast catalogs, narration, cover art, reviews, membership pricing, credit accounting, or return/refund policy. Functional parity should use original product language, synthetic or licensed audiobook/podcast metadata, provider-approved playback, and independently designed entitlement logic.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first audiobook and podcast app with onboarding, Home, Search, catalog detail, Library, playback, chapters, bookmarks, clips, sleep timer, downloads, credits, memberships, support, privacy, and account controls.
- Support audiobook-specific workflows: samples, owned library, Plus-like included listening, credit balances, purchase/unlock, returns/exchanges, pre-orders, series, author/narrator pages, ratings/reviews, Kids Profile-like sharing, and listening progress.
- Preserve media-commerce trust expectations around catalog licensing, audiobook ownership claims, children/family sharing, payments, refunds, recommendations, account privacy, accessibility, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build an Audible- or Amazon-branded app or imply affiliation with Audible, Amazon, authors, narrators, publishers, podcast networks, device partners, or payment providers.
- Do not stream production audiobooks, podcasts, originals, sleep stories, cover art, clips, reviews, ratings, or narrator/author metadata without licensed content and provider approval.
- Do not scrape Audible, reuse private Audible/Amazon APIs, replay network traffic, copy recommendation/ranking models, copy catalog data, or bypass rights-holder restrictions.
- Do not treat membership credits, returns/exchanges, Plus Catalog access, Kids Profile, Whispersync, Kindle handoff, CarPlay, Watch, or device sync as generic features; each requires explicit provider/legal design.
- Do not claim exact App Store, Play Store, native-device, catalog, personalization, membership, credit, return, push-notification, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/audible-audiobooks-podcasts/id379693831 | Official iOS listing, developer, Books category, 13+ age rating, in-app purchases, Apple Watch/CarPlay references, Plus Catalog, Premium Plus membership, credits, cash purchases, Kids Profile, downloads/offline, Whispersync, sleep timer, and legal/privacy links | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.audible.application | Official Android listing, package id, developer, Books & Reference category, in-app purchases, install/support surface, data-safety context, and Android availability | Verified 2026-04-19 |
| Membership Plans | https://www.audible.com/ep/memberbenefits | Public plan framing for Audible membership, Premium Plus credits, Plus Catalog, discounts/deals, trials, and member benefits | Verified 2026-04-19 |
| Learn About Premium Plus | https://help.audible.com/s/article/learn-about-premium-plus | Premium Plus membership, monthly credit model, member benefits, and plan-state framing | Verified 2026-04-19 |
| Learn About Credits | https://help.audible.com/s/article/learn-about-credits | Credit balance, use, expiration/plan dependency, and credit lifecycle concepts | Verified 2026-04-19 |
| Learn About The Plus Catalog | https://help.audible.com/s/article/learn-about-the-plus-catalog | Included catalog access, add-to-library behavior, catalog changes, and access expiry concepts | Verified 2026-04-19 |
| Use Timer | https://help.audible.com/s/article/use-timer | Sleep timer behavior, player controls, and timed playback-stop workflow | Verified 2026-04-19 |
| Clips And Bookmarks | https://help.audible.com/s/article/manage-clips-bookmarks | Bookmark/clip management, listening-note behavior, and player-state implications | Verified 2026-04-19 |
| Kids Profile | https://help.audible.com/s/article/create-a-kids-profile | Kids Profile creation, child-friendly catalog sharing, family-oriented controls, and profile lifecycle | Verified 2026-04-19 |
| Return A Title | https://help.audible.com/s/article/return-a-title | Return/exchange support path, eligibility, purchase/credit recovery, and refund/abuse blockers | Verified 2026-04-19 |
| Manage Personal Data | https://help.audible.com/s/article/manage-your-personal-data | Privacy/data controls, account information, export/delete support path, and personal-data lifecycle | Verified 2026-04-19 |
| Conditions Of Use | https://www.audible.com/legal/conditions-of-use | Account, membership, content license, purchase, returns, service availability, and legal constraints | Verified 2026-04-19 |
| Amazon Privacy Notice | https://www.amazon.com/privacy | Account, usage, device, purchase, personalization, advertising, data rights, and privacy-rights modeling | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and Audible membership pages position the app as a spoken-word service for audiobooks, podcasts, originals, Plus Catalog listening, Premium Plus credits, purchases, downloads, Kids Profile, Watch/CarPlay, Whispersync-like handoff, sleep timer, bookmarks, and library management.
- V1 must model signed-out, free preview, trial, Standard-like, Premium Plus-like, Plus-catalog-only, credit-bearing, credit-exhausted, cash-purchased, refunded/returned, expired, canceled, platform-owned, kids-profile, region-blocked, and catalog-rights-blocked states.
- Home must support personalized rows, top genres, new releases, podcasts/originals, continue listening, series next-up, wishlist/resume, Plus-like included rows, fresh-account fallback, and stale/offline states.
- Search must support title, author, narrator, series, genre, podcast/show, episode, originals, keyword, ISBN-like original identifiers if licensed, empty/no-result states, safe filtering, and rights/region filtering.
- Catalog detail must support sample, add to wishlist, buy with credit, buy with cash, included-listen, pre-order, series navigation, author/narrator pages, ratings/reviews if licensed, share, gift if added, and unavailable states.
- Library must support owned titles, included Plus-like titles, podcasts, downloaded titles, archived/hidden titles, collections, sort/filter, series grouping, progress, bookmarks/clips, and title removed from catalog.
- Playback must support chapters, speed, skip forward/back, sleep timer, bookmarks, clips, notes if added, car/watch output abstraction, progress sync, completed-state marking, and rights/download errors.
- Credits must support balance, issued/used/expired/refunded states, purchase locking, credit-not-eligible title, plan cancellation consequences, and audit history.
- Plus-like included access must support add/remove from library, catalog membership changes, revoked access after cancellation, downloaded item invalidation, and clear ownership language.
- Returns/exchanges must support eligibility, abuse/fraud review, credit or cash refund, support escalation, and post-return library/progress handling.
- Kids Profile-like behavior must support parent/owner account, child profile, shared family-friendly titles, restricted discovery, downloads, listening progress, deletion/export implications, and parental controls.
- Downloads/offline must support device-bound licenses, title size, storage checks, chapter downloads, partial download recovery, revoked rights, sign-out invalidation, and periodic entitlement refresh.
- Support/privacy/settings must expose account, membership, credits, purchases, returns, notifications, downloads/storage, playback settings, kids profiles, data export, account deletion, legal links, and support paths.

### Manual Verification Required

- Native iOS and Android navigation, tab names, library sort/filter, player controls, bookmark/clip behavior, sleep timer, Kids Profile screens, return flow, and release-note behavior.
- Amazon/Audible auth, membership purchase/restore/cancel, credits, cash purchase, Plus Catalog access, returns/exchanges, downloads, Whispersync/Kindle, CarPlay/Watch, push payloads, data export/delete, and regional catalog differences.

## Core User Journeys

- New listener installs the app, signs in, reviews age/region/legal consent, starts a trial or browses samples, chooses notification preferences, and lands on Home.
- Returning member opens Home, resumes an audiobook from progress, sets a sleep timer, adds a bookmark, changes speed, and later finds the bookmark in Library.
- Listener searches by author/narrator/series, opens a title detail page, plays a sample, buys with a credit, downloads the title, and starts chapter playback offline.
- Listener adds a Plus-like included title to Library, loses membership, sees access revoked, and gets clear purchase or resubscribe recovery paths.
- Listener requests a return/exchange, sees eligibility, receives credit/cash recovery where allowed, and handles return denial through support.
- Parent creates a Kids Profile-like space, shares a family-friendly title, starts playback, prevents restricted discovery, and later deletes the child profile.
- Listener switches device context from phone to car/watch/kindle-like reading/listening, syncs progress, handles sync conflict, and recovers after offline progress.
- Privacy-focused listener exports data, deletes account data, and sees warnings for active membership, purchased library, kids profiles, bookmarks/clips, support cases, and retention.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, trial/member entry, age/region | Amazon-like auth, DOB, country, terms | new, returning, trial, member | blocked region, failed auth, account locked |
| Home | Personalized spoken-word discovery | row taps, sample, wishlist, play | loading, personalized, fresh account | stale recs, rights outage, membership expired |
| Search/Browse | Title, author, narrator, genre discovery | query, filters, genre taps | suggestions, results, no-results | region blocked, explicit hidden, typo |
| Catalog Detail | Title, podcast, author, series detail | sample, wishlist, credit, cash, download | sample, owned, included, pre-order | no credits, return blocked, title removed |
| Library | Owned/included/downloaded content | filters, sort, collection, title tap | empty, owned, included, downloaded | revoked included access, archive hidden, sync conflict |
| Collections | User organization of titles | create, rename, add/remove, reorder | empty, populated, sorted | duplicate title, title removed, deleted collection |
| Player | Audiobook playback and progress | play, speed, skip, chapter, timer | playing, paused, buffering | license error, download corrupt, chapter missing |
| Chapters | Chapter navigation and metadata | chapter tap, progress, download | loaded, current, completed | malformed chapter, unavailable chapter |
| Bookmarks/Clips | Save and manage listening moments | add, edit, delete, note | empty, saved, synced | duplicate, sync conflict, title returned |
| Downloads/Storage | Offline title management | download, delete, quality/storage | downloading, downloaded, offline | disk full, partial fail, rights revoked |
| Credits/Purchases | Credit balance and purchase lifecycle | credit, cash, pre-order, receipt | available, used, exhausted | credit expired, purchase failed, refund pending |
| Returns/Support | Return/exchange and help | return, reason, case, contact | eligible, pending, resolved | ineligible, abuse hold, support unavailable |
| Kids Profile | Child-friendly shared library | create, share, remove, play | parent, child, shared | restricted title, profile deletion, age gate |
| Subscription | Membership plans and billing | plan select, restore, cancel | trial, paid, canceled | platform mismatch, renewal delay, refund |
| Settings/Privacy | Account, playback, privacy, legal | toggles, export, delete, contact | loaded, pending export, deleting | active purchase retention, deletion blocker |

## Data Model

- `User`: account identity, age band, country/region, auth providers, consent, membership role, privacy choices, export/deletion state, and restrictions.
- `DeviceSession`: device id, platform, app version, playback capability, car/watch/kindle-like sync capability, notification token, download entitlement, and session expiry.
- `Membership`: trial, Standard-like, Premium Plus-like, platform owner, renewal/cancel/refund state, credit issuance, Plus access, and feature gates.
- `CreditLedger`: credit id, issue date, expiration, source plan, used title, return/refund reversal, fraud hold, and audit metadata.
- `CatalogTitle`: audiobook/podcast/original metadata, author/narrator/series links, duration, chapter list, rating/review summary if licensed, rights, region, explicit, availability, and display metadata.
- `OwnedEntitlement`: user/title relationship, purchase method, credit/cash/included/pre-order state, return status, revoked state, and access expiry.
- `PlaybackSession`: current title, chapter, position, speed, sleep timer, output device, download state, sync cursor, and completion status.
- `BookmarkClip`: title id, chapter, timestamp range, note, created device, sync state, deleted state, and export/deletion behavior.
- `DownloadAsset`: title/chapter reference, device, quality, bytes, entitlement, expiration/check-in, corrupt-cache marker, and retry count.
- `Collection`: owner, title, description, item order, visibility, duplicate metadata, and version.
- `KidsProfile`: parent account, child display name, shared titles, restrictions, progress, downloads, deletion/export state, and audit events.
- `ReviewRating`: title id, user id, rating, review text if supported, moderation state, report state, and edit history.
- `PrivacyRequest`: export, deletion, correction, portability, membership data, purchase data, status, delivery method, and retention/legal-hold notes.
- `AuditEvent`: append-only auth, membership, credit, purchase, return, playback, download, kids profile, privacy, support, and moderation-sensitive changes.
- `LocalCacheRecord`: cached home/library/detail/settings, downloads, bookmarks, offline progress, queued writes, stale timestamps, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with age, region, locked-account, and device state.
- `GET /home`, `GET /browse`, `GET /recommendations`: discovery surfaces with cache hints, membership context, series next-up, and fallback slots.
- `GET /search?q=&type=&cursor=&explicit=&region=`: multi-type search for titles, authors, narrators, series, podcasts, episodes, and genres with rights filtering.
- `GET /catalog/:type/:id`: canonical detail endpoint returning availability, rights, sample, purchase actions, credit eligibility, return status, and stale-data indicators.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `GET /playback/sessions/:id`: playback lifecycle with idempotent commands, chapter, position, speed, timer, and sync cursor.
- `GET /library`, `POST /library/items`, `PATCH /library/items/:id`, `DELETE /library/items/:id`: owned, included, wishlist, archived, downloaded, collection, progress, and sort/filter state.
- `POST /credits/redeem`, `GET /credits`, `POST /purchases`, `POST /preorders`, `POST /returns`: credit/cash purchase, pre-order, return/exchange, refund, and eligibility workflows.
- `POST /bookmarks`, `PATCH /bookmarks/:id`, `DELETE /bookmarks/:id`, `GET /bookmarks`: bookmark/clip lifecycle with timestamp, note, sync, and title-return handling.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: title/chapter downloads, storage checks, rights refresh, partial retry, and corrupt-cache recovery.
- `POST /collections`, `PATCH /collections/:id`, `POST /collections/:id/items`, `DELETE /collections/:id/items/:itemId`: collection lifecycle, duplicate warnings, and deleted-title handling.
- `GET /kids-profiles`, `POST /kids-profiles`, `PATCH /kids-profiles/:id`, `DELETE /kids-profiles/:id`, `POST /kids-profiles/:id/share`: child profile creation, sharing, restrictions, and deletion.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: membership lifecycle, platform ownership, restores, refunds, and delayed state.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, account deletion, purchase/library warnings, and retention state.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: title, review, purchase, return, billing, account, and support workflows.

## Realtime, Push, And Offline Behavior

- Playback progress, library ownership, credit balance, purchase/return state, Plus-like catalog changes, downloads, kids profile changes, subscription changes, support updates, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Home, Browse, search suggestions, catalog detail, Library, collections, bookmarks, downloads, settings, entitlement summary, and support status with stale labels.
- Offline mode may play valid downloaded titles, preserve chapter/progress/bookmark state, and queue low-risk bookmark/progress writes for sync.
- Offline mode must block new purchases, credit redemption, returns/exchanges, membership changes, account deletion, kids-profile edits, support evidence upload, and irreversible library removal.
- Downloads must be device-bound, chapter-aware, storage-aware, resumable, and invalidated on sign-out, refunded/returned title, revoked entitlement, region loss, deleted catalog item, or expired provider rights.
- Progress sync must tolerate app backgrounding, Kindle-like handoff, multiple devices, clock skew, offline bookmark edits, title return, and chapter-list changes.
- Push notifications must be opt-in and category-controlled for pre-orders, new episodes/releases, credit/member alerts, return/support updates, kids-profile activity, privacy export, and account security.
- Push payloads must minimize sensitive content; defaults should avoid exact listening history, child profile names, purchase amounts, payment state, and support evidence.

## Permissions, Privacy, And Safety

- Notifications, local files if imported, Bluetooth/car/watch output, local network/cast if added, contacts/gifting if added, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact listening history, title names in sensitive contexts, child profile details, purchase/payment details, device names, IP-level location, and support evidence.
- Audiobook catalog, podcast/original catalog, chapter metadata, cover art, narrator/author metadata, reviews, and clips are licensed-content launch blockers with legal/catalog/provider owners.
- Copyright, trademark, rightsholder takedown, royalty reporting, review moderation, refund/return fraud, child profile safety, and author/narrator impersonation require launch-blocking review.
- Kids Profile-like features require parent-owned controls, child privacy minimization, restricted discovery, clear sharing rules, and deletion/export behavior.
- Recommendations must avoid sensitive inference leakage, support privacy-safe explanations, respect personalization controls, and provide fallback content when disabled.
- Account deletion/export must warn about active membership, credit balances, purchased titles, returns, kids profiles, bookmarks/clips, support cases, and legal/rights retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, accessible chapter/bookmark controls, sleep timer alternatives, and nonvisual playback controls.
- Launch owners: catalog/legal owner for spoken-word media; privacy owner for data rights; trust/safety owner for reviews and child profile safety; billing owner for membership, credits, purchases, and returns; accessibility owner for player/library UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, home section viewed, title opened, sample started, playback started/completed/failed, chapter changed, bookmark created, sleep timer set, download completed, credit redeemed, purchase completed, return requested, kids profile created, entitlement changed, report submitted, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, region bucket, error code, latency bucket, and provider status rather than raw titles, search text, exact listening history, child identifiers, credit card data, or support evidence.
- Recommendation analytics must separate seed type, slot type, explanation key, impression, skip, wishlist, sample, purchase, and report actions without exposing private user content.
- Playback analytics must support royalty/provider accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Monetization may include original trials, membership plans, credit bundles, cash purchases, Plus-like catalog access, family/kids sharing, and provider-approved discounts after legal review.
- Any paid plan, credit bundle, purchase, return, gift, or discount must disclose price, renewal/cancellation, refund/support path, platform ownership, expiration, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, underage account, expired session, account locked, passwordless login failure, or social/platform auth revoked.
- Search result exists but is not playable because of region, explicit filter, removed rights, expired license, unavailable plan, hidden title, or malformed catalog metadata.
- Credit balance changes on another device, title becomes Plus-ineligible after being added, return is requested after partial listening, or purchase webhook arrives late.
- Chapter list changes, progress sync conflicts between devices, sleep timer fires during buffering, bookmark is created while offline, or title is returned after bookmark creation.
- Download exceeds storage, chapter download fails, app cache is cleared, rights expire, title is returned, or user signs out while offline.
- Kids Profile shared title is removed, parent account loses membership, child profile is deleted with offline progress, or restricted content appears in search.
- Pre-order release is delayed, title is removed after pre-order, author/narrator metadata changes, reviews are moderated, or support case blocks a return.
- Privacy export email fails, account deletion requested with active membership/purchases/kids profiles/credits, or legal retention prevents full deletion.

## Test Plan

- Unit tests for entitlement gating, credit ledger, purchase/return state, playback state machine, chapter/bookmark/sleep timer behavior, download validation, kids profile restrictions, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, cursor reconciliation, idempotency keys, error codes, rights states, credit states, return states, and webhook duplicates.
- Integration tests for auth, Home, Browse, search, title detail, sample, purchase, credit redeem, playback start/stop, bookmark/clip, collection edit, download, kids profile, return request, and settings.
- Playback tests for buffering, chapter navigation, speed changes, sleep timer, bookmark creation, offline progress, device handoff, rights failure, and local cache stale state.
- Offline tests for valid downloads, missing downloads, corrupt cache, disk full, returned title, revoked Plus access, sign-out invalidation, queued progress/bookmarks, and reconnect reconciliation.
- Billing tests for trial, membership, credit issue/use/expiry, cash purchase, pre-order, return/exchange, refund, cancellation, renewal, expired plan, and platform-owned subscription.
- Kids/accessibility tests for profile creation, title sharing, restricted discovery, deletion/export behavior, dynamic type, screen reader labels, focus order, chapter controls, and media controls.
- Privacy tests for data export, account deletion, deletion blockers, support evidence redaction, purchase retention, kids profile minimization, and analytics minimization.
- Manual verification tests: native iOS/Android screenshots, membership purchase/restore/cancel, credits, cash purchases, returns/exchanges, Plus Catalog, Kids Profile, Whispersync, CarPlay/Watch, sleep timer, bookmarks/clips, downloads, push payloads, export/delete, and regional catalog behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Audible/Amazon assets, network traffic, private APIs, recommendation systems, catalog data, reviews, credit accounting, or brand copy.
- New and returning users can discover, search, sample, buy/unlock, play, bookmark, download, organize, share, and recover spoken-word content using original licensed or synthetic data.
- Audiobook, podcast, title detail, library, chapter, bookmark, download, credit, purchase, return, kids profile, subscription, privacy, and support workflows have deterministic data models and API contracts.
- Trial, membership, credit-bearing, credit-exhausted, cash-purchased, Plus-like, returned/refunded, canceled, expired, kids-profile, and unavailable entitlement states are covered by tests.
- Offline playback, downloads, device handoff, credits, returns, kids profiles, recommendations, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Licensed-media, child/family controls, payment/return, copyright, review moderation, privacy, and platform-device constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which licensed audiobook catalog provider, podcast/original provider, review provider, payment provider, credit ledger, and return/refund provider will back the original clone?
- Which features are V1 versus later: credits, cash purchases, returns/exchanges, Plus-like catalog, Kids Profile, Whispersync-like handoff, Watch/CarPlay, reviews, or pre-orders?
- Will V1 support a demo synthetic catalog, internal test purchases, or a licensed spoken-word beta first?
- Which payment platforms own memberships and restores: app stores, web checkout, both, or a provider-managed subscription service?
- What privacy posture should listening history use by default, and how should kids profiles affect recommendations and analytics?
- Which regions, languages, explicit-content rules, publisher rights, credit expirations, and return policies are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, Browse, Search, catalog detail, Library, Player, chapters, synthetic catalog seed data, and privacy-safe analytics.
- Phase 2: add wishlist, collections, bookmarks/clips, sleep timer, progress sync, title samples, support/settings, and account privacy controls.
- Phase 3: add licensed playback provider abstraction, chapter/download asset model, device handoff abstraction, queue/progress reconciliation, and provider error handling.
- Phase 4: add downloads/offline mode, storage management, entitlement-aware rights refresh, corrupt-cache recovery, and offline regression tests.
- Phase 5: add memberships, checkout/restore/webhooks, credit ledger, purchase/pre-order, return/exchange workflow, refund states, and billing regression tests.
- Phase 6: add Plus-like catalog expiry, Kids Profile-like sharing, push notifications, reviews/ratings if licensed, accessibility pass, and manual native verification.
- Phase 7: complete legal/provider launch review for licensed catalog, credits, returns, kids profiles, recommendations, data deletion/export, regional availability, and platform APIs.

## Next Steps

- Resolve Audible manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 audio implementation-readiness upgrades with `071-pocket-casts.md`.
