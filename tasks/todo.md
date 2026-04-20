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
- [ ] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [ ] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [ ] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [ ] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** high
**Review gates:** correctness, security, docs/API conformance

**Subagent lanes:** none

### Implementation

- Step 6.1: Audit the current repo-seeding contract and choose the dry-run target
  - Files: modify `tasks/repo-seeding.md`
  - Confirm the manifest still lists 100 target repos, exactly one checked existing repo, and source specs that exist under `specs/`.
  - Select one low-risk non-Todoist dry-run target, preferably a productivity or notes app, and record why it is safe to test privately.
  - Add a status/log section for dry-run evidence, batch progress, failures, blockers, and explicit decisions to keep repos private.

- Step 6.2: Add reusable downstream seed templates
  - Files: create `templates/downstream/README.md`, create `templates/downstream/docs/plans/README.md`, create `templates/downstream/tasks/roadmap.md`, create `templates/downstream/tasks/todo.md`, create `templates/downstream/.gitignore`
  - Templates must use placeholders for app ID, app name, target repo, source spec path, source spec-store URL, non-affiliation language, legal scope, original-assets requirement, and manual verification blockers.
  - Templates must not include proprietary names as project branding, copied app-store media, screenshots, logos, private API language, production credentials, or real user data.

- Step 6.3: Add the local seeding utility and dry-run mode
  - Files: create `scripts/seed-downstream-repos.mjs`, modify `tasks/repo-seeding.md`
  - Parse the `tasks/repo-seeding.md` manifest and support a single-target dry run before any batch creation.
  - Generate seed files from `templates/downstream/`, copy the selected source spec into `docs/source-specs/`, and print the exact `gh` commands before executing them.
  - Default to private repos, refuse public creation, skip existing repos unless `--reconcile-existing` is provided, and write blocker evidence back to `tasks/repo-seeding.md`.

- Step 6.4: Prepare this spec store for public release review
  - Files: create `README.md`, create `LICENSE`, create `CONTRIBUTING.md`, create `SECURITY.md`, modify `tasks/repo-seeding.md`
  - Document the repo purpose, lawful functional-parity scope, non-affiliation language, source/spec map, no-proprietary-assets rule, contribution expectations, source-correction process, manual verification evidence policy, and downstream repo linkage policy.
  - Keep the repository private until the manual approval task is complete.

- Step 6.5: Run one private non-Todoist dry-run seed
  - Files: modify `tasks/repo-seeding.md`
  - Verify `gh auth status`; if authentication fails, pause for the manual auth task instead of working around it.
  - Run the seeding utility against the selected dry-run target with private visibility.
  - Record the created repo URL, seeded files, commit SHA if available, and any blocker notes in `tasks/repo-seeding.md`.

- Step 6.6: Reconcile the existing Todoist downstream repo with the shared seed structure
  - Files: modify `tasks/repo-seeding.md`, update downstream repo `GeorgeQLe/todoist-mobile-clone`
  - Compare `GeorgeQLe/todoist-mobile-clone` against the template structure.
  - Add missing seed docs or record explicit differences that should remain because Todoist was created before the shared seed template.
  - Mark the Todoist row and batch checklist consistently after reconciliation evidence exists.

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
- [ ] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [ ] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [ ] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [ ] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

**On Completion**

- Deviations from plan: none recorded yet.
- Tech debt / follow-ups: none recorded yet.
- Ready for next phase: no.
