# Remind-Style Clone Spec

> Metadata
> - Inspiration app: Remind
> - Category: School messaging
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official Remind support pages, and public Remind privacy/terms pages.
> - Manual verification blockers: SMS delivery, carrier opt-out handling, district rostering/SIS integrations, school administrator controls, subscription/paid messaging states, and production push timing require lawful test accounts and telecom-provider verification.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, illustrations, sample messages, private APIs, and proprietary feature names.

## Overview

Build an original mobile school-messaging app inspired by Remind's public workflows: class announcements, teacher-family/student conversations, multi-channel delivery, contact privacy, translation, school/district oversight, and compliance-minded message history. The V1 should reproduce the user jobs with original language and implementation, not Remind branding or network behavior.

The app is implementation-ready for a public-source V1 that supports in-app and email messaging by default, with SMS behind provider, consent, and CTIA/TCPA verification gates. Any claim of exact SMS, district, or native push parity remains blocked until hands-on testing is complete.

## Goals

- Let educators create classes/groups, invite recipients, send announcements, and manage two-way communication.
- Support teacher, parent/guardian, student, school admin, district admin, and support roles with clear permissions.
- Deliver messages through in-app push, email, and optionally SMS while recording consent, delivery receipts, and failure states.
- Keep personal phone numbers and email addresses private between educators, students, and families.
- Provide translation, office hours, message controls, moderation/reporting, message history export, and school-policy retention.
- Protect K-12 student data with FERPA-adjacent scoping, COPPA-style review for minors, no student advertising, and minimal analytics.

## Non-Goals

- Do not build a Remind-branded app or imply compatibility, partnership, or message delivery through Remind.
- Do not reuse Remind copy, screenshots, app icons, message templates, proprietary feature names, or private APIs.
- Do not target ads to students or use classroom messages for ad personalization.
- Do not operate as an unrestricted consumer chat app outside school/community communication scopes.
- Do not send SMS without explicit consent, opt-out handling, audit logs, and telecom compliance review.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/remind-school-communication/id522826277 | Official iOS listing, communication/translation/file-sharing claims, age rating, privacy labels, platform requirements | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.remind101 | Official Android listing, real-time communication, contact privacy, translation, file/photo sharing, data safety, support contacts | Verified 2026-05-02 |
| Remind Help Center | https://help.remind.com/hc/en-us | Official support taxonomy for classes, accounts, messaging, school administration, notifications, and troubleshooting | Verified 2026-05-02 |
| Remind Privacy Policy | https://www.remind.com/privacy-policy | Public data-handling, message/contact information, rights, and retention obligations | Verified 2026-05-02 |
| Remind Terms | https://www.remind.com/terms-of-service | Account rules, acceptable-use boundaries, service terms, and messaging obligations | Verified 2026-05-02 |
| Remind Accessibility | https://www.remind.com/accessibility | Accessibility posture and product expectation for inclusive school communication | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings describe real-time school communication across devices, contact privacy, translations into many languages, and file/photo/content sharing.
- Teacher onboarding must create a class/group, configure participant roles, invite recipients by code/link/contact import, and choose one-way or two-way messaging policies.
- Recipient onboarding must accept a class invite, verify contact channel, choose language and delivery preferences, and join as parent/guardian, student, or staff.
- Announcements must fan out to large audiences, show delivery states, support attachments/links, and prevent recipient-to-recipient exposure.
- Direct and small-group conversations must hide personal contact details, support role-based participant limits, and respect teacher/admin communication settings.
- Delivery channels must include in-app, push, email, and optional SMS; SMS requires explicit opt-in, STOP/START/HELP handling, and region/provider compliance.
- Translation must use the recipient's preferred language with visible original/translated states and fallback when unsupported.
- Office hours and quiet hours must block or queue replies, explain delay states, and allow school/admin policy overrides.
- Admin/school mode must support roster sync, staff management, organization-wide settings, message history access/export, moderation, and audit logs.
- Notifications must support channel-specific preferences, class-level mute, digest behavior, emergency/urgent message handling, and generic lock-screen previews.
- Message history, exports, deletion, and legal holds must be policy-bound because messages can contain education records.
- Accessibility must include dynamic type, screen-reader labels, high contrast, reduced motion, keyboard/external input, and predictable focus in long message threads.

## Core User Journeys

