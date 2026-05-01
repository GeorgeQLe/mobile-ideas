# Google Family Link-Style Clone Spec

> Metadata
> - Inspiration app: Google Family Link
> - Category: Parental controls (platform-integrated)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, Google For Families help articles, Google Family Link public pages, Google privacy policy, and Google terms.
> - Manual verification blockers: supervised-account/device enrollment, app approval, purchase approval, location retrieval, school-time/downtime behavior, Chromebook/Fitbit/Galaxy Watch-style device coverage, child sign-in limitations, age-of-majority supervision stop flow, and push notifications require lawful test accounts/devices before one-for-one parity claims; child-safety lead, privacy lead, platform-integration owner, accessibility owner, and release owner must keep them behind acceptance-test blockers.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, illustrations, enrollment flows, proprietary identity APIs, app-store integrations, or Google service identifiers. Build only generic family-account supervision with lawful public APIs and original UX.

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
| Apple App Store | https://apps.apple.com/us/app/google-family-link/id1150085200 | Official iOS listing, screen time, app management, content filters, location, notifications, compatibility limitations, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.apps.kids.familylink | Official Android listing, screen-time limits, app controls, privacy settings, location, data safety | Verified 2026-05-01 |
| Set up parental controls | https://support.google.com/families/answer/16398726?hl=en | Child account creation, supervision, app/screen-time/location controls, requirements, regional/device limitations | Verified 2026-05-01 |
| Manage parental controls | https://support.google.com/families/answer/15077835?hl=en | Account settings, app/screen-time limits, supervised device location, content restrictions | Verified 2026-05-01 |
| Find and manage location | https://support.google.com/families/answer/7103413?hl=en | Child-device location setup, location settings, family places, one-device location behavior | Verified 2026-05-01 |
| Sign in on Android | https://support.google.com/families/answer/7158477?hl=en | Supervised Android behavior: Search, Activity, Play, Chrome, screen time, location, app limits, permissions | Verified 2026-05-01 |
| Sign in on iPhone/iPad | https://support.google.com/families/answer/9037996?hl=en | iOS limitations for supervised accounts, unsupported controls, child sign-in behavior | Verified 2026-05-01 |
| Add/manage supervision | https://support.google.com/families/answer/9055704?hl=en | Existing account supervision, child ability to stop supervision by age/region, requirements | Verified 2026-05-01 |
| Notifications | https://support.google.com/families/answer/7184159?hl=en | Parent notification categories and non-disableable notification caveats | Verified 2026-05-01 |
| Google Privacy Policy | https://policies.google.com/privacy | Data handling reference for account/product privacy obligations | Verified 2026-05-01 |
| Google Terms of Service | https://policies.google.com/terms | Account and service rules reference | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Public marketplace and support pages verify supervised child accounts, parent app, screen-time limits, school/downtime schedules, app blocking/limits, content restrictions for Play/Chrome/Search/YouTube-like services, location, family places, notifications, and account/data settings.
- V1 must implement a generic family-account model; it must not imply Google account, Play Store, Chrome, YouTube, Fitbit, or Android system-level integration unless using lawful public APIs.
- Supervising adults must meet age/region requirements and create or add supervision to child accounts with verifiable parental consent where required.
- Device enrollment must show child-facing disclosure, platform capability limitations, and a durable consent/audit record.
- App approval and purchase approval workflows must distinguish app-store billing/system limitations; V1 can model requests generically and integrate only with allowed app-store APIs.
- Time controls must include daily device limit, school/downtime windows, bedtime, app-specific limits, app blocking, always-allowed apps, and temporary unlocks.
- Location must require child-device location sharing setup, show stale/unavailable states, and support family places only with explicit permission.
- Activity reports must be aggregate, not raw content monitoring; no text/call/message surveillance is in scope.
- Child sign-in and supervision controls vary by platform; iOS-style limitation notices are required where controls do not apply.
- Age-of-majority/stop-supervision flows must respect regional rules and notify supervising adults where required without trapping the child indefinitely.
- Notifications must include app request, website request, activity-setting changes, place arrival/departure, and device/battery status where supported; some safety/security notifications may be non-disableable.
- Account privacy controls must include export/delete, activity settings, permission review, and child support access.
- School/education accounts are out of scope unless a FERPA/district-admin contract and role model are added.

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
- Adult creates school-time and downtime schedules and confirms always-allowed apps remain reachable.
- Child requests access to a blocked website or app; adult approves or denies from a notification.
- Adult sees location unavailable because the device is offline or not recently active.
- Child above the applicable age starts a stop-supervision flow; adult is notified and device behavior follows regional rules.
- Adult reviews a platform limitation notice for iPhone/iPad child sign-in.

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
| Device Compatibility | Platform and supported controls | device select | supported, limited | unsupported |
| School Time/Downtime | Scheduled restriction modes | time windows, allowed apps | active, paused | overlap |
| Website Requests | Blocked-site review | approve/deny | pending, empty | expired |
| Location Places | Family places and alerts | place add/edit | loaded | permission off |
| Supervision Stop | Age/region transition | child/adult confirm | pending, stopped | underage block |
| Account Data Settings | Activity/privacy controls | toggles | loaded | child help needed |

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
- `DeviceCapability`: platform, OS version, account type, supported controls.
- `ContentRestriction`: service/category, age band, rule state, source.
- `WebsiteRequest`: child, URL/category summary, decision, expiry.
- `AlwaysAllowedApp`: app id/category, rule, schedule interaction.
- `FamilyPlace`: child, geofence, alert recipients, location freshness.
- `NotificationSetting`: adult, child, category, mutable/non-mutable flag.
- `SupervisionPolicy`: region, child age, stop-supervision rules, parent notice requirements.

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
- `GET /device-capabilities`, `POST /devices/:id/enroll`, `DELETE /devices/:id`.
- `GET /content-restrictions`, `PATCH /content-restrictions`.
- `GET /website-requests`, `POST /website-requests/:id/decision`.
- `GET /family-places`, `POST /family-places`, `DELETE /family-places/:id`.
- `GET /notifications/settings`, `PATCH /notifications/settings`.
- `GET /supervision-policy?region=&age=`.

