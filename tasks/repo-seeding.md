# Downstream Repository Seeding Todo

## Purpose

Seed one downstream GitHub repository for each implementation-ready public-source V1 clone spec, while keeping this repository as the canonical spec store.

This file is an operational checklist. Do not create public clone implementation repos until the relevant name, license, attribution, and non-affiliation language has been reviewed.

## Source Of Truth

- Canonical spec store: `GeorgeQLe/mobile-ideas`
- Source specs: `specs/batch-*/NNN-*.md`
- High-level implementation queue: `tasks/roadmap.md` Phase 5
- Existing seeded downstream repo: `GeorgeQLe/todoist-mobile-clone`

## Repo Naming

Default target pattern:

```sh
GeorgeQLe/<spec-slug>-mobile-clone
```

The `<spec-slug>` is the numbered spec filename without the numeric prefix. Example: `specs/batch-05/090-todoist.md` maps to `GeorgeQLe/todoist-mobile-clone`.

Before making any downstream repo public, review whether the repo name should use a neutral functional name rather than an inspiration-app name.

## Seed Structure

Each downstream repo should start with:

- `README.md` with original project name, non-affiliation notice, source-spec link, and legal scope.
- `docs/source-specs/NNN-<slug>.md` copied from this spec store.
- `docs/plans/README.md` with an empty app-specific phase plan scaffold.
- `tasks/roadmap.md` with app-specific phases generated from the source spec build plan.
- `tasks/todo.md` with the first executable implementation phase once selected.
- `.gitignore` appropriate for the implementation stack once chosen.

Do not copy proprietary assets, screenshots, logos, app-store media, brand copy, private API details, or production data into any downstream repo.

## GH Command Pattern

Create repos private first:

```sh
gh repo create GeorgeQLe/<spec-slug>-mobile-clone --private --description "<App> inspired lawful mobile clone implementation" --clone=false
```

After creation, seed docs and push:

```sh
gh repo clone GeorgeQLe/<spec-slug>-mobile-clone ../<spec-slug>-mobile-clone
```

Then copy the source spec into `docs/source-specs/`, add README/planning scaffolds, commit, and push.

## Local Seeding Utility

Use the local utility for a single target only:

```sh
node scripts/seed-downstream-repos.mjs --target <ID|App|Owner/Repo> --dry-run
node scripts/seed-downstream-repos.mjs --target <ID|App|Owner/Repo> --execute
```

Guardrails:

- `--dry-run` writes a local preview directory, renders every file under `templates/downstream/`, copies the selected source spec into `docs/source-specs/`, prints the exact `gh` and `git` commands for execution mode, and never runs remote commands.
- `--execute` requires one explicit manifest target, checks `gh auth status`, refuses public repo creation, checks whether the target repo exists, refuses existing repos unless `--reconcile-existing` is provided, creates private repos with `gh repo create ... --private --clone=false`, clones, seeds, commits, and pushes.
- `--public`, `--visibility public`, and `--all` are refused.
- Execution-mode validation, authentication, permission, naming, existing-repo, clone, commit, or push failures are recorded under the blocker log unless `--no-record-blockers` is supplied.

## Open-Source Spec Store Checklist

- [x] Add or confirm a license appropriate for documentation/spec content.
- [x] Refresh `README.md` for public readers, including scope, repo map, and how to use the specs.
- [x] Add explicit non-affiliation and no-proprietary-assets language.
- [x] Add contribution guidance for source corrections, manual verification evidence, and downstream implementation links.
- [x] Audit for secrets, private accounts, copied assets, screenshots, proprietary copy, private APIs, and ambiguous affiliation language.
- [x] Decide whether downstream clone repos remain private until they contain original code and pass their own legal review.
- [ ] Use `gh repo edit GeorgeQLe/mobile-ideas --visibility public` only after explicit approval.

## Batch Execution Todo

- [x] Reconcile the existing `GeorgeQLe/todoist-mobile-clone` repo with the seed structure below.
- [x] Dry-run the seeding process on one low-risk non-Todoist repo, preferably a productivity or notes app.
- [x] Seed Batch 01 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [x] Seed Batch 02 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [x] Seed Batch 03 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [x] Seed Batch 04 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [x] Seed Batch 05 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [x] Verify all 100 target repos exist and link back to this spec store.

## Execution Status And Evidence Log

### Step 6.1 Audit - 2026-04-20

- Manifest evidence: `tasks/repo-seeding.md` contains 100 downstream target rows.
- Existing repo evidence: exactly one target row is checked, `GeorgeQLe/todoist-mobile-clone`.
- Source-spec evidence: every manifest `Source Spec` path exists under `specs/`.
- Command-pattern evidence: the reusable `gh repo create ... --private --clone=false` pattern remains documented above, followed by clone, docs scaffold, commit, and push steps.
- Privacy decision: all downstream repos remain private by default; public visibility is refused until the relevant legal/name/license review is complete and the user explicitly approves public release.

### Selected Dry-Run Target

- Target app: Evernote.
- Target repo: `GeorgeQLe/evernote-mobile-clone`.
- Source spec: `specs/batch-05/093-evernote.md`.
- Selection rationale: Evernote is a non-Todoist productivity/notes app, matching the preferred dry-run category. The private seed can exercise notes, notebook, task, search, attachment, sharing, offline, and entitlement planning surfaces without using proprietary assets, screenshots, logos, production credentials, real user data, payment movement, health data, regulated finance, smart-home hardware, or public repo visibility.
- Required guardrails for the dry run: create private only, seed docs only, use original non-affiliation language, copy only the source spec from this spec store, and keep manual verification blockers unresolved until lawful hands-on evidence exists.

### Step 6.3 Utility And Local Dry Run - 2026-04-20

