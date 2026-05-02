# Otter.ai-Style Clone Spec

> Metadata
> - Inspiration app: Otter.ai
> - Category: Transcription
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact official help center, pricing, privacy policy, terms, and public app listing pages.
> - Manual verification blockers: native live recording performance, meeting integration OAuth flows, speaker diarization quality on device audio, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, original branding, original ASR/diarization provider, and lawful meeting integrations.

## Overview

Build an original mobile transcription app inspired by live meeting transcription with speaker labels, automatic summaries, importable audio files, and calendar-based meeting sync.

The clone must not copy Otter.ai branding, summaries of proprietary meetings, private APIs, named features, or marketing copy.

## Goals

- Live recording with near-real-time transcription and speaker diarization.
- Import audio/video files for async transcription.
- Calendar integration to auto-join or auto-record meetings (user-controlled).
- Summaries, action items, highlights, and shareable snippets.
- Consent-first UX with clear "all participants consent" disclosures.

## Non-Goals

- Do not imply Otter affiliation.
- Do not record meetings without clear user-issued consent notice.
- Do not use user audio for model training without explicit opt-in.
- Do not operate as a stealth bot without platform permission.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Otter feature overview | https://help.otter.ai/hc/en-us/articles/360047872833-Otter-ai-features | Notetaker, real-time transcription, automated live summary, meeting summary, slides/screen-share capture, AI Chat, and plan comparison orientation | Verified 2026-05-02 |
| What is Otter | https://help.otter.ai/hc/en-us/articles/360035266494-What-is-Otter | Mobile/web recording, searchable/shareable smart notes, import transcription, photo capture during recording, and collaboration framing | Verified 2026-05-02 |
| Otter pricing | https://otter.ai/pricing | Plan gates for free/paid tiers, transcription/import limits, meeting features, and team/enterprise packaging | Verified 2026-05-02 |
| Otter Privacy Policy | https://otter.ai/privacy-policy | Audio, transcript, meeting, account, AI, retention, sharing, and privacy-rights posture | Verified 2026-05-02 |
| Otter Terms | https://otter.ai/terms-of-service | Account, acceptable use, meeting recording responsibility, paid services, user content, and service boundaries | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- App must support live mic recording and file import.
- Speaker labels must be user-editable per conversation.
- Summaries must be marked AI-generated and editable.
- Calendar integration (Google/Microsoft) must be opt-in with revocable scopes.
- Subscription states: free minutes, paid plans, trials, restored.
- Notetaker must separately model automatic meeting join for Zoom, Google Meet, and Microsoft Teams, real-time transcript, automated live summary, post-meeting summary, and captured slides/screen shares.
- Mobile capture must support live recording, pause/resume, photos during a recording, searchable notes, transcript playback alignment, speaker labels, and share/export.
- Meeting import/calendar integrations must require explicit OAuth scopes, per-meeting join controls, participant-visible bot identity, consent reminders, and admin policy gates.
- AI Chat must be scoped to accessible conversations and must distinguish single-meeting questions from cross-meeting search; generated answers need citations back to transcript spans.
- Plan limits must include monthly transcription minutes, import quotas, storage/export, team sharing, admin controls, and over-limit behavior as configurable rows.
- Recording consent is a first-class safety requirement: the clone must remind users that local law and participant consent apply, provide visible recording indicators, and allow participant/requested deletion workflows.
- Raw audio, transcripts, summaries, action items, screenshots/slides, and chat prompts must have independent retention, sharing, redaction, export, and deletion controls.

## Core User Journeys

- User taps Record, sees a consent banner, and captures live transcription with speaker labels.
- User imports an audio file, waits for transcription, and reviews output.
- User connects calendar, enables auto-record for specific meetings, and joins as bot.
- User edits speaker names in a completed transcript.
- User views summary/action items, edits them, and shares via link or export.
- User searches across all transcripts.
- User upgrades tier to increase monthly minutes.
- User deletes transcript and account data export.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home | Recent conversations | list, search, new | empty, loaded | offline |
| Recorder | Live capture | mic, pause, stop | ready, recording, paused, complete | mic denied, storage low |
| Transcript Viewer | View/edit transcript | play, edit, label | loaded, editing | asset missing |
| Summary | View AI summary and actions | edit, copy, share | generated, edited | generation failed |
| Import | Upload audio/video | pick, monitor | uploading, processing, done | format unsupported |
| Calendar Integration | Manage meeting sync | connect, select events | connected, disconnected | scope revoked |
| Meeting Bot Control | Auto-join toggles | per-meeting controls | enabled, disabled | bot join failed |
| Search | Find across transcripts | query, filter | results, empty | index stale |
| Settings | Privacy, account, consent | toggles | loaded | enterprise-managed |
| Subscription | Plan, minutes, restore | plan, restore | free, paid | webhook delay |
| Support | Help and feedback | form | submitted | unavailable |

