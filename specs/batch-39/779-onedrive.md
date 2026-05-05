# OneDrive-Style Clone Spec

> Metadata
> - Inspiration app: OneDrive
> - Category: Cloud files and identity
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: Microsoft account/work-school tenant authentication, Files On-Demand sync engine behavior, Personal Vault additional authentication, Office document co-authoring real-time merge, photo backup and camera roll integration, Copilot AI features, DLP/compliance policies in business tenants, native iOS/Android screen capture, subscription state transitions.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile-first cloud storage and file synchronization platform inspired by OneDrive's public user-facing workflow. The clone delivers personal and business cloud storage with deep Office productivity integration, Files On-Demand virtual filesystem, Personal Vault for sensitive documents, photo backup with AI-powered organization, real-time co-authoring, granular sharing controls, and cross-platform sync. Core focus areas: file operations with Office integration, sharing and collaboration with co-authoring, sync with Files On-Demand and conflict resolution, security with Personal Vault and DLP, storage management with intelligent cleanup, and photo experiences with memories and albums.

## Goals

- Deliver a cross-platform cloud storage experience with seamless Office document integration, photo backup, and file synchronization.
- Reproduce the functional job behind OneDrive using original product naming, original UI, and licensed integrations.
- Support personal (free and Microsoft 365 subscriber) and business (OneDrive for Business) tiers with appropriate feature differentiation.
- Provide Files On-Demand virtual filesystem that shows all cloud files without downloading them until accessed.
- Enable real-time co-authoring of Office documents with presence indicators and conflict-free collaborative editing.
- Deliver intelligent photo backup with automatic organization, memories, albums, and on-device ML for search.

## Non-Goals

- Do not copy OneDrive/Microsoft branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not replicate Microsoft's proprietary AI/Copilot models or licensed AI features.
- Do not implement actual Microsoft Graph API integration; use equivalent original API contracts.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/microsoft-onedrive/id477537958 | iOS listing, category, age rating, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.microsoft.skydrive | Android listing, content rating, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage | Product overview, feature pages, pricing, plan comparison | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Help center | https://support.microsoft.com/en-us/onedrive | User guides, troubleshooting, feature documentation | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://privacy.microsoft.com/en-us/privacystatement | Microsoft privacy statement covering OneDrive data practices | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.microsoft.com/en-us/servicesagreement | Microsoft Services Agreement covering OneDrive usage | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Developer documentation | https://learn.microsoft.com/en-us/onedrive/developer/ | OneDrive API reference, Graph API integration docs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

### File Operations

- **Upload**: Single-file, multi-file, and folder upload via file picker, share extension, drag-and-drop (desktop/web), camera capture, and document scan. Support resumable upload sessions for files >4 MB with chunked upload protocol. Enforce 250 GB per-file size limit (personal) and tenant-configurable limits (business).
- **Download**: Stream with range-request resume support. Respect sharing permissions. Generate download links for shared items. Support bulk download as ZIP for folders.
- **Preview**: In-app preview for Office documents (Word, Excel, PowerPoint), PDFs, images, videos, audio, and text files. Office documents render with full fidelity including charts, SmartArt, and embedded media. Video streaming with adaptive bitrate.
- **Edit**: Open Office documents in integrated editor with real-time co-authoring. Support simultaneous editing by multiple users with automatic merge. Plain-text and markdown editing in-app. Third-party app handoff via File Provider/Storage Access Framework.
- **Move/Copy**: Batch operations with cross-drive support (personal to shared, shared to personal where permitted). Preserve sharing when moving within same library; prompt about sharing changes when moving between libraries.
- **Delete/Restore**: Soft-delete to recycle bin with 30-day retention (personal) or 93-day (business, admin-configurable). Second-stage recycle bin for site collections. Permanent purge available. Restore preserves original location, version history, and sharing.
- **Versioning**: Automatic versioning on every save. 500 version limit with automatic cleanup of versions older than 30 days (personal). Major/minor versioning available in business libraries. Version restore, download, and delete.

### Sharing And Collaboration

- **Share links**: Anyone, people-in-organization, specific-people, and existing-access link types. Permissions: view, edit, review (suggest changes). Optional password, expiration date, and block-download setting.
- **Direct sharing**: Share with specific users/groups via email with custom message. Recipients receive notification and see item in "Shared with me" view.
- **Co-authoring**: Real-time simultaneous editing of Office documents by multiple users. Presence indicators show who is editing. Changes merge automatically at paragraph/cell level. Conflict resolution for simultaneous edits to same content region.
- **Sharing management**: View who has access, modify permissions, stop sharing, transfer ownership. "Manage access" panel shows all links and direct shares.
- **External sharing**: Configurable per-tenant. Guest access via email verification. External users see shared content in their own OneDrive "Shared" view.
- **Request files**: Create upload-only folder link where others can submit files without seeing existing content.
- **Sharing notifications**: Real-time notification when someone shares with you, edits a shared file, or comments.

