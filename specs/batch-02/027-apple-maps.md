# Apple Maps-Style Clone Spec

> Metadata
> - Inspiration app: Apple Maps
> - Category: Maps, navigation, local search, guides, offline maps, privacy-preserving location services, and platform-integrated routing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public App Store page, Apple Maps product/support pages, Apple Location Services privacy guidance, Apple legal/privacy pages, and current public listing notes.
> - Manual verification blockers: native iOS/iPadOS/watchOS screen capture, turn-by-turn driving/walking/cycling/transit walkthroughs, CarPlay behavior, Apple Watch handoff, Look Around coverage, EV routing, offline map download/update, guide creation, Favorites/Home/Work sync, route sharing, place reporting, business/place data provider behavior, push payloads, and region-specific map availability still require lawful Apple test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, map styling, map tiles, route data, place data, reviews/photos, guides, Look Around-like imagery, traffic feeds, transit feeds, search ranking, and privacy implementation.

## Overview

Build an original mobile maps app inspired by Apple Maps' public workflow: private map search, place cards, guides, favorites, route planning, turn-by-turn navigation, offline maps, cycling/walking/driving/transit directions, Look Around-like browsing, incident/place reporting, platform handoff, and location privacy controls.

The clone must not copy Apple branding, protected UI artwork, screenshots, marketing copy, proprietary map data, Look Around imagery, route algorithms, private APIs, Apple place databases, or Apple privacy claims. Functional parity should be expressed through original product language, licensed mapping providers, independently designed ranking/routing logic, and transparent region/provider limits.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide map search, place details, saved places, guides, route preview, turn-by-turn navigation, offline maps, issue reporting, settings, privacy controls, and support paths.
- Support driving, walking, cycling, transit, hiking/custom walking routes, and EV-compatible route states where providers and launch regions allow.
- Preserve safety expectations around route correctness, real-world road signs, distracted driving, offline freshness, trail safety, emergency limitations, location privacy, and accessibility.
- Expose privacy controls for location permission, precise/background location, significant-location-like history, search/activity data, data export, account deletion, and provider data sharing.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Apple Maps-branded app or imply affiliation with Apple, transit agencies, map data providers, rating providers, automakers, or guide publishers.
- Do not scrape Apple Maps, reuse private Apple APIs, replay Apple Maps traffic, copy map tiles, copy Look Around imagery, copy place data, clone proprietary ranking/routing systems, or reproduce Apple marketing copy.
- Do not claim exact App Store, native-device, CarPlay, Apple Watch, Look Around, EV routing, transit, offline map, push-notification, or region parity until manual verification blockers are resolved.
- Do not ship safety-critical navigation claims for emergency, commercial fleet, oversized, hazardous-material, aviation, maritime, or backcountry rescue use without separate domain review.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/apple-maps/id915056765 | Official iOS/iPadOS/watchOS listing, Navigation category, supported devices, privacy-protected positioning, topographic maps, hiking routes, offline routes, search/place card claims | Verified 2026-04-17 |
| Google Play Platform Blocker | https://play.google.com/store/apps | No official first-party Apple Maps Android app is published; Android native parity remains platform-blocked | Verified 2026-04-17 |
| Apple Maps Product Page | https://www.apple.com/maps/ | Public feature positioning for navigation, exploration, guides, privacy, Look Around, indoor maps, EV routing, cycling, transit, and platform integration | Verified 2026-04-17 |
| Apple Maps Web | https://maps.apple.com/ | Public web surface for search, place discovery, route preview, and non-native availability orientation | Verified 2026-04-17 |
| Apple Maps User Guide | https://support.apple.com/guide/maps/welcome/mac | Canonical Maps help entrypoint for search, guides, directions, Look Around, traffic, and reporting workflows | Verified 2026-04-17 |
| Offline Maps On iPhone | https://support.apple.com/en-us/HT213829 | Offline map download, select-region limits, storage, Apple Watch proximity, supported areas, and offline navigation behavior | Verified 2026-04-17 |
| Offline Maps On iPad | https://support.apple.com/guide/ipad/download-offline-maps-ipadc6e7e4d7/ipados | Offline maps management, rename/resize/delete, auto-update settings, and unavailable-region handling | Verified 2026-04-17 |
| Location Services Privacy | https://support.apple.com/en-us/HT203033 | Location permission states, GPS accuracy limits, Maps location marker behavior, data service caveats, and crowd-sourced traffic/location data notes | Verified 2026-04-17 |
| Apple Privacy Policy | https://www.apple.com/legal/privacy/en-ww/ | Personal data, location, account, product improvement, privacy rights, retention, and regional privacy obligations | Verified 2026-04-17 |
| Apple Terms Of Use | https://www.apple.com/legal/internet-services/terms/site.html | Public site/service terms, acceptable use, intellectual property, and service availability caveats | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listing and product pages position Apple Maps around privacy-protected navigation, search, place cards, ratings/photos/price-level comparison, topographic maps, hiking trails, custom walking routes, offline access, turn-by-turn directions, and Apple device integration.
- Home must support current-location recentering, search, nearby categories, saved locations, recent places, guides, route entry, map layers, account/settings, and permission-denied fallback.
- Search must support place, address, category, coordinate, and natural-language queries with map pins, list cards, filters, ranking explanation codes, no-results states, and provider freshness.
- Place cards must support name, category, address, hours, ratings/reviews summary, photos, price level, contact links, website, guide/list membership, directions, share, report issue, and unavailable/provider-stale states.
- Guides must support curated and user-created lists, save/remove, share, map/list presentation, provider attribution, deleted-place handling, and offline/freshness caveats.
- Directions must support origin/destination editing, driving/walking/cycling/transit modes, route alternatives, ETA, distance, tolls/ferries/highways options where data exists, step list, and safety warnings.
- Navigation must require active location, expose visual and voice guidance, reroute, lane/turn hints where available, incident/traffic overlays, speed/road safety notices, stop navigation, GPS-lost, low-battery, and background states.
- Offline maps must support selectable regions, size preview, download/update/delete/rename/resize, storage limits, supported-area blockers, provider freshness, and no-overclaim behavior for live traffic or transit.
- Look Around-like and topographic/hiking features require licensed imagery/elevation/trail data, coverage flags, privacy blur/report flows, motion comfort controls, and manual verification before parity claims.
- Platform companions such as CarPlay and watch surfaces must be feature-flagged clients with reduced interaction models, independent permission states, and native-device manual blockers.
- Account settings must expose location permissions, notification settings, saved places, guides, search/activity deletion, privacy policy, terms, data export, support/reporting, and account deletion path where an account model exists.

