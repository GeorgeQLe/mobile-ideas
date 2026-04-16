# Turo-Style Clone Spec

## Legal Scope
- Clone objective: peer-to-peer car sharing marketplace with listings, calendars, booking, messaging, insurance options, and reviews.
- Must not copy: brand marks, proprietary ranking, host programs, or licensed insurance products.
- Original replacement brand: new marketplace identity and owned content only.

## Product Goal
- Help guests discover cars, book trips, message hosts, and manage pickup and return.
- Help hosts manage availability, trip approvals, and vehicle details.
- Support optional protection plans as a separate legal and underwriting layer.

## Research Verification Checklist
- Verify search filters, listing card layout, trip request flow, and host approval mechanics.
- Verify whether instant-book, delivery, and add-on options are in scope.
- Verify document requirements, deposit handling, and review timing.
- Verification status: pending research.

## Core User Journeys
- Search vehicles, compare listings, and request a trip.
- Host approves or declines, then guest receives pickup instructions.
- Exchange messages, add protection, and complete pickup and return.
- Leave reviews, settle charges, and manage disputes if needed.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find cars | dates, location, filters | results, none | no availability |
| Listing | Vehicle detail | reserve, message, save | open, unavailable | stale photos |
| Trip Request | Book a car | dates, add-ons | pending, approved | declined |
| Host Inbox | Approvals and chat | accept, decline, message | queued, resolved | spam |
| Pickup | Handoff instructions | photos, notes | ready, delayed | no-show |
| Trip | Active rental | extend, support | ongoing, ended | damage claim |
| Reviews | Post-trip feedback | rating, text | saved | dispute open |

## Functional Requirements
- Search with location, date range, vehicle class, price, transmission, and trip length filters.
- Listing detail with photos, host response data, mileage rules, and pricing breakdown.
- Host approval workflow or instant booking where allowed.
- Messaging and trip status updates for pickup, extension, and return.

## Data Model
- Host, Guest, VehicleListing, AvailabilitySlot, TripRequest, TripReservation, MessageThread, ProtectionPlan, Review, Claim.
- AvailabilitySlot should resolve conflicts against booked trips and maintenance blocks.
- Claim captures damage reports, timestamps, and supporting media metadata.

## API/Backend Contracts
- Auth: guest and host roles with separate authorization scopes.
- Reads: `/listings`, `/search`, `/trips`, `/messages`, `/availability`, `/reviews`, `/claims`.
- Writes: create listing, request trip, approve/decline, send message, extend trip, submit claim.
- Realtime: message delivery, approval state, trip reminders, and pickup/return notifications.

## Realtime/Push/Offline
- Push on trip request, host reply, upcoming pickup, extension decision, and return reminder.
- Cache saved searches and recently viewed listings offline.
- Messaging drafts should queue when network returns.

## Permissions/Privacy/Safety
- Request location, camera, notifications, and identity verification only when relevant.
- Add damage reporting, host/guest blocking, and dispute escalation surfaces.
- Keep personal document uploads secured and expiring when no longer needed.

## Analytics Events
- `search_performed`, `listing_opened`, `trip_requested`, `trip_approved`, `message_sent`, `pickup_started`, `trip_completed`, `review_submitted`, `claim_opened`.

## Monetization
- Marketplace service fee plus optional protection plan margin.
- Host upsells can include delivery or enhanced placement if clearly labeled.

## Acceptance Tests
- Search cars across a date range and request a trip.
- Approve the request on the host side and confirm pickup instructions appear.
- Send a message, extend the trip, and verify state sync.
- Submit a damage claim and ensure it attaches the required evidence.

## Implementation Notes
- The booking calendar must be conflict-safe and tested under concurrent requests.
- Keep host and guest roles isolated at the authorization layer.
- Treat messaging as a trip-scoped feature rather than a generic inbox.

