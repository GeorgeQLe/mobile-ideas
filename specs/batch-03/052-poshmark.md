# Social Resale Clone Spec

## Legal Scope
- Clone objective: reproduce closet listings, offers, bundles, social feed, shipping labels, and seller stats.
- Must not copy: brand marks, fashion photos, proprietary seller badges, or community event names.
- Original replacement brand/assets: use neutral resale branding and original fashion placeholders.

## Product Goal
- Let users list apparel quickly, negotiate offers, build bundles, and ship with minimal friction.
- Preserve the major paths: closet, feed, listing detail, offers, bundles, orders, and seller dashboard.
- Verify commission, offer expiry, and shipping-label rules from lawful research.

## Research Verification Checklist
- [ ] Confirm closet feed layout and social activity surfaces.
- [ ] Verify offer flow, bundle composition, and counteroffer states.
- [ ] Verify shipping label purchase and order progress screens.
- [ ] Verify seller stats, shares, and closet-share behavior.
- [ ] Verify notifications for offers, sales, and shipment milestones.

## Core User Journeys
- Seller creates a listing from photos and item details.
- Buyer follows a seller, likes items, and places an offer.
- Buyer bundles multiple items and checks out.
- Seller accepts an offer, prints a label, and marks shipped.
- User browses social feed and shares a closet item.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Closet | Seller inventory | Photos, size, price | Active, draft | No listings |
| Feed | Social discovery | Follows, trends | Active, empty | Hidden item |
| Listing Detail | Buy or offer | Offer, bundle | Available, sold | Counteroffer open |
| Orders | Sale and shipping | Order list | Pending, shipped | Lost label |
| Stats | Seller performance | Sales, balance | Populated, empty | Payout hold |

## Functional Requirements
- Support photo-first listing creation with size, brand, condition, and price.
- Support offers, counteroffers, bundle discounts, and timed expiration.
- Persist closet, follows, likes, offers, and shipment state.
- Provide seller shipping label purchase and balance tracking.
- Support comments or shares as optional social actions if enabled by config.

## Data Model
- User, ClosetItem, Offer, Bundle, Order, Shipment, SellerStats, Like, Follow, ShippingLabel, PayoutBalance, Comment.
- ClosetItem stores condition, category, size, and photo set.
- Offer stores amount, expiration, and response state.

## API/Backend Contracts
- `POST /closet/items`, `GET /closet`, `GET /feed`
- `POST /offers`, `POST /bundles`, `POST /checkout`
- `GET /orders`, `POST /shipping-labels`, `GET /stats`
- Use idempotency for offer acceptance and shipping label purchase.

## Realtime/Push/Offline
- Push offer received, offer accepted, sale completed, and shipment updates.
- Cache feed and closet inventory offline in read-only mode.
- Draft listings should survive app restarts.

## Permissions/Privacy/Safety
- Request photo access only for listing creation.
- Protect payout and shipping data.
- Rate-limit spam offers, counterfeit listings, and off-platform selling attempts.
- Show clear seller-fee and shipping disclosures.

## Analytics Events
- `create_listing`, `view_feed`, `like_item`, `send_offer`, `counteroffer`, `bundle_start`, `sale_complete`, `label_purchased`

## Monetization
- Revenue comes from transaction fees, shipping label margins, seller tools, and promoted closets.
- Fee logic must be server-configurable.

## Acceptance Tests
- Offer expiry prevents late acceptance.
- Bundle checkout recalculates shipping and seller totals.
- Shipping label purchase ties to the correct order atomically.
- Draft listing survives process death and returns intact.
- Offline feed remains viewable but cannot accept offers.

## Implementation Notes
- Separate seller inventory from social feed presentation.
- Use original fashion copy and placeholder imagery only.
- Keep payout and offer logic auditable.
- Mark shipping, fee, and community rules that need live verification.
