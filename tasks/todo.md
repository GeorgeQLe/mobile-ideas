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

- [x] Step 24.2: Build static variant scaffolds for all Phase 24 News, Maps & Navigation apps
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

  **Results (2026-06-07):**
  - **48/48 PASS, 0 failures.** All repos scaffolded with `variants/static/{index.html, styles.css, app.js, README.md}`.
  - Generator: `/tmp/generate-newsmaps-prototypes.mjs` — serial clone → scaffold → commit → push with 32s delays.
  - First pass: 42/48 pass, 6 transient SSL/network failures. Retry pass: 6/6 pass.
  - 4 category-specific UI templates: News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
  - Verification: 48/48 confirmed via `gh api` (all 4 files present in each repo).
  - Rate limit: pre=4759/5000, post=4933/5000 (rate limit reset between runs).

- [x] Step 24.3: Build React Native variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/react-native/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-rn-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Category-specific React Native patterns:**
  - News/Media (28): FlatList article feed, story detail screen, section tab navigator, bookmarks with AsyncStorage, breaking news banner component.
  - Weather (7): current conditions card, hourly/daily forecast ScrollViews, radar placeholder MapView, severe alert modal, location selector.
  - Maps/Navigation (7): MapView container, search bar with autocomplete, route planning with waypoints, turn-by-turn directions list, offline indicator, saved places.
  - Outdoor/Trail (6): trail discovery FlatList, trail detail with elevation SVG, activity recorder with timer, safety/SOS panel, offline maps indicator.

  **What Needs to Be Built:**
  A Node.js generator script (`/tmp/generate-newsmaps-rn-variants.mjs`) that serially:
  1. Clones each of the 48 repos from `GeorgeQLe/<slug>`.
  2. Creates `variants/react-native/` with: `package.json` (Expo ~52.0.0, React Navigation v7), `tsconfig.json`, `app.json`, `index.js`, `src/screens/` (5 category-specific), `src/components/` (5 shared), `src/navigation/AppNavigator.js`, `src/services/` (3-4 mock), `src/hooks/` (3 custom), `BLOCKERS.md`.
  3. Commits with message `feat: add React Native (Expo) variant scaffold (variants/react-native/)`.
  4. Pushes to `main`.
  5. Waits 32 seconds between repos.

  **Files Created/Modified:**
  - `/tmp/generate-newsmaps-rn-variants.mjs` — generator script (48 repos × 4 category templates)
  - 48 downstream repos: `variants/react-native/` with full scaffold
  - `tasks/todo.md` — check off Step 24.3, add results
  - `tasks/repo-seeding.md` — add RN scaffold verification evidence
  - `tasks/history.md` — append session record

  **Approach:**
  1. Record pre-scaffold rate-limit evidence.
  2. Write `/tmp/generate-newsmaps-rn-variants.mjs` with 4 category template functions matching Phase 23 RN patterns.
  3. Run the generator serially (48 repos × ~35s each ≈ 28 minutes).
  4. Verify all 48 repos have `variants/react-native/` with expected files via `gh api`.
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
  - All 48 repos have `variants/react-native/` directory with expected files.
  - Each scaffold uses category-appropriate RN patterns.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded pre/post.
  - 48/48 verification pass.

  **Ship-one-step handoff:** Implement only Step 24.3, validate it, then run `/ship` when done.

  **Results (2026-06-08):**
  - **48/48 PASS, 0 failures.** All repos scaffolded with `variants/react-native/` (package.json, tsconfig.json, app.json, index.js, src/{screens,components,navigation,services,hooks}/, BLOCKERS.md).
  - Generator: `/tmp/generate-newsmaps-rn-variants.mjs` — serial clone → scaffold → commit → push with 32s delays.
  - First pass: 44/48 pass, 4 transient SSL/network failures (cbs-news, abc-news, techcrunch, ars-technica). Retry pass: 4/4 pass.
  - 4 category-specific RN templates: News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
  - Expo ~52.0.0, React Navigation v7, TypeScript, category-specific screens/components/services/hooks.
  - Verification: 48/48 confirmed via `gh api` (package.json, src/, BLOCKERS.md present in each repo).
  - Rate limit: pre=4933/5000, post=5000/5000 (rate limit reset between runs).

