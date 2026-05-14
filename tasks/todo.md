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

- [x] Step 12.2: Implement pilot app 1 — TikTok clone (all 5 variants)
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

  **Review — 2026-05-14:**
  - Implemented the downstream `PulseFrame` short-video prototype in `GeorgeQLe/tiktok-mobile-clone` at commit `44f892d` on `main`.
  - Added shared synthetic fixture and API contract coverage for vertical feed, creator profiles, upload/edit metadata, sound attribution, comments, sharing, discovery/search, reporting/moderation, privacy controls, recommendation reset, and age safety gates.
  - Added variant code under React Native, Expo, Flutter, iOS Native, and Android Native directories.
  - Added downstream validation evidence at `tasks/validation/phase12-step12-2.md`.
  - Verified downstream repo remains `PRIVATE` with default branch `main`.
  - Preserved launch blockers for direct messages, LIVE, commerce, gifts/coins, native permissions, push payloads, real account lifecycle, and exact native parity.
  - No GitHub Actions were enabled, dispatched, or used.

  **Validation — 2026-05-14:**
  - `npm run validate` passed in `/tmp/tiktok-mobile-clone`.
  - `npm run test:react-native` passed in `/tmp/tiktok-mobile-clone`.
  - `npm run test:expo` passed in `/tmp/tiktok-mobile-clone`.
  - `swiftc variants/ios-native/Sources/ShortVideoClone/AppModel.swift variants/ios-native/Sources/ShortVideoClone/main.swift -o /tmp/pulseframe-ios && /tmp/pulseframe-ios` passed and printed the model summary.
  - `git diff --check` passed before downstream commit.
  - `node scripts/verify-phase12-scaffold.mjs` passed in this planning repo: `checked=39`, `repairedCount=0`, `failures=0`.
  - Flutter runtime validation remains blocked because `dart` and `flutter` are not installed locally.
  - Android Native runtime validation remains blocked because `kotlinc` is not installed locally.

  **Ship Manifest:**
  - User goal: execute Phase 12 Step 12.2 and implement the TikTok-inspired lawful clone across all five downstream variants.
  - Changed files: downstream `GeorgeQLe/tiktok-mobile-clone` received shared fixtures/contracts, variant source files, validation script, validation record, package scripts, and task/history updates; this planning repo changed `tasks/todo.md` and `tasks/history.md`.
  - Per-file purpose: downstream files provide original synthetic app surfaces and reproducible contract checks; planning files record evidence and next work.
  - User-goal mapping: satisfies Step 12.2 without proprietary TikTok assets, brand claims, private APIs, production data, public visibility changes, or GitHub Actions.
  - Tests run: downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compilation/run, downstream `git diff --check`, planning repo `git diff --check`, planning repo `node scripts/verify-phase12-scaffold.mjs`, and remote privacy/default-branch verification.
  - Skipped tests: Flutter and Android Native runtime checks are blocked by missing local Dart/Flutter and Kotlin toolchains; real-device camera/push/account verification remains a manual blocker.
  - Adversarial review: implementation uses original `PulseFrame` naming and synthetic data, keeps high-risk LIVE/commerce/DM features gated, and records blocked native parity rather than claiming full launch readiness.
  - Residual risk: variant code is a lightweight baseline, not production device builds; full stack manifests and real toolchain/device validation remain future work.
  - Rollback note: revert downstream commit `44f892d`, then revert this planning commit.
  - Next command: `$run` for Step 12.3.

