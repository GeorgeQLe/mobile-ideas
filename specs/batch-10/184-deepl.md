# DeepL-Style Clone Spec

> Metadata
> - Inspiration app: DeepL
> - Category: Translation
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public App Store listing, official DeepL support articles, privacy policy, and terms.
> - Manual verification blockers: native document translation flow, glossary enforcement on device, subscription purchase/restore, and accessibility passes still require a test device.
> - Legal scope: functional parity only; use original UI, original branding, and a licensed MT engine.

## Overview

Build an original mobile translation app inspired by DeepL's focus on high-quality text and document translation, glossary control, and alternative translations.

The clone must not copy DeepL branding, model outputs, iconography, or glossary data. Use a licensed or first-party MT engine.

## Goals

- Provide high-quality text translation with alternative phrasings and in-place edits.
- Support document translation (PDF, DOCX) with layout preservation where possible.
- Support user glossaries enforced per language pair.
- Offer saved translations and history with privacy-first defaults.
- Provide a tier structure for higher-volume document translation.

## Non-Goals

- Do not imply DeepL affiliation.
- Do not copy glossary data or output samples.
- Do not train on user inputs by default.
- Do not claim one-for-one model quality parity.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/deepl-translate/id1552407475 | iOS listing, 100+ language framing, camera/photo/speech/text/file translation, alternatives, favorites, history, transliteration, glossary, tone, handwriting, DeepL Write, and accessibility labels | Verified 2026-05-02 |
| DeepL Translator help | https://support.deepl.com/hc/en-us/articles/360019924399-About-DeepL-Translator | Supported platforms, text/document/glossary/image/formality/dictionary/clarify/alternatives, API and integration surface | Verified 2026-05-02 |
| DeepL mobile file translation | https://support.deepl.com/hc/en-us/articles/4408409154322-Translate-text-from-documents | Mobile file translation requirements, account requirement, file types, plan limits, translated-file overview, and accuracy limitations for difficult text | Verified 2026-05-02 |
| DeepL Privacy Policy | https://www.deepl.com/en/privacy | Translation/account data, product telemetry, retention, rights, and organizational privacy posture | Verified 2026-05-02 |
| DeepL Terms | https://www.deepl.com/en/pro-license | Account, plan, paid-feature, acceptable-use, and service contract boundaries | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- App supports text and document translation and a free + paid tier.
- Documents must upload securely, translate, and return in similar format.
- Glossary entries must be enforced per language pair.
- Alternative translations must be browsable and clickable to replace inline.
- Subscription state must include free, trial, paid, expired, restored, and web-managed.
- Mobile file translation must require an account, support .pdf/.docx/.ppt inputs where licensed by the clone, expose plan-count usage, and block unsupported files before upload.
- Glossary is not supported for mobile file translation per official help; V1 must make that limitation explicit instead of silently ignoring glossary terms.
- The App Store listing verifies real-time camera translation, imported photo translation, dictation, text-to-speech, quick detection while typing, alternatives, favorites, history, transliteration, glossary, formal/informal tone, handwriting on iPad, and writing suggestions.
- DeepL Write-style suggestions must be modeled separately from translation, with original copy, grammar/style suggestions, and clear data retention.
- Enterprise/team glossary and usage analytics must be feature-flagged until team account, admin, and billing behavior are manually verified.
- Accessibility coverage must include VoiceOver, Voice Control, larger text, dark interface, keyboard focus, and screen-reader labels for language swap, camera, mic, file, favorite, and history controls.
- Low-quality OCR cases such as small, badly lit, handwritten, or stylized text must produce low-confidence warnings and user correction paths.

## Core User Journeys

