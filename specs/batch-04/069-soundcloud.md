# SoundCloud-Style Clone Spec

## Legal Scope
- Build a creator-friendly audio platform with original branding, layout, and copy.
- Do not copy SoundCloud marks, waveform visuals, or proprietary recommendation logic.
- Use user-uploaded or licensed audio only; never rely on unauthorized tracks.
- Treat creator monetization as an optional later phase, not a core dependency.

## Product Goal
- Help creators upload tracks, listeners discover audio, and both sides interact around time-coded moments.
- Preserve the social layer: reposts, comments, follows, and profile identity matter here.

## Research Verification Checklist
- Verify upload flow, waveform rendering, and track page layout from public observation.
- Verify comments at timestamp positions, likes, reposts, and playlist behavior.
- Verify creator profile structure, upload processing, and playback state handling.
- Verify monetization prompts, privacy controls, and moderation surfaces from support docs.

## Core User Journeys
- Creator uploads a track, fills metadata, and waits for processing.
- Listener opens a track, plays it, comments at a moment, and reposts it.
- User follows a creator, adds a track to a playlist, and returns later from the feed.
- Creator edits track metadata or visibility and sees the change propagate.
- User reports abuse or hides content from recommendations.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Feed and discovery | None | Fresh, personalized | Empty feed |
| Upload | Track submission | File, title, tags | Processing, failed | Unsupported codec |
| Track Detail | Playback and engagement | Track id | Live, removed | Geo block |
| Waveform | Comment timeline | Comment text | Seekable, cached | Low-res render |
| Creator Profile | Artist identity | Profile fields | Public, private | Taken name |
| Playlist | Saved collections | Reorder, add | Editable, shared | Duplicate track |
| Library | Likes and saves | Sort, filter | Populated, empty | Sync delay |
| Messages/Comments | Social discussion | Text, replies | Open, moderated | Abuse report |

## Functional Requirements
- Support upload, transcoding, metadata editing, and publication states.
- Render waveform or waveform-like scrubber with comment markers.
- Support likes, reposts, comments, playlists, follows, and profile pages.
- Allow public, private, and unlisted visibility modes for uploads.
- Track playback progress and recent listens.
- Provide moderation actions: report, block, mute, remove, and hide.
- Surface creator analytics for plays, likes, and follower growth.
- Support download permission rules if the content owner allows it.

## Data Model
- `User`: profile, role, verification state, moderation state.
- `Track`: title, description, upload status, visibility, media refs.
- `WaveformMarker`: time offset, comment id, moderation flag.
- `Comment`: author, timestamp, text, thread state.
- `Playlist`: title, owner, visibility, ordered track ids.
- `Follow`: follower, creator, notification preference.
- `UploadJob`: codec, progress, failure reason, publish state.

## API/Backend Contracts
- `POST /tracks/upload`, `PATCH /tracks/{id}`, `GET /tracks/{id}`.
- `GET /tracks/{id}/waveform`, `POST /tracks/{id}/comments`.
- `POST /tracks/{id}/like`, `POST /tracks/{id}/repost`, `POST /tracks/{id}/report`.
- `GET /profiles/{id}`, `POST /profiles/{id}/follow`.
- `GET /playlists/{id}`, `POST /playlists`, `PATCH /playlists/{id}`.
- Upload processing should be asynchronous with job status polling or push.

## Realtime/Push/Offline
- Push on upload completion, comment replies, likes, reposts, and moderation events.
- Cache recent tracks and profile data offline.
- Playback should continue from buffered media when connectivity drops.

## Permissions/Privacy/Safety
- Request microphone only if recording is later added; not required for basic clone scope.
- Protect creator and listener identity settings separately.
- Add strong moderation controls for harassment, spam, and copyrighted uploads.

## Analytics Events
- `upload_started`, `upload_completed`, `track_published`, `play_started`
- `comment_added`, `comment_timed`, `repost_created`, `profile_followed`
- `report_submitted`, `moderation_actioned`, `playlist_created`

## Monetization
- Use creator subscriptions, tipping, or promotion placements as optional later placeholders.
- Keep paid tools separated from free listening and upload basics.

## Acceptance Tests
- Creator can upload a file, see processing, and publish the track.
- Listener can post a comment at a timestamp and see it on replay.
- User can repost a track and follow a creator.
- User can hide content and report abuse from the track page.
- Offline listener can still play cached content.

## Implementation Notes
- Build upload and transcoding as async jobs with clear state transitions.
- Store comment offsets independently of waveform rendering so markers remain stable.
- Keep moderation decisions reversible and auditable.
