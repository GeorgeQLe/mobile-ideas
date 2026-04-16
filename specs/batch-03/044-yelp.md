# Local Review Clone Spec

## Legal Scope
- Clone objective: reproduce business search, review creation, photos, maps, bookmarks, and owner response flows.
- Must not copy: trademarked logos, review content, photo libraries, or proprietary ranking signals.
- Original replacement brand/assets: use neutral local discovery branding and user-generated placeholder content.

## Product Goal
- Help users discover local businesses, evaluate trust, write reviews, and save places they want to revisit.
- Preserve the main surfaces: search, place detail, review composer, photos, bookmarks, and profile.
- Verify ranking, filters, and moderation behaviors from lawful observation before implementation.

## Research Verification Checklist
- [ ] Confirm search result layout, filters, and map/list toggle behavior.
- [ ] Verify review composer, photo upload, and edit/delete flows.
- [ ] Verify owner response surfaces and moderation/report controls.
- [ ] Verify bookmark lists, collection behavior, and profile stats.
- [ ] Verify notification triggers for review replies and friend activity.

## Core User Journeys
- User searches for a business and narrows by rating, price, and category.
- User opens a place detail page, views photos, and saves the business.
- User writes a review with a star rating and optional photos.
- Business owner responds to a review or claims the page.
- User shares or revisits a bookmarked place.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find businesses | Query, category, filters | Results, none | Ambiguous query |
| Place Detail | Ratings and details | Place, map, reviews | Open, closed | Missing data |
| Review Composer | Submit feedback | Rating, text, photos | Draft, posted | Spam flag |
| Bookmarks | Saved places | List, collections | Populated, empty | Private list |
| Profile | User history | Reviews, photos, stats | Active, restricted | Moderation hold |

## Functional Requirements
- Support text search, map browsing, filters, and sort orders.
- Let users create, edit, and delete their own reviews within policy windows.
- Persist bookmarks, collections, and recent searches.
- Support business claim/owner response flow as a separate role.
- Allow upload of photos with moderation before public display.

## Data Model
- Business, Category, Location, Review, ReviewPhoto, Bookmark, Collection, OwnerProfile, Report, UserProfile.
- Review stores rating, body, media references, edit history, and moderation state.
- Business stores hours, attributes, map coordinates, and trust signals.

## API/Backend Contracts
- `GET /search`, `GET /businesses/{id}`, `GET /businesses/{id}/reviews`
- `POST /reviews`, `PATCH /reviews/{id}`, `DELETE /reviews/{id}`
- `POST /bookmarks`, `GET /bookmarks`, `POST /reports`
- `POST /owner-responses`
- Search endpoints must support cursor pagination and filter echoes.

## Realtime/Push/Offline
- Push owner response, review reply, and moderation outcome events.
- Cache recent searches, bookmarks, and previously viewed places offline.
- Defer photo upload until connectivity returns.

## Permissions/Privacy/Safety
- Request location only for nearby business discovery.
- Support anonymous display names only if the policy allows it in the product configuration.
- Rate-limit review spam, duplicate photo upload, and report abuse.
- Keep user location and contact details private by default.

## Analytics Events
- `search_business`, `apply_filter`, `view_place`, `save_place`, `start_review`, `submit_review`, `upload_photo`, `owner_response_viewed`, `report_place`

## Monetization
- Revenue can come from promoted placements, premium tools for owners, and local ads.
- Promotional ranking must remain distinguishable from organic ranking.

## Acceptance Tests
- Search filters preserve result stability across refresh.
- Review posting validates text length and photo limits.
- Bookmarked places appear offline from cache.
- Owner response is visible on the correct business thread.
- Moderation can hide abusive review content without losing author history.

## Implementation Notes
- Separate public discovery from owner-management paths.
- Keep category and attribute taxonomies configurable per market.
- Originalize all copy, icons, and map styling.
- Mark ranking, moderation, and claim behavior that needs live verification.
