# Jira-Style Clone Spec

> Metadata
> - Inspiration app: Jira
> - Category: Issue tracking
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Atlassian Jira Software Cloud docs, mobile docs, admin/security docs, and public legal/privacy pages.
> - Manual verification blockers: native iOS/Android board ergonomics, enterprise SSO/SCIM, workflow validator behavior, push payloads, subscription/tier state, and accessibility passes still require a test account/device.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, JQL grammar/name, private APIs, and customer project data.

## Overview

Build an original agile project-management and issue-tracking app inspired by Jira's mobile workflows: project selection, boards, backlogs, issues, sprints, workflow transitions, comments, search/query, reports, notifications, and enterprise-ready permissions.

The clone must not copy Atlassian/Jira branding, screenshots, UI copy, proprietary query language names/grammar, private APIs, app-store media, or customer data. V1 can reproduce comparable workflows with original terminology and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Support mobile issue CRUD, board views, backlog grooming, sprint planning/start/complete, workflow transitions, comments, attachments, and search.
- Enforce project permissions, workflow validators, required fields, role schemes, and enterprise account boundaries.
- Provide SSO/SCIM-ready tenant architecture, audit logs, data residency awareness, and admin-managed policies.
- Support offline-safe reads/drafts and optimistic board moves with rollback when validators or permissions fail.
- Keep analytics, push, support, and logs free of raw issue/customer content by default.

## Non-Goals

- Do not imply Atlassian affiliation or copy Jira brand assets.
- Do not copy protected query language naming/grammar, workflow templates, UI copy, or pricing copy.
- Do not build a full marketplace, automation engine, custom workflow designer, or reporting warehouse in V1.
- Do not bypass permission schemes, data residency, SSO, or admin restrictions.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/jira-cloud-by-atlassian/id1006972087 | Official iOS listing, screenshots, privacy labels, mobile positioning | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.atlassian.android.jira.core | Official Android listing, data-safety summary, screenshots, feature positioning | Verified 2026-05-03 |
| Jira Software Cloud Support | https://support.atlassian.com/jira-software-cloud/ | Boards, backlogs, sprints, issues, reports, workflows, and project configuration | Verified 2026-05-03 |
| Jira Cloud Mobile Docs | https://support.atlassian.com/jira-software-cloud/docs/use-jira-cloud-mobile/ | Mobile usage, project/issue work, notifications, and app-specific behavior | Verified 2026-05-03 |
| Atlassian Admin Docs | https://support.atlassian.com/organization-administration/ | Organization, users, SSO, SCIM, audit log, and admin policy context | Verified 2026-05-03 |
| Atlassian Trust Center | https://www.atlassian.com/trust | Security, privacy, compliance, data residency, and enterprise posture | Verified 2026-05-03 |
| Atlassian Privacy Policy | https://www.atlassian.com/legal/privacy-policy | Data handling, account privacy, and user rights context | Verified 2026-05-03 |
| Atlassian Cloud Terms | https://www.atlassian.com/legal/cloud-terms-of-service | Account, paid service, acceptable-use, and cloud-service terms | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Tenant sign-in must support email/social auth and be SSO/SCIM-ready for managed organizations.
- Projects must expose type, key, permissions, issue types, fields, workflow, boards, components, versions, and role membership.
- Issues must support type, summary, description, status, priority, assignee, reporter, labels, components, sprint, estimate, custom fields, attachments, and comments.
- Board views must support scrum/kanban columns, swimlanes/filters where configured, drag-to-transition, and non-drag alternatives.
- Backlog must support issue ranking, sprint assignment, multi-select, and server-side pagination.
- Sprint lifecycle must support create/plan, start, active progress, complete, move incomplete work, and report summaries.
- Workflow transitions must call server-side validators and rollback optimistic UI when required fields, permissions, or rules fail.
- Search/query builder must avoid copying proprietary query grammar while supporting equivalent filters through original syntax/UI.
- Reports must include mobile-friendly burndown/velocity/status summaries with data-unavailable states.
- Permissions must filter reads and writes at tenant/project/issue/comment/attachment levels.
- Admin/audit surfaces must show role changes, workflow changes, SSO/SCIM events, exports, deletes, and billing/entitlement changes.
- Push notifications must use opaque IDs for mentions, assignments, transitions, due dates, and sprint events.
- Analytics must exclude raw issue summaries, descriptions, comments, attachment names/content, project names, and query text.

## Core User Journeys

