# Letterboxd-Style Clone Spec

> Metadata
> - Inspiration app: Letterboxd
> - Category: film diary, reviews, ratings, watchlist, lists, activity feed, social discovery, film metadata, subscriptions, ads, and curated video rentals
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Letterboxd FAQ, Pro/Patron product pages, privacy notice, terms of use, film-data documentation, and public app descriptions.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, film logging, review drafts, ratings, comments, lists, watchlist, blocking, activity filters, Pro/Patron purchase/restore/cancel, Patron custom posters/backdrops, ads, streaming-service filters, JustWatch-powered availability, Video Store rentals, notifications, imports/exports, account deactivation, support contacts, Apple TV behavior, and regional catalog/rental availability still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, posters, backdrops, film metadata, trailers, reviews, lists, user profiles, rating distributions, rental catalog, ads, payment integrations, and third-party availability data.

## Overview

Build an original mobile social film app inspired by Letterboxd's public workflow: account entry, film discovery, film detail, watched marking, diary logging, ratings, reviews, spoiler tagging, tags, watchlist, lists, activity feed, comments, member profiles, follows/blocks, Pro/Patron-style upgrades, streaming-service filters, curated rental storefront, privacy controls, data export, and account deactivation.

The clone must not copy Letterboxd branding, screenshots, marketing copy, protected UI artwork, private APIs, posters, backdrops, film metadata, reviews, ratings, lists, member profiles, Video Store catalog, JustWatch data, ad placements, or subscription perks implementation. Functional parity should use original product language, licensed film metadata/artwork, synthetic user content, provider-approved availability/rental integrations, and independently designed social-ranking rules.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first film social app with onboarding, discovery, search, film detail, diary logging, ratings, reviews, watchlist, lists, profiles, activity feed, comments, settings, support, privacy, and account controls.
- Support film-community workflows: watched marking, diary date, rating, review, spoiler flag, tags, list creation/editing, follow/block, comments, profile stats, imports/exports, and paid subscription perks.
- Preserve entertainment/social trust expectations around user-generated reviews, spoilers, harassment, privacy, ads, film-data licensing, streaming availability, rental rights, subscriptions, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Letterboxd-branded app or imply affiliation with Letterboxd, film studios, TMDb, JustWatch, rental providers, critics, reviewers, or app-store/payment providers.
- Do not copy posters, backdrops, synopses, cast/crew data, reviews, ratings, list content, diary entries, Video Store catalog, streaming availability data, or user profiles without licensed data and permissions.
- Do not scrape Letterboxd, reuse private Letterboxd APIs, replay network traffic, copy community ranking/sorting logic, copy subscription perk implementation, or bypass ads/subscription/rental restrictions.
- Do not treat film metadata, streaming availability, custom artwork, rentals, imports, exports, ads, or moderation as generic features; each needs explicit data/provider/legal design.
- Do not claim exact App Store, Play Store, native-device, social graph, review/comment, subscription, ad, rental, notification, export/import, account-deactivation, Apple TV, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/letterboxd/id1054271011 | Official iOS listing, developer, Social Networking category, 16+ age rating, in-app purchases, sign-in/create account, film browse, logging, reviews, lists, activity, profiles, follows, search, Pro/Patron perks, Video Store rentals, privacy labels, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.letterboxd.letterboxd | Official Android listing, package id, ads/in-app purchases, 5M+ downloads, browse/log/review/comment/list/follow/block/activity/profile/search features, data safety, support email, and release context | Verified 2026-04-19 |
| FAQ | https://letterboxd.com/about/faq/ | Product definition, account requirements, free vs paid use, watched vs logged differences, diary behavior, watchlist, lists, Pro benefits, account closure, imports/exports, and Video Store note | Verified 2026-04-19 |
| Pro/Patron | https://letterboxd.com/pro/ | Paid tier positioning, ad-free experience, stats, service filters, list cloning, watchlist notifications, Patron customization, and subscription benefits | Verified 2026-04-19 |
| Film Data | https://letterboxd.com/about/film-data/ | Film data sourcing/orientation, metadata limitations, correction pathways, and third-party data dependency risk | Verified 2026-04-19 |
| Privacy Notice | https://letterboxd.com/legal/privacy-notice/ | Account/profile data, user content, analytics, ads, third-party services, cookies, marketing, privacy rights, retention, and deletion/export considerations | Verified 2026-04-19 |
| Terms Of Use | https://letterboxd.com/legal/terms-of-use/ | Account, member content, prohibited conduct, intellectual property, subscriptions, Video Store/rental terms, third-party services, and termination constraints | Verified 2026-04-19 |
| Community Policy | https://letterboxd.com/legal/community-policy/ | Community expectations, prohibited content, review/comment/list behavior, harassment/spam/abuse, and moderation orientation | Verified 2026-04-19 |
| Video Store | https://videostore.letterboxd.com | Public curated rental storefront entry point, rental/product direction, provider/legal review needs, and regional availability risk | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and FAQ position Letterboxd as a social network for film lovers with browse, film detail, watched marking, diary logging, reviews, ratings, tags, watchlist, lists, activity feed, comments, profiles, follows/blocks, Pro/Patron upgrades, stats, service filters, and rentals.
- V1 must model signed-out browse, free member, Pro-like member, Patron-like member, lapsed subscription, private profile/content, blocked user, Close Friends/private entry, ad-supported, rental-enabled, rental-region-blocked, and data-import/export states.
- Discovery must support popular, highly rated, anticipated, top lists, genres, activity-driven recommendations, streaming-service filters for paid members, empty states, stale provider data, and ad/promo slots for free members.
- Film detail must support title metadata, poster/backdrop, cast/crew, studios/genres, trailers where licensed, ratings distribution, watched/rated/liked/watchlist states, popular reviews, popular lists, availability/rental links, and missing/incorrect data states.
- Logging must support watched-only state, diary entry, watched date, rewatch flag, rating, like, review, spoiler flag, tags, privacy mode, draft/private/Close Friends modes where implemented, edit/delete, and offline draft protection.
- Reviews/comments must support publish, edit, delete, spoiler lock, likes, comments, reports, moderation state, blocked-user filtering, and profile/list/film cross-links.
- Lists must support create/edit/delete, title/description, public/private, ranked/unranked, ordered films, comments, likes, cloning as a paid perk, and unavailable film-data handling.
- Profiles must support favorite films, diary, films, reviews, lists, tags, stats, follows/followers, blocks, profile settings, paid badges/perks, custom posters/backdrops for Patron-like users, and export/deactivation paths.
- Pro/Patron-style subscriptions must support app-store and web ownership, annual renewal, ad removal, stats, advanced filters, streaming-service selections, watchlist notifications, list cloning, custom posters/backdrops, early-access flags, cancellation, and restore.
- Video Store-like rentals must be treated as licensed VOD: territory, price, rental window, playback provider, refund/support owner, content rights, and age/rating restrictions are launch blockers.
- Support/privacy/settings must expose account, profile, privacy modes, email/preferences, subscription, imports/exports, ads, blocked users, data rights, account deactivation, legal links, and support contacts.

