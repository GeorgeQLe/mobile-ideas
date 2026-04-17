# FaceTime-Style Clone Spec

> Metadata
> - Inspiration app: FaceTime
> - Category: Apple account calling, audio/video calls, group calls, call links, SharePlay-style co-presence, screen sharing, reactions, live captions, and device handoff
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public App Store page, Apple FaceTime Support pages, Apple Platform Security guidance, Apple privacy/legal pages, and public feature-availability notes.
> - Manual verification blockers: native iOS/iPadOS/macOS/tvOS screen capture, Apple Account registration, phone-number/email reachability, FaceTime link host admission, Android/Windows web joining, SharePlay apps, screen sharing remote control, Live Captions accuracy, Contact Posters, Handoff, Apple TV 4K handoff, reactions/gestures, push/call payloads, region restrictions, and device-specific camera/audio effects still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, contact data, call UI artwork, media-provider integrations, captions model, effects, device-continuity behavior, and security implementation.

## Overview

Build an original mobile calling app inspired by FaceTime's public workflow: account/contact-based audio and video calls, group calls, call links, browser guest joins, screen sharing, co-watching/co-listening, camera and microphone effects, reactions, call history, voicemail-style audio/video messages, unknown caller handling, live captions, and cross-device handoff.

The clone must not copy FaceTime branding, screenshots, Apple UI artwork, private Apple services, device continuity protocols, SharePlay integrations, camera effects, captions models, contact poster designs, or proprietary call signaling. Functional parity should be expressed through original product language, independently designed realtime media architecture, licensed providers, and transparent platform limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first audio/video calling experience with account/contact identity, call list, one-to-one calls, group calls, call links, guest admission, permissions, settings, and support/legal flows.
- Preserve privacy expectations around caller identity, unknown callers, microphone/camera access, call links, guest admission, screen sharing, captions, and cross-device state.
- Support co-presence features such as screen sharing, synced media, reactions, captions, and handoff without reusing Apple services, private protocols, or partner media entitlements.
- Keep remote control, SharePlay-style provider integrations, Apple TV/watch/desktop companion behavior, Live Captions, contact posters, and region-specific calling behavior explicitly gated until product, legal, privacy, accessibility, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a FaceTime-branded app or imply affiliation with Apple, FaceTime, SharePlay partners, Apple TV, iMessage, Apple Account, or Apple device-continuity services.
- Do not reuse private Apple APIs, scrape contacts, copy system call UI, copy reactions/effects artwork, or claim Apple-compatible encryption, captions, or handoff behavior without independent review.
- Do not ship synced media playback, remote control, browser guest joining, or cross-device handoff without separate provider, legal, safety, privacy, and platform-policy sign-off.
- Do not claim exact App Store, native-device, browser, region, call-notification, SharePlay, caption, screen-sharing, remote-control, or device-handoff parity until manual verification blockers are resolved.
- There is no official FaceTime Android app; Android participation is limited to browser link joining in Apple's public documentation and must be treated as a platform blocker for native Android parity.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/facetime/id1110145091 | Official iOS/iPadOS listing, category, age rating, supported devices, feature claims for calls, links, SharePlay, screen sharing, reactions, captions, handoff, and release context | Verified 2026-04-17 |
| FaceTime Support | https://support.apple.com/facetime | Canonical support inventory for FaceTime setup, iOS/Mac use, links, handoff, SharePlay, screen sharing, effects, and support paths | Verified 2026-04-17 |
| Use FaceTime on iPhone/iPad | https://support.apple.com/en-us/HT204380 | Audio/video calls, answering calls, missed calls/messages, screen sharing, SharePlay, and realtime interaction entry points | Verified 2026-04-17 |
| Group FaceTime | https://support.apple.com/111767 | Group calls up to 32 people, Messages entry point, adding participants, joining/leaving, and regional/device caveats | Verified 2026-04-17 |
| FaceTime Web Join | https://support.apple.com/en-us/109364 | Android/Windows browser join, Chrome/Edge requirement, host admission, web feature limitations, and China mainland link caveats | Verified 2026-04-17 |
| Screen Sharing | https://support.apple.com/en-us/HT212734 | Screen sharing, ask-to-share, stop sharing, remote-control assistance notes, and availability caveats | Verified 2026-04-17 |
| FaceTime Security | https://support.apple.com/guide/security/facetime-security-sec3c27f3b47/web | Apple security model orientation for FaceTime; used only as inspiration for independent security review requirements | Verified 2026-04-17 |
| Apple Privacy Policy | https://www.apple.com/legal/privacy/en-ww/ | Apple privacy rights, data categories, retention, personalization, safety/fraud handling, and data-rights paths | Verified 2026-04-17 |
| Apple Media Services Terms | https://www.apple.com/legal/internet-services/itunes/us/terms.html | Apple service terms baseline for App Store/media/service use; used for legal orientation only | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listing and support pages position FaceTime around audio/video calls, group calls, call links, browser guest joins, SharePlay, screen sharing, camera/mic modes, reactions, contact posters, live captions, grid view, spatial audio, Center Stage, and handoff.
- Onboarding must include account identity, reachable addresses or phone numbers, contact permission education, notification permission education, camera/microphone education, legal/privacy links, and blocked region/device states.
- The default signed-in surface must support recent calls, missed calls/messages, new call, link creation, contact search, incoming call state, blocked/unknown caller list, settings, help, and privacy controls.
- One-to-one calls must support audio and video, ringing/accepted/declined/missed states, camera/microphone toggles, speaker/audio route, camera switch, effects placeholders, captions where enabled, network quality, and call end recovery.
- Group calls must support invite/add participants, grid layout, current speaker indication, join/leave, host/admission where link-based, participant list, mute/camera state, and up to a product-defined V1 limit.
- Call links must support creation, sharing, guest display name, waiting/admission state, host controls, expiration/revocation, browser guest constraints, and no-login guest limitations.
- Screen sharing must support permission prompts, countdown, app/screen selection where platform allows, stop sharing, viewer state, screenshot/security warnings, and launch-blocked remote control until platform review clears it.
- SharePlay-style synced media must be a provider-backed optional feature, with entitlement checks, region/media rights, shared controls, fallback unsupported states, and separate legal/provider review.
- Live captions/transcripts must include accuracy warnings, language/device availability, retention controls, accessibility review, and launch-blocking model/provider review.
- Account deletion, data export, blocked callers, privacy settings, notification settings, support, terms, and privacy policy must be reachable from settings.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Store call sessions, links, participants, guest identities, device sessions, captions, screen-share metadata, and support evidence under explicit ownership and deletion/export rules.
- Keep native app, browser guest, TV/watch/desktop companion, and handoff clients feature-flagged with independent capability matrices.
- Model realtime media, TURN/SFU, captions, synced media, push, and identity providers as adapters with feature flags, timeout behavior, provider error mapping, and privacy review.
- Call link admission and guest access must be server-authoritative; clients cannot grant participant access from local state alone.
- Analytics and logs must not include call audio/video, screen-share pixels, captions text, contact lists, precise location, media playback titles, or identity tokens.
- Support/safety tooling must include role-based access, redaction, call/report evidence policy, escalation reasons, immutable audit events, and emergency misuse guidance.

