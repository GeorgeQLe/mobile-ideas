# Grammarly-Style Clone Spec

> Metadata
> - Inspiration app: Grammarly
> - Category: Writing assistant
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Grammarly support/docs, privacy/security pages, and public feature pages.
> - Manual verification blockers: native iOS/Android keyboard extension behavior, full-access keyboard warning copy, document import/export, subscription purchase/restore, enterprise SSO, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, suggestion text, linguistic rules, icons, keyboard art, and model/provider integrations.

## Overview

Build an original mobile writing assistant inspired by Grammarly's mobile workflow: keyboard-assisted suggestions, in-app document editing, grammar/spelling/clarity checks, tone and rewrite assistance, writing goals, dictionary terms, account privacy controls, and paid entitlement states.

The clone must not copy Grammarly branding, screenshots, marketing copy, protected UI artwork, private APIs, proprietary grammar rules, suggestion wording, tone labels, or model outputs. V1 can reproduce comparable user jobs and interaction patterns using original language, licensed NLP services, and explicit privacy controls.

This spec is implementation-ready for a public-source V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide a mobile keyboard extension that can surface spelling, grammar, clarity, tone, and rewrite suggestions while users compose text.
- Provide an in-app editor for longer documents, imports, drafts, goals, full-document checks, and export/share flows.
- Give users clear controls for cloud processing, training/model-improvement consent, personal dictionary terms, account deletion, and data export.
- Support free, trial, paid, expired, restored, enterprise-managed, and offline-limited entitlement states without copying Grammarly plan names or prices.
- Preserve safety expectations for sensitive text, password fields, minors, regulated content, and enterprise data.

## Non-Goals

- Do not build a Grammarly-branded product or imply endorsement by Grammarly.
- Do not copy proprietary suggestion engines, linguistic corpora, rewrite text, tone classifiers, private network traffic, or app-store screenshots.
- Do not request keyboard full access without a plain-language disclosure of what the clone can read and transmit.
- Do not process password/secure-field text in the cloud or log user text in analytics.
- Do not claim one-for-one mobile keyboard parity until native device blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/grammarly-ai-writing-keyboard/id1462114288 | Official iOS listing, app category, ratings, privacy labels, screenshots, keyboard/editor positioning, in-app purchases | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.grammarly.android.keyboard | Official Android listing, install surface, screenshots, data-safety summary, subscription signals | Verified 2026-05-03 |
| Grammarly Support Home | https://support.grammarly.com/ | Help-center structure for accounts, billing, product use, writing suggestions, and troubleshooting | Verified 2026-05-03 |
| Grammarly for iPhone/iPad | https://support.grammarly.com/hc/en-us/sections/360003816092-Grammarly-for-iPhone-and-iPad | iOS keyboard/editor setup, mobile behavior, account and troubleshooting topics | Verified 2026-05-03 |
| Grammarly for Android | https://support.grammarly.com/hc/en-us/sections/360003816052-Grammarly-for-Android | Android keyboard setup, mobile editor behavior, troubleshooting topics | Verified 2026-05-03 |
| Grammarly Features | https://www.grammarly.com/features | Public feature taxonomy for grammar, spelling, punctuation, clarity, tone, citations, and generative writing | Verified 2026-05-03 |
| Grammarly Plans | https://www.grammarly.com/plans | Public feature gating and plan-level capability signals | Verified 2026-05-03 |
| Grammarly Privacy Policy | https://www.grammarly.com/privacy-policy | Personal-data handling, user content, retention, account rights, and service-provider obligations | Verified 2026-05-03 |
| Grammarly Security | https://www.grammarly.com/security | Security posture, enterprise controls, encryption, compliance signals, and vulnerability handling | Verified 2026-05-03 |
| Grammarly Terms of Service | https://www.grammarly.com/terms | Account rules, paid-service terms, acceptable use, and legal boundaries | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- The app must provide a keyboard setup journey for iOS and Android that explains required OS keyboard permissions before prompting.
- Keyboard suggestions must be tap-accept, dismissible, undoable, and resilient when the host app changes text unexpectedly.
- Secure text fields and password-like contexts must suppress cloud checks and analytics.
- The in-app editor must support typed text, pasted text, imported/shared text, saved drafts, full-document checks, and export/share.
- Suggestions must include categories for spelling, grammar, punctuation, clarity, concision, tone, rewrite, and style where the configured engine supports them.
- Writing goals must influence the check request and be visible in the document editor before a full check runs.
- Tone detection must display confidence and uncertainty states; the clone must avoid judgmental or mental-health-adjacent claims.
- Personal dictionary terms must override suggestions and sync across signed-in devices.
- Cloud processing mode must disclose what text is transmitted, why, retention behavior, and how to disable optional training.
- Offline mode must keep basic local checks available and label any disabled cloud-only features.
- Entitlement logic must gate advanced rewrites, longer documents, team/enterprise features, and high-volume usage without trusting client-only state.
- Enterprise mode must support admin restrictions for content retention, analytics, SSO, and managed account deletion where configured.
- Account privacy flows must include export, deletion, training opt-out, and support contact paths.
- Push notifications may cover account, billing, or writing-insight reminders but must not include raw user text.
- Accessibility must cover keyboard suggestion labels, dynamic type in the editor, hardware keyboard navigation, and screen-reader order.

