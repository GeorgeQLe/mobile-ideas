# Fast Food Deals Clone Spec

## Legal Scope
- Clone objective: reproduce deal discovery, order-ahead, store locator, curbside, and rewards redemption flows.
- Must not copy: golden arches branding, mascot imagery, trademarked menu names, or campaign creative.
- Original replacement brand/assets: use neutral fast-food branding, original photography, and campaign placeholders.

## Product Goal
- Let a customer find a nearby restaurant, redeem a deal, place a mobile order, and pick up with clear status updates.
- Support coupon-led conversions, reorder shortcuts, and restaurant-specific service modes.
- Verify exact menu composition, order timings, and deal mechanics from lawful observation before implementation.

## Research Verification Checklist
- [ ] Confirm tab layout, home modules, and deal entry points.
- [ ] Verify curbside, dining room, and pickup service-mode behavior.
- [ ] Verify rewards accrual, redemptions, and expiring offer presentation.
- [ ] Verify guest ordering, app account linking, and payment persistence.
- [ ] Verify notifications for pickup readiness, deal expiration, and store closure.

## Core User Journeys
- User opens app, sees featured deals, and starts an order from a restaurant card.
- User chooses a location, applies an offer, and schedules pickup.
- User reorders a previous meal with saved customizations.
- User tracks order status and confirms arrival for curbside pickup.
- User checks reward points, offers, and receipt history.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Surface deals and shortcuts | Location, promo, reorder | Personalized, guest | No stores nearby |
| Restaurant Detail | Menu and fulfillment info | Store, service mode | Open, closed, busy | Menu paused |
| Cart | Review items and offers | Items, notes, pickup mode | Valid, invalid | Coupon conflict |
| Rewards | Points and available offers | Balance, redeemed items | Active, locked | Expired reward |
| Order Status | Progress and arrival actions | ETA, arrival note | Preparing, ready | Cancelled/refunded |

## Functional Requirements
- Support guest browse with account-required checkout.
- Support menu item modifiers, combo meals, add-ons, and store-specific availability.
- Persist favorite restaurants, last orders, and saved payment methods.
- Allow service modes such as pickup, curbside, dine-in, and delivery if enabled.
- Calculate tax, fees, discounts, reward usage, and points earned server-side.

## Data Model
- User, Restaurant, MenuSection, MenuItem, Combo, ModifierGroup, Cart, Order, Offer, RewardWallet, PaymentMethod, ServiceMode, Receipt.
- Order stores service mode, scheduled time, restaurant location, and arrival metadata.
- Offer stores eligibility rules, redemption limits, and expiration windows.
- RewardWallet stores points, available redemptions, and transaction history.

## API/Backend Contracts
- `GET /home`, `GET /restaurants?near=`, `GET /restaurants/{id}`
- `GET /restaurants/{id}/menu`, `POST /cart/validate`, `POST /orders`
- `GET /orders/{id}`, `POST /orders/{id}/arrival`, `GET /offers`
- `POST /rewards/redeem`, `GET /wallet/history`
- Require idempotency for payment and reward mutations.

## Realtime/Push/Offline
- Push order accepted, in progress, ready, and cancellation events.
- Cache deals, favorites, recent orders, and restaurant metadata offline for browse-only mode.
- Show stale-data banners when store hours or menu data may have changed.

## Permissions/Privacy/Safety
- Request location only for nearby stores and map routing.
- Do not expose full card numbers or sensitive identifiers in receipts.
- Rate-limit offer redemptions, promo code attempts, and order retries.
- Provide clear cancellation and refund state messaging.

## Analytics Events
- `view_home`, `tap_deal`, `view_restaurant`, `add_combo`, `apply_offer`, `submit_order`, `mark_arrived`, `order_ready`, `reward_view`

## Monetization
- Primary revenue is food sales and promoted deal placements.
- Loyalty and featured placements are configurable server-side by market.

## Acceptance Tests
- Order cannot submit if a selected item is out of stock.
- Scheduled pickup respects restaurant lead time and closure windows.
- Curbside arrival action updates order state without duplicating payment.
- Expired offers cannot be redeemed.
- Offline browse still renders cached restaurants and deals.

## Implementation Notes
- Keep restaurant and campaign content data-driven so the same UI can power multiple regions.
- Separate deal eligibility from cart validation to avoid duplicate rule logic.
- Use generic menu seeding and original service labels only.
- Mark menu, pricing, and rewards rules that still need live verification.
