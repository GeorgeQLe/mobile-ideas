# Miro-Style Clone Spec

> Metadata
> - Inspiration app: Miro
> - Category: Collaborative whiteboard
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Miro Help pages, trust/security/privacy/terms pages, and public pricing pages.
> - Manual verification blockers: native large-board pan/zoom performance, realtime collaboration latency, mobile template insertion, SSO/SCIM, billing purchase/restore, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, templates, AI prompts, private APIs, and customer board data.

## Overview

Build an original mobile collaborative whiteboard inspired by Miro's public mobile and help documentation: board browsing, infinite canvas, sticky notes, text, shapes, frames, connectors, comments, uploads, templates, AI-adjacent affordances, presentation/follow modes, sharing, and enterprise-ready permissions.

The clone must not copy Miro branding, screenshots, UI copy, icons, proprietary templates, AI prompts, private APIs, or customer board data. V1 can reproduce comparable collaboration jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support authenticated board browsing, recent boards, team/workspace switching, and permission-filtered search.
- Support mobile infinite-canvas editing for sticky notes, shapes, text, connectors, frames, drawings, comments, and image/file uploads.
- Support realtime collaboration with presence, cursors/selections, comments, follow/bring-to-me style attention management, and conflict-safe operations.
- Support original or properly licensed templates with insertion previews, size limits, and entitlement gates.
- Enforce team/board permissions, share links, SSO-ready sessions, audit events, export/delete, and subscription gates while excluding raw board content from telemetry.

## Non-Goals

- Do not imply Miro affiliation or copy Miro brand assets.
- Do not copy protected templates, screenshots, UI copy, icons, AI prompts, or private APIs.
- Do not build a full enterprise DLP/eDiscovery/admin console in V1.
- Do not bypass board permissions, SSO, workspace policy, billing state, or data retention restrictions.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/miro-online-whiteboard/id1180074773 | Official iOS listing, mobile positioning, screenshots, privacy labels | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.miro.android | Official Android listing, data-safety summary, screenshots, feature positioning | Verified 2026-05-03 |
| Miro Mobile App Help | https://help.miro.com/hc/en-us/articles/360017572834-Mobile-app | Mobile app capabilities including sticky notes, shapes, comments, uploads, connectors, SSO, and attention management | Verified 2026-05-03 |
| Miro Help Center | https://help.miro.com/ | Board, canvas, templates, comments, sharing, admin, and billing support taxonomy | Verified 2026-05-03 |
| Miro Trust Center | https://miro.com/trust/ | Security, privacy, compliance, enterprise controls, and trust posture | Verified 2026-05-03 |
| Miro Privacy Policy | https://miro.com/legal/privacy-policy/ | Personal-data and customer-content handling context | Verified 2026-05-03 |
| Miro Terms of Service | https://miro.com/legal/terms-of-service/ | Account, acceptable-use, service, and subscription legal context | Verified 2026-05-03 |
| Miro Pricing | https://miro.com/pricing/ | Public entitlement and feature-gating signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Sign-in must support email/OAuth now and be SSO/SAML-ready for managed organizations.
- Board dashboard must expose recent boards, team/workspace context, search, favorites, and permission-filtered results.
- Canvas must support pan/zoom, viewport culling, selection, lasso-like multi-select, creation/edit/delete for sticky notes, text, shapes, connectors, frames, drawings, images, and files.
- Frames must act as navigable containers and support presentation/follow flows with safe mobile fallbacks.
- Comments must anchor to canvas coordinates or elements, support replies, mentions, resolution, notifications, and anchor drift handling.
- Realtime presence must show collaborators, cursors/selections, operation acknowledgement, and reconnect/error states without leaking board content through push.
- Template gallery must use original/licensed templates only, with preview, insertion bounds, attribution/license metadata, and size/entitlement validation.
- Uploads must use signed URLs, malware scanning, file-size/type controls, and deletion lifecycle.
- AI-adjacent features must be opt-in, permission-filtered, and feature-flagged until legal and privacy review is complete.
- Entitlements must gate advanced templates, large boards, participant limits, advanced sharing, SSO/admin, audit logs, export controls, and usage volume server-side.
- Analytics must exclude raw sticky text, comments, board names, uploaded filenames/content, template content, drawings, and customer identifiers.

## Core User Journeys

