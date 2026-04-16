# Fashion Catalog Clone Spec

## Legal Scope
- Clone objective: reproduce catalog browsing, fashion filters, product detail, review photos, wishlist, and promotion flows.
- Must not copy: brand assets, model photos, proprietary trend copy, or vendor content.
- Original replacement brand/assets: use neutral fashion branding and original or synthetic imagery.

## Product Goal
- Deliver a fast, visually dense fashion shopping experience optimized for discovery and conversion.
- Preserve the main shopping loop: feed, category browse, product detail, cart, checkout, and order tracking.
- Verify size charts, discount rules, and review-photo behavior before implementation.

## Research Verification Checklist
- [ ] Confirm feed density, categories, and search/filter interactions.
- [ ] Verify size selection, variant pricing, and shipping estimates.
- [ ] Verify review photo presentation, wishlist behavior, and coupon application.
- [ ] Verify post-purchase notifications and return entry points.
- [ ] Verify language, currency, and regional merchandising rules.

## Core User Journeys
- User scrolls a trend-heavy feed and opens a product detail page.
- User filters by size, color, price, and style.
- User adds items to a wishlist and later checks out.
- User reviews size fit and photo evidence after delivery.
- User tracks the order and starts a return if needed.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Feed | Discovery and trends | Interest, promo | Personalized, empty | Image failure |
| Search | Find apparel | Query, filters | Results, none | Many variants |
| Product Detail | Convert interest | Size, color | In stock, sold out | Size unavailable |
| Wishlist | Save for later | Saved items | Populated, empty | Price changed |
| Orders | Track delivery | Order history | Active, delivered | Return pending |

## Functional Requirements
- Support image-first product cards with rapid category switching.
- Track sizes, colors, inventory, and promotional pricing by variant.
- Persist wishlist, browse history, cart, and order history.
- Capture review photos and fit feedback after fulfillment.
- Support returns, refunds, and customer support states.

## Data Model
- User, Product, Variant, SizeChart, Review, ReviewPhoto, Wishlist, Cart, Order, Shipment, ReturnRequest, Promotion, Recommendation.
- Product stores style metadata, fit notes, and price snapshots.
- Review stores fit, quality, and photo attachments.

## API/Backend Contracts
- `GET /feed`, `GET /search`, `GET /products/{id}`, `POST /wishlist/items`
- `POST /cart/items`, `POST /checkout`, `GET /orders/{id}`, `POST /returns`
- `POST /reviews`, `GET /promotions`
- Enforce idempotent purchase and return operations.

## Realtime/Push/Offline
- Push order updates, refund status, and promotion expiration alerts.
- Cache wishlist, recent views, and order history offline.
- Revalidate price and inventory before checkout completes.

## Permissions/Privacy/Safety
- Request photo access only for review uploads or support evidence.
- Protect payment and address data.
- Rate-limit fake reviews, coupon abuse, and automated wishlist spam.
- Keep user fit feedback and order history private by default.

## Analytics Events
- `view_feed`, `search_style`, `view_product`, `add_to_wishlist`, `add_to_cart`, `checkout_complete`, `review_photo_uploaded`, `return_started`

## Monetization
- Revenue comes from merchandise sales, promoted catalog placements, and upsell placements.
- Discount mechanics should be server-configurable and auditable.

## Acceptance Tests
- Variant selection updates price and availability before cart add.
- Wishlist persists after app restart and syncs on reconnect.
- Review photo upload works only after order completion.
- Return flow preserves order history and refund timeline.
- Offline feed renders cached products without enabling stale checkout.

## Implementation Notes
- Keep fashion merchandising data-driven to support regional catalogs.
- Use original trend labels and synthetic model imagery.
- Separate search ranking from promotion placement.
- Mark sizing, return, and promotion details that need live verification.
