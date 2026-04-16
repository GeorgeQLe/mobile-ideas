# Reddit-Style Community Forum Clone Spec

## Legal Scope
- Clone objective: recreate a community forum with subcommunities, post types, nested comments, voting, moderation, and saved content.
- Must not copy: Reddit branding, logos, awards, moderation data, or ranking code.
- Replacement brand/assets: use original community names, icons, and post styles.

## Product Goal
- Let users browse topic communities, publish posts, discuss in threads, and moderate content from mobile.

## Research Verification Checklist
- [ ] Community discovery and join/leave behavior
- [ ] Post types, flairs, and media handling
- [ ] Nested comments, sorting, and collapse rules
- [ ] Moderation queue, reports, and removals
- [ ] Saved posts, history, and anonymous browsing behavior
- [ ] Notifications and inbox surfaces
- [ ] Subscription/premium behavior if included
- [ ] Offline read cache and retry behavior

## Core User Journeys
- User joins a community, reads top posts, and upvotes one.
- User creates a text or image post with flair.
- User comments in a nested thread and receives a reply notification.
- User saves a post for later and returns to it from history.
- Moderator reviews reports and removes rule-breaking content.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Home Feed | Cross-community browsing | hot, new, top |
| Community | Community-specific feed | joined, muted, private |
| Post Detail | Post plus comments | loaded, locked, archived |
| Comment Composer | Add reply | plain, markdown, error |
| Inbox | Messages and mentions | unread, archived |
| Moderation Queue | Review reports | pending, actioned |
| Saved | Bookmarked posts | empty, list, filtered |
| Settings | Account and privacy | default, anonymous |

## Functional Requirements
- Support community creation, membership, muting, and moderator roles.
- Support text, image, link, and poll posts with flairs and sort options.
- Support nested comments with voting, collapse, and edit history.
- Support saved posts, history, and follow/subscription-like behavior.
- Support moderation actions: remove, lock, ban, approve, and sticky.
- Allow anonymous browsing and account-linked posting according to product policy.

## Data Model
- User: id, handle, karma, roles, privacy, trust_level.
- Community: id, name, description, rules, nsfw_flag, member_count.
- Post: id, community_id, author_id, type, title, body, flair, vote_count.
- Comment: id, post_id, author_id, parent_id, body, vote_count, removed.
- Vote: id, user_id, target_type, target_id, value.
- ModerationAction: id, community_id, actor_id, target_id, action_type, reason.

## API/Backend Contracts
- `GET /communities`, `POST /communities`, `POST /communities/:id/join`
- `GET /feed`, `GET /communities/:id/posts`, `POST /posts`
- `GET /posts/:id/comments`, `POST /comments`, `POST /votes`
- `GET /saved`, `POST /saved`, `DELETE /saved/:id`
- `GET /moderation/queue`, `POST /moderation/actions`
- Support pagination, sort keys, and lock/removed states.

## Realtime/Push/Offline
- Push on comment replies, mentions, and moderation assignment.
- Cache read-only feeds and post detail offline.
- Retry comment and post actions when connectivity returns.
- Stream vote counts and comment updates when supported.

## Permissions/Privacy/Safety
- Support community-level rules, NSFW flags, and age-gated content.
- Provide report, block, mute, and spam controls.
- Preserve moderator audit trails for destructive actions.
- Hide deleted or removed content according to community policy.

## Analytics Events
- `community_joined`, `post_created`, `comment_added`, `vote_cast`
- `post_saved`, `post_shared`, `moderation_action_taken`, `report_submitted`
- `search_used`, `settings_changed`

## Monetization
- Ad-supported feed with optional premium membership, community subscriptions, or paid awards.
- Do not gate basic browsing or posting behind monetization.

## Acceptance Tests
- User can join a community and see its feed.
- User can create a post, comment, and vote in one thread.
- Moderator can remove content and the action persists.
- Saved posts survive app restart and remain accessible.
- Offline browsing still shows the last cached feed.

## Implementation Notes
- Keep community policy evaluation server-side so moderation states are authoritative.
- Model nested comments as a tree with explicit parent ids and collapse state.
- Keep ranking separate from content storage so test fixtures stay deterministic.
- Verify exact community onboarding and inbox behavior from live app research.

