# Google Maps-Style Clone Spec

> Metadata
> - Inspiration app: Google Maps
> - Category: Maps, navigation, local search, place discovery, user contributions, and location sharing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-16.
> - Verification basis: exact public marketplace pages, Google Maps Help pages, Google Maps legal/privacy pages, Google Maps UGC policy pages, Google Business Profile docs, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, live GPS/navigation walkthrough, transit/traffic behavior, offline map download/update, location sharing, Timeline/activity controls, review/photo contribution, business profile management, CarPlay/Android Auto/Wear OS behavior, Lens/AR, push payloads, and region-specific surfaces still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, map styling, map data, route data, business/place data, reviews, photos, Street View-like imagery, traffic feeds, transit feeds, ads, and safety policy implementation.

## Overview

Build an original mobile maps/navigation app inspired by Google Maps' public workflow: map search, place details, local discovery, route planning, turn-by-turn navigation, live traffic and incidents, public transit, walking/cycling/driving modes, saved places, offline maps, reviews/photos, business listings, Street View-like previews, location sharing, Timeline-like personal history, and privacy controls.

The clone must not copy Google Maps branding, screenshots, marketing copy, protected UI artwork, proprietary map tiles, route algorithms, business databases, Street View imagery, Local Guides data, ads inventory, ranking systems, private APIs, or user-generated content. Functional parity should be expressed through original product language, licensed mapping and location providers, original or licensed place data, independently designed ranking and routing logic, and transparent safety limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first map experience with search, place details, category exploration, saved places, directions, route preview, navigation, offline maps, and settings.
- Support transportation modes for driving, walking, cycling, public transit, ride-share handoff, and two-wheeler/scooter-style routing where providers and regions allow.
- Preserve safety expectations around route correctness, traffic incidents, location privacy, distracted driving, emergency and oversized vehicle limitations, accessibility, and UGC moderation.
- Expose privacy controls for location permission, precise/background location, Maps activity, Timeline-like history, location sharing, contribution visibility, data export, and account deletion.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Google Maps-branded app or imply affiliation with Google, Google Maps, Local Guides, Google Business Profile, transit agencies, map data providers, or advertisers.
- Do not scrape Google Maps, reuse private Google APIs, replay Google Maps network traffic, copy map tiles, copy Street View imagery, copy place databases, or clone proprietary route/ranking systems.
- Do not ship safety-critical navigation claims for emergency vehicles, oversized vehicles, hazardous materials, aviation, maritime, or regulated dispatch without separate domain review.
- Do not publish open-ended reviews, photos, map edits, business profiles, ads, or location-sharing features without trust/safety, privacy, abuse, and legal review.
- Do not claim exact App Store, Play Store, native-device, live navigation, traffic, transit, offline maps, AR/Lens, CarPlay/Android Auto, Wear OS, or push-notification parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/google-maps/id585027354 | Official iOS listing, category, supported devices, version notes, privacy labels, age rating, in-app purchases, navigation/search/offline/listing claims | Verified 2026-04-16 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.maps | Official Android listing, package id, ads/data-safety labels, downloads/rating scale, search/navigation/transit/offline/Street View/Immersive/Lens claims, support contact | Verified 2026-04-16 |
| Google Maps Help Center | https://support.google.com/maps/?hl=en | Canonical help topic inventory for search, directions, navigation, offline maps, saved places, contributions, Street View, privacy, feedback, car, and friends features | Verified 2026-04-16 |
| Get Started With Google Maps | https://support.google.com/maps/answer/144349?co=GENIE.Platform%3DAndroid&hl=en | Core setup, home/work addresses, place information, and directions entry points | Verified 2026-04-16 |
| Search Nearby And Explore | https://support.google.com/maps/answer/4610185?co=GENIE.Platform%3DAndroid&hl=en | Local search, category exploration, relevance/distance/prominence ranking, partner/user/public-web data, ad labels | Verified 2026-04-16 |
| Directions And Routes | https://support.google.com/maps/answer/144339?co=GENIE.Platform%3DAndroid&hl=en | Route preview, transportation modes, multi-stop limits, route alternatives, safety warning, limited availability | Verified 2026-04-16 |
| Navigation | https://support.google.com/maps/answer/3273406?co=GENIE.Platform%3DAndroid&hl=en | Turn-by-turn navigation, GPS/audio needs, lane/traffic alerts, route actions, incident reports, voice settings, safety caveats | Verified 2026-04-16 |
| Navigation Data | https://support.google.com/maps/answer/10565726?co=GENIE.Platform%3DAndroid&hl=en | Navigation data collection, traffic and routing improvement, reset identifiers, account separation, retention notes | Verified 2026-04-16 |
| Offline Maps | https://support.google.com/maps/answer/6291838?co=GENIE.Platform%3DAndroid&hl=en | Offline downloads, region limitations, SD/device storage, auto-update, no traffic/alternate routes offline | Verified 2026-04-16 |
| Saved Places And Lists | https://support.google.com/maps/answer/9948049?co=GENIE.Platform%3DAndroid&hl=en | You tab, lists, labels, recent places, nearby saved places, Timeline and reservations references | Verified 2026-04-16 |
| Reviews And Ratings | https://support.google.com/maps/answer/6230175?co=GENIE.Platform%3DAndroid&hl=en | Public reviews, non-anonymous reviewer identity, edit/delete flow, moderation and policy removal | Verified 2026-04-16 |
| Photos And Videos | https://support.google.com/maps/answer/2622947?co=GENIE.Platform%3DAndroid&hl=en | Public media contribution, removal, location-info exposure, upload restrictions, Local Guides points | Verified 2026-04-16 |
| Business Profile Editing | https://support.google.com/maps/answer/15391?hl=en | Claimed/verified business profile editing, Maps business surface, review before publication, suggested edits | Verified 2026-04-16 |
| Street View | https://support.google.com/maps/answer/3093484?co=GENIE.Platform%3DAndroid&hl=en | Street-level imagery entry points, layer, dates, navigation gestures, split-screen behavior, sharing | Verified 2026-04-16 |
| Lens In Maps | https://support.google.com/maps/answer/9332056?co=GENIE.Platform%3DAndroid&hl=en | Camera permission, ARKit/ARCore requirement, Street View coverage requirement, select-country availability | Verified 2026-04-16 |
| Location Sharing | https://support.google.com/maps/answer/15437054?co=GENIE.Platform%3DAndroid&hl=en | Real-time location sharing, ETA sharing, recipient visibility, request/deny/block, age/domain/region limits | Verified 2026-04-16 |
| Location Sharing Notifications | https://support.google.com/maps/answer/11966807?co=GENIE.Platform%3DAndroid&hl=en | Arrival/departure notifications, notification dependencies, stop conditions, unsupported account/link cases | Verified 2026-04-16 |
| Timeline Privacy | https://support.google.com/maps/answer/10077010?hl=en | Timeline opt-in, precise location use, sensitive-place handling, deletion controls, Web & App Activity separation | Verified 2026-04-16 |
| Manage Timeline | https://support.google.com/maps/answer/6258979?co=GENIE.Platform%3DAndroid&hl=en | Timeline backup, import, delete day/visit/range/all, auto-delete, device-local implications | Verified 2026-04-16 |
| Manage Maps Activity | https://support.google.com/maps/answer/3137804?co=GENIE.Platform%3DAndroid&hl=en | Search/directions/place activity, individual/range/all deletion, retention caveats, unrelated data exclusions | Verified 2026-04-16 |
| Maps UGC Policy | https://support.google.com/contributionpolicy/answer/7422880?hl=en | UGC authenticity, policy enforcement, human/ML review, rejected edits, suspended features/accounts | Verified 2026-04-16 |
| Prohibited And Restricted UGC | https://support.google.com/contributionpolicy/answer/7400114?hl=en | Fake engagement, harassment, hate, personal info, restricted goods, dangerous content, child safety, spam | Verified 2026-04-16 |
| Google Maps Additional Terms | https://www.google.com/help/terms_maps/?hl=en | End-user Maps terms, prohibited redistribution/sale, attribution/legal notice requirements, Business Profile carveout | Verified 2026-04-16 |
| Google Privacy Policy | https://policies.google.com/privacy?hl=en-US | Personal data handling, controls, export/delete account/data obligations, retention framework | Verified 2026-04-16 |
| Google Terms of Service | https://policies.google.com/terms?hl=en-US | Account/service rules, user responsibilities, content/license baseline, service availability caveats | Verified 2026-04-16 |
| Business Profile Terms | https://support.google.com/business/answer/9292476?hl=en | Business entity terms for claimed profiles and authorized representative requirements | Verified 2026-04-16 |
| Local Search Ads | https://support.google.com/google-ads/answer/7040605?hl=en | Maps ad surfaces, promoted pins, map search ads, map suggest ads, business advertiser context | Verified 2026-04-16 |

