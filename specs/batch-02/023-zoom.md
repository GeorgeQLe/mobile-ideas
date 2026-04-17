# Zoom-Style Clone Spec

> Metadata
> - Inspiration app: Zoom Workplace
> - Category: Video meetings, team chat, calendar, phone-style calling, whiteboards, docs, AI meeting assistance, webinars, enterprise administration, and cloud recording
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Zoom Support pages, Zoom privacy/legal pages, and public meeting/security documentation.
> - Manual verification blockers: native iOS/Android screen capture, free vs paid license limits, AI Companion availability, meeting scheduling, calendar integration, join-without-account, waiting room, host/co-host controls, screen share, recording consent, cloud recording, team chat, Zoom Phone/SMS, whiteboards/docs, webinars, admin/MDM controls, CarPlay/watch behavior, push payloads, data export/deletion, and regional/industry restrictions still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, meeting content, recordings, chat data, AI provider behavior, calendar data, phone/SMS integrations, enterprise policy, and security implementation.

## Overview

Build an original mobile collaboration app inspired by Zoom Workplace's public workflow: schedule and join meetings, start instant meetings, use waiting rooms, manage participant and host controls, share screen/content, chat, record where allowed, view upcoming meetings, integrate calendars, and expose paid/admin/AI features as explicit optional modules.

