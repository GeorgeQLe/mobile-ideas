# ChatGPT-Style Clone Spec

> Metadata
> - Inspiration app: ChatGPT
> - Category: AI assistant
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-16.
> - Verification basis: exact public marketplace pages, OpenAI Help Center docs, OpenAI policy docs, and current public release notes.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, subscription purchase/restore, and production push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, policies, prompts, and model/provider integrations.

## Overview

Build an original mobile AI assistant inspired by ChatGPT's mobile workflow: conversational assistant home, multimodal composer, streaming responses, voice conversations, image and file inputs, memory controls, history search, data controls, account/subscription settings, and safety/reporting paths.

The clone must not copy ChatGPT branding, screenshots, marketing copy, protected UI artwork, model names, plan names, ranking systems, private APIs, or proprietary moderation logic. The implementation can reproduce comparable user jobs and interaction patterns using original product language and licensed or first-party AI providers.

This spec is implementation-ready for a V1 that targets the documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a mobile-first assistant with text chat, streaming responses, image/file upload, voice input/output, saved history, temporary chat, and data controls.
- Support account and subscription state without copying OpenAI plan names, pricing, offers, or checkout copy.
- Keep privacy controls visible: model-improvement opt-out, data export, account deletion, memory controls, temporary chat, and conversation deletion.
- Preserve safety expectations for generated text, uploaded content, voice conversations, minors, self-harm, medical/legal/financial advice, harassment, and abusive automation.
- Produce concrete routes, entities, API contracts, offline rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build an OpenAI-branded app or imply affiliation with OpenAI.
- Do not scrape ChatGPT, reuse private ChatGPT APIs, replay ChatGPT network traffic, or copy proprietary prompts/model behavior.
- Do not use user content, uploaded files, audio, location, or generated outputs for model training without explicit account-level consent.
- Do not ship medical, legal, financial, mental-health, political, or high-stakes decision advice as authoritative output.
- Do not claim exact App Store, Play Store, or native-device parity until the manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/chatgpt/id6448311069 | Official iOS listing, app category, age rating, privacy labels, version, screenshots, features, support/policy links | Verified 2026-04-16 |
| Google Play | https://play.google.com/store/apps/details?id=com.openai.chatgpt | Official Android listing, rating/downloads, content rating, image/voice/photo features, support email, data safety | Verified 2026-04-16 |
| ChatGPT iOS App FAQ | https://help.openai.com/en/articles/7885016-chatgpt-ios-app-faq | History access, chat deletion, data export, restore purchases, long-press actions, data controls, audio handling | Verified 2026-04-16 |
| ChatGPT Release Notes | https://help.openai.com/en/articles/6825453-chatgpt-release-notes | Current model picker, mobile sidebar, location sharing, files, image, apps, and subscription changes | Verified 2026-04-16 |
| Data Controls FAQ | https://help.openai.com/en/articles/7730893-temporary-chat | Training opt-out, export/delete account paths, signed-in/signed-out controls, temporary-chat retention | Verified 2026-04-16 |
| Temporary Chat FAQ | https://help.openai.com/en/articles/8914046-temporary-chat-faq | Temporary-chat no-history/no-memory behavior and retention caveats | Verified 2026-04-16 |
| Memory FAQ | https://help.openai.com/en/articles/8590148-memory-in-chatgpt-faq | Saved memories, reference chat history, manage/delete memory, memory-search interaction | Verified 2026-04-16 |
| Voice Mode FAQ | https://help.openai.com/en/articles/8400625-voice-mode-faq | Mobile voice entry, microphone permission, mute/end controls, voice selection, captions, transcripts, limits | Verified 2026-04-16 |
| OpenAI Terms of Use | https://openai.com/policies/terms-of-use/ | Age/access requirements, account rules, paid account handling, output accuracy, prohibited uses | Verified 2026-04-16 |
| OpenAI Privacy Policy | https://openai.com/policies/privacy-policy/ | Personal data handling reference and account privacy obligations | Verified 2026-04-16 |
| OpenAI Usage Policies | https://openai.com/policies/usage-policies/ | Safety policy categories for people, privacy, minors, deception, and high-stakes use | Verified 2026-04-16 |

## Detailed Design

### Source-Backed Product Requirements

