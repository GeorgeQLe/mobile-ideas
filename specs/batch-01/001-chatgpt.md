# ChatGPT-Style Assistant Clone Spec

## Legal Scope
- Clone objective: reproduce a multimodal assistant experience with chat history, model selection, file/image input, voice mode, memory, and shared chats.
- Must not copy: OpenAI branding, logos, proprietary prompts, private APIs, model names, or UI assets.
- Replacement brand/assets: use an original app name, original icon set, and original assistant persona copy.

## Product Goal
- Let a user ask questions, upload files or images, continue prior chats, and switch response modes without leaving the app.
- Support quick capture, fast answer streaming, and a durable library of conversations.

## Research Verification Checklist
- [ ] App store listing and pricing tiers
- [ ] Onboarding, auth, and device-link flow
- [ ] Primary tabs and chat history organization
- [ ] File/image attachment limits and supported types
- [ ] Voice mode behavior and microphone permissions
- [ ] Memory and personalization settings
- [ ] Share/export behavior and safety prompts
- [ ] Offline and retry behavior for interrupted generations

## Core User Journeys
- New user creates account, chooses a default assistant mode, and lands in a fresh chat.
- Returning user resumes a prior thread, attaches a file, and asks a follow-up.
- User switches models or response styles mid-thread.
- User shares a conversation link or exports content.
- User edits memory/privacy settings and clears chat history.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Welcome/Auth | Sign in and create account | guest, error, rate-limited |
| Home/History | Browse threads and start new ones | empty, populated, search |
| Chat Thread | Compose, stream, edit, regenerate | pending, streaming, error |
| Attachment Picker | Add image, file, or camera input | permission denied, limit hit |
| Voice Mode | Speak and listen in real time | idle, recording, transcribing |
| Memory Settings | Manage saved preferences | enabled, disabled, clear all |
| Share/Export | Create share link or export | success, revoked, blocked |
| Subscription | Compare plans and upgrade | free, trial, paid, canceled |

## Functional Requirements
- Persist conversations with title generation and server sync.
- Stream assistant output token by token and preserve partial state on reconnect.
- Support text, image, and document messages with upload progress and validation.
- Provide a model picker with capability labels and clear cost/latency hints.
- Allow message edit, retry, regenerate, and copy actions.
- Store pinned memory facts separately from raw chat content.
- Provide conversation search by title, message text, and attached file name.
- Allow user-initiated chat deletion, export, and temporary incognito-style new chat.

## Data Model
- User: id, auth refs, plan, locale, safety settings.
- Conversation: id, title, model preset, created_at, updated_at, pinned, archived.
- Message: id, conversation_id, role, content, status, citation_refs, attachment_ids.
- Attachment: id, type, mime, size, storage_url, virus_scan_status.
- MemoryEntry: id, user_id, fact, source_conversation_id, enabled.
- ShareLink: id, conversation_id, token, expires_at, revoked_at.

## API/Backend Contracts
- `POST /auth/*` for session creation and recovery.
- `GET /conversations`, `POST /conversations`, `PATCH /conversations/:id`.
- `GET /conversations/:id/messages`, `POST /messages`, `PATCH /messages/:id`.
- `POST /attachments` or signed upload URL flow, with post-upload validation.
- `GET /models`, `GET /memory`, `PATCH /memory/settings`.
- Stream assistant responses over websocket or SSE with resumable generation ids.

## Realtime/Push/Offline
- Stream partial responses live and reconcile on reconnect.
- Push notifications for completed long-running tasks, shared chats, and account alerts.
- Cache recent conversations, drafts, and downloaded attachments for offline viewing.
- Queue send actions locally and retry when connectivity returns.

## Permissions/Privacy/Safety
- Request microphone, camera, and file access only on explicit user action.
- Store chat content under user-controlled retention policies and clear-history controls.
- Add safety checks for self-harm, abuse, sexual content, and disallowed requests.
- Do not train on private user content by default unless an explicit setting says so.

## Analytics Events
- `signup_completed`, `chat_started`, `message_sent`, `assistant_stream_started`
- `attachment_added`, `model_changed`, `memory_updated`, `share_link_created`
- `subscription_viewed`, `subscription_purchased`, `conversation_deleted`

## Monetization
- Free tier with usage caps, slower model options, and limited voice or file features.
- Paid tier with higher limits, premium models, longer context, and advanced voice.

## Acceptance Tests
- User can sign in, start a chat, and receive a streamed reply.
- User can upload an image or PDF and ask a follow-up about it.
- User can change models without losing conversation state.
- User can clear memory and confirm the change persists after relaunch.
- Offline send queues correctly and recovers after network return.

## Implementation Notes
- Keep conversation state normalized so model changes and retries do not duplicate messages.
- Use signed uploads and background scanning before attachments become visible.
- Treat memory as a separate subsystem with explicit user controls and auditability.
- Verify exact tab names, limits, and plan gates against live product research before build.
