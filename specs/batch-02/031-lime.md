# Lime-Style Clone Spec

## Legal Scope
- Clone objective: dockless scooter and bike rental with scan-to-unlock, ride tracking, parking photo, and geofence enforcement.
- Must not copy: Lime branding, hardware identifiers, map styling, or fleet-control internals.
- Original replacement brand: independent micromobility brand and original rider copy.

## Product Goal
- Let riders discover nearby vehicles, unlock one with a code or QR scan, ride, park, and pay.
- Enforce safety tutorials and geo-restrictions before and during a ride.
- Support city-specific availability and vehicle types.

## Research Verification Checklist
- Verify unlock flow, safety tutorial order, and parking photo requirements.
- Verify geofence warnings, no-ride zones, and pause/lock behavior.
- Verify whether transit pass or commuter membership features are in scope.
- Verification status: not verified from local backlog alone.

## Core User Journeys
- Find a vehicle on a map, reserve or unlock it, and begin a ride.
- End the ride in a legal parking area and submit a parking photo.
- Review ride history, wallet balance, and safety instructions.
- Handle unlock failure, low battery, and restricted zone warnings.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Map | Find vehicles | filter, tap pin | available, none | GPS off |
| Vehicle Card | Vehicle details | reserve, unlock | ready, unavailable | bad battery |
| Safety | Tutorial and rules | acknowledge | required, passed | skipped not allowed |
| Ride | Active session | pause, lock, end | live, paused | signal lost |
| Parking | End ride proof | photo, note | submitted, rejected | invalid zone |
| Wallet | Payment and credit | card, balance | funded, due | failed charge |
| History | Past rides | receipt, route | populated | missing sync |

## Functional Requirements
- Map-based vehicle discovery with filters for type, battery, and distance.
- Unlock via QR/code with server verification and rate limits.
- In-ride timer, pause/lock control, and end-ride proof capture.
- Geofence enforcement and restricted-zone messaging.

## Data Model
- Vehicle, VehicleType, Ride, RideEvent, Zone, SafetyCheck, PaymentAccount, ParkingProof, WalletTransaction.
- Ride stores unlock time, end time, pause time, and GPS trace summary.
- Zone stores allowed, slow, and forbidden polygons.

## API/Backend Contracts
- Auth: account session plus payment token.
- Reads: `/vehicles`, `/zones`, `/rides/{id}`, `/wallet`, `/history`.
- Writes: reserve, unlock, pause, lock, end ride, submit parking photo, pay, report issue.
- Realtime: vehicle status, battery updates, geo-fence events, and trip progress.

## Realtime/Push/Offline
- Push on reserve expiry, battery alerts, and payment failures.
- Cache nearby vehicles and safety content so the user can inspect options with weak signal.
- End-ride proof should queue only if it can be safely validated later.

## Permissions/Privacy/Safety
- Request location, camera, and notifications only when the user unlocks or ends a ride.
- Show helmet and traffic safety prompts before unlocking if required.
- Keep location history minimal and user-controlled.

## Analytics Events
- `map_opened`, `vehicle_selected`, `safety_completed`, `unlock_requested`, `ride_started`, `ride_ended`, `parking_photo_submitted`, `zone_violation_shown`.

## Monetization
- Per-ride fees, passes, and commuter memberships.
- City or employer programs can be separate enterprise offers.

## Acceptance Tests
- Find a vehicle, unlock it, and start a ride.
- Enter a restricted zone and confirm the app blocks or warns correctly.
- End a ride with a valid parking photo and verify receipt creation.
- Retry unlock after a transient failure and ensure idempotent behavior.

## Implementation Notes
- Fleet status is authoritative server state; the client should never assume unlock success.
- Use a compact event stream for ride telemetry to keep battery usage low.
- Build geofence evaluation as a shared service used by both browse and active ride flows.

