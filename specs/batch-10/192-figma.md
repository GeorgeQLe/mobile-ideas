# Figma-Style Clone Spec

> Metadata
> - Inspiration app: Figma mobile
> - Category: Design collaboration
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Figma Help pages, security/privacy/terms pages, and public pricing pages.
> - Manual verification blockers: native file rendering fidelity, prototype playback, mirroring latency, FigJam iPad behavior, comments realtime, SSO/SCIM, billing purchase/restore, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, design files, plugin code, private APIs, and customer workspace data.

## Overview

Build an original mobile design-review companion inspired by Figma's public mobile documentation: browse files, projects, workspaces, prototypes, slides, and boards; view and comment on files; play prototypes; mirror selected desktop frames; share links; and manage permissions from mobile.

The clone must not copy Figma branding, screenshots, UI copy, icons, file format internals, design assets, plugin code, private APIs, or customer data. V1 can reproduce comparable mobile review and collaboration jobs with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support authenticated browsing across teams/workspaces, projects, recent files, favorites, design files, FigJam-style boards, prototypes, and slide decks.
- Support read-only mobile file viewing with pages/frames, pan/zoom, asset loading, comments, mentions, thread resolution, and share links.
- Support prototype playback with hotspots, scaling, overlays, and fallback states for unsupported transitions.
- Support desktop-to-mobile mirroring of selected frames where authenticated realtime channels are available.
- Enforce file/team permissions, SSO-ready sessions, audit events, export/delete, and subscription gates while excluding raw design content from telemetry.

## Non-Goals

- Do not imply Figma affiliation or copy Figma brand assets.
- Do not copy protected design files, UI copy, screenshots, icons, plugin code, file-format internals, or private APIs.
- Do not build full design editing in V1; mobile editing is out of scope except comments/permissions.
- Do not bypass file permissions, SSO, workspace policy, billing state, or data retention restrictions.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/figma/id1152747870 | Official iOS listing, mobile positioning, screenshots, privacy labels | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.figma.mirror | Official Android listing, data-safety summary, features for viewing/commenting/mirroring/prototypes/slides | Verified 2026-05-03 |
| Figma Mobile Help | https://help.figma.com/hc/en-us/articles/1500007537281-Guide-to-the-Figma-mobile-app | Mobile app capabilities, access rules, login methods, platform support, no-editing note | Verified 2026-05-03 |
| Figma Help Center | https://help.figma.com/ | Comments, sharing, prototypes, teams/projects, permissions, billing/admin support taxonomy | Verified 2026-05-03 |
| Figma Security | https://www.figma.com/security/ | Security, compliance, enterprise controls, and trust posture | Verified 2026-05-03 |
| Figma Privacy Policy | https://www.figma.com/privacy/ | Personal-data and customer-content handling context | Verified 2026-05-03 |
| Figma Terms of Service | https://www.figma.com/legal/tos/ | Account, acceptable-use, service, and subscription legal context | Verified 2026-05-03 |
| Figma Pricing | https://www.figma.com/pricing/ | Public entitlement and feature-gating signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Sign-in must support email/OAuth now and be SSO/SAML-ready for managed organizations.
- Mobile home must expose recent files, search, favorites, teams/workspaces, projects, and permission-filtered results.
- File viewer must render an original, documented manifest format with pages, frames, nodes, image/vector assets, comments, and prototype metadata.
- Viewer must support pan/zoom, page/frame navigation, asset loading states, error placeholders, and memory-aware tile/viewport rendering.
- Comments must be anchored to file coordinates or nodes, support mentions, replies, resolution, notifications, and anchor drift handling.
- Prototype player must support starting point selection, hotspot navigation, overlays, back/close controls, scaling modes, and unsupported-transition fallbacks.
- Mirroring must sync a selected desktop frame to a mobile device through an authenticated channel and must never require private Figma APIs.
- Slide/board review must share the same viewer/comment primitives with content-type-specific navigation.
- Sharing must generate permission-aware view/comment links and allow updates only when the user has sufficient access.
- Entitlements must gate organization administration, advanced sharing, dev-mode-like metadata, storage/seat limits, SSO/admin features, and audit logs server-side.
- Push payloads must use opaque IDs and fetch content only after unlock/session validation.
- Analytics must exclude raw file names, frame names, comments, design content, image/vector data, and customer identifiers.

## Core User Journeys

