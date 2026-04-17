# Gmail-Style Clone Spec

> Metadata
> - Inspiration app: Gmail
> - Category: Email, inbox categories, labels, threaded conversations, search, attachments, spam/phishing protection, smart compose/reply, chat/meet integrations, Workspace administration, and Google account data controls
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Gmail Help pages, Google Workspace/Gmail support pages, Google privacy/legal pages, and public account data export/deletion documentation.
> - Manual verification blockers: native iOS/Android screen capture, Gmail/Google account onboarding, multi-provider account connection, push payloads, inbox categories, labels, filters, threaded conversation behavior, spam/phishing classification, Gemini availability, Chat/Spaces/Meet integrations, Google Calendar invite handling, attachments, confidential/encrypted mail behavior, Workspace admin controls, data export, Gmail service deletion, account deletion, Wear OS behavior, and regional/enterprise restrictions still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, mailbox data, contacts, calendar data, AI provider behavior, spam models, integrations, storage providers, and security implementation.

## Overview

Build an original mobile email app inspired by Gmail's public workflow: multi-account inbox, categories, search, labels, threaded conversations, compose/reply/forward, attachments, swipe actions, spam/phishing protection, notifications, calendar invites, Chat/Meet-style collaboration entry points, smart suggestions, AI assistance, and account data controls.

