# Google Family Link-Style Clone Spec

> Metadata
> - Inspiration app: Google Family Link
> - Category: Parental controls (platform-integrated)
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: platform device-pairing APIs, app-approval flows, location retrieval, subscription/entitlement (if any), and push behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, and enrollment flows. No proprietary ecosystem identifiers or APIs.

## Overview

Build an original mobile parental-controls app inspired by Google Family Link: supervise a child's device account, approve app downloads and in-app purchases, set screen-time limits, bedtime, and view device location. Operates in a consented family-account model.

## Goals

- Pair a supervising adult account with a child account on a device.
- Approve app installs and optionally in-app purchases.
- Set screen-time daily limits, bedtime, and app-specific limits.
- View device location (opt-in, child-aware).
- Provide account-management (account deletion approaching age of majority).

## Non-Goals

- Do not imply integration with proprietary identity ecosystems (Google, Apple) beyond standard OAuth if explicitly allowed.
- Do not copy trademarks, logos, or brand copy.
- Do not enable covert monitoring.
- Do not target advertising to child data.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/google-family-link/id1150085200 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.kids.familylink | Features, data safety | Source discovery — pending exact URL verification |
| Family Link help | https://support.google.com/families | Feature how-to | Source discovery — pending exact URL verification |
| Family Link privacy | https://families.google/familylink/privacy | Data handling | Source discovery — pending exact URL verification |
| Family Link terms | https://families.google/terms | Account terms | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Supervising adult account creation and child-account creation with parental consent.
- Pairing flow where the child's device enrolls and sees a disclosure.
- App approval workflow: child requests install, adult approves/denies.
- Time limits: daily total, per-app, bedtime windows.
- Location check-in with child awareness.
- Activity reports (aggregate) without raw content exposure.
- Account lifecycle: transition at age of majority.

## Core User Journeys

- Adult creates family and creates child's account with parental consent.
- Adult enrolls child's device; child sees disclosure and signs in.
- Adult sets daily limit and bedtime.
- Child requests an app install; adult receives notification and approves.
- Child requests an in-app purchase; adult approves with amount cap.
- Adult checks device location.
- Adult unlocks extra time temporarily.
- Adult pauses the device.
- Child approaches age of majority; account transition flow begins.
- Adult removes supervision; device transitions to standard account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Adult account, family setup, consent | email, consent | new | underage adult |
| Child Setup | Create child account, enroll device | child info, device | pending, active | consent denied |
| Dashboard | Child status and alerts | none | loaded | offline |
| App Approvals | Pending requests | approve/deny | populated, empty | expired |
| Time Limits | Daily/bedtime/app | toggles, times | active, paused | overlap |
| Location | Last known location, check-in | refresh | loaded | permission off |
| Activity | Aggregate usage | range | loaded | sparse |
| Purchases | In-app purchase approvals | approve/deny | pending | expired |
| Account Transition | Age-of-majority flow | confirm | pending | reverted |
| Privacy Center | Export, delete | actions | idle | pending |
| Support | Contact | form | idle | unavailable |
| Settings | Account, notifications | toggles | loaded | signed-out |

## Data Model

- `AdultUser`, `ChildUser`, `Family`.
- `Device`: child, platform, enrolled-at, status.
- `Approval`: type (app/purchase), child, item, decision, timestamp.
- `TimeRule`: child, daily total, per-app overrides, bedtime window.
- `LocationCheckin`: child, coordinates, accuracy, timestamp.
- `UsageSummary`: child, date, per-app totals.
- `TransitionRequest`: child, status, initiated-at.
- `PrivacySettings`: retention, analytics opt-in.
- `AuditEvent`: consent, approvals, privacy, transitions.

## API And Backend Contracts

- `POST /auth/adult/session`, `POST /auth/child/register`.
- `POST /families`, `POST /families/:id/children`, `POST /families/:id/devices`.
- `GET /approvals`, `POST /approvals/:id/decision`.
- `GET /time-rules`, `PATCH /time-rules`.
- `GET /location?child=`, `POST /location/checkin`.
- `GET /usage?child=`.
- `POST /transitions/start`, `POST /transitions/:id/confirm`.
- `POST /data-export`, `DELETE /account`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Push for approval requests, time-limit events, bedtime reminders.
- Time-limit enforcement local on device; reconcile when online.
- Location check-in on-demand; background sampling requires explicit consent.

## Permissions, Privacy, And Safety

- Child disclosure required at enrollment; cannot hide supervision.
- COPPA-style review required; no behavioral advertising on child data.
- Parental consent per region; verify adult status before allowing supervision.
- Age-of-majority transition: child gains control of own account.
- Export and deletion accessible.
- Anti-abuse: child can contact platform support independently.
- Launch owner: privacy lead, child-safety lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: approval granted/denied, time rule changed, location checked, transition initiated.
- No app/content names beyond aggregate category metadata.
- Likely free product; if paid tier exists, original paywall copy and no child-data monetization.

## Edge Cases

- Child attempts to bypass supervision.
- Device switched between supervised/unsupervised states.
- Multiple supervising adults with conflicting decisions.
- Child in one region, adult in another (jurisdictional).
- Transition near age of majority while purchases pending.
- Device shared with non-family user.
- Location permission revoked.
- Consent verification failure.

## Test Plan

- Unit tests for approval state machine, time-rule evaluation, transition flow.
- Contract tests for all endpoints.
- Integration tests for enrollment, approval, transition.
- Privacy tests: disclosure, retention.
- Safety tests: child support access, anti-abuse.
- Offline tests.
- Accessibility tests.
- Manual verification: platform pairing, approvals, push.

## Acceptance Criteria

- Enrollment discloses supervision to child.
- Age-of-majority transition functional.
- COPPA-style review complete.
- Export and deletion accessible.

## Open Questions

- Scope of platform integration feasible without proprietary APIs.
- Multi-adult supervising model.
- Verifiable parental consent vendor.
- Regional adult-verification methods.

## Build Plan

- Phase 1: adult/child auth, family, device enrollment, disclosure.
- Phase 2: approvals and time rules.
- Phase 3: location and activity.
- Phase 4: transitions and privacy center.
- Phase 5: safety, accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Select verifiable-parental-consent provider.
- Commission child-safety review.
