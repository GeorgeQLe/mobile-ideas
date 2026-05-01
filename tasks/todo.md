# Todo — Mobile Ideas

> Current phase: 8 of 8 — 1000-App Extension Pipeline (IDs 201-1000)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 8: 1000-App Extension Pipeline (IDs 201-1000)

### Goal

Extend the canonical spec store from 200 to 1000 mobile app clone ideas. IDs 201-1000 have backlog rows, canonical Draft 1 scaffold specs, and private scaffold downstream repos. Future work promotes specs to implementation-ready public-source V1 and reconciles planning queues without claiming implementation-ready parity from scaffold-only repos.

### Scope

- IDs 201-1000 in `tasks/ideas.md` (already appended).
- Spec batches: `specs/batch-11/` through `specs/batch-50/` (Draft 1 scaffolds present).
- Extend `tasks/roadmap.md` Phase 5 plan queue after readiness upgrades; keep the already-extended 1000-row `tasks/repo-seeding.md` manifest aligned with source-spec updates.
- Keep all downstream repos PRIVATE; scaffold seeding allowed at Draft 1 with no implementation-ready parity claim until Step 8.3 lands.
- Same lawful functional-parity guardrails.

### Acceptance Criteria

- [x] 800 new backlog rows exist in `tasks/ideas.md` for IDs 201-1000.
- [x] 800 new spec files exist under `specs/batch-11/` through `specs/batch-50/`.
- [x] Every new spec has exactly one H1 and canonical sections including Build Plan and Next Steps.
- [ ] IDs 101-1000 replace source-discovery links with exact first-party URLs.
- [ ] IDs 101-1000 pass implementation-readiness gate.
- [ ] Phase 5 implementation-plan queue grows to 1000 rows.
- [x] `tasks/repo-seeding.md` manifest has 1000 checked rows, each verified PRIVATE + non-empty with README and copied source spec.
- [x] No downstream repo is made public during scaffold seeding; no proprietary assets introduced.

### Execution Profile

**Parallel mode:** serial (especially for Step 8.6 seeding — required by CLAUDE.md)
**Integration owner:** main agent
**Conflict risk:** low for seeding (one repo at a time); medium for Step 8.3 (900 specs across categories)
**Review gates:** structural (one H1, canonical sections), legal scope, category-specific risk review for sensitive categories, PRIVATE visibility verification for every seeded repo

### Implementation

- [x] Step 8.1: Add 800 backlog rows for IDs 201-1000 in `tasks/ideas.md`.
- [x] Step 8.2: Create canonical Draft 1 scaffold specs under `specs/batch-11/` through `specs/batch-50/`.

- [ ] Step 8.3: Promote IDs 101-1000 from Draft 1 to implementation-ready public-source V1 (absorbs Phase 7 Step 7.3; scope = 900 specs). Run in category-coherent batches. See archived Phase 7 Step 7.3 detail in `tasks/phases/phase-7.md` for the full operation: exact-URL replacement, verified-vs-inferred discipline, depth expansion (12-18 source-backed bullets per Detailed Design / 12-16 Screen Inventory rows / 12-18 Data Model entities / 14-20 API routes / 12-18 Edge Cases / 12-18 Test Plan / 6-10 Acceptance Criteria / 6-7 Build Plan phases), Manual verification blockers per app, and category risk review (dating, finance, telehealth, kids/COPPA, family-locator, school/FERPA, etc.). Validation: every promoted spec's `Readiness status` line reads `Implementation-ready for a lawful public-source V1 clone as of YYYY-MM-DD.`; no residual `Source discovery — pending exact URL verification` strings in promoted specs. Pre-promotion audit added 2026-05-01: `node scripts/check-implementation-readiness.mjs` reported 2,904 placeholder rows across IDs 101-1000, including 504 rows in IDs 101-200. First slice completed 2026-05-01: IDs 101-106 promoted. Second slice completed 2026-05-01: IDs 107-120 (`LinkedIn` through `Substack`) promoted; post-slice audit reported 120 implementation-ready specs and 2,782 remaining placeholder rows across 880 files. Third slice completed 2026-05-01: IDs 121-136 (`Wattpad` through `Ground News`) promoted as a reading/news category batch; post-slice audit reports 136 implementation-ready specs and 2,702 remaining placeholder rows across 864 files. Fourth slice completed 2026-05-01: IDs 137-149 (`Bloomberg` through `Step`) promoted as a finance/investing/banking category batch with no-investment-advice, KYC/AML, partner-bank/FDIC/SIPC, market-data licensing, social-investing moderation, fraud/account-takeover, and child/teen account controls; post-slice audit reports 149 implementation-ready specs and 2,637 remaining placeholder rows across 851 files. Next concrete slice: promote IDs 150-157 (`GoodRx` through `Doctor On Demand`) as a pharmacy, doctor-booking, telehealth, and therapy category batch, with extra review for PHI/HIPAA posture, prescription handling, provider licensure, crisis/emergency routing, insurance claims, controlled-substance restrictions, and minor-use gates.

