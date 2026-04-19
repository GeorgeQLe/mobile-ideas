# IMDb-Style Clone Spec

> Metadata
> - Inspiration app: IMDb
> - Category: entertainment database, movie/TV discovery, watchlist, ratings, reviews, trailers, showtimes, news, celebrity pages, contributions, ads, and streaming availability
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, IMDb Help articles, IMDb privacy/conditions pages, app-support references, user-review guidance, list/watchlist documentation, ratings guidance, and public general-information documentation.
> - Manual verification blockers: native iOS/Android screen capture, Amazon/IMDb account signup/login, Watchlist, Watched, ratings, reviews, review moderation, contribution tracking, streaming-service preferences, tailored alerts, notifications, trailers/video playback, showtimes/ticketing links, ad placement, Interests/recommendations, news/celebrity pages, data export/deletion, support contacts, widgets/deep links, and regional content/availability differences still require lawful test devices/accounts and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, posters, photos, trailers, metadata, cast/crew data, user reviews, ratings, watchlists, news, showtimes, ticketing, ads, availability data, recommendation models, and contribution systems.

## Overview

Build an original mobile entertainment-database app inspired by IMDb's public workflow: account entry, Home recommendations, title/person search, title detail, cast/crew pages, Watchlist, Watched tracking, ratings, reviews, trailers/videos, lists, streaming-service preferences, alerts, showtimes/ticketing links, entertainment news, contribution/report flows, support, privacy controls, data export, and account deletion.

The clone must not copy IMDb branding, screenshots, marketing copy, protected UI artwork, private APIs, posters, photos, trailers, metadata, ratings, reviews, lists, critic data, news copy, box-office data, showtimes, recommendation logic, or contribution systems. Functional parity should use original product language, licensed entertainment metadata and media, synthetic user content, provider-approved availability/showtime integrations, and independently designed ranking and review workflows.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first entertainment database with onboarding, Home, search, title detail, person pages, watchlist, watched tracking, ratings, reviews, trailers, lists, news, showtimes/availability links, settings, support, privacy, and account controls.
- Support fan workflows: identify titles/people, customize interests, save to Watchlist, mark Watched, rate, review, receive alerts, inspect cast/crew/trivia/news, and report or contribute corrections.
- Preserve entertainment-database trust expectations around licensed metadata, user-generated reviews, spoilers, harassment, ads, availability accuracy, ticketing handoff, account privacy, and data rights.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.

## Non-Goals

