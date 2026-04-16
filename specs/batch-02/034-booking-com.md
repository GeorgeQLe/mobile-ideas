# Booking.com-Style Clone Spec

## Legal Scope
- Clone objective: hotel and lodging search with filters, room selection, reservation management, loyalty pricing, reviews, and cancellation policy display.
- Must not copy: Booking.com branding, proprietary inventory feeds, or third-party review content.
- Original replacement brand: independent travel booking identity and original copy.

## Product Goal
- Let travelers search, compare, and reserve accommodations with transparent pricing.
- Surface flexible cancellation, room details, and loyalty pricing without brand mimicry.
- Keep the backend centered on owned reservation and content data.

## Research Verification Checklist
- Verify search filters, map/list presentation, room selection, and booking confirmation order.
- Verify loyalty price surfacing, review placement, and cancellation rule display.
- Verify whether flights, car rentals, or attraction add-ons are in scope.
- Verification status: not yet researched.

## Core User Journeys
- Search a city, dates, and guest count, then filter the results.
- Open a property, compare rooms, and reserve the best option.
- Manage an existing reservation and review cancellation rules.
- Reopen past searches and saved stays.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find properties | city, dates, guests, filters | results, none | sold out |
| Results | Compare options | map, sort, filters | loaded, empty | stale prices |
| Property | Detail view | room, amenities, reserve | open, unavailable | invalid dates |
| Room Select | Choose rate | board, cancel policy | available, blocked | price changed |
| Checkout | Complete booking | guest info, payment | ready, failed | card decline |
| Reservation | Manage stay | modify, cancel, contact | upcoming, active | policy locked |
| Reviews | Inspect quality | read, sort | populated | no reviews |

## Functional Requirements
- Search by destination, dates, guests, property type, and amenity filters.
- Show per-room pricing, taxes, fees, and cancellation policy before purchase.
- Reservation management for modify, cancel, and contact property actions.
- Loyalty-aware pricing and badges if enabled by product rules.

## Data Model
- Property, RoomRate, Reservation, GuestProfile, Review, Amenity, CancellationPolicy, LoyaltyTier, SearchQuery.
- Reservation stores stay dates, room type, payment state, and modification eligibility.
- SearchQuery stores filters and location for reuse.

## API/Backend Contracts
- Auth: guest session for saved items and reservations.
- Reads: `/search`, `/properties/{id}`, `/room-rates`, `/reservations`, `/reviews`, `/loyalty`.
- Writes: reserve, modify, cancel, save search, contact property, submit review.
- Realtime: inventory changes, reservation status, and messaging if property chat is supported.

## Realtime/Push/Offline
- Push booking confirmation, cancellation changes, and pre-arrival reminders.
- Cache recent searches and reservations offline.
- Price and availability must refresh on reconnect before final booking.

## Permissions/Privacy/Safety
- Request notifications only for trip reminders.
- Keep guest personal data minimal and expose clear cancellation rules.
- Support fraud reporting and suspicious booking detection.

## Analytics Events
- `search_run`, `result_opened`, `property_opened`, `room_selected`, `booking_started`, `reservation_confirmed`, `reservation_modified`, `review_opened`.

## Monetization
- Commission per booking plus partner placement where clearly labeled.
- Premium membership can expose better rates or perks if product strategy requires it.

## Acceptance Tests
- Search a city, filter by cancellation, and reserve a room.
- Modify a reservation and verify policy enforcement.
- Cache a reservation locally and reopen it offline.
- Open a property with stale prices and confirm refresh before checkout.

## Implementation Notes
- Pricing is a backend responsibility; never trust client-side totals alone.
- Keep availability and cancellation logic testable with deterministic fixtures.
- Preserve separate models for property, room rate, and reservation because they change independently.