### Sync And Offline

- **Files On-Demand**: Virtual filesystem showing all cloud files as placeholders (online-only). Files download on first access and can be freed to reclaim space. Three states: cloud-only (available when online), locally-available (downloaded, may be evicted), always-keep (pinned, never evicted).
- **Known Folder Move**: Redirect Desktop, Documents, and Pictures system folders to cloud sync automatically. Seamless migration with progress indicator.
- **Selective sync**: Choose which folders appear in local filesystem. Hidden folders remain accessible via web/mobile.
- **Conflict resolution**: Detect simultaneous offline edits. Create conflict copy with username and timestamp suffix. Notification prompts user to reconcile. Auto-merge for Office documents when possible.
- **Bandwidth management**: Configurable upload/download rate limits. Pause/resume sync. Automatic throttling on metered connections. Background sync respects battery-saver mode.
- **Sync status**: Overlay icons on files/folders (synced, syncing, pending, error, online-only). System tray status with sync activity feed. Per-file error details with resolution actions.
- **Delta sync**: Only transfer changed portions of files using differential sync. Significantly reduces bandwidth for large files with small changes.

### Security And Encryption

- **Personal Vault**: Additional authentication-protected folder for sensitive documents. Requires step-up verification (MFA, biometric, PIN) to unlock. Auto-locks after 20 minutes of inactivity (configurable). Limited to 3 files on free tier, unlimited on paid.
- **Encryption**: BitLocker encryption at rest in Microsoft datacenters equivalent. TLS 1.3 in transit. Per-file encryption keys. Customer Key option for enterprise (BYOK).
- **Ransomware detection**: Detect mass file encryption/deletion patterns. Alert user and offer one-click restore to pre-attack state using version history.
- **DLP policies (business)**: Content-inspection policies preventing sharing of files containing sensitive information. Integration with compliance center classification labels.
- **Sensitivity labels**: Apply encryption and access restrictions based on content classification. Labels travel with the document across devices.
- **Conditional access (business)**: Enforce device compliance, location restrictions, and app restrictions for accessing organizational content.
- **Link password and expiration**: Protect shared links with passwords. Auto-expire links after configurable duration.

### Storage Management

- **Quotas**: 5 GB free, 100 GB standalone, 1 TB with Microsoft 365 Personal, 1 TB per user with Microsoft 365 Family (up to 6 TB total), 1-5 TB business. Visual storage breakdown by category (documents, photos, other).
- **Storage cleanup**: Recommendations for large files, duplicate files, and items in recycle bin. Empty recycle bin action. Free up space by making files online-only.
- **Photo storage optimization**: Option to upload at original quality or space-saving quality. Automatic HEIC-to-JPEG conversion option.
- **Shared storage**: Family members share pool in Microsoft 365 Family. Per-member allocation configurable by family organizer.

### Photo Experiences

- **Camera upload**: Automatic background upload of new photos/videos from camera roll. Wi-Fi only option. Include/exclude screenshots option. Upload to specific folder.
- **Photo organization**: Automatic albums by date, location, and people (face grouping). Tag suggestions. Favorites. Hidden album.
- **Memories/On This Day**: AI-generated memory collections from past photos. Animations and collages. Notification on anniversary dates.
- **Photo search**: Search by content (objects, scenes, text in images via OCR), people, places, dates. On-device ML for private search index.
- **Photo editing**: Basic editing (crop, rotate, filters, adjustments). Markup/annotation. Before/after comparison.
- **Casting**: Cast photos/videos to Chromecast, AirPlay, or smart TV devices.

### Office Integration

- **Quick create**: Create new Word, Excel, PowerPoint, or Forms document directly from OneDrive with template selection.
- **Recent files**: Cross-app recent files list showing documents opened in any Office app.
- **Office Lens/Scanner**: Document scanning with automatic edge detection, perspective correction, and OCR. Save as PDF, Word, or image.
- **PDF tools**: View, annotate, sign, fill forms, and convert to/from Office formats.

## Core User Journeys

