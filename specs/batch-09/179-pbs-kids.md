# PBS Kids-Style Clone Spec

> Metadata
> - Inspiration app: PBS Kids
> - Category: Kids TV (video and games)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official PBS/PBS KIDS help pages, and public privacy/terms pages.
> - Manual verification blockers: native capture, live-stream behavior, game load performance, and push payloads require hands-on verification.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and UX. Show catalog must be licensed; no proprietary content reuse. COPPA-style review required before launch.

## Overview

Build an original mobile kids-TV app inspired by PBS Kids: ad-free kids video catalog, live stream, and simple games with minimal or no sign-in. COPPA-aligned data handling; no behavioral advertising; strict parental controls.

This spec is implementation-ready for a V1. Unverified behaviors must ship behind feature flags.

## Goals

- Ad-free video catalog of licensed kids' shows organized by show/character.
- Live stream channel.
- Small library of simple games for common platforms.
- Minimal-login flow; parent/caregiver settings accessible via parental gate.
- Offline download (optional).

## Non-Goals

- Do not copy proprietary branding, show titles, or character art.
- Do not target advertising to children.
- Do not require personal data to view content.
- Do not allow open chat or social features.
- Do not claim parity until manual verification.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/pbs-kids-video/id435138734 | Official iOS listing, live/on-demand/download positioning, age rating, privacy labels, and language/caption support | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=org.pbskids.video | Official Android listing, live TV, 600+ episodes, clips, downloads, Spanish/captions, geographic/download restrictions, and data safety | Verified 2026-05-02 |
| PBS KIDS Help | https://pbskids.org/help | Official help surface for kids/caregiver app support and PBS KIDS service orientation | Verified 2026-05-02 |
| PBS Privacy Policy | https://www.pbs.org/about/policies/privacy-policy/ | Public privacy posture for PBS services, children, data use, and rights | Verified 2026-05-02 |
| PBS Terms | https://www.pbs.org/about/policies/terms-of-use/ | Public service, content, geographic, and usage terms | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- No account required to watch on-demand and live.
- Optional local-station association to surface PBS-member programming (inferred, verify).
- Video catalog by show with episode lists.
- Live stream with now-playing and schedule.
- Game library with simple interactive games.
- Parental gate for adult settings and station change.
- Offline download (optional).
- V1 must model no-login video access with local-first preferences and minimal data collection by default.
- Catalog browse must group licensed shows, episodes, clips, movies, live channel, and games without copying PBS show titles, character art, logos, descriptions, or video assets.
- Live stream must expose now-playing, schedule, geolocation/region eligibility, stream outage, and fallback-to-on-demand states.
- Download support must respect show-specific eligibility, region restrictions, storage, license expiry, and caregiver controls.
- Grownups/adult surface must be gated and include local station selection, schedule, learning goals, accessibility settings, privacy notice, support, and external links.
- Sponsorship/funding-message policy must be reviewed; V1 should use no child-targeted ads and should keep any adult/caregiver links gated.
- Games must load original/licensed bundles in a sandbox with performance, crash, audio, and offline states.
- Accessibility must include English/Spanish captions where licensed, audio description where available, screen-reader controls, focus states, reduced motion, and large-screen support.

## Core User Journeys

- Child opens app, picks a show, and watches an episode.
- Child watches live stream.
- Child plays a simple game.
- Caregiver selects a local station via parental gate.
- Caregiver enables captions and audio description.
- Child returns to last-watched show.
- Caregiver downloads episodes for a trip.
- Child hits end of episode and auto-plays next (with parent-adjustable setting).
- Caregiver clears local data.
- Caregiver reviews privacy notice.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Kid Home | Shows, live, games | tap | loaded | offline |
| Show Page | Episode list | tap | loaded | no episodes |
| Video Player | Watch | play/seek, captions | playing | stream fail |
| Live Stream | Live channel | play | live, schedule fail | stream fail |
| Game Library | Games | tap | loaded | asset failure |
| Game Play | Play game | interactions | running | crash |
| Parental Gate | Gate adult actions | challenge | pass, fail | skip |
| Station Picker | Local station | select | configured | unavailable |
| Captions/AD | Accessibility toggles | toggle | enabled, disabled | unsupported |
| Downloads | Offline episodes | download | queued, done | storage full |
| Privacy Center | Clear local data, notice | actions | idle | pending |
| About | Legal and credits | read | loaded | offline |

## Data Model

- `Show`: id, title, metadata, age band.
- `Episode`: show, title, duration, captions/AD refs.
- `LiveStream`: channel id, schedule.
- `GameItem`: id, title, bundle ref, age band.
- `StationAssociation`: device, station id.
- `WatchHistory`: device, show/episode, last-position.
- `Download`: device, episode, status.
- `Preferences`: captions, AD, autoplay.
- `PrivacySettings`: analytics opt-in (off by default).
- `AuditEvent`: caregiver-initiated changes (local).
- `ContentLicense`: provider, territory, format, download eligibility, expiration, takedown state.
- `ScheduleItem`: live channel, start/end, title, metadata, station/region.
- `CaptionTrack`: episode, locale, format, availability, sync status.
- `SponsorMessage`: content, disclosure, region, adult-review state.
- `GameSession`: game, device, progress, crash state, local save.
- `SupportCase`: caregiver contact, issue, device/app version, redaction state.

