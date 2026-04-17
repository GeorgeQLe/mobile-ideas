# Outlook-Style Clone Spec

> Metadata
> - Inspiration app: Microsoft Outlook
> - Category: Email, calendar, Focused Inbox, multi-provider mail, contacts, files/attachments, meeting RSVP, search, suggested replies, Microsoft 365/Copilot-style assistance, and enterprise mobile policy
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Microsoft Support pages, Microsoft privacy/legal pages, and public Outlook mobile/admin documentation.
> - Manual verification blockers: native iOS/Android screen capture, Microsoft account/Exchange/Microsoft 365 onboarding, Gmail/Yahoo/iCloud/IMAP/POP connection, Focused Inbox classifier behavior, push payloads, swipe actions, threaded conversation behavior, calendar agenda/RSVP, file provider attachment behavior, Teams/Skype/Zoom meeting providers, Copilot availability, suggested replies, Play My Emails retirement behavior, encrypted/prevent-forwarding mail, enterprise app protection/MDM, data export/deletion, account removal, Wear OS/watch behavior, and regional/tenant restrictions still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, mailbox data, calendar data, contacts, files, Copilot/AI behavior, enterprise policy, provider integrations, and security implementation.

## Overview

Build an original mobile email/calendar app inspired by Outlook's public workflow: multi-provider account connection, Focused Inbox-style prioritization, folders, filters, search, compose/reply/forward, attachments, calendar agenda, meeting RSVP, contact cards, cloud files, swipe actions, notifications, suggested replies, productivity assistance, and enterprise-grade security/admin controls.