- **Personal setup**: User downloads app, signs in with Microsoft account, enables camera upload, pins important folder for offline, and uploads first document via share extension from another app.
- **Business onboarding**: User receives IT enrollment, signs in with work account, conditional access verifies device compliance, Known Folder Move redirects Desktop/Documents, user accesses team shared library.
- **Document co-authoring**: User creates Word document in OneDrive, shares with colleague for editing, both open simultaneously, see each other's cursors and changes in real-time, document auto-saves continuously.
- **Photo backup and discovery**: User enables camera upload, photos sync overnight on Wi-Fi, user searches "beach" and finds vacation photos via AI tagging, creates album, shares album link with family.
- **Personal Vault**: User opens Personal Vault, authenticates with Face ID, uploads passport scan and insurance documents, vault auto-locks after inactivity, user unlocks later to retrieve document for form submission.
- **Files On-Demand**: User installs desktop sync client, sees all cloud files in Explorer/Finder without downloading, double-clicks a large video file which streams on-demand, right-clicks another file to "Always keep on this device" for offline access.
- **Offline edit and sync**: User edits spreadsheet while on airplane, colleague edits same file online, user reconnects, sync detects conflict, creates conflict copy, user opens both versions and manually reconciles differences.
- **Storage management**: User receives quota warning, opens storage settings, sees breakdown by category, uses cleanup recommendations to delete old recycle bin items and make large videos online-only, confirms freed space.
- **Ransomware recovery**: User's PC is infected with ransomware that encrypts local files, OneDrive detects mass file changes, sends alert, user opens web interface, uses "Restore your OneDrive" to roll back all files to timestamp before attack.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Sign-In | Microsoft account or work/school sign-in | email, password, MFA, biometric | loading, account picker, MFA challenge, success | invalid credentials, account locked, MFA timeout, conditional access blocked |
| Home/Recent | Landing screen showing recent files across all sources | taps, pull-to-refresh, sort | recent files loaded, empty (new account), offline cached | sync error, session expired, quota exceeded |
| My Files | File/folder browser for personal OneDrive root | taps, long-press, swipe actions, sort/filter/view toggle | folder tree loaded, empty folder, uploading, offline | sync conflict indicator, quota full, shared indicators |
| Shared | Files shared with user and shared libraries | tab switch (shared with me / shared libraries) | items loaded, pending invitations, empty | external sharing disabled, item no longer shared |
| Photos | Photo grid with albums, memories, and camera upload status | grid scroll, album tap, search, upload toggle | photos loaded, camera upload progress, empty | camera upload paused (battery/metered), permission denied |
| Photo Detail | Full-screen photo/video viewer with editing | swipe, zoom, edit tools, share, delete, info | loaded, editing mode, casting, sharing | file deleted on server, playback error |
| File Preview | In-app document/media preview | scroll, zoom, page navigation, annotation | rendering, rendered, annotating, co-authoring | unsupported format, conversion error, access revoked |
| Co-Authoring Editor | Real-time collaborative document editing | text input, formatting, presence awareness | connected (showing co-authors), reconnecting, offline-edit | merge conflict, co-author disconnected, save failed |
| Upload/Scan | File upload and document scanner | file picker, camera, scan crop/enhance | selecting, scanning, uploading (progress), complete | quota exceeded, file too large, scan failed |
| Share/Manage Access | Configure sharing permissions and links | people picker, link type selection, permissions | generating link, managing access, pending shares | sharing restricted by policy, recipient limit reached |
| Personal Vault | Step-up authenticated secure folder | biometric/PIN/MFA to unlock, file operations | locked, unlocking, unlocked (active), auto-locking | auth failed, vault disabled by admin, file limit (free) |
| Search | Global file search with filters | query text, type/date/people filters | empty, searching, results, no results | search timeout, index not ready |
| Recycle Bin | Deleted items with restore/purge | restore, delete permanently, empty all | items listed, empty bin, retention-locked | restore failed (parent deleted), purge blocked by hold |
| Storage/Settings | Quota usage, account settings, preferences | cleanup actions, notification toggles, cache management | usage loaded, recommendations available | storage API error, settings save failed |
| Offline Files | View files marked for offline availability | browse, remove offline availability | cached files listed, download progress, cache full | stale cache, file deleted on server |
| Notifications | Activity feed for shares, edits, comments, mentions | tap to navigate, mark read, preference management | unread items, all read, empty | notification lag, deep link to deleted item |
| Camera Upload Settings | Configure automatic photo/video backup | enable/disable, Wi-Fi only, include videos, folder selection | enabled (syncing), paused, disabled | permission denied (photos), no storage space |
| Ransomware Recovery | Timeline-based file restoration | date picker, restore button, review changes | attack detected, reviewing changes, restoring, complete | no restore points available, partial restore failure |

