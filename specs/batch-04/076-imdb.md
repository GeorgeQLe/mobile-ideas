# IMDb-Style Clone Spec

## Legal Scope
- Build an entertainment database app with original branding, copy, and artwork placeholders.
- Do not copy IMDb marks, proprietary cast data, trailer assets, or ratings feeds.
- Use licensed metadata sources or synthetic records for development.
- Treat external showtimes or ticket links as optional integrations.

## Product Goal
- Let users search film and TV titles, inspect cast pages, and maintain a watchlist.
- Make title detail pages the center of the experience, with search as the primary entry point.

## Research Verification Checklist
- Verify search, title pages, cast pages, and watchlist from public observation.
- Verify trailers, ratings, and news surfaces.
- Verify episode lists, season navigation, and person profiles if TV coverage exists.
- Verify ad placement and premium or profile features if exposed in the app.

## Core User Journeys
- User searches a title, opens the detail page, and reads cast and synopsis data.
- User follows a person or saves a title to the watchlist.
- User watches a trailer or opens an external showtimes link.
- User opens a TV series, navigates seasons, and reviews episode info.
- User rates a title or marks it as seen.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Title/person discovery | Query, filters | Typing, results | Ambiguous title |
| Title Detail | Film or series page | Title id | Loaded, incomplete | Data gap |
| Cast Page | Actor or crew profile | Person id | Open, sparse | Uncredited role |
| Watchlist | Saved titles | Add/remove | Populated, empty | Duplicate save |
| Trailer | Video preview | Play, pause | Ready, blocked | Region restricted |
| News | Entertainment articles | Category | Fresh, stale | No content |
| Ratings | User rating entry | Star rating | Draft, saved | Anonymous mode |
| Settings | Account and privacy | Toggles | Editable | Reauth required |

## Functional Requirements
- Support search across titles, people, genres, and keywords.
- Render title pages with synopsis, credits, trivia, ratings, and related titles.
- Support watchlist add/remove and ratings.
- Support cast and crew pages with linked credits.
- Support external links for showtimes or purchase options if enabled later.
- Support trailer playback or preview.
- Provide news or editorial cards as secondary content.
- Keep search results fast and index-driven.

## Data Model
- `Title`: type, name, year, synopsis, genres, popularity.
- `Person`: name, bio, photo ref, credits.
- `Credit`: title id, person id, role, billing order.
- `WatchlistItem`: title id, saved at, note.
- `Rating`: title id, user score, seen flag.
- `Trailer`: title id, media ref, source, region availability.
- `NewsItem`: source, headline, target entity, publish date.

## API/Backend Contracts
- `GET /search?q=`, `GET /titles/{id}`, `GET /people/{id}`.
- `GET /titles/{id}/credits`, `GET /titles/{id}/trailers`, `GET /news`.
- `POST /watchlist`, `DELETE /watchlist/{id}`.
- `POST /ratings`, `PATCH /ratings/{id}`.
- `GET /titles/{id}/episodes`, `GET /titles/{id}/season/{seasonId}`.
- Index search should support partial matches and disambiguation hints.

## Realtime/Push/Offline
- Push for watchlist reminders and followed entity updates if enabled.
- Cache recent searches, watchlist, and title detail summaries offline.
- Trailers can fail gracefully when network or region blocks exist.

## Permissions/Privacy/Safety
- Request notifications only for user-selected updates.
- Redact browsing history from shared logs.
- Support report and hide controls on news or community surfaces.

## Analytics Events
- `search_performed`, `title_opened`, `person_opened`, `watchlist_added`
- `trailer_played`, `rating_submitted`, `news_opened`, `season_selected`

## Monetization
- Use ad placements and premium navigation modules as later placeholders.
- Keep external commerce links clearly labeled.

## Acceptance Tests
- User can search a title, open detail, and save it to watchlist.
- User can open a person page and inspect linked credits.
- User can watch a trailer or fail gracefully when unavailable.
- User can rate a title and edit the rating.
- Search should disambiguate titles with the same name.

## Implementation Notes
- Design search indexes separately for titles, people, and news.
- Keep title and person pages highly cacheable.
- Use explicit relation tables for credits rather than embedding long arrays.
