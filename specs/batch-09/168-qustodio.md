# Qustodio-Style Clone Spec

> Metadata
> - Inspiration app: Qustodio
> - Category: Parental controls
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: platform-specific device management, VPN/content-filter behavior, subscription/entitlement, and push behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, detection rules, and feature names. No proprietary content reuse.

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
| Apple App Store | https://apps.apple.com/us/app/qustodio-parental-control-app/id878680506 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.qustodio.qustodioapp | Features, data safety | Source discovery — pending exact URL verification |
| Qustodio help center | https://help.qustodio.com | Feature how-to | Source discovery — pending exact URL verification |
| Qustodio privacy policy | https://www.qustodio.com/en/privacy | Data handling | Source discovery — pending exact URL verification |
| Qustodio terms | https://www.qustodio.com/en/terms | Account rules | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Parent account with multiple child profiles, each with one or more devices.
- Device enrollment with explicit child-disclosure screen; icon visible on device.
- Rules: app categories allowed/blocked, site filter by category, time limits per day/week.
- Reports with usage summaries by category and app.
- Remote lock/bedtime.
- Age-based defaults with customization.

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

## Realtime, Push, And Offline Behavior

- Rules pushed to device agents; local enforcement with offline cache.
- Alerts via push with category/severity only.
- Usage uploads batched.
- Offline enforcement continues; reconciliation on reconnect.

## Permissions, Privacy, And Safety

- Child disclosure on device required; monitoring icon visible.
- COPPA-style review required; no behavioral ads against child data.
- No raw content scanning by default; usage aggregated by app/site category.
- Retention configurable; data exportable and deletable.
- Domestic-abuse threat model: prevent use on non-consenting adult devices.
- Launch owner: privacy lead, child-safety lead, security lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: device enrolled, rule changed, schedule set, report viewed, subscription events.
- No app/site names in analytics by default; aggregate by category.
- Subscription product with original paywall copy; free trial optional.

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

## Acceptance Criteria

- Device enrollment discloses monitoring to child.
- Rules and schedules enforce offline.
- Reports avoid raw content exposure.
- COPPA-style review complete.
- Export and deletion accessible.

## Open Questions

- Platform capabilities per OS in V1.
- Scope of content-category filter.
- Multi-parent coordination model.
- Regional regulator review list.

## Build Plan

- Phase 1: parent/child auth, enrollment, disclosure.
- Phase 2: rules and schedules enforcement.
- Phase 3: reports and alerts.
- Phase 4: subscription, privacy center.
- Phase 5: safety, accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Define on-device agent strategy per OS.
- Commission child-safety and regional review.