## Data Model

- `User`, `Conversation` (source: live/import/meeting), `AudioAsset` (uri, duration, format, retention), `TranscriptSegment` (start, end, text, speaker id, confidence), `Speaker` (label, voiceprint id optional), `Summary`, `ActionItem`, `CalendarConnection`, `MeetingBotJob`, `UsageLimit` (monthly minutes), `Entitlement`, `SafetyReport`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`, `POST /data-export`.
- `POST /conversations` (live/import), `GET /conversations`, `GET /conversations/:id`, `DELETE /conversations/:id`.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`.
- `POST /live-sessions`, `POST /live-sessions/:id/end`, `GET /live-sessions/:id/stream` (SSE/WebSocket).
- `POST /conversations/:id/summarize`, `PATCH /conversations/:id/segments/:segId`.
- `POST /speakers`, `PATCH /speakers/:id`, `DELETE /speakers/:id`.
- `POST /calendar/connect`, `DELETE /calendar/connect`, `GET /meetings`, `POST /meetings/:id/autojoin`.
- `GET /search?q=`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /safety/reports`.

## Realtime, Push, And Offline Behavior

- Live transcription must stream partial segments with stable IDs; finalize on commit.
- Recordings must persist locally if upload fails; resume upload on reconnect.
- Push notifications: transcript ready, meeting joined, monthly limit reached — never include transcript content by default.
- Background recording must handle interruptions (calls, route changes) without losing audio.

## Permissions, Privacy, And Safety

- Mic requested at record start; audio route permission for meeting capture.
- Calendar scopes minimized; meeting subject redaction in analytics.
- Consent banner on every new recording; meeting bot must announce itself when joining.
- Default data retention configurable; user can delete any conversation.
- Analytics exclude raw audio, transcript, speaker names.
- PII scrubbing for shared links; link expiry and access controls.
- Organization/enterprise mode: SSO/SCIM, audit logs, secrets redaction.

## Analytics And Monetization

- Events: recording started/ended, import completed, transcript ready, summary generated, meeting joined, share created, minutes-limit reached, entitlement changed.
- Free monthly minutes tier with paid expansion; original plan names.
- Paywall identifies blocked feature (minutes, meetings, summaries).

## Edge Cases

- Mic denied mid-recording.
- Meeting bot blocked by host or platform policy.
- Speaker diarization collapses speakers with similar voices.
- Large file upload over cellular; resumable required.
- Calendar scope revoked; auto-join disabled with clear notice.
- Transcript shared link forwarded to unauthorized recipient (requires expiry/auth).
- Account deletion with pending long-running transcription job.

## Test Plan

- Unit tests for segment assembly, speaker edits, monthly-minute tracking.
- Contract tests for live stream, upload, meeting bot APIs.
- Integration tests for record->transcript->summary, import->transcript, calendar connect->auto-join.
- Permission tests for mic/calendar grant/deny/revoke.
- Privacy tests for retention, export/delete, share-link expiry.
- Billing tests for minutes limit, trial/paid/restore.
- Accessibility tests for captions, dynamic type, VoiceOver navigation through transcripts.
- Manual verification: real device recording, meeting bot in live meeting.

## Acceptance Criteria

- Source URLs verified.
- Live and import transcription work with consent banners.
- Calendar integration and meeting bot opt-in work with revocable scopes.
- Entitlements reconcile across platforms.
- Manual blockers feature-flagged.

## Open Questions

- Which ASR + diarization provider backs V1?
- Will meeting bot support Zoom/Meet/Teams in V1, or phased?
- Enterprise SSO/SCIM in V1?
- Voiceprints on-device only, or server-side with opt-in?

## Build Plan

- Phase 1: live record + live transcript + basic viewer.
- Phase 2: import pipeline + async transcription.
- Phase 3: summaries + action items + search.
- Phase 4: calendar integration + meeting bot.
- Phase 5: entitlements + sharing.
- Phase 6: enterprise + accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Select ASR and meeting-bot providers.
- Define consent copy and legal review for recording.
