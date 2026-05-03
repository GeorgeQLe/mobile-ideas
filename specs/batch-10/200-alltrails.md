# AllTrails-Style Clone Spec

> Metadata
> - Inspiration app: AllTrails
> - Category: Hiking
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace listings, AllTrails product/help/privacy/terms pages, and public subscription/offline/navigation support materials.
> - Manual verification blockers: precise-location behavior, offline map rendering, recorded activity accuracy, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, proprietary trail database, private APIs, unlicensed map tiles/trail content, customer GPS tracks, and safety-critical claims.

## Overview

Build an original mobile outdoor discovery and navigation app inspired by AllTrails' public product and support materials: trail search/map/list discovery, trail detail pages, licensed maps/trail data, saved lists, activity recording, navigation, offline maps, reviews/photos, conditions/safety reports, live-share-style safety features, and subscription-gated planning tools.

The clone must not copy AllTrails branding, iconography, screenshots, UI copy, proprietary trail database, private APIs, unlicensed map tiles/trail content, customer GPS tracks, or safety-critical claims. V1 can reproduce comparable outdoor-planning jobs and interaction patterns with original terminology, original UI, licensed data, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Trail discovery with filters (difficulty, length, elevation).
- Interactive map with trail overlays (licensed tiles).
- Record an activity (GPS track, stats).
- Offline maps region download (paid).
- Reviews with photos and safety flags.
- Safety disclaimers and share-location-with-contact.
- Saved lists, route planning, wrong-turn/off-route alerts, weather/conditions overlays, and ad/subscription entitlement gates.
- Privacy controls for exact location, activity visibility, map endpoints, and live-share links.

## Non-Goals

- Do not imply AllTrails affiliation.
- Do not reuse trail content without licensed provider.
- Do not position the app as a SAR (search-and-rescue) replacement.
- Do not claim trail safety, emergency response, medical, or rescue reliability.
- Do not collect precise/background location until the user starts navigation/recording or opts into live share.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/alltrails-hike-bike-run/id405075943 | Official iOS listing, feature positioning, subscriptions, privacy labels, platform support | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.alltrails.alltrails | Official Android listing, data-safety summary, offline/maps/navigation/subscription signals | Verified 2026-05-03 |
| AllTrails Product Page | https://www.alltrails.com/ | Public trail discovery, maps, reviews, recording, saved lists, subscription positioning | Verified 2026-05-03 |
| AllTrails Support | https://support.alltrails.com/hc/en-us | Help taxonomy for recording/navigation, offline maps, subscriptions, account/privacy, reviews/photos, troubleshooting | Verified 2026-05-03 |
| Activity Recording Help | https://support.alltrails.com/hc/en-us/articles/360019244391-How-do-I-track-and-record-an-activity- | Public recording/navigation steps, upload/edit activity behavior, verification caveats | Verified 2026-05-03 |
| AllTrails Privacy Policy | https://www.alltrails.com/privacy | Location, account, activity, device, subscription, sharing, and deletion context | Verified 2026-05-03 |
| AllTrails Terms of Service | https://www.alltrails.com/terms | User content, acceptable-use, subscriptions, liability, and safety/legal context | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Trail list and map views with filters.
- Trail detail with route polyline, stats, photos, reviews.
- Record activity with background location.
- Offline maps with region download (paid).
- Reviews with photo upload and moderation.
- Safety disclaimers shown before recording starts.
- Trail data must come from a licensed/open provider with license metadata attached to each route, POI, review, photo, and map layer.
- Search/filter must support location, activity type, distance, difficulty, elevation, route type, suitability attributes, rating, saved state, and subscription-only advanced filters where chosen.
- Trail detail must separate provider-sourced facts, user reviews/photos, recent conditions, warnings, and inferred recommendation metadata.
- Activity recording must request precise/background location only at navigation/recording start and must degrade for weak GPS/battery saver.
- Offline maps must validate tile/route availability, storage usage, expiration/license state, and partial-download recovery.
- Wrong-turn/off-route alerts, live share, and safety features must be best-effort with visible disclaimers; no emergency/SAR guarantee.
- Review/photo uploads must strip EXIF by default, moderate abuse, and support reporting/appeal workflows.
- Subscription gates must handle Plus/Peak-like tiers without using original tier names unless legally cleared.
- Map rendering must provide non-map list/detail alternatives for accessibility and low-connectivity use.