- Do not build an IMDb-branded app or imply affiliation with IMDb, Amazon, studios, celebrities, agents, showtime/ticketing partners, streaming services, advertisers, or data providers.
- Do not copy posters, photos, trailers, synopses, cast/crew data, trivia, quotes, ratings, reviews, lists, news, showtimes, box-office data, or user profiles without licensed data and permissions.
- Do not scrape IMDb, reuse private IMDb APIs, replay network traffic, copy recommendation/search/ranking logic, copy review moderation criteria, or bypass ads, data licensing, showtime, or account restrictions.
- Do not treat entertainment metadata, reviews, contributions, streaming availability, showtimes, ticketing, ads, or account data as generic features; each needs explicit data/provider/legal design.
- Do not claim exact App Store, Play Store, native-device, metadata, search, ratings, reviews, recommendations, ads, notifications, showtimes, support, deletion/export, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525 | Official iOS listing, developer, Entertainment category, 13+ age rating, Home recommendations, Watchlist, alerts, streaming services, ratings, Interests, version history, privacy labels, platform support, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.imdb.mobile | Official Android listing, package id, ads disclosure, 100M+ downloads, Teen rating, personalized recommendations, Watchlist, tailored alerts, streaming-service preferences, ratings, Interests, news, data safety, support email, and release context | Verified 2026-04-19 |
| What Is IMDb | https://help.imdb.com/article/imdb/general-information/what-is-imdb/G836CY29Z4SGNMK5 | IMDb product scope, searchable database, movie/TV/celebrity content, showtimes, ticketing, trailers, critic/user reviews, recommendations, photo galleries, news, trivia, box office, Watchlist, and registration | Verified 2026-04-19 |
| IMDb Site Index | https://help.imdb.com/article/imdb/general-information/imdb-site-index/GNCX7BHNSPBTFALQ | Help taxonomy for account, preferences, email/watchlist notifications, data access/deletion, sign-in, profile, user content, ads, partners, licensing, and support surfaces | Verified 2026-04-19 |
| Lists FAQ | https://help.imdb.com/article/imdb/track-movies-tv/faq-for-lists/GNQMN47VZSE7KW38 | List and Watchlist behavior, list management concepts, privacy/ordering implications, and tracking workflows | Verified 2026-04-19 |
| Add Reviews | https://help.imdb.com/article/imdb/track-movies-tv/how-do-i-add-my-review-to-imdb/GMC7JNM7JWZ4WKWL | User review submission, platform-specific add-review paths, guidelines requirement, and contribution tracking | Verified 2026-04-19 |
| Edit/Report Reviews | https://help.imdb.com/article/contribution/contribution-information/how-do-i-edit-remove-or-report-a-review/G6Q9LAZC72JMLDQB | Review edit/delete/report flows across web/iOS/Android, approval process, report reasons, review guidelines, and contribution status tracking | Verified 2026-04-19 |
| Ratings | https://help.imdb.com/article/imdb/track-movies-tv/how-do-i-rate-a-title/GD4V3UKGYG5R36Y4 | Title rating behavior, user rating state, rating colors/context, and personal rating flows | Verified 2026-04-19 |
| Privacy Policy | https://www.imdb.com/privacy | Privacy/data-use orientation, Amazon/IMDb data rights, advertising, personalization, deletion/export, and regional controls | Verified 2026-04-19 |
| Conditions Of Use | https://www.imdb.com/conditions | Account, service use, content, IP, reviews/comments, ads, and platform/legal constraints | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and help pages position IMDb as an entertainment guide for movie/TV/celebrity discovery, personalized recommendations, custom Watchlists, tailored alerts, streaming services, ratings, reviews, news, trailers, showtimes/ticketing, trivia, photos, and database search.
- V1 must model signed-out browse, signed-in fan, contributor, reviewer, ads-supported user, blocked/suspended user, profile-private states, review-pending/rejected states, watchlist-alert-enabled states, region-blocked availability, and provider-stale states.
- Home must support personalized recommendations, Interests modules, trending/popular rows, trailers/news modules, Watchlist prompts, ratings insights, ads, signed-out fallback, and stale/offline states.
- Search must support titles, people, companies, keywords, episodes, lists, news, exact/partial matches, filters, no-result states, duplicate title disambiguation, and stale metadata indicators.
- Title detail must support poster, synopsis, year, runtime, genres, maturity rating, release date, cast/crew, episodes/seasons, trailers/videos, photos, trivia/quotes if licensed, critic/user review summaries, user rating, Watchlist/Watched actions, streaming/showtime/ticketing links, and unavailable states.
- Person pages must support biography, known-for, filmography, roles/jobs, photos, awards/trivia where licensed, watchlist/favorite-person-like states where added, and missing/disputed credits.
- Watchlist/Watched must support add/remove, custom list behavior, mark watched, Mark All As Watched where supported, sorting/filtering, streaming-service availability, alerts, stale availability, and sync conflicts.
- Ratings/reviews must support user rating, review submission, edit/delete, spoiler flag if supported, moderation approval, rejection reasons, report flow, contribution tracking, and profile/review visibility.
- Contributions/reporting must support data correction, review report, illegal/ad report, suspicious email/security reports, contribution status, and support handoff.
- Streaming/showtimes/ticketing must be provider-backed, region-aware, stale-labeled, and explicit about handoff/payment/support owner.
- Support/privacy/settings must expose account, Amazon sign-in, profile, preferences, email/watchlist notifications, ad personalization, data access, data export, account deletion, privacy/conditions, contact/support, and vulnerability reporting paths.

### Manual Verification Required

- Native iOS and Android navigation, Home widgets, Watchlist/Watched, Mark All As Watched, ratings insights, review composer, review status, search behavior, ads placement, streaming-service preferences, alerts, and release-note behavior.
- Amazon/IMDb auth, contribution tracking, showtimes/ticketing links, trailers/video playback, notifications, data export/delete, support contact, widgets/deep links, profile privacy, and regional metadata/availability differences.

