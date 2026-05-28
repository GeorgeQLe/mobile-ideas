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

- [ ] Step 18.2: Implement first Food, Delivery & Grocery tranche
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
