# Messenger-Style Clone Spec

> Metadata
> - Inspiration app: Messenger
> - Category: Social messaging, group chat, calls, stories, Meta AI-style assistant, encrypted personal messaging, and business/page messaging
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Messenger Help Center pages, Meta privacy/legal pages, and public Messenger encryption/support documentation.
> - Manual verification blockers: native iOS/Android screen capture, Facebook/Messenger-only account states, contact upload, message requests, end-to-end encrypted restore, call behavior, stories/notes, Meta AI availability, business/page chats, Marketplace chats, avatar purchases, push payloads, data download, account deletion, teen/minor controls, and regional feature availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, message content, contact data, sticker/avatar assets, AI provider behavior, business catalog data, payments, moderation policy, and encryption implementation.

## Overview

Build an original mobile messaging app inspired by Messenger's public workflow: account-based chat, one-to-one and group messaging, voice/video calls, reactions, media sharing, shared albums, message requests, privacy controls, blocking/reporting, encrypted personal chats, secure storage/restore, stories/notes-style lightweight sharing, assistant entry points, and business/page messaging.

The clone must not copy Messenger branding, screenshots, marketing copy, protected UI artwork, social graph data, avatar items, stickers, Meta AI responses, business integrations, Marketplace data, private APIs, ranking systems, or moderation decisions. Functional parity should be expressed through original product language, independently designed social graph and messaging infrastructure, licensed providers, and transparent limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first messenger with account onboarding, chat list, one-to-one chats, groups, calls, media, reactions, search, message requests, privacy settings, blocking/reporting, and support/legal flows.
- Preserve privacy expectations around end-to-end encrypted personal chats, secure storage, device restore, message deletion, message requests, blocked people, and data download.
- Support social messaging and lightweight community use cases without reusing Meta's social graph, business tools, marketplace data, assistant behavior, avatar inventory, or moderation decisions.
- Keep Meta AI-style assistance, business/page messaging, Marketplace-style chats, avatar purchases, public discovery, and teen/minor controls explicitly gated until product, legal, safety, privacy, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Messenger-branded app or imply affiliation with Meta, Facebook, Instagram, Pages, Marketplace, Meta AI, avatar stores, or Meta business products.
- Do not reuse private Messenger APIs, scrape Facebook profiles, import real social graphs, copy sticker packs, copy avatar items, replay traffic, or claim cryptographic equivalence with Messenger.
- Do not ship assistant responses, business messaging, payments, marketplace attachments, public search, or avatar commerce without separate legal, safety, privacy, fraud, and provider sign-off.
- Do not claim exact App Store, Play Store, native-device, push-notification, encrypted backup, contact import, deletion/export, business/page, Marketplace, AI, teen, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/messenger/id454638411 | Official iOS listing, category, age rating, supported devices, privacy labels, in-app purchases, messaging/calling/media claims, release notes, support link | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.facebook.orca | Official Android listing, package id, ratings/download scale, data safety, in-app purchases, chat/calls/AI/media/shared-album claims, support contact | Verified 2026-04-17 |
| Messenger Help Center | https://www.facebook.com/help/messenger-app | Canonical help inventory for Messenger features, account management, privacy, blocking, reporting, deletion, and support | Verified 2026-04-17 |
| Messenger End-to-End Encryption | https://www.facebook.com/help/messenger-app/1084673321594605/ | Encrypted-chat feature inventory, secure storage, restore methods, supported encrypted chat behavior, reporting, key checks, and limitations | Verified 2026-04-17 |
| Messenger Encryption Meaning | https://www.facebook.com/help/786613221989782 | Public description of end-to-end encrypted messages/calls, device keys, participant-only access, reporting caveats, and unsupported product areas | Verified 2026-04-17 |
| Messenger Secure Storage | https://www.facebook.com/help/messenger-app/820525008940780 | Backup/restore security methods, PIN or 40-character code, Apple/Google account restore paths, and device-only backup option | Verified 2026-04-17 |
| Messenger Data Download | https://www.facebook.com/help/messenger-app/677912386869109 | Computer-only encrypted chat data download, secure storage requirement, messages and attachments export scope | Verified 2026-04-17 |
| Messenger Privacy Controls | https://www.facebook.com/help/messenger-app/408883583307426/ | Privacy tab, messaging settings, blocked people, encrypted chats, and related controls | Verified 2026-04-17 |
| Messenger Blocking And Reporting | https://www.facebook.com/help/messenger-app/1145318292241859/ | Block, restrict, report, delete, archive, impersonation, abuse, and encrypted chat reporting paths | Verified 2026-04-17 |
| Meta Privacy Policy | https://www.facebook.com/privacy/policy/ | Meta data handling, privacy rights, collection/use categories, sharing, retention, and controls | Verified 2026-04-17 |
| Meta Terms of Service | https://www.facebook.com/legal/terms | Account/service rules, prohibited conduct, content/license baseline, account restrictions, and service availability caveats | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Messenger as a free messaging app for text, voice, and video communication with Facebook/Messenger discovery, group chats, media, shared albums, HD photos, assistant entry points, and optional in-app purchases.
- Onboarding must support account sign-in, account recovery, multi-profile/account switch education where enabled, notification permission education, contact discovery education, privacy policy/terms access, and blocked or restricted account states.
- The default signed-in surface must support recent chats, search, compose, message requests, active status where enabled, stories/notes-style updates where enabled, calls, groups, archived chats, privacy/settings, help, and account switcher.
- One-to-one chats must support text, media, files where enabled, voice messages, reactions, replies, read/delivery state, typing indicators, edit/delete, mute, pin/search, encrypted state, blocked/restricted users, and unavailable messages.
- Group chats must support naming, photos, participants, mentions, reactions, shared media/albums, admin/member actions, notification controls, invite links where enabled, member removal, and abuse reporting.
- Calls must support voice/video, one-to-one and group variants, microphone/camera permissions, ring/missed/declined states, network-quality recovery, call history, call reporting, and push/call notification deep links.
- End-to-end encrypted personal chats must be modeled separately from non-eligible product surfaces, with device keys, secure storage, restore options, data download, unsupported business/Marketplace/community chat states, and launch-blocking security review before any encryption claim.
- Message requests and privacy controls must allow unknown sender review, inbox routing, blocking, restricting, reporting, notification control, and safe deletion without leaking private social graph data.
- Business/page chats, automated messages, Marketplace-style attachments, avatar purchases, assistant chats, and public/community surfaces are not core V1. They require separate privacy, safety, fraud, billing, moderation, and provider reviews.
- Account deletion, data download, blocked people, privacy settings, support, terms, privacy policy, and report abuse paths must be reachable from settings and from relevant conversation surfaces.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Store messages, media, calls, contacts, message requests, group state, encrypted backup metadata, reports, and assistant/business payloads under explicit ownership and deletion/export rules.
- Keep encrypted-personal-chat and non-encrypted/ineligible surface models separate in route names, storage, sync, cache, push, analytics, support tooling, and security review.
- Model every external dependency as an adapter with feature flags, timeout behavior, provider-specific error mapping, and privacy review.
- Entitlement and purchase checks must be server-authoritative; the client may cache feature summaries but cannot grant avatar, assistant, business, payment, or storage privileges alone.
- Analytics and operational logs must not include raw message text, media bytes, contact lists, social graph edges, precise location, assistant prompts, business payloads, payment credentials, or encryption keys.
- Support/safety tooling must include role-based access, redaction, evidence retention policy, escalation reasons, immutable audit events, and separate handling for encrypted chats versus report-submitted excerpts.

