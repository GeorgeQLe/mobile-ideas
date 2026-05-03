# Linear-Style Clone Spec

> Metadata
> - Inspiration app: Linear
> - Category: Issue tracking
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, Linear docs, API docs, security/privacy pages, and public product pages.
> - Manual verification blockers: native mobile command-menu ergonomics, realtime sync latency, push payloads, SSO/SCIM, subscription state, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, sync engine, API keys, and customer workspace data.

## Overview

Build an original mobile issue-tracking client inspired by Linear's workflow: fast personal inbox, issue creation and triage, team backlogs, cycles, projects, roadmaps, comments, notifications, workspace switching, and realtime optimistic updates.

The clone must not copy Linear branding, screenshots, UI copy, icons, command names as protected branding, private APIs, proprietary sync behavior, or customer data. V1 can reproduce comparable jobs and information architecture using original names, original UI, and documented public concepts.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms native behavior.

## Goals

- Provide fast mobile issue capture, inbox triage, assignment, priority/status updates, labels, teams, cycles, and project progress.
- Support optimistic updates with deterministic reconciliation, conflict states, and offline-safe drafts.
- Provide mobile search/filtering, saved views, workspace/team switching, and notification triage.
- Support workspace permissions, SSO-ready account architecture, audit events, and subscription/seat gates without copying Linear plan names.
- Keep analytics and support tooling free of raw issue content by default.

## Non-Goals

- Do not imply Linear affiliation or copy brand assets.
- Do not reproduce proprietary sync algorithms, private APIs, exact UI copy, or pricing/plan names.
- Do not build a full web admin console, public API platform, or automation marketplace in V1.
- Do not store imported third-party data beyond user-authorized scopes.
- Do not claim exact native parity until manual blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/linear-plan-build-products/id1531231142 | Official iOS listing, mobile positioning, screenshots, privacy labels | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=app.linear.android | Official Android listing, data-safety summary, screenshots, feature positioning | Verified 2026-05-03 |
| Linear Docs | https://linear.app/docs | Issues, projects, cycles, views, inbox, teams, labels, notifications, and workspace concepts | Verified 2026-05-03 |
| Linear API Docs | https://developers.linear.app/docs/graphql/working-with-the-graphql-api | Public GraphQL model, auth, pagination, mutations, and integration patterns | Verified 2026-05-03 |
| Linear Security | https://linear.app/security | Security posture, SSO/SCIM signals, encryption, compliance, auditability | Verified 2026-05-03 |
| Linear Privacy Policy | https://linear.app/privacy | Personal-data and workspace-data handling context | Verified 2026-05-03 |
| Linear Terms | https://linear.app/terms | Account, acceptable-use, paid-service, and service-usage legal context | Verified 2026-05-03 |
| Linear Pricing | https://linear.app/pricing | Public entitlement categories and feature-gating signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Workspace sign-in must support email/OAuth now and be SSO-ready for managed workspaces.
- Inbox must show assigned, mentioned, subscribed, and review-like activity with read/archive/snooze-equivalent actions.
- Issues must include title, description, identifier, team, state, assignee, creator, priority, estimate, labels, cycle, project, attachments, and comments.
- Issue create/edit must support required fields, templates, drafts, duplicate submission protection, and offline conflict handling.
- Cycles must group team work by timebox and expose current/upcoming/completed cycle states.
- Projects must expose status, milestones, target dates, progress, related issues, and update/comment activity.
- Roadmap/project list must support progress summaries and filtered views.
- Search and filters must handle issue ID, title text, assignee, label, team, state, project, cycle, and priority.
- Realtime collaboration must update issue state, comments, notifications, cycles, and project progress with optimistic write reconciliation.
- Permissions must enforce workspace/team/project roles on every read/write projection.
- Subscription state must gate advanced workspace features, SSO, audit log, and high-volume integrations server-side.
- Push notifications must use opaque IDs and fetch content after unlock/auth validation.
- Analytics must exclude raw issue titles, descriptions, comments, and project names.

## Core User Journeys

