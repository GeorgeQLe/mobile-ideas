# Todo — Mobile Ideas

> Current phase: 9 of 27 — Detailed Build Plans (All 1000 Apps)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 9: Detailed Build Plans (All 1000 Apps)

### Goal

Generate app-specific build plans in every downstream repo's `docs/plans/README.md`, following the Todoist pilot pattern (Phase 4). Each plan covers route map, API schema, data model, seed data, feature flags, and blocked acceptance tests — tailored to the app's spec.

### Scope

- All 1000 downstream repos get a completed `docs/plans/README.md` with app-specific content derived from `docs/source-specs/`.
- Plans define five variant targets per app: React Native, Flutter, Expo, Native iOS (Swift/SwiftUI), Native Android (Kotlin/Jetpack Compose).
- Each plan includes variant-specific architectural notes (e.g., navigation library choices, state management, platform API access patterns).
- Category batches processed in parallel — each category's apps are independent repos.

### Acceptance Criteria

- [ ] All 1000 downstream repos have a completed `docs/plans/README.md` with route map, API schema, data model, seed data, and test checklist.
- [ ] Each plan defines variant-specific build notes for all five targets.
- [ ] Plans reference exact source spec sections and preserve manual verification blockers.
- [ ] No proprietary assets, trademarks, or copyrighted content introduced.

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low (all changes to this repo are sequential; downstream repos are independent)
**Review gates:** structural (route map completeness, API schema coverage, variant sections present, blocker preservation), legal scope

### Implementation

- [x] Step 9.1: Design multi-variant build plan template
  - Files: create `templates/build-plan-template.md`
  - Extend the Todoist pilot pattern (`tasks/todoist-downstream-build-plan.md`) with five variant-specific architecture sections.
  - Template sections: Scope, Product Boundaries, Route Map, API Schema Plan, Data Model Plan, Seed Data Plan, Feature Flags and Blocked Acceptance Tests, Variant Architecture Notes (React Native, Flutter, Expo, Native iOS Swift/SwiftUI, Native Android Kotlin/Jetpack Compose), Test Checklist.
  - Each variant section covers: navigation library, state management, networking layer, local storage, platform API access patterns, recommended project structure.
  - Template uses placeholders (`{{APP_NAME}}`, `{{APP_ID}}`, `{{CATEGORY}}`, `{{SOURCE_SPEC_PATH}}`, etc.) for script-driven generation.

