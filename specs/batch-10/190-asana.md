# Asana-Style Clone Spec

> Metadata
> - Inspiration app: Asana
> - Category: Project management
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, help center — pending exact URL verification.
> - Manual verification blockers: native iOS/Android offline behavior, SSO, calendar/timeline rendering, subscription purchase/restore, and accessibility passes still require a test account.
> - Legal scope: functional parity only; use original UI, branding, and API.

## Overview

Build an original mobile project management app inspired by Asana: tasks, projects, timelines, goals, portfolios, and team workflows.

The clone must not copy Asana branding, iconography, feature names, or private APIs.

## Goals

- Tasks and subtasks with due dates, assignees, dependencies, and custom fields.
- Multiple views: list, board, timeline, calendar.
- Goals tied to projects and updates.
- Portfolio-level status reporting.
- Team workspaces with roles.

## Non-Goals

- Do not imply Asana affiliation.
- Do not copy workflow rules or automations by name.
- Do not bypass permissions.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/asana-work-in-one-place/id489849007 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.asana.app | Android listing, data safety | Source discovery — pending exact URL verification |
| Asana Guide | https://asana.com/guide | Tasks, projects, timelines, goals | Source discovery — pending exact URL verification |
| Asana Security | https://asana.com/terms | Data handling, SSO | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Tasks have title, description, assignee, due date, status, tags, custom fields.
- Projects have default views and sections.
- Timelines render dependencies and durations.
- Goals link to projects and report progress.
- SSO for enterprise tiers.

## Core User Journeys

- User signs in, picks workspace, lands on My Tasks.
- User creates a task, assigns self, sets due date.
- User opens project, switches between list/board/timeline views.
- User creates a milestone and dependency between two tasks.
- User updates a goal's progress and posts an update.
- User views portfolio status roll-up.
- User receives push for due-today reminder.
- User exports project data or deletes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / SSO | Workspace sign-in | provider pick | waiting, authenticated | SSO failure |
| My Tasks | Personal task list | filter, act | empty, items | offline |
| Project | Multi-view project | list/board/timeline | loaded, empty | view unsupported on phone |
| Task Detail | Read/edit task | edit, comment, assign | loaded, editing | permission denied |
| Timeline | Dependencies | pan, zoom | loaded, empty | overflow on small screen |
| Goal | Track progress | update | loaded, empty | access revoked |
| Portfolio | Status roll-up | filter | loaded, empty | aggregation failed |
| Inbox | Notifications | triage | empty, items | rate limited |
| Settings | Account, notifications | toggles | loaded | admin-managed |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |

## Data Model

- `Workspace`, `User`, `Team`, `Project`, `Section`, `Task` (with dependencies), `CustomField`, `Goal`, `Portfolio`, `Comment`, `Attachment`, `Update`, `NotificationPreference`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/sso/:provider`, `DELETE /auth/session`.
- `GET /tasks?filter=`, `POST /tasks`, `PATCH /tasks/:id`, `POST /tasks/:id/subtasks`, `POST /tasks/:id/dependencies`.
- `GET /projects`, `POST /projects`, `GET /projects/:id/timeline`.
- `GET /goals`, `POST /goals/:id/update`.
- `GET /portfolios/:id/status`.
- `GET /inbox`, `POST /inbox/:id/read`.
- `GET /entitlements`, `POST /billing/webhook`.
- `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Realtime via WebSocket for task state changes.
- Offline read and draft edits; conflict resolution on reconnect.
- Push for due-today, assigned-to-you, mentioned — opaque payloads.
- Timeline view may require online due to complexity.

## Permissions, Privacy, And Safety

- Role-based permissions per project.
- SSO; session tied to device.
- Audit log for workspace admins.
- Export + delete available.
- Analytics exclude task titles; only event types.

## Analytics And Monetization

- Events: task created/completed, view switched, goal updated, portfolio opened.
- Tiers original; paywall identifies blocked feature (timeline, portfolios).

## Edge Cases

- Dependency cycle attempted.
- Task deleted while user is editing.
- Timeline with 1000+ tasks on phone.
- Custom field type changed by admin.
- Offline edit with permission revoked on reconnect.

## Test Plan

- Unit tests for dependency validation, custom field coercion, offline merge.
- Contract tests for APIs.
- Integration tests for view switching, goals, portfolios.
- SSO tests.
- Accessibility tests for timeline alternatives.
- Billing tests for tiers.
- Manual verification: SSO, push, large projects on device.

## Acceptance Criteria

- Source URLs verified.
- Core task + project + multi-view flows complete.
- Goals and portfolios present.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- Timeline rendering library?
- Enterprise SSO in V1?
- Automation rules in V1 or later?
- Cross-workspace search?

## Build Plan

- Phase 1: auth + My Tasks + task detail.
- Phase 2: projects + list/board views.
- Phase 3: timeline + dependencies.
- Phase 4: goals + portfolios.
- Phase 5: SSO + entitlements.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Choose realtime transport and timeline library.
- Define role matrix.
