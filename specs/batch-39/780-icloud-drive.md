# iCloud Drive-Style Clone Spec

> Metadata
> - Inspiration app: iCloud Drive
> - Category: Cloud files and identity
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: Apple ID integration and sign-in flow, optimized storage automatic eviction behavior, Family Sharing storage pool mechanics, iCloud.com cross-platform web experience, third-party app File Provider extension integration, offline file availability and download-on-demand behavior, native iOS/Android screen capture, subscription state transitions.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile-first cloud file storage and synchronization platform inspired by iCloud Drive's public user-facing workflow. The clone delivers seamless Apple ecosystem file storage with Desktop and Documents sync, file and folder sharing with granular permissions, optimized storage that automatically manages local disk space, Family Sharing with shared storage pools, deep third-party app integration via File Provider, and cross-platform web access. Core focus areas: file operations with native app integration, sharing and collaboration with real-time editing, sync with optimized storage and download-on-demand, security with end-to-end encryption and data protection, storage management with family pooling, and system-level integration for transparent cloud storage.

## Goals

- Deliver a system-integrated cloud storage experience that functions as a transparent extension of local filesystem storage.
- Reproduce the functional job behind iCloud Drive using original product naming, original UI, and licensed integrations.
- Support free tier (5 GB) and iCloud+ tiers (50 GB, 200 GB, 2 TB, 6 TB, 12 TB) with appropriate feature differentiation.
- Provide optimized storage that automatically frees local space by evicting infrequently-used files while keeping them accessible on-demand.
- Enable file and folder sharing with granular permissions and real-time collaborative editing for supported document types.
- Deliver Family Sharing integration where up to 5 family members share a single iCloud+ storage pool.
- Support third-party app file storage via File Provider framework for seamless cloud-backed app documents.

## Non-Goals

- Do not copy iCloud/Apple branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not replicate Apple's proprietary CloudKit framework or native File Provider implementation details.
- Do not implement actual Apple ID authentication or Apple ecosystem lock-in features.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store (Files app) | https://apps.apple.com/us/app/files/id1232058109 | iOS Files app listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | N/A — iCloud Drive has no Android app | No Android listing exists; web access only via icloud.com | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.apple.com/icloud/ | Product overview, feature pages, iCloud+ plans | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Help center | https://support.apple.com/en-us/icloud | User guides, setup instructions, troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.apple.com/legal/privacy/ | Apple privacy policy covering iCloud data practices | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.apple.com/legal/internet-services/icloud/ | iCloud terms and conditions | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Developer documentation | https://developer.apple.com/icloud/ | CloudKit, File Provider, iCloud Drive API documentation | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| iCloud web access | https://www.icloud.com | Cross-platform web interface for iCloud Drive | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

### File Operations

- **Upload**: Upload files via Files app interface, share extension from any app, drag-and-drop (iPadOS/macOS), Save dialog in any app using File Provider, and iCloud.com web upload. No per-file size limit documented (practical limit tied to storage quota). Support for all file types without restriction.
- **Download**: Tap-to-download for cloud-only files with progress indicator. Automatic download for files in synced folders when storage allows. Stream-on-demand for media files. Download via iCloud.com for cross-platform access.
- **Preview**: Quick Look integration for native preview of documents, images, PDFs, videos, audio, archives, and 3D objects. Preview without full download where possible (progressive loading for images, streaming for video).
- **Edit**: Native app opens files directly from iCloud Drive via File Provider coordination. Documents auto-save back to cloud. Supported formats get in-place editing; unsupported formats download-edit-reupload. Markup for images and PDFs.
- **Move/Copy**: Drag-and-drop between folders, between apps (iPad multitasking), and between cloud providers (via Files app). Move preserves sharing; copy creates independent item. Batch operations via multi-select.
- **Delete/Restore**: Delete moves to "Recently Deleted" folder with 30-day retention. Permanent delete available immediately. Restore to original location. Recently Deleted accessible from Files app sidebar and iCloud.com.
- **Tags and organization**: Color-coded tags (7 default colors + custom) applied to files/folders. Tag-based smart folders in sidebar. Favorites for quick access. Recents view sorted by last opened.

### Sharing And Collaboration

- **File sharing**: Share individual files with specific people via email/phone or copy link. Permissions: "Can make changes" or "View only". Option to restrict to "Only people you invite" or "Anyone with the link".
- **Folder sharing**: Share entire folders with same permission model as files. All contents inherit folder sharing permissions. New items added by any participant are visible to all.
- **Real-time collaboration**: For iWork documents (Pages, Numbers, Keynote equivalents), simultaneous editing with live cursor/selection visibility. Changes sync within seconds across all participants.
- **Sharing management**: View participants list, change permissions per participant, stop sharing entirely, remove individual participants. Owner can transfer ownership (for shared folders).
- **Share via link**: Generate shareable iCloud link. Access controlled by permission settings. Link can be revoked independently of direct participant access.
- **Collaboration notifications**: Notification when someone joins shared folder, adds/modifies files, or when shared item is modified.

