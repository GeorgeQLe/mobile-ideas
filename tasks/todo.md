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

- [ ] Step 8.3: Promote IDs 101-1000 from Draft 1 to implementation-ready public-source V1 (absorbs Phase 7 Step 7.3; scope = 900 specs). Run in category-coherent batches. See archived Phase 7 Step 7.3 detail in `tasks/phases/phase-7.md` for the full operation: exact-URL replacement, verified-vs-inferred discipline, depth expansion, Manual verification blockers per app, and category risk review. Validation: every promoted spec's `Readiness status` line reads `Implementation-ready for a lawful public-source V1 clone as of YYYY-MM-DD.`; no residual `Source discovery -- pending exact URL verification` strings in promoted specs. Progress through 2026-05-05: IDs 101-860 promoted; post-slice audit reports 860 implementation-ready specs and 140 remaining Draft 1 placeholder rows. Latest slice completed: IDs 841-860 (`Hootsuite` through `Netlify`) promoted across social-media-management (841-844), developer-platform (845-848), developer-community (849-853), and cloud-infrastructure (854-860) sub-categories spanning Enterprise operations and Developer tools categories. The slice preserved multi-platform social publishing with content calendar and queue scheduling, unified social inbox and stream monitoring, social analytics and engagement reporting, Linkin.bio/Start Page link-in-bio, social listening and hashtag suggestions, repository browsing with merge/pull request management, CI/CD pipeline monitoring and job logs, issue tracking and kanban boards, API request builder with collections and environments, cloud development sandboxes and DevBoxes, Q&A with reputation and badge systems, developer blogging with Markdown editors and custom domains, product launch discovery and upvoting, technology news aggregation and comment threading, cloud VM/container/database provisioning and management, infrastructure monitoring and alerting, deployment dashboards with preview URLs and rollbacks, billing and cost management, and platform-specific OAuth/SSO/SAML/SCIM provisioning. Next concrete slice: promote IDs 861-880 from `tasks/ideas.md`, replacing source-discovery placeholders with exact first-party URLs.

#### Next-Step Plan: Promote IDs 861-880 (Batch 44)

**What:** Create `scripts/promote-batch-44-specs.mjs` following the established pattern (batch 40/41/42/43 scripts). Run it to overwrite 20 Draft 1 scaffolds in `specs/batch-44/` with implementation-ready V1 specs. Validate and update this progress note.

**Apps and sub-categories:**
- **Observability/incident management** (861-866): Sentry, Datadog, PagerDuty, Opsgenie, Grafana, New Relic — category "Developer tools"
- **Mobile development tools** (867-871): Expo Go, Termius, Blink Shell, Working Copy, Code App — category "Developer tools"
- **News** (872-880): CNN, BBC News, The Guardian, Reuters, AP News, NPR, The Wall Street Journal, Financial Times, The Washington Post — category "News"

**Files affected:**
- `scripts/promote-batch-44-specs.mjs` (new)
- `specs/batch-44/861-sentry.md` through `specs/batch-44/880-the-washington-post.md` (20 files overwritten)
- `tasks/todo.md` (Step 8.3 progress note update to 880 promoted)
- `tasks/history.md` (session record)

**Key technical decisions:**
- `screenRows()` needs three sub-category variants: observability-incident, mobile-dev-tools, news
- `risk()` returns category-appropriate risk areas for each sub-category
- Each app gets app-specific `focus`, `blockers`, and `sources` with exact first-party URLs (App Store, Google Play, official site, help, privacy, terms)
- Observability apps need error/alert/incident/metrics screen inventory (issues, alerts, dashboards, on-call)
- Mobile dev tools need terminal/editor/repository/preview screen inventory (sessions, files, repos, builds)
- News apps need article/feed/section/saved screen inventory (headlines, sections, articles, saved, audio/video)

**Execution profile:** serial, implementation-safe, main agent

**Validation:**
```
grep -rl "Source discovery" specs/batch-44/*.md | wc -l  # expect 0
grep -l "Implementation-ready" specs/batch-44/*.md | wc -l  # expect 20
for f in specs/batch-44/[0-9]*.md; do count=$(grep -c "^# " "$f"); [ "$count" -ne 1 ] && echo "FAIL: $f has $count H1s"; done
```

**Acceptance criteria:** 20 specs pass validation (one H1, implementation-ready status, no source-discovery residue, canonical sections present), todo.md progress updated to 880.

**Ship-one-step handoff contract:** After implementing this step, validate it, mark the Step 8.3 progress note updated, update `tasks/history.md`, commit and push the completed work, write the following step's plan (IDs 881-900), ensure `.claude/settings.local.json` has `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"`, start the approval UI for that following step by calling `EnterPlanMode` first, write a brief pass-through plan in plan mode, call `ExitPlanMode`, and stop before implementing it.

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
