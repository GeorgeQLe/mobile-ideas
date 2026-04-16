# Surplus Food Marketplace Clone Spec

## Legal Scope
- Clone objective: reproduce surprise bag discovery, merchant pages, pickup reservation, impact tracking, and notifications.
- Must not copy: logos, merchant content, partner assets, or brand-specific social copy.
- Original replacement brand/assets: use neutral sustainability branding and original marketplace visuals.

## Product Goal
- Help customers rescue surplus food from nearby merchants with a simple reservation and pickup flow.
- Preserve the marketplace pattern: discovery, merchant page, bag reservation, pickup instructions, and impact summary.
- Verify pickup windows, bag limits, and cancellation rules from lawful product observation.

## Research Verification Checklist
- [ ] Confirm bag discovery layout, map/list browsing, and urgency cues.
- [ ] Verify reservation timing, pickup code presentation, and cancellation cutoff.
- [ ] Verify merchant onboarding fields and bag inventory management surfaces.
- [ ] Verify impact counters, ratings, and review prompts.
- [ ] Verify notification triggers for availability, reminders, and pickup deadlines.

## Core User Journeys
- User browses nearby merchants and filters by category and pickup time.
- User reserves a mystery bag and pays in-app.
- User views pickup instructions and presents a code at the merchant.
- User tracks rescued-meal impact and past reservations.
- Merchant posts available bags and manages capacity.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Discovery | Nearby surplus bags | Location, category | Available, sold out | No merchants |
| Merchant Detail | Bag and pickup info | Merchant, pickup slot | Active, closed | Capacity reached |
| Reservation | Confirm purchase | Quantity, payment | Success, failure | Validation timeout |
| Orders | Active and past pickups | Reservation list | Upcoming, past | Missed pickup |
| Impact | Food saved metrics | Counts, history | Populated, empty | Partial data |

## Functional Requirements
- Support geolocated discovery with sort by distance, urgency, and category.
- Reserve one or more bags subject to merchant capacity and per-user limits.
- Show pickup time window, pickup instructions, and order code after payment.
- Persist past reservations and impact metrics.
- Allow merchant availability updates and reservation state changes.

## Data Model
- User, Merchant, BagOffer, PickupWindow, Reservation, PaymentMethod, ImpactMetric, MerchantProfile, NotificationSetting.
- BagOffer stores category, estimated contents, capacity, and expiration time.
- Reservation stores pickup code, status, and payment snapshot.

## API/Backend Contracts
- `GET /discover?near=`, `GET /merchants/{id}`, `GET /merchants/{id}/bags`
- `POST /reservations`, `GET /reservations/{id}`, `POST /reservations/{id}/cancel`
- `POST /merchant/bags`, `PATCH /merchant/bags/{id}`, `GET /impact`
- Use idempotency for reservation and cancellation.

## Realtime/Push/Offline
- Push bag availability, reminder, cancellation, and pickup deadline events.
- Cache discovered merchants and last viewed offers for browse-only offline mode.
- Merchant inventory should sync fast enough to prevent overselling.

## Permissions/Privacy/Safety
- Request location only for nearby discovery.
- Keep pickup codes and payment tokens protected.
- Rate-limit reservation spam and automated inventory grabs.
- Show clear allergy and surprise-bag disclaimers supplied by the merchant.

## Analytics Events
- `view_discovery`, `view_merchant`, `reserve_bag`, `reservation_confirmed`, `pickup_reminder_opened`, `pickup_completed`, `impact_viewed`

## Monetization
- Revenue comes from reservation fees, merchant software plans, and promoted placement.
- Merchant-facing pricing is server-configurable.

## Acceptance Tests
- Sold-out bags cannot be reserved.
- Reservation code remains visible offline after success.
- Cancellation respects merchant cutoff time.
- Impact metrics update after pickup completion.
- Discovery page still works with cached merchant cards when offline.

## Implementation Notes
- Keep estimated contents as merchant-provided labels, not guarantees.
- Separate customer reservation flow from merchant inventory management.
- Use original sustainability copy and imagery only.
- Mark pickup timing and fee rules that need live verification.
