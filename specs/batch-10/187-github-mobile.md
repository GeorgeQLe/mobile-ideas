# GitHub Mobile-Style Clone Spec

> Metadata
> - Inspiration app: GitHub Mobile
> - Category: Dev tools
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace pages, GitHub Mobile docs, GitHub REST/GraphQL/OAuth docs, Actions docs, and GitHub terms/policies.
> - Manual verification blockers: OAuth/device authorization on a real app registration, push-notification payloads, enterprise SSO/SAML, GHES custom-host behavior, Actions log streaming, and native accessibility still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, Octocat marks, icons, screenshots, private APIs, repo content, and customer data.

## Overview

Build an original mobile developer collaboration client inspired by GitHub Mobile: notification inbox, issues, pull requests, code review, repository browsing, search, Actions run monitoring, discussion/comment workflows, and scoped OAuth authentication.

The clone must not copy GitHub branding, screenshots, UI copy, Octocat artwork, protected feature names as brand identifiers, private APIs, or user repository content. It can integrate with GitHub or a compatible Git provider only through documented public APIs under user-granted credentials and provider terms.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide a read-first mobile workflow for notifications, issues, pull requests, repositories, search, and CI status.
- Support mobile code review: file diffs, comments, review submission, approval/request-change equivalents, and merge-readiness state.
- Monitor workflow runs and logs while protecting secrets and respecting upstream permissions/rate limits.
- Use least-privilege OAuth scopes, secure token storage, revocation, and enterprise policy handling.
- Preserve privacy by avoiding unnecessary server-side storage of code, issue titles, repository names, and push payload content.

## Non-Goals

- Do not imply GitHub affiliation or reproduce GitHub brand assets.
- Do not build a full mobile IDE, Git remote host, CI runner, package registry, or Actions executor in V1.
- Do not scrape GitHub, replay private mobile traffic, bypass SAML/IP restrictions, or store user code beyond short-lived proxy/cache needs.
- Do not expose private repository data in analytics, push payloads, logs, or support tooling.
- Do not claim exact GitHub Mobile parity until manual device/account verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/github/id1477376905 | Official iOS listing, category, screenshots, privacy labels, mobile feature positioning | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=com.github.android | Official Android listing, data-safety summary, screenshots, device support, feature positioning | Verified 2026-05-03 |
| GitHub Mobile Docs | https://docs.github.com/en/get-started/using-github/github-mobile | Mobile workflows for notifications, issues, pull requests, repository browsing, and account use | Verified 2026-05-03 |
| GitHub Notifications Docs | https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/about-notifications | Notification reasons, delivery, subscriptions, and triage concepts | Verified 2026-05-03 |
| GitHub Pull Request Reviews Docs | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews | Review states, comments, approvals, and request-changes semantics | Verified 2026-05-03 |
| GitHub REST API | https://docs.github.com/en/rest | Public REST endpoint model, auth, pagination, rate limits, issues, pulls, Actions, and search | Verified 2026-05-03 |
| GitHub GraphQL API | https://docs.github.com/en/graphql | Public GraphQL schema and connection pagination model | Verified 2026-05-03 |
| GitHub OAuth Apps Docs | https://docs.github.com/en/apps/oauth-apps | OAuth app model, authorization, scopes, and device/web app considerations | Verified 2026-05-03 |
| GitHub Actions REST Docs | https://docs.github.com/en/rest/actions | Workflow run, job, log, artifact, and rerun endpoint behavior | Verified 2026-05-03 |
| GitHub Privacy Statement | https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement | Privacy obligations for account and repository data | Verified 2026-05-03 |
| GitHub Terms | https://docs.github.com/en/site-policy/github-terms/github-terms-of-service | API, account, acceptable-use, and service terms context | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Authentication must use a documented OAuth or device authorization flow with least-privilege scopes and explicit scope-upgrade screens.
- Secure token storage must use platform keychain/keystore and support token revocation, logout, and expired/SSO-required states.
- Notification inbox must show unread/read, reason, repository context, subject type, participant state, mute/unsubscribe, mark-read, and navigation to the subject.
- Issue views must support labels, assignees, milestones/projects-equivalent metadata, comments, reactions-equivalent signals, close/reopen where permitted, and permission-denied states.
- Pull request views must show overview, commits, changed files, review threads, checks/statuses, mergeability, branch protection, and review submission actions.
- Diff viewer must handle large files, binary files, collapsed files, generated files, deleted/renamed files, inline comment anchors, and outdated threads.
- Actions view must list workflow runs, jobs, statuses, timestamps, logs, artifacts where permitted, rerun controls, and disabled/unavailable states.
- Repository browsing must show README, file tree, branches/tags, releases where included, and protected/private access behavior.
- Search must cover repositories, issues/PRs, users/orgs, and code only when scopes and provider limits allow it.
- Enterprise support must include custom hosts, SAML/SSO errors, IP allowlist failures, revoked org authorization, and admin-managed restrictions.
- Push notifications must use opaque IDs and fetch sensitive content after unlock/authentication.
- API clients must respect upstream pagination, ETags/caching, abuse detection, secondary limits, and rate-limit reset times.
- Log viewing must redact secrets best-effort and never persist raw CI logs longer than required for display/cache.
- Analytics must avoid repository names, issue titles, code, comments, and organization identifiers unless explicitly aggregated/redacted.

