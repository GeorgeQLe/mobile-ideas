# Phase 16: Implementation — Photo & Video Creation (~47 Apps × 5 Variants)

> Test strategy: none

**Goal**: Build all five variants for every app in the Photo & Video Creation cluster.

**Scope**:
- Apps: Photo editors (Snapseed, VSCO, Lightroom, etc.), video editors (CapCut, InShot, etc.), camera apps.
- Shared patterns: image/video processing pipelines, filter/effect systems, layer compositing, export/share, timeline editing, GPU-accelerated rendering.

**Acceptance Criteria:**
- [ ] Exact Phase 16 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 16 apps have 5 working variants each or explicit local/toolchain/provider/licensed-media blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Core editing workflows (crop, filter, adjust, export) are functional across variants or explicitly blocked by local/native/media-provider constraints.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share image processing, filter pipeline, export, media-permission, and timeline-editing patterns. Native variants may have significant advantages for GPU access, camera/media library permissions, background export, and codec support.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, provider/licensed-media/privacy blocker review

### Implementation

- [ ] Step 16.1: Reconcile exact Photo & Video Creation app inventory and downstream readiness
  - Identify the canonical Phase 16 app set from `specs/`, downstream repo naming, `tasks/repo-seeding.md`, and `tasks/roadmap.md`.
  - Produce an inventory table with app ID, app name, repo slug, source spec path, downstream repository URL, visibility, default branch, README presence, source-spec copy presence, and root commit presence.
  - Verify every downstream repo is PRIVATE and does not contain `.github/workflows`.
  - Record authenticated GitHub rate-limit evidence before and after the reconciliation scan.
  - Classify likely risk groups: camera apps, photo editors, video editors, social creation tools, collage/layout tools, animation/effects tools, stock/media tools, and creator publishing tools.
  - Record blockers for account-, subscription-, region-, permission-, hardware-, codec-, provider-, licensed-media-, and native-GPU-gated behavior.
  - Files: modify `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md`.

  **What to Build:**
  A Phase 16 readiness record that is exact enough for the later tranche plan. This step creates no downstream code changes; it only reconciles inventory and verifies downstream repository safety/readiness.

  **Approach:**
  1. Search `specs/` and existing repo-seeding records for candidate Photo & Video Creation apps.
  2. Map each candidate to its downstream repo slug and copied source spec.
  3. Use serial GitHub API checks for visibility, default branch, README, source spec, root commit, and workflow absence.
  4. Update `tasks/repo-seeding.md` with evidence and rate-limit snapshots.
  5. Update this file with the finalized inventory count and the next Step 16.2 tranche-planning task.

### Milestone: Phase 16 — Photo & Video Creation Complete
**Acceptance Criteria:**
- [ ] Exact Phase 16 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 16 apps have 5 working variants each or explicit local/toolchain/provider/licensed-media blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Core editing workflows (crop, filter, adjust, export) are functional across variants or explicitly blocked by local/native/media-provider constraints.

## Development Docs Reconciliation

- [ ] Resolve `tasks/history.md` Phase 15 ordering/duplication drift with an append-only normalization pass after Phase 15 completion.
  - Evidence: recent Phase 15 records are split between dated top-level entries and older `## Step 15.x` entries lower in `tasks/history.md`.
  - Reason deferred: rewriting or reordering append-only history is not permitted without explicit approval.
- [ ] Decide whether to reconstruct missing archives for completed Phases 1-3.
  - Evidence: `tasks/phases/` contains archives for Phases 4-15, but not 1-3.
  - Reason deferred: no completed active `tasks/todo.md` phase content exists for those older phases, so archive synthesis would require judgment from roadmap/history evidence.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 15 archive: `tasks/phases/phase-15.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