## Core User Journeys

- User opens app, grants approximate location, browses nearby trails.
- User opens a trail; reads details, photos, reviews.
- User downloads region for offline (paid) before trip.
- User taps Record, grants always-on location, starts hike.
- User pauses/resumes recording; ends; sees stats and map replay.
- User posts a review with photos.
- User shares live location with a trusted contact for safety.
- User reports hazardous condition on a trail.
- User upgrades to paid for offline maps and live-share.
- User deletes account.
- User filters trails by wheelchair/dog/kid-friendly attributes and verifies source/license notes.
- User loses signal mid-hike and continues with a downloaded map.
- User receives an off-route/wrong-turn alert and returns to the trail.
- User edits activity privacy/map endpoint visibility before sharing.
- User deletes downloaded offline maps to recover storage.
- User requests export/delete of account, reviews, photos, and activity records.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Discover | Nearby trails map + list | filters | loaded, empty | location denied |
| Trail Detail | Info + photos + reviews | read, save | loaded | asset missing |
| Map | Interactive tiles + trails | pan/zoom | online, offline | tile fail |
| Record | Live activity | start/pause/end | ready, recording, paused, ended | GPS weak |
| Activity Detail | Post-activity stats | share, edit | loaded | corrupt track |
| Offline Maps | Region downloads | select, download | not-downloaded, downloading, ready | storage low |
| Reviews | Post/read reviews | photo, text, rating | submitted, moderated | abuse flag |
| Safety | Share location, disclaimers | share with contact | active, inactive | contact missing |
| Settings | Account, privacy | toggles | loaded | admin-managed |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |
| Saved Lists / Trip Plan | Organize trails | save, list, date | empty, planned | license unavailable |
| Conditions / Safety Reports | Read/report trail state | report, photo | submitted, moderated | unsafe content |
| Route Planner | Create/modify route | draw, snap, save | editing, saved | no route data |
| Privacy / Map Visibility | Control activity sharing | toggle, crop | public, private | endpoint crop failed |
| Data / Downloads | Export, delete, storage | export, clear | pending, complete | delete partially failed |

## Data Model

