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

- [x] Step 15.2: Prepare per-app downstream implementation lane plan
  - Generate the full 54-app inventory table with app names, repo slugs, codenames, and tranche assignments.
  - Assign apps to 18 tranches of 3 apps each.
  - Files: modify `tasks/todo.md`

  **What to Build:**
  The canonical Phase 15 inventory table, risk groups, codename assignments, and 18 tranche lane packets — following the same pattern as Phase 14 Step 14.2. This step produces no downstream code changes; it only extends `tasks/todo.md` with the full plan.

  **Approach:**
  1. Group the 54 apps by content/risk profile: publishing/blogging, read-later/RSS, e-readers/audiobooks, book discovery, serialized fiction, comics/manga, podcasts/audio, and news.
  2. Assign an original codename to each app (two-word compound, no brand references).
  3. Order tranches from lower-risk (synthetic-friendly text/RSS apps) to higher-risk (licensed audio/video, DRM-adjacent, subscription-gated).
  4. Define each tranche's 3-app lane packet with `Repo`, `Branch`, `Owns`, `Must Not Edit`, `Validation`, `Blocker Artifacts`, and `PR Deliverable`.
  5. Add a consolidation gate template for each tranche.

  #### Phase 15 Risk Groups

  | Group | Apps | Implementation Posture |
  |---|---|---|
  | Publishing/blogging platforms | Medium (119), Substack (120), Wattpad (121) | Synthetic articles/posts, editor shell, follow/clap/comment stubs, paywall/monetization blockers, newsletter/email blockers. |
  | Comics/webtoon platforms | Webtoon (122), MANGA Plus (910), Shonen Jump (911), VIZ Manga (912), Marvel Unlimited (913), DC Universe Infinite (914) | Synthetic panels/chapters, vertical-scroll reader, library/favorites, licensed-content/DRM blockers, subscription/coin blockers. |
  | Book discovery/social reading | Goodreads (123), The StoryGraph (900), Bookmate (901) | Synthetic book catalogs, shelves/lists, reviews/ratings, social feed, reading challenges, provider/catalog blockers. |
  | E-reader/digital library | Kindle (124), Libby (125), Apple Books (126), Scribd (127), Kobo Books (897), Google Play Books (898), Nook (899) | Synthetic ebook catalogs, reader shell with progress/highlights/annotations, offline/download blockers, DRM/entitlement blockers, library-card/institution blockers. |
  | Read-later/annotation tools | Readwise (128), Pocket (129), Instapaper (130) | Synthetic article archive, highlights/tags, RSS import, offline reading, sync/provider blockers. |
  | News/RSS readers | Feedly (131), Apple News (132), NYT (133), Flipboard (134) | Synthetic feeds/articles, topic curation, paywall/subscription blockers, push notification blockers, news-provider blockers. |
  | Podcast players and directories | Overcast (293), Castro (294), Podbean (295), Spotify for Podcasters (296), Anchor (297), Podcast Addict (298), Podimo (299), Acast (300), Player FM (301), Castbox (302), RadioPublic (303), NPR One (304), BBC Sounds (305), Libsyn (306), Podchaser (307), Goodpods (312) | Synthetic RSS feeds/episodes, audio player shell with variable speed, queue/playlist, download/offline stubs, creator tools/analytics blockers, live radio blockers, premium/subscription blockers. |
  | Audio storytelling/audiobooks | Pocket FM (308), Storytel (309), Blinkist (902), Headway (903), Serial Reader (904) | Synthetic audiobook/summary catalogs, chapter player, listening progress, subscription/premium blockers, licensed-content blockers. |
  | Audio platforms (radio/music-adjacent) | Audacy (310), iVoox (311) | Synthetic live radio/podcast feeds, station/show player, regional/geo blockers, ad/premium blockers. |
  | Serialized fiction platforms | Inkitt (905), Dreame (906), Tapas (907), Radish (908), Webnovel (909) | Synthetic story catalogs, chapter reader with progress, coin/token economy stubs, subscription/premium blockers, community/comment stubs. |

  #### Phase 15 App Inventory (54 Apps)

  | ID | App | Repo Slug | Codename | Tranche | Risk Notes |
  |---:|-----|-----------|----------|--------:|------------|
  | 129 | Pocket | pocket-mobile-clone | ClipVault | 1 | read-later, synthetic articles, offline blockers |
  | 130 | Instapaper | instapaper-mobile-clone | PageStash | 1 | read-later, synthetic articles, offline blockers |
  | 128 | Readwise | readwise-mobile-clone | HighlightLens | 1 | highlights/annotations, sync blockers |
  | 131 | Feedly | feedly-mobile-clone | FeedPulse | 2 | RSS reader, synthetic feeds, provider blockers |
  | 134 | Flipboard | flipboard-mobile-clone | NewsMosaic | 2 | news curation, synthetic articles, provider blockers |
  | 119 | Medium | medium-mobile-clone | InkThread | 2 | publishing, synthetic posts, paywall blockers |
  | 120 | Substack | substack-mobile-clone | LetterForge | 3 | publishing, newsletter/email blockers |
  | 123 | Goodreads | goodreads-mobile-clone | ShelfCircle | 3 | book discovery, social reading, catalog blockers |
  | 900 | The StoryGraph | the-storygraph-mobile-clone | PlotPulse | 3 | book discovery, reading analytics, catalog blockers |
  | 132 | Apple News | apple-news-mobile-clone | NewsDeck | 4 | news, paywall/subscription, Apple ecosystem blockers |
  | 133 | New York Times | the-new-york-times-mobile-clone | GrayLedger | 4 | news, paywall/subscription, premium content blockers |
  | 121 | Wattpad | wattpad-mobile-clone | DraftHaven | 4 | serialized fiction, community/social, premium blockers |
  | 905 | Inkitt | inkitt-mobile-clone | InkWell | 5 | serialized fiction, reader/writer, token economy |
  | 906 | Dreame | dreame-mobile-clone | DreamScroll | 5 | serialized fiction, coin/token, premium blockers |
  | 907 | Tapas | tapas-mobile-clone | PanelTap | 5 | serialized fiction/comics, coin/token, premium blockers |
  | 908 | Radish | radish-mobile-clone | ChapterBite | 6 | serialized fiction, micro-payment, premium blockers |
  | 909 | Webnovel | webnovel-mobile-clone | StoryForge | 6 | serialized fiction, coin/token, licensed content blockers |
  | 901 | Bookmate | bookmate-mobile-clone | ReadMate | 6 | book discovery/social, subscription, catalog blockers |
  | 293 | Overcast | overcast-mobile-clone | CastWave | 7 | podcast player, RSS, audio playback, variable speed |
  | 294 | Castro | castro-mobile-clone | QueueCast | 7 | podcast player, inbox-triage model, audio playback |
  | 295 | Podbean | podbean-mobile-clone | BeanPod | 7 | podcast player/creator, audio, monetization blockers |
  | 298 | Podcast Addict | podcast-addict-mobile-clone | FeedHopper | 8 | podcast player, RSS, offline/download, Android-primary |
  | 301 | Player FM | player-fm-mobile-clone | TuneScout | 8 | podcast player, discovery, cross-platform sync |
  | 302 | Castbox | castbox-mobile-clone | BoxCast | 8 | podcast player, in-app audio, premium blockers |
  | 303 | RadioPublic | radiopublic-mobile-clone | PublicWave | 9 | podcast directory, listener analytics, community |
  | 307 | Podchaser | podchaser-mobile-clone | ChasePod | 9 | podcast database/social, reviews, creator tools |
  | 312 | Goodpods | goodpods-mobile-clone | PodCircle | 9 | podcast social/discovery, community features |
  | 296 | Spotify for Podcasters | spotify-for-podcasters-mobile-clone | CreatorDeck | 10 | podcast creator tools, analytics, provider blockers |
  | 297 | Anchor | anchor-mobile-clone | AnchorForge | 10 | podcast creator/hosting, recording, provider blockers |
  | 306 | Libsyn | libsyn-mobile-clone | SynCast | 10 | podcast hosting/analytics, creator tools, provider blockers |
  | 299 | Podimo | podimo-mobile-clone | PodPremium | 11 | premium podcast, subscription, regional/geo blockers |
  | 300 | Acast | acast-mobile-clone | CastStream | 11 | podcast/ad platform, monetization blockers |
  | 304 | NPR One | npr-one-mobile-clone | PublicRadio | 11 | public radio, live stream, editorial curation |
  | 305 | BBC Sounds | bbc-sounds-mobile-clone | SoundIsle | 12 | public radio/podcast, live, regional/geo blockers |
  | 310 | Audacy | audacy-mobile-clone | RadioPulse | 12 | live radio/podcast, station streaming, ad/premium blockers |
  | 311 | iVoox | ivoox-mobile-clone | VoxStream | 12 | podcast/radio, regional, ad/premium blockers |
  | 308 | Pocket FM | pocket-fm-mobile-clone | AudioTale | 13 | audio stories, subscription, licensed-content blockers |
  | 309 | Storytel | storytel-mobile-clone | TaleStream | 13 | audiobooks, subscription, licensed-content blockers |
  | 902 | Blinkist | blinkist-mobile-clone | BlinkRead | 13 | book summaries, subscription, licensed-content blockers |
  | 903 | Headway | headway-mobile-clone | SummitRead | 14 | book summaries, subscription, licensed-content blockers |
  | 904 | Serial Reader | serial-reader-mobile-clone | DailyChapter | 14 | classic literature, serialized delivery, public domain |
  | 122 | Webtoon | webtoon-mobile-clone | ToonScroll | 14 | vertical-scroll comics, licensed content, coin economy |
  | 124 | Kindle | kindle-mobile-clone | PageEmber | 15 | e-reader, DRM/entitlement, offline, Amazon ecosystem blockers |
  | 125 | Libby | libby-mobile-clone | LibLend | 15 | library e-reader, institution/card blockers, DRM blockers |
  | 897 | Kobo Books | kobo-books-mobile-clone | KoboShelf | 15 | e-reader, DRM/entitlement, store/ecosystem blockers |
  | 126 | Apple Books | apple-books-mobile-clone | BookOrchard | 16 | e-reader, Apple ecosystem, DRM/entitlement blockers |
  | 127 | Scribd | scribd-mobile-clone | ScrollVault | 16 | multi-format library, subscription, licensed-content blockers |
  | 898 | Google Play Books | google-play-books-mobile-clone | PlayShelf | 16 | e-reader, Google ecosystem, DRM/entitlement blockers |
  | 899 | Nook | nook-mobile-clone | NookNest | 17 | e-reader, B&N ecosystem, DRM/entitlement blockers |
  | 910 | MANGA Plus | manga-plus-mobile-clone | MangaPulse | 17 | manga reader, licensed content, Shueisha ecosystem |
  | 911 | Shonen Jump | shonen-jump-mobile-clone | JumpVault | 17 | manga reader, licensed content, subscription blockers |
  | 912 | VIZ Manga | viz-manga-mobile-clone | VizShelf | 18 | manga reader, licensed content, subscription blockers |
  | 913 | Marvel Unlimited | marvel-unlimited-mobile-clone | HeroVault | 18 | comics reader, licensed content, Marvel/Disney blockers |
  | 914 | DC Universe Infinite | dc-universe-infinite-mobile-clone | CosmicShelf | 18 | comics reader, licensed content, Warner/DC blockers |

  #### Tranche Assignments Summary

  | Tranche | Step | Apps (Lane A / B / C) |
  |--------:|------|-----------------------|
  | 1 | 15.3 | Pocket (ClipVault) / Instapaper (PageStash) / Readwise (HighlightLens) |
  | 2 | 15.4 | Feedly (FeedPulse) / Flipboard (NewsMosaic) / Medium (InkThread) |
  | 3 | 15.5 | Substack (LetterForge) / Goodreads (ShelfCircle) / The StoryGraph (PlotPulse) |
  | 4 | 15.6 | Apple News (NewsDeck) / NYT (GrayLedger) / Wattpad (DraftHaven) |
  | 5 | 15.7 | Inkitt (InkWell) / Dreame (DreamScroll) / Tapas (PanelTap) |
  | 6 | 15.8 | Radish (ChapterBite) / Webnovel (StoryForge) / Bookmate (ReadMate) |
  | 7 | 15.9 | Overcast (CastWave) / Castro (QueueCast) / Podbean (BeanPod) |
  | 8 | 15.10 | Podcast Addict (FeedHopper) / Player FM (TuneScout) / Castbox (BoxCast) |
  | 9 | 15.11 | RadioPublic (PublicWave) / Podchaser (ChasePod) / Goodpods (PodCircle) |
  | 10 | 15.12 | Spotify for Podcasters (CreatorDeck) / Anchor (AnchorForge) / Libsyn (SynCast) |
  | 11 | 15.13 | Podimo (PodPremium) / Acast (CastStream) / NPR One (PublicRadio) |
  | 12 | 15.14 | BBC Sounds (SoundIsle) / Audacy (RadioPulse) / iVoox (VoxStream) |
  | 13 | 15.15 | Pocket FM (AudioTale) / Storytel (TaleStream) / Blinkist (BlinkRead) |
  | 14 | 15.16 | Headway (SummitRead) / Serial Reader (DailyChapter) / Webtoon (ToonScroll) |
  | 15 | 15.17 | Kindle (PageEmber) / Libby (LibLend) / Kobo Books (KoboShelf) |
  | 16 | 15.18 | Apple Books (BookOrchard) / Scribd (ScrollVault) / Google Play Books (PlayShelf) |
  | 17 | 15.19 | Nook (NookNest) / MANGA Plus (MangaPulse) / Shonen Jump (JumpVault) |
  | 18 | 15.20 | VIZ Manga (VizShelf) / Marvel Unlimited (HeroVault) / DC Universe Infinite (CosmicShelf) |

  #### First Implementation Tranche Lane Packet (Step 15.3)

  | Lane | Repo | Branch | Owns | Must Not Edit | Validation | Blocker Artifacts | PR Deliverable |
  |---|---|---|---|---|---|---|---|
  | 15.3-A | `GeorgeQLe/pocket-mobile-clone` | `phase15/pocket-variant-scaffold` | `shared/`, `variants/`, `scripts/`, `tasks/`, `docs/implementation/`, `README.md`, package/config files | `docs/source-specs/129-pocket.md`, `.github/`, repo visibility/settings | `npm run validate`, variant structure check, `git diff --check` | `tasks/blockers/phase15-pocket.md` | Branch pushed, PR opened, commit SHA recorded |
  | 15.3-B | `GeorgeQLe/instapaper-mobile-clone` | `phase15/instapaper-variant-scaffold` | `shared/`, `variants/`, `scripts/`, `tasks/`, `docs/implementation/`, `README.md`, package/config files | `docs/source-specs/130-instapaper.md`, `.github/`, repo visibility/settings | `npm run validate`, variant structure check, `git diff --check` | `tasks/blockers/phase15-instapaper.md` | Branch pushed, PR opened, commit SHA recorded |
  | 15.3-C | `GeorgeQLe/readwise-mobile-clone` | `phase15/readwise-variant-scaffold` | `shared/`, `variants/`, `scripts/`, `tasks/`, `docs/implementation/`, `README.md`, package/config files | `docs/source-specs/128-readwise.md`, `.github/`, repo visibility/settings | `npm run validate`, variant structure check, `git diff --check` | `tasks/blockers/phase15-readwise.md` | Branch pushed, PR opened, commit SHA recorded |

  #### Consolidation Gate Template (All Tranches)

  - Verify each lane PR is branch-backed and targets the downstream repo primary branch only after review.
  - Confirm every lane repo remains `PRIVATE` and contains `README.md`, `docs/plans/README.md`, and the copied source spec under `docs/source-specs/`.
  - Confirm each lane adds no `.github/workflows` files and does not enable, dispatch, or rely on GitHub Actions.
  - Confirm implementation uses original product names and synthetic content only; no proprietary assets, logos, screenshots, copied media, paywalled data, private APIs, or production credentials.
  - Confirm content/reading/audio/subscription/DRM/provider blockers are documented as blockers, not treated as passing parity.
  - Merge only after local validation evidence and blocker artifacts are present; record PR URLs, merge commits, validation output, residual blockers, and rollback notes in this planning repo.

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
