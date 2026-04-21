# Bark-Style Clone Spec

> Metadata
> - Inspiration app: Bark
> - Category: Parental monitoring
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: platform-specific monitoring APIs, carrier/ISP integrations, content-scanning ML, subscription/entitlement, and push behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, sample data, and detection models. No proprietary ML, content rules, or feature names.

## Overview

Build an original mobile parental-monitoring app inspired by Bark: parents pair their child's accounts and device; the app scans for concerning content patterns (self-harm, bullying, predators, adult content); parents receive alerts with guidance rather than raw content when possible; includes screen-time controls and location features. Consent-first and transparency-first.

## Goals

- Pair child's supported services and device with explicit child awareness per region/age.
- Detect concerning content patterns and send parent alerts with minimal content exposure.
- Provide screen-time schedules, app/website blocking, and location alerts (where integrated).
- Offer guidance resources rather than punitive-only controls.
- Keep child awareness and rights surfaced to the greatest extent consistent with safety.

## Non-Goals

- Do not enable covert monitoring; device owner/user must be disclosed per law.
- Do not share child data with advertisers or third-party analytics.
- Do not copy proprietary detection models, feature names, or brand copy.
- Do not act as a surveillance tool outside the parent-child safety context.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/bark-parental-controls/id1477619687 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.bark.bark | Feature list, data safety | Source discovery — pending exact URL verification |
| Bark help center | https://help.bark.us | Feature how-to | Source discovery — pending exact URL verification |
| Bark privacy policy | https://www.bark.us/privacy | Data handling, consent | Source discovery — pending exact URL verification |
| Bark terms | https://www.bark.us/terms | Account rules, disclaimers | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Parent and child accounts with role separation.
- Pairing via enrollment code with explicit child acknowledgment screen.
- Account integrations (email, social, messaging where OAuth available) with minimum scopes.
- On-device monitoring for web activity and installed apps where platform permits.
- Alert categories with severity; alerts summarize patterns with minimal raw content.
- Screen-time schedules and app/website allow/block lists.
- Location alerts if integrated.
- Export and deletion for child data.

## Core User Journeys

- Parent creates account, adds child profile.
- Parent sends pairing invitation; child device onboards with acknowledgment.
- Parent links child's email/social accounts (OAuth) with child consent.
- Alert triggers; parent sees a summary with guidance and resource links.
- Parent sets screen-time schedules and app blocks.
- Child requests an exception; parent approves/denies.
- Parent exports child data or removes child profile.
- Child reaches age of majority; data handling transitions.
- Parent manages multiple children.
- Support case for false alert.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Parent account, child profile | name, age, consent | new | region block |
| Pairing | Device/account pairing | code, acknowledgment | pending, paired | revoked |
| Dashboard | Alerts and health | none | empty, populated | offline |
| Alert Detail | Summary and guidance | none | unread, read | no raw content |
| Integrations | Linked services per child | OAuth | connected, disconnected | scope reduced |
| Screen Time | Schedules and limits | toggles, times | active, paused | conflict |
| App Blocks | Allow/block lists | add/remove | populated | platform limit |
| Location | Location alerts (if integrated) | place add | loaded | permission off |
| Subscription | Plans, restore | plan | free, paid | restore fail |
| Privacy And Transparency | Child rights, export, delete | actions | idle | pending |
| Support | Contact, false-alert report | form | idle | unavailable |
| Settings | Account, notifications | toggles | loaded | signed-out |

## Data Model

- `ParentUser`, `ChildProfile`: identities and linkage.
- `PairingSession`: code, device, acknowledged-at, status.
- `Integration`: child, provider, scopes, tokens, last sync.
- `ContentAlert`: child, category, severity, summary, evidence pointer (not raw content), timestamp.
- `Schedule`: child, time windows, allowed/blocked apps/sites.
- `Request`: child, type (exception), parent decision, timestamp.
- `LocationAlert`: child, place, event type, timestamp.
- `PrivacySettings`: analytics opt-in, retention window, child-rights disclosures.
- `Entitlement`: plan, platform.
- `AuditEvent`: pairing, consent, decision, integration, privacy events.

## API And Backend Contracts

- `POST /auth/parent/session`, `POST /auth/child/pair`, `DELETE /auth/session`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `POST /pairings`, `POST /pairings/:id/acknowledge`, `DELETE /pairings/:id`.
- `POST /integrations/:provider/connect`, `DELETE /integrations/:id`.
- `GET /alerts?child=&range=`, `PATCH /alerts/:id/read`.
- `GET /schedules`, `POST /schedules`, `PATCH /schedules/:id`.
- `GET /requests`, `POST /requests/:id/decision`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Alerts delivered via push; payload carries severity and category only, not raw content.
- Real-time schedule enforcement on child device.
- Offline queue for enforcement rules; replay on reconnect.
- Background scanning respects OS limits and battery policies.

## Permissions, Privacy, And Safety

- Child disclosure required: on pairing, child sees what is monitored and their rights.
- COPPA-style review required; no behavioral ads against child data; minimized data retention.
- Integration scopes limited to least-privileged.
- Raw content inspection restricted; support tooling redacts.
- Domestic-abuse threat model: parent-child relationship assumed; app must not enable monitoring of non-consenting adults.
- Post-abuse-of-tool safeguards: audit-log tampering resistance.
- Launch owner: privacy lead, child-safety lead, security lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: pairing completed, alert received (category/severity), schedule set, integration added, subscription events.
- No alert content or identifiers in analytics.
- Subscription-only product typical; original paywall copy.

## Edge Cases

- Child removes/uninstalls monitoring; parent sees "not monitored" state.
- Platform API change breaking scanning.
- False-positive alert cluster.
- Child ages out; transition to adult status with data handoff.
- Shared device between children.
- Parent separation; dual-parent access considerations.
- Jurisdictional legality of monitoring minors varies; region gating.
- Integration token expired/revoked.

## Test Plan

- Unit tests for alert scoring, schedule enforcement, token refresh.
- Contract tests for all endpoints.
- Integration tests for pairing, alert lifecycle, schedule application.
- Privacy tests: redaction, retention, no ads.
- Safety tests: disclosure flows, non-consenting adult detection.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Manual verification: platform scanning behavior, push payloads, subscription.

## Acceptance Criteria

- Pairing requires explicit child acknowledgment.
- Alerts avoid raw content disclosure where possible.
- COPPA-style review complete; no behavioral ads.
- Export and deletion accessible.
- Regional legal review complete.

## Open Questions

- Scope of V1 integrations.
- Platform feasibility of on-device monitoring per OS.
- Handling of jurisdictions that require child consent beyond parental authority.
- Handling when a parent attempts to monitor another adult.

## Build Plan

- Phase 1: parent/child auth, pairing, acknowledgment UI.
- Phase 2: integrations, alert ingestion, dashboard.
- Phase 3: schedules, app/website blocks, requests.
- Phase 4: subscription, privacy center, export/delete.
- Phase 5: safety disclosures, accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Commission child-safety and regional legal review.
- Define integration roadmap.
