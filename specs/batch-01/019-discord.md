# Discord-Style Community Chat Clone Spec

## Legal Scope
- Clone objective: build a server-based community chat app with channels, threads, voice rooms, roles, events, and granular notifications.
- Must not copy: Discord branding, emoji packs, private moderation logic, or proprietary voice infrastructure.
- Replacement brand/assets: use original server icons, channel chrome, and community copy.

## Product Goal
- Let users join communities, talk in text and voice, manage roles, and receive precise notification controls.

## Research Verification Checklist
- [ ] Server join flow and invite links
- [ ] Channel types, threads, and forums if included
- [ ] Voice room join, mute, and handoff behavior
- [ ] Roles, permissions, and moderation tools
- [ ] Events, reminders, and community announcements
- [ ] Direct messages and friend requests
- [ ] Notification granularity and mute scopes
- [ ] Offline cache and reconnect behavior

## Core User Journeys
- User joins a server, reads channels, and posts a message.
- User opens a thread, replies, and marks it as read.
- User enters a voice room and switches mute states.
- User is assigned a role and sees new permissions.
- User creates an event or announcement for a community.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Server List | Browse communities | joined, discover, empty |
| Channel | Read/write messages | text, media, locked |
| Thread | Focused reply view | open, collapsed, archived |
| Voice Room | Join voice conversation | connecting, live, muted |
| Members/Roles | Manage permissions | admin, mod, member |
| DMs | Private messages | unread, accepted, blocked |
| Events | Community scheduling | upcoming, live, canceled |
| Settings | Notifications and privacy | default, granular |

## Functional Requirements
- Support servers, channels, threads, DMs, and events.
- Support roles and permissions with admin, moderator, and member levels.
- Support text, media, reactions, pins, mentions, and thread replies.
- Support voice rooms with speaker/listener states and push-to-talk-like controls.
- Support granular notification controls by server, channel, and mention type.
- Support moderation actions: kick, ban, timeout, pin, lock, and slow mode.

## Data Model
- User: id, display_name, avatar_url, status, privacy.
- Server: id, owner_id, name, icon_url, member_count, verification_state.
- Channel: id, server_id, type, name, topic, nsfw_flag, slow_mode_sec.
- Message: id, channel_id, author_id, body, media_refs, thread_id, pinned.
- Role: id, server_id, name, permissions_mask, color.
- VoiceRoom: id, server_id, channel_id, status, participant_count.
- Event: id, server_id, title, starts_at, ends_at, rsvp_state.

## API/Backend Contracts
- `GET /servers`, `POST /servers`, `POST /servers/:id/join`
- `GET /channels/:id/messages`, `POST /channels/:id/messages`
- `POST /messages/:id/reactions`, `POST /messages/:id/pins`
- `POST /voice/rooms`, `POST /voice/rooms/:id/join`, `PATCH /voice/rooms/:id`
- `POST /roles`, `PATCH /members/:id/roles`, `POST /events`
- Use websocket transport for presence, typing, and voice state.

## Realtime/Push/Offline
- Push on mentions, DMs, event reminders, and moderation actions.
- Cache server/channel lists and recent messages offline.
- Sync read states, role changes, and thread updates across devices.
- Queue text sends during network interruptions.

## Permissions/Privacy/Safety
- Enforce server and channel permissions before content fetch.
- Support muted servers, hidden channels, and blocked users.
- Protect voice rooms with invite, stage, or moderator controls.
- Preserve audit trails for moderation actions and role changes.

## Analytics Events
- `server_joined`, `channel_opened`, `message_sent`, `thread_created`
- `voice_room_joined`, `role_changed`, `event_created`, `dm_sent`
- `notification_tuned`, `server_muted`, `moderation_action_taken`

## Monetization
- Premium subscription for cosmetic upgrades, larger uploads, or profile perks.
- Optional community boosts or server-level paid features can be added later.

## Acceptance Tests
- User can join a server, post in a channel, and open a thread.
- User can join a voice room and mute/unmute successfully.
- Role changes update visible permissions immediately.
- Notification controls can mute a server without muting DMs.
- Offline message draft survives restart and sends on reconnect.

## Implementation Notes
- Model permissions as bitmasks or resolved policy so channel access is deterministic.
- Keep voice session state separate from text channels and from presence.
- Treat threads as first-class objects instead of just message sort filters.
- Verify exact event, role, and notification behavior with live app research.

