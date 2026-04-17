# Telegram-Style Clone Spec

> Metadata
> - Inspiration app: Telegram
> - Category: Messaging, cloud chat, channels, groups, bots, calls, stories, premium messaging features
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Telegram FAQ, Telegram Premium FAQ, Telegram moderation page, Telegram privacy/legal pages, and public Telegram developer docs.
> - Manual verification blockers: native iOS/Android screen capture, phone-number registration, verification-code delivery, contact import, secret-chat behavior, cloud-chat sync, channel/group administration, bot payments, premium purchase/restore, stories, calls, push payloads, deletion/export, and regional moderation behavior still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample contacts, message content, sticker packs, bot catalog data, AI provider behavior, moderation policy, payment integrations, and encryption implementation.

## Overview

Build an original mobile messaging app inspired by Telegram's public workflow: phone-number identity, cloud-synced chats, folders, one-to-one and group messaging, large communities, channels, bots, secret-chat-style private threads, voice/video calls, stories, rich media, reactions, polls, premium-style entitlements, privacy controls, reporting, and account lifecycle controls.

The clone must not copy Telegram branding, screenshots, marketing copy, protected UI artwork, sticker packs, private protocols, server implementation, moderation decisions, bot catalog data, payment rails, or MTProto behavior. Functional parity should be expressed through original product language, independently designed transport/security architecture, licensed providers, and transparent limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first messenger with phone-number onboarding, multi-device cloud chats, contact discovery, one-to-one chats, groups, channels, media/files, reactions, polls, calls, stories, and settings.
- Preserve privacy expectations around phone-number visibility, usernames, last-seen/online controls, delete-for-both-sides, secret chats, two-step verification, passkeys, data export, and account deletion.
- Support large community and broadcast use cases without reusing Telegram's proprietary infrastructure, moderation policy, public content, bot directory, or encryption implementation.
- Keep premium features, sponsored messages, bots, AI text editing, channel boosts, and public-content moderation explicitly gated until product, legal, safety, privacy, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Telegram-branded app or imply affiliation with Telegram, its developers, channels, bots, advertisers, or payment partners.
- Do not reuse private Telegram APIs, reverse-engineer clients, replay network traffic, copy MTProto code outside its license, or claim cryptographic equivalence without an independent security review.
- Do not import real address books, message content, public channels, bot data, sticker packs, stories, or media into demos without explicit consent and licensing.
- Do not ship production payments, sponsored messages, bot commerce, AI text editing, public channel discovery, or mass-broadcast communities without separate legal, safety, privacy, fraud, and provider sign-off.
- Do not claim exact App Store, Play Store, phone-verification, native-call, secret-chat, push-notification, premium, moderation, or data-export parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/telegram-messenger/id686449807 | Official iOS listing, category, age rating, supported devices, privacy labels, version notes, in-app purchases, support/legal links, cloud chat, groups, files, bots, secret chats, and release notes | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=org.telegram.messenger | Official Android listing, package id, rating/download scale, content rating, data safety, in-app purchases, messaging/calling/groups/channel claims, support contact | Verified 2026-04-17 |
| Telegram FAQ | https://telegram.org/faq | Cloud sync, phone-number identity, contacts/usernames, groups, channels, calls, secret chats, privacy controls, account deletion, 2-step verification, bots, data requests, and troubleshooting | Verified 2026-04-17 |
| Telegram Premium FAQ | https://telegram.org/faq_premium | Premium feature classes, doubled limits, 4 GB uploads, boosted channels, payment/cancellation paths, ads behavior, and availability caveats | Verified 2026-04-17 |
| Telegram Moderation Overview | https://telegram.org/moderation | Public reporting model, public group/channel moderation, CSAM and terrorist-content removal posture, and takedown contact paths | Verified 2026-04-17 |
| Telegram Privacy Policy | https://telegram.org/privacy | Data handling, cloud chat storage, contacts, phone number, moderation/legal request posture, retention, bots, and privacy rights | Verified 2026-04-17 |
| Telegram Terms of Service | https://telegram.org/tos | Account rules, prohibited use, public content constraints, premium reference, and service availability caveats | Verified 2026-04-17 |
| Telegram Bot Platform | https://core.telegram.org/bots | Bot platform concepts, bot interactions, commands, integrations, payments, and developer responsibilities | Verified 2026-04-17 |
| Telegram API Docs | https://core.telegram.org/api | Public developer platform orientation and client/API concepts; not a private mobile network contract | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings and FAQ position Telegram as a fast cloud messenger with synced access across phones, tablets, desktop, and web using a phone-number account and optional usernames.
- Onboarding must include country code selection, phone-number entry, verification code delivery, resend or call fallback where supported, device-session creation, profile setup, 2-step verification/passkey education, and blocked/unsupported states.
- The default signed-in surface must support chat folders, archived chats, search, compose, contacts, groups, channels, stories/updates where enabled, calls, saved messages, settings, and premium entry points.
- Cloud chats must support text, media, files, voice/video messages, reactions, replies, mentions, hashtags, pins, polls, topics where applicable, translations where enabled, edit/delete, forward, search, and server-synced history.
- Secret-chat-style threads must be modeled separately from cloud chats, with device-specific membership, self-destruct timers, screenshot warnings where platform-available, no cloud sync, and launch-blocking security review before any encryption claim.
- Groups must support small and very large communities, admins, permissions, invite links, public/private visibility, topics, slow mode, polls, pinned messages, spam controls, member reporting, and ownership transfer.
- Channels must support one-to-many posting, subscribers, admin roles, public/private links, comments/discussion group linkage, reactions, polls, stories/boosts where enabled, muted/default notification behavior, and takedown states.
- Bots must be treated as third-party integrations with explicit trust boundaries, command scopes, privacy mode, permissions, payment/web app review, audit logging, and visible disclosure when a bot or integration can access content.
- Calls and voice chats must support one-to-one and group voice/video flows, microphone/camera permissions, network-quality states, participant controls, push/call notifications, and provider-backed signaling without claiming Telegram protocol parity.
- Premium-style entitlements may include higher limits, faster media, larger uploads, voice-to-text, extra reactions, custom emoji, profile decorations, no sponsored messages, advanced chat management, and channel boosts, but all naming/pricing/offers must be original.
- Sponsored messages, AI text editing, public search/discovery, bots, channel monetization, giveaways, and payments are not core V1. They require separate privacy, safety, fraud, moderation, provider, and platform-policy reviews.
- Account deletion, data export, active sessions, logged-in devices, phone-number changes, two-step verification, blocked users, privacy policy, terms, support, report, and takedown paths must be reachable from settings.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Store all messages, media, contacts, usernames, public content, bot interactions, AI inputs, payment state, and support evidence under explicit data ownership and deletion/export rules.
- Keep cloud-chat and secret-chat models separate in route names, storage, sync, cache, push, retention, analytics, support, and security review.
- Model every external dependency as an adapter with feature flags, timeout behavior, provider-specific error mapping, and privacy review.
- Keep entitlement checks server-authoritative; the client may cache feature summaries but cannot grant premium, payment, bot, or public-channel privileges alone.
- Store only normalized event codes in analytics and operational logs; raw message bodies, media bytes, contact lists, precise location, bot payloads, AI prompts, and payment credentials are disallowed.
- Provide support and safety tooling with role-based access, redaction, escalation reasons, immutable audit events, and separate handling for private chats versus public groups/channels/bots.