- The public mobile listings describe an official free app with in-app purchases, synchronized history, image generation, Advanced Voice, photo upload, creative/professional/learning use cases, and instant answers.
- iOS must support iPhone and iPad layouts; the public iOS listing currently requires iOS/iPadOS 17 or later.
- Android must support phone, Chromebook, and tablet surfaces where the Play listing exposes compatibility.
- History must be accessible from the primary navigation and searchable by conversation text.
- Conversations must support delete, rename/archive-equivalent state, copy, select text, regenerate, and response feedback actions.
- Data export must be accessible from settings/data controls and return a downloadable archive through account email or equivalent secure delivery.
- Account deletion and data export must be exposed from settings and support flows, not buried behind support-only handling.
- Temporary chat must avoid history persistence, avoid creating memories, and be retained only for safety/abuse review within the documented retention window.
- Saved memory and chat-history reference must be separate account-level controls with manage/delete affordances.
- Voice conversations must request microphone permission at point of use, include mute/end controls, persist a transcript to chat history when not temporary, and support captions for model speech on mobile.
- Uploaded photos/files must be validated, scanned, attached to the conversation, and governed by retention/training controls.
- Location sharing must be opt-in, adjustable in data controls, and separated between approximate and precise location if the V1 includes local-answer features.
- Subscription state must include free, trial/promo, paid, expired, canceled, restored purchase, web-managed subscription, app-store-managed subscription, and unavailable states.

## Core User Journeys

- New user installs the app, sees original onboarding copy, signs in or starts a permitted signed-out flow, reviews data/permission education, and lands on the assistant home.
- Returning user opens the app, resumes recent conversations, starts a new chat, attaches a photo/file, receives a streaming answer, and can retry, copy, share, or rate the answer.
- User enters voice mode, grants microphone permission, selects or confirms a voice, mutes/unmutes, exits, and sees the transcript attached to the conversation.
- User starts a temporary chat, confirms it is isolated from history and memory, sends text or voice input, exits, and cannot find the chat in history.
- User opens settings, disables model improvement, exports data, deletes a conversation, manages memories, and requests account deletion.
- User reaches a limit or paid feature, sees an original entitlement/paywall state, upgrades or dismisses, and sees feature access update after webhook confirmation.
- User is offline or loses connectivity mid-response, sees local draft preservation, can cancel/retry, and reconciles the conversation after reconnect.
- User receives unsafe, inaccurate, or sensitive output, reports it, receives a support/safety acknowledgement, and policy state is recorded for review.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account creation, legal consent | email/social auth, continue as guest when allowed | new, returning, signed-out, auth-error | underage, blocked region, network failure |
| Assistant Home | Default surface for new and recent chats | new chat, history, model/capability selector, composer | empty, recent chats, loading, offline | expired session, rate limit, degraded model |
| Chat Thread | Streaming multimodal conversation | text, image/file, voice transcript, actions | streaming, complete, regenerating, stopped | unsafe request, provider error, partial stream |
| Composer Attachment Sheet | Add photos/files and large pasted content | camera, photo library, files, paste | selected, uploading, attached, removable | unsupported type, too large, scan failed |
| Voice Session | Spoken conversation | mic, voice selection, mute, end, captions | permission prompt, active, muted, transcript | mic denied, audio interruption, limit reached |
| History Search | Find past chats | query, filters, conversation selection | empty, results, no-results | history disabled, temporary chat excluded |
| Memory And Personalization | Saved memory and chat-history reference controls | toggles, manage/delete memory | on, off, partially available | plan-gated, delete failed, sync delay |
| Data Controls | Training opt-out, export, delete, temporary chat education | toggles, export, deletion request | signed-in, signed-out, pending export | email delivery failure, retention notice |
| Subscription | Plans, entitlements, restore purchase | plan selection, checkout, restore | free, paid, expired, canceled, restored | platform mismatch, webhook delay, refund |
| Support And Safety | Report output, contact support, view policies | report reason, support message | submitted, in review, resolved | abusive report, unavailable support |
| Settings | Account, privacy, notifications, haptics, version | navigation, toggles | loaded, signed-out, account-managed | enterprise/admin restriction |

## Data Model