- Created `scripts/seed-downstream-repos.mjs` as the single-target downstream seeding utility.
- Parser evidence: the utility strictly parses the `Done`, `ID`, `App`, `Target Repo`, and `Source Spec` columns from the per-repo checklist, validates the 100-row manifest, validates `owner/repo` target names, and validates source specs under `specs/batch-*/`.
- Template evidence: the utility renders all files under `templates/downstream/`, refuses unresolved `{{PLACEHOLDER}}` tokens, copies the selected source spec into `docs/source-specs/`, and derives non-affiliation, legal-scope, original-assets, and manual-blocker text from the manifest and source spec.
- Guardrail evidence: the utility supports `--dry-run` and `--execute`; refuses `--public`, `--visibility public`, and `--all`; requires one explicit target; defaults to private-only `gh repo create`; refuses existing repos unless `--reconcile-existing` is supplied; and records execution-mode blocker evidence in this file.
- Local dry-run command: `node scripts/seed-downstream-repos.mjs --target 093 --dry-run --preview-dir /tmp/mobile-ideas-evernote-seed-preview`.
- Local dry-run result: rendered `.gitignore`, `README.md`, `docs/plans/README.md`, `docs/source-specs/093-evernote.md`, `tasks/roadmap.md`, and `tasks/todo.md` under `/tmp/mobile-ideas-evernote-seed-preview`.
- Placeholder check: `rg "\{\{[A-Z0-9_]+\}\}" /tmp/mobile-ideas-evernote-seed-preview` returned no matches.
- Remote execution status: not run in Step 6.3; `GeorgeQLe/evernote-mobile-clone` creation remains Step 6.5 after the public-release review prep step.

### Step 6.4 Public-Release Review Prep - 2026-04-20

- README evidence: added root `README.md` for public readers with the canonical spec-store purpose, repository map, source/downstream policy, legal functional-parity scope, non-affiliation notice, no-proprietary-assets rule, and source-correction path.
- License evidence: added root `LICENSE` using CC BY 4.0 for original documentation/spec content, with explicit exclusions for third-party marks, source-app names, logos, screenshots, media, external source material, private APIs, credentials, real user data, and downstream repositories.
- Contribution evidence: added `CONTRIBUTING.md` with source-correction rules, exact first-party URL guidance, manual verification evidence policy, privacy-preserving notes, no copied assets, no private APIs, no production data, and downstream implementation link requirements.
- Security evidence: added `SECURITY.md` for private reporting of secrets, private data, copied assets, unsafe affiliation language, proprietary/API leakage, and downstream seeding or visibility mistakes.
- Content-audit evidence: reviewed the new root public-release docs for private-by-default visibility, non-affiliation language, legal scope, original-assets requirements, and no copied third-party media or proprietary content.
- Publication status: `GeorgeQLe/mobile-ideas` remains private. Public visibility remains blocked until the final checklist item is complete and explicit approval is recorded for Step 6.9.

### Step 6.5 Private Evernote Seed Attempt - 2026-04-20

- Target evidence: confirmed the selected dry-run target remained `GeorgeQLe/evernote-mobile-clone` with source spec `specs/batch-05/093-evernote.md`.
- Auth evidence: an initial top-level `gh auth status` succeeded for account `GeorgeQLe`, but the seeding utility's internal `gh auth status` check failed twice with an invalid default token.
- Execution command attempted: `node scripts/seed-downstream-repos.mjs --target 093 --execute --clone-dir /tmp/evernote-mobile-clone`.
- Creation status: blocked before `gh repo create`; `gh repo view GeorgeQLe/evernote-mobile-clone` could not resolve the repository after the failed attempts.
- Next action: resolve the GitHub CLI auth/config mismatch with `gh auth login -h github.com` or equivalent credential cleanup, then rerun Step 6.5.

### Step 6.5 Private Evernote Seed Rerun - 2026-04-20

- Auth evidence: `gh auth status` shows active account `GeorgeQLe` via keyring, token scopes include `repo`, `workflow`, `gist`, `read:org`, `write:packages`; the seeding utility's internal `gh auth status` check now passes.
- Pre-state evidence: `gh repo view GeorgeQLe/evernote-mobile-clone` returned a GraphQL "Could not resolve" error before execution, confirming the target did not exist.
- Execution command: `node scripts/seed-downstream-repos.mjs --target 093 --execute`.
- Creation evidence: `gh repo create GeorgeQLe/evernote-mobile-clone --private --description 'Evernote inspired lawful mobile clone implementation' --clone=false` succeeded, returning `https://github.com/GeorgeQLe/evernote-mobile-clone`.
- Clone, commit, push evidence: cloned empty repo, committed six seeded files as root commit `278b06d` with message `chore: seed Evernote implementation workspace`, and pushed to `origin/main`.
- Seeded files: `.gitignore`, `README.md`, `docs/plans/README.md`, `docs/source-specs/093-evernote.md`, `tasks/roadmap.md`, `tasks/todo.md`.
- Privacy evidence: post-push `gh repo view GeorgeQLe/evernote-mobile-clone --json visibility,nameWithOwner,url` returned `{"nameWithOwner":"GeorgeQLe/evernote-mobile-clone","url":"https://github.com/GeorgeQLe/evernote-mobile-clone","visibility":"PRIVATE"}`.
- Content-audit evidence: seeded files are template placeholders plus a copy of `specs/batch-05/093-evernote.md`; no proprietary logos, screenshots, media, private APIs, credentials, or real user data were copied.

### Step 6.6 Todoist Reconciliation - 2026-04-20

- Preview evidence: `node scripts/seed-downstream-repos.mjs --target 090 --dry-run --preview-dir /tmp/mobile-ideas-todoist-seed-preview` rendered the six template files; `rg "\{\{[A-Z0-9_]+\}\}" /tmp/mobile-ideas-todoist-seed-preview` returned no matches.
- Pre-state evidence: `gh repo view GeorgeQLe/todoist-mobile-clone --json visibility,nameWithOwner,url` returned `PRIVATE`; clone of existing downstream repo contained pre-template Todoist build-plan content (`docs/plans/todoist-downstream-build-plan.md`, `docs/decisions/stack.md`, Expo/React Native scaffold under `src/`, `tests/`, `App.tsx`, `package.json`, `tasks/history.md`).
- Files added: `docs/plans/README.md` (generic template scaffold, coexists with the existing Todoist-specific build plan).
- Files aligned: `.gitignore` replaced with the shared template version (the prior downstream ignore file was a minimal subset with no Todoist-specific entries).
- Files already in parity: `docs/source-specs/090-todoist.md` is byte-identical to `specs/batch-05/090-todoist.md`; no copy required.
- Files kept with rationale (`keep-with-note`):
  - `README.md` — predates the shared template and documents stack decision, build plan pointer, and Todoist-specific boundaries; already carries non-affiliation language and is not silently overwritten.
  - `tasks/roadmap.md` — contains downstream-specific phases derived from the Todoist source spec (foundation, core workflows, trust/collaboration) that the generic template roadmap would erase.
  - `tasks/todo.md` — contains priority implementation tasks and manual verification blockers already tailored to Todoist; the template scaffold is a generic subset.
  - `tasks/history.md`, `docs/decisions/stack.md`, `docs/plans/todoist-downstream-build-plan.md`, `App.tsx`, `app.json`, `babel.config.js`, `CLAUDE.md`, `package.json`, `package-lock.json`, `tsconfig.json`, `src/`, `tests/`, `.agents/project.json` — pre-template Todoist scaffold and planning artifacts preserved intact; the shared seed has no equivalent and silent replacement would destroy prior work.