## Core User Journeys

- New fan installs the app, browses signed out, creates or signs into an account, configures Interests and streaming services, enables optional alerts, and lands on Home.
- Returning fan searches for a movie by partial title, disambiguates year, opens detail, watches a trailer, reviews cast, adds to Watchlist, rates it, and marks it Watched.
- Viewer opens Watchlist, filters by available streaming service, receives an alert when a title becomes available, follows a handoff link, and handles stale availability.
- Reviewer adds a review, sees pending/moderated status, edits it, deletes it, or reports another user's review that violates guidelines.
- TV fan opens a show page, navigates seasons/episodes, marks all as watched where supported, and handles missing episode data.
- Celebrity researcher opens a person page, reviews filmography and roles, follows external links where allowed, and reports a missing or wrong credit.
- Contributor submits a data correction or content report, tracks contribution status, receives rejection reasons where provided, and opens support if needed.
- Privacy-focused user changes ad/personalization preferences, manages email/watchlist notifications, requests account data, deletes account, and sees retention/content consequences.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry and signed-out browse | Amazon-like auth, email, legal | signed-out, new, returning | auth fail, suspended, cookie issue |
| Home | Recommendations, interests, trailers, news, ads | row taps, interest, rating | loading, personalized, signed-out | stale provider, ad shift, offline |
| Search | Title/person/list/news discovery | query, filter, exact match | suggestions, results, no-results | duplicate titles, typo, stale metadata |
| Title Detail | Metadata, media, actions, reviews, availability | rate, watchlist, watched, play | available, watched, rated | missing poster, blocked video, stale availability |
| Person Detail | Celebrity/cast/crew profile and filmography | role tap, filter, report | loaded, known-for, filmography | missing role, disputed credit |
| Watchlist/Lists | Saved titles and custom lists | add, remove, sort, mark watched | empty, saved, filtered | stale streaming data, sync conflict |
| Watched/Ratings | Personal history and rating insights | rate, watched, filter | unrated, rated, watched | duplicate ratings, hidden title |
| Reviews | Read, submit, edit, delete, report reviews | rating, body, spoiler, report | draft, pending, published | rejected, reported, deleted |
| Videos/Trailers | Trailers, clips, originals, playback | play, pause, share | available, playing, ended | rights block, autoplay audio, provider fail |
| Showtimes/Availability | Streaming, showtimes, tickets, alerts | provider, alert, handoff | available, unavailable, alerted | stale, region blocked, partner outage |
| Contributions/Reports | Data corrections and content/ad reports | form, evidence, submit | draft, submitted, tracked | duplicate, rejected, support needed |
| Settings/Privacy/Support | Account, notifications, data rights, help | toggles, export, delete, contact | loaded, pending export, deleting | legal retention, support unavailable |

## Data Model

