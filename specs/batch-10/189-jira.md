# Jira-Style Clone Spec

> Metadata
> - Inspiration app: Jira
> - Category: Issue tracking
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Atlassian docs — pending exact URL verification.
> - Manual verification blockers: enterprise SSO/SCIM, workflow editor validation on device, subscription/tier, and accessibility passes still require a test account.
> - Legal scope: functional parity only; use original UI, original branding, and original API.

## Overview

Build an original mobile agile issue tracker inspired by Jira: scrum/kanban boards, backlogs, sprints, custom workflows, permissions, and enterprise admin.

The clone must not copy Jira branding, iconography, feature names (e.g. JQL, Epics in the trademarked sense), or private APIs.

## Goals

- Boards (scrum + kanban) with swimlanes and filters.
- Backlog grooming with drag-to-sprint.
- Sprint management: plan, start, complete, reports.
- Configurable workflows with validators and transitions.
- Enterprise features: SSO, SCIM, permission schemes, audit log.

## Non-Goals

- Do not imply Atlassian affiliation.
- Do not reuse JQL grammar as a trademark.
- Do not bypass permission schemes.
- Do not store customer data beyond permitted scopes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/jira-cloud-by-atlassian/id1006972087 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.atlassian.android.jira.core | Android listing, data safety | Source discovery — pending exact URL verification |
| Atlassian Docs | https://support.atlassian.com/jira-software-cloud/ | Boards, sprints, workflows | Source discovery — pending exact URL verification |
| Atlassian Security | https://www.atlassian.com/trust | SSO, SCIM | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Issues with types, priorities, statuses, assignees, components, sprints.
- Boards with columns mapped to statuses; drag-to-transition.
- Sprint planning and completion with velocity-style reports.
- Permission schemes applied per project.
- Admin audit log, SSO/SCIM.

## Core User Journeys

- User signs in via SSO, selects project, lands on board.
- User drags an issue from To Do to In Progress; transition rules validate.
- User plans a sprint from backlog via multi-select.
- User starts sprint, sees burndown chart, closes when complete.
- User creates issue with required fields per issue type.
- User receives push for mention; opens comment thread.
- User filters board by assignee and component.
- User requests data export; admin approves.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / SSO | Workspace + SSO sign-in | provider pick | waiting, authenticated | SSO failure |
| Board | Kanban/scrum view | drag, filter | loaded, empty | permission denied |
| Backlog | Groom and plan | drag to sprint | loaded, empty | sprint closed |
| Sprint Planner | Plan next sprint | select, estimate | drafting, committed | insufficient capacity |
| Issue Detail | Read/edit/transition | edit, comment, transition | loaded, editing | validator failed |
| New Issue | Create issue | type, fields | drafting, submitted | required field missing |
| Report | Burndown/velocity | filter | loaded, empty | data unavailable |
| Search / Query | Find issues | query builder | results, empty | permission filter |
| Settings | Account, notifications | toggles | loaded | admin-managed |
| Admin | Permissions, SSO, audit | view/edit | loaded | non-admin |

## Data Model

- `Workspace`, `Project`, `IssueType`, `Issue`, `Workflow`, `Transition`, `Validator`, `PermissionScheme`, `Role`, `Sprint`, `Board`, `Component`, `Comment`, `Attachment`, `AuditEvent`, `SSOConfig`, `Entitlement`.

## API And Backend Contracts

- `POST /auth/sso/:provider`, `DELETE /auth/session`.
- `GET /projects`, `GET /projects/:id/boards`.
- `GET /issues?query=`, `POST /issues`, `PATCH /issues/:id`, `POST /issues/:id/transition`.
- `GET /sprints?boardId=`, `POST /sprints`, `PATCH /sprints/:id` (start/complete).
- `GET /backlog?boardId=`, `POST /backlog/move`.
- `GET /workflows/:id`, `POST /workflows/:id/validate`.
- `GET /permissions`, `POST /permissions/check`.
- `GET /reports/burndown?sprintId=`.
- `GET /audit-events` (admin), `POST /scim/v2/Users` (admin).

## Realtime, Push, And Offline Behavior

- Board updates via WebSocket; optimistic drag with rollback on validator failure.
- Offline read of recent boards and issues; writes queued with permission recheck on reconnect.
- Push for mention, assignment, transition — payloads opaque.
- Attachment uploads resumable.

## Permissions, Privacy, And Safety

- Permission scheme checks on every write and read projection.
- SSO/SCIM for enterprise; SAML session bound to device.
- Audit log for admin actions.
- Data export and deletion scoped by tenant; Data Residency aware.
- Analytics exclude issue content; only event types and project IDs (hashed).
- Secrets redaction in attachments/comments (best-effort).

## Analytics And Monetization

- Events: issue created/transitioned, sprint started/completed, board filtered, push opened.
- Tiers mirrored from web (free, standard, premium, enterprise); original naming.
- Paywall surfaces blocked feature (e.g. advanced roadmaps).

## Edge Cases

- Workflow validator fails mid-transition; UI must revert.
- Concurrent sprint edits by two scrum masters.
- Very large project with 100k+ issues — server-side filtering mandatory.
- Data residency region mismatch.
- SSO session expiry mid-operation.
- Permission removed while user is editing.

## Test Plan

- Unit tests for transition validation, permission checks, optimistic rollback.
- Contract tests for all API routes, including SCIM.
- Integration tests for board drag, sprint lifecycle, report generation.
- SSO/SCIM tests for provision/deprovision.
- Offline tests for queued writes and permission recheck.
- Accessibility tests for board drag alternative (non-drag controls).
- Manual verification: real SSO flow, push behavior, large-project pagination.

## Acceptance Criteria

- Source URLs verified.
- Board + backlog + sprint + transitions operate under permission schemes.
- SSO/SCIM supported (or explicitly deferred).
- Audit log present.
- Manual blockers feature-flagged.

## Open Questions

- Which identity providers in V1 (Okta, Azure AD, Google)?
- Data residency regions in V1?
- Custom field editor in V1?
- Mobile offline editing scope?

## Build Plan

- Phase 1: auth + project + issue CRUD.
- Phase 2: boards + transitions + permissions.
- Phase 3: backlog + sprint planner + reports.
- Phase 4: SSO/SCIM + audit log.
- Phase 5: offline + push.
- Phase 6: accessibility + data residency + manual verification.

## Next Steps

- Verify source URLs.
- Pick identity providers and SCIM contract.
- Define permission-scheme model.
