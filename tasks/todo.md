# Todo — Mobile Ideas

> Current phase: 14 of 27 — Implementation: Video & Music Streaming (~53 Apps x 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: tests-after, local validation only; GitHub Actions remain disabled unless separately approved

## Priority Task Queue

- [ ] Step 14.1: Reconcile exact Video & Music Streaming app inventory and downstream readiness
  - Files: `tasks/todo.md`, `tasks/roadmap.md`, `tasks/repo-seeding.md`, `tasks/history.md`, relevant `specs/batch-*/*.md`, and downstream repo metadata only.
  - Determine the exact Phase 14 app list from existing specs and seeded downstream repos before implementation starts.
  - Resolve the roadmap approximate `~53 apps` count into a numbered app inventory with repo names, source spec paths, spec tier/readiness status, and streaming/licensed-media risk notes.
  - Verify each candidate downstream repo remains `PRIVATE`, has a root commit, has `README.md`, has `docs/plans/README.md`, and has the copied source spec under `docs/source-specs/`.
  - Identify missing downstream repos, missing source specs, stale build plans, non-private visibility, licensed-media/DRM/provider blockers, real-device playback blockers, and Draft-status constraints as blockers.
  - Do not mutate downstream implementation code in this step.
  - Do not enable, dispatch, or rely on GitHub Actions.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Produce the canonical Phase 14 app inventory and readiness checklist so downstream implementation can proceed without guessing which video, music, and streaming/audio repos are in scope.

  **Approach:**
  1. Read Phase 14 in `tasks/roadmap.md`, the app queue in `tasks/ideas.md`, seeded downstream status in `tasks/repo-seeding.md`, and relevant source specs.
  2. Select apps whose roadmap/source-spec scope is video streaming, music streaming, live streaming, audio platforms, media playback, creator video, or closely related licensed-content consumption.
  3. For each selected app, record app ID, app name, category, downstream repo, source spec path, implementation-readiness status, and launch blockers for licensed media, DRM-adjacent flows, playback/provider integration, downloads/offline, recommendations, ads/subscriptions, minors/supervision, and real-device media behavior.
  4. Serially verify downstream metadata with `gh api` or existing seeding manifest evidence: visibility must be `PRIVATE`, default branch/root commit must exist, source spec must be copied, and `docs/plans/README.md` must exist.
  5. Update this phase App Inventory and Step 14.2+ breakdown based on the reconciled list.
  6. Record blockers and evidence in `tasks/history.md`; update `tasks/roadmap.md` if the exact count differs from the approximate roadmap estimate.

## Phase 14: Implementation — Video & Music Streaming (~53 Apps x 5 Variants)

### Goal

Build all five variants for every app in the Video & Music Streaming cluster.

### Scope

- Apps: video streaming, music streaming, live streaming, creator video, audio platforms, and adjacent media-consumption apps.
- Shared patterns: adaptive playback shells, playback controls, queues, playlists, libraries, search/discovery, recommendations, offline/download blockers, account/subscription/ads gates, content moderation, licensed-media/DRM-adjacent blockers, and parental/supervised-account safety.
- Preserve Phase 11, Phase 12, and Phase 13 carry-forward blockers for Flutter and Android Native toolchain validation; do not treat those blockers as resolved for later rollups.
- Do not enable, dispatch, or rely on GitHub Actions; use local validation only unless the user gives separate explicit approval naming GitHub Actions.

### Acceptance Criteria

- [ ] Exact Phase 14 app inventory is reconciled against `tasks/roadmap.md`, `tasks/ideas.md`, `tasks/repo-seeding.md`, and existing specs before downstream implementation starts.
- [ ] All reconciled Phase 14 apps have 5 working variants each or explicit local/toolchain/provider/licensed-media blockers.
- [ ] Every locally available variant passes local validation and has benchmark evidence or an explicit blocker record.
- [ ] Playback, queue management, recommendation/discovery, offline/download, account/subscription, moderation, privacy, and licensed-media safety flows are implemented per spec.
- [ ] No proprietary assets, trademarks as branding, copyrighted media, copied code, private APIs, production data, public visibility changes, or GitHub Actions are introduced.
- [ ] Manual/provider/licensed-media/real-device verification blockers are documented and not falsely claimed as resolved.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low once inventory is reconciled (each app is an independent GitHub repo)
**Review gates:** local validation, benchmark/blocker artifacts, spec compliance, licensed-media/DRM-adjacent review, media safety/moderation review, legal/asset review

**Subagent lanes:** none yet. Per-step lanes must be defined at execution time. If write lanes are used, each lane must own a separate non-primary GitHub branch and pass consolidation/PR review before integration.

### Implementation

- [ ] Step 14.1: Reconcile exact Video & Music Streaming app inventory and downstream readiness
  - Files: `tasks/todo.md`, `tasks/roadmap.md`, `tasks/repo-seeding.md`, `tasks/history.md`, relevant `specs/batch-*/*.md`, and downstream repo metadata only.
  - Use the Priority Task Queue implementation plan above.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 11 carry-forward blockers: `tasks/phase-11-validation-report.md`, `tasks/scorecards/phase-11/benchmark-blockers.json`
- Phase 12 carry-forward blockers: `tasks/phase-12-validation-report.md`, `tasks/scorecards/phase-12/benchmark-blockers.json`
- Phase 13 carry-forward blockers: `tasks/phase-13-validation-report.md`, `tasks/scorecards/phase-13/benchmark-blockers.json`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
