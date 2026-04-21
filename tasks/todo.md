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

- [x] Step 7.2: Draft 1 canonical normalization for IDs 101-200 (landed 2026-04-21)
  - All 100 placeholders under `specs/batch-06/` through `specs/batch-10/` rewritten to canonical Draft 1 matching `specs/batch-01/001-chatgpt.md` structure; metadata block now reads `Readiness status: Draft 1` with Verification basis + Manual verification blockers + Legal scope; all 18 sections populated at target depth (8-12 journeys/screens/entities/edge cases, 10-15 API routes, etc.); files land in the 150-220 line range.
  - Category risk notes applied: dating (101-106), finance/investing/banking (137-149), telehealth/therapy (153-157), wellness/health (158-162), cycle/pregnancy (161-164), family locator/parental controls (166-169), kids-directed (163, 174-179).
  - Research Sources use plausible discovery URLs marked "Source discovery — pending exact URL verification" — exact URL replacement deferred to Step 7.3.
  - Validation passed: one H1 per file, 18 H2 sections per file, no `^TODO` lines remaining, `Readiness status: Draft 1` in every metadata block.
  - Commits: `feat(specs): canonical Draft 1 for batch-06 (IDs 101-120)` … `feat(specs): canonical Draft 1 for batch-10 (IDs 181-200)` (five commits).
  - Updated `specs/README.md` (Readiness column flipped to "Draft 1 canonical" for batches 06-10; metadata, overview, test plan, acceptance criteria refreshed) and `tasks/spec-quality-audit.md` (resolved Draft 0 Gap finding; opened Implementation-Readiness Gap finding for Step 7.3).