## Core User Journeys

- New user installs the app, reviews original privacy and contact-permission education, registers a phone number, verifies by code, creates a profile, optionally grants contacts, and lands in the chat list.
- Returning user opens the app, sees folders and recent chats, resumes a conversation, sends text/media/file/voice message, receives delivery/read state, reacts, replies, pins, searches, or deletes a message for themselves or both sides.
- User starts a secret-chat-style thread, sees device-specific privacy education, sends disappearing messages/media, receives timer and screenshot-state feedback, and understands that cloud sync and server recovery are unavailable.
- User creates a group, adds contacts or invite links, configures admins/permissions/topics, posts a poll, pins a message, handles spam reports, and manages a member leaving or being removed.
- User discovers or creates a channel, posts as an admin, follows privately as a subscriber, receives controlled notifications, reacts/votes, and handles takedown, region, or premium boost states.
- User adds a bot or opens a bot web app, reviews permission and payment disclosures, sends a command, revokes access, and sees bot-originated content clearly labeled.
- User starts a voice/video call or voice chat, grants microphone/camera permissions, handles network handoff, adds participants where supported, and exits with call history recorded.
- User buys, restores, cancels, or loses premium-style access and sees deterministic feature limits, media upload limits, badges, channel boosts, and support states.
- User changes phone number, logs out a session, enables two-step verification/passkey, exports data, deletes the account, or loses the phone and sees consequences for cloud data, secret chats, active devices, and contacts.
- User reports spam, scam, harassment, illegal public content, impersonation, or unsafe bot behavior; the app preserves required evidence, blocks/mutes as requested, and returns a safety acknowledgement.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone-number entry, consent, legal education | country code, phone number, terms/privacy consent | new, returning, unsupported region, loading | invalid number, rate limited, carrier blocked |
| Verification | Code entry, resend, call fallback, account recovery | OTP, resend, call, support | pending, verified, expired, resend available | SIM unavailable, too many attempts, code mismatch |
| Profile Setup | Display identity, avatar, username education | display name, avatar, username | blank, valid, syncing | username taken, image denied, sync failure |
| Chat List/Folders | Cloud chats, folders, archive, saved messages | search, compose, folder tabs, archive | empty, unread, folders, offline cached | corrupt cache, expired session, hidden archived chat |
| Contact Picker | Start chat/group/invite | contacts permission, username search, invite link | granted, denied, manual invite | contact upload failure, blocked contact, duplicate |
| Cloud Chat Thread | Synced one-to-one/group messaging | text, media, files, reactions, reply, pin, search | sending, delivered, read, failed, deleted | blocked user, unsafe link, public takedown |
| Secret Chat Thread | Device-specific private conversation | text, media, timers, key verification | active, timer set, expired, closed | device lost, screenshot alert unavailable, no recovery |
| Media/File Composer | Attach photos, videos, documents, camera, location | camera, photos, files, location, caption | selected, uploading, attached, removable | too large, unsupported MIME, permission denied |
| Group Settings | Membership, admins, topics, invite links, safety | add/remove, roles, permissions, report | member, admin, owner, public/private | invite abuse, admin race, size limit |
| Channel Surface | Directory, following, admin posting, stats | follow, search, react, post, boost | following, muted, admin, unavailable | region block, takedown, boosted feature missing |
| Bot Interaction | Commands, bot web apps, integrations, payments | command, button, web app, payment | disclosed, active, revoked, paid | bot abuse, token leak, payment failure |
| Calls/Voice Chats | Voice/video calls and group audio | call, join, mic, camera, speaker | ringing, active, muted, ended, missed | network drop, permission revoked, participant limit |
| Stories/Updates | Ephemeral public or contact-limited posts | media, caption, audience, reaction | draft, posted, viewed, expired | unsupported media, takedown, boosted limit |
| Premium/Entitlements | Original paid feature state | subscribe, restore, boost, cancel | free, paid, expired, restored | platform mismatch, webhook delay, refund |
| Privacy And Security | Account hardening and privacy controls | toggles, sessions, 2FA, passkey, blocks | saved, pending, inherited defaults | lockout, sync delay, unsupported platform |
| Report/Support | Abuse, takedown, impersonation, bot report | report reason, evidence, block | submitted, blocked, under review | duplicate report, urgent harm, public/private split |
| Settings/Profile | Account, sessions, export, delete, legal | phone, username, devices, export, delete | loaded, pending export, pending deletion | active premium, lost phone, secret-chat warning |