The clone must not copy Outlook branding, screenshots, marketing copy, private Microsoft APIs, Microsoft 365 data, Focused Inbox classifier behavior, Copilot behavior, Exchange protocols beyond licensed/standards use, Office file integrations, Teams/Skype/Zoom integrations, enterprise policy defaults, or Microsoft UI artwork. Functional parity should be expressed through original product language, standards-based email/calendar providers or licensed APIs, independently designed filtering/search, and transparent limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first email/calendar experience with account onboarding, Focused/Other inbox, folders, search, compose/reply/forward, attachments, calendar agenda, RSVP, contacts, notifications, settings, and support/legal flows.
- Preserve privacy and security expectations around mailbox content, attachments, calendar data, contacts, phishing/spam, Focused Inbox, suggested replies, AI assistance, data export, account removal, and enterprise policies.
- Support Microsoft 365-style productivity modules such as cloud files, Teams/Skype/Zoom meeting links, Copilot, suggested replies, Play My Emails-style voice, and app protection as feature-flagged extensions rather than core V1 assumptions.
- Keep Copilot, encrypted/prevent-forwarding mail, enterprise app protection/MDM, multi-provider OAuth aggregation, voice playback, cloud file providers, and meeting provider integrations explicitly gated until product, legal, privacy, security, compliance, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, offline behavior, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build an Outlook-branded app or imply affiliation with Microsoft, Outlook, Microsoft 365, Exchange, Copilot, Teams, Skype, OneDrive, or enterprise tenants.
- Do not reuse private Microsoft APIs, copy Focused Inbox models, import real mailbox/calendar/file data, copy Copilot outputs, or claim Outlook-compatible admin, encryption, or provider behavior without review.
- Do not ship production Copilot, encrypted/prevent-forwarding mail, Exchange enterprise policy, Teams/Skype/Zoom provider integrations, or Microsoft 365 billing without separate legal, privacy, security, compliance, and provider sign-off.
- Do not claim exact App Store, Play Store, native-device, push, Focused Inbox, search, calendar, RSVP, file, AI, enterprise, data export/deletion, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/microsoft-outlook/id951937596 | Official iOS listing, category, supported devices, email/calendar/files, Focused Inbox, Copilot, subscriptions, supported providers, privacy/legal links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.microsoft.office.outlook | Official Android listing, package id, ads/in-app purchases, downloads/rating scale, Focused Inbox, calendar, files, providers, Teams/Zoom/Skype, security, Wear OS | Verified 2026-04-17 |
| Outlook iOS/Android Help | https://support.microsoft.com/en-us/office/outlook-for-ios-and-android-help-cd84214e-a5ac-4e95-9ea3-e07f78d0cde6 | Supported mail/calendar/file providers, sync orientation, help inventory, and productivity context | Verified 2026-04-17 |
| Outlook Quick Start | https://support.microsoft.com/en-us/office/outlook-for-ios-and-android-quick-start-91a3fc25-3ba2-48cc-8257-805fd6892749 | Mobile navigation, Focused/Other, swipe actions, filters, compose, folders, attachments, contacts, calendar, RSVP, views | Verified 2026-04-17 |
| Focused Inbox | https://support.microsoft.com/en-us/office/what-is-focused-inbox-a442291e-9ce2-436a-9e46-e19ec2bf64f3 | Focused/Other behavior, personal/professional accounts, user reclassification, notifications and badge implications | Verified 2026-04-17 |
| Optimize Outlook Mobile | https://support.microsoft.com/en-us/office/optimize-the-outlook-mobile-app-for-your-ios-or-android-phone-de075b19-b73c-4d8a-841b-459982c7e890 | Swipe customization, Focused Inbox toggle, mobile customization, and notification orientation | Verified 2026-04-17 |
| Suggested Replies | https://support.microsoft.com/en-us/office/use-suggested-replies-in-outlook-19316194-0434-43ba-a742-6b5890157379 | Suggested reply behavior, mobile support, language availability, organization-local model statement, and opt-out | Verified 2026-04-17 |
| Search Attachments | https://support.microsoft.com/en-us/office/search-email-attachments-in-outlook-mobile-eaadb9e5-fe39-42d0-a9a2-63609147ff10 | Attachment search, contact/file search, and mobile search behavior | Verified 2026-04-17 |
| Microsoft Privacy Statement | https://www.microsoft.com/en-us/privacy/privacystatement | Outlook applications data handling, mailbox deletion retention notes, privacy rights, data collection, and connected providers | Verified 2026-04-17 |
| Microsoft Services Agreement | https://www.microsoft.com/servicesagreement | Consumer service terms, account/service rules, content baseline, availability, and legal caveats | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Outlook around secure email/calendar/files, Focused Inbox, multiple account providers, folders/filters, search, attachments, calendar agenda, RSVP, Teams/Skype/Zoom meeting links, suggested replies, Copilot, Microsoft 365 subscriptions, and enterprise-grade security.
- Onboarding must support Microsoft-style account sign-in, SSO/tenant state, third-party provider connection where enabled, OAuth consent, notification permission education, contacts/calendar permission education, legal/privacy links, and blocked account/provider/tenant states.
- The default signed-in surface must support Focused/Other inbox, folders, favorites, filters, account switcher, search, compose, calendar tab, contacts/people, files/attachments, settings, help, and license/account state.
- Focused Inbox must support important/other routing, reclassification by the user, all-account behavior, notification/badge implications, disabled state, and classifier transparency without copying Microsoft models.
- Inbox/thread view must support unread, flagged, attachments filter, mentions where enabled, grouped conversations, archive/delete/snooze/move, flag/pin, report phishing/spam, and unavailable provider states.
- Compose must support recipients, cc/bcc, subject, body, signatures, attachments from device/cloud provider, drafts, send, suggested replies/compose where enabled, and validation.
- Calendar must support agenda/day/3-day/month where enabled, create event, RSVP accept/tentative/decline, meeting details, online meeting provider links, reminders, and stale invite handling.
- Search must support email, people, events, attachments, files, contacts, upcoming travel/package/reservation-style cards where enabled, voice search where enabled, and privacy-safe result ranking.
- Enterprise/app protection must model admin-locked settings, data loss prevention, encryption/prevent-forwarding, managed accounts, remote wipe, retention/legal hold, and tenant-specific availability before launch.
- Account deletion/removal, data export, privacy settings, notification settings, support, terms, and privacy policy must be reachable from settings.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Store accounts, mailboxes, messages, threads, folders, Focused decisions, calendar events, contacts, files, suggested replies, AI outputs, enterprise policies, and audit events under explicit ownership and deletion/export rules.
- Keep email, calendar, contacts, files, meeting providers, AI/Copilot-style assistance, voice playback, and enterprise admin modules separated by feature flags, storage scopes, analytics scopes, and security review.
- Model email/calendar providers, OAuth, push, attachment/cloud file storage, search index, Focused classifier, meeting providers, AI, billing, and MDM providers as adapters with feature flags, timeout behavior, provider error mapping, and privacy review.
- Mailbox/calendar writes and tenant policy must be server-authoritative; clients cannot grant account, mailbox, AI, encryption, admin, or billing privileges from local state alone.
- Analytics and logs must not include raw email bodies, subject lines, recipient addresses, attachment names/content, contacts, calendar descriptions, search queries, AI prompts/outputs, provider tokens, payment credentials, or tenant policy secrets.
- Support/admin tooling must include role-based access, redaction, legal hold, retention, escalation reasons, immutable audit events, and separate consumer/work-school account handling.

