# DoorDash-Style Clone Spec

## Legal Scope
- Clone objective: restaurant marketplace with browsing, cart, checkout, dispatch tracking, handoff, support, and reorder.
- Must not copy: brand assets, merchant agreements, proprietary dispatch logic, or copyrighted menu media.
- Original replacement brand: independent food delivery brand and original product copy.

## Product Goal
- Let users browse restaurants, customize items, pay, and track delivery in real time.
- Support reorder and support flows as first-class actions.
- Preserve a clean split between merchant, courier, and customer states.

## Research Verification Checklist
- Verify menu browsing, fees, restaurant page layout, and reorder placement.
- Verify delivery tracking, pickup handoff, and support issue categories.
- Verify whether grocery or convenience storefronts are in scope.
- Verification status: pending research.

## Core User Journeys
- Browse nearby restaurants, select items, and build a cart.
- Customize modifiers, check out, and track the order.
- Reorder from history and contact support for a failed delivery.
- Receive status updates from merchant acceptance through handoff.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Browse options | address, search | loaded, empty | location wrong |
| Restaurant | Menu and details | item, favorite | open, closed | sold out |
| Cart | Checkout prep | modifiers, tip | ready, invalid | item unavailable |
| Tracking | Live order state | support, contact | preparing, en route | courier delay |
| Order History | Reorder and receipts | reorder, review | populated, empty | partial refund |
| Support | Problem resolution | refund, missing item | open, closed | stale order |
| Merchant Chat | Delivery questions | text, canned reply | active | no response |

## Functional Requirements
- Restaurant discovery by cuisine, rating, price, distance, and open now.
- Cart supports modifier groups, item notes, fees, tips, and promos.
- Live order tracking with merchant prep, courier pickup, and delivery milestones.
- Reorder, refund, and issue escalation.

## Data Model
- Merchant, MenuSection, MenuItem, ModifierGroup, Cart, Order, Delivery, Courier, Promo, SupportCase.
- Order stores status history, fees, tips, and handoff timestamps.
- Delivery stores courier position and ETA updates.

## API/Backend Contracts
- Auth: customer account plus payment token.
- Reads: `/restaurants`, `/menus`, `/orders`, `/history`, `/promos`, `/support`.
- Writes: add to cart, place order, reorder, update tip, message support, submit issue.
- Realtime: order status, courier GPS, merchant acceptance, and support responses.

## Realtime/Push/Offline
- Push on order accepted, courier assigned, near-arrival, and delivery completed.
- Cache restaurant history, favorites, and recent orders offline.
- Allow cart editing offline but require connectivity for final payment.

## Permissions/Privacy/Safety
- Request location and notifications only when browsing nearby or tracking an order.
- Protect payment data and redact customer details from courier views where possible.
- Include issue reporting for missing items, cold food, and delivery disputes.

## Analytics Events
- `restaurant_opened`, `item_added`, `cart_viewed`, `order_placed`, `courier_assigned`, `order_delivered`, `reorder_selected`, `support_opened`.

## Monetization
- Merchant commission, delivery fees, and optional membership.
- Promotions must be labeled and auditable.

## Acceptance Tests
- Build a cart with modifiers and place an order.
- Track the order through courier assignment and delivery.
- Reorder a past meal and confirm item restoration.
- Submit a missing-item complaint and verify support state.

## Implementation Notes
- Make order state transitions explicit and server-owned.
- Model modifiers carefully because they drive pricing and kitchen handoff.
- Keep chat and support separate so merchant messaging does not leak into general support flows.

