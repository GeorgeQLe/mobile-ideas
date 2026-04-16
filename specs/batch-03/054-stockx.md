# Authenticated Marketplace Clone Spec

## Legal Scope
- Clone objective: reproduce bid/ask marketplace browsing, price history, authentication state, checkout, and order tracking.
- Must not copy: trademarked logos, sneaker images, proprietary authentication methods, or brand partnerships.
- Original replacement brand/assets: use neutral marketplace branding and synthetic product imagery.

## Product Goal
- Support a market-driven buying experience with transparent pricing and order confidence.
- Preserve the core path: home, search, product detail, bid/ask, checkout, authentication status, and orders.
- Verify authentication milestone states and fee presentation before implementation.

## Research Verification Checklist
- [ ] Confirm product page layout and market-price visualization.
- [ ] Verify bid, ask, and instant-buy interaction states.
- [ ] Verify authentication, shipping, and payout checkpoints.
- [ ] Verify watchlist, alerts, and price-change notifications.
- [ ] Verify seller listing creation and inventory rules.

## Core User Journeys
- User searches a product and reviews market history.
- User places a bid or buys at ask price.
- User tracks order through authentication and shipment.
- Seller lists an item, responds to bids, and accepts a sale.
- User watches a product and receives price alerts.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Market browse | Query, category | Active, empty | No comps |
| Product Detail | Market and trade data | Bid, ask | Live, halted | Authentication pending |
| Watchlist | Saved items | Alerts, list | Active, empty | Delisted item |
| Orders | Fulfillment tracking | Order list | Pending, complete | Auth delay |
| Seller Listing | Create supply | Photos, price | Draft, live | Invalid category |

## Functional Requirements
- Support bid, ask, and instant-buy marketplace flows.
- Persist watchlist, order history, alerts, and seller listings.
- Present market history, inventory, and recent sale signals.
- Track authentication, shipping, and payout states separately.
- Allow seller tooling for listing, repricing, and order processing.

## Data Model
- User, Product, MarketQuote, Bid, Ask, WatchlistItem, Order, AuthenticationJob, Shipment, SellerListing, Alert, Payout.
- MarketQuote stores time series snapshot and latest trade context.
- AuthenticationJob stores review status, photos, and outcome.

## API/Backend Contracts
- `GET /products/{id}`, `GET /market/{id}`, `POST /bids`, `POST /asks`
- `POST /checkout`, `GET /orders/{id}`, `GET /watchlist`, `POST /seller/listings`
- `GET /auth-jobs/{id}`
- Keep bid/ask updates server-authoritative and idempotent for checkout.

## Realtime/Push/Offline
- Push bid accepted, outbid, authentication updates, and order milestones.
- Cache watchlist and product history offline.
- Trade actions require fresh market state.

## Permissions/Privacy/Safety
- Request camera only for seller listing or authentication upload if configured.
- Protect payment, shipping, and identity data.
- Rate-limit fake bids and counterfeit listing attempts.
- Show clear verification and fee disclosures.

## Analytics Events
- `view_product`, `add_watchlist`, `place_bid`, `submit_ask`, `instant_buy`, `auth_update_viewed`, `order_shipped`, `payout_requested`

## Monetization
- Revenue comes from marketplace spread, seller fees, and premium market tools.
- Fee and spread logic must remain server-driven.

## Acceptance Tests
- Bid validation rejects stale market data.
- Authentication state progresses through accepted statuses.
- Watchlist alerts fire on price movement and sale completion.
- Seller listing cannot publish without required fields.
- Offline browse works, but trading actions stay disabled.

## Implementation Notes
- Keep market data and authentication workflow modular.
- Use synthetic products and original trade labels only.
- Separate quote history from transaction history.
- Mark authentication and fee details that need live verification.
