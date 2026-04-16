# BeReal-Style Daily Social Clone Spec

## Legal Scope
- Clone objective: recreate a daily camera prompt app with simultaneous front/back capture, time-limited posting, and friend-only reactions.
- Must not copy: BeReal branding, prompt timing code, notification copy, or camera assets.
- Replacement brand/assets: use original prompt name, icons, and feed labels.

## Product Goal
- Prompt users once per day to capture and share a real-time moment with minimal editing.

## Research Verification Checklist
- [ ] Daily prompt timing and notification behavior
- [ ] Front/back simultaneous capture flow
- [ ] Late-post indicators and repost limits
- [ ] Friend feed and reaction mechanics
- [ ] Comment or caption behavior
- [ ] Discovery or optional public posting if present
- [ ] Privacy settings and location handling
- [ ] Offline capture and delayed submission behavior

## Core User Journeys
- User receives the daily prompt, captures front/back photos, and posts.
- User views friend posts, reacts, and comments if supported.
- User posts late and sees a late-post indicator.
- User misses the prompt and receives a reminder or skip state.
- User changes privacy or discovery settings.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Prompt Home | Show daily capture call | pending, live, expired |
| Camera | Capture front/back media | idle, ready, error |
| Feed | View friends' posts | empty, populated, late |
| Post Detail | Read reactions and comments | open, closed, hidden |
| Profile | History and streak-like summary | private, public |
| Friends | Manage connections | pending, accepted |
| Settings | Privacy and alerts | default, muted |

## Functional Requirements
- Deliver one daily prompt and lock capture timing around it.
- Capture front and rear images in one posting flow.
- Store post timestamp, prompt timestamp, and late status separately.
- Support reactions and optional comments only from approved connections.
- Limit edits so the core product remains low-friction and authentic.
- Allow delete, report, and privacy controls from post detail.

## Data Model
- User: id, display_name, privacy, prompt_opt_in, timezone.
- DailyPrompt: id, date_key, issued_at, expires_at, status.
- BeRealPost: id, user_id, prompt_id, front_media, back_media, posted_at, late_flag.
- Reaction: id, post_id, user_id, type, created_at.
- Comment: id, post_id, user_id, body, created_at.
- Friendship: id, requester_id, addressee_id, status.

## API/Backend Contracts
- `GET /prompt/current`, `POST /posts`, `GET /posts/:id`.
- `POST /posts/:id/reactions`, `POST /posts/:id/comments`.
- `GET /feed/friends`, `POST /friends`, `DELETE /friends/:id`.
- `PATCH /settings/privacy`, `PATCH /settings/notifications`.
- Enforce prompt window and late-post metadata on the server.

## Realtime/Push/Offline
- Push the daily prompt and friendship notifications.
- Cache camera drafts locally until posting is complete.
- Allow delayed posting when offline, but preserve prompt timing metadata.
- Refresh feed reactions in realtime when possible.

## Permissions/Privacy/Safety
- Request camera access for capture and location only if the product includes it.
- Keep the feed friend-only by default unless public mode is explicitly supported.
- Prevent prompt manipulation and preserve accurate post timestamps.
- Provide report/block controls for harassment or impersonation.

## Analytics Events
- `prompt_received`, `capture_started`, `post_submitted`, `post_late_flagged`
- `feed_viewed`, `reaction_sent`, `comment_added`, `friend_accepted`
- `notification_opened`, `privacy_updated`

## Monetization
- Free core app with optional premium profile styling or archive features.
- Avoid gating the daily capture loop behind monetization.

## Acceptance Tests
- Prompt appears once per day and can be posted within the allowed window.
- Late posts are labeled late and still appear in the feed.
- Friend reactions persist after restart.
- Offline capture saves and submits after reconnect.
- Private feed items remain hidden from non-friends.

## Implementation Notes
- The prompt scheduler should be server-authoritative and timezone-aware.
- Keep post creation as a single atomic transaction so front/back assets stay aligned.
- Do not introduce heavy editing; the product depends on immediacy.
- Verify exact prompt cadence and any public/discovery surface with live observation.