## Detailed Design

### Source-Backed Product Requirements

- The public mobile listings position Google Maps around live traffic, real-time GPS navigation, driving/walking/cycling/transit routes, more than 250 million businesses and places, user reviews/photos, saved lists, offline maps, Street View, Immersive View, Lens in Maps, reservations/orders/bookings, and contributor-updated map data.
- iOS must support iPhone, iPad, Apple Watch, and iMessage surfaces where the App Store listing exposes compatibility; Android must support phones/tablets and Wear OS-style glance/search/navigation surfaces where the Play listing exposes them.
- The default signed-in surface must prioritize map search, current-location recentering, category exploration, saved/recent places, route entry, account/settings, and permission-denied fallback.
- Search must support address/place/category/coordinate queries, nearby search, filters such as hours/price/rating/cuisine where data exists, map pins, list results, ad labeling, and transparent ranking inputs based on relevance, distance, and prominence.
- Place detail must support name, category, address, hours, phone/website, photos, reviews, ratings, busy/popular-time style indicators when available, accessibility attributes, menu/order/reservation/hotel links when provider-reviewed, save/share/directions, suggested edits, and report problem.
- Directions must support route preview, origin/destination editing, multiple destinations where mode allows, mode-specific constraints, alternatives, route options such as toll/highway/ferry/eco preference, ETA, distance, step list, and "follow real-world signs and laws" safety copy.
- Turn-by-turn navigation must require current location, use voice and visual instructions, expose mute/alerts settings, lane/traffic/incidents where available, search along route, share trip progress, stop navigation, route recalculation, GPS lost, battery-saving, and reroute recovery states.
- Navigation must not target oversized, emergency, commercial fleet, aviation, maritime, or hazardous-materials users unless separate routing data and legal review are completed.
- Public transit must model agencies, stops, departures, delays, transfers, fare/payment hints, walking segments, service alerts, limited coverage, and provider freshness separately from driving traffic.
- Offline maps must support selectable download regions, device/SD storage, expiration/update state, deletion/rename, region/legal limitations, and degraded behavior without live traffic or alternate route discovery.
- Saved places must support default and custom lists, labels, home/work, recently saved, nearby saved, shared lists, private/public visibility, and account-sync conflict behavior.
- Reviews/photos/contributions must be public, non-anonymous, editable/deletable by the contributor, policy-moderated, and blocked behind account, age, spam/fraud, and UGC safety gates.
- Business profile owner surfaces must be separate from consumer place editing; claimed businesses need ownership/authorization, verification state, pending review, audit history, and Business Profile terms acceptance.
- Street View-like and Immersive/Lens-like features require licensed imagery, device compatibility, camera permission where applicable, region/coverage flags, blur/privacy request flows, motion comfort controls, and feature flags until provider coverage is validated.
- Location sharing must be opt-in, person-scoped, time-bounded or until-off, revocable, blocked-user aware, age/domain/region gated, and explicit about recipient visibility such as name, photo, device location, battery, ETA, and notifications.
- Timeline-like history must be opt-in, distinguish device-local and cloud backup state, support delete visit/day/range/all, auto-delete, export where applicable, sensitive-place handling, and warnings about unrecoverable deletion.
- Maps activity must be separable from Timeline history, reviews/photos, saved lists, labels, and other account data so deletion UX does not overclaim what it removes.
- Ads and promoted places may exist only as clearly labeled original ad surfaces; ad ranking, billing, targeting, and measurement must be independently designed and privacy-reviewed.

