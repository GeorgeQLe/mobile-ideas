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
- [ ] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [ ] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
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

- Step 6.6: Reconcile the existing Todoist downstream repo with the shared seed structure
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

- Step 6.7: Seed the remaining downstream repos in controlled private batches
  - Files: modify `tasks/repo-seeding.md`
  - Create repos batch by batch only after the dry-run and Todoist reconciliation pass.
  - Keep every downstream repo private, preserve source-spec links and manual blockers, and record per-repo creation evidence or explicit blocker notes.
  - Stop the batch on authentication, permission, naming, rate-limit, or template validation failures and record the blocker instead of partially guessing.

- Step 6.8: Verify the full downstream repo manifest
  - Files: modify `tasks/repo-seeding.md`
  - Confirm every target repo either exists privately with the expected seeded files and source-spec backlink, or has an explicit blocker note.
  - Confirm no downstream repo was made public and no proprietary assets, screenshots, logos, private APIs, production credentials, or real user data were seeded.
  - Confirm `tasks/repo-seeding.md` has batch-level and per-repo evidence for the dry run, Todoist reconciliation, and all remaining repos.

- Step 6.9: Publish the spec store only after explicit approval
  - Files: modify `tasks/repo-seeding.md`
  - Complete the public-release checklist in `tasks/repo-seeding.md`.
  - After the manual approval task is checked off, run the visibility change for `GeorgeQLe/mobile-ideas`.
  - Record the approval evidence, command used, resulting visibility, and any follow-up blocker notes.

### Milestone: Phase 6 Downstream Repository Seeding And Spec Store Publication

**Acceptance Criteria:**

- [x] `tasks/repo-seeding.md` lists all 100 target repos and source specs.
- [x] A reusable `gh` seeding command pattern exists.
- [x] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [ ] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [ ] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [x] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

**On Completion**

- Deviations from plan: none recorded yet.
- Tech debt / follow-ups: none recorded yet.
- Ready for next phase: no.