- [x] Step 9.2: Create build plan generation script
  - Files: create `scripts/generate-build-plans.mjs`
  - Script reads the source spec from each downstream repo's `docs/source-specs/NNN-slug.md`.
  - Extracts: app name, category, screens/routes from spec, API contracts, data model entities, manual verification blockers, edge cases.
  - Generates an app-specific `docs/plans/README.md` using the template from Step 9.1.
  - Route map rows derived from spec's Screens section; API families from spec's Data Contracts/API section; data model from spec's Data Model section.
  - Supports `--from <id> --to <id>`, `--dry-run`, `--execute`, and `--delay-ms` flags (same pattern as `scripts/seed-downstream-batch.mjs`).
  - Serial execution with configurable delay between repos. Stops on first failure.
  - Clones each downstream repo to a temp directory, writes the plan, commits, and pushes.

  ### Step 9.2 Implementation Plan

  **What to build:** A Node.js script `scripts/generate-build-plans.mjs` that reads the build plan template from `templates/build-plan-template.md`, clones each downstream repo, reads its `docs/source-specs/NNN-slug.md`, extracts structured data from the spec's Markdown sections, fills the template placeholders, writes the result to `docs/plans/README.md`, commits, and pushes.

  **Files:**
  - Create: `scripts/generate-build-plans.mjs`

  **Technical approach:**
  1. Follow the CLI pattern from `scripts/seed-downstream-batch.mjs`: `--from`, `--to`, `--dry-run`, `--execute`, `--delay-ms`, `--limit`, serial execution, stop on first failure.
  2. Read `tasks/repo-seeding.md` manifest to map app IDs to downstream repo URLs (same parsing as seed script).
  3. Read `templates/build-plan-template.md` once at startup.
  4. For each app in range:
     a. Clone downstream repo to temp dir (shallow clone).
     b. Read `docs/source-specs/NNN-slug.md` from the clone.
     c. Extract spec sections via Markdown heading parsing:
        - H1 → `{{APP_NAME}}`
        - Category from spec's Overview or Category line → `{{CATEGORY}}`
        - Screens section → parse into `{{ROUTE_MAP_ROWS}}` table rows
        - Data Contracts / API section → parse into `{{API_SCHEMA_ROWS}}` table rows
        - Data Model section → parse into `{{DATA_MODEL_ROWS}}` table rows
        - Legal Scope / Product Boundaries → `{{PRODUCT_BOUNDARIES}}`
        - Edge Cases / Blockers → `{{FEATURE_FLAGS_ROWS}}`
        - Test Plan → `{{TEST_CHECKLIST}}`
        - Entities → `{{SEED_DATA_PLAN}}`
     d. Generate variant architecture notes per category using category-aware defaults (e.g., messaging apps get different state/navigation recommendations than shopping apps). Store defaults in a `VARIANT_DEFAULTS` object keyed by category.
     e. Replace all `{{PLACEHOLDER}}` tokens in the template.
     f. Write to `docs/plans/README.md` in the clone.
     g. If `--execute`: git add, commit ("docs(plans): generate build plan from source spec"), push.
     h. If `--dry-run`: print what would be written and skip git operations.
  5. Log progress and stop on any clone, parse, or push failure.

  **Key decisions:**
  - Spec section extraction is heading-based regex, not a full Markdown parser — specs follow a consistent H2 structure.
  - Variant defaults are a static lookup table in the script, keyed by category. Categories without specific overrides get a generic default set.
  - The script does NOT call the Claude API — all content is deterministic extraction + template fill.
  - Shallow clone (`--depth 1`) to minimize bandwidth across 1000 repos.

  **Reference files to read:**
  - `scripts/seed-downstream-batch.mjs` — CLI pattern, manifest parsing, serial execution, error handling
  - `templates/build-plan-template.md` — template to fill (created in Step 9.1)
  - `tasks/repo-seeding.md` — manifest with app ID → downstream repo URL mapping
  - Any one spec (e.g., `specs/batch-01/001-chatgpt.md`) — to understand the heading structure for extraction

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: none (planning repo, no runtime code)

  **Acceptance criteria:**
  - Script runs with `--dry-run --from 1 --to 1` and prints a valid build plan to stdout.
  - Script correctly parses manifest to find downstream repo URLs.
  - All 43 template placeholders are replaced (no `{{...}}` tokens remain in output).
  - Category-aware variant defaults produce different navigation/state recommendations for at least 3 distinct categories.
  - Error handling: stops on clone failure, missing spec, parse failure, or push failure.

  **Ship-one-step handoff contract:** Implement only Step 9.2. Validate it. Mark Step 9.2 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.3's plan. Ensure `.claude/settings.local.json` has `showClearContextOnPlanAccept: true` and `defaultMode: acceptEdits`. Enter plan mode, write brief pass-through plan, exit plan mode, and stop.

- [x] Step 9.3: Pilot on 3 diverse apps
  - Files: modify `tasks/todo.md` (mark pilot complete)
  - Run `scripts/generate-build-plans.mjs` on 3 apps from different categories: one AI app (e.g., ID 001), one shopping app (e.g., ID 046), one health app (e.g., ID 086).
  - Validate each generated plan has: complete route map matching spec screens, API schema families matching spec data contracts, data model matching spec entities, all five variant architecture sections, correct source spec references, preserved manual blockers.
  - Fix any template or script issues before proceeding to bulk generation.

  ### Step 9.3 Implementation Plan

  **What to build:** Run the build plan generation script in execute mode against 3 pilot apps from different categories, validate the pushed plans, and fix any issues.

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.3 done)

  **Technical approach:**
  1. Run `node scripts/generate-build-plans.mjs --execute --from 1 --to 1` (ChatGPT — AI assistant category).
  2. Run `node scripts/generate-build-plans.mjs --execute --from 46 --to 46` (Amazon — shopping category).
  3. Run `node scripts/generate-build-plans.mjs --execute --from 86 --to 86` (MyFitnessPal — health category).
  4. For each pushed plan, verify via `gh api` that `docs/plans/README.md` exists in the downstream repo and contains no `{{...}}` placeholders.
  5. Spot-check: route map rows match spec Screen Inventory count, API families match spec API section, data model rows match spec Data Model entities, all 5 variant sections present, manual blockers preserved in feature flags table.
  6. If any issue found, fix the script and re-run the affected app(s).

  **Acceptance criteria:**
  - All 3 downstream repos have a non-empty `docs/plans/README.md` with 0 unfilled placeholders.
  - Route map completeness matches spec Screen Inventory for each app.
  - Variant architecture sections differ across the 3 categories.
  - Manual verification blockers from each spec appear in the Feature Flags table.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: validation via `gh api` reads of downstream repos

  **Ship-one-step handoff contract:** Implement only Step 9.3. Validate it. Mark Step 9.3 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.4's plan. Enter plan mode for Step 9.4's approval UI, and stop.

