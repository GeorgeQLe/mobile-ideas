# Threads-Style Conversation Clone Spec

## Legal Scope
- Clone objective: create a conversation-first microblog with account linking, replies, reposts, lightweight discovery, and search.
- Must not copy: Threads branding, Instagram-linked branding text, proprietary ranking, or logo assets.
- Replacement brand/assets: use original identity design and original post/reply copy.

## Product Goal
- Let a user quickly publish short conversation posts, follow threads of replies, and discover topical content with minimal friction.

## Research Verification Checklist
- [ ] Identity linking and sign-up flow
- [ ] Post, reply, repost, and quote behavior
- [ ] Topic search and discovery tabs
- [ ] Notification and mention surfaces
- [ ] Privacy controls and account restrictions
- [ ] Media, links, and text formatting rules
- [ ] Drafts, deletion, and edit history behavior
- [ ] Offline compose and feed cache behavior

## Core User Journeys
- User signs in, creates a post, and sees replies.
- User follows a topic or account and finds conversation threads.
- User reposts or quotes a post into their own feed.
- User edits profile and privacy settings.
- User deletes a post or saves a draft.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Home Feed | Conversation stream | following, suggested, empty |
| Compose | Write short post | draft, posted, failed |
| Post Detail | Thread and replies | open, locked, hidden |
| Search | Find people/topics | trending, no results |
| Profile | User identity and posts | public, private, linked |
| Notifications | Mentions and follows | unread, read |
| Settings | Privacy and account | default, restricted |
| Media Viewer | Open images/videos | loading, error |

## Functional Requirements
- Support short text posts, media attachments, replies, reposts, and quote posts.
- Keep reply threading and like counts consistent across feed and detail views.
- Support topic tags and search-based discovery.
- Allow draft persistence and post deletion.
- Support profile follow/unfollow and notification subscriptions.
- Maintain a simple, low-clutter mobile navigation surface.

## Data Model
- User: id, handle, display_name, linked_account_id, privacy, follower_count.
- Post: id, user_id, body, media_refs, reply_to_id, repost_of_id, quote_of_id.
- Topic: id, slug, name, trend_score.
- Notification: id, user_id, type, payload, read_at.
- Draft: id, user_id, body, media_refs, updated_at.
- PrivacySetting: id, user_id, visibility, reply_controls, mention_controls.

## API/Backend Contracts
- `GET /feed`, `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`
- `GET /posts/:id`, `POST /posts/:id/replies`, `POST /posts/:id/reposts`
- `GET /topics`, `GET /search?q=`, `POST /follows`, `POST /blocks`
- `GET /notifications`, `PATCH /notifications/:id`
- Support cursor paging and write acknowledgements with idempotency keys.

## Realtime/Push/Offline
- Push on mentions, replies, reposts, and follows.
- Cache feed pages and drafts offline.
- Refresh replies and notifications in the background.
- Queue compose actions until network returns.

## Permissions/Privacy/Safety
- Respect private accounts, reply limits, and mention restrictions.
- Provide block, mute, and report flows on every post and profile surface.
- Store linked-account metadata carefully and avoid exposing it broadly.
- Apply moderation to text and media uploads before public availability.

## Analytics Events
- `feed_opened`, `post_created`, `reply_sent`, `repost_created`
- `quote_created`, `topic_opened`, `profile_viewed`, `notification_read`
- `account_linked`, `privacy_updated`, `post_deleted`

## Monetization
- Keep the core feed free and consider ads or premium account tools as optional overlays.
- Do not gate posting behind monetization.

## Acceptance Tests
- User can create a post, reply to a post, and see the thread update.
- User can delete a post and see it removed from profile and feed.
- Private profile content stays hidden from non-followers.
- Offline draft is preserved after force quit and restore.
- Search returns topic and post results with stable ordering.

## Implementation Notes
- Keep the UI intentionally spare and focus on quick post creation and reply reading.
- Separate topic discovery from home feed ranking so each can evolve independently.
- Treat account linking as a single-source identity mapping, not as duplicated profiles.
- Verify exact navigation and discovery surfaces with live app observation.

