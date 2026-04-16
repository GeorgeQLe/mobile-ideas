# Snapchat-Style Camera Messenger Clone Spec

## Legal Scope
- Clone objective: build a camera-first app with ephemeral snaps, stories, chat, friend map, and privacy-driven retention.
- Must not copy: Snapchat branding, lenses, map data, sticker assets, or proprietary ranking.
- Replacement brand/assets: use original camera UI, filters, and ephemeral message copy.

## Product Goal
- Start on the camera, send temporary media quickly, and keep friend messaging lightweight and privacy-aware.

## Research Verification Checklist
- [ ] Camera launch state and swipe navigation
- [ ] Snap send, story post, and chat retention rules
- [ ] Friend map and location sharing controls
- [ ] Lens/filter selection behavior
- [ ] Streaks, reminders, and notifications
- [ ] Memories or saved media behavior
- [ ] Safety and report/block flows
- [ ] Offline capture and delayed send behavior

## Core User Journeys
- User opens the camera, captures a snap, and sends it to friends.
- User posts a story and views who saw it.
- User chats with a friend using ephemeral media and text.
- User enables location sharing and views friends on a map.
- User saves a snap to memories or deletes it after sending.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Camera | Capture photo/video | idle, record, review |
| Send To | Pick recipients | recent, friends, blocked |
| Stories | View friend stories | seen, unseen, expired |
| Chat | Ephemeral conversation | text, snap, call |
| Map | Friend location view | off, ghost, shared |
| Memories | Saved content library | empty, archived, private |
| Profile | Friend code and settings | public, private |
| Settings | Privacy and retention | default, restricted |

## Functional Requirements
- Support photo, video, text, and sticker-based snaps with recipient selection.
- Support story posts with expiry and viewer tracking.
- Keep chat messages ephemeral by default with optional save-in-chat rules.
- Allow filters/lenses, captions, and drawing tools during capture.
- Support memories import/export and device-level save.
- Show streak state and expiry timers in a durable, low-friction way.

## Data Model
- User: id, display_name, privacy, location_sharing, streak_count.
- Snap: id, sender_id, media_ref, expires_at, save_policy.
- Story: id, user_id, media_ref, expires_at, viewers_count.
- ChatThread: id, participant_ids, last_snapped_at, saved_count.
- LocationShare: id, user_id, precision, active, expires_at.
- MemoryItem: id, user_id, media_ref, created_at, archived.

## API/Backend Contracts
- `POST /camera/capture`, `POST /snaps/send`, `GET /snaps/:id`.
- `POST /stories`, `GET /stories`, `POST /stories/:id/view`.
- `GET /chats`, `POST /chats/:id/messages`, `POST /chats/:id/save`.
- `POST /location/share`, `DELETE /location/share`.
- Use short-lived media URLs and hard expiry cleanup jobs.

## Realtime/Push/Offline
- Push on new snaps, story replies, and streak reminders.
- Cache captured media locally until send succeeds.
- Sync chats and memory uploads when network returns.
- Stream typing and view receipts where enabled.

## Permissions/Privacy/Safety
- Request camera, microphone, and location access explicitly.
- Enforce ephemeral retention and do not leak content past expiry.
- Provide friend controls, block lists, and report flows.
- Use location sharing as opt-in with visible precision and expiration.

## Analytics Events
- `camera_opened`, `snap_captured`, `snap_sent`, `story_posted`
- `story_viewed`, `location_shared`, `streak_updated`, `memory_saved`
- `report_submitted`, `friend_added`

## Monetization
- Ad-supported core app with optional premium filters, storage, or map features.
- Premium tiers can unlock advanced lenses and extended memories.

## Acceptance Tests
- User can capture and send a snap from the camera launch screen.
- Snap disappears after expiry and is not retrievable from the UI.
- Story posting and viewer counts work end to end.
- Location sharing can be enabled and disabled from settings.
- Offline capture is preserved until send completes.

## Implementation Notes
- Make the camera the root route so the app feels instant on launch.
- Treat expiration as a backend enforcement rule with cleanup jobs.
- Separate saved memories from temporary snaps to avoid accidental retention.
- Verify exact swipe layout, streak mechanics, and map behavior via live observation.

