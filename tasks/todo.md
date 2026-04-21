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

- [x] Step 7.1: Create Draft 0 placeholder specs for IDs 101-200
  - Files: created 100 new files under `specs/batch-06/` through `specs/batch-10/` (20 per batch).
  - File naming: `NNN-<kebab-slug>.md` matching `tasks/ideas.md` rows 101-200 (e.g., `specs/batch-06/101-tinder.md` … `specs/batch-10/200-alltrails.md`).
  - Each file: one H1 (`# <Inspiration>-Style Clone Spec`), metadata block (`> Inspiration`, `> Category`, `> Readiness status: Draft 0`, `> Legal scope: functional parity only …`), one short summary paragraph pointing back at the `tasks/ideas.md` row, and TODO placeholders under all 18 canonical section headings (Overview, Goals, Non-Goals, Research Sources, Detailed Design, Core User Journeys, Screen Inventory, Data Model, API And Backend Contracts, Realtime/Push/Offline Behavior, Permissions/Privacy/Safety, Analytics And Monetization, Edge Cases, Test Plan, Acceptance Criteria, Open Questions, Build Plan, Next Steps). Step 7.2 will populate the bodies.
  - Updated `specs/README.md` to list batches 06-10 in the batch index, expand coverage from 100 to 200, and split readiness status across implementation-ready (001-100) vs Draft 0 (101-200).
  - Updated `tasks/spec-quality-audit.md` with a new "Draft 0 Gap For IDs 101-200" finding mirroring the original 001-100 audit structure; metrics summary now reports 200 specs total with 100 still at Draft 0.
  - Acceptance verified: `find specs/batch-06 specs/batch-07 specs/batch-08 specs/batch-09 specs/batch-10 -name '*.md' | wc -l` → 100; `awk '/^# / {c[FILENAME]++} END {for (f in c) if (c[f]!=1) print}'` over those files prints nothing (every file has exactly one H1); each batch directory has 20 files; every ID 101-200 is present.
  - Commit: `feat(specs): add Draft 0 placeholders for IDs 101-200 (batches 06-10)`.

- [ ] Step 7.2: Draft 1 canonical normalization for IDs 101-200 (next concrete action)
  - Files: rewrite all 100 spec files under `specs/batch-06/` through `specs/batch-10/` from Draft 0 placeholders into canonical Draft 1.
  - Reference template: any of `specs/batch-01/*.md` through `specs/batch-05/*.md`. The pilot reference is `specs/batch-01/001-chatgpt.md`. Match its structure exactly: one H1 (`# <Inspiration>-Style Clone Spec`), then a metadata block with `> Inspiration app`, `> Category`, `> Readiness status: Draft 1`, `> Verification basis`, `> Manual verification blockers`, `> Legal scope`. Then all 18 canonical sections, each with substantive (not TODO) content even where it remains inferred-only.
  - Per file, populate at minimum: Overview paragraph naming the inspiration and the category-specific job-to-be-done; Goals (5-8 bullets); Non-Goals (4-6 bullets); Research Sources table with at least 3-5 source-discovery rows pointing at the public marketplace listing, the company help center, and the company privacy/legal page (exact first-party URL replacement is deferred to Step 7.3 — Step 7.2 may use plausible discovery URLs and mark them); Detailed Design with source-backed product requirement bullets; Core User Journeys (8-12 bullets); Screen Inventory table (8-12 rows with Screen | Purpose | Inputs | States | Edge Cases); Data Model (8-12 entity bullets); API And Backend Contracts (10-15 route bullets); Realtime/Push/Offline Behavior (5-8 bullets); Permissions/Privacy/Safety (6-10 bullets, with category-specific risk notes for dating/finance/health/kids); Analytics And Monetization (5-8 bullets); Edge Cases (8-12 bullets); Test Plan (8-12 bullets); Acceptance Criteria (5-8 bullets); Open Questions (4-8 bullets); Build Plan (5-7 phases); Next Steps (3-5 bullets).
  - Category risk routing for Step 7.2: dating apps (101-106), telehealth/therapy (153-157), wellness/health trackers (158-162), kids/parental (163-179), and finance/investing/banking (137-149) must each carry a category-specific risk note in Permissions/Privacy/Safety even at Draft 1 (Step 7.3 will add the full review).
  - Avoid inventing proprietary behavior. Where verification is impossible from public sources, write the requirement as inferred and add an Open Question — do not assert one-for-one parity. Never copy proprietary copy, screenshots, logos, private API behavior, or paywalled content.
  - Validate: every file has exactly one H1; every file has all 18 canonical section headings; every file has Research Sources + Open Questions + Next Steps with non-empty content; every metadata block reads `Readiness status: Draft 1`; no `TODO` placeholders remain in section bodies.
  - Commit strategy: one commit per batch is recommended (`feat(specs): canonical Draft 1 for batch-06 (IDs 101-120)` … `… batch-10 (IDs 181-200)`) since 100 file rewrites in one commit is unwieldy. Final summary commit may follow if needed.
  - Update `tasks/spec-quality-audit.md` after Step 7.2 lands: bump Draft 1-passing count from 100 to 200, downgrade the "Draft 0 Gap For IDs 101-200" finding to "Resolved", and restate the remaining gap as "implementation-readiness pending (Step 7.3)".

  ### Ship-One-Step Handoff Contract (for Step 7.2)

  The next clear-context session should:
  1. Implement **only Step 7.2** (rewrite all 100 IDs 101-200 placeholders into canonical Draft 1; update `specs/README.md` readiness column; update `tasks/spec-quality-audit.md`).
  2. Validate via the rules listed above (one H1 per file, all 18 sections, no TODOs left, `Readiness status: Draft 1` everywhere).
  3. Check Step 7.2 off in `tasks/todo.md`; append a Step 7.2 entry to `tasks/history.md`.
  4. `/commit-and-push-by-feature` onto `main` (one commit per batch is fine).
  5. No deploy contract applies — skip deploy.
  6. Write Step 7.3's plan into `tasks/todo.md`.
  7. Ensure `.claude/settings.local.json` has `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"` (already present).
  8. Call `EnterPlanMode`, write a brief pass-through plan referencing `tasks/todo.md`, call `ExitPlanMode`, and stop.

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

### Reference

- Canonical spec template: see any of `specs/batch-01/*.md` through `specs/batch-05/*.md` for implementation-ready structure; `specs/batch-01/001-chatgpt.md` is the pilot reference.
- Backlog source of truth: `tasks/ideas.md` rows 101-200.
- Prior phase archives: `tasks/phases/phase-4.md`, `tasks/phases/phase-6.md`.