## Core User Journeys

- New user signs in with OAuth/device flow, grants minimal scopes, lands on notification inbox, and sees rate-limit/permission education.
- User triages notifications by marking read, muting a thread, opening an issue, commenting, and returning to the filtered inbox.
- User opens a pull request, reviews changed files, adds an inline comment, submits an approval/request-changes equivalent, and sees the review state update.
- User checks CI status, opens a failed workflow run, streams a job log, redacts detected secrets, and reruns a failed job when permission allows.
- User searches across accessible repositories and issues, opens a result, and sees a permission/rate-limit state when search is restricted.
- User browses a private repository README and file tree while offline cache covers previously viewed content.
- Enterprise user adds a custom host, completes SSO, handles SAML reauthorization, and sees admin-restricted features disabled.
- User receives a push for a review request, unlocks device, app fetches the subject, and no sensitive code is present in the push payload.
- User revokes scopes or logs out; cached private data and tokens are cleared according to retention settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / Device Flow | Sign in and grant scopes | provider, custom host, device code/browser | waiting, authorized, scope-upgrade | expired code, denied scope, SSO required |
| Inbox | Notification triage | filter, mark read, mute, open | empty, unread, read, grouped | rate limited, revoked access |
| Issue Detail | Read and manage issue | comment, assign, label, close | loaded, editing, submitted | permission denied, locked thread |
| Pull Request Overview | PR metadata and review state | tabs, review, merge intent | open, draft, merged, closed | branch protection, conflicts |
| Diff Viewer | Review changed files | file nav, inline comment, collapse | loaded, commented, reviewed | binary, huge diff, outdated thread |
| Review Composer | Submit review | comment body, action | draft, submitted | validation failed, stale commit |
| Repository Browser | Browse repo content | branch, file, README | loaded, empty, cached | private access lost, LFS/large file |
| Search | Find repos/issues/code/users | query, filters | results, empty | rate limited, scope missing |
| Actions Runs | Monitor workflows | filter, open run, rerun | queued, in_progress, success, failed | disabled workflow, permission denied |
| Job Log Viewer | Read logs | scroll, search, rerun job | streaming, complete, redacted | log expired, secret detected |
| Org/Account Switcher | Change context | account, organization | loaded, selected | SAML expired, org revoked |
| Settings | Tokens, notifications, cache | toggles, logout, revoke | loaded, managed | enterprise policy, offline |

## Data Model

