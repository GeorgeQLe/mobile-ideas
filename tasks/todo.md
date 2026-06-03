# Phase 19: Implementation — Finance & Payments (~65 Apps × 5 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all five variants for every app in the Finance & Payments cluster.

**Scope**:
- Apps: Banking, wallets, payments, investing, crypto, budgeting, neobanks, credit, tax, lending, insurance-adjacent, market-data, and portfolio tools.
- Shared patterns: account dashboards, transaction history, transfer flows, portfolio views, charts/graphs, biometric-auth placeholders, PCI-adjacent security patterns, KYC/AML blockers, fraud/risk review, disputes, regulated disclosures, and provider data freshness.

**Acceptance Criteria:**
- [ ] Exact Phase 19 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 19 apps have 5 working variants each or explicit local/toolchain/provider/payment/licensed-data/identity/regulatory/security blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Account dashboards, transaction history, transfer/payment/investing flows, portfolio/chart surfaces, auth/security states, dispute/support flows, and regulated disclosures are functional across variants or explicitly blocked by local/provider/regulatory constraints.
- [ ] Category-specific risk review for finance, payments, investing, crypto, lending, tax, insurance-adjacent, fraud, identity, and financial-data features is documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share financial chart, transaction, account-dashboard, auth/security, provider freshness, dispute/support, and risk-review patterns. Bank/payment rails, card networks, brokerage/custody/exchange integrations, open-banking providers, tax/credit/loan/insurance logic, KYC/AML, sanctions screening, market-data licensing, PCI-adjacent storage, biometric auth, fraud/risk, and regulated disclosures must stay blocked until verified with lawful sandbox/provider/device/regulatory access.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, finance/regulatory/privacy/security blocker review

### Implementation

- [x] Step 19.1: Reconcile exact Finance & Payments app inventory and downstream readiness
  - Reconciled 72 apps across IDs 056–065 (10), 137–147 (11), 472–522 (51) from Phase 9 Step 9.12 build-plan evidence.
  - Serial GitHub API verification: `checked=72, pass=72, fail=0`. All PRIVATE, default `main`, README present, source spec present, root commit present, no `.github/workflows`.
  - Pre-scan rate limit: `core: 5000/5000, reset: 1780506911`. Post-scan: `core: 4712/5000, reset: 1780506937`. No 403/429/auth failures.
  - Classified 15 risk groups: P2P payments (3), digital wallets (4), traditional banking (13), neobanks (8), investing/brokerage (13), crypto exchange/custody (5), crypto wallets (5), market data/news (3), budgeting/personal finance (4), credit/loans/BNPL (3), remittance (6), crypto on-ramp (2), payroll/earned-wage (1), rewards/cashback (1), social investing (2).
  - Carry-forward blockers documented: KYC/AML/sanctions, payment rails/card networks, bank-link/open-banking, brokerage order routing/custody, crypto exchange/on-chain, lending/credit underwriting, market-data licensing, PCI-adjacent storage, biometric/native auth, fraud/risk, remittance/cross-border, tax/disclosures, real balances/transactions, disputes/chargebacks, financial disclosures/regulatory notices, region/regulator controls.
  - Full inventory and blocker posture recorded in `tasks/repo-seeding.md` under "Phase 19 Finance & Payments Inventory (72 Apps)".

