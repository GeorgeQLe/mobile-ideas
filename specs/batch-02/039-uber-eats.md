# Uber Eats-Style Clone Spec

## Legal Scope
- Clone objective: restaurant and pickup marketplace with menu browsing, modifiers, promos, tracking, and membership perks.
- Must not copy: Uber branding, merchant catalogs, or dispatch trade secrets.
- Original replacement brand: independent food ordering brand with owned visuals and copy.

## Product Goal
- Offer a quick order flow for delivery or pickup with a strong discovery layer.
- Let users browse restaurants, customize food, and track fulfillment.
- Include subscription benefits only if they are separately defined and lawful.

## Research Verification Checklist
- Verify delivery/pickup mode selector, restaurant ranking, and promo placement.
- Verify membership surface, reorder behavior, and item customization depth.
- Verify whether grocery or alcohol categories are in scope.
- Verification status: not yet researched.

## Core User Journeys
- Choose delivery or pickup, browse restaurants, and add items to cart.
- Modify item options, apply promo codes, and place an order.
- Track the order and access receipt/support actions.
- Reorder a previous basket with minimal taps.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Mode and discovery | delivery, pickup, search | loaded, empty | address missing |
| Restaurant | Menu browsing | item, promo | open, closed | sold out |
| Item Detail | Customization | size, add-ons, notes | valid, invalid | modifier conflict |
| Cart | Checkout review | tip, schedule, apply code | ready, failed | promo rejected |
| Tracking | Order status | help, contact | active, complete | courier delay |
| Membership | Perk management | subscribe, cancel | active, expired | billing issue |
| History | Past orders | reorder, review | populated | stale merchant |

## Functional Requirements
- Search and sort restaurants by distance, rating, delivery time, and price.
- Support item modifiers, special instructions, promo codes, tipping, and scheduled orders.
- Live delivery tracking and pickup order state.
- Membership perks can alter fees, discounts, or delivery minimums.

## Data Model
- Restaurant, MenuItem, ModifierGroup, Cart, Order, Delivery, Promo, Membership, Receipt, SupportCase.
- Order stores mode, fulfillment type, fee breakdown, and state history.
- Membership stores benefits and billing interval.

## API/Backend Contracts
- Auth: customer session with payment token and membership status.
- Reads: `/restaurants`, `/menus`, `/orders`, `/history`, `/membership`, `/promos`.
- Writes: add to cart, place order, reorder, apply promo, manage membership, open support case.
- Realtime: order milestone updates, courier tracking, and membership entitlement refresh.

## Realtime/Push/Offline
- Push on acceptance, courier assignment, near-arrival, and order completion.
- Cache recent orders, favorites, and restaurant history.
- Allow browsing offline but require connectivity for checkout and tracking.

## Permissions/Privacy/Safety
- Request location and notifications only when needed.
- Protect payment data and keep order notes visible only to the right fulfillment parties.
- Include issue reporting for missing items, wrong orders, and unsafe merchant behavior.

## Analytics Events
- `mode_selected`, `restaurant_opened`, `item_added`, `promo_applied`, `order_placed`, `order_delivered`, `reorder_used`, `membership_opened`.

## Monetization
- Delivery fees, merchant commission, and membership upsell.
- Promo mechanics must be transparent and reversible in logs.

## Acceptance Tests
- Place both delivery and pickup orders from the same restaurant.
- Apply a promo and confirm pricing recalculates correctly.
- Reorder a previous order and verify modifiers restore.
- Open tracking and confirm state changes arrive in real time.

## Implementation Notes
- Keep pickup and delivery as separate fulfillment subtypes so state logic stays readable.
- Build promo validation server-side to avoid client abuse.
- Reuse the same restaurant/menu model as other food-delivery surfaces.

