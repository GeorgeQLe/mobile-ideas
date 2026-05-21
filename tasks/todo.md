# Phase 15: Implementation — Podcasts, Books & Reading (54 Apps × 5 Variants)

> Test strategy: none

**Goal**: Build all five variants for every app in the Podcasts, Books & Reading cluster.

**Scope**:
- Apps: Podcast players (Overcast, Pocket Casts, etc.), e-readers (Kindle, Libby, Kobo, etc.), read-later (Pocket, Instapaper), book discovery (Goodreads, StoryGraph), publishing platforms (Medium, Substack, Wattpad), comics/manga (MANGA Plus, Shonen Jump, VIZ Manga), news readers (Feedly, Apple News, NYT, Flipboard), audiobooks (Storytel, Blinkist), serialized fiction (Inkitt, Dreame, Tapas, Radish, Webnovel).
- Shared patterns: RSS/feed parsing, audio playback with variable speed, reading progress sync, annotation/highlighting, offline content, chapter/episode navigation, bookmarking, content libraries, search/discovery.
- 54 apps across IDs 119-134 (publishing/reading/news), 293-312 (podcasts/audio), 897-914 (ebooks/comics/manga).

**Acceptance Criteria:**
- [ ] Exact Phase 15 inventory reconciled: 54 apps across IDs 119-134, 293-312, and 897-914.
- [ ] All 54 apps have 5 working variants each (270 app builds) or explicit local/toolchain/provider/licensed-media blockers.
- [ ] Every variant passes validation and has benchmark scores recorded.
- [ ] Reading/listening progress sync and offline content functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share audio player, content parser, and progress sync patterns.

### Execution Profile
**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low (independent downstream repos)
**Review gates:** correctness, branding audit, blocker/privacy review, consolidation gate

**Subagent lanes:**
- Lane: tranche-A
  - Agent: general-purpose
  - Role: implementer
  - Mode: write
  - Scope: first app in each 3-app tranche
  - Owns: downstream repo A (varies per step)
  - Must not edit: planning repo, other downstream repos
  - Branch: `phase15/<app-slug>-variant-scaffold` (per downstream repo)
  - Depends on: none
  - Deliverable: branch + commit SHA + PR URL + validation evidence
- Lane: tranche-B
  - Agent: general-purpose
  - Role: implementer
  - Mode: write
  - Scope: second app in each 3-app tranche
  - Owns: downstream repo B (varies per step)
  - Must not edit: planning repo, other downstream repos
  - Branch: `phase15/<app-slug>-variant-scaffold` (per downstream repo)
  - Depends on: none
  - Deliverable: branch + commit SHA + PR URL + validation evidence
- Lane: tranche-C
  - Agent: general-purpose
  - Role: implementer
  - Mode: write
  - Scope: third app in each 3-app tranche
  - Owns: downstream repo C (varies per step)
  - Must not edit: planning repo, other downstream repos
  - Branch: `phase15/<app-slug>-variant-scaffold` (per downstream repo)
  - Depends on: none
  - Deliverable: branch + commit SHA + PR URL + validation evidence

### Implementation

- [x] Step 15.1: Reconcile exact Podcasts, Books & Reading app inventory and downstream readiness
  - Verified 54 downstream repos exist, are PRIVATE, have build plans, no GitHub Actions.
  - IDs: 119-134 (16/16 PASS), 293-312 (20/20 PASS), 897-914 (18/18 PASS).
  - Evidence recorded in `tasks/repo-seeding.md` § Phase 15 Reconciliation.
  - Rate limit: 4964→4854 (110 API calls used).
  - Files: modified `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`

- [ ] Step 15.2: Prepare per-app downstream implementation lane plan
  - Generate the full 54-app inventory table with app names, repo slugs, codenames, and tranche assignments.
  - Assign apps to 18 tranches of 3 apps each.
  - Files: modify `tasks/todo.md`

- [ ] Step 15.3: Execute first Phase 15 implementation tranche
  - Build variant scaffolds for 3 apps via agent-team parallel lanes (A/B/C).
  - Each lane: clone repo, create branch, add shared fixtures/contracts, validation scripts, blocker artifacts, and 5 variant files (React Native, Expo, Flutter, iOS Native, Android Native).
  - Run validation, open PR, consolidation gate.
  - Files: 3 downstream repos (shared/, variants/, scripts/, package.json, etc.), `tasks/todo.md`, `tasks/history.md`

- [ ] Step 15.4: Merge Step 15.3 PRs and execute second tranche
- [ ] Step 15.5: Merge Step 15.4 PRs and execute third tranche
- [ ] Step 15.6: Merge Step 15.5 PRs and execute fourth tranche
- [ ] Step 15.7: Merge Step 15.6 PRs and execute fifth tranche
- [ ] Step 15.8: Merge Step 15.7 PRs and execute sixth tranche
- [ ] Step 15.9: Merge Step 15.8 PRs and execute seventh tranche
- [ ] Step 15.10: Merge Step 15.9 PRs and execute eighth tranche
- [ ] Step 15.11: Merge Step 15.10 PRs and execute ninth tranche
- [ ] Step 15.12: Merge Step 15.11 PRs and execute tenth tranche
- [ ] Step 15.13: Merge Step 15.12 PRs and execute eleventh tranche
- [ ] Step 15.14: Merge Step 15.13 PRs and execute twelfth tranche
- [ ] Step 15.15: Merge Step 15.14 PRs and execute thirteenth tranche
- [ ] Step 15.16: Merge Step 15.15 PRs and execute fourteenth tranche
- [ ] Step 15.17: Merge Step 15.16 PRs and execute fifteenth tranche
- [ ] Step 15.18: Merge Step 15.17 PRs and execute sixteenth tranche
- [ ] Step 15.19: Merge Step 15.18 PRs and execute seventeenth tranche
- [ ] Step 15.20: Merge Step 15.19 PRs and execute eighteenth (final) tranche

- [ ] Step 15.21: Merge Step 15.20 PRs and Phase 15 completion review
  - Merge final 3 PRs, verify all 54 apps merged, phase completion review.

### Milestone: Phase 15 — Podcasts, Books & Reading Complete
**Acceptance Criteria:**
- [ ] Exact Phase 15 inventory reconciled: 54 apps across IDs 119-134, 293-312, and 897-914.
- [ ] All 54 apps have 5 working variants each (270 app builds) or explicit local/toolchain/provider/licensed-media blockers.
- [ ] Every variant passes validation and has benchmark scores recorded.
- [ ] Reading/listening progress sync and offline content functional.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 14 archive: `tasks/phases/phase-14.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