### Manual Verification Required

- Native iOS and Android navigation, log/review composer, draft behavior, privacy controls, activity filters, list editor, Pro/Patron purchase/restore/cancel, custom artwork, ads, notifications, and release-note behavior.
- Signup/login, follow/block, comments/reports, imports/exports, account deactivation, Video Store rentals/playback/refunds, JustWatch-powered availability, Apple TV behavior, support contacts, and regional catalog/rental differences.

## Core User Journeys

- New member installs the app, creates an account, accepts terms/privacy, follows initial members or films, and lands on film discovery with original onboarding copy.
- Signed-out visitor browses films and reviews, tries to log a film, sees an account gate, creates an account, and returns to the target film.
- Member searches for a film, opens detail, marks watched, rates it, adds it to watchlist, logs a diary entry with date/tags/spoiler review, and publishes.
- Reviewer edits a review, marks spoiler, receives comments/likes, reports abusive replies, and blocks a user from interacting.
- List maker creates a ranked list, adds/removes films, changes privacy, receives comments, clones another list if subscribed, and handles removed film metadata.
- Film fan opens activity feed, filters friends' reviews, follows a member, sees blocked/muted states, and navigates to that member's diary/stats.
- Paid member selects streaming services, filters watchlist by availability, views annual/all-time stats, removes ads, and cancels/restores subscription.
- Renter opens Video Store-like surface, rents an eligible title, plays within rental window, handles provider outage, and routes refund/support to the correct owner.
- Privacy-focused member exports account data, imports external watched history, deactivates account, and sees retention/content consequences.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry and signed-out browse | email, username, password, legal | signed-out, new, returning | auth fail, username taken, deactivated |
| Discovery/Home | Popular films, activity, lists, rentals, ads | film, list, filter, service | loading, personalized, signed-out | stale data, ad fail, no service data |
| Search | Films, cast/crew, reviews, lists, members | query, filters | suggestions, results, no-results | typo, hidden member, missing metadata |
| Film Detail | Metadata, actions, reviews, lists, rentals | watched, rate, log, watchlist | available, watched, rated | missing poster, wrong data, rental blocked |
| Log/Review Composer | Diary, rating, spoiler, tags, privacy | date, rating, review, tags | draft, public, private, close friends | crash recovery, moderation warning, duplicate |
| Activity Feed | Followed member activity | filter, like, comment | empty, filtered, fresh | blocked user, Pro filter gate, stale feed |
| Reviews/Comments | Read, like, comment, report | like, reply, report | open, spoiler hidden, locked | abuse, report pending, deleted review |
| Lists | Create and browse film lists | title, films, rank, privacy | draft, published, private | duplicate film, clone gated, missing data |
| Profile | Member identity, diary, films, stats | follow, block, tab, edit | owner, viewer, Pro, Patron | blocked, private, deactivated |
| Watchlist/Availability | Saved films and service filters | add, remove, service filter | empty, saved, filtered | stale provider, unavailable region |
| Subscription | Pro/Patron perks and billing | upgrade, restore, cancel | free, active, lapsed | platform mismatch, webhook delay |
| Video Store/Rental | Curated rentals and playback | rent, play, support | available, rented, expired | territory blocked, provider outage, refund |
| Settings/Privacy/Support | Account, privacy, export, deactivation | toggles, export, import, delete | loaded, exporting, deactivated | retention, support unavailable |