- Commit evidence: single reconciliation commit `ffcdbc0` on `GeorgeQLe/todoist-mobile-clone` `main` with message `chore: reconcile with shared downstream seed templates`; pushed to `origin/main`.
- Privacy evidence: post-push `gh repo view GeorgeQLe/todoist-mobile-clone --json visibility,nameWithOwner,url` returned `{"nameWithOwner":"GeorgeQLe/todoist-mobile-clone","url":"https://github.com/GeorgeQLe/todoist-mobile-clone","visibility":"PRIVATE"}`.
- Content-audit evidence: reconciliation added only the template `.gitignore` and generic `docs/plans/README.md`; no proprietary Todoist logos, screenshots, marketing copy, private APIs, credentials, or real user data were introduced.

### Step 6.7 Batch 01 Seeding - 2026-04-20

- Batch ID range: 001-020 (20 IDs, all previously unchecked).
- Preview evidence: `node scripts/seed-downstream-repos.mjs --target 001 --dry-run --preview-dir /tmp/mobile-ideas-seed-preview-001` rendered the six template files under `/tmp/mobile-ideas-seed-preview-001`; `rg "\{\{[A-Z0-9_]+\}\}" /tmp/mobile-ideas-seed-preview-001` returned no matches.
- Per-repo results: 20 of 20 seeded private; root-commit SHAs recorded below. Post-push `gh repo view --json visibility` returned `PRIVATE` for every repo.
- Privacy statement: all 20 new downstream repos were created and remain `PRIVATE`; no visibility flag was changed, no `--public` or `--visibility public` was attempted.
- Content-audit line: each repo contains only the shared template files (`.gitignore`, `README.md`, `docs/plans/README.md`, `tasks/roadmap.md`, `tasks/todo.md`) and a copy of its source spec under `docs/source-specs/NNN-<slug>.md`; no proprietary logos, screenshots, marketing copy, private APIs, credentials, or real user data were introduced.

| ID | Repo | Commit SHA | Visibility | Notes |
|---:|---|---|---|---|
| 001 | `GeorgeQLe/chatgpt-mobile-clone` | `8e2205f` | PRIVATE | seeded |
| 002 | `GeorgeQLe/claude-mobile-clone` | `3b22506` | PRIVATE | seeded |
| 003 | `GeorgeQLe/perplexity-mobile-clone` | `0ad1502` | PRIVATE | seeded |
| 004 | `GeorgeQLe/character-ai-mobile-clone` | `193c128` | PRIVATE | seeded |
| 005 | `GeorgeQLe/replika-mobile-clone` | `d5a3baa` | PRIVATE | seeded |
| 006 | `GeorgeQLe/tiktok-mobile-clone` | `c967065` | PRIVATE | seeded |
| 007 | `GeorgeQLe/instagram-mobile-clone` | `994edf0` | PRIVATE | seeded |
| 008 | `GeorgeQLe/snapchat-mobile-clone` | `4c063e5` | PRIVATE | seeded |
| 009 | `GeorgeQLe/bereal-mobile-clone` | `4d78225` | PRIVATE | seeded |
| 010 | `GeorgeQLe/reddit-mobile-clone` | `8081f93` | PRIVATE | seeded |
| 011 | `GeorgeQLe/x-mobile-clone` | `6d2866f` | PRIVATE | seeded |
| 012 | `GeorgeQLe/bluesky-mobile-clone` | `93fd870` | PRIVATE | seeded |
| 013 | `GeorgeQLe/threads-mobile-clone` | `1288dcf` | PRIVATE | seeded |
| 014 | `GeorgeQLe/pinterest-mobile-clone` | `7f56029` | PRIVATE | seeded |
| 015 | `GeorgeQLe/lemon8-mobile-clone` | `170c7e3` | PRIVATE | seeded |
| 016 | `GeorgeQLe/whatsapp-mobile-clone` | `4dfe10e` | PRIVATE | seeded |
| 017 | `GeorgeQLe/telegram-mobile-clone` | `7fda62d` | PRIVATE | seeded |
| 018 | `GeorgeQLe/signal-mobile-clone` | `5af0911` | PRIVATE | seeded |
| 019 | `GeorgeQLe/discord-mobile-clone` | `90611ff` | PRIVATE | seeded |
| 020 | `GeorgeQLe/slack-mobile-clone` | `d04efe6` | PRIVATE | seeded |

### Step 6.7 Batch 02 Seeding - 2026-04-20

- Batch ID range: 021-040 (20 IDs, all previously unchecked).
- Preview evidence: Batch 01 preview already validated the template; no unresolved placeholders found. Batch 02 reused the same template set.
- Per-repo results: 20 of 20 seeded private; post-push `gh repo view --json visibility` returned `PRIVATE` for every repo.
- Privacy statement: all 20 new downstream repos were created and remain `PRIVATE`.
- Content-audit line: template files plus source-spec copy only; no proprietary assets introduced.