- [ ] Step 7.3: Implementation-readiness upgrades for IDs 101-200 (next concrete action)
  - Files: modify all 100 Draft 1 spec files under `specs/batch-06/` through `specs/batch-10/`; update `tasks/implementation-readiness.md` metrics; optionally archive Draft 1 copies under `specs/archive/` if that convention is in use.
  - Goal: upgrade each spec from canonical Draft 1 (Step 7.2) to implementation-ready public-source V1, matching the quality bar of IDs 001-100 in batches 01-05.
  - Exact-URL replacement: In each spec's Research Sources table, replace every "Source discovery — pending exact URL verification" row with the exact first-party URL (Apple App Store listing with canonical bundle id, Google Play listing with canonical package id, company help/support articles that back specific feature claims, privacy policy, terms of use, usage/safety/community policies, developer/API docs where applicable). Include at least 6-12 exact-URL source rows per spec, matching the `specs/batch-01/001-chatgpt.md` pattern (11 source rows).
  - Verified vs inferred: every requirement bullet under Detailed Design must either cite the first-party source backing it (verified) or be explicitly framed as `inferred from public behavior` with a corresponding Open Question. Use the source table as the authority; when a claim has no source row, downgrade it to inferred or drop it.
  - Depth expansion: grow each spec's Detailed Design (12-18 source-backed requirement bullets), Screen Inventory (12-16 rows), Data Model (12-18 entities), API And Backend Contracts (14-20 routes), Edge Cases (12-18 bullets), Test Plan (12-18 bullets), Acceptance Criteria (6-10 bullets), and Build Plan (6-7 phases with explicit manual verification gate). Target line count per file: 200-260 (like batch-01 exemplars).
  - Manual verification blockers: make the metadata `Manual verification blockers` line app-specific. For each app, list which native/paid/account/hardware/region/support flows remain unverified and cannot be claimed as one-for-one parity until hands-on evidence arrives.
  - Category risk review (full, not just notes):
    - Dating (101-106): minor protection gate, age verification, non-consensual-imagery policy, doxxing/stalking controls, photo content policy, block/report/unmatch state machine, hidden/incognito mode, sensitive-message scanning with explicit opt-in, harassment escalation/owner path.
    - Finance/investing/banking (137-149): no-investment-advice disclaimers, KYC/AML flows with vendor partner (e.g., Alloy/Persona-equivalent — keep vendor-agnostic), market-data licensing, SEC/FINRA-adjacent framing (no advisor status implication), FDIC/banking-partner disclosure copy, fraud/account-takeover controls; for 148-149 kids/teen banking, add COPPA-adjacent + parental-consent review; for 139-140 social investing, add insider-trading/market-abuse moderation policy.
    - Pharmacy/doctor booking (150-152): prescription PHI handling, controlled-substance indicators, insurance eligibility verification, review/defamation moderation, no-medical-advice framing.
    - Telehealth/therapy (153-157): HIPAA posture, state-by-state licensure enforcement, "not for emergencies — call 911" redirect copy, crisis/self-harm escalation path, controlled-substance telehealth-prescribing regulations, data-residency for health records, minor-use gating, PHI audit logs, BAA coverage for subprocessors, insurance-claim handling.
    - Wellness/health trackers (158-162): explicit "not a medical device" framing, HealthKit/Health Connect scope minimization, mic/biometric consent, heart-rate/temperature data privacy, partner-sharing opt-in.
    - Cycle/pregnancy (161-164): post-Dobbs data-disclosure stance (minimize retention; no LEO disclosure without process), local-first storage preference, pregnancy-loss/crisis copy, minor-use gating.
    - Family locator/parental controls (166-169): child consent/assent, parental consent gate, no covert monitoring (device-owner disclosure), precise-location minimization, COPPA-adjacent review for <13, domestic-abuse threat model (monitored user can see + exit).
    - School apps (170-173): FERPA posture, student-data privacy, district/admin gating, teacher/parent/student role separation, no advertising to students.
    - Kids-directed (163, 174-179): COPPA scope, no third-party advertising/behavioral tracking for <13, parental-consent flows, age-gate, content moderation, limited data collection, explicit launch-blocking COPPA review gate.
    - Transcription/writing/dev-tools enterprise surfaces (185-186, 187-191): SSO/SCIM, audit logs, secrets redaction, subprocessor list, "all participants consent" disclosure for meeting capture.
  - Blocker marking: every blocked flow listed in Manual verification blockers must have a named owner (e.g., "billing owner", "safety/security lead", "accessibility owner") and an acceptance-test blocker or feature-flag path before launch, mirroring the pattern in `001-chatgpt.md`.
  - Validation:
    - `awk` H1 count: exactly 1 per file.
    - `grep` canonical sections: all 18 present per file.
    - No remaining "Source discovery — pending exact URL verification" strings in any Research Sources row.
    - Every `Readiness status` line reads `Readiness status: Implementation-ready for a lawful public-source V1 clone as of YYYY-MM-DD.`
    - Spot-check three files per category (one dating, one finance, one telehealth, one kids) for category-risk coverage parity with batch-01 exemplars.
  - Commit strategy: one commit per batch — `feat(specs): implementation-ready batch-06 (IDs 101-120)` … `feat(specs): implementation-ready batch-10 (IDs 181-200)`. Depending on volume, finer-grained per-subcategory commits are acceptable (e.g., dating subset, real-estate subset).
  - Post-land updates:
    - `specs/README.md`: flip Readiness column for batches 06-10 from "Draft 1 canonical" to "Implementation-ready V1"; bump metadata/overview/test plan/acceptance criteria to reflect 200 implementation-ready specs.
    - `tasks/spec-quality-audit.md`: resolve the "Implementation-Readiness Gap For IDs 101-200" finding; bump implementation-ready count from 100 to 200; refresh metrics summary; restate remaining gap as "hands-on verification remains blocked" only (matches the existing 001-100 residual).
    - `tasks/implementation-readiness.md`: if the file enumerates implementation-ready apps, append the 100 new rows.
  - Execution profile: fan out across 5 batch-scoped subagents (one per batch-06…batch-10) in parallel — same pattern used in Step 7.2. Each subagent needs a canonical reference (`specs/batch-01/001-chatgpt.md`) plus a category-coherent adjacent Draft 1 (e.g., `specs/batch-06/101-tinder.md` for the Step 7.3 dating upgrades). Expect each subagent to touch 20 files and take 1-2 usage-limit rounds.

  ### Ship-One-Step Handoff Contract (for Step 7.3)

  The next clear-context session should:
  1. Implement **only Step 7.3** (upgrade all 100 IDs 101-200 Draft 1 specs to implementation-ready public-source V1; update `specs/README.md` readiness column; update `tasks/spec-quality-audit.md`; update `tasks/implementation-readiness.md` if it tracks per-app rows).
  2. Validate via the rules listed above (one H1 per file, all 18 sections, no residual discovery-URL placeholders, `Readiness status: Implementation-ready …` in every metadata block, exact-URL source rows present).
  3. Check Step 7.3 off in `tasks/todo.md`; append a Step 7.3 entry to `tasks/history.md`.
  4. `/commit-and-push-by-feature` onto `main` (one commit per batch or per subcategory is fine).
  5. No deploy contract applies — skip deploy.
  6. Write Step 7.4's plan into `tasks/todo.md` (extend Phase 5 plan queue and repo-seeding manifest to 200 rows).
  7. Ensure `.claude/settings.local.json` still has `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"`.
  8. Call `EnterPlanMode`, write a brief pass-through plan referencing `tasks/todo.md`, call `ExitPlanMode`, and stop.

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

## Phase 8: 1000-App Extension Pipeline (IDs 201-1000)

### Goal

Extend the canonical spec store from 200 to 1000 mobile app clone ideas. IDs 201-1000 now have backlog rows and canonical Draft 1 scaffold specs; future work promotes them to implementation-ready public-source V1 and then extends downstream planning/seeding manifests.

### Acceptance Criteria

- [x] 800 new backlog rows exist in `tasks/ideas.md` for IDs 201-1000.
- [x] 800 new spec files exist under `specs/batch-11/` through `specs/batch-50/`.
- [x] Every new spec has exactly one H1 and canonical sections including Build Plan and Next Steps.
- [ ] IDs 201-1000 replace source-discovery links with exact first-party URLs.
- [ ] IDs 201-1000 pass implementation-readiness gate.
- [ ] Phase 5 implementation-plan queue grows to 1000 rows.
- [ ] `tasks/repo-seeding.md` manifest grows to 1000 rows after readiness upgrades.
- [ ] No downstream repo is made public; no proprietary assets introduced.

### Next Concrete Action

Promote batches 11-50 from Draft 1 scaffold to implementation-ready public-source V1 in controlled category batches. Do not begin remote downstream seeding for IDs 201-1000 until exact-source verification and manifest extension are complete.
