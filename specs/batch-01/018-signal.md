# Signal-Style Private Messenger Clone Spec

## Legal Scope
- Clone objective: build a privacy-centered messenger with phone-number onboarding, encrypted-style chat UX, disappearing messages, safety numbers, and voice/video calls.
- Must not copy: Signal branding, cryptographic implementation, protocol internals, or safety-number visuals.
- Replacement brand/assets: use original privacy branding, icons, and settings copy.

## Product Goal
- Let users exchange private messages and calls with minimal metadata exposure and strong control over message retention.

## Research Verification Checklist
- [ ] Phone onboarding and registration lock behavior
- [ ] Disappearing message timer settings
- [ ] Safety number or device verification flow
- [ ] Voice/video call setup and permissions
- [ ] Linked device management
- [ ] Backup, restore, and transfer behavior
- [ ] Privacy warnings and sealed-sender-like metadata handling
- [ ] Offline queue and sync reliability

## Core User Journeys
- User verifies a phone number and starts a private chat.
- User enables disappearing messages in a thread.
- User verifies a contact using a safety number or similar trust check.
- User places a voice or video call.
- User links or removes a secondary device.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Onboarding | Register phone number | new, verified, locked |
| Chat List | Browse private threads | unread, archived, muted |
| Thread | Send secure messages | sending, delivered, hidden |
| Disappearing Timer | Set retention window | off, custom, per-thread |
| Safety Check | Verify identity | matched, mismatch, pending |
| Call Screen | Voice/video call | connecting, live, ended |
| Linked Devices | Manage sessions | trusted, revoked, pending |
| Privacy Settings | Control metadata and backups | default, strict |

## Functional Requirements
- Support 1:1 and group chats with secure transport abstraction.
- Support disappearing messages, view-once media, and message requests where applicable.
- Support voice/video calls with minimal metadata and clear trust prompts.
- Support linked devices, transfers, and backup/restore workflows.
- Support blocking, reporting, and contact controls.
- Keep the app usable even when some privacy features are disabled by policy or device state.

## Data Model
- User: id, phone_hash, display_name, privacy_mode, backup_pref.
- Conversation: id, participant_ids, disappearing_rule, archived_at.
- Message: id, conversation_id, sender_id, body, media_refs, expires_at.
- SafetyCheck: id, conversation_id, peer_id, verified_at, status.
- DeviceLink: id, user_id, device_name, trust_state, added_at.
- CallSession: id, conversation_id, call_type, started_at, ended_at.

## API/Backend Contracts
- `POST /auth/phone/start`, `POST /auth/phone/verify`
- `GET /conversations`, `POST /conversations`, `GET /conversations/:id/messages`
- `POST /messages`, `PATCH /conversations/:id/disappearing`
- `POST /safety-checks`, `GET /devices`, `POST /devices/link`, `DELETE /devices/:id`
- `POST /calls`, `PATCH /calls/:id`
- Keep transport envelope handling abstract and policy-driven.

## Realtime/Push/Offline
- Push on incoming messages and call invitations, but minimize payload metadata.
- Cache recent chats locally for read-only offline use.
- Queue outgoing messages until the secure session is available.
- Sync disappearing-message deletions consistently across clients.

## Permissions/Privacy/Safety
- Request contacts, microphone, camera, and notifications only when necessary.
- Default to strict privacy settings and clear explanations.
- Avoid collecting unnecessary analytics or message metadata.
- Provide crisis and support resources for abuse and self-harm content.

## Analytics Events
- `phone_verified`, `chat_started`, `message_sent`, `disappearing_set`
- `safety_check_completed`, `device_linked`, `call_started`, `backup_enabled`
- `privacy_updated`, `report_submitted`

## Monetization
- No ad model in core scope; optional donations or paid support features only if product strategy requires it.

## Acceptance Tests
- User can register, message a contact, and delete a thread.
- Disappearing messages expire and disappear from the UI and sync layer.
- Safety check can confirm or reject a contact match.
- Linked devices can be added and revoked.
- Offline read works without exposing extra metadata.

## Implementation Notes
- Keep encryption and key management behind a dedicated service boundary.
- Store as little metadata as possible and make that constraint testable.
- Treat backup and transfer as privileged flows with explicit user consent.
- Verify exact onboarding, safety check, and backup behavior from live research.

