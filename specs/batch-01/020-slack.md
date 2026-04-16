# Slack-Style Team Chat Clone Spec

## Legal Scope
- Clone objective: build a workspace chat app with channels, threads, mentions, files, search, status, and integrations.
- Must not copy: Slack branding, icons, proprietary integrations, or enterprise policy wording.
- Replacement brand/assets: use original workspace branding and original UI copy.

## Product Goal
- Let teams communicate in channels and threads, search history, share files, and manage notifications with workplace-grade control.

## Research Verification Checklist
- [ ] Workspace onboarding and invite flow
- [ ] Channel creation, membership, and archive behavior
- [ ] Threaded replies and mention behavior
- [ ] File upload, preview, and retention rules
- [ ] Search quality and filters
- [ ] Status, do-not-disturb, and notification settings
- [ ] Integrations, webhooks, and app permissions
- [ ] Offline cache and multi-device sync behavior

## Core User Journeys
- User joins a workspace, opens a channel, and sends a message.
- User replies in a thread and receives a mention alert.
- User uploads a file and shares it into a channel.
- User updates status and notification preferences.
- User uses search to find a prior message or document.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Workspace Switcher | Change workspace | loading, active, archived |
| Channel List | Browse channels | unread, muted, private |
| Channel View | Read/write messages | threadable, pinned, locked |
| Thread View | Focused replies | open, resolved, shared |
| Search | Find messages/files | query, filter, no results |
| Files | Shared documents | recent, starred, restricted |
| Status/Prefs | Presence and DND | active, away, custom |
| Integrations | Manage connected apps | installed, pending, revoked |

## Functional Requirements
- Support workspaces, channels, threads, DMs, and huddles-like lightweight voice if in scope.
- Support mentions, reactions, pins, edits, deletes, and file attachments.
- Support enterprise-grade search across messages, channels, and files.
- Support status, presence, and notification rules by workspace and channel.
- Support integrations through webhooks or app installs.
- Support retention and export controls for workspace data.

## Data Model
- User: id, email, display_name, status, presence, role.
- Workspace: id, name, domain, plan, retention_policy.
- Channel: id, workspace_id, name, purpose, private, archived.
- Message: id, channel_id, thread_id, author_id, body, file_refs, edited_at.
- File: id, workspace_id, filename, mime, storage_ref, retention_state.
- Integration: id, workspace_id, name, config_json, status.
- NotificationRule: id, user_id, scope, mute_state, keyword_filters.

## API/Backend Contracts
- `GET /workspaces`, `POST /workspaces`, `POST /workspaces/:id/join`
- `GET /channels/:id/messages`, `POST /channels/:id/messages`
- `POST /messages/:id/replies`, `POST /messages/:id/reactions`
- `POST /files/upload-url`, `GET /search?q=`, `PATCH /status`
- `POST /integrations`, `DELETE /integrations/:id`, `PATCH /notifications`
- Support idempotent writes and incremental sync tokens.

## Realtime/Push/Offline
- Push on mentions, direct messages, and thread replies.
- Cache recent channels, search results, and files offline.
- Sync read state, presence, and edits when reconnecting.
- Queue outgoing messages and uploads when offline.

## Permissions/Privacy/Safety
- Enforce workspace policies, channel privacy, and retention rules on the server.
- Provide admin and owner roles with visible audit actions.
- Keep file sharing and external integrations permission-scoped.
- Support legal hold or export workflows if included in product scope.

## Analytics Events
- `workspace_joined`, `channel_opened`, `message_sent`, `thread_replied`
- `file_shared`, `search_used`, `status_updated`, `integration_added`
- `notification_tuned`, `workspace_archived`

## Monetization
- Seat-based subscription with team plan features and storage limits.
- Paid tiers can unlock retention controls, integrations, and larger history.

## Acceptance Tests
- User can join a workspace and message in a channel.
- User can reply in a thread and see mentions notify correctly.
- User can upload a file and find it via search.
- Status changes propagate across devices.
- Offline draft survives restart and sends after reconnect.

## Implementation Notes
- Treat workspace, channel, and thread ids as the core routing keys.
- Keep search indexed separately from message storage to support scale and filters.
- Separate user presence from message delivery so offline and DND stay accurate.
- Verify exact plan gates, integrations, and thread behavior with live product research.

