# Todo

## Priority Documentation Todo

- [x] `$pack install business-app` - project-local pack configuration is current because `.agents/project.json` sets `project_type` to `business-app` and `enabled_packs` includes `business-app`.
- [ ] `$icp` - create `research/icp.md` because the `business-app` pack is enabled and no canonical `research/` output exists yet.
- [ ] `$competitive-analysis` - create `research/competitive-analysis.md` after `$icp`; currently ordered behind it because `research/icp.md` is missing.
- [ ] `$positioning` - create `research/positioning.md` after `$competitive-analysis`; currently blocked because `research/competitive-analysis.md` is missing.
- [ ] `$journey-map` - create `research/journey-map.md` after `$icp`; currently blocked because `research/icp.md` is missing, while `specs/` already contains the source specification set.
- [ ] `$metrics` - create `research/metrics.md` after `$journey-map`; currently blocked because `research/journey-map.md` is missing.
- [ ] `$gtm` - create `research/gtm.md` after `$icp`, `$competitive-analysis`, `$positioning`, and `$journey-map`; currently blocked because those upstream research outputs are missing.
- [ ] `$monetization` - create `research/monetization.md` after `$gtm`; currently blocked because `research/icp.md`, `research/competitive-analysis.md`, `research/journey-map.md`, `research/metrics.md`, and `research/gtm.md` are missing.
- [ ] `$landing-copy` - create `research/landing-copy.md` after `$positioning`, `$journey-map`, and `$monetization`; currently blocked because those upstream research outputs are missing.
- [ ] `$risk-register` - create `research/risk-register.md` after `$icp` so project, legal, privacy, execution, and downstream-repository risks are tied to an explicit customer and product thesis; currently blocked because `research/icp.md` is missing.
- [ ] `$enterprise-icp` - create `research/enterprise-icp.md` after `$icp`; currently blocked because `research/icp.md` is missing.
- [ ] `$assumption-tracker` - create `research/assumption-tracker.md` after at least three primary research docs exist; currently blocked because `research/` has no primary research documents.
- [ ] `$experiment` - create `research/experiments/<experiment>.md` after `$assumption-tracker`; currently blocked because `research/assumption-tracker.md` is missing and no prioritized hypothesis exists.
- [ ] `$burn-rate` - create `research/burn-rate.md` after `$monetization`, `$metrics`, and `$gtm`; currently blocked because those upstream business model and measurement outputs are missing.
- [ ] `$runway-model` - create `research/runway-model.md` after `$burn-rate`, `$monetization`, `$metrics`, and `$gtm`; currently blocked because the upstream financial and growth assumptions are missing.
- [ ] `$platform-strategy` - create `research/platform-strategy.md` after `$icp`, `$competitive-analysis`, `$journey-map`, and `$metrics`; currently blocked because the core product health and expansion context are missing.
- [ ] `$reconcile-research fix all` - create `research/reconciliation-report.md` after the first batch of primary research docs exists; currently blocked because fewer than two assertion-bearing `research/*.md` documents exist to reconcile.

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

## Completed Step: Produce the Todoist downstream build plan

### Result

- Created `tasks/todoist-downstream-build-plan.md` from `specs/batch-05/090-todoist.md`.
- Recorded the proposed downstream target repository as `GeorgeQLe/todoist-mobile-clone`.
- Defined an implementation-agnostic route map for auth shell, Today/Upcoming, Inbox, Project View, Quick Add, Task Detail, Labels/Filters, Calendar/Board View, Templates, Team Workspace, Settings/Billing, Privacy, Support, Export, and Account Deletion.
- Defined API schema planning for auth/session, profile/settings, tasks, projects/sections, quick add, labels, filters, reminders, comments, templates, integrations, productivity stats, search, uploads, notifications, entitlements, data export, account deletion, support cases, and audit events.
- Defined the downstream data model plan for user, device session, workspace/account, task, project, section, label, filter, reminder, comment, attachment, template, integration link, productivity stat, notification, entitlement, support case, audit event, and local cache record.
- Defined synthetic seed data covering projects, sections, labels, filters, tasks, comments, templates, collaborators, entitlements, notifications, support cases, export jobs, and offline conflict examples.
- Defined the downstream test checklist for unit, contract, integration, realtime, offline, permission, privacy/security, billing, accessibility, and manual-verification-blocker coverage.
- Preserved Todoist manual verification blockers as feature flags or blocked acceptance tests before any native parity claim.

### Validation

- Confirmed the build plan maps every required Todoist V1 screen to at least one route or navigation state.
- Confirmed every API family in `090-todoist.md` has an owner, request/response scope, error states, and test coverage.
- Confirmed seed data is synthetic and excludes Todoist branding, copied templates, real task content, and private user data.
- Confirmed deferred manual blockers remain explicit and are not treated as completed native parity.

## Completed Step: Create or link the downstream implementation repository

### Result

- Created the private downstream implementation repository at `https://github.com/GeorgeQLe/todoist-mobile-clone`.
- Seeded the downstream repository with `docs/source-specs/090-todoist.md` copied from `specs/batch-05/090-todoist.md`.
- Seeded the downstream repository with `docs/plans/todoist-downstream-build-plan.md` copied from `tasks/todoist-downstream-build-plan.md`.
- Updated this planning repository to record the downstream repository URL.
- Did not add runtime app code in this planning repository.

### Validation

- Confirmed the downstream repository exists at `https://github.com/GeorgeQLe/todoist-mobile-clone`.
- Confirmed the downstream repo has access to the source spec and build plan.
- Confirmed no runtime code was added to this planning repository.

### On Completion

- Phase 4 is complete.
- Completed phase archived to `tasks/phases/phase-4.md`.
- No additional roadmap phases remain in this planning repository.
- Next documentation/work queue should be generated with `$research-roadmap`.

## Next Steps

- Run `$research-roadmap` to recommend the next documentation action from current project state.
- Continue implementation planning and scaffolding in `https://github.com/GeorgeQLe/todoist-mobile-clone`.
- Keep Todoist manual verification blockers deferred until lawful hands-on verification evidence exists.