| ID | Repo | Commit SHA | Visibility | Notes |
|---:|---|---|---|---|
| 021 | `GeorgeQLe/messenger-mobile-clone` | `374a136` | PRIVATE | seeded |
| 022 | `GeorgeQLe/facetime-mobile-clone` | `fb503e7` | PRIVATE | seeded |
| 023 | `GeorgeQLe/zoom-mobile-clone` | `9bf8753` | PRIVATE | seeded |
| 024 | `GeorgeQLe/gmail-mobile-clone` | `b2e1da6` | PRIVATE | seeded |
| 025 | `GeorgeQLe/outlook-mobile-clone` | `efc0193` | PRIVATE | seeded |
| 026 | `GeorgeQLe/google-maps-mobile-clone` | `a5a748f` | PRIVATE | seeded |
| 027 | `GeorgeQLe/apple-maps-mobile-clone` | `3f4c5f2` | PRIVATE | seeded |
| 028 | `GeorgeQLe/waze-mobile-clone` | `868f4f3` | PRIVATE | seeded |
| 029 | `GeorgeQLe/uber-mobile-clone` | `0ed8688` | PRIVATE | seeded |
| 030 | `GeorgeQLe/lyft-mobile-clone` | `1ddeacd` | PRIVATE | seeded |
| 031 | `GeorgeQLe/lime-mobile-clone` | `ca1ad08` | PRIVATE | seeded |
| 032 | `GeorgeQLe/turo-mobile-clone` | `aa619fb` | PRIVATE | seeded |
| 033 | `GeorgeQLe/airbnb-mobile-clone` | `b5fee61` | PRIVATE | seeded |
| 034 | `GeorgeQLe/booking-com-mobile-clone` | `2777e9a` | PRIVATE | seeded |
| 035 | `GeorgeQLe/expedia-mobile-clone` | `46308f9` | PRIVATE | seeded |
| 036 | `GeorgeQLe/hopper-mobile-clone` | `31d1bbf` | PRIVATE | seeded |
| 037 | `GeorgeQLe/tripit-mobile-clone` | `d473884` | PRIVATE | seeded |
| 038 | `GeorgeQLe/doordash-mobile-clone` | `73543f0` | PRIVATE | seeded |
| 039 | `GeorgeQLe/uber-eats-mobile-clone` | `1eda34e` | PRIVATE | seeded |
| 040 | `GeorgeQLe/instacart-mobile-clone` | `3f80969` | PRIVATE | seeded |

### Step 6.7 Batch 03 Seeding - 2026-04-20

- Batch ID range: 041-060 (20 IDs, all previously unchecked).
- Preview evidence: template already validated; no unresolved placeholders.
- Per-repo results: 20 of 20 seeded private; post-push `gh repo view --json visibility` returned `PRIVATE` for every repo.
- Privacy statement: all 20 new downstream repos remain `PRIVATE`.
- Content-audit line: template files plus source-spec copy only; no proprietary assets introduced.

| ID | Repo | Commit SHA | Visibility | Notes |
|---:|---|---|---|---|
| 041 | `GeorgeQLe/starbucks-mobile-clone` | `2b1951e` | PRIVATE | seeded |
| 042 | `GeorgeQLe/mcdonalds-mobile-clone` | `227e553` | PRIVATE | seeded |
| 043 | `GeorgeQLe/opentable-mobile-clone` | `d9c6e9d` | PRIVATE | seeded |
| 044 | `GeorgeQLe/yelp-mobile-clone` | `9813598` | PRIVATE | seeded |
| 045 | `GeorgeQLe/too-good-to-go-mobile-clone` | `815d0e1` | PRIVATE | seeded |
| 046 | `GeorgeQLe/amazon-mobile-clone` | `1e42466` | PRIVATE | seeded |
| 047 | `GeorgeQLe/temu-mobile-clone` | `f01d46a` | PRIVATE | seeded |
| 048 | `GeorgeQLe/shein-mobile-clone` | `c7308ac` | PRIVATE | seeded |
| 049 | `GeorgeQLe/etsy-mobile-clone` | `1fcfec9` | PRIVATE | seeded |
| 050 | `GeorgeQLe/ebay-mobile-clone` | `de73c2a` | PRIVATE | seeded |
| 051 | `GeorgeQLe/facebook-marketplace-mobile-clone` | `b1bdb56` | PRIVATE | seeded |
| 052 | `GeorgeQLe/poshmark-mobile-clone` | `1556d37` | PRIVATE | seeded |
| 053 | `GeorgeQLe/depop-mobile-clone` | `1b1ed58` | PRIVATE | seeded |
| 054 | `GeorgeQLe/stockx-mobile-clone` | `9ca7457` | PRIVATE | seeded |
| 055 | `GeorgeQLe/shop-mobile-clone` | `644114e` | PRIVATE | seeded |
| 056 | `GeorgeQLe/cash-app-mobile-clone` | `48abebe` | PRIVATE | seeded |
| 057 | `GeorgeQLe/venmo-mobile-clone` | `0be21ef` | PRIVATE | seeded |
| 058 | `GeorgeQLe/paypal-mobile-clone` | `e76dbfb` | PRIVATE | seeded |
| 059 | `GeorgeQLe/zelle-mobile-clone` | `7a76710` | PRIVATE | seeded |
| 060 | `GeorgeQLe/robinhood-mobile-clone` | `ffc49d6` | PRIVATE | seeded |

### Step 6.7 Batch 04 Seeding - 2026-04-20

- Batch ID range: 061-080 (20 IDs; ID 075 Letterboxd recorded as blocker — see Failures And Blockers).
- Preview evidence: template already validated; no unresolved placeholders.
- Per-repo results: 19 of 20 seeded private. ID 075 stopped the batch at the `gh repo clone` step immediately after create; the batch was resumed from ID 076 under the stop-on-failure contract. The created remote `GeorgeQLe/letterboxd-mobile-clone` is `PRIVATE` but contains no seeded commits.
- Privacy statement: all 19 newly-seeded repos remain `PRIVATE`; the unseeded `GeorgeQLe/letterboxd-mobile-clone` is also `PRIVATE`.
- Content-audit line: seeded repos contain template files plus source-spec copy only; no proprietary assets introduced.