- [x] Step 12.3: Implement pilot app 2 — Instagram clone (all 5 variants)
  - Files: `GeorgeQLe/instagram-mobile-clone` — all 5 `variants/` directories.
  - Read source spec `specs/batch-01/007-instagram.md` and downstream build plan.
  - Implement: auth/onboarding, home feed, stories/reels-like short video surfaces, profile grid, media creation, direct messaging, notifications, privacy controls, reporting/blocking, and content moderation.
  - Category-specific safety review: creator/community content, minor safety, harassment/reporting, public profile privacy, and media upload constraints.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Implement the Instagram-inspired lawful clone in `GeorgeQLe/instagram-mobile-clone` across React Native, Flutter, Expo, iOS Native, and Android Native variants, using original UI/content/data only.

  **Approach:**
  1. Clone or refresh `GeorgeQLe/instagram-mobile-clone` and verify it remains `PRIVATE`.
  2. Read `docs/source-specs/007-instagram.md`, `docs/plans/README.md`, and downstream task docs before coding.
  3. Implement shared synthetic fixtures and API contracts for auth/onboarding, home feed, stories, short video, profile grid, media creation, direct messaging, notifications, privacy controls, reporting/blocking, moderation, and minor safety.
  4. Build each variant inside its own `variants/*` directory, preserving stack-local conventions and avoiding shared framework assumptions.
  5. Add focused local contract checks where the stack has available tooling; record explicit blockers for Flutter/Android if inherited local toolchain gaps still apply.
  6. Run validation locally only; do not enable, dispatch, or rely on GitHub Actions.
  7. Commit and push downstream implementation work through a non-primary branch and consolidation PR, then record evidence back in this planning repo.

  **Acceptance Criteria:**
  - All five Instagram variant directories contain runnable implementation code or an explicit local toolchain blocker.
  - Core media-social workflows, safety/moderation flows, privacy defaults, and minor-safety gates are represented with original assets and synthetic data.
  - Local validation evidence or blocker records exist for every variant.
  - No proprietary Instagram assets, trademarks as branding, copied media, private APIs, production data, or GitHub Actions are introduced.

  **Review — 2026-05-14:**
  - Implemented the downstream `LumenLane` media-social prototype in `GeorgeQLe/instagram-mobile-clone`.
  - Used branch-backed lane `phase12-instagram-variants`, opened PR `https://github.com/GeorgeQLe/instagram-mobile-clone/pull/1`, and squash-merged to `main` at commit `00fca5c`.
  - Added shared synthetic fixture and API contract coverage for auth/onboarding, home feed, stories, short video, profile grid, media creation, direct messaging, notifications, privacy controls, reporting/blocking, content moderation, and minor safety.
  - Added variant code under React Native, Expo, Flutter, iOS Native, and Android Native directories.
  - Added downstream validation evidence at `tasks/validation/phase12-step12-3.md`.
  - Verified downstream repo remains `PRIVATE` with default branch `main`.
  - Preserved launch blockers for creator payouts, ad targeting, public minor messaging, external shopping, cross-account import, native screenshots, real account lifecycle, entitlement flows, notification payloads, deletion/export completion, and region/device parity.
  - No GitHub Actions were enabled, dispatched, or used.

  **Validation — 2026-05-14:**
  - `npm run validate` passed in `/tmp/instagram-mobile-clone`.
  - `npm run test:react-native` passed in `/tmp/instagram-mobile-clone`.
  - `npm run test:expo` passed in `/tmp/instagram-mobile-clone`.
  - `swiftc -module-cache-path /tmp/swift-module-cache variants/ios-native/Sources/MediaSocialClone/AppModel.swift variants/ios-native/Sources/MediaSocialClone/main.swift -o /tmp/lumenlane-ios && /tmp/lumenlane-ios` passed and printed the model summary.
  - `git diff --cached --check` passed before downstream commit.
  - Flutter runtime validation remains blocked because `dart` and `flutter` are not installed locally.
  - Android Native runtime validation remains blocked because `kotlinc` is not installed locally.

  **Ship Manifest:**
  - User goal: execute Phase 12 Step 12.3 and implement the Instagram-inspired lawful clone across all five downstream variants.
  - Changed files: downstream `GeorgeQLe/instagram-mobile-clone` received shared fixtures/contracts, variant source files, validation script, validation record, and package scripts; this planning repo changed `tasks/todo.md` and `tasks/history.md`.
  - Per-file purpose: downstream files provide original synthetic app surfaces and reproducible contract checks; planning files record evidence and next work.
  - User-goal mapping: satisfies Step 12.3 without proprietary Instagram assets, brand claims, private APIs, production data, public visibility changes, or GitHub Actions.
  - Tests run: downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compilation/run, downstream `git diff --cached --check`, and remote privacy/default-branch verification.
  - Skipped tests: Flutter and Android Native runtime checks are blocked by missing local Dart/Flutter and Kotlin toolchains; real-device account, notification, purchase, data export/deletion, and native screenshot verification remains blocked.
  - Adversarial review: implementation uses original `LumenLane` naming and synthetic data, keeps high-risk monetization/messaging/shopping/cross-account features gated, and records blocked native parity rather than claiming full launch readiness.
  - Residual risk: variant code is a lightweight baseline, not production device builds; full stack manifests and real toolchain/device validation remain future work.
  - Rollback note: revert downstream commit `00fca5c`, then revert this planning commit.
  - Next command: `$run` for Step 12.4.

