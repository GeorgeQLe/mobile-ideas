# Netflix-Style Clone Spec

> Metadata
> - Inspiration app: Netflix
> - Category: subscription streaming video, profiles, licensed catalog, downloads, recommendations, ads, games-adjacent entertainment, and parental controls
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, Netflix Help Center articles, Netflix legal/privacy pages, plan/pricing documentation, profile/download/parental-control guidance, and public data-rights documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, plan purchase/restore/cancel, household and extra-member enforcement, ad-supported playback, catalog availability, playback quality, downloads/offline expiry, Smart Downloads, Kids profile behavior, maturity locks, profile transfer, push payloads, account deletion, data export, support flows, games surfaces, TV/cast/device behavior, and regional content differences still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, artwork, trailers, licensed video catalog, recommendation models, DRM, ad technology, payment integrations, device integrations, games, and support scripts.

## Overview

Build an original mobile streaming-video app inspired by Netflix's public workflow: account entry, membership plans, profile selection, Home recommendations, search, title detail, playback, My List, downloads, offline playback, Kids experience, maturity controls, household/extra-member rules, ads where applicable, support, privacy controls, data export, and account deletion.

The clone must not copy Netflix branding, screenshots, marketing copy, protected UI artwork, private APIs, ranking systems, licensed films or shows, trailers, subtitles, audio descriptions, maturity-rating artwork, games, DRM implementation, or ad targeting logic. Functional parity should use original product language, synthetic or licensed catalog metadata, provider-approved playback, independent recommendations, and separately reviewed billing and rights workflows.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and rights/provider constraints.

## Goals

