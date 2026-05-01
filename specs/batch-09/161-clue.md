# Clue-Style Clone Spec

> Metadata
> - Inspiration app: Clue
> - Category: Period and cycle tracker
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store and Play Store listings, public Clue support/privacy/terms pages, and public reproductive-health app disclosures.
> - Manual verification blockers: live cycle-prediction algorithm behavior, subscription purchase/restore flows, health-data integrations with HealthKit/Health Connect, and regional availability require hands-on verification before one-for-one parity claims.
> - Legal scope: functional parity only; original code, brand, copy, iconography, sample data, illustrations, educational content, and prediction models. No proprietary health-research content or trademarked feature names.

## Overview

Build an original mobile menstrual-cycle tracker inspired by the Clue workflow: daily logging of period flow, symptoms, moods, and intimate-health signals; cycle predictions; fertile-window estimates; birth-control and conception modes; and privacy-first data handling aligned with current post-Dobbs expectations.

The clone must not copy brand assets, research-backed content text, trademarked cycle-phase names, or proprietary prediction models. It should present comparable user jobs with original copy, original educational material, and transparent algorithmic explanations.

This spec is implementation-ready for a lawful V1 clone, with sensitive-health blockers flagged until manual verification and legal/medical review.

## Goals

- Let users log period days, flow intensity, symptoms, moods, intimate health, sleep, and custom tags.
- Predict next period, fertile window, and PMS window with confidence ranges and clear explanations.
- Support multiple modes: general tracking, trying to conceive, avoiding pregnancy (non-contraceptive), pregnancy, and perimenopause.
- Keep privacy controls surfaced: local-first storage, opt-in cloud sync, per-category sharing, export, and account deletion.
- Provide educational content on cycles, symptoms, and health with explicit "not medical advice" framing.

## Non-Goals

- Do not present the app as a medical device, diagnostic tool, or contraceptive.
- Do not copy proprietary research content, trademarked phase names, or brand illustration style.
- Do not disclose user cycle data to law-enforcement requests without lawful process and documented user notice where permitted.
- Do not use sensitive health data for advertising or third-party analytics.
- Do not target users under the minimum supported age without parental-consent flows and a regional review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/clue-period-cycle-tracker/id657189652 | Category, cycle/fertility/perimenopause feature scope, privacy labels, age rating, non-contraceptive/medical disclaimer | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.clue.android | Feature summary, period/ovulation/PMS predictions, data-safety section, Android compatibility | Verified 2026-05-01 |
| Clue Support Center | https://support.helloclue.com/hc/en-us | Account, tracking, predictions, subscription, export/delete, and troubleshooting support | Verified 2026-05-01 |
| Clue Privacy Policy | https://www.helloclue.com/privacy | Data minimization, GDPR posture, user rights, sharing, retention, deletion | Verified 2026-05-01 |
| Clue Terms | https://www.helloclue.com/terms | Service scope, subscriptions, user obligations, non-medical-use framing | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- App must work primarily offline with optional encrypted cloud sync.
- Logging must cover at least: period flow, pain, moods, energy, sleep, sex, discharge, digestion, skin, and custom categories.
- Prediction engine must communicate uncertainty and adapt as more cycles are logged.
- Modes for pregnancy, trying to conceive, perimenopause, and birth control must alter defaults for prompts and predictions.
- Health app integrations (HealthKit, Health Connect) must be opt-in, scoped per data type, and revocable.
- Data export must be accessible in settings and deliver a machine-readable archive.
- Account deletion must remove sensitive data promptly and provide confirmation.

## Core User Journeys