## Core User Journeys

- New user installs the app, sees original privacy/location education, searches for a place without granting location, grants approximate or precise location only when needed, and reaches a usable map/search surface.
- Returning user opens the app, recenters on current location, searches a category nearby, filters results, opens a place detail, checks hours/reviews/photos/accessibility, saves the place, shares it, and starts directions.
- Driver previews routes, chooses a route option, starts turn-by-turn navigation, hears voice guidance, sees traffic/incidents, searches along route, shares trip progress, loses GPS, reroutes, and stops navigation safely.
- Transit rider searches a destination, compares departure/arrival options, sees transfers, service alerts, walking segments, fare/payment hints, agency/source freshness, and can save a frequent trip.
- Traveler downloads an offline area before a trip, confirms storage/freshness, searches and drives while offline, sees degraded no-traffic behavior, and updates or deletes the offline map after reconnect.
- User creates a custom list of places, labels home/work, shares a list, removes a place, handles private/public visibility, and resolves account-sync conflicts across devices.
- Contributor writes a review, uploads a photo/video, answers a place question, suggests an edit, sees public identity/privacy implications, and handles policy hold, rejection, edit, or deletion.
- Business owner claims or opens a business profile, verifies ownership, edits hours/address/photos/attributes, sees pending review, responds to customer-facing issues, and accepts business-specific terms.
- User shares real-time location with a trusted contact, limits duration, shares ETA during navigation, receives an arrival/departure notification request, denies or blocks a requester, and stops sharing.
- Privacy-focused user opens settings, reviews Maps activity, Timeline-like history, location-sharing state, contribution visibility, ad personalization, data export, and account deletion paths.
- User explores Street View-like imagery, switches to a map preview, reports a blur/content issue, uses Lens-like camera discovery where available, and sees graceful fallback when coverage or device support is missing.
- User encounters wrong directions, a closed road, fake reviews, unsafe content, wrong place info, or a privacy-sensitive location and reports the issue through an auditable support/moderation flow.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Consent | Entry, account, terms, privacy, permission education | sign in, guest continue, legal links, location prompt | new, returning, signed-out, managed account | blocked region, underage, auth failure, unsupported OS |
| Map Home | Default map/search surface | search, current location, layers, categories, recenter, account | empty, current location, signed-out, offline cached | permission denied, GPS weak, stale tiles, provider outage |
| Search Results | Local/category/address results | query, filters, map pan, category chips, ads | list, pins, no-results, sponsored-labeled | ambiguous query, stale data, unsafe area alert, ad disclosure |
| Place Detail | Inspect place, save, share, call, route, contribute | tabs, photos, reviews, directions, save, edit/report | open, closed, busy, saved, claimed business | unverified business, policy hold, inaccessible, removed |
| Directions Preview | Compare route options before navigation | origin, destination, mode, route options, departure/arrival time | driving, transit, walking, cycling, ride-share | no route, limited coverage, toll/ferry conflict, unsafe mode |
| Live Navigation | Turn-by-turn guidance and recovery | start/stop, voice, alerts, reroute, share trip, report incident | active, rerouting, GPS lost, background/lock screen | wrong turn, traffic change, tunnel, battery low, safety warning |
| Transit Trip | Transit-specific route execution | departure choice, stop details, alerts, save trip | on time, delayed, transfer, walking segment | agency outage, missed transfer, fare unknown, last service |
| Offline Maps | Download and manage map areas | select area, download, update, rename, delete, storage | downloading, ready, expired, auto-update | unavailable region, low storage, corrupt download, no traffic |
| Saved/You | Lists, labels, recent places, trips, Timeline entry | save, list edit, share, filter, label home/work | private list, shared list, nearby saved, recent | sync conflict, hidden place, deleted place, activity disabled |
| Contributions | Reviews, ratings, photos, edits, questions | write, upload, edit, delete, report, profile | draft, public, pending review, removed | policy violation, fake engagement, private info, spam hold |
| Business Profile | Owner/manager place management | verify, edit info, photos, hours, attributes, messages | unclaimed, claimed, pending review, suspended | unauthorized owner, duplicate profile, business ineligible |
| Street View/Immersive | Street-level or 3D preview | layer, thumbnail, pan, move, date, report blur | available, split-screen, historic date, shared | no coverage, blurred, motion discomfort, imagery takedown |
| Lens/AR Discovery | Camera-based place discovery | camera, mic/query, AR overlay, place card | permission prompt, active, unsupported, no match | camera denied, low coverage, unsafe walking, device unsupported |
| Location Sharing | Share or view real-time location | contacts, duration, ETA share, request, block | active share, requested, hidden, stopped | too young, domain blocked, region unavailable, stale location |
| Timeline/Activity | Personal history and Maps activity controls | opt in, backup, delete, auto-delete, export | off, on, backed up, device-local, pending delete | unrecoverable delete, cross-device mismatch, sensitive place |
| Settings/Privacy/Safety | Account, permissions, notifications, data, legal, support | toggles, export, delete, feedback, help | signed-in, signed-out, managed, pending | policy restriction, unavailable control, support outage |
| Report/Support | Wrong directions, content, place, abuse, privacy reports | report type, evidence, location, route, moderation reason | submitted, under review, resolved, appealed | duplicate report, urgent safety, malicious report, legal hold |