## Data Model

### Core Entities

- **`User`**: `id`, `email`, `display_name`, `avatar_url`, `account_type` (personal/work_school), `tenant_id` (nullable for personal), `storage_used_bytes`, `storage_quota_bytes`, `plan_tier` (free/standalone_100gb/m365_personal/m365_family/business), `camera_upload_enabled`, `personal_vault_enabled`, `last_sync_at`, `created_at`, `status` (active/suspended/deleted).

- **`Tenant`**: `id`, `name`, `domain`, `plan_tier` (business_basic/business_standard/business_premium/e3/e5), `storage_quota_per_user_bytes`, `external_sharing_policy` (anyone/new_existing_guests/existing_guests/only_org), `dlp_policies_json`, `conditional_access_json`, `created_at`.

- **`DriveItem`**: `id`, `name`, `item_type` (file/folder/package/notebook), `mime_type`, `size_bytes`, `parent_id` (nullable for root), `drive_id`, `owner_id`, `etag`, `ctag` (content tag), `created_at`, `modified_at`, `last_modified_by_id`, `description`, `web_url`, `download_url` (time-limited), `status` (active/trashed/deleted).

- **`FileContent`**: `id`, `drive_item_id`, `version_id`, `sha256_hash`, `storage_url`, `thumbnail_urls_json` (small/medium/large), `media_metadata_json` (width, height, duration, taken_at, location, camera), `ocr_text` (nullable), `content_type_detected`.

- **`Version`**: `id`, `drive_item_id`, `version_number`, `size_bytes`, `last_modified_by_id`, `modified_at`, `is_current`.

- **`Permission`**: `id`, `drive_item_id`, `granted_to_id` (nullable for link), `granted_to_type` (user/group/everyone/organization), `granted_to_email`, `role` (read/write/owner/review), `link_type` (nullable: view/edit/review/upload), `link_url`, `link_password_hash`, `link_expiration_at`, `has_password`, `block_download`, `scope` (anonymous/organization/users), `invited_by_id`, `created_at`, `status` (active/pending/expired).

- **`SharingInvitation`**: `id`, `drive_item_id`, `invitee_email`, `invitee_id` (nullable until accepted), `role`, `message`, `invited_by_id`, `status` (pending/accepted/declined), `created_at`, `accepted_at`.

- **`PersonalVaultItem`**: `id`, `drive_item_id`, `vault_id`, `added_at`. (Vault itself is a special folder with additional auth requirement.)

- **`CameraUploadJob`**: `id`, `user_id`, `device_id`, `local_asset_id`, `file_name`, `size_bytes`, `status` (pending/uploading/complete/failed/duplicate), `destination_folder_id`, `progress_bytes`, `error_message`, `created_at`, `completed_at`.

- **`PhotoAlbum`**: `id`, `user_id`, `name`, `type` (user_created/auto_date/auto_location/auto_people/memory), `cover_item_id`, `item_count`, `date_range_start`, `date_range_end`, `created_at`, `updated_at`.

- **`PhotoAlbumItem`**: `id`, `album_id`, `drive_item_id`, `sort_order`, `added_at`.

- **`PhotoTag`**: `id`, `drive_item_id`, `tag_type` (object/scene/text/face/location), `value`, `confidence`, `bounding_box_json` (nullable), `created_at`.

- **`SyncState`**: `id`, `user_id`, `device_id`, `drive_item_id`, `availability` (cloud_only/locally_available/always_keep), `local_path`, `local_modified_at`, `server_etag`, `conflict_state` (nullable: local_newer/server_newer/both_modified), `download_progress`, `error_message`, `updated_at`.

- **`DeltaToken`**: `id`, `user_id`, `device_id`, `drive_id`, `folder_id` (nullable for root), `token`, `last_sync_at`.

- **`RansomwareAlert`**: `id`, `user_id`, `detected_at`, `affected_file_count`, `attack_start_estimate`, `status` (detected/reviewing/restoring/resolved/dismissed), `restore_point_at`, `resolved_at`.

- **`AuditEvent`**: `id`, `tenant_id`, `user_id`, `event_type`, `item_id`, `item_path`, `details_json`, `ip_address`, `user_agent`, `created_at`. Append-only.

