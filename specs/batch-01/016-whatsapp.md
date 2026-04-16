# WhatsApp-Style Clone Spec

> Metadata
> - Inspiration app: WhatsApp
> - Category: Messaging, private calling, groups, status, channels, business messaging, payments where available
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-16.
> - Verification basis: exact public marketplace pages, WhatsApp feature pages, WhatsApp Help Center pages, WhatsApp legal/privacy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, phone-number registration, SMS/voice verification, device linking, contact import, backup restore, account deletion, group/community administration, calls, push payloads, business chats, payments, and Meta AI availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample contacts, message content, sticker packs, media, calling stack, encryption implementation, business catalog data, payment integrations, and AI provider behavior.

## Overview

Build an original private messaging app inspired by WhatsApp's public workflow: phone-number identity, contact-based chats, end-to-end-encrypted-style message UX, groups and communities, voice/video calls, voice notes, media and document sharing, status updates, channels, device linking, backups, privacy controls, account recovery, reporting/blocking, and optional business/payment surfaces.

The clone must not copy WhatsApp branding, screenshots, marketing copy, protected UI artwork, private protocols, proprietary encryption implementation, sticker packs, channel content, business directory data, payment rails, Meta AI behavior, or network contracts. Functional parity should be expressed through original product language, licensed providers, independently designed security architecture, and transparent limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first private messenger with phone-number onboarding, contact discovery, one-to-one chats, groups, rich media, voice notes, calls, status, channels, and settings.
- Preserve privacy expectations around end-to-end encryption, disappearing messages, chat lock, unknown caller controls, backup encryption, blocked contacts, reporting, and account recovery.
- Support multi-device access without implying use of WhatsApp's proprietary device-linking protocol or exact message synchronization behavior.
- Keep business messaging, payments, Meta AI, channels subscriptions, and region-dependent features explicitly gated until product, legal, platform, and provider reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a WhatsApp-branded app or imply affiliation with WhatsApp, Meta, businesses, channels, payment partners, or carriers.
- Do not reuse private WhatsApp APIs, reverse-engineer clients, replay encrypted traffic, copy Signal/WhatsApp protocol code outside its license, or claim cryptographic equivalence without a security review.
- Do not import real address books, message content, channel posts, business catalogs, stickers, or media into demos without explicit user consent and licensing.
- Do not ship production money movement, commerce, business automation, AI chat summarization, or public broadcast channels without separate legal, safety, privacy, and provider sign-off.
- Do not claim exact App Store, Play Store, phone-verification, native-call, backup-restore, push-notification, or device-linking parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/whatsapp-messenger/id310633997 | Official iOS listing, category, age rating, supported devices, privacy labels, current version notes, calls, groups, status, location, linked devices, in-app purchases, support/legal links | Verified 2026-04-16 |
| Google Play | https://play.google.com/store/apps/details?id=com.whatsapp | Official Android listing, package id, rating/download scale, content rating, data safety, messaging/calling/groups/location/status claims, support contact | Verified 2026-04-16 |
| WhatsApp Messaging | https://www.whatsapp.com/messaging | Inbox filters, pinned messages, formatting, translations, stickers/GIFs, reactions, video notes, voice notes, photos/videos, large file sharing | Verified 2026-04-16 |
| WhatsApp Calling | https://www.whatsapp.com/calling | Voice/video calls, end-to-end encrypted calling claim, group calls up to 32 people, screen sharing, call reactions, call scheduling, linked-device calling | Verified 2026-04-16 |
| WhatsApp Groups | https://www.whatsapp.com/groups | Group messaging, polls, events, RSVPs, large files, group calls, group icons/themes, planning and shared-interest use cases | Verified 2026-04-16 |
| WhatsApp Status | https://www.whatsapp.com/status | Status text/photo/video/voice updates, stickers/GIFs, mentions, likes/replies, 24-hour visibility, audience controls | Verified 2026-04-16 |
| WhatsApp Channels | https://www.whatsapp.com/channels | Channels directory, private follows, phone-number privacy, Updates tab separation, muted-by-default notifications, channel creation and engagement | Verified 2026-04-16 |
| WhatsApp Privacy | https://www.whatsapp.com/privacy | End-to-end encryption positioning, chat lock, disappearing messages, unknown-caller silence, backup encryption, last-seen/online controls | Verified 2026-04-16 |
| WhatsApp Security | https://www.whatsapp.com/security | Default privacy, spam/scam detection, security alerts, two-step verification, official-app warning, group safety, reporting, blocking, account recovery | Verified 2026-04-16 |
| End-to-End Encryption Help | https://faq.whatsapp.com/820124435853543 | Encryption expectation for messages/calls and security-code verification path | Verified 2026-04-16 |
| Encrypted Backup Help | https://faq.whatsapp.com/490592613091019 | Optional encrypted backup behavior for iCloud/Google Drive and recovery-key/password implications | Verified 2026-04-16 |
| Privacy Settings Help | https://faq.whatsapp.com/3307102709559968 | Last seen, online, profile photo, about, status, read receipt, group-add, live-location and blocked-contact privacy controls | Verified 2026-04-16 |
| Reporting And Blocking Help | https://faq.whatsapp.com/414631957536067 | Report/block model for people, messages, businesses, and safety review | Verified 2026-04-16 |
| WhatsApp Terms of Service | https://www.whatsapp.com/legal/terms-of-service | Account rules, acceptable use, third-party services, intellectual property, payments reference, availability caveats | Verified 2026-04-16 |
| WhatsApp Privacy Policy | https://www.whatsapp.com/legal/privacy-policy | Data practices, delivered-message storage principle, safety/security processing, Meta Companies relationship, user controls | Verified 2026-04-16 |