### Sync And Offline (Optimized Storage)

- **Optimized Storage**: System automatically manages which files are stored locally vs. cloud-only based on available disk space and usage patterns. Recently accessed files kept local; infrequently used files evicted to cloud-only (retaining metadata/thumbnail locally).
- **Desktop and Documents sync**: macOS Desktop and Documents folders automatically sync to iCloud Drive. Available on all devices. Can be enabled/disabled per Mac.
- **Download on demand**: Cloud-only files show cloud icon with download arrow. Tap to download. Download happens transparently when file is opened by any app.
- **Always keep downloaded**: Pin specific files/folders to prevent eviction. These remain on-device regardless of storage pressure.
- **Sync conflict handling**: Last-writer-wins for simple files. For collaboration-enabled documents, real-time merge. Conflict copies created when simultaneous offline edits detected (named "filename 2", "filename 3").
- **Sync status indicators**: Cloud icon (not downloaded), checkmark (downloaded and current), progress spinner (uploading/downloading), exclamation (error/conflict).
- **Background sync**: Continuous background sync on macOS/iOS. Respects Low Power Mode (reduced frequency). Resumes immediately when power and network available.
- **Bandwidth**: No explicit throttle controls exposed to user (system-managed). Prioritizes user-initiated downloads over background sync. Large uploads proceed in background across app switches.

### Security And Data Protection

- **Standard data protection**: Files encrypted in transit (TLS 1.3) and at rest (AES-256) with Apple-managed keys. Apple can access content for legal compliance.
- **Advanced Data Protection**: Optional end-to-end encryption where encryption keys are held only on user's trusted devices. Apple cannot access content. Requires at least one recovery contact or recovery key.
- **Two-factor authentication**: Required for iCloud account. Trusted device verification or SMS code. Account recovery via trusted phone number or recovery contacts.
- **Account recovery**: Recovery contacts (trusted people who can verify identity). Recovery key (28-character key stored by user). If both lost and Advanced Data Protection enabled, data is unrecoverable.
- **Per-file encryption**: Each file encrypted with unique per-file key, wrapped by class key, wrapped by device key. Hardware-bound keys on iOS devices.
- **Shared file security**: Shared files encrypted in transit between participants. With Advanced Data Protection, shared content uses participant-specific key exchange.
- **Web access security**: icloud.com access requires two-factor authentication. Session timeout after inactivity. Option to disable web access entirely (Advanced Data Protection requirement on older OS versions).

### Storage Management

- **Storage tiers**: 5 GB free (included with Apple ID), 50 GB, 200 GB, 2 TB, 6 TB, 12 TB as iCloud+ plans. iCloud+ includes additional features (Private Relay, Hide My Email, Custom Email Domain, HomeKit Secure Video).
- **Storage breakdown**: Visual bar showing usage by category: Photos, iCloud Drive, Messages, Backups, Mail, Other. Tap each category for details.
- **Family Sharing**: Up to 5 additional family members share single iCloud+ storage pool. Each member has private storage within the pool. Family organizer manages plan and can view per-member usage (not content).
- **Storage recommendations**: Surface large files, old backups, and items in Recently Deleted. Offer one-tap cleanup for each category. Suggest plan upgrade when approaching limit.
- **Per-app storage**: View storage used by each app's iCloud container. Option to delete app data from iCloud while keeping local data or vice versa.
- **Manage across devices**: Storage settings accessible from iPhone, iPad, Mac System Settings, and icloud.com. Changes propagate to all devices.

### Third-Party App Integration (File Provider)

- **File Provider framework**: Third-party apps can store documents in iCloud Drive within app-specific containers. Files appear in Files app under app name. Full sync, offline, and sharing support.
- **Document picker**: Any app can open files from iCloud Drive or save files to iCloud Drive using standard system UI. Supports in-place editing (file stays in iCloud Drive, app edits directly) or copy-import.
- **Open-in-place**: Apps that support File Provider coordination can edit iCloud Drive files in-place without copying. Changes save back to cloud automatically.
- **App containers**: Each app gets a private container (only that app can access) and optional public container (visible in Files app). Users can organize public container files freely.
- **Handoff/Continuity**: File being edited on one device can be continued on another device via Handoff. Document state syncs within seconds.

### Cross-Platform Web Access (iCloud.com)

- **Web file browser**: Full file management via web browser at icloud.com. Upload, download, create folders, move, copy, delete, share, rename. Drag-and-drop upload.
- **Web document editing**: iWork documents (Pages, Numbers, Keynote) editable in browser with near-native fidelity. Real-time collaboration supported in web editor.
- **Web-only access**: Users without Apple devices can access shared files and collaborate via web browser. Limited feature set (no sync, no File Provider).
- **Responsive design**: iCloud.com works on desktop and mobile browsers. Adaptive layout for different screen sizes.
- **Session management**: Two-factor authentication required. Persistent "trust this browser" option. Remote session revocation from account settings.

## Core User Journeys

