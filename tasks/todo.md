# Phase 18: Implementation — Food, Delivery & Grocery (~77 Apps × 5 Variants)

> Test strategy: none

**Goal**: Build all five variants for every app in the Food, Delivery & Grocery cluster.

**Scope**:
- Apps: Food delivery (DoorDash, UberEats, etc.), grocery (Instacart, Walmart, etc.), restaurant loyalty, meal planning, recipe apps.
- Shared patterns: location-based search, real-time order tracking, cart/checkout, driver/delivery tracking, menu/catalog browsing, loyalty programs.

**Acceptance Criteria:**
- [x] Exact Phase 18 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 18 apps have 5 working variants each or explicit local/toolchain/provider/payment/licensed-data/location/regulated-food blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Order flow, tracking, location-based discovery, cart, checkout, menu/catalog, and loyalty workflows are functional across variants or explicitly blocked by local/provider/regulatory constraints.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share location services, order tracking, map integration, cart/checkout, menu/catalog, loyalty, delivery-state, substitution, refund/support, and merchant/admin patterns. Payment, tax/tip/fees, courier/driver dispatch, alcohol/regulated goods, SNAP/EBT, pharmacy, restaurant/provider APIs, grocery inventory, location services, and real-time tracking behavior must stay blocked until verified with lawful sandbox/provider/device access.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, location/payment/provider/licensed-data/regulated-food/privacy blocker review

### Implementation

- [x] Step 18.1: Reconcile exact Food, Delivery & Grocery app inventory and downstream readiness
  - Identify the canonical Phase 18 app set from `specs/`, downstream repo naming, `tasks/repo-seeding.md`, `tasks/roadmap.md`, and Phase 9 build-plan evidence.
  - Produce an inventory table with app ID, app name, repo slug, source spec path, downstream repository URL, visibility, default branch, README presence, source-spec copy presence, root commit presence, and `.github/workflows` absence.
  - Verify every downstream repo is `PRIVATE` and does not contain `.github/workflows`.
  - Record authenticated GitHub rate-limit evidence before and after the reconciliation scan in `tasks/repo-seeding.md`.
  - Classify likely risk groups: restaurant delivery, grocery delivery, pickup/curbside, quick-service/coffee loyalty, reservations/local discovery, meal kits, recipes/meal planning, convenience/alcohol/regulator-gated commerce, merchant/admin tools, courier/driver tracking, and refund/support surfaces.
  - Record blockers for account-, subscription-, payment-, tax/tip/fee-, delivery/courier-, location-, map-, inventory-, menu/provider-, merchant-admin-, alcohol/regulated-item-, SNAP/EBT-, pharmacy-, loyalty/rewards-, refund/support-, identity/fraud/risk-, region-, licensed-data-, hardware/permission-, and real-time tracking-gated behavior.
  - Files: modify `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md`.

  **What to Build:**
  A canonical Phase 18 inventory and readiness packet. This step should not scaffold variants yet; it should prove the exact downstream repo set, private visibility, source-spec presence, and blocker posture before implementation tranches begin.

  **Approach:**
  1. Use `tasks/roadmap.md`, `tasks/repo-seeding.md`, `specs/`, and downstream repo metadata to derive the exact Phase 18 app list.
  2. Prefer existing Phase 9 build-plan evidence when it conflicts with older roadmap estimates.
  3. Query GitHub serially enough to avoid rate-limit pressure; stop on any `403`, `429`, auth/permission failure, non-private repo, missing source spec, missing root commit, or workflow path.
  4. Record the reconciled inventory and carry-forward blockers without claiming provider/payment/location/native parity.
  5. Update this file with executable Step 18.2 planning instructions.

  **Review:**
  - Reconciled Phase 18 to 66 apps from Phase 9.11 build-plan evidence: IDs `038-045`, `369-392`, and `407-440`; this supersedes the older roadmap estimate of `~77`.
  - Read-only GitHub verification confirmed every downstream repo is `PRIVATE`, defaults to `main`, has a root commit, contains `README.md`, contains its copied source spec under `docs/source-specs/`, and has no `.github/workflows` directory.
  - Recorded before/after GitHub rate-limit evidence and the full inventory table in `tasks/repo-seeding.md`.
  - Carried forward account, subscription, payment, tax/tip/fee, courier/driver dispatch, location/map, inventory/menu/provider, merchant/admin, loyalty/rewards, SNAP/EBT, alcohol/regulated goods, pharmacy-adjacent, refund/support, identity/fraud/risk, region, licensed-data, hardware/permission, real-time tracking, and real-device blockers.

