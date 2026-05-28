# Phase 17: Implementation — Shopping, Commerce & Classifieds (~65 Apps × 5 Variants)

> Test strategy: none

**Goal**: Build all five variants for every app in the Shopping, Commerce & Classifieds cluster.

**Scope**:
- Apps: Shopping (Amazon, eBay, Etsy, etc.), creator commerce (Gumroad, Shopify, etc.), classifieds (Craigslist, OfferUp, etc.), automotive marketplaces.
- Shared patterns: product catalog, search/filter, cart/checkout, payment integration, seller dashboards, listing creation, reviews/ratings.

**Acceptance Criteria:**
- [x] Exact Phase 17 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 17 apps have 5 working variants each or explicit local/toolchain/provider/payment/licensed-data blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Browse, search, cart, listing, and checkout workflows are functional across variants or explicitly blocked by local/provider/regulatory constraints.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share catalog, search, cart, checkout, seller/listing, review, trust/safety, payment, and fulfillment-state patterns. Payment, tax, shipping, fraud, identity, and marketplace-provider behavior must stay blocked until verified with lawful sandbox/provider access.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, payment/provider/licensed-data/privacy/trust-safety blocker review

### Implementation

- [x] Step 17.1: Reconcile exact Shopping, Commerce & Classifieds app inventory and downstream readiness
  - Identify the canonical Phase 17 app set from `specs/`, downstream repo naming, `tasks/repo-seeding.md`, and `tasks/roadmap.md`.
  - Produce an inventory table with app ID, app name, repo slug, source spec path, downstream repository URL, visibility, default branch, README presence, source-spec copy presence, root commit presence, and `.github/workflows` absence.
  - Verify every downstream repo is `PRIVATE` and does not contain `.github/workflows`.
  - Record authenticated GitHub rate-limit evidence before and after the reconciliation scan in `tasks/repo-seeding.md`.
  - Classify likely risk groups: broad retail marketplaces, fashion resale, handmade/creator commerce, classifieds/local marketplaces, automotive marketplaces, seller/admin tools, order/package tracking, checkout/payment/wallet-adjacent commerce, and review/trust/safety surfaces.
  - Record blockers for account-, subscription-, payment-, tax-, shipping-, region-, regulator-, identity/KYC-, fraud/risk-, provider-, licensed-catalog-, brand/IP-, escrow/dispute-, and hardware/permission-gated behavior.
  - Files: modify `tasks/todo.md`, `tasks/repo-seeding.md`, and `tasks/history.md`.

  **What to Build:**
  A canonical Phase 17 inventory and readiness packet. This step should not scaffold variants yet; it should prove the exact downstream repo set, private visibility, source-spec presence, and blocker posture before implementation tranches begin.

  **Approach:**
  1. Use `tasks/roadmap.md`, `tasks/repo-seeding.md`, `specs/`, and downstream repo metadata to derive the exact Phase 17 app list.
  2. Prefer existing Phase 9 build-plan evidence when it conflicts with the older roadmap estimate.
  3. Query GitHub serially enough to avoid rate-limit pressure; stop on any `403`, `429`, auth/permission failure, non-private repo, missing source spec, missing root commit, or workflow path.
  4. Record the reconciled inventory and carry-forward blockers without claiming provider/payment/native parity.
  5. Update this file with executable Step 17.2 planning instructions.

  **Review:**
  - Reconciled Phase 17 to 68 apps from Phase 9.10 build-plan evidence: IDs `046-055`, `393-406`, `442-471`, and `968-981`.
  - Read-only GitHub verification confirmed every downstream repo is `PRIVATE`, defaults to `main`, has a root commit, contains `README.md`, contains its copied source spec under `docs/source-specs/`, and has no `.github/workflows` directory.
  - Recorded before/after GitHub rate-limit evidence and the full inventory table in `tasks/repo-seeding.md`.
  - Carried forward account, payment, tax, shipping, provider, catalog, seller/admin, identity/KYC, fraud/risk, trust/safety, escrow/dispute, licensed-data, region, subscription, and hardware/permission blockers.

