# Audible-Style Clone Spec

## Legal Scope
- Build an audiobook library and player with original branding, copy, and artwork placeholders.
- Do not copy Audible marks, publisher feeds, or proprietary catalog metadata.
- Use licensed or synthetic audiobook content only.
- Treat credits, samples, and memberships as business rules that can be swapped later.

## Product Goal
- Make it easy to discover titles, start listening, resume progress, and manage a library.
- Keep playback features first-class: chapters, bookmarks, speed, sleep timer, and offline support.

## Research Verification Checklist
- Verify library layout, samples, chapter navigation, and player controls from public observation.
- Verify credits, purchase flow, and subscription gating from support pages.
- Verify bookmarks, sleep timer, and listening progress behaviors.
- Verify offline download, device sync, and history handling.

## Core User Journeys
- User opens the library and resumes a partially played title.
- User opens a title detail page, listens to a sample, and buys or adds it.
- User bookmarks a chapter, sets a sleep timer, and returns later at the same point.
- User downloads a book for offline listening and keeps progress synced.
- User uses a credit or entitlement to unlock a new title.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Library | Owned titles | Sort, filter | Populated, empty | Hidden title |
| Store | Discover and buy | Search, genre | Populated, empty | No entitlement |
| Title Detail | Book summary | Title id | Available, locked | Sample only |
| Player | Audio playback | Seek, speed | Playing, paused | Chapter skip |
| Chapter List | Navigation by chapter | Chapter select | Loaded, cached | Missing markers |
| Bookmark | Saved listening points | Note, title | Active, archived | Duplicate note |
| Downloads | Offline files | Storage | Progress, done | Space full |
| Settings | Sync and playback | Timer, speed | Editable | Parental lock |

## Functional Requirements
- Support library browsing, title search, sample playback, and purchase or unlock actions.
- Support chapter navigation, playback speed, skip intervals, and sleep timer.
- Track listening progress at the book and chapter level.
- Support bookmarks with notes and jump-back behavior.
- Support offline downloads with resumable progress.
- Support returns or sample previews only if the business rules allow it.
- Keep library state synced across devices.
- Provide title recommendations and author pages as secondary discovery surfaces.

## Data Model
- `User`: membership tier, device list, playback preferences.
- `Title`: name, author, narrator, duration, chapter list, sample uri.
- `Chapter`: index, title, start offset, bookmarkable flag.
- `LibraryItem`: ownership state, progress, downloaded flag, last played.
- `Bookmark`: title id, chapter, offset, note, created at.
- `Credit`: value, status, source, expiry.
- `PlaybackSession`: speed, sleep timer, queue, resume position.

## API/Backend Contracts
- `GET /library`, `GET /titles`, `GET /titles/{id}`, `GET /authors/{id}`.
- `POST /titles/{id}/sample`, `POST /titles/{id}/unlock`.
- `POST /playback/start`, `POST /playback/seek`, `POST /playback/speed`.
- `GET /bookmarks`, `POST /bookmarks`, `DELETE /bookmarks/{id}`.
- `GET /downloads`, `POST /downloads`, `GET /credits`.
- Use progress sync endpoints that accept chapter offset and total duration.

## Realtime/Push/Offline
- Push on progress sync, book release, and credit or membership changes.
- Cache titles, library, bookmarks, and chapter metadata offline.
- Allow playback and bookmarking offline, then reconcile progress later.

## Permissions/Privacy/Safety
- Request notifications only for progress reminders or new releases.
- Treat listening history as private user data.
- Provide clear deletion and data export controls.

## Analytics Events
- `library_opened`, `title_opened`, `sample_played`, `title_unlocked`
- `playback_started`, `chapter_changed`, `bookmark_added`, `sleep_timer_set`
- `download_started`, `download_completed`, `progress_synced`

## Monetization
- Use membership tiers, credits, and purchase unlocks as the commercial model placeholder.
- Keep all paid prompts clearly separated from the player itself.

## Acceptance Tests
- User can start a sample, buy or unlock a title, and resume full playback.
- User can bookmark a chapter and jump back to it later.
- User can change speed and use a sleep timer.
- User can download a title and continue listening offline.
- User can sync progress across devices after reconnect.

## Implementation Notes
- Make resume progress monotonic and resilient to app restarts.
- Chapter offsets should be server-authored and validated against media duration.
- Use a device-sync service that only updates changed fields.