- **First-time setup**: User sets up new iPhone, signs in with Apple ID, iCloud Drive enables automatically, Desktop & Documents sync enables on Mac, existing files begin uploading to cloud, Files app shows all content across devices.
- **Cross-device file access**: User creates document on Mac, saves to Documents folder (synced to iCloud Drive), opens iPhone Files app, finds document in iCloud Drive > Documents, opens and continues editing.
- **Sharing a folder with family**: User creates "Vacation Planning" folder, taps share, invites family members with "Can make changes" permission, family members see folder appear in their Shared section, all add files that sync to everyone.
- **Optimized storage in action**: Mac disk fills up, system automatically evicts old large files to cloud-only (showing cloud download icon in Finder), user can still see file metadata and thumbnails, double-clicking downloads file on demand.
- **Third-party app integration**: User opens drawing app, creates artwork, saves to iCloud Drive, opens Files app and sees artwork in app's folder, moves artwork to shared folder, collaborator opens in same drawing app on their device.
- **Storage upgrade via Family Sharing**: Family organizer's storage approaches 200 GB limit, receives notification suggesting upgrade, upgrades to 2 TB plan, all family members automatically benefit from expanded pool.
- **Offline editing and sync**: User downloads important file before flight, edits while offline, another family member edits shared copy online, when flight lands and device connects, iCloud creates conflict copy, user reviews both versions in Files app.
- **Recovery from lost device**: User loses iPhone, gets replacement, signs in with Apple ID, iCloud Drive content reappears in Files app as cloud-only items, user downloads needed files on demand.
- **Web access for cross-platform**: User at work on Windows PC, opens icloud.com in browser, authenticates with 2FA, browses iCloud Drive, downloads needed file, edits Pages document in browser.
- **Advanced Data Protection enrollment**: User enables Advanced Data Protection in Settings, system verifies recovery contact or recovery key is set, all iCloud Drive content re-encrypted with end-to-end encryption, web access requires trusted device approval.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Files App - Browse | Main file browser with locations sidebar (iCloud Drive, On My Device, Shared, Recently Deleted, Tags) | taps, long-press, drag-drop, search | locations loaded, empty drive, offline cached metadata | iCloud unavailable, account signed out, sync paused |
| Files App - Recents | Recently accessed files across all locations | taps, sort by date/app/tag | recents loaded, empty (new account) | stale list (file since deleted), thumbnail generation pending |
| Files App - Shared | Files and folders shared with/by user | browse shared items, manage sharing | shared items loaded, pending invitations | sharing disabled, participant removed you, item deleted |
| Folder Contents | Grid or list view of folder contents with sort/filter | tap file, long-press for context menu, multi-select, sort/filter | loaded, empty folder, uploading items, mixed local/cloud | sync error on specific items, folder deleted by other participant |
| File Preview (Quick Look) | Full-screen file preview with markup/share options | swipe between files, markup, share, open-in-app | rendering, rendered, markup mode | unsupported format, file not downloaded, conversion error |
| Share Sheet | Configure sharing permissions and generate link | people picker, permission toggle, link generation | configuring, link generated, participants list | sharing limit reached, recipient has no Apple ID (link only), item too large to share |
| Storage Management | View usage breakdown and manage space | category drill-down, cleanup actions, plan upgrade | usage loaded, recommendations shown | unable to calculate (sync in progress), billing unavailable |
| iCloud Settings | Enable/disable iCloud Drive, per-app sync, Desktop & Documents | toggles, app list, plan management | settings loaded, syncing status per app | settings change fails (quota exceeded for enable), conflicting device settings |
| Family Sharing Storage | View family pool usage, per-member breakdown | view usage, manage plan, invite member | pool usage loaded, member list | member left family, plan downgrade impact |
| Recently Deleted | Browse and restore/permanently delete trashed items | restore, delete permanently, select all | items listed, empty, expiring-soon indicators | item already purged (30-day expired), restore to deleted parent |
| Tag Manager | Create, rename, delete, and reorder tags | color picker, text input, drag-reorder | tags loaded, creating new, editing existing | tag name conflict, max tags reached |
| Download Progress | Show download status for on-demand files | cancel, pause (where supported) | downloading (progress %), queued, complete | download failed (network), file deleted during download, disk full |
| Upload Progress | Show upload status for new/modified files | cancel, retry failed | uploading (progress %), queued, waiting for Wi-Fi | upload failed (network/quota), file changed during upload |
| Conflict Resolution | Show conflicting versions for user resolution | keep this version, keep other, keep both | two versions displayed with metadata | original deleted during resolution, three-way conflict |
| Advanced Data Protection | Enable/manage end-to-end encryption | enable toggle, recovery contact/key setup | disabled, recovery method configured, enabled, verifying | recovery method invalid, trusted device unavailable |
| iCloud.com File Browser | Web-based file management interface | upload, download, new folder, move, share, delete | loaded, uploading, empty | session expired, 2FA required, web access disabled by ADP |
| iCloud.com Document Editor | Web-based iWork document editing | text editing, formatting, collaboration | document loaded, saving, collaborating | auto-save failed, collaborator conflict, session timeout |
| Account Recovery | Recover access after device loss | recovery contact verification, recovery key entry | identity verification, waiting for contact, access restored | recovery contact unreachable, recovery key lost, ADP data unrecoverable |