## Data Model

- `User`: phone-number identity, username, region, age/consent state, profile, locale, account lifecycle, deletion/export state, two-step verification/passkey status.
- `DeviceSession`: device id, platform, app version, push token, active-session role, trust state, last active timestamp, logout/inactivity state.
- `ContactGrant`: permission state, normalized contact hashes, invite status, last sync timestamp, user-controlled deletion state.
- `ChatFolder`: user-owned folder, included/excluded chat rules, unread summary, pinned order, archive visibility, sync state.
- `Conversation`: cloud one-to-one, group, channel discussion, bot, saved-message, system, or secret-thread pointer with membership, mute/archive/pin, retention, sync policy, and visibility.
- `SecretConversation`: device-specific participant keys, timer defaults, screenshot capability, local-only cache, no-cloud-sync flag, and security-review metadata.
- `Message`: sender, conversation, content parts, reply/forward/pin state, delivery/read receipts, edit/delete state, disappearing expiry, safety/report references.
- `ContentPart`: text, image, video, document, voice note, video note, sticker, GIF, location, contact card, poll, story reference, bot payload, AI result, provider reference, scan state.
- `Group`: metadata, photo/theme, admins, permissions, invite links, topics, slow mode, member limits, safety settings, ownership, and public/private state.
- `Channel`: admin identity, public link, subscriber count, post stream, comments linkage, reactions/polls, boost level, monetization flags, moderation state.
- `BotIntegration`: bot owner, command scopes, privacy mode, webhook state, permissions, web app URL, payment provider, abuse state, revocation state.
- `CallSession`: participants, call type, ringing/active/ended state, mute/camera/screen-share state, network quality, provider call id, notification state.
- `Story`: author or channel, media/text payload, audience, replies/reactions, view receipts, expiry, boost dependency, takedown state.
- `Entitlement`: plan key, platform, receipt id, trial/renewal/expiration/refund state, upload/message limits, boosted-channel allocations, restore state.
- `PrivacySettings`: phone-number visibility, last seen/online, profile photo, calls, group invites, voice-message privacy, active sessions, blocked contacts, data export preferences.
- `SafetyReport`: reported object, reason, reporter, evidence snapshot policy, decision, block state, escalation, appeal/support case.
- `AuditEvent`: append-only record for auth, verification, privacy, device, deletion/export, group/channel admin, bot access, premium, safety, and support changes.

