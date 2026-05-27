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

- [ ] Step 17.2: Implement first Shopping, Commerce & Classifieds tranche
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
