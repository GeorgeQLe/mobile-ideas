# Phase 16: Implementation — Photo & Video Creation (42 Apps × 5 Variants)

> Test strategy: none

**Goal**: Build all five variants for every app in the Photo & Video Creation cluster.

**Scope**:
- Apps: Photo editors (Snapseed, VSCO, Lightroom, etc.), video editors (CapCut, InShot, etc.), camera apps.
- Shared patterns: image/video processing pipelines, filter/effect systems, layer compositing, export/share, timeline editing, GPU-accelerated rendering.

**Acceptance Criteria:**
- [x] Exact Phase 16 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
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

- [x] Step 16.1: Reconcile exact Photo & Video Creation app inventory and downstream readiness
  - Identify the canonical Phase 16 app set from `specs/`, downstream repo naming, `tasks/repo-seeding.md`, and `tasks/roadmap.md`.
  - Produce an inventory table with app ID, app name, repo slug, source spec path, downstream repository URL, visibility, default branch, README presence, source-spec copy presence, and root commit presence.
  - Verify every downstream repo is PRIVATE and does not contain `.github/workflows`.
  - Record authenticated GitHub rate-limit evidence before and after the reconciliation scan.
  - Classify likely risk groups: camera apps, photo editors, video editors, social creation tools, collage/layout tools, animation/effects tools, stock/media tools, and creator publishing tools.
  - Record blockers for account-, subscription-, region-, permission-, hardware-, codec-, provider-, licensed-media-, and native-GPU-gated behavior.
  - Files: modify `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md`.

  **Result:**
  Phase 16 inventory is reconciled to 42 apps, matching the Phase 9 build-plan evidence rather than the older roadmap estimate of ~47. Canonical ranges are IDs `096-099`, `223-240`, and `241-260`.

  **Verification Evidence:**
  - Pre-scan rate-limit snapshot: core `used=9`, `remaining=4991`, `reset=1779900687`; GraphQL `used=15`, `remaining=4985`, `reset=1779900441`.
  - Serial `gh api` verification checked every repo for private visibility, default branch, README, copied source spec under `docs/source-specs/`, default-branch commit, and `.github/workflows` absence.
  - Post-scan rate-limit snapshot: core `used=219`, `remaining=4781`, `reset=1779900687`; GraphQL `used=16`, `remaining=4984`, `reset=1779900441`.
  - Result: all 42 repos are `PRIVATE`, default to `main`, have README and source-spec copies, have a default-branch commit, and have no `.github/workflows` directory.

- [ ] Step 16.2: Plan the first Photo & Video Creation implementation tranche
  - Select the first 3-5 Phase 16 apps for implementation, prioritizing a representative mix of video editor, photo editor, design/canvas, and photo-library workflows.
  - Define per-app original product names, variant branch names, owned downstream paths, and validation commands.
  - Carry forward blockers for account/subscription, camera/photo/media permissions, codec/export support, licensed templates/music/stock assets, cloud sync, AI/beauty editing safety, native GPU/rendering, Flutter runtime, and Android Native local toolchain constraints.
  - Keep all downstream work private, serial where required, and free of GitHub Actions.
  - Files: modify `tasks/todo.md`, `tasks/history.md`, and downstream repos selected for the tranche only after this planning step is complete.

  **What to Build:**
  A self-contained tranche plan for the first Phase 16 implementation slice. This step should not scaffold app variants yet; it should convert the reconciled inventory into a bounded execution plan with app-specific validation and blocker handling.

  **Approach:**
  1. Use the Step 16.1 inventory in `tasks/repo-seeding.md`.
  2. Pick a small cross-section that exercises timeline editing, image adjustment/filtering, canvas/layout editing, and library/export behavior.
  3. Document the exact downstream repos, variant directories, expected files, and verification commands before implementation.
  4. Update this file with executable Step 16.3 implementation instructions.

### Milestone: Phase 16 — Photo & Video Creation Complete
**Acceptance Criteria:**
- [x] Exact Phase 16 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
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
