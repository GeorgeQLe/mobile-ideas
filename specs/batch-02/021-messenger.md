# Messenger-Style Clone Spec

## Legal Scope
- Clone objective: reproduce a social-graph messenger with chats, groups, reactions, calls, and message status.
- Must not copy: brand marks, UI art, proprietary ranking, private APIs, or any third-party media.
- Original replacement brand: neutral app name, icon, palette, and empty-state copy.

## Product Goal
- Provide a fast personal-and-group messaging app centered on phone-number or account-based identity.
- Support direct chats, group conversations, media sharing, read receipts, voice/video calls, and lightweight social extras.
- Keep the experience lawful, interoperable only through owned backend services, and distinct in visual identity.

## Research Verification Checklist
- Verify actual tab structure, onboarding order, and default privacy settings.
- Verify chat request, archive, story, and call entry points from public observation.
- Verify attachment types, message actions, and any account recovery flows.
- Verification status: not yet researched beyond backlog; confirm before UI lock.

## Core User Journeys
- Sign up, create profile, discover contacts, start a 1:1 chat.
- Form a group, name it, add members, share media, react, reply, and pin.
- Start a voice or video call from chat or contact detail.
- Review message requests, archived chats, blocked users, and notification settings.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Welcome | Entry and sign-in | phone/email, code | loading, error | invalid code, rate limit |
| Inbox | Chat list | search, filters | empty, populated | sync delay, archived items |
| Thread | Message exchange | text, media, reactions | sending, failed | duplicate send, offline queue |
| Composer | Build message | text, attachments, voice note | draft, uploading | large media, permission denied |
| Call | Voice/video session | mic, camera, speaker | connecting, live, dropped | poor network, backgrounding |
| Profile | Identity and settings | name, photo, status | view/edit | blocked user, missing avatar |
| Requests | Pending inbound chats | accept, ignore, block | new, empty | spam, abuse report |
| Settings | Privacy and app controls | toggles, account actions | saved, invalid | auth expired, device mismatch |

## Functional Requirements
- Thread list with unread counts, last-message preview, pinned chats, and archive.
- Per-message actions: reply, react, copy, forward, delete for self, and report.
- Group chat management with member roles, mute, mentions, and invite links.
- Optional story/status surface only if verified; otherwise keep as deferred scope.

## Data Model
- User, ContactEdge, Thread, ThreadMember, Message, Reaction, Attachment, CallSession, BlockRule, StoryPost.
- Message supports delivery state, read state, edit history, and ephemeral expiry metadata.
- Conversation search index should be materialized for subject, sender, and attachment type.

## API/Backend Contracts
- Auth: email/phone sign-in, session refresh, device registration, revoke session.
- Reads: `/threads`, `/threads/{id}`, `/messages`, `/contacts`, `/requests`, `/calls/{id}`.
- Writes: send/edit/delete message, add reaction, mute thread, create group, start call, report abuse.
- Realtime: websocket or push-backed events for new messages, typing, presence, read receipts, call state.

## Realtime/Push/Offline
- Queue outbound text/media offline and reconcile with server IDs on reconnect.
- Push on new message, mention, call invite, and safety actions.
- Presence and typing are best-effort and should degrade gracefully when unavailable.

## Permissions/Privacy/Safety
- Request contacts, microphone, camera, photos, and notifications only when the user triggers the feature.
- Provide block, report, screenshot-warning policy if applicable, and message-request controls.
- Store minimal metadata; separate message content from device identity where possible.

## Analytics Events
- `signup_started`, `chat_created`, `message_sent`, `message_failed`, `reaction_added`, `call_started`, `call_connected`, `thread_muted`, `user_reported`, `contact_imported`.

## Monetization
- Freemium model with optional premium themes, storage, or call-enhancement features.
- Keep monetization separate from core messaging reliability.

## Acceptance Tests
- Send text, image, and voice message in a 1:1 thread and verify delivery states.
- Create a group, add members, mute it, and verify unread handling.
- Start and end a call with mic/camera permissions denied then granted.
- Go offline, send messages, reconnect, and confirm ordering plus deduplication.

## Implementation Notes
- Use a local-first cache for inbox and drafts with deterministic server reconciliation.
- Model message delivery as an event stream so read receipts and call signaling reuse the same transport.
- Verify any story/status scope before building because it materially changes navigation.

