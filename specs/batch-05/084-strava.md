# 084 Strava Clone Spec

## Legal Scope
- Clone activity logging, route tracking, social feed, clubs, segments, and challenges.
- Use original branding and map style, not copied assets or proprietary heatmaps.

## Product Goal
- Let athletes record outdoor activities, review performance, and share results with a social layer.

## Research Verification Checklist
- Public app listing, feature set, and paywall: verify.
- Activity types, map overlays, and segment leaderboards: verify.
- Privacy defaults and follower controls: verify.

## Core User Journeys
- User records a run or ride with GPS.
- User uploads activity, reviews splits, and shares to feed.
- User joins a club, reacts, and comments on an activity.
- User checks segment performance and weekly progress.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Record | Live activity capture | Start, pause, lap | Running, paused | GPS dropout |
| Activity Detail | Review effort | Map, splits, kudos | Processing, complete | Bad sensor data |
| Feed | Social timeline | Followed athletes | Empty, loaded | Hidden activity |
| Clubs | Group participation | Search, join | Member, pending | Private club |
| Paywall | Premium upgrade | Subscribe, restore | Trial, error | Annual renew |

## Functional Requirements
- Record GPS track, duration, distance, pace, elevation, and heart rate if available.
- Generate activity summaries and split charts after upload.
- Support kudos, comments, followers, clubs, and challenges.
- Display routes and segments from server-side or local cached maps.
- Allow manual activity entry for unsupported device captures.

## Data Model
- `User`, `Activity`, `TrackPoint`, `Split`, `Route`, `Segment`, `Club`, `Challenge`, `Comment`, `Kudos`.
- Store privacy settings per activity: public, followers, only me.

## API/Backend Contracts
- `POST /activities`: create upload session.
- `POST /activities/{id}/points`: stream track points.
- `GET /activities/{id}`: summary and social metadata.
- `POST /activities/{id}/kudos`, `/comments`.
- `GET /feed` and `GET /segments/{id}`.

## Realtime/Push/Offline
- Realtime upload status for live recording and deferred sync.
- Push for kudos, comments, club invites, and challenge reminders.
- Offline record-first behavior with later sync.

## Permissions/Privacy/Safety
- Location permission is mandatory for recording.
- Heart rate and health data require clear consent.
- Default new activities to a conservative privacy setting.
- Provide route hiding and map privacy tools.

## Analytics Events
- `record_started`, `record_paused`, `activity_uploaded`, `split_viewed`, `kudos_sent`, `comment_added`, `club_joined`, `privacy_changed`.

## Monetization
- Premium subscription for deeper analytics, live segments, advanced maps, and training insights.

## Acceptance Tests
- Record a run with GPS disabled, show degraded warning, and recover when enabled.
- Upload activity offline and sync later.
- Hide an activity from followers and verify feed removal.
- Join a club and receive invite notifications.

## Implementation Notes
- Model recording as a local-first queue so app termination does not lose data.
- Separate privacy filtering from feed rendering.
- Keep map rendering and route fetches bounded by battery-aware throttling.