## API And Backend Contracts

- `POST /auth/phone/start`, `POST /auth/phone/verify`, `POST /auth/phone/resend`: phone-number verification with rate limits, carrier/provider failure codes, and region gates.
- `POST /auth/session`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: device-scoped auth with active-session review and suspicious-login audit events.
- `GET /contacts/matches`, `POST /contacts/sync`, `DELETE /contacts/sync`: consented contact discovery using privacy-preserving hashes and manual invite fallback.
- `GET /folders`, `POST /folders`, `PATCH /folders/:id`: folder configuration with inclusion/exclusion rules, unread summaries, pinned ordering, and sync conflict behavior.
- `GET /conversations?cursor=&filter=&query=`, `POST /conversations`, `PATCH /conversations/:id`: chat list, archive/mute/pin, one-to-one/group/channel/bot/system thread creation.
- `POST /secret-conversations/start`, `PATCH /secret-conversations/:id`, `DELETE /secret-conversations/:id`: secret-thread lifecycle with security-review gate, local-only state, and no server-side message recovery.
- `GET /conversations/:id/messages?cursor=`, `POST /conversations/:id/messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: message send/edit/delete with idempotency keys, receipts, disappearing expiry, and failure codes.
- `POST /messages/:id/reactions`, `POST /messages/:id/pin`, `POST /messages/:id/forward`, `POST /messages/:id/report`: message actions with authorization, audit, and abuse controls.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed media/document upload with free/premium size limits, malware scanning, transcoding, thumbnails, and retry states.
- `POST /groups`, `PATCH /groups/:id`, `POST /groups/:id/members`, `DELETE /groups/:id/members/:userId`: group lifecycle, roles, permissions, invite links, topics, and safety checks.
- `GET /channels`, `POST /channels`, `POST /channels/:id/follow`, `POST /channels/:id/posts`, `POST /channels/:id/reactions`: channel directory, private follows, admin posts, muted defaults, boost levels, and availability flags.
- `GET /bots/:id`, `POST /bots/:id/commands`, `POST /bots/:id/revoke`, `POST /bot-payments/intents`: bot permissions, commands, web app sessions, and disabled-by-default payments.
- `POST /calls`, `PATCH /calls/:id`, `POST /calls/:id/participants`, `POST /calls/:id/end`: call signaling abstraction with permission, participant, network, and notification states.
- `GET /stories`, `POST /stories`, `DELETE /stories/:id`, `POST /stories/:id/replies`: story creation, audience controls, replies/reactions, expiry jobs, and boost availability.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /channels/:id/boosts`: server-authoritative premium lifecycle and channel boost state.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `GET /settings/security`, `PATCH /settings/security`: phone visibility, last seen, sessions, blocked users, 2FA, passkeys, and chat privacy settings.
- `POST /reports`, `POST /blocks`, `GET /support/cases/:id`: report/block/support lifecycle with public/private evidence rules and safety escalation.
- `POST /data-export`, `DELETE /account`, `POST /account/change-number`: privacy/account lifecycle with cloud-chat, secret-chat, group/channel, bot, premium, and device consequences.

