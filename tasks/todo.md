# Todo — Mobile Ideas

> Current phase: 6 of 6 — Downstream Repository Seeding And Spec Store Publication
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 6: Downstream Repository Seeding And Spec Store Publication

### Goal

Create one GitHub repository per clone implementation target using `gh`, seed each repository with its source spec and minimal implementation-planning docs, and keep this repository as the public canonical spec store once the legal/open-source audit is complete.

### Scope

- Use `tasks/repo-seeding.md` as the operational checklist and manifest for all 100 downstream repositories.
- Create downstream repos as private first unless a repo has completed legal/name/license review and the user explicitly approves public visibility.
- Seed each downstream repo with source-spec docs, source-store backlink, legal/non-affiliation notice, original-assets requirement, and an empty implementation task scaffold.
- Keep this repository code-free and authoritative for specs, readiness status, source links, blockers, and public-source V1 scope.
- Prepare this spec store for open-source publication with license, README, contribution guidance, disclaimers, and a final check for secrets, copied assets, proprietary content, and ambiguous affiliation language.

### Acceptance Criteria

- [x] `tasks/repo-seeding.md` lists all 100 target repos and source specs.
- [x] A reusable `gh` seeding command pattern exists.
- [x] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [x] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [x] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [x] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** high
**Review gates:** correctness, security, docs/API conformance

**Subagent lanes:** none

### Implementation

- [x] Step 6.1: Audit the current repo-seeding contract and choose the dry-run target
  - Files: modify `tasks/repo-seeding.md`
  - Confirm the manifest still lists 100 target repos, exactly one checked existing repo, and source specs that exist under `specs/`.
  - Select one low-risk non-Todoist dry-run target, preferably a productivity or notes app, and record why it is safe to test privately.
  - Add a status/log section for dry-run evidence, batch progress, failures, blockers, and explicit decisions to keep repos private.

- [x] Step 6.2: Add reusable downstream seed templates
  - Files: create `templates/downstream/README.md`, create `templates/downstream/docs/plans/README.md`, create `templates/downstream/tasks/roadmap.md`, create `templates/downstream/tasks/todo.md`, create `templates/downstream/.gitignore`
  - Templates must use placeholders for app ID, app name, target repo, source spec path, source spec-store URL, non-affiliation language, legal scope, original-assets requirement, and manual verification blockers.
  - Templates must not include proprietary names as project branding, copied app-store media, screenshots, logos, private API language, production credentials, or real user data.
  - Prepared execution notes: use `tasks/repo-seeding.md` as the source for required placeholders and preserve the selected dry-run target, `GeorgeQLe/evernote-mobile-clone`, for later Step 6.5 execution.
  - The templates should be generic enough for all 100 manifest rows and should not hard-code Evernote, Todoist, or any inspiration-app brand as the downstream project identity.

- [x] Step 6.3: Add the local seeding utility and dry-run mode
  - Files: create `scripts/seed-downstream-repos.mjs`, modify `tasks/repo-seeding.md`
  - Parse the `tasks/repo-seeding.md` manifest and support a single-target dry run before any batch creation.
  - Generate seed files from `templates/downstream/`, copy the selected source spec into `docs/source-specs/`, and print the exact `gh` commands before executing them.
  - Default to private repos, refuse public creation, skip existing repos unless `--reconcile-existing` is provided, and write blocker evidence back to `tasks/repo-seeding.md`.
  - Prepared execution plan:
    - Read the per-repo manifest table from `tasks/repo-seeding.md` using a strict Markdown-table parser for the `Done`, `ID`, `App`, `Target Repo`, and `Source Spec` columns.
    - Validate that every selected manifest row has an existing source spec under `specs/` and that the target repo is under the expected owner/repo form.
    - Render every file under `templates/downstream/` by replacing the required placeholders: app ID, app name, project name, project summary, target repo, source spec path, source spec filename, source spec-store URL, non-affiliation notice, legal scope, original-assets requirement, and manual verification blockers.
    - For `--dry-run`, write generated output to a temporary local preview directory or print a file manifest without running `gh`, then record dry-run evidence in `tasks/repo-seeding.md`.
    - For execution mode, require an explicit single target first, run `gh repo create ... --private --clone=false`, clone the private repo, add rendered files plus `docs/source-specs/<source-spec>`, commit, and push.
    - Refuse `--public`, refuse missing placeholders, refuse target repos that already exist unless `--reconcile-existing` is passed, and record authentication, permission, naming, rate-limit, template, or source-spec failures as blockers in `tasks/repo-seeding.md`.
    - Preserve `GeorgeQLe/evernote-mobile-clone` from `specs/batch-05/093-evernote.md` as the selected Step 6.5 dry-run target; do not create it in Step 6.3 unless the step explicitly advances into execution.

