# Asana-Style Clone Spec

> Metadata
> - Inspiration app: Asana
> - Category: Project management
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Asana Help/Guide pages, product/security/privacy pages, and public terms.
> - Manual verification blockers: native iOS/Android offline behavior, timeline/calendar rendering, SSO/SCIM, push payloads, subscription purchase/restore, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, templates, automation rules, private APIs, and customer workspace data.

## Overview

Build an original mobile work-management app inspired by Asana's mobile workflows: My Tasks, projects, task details, subtasks, list/board/timeline/calendar views, goals, portfolios, inbox notifications, comments, attachments, workspace/team permissions, and entitlement-aware collaboration.

The clone must not copy Asana branding, screenshots, UI copy, icons, templates, automation recipes, private APIs, or customer data. V1 can reproduce comparable jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support personal task management, task creation/editing, subtasks, due dates, assignees, dependencies, comments, attachments, and completion.
- Support projects with list, board, timeline, and calendar views where screen size and entitlement allow.
- Support goals, portfolios, status updates, inbox triage, search, workspace/team switching, and notification settings.
- Enforce workspace/project roles, enterprise SSO-ready sessions, audit events, export/delete, and subscription/seat gates.
- Preserve privacy by excluding raw task/project content from analytics, push payloads, logs, and support diagnostics by default.

## Non-Goals

- Do not imply Asana affiliation or copy Asana brand assets.
- Do not copy protected templates, workflow-rule recipes, pricing copy, screenshots, icons, or private APIs.
- Do not build a full automation builder, external app marketplace, or enterprise admin console in V1.
- Do not bypass permissions, SSO, workspace policy, or data retention restrictions.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/asana-work-in-one-place/id489849007 | Official iOS listing, screenshots, privacy labels, mobile positioning, in-app purchase signals | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.asana.app | Official Android listing, data-safety summary, screenshots, feature positioning | Verified 2026-05-03 |
| Asana Help Center | https://help.asana.com/ | Tasks, projects, My Tasks, inbox, goals, portfolios, views, permissions, and mobile help structure | Verified 2026-05-03 |
| Asana Guide | https://asana.com/guide | Public workflow concepts, work-management taxonomy, projects, goals, and collaboration guidance | Verified 2026-05-03 |
| Asana Product Security | https://asana.com/security | Security posture, enterprise controls, compliance, encryption, and admin expectations | Verified 2026-05-03 |
| Asana Privacy Statement | https://asana.com/terms#privacy-policy | Personal-data and workspace-data handling context | Verified 2026-05-03 |
| Asana Terms of Service | https://asana.com/terms | Account, acceptable-use, service, and paid-plan legal context | Verified 2026-05-03 |
| Asana Pricing | https://asana.com/pricing | Public entitlement and feature-gating signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Sign-in must support email/OAuth now and be SSO/SCIM-ready for managed domains/workspaces.
- My Tasks must aggregate assigned work with sections, due dates, completion state, priority-like metadata, and filters.
- Tasks must include title, description, assignee, due/start dates, completion, project membership, section, tags, custom fields, dependencies, subtasks, comments, attachments, and followers.
- Projects must support list and board views in V1; timeline and calendar must be entitlement/screen-size aware and provide fallback list states.
- Dependencies must prevent cycles and surface blocked/ready states.
- Goals must link to projects/tasks, expose progress, owner, status, updates, and access rules.
- Portfolios must roll up project status, owner, timeline, and risk indicators where entitlement and permissions allow.
- Inbox must show assignments, mentions, comments, due reminders, status updates, and project/goal changes with triage actions.
- Search must cover tasks, projects, goals, portfolios, and people using permission-filtered results.
- Custom fields must validate type, allowed values, required state, and admin changes.
- Entitlements must gate timeline, portfolios, goals, advanced custom fields, SSO/admin features, and high-volume usage server-side.
- Push payloads must use opaque IDs and fetch content only after unlock/session validation.
- Analytics must exclude raw task names, descriptions, comments, project/goal names, attachment names/content, and customer identifiers.

## Core User Journeys