- [x] Step 9.4: Generate build plans — AI & Assistants cluster (~27 apps)
  - Files: modify `tasks/todo.md` (mark 9.4 done)
  - Run `scripts/generate-build-plans.mjs --execute` for all AI & Assistants apps (IDs scattered across batches).
  - Since the script filters by ID range and seeded status, run in batch ranges that cover AI apps: `--from 1 --to 25` (batch-01), then targeted runs for later-batch AI apps (IDs 200-225 area, etc.).
  - Verify each pushed plan via `gh api` — file exists, 0 unfilled placeholders.
  - Note: non-AI apps in these ranges will also get build plans; this is fine and expected — it advances progress for later cluster steps.

  ### Step 9.4 Implementation Plan

  **What to build:** Generate and push build plans for all AI & Assistants cluster apps (~26 apps), plus any other apps in the same ID ranges.

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.4 done)
  - Modify: `tasks/history.md` (add 9.4 entry)

  **Technical approach:**
  1. Identify AI/assistant app IDs from the manifest (grep for AI, assistant, chatbot, LLM, GPT categories).
  2. Run `scripts/generate-build-plans.mjs --execute` in batch ranges covering those IDs. Use `--delay-ms 5000` (default) for rate-limit safety.
  3. Skip ID 001 (already pushed in Step 9.3 pilot) — the script will see existing plan and can either skip or overwrite (idempotent).
  4. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo.
  5. Spot-check 3 plans for placeholder completeness and category-appropriate variant architecture.

  **Acceptance criteria:**
  - All AI & Assistants cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses AI-specific defaults (SSE streaming, conversation cache, voice I/O patterns).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.4. Validate it. Mark Step 9.4 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.5's plan. Enter plan mode for Step 9.5, and stop.

- [x] Step 9.5: Generate build plans — Social, Dating & Community cluster (~31 apps)

  ### Step 9.5 Implementation Plan

  **What to build:** Generate and push build plans for all Social, Dating & Community cluster apps (~31 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.5 done)
  - Modify: `tasks/history.md` (add 9.5 entry)

  **Technical approach:**
  1. Identify Social/Dating/Community app IDs from the manifest (grep for social, dating, community categories).
  2. Run `scripts/generate-build-plans.mjs --execute` in batch ranges covering those IDs.
  3. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  4. Spot-check 3 plans for content quality and category-appropriate variant architecture (social defaults: feed/explore/create tabs, infinite scroll pagination, media upload patterns).

  **Acceptance criteria:**
  - All Social, Dating & Community cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses social-specific defaults (feed tabs, infinite scroll, media uploads, push notifications).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.5. Validate it. Mark Step 9.5 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.6's plan. Enter plan mode for Step 9.6, and stop.
- [x] Step 9.6: Generate build plans — Messaging & Email cluster (~37 apps)

  ### Step 9.6 Implementation Plan

  **What to build:** Generate and push build plans for all Messaging & Email cluster apps (~37 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.6 done)
  - Modify: `tasks/history.md` (add 9.6 entry)

  **Technical approach:**
  1. Identify Messaging/Email app IDs from the manifest (grep for messaging, email, chat, communication categories).
  2. Run `scripts/generate-build-plans.mjs --execute` in batch ranges covering those IDs.
  3. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  4. Spot-check 3 plans for content quality and category-appropriate variant architecture (messaging defaults: conversation list, thread view, real-time sync, E2E encryption patterns, typing indicators, read receipts).

  **Acceptance criteria:**
  - All Messaging & Email cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses messaging-specific defaults (WebSocket real-time, local message cache, encryption layer, push notifications).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.6. Validate it. Mark Step 9.6 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.7's plan. Enter plan mode for Step 9.7, and stop.