- [x] Step 6.4: Prepare this spec store for public release review
  - Files: create `README.md`, create `LICENSE`, create `CONTRIBUTING.md`, create `SECURITY.md`, modify `tasks/repo-seeding.md`
  - Document the repo purpose, lawful functional-parity scope, non-affiliation language, source/spec map, no-proprietary-assets rule, contribution expectations, source-correction process, manual verification evidence policy, and downstream repo linkage policy.
  - Keep the repository private until the manual approval task is complete.
  - Prepared execution plan:
    - Create a root `README.md` for public readers that explains this repository is a canonical spec store, not an implementation app; links to `specs/`, `tasks/repo-seeding.md`, and downstream private repos when available; defines "clone" as lawful functional-parity research; states all downstream repos remain private until legal/name/license review; and includes explicit non-affiliation and no-proprietary-assets language.
    - Create a root `LICENSE` appropriate for documentation/spec content. If no stronger project-specific requirement appears, prefer a clear documentation-friendly license and note that third-party trademarks, brand names, source-app marks, screenshots, logos, proprietary media, and external source material are not licensed by this repo.
    - Create `CONTRIBUTING.md` with rules for source corrections, exact first-party URL updates, manual verification evidence, privacy-preserving notes, no copied assets, no private APIs, no production data, and downstream implementation link submissions.
    - Create `SECURITY.md` explaining how to report secrets, private data, copied assets, unsafe affiliation language, proprietary/API leakage, or downstream seeding mistakes without opening public issues containing sensitive details.
    - Update `tasks/repo-seeding.md` by checking or adding public-release checklist evidence for README, license, contribution policy, security/contact policy, legal scope, attribution/non-affiliation language, downstream linkage, and content-audit status.
    - Do not make `GeorgeQLe/mobile-ideas` public in this step; publication remains blocked until Step 6.9 and the manual approval task are complete.

- [x] Step 6.5: Run one private non-Todoist dry-run seed
  - Files: modify `tasks/repo-seeding.md`
  - Verify `gh auth status`; if authentication fails, pause for the manual auth task instead of working around it.
  - Run the seeding utility against the selected dry-run target with private visibility.
  - Record the created repo URL, seeded files, commit SHA if available, and any blocker notes in `tasks/repo-seeding.md`.
  - Prepared execution plan:
    - Confirm the selected dry-run target is still `GeorgeQLe/evernote-mobile-clone` with source spec `specs/batch-05/093-evernote.md` in `tasks/repo-seeding.md`.
    - Run `gh auth status`. If it fails, stop and report the manual task in `tasks/manual-todo.md`: complete GitHub CLI authentication with `gh auth login`.
    - Run `node scripts/seed-downstream-repos.mjs --target 093 --execute` from the spec-store repo.
    - Confirm the utility creates a private repo only, seeds `.gitignore`, `README.md`, `docs/plans/README.md`, `docs/source-specs/093-evernote.md`, `tasks/roadmap.md`, and `tasks/todo.md`, commits the seed files, and pushes to the downstream repo.
    - Update `tasks/repo-seeding.md` with the created repo URL, seeded file list, downstream commit SHA if the utility reports one, privacy status, and any blocker notes.
    - Check off the dry-run batch item and the acceptance criterion for testing the `gh` seeding command pattern on one non-Todoist repo only if the private downstream repo is created and seeded successfully.
    - Do not create any additional downstream repos, do not reconcile Todoist yet, and do not make any repo public in Step 6.5.
  - Blocked execution note - 2026-04-20 (resolved):
    - Initial attempt `node scripts/seed-downstream-repos.mjs --target 093 --execute --clone-dir /tmp/evernote-mobile-clone` failed: top-level `gh auth status` passed but the utility's internal check reported an invalid default token, so no repo was created.
  - Rerun - 2026-04-20:
    - After completing the `gh auth login` manual task, reran `node scripts/seed-downstream-repos.mjs --target 093 --execute` from the spec-store repo.
    - Result: private `GeorgeQLe/evernote-mobile-clone` created, seeded with the six templated files plus `docs/source-specs/093-evernote.md`, root commit `278b06d` pushed to `origin/main`.
    - Post-push `gh repo view` confirmed visibility `PRIVATE`.

