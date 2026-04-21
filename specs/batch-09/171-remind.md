# Remind-Style Clone Spec

> Metadata
> - Inspiration app: Remind
> - Category: School messaging
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: SMS delivery, district SIS integrations, subscription (if any), and push behavior require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, and sample data. No proprietary feature names.

## Overview

Build an original mobile school-messaging app inspired by Remind: teachers send class announcements and two-way messages to students and parents; messages delivered in-app, via email, or SMS; automatic translations; attendance and assignment alerts.

## Goals

- Class announcements with large audiences and delivery receipts.
- Two-way messaging with moderation and office-hours controls.
- Multi-channel delivery (in-app, email, SMS) with per-user preference.
- Translation into the recipient's preferred language.
- Role separation for teacher/admin/parent/student.

## Non-Goals

- Do not copy proprietary brand, logos, or feature names.
- Do not target advertising to students.
- Do not expose messages outside authorized audiences.
- Do not operate as a general-purpose consumer chat app.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/remind-school-communication/id522826277 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.remind101 | Features, data safety | Source discovery — pending exact URL verification |
| Remind help | https://help.remind.com | Feature how-to | Source discovery — pending exact URL verification |
| Remind privacy | https://www.remind.com/privacy | Data handling | Source discovery — pending exact URL verification |
| Remind terms | https://www.remind.com/tos | Account rules, SMS terms | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Class creation with invite codes; roster import optional.
- Announcement messages with broadcast semantics and delivery receipts.
- Direct messaging with teacher on/off-hours controls.
- SMS delivery for users without the app; SMS STOP/START handling.
- Translation with configurable target language per user.
- Admin oversight for schools with moderation tooling.

## Core User Journeys

- Teacher creates a class and shares an invite code.
- Parent or student joins via code; selects delivery channel.
- Teacher sends an announcement; recipients receive via chosen channel.
- Parent replies to teacher; teacher sees threaded message.
- Teacher enables office-hours; replies queue outside hours.
- Admin moderates a flagged message.
- School roster synced; users auto-enrolled.
- Teacher archives class at year end.
- User unsubscribes from SMS; channel falls back to app/email.
- Admin exports messaging logs for compliance.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding | Role, class code, channel prefs | code | new | invalid code |
| Classes | List of joined classes | none | populated | empty |
| Announcements | Class broadcasts | compose | populated | offline |
| Threads | Direct messages | text | loaded | off-hours |
| Composer | New message | text, attachments | draft, sent | delivery fail |
| Delivery Report | Receipts per recipient | none | loaded | pending |
| Admin Console | Moderation and rosters | search, decisions | loaded | unavailable |
| Channel Prefs | SMS/email/app | toggles | loaded | verify needed |
| Translation | Language selection | pick language | set | unsupported |
| Privacy Center | Export, delete | actions | idle | pending |
| Subscription | Plans (if any), restore | plan | free, paid | restore fail |
| Support | Contact | form | idle | unavailable |

## Data Model

- `User`: identity, role, locale, phone/email, channel prefs.
- `Class`: teacher, school, invite codes, archive state.
- `Membership`: user, class, role.
- `Announcement`: class, author, body, attachments, sent-at, receipts.
- `Message`: thread, sender, recipient, body, translation target.
- `Thread`: class, participants.
- `DeliveryReceipt`: message, user, channel, status.
- `Moderation`: target, reason, decision.
- `Entitlement`: plan, platform.
- `PrivacySettings`: analytics opt-in, retention.
- `AuditEvent`: moderation, privacy, billing.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /auth/session`.
- `POST /classes`, `POST /classes/:id/invites`, `POST /invites/:code/accept`.
- `GET /classes/:id/announcements`, `POST /classes/:id/announcements`.
- `GET /threads`, `GET /threads/:id/messages`, `POST /threads/:id/messages`.
- `GET /receipts/:announcementId`.
- `PATCH /settings/channels`.
- `POST /reports`, `POST /moderation/decisions`.
- `POST /data-export`, `DELETE /account`.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`.
- `POST /support/cases`.
- Inbound SMS webhook for replies and STOP/START handling.

## Realtime, Push, And Offline Behavior

- Real-time message delivery via websocket.
- Offline queue for drafts.
- Multi-channel fan-out: app push, email, SMS via provider with retries.
- Rate-limit large broadcasts.
- SMS STOP opts out that channel only.

## Permissions, Privacy, And Safety

- FERPA-adjacent handling for student data.
- COPPA-style review for students under 13.
- Moderation tooling with reporting and admin review.
- No advertising to students.
- SMS terms and CTIA compliance; consent recorded.
- Launch owner: privacy lead, education-product lead, telecom compliance lead, accessibility owner.

## Analytics And Monetization

- Privacy-safe events only: class created, announcement sent, message sent, delivery completed (channel).
- No message content in analytics.
- Free for teachers; optional paid tier for schools/districts; original paywall copy.

## Edge Cases

- SMS carrier failure; retry policy.
- User changes phone number; re-verify.
- Teacher leaves; archive/handoff.
- Abusive messaging; moderation and blocks.
- Large broadcast concurrency.
- Translation error; fallback to original.
- Off-hours replies queued and delivered at opening.
- District takeover of classes.

## Test Plan

- Unit tests for channel fan-out, SMS STOP handling, office-hours queue.
- Contract tests for all endpoints.
- Integration tests for announcement, thread, receipts, inbound SMS.
- Privacy tests.
- Moderation tests.
- Billing tests.
- Offline tests.
- Accessibility tests.
- Manual verification: SMS delivery, push timing.

## Acceptance Criteria

- Multi-channel delivery reliable with receipts.
- Translation and office-hours functional.
- FERPA-adjacent/COPPA-style review complete.
- Moderation and admin oversight functional.

## Open Questions

- SMS provider and regions in V1.
- District SIS integration roadmap.
- Translation language list.
- Paid tier scope.

## Build Plan

- Phase 1: auth, class, invite, announcement.
- Phase 2: threads, composer, receipts.
- Phase 3: SMS/email channels, translation.
- Phase 4: admin console, moderation.
- Phase 5: privacy center, subscription, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Select SMS provider and sign CTIA compliance.
- Commission FERPA/COPPA review.