- [x] Step 17.2: Implement first Shopping, Commerce & Classifieds tranche
  - Implement five downstream repos from the reconciled Phase 17 inventory:
    - `GeorgeQLe/amazon-mobile-clone` as an original broad retail marketplace scaffold.
    - `GeorgeQLe/temu-mobile-clone` as an original deal-heavy value marketplace scaffold.
    - `GeorgeQLe/shein-mobile-clone` as an original fashion catalog and fit/review scaffold.
    - `GeorgeQLe/etsy-mobile-clone` as an original handmade/custom marketplace scaffold.
    - `GeorgeQLe/ebay-mobile-clone` as an original auction/offers marketplace scaffold.
  - Use branch-backed work if making downstream code changes, one branch per repo, and keep changes serial from the planning repo perspective.
  - Build only lawful original prototype surfaces using synthetic/local fixtures: catalog browse/search/filter, product detail, cart, checkout simulation, order tracking, reviews/ratings, seller/listing/admin placeholder where relevant, and explicit blocker banners for real providers and regulated/payment behavior.
  - Do not add or rely on GitHub Actions. Do not copy original logos, screenshots, product data, catalog data, private APIs, recommendation models, seller/customer data, or licensed media.
  - Verify each repo remains `PRIVATE`, keeps its copied source spec, has no `.github/workflows`, and has local validation or blocker evidence recorded before merge/shipping.
  - Files: downstream repos above, then update `tasks/todo.md` and `tasks/history.md` with PR/commit/validation evidence.

  **What to Build:**
  First Phase 17 implementation tranche across five broad marketplace apps. Each downstream repo should get a small but coherent original app scaffold or implementation slice that proves browse/search/detail/cart/checkout/order-review workflow coverage with synthetic data and explicit provider/payment/tax/shipping/licensed-catalog blockers.

  **Approach:**
  1. Inspect each downstream repo's existing stack, build plan, source spec copy, and validation scripts before editing.
  2. Keep app-specific names and assets original; use synthetic products, sellers, orders, reviews, and promotions.
  3. Implement the same commerce workflow spine across repos while tailoring domain-specific states: broad retail offers, deal/coupon flows, fashion sizing, handmade/custom seller workflows, and auction/offer flows.
  4. Run each repo's available lint/typecheck/test/build or documented local validation. If no executable validation exists, add or run the closest local smoke check and record the residual risk.
  5. Open/merge validated PRs or otherwise land on each repo's `main` only after private visibility, source-spec presence, root commit, and no-workflows checks pass.

  **Review:**
  - Added original static commerce prototypes to all five downstream repos and pushed them directly to `main` after rebasing onto the latest remote `main` where needed.
  - Downstream commits:
    - `GeorgeQLe/amazon-mobile-clone` -> `e608f84` (`MarketHub` broad retail marketplace scaffold).
    - `GeorgeQLe/temu-mobile-clone` -> `500d0ea` (`DealCart` deal-heavy value marketplace scaffold).
    - `GeorgeQLe/shein-mobile-clone` -> `a6c6310` (`StyleRack` fashion catalog and fit/review scaffold).
    - `GeorgeQLe/etsy-mobile-clone` -> `ebe1463` (`CraftLane` handmade/custom marketplace scaffold).
    - `GeorgeQLe/ebay-mobile-clone` -> `0bcb3fe` (`BidBay` auction/offer marketplace scaffold).
  - Each repo now contains `package.json`, `src/index.html`, `src/styles.css`, `src/app.js`, and `scripts/smoke-test.mjs`.
  - Each scaffold uses synthetic catalog items, original app names/copy, local-only cart and checkout simulation, order-tracking placeholders, seller/admin placeholders, and explicit payment/provider/tax/shipping/licensed-data/native verification blockers.
  - Validation passed in all five repos with `npm test`.
  - GitHub metadata checks confirmed all five repos remain `PRIVATE` on default branch `main`; local and API checks found no `.github/workflows` directory.

