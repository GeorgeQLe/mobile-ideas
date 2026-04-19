# Todo

## Priority Task Queue

- [x] Upgrade `006-tiktok.md` to implementation-ready status using the `001-chatgpt.md` pattern.
- [x] Upgrade `016-whatsapp.md` to implementation-ready status.
- [x] Upgrade `026-google-maps.md` to implementation-ready status.
- [x] Upgrade `033-airbnb.md` to implementation-ready status.
- [x] Upgrade `038-doordash.md` to implementation-ready status.
- [x] Upgrade `046-amazon.md` to implementation-ready status.
- [x] Upgrade `056-cash-app.md` to implementation-ready status.
- [x] Upgrade `066-spotify.md` to implementation-ready status.
- [x] Upgrade the remaining top-ten architecture-teaching spec: `089-notion.md`.
- [x] Upgrade remaining Batch 01 AI/social Draft 1 specs: `002-005` and `007-015`.
- [x] Upgrade Batch 02 communication/email specs: `021-025`.
- [x] Upgrade Batch 02 maps/mobility specs: `027-032`.
- [x] Upgrade Batch 02 travel booking specs: `034-037`.
- [x] Upgrade Batch 02 food/grocery delivery specs: `039-040`.
- [x] Upgrade Batch 04 finance/wallet specs: `061-065`.
- [x] Upgrade Batch 04 video/entertainment specs: `072-076`.
- [x] Upgrade Batch 04 education specs: `077-080`.
- [x] Upgrade Batch 05 education/wellness/fitness/health specs: `081-088`.
- [x] Upgrade the remaining 11 specs by batch after the Batch 01, Batch 02, Batch 03, Batch 04 finance/wallet, Batch 04 audio, Batch 04 video/entertainment, Batch 04 education, and Batch 05 education/wellness/fitness/health patterns are proven.

## Phase 2: Hygiene And Draft 1 Remediation

- [x] Add `CLAUDE.md` with project conventions.
- [x] Add `tasks/roadmap.md` with phase structure.
- [x] Add `tasks/history.md` with dated project history.
- [x] Add `## Next Steps` to generated task artifacts.
- [x] Rewrite all numbered specs into canonical Draft 1 structure.
- [x] Run final hygiene and quality validation.
- [x] Commit and push remediation work.

## Phase 3: Exact Source Replacement And Hands-On Verification

- [x] Define the implementation-readiness gate in `tasks/implementation-readiness.md`.
- [x] Upgrade `001-chatgpt.md` from Draft 1 scaffold to implementation-ready public-source V1 spec.
- [x] Upgrade `017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md` to implementation-ready public-source V1 status.
- [x] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 11 specs with exact first-party URLs.
- [x] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [x] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [x] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Completed Step: Choose the first downstream implementation candidate

### Decision

Selected `specs/batch-05/090-todoist.md` as the first downstream implementation candidate.

Todoist is the best first implementation target because it has strong product value, a clear public-source V1 spec, mostly original-data workflows, and a useful mobile architecture shape without requiring regulated money movement, licensed media catalogs, physical hardware, real-world dispatch, or safety-critical location behavior to start planning.

### Candidate Comparison

| Candidate | Category | Startup Risk | Product Value | Decision |
|---|---|---|---|---|
| `090-todoist.md` | Productivity/task planning | Low to medium: auth, private tasks, reminders, offline sync, collaboration, calendar integrations, billing, export/delete, and support blockers can start behind feature flags or provider stubs. | High: core CRUD, quick add, projects, filters, reminders, collaboration, offline behavior, and privacy flows create a useful full-stack mobile implementation plan. | Choose first. |
| `066-spotify.md` | Licensed media | High: music/podcast/audiobook catalogs, rights, ads, recommendations, downloads, family controls, creator tools, and regional availability block native parity. | High, but provider/legal complexity dominates early implementation planning. | Defer. |
| `056-cash-app.md` | Regulated finance | Very high: identity verification, money movement, card issuance, bitcoin, investing, taxes, disputes, teen accounts, scam controls, and compliance approvals are launch blockers. | High, but unsuitable as the first build without a regulated provider/compliance plan. | Defer. |
| `100-ring.md` | Smart home/security hardware | Very high: device setup, Wi-Fi provisioning, video/audio streams, alarm monitoring, E2EE, law-enforcement controls, subscriptions, and hardware ownership block native parity. | High, but depends on physical devices and sensitive home-security review. | Defer. |

