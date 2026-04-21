# Linear-Style Clone Spec

> Metadata
> - Inspiration app: Linear
> - Category: Issue tracking
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, help center, and product pages — pending exact URL verification.
> - Manual verification blockers: native iOS/Android command-menu ergonomics, realtime sync performance, SSO flows, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, sync engine, and API.

## Overview

Build an original mobile issue tracker inspired by keyboard-forward, fast, sync-first UX: issues, cycles, projects, roadmaps, triage inbox.

The clone must not copy Linear branding, iconography, feature names, private APIs, or UI copy.

## Goals

- Fast issue creation and triage on mobile.
- Cycles and projects with status roll-ups.
- Realtime sync with optimistic updates.
- Keyboard-first shortcut palette (on iPad/hardware keyboards).
- SSO and org-level permissions.

## Non-Goals

- Do not imply Linear affiliation.
- Do not claim identical sync-engine behavior.
- Do not store external systems' data beyond permitted scopes.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/linear-plan-build-products/id1531231142 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=app.linear.android | Android listing, data safety | Source discovery — pending exact URL verification |
| Linear Help | https://linear.app/docs | Issues, cycles, projects, triage | Source discovery — pending exact URL verification |
| Linear Security | https://linear.app/security | SSO, data handling | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Issues with states, priorities, estimates, assignees, labels.
- Cycles and projects as time-boxed and cross-cycle groupings.
- Realtime collaboration on issue state.
- Triage inbox for unassigned or newly created issues.
- SSO for teams; audit log for admin actions.

## Core User Journeys

- User signs in via SSO, picks a workspace, lands on their inbox.
- User triages an issue, assigns it, sets priority and cycle.
- User creates a new issue with title, description, labels.
- User opens current cycle, reorders issues, moves status.
- User searches issues by title or ID, navigates results.
- User opens a project, sees progress, edits milestones.
- User switches workspace and sees filtered data.
- User receives push for mention; opens and replies.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / SSO | Workspace + SSO sign-in | provider pick | waiting, authenticated | SSO failure |
| Inbox | Personal triage | read, act | empty, items | offline |
| Cycle View | Current cycle issues | move, filter | loaded, empty | locked cycle |
| Issue Detail | Read/edit issue | edit, comment, assign | loaded, editing | permission denied |
| New Issue | Create issue | title, body, labels | drafting, submitted | required field missing |
| Project View | Project roadmap | scroll, filter | loaded, empty | access revoked |
| Search | Find issues | query | results, empty | stale index |
| Workspace Switcher | Change workspace | select | loaded | access revoked |
| Settings | Account, notifications, keyboard shortcuts | toggles | loaded | admin-managed |
| Support | Help and feedback | form | submitted | unavailable |

## Data Model

- `Workspace`, `Member`, `Team`, `Issue` (state, priority, estimate, cycle, project, labels), `Cycle`, `Project`, `Milestone`, `Label`, `Comment`, `AuditEvent`, `NotificationPreference`, `Entitlement`.

## API And Backend Contracts

- `POST /auth/sso/:provider`, `DELETE /auth/session`.
- `GET /workspaces`, `GET /workspaces/:id/members`.
- `GET /issues?filter=`, `POST /issues`, `PATCH /issues/:id`, `DELETE /issues/:id`.
- `GET /cycles?teamId=`, `POST /cycles/:id/move-issue`.
- `GET /projects`, `POST /projects`, `PATCH /projects/:id`, `POST /projects/:id/milestones`.
- `POST /comments`, `GET /issues/:id/comments`.
- `GET /inbox`, `POST /inbox/:id/mark`.
- `GET /search?q=`.
- `GET /audit-events` (admin).
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Realtime updates via WebSocket; optimistic client writes with reconciliation.
- Conflict resolution: last-writer-wins for simple fields, list merging for ordered collections with CRDT-style keys.
- Offline queue for edits; flushes with dedup keys on reconnect.
- Push for assignments, mentions, cycle transitions; payloads opaque.

## Permissions, Privacy, And Safety

- Scope-limited OAuth/SSO tokens; workspace-level role enforcement.
- Audit log for admin actions (role changes, deletes).
- Data export and deletion available for owners.
- Analytics exclude issue content; only event types.
- Rate limits and anti-abuse for public API.

## Analytics And Monetization

- Events: issue created/updated, cycle moved, inbox triaged, mention received, search performed.
- Free tier + paid tiers mirrored via billing webhook; original names.
- Paywall identifies blocked feature (e.g. advanced cycles).

## Edge Cases

- Offline edit followed by server-side deletion of issue.
- Cycle overlaps at boundary moves.
- SSO session expired mid-operation.
- Large workspace with 10k+ issues — pagination and virtualized lists.
- Concurrent label edits by two users.
- Role demotion while in editing flow.

## Test Plan

- Unit tests for optimistic updates, reconciliation, conflict resolution.
- Contract tests for all API routes.
- Integration tests for triage, create, cycle move, search.
- SSO tests including expiry and re-auth.
- Offline tests for edit queue and conflicts.
- Accessibility tests for dynamic type, VoiceOver, focus order on iPad.
- Manual verification: realtime sync across devices, push behavior, SSO on device.

## Acceptance Criteria

- Source URLs verified.
- Core issue CRUD + cycle + project flows complete.
- Realtime sync robust to network changes.
- SSO and audit log supported.
- Manual blockers feature-flagged.

## Open Questions

- Which realtime transport (custom WS, Pusher-like, Supabase)?
- CRDT library or custom?
- Enterprise SSO in V1?
- Public API exposed via app?

## Build Plan

- Phase 1: auth + inbox + issue CRUD.
- Phase 2: cycles + projects.
- Phase 3: realtime sync + offline queue.
- Phase 4: search + command menu (iPad keyboard).
- Phase 5: SSO + audit log + billing.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Select realtime transport and conflict-resolution model.
- Define role matrix and audit scope.