- [x] Step 12.4: Implement pilot app 3 — Snapchat clone (all 5 variants)
  - Files: `GeorgeQLe/snapchat-mobile-clone` — all 5 `variants/` directories.
  - Implement: camera-first shell, ephemeral messaging model, stories, friends, chat, memories, location/privacy controls, reporting/blocking, and safety gates.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Implement the Snapchat-inspired lawful clone in `GeorgeQLe/snapchat-mobile-clone` across React Native, Flutter, Expo, iOS Native, and Android Native variants, using original UI/content/data only.

  **Approach:**
  1. Clone or refresh `GeorgeQLe/snapchat-mobile-clone` and verify it remains `PRIVATE`.
  2. Read `docs/source-specs/008-snapchat.md`, `docs/plans/README.md`, and downstream task docs before coding.
  3. Use a non-primary branch-backed downstream lane for implementation and consolidation, because Phase 12 uses `agent-team` profile.
  4. Implement shared synthetic fixtures and API contracts for camera-first shell, ephemeral messages, stories, friends graph, chat, memories, location/privacy controls, reporting/blocking, and safety gates.
  5. Build each variant inside its own `variants/*` directory, preserving stack-local conventions and explicitly recording unavailable local toolchains.
  6. Run local validation only; do not enable, dispatch, or rely on GitHub Actions.
  7. Merge through a consolidation PR, then record validation evidence and blocker status back in this planning repo.

  **Acceptance Criteria:**
  - All five Snapchat variant directories contain implementation code or explicit local toolchain blockers.
  - Camera, ephemeral messaging, story, memory, friend/chat, location/privacy, reporting/blocking, and safety workflows are represented with original assets and synthetic data.
  - Local validation evidence or blocker records exist for every variant.
  - No proprietary Snapchat assets, trademarks as branding, copied media, private APIs, production data, or GitHub Actions are introduced.

  **Review — 2026-05-14:**
  - Implemented the downstream `FlickerFrame` camera-social prototype in `GeorgeQLe/snapchat-mobile-clone`.
  - Used branch-backed lane `phase12-snapchat-variants`, opened PR `https://github.com/GeorgeQLe/snapchat-mobile-clone/pull/1`, and squash-merged to `main` at commit `3e6ea28`.
  - Added shared synthetic fixture and API contract coverage for camera session, ephemeral snaps, view/screenshot state, stories, reporting, privacy-scoped location sharing, blocked parity flags, and privacy-safe analytics rules.
  - Added variant code under React Native, Expo, Flutter, iOS Native, and Android Native directories.
  - Added downstream validation evidence at `tasks/validation/phase12-step12-4.md`.
  - Verified downstream repo remains `PRIVATE` with default branch `main`.
  - Preserved launch blockers for exact native screenshot signaling, signed-in account lifecycle, paid entitlement restore, push payloads, deletion/export completion, exact location parity, and region/device-specific behavior.
  - No GitHub Actions were enabled, dispatched, or used.

  **Validation — 2026-05-14:**
  - `npm run validate` passed in `/tmp/snapchat-mobile-clone`.
  - `npm run test:react-native` passed in `/tmp/snapchat-mobile-clone`.
  - `npm run test:expo` passed in `/tmp/snapchat-mobile-clone`.
  - `swiftc -module-cache-path /tmp/swift-module-cache variants/ios-native/Sources/EphemeralCameraClone/AppModel.swift variants/ios-native/Sources/EphemeralCameraClone/main.swift -o /tmp/flickerframe-ios` passed.
  - `/tmp/flickerframe-ios` passed and printed the model summary.
  - `git diff --cached --check` and `git diff --check` passed before downstream commit/merge.
  - Flutter runtime validation remains blocked because `dart` and `flutter` are not installed locally.
  - Android Native runtime validation remains blocked because `kotlinc` is not installed locally.

  **Ship Manifest:**
  - User goal: execute Phase 12 Step 12.4 and implement the Snapchat-inspired lawful clone across all five downstream variants.
  - Changed files: downstream `GeorgeQLe/snapchat-mobile-clone` received shared fixtures/contracts, variant source files, validation script, validation record, and package scripts; this planning repo changed `tasks/todo.md` and `tasks/history.md`.
  - Per-file purpose: downstream files provide original synthetic app surfaces and reproducible contract checks; planning files record evidence and next work.
  - User-goal mapping: satisfies Step 12.4 without proprietary Snapchat assets, brand claims, private APIs, production data, public visibility changes, or GitHub Actions.
  - Tests run: downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compilation/run, downstream diff checks, PR mergeability check, and remote privacy/default-branch verification.
  - Skipped tests: Flutter and Android Native runtime checks are blocked by missing local Dart/Flutter and Kotlin toolchains; exact native screenshot, account lifecycle, paid entitlement, push payload, deletion/export, and region/device verification remains blocked.
  - Adversarial review: implementation uses original `FlickerFrame` naming and synthetic data, models ephemeral privacy with audit retention rather than impossible privacy guarantees, keeps high-risk native parity flags off, and records blocked native parity rather than claiming launch readiness.
  - Residual risk: variant code is a lightweight baseline, not production device builds; full native manifests, device camera behavior, and real account/push/payment flows remain future work.
  - Rollback note: revert downstream commit `3e6ea28`, then revert this planning commit.
  - Next command: `$run` for Step 12.5.

