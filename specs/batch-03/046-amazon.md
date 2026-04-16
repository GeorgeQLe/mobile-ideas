# General Commerce Clone Spec

## Legal Scope
- Clone objective: reproduce search, product detail, cart, checkout, orders, reviews, returns, and recommendations.
- Must not copy: trademarked logos, retail brand assets, proprietary rankings, or copyrighted product media.
- Original replacement brand/assets: use neutral commerce branding, original icons, and synthetic catalog data.

## Product Goal
- Provide a high-volume shopping flow with fast search, confident product comparison, and reliable order management.
- Preserve core surfaces: home, search, product detail, cart, checkout, orders, account, and support.
- Verify promotions, recommendation placement, and return-policy details from lawful research.

## Research Verification Checklist
- [ ] Confirm home modules, search facets, and recommendation surfaces.
- [ ] Verify cart behavior, checkout steps, and address selection.
- [ ] Verify order tracking, cancellation windows, and returns entry points.
- [ ] Verify ratings, reviews, wishlists, and seller attribution.
- [ ] Verify push and email notification categories.

## Core User Journeys
- User searches for a product, compares listings, and opens a product page.
- User adds one or more items to cart and checks out.
- User tracks shipment, initiates a return, or reorders.
- User saves items to a wishlist and reviews recommendations.
- Seller or admin updates catalog and fulfillment state.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Search and recommendations | Query, categories | Personalized, empty | Slow feed load |
| Search | Find items | Facets, keywords | Results, none | Duplicate products |
| Product Detail | Decision support | Variant, quantity | In stock, backorder | Price changed |
| Cart/Checkout | Purchase flow | Address, payment | Valid, invalid | Shipping unavailable |
| Orders | Tracking and support | Order list | Active, delivered | Lost package |

## Functional Requirements
- Support keyword search, faceted filtering, sort, and category browse.
- Model variants, inventory, shipping promises, and seller identity.
- Support cart persistence, checkout, address book, and payment tokenization.
- Store order history, shipment tracking, returns, refunds, and help requests.
- Support ratings, reviews, wishlists, and buy-again shortcuts.

## Data Model
- User, Address, Product, Variant, Seller, Cart, CartItem, Order, OrderItem, Shipment, Review, Wishlist, ReturnRequest, Recommendation.
- Product stores attributes, images, price history snapshot, and fulfillment flags.
- Order stores payment status, tax, shipping, delivery promise, and support state.

## API/Backend Contracts
- `GET /search?q=`, `GET /products/{id}`, `POST /cart/items`, `POST /checkout`
- `GET /orders`, `GET /orders/{id}`, `POST /returns`, `POST /reviews`
- `GET /wishlists`, `POST /wishlists/{id}/items`, `GET /recommendations`
- Use idempotency keys for checkout and returns.

## Realtime/Push/Offline
- Push shipment updates, refund status, delivery exceptions, and price-drop alerts.
- Cache cart, wishlist, and recent orders offline.
- Allow read-only order status when the network drops after checkout.

## Permissions/Privacy/Safety
- Request location only for delivery estimate or nearby pickup mode.
- Protect payment tokens, address data, and support transcripts.
- Rate-limit review spam, coupon abuse, and checkout retries.
- Flag high-risk accounts for fraud review and additional verification.

## Analytics Events
- `search_product`, `view_product`, `add_to_cart`, `checkout_start`, `purchase_complete`, `refund_requested`, `review_submitted`, `wishlist_add`

## Monetization
- Revenue comes from product sales, marketplace commissions, sponsored placements, and subscription perks.
- Ads and recommendations must be labeled per market rules.

## Acceptance Tests
- Checkout fails gracefully when inventory changes after cart validation.
- Order tracking shows a stale state banner if shipment data lags.
- Return request creates a support record and refund timeline.
- Wishlist content persists offline and syncs on reconnect.
- Search facets update result counts without duplicating products.

## Implementation Notes
- Build search and pricing as backend services with snapshotting for checkout correctness.
- Keep recommendation inputs configurable and auditable.
- Use synthetic catalog data for development and test coverage.
- Mark fulfillment, return-policy, and ranking behavior that needs live verification.