- Provide a mobile-first subscription streaming app with onboarding, profile management, Home, search, title detail, playback, My List, downloads, Kids experience, parental controls, membership settings, support, privacy, and account controls.
- Model licensed-video realities: rights windows, regional availability, maturity ratings, subtitles, audio descriptions, DRM, download eligibility, concurrent-device limits, ad-supported restrictions, and cancellation effects.
- Preserve entertainment-category trust expectations around minors, ads, recommendations, viewing history, household sharing, account security, privacy rights, accessibility, and licensed media.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build a Netflix-branded app or imply affiliation with Netflix, studios, distributors, actors, rating boards, device partners, payment providers, or advertisers.
- Do not stream production films, shows, trailers, subtitles, audio descriptions, artwork, or games without licensed content and provider approval.
- Do not scrape Netflix, reuse private Netflix APIs, replay network traffic, copy recommendation models, copy title metadata, or bypass account, household, DRM, download, or rights-holder restrictions.
- Do not treat subscriptions, ads, downloads, Kids profiles, profile transfer, extra members, maturity restrictions, or account deletion as generic flows; each needs explicit entitlement, legal, and provider design.
- Do not claim exact App Store, Play Store, native-device, catalog, playback, download, billing, ad, push-notification, support, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/netflix/id363590051 | Official iOS listing, developer, Entertainment category, 13+ age rating, platform support, in-app purchases, privacy labels, catalog/recommendation/download/Kids/notification positioning, and accessibility support | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.netflix.mediaclient | Official Android listing, package id, developer, Teen rating, 1B+ downloads, ads/in-app purchase disclosure, app description, data safety, app support, and privacy/support links | Verified 2026-04-19 |
| Plans And Pricing | https://help.netflix.com/en/node/24926 | Standard with ads, Standard, Premium, simultaneous-device counts, download-device counts, ad-supported catalog locks, extra members, cancellation/change framing, and region-dependent pricing | Verified 2026-04-19 |
| Download Offline | https://help.netflix.com/en/node/54816 | Download-capable devices, per-title download controls, ad-supported monthly download limits, ad-free active download limits, sign-in requirement, Kids restrictions, expiry, and yearly download caps | Verified 2026-04-19 |
| Profiles | https://help.netflix.com/en/node/10421 | Up to 5 profiles, Extra Member profile limit, profile settings, My Netflix path, profile delete effects, Kids profile creation, maturity settings, viewing activity, My List, ratings, and profile email behavior | Verified 2026-04-19 |
| Parental Controls | https://help.netflix.com/en/node/264 | Kids experience, maturity ratings, title blocks, profile locks, account-level PIN, autoplay controls, and viewing-history access | Verified 2026-04-19 |
| Profile Transfer | https://help.netflix.com/en/node/122698 | Transferable profile data, active-account requirement, Kids/PIN/profile-email/Extra Member restrictions, and transfer enablement controls | Verified 2026-04-19 |
| Data Access | https://help.netflix.com/en/node/100624 | Account information, notification settings, privacy/data settings, behavioral advertising choice for ad-supported plans, billing data, profile data, viewing activity, device access data, and 30-day data-copy timing | Verified 2026-04-19 |
| Deletion And Retention | https://help.netflix.com/en/node/100625 | Account deletion, profile removal, viewing-history hiding, payment method removal, email handling, retention, privacy contact, and legal/billing retention caveats | Verified 2026-04-19 |
| Privacy Statement | https://help.netflix.com/legal/privacy | Privacy categories, use/disclosure of personal information, privacy rights, advertising choices, cookies, access to account/profiles, and international/privacy disclosures | Verified 2026-04-19 |
| Terms Of Use | https://help.netflix.com/legal/termsofuse | Membership, billing, cancellation, service use, password/account access, content rights, quality, downloads, and service availability constraints | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and help pages position Netflix as a streaming app for films, series, documentaries, stand-up specials, recommendations, Kids profiles, downloads, previews, notifications, and membership-managed access.
- V1 must model signed-out, active member, canceled, expired, third-party-billed, Standard-with-ads-like, Standard-like, Premium-like, Extra Member, Kids, maturity-blocked, profile-locked, household-challenge, region-blocked, rights-blocked, and unsupported-device states.
- Profile selection must support multiple profiles per account, Kids profiles, one-profile Extra Member accounts, profile avatar/name/language/playback/subtitle/notification settings, profile lock, deletion, profile transfer eligibility, and main-profile immutability.
- Home must support personalized rows, continue watching, new/popular rows, previews, genre collections, Kids-safe rows, ads/promo slots where allowed, fresh-account fallback, stale recommendation labels, and offline/degraded states.
- Search and browse must support title, people, genre, language, maturity, downloadable, availability, region, and Kids filters with empty/no-result, typo, rights-blocked, and ad-plan-locked states.
- Title detail must support synopsis, metadata, maturity rating, cast/crew, episodes/seasons, trailers/previews where licensed, My List, rate/like/dislike-style feedback, download eligibility, subtitles/audio descriptions, and unavailable reasons.
- Playback must support DRM/provider session creation, play/pause/scrub/skip intro/next episode/autoplay, subtitle/audio track selection, quality adaptation, accessibility tracks, Kids restrictions, ad breaks, resume, and error recovery.
- Downloads/offline must support eligible-title discovery, movie/episode/season downloads, ad-supported monthly limits, ad-free active download limits, device-bound storage, expiry, annual download caps, sign-in requirement, Kids maturity blocks, and cancellation invalidation.
- Membership must support plan comparison, plan changes, cancellation, renewal date, third-party billing, tax/price variation, simultaneous stream/download-device limits, extra-member slots, and delayed provider webhooks.
- Ads must support ad-supported plans, unavailable-title lock icons, ad breaks, no-fill, muted/failed ad states, behavioral-ad privacy choice, Kids restrictions, frequency caps, and provider measurement minimization.
- Support/privacy/settings must expose account, profiles, household/device access, notifications, autoplay, subtitles, downloads, billing, privacy/data settings, behavioral-ad choice, data export, account deletion, legal links, and support contact paths.

### Manual Verification Required

- Native iOS and Android tab labels, My Netflix path, profile editing, playback controls, downloads UI, title metadata layout, error copy, and release-note behavior.
- Signup/login, purchase/restore/cancel, third-party billing, household challenges, extra-member invitations, ad-supported playback, Kids experience, PIN prompts, Smart Downloads, push payloads, account deletion, data export, support cases, TV/cast behavior, and regional catalog differences.

## Core User Journeys

