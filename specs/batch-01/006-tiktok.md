# TikTok-Style Short Video Clone Spec

## Legal Scope
- Clone objective: reproduce a vertical short-video app with discovery feeds, creator upload tools, comments, remixing, and account follows.
- Must not copy: TikTok branding, music licenses, recommendation code, effects assets, or proprietary moderation systems.
- Replacement brand/assets: use original feed labels, original icons, and licensed-or-original media only.

## Product Goal
- Let a user open the app and immediately watch an endless vertical feed, then create and publish a short video from the same device.

## Research Verification Checklist
- [ ] For You vs Following feed behavior
- [ ] Upload, trim, captions, and sound attribution flow
- [ ] Remix/reply-video behavior and privacy gates
- [ ] Comment, like, share, and save actions
- [ ] Drafts, privacy, and audience controls
- [ ] Live and notification surfaces
- [ ] Teen safety and content restriction rules
- [ ] Offline draft save and upload retry behavior

## Core User Journeys
- User watches the feed, likes a clip, follows a creator, and opens comments.
- User records a video, trims it, adds text, and publishes it.
- User remixes another clip or replies with video.
- User switches between personalized and following feeds.
- User reviews drafts and deletes an unpublished clip.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Feed | Watch vertical videos | loading, autoplay, error |
| Creator Camera | Record content | preview, recording, paused |
| Edit/Publish | Trim and annotate | draft, scheduled, posted |
| Comments | Read and add replies | empty, threaded, moderated |
| Profile | Creator identity and grid | public, private, restricted |
| Inbox/Alerts | Follows and mentions | unread, cleared |
| Discover/Search | Find creators and hashtags | trending, no results |
| Settings | Privacy and controls | default, restricted |

## Functional Requirements
- Autoplay one video at a time and preserve watch position per session.
- Support upload from gallery, camera recording, trimming, captions, and cover frame selection.
- Show sound/track metadata and make it reusable in other clips where licensed.
- Support like, save, share, follow, comment, report, and block.
- Keep drafts locally until published or deleted.
- Provide creator profile grids, follower counts, and pinned clips.

## Data Model
- User: id, handle, bio, privacy, safety, follower_count.
- Video: id, user_id, caption, media_url, cover_url, privacy, status.
- FeedItem: id, user_id, algorithm_bucket, source_video_id, rank.
- Comment: id, video_id, user_id, body, parent_id, moderation_state.
- Sound: id, title, creator_name, usage_rights, source_url.
- Draft: id, user_id, local_path, edit_state, last_saved_at.

## API/Backend Contracts
- `GET /feed?mode=for_you|following`
- `POST /videos/upload-url`, `POST /videos`, `PATCH /videos/:id`
- `POST /videos/:id/like`, `POST /videos/:id/comments`
- `POST /users/:id/follow`, `GET /users/:id/videos`
- `GET /search?q=`, `GET /sounds/:id`, `POST /reports`
- Use resumable uploads and background transcode jobs.

## Realtime/Push/Offline
- Stream comments and creator alerts in realtime when available.
- Push on new followers, comment replies, and moderation events.
- Cache drafts and recent feed metadata offline.
- Queue publishes until upload and transcode complete.

## Permissions/Privacy/Safety
- Request camera, microphone, and photo library access only during creation.
- Provide teen-safe defaults, content restrictions, and block/report flows.
- Allow audience control per post and disable duet/remix on restricted videos.
- Do not expose precise location unless the user intentionally adds it.

## Analytics Events
- `feed_viewed`, `video_played`, `video_liked`, `video_shared`
- `creator_followed`, `comment_posted`, `draft_saved`, `video_published`
- `search_used`, `report_submitted`, `remix_started`

## Monetization
- Ad-supported feed with optional creator tipping, gifts, or promoted placements.
- Premium creator tools can include advanced analytics and larger upload limits.

## Acceptance Tests
- User can swipe through the feed with autoplay and uninterrupted loading.
- User can create a draft, close the app, and resume editing later.
- User can publish a clip and see it appear on the profile grid.
- User can comment and receive a reply notification.
- Restricted media cannot be remixed when the privacy setting disallows it.

## Implementation Notes
- Separate the feed ranking service from media upload and social graph services.
- Keep the player stateful enough to survive app backgrounding without restarting every clip.
- Treat moderation as a post-upload workflow that can hide content before feed insertion.
- Verify exact feed labels, creation limits, and remix rules with direct observation.