## Realtime, Push, And Offline Behavior

- Cloud message delivery uses websocket/SSE or push-assisted sync with canonical server reconciliation after missed events; duplicate sends collapse by idempotency key.
- Secret-chat-style messaging, if implemented, must use a reviewed device-specific channel and must never fall back to cloud sync or server-side plaintext recovery.
- The client may cache chat headers, recent cloud messages, media thumbnails, folders, settings, entitlements, active sessions, and pending outgoing messages for offline reads.
- Offline sends can queue cloud text, drafts, reactions, and media upload intents; secret-chat sends, account deletion, reports, premium purchase, bot payments, and public moderation actions require server/provider confirmation.
- Delivery/read receipts must handle offline recipients, privacy-disabled read receipts, multi-device sync, blocked users, disappearing messages, deleted content, and clock skew.
- Media uploads must resume or fail visibly; unscanned, unsupported, expired, deleted, or over-limit attachments cannot be sent.
- Calls must tolerate poor connectivity, permission revocation, app backgrounding, Bluetooth route changes, device sleep, participant joins/leaves, and signaling reconnect.
- Channel posts, stories, and bot messages must expire, mute, invalidate, or redact cached entries based on visibility, deletion, takedown, unfollow, block, and region availability.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and content-minimized; private message bodies must be omitted or encrypted unless the user explicitly enables previews.

## Permissions, Privacy, And Safety

