# Shopping Hub Clone Spec

## Legal Scope
- Clone objective: reproduce package tracking, merchant follow, order aggregation, and shopping feed flow.
- Must not copy: brand marks, shipping carrier marks, merchant content, or proprietary purchase history data.
- Original replacement brand/assets: use neutral commerce branding and synthetic order content.

## Product Goal
- Give users a single place to track deliveries, revisit purchases, and discover merchants.
- Preserve the main surfaces: home, orders, tracking detail, merchant feed, wallet identity, and settings.
- Verify merchant follow, tracking polling, and order aggregation rules from lawful observation.

## Research Verification Checklist
- [ ] Confirm order aggregation layout and shipment status presentation.
- [ ] Verify merchant follow, package tracking, and notification behavior.
- [ ] Verify order history grouping, receipts, and delivery exception states.
- [ ] Verify address-book, payment, and account switching behavior.
- [ ] Verify push categories for shipment and merchant updates.

## Core User Journeys
- User links an email or order source and sees all deliveries in one view.
- User tracks a package and checks estimated delivery.
- User follows a merchant for future shopping updates.
- User reviews order history and opens a receipt.
- User updates delivery and account preferences.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Orders and merchant feed | Linked accounts, orders | Active, empty | Sync failed |
| Tracking Detail | Package status | Tracking number, carrier | In transit, delivered | Carrier mismatch |
| Merchant Feed | Followed stores | Follows, promos | Populated, empty | Merchant paused |
| Order History | Receipts and past orders | History list | Active, archived | Missing receipt |
| Settings | Identity and privacy | Accounts, alerts | Configured, restricted | Unlinked source |

## Functional Requirements
- Aggregate orders from linked sources when the feature is enabled.
- Track shipments with a normalized status model.
- Persist followed merchants, recent orders, and saved addresses.
- Allow receipt detail access and reorder shortcuts.
- Support notification preferences and account management.

## Data Model
- User, LinkedSource, Order, Shipment, TrackingEvent, MerchantFollow, Receipt, Address, PaymentToken, NotificationSetting.
- Order stores merchant, subtotal, shipping, and imported metadata.
- TrackingEvent stores carrier state, timestamp, and raw source payload.

## API/Backend Contracts
- `POST /linked-sources`, `GET /orders`, `GET /orders/{id}`
- `GET /tracking/{id}`, `POST /merchant-follows`, `GET /merchant-feed`
- `GET /receipts/{id}`, `PATCH /me/settings`
- Use background sync and idempotent source import jobs.

## Realtime/Push/Offline
- Push shipped, out-for-delivery, delivered, and exception events.
- Cache order history and merchant feed offline.
- Revalidate tracking state when reconnecting.

## Permissions/Privacy/Safety
- Request email or account linking only when the user opts in.
- Protect imported order metadata and receipt data.
- Rate-limit source-import abuse and merchant-follow spam.
- Expose clear privacy controls for linked stores and receipts.

## Analytics Events
- `link_source`, `view_home`, `view_tracking`, `merchant_follow`, `open_receipt`, `change_setting`, `delivery_delivered`

## Monetization
- Revenue comes from referral commerce, promoted merchant placement, and premium delivery tools.
- Merchant promotions must be labeled.

## Acceptance Tests
- Orders aggregate from linked sources without duplicating duplicates.
- Tracking status updates from carrier polling.
- Merchant follow appears in the feed and settings.
- Receipt pages open from order history.
- Offline mode shows cached history only.

## Implementation Notes
- Separate imported order data from native order tracking.
- Build source connectors as adapters so new merchants can be added later.
- Use synthetic order history data in development.
- Mark import, tracking, and privacy details that need live verification.