## Core User Journeys

- New user installs the app, signs in or continues with a limited flow, reviews privacy education, enables the keyboard, and completes a test suggestion.
- User writes in another app, receives a spelling suggestion, accepts it, then undoes the replacement from the keyboard bar.
- User types sensitive text into a secure field and sees cloud suggestions suppressed without losing the host app's keyboard.
- User pastes a long draft into the editor, sets audience/intent/formality goals, runs a full check, accepts several suggestions, and exports the revised text.
- User receives a tone warning, opens rewrite options, compares variants, and inserts an original softer version.
- User adds a domain-specific term to the personal dictionary and confirms future checks no longer flag it.
- User disables cloud processing; the keyboard and editor shift to local-only checks with visible capability differences.
- User reaches a paid-feature gate, sees an original entitlement state, purchases or restores access, and sees advanced rewrites unlock after server confirmation.
- Enterprise user signs in with SSO, inherits admin-managed privacy settings, and cannot enable prohibited data sharing.
- User exports data, deletes account, and sees local keyboard/session cleanup.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, legal consent | email/social auth, SSO, skip when allowed | new, returning, signed-out | underage, blocked domain, network failure |
| Keyboard Setup | Explain and enable keyboard | OS settings deep link, checklist | not-enabled, enabled, full-access pending | permission denied, partial access |
| Keyboard Suggestion Bar | Cross-app correction surface | accept, dismiss, undo, open editor | idle, checking, suggestions, hidden | secure field, host text mismatch, offline |
| Keyboard Rewrite Sheet | Candidate rewrites | style, tone, insert | loading, variants, inserted | insufficient text, entitlement gate |
| In-App Editor | Longer writing and full checks | type, paste, import, check, export | empty, drafting, checking, checked | too large, unsupported import, save conflict |
| Goals | Configure writing intent | audience, formality, domain, intent | defaults, customized | incompatible goals, enterprise locked |
| Tone Panel | Tone/confidence summary | segment selection, rewrite | neutral, strong, uncertain | short text, unsupported language |
| Personal Dictionary | Manage custom terms | add, edit, remove | empty, loaded, syncing | duplicate, invalid term, sync failed |
| Privacy Controls | Processing, training, export, delete | toggles, export, delete | signed-in, managed, pending | delete blocked, export delivery failed |
| Subscription | Entitlements and restore | plan, checkout, restore | free, trial, paid, expired | platform mismatch, webhook delay |
| Enterprise Admin Notice | Managed-account constraints | view policy, contact admin | managed, restricted | SSO expired, admin policy unavailable |
| Support | Help and feedback | issue category, message | draft, submitted | unavailable, abusive report |

## Data Model

