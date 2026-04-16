# 094 Dropbox Clone Spec

## Legal Scope
- Clone file storage, folder navigation, sharing, upload, sync, and version history.
- Use original branding and file icons, not copied trademarks.

## Product Goal
- Provide reliable file storage and cross-device sync with simple sharing.

## Research Verification Checklist
- Public file upload, sharing, and sync behavior: verify.
- Offline availability, camera upload, and versioning: verify.
- Folder permissions and link sharing defaults: verify.

## Core User Journeys
- User uploads a file from device or camera.
- User browses folders and recent files.
- User shares a file or folder link.
- User restores an older file version.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Files | Root file view | Search, sort | Empty, synced | Duplicate upload |
| Folder | Browse content | Open, reorder | Populated, empty | Permission denied |
| File Detail | Metadata and history | Share, versions | Live, archived | Unsupported file |
| Upload Queue | Sync progress | Retry, cancel | Pending, done | Network loss |
| Share | Access control | Link, invite | Active, revoked | Expired link |

## Functional Requirements
- Support file and folder upload, rename, move, delete, and restore.
- Support share links with permissions and expiration.
- Support version history for supported file types.
- Maintain offline availability for selected files.
- Support camera upload and automatic backup where enabled.

## Data Model
- `User`, `Folder`, `FileItem`, `Revision`, `ShareLink`, `PermissionGrant`, `UploadJob`, `Device`.
- Track file checksum, mime type, and sync state.

## API/Backend Contracts
- `GET /files`
- `POST /files`
- `PATCH /files/{id}`
- `GET /files/{id}/revisions`
- `POST /share-links`
- `POST /uploads/init`

## Realtime/Push/Offline
- Realtime sync status for upload and folder changes.
- Offline queue for file mutations.
- Push for shared file comments or access changes only if implemented.

## Permissions/Privacy/Safety
- Enforce folder and link permissions server-side.
- Encrypt data in transit and at rest.
- Allow revoke-link and device logout flows.

## Analytics Events
- `file_uploaded`, `folder_opened`, `file_shared`, `revision_restored`, `upload_failed`, `sync_completed`, `permission_changed`.

## Monetization
- Freemium with storage quotas and paid storage tiers.

## Acceptance Tests
- Upload a file and see it sync on a second device.
- Share a folder link with read-only access.
- Restore a prior revision successfully.
- Browse selected files offline.

## Implementation Notes
- Use chunked uploads for large files.
- Store sync state separately from file metadata.
- Make folder moves atomic to avoid duplicate placement during sync.