- [x] Step 18.2: Implement first Food, Delivery & Grocery tranche
  - Implement five downstream repos from the reconciled Phase 18 inventory:
    - `GeorgeQLe/doordash-mobile-clone` as an original restaurant/store delivery marketplace scaffold.
    - `GeorgeQLe/uber-eats-mobile-clone` as an original local-commerce delivery and merchant-menu scaffold.
    - `GeorgeQLe/instacart-mobile-clone` as an original grocery retailer, cart, substitutions, and shopper-handoff scaffold.
    - `GeorgeQLe/starbucks-mobile-clone` as an original coffee ordering, pickup, stored-value-blocked, and loyalty scaffold.
    - `GeorgeQLe/mcdonalds-mobile-clone` as an original quick-service menu, deals, pickup, and delivery-handoff scaffold.
  - Keep implementation serial from this planning repo. Use branch-backed work only if the downstream repo requires it; otherwise land validated direct-to-`main` commits after rebasing onto latest remote `main`.
  - Build only lawful original prototype surfaces using synthetic/local fixtures: location/address setup, store/restaurant discovery, menu/catalog browse, item customization, cart/order draft, checkout quote simulation, pickup/delivery status, order tracking, support/refund placeholders, loyalty/rewards placeholders where relevant, and explicit blocker banners for real providers and regulated/payment behavior.
  - Do not add or rely on GitHub Actions. Do not copy original logos, screenshots, menu data, catalog data, loyalty data, pricing data, store inventory, private APIs, recommendation models, payment data, courier/shopping evidence, merchant/admin data, regulated-food data, or licensed media.
  - Verify each repo remains `PRIVATE`, keeps its copied source spec, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md` and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  First Phase 18 implementation tranche across restaurant delivery, grocery delivery, coffee loyalty, and QSR ordering apps. Each downstream repo should get a small but coherent original scaffold proving location/address setup, discovery, menu/catalog, cart/order draft, pickup or delivery tracking, support/refund, and loyalty/provider/payment blockers with synthetic data.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern only if no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: marketplace restaurant/store delivery for DoorDash, local commerce and merchant menus for Uber Eats, grocery substitutions and shopper handoff for Instacart, coffee ordering and rewards for Starbucks, and QSR deals/pickup/delivery handoff for McDonald's.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

  **Review:**
  - Built and pushed original static mobile prototype scaffolds for all five repos on `main`:
    - `GeorgeQLe/doordash-mobile-clone` -> commit `950fbab`.
    - `GeorgeQLe/uber-eats-mobile-clone` -> commit `4ee7c0e`.
    - `GeorgeQLe/instacart-mobile-clone` -> commit `873c5fd`.
    - `GeorgeQLe/starbucks-mobile-clone` -> commit `62601eb`.
    - `GeorgeQLe/mcdonalds-mobile-clone` -> commit `3032f6d`.
  - Each repo now has `index.html`, `package.json`, `src/styles.css`, and `src/app.js` with synthetic/local fixture workflows only.
  - Covered location/address setup, discovery, menu/catalog browse, cart/order draft or basket quote, pickup/delivery/order status, support placeholders, loyalty/deals placeholders where relevant, and explicit blocked gates for real providers, payment, tax/tip/fees, live tracking, regulated goods, loyalty/stored value, refunds/support escalation, and account/native verification.
  - Validation passed in all five repos with `npm run check`; post-rebase `git status --short --branch` was clean and matched `origin/main` in every downstream repo.
  - Serial GitHub invariant scan confirmed every repo remains `private`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit on `main`, and has no `.github/workflows`.
  - GitHub rate-limit evidence: pre-scan core `4315/5000` remaining, post-scan core `4295/5000` remaining, reset `1780001929`.

- [x] Step 18.3: Implement second Food, Delivery & Grocery tranche
  - Implement five downstream repos from the reconciled Phase 18 inventory:
    - `GeorgeQLe/opentable-mobile-clone` as an original restaurant discovery, reservation search, waitlist-blocked, and dining profile scaffold.
    - `GeorgeQLe/yelp-mobile-clone` as an original local discovery, business profile, review-draft, quote/request, and moderation-blocked scaffold.
    - `GeorgeQLe/too-good-to-go-mobile-clone` as an original surplus-food marketplace, pickup window, surprise-bag reservation, and refund/support-blocked scaffold.
    - `GeorgeQLe/chick-fil-a-mobile-clone` as an original QSR ordering, pickup/drive-thru handoff, menu customization, and loyalty-blocked scaffold.
    - `GeorgeQLe/dunkin-mobile-clone` as an original coffee/QSR ordering, pickup, offers/rewards, stored-value-blocked, and delivery-handoff scaffold.
  - Keep implementation serial from this planning repo. Rebase each downstream checkout onto latest remote `main` before committing if remote has advanced.
  - Use original static/local scaffolds unless a repo already has a runtime stack; do not introduce backend, auth, payment, provider, map, analytics, delivery, reservation, review, or regulated-item infrastructure.
  - Use synthetic/local fixtures only. Do not copy original logos, screenshots, business listings, menus, restaurant data, reviews, ratings, photos, pricing, availability, offers, payment data, courier evidence, reservation inventory, licensed data, or private APIs.
  - Verify each repo remains `PRIVATE`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md` and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  Second Phase 18 implementation tranche across restaurant reservations/local discovery, surplus-food pickup, QSR ordering, and coffee/QSR loyalty apps. Each downstream repo should get a coherent original scaffold proving search/discovery, listing or menu detail, cart/reservation/request draft, pickup or handoff status, support/moderation placeholders, and provider/payment/location/reservation/review/regulated blockers with synthetic data.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern from Step 18.2 only when no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: reservation/waitlist for OpenTable, local discovery/review draft for Yelp, pickup windows and reservation for Too Good To Go, QSR ordering and pickup/drive-thru handoff for Chick-fil-A, and coffee/QSR ordering with rewards blockers for Dunkin.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

  **Review:**
  - Built and pushed original static mobile prototype scaffolds for all five repos on `main`:
    - `GeorgeQLe/opentable-mobile-clone` -> commit `cf75f01`.
    - `GeorgeQLe/yelp-mobile-clone` -> commit `86e48ff`.
    - `GeorgeQLe/too-good-to-go-mobile-clone` -> commit `b6964a2`.
    - `GeorgeQLe/chick-fil-a-mobile-clone` -> commit `62c138f`.
    - `GeorgeQLe/dunkin-mobile-clone` -> commit `09bb266`.
  - Each repo now has `index.html`, `package.json`, `src/styles.css`, and `src/app.js` with synthetic/local fixture workflows only.
  - Covered restaurant discovery/reservation draft, local business discovery/review/quote draft, surplus pickup windows/reservation draft, QSR menu customization/pickup handoff, coffee pickup/offers placeholders, support/moderation placeholders, and explicit blocked gates for real providers, payment, tax/tip/fees, live location/maps, review/reservation inventories, regulated food, loyalty/stored value, refunds/support escalation, and account/native verification.
  - Validation passed in all five repos with `npm run check`; post-push `git status --short --branch` was clean and matched `origin/main` in every downstream repo.
  - Serial GitHub invariant scan confirmed every repo remains `private`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit on `main`, and has no `.github/workflows`.
  - GitHub rate-limit evidence: pre-scan core `5000/5000` remaining, post-scan core `4990/5000` remaining, reset `1780289885`.

