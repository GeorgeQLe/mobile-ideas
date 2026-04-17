# Signal-Style Clone Spec

> Metadata
> - Inspiration app: Signal
> - Category: Private messaging, encrypted calls, groups, stories, local/device backup, privacy controls
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Signal Support articles, Signal legal/privacy pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, phone-number registration, SMS/voice verification, username/phone-number privacy behavior, PIN and registration lock, device transfer, secure backups, group administration, disappearing messages, pinned messages, stories, calls, donations/in-app purchases, push payloads, account deletion, and real-device accessibility behavior still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample contacts, message content, sticker packs, calling stack, backup implementation, donation/payment flow, policies, and encryption implementation.

## Overview

Build an original privacy-centered messenger inspired by Signal's public workflow: phone-number onboarding, private one-to-one and group messages, end-to-end-encrypted-style UX, usernames/phone-number privacy where available, Signal PIN-like account recovery, registration lock, disappearing messages, pinned messages, polls, stories, voice/video calls, local or secure backups, linked desktop/tablet behavior, donations, reporting, and account lifecycle controls.

The clone must not copy Signal branding, screenshots, marketing copy, protected UI artwork, private protocols, proprietary security implementation, sticker packs, support copy, donation flows, or backup implementation. Functional parity should be expressed through original product language, independently designed security architecture, audited cryptography, licensed providers, and clear limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first private messenger with phone-number onboarding, profile setup, one-to-one chats, groups, rich media, voice notes, calls, stories, search, settings, and account controls.
- Preserve privacy expectations around minimal data collection, encrypted messaging/calling, PIN/registration lock, phone-number privacy, disappearing messages, sealed-sender-like disclosure, local backups, block/report, and account deletion.
- Support secure device transfer and backup concepts without implying use of Signal's proprietary operational service, exact Signal Protocol behavior, or one-for-one backup recovery.
- Keep donations, secure backups, usernames, stories, polls, linked devices, and group calling explicitly test-gated until product, security, legal, platform, and provider reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Signal-branded app or imply affiliation with Signal Foundation, Signal Messenger LLC, or Signal's security team.
- Do not reuse private Signal APIs, reverse-engineer clients, replay encrypted traffic, copy Signal Protocol code outside its license, or claim cryptographic equivalence without an independent security audit.
- Do not import real address books, message content, local backups, stories, stickers, or media into demos without explicit user consent and licensing.
- Do not ship production donation payments, secure backups, account transfer, usernames, or linked-device support without separate legal, privacy, security, provider, and platform review.
- Do not claim exact App Store, Play Store, verification, native-call, backup, PIN, push-notification, donation, deletion, or accessibility parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/signal-private-messenger/id874139669 | Official iOS listing, category, age rating, supported devices, privacy label, in-app purchase, version notes, calls, groups, stories, and support/legal links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms | Official Android listing, package id, rating/download scale, data safety, in-app purchases, messaging, calls, group limits, stories, and support contact | Verified 2026-04-17 |
| Signal Support | https://support.signal.org/hc/en-us | Official support entry point, categories, promoted backup/device-transfer, safety, and troubleshooting articles | Verified 2026-04-17 |
| Signal Legal | https://signal.org/legal/ | Terms of service, privacy policy, user rights, account/service rules, and Signal's privacy commitments | Verified 2026-04-17 |
| Signal PIN | https://support.signal.org/hc/en-us/articles/360007059792-Signal-PIN | PIN purpose, profile/settings/contact/block-list recovery, registration lock, and lockout caveats | Verified 2026-04-17 |
| Backup and Restore Messages | https://support.signal.org/hc/en-us/articles/360007059752-Backup-and-Restore-Messages | Local message storage, device transfer requirements, unsupported restoration cases, and old-device dependency | Verified 2026-04-17 |
| Android On-Device Backups | https://support.signal.org/hc/en-us/articles/10066926526362-Android-On-Device-Backups | Encrypted on-device backup file, 30-digit passphrase, restore flow, and no-recovery caveats | Verified 2026-04-17 |
| Disappearing Messages | https://support.signal.org/hc/en-us/articles/360007320771-Set-and-manage-disappearing-messages | Timer behavior, limitations, sync to linked devices, and user education | Verified 2026-04-17 |
| Stories | https://support.signal.org/hc/en-us/articles/5008009166234-Stories | Ephemeral story posts, contacts/groups audience model, replies, view controls, and 24-hour expiry | Verified 2026-04-17 |
| Pinned Messages | https://support.signal.org/hc/en-us/articles/10270961459226-Signal-Pinned-Messages | Pin/unpin behavior, pin limits, group admin controls, and disappearing-message interaction | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Signal as a private messenger with end-to-end encrypted messages, voice messages, photos, videos, GIFs, files, voice/video calls, group calls, group chats, stories, and nonprofit donation support.
- Onboarding must include country code selection, phone-number entry, verification-code entry, resend/voice fallback where supported, profile setup, username/phone-number privacy education, PIN prompt, registration-lock education, and blocked/unsupported states.
- The default signed-in surface must prioritize chats, unread/search, compose, stories where enabled, calls, settings/profile, privacy and security settings, linked devices, backups, support, and donation entry points.
- One-to-one and group chats must support text, photos, videos, files, voice notes, reactions, replies, pinned messages, polls, disappearing messages, edit/delete where supported by the product model, read/delivery receipts, search, mute/archive, and blocked-user states.
- Groups must support members, admins, group links, admin permission controls, member labels where included, group calls, pinned messages, polls, disappearing timers, and safety controls.
- Stories must support image/text/video posts, custom audience lists, group story sharing, replies, view receipts, hide/unhide, turning stories off, and 24-hour expiry.
- Calls must support one-to-one and group voice/video calls, microphone/camera permissions, call links or group-call entry where applicable, low-connectivity states, Bluetooth/audio-route changes, and call-quality diagnostics.
- PIN and registration lock must be modeled as account-hardening/recovery features that cannot recover chat history and may lock users out if forgotten while registration lock is enabled.
- Backup and transfer must distinguish Android on-device encrypted backups, iOS/Android device-to-device transfer, desktop/iPad linked-device caveats, physical proximity requirements, old-device dependency, platform-switch blockers, and lost-passphrase unrecoverability.
- Donation or secure-backup in-app purchases must be server-authoritative, privacy-preserving, and clearly separated from messaging access; pricing, naming, copy, and receipt handling must be original.
- Account deletion, change number, support, legal, privacy policy, terms, block/report, notification settings, data rights, device transfer, and backup paths must be reachable from settings.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Keep message encryption, identity keys, registration lock, backups, and linked devices under explicit security design documents outside this planning repo before implementation.
- Separate account recovery data from message history: a PIN-like feature may restore profile/settings/social graph metadata, not message bodies, unless a reviewed backup product exists.
- Model every external dependency as an adapter with feature flags, timeout behavior, provider-specific error mapping, and privacy review.
- Store only normalized event codes in analytics and operational logs; raw message bodies, media bytes, contact lists, phone numbers, backup keys, call audio/video, precise location, and payment credentials are disallowed.
- Provide support and safety tooling with role-based access, redaction, escalation reasons, immutable audit events, and minimal access to private content.

