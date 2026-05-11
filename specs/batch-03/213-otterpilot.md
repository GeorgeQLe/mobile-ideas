# OtterPilot-Style Clone Spec

> Metadata
> - Inspiration app: OtterPilot (by Otter.ai)
> - Category: AI meeting assistant, audio transcription, speaker diarization, meeting summaries
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-11.
> - Verification basis: exact public marketplace listings, first-party product pages, blog posts, publicly documented features.
> - Manual verification blockers: real-time transcription accuracy thresholds, speaker diarization confidence levels, calendar OAuth integration flows, virtual meeting audio capture (Zoom/Teams/Meet plugins), push notification payloads, subscription tier enforcement thresholds, and microphone background recording behavior require lawful test accounts and physical devices before one-for-one parity claims.
> - Legal scope: functional parity only; no original code, brand, copy, icons, model weights, proprietary transcription models, private APIs, training data, or unlicensed assets.

## Overview

Build an original mobile AI meeting assistant inspired by OtterPilot's public product: a real-time audio transcription tool with speaker diarization, AI-generated meeting summaries with key takeaways and action items, searchable transcript library, highlight and comment support, calendar integration for scheduled meetings, and collaborative sharing. The clone captures in-person and virtual meeting audio, transcribes it live with per-speaker attribution, and produces structured post-meeting artifacts.

The clone must use original branding, UI copy, and licensed speech-to-text providers. Any feature marked as a manual verification blocker must stay behind a feature flag until lawful hands-on evidence confirms exact behavior.

## Goals

- Provide real-time audio transcription with live speaker diarization during meetings.
- Record and store meeting audio with synchronized transcript playback.
- Generate AI meeting summaries with key takeaways, decisions, and action items.
- Support speaker identification, labeling, and voice profile management.
- Detect keywords and topics across transcripts for organization and retrieval.
- Enable a searchable transcript library with full-text and speaker-filtered search.
- Allow highlighting, commenting, and annotating transcript segments.
- Integrate with calendar providers to surface scheduled meetings and auto-start recording.

## Non-Goals

- Do not imply affiliation with Otter.ai, Inc. or any speech-to-text provider.
- Do not copy proprietary transcription models, speaker embeddings, fine-tuning data, or private API schemas.
- Do not replicate exact transcription accuracy benchmarks or internal diarization algorithms without independent verification.
- Do not build virtual meeting platform plugins (Zoom/Teams/Meet bots) in V1; audio capture is microphone-based only.
- Do not process production meeting audio without explicit participant consent and documented retention policies.
- Do not present AI-generated summaries as authoritative meeting minutes without human review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Otter.ai Product | https://otter.ai | Feature set, product descriptions, pricing tiers | Verified 2026-05-11 |
| Otter.ai Blog | https://blog.otter.ai | Product announcements, feature launches, use cases | Verified 2026-05-11 |
| Apple App Store Listing | https://apps.apple.com/app/otter-transcribe-voice-notes/id1276437113 | App description, screenshots, permissions, ratings | Verified 2026-05-11 |
| Google Play Store Listing | https://play.google.com/store/apps/details?id=com.aisense.otter | App description, screenshots, permissions, ratings | Verified 2026-05-11 |
| Otter.ai Help Center | https://help.otter.ai | Feature documentation, workflow guides, FAQ | Verified 2026-05-11 |

## Detailed Design

### Real-Time Audio Transcription

- Microphone audio is captured continuously during an active recording session.
- Audio is streamed to a speech-to-text backend in chunked segments (configurable chunk duration, default 2-5 seconds).
- Transcribed text appears in the live transcription view within seconds of speech, updating in place as the model refines partial results.
- Finalized segments are committed to the transcript with timestamps and speaker labels.
- Background audio recording continues when the app is minimized, with a persistent notification indicating active recording.

### Speaker Diarization

- The transcription pipeline attributes each segment to a detected speaker identity (Speaker 1, Speaker 2, etc.).
- Users can assign real names and profile photos to speaker labels during or after the meeting.
- Voice profiles allow the system to recognize returning speakers across meetings when the user opts in.
- Diarization confidence is not exposed to the user but low-confidence segments are flagged for manual review in the transcript editor.

