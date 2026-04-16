# YouTube-Style Clone Spec

## Legal Scope
- Build a video platform with original branding, thumbnails, copy, and upload workflows.
- Do not copy YouTube marks, ranking algorithms, or proprietary creator analytics.
- Use licensed or user-owned media only.
- Do not depend on private Google services or hidden APIs.

## Product Goal
- Let users watch, search, subscribe, comment, and upload from one mobile app.
- Make the watch page and creator channel feel equally important.

## Research Verification Checklist
- Verify home feed, subscriptions tab, watch page, and shorts entry point from public observation.
- Verify comments, likes, playlists, and channel navigation.
- Verify upload steps, visibility settings, and processing states.
- Verify history, watch later, and notification behavior from support docs.

## Core User Journeys
- User opens home, taps a video, and continues watching related content.
- User subscribes to a channel and sees uploads in the subscriptions feed.
- User adds a video to Watch Later or a playlist.
- Creator uploads a video, sets visibility, and waits for processing.
- User comments, likes, and shares a video or short.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Recommendation feed | None | Fresh, personalized | Cold start |
| Shorts | Vertical video feed | Swipe, like | Playing, paused | Low bandwidth |
| Search | Discovery | Query, filters | Typing, results | No result |
| Watch | Video playback page | Seek, caption | Playing, paused | Caption missing |
| Channel | Creator home | Channel id | Active, empty | No uploads |
| Comments | Discussion thread | Text, replies | Loaded, moderated | Spam filter |
| Upload | Creator publish flow | File, title, privacy | Draft, processing | Codec failure |
| Library | History and saved lists | Sort, delete | Populated, empty | Sync lag |
| Settings | Account and privacy | Preferences | Editable | Reauth required |

## Functional Requirements
- Support watch, pause, seek, captions, autoplay, and playback speed.
- Support subscribe, unsubscribe, comment, like, share, and playlist actions.
- Support watch later, history, and liked videos.
- Support upload, metadata editing, privacy selection, and asynchronous processing.
- Support channel pages with tabs for videos, shorts, playlists, and about.
- Support shorts as a separate feed and player mode.
- Keep search available from every major tab.
- Support content moderation and report flows.

## Data Model
- `User`: account, subscription list, watch history, privacy settings.
- `Channel`: name, avatar, handle, verification state, tab data.
- `Video`: title, description, thumbnails, visibility, processing state.
- `Comment`: author, text, thread id, moderation state.
- `Playlist`: title, owner, visibility, ordered video ids.
- `UploadJob`: file ref, progress, failure reason, publish state.
- `HistoryItem`: video id, watched at, progress, device.

## API/Backend Contracts
- `GET /home`, `GET /search?q=`, `GET /videos/{id}`, `GET /channels/{id}`.
- `POST /subscriptions`, `DELETE /subscriptions/{id}`.
- `POST /watch-later`, `POST /likes`, `POST /comments`.
- `POST /uploads`, `PATCH /uploads/{id}`, `GET /uploads/{id}`.
- `GET /history`, `GET /playlists`, `POST /playlists`.
- Upload processing should be asynchronous and expose job status polling.

## Realtime/Push/Offline
- Push for new uploads, comment replies, and upload completion.
- Cache subscriptions, history, and saved lists offline.
- Support buffered playback and resume progress when network is poor.

## Permissions/Privacy/Safety
- Request camera or microphone only if recording is later added.
- Let users manage comment privacy, blocked users, and history deletion.
- Add moderation, age gating, and abuse reporting controls.

## Analytics Events
- `video_opened`, `watch_started`, `watch_completed`, `short_swiped`
- `channel_subscribed`, `comment_posted`, `playlist_added`, `upload_started`
- `upload_completed`, `report_submitted`

## Monetization
- Use ads, premium subscription, and channel membership placeholders.
- Keep monetization separated from essential upload and playback flows.

## Acceptance Tests
- User can watch a video, comment, and add it to Watch Later.
- User can subscribe to a channel and see it in subscriptions.
- Creator can upload a video and see processing status.
- User can open shorts as a dedicated feed.
- User can delete history and no longer see prior watch items.

## Implementation Notes
- Separate creator upload state from viewer playback state.
- Use one media abstraction for long-form video and shorts.
- Keep comment threading shallow enough for mobile readability.
