# Local Listings Clone Spec

## Legal Scope
- Clone objective: reproduce local listing browse, seller profiles, map radius, chat, saved searches, and fraud reporting flows.
- Must not copy: social network branding, profile data, marketplace photos, or proprietary ranking signals.
- Original replacement brand/assets: use neutral local-commerce branding and synthetic local listing data.

## Product Goal
- Let users discover nearby goods, message sellers, save searches, and complete handoff safely.
- Preserve the core surfaces: browse, search, map, listing detail, chat, saved searches, and reporting.
- Verify safety prompts, delivery handoff, and moderation signals from lawful observation.

## Research Verification Checklist
- [ ] Confirm browse tabs, radius filters, and category shortcuts.
- [ ] Verify chat entry points and seller-response states.
- [ ] Verify saved-search alerts and listing expiration behavior.
- [ ] Verify fraud report flow and blocked-user behavior.
- [ ] Verify pickup handoff guidance and safety prompts.

## Core User Journeys
- User searches by category and distance.
- User opens a listing, messages the seller, and negotiates pickup.
- User saves a search and gets alerts for new matches.
- User reports a suspicious listing or blocks a seller.
- Seller posts, edits, and marks a local listing sold.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Browse | Local feed | Category, distance | Active, empty | No nearby items |
| Listing Detail | Item and seller info | Listing, message | Open, sold | Duplicate listing |
| Chat | Buyer-seller conversation | Thread, attachment | Active, muted | Spam blocked |
| Saved Searches | Alerts and filters | Query, radius | Populated, empty | Too many alerts |
| Report | Safety actions | Reason, evidence | Submitted, rejected | False report |

## Functional Requirements
- Support local search, category browse, map radius, and saved searches.
- Persist favorites, chats, viewed listings, and alert subscriptions.
- Provide seller profiles, listing expiration, and sold-state handling.
- Allow in-app messaging without exposing private contact details by default.
- Support report, block, and moderation review flows.

## Data Model
- User, SellerProfile, Listing, MessageThread, Message, SavedSearch, AlertSubscription, Report, BlockList, LocationRadius.
- Listing stores local pickup preference, availability status, and expiration timestamp.
- MessageThread stores sale linkage, safety flags, and unread count.

## API/Backend Contracts
- `GET /browse`, `GET /listings/{id}`, `POST /messages`, `GET /threads`
- `POST /saved-searches`, `GET /saved-searches`, `POST /reports`, `POST /blocks`
- `POST /seller/listings`, `PATCH /seller/listings/{id}`
- Use server-side anti-spam and message rate limits.

## Realtime/Push/Offline
- Push new listing matches, chat replies, and moderation actions.
- Cache saved searches and viewed listings offline.
- Chat drafts should survive connectivity loss.

## Permissions/Privacy/Safety
- Request location only for nearby browse and map centering.
- Keep contact details private until both sides choose to disclose them.
- Rate-limit spam, scam links, and duplicate listings.
- Surface handoff safety reminders before meeting in person.

## Analytics Events
- `view_browse`, `search_local`, `open_listing`, `send_message`, `save_search`, `report_listing`, `mark_sold`, `block_user`

## Monetization
- Revenue comes from promoted listings, seller tools, and optional verification features.
- Promoted placement must be clearly labeled.

## Acceptance Tests
- Saved-search notifications respect radius and category filters.
- Chat remains functional offline for draft composition only.
- Reporting a listing hides risky UI prompts until moderation completes.
- Sold listings stop accepting new messages for purchase intent.
- Browse can still show cached cards when location permission is denied.

## Implementation Notes
- Keep local meet-up guidance safety-focused and configurable.
- Separate social graph assumptions from marketplace identity.
- Use original UI copy and synthetic seller profiles.
- Mark fraud, moderation, and handoff behaviors that need live verification.
