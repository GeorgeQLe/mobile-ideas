# Google Maps-Style Clone Spec

## Legal Scope
- Clone objective: search, place details, saved lists, route planning, turn-by-turn navigation, transit, and offline maps.
- Must not copy: Google branding, map tiles, proprietary place data, reviews, or routing algorithms.
- Original replacement brand: new map product identity with owned tiles and content sources.

## Product Goal
- Help users search for places, compare routes, save favorite locations, and navigate reliably.
- Provide map, list, and detail views tied together by one search and routing engine.
- Support offline operation for cached regions and recent routes.

## Research Verification Checklist
- Verify primary tabs, place card layout, route mode toggles, and transit entry points.
- Verify live navigation guidance, reroute behavior, and saved list organization.
- Verify offline map download prompts and whether review/rating features belong in scope.
- Verification status: not researched beyond backlog.

## Core User Journeys
- Search for a destination, open the place card, and start directions.
- Compare driving, walking, cycling, and transit routes.
- Save a place to a list, revisit it later, and share a location.
- Download offline area data and navigate with degraded connectivity.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Map Home | Search and browse | query, layers | idle, loaded | location denied |
| Place Card | Business/location detail | save, share, route | open, collapsed | stale hours |
| Directions | Compare routes | origin, destination, mode | preview, active | ambiguous route |
| Navigation | Turn-by-turn guidance | reroute, report | active, off-route | tunnel, poor GPS |
| Saved Lists | Bookmarks | create, reorder | empty, populated | sync conflict |
| Offline Download | Region caching | area select | downloading, ready | storage full |
| Transit | Public transport | line, stop, schedule | available, none | service disruption |

## Functional Requirements
- Search by address, business name, category, or coordinate.
- Route planning with ETA, traffic-aware alternatives, and mode-specific instructions.
- Place detail pages with hours, contact, photos, and save/share actions.
- Offline map region download and cached recent searches.

## Data Model
- Place, PlaceCategory, Route, RouteLeg, SavedList, SavedPlace, OfflineRegion, UserReport, MapLayer.
- RouteLeg stores maneuver, distance, duration, and geometry.
- Place data should support verification timestamps for hours and status.

## API/Backend Contracts
- Auth: optional account session for saves and reports.
- Reads: `/search`, `/places/{id}`, `/routes`, `/saved-lists`, `/offline-regions`, `/transit`.
- Writes: save place, create list, request route, download region, submit report, share location.
- Realtime: traffic, reroute, location updates, and live navigation events.

## Realtime/Push/Offline
- Cache recent search history, favorites, and offline regions.
- Navigation should degrade to cached guidance if signal is weak.
- Push for route changes, saved place reminders, and shared location alerts.

## Permissions/Privacy/Safety
- Request location only when needed and offer approximate location when possible.
- Separate location history from account data and allow deletion.
- Provide report abuse, incorrect place, and unsafe route feedback.

## Analytics Events
- `search_performed`, `place_opened`, `route_requested`, `navigation_started`, `reroute_accepted`, `place_saved`, `offline_region_downloaded`, `report_submitted`.

## Monetization
- Free core navigation; revenue through promoted listings, premium fleet tools, or subscription map packs.
- Keep sponsored placements clearly labeled.

## Acceptance Tests
- Search for a place, request walking and driving routes, and verify ETA differences.
- Save a location to a list and access it after app restart.
- Download an offline area, disable network, and still browse the map.
- Simulate GPS drift and verify reroute state updates.

## Implementation Notes
- Separate map rendering from routing so each can be cached and tested independently.
- Build a provider-agnostic place abstraction in case multiple data sources are added later.
- Treat navigation safety as a first-class state machine, not a view-only feature.