## Core User Journeys

- New user installs the app, reviews original privacy education, registers a phone number, verifies by code, creates a profile, sets or defers a PIN, optionally grants contacts, and lands in the chat list.
- Returning user opens the app, sees recent chats, resumes a conversation, sends text/media/file/voice note, receives delivery/read state, reacts, replies, pins, searches, or deletes a message.
- User starts a group, adds members or shares a group link, configures admin permissions, sends a poll, pins key context, starts a group call, and handles a member leaving or being removed.
- User enables disappearing messages, sees timer education, sends messages, watches timer state, changes the timer, and understands screenshots or secondary-device capture cannot be prevented.
- User creates a story, selects contacts/groups/custom audience, receives replies/views, hides a story source, disables stories, and sees expiry after 24 hours.
- User starts a voice/video call, grants microphone/camera permissions, handles poor connectivity or audio interruption, and sees call history or missed-call state.
- User transfers to a new device or restores from a backup, confirms old-device/passphrase requirements, sees unsupported platform-switch states, and understands unrecoverable lost history.
- User enables registration lock, forgets the PIN, sees lockout and support education, then completes recovery only through documented safe paths.
- User donates, restores, cancels, or sees secure-backup entitlement state without message-access changing based on payment.
- User receives spam, scam, harassment, impersonation, unwanted contact, or suspicious message request; they block/report and receive a safety acknowledgement.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone-number entry, consent, legal education | country code, phone number, terms/privacy consent | new, returning, unsupported region, loading | invalid number, rate limited, carrier blocked |
| Verification | SMS/voice/app-code verification and resend | OTP, resend, voice call, support | pending, verified, expired, resend available | SIM unavailable, too many attempts, code mismatch |
| Profile And PIN Setup | Display identity, avatar, username, PIN | display name, avatar, username, PIN | blank, valid, syncing, deferred | username unavailable, PIN forgotten, sync failure |
| Chats Inbox | Recent conversations, unread, archived chats | search, compose, filters, archive | empty, unread, groups, offline cached | corrupt cache, expired session, registration lock |
| Contact Picker | Start chat/group/invite | contacts permission, search, invite link | granted, denied, manual invite | contact upload failure, blocked contact, duplicate |
| Chat Thread | One-to-one and group messaging | text, media, voice, reactions, reply, pin, search | sending, delivered, read, failed, deleted | disappearing expired, blocked, unsafe link |
| Media/File Composer | Attach photos, videos, camera, files | camera, photos, files, caption | selected, uploading, attached, removable | too large, unsupported MIME, permission denied |
| Voice Note Recorder | Quick audio message capture | mic, hold/tap, playback | recording, preview, sent | interruption, denied mic, duration limit |
| Group Settings | Membership, admin controls, group links | add/remove, roles, invite link, permissions | member, admin, owner | invite abuse, only admin leaves, size limit |
| Calls | Voice/video calling and call history | call, add participant, camera, mic | ringing, active, muted, ended, missed | network drop, permission revoked, participant limit |
| Stories | 24-hour updates and audience controls | text, media, audience, reply/view | draft, posted, viewed, expired | blocked viewer, unsupported media, stories disabled |
| Backup/Transfer | Local backup, secure backup, device transfer | passphrase, old device, Wi-Fi/Bluetooth | enabled, disabled, restoring, transferring | lost key, missing old device, platform mismatch |
| Privacy And Security | Privacy, PIN, registration lock, sessions | toggles, PIN, blocked users, linked devices | saved, pending, inherited defaults | lockout, sync delay, unsupported platform |
| Donation/Entitlement | Donations or backup purchase state | donate, restore, cancel | free, active, expired, restored | platform mismatch, webhook delay, refund |
| Report/Block/Support | Abuse handling and support | report reason, block, support message | submitted, blocked, under review | duplicate report, urgent harm, privacy limit |
| Settings/Profile | Account, notifications, data, help, legal | profile, number change, delete, support | loaded, signed out, pending deletion | active backup, lost PIN, support unavailable |