The clone must not copy Zoom branding, screenshots, marketing copy, proprietary meeting infrastructure, AI Companion behavior, recordings, chat data, whiteboard/doc tools, phone/SMS integrations, private APIs, enterprise policy defaults, or security claims. Functional parity should be expressed through original product language, independently designed realtime media architecture, licensed providers, and transparent limitations.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first meeting experience with account/guest join, upcoming meetings, schedule/start/join flows, waiting room, participant controls, host controls, chat, screen sharing, settings, and support/legal flows.
- Preserve privacy and compliance expectations around meeting links, passcodes, waiting room admission, recording consent, chat retention, participant identity, admin locks, AI summaries, and cloud recordings.
- Support collaboration modules such as team chat, calendar/mail, whiteboards/docs, phone/SMS, webinars, and AI assistance as feature-flagged extensions rather than core V1 assumptions.
- Keep AI Companion, cloud recording, phone/SMS, webinars, enterprise/MDM, customer-managed encryption, regulated industry, and paid-plan limits explicitly gated until product, legal, safety, privacy, security, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Zoom-branded app or imply affiliation with Zoom, Zoom Workplace, Zoom Rooms, Zoom Phone, Zoom AI Companion, calendar providers, or enterprise customers.
- Do not reuse private Zoom APIs, copy meeting UI artwork, import real recordings/chats, copy AI prompts/summaries, or claim Zoom-compatible encryption, admin, recording, webinar, or phone behavior.
- Do not ship production AI summaries, cloud recording, phone/SMS, webinars, paid subscriptions, or enterprise policy enforcement without separate legal, privacy, security, billing, and provider sign-off.
- Do not claim exact App Store, Play Store, native-device, meeting, recording, waiting room, host-control, AI, admin, calendar, phone, MDM, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/zoom-workplace/id546505307 | Official iOS listing, category, supported devices, in-app purchases, AI Companion, meetings, chat, phone, calendar/mail/docs, CarPlay/watch, subscriptions, privacy labels | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=us.zoom.videomeetings | Official Android listing, package id, rating/download scale, data safety, AI/meetings/chat/phone/calendar/workplace claims, in-app purchases | Verified 2026-04-17 |
| Zoom Support Center | https://support.zoom.com/hc | Canonical support inventory for Zoom Workplace, meetings, chat, phone, admin, account, billing, privacy, and troubleshooting | Verified 2026-04-17 |
| Joining A Zoom Meeting | https://support.zoom.com/hc/en/article?cms_guid=false&id=zm_kb&lang=en-US&sysparm_article=KB0060732 | Join methods through invite, browser, mobile app, phone, Zoom Room, SIP/H.323, and account-optional join behavior | Verified 2026-04-17 |
| Scheduling Meetings | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060700 | Meeting scheduling methods, mobile app support, host-controlled options, admin-locked setting caveats | Verified 2026-04-17 |
| Participant Controls | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062674 | Participant control surfaces, mobile app controls, audio/video behavior, and disabled-feature caveats | Verified 2026-04-17 |
| Host And Co-Host Controls | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065164 | Host/co-host privileges, participant management, recording controls, and host-only limitations | Verified 2026-04-17 |
| Waiting Room | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063329 | Waiting room host admission, hold/admit behavior, bypass rules, customization, and meeting-minute caveats | Verified 2026-04-17 |
| Viewing Upcoming Meetings | https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060655 | Mobile upcoming meetings tab, scheduled/recurring meetings, calendar integration, and mobile cloud-recording limitation | Verified 2026-04-17 |
| Zoom Terms of Service | https://www.zoom.com/terms/ | Service rules, user responsibilities, paid plan/legal terms, AI/data terms references, and availability caveats | Verified 2026-04-17 |
| Zoom Privacy Statement | https://explore.zoom.us/privacy/ | Data handling, customer content, privacy rights, retention, subprocessor/provider context, and controls | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Zoom Workplace around video meetings, team chat, phone/SMS, whiteboard, calendar, mail, docs, AI Companion, meeting summaries, subscriptions, device handoff, and enterprise security/SSO.
- Onboarding must support sign-in, SSO, guest join, meeting link/deep link entry, display-name entry, camera/mic education, notification education, calendar integration education, legal/privacy links, and blocked account/license states.
- The default signed-in surface must support upcoming meetings, start/join/schedule, calendar-connected events, team chat entry points where enabled, settings, account/license state, help, and upgrade prompts.
- Join flow must support meeting link, meeting id/passcode, browser/mobile handoff, waiting room, host-not-started, removed/blocked participant, meeting full, wrong passcode, and account-required states.
- Scheduling must support topic, date/time, recurrence, invitees, calendar provider, passcode, waiting room, join-before-host, mute/video defaults, admin-locked settings, and edit/delete.
- Participant controls must support mute/unmute, camera, audio route, reactions, chat, screen share request, participants list, raise hand where enabled, leave, and feature-disabled states.
- Host/co-host controls must support admit/remove, mute participant, stop video, rename, assign co-host, lock meeting, enable waiting room, manage chat/share, start/stop recording where allowed, and end meeting for all.
- Waiting room must support individual/admit-all, send to waiting room, bypass rules, host disconnect handling, customization behind paid/admin gates, and accessibility for waiting participants.
- Recording and AI summaries must include host/admin settings, visible indicators, consent notices, disabled states, retention/export/delete controls, and launch-blocking privacy/security review.
- Account deletion, data export, support, billing, subscription state, privacy policy, terms, and admin escalation paths must be reachable from settings.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented user jobs.
- Store meetings, participants, chat, recordings, transcripts, AI outputs, calendar events, licenses, admin policies, reports, and audit events under explicit ownership and deletion/export rules.
- Keep meeting, team chat, phone/SMS, webinar, recording, AI, and enterprise admin modules separated by feature flags, storage scopes, analytics scopes, and security review.
- Model realtime media, TURN/SFU, calendar, recording, transcription, AI, push, identity, and billing providers as adapters with feature flags, timeout behavior, provider error mapping, and privacy review.
- Meeting host/admin settings must be server-authoritative; clients cannot grant host, recording, AI, phone, or license privileges from local state alone.
- Analytics and logs must not include raw audio/video, screen-share pixels, chat text, recordings, transcripts, calendar bodies, phone numbers, AI prompts/outputs, payment credentials, or enterprise policy secrets.
- Support/admin tooling must include role-based access, redaction, legal hold, retention, escalation reasons, immutable audit events, and separate treatment for regulated customer data.

## Core User Journeys

