# Waze-Style Clone Spec

## Legal Scope
- Clone objective: community-powered driver navigation with reports, rerouting, ETA updates, and hazard alerts.
- Must not copy: branding, map presentation, voice pack, or proprietary traffic data.
- Original replacement brand: independent driver app identity and custom alert language.

## Product Goal
- Help drivers reach destinations quickly using live traffic, incident reports, and crowd-sourced updates.
- Make report creation and route recalculation fast enough for safe use while driving.
- Keep moderation and abuse prevention in the loop because report quality is core to the product.

## Research Verification Checklist
- Verify report types, alert hierarchy, and driver-mode defaults.
- Verify gas price surface, route preference settings, and community moderation tools.
- Verify whether carpool or social features are in scope.
- Verification status: unconfirmed beyond backlog.

## Core User Journeys
- Start navigation, receive traffic-aware route guidance, and reroute on congestion.
- Submit a hazard, police, crash, or road closure report.
- Review nearby alerts, gas prices, and route alternatives.
- Moderate or dismiss low-quality community reports if enabled.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Drive Home | Start a trip | destination, favorites | idle, active | no GPS |
| Route Preview | Compare routes | avoid options | ready, locked | map stale |
| Navigation | Live driving | report, mute, reroute | active, degraded | tunnel, weak signal |
| Report Sheet | Submit incident | type, severity, note | open, sent | unsafe to interact |
| Nearby Alerts | See hazards | tap, filter | populated, empty | duplicate alert |
| Gas Prices | Search fuel stops | sort, filter | live, stale | no results |
| Moderation | Quality control | approve, hide | pending, resolved | abuse spike |

## Functional Requirements
- Fast incident reporting with one-tap categories and optional text/photo attachments.
- Reroute engine that ingests live incidents and traffic changes.
- Driver-safe alert presentation with large touch targets and minimal interaction.
- Optional gas price and road-event discovery if verified.

## Data Model
- Route, RoadSegment, IncidentReport, IncidentType, TrafficSnapshot, GasStation, GasPrice, ModeratorAction, DriverPreference.
- IncidentReport stores reporter trust, timestamp, geo-hash, and moderation status.
- TrafficSnapshot stores ETA deltas and route confidence.

## API/Backend Contracts
- Auth: optional account for reports, moderation, and preferences.
- Reads: `/routes`, `/incidents`, `/alerts`, `/gas`, `/preferences`, `/moderation`.
- Writes: create report, dismiss report, reroute, save route preference, flag abuse.
- Realtime: traffic updates, alert broadcasts, and moderation queue changes.

## Realtime/Push/Offline
- Push on severe incidents, route changes, and report acknowledgments.
- Cache the last known route and recent alerts for weak-signal driving.
- Do not require heavy interaction while navigation is active.

## Permissions/Privacy/Safety
- Request location and microphone only when navigation or voice reporting needs them.
- Provide driving-safe UI, crash reporting, and a clear report-abuse path.
- Minimize retention of precise movement history.

## Analytics Events
- `navigation_started`, `incident_viewed`, `incident_reported`, `incident_confirmed`, `reroute_triggered`, `gas_search_run`, `moderation_action_taken`.

## Monetization
- Free navigation with promoted fuel stops or partner placements.
- Optional premium driver tier may include advanced alerts or history.

## Acceptance Tests
- Start navigation, inject a traffic incident, and confirm reroute.
- Submit each incident type and verify moderation queue visibility.
- Open gas prices and sort by price and distance.
- Run in offline mode and ensure the route stays usable from cache.

## Implementation Notes
- Separate user reports from route computation so moderation can suppress bad data quickly.
- Keep the UI constrained to driver-safe controls.
- Test alert deduplication aggressively because it directly affects trust.