- **`Notification`**: `id`, `user_id`, `type` (shared_with_you/file_edited/comment_added/mention/camera_upload_complete/quota_warning/ransomware_alert/vault_locked), `title`, `body`, `item_id`, `is_read`, `created_at`.

- **`LocalCacheRecord`**: `id` (device-local), `drive_item_id`, `version_id`, `cache_path`, `size_bytes`, `availability`, `last_accessed_at`, `eviction_priority`.

## API And Backend Contracts

### Authentication
- `POST /oauth2/v2.0/token` — OAuth 2.0 with PKCE. Support personal Microsoft accounts and work/school (Azure AD) accounts. Return access_token, refresh_token, id_token.
- `POST /oauth2/v2.0/token` (refresh) — Refresh expired access token silently.
- `GET /me` — Return authenticated user profile, drive info, quota, and plan tier.
- `POST /auth/vault/unlock` — Step-up authentication for Personal Vault (biometric challenge token or MFA).

### Drive Items (Files And Folders)
- `GET /drives/:drive_id/root/children` — List root folder contents with pagination ($top, $skipToken).
- `GET /drives/:drive_id/items/:id` — Get item metadata with select/expand query parameters.
- `GET /drives/:drive_id/items/:id/children` — List folder contents. Support $orderby (name, lastModifiedDateTime, size), $filter, $select.
- `PUT /drives/:drive_id/items/:parent_id:/:filename:/content` — Simple upload (< 4 MB). Return created item.
- `POST /drives/:drive_id/items/:parent_id:/createUploadSession` — Create resumable upload session. Return uploadUrl for chunked PUT requests.
- `GET /drives/:drive_id/items/:id/content` — Download file content. Support Range header for resume.
- `PATCH /drives/:drive_id/items/:id` — Update metadata (rename, move via parentReference change, description).
- `DELETE /drives/:drive_id/items/:id` — Move to recycle bin.
- `POST /drives/:drive_id/items/:id/copy` — Async copy operation. Return monitor URL for progress.
- `POST /drives/:drive_id/items/:id/createFolder` — Create subfolder.
- `GET /drives/:drive_id/items/:id/thumbnails` — Get thumbnail set at multiple sizes.
- `GET /drives/:drive_id/items/:id/preview` — Get embeddable preview URL.

### Versioning
- `GET /drives/:drive_id/items/:id/versions` — List all versions.
- `GET /drives/:drive_id/items/:id/versions/:version_id/content` — Download specific version.
- `POST /drives/:drive_id/items/:id/versions/:version_id/restoreVersion` — Promote version to current.

### Sharing And Permissions
- `POST /drives/:drive_id/items/:id/createLink` — Create sharing link with type (view/edit/review), scope (anonymous/organization/users), password, expirationDateTime.
- `POST /drives/:drive_id/items/:id/invite` — Share with specific people. Body: recipients, roles, message, requireSignIn.
- `GET /drives/:drive_id/items/:id/permissions` — List all permissions/shares on item.
- `PATCH /drives/:drive_id/items/:id/permissions/:perm_id` — Update permission (change role, update expiration).
- `DELETE /drives/:drive_id/items/:id/permissions/:perm_id` — Revoke sharing.
- `GET /me/drive/sharedWithMe` — List items shared with authenticated user.

### Search
- `GET /drives/:drive_id/search(q='{query}')` — Full-text search across file names, content, and metadata. Return ranked results with highlighting.
- `GET /drives/:drive_id/items/:id/search(q='{query}')` — Scoped search within folder.

### Delta Sync
- `GET /drives/:drive_id/root/delta` — Get changes since last sync token. Return changed items and new deltaLink token. Support pagination for large change sets.
- `GET /drives/:drive_id/items/:folder_id/delta` — Folder-scoped delta for selective sync.

### Photos
- `GET /me/drive/special/photos` — Access photos special folder.
- `GET /me/photos/albums` — List photo albums (auto-generated and user-created).
- `GET /me/photos/tags/search?q={query}` — Search photos by detected content tags.
- `POST /me/photos/albums` — Create new album.
- `POST /me/photos/albums/:id/items` — Add items to album.

### Recycle Bin
- `GET /drives/:drive_id/items/:id/children?$filter=deleted` — List deleted items.
- `POST /drives/:drive_id/items/:id/restore` — Restore from recycle bin to original or specified location.
- `DELETE /drives/:drive_id/items/:id` (on already-trashed item) — Permanent delete.

