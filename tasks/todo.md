# Phase 18: Implementation — Food, Delivery & Grocery (~77 Apps × 5 Variants)

> Test strategy: none

**Goal**: Build all five variants for every app in the Food, Delivery & Grocery cluster.

**Scope**:
- Apps: Food delivery (DoorDash, UberEats, etc.), grocery (Instacart, Walmart, etc.), restaurant loyalty, meal planning, recipe apps.
- Shared patterns: location-based search, real-time order tracking, cart/checkout, driver/delivery tracking, menu/catalog browsing, loyalty programs.

**Acceptance Criteria:**
- [ ] Exact Phase 18 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
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

- [ ] Step 18.1: Reconcile exact Food, Delivery & Grocery app inventory and downstream readiness
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

### Milestone: Phase 18 — Food, Delivery & Grocery Complete
**Acceptance Criteria:**
- [ ] Exact Phase 18 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
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