## Data Model

- `User`: account identity, username, email, profile metadata, privacy defaults, notification preferences, subscription state, blocked users, export/import/deactivation lifecycle, and restrictions.
- `Film`: licensed metadata id, title, year, poster/backdrop license, synopsis, runtime, countries, languages, genres, studios, cast/crew references, trailers, rating summary, and correction status.
- `PersonCredit`: person, film, role type, character/job, order, source, and missing/disputed metadata state.
- `WatchedState`: user, film, watched flag, first watched timestamp, rewatch count, hidden/private state, and source import.
- `DiaryEntry`: user, film, watched date, rewatch flag, rating, like, review reference, tags, privacy mode, draft state, and edit history.
- `Review`: author, film, headline/body, spoiler flag, likes, comments, moderation state, visibility, reports, and deletion/export state.
- `Comment`: parent review/list, author, body, moderation state, report state, blocked-user state, and deletion/export metadata.
- `List`: owner, title, description, ordered films, ranked flag, privacy, clone source, comments, likes, tags, and unavailable-film handling.
- `Follow`: follower, followed user, close-friends flag if implemented, notification preference, blocked state, and activity visibility.
- `Subscription`: plan type, platform owner, renewal/cancel/refund state, perks, service filters, stats access, custom artwork access, and entitlement expiry.
- `StreamingServicePreference`: user, provider, region, service id, selected flag, last availability sync, and provider staleness.
- `Rental`: user, film, provider, territory, price, rental window, playback state, refund/support owner, and rights state.
- `ImportJob`: source, uploaded file, mapping status, conflicts, preview rows, completed rows, and rollback/export references.
- `PrivacyRequest`: export, deactivation, deletion/correction request, status, delivery method, identity verification, and retention notes.
- `Report`: content/user/category, reporter, evidence metadata, moderation queue, action state, appeal/support status, and audit references.
- `AuditEvent`: append-only auth, log/review/list, subscription, rental, import/export, privacy, moderation, support, and account-sensitive transitions.
- `LocalCacheRecord`: cached film/search/profile/activity/list/settings, composer draft, offline queue, stale timestamps, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with deactivation, region, and device state.
- `GET /home`, `GET /films/popular`, `GET /films/top`, `GET /activity`: discovery and activity surfaces with cache hints, ad/perk state, and fallback slots.
- `GET /search?q=&type=&cursor=`: film/person/review/list/member search with hidden/deactivated/member-block filters and stale metadata indicators.
- `GET /films/:id`, `GET /films/:id/reviews`, `GET /films/:id/lists`: film detail with metadata, actions, ratings, reviews, lists, rentals, and correction state.
- `POST /films/:id/watched`, `DELETE /films/:id/watched`, `POST /watchlist/items`, `DELETE /watchlist/items/:id`: watched and watchlist lifecycle with duplicate/import handling.
- `POST /diary`, `PATCH /diary/:id`, `DELETE /diary/:id`: diary/log lifecycle with rating, review, spoiler, tags, privacy, draft, and edit history.
- `POST /reviews/:id/comments`, `PATCH /reviews/:id`, `DELETE /reviews/:id`, `POST /reviews/:id/like`: review and comment interactions with moderation and spoiler states.
- `POST /lists`, `PATCH /lists/:id`, `POST /lists/:id/items`, `DELETE /lists/:id/items/:itemId`, `POST /lists/:id/clone`: list lifecycle, privacy, ranking, duplicates, and paid clone gate.
- `POST /follows`, `DELETE /follows/:id`, `POST /blocks`, `DELETE /blocks/:id`: social graph, block state, activity visibility, and notification effects.
- `GET /stats`, `GET /availability`, `PATCH /service-preferences`: paid stats, service filters, watchlist availability, provider staleness, and region state.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /subscription/cancel`: Pro/Patron lifecycle, platform ownership, restores, refunds, and delayed state.
- `GET /rentals`, `POST /rentals/checkout`, `POST /rentals/:id/playback`, `POST /rentals/:id/support`: Video Store-like rental lifecycle, playback windows, provider errors, and support owner.
- `POST /imports`, `GET /imports/:id`, `POST /data-export`, `DELETE /account`: import/export/deactivation with conflict preview, retention, and warning states.
- `POST /reports`, `GET /reports/:id`, `POST /support/cases`, `GET /support/cases/:id`: review, comment, list, profile, film data, rental, subscription, and support workflows.

## Realtime, Push, And Offline Behavior

- Activity feed, comments, likes, list updates, subscription changes, rental windows, import/export status, support updates, and moderation actions must reconcile from server-owned events.
- Clients may cache film details, search suggestions, profile summaries, watchlist, lists, activity, subscription state, service preferences, settings, and support status with freshness labels.
- Offline mode may show cached films/profiles/lists/watchlist and preserve composer drafts; low-risk logs/list edits may queue only when conflict-safe.
- Offline mode must block public review/comment publish, follows/blocks, subscription purchase/cancel, rentals/playback, imports, exports, deactivation, reports, and irreversible privacy actions.
- Composer drafts must be durable across app backgrounding, crashes, auth refresh, film metadata reload, and network changes.
- Provider availability and rentals must expose stale, unknown, unavailable, rented, expired, refunded, and territory-blocked states with recovery actions.
- Push notifications must be opt-in and category-controlled for comments, likes, follows, watchlist availability, subscription billing, rentals, import/export completion, support cases, and account security.
- Push payloads must minimize sensitive content; defaults should avoid private diary entries, review drafts, private lists, rental history, email/import data, and support evidence.

## Permissions, Privacy, And Safety

- Notifications, photos/files/import, local network/TV, contacts, and location must be requested only when the related feature is invoked.
- Default analytics must exclude raw review/comment/list text, private diary entries, exact watch history, import file contents, payment details, rental history, support evidence, and private profile data.
- Film metadata, posters, backdrops, trailers, cast/crew, availability data, rental catalog, reviews, lists, and user profile content are launch blockers with legal/data/provider owners.
- User-generated reviews, comments, lists, tags, profile text, and imported data require reporting, moderation, spam prevention, harassment controls, spoiler handling, appeals, and privacy redaction.
- Spoiler controls must support author flags, moderator locks, hidden previews, comments context, search/list snippets, and regression tests for spoiler leakage.
- Subscription/rental flows must honor platform ownership, renewal/cancellation, refunds, taxes, regional content availability, support owner, and payment data minimization.
- Ads must honor subscription entitlement, privacy choices, age restrictions, sensitive categories, frequency caps, regional ad rules, and measurement minimization.
- Recommendations and activity feeds must avoid sensitive inference leakage, respect private entries/lists, close-friends/private modes, blocks, deactivated users, and disabled personalization.
- Account deactivation/export must warn about reviews, comments, lists, diary entries, rentals, subscriptions, import history, support cases, and legal/provider retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, spoiler-safe labels, accessible rating controls, and nonvisual alternatives for poster-heavy grids.
- Launch owners: data/legal owner for film metadata/artwork/rentals; privacy owner for diary/import/export; trust/safety owner for reviews/comments/spoilers/harassment; billing owner for subscriptions/rentals; accessibility owner for film/detail/composer UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, search performed, film opened, watched marked, diary saved, review published, list created, watchlist changed, follow/block changed, comment submitted, subscription changed, service filter used, rental started, import completed, data export requested, and account deactivation requested.
- Every event must use object type, surface, feature flag, entitlement state, privacy mode bucket, region bucket, error code, latency bucket, and provider status rather than raw review text, list titles, private diary dates, exact watch history, or import data.
- Activity analytics must separate feed type, entry type, privacy mode, impression, click, like, comment, follow, block, and report signals without exposing private user content.
- Subscription analytics must capture paywall view, purchase, restore, cancel, lapse, perk used, platform owner, and webhook delay without exposing payment details.
- Rental analytics must capture title id, territory bucket, provider status, checkout, playback start/fail, rental expiry, support/refund, and rights errors without exposing sensitive payment data.
- Monetization may include original ads, Pro-like subscription, Patron-like subscription, rentals, affiliate availability links, promoted lists, or data-provider partnerships after legal/provider review.
- Any paid plan, rental, ad product, affiliate link, or provider integration must disclose price, renewal/cancellation, refund/support path, platform ownership, data sharing, and regional availability before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, signed-out member tries to log, deactivated account signs in, username conflict, or auth revoked.
- Film metadata is missing, duplicate film records exist, poster/backdrop is unlicensed, cast/crew is disputed, trailer is removed, or availability provider is stale.
- User marks watched but has existing diary entries, removes watched state with rating/review still present, logs a rewatch with private mode, or imports duplicate history.
- Review draft is lost risk, app backgrounds mid-review, spoiler flag changes after comments, moderator locks spoilers, or abusive comments arrive after block.
- List contains duplicate or deleted films, list clone is gated, private list is shared by URL, collaborator-like future feature creates conflict, or sorted filters hide expected films.
- Pro/Patron purchase succeeds but entitlement webhook delays, platform restore fails, Patron artwork is unavailable, ad removal state is stale, or subscription lapses mid-session.
- Rental is territory-blocked, provider outage occurs after checkout, rental window expires during playback, refund owner is unclear, or age/rating restriction blocks playback.
- Data export is requested during import, deactivation happens with active subscription/rental, private diary entries remain in backups, or support case retention conflicts with deletion.

## Test Plan

- Unit tests for film action state, watched/logged distinction, diary privacy modes, spoiler flags, review/comment moderation, list ordering, subscription gates, rental windows, import mapping, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, idempotency keys, validation errors, privacy filters, block effects, subscription states, rental states, import/export states, and deletion/deactivation states.
- Integration tests for auth, signed-out browse, discovery, search, film detail, watched, watchlist, diary log, review, comments, lists, profile, activity, follows/blocks, settings, support, data export, import, and deactivation.
- Composer tests for drafts, backgrounding, crash recovery, duplicate entries, tags, spoiler flag, rating/like, privacy mode, edit/delete, and offline recovery.
- Social/safety tests for comments, likes, follows, blocks, reports, moderation actions, spoiler lock, spam, harassment, private profile/list visibility, and deactivated user filtering.
- Subscription tests for Pro/Patron purchase, restore, cancel, lapsed state, ad removal, service filters, stats, list cloning, custom artwork gates, platform mismatch, and webhook delay.
- Rental tests for catalog availability, checkout, playback, expiry, region block, refund/support, provider outage, and age/rating restrictions.
- Offline tests for cached films/lists/profiles, draft preservation, queued low-risk logs, blocked public/payment/privacy writes, stale provider labels, and reconnect reconciliation.
- Privacy tests for private entries, Close Friends/private modes where implemented, imports, exports, deactivation, support redaction, analytics minimization, and retention caveats.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, poster grid alternatives, rating controls, spoiler warnings, composer errors, and profile/list navigation.
- Manual verification tests: native iOS/Android screenshots, auth, logging/reviews, drafts, comments, lists, follows/blocks, subscriptions, ads, custom artwork, availability filters, rentals, notifications, import/export, deactivation, Apple TV, and regional behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Letterboxd assets, network traffic, private APIs, poster/backdrop data, film metadata, reviews, lists, ratings, ad infrastructure, subscription implementation, rental catalog, or brand copy.
- New and returning users can browse, search, mark watched, log diary entries, rate, review, watchlist, list, follow, comment, subscribe, and recover film-social content using original licensed or synthetic data.
- User, film, watched, diary, review, comment, list, profile, follow, subscription, rental, import/export, privacy, support, and deactivation workflows have deterministic data models and API contracts.
- Signed-out, free, Pro-like, Patron-like, lapsed, private, blocked, ad-supported, rental-enabled, rental-blocked, import/export, and deactivated states are covered by tests.
- Logging, reviews, comments, lists, follows/blocks, subscriptions, custom artwork, ads, availability, rentals, imports/exports, notifications, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Film-data licensing, user-generated content, spoilers, harassment, ads/privacy, billing/rentals, accessibility, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which film metadata, poster/backdrop, trailer, cast/crew, availability, rental, ad, analytics, moderation, and notification providers will back the original clone?
- Which features are V1 versus later: activity feed, comments, Pro stats, streaming filters, list cloning, Patron custom artwork, imports, rentals, Apple TV, or Close Friends/private diary?
- Will V1 support a free ad-funded tier, paid subscriptions, rentals, or begin with synthetic film data and internal test accounts?
- Which payment platforms own Pro/Patron subscriptions, rentals, refunds, taxes, and restore flows?
- Which regions, languages, content-rating systems, rental territories, privacy modes, spoiler rules, and accessibility requirements are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, discovery, search, film detail, watched/watchlist actions, profile, synthetic film/user seed data, settings, and privacy-safe analytics.
- Phase 2: add diary logging, rating/review composer, tags, spoiler flag, draft recovery, edit/delete, comments, reports, and composer/safety regression tests.
- Phase 3: add lists, activity feed, follows/blocks, private profile/list visibility, moderation actions, and social regression tests.
- Phase 4: add film metadata provider abstraction, posters/backdrops licensing checks, availability filters, service preferences, import/export, and data-quality tests.
- Phase 5: add Pro/Patron entitlements, checkout/restore/webhooks, stats, service filters, list cloning, custom artwork gates, ads, and subscription/ad regression tests.
- Phase 6: add Video Store-like rentals, rental checkout/playback provider abstraction, expiry/refund/support, and rental regression tests.
- Phase 7: add push notifications, support cases, account deactivation, Apple TV review, accessibility pass, and manual native verification.
- Phase 8: complete legal/provider launch review for film metadata, artwork, reviews/lists, rentals, ads, subscriptions, data rights, regional availability, and platform APIs.

## Next Steps

- Resolve Letterboxd manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 video/entertainment implementation-readiness upgrades with `076-imdb.md`.
