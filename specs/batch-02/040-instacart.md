# Instacart-Style Clone Spec

## Legal Scope
- Clone objective: grocery delivery marketplace with store selection, item search, substitutions, shopper chat, checkout, delivery windows, and reorder lists.
- Must not copy: brand assets, retailer feeds, shopper policies, or proprietary catalog data.
- Original replacement brand: neutral grocery commerce identity and original content.

## Product Goal
- Help customers order groceries from a selected store and manage substitution preferences.
- Support shopper communication, slot selection, and repeat basket ordering.
- Keep inventory, availability, and fulfillment state clearly separated.

## Research Verification Checklist
- Verify store-first navigation, category browse, substitutions, and delivery-slot flow.
- Verify shopper chat behavior, order edits, and reorder list handling.
- Verify whether pickup, alcohol, or pharmacy add-ons are in scope.
- Verification status: pending lawful research.

## Core User Journeys
- Choose a store, browse aisles or search for items, and build a cart.
- Set substitution preferences and delivery window, then check out.
- Chat with the shopper, approve replacements, and receive the delivery.
- Reorder a past basket and edit quantities quickly.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Store Select | Choose retailer | location, filters | available, none | closed store |
| Catalog | Find items | search, categories | loaded, sparse | out of stock |
| Item Detail | Product options | qty, notes, substitute prefs | valid, invalid | limit exceeded |
| Cart | Checkout review | delivery slot, tip | ready, failed | substitution conflict |
| Shopper Chat | Replacement coordination | text, approve, reject | active, muted | no shopper reply |
| Order Track | Fulfillment status | contact, issue | picking, delivering | delay |
| Reorder | Repeat basket | add all, edit | populated, empty | store unavailable |

## Functional Requirements
- Store selection before item shopping where inventory is store-specific.
- Search and browse by category, brand, diet, and household goods type.
- Substitution preferences per item and per order.
- Checkout with delivery slot selection, fees, tips, and order tracking.

## Data Model
- Store, AisleCategory, Product, CartItem, Order, DeliverySlot, SubstitutionPreference, ShopperMessage, ReorderList, Receipt.
- Order stores store ID, substitution policy, picker state, and delivery state.
- Product data must keep pack size, unit price, and availability status.

## API/Backend Contracts
- Auth: customer session plus payment method and address book.
- Reads: `/stores`, `/catalog`, `/items/{id}`, `/cart`, `/orders`, `/reorders`, `/delivery-slots`.
- Writes: add item, set substitute preference, place order, message shopper, approve replacement, reorder.
- Realtime: shopper updates, inventory changes, order status, and delivery tracking.

## Realtime/Push/Offline
- Push on shopper questions, item replacements, slot reminders, and delivery progress.
- Cache recent stores and reorder lists offline.
- Cart edits can queue offline, but final checkout requires fresh inventory and slot validation.

## Permissions/Privacy/Safety
- Request location and notifications only when choosing a nearby store or tracking delivery.
- Protect address, phone, and payment data.
- Provide substitution, missing-item, and shopper conduct reporting.

## Analytics Events
- `store_selected`, `item_searched`, `item_added`, `substitution_set`, `checkout_started`, `order_placed`, `shopper_messaged`, `order_completed`, `reorder_used`.

## Monetization
- Delivery fees, service fees, and optional membership perks.
- Retailer promotions must be labeled and auditable.

## Acceptance Tests
- Select a store, add items, set substitution preferences, and place an order.
- Receive a shopper question and approve a replacement.
- Reorder a previous basket and confirm the store-specific catalog is used.
- Track an order through picking and delivery completion.

## Implementation Notes
- Store-specific inventory should be treated as the source of truth.
- Build shopper messaging as a fulfillment workflow, not a general chat system.
- Test substitution logic carefully because it drives user trust and order accuracy.