## Detailed Design

### Source-Backed Product Requirements

- The public mobile listings position WhatsApp as a free messaging and calling app with phone-number identity, contact discovery, no username requirement, slow-connection support, mobile/tablet/desktop access, groups, status, media, location sharing, and calls.
- iOS must support iPhone and iPad where the App Store listing exposes compatibility; Android must support phone/tablet behavior where the Play listing exposes compatibility.
- Phone-number onboarding must include country code selection, verification-code entry, resend/voice-code fallback, device-session creation, profile setup, and blocked/unsupported-region states.
- Contact discovery must be permission-gated, explain address-book use, support manual invite/share fallback, and never upload contacts without explicit consent.
- The default signed-in surface must prioritize chats, unread state, search, filters/lists, archived/locked chats, compose, status/updates, calls, and settings/profile access.
- One-to-one and group chats must support text, photos, videos, documents up to a configured large-file limit, voice notes, video notes, stickers/GIFs, reactions, formatting, translations, pinned messages, replies, forwarding, deletion, mute/archive, read receipts, delivery receipts, and search.
- Groups must support members, admins, invite links, add-member permissions, group icons/themes, polls, events/RSVPs, member tags, group safety controls, and group calls.
- Communities are in scope as a structured grouping of related groups, but V1 may ship them as a feature-flagged wrapper around group administration until hands-on verification confirms exact native behavior.
- Calls must support one-to-one and group voice/video calls, call links/scheduling, screen sharing, reactions/raise hand, silent drop-in group calls where enabled, network-quality states, and explicit microphone/camera permission handling.
- Status must support text/photo/video/voice updates, audience controls, mentions, likes/replies, view counts where appropriate, and 24-hour expiry.
- Channels must live apart from private chats, keep follows private, mute channel notifications by default, support directory/search, admin posting, reactions/polls/voice updates, and availability caveats.
- End-to-end encryption may be represented as a security design goal only after a cryptography/security review; V1 must not imply exact WhatsApp cryptographic parity unless independently implemented and audited.
- Backup and restore must distinguish local device storage, cloud provider backups, optional encrypted backups, recovery key/password loss, transfer between devices, and restore failure states.
- Business messaging, payments, Meta AI, channel subscriptions, and ads/no-ads purchases are not core V1. They must be disabled or region/provider-gated until separate reviews define lawful behavior.
- Account deletion, data/account info request, number change, device logout, two-step verification, support, terms, privacy policy, security advisories, report, and block paths must be reachable from settings.

