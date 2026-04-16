# Uber-Style Clone Spec

## Legal Scope
- Clone objective: on-demand rideshare booking, dispatch, trip tracking, payments, and ratings.
- Must not copy: branding, driver marketplace internals, routing IP, or proprietary pricing logic.
- Original replacement brand: distinct mobility brand, colors, copy, and icons.

## Product Goal
- Let riders request a ride, get matched, track arrival, ride, pay, and rate.
- Provide driver and rider states that are easy to reconcile in real time.
- Include safety and support surfaces without copying exact marketplace details.

## Research Verification Checklist
- Verify rider home layout, pickup selection behavior, fare estimate presentation, and trip tracking state.
- Verify whether scheduled rides, multi-stop trips, and shared rides are in scope.
- Verify driver app split or role switch behavior if one app serves both sides.
- Verification status: pending research.

## Core User Journeys
- Set pickup and dropoff, compare ride products, and request a ride.
- Track driver arrival, verify vehicle details, and begin the trip.
- Share trip status, contact support, and leave a rating after completion.
- Review receipts, past rides, and payment methods.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Set trip | pickup, dropoff | idle, quoting | permission denied |
| Fare Select | Choose product | ride type, options | available, surge | no cars |
| Matching | Dispatch search | confirm, cancel | searching, matched | timeout |
| Trip Track | Live ride state | share, support | en route, active | driver cancel |
| Payment | Checkout | card, tip | authorized, paid | payment fail |
| Receipt | Trip summary | rate, report | complete | dispute |
| Safety | Emergency controls | share, report | available | offline help |

## Functional Requirements
- Search and select pickup/dropoff by map pin or address.
- Fare estimate before request with ETA and product selection.
- Live driver tracking, chat or calling where allowed, and status transitions.
- Payment capture, tipping, receipt storage, and post-trip rating.

## Data Model
- Rider, Driver, Vehicle, RideRequest, Trip, FareQuote, PaymentMethod, Receipt, Rating, SupportCase.
- RideRequest stores pickup/dropoff, product, quote expiry, and match status.
- Trip stores route polyline, timestamps, cancellation reason, and safety flags.

## API/Backend Contracts
- Auth: rider session plus optional driver session.
- Reads: `/rides/quote`, `/rides/{id}`, `/receipts`, `/payment-methods`, `/support`.
- Writes: request ride, cancel, accept match, start/end trip, pay, tip, rate, report issue.
- Realtime: matching, driver ETA, trip progress, and support escalation events.

## Realtime/Push/Offline
- Push on match, driver arrival, trip start/end, and receipt availability.
- Preserve trip history offline, but block new requests without network and payment verification.
- Use idempotent ride requests to prevent duplicate bookings.

## Permissions/Privacy/Safety
- Request location, contacts, notifications, and microphone only when user actions require them.
- Show vehicle, driver identity, and trip-sharing safety surfaces.
- Provide emergency support and abuse reporting from active trip screens.

## Analytics Events
- `ride_quote_requested`, `ride_requested`, `driver_matched`, `pickup_started`, `trip_started`, `trip_completed`, `tip_added`, `ride_rated`, `support_opened`.

## Monetization
- Commission on completed trips plus rider service fees.
- Optional subscription for discounted rides or premium support.

## Acceptance Tests
- Request a ride, match to a driver, and complete the trip end to end.
- Cancel before matching and after matching to verify the right fee state.
- Deny location access and confirm the app explains the limitation clearly.
- Add a payment method, tip, and verify receipt storage.

## Implementation Notes
- Model the ride lifecycle as a strict state machine.
- Keep the quote response separate from trip creation so price expiry can be tested.
- Use server-generated event timestamps to avoid client clock drift.