- [x] Step 18.4: Implement third Food, Delivery & Grocery tranche
  - Implement five downstream repos from the reconciled Phase 18 inventory:
    - `GeorgeQLe/chipotle-mobile-clone` as an original fast-casual ordering, bowl/burrito customization, pickup/delivery handoff, and rewards-blocked scaffold.
    - `GeorgeQLe/taco-bell-mobile-clone` as an original QSR ordering, menu customization, offers/rewards, pickup/delivery handoff, and payment-blocked scaffold.
    - `GeorgeQLe/subway-mobile-clone` as an original sandwich customization, pickup/delivery handoff, offers/rewards, and nutrition/allergen-blocked scaffold.
    - `GeorgeQLe/panera-bread-mobile-clone` as an original bakery-cafe ordering, rapid pickup/catering-adjacent placeholders, rewards/subscription-blocked scaffold.
    - `GeorgeQLe/wendy-s-mobile-clone` as an original QSR ordering, deals/rewards, pickup/delivery handoff, and provider-blocked scaffold.
  - Keep implementation serial from this planning repo. Rebase each downstream checkout onto latest remote `main` before committing if remote has advanced.
  - Use original static/local scaffolds unless a repo already has a runtime stack; do not introduce backend, auth, payment, provider, map, analytics, delivery, nutrition/allergen, loyalty, or regulated-item infrastructure.
  - Use synthetic/local fixtures only. Do not copy original logos, screenshots, menus, restaurant data, nutrition/allergen data, rewards data, offers, prices, photos, payment data, courier evidence, franchise data, licensed data, or private APIs.
  - Verify each repo remains `PRIVATE`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  Third Phase 18 implementation tranche across fast-casual and QSR ordering apps. Each downstream repo should get a coherent original scaffold proving store selection, menu customization, basket/order draft, pickup/delivery handoff status, offers/rewards placeholders, support placeholders, and provider/payment/location/nutrition/loyalty blockers with synthetic data.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern from Steps 18.2-18.3 only when no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: ingredient-line customization for Chipotle/Subway, late-night/offers-oriented QSR ordering for Taco Bell, bakery-cafe pickup/rewards/subscription blockers for Panera Bread, and QSR deals/pickup/delivery handoff for Wendy's.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

  **Review:**
  - Built and pushed original static mobile prototype scaffolds for all five repos on `main`:
    - `GeorgeQLe/chipotle-mobile-clone` -> commit `511a82f`.
    - `GeorgeQLe/taco-bell-mobile-clone` -> commit `4d643c3`.
    - `GeorgeQLe/subway-mobile-clone` -> commit `ceb7ec2`.
    - `GeorgeQLe/panera-bread-mobile-clone` -> commit `94c6486`.
    - `GeorgeQLe/wendy-s-mobile-clone` -> commit `48f03b7`.
  - Each repo now has `index.html`, `package.json`, `src/styles.css`, and `src/app.js` with synthetic/local fixture workflows only.
  - Covered store selection, menu/category browse, item customization, basket/order draft, pickup or delivery handoff status, support placeholders, offers/rewards/subscription placeholders where relevant, and explicit blocked gates for real providers, payment, tax/tip/fees, live location/maps, menu/provider data, nutrition/allergen data, regulated food, loyalty/rewards, subscriptions/stored value, pickup shelf/drive-thru check-in, refunds/support escalation, franchise variation, and account/native verification.
  - Validation passed in all five repos with `npm run check`; downstream diffs passed `git diff --check` before commit.
  - Serial GitHub invariant scan confirmed every repo remains `private`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit on `main`, and has no `.github/workflows`.
  - GitHub rate-limit evidence: pre-scan core `5000/5000` remaining, post-scan core `4985/5000` remaining, reset `1780325056`.

