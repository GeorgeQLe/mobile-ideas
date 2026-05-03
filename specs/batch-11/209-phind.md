# Phind-Style Clone Spec

> Metadata
> - Inspiration app: Phind
> - Category: AI assistant
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public first-party product, help, privacy, and terms pages listed below.
> - Manual verification blockers: native iOS/Android screen capture, app-store privacy labels and release notes, account lifecycle walkthrough, paid subscription or quota state, push notification prompts, file/audio/photo permission prompts, model/provider routing behavior, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, screenshots, model weights, proprietary prompts, private APIs, customer content, marketplace assets, and unlicensed training or evaluation datasets.

## Overview

Build an original mobile AI assistant inspired by Phind's public product and policy materials. V1 focuses on developer-oriented AI search, source-grounded coding answers, code context, follow-up chat, history, and plan limits. The clone must use original branding, original UI copy, original sample prompts, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked `Manual verification required` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide account onboarding, consent, and recovery flows for a mobile AI assistant.
- Support prompt composition, response streaming, conversation history, model/tool selection where applicable, and safe retry/recovery.
- Support attachments, voice, keyboard, meeting, writing, or workspace-context features only where they match the app's public product category.
- Preserve a clear boundary between user content, generated output, provider telemetry, analytics, support logs, and billing records.
- Implement subscription, quota, or workspace entitlement states without copying exact pricing, plan names, promotional copy, or proprietary quota math.
- Include export, delete, report, safety, accessibility, and manual-verification paths before downstream implementation.

## Non-Goals

- Do not imply affiliation with Phind or its publisher.
- Do not copy proprietary models, prompts, rankings, datasets, templates, screenshots, icons, brand names, or private API shapes.
- Do not send production user prompts, files, audio, keyboard input, meeting transcripts, or workspace content to any third-party provider without explicit consent and a documented data-processing path.
- Do not present generated answers as professional, medical, legal, financial, therapeutic, educational, or safety-critical advice.
- Do not enable autonomous external actions, purchases, account changes, or regulated workflows without a separate confirmation and risk review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | https://www.phind.com/ | AI search and developer assistant surface, chat/search modes, and plan positioning | Verified 2026-05-03 |
| Privacy policy | https://www.phind.com/privacy | Prompt, account, search, device, and usage data handling | Verified 2026-05-03 |
| Terms of service | https://www.phind.com/terms | Acceptable use, generated code/output, subscriptions, and service boundaries | Verified 2026-05-03 |
| Documentation | https://www.phind.com/about | Public product and company orientation where available | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support signed-out preview, account creation, login, password/session recovery, blocked-region state, blocked-account state, and entitlement-unavailable state.
- The home surface must expose recent conversations or recent work, an empty state, a model/tool selector where applicable, and a primary composer within one tap.
- The composer must support text input, prompt templates or suggestions, safe submit, cancel, retry, regenerate, copy, share, and delete controls.
- Response rendering must support streaming, partial failure, citations/source links where surfaced, generated-media placeholders, markdown/code formatting, and accessibility-friendly reading order.
- Conversation history must support search, rename, pin/save, delete, export eligibility, and per-thread retention indicators.
- Attachments must use explicit file/photo/microphone/calendar/keyboard/workspace permission prompts and must show upload, scan, processing, failure, and deletion states.
- Model/provider routing must expose user-visible labels or capability descriptions without leaking provider secrets, private system prompts, or proprietary ranking logic.
- Safety controls must include report output, rate abusive prompts, block unsafe media generation, show hallucination disclaimers, and provide crisis escalation where wellbeing content is plausible.
- Entitlements must handle free, trial, paid, expired, canceled, refunded, restored, quota-exhausted, provider-unavailable, app-store-owned, and web-owned states.
- Account settings must include privacy policy, terms, notification preferences, data export, delete account, support, subscription restore, and AI data-use controls where supported.
- Analytics must avoid raw prompts, generated answers, files, audio, keyboard text, transcripts, workspace page content, exact contacts, payment credentials, and child data.
- source citation quality, generated-code license ambiguity, repository/secret redaction, search-index freshness, and paid quota transparency.

## Core User Journeys