- [x] Step 24.4: Build Flutter variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/flutter/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-flutter-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Category-specific Flutter patterns:**
  - News/Media (28): ListView article feed, article detail page, section tab bar (TabBarView), bookmarks with SharedPreferences, breaking news banner widget.
  - Weather (7): current conditions card, hourly/daily forecast ListView, radar placeholder (google_maps_flutter), alerts dialog, location selector.
  - Maps/Navigation (7): GoogleMap widget, search bar with autocomplete, route planning with waypoints, turn-by-turn directions list, offline indicator, saved places.
  - Outdoor/Trail (6): trail discovery ListView, trail detail with elevation chart (fl_chart), activity recorder with timer, safety/SOS panel, offline maps indicator.

  **What Needs to Be Built:**
  A Node.js generator script (`/tmp/generate-newsmaps-flutter-variants.mjs`) that serially:
  1. Clones each of the 48 repos from `GeorgeQLe/<slug>`.
  2. Creates `variants/flutter/` with: `pubspec.yaml` (Flutter 3.22+, Dart 3.4+, go_router, provider, google_maps_flutter for maps/weather/outdoor), `analysis_options.yaml`, `lib/main.dart`, `lib/screens/` (5 category-specific), `lib/widgets/` (5 shared), `lib/services/` (3-4 mock), `lib/models/` (2-3 data classes), `lib/router.dart` (GoRouter config), `BLOCKERS.md`.
  3. Commits with message `feat: add Flutter variant scaffold (variants/flutter/)`.
  4. Pushes to `main`.
  5. Waits 32 seconds between repos.

  **Files Created/Modified:**
  - `/tmp/generate-newsmaps-flutter-variants.mjs` — generator script (48 repos × 4 category templates)
  - 48 downstream repos: `variants/flutter/` with full scaffold
  - `tasks/todo.md` — check off Step 24.4, add results
  - `tasks/repo-seeding.md` — add Flutter scaffold verification evidence
  - `tasks/history.md` — append session record

  **Approach:**
  1. Record pre-scaffold rate-limit evidence (`gh api rate_limit`).
  2. Write `/tmp/generate-newsmaps-flutter-variants.mjs` with 4 category template functions matching Phase 23 Flutter patterns.
  3. Run the generator serially (48 repos × ~35s each ≈ 28 minutes).
  4. Retry any transient SSL failures (pattern from Steps 24.2 and 24.3).
  5. Verify all 48 repos have `variants/flutter/` with expected files via `gh api`.
  6. Record post-scaffold rate-limit evidence.
  7. Update task docs with results.

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
  - All 48 repos have `variants/flutter/` directory with expected files.
  - Each scaffold uses category-appropriate Flutter patterns.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded pre/post.
  - 48/48 verification pass.

  **Ship-one-step handoff:** Implement only Step 24.4, validate it, then run `/ship` when done.

  **Results (2026-06-08):**
  - **48/48 PASS, 0 failures.** All repos scaffolded in a single pass (no retries needed).
  - Rate limit: pre=4952/5000, post=4952/5000 (rate limit window reset mid-run).
  - Generator: `/tmp/generate-newsmaps-flutter-variants.mjs` — serial clone → scaffold → commit → push with 32s delays.
  - 4 category-specific Flutter templates: News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
  - Each scaffold: `pubspec.yaml` (Flutter 3.22+, Dart 3.4+, go_router, provider, shared_preferences, http, intl + category deps), `analysis_options.yaml`, `lib/main.dart`, `lib/router.dart` (GoRouter config), `lib/screens/` (4-5 screens), `lib/widgets/` (2-3 widgets), `lib/services/` (2-3 mock services), `lib/models/` (1-2 data classes), `BLOCKERS.md`.
  - Category scaffolds:
    - News: FeedScreen (SliverList), StoryDetailScreen, SectionsScreen (TabBarView), BookmarksScreen, SettingsScreen, ArticleCard, BreakingNewsBanner, AppShell, Article model, NewsService, BookmarkService (SharedPreferences).
    - Weather: CurrentConditionsScreen, ForecastScreen (hourly/daily), RadarScreen (placeholder), AlertsScreen, LocationsScreen, ConditionsCard, AppShell, WeatherData model, WeatherService, LocationService.
    - Maps: MapScreen (search bar + FABs), SearchScreen, RouteScreen (mode chips), SavedPlacesScreen, SettingsScreen, AppShell, OfflineIndicator, Place model, MapService, LocationService.
    - Outdoor: DiscoverScreen (SliverList), TrailDetailScreen (elevation/map placeholders), RecordScreen (timer), SafetyScreen (SOS/live tracking), ProfileScreen, TrailCard, AppShell, Trail model, TrailService, ActivityService, LocationService.
  - Verification: 48/48 repos confirmed via `gh api` — each has `pubspec.yaml`, `analysis_options.yaml`, `lib/`, `BLOCKERS.md`.

