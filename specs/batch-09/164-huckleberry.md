# Huckleberry-Style Clone Spec

> Metadata
> - Inspiration app: Huckleberry
> - Category: Baby sleep and feeding tracker
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings and public help-center discovery. Exact URLs pending verification.
> - Manual verification blockers: proprietary sleep-window prediction, subscription flows, premium-feature gating, and clinical-content handling require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, editorial content, illustrations, and prediction models. No proprietary sleep-science content reuse.

## Overview

Build an original mobile baby-tracking app inspired by Huckleberry: log sleep sessions, feedings, diapers, and pumping; deliver optimal sleep-window predictions based on age and recent sleep; provide sleep plans and content; and support premium features with original copy.

## Goals

- Track sleep, feedings (breast, bottle, solids), diapers, pumping, growth, and milestones.
- Predict optimal nap/bedtime windows from age and recent sleep history.
- Provide sleep plans and content tailored to child age with disclaimers.
- Support multiple children and caregivers sharing a child.
- Keep privacy controls visible; child data excluded from advertising.

## Non-Goals

- Do not present as a medical device or diagnostic tool.
- Do not copy proprietary sleep-science content, brand, or feature names.
- Do not share child data with advertisers.
- Do not collect data from the child directly.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/huckleberry-baby-kid-sleep/id1223615833 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.huckleberrylabs.app | Features, data safety | Source discovery — pending exact URL verification |
| Huckleberry help center | https://huckleberrycare.com/help | Feature how-to | Source discovery — pending exact URL verification |
| Huckleberry privacy policy | https://huckleberrycare.com/privacy | Data handling | Source discovery — pending exact URL verification |
| Huckleberry sleep content | https://huckleberrycare.com/blog | Editorial tone reference | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Per-child profile with DOB, weight, custom notes.
- Logging for sleep (start/end), feeding, diaper, pumping, medications, custom events with rich detail.
- Predictions for next nap/bedtime based on age and recent data.
- Sleep-plan content by age with disclaimers.
- Caregiver co-parenting sharing with invite codes.
- Export and deletion controls.

## Core User Journeys

- User creates child profile, invites a partner, and lands on child home.
- User logs sleep start and end; timer supports live tracking.
- User logs bottle/breast feeding with side and duration.
- User reviews sleep windows and sees next-nap suggestion.
- User reads a sleep plan article.
- User edits past log; sync resolves across devices.
- User exports data.
- User upgrades to premium; original paywall copy.
- User reviews charts for trends.
- User removes a caregiver or transfers ownership.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Child profile, caregiver invite | DOB, name, invite | new | duplicate child |
| Child Home | Today's log and prediction | quick-add | empty, populated | offline |
| Sleep Timer | Live session tracking | start, stop | idle, running, paused | app backgrounded |
| Feeding Log | Feed entry | type, side, amount | empty, saved | validation |
| Diaper Log | Diaper entry | type | saved | duplicate |
| History Charts | Trends over time | range | loaded | sparse |
| Sleep Plan | Content and recommendations | age | loaded | unavailable |
| Caregivers | Invite and manage | invite code | loaded | revoked |
| Subscription | Plans, restore | plan | free, paid | restore fail |
| Privacy Center | Export, delete | actions | idle | pending |
| Settings | Units, notifications | toggles | loaded | signed-out |
| Support | Contact, FAQ | form | idle | unavailable |

## Data Model

- `User`: identity, locale, consent.
- `Family`: id, owner, caregivers list.
- `ChildProfile`: id, family, DOB, weight, notes.
- `LogEntry`: child, category (sleep/feed/diaper/pump/other), start, end, details, edited-at.
- `Prediction`: child, type (nap/bedtime), window start, window end, confidence.
- `ContentItem`: age range, title, body, disclaimers.
- `Invite`: code, family, role, expires-at.
- `PrivacySettings`: sync, analytics opt-in.
- `Entitlement`: plan, platform.
- `AuditEvent`: caregiver changes, privacy, billing.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /families`, `POST /families/:id/invites`, `POST /invites/:code/accept`, `DELETE /families/:id/members/:userId`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `POST /logs`, `PATCH /logs/:id`, `DELETE /logs/:id`, `GET /logs?range=&child=`.
- `GET /predictions?child=`.
- `GET /content?age=`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Offline-first logging; co-parent sync via server with last-writer-wins and audit.
- Live timers must survive app backgrounding and device reboot.
- Push for nap-window reminders (opt-in); payloads generic.
- Local DB encrypted.

## Permissions, Privacy, And Safety

- COPPA-style review required: no child-directed data collection beyond parent-provided profile; no ads targeted to child context.
- Caregivers co-own data with equal rights; define owner vs member.
- Export and deletion accessible.
- Post-Dobbs stance n/a but general health-data minimization applies.
- Launch owner: privacy lead, content reviewer, accessibility owner.

## Analytics And Monetization

- Track privacy-safe events: log saved (category), prediction viewed, invite sent, subscription events.
- No child content in analytics.
- Free tier plus premium with original paywall copy.

## Edge Cases

- Timezone changes affecting sleep windows.
- Daylight savings transitions.
- Twin/sibling profiles tracked simultaneously.
- Caregiver revoked mid-log.
- Historical data imported from another app.
- Device clock incorrect.
- Push permission denied; suggest in-app alternatives.
- Sync conflict on same sleep session from two devices.
- Partner leaves family; data retention.

## Test Plan

- Unit tests for timer, prediction engine, caregiver permissions.
- Contract tests for all endpoints.
- Integration tests for multi-device sync and caregiver invite.
- Privacy tests.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Manual verification: native timer behavior, subscription flow.

## Acceptance Criteria

- Multi-caregiver sync reliable.
- Predictions and plan content delivered with disclaimers.
- COPPA-style review complete.
- Export and deletion accessible.

## Open Questions

- Scope of V1 content library.
- Which prediction model baseline.
- Premium feature set.

## Build Plan

- Phase 1: scaffold, onboarding, child profile, log, timer.
- Phase 2: predictions, charts, content.
- Phase 3: caregiver invite, sync, privacy center.
- Phase 4: subscription, notifications.
- Phase 5: accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Commission COPPA-style review.
- Define prediction model.
