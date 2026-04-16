# Pinterest-Style Visual Discovery Clone Spec

## Legal Scope
- Clone objective: create a visual discovery app with pins, boards, search, collections, and shopping links.
- Must not copy: Pinterest branding, recommendation code, image assets, or proprietary shopping integrations.
- Replacement brand/assets: use original board names, pin cards, and discovery labels.

## Product Goal
- Let a user search for ideas, save visuals to boards, and revisit organized inspiration across devices.

## Research Verification Checklist
- [ ] Home feed and search behavior
- [ ] Pin save, board create, and board merge flow
- [ ] Lens/image search and related pins
- [ ] Shopping or product-tag behavior
- [ ] Follow, save, and collaboration permissions
- [ ] Notifications and trends
- [ ] Download/save/offline behavior
- [ ] Privacy controls for boards and pins

## Core User Journeys
- User searches an idea and saves a pin to a board.
- User creates a board, organizes pins, and edits board cover.
- User opens a pin, views related pins, and follows a creator.
- User shares a board with collaborators.
- User adds a product pin to a shopping-inspired list.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Home Feed | Browse inspiration | personalized, trending, empty |
| Search | Find visual ideas | query, suggestions, no results |
| Pin Detail | Open pin and related content | image, product, locked |
| Board | Organize saved pins | private, shared, secret |
| Create Board | Name and configure board | draft, saved, error |
| Profile | Boards and pins | public, private |
| Notifications | Saves and follows | unread, read |
| Settings | Privacy and ad prefs | default, restricted |

## Functional Requirements
- Support saving any eligible pin into one or more boards.
- Support board creation, board covers, collaborator access, and secret/private modes.
- Support search by image, keyword, and related discovery.
- Support shopping-friendly metadata and outbound links where allowed.
- Support pin creation from upload, web link, or saved source.
- Support following creators and boards.

## Data Model
- User: id, display_name, avatar_url, privacy, follower_count.
- Pin: id, owner_id, image_url, title, description, source_url, product_ref.
- Board: id, owner_id, name, description, privacy, cover_pin_id.
- BoardItem: id, board_id, pin_id, saved_at, note.
- SearchQuery: id, user_id, text, image_ref, created_at.
- Follow: id, user_id, target_type, target_id.

## API/Backend Contracts
- `GET /feed`, `GET /search?q=`, `POST /search/image`
- `POST /pins`, `GET /pins/:id`, `POST /boards`
- `POST /boards/:id/items`, `DELETE /boards/:id/items/:item_id`
- `PATCH /boards/:id`, `POST /follows`, `POST /reports`
- Use image metadata extraction and safe outbound link handling.

## Realtime/Push/Offline
- Push on board collaboration, saves, and follows.
- Cache recently viewed pins and board metadata offline.
- Queue pin saves and uploads when offline.
- Refresh recommendation sections on app resume.

## Permissions/Privacy/Safety
- Make board privacy explicit and enforce at fetch time.
- Support creator credit and source attribution for saved visuals.
- Moderate harmful or unsafe image content before recommendation.
- Restrict sensitive profile data from public boards.

## Analytics Events
- `feed_opened`, `search_used`, `pin_viewed`, `pin_saved`
- `board_created`, `board_item_added`, `creator_followed`, `product_clicked`
- `board_shared`, `privacy_updated`, `report_submitted`

## Monetization
- Ad-supported discovery with promoted pins and shopping links.
- Optional business or creator tools can sit behind paid tiers.

## Acceptance Tests
- User can search, open a pin, and save it to a board.
- User can create a private board and add collaborators.
- Search by image returns related pin results.
- Saved pins survive offline viewing and app restart.
- Public pins remain publicly visible while private boards stay hidden.

## Implementation Notes
- Treat the pin image, metadata, and outbound source as separate records.
- Keep board operations idempotent to avoid duplicate saves during retries.
- Let the recommendation engine operate on visual embeddings and topic tags, not UI state.
- Verify exact board privacy modes and shopping behavior with live research.