- [x] Step 18.5: Implement fourth Food, Delivery & Grocery tranche
  - Implement five downstream repos from the reconciled Phase 18 inventory:
    - `GeorgeQLe/burger-king-mobile-clone` as an original QSR ordering, deals/rewards, pickup/delivery handoff, and provider/payment-blocked scaffold.
    - `GeorgeQLe/domino-s-mobile-clone` as an original pizza ordering, customization, tracker-style status, carryout/delivery handoff, and provider-blocked scaffold.
    - `GeorgeQLe/pizza-hut-mobile-clone` as an original pizza/QSR ordering, deals, cart, delivery/carryout status, and payment/provider-blocked scaffold.
    - `GeorgeQLe/papa-johns-mobile-clone` as an original pizza ordering, toppings/customization, loyalty/offers, delivery/carryout handoff, and provider-blocked scaffold.
    - `GeorgeQLe/little-caesars-mobile-clone` as an original pizza pickup portal, ready-box-style handoff placeholder, cart/order draft, and payment/provider-blocked scaffold.
  - Keep implementation serial from this planning repo. Rebase each downstream checkout onto latest remote `main` before committing if remote has advanced.
  - Use original static/local scaffolds unless a repo already has a runtime stack; do not introduce backend, auth, payment, provider, map, analytics, delivery, loyalty, order-tracking-provider, nutrition/allergen, or regulated-item infrastructure.
  - Use synthetic/local fixtures only. Do not copy original logos, screenshots, menus, restaurant data, nutrition/allergen data, rewards data, offers, prices, photos, payment data, courier evidence, franchise data, order-tracker state machines, licensed data, or private APIs.
  - Verify each repo remains `PRIVATE`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  Fourth Phase 18 implementation tranche across burger QSR and pizza ordering apps. Each downstream repo should get a coherent original scaffold proving store selection, menu/pizza customization, cart/order draft, carryout/delivery handoff status, tracker/status placeholders, offers/rewards placeholders, support placeholders, and provider/payment/location/tracker/loyalty blockers with synthetic data.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern from Steps 18.2-18.4 only when no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: QSR deals/pickup/delivery for Burger King, pizza builder and tracker placeholders for Domino's, deals and delivery/carryout status for Pizza Hut, toppings/loyalty/offers for Papa Johns, and pickup portal/ready-box handoff placeholders for Little Caesars.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

  **Review:**
  - Built and pushed original static mobile prototype scaffolds for all five repos on `main`:
    - `GeorgeQLe/burger-king-mobile-clone` -> commit `64e2770`.
    - `GeorgeQLe/domino-s-mobile-clone` -> commit `d788d46`.
    - `GeorgeQLe/pizza-hut-mobile-clone` -> commit `8bc55a0`.
    - `GeorgeQLe/papa-johns-mobile-clone` -> commit `944f2cd`.
    - `GeorgeQLe/little-caesars-mobile-clone` -> commit `a3f8b29`.
  - Each repo now has `index.html`, `package.json`, `src/styles.css`, and `src/app.js` with synthetic/local fixture workflows only.
  - Covered store selection, fulfillment mode selection, menu or pizza customization, cart quote, carryout/delivery/pickup handoff status, tracker-style placeholders, support placeholders, offers/rewards placeholders where relevant, and explicit blocked gates for real providers, payment, tax/tip/fees, live location/maps, menus/prices/offers, nutrition/allergen data, loyalty/rewards, order tracking, pickup cabinet/drive-thru check-in, refunds/support escalation, franchise variation, and account/native verification.
  - Validation passed in all five repos with `npm run check`; downstream diffs passed `git diff --check --cached` before commit.
  - Post-push `git status --short --branch` was clean and matched `origin/main` in every temporary downstream clone.
  - Serial GitHub invariant scan confirmed every repo remains `private`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit on `main`, and has no `.github/workflows`.
  - GitHub rate-limit evidence: pre-scan core `4985/5000` remaining, post-scan core `4965/5000` remaining, reset `1780325056`.