### Personal Vault
- `GET /me/drive/special/vault` — Access vault folder (requires step-up auth).
- `POST /me/drive/vault/lock` — Manually lock vault.
- Vault auto-locks after inactivity timeout (server-enforced).

### Ransomware Recovery
- `GET /me/drive/activities?filter=suspicious` — Get detected suspicious activity.
- `POST /me/drive/restore` — Restore entire drive to specific point in time. Body: timestamp, scope (all/selected).

### Notifications And Subscriptions
- `POST /subscriptions` — Create webhook subscription for drive item changes. Specify resource, changeType, notificationUrl, expirationDateTime.
- `GET /me/notifications` — List in-app notifications.
- `PATCH /me/notification-preferences` — Update notification settings per category.

### Privacy And Account
- `POST /me/data-export` — Request data export (GDPR).
- `DELETE /me/account` — Initiate account deletion (30-day grace period).
- `GET /me/privacy/settings` — Return consent and data processing preferences.

## Realtime, Push, And Offline Behavior

- **Delta sync protocol**: Clients poll `/delta` endpoint on configurable interval (30s active, 5min background). Delta response includes all item changes (created, modified, deleted, moved) since last token. Clients apply changes to local state atomically.
- **WebSocket for co-authoring**: During document editing, maintain WebSocket connection for OT operations, cursor positions, and presence. Graceful degradation to periodic save if WebSocket drops.
- **Push notifications**: FCM/APNs for: file shared with you, document edited by collaborator, comment/mention, camera upload complete, quota approaching limit, ransomware alert, vault auto-locked. Per-category opt-in.
- **Files On-Demand implementation**: macOS: File Provider extension with NSFileProviderItem. Windows: Cloud Files API (cfapi) with placeholder files. iOS/Android: on-demand download with progress indicator in file browser.
- **Offline capability**: Pinned files (always-keep) are fully available offline. Locally-available files are cached but may be evicted under storage pressure. Cloud-only files show placeholder with "download to access" action. Metadata (folder tree, thumbnails) cached for offline browsing.
- **Camera upload queue**: Background upload using iOS BGProcessingTask / Android WorkManager. Deduplicate by file hash. Retry with exponential backoff on failure. Pause on metered network if configured. Resume from last chunk on interruption.
- **Conflict resolution strategy**: Compare local and server ETags on sync. If server ETag differs from last-known: (1) For Office documents, attempt auto-merge via co-authoring engine. (2) For other files, create conflict copy named `{filename} (conflict - {username} - {timestamp}).{ext}`. (3) Notify user with resolution options.
- **Sync priority**: User-initiated downloads highest priority. Pinned file updates next. Camera uploads lowest priority. Active co-authoring saves are immediate (bypass queue).

## Permissions, Privacy, And Safety

- **Personal Vault security**: Additional biometric/MFA gate. Server-side inactivity timeout. Contents excluded from search results when vault is locked. No shared links allowed on vault items.
- **Conditional access (business)**: Enforce device compliance (managed, encrypted, patched), location (IP range/country), client app type, and sign-in risk level before granting access to organizational content.
- **DLP (business)**: Content inspection policies scan uploaded files for sensitive data (credit cards, SSNs, health records). Actions: block sharing, require justification, notify compliance admin, encrypt.
- **Sensitivity labels (business)**: Apply classification labels (Public, General, Confidential, Highly Confidential) that enforce encryption, access restrictions, and watermarking.
- **Ransomware protection**: ML model monitors file change patterns. Threshold alerts on mass rename/encrypt/delete. One-click point-in-time restore.
- **Link governance**: Admins can restrict link types (disable anonymous links), enforce expiration maximums, and require passwords for external sharing.
- **Data residency**: Content stored in user's region. Cross-geo moves require admin action. Tenant-level geo configuration.
- **Privacy controls**: Users control activity data collection, targeted advertising consent, and connected service permissions. Data export and deletion available.
- **Permission requests**: Camera/photos permission for camera upload. File access for upload/download. Notifications for activity alerts. Biometric for vault. All have functional fallbacks.

## Analytics And Monetization

