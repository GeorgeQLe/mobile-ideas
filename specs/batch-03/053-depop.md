# Social Resale Feed Clone Spec

## Legal Scope
- Clone objective: reproduce image-first resale browsing, following, likes, offers, chat, and purchase flow.
- Must not copy: brand marks, creator photos, trademarks, or proprietary trend labels.
- Original replacement brand/assets: use neutral resale branding and original product imagery.

## Product Goal
- Encourage discovery through a social feed while still supporting fast checkout and seller communication.
- Preserve the core surfaces: feed, search, listing detail, profile, chat, likes, and orders.
- Verify ranking, offer, and moderation behavior from lawful observation before implementation.

## Research Verification Checklist
- [ ] Confirm feed density, profile layout, and follow interactions.
- [ ] Verify offer and chat entry points from listing detail.
- [ ] Verify seller shipping, order status, and refund paths.
- [ ] Verify moderation, reporting, and blocked-content behavior.
- [ ] Verify notification types for likes, followers, and message replies.

## Core User Journeys
- User scrolls feed and opens a styled listing.
- User follows a seller and likes an item.
- User sends an offer and negotiates in chat.
- User buys an item and tracks shipment.
- Seller posts, updates, or removes a listing.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Feed | Social discovery | Follows, trends | Active, empty | Repeated content |
| Profile | Seller identity | Listings, followers | Active, private | No items |
| Listing Detail | Purchase or offer | Offer, quantity | Available, sold | Counteroffer open |
| Chat | Negotiation thread | Message, attachments | Active, muted | Spam blocked |
| Orders | Fulfillment status | Order list | Pending, shipped | Refund pending |

## Functional Requirements
- Support follow graph, likes, comments, and image-first listing cards.
- Persist browsing, likes, follows, offers, chat, and orders.
- Support offer negotiation and direct purchase.
- Allow sellers to manage listings, availability, and shipping updates.
- Provide moderation and reporting tools for risky content.

## Data Model
- User, Profile, Listing, Like, Follow, Offer, MessageThread, Message, Order, Shipment, Report, ModerationFlag.
- Listing stores title, size, condition, tags, and image set.
- Offer stores amount, state, and response history.

## API/Backend Contracts
- `GET /feed`, `GET /profiles/{id}`, `GET /listings/{id}`
- `POST /likes`, `POST /follows`, `POST /offers`, `POST /messages`
- `POST /checkout`, `GET /orders`, `POST /reports`
- Use idempotency for checkout and offer acceptance.

## Realtime/Push/Offline
- Push likes, follows, offer responses, and shipment updates.
- Cache feed and liked items offline in browse-only mode.
- Preserve message drafts locally.

## Permissions/Privacy/Safety
- Request photo access only for listing or chat attachments.
- Protect shipping and payment data.
- Rate-limit spam, impersonation, and counterfeit listing attempts.
- Expose moderation and block controls prominently.

## Analytics Events
- `view_feed`, `open_listing`, `follow_user`, `like_listing`, `send_offer`, `message_sent`, `checkout_complete`, `report_content`

## Monetization
- Revenue comes from transaction fees, promoted posts, and seller tools.
- Sponsored placement must be labeled.

## Acceptance Tests
- Feed can be scrolled with mixed listing and social content.
- Offer acceptance cannot happen twice.
- Chat threads retain unread state after reconnect.
- Moderation can hide flagged content without deleting the seller account.
- Offline mode still renders saved likes and follows.

## Implementation Notes
- Keep feed ranking configurable and auditable.
- Separate listing commerce from social identity.
- Use original typography and placeholder fashion imagery.
- Mark moderation and shipping detail that needs live verification.