## Core User Journeys

- New user opens the map, searches without location access, grants precise location only when starting a route, and sees usable search fallback if permission is denied.
- Returning user searches for a restaurant, compares place cards, saves it to a guide, shares it, starts directions, and reports stale business information.
- Driver previews multiple routes, starts turn-by-turn navigation, receives traffic or incident context, loses GPS, reroutes, and ends navigation safely.
- Transit rider compares departures, sees walking segments and provider freshness, saves a frequent destination, and handles service-alert or unavailable-region states.
- Traveler downloads an offline region, confirms storage/freshness, navigates while offline, sees live-feature degradation, and deletes or updates the map later.
- Hiker opens a topographic or trail route, reviews elevation/difficulty/provider disclaimers, saves the route offline, and sees launch-blocking warnings for unsupported or unsafe coverage.
- Privacy-focused user reviews location permissions, saved places, route/search activity, data export, deletion, support, and provider attribution settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Consent | Entry, legal, privacy, and permission education | continue, legal links, location primer | new, returning, signed-out | unsupported OS, blocked region, denied permission |
| Map Home | Default map/search surface | search, recenter, layers, guides, route | current location, no location, offline cached | stale tiles, provider outage, GPS weak |
| Search Results | Place/address/category results | query, filters, map pan, result tap | list, pins, no results, corrected query | ambiguous query, private address, stale provider |
| Place Card | Inspect place and choose actions | save, guide, call, website, route, report | open, closed, saved, shared | removed place, inaccessible, disputed data |
| Guides/Saved | Saved places and curated lists | add, remove, share, sort | private, shared, offline, empty | deleted place, sync conflict, stale list |
| Route Preview | Compare route modes and options | origin, destination, mode, avoid options | driving, walking, cycling, transit | no route, unsafe route, limited coverage |
| Live Navigation | Turn-by-turn guidance | start, stop, reroute, voice, report | active, rerouting, background | GPS lost, tunnel, battery low, wrong turn |
| Offline Maps | Download and manage map areas | select, download, rename, resize, delete | ready, downloading, expired | unsupported region, low storage, corrupt download |
| Look Around/Imagery | Street-level or preview browsing | pan, move, date, report | available, unavailable, shared | no coverage, privacy blur, motion discomfort |
| Trails/Topographic | Hiking/custom route review | trail, elevation, save, navigate | online, offline, active route | unsafe trail, region unsupported, stale data |
| Report Issue | Place, route, road, imagery, privacy reports | report type, evidence, location | submitted, under review, resolved | duplicate, urgent safety, legal hold |
| Settings/Privacy | Account, location, data, notifications, legal | toggles, export, delete, help | signed-in, signed-out, managed | unavailable control, deletion caveat |