- `User`: account identity, age gate, locale, region, auth providers, consent state, deletion/export state.
- `DeviceSession`: device id, platform, app version, notification token, session expiry, last active timestamp.
- `Conversation`: title, owner, mode (`standard` or `temporary`), model/capability selection, archive/delete state, retention policy, created/updated timestamps.
- `Message`: role, content parts, stream status, parent/retry relationship, safety classification, feedback state, token/cost metadata.
- `ContentPart`: text, image, file, audio transcript, generated media, provider reference, MIME type, scan state, retention state.
- `Attachment`: upload session, file metadata, checksum, storage key, scan result, processing status, deletion lifecycle.
- `VoiceSession`: conversation id, voice id, caption preference, mic permission state, transcript attachment, duration, interruption state.
- `MemoryRecord`: saved memory text/metadata, source conversation, user-managed state, deleted-at timestamp.
- `PersonalizationSettings`: saved-memory enabled, chat-history reference enabled, model-improvement enabled, temporary-chat defaults.
- `Entitlement`: plan key, platform, purchase id, trial/renewal/expiration/refund state, feature limits.
- `SafetyReport`: message id, reason, reporter, policy category, moderation decision, support escalation state.
- `UsageLimit`: user, feature, window, consumed amount, reset time, hard/soft limit state.
- `AuditEvent`: append-only account, privacy, billing, deletion, memory, safety, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions`: device-scoped auth with revocation.
- `GET /conversations?cursor=&query=&mode=`: returns authorized history, excludes temporary chats after exit, supports server-side search.
- `POST /conversations`: creates standard or temporary chat with retention policy and selected capability profile.
- `GET /conversations/:id/messages`: paginated message tree with stream state and attachment metadata.
- `POST /conversations/:id/messages`: idempotent message send with content parts, selected capability profile, safety precheck, and stream token.
- `GET /streams/:streamId`: SSE or websocket stream for token/media/status events with resume cursor.
- `POST /messages/:id/regenerate`, `POST /messages/:id/feedback`, `DELETE /conversations/:id`: message actions and conversation deletion.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed upload flow with size/type validation and scanning.
- `POST /voice/sessions`, `PATCH /voice/sessions/:id`, `POST /voice/sessions/:id/end`: voice lifecycle, captions, mute state, transcript finalization.
- `GET /settings/personalization`, `PATCH /settings/personalization`: memory, chat-history reference, model-improvement, and location-sharing settings.
- `GET /memories`, `DELETE /memories/:id`, `DELETE /memories`: memory management.
- `POST /data-export`, `DELETE /account`: privacy workflows with audit events and asynchronous status.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: entitlement lifecycle; never trust client-only paid state.
- `POST /safety/reports`, `GET /support/cases/:id`: report and support lifecycle.

## Realtime, Push, And Offline Behavior

- Message streaming must tolerate app backgrounding, network changes, duplicate event delivery, and reconnect with cursor-based reconciliation.
- Local drafts, selected attachments, and unsent messages may be stored on device; generated answers must reconcile with canonical server state after reconnect.
- Standard chat history, settings, entitlement summary, and recent conversations can be cached for offline reads.
- Temporary chat content must not be retained in normal local history after exit; any local temporary state must follow the same retention policy as server state.
- Uploads must resume or fail with a visible recovery action; partial or unscanned attachments cannot be sent to the model provider.
- Voice sessions must handle microphone revocation, phone calls, Bluetooth route changes, app backgrounding, and transcript finalization failure.
- Push notifications are optional for reminders, support updates, export-ready emails, and security events; generated message content must not be included in push payloads by default.

## Permissions, Privacy, And Safety

- Camera, microphone, photo library, files, notifications, and location permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw prompts, outputs, uploaded content, precise location, audio, memories, and private account identifiers.
- Model-improvement consent must be account-level, reversible, and logged in `AuditEvent`.
- Memory controls must allow view, delete individual memory, clear all memories, disable saved memory, and disable chat-history reference where available.
- Temporary chat must have visible UI treatment and retention copy before the user relies on it for privacy.
- AI outputs must include accuracy warnings in onboarding, sensitive topics, and any flow that could be mistaken for professional advice.
- Safety policy must block or transform requests involving self-harm facilitation, harassment, sexual exploitation, minors, weapons, privacy invasion, fraud, malware, and high-stakes decisions.
- Voice and image features require consent-aware handling for likeness, biometrics-adjacent content, private places, minors, and non-consensual imagery.
- Support tooling must redact or minimize user content and require elevated access for raw message inspection.
- Launch owner: product/security lead for safety policy, privacy owner for data controls, billing owner for entitlements, accessibility owner for dynamic type/screen reader coverage.

## Analytics And Monetization

- Track only privacy-safe events: onboarding started/completed, chat created, stream started/completed/failed, upload started/completed/failed, voice started/ended, temporary chat started, memory setting changed, export requested, delete requested, entitlement state changed.
- Every analytics event must use stable object types and failure codes rather than raw content or user-visible text.
- Monetization can include original free and paid tiers, but plan names, pricing, trial offers, limits, and promotional copy must be original.
- Paywall states must identify the blocked feature, current entitlement, restore-purchase path, platform ownership, and support path.
- Usage-limit states must be testable independently from payment state.
- App-store and web subscriptions must reconcile through server-side webhooks with delayed, duplicate, refund, restore, and cancellation cases.

## Edge Cases

- First launch offline, expired auth token, unsupported OS, underage user, blocked region, enterprise-managed account.
- Message stream stops after partial answer, user taps stop/regenerate repeatedly, provider sends duplicate events, or safety policy blocks mid-flow.
- Upload too large, unsupported MIME type, malware scan fails, OCR/transcription fails, or upload completes after conversation deletion.
- Voice permission denied, microphone revoked during session, captions disabled, transcript mismatch, or usage limit reached.
- Memory disabled after a memory was already saved, memory deletion while chat remains, chat deletion while memory remains, and temporary chat with GPT/action-equivalent tools.
- Subscription purchased on web but opened on iOS, app-store restore purchase fails, webhook delayed, refunded entitlement remains cached.
- Data export email bounce, account deletion requested with active subscription, or support case opened after account deletion request.

## Test Plan

- Unit tests for conversation/message state machines, temporary-chat retention, memory settings, entitlement checks, idempotency keys, and privacy-safe analytics.
- Contract tests for every documented API route, including pagination, error codes, stream resume cursors, upload states, and webhook idempotency.
- Integration tests for auth, create chat, send message, stream answer, stop, regenerate, delete, search history, and data export request.
- Upload tests for image/file validation, scan failure, partial upload, deleted attachment, and unsupported type.
- Voice tests for permission denied/granted/revoked, mute/end, caption setting, transcript persistence, and limit reached.
- Privacy tests for model-improvement opt-out, temporary chat exclusion, memory delete/clear, account deletion, and analytics redaction.
- Billing tests for free, paid, expired, canceled, refunded, restored, web-owned, and app-store-owned subscriptions.
- Offline tests for draft preservation, failed stream reconnect, cached history/settings, corrupt cache, and temporary-chat local cleanup.
- Safety tests for each launch-blocking policy class plus report submission and support escalation.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, captions, color contrast, and keyboard/external input on tablets.
- Manual verification tests: native iOS screenshots, native Android screenshots, subscription purchase/restore, push notification payloads, voice/caption behavior on real devices.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing proprietary ChatGPT assets, network traffic, private APIs, or brand copy.
- New and returning users can create, resume, search, delete, and export conversations.
- Text, image/file, and voice inputs share one conversation model with testable retention and safety behavior.
- Temporary chat, memory, model-improvement opt-out, data export, and account deletion are accessible from settings and covered by tests.
- Message streaming, upload, voice, entitlement, and privacy workflows have deterministic API contracts and failure codes.
- High-risk safety categories are blocked or transformed before provider invocation and reportable after output.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which AI provider and model families will back text, image understanding, image generation, audio transcription, and voice output?
- Will V1 allow signed-out chats, and if yes, what retention and training controls apply?
- Which paid features are in V1 versus later: image generation, higher limits, voice limits, file analysis, memory, or custom assistants?
- Is precise/approximate location sharing in V1, or deferred until the product has a local-answer use case?
- Will the implementation support enterprise/admin-managed accounts, or explicitly defer them?

## Build Plan

- Phase 1: scaffold app shell, auth, assistant home, chat thread, message composer, streaming text backend, and privacy-safe analytics.
- Phase 2: add history search, conversation actions, temporary chat, data controls, export/delete account jobs, and memory controls.
- Phase 3: add image/file uploads with validation/scanning, attachment lifecycle, and multimodal provider integration.
- Phase 4: add voice session lifecycle, captions/transcripts, permission handling, and device interruption recovery.
- Phase 5: add entitlements, paywall states, checkout/restore/webhooks, usage limits, and billing regression tests.
- Phase 6: complete safety reporting, moderation policy coverage, accessibility pass, offline/reconnect pass, and manual native verification.

## Next Steps

- Use this spec as the template for upgrading `002-claude.md` through `100-ring.md` from Draft 1 scaffolds to implementation-ready specs.
- Resolve the manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
