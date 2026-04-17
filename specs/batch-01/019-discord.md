# Discord-Style Clone Spec

> Metadata
> - Inspiration app: Discord
> - Category: Community chat, servers, roles, voice/video, streaming, activities, moderation, paid personalization
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Discord Help Center, Discord privacy/terms/community guidelines, Discord Safety Center, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, signed-in onboarding, age gate, server creation, invite links, role and permission behavior, voice/video/streaming, activities, app directory, Nitro purchase/restore, server boosts, parental/family controls, content moderation, notification payloads, account deletion/export, and region/device-specific behavior still require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample communities, message content, emoji/sticker packs, activities, bots/apps, moderation policy, safety classifiers, payment integrations, and ranking/discovery systems.

## Overview

Build an original community chat app inspired by Discord's public workflow: account onboarding, friend/DM messaging, servers, channels, roles, permissions, voice rooms, video/screen sharing, low-latency streaming, activities, custom emoji/stickers, statuses, notifications, moderation tools, safety controls, app/bot integrations, discovery, Nitro-style paid personalization, and account lifecycle controls.

The clone must not copy Discord branding, screenshots, marketing copy, protected UI artwork, private APIs, network contracts, server data, moderation decisions, paid-plan names, activities, quests, app directory data, or safety systems. Functional parity should be expressed through original product language, original community data, licensed providers, independently designed permissions, and auditable safety tooling.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first community chat product with onboarding, profile setup, friends/DMs, servers, channels, roles, text chat, voice/video, notifications, settings, moderation, support, and account controls.
- Preserve community safety expectations around age gates, teen/minor protections, family/parent surfaces, reporting, blocking, muting, privacy settings, content moderation, invite abuse, and role/permission boundaries.
- Use original discovery, recommendation, moderation, permission, voice/media, activity, bot/app, and entitlement systems with licensed or first-party sample content.
- Keep Nitro-style subscriptions, server boosts, app directory, activities, quests/sponsored content, monetized servers, and public discovery explicitly gated until product, legal, safety, privacy, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Discord-branded app or imply affiliation with Discord, communities, game publishers, app developers, or payment partners.
- Do not scrape production services, use private APIs, replay mobile network traffic, copy proprietary datasets, clone exact moderation decisions, or bypass access controls.
- Do not copy plan names, prices, promotional copy, quests, activities, custom assets, emoji/sticker packs, bots, app-directory entries, server templates, or trust/safety labels.
- Do not treat public marketplace/help pages as proof of exact native state machines; signed-in, paid, age-gated, regional, notification, and device-specific behavior remains blocked until verified.
- Do not build runtime application code in this repository; this repo remains the planning and specification source of truth.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/discord-talk-play-hang-out/id985746746 | Official iOS listing, category, age rating, privacy labels, supported devices, in-app purchases, version notes, servers, DMs, voice/video, streaming, activities, and support/privacy links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.discord | Official Android listing, package id, rating/download scale, content rating, data safety, in-app purchases, social/voice/video claims, and support contact | Verified 2026-04-17 |
| Discord Help Center | https://support.discord.com/hc/en-us | Account settings, server settings, Nitro/billing, safety/privacy/policy, apps, troubleshooting, and support request entry point | Verified 2026-04-17 |
| Discord Privacy Policy | https://discord.com/privacy | Account data, user content, public/larger spaces, voice/video handling, safety processing, sponsored content, privacy controls, and retention | Verified 2026-04-17 |
| Discord Terms of Service | https://discord.com/terms | Account rules, paid services, user content, acceptable use, age/access terms, and service availability | Verified 2026-04-17 |
| Discord Community Guidelines | https://discord.com/guidelines | Platform safety requirements, prohibited content and behavior, moderation expectations, and enforcement posture | Verified 2026-04-17 |
| Discord Safety Center | https://discord.com/safety | Safety resources, family/teen/privacy/policy hubs, reporting orientation, and user safety education | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Discord as a social and gaming-oriented community app with group chats, servers, voice/video/text chat, streaming, custom emoji/stickers/soundboard effects, statuses, activities, multiple devices, and in-app purchases.
- Account onboarding must include email/phone/password or social auth where chosen, age/birthday gate, username/display name, optional phone verification, community guidelines consent, and blocked/underage/unsupported states.
- The default signed-in surface must support DMs, friend requests, server list, channels, unread mentions, search, notifications, profile/status, settings, Nitro-style entry points, and safety/support access.
- Servers must support owner/admin/member roles, categories, channels, invite links, verification levels, moderation settings, rules/safety onboarding, discovery eligibility, templates where included, and transfer/delete states.
- Channels must support text, voice, announcement/stage/forum/thread-style variants where included, per-channel permissions, slow mode, pins, search, attachments, reactions, mentions, role pings, unread markers, and archived/locked/deleted states.
- Roles and permissions must be deterministic, testable, auditable, and never enforced only on the client; role hierarchy, overrides, admin privileges, and moderation permissions require explicit authorization contracts.
- DMs and group DMs must support friend relationships, message requests, block/mute, media/files, voice/video calls, presence/status, and unsafe-link/report flows.
- Voice/video must support joining/leaving channels, push-to-talk or mute/deafen where included, camera, screen sharing, stream viewing, low-connectivity states, activity presence, and audio-route changes.
- Activities, games, apps, bots, quests, sponsored content, and app directory behavior are not core V1. They must be disabled or provider-gated until separate legal, safety, privacy, moderation, and developer-platform reviews define lawful behavior.
- Nitro-style entitlements may include original paid personalization, larger uploads, profile decorations, extra emoji/stickers, boosts, and server perks, but all naming, pricing, offers, and promotional copy must be original.
- Account deletion, data export, privacy settings, notification settings, blocked users, authorized apps, billing, support, terms, privacy policy, report, and appeal paths must be reachable from settings.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Keep public, semi-public, server-private, channel-private, DM, group-DM, voice/video, activity, and support content under distinct visibility and retention rules.
- Keep permission evaluation server-side with signed policy snapshots, audit events, and regression fixtures for role hierarchy and channel overrides.
- Model every external dependency as an adapter with feature flags, timeout behavior, provider-specific error mapping, data retention notes, and privacy review.
- Keep entitlement checks server-authoritative; the client may cache feature summaries but cannot grant paid, moderation, app, or server privileges alone.
- Store only normalized event codes in analytics and operational logs; raw messages, media bytes, voice/video content, precise location, payment credentials, minor-safety data, and private identifiers are disallowed.
- Provide support and safety tooling with role-based access, redaction, escalation reasons, immutable audit events, appeal states, and separate handling for DMs versus larger/public spaces.