## Data Model

- `User`: phone-number identity, username, region, age/consent state, profile, locale, account lifecycle, deletion/export state, PIN/registration-lock status.
- `DeviceSession`: device id, platform, app version, push token, linked-device role, trust state, last active timestamp, logout/inactivity state.
- `IdentityKeyRecord`: key material reference, safety-number/fingerprint display metadata, verification status, rotation state, and security-review metadata.
- `ContactGrant`: permission state, normalized contact hashes, invite status, last sync timestamp, user-controlled deletion state.
- `Conversation`: one-to-one, group, story-reply, system, or linked-device thread with membership, mute/archive, retention, encryption policy, and visibility.
- `Message`: sender, conversation, content parts, reply/pin state, delivery/read receipts, disappearing expiry, edit/delete state, safety/report references.
- `ContentPart`: text, image, video, file, voice note, sticker, GIF, poll, story reference, contact card, provider reference, scan state, retention state.
- `Group`: metadata, admins, member labels, invite links, post permissions, call permissions, disappearing defaults, pinned-message policy, and safety controls.
- `CallSession`: participants, call type, ringing/active/ended state, mute/camera state, quality metrics, provider id, interruption state.
- `Story`: author, media/text payload, audience list, replies/views, hide state, expiry, deletion state.
- `PinSettings`: PIN hash/reference, reminder cadence, registration-lock enabled, lockout window, recovery metadata, audit state.
- `BackupRecord`: platform, on-device or secure-backup mode, encrypted flag, passphrase/key metadata, last backup timestamp, restore attempts, failure reason.
- `PrivacySettings`: phone-number visibility, username discoverability, read receipts, typing indicators, screen security, relay calls, blocked contacts, disappearing defaults.
- `DonationEntitlement`: platform, receipt id, donation/supporter state, secure-backup state, trial/renewal/expiration/refund state, restore state.
- `SafetyReport`: reported object, reason, reporter, evidence snapshot policy, decision, block state, escalation, support case.
- `AuditEvent`: append-only account, verification, privacy, device, deletion/export, group admin, backup, donation, safety, and support changes.

