# Waze-Style Clone Spec

> Metadata
> - Inspiration app: Waze
> - Category: Driver-focused navigation, crowdsourced traffic, road alerts, route planning, toll/gas/parking discovery, and community map editing
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Waze Help pages, Waze legal/privacy pages, Waze partner documentation, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, live GPS navigation, real-time report submission, conversational reporting, CarPlay/Android Auto/Android Automotive behavior, toll pass configuration, gas/EV/parking availability, audio-player integrations, map editor permissions, account/profile settings, push payloads, ads, and regional feature availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, map styling, map data, traffic data, user reports, voices, audio integrations, ad inventory, map editor data, route algorithms, and community moderation systems.

## Overview

Build an original driver-first navigation app inspired by Waze's public workflow: destination search, route planning, live traffic-aware navigation, community incident reporting, road closures, toll estimates, gas/EV/parking discovery, planned drives, alternate routes, in-car display support, audio integration, community map editing, privacy controls, and safety limits.

The clone must not copy Waze branding, map styling, private APIs, reports, ad formats, voices, traffic feeds, map editor data, or proprietary ranking/routing logic. Functional parity should be expressed through original product language, licensed maps and traffic providers, independently designed report validation, and safe driver interaction constraints.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide mobile-first driving navigation with destination search, route preview, live navigation, alternate routes, speed/road alerts, user reports, toll estimates, gas/EV/parking discovery, planned drives, and settings.
- Support community reports for traffic, hazards, crashes, police, road closures, map issues, gas prices, and report confirmation/removal where lawful and safe.
- Preserve safety expectations around distracted driving, real-time reporting limits, route correctness, emergency/oversized-vehicle exclusions, speed/camera data legality, privacy, and UGC moderation.
- Expose privacy controls for precise/background location, account/profile visibility, search and drive history, ad personalization, report identity, data export, and account deletion.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Waze-branded app or imply affiliation with Waze, Google, map editors, advertisers, cities, parking/gas/EV providers, automakers, or audio services.
- Do not scrape Waze, reuse private Waze APIs, copy traffic reports, copy map editor data, copy voices, copy UI artwork, clone proprietary route/ranking systems, or reproduce support/legal copy.
- Do not claim exact App Store, Play Store, native-device, live GPS, CarPlay, Android Auto, Android Automotive, report, conversational AI, gas/parking/toll, ads, map editor, push-notification, or regional parity until manual verification blockers are resolved.
- Do not support emergency, oversized, commercial fleet, hazardous-material, aviation, maritime, or regulated dispatch navigation without separate domain review.
- Do not build runtime app code in this repository.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/waze-navigation-live-traffic/id323229106 | Official iOS listing, Navigation category, supported devices, age rating, live traffic, road alerts, tolls, gas/EV/parking, audio apps, CarPlay, privacy label, and emergency/oversized exclusions | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.waze | Official Android listing, package id, ads/data-safety orientation, downloads/rating scale, GPS navigation, alerts, traffic, rerouting, and community reporting claims | Verified 2026-04-17 |
| Waze Help Center | https://support.google.com/waze?hl=en | Canonical help topic inventory for route planning, driving, reporting, map editing, account, privacy, and in-car surfaces | Verified 2026-04-17 |
| Report Traffic | https://support.google.com/waze/answer/13740207?hl=en | Traffic report workflow, offline report queuing, username visibility, excessive-reporting limits, and in-car support notes | Verified 2026-04-17 |
| Report Road Hazards | https://support.google.com/waze/answer/13739290?hl=en | Hazard categories, confirmation/removal behavior, Android Auto/AAOS/CarPlay reporting states | Verified 2026-04-17 |
| Report Road Closures | https://support.google.com/waze/answer/13753511?hl=en | Closure report workflow, routing impact, planned closure path, and in-car feature limitations | Verified 2026-04-17 |
| Talk To Waze | https://support.google.com/waze/answer/15714791?hl=en | Conversational reporting, microphone permission, follow-up prompts, CarPlay support, and AAOS blocker | Verified 2026-04-17 |
| Toll Prices | https://support.google.com/waze/answer/9370512?hl=en | Toll estimate display, community inputs, route settings, pass handling, and congestion-toll limitation | Verified 2026-04-17 |
| Gas Prices | https://support.google.com/waze/answer/13739802?hl=en | Gas price editing, unsupported in-car surfaces, report freshness, and station availability states | Verified 2026-04-17 |
| Waze Data Feed | https://support.google.com/waze/partners/answer/10618035?hl=en | Partner traffic feed, incident categories, automatically detected jams, and 2-minute feed cadence for partners | Verified 2026-04-17 |
| Waze Privacy Policy | https://www.waze.com/en/legal/privacy | Account/location/activity/ad data collection, privacy controls, report visibility, and account deletion orientation | Verified 2026-04-17 |
| Waze Terms Of Use | https://www.waze.com/en/legal/tos | Service terms, acceptable use, community content, safety caveats, and platform limitations | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position Waze around community-powered live maps, GPS navigation, traffic updates, real-time safety alerts, automatic rerouting, toll prices, gas/EV/parking discovery, audio apps, and in-car display integration.
- Home must prioritize destination search, recent/favorite destinations, planned drives, drive now/leave later, current route status, report entry, settings, and permission-denied fallback.
- Search must support addresses, places, saved destinations, contacts where permitted, gas/EV/parking providers, route-along search, and ambiguous/no-result states.
- Route preview must support ETA, alternatives, traffic, incidents, closures, toll estimates, route options, HOV/pass restrictions, departure/arrival planning, and "not for emergency or oversized vehicles" safety copy.
- Live navigation must support GPS progress, rerouting, speed limit/speedometer, alerts, lane guidance, voice prompts, audio controls, route report overlays, report confirmation, and safe interaction restrictions.
- Reports must model traffic, crash, hazard, police/camera where lawful, closure, map issue, gas price, and place issue, with location capture, duplicate suppression, username/profile visibility, spam limits, and expiration.
- Conversational reporting must require microphone permission, safe-use copy, confidence thresholds, follow-up questions, and fallback to manual reporting.
- Toll estimates must be marked approximate, provider/community sourced, and configurable by passes/vignettes/HOV where launch regions allow.
- Gas/EV/parking discovery must support provider attribution, price/freshness, route detour, unsupported in-car feature states, and correction/report flows.
- Map editing and partner data feeds must be separate administrative surfaces with permission tiers, review, audit history, and no direct client-trusted edits to production maps.
- Ads and sponsored locations must be clearly labeled, separated from organic route/search decisions, privacy-reviewed, and disabled in safety-critical navigation moments unless legally cleared.