- New user opens the app, reviews consent and data-use notices, signs in or continues with the allowed preview path, and reaches the assistant home screen.
- Returning user resumes recent conversations, starts a new prompt, receives a streaming answer, and can retry, copy, share, or delete the result.
- User chooses a model/tool/template, sees capability and quota differences, and gets a clear error if the provider or entitlement is unavailable.
- User attaches a file, image, audio clip, meeting, keyboard text, or workspace page only after the relevant permission prompt and sees processing status.
- User asks for source-backed output and can inspect citations, source freshness, or unsupported-claim disclaimers before acting on the answer.
- User hits quota, subscription expiry, regional lockout, or provider outage and sees a recoverable locked/degraded state.
- User reports unsafe, incorrect, infringing, private, or abusive generated content and receives a durable report state.
- User requests export/delete and can remove conversations, attachments, audio, and account data according to the documented privacy path.
- User loses connectivity during a prompt and can preserve the draft, cancel the request, or reconcile duplicated responses after reconnect.
- Manual verification required: paid purchase/restore, native push prompts, background audio/meeting capture, keyboard full-access behavior, and platform privacy labels.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome / Auth | Account entry and consent | sign in, sign up, SSO, continue | signed-out, loading, authenticated | blocked region, blocked account, offline |
| Assistant Home | Recent work and primary entry | new chat, resume, search | empty, personalized, loading | stale cache, entitlement unavailable |
| Composer | Prompt and attachment creation | text, voice, files, model/tool | idle, drafting, uploading, submitted | invalid file, permission denied, quota exhausted |
| Streaming Response | Generated answer display | stop, retry, regenerate, copy | streaming, complete, partial | provider timeout, unsafe output, citation unavailable |
| Conversation Detail | Thread management | rename, pin, delete, export | loaded, archived, deleted | retention hold, sync conflict |
| Model / Tool Picker | Capability routing | model, tool, mode | available, selected | provider down, plan locked, region locked |
| Attachments | File/media context manager | add, preview, remove | scanning, ready, failed | malware flag, unsupported type, oversized file |
| Voice / Audio | Speech input or meeting flow | record, stop, transcript | listening, transcribing, summarized | mic denied, consent missing, diarization error |
| Templates / Prompts | Reusable starter flows | browse, select, save | categorized, searched | unsafe template, expired promotion |
| Subscription / Quota | Plans and usage state | upgrade, restore, manage | free, trial, paid | refund, expired, store mismatch |
| Safety / Reports | Abuse and correctness feedback | report, reason, block | submitted, reviewed | duplicate report, emergency escalation |
| Settings / Privacy | Account and data controls | toggles, export, delete | loaded, pending request | delete blocked by billing/support hold |
| Notifications | Push and in-app notices | opt in, category toggles | enabled, denied, quiet hours | token expired, deep link stale |
| Support | Help and case tracking | search, contact, case | open, pending, resolved | attachment redacted, SLA unavailable |

## Data Model