## Core User Journeys

- New user installs the app, reviews original privacy and contact-permission education, registers a phone number, verifies by code, creates a profile, optionally grants contacts, and lands on chats.
- Returning user opens the app, sees recent chats and unread filters, resumes a conversation, sends text/media/voice note, receives delivery/read state, reacts, replies, pins, searches, or deletes a message.
- User creates a group, adds contacts, configures group name/icon/admin permissions, posts a poll/event, starts a group call, and handles a member leaving or being removed.
- User creates a status update with photo/video/text/voice, chooses an audience, receives replies/likes, and sees the update expire after 24 hours.
- User discovers or creates a channel, follows privately, receives muted-by-default updates in a separate Updates surface, reacts to a post, and unfollows without exposing their phone number.
- User starts a voice or video call, grants microphone/camera permissions, switches network conditions, shares screen when enabled, adds participants, reacts/raises hand, and exits with call history recorded.
- User links a desktop/tablet device through an authenticated device-linking flow, reviews linked devices, logs out a device, and handles inactivity or suspicious-login warnings.
- User enables disappearing messages, chat lock, two-step verification, backup encryption, last-seen/online privacy controls, unknown-caller silence, and blocked contacts from settings.
- User loses a phone, re-registers the number, restores from a backup if available, understands unrecoverable backup-key loss, and invalidates old sessions.
- User receives spam, scam, harassment, unwanted business contact, or suspicious group invite; they block/report, preserve relevant review metadata, and get a safety acknowledgement.
- User changes phone number or requests account deletion/data export, sees group/device/backup/business/payment consequences, confirms, and receives auditable completion or pending status.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone-number entry, consent, legal education | country code, phone number, terms/privacy consent | new, returning, unsupported region, loading | invalid number, rate limited, carrier blocked |
| Verification | SMS/voice/app-code verification and resend | OTP, resend, voice call, support | pending, verified, expired, resend available | SIM unavailable, too many attempts, code mismatch |
| Profile Setup | Display identity and optional avatar | display name, avatar, permissions | blank, valid, syncing | image denied, name invalid, sync failure |
| Chats Inbox | Recent conversations and filters | search, compose, filters/lists, archive, lock | empty, unread, groups, favorites, offline cached | corrupt cache, locked chat hidden, expired session |
| Contact Picker | Start chat/group/invite | contacts permission, search, invite link | granted, denied, manual invite | contact upload failure, blocked contact, duplicate |
| Chat Thread | One-to-one and group messaging | text, media, voice, reactions, reply, pin, search | sending, delivered, read, failed, deleted | disappearing message expired, blocked, unsafe link |
| Media/Document Composer | Attach photos, videos, camera, documents, location | camera, photos, files, location, caption | selected, uploading, attached, removable | too large, unsupported MIME, permission denied |
| Voice/Video Note Recorder | Quick rich message capture | mic, camera, hold/tap, playback | recording, locked, preview, sent | interruption, denied mic, duration limit |
| Group/Community Settings | Membership, admin, invite, safety | add/remove, role, invite link, permissions | member, admin, owner, community | invite abuse, only admin leaves, size limit |
| Calls | Voice/video calling and call history | call, add participant, camera, mic, screen share | ringing, active, muted, ended, missed | network drop, permission revoked, participant limit |
| Status Composer/Viewer | 24-hour updates | text, media, voice, audience, reply/like | draft, posted, viewed, expired | blocked viewer, unsupported media, takedown |
| Channels | Broadcast updates and directory | follow, search, react, create, admin post | directory, following, muted, admin | unavailable region, channel removed, subscription gated |
| Linked Devices | Device linking and session review | QR/code scan, logout, device trust | linked, pending, inactive, logged out | suspicious device, stale token, primary phone required |
| Backup/Restore | Local/cloud backup and encrypted backup controls | backup now, restore, key/password, passkey | enabled, disabled, restoring, encrypted | lost key, provider unavailable, partial restore |
| Privacy And Security | Privacy controls and account hardening | toggles, lists, PIN, unknown callers | saved, pending, inherited defaults | lockout, sync delay, unsupported platform |
| Report/Block/Support | Abuse handling and support | report reason, block, support message | submitted, blocked, under review | duplicate report, urgent harm, business dispute |
| Settings/Profile | Account, notifications, data, help, legal | profile, number change, delete, export | loaded, signed out, pending deletion | active payment, backup warning, support unavailable |

