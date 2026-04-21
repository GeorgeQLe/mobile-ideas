# AllTrails-Style Clone Spec

> Metadata
> - Inspiration app: AllTrails
> - Category: Hiking
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, help center — pending exact URL verification.
> - Manual verification blockers: precise-location behavior, offline map rendering, recorded activity accuracy, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, and licensed map tiles + trail content providers.

## Overview

Build an original mobile hiking app inspired by AllTrails: trail discovery with maps and photos, recorded activities (GPS tracks), offline maps, reviews, trip planning, and safety disclaimers.

The clone must not copy AllTrails branding, iconography, trail content database, or proprietary routing algorithms.

## Goals

- Trail discovery with filters (difficulty, length, elevation).
- Interactive map with trail overlays (licensed tiles).
- Record an activity (GPS track, stats).
- Offline maps region download (paid).
- Reviews with photos and safety flags.
- Safety disclaimers and share-location-with-contact.

## Non-Goals

- Do not imply AllTrails affiliation.
- Do not reuse trail content without licensed provider.
- Do not position the app as a SAR (search-and-rescue) replacement.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/alltrails-hike-bike-run/id405075943 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.alltrails.alltrails | Android listing, data safety | Source discovery — pending exact URL verification |
| AllTrails Help | https://help.alltrails.com/ | Record, offline, reviews | Source discovery — pending exact URL verification |
| AllTrails Privacy | https://www.alltrails.com/privacy | Location, safety | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Trail list and map views with filters.
- Trail detail with route polyline, stats, photos, reviews.
- Record activity with background location.
- Offline maps with region download (paid).
- Reviews with photo upload and moderation.
- Safety disclaimers shown before recording starts.

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

## Data Model

- `User`, `Trail` (licensed id, polyline, stats), `Photo`, `Review` (rating, text, photos, flags), `Activity` (track points, stats, trail ref), `OfflineRegion` (bbox, tiles, bytes), `SafetyShare` (contact, link, expiry), `Entitlement`, `SafetyReport`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `GET /trails?near=&filters=`, `GET /trails/:id`.
- `GET /trails/:id/reviews`, `POST /trails/:id/reviews`, `POST /reviews/:id/report`.
- `POST /activities`, `GET /activities/:id`, `PATCH /activities/:id` (edit title/privacy).
- `POST /offline-regions`, `GET /offline-regions`, `DELETE /offline-regions/:id`.
- `POST /safety/shares`, `DELETE /safety/shares/:id`.
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Activity recording runs in background with location; resumable across app kills.
- Offline maps downloaded via region manager; tiles validated.
- Live location share posts to endpoint every N seconds while active.
- Push for share-link accepted, safety reminders, review replies — opaque.

## Permissions, Privacy, And Safety

- Approximate location default; precise requested only for recording.
- Background location requires always-on permission with transparent purpose string.
- Safety disclaimers explicit: not SAR, user responsibility.
- Live-share tokens signed and time-limited.
- Analytics exclude precise coordinates; only coarse bbox and event types.
- Moderation for review photos (no nudity, no location doxxing).
- Export + delete account.

## Analytics And Monetization

- Events: trail viewed, activity started/paused/ended, offline downloaded, review posted, share started.
- Tiers original; paywall at offline maps, live-share, and advanced stats.

## Edge Cases

- GPS drop in canyons/forest; record must interpolate safely.
- Battery saver mode throttling background location.
- Offline region partially downloaded when storage runs out.
- Live-share link intercepted; rotation on resume.
- Review photo contains precise location EXIF; strip by default.
- Trail content license change invalidating cached trails.

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

## Acceptance Criteria

- Source URLs verified.
- Discover + trail detail + record + offline + reviews + safety share complete.
- Safety disclaimers present and tested.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- Which trail content provider?
- Which map tile provider and licensing?
- Which moderation vendor for photos?
- Watch app in V1?

## Build Plan

- Phase 1: auth + discover + trail detail.
- Phase 2: record activity + stats.
- Phase 3: offline maps.
- Phase 4: reviews + moderation.
- Phase 5: safety share + live location.
- Phase 6: billing + accessibility + manual verification.

## Next Steps

- Verify source URLs.
- License trail content and map tiles.
- Legal review of safety disclaimers.