- [x] Step 6.6: Reconcile the existing Todoist downstream repo with the shared seed structure
  - Files: modify `tasks/repo-seeding.md` (this repo); update downstream repo `GeorgeQLe/todoist-mobile-clone` (separate clone)
  - Execution profile: serial, main agent, high conflict risk, no subagent lanes, test strategy `none` (docs-only repo, no lint/typecheck/tests configured).
  - Prerequisites:
    - `gh auth status` shows active account `GeorgeQLe` with `repo` + `workflow` scopes (verified 2026-04-20 during Step 6.5 rerun). If it fails, stop and use the `gh auth login` manual blocker path.
    - Source spec: `specs/batch-05/090-todoist.md` in this repo.
    - Seed templates live under `templates/downstream/` and produced these files in the Step 6.5 Evernote seed: `.gitignore`, `README.md`, `docs/plans/README.md`, `docs/source-specs/NNN-<slug>.md`, `tasks/roadmap.md`, `tasks/todo.md`.
    - `GeorgeQLe/todoist-mobile-clone` already exists (manifest row 090 is checked). It was created before the shared seed template; do not recreate it.
  - Sub-tasks:
    1. Render a local template preview for Todoist without touching remote state:
       `node scripts/seed-downstream-repos.mjs --target 090 --dry-run --preview-dir /tmp/mobile-ideas-todoist-seed-preview`.
       Confirm no unresolved `{{PLACEHOLDER}}` tokens with `rg "\{\{[A-Z0-9_]+\}\}" /tmp/mobile-ideas-todoist-seed-preview`.
    2. Clone the existing downstream repo into a scratch dir (e.g., `/tmp/todoist-mobile-clone-reconcile`) with `gh repo clone GeorgeQLe/todoist-mobile-clone`. Confirm visibility is `PRIVATE` with `gh repo view GeorgeQLe/todoist-mobile-clone --json visibility,nameWithOwner,url`.
    3. Diff the preview against the clone for each expected file (`.gitignore`, `README.md`, `docs/plans/README.md`, `docs/source-specs/090-todoist.md`, `tasks/roadmap.md`, `tasks/todo.md`). For each file, decide one of: `add` (missing), `align` (present but drifted from template and safe to replace), or `keep-with-note` (Todoist-specific content that predates the template and should remain — record rationale).
    4. Apply the reconciliation in the clone: copy/merge template files, then copy `specs/batch-05/090-todoist.md` into `docs/source-specs/090-todoist.md`. Do NOT overwrite any Todoist-specific plans, build-plan notes, or manual-verification evidence without recording a `keep-with-note` rationale in `tasks/repo-seeding.md` first.
    5. Commit with a single descriptive message (e.g., `chore: reconcile with shared downstream seed templates`) and push to `origin/main` on the downstream repo. Re-verify `gh repo view GeorgeQLe/todoist-mobile-clone --json visibility` shows `PRIVATE` post-push.
    6. Record reconciliation evidence in `tasks/repo-seeding.md` under a new `### Step 6.6 Todoist Reconciliation - YYYY-MM-DD` section: files added, files aligned, files kept with rationale, downstream commit SHA, privacy status, and content-audit confirmation (no proprietary logos/screenshots/media/private APIs/credentials/real user data added).
    7. Update the Phase 6 acceptance criterion `Existing GeorgeQLe/todoist-mobile-clone is reconciled with the same seed structure` to `[x]`, and check off Step 6.6 in `tasks/todo.md`.
  - Gotchas and conventions from this session:
    - The seeding utility's internal `gh auth status` check previously failed with an invalid default token even when the top-level check passed; the fix was `gh auth login` with keyring storage. If the Step 6.1 sub-task reports auth failure, stop and redirect to the manual-task flow, do not partially seed.
    - Downstream repos must remain `PRIVATE`. Refuse any `--public` or visibility-change flags; the `--visibility public` guardrail in `scripts/seed-downstream-repos.mjs` still applies.
    - Never copy proprietary Todoist logos, screenshots, marketing copy, private API details, credentials, or real user data into the reconciled repo. Template placeholders and the source spec from this store are the only content allowed.
    - The Todoist repo likely already contains implementation notes that the shared template does not know about; prefer `keep-with-note` over silent overwrite when the existing content is Todoist-specific build planning rather than generic scaffolding.
    - This repo is docs-only: no lint/typecheck/test commands exist. Validation for Step 6.6 is the evidence log plus post-push `gh repo view` JSON.
  - Acceptance criteria:
    - `GeorgeQLe/todoist-mobile-clone` contains the expected seed files or has an explicit `keep-with-note` rationale for each deviation.
    - Post-push visibility is `PRIVATE`.
    - `tasks/repo-seeding.md` has a Step 6.6 evidence section with downstream commit SHA, file-level decisions, and a content-audit line.
    - Step 6.6 and the `...reconciled with the same seed structure...` acceptance item in `tasks/todo.md` are checked.
    - No proprietary assets were added; no additional downstream repos were created; Todoist row 090 remains checked.
  - Out of scope:
    - Step 6.7 batch seeding for the remaining 98 repos.
    - Step 6.9 public visibility change for `GeorgeQLe/mobile-ideas`.
  - Ship-one-step handoff contract: implement only Step 6.6, validate it, mark Step 6.6 and its acceptance criterion done in `tasks/todo.md`, update `tasks/history.md`, commit and push the completed work to this repo's `main` (and push the reconciliation commit to the downstream repo), deploy only when an explicit manual deploy contract exists (none currently), write the Step 6.7 plan into `tasks/todo.md`, ensure `.claude/settings.local.json` has `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"`, start the approval UI for Step 6.7 by calling `EnterPlanMode` first, write a brief pass-through plan in plan mode, call `ExitPlanMode`, and stop before implementing Step 6.7. Do not call `ExitPlanMode` from normal mode.

