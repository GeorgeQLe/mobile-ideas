# Todo — Mobile Ideas

> Current phase: 14 of 27 — Implementation: Video & Music Streaming (57 Apps x 5 Variants)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: tests-after, local validation only; GitHub Actions remain disabled unless separately approved

## Priority Task Queue

- [x] Step 14.1: Reconcile exact Video & Music Streaming app inventory and downstream readiness
  - Files: `tasks/todo.md`, `tasks/roadmap.md`, `tasks/repo-seeding.md`, `tasks/history.md`, relevant `specs/batch-*/*.md`, and downstream repo metadata only.
  - Determine the exact Phase 14 app list from existing specs and seeded downstream repos before implementation starts.
  - Resolve the roadmap approximate `~53 apps` count into a numbered app inventory with repo names, source spec paths, spec tier/readiness status, and streaming/licensed-media risk notes.
  - Verify each candidate downstream repo remains `PRIVATE`, has a root commit, has `README.md`, has `docs/plans/README.md`, and has the copied source spec under `docs/source-specs/`.
  - Identify missing downstream repos, missing source specs, stale build plans, non-private visibility, licensed-media/DRM/provider blockers, real-device playback blockers, and Draft-status constraints as blockers.
  - Do not mutate downstream implementation code in this step.
  - Do not enable, dispatch, or rely on GitHub Actions.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  Produce the canonical Phase 14 app inventory and readiness checklist so downstream implementation can proceed without guessing which video, music, and streaming/audio repos are in scope.

  **Approach:**
  1. Read Phase 14 in `tasks/roadmap.md`, the app queue in `tasks/ideas.md`, seeded downstream status in `tasks/repo-seeding.md`, and relevant source specs.
  2. Select apps whose roadmap/source-spec scope is video streaming, music streaming, live streaming, audio platforms, media playback, creator video, or closely related licensed-content consumption.
  3. For each selected app, record app ID, app name, category, downstream repo, source spec path, implementation-readiness status, and launch blockers for licensed media, DRM-adjacent flows, playback/provider integration, downloads/offline, recommendations, ads/subscriptions, minors/supervision, and real-device media behavior.
  4. Serially verify downstream metadata with `gh api` or existing seeding manifest evidence: visibility must be `PRIVATE`, default branch/root commit must exist, source spec must be copied, and `docs/plans/README.md` must exist.
  5. Update this phase App Inventory and Step 14.2+ breakdown based on the reconciled list.
  6. Record blockers and evidence in `tasks/history.md`; update `tasks/roadmap.md` if the exact count differs from the approximate roadmap estimate.

## Phase 14: Implementation — Video & Music Streaming (57 Apps x 5 Variants)

### Goal

Build all five variants for every app in the Video & Music Streaming cluster.

### Scope

- Apps: video streaming, music streaming, live streaming, creator video, audio platforms, and adjacent media-consumption apps.
- Shared patterns: adaptive playback shells, playback controls, queues, playlists, libraries, search/discovery, recommendations, offline/download blockers, account/subscription/ads gates, content moderation, licensed-media/DRM-adjacent blockers, and parental/supervised-account safety.
- Preserve Phase 11, Phase 12, and Phase 13 carry-forward blockers for Flutter and Android Native toolchain validation; do not treat those blockers as resolved for later rollups.
- Do not enable, dispatch, or rely on GitHub Actions; use local validation only unless the user gives separate explicit approval naming GitHub Actions.

### Acceptance Criteria

- [x] Exact Phase 14 app inventory is reconciled against `tasks/roadmap.md`, `tasks/ideas.md`, `tasks/repo-seeding.md`, and existing specs before downstream implementation starts.
- [ ] All reconciled Phase 14 apps have 5 working variants each or explicit local/toolchain/provider/licensed-media blockers.
- [ ] Every locally available variant passes local validation and has benchmark evidence or an explicit blocker record.
- [ ] Playback, queue management, recommendation/discovery, offline/download, account/subscription, moderation, privacy, and licensed-media safety flows are implemented per spec.
- [ ] No proprietary assets, trademarks as branding, copyrighted media, copied code, private APIs, production data, public visibility changes, or GitHub Actions are introduced.
- [ ] Manual/provider/licensed-media/real-device verification blockers are documented and not falsely claimed as resolved.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low once inventory is reconciled (each app is an independent GitHub repo)
**Review gates:** local validation, benchmark/blocker artifacts, spec compliance, licensed-media/DRM-adjacent review, media safety/moderation review, legal/asset review