- New member installs the app, creates or signs into an account, selects a plan where required, accepts terms/privacy, creates a profile, chooses maturity and notification settings, and lands on Home.
- Returning member chooses a profile, opens Continue Watching, resumes a partially watched episode, changes subtitles, skips intro, and finishes into the next-episode/autoplay state.
- Viewer searches for a title, opens detail, sees region/plan/download/maturity availability, adds it to My List, rates it, plays a trailer if licensed, and starts playback.
- Viewer downloads an eligible season on Wi-Fi, hits a monthly/ad-plan or device limit, watches offline while signed in, sees an expiry warning, and deletes downloads to recover storage.
- Parent creates a Kids profile, sets maturity rating and title blocks, locks adult profiles with PIN, disables autoplay previews, and reviews viewing activity.
- Account owner changes plans, adds an extra member slot, cancels membership, sees downloads invalidated after cancellation, and handles third-party billing limitations.
- Privacy-focused member changes behavioral-ad choice, exports personal data, removes viewing history where supported, deletes a secondary profile, and requests account deletion with retention caveats.
- Support user opens help from a playback, download, billing, or profile error, submits context safely, receives status guidance, and returns to the affected title/profile.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, sign in, signup, plan gate, legal consent | email, password, plan, deep link | signed-out, new, returning, third-party billed | auth fail, blocked region, expired account |
| Profile Picker | Select, add, edit, transfer, or lock profiles | profile tap, add, edit, PIN | adult, Kids, locked, Extra Member | main profile delete blocked, PIN wrong, transfer ineligible |
| Home | Personalized catalog and resume surface | row taps, profile switch, play, My List | loading, personalized, Kids, fresh | stale rows, no catalog, offline, ad-plan locked |
| Search/Browse | Find titles, genres, people, and downloads | query, filters, voice if added | suggestions, results, no-results | rights-blocked, maturity-blocked, typo, offline |
| Title Detail | Inspect movie/show/episode availability and actions | play, trailer, list, rate, download | available, listed, downloadable, rated | unavailable, maturity locked, ad-plan lock, removed title |
| Player | Licensed playback and controls | play, pause, scrub, subtitles, quality | playing, paused, buffering, ad break | DRM fail, stream limit, rights expired, subtitle missing |
| Episodes/Seasons | Show season and episode selection | season, episode, download | current season, watched, next | season removed, episode unavailable, malformed order |
| Downloads | Download manager and offline playback | download, quality, delete, play | downloading, downloaded, expired | storage full, device limit, monthly cap, signed out |
| My List | Saved titles and user curation | add, remove, sort, filter | empty, saved, filtered | title removed, profile mismatch, stale metadata |
| Kids/Parental Controls | Maturity settings, title blocks, profile locks | PIN, maturity, block, autoplay | unrestricted, Kids, locked | PIN missing, Kids immutable, blocked title leak |
| Membership/Billing | Plan, extra member, cancellation, billing owner | plan select, cancel, restore | active, canceled, third-party | tax variation, webhook delay, payment fail |
| Settings/Privacy/Support | Account, profiles, devices, data rights, help | toggles, export, delete, contact | loaded, pending export, deleting | legal retention, support unavailable, identity check |

## Data Model