- New user installs app, chooses mode, enters last-period date or "unknown," sets privacy preferences, and lands on a calendar home.
- Returning user logs today's flow and symptoms with a fast tap sheet and sees updated predictions.
- User switches from "general tracking" to "trying to conceive" and sees fertile-window predictions with explanation.
- User enters pregnancy mode, logs due date, and sees content transition to pregnancy logging.
- User reviews cycle history in calendar or chart view, filters by symptom, and exports CSV/JSON.
- User enables HealthKit/Health Connect sync for menstrual flow and reviews which categories are shared.
- User opts into cloud sync, signs in, and confirms data is end-to-end encrypted with a passphrase.
- User requests account deletion and receives confirmation; local data is wiped after confirmation.
- User reaches a paywalled advanced analytics view and sees original entitlement copy.
- User reports a pregnancy-loss or unusual bleeding event and receives gentle, non-diagnostic resource copy with crisis links.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Onboarding | Mode selection, age gate, privacy primer | mode, last-period date, privacy toggles | new, returning, underage-blocked | region blocked, offline |
| Calendar Home | Today's status, predictions, quick log | date selection, quick-add log | logged, predicted, empty | sync failing, prediction low-confidence |
| Daily Log Sheet | Multi-category logging | flow, pain, mood, sleep, sex, notes | empty, partial, saved | validation error, sync conflict |
| Cycle History | Past cycles and charts | range selector, category filter | populated, sparse, empty | incomplete cycles, edited history |
| Predictions Detail | Explain next period, fertile window | none | confident, low-confidence, disabled | insufficient data |
| Mode Settings | Switch tracking mode | mode, due date | active, switching | conflict with recent logs |
| Health Sync | Manage HealthKit/Health Connect | per-type toggles | connected, disconnected, partial | permission revoked |
| Privacy Center | Local-first, sync, passphrase, export, delete | toggles, export action | local-only, synced | export failure, delete pending |
| Subscription | Plans and restore | plan, restore | free, paid, expired | platform mismatch |
| Education Library | Articles and FAQs | category | list, article | offline, unavailable |
| Support And Safety | Contact, report, crisis resources | form, links | idle, submitted | unavailable |

## Data Model

- `User`: identity (optional), age gate, locale, region, consent state, passphrase-hash reference.
- `DeviceSession`: device id, platform, app version, sync state.
- `CycleProfile`: tracking mode, average cycle length, luteal-phase estimate, perimenopause flag.
- `CycleRecord`: start date, end date, duration, skipped flag, notes.
- `LogEntry`: date, category, value, intensity, custom tags, edited-at.
- `Prediction`: type (period, fertile window, PMS), start, end, confidence, model version.
- `Mode`: key (general, ttc, avoiding, pregnancy, perimenopause), activated-at, parameters.
- `HealthIntegration`: provider, scopes, last sync, errors.
- `PrivacySettings`: cloud-sync enabled, passphrase set, analytics opt-in, health-sync map.
- `Entitlement`: plan key, platform, renewal/expiry state.
- `Export`: requested-at, status, delivery target, archive key.
- `AuditEvent`: privacy, mode change, deletion, export, integration events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`: optional account authentication.
- `POST /sync/bundles`: encrypted client-side bundle upload keyed by device and passphrase-derived key.
- `GET /sync/bundles?cursor=`: encrypted bundle retrieval.
- `POST /cycles`, `PATCH /cycles/:id`, `DELETE /cycles/:id`: cycle records (server stores ciphertext in E2E mode).
- `POST /logs`, `PATCH /logs/:id`, `DELETE /logs/:id`: daily log entries.
- `POST /predictions/request`: optional server-assisted prediction when E2E disabled.
- `GET /settings/privacy`, `PATCH /settings/privacy`: privacy toggles.
- `POST /data-export`, `GET /data-export/:id`: export lifecycle.
- `DELETE /account`: deletion with verification token.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`: billing lifecycle.
- `POST /support/reports`: support and feedback submission.
- `POST /integrations/health/connect`, `DELETE /integrations/health/:id`: health integration lifecycle.

## Realtime, Push, And Offline Behavior

- App must be fully functional offline; all logging and predictions run locally.
- Sync is opportunistic with retries, conflict resolution favoring last-writer-wins with an audit trail.
- Push notifications are opt-in for cycle reminders, log prompts, and fertile-window alerts.
- Notification payloads must never include symptom content; only generic reminders.
- Local database must be encrypted at rest with OS keystore.
- Guest mode stores data only on device; deleting app wipes data.

## Permissions, Privacy, And Safety

- Health, notifications, and optional Bluetooth (for future wearables) permissions are requested only at point of use.
- Sensitive-health data is never used for advertising or shared with third-party analytics.
- Post-Dobbs stance: minimize retention of location/IP metadata; publish law-enforcement-response policy; support passphrase-protected E2E sync.
- Minor users under the regional minimum age are gated with parental consent flows; require regional review before launch.
- "Not medical advice" disclosures appear in onboarding, predictions detail, and sensitive topics (pregnancy-loss, unusual bleeding).
- Crisis resources accessible from support and safety screen (self-harm, domestic violence, reproductive-health hotlines by region).
- Support tooling must redact log content; raw data access requires elevated approval and audit.
- Launch owner: privacy lead, medical-content reviewer, security lead for E2E sync, accessibility owner.