## Core User Journeys

- New user installs the app, signs in or connects an account, reviews OAuth/privacy/notification education, and lands in Focused Inbox.
- Returning user opens Focused Inbox, switches to Other or folders, filters unread/flagged/attachments, opens a thread, replies, archives, moves, flags, or reports phishing.
- User composes an email, adds recipients, attaches a file from device or cloud provider, saves a draft offline, sends after reconnect, and confirms provider state.
- User reclassifies an email between Focused and Other, sees notification/badge implications, and future similar messages route predictably.
- User opens calendar, views agenda, creates an event, RSVPs to an invite, joins a meeting link, and handles provider or permission failure.
- User searches for a person, attachment, event, or file, filters results, opens an item, and handles stale index/provider timeout.
- User switches between personal, work, and third-party accounts and sees separate inboxes, calendars, folders, signatures, policies, notifications, and sync errors.
- User uses suggested replies or Copilot-style assistance where available, sees disclosure and opt-out, edits generated text, and handles license/tenant/region limits.
- Managed user receives admin policy requiring app protection, screenshot restriction, encryption/prevent-forwarding, remote wipe, or retention and sees clear product behavior.
- User removes an account, exports data where provider supports it, deletes account, opens support, or escalates a phishing/security report.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, SSO/OAuth, legal | sign in, provider, terms/privacy | new, returning, managed | OAuth denied, SSO failure, tenant block |
| Account Switcher | Multi-account navigation | account, add, remove, sync | single, multiple, work/personal | token expired, remote wipe, provider outage |
| Focused Inbox | Prioritized email surface | focused/other, refresh, compose | empty, focused, other, offline cached | classifier disabled, sync error, admin lock |
| Folder/Favorites | Folders, favorites, filters | folder, favorite, filter | default, custom, synced | missing folder, provider mismatch, conflict |
| Search | Email, people, events, files | query, filter, voice, attachment | results, no results, suggestions | stale index, provider timeout, voice disabled |
| Thread View | Conversation reading/actions | reply, archive, move, flag, report | unread, read, expanded, collapsed | missing message, unsafe link, policy hold |
| Compose | Create/reply/forward email | recipients, body, attachment, send | draft, sending, sent, failed | invalid recipient, DLP block, offline |
| Attachment/File Picker | Device/cloud files | file, provider, remove | selected, uploading, attached | provider denied, too large, malware scan |
| Calendar Agenda | Calendar and meetings | day, create, RSVP, join | agenda, day, month, offline cached | stale invite, calendar denied, time zone conflict |
| Contact Card | People and organization context | contact, call, email, org | loaded, favorite, external | hidden directory, stale contact, privacy block |
| Suggested Replies/AI | Smart replies and Copilot-style help | insert, edit, disable, prompt | disabled, suggested, active | license missing, tenant disabled, unsafe output |
| Enterprise Policy | Managed app controls | policy, compliance, wipe | unmanaged, managed, locked | screenshot blocked, DLP violation, legal hold |
| Notifications | Push and Focused preferences | toggle, account, focused/other | enabled, focused, disabled | OS denied, quiet hours, delayed sync |
| Settings/Support | Account, data, privacy, legal | toggles, export, delete, support | loaded, managed, pending | unavailable control, support outage, retention |

## Data Model

