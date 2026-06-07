# Phase 24: Implementation — News, Maps & Navigation (48 Apps × 6 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all six variant scaffolds for every app in the News, Maps & Navigation cluster.

**Scope**:
- Apps (48): News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
- Shared patterns: feed/article rendering, map rendering, turn-by-turn navigation, weather data display, offline maps, location services, RSS/content aggregation.
- Excludes: Reddit (Phase 12), Apple News/NYT/Flipboard (Phase 15), Bloomberg/Yahoo Finance/Stocktwits (Phase 19), Google Maps/Apple Maps/Waze/Transit/Citymapper/Moovit (Phase 20), Strava/Komoot (Phase 21), Substack (Phase 15).

**Acceptance Criteria:**
- [ ] Exact Phase 24 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 24 apps have 6 working variants each or explicit blockers.
- [ ] Every variant passes validation and has evidence recorded.
- [ ] Feed, map, weather, and navigation features functional across variants or explicitly blocked.
- [ ] Category-specific risk review for news content, map/location, weather data, and outdoor safety documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share feed rendering, map/tile rendering, location services, and weather data patterns. Extra care for news content licensing, map tile providers, location privacy, weather API providers, and outdoor safety features.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, news/map/weather/outdoor regulatory blocker review

### Implementation

- [x] Step 24.1: Reconcile exact News, Maps & Navigation app inventory and downstream readiness (48 apps)
  - Reconcile all 48 apps across IDs from batches 07, 10, 30, 31, 43, 44, 45, 50.
  - Serial GitHub API verification: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  - Record pre/post rate-limit evidence.
  - Classify risk groups: news-media, weather, maps-navigation, outdoor-trail.
  - Document carry-forward blockers: news content APIs/licensing, map tile providers (Google Maps SDK, Mapbox, OpenStreetMap), weather data APIs, location services/GPS, offline map storage, turn-by-turn navigation engines, outdoor safety features (live tracking, SOS), push notifications, content paywalls/subscriptions.

  **Candidate App Inventory (48 apps):**

  | ID | App | Repo Slug | Source Spec | Category |
  |---:|---|---|---|---|
  | 135 | SmartNews | `smartnews-mobile-clone` | `specs/batch-07/135-smartnews.md` | News |
  | 136 | Ground News | `ground-news-mobile-clone` | `specs/batch-07/136-ground-news.md` | News |
  | 200 | AllTrails | `alltrails-mobile-clone` | `specs/batch-10/200-alltrails.md` | Outdoor |
  | 597 | Gaia GPS | `gaia-gps-mobile-clone` | `specs/batch-30/597-gaia-gps.md` | Outdoor |
  | 598 | onX Hunt | `onx-hunt-mobile-clone` | `specs/batch-30/598-onx-hunt.md` | Outdoor |
  | 599 | Trailforks | `trailforks-mobile-clone` | `specs/batch-30/599-trailforks.md` | Outdoor |
  | 600 | Wikiloc | `wikiloc-mobile-clone` | `specs/batch-30/600-wikiloc.md` | Outdoor |
  | 601 | PeakVisor | `peakvisor-mobile-clone` | `specs/batch-31/601-peakvisor.md` | Outdoor |
  | 602 | Windy | `windy-mobile-clone` | `specs/batch-31/602-windy.md` | Weather |
  | 603 | The Weather Channel | `the-weather-channel-mobile-clone` | `specs/batch-31/603-the-weather-channel.md` | Weather |
  | 604 | AccuWeather | `accuweather-mobile-clone` | `specs/batch-31/604-accuweather.md` | Weather |
  | 605 | WeatherBug | `weatherbug-mobile-clone` | `specs/batch-31/605-weatherbug.md` | Weather |
  | 606 | CARROT Weather | `carrot-weather-mobile-clone` | `specs/batch-31/606-carrot-weather.md` | Weather |
  | 607 | MyRadar | `myradar-mobile-clone` | `specs/batch-31/607-myradar.md` | Weather |
  | 608 | NOAA Weather Radar | `noaa-weather-radar-mobile-clone` | `specs/batch-31/608-noaa-weather-radar.md` | Weather |
  | 853 | Hacker News | `hacker-news-mobile-clone` | `specs/batch-43/853-hacker-news.md` | News |
  | 872 | CNN | `cnn-mobile-clone` | `specs/batch-44/872-cnn.md` | News |
  | 873 | BBC News | `bbc-news-mobile-clone` | `specs/batch-44/873-bbc-news.md` | News |
  | 874 | The Guardian | `the-guardian-mobile-clone` | `specs/batch-44/874-the-guardian.md` | News |
  | 875 | Reuters | `reuters-mobile-clone` | `specs/batch-44/875-reuters.md` | News |
  | 876 | AP News | `ap-news-mobile-clone` | `specs/batch-44/876-ap-news.md` | News |
  | 877 | NPR | `npr-mobile-clone` | `specs/batch-44/877-npr.md` | News |
  | 878 | The Wall Street Journal | `the-wall-street-journal-mobile-clone` | `specs/batch-44/878-the-wall-street-journal.md` | News |
  | 879 | Financial Times | `financial-times-mobile-clone` | `specs/batch-44/879-financial-times.md` | News |
  | 880 | The Washington Post | `the-washington-post-mobile-clone` | `specs/batch-44/880-the-washington-post.md` | News |
  | 881 | USA Today | `usa-today-mobile-clone` | `specs/batch-45/881-usa-today.md` | News |
  | 882 | Fox News | `fox-news-mobile-clone` | `specs/batch-45/882-fox-news.md` | News |
  | 883 | NBC News | `nbc-news-mobile-clone` | `specs/batch-45/883-nbc-news.md` | News |
  | 884 | CBS News | `cbs-news-mobile-clone` | `specs/batch-45/884-cbs-news.md` | News |
  | 885 | ABC News | `abc-news-mobile-clone` | `specs/batch-45/885-abc-news.md` | News |
  | 886 | Al Jazeera | `al-jazeera-mobile-clone` | `specs/batch-45/886-al-jazeera.md` | News |
  | 887 | The Economist | `the-economist-mobile-clone` | `specs/batch-45/887-the-economist.md` | News |
  | 888 | Politico | `politico-mobile-clone` | `specs/batch-45/888-politico.md` | News |
  | 889 | Axios | `axios-mobile-clone` | `specs/batch-45/889-axios.md` | News |
  | 890 | Semafor | `semafor-mobile-clone` | `specs/batch-45/890-semafor.md` | News |
  | 891 | Vox | `vox-mobile-clone` | `specs/batch-45/891-vox.md` | News |
  | 892 | The Verge | `the-verge-mobile-clone` | `specs/batch-45/892-the-verge.md` | News |
  | 893 | Engadget | `engadget-mobile-clone` | `specs/batch-45/893-engadget.md` | News |
  | 894 | TechCrunch | `techcrunch-mobile-clone` | `specs/batch-45/894-techcrunch.md` | News |
  | 895 | Ars Technica | `ars-technica-mobile-clone` | `specs/batch-45/895-ars-technica.md` | News |
  | 896 | Wired | `wired-mobile-clone` | `specs/batch-45/896-wired.md` | News |
  | 994 | Yandex Maps | `yandex-maps-mobile-clone` | `specs/batch-50/994-yandex-maps.md` | Maps |
  | 995 | 2GIS | `2gis-mobile-clone` | `specs/batch-50/995-2gis.md` | Maps |
  | 996 | HERE WeGo | `here-wego-mobile-clone` | `specs/batch-50/996-here-wego.md` | Maps |
  | 997 | MAPS.ME | `maps-me-mobile-clone` | `specs/batch-50/997-maps-me.md` | Maps |
  | 998 | OsmAnd | `osmand-mobile-clone` | `specs/batch-50/998-osmand.md` | Maps |
  | 999 | Sygic | `sygic-mobile-clone` | `specs/batch-50/999-sygic.md` | Maps |
  | 1000 | TomTom GO | `tomtom-go-mobile-clone` | `specs/batch-50/1000-tomtom-go.md` | Maps |

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. For each of the 48 repos, serially verify via `gh api`: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  3. `gh api rate_limit` — record post-scan evidence.
  4. Update `tasks/todo.md` with reconciled inventory, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - Inventory of all Phase 24 apps with IDs, names, repo slugs, spec paths, and downstream repo status.
  - All repos verified PRIVATE with required artifacts.
  - Risk groups and blocker posture documented.
  - Rate-limit evidence recorded.

  **Ship-one-step handoff:** Implement only Step 24.1, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`.

  **Results (2026-06-07):**
  - **48/48 PASS, 0 failures.** All repos verified PRIVATE, default branch `main`, README present, source spec under `docs/source-specs/`, root commit present, no `.github/workflows`.
  - Rate limit: pre=5000/5000, post=4759/5000 (241 API calls consumed).
  - Category breakdown verified: News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
  - **Carry-forward blockers by category:**
    - News/Media: content APIs/licensing, paywall/subscription gates, push notifications, breaking news real-time feeds.
    - Weather: weather data APIs (OpenWeatherMap, WeatherAPI, NWS), radar/satellite imagery providers, severe weather alert systems, location services.
    - Maps/Navigation: map tile providers (Mapbox, OpenStreetMap, HERE), turn-by-turn navigation engines, offline map storage/download, GPS/location services, POI databases.
    - Outdoor/Trail: trail databases, elevation/terrain data, live tracking/SOS features, offline map caching, GPS accuracy requirements.

- [ ] Step 24.2: Build static variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/static/` scaffold for all 48 downstream repos.
  - Each scaffold: `index.html`, `styles.css`, `app.js`, `README.md` with category-specific UI patterns.
  - Generator script at `/tmp/generate-newsmaps-prototypes.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Category-specific UI patterns:**
  - News/Media (28): article feed, story detail, section tabs, bookmarks, breaking news banner, paywall gate.
  - Weather (7): current conditions, hourly/daily forecast, radar map, severe alerts, location management.
  - Maps/Navigation (7): map view, search/POI, route planning, turn-by-turn, offline maps, saved places.
  - Outdoor/Trail (6): trail discovery, trail detail/map, activity recording, offline maps, safety/SOS, community reviews.

  **What Needs to Be Built:**
  A Node.js generator script (`/tmp/generate-newsmaps-prototypes.mjs`) that serially:
  1. Clones each of the 48 repos from `GeorgeQLe/<slug>`.
  2. Creates `variants/static/` with 4 files: `index.html`, `styles.css`, `app.js`, `README.md`.
  3. Each file uses category-specific UI patterns (news feed vs weather display vs map vs trail).
  4. Commits with message `feat: add static HTML/CSS/JS prototype (variants/static/)`.
  5. Pushes to `main`.
  6. Waits 32 seconds between repos.

  **Files Created/Modified:**
  - `/tmp/generate-newsmaps-prototypes.mjs` — generator script (48 repos × 4 category templates)
  - 48 downstream repos: `variants/static/{index.html, styles.css, app.js, README.md}`
  - `tasks/todo.md` — check off Step 24.2, add results
  - `tasks/repo-seeding.md` — add static scaffold verification evidence
  - `tasks/history.md` — append session record

  **Approach:**
  1. Record pre-scaffold rate-limit evidence.
  2. Write `/tmp/generate-newsmaps-prototypes.mjs` with 4 category template functions:
     - `newsTemplate(appName)` — article feed with cards, section nav, bookmark button, breaking banner
     - `weatherTemplate(appName)` — current conditions widget, forecast grid, radar placeholder, alerts section
     - `mapsTemplate(appName)` — map container, search bar, route panel, POI markers, offline indicator
     - `outdoorTemplate(appName)` — trail list, trail detail with elevation, activity recorder, safety panel
  3. Run the generator serially (48 repos × ~35s each ≈ 28 minutes).
  4. Verify all 48 repos have `variants/static/` with 4 files via `gh api`.
  5. Record post-scaffold rate-limit evidence.
  6. Update task docs with results.

  **Repo inventory (from Step 24.1):**
  - News/Media (28): IDs 135-136, 853, 872-880, 881-896
  - Weather (7): IDs 602-608
  - Maps/Navigation (7): IDs 994-1000
  - Outdoor/Trail (6): IDs 200, 597-601

  **Execution Profile:**
  - Parallel mode: serial
  - Integration owner: main agent
  - Conflict risk: low

  **Acceptance Criteria:**
  - All 48 repos have `variants/static/` directory with `index.html`, `styles.css`, `app.js`, `README.md`.
  - Each scaffold uses category-appropriate UI patterns.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded pre/post.
  - 48/48 verification pass.

  **Ship-one-step handoff:** Implement only Step 24.2, validate it, then run `/ship` when done.

- [ ] Step 24.3: Build React Native variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/react-native/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-rn-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Ship-one-step handoff:** Implement only Step 24.3, validate it, then run `/ship` when done.

- [ ] Step 24.4: Build Flutter variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/flutter/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-flutter-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Ship-one-step handoff:** Implement only Step 24.4, validate it, then run `/ship` when done.

- [ ] Step 24.5: Build Expo variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/expo/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-expo-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Ship-one-step handoff:** Implement only Step 24.5, validate it, then run `/ship` when done.

- [ ] Step 24.6: Build iOS Native (SwiftUI) variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/ios-native/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-ios-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Ship-one-step handoff:** Implement only Step 24.6, validate it, then run `/ship` when done.

- [ ] Step 24.7: Build Android Native (Kotlin/Jetpack Compose) variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/android-native/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-android-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Ship-one-step handoff:** Implement only Step 24.7, validate it, then run `/ship` when done.

### Milestone: Phase 24 — News, Maps & Navigation Complete
**Acceptance Criteria:**
- [ ] Exact Phase 24 inventory reconciled.
- [ ] All apps have 6 variants addressed or explicit blockers.
- [ ] Every variant passes validation with evidence recorded.
- [ ] Feed, map, weather, and navigation flows functional or explicitly blocked.
- [ ] Category-specific risk review documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 23 pattern (same approach): `tasks/phases/phase-23.md`