- Teacher creates a class, shares a class code, and sees pending/active recipients.
- Parent joins via invite, verifies phone/email, sets preferred language, and receives a welcome message without seeing other recipients' contact details.
- Teacher sends a class announcement with an attachment; recipients receive it through selected channels and delivery receipts update over time.
- Student replies privately to a teacher; the conversation stays scoped to the class and respects school policy.
- Teacher enables office hours; parent replies after hours and sees the message queued or delayed.
- User opts into SMS, receives a message, replies through SMS, sends STOP, and the system disables only SMS while retaining app/email options.
- Teacher sends a translated message; recipient reads translation, can view original text, and reports a confusing translation.
- School admin imports a roster, claims classes under a school workspace, reviews policy settings, and exports message history for an authorized request.
- Teacher archives a class at term end; recipients lose active posting ability while retained records remain exportable.
- Support/admin handles a reported message with minimal content access, decision logging, and escalation.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account creation and role entry | email, phone, SSO, role | new, returning, invite-linked | underage, blocked domain, verification fail |
| Class Setup | Teacher class/group creation | name, subject, invite policy | draft, active, archived | duplicate class, policy denied |
| Join Class | Recipient invite acceptance | code/link, relation, channel | valid, pending, joined | expired code, full class, wrong role |
| Class List | Joined classes and groups | search, filter, mute | populated, empty, archived | sync fail, removed membership |
| Announcements | Broadcast timeline | compose, filter, open receipts | sent, scheduled, failed | large fan-out delay, attachment blocked |
| Announcement Composer | New broadcast | text, attachment, audience, urgency | draft, sending, sent | rate-limited, SMS not allowed |
| Conversations | Direct and group threads | search, participant select | unread, read, archived | off-hours, blocked, no reply permission |
| Message Composer | Compose reply/direct message | text, file, translation | draft, queued, delivered | opt-out channel, unsafe content |
| Delivery Report | Channel and recipient receipt summary | recipient filter | pending, delivered, failed | provider outage, unknown carrier status |
| Channel Preferences | Contact and notification setup | phone, email, push, SMS opt-in | verified, unverified, muted | STOP received, reverify required |
| Translation Settings | Language preferences | language, original toggle | enabled, disabled | unsupported language, provider error |
| School Admin | Rosters, staff, policies | import, search, export, audit | configured, syncing | SIS failure, permission denied |
| Moderation/Reports | Review abuse or policy reports | reason, decision | queued, in review, resolved | legal hold, emergency escalation |
| Privacy Center | Export/delete and data controls | request, scope, identity check | idle, pending, fulfilled | school retention hold, channel mismatch |
| Entitlements | Optional paid/admin states | plan, restore, billing contact | free, school-paid, expired | platform mismatch, webhook delay |
| Support | Help and troubleshooting | case form, logs consent | submitted, in progress | content redaction, unavailable support |

## Data Model