- [x] Step 6.7: Seed the remaining downstream repos in controlled private batches
  - Files: modify `tasks/repo-seeding.md` (this repo); create 98 new private downstream repositories under `GeorgeQLe/<slug>-mobile-clone` (one per unchecked manifest row).
  - Execution profile: serial, main agent, high conflict risk (GitHub API rate limits, auth drift, naming collisions), no subagent lanes, test strategy `none` (docs-only repo).
  - Prerequisites:
    - `gh auth status` shows active account `GeorgeQLe` via keyring with `repo` + `workflow` scopes. If it fails, stop and use the `gh auth login` manual blocker path.
    - Steps 6.5 (Evernote seed) and 6.6 (Todoist reconciliation) both marked complete; shared templates under `templates/downstream/` validated.
    - `tasks/repo-seeding.md` manifest lists 100 target rows with two already checked (`[x] 090` Todoist, `[x] 093` Evernote); the remaining 98 rows are the Step 6.7 scope.
    - `scripts/seed-downstream-repos.mjs` default-private guardrails (`--public`/`--visibility public`/`--all` refused, existing-repo refusal unless `--reconcile-existing`) remain in place.
  - Batching:
    - Group by manifest batch: Batch 01 (IDs 001-020, minus none), Batch 02 (021-040), Batch 03 (041-060), Batch 04 (061-080), Batch 05 (081-100, minus 090 and 093). Seed one batch per iteration; do not interleave batches.
    - Before each batch, run a single fresh preview (`--dry-run --preview-dir /tmp/mobile-ideas-seed-preview-<ID>`) for the first ID in the batch to confirm template health and `rg "\{\{[A-Z0-9_]+\}\}"` returns no matches.
    - Within a batch, seed repos one at a time in ascending ID order with `node scripts/seed-downstream-repos.mjs --target <ID> --execute`; wait for push to complete before moving to the next ID.
  - Sub-tasks (per ID):
    1. Pre-check: `gh repo view GeorgeQLe/<slug>-mobile-clone --json visibility` — if the repo already exists, stop the batch and record the conflict as a blocker (do not pass `--reconcile-existing` in bulk).
    2. Execute: `node scripts/seed-downstream-repos.mjs --target <ID> --execute`.
    3. Post-check: `gh repo view GeorgeQLe/<slug>-mobile-clone --json visibility,nameWithOwner,url` returns `PRIVATE`.
    4. Capture downstream root-commit SHA from the seeding utility output or `git -C <clone-dir> rev-parse HEAD`.
    5. Append a compact evidence line for that ID to the per-batch evidence table in `tasks/repo-seeding.md` and check the manifest row `[x]`.
    6. On any failure (auth, permission, naming collision, rate limit, template validation, clone, commit, or push), stop the batch, record the blocker under `### Failures And Blockers` with the exact ID, command, and error text, and do not guess a fix.
  - Per-batch deliverables in `tasks/repo-seeding.md`:
    - A new `### Step 6.7 Batch 0N Seeding - YYYY-MM-DD` section with: batch ID range, preview evidence, per-repo table (ID, repo, commit SHA, visibility, notes), authorized privacy statement, and content-audit line.
    - Updated manifest checkboxes for every newly-created repo in that batch.
    - Updated `Batch Execution Todo` checkbox for the batch (`[x] Seed Batch 0N repos...`).
  - Rate-limit and throttling guidance:
    - GitHub REST API allows 5,000 requests/hour for authenticated users; each seed uses a handful of requests. The full 98 repos should fit in one session, but monitor for secondary-rate-limit warnings from `gh` and back off 60s if seen. Record any throttle event as a blocker entry rather than retrying blindly.
  - Gotchas and conventions from this session:
    - The seeding utility's internal `gh auth status` check has historically failed even when the top-level check passed; if it fails mid-batch, stop and redirect to `gh auth login` manually.
    - Every downstream repo must remain `PRIVATE`. Do not pass `--public` or `--visibility public`.
    - Never copy proprietary logos, screenshots, marketing copy, private APIs, credentials, or real user data into any seeded repo; only template placeholders and the source spec from this store are allowed.
    - If a manifest source-spec path does not resolve under `specs/`, the utility refuses to run — record the missing spec as a blocker instead of improvising.
    - This repo is docs-only: validation is the per-ID post-push `gh repo view` JSON plus the evidence table.
  - Acceptance criteria:
    - All 98 previously-unchecked manifest rows are either checked `[x]` with a recorded private repo URL and root-commit SHA, or have an explicit blocker note in `tasks/repo-seeding.md`.
    - Every newly-created downstream repo is `PRIVATE` post-push.
    - `tasks/repo-seeding.md` contains a Step 6.7 batch section for each batch actually executed, plus any partial-batch stop evidence.
    - No proprietary assets, screenshots, logos, private APIs, credentials, or real user data were introduced into any downstream repo.
    - Phase 6 acceptance `All 100 downstream repos exist or have explicit blocker notes in tasks/repo-seeding.md` is satisfied.
  - Out of scope:
    - Step 6.8 full-manifest verification pass.
    - Step 6.9 public visibility change for `GeorgeQLe/mobile-ideas`.
    - Any implementation code inside downstream repos beyond the template seed.
  - Ship-one-step handoff contract: implement only Step 6.7, validate it batch by batch, mark Step 6.7 and the `All 100 downstream repos...` acceptance item done in `tasks/todo.md` when the final batch completes or all remaining rows have blocker notes, update `tasks/history.md`, commit and push the completed work to this repo's `main` (downstream repos push as part of each per-ID seed), deploy only when an explicit manual deploy contract exists (none currently), write the Step 6.8 plan into `tasks/todo.md`, ensure `.claude/settings.local.json` keeps `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"`, start the approval UI for Step 6.8 by calling `EnterPlanMode` first, write a brief pass-through plan in plan mode, call `ExitPlanMode`, and stop before implementing Step 6.8. Do not call `ExitPlanMode` from normal mode.