- [x] Step 12.5: Implement batch apps 009-015 — BeReal, Reddit, X, Bluesky, Threads, Pinterest, Lemon8 (all 5 variants each)
  - Files: 7 downstream repos.
  - Shared patterns: feed/timeline, comments, profiles, media posts, saved items, search/discovery, moderation.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Implement the seven remaining pilot social apps in Phase 12 batch 009-015 across React Native, Flutter, Expo, iOS Native, and Android Native variants, using original UI/content/data only.

  **Approach:**
  1. Process repos serially: `GeorgeQLe/bereal-mobile-clone`, `GeorgeQLe/reddit-mobile-clone`, `GeorgeQLe/x-mobile-clone`, `GeorgeQLe/bluesky-mobile-clone`, `GeorgeQLe/threads-mobile-clone`, `GeorgeQLe/pinterest-mobile-clone`, and `GeorgeQLe/lemon8-mobile-clone`.
  2. For each repo, verify `PRIVATE` visibility, clone or refresh, read `docs/source-specs/*`, `docs/plans/README.md`, and downstream task docs.
  3. Use one non-primary branch-backed downstream lane per repo or a clearly scoped serial branch per repo; merge each through a consolidation PR before recording completion.
  4. Implement shared synthetic fixtures and API contracts for feed/timeline, comments/replies, profiles, media posts, saved items, search/discovery, reporting/blocking, moderation, privacy controls, and app-specific safety gates.
  5. Build each variant inside its own `variants/*` directory, preserving stack-local conventions and explicitly recording unavailable local toolchains.
  6. Run local validation only; do not enable, dispatch, or rely on GitHub Actions.
  7. Record downstream commit/PR URLs, validation evidence, privacy verification, blocker status, and legal/asset review back in this planning repo.

  **Acceptance Criteria:**
  - All seven downstream repos contain implementation code or explicit local toolchain blockers for all five variants.
  - Core social feed, profile, media, save/search/discovery, moderation, reporting/blocking, privacy, and safety workflows are represented with original assets and synthetic data.
  - Local validation evidence or blocker records exist for every repo and every variant.
  - No proprietary assets, trademarks as branding, copied media, private APIs, production data, public visibility changes, or GitHub Actions are introduced.

  **Review — 2026-05-14:**
  - Implemented seven downstream lawful social prototypes:
    - `GeorgeQLe/bereal-mobile-clone` as `MomentPair`, PR `https://github.com/GeorgeQLe/bereal-mobile-clone/pull/1`, merged to `main` at commit `7c29106`.
    - `GeorgeQLe/reddit-mobile-clone` as `ForumNest`, PR `https://github.com/GeorgeQLe/reddit-mobile-clone/pull/1`, merged to `main` at commit `32fca8e`.
    - `GeorgeQLe/x-mobile-clone` as `SignalPost`, PR `https://github.com/GeorgeQLe/x-mobile-clone/pull/1`, merged to `main` at commit `200c396`.
    - `GeorgeQLe/bluesky-mobile-clone` as `SkyThread`, PR `https://github.com/GeorgeQLe/bluesky-mobile-clone/pull/1`, merged to `main` at commit `8285b5b`.
    - `GeorgeQLe/threads-mobile-clone` as `LoopLine`, PR `https://github.com/GeorgeQLe/threads-mobile-clone/pull/1`, merged to `main` at commit `f785884`.
    - `GeorgeQLe/pinterest-mobile-clone` as `PinwheelBoards`, PR `https://github.com/GeorgeQLe/pinterest-mobile-clone/pull/1`, merged to `main` at commit `f2bdbd1`.
    - `GeorgeQLe/lemon8-mobile-clone` as `CitrusJournal`, PR `https://github.com/GeorgeQLe/lemon8-mobile-clone/pull/1`, merged to `main` at commit `54a9847`.
  - Added `scripts/implement-phase12-step12-5.mjs` in this planning repo so the batch scaffold is reproducible and auditable.
  - Added downstream shared synthetic fixtures, API contracts, React Native/Expo JS models and tests, Flutter model stubs, iOS Swift models, Android Kotlin model stubs, package scripts, and validation records for each repo.
  - Covered feed/timeline, comments/replies, profiles, media/content posts, saved/search/discovery, reporting/blocking, moderation, privacy controls, and app-specific safety gates.
  - Verified every touched downstream repo remains `PRIVATE` with default branch `main`.
  - No GitHub Actions were enabled, dispatched, or used.

  **Validation — 2026-05-14:**
  - For all seven downstream repos, `npm run validate` passed.
  - For all seven downstream repos, `npm run test:react-native` passed.
  - For all seven downstream repos, `npm run test:expo` passed.
  - Swift compile/run passed for all seven iOS Native models: `DailyMomentClone`, `CommunityForumClone`, `MicroPostClone`, `OpenSocialClone`, `TextSocialClone`, `VisualDiscoveryClone`, and `LifestyleSocialClone`.
  - `git diff --check` passed for all seven downstream repos before commit.
  - Flutter runtime validation remains blocked because `dart` and `flutter` are not installed locally.
  - Android Native runtime validation remains blocked because `kotlinc` is not installed locally.

  **Ship Manifest:**
  - User goal: execute Phase 12 Step 12.5 and implement BeReal, Reddit, X, Bluesky, Threads, Pinterest, and Lemon8-inspired lawful clones across all five downstream variants each.
  - Changed files: seven downstream repos received shared fixtures/contracts, validation scripts, React Native/Expo/Flutter/iOS Native/Android Native variant files, package scripts, and validation records; this planning repo changed `scripts/implement-phase12-step12-5.mjs`, `tasks/todo.md`, and `tasks/history.md`.
  - Per-file purpose: downstream files provide original synthetic app surfaces and reproducible local checks; the generator preserves the repeated batch contract; planning docs record evidence and next work.
  - User-goal mapping: satisfies Step 12.5 without proprietary app assets, brand claims, copied media, private APIs, production data, public visibility changes, or GitHub Actions.
  - Tests run: downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compilation/run, downstream `git diff --check`, planning repo `git diff --check`, planning repo `node scripts/verify-phase12-scaffold.mjs`, and remote privacy/default-branch verification.
  - Skipped tests: Flutter and Android Native runtime checks are blocked by missing local Dart/Flutter and Kotlin toolchains; real-device account, notification, entitlement, deletion/export, region, age, and device-specific verification remains blocked.
  - Adversarial review: implementations use original product names and synthetic data, keep sensitive native/toolchain parity flags explicit, reject raw private content analytics, require minor safety and report routes, and do not claim launch-ready one-for-one parity.
  - Residual risk: variant code is a lightweight baseline, not production device builds; future steps still need full manifests, provider integrations, real toolchains, real device verification, and benchmarking evidence.
  - Rollback note: revert downstream commits `7c29106`, `32fca8e`, `200c396`, `8285b5b`, `f785884`, `f2bdbd1`, and `54a9847`, then revert this planning commit.
  - Next command: `$run` for Step 12.6.

