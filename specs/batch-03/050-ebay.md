# Auction Marketplace Clone Spec

## Legal Scope
- Clone objective: reproduce auction listings, buy-now flow, watchlist, bidding, seller tools, shipping, and dispute paths.
- Must not copy: trademarks, auction house branding, proprietary seller badges, or listing photos.
- Original replacement brand/assets: use neutral marketplace branding and synthetic listing content.

## Product Goal
- Support dynamic bidding and fixed-price sales within one marketplace shell.
- Preserve the primary surfaces: home, search, listing detail, bid sheet, cart, watchlist, orders, and seller tools.
- Verify bid increments, reserve behavior, and payment timing from lawful research.

## Research Verification Checklist
- [ ] Confirm auction listing detail layout and bid placement flow.
- [ ] Verify buy-now versus auction presentation and timer states.
- [ ] Verify watchlist updates, seller offers, and counteroffer flows.
- [ ] Verify dispute, return, and shipping status presentation.
- [ ] Verify notification timing for outbid, bid won, and sale completed.

## Core User Journeys
- User searches for a product and watches an auction listing.
- User places a bid, gets outbid, and raises the bid.
- User uses buy-now for a fixed-price listing.
- User pays for a won auction and tracks shipment.
- Seller creates a listing, sets auction terms, and manages offers.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Discovery and categories | Query, watch history | Personalized, empty | No results |
| Listing Detail | Auction or fixed-price sale | Bid, offer, quantity | Active, ended | Reserve unmet |
| Bid Sheet | Quick bid action | Amount, max bid | Valid, invalid | Stale auction |
| Watchlist | Saved auctions | List, alerts | Active, empty | Listing ended |
| Orders | Purchase and shipment | Order list | Active, complete | Dispute open |

## Functional Requirements
- Support auction countdowns, bid increments, buy-now listings, and offers.
- Persist watchlist, bids, saved searches, and seller follows.
- Support seller listing creation with categories, shipping terms, and return policy.
- Track orders, returns, disputes, and delivery confirmation.
- Provide trust signals and listing history, but keep ranking configurable.

## Data Model
- User, Listing, Bid, Offer, WatchlistItem, Order, Shipment, SellerProfile, ReturnRequest, Dispute, SavedSearch, Category.
- Listing stores auction type, reserve price, bid increment, end time, and condition.
- Bid stores amount, bidder, max proxy amount, and status.

## API/Backend Contracts
- `GET /search`, `GET /listings/{id}`, `POST /bids`, `POST /offers`
- `POST /checkout`, `GET /orders/{id}`, `POST /returns`, `POST /disputes`
- `POST /seller/listings`, `PATCH /seller/listings/{id}`
- Use strict server-side bid validation and idempotency for checkout.

## Realtime/Push/Offline
- Push outbid, auction-ending, bid-won, offer, and shipment events.
- Cache watchlist and recent searches offline.
- Auction state must revalidate before accepting a bid.

## Permissions/Privacy/Safety
- Request location only for local pickup or search if configured.
- Protect bidder identity and payment tokens.
- Rate-limit fake bids, seller fraud, and offer abuse.
- Clearly label auction terms and buyer-protection rules.

## Analytics Events
- `view_listing`, `add_watchlist`, `place_bid`, `outbid_notice`, `buy_now`, `offer_sent`, `auction_won`, `dispute_started`

## Monetization
- Revenue comes from marketplace fees, promoted listings, seller subscriptions, and payment processing.
- Fee schedules must be server-configurable.

## Acceptance Tests
- Bid validation rejects stale or under-minimum bids.
- Watchlist notifications trigger on outbid and ending soon.
- Buy-now converts immediately without auction state leakage.
- Dispute flow preserves order and bid history.
- Offline watchlist remains viewable but bidding is disabled.

## Implementation Notes
- Keep auction engine deterministic and server-authoritative.
- Separate buyer and seller dashboards cleanly.
- Use original badges and listing artwork only.
- Mark bid increment, reserve, and dispute policies that need live verification.