### AI Meeting Summaries

- After recording ends (or on demand), the backend generates a structured summary from the full transcript.
- Summary sections: overview paragraph, key takeaways (bulleted), decisions made, action items with assignees and due dates (if mentioned).
- Action items are extracted from linguistic patterns (e.g., "I will...", "Can you...", "Let's...") and presented as a checklist.
- Users can edit, add, or remove action items and reassign them to different speakers.
- Summary generation is asynchronous; users receive a push notification when the summary is ready.

### Keyword and Topic Detection

- The backend identifies salient keywords and topics from each transcript using extractive methods.
- Topics are displayed as tags on the meeting card in the library view.
- Keywords power the search index, enabling retrieval by concept rather than exact phrase.
- Users can pin or dismiss auto-detected topics.

### Transcript Collaboration

- Users highlight transcript segments and add threaded comments.
- Highlights are color-coded and visible in a highlights-only view for quick review.
- Comments support @mentions of speakers or collaborators.
- Shared transcripts allow view-only or comment-enabled access via shareable links.

## Core User Journeys

1. **First Launch**: User opens app, sees welcome screen explaining AI meeting transcription, signs up or logs in, grants microphone permission, lands on home screen.
2. **Quick Recording**: User taps record button, speaks in a meeting, sees live transcript updating with speaker labels, stops recording, views final transcript.
3. **Post-Meeting Review**: User opens a completed meeting, reads the AI summary, reviews action items, checks off completed items, edits an action item assignee.
4. **Transcript Search**: User searches library for a keyword, finds matching meetings with highlighted excerpts, taps into a result, jumps to the matching segment.
5. **Speaker Labeling**: User opens a transcript, taps an unidentified speaker label, assigns a name and photo, sees all segments from that speaker update.
6. **Highlight and Comment**: User long-presses a transcript segment, highlights it, adds a comment, shares the annotated transcript with a colleague.
7. **Calendar-Linked Meeting**: User connects their calendar, sees upcoming meetings on the calendar screen, taps a scheduled meeting to pre-create a recording session, starts recording when the meeting begins.
8. **Offline Review**: User opens a previously synced transcript while offline, reads the full transcript and summary, queues a new comment that syncs when connectivity returns.

## Screen Inventory

| Screen | Purpose | Key Elements |
|---|---|---|
| Welcome/Auth | Account entry | Sign in, sign up, OAuth, consent, microphone permission prompt |
| Home/Recent Meetings | Meeting list and quick actions | Recent meetings list, record FAB, search bar, calendar badge |
| Live Transcription | Active recording view | Live transcript feed, speaker labels, elapsed time, pause/stop controls, audio waveform |
| Transcript Detail | Full transcript viewer | Scrollable transcript with timestamps, speaker labels, audio playback scrubber, highlight/comment controls |
| Meeting Summary | AI-generated summary | Overview, key takeaways, decisions, action items checklist, edit controls |
| Search/Library | Transcript search and browse | Full-text search, filters (date, speaker, topic), result excerpts with highlights |
| Calendar | Scheduled meetings | Calendar view (day/week), connected calendar events, pre-created recording sessions |
| Speaker Management | Speaker profiles | Speaker list, name/photo assignment, voice profile opt-in, merge duplicate speakers |
| Share/Export | Transcript sharing and export | Share link generation, permission level (view/comment), export format (TXT/PDF/SRT), email share |
| Settings | Account and preferences | Audio quality, storage management, calendar connection, notification prefs, subscription, data export, delete account |

## Data Model

