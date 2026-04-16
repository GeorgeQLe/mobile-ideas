# Lyft-Style Clone Spec

## Legal Scope
- Clone objective: rideshare booking with saved places, ride options, receipts, and driver/rider tracking.
- Must not copy: brand assets, proprietary matching logic, or protected trip data.
- Original replacement brand: fresh visual identity and original trip copy.

## Product Goal
- Make ride booking quick from saved places, recent destinations, or a map pin.
- Support ride categories, scheduled rides, shared ride if verified, and trip history.
- Keep support, pricing transparency, and safety in the same flow.

## Research Verification Checklist
- Verify ride product list, home map layout, and whether scheduled pickup is prominent.
- Verify ride pairing, cancellation rules, and receipt detail depth.
- Verify any bike/scooter integration is in scope or should remain separate.
- Verification status: not yet researched.

## Core User Journeys
- Choose a pickup/dropoff, compare ride types, and confirm a ride.
- Track the driver, share ETA, and complete the trip.
- Save favorite places and use them to book quickly next time.
- Review prior rides, receipts, and support requests.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Start a booking | pickup, dropoff | idle, quoting | missing location |
| Ride Types | Compare products | seats, schedule | available, blocked | no inventory |
| Match | Find a driver | confirm, cancel | searching, matched | no drivers |
| Live Trip | Track ride | share, support | en route, active | route change |
| Saved Places | Book faster | add, edit | populated, empty | duplicate save |
| Receipt | Trip summary | tip, rate | complete | payment error |
| Support | Issue handling | refund, report | open, resolved | stale trip |

## Functional Requirements
- Book rides from saved places or map selection.
- Display fare estimate, ETA, and cancel window before confirmation.
- Provide live driver tracking and support contact access during active trips.
- Store receipts, tips, and ride ratings.

## Data Model
- User, SavedPlace, RideRequest, RideType, Trip, Driver, Vehicle, Receipt, Rating, SupportTicket.
- RideType stores capacity, accessibility, and scheduling rules.
- Trip stores pickup/dropoff, route, cancellation, and safety metadata.

## API/Backend Contracts
- Auth: rider session, payment token, and optional contact sync.
- Reads: `/saved-places`, `/ride-types`, `/quotes`, `/trips`, `/receipts`, `/support`.
- Writes: request, cancel, tip, rate, save place, contact support.
- Realtime: driver location, match state, trip events, and support notifications.

## Realtime/Push/Offline
- Push on driver match, arrival, trip start/end, and receipt posting.
- Cache saved places and ride history locally.
- Block ride creation offline unless the app can safely queue a request.

## Permissions/Privacy/Safety
- Request location and notifications only when booking or tracking a ride.
- Offer trip-sharing, driver verification, and support escalation.
- Minimize storage of precise movement history.

## Analytics Events
- `booking_started`, `ride_type_viewed`, `ride_confirmed`, `driver_arrived`, `trip_completed`, `place_saved`, `receipt_opened`, `support_contacted`.

## Monetization
- Per-trip fees and optional membership benefits.
- Keep promotions clearly labeled.

## Acceptance Tests
- Book a ride from a saved place and confirm ETA/fare display.
- Track a live trip and verify the share-link flow.
- Test cancel-before-match and cancel-after-match fee paths.
- Open a receipt and submit a support request from it.

## Implementation Notes
- Reuse the same trip state machine pattern as other mobility products.
- Keep saved places in a first-class table because they drive repeat usage.
- Make booking confirmation idempotent to avoid duplicate rides.