- [x] Step 6.8: Verify the full downstream repo manifest
  - Files: modify `tasks/repo-seeding.md`
  - Execution profile: serial, main agent, low conflict risk (read-only GitHub API checks plus docs updates), no subagent lanes, test strategy `none` (docs-only repo).
  - Prerequisites:
    - `gh auth status` shows active account `GeorgeQLe` with `repo` + `workflow` scopes. If it fails, stop and use the `gh auth login` manual blocker path.
    - Step 6.7 marked complete: 97 of 98 newly-seeded repos recorded in per-batch evidence tables, ID 075 Letterboxd recorded as a blocker, 090 Todoist reconciled, 093 Evernote seeded.
    - Step 6.7 blocker for ID 075 is still present and requires verification as a blocker row, not a seeded row.
  - Sub-tasks:
    1. For every manifest row in `tasks/repo-seeding.md` (IDs 001-100), run `gh repo view GeorgeQLe/<slug>-mobile-clone --json visibility,nameWithOwner,url,defaultBranchRef` and confirm `visibility == PRIVATE` for all 100 rows (the Letterboxd row is expected to be `PRIVATE` and empty; all others are expected to have `main`).
    2. For every row recorded as seeded in Step 6.7 or earlier (IDs 001-074, 076-089, 091-092, 094-100 plus 090 Todoist reconciliation and 093 Evernote seed), run `gh api repos/GeorgeQLe/<slug>-mobile-clone/contents/docs/source-specs --jq '.[].name'` and confirm the expected `NNN-<slug>.md` source-spec file is present. Sample-check the root README contents via `gh api repos/.../readme --jq .name` for a minimum of five representative repos (one per batch) to confirm the template README is present.
    3. For the Letterboxd blocker row 075, re-confirm via `gh repo view GeorgeQLe/letterboxd-mobile-clone --json visibility,isEmpty` that the repo exists, is `PRIVATE`, and is empty (no seeded commits). Record confirmation under `### Failures And Blockers`.
    4. Scan `tasks/repo-seeding.md` per-batch evidence sections and manifest checkboxes for internal consistency: 99 rows checked `[x]`, row 075 unchecked `[ ]`, one blocker entry for 075, five `### Step 6.7 Batch 0N Seeding` sections plus the prior 6.5/6.6 sections, and one consolidated content-audit statement.
    5. Add a new `### Step 6.8 Full Manifest Verification - YYYY-MM-DD` evidence section summarizing: count of `PRIVATE` repos (should be 100), count of repos containing the expected source spec (should be 99), Letterboxd blocker confirmation, content-audit statement that no proprietary logos/screenshots/media/private APIs/credentials/real user data exist in any inspected repo, and any new blockers observed.
    6. Check the `Verify all 100 target repos exist and link back to this spec store.` item under `## Batch Execution Todo` in `tasks/repo-seeding.md` only after steps 1-5 pass.
    7. Check off Step 6.8 in `tasks/todo.md` when the verification section is in place.
  - Gotchas and conventions from this session:
    - GitHub API propagation can lag between `gh repo create` and subsequent reads; the Step 6.7 blocker for Letterboxd originated from this lag. If a spot-check fails transiently, note the timing and re-query rather than marking the repo a new blocker.
    - This is a read-only verification step — do not push, reconcile, or re-seed any downstream repo; that is explicitly out of scope.
    - This repo is docs-only: validation is the evidence log plus `gh repo view` and `gh api` JSON.
  - Acceptance criteria:
    - `tasks/repo-seeding.md` contains a `### Step 6.8 Full Manifest Verification` section with per-criterion counts, Letterboxd blocker confirmation, and a content-audit statement.
    - Every row in the per-repo manifest is either checked `[x]` (99 rows) or has an explicit blocker entry (row 075).
    - Every non-blocker repo is confirmed `PRIVATE` with the expected source spec present.
    - The `Verify all 100 target repos exist and link back to this spec store.` item in `tasks/repo-seeding.md` is checked.
    - Step 6.8 is checked in `tasks/todo.md`.
    - No downstream repo was made public during verification; no proprietary assets were introduced.
  - Out of scope:
    - Re-seeding or reconciling the Letterboxd blocker repo (deferred to a future follow-up).
    - Step 6.9 public visibility change for `GeorgeQLe/mobile-ideas`.
    - Any implementation code inside downstream repos.
  - Ship-one-step handoff contract: implement only Step 6.8, validate it, mark Step 6.8 done in `tasks/todo.md`, update `tasks/history.md`, commit and push the completed work to this repo's `main`, deploy only when an explicit manual deploy contract exists (none currently — skip), write the Step 6.9 plan into `tasks/todo.md`, ensure `.claude/settings.local.json` keeps `"showClearContextOnPlanAccept": true` and `"defaultMode": "acceptEdits"`, start the approval UI for Step 6.9 by calling `EnterPlanMode` first, write a brief pass-through plan in plan mode, call `ExitPlanMode`, and stop before implementing Step 6.9. Do not call `ExitPlanMode` from normal mode.

