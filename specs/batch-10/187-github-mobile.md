# GitHub Mobile-Style Clone Spec

> Metadata
> - Inspiration app: GitHub Mobile
> - Category: Dev tools
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, GitHub docs, and REST/GraphQL API docs — pending exact URL verification.
> - Manual verification blockers: OAuth device flow, push-notification payloads, enterprise SSO, and Actions log streaming behavior still require a test device/account.
> - Legal scope: functional parity only; use original UI, original branding, and the public GitHub API under its terms.

## Overview

Build an original mobile dev-tools app inspired by GitHub Mobile: inbox/notifications, issues, pull requests, code review, search, and Actions monitoring on mobile.

The clone must not copy GitHub branding, iconography, feature names (e.g. "Checks"), or private APIs. It uses the public GitHub (or compatible Git host) API under the user's credentials.

## Goals

- Read-first experience for notifications, issues, PRs, discussions.
- Code review: diff browsing, inline comments, approve/request-changes.
- Search across repos, code, issues, and people.
- Actions monitoring with run status, logs, and re-run.
- Secure OAuth/device-flow auth with scoped tokens.

## Non-Goals

- Do not imply GitHub affiliation.
- Do not ship a full editor or CI runtime.
- Do not store user code on servers beyond request lifecycles.
- Do not bypass enterprise SSO/IP allowlists.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/github/id1477376905 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.github.android | Android listing, data safety | Source discovery — pending exact URL verification |
| GitHub Mobile docs | https://docs.github.com/en/get-started/using-github/github-mobile | Features, notifications, code review | Source discovery — pending exact URL verification |
| GitHub REST API | https://docs.github.com/en/rest | Endpoints, scopes, rate limits | Source discovery — pending exact URL verification |
| GitHub OAuth | https://docs.github.com/en/apps/oauth-apps | Auth flows, scopes | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- OAuth device flow for mobile sign-in; token scopes minimized.
- Notification inbox with read/unread and triage actions.
- PR review must support diff viewing, inline comments, file-level review, and approve/reject.
- Actions view with run list, details, and log viewer.
- Enterprise support: GHES/SAML SSO where applicable.

## Core User Journeys

- User authenticates via device flow and lands on inbox.
- User triages notifications: mark read, mute thread, go to item.
- User opens a PR, browses diff, adds inline comment, approves.
- User searches code across their orgs.
- User watches an Actions run, streams logs, re-runs a failed job.
- User reviews an issue, assigns labels/assignees, comments.
- User switches org/context and sees filtered inbox.
- User receives a push for a review request and opens it.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Device Flow | Sign in with scoped token | device code, open browser | waiting, authorized | expired code, network |
| Inbox | Notifications triage | read, mute, open | empty, unread, read | rate limited |
| Issue View | Read/reply/assign | comment, assign, close | loaded, editing | permission denied |
| PR View | Overview, commits, checks | approve, comment | loaded, merging | conflicts, blocked |
| Diff Viewer | File diffs | scroll, comment | loaded, commented | large file truncated |
| Repository | Browse files and README | navigate | loaded, empty | private access |
| Search | Repos/code/issues | query, filters | results, empty | rate limited |
| Actions Runs | Run list | filter, open | loaded, empty | workflow disabled |
| Run Logs | Stream logs | scroll, re-run | streaming, complete, failed | log size limit |
| Settings | Account, notifications, orgs | toggles | loaded | SSO required |
| Org Switcher | Change active org | select | loaded | access revoked |

## Data Model

- `Account` (login, avatar ref, scopes), `Token`, `Organization`, `Repository`, `Notification` (reason, subject), `Issue`, `PullRequest`, `Review`, `Comment`, `DiffHunk`, `CheckRun`, `WorkflowRun`, `JobLog`, `SearchIndex` (cached), `AuditEvent`.

## API And Backend Contracts

- `POST /auth/device`, `POST /auth/device/poll`, `DELETE /auth/session`.
- Proxy endpoints wrapping upstream Git host:
  - `GET /notifications`, `PATCH /notifications/:id`.
  - `GET /repos/:owner/:repo`, `GET /repos/:owner/:repo/issues`, `GET /repos/:owner/:repo/pulls`.
  - `GET /pulls/:id`, `GET /pulls/:id/files`, `POST /pulls/:id/reviews`, `POST /pulls/:id/comments`.
  - `GET /actions/runs`, `GET /actions/runs/:id`, `GET /actions/runs/:id/logs`, `POST /actions/runs/:id/rerun`.
  - `GET /search?type=code|issues|repos&q=`.
- All endpoints respect upstream rate limits and return error shape with reset hints.

## Realtime, Push, And Offline Behavior

- Push notifications for review requested, assigned, mentioned — never include code content.
- Webhook bridge (server-side) fans out to mobile push.
- Inbox and recently viewed items cached for offline read.
- Action logs stream via SSE; resume via cursor after disconnect.

## Permissions, Privacy, And Safety

- OAuth scopes minimized; scope upgrade requires re-auth.
- Token stored in secure keychain/keystore; revocable from settings.
- Enterprise: respect SAML, IP allowlists, SSO session timeouts.
- Secrets redaction in Action logs (Bearer tokens, API keys).
- Analytics exclude repo names, code content, issue titles.
- Push payloads use opaque IDs; content fetched after unlock.

## Analytics And Monetization

- Events: signed in, notification triaged, PR reviewed, run rerun, search performed.
- App is free; optional team features via account tier mirrored from upstream.
- No in-app purchases in V1.

## Edge Cases

- Token expired or revoked; force re-auth.
- Rate limit hit; back off with visible state.
- Huge diff or binary file; render-guard.
- SAML SSO enforced; surface correct error.
- Enterprise Server (GHES) with custom host and CA.
- Offline triage: queued mark-read actions must sync.

## Test Plan

- Unit tests for rate-limit backoff, diff hunk parsing, triage queue.
- Contract tests for all proxied endpoints and error shapes.
- Integration tests for device flow auth, PR review, log streaming.
- Enterprise tests for SSO, IP allowlist, GHES host.
- Secrets-redaction tests for log stream.
- Push tests ensuring no code content in payload.
- Accessibility tests for diff viewer and VoiceOver.
- Manual verification: device flow on real device, push behavior, enterprise SSO.

## Acceptance Criteria

- Source URLs verified.
- Inbox, PR review, Actions, and search all functional.
- Scopes minimized and revocable.
- Enterprise paths supported or explicitly deferred.
- Manual blockers feature-flagged.

## Open Questions

- Will GHES be supported in V1 or later?
- Will in-app code editing ship (beyond comments)?
- Which CI providers beyond GitHub Actions (if any) in V1?
- Push fanout hosted or third-party?

## Build Plan

- Phase 1: auth + inbox + issue/PR read.
- Phase 2: code review (diff + comments + approve).
- Phase 3: Actions viewer + log streaming.
- Phase 4: search + org switcher.
- Phase 5: enterprise (SSO, GHES) + secrets redaction.
- Phase 6: push + accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Confirm device-flow registration with upstream.
- Define push fanout architecture.
