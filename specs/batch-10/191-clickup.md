# ClickUp-Style Clone Spec

> Metadata
> - Inspiration app: ClickUp
> - Category: Project management
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, ClickUp Help pages, security/privacy/terms pages, and public pricing pages.
> - Manual verification blockers: native iOS/Android offline behavior, push payloads, whiteboard performance, dashboard widgets, SSO/SCIM, billing purchase/restore, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, templates, AI prompts, private APIs, and customer workspace data.

## Overview

Build an original mobile work hub inspired by ClickUp's public mobile and help documentation: tasks, lists, boards, docs, chat-like collaboration, dashboards, whiteboards, reminders, time tracking, workspace hierarchy, and entitlement-aware enterprise controls.

The clone must not copy ClickUp branding, screenshots, UI copy, icons, templates, AI agent prompts, private APIs, or customer data. V1 can reproduce comparable jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support a workspace hierarchy with projects/lists, tasks, subtasks, comments, attachments, custom fields, statuses, priorities, due dates, reminders, and assignments.
- Support mobile list, board, calendar, dashboard, doc, and whiteboard workflows with deterministic fallbacks on small screens.
- Support chat/notification-style collaboration, mentions, push, inbox-style triage, and privacy-safe realtime updates.
- Enforce workspace roles, item-level permissions, share links, enterprise SSO-ready sessions, audit events, export/delete, and subscription gates.
- Preserve privacy by excluding raw task/doc/chat/whiteboard content from analytics, push payloads, logs, and support diagnostics by default.

## Non-Goals

- Do not imply ClickUp affiliation or copy ClickUp brand assets.
- Do not copy protected templates, AI agent prompts, pricing copy, screenshots, icons, or private APIs.
- Do not build a full automation marketplace, CRM suite, ITSM suite, or AI agent platform in V1.
- Do not bypass permissions, SSO, workspace policy, rate limits, billing state, or data retention restrictions.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/clickup-tasks-chat-docs-ai/id1535098836 | Official iOS listing, mobile positioning, screenshots, privacy labels, in-app purchase signal | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=co.mangotechnologies.clickup | Official Android listing, data-safety summary, screenshots, feature positioning | Verified 2026-05-03 |
| ClickUp Help Center | https://help.clickup.com/ | Workspace, task, docs, dashboards, whiteboards, chat, views, permissions, and mobile support taxonomy | Verified 2026-05-03 |
| ClickUp Privacy and Security Help | https://help.clickup.com/hc/en-us/articles/6327713963031-Privacy-and-security | Privacy/security posture, AWS hosting, compliance, encryption, vendor review, login notifications | Verified 2026-05-03 |
| ClickUp Security | https://clickup.com/security | Compliance, encryption, SSO, AI security, monitoring, vulnerability-reporting posture | Verified 2026-05-03 |
| ClickUp Privacy Policy | https://clickup.com/terms/privacy | Personal-data and workspace-data handling context | Verified 2026-05-03 |
| ClickUp Terms | https://clickup.com/terms | Account, service, acceptable-use, and subscription legal context | Verified 2026-05-03 |
| ClickUp Pricing | https://clickup.com/pricing | Public entitlement and feature-gating signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Sign-in must support email/OAuth now and be SSO/SCIM-ready for managed workspaces.
- Workspace navigation must expose a tenant hierarchy with spaces/projects, folders/lists, task views, docs, dashboards, whiteboards, and settings.
- Tasks must include title, description, assignee(s), watchers, status, priority, due/start dates, reminders, subtasks, checklists, comments, attachments, custom fields, and activity history.
- List and board views must ship in V1; calendar, dashboard, and whiteboard views must be entitlement/screen-size aware with list fallback states.
- Docs must support rich text, nested pages, task links/embeds, comments, permissions, revision metadata, and conflict-safe mobile editing.
- Dashboards must render cards/widgets from permission-filtered task data and label stale/partial widgets.
- Whiteboards must support mobile-safe pan/zoom, sticky notes, shapes, connectors, text, images, comments, and viewport culling.
- Time tracking, reminders, recurring tasks, templates, and automations must be scoped as V1-lite or feature-flagged if exact native rules are unverified.
- AI-assisted features must be opt-in, permission-filtered, and clearly separated from deterministic task/doc behavior.
- Entitlements must gate dashboards, whiteboards, advanced custom fields, time tracking, AI assistance, SSO/admin, storage/usage limits, and automation volume server-side.
- Push payloads must use opaque IDs and fetch content only after unlock/session validation.
- Analytics must exclude raw task names, descriptions, docs, comments, attachments, whiteboard text, chat content, and customer identifiers.