## Data Model

- `User`: account identity, locale, age/consent state, managed-domain state, profile visibility, deletion/export lifecycle, and trust/safety restrictions.
- `DeviceSession`: platform, app version, location permission, notification token, navigation capability, AR capability, CarPlay/Android Auto/Wear role, and last active state.
- `MapViewport`: center, zoom, bearing, tilt, layer set, tile source, freshness, offline coverage, attribution, and provider error state.
- `Place`: canonical place id, geometry, category, names, address, contact links, source/provider provenance, verification state, accessibility attributes, and deletion/takedown state.
- `BusinessProfile`: claimed owner/manager, verification method, editable fields, pending-review changes, terms acceptance, suspension state, and audit history.
- `SearchQuery`: query text, category, filters, viewport, user context, ranking inputs, ad eligibility, safe-mode, locale, and result freshness.
- `SearchResult`: place/reference id, rank, pin type, sponsored label, relevance reason code, distance, prominence, freshness, and unavailable reason.
- `PlaceContent`: photos, videos, reviews, Q&A, busy-time indicators, menus, reservations, booking links, attribution, moderation state, and visibility.
- `RoutePlan`: origin, destination, waypoints, mode, alternatives, route options, ETA, distance, emissions/fuel preference, toll/fare hints, and limitations.
- `NavigationSession`: active route, current step, GPS quality, voice/alert settings, reroute state, incident feed, trip-share state, and safety warnings.
- `TransitLeg`: agency, line, stop, departure/arrival, transfer, real-time delay, accessibility, fare/payment hint, service alert, and source freshness.
- `TrafficIncident`: type, location, severity, reporter/source, retention policy, validation votes, visibility, and expiration.
- `OfflineMapArea`: bounds, storage location, tile/route data version, download/update/delete state, expiry, legal/region blockers, and corruption state.
- `SavedList`: owner, places, labels, visibility, collaborators, share links, sort order, sync version, and deleted-place references.
- `Contribution`: review, rating, photo, video, edit, fact check, question/answer, author profile, policy scan, public visibility, edit/delete state, and appeal state.
- `LocationShare`: sharer, recipient, duration, ETA/session link, battery/status visibility, notification rules, block state, and revocation timestamp.
- `TimelineEntry`: visit, route, trip, source device, confidence, backup status, sensitive-place flag, delete/auto-delete state, and export metadata.
- `MapsActivityItem`: search, directions, place view, call/share action, personalization state, deletion state, and separation from Timeline/contributions/saved lists.
- `AdPlacement`: sponsored place/pin/result, advertiser, disclosure label, billing event, targeting context, measurement constraints, and fraud state.
- `SafetyReport`: wrong direction, road closure, UGC violation, privacy issue, business abuse, emergency risk, decision, escalation, appeal, and audit metadata.
- `AuditEvent`: append-only record for account, privacy, location sharing, Timeline, contribution moderation, business profile, ads, route safety, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with managed-account, age, region, and deletion-state gates.
- `GET /map/tiles?z=&x=&y=&layers=&version=`: licensed tile/overlay reads with attribution, cache hints, offline eligibility, and provider error codes.
- `GET /places/:id`, `GET /places/resolve?lat=&lng=`, `GET /places/autocomplete?query=`: place reads, reverse geocode, autocomplete, provenance, authorization, freshness, and unavailable states.
- `GET /search?query=&lat=&lng=&bounds=&filters=&cursor=`: local search with filters, ad labels, ranking reason codes, pagination, safe-mode, locale, and stale-data indicators.
- `POST /directions`, `GET /routes/:id`: route planning with origin/destination/waypoints, mode, avoid options, departure/arrival time, alternatives, fare/toll hints, and limitation warnings.
- `POST /navigation/sessions`, `PATCH /navigation/sessions/:id`, `POST /navigation/sessions/:id/end`: navigation lifecycle, current position, reroute, incident alerts, voice state, and trip sharing.
- `GET /traffic/incidents`, `POST /traffic/incidents`, `POST /traffic/incidents/:id/vote`: incident feed, user reports, safe-reporting constraints, retention, and validation.
- `GET /transit/routes`, `GET /transit/departures`, `GET /transit/alerts`: agency/provider-backed transit data with freshness, accessibility, transfer, fare, and coverage metadata.
- `POST /offline-areas`, `GET /offline-areas`, `PATCH /offline-areas/:id`, `DELETE /offline-areas/:id`: offline map selection, download manifest, update, rename, deletion, storage, expiry, and region blockers.
- `GET /saved-lists`, `POST /saved-lists`, `PATCH /saved-lists/:id`, `POST /saved-lists/:id/places`, `DELETE /saved-lists/:id/places/:placeId`: saved places, labels, visibility, share links, and conflict resolution.
- `GET /contributions`, `POST /reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id`, `POST /photos`, `DELETE /photos/:id`, `POST /edits`: public UGC lifecycle with scan, moderation, appeal, and public profile disclosure.
- `GET /business-profiles/:id`, `POST /business-profiles/:id/claim`, `PATCH /business-profiles/:id`: owner-managed business data with verification, authorized representative checks, pending review, and audit.
- `GET /streetview/coverage`, `GET /streetview/panoramas/:id`, `POST /streetview/reports`: licensed street imagery, coverage, blur/report requests, historic-date availability, and takedown state.
- `POST /lens/sessions`, `PATCH /lens/sessions/:id`: camera-based discovery session with device support, location/camera permissions, coverage, recognition confidence, and safe-use copy.
- `POST /location-shares`, `GET /location-shares`, `PATCH /location-shares/:id`, `DELETE /location-shares/:id`, `POST /location-shares/:id/notifications`: real-time sharing, ETA, requests, deny/block, arrival/departure notifications, and revocation.
- `GET /timeline`, `PATCH /timeline/settings`, `DELETE /timeline/items`, `POST /timeline/export`: opt-in history, backup/import state, sensitive-place handling, auto-delete, export, and irreversible deletion warnings.
- `GET /activity/maps`, `DELETE /activity/maps`: Maps activity reads/deletes with explicit exclusions for Timeline, saved lists, contributions, labels, and other account data.
- `GET /ads/placements`, `POST /ads/events`: labeled ad placements with privacy-safe targeting, measurement, billing, fraud prevention, and no client-trusted billing state.
- `POST /reports`, `GET /reports/:id`, `POST /appeals`: content, route, road, privacy, business, and safety issue reporting with escalation and audit trail.
- `POST /data-export`, `DELETE /account`: account privacy workflows with async status, active share/offline/contribution/business consequences, and provider retention caveats.

