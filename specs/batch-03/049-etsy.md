# Handmade Marketplace Clone Spec

## Legal Scope
- Clone objective: reproduce shop discovery, item detail, favorites, custom order inquiry, cart, and seller messaging flows.
- Must not copy: seller branding, craft photography, marketplace copy, or proprietary trust signals.
- Original replacement brand/assets: use neutral artisan branding and original placeholder imagery.

## Product Goal
- Enable buyers to discover unique items, message sellers, place custom orders, and manage shipping.
- Preserve the marketplace structure: home, search, shop page, product detail, favorites, checkout, and messaging.
- Verify custom-order, made-to-order, and shipping-rule behaviors from lawful research.

## Research Verification Checklist
- [ ] Confirm shop page layout, search filters, and favorites behavior.
- [ ] Verify custom order inquiry flow and seller reply surfaces.
- [ ] Verify coupon, shipping, and tax presentation.
- [ ] Verify review, rating, and photo upload behavior.
- [ ] Verify notification types for order updates and message replies.

## Core User Journeys
- User searches for an item and opens a seller shop page.
- User favorites an item or shop and saves it for later.
- User requests a custom variation before buying.
- User checks out, tracks shipping, and leaves a review.
- Seller manages listings, responds to messages, and updates inventory.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Discovery feed | Interests, tags | Personalized, empty | Slow media load |
| Shop Page | Seller storefront | Seller, categories | Open, vacation mode | Listing suspended |
| Product Detail | Item and customization | Options, quantity | Available, made-to-order | Custom request rejected |
| Favorites | Saved items and shops | Favorites list | Populated, empty | Item removed |
| Messages | Buyer-seller chat | Thread, attachments | Active, archived | Spam detected |

## Functional Requirements
- Support search by keywords, tags, price, shipping, and personalization options.
- Persist favorites, cart, order history, and shop follows.
- Support custom-order inquiry before purchase when the seller allows it.
- Allow seller messaging, order updates, and review responses.
- Support digital and physical goods using the same listing scaffold, but gated by config.

## Data Model
- User, Shop, Listing, Variant, Favorite, Cart, Order, MessageThread, Message, Review, CustomRequest, ShippingProfile, Promotion.
- Listing stores handmade/made-to-order flags, personalization fields, and dispatch timing.
- MessageThread stores state, participants, and order linkage.

## API/Backend Contracts
- `GET /search`, `GET /shops/{id}`, `GET /listings/{id}`, `POST /favorites`
- `POST /messages`, `GET /threads`, `POST /checkout`, `POST /custom-requests`
- `GET /orders`, `POST /reviews`
- Enforce idempotent checkout and shipping-label operations.

## Realtime/Push/Offline
- Push message replies, order updates, and shipment milestones.
- Cache favorites, recent searches, and previously viewed shops offline.
- Keep message drafts locally until connectivity returns.

## Permissions/Privacy/Safety
- Request photo access only for listing images or message attachments if needed.
- Protect address, payment, and direct-message content.
- Rate-limit spam listings, phishing messages, and off-platform diversion attempts.
- Surface clear seller policy text before checkout.

## Analytics Events
- `view_home`, `search_listing`, `view_shop`, `favorite_item`, `start_message`, `send_custom_request`, `checkout_complete`, `review_submitted`

## Monetization
- Revenue comes from listing fees, transaction commissions, promoted shop placements, and seller tools.
- Seller subscription features must be configurable by region.

## Acceptance Tests
- Custom-order inquiry is only available when seller config enables it.
- Favorites survive app restart and sync later.
- Message thread updates notify both buyer and seller.
- Checkout shows shipping and personalization costs before confirmation.
- Offline browse remains read-only and does not allow checkout.

## Implementation Notes
- Keep listing schema flexible for physical, digital, and custom-made goods.
- Originalize all shop badges, icons, and copy.
- Separate messaging moderation from order support.
- Mark shipping and customization rules that need live verification.