## Core User Journeys

- User signs in, selects a workspace, opens home/inbox, and reviews assigned work.
- User browses hierarchy, opens a list, creates a task, sets status/priority/due date/assignee, adds a subtask and checklist, and completes it.
- User switches from list to board, drags a task to another status, and sees rollback if validation or permissions fail.
- User opens calendar view, reviews due work, and falls back to list if calendar is gated or screen-constrained.
- User creates a doc page, links a task, comments, shares it with a teammate, and resolves a conflict after offline editing.
- User opens a dashboard, filters widgets by list/status/assignee, and sees stale or permission-filtered cards labeled.
- User opens a whiteboard, adds sticky notes and connectors, comments on an element, and handles large-canvas performance limits.
- User receives a push mention, opens the item, replies, and changes notification preferences.
- Admin-managed user signs in via SSO and sees locked settings, audit logging, and entitlement-gated controls.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Workspace | Sign in and select tenant | email/OAuth/SSO, workspace | waiting, authenticated, selected | SSO failure, domain blocked |
| Home / Inbox | Pinned work and notifications | open, archive, filter | empty, unread, loaded | offline, permission revoked |
| Hierarchy Browser | Navigate workspace structure | workspace, space/project, folder/list | loaded, empty, syncing | hidden item, access denied |
| Task List View | Sectioned task work | add, filter, sort, complete | loaded, empty, optimistic | custom field changed, large list |
| Board View | Status workflow | drag, move, open task | loaded, empty, optimistic | move conflict, role denied |
| Calendar View | Date-based task review | month/week/day, open task | loaded, gated, fallback | timezone mismatch, overflow |
| Task Detail | Read/edit task | fields, comments, attachments | loaded, editing, syncing | deleted task, stale version |
| Doc Editor | Rich text and task embeds | edit, link, comment, share | drafting, saved, conflict | offline merge failed |
| Dashboard | Widget rollups | filter, refresh, open source | loaded, stale, partial | widget failed, gated |
| Whiteboard | Visual collaboration | pan/zoom, add, connect, comment | loaded, editing, culled | large board, conflict |
| Search | Find work | query, filters | results, empty | rate limited, permission filtered |
| Settings / Admin Notice | Account, notifications, policy | toggles, logout, cache | loaded, managed | admin locked, offline |

## Data Model

