# Todo — Mobile Ideas

> Current phase: 12 of 27 — Implementation: Social, Dating & Community (~31 Apps × 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: tests-after, local validation only; GitHub Actions remain disabled unless separately approved

## Phase 12: Implementation — Social, Dating & Community (~31 Apps × 5 Variants)

### Goal

Build all five variants for every app in the Social, Dating & Community cluster.

### Scope

- Apps: Social media, dating, and creator-community apps.
- Shared patterns: feed/timeline, profiles, matching algorithms, real-time messaging, content moderation, and media upload/processing.
- Preserve Phase 11 carry-forward blockers for Flutter and Android Native toolchain validation; do not treat those blockers as resolved for later rollups.

### Acceptance Criteria

- [ ] All ~31 apps have 5 working variants each (~155 app builds).
- [ ] Every variant passes local validation where toolchains are available and has benchmark evidence or an explicit blocker record.
- [ ] Content moderation and safety flows are implemented per spec.
- [ ] No proprietary assets, trademarks, copyrighted media, copied code, or private APIs are introduced.
- [ ] Manual verification blockers are documented and not falsely claimed as resolved.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low (each app is an independent GitHub repo)
**Review gates:** local validation, benchmark/blocker artifacts, spec compliance, content-safety review, legal/asset review

**Subagent lanes:** none yet. Per-step lanes must be defined at execution time. If write lanes are used, each lane must own a separate non-primary GitHub branch and pass consolidation/PR review before integration.

### App Inventory

| # | App | Repo | Spec | Tier |
|--:|-----|------|------|------|
| 006 | Instagram | `GeorgeQLe/instagram-mobile-clone` | `specs/batch-01/006-instagram.md` | Pilot (full spec) |
| 007 | TikTok | `GeorgeQLe/tiktok-mobile-clone` | `specs/batch-01/007-tiktok.md` | Pilot (full spec) |
| 008 | Snapchat | `GeorgeQLe/snapchat-mobile-clone` | `specs/batch-01/008-snapchat.md` | Pilot (full spec) |
| 009 | X | `GeorgeQLe/x-mobile-clone` | `specs/batch-01/009-x.md` | Pilot (full spec) |
| 010 | Facebook | `GeorgeQLe/facebook-mobile-clone` | `specs/batch-01/010-facebook.md` | Pilot (full spec) |
| 223 | Threads | `GeorgeQLe/threads-mobile-clone` | `specs/batch-03/223-threads.md` | Batch (Draft 1) |
| 224 | Reddit | `GeorgeQLe/reddit-mobile-clone` | `specs/batch-03/224-reddit.md` | Batch (Draft 1) |
| 225 | Pinterest | `GeorgeQLe/pinterest-mobile-clone` | `specs/batch-03/225-pinterest.md` | Batch (Draft 1) |
| 226 | BeReal | `GeorgeQLe/bereal-mobile-clone` | `specs/batch-03/226-bereal.md` | Batch (Draft 1) |
| 227 | Lemon8 | `GeorgeQLe/lemon8-mobile-clone` | `specs/batch-03/227-lemon8.md` | Batch (Draft 1) |
| 228 | Discord | `GeorgeQLe/discord-mobile-clone` | `specs/batch-03/228-discord.md` | Batch (Draft 1) |
| 229 | Clubhouse | `GeorgeQLe/clubhouse-mobile-clone` | `specs/batch-03/229-clubhouse.md` | Batch (Draft 1) |
| 230 | Mastodon | `GeorgeQLe/mastodon-mobile-clone` | `specs/batch-03/230-mastodon.md` | Batch (Draft 1) |
| 231 | Bluesky | `GeorgeQLe/bluesky-mobile-clone` | `specs/batch-03/231-bluesky.md` | Batch (Draft 1) |
| 232 | Tumblr | `GeorgeQLe/tumblr-mobile-clone` | `specs/batch-03/232-tumblr.md` | Batch (Draft 1) |
| 233 | Meetup | `GeorgeQLe/meetup-mobile-clone` | `specs/batch-03/233-meetup.md` | Batch (Draft 1) |
| 234 | Nextdoor | `GeorgeQLe/nextdoor-mobile-clone` | `specs/batch-03/234-nextdoor.md` | Batch (Draft 1) |
| 235 | Twitch | `GeorgeQLe/twitch-mobile-clone` | `specs/batch-03/235-twitch.md` | Batch (Draft 1) |
| 236 | Patreon | `GeorgeQLe/patreon-mobile-clone` | `specs/batch-03/236-patreon.md` | Batch (Draft 1) |
| 237 | OnlyFans | `GeorgeQLe/onlyfans-mobile-clone` | `specs/batch-03/237-onlyfans.md` | Batch (Draft 1) |
| 238 | Tinder | `GeorgeQLe/tinder-mobile-clone` | `specs/batch-03/238-tinder.md` | Batch (Draft 1) |
| 239 | Bumble | `GeorgeQLe/bumble-mobile-clone` | `specs/batch-03/239-bumble.md` | Batch (Draft 1) |
| 240 | Hinge | `GeorgeQLe/hinge-mobile-clone` | `specs/batch-03/240-hinge.md` | Batch (Draft 1) |
| 241 | Grindr | `GeorgeQLe/grindr-mobile-clone` | `specs/batch-03/241-grindr.md` | Batch (Draft 1) |
| 242 | HER | `GeorgeQLe/her-mobile-clone` | `specs/batch-03/242-her.md` | Batch (Draft 1) |
| 243 | Coffee Meets Bagel | `GeorgeQLe/coffee-meets-bagel-mobile-clone` | `specs/batch-03/243-coffee-meets-bagel.md` | Batch (Draft 1) |
| 244 | Yubo | `GeorgeQLe/yubo-mobile-clone` | `specs/batch-03/244-yubo.md` | Batch (Draft 1) |
| 245 | VSCO | `GeorgeQLe/vsco-mobile-clone` | `specs/batch-03/245-vsco.md` | Batch (Draft 1) |
| 246 | Letterboxd | `GeorgeQLe/letterboxd-mobile-clone` | `specs/batch-03/246-letterboxd.md` | Batch (Draft 1) |
| 247 | Goodreads | `GeorgeQLe/goodreads-mobile-clone` | `specs/batch-03/247-goodreads.md` | Batch (Draft 1) |
| 248 | Strava | `GeorgeQLe/strava-mobile-clone` | `specs/batch-03/248-strava.md` | Batch (Draft 1) |

### Implementation

- [ ] Step 12.1: Scaffold multi-variant structure across all 31 Social, Dating & Community repos
  - Files: all 31 downstream repos listed in App Inventory.
  - For each repo: verify private visibility, root commit, copied source spec under `docs/source-specs/`, `docs/plans/README.md`, and `variants/` directories for React Native, Flutter, Expo, iOS Native, and Android Native.
  - Create or repair missing `shared/` directories (`assets`, `api-contracts`, `test-fixtures`) with `.gitkeep`.
  - Do not enable or trigger GitHub Actions. If workflow templates exist, keep Actions disabled and use local validation only.
  - Execute serially with at least 30 seconds between downstream repo mutations when repo writes are required.
  - Verify via `gh api` that every touched repo remains `PRIVATE`.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Prepare the Phase 12 downstream implementation surface so each app has the same five-variant scaffold and shared directories established in Phase 11.

  **Approach:**
  1. Read `tasks/repo-seeding.md` for the current downstream status of IDs 006-010 and 223-248.
  2. For each repo, serially verify privacy, default branch, root README, copied source spec, and build plan.
  3. Clone or refresh only the repos that need scaffold inspection or repair.
  4. Add missing variant/shared directories using the existing Phase 11 structure as the pattern.
  5. Commit and push downstream repairs serially on each repo's `main` branch.
  6. Record verification results in `tasks/todo.md` and `tasks/history.md`.

  **Acceptance Criteria:**
  - All 31 repos are verified private.
  - All 31 repos have `variants/react-native`, `variants/flutter`, `variants/expo`, `variants/ios-native`, and `variants/android-native`.
  - All 31 repos have `shared/assets`, `shared/api-contracts`, and `shared/test-fixtures`.
  - All 31 repos have source specs copied under `docs/source-specs/`.
  - No GitHub Actions are enabled, dispatched, or used as validation.

  **Next work:** Step 12.1 — scaffold and verify Phase 12 downstream repos.
  **Recommended next command:** `$run`

  **Blocked 2026-05-14: inventory drift discovered during read-only GitHub audit.**
  - Verified via `gh api`/`gh repo view` that 28 listed repos exist, are `PRIVATE`, have a root commit, have no `.github/workflows/`, and are missing the Step 12.1 scaffold paths.
  - Blocked before downstream mutation because three inventory rows do not resolve and conflict with the canonical manifest/roadmap:
    - `010` is listed here as Facebook (`GeorgeQLe/facebook-mobile-clone`, `specs/batch-01/010-facebook.md`), but `tasks/roadmap.md` and `tasks/repo-seeding.md` map `010` to Reddit (`GeorgeQLe/reddit-mobile-clone`, `specs/batch-01/010-reddit.md`).
    - `237` is listed here as OnlyFans (`GeorgeQLe/onlyfans-mobile-clone`, `specs/batch-03/237-onlyfans.md`), but `tasks/roadmap.md` and `tasks/repo-seeding.md` map `237` to Meitu (`GeorgeQLe/meitu-mobile-clone`, `specs/batch-12/237-meitu.md`).
    - `242` is listed here as HER (`GeorgeQLe/her-mobile-clone`, `specs/batch-03/242-her.md`), but `tasks/roadmap.md` and `tasks/repo-seeding.md` map `242` to Remini (`GeorgeQLe/remini-mobile-clone`, `specs/batch-13/242-remini.md`).
  - Required next action: reconcile Phase 12 app inventory against `tasks/roadmap.md` and `tasks/repo-seeding.md` before rerunning Step 12.1 repairs.

## Development Docs Reconciliation

- [ ] Resolve Phase 12 inventory contradiction before downstream mutations
  - Finding: `tasks/todo.md` Phase 12 combines Social, Dating & Community labels with app IDs/spec paths that belong to other roadmap clusters. The clearest hard conflicts are `010` (todo says Facebook but roadmap/manifest say Reddit), `223-248` (todo says social/community/dating apps but `tasks/ideas.md`, `specs/`, and `tasks/repo-seeding.md` map these IDs to photo/video creation apps), `237` (todo says OnlyFans but roadmap/manifest say Meitu), and `242` (todo says HER but roadmap/manifest say Remini).
  - Evidence: `tasks/roadmap.md` Phase Overview marks Phase 12 as Social, Dating & Community; `tasks/repo-seeding.md` maps `010` to `GeorgeQLe/reddit-mobile-clone`, `237` to `GeorgeQLe/meitu-mobile-clone`, and `242` to `GeorgeQLe/remini-mobile-clone`; `specs/batch-12/README.md` and `specs/batch-13/` map `223-248` to photo/video creation specs.
  - Required decision: choose the canonical Phase 12 app inventory from the roadmap taxonomy and manifest before Step 12.1 performs any repo writes.
  - Stop condition: do not scaffold, clone, commit, push, or verify downstream Phase 12 repos from the current inventory until this contradiction is resolved.

- [ ] Step 12.2: Implement pilot app 1 — Instagram clone (all 5 variants)
  - Files: `GeorgeQLe/instagram-mobile-clone` — all 5 `variants/` directories.
  - Read source spec `specs/batch-01/006-instagram.md` and downstream build plan.
  - Implement: auth/onboarding, home feed, stories/reels-like short video surfaces, profile grid, media creation, direct messaging, notifications, privacy controls, reporting/blocking, and content moderation.
  - Category-specific safety review: creator/community content, minor safety, harassment/reporting, public profile privacy, and media upload constraints.

- [ ] Step 12.3: Implement pilot app 2 — TikTok clone (all 5 variants)
  - Files: `GeorgeQLe/tiktok-mobile-clone` — all 5 `variants/` directories.
  - Implement: vertical video feed, creator profile, upload/edit flow, sound metadata, comments, sharing, discovery/search, moderation/reporting, privacy controls, and age-appropriate safety gates.

- [ ] Step 12.4: Implement pilot app 3 — Snapchat clone (all 5 variants)
  - Files: `GeorgeQLe/snapchat-mobile-clone` — all 5 `variants/` directories.
  - Implement: camera-first shell, ephemeral messaging model, stories, friends, chat, memories, location/privacy controls, reporting/blocking, and safety gates.

- [ ] Step 12.5: Implement pilot app 4 — X clone (all 5 variants)
  - Files: `GeorgeQLe/x-mobile-clone` — all 5 `variants/` directories.
  - Implement: timeline, posting, replies, reposts, quote posts, DMs, notifications, search/trends, communities/lists, moderation/reporting, and account safety controls.

- [ ] Step 12.6: Implement pilot app 5 — Facebook clone (all 5 variants)
  - Files: `GeorgeQLe/facebook-mobile-clone` — all 5 `variants/` directories.
  - Implement: feed, profiles, friends, groups, pages, events, marketplace-style placeholders only where lawful, messenger surface, notifications, privacy controls, and reporting.

- [ ] Step 12.7: Implement batch apps 223-227 — Threads, Reddit, Pinterest, BeReal, Lemon8 (all 5 variants each)
  - Files: 5 downstream repos.
  - Shared patterns: feed/timeline, comments, profiles, media posts, saved items, search/discovery, moderation.

- [ ] Step 12.8: Implement batch apps 228-234 — Discord, Clubhouse, Mastodon, Bluesky, Tumblr, Meetup, Nextdoor (all 5 variants each)
  - Files: 7 downstream repos.
  - Shared patterns: communities/servers/groups, real-time chat or audio rooms, federated/profile models where applicable, local/community safety.

- [ ] Step 12.9: Implement batch apps 235-237 — Twitch, Patreon, OnlyFans (all 5 variants each)
  - Files: 3 downstream repos.
  - Category-specific risk review required for creator monetization, adult-content gating, subscriptions, payments, moderation, and age/region restrictions.

- [ ] Step 12.10: Implement batch apps 238-244 — Tinder, Bumble, Hinge, Grindr, HER, Coffee Meets Bagel, Yubo (all 5 variants each)
  - Files: 7 downstream repos.
  - Category-specific risk review required for dating, location, privacy, harassment prevention, blocking/reporting, age gates, and identity/safety verification.

- [ ] Step 12.11: Implement batch apps 245-248 — VSCO, Letterboxd, Goodreads, Strava (all 5 variants each)
  - Files: 4 downstream repos.
  - Shared patterns: profile/community graph, activity feeds, reviews/media/activity records, follow/friend models, privacy controls, and moderation.

- [ ] Step 12.12: Validate all 31 repos without GitHub Actions
  - Run local build, lint, type check, and tests where toolchains are available.
  - Record executable evidence and explicit blockers, including any inherited Flutter/Android toolchain limits.
  - Fix validation failures before proceeding unless the user explicitly approves blocker carry-forward.

- [ ] Step 12.13: Run benchmarking harness and record scorecards
  - Run `mobile-benchmark-harness` serially against locally benchmarkable variants.
  - Record scorecards and blocker artifacts under `tasks/scorecards/phase-12/`.
  - Do not invent scores for blocked variants.

- [ ] Step 12.14: Phase 12 final validation and cleanup
  - Verify acceptance criteria.
  - Audit source/assets for legal hygiene and copied-brand risks.
  - Document manual verification blockers.
  - Mark Phase 12 complete only if validation and benchmark evidence are complete or explicitly approved for carry-forward.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- CI/CD templates: `templates/ci/` (do not use GitHub Actions without explicit approval)
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Source specs: `specs/batch-01/` (IDs 006-010), `specs/batch-03/` (IDs 223-248)
- Phase 11 carry-forward blockers: `tasks/phase-11-validation-report.md`, `tasks/scorecards/phase-11/benchmark-blockers.json`