- [x] Step 19.2: First Finance & Payments implementation tranche — P2P Payments & Digital Wallets
  - **Apps (6):** Cash App (056), Venmo (057), PayPal (058), Zelle (059), Skrill (498), Neteller (499).
  - **Downstream repos:** `GeorgeQLe/cash-app-mobile-clone`, `GeorgeQLe/venmo-mobile-clone`, `GeorgeQLe/paypal-mobile-clone`, `GeorgeQLe/zelle-mobile-clone`, `GeorgeQLe/skrill-mobile-clone`, `GeorgeQLe/neteller-mobile-clone`.

  **What to Build:**
  Original static prototypes for each of the 6 apps. Each repo gets:
  - `index.html` — single-page prototype shell with app-specific screens
  - `package.json` — with `check` and `test` scripts (syntax validation)
  - `src/styles.css` — app-specific styling
  - `src/app.js` — synthetic app logic

  **Prototype Coverage:**
  - Synthetic account dashboard with balance display and recent activity
  - Transaction history list with synthetic entries (sent/received/pending)
  - Send/receive/request money flows with contact/recipient selection
  - Payment method management (linked bank, card placeholders)
  - QR code / payment link placeholder (where app-relevant)
  - Notification preferences placeholder
  - Support/help and security settings placeholders
  - Explicit blocker banners for: real payment rails, KYC/AML identity verification, bank-link (Plaid/open-banking), biometric auth, fraud/risk monitoring, real balances/transactions, PCI-adjacent card storage, and P2P transfer execution

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. For each of the 6 repos, serially:
     a. Clone the downstream repo locally.
     b. Read the source spec from `docs/source-specs/` for app-specific context.
     c. Create `index.html`, `package.json`, `src/styles.css`, `src/app.js` with original prototype code.
     d. Run `npm run check` and `git diff --check --cached` before commit.
     e. Commit and push to `main`.
     f. Verify via `gh api`: PRIVATE, `main` branch, README, source spec, root commit, no `.github/workflows`.
  3. `gh api rate_limit` — record post-scan evidence.
  4. Update `tasks/todo.md` (check off 19.2, add Step 19.3 plan), `tasks/repo-seeding.md` (rate-limit + commit evidence), `tasks/history.md` (execution evidence).

  **Acceptance Criteria:**
  - All 6 repos have original static prototypes committed and pushed to `main`.
  - `npm run check` passes in each repo.
  - All 6 repos verified PRIVATE with required artifacts post-push.
  - Rate-limit evidence recorded before and after.
  - No 403/429/auth failures.
  - All real payment/banking/identity/fraud features marked as explicitly blocked.

  **Files:** downstream repos (6), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Execution Evidence:**
  - All 6 repos received original static prototypes: `index.html`, `package.json`, `src/styles.css`, `src/app.js`.
  - `npm run check` passed in all 6 repos before commit.
  - Commits pushed to `main`: `cash-app-mobile-clone` (ba29c4ac), `venmo-mobile-clone` (663d44c9), `paypal-mobile-clone` (2708b076), `zelle-mobile-clone` (855dc909), `skrill-mobile-clone` (c1335ce4), `neteller-mobile-clone` (51e7ddde).
  - Serial GitHub API verification: all 6 repos PRIVATE, default `main`, README present, source spec present, `index.html` present, `src/app.js` present, root commit present, no `.github/workflows`.
  - Pre-scan rate limit: `core: 4712/5000, reset: 1780506937`. Post-scan: `core: 4676/5000, reset: 1780506937`. No 403/429/auth failures.
  - Each prototype includes: synthetic account dashboard with balance, transaction history, send/receive/request flows, payment method management, app-specific services and settings, and explicit blocker banners for all regulated features.

