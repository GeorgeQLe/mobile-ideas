# Ovia-Style Clone Spec

> Metadata
> - Inspiration app: Ovia
> - Category: Fertility, pregnancy, and parenting tracker
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public App Store and Play Store listings, public Ovia/Labcorp pages, privacy policy, and benefits-program descriptions.
> - Manual verification blockers: employer-benefits integration flows, clinical-content accuracy, HealthKit/Health Connect behavior, subscription/entitlement handling, and regional availability require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, medical content, illustrations, and prediction models. No proprietary health-research content or trademarked program names.

## Overview

Build an original mobile health-journey tracker inspired by Ovia's three-mode workflow: fertility tracking with cycle and ovulation predictions, pregnancy tracking with week-by-week logging, and parenting tracking with child growth and development milestones. Add health-content education and optional employer-benefit program linking without copying proprietary content or branding.

This spec is implementation-ready for a lawful V1 clone, with sensitive-health blockers requiring legal and clinical review before launch.

## Goals

- Track three journeys: fertility, pregnancy, and parenting, with clear transitions between them.
- Log daily symptoms, moods, measurements (BBT, weight), feedings, and milestones.
- Deliver original educational content, tailored to journey week/day, with "not medical advice" framing.
- Support optional employer-benefit program linking via secure, consented enrollment codes.
- Surface privacy controls, export, deletion, and post-Dobbs data-stance.

## Non-Goals

- Do not present the app as a medical device, diagnostic tool, or contraceptive.
- Do not copy proprietary clinical content, trademarked program names, or brand illustration style.
- Do not share health data with employers without explicit, revocable, and granular user consent.
- Do not use sensitive health data for advertising or third-party analytics.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/ovia-cycle-pregnancy-tracker/id570244389 | Unified cycle/pregnancy/postpartum/perimenopause app, Apple Health/Fitbit references, employer/health-plan access, privacy labels, age rating | Verified 2026-05-01 |
| Google Play listing | https://play.google.com/store/apps/details?id=com.ovuline.fertility | Android feature scope, unified Ovia journey model, data-safety section | Verified 2026-05-01 |
| Legacy Pregnancy listing | https://play.google.com/store/apps/details?id=com.ovuline.pregnancy | Migration notice from legacy pregnancy app into unified Ovia app | Verified 2026-05-01 |
| Ovia Health | https://www.oviahealth.com/ | Public product/benefits-program orientation and family-health journey scope | Verified 2026-05-01 |
| Ovia Privacy Policy | https://www.oviahealth.com/privacy-policy/ | Data handling, benefits-program privacy, rights, retention, user controls | Verified 2026-05-01 |
| Ovia Employers | https://www.oviahealth.com/for-employers/ | Employer/health-plan benefits model and program access context | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Three app modes with shared account and transitions: fertility, pregnancy, parenting (one per child).
- Daily logging with symptoms, BBT, ovulation test results, pregnancy symptoms, feeding, sleep, and diaper logs.
- Week-by-week pregnancy content and child-development articles with disclaimers.
- Optional employer-benefit enrollment gated by verification code and explicit consent.
- Data export and account deletion available from settings.
- Health integrations (HealthKit/Health Connect) optional and scoped.

## Core User Journeys

- New user selects journey, enters baseline data (last period, due date, or child DOB), and lands on the mode home.
- User logs daily signals and reads the day's original educational content.
- User transitions from fertility to pregnancy after a positive test and confirms due date.
- User transitions from pregnancy to parenting at birth and sets up child profile.
- User links an employer-benefit program via code, confirms data-sharing scope, and can revoke.
- User reviews history in charts and export data.
- User reaches sensitive content (loss, complications) and sees gentle copy and resources.
- User deletes account and confirms data removal.
- User manages notification preferences for journey reminders.
- User switches locale and sees translated educational content.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Onboarding | Journey selection, age gate | journey, baseline dates | new, returning | blocked region |
| Journey Home | Today's summary, content | none | loaded, empty | offline |
| Daily Log | Multi-category logging | symptoms, measurements | empty, partial, saved | validation error |
| Content Article | Educational copy with disclaimers | article id | loaded | unavailable |
| Charts And History | Time-series of logs | range, metric | populated | sparse data |
| Child Profile | Parenting mode profile | child data, milestones | empty, populated | duplicate child |
| Benefits Link | Link employer benefit | code, consent | unlinked, linked | invalid code |
| Privacy Center | Sync, export, delete | toggles | local, synced | delete pending |
| Subscription | Plans, restore | plan, restore | free, paid | restore fail |
| Support And Safety | Contact, crisis resources | form | idle, submitted | unavailable |
| Notifications | Reminder preferences | toggles | granted, denied | OS-level off |
| Settings | Account, locale, data | toggles | loaded | signed-out |

## Data Model