## Analytics And Monetization

- Track privacy-safe events only: onboarding completed, log saved (category key only), mode changed, prediction viewed, sync enabled, export requested, deletion requested.
- No symptom/flow/sex/sleep content may enter analytics payloads.
- Free tier covers core tracking and predictions; paid tier may include advanced analytics, data themes, and extended history.
- Paywall copy is original; no trademarked plan names.
- App-store subscription reconciliation via server webhooks with retry.

## Edge Cases

- User logs backward across multiple cycles; predictions must recompute.
- Irregular cycles beyond typical range; predictions show low-confidence state.
- Pregnancy-loss transition from pregnancy mode back to cycle mode with gentle copy.
- Perimenopause mode with skipped cycles and variable length.
- User under age minimum; gate registration.
- Account deletion while paid subscription active.
- Health sync permission revoked mid-session.
- Sync conflict when device offline for weeks.
- Passphrase forgotten; define recovery or graceful data-loss acknowledgment.
- Regional law change requiring expanded retention control.
- User requests deletion while pregnant, in TTC mode, or with HealthKit/Health Connect sync enabled.
- Law-enforcement or civil-process request arrives; app follows published transparency and user-notice process where permitted.
- Fertile-window prediction conflicts with ovulation test logs; app explains uncertainty instead of overriding user data silently.
- User enables advertising attribution; sensitive cycle, sex, pregnancy, fertility, and location context remain excluded.

## Test Plan

- Unit tests for prediction engine, mode transitions, and conflict resolution.
- Contract tests for all API endpoints and encrypted sync envelopes.
- Integration tests for log-save, prediction-refresh, export, and deletion.
- Privacy tests: analytics redaction, no sensitive data in push, passphrase wipe.
- Health integration tests: permission grant/revoke, partial-scope, sync failure.
- Billing tests: free/paid/expired/refund/restore across platforms.
- Offline tests: full flow offline, reconnect, conflict merges.
- Accessibility tests: dynamic type, screen reader labels on symptom chips, color contrast on charts, reduced motion.
- Safety tests: crisis-resource visibility, sensitive-topic copy review, not-medical-advice disclosures.
- Manual verification: native device walkthrough, subscription purchase/restore, HealthKit/Health Connect behavior.
- Legal/privacy review tests for reproductive-health data retention, subpoenas, user notice, and regional restrictions.
- Medical-content tests for pregnancy loss, unusual bleeding, contraception disclaimers, fertility uncertainty, and professional-care routing.

## Acceptance Criteria

- V1 can run fully offline with predictions and logging.
- Optional E2E cloud sync with passphrase is implemented and tested.
- All sensitive-health data excluded from analytics and push payloads by default.
- Export and account deletion accessible from settings with audit events.
- All launch-blocking safety disclosures and crisis resources are present.
- Legal and medical-content reviewer sign-off completed before launch.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Reproductive-health data, HealthKit/Health Connect, subscriptions, predictions, and regional privacy controls are launch-flagged until legal/medical/manual verification passes.

## Open Questions

- Which regions require explicit pre-launch regulatory review (EU GDPR, US state laws, UK, Canada)?
- Will V1 support wearable integrations for basal body temperature, or defer?
- Which prediction model baseline is licensed or built in-house?
- What is the minimum supported age by region, and what parental-consent flow is required?
- Will the app publish a transparency report for law-enforcement requests?

## Build Plan

- Phase 1: scaffold app shell, onboarding, mode selection, local database, calendar home, and daily log sheet.
- Phase 2: prediction engine, cycle history, charts, and education library.
- Phase 3: privacy center, export, account deletion, encrypted cloud sync.
- Phase 4: health integrations, notifications, subscription and entitlements.
- Phase 5: safety/crisis-resource flows, accessibility pass, legal/medical review.
- Phase 6: manual verification, regional rollout gating, and monitoring.

## Next Steps

- Commission medical-content review and post-Dobbs legal review.
- Define E2E sync architecture, passphrase-recovery policy, transparency-report process, and regional launch matrix.
- Complete native device, subscription, HealthKit/Health Connect, export/delete, prediction, and privacy manual verification before parity claims.