### Deferred Todoist Blockers

- Manual verification remains required for signup/login, quick-add parsing accuracy, recurring date edge cases, push reminder payloads, calendar integrations, team invite/admin flows, paid checkout/restore/cancel, widgets, Wear OS/watch behavior, offline conflict resolution, productivity trends, data export, account deletion, and support escalation.
- Calendar, notification, billing, team, export/delete, and support flows should begin as explicit provider stubs, feature flags, blocked acceptance tests, or non-parity fallbacks.
- The downstream implementation must use original branding, original copy, original icons, original templates, synthetic seed data, and documented public URLs only.

### Validation

- Confirmed `tasks/implementation-readiness.md` marks `090 | Todoist` as `Implementation-ready for public-source V1`.
- Confirmed `specs/batch-05/090-todoist.md` has exact first-party marketplace, help, privacy, terms, security, pricing, template, and integration sources.
- Confirmed the selected V1 can start with synthetic task/project/collaboration data and provider stubs, without production credentials, paid plans, hardware, regulated approvals, licensed media catalogs, copied assets, or private APIs.

## Next Runnable Step: Produce the Todoist downstream build plan

### Scope

- Use `specs/batch-05/090-todoist.md` as the source spec for the first implementation-planning pass.
- Define the downstream target repo proposal as `GeorgeQLe/todoist-mobile-clone`; if that name is unavailable or the user prefers another name, record the chosen replacement before creating or linking a repo.
- Produce a route map for the V1 mobile app: auth shell, Today/Upcoming, Inbox, Project View, Quick Add, Task Detail, Labels/Filters, Calendar/Board View, Templates, Team Workspace, Settings/Billing, Privacy, Support, Export, and Account Deletion.
- Produce an API schema plan covering auth/session, profile/settings, tasks, projects, quick add, labels, filters, reminders, comments, templates, integrations, productivity stats, search, uploads, notifications, entitlements, data export, account deletion, support cases, and audit events.
- Produce a data model plan covering user, device session, workspace/account, task, project, section, label, filter, reminder, comment, attachment, template, integration link, productivity stat, notification, entitlement, support case, audit event, and local cache record.
- Produce a seed data plan using only synthetic projects, sections, labels, filters, tasks, comments, templates, collaborators, entitlements, notifications, support cases, export jobs, and offline conflict examples.
- Produce a test checklist for unit, contract, integration, realtime, offline, permission, privacy/security, billing, accessibility, and manual-verification-blocker tests.
- Preserve all manual blockers from `090-todoist.md` as deferred launch blockers unless lawful hands-on verification evidence is added.

### Research Notes

- This repository remains a planning/specification workspace; do not add runtime app code here.
- Use `CLAUDE.md` for project conventions and `tasks/implementation-readiness.md` for the readiness gate.
- Use the Todoist spec's `Build Plan`, `Data Model`, `API And Backend Contracts`, `Realtime, Push, And Offline Behavior`, `Permissions, Privacy, And Safety`, `Test Plan`, and `Acceptance Criteria` sections as the planning source.
- Keep the downstream plan implementation-agnostic unless a target stack is already documented in the downstream repo or explicitly chosen by the user.

### Implementation Notes

- Add the downstream build plan to a task artifact under `tasks/`, or create/update a dedicated downstream planning artifact if the plan becomes too long for `tasks/todo.md`.
- Do not create the downstream repo unless the step explicitly scopes repo creation or the user confirms the target name.
- Include feature flags or blocked acceptance tests for calendar integrations, billing, team/admin flows, widgets/watch behavior, export/delete, support escalation, and exact offline conflict behavior.
- Link the selected source spec and record the chosen downstream target repo in `tasks/history.md`.

### Validation

- Confirm the build plan maps every required Todoist V1 screen to at least one route or navigation state.
- Confirm every API family in `090-todoist.md` has an owner, request/response scope, error states, and test coverage.
- Confirm seed data is synthetic and contains no Todoist branding, copied templates, real task content, or private user data.
- Confirm deferred manual blockers remain explicit and are not treated as completed native parity.