- `Account`: owner identity, email/phone, country, membership state, billing owner, household state, support state, deletion/export lifecycle, and legal retention flags.
- `Profile`: account, type, name, avatar, language, maturity level, profile lock, Kids flag, email/contact preferences, subtitle/playback settings, My List, ratings, viewing activity, and transfer eligibility.
- `MembershipPlan`: plan type, ads flag, simultaneous streams, download devices, extra-member slots, quality entitlement, price/tax region, renewal/cancel state, and provider ownership.
- `ExtraMemberSlot`: inviter account, invitee account, ads flag, status, profile limit, household exception, payment owner, and audit state.
- `CatalogTitle`: movie, show, episode, special, trailer, game, or ad unit with rights window, regions, maturity rating, artwork license, subtitle/audio tracks, download eligibility, and unavailable reason.
- `SeriesSeason`: show, season number, episode order, availability, maturity, download-season eligibility, and hidden/removed flags.
- `PlaybackSession`: profile, title, device, DRM session, entitlement, position, quality, subtitle/audio selection, ad break state, stream concurrency, and reconciliation cursor.
- `DownloadAsset`: title, episode, profile, device, quality, bytes, entitlement, expiry, yearly cap count, monthly cap count, storage state, and corrupt-cache marker.
- `RecommendationSlot`: profile, surface, seed signals, maturity filter, title list, explanation key, freshness, privacy-safe audit metadata, and fallback reason.
- `ViewingActivity`: profile, title, position, completed state, rating, hide-from-history state, recommendation influence, export status, and retention state.
- `AdBreak`: plan, placement, creative id, frequency cap, behavioral-ad choice, impression/completion/skipped state, no-fill state, and playback resume cursor.
- `SupportCase`: account/profile/title context, issue category, device metadata, evidence redaction, status, resolution, and retention.
- `PrivacyRequest`: export, deletion, correction, advertising choice, viewing-history hide, status, delivery method, identity verification, and legal/billing retention notes.
- `AuditEvent`: append-only auth, billing, profile, PIN, playback, download, ads, support, privacy, deletion, household, and entitlement-sensitive transitions.
- `LocalCacheRecord`: cached home/search/title/profile/settings, downloads, offline plays, stale timestamps, sync attempts, and corruption markers.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with region, membership, household, profile, and device state.
- `GET /profiles`, `POST /profiles`, `PATCH /profiles/:id`, `DELETE /profiles/:id`: profile lifecycle, Kids flag, PIN validation, maturity settings, contact preferences, and deletion blockers.
- `POST /profiles/:id/transfer`, `GET /profiles/:id/transfer-eligibility`: profile transfer, ineligible states, profile data bundle, and account-owner audit events.
- `GET /home`, `GET /browse`, `GET /recommendations`: profile-scoped catalog surfaces with maturity, plan, region, ads, cache hints, and fallback slots.
- `GET /search?q=&type=&region=&maturity=&downloadable=`: title/person/genre search with rights filtering, no-result states, and stale metadata indicators.
- `GET /titles/:id`, `GET /titles/:id/episodes`: title detail and episode availability with maturity, rights, tracks, downloads, ads locks, and deep links.
- `POST /playback/sessions`, `PATCH /playback/sessions/:id`, `DELETE /playback/sessions/:id`: DRM-backed playback lifecycle, idempotent commands, concurrency, ad state, and provider errors.
- `POST /my-list/items`, `DELETE /my-list/items/:id`, `POST /ratings`: profile-scoped My List and rating actions with unavailable-title handling.
- `POST /downloads`, `PATCH /downloads/:id`, `DELETE /downloads/:id`, `GET /downloads/status`: device-bound downloads, caps, storage, expiry, rights refresh, and corrupt-cache recovery.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /membership/cancel`: plan lifecycle, third-party billing, extra members, taxes, refunds, and delayed state.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/error`: ad break decisions, no-fill, behavioral-ad choice, frequency caps, and privacy-safe measurement.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, `POST /viewing-activity/:id/hide`: data rights, ad choices, viewing-history controls, deletion, and retention caveats.
- `POST /support/cases`, `GET /support/cases/:id`: help flows for playback, downloads, billing, profile, household, privacy, and account issues with redaction and status.

## Realtime, Push, And Offline Behavior

- Playback state, stream concurrency, ad breaks, downloads, plan changes, profile edits, PIN changes, support updates, household challenges, and privacy-export readiness must reconcile from server-owned events.
- Clients may cache Home, browse, search suggestions, title detail, profile settings, My List, membership summary, and support status with explicit freshness labels.
- Offline mode may play valid downloaded content while the user remains signed in, preserve profile-scoped progress locally, and queue low-risk My List/rating changes for sync.
- Offline mode must block non-downloaded streams, ad-required streams when ad service is unavailable, subscription changes, account deletion, profile transfer, PIN changes, support evidence upload, and irreversible privacy actions.
- Downloads must be device-bound, storage-aware, rights-aware, profile-aware, resumable, and invalidated on sign-out, cancellation, removed rights, region loss, expired download window, or cache corruption.
- Push notifications must be opt-in and category-controlled for new releases, expiring downloads, billing, account security, profile transfer, support cases, and privacy export.
- Push payloads must minimize sensitive content; defaults should avoid exact viewing titles, Kids profile data, payment state, support evidence, household challenge details, and maturity-blocked titles.
- Ad-supported playback must tolerate no-fill, creative errors, app backgrounding, network loss, Kids restrictions, and behavior-ad choice changes without corrupting the playback cursor.

