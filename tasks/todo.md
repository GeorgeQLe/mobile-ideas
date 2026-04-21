# Todo — Mobile Ideas

> Current phase: 7 of 7 — Backlog Extension Pipeline (IDs 101-200)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 7: Backlog Extension Pipeline (IDs 101-200)

### Goal

Extend the canonical spec store with a second 100 clone-spec ideas (IDs 101-200) added to `tasks/ideas.md` on 2026-04-20. Take those ideas through the same six-phase pipeline previously applied to IDs 001-100: Draft 0 placeholder specs → Draft 1 canonical normalization → Implementation-readiness upgrade → (optional pilot) → Phase 5 high-level plan extension → downstream repo seeding. The spec store itself is already public; this phase extends its scope.

### Scope

- IDs 101-200 in `tasks/ideas.md` (already appended).
- New spec batches: `specs/batch-06/` through `specs/batch-10/` (20 specs per batch by convention).
- Extend `tasks/roadmap.md` Phase 5 table and `tasks/repo-seeding.md` manifest with 100 new rows only after readiness upgrades land.
- Keep all downstream repos PRIVATE on seeding; spec store remains PUBLIC.
- Same lawful functional-parity guardrails as the first 100.

### Acceptance Criteria

- [ ] 100 Draft 0 spec files exist under `specs/batch-06/` through `specs/batch-10/` with stable IDs and one H1 each.
- [ ] All 100 extension specs pass canonical Draft 1 normalization.
- [ ] All 100 extension specs pass the implementation-readiness gate.
- [ ] `tasks/roadmap.md` Phase 5 table grows from 100 to 200 rows.
- [ ] `tasks/repo-seeding.md` manifest grows from 100 to 200 rows; all 200 downstream repos exist privately or have explicit blocker notes.
- [ ] No downstream repo is made public; no proprietary assets introduced.

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** medium (100 new spec files, but each file is independent)
**Review gates:** structural (one H1, canonical sections), legal scope, non-affiliation language

**Subagent lanes:** none for Draft 0; later phases may fan out by batch.

### Implementation

- [ ] Step 7.1: Create Draft 0 placeholder specs for IDs 101-200
  - Files: create 100 new files under `specs/batch-06/` through `specs/batch-10/` (20 per batch)
  - File naming: `NNN-<kebab-slug>.md` matching the inspiration name column in `tasks/ideas.md` (e.g., `specs/batch-06/101-tinder.md`, `specs/batch-10/200-alltrails.md`)
  - Each file: one H1 (`# <Inspiration>-Style Clone Spec`), one-paragraph summary referencing `tasks/ideas.md` row, and placeholder canonical sections (Overview, Goals, Non-Goals, Research Sources, Detailed Design, Core User Journeys, Screen Inventory, Data Model, API And Backend Contracts, Realtime/Push/Offline Behavior, Permissions/Privacy/Safety, Analytics And Monetization, Edge Cases, Test Plan, Acceptance Criteria, Open Questions, Build Plan, Next Steps). Mark `> Readiness status: Draft 0` and leave substantive content as TODO lines — Draft 1 will populate them in Step 7.2.
  - Update `specs/README.md` to list batches 06-10 in the index.
  - Update `tasks/spec-quality-audit.md` to record Draft 0 gaps for IDs 101-200 (mirroring the original 001-100 audit structure).
  - Commit as `feat(specs): add Draft 0 placeholders for IDs 101-200 (batches 06-10)`.
  - Acceptance: `ls specs/batch-0{6,7,8,9}/ specs/batch-10/` shows 20 files each; every file has exactly one H1; every ID 101-200 is present.

- [ ] Step 7.2: Draft 1 canonical normalization for IDs 101-200
  - Files: modify all 100 new spec files
  - Rewrite each to the canonical structure used across batches 01-05. Include metadata block (Inspiration, Category, Readiness status, Verification basis, Manual verification blockers, Legal scope). Every section fully present, even if content is still inferred-only.
  - Validate: one H1 per file, no missing IDs 101-200, every file has Research Sources + Open Questions + Next Steps.
  - Commit as `feat(specs): canonical Draft 1 for IDs 101-200`.

- [ ] Step 7.3: Implementation-readiness upgrades for IDs 101-200
  - Files: modify all 100 new spec files; update `tasks/implementation-readiness.md`
  - Replace any discovery links with exact first-party URLs.
  - Distinguish verified vs inferred behavior. Enumerate screens, entities, API routes, permissions, subscription states, edge cases, analytics events, test matrix, build-plan phases.
  - Add category risk notes (dating/finance/health/kids categories are heavily represented — flag child-directed and health-adjacent apps for category-specific risk review).
  - Mark blocked flows with owner/path.
  - Commit in batches (one commit per batch-06…batch-10 recommended): `feat(specs): implementation-ready batch-NN (IDs XXX-YYY)`.

- [ ] Step 7.4: Extend Phase 5 plan queue and repo-seeding manifest
  - Files: modify `tasks/roadmap.md`, `tasks/repo-seeding.md`
  - Append 100 rows to the Phase 5 table (ID | App | Source Spec | High-Level Implementation Plan).
  - Append 100 rows to `tasks/repo-seeding.md` Per-Repo Checklist table: `| [ ] | NNN | <App> | GeorgeQLe/<slug>-mobile-clone | specs/batch-XX/NNN-<slug>.md |`.
  - Commit as `feat(seeding): extend Phase 5 queue and repo-seeding manifest to IDs 101-200`.

- [ ] Step 7.5: Seed downstream private repos for IDs 101-200
  - Run `scripts/seed-downstream-repos.mjs` one target at a time (batch tool is intentionally single-target).
  - Stop on any auth/permission/naming/rate-limit/template failure; record blockers.
  - Every repo created `--private`; refuse any public flag.
  - Append a `### Batch 101-200 Seeding Evidence` section to `tasks/repo-seeding.md` with per-repo URL and commit SHA.
  - Commit progress incrementally.

- [ ] Step 7.6: Verify Phase 7 completion
  - 100 new private downstream repos exist or have explicit blockers.
  - No downstream repo public. No proprietary assets seeded.
  - Close Phase 7 in `tasks/roadmap.md` and update `tasks/history.md`.

### Ship-One-Step Handoff Contract

The next clear-context session should:
1. Implement **only Step 7.1** (create 100 Draft 0 stubs, update `specs/README.md`, update `tasks/spec-quality-audit.md`).
2. Validate: `find specs/batch-0{6,7,8,9} specs/batch-10 -name '*.md' | wc -l` returns 100; every file has exactly one H1.
3. Check Step 7.1 off in `tasks/todo.md`; append an entry to `tasks/history.md`.
4. `/commit-and-push-by-feature` onto `main`.
5. No deploy contract applies — skip deploy.
6. Write Step 7.2's plan into `tasks/todo.md`.
7. Ensure `.claude/settings.local.json` has `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"`.
8. Call `EnterPlanMode`, write a brief pass-through plan referencing `tasks/todo.md`, call `ExitPlanMode`, and stop.

### Reference

- Canonical spec template: see any of `specs/batch-01/*.md` through `specs/batch-05/*.md` for implementation-ready structure; `specs/batch-01/001-chatgpt.md` is the pilot reference.
- Backlog source of truth: `tasks/ideas.md` rows 101-200.
- Prior phase archives: `tasks/phases/phase-4.md`, `tasks/phases/phase-6.md`.
