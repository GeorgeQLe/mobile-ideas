# Google Translate-Style Clone Spec

> Metadata
> - Inspiration app: Google Translate
> - Category: Translation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public Google Play listing, official Google Translate help center, and Google privacy/terms pages.
> - Manual verification blockers: native camera OCR performance, offline language pack sizes, conversation-mode latency, and platform translation API permissions still require a test device before one-for-one parity claims.
> - Legal scope: functional parity only; use original UI, original branding, original offline language packs from a licensed provider, and first-party or licensed MT engines.

## Overview

Build an original mobile translation app inspired by Google Translate: text, voice, camera (OCR + overlay), conversation (two-speaker turn-taking), offline language packs, saved phrases, and handwriting input.

The clone must not copy Google Translate branding, iconography, UI copy, private APIs, translation model outputs, or proprietary offline packs. Use a licensed or first-party MT engine and open-source or licensed OCR.

## Goals

- Provide fast text translation with suggestions and alternatives.
- Provide voice (STT -> MT -> TTS) and conversation mode with speaker labels.
- Provide camera translation: live OCR with overlay and snapshot modes.
- Support offline language packs with per-language download/remove.
- Support saved phrases with folders and sync.

## Non-Goals

- Do not imply Google affiliation.
- Do not copy proprietary language packs or brand assets.
- Do not log translated content by default.
- Do not use user inputs for model training without explicit opt-in.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Google Play listing | https://play.google.com/store/apps/details?id=com.google.android.apps.translate | Android listing, language counts, text, Tap to Translate, offline, camera, photo, conversation, handwriting, phrasebook, sync, and transcribe feature framing | Verified 2026-05-02 |
| Google Translate Help | https://support.google.com/translate/answer/2534530?hl=en | Official help topic index for text, other-app translation, images, speech, conversation, documents/websites, handwriting, transcribe, history, and phrasebook | Verified 2026-05-02 |
| Google Translate tips | https://support.google.com/translate/answer/10421057?hl=en | Offline language download, camera translation, conversation, saved phrases, and Tap to Translate usage orientation | Verified 2026-05-02 |
| Google Privacy Policy | https://policies.google.com/privacy | Account, voice/image/service data handling, controls, deletion, and safety posture | Verified 2026-05-02 |
| Google Terms | https://policies.google.com/terms | Service terms, user content, software, and account obligations | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe free app with text, voice, camera, conversation, and offline modes.
- App must support language-pair swap, auto-detect source, alternatives, definitions where available.
- Camera must support live overlay translation and snapshot translation on supported devices.
- Conversation must show both speakers' turns with timestamps and speaker labels.
- Offline packs must be downloadable and removable; size and licensing clearly shown.
- Saved phrases must sync across devices when signed in.
- Google Play currently frames text translation across 108 languages, offline across 59, instant camera across 94, photo translation across 90, conversation across 70, handwriting across 96, phrasebook across all languages, and transcribe across 8; V1 must store these as dated provider-capability rows rather than permanent promises.
- Camera translation must distinguish live viewfinder OCR, imported/taken photo OCR, source auto-detect, target selection, and low-confidence OCR states.
- Conversation mode must support two-speaker language selection, auto-detect when available, mic handoff, translated speech playback, transcript display, and interruption recovery.
- Tap-to-translate must be Android-only until equivalent iOS share-sheet/extension behavior is designed; clipboard access must be explicit and minimal.
- Offline packs must show file size, Wi-Fi preference, update availability, deletion, unsupported feature warnings, and stale model behavior.
- History and phrasebook require account-sync conflict handling, local-only mode, deletion, and privacy controls.
- Disputed, sensitive, gendered, or low-confidence translations must be surfaced as machine translation output with feedback and correction affordances, not authoritative advice.

## Core User Journeys

- User types text, sees translation update live, taps TTS playback, copies output.
- User taps mic, speaks, sees translation and hears TTS playback.
- User opens camera, points at a sign, sees live overlay; can freeze to copy text.
- User starts conversation mode, two speakers alternate, each sees translation in native direction.
- User downloads an offline pack for travel, disables mobile data, translates offline.
- User saves a phrase to a folder, reorders folders, searches saved phrases.
- User switches source auto-detect off to force a specific language.
- User clears history in privacy settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home | Text translate, language selectors | type, paste, mic, camera | idle, translating, error | offline without pack |
| Voice | Single-turn voice translate | mic, playback | ready, listening, complete | mic denied, no speech |
| Camera Live | Live OCR overlay | camera, pause | running, frozen, error | low light, unsupported language |
| Camera Snapshot | Static image OCR | capture, import, crop | captured, translated, saved | OCR failure |
| Conversation | Two-speaker turn-taking | mic, speaker switch | listening A, listening B, paused | cross-talk, mic denied |
| Phrasebook | Saved phrases | add, folder, search | empty, loaded | sync conflict |
| Offline Packs | Manage downloads | download, remove | not-downloaded, downloading, ready | storage low, download failed |
| History | Past translations | view, clear, star | loaded, cleared | corrupt cache |
| Settings | Privacy, account, TTS voice | toggles | loaded, signed-out | region restriction |
| Support | Help and feedback | message | submitted | unavailable |