- [x] Step 9.7: Generate build plans — Video & Music Streaming cluster (~59 apps)

  ### Step 9.7 Implementation Plan

  **What to build:** Generate and push build plans for all Video & Music Streaming cluster apps (~53 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.7 done)
  - Modify: `tasks/history.md` (add 9.7 entry)

  **Technical approach:**
  1. Run `scripts/generate-build-plans.mjs --execute` in batch ranges covering streaming IDs:
     - `--from 66 --to 76` (Spotify, Apple Music, YouTube Music, SoundCloud, Audible, Pocket Casts, Netflix, YouTube, Twitch, Letterboxd, IMDb — 11 apps)
     - `--from 270 --to 289` (Shazam, Bandcamp, Deezer, TIDAL, Pandora, iHeartRadio, SiriusXM, TuneIn Radio, Amazon Music, Qobuz, Anghami, Musixmatch, GarageBand, BandLab, Voloco, Smule, StarMaker, SoundHound, Sonos, Bose Music — 20 apps)
     - `--from 313 --to 340` (Hulu, Disney+, Max, Peacock TV, Paramount+, Prime Video, Crunchyroll, Plex, Tubi, Pluto TV, Roku, Fandango at Home, Vudu, MUBI, The Criterion Channel, Kanopy, Hoopla, Nebula, Curiosity Stream, Gaia, Dropout, BritBox, Acorn TV, YouTube TV, Sling TV, ESPN, The Athletic, Bleacher Report — 28 apps)
  2. Some apps in these ranges may belong to adjacent clusters (sports, podcasts) — the script handles them idempotently, which advances overall progress.
  3. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  4. Spot-check 3 plans for content quality and category-appropriate variant architecture (streaming defaults: media player, download/offline, subscription entitlements, adaptive bitrate, continue-watching, library/playlist management).

  **Acceptance criteria:**
  - All Video & Music Streaming cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses streaming-specific defaults (media playback, offline downloads, subscription management, adaptive streaming).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.7. Validate it. Mark Step 9.7 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.8's plan. Enter plan mode for Step 9.8, and stop.
- [x] Step 9.8: Generate build plans — Podcasts, Books & Reading cluster (~42 apps)

  ### Step 9.8 Implementation Plan

  **What to build:** Generate and push build plans for all Podcasts, Books & Reading cluster apps (~42 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.8 done)
  - Modify: `tasks/history.md` (add 9.8 entry)

  **Technical approach:**
  1. Identify Podcasts/Books/Reading app IDs from the manifest and run `scripts/generate-build-plans.mjs --execute` in batch ranges covering those IDs.
  2. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  3. Spot-check 3 plans for content quality and category-appropriate variant architecture (reading defaults: reader/player view, bookmarks, highlights, annotations, offline downloads, library management, reading progress sync).

  **Acceptance criteria:**
  - All Podcasts, Books & Reading cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses reading/listening-specific defaults (reader view, offline downloads, progress sync, annotation storage).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.8. Validate it. Mark Step 9.8 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.9's plan. Enter plan mode for Step 9.9, and stop.
- [x] Step 9.9: Generate build plans — Photo & Video Creation cluster (~42 apps)

  ### Step 9.9 Implementation Plan

  **What to build:** Generate and push build plans for all Photo & Video Creation cluster apps (~42 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.9 done)
  - Modify: `tasks/history.md` (add 9.9 entry)

  **Technical approach:**
  1. Run `scripts/generate-build-plans.mjs --execute --from 96 --to 99` (batch-05 partial: CapCut, Canva, Lightroom, Google Photos — 4 apps).
  2. Run `scripts/generate-build-plans.mjs --execute --from 223 --to 240` (batch-12: Picsart through Pixelcut — 18 photo editing/retouching apps).
  3. Run `scripts/generate-build-plans.mjs --execute --from 241 --to 260` (batch-13: Lensa through VivaVideo — 20 video editing/creation apps).
  4. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  5. Spot-check 3 plans for content quality and category-appropriate variant architecture (photo/video defaults: canvas/editor, export pipeline, layer management, filter/effects engine, media import, timeline/sequencer, asset library).

  **Acceptance criteria:**
  - All Photo & Video Creation cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses creation-specific defaults (canvas/editor view, export pipeline, media processing, filter engine, timeline).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.9. Validate it. Mark Step 9.9 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.10's plan. Enter plan mode for Step 9.10, and stop.