## API And Backend Contracts

- `GET /shows`, `GET /shows/:id`, `GET /episodes/:id`.
- `GET /live/schedule`, `GET /live/stream`.
- `GET /games`, `GET /games/:id`.
- `GET /stations`, `POST /stations/associate`.
- `POST /watch-history` (opt-in), `GET /watch-history`.
- `POST /downloads`, `DELETE /downloads/:id`.
- `GET /preferences`, `PATCH /preferences`.
- `POST /privacy/clear-local`.
- `POST /support/cases`.
- `GET /catalog?region=`, `GET /shows/:id/episodes`, `GET /clips/:id`.
- `GET /licenses/:contentId`, `POST /catalog/takedowns`.
- `GET /captions/:episodeId`, `GET /audio-description/:episodeId`.
- `GET /sponsor-messages?content=`, `GET /learning-goals/:showId`.
- `POST /games/:id/session`, `PATCH /games/:id/session/:sessionId`.

## Realtime, Push, And Offline Behavior

- Live-stream playback with schedule; fallback to on-demand if stream fails.
- Offline play for downloaded episodes.
- Watch history local by default; optional cloud sync for caregivers.
- Push limited to schedule reminders (caregiver opt-in); never to child profile.
- Content license updates may expire downloaded items.

## Permissions, Privacy, And Safety

- COPPA-aligned review required before launch.
- No account required; no third-party advertising or behavioral tracking for under-13.
- Minimal data collection; local-only state by default.
- Parental gate for all adult actions.
- No open chat or UGC.
- Accessibility: dynamic type, captions, audio description, reduced motion.
- Content catalog reviewed for age appropriateness.
- Launch owner: privacy lead, child-safety lead, accessibility owner, legal counsel.

## Analytics And Monetization

- Privacy-safe events only: show opened (id), play minutes bucketed, live started — never personal identifiers or behavioral profiles.
- No monetization against children; no IAP.
- Caregiver-side donation link (adult-only, behind parental gate, out-of-app browser).
- No ads.

## Edge Cases

- Device storage full during download.
- Live stream outage; fallback messaging.
- Caption/AD asset missing; disable toggle with notice.
- Station lookup fails; fallback to default catalog.
- Content license expired; hide with notice.
- Parental gate bypass attempts.
- Autoplay disabled via accessibility settings.
- Deep link to expired episode.
- User outside licensed territory opens app, live stream, downloaded item, or deep link.
- Local station is unavailable, ambiguous by ZIP/region, or changes schedule feed.
- Downloaded episode loses license while device is offline.
- Live stream schedule and video stream disagree on now-playing.
- Sponsor/funding message is unavailable, disallowed in a region, or fails to load.
- Game bundle crashes or hangs on low-memory devices.

## Test Plan

- Unit tests for schedule parsing, download lifecycle, captions/AD rendering.
- Contract tests for all endpoints.
- Integration tests for show-watch, live-play, station-change.
- COPPA-style privacy tests (no PII, no behavioral tracking, local-first defaults).
- Accessibility tests (captions, AD, dynamic type, reduced motion).
- Offline tests.
- Manual verification: native captures, live stream, parental gate, download.
- License/region tests for on-demand, live stream, downloads, takedowns, and expired content.
- Schedule tests for now-playing, station changes, stream outage fallback, and schedule feed failures.
- Caption/audio-description tests for availability, locale selection, sync, and missing-track states.
- Game tests for sandbox loading, crash recovery, audio focus, input, offline, and memory limits.
- Privacy tests for no account requirement, local-first history, data clearing, sponsor disclosures, and no behavioral child tracking.
- Manual verification: native captures, live stream, downloads, station picker, game load performance, captions/AD, parental gate, and push payloads.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- COPPA-style review is complete; no login, behavioral ads, open chat, or unnecessary child data collection is required.
- Licensed catalog, show/episode browse, live stream, schedule, captions/AD, station picker, downloads, games, and caregiver settings work end-to-end.
- Original/licensed content and original UI/copy replace all PBS KIDS branding, shows, characters, screenshots, and catalog metadata.
- Region, license, sponsorship/funding-message, privacy clearing, support, and accessibility states are deterministic.
- Native live-stream, download, game-performance, caption/AD, and push blockers are resolved or feature-flagged.

## Open Questions

- Local-station association scope and data source.
- Game sandbox (web vs native) for V1.
- Offline downloads in V1 or later.
- International availability.

## Build Plan

- Phase 1: home, shows, video player, captions/AD.
- Phase 2: live stream and schedule.
- Phase 3: game library and game player.
- Phase 4: station picker, parental gate, preferences.
- Phase 5: offline downloads (optional), privacy center.
- Phase 6: accessibility, legal review, manual verification.

## Next Steps

- Verify URLs.
- Sign content and station-data agreements.
- Commission COPPA-style and accessibility review.