## Core User Journeys

- New user installs the app, signs in with an original account model, reviews privacy/contact/notification education, creates or confirms a profile, and lands in the chat list.
- Returning user opens the app, resumes a recent chat, sends text/media/voice, sees delivery/read state, reacts, replies, edits, deletes, searches, or mutes a conversation.
- User starts a group, invites contacts or links, sends photos to a shared album, mentions a member, manages notifications, removes a member, and handles spam or harassment.
- User receives a message request from an unknown sender, previews limited context, accepts, deletes, blocks, restricts, or reports without exposing additional profile details.
- User starts a voice/video call, grants microphone/camera permissions, handles ringing/missed/declined states, network handoff, participant join/leave, and call report flow.
- User enables secure storage for encrypted chats, sets a restore method, signs in on a new device, restores or fails restore, and sees permanent-loss warnings before resetting security.
- User uses a lightweight story/note update, chooses audience, handles replies/reactions, expiry, deletion, and unavailable feature flags.
- User opens an assistant or business chat, sees disclosure and permission boundaries, sends a command/message, revokes access, and understands non-core launch status.
- User blocks, restricts, reports, archives, deletes, downloads data, or requests account deletion and receives clear consequences for encrypted chats, backups, groups, and active devices.
- User loses connectivity while composing or uploading media, sees queued/sending/failed states, retries after reconnect, and avoids duplicate messages through idempotency.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, recovery, consent, legal links | sign in, recovery, terms/privacy | new, returning, restricted, loading | account locked, region block, age gate, auth failure |
| Profile Setup | Display identity and avatar education | name, photo, status, privacy | blank, valid, syncing | image denied, duplicate handle, sync failure |
| Chat List | Recent chats, search, compose, requests, archive | search, tabs, compose, settings | empty, unread, active, offline cached | corrupt cache, expired session, hidden request |
| Message Requests | Unknown sender triage | accept, delete, block, report | pending, accepted, deleted | impersonation, unsafe content, sender deleted |
| One-To-One Chat | Personal messaging | text, media, reactions, calls, search | sending, delivered, read, failed | blocked user, encrypted unavailable, deleted content |
| Group Chat | Multi-person conversation | message, mention, album, member actions | member, admin, muted, archived | spam wave, member removed, invite abuse |
| Media Composer | Photos, video, files, voice, camera | camera, photos, files, caption | selected, uploading, attached | too large, unsupported type, permission denied |
| Calls | Voice/video and call history | call, join, mute, camera, speaker | ringing, active, missed, ended | network drop, permission revoked, participant limit |
| Stories/Notes | Lightweight ephemeral sharing | media/text, audience, reply | draft, posted, viewed, expired | unsupported region, takedown, audience mismatch |
| Assistant Chat | AI-style optional helper | prompt, attachment, disclosure | disabled, active, rate-limited | unsafe prompt, provider outage, sensitive topic |
| Business/Page Chat | Brand or automated messaging | message, action buttons, revoke | disclosed, active, blocked | automation abuse, payment disabled, data sharing risk |
| Privacy And Safety | Messaging settings, blocks, encrypted settings | toggles, block list, secure storage | saved, pending, inherited defaults | restore loss, key mismatch, sync delay |
| Report/Support | Abuse, impersonation, bug, call report | reason, evidence, block | submitted, under review, blocked | urgent harm, encrypted evidence limits, duplicate |
| Settings/Account | Profile, notifications, data, delete, legal | toggles, export, delete, help | loaded, pending export, pending deletion | active backup, locked account, support outage |