## Core User Journeys

- New driver grants location, searches a destination, compares traffic-aware routes, starts navigation, receives alerts, safely reports a hazard, and arrives.
- Commuter opens a saved work route, sees heavy traffic and closure reports, chooses an alternate route, and shares an ETA.
- Driver plans a future trip, compares departure times, sees toll estimates, adds a pass, and receives reminder or route refresh before departure.
- Road reporter submits traffic, hazard, closure, or gas price update, sees duplicate/spam handling, and can mark a stale report as no longer there.
- In-car user starts navigation on CarPlay/Android Auto, uses reduced reporting, and handles feature limits without taking unsafe actions.
- Privacy-focused user changes ad personalization, clears recent drives/searches, edits profile visibility, requests export, and deletes the account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Consent | Entry, terms, privacy, and permission education | continue, account, legal links, location primer | new, returning, signed-out | underage, blocked region, denied permission |
| Drive Home | Destination search and commute context | search, favorites, planned drive, report | current location, no location, idle | GPS weak, network offline, provider outage |
| Search/Places | Destination, gas, EV, parking, contact search | query, category, route context | results, no results, recent | ambiguous place, stale provider, restricted result |
| Route Preview | Compare routes before driving | destination, alternatives, tolls, passes | fastest, alternate, leave later | no route, closure, toll unknown, unsafe class |
| Live Navigation | Turn-by-turn driving | reroute, voice, alerts, report, audio | active, rerouting, background | GPS lost, tunnel, wrong turn, battery low |
| Report Sheet | Community reporting | report type, voice, photo if allowed | submitted, duplicate, pending | excessive reporting, unsafe interaction, offline |
| Alerts Feed | View and confirm road events | alert tap, not there, thanks | active, stale, removed | false report, sensitive location, legal restriction |
| Planned Drives | Future trip planning | departure, arrival, reminder | scheduled, refreshed, notified | stale ETA, notification denied, route unavailable |
| Toll/Passes | Toll estimate and pass setup | pass, vignette, route option | no toll, toll, pass applied | unknown toll, congestion toll, region unsupported |
| Gas/EV/Parking | Route-adjacent services | station, charger, lot, price edit | available, stale, route detour | provider outage, in-car unsupported, false price |
| Map Editor/Admin | Community map edits | edit, approve, reject, audit | draft, pending, live | abuse, conflict, permission denied |
| Settings/Privacy | Account, privacy, ads, history, legal | toggles, export, delete | signed-in, signed-out | deletion caveat, managed account, support outage |

## Data Model