## Core User Journeys

- New user installs the app, reviews original onboarding and legal/safety education, passes the age gate, creates or restores an account, sets profile/status, and reaches DMs/server list.
- Returning user opens the app, sees unread DMs/servers/channels, resumes a text conversation, sends media or a reaction, and resolves mentions or replies.
- User creates a server, chooses original template/settings, creates text and voice channels, defines roles/permissions, invites friends, and handles invite expiration or abuse.
- User joins a server from an invite, passes verification/rules onboarding, selects channels, sends messages, joins voice, and receives role-based access or denial.
- User joins a voice channel, grants microphone/camera permissions, mutes/deafens, shares screen where enabled, watches a stream, starts an activity placeholder, and leaves cleanly.
- User moderates a server: reviews reports, deletes content, times out/bans a user, updates rules, audits role changes, and handles an appeal/support case.
- User blocks or reports harassment, spam, explicit content, impersonation, unsafe links, or grooming risk; the app preserves evidence according to visibility rules and returns safety feedback.
- User buys, restores, cancels, refunds, or loses paid personalization/boost access and sees deterministic locked/unlocked states across app-store and web-owned purchases.
- Teen/minor user or guardian opens safety/family settings, reviews privacy controls, reporting guidance, message restrictions, sensitive-content settings, and account support paths.
- User requests data export or account deletion and sees consequences for servers, messages, purchases, moderation records, and legal retention.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account creation, login, consent, age gate | email, phone, password, birthday, terms | new, returning, underage, loading | verification failed, blocked region, rate limited |
| Profile Setup | Username, display name, avatar, status | text, avatar, status, pronouns where included | blank, valid, syncing | username unavailable, unsafe avatar, sync failure |
| Home/DMs | Friends, group DMs, recent messages | search, compose, friend request, calls | empty, unread, message requests, offline cached | blocked user, expired session, unsafe message |
| Server List | Joined servers and discovery entry | server icon, invite, create, search | empty, joined, unread, unavailable | banned server, invite expired, age-gated |
| Channel List | Server channels, categories, mentions | channel tap, search, collapse, role gate | visible, hidden, muted, unread | permission denied, deleted, archived |
| Text Channel | Community conversation | text, media, reactions, reply, pin, thread | sending, delivered, failed, moderated | slow mode, role denied, takedown, spam |
| DM/Group DM | Private or small-group messaging | text, media, call, block, report | active, request, blocked, muted | unsafe link, privacy mismatch, deleted account |
| Voice/Video Channel | Real-time audio/video and streams | join, mic, camera, screen, activity | connecting, active, muted, streaming | permission revoked, network drop, capacity limit |
| Server Settings | Roles, channels, rules, invites, moderation | roles, permissions, invite, rules | owner, admin, moderator, member | role hierarchy conflict, ownership transfer |
| Role Editor | Permission and member assignment | toggles, member list, channel overrides | valid, pending, inherited | admin escalation, override conflict, audit failure |
| Moderation Queue | Reports, actions, audit log, appeals | report reason, action, note, appeal | pending, actioned, appealed, resolved | duplicate report, urgent harm, legal hold |
| Discovery/Invite | Join or browse communities | invite code, search, categories | valid, expired, public, private | age gate, banned user, server unavailable |
| Apps/Bots | Integrations and developer apps | authorize, permissions, revoke | disclosed, authorized, revoked | malicious app, scope mismatch, callback failure |
| Nitro/Entitlements | Paid personalization and boosts | subscribe, restore, boost, cancel | free, active, expired, restored | platform mismatch, webhook delay, refund |
| Safety/Family | Teen, privacy, blocking, reporting education | toggles, guardian link, report | saved, pending, restricted | guardian mismatch, region law, underage state |
| Settings/Profile | Account, privacy, notifications, data, legal | profile, 2FA, export, delete | loaded, signed out, pending deletion | active subscription, moderation hold, support unavailable |

