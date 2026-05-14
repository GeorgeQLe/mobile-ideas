# Todo — Mobile Ideas

> Current phase: 13 of 27 — Implementation: Messaging & Email (~37 Apps x 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: tests-after, local validation only; GitHub Actions remain disabled unless separately approved

## Priority Task Queue

- [ ] Review `tasks/recurring-todo.md`: "Refresh research roadmap" — trigger condition may be eligible after the 2026-05-14 Phase 12 completion and Phase 13 transition; promote to `tasks/todo.md` only if this requires concrete documentation execution before Phase 13 resumes.

## Phase 13: Implementation — Messaging & Email (~37 Apps x 5 Variants)

### Goal

Build all five variants for every app in the Messaging & Email cluster.

### Scope

- Apps: messaging, email, calling, and video conferencing apps.
- Shared patterns: end-to-end encryption semantics, real-time delivery, push notifications, thread/conversation views, attachment handling, offline queuing, spam/abuse reporting, contact safety, enterprise retention/export controls, and account recovery blockers.
- Preserve Phase 11 and Phase 12 carry-forward blockers for Flutter and Android Native toolchain validation; do not treat those blockers as resolved for later rollups.
- Do not enable, dispatch, or rely on GitHub Actions; use local validation only unless the user gives separate explicit approval naming GitHub Actions.

### Acceptance Criteria

- [ ] Exact Phase 13 app inventory is reconciled against `tasks/roadmap.md`, `tasks/ideas.md`, `tasks/repo-seeding.md`, and existing specs before downstream implementation starts.
- [ ] All reconciled Phase 13 apps have 5 working variants each or explicit local/toolchain/provider blockers.
- [ ] Every locally available variant passes local validation and has benchmark evidence or an explicit blocker record.
- [ ] Encryption, privacy, retention, safety, moderation, abuse-reporting, attachment, offline, and notification flows are implemented per spec.
- [ ] No proprietary assets, trademarks as branding, copyrighted media, copied code, private APIs, production data, public visibility changes, or GitHub Actions are introduced.
- [ ] Manual verification blockers are documented and not falsely claimed as resolved.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low once inventory is reconciled (each app is an independent GitHub repo)
**Review gates:** local validation, benchmark/blocker artifacts, spec compliance, encryption/privacy review, messaging abuse-safety review, legal/asset review

**Subagent lanes:** none yet. Per-step lanes must be defined at execution time. If write lanes are used, each lane must own a separate non-primary GitHub branch and pass consolidation/PR review before integration.

### Implementation

- [ ] Step 13.1: Reconcile exact Messaging & Email app inventory and downstream readiness
  - Files: `tasks/todo.md`, `tasks/roadmap.md`, `tasks/repo-seeding.md`, `tasks/history.md`, relevant `specs/batch-*/*.md`, and downstream repo metadata only.
  - Determine the exact Phase 13 app list from existing specs and seeded downstream repos before implementation starts.
  - Resolve the roadmap's approximate `~37 apps` count into a numbered app inventory with repo names, source spec paths, and spec tier/readiness status.
  - Verify each candidate downstream repo remains `PRIVATE`, has a root commit, has `README.md`, has `docs/plans/README.md`, and has the copied source spec under `docs/source-specs/`.
  - Identify any missing downstream repos, missing source specs, stale build plans, non-private visibility, or draft-status constraints as blockers.
  - Do not mutate downstream implementation code in this step.
  - Do not enable, dispatch, or rely on GitHub Actions.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Produce the canonical Phase 13 app inventory and readiness checklist so downstream implementation can proceed without guessing which messaging/email repos are in scope.

  **Approach:**
  1. Read Phase 13 in `tasks/roadmap.md`, the app queue in `tasks/ideas.md`, and seeded downstream status in `tasks/repo-seeding.md`.
  2. Select apps whose roadmap/source-spec scope is messaging, email, calling, video conferencing, contacts, or closely related communication.
  3. For each selected app, record app ID, app name, downstream repo, source spec path, spec tier/readiness, and any privacy/safety/regulatory notes.
  4. Serially verify downstream metadata with `gh api` or the existing seeding manifest evidence: visibility must be `PRIVATE`, default branch/root commit must exist, source spec must be copied, and `docs/plans/README.md` must exist.
  5. Update this phase's App Inventory and Step 13.2+ breakdown based on the reconciled list.
  6. Record blockers and evidence in `tasks/history.md`; update `tasks/roadmap.md` if the exact count differs from the approximate roadmap estimate.

  **Acceptance Criteria:**
  - Phase 13 has an exact numbered App Inventory table.
  - Every selected app has a repo and source spec path or an explicit blocker.
  - Downstream readiness is verified without GitHub Actions.
  - The next implementation step is scoped to a bounded pilot or batch with file-level detail.

- [ ] Step 13.2: Scaffold or repair multi-variant structure across reconciled Phase 13 repos
  - Files: reconciled Phase 13 downstream repos and a reproducible planning-repo verifier script if needed.
  - Implementation plan to be expanded after Step 13.1 confirms the exact inventory.

- [ ] Step 13.3: Implement pilot messaging app 1 across all five variants
  - Files: first reconciled pilot downstream repo.
  - Implementation plan to be expanded after Step 13.1 confirms the inventory and selects the safest pilot.

- [ ] Step 13.4: Implement pilot messaging/email app 2 across all five variants
  - Files: second reconciled pilot downstream repo.
  - Implementation plan to be expanded after Step 13.1.

- [ ] Step 13.5: Implement remaining Phase 13 apps in serial, risk-grouped batches
  - Files: reconciled Phase 13 downstream repos.
  - Implementation plan to be expanded after Step 13.1.

- [ ] Step 13.6: Validate all Phase 13 repos without GitHub Actions
  - Run local build, lint, type check, and tests where toolchains are available.
  - Record executable evidence and explicit blockers, including inherited Flutter/Android toolchain limits.

- [ ] Step 13.7: Run benchmarking harness and record scorecards
  - Record scorecards and blocker artifacts under `tasks/scorecards/phase-13/`.
  - Do not invent scores for blocked variants.

- [ ] Step 13.8: Phase 13 final validation and cleanup
  - Verify acceptance criteria.
  - Audit source/assets for legal hygiene and copied-brand risks.
  - Document manual verification blockers.
  - Mark Phase 13 complete only if validation and benchmark evidence are complete or explicitly approved for carry-forward.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Source specs: exact paths to be reconciled in Step 13.1
- Phase 11 carry-forward blockers: `tasks/phase-11-validation-report.md`, `tasks/scorecards/phase-11/benchmark-blockers.json`
- Phase 12 carry-forward blockers: `tasks/phase-12-validation-report.md`, `tasks/scorecards/phase-12/benchmark-blockers.json`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