- **Onboarding events**: `signup_completed`, `first_file_uploaded`, `camera_upload_enabled`, `desktop_sync_installed`, `first_share_created`, `vault_activated`.
- **Core action events**: `file_uploaded` (size, type), `file_downloaded`, `file_previewed`, `file_edited`, `folder_created`, `search_performed`, `share_link_created`, `co_authoring_session_started`.
- **Photo events**: `camera_upload_batch_completed`, `album_created`, `photo_searched`, `memory_viewed`, `photo_edited`.
- **Sync events**: `sync_completed`, `conflict_detected`, `conflict_resolved` (method), `files_on_demand_activated`, `offline_pin_added`, `delta_sync_completed`.
- **Security events**: `vault_unlocked`, `vault_auto_locked`, `ransomware_alert_triggered`, `drive_restored`, `dlp_violation_detected`, `sensitivity_label_applied`.
- **Monetization events**: `upgrade_prompt_shown`, `plan_comparison_viewed`, `purchase_started`, `purchase_completed`, `trial_started`, `subscription_canceled`.
- **Monetization model**: Freemium (5 GB free), standalone 100 GB tier, bundled with Microsoft 365 Personal (1 TB) and Family (up to 6 TB). Business plans with per-user licensing. Storage add-ons available.
- **Analytics rule**: Never send file names, file content, user documents, photo content, or collaboration details as analytics properties. Use anonymized identifiers and aggregate metrics.

## Edge Cases

- **Files On-Demand placeholder access offline**: User double-clicks cloud-only file without network. Show error with "this file requires internet" message and offer to pin for next time.
- **Camera upload duplicate detection**: Same photo exists from multiple devices (shared albums, screenshot). Detect by hash and skip upload. Show "already exists" in upload history.
- **Personal Vault on free tier**: User attempts to add 4th file to vault. Show upgrade prompt explaining paid tier removes the limit.
- **Co-authoring with incompatible edits**: Two users edit same table cell simultaneously. Last-write-wins at cell level with undo available for overwritten user's change.
- **Quota exceeded during camera upload**: Background upload discovers quota full mid-batch. Pause uploads, send notification with storage management link, mark remaining items as "paused - quota full".
- **Shared file deleted by owner**: Collaborator has local offline copy of file that owner deleted. On sync, mark file as "removed by owner" and offer to save local copy as new file.
- **Ransomware false positive**: User legitimately renames many files (e.g., reorganizing). System triggers alert. User reviews affected files and dismisses alert. System learns from dismissal to reduce future false positives.
- **Known Folder Move conflict**: Desktop folder already contains files with same names as cloud files. Offer merge strategy: keep both (rename), replace local, or replace cloud.
- **Large file upload interrupted**: 10 GB upload fails at 8 GB due to network. Resume from last successful chunk. Session valid for 48 hours. After expiry, restart from beginning.
- **Conditional access device non-compliant**: User's device fails compliance check (e.g., OS not updated). Block access to organizational content with message explaining required action. Personal content remains accessible.
- **Shared link recipient limit**: Organization link accessed by more concurrent users than license allows. Queue access with estimated wait time for very high-traffic links.
- **Cross-platform sync encoding issues**: File named with emoji or special characters on macOS. Windows sync client encounters reserved character. Auto-rename with mapping table and notification.
- **Version history on shared file**: Collaborator with view-only access attempts to restore previous version. Block with permission error explaining only editors can restore versions.
- **Vault timeout during upload**: User starts uploading to vault, vault auto-locks before upload completes. Complete in-progress upload, then lock. New uploads require re-authentication.

## Test Plan

- **Unit tests**: Permission role matrix calculation. Conflict detection logic (ETag comparison). Quota arithmetic and threshold alerts. Camera upload deduplication (hash comparison). File name sanitization across platforms. Delta token state machine. Ransomware pattern detection scoring. Personal Vault timeout logic.
- **Integration tests**: Full OAuth flow with personal and work accounts. File upload (simple and resumable chunked). Download with range resume. Version creation and restoration. Share link creation with all permission combinations. Co-authoring session lifecycle. Camera upload batch processing. Delta sync with concurrent server changes. Personal Vault lock/unlock cycle. Recycle bin restore to original and alternate locations.
- **Contract tests**: All API response shapes, error codes (400/401/403/404/409/413/429/507), pagination (skipToken), delta tokens, upload session URLs, thumbnail URLs, and webhook notification payloads.
- **Sync tests**: Files On-Demand placeholder creation and hydration. Known Folder Move migration. Selective sync inclusion/exclusion. Conflict copy creation. Delta sync with creates, modifies, deletes, and moves. Bandwidth throttling compliance. Background sync scheduling. Sync pause/resume. Disk-full handling.
- **Offline tests**: Pinned file access without network. Cloud-only file access attempt without network (error messaging). Queued metadata operations replay. Camera upload queue persistence across app restart. Delta token recovery after extended offline period.
- **Security tests**: Personal Vault authentication enforcement. Vault auto-lock timing. Vault content exclusion from search when locked. Ransomware detection threshold. Drive restore to point-in-time. DLP policy enforcement (block sharing). Sensitivity label access restriction. Conditional access device compliance. OAuth token refresh and revocation. Link password validation. Link expiration enforcement.
- **Photo tests**: Camera upload batch processing with duplicates. Album auto-generation by date/location. Photo search by content tag. Memory generation. Photo editing save-as-copy. Upload quality setting compliance. HEIC conversion.
- **Co-authoring tests**: Two-user simultaneous paragraph edits. Cell-level conflict resolution. Presence indicator accuracy. Connection drop and reconnection. Offline edit merge on reconnect. Author attribution in version history.
- **Performance tests**: Resumable upload for 10 GB file. Delta sync with 50K changes. Photo grid scroll with 100K thumbnails. Search response time. Files On-Demand hydration latency. Co-authoring operation merge latency with 10 concurrent editors.
- **Accessibility tests**: Screen reader for file tree navigation. VoiceOver in photo grid. Dynamic type in all screens. Focus management in share dialog. High-contrast mode for sync status icons.
- **Billing tests**: Free to paid upgrade (quota increase immediate). Paid to free downgrade (grace period, then read-only if over quota). Family member addition/removal and quota reallocation. Business seat license assignment.