## Permissions, Privacy, And Safety

- Notifications, local network/cast, Bluetooth/proximity, microphone/voice search, photos/files, and precise location must be requested only when the related feature is invoked.
- Default analytics must exclude raw search text where possible, exact viewing history, Kids identifiers, payment details, device names, household signals, support evidence, subtitle text, and title-level sensitive inferences.
- Licensed video, trailers, subtitles, audio descriptions, cover art, games, ratings metadata, DRM, downloads, and ad creatives are launch blockers with legal/catalog/provider owners.
- Kids and parental controls require age-appropriate defaults, maturity rating enforcement, profile locks, title blocks, autoplay controls, data minimization, and regression tests for blocked-content leakage.
- Recommendations must avoid sensitive inference leakage, respect viewing-history removal and profile boundaries, support explainable fallbacks, and segregate Kids profile signals.
- Ads must honor behavioral-ad choices, Kids restrictions, age rules, sensitive categories, regional ad law, frequency caps, and measurement minimization.
- Account deletion/export must warn about active membership, third-party billing, profiles, downloads, viewing history, support cases, household data, and legal/billing retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, captions/subtitles, audio descriptions, accessible playback controls, and nonvisual alternatives for previews.
- Launch owners: catalog/legal owner for licensed video and ratings; privacy owner for data rights and ads choices; trust/safety owner for Kids, maturity, account sharing, and abusive profile names; billing owner for plans; accessibility owner for playback and catalog UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, profile selected, home viewed, search performed, title opened, playback started/completed/failed, subtitle/audio changed, My List changed, rating changed, download started/completed/expired, entitlement changed, ad impression/completion, support case opened, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, profile type bucket, region bucket, maturity bucket, error code, latency bucket, and provider status rather than raw titles, exact viewing history, Kids identifiers, or payment details.
- Recommendation analytics must separate seed type, slot type, maturity filter, impression, play, save, hide, and error signals without exposing private user content or Kids-specific raw behavior.
- Playback analytics must support provider/royalty accounting separately from product analytics and minimize data shared outside required licensing/reporting pipelines.
- Ad analytics must capture impression, completion, skip, click, no-fill, creative error, frequency cap, placement, plan, and privacy-choice state without exposing sensitive viewer identity.
- Monetization may include original subscription plans, ad-supported plans, extra-member slots, provider bundles, video rentals, games-adjacent entitlements, and original merchandising only after legal/provider review.
- Any paid plan, ad product, rental, or bundle must disclose price, renewal/cancellation, refund/support path, platform ownership, taxes, and regional availability before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, expired session, account locked, account canceled, third-party billing conflict, household challenge, or password reset required.
- Profile is locked, Kids profile tries to access blocked content, maturity rating changes during playback, profile is deleted while offline, or transfer is requested for an ineligible profile.
- Title starts then rights expire, stream limit is exceeded, ad break fails, subtitle/audio track is missing, DRM license refresh fails, or autoplay chooses unavailable next episode.
- Download exceeds monthly/ad-supported cap, annual title cap, device count, storage limit, or region rights; user cancels membership, signs out, changes plan, or cache corrupts while offline.
- Extra member invite expires, invitee changes email, extra-member account has one-profile limit, payment owner cancels, or household rules differ by region.
- Viewing-history hide races with recommendation refresh, data export takes longer than expected, account deletion has billing retention, or support evidence includes sensitive title/profile data.
- Ads no-fill during an ad-supported stream, user changes behavioral-ad choice mid-session, Kids profile receives an ad slot, or frequency caps conflict across devices.
- Trailer or preview is unavailable, artwork metadata is malformed, title is removed from My List, season order changes, or localized metadata falls back to another language.

## Test Plan