- [x] Step 24.5: Build Expo variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/expo/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-expo-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Category-specific Expo patterns:**
  - News/Media (28): Expo Router file-based navigation, FlatList article feed, article detail screen, section tabs, bookmarks (AsyncStorage), breaking news banner, push notification placeholder (expo-notifications).
  - Weather (7): current conditions card, hourly/daily forecast FlatList, radar placeholder (expo-maps or react-native-maps), alerts, location selector (expo-location).
  - Maps/Navigation (7): MapView (react-native-maps), search bar, route planning, saved places, offline indicator, expo-location for GPS.
  - Outdoor/Trail (6): trail discovery FlatList, trail detail with elevation chart placeholder, activity recorder with timer, safety/SOS panel, offline maps placeholder, expo-location.

  **What Needs to Be Built:**
  A Node.js generator script (`/tmp/generate-newsmaps-expo-variants.mjs`) that serially:
  1. Clones each of the 48 repos from `GeorgeQLe/<slug>`.
  2. Creates `variants/expo/` with: `package.json` (Expo ~52.0.0, Expo Router ~4.0.0, expo-location, react-native-maps for maps/weather/outdoor), `app.json`, `tsconfig.json`, `app/` (Expo Router file-based screens), `components/`, `services/`, `hooks/`, `constants/`, `BLOCKERS.md`.
  3. Commits with message `feat: add Expo variant scaffold (variants/expo/)`.
  4. Pushes to `main`.
  5. Waits 32 seconds between repos.

  **Difference from React Native (Step 24.3):**
  - Expo Router file-based navigation (app/ directory) instead of React Navigation stack config.
  - Expo SDK modules (expo-location, expo-notifications, expo-file-system) instead of community RN packages.
  - TypeScript by default (.tsx files).
  - Expo-specific app.json config.

  **Files Created/Modified:**
  - `/tmp/generate-newsmaps-expo-variants.mjs` — generator script (48 repos × 4 category templates)
  - 48 downstream repos: `variants/expo/` with full scaffold
  - `tasks/todo.md` — check off Step 24.5, add results
  - `tasks/repo-seeding.md` — add Expo scaffold verification evidence
  - `tasks/history.md` — append session record

  **Approach:**
  1. Record pre-scaffold rate-limit evidence (`gh api rate_limit`).
  2. Write `/tmp/generate-newsmaps-expo-variants.mjs` with 4 category template functions using Expo Router patterns.
  3. Run the generator serially (48 repos × ~35s each ≈ 28 minutes).
  4. Retry any transient SSL failures (pattern from Steps 24.2–24.4).
  5. Verify all 48 repos have `variants/expo/` with expected files via `gh api`.
  6. Record post-scaffold rate-limit evidence.
  7. Update task docs with results.

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
  - All 48 repos have `variants/expo/` directory with expected files.
  - Each scaffold uses category-appropriate Expo Router patterns with TypeScript.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded pre/post.
  - 48/48 verification pass.

  **Ship-one-step handoff:** Implement only Step 24.5, validate it, then run `/ship` when done.

  **Results (2026-06-08):**
  - **48/48 PASS, 0 failures.** All repos scaffolded in a single pass (no retries needed).
  - Rate limit: pre=4896/5000, post=5000/5000 (rate limit window reset mid-run).
  - Generator: `/tmp/generate-newsmaps-expo-variants.mjs` — serial clone → scaffold → commit → push with 32s delays.
  - 4 category-specific Expo Router templates: News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
  - Each scaffold: `package.json` (Expo ~52.0.0, Expo Router ~4.0.0, TypeScript), `app.json` (Expo plugins config), `tsconfig.json`, `app/_layout.tsx` (Stack), `app/(tabs)/_layout.tsx` (Tabs), `app/(tabs)/*.tsx` (tab screens), `components/*.tsx`, `services/*.ts`, `hooks/*.ts`, `constants/theme.ts`, `BLOCKERS.md`.
  - Category scaffolds:
    - News: Feed (FlatList + router.push), article/[id].tsx (dynamic route), Sections (horizontal tab bar), Bookmarks, Settings, ArticleCard, BreakingBanner, LoadingSpinner, articleService, bookmarkService (AsyncStorage), notificationService (expo-notifications), useArticles, useBookmarks.
    - Weather: Current conditions, Forecast (hourly/daily), Radar (MapView placeholder), Alerts, Locations, ConditionCard, HourlyScroller, LoadingSpinner, weatherService, alertService, locationService (AsyncStorage), useWeather, useAlerts.
    - Maps: Map view (placeholder), Search (TextInput + FlatList), Route planning (mode buttons), Saved places, Settings, navigate.tsx (navigation screen), SearchBar, PlaceCard, LoadingSpinner, searchService, routeService, offlineMapService (expo-file-system), useSearch, useLocation (expo-location).
    - Outdoor: Explore (trail FlatList + router.push), trail/[id].tsx (detail with stats), Record (start/stop), Saved, Safety (SOS), Profile, TrailCard, StatDisplay, LoadingSpinner, trailService, activityService (AsyncStorage), locationTrackingService (expo-location watchPositionAsync), useTrails, useTracking.
  - Verification: 48/48 repos confirmed via `gh api` — each has `package.json`, `app.json`, `app/`, `BLOCKERS.md`.

