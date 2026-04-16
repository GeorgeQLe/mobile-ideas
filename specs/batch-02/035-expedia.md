# Expedia-Style Clone Spec

## Legal Scope
- Clone objective: travel booking hub for flights, hotels, cars, itinerary management, loyalty, and alerts.
- Must not copy: Expedia branding, supplier contracts, or proprietary packaging logic.
- Original replacement brand: neutral travel platform identity and owned content.

## Product Goal
- Give travelers one place to search, bundle, book, and manage trips.
- Support flight, hotel, and car components with a shared itinerary wallet.
- Keep loyalty and price tracking visible without mimicking source UI.

## Research Verification Checklist
- Verify bundle flow order, itinerary presentation, and loyalty placement.
- Verify whether package protection, seat selection, and car extras are in scope.
- Verify price-watch and alert behavior from lawful public observation.
- Verification status: pending research.

## Core User Journeys
- Search one or more trip components and compare bundled prices.
- Book a trip and keep all confirmations in a unified itinerary.
- Watch a price, receive alert updates, and revisit the booking later.
- Cancel or modify a component and see downstream itinerary impact.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Start planning | trip type, search | idle, loaded | no internet |
| Flight Search | Air travel search | origin, destination, dates | results, none | sold out |
| Hotel Search | Lodging search | city, dates, guests | results, none | no inventory |
| Car Search | Rental search | location, dates | results, none | age restriction |
| Bundle | Multi-product checkout | select all, continue | pricing, failed | supplier mismatch |
| Itinerary | Trip wallet | open, share, modify | upcoming, past | stale status |
| Price Watch | Track deals | alert, remove | active, expired | data delayed |

## Functional Requirements
- Separate search modes for flight, hotel, and car, plus a bundle path.
- Unified itinerary view for confirmations, receipts, and change status.
- Price alerts and trip reminders.
- Loyalty and support entry points from itinerary and account areas.

## Data Model
- Trip, FlightSegment, HotelStay, CarRental, BookingReference, ItineraryItem, PriceWatch, LoyaltyBalance, SupportCase.
- Trip aggregates multiple booking references and supplier states.
- PriceWatch stores route, dates, threshold, and alert channel.

## API/Backend Contracts
- Auth: traveler session plus optional loyalty account linkage.
- Reads: `/search/flights`, `/search/hotels`, `/search/cars`, `/itinerary`, `/price-watches`, `/loyalty`.
- Writes: create booking, cancel, modify, add price watch, open support case, share itinerary.
- Realtime: supplier status updates, alerts, payment confirmations, and itinerary sync.

## Realtime/Push/Offline
- Push on booking confirmations, schedule changes, and price alerts.
- Cache itinerary, recent searches, and confirmation numbers locally.
- Support flow should retain the last-known trip state offline.

## Permissions/Privacy/Safety
- Request notifications for trip alerts only after opt-in.
- Protect passport and payment data with scoped access and expiring uploads.
- Add fraud, duplicate booking, and supplier-mismatch checks.

## Analytics Events
- `search_started`, `bundle_viewed`, `booking_created`, `itinerary_opened`, `price_watch_added`, `alert_received`, `trip_modified`, `support_opened`.

## Monetization
- Commission and package margin on travel bookings.
- Loyalty tiers can influence surfaced benefits and upsells.

## Acceptance Tests
- Search flights, hotel, and car, then create a bundle booking.
- Add a price watch and verify alert generation.
- Open itinerary offline and confirm recent data remains visible.
- Modify one component and verify the itinerary reflects the update.

## Implementation Notes
- Keep supplier adapters isolated so each travel component can fail independently.
- Use a shared itinerary model across flight, hotel, and car features.
- Treat alert timing as business-critical and test it with controlled clocks.