## Realtime, Push, And Offline Behavior

- Navigation sessions must reconcile GPS updates, route progress, traffic, incidents, reroutes, voice prompts, lock-screen/background state, and app termination against canonical route state.
- The client may cache map tiles, search results, place detail summaries, saved lists, recent routes, settings, and recent contribution drafts with source freshness and attribution.
- Offline maps may enable map display and selected navigation/search features, but live traffic, incidents, alternate route discovery, transit freshness, ads, and contribution submission must degrade or block clearly.
- Route and traffic updates can use websocket/SSE/push-assisted polling with cursor reconciliation; duplicate incident, reroute, or ETA events must collapse by stable event ids.
- Low-risk edits such as draft reviews, list changes, labels, and issue reports may queue locally; account deletion, location sharing, business edits, contribution publication, ad events, and privacy deletes require server confirmation.
- Location sharing must continue only within explicit permission, duration, and OS background-location constraints, and must stop or degrade visibly when background refresh, battery, account, or network state fails.
- Timeline-like history must handle device-local storage, optional encrypted/cloud backup, missing backup, cross-device import, auto-delete, and conflict behavior without silently losing user data.
- Push notifications must be opt-in, category-controlled, and content-minimized for trip sharing, location notifications, route alerts, contribution decisions, business-profile updates, support cases, and security events.
- Car, watch, and AR companion surfaces must be treated as feature-flagged clients with reduced interaction models, independent permission states, and native-device manual verification blockers.