- New user signs in, chooses a workspace/team, lands on inbox, and triages notifications.
- User creates an issue from mobile with title, description, team, state, priority, label, estimate, cycle, and assignee.
- User opens current cycle, filters by assignee, changes issue priority/status, and sees optimistic updates reconcile.
- User opens an issue from a push notification, comments, assigns a teammate, and archives the inbox item.
- User searches for an issue ID or text query, opens result, and handles a permission-denied state gracefully.
- User opens a project, reads progress/milestones, updates status, and links/unlinks issues where permitted.
- User goes offline, drafts an issue/comment, reconnects, and resolves a conflict caused by a server-side change.
- Workspace admin reviews audit events or sees the feature locked behind an entitlement/role gate.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Workspace | Sign in and select workspace | email/OAuth/SSO, workspace | waiting, authenticated, selected | SSO failure, access revoked |
| Inbox | Personal triage | archive, snooze, open, filter | empty, unread, archived | offline, permission revoked |
| Issue List | Team/cycle/project issues | filter, sort, open, bulk actions | loaded, empty, syncing | stale filter, large result set |
| Issue Detail | Read/edit/comment issue | edit fields, comment, assign | loaded, editing, optimistic | permission denied, deleted issue |
| New Issue | Capture work quickly | title, team, state, labels, cycle | drafting, submitting, submitted | required field missing, duplicate |
| Cycle View | Time-boxed team work | status move, filter, reorder | current, upcoming, complete | locked cycle, conflict |
| Project View | Project progress | milestones, status, issues | on-track, at-risk, complete | access revoked, stale rollup |
| Roadmap | Cross-project planning | filter, open project | loaded, grouped | entitlement gated |
| Search | Find issues/projects | query, filters | results, empty | rate limited, offline |
| Command Palette | Fast actions | keyboard/search/action | open, executing | hardware keyboard absent |
| Settings | Account, notifications, cache | toggles, logout | loaded, managed | admin locked |
| Admin/Audit | Workspace controls | view audit, seat state | loaded, gated | non-admin, entitlement missing |

## Data Model