- [x] Step 17.3: Implement second Shopping, Commerce & Classifieds tranche
  - Implement five downstream repos from the reconciled Phase 17 inventory:
    - `GeorgeQLe/facebook-marketplace-mobile-clone` as an original local marketplace/listing scaffold.
    - `GeorgeQLe/poshmark-mobile-clone` as an original social resale closet/bundle scaffold.
    - `GeorgeQLe/depop-mobile-clone` as an original resale fashion feed/shop scaffold.
    - `GeorgeQLe/stockx-mobile-clone` as an original bid/ask verification-market scaffold.
    - `GeorgeQLe/shop-mobile-clone` as an original package tracking and merchant discovery scaffold.
  - Keep implementation serial from this planning repo. Use branch-backed work only if the downstream repo requires it; otherwise land validated direct-to-`main` commits after rebasing onto latest remote `main`.
  - Build only lawful original prototype surfaces using synthetic/local fixtures: browse/search/filter, listing or product detail, cart/offer/bid/order draft, checkout or provider-blocked quote simulation, tracking, reviews/ratings or trust signals, seller/listing/admin placeholders, and explicit blocker banners for real providers and regulated/payment behavior.
  - Do not add or rely on GitHub Actions. Do not copy original logos, screenshots, listing data, product data, seller/customer data, private APIs, marketplace policy text, recommendation models, payment data, shipping evidence, authenticity data, or licensed media.
  - Verify each repo remains `PRIVATE`, keeps its copied source spec, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md` and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  Second Phase 17 implementation tranche across local marketplace, fashion resale, bid/ask marketplace, and package-tracking commerce apps. Each downstream repo should get a small but coherent original scaffold proving the app-specific workflow spine with synthetic data and explicit provider/payment/shipping/authenticity/licensed-data blockers.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern only if no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: local listing/messaging/pickup trust for Facebook Marketplace, closet/bundle/offer flows for Poshmark, feed/shop/resale moderation for Depop, bid/ask/authenticity placeholders for StockX, and shipment timeline/order import privacy blockers for Shop.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

  **Review:**
  - Added original static commerce prototypes to all five downstream repos and pushed them directly to `main` after rebasing onto the latest remote `main`.
  - Downstream commits:
    - `GeorgeQLe/facebook-marketplace-mobile-clone` -> `faed4b5` (`NeighborList` local marketplace and pickup scaffold).
    - `GeorgeQLe/poshmark-mobile-clone` -> `c34f782` (`ClosetCircle` social resale closet and bundle scaffold).
    - `GeorgeQLe/depop-mobile-clone` -> `998d414` (`ReThread` resale fashion feed/shop scaffold).
    - `GeorgeQLe/stockx-mobile-clone` -> `a2d062a` (`LedgerDrop` bid/ask verification-market scaffold).
    - `GeorgeQLe/shop-mobile-clone` -> `9e9c17d` (`ParcelPilot` package tracking and merchant discovery scaffold).
  - Each repo now contains `package.json`, `src/index.html`, `src/styles.css`, `src/app.js`, and `scripts/smoke-test.mjs`.
  - Each scaffold uses synthetic listings/orders, original app names/copy, local-only draft/quote simulation, tracking placeholders, seller/trust/admin placeholders, and explicit payment/provider/shipping/authenticity/privacy/identity/licensed-data blockers.
  - Validation passed in all five repos with `npm test`; staged diffs passed `git diff --cached --check` before commit.
  - GitHub metadata checks confirmed all five repos remain `PRIVATE` on default branch `main`, keep `README.md`, keep copied source specs under `docs/source-specs/`, have a root commit at `main`, and return `404` for `.github/workflows` (absent).
  - Post-verification rate-limit evidence: core `4980/5000` remaining, reset `1779917748`.

- [ ] Step 17.4: Implement third Shopping, Commerce & Classifieds tranche
  - Implement five downstream repos from the reconciled Phase 17 inventory:
    - `GeorgeQLe/walmart-mobile-clone` as an original retail/grocery marketplace scaffold.
    - `GeorgeQLe/target-mobile-clone` as an original retail pickup, offers, and loyalty-adjacent scaffold.
    - `GeorgeQLe/costco-mobile-clone` as an original membership warehouse retail scaffold.
    - `GeorgeQLe/sam-s-club-mobile-clone` as an original club retail, scan-and-go-blocked scaffold.
    - `GeorgeQLe/kroger-mobile-clone` as an original grocery cart, pickup, and coupon scaffold.
  - Keep implementation serial from this planning repo. Use branch-backed work only if the downstream repo requires it; otherwise land validated direct-to-`main` commits after rebasing onto latest remote `main`.
  - Build only lawful original prototype surfaces using synthetic/local fixtures: browse/search/filter, product detail, cart/order draft, pickup/delivery quote simulation, tracking, reviews/ratings or trust signals, seller/store/admin placeholders where relevant, and explicit blocker banners for real providers and regulated/payment behavior.
  - Do not add or rely on GitHub Actions. Do not copy original logos, screenshots, catalog data, loyalty data, pricing data, store inventory, private APIs, recommendation models, payment data, delivery evidence, membership data, or licensed media.
  - Verify each repo remains `PRIVATE`, keeps its copied source spec, has a root commit, has no `.github/workflows`, and has local validation or blocker evidence recorded before shipping.
  - Files: downstream repos above, then update `tasks/todo.md` and `tasks/history.md` with commit, validation, blocker, and invariant evidence.

  **What to Build:**
  Third Phase 17 implementation tranche across retail and grocery marketplace apps. Each downstream repo should get a small but coherent original scaffold proving browse/search/detail/cart/order-draft/pickup-or-delivery workflow coverage with synthetic data and explicit provider/payment/tax/shipping/inventory/loyalty/membership/licensed-data blockers.

  **Approach:**
  1. Inspect each downstream repo's current stack, task state, source spec copy, and validation commands before editing.
  2. Rebase onto latest remote `main` before committing if the local checkout is behind.
  3. Reuse the lightweight static prototype pattern only if no runtime stack already exists; otherwise follow the repo's selected stack.
  4. Tailor each scaffold: broad retail/grocery cart and store fulfillment for Walmart, pickup/offers for Target, membership and warehouse pack sizes for Costco, club checkout and scan-and-go blockers for Sam's Club, and grocery coupons/pickup substitutions for Kroger.
  5. Run each repo's available validation, verify GitHub privacy/default-branch/source-spec/no-workflows invariants, commit/push serially, and record evidence here.

### Milestone: Phase 17 — Shopping, Commerce & Classifieds Complete
**Acceptance Criteria:**
- [x] Exact Phase 17 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 17 apps have 5 working variants each or explicit local/toolchain/provider/payment/licensed-data blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Browse, search, cart, listing, and checkout workflows are functional across variants or explicitly blocked by local/provider/regulatory constraints.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 16 archive: `tasks/phases/phase-16.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