The clone must not copy Gmail branding, screenshots, marketing copy, private Google APIs, Google account data, spam models, Gemini behavior, Workspace admin policy, Chat/Meet services, proprietary search ranking, or Google UI artwork. Functional parity should be expressed through original product language, standards-based email providers or licensed APIs, independently designed filtering/search, and transparent limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first email experience with account onboarding, inbox, categories/labels, search, compose/reply/forward, attachments, thread view, swipe actions, notifications, settings, and support/legal flows.
- Preserve privacy and security expectations around mailbox content, attachments, spam/phishing, dangerous links, account access, smart features, AI assistance, data export, Gmail deletion, and account deletion.
- Support collaboration entry points such as chat/spaces/meet/calendar and AI assistance as feature-flagged extensions rather than core V1 assumptions.
- Keep Gemini, Chat/Spaces, Meet, Workspace admin, confidential/encrypted mail, third-party account sync, Wear OS, and provider-specific filtering explicitly gated until product, legal, privacy, security, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, offline behavior, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Gmail-branded app or imply affiliation with Google, Gmail, Google Workspace, Gemini, Google Chat, Google Meet, Google Calendar, or Google account services.
- Do not reuse private Gmail APIs, scrape mailboxes, copy spam/phishing models, import real user mail, copy AI outputs, or claim Gmail-compatible ranking, filtering, or security behavior.
- Do not ship production AI assistance, Chat/Meet/Spaces, confidential mode, Workspace admin, or multi-provider OAuth aggregation without separate legal, privacy, security, compliance, and provider sign-off.
- Do not claim exact App Store, Play Store, native-device, push, spam, category, label, AI, calendar, data export, Gmail deletion, account deletion, Workspace, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/gmail-email-by-google/id422689480 | Official iOS listing, category, supported devices, multiple account support, notifications, search, labels, spam protection, Chat/Meet, Gemini, in-app purchases, privacy labels | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.google.android.gm | Official Android listing, package id, ads/data safety, downloads/rating scale, AI, multi-account, search, Wear OS, security, and mailbox feature claims | Verified 2026-04-17 |
| Gmail Help Center | https://support.google.com/mail/?hl=en | Canonical help inventory for Gmail setup, inbox, compose, labels, spam, settings, account/data controls, and troubleshooting | Verified 2026-04-17 |
| Gmail Inbox Categories | https://support.google.com/mail/answer/3094499?co=GENIE.Platform%3DiOS&hl=en | Inbox category behavior, Primary/Social/Promotions/Updates/Forums, mobile settings, category constraints, and sorting correction | Verified 2026-04-17 |
| Gmail Labels | https://support.google.com/mail/answer/118708?co=GENIE.Platform%3DiOS&hl=en | Label creation, edit/delete, label-vs-folder behavior, and mobile label management | Verified 2026-04-17 |
| Gmail Data Export | https://support.google.com/mail/answer/10016932?hl=en | Gmail export scope, labels, messages, attachments, settings, encrypted-message caveats, and Workspace admin export notes | Verified 2026-04-17 |
| Remove Gmail | https://support.google.com/mail/answer/61177?co=GENIE.Platform%3DAndroid&hl=en | Gmail service deletion, 30-day email/settings deletion, alternate email requirement, and work/school administrator caveats | Verified 2026-04-17 |
| Delete Google Account | https://support.google.com/mail/answer/32046 | Google account deletion consequences for Gmail, Drive, Calendar, Play, subscriptions, and recovery caveats | Verified 2026-04-17 |
| Google Privacy Policy | https://policies.google.com/privacy?hl=en-US | Google data handling, privacy controls, export/delete rights, retention, personalization, and safety/security use | Verified 2026-04-17 |
| Google Terms of Service | https://policies.google.com/terms?hl=en-US | Account/service rules, user responsibilities, content/license baseline, service availability, and policy caveats | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Gmail around secure email, real-time notifications, multiple accounts, robust search, spam/phishing/malware protection, labels, threaded conversations, swipe actions, Calendar invite responses, Chat/Spaces/Meet, Gemini features, and Wear OS support.
- Onboarding must support first-party account sign-in, third-party email provider connection where enabled, OAuth consent, notification permission education, contacts/calendar permission education, legal/privacy links, and blocked account/provider states.
- The default signed-in surface must support inbox categories, all inbox, labels/folders, account switcher, search, compose, unread/filter controls, spam/trash, settings, help, and storage/account state.
- Inbox categories must support Primary/Social/Promotions/Updates/Forums-style automatic routing, user correction, notification implications, limits, and disabled/unsupported states.
- Labels must support creation, rename, delete, message assignment, search, notification preferences where enabled, and label-vs-folder behavior where a message can appear in multiple labels.
- Thread view must support conversation grouping, unread state, sender list, attachments, inline replies, reply/reply-all/forward, quoted content, stars/importance, report spam/phishing, archive/delete, and blocked/unavailable messages.
- Compose must support recipients, cc/bcc, subject, body, formatting, attachments, drafts, discard, undo send, schedule/send later where enabled, smart suggestions, and validation.
- Search must support keyword, sender, attachments, labels, categories, dates, unread/starred/important, spelling suggestions where enabled, and privacy-safe result ranking.
- Spam/phishing protection must be modeled as an independent classification pipeline with user override, warning banners, dangerous-link handling, report-not-spam, blocked sender, and admin policy hooks.
- AI, Chat/Spaces, Meet, Calendar, Workspace admin, confidential mode, encryption, and Wear OS are non-core V1 extensions with separate capability, privacy, and provider reviews.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Store accounts, mailboxes, messages, threads, labels, categories, attachments, drafts, filters, spam decisions, calendar invite state, AI outputs, and audit events under explicit ownership and deletion/export rules.
- Keep email, chat, meet, calendar, AI, Workspace/admin, Wear OS, and third-party provider modules separated by feature flags, storage scopes, analytics scopes, and security review.
- Model email provider, OAuth, push, attachment storage, search index, spam classifier, calendar, AI, and billing providers as adapters with feature flags, timeout behavior, provider error mapping, and privacy review.
- Mailbox writes and provider sync must be server-authoritative; clients cannot grant account, mailbox, AI, admin, or billing privileges from local state alone.
- Analytics and logs must not include raw email bodies, subject lines, recipient addresses, attachments, contacts, calendar descriptions, AI prompts/outputs, search queries, payment credentials, or provider tokens.
- Support/admin tooling must include role-based access, redaction, legal hold, retention, escalation reasons, immutable audit events, and separate treatment for consumer and Workspace-like accounts.

## Core User Journeys

