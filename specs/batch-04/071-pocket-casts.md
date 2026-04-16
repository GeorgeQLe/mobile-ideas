# Pocket Casts-Style Clone Spec

## Legal Scope
- Build a podcast client with original branding, artwork, and copy.
- Do not copy Pocket Casts marks, podcast catalog data, or proprietary sync logic.
- Use licensed podcast feeds or synthetic feeds for development.
- Keep playback and subscription features independent so either can ship first.

## Product Goal
- Make podcast discovery, queueing, and episode playback simple and resilient.
- Provide strong playback tools: speed, skip, silence trim, downloads, and sync.

## Research Verification Checklist
- Verify show pages, episode lists, queue controls, and playback options from public observation.
- Verify filters, search, and subscription organization.
- Verify download, auto-download, and offline resume behavior.
- Verify account sync and premium gating surfaces from support docs.

## Core User Journeys
- User searches for a show, subscribes, and sees new episodes in the feed.
- User opens an episode, adjusts speed, and adds it to the queue.
- User downloads episodes for offline listening and later resumes progress.
- User creates filters or folders to organize a large library.
- User marks an episode played or archived and syncs the state across devices.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | New episodes and continue listening | None | Populated, empty | No subscriptions |
| Search | Show discovery | Query, filters | Typing, results | No feed match |
| Show Detail | Podcast profile | Show id | Subscribed, unsubscribed | Missing artwork |
| Episode Detail | Episode metadata | Episode id | Played, unplayed | Partial download |
| Player | Playback controls | Seek, speed, trim | Playing, paused | Network dropout |
| Queue | Up-next order | Reorder, remove | Editable, locked | Empty queue |
| Filters | Smart organization | Rules | Active, inactive | Conflicting rules |
| Downloads | Offline episodes | Select episodes | Progress, done | Storage full |
| Settings | Sync and playback | Preferences | Editable | Reauth required |

## Functional Requirements
- Support subscribe, unsubscribe, queue, play, pause, seek, and skip controls.
- Support variable speed, silence trim, and chapter markers when available.
- Support episode archiving, played state, and manual queue ordering.
- Support auto-download and download cleanup rules.
- Organize content by subscriptions, filters, folders, and archives.
- Preserve playback progress and queue state across devices.
- Keep search and discovery fast with recent queries and cached suggestions.
- Support shared links that open directly to show or episode pages.

## Data Model
- `User`: account, playback prefs, sync prefs, plan tier.
- `Show`: title, author, artwork, description, feed source.
- `Episode`: title, publish date, duration, media uri, played state.
- `Subscription`: show id, notification prefs, auto-download flag.
- `QueueItem`: episode id, position, pinned flag.
- `FilterRule`: name, conditions, target folder.
- `PlaybackSession`: position, speed, trim, current episode, device.

## API/Backend Contracts
- `GET /home`, `GET /search?q=`, `GET /shows/{id}`, `GET /episodes/{id}`.
- `POST /subscriptions`, `DELETE /subscriptions/{id}`.
- `GET /queue`, `POST /queue`, `PATCH /queue/{id}`.
- `POST /playback/start`, `POST /playback/seek`, `POST /playback/progress`.
- `GET /downloads`, `POST /downloads`, `GET /filters`, `POST /filters`.
- Use feed polling or webhooks for new episode ingestion.

## Realtime/Push/Offline
- Push on new episodes, queue changes, and sync completion.
- Cache subscriptions, episodes, and queue metadata offline.
- Allow playback from downloaded episodes without connectivity.

## Permissions/Privacy/Safety
- Request notifications only for new episodes or queue reminders.
- Treat listening history and subscriptions as private data.
- Offer delete, export, and account unlink controls.

## Analytics Events
- `show_followed`, `episode_played`, `episode_completed`, `queue_added`
- `download_started`, `download_completed`, `filter_created`, `speed_changed`
- `sync_failed`, `notification_enabled`

## Monetization
- Use premium features for advanced filters, cloud sync, and custom playback options.
- Keep upgrade prompts out of the player chrome.

## Acceptance Tests
- User can subscribe to a show and see new episodes in home.
- User can play an episode, change speed, and resume later at the same position.
- User can download episodes and play them offline.
- User can create a filter and see matching episodes grouped correctly.
- User can reorder queue items and sync the order to another device.

## Implementation Notes
- Model podcast feeds as importable sources with periodic refresh jobs.
- Keep playback settings separate from episode state so they can be reused across titles.
- Make queue updates idempotent to survive reconnect retries.