## Core User Journeys

- New user installs the app, signs in, confirms reachable address/number, reviews contact/notification/camera/microphone education, and reaches the call list.
- Returning user opens recent calls, starts a one-to-one audio or video call, handles ringing/accepted/declined/missed states, switches camera/audio route, and ends with call history recorded.
- User creates a group call, adds participants from contacts or link, handles participant join/leave, grid layout, active speaker, and notification behavior.
- User creates a call link, sends it to a non-app user, admits a browser guest, limits guest capabilities, revokes the link, and handles expired or region-blocked links.
- User shares their screen, sees a countdown and visible sharing state, stops sharing, and handles viewer feedback without exposing hidden screens.
- User starts synced media or collaboration, sees provider entitlement disclosure, shared controls, unsupported app fallback, and session end behavior.
- User turns on captions, sees language/accuracy disclosure, handles unavailable language/device states, and controls caption retention.
- User receives an unknown call, finds it in a screened list, blocks/reports the caller, and updates privacy settings.
- User hands off or resumes a call on another device where enabled, sees device availability, audio route transfer, and failure fallback.
- User loses connectivity mid-call, sees reconnecting/degraded state, rejoins or ends cleanly, and receives accurate call history.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, reachable identity, consent | sign in, address, phone, legal links | new, returning, unsupported, loading | account locked, region unavailable, identity conflict |
| Permission Primer | Camera, mic, contacts, notifications education | allow, skip, settings | not requested, granted, denied | OS revoked, limited contacts, managed device |
| Call List | Recent, missed, messages, unknown callers | search, new call, link, settings | empty, recent, missed, offline cached | stale history, unknown caller screened, expired session |
| Contact Picker | Start call or group | contacts, search, manual invite | granted, denied, manual entry | blocked contact, invalid address, duplicate |
| Incoming Call | Ringing and quick actions | answer, decline, message, block | ringing, accepted, declined, missed | device locked, DND, simultaneous calls |
| One-To-One Call | Audio/video call controls | mic, camera, route, effects, captions | ringing, active, muted, ended | network drop, permission revoked, camera unavailable |
| Group Call | Multi-person call | add, mute, camera, grid, leave | active, speaker, joined, left | participant limit, host disconnected, link guest pending |
| Call Link Lobby | Guest/host admission | name, join, admit, deny | waiting, admitted, denied, expired | unsupported browser, blocked region, host absent |
| Screen Share | Screen/app sharing | share, ask, stop, annotate | countdown, sharing, viewing | protected content, permission denied, remote control disabled |
| Synced Media | Co-watch/co-listen style session | provider, play, pause, leave | disabled, active, out-of-sync | entitlement missing, region block, provider outage |
| Captions | Live caption display and controls | enable, language, size, retention | disabled, active, unavailable | low accuracy, unsupported language, model outage |
| Unknown Callers | Screened calls and blocking | review, call back, block, report | empty, pending, blocked | spoofed identity, urgent abuse, stale entry |
| Privacy And Safety | Caller reachability, blocks, links, data | toggles, block list, export, delete | saved, pending, inherited defaults | sync delay, managed account, delete pending |
| Settings/Support | Account, devices, legal, help | profile, devices, help, legal | loaded, signed-out, pending | support outage, unavailable control, blocked account |