**Subagent lanes:** none yet. Per-step lanes must be defined at execution time. If write lanes are used, each lane must own a separate non-primary GitHub branch and pass consolidation/PR review before integration.

### Implementation

- [x] Step 14.1: Reconcile exact Video & Music Streaming app inventory and downstream readiness
  - Files: `tasks/todo.md`, `tasks/roadmap.md`, `tasks/repo-seeding.md`, `tasks/history.md`, relevant `specs/batch-*/*.md`, and downstream repo metadata only.
  - Use the Priority Task Queue implementation plan above.

#### Step 14.1 Review — 2026-05-15

- Inventory result: 57 apps, not the approximate 53-app roadmap estimate.
- Inventory source: `tasks/ideas.md` rows 066-074, 270-292, and 313-337; `tasks/repo-seeding.md` checked rows; matching source specs under `specs/batch-04`, `specs/batch-14`, `specs/batch-15`, `specs/batch-16`, and `specs/batch-17`.
- Downstream verification: read-only GitHub GraphQL metadata checks on 2026-05-15 confirmed all 57 downstream repos are `PRIVATE`, have default branch `main` with a root commit, contain `README.md`, contain `docs/plans/README.md`, and contain the matching copied source spec under `docs/source-specs/`.
- Blockers carried forward for every app: source specs remain Draft 1; exact-source verification, marketplace listing IDs/privacy labels, account/subscription paths, provider selection, licensed media/catalog rights, background playback/download behavior, and real-device media behavior remain unresolved before implementation-ready parity claims.
- Tooling constraint: no GitHub Actions were enabled, dispatched, or used.

#### Phase 14 App Inventory

