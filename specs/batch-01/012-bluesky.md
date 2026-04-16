# Bluesky-Style Social Client Clone Spec

## Legal Scope
- Clone objective: build a lightweight federated-feeling social client with custom feeds, moderation labels, portable identity, and starter-pack discovery.
- Must not copy: Bluesky branding, protocol-private data, logos, or label taxonomy.
- Replacement brand/assets: use original identity names, feed cards, and moderation chips.

## Product Goal
- Let a user follow people, switch between curated feeds, and control moderation preferences from a small, fast mobile client.

## Research Verification Checklist
- [ ] Identity onboarding and handle/domain behavior
- [ ] Custom feed creation and selection
- [ ] Starter pack discovery and follow suggestions
- [ ] Label/mute/block moderation flows
- [ ] Reply threading and quote-post behavior
- [ ] Search and profile browsing
- [ ] Push, sync, and offline cache behavior
- [ ] Export, account migration, and privacy settings

## Core User Journeys
- User signs in, picks a handle, and follows a starter pack.
- User switches between custom feeds and the main following feed.
- User posts a short update and replies to another thread.
- User adjusts moderation labels, muted words, and blocked accounts.
- User migrates or exports account settings.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Feed Switcher | Change active feed | default, custom, error |
| Timeline | Read posts and threads | loading, live, stale |
| Compose | Create post or reply | draft, posted, failed |
| Profile | View identity and posts | public, private, muted |
| Starter Packs | Follow bundles | featured, saved, empty |
| Moderation | Labels and filters | default, strict, custom |
| Search | Find users and posts | no results, filtered |
| Settings | Account and export | linked, migrating |

## Functional Requirements
- Support multiple feeds per user, each with a discoverable definition and preview.
- Support reply chains, quote posts, likes, and repost-like boosts.
- Support starter packs that group accounts and feeds for onboarding.
- Allow user-defined moderation labels, muted words, and blocked accounts.
- Keep profile, posts, and feed subscriptions in sync across devices.
- Support search, bookmarks, and account export.

## Data Model
- User: id, handle, display_name, avatar_url, trust_level.
- FeedDefinition: id, owner_id, name, description, query_json, is_public.
- Post: id, author_id, body, reply_to_id, quote_of_id, visibility.
- StarterPack: id, owner_id, name, member_ids, feed_ids.
- ModerationLabel: id, user_id, scope, value, created_at.
- Bookmark: id, user_id, post_id, created_at.

## API/Backend Contracts
- `GET /feeds`, `POST /feeds`, `GET /feeds/:id/items`
- `GET /timeline/following`, `POST /posts`, `POST /posts/:id/replies`
- `POST /starter-packs`, `POST /moderation/labels`, `POST /blocks`
- `GET /search?q=`, `GET /profile/:id`, `POST /bookmarks`
- Support cursor pagination and feed definition validation.

## Realtime/Push/Offline
- Push on replies, follows, and moderation warnings.
- Cache active feeds and bookmarks offline.
- Update feeds via background sync and reconcile on app resume.
- Queue compose actions until connectivity returns.

## Permissions/Privacy/Safety
- Expose moderation settings prominently and make defaults conservative.
- Apply label and block rules before feed rendering, not after.
- Keep identity migration flows explicit and reversible only within policy.
- Do not expose private account metadata in feed previews.

## Analytics Events
- `feed_switched`, `timeline_opened`, `post_created`, `reply_sent`
- `starter_pack_opened`, `moderation_label_changed`, `account_exported`
- `bookmark_added`, `search_used`

## Monetization
- Prefer a low-friction subscription or donation model over ads.
- Keep core posting and feed use available without a paywall.

## Acceptance Tests
- User can create or select a custom feed and see it persist after restart.
- User can join a starter pack and follow bundled accounts.
- Moderation labels hide content immediately in the timeline.
- Bookmarks and search results survive offline usage and app relaunch.
- Migration/export screens do not expose private data to logged-out users.

## Implementation Notes
- Model feeds as server-defined queries with client-side presentation only.
- Keep moderation filters composable so labels, mutes, and blocks can stack cleanly.
- Treat portable identity as a first-class account attribute.
- Verify exact feed types and onboarding details against live product research.