- New user installs the app, signs in or connects an account, reviews OAuth/privacy/notification education, and lands in the inbox.
- Returning user opens Primary inbox, switches category or label, searches mail, opens a thread, replies, archives, labels, reports spam, or deletes a message.
- User composes an email, adds recipients, attaches a file, saves a draft offline, sends after reconnect, undoes send where enabled, and confirms server state.
- User receives a phishing or dangerous-link warning, reports or marks safe, and sees future sender/message handling update deterministically.
- User creates or edits a label, applies it to messages, filters by label, removes a label, and understands that deleting a label does not necessarily delete the message.
- User responds to a calendar invite from an email, sees accepted/tentative/declined state, and handles provider or permission failure.
- User switches accounts and sees separate inboxes, notifications, labels, signatures, sync errors, and account removal consequences.
- User enables AI assistance or smart suggestions where available, sees disclosure and opt-out, edits generated text, and handles provider/license/region limits.
- User exports mailbox data, removes Gmail-style service, deletes account, or opens support and receives clear consequences for messages, attachments, settings, and other services.
- User loses connectivity, reads cached threads, drafts mail, queues sends where safe, and resolves sync conflicts after reconnect.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, OAuth consent, legal | sign in, provider, terms/privacy | new, returning, provider-linked | OAuth denied, admin block, region block |
| Account Switcher | Multi-account navigation | account, add, remove, sync | single, multiple, syncing | token expired, account removed, provider outage |
| Inbox/Categories | Primary mailbox surface | category, refresh, search, compose | empty, unread, categorized, offline cached | category disabled, sync error, storage full |
| Label/Folder List | Labels, spam, trash, sent, drafts | label, edit, create, delete | default, custom, synced | label conflict, provider mismatch, deleted label |
| Search | Mailbox search and filters | query, sender, label, date, attachment | results, no results, suggestions | index stale, provider timeout, query too broad |
| Thread View | Conversation reading/actions | reply, archive, label, spam, delete | unread, read, expanded, collapsed | missing message, unsafe link, attachment blocked |
| Compose | Create/reply/forward email | recipients, body, attachment, send | draft, sending, sent, failed | invalid recipient, large attachment, offline |
| Attachment Picker | Files/photos/drive-style providers | file, photo, provider, remove | selected, uploading, attached | too large, malware scan, permission denied |
| Spam/Phishing Warning | Safety intervention | report, mark safe, block | warning, reported, overridden | false positive, dangerous link, admin lock |
| Calendar Invite | RSVP and calendar handoff | accept, tentative, decline | pending, accepted, declined | stale invite, calendar denied, provider conflict |
| Smart Features/AI | Suggestions and writing assistance | enable, prompt, insert, edit | disabled, active, limited | region block, license missing, unsafe output |
| Notifications | Push and category preferences | toggle, account, category | enabled, focused, disabled | OS denied, quiet hours, provider delay |
| Settings/Privacy | Account, data, signatures, export/delete | toggles, export, delete, support | loaded, managed, pending | admin lock, service delete warning, legal hold |
| Help/Support | Bugs, abuse, account recovery | reason, evidence, submit | submitted, under review | duplicate, support outage, urgent security |

## Data Model

- `User`: account identity, locale, region, age/consent state, deletion/export state, trust/safety restrictions, and admin/managed-account state.
- `EmailAccount`: provider, email address, OAuth token reference, sync state, storage/quota, notification settings, signatures, and removal state.
- `Mailbox`: account, system folders, custom labels, category settings, sync cursor, provider capabilities, and retention policy.
- `EmailThread`: normalized subject, participants, latest message, unread/starred/important state, labels, category, sync version, and deletion state.
- `EmailMessage`: provider id, thread, headers, sender/recipients, subject metadata, body reference, attachments, spam/phishing state, read state, and lifecycle.
- `Attachment`: file name, MIME, size, storage provider, malware scan state, download/upload state, preview state, and deletion/export metadata.
- `Draft`: compose state, recipients, subject, body reference, attachments, reply/forward references, autosave state, send schedule, and conflict state.
- `Label`: name, color, system/custom flag, visibility, notification preference, message membership, and delete/rename state.
- `CategoryRule`: category, classifier version, user correction, confidence, notification behavior, and disabled state.
- `SpamDecision`: classifier result, warning reason, user override, report state, sender reputation, dangerous-link state, and admin policy.
- `CalendarInvite`: event uid, organizer, attendees, RSVP state, calendar provider, update sequence, and conflict state.
- `SmartFeatureState`: suggestion type, provider, user opt-in, prompt metadata, output metadata, correction state, retention rule, and region/license blockers.
- `SafetyReport`: reported message/sender/link, reason, reporter, evidence policy, decision, escalation, appeal/support case.
- `AuditEvent`: append-only record for auth, account sync, mailbox writes, labels, spam overrides, AI, export/delete, admin policy, and safety actions.

## API And Backend Contracts