## Permissions, Privacy, And Safety

- Location, background location, motion/activity, Bluetooth/local network, camera, microphone, photos/files, contacts, notifications, and calendar/email-derived reservation access must be requested only when the user invokes a related feature.
- Default analytics must exclude precise routes, raw GPS traces, home/work labels, private saved lists, Timeline entries, raw reviews/photos, business-owner documents, payment credentials, and contact identities.
- Location permission UX must distinguish no location, approximate, precise, while-in-use, always/background, OS-revoked, and managed-device states with usable fallback search.
- Route and navigation UX must include safety copy: obey laws/signs, stay aware, avoid interaction while driving, do not use unsupported vehicle classes, and report only when safe.
- Live navigation, traffic, route ranking, and ETA must expose confidence/freshness states and cannot guarantee correctness, emergency suitability, or legal compliance.
- Location sharing must show who can see the user, what data they can see, whether notifications are enabled, when sharing expires, and how to stop or block.
- Timeline-like history must be opt-in, user-reviewable, deletable, exportable, and explicit about backup, unrecoverable deletion, sensitive-place handling, and Web & App Activity separation.
- User contributions must be moderated for fake engagement, impersonation, misinformation, harassment, hate, personal info, sexual content, dangerous content, child safety, restricted goods, spam, off-topic content, and conflicts of interest.
- Reviews/photos must disclose public identity, contribution visibility, location metadata exposure, edit/delete controls, and policy-removal/appeal states.
- Business profile management must require authorized representative checks, audit logs, pending review, duplicate/fraud detection, and separate business terms.
- Ads must be clearly labeled, separated from organic ranking, privacy-reviewed for targeting/measurement, and blocked for sensitive places or regulated categories until legal review clears them.
- Street imagery, AR/Lens, and place media must support blur/privacy requests, takedown, coverage limitations, accessibility fallback, and motion-sickness/reduced-motion controls.
- Launch owner: navigation safety owner for route/risk disclaimers, privacy owner for location/history/sharing, UGC safety owner for contributions, business owner for Business Profile surfaces, ads owner for monetization, accessibility owner for inclusive routing.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, permission primer viewed, location permission changed, search performed, place opened, route previewed, navigation started/ended, reroute occurred, offline map downloaded, saved place changed, list shared, report submitted, privacy setting changed, data export requested, account deletion requested.
- Navigation reliability metrics must use coarse route/session ids, event types, latency, freshness, provider status, and failure codes rather than raw GPS traces or home/work labels.
- Contribution analytics must use object ids, policy categories, moderation states, and appeal outcomes, not raw review text, photos, faces, license plates, or personal data.
- Search and place analytics must separate organic rank diagnostics, sponsored placement logs, and user-visible analytics, with sampling and retention reviewed for location sensitivity.
- Monetization can include original local ads, sponsored pins, booking/referral links, business tools, premium offline/storage tiers, or fleet/provider integrations later, but pricing, names, offers, Google One ties, and Google Ads positioning must be original.
- Local ads must include sponsored labels, advertiser eligibility, fraud prevention, billing audit, restricted-category controls, and no hidden influence on organic local ranking.
- Booking/order/reservation/ride-share handoffs must disclose provider ownership, availability, cancellation/refund path, deep-link failure, and user data shared with the provider.
- Any paid map data, routing provider, transit feed, traffic feed, imagery provider, or geocoder must be licensed and monitored for usage limits, attribution, retention, and regional restrictions.