- `User`: account identity, nickname, locale, privacy/ad settings, report reputation, block/restriction state, export/delete lifecycle, and profile visibility.
- `DeviceSession`: platform, app version, location permission, microphone permission, notification token, in-car mode, audio integration state, and last active state.
- `RoutePlan`: origin, destination, route options, alternatives, ETA, distance, toll estimate, pass state, traffic, incidents, and limitation warnings.
- `NavigationSession`: route, GPS quality, current step, speed, reroute state, alert feed, audio/voice settings, report affordance state, and safety warnings.
- `RoadReport`: type, geometry, reporter, confidence, source, created/updated/expiry timestamps, duplicate cluster, votes, visibility, and moderation state.
- `RoadClosure`: segment, direction, source, planned/live state, routing impact, validation, expiry, and audit history.
- `TollEstimate`: route segment, amount/range, currency, source, pass eligibility, unsupported pricing type, and freshness.
- `ServiceStop`: gas station, EV charger, parking lot, provider, price/availability, route detour, freshness, and correction state.
- `MapEdit`: proposed road/place/speed/camera change, editor level, review state, conflict, publication build, and rollback metadata.
- `AdPlacement`: sponsored pin/result, disclosure, advertiser, targeting context, billing event, fraud state, and safety suppression rules.
- `AuditEvent`: append-only record for auth, route, report, closure, map edit, privacy, ad, support, and account changes.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with region, age, deletion, and restriction gates.
- `GET /search?query=&lat=&lng=&routeId=&category=&cursor=`: place/service search with route context, pagination, source freshness, and unavailable states.
- `POST /routes`, `GET /routes/:id`, `GET /routes/:id/alternatives`: route planning with traffic, tolls, passes, closures, incidents, and safety warnings.
- `POST /navigation/sessions`, `PATCH /navigation/sessions/:id`, `POST /navigation/sessions/:id/end`: navigation progress, reroute, alert exposure, voice/audio state, and end state.
- `GET /reports?bounds=&routeId=`, `POST /reports`, `POST /reports/:id/vote`: incident feed, submission, duplicate matching, no-longer-there votes, spam limits, and expiration.
- `POST /reports/voice`, `PATCH /reports/voice/:id`: conversational report transcription, confidence, follow-up prompt, and manual confirmation.
- `POST /closures`, `GET /closures`, `POST /closures/:id/confirm`: road closure lifecycle with routing impact, validation, and expiry.
- `GET /tolls/estimate`, `PATCH /users/:id/toll-passes`: toll estimates, pass/vignette config, and unsupported pricing warnings.
- `GET /services/gas`, `PATCH /services/gas/:id/prices`, `GET /services/ev`, `GET /services/parking`: service discovery, price/availability, corrections, and provider errors.
- `GET /map-edits`, `POST /map-edits`, `POST /map-edits/:id/review`: map edit workflow with role gates, conflict detection, and audit.
- `GET /ads/placements`, `POST /ads/events`: labeled ads with safety suppression, privacy-safe targeting, billing, and fraud controls.
- `POST /data-export`, `DELETE /account`, `GET /privacy/settings`, `PATCH /privacy/settings`: privacy rights, ad controls, and deletion caveats.

## Realtime, Push, And Offline Behavior

- Navigation uses websocket/SSE/push-assisted polling for traffic, closures, reports, ETA changes, reroutes, and route safety alerts with stable event ids.
- Report submission captures location at tap time and may queue briefly if the network drops, but publication requires server validation and spam checks.
- Client may cache recent routes, favorites, map tiles, service stops, toll settings, voice/audio preferences, and pending low-risk reports with freshness.
- Offline mode can show cached route/map context but must block new route planning, live traffic, community reporting publication, ad billing, and privacy deletes until reconnected.
- In-car clients receive reduced event payloads and simplified reporting controls to avoid unsafe interaction and platform feature mismatch.

## Permissions, Privacy, And Safety

- Location, background location, motion/activity, microphone, contacts, notifications, Bluetooth/local network, and audio-app permissions must be requested only when a feature requires them.
- Default analytics must exclude raw GPS trails, exact home/work, private contact destinations, voice recordings, report evidence, and account identifiers unless purpose-limited and privacy-reviewed.
- Reporting UX must discourage interaction while driving, limit excessive reporting, hide/limit sensitive locations where required, and moderate false, abusive, or illegal reports.
- Route UX must warn that navigation is not for emergency or oversized vehicles and cannot guarantee road legality, toll correctness, police/camera legality, or hazard accuracy.
- Ads must never obscure critical navigation instructions, must be labeled, and must be suppressible in contexts where legal/safety review requires it.
- Launch owners: navigation safety owner, UGC/report moderation owner, privacy owner, ads owner, map/provider owner, in-car platform owner, and accessibility owner.