- `Account`: login, avatar reference, provider host, user id, primary email state, plan/enterprise flags.
- `OAuthToken`: encrypted token reference, scopes, refresh/expiry, SSO authorization state, revoked-at timestamp.
- `Organization`: login, role, SAML state, custom host, IP allowlist state, notification settings.
- `Repository`: owner, name hash/display, visibility, default branch, permissions, archived/fork state, cache policy.
- `Notification`: reason, unread state, subject type/id, repository, updated-at, subscription state, triage actions.
- `Issue`: number, title reference, state, labels, assignees, milestone/project metadata, locked state, permissions.
- `PullRequest`: number, branches, draft/merge state, commits, checks, review decision, changed-file summary.
- `Review`: reviewer, state, body, commit id, submitted-at, inline threads.
- `ReviewThread`: file path, diff position, resolved state, comments, outdated state.
- `DiffFile`: path, status, additions/deletions, hunks, binary/large/generated flags, truncation state.
- `WorkflowRun`: workflow id, run number, status, conclusion, actor, branch, commit, rerun permissions.
- `JobLog`: job id, stream cursor, redaction markers, expiry, partial-cache state.
- `SearchQuery`: type, filters, pagination cursor, scope requirements, rate-limit state.
- `AuditEvent`: auth, scope upgrade, cache purge, push open, SSO, rerun, review submission, and logout events.

## API And Backend Contracts

- `POST /auth/device`, `POST /auth/device/poll`, `POST /auth/oauth/callback`, `DELETE /auth/session`: provider auth lifecycle.
- `GET /auth/scopes`, `POST /auth/scope-upgrade`, `POST /auth/revoke`: current token and scope management.
- `GET /notifications?filter=&cursor=`, `PATCH /notifications/:id`, `POST /notifications/:id/mute`: notification triage.
- `GET /repos/:owner/:repo`, `GET /repos/:owner/:repo/contents`, `GET /repos/:owner/:repo/branches`: repository browsing.
- `GET /repos/:owner/:repo/issues`, `GET /issues/:id`, `POST /issues/:id/comments`, `PATCH /issues/:id`: issue operations.
- `GET /repos/:owner/:repo/pulls`, `GET /pulls/:id`, `GET /pulls/:id/files`, `GET /pulls/:id/reviews`: PR reads.
- `POST /pulls/:id/reviews`, `POST /pulls/:id/comments`, `PATCH /review-threads/:id`: review writes with commit anchoring.
- `GET /repos/:owner/:repo/actions/runs`, `GET /actions/runs/:id`, `GET /actions/jobs/:id/logs`, `POST /actions/runs/:id/rerun`: Actions monitoring.
- `GET /search?type=&q=&cursor=`, `GET /rate-limit`: search and provider-limit introspection.
- `POST /push/register`, `DELETE /push/register`, `POST /webhooks/provider`: opaque push fanout.
- `GET /settings/cache`, `PATCH /settings/cache`, `POST /cache/purge`: local/private cache controls.

## Realtime, Push, And Offline Behavior

- Notification, issue, PR, and workflow data should refresh by polling with ETags plus optional webhook fanout where permitted.
- Pull request review submission must pin to a commit SHA and detect stale-head failures before posting.
- Actions logs can stream via server-mediated fetch with cursor/resume where provider APIs permit; expired logs show a deterministic recovery state.
- Recently viewed inbox, issues, PR summaries, README content, and diffs can be cached encrypted for offline read.
- Offline writes are limited to drafts and queued mark-read/comment actions; queued writes must recheck permissions, SSO, and current object state.
- Push payloads contain only opaque subject IDs and fetch content after device unlock/session validation.
- Rate-limit and secondary-limit errors must pause requests until reset hints and avoid background retry storms.

## Permissions, Privacy, And Safety

- Request minimal scopes at login; require explicit re-auth for review submission, rerun, private repo, org admin, or write actions when not already granted.
- Store tokens only in platform secure storage; never sync tokens through generic cloud backup.
- Respect SAML SSO, GHES/custom-host policies, IP allowlists, organization revocation, and branch protection.
- Redact secrets from CI logs, support bundles, crash reports, and analytics.
- Analytics exclude code, diff hunks, comments, issue/PR titles, repository names, organization names, branch names, and commit messages.
- Cache purge must run on logout, token revocation, device compromise signal, and account switch if configured.
- Abuse controls must throttle search, comment, review, rerun, and webhook-triggered push fanout.
- Support tooling must default to metadata-only diagnostics and require user attachment for logs/screenshots.

## Analytics And Monetization

