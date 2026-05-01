# Bark-Style Clone Spec

> Metadata
> - Inspiration app: Bark
> - Category: Parental monitoring
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, Bark support articles, public product pages, privacy policy, and terms.
> - Manual verification blockers: platform-specific monitoring permissions, Bark Kids-style child-device setup, social/email/SMS integration availability, content-scanning model quality, screen-time/VPN enforcement, carrier/router/home-device integrations, subscription restore, and push alert payloads require lawful test devices/accounts before one-for-one parity claims; child-safety lead, privacy lead, security lead, billing owner, and accessibility owner must keep them behind acceptance-test blockers.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, illustrations, sample data, detection models, content rules, or feature names. Do not reuse proprietary ML, moderation taxonomies, alert guidance, carrier/router integrations, or marketing copy.

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
| Apple App Store | https://apps.apple.com/us/app/bark-parental-controls/id1477619146 | Official iOS listing, content monitoring, screen time, web filtering, alerts, age rating, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=cm.pt.barkparent | Official Android parent app listing, content monitoring, screen-time management, web filtering, pricing, data safety | Verified 2026-05-01 |
| Screen time and web filtering | https://support.bark.us/hc/en-us/articles/360050416031-What-is-screen-time-and-web-filtering | Blocking apps/sites, schedules, SafeSearch locks, mobile/in-home device coverage, Bark Kids setup | Verified 2026-05-01 |
| Monitoring vs screen time | https://support.bark.us/hc/en-us/articles/360050415771-What-is-the-difference-between-monitoring-and-screen-time-filtering | Difference between monitoring alerts and screen-time/filtering controls | Verified 2026-05-01 |
| Bark support center | https://support.bark.us/ | Setup, troubleshooting, product support entry point | Verified 2026-05-01 |
| Bark privacy policy | https://www.bark.us/privacy/ | Data handling, child data, privacy obligations | Verified 2026-05-01 |
| Bark terms | https://www.bark.us/terms/ | Account rules, subscription terms, acceptable use, service disclaimers | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings verify parent-facing content monitoring, screen-time management, web filtering, alerts for issues such as cyberbullying, adult content, sexual predators, suicidal ideation, profanity, and threats of violence, plus subscription pricing.
- Bark support verifies that monitoring and screen-time/filtering are separate surfaces; V1 must keep scanning alerts separate from blocking/schedule rules.
- Parent and child roles must be separated, with child-device setup that clearly explains what is monitored, what is blocked, and who receives alerts.
- Pairing must require a code or signed setup link and produce a durable consent/disclosure audit record.
- Account integrations may include email, messaging, social, browser, photo/video, or YouTube-like sources only through lawful public APIs, platform APIs, or user-authorized local device agents.
- Alert detection must be an original model/ruleset; category names, thresholds, guidance copy, and escalation text must not copy Bark's proprietary materials.
- Parent alerts must minimize raw content exposure, default to category/severity summaries, and reveal excerpts only when necessary and legally appropriate.
- Screen-time and filtering rules must support app/site blocking, category allow/block, schedules by day/time, school-night/weekend variants, SafeSearch-style enforcement, and internet pause.
- Mobile enforcement must disclose platform limitations; home/router/carrier controls are deferred unless lawful integrations exist.
- Child exception requests and false-alert reports must be first-class workflows, not support-only dead ends.
- Location features are optional and must not be bundled into monitoring without separate permission and child-visible disclosure.
- Export/delete must support parent account data, child profile data, alert metadata, and integration tokens.
- Regional legality review is launch-critical for monitoring minors, message scanning, school devices, split custody, and age-of-majority transitions.

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
- Parent configures a school-night schedule and a weekend schedule for app/site access.
- Child sees a blocker screen and sends an exception request.
- Parent receives a self-harm category alert with crisis-resource guidance and minimal exposed content.
- Child removes the device agent; parent dashboard shows monitoring inactive rather than silently continuing.
- Teen reaches age-of-majority threshold and receives a data/control transition workflow.

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
| Child Disclosure | What is monitored/blocked and child rights | acknowledge | pending, complete | too young |
| Filtering Rules | Category/site/app allow/block controls | toggles, schedules | active, paused | platform limit |
| Child Requests | Extra time/site/app exception requests | request, reason | pending, approved | expired |
| Monitoring Health | Integration/device status | refresh, reconnect | healthy, degraded | token revoked |
| Crisis Guidance | High-severity alert resources | view, contact | available | region unavailable |

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
- `MonitoringSource`: provider/device/source type, capabilities, consent, health status.
- `DetectionRun`: source, model version, categories checked, confidence, redaction state.
- `GuidanceResource`: alert category, region, age band, reviewed-at.
- `DeviceAgentState`: device, platform, VPN/profile/accessibility permissions, last heartbeat.
- `AgeTransition`: child, age band, notice state, data handoff status.

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
- `GET /monitoring-sources`, `POST /monitoring-sources/:id/reconnect`.
- `POST /device-agents/heartbeat`, `GET /device-agents/:id/health`.
- `GET /filtering-rules`, `PATCH /filtering-rules`.
- `POST /child-requests`, `POST /child-requests/:id/decision`.
- `POST /alerts/:id/false-positive`, `GET /guidance-resources?category=`.

## Realtime, Push, And Offline Behavior