## Data Model

### Core Entities

- **`User`**: `id`, `apple_id_email`, `display_name`, `avatar_url`, `storage_plan_tier` (free/50gb/200gb/2tb/6tb/12tb), `storage_used_bytes`, `storage_quota_bytes`, `family_id` (nullable), `family_role` (organizer/member/child), `advanced_data_protection_enabled`, `two_factor_enabled`, `trusted_devices_json`, `recovery_contacts_json`, `recovery_key_set`, `web_access_enabled`, `created_at`, `status` (active/locked/disabled/deleted).

- **`FamilyGroup`**: `id`, `organizer_id`, `plan_tier`, `total_storage_bytes`, `used_storage_bytes`, `member_count`, `created_at`.

- **`FamilyMember`**: `id`, `family_id`, `user_id`, `role` (organizer/adult/child), `storage_used_bytes`, `joined_at`.

- **`DriveItem`**: `id`, `name`, `item_type` (file/folder/alias/app_library), `parent_id` (nullable for root), `owner_id`, `size_bytes`, `mime_type`, `extension`, `created_at`, `modified_at`, `content_modified_at`, `etag`, `tags_json` (array of color-tag IDs), `is_favorited`, `app_container_id` (nullable, for File Provider items), `sharing_id` (nullable), `status` (active/trashed/purged), `trashed_at`, `purge_after`.

- **`FileContent`**: `id`, `drive_item_id`, `version_number`, `size_bytes`, `sha256_hash`, `storage_url`, `encryption_key_id`, `thumbnail_url`, `preview_url`, `uploaded_by_device_id`, `created_at`.

- **`SharingRecord`**: `id`, `item_id`, `item_type` (file/folder), `owner_id`, `share_url`, `access_scope` (invited_only/anyone_with_link), `default_permission` (view/edit), `created_at`, `updated_at`.

- **`Participant`**: `id`, `sharing_record_id`, `user_id` (nullable for pending), `email_or_phone`, `permission` (view/edit/owner), `status` (pending/accepted/declined/removed), `invited_by_id`, `accepted_at`, `created_at`.

- **`Tag`**: `id`, `user_id`, `name`, `color` (red/orange/yellow/green/blue/purple/gray/custom_hex), `sort_order`, `created_at`.

- **`AppContainer`**: `id`, `app_bundle_id`, `app_name`, `user_id`, `storage_used_bytes`, `is_public` (visible in Files app), `created_at`.

- **`SyncState`**: `id`, `user_id`, `device_id`, `drive_item_id`, `local_state` (not_downloaded/downloading/downloaded/uploading/evicted), `is_pinned` (always keep downloaded), `local_path`, `local_modified_at`, `server_etag`, `download_progress`, `upload_progress`, `conflict_state` (nullable), `error_message`, `last_sync_at`.

- **`DesktopDocumentsSync`**: `id`, `user_id`, `device_id`, `device_name`, `enabled`, `folder_type` (desktop/documents), `item_count`, `size_bytes`, `last_sync_at`.

- **`ConflictRecord`**: `id`, `original_item_id`, `conflict_item_id`, `conflict_type` (simultaneous_edit/offline_edit), `device_a_id`, `device_b_id`, `detected_at`, `resolution` (nullable: keep_original/keep_conflict/keep_both/merged), `resolved_at`.

- **`OptimizedStorageState`**: `id`, `user_id`, `device_id`, `total_disk_bytes`, `available_disk_bytes`, `icloud_local_bytes`, `icloud_cloud_only_bytes`, `eviction_threshold_percent` (default 85), `last_eviction_at`, `items_evicted_count`.

- **`StorageBreakdown`**: `id`, `user_id`, `category` (drive/photos/messages/backups/mail/other), `size_bytes`, `item_count`, `calculated_at`.

- **`RecoveryContact`**: `id`, `user_id`, `contact_user_id`, `contact_name`, `status` (pending/active/removed), `created_at`.

- **`AuditEvent`**: `id`, `user_id`, `event_type` (sign_in/file_access/share_created/share_modified/adp_enabled/recovery_used/web_session), `device_id`, `ip_address`, `details_json`, `created_at`. Append-only.

- **`Notification`**: `id`, `user_id`, `type` (share_invitation/file_modified/participant_joined/storage_warning/sync_error/adp_reminder/family_change), `title`, `body`, `item_id`, `is_read`, `created_at`.

- **`LocalCacheRecord`**: `id` (device-local), `drive_item_id`, `version_number`, `cache_path`, `size_bytes`, `is_pinned`, `last_accessed_at`, `eviction_score` (based on access frequency/recency).

## API And Backend Contracts

### Authentication
- `POST /auth/token` — Exchange Apple ID credentials or refresh token for session. Support 2FA challenge flow with trusted device push or SMS code.
- `POST /auth/2fa/verify` — Submit 2FA code to complete authentication.
- `POST /auth/vault/step-up` — Step-up authentication for Advanced Data Protection operations.
- `GET /me` — Return user profile, storage quota, family membership, and sync configuration.
- `POST /auth/recovery/initiate` — Start account recovery via recovery contact or key.
- `POST /auth/recovery/verify` — Verify recovery credential and restore access.

