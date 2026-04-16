# Letterboxd-Style Clone Spec

## Legal Scope
- Build a film diary and social catalog app with original branding and copy.
- Do not copy Letterboxd marks, poster art, review text, or proprietary film metadata.
- Use licensed or synthetic film data and placeholder artwork.
- Keep social graph features lightweight and mobile-friendly.

## Product Goal
- Help users log films, rate them, write reviews, and maintain watchlists.
- Make discovery social through follows, lists, and activity feeds.

## Research Verification Checklist
- Verify diary entries, ratings, watchlist, and review flows from public observation.
- Verify film detail pages, cast info, and list behavior.
- Verify following, activity feed, and spoiler/visibility behavior.
- Verify pro or premium surfaces if they appear in the product later.

## Core User Journeys
- User searches for a film, opens the detail page, and logs a diary entry.
- User writes a review, sets a rating, and shares it on the feed.
- User adds a film to a watchlist or a list.
- User follows another user and sees activity in the feed.
- User edits or deletes a diary entry after publishing.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Activity feed | None | Populated, empty | No follows |
| Search | Film discovery | Query, filters | Typing, results | Duplicate title |
| Film Detail | Film metadata | Film id | Open, missing poster | Regional release |
| Diary Entry | Log watched film | Date, rating | Draft, published | Double log |
| Review Editor | Long-form review | Text, spoilers | Draft, published | Edit conflict |
| Watchlist | Planned watching | Add/remove | Populated, empty | Hidden title |
| Lists | Curated collections | Order, visibility | Editable, shared | Private list |
| Profile | User identity | Bio, avatar | Public, private | Name taken |
| Settings | Privacy and sync | Toggles | Editable | Reauth required |

## Functional Requirements
- Support diary logging with date, rating, rewatch flag, and review text.
- Support watchlist management and multiple curated lists.
- Support follows, likes, comments, and activity feed updates.
- Support film search and detail pages with cast, crew, and metadata.
- Allow spoiler flags and visibility control on reviews.
- Support user profile pages with stats and recent activity.
- Preserve edit history for diary and review updates.
- Make logging one or two taps from search or film detail.

## Data Model
- `User`: profile, privacy, follow list, pro tier.
- `Film`: title, year, runtime, cast, genres, artwork ref.
- `DiaryEntry`: film id, watch date, rating, rewatch flag, review link.
- `Review`: body, spoiler flag, visibility, edited at.
- `WatchlistItem`: film id, added at, note.
- `List`: title, owner, visibility, ordered film ids.
- `ActivityItem`: actor, action, target, created at.

## API/Backend Contracts
- `GET /home`, `GET /search?q=`, `GET /films/{id}`, `GET /people/{id}`.
- `POST /diary`, `PATCH /diary/{id}`, `DELETE /diary/{id}`.
- `POST /reviews`, `PATCH /reviews/{id}`, `DELETE /reviews/{id}`.
- `POST /watchlist`, `DELETE /watchlist/{id}`.
- `GET /lists`, `POST /lists`, `PATCH /lists/{id}`.
- Keep activity feed updates incremental and cursor-based.

## Realtime/Push/Offline
- Push for follows, likes, comments, and list mentions.
- Cache watchlist, diary, and recent searches offline.
- Allow diary drafts and review drafts to be saved locally.

## Permissions/Privacy/Safety
- Let users mark reviews spoiler-heavy and hide them in feeds.
- Support private diary entries and profile privacy controls.
- Provide blocking and report actions for harassment.

## Analytics Events
- `film_opened`, `diary_logged`, `review_published`, `watchlist_added`
- `list_created`, `user_followed`, `activity_opened`, `spoiler_flagged`

## Monetization
- Use a pro subscription placeholder for advanced stats and customization.
- Keep paid value additive and never block basic logging.

## Acceptance Tests
- User can log a film from search and see it in diary.
- User can write a review, mark spoilers, and edit the review later.
- User can add a film to watchlist and lists.
- User can follow another user and see activity updates.
- Offline user can draft a review and publish after reconnect.

## Implementation Notes
- Treat diary entries as the canonical source for watched history.
- Use versioned edits for reviews to avoid overwriting remote changes.
- Keep feed pagination stable so activity ordering does not jump on refresh.