- `User`: account identity, locale, region, age/consent state, deletion/export state, trust/safety restrictions, and managed-account state.
- `EmailAccount`: provider, email address, tenant, OAuth token reference, sync state, storage/quota, notification settings, signatures, and removal/wipe state.
- `TenantPolicy`: organization, app protection, DLP, encryption, prevent-forwarding, retention/legal hold, screenshot restriction, remote wipe, and admin locks.
- `Mailbox`: account, system folders, custom folders, favorites, Focused settings, sync cursor, provider capabilities, and retention policy.
- `EmailThread`: normalized subject, participants, latest message, unread/flagged/pinned state, folder, Focused classification, sync version, and deletion state.
- `EmailMessage`: provider id, thread, headers, sender/recipients, subject metadata, body reference, attachments, phishing/spam state, read state, and lifecycle.
- `Attachment`: file name, MIME, size, source provider, malware scan state, preview/edit state, upload/download state, and deletion/export metadata.
- `CalendarEvent`: provider id, organizer, attendees, start/end, recurrence, RSVP state, online meeting provider, reminder state, and conflict state.
- `ContactCard`: person identity, account scope, emails, phones, organization hierarchy, favorite state, privacy visibility, and sync state.
- `FocusedDecision`: classifier version, Focused/Other state, user reclassification, confidence, notification/badge behavior, and disabled state.
- `SmartSuggestion`: suggestion type, provider, user opt-in, input metadata, output metadata, language, retention rule, and tenant/license blockers.
- `SafetyReport`: reported message/sender/link, reason, reporter, evidence policy, decision, escalation, appeal/support case.
- `AuditEvent`: append-only record for auth, account sync, mailbox writes, Focused decisions, calendar RSVP, AI, tenant policy, export/delete, and safety actions.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/start`, `POST /providers/oauth/start`, `POST /providers/oauth/callback`, `DELETE /auth/session`: account/session/provider lifecycle with tenant, admin, region, and deletion gates.
- `GET /accounts`, `POST /accounts`, `PATCH /accounts/:id`, `DELETE /accounts/:id`: account connection, sync status, notifications, signatures, token refresh, removal, and remote wipe.
- `GET /policies`, `PATCH /policies/acknowledgement`: tenant/admin policy reads, DLP/encryption constraints, managed-app acknowledgement, and device compliance.
- `GET /mailboxes/:accountId/threads?cursor=&folder=&focused=`, `GET /threads/:id`, `GET /messages/:id`: mailbox reads with pagination, sync cursors, stale-data indicators, and provider errors.
- `POST /messages/send`, `POST /drafts`, `PATCH /drafts/:id`, `DELETE /drafts/:id`: compose, autosave, send, DLP validation, idempotency keys, and provider errors.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed attachment/cloud file upload with provider authorization, MIME/size validation, scan, and retry states.
- `POST /messages/:id/actions`: archive, delete, move, snooze, flag, pin, mark read/unread, report phishing/spam, block sender, and undo where supported.
- `POST /focused-decisions/:messageId`: move to Focused/Other, user correction, classifier feedback, notification/badge recalculation, and admin-disabled errors.
- `GET /search?query=&filters=&cursor=`: search mail, people, events, attachments, files, account context, safe-mode, and stale-index indicators.
- `GET /calendar/events`, `POST /calendar/events`, `PATCH /calendar/events/:id`, `POST /calendar/rsvp`: calendar agenda, create/edit, RSVP, online meeting provider, stale sequence, and permission errors.
- `POST /smart/replies`, `POST /ai/drafts`, `GET /entitlements`: suggested replies and AI with opt-in, language, tenant/license, region, safety checks, and no raw training-by-default assumption.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `POST /reports`, `POST /data-export`, `DELETE /account`: privacy, report, export, account delete/remove workflows, and retention/legal-hold caveats.

## Realtime, Push, And Offline Behavior

- Mail/calendar sync uses provider webhooks, push-assisted sync, or polling with canonical server reconciliation after missed events.
- The client may cache Focused/Other thread summaries, recent messages, attachments metadata, folders, calendar agenda, contacts, settings, policies, drafts, and pending actions for offline reads.
- Offline actions can queue drafts, archive/delete/move/flag, Focused corrections, and low-risk RSVP drafts; provider connect, account deletion, DLP-sensitive sends, phishing reports, AI prompts, and large attachment sends require server/provider confirmation.
- Queued sends must use idempotency keys and show pending, sent, failed, canceled, policy-blocked, and conflict states.
- Search can fall back to cached index with stale indicator; provider/server search must reconcile after reconnect.
- Enterprise policy changes must invalidate cached actions that violate new DLP, retention, screenshot, or encryption constraints.
- Push notifications must be opt-in, account/Focused-controlled, quiet-hour aware, and content-minimized; managed accounts may suppress previews or badge behavior.

## Permissions, Privacy, And Safety

- Contacts, calendar, photos/files, notifications, camera/scanner, microphone/meeting provider, and storage permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw email bodies, subject lines, recipient addresses, attachment names/content, contacts, calendar descriptions, search queries, AI prompts/outputs, provider tokens, payment credentials, and tenant policy secrets.
- Focused Inbox and suggested replies must disclose routing/assistance behavior, opt-out state, tenant/license limits, language availability, and correction path.
- Enterprise/app protection must visibly explain admin-controlled restrictions such as remote wipe, screenshot blocking, DLP, retention, encryption/prevent-forwarding, and unavailable controls.
- Data export, account removal, account deletion, folder deletion, trash retention, provider retention, and tenant legal hold must be clear before irreversible actions.
- Third-party account providers must disclose data access, token scopes, revocation, provider deletion limits, and sync failure behavior.
- Safety controls must include phishing, malware, dangerous links, spam, impersonation, account takeover, DLP violations, abusive mail, child safety, and support escalation.
- Launch owner: mail/calendar sync owner for provider correctness, security owner for account/mailbox protection, privacy owner for mailbox/AI/data rights, compliance owner for enterprise policy, safety owner for phishing/abuse.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, account connected/removed, Focused Inbox viewed, email moved Focused/Other, search performed with coarse filter only, compose started/sent/failed, attachment upload failed, phishing reported, RSVP submitted, smart suggestion used, policy block shown, export requested, account delete requested.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of mail content, subject, participants, attachment names, search text, contacts, calendar details, tenant ids, or AI content.
- Sync reliability metrics must separate operational telemetry from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original premium storage, AI assistance, business mail hosting, admin controls, enhanced security, or file storage later, but pricing, names, offers, app-store copy, and Microsoft/Outlook positioning must be original.
- AI, enterprise admin, third-party provider aggregation, encrypted/prevent-forwarding mail, and premium storage are launch-blocked unless billing, privacy, compliance, fraud, tax, region, and platform requirements are signed off.

## Edge Cases

- First launch offline, unsupported OS, OAuth denied, SSO unavailable, provider unavailable, account locked, tenant blocked, admin remote wipe, expired token, or storage quota exceeded.
- Focused classifier misroutes mail, user corrects classification, Focused disabled by user/admin, notifications/badge mismatch, or classifier feedback conflicts across accounts.
- Thread contains deleted/missing messages, duplicate provider ids, stale reply references, huge quoted content, DLP-blocked content, or blocked remote images.
- Attachment too large, cloud provider token expired, malware scan fails, provider file permission denied, upload interrupted, preview unsupported, or attachment removed after send.
- Phishing false positive, dangerous link redirect changes, sender spoofing, report-not-junk conflict, encrypted/prevent-forwarding policy blocks actions, or admin policy overrides user choice.
- Draft autosave conflict across devices, offline send duplicates, scheduled send fails, DLP blocks after reconnect, or recipient validation changes.
- Calendar invite stale, organizer updates event while user replies, meeting provider unavailable, timezone changes, recurring event conflict, or work/school policy blocks RSVP.
- AI suggestion is inaccurate, unsafe, unavailable, region-blocked, tenant-disabled, license-gated, or user expects generated text to remain private under a different provider policy.
- Account removal leaves provider data intact, account deletion impacts subscriptions, export excludes provider-hosted data, or tenant legal retention applies.

## Test Plan

- Unit tests for account/provider OAuth, SSO, token refresh, mailbox sync, Focused decisions, folders, thread grouping, compose state, attachment validation, calendar RSVP, idempotency keys, and privacy-safe analytics.
- Unit tests for phishing/spam state, dangerous-link warnings, user overrides, report phishing/not junk, blocked sender, DLP/admin policy, and managed-account restrictions.
- Unit tests for data export, account removal, account deletion, folder deletion, trash/spam retention, provider retention warnings, and legal hold.
- Contract tests for every API route, including pagination, sync cursors, authorization errors, provider errors, DLP errors, upload states, search states, AI states, report states, and privacy settings.
- Integration tests for onboarding, account connect/remove, Focused/Other inbox, folder/favorite management, search, thread reply, attachment send, phishing report, calendar RSVP, and account deletion request.
- Offline tests for cached inbox/calendar reads, queued drafts, queued archive/delete/move/flag, Focused correction, duplicate send collapse, stale search index, corrupt cache, app termination, and reconnect reconciliation.
- Privacy tests for notification previews, analytics redaction, provider token revocation, data export, account deletion, suggested reply opt-out, tenant policy, and support evidence.
- Safety tests for phishing, malware attachment, dangerous link, impersonation, spam flood, abusive mail, account takeover warning, DLP violation, child safety escalation, duplicate report, and appeal/support flow.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, keyboard/external input, large tap targets, calendar views, and attachment alternatives.
- Manual verification tests: native iOS/Android screenshots, Microsoft/Exchange/M365 onboarding, third-party providers, Focused Inbox, push payloads, swipe actions, threads, calendar/RSVP, file providers, Copilot, suggested replies, encrypted/prevent-forwarding mail, MDM/app protection, data export, account removal/deletion, Wear OS/watch, and regional/tenant availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Outlook assets, private Microsoft APIs, mailbox/calendar/file data, Focused Inbox models, Copilot behavior, Microsoft 365 services, Teams/Skype integrations, or enterprise policy defaults.
- New users can connect an account, review permissions, reach Focused Inbox, switch folders/accounts, search, compose, attach, send, and recover from offline or provider errors.
- Returning users can read, reply, forward, archive, move, flag, report phishing/spam, reclassify Focused/Other, RSVP to calendar invites, and manage notifications with deterministic sync and privacy states.
- Copilot, suggested replies, Play My Emails-style voice, Teams/Skype/Zoom meeting links, encrypted/prevent-forwarding mail, enterprise app protection/MDM, third-party account aggregation, and Wear OS include explicit feature flags and launch blockers where not independently verified.
- Settings include account management, signatures, folders, notifications, Focused Inbox, smart features, data export, account removal/deletion, support, terms, and privacy policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which email/calendar provider stack will back V1: direct IMAP/SMTP/CalDAV, provider APIs, hosted mailbox, Exchange-compatible licensed service, or a custom mail/calendar service?
- Which Focused classifier, phishing/spam, search, attachment scanning, push notification, calendar, cloud file, AI, and MDM providers will be used?
- Will V1 support third-party accounts, Focused Inbox, calendar RSVP, file providers, suggested replies, Copilot-style assistance, encrypted/prevent-forwarding mail, enterprise policy, and watch/Wear OS, or explicitly defer them?
- Which launch regions and customer segments determine mailbox retention, data export/delete, spam scanning, AI, age requirements, and enterprise compliance requirements?
- How will the downstream team distinguish raw mailbox/calendar content, attachments, search indexes, AI inputs/outputs, provider tokens, tenant policy, and support evidence in storage and privacy tooling?

## Build Plan

- Phase 1: scaffold app shell, account/OAuth/SSO, Focused/Other inbox placeholder, folder navigation, thread view, compose/send, drafts, privacy-safe analytics, and support/legal links.
- Phase 2: add attachments, search, swipe actions, archive/delete/move/flag, notifications, offline queued drafts, and reconnect reconciliation.
- Phase 3: add Focused classifier feedback, phishing/spam warnings, dangerous-link handling, blocked sender, report phishing/not junk, and safety controls.
- Phase 4: add calendar agenda, RSVP, contacts/cards, account switcher, signatures, account removal, data export, and account deletion flows.
- Phase 5: evaluate suggested replies, Copilot-style assistance, cloud files, Teams/Skype/Zoom providers, encrypted/prevent-forwarding mail, enterprise app protection/MDM, and watch/Wear OS only after separate legal, provider, privacy, compliance, and platform approvals.
- Phase 6: complete support cases, offline/reconnect pass, accessibility pass, privacy/security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party help/legal/privacy URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
