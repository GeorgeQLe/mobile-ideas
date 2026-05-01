# Qustodio-Style Clone Spec

> Metadata
> - Inspiration app: Qustodio
> - Category: Parental controls
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, Qustodio product pages, help articles, privacy policy, and terms.
> - Manual verification blockers: platform-specific device management profiles, VPN/content-filter behavior, iOS child extra-time flow, Android/iOS app blocking differences, location/geofence behavior, calls/SMS/WhatsApp/social monitoring availability, subscription restore, and push payloads require lawful test devices/accounts before one-for-one parity claims; child-safety lead, privacy lead, security lead, billing owner, and accessibility owner must keep them behind acceptance-test blockers.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, illustrations, detection rules, feature names, app/category databases, or help content. Do not reuse proprietary content filters, AI alert models, app taxonomy, or marketing copy.

## Overview

Build an original mobile parental-control app inspired by Qustodio: control app and website access on a child's device, enforce screen-time schedules, view activity reports, and manage multiple children across phones, tablets, and computers. Transparency-first with visible child disclosure.

## Goals

- Per-device child profiles with app/site allow/block and time limits.
- Weekly schedules and daily limits per app category.
- Activity reports showing usage patterns (no raw content exposure).
- Multi-device and multi-OS management within one parent account.
- Consent-first: child always sees that the device is monitored.

## Non-Goals

- Do not enable covert monitoring.
- Do not copy proprietary brand, detection lists, or feature names.
- Do not share child data with advertisers.
- Do not operate as a general-purpose surveillance tool.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/qustodio-parental-control-app/id878680506 | Official iOS listing, parental-control positioning, age rating, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.qustodio.family.parental.control.app.screentime | Official Android parent app listing, screen time, app blocking, location, AI alerts, data safety | Verified 2026-05-01 |
| Product overview | https://www.qustodio.com/en/parental-control/ | Screen-time limits, web filtering, family locator, cross-platform support | Verified 2026-05-01 |
| App blocker | https://www.qustodio.com/en/app-blocker/ | App blocking, platform compatibility, premium feature matrix, location/calls/SMS references | Verified 2026-05-01 |
| Usage tracking help | https://help.qustodio.com/hc/en-us/articles/360005216297-How-does-Qustodio-track-usage-on-a-device | Screen time vs activity time, iOS limitations, reporting caveats | Verified 2026-05-01 |
| Child app visibility help | https://help.qustodio.com/hc/en-us/articles/27037395098642-What-can-my-child-see-and-do-with-Qustodio | Child-visible dashboard, extra-time requests, blocker screens, digital wellbeing resources | Verified 2026-05-01 |
| Qustodio privacy policy | https://www.qustodio.com/en/privacy/ | Data handling, child/family privacy posture | Verified 2026-05-01 |
| Qustodio terms | https://www.qustodio.com/en/terms/ | Account, subscription, and service terms | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and product pages verify screen-time limits, app blocking, web filtering, family locator/GPS, reports, AI-powered search/message alerts, social/media monitoring references, and cross-platform coverage.
- Parent account must support multiple child profiles and multiple devices, with platform capability flags per device.
- Child-device enrollment must show disclosure, an ongoing child-visible app/state, and platform-specific permission explanations.
- Rules must support app/category allow/block, website/category filtering, daily limits, restricted times, routines, pause/lock, and extra-time overrides.
- Reports must distinguish screen time from activity time and explain platform limitations, especially iOS-specific reporting constraints.
- Child-facing UX must show remaining time/activity where supported, blocked-content screens, time-limit alerts, extra-time requests, and age-appropriate wellbeing resources.
- Location/geofence features must require explicit location permission, child disclosure, retention limits, and support for arrival/departure alerts only after manual verification.
- Calls/SMS/social/message monitoring is high-risk and platform-limited; V1 must gate it behind explicit legal/platform verification and child-safety review.
- AI/search/message alerts must use original models and categories; do not copy Qustodio detection rules or content taxonomy.
- Subscription gates must be server-authorized and original; plan names, prices, trial copy, and feature matrix copy must not be copied.
- Additional-parent/guardian support must include role separation, audit logs, and conflict resolution for rule changes.
- Export/delete must cover parent account, child profile, reports, alerts, device events, location data, and support cases.

## Core User Journeys

