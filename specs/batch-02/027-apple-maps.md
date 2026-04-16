# Apple Maps-Style Clone Spec

## Legal Scope
- Clone objective: privacy-forward map browsing, route planning, place cards, and navigation.
- Must not copy: Apple branding, exact map aesthetics, Look Around imagery, or platform-private services.
- Original replacement brand: independent map identity with neutral design and original text.

## Product Goal
- Deliver a clean map app that emphasizes simple search, route planning, and trustworthy navigation.
- Keep personal data collection minimal and make privacy settings explicit.
- Support place guides and curated collections if lawful source content is available.

## Research Verification Checklist
- Verify place card hierarchy, route sheet behavior, and navigation controls.
- Verify whether transit, indoor maps, and street-level browsing are required.
- Verify privacy prompts and any default location-history behavior.
- Verification status: pending research.

## Core User Journeys
- Search for a place, inspect the card, and start directions.
- Browse a guide or collection and navigate to a saved destination.
- Enter navigation, use voice guidance, and report an issue.
- Review favorites, recent searches, and privacy controls.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find places | text, category, voice | results, none | ambiguous query |
| Place Card | Location detail | route, save, call | open, collapsed | missing data |
| Route Sheet | Choose route | mode, avoid options | preview, active | no transit |
| Navigation | Live guidance | mute, reroute, report | active, off-route | poor GPS |
| Guides | Curated places | browse, save | populated | empty guide |
| Favorites | Saved locations | organize, rename | synced | duplicates |
| Privacy | Data controls | toggles, delete | saved | auth expired |

## Functional Requirements
- Map search, favorite locations, recent searches, and route planning.
- Turn-by-turn navigation with voice prompts, lane guidance, and off-route recalculation.
- Place cards with hours, contact methods, and quick actions.
- Optional guide browsing and list curation.

## Data Model
- Place, Favorite, SearchQuery, Route, RouteStep, Guide, GuideItem, Report, PrivacySetting.
- Route stores alternatives, ETA, and navigation state.
- Search history should support user deletion and automatic expiration.

## API/Backend Contracts
- Auth: optional account session for favorites and privacy sync.
- Reads: `/search`, `/places/{id}`, `/routes`, `/guides`, `/favorites`, `/privacy`.
- Writes: save favorite, submit correction, start route, toggle privacy setting, report issue.
- Realtime: navigation updates, traffic changes, and location tracking while active.

## Realtime/Push/Offline
- Cache map tiles, favorite places, and route previews.
- Route guidance should degrade to offline voice prompts if the map is cached.
- Push only for time-sensitive route changes or saved-place reminders.

## Permissions/Privacy/Safety
- Request location and microphone only when navigation or voice search needs them.
- Expose clear controls for precise location, recent searches, and history deletion.
- Safety reporting should cover wrong turn, hazard, and incorrect place data.

## Analytics Events
- `search_used`, `place_opened`, `route_started`, `route_changed`, `favorite_saved`, `guide_opened`, `privacy_setting_changed`, `issue_reported`.

## Monetization
- Monetize through business listings, location-based advertising, or premium guide bundles.
- Keep map trust high by labeling any sponsored content.

## Acceptance Tests
- Search, open a place card, and start walking navigation.
- Save a favorite, delete history, and confirm the UI reflects removal.
- Enter navigation with location permission denied and verify the fallback prompt.
- Browse cached maps offline and still open saved favorites.

## Implementation Notes
- Optimize for trust and clarity over visual flourish.
- Use the same place model as other mobility or travel features when possible.
- Keep privacy controls one tap away from navigation settings.