- New user installs the app, signs in or joins as guest, reviews camera/microphone/notification education, and lands on the meetings home.
- User joins by link, enters display name, waits in waiting room, is admitted by host, joins audio, starts camera, sends chat, reacts, and leaves.
- Host schedules a meeting, sets passcode/waiting room, adds invitees, saves to calendar, edits details, and starts it from upcoming meetings.
- Host starts an instant meeting, admits participants, mutes one participant, manages chat/screen sharing, assigns co-host, locks the meeting, and ends for all.
- Participant shares screen or content where allowed, sees visible sharing state, stops sharing, and handles host-disabled sharing.
- User records or requests recording where enabled, sees consent indicators, stops recording, and finds unavailable/cloud-recording states on mobile.
- Paid or enterprise user uses AI summary/transcription where enabled, sees consent and region/license disclosure, and handles admin-disabled or unsupported states.
- User opens team chat/calendar/phone entry points where enabled, sees module disclosure, and handles disabled license, provider, or admin state.
- User loses connectivity during a meeting, sees reconnecting/degraded state, rejoins if allowed, and receives accurate meeting history.
- User changes privacy/security settings, exports data, deletes account, opens support, or escalates an abuse/security report.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth/Join | Sign in, SSO, guest join, legal | sign in, SSO, meeting link/id | new, guest, signed-in, locked | SSO failure, wrong account, region block |
| Permission Primer | Camera, mic, notifications, calendar | allow, skip, settings | not requested, granted, denied | OS revoked, managed device, limited calendar |
| Meetings Home | Upcoming meetings and primary actions | start, join, schedule, chat, settings | empty, upcoming, calendar-connected | stale calendar, license expired, offline |
| Join Meeting | Link/id/passcode and prejoin | link, id, passcode, display name | valid, waiting, joining | wrong passcode, host absent, meeting full |
| Waiting Room | Participant hold/admission | admit, deny, chat where enabled | waiting, admitted, denied | host disconnected, bypass conflict, timeout |
| Meeting Room | Participant meeting experience | mic, camera, chat, reactions, share, leave | connecting, active, muted, ended | network drop, permission revoked, feature disabled |
| Host Controls | Participant and meeting management | admit, mute, remove, lock, record | host, co-host, locked, recording | admin lock, host transfer, recording disabled |
| Schedule Meeting | Create/edit meeting | topic, time, invitees, options | draft, saved, edited, deleted | calendar failure, recurrence conflict, admin lock |
| Screen Share | Share screen/content | share, stop, annotation | disabled, countdown, sharing | protected content, host disabled, app background |
| Chat Panel | In-meeting or team chat | message, file, reaction | enabled, muted, disabled | external restriction, retention hold, unsafe link |
| Recording/AI | Recording, transcript, summary | start, consent, stop, view | disabled, active, processing | license missing, region block, consent denied |
| Calendar/Phone Modules | Optional workplace surfaces | calendar, mail, phone, SMS | disabled, connected, active | provider unavailable, admin disabled, billing block |
| Settings/Admin | Account, license, privacy, support | toggles, billing, export, delete | loaded, managed, pending | unavailable control, support outage, legal hold |
| Report/Support | Abuse, security, bug, billing | reason, evidence, submit | submitted, under review, resolved | urgent harm, regulated customer, duplicate |

## Data Model

