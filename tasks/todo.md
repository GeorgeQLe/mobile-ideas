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

- [x] Step 16.2: Plan the first Photo & Video Creation implementation tranche
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

  **Result:**
  The first implementation tranche is scoped to five representative apps:

  | Lane | ID | App | Risk Group | Downstream Repo | Source Spec | Implementation Branch |
  |---|---:|---|---|---|---|---|
  | A | 096 | CapCut | Video timeline editing | `GeorgeQLe/capcut-mobile-clone` | `specs/batch-05/096-capcut.md` | `phase16-step16-3-capcut` |
  | B | 097 | Canva | Design/canvas editing | `GeorgeQLe/canva-mobile-clone` | `specs/batch-05/097-canva.md` | `phase16-step16-3-canva` |
  | C | 098 | Lightroom | Photo adjustment/filtering | `GeorgeQLe/lightroom-mobile-clone` | `specs/batch-05/098-lightroom.md` | `phase16-step16-3-lightroom` |
  | D | 099 | Google Photos | Photo library/export | `GeorgeQLe/google-photos-mobile-clone` | `specs/batch-05/099-google-photos.md` | `phase16-step16-3-google-photos` |
  | E | 243 | PicCollage | Collage/layout editing | `GeorgeQLe/piccollage-mobile-clone` | `specs/batch-13/243-piccollage.md` | `phase16-step16-3-piccollage` |

  **Per-App Product Direction:**
  - CapCut-inspired product: `ClipForge`, an original timeline editor with project library, clip sequencing, trim/split, overlay text, filters, transitions, audio placeholder tracks, export job state, and explicit codec/music/template blockers.
  - Canva-inspired product: `CanvasKit`, an original design editor with templates represented by synthetic layouts, canvas layers, text/image blocks, resize/share/export flows, collaboration/account blockers, and no copied templates or brand assets.
  - Lightroom-inspired product: `ToneLab`, an original photo adjustment app with import, crop, exposure/color sliders, presets represented by original numeric recipes, before/after compare, album export, cloud/preset marketplace blockers, and no proprietary filters.
  - Google Photos-inspired product: `MemoryGrid`, an original photo-library app with local fixture albums, search facets, memories, edit/export/share states, backup/cloud/account blockers, and privacy-safe synthetic media metadata.
  - PicCollage-inspired product: `CollageBoard`, an original collage maker with grid layouts, stickers represented by simple local shapes, text/image placement, background selection, export/share, and licensed sticker/template blockers.

  **Owned Downstream Paths Per Repo:**
  - `README.md`
  - `package.json`
  - `fixtures/phase16/*.json`
  - `contracts/phase16/*.json`
  - `scripts/validate-phase16-*.mjs`
  - `variants/react-native/**`
  - `variants/expo/**`
  - `variants/flutter/**`
  - `variants/ios-native/**`
  - `variants/android-native/**`
  - `docs/implementation/phase16-step16-3.md`
  - `docs/blockers/phase16-step16-3.md`
  - `docs/validation/phase16-step16-3.md`

  **Validation Commands Per Repo:**
  - `npm run validate`
  - `npm run check:variants`
  - `npm run test:react-native`
  - `npm run test:expo`
  - `git diff --check`

  **Required Blockers To Carry Into Every Repo:**
  - Account lifecycle, subscription/payment, cloud sync, collaborative editing, backup/import/export provider behavior, and region-specific catalog or entitlement behavior.
  - Camera/photo/media permission prompts, device photo-library access, push/background export, share-sheet behavior, native file picker behavior, codec availability, hardware acceleration, GPU rendering, real-device memory/performance, and OS-specific privacy labels.
  - Licensed templates, music, fonts, stock assets, stickers, presets, filters, AI/beauty effects, branded content, proprietary algorithms, private APIs, production user data, and third-party provider credentials.
  - Flutter/iOS/Android native runner or local toolchain gaps must be recorded as explicit blockers instead of hidden failures.

- [ ] Step 16.3: Implement first Photo & Video Creation tranche across five downstream repos
  - Build all five variants for `ClipForge`, `CanvasKit`, `ToneLab`, `MemoryGrid`, and `CollageBoard` in the selected downstream repos.
  - Keep work serial in this shared tree unless a later explicit `agent-team` plan creates separate branch-backed lanes with PR consolidation. Do not use GitHub Actions.
  - For each repo, verify it is `PRIVATE`, uses `main` as the target branch, contains the copied source spec under `docs/source-specs/`, and has no `.github/workflows` path before making changes.
  - Create the implementation branch named in Step 16.2, add original synthetic fixtures/contracts, variant surfaces, validation scripts, blocker notes, and validation evidence, then open a PR to `main` or merge only when the current execution plan explicitly includes consolidation.
  - Preserve lawful scope: no original brands, logos, screenshots, proprietary media, copied templates, copyrighted presets, private APIs, production data, or provider credentials.
  - Files: modify the five downstream repos only plus `tasks/todo.md` and `tasks/history.md` in this planning repo.

  **Implementation Packet:**
  1. Start with CapCut/`ClipForge`, then Canva/`CanvasKit`, Lightroom/`ToneLab`, Google Photos/`MemoryGrid`, and PicCollage/`CollageBoard`.
  2. In each repo, create fixture data for projects/assets/layers/edits/exports and contract data for routes, entities, blocked parity, and validation expectations.
  3. Add five variant directories: React Native, Expo, Flutter, iOS Native, and Android Native. Each variant must expose the same core workflow for the app class and clearly mark native/toolchain blockers where execution cannot be proven locally.
  4. Add validator scripts and package scripts for `validate`, `check:variants`, `test:react-native`, and `test:expo`; native compile commands are optional only if the repo has a real runner baseline.
  5. Run the validation commands listed in Step 16.2 for every repo. If a command is intentionally unavailable, replace it with a documented blocker and explain why it is not executable in `docs/validation/phase16-step16-3.md`.
  6. Record benchmark or local validation score evidence for every variant. For static scaffolds, use structure/contract validation scores and avoid claiming runtime performance.
  7. Verify each branch/PR file list contains no `.github/workflows` path and every repo remains `PRIVATE`.
  8. Update this planning repo with the per-repo PR/commit/validation/blocker evidence and the next tranche plan.

  **Acceptance Criteria For Step 16.3:**
  - All five selected repos have five variant surfaces each, or explicit local/toolchain/provider/licensed-media blockers for any missing executable behavior.
  - Every selected repo has validation evidence for fixture/contract integrity and variant structure.
  - Core workflows are represented: timeline edit/export for `ClipForge`, canvas layer edit/export for `CanvasKit`, crop/filter/adjust/export for `ToneLab`, library/search/edit/export for `MemoryGrid`, and collage layout/edit/export for `CollageBoard`.
  - No downstream repo becomes public, gains GitHub Actions workflows, or claims verified provider/native parity without evidence.

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