## Data Model

- `User`: identity, locale, age/consent, account sync state, privacy settings, export/delete lifecycle, and trust/safety restrictions.
- `DeviceSession`: platform, app version, location permission, notification token, CarPlay/watch capability, offline storage state, and last active state.
- `MapViewport`: center, zoom, bearing, layer set, tile source, attribution, freshness, offline coverage, and provider error.
- `Place`: provider id, geometry, category, names, address, contact links, hours, ratings summary, media references, provenance, verification, and takedown state.
- `Guide`: owner/provider, title, places, visibility, share links, sort order, offline eligibility, sync version, and deleted-place references.
- `RoutePlan`: origin, destination, waypoints, mode, alternatives, ETA, distance, route options, toll/fare hints, safety warnings, and limitation flags.
- `NavigationSession`: active route, current step, GPS quality, voice state, reroute state, incident feed, background state, and safety notices.
- `OfflineMapArea`: bounds, storage size, data version, download/update/delete state, expiry, region blocker, and corruption state.
- `ImageryCoverage`: provider, geometry, date, blur/takedown state, motion setting, and unavailable reason.
- `Report`: place, route, imagery, privacy, road, or safety issue with evidence, decision, escalation, appeal, and audit metadata.
- `AuditEvent`: append-only record for auth, location permission, route, report, saved-place, guide, offline map, privacy, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account lifecycle with device, region, and deletion gates.
- `GET /map/tiles?z=&x=&y=&layers=&version=`: licensed tile reads with attribution, cache hints, offline eligibility, and provider errors.
- `GET /places/autocomplete`, `GET /places/:id`, `GET /places/reverse-geocode`: place search/detail with provenance, freshness, locale, and unavailable states.
- `GET /search?query=&lat=&lng=&bounds=&filters=&cursor=`: search with map/list results, ranking reason codes, pagination, safe-mode, and stale indicators.
- `POST /routes`, `GET /routes/:id`: route planning with mode, options, alternatives, ETA, distance, fare/toll hints, and limitation warnings.
- `POST /navigation/sessions`, `PATCH /navigation/sessions/:id`, `POST /navigation/sessions/:id/end`: navigation lifecycle, current position, reroute, voice, incident, and end state.
- `POST /offline-areas`, `GET /offline-areas`, `PATCH /offline-areas/:id`, `DELETE /offline-areas/:id`: offline map area selection, manifest, update, rename, resize, deletion, storage, and region blockers.
- `GET /guides`, `POST /guides`, `PATCH /guides/:id`, `POST /guides/:id/places`, `DELETE /guides/:id/places/:placeId`: saved places, guides, sharing, and conflicts.
- `GET /imagery/coverage`, `GET /imagery/:id`, `POST /imagery/reports`: licensed street-level imagery, coverage, blur/report, and takedown state.
- `POST /reports`, `GET /reports/:id`, `POST /appeals`: place, route, road, imagery, privacy, and safety reports with audit and escalation.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights and irreversible deletion warnings.

## Realtime, Push, And Offline Behavior

- Navigation sessions reconcile GPS updates, route progress, traffic/incidents, reroutes, voice prompts, lock-screen/background state, and app termination against canonical route state.
- The client may cache tiles, place summaries, saved places, guides, recent routes, settings, and recent reports with source freshness and attribution.
- Offline maps enable map display and selected directions/search where data exists; live traffic, incident reporting, imagery, provider-fresh transit, and report submission must degrade or block clearly.
- Low-risk edits such as saved-place changes and report drafts may queue locally; privacy deletes, location sharing if added later, and report publication require server confirmation.
- Push notifications must be opt-in and content-minimized for route alerts, report decisions, saved-place changes, offline map updates, support cases, and security events.

## Permissions, Privacy, And Safety