## API And Backend Contracts

- `POST /auth/phone/start`, `POST /auth/phone/verify`, `POST /auth/phone/resend`: phone-number verification with rate limits, carrier/provider failure codes, and region gates.
- `POST /auth/session`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: device-scoped auth with linked-device revocation and suspicious-login audit events.
- `GET /contacts/matches`, `POST /contacts/sync`, `DELETE /contacts/sync`: consented contact discovery using privacy-preserving hashes and manual invite fallback.
- `GET /identity/:userId`, `POST /identity/verify`, `POST /identity/rotate`: identity-key/safety-number metadata with audit trails and security review gates.
- `GET /conversations?cursor=&filter=&query=`, `POST /conversations`, `PATCH /conversations/:id`: inbox, archive/mute, one-to-one/group/system thread creation.
- `GET /conversations/:id/messages?cursor=`, `POST /conversations/:id/messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: message send/edit/delete with idempotency keys, receipts, disappearing expiry, and failure codes.
- `POST /messages/:id/reactions`, `POST /messages/:id/pin`, `POST /messages/:id/report`: message actions with authorization, admin policy, audit, and abuse controls.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed media/file upload with size/type validation, scanning policy, thumbnails, retention, and retry states.
- `POST /groups`, `PATCH /groups/:id`, `POST /groups/:id/members`, `DELETE /groups/:id/members/:userId`: group lifecycle, admin roles, invite links, permissions, and safety checks.
- `POST /calls`, `PATCH /calls/:id`, `POST /calls/:id/participants`, `POST /calls/:id/end`: call signaling abstraction with permission, participant, network, relay, and quality states.
- `GET /stories`, `POST /stories`, `DELETE /stories/:id`, `POST /stories/:id/replies`: 24-hour stories with audience controls, replies/views, and expiry jobs.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `GET /settings/security`, `PATCH /settings/security`: privacy, PIN, registration lock, blocked users, relay calls, screen security, and disappearing-message defaults.
- `POST /pin/setup`, `POST /pin/verify`, `POST /pin/recovery/start`: PIN and registration-lock lifecycle with lockout states and no-message-history recovery claim.
- `GET /backups`, `POST /backups`, `POST /backups/restore`, `POST /device-transfer/start`, `POST /device-transfer/confirm`: backup/transfer contracts with passphrase, old-device, physical-proximity, and unsupported-platform errors.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: server-authoritative donation/secure-backup lifecycle; never trust client-only paid state.
- `POST /reports`, `POST /blocks`, `GET /support/cases/:id`: report/block/support lifecycle with privacy-preserving evidence policy.
- `POST /data-export`, `DELETE /account`, `POST /account/change-number`: privacy/account lifecycle with group, backup, device, donation, and lost-history consequences.

## Realtime, Push, And Offline Behavior

- Message delivery uses websocket/SSE or push-assisted sync with canonical reconciliation after missed events; duplicate sends collapse by idempotency key.
- If end-to-end encryption is implemented, the server must not inspect message bodies; routing metadata, abuse prevention, sealed-sender-like goals, and delivery tradeoffs must be documented by security owners.
- The client may cache conversation headers, recent messages, media thumbnails, settings, call history, backup summary, and pending outgoing messages for offline reads.
- Offline sends can queue encrypted text, drafts, reactions, and media upload intents; account deletion, PIN changes, reports, donations, backup restore, and destructive privacy actions require server/provider confirmation.
- Delivery/read receipts must handle offline recipients, blocked users, privacy-disabled read receipts, disappearing messages, linked devices, backup transfer, and clock skew.
- Media uploads must resume or fail visibly; unscanned, unsupported, expired, deleted, or over-limit attachments cannot be sent.
- Calls must tolerate poor connectivity, relay fallback, permission revocation, app backgrounding, Bluetooth route changes, device sleep, participant joins/leaves, and signaling reconnect.
- Stories must expire or invalidate cached entries based on audience, deletion, block, hide, view state, and age.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and content-minimized; private message bodies must be omitted or encrypted unless the user explicitly enables previews.
- Backups and transfers must be resumable, cancellable, platform-aware, and explicit when a passphrase, old device, or platform path is unavailable.

## Permissions, Privacy, And Safety

- Contacts, camera, microphone, photos/files, notifications, Bluetooth/local network, and screen recording permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw message text, media bytes, contact lists, phone numbers, backup keys, PINs, call audio/video, precise location, payment credentials, and private support content.
- Phone-number identity, username discovery, contact discovery, and invite flows must include clear consent, revocation, and data-deletion paths.
- Encryption language must be reviewed by security/legal owners and must distinguish audited cryptographic guarantees from UI privacy expectations.
- PIN and registration-lock copy must state that PIN cannot recover message history and may cause lockout if forgotten.
- Backup copy must state local/secure backup scope, passphrase/key consequences, platform limitations, and old-device requirements.
- Safety controls must include spam/scam warnings, message requests, report/block, group-invite controls, unsafe-link warnings, suspicious-account warnings, and account recovery education.
- Group, story, linked-device, backup, donation, and username surfaces require additional privacy review because they can expose social graph, phone number, media, or payment metadata.
- Launch owner: product/security lead for messaging privacy, cryptography owner for encryption claims, privacy owner for contacts/backups/data rights, safety owner for spam/scams/abuse, billing owner for donation/secure-backup purchases.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, phone verification requested/verified/failed, contact permission granted/denied, chat created, message send succeeded/failed, media upload failed, call started/ended, group created, story posted, PIN setting changed, backup started/restored, report submitted, block created, privacy setting changed, account deletion requested, entitlement state changed.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of message bodies, contact names, phone numbers, media contents, backup keys, PINs, or call content.
- Delivery and calling telemetry must separate operational reliability metrics from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original donations, supporter badges, or secure-backup storage later, but pricing, names, offers, app-store copy, and Signal positioning must be original.
- Donation and backup analytics must treat payment state, subscription status, refunds, receipt ownership, and backup metadata as sensitive and never trust client-only state.
- Billing tests must cover donated, active backup, expired, canceled, refunded, restored, app-store-owned, web-owned, and unavailable states.

## Edge Cases

- First launch offline, unsupported OS, unavailable SIM, SMS blocked, roaming number, rate-limited verification, changed phone number, blocked region, or forgotten PIN with registration lock.
- Contact permission denied, limited contacts, duplicate normalized numbers, stale address book, blocked contact, hidden phone number, username collision, or deleted contact reappearing through a group.
- Message sent while offline, duplicate tap, disappearing message expires before read, pinned message expires, edited/deleted while replying, or read receipts disabled.
- Identity key changes, safety-number mismatch, linked-device stale state, device transfer interrupted, desktop linked without phone history, or old device unavailable.
- Backup encrypted with lost passphrase, secure backup payment expired, backup file missing, local storage full, platform switch unsupported, or disappearing messages excluded from transfer.
- Group has no remaining admins, invite link leaked, spam wave joins, member labels change, admin/moderation action races with message delivery, or group call exceeds participant limit.
- Call starts with denied microphone/camera, relay blocked, network handoff drops media, Bluetooth route changes, phone call interruption, or group call participant reconnect race.
- Story posted to wrong audience, blocked viewer state changes, story reply arrives after expiry, stories disabled, or view receipt privacy expectations conflict.
- Account deletion requested with active secure backup, pending donation, linked device, backup restore, support case, or legal retention requirement active.

## Test Plan

- Unit tests for phone-number validation, verification state machine, resend/rate limits, session creation, PIN setup/verify, registration lock, lockout state, and account recovery.
- Unit tests for conversation/message state: send, retry, idempotency, receipts, read-receipt privacy, edit/delete, disappearing expiry, reactions, pins, polls, and search indexing.
- Unit tests for group roles, invite links, admin permissions, member labels, pinned-message limits, polls, stories, and group-safety controls.
- Unit tests for backup/transfer state machines, passphrase validation, old-device dependency, unsupported platform switch, interrupted transfer, and missing backup file.
- Contract tests for every API route, including pagination, authorization errors, upload states, receipt states, identity-key warnings, backup errors, billing webhooks, and privacy settings.
- Integration tests for onboarding, contact permission granted/denied, one-to-one chat, group creation, media sharing, voice note, disappearing message, story post, block/report, backup setup, and account deletion request.
- Calling tests for mic/camera denied/granted/revoked, one-to-one voice/video, group participant limit, relay fallback, network drop, reconnect, and call history.
- Privacy tests for phone visibility, username discovery, read receipts, blocked contacts, screen security, PIN reminders, registration lock, backup notices, account deletion, and analytics redaction.
- Safety tests for spam/scam, impersonation, suspicious account, unsafe link, report/block, group invite abuse, unwanted contact, and support escalation.
- Offline tests for cached inbox, queued outgoing text, queued media upload, duplicate send collapse, stale receipts, corrupt cache, app termination, and reconnect reconciliation.
- Notification tests for opt-in, denied, revoked, quiet hours, preview disabled, group mute, call notification, deep link, and sensitive-payload redaction.
- Billing tests for free, donated, secure backup active, expired, canceled, refunded, restored, app-store-owned, web-owned, and unavailable entitlements.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, VoiceOver onboarding, captions/transcripts where available, large tap targets, and keyboard/external input on tablets.
- Manual verification tests: native iOS/Android screenshots, phone verification, username/privacy behavior, PIN/registration lock, contacts import, backups, device transfer, calls, stories, push payloads, donation/restore, account deletion, and recovery on real devices/accounts.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Signal assets, copy, sticker packs, private APIs, proprietary encryption code, donation flow, backup implementation, or support copy.
- New users can register by phone number, verify, create a profile, configure PIN education, control contact permission, and start a chat with an invited or discovered contact.
- Returning users can send, receive, search, react to, pin, delete, and manage disappearing messages with deterministic delivery/read states and privacy controls.
- Groups support admins, invite links, members, polls, pinned messages, disappearing defaults, group calls, and abuse controls.
- Stories, calls, backups/transfers, PIN/registration lock, linked devices, privacy settings, report/block, data rights, account deletion, and account recovery are represented in screens, APIs, and tests.
- Encryption, backups, contact discovery, donations, secure backups, usernames, and linked devices include explicit privacy/security language and launch blockers where not independently verified.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which original cryptography stack and independent security-review process will back V1 encryption claims?
- Which phone verification, push notification, media storage, calling, relay/TURN/SFU, backup storage, donation, and crash-reporting providers will be used?
- Will V1 support usernames, phone-number privacy, linked desktop/tablet devices, secure backups, stories, polls, and donations, or explicitly defer them?
- Which launch regions determine phone-number, donations, age, data-rights, backup storage, and law-enforcement request requirements?
- How will the downstream implementation preserve privacy while still offering support, abuse reports, crash diagnostics, and operational reliability telemetry?

## Build Plan

- Phase 1: scaffold app shell, phone-number auth, profile setup, contact-permission flow, chat inbox, one-to-one text messaging, delivery state, privacy-safe analytics, and support/legal links.
- Phase 2: add media/file uploads, voice notes, reactions, replies, pins, search, archive/mute, disappearing messages, block/report, and offline queued sends.
- Phase 3: add groups, group settings, admin roles, invite links, polls, pinned-message controls, group safety controls, and group media/call readiness checks.
- Phase 4: add calls with provider-backed signaling/media, call history, permission handling, relay fallback, reconnect behavior, and notification handling.
- Phase 5: add PIN, registration lock, phone-number privacy/username model, linked-device model, identity-key warning UI, and security review gates.
- Phase 6: add stories, audience controls, story replies/views, expiry jobs, hide/unhide, and story notification settings.
- Phase 7: add backups and device transfer behind feature flags, passphrase/key UX, old-device dependency states, interrupted transfer recovery, and backup regression tests.
- Phase 8: add donations or secure-backup entitlement only after legal, provider, privacy, fraud, platform-policy, and security approvals.
- Phase 9: complete account deletion/export, change-number flow, contact data deletion, support cases, accessibility pass, offline/reconnect pass, privacy/security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party support/legal URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