- Alerts delivered via push; payload carries severity and category only, not raw content.
- Real-time schedule enforcement on child device.
- Offline queue for enforcement rules; replay on reconnect.
- Background scanning respects OS limits and battery policies.
- Device agents must fail closed for blocked content when rules are cached, but fail transparent when monitoring data cannot be collected.
- High-severity alerts may use urgent push but must avoid raw child content in notification previews.
- Integration token loss, OS permission revocation, and app uninstall generate visible parent and child states.

## Permissions, Privacy, And Safety

- Child disclosure required: on pairing, child sees what is monitored and their rights.
- COPPA-style review required; no behavioral ads against child data; minimized data retention.
- Integration scopes limited to least-privileged.
- Raw content inspection restricted; support tooling redacts.
- Domestic-abuse threat model: parent-child relationship assumed; app must not enable monitoring of non-consenting adults.
- Post-abuse-of-tool safeguards: audit-log tampering resistance.
- Launch owner: privacy lead, child-safety lead, security lead, accessibility owner.
- No covert monitoring: every monitored child device must show disclosure during setup and an ongoing visible state where the platform permits.
- Domestic-abuse/misuse model: block adult monitoring, require age/relationship assertions, support custody/access disputes, and provide a reporting path for monitored users.
- COPPA-style and regional child-data review is launch-blocking; no behavioral ads, no sale of child data, and no raw content in analytics.
- Self-harm, exploitation, predation, and violence categories require safety-reviewed guidance, escalation limits, and support owner sign-off.
- Support/admin access to raw alert evidence requires redaction by default, break-glass approval, and immutable audit logs.

## Analytics And Monetization

- Privacy-safe events only: pairing completed, alert received (category/severity), schedule set, integration added, subscription events.
- No alert content or identifiers in analytics.
- Subscription-only product typical; original paywall copy.
- Monetization must never condition child safety alerts on dark-pattern urgency copy; free/paid boundaries must be clear and original.
- Analytics may include alert category/severity counts and feature failures, never raw message text, account names, photos, videos, URLs, or child identifiers.

## Edge Cases

- Child removes/uninstalls monitoring; parent sees "not monitored" state.
- Platform API change breaking scanning.
- False-positive alert cluster.
- Child ages out; transition to adult status with data handoff.
- Shared device between children.
- Parent separation; dual-parent access considerations.
- Jurisdictional legality of monitoring minors varies; region gating.
- Integration token expired/revoked.
- Child uses multiple devices and one is unmonitored.
- Parent attempts to add an adult partner as a child.
- Split-custody parent disputes access to alert history.
- High-severity alert fires while parent notifications are muted.
- Monitoring model produces repeated false positives for reclaimed language.
- Platform policy removes access to a monitored data source.
- School-managed device conflicts with parent-managed agent.
- Child asks for support or safety help without notifying an unsafe adult.

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
- Detection tests for category confidence, redaction, false-positive reporting, model-version audit, and high-severity guidance.
- Device-agent tests for install, disclosure, permission revocation, uninstall, VPN/profile conflict, offline cached rules, and heartbeat gaps.
- Safety tests for no adult covert monitoring, custody dispute flagging, child support path, age transition, and crisis-resource handling.
- Privacy tests for no raw content in analytics, support redaction, retention expiry, export/delete, and integration token revocation.
- Platform tests for iOS/Android/Chromebook/browser capability differences and graceful feature downgrade.

## Acceptance Criteria

- Pairing requires explicit child acknowledgment.
- Alerts avoid raw content disclosure where possible.
- COPPA-style review complete; no behavioral ads.
- Export and deletion accessible.
- Regional legal review complete.
- Monitoring and filtering are separated in product model, permissions, and tests.
- Child disclosure and ongoing monitored-state indicators pass legal/privacy review.
- High-severity alert handling includes safety-reviewed guidance and no raw content in push previews.
- Manual verification blockers are either resolved with dated evidence or remain launch-blocking feature flags.

## Open Questions

- Scope of V1 integrations.
- Platform feasibility of on-device monitoring per OS.
- Handling of jurisdictions that require child consent beyond parental authority.
- Handling when a parent attempts to monitor another adult.
- Which V1 integrations are legally and technically feasible without proprietary platform agreements.
- What age/custody evidence is required before enabling monitoring in each launch region.
- Whether home-router/carrier filtering is deferred or implemented through a licensed partner.
- Which crisis resources and escalation language are approved per region.

## Build Plan

- Phase 1: parent/child auth, pairing, acknowledgment UI.
- Phase 2: integrations, alert ingestion, dashboard.
- Phase 3: schedules, app/website blocks, requests.
- Phase 4: subscription, privacy center, export/delete.
- Phase 5: safety disclosures, accessibility, legal review.
- Phase 6: manual verification, rollout.
- Phase 7: complete child-safety, legal, platform-policy, domestic-abuse, and crisis-response reviews before parity claims.

## Next Steps

- Resolve manual verification blockers for device-agent setup, social/email/SMS integrations, screen-time filtering, alert push payloads, subscription restore, and platform capability gaps.
- Commission child-safety, COPPA/regional, domestic-abuse misuse, custody, and crisis-response reviews.
- Define the V1 integration roadmap using only lawful public APIs, platform APIs, or original on-device agents.