## Data Model

- `User`: account identity, birthday/age gate, locale, region, username, display profile, account status, consent state, deletion/export state.
- `DeviceSession`: device id, platform, app version, notification token, session expiry, trusted device state, last active timestamp.
- `Friendship`: requester, recipient, status, privacy rules, blocked/muted state, message-request state, audit metadata.
- `Server`: owner, name, icon, categories, verification level, discovery state, rules, safety settings, boost state, deletion/archive state.
- `Channel`: server, type, category, topic, permission overrides, slow mode, thread/forum/stage metadata, visibility, deletion/archive state.
- `Role`: server, hierarchy rank, permissions, color/display metadata, managed/bot state, assignable state, audit metadata.
- `Membership`: user/server role set, join source, verification state, timeout/ban state, notification preferences, safety flags.
- `Conversation`: DM, group DM, channel, thread, voice, system, or support context with membership, visibility, mute/archive, retention, and sync policy.
- `Message`: sender, conversation, content parts, reply/thread/pin state, edit/delete state, mention targets, moderation state, report references.
- `ContentPart`: text, image, video, file, voice note, sticker, emoji, embed, poll, activity reference, app payload, scan state, retention state.
- `VoiceSession`: server/channel or DM, participants, mute/deafen/camera/screen state, stream metadata, activity state, quality metrics, join/leave audit.
- `Invite`: server/channel, creator, code, expiration, use limits, target role/onboarding, abuse state, revocation state.
- `AppIntegration`: developer owner, bot user, scopes, permissions, install target, webhook/callback state, abuse state, revocation state.
- `Entitlement`: plan key, platform, receipt id, renewal/expiration/refund state, personalization limits, upload limits, boost allocations, restore state.
- `SafetyReport`: reported object, reason, reporter, evidence snapshot policy, decision, enforcement action, appeal/support case.
- `AuditEvent`: append-only account, auth, role, permission, moderation, billing, app authorization, privacy, deletion/export, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions`: device-scoped authentication with age gate, 2FA, audit events, and abuse throttles.
- `GET /me`, `PATCH /me`, `GET /settings`, `PATCH /settings`: account, profile, privacy, notification, accessibility, and entitlement settings.
- `GET /friends`, `POST /friends`, `PATCH /friends/:id`, `POST /blocks`: friend requests, message requests, blocks, mutes, and privacy rules.
- `GET /servers`, `POST /servers`, `PATCH /servers/:id`, `DELETE /servers/:id`: server lifecycle, owner transfer, discovery state, rules, and safety settings.
- `GET /servers/:id/channels`, `POST /channels`, `PATCH /channels/:id`, `DELETE /channels/:id`: channel/category/thread lifecycle with permission and audit checks.
- `GET /servers/:id/roles`, `POST /roles`, `PATCH /roles/:id`, `DELETE /roles/:id`, `POST /members/:id/roles`: role hierarchy, permissions, assignment, and channel overrides.
- `GET /conversations/:id/messages?cursor=`, `POST /conversations/:id/messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: message send/edit/delete with idempotency keys, mentions, slow mode, moderation prechecks, and failure codes.
- `POST /messages/:id/reactions`, `POST /messages/:id/pin`, `POST /messages/:id/report`: message actions with authorization, audit, and abuse controls.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed upload flow with MIME/size validation, malware scanning, rights metadata, processing states, and entitlement limits.
- `POST /voice/sessions`, `PATCH /voice/sessions/:id`, `POST /voice/sessions/:id/end`: voice/video/screen-share lifecycle with permission, participant, network, and stream states.
- `GET /invites/:code`, `POST /invites`, `DELETE /invites/:code`: invite validation, onboarding/rules gates, expiration, use limits, and abuse controls.
- `GET /moderation/reports`, `POST /reports`, `POST /moderation/actions`, `GET /audit-log`: report, enforcement, appeal, audit, and moderator role checks.
- `GET /apps`, `POST /apps/:id/authorize`, `DELETE /apps/:id/authorization`: disabled-by-default app/bot authorization with scopes, permission display, and revocation.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`, `POST /servers/:id/boosts`: server-authoritative paid feature lifecycle.
- `POST /data-export`, `DELETE /account`, `GET /privacy/requests/:id`: privacy workflows with confirmation, asynchronous status, retention notes, and support fallback.
- `GET /support/cases/:id`, `POST /support/cases`: support escalation with redaction, abuse controls, and account recovery states.

## Realtime, Push, And Offline Behavior

- Message, presence, typing, unread, role, channel, and moderation events use websocket/SSE or push-assisted sync with canonical server reconciliation after reconnect.
- Permission changes must invalidate affected channel, role, voice, message, and invite caches immediately on reconnect and before sensitive writes.
- The client may cache server/channel lists, recent DMs/messages, settings, entitlement summary, and safe drafts for offline reads.
- Queue low-risk drafts locally with retry metadata; block role changes, moderation actions, server deletion, account deletion, payments, app authorization, and report submission while offline.
- Voice/video and streaming sessions must tolerate permission revocation, app backgrounding, Bluetooth route changes, network handoff, duplicate join events, reconnect, and capacity limits.
- Uploads must resume or fail with visible recovery; partially uploaded or unscanned media cannot be published.
- Push notifications must be opt-in, category-scoped, quiet-hour aware, muted-server aware, mention-aware, and free of sensitive message/media/payment/minor-safety details by default.
- Deleted, private, banned, blocked, muted, age-restricted, region-locked, entitlement-locked, or removed content must be redacted consistently from caches and notifications.

## Permissions, Privacy, And Safety

- Treat user-generated content moderation as a launch-blocking review area with owner, mitigation, test coverage, and manual-verification status.
- Treat teen/minor safety, grooming, explicit content, harassment, self-harm, violent extremism, illegal goods, impersonation, malware, and fraud as launch-blocking risk areas.
- Treat role/permission escalation and public invite abuse as launch-blocking security areas with deterministic tests and audit coverage.
- Request camera, microphone, photos/files, notifications, contacts, local network, clipboard, or activity/presence permissions only when the user invokes a feature that needs it.
- Provide permission-denied fallbacks, settings education, no dark patterns, and no silent re-prompts.
- Provide user-visible privacy policy, terms, community guidelines, data export, delete account, report abuse, block/mute, family/safety education, and support escalation paths.
- Minimize sensitive data in analytics, crash reports, model/provider logs, support tooling, moderation queues, and developer app callbacks.
- Redact or hash private identifiers in logs; store raw content only where needed for product function, legal obligation, safety review, or user-requested support.
- Apps/bots/activities must disclose scopes, install targets, data access, developer identity, revocation path, and marketplace/safety review state.
- Launch owner: safety owner for moderation and teen safety, platform owner for roles/permissions/apps, privacy owner for data rights, billing owner for entitlements, realtime owner for voice/video, accessibility owner for dynamic type/screen reader coverage.

## Analytics And Monetization

- Track privacy-safe lifecycle events: onboarding started/completed, age gate passed/blocked, DM sent, server created, channel joined, message send succeeded/failed, voice joined/left, invite used, role changed, report submitted, block/mute created, privacy setting changed, export requested, delete requested, entitlement state changed.
- Every event must use stable object types, coarse counts, feature surface, latency, and failure codes, not raw user-visible text, messages, media URLs, voice/video content, payment details, precise location, minor-safety details, or private identifiers.
- Monetization can include original free, paid, personalization, boost, or creator/community tiers later, but names, prices, bundles, benefits, and promotional copy must be original.
- Paywall states must identify blocked feature, current entitlement, restore path, platform owner, server confirmation state, refund/grace state, and support path.
- Sponsored content, quests, public discovery, and activity/app monetization must separate targeting signals from sensitive content and expose opt-out or privacy controls where required.
- Billing tests must cover app-store-owned, web-owned, restored, expired, canceled, refunded, grace-period, boosted, gifted, family/shared where applicable, and unavailable states.

## Edge Cases

- First launch offline, unsupported OS, underage user, blocked region, expired session, suspended account, compromised account, or service outage.
- Username/display name conflict, unsafe profile image, phone verification required mid-flow, 2FA lockout, lost account, or account disabled for safety review.
- Server invite expired, user banned from server, rules onboarding failed, server deleted, role permissions changed while composing, or channel moved/archived.
- Role hierarchy conflict, admin privilege escalation, bot-managed role, channel override denial, stale permission cache, or audit log write failure.
- Message sent while offline, duplicate tap, slow mode active, mention suppressed, edited/deleted while replying, thread archived, attachment scan failed, or moderation removes content mid-flow.
- Voice starts with denied microphone/camera, participant joins from another device, screen share prompt fails, network handoff drops media, stream capacity limit reached, or activity provider times out.
- Public server discovery exposes unsafe content, invite spam wave joins, raid detection false positive, report evidence missing, urgent harm escalation, or appeal conflicts with legal hold.
- Nitro-style purchase made on web but opened on iOS, app-store restore fails, webhook delayed, refunded entitlement remains cached, server boost removed, or paid upload size exceeds later entitlement.
- Data export/account deletion requested while subscription, moderation review, server ownership, support case, upload, or legal retention is active.

## Test Plan

- Unit tests for auth, age gate, username validation, session state, 2FA, privacy settings, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.
- Unit tests for server/channel/role permissions, role hierarchy, channel overrides, invite validation, audit logs, verification/rules gates, and server deletion/ownership transfer.
- Unit tests for conversation/message state: send, retry, mentions, slow mode, reactions, pins, threads, edit/delete, attachment states, moderation removal, and search indexing.
- Contract tests for every API route, including pagination, authorization errors, upload states, voice session states, role errors, invite errors, billing webhooks, privacy request, and report states.
- Integration tests for onboarding, DM, friend request, server create, invite join, channel post, role assignment, voice join, file upload, report/block/mute, notification preferences, billing restore, data export, and account deletion.
- Voice/video tests for mic/camera denied/granted/revoked, mute/deafen, one-to-one calls, channel voice, screen sharing flag, network drop, reconnect, stream viewer limit, and call history.
- Safety tests for harassment, grooming risk, explicit content, spam/raid, impersonation, malware link, self-harm escalation, illegal goods, violent extremism, moderator abuse, and appeal/support states.
- Offline tests for cached DMs/server/channel lists, queued drafts, blocked sensitive writes, reconnect reconciliation, stale permission invalidation, corrupt cache recovery, and deleted-object cache cleanup.
- Notification tests for opt-in, denied, revoked, quiet hours, muted server/channel, mention rules, DM privacy, call notification, deep link, and sensitive-payload redaction.
- Billing tests for free, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, boosted, gifted, grace-period, and unavailable entitlements.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, captions/alt text where relevant, color contrast, large touch targets, and keyboard/external input on tablets.
- Manual verification tests for native iOS screenshots, native Android screenshots, signed-in onboarding, server/role behavior, voice/video/streaming, paid purchase/restore, push payloads, family controls, deletion/export completion, and region/device-specific behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary Discord assets, private APIs, network traffic, brand copy, server data, activities, app directory data, paid-plan names, or moderation tooling.
- New and returning users can complete onboarding, age gate, primary DM/server workflow, settings, support, report/block or safety action, and data/account lifecycle paths.
- Servers, channels, roles, permissions, invites, messages, attachments, voice/video, notifications, and moderation have deterministic API contracts, failure codes, audit events, and tests.
- Public, server-private, channel-private, DM, group-DM, voice/video, app, and support content have explicit visibility, retention, deletion/export, and moderation behavior.
- Category-specific launch blockers are either resolved with evidence or remain behind explicit feature flags and acceptance-test blockers.
- Manual verification blockers are preserved until lawful hands-on evidence confirms exact native behavior.

## Open Questions

- Which downstream implementation repository, framework, realtime provider, media provider, moderation stack, and billing provider will own this clone?
- Which features are V1 versus deferred: public discovery, forums, stages, activities, app directory, quests, sponsored content, server monetization, and boosts?
- Which paid, account-linked, age-gated, regional, notification, or device-specific flows can be lawfully verified with available test accounts/devices?
- Which safety policies, teen/minor protections, appeal processes, and moderator tooling must be completed before public beta?
- How will the downstream team model role/permission audits so stale clients cannot perform newly unauthorized actions?

## Build Plan

- Phase 1: scaffold app shell, auth/session model, age gate, profile setup, DMs, friend requests, default home, settings/legal links, privacy-safe analytics, and accessibility baseline.
- Phase 2: add servers, channel list, text channels, messages, media uploads, reactions, mentions, pins, local drafts, offline cache/reconnect behavior, and notification preferences.
- Phase 3: add roles, permissions, channel overrides, invite links, rules onboarding, audit logs, server settings, and deterministic permission tests.
- Phase 4: add voice/video channels with provider-backed signaling/media, mute/deafen/camera/screen flags, permission handling, reconnect behavior, and call/voice notifications.
- Phase 5: add moderation reports, block/mute, safety queue, enforcement actions, appeal/support cases, teen/family safety surfaces, and policy review coverage.
- Phase 6: add search, threads/forum-style surfaces where selected, app/bot authorization placeholders, public discovery flags, and support redaction.
- Phase 7: add entitlements, paywall states, checkout/restore/webhooks, boost placeholders, paid upload limits, and billing regression tests.
- Phase 8: evaluate activities, app directory, quests/sponsored content, creator/server monetization, and public discovery only after separate legal, provider, safety, privacy, fraud, and platform-policy approvals.
- Phase 9: complete data export, account deletion, accessibility pass, offline/reconnect validation, performance validation, policy review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party help/legal/safety URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
