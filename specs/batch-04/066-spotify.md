# Spotify-Style Clone Spec

## Legal Scope
- Build a music streaming app with original branding, artwork placeholders, and copy.
- Do not copy Spotify marks, proprietary recommendation outputs, or licensed catalog data.
- Use licensed or synthetic audio for development and test playback.
- Keep podcast support optional unless the product scope later requires it.

## Product Goal
- Make playback immediate, browsing familiar, and library organization frictionless.
- Support search, playlists, albums, artist pages, queue control, and downloads.

## Research Verification Checklist
- Verify home tabs, library structure, and player controls from public app observation.
- Verify playlist editing, download behavior, and offline playback states.
- Verify search suggestions, artist pages, and queue interactions.
- Verify subscription prompts, ad surfaces, and device handoff behavior.

## Core User Journeys
- User opens the app, resumes playback, or starts a recommended mix.
- User searches for an artist, opens an album, and adds tracks to a playlist.
- User downloads music for offline use and later resumes playback without network.
- User follows an artist or saves a track to the library.
- User edits queue order and toggles shuffle, repeat, or playback speed for spoken content.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Recommendations and shortcuts | None | Personalized, empty | Cold start |
| Search | Query and discovery | Text, filters | Typing, results | No match |
| Artist | Artist profile and catalog | Artist id | Loaded, stale | Unavailable track |
| Album | Album detail and tracks | Album id | Open, downloaded | Regional block |
| Playlist | User list and editing | Track reorder | Editable, shared | Empty playlist |
| Player | Playback and controls | Seek, skip, like | Playing, paused | Stream error |
| Library | Saved content | Sort, filter | Populated, empty | Sync conflict |
| Downloads | Offline assets | Select content | Downloading, done | Storage full |
| Settings | Audio and account | Quality, devices | Editable | Restricted plan |

## Functional Requirements
- Support play, pause, skip, seek, shuffle, repeat, and queue editing.
- Render artist, album, track, and playlist detail views with metadata.
- Support library actions: like, save, follow, add to playlist, and hide.
- Support downloads with resumable progress and storage management.
- Support search with suggestions, recent queries, and filter chips.
- Track playback state across app restarts and device changes.
- Include optional podcast-style playback metadata only if needed later.
- Keep player controls reachable from every major screen.

## Data Model
- `User`: preferences, plan tier, device list, last playback state.
- `Track`: title, duration, artist, album, explicit flag, media URI.
- `Album`: title, release date, artwork id, track list.
- `Artist`: name, followers, related items, verified flag.
- `Playlist`: title, owner, visibility, track order, collaborative flag.
- `PlaybackSession`: queue, repeat mode, shuffle mode, position, device.
- `DownloadItem`: content id, progress, priority, storage state.

## API/Backend Contracts
- `GET /home`, `GET /search?q=`, `GET /artists/{id}`, `GET /albums/{id}`.
- `GET /playlists/{id}`, `POST /playlists`, `PATCH /playlists/{id}`.
- `POST /library/save`, `POST /library/follow`, `POST /queue/reorder`.
- `POST /playback/start`, `POST /playback/pause`, `POST /playback/seek`.
- `POST /downloads`, `DELETE /downloads/{id}`, `GET /devices`.
- Use signed media URLs and playback entitlement checks.

## Realtime/Push/Offline
- Keep playback running with buffered audio when offline if content is downloaded.
- Push for new releases, playlist changes, and collaborative edits.
- Sync library state and queue position in the background.

## Permissions/Privacy/Safety
- Request media and notifications permissions only when needed.
- Support explicit content flags and parental controls by plan or account policy.
- Minimize listening history exposure and let users clear recent items.

## Analytics Events
- `playback_started`, `playback_paused`, `track_skipped`, `seek_completed`
- `track_saved`, `playlist_created`, `playlist_updated`, `search_performed`
- `download_started`, `download_completed`, `artist_followed`, `subscription_prompted`

## Monetization
- Model ad-supported and premium tiers with feature gating.
- Keep ads and upsells separate from core playback state.

## Acceptance Tests
- User can start playback from home and keep controls available after navigation.
- User can search for an artist and add a track to a playlist.
- User can download content, go offline, and resume playback from cache.
- User can reorder queue items and see playback follow the new order.
- User can save a track and find it in the library later.

## Implementation Notes
- Use a dedicated playback engine with deterministic queue and state recovery.
- Separate metadata from media delivery so catalogs can swap providers.
- Make offline storage limits visible before large downloads begin.