| Entity | Key Fields |
|---|---|
| User | id, email, auth_provider, display_name, avatar_url, locale, created_at, quota_tier, consent_state, deletion_state |
| DeviceSession | id, user_id, device_fingerprint, platform, push_token, created_at, revoked_at |
| Meeting | id, user_id, title, status (recording/processing/complete/failed), duration_ms, audio_url, calendar_event_id, created_at, deleted_at |
| Transcript | id, meeting_id, language, word_count, finalized_at, updated_at |
| TranscriptSegment | id, transcript_id, speaker_id, start_ms, end_ms, text, confidence, is_finalized, created_at |
| Speaker | id, user_id, label, display_name, avatar_url, voice_profile_enabled, created_at |
| ActionItem | id, meeting_id, text, assignee_speaker_id, due_date, is_completed, source_segment_id, created_at |
| Summary | id, meeting_id, overview, takeaways[], decisions[], status (pending/ready/failed), generated_at |
| Highlight | id, transcript_id, user_id, start_segment_id, end_segment_id, color, created_at |
| Comment | id, highlight_id, user_id, body, parent_comment_id, created_at, updated_at |
| CalendarEvent | id, user_id, provider (google/outlook/apple), external_id, title, start_time, end_time, participants[], synced_at |
| Subscription | id, user_id, tier, status, started_at, expires_at, store_receipt_ref |
| AuditEvent | id, user_id, event_type, metadata, created_at |

## API And Backend Contracts

| Endpoint | Method | Purpose |
|---|---|---|
| /auth/register | POST | Account creation |
| /auth/login | POST | Session creation (email or OAuth) |
| /auth/logout | DELETE | Session revocation |
| /auth/recover | POST | Password/account recovery |
| /meetings | GET | List user meetings with pagination and filters |
| /meetings | POST | Create new meeting (returns meeting_id for audio upload) |
| /meetings/:id | GET | Fetch meeting with transcript and summary |
| /meetings/:id | PATCH | Rename, update status |
| /meetings/:id | DELETE | Soft-delete meeting and associated data |
| /meetings/:id/audio | POST | Upload or stream audio chunks |
| /meetings/:id/transcript/segments | GET | Fetch transcript segments with pagination |
| /meetings/:id/transcript/segments/:sid | PATCH | Edit segment text or speaker assignment |
| /meetings/:id/speakers | GET | List speakers detected in meeting |
| /meetings/:id/speakers/:sid | PATCH | Update speaker name, avatar, merge |
| /meetings/:id/summary | GET | Fetch AI-generated summary |
| /meetings/:id/summary/regenerate | POST | Re-generate summary |
| /meetings/:id/action-items | GET | List action items for meeting |
| /meetings/:id/action-items/:aid | PATCH | Update action item (assignee, completion, text) |
| /meetings/:id/highlights | GET/POST | List or create highlights |
| /meetings/:id/highlights/:hid/comments | GET/POST | List or create comments on a highlight |
| /meetings/:id/share | POST | Generate or update share link with permissions |
| /calendar/connect | POST | Initiate calendar OAuth connection |
| /calendar/events | GET | List upcoming calendar events |
| /search | GET | Full-text search across transcripts with filters |
| /speakers | GET | List all user speaker profiles |
| /speakers/:id | PATCH/DELETE | Update or delete speaker profile |
| /settings | GET/PATCH | Read and update user preferences |
| /account/export | POST | Request data export |
| /account | DELETE | Request account deletion |

Streaming contract: Audio upload streams chunked audio to `/meetings/:id/audio` via chunked transfer encoding. Transcription results return via SSE on `/meetings/:id/transcript/stream` with event types: `transcript_delta`, `speaker_change`, `segment_complete`, `action_item_detected`, `keyword_detected`, `summary_ready`, `error`, `done`.

## Realtime Push And Offline Behavior

- Live transcription uses SSE with automatic reconnection and resume from the last event ID.
- Audio upload uses chunked transfer encoding; chunks are buffered locally if connectivity drops and flushed on reconnect.
- Speaker change events arrive as discrete SSE events, updating the live transcript view in real time.
- Summary generation is asynchronous; a `summary_ready` SSE event or push notification signals completion.
- Offline mode: previously synced transcripts and summaries are readable from local cache; new recordings buffer audio locally and upload when connectivity returns.
- Reconnect reconciliation uses idempotency keys on audio chunks to prevent duplicate transcription.
- Push notifications (opt-in): summary ready, action item reminders, shared transcript activity, calendar meeting starting soon.
- Local audio buffer persistence: recorded audio survives app kill/restart and resumes upload on next launch.
- Transcript cache invalidation: poll on app foreground or respond to push-triggered sync.

