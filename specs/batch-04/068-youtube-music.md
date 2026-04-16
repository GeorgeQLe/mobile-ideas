# YouTube Music-Style Clone Spec

## Legal Scope
- Build a music playback app that blends audio, video, mixes, and user library behavior.
- Do not copy YouTube marks, catalog metadata, or proprietary recommendation systems.
- Use licensed media and safe placeholders for both audio-only and video-backed content.
- Avoid any direct dependency on the public YouTube API unless separately approved.

## Product Goal
- Let a user move between songs, videos, mixes, and radio-style playback without leaving the music shell.
- Make library, search, and recommendations work from the same navigation model.

## Research Verification Checklist
- Verify home, hotlist, library, and search structure from public app observation.
- Verify audio/video switching, lyrics, and queue behavior.
- Verify downloaded playback, artist pages, and "mix" surfaces.
- Verify premium gating, account switching, and background playback behavior.

## Core User Journeys
- User opens the app and resumes a mix or recent song.
- User searches for a track or artist and chooses audio-only or video-backed playback.
- User saves a song, adds it to a playlist, and downloads it for offline use.
- User opens an artist page, starts a radio mix, and lets autoplay continue.
- User switches accounts or plan state without losing library state.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Personalized feed | None | Mixed, sparse | Cold start |
| Search | Song/video discovery | Query, filters | Typing, results | No results |
| Artist | Artist profile and mixes | Artist id | Loaded, stale | Missing media |
| Player | Audio/video playback | Seek, mode | Playing, paused | Video unavailable |
| Queue | Up-next list | Reorder, remove | Editable, locked | Empty queue |
| Library | Saved music | Sort, filter | Populated, empty | Sync conflict |
| Downloads | Offline items | Select content | Progress, done | Storage full |
| Settings | Audio, video, account | Toggles | Editable | Restricted tier |

## Functional Requirements
- Support track, album, playlist, artist, and mix browsing.
- Let the user switch between audio and video presentations when both exist.
- Support save, like, playlist add, queue reorder, and history.
- Support downloads with resume and offline playback.
- Support account switching and plan-aware playback restrictions.
- Provide lyric display and casting-compatible playback state.
- Track recommendation seeds and recent history for better mix generation.
- Keep search results consistent across songs, videos, playlists, and artists.

## Data Model
- `User`: preferences, plan tier, account switch history.
- `Item`: media type, title, artist, album, video flag, duration.
- `Mix`: seed source, generation rules, queue order.
- `Playlist`: owner, visibility, track order, collaborative flag.
- `LibraryItem`: saved state, download state, history timestamps.
- `PlaybackSession`: mode, queue, device, position, autoplay state.

## API/Backend Contracts
- `GET /home`, `GET /search?q=`, `GET /artists/{id}`.
- `GET /items/{id}`, `GET /mixes/{id}`, `POST /mixes/start`.
- `POST /library/save`, `POST /library/like`, `POST /queue/reorder`.
- `POST /playback/start`, `POST /playback/mode`, `POST /downloads`.
- `GET /history`, `GET /devices`, `POST /account/switch`.
- Media responses must expose audio-only and video-backed variants when available.

## Realtime/Push/Offline
- Push for new uploads, playlist changes, and mix refreshes.
- Cache saved items, downloads, and recent playback offline.
- Fall back to audio mode automatically when video cannot load.

## Permissions/Privacy/Safety
- Request media and notifications permissions only as needed.
- Let users clear watch/listen history and disable personalization.
- Enforce explicit-content filters and age gates where required.

## Analytics Events
- `home_opened`, `search_performed`, `item_saved`, `playlist_added`
- `mix_started`, `video_mode_selected`, `download_started`, `account_switched`

## Monetization
- Use a premium tier for background play, downloads, and higher quality only.
- Keep ad and upsell surfaces outside the primary playback controls.

## Acceptance Tests
- User can search for an item and open either audio or video playback.
- User can start a mix and see autoplay continue after the queue ends.
- User can save content, download it, and play offline.
- User can switch accounts without losing local library state.
- User can fall back from video to audio when media is missing.

## Implementation Notes
- Normalize all media types behind one playback abstraction.
- Keep mix generation deterministic enough for tests but seeded with user history.
- Separate history, library, and downloads so sync failures do not block playback.