- Contacts, camera, microphone, photos/files, notifications, location, Bluetooth/local network, and screen recording permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude raw message text, media bytes, contact lists, phone numbers, precise location, call audio/video, bot payloads, AI prompts, payment credentials, and secret-chat metadata.
- Phone-number identity, contact discovery, username lookup, and invite flows must include clear consent, revocation, and data-deletion paths.
- Security language must distinguish cloud-chat encryption in transit/storage, secret-chat-style privacy goals, and audited cryptographic guarantees; no equivalence claim can ship without security/legal approval.
- Bot and web app surfaces must disclose third-party handling, permission scope, payment provider, revocation path, and content visibility.
- Privacy controls must include phone number, last seen/online, profile photo, calls, group invites, voice-message privacy where supported, blocked users, active sessions, 2FA, passkeys, delete account, and data export.
- Safety controls must include spam/scam detection, impersonation reporting, suspicious login alerts, unsafe-link warnings, public group/channel takedowns, bot abuse handling, and illegal-content escalation.
- Large groups, channels, bots, public search, sponsored messages, stories, AI text editing, and payments require additional abuse prevention because they can amplify scams, harassment, illegal content, misinformation, and financial fraud.
- Launch owner: product/security lead for messaging privacy, cryptography owner for secret-chat claims, privacy owner for contacts/data rights, safety owner for public-content moderation, billing owner for premium, bot/platform owner for integrations.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, phone verification requested/verified/failed, contact permission granted/denied, chat created, message send succeeded/failed, media upload failed, folder changed, group created, channel followed, bot permission granted/revoked, call started/ended, report submitted, block created, privacy setting changed, export requested, delete requested, entitlement state changed.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of message bodies, contact names, phone numbers, media contents, precise location, bot payloads, AI prompts, or call content.
- Delivery and calling telemetry must separate operational reliability metrics from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original premium tiers, storage/limit upgrades, business bots, channel boosts, or sponsored-message alternatives later, but pricing, names, offers, app-store copy, and Telegram positioning must be original.
- Bot payments and sponsored messages are launch-blocked unless fraud, ad disclosure, privacy, chargeback, tax, region, platform, and provider requirements are signed off.
- Premium tests must cover app-store-owned, web/bot-owned, restored, expired, canceled, refunded, grace-period, gifted, channel-boosted, and unavailable states.

## Edge Cases

- First launch offline, unsupported OS, unavailable SIM, SMS blocked, roaming number, rate-limited verification, changed phone number, blocked region, or lost 2FA/passkey.
- Contact permission denied, limited contacts, duplicate normalized numbers, stale address book, blocked contact, hidden phone number, or deleted contact reappearing through a group.
- Message sent while offline, duplicate tap, edited/deleted while replying, forwarded message limit reached, file over limit, disappearing timer expires, or read receipts are unavailable.
- Secret chat started on a lost device, screenshot warning unsupported by OS, key verification mismatch, self-destruct timer race, or user expects cloud recovery.
- Group has no remaining admins, invite link leaked, spam wave joins, topic permissions conflict, public username collision, or moderation action races with message delivery.
- Channel removed, admin banned, subscriber privacy leak risk, comments group unavailable, boost refunded, region unavailable, muted notifications ignored, or sponsored-message review failure.
- Bot token is compromised, bot asks for unsafe permissions, web app payment fails, command response duplicates, or bot is banned after being used in a group.
- Premium purchased on one platform but opened on another, app-store restore fails, webhook delayed, gift/refund changes boost state, or free user receives a premium-uploaded file.
- Account deletion requested with active premium, public channels, bot payments, data export, support case, or legal retention requirement active.

## Test Plan