| ID | App | Category | Downstream Repo | Source Spec | Blocker Class |
|---:|---|---|---|---|---|
| 066 | Spotify | Music/audio | `GeorgeQLe/spotify-mobile-clone` | `specs/batch-04/066-spotify.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 067 | Apple Music | Music/audio | `GeorgeQLe/apple-music-mobile-clone` | `specs/batch-04/067-apple-music.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 068 | YouTube Music | Music/audio | `GeorgeQLe/youtube-music-mobile-clone` | `specs/batch-04/068-youtube-music.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 069 | SoundCloud | Music/audio | `GeorgeQLe/soundcloud-mobile-clone` | `specs/batch-04/069-soundcloud.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 070 | Audible | Audiobooks | `GeorgeQLe/audible-mobile-clone` | `specs/batch-04/070-audible.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 071 | Pocket Casts | Podcasts | `GeorgeQLe/pocket-casts-mobile-clone` | `specs/batch-04/071-pocket-casts.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 072 | Netflix | Streaming video | `GeorgeQLe/netflix-mobile-clone` | `specs/batch-04/072-netflix.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 073 | YouTube | Video platform | `GeorgeQLe/youtube-mobile-clone` | `specs/batch-04/073-youtube.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 074 | Twitch | Live streaming | `GeorgeQLe/twitch-mobile-clone` | `specs/batch-04/074-twitch.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 270 | Shazam | Music and audio | `GeorgeQLe/shazam-mobile-clone` | `specs/batch-14/270-shazam.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 271 | Bandcamp | Music and audio | `GeorgeQLe/bandcamp-mobile-clone` | `specs/batch-14/271-bandcamp.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 272 | Deezer | Music and audio | `GeorgeQLe/deezer-mobile-clone` | `specs/batch-14/272-deezer.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 273 | TIDAL | Music and audio | `GeorgeQLe/tidal-mobile-clone` | `specs/batch-14/273-tidal.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 274 | Pandora | Music and audio | `GeorgeQLe/pandora-mobile-clone` | `specs/batch-14/274-pandora.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 275 | iHeartRadio | Music and audio | `GeorgeQLe/iheartradio-mobile-clone` | `specs/batch-14/275-iheartradio.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 276 | SiriusXM | Music and audio | `GeorgeQLe/siriusxm-mobile-clone` | `specs/batch-14/276-siriusxm.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 277 | TuneIn Radio | Music and audio | `GeorgeQLe/tunein-radio-mobile-clone` | `specs/batch-14/277-tunein-radio.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 278 | Amazon Music | Music and audio | `GeorgeQLe/amazon-music-mobile-clone` | `specs/batch-14/278-amazon-music.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 279 | Qobuz | Music and audio | `GeorgeQLe/qobuz-mobile-clone` | `specs/batch-14/279-qobuz.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 280 | Anghami | Music and audio | `GeorgeQLe/anghami-mobile-clone` | `specs/batch-14/280-anghami.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 281 | Musixmatch | Music and audio | `GeorgeQLe/musixmatch-mobile-clone` | `specs/batch-15/281-musixmatch.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 282 | GarageBand | Music and audio | `GeorgeQLe/garageband-mobile-clone` | `specs/batch-15/282-garageband.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 283 | BandLab | Music and audio | `GeorgeQLe/bandlab-mobile-clone` | `specs/batch-15/283-bandlab.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 284 | Voloco | Music and audio | `GeorgeQLe/voloco-mobile-clone` | `specs/batch-15/284-voloco.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 285 | Smule | Music and audio | `GeorgeQLe/smule-mobile-clone` | `specs/batch-15/285-smule.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 286 | StarMaker | Music and audio | `GeorgeQLe/starmaker-mobile-clone` | `specs/batch-15/286-starmaker.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 287 | SoundHound | Music and audio | `GeorgeQLe/soundhound-mobile-clone` | `specs/batch-15/287-soundhound.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 288 | Sonos | Music and audio | `GeorgeQLe/sonos-mobile-clone` | `specs/batch-15/288-sonos.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 289 | Bose Music | Music and audio | `GeorgeQLe/bose-music-mobile-clone` | `specs/batch-15/289-bose-music.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 290 | JBL Portable | Music and audio | `GeorgeQLe/jbl-portable-mobile-clone` | `specs/batch-15/290-jbl-portable.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 291 | Endel | Music and audio | `GeorgeQLe/endel-mobile-clone` | `specs/batch-15/291-endel.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 292 | Brain.fm | Music and audio | `GeorgeQLe/brain-fm-mobile-clone` | `specs/batch-15/292-brain-fm.md` | licensed audio/provider, offline/download, subscription/ads, background playback, media library/device integration |
| 313 | Hulu | Streaming video | `GeorgeQLe/hulu-mobile-clone` | `specs/batch-16/313-hulu.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 314 | Disney+ | Streaming video | `GeorgeQLe/disney-plus-mobile-clone` | `specs/batch-16/314-disney-plus.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 315 | Max | Streaming video | `GeorgeQLe/max-mobile-clone` | `specs/batch-16/315-max.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 316 | Peacock TV | Streaming video | `GeorgeQLe/peacock-tv-mobile-clone` | `specs/batch-16/316-peacock-tv.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 317 | Paramount+ | Streaming video | `GeorgeQLe/paramount-plus-mobile-clone` | `specs/batch-16/317-paramount-plus.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 318 | Prime Video | Streaming video | `GeorgeQLe/prime-video-mobile-clone` | `specs/batch-16/318-prime-video.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 319 | Crunchyroll | Streaming video | `GeorgeQLe/crunchyroll-mobile-clone` | `specs/batch-16/319-crunchyroll.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 320 | Plex | Streaming video | `GeorgeQLe/plex-mobile-clone` | `specs/batch-16/320-plex.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 321 | Tubi | Streaming video | `GeorgeQLe/tubi-mobile-clone` | `specs/batch-17/321-tubi.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 322 | Pluto TV | Streaming video | `GeorgeQLe/pluto-tv-mobile-clone` | `specs/batch-17/322-pluto-tv.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 323 | Roku | Streaming video | `GeorgeQLe/roku-mobile-clone` | `specs/batch-17/323-roku.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 324 | Fandango at Home | Streaming video | `GeorgeQLe/fandango-at-home-mobile-clone` | `specs/batch-17/324-fandango-at-home.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 325 | Vudu | Streaming video | `GeorgeQLe/vudu-mobile-clone` | `specs/batch-17/325-vudu.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 326 | MUBI | Streaming video | `GeorgeQLe/mubi-mobile-clone` | `specs/batch-17/326-mubi.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 327 | The Criterion Channel | Streaming video | `GeorgeQLe/the-criterion-channel-mobile-clone` | `specs/batch-17/327-the-criterion-channel.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 328 | Kanopy | Streaming video | `GeorgeQLe/kanopy-mobile-clone` | `specs/batch-17/328-kanopy.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 329 | Hoopla | Streaming video | `GeorgeQLe/hoopla-mobile-clone` | `specs/batch-17/329-hoopla.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 330 | Nebula | Streaming video | `GeorgeQLe/nebula-mobile-clone` | `specs/batch-17/330-nebula.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 331 | Curiosity Stream | Streaming video | `GeorgeQLe/curiosity-stream-mobile-clone` | `specs/batch-17/331-curiosity-stream.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 332 | Gaia | Streaming video | `GeorgeQLe/gaia-mobile-clone` | `specs/batch-17/332-gaia.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 333 | Dropout | Streaming video | `GeorgeQLe/dropout-mobile-clone` | `specs/batch-17/333-dropout.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 334 | BritBox | Streaming video | `GeorgeQLe/britbox-mobile-clone` | `specs/batch-17/334-britbox.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 335 | Acorn TV | Streaming video | `GeorgeQLe/acorn-tv-mobile-clone` | `specs/batch-17/335-acorn-tv.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 336 | YouTube TV | Streaming video | `GeorgeQLe/youtube-tv-mobile-clone` | `specs/batch-17/336-youtube-tv.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |
| 337 | Sling TV | Streaming video | `GeorgeQLe/sling-tv-mobile-clone` | `specs/batch-17/337-sling-tv.md` | licensed video/DRM-adjacent, CDN/provider, offline/download, ads/subscription, moderation/parental, real-device playback |

- [ ] Step 14.2: Prepare per-app downstream implementation lane plan
  - Files: `tasks/todo.md`, `tasks/history.md`, and downstream repo metadata only unless an implementation repo is selected for a separate lane.
  - Convert the 57-app inventory into serial or branch-backed implementation lanes that respect the `agent-team` profile.
  - Assign one repo per write lane, with non-primary branch names, owned paths, must-not-edit boundaries, validation commands, blocker artifact locations, and PR/consolidation gates.
  - Preserve Draft 1 and provider/licensed-media blockers; do not claim implementation-ready parity until exact-source verification and risk review are complete.
  - Do not mutate downstream implementation code in this step.
  - Do not enable, dispatch, or rely on GitHub Actions.

  **Implementation Plan (self-contained for clear-context execution):**

  **What to Build:**
  A branch-backed Phase 14 lane packet that can safely start downstream implementation without writing directly to primary branches or mixing repo ownership.

  **Approach:**
  1. Group the 57 apps by risk profile: music/audio, podcast/audiobook carry-ins, live/video platforms, subscription video, ad-supported/free streaming, library-card/public-access streaming, and device/server-adjacent media.
  2. For the first execution tranche, choose a small set of lower-risk repos whose specs and downstream scaffolds are already verified and whose blockers can be represented as explicit no-op/provider stubs.
  3. Define each lane with `Repo`, `Branch`, `Owns`, `Must not edit`, validation commands, blocker artifact paths, and expected PR deliverables.
  4. Add a consolidation/PR review gate before any final validation or shipping.
  5. Keep GitHub Actions disabled; use local validation and benchmark/blocker artifacts only.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 11 carry-forward blockers: `tasks/phase-11-validation-report.md`, `tasks/scorecards/phase-11/benchmark-blockers.json`
- Phase 12 carry-forward blockers: `tasks/phase-12-validation-report.md`, `tasks/scorecards/phase-12/benchmark-blockers.json`
- Phase 13 carry-forward blockers: `tasks/phase-13-validation-report.md`, `tasks/scorecards/phase-13/benchmark-blockers.json`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