## Edge Cases

- First launch offline, unsupported OS, unavailable GPS, denied location, approximate-only location, managed account, too-young account, blocked region, or expired session.
- Search result is an ad, duplicate place, closed place, moved business, fake listing, private address, sensitive location, disputed border, or stale provider result.
- Route crosses tolls, ferries, private roads, closures, low-clearance roads, unpaved roads, restricted zones, unsafe sidewalks, no bike lanes, or transit service gaps.
- Navigation starts without GPS, loses GPS in tunnel/garage, changes route while driving, ETA swings sharply, voice guidance is muted, phone call interrupts, or battery/background limits stop updates.
- Transit agency feed is stale, departure is canceled, last train is missed, transfer time is impossible, accessibility is unavailable, fare is unknown, or service alert conflicts with route.
- Offline map download is unavailable by contract/region, expires, corrupts, fills storage, moves between SD/device storage, or no longer matches current road data.
- Saved list contains deleted/private/closed places, shared list recipient loses access, home/work label changes, sync conflict occurs, or Web & App Activity is disabled.
- Review/photo upload includes private information, fake engagement, restricted goods, minors, license plates, medical/sensitive place details, copyright-infringing media, or is removed after publication.
- Business owner loses authorization, duplicate profiles merge, edits are rejected, hours conflict with holidays, scam report arrives, or profile is suspended.
- Location share recipient is blocked, domain/age/region disallows sharing, background location stops, recipient adds notifications, or ETA sharing continues after navigation cancellation.
- Timeline data is deleted without backup, backup restore fails, sensitive-place visit is auto-deleted, Web & App Activity still has related items, or export cannot reimport history.
- Street View-like imagery lacks coverage, blur/takedown is pending, historic imagery is missing, Immersive/Lens is unsupported, camera permission is denied, or AR use is unsafe while walking.
- Data export, account deletion, legal hold, ad billing dispute, UGC appeal, business verification, or support case remains pending after the user expects immediate completion.

## Test Plan

