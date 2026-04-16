# Telegram-Style Cloud Messenger Clone Spec

## Legal Scope
- Clone objective: build a cloud-synced messenger with channels, large groups, bots, folders, reactions, and media-rich message actions.
- Must not copy: Telegram branding, sticker packs, proprietary bot APIs, or private protocol details.
- Replacement brand/assets: use original app name, icons, and message chrome.

## Product Goal
- Let users chat across devices, subscribe to channels, automate with bots, and organize conversations with folders.

## Research Verification Checklist
- [ ] Cloud sync and multi-device behavior
- [ ] Channels, groups, and large membership limits
- [ ] Bot command flow and web app attachments
- [ ] Folders, pinned chats, and message search
- [ ] Silent/scheduled messages if supported
- [ ] Media albums, reactions, and forwards
- [ ] Privacy settings and invite links
- [ ] Offline cache and sync conflict handling

## Core User Journeys
- User starts a chat, then continues it on another device.
- User subscribes to a channel and pins it.
- User creates a group and adds bots or moderators.
- User organizes chats into folders and archives old threads.
- User sends media, forwards content, and reacts to messages.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Chat List | Browse all conversations | pinned, archived, foldered |
| Thread | Message history | sending, edited, forwarded |
| Channel | Broadcast feed | subscribed, muted, restricted |
| Group | Large group chat | member, admin, locked |
| Bot Chat | Command-driven interaction | waiting, result, error |
| Folders | Organize chats | default, custom, empty |
| Search | Find messages and chats | no results, filtered |
| Settings | Privacy and storage | default, auto-download |

## Functional Requirements
- Support 1:1 chats, groups, channels, bots, and folders.
- Support message edits, deletions, pins, forwards, reactions, and replies.
- Support large media attachments, albums, and inline previews.
- Support search across messages, files, and channel posts.
- Support archival, mute controls, and chat list reordering.
- Support scheduled/silent sends if enabled in product scope.

## Data Model
- User: id, handle, display_name, privacy, device_count.
- Chat: id, type, participant_ids, folder_id, pinned, archived.
- Message: id, chat_id, sender_id, body, media_refs, edited_at, forwarded_from_id.
- Channel: id, owner_id, title, description, subscriber_count, public.
- Bot: id, owner_id, name, command_schema, webhook_url.
- Folder: id, user_id, name, chat_ids, sort_order.

## API/Backend Contracts
- `GET /chats`, `POST /chats`, `GET /chats/:id/messages`
- `POST /messages`, `PATCH /messages/:id`, `POST /messages/:id/reactions`
- `GET /channels`, `POST /channels`, `POST /channels/:id/subscribe`
- `POST /bots`, `POST /bots/:id/webhook`, `GET /folders`, `PATCH /folders/:id`
- Support cursor search and cross-device sync tokens.

## Realtime/Push/Offline
- Push on mentions, replies, and channel posts.
- Cache chats and pinned items offline.
- Sync edits, deletes, and reaction changes across devices.
- Queue uploads and message sends until reconnect.

## Permissions/Privacy/Safety
- Support phone or username-based identity with configurable discoverability.
- Hide phone contact details unless the user explicitly shares them.
- Provide invite-link controls, admin roles, and spam mitigation.
- Keep bots sandboxed and permission-scoped.

## Analytics Events
- `chat_opened`, `message_sent`, `message_edited`, `reaction_added`
- `channel_joined`, `bot_used`, `folder_created`, `search_used`
- `archive_toggled`, `privacy_updated`

## Monetization
- Free core app with optional premium subscriptions for larger uploads, extra folders, or profile customization.

## Acceptance Tests
- User can send a message and see it sync on another device.
- User can join a channel and pin it in a folder.
- User can use a bot command and receive a structured response.
- Message edits and deletions propagate to all clients.
- Offline message queues and sends after reconnect.

## Implementation Notes
- Treat channels and bots as distinct object types so permissions stay clean.
- Keep cloud sync authoritative and conflict-aware at the message layer.
- Build search as a first-class backend index, not an in-memory filter.
- Verify exact limits, bot affordances, and folder behavior with live research.

