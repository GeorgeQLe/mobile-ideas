# ClickUp-Style Clone Spec

> Metadata
> - Inspiration app: ClickUp
> - Category: Project management
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, help docs — pending exact URL verification.
> - Manual verification blockers: multi-view performance on device, dashboards, SSO, subscription, and accessibility still require a test account.
> - Legal scope: functional parity only; use original UI, branding, and API.

## Overview

Build an original mobile productivity platform inspired by ClickUp: docs, tasks, whiteboards, dashboards, and customizable views in a single app.

The clone must not copy ClickUp branding, iconography, feature names, or private APIs.

## Goals

- Unified workspace with docs, tasks, and boards.
- Customizable views (list, board, calendar, gantt).
- Dashboards with widgets for task stats.
- Whiteboards for lightweight collaboration.
- Team hierarchy: workspace -> space -> folder -> list.

## Non-Goals

- Do not imply ClickUp affiliation.
- Do not copy hierarchy naming or named features verbatim.
- Do not bypass permissions.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/clickup-easy-task-management/id1323101619 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.clickup.app | Android listing, data safety | Source discovery — pending exact URL verification |
| ClickUp Help | https://help.clickup.com/ | Views, docs, whiteboards, dashboards | Source discovery — pending exact URL verification |
| ClickUp Security | https://clickup.com/security | SSO, data handling | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Hierarchy: workspace -> space -> folder -> list -> task.
- Tasks with multi-assignees, custom statuses, subtasks.
- Docs with rich text, nested pages, task embeds.
- Dashboards with widgets.
- Whiteboards with shapes, sticky notes, connections.

## Core User Journeys

- User signs in, picks workspace, browses spaces.
- User opens a list view, switches to board, then calendar.
- User creates a doc, adds task embeds, shares link.
- User opens a dashboard, views widgets, adjusts filters.
- User opens a whiteboard, drops a sticky note, connects shapes.
- User receives push for task due date.
- User upgrades tier for more views.
- User exports data or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / SSO | Sign in | provider pick | waiting, authenticated | SSO failure |
| Home | Pinned items, inbox | act, open | empty, items | offline |
| Hierarchy Browser | Spaces/folders/lists | navigate | loaded, empty | permission denied |
| List View | Tasks in a list | filter, act | loaded, empty | too many items |
| Board View | Kanban | drag | loaded, empty | column limit |
| Calendar View | Tasks by date | navigate | loaded, empty | date conflict |
| Gantt View | Time-sequenced | pan/zoom | loaded, empty | perf limit |
| Doc Editor | Rich text + embeds | edit, paste | drafting, saved | conflict |
| Dashboard | Widgets | filter | loaded, empty | widget failed |
| Whiteboard | Shapes/stickies | add, connect | loaded, empty | offline editing |
| Settings | Account, notifications | toggles | loaded | admin-managed |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |

## Data Model

- `Workspace`, `Space`, `Folder`, `List`, `Task`, `Subtask`, `CustomStatus`, `Doc`, `DocPage`, `Dashboard`, `Widget`, `Whiteboard`, `Shape`, `Sticky`, `Connection`, `View`, `Role`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/sso/:provider`, `DELETE /auth/session`.
- `GET /workspaces`, `GET /spaces?workspaceId=`.
- `GET /lists/:id/tasks?view=`, `POST /tasks`, `PATCH /tasks/:id`.
- `GET /docs`, `POST /docs`, `PATCH /docs/:id`, `POST /docs/:id/pages`.
- `GET /dashboards`, `POST /dashboards`, `PATCH /widgets/:id`.
- `GET /whiteboards/:id`, `POST /whiteboards/:id/shapes`.
- `GET /views`, `POST /views` (saved view configs).
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Realtime via WebSocket for tasks and docs.
- Offline read for recent lists and docs; writes queued.
- Push for mentions, assigned, due dates — opaque.
- Whiteboard realtime may require online.

## Permissions, Privacy, And Safety

- Role + ACL at each hierarchy level.
- SSO for enterprise.
- Audit log for admin actions.
- Data export + delete per workspace.
- Analytics exclude content; only event types.

## Analytics And Monetization

- Events: view switched, task created, doc edited, widget added, whiteboard edited.
- Tiers original; paywall identifies blocked view/feature.

## Edge Cases

- View incompatible with phone size (Gantt on small screen).
- Doc concurrent edit conflict.
- Whiteboard large canvas on low-memory device.
- Workspace hierarchy depth limits.
- Offline whiteboard edits discarded if server disallows.

## Test Plan

- Unit tests for view switching, ACL checks, offline merge.
- Contract tests for APIs.
- Integration tests for each view type and doc embed.
- Whiteboard perf tests.
- SSO tests.
- Accessibility tests for complex views with alternatives.
- Billing tests.
- Manual verification: multi-view on device, realtime, SSO.

## Acceptance Criteria

- Source URLs verified.
- Hierarchy + views + docs + dashboards + whiteboard flows complete.
- SSO and roles supported.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- Whiteboard rendering engine (native, WebGL, HTML canvas)?
- Which views launch-blocking vs fast-follow?
- SSO in V1?
- Doc import formats?

## Build Plan

- Phase 1: auth + hierarchy + list view + tasks.
- Phase 2: board + calendar + gantt views.
- Phase 3: docs + embeds.
- Phase 4: dashboards + widgets.
- Phase 5: whiteboards.
- Phase 6: SSO + accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Choose realtime transport and whiteboard engine.
- Define role and ACL model.