- User pastes text, selects target language, sees translation and alternative phrasings.
- User taps an alternative phrasing; the output updates inline.
- User uploads a document, monitors progress, downloads translated file.
- User creates a glossary entry (source -> target) and sees it enforced.
- User saves a translation to favorites and searches later.
- User upgrades to paid, sees document/volume limits update, and restores on another device.
- User clears history and deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home | Text translate with alternatives | paste, type, swap | idle, translating | offline, rate limit |
| Document Translate | Upload and monitor | pick file, format | uploading, processing, done | format unsupported, too large |
| Glossary | Manage entries | add, edit, remove | empty, loaded | import conflict |
| History / Favorites | Saved and recent | search, favorite | loaded, cleared | sync issue |
| Voice / Speech Input | Dictate text to translate | mic | ready, recording | mic denied |
| Settings | Privacy, account, tier | toggles | loaded | region restriction |
| Subscription | Plan and restore | plan, restore | free, paid, expired | webhook delay |
| Support | Help and feedback | form | submitted | unavailable |

## Data Model

- `User`, `LanguagePair`, `TranslationRequest`, `TranslationResult`, `AlternativeChoice`, `Document` (source, target, status, asset refs), `GlossaryEntry` (pair, source term, target term), `Favorite`, `HistoryEntry` (retention), `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /translate/text`, `POST /translate/text/alternatives/:id`.
- `POST /documents`, `PUT /documents/:id/content`, `POST /documents/:id/translate`, `GET /documents/:id`, `GET /documents/:id/download`.
- `GET /glossaries`, `POST /glossaries`, `PATCH /glossaries/:id`, `DELETE /glossaries/:id`.
- `GET /favorites`, `POST /favorites`, `DELETE /favorites/:id`.
- `GET /history`, `DELETE /history`.
- `POST /auth/session`, `DELETE /account`, `POST /data-export`.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Document translation is async; app polls or listens for status.
- Text translation cached locally for repeat queries within session.
- Push optional for document-ready notifications; never include translated content.
- Offline mode limited; inform user when MT is unavailable.

## Permissions, Privacy, And Safety

- No logging of translated content by default; opt-in feedback sampling.
- Documents stored only long enough to deliver translated output, then deleted per retention policy.
- Glossary entries are user-private by default.
- Enterprise mode (optional) supports SSO and admin audit logs.
- Analytics exclude input content and file names.
- Export + delete account available.

## Analytics And Monetization

- Events: translate success/failure, document uploaded/completed/failed, glossary created, favorite added, entitlement changed.
- Tiers original; no borrowed copy.
- Paywall must identify blocked feature (e.g. document size limit).

## Edge Cases

- Document too large, corrupt, or password-protected.
- Glossary entry conflicts with in-context translation.
- User edits alternative translation and wants to revert.
- Entitlement mismatch between web and mobile.
- File format unsupported (e.g. scanned PDF without OCR tier).
- Network lost mid-document upload.

## Test Plan

- Unit tests for alternative-swap state machine, glossary enforcement, history retention.
- Contract tests for documents and glossary APIs.
- Integration tests for text translate, document translate end-to-end, glossary CRUD.
- Billing tests for tiers and restore across platforms.
- Privacy tests for retention defaults, export/delete.
- Accessibility tests for dynamic type, screen reader, keyboard on iPad.
- Manual verification: document formats on device, entitlement reconciliation.

## Acceptance Criteria

- Source URLs verified.
- Text, document, glossary flows work end to end.
- Entitlements reconcile across platforms.
- Retention policy documented and tested.
- Manual blockers feature-flagged.

## Open Questions

- Which MT engine backs V1?
- Will OCR for scanned PDFs ship in V1?
- Enterprise SSO in V1?
- Which document formats are mandatory vs nice-to-have?

## Build Plan

- Phase 1: text translation + alternatives + history.
- Phase 2: document upload/translate pipeline.
- Phase 3: glossary management + enforcement.
- Phase 4: entitlements + paywall.
- Phase 5: enterprise options (SSO, audit).
- Phase 6: accessibility, privacy, manual verification.

## Next Steps

- Verify source URLs.
- Select MT provider and document pipeline.
- Define retention and enterprise DPA.