- `User`: identity, locale, units, privacy defaults, location-permission state, subscription, safety settings.
- `Trail`: licensed provider id, name reference, route geometry, stats, difficulty, activity types, suitability attributes, license metadata, stale marker.
- `MapLayer`: provider, tile template/key ref, license, zoom range, cache expiry, attribution requirements.
- `TrailPhoto`: trail/activity/review refs, media URI, EXIF-stripped flag, moderation state, license/user-content state.
- `Review`: trail, rating, text reference, photos, visit date, conditions tags, moderation/report state.
- `Activity`: user, trail/route ref, track points, stats, privacy, map-visibility crop, recording state, verification marker.
- `TrackPoint`: timestamp, coordinate, accuracy, altitude, speed, battery/location-source metadata.
- `OfflineRegion`: bbox/route, tile refs, route refs, bytes, status, expiry/license state, checksum.
- `SavedList`: user, trail refs, trip notes, visibility, offline-prep state.
- `SafetyShare`: activity, recipient/contact ref, signed token, last ping, expiry, revoked state.
- `SafetyReport`: trail/activity, type, text/media refs, severity, moderation state.
- `RoutePlan`: user, geometry, waypoints, provider/license metadata, saved/offline state.
- `Entitlement`: tier, trial, renewal, restore, feature flags, store/web owner.
- `AuditEvent`: location, recording, live share, review/report, billing, privacy, export/delete, and support events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `GET /trails?near=&filters=`, `GET /trails/:id`.
- `GET /trails/:id/reviews`, `POST /trails/:id/reviews`, `POST /reviews/:id/report`.
- `POST /activities`, `GET /activities/:id`, `PATCH /activities/:id` (edit title/privacy).
- `POST /offline-regions`, `GET /offline-regions`, `DELETE /offline-regions/:id`.
- `POST /safety/shares`, `DELETE /safety/shares/:id`.
- `GET /entitlements`, `POST /billing/webhook`.
- `GET /map/tiles/:provider/:z/:x/:y`, `POST /route-plans`, `PATCH /route-plans/:id`: licensed map/route surfaces.
- `POST /trail-reports`, `POST /photos/uploads`, `PUT /photos/uploads/:id/content`: user content and reports.
- `PATCH /activities/:id/privacy`, `PATCH /activities/:id/map-visibility`: privacy controls.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`: privacy lifecycle.

## Realtime, Push, And Offline Behavior

- Activity recording runs in background with location; resumable across app kills.
- Offline maps downloaded via region manager; tiles validated.
- Live location share posts to endpoint every N seconds while active.
- Push for share-link accepted, safety reminders, review replies — opaque.
- Offline downloads include tiles, route geometry, selected metadata, and license/expiry manifests.
- Recording survives app backgrounding and restart where platform policies allow; exact behavior is `Manual verification required`.
- Weak GPS, battery saver, and denied background permission must be visible in recording quality indicators.
- Live-share updates use coarse retry/backoff and stop at expiry, logout, permission revocation, or activity end.
- Map and trail caches purge on logout, license expiry, region delete, provider revocation, or account delete.

## Permissions, Privacy, And Safety

- Approximate location default; precise requested only for recording.
- Background location requires always-on permission with transparent purpose string.
- Safety disclaimers explicit: not SAR, user responsibility.
- Live-share tokens signed and time-limited.
- Analytics exclude precise coordinates; only coarse bbox and event types.
- Moderation for review photos (no nudity, no location doxxing).
- Export + delete account.
- Precise/background location is requested only for recording/navigation/live share and has a clear purpose string.
- Activity privacy defaults to private/followers-only until the user chooses public sharing.
- Map endpoint hiding/cropping must be available before public sharing.
- Safety disclaimers state that maps, alerts, and live share are best-effort and not emergency/rescue services.
- Analytics exclude exact coordinates, GPS tracks, contact identifiers, review text, photo content, and precise trail endpoints.
- Trail/user content licensing and attribution must be visible to implementation teams and preserved in exports/caches.
- Support diagnostics require explicit consent before sharing location traces, downloaded regions, or activity logs.
- Location/live-share tokens, map provider keys, billing receipts, and upload credentials require encrypted storage and redacted logs.

## Analytics And Monetization

- Events: trail viewed, activity started/paused/ended, offline downloaded, review posted, share started.
- Tiers original; paywall at offline maps, live-share, and advanced stats.
- Analytics payloads use event type, trail/content provider class, distance/elevation buckets, latency, failure codes, coarse region, and entitlement gate only.
- Entitlements may gate offline maps, live share, wrong-turn alerts, route planning, advanced filters, 3D/topo overlays, ad-free mode, and advanced stats.
- Billing must handle trial, active, expired, canceled, refunded, restored, store-owned, web-owned, and region-specific subscription states.

## Edge Cases

- GPS drop in canyons/forest; record must interpolate safely.
- Battery saver mode throttling background location.
- Offline region partially downloaded when storage runs out.
- Live-share link intercepted; rotation on resume.
- Review photo contains precise location EXIF; strip by default.
- Trail content license change invalidating cached trails.
- GPS drift creates impossible speed/elevation spikes.
- Background location permission revoked mid-recording.
- Offline map expires or tile license changes while user is offline.
- Live-share recipient opens an expired or revoked token.
- Route planner snaps to a closed/private trail segment.
- Trail attribute is stale, disputed, or user-reported as unsafe.
- Subscription downgrade while offline regions remain downloaded.
- Account delete must remove reviews/photos/activities while respecting provider-owned/licensed trail records.

## Test Plan

- Unit tests for track smoothing, stats calculation, region tile math.
- Contract tests for APIs including safety share token rotation.
- Integration tests for record -> save -> share -> review.
- Permission tests for location levels.
- Offline tests for tile validation and partial downloads.
- Moderation tests for photo and review abuse.
- Billing tests.
- Accessibility tests for map alternatives (list + VoiceOver).
- Manual verification: background location, offline behavior on real trail, battery impact.
- Unit tests for track smoothing, distance/elevation stats, map-visibility cropping, route/tile manifest validation, license expiry, entitlement gates, and safety-share token rotation.
- Contract tests for trails, reviews, activities, offline regions, safety shares, route plans, photo uploads, billing, export/delete, and audit events.
- Integration tests for discover -> trail detail -> save -> download offline -> record -> review/share.
- Permission tests for approximate/precise/background location, notifications, photo library/camera, contacts/share sheet, and storage.
- Privacy/security tests for analytics redaction, EXIF stripping, map endpoint hiding, live-share token signing/revocation, provider key storage, support diagnostics consent, and account delete.
- Moderation tests for review/photo abuse, trail hazard reports, duplicate/spam reviews, doxxing, and appeal flows.
- Outdoor/reliability tests for weak GPS, airplane mode, battery saver, app kill/restart, low storage, stale tiles, and route deviation.
- Accessibility tests for map alternatives, screen-reader labels, color contrast, reduced motion, large text, no-drag alternatives, and haptic/audio alternatives.
- Manual verification tests: real-device background location, offline navigation/rendering, wrong-turn alerts, live share, subscription purchase/restore, battery impact, and mobile accessibility.

## Acceptance Criteria

- Source URLs verified.
- Discover + trail detail + record + offline + reviews + safety share complete.
- Safety disclaimers present and tested.
- Entitlements reconcile.
- Manual blockers feature-flagged.
- A downstream team can build V1 without AllTrails brand assets, proprietary trail data, private APIs, unlicensed maps/content, screenshots, UI copy, customer GPS tracks, or unsafe safety claims.
- Trail discovery, map/list views, trail details, licensed data attribution, recording, offline maps, reviews/photos, reports, safety share, route planning, billing, and account deletion have deterministic contracts and failure states.
- Analytics, logs, support diagnostics, reviews/photos, map caches, live-share tokens, and activity privacy controls minimize precise-location and user-content exposure.
- Safety disclaimers, location permission prompts, map endpoint hiding, subscription gates, provider licenses, and offline expiry reconcile safely.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which trail content provider?
- Which map tile provider and licensing?
- Which moderation vendor for photos?
- Watch app in V1?
- Which safety features are V1 versus premium/staged: live share, wrong-turn alerts, route planner, 3D/topo maps?
- What default activity privacy and map endpoint hiding policy should launch with?
- Which accessibility alternative is required for users who cannot use dense map gestures?

## Build Plan

- Phase 1: scaffold licensed trail/map provider abstraction, discover/list/map views, trail detail, saved lists, privacy-safe analytics, and attribution.
- Phase 2: add recording/navigation, track stats, GPS quality indicators, activity privacy/map visibility controls, and safety disclaimers.
- Phase 3: add offline regions, tile/route manifests, storage management, cache purge, route planner, and wrong-turn/off-route alert foundations.
- Phase 4: add reviews/photos/conditions reports, moderation/reporting, EXIF stripping, abuse handling, and user-content export/delete.
- Phase 5: add safety share/live location, notifications, entitlement gates, billing/restore, advanced filters/overlays, and support diagnostics consent.
- Phase 6: complete outdoor reliability tests, location/privacy/security review, accessibility alternatives, subscription tests, and manual real-device verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 map/trail providers, route/offline/safety scope, default privacy, and subscription gates.
- Create or link the downstream implementation repository when Phase 1 is ready.