- `User`: account identity, Amazon/IMDb auth link, locale, country, preferences, Interests, streaming-service preferences, notification settings, privacy choices, export/deletion state, and restrictions.
- `Title`: licensed metadata id, type, name, year, runtime, maturity rating, release dates, genres, synopsis, poster/photo/video licenses, availability, and correction status.
- `Episode`: series title, season, episode number, title, release date, runtime, watched/rating state, availability, and missing/disputed metadata.
- `Person`: licensed metadata id, name, biography, photos, known-for credits, filmography, awards/trivia links, and disputed/missing credit state.
- `Credit`: title, person, role/job, character, order, language/version, source, and contribution/correction state.
- `WatchlistItem`: user, title, list, added timestamp, watched flag, alert preferences, provider availability, and stale markers.
- `UserRating`: user, title, score, timestamp, rating context, edit history, export state, and deletion state.
- `Review`: author, title, rating, headline/body, spoiler flag if supported, approval state, rejection reason, report state, edit history, and deletion/export state.
- `List`: owner, title, description, ordered titles, privacy where supported, mark-all-watched state, sorting/filtering, and unavailable-title handling.
- `Interest`: user-selected topic/person/genre/provider, recommendation weight, notification flag, and privacy-safe audit state.
- `AvailabilityLink`: title, provider, type, region, price if known, freshness, handoff URL, support owner, and stale/error state.
- `Showtime`: title, theater/provider, region, time, ticket handoff, freshness, and support owner.
- `Contribution`: user, target object, change type, payload, validation, approval/rejection, tracking id, and support references.
- `AdPlacement`: surface, creative id, advertiser category, frequency cap, impression/click state, privacy choice, and layout-shift guard.
- `PrivacyRequest`: data access/export, deletion, ad preference, notification unsubscribe, status, delivery method, identity verification, and retention notes.
- `AuditEvent`: append-only auth, rating, review, watchlist, contribution, report, ad, support, privacy, deletion, and account-sensitive transitions.
- `LocalCacheRecord`: cached home/search/title/person/watchlist/settings, review drafts, offline queue, stale timestamps, and sync attempts.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with Amazon-like link, deletion, locale, and device state.
- `GET /home`, `GET /recommendations`, `GET /interests`: Home and personalization surfaces with cache hints, ad slots, interest state, and fallback rows.
- `GET /search?q=&type=&cursor=&region=`: title/person/list/news search with duplicate disambiguation, filters, and stale metadata indicators.
- `GET /titles/:id`, `GET /titles/:id/episodes`, `GET /titles/:id/media`, `GET /titles/:id/reviews`: title detail, episodes, videos, photos, reviews, availability, and correction state.
- `GET /people/:id`, `GET /people/:id/credits`: person detail, known-for, filmography, role/job filtering, and missing/disputed credits.
- `POST /watchlist/items`, `DELETE /watchlist/items/:id`, `PATCH /watchlist/items/:id`, `POST /lists/:id/mark-watched`: watchlist/list/watched lifecycle with sync and stale-provider handling.
- `POST /ratings`, `PATCH /ratings/:id`, `DELETE /ratings/:id`: rating lifecycle with duplicate prevention, history, and export state.
- `POST /reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id`, `POST /reviews/:id/report`: review lifecycle, approval, rejection, report, and contribution tracking.
- `GET /availability`, `PATCH /availability/preferences`, `POST /availability/alerts`: streaming-service preferences, provider freshness, alerts, and handoff metadata.
- `GET /showtimes`, `POST /ticketing/handoff`: showtimes/ticketing provider links, freshness, region state, and support owner.
- `POST /contributions`, `GET /contributions/:id`: metadata correction, review tracking, status, rejection reasons, and support escalation.
- `GET /ads/config`, `POST /ads/impression`, `POST /ads/click`, `POST /ads/error`: ad selection, layout-safe placement, no-fill, privacy choices, and measurement.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export/access, deletion, and warning state.
- `POST /support/cases`, `GET /support/cases/:id`: account, data, review, metadata, ads, showtime, availability, and support workflows.

## Realtime, Push, And Offline Behavior

- Watchlist availability alerts, notification preferences, contribution status, review approval/rejection, ad config, support updates, and data-export readiness must reconcile from server-owned events.
- Clients may cache Home, search suggestions, title/person detail, Watchlist, ratings, reviews, lists, settings, availability, and support status with explicit freshness labels.
- Offline mode may show cached title/person/watchlist/list data and preserve rating/review/contribution drafts.
- Offline mode must block public review publish, ratings that require canonical server state, watchlist alerts, showtime/ticketing handoff, contribution submission, reports, account deletion, data export, and support evidence upload.
- Review drafts must be durable across app backgrounding, crashes, auth refresh, title metadata reload, and network changes.
- Availability/showtime data must expose fresh, stale, unknown, unavailable, region-blocked, partner-error, and handoff-outage states with recovery actions.
- Push notifications must be opt-in and category-controlled for Watchlist availability, trailers/news alerts, contribution status, review status, account security, support cases, and data export.
- Push payloads must minimize sensitive content; defaults should avoid exact private watchlist state, review drafts, account deletion status, support evidence, and ad personalization details.

## Permissions, Privacy, And Safety