- Track privacy-safe events: auth completed, scope upgraded, notification triaged, issue commented, PR opened, review submitted, diff viewed, Actions run opened, rerun attempted, search performed, rate limit hit, cache purged.
- Event payloads use hashed/non-reversible object identifiers, counts, status classes, latency, and failure codes.
- V1 is free or provider-account-backed; any team features must be original and must not mirror private provider entitlements without documented API support.
- No in-app purchases are required for the core GitHub-compatible V1 unless the clone adds original paid services such as hosted push fanout or enterprise admin.

## Edge Cases

- OAuth device code expires, user denies scope, or browser callback is interrupted.
- Token revoked from provider settings while the app is open.
- SAML SSO required for one organization but not another.
- Custom GHES host uses self-signed CA or unsupported API version.
- Secondary rate limit triggers during search, notifications refresh, or CI log polling.
- Pull request head changes while user is drafting a review.
- Inline comment anchor points to an outdated or collapsed diff hunk.
- Huge diff, binary file, generated file, renamed/deleted file, or LFS pointer is encountered.
- Workflow logs expire, are too large, contain secret-like values, or permission is missing.
- Offline queued comment targets a locked/deleted issue or PR.
- Push received after access was revoked; subject fetch must fail closed.
- App crash occurs while encrypted cache contains private repository data.

## Test Plan

- Unit tests for OAuth state, scope gating, rate-limit backoff, diff hunk parsing, inline anchor validation, review stale-head handling, secret redaction, and cache purge.
- Contract tests for notifications, issues, pulls, reviews, repository contents, search, Actions runs/jobs/logs, rerun, rate-limit, and auth error shapes.
- Integration tests for login, inbox triage, issue comment, PR review submission, diff browsing, Actions log read, search, logout, and token revocation.
- Enterprise tests for custom hosts, SAML-required responses, org authorization changes, IP allowlist failures, and unsupported API versions.
- Offline tests for cached reads, queued mark-read/comment drafts, stale object reconciliation, cache expiry, and logout purge.
- Push tests proving payloads contain opaque IDs only and content fetch fails closed after access revocation.
- Security/privacy tests for encrypted token storage, analytics redaction, CI log secret redaction, crash-report filtering, and support bundle minimization.
- Accessibility tests for dynamic type, screen-reader labels, diff hunk navigation, review controls, color contrast, keyboard shortcuts, and reduced motion.
- Manual verification tests: real OAuth/device flow, push behavior, SSO/SAML, GHES host, Actions log streaming, review submission, and native accessibility.

## Acceptance Criteria

- Exact source links remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without GitHub brand assets, private APIs, copied UI copy, or persisted user code.
- Inbox, issues, pull requests, repository browsing, search, and Actions monitoring have deterministic API contracts and failure codes.
- OAuth scopes are minimized, visible, upgradeable, revocable, and enforced server-side.
- PR review supports diffs, inline comments, review submission, stale-head handling, and permission failures.
- Push, analytics, logs, support, and cache flows avoid exposing repository content.
- Enterprise/custom-host behavior is supported or explicitly feature-flagged with clear blockers.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Will V1 target GitHub.com only, GHES/custom hosts, or a provider-agnostic Git-host abstraction?
- Which OAuth flow and scopes will be approved for the mobile app registration?
- Will server-side proxying be used for push fanout/log redaction, or will the app call provider APIs directly?
- Are merge actions in V1, or limited to review/comment/read workflows?
- How long may encrypted offline cache retain private repository metadata?
- Which CI providers beyond GitHub Actions, if any, are in scope after V1?

## Build Plan

- Phase 1: scaffold auth, secure token storage, provider client, notification inbox, issue/PR read views, repository README/file browse, and privacy-safe analytics.
- Phase 2: add diff viewer, inline comments, review composer, stale-head handling, permissions, and review submission contract tests.
- Phase 3: add Actions run/job/log viewer, redaction, rerun controls, rate-limit handling, and search.
- Phase 4: add encrypted offline cache, queued drafts/triage, push fanout with opaque payloads, and logout/cache purge.
- Phase 5: add enterprise/custom host, SSO/SAML/IP allowlist handling, support diagnostics, and admin policy controls.
- Phase 6: complete accessibility, security review, large-diff/log performance, provider-contract regression, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Register or configure a test OAuth app and decide whether server-side proxying is required.
- Create or link the downstream implementation repository when Phase 1 is ready.