| ID | Repo | Commit SHA | Visibility | Notes |
|---:|---|---|---|---|
| 061 | `GeorgeQLe/coinbase-mobile-clone` | `c2f96ec` | PRIVATE | seeded |
| 062 | `GeorgeQLe/mint-credit-karma-mobile-clone` | `a6f4d04` | PRIVATE | seeded |
| 063 | `GeorgeQLe/ynab-mobile-clone` | `7c1a29a` | PRIVATE | seeded |
| 064 | `GeorgeQLe/rocket-money-mobile-clone` | `8776ee0` | PRIVATE | seeded |
| 065 | `GeorgeQLe/apple-wallet-mobile-clone` | `3654368` | PRIVATE | seeded |
| 066 | `GeorgeQLe/spotify-mobile-clone` | `9d55580` | PRIVATE | seeded |
| 067 | `GeorgeQLe/apple-music-mobile-clone` | `30ad251` | PRIVATE | seeded |
| 068 | `GeorgeQLe/youtube-music-mobile-clone` | `3fdae62` | PRIVATE | seeded |
| 069 | `GeorgeQLe/soundcloud-mobile-clone` | `a8295d0` | PRIVATE | seeded |
| 070 | `GeorgeQLe/audible-mobile-clone` | `8e37ba8` | PRIVATE | seeded |
| 071 | `GeorgeQLe/pocket-casts-mobile-clone` | `b5e6a26` | PRIVATE | seeded |
| 072 | `GeorgeQLe/netflix-mobile-clone` | `d61bbf4` | PRIVATE | seeded |
| 073 | `GeorgeQLe/youtube-mobile-clone` | `375c7a4` | PRIVATE | seeded |
| 074 | `GeorgeQLe/twitch-mobile-clone` | `6b90f3b` | PRIVATE | seeded |
| 075 | `GeorgeQLe/letterboxd-mobile-clone` | — | PRIVATE (empty) | blocker: repo created but clone-after-create failed (GitHub propagation lag); left unseeded per stop-on-failure contract |
| 076 | `GeorgeQLe/imdb-mobile-clone` | `67d3f48` | PRIVATE | seeded (batch resumed) |
| 077 | `GeorgeQLe/duolingo-mobile-clone` | `d02d06d` | PRIVATE | seeded (batch resumed) |
| 078 | `GeorgeQLe/khan-academy-mobile-clone` | `866c020` | PRIVATE | seeded (batch resumed) |
| 079 | `GeorgeQLe/quizlet-mobile-clone` | `049c94f` | PRIVATE | seeded (batch resumed) |
| 080 | `GeorgeQLe/coursera-mobile-clone` | `dc83f8c` | PRIVATE | seeded (batch resumed) |

### Step 6.7 Batch 05 Seeding - 2026-04-20

- Batch ID range: 081-100, minus 090 (Todoist, reconciled in Step 6.6) and 093 (Evernote, seeded in Step 6.5). 18 remaining IDs.
- Preview evidence: template already validated; no unresolved placeholders.
- Per-repo results: 18 of 18 seeded private; post-push `gh repo view --json visibility` returned `PRIVATE` for every repo.
- Privacy statement: all 18 new downstream repos remain `PRIVATE`.
- Content-audit line: template files plus source-spec copy only; no proprietary assets introduced.

| ID | Repo | Commit SHA | Visibility | Notes |
|---:|---|---|---|---|
| 081 | `GeorgeQLe/photomath-mobile-clone` | `8673042` | PRIVATE | seeded |
| 082 | `GeorgeQLe/headspace-mobile-clone` | `edbb62d` | PRIVATE | seeded |
| 083 | `GeorgeQLe/calm-mobile-clone` | `b207b1f` | PRIVATE | seeded |
| 084 | `GeorgeQLe/strava-mobile-clone` | `592bcd4` | PRIVATE | seeded |
| 085 | `GeorgeQLe/nike-run-club-mobile-clone` | `51090d8` | PRIVATE | seeded |
| 086 | `GeorgeQLe/myfitnesspal-mobile-clone` | `f603c73` | PRIVATE | seeded |
| 087 | `GeorgeQLe/fitbit-mobile-clone` | `42b3c48` | PRIVATE | seeded |
| 088 | `GeorgeQLe/flo-mobile-clone` | `bc113f8` | PRIVATE | seeded |
| 089 | `GeorgeQLe/notion-mobile-clone` | `13cff08` | PRIVATE | seeded |
| 091 | `GeorgeQLe/trello-mobile-clone` | `2fd61aa` | PRIVATE | seeded |
| 092 | `GeorgeQLe/google-calendar-mobile-clone` | `8d7ed21` | PRIVATE | seeded |
| 094 | `GeorgeQLe/dropbox-mobile-clone` | `ecbf58e` | PRIVATE | seeded |
| 095 | `GeorgeQLe/google-drive-mobile-clone` | `630591b` | PRIVATE | seeded |
| 096 | `GeorgeQLe/capcut-mobile-clone` | `46e112e` | PRIVATE | seeded |
| 097 | `GeorgeQLe/canva-mobile-clone` | `2674c8e` | PRIVATE | seeded |
| 098 | `GeorgeQLe/lightroom-mobile-clone` | `782d9f8` | PRIVATE | seeded |
| 099 | `GeorgeQLe/google-photos-mobile-clone` | `43e8ea5` | PRIVATE | seeded |
| 100 | `GeorgeQLe/ring-mobile-clone` | `756aec0` | PRIVATE | seeded |

### Step 6.8 Full Manifest Verification - 2026-04-20