## Data Model

- `User`: account identity, reachable addresses, phone number, profile, region, age/consent state, account lifecycle, deletion/export state, and safety restrictions.
- `DeviceSession`: platform, app version, camera/mic capability, push token, call capability, companion-device role, handoff state, and last active timestamp.
- `ContactGrant`: permission state, normalized contact hashes, manually invited identities, last sync timestamp, and revocation/deletion state.
- `CallSession`: call type, participants, host, link id, ringing/active/ended state, media provider ids, permission state, network quality, and call history outcome.
- `CallParticipant`: user or guest identity, device role, joined/left timestamps, mic/camera state, admission state, display name, and blocked/report state.
- `CallLink`: creator, token, expiration, revocation, admission policy, guest permissions, browser capability, region/device blockers, and audit metadata.
- `MediaTrackState`: camera, microphone, screen, captions, effects, spatial audio, route, quality, muted/paused state, and provider error.
- `ScreenShareSession`: sharer, viewers, surface type, start/stop state, remote-control disabled flag, protected-content state, and safety warnings.
- `SyncedMediaSession`: provider, media reference, entitlement state, playback cursor, participant control state, region availability, and provider error.
- `CaptionSession`: language, model/provider, speaker attribution, accuracy warning, retention setting, transcript storage state, and accessibility settings.
- `UnknownCallerEntry`: caller identity, call attempt, screening reason, user action, block/report references, and retention state.
- `PrivacySettings`: reachability addresses, unknown caller handling, link admission defaults, blocked callers, notification categories, captions retention, and data export preferences.
- `SafetyReport`: reported call/link/participant, reason, reporter, evidence policy, decision, escalation, appeal/support case.
- `AuditEvent`: append-only record for auth, device sessions, links, admissions, privacy changes, deletion/export, screen sharing, captions, and safety actions.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account/session lifecycle with device, region, and deletion-state gates.
- `GET /contacts/matches`, `POST /contacts/sync`, `DELETE /contacts/sync`: consented contact discovery with privacy-preserving hashes and manual invite fallback.
- `GET /calls/history?cursor=`, `POST /calls`, `PATCH /calls/:id`, `POST /calls/:id/end`: call lifecycle with idempotency keys, participant state, network states, and call history outcome.
- `POST /calls/:id/participants`, `DELETE /calls/:id/participants/:participantId`: add/remove participants with host/admission authorization and participant-limit errors.
- `POST /call-links`, `GET /call-links/:token`, `PATCH /call-links/:id`, `DELETE /call-links/:id`: link creation, guest discovery, expiration, revocation, admission policy, and region/browser blockers.
- `POST /call-links/:id/join-requests`, `PATCH /call-links/:id/join-requests/:requestId`: guest lobby, host admit/deny, timeout, and host-absent behavior.
- `POST /media/sessions`, `PATCH /media/sessions/:id`, `POST /media/sessions/:id/reconnect`: provider-backed signaling, TURN/SFU routing, quality state, and reconnect tokens.
- `POST /screen-shares`, `PATCH /screen-shares/:id`, `DELETE /screen-shares/:id`: screen sharing lifecycle, protected-content errors, and disabled remote-control states.
- `POST /synced-media/sessions`, `PATCH /synced-media/sessions/:id`: provider-backed co-presence with entitlement, region, and out-of-sync errors.
- `POST /captions/sessions`, `PATCH /captions/sessions/:id`, `DELETE /captions/sessions/:id`: caption lifecycle with language, accuracy warning, retention, and provider errors.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `GET /blocks`, `POST /blocks`, `POST /reports`: privacy, block, unknown caller, report, and support lifecycle.
- `POST /data-export`, `DELETE /account`: privacy workflows with async status, active call/link consequences, transcript consequences, and retention caveats.

