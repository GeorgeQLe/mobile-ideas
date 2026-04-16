# Airbnb-Style Clone Spec

## Legal Scope
- Clone objective: lodging marketplace with search, map/list results, listing detail, booking, wishlists, messaging, and trip management.
- Must not copy: brand assets, proprietary recommendation systems, host verification details, or copyrighted guest media.
- Original replacement brand: neutral travel marketplace identity and original content.

## Product Goal
- Help guests discover stays, compare fees, book reservations, and manage trips.
- Help hosts manage availability, guest communication, and policies.
- Support original commerce flow with owned content and explicit legal boundaries.

## Research Verification Checklist
- Verify search filters, result card hierarchy, booking calendar, and fee presentation.
- Verify host messaging, wishlist behavior, and trip management states.
- Verify whether experiences, long stays, or split stays are in scope.
- Verification status: pending lawful research.

## Core User Journeys
- Search for lodging, inspect listings, and book a stay.
- Save listings to wishlists and share them.
- Chat with host, review check-in details, and manage the reservation.
- Host updates availability, responds to guests, and sees booking status.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find stays | location, dates, guests, filters | results, none | ambiguous city |
| Map/List | Compare results | tap card, map pin | loaded, empty | stale price |
| Listing | Detail and booking | reserve, wishlist, message | open, unavailable | calendar conflict |
| Checkout | Confirm reservation | payment, guests | ready, failed | fee mismatch |
| Trip | Reservation hub | check-in, cancel, support | upcoming, active | host change |
| Messages | Guest-host chat | text, images | active | spam |
| Host Calendar | Availability control | open, block dates | synced | overlap |

## Functional Requirements
- Search by destination, dates, guests, property type, and amenity filters.
- Show nightly rate, cleaning fee, taxes, and total cost before booking.
- Support wishlists, booking confirmation, trip details, and cancellation policy display.
- Host side must manage availability and message guests from the reservation.

## Data Model
- Listing, Host, Guest, AvailabilityWindow, Reservation, Wishlist, MessageThread, FeeBreakdown, Review, Policy.
- Reservation stores check-in/out, guest count, cancellation policy, and payment state.
- Listing stores address privacy level and amenity inventory.

## API/Backend Contracts
- Auth: guest and host sessions with role-based scopes.
- Reads: `/search`, `/listings/{id}`, `/reservations`, `/wishlists`, `/messages`, `/host-calendar`.
- Writes: create listing, reserve, cancel, message, save wishlist, block dates, submit review.
- Realtime: reservation state, message delivery, and host availability updates.

## Realtime/Push/Offline
- Push on booking confirmation, host message, check-in reminders, and cancellation changes.
- Cache recent trips, wishlists, and saved searches offline.
- Messaging drafts and support notes should queue when offline.

## Permissions/Privacy/Safety
- Request location, camera, and notifications only when needed.
- Hide exact address until booking policy allows disclosure.
- Include abuse reporting, party prevention, and suspicious booking review flows.

## Analytics Events
- `search_run`, `listing_opened`, `wishlist_saved`, `checkout_started`, `reservation_created`, `host_replied`, `trip_opened`, `review_submitted`.

## Monetization
- Host service fees and guest booking fees.
- Optional boosted listing or professional hosting tools.

## Acceptance Tests
- Search a destination, open a listing, and complete checkout.
- Save a listing to a wishlist and share it.
- Exchange messages with host and confirm push notifications work.
- Cancel within policy and verify fee presentation matches the configured rules.

## Implementation Notes
- Build fee math as a shared service because it appears in search, listing, and checkout.
- Keep host calendar authoritative and prevent double-booking.
- Treat review timing as a separate state from trip completion.