- Notifications, precise/approximate location for showtimes, local network/deep links, photos/files for evidence, and calendar/reminder integrations must be requested only when the related feature is invoked.
- Default analytics must exclude raw search terms where possible, exact watchlist/history, review drafts, private profile data, contribution evidence, payment/ticketing data, precise location, and support evidence.
- Entertainment metadata, posters, photos, trailers, cast/crew data, reviews, ratings, news, showtimes, ticketing, streaming availability, and ad creatives are launch blockers with legal/data/provider owners.
- User-generated ratings, reviews, lists, profile content, reports, and contributions require moderation, spam prevention, abuse controls, appeal/support paths, and privacy redaction.
- Review/report workflows must support guideline checks, pending/rejected states, report reasons, status tracking, and no-guaranteed-follow-up states where applicable.
- Availability/showtime/ticketing flows must disclose provider freshness, regional limits, handoff owner, payment owner, refund/support owner, and stale-data risk.
- Ads must honor privacy choices, age restrictions, sensitive categories, frequency caps, regional ad rules, and layout stability so ad loads cannot hijack search/detail taps.
- Recommendations must avoid sensitive inference leakage, support interest/history controls, and provide fallback content when personalization is disabled.
- Account deletion/export must warn about ratings, reviews, lists, Watchlist, contributions, support cases, ad preferences, and legal/provider retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, poster grid alternatives, accessible rating controls, and nonvisual alternatives for trailers/search.
- Launch owners: data/legal owner for entertainment metadata/media; privacy owner for watchlist/ratings/export; trust/safety owner for reviews/reports/contributions; ads owner for ad placement; accessibility owner for search/detail/rating UX.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, home viewed, interest selected, search performed, title opened, person opened, watchlist changed, watched changed, rating saved, review submitted, trailer played, availability link opened, showtime viewed, contribution submitted, report submitted, ad impression/click, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, account state, region bucket, provider freshness, error code, latency bucket, and ad/privacy state rather than raw search text, review text, exact watchlist, private ratings, or precise location.
- Recommendation analytics must separate seed type, Interest, slot type, impression, click, save, rate, hide, alert, and report signals without exposing private user content.
- Metadata quality analytics must capture missing fields, duplicate reports, correction volume, approval/rejection reasons, provider latency, and stale availability without exposing private evidence.
- Ad analytics must capture impression, click, no-fill, creative error, frequency cap, placement, privacy choice, and layout-shift guard state without exposing sensitive fan identity.
- Monetization may include original ads, affiliate streaming/showtime/ticketing links, premium metadata tools, data-provider licenses, sponsored editorial surfaces, or professional subscriptions only after legal/provider review.
- Any paid product, ad, affiliate link, ticketing link, provider integration, or data license must disclose pricing, support owner, data sharing, regional availability, and provider approval before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, signed-out user tries to rate, Amazon sign-in fails, account deleted, cookies blocked, or profile private.
- Search exact title returns multiple years, title has alternate language names, episode metadata is missing, person credits are disputed, or poster/photo license is unavailable.
- Watchlist item has stale provider availability, alert arrives late, showtime partner changes time, ticketing handoff fails, or streaming link is region-blocked.
- Rating is saved twice, review is pending/rejected, edit requires approval again, user deletes review while report pending, or contribution tracking fails.
- User marks all list items watched accidentally, watched state conflicts with rating, Watchlist disappears due to sync issue, or app loses list scroll position.
- Trailer autoplay starts with audio unexpectedly, video provider fails, ad loads above search and shifts tap target, or news item is removed after open.
- Contribution is rejected for missing evidence, duplicate contribution races, illegal/ad report requires separate support flow, or security/vulnerability report is misrouted.
- Data export is requested during account deletion, support case includes private evidence, ad personalization setting changes mid-session, or legal retention prevents full deletion.

## Test Plan