## Data Model

- `User` (optional), `LanguagePair`, `TranslationRequest` (source, target, input mode, latency), `TranslationResult` (primary, alternatives, confidence), `CameraSession` (frames, detected regions), `ConversationSession` (turns, speaker labels), `OfflinePack` (language, size, version, checksum), `SavedPhrase`, `PhraseFolder`, `HistoryEntry` (optional retention), `Entitlement` (if premium tier exists), `AuditEvent`.

## API And Backend Contracts

- `POST /translate/text` (source?, target, text, mode).
- `POST /translate/speech` (audio asset id, source?, target).
- `POST /translate/ocr` (image asset id, target).
- `POST /translate/ocr/live` (stream of frames; returns per-region translations).
- `POST /conversations`, `POST /conversations/:id/turns`.
- `GET /languages`, `GET /offline-packs`, `POST /offline-packs/:lang/download`, `DELETE /offline-packs/:lang`.
- `GET /phrases`, `POST /phrases`, `DELETE /phrases/:id`, `GET /phrase-folders`, `POST /phrase-folders`.
- `GET /history`, `DELETE /history`.
- `POST /auth/session`, `DELETE /account`, `POST /data-export`.
- `POST /tts` (text, language, voice).

## Realtime, Push, And Offline Behavior

- Conversation and live camera must prioritize low latency; fall back to on-device MT when offline pack present.
- Offline packs must validate checksum before first use.
- Push not central; optional for phrasebook sync status only.
- History and saved phrases cached offline; sync on reconnect.

## Permissions, Privacy, And Safety

- Camera, mic requested at point of use with purpose strings.
- By default, translated content is not logged server-side; opt-in toggle for improvement feedback.
- TTS voice synthesis must respect per-user opt-out of cloud processing.
- Sensitive content: app must not store medical/legal/financial translations beyond session unless user saves them.
- Analytics exclude raw inputs, detected text, and location.
- Data export + account delete available from settings.

## Analytics And Monetization

- Events: translate succeeded/failed, pack downloaded/removed, conversation started/ended, camera session started/ended, phrase saved, history cleared.
- V1 is free; optional future premium tier with original branding.
- No pay-per-translation metering in V1.

## Edge Cases

- Unknown source auto-detect fails on mixed-language text.
- OCR overlay garbled on curved surfaces or low contrast.
- Conversation mode with overlapping speakers.
- Offline pack version mismatch with app upgrade.
- TTS language not available in platform voice catalog.
- Airplane mode with no downloaded pack for target language.
- Clipboard contains sensitive content; app must not auto-send.

## Test Plan

- Unit tests for language-pair state, auto-detect fallback, history retention.
- Contract tests for translate/text/speech/ocr endpoints and idempotency.
- Integration tests for camera live overlay, conversation turn-taking, offline pack lifecycle.
- Permission tests for mic/camera grant/deny/revoke.
- Offline tests for pack checksum, fallback behavior, cache corruption.
- Accessibility tests for dynamic type, VoiceOver, high-contrast overlay, captions for TTS.
- Privacy tests for history retention defaults, export/delete flows.
- Manual verification: on-device OCR quality, mic latency, TTS voice availability.

## Acceptance Criteria

- Source URLs verified.
- Text/voice/camera/conversation modes work with one MT provider.
- Offline packs downloadable and usable.
- Privacy defaults: no server-side logging of content.
- Manual blockers feature-flagged until resolved.

## Open Questions

- Which MT engine backs V1 (licensed cloud vs on-device)?
- Which OCR engine handles live overlay?
- Will handwriting input ship in V1?
- Will there be a premium tier?

## Build Plan

- Phase 1: text translation + language selectors + history.
- Phase 2: voice STT+MT+TTS pipeline.
- Phase 3: camera OCR (snapshot first, then live overlay).
- Phase 4: conversation mode + speaker labeling.
- Phase 5: offline packs + phrasebook sync.
- Phase 6: privacy controls, accessibility, manual verification.

## Next Steps

- Verify source URLs.
- Choose MT, OCR, and TTS providers.
- Define offline pack licensing and distribution.
