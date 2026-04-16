# 095 Google Drive Clone Spec

## Legal Scope
- Clone cloud file storage, folder sharing, document previews, and search.
- Use original branding placeholders and do not copy proprietary office assets.

## Product Goal
- Offer a universal file hub with storage, sharing, search, and lightweight previewing.

## Research Verification Checklist
- Public drive surfaces, shared drive handling, and preview behavior: verify.
- Permission models and shortcut behavior: verify.
- Offline access and upload limits: verify.

## Core User Journeys
- User uploads a file and shares it with collaborators.
- User opens a folder, previews a document, and searches content.
- User creates a shortcut or moves content between folders.
- User accesses shared files from a team area.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Drive Home | Entry and recent files | Search, upload | Loaded, empty | No files |
| Folder View | Browse content | Open, sort | Populated, empty | Permission denied |
| Preview | View file content | Page, zoom | Ready, loading | Unsupported type |
| Shared With Me | External access | Open, filter | Populated, empty | Revoked access |
| Share Dialog | Grant permissions | Email, role | Pending, active | External domain |

## Functional Requirements
- Support upload, download, rename, move, delete, shortcut, and share.
- Provide preview for common docs, images, audio, and video.
- Support shared drives or shared folders with role-based access.
- Search by filename and indexed content.
- Cache selected files offline.

## Data Model
- `Account`, `DriveItem`, `Folder`, `Shortcut`, `Permission`, `ShareLink`, `Comment`, `Revision`, `OfflinePin`.
- Maintain parent-child relations with stable ids.

## API/Backend Contracts
- `GET /drive/items`
- `POST /drive/items`
- `PATCH /drive/items/{id}`
- `POST /drive/items/{id}/share`
- `GET /drive/search?q=`
- `GET /drive/items/{id}/preview`

## Realtime/Push/Offline
- Realtime updates for shared file edits and permission changes.
- Offline edits for metadata and queued uploads.
- Push for mentions, comments, and access grants if enabled.

## Permissions/Privacy/Safety
- Enforce file-level and folder-level ACLs.
- Never expose content through search without authorization.
- Provide export and deletion tooling.

## Analytics Events
- `drive_item_uploaded`, `drive_item_opened`, `preview_loaded`, `share_created`, `permission_granted`, `search_used`, `offline_pin_set`.

## Monetization
- Free storage tier with paid storage expansion and team features.

## Acceptance Tests
- Upload a file, share it, and open it from another account.
- Preview a document and search within its title.
- Pin a file offline and open it without network.
- Revoke access and confirm the file disappears for the guest.

## Implementation Notes
- Reuse the same storage primitives as the Dropbox-like spec where possible.
- Keep preview generation asynchronous and cached.
- Separate permission checks from item listing to avoid leaks.

