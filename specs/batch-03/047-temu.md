# Discount Marketplace Clone Spec

## Legal Scope
- Clone objective: reproduce low-price marketplace discovery, flash deals, cart incentives, order tracking, and referral loops.
- Must not copy: brand marks, campaign assets, proprietary game mechanics, or supplier artwork.
- Original replacement brand/assets: use original discount branding, generic promo cards, and synthetic catalog data.

## Product Goal
- Maximize browsing, conversion, and repeat visits through a deal-forward shopping experience.
- Preserve the high-level structure: home, feed, category browse, product detail, cart, orders, and offers.
- Verify coupon stacking, referral rules, and shipping threshold behavior before implementation.

## Research Verification Checklist
- [ ] Confirm deal-first home modules and promo entry points.
- [ ] Verify limited-time offer timers and cart incentive presentation.
- [ ] Verify referral, coupon, and bonus-credit eligibility rules.
- [ ] Verify shipping estimate display and order milestone notifications.
- [ ] Verify product review, size, and variant interaction patterns.

## Core User Journeys
- User opens the app and scrolls a deal-heavy feed.
- User taps a product, chooses size or variant, and adds it to cart.
- User applies credits or coupons and completes checkout.
- User tracks orders and waits for delivery updates.
- User shares a referral link and earns promo credit after qualification.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Deals and recommendations | Categories, promo | Personalized, empty | Slow image load |
| Product Detail | Conversion support | Variant, quantity | Sale, sold out | Timer expired |
| Cart | Incentive stacking | Coupons, credits | Valid, invalid | Conflicting promos |
| Orders | Delivery tracking | Order list | Active, complete | Carrier delay |
| Rewards/Invites | Referral loop | Link, balance | Eligible, pending | Fraud hold |

## Functional Requirements
- Support fast-scrolling content feed with categorized promotions.
- Model variant selection, size charts, promotions, and shipping estimates.
- Apply credits, coupons, and referral rewards with server-side validation.
- Persist carts, wishlists, recent views, and order tracking.
- Expose return, refund, and customer support entry points.

## Data Model
- User, Product, Variant, Promotion, CreditWallet, Cart, CartItem, Order, Shipment, Referral, Review, SupportTicket, Recommendation.
- Promotion stores eligibility, expiration, min spend, and stacking policy.
- Order stores discount breakdown, shipping method, and support history.

## API/Backend Contracts
- `GET /feed`, `GET /products/{id}`, `POST /cart/items`, `POST /cart/apply-promo`
- `POST /checkout`, `GET /orders/{id}`, `GET /orders`, `POST /referrals`
- `GET /promotions`, `GET /wallet`
- Use idempotency for checkout, promo redemption, and referral crediting.

## Realtime/Push/Offline
- Push shipment updates, promo expirations, and referral status changes.
- Cache feed cards and carts offline, but revalidate prices before purchase.
- Degrade image-heavy modules to text-first summaries when bandwidth is low.

## Permissions/Privacy/Safety
- Request location only for shipping estimate or local warehouse routing if configured.
- Protect payment data and referral identities.
- Rate-limit bonus-credit abuse, coupon brute force, and fake-account creation.
- Clearly label estimated delivery windows and incentive conditions.

## Analytics Events
- `view_feed`, `tap_promo`, `view_product`, `add_to_cart`, `apply_credit`, `checkout_complete`, `referral_share`, `order_tracked`

## Monetization
- Revenue comes from merchandise sales, sponsored placements, and checkout upsells.
- Promo economics must be configurable by region and seller.

## Acceptance Tests
- Promo stacking obeys server policy and cannot be bypassed in the client.
- Cart totals refresh after coupon application.
- Referral credit remains pending until qualification is complete.
- Offline feed shows cached content without allowing stale checkout.
- Order tracking updates when the backend changes shipment status.

## Implementation Notes
- Use original, non-brand promo copy and synthetic sale labels.
- Separate feed personalization from offer eligibility.
- Keep all pricing and incentives server-driven.
- Mark referral, shipping, and promotion rules that need live verification.