- Unit tests for profile rules, Kids/maturity gates, profile locks, entitlement gating, playback state machine, download limits, ad-state transitions, viewing-history hide, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, idempotency keys, rights states, maturity states, ad states, download states, billing webhooks, and privacy/deletion states.
- Integration tests for auth, profile selection, Home, Search, title detail, playback start/stop, subtitle/audio change, My List, ratings, downloads, Kids profile, settings, support, data export, and account deletion.
- Playback tests for buffering, DRM fail, stream concurrency, ad break, subtitle unavailable, audio description unavailable, next episode, skip intro, rights failure, and stale cache.
- Offline tests for valid downloads, expired downloads, missing downloads, Kids maturity blocks, corrupt cache, storage full, sign-out invalidation, queued low-risk writes, and reconnect reconciliation.
- Billing tests for active, canceled, expired, third-party, ad-supported, Standard-like, Premium-like, extra-member, payment failure, plan change, and webhook delay states.
- Parental-control tests for profile creation, Kids experience, maturity rating, blocked title, profile lock PIN, add-profile PIN, autoplay toggles, viewing activity, and blocked-content leakage.
- Privacy tests for ad choices, viewing-history removal, profile deletion, account deletion, data export, support redaction, analytics minimization, and legal retention caveats.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, captions/subtitles, audio descriptions, media controls, and nonvisual title discovery.
- Manual verification tests: native iOS/Android screenshots, signup/login, plan purchase/restore/cancel, ad playback, downloads/expiry, Smart Downloads, Kids profiles, PIN prompts, profile transfer, extra members, household rules, push payloads, export/delete, support, and regional catalog behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Netflix assets, network traffic, private APIs, recommendation systems, catalog data, DRM implementation, ad infrastructure, support scripts, or brand copy.
- New and returning members can sign in, choose a profile, discover, search, inspect, play, save, rate, download, and recover video content using original licensed or synthetic data.
- Profile, Kids, maturity, playback, My List, download, subscription, ad, privacy, support, and data-rights workflows have deterministic data models and API contracts.
- Active, canceled, expired, ad-supported, Standard-like, Premium-like, Extra Member, Kids, maturity-blocked, region-blocked, and rights-blocked states are covered by tests.
- Offline playback, downloads, ads, recommendations, Kids controls, profile transfer, extra members, and privacy workflows have explicit blockers where exact native behavior is not verified.
- Licensed-media, minors/family, ads/privacy, billing, household, DRM, download, accessibility, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which licensed video catalog, DRM, subtitle/audio-description, artwork, ratings, ad, and analytics providers will back the original clone?
- Which features are V1 versus later: downloads, Kids profile, profile transfer, extra members, Smart Downloads, ads, games, cast/TV, rentals, or household controls?
- Will V1 include a free/ad-supported tier, a paid-only demo catalog, or synthetic internal test entitlements?
- Which payment platforms own subscriptions and restores: app stores, web checkout, third-party bundles, or a provider-managed subscription service?
- Which regions, languages, maturity-rating systems, download rules, accessibility tracks, and device integrations are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, profile picker, Home, Search, title detail, My List, synthetic catalog seed data, settings, and privacy-safe analytics.
- Phase 2: add playback provider abstraction, player controls, subtitle/audio track model, progress sync, stream concurrency, and provider error handling.
- Phase 3: add profile management, Kids profile, maturity rules, profile lock, blocked-title rules, viewing activity, and parental-control regression tests.
- Phase 4: add downloads/offline mode, device-bound storage, expiry, limits, storage recovery, sign-out invalidation, and offline regression tests.
- Phase 5: add billing/entitlements, plan gates, extra-member state, cancellation, platform restore, webhook reconciliation, and billing regression tests.
- Phase 6: add ad-supported playback, behavioral-ad choices, ad measurement minimization, no-fill recovery, and ad/Kids regression tests.
- Phase 7: add profile transfer, push notifications, support cases, data export/deletion, accessibility pass, and manual native verification.
- Phase 8: complete legal/provider launch review for licensed catalog, DRM, downloads, ads, Kids controls, data rights, regional availability, and platform APIs.

## Next Steps

- Resolve Netflix manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 video/entertainment implementation-readiness upgrades with `073-youtube.md`.