- User signs in, selects a site/project, opens a board, and sees only permitted issues.
- User drags an issue across columns; the app validates transition rules and either commits or rolls back with a required-field prompt.
- User creates an issue with project-specific required fields, attaches a file, and confirms it appears in backlog/board.
- Scrum lead grooms backlog, ranks issues, moves selected items into a sprint, starts sprint, and completes it later.
- User opens issue detail from push, reads comments, replies, changes assignee, and transitions status.
- User filters a board by assignee/component/label and saves or reuses the filter where allowed.
- Admin user reviews audit events and sees SSO/SCIM status; non-admin sees access denied.
- User goes offline with cached project/board data, drafts a comment, reconnects, and handles permission/workflow changes.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Site Picker | Sign in and choose tenant | email/OAuth/SSO, site | waiting, authenticated, selected | SSO failed, site unavailable |
| Project Picker | Select project/board | project, board, filter | loaded, recent, empty | permission denied |
| Board | Scrum/kanban work | drag, transition, filter | loaded, empty, syncing | validator failed, large board |
| Backlog | Rank and plan work | reorder, multi-select, sprint | loaded, filtered | closed sprint, rank conflict |
| Sprint Planner | Create/start/complete sprint | dates, goal, move incomplete | planning, active, completing | capacity warning, permission denied |
| Issue Detail | Read/edit issue | fields, comments, transition | loaded, editing, optimistic | required field missing, locked |
| New Issue | Create project issue | issue type, fields, attachment | drafting, submitting | required field missing, invalid custom field |
| Search / Query Builder | Find work | filters, text, saved filter | results, empty | query invalid, permission filtered |
| Reports | Burndown/velocity/status | sprint/project filter | loaded, empty | data unavailable, too small screen |
| Admin / Audit | Enterprise controls | role, audit, SSO/SCIM | loaded, gated | non-admin, entitlement missing |
| Settings | Account, notifications, cache | toggles, logout | loaded, managed | admin locked, offline |
| Subscription | Entitlement state | plan, billing owner | free, paid, enterprise | webhook delay, admin-owned |

## Data Model