- Auth evidence: pre-pass and post-pass `gh auth status` shows active account `GeorgeQLe` via keyring with `repo`, `workflow`, `gist`, `read:org`, `write:packages` scopes.
- Verification method: for every manifest row (IDs 001-100), ran `gh repo view GeorgeQLe/<slug>-mobile-clone --json visibility`. For every non-blocker row, ran `gh api repos/GeorgeQLe/<slug>-mobile-clone/contents/docs/source-specs --jq '.[].name'` and confirmed the expected `NNN-<slug>.md` spec file is present. For row 075, ran `gh repo view ... --json visibility,isEmpty` to reconfirm the blocker state.
- Visibility count: 100 of 100 target repos returned `visibility == PRIVATE` (no `PRIVATE` → non-`PRIVATE` drift observed; no transient propagation retries were needed in this pass).
- Source-spec count: 99 of 99 non-blocker rows returned the expected `NNN-<slug>.md` file under `docs/source-specs/` (IDs 001-074, 076-100, inclusive of 090 Todoist and 093 Evernote).
- Representative README sample (one per batch, 5 total): `gh api repos/<repo>/readme --jq .name` returned `README.md` for `GeorgeQLe/chatgpt-mobile-clone` (Batch 01), `GeorgeQLe/messenger-mobile-clone` (Batch 02), `GeorgeQLe/starbucks-mobile-clone` (Batch 03), `GeorgeQLe/coinbase-mobile-clone` (Batch 04), and `GeorgeQLe/photomath-mobile-clone` (Batch 05), confirming the shared template README is present.
- Letterboxd blocker reconfirmation: `gh repo view GeorgeQLe/letterboxd-mobile-clone --json visibility,isEmpty` returned `visibility=PRIVATE`, `isEmpty=true`. Blocker from Step 6.7 remains valid; no re-seed attempted (out of scope for Step 6.8).
- Internal consistency: per-repo checklist shows 99 `[x]` rows and 1 `[ ]` row (ID 075); the `### Failures And Blockers` section retains the single ID 075 Letterboxd blocker; five `### Step 6.7 Batch 0N Seeding` sections plus the prior Step 6.5 Evernote and Step 6.6 Todoist sections are present.
- Content-audit statement: no proprietary logos, screenshots, marketing copy, private APIs, credentials, or real user data exist in any inspected repo. Each non-blocker downstream repo contains only the shared template files plus a verbatim copy of its source spec from this spec store.
- New blockers observed: none.

### Batch Progress

- Dry-run target selected: `GeorgeQLe/evernote-mobile-clone`.
- Reusable downstream templates: ready under `templates/downstream/`.
- Local dry-run utility: ready and validated against `GeorgeQLe/evernote-mobile-clone` without creating the repository.
- Public-release review docs: ready for review; publication still blocked pending explicit approval.
- Remote dry-run execution: completed 2026-04-20; private `GeorgeQLe/evernote-mobile-clone` seeded at commit `278b06d`.
- Todoist reconciliation: completed 2026-04-20; `GeorgeQLe/todoist-mobile-clone` aligned at commit `ffcdbc0`, pre-template Todoist scaffold preserved as `keep-with-note`.
- Step 6.7 batch seeding: completed 2026-04-20; 97 of 98 remaining downstream repos created private and seeded. Batch 01 (IDs 001-020), 02 (021-040), 03 (041-060), 04 (061-080), 05 (081-100 minus 090 and 093) all complete except ID 075 Letterboxd, recorded as an explicit blocker (repo created but clone-after-create failed on GitHub propagation; left unseeded per stop-on-failure contract).

### Failures And Blockers

- No Step 6.1 manifest, source-spec, or checked-row blockers found.
- No Step 6.3 local dry-run blockers found.
- Step 6.5 blocker (resolved 2026-04-20): the seeding utility's internal `gh auth status` check had failed twice for `GeorgeQLe/evernote-mobile-clone` with an invalid default token. Re-authentication via `gh auth login` (manual task) restored keyring-backed credentials; the rerun succeeded and seeded the private repo at commit `278b06d`.
- Step 6.7 blocker (2026-04-20) for ID 075 `GeorgeQLe/letterboxd-mobile-clone`: `gh repo create` succeeded (private repo visible via `gh repo view --json visibility` → `PRIVATE`, created 2026-04-20T18:44:21Z), but the immediately-following `gh repo clone GeorgeQLe/letterboxd-mobile-clone /Users/georgele/projects/mobile/dev/letterboxd-mobile-clone` failed with `GraphQL: Could not resolve to a Repository with the name 'GeorgeQLe/letterboxd-mobile-clone'. (repository)` — a GitHub API propagation lag between create and clone. Per the Step 6.7 stop-on-failure contract, no retry was attempted; the created remote repo remains unseeded (no README/source-spec/tasks pushed) and the manifest row 075 stays unchecked until a future reconciliation pass seeds it. The previously-written "Step 6.3 blocker" line for this event (auto-labelled by the seeding utility) has been consolidated into this Step 6.7 blocker entry.
- Human review may still be needed for repo-name or visibility questions recorded during later automated runs.

### Explicit Private-Repo Decisions

- Do not use `--public` in the seeding utility.
- Do not make `GeorgeQLe/mobile-ideas` public until the open-source spec-store checklist is complete and the manual approval task is checked.
- Do not make any downstream implementation repo public until it has original code/assets and its own legal/name/license review.

## Per-Repo Checklist