- User signs in, selects a workspace/team, and opens recent files.
- User searches for a file, opens it, navigates pages and frames, pans/zooms, and handles missing asset placeholders.
- User plays a prototype, taps hotspots, changes scaling, sees unsupported transitions degrade cleanly, and exits to the frame.
- User adds a pinned comment, mentions a teammate, replies to a thread, and resolves it.
- User opens comment activity from push, verifies permission, and lands on the anchored frame.
- User shares a view/comment link and changes link permissions when authorized.
- User mirrors a desktop-selected frame to the phone and sees reconnect/error states.
- User reviews a slide deck in portrait/landscape and comments on a slide.
- Admin-managed user signs in via SSO and sees locked settings, audit logging, and entitlement-gated controls.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Workspace | Sign in and select team | email/OAuth/SSO, workspace | waiting, authenticated, selected | SSO failure, cookies blocked |
| Home / Recents | Browse recent work | list, favorite, open | empty, loaded, syncing | offline, access revoked |
| Search | Find files/projects | query, filters | results, empty | rate limited, permission filtered |
| Project Browser | Navigate teams/projects | team, project, file | loaded, empty | project hidden |
| File Viewer | Review frames/pages | pan, zoom, frame/page nav | loaded, rendering, tiled | asset missing, huge file |
| Prototype Player | Play flows | tap hotspot, back, scale | playing, paused, ended | unsupported transition |
| Comments | Add/reply/resolve | text, mention, resolve | empty, thread, resolved | anchor drift, abuse throttle |
| Mirror Session | Preview desktop frame | connect, reconnect | connected, syncing | desktop unavailable |
| Share / Permissions | Invite and link settings | role, link, copy | created, updated | insufficient permission |
| Activity / Notifications | Review mentions | open, archive | unread, read, empty | revoked content |
| Settings / Admin Notice | Account and policy | toggles, logout, cache | loaded, managed | admin locked, offline |

## Data Model