- New user signs in, selects a workspace, lands on My Tasks, and completes or reschedules assigned work.
- User creates a task, adds description, due date, assignee, project/section, subtasks, dependency, custom field, and attachment.
- User opens a project, switches between list and board views, moves a task to another section, and sees realtime updates.
- User opens timeline, reviews dependency conflicts, and uses a list fallback if timeline is unavailable on phone or entitlement.
- User receives an inbox notification for a mention, opens the task, comments, and archives the inbox item.
- User updates a goal, posts a status update, and sees related project progress reflected.
- Manager opens portfolio, checks project risk/status, filters by owner, and sees permission-filtered rows.
- User goes offline, edits a draft task/comment, reconnects, and resolves conflicts caused by admin field changes.
- Admin-managed user signs in via SSO and sees locked settings or entitlement-gated surfaces.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Workspace | Sign in and select workspace | email/OAuth/SSO, workspace | waiting, authenticated, selected | SSO failure, domain blocked |
| My Tasks | Personal task list | filter, complete, reschedule | empty, today, upcoming, overdue | offline, permission revoked |
| Project List View | Sectioned project work | add, move, filter, sort | loaded, empty, syncing | large project, stale section |
| Project Board View | Column workflow | drag, move, open | loaded, empty, optimistic | move conflict, permission denied |
| Timeline View | Dependencies and dates | pan, zoom, dependency edit | loaded, gated, fallback | cycle, small screen, overflow |
| Calendar View | Date-based work | month/week, open task | loaded, empty | too many tasks, entitlement gated |
| Task Detail | Read/edit task | fields, subtasks, comments | loaded, editing, optimistic | deleted task, custom field changed |
| New Task | Capture work | title, assignee, due date | drafting, submitted | required field missing, duplicate |
| Goal Detail | Track outcomes | status update, link project | on-track, at-risk, complete | access revoked, stale rollup |
| Portfolio | Cross-project status | filter, open project | loaded, grouped, gated | aggregation failed, permission filtered |
| Inbox | Notifications | archive, open, filter | empty, unread, archived | rate limited, revoked access |
| Settings/Admin Notice | Account and policy | toggles, logout, cache | loaded, managed | admin locked, offline |

## Data Model