## Acceptance Criteria

- A new user can sign up, upload a file, and share via link within 4 taps from home.
- Camera upload can be enabled and successfully backs up camera roll photos in background.
- Files On-Demand shows all cloud files with correct status icons and hydrates on access.
- Co-authoring shows presence of other editors and merges changes in real-time without data loss.
- Personal Vault requires step-up authentication, auto-locks on inactivity, and prevents sharing of vault contents.
- Delta sync accurately reflects server changes within 60 seconds on active clients.
- Conflict detection creates appropriately-named conflict copies and notifies affected users.
- Shared links respect all configured restrictions (password, expiration, download block, scope).
- Ransomware detection alerts on suspicious patterns and point-in-time restore recovers all affected files.
- Photo search returns relevant results for content-based queries (objects, scenes, text).
- Storage management shows accurate breakdown and cleanup recommendations free measurable space.
- All data entities have documented owners, lifecycle states, authorization rules, and deletion/export behavior.
- At least 15 acceptance tests cover: upload/download, sharing, co-authoring, camera upload, Files On-Demand, Personal Vault, sync conflict, ransomware recovery, photo search, offline access, quota management, accessibility, billing transitions, notification delivery, and account deletion.

## Open Questions

- What is the exact Files On-Demand cache eviction algorithm and priority scoring?
- How does co-authoring handle simultaneous conflicting structural edits (e.g., table row deletion vs. cell edit)?
- What are the exact ransomware detection heuristic thresholds (file count, time window, pattern types)?
- How does Known Folder Move handle symlinks and junction points on Windows?
- What is the exact Personal Vault inactivity timeout range (minimum/maximum configurable)?

## Build Plan

- Phase 1: Research URLs verified (complete). Define route map, component tree, design tokens, and API schema.
- Phase 2: Build authentication (OAuth 2.0 personal + work accounts), file/folder CRUD, resumable upload, and basic preview.
- Phase 3: Implement sharing system (links, direct sharing, permissions), collaboration invitations, and shared-with-me view.
- Phase 4: Build sync engine (delta protocol, Files On-Demand placeholders, offline pinning, conflict detection and resolution).
- Phase 5: Implement co-authoring engine (WebSocket OT/CRDT, presence, auto-merge, conflict copy fallback).
- Phase 6: Build photo experiences (camera upload, auto-albums, tagging, search, memories, editing).
- Phase 7: Implement Personal Vault (step-up auth, auto-lock, sharing restrictions) and ransomware detection/recovery.
- Phase 8: Add business features (conditional access stub, DLP scanning, sensitivity labels, admin controls).
- Phase 9: Build storage management, cleanup recommendations, billing integration, and quota enforcement.
- Phase 10: Complete accessibility, security hardening, full test suite, and performance optimization.
- Phase 11: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Conduct hands-on verification of Files On-Demand behavior on macOS and Windows.
- Verify Personal Vault authentication flow and timeout behavior with active Microsoft 365 subscription.
- Test co-authoring conflict resolution scenarios with multiple simultaneous editors.
- Design original UI component library and design tokens distinct from Microsoft/OneDrive branding.
- Set up downstream implementation repository with scaffold from this spec.