## Permissions Privacy And Safety

- Microphone: requested on first recording attempt with clear explanation of usage; required for core functionality.
- Calendar: requested only when user initiates calendar connection; read-only access to event titles, times, and participants.
- Notifications: requested after first completed meeting to enable summary-ready alerts.
- No camera, location, contacts, or Bluetooth access required for V1.
- All meeting audio is encrypted in transit (TLS) and at rest (AES-256 or equivalent).
- Transcripts and summaries are stored server-side with user-scoped access controls.
- Meeting participants must be informed of recording; the app displays a consent reminder before recording starts.
- Audio data retention follows user-configurable policies; users can delete individual meetings or all data.
- Safety filters: transcription does not filter speech content, but AI summaries apply content moderation to avoid amplifying harmful content.
- Data export includes all meetings, transcripts, summaries, action items, speaker profiles, and account data.
- Account deletion purges all user data within documented retention window (legal holds excepted).
- Manual verification required: exact microphone permission prompt timing, background recording behavior across iOS/Android, calendar OAuth scope sets, push payload format.

## Analytics And Monetization

- Events tracked: session_start, recording_started, recording_stopped, transcript_viewed, summary_viewed, action_item_toggled, speaker_labeled, highlight_created, comment_added, search_performed, transcript_shared, calendar_connected, export_requested.
- Event properties: coarse duration bucket, speaker count bucket, segment count bucket, error code, quota tier. Never raw audio, transcript text, or personal content.
- Monetization model: free tier with limited monthly transcription minutes and basic summaries; premium tier for unlimited transcription, advanced summaries, priority processing, speaker voice profiles, and team collaboration features.
- Premium billing via app-store IAP and web checkout; handles trial, renewal, cancellation, refund, restore, and cross-platform entitlement sync.
- Paywalls must not gate safety features, data export/delete, account recovery, or access to existing transcripts and summaries.

## Edge Cases

- Background audio recording interrupted by OS (battery optimization, memory pressure): persist buffered audio, resume recording on foreground, indicate gap in transcript.
- Speaker diarization fails (single-speaker detected for multi-person meeting): allow manual speaker splitting in transcript editor.
- Audio quality too low for transcription (noisy environment, distant microphone): display low-confidence warning, preserve audio for manual review, suggest re-recording.
- Very long meetings (3+ hours): handle transcript pagination, chunked summary generation, and progressive audio upload without memory exhaustion.
- Summary generation fails or times out: retry with exponential backoff, surface failure state with manual retry option, preserve transcript independently.
- Calendar sync conflict (event updated or deleted externally): reconcile on next sync, mark orphaned pre-created recordings.
- Concurrent edits to shared transcript (two users commenting simultaneously): last-write-wins for segment edits, append-only for comments with conflict indicator.
- Meeting audio upload interrupted permanently (user deletes app before upload completes): local audio is lost; document this limitation clearly.
- Speaker merge requested after comments reference the old speaker label: update all references, preserve comment integrity.
- Free tier quota exhausted mid-recording: complete current recording but block new recordings with quota reset countdown.

## Test Plan

- Unit tests: audio chunk buffering, SSE event parsing, transcript segment state machine, speaker label assignment, action item extraction patterns, highlight range validation, search query construction.
- Contract tests: all API endpoints with success, validation error, auth error, rate limit, and server error responses.
- Integration tests: full flow from recording start through audio upload, live transcription, summary generation, and action item display; speaker labeling mid-recording; calendar event to pre-created meeting.
- Streaming tests: SSE reconnection, transcript delta ordering, speaker change events, segment finalization, summary-ready notification.
- Offline tests: audio buffer persistence across app kill, transcript cache readability, comment queue sync on reconnect, duplicate chunk prevention.
- Audio tests: various audio quality levels, background noise handling, single vs. multi-speaker diarization, very long recording stability.
- Safety tests: recording consent reminder display, content moderation in summaries, data export completeness, account deletion verification.
- Accessibility tests: live transcript screen-reader announcements, recording controls VoiceOver labels, action item checkbox accessibility, audio playback scrubber.
- Performance tests: live transcript render rate during fast speech, large transcript scroll performance, audio upload throughput, summary generation latency.
- Manual verification tests: microphone permission prompts, background recording on iOS/Android, calendar OAuth flows, push notification delivery, speaker voice profile accuracy.