- `Workspace`: tenant, domain, entitlement, SSO policy, retention settings, admin configuration.
- `Member`: identity, role, teams, notification preferences, locale, managed flags.
- `Space`: workspace grouping, visibility, members, default views, archived state.
- `Folder`: space grouping, lists, permissions, order/rank.
- `List`: task container, statuses, custom fields, default views, automation flags.
- `Task`: title reference, description reference, status, priority, assignees, watchers, dates, rank, parent references.
- `Subtask`: parent task, inherited permissions, rank, completion state.
- `ChecklistItem`: task, label reference, assignee, completion state.
- `CustomField`: schema, type, allowed values, required state, workspace/list scope.
- `Comment`: task/doc/whiteboard anchor, author, body reference, mentions, edit/delete state.
- `Attachment`: object owner, file metadata, scan state, storage key, retention lifecycle.
- `Doc`: workspace/list context, pages, permissions, revision vector, task links.
- `Dashboard`: widgets, filters, source lists, owner, visibility, stale status.
- `WhiteboardElement`: board, shape/sticky/text/image/connector, bounds, style, version.
- `Reminder`: subject, trigger, delivery channel, snooze/completion state.
- `AuditEvent`: auth, permission, task, doc, dashboard, whiteboard, billing, export/delete, and admin changes.
- `Entitlement`: tier, seats, feature flags, usage counters, renewal/expiration, billing owner.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /workspaces`, `GET /workspaces/:id/context`, `GET /members/me`: tenant context.
- `GET /spaces`, `GET /folders?spaceId=`, `GET /lists?folderId=`: hierarchy.
- `GET /tasks?listId=&view=&cursor=`, `POST /tasks`, `GET /tasks/:id`, `PATCH /tasks/:id`, `DELETE /tasks/:id`: tasks.
- `POST /tasks/:id/subtasks`, `POST /tasks/:id/checklist-items`, `POST /tasks/:id/comments`, `POST /tasks/:id/attachments`: task collaboration.
- `GET /views/:listId/:kind`, `POST /views/:listId/move-task`: list/board/calendar operations.
- `GET /docs`, `POST /docs`, `GET /docs/:id`, `PATCH /docs/:id`, `POST /docs/:id/comments`: docs.
- `GET /dashboards`, `GET /dashboards/:id/widgets`, `PATCH /dashboards/:id/widgets/:widgetId`: dashboards.
- `GET /whiteboards/:id`, `POST /whiteboards/:id/elements`, `PATCH /whiteboards/:id/elements/:elementId`, `POST /whiteboards/:id/comments`: whiteboards.
- `GET /search?q=&type=&cursor=`, `GET /notifications`, `PATCH /notifications/:id`: discovery and inbox.
- `GET /entitlements`, `POST /billing/webhook`, `POST /data-export`, `DELETE /account`, `GET /audit-events`: billing/privacy/admin.

## Realtime, Push, And Offline Behavior

- Task, doc, dashboard, whiteboard, comment, and notification updates use WebSocket/SSE or polling with version cursors.
- Optimistic task edits and board moves include mutation IDs and rollback when permissions, custom-field validation, or stale versions fail.
- Docs use revision vectors or server-side merge with explicit conflict screens for rich-text edits.
- Whiteboards use CRDT/operation logs with viewport culling and server compaction for large boards.
- Offline mode supports cached hierarchy, recent lists, task/comment/doc drafts, and queued low-risk edits with server revalidation.
- Dashboard and calendar data can be cached as read-only snapshots and must label stale widgets or rollups.
- Push payloads use opaque IDs for assignments, mentions, due reminders, comments, doc shares, and whiteboard comments.

## Permissions, Privacy, And Safety

- Enforce workspace, space, folder, list, task, doc, dashboard, whiteboard, comment, attachment, and admin roles on every operation.
- SSO/SCIM-ready sessions must handle deprovisioning, seat limits, admin-managed settings, and cache purge.
- Analytics exclude raw task/doc/whiteboard/comment names, descriptions, attachment names/content, and customer identifiers.
- AI assistance can only use content the requesting user can access and must have tenant-level opt-out plus no-training guarantees in downstream implementation docs.
- Support diagnostics default to metadata; raw content inspection requires user/admin consent and audit logging.
- Attachments require signed uploads, malware scanning, size/type limits, retention controls, and deletion lifecycle.
- Abuse controls throttle comment spam, mention storms, automated task creation, whiteboard operation floods, search scraping, and attachment uploads.
- Export/delete workflows must account for workspace ownership, enterprise retention, legal hold-style restrictions, and third-party integration data.

## Analytics And Monetization

- Track privacy-safe events: workspace selected, task created/completed, view switched, board move, doc edited, dashboard opened, widget refreshed, whiteboard element added, comment added, search performed, offline queue flushed, entitlement gate hit.
- Event payloads use object types, counts, role class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers may gate dashboards, whiteboards, advanced views, time tracking, automations, AI features, SSO/SCIM, audit logs, storage, admin policy, and usage volume.
- Paywalls must identify blocked capability, current entitlement, billing owner/admin contact, restore path, and support path.

## Edge Cases

- Workspace hierarchy item is deleted while nested route is open.
- Custom field schema changes while task editor is open.
- Task belongs to multiple lists/views with conflicting status/rank state.
- Board move conflicts with role, automation, required field, or stale version.
- Large whiteboard exceeds mobile memory and needs viewport culling.
- Dashboard widget aggregates tasks from lists the user cannot access.
- Doc rich-text merge conflicts after offline editing.
- SSO session expires during attachment upload, doc save, or whiteboard sync.
- Entitlement downgrade hides dashboard/whiteboard/time-tracking while screen is open.
- Push arrives for content user can no longer access.
- Export/delete intersects with enterprise retention policy.
- AI summary/action request references content outside user permissions.

## Test Plan

- Unit tests for hierarchy resolution, task validation, custom-field coercion, optimistic mutations, permission checks, dashboard rollups, whiteboard operation validation, and entitlement gates.
- Contract tests for auth, workspace context, hierarchy, tasks, comments, attachments, docs, dashboards, whiteboards, notifications, search, billing, export/delete, and audit routes.
- Integration tests for home/inbox, task create/edit/complete, list/board/calendar views, doc edit/link/share, dashboard filter, whiteboard edit/comment, search, and logout.
- Realtime/offline tests for cached reads, task/comment/doc drafts, board moves, whiteboard operations, stale dashboards, conflict resolution, and cache purge.
- Enterprise tests for SSO expiry, SCIM deprovisioning, admin-locked settings, audit log, entitlement downgrade, and export/delete restrictions.
- Privacy/security tests for analytics redaction, push opacity, support diagnostics, attachment scanning, permission filtering, AI permission boundaries, and raw-content access controls.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and enterprise-managed states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, non-drag board controls, whiteboard alternatives, dashboard summaries, color contrast, reduced motion, and hardware keyboard.
- Manual verification tests: native offline behavior, push payloads, whiteboard performance, dashboard widgets, SSO/SCIM, billing purchase/restore, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without ClickUp brand assets, templates, AI prompts, private APIs, or customer data.
- Workspace hierarchy, tasks, list/board/calendar views, docs, dashboards, whiteboards, notifications, search, and settings have deterministic contracts and failure codes.
- Custom fields, permissions, entitlements, optimistic updates, and offline conflicts reconcile safely.
- Enterprise SSO/SCIM, audit, export/delete, admin-managed behavior, and AI permission boundaries are supported or explicitly feature-flagged.
- Analytics, push, support, cache, and logs avoid raw workspace content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which advanced views are V1 on phone versus tablet: calendar, dashboard, whiteboard, or limited fallbacks?
- Will chat, time tracking, AI assistance, and automations ship in V1 or as gated beta modules?
- Which SSO providers and SCIM workflows are needed first?
- What offline write scope is acceptable for enterprise tenants?
- Which realtime transport and conflict model will back docs and whiteboards?
- Which dashboard widget set is small enough for V1 without copying proprietary templates?

## Build Plan

- Phase 1: scaffold auth, workspace hierarchy, home/inbox, task list/detail/create/edit, comments, and privacy-safe analytics.
- Phase 2: add board/calendar views, subtasks, checklists, custom fields, attachments, reminders, and optimistic validation/rollback.
- Phase 3: add docs, dashboard widgets, whiteboard canvas, search, large-list/canvas virtualization, and share links.
- Phase 4: add realtime sync, offline cache/drafts/queue, push fanout, cache purge, and conflict handling.
- Phase 5: add SSO/SCIM-ready admin, entitlements, audit events, export/delete, support diagnostics, AI permission boundaries, and billing reconciliation.
- Phase 6: complete accessibility, security/privacy review, performance tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 scope for dashboards, whiteboards, time tracking, AI assistance, and automations.
- Create or link the downstream implementation repository when Phase 1 is ready.