- Step 6.8a: Re-seed the Letterboxd downstream repo (follow-up to the Step 6.7 Letterboxd blocker)
  - Files: modify `tasks/repo-seeding.md` (consolidate the ID 075 blocker into a resolution entry and check the manifest row); downstream repo `GeorgeQLe/letterboxd-mobile-clone` gets its first commit (separate clone directory outside this repo).
  - Execution profile: serial, main agent, medium conflict risk (single remote repo transitioning from empty to seeded; no batch interleave), no subagent lanes, test strategy `none` (docs-only repo).
  - Prerequisites:
    - `gh auth status` shows active account `GeorgeQLe` via keyring with `repo` + `workflow` scopes. If it fails, stop and use the `gh auth login` manual blocker path.
    - Step 6.8 complete: `gh repo view GeorgeQLe/letterboxd-mobile-clone --json visibility,isEmpty` still returns `visibility=PRIVATE`, `isEmpty=true` (re-verify as sub-task 1 below; do not proceed if visibility drifted or the repo is no longer empty).
    - Source spec `specs/batch-04/075-letterboxd.md` exists unchanged under `specs/`.
    - Shared templates under `templates/downstream/` remain valid (Step 6.7 Batch 04 preview already confirmed; no re-audit required unless templates changed since then).
    - `scripts/seed-downstream-repos.mjs --reconcile-existing` guardrails remain in place: the utility will skip `gh repo create` when the remote already exists, then `gh repo clone`, copy the rendered template plus source spec, `git add`, `git commit`, and `git push origin HEAD`.
    - `/Users/georgele/projects/mobile/dev/letterboxd-mobile-clone` (the default derived clone directory) must not exist; the utility refuses to clobber an existing clone path. Use `--clone-dir /tmp/letterboxd-mobile-clone-reseed` if the default path is occupied.
  - Sub-tasks:
    1. Re-verify the remote state: `gh repo view GeorgeQLe/letterboxd-mobile-clone --json visibility,nameWithOwner,url,isEmpty,defaultBranchRef`. Expected: `visibility=PRIVATE`, `isEmpty=true`, `defaultBranchRef` null or absent. If the repo is not empty (someone else seeded it), stop and record the state change as a new blocker instead of re-seeding.
    2. Render a fresh preview to confirm template health: `node scripts/seed-downstream-repos.mjs --target 075 --dry-run --preview-dir /tmp/mobile-ideas-letterboxd-reseed-preview`. Confirm no unresolved placeholders with `rg "\{\{[A-Z0-9_]+\}\}" /tmp/mobile-ideas-letterboxd-reseed-preview`.
    3. Execute the re-seed with `--reconcile-existing` so the utility skips `gh repo create` (the repo already exists) and only clones, seeds, commits, and pushes: `node scripts/seed-downstream-repos.mjs --target 075 --execute --reconcile-existing --clone-dir /tmp/letterboxd-mobile-clone-reseed`. Capture the root-commit SHA from the utility output or `git -C /tmp/letterboxd-mobile-clone-reseed rev-parse HEAD`.
    4. Post-verify: `gh repo view GeorgeQLe/letterboxd-mobile-clone --json visibility,isEmpty,defaultBranchRef` returns `visibility=PRIVATE`, `isEmpty=false`, `defaultBranchRef.name=main`. Confirm the source spec with `gh api repos/GeorgeQLe/letterboxd-mobile-clone/contents/docs/source-specs --jq '.[].name'` returning `075-letterboxd.md`, and the README with `gh api repos/GeorgeQLe/letterboxd-mobile-clone/readme --jq .name` returning `README.md`.
    5. Update `tasks/repo-seeding.md`:
       - Add a new `### Step 6.8a Letterboxd Re-Seed - YYYY-MM-DD` evidence section with the pre-re-seed remote state, preview evidence, execute command, seeded file list, downstream commit SHA, privacy status, post-verify source-spec and README evidence, and a content-audit statement (no proprietary logos/screenshots/media/private APIs/credentials/real user data added).
       - Update the existing Letterboxd blocker entry under `### Failures And Blockers` from an open blocker to a resolved entry, cross-linking the new Step 6.8a evidence section.
       - Change the ID 075 Letterboxd row in the `Per-Repo Checklist` manifest table from `[ ]` to `[x]`, and update the Step 6.7 Batch 04 per-repo table row for ID 075 from `seeded commit SHA — / PRIVATE (empty) / blocker: ...` to `seeded (re-seed 2026-XX-XX)` with the new commit SHA and a pointer to Step 6.8a.
       - Update the `Batch Progress` summary line for Step 6.7 batch seeding to note the Letterboxd blocker is resolved in Step 6.8a.
    6. Update `tasks/todo.md`: check Step 6.8a; re-run Step 6.8's manifest checks mentally — the `Verify all 100 target repos exist and link back to this spec store.` item remains checked, and the Phase 6 acceptance criterion `All 100 downstream repos exist or have explicit blocker notes in tasks/repo-seeding.md` now holds with a stronger statement (100 of 100 seeded), which does not require a checkbox change but should be noted in the Step 6.8a evidence.
    7. Update `tasks/history.md` with a `## YYYY-MM-DD - Letterboxd Downstream Re-Seed (Step 6.8a)` entry summarizing the re-seed, commit SHA, and blocker resolution.
    8. Commit and push this spec store's changes to `GeorgeQLe/mobile-ideas` `main`; the downstream repo push happens inside the seeding utility in sub-task 3.
  - Gotchas and conventions from this session:
    - The Step 6.7 Batch 04 blocker was caused by a GitHub API propagation lag between `gh repo create` and the immediately-following `gh repo clone`. Since the repo is now several days old, that lag window has long since closed and a clone should succeed. If it fails again with `GraphQL: Could not resolve`, wait 60 seconds and retry once before recording a new blocker — do not bulk-retry and do not delete/recreate the repo.
    - `--reconcile-existing` is the only supported path to seed an already-existing empty remote; do not delete and recreate the Letterboxd repo, and do not pass `--execute` without `--reconcile-existing` (the utility will refuse).
    - Do not overwrite the existing remote visibility. Letterboxd must remain `PRIVATE`.
    - Do not copy proprietary Letterboxd logos, screenshots, marketing copy, film metadata, private APIs, credentials, or real user data into the seeded repo; only the shared template placeholders and the source spec from this store are allowed.
    - The `--clone-dir` value must not already exist locally. Use `/tmp/letterboxd-mobile-clone-reseed` (or a fresh scratch path) to keep the clone isolated and easy to clean up.
    - This repo is docs-only: validation is the post-seed `gh repo view` and `gh api` JSON plus the evidence log in `tasks/repo-seeding.md`.
  - Acceptance criteria:
    - `GeorgeQLe/letterboxd-mobile-clone` is `PRIVATE` and `isEmpty=false`, with `main` as the default branch.
    - `docs/source-specs/075-letterboxd.md` and `README.md` are present on the remote (verified via `gh api`).
    - `tasks/repo-seeding.md` has a `### Step 6.8a Letterboxd Re-Seed` evidence section, the ID 075 manifest row is `[x]`, the Letterboxd blocker entry is marked resolved, and the Batch 04 per-repo table row is updated.
    - Step 6.8a is checked in `tasks/todo.md`; `tasks/history.md` has the Step 6.8a entry.
    - No proprietary assets were introduced; no other downstream repo was modified; no visibility change occurred for any repo in the manifest or for `GeorgeQLe/mobile-ideas`.
  - Out of scope:
    - Step 6.9 public visibility change for `GeorgeQLe/mobile-ideas`.
    - Any implementation code inside the Letterboxd downstream repo beyond the template seed.
    - Re-verification of the other 99 downstream repos (covered by Step 6.8).
  - Ship-one-step handoff contract: implement only Step 6.8a, validate it, mark Step 6.8a done in `tasks/todo.md`, update `tasks/history.md`, commit and push the completed work to this repo's `main` (and push the seeded commit to `GeorgeQLe/letterboxd-mobile-clone` via the seeding utility), deploy only when an explicit manual deploy contract exists (none currently — skip). Step 6.9 remains the Phase 6 closing step; after 6.8a, start the approval UI for Step 6.9 by calling `EnterPlanMode` first, write a brief pass-through plan in plan mode, call `ExitPlanMode`, and stop before implementing Step 6.9. Do not call `ExitPlanMode` from normal mode.