### Drive Items
- `GET /drive/root/children` — List root folder contents. Support sort (name/dateModified/size/kind), filter (tags, file type), and view mode (list/icons).
- `GET /drive/items/:id` — Get item metadata including sharing status, tags, and sync state.
- `GET /drive/items/:id/children` — List folder contents with pagination (cursor-based).
- `POST /drive/items/:parent_id/upload` — Upload file. Small files (<5 MB) in single request; larger files use chunked upload session.
- `POST /drive/items/:parent_id/upload-session` — Create resumable upload session. Return upload URL and chunk size.
- `GET /drive/items/:id/content` — Download file content. Support range requests for resume.
- `GET /drive/items/:id/thumbnail` — Get thumbnail at requested size.
- `PATCH /drive/items/:id` — Update metadata (rename, move via parent_id change, add/remove tags, toggle favorite).
- `DELETE /drive/items/:id` — Move to Recently Deleted (soft delete).
- `POST /drive/items/:id/copy` — Copy to destination folder.
- `POST /drive/items/:parent_id/folder` — Create new folder.
- `GET /drive/recents` — List recently accessed files across all locations.
- `GET /drive/tagged/:tag_id` — List all items with specific tag.
- `GET /drive/favorites` — List favorited items.

### Recently Deleted
- `GET /drive/recently-deleted` — List items in trash with days-until-purge.
- `POST /drive/recently-deleted/:id/restore` — Restore to original location (or specified alternate if parent deleted).
- `DELETE /drive/recently-deleted/:id` — Permanent delete.
- `DELETE /drive/recently-deleted` — Empty all (permanent delete all trashed items).

### Sharing
- `POST /drive/items/:id/share` — Create sharing record. Body: access_scope, default_permission, participants (email/phone + permission).
- `GET /drive/items/:id/sharing` — Get sharing details including participants and link.
- `PATCH /drive/items/:id/sharing` — Update sharing settings (scope, permissions).
- `POST /drive/items/:id/sharing/participants` — Add participant.
- `PATCH /drive/items/:id/sharing/participants/:pid` — Change participant permission.
- `DELETE /drive/items/:id/sharing/participants/:pid` — Remove participant.
- `DELETE /drive/items/:id/sharing` — Stop sharing entirely (revoke all access).
- `GET /drive/shared-with-me` — List items others have shared with authenticated user.
- `POST /drive/shared-with-me/:sharing_id/accept` — Accept sharing invitation.
- `POST /drive/shared-with-me/:sharing_id/decline` — Decline sharing invitation.

### Sync And Optimized Storage
- `GET /drive/delta?cursor=:token` — Get changes since last sync. Return changed items and new cursor. Include creates, modifies, deletes, moves, and sharing changes.
- `POST /drive/items/:id/pin` — Mark file/folder as "Always keep downloaded" (prevent eviction).
- `DELETE /drive/items/:id/pin` — Remove pin, allow eviction.
- `POST /drive/items/:id/evict` — Manually remove local copy, keep cloud-only (free space).
- `GET /drive/sync-status` — Get per-device sync summary (items pending upload, download, conflicts).
- `GET /drive/conflicts` — List unresolved conflicts.
- `POST /drive/conflicts/:id/resolve` — Resolve conflict with chosen strategy (keep_original/keep_conflict/keep_both).

### Desktop And Documents
- `GET /drive/desktop-documents` — List Desktop & Documents sync status per device.
- `POST /drive/desktop-documents/:device_id/enable` — Enable Desktop & Documents sync for device.
- `DELETE /drive/desktop-documents/:device_id` — Disable sync (content remains in cloud).

### Storage Management
- `GET /storage/usage` — Get total usage breakdown by category.
- `GET /storage/recommendations` — Get cleanup recommendations (large files, old items, Recently Deleted content).
- `GET /storage/plan` — Get current plan details and upgrade options.
- `POST /storage/plan/upgrade` — Initiate plan upgrade (redirects to payment).
- `GET /storage/family` — Get family pool usage and per-member breakdown.
- `POST /storage/family/allocate` — Set per-member storage limits (organizer only).

### Family Sharing
- `GET /family` — Get family group details, members, and shared plan.
- `POST /family/invite` — Invite family member.
- `DELETE /family/members/:id` — Remove family member (organizer only).
- `POST /family/leave` — Leave family group (member).

### App Containers
- `GET /drive/app-containers` — List all app containers with storage usage.
- `DELETE /drive/app-containers/:id/data` — Delete app's iCloud data (user-initiated cleanup).
- `GET /drive/app-containers/:id/items` — List items in public app container.