## Realtime, Push, And Offline Behavior

- Call signaling uses websocket/SSE or provider realtime channels with push-assisted wake-up and canonical server reconciliation after missed events.
- Media sessions must expose connecting, ringing, active, degraded, reconnecting, ended, failed, and expired states.
- The client may cache call history, recent contacts, link metadata created by the user, settings, and pending support reports for offline reads.
- Offline actions can queue low-risk settings edits and report drafts; call start, link admission, screen sharing, captions, synced media, and account deletion require server/provider confirmation.
- Call links must degrade gracefully when the host is offline, a browser is unsupported, a region blocks links, or a guest lacks camera/microphone permission.
- Screen sharing must stop or visibly degrade when the app backgrounds, protected content appears, OS permission changes, or network quality drops.
- Caption sessions must handle model latency, speaker attribution uncertainty, unsupported language, disabled retention, and reconnect without silently saving transcripts.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and content-minimized for incoming calls, missed calls, call links, support cases, and account/security events.

## Permissions, Privacy, And Safety

- Camera, microphone, contacts, notifications, local network/Bluetooth/audio route, screen recording, photos/files, and calendar permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude call audio/video, screen-share pixels, caption text, contact lists, precise location, media titles, invite tokens, and raw support evidence.
- Security language must distinguish transport encryption, provider media security, browser guest limitations, and any independently reviewed end-to-end claims.
- Call links must disclose who can join, whether admission is required, what guests can see, how to revoke the link, and when the link expires.
- Screen sharing must include visible sharing state, stop control, protected-content handling, and no hidden remote-control behavior.
- Captions must disclose accuracy limitations and must not be relied on for emergencies, medical, legal, or safety-critical decisions.
- Safety controls must include unknown caller screening, block/report, abuse escalation, spam link detection, underage/region controls, and support evidence handling.
- Launch owner: realtime/media owner for calling quality, security owner for encryption claims, privacy owner for contacts/links/captions, accessibility owner for captions and effects, safety owner for abuse/reporting, provider owner for synced media.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, contact permission changed, call started/answered/ended/failed, group call created, link created/admitted/denied/revoked, screen share started/stopped, captions enabled/disabled, report submitted, block created, privacy setting changed, export requested, delete requested.
- Every analytics event must use object type, coarse participant counts, feature surface, latency, and failure codes instead of call content, captions, contact names, invite tokens, precise location, or media titles.
- Calling reliability metrics must separate operational telemetry from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original premium call limits, business/team features, larger group calls, caption minutes, or storage later, but pricing, names, offers, and Apple/FaceTime positioning must be original.
- Synced media and business/team calling are launch-blocked unless provider licensing, accessibility, fraud, privacy, tax, region, and platform requirements are signed off.

## Edge Cases