- `Workspace`: tenant, domain, entitlement, SSO policy, retention settings, admin configuration.
- `User`: identity, workspace role, team memberships, notification preferences, locale, managed flags.
- `Team`: workspace grouping, members, project permissions, default settings.
- `Project`: owner, team, visibility, views, sections, custom fields, status, archived state.
- `Section`: project, order/rank, task membership rules, archived state.
- `Task`: title reference, description reference, assignee, due/start dates, completion, section, rank, tags, followers.
- `Subtask`: parent task, task fields, rank, completion state.
- `Dependency`: predecessor, successor, blocked/ready state, cycle-prevention metadata.
- `CustomField`: schema, type, allowed values, required state, project/workspace scope.
- `Comment`: task/project/goal, author, body reference, mentions, edit/delete state.
- `Attachment`: task/comment, file metadata, scan state, storage key, deletion lifecycle.
- `Goal`: owner, status, metric/progress, linked projects/tasks, updates, visibility.
- `Portfolio`: projects, owner, status rollup, filters, entitlement gate.
- `InboxItem`: reason, subject, read/archive state, notification timestamp.
- `AuditEvent`: auth, permission, task, project, goal, portfolio, billing, export, delete, and admin changes.
- `Entitlement`: tier, seats, renewal/expiration, feature flags, billing owner.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /workspaces`, `GET /teams`, `GET /users/me`: workspace context.
- `GET /my-tasks?filter=&cursor=`, `GET /tasks?filter=&cursor=`, `POST /tasks`, `GET /tasks/:id`, `PATCH /tasks/:id`, `DELETE /tasks/:id`: task workflows.
- `POST /tasks/:id/subtasks`, `POST /tasks/:id/dependencies`, `DELETE /dependencies/:id`: subtasks/dependencies.
- `POST /tasks/:id/comments`, `GET /tasks/:id/comments`, `POST /tasks/:id/attachments`: collaboration.
- `GET /projects`, `POST /projects`, `GET /projects/:id`, `PATCH /projects/:id`, `GET /projects/:id/tasks`: projects.
- `GET /projects/:id/timeline`, `GET /projects/:id/calendar`, `POST /projects/:id/sections/move-task`: views and moves.
- `GET /goals`, `GET /goals/:id`, `POST /goals/:id/updates`, `POST /goals/:id/links`: goals.
- `GET /portfolios`, `GET /portfolios/:id/status`: portfolio rollups.
- `GET /inbox`, `PATCH /inbox/:id`, `POST /inbox/bulk`: notification triage.
- `GET /search?q=&type=&cursor=`, `GET /entitlements`, `POST /billing/webhook`: search and gates.
- `POST /data-export`, `DELETE /account`, `GET /audit-events`: privacy/admin workflows.

## Realtime, Push, And Offline Behavior

- Task, project, comment, goal, portfolio, and inbox updates use WebSocket/SSE or polling with version cursors.
- Optimistic moves/completions/field edits must include mutation IDs and rollback when permissions, custom-field validation, or dependency rules fail.
- Offline mode supports cached My Tasks/projects, task/comment drafts, and queued low-risk edits with server revalidation.
- Timeline/calendar data can be cached as read-only snapshots and should label stale rollups.
- Attachment uploads are resumable and cannot attach until size/type/malware checks pass.
- Push payloads use opaque IDs for assignments, due reminders, mentions, comments, status updates, and goal changes.

## Permissions, Privacy, And Safety

- Enforce workspace, team, project, task, goal, portfolio, comment, attachment, and admin roles on every operation.
- SSO/SCIM-ready sessions must handle deprovisioning, seat limits, admin-managed settings, and cache purge.
- Analytics exclude raw task/project/goal names, descriptions, comments, attachment names/content, and customer identifiers.
- Support diagnostics default to metadata; raw content inspection requires user/admin consent and audit logging.
- Attachments require signed uploads, malware scanning, size/type limits, retention controls, and deletion lifecycle.
- Abuse controls throttle comment spam, mention storms, automated task creation, search scraping, and attachment uploads.
- Export/delete workflows must account for workspace ownership, enterprise retention, and legal hold-style admin restrictions where applicable.

## Analytics And Monetization

- Track privacy-safe events: workspace selected, task created/completed, due date changed, project opened, view switched, board move, timeline opened, goal updated, portfolio opened, inbox archived, search performed, offline queue flushed, entitlement gate hit.
- Event payloads use object types, counts, role class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers may gate timeline, goals, portfolios, custom fields, SSO/SCIM, audit logs, admin policy, and advanced reporting.
- Paywalls must identify blocked capability, current entitlement, billing owner/admin contact, restore path, and support path.

## Edge Cases

- Dependency cycle attempted or dependency target deleted.
- Custom field type/allowed values changed while task editor is open.
- Task belongs to multiple projects with conflicting section/view state.
- Project section deleted while user is moving a task.
- Timeline has 1,000+ tasks or too many overlapping dependencies on phone.
- Portfolio includes projects user cannot access.
- Goal progress rollup is stale because linked project sync is delayed.
- Offline queued edit conflicts with permission revocation or task deletion.
- SSO session expires during attachment upload or comment submit.
- Entitlement downgrade hides timeline/portfolio while screen is open.
- Push arrives for content user can no longer access.
- Data export/delete intersects with enterprise retention policy.

## Test Plan

- Unit tests for task validation, dependency cycle prevention, custom-field coercion, optimistic mutations, permission checks, portfolio rollups, and entitlement gates.
- Contract tests for auth, workspace context, tasks, subtasks, dependencies, comments, attachments, projects, timeline/calendar, goals, portfolios, inbox, search, billing, export, delete, and audit routes.
- Integration tests for My Tasks, task create/edit/complete, project list/board moves, timeline fallback, goal update, portfolio status, inbox triage, search, and logout.
- Offline tests for cached reads, task/comment drafts, queued edits, stale timeline snapshots, conflict resolution, and cache purge.
- Enterprise tests for SSO expiry, SCIM deprovisioning, admin-locked settings, audit log, entitlement downgrade, and export/delete restrictions.
- Privacy/security tests for analytics redaction, push opacity, support diagnostics, attachment scanning, permission filtering, and raw-content access controls.
- Billing tests for free, trial, paid, expired, canceled, refunded, restored, web-owned, app-store-owned, and enterprise-managed states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, non-drag board controls, timeline alternatives, color contrast, reduced motion, and hardware keyboard.
- Manual verification tests: native offline behavior, timeline/calendar rendering, SSO/SCIM, push payloads, subscription purchase/restore, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Asana brand assets, templates, private APIs, automation recipes, or customer data.
- My Tasks, task detail, projects, list/board views, timeline/calendar fallbacks, goals, portfolios, inbox, and search have deterministic contracts and failure codes.
- Dependencies, custom fields, permissions, entitlements, and optimistic updates reconcile safely.
- Enterprise SSO/SCIM, audit, export/delete, and admin-managed behavior are supported or explicitly feature-flagged.
- Analytics, push, support, cache, and logs avoid raw workspace content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which project views are V1 on phone versus tablet: list, board, timeline, calendar, or limited fallbacks?
- Will goals and portfolios ship in V1 or be entitlement-gated beta modules?
- Which SSO providers and SCIM workflows are needed first?
- What offline write scope is acceptable for enterprise tenants?
- Which realtime transport and conflict model will back multi-view task updates?
- Are automation rules and forms deferred entirely or exposed as read-only metadata?

## Build Plan

- Phase 1: scaffold auth, workspace/team context, My Tasks, task detail/create/edit, comments, projects list view, and privacy-safe analytics.
- Phase 2: add board view, sections, dependencies, subtasks, custom fields, attachments, and optimistic validation/rollback.
- Phase 3: add timeline/calendar views with fallbacks, goals, portfolios, search, inbox, and large-list virtualization.
- Phase 4: add realtime sync, offline cache/drafts/queue, push fanout, cache purge, and conflict handling.
- Phase 5: add SSO/SCIM-ready admin, entitlements, audit events, export/delete, support diagnostics, and billing reconciliation.
- Phase 6: complete accessibility, security/privacy review, performance tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 scope for timeline/goals/portfolios and choose realtime/offline architecture.
- Create or link the downstream implementation repository when Phase 1 is ready.
