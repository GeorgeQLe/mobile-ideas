# Todo — Mobile Ideas

> Current phase: 12 of 27 — Implementation: Social, Dating & Community (39 Apps × 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: tests-after, local validation only; GitHub Actions remain disabled unless separately approved

## Priority Task Queue

- [ ] Review `tasks/recurring-todo.md`: "Refresh research roadmap" — trigger condition may be eligible after the 2026-05-14 roadmap/todo/history reconciliation; promote to `tasks/todo.md` only if this requires concrete documentation execution before Phase 12 resumes.

## Phase 12: Implementation — Social, Dating & Community (39 Apps × 5 Variants)

### Goal

Build all five variants for every app in the Social, Dating & Community cluster.

### Scope

- Apps: Social media, dating, and creator-community apps.
- Shared patterns: feed/timeline, profiles, matching algorithms, real-time messaging, content moderation, and media upload/processing.
- Preserve Phase 11 carry-forward blockers for Flutter and Android Native toolchain validation; do not treat those blockers as resolved for later rollups.

### Acceptance Criteria

- [ ] All 39 apps have 5 working variants each (195 app builds).
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
| 006 | TikTok | `GeorgeQLe/tiktok-mobile-clone` | `specs/batch-01/006-tiktok.md` | Pilot (full spec) |
| 007 | Instagram | `GeorgeQLe/instagram-mobile-clone` | `specs/batch-01/007-instagram.md` | Pilot (full spec) |
| 008 | Snapchat | `GeorgeQLe/snapchat-mobile-clone` | `specs/batch-01/008-snapchat.md` | Pilot (full spec) |
| 009 | BeReal | `GeorgeQLe/bereal-mobile-clone` | `specs/batch-01/009-bereal.md` | Pilot (full spec) |
| 010 | Reddit | `GeorgeQLe/reddit-mobile-clone` | `specs/batch-01/010-reddit.md` | Pilot (full spec) |
| 011 | X | `GeorgeQLe/x-mobile-clone` | `specs/batch-01/011-x.md` | Pilot (full spec) |
| 012 | Bluesky | `GeorgeQLe/bluesky-mobile-clone` | `specs/batch-01/012-bluesky.md` | Pilot (full spec) |
| 013 | Threads | `GeorgeQLe/threads-mobile-clone` | `specs/batch-01/013-threads.md` | Pilot (full spec) |
| 014 | Pinterest | `GeorgeQLe/pinterest-mobile-clone` | `specs/batch-01/014-pinterest.md` | Pilot (full spec) |
| 015 | Lemon8 | `GeorgeQLe/lemon8-mobile-clone` | `specs/batch-01/015-lemon8.md` | Pilot (full spec) |
| 101 | Tinder | `GeorgeQLe/tinder-mobile-clone` | `specs/batch-06/101-tinder.md` | Dating (full spec) |
| 102 | Bumble | `GeorgeQLe/bumble-mobile-clone` | `specs/batch-06/102-bumble.md` | Dating (full spec) |
| 103 | Hinge | `GeorgeQLe/hinge-mobile-clone` | `specs/batch-06/103-hinge.md` | Dating (full spec) |
| 104 | Grindr | `GeorgeQLe/grindr-mobile-clone` | `specs/batch-06/104-grindr.md` | Dating (full spec) |
| 105 | Match | `GeorgeQLe/match-mobile-clone` | `specs/batch-06/105-match.md` | Dating (full spec) |
| 106 | Coffee Meets Bagel | `GeorgeQLe/coffee-meets-bagel-mobile-clone` | `specs/batch-06/106-coffee-meets-bagel.md` | Dating (full spec) |
| 915 | Mastodon | `GeorgeQLe/mastodon-mobile-clone` | `specs/batch-46/915-mastodon.md` | Batch (Draft 1) |
| 916 | Tumblr | `GeorgeQLe/tumblr-mobile-clone` | `specs/batch-46/916-tumblr.md` | Batch (Draft 1) |
| 917 | Flickr | `GeorgeQLe/flickr-mobile-clone` | `specs/batch-46/917-flickr.md` | Batch (Draft 1) |
| 918 | 500px | `GeorgeQLe/500px-mobile-clone` | `specs/batch-46/918-500px.md` | Batch (Draft 1) |
| 919 | Clubhouse | `GeorgeQLe/clubhouse-mobile-clone` | `specs/batch-46/919-clubhouse.md` | Batch (Draft 1) |
| 920 | Amino | `GeorgeQLe/amino-mobile-clone` | `specs/batch-46/920-amino.md` | Batch (Draft 1) |
| 921 | Weverse | `GeorgeQLe/weverse-mobile-clone` | `specs/batch-47/921-weverse.md` | Batch (Draft 1) |
| 922 | Patreon | `GeorgeQLe/patreon-mobile-clone` | `specs/batch-47/922-patreon.md` | Batch (Draft 1) |
| 923 | Buy Me a Coffee | `GeorgeQLe/buy-me-a-coffee-mobile-clone` | `specs/batch-47/923-buy-me-a-coffee.md` | Batch (Draft 1) |
| 924 | Ko-fi | `GeorgeQLe/ko-fi-mobile-clone` | `specs/batch-47/924-ko-fi.md` | Batch (Draft 1) |
| 925 | Cameo | `GeorgeQLe/cameo-mobile-clone` | `specs/batch-47/925-cameo.md` | Batch (Draft 1) |
| 926 | Guilded | `GeorgeQLe/guilded-mobile-clone` | `specs/batch-47/926-guilded.md` | Batch (Draft 1) |
| 927 | Geneva | `GeorgeQLe/geneva-mobile-clone` | `specs/batch-47/927-geneva.md` | Batch (Draft 1) |
| 928 | Fizz | `GeorgeQLe/fizz-mobile-clone` | `specs/batch-47/928-fizz.md` | Batch (Draft 1) |
| 929 | Yubo | `GeorgeQLe/yubo-mobile-clone` | `specs/batch-47/929-yubo.md` | Batch (Draft 1) |
| 930 | Poparazzi | `GeorgeQLe/poparazzi-mobile-clone` | `specs/batch-47/930-poparazzi.md` | Batch (Draft 1) |
| 931 | NGL | `GeorgeQLe/ngl-mobile-clone` | `specs/batch-47/931-ngl.md` | Batch (Draft 1) |
| 932 | Tellonym | `GeorgeQLe/tellonym-mobile-clone` | `specs/batch-47/932-tellonym.md` | Batch (Draft 1) |
| 933 | Rumble | `GeorgeQLe/rumble-mobile-clone` | `specs/batch-47/933-rumble.md` | Batch (Draft 1) |
| 934 | Truth Social | `GeorgeQLe/truth-social-mobile-clone` | `specs/batch-47/934-truth-social.md` | Batch (Draft 1) |
| 986 | Mighty Networks | `GeorgeQLe/mighty-networks-mobile-clone` | `specs/batch-50/986-mighty-networks.md` | Batch (Draft 1) |
| 987 | Circle Communities | `GeorgeQLe/circle-communities-mobile-clone` | `specs/batch-50/987-circle-communities.md` | Batch (Draft 1) |
| 988 | Skool | `GeorgeQLe/skool-mobile-clone` | `specs/batch-50/988-skool.md` | Batch (Draft 1) |

### Implementation

- [x] Step 12.1: Scaffold multi-variant structure across all 39 Social, Dating & Community repos
  - Files: all 39 downstream repos listed in App Inventory.
  - For each repo: verify private visibility, root commit, copied source spec under `docs/source-specs/`, `docs/plans/README.md`, and `variants/` directories for React Native, Flutter, Expo, iOS Native, and Android Native.
  - Create or repair missing `shared/` directories (`assets`, `api-contracts`, `test-fixtures`) with `.gitkeep`.
  - Do not enable or trigger GitHub Actions. If workflow templates exist, keep Actions disabled and use local validation only.
  - Execute serially with at least 30 seconds between downstream repo mutations when repo writes are required.
  - Verify via `gh api` that every touched repo remains `PRIVATE`.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Prepare the Phase 12 downstream implementation surface so each app has the same five-variant scaffold and shared directories established in Phase 11.

  **Approach:**
  1. Read `tasks/repo-seeding.md` for the current downstream status of IDs 006-015, 101-106, 915-934, and 986-988.
  2. For each repo, serially verify privacy, default branch, root README, copied source spec, and build plan.
  3. Clone or refresh only the repos that need scaffold inspection or repair.
  4. Add missing variant/shared directories using the existing Phase 11 structure as the pattern.
  5. Commit and push downstream repairs serially on each repo's `main` branch.
  6. Record verification results in `tasks/todo.md` and `tasks/history.md`.

  **Acceptance Criteria:**
  - All 39 repos are verified private.
  - All 39 repos have `variants/react-native`, `variants/flutter`, `variants/expo`, `variants/ios-native`, and `variants/android-native`.
  - All 39 repos have `shared/assets`, `shared/api-contracts`, and `shared/test-fixtures`.
  - All 39 repos have source specs copied under `docs/source-specs/`.
  - No GitHub Actions are enabled, dispatched, or used as validation.

  **Review — 2026-05-14:**
  - Added `scripts/verify-phase12-scaffold.mjs` to make downstream scaffold checks reproducible.
  - Pre-repair verification confirmed all 39 repos were private, had root commits, had `README.md`, had `docs/plans/README.md`, and had copied source specs under `docs/source-specs/`.
  - Repaired missing scaffold directories in all 39 downstream repos by adding `.gitkeep` files under `variants/react-native`, `variants/flutter`, `variants/expo`, `variants/ios-native`, `variants/android-native`, `shared/assets`, `shared/api-contracts`, and `shared/test-fixtures`.
  - Downstream repair command: `node scripts/verify-phase12-scaffold.mjs --repair`; result: `checked=39`, `repairedCount=39`, `failures=0`.
  - Final verification command: `node scripts/verify-phase12-scaffold.mjs`; result: `checked=39`, `repairedCount=0`, `failures=0`.
  - No GitHub Actions were enabled, dispatched, or used. No repo visibility changes were made.

  **Ship Manifest:**
  - User goal: execute Phase 12 Step 12.1 and prepare every Social, Dating & Community downstream repo for five-variant implementation.
  - Changed files: 39 downstream repos received scaffold `.gitkeep` files; this repo changed `scripts/verify-phase12-scaffold.mjs`, `tasks/todo.md`, `tasks/history.md`, and `tasks/repo-seeding.md`.
  - Per-file purpose: downstream repos now have the required empty variant/shared directories; verifier script preserves the exact scaffold contract; task/history/seeding docs record evidence and next work.
  - User-goal mapping: satisfies Step 12.1 without app code, proprietary assets, public visibility changes, or GitHub Actions.
  - Tests run: final `node scripts/verify-phase12-scaffold.mjs` network verification across all 39 private repos.
  - Skipped tests: local app builds/lint/typecheck/tests were skipped because Step 12.1 is scaffold-only; those belong to implementation and validation steps 12.2-12.13.
  - Adversarial review: the verifier checks privacy, root commit/default branch, seed docs, source spec copy, five variant directories, and three shared directories; it avoids claiming implementation or validation parity.
  - Residual risk: scaffold directories are intentionally empty placeholders; future implementation steps must add real code and executable evidence.
  - Rollback note: revert the downstream `chore: add multi-variant scaffold` commits and this planning commit if the scaffold convention changes.
  - Next command: `$run` for Step 12.2.

  **Next work:** Step 12.2 — implement pilot app 1, TikTok clone, across all five variants.
  **Recommended next command:** `$run`

- [ ] Step 12.2: Implement pilot app 1 — TikTok clone (all 5 variants)
  - Files: `GeorgeQLe/tiktok-mobile-clone` — all 5 `variants/` directories.
  - Read source spec `specs/batch-01/006-tiktok.md` and downstream build plan.
  - Implement: vertical video feed, creator profile, upload/edit flow, sound metadata, comments, sharing, discovery/search, moderation/reporting, privacy controls, and age-appropriate safety gates.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Implement the TikTok-inspired lawful clone in `GeorgeQLe/tiktok-mobile-clone` across React Native, Flutter, Expo, iOS Native, and Android Native variants, using original UI/content/data only.

  **Approach:**
  1. Clone or refresh `GeorgeQLe/tiktok-mobile-clone` and verify it remains `PRIVATE`.
  2. Read `docs/source-specs/006-tiktok.md`, `docs/plans/README.md`, and any downstream task docs before coding.
  3. Implement shared synthetic fixtures and API contracts for video feed, creator profiles, uploads, sound metadata, comments, discovery/search, sharing, moderation/reporting, privacy controls, and age/safety gates.
  4. Build each variant inside its own `variants/*` directory, preserving stack-local conventions and avoiding shared code that forces one framework's assumptions onto another.
  5. Add focused local tests or smoke checks per variant where the stack has available tooling; record explicit blockers for Flutter/Android if the inherited local toolchain gap still applies.
  6. Run validation locally only; do not enable, dispatch, or rely on GitHub Actions.
  7. Commit and push downstream implementation work serially on the repo primary branch, then record evidence back in this planning repo.

  **Acceptance Criteria:**
  - All five TikTok variant directories contain runnable implementation code or an explicit local toolchain blocker.
  - Core social video workflows, safety/moderation flows, and privacy/age gates are represented with original assets and synthetic data.
  - Local validation evidence or blocker records exist for every variant.
  - No proprietary TikTok assets, trademarks as branding, copied media, private APIs, production data, or GitHub Actions are introduced.

- [ ] Step 12.3: Implement pilot app 2 — Instagram clone (all 5 variants)
  - Files: `GeorgeQLe/instagram-mobile-clone` — all 5 `variants/` directories.
  - Read source spec `specs/batch-01/007-instagram.md` and downstream build plan.
  - Implement: auth/onboarding, home feed, stories/reels-like short video surfaces, profile grid, media creation, direct messaging, notifications, privacy controls, reporting/blocking, and content moderation.
  - Category-specific safety review: creator/community content, minor safety, harassment/reporting, public profile privacy, and media upload constraints.

- [ ] Step 12.4: Implement pilot app 3 — Snapchat clone (all 5 variants)
  - Files: `GeorgeQLe/snapchat-mobile-clone` — all 5 `variants/` directories.
  - Implement: camera-first shell, ephemeral messaging model, stories, friends, chat, memories, location/privacy controls, reporting/blocking, and safety gates.

- [ ] Step 12.5: Implement batch apps 009-015 — BeReal, Reddit, X, Bluesky, Threads, Pinterest, Lemon8 (all 5 variants each)
  - Files: 7 downstream repos.
  - Shared patterns: feed/timeline, comments, profiles, media posts, saved items, search/discovery, moderation.

- [ ] Step 12.6: Implement dating apps 101-106 — Tinder, Bumble, Hinge, Grindr, Match, Coffee Meets Bagel (all 5 variants each)
  - Files: 6 downstream repos.
  - Category-specific risk review required for dating, location, privacy, harassment prevention, blocking/reporting, age gates, and identity/safety verification.

- [ ] Step 12.7: Implement social/community apps 915-920 — Mastodon, Tumblr, Flickr, 500px, Clubhouse, Amino (all 5 variants each)
  - Files: 6 downstream repos.
  - Shared patterns: profile/community graph, activity feeds, media activity records, follow/friend models, privacy controls, and moderation.

- [ ] Step 12.8: Implement creator/community apps 921-926 — Weverse, Patreon, Buy Me a Coffee, Ko-fi, Cameo, Guilded (all 5 variants each)
  - Files: 6 downstream repos.
  - Category-specific risk review required for creator monetization, subscriptions, payments, moderation, and age/region restrictions.

- [ ] Step 12.9: Implement social/community apps 927-934 — Geneva, Fizz, Yubo, Poparazzi, NGL, Tellonym, Rumble, Truth Social (all 5 variants each)
  - Files: 8 downstream repos.
  - Shared patterns: communities/groups, real-time chat or interaction loops, creator profiles, local/community safety, reporting, and moderation.

- [ ] Step 12.10: Implement creator community platforms 986-988 — Mighty Networks, Circle Communities, Skool (all 5 variants each)
  - Files: 3 downstream repos.
  - Shared patterns: paid communities, courses/resources, member directories, creator monetization, admin moderation, notifications, and privacy controls.

- [ ] Step 12.11: Validate all 39 repos without GitHub Actions
  - Run local build, lint, type check, and tests where toolchains are available.
  - Record executable evidence and explicit blockers, including any inherited Flutter/Android toolchain limits.
  - Fix validation failures before proceeding unless the user explicitly approves blocker carry-forward.

- [ ] Step 12.12: Run benchmarking harness and record scorecards
  - Run `mobile-benchmark-harness` serially against locally benchmarkable variants.
  - Record scorecards and blocker artifacts under `tasks/scorecards/phase-12/`.
  - Do not invent scores for blocked variants.

- [ ] Step 12.13: Phase 12 final validation and cleanup
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
- Source specs: `specs/batch-01/` (IDs 006-015), `specs/batch-06/` (IDs 101-106), `specs/batch-46/` (IDs 915-920), `specs/batch-47/` (IDs 921-934), and `specs/batch-50/` (IDs 986-988)
- Phase 11 carry-forward blockers: `tasks/phase-11-validation-report.md`, `tasks/scorecards/phase-11/benchmark-blockers.json`