- `User`: account identity, display name, region, license, role, SSO state, deletion/export state, trust/safety restrictions.
- `DeviceSession`: platform, app version, camera/mic capability, push token, meeting capability, MDM policy, and last active state.
- `LicenseEntitlement`: plan, platform, renewal/expiration/refund state, AI/recording/cloud storage limits, admin restrictions, and restore state.
- `Meeting`: topic, host, schedule, recurrence, passcode, waiting room, join settings, calendar provider, recording/AI settings, and lifecycle.
- `MeetingParticipant`: user/guest identity, role, admission state, mic/camera/share/chat state, join/leave timestamps, and report/block state.
- `WaitingRoomEntry`: meeting, participant, bypass reason, admit/deny status, wait duration, host messages, and timeout.
- `MeetingChatMessage`: meeting/team context, sender, content parts, retention class, external participant flag, moderation/report state, and deletion state.
- `ScreenShareSession`: sharer, surface type, host permission, annotation state, protected-content state, start/stop timestamps.
- `RecordingAsset`: meeting, owner, consent state, storage provider, processing state, retention, transcript/summary references, export/delete state.
- `AISummary`: provider, meeting/recording source, consent state, generated sections, correction state, retention, and region/license blockers.
- `CalendarConnection`: provider, OAuth state, account, event sync status, invite write status, admin restrictions, and revoke state.
- `AdminPolicy`: account/group/user policy, locked settings, MDM constraints, retention/legal hold, external collaboration rules, and audit metadata.
- `SafetyReport`: reported meeting/participant/chat, reason, reporter, evidence policy, decision, escalation, appeal/support case.
- `AuditEvent`: append-only record for auth, meetings, admissions, host controls, recording/AI, calendar, license, admin, deletion/export, and safety actions.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/start`, `POST /auth/sso/callback`, `DELETE /auth/session`: account, SSO, guest, and session lifecycle with region/license gates.
- `GET /meetings/upcoming`, `POST /meetings`, `PATCH /meetings/:id`, `DELETE /meetings/:id`: schedule/edit/delete with recurrence, calendar write, admin locks, and validation errors.
- `POST /meetings/:id/start`, `POST /meetings/join`, `PATCH /meetings/:id/end`: start/join/end lifecycle with passcode, host-not-started, meeting-full, and removed-user errors.
- `POST /meetings/:id/waiting-room`, `PATCH /waiting-room/:entryId`: waiting room enter/admit/deny/admit-all/send-back with host authorization and bypass reasons.
- `PATCH /meetings/:id/participants/:participantId`: mute, stop video, role changes, remove, rename, chat/share permissions, and host/co-host constraints.
- `POST /media/sessions`, `PATCH /media/sessions/:id`, `POST /media/sessions/:id/reconnect`: provider-backed signaling, quality state, route, reconnect token, and device capability errors.
- `POST /screen-shares`, `PATCH /screen-shares/:id`, `DELETE /screen-shares/:id`: share lifecycle with host permissions, protected-content errors, and audit events.
- `GET /meetings/:id/chat`, `POST /meetings/:id/chat`: in-meeting chat with retention, external participant restrictions, file scan, and deletion/report state.
- `POST /recordings`, `PATCH /recordings/:id`, `GET /recordings/:id`: recording lifecycle with consent, license/storage limits, processing, retention, export, and delete.
- `POST /ai/summaries`, `GET /ai/summaries/:id`, `DELETE /ai/summaries/:id`: AI summary lifecycle with consent, region/license gates, provider errors, and retention controls.
- `POST /calendar/connections`, `DELETE /calendar/connections/:id`, `POST /calendar/events`: calendar OAuth, sync, revoke, invite write, and provider-specific errors.
- `GET /settings/policies`, `PATCH /settings/user`, `GET /entitlements`, `POST /billing/restore`: user/admin settings, license, billing, and server-authoritative entitlements.
- `POST /reports`, `GET /reports/:id`, `POST /data-export`, `DELETE /account`: report, support, privacy workflows, and retention/legal-hold caveats.

## Realtime, Push, And Offline Behavior

- Meeting signaling uses websocket/SSE or provider realtime channels with push-assisted wake-up and canonical server reconciliation after missed events.
- Media sessions must expose prejoin, connecting, waiting, active, degraded, reconnecting, ended, failed, and expired states.
- The client may cache upcoming meetings, recent meetings, user settings, license state, and pending support reports for offline reads.
- Offline actions can queue low-risk settings/report drafts; meeting start/join, waiting room admission, host controls, recording, AI, phone/SMS, and account deletion require server/provider confirmation.
- Waiting room state must recover after host disconnect, participant reconnect, device sleep, passcode change, and meeting lock.
- Recording/AI state must survive app backgrounding and expose processing, failed, retention-limited, deleted, or permission-denied states.
- Push notifications must be opt-in, category-controlled, quiet-hour aware, and content-minimized for meeting reminders, waiting room, chats, recordings, AI summaries, security, and support.

## Permissions, Privacy, And Safety

- Camera, microphone, screen recording, photos/files, calendar, contacts, notifications, Bluetooth/local network/audio route, location, and phone/SMS permissions must be requested only when the user invokes the related feature.
- Default analytics must exclude call audio/video, screen-share pixels, chat bodies, recording files, transcripts, calendar body text, phone numbers, AI prompts/outputs, payment credentials, and admin policy secrets.
- Recording and AI summaries must show visible in-meeting indicators, consent notices, admin/license restrictions, retention settings, and deletion/export paths.
- Meeting links and waiting rooms must disclose who can join, whether admission/passcode is required, what guests can see, and how hosts can remove/block/report participants.
- Enterprise and regulated customers must have admin policy, retention, legal hold, encryption, and data residency behavior modeled explicitly before launch.
- Safety controls must include meeting abuse reports, participant removal, meeting lock, chat restrictions, unsafe link/file scanning, impersonation handling, urgent-harm escalation, and support evidence handling.
- Launch owner: realtime/media owner for meeting quality, security owner for encryption/recording, privacy owner for recordings/AI/calendar, compliance owner for enterprise policies, safety owner for abuse, billing owner for paid plans.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, join attempted/succeeded/failed, meeting scheduled/started/ended, waiting room admitted/denied, host action used, screen share started/stopped, recording started/stopped, AI summary requested, report submitted, privacy setting changed, export requested, delete requested, entitlement changed.
- Every analytics event must use object type, coarse counts, feature surface, latency, and failure codes instead of meeting content, chat text, recordings, transcripts, invitee names, calendar details, phone numbers, or AI content.
- Meeting reliability metrics must separate operational telemetry from user-visible analytics and minimize retention for privacy-sensitive metadata.
- Monetization can include original paid meeting lengths, cloud recording storage, AI summaries, enterprise admin, webinars, or phone add-ons later, but pricing, names, offers, app-store copy, and Zoom positioning must be original.
- Paid plan, AI, recording, phone/SMS, webinar, and enterprise features are launch-blocked unless billing, privacy, compliance, fraud, tax, region, and platform requirements are signed off.

## Edge Cases

- First launch offline, unsupported OS, SSO unavailable, account locked, expired license, admin disabled feature, blocked region, or guest name invalid.
- Meeting id wrong, passcode wrong, host absent, waiting room times out, meeting full, join before host disabled, or participant removed and tries to rejoin.
- Host disconnects, co-host leaves, admin setting changes mid-meeting, participant loses network, app backgrounds, Bluetooth route changes, or push arrives late.
- Screen share starts with protected content, host disables sharing mid-share, app background stops capture, or participant expects unsupported annotation.
- Recording starts without visible consent, storage limit reached, cloud processing fails, retention expires, transcript generated incorrectly, or mobile cannot view a recording.
- AI summary unavailable by region/license, participant opts out or leaves, admin disables AI, summary is inaccurate, or user treats it as legal/medical truth.
- Calendar provider token expires, recurring meeting edit conflicts, calendar invite fails, external invitee lacks account, or time zone changes.
- Chat with external participant is disabled, file is unsafe, retention/legal hold applies, message is deleted while report is pending, or eDiscovery request conflicts with deletion.
- Account deletion requested with active recordings, legal hold, billing subscription, enterprise retention, pending report, or admin ownership requirement.

## Test Plan

- Unit tests for account/session/SSO state, license gates, meeting scheduling, recurrence, passcode validation, join state, waiting room, host controls, and privacy-safe analytics.
- Unit tests for media state: prejoin, mic/camera denied/granted/revoked, active, mute/unmute, camera switch, screen share, degraded network, reconnect, and end.
- Unit tests for recording and AI state: consent, start/stop, processing, failed, retention, delete/export, license missing, region blocked, and admin disabled.
- Contract tests for every API route, including authorization errors, admin locks, participant limits, waiting room states, recording states, AI states, reports, and privacy settings.
- Integration tests for guest join, signed-in join, schedule/start meeting, waiting room admit, host mute/remove/lock, in-meeting chat, screen share, report, and account deletion request.
- Privacy tests for meeting link revocation, guest capability limits, recording consent, AI retention, data export, account deletion, analytics redaction, and support evidence.
- Safety tests for meeting disruption, impersonation, harassment, unsafe links/files, participant removal, meeting lock, duplicate report, urgent escalation, and appeal/support flow.
- Offline tests for cached upcoming meetings, queued report drafts, reconnect after sleep, stale waiting room state, corrupt cache, and provider outage.
- Accessibility tests for dynamic type, screen-reader labels, focus order, contrast, reduced motion, caption sizing where enabled, keyboard/external input, and large tap targets.
- Manual verification tests: native iOS/Android screenshots, free/paid licenses, AI Companion, schedule/join, waiting room, host controls, screen share, recordings, team chat, phone/SMS, webinars, admin/MDM, push payloads, data export, deletion, and regional availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without Zoom assets, private APIs, recordings, chat data, AI behavior, phone/SMS integrations, enterprise policy defaults, or proprietary meeting infrastructure.
- New users can sign in or join as guest, review permissions, join by link/id/passcode, pass through waiting room, and participate in a meeting.
- Hosts can schedule, start, admit, mute, remove, manage chat/share, lock, record where enabled, and end meetings with deterministic permission and admin states.
- AI Companion, recording, cloud storage, phone/SMS, webinars, team chat, whiteboards/docs, calendar/mail, MDM, and enterprise admin include explicit feature flags and launch blockers where not independently verified.
- Settings include account/license state, notifications, privacy/security, recordings/AI where enabled, data export, account deletion, support, terms, and privacy policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which realtime media provider, TURN/SFU stack, recording/transcription provider, AI provider, and independent security-review process will back V1 meetings?
- Which identity, SSO, calendar, push notification, file storage, billing, phone/SMS, and admin-policy providers will be used?
- Will V1 support guest join, waiting room, screen sharing, recording, AI summaries, team chat, webinars, phone/SMS, and enterprise admin, or explicitly defer them?
- Which launch regions and customer segments determine AI, recording consent, data residency, eDiscovery, phone/SMS, billing, and regulated-industry requirements?
- How will the downstream team distinguish meeting media, chats, recordings, transcripts, AI summaries, admin policies, and support evidence in storage and privacy tooling?

## Build Plan

- Phase 1: scaffold app shell, account/guest auth, prejoin, meeting home, join by link/id/passcode, one-to-one/group meeting room, privacy-safe analytics, and support/legal links.
- Phase 2: add scheduling, upcoming meetings, calendar provider connection, waiting room, host/co-host controls, participant controls, and meeting notifications.
- Phase 3: add in-meeting chat, screen sharing behind platform-review flag, reconnect behavior, meeting lock, reports, and abuse controls.
- Phase 4: add recording behind privacy/compliance-review flag, consent indicators, processing, retention, delete/export, and storage limits.
- Phase 5: add AI summaries/transcripts behind provider/legal/privacy-review flag, region/license gates, consent, retention, correction, and deletion tests.
- Phase 6: evaluate team chat, phone/SMS, webinars, whiteboards/docs, CarPlay/watch, MDM, and enterprise admin only after separate legal, provider, privacy, compliance, and platform approvals.
- Phase 7: complete account deletion/export, support cases, offline/reconnect pass, accessibility pass, privacy/security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party support/legal/privacy URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
