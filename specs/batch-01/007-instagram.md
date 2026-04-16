# Instagram-Style Social Clone Spec

## Legal Scope
- Clone objective: reproduce a photo/video social app with feed, stories, reels-style short video, DMs, explore, and profile grids.
- Must not copy: Instagram branding, logos, proprietary ranking, stickers, or media assets.
- Replacement brand/assets: use original naming, icons, and post/story templates.

## Product Goal
- Let a user share moments, follow accounts, and move between feed, stories, short video, and messaging in one account system.

## Research Verification Checklist
- [ ] Feed, stories, reels, explore, and profile tab behavior
- [ ] Create post, story, and reel publish flow
- [ ] DM inbox, threads, reactions, and media send behavior
- [ ] Privacy controls, close friends, and blocked users
- [ ] Notifications, mentions, and activity surfaces
- [ ] Shopping or creator monetization gates if included
- [ ] Drafts, archiving, and delete behavior
- [ ] Offline cache and upload retry flow

## Core User Journeys
- User opens the home feed, likes a post, and follows a creator.
- User posts a photo carousel or story with text and stickers.
- User records a short video and publishes it to profile and discover surfaces.
- User sends a DM, replies to a story, and continues a chat thread.
- User edits profile privacy and close-friends lists.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Home Feed | Browse follower content | empty, populated, error |
| Stories Tray | Open ephemeral stories | unseen, viewed, expired |
| Create Post | Compose media post | draft, filter, upload |
| Reels View | Watch short video | autoplay, paused, shared |
| Explore | Discovery grid/search | trending, filtered, no results |
| DMs | Inbox and thread list | unread, muted, archived |
| Profile | Posts, reels, tagged media | public, private, restricted |
| Settings | Privacy and account | default, close-friends |

## Functional Requirements
- Support photo, carousel, video, story, and short-video publishing.
- Support follows, likes, comments, saves, shares, story replies, and story reactions.
- Keep a separate inbox model for DMs with read receipts and attachments.
- Support profile grids, highlights, tagged posts, and archive views.
- Allow drafts, scheduled posts if supported, and deletions.
- Support explore/search across users, hashtags, and media captions.

## Data Model
- User: id, handle, display_name, privacy, verified, follower_count.
- Post: id, user_id, type, caption, media_refs, visibility, archived.
- Story: id, user_id, expires_at, media_refs, close_friends_only.
- Reel: id, user_id, caption, media_ref, audio_ref, metrics.
- Thread: id, participant_ids, last_message_at, muted_at, archived_at.
- Message: id, thread_id, sender_id, body, attachments, read_at.

## API/Backend Contracts
- `GET /feed`, `GET /stories`, `GET /explore`
- `POST /posts`, `POST /stories`, `POST /reels`
- `POST /posts/:id/like`, `POST /posts/:id/comments`, `POST /posts/:id/save`
- `GET /threads`, `POST /threads`, `POST /threads/:id/messages`
- `PATCH /profiles/:id`, `POST /follows`, `POST /blocks`
- Use signed uploads and background media processing.

## Realtime/Push/Offline
- Push on DMs, story replies, mention events, and post interactions.
- Cache feed and inbox metadata for offline viewing.
- Queue uploads and message sends during connectivity loss.
- Stream typing indicators and read-state updates when possible.

## Permissions/Privacy/Safety
- Request camera, microphone, and photo access only for creation flows.
- Support private accounts, close friends, restricted comments, and block lists.
- Hide story content after expiry and enforce audience rules at fetch time.
- Include report flows for spam, harassment, and impersonation.

## Analytics Events
- `feed_opened`, `post_liked`, `story_viewed`, `reel_viewed`
- `post_created`, `story_created`, `dm_sent`, `profile_edited`
- `explore_used`, `account_followed`, `report_submitted`

## Monetization
- Ad-supported discovery with optional creator tools, shopping links, or promoted placements.
- Premium creator tiers can add analytics and enhanced publishing tools.

## Acceptance Tests
- User can upload a post and see it on the profile grid.
- User can post a story that expires after the configured interval.
- User can send a DM and receive a push notification.
- User can open explore and find posts by hashtag.
- Private-account posts stay hidden from non-followers.

## Implementation Notes
- Keep feed, stories, reels, and DMs as separate surfaces sharing the same account graph.
- Model story expiry as a backend rule, not just a UI countdown.
- Make uploads resumable and recoverable across app restarts.
- Verify actual tab ordering, reel affordances, and story controls before implementation.