- [x] Step 19.3: Second Finance & Payments implementation tranche — Traditional Banking
  - **Apps (13):** Chase Mobile (472), Bank of America (473), Wells Fargo (474), Citi Mobile (475), Capital One (476), American Express (477), Discover (478), U.S. Bank (479), PNC Mobile (480), TD Bank (481), Truist (482), USAA (483), Navy Federal Credit Union (484).
  - **Downstream repos:** `GeorgeQLe/chase-mobile-mobile-clone`, `GeorgeQLe/bank-of-america-mobile-banking-mobile-clone`, `GeorgeQLe/wells-fargo-mobile-mobile-clone`, `GeorgeQLe/citi-mobile-mobile-clone`, `GeorgeQLe/capital-one-mobile-mobile-clone`, `GeorgeQLe/american-express-mobile-clone`, `GeorgeQLe/discover-mobile-mobile-clone`, `GeorgeQLe/u-s-bank-mobile-clone`, `GeorgeQLe/pnc-mobile-mobile-clone`, `GeorgeQLe/td-bank-mobile-clone`, `GeorgeQLe/truist-mobile-clone`, `GeorgeQLe/usaa-mobile-clone`, `GeorgeQLe/navy-federal-credit-union-mobile-clone`.
  - **Source specs:** `specs/batch-24/472-chase-mobile.md` through `specs/batch-24/480-pnc-mobile.md`, `specs/batch-25/481-td-bank.md` through `specs/batch-25/484-navy-federal-credit-union.md`.

  **Execution Evidence:**
  - All 13 repos received original static prototypes: `index.html`, `package.json`, `src/styles.css`, `src/app.js`.
  - `npm run check` passed in all 13 repos before commit.
  - Commits pushed to `main`: `chase-mobile-mobile-clone` (2e00274e), `bank-of-america-mobile-banking-mobile-clone` (7159d903), `wells-fargo-mobile-mobile-clone` (6e2be28b), `citi-mobile-mobile-clone` (0e7bfa4d), `capital-one-mobile-mobile-clone` (c201842a), `american-express-mobile-clone` (615695f6), `discover-mobile-mobile-clone` (005c2642), `u-s-bank-mobile-clone` (cadf7843), `pnc-mobile-mobile-clone` (e3b96aed), `td-bank-mobile-clone` (9cac973e), `truist-mobile-clone` (40899957), `usaa-mobile-clone` (e4b73cbf), `navy-federal-credit-union-mobile-clone` (4b2c8961).
  - Serial GitHub API verification: all 13 repos PRIVATE, default `main`, README present, source spec present, `index.html` present, `src/app.js` present, root commit present, no `.github/workflows`.
  - Pre-scan rate limit: `core: 4676/5000, reset: 1780506937`. Post-scan: `core: 4585/5000, reset: 1780506937`. No 403/429/auth failures.
  - Each prototype includes: synthetic checking/savings/credit card dashboards, transaction history, internal/external/wire/Zelle transfer flows, bill pay with payee management, mobile check deposit, ATM/branch locator, card management (lock/replace/dispute/rewards), bank-specific services, settings, and explicit blocker banners for 15 regulated feature categories.

- [x] Step 19.4: Third Finance & Payments implementation tranche — Neobanks
  - **Apps (7):** Chime (145), Current (516), SoFi (485), Ally (486), Marcus (487), Monzo (495), Revolut (146).
  - **Downstream repos:** `GeorgeQLe/chime-mobile-clone`, `GeorgeQLe/current-mobile-clone`, `GeorgeQLe/sofi-mobile-clone`, `GeorgeQLe/ally-mobile-clone`, `GeorgeQLe/marcus-mobile-clone`, `GeorgeQLe/monzo-mobile-clone`, `GeorgeQLe/revolut-mobile-clone`.
  - **Note:** Plan originally listed 8 apps including Varo (139), but Varo has no downstream repo or source spec in the manifest. Proceeded with 7 verified repos.

  **Execution Evidence:**
  - All 7 repos received original static prototypes: `index.html`, `package.json`, `src/styles.css`, `src/app.js`.
  - `npm run check` passed in all 7 repos before commit.
  - Commits pushed to `main`: `chime-mobile-clone` (4ab8a03a), `current-mobile-clone` (2cc990b7), `sofi-mobile-clone` (af517f95), `ally-mobile-clone` (2973fc41), `marcus-mobile-clone` (2012c695), `monzo-mobile-clone` (8e065928), `revolut-mobile-clone` (afc09991).
  - Serial GitHub API verification: all 7 repos PRIVATE, default `main`, README present, source spec present, `index.html` present, `src/app.js` present, root commit present, no `.github/workflows`.
  - Pre-scan rate limit: `core: 5000/5000, reset: 1780510834`. Post-scan: `core: 4958/5000, reset: 1780511444`. No 403/429/auth failures.
  - Each prototype includes: synthetic account dashboards (checking/savings/spending/multi-currency), transaction history with categories, internal/external transfers, debit card controls, savings goals/pots/vaults/buckets, and explicit blocker banners for all regulated features.
  - Neobank-specific features per app: Chime (round-ups, early DD, credit builder, overdraft cushion), Current (savings pods, teen banking, crypto, point rewards), SoFi (investing, loans, credit card, robo-advisor, crypto), Ally (CDs, buckets, auto lending, Zelle, robo portfolio), Marcus (high-yield savings, no-penalty CDs, personal loans, credit insights), Monzo (pots, budgeting, bill splitting, salary sorting, UK GBP), Revolut (multi-currency FX, crypto, stocks, vaults, virtual cards, international transfers).

