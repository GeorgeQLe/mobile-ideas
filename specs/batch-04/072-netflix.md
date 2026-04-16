# Netflix-Style Clone Spec

## Legal Scope
- Build a streaming video app with original branding, artwork, and copy.
- Do not copy Netflix marks, title catalog data, recommendation outputs, or playback DRM.
- Use licensed or synthetic video assets for development.
- Keep profiles, maturity controls, and downloads as separate modules.

## Product Goal
- Make it easy to browse, continue watching, search, and play video on mobile.
- Provide profile-aware catalog views, downloads, and child-safe controls.

## Research Verification Checklist
- Verify browse rails, continue-watching placement, and profile switching from public observation.
- Verify title detail pages, episode lists, and playback controls.
- Verify download states, maturity gating, and profile restrictions.
- Verify search behavior and next-episode continuation from support materials.

## Core User Journeys
- User selects a profile and lands on a personalized home screen.
- User opens a title detail page, starts playback, and resumes later.
- User downloads a movie or episode for offline viewing.
- User switches profiles or adjusts maturity restrictions.
- User searches for a title, reads detail metadata, and adds it to a list.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Profile Select | Choose user context | Profile tap | Active, locked | Child profile |
| Home | Rails and continue watching | None | Populated, empty | Cold start |
| Search | Title discovery | Query, genres | Typing, results | No match |
| Title Detail | Movie or series page | Title id | Available, removed | Age gated |
| Episode List | Season navigation | Season select | Expanded, collapsed | Missing episode |
| Player | Video playback | Seek, subtitle | Playing, paused | DRM error |
| Downloads | Offline content | Select item | Downloading, done | Space full |
| My List | Saved titles | Add/remove | Populated, empty | Duplicate save |
| Settings | Profiles and restrictions | Pins, maturity | Editable | Reauth required |

## Functional Requirements
- Support profile selection, personalized home rails, and watch-history continuity.
- Support title detail, season navigation, episode selection, and play resume.
- Support downloads with progress, pause, resume, and cleanup.
- Support subtitles, audio tracks, and playback controls.
- Support adding/removing titles from a personal list.
- Support maturity controls and profile PINs.
- Track continue-watching state and next-episode recommendations.
- Allow search across movies, shows, casts, and genres.

## Data Model
- `User`: account, profile list, maturity settings, PIN state.
- `Profile`: name, avatar placeholder, child flag, viewing prefs.
- `Title`: type, name, summary, artwork, maturity rating.
- `Season`: title id, season number, episode ids.
- `Episode`: title id, season id, duration, subtitle availability.
- `ListItem`: title id, saved flag, added at.
- `PlaybackSession`: title id, position, audio track, subtitle track.

## API/Backend Contracts
- `GET /profiles`, `POST /profiles/switch`, `PATCH /profiles/{id}`.
- `GET /home`, `GET /search?q=`, `GET /titles/{id}`, `GET /seasons/{id}`.
- `POST /playback/start`, `POST /playback/progress`, `POST /playback/stop`.
- `POST /my-list`, `DELETE /my-list/{id}`.
- `GET /downloads`, `POST /downloads`, `GET /restrictions`.
- Use signed playback manifests and entitlement checks.

## Realtime/Push/Offline
- Push for new seasons, continue-watching reminders, and download completion.
- Cache lists, home rails, and downloaded media offline.
- Sync progress in the background when connectivity returns.

## Permissions/Privacy/Safety
- Request notifications only for user-approved reminders.
- Protect profile PINs and maturity settings with reauth.
- Minimize watch-history exposure in logs and analytics.

## Analytics Events
- `profile_selected`, `title_opened`, `playback_started`, `playback_resumed`
- `my_list_added`, `my_list_removed`, `download_started`, `download_completed`
- `search_performed`, `restriction_changed`

## Monetization
- Use subscription tiers and profile-based entitlements.
- Keep upsell surfaces separate from playback and list management.

## Acceptance Tests
- User can select a profile, open a title, and resume from the previous position.
- User can download content and play it offline.
- User can add and remove a title from My List.
- Child profile cannot bypass maturity restrictions.
- Search returns matching movies, shows, and people.

## Implementation Notes
- Treat profiles as a first-class dimension in every home and list API.
- Keep resume state per profile, not just per account.
- Use a media manifest layer so subtitles and audio tracks can change without UI rewrites.