- Location, background location, motion/activity, Bluetooth/local network, camera/photos for reports, contacts for sharing, and notifications must be requested only when a user invokes a related feature.
- Default analytics must exclude raw GPS traces, home/work labels, saved private lists, exact routes, report evidence, and precise search history unless explicitly needed and privacy-reviewed.
- Route and navigation UX must warn users to obey signs/laws, avoid interaction while driving, and not use unsupported vehicle classes or emergency scenarios.
- Offline/trail/topographic guidance must expose freshness, coverage, emergency unsuitability, weather/provider limits, and region blockers.
- Reports and guides must be moderated for privacy invasion, false information, harassment, spam, dangerous instructions, and restricted content.
- Launch owners: navigation safety owner, privacy owner, provider licensing owner, accessibility owner, offline/data freshness owner, and support/moderation owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, permission primer viewed, search performed, place opened, guide saved, route previewed, navigation started/ended, reroute occurred, offline map downloaded, report submitted, privacy setting changed, data export requested, account deletion requested.
- Reliability metrics must use coarse session ids, provider status, freshness, latency, mode, and failure codes rather than exact routes or raw GPS traces.
- Monetization can include original local ads, sponsored pins, paid offline/storage tiers, provider booking referrals, or business tools later, but pricing, names, ad ranking, and Apple positioning must be original and legal-reviewed.

## Edge Cases

- First launch offline, unsupported OS, denied location, approximate-only location, GPS unavailable, managed device, blocked region, or expired session.
- Search result is stale, duplicate, closed, private, disputed, sponsored, inaccessible, or removed by provider.
- Route crosses tolls, ferries, private roads, restricted zones, unsafe sidewalks, stale transit, unverified trails, or limited provider coverage.
- Navigation loses GPS, ETA changes sharply, voice is muted, a phone call interrupts, route provider fails, or app is killed in background.
- Offline map region is unsupported, corrupt, expired, too large, low-storage, or missing live route/traffic/transit data.
- Report contains private information, false claim, urgent safety issue, duplicate place, imagery takedown request, or legal hold.

## Test Plan

- Unit tests for search filters, place provenance, route options, offline map lifecycle, guide sync, report validation, privacy-safe analytics, and location permission states.
- Contract tests for every API route, including pagination, stale data, provider errors, route limitation codes, offline manifests, and report decisions.
- Integration tests for signed-out search, permission-denied search, place detail, guide save/share, route preview, navigation start/stop, offline map download, issue report, and privacy settings.
- Offline tests for cached map/place/route reads, stale indicators, blocked report submission, corrupt map data, reconnect reconciliation, and low-storage recovery.
- Safety tests for route warnings, unsupported vehicle classes, dangerous trail/road coverage, emergency limitation copy, and report moderation.
- Accessibility tests for dynamic type, screen reader labels, focus order, contrast, reduced motion, map/list alternatives, and large tap targets.
- Manual verification tests: native iOS/iPadOS/watchOS screenshots, CarPlay, Apple Watch, offline maps, Look Around, EV routing, transit, guide creation, route sharing, place reporting, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Apple assets, Apple map data, private APIs, proprietary ranking/routing systems, brand copy, Look Around imagery, or protected trade dress.
- Users can search, inspect place cards, save/share guides, preview routes, navigate, download offline maps, report issues, and recover from denied permissions or network loss.
- Map, route, offline, imagery, report, saved-place, privacy, and support states are represented as auditable server-side or provider-backed state machines.
- Location privacy, provider attribution, route safety, offline freshness, imagery privacy, reporting abuse, account deletion, and data export controls are accessible from settings and covered by tests.
- CarPlay, Apple Watch, Look Around, EV routing, topographic/trail parity, push payloads, and regional coverage remain feature-flagged until manual verification clears them.

## Open Questions

- Which licensed map, geocoder, routing, traffic, transit, place, imagery, elevation, trail, notification, analytics, and support providers will back V1?
- Which launch regions determine offline maps, transit, cycling, EV routing, trails, Look Around-like imagery, place data, and reporting availability?
- Will V1 include account sync, guide sharing, provider booking handoffs, local ads, business tools, or keep them behind feature flags?
- What retention rules apply to search history, route history, saved places, reports, offline maps, and support evidence?

## Build Plan

- Phase 1: app shell, map provider integration, search, place detail, saved places, guides, settings/legal links, and privacy-safe analytics.
- Phase 2: route preview, mode options, route alternatives, navigation session model, voice/visual guidance states, route-safety warnings, and route tests.
- Phase 3: offline map selection/download/update/delete, cached search/place/route support, stale indicators, storage recovery, and offline tests.
- Phase 4: reporting, provider attribution, moderation queues, privacy rights, support cases, accessibility audit, and report/privacy tests.
- Phase 5: Look Around-like imagery, topographic/trail routes, EV routing, platform companion surfaces, and manual verification gates after provider/legal review.

## Next Steps

- Resolve licensed provider choices for map tiles, geocoding, routing, traffic, transit, imagery, elevation, and trails.
- Complete lawful device verification for native iOS/iPadOS/watchOS, CarPlay, Apple Watch, offline, Look Around, route, transit, and push behavior.