## Data Model

- `User`: account identity, profile, region, age/consent state, account lifecycle, privacy defaults, deletion/export state, trust/safety restrictions.
- `DeviceSession`: platform, app version, push token, encrypted-chat key registration, secure storage state, last active timestamp, logout state.
- `ContactGrant`: permission state, normalized contact hashes, discovery result, invite state, last sync timestamp, revocation/deletion state.
- `Conversation`: one-to-one, group, request, business, assistant, system, or encrypted-personal pointer with membership, mute/archive/pin, retention, sync, and visibility.
- `EncryptedConversation`: device-key set, secure storage metadata, restore method, backup state, unsupported-surface flag, and security-review metadata.
- `Message`: sender, conversation, content parts, edit/delete state, delivery/read receipts, reply/reaction references, safety/report references, and expiry state.
- `ContentPart`: text, image, video, document, voice note, sticker, contact card, link preview, assistant result, business payload, scan state, and provider reference.
- `Group`: metadata, avatar, participants, roles, invite links, member limits, album references, safety settings, ownership, and deletion state.
- `CallSession`: participants, call type, ringing/active/ended state, mute/camera/screen-share state, network quality, provider call id, notification state.
- `StoryUpdate`: author, media/text payload, audience, replies/reactions, view receipts, expiry, takedown state, and feature-availability flag.
- `BusinessThread`: business/page identity, automation disclosures, permissions, action buttons, commerce-disabled flag, revocation, and abuse state.
- `AssistantSession`: provider, prompt metadata, response metadata, safety classification, rate limit, retention rule, and user-visible disclosure.
- `PurchaseEntitlement`: item key, platform receipt, renewal/expiration/refund state, feature gate, restore state, and support case link.
- `PrivacySettings`: message request routing, active status, read receipts where supported, previews, blocked/restricted users, encrypted backup settings, data export preferences.
- `SafetyReport`: reported object, reason, reporter, evidence snapshot policy, encrypted excerpt handling, decision, escalation, appeal/support case.
- `AuditEvent`: append-only record for auth, sessions, encryption settings, privacy changes, deletion/export, group admin, business/assistant access, purchases, and safety actions.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with locked, restricted, region, and deletion-state gates.
- `GET /contacts/matches`, `POST /contacts/sync`, `DELETE /contacts/sync`: consented contact discovery with hashed identifiers, manual invite fallback, and deletion support.
- `GET /conversations?cursor=&filter=&query=`, `POST /conversations`, `PATCH /conversations/:id`: chat list, archive/mute/pin, request acceptance, one-to-one/group/business/assistant creation.
- `POST /encrypted-conversations/start`, `PATCH /encrypted-conversations/:id`, `POST /encrypted-storage/restore`, `DELETE /encrypted-storage`: encrypted chat lifecycle with security-review gate and irreversible-loss warnings.
- `GET /conversations/:id/messages?cursor=`, `POST /conversations/:id/messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: send/edit/delete with idempotency keys, receipts, reactions, failures, and report references.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed upload, MIME/size validation, malware scanning, thumbnails, HD media flags, and retry states.
- `POST /groups`, `PATCH /groups/:id`, `POST /groups/:id/members`, `DELETE /groups/:id/members/:userId`: group lifecycle, roles, invite links, album access, and safety checks.
- `POST /calls`, `PATCH /calls/:id`, `POST /calls/:id/participants`, `POST /calls/:id/end`: provider-backed signaling abstraction with permissions, network, participant, and notification states.
- `GET /stories`, `POST /stories`, `DELETE /stories/:id`, `POST /stories/:id/replies`: ephemeral update creation, audience controls, replies/reactions, expiry jobs, and takedown states.
- `POST /business-threads/:id/messages`, `POST /business-threads/:id/revoke`: business/page chat disclosure, automation permissions, commerce-disabled state, and abuse controls.
- `POST /assistant/sessions`, `POST /assistant/sessions/:id/messages`: assistant feature flag, provider policy checks, sensitive-topic handling, safety response, and retention disclosure.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: server-authoritative purchase lifecycle for original paid features or avatar-style items.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `GET /blocks`, `POST /blocks`, `POST /reports`: privacy, block/restrict, report, and support lifecycle with audit and appeal states.
- `POST /data-export`, `DELETE /account`: account privacy workflows with async status, encrypted backup consequences, group/business/assistant consequences, and retention caveats.

## Realtime, Push, And Offline Behavior

- Message delivery uses websocket/SSE or push-assisted sync with canonical server reconciliation after missed events; duplicate sends collapse by idempotency key.
- Encrypted personal chats must use a reviewed cryptographic design and must not fall back to unreviewed plaintext storage or support-side recovery.
- The client may cache chat headers, recent messages, media thumbnails, group metadata, settings, entitlements, active sessions, and pending outgoing messages for offline reads.
- Offline sends can queue low-risk text, reactions, drafts, and media upload intents; reports, encrypted restore/reset, account deletion, purchases, business actions, and assistant prompts require server/provider confirmation.
- Delivery/read receipts must handle offline recipients, muted chats, blocked users, multiple devices, deleted content, privacy-disabled states where supported, and clock skew.
- Media uploads must resume or fail visibly; unscanned, unsupported, expired, deleted, or over-limit attachments cannot be sent.
- Calls must tolerate poor connectivity, permission revocation, app backgrounding, audio-route changes, device sleep, participant joins/leaves, and signaling reconnect.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and content-minimized; encrypted chat bodies must be omitted unless a reviewed preview setting is enabled.

## Permissions, Privacy, And Safety

- Contacts, camera, microphone, photos/files, notifications, location, Bluetooth/local network, and screen recording permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw message text, media bytes, contact lists, social graph edges, precise location, call audio/video, business payloads, assistant prompts, payment credentials, and encryption keys.
- Security language must distinguish transport protection, reviewed encrypted personal chats, secure storage, restore risks, and unsupported product surfaces; no equivalence claim can ship without security/legal approval.
- Message requests, profile discovery, contact upload, active status, read receipts, and previews must include clear controls, revocation, and deletion paths.
- Business/page, assistant, Marketplace-style, and public/community surfaces must disclose third-party/provider handling, permission scope, revocation path, and content visibility.
- Safety controls must include spam/scam detection, impersonation reporting, harassment controls, unsafe-link warnings, blocked/restricted users, urgent-harm escalation, and child/teen review.
- Launch owner: product/security lead for messaging privacy, cryptography owner for encrypted chat claims, privacy owner for contacts/data rights, safety owner for abuse/reporting, billing owner for paid items, assistant/business owner for non-core integrations.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, contact permission changed, chat created, message send succeeded/failed, media upload failed, group created, call started/ended, request accepted/deleted, report submitted, block/restrict created, privacy setting changed, secure storage changed, export requested, delete requested, entitlement state changed.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of message bodies, contact names, profile identifiers, media contents, precise location, assistant prompts, business payloads, or call content.
- Delivery and calling telemetry must separate operational reliability metrics from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original paid storage, avatar-style cosmetic items, business tools, or assistant limits later, but pricing, names, offers, app-store copy, and Meta positioning must be original.
- Business messaging, assistant prompts, avatar purchases, and Marketplace-style attachments are launch-blocked unless fraud, ad disclosure, privacy, tax, region, platform, and provider requirements are signed off.

## Edge Cases

- First launch offline, unsupported OS, account locked, too-young account, blocked region, expired session, or unavailable identity provider.
- Contact permission denied, limited contacts, duplicate contacts, blocked contact, stale social graph, unknown sender, impersonation, or deleted sender profile.
- Message sent while offline, duplicate tap, edited/deleted while replying, failed restore, device key mismatch, disappearing message race, or read receipt unavailable.
- Group has no remaining admin, invite link leaks, spam wave joins, shared album permission conflict, participant changes during upload, or member reports an old message.
- Call starts without microphone/camera permission, loses network, moves to background, Bluetooth route changes, participant joins/leaves, call notification fails, or recording/transcription is disabled.
- Secure storage PIN is forgotten, 40-character code is lost, cloud restore fails, device-only backup is deleted, or support cannot recover encrypted history.
- Assistant output is unsafe, provider unavailable, prompt is sensitive, response cites unsupported information, or user expects private encrypted treatment.
- Business/page thread sends automation unexpectedly, payment/action button is unavailable, page is blocked, or user revokes access.
- Account deletion requested with active groups, encrypted backup, purchases, support case, business thread, assistant transcript, or legal retention requirement active.

## Test Plan

- Unit tests for account/session state, contact permission, message request routing, conversation state, idempotency keys, receipts, edit/delete, reactions, and privacy-safe analytics.
- Unit tests for encrypted conversation separation, secure storage settings, restore failure, local cache cleanup, unsupported-surface flags, and disabled launch state before security review.
- Unit tests for group roles, invites, mentions, shared albums, member removal, notification settings, story expiry, and safety controls.
- Contract tests for every API route, including pagination, authorization errors, upload states, receipt states, encrypted restore states, report states, blocks, and privacy settings.
- Integration tests for onboarding, contact permission granted/denied, one-to-one chat, message request accept/delete/report, group creation, media sharing, call start, block/report, and account deletion request.
- Calling tests for mic/camera denied/granted/revoked, one-to-one voice/video, group call, network drop, reconnect, call history, and push notification deep link.
- Privacy tests for message routing, blocked/restricted users, encrypted backup, data export, account deletion, analytics redaction, business disclosure, assistant disclosure, and previews.
- Safety tests for spam/scam, impersonation, harassment, unsafe links, child/teen escalation, business abuse, report evidence handling, duplicate reports, and appeal/support flow.
- Offline tests for cached chat list, queued outgoing text, queued media upload, duplicate send collapse, stale receipts, corrupt cache, app termination, and reconnect reconciliation.
- Manual verification tests: native iOS/Android screenshots, account/login variants, contact import, encrypted restore, groups, calls, stories/notes, assistant, business/page chats, purchases, push payloads, data download, deletion, and recovery on real devices/accounts.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Messenger assets, copy, private APIs, social graph data, stickers, avatar items, Meta AI behavior, business catalog data, payment rails, or moderation decisions.
- New users can sign in, review permissions, create or confirm a profile, control contact discovery, and start a one-to-one chat with an invited, contact-discovered, or manually addressed user.
- Returning users can send, receive, search, react to, edit, delete, and report messages with deterministic delivery/read states and privacy controls.
- Encrypted personal chat, secure storage, assistant, business/page chat, Marketplace-style chat, stories/notes, purchases, and teen/minor controls include explicit feature flags and launch blockers where not independently verified.
- Groups support participants, roles, invite links, shared media/albums, mentions, notifications, reporting, and abuse controls.
- Account settings include active sessions, blocked/restricted users, privacy settings, secure storage, data export, account deletion, support, terms, and privacy policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which original cryptography stack and independent security-review process will back any V1 encrypted personal chat or secure-storage claim?
- Which identity, contact discovery, push notification, media storage, calling, TURN/SFU, assistant, business automation, and billing providers will be used?
- Will V1 support stories/notes, assistant chats, business/page chats, Marketplace-style attachments, public discovery, avatar purchases, or explicitly defer them?
- Which launch regions determine age, contact upload, encryption, AI assistant, commerce, data-rights, and moderation requirements?
- How will the downstream team distinguish encrypted personal chats, non-eligible chats, business threads, assistant transcripts, and support evidence in storage and moderation tooling?

## Build Plan

- Phase 1: scaffold app shell, account auth, profile setup, contact-permission flow, chat list, one-to-one text messaging, delivery state, privacy-safe analytics, and support/legal links.
- Phase 2: add media/document uploads, voice messages, reactions, replies, search, archive/mute, message requests, block/restrict/report, and offline queued sends.
- Phase 3: add groups, group settings, participant roles, invite links, shared albums, mentions, group safety controls, and notification controls.
- Phase 4: add calls with provider-backed signaling/media, call history, permission handling, group-call limits, reconnect behavior, and notification handling.
- Phase 5: add encrypted personal chat behind security-review flag, secure storage settings, restore flows, key/state tests, and no-unsupported-surface regression coverage.
- Phase 6: add stories/notes placeholders, assistant placeholder, business/page thread placeholder, and purchase placeholder only after separate legal, provider, safety, privacy, fraud, and platform-policy approvals.
- Phase 7: complete account deletion/export, support cases, accessibility pass, offline/reconnect pass, privacy/security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party help/legal/privacy URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