- `Organization`: tenant, domain, entitlement, SSO policy, retention settings, admin configuration.
- `User`: identity, org role, team memberships, notification preferences, locale, managed flags.
- `Team`: org grouping, projects, members, permissions, plan context.
- `Project`: team grouping, files, visibility, archived state.
- `DesignFile`: manifest, pages, frames, assets, comments, prototype flows, permissions, version.
- `Page`: file section, frame order, thumbnail metadata.
- `Frame`: bounds, node tree reference, prototype start points, thumbnail and render state.
- `Node`: original clone schema for shape/text/image/component-like objects, style references, bounds, asset links.
- `PrototypeFlow`: start frame, hotspots, transitions, overlays, scaling and device metadata.
- `Comment`: file/frame/node anchor, author, body reference, mentions, replies, resolved state.
- `ShareLink`: token, role, expiry, scope, audit metadata.
- `MirrorSession`: desktop client, mobile client, selected frame, heartbeat, version cursor.
- `Asset`: image/vector/blob metadata, storage key, cache status, deletion lifecycle.
- `AuditEvent`: auth, permission, file, comment, share, billing, export/delete, and admin changes.
- `Entitlement`: tier, seats, feature flags, usage counters, renewal/expiration, billing owner.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /organizations`, `GET /teams`, `GET /projects?teamId=`, `GET /users/me`: workspace context.
- `GET /files/recent`, `GET /files/search?q=&cursor=`, `GET /projects/:id/files`: browsing.
- `GET /files/:id/manifest`, `GET /files/:id/pages/:pageId`, `GET /files/:id/frames/:frameId`, `GET /assets/:id`: viewer.
- `GET /prototypes/:id`, `POST /prototypes/:id/session`, `POST /prototypes/:id/events`: playback.
- `GET /comments?fileId=`, `POST /comments`, `POST /comments/:id/replies`, `PATCH /comments/:id`: comments.
- `POST /shares`, `PATCH /shares/:id`, `GET /shares/:token`: sharing.
- `POST /mirror/sessions`, `PATCH /mirror/sessions/:id`, `GET /mirror/sessions/:id/frame`: mirroring.
- `GET /notifications`, `PATCH /notifications/:id`, `GET /entitlements`, `POST /billing/webhook`: notifications and gates.
- `POST /data-export`, `DELETE /account`, `GET /audit-events`: privacy/admin workflows.

## Realtime, Push, And Offline Behavior

- Comments, thread resolution, permission changes, and mirroring use WebSocket/SSE or polling with version cursors.
- File manifests and selected assets are cached read-only for offline review; comments and permission changes require server validation.
- Prototype playback can run from cached manifest/assets when all assets are present; missing assets show recoverable placeholders.
- Mirroring requires both desktop and mobile clients online, with heartbeat, reconnect, and version mismatch states.
- Push payloads use opaque IDs for mentions, replies, resolves, share invitations, and access changes.
- Offline cache purge must run on logout, SSO deprovisioning, permission revocation, or tenant policy change.

## Permissions, Privacy, And Safety

- Enforce organization, team, project, file, comment, share, mirror-session, asset, and admin roles on every operation.
- Anyone with viewer-equivalent access may view/comment only where allowed; mirroring requires edit-equivalent access to the selected frame/session.
- SSO/SCIM-ready sessions must handle deprovisioning, seat limits, admin-managed settings, and cache purge.
- Analytics exclude raw file/frame/page names, comments, design content, asset data, thumbnails, and customer identifiers.
- Support diagnostics default to metadata; raw content inspection requires user/admin consent and audit logging.
- Image/vector assets require signed URLs, size limits, malware scanning for uploads, retention controls, and deletion lifecycle.
- Abuse controls throttle comment spam, mention storms, search scraping, share-link guessing, and mirror-session floods.
- Export/delete workflows must account for organization ownership, enterprise retention, and legal hold-style restrictions where applicable.

## Analytics And Monetization

- Track privacy-safe events: workspace selected, file opened, frame viewed, prototype started, transition failed, comment added/resolved, share created, mirror started, search performed, cache purged, entitlement gate hit.
- Event payloads use object types, counts, role class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers may gate team/organization administration, advanced sharing, SSO/SCIM, audit logs, storage/seat limits, and dev-mode-like metadata.
- Paywalls must identify blocked capability, current entitlement, billing owner/admin contact, restore path, and support path.

## Edge Cases

- File manifest is too large for mobile memory and needs progressive loading.
- Asset fetch fails or image/vector asset is missing after file version changes.
- Comment anchor references a deleted or moved frame/node.
- Permission revoked while file/prototype/comment screen is open.
- Prototype hotspot references a missing destination or unsupported transition.
- Mirror session desktop frame changes faster than mobile can render.
- Slide deck orientation changes during comment entry.
- Push arrives for file user can no longer access.
- SSO session expires during comment submit or share update.
- Entitlement downgrade hides advanced sharing/admin while screen is open.
- Export/delete intersects with enterprise retention policy.
- Accessibility user cannot rely on pan/zoom or small canvas targets.

## Test Plan

- Unit tests for manifest parsing, frame indexing, asset cache keys, anchor projection, share-link validation, permission checks, prototype transition fallback, and entitlement gates.
- Contract tests for auth, workspace context, file browsing, manifest/assets, prototype sessions, comments, shares, mirroring, notifications, billing, export/delete, and audit routes.
- Integration tests for recent-file open, search, viewer pan/zoom, prototype playback, comment add/reply/resolve, share update, mirror reconnect, slide review, and logout.
- Realtime/offline tests for comment sync, permission updates, cached manifests/assets, prototype cached playback, mirror heartbeat, revoked-access purge, and stale-version handling.
- Enterprise tests for SSO expiry, SCIM deprovisioning, admin-locked settings, audit log, entitlement downgrade, and export/delete restrictions.
- Privacy/security tests for analytics redaction, push opacity, support diagnostics, signed asset access, permission filtering, share-token entropy, and raw-content access controls.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and enterprise-managed states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, non-gesture navigation, prototype controls, comment navigation, color contrast, reduced motion, and hardware keyboard.
- Manual verification tests: native rendering fidelity, prototype playback, mirroring latency, FigJam iPad behavior, comments realtime, SSO/SCIM, billing purchase/restore, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Figma brand assets, design files, file-format internals, plugin code, private APIs, or customer data.
- Browsing, file viewer, prototype player, comments, sharing, mirroring, notifications, search, and settings have deterministic contracts and failure codes.
- Permissions, entitlements, asset access, offline cache, and realtime conflicts reconcile safely.
- Enterprise SSO/SCIM, audit, export/delete, and admin-managed behavior are supported or explicitly feature-flagged.
- Analytics, push, support, cache, and logs avoid raw design content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which content types are V1 beyond design files: prototypes, boards, slides, or all with limited viewers?
- Which prototype transitions and overlay behaviors are required for first release?
- Which rendering stack will support large files on phone: native canvas, Skia, WebGL, or tiled server renders?
- How much offline cache is acceptable for enterprise tenants?
- Which SSO providers and SCIM workflows are needed first?
- Is mirroring a V1 requirement or a gated beta due to device-pairing complexity?

## Build Plan

- Phase 1: scaffold auth, workspace/team/project browsing, recent/search, file manifest schema, read-only viewer, and privacy-safe analytics.
- Phase 2: add tiled asset rendering, page/frame navigation, comments, mentions, notifications, and share links.
- Phase 3: add prototype player, slide/board review primitives, permission updates, and large-file virtualization.
- Phase 4: add mirroring, realtime comment sync, offline manifest/asset cache, push fanout, cache purge, and conflict handling.
- Phase 5: add SSO/SCIM-ready admin, entitlements, audit events, export/delete, support diagnostics, and billing reconciliation.
- Phase 6: complete accessibility, security/privacy review, rendering performance tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 scope for prototypes, boards, slides, and mirroring.
- Create or link the downstream implementation repository when Phase 1 is ready.