### Advanced Data Protection
- `GET /security/adp-status` — Get ADP enrollment status and prerequisites.
- `POST /security/adp/enable` — Enable ADP (requires recovery method configured).
- `DELETE /security/adp` — Disable ADP (content re-encrypted with standard protection).
- `POST /security/recovery-contact` — Add recovery contact.
- `POST /security/recovery-key/generate` — Generate new recovery key.

### Web Access (iCloud.com)
- `POST /web/session` — Create web session with 2FA verification.
- `GET /web/drive/items/:id` — Web-specific file operations (same as native but session-scoped).
- `POST /web/drive/items/:id/edit-session` — Create collaborative editing session for iWork documents.

### Notifications
- `GET /notifications` — List notifications with pagination.
- `PATCH /notifications/:id/read` — Mark notification read.
- `GET /notification-preferences` — Get per-category notification settings.
- `PATCH /notification-preferences` — Update preferences.

### Privacy And Account
- `POST /privacy/data-export` — Request full data export.
- `DELETE /account` — Initiate account deletion (grace period before permanent).
- `GET /privacy/settings` — Return privacy and data handling preferences.

## Realtime, Push, And Offline Behavior

- **Delta sync protocol**: Devices poll `/delta` endpoint at variable intervals (immediate after user action, 30s when active, 5min in background, 15min in low-power). Response includes all changes since cursor with item metadata.
- **Push notifications (APNs)**: Silent push to wake sync client when server detects new changes. Visible push for: sharing invitations, storage warnings, conflict notifications, family changes.
- **Collaboration WebSocket**: During real-time document editing (iWork equivalent), WebSocket carries OT operations, cursor positions, and participant presence. Auto-reconnect with operation replay buffer.
- **Optimized Storage eviction logic**: When device disk usage exceeds threshold (default 85%), evict least-recently-accessed unpinned iCloud Drive files first, then progressively more recent files. Keep thumbnails and metadata always. Never evict pinned files.
- **Offline behavior**: All folder metadata and thumbnails cached locally (minimal size). Downloaded/pinned files fully available offline. Cloud-only files show download icon; tapping offline shows "available when online" message. Edits to downloaded files queue for upload on reconnect.
- **Background upload/download**: iOS: NSURLSession background transfer. macOS: persistent daemon. Respect Low Power Mode (pause non-urgent transfers). Resume from last chunk on interruption. Upload priority: user-initiated > active document > recent edit > background sync.
- **Conflict detection**: Compare server ETag with local known-ETag before upload. If mismatch: (1) for real-time collaboration documents, merge via OT engine; (2) for other files, create conflict copy with sequential number suffix; (3) notify user with resolution options.
- **Device sync coordination**: Multiple devices sync independently via delta protocol. No device-to-device direct sync. Server is source of truth. Desktop & Documents changes from Mac A appear on Mac B via server round-trip.
- **Web session**: iCloud.com sessions are independent of device sync. Changes made via web trigger delta for device clients. Web editing sessions use same collaboration protocol as native apps.

## Permissions, Privacy, And Safety

- **End-to-end encryption (ADP)**: With Advanced Data Protection, file content and metadata encrypted with keys known only to user's trusted devices. Apple cannot access or decrypt. Key material synced via iCloud Keychain (itself E2E encrypted).
- **Standard encryption**: Without ADP, Apple holds encryption keys. Apple can decrypt for legal process. Files still encrypted at rest and in transit.
- **Family privacy**: Family members share storage pool but cannot see each other's files. Only storage usage amount (not content/filenames) visible to organizer.
- **Sharing privacy**: Shared items visible only to explicit participants. No discoverability or search by non-participants. Participants see each other's names but not other account details.
- **Data minimization**: Thumbnails generated server-side but content not indexed for advertising. No content-based recommendations. No cross-service content analysis (unless user enables specific features).
- **Permission requests**: iOS Files app is system app (no additional permissions needed for file access). Camera permission only for document scan. Notifications for sync alerts. Location never required.
- **Account recovery safety**: Recovery contacts cannot access user data directly. They can only verify identity to Apple to unlock account access. Recovery key is sole-possession factor.
- **Data residency**: Content stored in regional datacenters per Apple's infrastructure. China mainland iCloud operated by separate entity (GCBD) with data residency requirements.
- **Child safety**: Family Sharing respects parental controls. Children's accounts have restricted sharing and require organizer approval for certain actions.

## Analytics And Monetization

- **Onboarding events**: `icloud_drive_enabled`, `desktop_documents_sync_enabled`, `first_file_uploaded`, `first_folder_shared`, `adp_enabled`, `family_sharing_joined`.
- **Core action events**: `file_uploaded` (size_bucket, type_category), `file_downloaded`, `file_previewed`, `folder_created`, `file_shared`, `collaboration_session_started`, `tag_applied`, `file_favorited`.
- **Sync events**: `sync_completed` (item_count, duration), `conflict_detected`, `conflict_resolved` (method), `file_evicted` (optimized_storage), `file_pinned`, `desktop_documents_initial_sync_complete`.
- **Storage events**: `storage_warning_shown` (threshold), `cleanup_performed` (freed_bytes), `plan_upgrade_viewed`, `plan_upgraded`, `recently_deleted_emptied`.
- **Family events**: `family_member_invited`, `family_member_joined`, `family_storage_allocation_changed`.
- **Security events**: `adp_enabled`, `adp_disabled`, `recovery_contact_added`, `recovery_key_generated`, `web_session_created`, `trusted_device_added`.
- **Monetization model**: Freemium with 5 GB free tier. Paid iCloud+ tiers (50 GB, 200 GB, 2 TB, 6 TB, 12 TB). iCloud+ includes value-add features (Private Relay, Hide My Email, Custom Email Domain, HomeKit Secure Video). Family Sharing pools storage across up to 6 members on 200 GB+ plans.
- **Analytics rule**: Never send file names, file content, folder structure details, sharing participant identities, or family member details as analytics properties. Use anonymized device-scoped identifiers and aggregate size/count metrics only.

