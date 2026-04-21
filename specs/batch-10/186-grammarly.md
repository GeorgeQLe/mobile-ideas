# Grammarly-Style Clone Spec

> Metadata
> - Inspiration app: Grammarly
> - Category: Writing assistant
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings and help center pages — pending exact URL verification.
> - Manual verification blockers: native iOS/Android keyboard extension behavior, full access keyboard warnings, document import scope, tone detection quality, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, original suggestions engine, original tone model, and original brand.

## Overview

Build an original mobile writing assistant inspired by Grammarly: cross-app suggestions via system keyboard extension, tone detection, rewrite suggestions, and document checks.

The clone must not copy Grammarly branding, suggestion wording, iconography, private APIs, or named features.

## Goals

- Provide a custom keyboard extension that offers grammar, spelling, clarity, and tone suggestions in any app.
- Provide a document editor inside the app for deeper checks.
- Offer tone detection with actionable rewrite suggestions.
- Support multiple writing goals (audience, intent, formality).
- Disclose on-device vs cloud processing clearly to the user.

## Non-Goals

- Do not imply Grammarly affiliation.
- Do not copy rule sets or canned suggestion wording.
- Do not train on user text without explicit opt-in.
- Do not claim "full access" keyboard without displaying the platform warning.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/grammarly-ai-writing-keyboard/id1462114288 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.grammarly.android.keyboard | Android listing, data safety | Source discovery — pending exact URL verification |
| Grammarly Support | https://support.grammarly.com/ | Keyboard, tone, docs, premium | Source discovery — pending exact URL verification |
| Grammarly Privacy | https://www.grammarly.com/privacy-policy | Personal data, training opt-out | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Keyboard extension integrated with iOS and Android keyboard APIs; "full access" required on iOS with transparent disclosure.
- Suggestions must be acceptable via tap; cards must be dismissible and non-intrusive.
- Document editor must support paste, import from share-sheet, and export.
- Tone detection must run on text segments with clear labels and non-judgmental language.
- Subscription states: free, trial, paid, expired, restored.

## Core User Journeys

- User installs app, enables keyboard with full-access disclosure, writes in any app, and accepts a suggestion.
- User types a message; tone detector flags it as "strong"; user taps a softer rewrite.
- User pastes text into the in-app document editor and runs a full check.
- User adjusts goals (audience: expert, intent: persuade, formality: formal) and re-runs check.
- User reviews personal dictionary and adds custom terms.
- User upgrades tier; advanced rewrites unlock.
- User disables cloud processing; suggestions become on-device-only with clear scope changes.
- User exports data or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Keyboard Setup | Enable keyboard + full access | step list | not-enabled, enabled | partial access |
| Keyboard UI | Suggestion bar | tap suggestion, dismiss | idle, suggesting, hidden | offline, sensitive app |
| In-App Editor | Write/check document | paste, check | empty, drafting, checked | import too large |
| Goals | Choose goals for check | audience, intent, formality | default, custom | preset conflict |
| Tone Detector | Show tone reading | switch reading mode | neutral, strong, uncertain | insufficient text |
| Personal Dictionary | Custom terms | add, remove | empty, loaded | duplicate |
| Settings | Privacy, account, processing mode | toggles | loaded, signed-out | enterprise-managed |
| Subscription | Plan and restore | plan, restore | free, paid, expired | webhook delay |
| Support | Help and feedback | form | submitted | unavailable |

## Data Model

- `User`, `Document`, `Check` (segments, suggestions), `Suggestion` (type: spelling/grammar/clarity/tone/rewrite, confidence, rationale), `Goals`, `ToneReading`, `DictionaryTerm`, `ProcessingPreference` (on-device vs cloud), `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`, `POST /data-export`.
- `POST /check` (text, goals, device-mode) -> suggestions[] with rationale.
- `POST /check/rewrite` (segment, style).
- `POST /tone` (text) -> tone reading + confidence.
- `GET /documents`, `POST /documents`, `PATCH /documents/:id`, `DELETE /documents/:id`.
- `GET /dictionary`, `POST /dictionary`, `DELETE /dictionary/:term`.
- `GET /settings`, `PATCH /settings` (processing mode, training opt-out).
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Keyboard prefers on-device checks for responsiveness; cloud calls batched with debounce.
- Document check runs cloud-first with progress indicator; failed calls retry once.
- Offline mode offers spelling + basic grammar only; UI shows scope badge.
- Push notifications optional for weekly insights; never include user text.

## Permissions, Privacy, And Safety

- Full-access keyboard: explicit opt-in with verbatim platform warning paraphrased honestly.
- Sensitive app detection: keyboard suppresses cloud checks in password/secure fields.
- Training opt-out default on; explicit opt-in with preview of data shared.
- Analytics exclude user text; only event types and counts.
- Enterprise mode: SSO/SCIM, admin analytics aggregation, no per-user content retention by default.
- Export + delete account flows.

## Analytics And Monetization

- Events: keyboard enabled, suggestion offered/accepted/dismissed, tone reading generated, goals changed, document checked, entitlement changed.
- Original free + premium tiers; original naming.
- Paywall identifies blocked feature (e.g. advanced rewrites).

## Edge Cases

- Keyboard in password field (must be secure, no cloud calls).
- Very long document check; must stream progress.
- Mixed-language text; detect per segment.
- Unsupported language; graceful fallback to spelling only.
- User accepts suggestion but app reverts; undo required.
- Dictionary conflict with suggestion engine.

## Test Plan

- Unit tests for debounce, suggestion ranking, dictionary overrides, secure-field detection.
- Contract tests for /check, /tone, /rewrite.
- Integration tests for keyboard extension across input types.
- Privacy tests for secure-field suppression, training opt-out.
- Accessibility tests for keyboard contrast, dynamic type, VoiceOver suggestion labels.
- Billing tests for tiers and restore.
- Manual verification: iOS full-access prompt, Android keyboard switcher.

## Acceptance Criteria

- Source URLs verified.
- Keyboard + in-app editor work with suggestions and tone.
- On-device vs cloud scope is disclosed.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- Which NLP backend powers cloud checks vs on-device?
- Will enterprise SSO ship in V1?
- Which languages ship in V1?
- Will voice-to-text composition be supported?

## Build Plan

- Phase 1: in-app editor + check engine (cloud).
- Phase 2: keyboard extension (iOS + Android).
- Phase 3: tone detection + rewrites + goals.
- Phase 4: personal dictionary + offline spelling.
- Phase 5: entitlements + paywall.
- Phase 6: enterprise + accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Select NLP provider and on-device model.
- Legal review of keyboard full-access copy.