- `User`: identity, locale, age/region gates, auth providers, managed-account flags, consent state.
- `DeviceSession`: platform, app version, keyboard-enabled state, notification token, session expiry.
- `KeyboardContext`: host app class, secure-field flag, selected locale, full-access state, active document buffer hash.
- `Document`: title, body reference, source, owner, goals, draft/export state, created/updated timestamps.
- `TextSegment`: document range, language, secure/sensitive flags, check batch id, normalized text hash.
- `CheckRun`: document or keyboard invocation, processing mode, goals, status, started/finished timestamps, failure code.
- `Suggestion`: category, segment range, replacement text, rationale, confidence, entitlement gate, accepted/dismissed state.
- `RewriteCandidate`: source segment, style goal, generated text, confidence, provider metadata, safety state.
- `ToneReading`: segment, labels, confidence, uncertainty reason, generated-at timestamp.
- `DictionaryTerm`: term, casing rule, language, owner, source, created/deleted timestamps.
- `ProcessingPreference`: cloud-enabled, training opt-in, retention mode, enterprise lock, audit metadata.
- `Entitlement`: plan key, platform, purchase id, renewal/expiration/refund/restore state, feature limits.
- `AuditEvent`: privacy, billing, SSO, dictionary, deletion, export, and admin-policy changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`, `DELETE /account`: account and managed-session lifecycle.
- `GET /settings/privacy`, `PATCH /settings/privacy`: cloud processing, training opt-in, retention, and managed-policy state.
- `POST /checks`: checks text segments with goals, locale, processing mode, idempotency key, and secure-field flag.
- `GET /checks/:id`: returns check status, suggestion counts, warnings, and failure codes.
- `POST /rewrites`: returns rewrite candidates for a segment with style goal, entitlement check, and safety result.
- `POST /tone`: returns tone reading with confidence and uncertainty reasons.
- `GET /documents`, `POST /documents`, `PATCH /documents/:id`, `DELETE /documents/:id`: editor document lifecycle.
- `POST /documents/:id/export`: creates a share/export payload without retaining unnecessary copies.
- `GET /dictionary`, `POST /dictionary`, `PATCH /dictionary/:id`, `DELETE /dictionary/:id`: personal dictionary sync.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: paid-state lifecycle.
- `POST /data-export`, `GET /data-export/:id`, `POST /support/cases`: privacy and support workflows.

## Realtime, Push, And Offline Behavior

- Keyboard checks must debounce locally, cancel stale requests, and attach sequence numbers so late cloud responses cannot replace newer text.
- Local spellchecking and dictionary overrides should work offline; cloud-only clarity, tone, and rewrite features show disabled states.
- In-app drafts save locally first and reconcile to the server after reconnect with explicit conflict states.
- Suggestion acceptance must preserve undo information until the host input or editor buffer changes materially.
- Dictionary and privacy settings sync opportunistically and fall back to last-known local values with age indicators.
- Push payloads must use opaque IDs and never include raw document text, suggestions, or tone labels.
- Enterprise policy updates should invalidate disallowed local features and write an audit event on the next sync.

## Permissions, Privacy, And Safety

- Keyboard full access must be requested only after the setup screen explains platform implications and clone-specific data handling.
- Cloud checks must be suppressed for secure fields, password managers, banking/health contexts when detectable, and enterprise-prohibited apps.
- Analytics must exclude raw text, replacement suggestions, document titles, host app names, and personal dictionary values.
- Training/model-improvement consent must be opt-in, revocable, audited, and separate from required service processing.
- Document retention must honor deletion, export, enterprise, and support-case requirements.
- Safety filters must reject or transform requests for harassment, fraud, impersonation, non-consensual sexual content, malware/social engineering, and high-stakes professional advice.
- Minor and school/enterprise contexts require reduced data retention and admin/guardian policy controls where applicable.
- Support tooling must redact user content by default and require elevated permission for raw text inspection.

## Analytics And Monetization

- Track privacy-safe events: keyboard setup started/completed, suggestion offered/accepted/dismissed by category, check started/completed/failed, rewrite requested, tone generated, dictionary changed, privacy setting changed, export/delete requested, entitlement changed.
- Event payloads use object types, counts, latency, feature gates, and failure codes instead of text content.
- V1 may include original free and paid tiers; names, prices, trial copy, and feature descriptions must be original.
- Paywalls must identify blocked capability, current entitlement, restore path, platform ownership, and support path.
- Enterprise plans may expose SSO/admin controls only after tenant policy is fetched server-side.

## Edge Cases

- Keyboard enabled but full access denied; app should explain available local-only behavior.
- Host app rejects text replacement or modifies text between suggestion and accept; show failed/undo state.
- User types in mixed languages, unsupported language, emoji-heavy text, code snippets, or quoted text.
- Very long document exceeds server limits; chunk safely and preserve section mapping.
- Cloud check returns after user has edited or deleted the segment; discard stale response.
- Dictionary term conflicts with grammar rule, casing, pluralization, or another synced device.
- Training opt-out toggled while checks are in progress; subsequent processing must use new preference.
- Enterprise admin disables cloud rewrites while user is on the rewrite sheet.
- Subscription restored on a different platform, refund arrives late, or webhook duplicates.
- Account deletion requested with active enterprise membership or subscription.
- Data export delivery fails or expires before the user downloads it.
- Accessibility user navigates keyboard suggestions via VoiceOver or hardware keyboard.

## Test Plan

- Unit tests for debounce/cancel behavior, suggestion sequence ordering, undo state, dictionary overrides, secure-field suppression, entitlement gates, and privacy preference transitions.
- Contract tests for `/checks`, `/rewrites`, `/tone`, document CRUD, dictionary CRUD, privacy settings, billing webhooks, export, and deletion flows.
- Integration tests for keyboard setup, cross-app suggestion acceptance, editor check, goals, tone panel, rewrite insertion, export, and account deletion.
- Offline tests for local spelling, draft preservation, settings staleness, queued dictionary changes, and cloud-feature disabled states.
- Privacy tests for analytics redaction, secure-field suppression, training opt-out, raw-text access controls, export/delete, and enterprise policy enforcement.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, platform-owned, web-owned, and enterprise-managed states.
- Safety tests for abusive rewrites, fraud/social-engineering text, malware prompts, minors, professional-advice disclaimers, and support escalation.
- Accessibility tests for dynamic type, screen-reader labels, focus order, color contrast, reduced motion, keyboard extension navigation, and iPad hardware keyboard use.
- Manual verification tests: iOS full-access prompt, Android keyboard switcher, host-app replacement behavior, subscription purchase/restore, push payloads, and native accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary Grammarly assets, private APIs, suggestion corpora, or brand copy.
- Keyboard and editor flows support suggestions, dismiss, accept, undo, goals, tone, rewrites, and dictionary overrides.
- Secure fields and privacy-sensitive contexts suppress cloud processing and raw-text analytics.
- Cloud/local processing, training opt-in, export, deletion, and enterprise restrictions are visible and test-covered.
- Entitlement states deterministically gate advanced rewrites and high-volume checks through server-confirmed state.
- Offline, mixed-language, host-app mismatch, long-document, and sync-conflict cases have explicit failure codes.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which NLP provider or on-device language models will power spelling, grammar, clarity, tone, and rewrites?
- Which languages and locale-specific rules ship in V1 versus later?
- Will the clone support enterprise SSO and admin policy in V1 or defer it behind a tenant flag?
- How much document history should be retained when cloud processing is disabled?
- Which host-app contexts can be detected reliably on iOS and Android without overclaiming privacy guarantees?
- Will voice dictation and citation assistance be in V1 or later?

## Build Plan

- Phase 1: scaffold auth, privacy settings, in-app editor, document CRUD, check API, basic local spelling, and privacy-safe analytics.
- Phase 2: add suggestion taxonomy, goals, accept/dismiss/undo, export/share, dictionary sync, and offline draft handling.
- Phase 3: add iOS and Android keyboard extensions with full-access setup, secure-field suppression, debounced checks, and host-app mismatch recovery.
- Phase 4: add tone detection, rewrite candidates, safety filters, entitlement gates, and paid-state reconciliation.
- Phase 5: add enterprise SSO/admin policy, audit events, managed privacy restrictions, support tooling, and data export/delete jobs.
- Phase 6: complete accessibility, performance, offline, mixed-language, security, billing, and manual native verification passes.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native keyboard parity.
- Select licensed NLP providers and decide which checks can run on-device in V1.
- Create or link the downstream implementation repository when Phase 1 is ready.