- User signs in, selects a team, opens recent boards, and searches for a board.
- User pans/zooms a large board, creates a sticky note, changes color, moves it, and edits text.
- User adds shapes and connectors, groups them in a frame, and navigates frames.
- User uploads an image or file, waits for scanning, and places it on the board.
- User comments on an element, mentions a collaborator, replies to a thread, and resolves it.
- User joins a live board, sees collaborators, follows a presenter, and handles reconnect.
- User inserts an original template and sees rejection if it exceeds board or entitlement limits.
- User shares a view/comment/edit link and updates permissions when authorized.
- Admin-managed user signs in via SSO and sees locked settings, audit logging, and entitlement-gated controls.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Workspace | Sign in and select team | email/OAuth/SSO, workspace | waiting, authenticated, selected | SSO failure, domain blocked |
| Board Dashboard | Browse recent boards | list, favorite, open | empty, loaded, syncing | offline, access revoked |
| Search | Find boards/templates | query, filters | results, empty | rate limited, permission filtered |
| Canvas | Edit infinite board | pan, zoom, select, add | loaded, editing, syncing | huge board, reconnecting |
| Mobile Toolbar | Choose tools | sticky, text, shape, connector, draw | selected, disabled | permission denied |
| Element Inspector | Edit selected element | color, text, bounds, delete | loaded, saved | stale version |
| Frames / Presentation | Navigate and present frames | next, previous, follow | presenting, following, idle | missing frame, lag |
| Comments | Add/reply/resolve | text, mention, resolve | empty, thread, resolved | anchor drift, abuse throttle |
| Templates | Browse and insert | search, preview, insert | loaded, inserted, gated | template too large |
| Share / Permissions | Invite and link settings | role, link, copy | created, updated | insufficient permission |
| Settings / Admin Notice | Account and policy | toggles, logout, cache | loaded, managed | admin locked, offline |

## Data Model

