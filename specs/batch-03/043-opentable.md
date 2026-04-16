# Reservation Booking Clone Spec

## Legal Scope
- Clone objective: reproduce restaurant discovery, reservation search, booking, waitlist, diner profile, and review prompt flows.
- Must not copy: trademarks, restaurant partner assets, review text, or proprietary ranking logic.
- Original replacement brand/assets: use neutral reservation branding, original map pins, and seeded restaurant data.

## Product Goal
- Help diners find a table, book a reservation, manage upcoming plans, and maintain a trustworthy profile.
- Preserve the core structure: search, list/map browse, restaurant page, reservations, profile, and rewards.
- Verification is required for actual availability rules, deposit behavior, and waitlist thresholds.

## Research Verification Checklist
- [ ] Confirm booking flow, guest count handling, and reservation timing increments.
- [ ] Verify waitlist entry, quote updates, and seating-ready notifications.
- [ ] Verify diner profile data fields and reservation history surfaces.
- [ ] Verify points or perks program visibility and eligibility rules.
- [ ] Verify cancellation policy display and no-show handling.

## Core User Journeys
- User searches by cuisine, date, time, and party size.
- User compares restaurant cards, opens a detail page, and books a reservation.
- User joins a waitlist when no slot is available.
- User views upcoming reservations, modifies time, or cancels.
- User leaves a post-dining feedback or review prompt.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Search | Find availability | Date, time, party size | Results, none, loading | No matches |
| Restaurant Detail | Menu, photos, and slots | Restaurant, notes | Open, booked, waitlist | Deposit required |
| Reservation Flow | Confirm booking | Party size, time, contact | Success, validation fail | Special request rejected |
| Trips | Manage upcoming plans | Reservation list | Upcoming, past, cancelled | Time zone mismatch |
| Profile | Diner identity and perks | Name, contact, preferences | Verified, incomplete | Duplicate profile |

## Functional Requirements
- Support search filters for cuisine, price, neighborhood, seating type, and dietary tags.
- Store upcoming and past reservations with change/cancel actions.
- Support special requests, seating notes, and accessibility preferences.
- Convert no-slot results into waitlist or alternative-time suggestions.
- Show confirmation code, cancellation policy, and reminder schedule after booking.

## Data Model
- DinerProfile, Restaurant, TableSlot, Reservation, WaitlistEntry, ReviewPrompt, PerkAccount, SavedPreference, NotificationPreference.
- Reservation stores party size, service time, special requests, and policy snapshot.
- TableSlot stores capacity, duration, buffer time, and bookable status.

## API/Backend Contracts
- `GET /search?date=&time=&party=`, `GET /restaurants/{id}`
- `POST /reservations`, `PATCH /reservations/{id}`, `DELETE /reservations/{id}`
- `POST /waitlist`, `GET /me/reservations`, `GET /me/profile`
- `POST /review-prompts/{reservationId}/respond`
- Require strict server-side availability checks at booking time.

## Realtime/Push/Offline
- Push confirmation, reminder, change, cancellation, and waitlist-ready events.
- Cache search preferences and recent restaurant views offline.
- Live slot refresh should degrade to polling when push or websocket support is unavailable.

## Permissions/Privacy/Safety
- Request location only for nearby search and optional map centering.
- Protect contact details, reservation history, and special-request notes.
- Rate-limit booking and cancellation attempts to reduce bot abuse.
- Show clear policy text before submission.

## Analytics Events
- `search_availability`, `view_restaurant`, `start_reservation`, `book_reservation`, `join_waitlist`, `modify_reservation`, `cancel_reservation`, `review_prompt_shown`

## Monetization
- Revenue comes from partner reservations, premium diner perks, and promoted placement.
- Perk tiers and sponsored ranking must stay server-configurable.

## Acceptance Tests
- Search returns zero-state with alternative suggestions when no tables match.
- Booking rejects stale slots after a background availability refresh.
- Waitlist entry sends a readiness notification when a table opens.
- Reservation modification preserves policy and time zone correctness.
- Offline mode preserves saved searches but not live availability.

## Implementation Notes
- Keep search ranking and availability separate so future tuning does not change booking correctness.
- Model restaurant time zones explicitly.
- Use original branded UI copy, not partner wording.
- Mark policy, perk, and seating behavior that still needs live verification.