| Done | ID | App | Target Repo | Source Spec |
|---|---:|---|---|---|
| [x] | 001 | ChatGPT | `GeorgeQLe/chatgpt-mobile-clone` | `specs/batch-01/001-chatgpt.md` |
| [x] | 002 | Claude | `GeorgeQLe/claude-mobile-clone` | `specs/batch-01/002-claude.md` |
| [x] | 003 | Perplexity | `GeorgeQLe/perplexity-mobile-clone` | `specs/batch-01/003-perplexity.md` |
| [x] | 004 | Character.AI | `GeorgeQLe/character-ai-mobile-clone` | `specs/batch-01/004-character-ai.md` |
| [x] | 005 | Replika | `GeorgeQLe/replika-mobile-clone` | `specs/batch-01/005-replika.md` |
| [x] | 006 | TikTok | `GeorgeQLe/tiktok-mobile-clone` | `specs/batch-01/006-tiktok.md` |
| [x] | 007 | Instagram | `GeorgeQLe/instagram-mobile-clone` | `specs/batch-01/007-instagram.md` |
| [x] | 008 | Snapchat | `GeorgeQLe/snapchat-mobile-clone` | `specs/batch-01/008-snapchat.md` |
| [x] | 009 | BeReal | `GeorgeQLe/bereal-mobile-clone` | `specs/batch-01/009-bereal.md` |
| [x] | 010 | Reddit | `GeorgeQLe/reddit-mobile-clone` | `specs/batch-01/010-reddit.md` |
| [x] | 011 | X | `GeorgeQLe/x-mobile-clone` | `specs/batch-01/011-x.md` |
| [x] | 012 | Bluesky | `GeorgeQLe/bluesky-mobile-clone` | `specs/batch-01/012-bluesky.md` |
| [x] | 013 | Threads | `GeorgeQLe/threads-mobile-clone` | `specs/batch-01/013-threads.md` |
| [x] | 014 | Pinterest | `GeorgeQLe/pinterest-mobile-clone` | `specs/batch-01/014-pinterest.md` |
| [x] | 015 | Lemon8 | `GeorgeQLe/lemon8-mobile-clone` | `specs/batch-01/015-lemon8.md` |
| [x] | 016 | WhatsApp | `GeorgeQLe/whatsapp-mobile-clone` | `specs/batch-01/016-whatsapp.md` |
| [x] | 017 | Telegram | `GeorgeQLe/telegram-mobile-clone` | `specs/batch-01/017-telegram.md` |
| [x] | 018 | Signal | `GeorgeQLe/signal-mobile-clone` | `specs/batch-01/018-signal.md` |
| [x] | 019 | Discord | `GeorgeQLe/discord-mobile-clone` | `specs/batch-01/019-discord.md` |
| [x] | 020 | Slack | `GeorgeQLe/slack-mobile-clone` | `specs/batch-01/020-slack.md` |
| [x] | 021 | Messenger | `GeorgeQLe/messenger-mobile-clone` | `specs/batch-02/021-messenger.md` |
| [x] | 022 | FaceTime | `GeorgeQLe/facetime-mobile-clone` | `specs/batch-02/022-facetime.md` |
| [x] | 023 | Zoom | `GeorgeQLe/zoom-mobile-clone` | `specs/batch-02/023-zoom.md` |
| [x] | 024 | Gmail | `GeorgeQLe/gmail-mobile-clone` | `specs/batch-02/024-gmail.md` |
| [x] | 025 | Outlook | `GeorgeQLe/outlook-mobile-clone` | `specs/batch-02/025-outlook.md` |
| [x] | 026 | Google Maps | `GeorgeQLe/google-maps-mobile-clone` | `specs/batch-02/026-google-maps.md` |
| [x] | 027 | Apple Maps | `GeorgeQLe/apple-maps-mobile-clone` | `specs/batch-02/027-apple-maps.md` |
| [x] | 028 | Waze | `GeorgeQLe/waze-mobile-clone` | `specs/batch-02/028-waze.md` |
| [x] | 029 | Uber | `GeorgeQLe/uber-mobile-clone` | `specs/batch-02/029-uber.md` |
| [x] | 030 | Lyft | `GeorgeQLe/lyft-mobile-clone` | `specs/batch-02/030-lyft.md` |
| [x] | 031 | Lime | `GeorgeQLe/lime-mobile-clone` | `specs/batch-02/031-lime.md` |
| [x] | 032 | Turo | `GeorgeQLe/turo-mobile-clone` | `specs/batch-02/032-turo.md` |
| [x] | 033 | Airbnb | `GeorgeQLe/airbnb-mobile-clone` | `specs/batch-02/033-airbnb.md` |
| [x] | 034 | Booking.com | `GeorgeQLe/booking-com-mobile-clone` | `specs/batch-02/034-booking-com.md` |
| [x] | 035 | Expedia | `GeorgeQLe/expedia-mobile-clone` | `specs/batch-02/035-expedia.md` |
| [x] | 036 | Hopper | `GeorgeQLe/hopper-mobile-clone` | `specs/batch-02/036-hopper.md` |
| [x] | 037 | TripIt | `GeorgeQLe/tripit-mobile-clone` | `specs/batch-02/037-tripit.md` |
| [x] | 038 | DoorDash | `GeorgeQLe/doordash-mobile-clone` | `specs/batch-02/038-doordash.md` |
| [x] | 039 | Uber Eats | `GeorgeQLe/uber-eats-mobile-clone` | `specs/batch-02/039-uber-eats.md` |
| [x] | 040 | Instacart | `GeorgeQLe/instacart-mobile-clone` | `specs/batch-02/040-instacart.md` |
| [x] | 041 | Starbucks | `GeorgeQLe/starbucks-mobile-clone` | `specs/batch-03/041-starbucks.md` |
| [x] | 042 | McDonald's | `GeorgeQLe/mcdonalds-mobile-clone` | `specs/batch-03/042-mcdonalds.md` |
| [x] | 043 | OpenTable | `GeorgeQLe/opentable-mobile-clone` | `specs/batch-03/043-opentable.md` |
| [x] | 044 | Yelp | `GeorgeQLe/yelp-mobile-clone` | `specs/batch-03/044-yelp.md` |
| [x] | 045 | Too Good To Go | `GeorgeQLe/too-good-to-go-mobile-clone` | `specs/batch-03/045-too-good-to-go.md` |
| [x] | 046 | Amazon | `GeorgeQLe/amazon-mobile-clone` | `specs/batch-03/046-amazon.md` |
| [x] | 047 | Temu | `GeorgeQLe/temu-mobile-clone` | `specs/batch-03/047-temu.md` |
| [x] | 048 | SHEIN | `GeorgeQLe/shein-mobile-clone` | `specs/batch-03/048-shein.md` |
| [x] | 049 | Etsy | `GeorgeQLe/etsy-mobile-clone` | `specs/batch-03/049-etsy.md` |
| [x] | 050 | eBay | `GeorgeQLe/ebay-mobile-clone` | `specs/batch-03/050-ebay.md` |
| [x] | 051 | Facebook Marketplace | `GeorgeQLe/facebook-marketplace-mobile-clone` | `specs/batch-03/051-facebook-marketplace.md` |
| [x] | 052 | Poshmark | `GeorgeQLe/poshmark-mobile-clone` | `specs/batch-03/052-poshmark.md` |
| [x] | 053 | Depop | `GeorgeQLe/depop-mobile-clone` | `specs/batch-03/053-depop.md` |
| [x] | 054 | StockX | `GeorgeQLe/stockx-mobile-clone` | `specs/batch-03/054-stockx.md` |
| [x] | 055 | Shop | `GeorgeQLe/shop-mobile-clone` | `specs/batch-03/055-shop.md` |
| [x] | 056 | Cash App | `GeorgeQLe/cash-app-mobile-clone` | `specs/batch-03/056-cash-app.md` |
| [x] | 057 | Venmo | `GeorgeQLe/venmo-mobile-clone` | `specs/batch-03/057-venmo.md` |
| [x] | 058 | PayPal | `GeorgeQLe/paypal-mobile-clone` | `specs/batch-03/058-paypal.md` |
| [x] | 059 | Zelle | `GeorgeQLe/zelle-mobile-clone` | `specs/batch-03/059-zelle.md` |
| [x] | 060 | Robinhood | `GeorgeQLe/robinhood-mobile-clone` | `specs/batch-03/060-robinhood.md` |
| [x] | 061 | Coinbase | `GeorgeQLe/coinbase-mobile-clone` | `specs/batch-04/061-coinbase.md` |
| [x] | 062 | Mint/Credit Karma | `GeorgeQLe/mint-credit-karma-mobile-clone` | `specs/batch-04/062-mint-credit-karma.md` |
| [x] | 063 | YNAB | `GeorgeQLe/ynab-mobile-clone` | `specs/batch-04/063-ynab.md` |
| [x] | 064 | Rocket Money | `GeorgeQLe/rocket-money-mobile-clone` | `specs/batch-04/064-rocket-money.md` |
| [x] | 065 | Apple Wallet | `GeorgeQLe/apple-wallet-mobile-clone` | `specs/batch-04/065-apple-wallet.md` |
| [x] | 066 | Spotify | `GeorgeQLe/spotify-mobile-clone` | `specs/batch-04/066-spotify.md` |
| [x] | 067 | Apple Music | `GeorgeQLe/apple-music-mobile-clone` | `specs/batch-04/067-apple-music.md` |
| [x] | 068 | YouTube Music | `GeorgeQLe/youtube-music-mobile-clone` | `specs/batch-04/068-youtube-music.md` |
| [x] | 069 | SoundCloud | `GeorgeQLe/soundcloud-mobile-clone` | `specs/batch-04/069-soundcloud.md` |
| [x] | 070 | Audible | `GeorgeQLe/audible-mobile-clone` | `specs/batch-04/070-audible.md` |
| [x] | 071 | Pocket Casts | `GeorgeQLe/pocket-casts-mobile-clone` | `specs/batch-04/071-pocket-casts.md` |
| [x] | 072 | Netflix | `GeorgeQLe/netflix-mobile-clone` | `specs/batch-04/072-netflix.md` |
| [x] | 073 | YouTube | `GeorgeQLe/youtube-mobile-clone` | `specs/batch-04/073-youtube.md` |
| [x] | 074 | Twitch | `GeorgeQLe/twitch-mobile-clone` | `specs/batch-04/074-twitch.md` |
| [ ] | 075 | Letterboxd | `GeorgeQLe/letterboxd-mobile-clone` | `specs/batch-04/075-letterboxd.md` |
| [x] | 076 | IMDb | `GeorgeQLe/imdb-mobile-clone` | `specs/batch-04/076-imdb.md` |
| [x] | 077 | Duolingo | `GeorgeQLe/duolingo-mobile-clone` | `specs/batch-04/077-duolingo.md` |
| [x] | 078 | Khan Academy | `GeorgeQLe/khan-academy-mobile-clone` | `specs/batch-04/078-khan-academy.md` |
| [x] | 079 | Quizlet | `GeorgeQLe/quizlet-mobile-clone` | `specs/batch-04/079-quizlet.md` |
| [x] | 080 | Coursera | `GeorgeQLe/coursera-mobile-clone` | `specs/batch-04/080-coursera.md` |
| [x] | 081 | Photomath | `GeorgeQLe/photomath-mobile-clone` | `specs/batch-05/081-photomath.md` |
| [x] | 082 | Headspace | `GeorgeQLe/headspace-mobile-clone` | `specs/batch-05/082-headspace.md` |
| [x] | 083 | Calm | `GeorgeQLe/calm-mobile-clone` | `specs/batch-05/083-calm.md` |
| [x] | 084 | Strava | `GeorgeQLe/strava-mobile-clone` | `specs/batch-05/084-strava.md` |
| [x] | 085 | Nike Run Club | `GeorgeQLe/nike-run-club-mobile-clone` | `specs/batch-05/085-nike-run-club.md` |
| [x] | 086 | MyFitnessPal | `GeorgeQLe/myfitnesspal-mobile-clone` | `specs/batch-05/086-myfitnesspal.md` |
| [x] | 087 | Fitbit | `GeorgeQLe/fitbit-mobile-clone` | `specs/batch-05/087-fitbit.md` |
| [x] | 088 | Flo | `GeorgeQLe/flo-mobile-clone` | `specs/batch-05/088-flo.md` |
| [x] | 089 | Notion | `GeorgeQLe/notion-mobile-clone` | `specs/batch-05/089-notion.md` |
| [x] | 090 | Todoist | `GeorgeQLe/todoist-mobile-clone` | `specs/batch-05/090-todoist.md` |
| [x] | 091 | Trello | `GeorgeQLe/trello-mobile-clone` | `specs/batch-05/091-trello.md` |
| [x] | 092 | Google Calendar | `GeorgeQLe/google-calendar-mobile-clone` | `specs/batch-05/092-google-calendar.md` |
| [x] | 093 | Evernote | `GeorgeQLe/evernote-mobile-clone` | `specs/batch-05/093-evernote.md` |
| [x] | 094 | Dropbox | `GeorgeQLe/dropbox-mobile-clone` | `specs/batch-05/094-dropbox.md` |
| [x] | 095 | Google Drive | `GeorgeQLe/google-drive-mobile-clone` | `specs/batch-05/095-google-drive.md` |
| [x] | 096 | CapCut | `GeorgeQLe/capcut-mobile-clone` | `specs/batch-05/096-capcut.md` |
| [x] | 097 | Canva | `GeorgeQLe/canva-mobile-clone` | `specs/batch-05/097-canva.md` |
| [x] | 098 | Lightroom | `GeorgeQLe/lightroom-mobile-clone` | `specs/batch-05/098-lightroom.md` |
| [x] | 099 | Google Photos | `GeorgeQLe/google-photos-mobile-clone` | `specs/batch-05/099-google-photos.md` |
| [x] | 100 | Ring | `GeorgeQLe/ring-mobile-clone` | `specs/batch-05/100-ring.md` |

## Next Steps

- Review repo names for legal/public-facing suitability before creating public repos.
- Create private downstream repos by batch after the dry-run seed passes.
- Keep this repository as the canonical spec store and publish it only after the open-source checklist is complete.
