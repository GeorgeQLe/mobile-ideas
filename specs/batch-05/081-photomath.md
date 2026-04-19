# Photomath-Style Clone Spec

> Metadata
> - Inspiration app: Photomath
> - Category: education utility, camera math capture, OCR, step-by-step explanations, graphing, calculator, math learning, subscriptions, and academic-integrity controls
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, camera permission prompts, OCR capture/editing, handwritten/textbook/screen scan accuracy, cloud recognition behavior, supported/unsupported math taxonomy, graphing behavior, Photomath Plus checkout/cancellation, family sharing, video/animated tutorials, history sync, classroom/minor use, notification behavior, data export/deletion, support escalation, and regional store availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original camera math learning utility inspired by Photomath's public workflow: scan or type a math problem, review recognized notation, inspect step-by-step solution paths, graph supported expressions, save history, unlock deeper explanations through an original subscription, manage support, and control privacy/data rights.

The clone must not copy marks, iconography, screenshots, math-solver implementation, teacher-authored explanations, animated tutorials, textbook solution content, calculator UI, problem-recognition models, premium copy, pricing, and support copy. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first photomath-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a Photomath-branded app or imply affiliation with Photomath, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/photomath/id919087726 | Official iOS listing, education category, camera math positioning, Plus subscription disclosure, privacy labels, and release context | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.microblink.photomath | Official Android listing, package id, education category, in-app purchase disclosure, data-safety orientation, and product claims | Verified 2026-04-19 |
| Photomath Help Center | https://support.google.com/photomath/?hl=en | Public support entry for setup, scanning, math content, technical issues, Plus, and refunds | Verified 2026-04-19 |
| Photomath Overview | https://support.google.com/photomath/answer/14328660?hl=en | Public explanation of camera recognition, cloud processing, free steps, Plus features, and supported learning model | Verified 2026-04-19 |
| Photomath Terms | https://photomath.com/terms/ | Service-use, account, subscription, content, and legal constraints | Verified 2026-04-19 |
| Photomath Privacy Policy | https://photomath.com/privacy | Personal data, camera/problem images, usage data, privacy rights, retention, and controller context | Verified 2026-04-19 |
| Photomath Plus Overview | https://support.google.com/photomath/answer/14330572?hl=en | Plus subscription features, billing model, animated tutorials, and entitlement review area | Verified 2026-04-19 |
| Photomath Camera Help | https://support.google.com/photomath/answer/14334396?co=GENIE.Platform%3DiOS&hl=en | Camera/scanning troubleshooting and permission-sensitive capture review area | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position the app around scanning math problems, recognizing handwritten or printed notation, showing solution steps, graphing, video/animated learning aids, and a paid Plus tier.
- V1 must model signed-out preview, new learner, returning learner, camera-denied user, offline user, Plus subscriber, expired subscriber, classroom/minor user, unsupported-problem user, restricted account, and deleted-account states.
- Onboarding must support age/locale, learning level, camera primer, academic-integrity guardrails, account creation or deferral, notification preference, and subscription education without dark patterns.
- Capture must support camera scan, photo/library import where scoped, typed math keyboard, OCR confidence review, formula correction, unsupported notation, and retry without storing raw images longer than needed.
- Solution detail must support final answer, ordered steps, alternate methods, graph view, definitions/hints, premium explanation gates, error feedback, saved history, and share/export controls.
- Math content operations must support solver-version tracking, supported topic taxonomy, answer-quality reports, expert review queues, and rollback for incorrect explanations.
- Subscription flows must support free, trial, paid, expired, refunded, family-shared where chosen, unavailable, and store-sync-pending states with server-verified entitlements.
- Settings must expose language, camera guidance, history, subscription, notifications, help, terms, privacy policy, data access/export, account deletion, and support escalation.

### Manual Verification Required