- `User`: identity, roles, age/consent state, locale, region, verified contacts, deletion/export state.
- `ContactPoint`: phone/email/device token, verification state, SMS consent, opt-out state, carrier/provider metadata.
- `SchoolWorkspace`: school/district identity, verified domains, admins, policies, retention, roster source.
- `ClassGroup`: teacher/owner, school, subject/grade, invite code, messaging policy, archive state.
- `Membership`: user, class/group, role, relation to student, join source, notification preferences, status.
- `Announcement`: class/group, author, audience, body, attachments, translation policy, scheduled/sent state.
- `Conversation`: participant set, class/group scope, student context, reply policy, office-hours state, archive/block state.
- `Message`: conversation/announcement reference, sender, body, attachments, translation pairs, moderation flags.
- `DeliveryAttempt`: message, recipient, channel, provider id, state, failure reason, retry count, timestamps.
- `Receipt`: message, user, delivered/read/replied state, channel source, privacy-safe timestamp.
- `Attachment`: upload metadata, type, scan status, size, storage key, retention and deletion state.
- `TranslationJob`: source message, target locale, provider, state, translated body reference, failure reason.
- `RosterImport`: source type, file/integration reference, rows, conflicts, processed state, audit summary.
- `ModerationCase`: report target, reporter, reason, severity, decision, escalation, redaction state.
- `PrivacyRequest`: requester, school/class scope, export/delete/access type, identity proof, legal hold, fulfillment state.
- `Entitlement`: payer, plan, school/family scope, platform, renewal/refund/expiration state.
- `AuditEvent`: append-only auth, roster, message, channel, SMS opt-in/out, export, moderation, policy, billing changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify-contact`, `DELETE /auth/session`: auth and contact verification.
- `POST /schools/verify`, `PATCH /schools/:id/policies`, `GET /schools/:id/audit-events`: school workspace and policy management.
- `POST /classes`, `PATCH /classes/:id`, `POST /classes/:id/archive`, `GET /classes`: class lifecycle.
- `POST /classes/:id/invites`, `POST /invites/:code/accept`, `DELETE /memberships/:id`: invites and memberships.
- `POST /roster-imports`, `GET /roster-imports/:id`, `POST /roster-imports/:id/resolve-conflicts`: roster sync/import.
- `GET /classes/:id/announcements`, `POST /classes/:id/announcements`, `PATCH /announcements/:id`, `DELETE /announcements/:id`: announcement lifecycle.
- `GET /conversations`, `POST /conversations`, `GET /conversations/:id/messages`, `POST /conversations/:id/messages`: scoped messaging.
- `POST /messages/:id/translate`, `GET /messages/:id/translations`: translation lifecycle with original text access.
- `GET /delivery/:messageId`, `POST /delivery/retry`: channel receipts and retry contracts.
- `PATCH /settings/channels`, `POST /settings/channels/:id/verify`, `DELETE /settings/channels/:id`: delivery preferences.
- `POST /webhooks/sms/inbound`, `POST /webhooks/sms/status`: inbound SMS replies, STOP/START/HELP, provider delivery state.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: attachment validation and scanning.
- `POST /reports`, `POST /moderation/decisions`, `GET /admin/moderation-cases`: reporting/moderation.
- `POST /data-export`, `DELETE /account`, `GET /privacy-requests/:id`: privacy workflows.
- `GET /entitlements`, `POST /billing/restore`, `POST /billing/webhook`: optional paid states.
- `POST /support/cases`, `GET /support/cases/:id`: support lifecycle with content-redaction controls.

## Realtime, Push, And Offline Behavior

- Message and receipt updates use websocket/SSE with cursor replay, duplicate protection, and fallback polling.
- Local drafts are encrypted and synced only after server-side permission checks and attachment scans.
- Announcement fan-out is queued and rate-limited by audience size, channel, school policy, and provider quotas.
- SMS delivery uses provider status callbacks, retries only safe transient failures, and stops immediately for opt-out or consent errors.
- Inbound SMS replies map to scoped conversations without exposing real phone numbers to teachers, students, or families.
- Push notifications default to generic previews and never include student names or message bodies for locked-device display unless policy allows.
- Offline users can read cached messages/classes and draft replies; send status remains pending until reconciliation.

## Permissions, Privacy, And Safety

- FERPA-adjacent posture: messages, rosters, class membership, delivery receipts, and exports are scoped by class/school authorization.
- COPPA-style review is required for student accounts, SMS/email contact handling for minors, and any under-13 direct messaging.
- SMS requires opt-in records, clear sender identity, STOP/START/HELP handling, quiet hours where required, and region-specific telecom review.
- Personal contact details remain hidden between educators, students, and parents; replies use relay identities.
- Admin history access must be policy-bound, audited, and limited to authorized school/district personnel.
- Moderation must handle harassment, threats, spam, adult/minor boundary issues, emergency misuse, and inappropriate attachments.
- Analytics exclude raw message content, phone/email addresses, student names, attachments, translation text, and support case bodies.
- Data export/delete must respect school retention rules, legal holds, student-record policies, and channel-provider deletion limits.
- Launch owners: education product lead, privacy/legal lead, telecom compliance owner, child-safety owner, security lead, accessibility owner.

## Analytics And Monetization

- Track only privacy-safe events: class created, invite accepted, announcement sent, message sent, delivery attempted/completed, channel verified, SMS opt-out, translation requested, report submitted, export requested.
- Event payloads use opaque ids, role, channel, locale, platform, and failure code; no message text, phone number, email, attachment body, or student identity appears in analytics.
- Monetization can be school/district licensing or optional original premium admin features, but student/family communication basics must not be blocked unexpectedly.
- Billing states must distinguish teacher-free, school-paid, district-managed, expired, canceled, refunded, restored, and unsupported-region states.

## Edge Cases

- Recipient joins with both email and phone and accidentally creates duplicate memberships.
- Phone number is reassigned; re-verification and recent-message protections are required.
- User sends STOP by SMS while push/email remain enabled.
- Carrier accepts SMS but delivery receipt never arrives.
- Large emergency broadcast is throttled by provider quotas.
- Teacher sends a message outside office hours and policy requires delayed delivery.
- Translation provider fails or produces disputed translation for a sensitive school issue.
- Student replies from SMS without an app account; identity mapping is ambiguous.
- School admin legal-hold request conflicts with parent deletion request.
- Teacher leaves school; classes and conversations need transfer or archive.
- Attachment scan fails after message body has already been delivered.
- Roster import merges two students with the same name and different guardians.
- Parent custody restriction changes mid-thread.
- App notification permission is denied, so SMS/email fallback is selected.

## Test Plan

- Unit tests for class membership, contact verification, channel preference, SMS opt-in/out, office-hours queue, recipient privacy, and delivery state machines.
- Contract tests for every documented route, provider webhook idempotency, permission errors, pagination, and async export states.
- Integration tests for class creation, invite accept, announcement fan-out, direct message reply, translation, receipts, channel fallback, and class archive.
- SMS tests with provider sandbox for opt-in, STOP, START, HELP, inbound reply mapping, delivery failure, carrier delay, duplicate callbacks, and unsupported region.
- Privacy tests for contact hiding, cross-class isolation, admin history access, export/delete/legal-hold conflicts, analytics redaction, and cached-message cleanup.
- Moderation tests for reported messages, blocked users, inappropriate attachments, emergency escalation copy, and audit logs.
- Offline/realtime tests for drafts, reconnect cursors, duplicate events, delayed receipts, and failed attachment retry.
- Billing tests if enabled: school-paid, district-managed, family-paid, free, expired, canceled, refunded, restored, duplicate webhook, and platform mismatch.
- Accessibility tests for dynamic type, screen readers, focus order in long threads, reduced motion, high contrast, keyboard navigation, and translated-text layout.
- Manual verification tests: SMS delivery on real carriers, push timing, district rostering, school admin workspace, subscription purchase/restore, and role flows on iOS/Android devices.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- A downstream team can build the V1 without proprietary Remind assets, private APIs, screenshots, brand copy, or sample messages.
- Class announcements, scoped conversations, channel preferences, translation, delivery receipts, and office-hours behavior work end-to-end.
- Contact privacy is enforced so teachers/families/students do not see personal phone/email data unless explicitly allowed.
- SMS is feature-flagged until provider, consent, STOP/START/HELP, and regional compliance tests pass.
- FERPA-adjacent data scoping, COPPA-style review, moderation, export/delete, legal-hold, and audit workflows are covered by tests.
- Analytics contain no message content, student names, contact details, translations, or attachments.
- Manual verification blockers remain launch-blocking feature flags until resolved with evidence.

## Open Questions

- Which SMS provider, countries, toll-free/short-code strategy, and messaging campaign registration model are approved for V1?
- Which school roster methods belong in V1: CSV, SIS, Clever/ClassLink-equivalent, or manual-only?
- Which translation provider and language list meet district privacy requirements?
- What admin history access should schools have by default, and which actions require legal/policy approval?
- Is any paid tier included in V1, and is the payer a school/district or individual family/teacher?

## Build Plan

- Phase 1: implement auth, contacts, class setup, invite accept, membership roles, in-app announcements, and email fallback.
- Phase 2: add conversations, message composer, receipts, notification preferences, office hours, and push notifications.
- Phase 3: add attachment upload/scanning, translation, moderation, reporting, and admin audit logs.
- Phase 4: add SMS provider integration behind feature flags, opt-in/out handling, inbound replies, provider status callbacks, and telecom tests.
- Phase 5: add roster import, school workspace, message export/legal hold, privacy center, analytics redaction, and accessibility coverage.
- Phase 6: add optional billing/admin entitlements, legal/privacy/telecom review, and hands-on iOS/Android verification.

## Next Steps

- Resolve SMS provider and compliance strategy before enabling SMS outside test environments.
- Verify school admin and roster workflows with lawful school/district accounts.
- Refresh downstream scaffold source-spec copies after this canonical spec is propagated.