- First launch offline, unsupported OS, unavailable camera/microphone, account locked, too-young account, blocked region, expired session, or identity conflict.
- Contact permission denied, limited contacts, stale address book, duplicate reachable addresses, blocked caller, unknown caller, or deleted account.
- Call invite arrives during another call, device locked, Do Not Disturb active, watch/desktop companion inconsistent, or push notification delayed.
- Group call exceeds participant limit, host leaves, guest joins without account, browser lacks required codecs, link expires, or China mainland-style link limitations apply in a launch region.
- Screen sharing starts accidentally, protected content appears, app backgrounds, network drops, remote-control request is unsupported, or viewer records externally.
- Captions misidentify speaker, language unsupported, model latency high, transcript retention disabled, or user treats captions as legal/medical truth.
- Synced media provider entitlement is missing, playback drifts, participant lacks subscription, region rights fail, or provider revokes access mid-call.
- Handoff fails between devices, audio route does not transfer, Bluetooth disconnects, low power mode stops background behavior, or companion device has stale state.
- Account deletion requested with active links, pending support case, retained abuse evidence, saved captions, or legal retention requirement active.

## Test Plan

- Unit tests for account/session state, contact permission, call state machine, participant admission, call links, idempotency keys, and privacy-safe analytics.
- Unit tests for media state: mic/camera denied/granted/revoked, ringing, active, mute/unmute, camera switch, route change, degraded network, reconnect, and end.
- Unit tests for call links: create, share, guest name, admit, deny, expire, revoke, browser unsupported, region blocked, and host absent.
- Unit tests for screen sharing, captions, synced media feature flags, unsupported states, provider errors, and disabled launch state before review.
- Contract tests for every API route, including authorization errors, participant limits, link states, media reconnect, caption states, report states, and privacy settings.
- Integration tests for onboarding, contact permission granted/denied, one-to-one call, group call, link guest join, unknown caller block, report, and account deletion request.
- Calling tests for poor network, app backgrounding, device lock, Bluetooth route change, push notification deep link, simultaneous call, and call history.
- Privacy tests for blocked callers, link revocation, guest capability limits, caption retention, data export, account deletion, analytics redaction, and support evidence.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, caption sizing, haptic/audio alternatives, and large tap targets.
- Manual verification tests: native iOS/iPadOS/macOS/tvOS screenshots, Apple Account reachability, FaceTime links, Android/Windows web join, SharePlay apps, screen sharing remote control, captions, reactions, handoff, push payloads, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without FaceTime assets, Apple private APIs, SharePlay provider contracts, Apple device-continuity protocols, contact data, captions models, or proprietary call UI.
- New users can sign in, confirm reachable identity, review permissions, find contacts manually or by consented discovery, and start an audio/video call.
- Returning users can answer, decline, miss, resume, and end one-to-one and group calls with deterministic participant, permission, network, and history states.
- Call links, browser guest joining, screen sharing, synced media, captions, handoff, reactions/effects, and companion-device behavior include explicit feature flags and launch blockers where not independently verified.
- Settings include reachable identities, blocked callers, unknown caller handling, notification settings, privacy controls, data export, account deletion, support, terms, and privacy policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which realtime media provider, TURN/SFU stack, and independent security-review process will back V1 calling and any encryption claims?
- Which identity, reachable-address, contacts, push notification, captions, synced media, and device-handoff providers will be used?
- Will V1 support browser guest joins, call links, screen sharing, captions, synced media, effects/reactions, and handoff, or explicitly defer them?
- Which launch regions determine calling availability, link availability, data-rights, age requirements, and emergency-service disclaimers?
- How will the downstream team distinguish native app, browser guest, companion device, screen-share metadata, captions, and support evidence in storage and moderation tooling?

## Build Plan

- Phase 1: scaffold app shell, account auth, profile/reachable identity, contact-permission flow, call list, one-to-one audio/video calls, call history, privacy-safe analytics, and support/legal links.
- Phase 2: add group calls, participant list, add/remove participant, network quality, reconnect, call notifications, blocked callers, and unknown caller handling.
- Phase 3: add call links, guest lobby/admission, browser capability matrix, link expiration/revocation, and guest safety tests.
- Phase 4: add screen sharing behind platform-review flag, protected-content handling, visible sharing state, and stop/recover tests.
- Phase 5: add captions behind accessibility/provider-review flag, language availability, accuracy disclosure, retention settings, and transcript deletion/export tests.
- Phase 6: evaluate synced media, reactions/effects, contact posters, handoff, TV/watch/desktop companions, and remote control only after separate provider, legal, privacy, accessibility, and platform approvals.
- Phase 7: complete account deletion/export, support cases, offline/reconnect pass, privacy/security review, accessibility pass, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck App Store and first-party support/legal/privacy URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