- [x] Step 24.6: Build iOS Native (SwiftUI) variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/ios-native/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-ios-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Category-specific SwiftUI patterns:**
  - News/Media (28): TabView + NavigationStack, article feed List, article detail view, section picker, bookmarks (UserDefaults), breaking news banner, push notification placeholder.
  - Weather (7): current conditions card, hourly/daily forecast List, radar placeholder (MapKit), alerts sheet, location manager (CoreLocation).
  - Maps/Navigation (7): MapKit Map view, search bar, route planning, saved places, offline indicator, CoreLocation for GPS.
  - Outdoor/Trail (6): trail discovery List, trail detail with stats, activity recorder, safety/SOS panel, offline maps placeholder, CoreLocation continuous tracking.

  **What Needs to Be Built:**
  A Node.js generator script (`/tmp/generate-newsmaps-ios-variants.mjs`) that serially:
  1. Clones each of the 48 repos from `GeorgeQLe/<slug>`.
  2. Creates `variants/ios-native/` with: `Package.swift` (SPM, iOS 17+), `Sources/App/<App>App.swift` (@main + TabView), `Sources/Views/` (4-5 SwiftUI views), `Sources/Services/` (3 async throws classes), `Sources/Models/` (2-3 Codable structs), `Sources/ViewModels/` (2 @Observable classes), `Sources/Components/.gitkeep`, `BLOCKERS.md`.
  3. Commits with message `feat: add iOS Native (SwiftUI) variant scaffold (variants/ios-native/)`.
  4. Pushes to `main`.
  5. Waits 32 seconds between repos.

  **Key difference from Phase 23 Productivity iOS scaffolds:** Category-specific view/service/model/viewModel patterns for News, Weather, Maps, Outdoor instead of Productivity patterns.

  **Reference script:** `/tmp/generate-productivity-ios-variants.mjs` (Phase 23 — same structure, different category templates).

  **Files Created/Modified:**
  - `/tmp/generate-newsmaps-ios-variants.mjs` — generator script (48 repos × 4 category templates)
  - 48 downstream repos: `variants/ios-native/` with full scaffold
  - `tasks/todo.md` — check off Step 24.6, add results
  - `tasks/repo-seeding.md` — add iOS scaffold verification evidence
  - `tasks/history.md` — append session record

  **Approach:**
  1. Record pre-scaffold rate-limit evidence (`gh api rate_limit`).
  2. Write `/tmp/generate-newsmaps-ios-variants.mjs` with 4 category template functions matching Phase 23 iOS patterns but adapted for News/Weather/Maps/Outdoor categories.
  3. Run the generator serially (48 repos × ~35s each ≈ 28 minutes).
  4. Retry any transient SSL failures (pattern from Steps 24.2–24.5).
  5. Verify all 48 repos have `variants/ios-native/` with expected files via `gh api`.
  6. Record post-scaffold rate-limit evidence.
  7. Update task docs with results.

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
  - All 48 repos have `variants/ios-native/` directory with expected files.
  - Each scaffold uses category-appropriate SwiftUI patterns.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded pre/post.
  - 48/48 verification pass.

  **Ship-one-step handoff:** Implement only Step 24.6, validate it, then run `/ship` when done.

  **Results (2026-06-08):**
  - **48/48 PASS, 0 failures.** All repos scaffolded in a single pass (no retries needed).
  - Rate limit: pre=4952/5000, post=4945/5000.
  - Generator: `/tmp/generate-newsmaps-ios-variants.mjs` — serial clone → scaffold → commit → push with 32s delays.
  - 4 category-specific SwiftUI templates: News/Media (28), Weather (7), Maps/Navigation (7), Outdoor/Trail (6).
  - Each scaffold: `Package.swift` (SPM, iOS 17+), `Sources/App/<App>App.swift` (@main + TabView), `Sources/Views/` (4-5 category-specific SwiftUI views), `Sources/Services/` (3 async throws classes), `Sources/Models/` (2-3 Codable/Identifiable structs), `Sources/ViewModels/` (2 @Observable classes), `Sources/Components/.gitkeep`, `BLOCKERS.md`.
  - Category scaffolds:
    - News: FeedView (NavigationStack + List), ArticleDetailView (ScrollView + toolbar), SectionsView (horizontal section picker), BookmarksView (ContentUnavailableView), SettingsView, ArticleRow component, Article/Section/Bookmark models, ArticleService/BookmarkService (UserDefaults)/NotificationService, FeedViewModel/ArticleViewModel (@Observable).
    - Weather: CurrentConditionsView (LazyVGrid detail cards), ForecastView (hourly ScrollView + 7-day List), RadarView (MapKit Map + layer buttons), AlertsView, LocationsView (searchable), WeatherDetailCard component, WeatherData/Forecast/WeatherAlert models, WeatherService/LocationService/AlertService, WeatherViewModel/ForecastViewModel (@Observable).
    - Maps: MapView (MapKit Map + search bar + FABs), SearchView (categories + recent), RouteView (origin/dest + mode picker + route list), SavedPlacesView, SettingsView, Place/Route/MapRegion models, MapService/SearchService/RouteService, MapViewModel/SearchViewModel (@Observable).
    - Outdoor: ExploreView (NavigationStack + List + TrailRow), TrailDetailView (Map + elevation profile + reviews), RecordView (Map + stats + start/stop), SafetyView (SOS + live tracking + checklist), ProfileView (stats + settings), StatView component, Trail/Activity/TrackPoint models, TrailService/ActivityService/LocationTrackingService, TrailViewModel/ActivityViewModel (@Observable).
  - Verification: 48/48 repos confirmed via `gh api` — each has `Package.swift`, `Sources/{App,Views,Services,Models,ViewModels,Components}/`, `BLOCKERS.md`.