- native iOS/Android screen capture, camera permission prompts, OCR capture/editing, handwritten/textbook/screen scan accuracy, cloud recognition behavior, supported/unsupported math taxonomy, graphing behavior, Photomath Plus checkout/cancellation, family sharing, video/animated tutorials, history sync, classroom/minor use, notification behavior, data export/deletion, support escalation, and regional store availability.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default Photomath-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, account, legal, and learner setup | email, SSO, skip, age, locale | guest, new, returning | auth fail, underage, suspended, offline |
| Camera Capture | Scan printed, handwritten, or screen math | camera, crop, flash, shutter | permission prompt, active, captured | denied camera, blurry image, unsupported notation |
| Math Keyboard | Manual formula entry and correction | symbols, cursor, paste | empty, editing, validated | invalid syntax, unsupported symbol |
| Recognition Review | Confirm OCR result before solving | edit, rescan, submit | low confidence, corrected, accepted | cloud failure, timeout, bad parse |
| Solution Detail | Answer, steps, methods, concepts | step expand, graph, save | free, premium, complete | solver error, blocked premium, stale solution |
| Graphing | Interactive graph inspection | pan, zoom, equation select | loaded, comparing | unsupported function, render fail |
| History | Saved solved problems | search, filter, delete | empty, synced, local-only | account mismatch, deleted item |
| Plus Subscription | Trial, paid, restore, manage | checkout, restore, cancel | free, trial, paid, expired | refund, family conflict, store pending |
| Support/Feedback | Incorrect solution and issue reports | problem id, notes, screenshot consent | draft, submitted, resolved | sensitive image, duplicate report |
| Settings/Privacy | Account, language, data rights, deletion | toggles, export, delete | loaded, exporting, deleting | retention hold, verification fail |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `LearnerProfile`: app-specific learnerprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `MathProblem`: app-specific mathproblem state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `CaptureImage`: app-specific captureimage state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `RecognitionResult`: app-specific recognitionresult state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `FormulaEdit`: app-specific formulaedit state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Solution`: app-specific solution state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SolutionStep`: app-specific solutionstep state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `GraphState`: app-specific graphstate state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `MathTopic`: app-specific mathtopic state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SavedProblem`: app-specific savedproblem state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SubscriptionEntitlement`: plan, provider, trial, renewal, expiration, refund, feature flags, and server verification status.
- `QualityReport`: app-specific qualityreport state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: auth with age, locale, device, and deletion state.
- `POST /captures`, `POST /captures/:id/recognize`: signed upload or secure image handoff with OCR confidence, retention policy, and idempotency.
- `POST /problems`, `PATCH /problems/:id/formula`: typed/corrected formula lifecycle with syntax validation and supported-topic response.
- `POST /solutions`, `GET /solutions/:id`: solver output, step order, alternate methods, graph eligibility, premium gates, and version metadata.
- `GET /math-topics`, `GET /supported-content`: public supported/unsupported math taxonomy and cache hints.
- `POST /quality-reports`, `GET /quality-reports/:id`: incorrect answer, unclear step, scan issue, and support resolution states.
- `GET /history`, `POST /history`, `DELETE /history/:id`: saved problem history, local sync, deletion, and export eligibility.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: Plus-like entitlement verification.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`: privacy choices, export, deletion, and warnings.
- `POST /support/cases`, `GET /support/cases/:id`: camera, billing, math-quality, account, and privacy support workflows.

## Realtime, Push, And Offline Behavior

- Cache recent solved problems, formula edits, settings, help metadata, and entitlement snapshot with freshness labels.
- Allow manual formula drafting and local history browsing offline; block camera cloud recognition, new solver runs, checkout, account deletion, and support evidence upload.
- Queue low-risk quality reports only after redacting raw problem images unless the user explicitly consents to attach evidence.
- Recognition and solution requests must be idempotent and tied to solver/model versions so stale answers can be invalidated.
- Push notifications should be limited to subscription/account/support updates and optional study reminders; payloads must not include raw formulas or images.
- Local cache must handle corrupt captures, partial uploads, disk-full states, revoked camera/photo permission, and expired entitlements.

## Permissions, Privacy, And Safety

- Camera/photo capture, problem images, minors/classroom use, academic misuse, solver accuracy, and subscriptions are launch blockers with named owners.
- Never market the product as a homework-cheating tool, grade guarantee, or replacement for instruction; include learning-first and integrity guidance.
- Do not retain raw problem images beyond the documented processing/support need without explicit consent and retention controls.
- Solver output must carry confidence, topic coverage, version metadata, and a user-visible report path for incorrect or harmful answers.
- Child/minor and classroom workflows require privacy/legal review, data minimization, age-appropriate copy, and school-use boundaries.
- Accessibility must cover math notation reading, screen-reader labels, keyboard entry, graph alternatives, dynamic type, and high-contrast step states.

## Analytics And Monetization

- Track privacy-safe events: capture_started, capture_completed, ocr_reviewed, formula_corrected, solution_requested, solution_step_opened, graph_opened, quality_report_submitted.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- blurry or rotated capture
- ambiguous OCR
- unsupported symbol
- solver timeout
- wrong answer report
- premium gate mismatch
- minor classroom scenario
- deleted history restore attempt

## Test Plan

- Unit tests for validation, state machines, entitlement gates, privacy-safe analytics payloads, and deletion/export eligibility.
- Contract tests for every documented API route, including idempotency, validation errors, authorization, pagination, stale versions, and sensitive-state responses.
- Integration tests for auth, onboarding, home, core workflow, detail/history, settings, support, subscription, privacy export, and deletion.
- Offline tests for cached reads, queued drafts, blocked sensitive writes, stale data labels, corrupt cache, disk-full behavior, and reconnect reconciliation.
- Permission tests for denied, granted, revoked, limited, and platform-unavailable states for every scoped OS permission.
- Billing tests for free, trial, paid, canceled, expired, refunded, unavailable, restored, family/sponsored where scoped, and store-sync-pending states.
- Privacy tests for data minimization, consent withdrawal, export completeness, delete warnings, retained records, audit events, and sensitive analytics redaction.
- Safety tests for category-specific harms, report/escalation paths, blocked launch areas, age/region restrictions, and unsupported claim prevention.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, chart/media alternatives, and error recovery.
- Manual verification tests for native iOS/Android screen capture, camera permission prompts, OCR capture/editing, handwritten/textbook/screen scan accuracy, cloud recognition behavior, supported/unsupported math taxonomy, graphing behavior, Photomath Plus checkout/cancellation, family sharing, video/animated tutorials, history sync, classroom/minor use, notification behavior, data export/deletion, support escalation, and regional store availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing marks, iconography, screenshots, math-solver implementation, teacher-authored explanations, animated tutorials, textbook solution content, calculator UI, problem-recognition models, premium copy, pricing, and support copy.
- New and returning users can complete onboarding, use the core workflow, recover from permission/offline failures, manage entitlements, and reach settings/support with original or licensed data.
- All documented entities have lifecycle states, owners, authorization rules, audit behavior, and deletion/export handling.
- Signed-out, signed-in, paid, expired, permission-denied, offline, stale-data, restricted, and deleted-account states are covered by tests.
- Every manual verification blocker remains behind a launch-blocking feature flag or explicit owner/path until lawful test-device evidence is captured.
- Privacy, safety, accessibility, subscription, support, data export, and deletion flows have acceptance tests before app implementation starts.
- The spec uses exact first-party URLs and does not claim one-for-one native parity for unverified behavior.

## Open Questions

- Which original content, datasets, algorithms, providers, and licenses will back the downstream clone?
- Which features are V1 versus later, especially paid, device, health, community, AI, or partner/provider-dependent surfaces?
- Which jurisdictions, age gates, accessibility standards, privacy laws, app-store rules, and retention obligations are launch requirements?
- Which support, moderation, refund, safety, and escalation owners must approve the product before release?
- Which manual verification blockers can be resolved with lawful test accounts/devices before implementation begins?

## Build Plan

- Phase 1: app shell, auth, learner setup, camera primer, typed math keyboard, local history, settings, and privacy-safe analytics.
- Phase 2: secure capture upload, OCR review, formula correction, supported topic taxonomy, and camera permission regression tests.
- Phase 3: solver contract, solution steps, alternate methods, graph view, quality reports, and solver-version tests.
- Phase 4: Plus-like entitlement gates, checkout/restore, family/refund states, support cases, and billing tests.
- Phase 5: classroom/minor guardrails, academic-integrity review, accessibility math notation support, and privacy export/deletion.
- Phase 6: content/solver quality review, expert escalation queues, model/version rollback, and launch readiness review.

## Next Steps

- Continue Batch 05 readiness upgrades with wellness, fitness, and health specs if any follow-up evidence changes before implementation.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
