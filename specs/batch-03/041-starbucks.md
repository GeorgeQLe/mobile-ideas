# Coffee Rewards Clone Spec

## Legal Scope
- Clone objective: reproduce the ordering, pickup, rewards, stored payment, and offer redemption flows of a coffee loyalty app.
- Must not copy: brand marks, store names, proprietary menu text, photography, reward terms, or partner integrations.
- Original replacement brand/assets: use neutral coffee-shop branding, custom icons, and locally seeded menu imagery.

## Product Goal
- Enable a customer to find a nearby cafe, customize an order, pay, earn points, and pick up with minimal friction.
- Preserve the information architecture: home, order, rewards, store finder, wallet, and account.
- Mark any menu, pricing, or loyalty-rule detail that still needs live verification from the real app.

## Research Verification Checklist
- [ ] Confirm onboarding and guest checkout behavior from lawful app observation.
- [ ] Verify primary tabs, rewards dashboard composition, and offer redemption states.
- [ ] Verify pickup timing, item modifier rules, and store availability edge cases.
- [ ] Verify saved payment methods, tipping, and receipt history surfaces.
- [ ] Verify push notification types for order progress, offers, and reward milestones.

## Core User Journeys
- New user creates account, selects store, and adds a saved payment method.
- Returning user opens home, reorders a favorite, and checks reward balance.
- User customizes a drink, selects pickup time, and places the order.
- User browses offers, applies a coupon, and confirms points earned.
- User checks order status, pickup code, and receipt.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Quick access to reorder and offers | Store, favorites, promos | Personalized, guest, empty | No nearby stores |
| Menu | Browse items and categories | Category, item, modifiers | In stock, sold out | Item unavailable at store |
| Cart | Review build and payment | Quantity, tip, pickup time | Valid, invalid, pending | Minimum order not met |
| Rewards | Track points and offers | Balance, reward list | Active, expired, locked | Tier downgrade |
| Store Finder | Choose pickup location | Search, map, filters | Open, closed, busy | Permission denied |

## Functional Requirements
- Support guest browsing, but require sign-in for checkout and rewards.
- Persist favorite stores, favorite items, recent orders, and offer redemptions.
- Support item customization with size, temperature, milk, add-ons, and notes.
- Enforce store-level availability, lead time, and cutoff windows at checkout.
- Render receipts with line items, tax, fees, discounts, points earned, and pickup instructions.

## Data Model
- User, Store, MenuCategory, MenuItem, ModifierGroup, ModifierOption, Cart, Order, OrderLine, Offer, RewardAccount, PaymentMethod, Receipt.
- OrderLine stores selected modifiers, quantity, and price snapshot at checkout.
- RewardAccount tracks points balance, tier, and offer redemption history.
- Store records hours, distance, fulfillment modes, and device-local favorites.

## API/Backend Contracts
- `POST /auth/session`, `GET /me`, `PATCH /me/preferences`
- `GET /stores?near=`, `GET /stores/{id}/menu`, `GET /offers`
- `POST /cart/validate`, `POST /orders`, `GET /orders/{id}`, `GET /receipts/{id}`
- `POST /wallet/payment-methods`, `POST /rewards/redeem`
- Use idempotency keys for checkout and reward redemption.

## Realtime/Push/Offline
- Push order status transitions, offer expiring soon, and points posted events.
- Poll or subscribe for order progress if push is unavailable.
- Cache last viewed store, favorites, recent menu, and receipts for offline read-only access.

## Permissions/Privacy/Safety
- Request location only for nearby store lookup and default to manual search if denied.
- Protect saved cards with OS secure storage and server-side tokenization.
- Avoid collecting unnecessary health or demographic data.
- Rate-limit reward abuse, duplicate checkout attempts, and coupon brute force.

## Analytics Events
- `view_home`, `search_store`, `view_menu_item`, `add_to_cart`, `apply_offer`, `checkout_submit`, `order_confirmed`, `reward_points_posted`, `order_picked_up`

## Monetization
- Revenue comes from order value, featured offers, and optional subscription-style loyalty perks.
- Keep pricing rules server-driven so the app can be configured per market.

## Acceptance Tests
- Guest can browse menu but not submit an order.
- Order validation blocks unavailable modifiers and closed-store pickup windows.
- Rewards redemption updates balance and receipt history atomically.
- Offline mode still shows cached favorites and receipts.
- Accessibility labels cover menu controls, cart totals, and pickup actions.

## Implementation Notes
- Seed a realistic cafe menu, but keep item names generic and legally safe.
- Treat store hours and fulfillment windows as configuration data, not hardcoded UI logic.
- Build cart validation as a shared service used by both mobile and admin tools.
- Mark all real-world menu, loyalty, and pricing rules as needing live verification.