- [ ] Step 24.7: Build Android Native (Kotlin/Jetpack Compose) variant scaffolds for all Phase 24 News, Maps & Navigation apps
  - Build `variants/android-native/` scaffold for all 48 downstream repos.
  - Generator script at `/tmp/generate-newsmaps-android-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.

  **Category-specific Jetpack Compose patterns:**
  - News/Media (28): Scaffold + BottomNavigation, LazyColumn article feed, article detail screen, section tabs (TabRow), bookmarks (DataStore), breaking news banner composable.
  - Weather (7): current conditions card, hourly/daily forecast LazyRow/LazyColumn, radar placeholder (Google Maps Compose), alerts dialog, location manager.
  - Maps/Navigation (7): Google Maps Compose MapView, search bar, route planning, saved places, offline indicator, FusedLocationProvider for GPS.
  - Outdoor/Trail (6): trail discovery LazyColumn, trail detail with stats, activity recorder, safety/SOS panel, offline maps placeholder, location tracking.

  **What Needs to Be Built:**
  A Node.js generator script (`/tmp/generate-newsmaps-android-variants.mjs`) that serially:
  1. Clones each of the 48 repos from `GeorgeQLe/<slug>`.
  2. Creates `variants/android-native/` with: `build.gradle.kts` (Kotlin 2.0+, Compose BOM, Navigation Compose, Hilt), `settings.gradle.kts`, `src/main/java/com/example/<app>/` with `MainActivity.kt`, `navigation/NavGraph.kt`, `ui/screens/` (4-5 screens), `ui/components/` (2-3 composables), `data/models/` (2-3 data classes), `data/services/` (3 mock repositories), `ui/viewmodels/` (2 ViewModels), `BLOCKERS.md`.
  3. Commits with message `feat: add Android Native (Kotlin/Compose) variant scaffold (<category>)`.
  4. Pushes to `main`.
  5. Waits 32 seconds between repos.

  **Key difference from Phase 23 Productivity Android scaffolds:** Category-specific screen/service/model/viewModel patterns for News, Weather, Maps, Outdoor instead of Productivity patterns. Reference: `/tmp/generate-productivity-android-variants.mjs` (Phase 23).

  **Files Created/Modified:**
  - `/tmp/generate-newsmaps-android-variants.mjs` — generator script (48 repos × 4 category templates)
  - 48 downstream repos: `variants/android-native/` with full scaffold
  - `tasks/todo.md` — check off Step 24.7, add results
  - `tasks/repo-seeding.md` — add Android scaffold verification evidence
  - `tasks/history.md` — append session record

  **Approach:**
  1. Record pre-scaffold rate-limit evidence (`gh api rate_limit`).
  2. Write `/tmp/generate-newsmaps-android-variants.mjs` with 4 category template functions using Jetpack Compose patterns.
  3. Run the generator serially (48 repos × ~35s each ≈ 28 minutes).
  4. Retry any transient SSL failures (pattern from Steps 24.2–24.6).
  5. Verify all 48 repos have `variants/android-native/` with expected files via `gh api`.
  6. Record post-scaffold rate-limit evidence.
  7. Update task docs with results.

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
  - All 48 repos have `variants/android-native/` directory with expected files.
  - Each scaffold uses category-appropriate Jetpack Compose patterns.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded pre/post.
  - 48/48 verification pass.

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
