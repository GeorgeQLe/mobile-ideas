# Character.AI-Style Companion Clone Spec

## Legal Scope
- Clone objective: build a persona-driven chat app with a character directory, creator tools, voice chat, and safety controls.
- Must not copy: Character.AI branding, character catalog, voice assets, moderation policy text, or proprietary persona data.
- Replacement brand/assets: use original character names, icons, and persona art.

## Product Goal
- Let users discover personas, chat with them naturally, and create or publish their own characters.
- Keep conversational continuity, safety filtering, and voice interactions front and center.

## Research Verification Checklist
- [ ] Character discovery layout and sorting
- [ ] Persona creation form and publishing workflow
- [ ] Voice call behavior, limits, and permissions
- [ ] Safety controls for age, content, and roleplay boundaries
- [ ] Memory controls and chat continuation behavior
- [ ] Monetization gates for fast responses or voice
- [ ] Share, report, and block flows
- [ ] Offline retry and cached chat history

## Core User Journeys
- User browses characters, selects one, and starts a chat.
- User continues a thread with the same persona and sees remembered context.
- User creates a new character with traits, greeting, and public tags.
- User initiates a voice session and returns to text chat afterward.
- User reports a problematic character or message.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Discover | Browse characters | featured, filtered, empty |
| Character Detail | View persona profile | public, private, blocked |
| Chat Thread | Converse with persona | streaming, retry, ended |
| Voice Session | Talk in real time | idle, speaking, listening |
| Create Character | Author a persona | draft, validation error |
| Creator Dashboard | Manage published personas | live, unpublished, reported |
| Safety Center | Review controls | standard, restricted |
| Subscription | Upgrade and compare | free, premium, trial |

## Functional Requirements
- Support persona metadata: name, greeting, description, tags, visibility, and example lines.
- Persist chats with per-character memory and regenerate controls.
- Provide voice mode with push-to-talk or tap-to-speak interaction.
- Support search, filters, favorites, and recent chats.
- Allow user report, block, and content restriction controls.
- Enforce character publishing validation and moderation review state.

## Data Model
- User: id, plan, age_gate_status, safety_profile.
- Character: id, owner_id, name, greeting, tags, visibility, moderation_state.
- Conversation: id, user_id, character_id, title, last_message_at.
- Message: id, conversation_id, role, content, mood, safety_labels.
- VoiceSession: id, conversation_id, status, duration_sec, audio_refs.
- CreatorProfile: id, user_id, published_count, strikes_count.

## API/Backend Contracts
- `GET /characters`, `GET /characters/:id`, `POST /characters`.
- `POST /conversations`, `GET /conversations/:id/messages`, `POST /messages`.
- `POST /voice/sessions`, `PATCH /voice/sessions/:id`.
- `POST /reports`, `POST /blocks`, `GET /creator/dashboard`.
- Stream responses over SSE/websocket with content moderation checkpoints.

## Realtime/Push/Offline
- Stream character replies and voice state in realtime.
- Push on follows, creator approvals, and moderation actions.
- Cache recent chats and favorites offline for read-only access.
- Queue outgoing text drafts if connectivity drops.

## Permissions/Privacy/Safety
- Request microphone access only for voice sessions.
- Apply content filters for sexual content, self-harm, abuse, and impersonation.
- Keep age-gated content inaccessible until verified.
- Make report/block actions immediate and reversible only through support flow.

## Analytics Events
- `character_viewed`, `chat_started`, `message_sent`, `voice_session_started`
- `character_created`, `character_published`, `character_reported`, `character_blocked`
- `subscription_viewed`, `subscription_upgraded`

## Monetization
- Free tier with chat caps and reduced voice access.
- Paid tier with faster response, longer memory, and expanded voice limits.

## Acceptance Tests
- User can select a character and receive a streamed persona reply.
- User can create and save a draft character.
- User can start and end a voice session without losing chat history.
- User can report a character and see confirmation.
- Restricted content remains hidden from underage or blocked accounts.

## Implementation Notes
- Treat character metadata as content objects requiring moderation before publish.
- Keep memory separate from raw transcript and attach it per character.
- Voice should degrade cleanly to text-only when permissions are denied.
- Verify actual discovery, publish, and premium gates with direct product research.

