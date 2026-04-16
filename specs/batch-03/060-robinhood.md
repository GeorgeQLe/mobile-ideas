# Retail Investing Clone Spec

## Legal Scope
- Clone objective: reproduce watchlists, portfolio summary, stock detail, order ticket, news, and education gating.
- Must not copy: trademarks, market data feeds, brokerage branding, or proprietary chart styling.
- Original replacement brand/assets: use neutral investing branding and licensed or synthetic market data.

## Product Goal
- Offer a clean investing entry point with a simple trade ticket and clear portfolio state.
- Preserve the core surfaces: home, watchlist, stock detail, order ticket, portfolio, and account.
- Verify options, crypto-like modules, and education gates from lawful research before implementation.

## Research Verification Checklist
- [ ] Confirm home layout, watchlist placement, and market summary cards.
- [ ] Verify stock detail chart states and order-entry flow.
- [ ] Verify portfolio balances, buying power, and account restrictions.
- [ ] Verify notifications for price moves, fills, and margin or risk events.
- [ ] Verify education or eligibility gating for advanced products.

## Core User Journeys
- User reviews portfolio performance and watchlist.
- User opens a stock detail page and places a buy or sell order.
- User checks order status and filled trades.
- User reads market news or education before trading.
- User manages account security and funding sources.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Portfolio summary | Holdings, watchlist | Active, empty | Market closed |
| Stock Detail | Quote and chart | Symbol, period | Live, delayed | Trading halted |
| Order Ticket | Trade execution | Buy, sell, quantity | Valid, invalid | Market change |
| Portfolio | Holdings and cash | Positions, cash | Populated, empty | Restricted account |
| Account | Funding and security | Bank link, auth | Verified, locked | KYC pending |

## Functional Requirements
- Support watchlist management, quote display, and order entry.
- Persist portfolio, watchlist, orders, funding sources, and account status.
- Gate advanced products behind eligibility and education checks.
- Show news, corporate actions, and price alerts if configured.
- Provide tax lots, cost basis, and trade confirmation views if enabled.

## Data Model
- User, Account, Holding, CashBalance, WatchlistItem, Quote, Order, Fill, Alert, NewsItem, FundingSource, ComplianceState.
- Holding stores quantity, basis, average cost, and market value snapshot.
- Order stores side, type, time-in-force, status, and fill details.

## API/Backend Contracts
- `GET /portfolio`, `GET /watchlist`, `GET /quotes/{symbol}`, `POST /orders`
- `GET /orders/{id}`, `GET /news`, `POST /watchlist/items`
- `GET /account`, `POST /funding-sources`
- Use server-side eligibility checks, idempotency, and order state transitions.

## Realtime/Push/Offline
- Push price alerts, order fills, account restrictions, and news events.
- Cache watchlist, holdings, and recent news offline.
- Order submission should revalidate with fresh market state.

## Permissions/Privacy/Safety
- Protect identity, account, and funding data.
- Gate risky or advanced products behind explicit eligibility checks.
- Rate-limit fraudulent funding attempts and abusive order retries.
- Include prominent risk disclosures and educational prompts.

## Analytics Events
- `view_home`, `view_symbol`, `add_watchlist`, `open_order_ticket`, `submit_order`, `order_filled`, `education_viewed`, `account_linked`

## Monetization
- Revenue comes from trading spreads, margin or subscription products, and premium market data if enabled.
- Fees and availability must be server-configurable.

## Acceptance Tests
- Order ticket rejects stale quotes before submission.
- Watchlist updates survive app restart and sync later.
- Eligibility gating blocks advanced products until requirements are met.
- Portfolio remains readable in offline mode with last known values.
- Filled orders update holdings and cash consistently.

## Implementation Notes
- Keep market data ingestion isolated from UI rendering.
- Use synthetic prices in development and test environments.
- Separate education from trade execution to avoid accidental orders.
- Mark compliance, market-data, and eligibility rules that need live verification.
