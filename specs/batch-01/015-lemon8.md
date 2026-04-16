# Lemon8-Style Lifestyle Social Clone Spec

## Legal Scope
- Clone objective: create a lifestyle discovery app with magazine-like posts, templates, categories, saved collections, and hashtag browsing.
- Must not copy: Lemon8 branding, templates, creator assets, or proprietary recommendation logic.
- Replacement brand/assets: use original magazine layout, typography, and category labels.

## Product Goal
- Let users browse polished lifestyle posts, create structured content quickly, and save ideas into collections.

## Research Verification Checklist
- [ ] Home layout and category browsing
- [ ] Post creation templates and editing flow
- [ ] Save, collection, and hashtag behavior
- [ ] Search and discovery surfaces
- [ ] Creator profile and follower behavior
- [ ] Comment, like, and share behavior
- [ ] Moderation and privacy settings
- [ ] Offline draft and media upload retry behavior

## Core User Journeys
- User browses category feeds and opens a polished post.
- User creates a template-based post with title, images, and text.
- User saves a post into a collection and returns later.
- User follows a creator and receives update notifications.
- User edits a draft and publishes it.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Home | Browse lifestyle feed | category, personalized, empty |
| Create | Build template post | draft, validation, posted |
| Post Detail | Read and engage | open, comment, shared |
| Search | Find topics and creators | suggestions, results |
| Collections | Saved inspiration | empty, list, reorder |
| Profile | Creator identity and posts | public, draft |
| Notifications | Follows and saves | unread, read |
| Settings | Privacy and content prefs | default, restricted |

## Functional Requirements
- Support structured lifestyle posts with title, body, photos, tags, and category metadata.
- Support templates that help format posts without depending on proprietary assets.
- Support collections for saving and grouping posts.
- Support follows, likes, comments, shares, and bookmarks.
- Support search by category, hashtag, and creator.
- Allow draft persistence and scheduled publishing if supported.

## Data Model
- User: id, handle, display_name, bio, privacy, follower_count.
- Post: id, user_id, title, body, media_refs, category, hashtags, status.
- Template: id, name, layout_schema, enabled, category_scope.
- Collection: id, user_id, name, description, privacy.
- CollectionItem: id, collection_id, post_id, note, saved_at.
- Comment: id, post_id, user_id, body, parent_id.

## API/Backend Contracts
- `GET /feed`, `GET /categories`, `GET /search?q=`
- `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`
- `POST /collections`, `POST /collections/:id/items`
- `POST /posts/:id/likes`, `POST /posts/:id/comments`, `POST /follows`
- Provide media upload, tagging, and pagination support.

## Realtime/Push/Offline
- Push on follows, comments, and collection shares.
- Cache collections and recent feed cards offline.
- Queue creation and upload actions until network returns.
- Refresh category recommendations in the background.

## Permissions/Privacy/Safety
- Enforce creator privacy and collection privacy settings.
- Add content moderation for spam, affiliate abuse, and unsafe media.
- Disclose sponsored or affiliate content when product links are present.
- Keep profile edits and collection membership explicit.

## Analytics Events
- `feed_opened`, `category_selected`, `post_viewed`, `post_created`
- `collection_created`, `collection_item_added`, `creator_followed`
- `search_used`, `comment_added`, `share_tapped`

## Monetization
- Sponsored placements and affiliate product links.
- Optional creator tools or analytics subscription tiers.

## Acceptance Tests
- User can browse a category, open a post, and save it to a collection.
- User can create a template-based post and publish it.
- User can search by hashtag and creator.
- Private collections stay hidden from non-members.
- Draft survives app restart and posts correctly after reconnect.

## Implementation Notes
- Keep templates as layout schemas, not hard-coded page types.
- Treat collections as first-class objects with their own privacy and ordering rules.
- Separate category ranking from post creation so both can be tested independently.
- Verify exact category taxonomy and creator tooling against live product behavior.