- [ ] Step 8.4: Extend `tasks/roadmap.md` Phase 5 plan queue to 1000 rows. Append 800 rows for IDs 201-1000 (ID | App | Source Spec | High-Level Implementation Plan). Land only after Step 8.3 lands for the corresponding ID range.

- [x] Step 8.5: Extend and verify `tasks/repo-seeding.md` Per-Repo Checklist manifest to 1000 rows. Verified 2026-05-01: 1000 checked rows, 0 unchecked rows. Audit again after Step 8.3 lands only if source spec paths or readiness labels change.

- [x] Step 8.6: Seed downstream private scaffold repos for IDs 201-1000 in serial 20-ID batches via `scripts/seed-downstream-batch.mjs`. **Complete as of 2026-05-01: IDs 201-1000 seeded (PRIVATE + non-empty verified per `tasks/repo-seeding.md` Batch evidence sections).**

  #### Completed final batch 991-1000

  - Pre-batch and post-batch `gh api rate_limit` snapshots are recorded in `tasks/repo-seeding.md`.
  - Ran `node scripts/seed-downstream-batch.mjs --from 991 --to 1000 --execute` with the rolling hourly cap enabled.
  - For each repo, the script verified: created `--private`, `visibility == PRIVATE`, `README.md` present, `docs/source-specs/NNN-<slug>.md` present, and root commit exists. Manifest rows were marked `[x]` only after verification.
  - No GitHub `403`, `429`, secondary-rate-limit, auth/permission/naming/clone-propagation/template-placeholder/non-private result occurred.
  - Appended `### Batch 991-1000 Seeding Evidence - 2026-05-01T15:29:41.931Z` to `tasks/repo-seeding.md`.
  - Commit pattern: `feat(seeding): seed private batch 991-1000`.
  - Acceptance: `grep -cE "^\| \[x\] \| (99[1-9]|1000) " tasks/repo-seeding.md` reflects 10 completions for the 991-1000 range; no new public repos.

### Reference

- Canonical spec template (implementation-ready): `specs/batch-01/001-chatgpt.md`.
- Seeding script + cadence rules: `scripts/seed-downstream-batch.mjs` and CLAUDE.md `## Downstream Repo Seeding`.
- Seeding manifest + evidence log: `tasks/repo-seeding.md`.
- Phase 7 archive (full Step 7.3 detail absorbed into Step 8.3): `tasks/phases/phase-7.md`.
- Backlog source of truth: `tasks/ideas.md` rows 201-1000.

## Development Docs Reconciliation

Resolved 2026-04-23 following `/reconcile-dev-docs`:

- **Step 7.3 absorbed into Phase 8 Step 8.3.** CLAUDE.md:41 allows planning/scaffold seeding at Draft 1; downstream repos for IDs 101-1000 do not claim implementation-ready parity. Step 8.3 now covers IDs 101-1000 (900 specs) in one pass.
- **Phase 6 stays Complete** (original 100-repo scope). Post-100 seeding accounted for under Phase 7 Step 7.5 (101-200, done) and Phase 8 Step 8.6 (201-1000, completed at 1000/1000 as of 2026-05-01).
- **Duplicate Phase 6 block in `tasks/roadmap.md` collapsed.**
- **`tasks/todoist-downstream-build-plan.md` kept as Phase 4 pilot artifact**; per-repo build plans live in each downstream repo's `docs/plans/README.md`.

Remaining open:

- **`tasks/implementation-readiness.md` counts.** Refresh when Step 8.3 lands in category batches.
- **Phase 8 Step 8.6 progress tracking.** Completed in this todo.md; remaining Phase 8 work is implementation-readiness promotion and plan-queue reconciliation.