- [ ] Step 18.6: Implement fifth Food, Delivery & Grocery tranche
  - Implement five downstream repos from the reconciled Phase 18 inventory:
    - `GeorgeQLe/kfc-mobile-clone` as an original chicken QSR ordering, bucket/meal customization, pickup/delivery handoff, and provider/payment-blocked scaffold.
    - `GeorgeQLe/popeyes-mobile-clone` as an original chicken QSR ordering, sides/customization, offers/rewards placeholders, pickup/delivery handoff, and provider-blocked scaffold.
    - `GeorgeQLe/sonic-drive-in-mobile-clone` as an original drive-in ordering, stall/check-in placeholder, pickup/delivery handoff, offers/rewards placeholders, and provider/payment-blocked scaffold.
    - `GeorgeQLe/shake-shack-mobile-clone` as an original burger/casual ordering, item customization, pickup shelf/delivery handoff, and loyalty/provider-blocked scaffold.
    - `GeorgeQLe/sweetgreen-mobile-clone` as an original salad/bowl ordering, ingredient customization, pickup/delivery handoff, nutrition/allergen-blocked scaffold.
  - Keep implementation serial from this planning repo. Use temporary or local checkouts as needed, but land validated direct-to-`main` commits after confirming each checkout matches remote `main`.
  - Use original static/local scaffolds unless a repo already has a runtime stack; do not introduce backend, auth, payment, provider, map, analytics, delivery, loyalty, order-tracking-provider, nutrition/allergen, or regulated-item infrastructure.
  - Use synthetic/local fixtures only. Do not copy original logos, screenshots, menus, restaurant data, nutrition/allergen data, rewards data, offers, prices, photos, payment data, courier evidence, franchise data, order-tracker state machines, licensed data, or private APIs.
  - Verify each repo remains `PRIVATE`, defaults to `main`, keeps `README.md`, keeps its copied source spec under `docs/source-specs/`, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  Fifth Phase 18 implementation tranche across chicken QSR, drive-in, burger/casual, and salad/bowl ordering apps. Each downstream repo should get a coherent original scaffold proving store selection, item customization, cart/order draft, pickup/delivery handoff status, offers/rewards placeholders where relevant, support placeholders, and provider/payment/location/nutrition/loyalty blockers with synthetic data.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase or fast-forward onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern from Steps 18.2-18.5 only when no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: chicken bucket/meal and sides customization for KFC/Popeyes, drive-in stall and check-in placeholders for SONIC Drive-In, burger/casual pickup shelf for Shake Shack, and salad/bowl ingredient selection with nutrition/allergen blockers for sweetgreen.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

### Milestone: Phase 18 — Food, Delivery & Grocery Complete
**Acceptance Criteria:**
- [x] Exact Phase 18 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 18 apps have 5 working variants each or explicit local/toolchain/provider/payment/licensed-data/location/regulated-food blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Order flow, tracking, location-based discovery, cart, checkout, menu/catalog, and loyalty workflows are functional across variants or explicitly blocked by local/provider/regulatory constraints.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 17 archive: `tasks/phases/phase-17.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