- `User`: identity, age gate, locale, region, consent state.
- `JourneyProfile`: journey (fertility/pregnancy/parenting), baseline dates, active flag.
- `ChildProfile`: name initials, DOB, sex, feeding plan, milestones.
- `LogEntry`: date, category, value, measurement type, notes.
- `ContentItem`: id, journey, week/day, title, body, disclaimers.
- `BenefitLink`: employer code, scope, consented-at, revoked-at.
- `HealthIntegration`: provider, scopes, last sync.
- `PrivacySettings`: sync, analytics opt-in, benefit-sharing scopes.
- `Entitlement`: plan, platform, state.
- `Export`: status, archive key.
- `AuditEvent`: consent, deletion, export, benefits events.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`: auth.
- `GET /journeys`, `POST /journeys`, `PATCH /journeys/:id`: journey lifecycle.
- `POST /logs`, `GET /logs?range=`, `PATCH /logs/:id`, `DELETE /logs/:id`.
- `GET /content?journey=&week=`: content feed.
- `POST /benefits/link`, `DELETE /benefits/:id`: benefit lifecycle with explicit consent record.
- `GET /settings/privacy`, `PATCH /settings/privacy`.
- `POST /data-export`, `GET /data-export/:id`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /integrations/health/connect`, `DELETE /integrations/health/:id`.
- `POST /support/cases`: support lifecycle.

## Realtime, Push, And Offline Behavior

- Offline-first logging; sync opportunistic.
- Journey reminders via opt-in push; content cannot include clinical detail in payload.
- Benefit-link state changes trigger server-side audit entries.
- Local DB encrypted at rest.

## Permissions, Privacy, And Safety

- Sensitive health data excluded from advertising and third-party analytics.
- Employer benefit integration requires granular scope consent and revocation.
- Employer, health-plan, and Labcorp-affiliated program surfaces must separate care navigation, benefits eligibility, and user-entered health logs.
- Benefits administrators receive only aggregate or explicitly consented data; no pregnancy, fertility, symptom, child, or location details leave the account without granular consent.
- Apple Health, Fitbit, and HealthKit/Health Connect-style integrations require scope-by-scope consent, revocation, duplicate handling, and data-origin labeling.
- Post-Dobbs: minimize retention; publish LEO response policy; support data-export and deletion.
- Clinical-content disclaimers; crisis and loss resources readily available.
- COPPA-style review required before launch for any child-account or under-13 data handling in parenting mode.
- Minors as users gated behind age-appropriate flows per region.
- Launch owner: privacy lead, medical reviewer, accessibility owner.

## Analytics And Monetization

- Track privacy-safe events only: journey created, log saved (category only), content viewed (id only), benefit linked, export/delete requested.
- No symptom content in analytics.
- Free tier for core tracking; paid tier for advanced features; original paywall copy.
- Benefit-program users may have elevated features funded by employer with explicit disclosure.

## Edge Cases

- Loss/miscarriage transition with gentle copy.
- Multiple simultaneous child profiles.
- Employer benefit expiration mid-pregnancy.
- Conflicting data from HealthKit and manual logs.
- Locale switch mid-pregnancy with non-translated content.
- Account deletion with benefit link active.
- Sync conflict across devices.
- Regional legal constraint on data retention.
- Employer-benefit data-sharing scope change without user re-consent.
- Legacy Ovia Pregnancy migration imports duplicate journey records; user reviews before merge.
- User loses employer eligibility mid-pregnancy; core export/delete and safety resources remain available.
- Fitbit/Apple Health weight or sleep values conflict with manual pregnancy logs.
- User transitions through loss/postpartum/perimenopause; content and notifications stop insensitive reminders.

## Test Plan

- Unit tests for journey transitions and prediction baseline calculations.
- Contract tests for all endpoints.
- Integration tests for daily log, export, deletion, benefit link.
- Privacy tests: analytics redaction, employer data-sharing scope enforcement.
- Billing tests across platforms.
- Offline tests: log, reconcile.
- Accessibility tests: dynamic type, screen reader, color contrast.
- Safety tests: loss copy, crisis resources.
- Manual verification: benefit enrollment, HealthKit integration.
- Partner-program tests for employer/health-plan eligibility, consent revocation, aggregate-only reporting, and admin access boundaries.
- Migration tests from legacy pregnancy app accounts into unified Ovia profiles.

## Acceptance Criteria

- Three journey modes functional with transitions.
- Privacy controls, export, and deletion accessible and audited.
- Employer benefit link fully consent-driven and revocable.
- Legal and medical review complete.
- Manual verification blockers resolved or feature-flagged.
- Exact source links are current or refreshed before implementation starts.
- Benefits-program, HealthKit/Fitbit, pregnancy, fertility, child profile, migration, and clinical-content flows are launch-flagged until partner/manual verification passes.

## Open Questions

- Scope of V1 benefit-program integrations and verification method.
- Which regional regulators require pre-launch review (HIPAA applicability via benefits partners)?
- Minimum supported age and parental-consent flows.
- Should parenting mode support child device account linkage (COPPA review required)?

## Build Plan

- Phase 1: scaffolding, onboarding, journey selection, daily log, local DB.
- Phase 2: content library, charts, child profile, notifications.
- Phase 3: privacy center, export, deletion, encrypted sync.
- Phase 4: benefit-link integration, subscription and entitlements.
- Phase 5: safety/crisis flows, accessibility, legal/medical review.
- Phase 6: manual verification, regional rollout.

## Next Steps

- Commission clinical-content and post-Dobbs legal review.
- Define employer/health-plan benefit data-sharing architecture, migration policy, and regional launch matrix.
- Complete benefits enrollment, HealthKit/Fitbit, migration, export/delete, journey transition, and privacy manual verification before parity claims.