- Unit tests for title/person/search state, watchlist/watched/rating logic, review approval states, contribution validation, availability freshness, ad placement stability, and privacy-safe analytics payloads.
- Contract tests for every documented API route, including pagination, idempotency keys, validation errors, duplicate title/person handling, review states, contribution states, availability states, ad states, and deletion/export states.
- Integration tests for auth, signed-out browse, Home, Interests, Search, title detail, person detail, Watchlist, Watched, ratings, reviews, lists, trailers, availability, showtimes, settings, support, data export, and account deletion.
- Review/contribution tests for create/edit/delete, pending approval, rejection reason, report review, contribution status, duplicate contribution, support escalation, and moderation outcomes.
- Watchlist/availability tests for add/remove, Mark All As Watched, streaming-service preferences, stale provider, alert, showtime/ticketing handoff, partner outage, and regional block.
- Offline tests for cached title/person/watchlist, rating/review drafts, blocked public/provider/privacy writes, stale labels, and reconnect reconciliation.
- Privacy tests for ad personalization, email/watchlist notifications, data export, account deletion, ratings/reviews/list retention, support redaction, and analytics minimization.
- Ads tests for no-fill, creative error, frequency cap, privacy choice, layout-shift guard, blocked sensitive category, and app-open/detail/search placements.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, poster grids, rating controls, search results, video controls, and form errors.
- Manual verification tests: native iOS/Android screenshots, Amazon/IMDb auth, Watchlist, Watched, ratings, reviews, contribution tracking, streaming preferences, alerts, notifications, trailers, showtimes/ticketing, ads, Interests, export/delete, support, widgets/deep links, and regional behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing IMDb assets, network traffic, private APIs, metadata, posters, trailers, ratings, reviews, lists, news, showtimes, ad infrastructure, contribution systems, or brand copy.
- New and returning users can discover, search, inspect, rate, review, watchlist, mark watched, watch trailers, open availability/showtime links, and recover entertainment data using original licensed or synthetic data.
- User, title, person, credit, watchlist, watched, rating, review, list, availability, showtime, contribution, ad, privacy, support, and deletion workflows have deterministic data models and API contracts.
- Signed-out, signed-in, reviewer, contributor, ads-supported, profile-private, review-pending/rejected, availability-stale, showtime-blocked, region-blocked, and deleted-account states are covered by tests.
- Watchlist, Watched, ratings, reviews, contributions, availability, showtimes, ads, notifications, trailers, data export/deletion, and support workflows have explicit blockers where exact native behavior is not verified.
- Entertainment-data licensing, user-generated reviews, contribution integrity, ads/privacy, ticketing/availability, accessibility, and platform constraints have named launch owners and launch-blocking mitigations.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags before one-for-one native parity is claimed.

## Open Questions

- Which title/person metadata, posters/photos, trailers/video, ratings, reviews, news, streaming availability, showtime/ticketing, ad, analytics, and moderation providers will back the original clone?
- Which features are V1 versus later: Watched, Mark All As Watched, review submission, contributions, showtimes/ticketing, trailer playback, notifications, Interests, or ratings insights?
- Will V1 support user-generated reviews and contributions immediately, or start read-only with synthetic reviews and internal corrections?
- Which providers own availability/ticketing handoff, refunds/support, regional catalogs, and data freshness SLAs?
- Which regions, languages, rating systems, content categories, ad policies, privacy laws, and accessibility requirements are in launch scope?

## Build Plan

- Phase 1: scaffold app shell, auth, Home, Interests, Search, title detail, person detail, Watchlist, synthetic metadata seed data, settings, and privacy-safe analytics.
- Phase 2: add watched tracking, ratings, lists, review composer, review moderation states, report flow, and review/list regression tests.
- Phase 3: add trailers/video provider abstraction, photos/media, availability preferences, showtime/ticketing handoff, alerts, and provider freshness tests.
- Phase 4: add contribution submission/tracking, metadata correction workflow, support cases, ad placement model, and contribution/ad regression tests.
- Phase 5: add personalized recommendations, ratings insights, notification categories, email/watchlist preferences, widgets/deep links where chosen, and privacy controls.
- Phase 6: add data export/deletion, support redaction, accessibility pass, regionalization, and manual native verification.
- Phase 7: complete legal/provider launch review for entertainment metadata/media, reviews/ratings, showtimes/ticketing, ads, recommendations, data rights, regional availability, and platform APIs.

## Next Steps

- Resolve IMDb manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Batch 04 implementation-readiness upgrades with the education specs: `077-duolingo.md`, `078-khan-academy.md`, `079-quizlet.md`, and `080-coursera.md`.
