# Hopper-Style Clone Spec

## Legal Scope
- Clone objective: travel search with price prediction, watchlists, flexible dates, alerts, and optional booking add-ons.
- Must not copy: Hopper branding, proprietary prediction models, or supplier contracts.
- Original replacement brand: original travel product identity and neutral copy.

## Product Goal
- Help travelers decide when to book by showing price trends and alerts.
- Make watchlists and flexible date exploration the core discovery loop.
- Keep any add-on or protection product separate and legally reviewable.

## Research Verification Checklist
- Verify prediction presentation, watchlist order, and flexible date UI.
- Verify alert cadence, freeze/hold concepts, and any rebooking flows.
- Verify which booking categories are actually supported in the clone scope.
- Verification status: not yet verified.

## Core User Journeys
- Search a route or stay and inspect price history or forecast.
- Save a trip to a watchlist and receive alerts when conditions change.
- Pick flexible dates and compare cheapest options.
- Purchase a booking or hold product if scope permits.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find travel | origin, destination, dates | results, none | no forecast |
| Forecast | Price insight | watch, remove | predicted, stale | insufficient data |
| Flexible Dates | Compare day ranges | date range, cabin/stay | loaded, sparse | low inventory |
| Watchlist | Saved trips | add, edit, alert | active, empty | duplicate watch |
| Deal Detail | Offer summary | book, hold | available, expired | price change |
| Booking | Purchase flow | payment, traveler info | ready, failed | supplier reject |
| Alerts | Notification center | open, dismiss | new, read | throttled |

## Functional Requirements
- Price history and forecast display based on owned or licensed market data.
- Watchlist creation with alert thresholds and frequency control.
- Flexible date comparison for lowest fare or stay price.
- Optional booking hold/freeze flow with explicit expiry and fees.

## Data Model
- SearchRoute, SearchStay, PricePoint, PriceForecast, Watchlist, AlertRule, BookingHold, BookingRequest, TravelerProfile.
- Forecast stores confidence and data freshness to avoid false precision.
- Watchlist stores trigger conditions and notification channel.

## API/Backend Contracts
- Auth: traveler account with notification token.
- Reads: `/search`, `/forecast`, `/flex-dates`, `/watchlists`, `/alerts`, `/bookings`.
- Writes: add/remove watch, create hold, book, dismiss alert, update alert rule.
- Realtime: price updates, inventory changes, alert dispatch, hold expiry.

## Realtime/Push/Offline
- Push on watch threshold crossing and booking-hold expiry.
- Cache the latest forecast and watchlist for offline review.
- Require refresh before final booking because prices are volatile.

## Permissions/Privacy/Safety
- Request notifications only after the user creates a watch.
- Explain that forecasts are probabilistic and can change.
- Add clear cancellation and refund messaging around any hold product.

## Analytics Events
- `search_run`, `forecast_viewed`, `watchlist_added`, `alert_fired`, `flex_dates_opened`, `hold_started`, `booking_started`, `booking_completed`.

## Monetization
- Affiliate or commission revenue on booked travel.
- Optional protection or hold fees must be explicit and separately consented.

## Acceptance Tests
- Search a route, view forecast, and add it to a watchlist.
- Trigger a mock price drop and verify alert delivery.
- Open flexible dates and confirm cheapest-day ranking changes.
- Start a hold flow, expire it, and confirm expiry state is visible.

## Implementation Notes
- Keep forecast data separate from transaction data so stale predictions do not corrupt bookings.
- Ensure alert throttling is testable and configurable per destination.
- Present uncertainty plainly; do not overstate prediction accuracy.