- Parent creates account and adds a child.
- Parent enrolls child's device; disclosure screen confirms.
- Parent sets daily time limit and category blocks.
- Parent reviews weekly report.
- Parent receives alert for blocked-content attempts.
- Parent locks the device immediately.
- Child requests more time; parent approves/denies.
- Parent removes a child profile.
- Parent switches child to older age preset.
- Parent exports activity reports.
- Child sees remaining daily limit and requests extra time from the child app.
- Parent pauses internet/device access immediately, then schedules bedtime restrictions.
- Parent reviews a platform-limitation notice when iOS reports less detail than Android.
- Parent creates a saved place and receives an arrival/departure notification.
- Child opens wellbeing resources after a blocked search or app-install prompt.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Parent account, child setup | name, age | new | region block |
| Device Enrollment | Add device, disclosure | enroll code | pending, active | revoked |
| Dashboard | Children summary | none | populated | offline |
| Rules | App/site allow/block | toggles | populated | conflict |
| Schedules | Daily/weekly time rules | timeblocks | active, paused | overlap |
| Reports | Usage summaries | range | loaded | sparse |
| Alerts | Blocked attempts, events | none | unread, read | false positive |
| Requests | Child time-extension requests | decision | pending, decided | expired |
| Subscription | Plans, restore | plan | free, paid | restore fail |
| Privacy Center | Export, delete | actions | idle | pending |
| Support | Contact, false-alert report | form | idle | unavailable |
| Settings | Account, notifications | toggles | loaded | signed-out |
| Child App Dashboard | Remaining time, blocked state, wellbeing resources | request, view | active, limited | app inaccessible |
| Routines | Named school/bedtime/leisure rule sets | schedule, apps | active, paused | overlap |
| Location Places | Saved geofences and history | place add/edit | loaded | permission off |
| Platform Capabilities | Device support matrix | device select | supported, limited | unsupported OS |
| Additional Guardians | Invite and role permissions | invite, role | pending, active | custody dispute |

## Data Model

- `ParentUser`, `ChildProfile`.
- `Device`: child, platform, enrolled-at, status.
- `Rule`: child/device, type (app/site/category), state, override expiry.
- `Schedule`: child/device, time windows, daily/weekly quota.
- `UsageSummary`: child/device, date, per-category totals.
- `Alert`: child, type, timestamp, detail summary.
- `Request`: child, type, decision, timestamp.
- `PrivacySettings`: analytics opt-in, retention window.
- `Entitlement`: plan, platform.
- `AuditEvent`: enrollment, rule change, decision, privacy.
- `Routine`: child/device, name, time windows, allowed categories, priority.
- `DeviceCapability`: platform, OS version, enforcement/reporting feature flags.
- `LocationPlace`: child, geofence, alert recipients, retention state.
- `WellbeingResource`: age band, topic, locale, review owner.
- `GuardianRole`: parent, child scope, permission set, custody/dispute flags.

## API And Backend Contracts