- Step 6.9: Publish the spec store only after explicit approval
  - Files: modify `tasks/repo-seeding.md`, modify `tasks/manual-todo.md` (manual approval task), modify `tasks/todo.md` and `tasks/history.md` on completion.
  - Execution profile: serial, main agent, high conflict risk (irreversible visibility change on the canonical spec store), no subagent lanes, test strategy `none` (docs-only repo).
  - Prerequisites:
    - `gh auth status` shows active account `GeorgeQLe` via keyring with `repo` + `workflow` scopes.
    - Step 6.8 complete; 99 of 99 non-blocker downstream repos confirmed `PRIVATE` with expected source spec; ID 075 Letterboxd remains a recorded blocker (non-blocking for Step 6.9 — `GeorgeQLe/mobile-ideas` publication only changes *this* spec store's visibility, not downstream repo visibility).
    - The six open-source spec-store checklist items in `tasks/repo-seeding.md` (`## Open-Source Spec Store Checklist`) have the first six items checked `[x]`; only the final `gh repo edit ... --visibility public` item remains `[ ]`.
  - Sub-tasks:
    1. Re-audit `tasks/repo-seeding.md` `## Open-Source Spec Store Checklist` and confirm each of the first six items is still accurate: license (`LICENSE` present, CC BY 4.0 with third-party-mark exclusions), public-reader `README.md`, non-affiliation and no-proprietary-assets language, `CONTRIBUTING.md`, `SECURITY.md`, and the content-audit for secrets/accounts/assets/screenshots/proprietary-copy/private-APIs/ambiguous-affiliation. Re-run a content-audit pass over the repo root and `specs/` for any drift since Step 6.4; record the audit result under a new `### Step 6.9 Pre-Publication Re-Audit - YYYY-MM-DD` evidence subsection.
    2. Confirm downstream privacy is intact by re-reading the Step 6.8 evidence section; if any downstream repo drifted to non-`PRIVATE` since Step 6.8, stop and record it as a blocker — do not publish the spec store while a downstream repo is public.
    3. Add or update the manual approval task in `tasks/manual-todo.md`: "Approve public visibility change for `GeorgeQLe/mobile-ideas` on 2026-0X-XX". Do not proceed until the user explicitly checks this item. Record the exact approval date and user statement in `tasks/repo-seeding.md`.
    4. After approval is recorded, run `gh repo edit GeorgeQLe/mobile-ideas --visibility public --accept-visibility-change-consequences` from this working directory. Capture stdout/stderr verbatim into the evidence log.
    5. Re-verify with `gh repo view GeorgeQLe/mobile-ideas --json visibility,nameWithOwner,url` that visibility is now `PUBLIC`. Record the JSON response.
    6. Update `tasks/repo-seeding.md`: check the final `## Open-Source Spec Store Checklist` item, add a `### Step 6.9 Spec Store Publication - YYYY-MM-DD` evidence section with approval evidence, command used, stdout/stderr, resulting visibility, and any follow-up blocker notes.
    7. Check off the final Phase 6 acceptance criterion `This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.` and Step 6.9 in `tasks/todo.md`. Update the Milestone `On Completion` block with any deviations, tech debt, and readiness for the next phase.
    8. Update `tasks/history.md` with a Step 6.9 entry.
  - Gotchas and conventions from this session:
    - Visibility change on this repo is essentially irreversible from a discovery standpoint (search engines and archivers may cache content). Do not run the `gh repo edit ... --visibility public` command without an explicit, recorded manual approval — not even in a dry-run mode.
    - `gh repo edit --visibility public` requires `--accept-visibility-change-consequences` when transitioning from `PRIVATE` to `PUBLIC`; omitting the flag will fail.
    - Do not change visibility of any downstream repo in Step 6.9; downstream repos remain `PRIVATE` until each has its own legal/name/license review.
    - The Letterboxd ID 075 blocker is not a Step 6.9 gate; reconciling it is a separate follow-up and must not delay Step 6.9 if the spec-store checklist is otherwise complete and approved.
    - This repo is docs-only: validation is the evidence log plus post-edit `gh repo view --json visibility`.
  - Acceptance criteria:
    - `tasks/repo-seeding.md` has a `### Step 6.9 Pre-Publication Re-Audit` subsection and a `### Step 6.9 Spec Store Publication` evidence section with approval date, command run, command output, and resulting visibility.
    - The final `## Open-Source Spec Store Checklist` item in `tasks/repo-seeding.md` is checked.
    - `gh repo view GeorgeQLe/mobile-ideas --json visibility` returns `PUBLIC`.
    - The final Phase 6 acceptance criterion in `tasks/todo.md` is checked; Step 6.9 is checked.
    - No downstream repo visibility changed in this step; Letterboxd ID 075 blocker remains as-is.
  - Out of scope:
    - Reconciling the Letterboxd ID 075 seeding blocker.
    - Making any downstream repo public.
    - Any structural changes to `specs/` content.
  - Ship-one-step handoff contract: implement only Step 6.9, validate it, mark Step 6.9 and the final Phase 6 acceptance criterion done in `tasks/todo.md`, update `tasks/history.md`, commit and push the completed work to this repo's `main`, deploy only when an explicit manual deploy contract exists (none currently — skip). Since Step 6.9 closes out Phase 6, do not draft a new step plan; instead note Phase 6 completion in the Milestone `On Completion` block.

### Milestone: Phase 6 Downstream Repository Seeding And Spec Store Publication

**Acceptance Criteria:**

- [x] `tasks/repo-seeding.md` lists all 100 target repos and source specs.
- [x] A reusable `gh` seeding command pattern exists.
- [x] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [x] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [x] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [x] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

**On Completion**

- Deviations from plan: none recorded yet.
- Tech debt / follow-ups: none recorded yet.
- Ready for next phase: no.