- `POST /auth/session`, `POST /providers/oauth/start`, `POST /providers/oauth/callback`, `DELETE /auth/session`: account/session/provider lifecycle with admin, region, and deletion gates.
- `GET /accounts`, `POST /accounts`, `PATCH /accounts/:id`, `DELETE /accounts/:id`: account connection, sync status, notification settings, token refresh, and removal.
- `GET /mailboxes/:accountId/threads?cursor=&category=&label=`, `GET /threads/:id`, `GET /messages/:id`: mailbox reads with pagination, sync cursors, stale-data indicators, and provider errors.
- `POST /messages/send`, `POST /drafts`, `PATCH /drafts/:id`, `DELETE /drafts/:id`: compose, autosave, send, undo/schedule where enabled, idempotency keys, and validation errors.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed attachment upload with MIME/size validation, malware scanning, previews, and retry states.
- `POST /messages/:id/actions`: archive, delete, trash, mark read/unread, star, important, report spam/phishing, block sender, and undo where supported.
- `GET /labels`, `POST /labels`, `PATCH /labels/:id`, `DELETE /labels/:id`, `POST /labels/:id/messages`: label lifecycle and message membership with provider capability errors.
- `GET /search?query=&filters=&cursor=`: mailbox search with query, labels, categories, attachment flag, date ranges, account context, safe-mode, and stale-index indicators.
- `POST /calendar/rsvp`, `GET /calendar/invites/:id`: RSVP and calendar sync with provider conflict, stale sequence, and permission errors.
- `POST /smart/replies`, `POST /smart/compose`, `POST /ai/drafts`: feature-flagged suggestions/AI with opt-in, region/license, safety checks, and no raw training-by-default assumption.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `POST /reports`, `POST /data-export`, `DELETE /gmail-service`, `DELETE /account`: privacy, report, export, service delete, and account delete workflows.

## Realtime, Push, And Offline Behavior

- Mail sync uses provider webhooks, push-assisted sync, or polling with canonical server reconciliation after missed events.
- The client may cache inbox/thread summaries, recent messages, attachments metadata, labels, settings, drafts, and pending actions for offline reads.
- Offline actions can queue drafts, label changes, archive/delete, mark read/unread, and low-risk replies; account deletion, service deletion, provider connect, spam reports, AI prompts, and large attachment sends require server/provider confirmation.
- Queued sends must use idempotency keys and show pending, sent, failed, canceled, and conflict states.
- Search can fall back to cached index with stale indicator; provider/server search must reconcile after reconnect.
- Push notifications must be opt-in, account/category-controlled, quiet-hour aware, and content-minimized; enterprise/admin policy may suppress previews.
- Spam/phishing state must update cached messages after classifier, provider, or user override changes.

## Permissions, Privacy, And Safety

- Contacts, calendar, photos/files, notifications, camera/scanner, microphone/Meet, and storage permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw email bodies, subject lines, recipient addresses, attachments, contacts, calendar descriptions, search queries, AI prompts/outputs, provider tokens, and payment credentials.
- Smart features and AI must disclose what mailbox data is used for the feature, opt-in/opt-out state, region/license limits, retention, and correction path.
- Spam/phishing warnings must be visible, reversible where safe, and auditable without exposing raw mail content to analytics.
- Data export, Gmail-style service deletion, account deletion, label deletion, trash retention, spam retention, and provider-specific retention must be clear before irreversible actions.
- Third-party account providers must disclose data access, token scopes, revocation, provider deletion limits, and sync failure behavior.
- Safety controls must include phishing, malware, dangerous links, spam, impersonation, account takeover, abusive mail, child safety, and support escalation.
- Launch owner: mail sync owner for provider correctness, security owner for account/mailbox protection, privacy owner for mailbox/AI/data rights, safety owner for spam/phishing/abuse, compliance owner for Workspace-like admin.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, account connected/removed, inbox viewed, category changed, search performed with coarse filter only, compose started/sent/failed, attachment upload failed, spam reported, label changed, RSVP submitted, smart feature toggled, export requested, service delete requested, account delete requested.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of mail content, subject, participants, attachment names, search text, contacts, calendar details, or AI content.
- Sync reliability metrics must separate operational telemetry from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original premium storage, AI assistance, business mail hosting, admin controls, or enhanced security later, but pricing, names, offers, app-store copy, and Google/Gmail positioning must be original.
- AI, Workspace admin, third-party provider aggregation, and premium storage are launch-blocked unless billing, privacy, compliance, fraud, tax, region, and platform requirements are signed off.

## Edge Cases

- First launch offline, unsupported OS, OAuth denied, provider unavailable, account locked, admin blocked, too-young account, blocked region, expired token, or storage quota exceeded.
- Category classifier misroutes mail, user corrects category, categories disabled by inbox type, inbox has too many messages, or notifications only apply to a category.
- Thread contains deleted/missing messages, duplicate provider ids, stale reply references, huge quoted content, or blocked remote images.
- Attachment too large, malware scan fails, provider file permission denied, upload interrupted, download expired, preview unsupported, or attachment removed after send.
- Spam/phishing false positive, dangerous link redirect changes, sender spoofing, unsubscribe abuse, report-not-spam conflict, or admin policy overrides user choice.
- Draft autosave conflict across devices, offline send duplicates, undo-send window expires, scheduled send fails, or recipient validation changes after reconnect.
- Calendar invite stale, organizer updates event while user replies, calendar permission denied, timezone changes, or work/school policy blocks RSVP.
- AI suggestion is inaccurate, unsafe, unavailable, region-blocked, license-gated, or user expects generated text to remain private under a different provider policy.
- Gmail-style service deletion requested without alternate email, account deletion impacts other services, export excludes deleted mail, or legal retention applies.