- `POST /auth/parent/session`, `DELETE /auth/session`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `POST /devices`, `DELETE /devices/:id`.
- `GET /rules`, `POST /rules`, `PATCH /rules/:id`, `DELETE /rules/:id`.
- `GET /schedules`, `POST /schedules`, `PATCH /schedules/:id`.
- `GET /usage?child=&range=`.
- `GET /alerts`, `PATCH /alerts/:id/read`.
- `GET /requests`, `POST /requests/:id/decision`.
- `POST /devices/:id/lock`, `POST /devices/:id/unlock`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /support/cases`.
- `GET /device-capabilities`, `POST /devices/:id/capability-refresh`.
- `GET /routines`, `POST /routines`, `PATCH /routines/:id`.
- `GET /locations/places`, `POST /locations/places`, `DELETE /locations/places/:id`.
- `GET /wellbeing-resources?age=&topic=`.
- `POST /guardians/invites`, `PATCH /guardians/:id`.

## Realtime, Push, And Offline Behavior

- Rules pushed to device agents; local enforcement with offline cache.
- Alerts via push with category/severity only.
- Usage uploads batched.
- Offline enforcement continues; reconciliation on reconnect.
- Child extra-time requests and parent decisions use push plus server reconciliation; expired decisions must be harmless.
- Reporting uploads are batched and may be delayed by OS restrictions; dashboard must show freshness.
- VPN/profile/device-management failures must surface visible degraded states to parent and child.

## Permissions, Privacy, And Safety

- Child disclosure on device required; monitoring icon visible.
- COPPA-style review required; no behavioral ads against child data.
- No raw content scanning by default; usage aggregated by app/site category.
- Retention configurable; data exportable and deletable.
- Domestic-abuse threat model: prevent use on non-consenting adult devices.
- Launch owner: privacy lead, child-safety lead, security lead, accessibility owner.
- No covert monitoring: child app/disclosure state is required wherever platform permits, and support must not provide stealth setup guidance.
- COPPA-style and regional child-data review is launch-blocking; no behavioral ads or sale of child data.
- Domestic-abuse/misuse review must block installation on non-consenting adult devices and support custody/guardian disputes.
- Calls/SMS/social/message monitoring requires explicit regional legal review, platform-policy review, and child-safety approval.
- Support tooling must redact URLs, app names, message snippets, contact identifiers, location traces, and child identifiers by default.

## Analytics And Monetization

- Privacy-safe events only: device enrolled, rule changed, schedule set, report viewed, subscription events.
- No app/site names in analytics by default; aggregate by category.
- Subscription product with original paywall copy; free trial optional.
- Analytics can include rule changes, report views, alert categories, and device health codes, but not raw URLs, searches, app names, message content, phone numbers, or location coordinates.

## Edge Cases

- Platform API change breaking enforcement.
- Child removes device agent; dashboard shows "not active."
- Multi-user OS accounts on shared device.
- Time zone changes affecting schedules.
- Conflicting rules across multiple parents.
- Child aging out; transition to adult.
- Device replaced; re-enrollment.
- VPN/Wi-Fi bypass attempts.
- Region legality of monitoring varies.
- iOS reports screen time differently than Android, causing parent confusion.
- Child requests extra time while parent is offline.
- Two guardians set conflicting routines.
- Saved place geofence jitters near school/home boundaries.
- VPN/profile is disabled by OS update.
- Android calls/SMS monitoring is unsupported in a launch region.
- Wellbeing resource opens during a high-risk search and requires region-specific crisis copy.
- Child ages out or asks to remove supervision.

## Test Plan

- Unit tests for rule evaluation, schedule enforcement, quota rollover.
- Contract tests for all endpoints.
- Integration tests for enrollment, alerts, requests.
- Privacy tests: redaction, retention.
- Safety tests: disclosure.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Manual verification: platform enforcement, push, subscription.
- Platform capability tests for Android, iOS, Windows, macOS, Chromebook, Kindle/tablet variants where supported.
- Child-app tests for disclosure, remaining-time display, extra-time requests, blocked-content screens, and wellbeing resources.
- Location tests for permission revocation, geofence jitter, history retention, and arrival/departure push.
- Guardian tests for role permissions, conflicting rules, custody/dispute flags, and audit logs.
- Privacy tests for redacted analytics, export/delete, retention expiry, support redaction, and no child-data advertising.
- Safety tests for no adult covert monitoring, child support path, age transition, and regional legality gates.

## Acceptance Criteria

- Device enrollment discloses monitoring to child.
- Rules and schedules enforce offline.
- Reports avoid raw content exposure.
- COPPA-style review complete.
- Export and deletion accessible.
- Platform limitations are visible and testable, especially screen time vs activity time.
- Child-visible disclosure, extra-time requests, and blocker screens are implemented where platform permits.
- Calls/SMS/social/message monitoring remains disabled until legal/platform/manual verification gates close.
- Manual verification blockers are either resolved with dated evidence or remain launch-blocking feature flags.

## Open Questions

- Platform capabilities per OS in V1.
- Scope of content-category filter.
- Multi-parent coordination model.
- Regional regulator review list.
- Which operating systems and device types are in V1 and what features each supports.
- Whether V1 includes calls/SMS/social monitoring or defers to app/site/time controls only.
- Which wellbeing/crisis resources are approved for each launch region.
- How custody disputes and additional guardian invitations are verified.

## Build Plan

- Phase 1: parent/child auth, enrollment, disclosure.
- Phase 2: rules and schedules enforcement.
- Phase 3: reports and alerts.
- Phase 4: subscription, privacy center.
- Phase 5: safety, accessibility, legal review.
- Phase 6: manual verification, rollout.
- Phase 7: complete platform-policy, child-safety, COPPA/regional, domestic-abuse, and device-management reviews before parity claims.

## Next Steps

- Resolve manual verification blockers for device management, VPN/content filtering, extra-time requests, location/geofences, subscription restore, and push payloads.
- Define the V1 platform capability matrix and disable unsupported monitoring features by default.
- Commission child-safety, COPPA/regional, domestic-abuse misuse, custody, platform-policy, and accessibility reviews.