- [ ] Step 12.6: Implement dating apps 101-106 — Tinder, Bumble, Hinge, Grindr, Match, Coffee Meets Bagel (all 5 variants each)
  - Files: 6 downstream repos.
  - Category-specific risk review required for dating, location, privacy, harassment prevention, blocking/reporting, age gates, and identity/safety verification.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Implement the six dating apps in Phase 12 batch 101-106 across React Native, Flutter, Expo, iOS Native, and Android Native variants, using original UI/content/data only.

  **Approach:**
  1. Process repos serially: `GeorgeQLe/tinder-mobile-clone`, `GeorgeQLe/bumble-mobile-clone`, `GeorgeQLe/hinge-mobile-clone`, `GeorgeQLe/grindr-mobile-clone`, `GeorgeQLe/match-mobile-clone`, and `GeorgeQLe/coffee-meets-bagel-mobile-clone`.
  2. For each repo, verify `PRIVATE` visibility, clone or refresh, read `docs/source-specs/*`, `docs/plans/README.md`, and downstream task docs.
  3. Use one non-primary branch-backed downstream lane per repo; merge each through a consolidation PR before recording completion.
  4. Implement shared synthetic fixtures and API contracts for onboarding, profile creation, preference filters, match recommendations, likes/passes, mutual matches, chat, safety check-ins, reporting/blocking, privacy controls, age gates, and identity/safety verification placeholders.
  5. Build each variant inside its own `variants/*` directory, preserving stack-local conventions and explicitly recording unavailable local toolchains.
  6. Run local validation only; do not enable, dispatch, or rely on GitHub Actions.
  7. Record downstream commit/PR URLs, validation evidence, privacy verification, dating-specific risk review, blocker status, and legal/asset review back in this planning repo.

  **Acceptance Criteria:**
  - All six downstream repos contain implementation code or explicit local toolchain blockers for all five variants.
  - Dating, location, privacy, harassment prevention, blocking/reporting, age gate, identity/safety verification, and data deletion workflows are represented with original assets and synthetic data.
  - Local validation evidence or blocker records exist for every repo and every variant.
  - No proprietary assets, trademarks as branding, copied media, private APIs, production data, public visibility changes, or GitHub Actions are introduced.

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
