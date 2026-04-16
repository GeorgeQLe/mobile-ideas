# Twitch-Style Clone Spec

## Legal Scope
- Build a live-streaming app with original branding, chat styling, and creator tooling.
- Do not copy Twitch marks, emote packs, proprietary moderation systems, or ingest endpoints.
- Use lawful test streams and licensed media only.
- Treat subscriptions, bits, and ads as optional commercial modules.

## Product Goal
- Let a user discover live channels, watch a stream, and participate in chat.
- Make live status, follows, and moderation controls visible at all times.

## Research Verification Checklist
- Verify home, directory, channel pages, and live player layout from public observation.
- Verify chat, subscriptions, clips, and follow state behavior.
- Verify moderation, slow mode, and channel metadata surfaces.
- Verify subscription prompts and creator dashboard concepts from support content.

## Core User Journeys
- Viewer opens the app, finds a live channel, and joins chat.
- Viewer follows a streamer and gets notified when the channel goes live.
- Creator starts a stream, sees chat activity, and manages moderation.
- User creates a clip or bookmarks a moment from a live stream.
- Moderator mutes, times out, or bans a disruptive user.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Live and recommended channels | None | Live, empty | No live streams |
| Directory | Browse by category | Game/category filter | Populated, empty | Wrong tag |
| Channel | Stream and metadata | Channel id | Live, offline | Raid redirect |
| Player | Video and chat view | Volume, quality | Playing, paused | Stream delay |
| Chat | Live conversation | Text, emotes | Active, slow mode | Banned user |
| Clips | Highlight moments | Clip create | Published, draft | Copyright mute |
| Follows | Followed channels | Sort, alert | Populated, empty | Unfollowed |
| Moderation | Channel control | Timeout, ban | Editable | Permission denied |
| Settings | Notifications and safety | Preferences | Editable | Reauth required |

## Functional Requirements
- Support live playback, follow, unfollow, and stream discovery.
- Support chat messages, emotes, replies, slow mode, and moderation actions.
- Support channel pages with schedule, about, clips, and videos tabs.
- Support clip creation and sharing from live playback.
- Support notifications for live start, raids, and special events.
- Support stream metadata, category browsing, and search.
- Keep viewer and moderator permissions distinct.
- Preserve chat state and playback position during reconnects.

## Data Model
- `User`: account, follow list, subscriptions, moderation role.
- `Channel`: title, category, live state, schedule, tags.
- `StreamSession`: stream key, status, latency, viewer count.
- `ChatMessage`: author, text, timestamp, moderation state.
- `Clip`: stream id, start offset, duration, title, visibility.
- `ModerationAction`: actor, target, type, duration, reason.
- `Subscription`: channel id, tier, renewal state.

## API/Backend Contracts
- `GET /home`, `GET /directory`, `GET /channels/{id}`.
- `POST /follows`, `DELETE /follows/{id}`.
- `GET /chat/stream/{channelId}`, `POST /chat/messages`.
- `POST /clips`, `GET /clips`, `POST /moderation/actions`.
- `POST /streams/start`, `POST /streams/stop`, `GET /streams/{id}`.
- Use websocket or realtime pub/sub for chat and live state.

## Realtime/Push/Offline
- Live chat and stream state must use websocket-style realtime transport.
- Push for followed channel live starts and clip publishes.
- Cache follows, clips, and recent channels offline.

## Permissions/Privacy/Safety
- Require moderator permissions before moderation actions are shown.
- Support chat safety tools: block, report, keyword filters, and slow mode.
- Redact private moderation notes from public analytics.

## Analytics Events
- `channel_viewed`, `stream_joined`, `chat_message_sent`, `clip_created`
- `channel_followed`, `notification_enabled`, `moderation_actioned`, `subscription_started`

## Monetization
- Use channel subscriptions, ads, and tipping placeholders.
- Keep monetization from breaking chat or stream playback state.

## Acceptance Tests
- Viewer can join a live channel and send a chat message.
- Viewer can follow a channel and receive a live notification.
- Creator can start a stream and see live status update in real time.
- Moderator can timeout a chat user and the action is reflected immediately.
- Viewer can create a clip and share it from the channel page.

## Implementation Notes
- Split realtime chat from video delivery so each subsystem can scale independently.
- Model moderation as an auditable action log.
- Make reconnect logic replay missed chat state without duplicating messages.