## Realtime, Push, And Offline Behavior

- Push for approval requests, time-limit events, bedtime reminders.
- Time-limit enforcement local on device; reconcile when online.
- Location check-in on-demand; background sampling requires explicit consent.
- Device rules must be cached locally where platform permits; server reconciliation handles delayed parent decisions.
- Parent notifications for requests and place events must avoid raw child content or exact address in previews by default.
- Location freshness must be shown explicitly when the child device is offline, powered off, not recently active, or permission-revoked.

## Permissions, Privacy, And Safety

- Child disclosure required at enrollment; cannot hide supervision.
- COPPA-style review required; no behavioral advertising on child data.
- Parental consent per region; verify adult status before allowing supervision.
- Age-of-majority transition: child gains control of own account.
- Export and deletion accessible.
- Anti-abuse: child can contact platform support independently.
- Launch owner: privacy lead, child-safety lead, accessibility owner.
- COPPA-style/verifiable parental consent and regional age-of-digital-consent review are launch-blocking.
- No covert monitoring: child-facing disclosure and account/device supervision state must remain visible where platform permits.
- Domestic-abuse/misuse model: do not allow adult partner monitoring, provide child/teen support path, and review stop-supervision flows for safety.
- No behavioral advertising or sale of child data; analytics must not include app names, URLs, precise location, or child identifiers.
- School/education account support requires separate FERPA, district-admin, and role-separation design.
- Support/admin access to location, account data, and child settings must be redacted by default and audit logged.

## Analytics And Monetization