## Test Plan

- Unit tests for account/provider OAuth, token refresh, mailbox sync, categories, labels, thread grouping, compose state, attachment validation, idempotency keys, and privacy-safe analytics.
- Unit tests for spam/phishing classification state, dangerous-link warnings, user overrides, report spam/not spam, blocked sender, and admin policy.
- Unit tests for data export, Gmail-style service deletion, account deletion, label deletion, trash/spam retention, and provider retention warnings.
- Contract tests for every API route, including pagination, sync cursors, authorization errors, provider errors, upload states, search states, AI states, report states, and privacy settings.
- Integration tests for onboarding, account connect/remove, category inbox, label management, search, thread reply, attachment send, spam report, calendar RSVP, and account deletion request.
- Offline tests for cached inbox/thread reads, queued drafts, queued archive/delete/label changes, duplicate send collapse, stale search index, corrupt cache, app termination, and reconnect reconciliation.
- Privacy tests for notification previews, analytics redaction, provider token revocation, data export, service deletion, account deletion, smart feature opt-out, and support evidence.
- Safety tests for phishing, malware attachment, dangerous link, impersonation, spam flood, abusive mail, account takeover warning, child safety escalation, duplicate report, and appeal/support flow.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, keyboard/external input, large tap targets, and attachment alternatives.
- Manual verification tests: native iOS/Android screenshots, Gmail/Google account onboarding, multi-provider sync, push payloads, categories, labels, filters, threads, Gemini, Chat/Meet, Calendar, confidential/encrypted mail, Workspace admin, data export, service deletion, account deletion, Wear OS, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Gmail assets, private APIs, mailbox data, spam models, Gemini behavior, Google account services, Chat/Meet services, or Workspace policy defaults.
- New users can connect an account, review permissions, reach inbox, switch categories/labels, search, compose, attach, send, and recover from offline or provider errors.
- Returning users can read, reply, forward, archive, delete, label, report spam/phishing, and manage notifications with deterministic sync and privacy states.
- AI, Chat/Spaces, Meet, Calendar, confidential/encrypted mail, Workspace admin, third-party account aggregation, and Wear OS include explicit feature flags and launch blockers where not independently verified.
- Settings include account management, signatures, labels, notifications, smart features, data export, Gmail-style service deletion, account deletion, support, terms, and privacy policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which email provider stack will back V1: direct IMAP/SMTP, provider APIs, hosted mailbox, or a custom mail service?
- Which spam/phishing, search, attachment scanning, push notification, calendar, AI, and storage providers will be used?
- Will V1 support multi-provider accounts, inbox categories, labels, AI writing/search, Chat/Meet, Calendar RSVP, confidential/encrypted mail, and Workspace-like admin, or explicitly defer them?
- Which launch regions determine mailbox retention, data export/delete, spam scanning, AI, age requirements, and enterprise compliance requirements?
- How will the downstream team distinguish raw mailbox content, attachments, search indexes, AI inputs/outputs, provider tokens, and support evidence in storage and privacy tooling?

## Build Plan

- Phase 1: scaffold app shell, account/OAuth, inbox, category/label navigation, thread view, compose/send, drafts, privacy-safe analytics, and support/legal links.
- Phase 2: add attachments, search, swipe actions, archive/delete/mark read, notifications, offline queued drafts, and reconnect reconciliation.
- Phase 3: add labels management, spam/phishing warnings, dangerous-link handling, blocked sender, report spam/not spam, and safety controls.
- Phase 4: add calendar invite RSVP, contacts autocomplete, signatures, account switcher, service export/delete, and account deletion flows.
- Phase 5: evaluate AI assistance, Chat/Spaces/Meet, third-party provider aggregation, confidential/encrypted mail, Workspace admin, and Wear OS only after separate legal, provider, privacy, compliance, and platform approvals.
- Phase 6: complete support cases, offline/reconnect pass, accessibility pass, privacy/security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party help/legal/privacy URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