- `Organization`: tenant, domain, entitlement, SSO policy, retention settings, admin configuration.
- `Member`: identity, org/team role, notification preferences, locale, managed flags.
- `Team`: org grouping, boards, members, permissions, plan context.
- `Board`: title reference, team, visibility, canvas bounds, version, archived state, share policy.
- `CanvasElement`: board, type, bounds, style, content reference, z-order, lock state, version.
- `StickyNote`: element extension with color, text reference, author label, tags.
- `Shape`: element extension with shape kind, fill/stroke, text reference.
- `Connector`: source/target references, route points, arrow style, detached state.
- `Frame`: bounds, title reference, ordered presentation metadata.
- `Drawing`: stroke points, brush style, simplified geometry.
- `Upload`: file metadata, scan state, storage key, placed element reference, retention lifecycle.
- `Comment`: board/element/coordinate anchor, author, body reference, mentions, replies, resolved state.
- `Template`: original/licensed content bundle, license metadata, preview, size, entitlement requirement.
- `Presence`: member, cursor/viewport/selection, heartbeat, follow target.
- `ShareLink`: token, role, expiry, scope, audit metadata.
- `AuditEvent`: auth, permission, board, element, comment, template, share, billing, export/delete, and admin changes.
- `Entitlement`: tier, seats, feature flags, usage counters, renewal/expiration, billing owner.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /organizations`, `GET /teams`, `GET /boards/recent`, `GET /boards/search?q=&cursor=`: browsing.
- `GET /boards/:id/manifest`, `GET /boards/:id/elements?viewport=&cursor=`, `POST /boards`, `PATCH /boards/:id`: board access.
- `POST /boards/:id/elements`, `PATCH /boards/:id/elements/:elementId`, `DELETE /boards/:id/elements/:elementId`: element edits.
- `POST /boards/:id/frames`, `POST /boards/:id/presentation/start`, `PATCH /boards/:id/presentation/:sessionId`: frames/presentation.
- `GET /comments?boardId=`, `POST /comments`, `POST /comments/:id/replies`, `PATCH /comments/:id`: comments.
- `GET /templates`, `GET /templates/:id/preview`, `POST /boards/:id/insert-template`: templates.
- `POST /uploads`, `POST /uploads/:id/complete`, `GET /uploads/:id/status`: uploads.
- `POST /shares`, `PATCH /shares/:id`, `GET /shares/:token`: sharing.
- `GET /notifications`, `PATCH /notifications/:id`, `GET /entitlements`, `POST /billing/webhook`: notifications and gates.
- `POST /data-export`, `DELETE /account`, `GET /audit-events`: privacy/admin workflows.

## Realtime, Push, And Offline Behavior

- Canvas operations, presence, comments, presentation, and share changes use WebSocket/SSE with version cursors and resumable sessions.
- Canvas edits use CRDT or operation-log semantics with server validation for permissions, bounds, quotas, and entitlement limits.
- Offline mode supports cached boards as read-only plus queued small text/sticky/comment drafts only when policy allows.
- Large-board rendering uses viewport culling, tile/element pagination, operation compaction, and memory-pressure recovery.
- Uploads are resumable and cannot become visible until size/type/malware checks pass.
- Push payloads use opaque IDs for mentions, replies, share invites, presentation/follow requests, and access changes.
- Cache purge must run on logout, SSO deprovisioning, permission revocation, tenant policy change, or export/delete completion.

## Permissions, Privacy, And Safety

- Enforce organization, team, board, element, comment, upload, template, share, and admin roles on every operation.
- SSO/SCIM-ready sessions must handle deprovisioning, seat limits, admin-managed settings, and cache purge.
- Analytics exclude raw board names, sticky text, comments, uploaded filenames/content, drawings, template contents, and customer identifiers.
- Support diagnostics default to metadata; raw content inspection requires user/admin consent and audit logging.
- Uploads require signed URLs, malware scanning, size/type limits, retention controls, and deletion lifecycle.
- Template insertion must verify original/licensed content, attribution metadata, and no proprietary Miro templates.
- Abuse controls throttle comment spam, mention storms, canvas operation floods, share-link guessing, search scraping, and upload abuse.
- Export/delete workflows must account for organization ownership, enterprise retention, and legal hold-style restrictions where applicable.

## Analytics And Monetization

- Track privacy-safe events: workspace selected, board opened, element added, frame created, presentation started, comment added/resolved, template inserted, upload completed, share created, search performed, offline queue flushed, entitlement gate hit.
- Event payloads use object types, counts, role class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers may gate advanced templates, large-board limits, participant limits, SSO/SCIM, audit logs, export controls, admin policy, and usage volume.
- Paywalls must identify blocked capability, current entitlement, billing owner/admin contact, restore path, and support path.

## Edge Cases

- Board has tens of thousands of elements and exceeds mobile memory.
- Connector target element is deleted or permission-hidden.
- Comment anchor references a deleted or moved element.
- Template insertion overlaps existing content or exceeds board quota.
- Presence heartbeat expires while following another collaborator.
- Offline sticky/comment draft conflicts with board deletion or permission revocation.
- Upload scan fails after the element placeholder appears.
- SSO session expires during upload, share update, or realtime sync.
- Entitlement downgrade hides templates/large-board features while screen is open.
- Push arrives for board user can no longer access.
- Export/delete intersects with enterprise retention policy.
- Accessibility user cannot rely on pan/zoom, lasso, or tiny canvas targets.

## Test Plan

- Unit tests for operation validation, CRDT/operation merge, viewport culling, connector repair, anchor projection, template license metadata, upload state, permission checks, and entitlement gates.
- Contract tests for auth, workspace context, board browsing, manifests/elements, realtime operations, comments, templates, uploads, shares, notifications, billing, export/delete, and audit routes.
- Integration tests for board open, sticky/shape/connector edit, frame navigation, presentation/follow, comment add/reply/resolve, template insertion, upload placement, share update, and logout.
- Realtime/offline tests for presence, operation replay, reconnect, cached boards, draft queue, stale versions, permission revocation, and cache purge.
- Enterprise tests for SSO expiry, SCIM deprovisioning, admin-locked settings, audit log, entitlement downgrade, and export/delete restrictions.
- Privacy/security tests for analytics redaction, push opacity, support diagnostics, signed upload access, permission filtering, share-token entropy, template provenance, and raw-content access controls.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and enterprise-managed states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, non-gesture canvas navigation, element lists, comment navigation, color contrast, reduced motion, and hardware keyboard.
- Manual verification tests: native large-board pan/zoom, realtime collaboration latency, mobile template insertion, SSO/SCIM, billing purchase/restore, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Miro brand assets, proprietary templates, AI prompts, private APIs, or customer data.
- Board browsing, canvas editing, frames/presentation, comments, templates, uploads, sharing, notifications, search, and settings have deterministic contracts and failure codes.
- Permissions, entitlements, realtime operations, uploads, offline drafts, and large-board rendering reconcile safely.
- Enterprise SSO/SCIM, audit, export/delete, and admin-managed behavior are supported or explicitly feature-flagged.
- Analytics, push, support, cache, and logs avoid raw board content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which canvas engine is V1: native drawing, Skia, WebGL, or server-tiled rendering?
- Which original template set is legally available for first release?
- Are AI-adjacent sticky clustering/summarization features deferred or gated beta?
- How much offline editing is acceptable for enterprise tenants?
- Which SSO providers and SCIM workflows are needed first?
- Which follow/presentation controls are required on phone versus tablet?

## Build Plan

- Phase 1: scaffold auth, workspace/team/board browsing, board manifest, canvas renderer, sticky/text/shape primitives, and privacy-safe analytics.
- Phase 2: add connectors, frames, comments, uploads, share links, element inspector, and large-board viewport culling.
- Phase 3: add realtime operations, presence, follow/presentation, template gallery with original/licensed content, and search.
- Phase 4: add offline read/draft queue, push fanout, reconnect/resume, cache purge, upload scanning, and conflict handling.
- Phase 5: add SSO/SCIM-ready admin, entitlements, audit events, export/delete, support diagnostics, and billing reconciliation.
- Phase 6: complete accessibility, security/privacy review, canvas performance tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 scope for templates, realtime presence, presentation/follow, and AI-adjacent features.
- Create or link the downstream implementation repository when Phase 1 is ready.
