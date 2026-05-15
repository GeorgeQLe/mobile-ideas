# Todo — Mobile Ideas

> Current phase: 13 of 27 — Implementation: Messaging & Email (43 Apps x 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: tests-after, local validation only; GitHub Actions remain disabled unless separately approved

## Priority Task Queue

- [ ] Review `tasks/recurring-todo.md`: "Refresh research roadmap" — trigger condition may be eligible after the 2026-05-14 Phase 12 completion and Phase 13 transition; promote to `tasks/todo.md` only if this requires concrete documentation execution before Phase 13 resumes.

## Phase 13: Implementation — Messaging & Email (43 Apps x 5 Variants)

### Goal

Build all five variants for every app in the Messaging & Email cluster.

### Scope

- Apps: messaging, email, calling, and video conferencing apps.
- Shared patterns: end-to-end encryption semantics, real-time delivery, push notifications, thread/conversation views, attachment handling, offline queuing, spam/abuse reporting, contact safety, enterprise retention/export controls, and account recovery blockers.
- Preserve Phase 11 and Phase 12 carry-forward blockers for Flutter and Android Native toolchain validation; do not treat those blockers as resolved for later rollups.
- Do not enable, dispatch, or rely on GitHub Actions; use local validation only unless the user gives separate explicit approval naming GitHub Actions.

### Acceptance Criteria

- [x] Exact Phase 13 app inventory is reconciled against `tasks/roadmap.md`, `tasks/ideas.md`, `tasks/repo-seeding.md`, and existing specs before downstream implementation starts.
- [ ] All reconciled Phase 13 apps have 5 working variants each or explicit local/toolchain/provider blockers.
- [ ] Every locally available variant passes local validation and has benchmark evidence or an explicit blocker record.
- [ ] Encryption, privacy, retention, safety, moderation, abuse-reporting, attachment, offline, and notification flows are implemented per spec.
- [ ] No proprietary assets, trademarks as branding, copyrighted media, copied code, private APIs, production data, public visibility changes, or GitHub Actions are introduced.
- [ ] Manual verification blockers are documented and not falsely claimed as resolved.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low once inventory is reconciled (each app is an independent GitHub repo)
**Review gates:** local validation, benchmark/blocker artifacts, spec compliance, encryption/privacy review, messaging abuse-safety review, legal/asset review

**Subagent lanes:** none yet. Per-step lanes must be defined at execution time. If write lanes are used, each lane must own a separate non-primary GitHub branch and pass consolidation/PR review before integration.

### App Inventory

Step 13.1 reconciled the roadmap's approximate count into 43 apps / 215 variants. Verification basis: local source specs exist; `tasks/repo-seeding.md` marks every listed downstream repo seeded, private, and source-spec-backed; batch evidence in `tasks/repo-seeding.md` states seeded repos returned `PRIVATE`, non-empty default branches, `README.md`, and copied source specs under `docs/source-specs/`. Live `gh api` recheck was attempted on 2026-05-14 but blocked because `gh` was unavailable in the escalated shell; do not treat that as a repo failure.

| # | ID | App | Category | Downstream repo | Source spec | Readiness | Step 13.2 status |
|---:|---:|---|---|---|---|---|---|
| 1 | 016 | WhatsApp | Messaging | `GeorgeQLe/whatsapp-mobile-clone` | `specs/batch-01/016-whatsapp.md` | Implementation-ready as of 2026-04-16 | Ready |
| 2 | 017 | Telegram | Messaging | `GeorgeQLe/telegram-mobile-clone` | `specs/batch-01/017-telegram.md` | Implementation-ready as of 2026-04-17 | Ready |
| 3 | 018 | Signal | Messaging | `GeorgeQLe/signal-mobile-clone` | `specs/batch-01/018-signal.md` | Implementation-ready as of 2026-04-17 | Ready |
| 4 | 019 | Discord | Community chat | `GeorgeQLe/discord-mobile-clone` | `specs/batch-01/019-discord.md` | Implementation-ready as of 2026-04-17 | Ready |
| 5 | 020 | Slack | Workplace chat | `GeorgeQLe/slack-mobile-clone` | `specs/batch-01/020-slack.md` | Implementation-ready as of 2026-04-17 | Ready |
| 6 | 021 | Messenger | Messaging | `GeorgeQLe/messenger-mobile-clone` | `specs/batch-02/021-messenger.md` | Implementation-ready as of 2026-04-17 | Ready |
| 7 | 022 | FaceTime | Video calling | `GeorgeQLe/facetime-mobile-clone` | `specs/batch-02/022-facetime.md` | Implementation-ready as of 2026-04-17 | Ready |
| 8 | 023 | Zoom | Video conferencing | `GeorgeQLe/zoom-mobile-clone` | `specs/batch-02/023-zoom.md` | Implementation-ready as of 2026-04-17 | Ready |
| 9 | 024 | Gmail | Email | `GeorgeQLe/gmail-mobile-clone` | `specs/batch-02/024-gmail.md` | Implementation-ready as of 2026-04-17 | Ready |
| 10 | 025 | Outlook | Email/calendar | `GeorgeQLe/outlook-mobile-clone` | `specs/batch-02/025-outlook.md` | Implementation-ready as of 2026-04-17 | Ready |
| 11 | 935 | Viber | Messaging and calling | `GeorgeQLe/viber-mobile-clone` | `specs/batch-47/935-viber.md` | Implementation-ready as of 2026-05-05 | Ready |
| 12 | 936 | WeChat | Messaging and calling | `GeorgeQLe/wechat-mobile-clone` | `specs/batch-47/936-wechat.md` | Implementation-ready as of 2026-05-05 | Ready |
| 13 | 937 | LINE | Messaging and calling | `GeorgeQLe/line-mobile-clone` | `specs/batch-47/937-line.md` | Implementation-ready as of 2026-05-05 | Ready |
| 14 | 938 | KakaoTalk | Messaging and calling | `GeorgeQLe/kakaotalk-mobile-clone` | `specs/batch-47/938-kakaotalk.md` | Implementation-ready as of 2026-05-05 | Ready |
| 15 | 939 | Skype | Messaging and calling | `GeorgeQLe/skype-mobile-clone` | `specs/batch-47/939-skype.md` | Implementation-ready as of 2026-05-05 | Ready |
| 16 | 940 | Google Voice | Messaging and calling | `GeorgeQLe/google-voice-mobile-clone` | `specs/batch-47/940-google-voice.md` | Implementation-ready as of 2026-05-05 | Ready |
| 17 | 941 | TextNow | Messaging and calling | `GeorgeQLe/textnow-mobile-clone` | `specs/batch-48/941-textnow.md` | Implementation-ready as of 2026-05-06 | Ready |
| 18 | 942 | TextFree | Messaging and calling | `GeorgeQLe/textfree-mobile-clone` | `specs/batch-48/942-textfree.md` | Implementation-ready as of 2026-05-06 | Ready |
| 19 | 943 | GroupMe | Messaging and calling | `GeorgeQLe/groupme-mobile-clone` | `specs/batch-48/943-groupme.md` | Implementation-ready as of 2026-05-06 | Ready |
| 20 | 944 | Marco Polo | Messaging and calling | `GeorgeQLe/marco-polo-mobile-clone` | `specs/batch-48/944-marco-polo.md` | Implementation-ready as of 2026-05-06 | Ready |
| 21 | 945 | Voxer | Messaging and calling | `GeorgeQLe/voxer-mobile-clone` | `specs/batch-48/945-voxer.md` | Implementation-ready as of 2026-05-06 | Ready |
| 22 | 946 | Microsoft Teams | Messaging and calling | `GeorgeQLe/microsoft-teams-mobile-clone` | `specs/batch-48/946-microsoft-teams.md` | Implementation-ready as of 2026-05-06 | Ready |
| 23 | 947 | Cisco Webex | Messaging and calling | `GeorgeQLe/cisco-webex-mobile-clone` | `specs/batch-48/947-cisco-webex.md` | Implementation-ready as of 2026-05-06 | Ready |
| 24 | 948 | Google Meet | Messaging and calling | `GeorgeQLe/google-meet-mobile-clone` | `specs/batch-48/948-google-meet.md` | Implementation-ready as of 2026-05-06 | Ready |
| 25 | 949 | GoTo | Messaging and calling | `GeorgeQLe/goto-mobile-clone` | `specs/batch-48/949-goto.md` | Implementation-ready as of 2026-05-06 | Ready |
| 26 | 950 | BlueJeans | Messaging and calling | `GeorgeQLe/bluejeans-mobile-clone` | `specs/batch-48/950-bluejeans.md` | Implementation-ready as of 2026-05-06 | Ready |
| 27 | 951 | Jitsi Meet | Messaging and calling | `GeorgeQLe/jitsi-meet-mobile-clone` | `specs/batch-48/951-jitsi-meet.md` | Implementation-ready as of 2026-05-06 | Ready |
| 28 | 952 | Proton Mail | Email and privacy mail | `GeorgeQLe/proton-mail-mobile-clone` | `specs/batch-48/952-proton-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 29 | 953 | Yahoo Mail | Email and privacy mail | `GeorgeQLe/yahoo-mail-mobile-clone` | `specs/batch-48/953-yahoo-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 30 | 954 | AOL Mail | Email and privacy mail | `GeorgeQLe/aol-mail-mobile-clone` | `specs/batch-48/954-aol-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 31 | 955 | Spark Mail | Email and privacy mail | `GeorgeQLe/spark-mail-mobile-clone` | `specs/batch-48/955-spark-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 32 | 956 | Edison Mail | Email and privacy mail | `GeorgeQLe/edison-mail-mobile-clone` | `specs/batch-48/956-edison-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 33 | 957 | BlueMail | Email and privacy mail | `GeorgeQLe/bluemail-mobile-clone` | `specs/batch-48/957-bluemail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 34 | 958 | Canary Mail | Email and privacy mail | `GeorgeQLe/canary-mail-mobile-clone` | `specs/batch-48/958-canary-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 35 | 959 | Fastmail | Email and privacy mail | `GeorgeQLe/fastmail-mobile-clone` | `specs/batch-48/959-fastmail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 36 | 960 | HEY | Email and privacy mail | `GeorgeQLe/hey-mobile-clone` | `specs/batch-48/960-hey.md` | Implementation-ready as of 2026-05-06 | Ready |
| 37 | 961 | Tuta Mail | Email and privacy mail | `GeorgeQLe/tuta-mail-mobile-clone` | `specs/batch-49/961-tuta-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 38 | 962 | Zoho Mail | Email and privacy mail | `GeorgeQLe/zoho-mail-mobile-clone` | `specs/batch-49/962-zoho-mail.md` | Implementation-ready as of 2026-05-06 | Ready |
| 39 | 963 | Spike | Email and privacy mail | `GeorgeQLe/spike-mobile-clone` | `specs/batch-49/963-spike.md` | Implementation-ready as of 2026-05-06 | Ready |
| 40 | 964 | Superhuman | Email and privacy mail | `GeorgeQLe/superhuman-mobile-clone` | `specs/batch-49/964-superhuman.md` | Implementation-ready as of 2026-05-06 | Ready |
| 41 | 965 | Shortwave | Email and privacy mail | `GeorgeQLe/shortwave-mobile-clone` | `specs/batch-49/965-shortwave.md` | Implementation-ready as of 2026-05-06 | Ready |
| 42 | 966 | Clean Email | Email and privacy mail | `GeorgeQLe/clean-email-mobile-clone` | `specs/batch-49/966-clean-email.md` | Implementation-ready as of 2026-05-06 | Ready |
| 43 | 967 | Unroll.Me | Email and privacy mail | `GeorgeQLe/unroll-me-mobile-clone` | `specs/batch-49/967-unroll-me.md` | Implementation-ready as of 2026-05-06 | Ready |

### Implementation

- [x] Step 13.1: Reconcile exact Messaging & Email app inventory and downstream readiness
  - Files: `tasks/todo.md`, `tasks/roadmap.md`, `tasks/repo-seeding.md`, `tasks/history.md`, relevant `specs/batch-*/*.md`, and downstream repo metadata only.
  - Determine the exact Phase 13 app list from existing specs and seeded downstream repos before implementation starts.
  - Resolve the roadmap's approximate `~37 apps` count into a numbered app inventory with repo names, source spec paths, and spec tier/readiness status.
  - Verify each candidate downstream repo remains `PRIVATE`, has a root commit, has `README.md`, has `docs/plans/README.md`, and has the copied source spec under `docs/source-specs/`.
  - Identify any missing downstream repos, missing source specs, stale build plans, non-private visibility, or draft-status constraints as blockers.
  - Do not mutate downstream implementation code in this step.
  - Do not enable, dispatch, or rely on GitHub Actions.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Produce the canonical Phase 13 app inventory and readiness checklist so downstream implementation can proceed without guessing which messaging/email repos are in scope.

  **Approach:**
  1. Read Phase 13 in `tasks/roadmap.md`, the app queue in `tasks/ideas.md`, and seeded downstream status in `tasks/repo-seeding.md`.
  2. Select apps whose roadmap/source-spec scope is messaging, email, calling, video conferencing, contacts, or closely related communication.
  3. For each selected app, record app ID, app name, downstream repo, source spec path, spec tier/readiness, and any privacy/safety/regulatory notes.
  4. Serially verify downstream metadata with `gh api` or the existing seeding manifest evidence: visibility must be `PRIVATE`, default branch/root commit must exist, source spec must be copied, and `docs/plans/README.md` must exist.
  5. Update this phase's App Inventory and Step 13.2+ breakdown based on the reconciled list.
  6. Record blockers and evidence in `tasks/history.md`; update `tasks/roadmap.md` if the exact count differs from the approximate roadmap estimate.

  **Review (2026-05-14):**
  - Reconciled Phase 13 to 43 apps / 215 variants: IDs 016-025 and 935-967.
  - Confirmed every source spec exists and every source spec reports implementation-ready status.
  - Confirmed every downstream repo is checked as seeded/private in `tasks/repo-seeding.md`; batch evidence records non-empty default branch, `README.md`, and copied source spec under `docs/source-specs/`.
  - Attempted live serial `gh api` metadata verification; blocked because `gh` is unavailable in the escalated shell, so readiness is based on prior manifest/batch evidence.
  - Updated the roadmap count from approximate `~37` to exact `43`.

- [x] Step 13.2: Scaffold or repair multi-variant structure across reconciled Phase 13 repos
  - Files: reconciled Phase 13 downstream repos and a reproducible planning-repo verifier script if needed.
  - Build/repair all 43 repos in serial, risk-grouped batches: messaging/calling core (016-023, 935-951), then email/privacy mail (024-025, 952-967).
  - For each repo, verify the five target variant directories or create them from `templates/variant-structure.md`: React Native, Expo, Flutter, iOS Native, and Android Native.
  - Add or repair per-repo local validation scripts only; do not add GitHub Actions.
  - Preserve inherited Flutter and Android Native local toolchain blockers as blocker artifacts when those toolchains are unavailable.
  - Record exact downstream commits and any blocker rows in `tasks/history.md`.
  - Suggested first bounded batch: IDs 016-020 plus 935-939, because they cover messaging/community/calling patterns without starting with the full 43-repo blast radius.

  **Review (2026-05-15):**
  - Added `scripts/verify-phase13-scaffold.mjs` as the reproducible Phase 13 scaffold verifier/repair utility.
  - Initial read-only check verified all 43 reconciled repos were private, non-empty, source-spec-backed, and had `README.md` plus `docs/plans/README.md`; all 43 were missing the `variants/` and `shared/` scaffold directories.
  - Repaired all 43 repos serially through non-primary `phase13-scaffold-<id>` branches and scaffold-only PR merges; no GitHub Actions files were created or used.
  - Final read-only check passed with `checked=43`, `repairedCount=0`, and `failures=0`.
  - Downstream merge commits recorded in `tasks/history.md`; no Flutter/Android runtime blockers were resolved because this was scaffold-only.

- [x] Step 13.3: Implement pilot messaging app 1 across all five variants
  - Files: `GeorgeQLe/whatsapp-mobile-clone` downstream repo and planning docs in this repository (`tasks/todo.md`, `tasks/history.md`; add a reproducible implementation script only if repeated code generation is needed).
  - Pilot selection: WhatsApp is the safest first messaging pilot because it is ID 016, has the canonical messaging source spec at `specs/batch-01/016-whatsapp.md`, and Step 13.2 proved the downstream repo has all five variant directories and shared scaffold.
  - Build an original lawful messaging prototype across React Native, Expo, Flutter, iOS Native, and Android Native variant directories using original product naming, synthetic fixtures, and public-source/inferred behavior only.
  - Required shared model coverage: conversations, participants, message lifecycle, delivery/read receipts, attachments, disappearing-message settings, backup/export/delete blockers, reporting/blocking, contact safety, offline queue state, notification stubs, and encryption-state metadata that avoids claiming real end-to-end encryption.
  - Required variant coverage: shared JSON fixtures/contracts; React Native and Expo testable JS modules plus tests; Flutter model/main stub; Swift model/main stub; Kotlin model stub; downstream validation script and validation record.
  - Validation: run downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run when available, downstream `git diff --check`, planning repo `git diff --check`, and `node scripts/verify-phase13-scaffold.mjs` after merge.
  - Expected blockers: real account lifecycle, phone-number/SMS verification, exact E2EE protocol guarantees, push notification delivery, contact discovery/address-book permissions, media capture, backup provider integration, export/delete completion, real-device behavior, Flutter runtime validation when Dart/Flutter are missing, and Android Native runtime validation when Kotlin tooling is missing.
  - Git/PR flow: perform downstream writes serially on a non-primary branch, open a PR, verify privacy/default branch, merge to downstream `main`, and record the PR URL plus merged commit in `tasks/history.md`. Do not enable, dispatch, or rely on GitHub Actions.

  **Review (2026-05-15):**
  - Implemented the WhatsApp-inspired pilot as original `HarborChat` in `GeorgeQLe/whatsapp-mobile-clone` across all five variant directories.
  - Added `scripts/implement-phase13-step13-3.mjs` as the reproducible downstream implementation generator.
  - Downstream PR `https://github.com/GeorgeQLe/whatsapp-mobile-clone/pull/2` was opened from non-primary branch `phase13-whatsapp-pilot` and squash-merged to `main` at commit `b5f51fb`.
  - Remote verification confirmed downstream visibility remains `private` and default branch remains `main`.
  - Local executable validation passed: downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run, downstream `git diff --check`, planning repo `git diff --check`, and final `node scripts/verify-phase13-scaffold.mjs` (`checked=43`, `repairedCount=0`, `failures=0`).
  - Flutter/Dart and Android Native/Kotlin runtime validation remain explicit local toolchain blockers; no GitHub Actions, proprietary assets, private APIs, production data, copied media, or audited E2EE parity claims were introduced.

- [x] Step 13.4: Implement pilot messaging/email app 2 across all five variants
  - Files: `GeorgeQLe/telegram-mobile-clone` downstream repo and planning docs in this repository (`tasks/todo.md`, `tasks/history.md`; add a reproducible implementation script only if repeated code generation is needed).
  - Pilot selection: Telegram is the next safest Phase 13 messaging pilot because it is ID 017, directly follows the WhatsApp pilot, has the canonical source spec at `specs/batch-01/017-telegram.md`, and Step 13.2/13.3 verification proved the downstream repo remains private and scaffold-complete.
  - Build an original lawful cloud-messaging prototype across React Native, Expo, Flutter, iOS Native, and Android Native variant directories using original product naming, synthetic fixtures, and public-source/inferred behavior only.
  - Required shared model coverage: cloud-synced conversations, one-to-one chats, groups, channels, secret-chat constraints, delivery/read state, attachments, message editing/deletion, saved messages, bots/provider blockers, calls/stories/premium stubs, privacy settings, report/block flows, offline cache state, notification stubs, and encryption-state metadata that distinguishes cloud chat from launch-blocked secret-chat parity.
  - Required variant coverage: shared JSON fixtures/contracts; React Native and Expo testable JS modules plus tests; Flutter model/main stub; Swift model/main stub; Kotlin model stub; downstream validation script and validation record.
  - Validation: run downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run when available, downstream `git diff --check`, planning repo `git diff --check`, and `node scripts/verify-phase13-scaffold.mjs` after merge.
  - Expected blockers: real phone/account lifecycle, SMS verification, exact Telegram protocol/server behavior, secret-chat cryptography guarantees, push notification delivery, contact discovery/address-book permissions, bot platform integrations, calls/stories/premium/provider behavior, export/delete completion, real-device behavior, Flutter runtime validation when Dart/Flutter are missing, and Android Native runtime validation when Kotlin tooling is missing.
  - Git/PR flow: perform downstream writes serially on a non-primary branch, open a PR, verify privacy/default branch, merge to downstream `main`, and record the PR URL plus merged commit in `tasks/history.md`. Do not enable, dispatch, or rely on GitHub Actions.

  **Review (2026-05-15):**
  - Implemented the Telegram-inspired pilot as original `CloudCourier` in `GeorgeQLe/telegram-mobile-clone` across all five variant directories.
  - Added `scripts/implement-phase13-step13-4.mjs` as the reproducible downstream implementation generator.
  - Downstream PR `https://github.com/GeorgeQLe/telegram-mobile-clone/pull/2` was opened from non-primary branch `phase13-telegram-pilot` and squash-merged to `main` at commit `0d058ffd`.
  - Remote verification confirmed downstream visibility remains `private` and default branch remains `main`.
  - Local executable validation passed: downstream `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run, downstream `git diff --check`, and final `node scripts/verify-phase13-scaffold.mjs` (`checked=43`, `repairedCount=0`, `failures=0`).
  - Flutter/Dart and Android Native/Kotlin runtime validation remain explicit local toolchain blockers; no GitHub Actions, proprietary assets, private APIs, production data, copied media, Telegram protocol parity claims, or audited secret-chat cryptography claims were introduced.

- [x] Step 13.5: Implement remaining Phase 13 apps in serial, risk-grouped batches
  - Files: reconciled Phase 13 downstream repos.
  - Implement the next bounded batch of Phase 13 messaging apps across all five variants each.
  - Suggested batch: IDs 018-020 (`GeorgeQLe/signal-mobile-clone`, `GeorgeQLe/discord-mobile-clone`, `GeorgeQLe/slack-mobile-clone`) because they complete the original batch-01 messaging cluster after the WhatsApp and Telegram pilots while keeping the run small enough for serial PR/merge/validation.
  - For each repo, use original product naming and synthetic fixtures only; do not use proprietary branding, trademarks as app branding, copied media, private APIs, production data, or GitHub Actions.
  - Required shared coverage across the batch: conversation/thread models, participant/member models, message lifecycle, delivery/read state, attachments, reporting/blocking/moderation, notification redaction, offline queue/cache state, privacy settings, account/export/delete blockers, and explicit encryption/security metadata that avoids unreviewed parity claims.
  - Signal-specific coverage: private one-to-one/group messaging, safety-number/security-review metadata, disappearing messages, blocked sealed-sender/contact-discovery/provider parity, and explicit audited-E2EE blocker language.
  - Discord-specific coverage: servers/guilds, channels, roles/permissions, voice/stage/community moderation stubs, safety/reporting, bot/integration blockers, and public/community-content moderation boundaries.
  - Slack-specific coverage: workspaces, channels/DMs, enterprise retention/export controls, admin/compliance blockers, integrations/workflow blockers, and workplace privacy/audit boundaries.
  - Required variant coverage per repo: shared JSON fixtures/contracts; React Native and Expo testable JS modules plus tests; Flutter model/main stub; Swift model/main stub; Kotlin model stub; downstream validation script and validation record.
  - Validation per repo: `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run when available, downstream `git diff --check`, and remote privacy/default-branch verification after merge.
  - Planning validation after the batch: planning repo `git diff --check` and `node scripts/verify-phase13-scaffold.mjs`.
  - Expected blockers: real account lifecycle, exact protocol/security guarantees, push notification delivery, contact discovery/address-book permissions, media capture, calls/voice, bot/integration providers, enterprise retention/export completion, data export/delete completion, real-device behavior, Flutter runtime validation when Dart/Flutter are missing, and Android Native runtime validation when Kotlin tooling is missing.
  - Git/PR flow: perform downstream writes serially on one non-primary branch per repo, open a PR, verify clean mergeability/privacy/default branch, squash-merge to downstream `main`, and record PR URLs plus merged commits in `tasks/history.md`. Do not enable, dispatch, or rely on GitHub Actions.

  **Review (2026-05-15):**
  - Implemented the bounded IDs 018-020 batch across all five variant directories in three downstream repos:
    - `GeorgeQLe/signal-mobile-clone` as original `QuietSignal`, PR `https://github.com/GeorgeQLe/signal-mobile-clone/pull/2`, merged to `main` at commit `00929a0c`.
    - `GeorgeQLe/discord-mobile-clone` as original `GuildGarden`, PR `https://github.com/GeorgeQLe/discord-mobile-clone/pull/2`, merged to `main` at commit `5d4e18ec`.
    - `GeorgeQLe/slack-mobile-clone` as original `WorkHarbor`, PR `https://github.com/GeorgeQLe/slack-mobile-clone/pull/2`, merged to `main` at commit `cbd23e90`.
  - Added `scripts/implement-phase13-step13-5.mjs` as the reproducible downstream batch generator.
  - Remote verification confirmed all three touched repos remain `private` with default branch `main`.
  - Local executable validation passed for each touched downstream repo: `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run, downstream `git diff --check`, and staged `git diff --cached --check`.
  - Planning validation passed: `node scripts/verify-phase13-scaffold.mjs` reported `checked=43`, `repairedCount=0`, and `failures=0`.
  - Flutter/Dart and Android Native/Kotlin runtime validation remain explicit local toolchain blockers; no GitHub Actions, proprietary assets, private APIs, production data, copied media, audited E2EE claims, provider parity claims, enterprise parity claims, or public visibility changes were introduced.

- [ ] Step 13.6: Validate all Phase 13 repos without GitHub Actions
  - Run local build, lint, type check, and tests where toolchains are available.
  - Record executable evidence and explicit blockers, including inherited Flutter/Android toolchain limits.
  - Files: add a reproducible planning-repo validator script such as `scripts/validate-phase13-repos.mjs`; generate validation evidence under `tasks/phase-13-validation-report.md` and `tasks/scorecards/phase-13/validation-summary.json`; update `tasks/todo.md` and `tasks/history.md`.
  - Scope: serially validate all 43 reconciled Phase 13 downstream repos from the App Inventory without GitHub Actions.
  - Required preflight per repo: verify GitHub visibility remains `private`, default branch exists, root commit exists, source spec exists under `docs/source-specs/`, `README.md` exists, `docs/plans/README.md` exists, and all five variant directories plus shared fixture/contract directories exist.
  - Required executable checks where scripts are present: `npm run validate`, `npm run test:react-native`, `npm run test:expo`, Swift compile/run for each iOS Native main file when `swift` is available, and downstream `git diff --check`.
  - Expected missing-implementation handling: repos not yet implemented beyond scaffold should be recorded as explicit implementation blockers, not counted as passing variant evidence.
  - Expected toolchain blockers: keep Flutter/Dart and Android Native/Kotlin runtime validation blocked when local `dart`/`flutter` or `kotlinc` are unavailable; do not mark those variants passing without executable evidence.
  - Output requirements: write a Markdown report with per-repo command results, blocker rows, checked commits, and aggregate counts; write a JSON summary with repo count, passed command count, failure count, blocker count, and checked commits.
  - Safety constraints: no GitHub Actions, no downstream source repairs unless validation exposes a small deterministic validator bug that can be fixed in the same repo through a branch-backed PR; stop on privacy/public-visibility failure, auth/rate-limit failure, or unexpected command failure.
  - Final validation after report generation: planning repo `git diff --check` and `node scripts/verify-phase13-scaffold.mjs`.

- [ ] Step 13.7: Run benchmarking harness and record scorecards
  - Record scorecards and blocker artifacts under `tasks/scorecards/phase-13/`.
  - Do not invent scores for blocked variants.

- [ ] Step 13.8: Phase 13 final validation and cleanup
  - Verify acceptance criteria.
  - Audit source/assets for legal hygiene and copied-brand risks.
  - Document manual verification blockers.
  - Mark Phase 13 complete only if validation and benchmark evidence are complete or explicitly approved for carry-forward.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Source specs: exact paths to be reconciled in Step 13.1
- Phase 11 carry-forward blockers: `tasks/phase-11-validation-report.md`, `tasks/scorecards/phase-11/benchmark-blockers.json`
- Phase 12 carry-forward blockers: `tasks/phase-12-validation-report.md`, `tasks/scorecards/phase-12/benchmark-blockers.json`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