- `Tenant`: site, region, entitlement, SSO policy, data residency, admin settings.
- `User`: account, locale, tenant roles, project roles, notification preferences.
- `Project`: key, name reference, type, permission scheme, issue types, boards, components, versions.
- `IssueType`: project, required fields, screen scheme, workflow id, icon token replacement.
- `Issue`: key, type, summary reference, description reference, status, priority, assignee, reporter, labels, components, sprint, rank, estimates.
- `CustomField`: schema, allowed values, required rules, coercion behavior, project scope.
- `Workflow`: statuses, transitions, validators, post-functions-equivalent hooks, permission requirements.
- `Board`: project/team scope, columns, filters, swimlanes, ranking strategy.
- `Sprint`: board, goal, start/end, status, issue membership, completion summary.
- `Comment`: issue, author, body reference, mentions, edit/delete/visibility state.
- `Attachment`: issue, file metadata, scan state, storage key, deletion lifecycle.
- `SavedFilter`: owner, original query/filter model, visibility, favorite state.
- `AuditEvent`: auth, admin, project, workflow, permission, issue, sprint, export, and billing events.
- `Entitlement`: tier, seats, feature gates, renewal/expiration, admin billing owner.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /tenants`, `GET /projects`, `GET /projects/:id/config`: tenant/project context.
- `GET /boards?projectId=`, `GET /boards/:id`, `GET /boards/:id/issues?cursor=`: board reads.
- `GET /backlog?boardId=&cursor=`, `POST /backlog/move`, `POST /backlog/assign-to-sprint`: backlog operations.
- `GET /issues?filter=&cursor=`, `POST /issues`, `GET /issues/:id`, `PATCH /issues/:id`: issue CRUD.
- `POST /issues/:id/transition`, `POST /workflows/:id/validate-transition`: transition validation and commit.
- `POST /issues/:id/comments`, `GET /issues/:id/comments`, `POST /issues/:id/attachments`: collaboration.
- `GET /sprints?boardId=`, `POST /sprints`, `PATCH /sprints/:id`, `POST /sprints/:id/complete`: sprint lifecycle.
- `GET /search?filters=&cursor=`, `GET /saved-filters`, `POST /saved-filters`: original query/filter model.
- `GET /reports/burndown?sprintId=`, `GET /reports/velocity?boardId=`: mobile summaries.
- `GET /permissions/check`, `GET /audit-events`, `GET /entitlements`, `POST /billing/webhook`: admin and billing.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Board, issue, sprint, and comment updates use WebSocket/SSE or polling with version cursors and stale-state detection.
- Drag-to-transition is optimistic but must rollback when validators, required fields, permissions, or workflow state reject the move.
- Backlog ranking must use stable rank keys and reconcile concurrent moves.
- Offline supports cached boards/issues/reports, comment drafts, and issue drafts; writes recheck permissions/workflows on reconnect.
- Attachment uploads are resumable and cannot complete until malware/type checks pass.
- Push payloads use opaque IDs and fetch content after unlock/session validation.
- Large boards/backlogs must be virtualized and paginated; reports may require online recalculation.

## Permissions, Privacy, And Safety

- Enforce tenant, project, issue, comment, attachment, workflow, sprint, and admin permissions on every operation.
- SSO/SCIM deprovisioning must revoke sessions, clear private cache, and block queued writes.
- Data residency and region settings must constrain storage/processing locations where V1 supports them.
- Audit logs capture role changes, workflow/sprint/project changes, export/delete, SSO/SCIM, and billing events.
- Analytics exclude raw issue content, project names, attachment names/content, saved query text, and customer identifiers.
- Support tooling defaults to metadata; raw issue/comment/attachment inspection requires user/admin consent and audit logging.
- Abuse controls throttle comments, mentions, attachment uploads, search scraping, and repeated transition attempts.

## Analytics And Monetization

- Track privacy-safe events: project opened, board filtered, issue created/updated/transitioned, sprint started/completed, backlog moved, report opened, query run, validator failed, offline queue flushed, entitlement gate hit.
- Event payloads use object types, counts, permission class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers may gate advanced reports, SSO/SCIM, audit logs, data residency, automation, and admin controls.
- Paywalls must identify blocked capability, current entitlement, billing owner/admin path, and support contact.

## Edge Cases

- Workflow validator fails after optimistic board drag.
- Required custom field appears for one issue type but not another.
- Permission removed while issue editor is open.
- Sprint is completed while user is moving work into it.
- Concurrent backlog rank changes from multiple users.
- Very large project with 100k+ issues and many custom fields.
- Query/filter references a field deleted by admin.
- SSO session expires during transition or attachment upload.
- SCIM deprovisions user with queued offline writes.
- Data residency mismatch blocks attachment processing.
- Push arrives for issue user can no longer access.
- Report data is unavailable because sprint has too few completed points.

## Test Plan

- Unit tests for workflow validation, required-field logic, permission checks, rank reconciliation, custom-field coercion, sprint lifecycle, audit events, and entitlement gates.
- Contract tests for tenant/project config, board/backlog, issue CRUD, transitions, comments, attachments, sprints, search/filter, reports, permissions, audit, and billing.
- Integration tests for sign-in, project selection, board drag/rollback, issue create/edit/comment, backlog planning, sprint start/complete, reports, search, and logout.
- Offline tests for cached boards, drafts, queued comments, permission/workflow recheck, rank conflict, and cache purge.
- Enterprise tests for SSO expiry, SCIM deprovisioning, audit log, data residency, admin-managed settings, and entitlement downgrade.
- Privacy/security tests for analytics redaction, support diagnostics, attachment scanning, permission filtering, push opacity, and raw-content access controls.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, non-drag board controls, report alternatives, and hardware keyboard.
- Manual verification tests: native board/backlog ergonomics, SSO/SCIM, push payloads, subscription state, workflow validators, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Atlassian/Jira brand assets, private APIs, proprietary query grammar, or customer data.
- Boards, backlogs, sprints, issues, transitions, search, reports, and comments have deterministic contracts and failure codes.
- Workflow validators and permissions rollback optimistic UI safely.
- Enterprise SSO/SCIM, audit, entitlement, and data-residency behavior is supported or explicitly feature-flagged.
- Analytics, push, support, cache, and logs avoid raw customer work content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which project templates, issue types, and workflow complexity ship in V1?
- Will V1 include a custom workflow editor, or only consume configured workflows?
- Which identity providers, SCIM provider, and data-residency regions are required first?
- How much offline write capability is acceptable for enterprise tenants?
- What original query/filter syntax replaces proprietary query language behavior?
- Which reporting charts are necessary on phone versus tablet?

## Build Plan

- Phase 1: scaffold auth, tenant/project config, issue CRUD, comments, board/backlog reads, and privacy-safe analytics.
- Phase 2: add board transitions, workflow validation, permission checks, custom fields, attachments, and optimistic rollback.
- Phase 3: add sprint planner/lifecycle, reports, search/filter builder, saved filters, and large-list virtualization.
- Phase 4: add realtime/polling sync, offline cache/drafts/queue, rank reconciliation, push fanout, and cache purge.
- Phase 5: add SSO/SCIM-ready admin, audit events, entitlements, data residency controls, export/delete, and support diagnostics.
- Phase 6: complete accessibility, enterprise/security review, performance tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Define the original query/filter model, workflow-validator scope, and SSO/SCIM support level.
- Create or link the downstream implementation repository when Phase 1 is ready.