## Edge Cases

- **Optimized Storage with no network**: Device needs space, attempts to evict file, but cannot verify cloud copy exists (offline). Defer eviction until network available. Show storage-full warning with "connect to Wi-Fi to free space" guidance.
- **Desktop & Documents conflict across Macs**: Two Macs with same Apple ID both have Desktop sync enabled. File with same name created on both while one is offline. On sync, second file gets sequential number suffix (e.g., "Report 2.docx").
- **Family member leaves with shared content**: Member leaves Family Sharing group. Their personal iCloud content remains theirs. Shared folders they participated in via family features require re-invitation as external participant.
- **Storage downgrade below usage**: User downgrades from 2 TB to 200 GB but uses 500 GB. Account enters read-only state. User can download and delete but not upload. 30-day grace period, then oldest content subject to deletion (with extensive warning).
- **Third-party app deleted but data remains**: User deletes app but iCloud data remains in app container. Show data in Storage Management with option to delete. Data preserved for 30 days after app deletion for reinstall recovery.
- **Advanced Data Protection on legacy device**: User enables ADP but has older device in account that doesn't support it. Must remove legacy device from account before ADP can enable. Show device list with compatibility status.
- **Conflict during real-time collaboration**: Two users offline-edit a shared Pages document. First user reconnects and syncs. Second user reconnects — if changes overlap, create conflict copy; if non-overlapping, auto-merge sections.
- **Recovery contact unavailable**: User needs account recovery, designated contact is unreachable (changed number, passed away). Must use recovery key. If no recovery key and ADP enabled, data is permanently lost. Show clear warning during ADP enrollment.
- **iCloud.com access with ADP**: User has ADP enabled and tries to access iCloud.com. Requires approval from trusted device before web session can decrypt content. If no trusted device available, web access is blocked.
- **File Provider app crash during write**: App crashes mid-save to iCloud Drive via File Provider. Partial write detected by framework. Discard partial content, preserve previous version. Notify app on next launch to retry save.
- **Shared folder owner deletes account**: Ownership transfers to longest-tenured participant with edit permission. If no eligible participant, shared folder becomes read-only for 30 days, then sharing is dissolved.
- **Tag sync conflict**: User adds different tags to same file on two offline devices simultaneously. On sync, merge both sets of tags (union). No conflict needed for additive-only tag operations.
- **Recently Deleted from shared folder**: User deletes file from shared folder. Other participants see file disappear immediately. File goes to deleter's Recently Deleted. Folder owner can also see deleted items via folder activity.
- **Quota full during camera backup**: User's iCloud Photos backup fills quota. iCloud Drive file uploads are also blocked (shared quota). Show unified storage-full message directing to storage management across all categories.

## Test Plan