- `User`: identity, locale, age/region gates, auth providers, consent state, deletion/export state, and support flags.
- `AccountSession`: device id, platform, token state, last active time, revocation reason, and suspicious-login markers.
- `Conversation`: owner, title, mode, model/tool selection, retention policy, pinned/archive/deleted state, and export eligibility.
- `Message`: role, content reference, status, token/usage metadata, safety labels, citation refs, attachment refs, and deletion state.
- `GenerationJob`: provider route, request id, streaming state, retry count, timeout, error class, quota impact, and audit refs.
- `ModelCapability`: provider alias, context limits, modalities, tool permissions, safety category, availability, and entitlement requirement.
- `Attachment`: file/media/audio/workspace source, MIME type, scan state, extraction state, retention, redaction, and delete token.
- `VoiceSession`: microphone consent, transcript refs, audio retention, language, diarization state, and recording-consent evidence where relevant.
- `PromptTemplate`: category, prompt body reference, safety review state, locale, owner, and entitlement requirement.
- `Citation`: source URL, title, retrieval time, confidence, snippet reference, and freshness/blocked state.
- `Entitlement`: plan class, trial, renewal, cancellation, refund, quota counters, store owner, and feature gates.
- `SafetyReport`: target message/thread, reason, severity, submitted evidence, moderation state, reviewer notes, and appeal state.
- `NotificationPreference`: category, channel, quiet hours, token status, and consent timestamp.
- `AuditEvent`: prompt submit, attachment upload, model switch, export/delete, billing, support, safety, and admin events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /account` for account lifecycle.
- `GET /conversations`, `POST /conversations`, `GET /conversations/:id`, `PATCH /conversations/:id`, and `DELETE /conversations/:id`.
- `POST /conversations/:id/messages`, `GET /messages/:id`, `POST /messages/:id/regenerate`, and `POST /messages/:id/report`.
- `POST /generation-jobs`, `GET /generation-jobs/:id/events`, and `POST /generation-jobs/:id/cancel` for streaming and cancellation.
- `GET /models`, `GET /tools`, and `POST /model-route/preview` for capability and entitlement-aware routing.
- `POST /attachments/uploads`, `PUT /attachments/uploads/:id/content`, `GET /attachments/:id`, and `DELETE /attachments/:id`.
- `POST /voice/sessions`, `PATCH /voice/sessions/:id`, and `POST /voice/sessions/:id/transcribe` where audio or meeting features are in scope.
- `GET /templates`, `POST /templates/:id/use`, and `POST /templates/:id/report`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, and `POST /billing/webhook`.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, and `GET /data-export/:id`.
- `GET /support/articles`, `POST /support/cases`, and `GET /support/cases/:id`.

## Realtime, Push, And Offline Behavior

- Streaming responses use SSE, websocket, or long-poll fallback and must support stop, timeout, retry, and canonical refetch after reconnect.
- Draft prompts, selected model/tool, and attachment metadata can be cached locally; raw attachments and audio require explicit retention rules.
- Offline mode allows reading cached history and editing drafts but blocks new provider calls, irreversible deletes, billing changes, and safety-critical submissions.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether a provider consumed quota for failed or canceled attempts.
- Push notifications are opt-in by category and limited to account/security, completion, reminders, subscription, and support states.
- Background audio, keyboard, meeting, and workspace sync behavior is `Manual verification required` and must stay disabled until platform-specific evidence exists.
- Cached conversations, attachments, transcripts, and generated output purge on logout, account delete, retention expiry, workspace policy change, or admin/legal hold.

## Permissions, Privacy, And Safety

- Request microphone, speech recognition, photo library, camera, files, calendar, contacts, keyboard full access, notifications, or workspace OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and which fallback remains if denied.
- Do not collect raw prompts, answers, audio, transcripts, keyboard text, files, workspace content, or citations in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- AI output must show that generated content can be inaccurate and requires user review before consequential decisions.
- Wellbeing, crisis, medical, legal, financial, employment, education, and child-directed prompts require stricter disclaimers, refusal/escalation paths, and policy tests.
- Media generation or image understanding must block sexual, non-consensual, child, identity-abuse, weapon, extremist, and privacy-invasive requests.
- Keyboard and browser/page-context features must suppress sensitive fields, passwords, payment fields, private keys, and enterprise-managed content.
- Support access to prompts, attachments, audio, transcripts, and account data requires explicit user consent and auditable staff access.
- Export/delete must cover conversations, prompts, attachments, audio, transcripts, templates, reports, support cases, and billing references where legally deletable.

## Analytics And Monetization

- Analytics events: onboarding started/completed, prompt submitted, response completed/failed, model selected, attachment added, citation opened, report submitted, export/delete requested, and paywall viewed.
- Event properties must use coarse counts, file type classes, model capability class, latency buckets, error codes, and entitlement state only.
- Monetization may gate premium models, higher quotas, file/audio features, long context, workspace search, advanced writing tools, meeting summaries, or priority availability.
- Billing must handle app-store, web, workspace, trial, paid, expired, canceled, refunded, restored, family/team, unavailable, and quota-exhausted states.
- Paywalls must not dark-pattern safety, deletion/export, account recovery, or access to already-created user content.

## Edge Cases

- Provider outage after the user submits a prompt but before a response is persisted.
- User cancels a streaming response after quota is consumed.
- Attachment scan fails, extracts partial text, or contains malware/private credentials.
- Model/tool becomes unavailable, renamed, degraded, or region-locked between draft and submit.
- Generated answer includes unsupported factual claims, unsafe advice, or missing citations.
- Conversation is deleted on one device while another device is still streaming.
- Subscription renews, refunds, or expires while a premium generation is in progress.
- Workspace/admin policy disables AI or file access after content has been cached locally.
- Microphone, keyboard full access, calendar, files, or notifications are revoked in OS settings mid-flow.
- User requests export/delete while generation jobs, reports, support cases, or billing disputes remain active.
- Prompt or attachment appears to contain child data, health data, financial data, private keys, or third-party confidential material.
- User attempts to use generated output for a regulated, emergency, legal, medical, financial, academic, or employment decision.

## Test Plan

- Unit tests for message state machines, idempotency keys, entitlement checks, quota counters, provider error mapping, and analytics redaction.
- Unit tests for attachment validation, MIME/size limits, scan states, retention flags, and deletion/export eligibility.
- Contract tests for auth, conversations, messages, generation jobs, model/tool capability, attachments, voice sessions, billing, privacy, support, and reports.
- Integration tests for onboarding -> prompt -> streaming answer -> retry/regenerate -> save/share/delete.
- Integration tests for file/image/audio/workspace context with permission denied, granted, revoked, and oversized/unsupported inputs.
- Offline tests for cached history, draft recovery, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for hallucination disclaimers, crisis prompts, professional-advice prompts, sexual/deepfake media requests, abuse reports, and moderation states.
- Billing tests for trial, purchase, restore, renewal, refund, expiration, region unavailable, quota exhausted, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, sensitive-field suppression, prompt/log scrubbing, export, delete, and retention expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts, keyboard alternatives, and streaming announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, subscription purchase/restore, push notifications, audio/keyboard/background behavior, and region-specific availability.

## Acceptance Criteria

- All source-discovery links are replaced with exact first-party product/help/privacy/terms URLs or an explicit manual blocker.
- A lawful V1 can be built with original branding, UI copy, sample prompts, datasets, providers, and assets.
- Onboarding, assistant home, composer, streaming response, history, model/tool picker, attachments, settings, support, safety report, export/delete, and entitlement screens are specified.
- Prompt, attachment, audio, transcript, workspace, billing, support, analytics, and provider data boundaries are documented and testable.
- Offline draft recovery and reconnect reconciliation are covered without allowing unsafe provider, billing, or irreversible operations while offline.
- Safety tests cover hallucinations, professional-advice disclaimers, wellbeing/crisis escalation where relevant, media abuse, report handling, and generated-content attribution.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions, devices, permissions, marketplace labels, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, attachment failure, quota exhaustion, offline recovery, export/delete, billing restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace listing IDs and app-store privacy labels should be treated as canonical after native verification?
- Which provider(s) will power text, image, audio, speech, search, meeting, keyboard, workspace, and moderation features in the original implementation?
- Which prompts, attachments, audio, transcripts, citations, and generated outputs are retained for product improvement, support, abuse prevention, or legal obligations?
- Which regions, ages, workspaces, schools, or enterprise policies should block or alter feature availability?
- Which generated-content attribution, watermarking, citation, or disclosure rules are required by platform policy or local law?
- Which hands-on flows require paid access, workspace admin access, special hardware, background permissions, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace URLs, source notes, provider choices, legal names, and feature flags for all manual blockers.
- Phase 2: Implement auth, assistant home, composer, streaming response shell, conversation history, settings, and support routes.
- Phase 3: Add model/tool capability routing, attachments, voice or workspace context where in scope, quota states, and provider error handling.
- Phase 4: Add offline draft recovery, reconnect reconciliation, notification preferences, export/delete, report handling, and audit events.
- Phase 5: Add billing/restore, privacy controls, analytics redaction, provider retention controls, accessibility, and safety policy tests.
- Phase 6: Run lawful hands-on native verification and remove or preserve blockers with dated evidence before parity claims.

## Next Steps

- Capture native app-store listing IDs, privacy labels, release notes, and permission prompts during a lawful device verification session.
- Select original providers for model inference, moderation, search, speech, storage, billing, analytics, and notifications.
- Keep provider-specific prompts, safety rules, and generated sample data original to the clone implementation.
- Extend the Phase 5 implementation-plan queue after this spec range is incorporated into the broader readiness pipeline.