## Acceptance Criteria

- All research source URLs are exact first-party links verified on the stated date.
- Users can record meeting audio and see live transcription with speaker labels updating in real time.
- Speaker diarization attributes segments to distinct speakers; users can assign names and photos to speaker labels.
- AI summary generates overview, key takeaways, decisions, and extractable action items after recording completes.
- Action items are displayed as a checklist with assignee and completion state.
- Transcript library supports full-text search with speaker and date filters.
- Highlights and comments can be added to transcript segments and are visible in shared views.
- Calendar integration displays upcoming meetings and supports pre-created recording sessions.
- Share/export produces view-only or comment-enabled links and TXT/PDF/SRT export formats.
- Offline mode preserves cached transcripts and buffers audio for upload on reconnect.
- Recording consent reminder is displayed before every recording session.
- Manual verification blockers are documented and feature-flagged.
- At least 13 entities in the data model are specified with key fields.
- At least 10 screens are inventoried with purpose and key elements.

## Open Questions

- What exact speech-to-text latency does OtterPilot achieve for live transcription, and what provider/model powers it?
- How does Otter.ai handle speaker diarization for large groups (10+ speakers) and what is the accuracy threshold?
- What are the exact free-tier transcription minute limits and how are they enforced (hard cutoff vs. degraded quality)?
- How does OtterPilot capture audio from virtual meetings (Zoom/Teams/Meet) on mobile — native plugin, system audio capture, or companion bot?
- What calendar providers are supported beyond Google and Outlook, and what OAuth scopes are required?
- How are voice profiles stored and matched — on-device, server-side, or hybrid?
- What is the exact summary generation latency for meetings of various lengths?
- Does OtterPilot support real-time collaboration (multiple users viewing the same live transcript simultaneously)?

## Build Plan

- **Phase 1 — App Shell + Auth + Recording + Live Transcription**: Auth flows (email and OAuth), microphone permission, audio recording with chunked upload, basic real-time transcription via SSE with speaker labels. Target: functional recording and live transcript with one speaker.
- **Phase 2 — Speaker Diarization + Transcript Detail**: Multi-speaker diarization in transcription pipeline, speaker labeling UI, transcript detail view with timestamps and audio playback scrubber, segment editing. Target: multi-speaker transcripts with synchronized audio playback.
- **Phase 3 — AI Summaries + Action Items**: Post-meeting summary generation, structured summary display (overview, takeaways, decisions), action item extraction and checklist, action item editing and assignment. Target: complete post-meeting artifact generation.
- **Phase 4 — Search + Library + Keywords**: Full-text transcript search with filters, keyword and topic extraction, meeting library with topic tags, search result highlighting and navigation. Target: searchable meeting knowledge base.
- **Phase 5 — Collaboration + Sharing + Calendar**: Highlight and comment system, share link generation with permission levels, export (TXT/PDF/SRT), calendar OAuth integration, upcoming meeting display, pre-created recording sessions. Target: collaborative meeting workflow.
- **Phase 6 — Offline + Polish + Safety**: Offline transcript cache, audio buffer persistence, background recording stability, recording consent flow, accessibility audit, push notifications, performance optimization, manual native verification. Target: app-store-ready quality.

## Next Steps

- Conduct lawful hands-on verification session with an Otter.ai account to capture exact transcription latency, speaker diarization behavior, summary structure, and quota enforcement.
- Select original speech-to-text provider (Whisper, Deepgram, AssemblyAI, or equivalent) with appropriate licensing for real-time streaming transcription.
- Evaluate on-device vs. server-side speaker diarization tradeoffs for latency and privacy.
- Design original branding, UI copy, and onboarding content distinct from Otter.ai's copyrighted materials.
- Scaffold downstream implementation repo with Phase 1 structure and feature flags for all manual verification blockers.