- [x] Step 19.5: Fourth Finance & Payments implementation tranche — Investing & Brokerage
  - **Apps (13):** Robinhood (060), Public (140), Acorns (141), Stash (142), Wealthfront (143), Betterment (144), Fidelity (488), Schwab Mobile (489), E*TRADE (490), Webull (491), moomoo (492), Interactive Brokers (493), Vanguard (494).
  - **Downstream repos:** `GeorgeQLe/robinhood-mobile-clone`, `GeorgeQLe/public-mobile-clone`, `GeorgeQLe/acorns-mobile-clone`, `GeorgeQLe/stash-mobile-clone`, `GeorgeQLe/wealthfront-mobile-clone`, `GeorgeQLe/betterment-mobile-clone`, `GeorgeQLe/fidelity-mobile-clone`, `GeorgeQLe/schwab-mobile-mobile-clone`, `GeorgeQLe/e-trade-mobile-clone`, `GeorgeQLe/webull-mobile-clone`, `GeorgeQLe/moomoo-mobile-clone`, `GeorgeQLe/interactive-brokers-mobile-clone`, `GeorgeQLe/vanguard-mobile-clone`.
  - **Source specs:** `specs/batch-03/060-robinhood.md`, `specs/batch-07/140-public.md`, `specs/batch-08/141-acorns.md`, `specs/batch-08/142-stash.md`, `specs/batch-08/143-wealthfront.md`, `specs/batch-08/144-betterment.md`, `specs/batch-25/488-fidelity.md`, `specs/batch-25/489-schwab-mobile.md`, `specs/batch-25/490-e-trade.md`, `specs/batch-25/491-webull.md`, `specs/batch-25/492-moomoo.md`, `specs/batch-25/493-interactive-brokers.md`, `specs/batch-25/494-vanguard.md`.

  **What to Build:**
  Original static prototypes for each of the 13 investing/brokerage apps. Each repo gets:
  - `index.html` — single-page prototype shell with investing-specific screens
  - `package.json` — with `check` script (syntax validation)
  - `src/styles.css` — app-specific styling (unique color scheme per brand)
  - `src/app.js` — synthetic app logic

  **Prototype Coverage:**
  - Synthetic portfolio dashboard with total value, daily gain/loss, and holdings breakdown
  - Watchlist with synthetic stock/ETF/crypto entries and price data
  - Quote/detail page for individual securities with synthetic chart placeholder
  - Order ticket simulation (buy/sell with quantity, order type, review, confirmation)
  - Account summary (buying power, margin, cash, portfolio allocation)
  - Transaction/order history with filled/pending/cancelled states
  - Account types (individual brokerage, IRA, Roth IRA, 401k rollover) where app-relevant
  - Cash management / sweep account where app-relevant
  - Robo-advisor / automated investing where app-relevant (Acorns, Wealthfront, Betterment, Stash)
  - Round-ups / recurring investment where app-relevant
  - Options / advanced order types where app-relevant (Robinhood, E*TRADE, IBKR, Webull)
  - Crypto trading entry point where app-relevant
  - Tax-loss harvesting / tax reporting placeholder where app-relevant
  - Settings, notifications, security, support placeholders
  - Explicit blocker banners for: brokerage order routing, trade execution, market data licensing, custody/clearing, SIPC protection, margin lending, options underwriting, crypto exchange, robo-advisor algorithms, tax-loss harvesting, KYC/AML, real balances/positions, regulatory disclosures (Reg T, Reg NMS, best execution), and financial advisor licensing

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. For each of the 13 repos, serially:
     a. Clone the downstream repo locally (if not already cloned).
     b. Read the source spec from `docs/source-specs/` for app-specific context.
     c. Create `index.html`, `package.json`, `src/styles.css`, `src/app.js` with original prototype code.
     d. Run `npm run check` and `git diff --check --cached` before commit.
     e. Commit and push to `main`.
     f. Verify via `gh api`: PRIVATE, `main` branch, README, source spec, root commit, no `.github/workflows`.
  3. `gh api rate_limit` — record post-scan evidence.
  4. Update `tasks/todo.md` (check off 19.5, add Step 19.6 plan), `tasks/repo-seeding.md` (rate-limit + commit evidence), `tasks/history.md` (execution evidence).

  **Acceptance Criteria:**
  - All 13 repos have original static prototypes committed and pushed to `main`.
  - `npm run check` passes in each repo.
  - All 13 repos verified PRIVATE with required artifacts post-push.
  - Rate-limit evidence recorded before and after.
  - No 403/429/auth failures.
  - All real brokerage/investing/trading/regulatory features marked as explicitly blocked.

  **Files:** downstream repos (13), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Execution Evidence:**
  - All 13 repos received original static prototypes: `index.html`, `package.json`, `src/styles.css`, `src/app.js`.
  - `npm run check` passed in all 13 repos before commit.
  - Commits pushed to `main`: `robinhood-mobile-clone` (fafccd0d), `public-mobile-clone` (65e1df63), `acorns-mobile-clone` (13b9fe0f), `stash-mobile-clone` (dcde0de7), `wealthfront-mobile-clone` (915f6215), `betterment-mobile-clone` (77564958), `fidelity-mobile-clone` (93d5ba13), `schwab-mobile-mobile-clone` (0cb42585), `e-trade-mobile-clone` (cb7f04df), `webull-mobile-clone` (ec7c9e88), `moomoo-mobile-clone` (f0c0efd9), `interactive-brokers-mobile-clone` (9feaa951), `vanguard-mobile-clone` (b350630b).
  - Serial GitHub API verification: all 13 repos PRIVATE, default `main`, README present, source spec present, `index.html` present, `src/app.js` present, root commit present, no `.github/workflows`.
  - Pre-scan rate limit: `core: 4958/5000, reset: 1780511444`. Post-scan: `core: 4958/5000, reset: 1780511444`. No 403/429/auth failures.
  - Each prototype includes: synthetic portfolio dashboard with holdings and P&L, watchlists, quote/detail pages, order ticket simulation, account summary (multi-account where relevant), order history with filled/pending/cancelled states, and explicit blocker banners for all regulated brokerage features.
  - App-specific features per category:
    - Commission-free/active brokerages (Robinhood, Public, Webull, moomoo): options chains, crypto, futures, social feed, community, advanced charts, paper trading, screeners, multi-market access.
    - Micro-investing/robo-advisors (Acorns, Stash, Wealthfront, Betterment): round-ups, recurring investments, automated portfolios, tax-loss harvesting, bond ladders, goal-based investing, custodial accounts, stock-rewards card, cash accounts, financial planning.
    - Full-service brokerages (Fidelity, Schwab, E*TRADE, Interactive Brokers, Vanguard): mutual funds, ETFs, fixed income, managed portfolios, checking/banking, retirement (Roth/Traditional/SEP/401k/529), target-date funds, advisory services, multi-asset (stocks/options/futures/forex/bonds), portfolio margin.

- [ ] Step 19.6: Fifth Finance & Payments implementation tranche — Crypto Exchanges & Wallets
  - **Apps (10):** Coinbase (061), Crypto.com (062), Binance.US (063), Kraken (064), Gemini (065), Trust Wallet (137), MetaMask (138), Phantom (147), Ledger Live (500), Exodus (501).
  - Plan details TBD — next planning step.

### Milestone: Phase 19 — Finance & Payments Complete
**Acceptance Criteria:**
- [ ] Exact Phase 19 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 19 apps have 5 working variants each or explicit local/toolchain/provider/payment/licensed-data/identity/regulatory/security blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Account dashboards, transaction history, transfer/payment/investing flows, portfolio/chart surfaces, auth/security states, dispute/support flows, and regulated disclosures are functional across variants or explicitly blocked by local/provider/regulatory constraints.
- [ ] Category-specific risk review for finance, payments, investing, crypto, lending, tax, insurance-adjacent, fraud, identity, and financial-data features is documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 18 archive: `tasks/phases/phase-18.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