## Analytics And Monetization

- Track privacy-safe events: onboarding completed, permission changed, destination searched, route previewed, navigation started/ended, alert shown, report submitted, report confirmed, reroute occurred, planned drive created, toll pass changed, gas price edited, privacy setting changed, data export requested, account deletion requested.
- Route quality metrics use route/session ids, provider freshness, report categories, latency, and failure codes rather than raw GPS trails or home/work labels.
- Monetization can include original local ads, sponsored stops, fleet/provider partnerships, premium route alerts, or city/partner dashboards later, but Waze ad products, data feed terms, and brand positioning must be original and legal-reviewed.

## Edge Cases

- First launch offline, denied location, approximate location, GPS drift, old OS, unsupported in-car platform, blocked region, or account restriction.
- Route includes tolls, passes, HOV, restricted zones, closures, private roads, speed-camera jurisdictions, or unsupported vehicle class.
- Report is duplicate, false, malicious, stale, sensitive, posted offline, submitted too frequently, or legally restricted in a region.
- Navigation loses GPS, reports arrive late, ETA swings, reroute loops, tunnel causes drift, audio app conflicts, phone call interrupts, or CarPlay lags.
- Gas/EV/parking provider data is stale, station price is wrong, charger is unavailable, parking is full, or in-car surface does not support the feature.
- Privacy delete conflicts with report retention, safety investigation, legal hold, ad billing record, or abuse investigation.

## Test Plan

- Unit tests for route options, report validation, duplicate clustering, report expiry, toll estimate states, gas price editing, privacy-safe analytics, and permission states.
- Contract tests for search, route, navigation, reports, closures, tolls, services, map edits, ads, privacy, and pagination/error behavior.
- Integration tests for destination search, route preview, live navigation start/stop, hazard reporting, stale report confirmation, planned drive, toll pass setup, gas price edit, and privacy settings.
- Offline tests for cached map/route reads, queued report validation, stale indicators, blocked publication, reconnect reconciliation, and corrupt cache recovery.
- Safety tests for distracted-driving copy, excessive reporting limits, unsupported vehicle class, police/camera regional restrictions, ad suppression, and report moderation.
- Accessibility tests for voice guidance, screen reader labels, dynamic type, focus order, contrast, in-car simplified controls, and reduced-motion alternatives.
- Manual verification tests: native iOS/Android screenshots, live GPS, conversational reporting, CarPlay, Android Auto, AAOS, gas/EV/parking/toll behavior, map editor, ads, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Waze assets, Waze map/report data, private APIs, proprietary routing, branded voices, ad formats, or protected trade dress.
- Users can search, preview routes, navigate, receive alerts, submit/confirm reports, plan drives, compare tolls, find gas/EV/parking, manage privacy, and recover from denied permissions or network loss.
- Reports, closures, route events, ads, map edits, privacy rights, and support decisions are auditable server-side state machines.
- Location privacy, report identity, ad personalization, route safety, in-car limitations, account deletion, and data export controls are accessible from settings and covered by tests.
- Conversational reporting, in-car surfaces, ads, map editor, police/camera reporting, push payloads, and regional features remain feature-flagged until manual verification and legal review clear them.

## Open Questions

- Which licensed map, routing, traffic, incident, gas, EV charging, parking, speech, notification, ads, analytics, and moderation providers will back V1?
- Which launch regions allow police/camera reports, toll estimates, HOV/pass logic, gas price edits, EV charger availability, and ads?
- Will map editing launch as community-facing, admin-only, or remain out of scope until operations staffing exists?
- What retention applies to GPS traces, report history, voice snippets, ad events, privacy deletes, and abuse investigations?

## Build Plan

- Phase 1: app shell, auth/guest mode, map provider, destination search, route preview, settings/legal links, privacy-safe analytics, and route tests.
- Phase 2: live navigation, rerouting, traffic/incidents feed, voice guidance, report display, safety copy, and navigation tests.
- Phase 3: report submission, duplicate/spam moderation, closures, planned drives, toll estimates, gas/EV/parking discovery, and report/service tests.
- Phase 4: in-car reduced clients, conversational reporting, audio integrations, ads, map editor/admin, partner feed abstractions, and accessibility audit.
- Phase 5: regional legal review, provider approvals, manual device verification, push payload validation, and launch-blocker burn-down.

## Next Steps

- Resolve providers for map/routing/traffic/reports/services/speech/ads and define launch regions.
- Complete lawful native and in-car verification for GPS navigation, reporting, tolls, gas/parking, map editing, ads, push payloads, and privacy settings.