- [x] Step 9.10: Generate build plans — Shopping, Commerce & Classifieds cluster (~68 apps)

  ### Step 9.10 Implementation Plan

  **What to build:** Generate and push build plans for all Shopping, Commerce & Classifieds cluster apps (~65 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.10 done)
  - Modify: `tasks/history.md` (add 9.10 entry)

  **Technical approach:**
  1. Run `scripts/generate-build-plans.mjs --execute --from 46 --to 55` (batch-03 partial: Amazon, Temu, SHEIN, Etsy, eBay, Facebook Marketplace, Poshmark, Depop, StockX, Shop — 10 apps).
  2. Run `scripts/generate-build-plans.mjs --execute --from 393 --to 406` (batch-20 partial: Walmart, Target, Costco, Sam's Club, Kroger, Albertsons, Aldi, Trader Joe's, Whole Foods, Publix, H-E-B, Meijer, Hy-Vee, Lidl — 14 apps).
  3. Run `scripts/generate-build-plans.mjs --execute --from 442 --to 471` (batch-22/23: Best Buy, Home Depot, Lowe's, IKEA, Wayfair, Kohl's, Macy's, Nordstrom, Sephora, Ulta, Nike, Adidas, Zara, H&M, Uniqlo, Lululemon, GOAT, Grailed, Mercari, Vinted, OfferUp, Craigslist, AliExpress, Wish, Lazada, Shopee, Flipkart, Myntra, Rakuten, Newegg — 30 apps).
  4. Run `scripts/generate-build-plans.mjs --execute --from 968 --to 981` (batch-49 partial: Letgo, VarageSale, Kijiji, Gumtree, CarGurus, Autotrader, Cars.com, Carvana, CarMax, TrueCar, Copart, Bring a Trailer, Autolist, Gumroad — 14 apps).
  5. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  6. Spot-check 3 plans from different subcategories (e.g., general marketplace, fashion retail, classifieds/auto) for commerce-appropriate variant architecture (product catalog, cart/checkout, order tracking, seller tools, payment integration, search/filter, ratings/reviews).

  **Acceptance criteria:**
  - All Shopping, Commerce & Classifieds cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses commerce-specific defaults (product catalog, cart, checkout flow, order tracking, seller tools, payments).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.10. Validate it. Mark Step 9.10 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.11's plan. Enter plan mode for Step 9.11, and stop.
- [x] Step 9.11: Generate build plans — Food, Delivery & Grocery cluster (~66 apps)

  ### Step 9.11 Implementation Plan

  **What to build:** Generate and push build plans for all Food, Delivery & Grocery cluster apps (~66 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.11 done)
  - Modify: `tasks/history.md` (add 9.11 entry)

  **Technical approach:**
  1. Run `scripts/generate-build-plans.mjs --execute --from 38 --to 45` (batch-02/03 partial: DoorDash, Uber Eats, Instacart, Starbucks, McDonald's, OpenTable, Yelp, Too Good To Go — 8 apps).
  2. Run `scripts/generate-build-plans.mjs --execute --from 369 --to 392` (batch-19/20 partial: Chick-fil-A, Dunkin', Chipotle, Taco Bell, Subway, Panera Bread, Wendy's, Burger King, Domino's, Pizza Hut, Papa Johns, Little Caesars, KFC, Popeyes, Sonic Drive-In, Shake Shack, Sweetgreen, Cava, Wingstop, Dairy Queen, Dutch Bros, 7-Eleven, Krispy Kreme, Jamba — 24 apps).
  3. Run `scripts/generate-build-plans.mjs --execute --from 407 --to 440` (batch-21/22 partial: Food Lion, Giant Eagle, Stop and Shop, ShopRite, FreshDirect, Misfits Market, Thrive Market, Ocado, Carrefour, Tesco, Sainsbury's, Grubhub, Gopuff, Deliveroo, Just Eat, Glovo, Bolt Food, Foodpanda, Swiggy, Zomato, Rappi, Grab, Gojek, DidiFood, Meituan, Ele.me, Deliveroo Rider, DoorDash Dasher, Uber Driver, Instacart Shopper, Shipt, Favor, SkipTheDishes, Talabat — 34 apps).
  4. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  5. Spot-check 3 plans from different subcategories (e.g., food delivery platform, QSR/fast food, online grocery, delivery driver app) for food/delivery-appropriate variant architecture (menu/catalog browsing, cart/ordering, real-time order tracking, delivery dispatch, restaurant/store management, pickup/delivery scheduling, loyalty/rewards, driver tools).

  **Acceptance criteria:**
  - All Food, Delivery & Grocery cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses food/delivery-specific defaults (menu browsing, ordering, real-time tracking, delivery/pickup, loyalty programs).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.11. Validate it. Mark Step 9.11 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.12's plan. Enter plan mode for Step 9.12, and stop.
- [ ] Step 9.12: Generate build plans — Finance & Payments cluster (~72 apps)

  ### Step 9.12 Implementation Plan

  **What to build:** Generate and push build plans for all Finance & Payments cluster apps (~72 apps).

  **Files:**
  - Modify: `tasks/todo.md` (mark 9.12 done)
  - Modify: `tasks/history.md` (add 9.12 entry)

  **Technical approach:**
  1. Run `scripts/generate-build-plans.mjs --execute --from 56 --to 65` (batch-03/04 partial: Cash App, Venmo, PayPal, Zelle, Robinhood, Coinbase, Mint/Credit Karma, YNAB, Rocket Money, Apple Wallet — 10 apps).
  2. Run `scripts/generate-build-plans.mjs --execute --from 137 --to 147` (batch-07/08 partial: Bloomberg, Yahoo Finance, StockTwits, Public, Acorns, Stash, Wealthfront, Betterment, Chime, Revolut, Wise — 11 apps).
  3. Run `scripts/generate-build-plans.mjs --execute --from 472 --to 522` (batch-24/25/26/27 partial: Chase, Bank of America, Wells Fargo, Citi, Capital One, Amex, Discover, US Bank, PNC, TD Bank, Truist, USAA, Navy Federal, SoFi, Ally, Marcus, Fidelity, Schwab, E*Trade, Webull, Moomoo, Interactive Brokers, Vanguard, Monzo, N26, Starling Bank, Skrill, Neteller, Remitly, WorldRemit, Western Union, MoneyGram, Xoom, Crypto.com, Binance, Kraken, Gemini Crypto, Phantom, MetaMask, Trust Wallet, Exodus, Ledger Live, MoonPay, Strike, Current, Dave, Empower, Earnin, Klarna, Afterpay, Affirm — 51 apps).
  4. After each batch run, verify via `gh api` that `docs/plans/README.md` exists in each downstream repo with 0 unfilled placeholders.
  5. Spot-check 3 plans from different subcategories (e.g., traditional banking, brokerage/investing, crypto wallet, P2P payments, BNPL) for finance-appropriate variant architecture (account management, transaction history, payments/transfers, investment portfolio, market data, KYC/identity verification, security/biometrics, card management, budgeting tools).

  **Acceptance criteria:**
  - All Finance & Payments cluster apps have `docs/plans/README.md` with 0 unfilled placeholders.
  - Variant architecture uses finance-specific defaults (account management, transaction history, payments, security, compliance).
  - No script errors or push failures during the run.

  **Execution Profile:**
  - Mode: serial
  - Integration owner: main agent
  - Test strategy: `gh api` reads + placeholder grep on each pushed plan

  **Ship-one-step handoff contract:** Implement only Step 9.12. Validate it. Mark Step 9.12 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 9.13's plan. Enter plan mode for Step 9.13, and stop.
- [ ] Step 9.13: Generate build plans — Travel & Transportation cluster (~79 apps)
- [ ] Step 9.14: Generate build plans — Health, Fitness & Wellness cluster (~81 apps)
- [ ] Step 9.15: Generate build plans — Education & Learning cluster (~31 apps)
- [ ] Step 9.16: Generate build plans — Productivity & Collaboration cluster (~72 apps)
- [ ] Step 9.17: Generate build plans — News, Maps & Navigation cluster (~57 apps)
- [ ] Step 9.18: Generate build plans — Home, Security, Cloud & Enterprise cluster (~137 apps)

- [ ] Step 9.19: Verify completeness and update tracking
  - Files: create `tasks/build-plan-tracking.md`, modify `tasks/todo.md`
  - Verify all 1000 downstream repos have a non-empty `docs/plans/README.md` via `gh api`.
  - Spot-check 5 repos per cluster (75 total) for plan quality: route map completeness, API schema coverage, variant sections present, blocker preservation.
  - Create `tasks/build-plan-tracking.md` with per-repo completion status.
  - Record any repos that failed or need manual intervention.

### Reference

- Todoist pilot build plan (Phase 4 pattern): `tasks/todoist-downstream-build-plan.md`
- Seeding script (CLI pattern to follow): `scripts/seed-downstream-batch.mjs`
- Source specs: `specs/batch-01/` through `specs/batch-50/`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 5 plan queue (app-to-spec mapping): `tasks/roadmap.md` Phase 5 table