## Data Model

- `User`: phone-number identity, region, age/consent state, profile, locale, account lifecycle, deletion/export state, two-step verification status.
- `DeviceSession`: device id, platform, app version, push token, linked-device role, trust state, last active timestamp, logout/inactivity state.
- `ContactGrant`: permission state, normalized contact hashes, invite status, last sync timestamp, user-controlled deletion state.
- `Conversation`: one-to-one, group, community-announcement, channel, business, AI, or system thread with membership, mute/archive/lock, retention, and encryption policy.
- `Message`: sender, conversation, content parts, reply/forward/pin state, delivery/read receipts, disappearing expiry, edit/delete state, safety/report references.
- `ContentPart`: text, image, video, document, voice note, video note, sticker, GIF, location, contact card, poll, event, AI result, provider reference, scan state.
- `Group`: group metadata, icon/theme, admins, invite links, join permissions, member tags, safety controls, events, polls, and community membership.
- `Community`: related groups, announcement thread, admins, join/invite policy, discovery state, moderation/safety state.
- `CallSession`: participants, call type, schedule/link state, ringing/active/ended state, mute/camera/screen-share state, quality metrics, recording prohibition state.
- `StatusUpdate`: author, media/text/voice payload, audience list, mentions, replies/likes, view receipts, expiry, takedown state.
- `Channel`: admin identity, directory metadata, follower privacy policy, post stream, reactions/polls, subscription/availability flags, moderation state.
- `BackupRecord`: platform, provider, encrypted flag, key/passkey metadata, last backup timestamp, restore attempts, failure reason, retention state.
- `PrivacySettings`: last seen/online, profile photo, about, status, read receipts, group-add permissions, live location, blocked contacts, chat lock, disappearing defaults.
- `BusinessThread`: business profile, catalog availability, user opt-in state, privacy notice state, automation/provider disclosure, payment availability, dispute state.
- `PaymentIntent`: optional region-gated payment object with sender/receiver, provider, KYC/AML status, fraud checks, ledger state, refund/dispute state.
- `SafetyReport`: reported object, reason, reporter, evidence snapshot policy, decision, block state, escalation, appeal/support case.
- `AuditEvent`: append-only record for account, verification, privacy, backup, device, deletion/export, group admin, safety, business, payment, and support changes.

## API And Backend Contracts