- Unit tests for location permission states, map viewport state, search filters, place-detail normalization, saved-list sync, route options, idempotency keys, and privacy-safe analytics.
- Unit tests for navigation state: start, GPS lost, reroute, traffic alert, incident report, mute/unmute, share trip, stop navigation, background, and duplicate events.
- Unit tests for Timeline/activity privacy: opt in/out, backup state, delete item/day/range/all, auto-delete, sensitive-place flag, export request, and Maps activity exclusions.
- Contract tests for every API route, including pagination, tile attribution, place freshness, search ad labeling, directions alternatives, transit alerts, offline manifests, UGC moderation states, and account deletion.
- Integration tests for onboarding, signed-out search, location-denied search, place detail, save/share, directions preview, live navigation mock, route report, and settings/data controls.
- Offline tests for cached map/search/place reads, offline area download/update/delete, no-traffic route behavior, queued list changes, blocked privacy deletes, corrupt cache, and reconnect reconciliation.
- Transit tests for agency freshness, route options, service alerts, missed transfer, accessibility flag, fare unknown, and no-service route.
- Contribution tests for review/photo draft, publish, edit, delete, moderation hold, policy removal, appeal, fake engagement block, public profile disclosure, and private-info redaction.
- Business profile tests for claim, verification pending, authorized edit, unauthorized edit, pending review, duplicate/suspension state, business terms acceptance, and audit events.
- Location-sharing tests for start, duration expiry, ETA share, recipient request, deny, block, background update failure, notification add/remove, and stop sharing.
- Privacy tests for activity delete, Timeline delete, data export, account deletion, ad personalization off, contribution visibility, background-location revocation, and analytics redaction.
- Safety tests for wrong directions report, unsafe road/incident report, emergency/oversized vehicle warning, distracted-driving interaction limits, sensitive place, child safety, harassment, restricted goods, and fake reviews.
- Imagery/AR tests for Street View coverage, no coverage, blur report, historic date absent, split-screen, camera denied, unsupported device, motion-reduction mode, and feature flag off.
- Accessibility tests for screen-reader map summaries, route-step labels, dynamic type, focus order, contrast, reduced motion, haptic/audio alternatives, voice guidance controls, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, live GPS navigation, real transit/traffic behavior, offline downloads, location sharing, Timeline/activity controls, reviews/photos, business profile management, CarPlay/Android Auto/Wear OS, Lens/AR, push payloads, and regional feature availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Google Maps assets, map tiles, Street View imagery, place data, reviews/photos, private APIs, brand copy, proprietary route/ranking systems, ads inventory, or Local Guides data.
- New and returning users can search places, view place details, save/share places, preview routes, start/stop navigation, use offline maps, and recover from denied location or network loss.
- Driving, walking, cycling, transit, and ride-share/provider handoff flows are represented with mode-specific constraints, freshness, safety copy, and deterministic error states.
- Location sharing, Timeline-like history, Maps activity, contribution visibility, data export, account deletion, and ad personalization controls are accessible from settings and covered by tests.
- Reviews, photos, map edits, business profile changes, traffic incidents, and support reports include moderation, audit, appeal, abuse prevention, and privacy disclosures.
- Street View-like, Immersive/Lens-like, CarPlay/Android Auto, Wear OS, business, ads, and provider-backed booking/order surfaces are feature-flagged until licensing and manual verification clear them.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which licensed mapping stack will back V1: Mapbox, HERE, TomTom, OpenStreetMap-derived provider, native Apple/Google SDK under terms, or a custom tile/routing provider?
- Which routing, traffic, transit, geocoding, place-search, imagery, weather, accessibility, EV charging, bike/scooter, and ad providers will be licensed for launch regions?
- Will V1 support signed-out search/navigation, and if yes, which saved, history, contribution, and location-sharing features remain account-gated?
- Are Timeline-like history, public contributions, business profile management, local ads, Street View-like imagery, and AR/Lens-like features in V1, or explicitly deferred?
- Which launch regions determine road-safety language, transit feeds, data rights, age requirements, business eligibility, ad restrictions, and sensitive-place handling?
- What is the accepted route safety posture for wrong directions, emergency contexts, accessibility routing, low-clearance roads, road closures, and disputed geographic data?

## Build Plan

- Phase 1: scaffold app shell, map home, signed-out search, current-location permission flow, place detail, save/share, settings/legal links, privacy-safe analytics, and provider attribution.
- Phase 2: add directions preview, route options, route-step model, live navigation mock, GPS/reroute states, traffic/incident feed abstraction, trip sharing, and navigation safety tests.
- Phase 3: add transit, walking/cycling mode refinements, saved trips, search filters, category exploration, accessibility attributes, and provider freshness indicators.
- Phase 4: add offline maps, storage/update/delete lifecycle, degraded offline search/navigation behavior, corrupt-cache recovery, and reconnect reconciliation.
- Phase 5: add saved lists, labels, location sharing, Timeline-like history, Maps activity controls, export/delete account jobs, privacy settings, and background-location notification tests.
- Phase 6: add reviews/photos/contributions, UGC moderation, report/appeal flows, business profile claim/edit surfaces, and trust/safety review.
- Phase 7: evaluate Street View-like imagery, Immersive/Lens-like AR, local ads, booking/order/ride-share handoffs, CarPlay/Android Auto, Wear OS, and native/manual verification only after licensing, privacy, safety, accessibility, and platform-policy approvals.

## Next Steps

- Use this spec as the pattern for upgrading `033-airbnb.md`, `038-doordash.md`, and the remaining architecture-teaching specs.
- Resolve the manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