- **Unit tests**: Optimized storage eviction scoring algorithm. Conflict detection (ETag comparison and resolution strategy selection). Tag merge logic (set union). Storage breakdown calculation by category. Encryption key derivation hierarchy. Family pool quota allocation arithmetic. Sync cursor state machine. File name conflict sequential numbering.
- **Integration tests**: Full file upload/download cycle with versioning. Folder sharing invitation and acceptance flow. Participant permission change and enforcement. Desktop & Documents sync enable/disable lifecycle. Delta sync with concurrent multi-device changes. Optimized storage eviction and re-download cycle. Recently Deleted restore to original and alternate locations. Tag application and tag-based filtering. App container data lifecycle (app install, data create, app delete, data cleanup).
- **Contract tests**: All API response shapes, error codes (400/401/403/404/409/413/507), pagination cursors, delta tokens, upload session URLs, sharing link formats, and push notification payloads.
- **Sync tests**: Multi-device delta sync convergence. Conflict copy creation with correct naming. Pinned file immunity from eviction. Optimized storage threshold trigger. Desktop & Documents initial migration. Offline edit queue persistence. Reconnection delta application. Large folder initial sync (10K+ items). Chunked upload resume after interruption.
- **Offline tests**: Folder browsing with cached metadata. Pinned file access without network. Cloud-only file tap shows download-required message. Queued file operations (rename, move, delete) persist across app restart and execute on reconnect. Edit to downloaded file queues upload.
- **Security tests**: Two-factor authentication enforcement. Advanced Data Protection enrollment prerequisites (recovery method required). ADP key rotation on trusted device change. Web session 2FA requirement. E2E encryption verification (content unreadable without device key). Recovery contact flow. Recovery key verification. Device trust establishment. Session timeout enforcement.
- **Sharing tests**: File share with view/edit permissions enforced. Folder share with content inheritance. Participant addition/removal and immediate access change. Link sharing with scope enforcement (invited-only vs. anyone). Share revocation blocks immediate access. Cross-participant visibility (can't see items shared with others). Ownership transfer on shared folders.
- **Family tests**: Family pool quota calculation. Per-member usage tracking without content visibility. Family member addition and storage pooling. Member departure and content separation. Child account restrictions. Organizer plan change propagation to members.
- **Performance tests**: Delta sync with 100K changed items. Optimized storage eviction batch processing. Thumbnail generation pipeline throughput. Large file chunked upload (50 GB). Concurrent multi-device sync (5 devices). Web editor collaboration with 10 participants.
- **Accessibility tests**: VoiceOver navigation in Files app file tree. Dynamic type in all screens. Focus management in share sheet. Color-independent sync status indication (not relying solely on icon color). Keyboard navigation for iCloud.com web interface.
- **Billing tests**: Free to paid upgrade (immediate quota increase). Paid downgrade (grace period enforcement). Family plan upgrade propagation. Family member departure quota recalculation. Expired payment handling (grace period, then restrictions).

## Acceptance Criteria

- A new user signs in and iCloud Drive activates with correct free-tier storage quota.
- Files created on one device appear on all other signed-in devices within 60 seconds via delta sync.
- Desktop & Documents sync migrates existing folder contents and maintains real-time sync.
- Optimized Storage automatically evicts files when disk usage exceeds threshold and downloads them on demand.
- Pinned files remain downloaded and available offline regardless of storage pressure.
- File sharing with specific people enforces view/edit permissions correctly for all operations.
- Folder sharing propagates permissions to all contents and new items added by any participant.
- Tags are applied, synced across devices, and enable tag-based file filtering/browsing.
- Recently Deleted retains items for 30 days with successful restore and permanent delete.
- Family Sharing correctly pools storage quota without exposing member content.
- Advanced Data Protection enrollment requires recovery method and prevents Apple-side decryption.
- iCloud.com provides full file management and iWork document editing with 2FA.
- Third-party app containers store and sync data visible in Files app.
- Conflict detection creates correctly-named conflict copies and surfaces resolution UI.
- All data entities have documented owners, lifecycle states, authorization rules, and deletion/export behavior.
- At least 15 acceptance tests cover: file upload/download, cross-device sync, optimized storage eviction, sharing permissions, folder collaboration, Desktop & Documents sync, offline access, conflict resolution, tag management, Recently Deleted, Family Sharing quota, ADP enrollment, web access, app container integration, and account deletion.

## Open Questions

- What is the exact eviction scoring algorithm for optimized storage (access frequency weight vs. recency weight vs. file size)?
- How does conflict naming work beyond "filename 2" — does it increment per-device or globally?
- What is the exact behavior when Desktop & Documents sync is disabled — are files moved back locally or kept only in cloud?
- How does File Provider handle apps that don't support open-in-place (copy semantics vs. coordination)?
- What is the exact timeline and process for storage downgrade enforcement (read-only period, content deletion warnings)?

## Build Plan

- Phase 1: Research URLs verified (complete). Define route map, component tree, design tokens, and API schema.
- Phase 2: Build authentication (Apple ID equivalent with 2FA), drive item CRUD, upload (simple + chunked), download, and basic preview.
- Phase 3: Implement file/folder sharing system (invitations, permissions, links), shared-with-me view, and collaboration notifications.
- Phase 4: Build delta sync engine (cursor-based change tracking, multi-device convergence, conflict detection and resolution).
- Phase 5: Implement optimized storage (eviction scoring, pinning, download-on-demand, storage pressure monitoring).
- Phase 6: Build Desktop & Documents sync (macOS folder redirect, initial migration, ongoing sync).
- Phase 7: Implement tags, favorites, recents, Recently Deleted, and storage management with cleanup recommendations.
- Phase 8: Build Family Sharing (pool quota, member management, privacy boundaries, plan propagation).
- Phase 9: Implement Advanced Data Protection (E2E encryption enrollment, recovery contacts/key, key hierarchy).
- Phase 10: Build iCloud.com web interface (file browser, document editor, session management).
- Phase 11: Implement File Provider framework integration (app containers, open-in-place coordination).
- Phase 12: Complete security hardening, accessibility, full test suite, and performance optimization.
- Phase 13: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Conduct hands-on verification of optimized storage eviction behavior on macOS with varying disk pressure.
- Verify Desktop & Documents sync initial migration behavior and disable semantics.
- Test File Provider coordination protocol with third-party apps.
- Verify Family Sharing storage pool mechanics and per-member visibility boundaries.
- Design original UI component library and design tokens distinct from Apple/iCloud branding.
- Set up downstream implementation repository with scaffold from this spec.
