# WhatsApp-Style Messenger Clone Spec

## Legal Scope
- Clone objective: build a phone-number-based messenger with 1:1 chats, groups, communities, voice notes, calls, media sharing, and backup settings.
- Must not copy: WhatsApp branding, cryptographic implementations, stickers, or private backend protocols.
- Replacement brand/assets: use original chat bubbles, icons, and app identity.

## Product Goal
- Let users message contacts quickly, join groups, place calls, and restore chat history across devices.

## Research Verification Checklist
- [ ] Phone-number onboarding and device verification
- [ ] Chat, group, and community organization
- [ ] Voice note, voice call, and video call behavior
- [ ] Media sharing, status, and link preview flow
- [ ] Backup, restore, and device migration behavior
- [ ] Privacy controls, last-seen, and read receipt behavior
- [ ] Notification and unread badge behavior
- [ ] Offline send/retry and delivery states

## Core User Journeys
- User verifies a phone number and starts a chat with a contact.
- User sends voice notes, images, and documents in a thread.
- User creates or joins a group and manages membership.
- User places a voice or video call.
- User backs up chats and restores on a new device.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Onboarding | Phone verification | new, retry, blocked |
| Chats | Thread list | unread, archived, muted |
| Thread | 1:1 or group chat | sending, delivered, failed |
| Group Info | Members and settings | admin, member, pending |
| Call Screen | Voice/video call UI | connecting, live, ended |
| Communities | Group-of-groups hub | joined, discover, empty |
| Settings | Privacy and backups | default, encrypted, off |
| Media Viewer | Open shared content | loading, downloaded |

## Functional Requirements
- Support 1:1 chats, groups, and community containers.
- Support text, voice notes, photos, videos, documents, stickers, and links.
- Support delivery/read receipts, typing indicators, and message reactions where enabled.
- Support voice and video calls with call history and reconnect logic.
- Support chat export/backup with user-controlled retention settings.
- Support blocked contacts, invite links, and group admin controls.

## Data Model
- User: id, phone_hash, display_name, avatar_url, privacy, backup_pref.
- Contact: id, owner_user_id, contact_user_id, label, blocked.
- Thread: id, type, participant_ids, muted_at, archived_at.
- Message: id, thread_id, sender_id, body, media_refs, status, quoted_message_id.
- CallSession: id, thread_id, call_type, status, started_at, ended_at.
- BackupRecord: id, user_id, version, encrypted_blob_ref, created_at.

## API/Backend Contracts
- `POST /auth/phone/start`, `POST /auth/phone/verify`
- `GET /threads`, `POST /threads`, `GET /threads/:id/messages`
- `POST /threads/:id/messages`, `POST /uploads`, `POST /calls`
- `POST /groups`, `POST /groups/:id/members`, `PATCH /groups/:id`
- `GET /backups`, `POST /backups/restore`, `PATCH /settings/privacy`
- Use signed media uploads and delivery acknowledgements.

## Realtime/Push/Offline
- Push on messages, calls, and group events.
- Cache recent chats and media thumbnails offline.
- Queue outgoing messages and upload retries when offline.
- Update read receipts and typing indicators in realtime when connected.

## Permissions/Privacy/Safety
- Request contacts, microphone, camera, and notifications only when needed.
- Keep privacy settings for last seen, profile photo, and group invites explicit.
- Apply spam and abuse controls to invites, group joins, and unknown senders.
- Treat backup and restore settings as user-controlled sensitive operations.

## Analytics Events
- `phone_verified`, `chat_started`, `message_sent`, `voice_note_sent`
- `group_created`, `call_started`, `backup_enabled`, `backup_restored`
- `media_shared`, `privacy_updated`, `message_failed`

## Monetization
- Keep consumer messaging free; monetize through business messaging or optional premium tools.

## Acceptance Tests
- User can verify a phone number and send a message.
- User can create a group and add members.
- Voice note upload and playback work offline after sync.
- Call screen connects and ends cleanly.
- Backup restore returns the expected chat history.

## Implementation Notes
- Use an abstraction for encrypted transport and store only what the product needs.
- Keep thread state authoritative on the server to support multi-device sync.
- Design delivery states so failed sends are obvious and recoverable.
- Verify exact backup, community, and call behavior through live product research.