- `Workspace`: tenant, slug, entitlement, SSO policy, audit policy, retention settings.
- `Member`: user, workspace role, team memberships, notification preferences, status.
- `Team`: workspace, key, issue states, labels, cycle settings, default assignee rules.
- `Issue`: identifier, title, description, team, state, priority, estimate, assignee, cycle, project, labels, rank, timestamps.
- `IssueState`: team-scoped state type, color token, ordering, terminal flag.
- `Cycle`: team, number, start/end, status, issue count, progress snapshot.
- `Project`: lead, status, milestones, target date, related issues, progress rollup.
- `Milestone`: project, name, target date, completion state.
- `Comment`: issue/project, author, body reference, mentions, edit/delete state.
- `InboxItem`: reason, subject, read/archive/snooze state, notification timestamp.
- `SavedView`: owner/workspace, query filters, sort, visibility, pinned state.
- `SyncOperation`: mutation id, object, optimistic payload, server version, conflict result.
- `AuditEvent`: auth, permission, issue, project, billing, SSO, and admin changes.
- `Entitlement`: plan key, seats, feature flags, renewal/expiration state.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/sso/:provider`, `DELETE /auth/session`: account lifecycle.
- `GET /workspaces`, `GET /workspaces/:id`, `GET /workspaces/:id/members`: workspace context.
- `GET /teams`, `GET /teams/:id/states`, `GET /teams/:id/labels`: team configuration.
- `GET /issues?filter=&cursor=`, `POST /issues`, `GET /issues/:id`, `PATCH /issues/:id`, `DELETE /issues/:id`: issue CRUD.
- `POST /issues/:id/comments`, `GET /issues/:id/comments`, `PATCH /comments/:id`, `DELETE /comments/:id`: comments.
- `GET /inbox`, `PATCH /inbox/:id`, `POST /inbox/bulk`: triage actions.
- `GET /cycles?teamId=`, `PATCH /cycles/:id/issues/:issueId`: cycle reads and membership.
- `GET /projects`, `POST /projects`, `PATCH /projects/:id`, `POST /projects/:id/status-updates`: project workflow.
- `GET /search?q=&filters=`, `GET /saved-views`, `POST /saved-views`: search and filters.
- `GET /sync?cursor=`, `POST /sync/mutations`: realtime bootstrap and optimistic mutation reconciliation.
- `GET /audit-events`, `GET /entitlements`, `POST /billing/webhook`: admin and billing.

## Realtime, Push, And Offline Behavior

- Use WebSocket or server-sent events for issue, inbox, comment, cycle, and project deltas with cursor-based resume.
- Optimistic writes must include client mutation IDs and object versions; server conflicts produce actionable resolution states.
- Offline mode supports cached reads, issue/comment drafts, and queued low-risk edits; server rechecks permissions and versions on reconnect.
- Ordered issue lists use stable rank keys and reconcile concurrent moves without duplicating or dropping issues.
- Push notifications use opaque IDs for mentions, assignments, due dates, project updates, and cycle reminders.
- Search can fall back to cached recent objects offline while labeling results as stale.

## Permissions, Privacy, And Safety

- Enforce workspace, team, project, and issue-level roles on every read/write and sync event.
- SSO and SCIM-ready account model must handle session expiry, deprovisioning, seat limits, and admin-managed cache policies.
- Audit log captures role changes, deletes, billing changes, SSO changes, data export/deletion, and admin policy updates.
- Analytics exclude raw issue titles, descriptions, comments, project names, customer names, and attachment content.
- Attachments must use signed uploads, malware scanning, size/type restrictions, and deletion lifecycle.
- Support diagnostics default to metadata and require user consent for issue/comment content.
- Abuse controls throttle comment spam, mention storms, search scraping, and integration mutation bursts.

## Analytics And Monetization

- Track privacy-safe events: workspace selected, issue created/updated, comment posted, inbox item archived, cycle opened, project status updated, search performed, sync conflict, offline queue flushed, entitlement gate hit.
- Event payloads use counts, object types, role/permission class, latency, failure codes, and non-reversible IDs.
- Original free/paid/enterprise tiers can gate SSO, audit log, roadmap volume, integrations, retention, and admin policy.
- Paywalls must identify the blocked capability, current entitlement, admin contact path, and billing ownership.

## Edge Cases

- User loses team permission while editing an issue.
- Offline edit targets an issue deleted or moved to a restricted team.
- Two users reorder the same cycle simultaneously.
- WebSocket resumes after missed events beyond retention window.
- Large workspace has 50k+ issues and many labels/states.
- Comment contains many mentions or an attachment upload fails after comment submit.
- SSO session expires mid-mutation.
- Entitlement downgrade disables audit log or advanced project features while screen is open.
- Push arrives for an issue the user can no longer access.
- Hardware keyboard command palette is unavailable on phone-only contexts.
- Project progress rollup is stale due to delayed issue sync.
- Data export/delete request intersects with enterprise retention policy.

## Test Plan

- Unit tests for issue validation, optimistic mutation IDs, version conflicts, rank ordering, filter serialization, permission checks, and audit events.
- Contract tests for workspace/team config, issue CRUD, comments, inbox, cycles, projects, search, sync, entitlements, and audit routes.
- Integration tests for sign-in, inbox triage, issue create/edit/comment, cycle update, project status update, search, offline queue, and conflict resolution.
- Realtime tests for reconnect, cursor expiry, duplicate events, out-of-order events, and concurrent list moves.
- Privacy/security tests for analytics redaction, role enforcement, support diagnostics, signed uploads, cache purge, and SSO deprovisioning.
- Billing tests for free, paid, expired, downgraded, enterprise, seat-limit, and webhook-duplicate states.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, command palette, and non-drag alternatives.
- Manual verification tests: native push, SSO, realtime latency, command-menu ergonomics, subscription states, and mobile accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build V1 without Linear brand assets, private APIs, proprietary sync code, or customer data.
- Issues, inbox, cycles, projects, comments, search, and workspace switching have deterministic contracts and failure codes.
- Optimistic updates reconcile safely across offline, conflict, permission, and realtime reconnect cases.
- SSO/admin/entitlement behavior is supported or explicitly feature-flagged with clear blockers.
- Analytics, push, support, cache, and logs avoid raw workspace content.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Which realtime transport and persistence model will back sync in V1?
- Will V1 expose a public API or only internal mobile/backend routes?
- Which SSO providers and SCIM flows are in scope for initial enterprise support?
- Are roadmaps and project updates V1 features or gated after issue/cycle maturity?
- What offline write scope is acceptable for enterprise tenants?
- Which attachment/file provider and malware-scanning service will be used?

## Build Plan

- Phase 1: scaffold auth, workspace/team config, issue list/detail/create, comments, inbox, and privacy-safe analytics.
- Phase 2: add cycles, projects, search/filtering, saved views, and notification settings.
- Phase 3: add realtime sync, optimistic mutations, rank reconciliation, offline drafts/queue, and conflict UI.
- Phase 4: add SSO-ready session handling, entitlements, audit events, admin policy, and cache controls.
- Phase 5: add attachments, push fanout, support diagnostics, export/delete, and large-workspace performance.
- Phase 6: complete accessibility, security/privacy review, realtime stress tests, billing tests, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Select realtime transport, rank/conflict strategy, and initial SSO scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
