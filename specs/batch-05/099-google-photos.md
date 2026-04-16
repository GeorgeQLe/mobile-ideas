# 099 Google Photos Clone Spec

## Legal Scope
- Clone photo backup, search, albums, sharing, and memory-style surfaces.
- Use original branding placeholders and original visual language.

## Product Goal
- Provide a personal media vault with backup, search, organization, and sharing.

## Research Verification Checklist
- Public backup flow, albums, and sharing behaviors: verify.
- Search features, face grouping, and memories-like surfaces: verify.
- Upload rules and storage limits: verify.

## Core User Journeys
- User enables backup and waits for sync.
- User searches photos by date, location, or object.
- User creates an album and shares it.
- User revisits a memory or highlight collection.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Library | All media | Search, filter | Empty, loaded | Duplicate upload |
| Backup | Sync progress | Toggle, queue | On, off | Low battery |
| Album | Group media | Add, remove | Populated, empty | Missing media |
| Search | Find content | Query | Results, none | Index lag |
| Share | Send album | Invite, link | Pending, active | Revoked access |

## Functional Requirements
- Support automatic camera roll backup with user consent.
- Support albums, shared albums, favorites, and archived items.
- Support search by date, location, text in images, and object tags.
- Support memory or highlight surfacing from recent and seasonal photos.
- Support download, delete, and restore flows.

## Data Model
- `MediaAsset`, `Album`, `ShareLink`, `FaceGroup`, `BackupJob`, `Tag`, `Favorite`, `MemoryItem`.
- Keep original media, derived thumbnails, and search index records separate.

## API/Backend Contracts
- `POST /backup/enable`
- `POST /media/upload`
- `GET /media`
- `GET /search?q=`
- `POST /albums`
- `POST /albums/{id}/share`

## Realtime/Push/Offline
- Background upload and resume for backup.
- Push for shared album activity and backup alerts.
- Offline browse of cached media and albums.

## Permissions/Privacy/Safety
- Photos permission required for backup and browsing.
- Offer granular backup selection and face grouping opt-in.
- Keep shared links revocable and time-bounded where possible.

## Analytics Events
- `backup_enabled`, `media_uploaded`, `search_used`, `album_created`, `share_sent`, `favorite_toggled`, `memory_viewed`, `backup_error`.

## Monetization
- Core backup may be free or quota-limited, with storage expansion as the primary revenue lever.

## Acceptance Tests
- Enable backup and upload new media in the background.
- Search for a photo using a text-in-image query.
- Create a shared album and revoke access.
- Browse cached media offline.

## Implementation Notes
- Use separate pipelines for upload, thumbnailing, OCR, and indexing.
- Keep media browse virtualization tight to avoid memory spikes.
- Make backup jobs resumable after app termination.
