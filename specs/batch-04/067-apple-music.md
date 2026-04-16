# Apple Music-Style Clone Spec

## Legal Scope
- Build a music service with original branding, editorial layout, and copy.
- Do not copy Apple marks, exclusive catalog data, or proprietary editorial content.
- Use licensed or synthetic media only; no unlicensed song assets.
- Treat spatial-audio, lyrics, and radio as modular features, not mandatory defaults.

## Product Goal
- Offer a premium-feeling music player with strong library, radio, and editorial browsing.
- Make listening context-aware: favorites, stations, playlists, and lyrics should be one tap away.

## Research Verification Checklist
- Verify tabs, listen-now layout, and radio placement from public observation.
- Verify lyrics display, favorites, and share sheet behavior.
- Verify library organization, playlists, and artist follow flows.
- Verify subscription prompts and offline download states from support pages.

## Core User Journeys
- User opens listen-now, resumes playback, and jumps to lyrics or queue.
- User follows an artist, saves an album, and adds tracks to a library.
- User starts a station from a track or artist and lets autoplay continue.
- User downloads music for offline listening and checks storage status.
- User browses editorial content and adds a curated playlist to the library.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Listen Now | Personalized hub | None | Warm, cold start | No history |
| Browse | Editorial shelves | Category filters | Populated, empty | Region-limited |
| Radio | Stations and autoplay | Seed track/artist | Playing, idle | Seed unavailable |
| Library | Saved content | Sort, filter | Synced, empty | Duplicate items |
| Artist | Artist profile | Artist id | Loaded, stale | Catalog gap |
| Album | Album detail | Album id | Open, downloaded | Explicit filter |
| Player | Now playing | Seek, lyrics | Active, paused | DRM error |
| Lyrics | Synchronized lines | None | In sync, lagging | Missing lyrics |
| Settings | Audio and account | EQ, downloads | Editable | Family restriction |

## Functional Requirements
- Support play controls, queue, autoplay, repeat, shuffle, and up-next.
- Render synchronized lyrics with line highlighting and manual scroll.
- Support artist pages, radio stations, editorial playlists, and favorites.
- Support downloads, storage cleanup, and playback quality selection.
- Keep playback state, history, and preferences synced across devices.
- Support share links that open directly into a track, album, or playlist.
- Provide content restrictions and explicit filters.
- Make search first-class with library, browse, and radio entry points.

## Data Model
- `User`: preferences, plan tier, explicit filter, device list.
- `Track`: title, artist, album, duration, media ref, lyrics ref.
- `Album`: title, artwork, release date, track list.
- `Artist`: profile, related artists, station seed metadata.
- `Station`: seed type, autoplay rules, queue state.
- `LibraryItem`: type, saved flag, download state, last played.
- `PlaybackSession`: queue, device, time position, lyric sync state.

## API/Backend Contracts
- `GET /listen-now`, `GET /browse`, `GET /radio`.
- `GET /artists/{id}`, `GET /albums/{id}`, `GET /tracks/{id}`.
- `POST /library/save`, `POST /library/follow`, `POST /stations/start`.
- `POST /playback/start`, `POST /playback/seek`, `POST /playback/queue`.
- `GET /lyrics/{trackId}`, `GET /downloads`, `POST /downloads`.
- Use entitlement checks for premium-only playback modes.

## Realtime/Push/Offline
- Push for new releases, lyrics availability, and library sync.
- Cache the library, recent plays, and downloaded media offline.
- Resume playback from local state when the network drops.

## Permissions/Privacy/Safety
- Ask for notifications only for new releases and account alerts.
- Provide explicit content filtering and family controls.
- Let users clear listening history and disable personalization.

## Analytics Events
- `listen_now_opened`, `station_started`, `lyrics_opened`, `track_saved`
- `album_downloaded`, `library_item_removed`, `artist_followed`, `search_performed`

## Monetization
- Use a premium tier for downloads, higher quality, lyrics, and exclusive radio features.
- Keep upsell messaging separate from playback controls.

## Acceptance Tests
- User can start a station from a track and continue playback without manual queueing.
- User can open synchronized lyrics during playback.
- User can save an album and see it in the library.
- User can download music and play it offline.
- User can clear history and disable recommendations.

## Implementation Notes
- Keep lyrics synchronization decoupled from playback so missing lyrics do not block audio.
- Model radio as a queue generator with explicit seed rules.
- Use a media provider interface so catalog sources can change later.