- Privacy-safe events only: approval granted/denied, time rule changed, location checked, transition initiated.
- No app/content names beyond aggregate category metadata.
- Likely free product; if paid tier exists, original paywall copy and no child-data monetization.
- Monetization is out of scope for V1 unless a separate non-child-data subscription rationale is approved; product should assume free family supervision.

## Edge Cases

- Child attempts to bypass supervision.
- Device switched between supervised/unsupervised states.
- Multiple supervising adults with conflicting decisions.
- Child in one region, adult in another (jurisdictional).
- Transition near age of majority while purchases pending.
- Device shared with non-family user.
- Location permission revoked.
- Consent verification failure.
- Child device is iOS, so most supervised controls do not apply.
- Purchase approval uses alternate billing and cannot be intercepted.
- App update expands permissions after earlier approval.
- Child has multiple devices and only one location can be shown.
- Child uses school-managed or Workspace/Education account.
- Child stops supervision above applicable age; adult disputes transition.
- Parent disables notifications, but security-critical notification remains required.
- Family place geofence jitters or device is stale/offline.
- Always-allowed app conflicts with downtime.

## Test Plan

- Unit tests for approval state machine, time-rule evaluation, transition flow.
- Contract tests for all endpoints.
- Integration tests for enrollment, approval, transition.
- Privacy tests: disclosure, retention.
- Safety tests: child support access, anti-abuse.
- Offline tests.
- Accessibility tests.
- Manual verification: platform pairing, approvals, push.
- Device/platform tests for Android, iOS, Chromebook, wearable/Fitbit-like, and unsupported-device limitation states.
- Approval tests for app install, app update, in-app purchase, alternate billing, expired request, and duplicate decision.
- Time-rule tests for daily limits, school time, downtime, bedtime, always-allowed apps, app-specific limits, timezone travel, and parent override.
- Location tests for setup, permission revocation, offline/stale device, one-device selection, family places, and push alerts.
- Transition tests for age/region stop-supervision rules, adult notification, data handoff, and underage block.
- Privacy tests for export/delete, activity settings, analytics redaction, child support path, and no behavioral ads.
- Safety tests for no adult covert monitoring, domestic-abuse misuse, education-account exclusion, and consent verification.

## Acceptance Criteria

- Enrollment discloses supervision to child.
- Age-of-majority transition functional.
- COPPA-style review complete.
- Export and deletion accessible.
- Platform/device limitations are explicit and testable, especially iOS child sign-in and alternate billing limitations.
- Child-facing disclosure and stop-supervision policy are implemented before enabling device controls.
- Location and family-place features require explicit permission and show stale/unavailable states.
- Manual verification blockers are either resolved with dated evidence or remain launch-blocking feature flags.

## Open Questions

- Scope of platform integration feasible without proprietary APIs.
- Multi-adult supervising model.
- Verifiable parental consent vendor.
- Regional adult-verification methods.
- Which platform controls can be implemented lawfully without proprietary ecosystem APIs.
- Whether V1 includes purchase approvals or only app/website/time requests.
- Which regional age and parental-consent rules govern stop-supervision.
- Whether education/school accounts are permanently out of scope or planned in a separate FERPA phase.

## Build Plan

- Phase 1: adult/child auth, family, device enrollment, disclosure.
- Phase 2: approvals and time rules.
- Phase 3: location and activity.
- Phase 4: transitions and privacy center.
- Phase 5: safety, accessibility, legal review.
- Phase 6: manual verification, rollout.
- Phase 7: complete platform-policy, child-safety, COPPA/regional, domestic-abuse, education-account exclusion, and live-device verification before parity claims.

## Next Steps

- Resolve manual verification blockers for device enrollment, app/purchase approvals, location/family places, school-time/downtime, stop-supervision, and notification payloads.
- Define the lawful platform capability matrix and keep proprietary ecosystem integrations out of V1 unless explicit API contracts exist.
- Commission child-safety, COPPA/regional, domestic-abuse misuse, education-account/FERPA exclusion, and accessibility reviews.
