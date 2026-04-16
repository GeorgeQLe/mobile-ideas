# FaceTime-Style Clone Spec

## Legal Scope
- Clone objective: contact-based consumer video calling with group calls, call links, and call history.
- Must not copy: Apple branding, call UI art, proprietary codecs, or device-specific system integrations.
- Original replacement brand: independent name, call tone, icons, and in-app visuals.

## Product Goal
- Let users place high-quality one-to-one and group video calls from a contact list or shareable link.
- Keep the surface simple: recent calls, contacts, active call, and settings.
- Use owned signaling and media infrastructure; no dependency on any private platform service.

## Research Verification Checklist
- Verify call entry points, group-grid behavior, and link invite flow from lawful observation.
- Verify whether audio-only fallback, screen sharing, and call handoff are in scope.
- Verify any call effects, reactions, or portrait/background options before implementation.
- Verification status: not yet validated beyond backlog.

## Core User Journeys
- Pick a contact, start a call, answer, switch cameras, and end cleanly.
- Create a call link, share it, and let guests join from a landing screen.
- Escalate a 1:1 call into a group call and view the grid layout.
- Review call history, missed call notifications, and blocked caller behavior.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Contacts | Select a caller | search, favorite, recent | empty, populated | missing permission |
| Recents | Call history | tap to redial | synced, stale | deleted history |
| Precall | Device setup | mic, camera, link share | ready, blocked | permissions denied |
| Active Call | Media session | mute, camera, switch, share | connecting, live, hold | network loss, app background |
| Link Join | Guest entry | name, permissions | lobby, joined | expired link, full room |
| Group Grid | Multi-party view | pin, reorder | live, degraded | participant churn |
| Settings | Call preferences | toggles, device picks | saved, error | no devices |

## Functional Requirements
- Support audio, video, mute, speaker, camera flip, and end-call controls.
- Render a responsive grid for multi-party calls with dominant speaker focus.
- Create and revoke invite links with expiration and join limits.
- Record call history including duration, participants, and call outcome.

## Data Model
- Contact, CallSession, CallParticipant, CallInviteLink, DeviceCapability, CallEvent, BlockRule.
- CallSession stores mode, start/end timestamps, network quality, and join source.
- CallInviteLink stores token, expiry, max participants, and revocation status.

## API/Backend Contracts
- Auth: account session plus device registration for push invites.
- Reads: `/contacts`, `/calls/recent`, `/calls/{id}`, `/invites/{token}`.
- Writes: create call, join call, leave call, mute toggle, camera toggle, create/revoke link.
- Realtime: low-latency signaling for presence, join/leave, media negotiation, and quality events.

## Realtime/Push/Offline
- Push on incoming calls, missed calls, and link invitations.
- If offline, show missed-call fallback and allow redial once online.
- Preserve recents locally so the app remains navigable without a network.

## Permissions/Privacy/Safety
- Request camera, microphone, photos, and contacts only when needed.
- Add caller blocking, invite-link controls, and abuse reporting for unwanted calls.
- Never store raw media unless explicit recording support is verified and consented.

## Analytics Events
- `call_started`, `call_answered`, `call_declined`, `call_ended`, `call_link_created`, `group_expanded`, `mute_toggled`, `camera_flipped`, `network_quality_changed`.

## Monetization
- Base calling is free.
- Premium can gate larger group sizes, enhanced effects, or cloud history retention.

## Acceptance Tests
- Place a 1:1 call, mute/unmute, flip camera, and verify join/leave records.
- Create a link, share it, and join from a guest browser session.
- Simulate poor network and ensure the UI reflects degraded media state.
- Deny camera and confirm the app falls back to audio-only or blocks with a clear prompt.

## Implementation Notes
- Use WebRTC or an equivalent owned media stack with a thin signaling service.
- Keep precall setup explicit so device failures are caught before joining.
- Treat call history and link management as first-class APIs, not client-side state only.