- Unit tests for phone-number validation, verification state machine, resend/rate limits, session creation, folders, active sessions, 2FA/passkey, and account recovery.
- Unit tests for cloud conversation/message state: send, retry, idempotency, receipts, edit/delete, disappearing expiry, reactions, pins, forwards, polls, and search indexing.
- Unit tests for secret-chat model separation, local-only cache cleanup, timer behavior, screenshot-capability flags, and disabled launch state before security review.
- Unit tests for group/channel roles, invite links, admin permissions, topics, public/private visibility, boosts, polls, stories, and safety controls.
- Contract tests for every API route, including pagination, authorization errors, upload states, receipt states, bot permissions, premium webhooks, report states, and privacy settings.
- Integration tests for onboarding, contact permission granted/denied, one-to-one chat, secret-chat blocker, group creation, channel follow, media sharing, bot command, call start, block/report, and account deletion request.
- Calling tests for mic/camera denied/granted/revoked, one-to-one voice/video, group voice chat, network drop, reconnect, call history, and push notification deep link.
- Privacy tests for phone visibility, last seen/online, blocked users, active sessions, data export, account deletion, analytics redaction, bot disclosure, and secret-chat no-cloud-sync.
- Safety tests for spam/scam, impersonation, illegal public content, CSAM escalation path, terrorist-content escalation path, unsafe links, bot abuse, public channel takedown, and appeal/support flow.
- Offline tests for cached chat list, queued outgoing cloud text, queued media upload, duplicate send collapse, stale receipts, corrupt cache, app termination, and reconnect reconciliation.
- Notification tests for opt-in, denied, revoked, quiet hours, preview disabled, muted chat, channel muted default, call notification, deep link, and sensitive-payload redaction.
- Billing tests for free, premium, expired, canceled, refunded, restored, gifted, boosted, platform-owned, bot/web-owned, and unavailable entitlements.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, captions/transcripts where available, large tap targets, and keyboard/external input on tablets.
- Manual verification tests: native iOS/Android screenshots, phone verification, contacts import, cloud sync, secret chats, groups/channels, bots, premium purchase/restore, calls, stories, push payloads, data export, deletion, and recovery on real devices/accounts.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Telegram assets, copy, sticker packs, private APIs, proprietary protocols, public channel data, bot catalog data, payment rails, or moderation decisions.
- New users can register by phone number, verify, create a profile, control contact permission, and start a chat with an invited, contact-discovered, or username-discovered user.
- Returning users can send, receive, search, react to, pin, delete, and forward cloud messages with deterministic delivery/read states and privacy controls.
- Secret-chat-style privacy, public channels, large groups, bots, calls, stories, premium, sponsored messages, AI features, and payments include explicit feature flags, security/privacy language, and launch blockers where not independently verified.
- Groups and channels support admins, invite links, public/private visibility, reactions/polls, media sharing, notifications, reporting, and abuse controls.
- Account settings include active sessions, phone-number change, two-step verification/passkey, blocked users, privacy settings, data export, account deletion, support, terms, and privacy policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which original cryptography stack and independent security-review process will back any V1 secret-chat or end-to-end encryption claims?
- Which phone verification, push notification, media storage, calling, TURN/SFU, translation, AI text editing, sticker/GIF, bot, and payment providers will be used?
- Will V1 support public channel discovery, sponsored messages, bot payments, premium boosts, stories, and AI text editing, or explicitly defer them?
- Which launch regions determine phone-number, public-content, CSAM, terrorist-content, payments, ads, data-rights, and age requirements?
- How will the downstream team distinguish private cloud chats, secret chats, public channels, bots, and support evidence in storage and moderation tooling?

## Build Plan

- Phase 1: scaffold app shell, phone-number auth, profile setup, contact-permission flow, chat list/folders, one-to-one cloud text messaging, delivery state, privacy-safe analytics, and support/legal links.
- Phase 2: add media/document uploads, voice/video messages, reactions, replies, pins, search, archive/mute, disappearing timers, block/report, and offline queued cloud sends.
- Phase 3: add groups, group settings, admin roles, invite links, topics, polls, group safety controls, and public/private visibility.
- Phase 4: add channels, channel admin tools, follow/mute behavior, comments linkage, stories placeholder, boosts placeholder, public-content reporting, and takedown states.
- Phase 5: add secret-chat-style feature behind security-review flag, key verification UI, local-only cache cleanup, timer tests, and no-cloud-sync regression coverage.
- Phase 6: add calls with provider-backed signaling/media, call history, permission handling, group-call limits, reconnect behavior, and notification handling.
- Phase 7: add premium entitlements, upload limits, checkout/restore/webhooks, gifts/boost placeholders, billing regression tests, and support states.
- Phase 8: evaluate bots, bot web apps, sponsored messages, payments, AI text editing, and public search only after separate legal, provider, safety, privacy, fraud, and platform-policy approvals.
- Phase 9: complete account deletion/export, phone-number change, support cases, accessibility pass, offline/reconnect pass, privacy/security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party FAQ/legal/moderation URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