- `POST /auth/phone/start`, `POST /auth/phone/verify`, `POST /auth/phone/resend`: phone-number verification with rate limits, carrier/provider failure codes, and region gates.
- `POST /auth/session`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: device-scoped auth with linked-device revocation and suspicious-login audit events.
- `GET /contacts/matches`, `POST /contacts/sync`, `DELETE /contacts/sync`: consented contact discovery using privacy-preserving hashes and manual invite fallback.
- `GET /conversations?cursor=&filter=&query=`, `POST /conversations`, `PATCH /conversations/:id`: inbox, filters/lists, archive/mute/lock, one-to-one/group/business/channel thread creation.
- `GET /conversations/:id/messages?cursor=`, `POST /conversations/:id/messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: message send/edit/delete with idempotency keys, receipts, disappearing expiry, and failure codes.
- `POST /messages/:id/reactions`, `POST /messages/:id/pin`, `POST /messages/:id/forward`, `POST /messages/:id/report`: message actions with authorization, audit, and abuse controls.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed media/document upload with size/type validation, malware scanning, transcoding, thumbnails, and retry states.
- `POST /groups`, `PATCH /groups/:id`, `POST /groups/:id/members`, `DELETE /groups/:id/members/:userId`: group lifecycle, admin roles, invite links, permissions, and safety checks.
- `POST /communities`, `PATCH /communities/:id`, `POST /communities/:id/groups`: community wrapper for related groups and announcement threads.
- `POST /calls`, `PATCH /calls/:id`, `POST /calls/:id/participants`, `POST /calls/:id/end`: call signaling abstraction with permission, participant, network, screen-share, and schedule/link states.
- `GET /status`, `POST /status`, `DELETE /status/:id`, `POST /status/:id/replies`: 24-hour status creation, audience controls, mentions, replies, likes, and expiry jobs.
- `GET /channels`, `POST /channels`, `POST /channels/:id/follow`, `POST /channels/:id/posts`, `POST /channels/:id/reactions`: channel directory, private follows, admin posts, muted notification defaults, availability flags.
- `GET /devices/linked`, `POST /devices/link/start`, `POST /devices/link/confirm`, `DELETE /devices/:id`: linked-device flow with QR/code challenge, trust review, inactivity expiry, and logout.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `GET /settings/security`, `PATCH /settings/security`: privacy, security, two-step verification, blocked contacts, unknown caller, and disappearing-message defaults.
- `GET /backups`, `POST /backups`, `POST /backups/restore`, `PATCH /backups/encryption`: provider-backed backup/restore contract with encrypted backup key/passkey states and unrecoverable-key failure.
- `POST /reports`, `POST /blocks`, `GET /support/cases/:id`: report/block/support lifecycle with safety escalation and privacy-preserving evidence policy.
- `POST /data-export`, `DELETE /account`, `POST /account/change-number`: privacy/account lifecycle with group, backup, device, business, and payment consequences.
- `GET /business/status`, `GET /payments/status`, `POST /payments/intents`: optional disabled-by-default contracts for business messaging and payments; never trust client-only payment state.

## Realtime, Push, And Offline Behavior

- Message delivery uses websocket/SSE or push-assisted sync with canonical server reconciliation after missed events; duplicate sends must collapse by idempotency key.
- The client may cache conversation headers, recent messages, media thumbnails, settings, linked-device summaries, status metadata, and pending outgoing messages.
- End-to-end encrypted design, if implemented, must make the server unable to inspect message bodies; metadata needed for routing, abuse prevention, and delivery must be minimized and documented.
- Offline sends can queue text, low-risk reactions, drafts, and media upload intents; account deletion, group admin changes, reports, payments, and destructive privacy actions require server confirmation.
- Delivery/read receipts must handle offline recipients, blocked users, privacy-disabled read receipts, disappearing messages, multi-device sync, and clock skew.
- Media uploads must resume or fail visibly; unscanned, unsupported, expired, deleted, or over-limit attachments cannot be sent.
- Calls must tolerate poor connectivity, permission revocation, app backgrounding, Bluetooth route changes, device sleep, participant joins/leaves, and signaling reconnect.
- Status and channel posts must expire, mute, or invalidate cached entries based on visibility, deletion, takedown, unfollow, block, and age/region availability.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and content-minimized; private message bodies must be omitted or encrypted unless the user explicitly enables previews.
- Backup/restore must be resumable, cancellable, provider-aware, and explicit when encrypted-backup credentials are lost or unavailable.

## Permissions, Privacy, And Safety

- Contacts, camera, microphone, photos/files, notifications, location, Bluetooth/local network, and screen recording permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw message text, media bytes, contact lists, precise location, call audio/video, payment credentials, backup keys, and private business/customer content.
- Phone-number identity, contact discovery, and invite flows must include clear consent, revocation, and data-deletion paths.
- End-to-end encryption language must be reviewed by security/legal owners and must distinguish audited cryptographic guarantees from UI privacy expectations.
- Backup encryption must clearly explain provider storage, optional encryption, recovery-key/passkey loss, and restore limitations.
- Privacy controls must include last seen/online, profile photo, about, status audience, read receipts, group-add permissions, blocked contacts, live location, disappearing messages, chat lock, and unknown caller handling.
- Safety controls must include spam/scam detection, suspicious account alerts, official-app warnings, report/block, group-invite controls, message forwarding limits, unsafe-link warnings, and account recovery.
- Group, community, channel, business, AI, and payment surfaces require additional abuse prevention because they can amplify spam, scams, impersonation, misinformation, harassment, and financial fraud.
- Business chats must disclose when a business or third-party provider may process messages differently from personal chats and must provide block/report/opt-out controls.
- Payments are launch-blocked unless KYC/AML, fraud, dispute, refund, tax, region, platform, and provider requirements are signed off.
- Meta AI-style features are launch-blocked unless AI privacy, training, summarization, hallucination, safety, and provider-retention controls are designed and tested.
- Launch owner: product/security lead for messaging privacy, cryptography owner for encryption claims, privacy owner for contacts/backups/data rights, safety owner for spam/scams/abuse, payments owner for money movement, AI owner for assistant features.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, phone verification requested/verified/failed, contact permission granted/denied, chat created, message send succeeded/failed, media upload failed, call started/ended, group created, status posted, channel followed, report submitted, block created, privacy setting changed, backup started/restored, account deletion requested.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of message bodies, contact names, phone numbers, media contents, precise location, or call content.
- Delivery and calling telemetry must separate operational reliability metrics from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original business tooling, optional channel subscriptions, storage upgrades, or ad-free bundles later, but pricing, naming, offers, app-store purchase copy, and Meta/WhatsApp commerce positioning must be original.
- Business messaging must support opt-in, rate limits, templates, user block/report, automation disclosure, and provider audit logs before monetization.
- Payments and commerce analytics must treat KYC status, transaction state, disputes, refunds, fraud holds, and chargebacks as sensitive and never trust client-only state.
- Channel subscription or no-ads purchases must reconcile through server-side receipts/webhooks with duplicate, delayed, refund, restore, family-sharing, and platform-mismatch cases.

## Edge Cases

- First launch offline, unsupported OS, unavailable SIM, SMS blocked, roaming number, rate-limited verification, changed phone number, or blocked region.
- Contact permission denied, limited contacts, duplicate normalized numbers, stale address book, blocked contact, or deleted contact reappearing through a group.
- Message sent while offline, duplicate tap, expired disappearing message, edited/deleted while replying, forwarded message limit reached, or read receipts disabled.
- Media too large, unsupported codec, malware scan failure, upload expires mid-send, recipient lacks storage, live location permission revoked, or location sharing remains active unexpectedly.
- Group has no remaining admins, invite link leaked, spam wave joins, member tag changes, community group is removed, or admin/moderation action races with message delivery.
- Call starts with denied microphone/camera, participant joins from linked device, screen share permission prompt fails, network handoff drops media, or group call exceeds participant limit.
- Backup encrypted with lost key/passkey, cloud provider unavailable, restore to new platform, backup older than account change, or encrypted backup disabled after prior encrypted backup.
- Linked device is stolen, inactivity timeout logs it out, primary phone is unavailable, QR challenge expires, or user receives a suspicious-link alert.
- Channel removed, admin banned, follower privacy leak risk, region unavailable, muted notifications ignored, or paid subscription refunded after content access.
- Business chat changes provider, payment fails after message confirmation, scam report references a business, account deletion requested with pending payment/dispute, or legal retention blocks immediate erasure.

## Test Plan

- Unit tests for phone-number validation, verification state machine, resend/rate limits, session creation, linked-device trust, and account recovery.
- Unit tests for conversation/message state: send, retry, idempotency, receipts, read-receipt privacy, edit/delete, disappearing expiry, reactions, pins, forwards, and search indexing.
- Unit tests for group/community roles, invite links, admin permissions, member tags, polls, events, and group-safety controls.
- Contract tests for every API route, including pagination, authorization errors, upload states, receipt states, linked-device challenges, backup errors, and privacy settings.
- Integration tests for onboarding, contact permission granted/denied, one-to-one chat, group creation, media sharing, voice note, status post, channel follow, block/report, and account deletion request.
- Calling tests for mic/camera denied/granted/revoked, one-to-one voice/video, group participant limit, screen-share prompt, network drop, reconnect, and call history.
- Backup/restore tests for disabled backup, unencrypted provider backup, encrypted backup, wrong key, lost key, passkey unavailable, partial restore, and cross-device restore blocker.
- Privacy tests for last seen/online, profile photo, status audience, read receipts, blocked contacts, live location stop, chat lock, disappearing defaults, and unknown caller silence.
- Safety tests for spam/scam, suspicious takeover, unofficial-client warning, unsafe link, report/block, group invite abuse, business abuse, payment fraud placeholder, and channel takedown.
- Offline tests for cached inbox, queued outgoing text, queued media upload, duplicate send collapse, stale receipts, corrupt cache, app termination, and reconnect reconciliation.
- Notification tests for opt-in, denied, revoked, quiet hours, preview disabled, group mute, channel muted default, call notification, deep link, and sensitive-payload redaction.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, captions/transcripts for voice/video where available, large tap targets, and keyboard/external input on tablets.
- Manual verification tests: native iOS/Android screenshots, phone verification, contacts import, backup restore, linked devices, one-to-one/group calls, status, channels, business chats, payments, Meta AI availability, push payloads, account deletion, and recovery on real devices/accounts.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without WhatsApp assets, copy, sticker packs, private APIs, proprietary encryption code, channel content, business data, payment rails, or Meta AI behavior.
- New users can register by phone number, verify, create a profile, control contact permission, and start a chat with an invited or discovered contact.
- Returning users can send, receive, search, react to, pin, delete, and forward messages with deterministic delivery/read states and privacy controls.
- Groups support admins, invite links, members, polls/events, media sharing, group calls, and abuse controls.
- Status, channels, calls, linked devices, backups, privacy settings, report/block, data export, account deletion, and account recovery are represented in screens, APIs, and tests.
- End-to-end encryption, backups, contact discovery, business messaging, payments, and AI features include explicit privacy/security language and launch blockers where not independently verified.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which original cryptography stack and independent security-review process will back V1 encryption claims?
- Which phone verification, push notification, media storage, calling, TURN/SFU, translation, sticker/GIF, and backup providers will be used?
- Will V1 support signed-out usage at all, or require phone-number verification before every meaningful surface?
- Are communities, channels, business messaging, payments, Meta AI-style assistance, and channel subscriptions in V1, or explicitly deferred?
- Which launch regions determine age, carrier, phone-number, payments, and data-rights requirements?

## Build Plan

- Phase 1: scaffold app shell, phone-number auth, profile setup, contact-permission flow, chats inbox, one-to-one text messaging, delivery state, privacy-safe analytics, and support/legal links.
- Phase 2: add media/document uploads, voice notes, reactions, replies, pins, search, archive/mute/lock, disappearing messages, block/report, and offline queued sends.
- Phase 3: add groups, group settings, admin roles, invite links, polls, events, group safety controls, and group media/call readiness checks.
- Phase 4: add calls with provider-backed signaling/media, call history, permission handling, group-call limits, screen-share flag, reconnect behavior, and notification handling.
- Phase 5: add status, channels, linked devices, backup/restore, encrypted-backup controls, privacy/security settings, two-step verification, and account recovery.
- Phase 6: add account deletion/export, change-number flow, contact data deletion, support cases, accessibility pass, offline/reconnect pass, privacy/security review, and manual native verification.
- Phase 7: evaluate business messaging, payments, channel subscriptions, and Meta AI-style features only after separate legal, provider, safety, privacy, fraud, and platform-policy approvals.

## Next Steps

- Use this spec as the pattern for upgrading `026-google-maps.md`, `033-airbnb.md`, and the remaining architecture-teaching specs.
- Resolve the manual verification blockers before claiming one-for-one native parity.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
