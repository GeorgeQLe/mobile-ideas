# Phase 20: Implementation — Travel & Transportation (~84 Apps × 5 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all five variants for every app in the Travel & Transportation cluster.

**Scope**:
- Apps (86 reconciled): Airlines (24), Hotels & Accommodation (20), Travel Booking & Planning (9), Ride-Hailing & Micromobility (9), Transit & Navigation (6), Car Rental (5), Parking & EV Charging (6), Vehicle Connectivity (7).
- Shared patterns: search/filter with dates/locations, booking flows, itinerary management, real-time vehicle tracking, boarding passes, maps integration, loyalty programs, check-in flows, route planning, fare comparison.

**Acceptance Criteria:**
- [x] Exact Phase 20 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness (86 apps, 2026-06-04).
- [ ] All Phase 20 apps have 5 working variants each or explicit local/toolchain/provider/booking/transit/vehicle/regulatory blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Search, booking, and itinerary flows, transit/navigation surfaces, ride-hailing/vehicle tracking, loyalty/rewards, and check-in/boarding flows are functional across variants or explicitly blocked by local/provider/regulatory constraints.
- [ ] Category-specific risk review for travel booking, airline operations, ride-hailing, transit, vehicle connectivity, parking/EV, and location/mapping features is documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share booking, calendar, map, itinerary, loyalty, and check-in patterns. Airline operations, ride-hailing dispatch, real-time vehicle tracking, transit data feeds, parking meters, EV charging sessions, and vehicle telematics must stay blocked until verified with lawful provider/device/regulatory access.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, travel/transport/location/regulatory blocker review

### Implementation

- [x] Step 20.1: Reconcile exact Travel & Transportation app inventory and downstream readiness (86 apps verified 2026-06-04)
  - Reconcile all ~84 apps across IDs 026-037 (batch-02), 523-546 (batch-27), 541-560 (batch-28), 561-580 (batch-29), 581-596 (batch-30).
  - Serial GitHub API verification: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  - Record pre/post rate-limit evidence.
  - Classify risk groups: airlines, hotels/accommodation, travel booking/OTA, ride-hailing/micromobility, public transit/navigation, car rental, parking/EV charging, vehicle connectivity, travel reviews.
  - Document carry-forward blockers: airline reservation systems (GDS/PSS), hotel PMS/CRS, OTA booking engines, payment processing, ride-hailing dispatch, real-time GPS/vehicle tracking, transit data feeds (GTFS), map/geocoding APIs, car rental fleet management, parking meter APIs, EV charging protocols (OCPP), vehicle telematics (OBD-II/CAN bus), loyalty programs, check-in/boarding pass generation, identity verification, and regulated transportation features.

  **Acceptance Criteria:**
  - Inventory of all Phase 20 apps with IDs, names, repo slugs, spec paths, and downstream repo status.
  - All repos verified PRIVATE with required artifacts.
  - Risk groups and blocker posture documented.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`.

- [x] Step 20.2: First Travel & Transportation implementation tranche — Ride-Hailing, Transit & Navigation (15 apps, completed 2026-06-04)
  - **Apps:** Google Maps (026), Apple Maps (027), Waze (028), Uber (029), Lyft (030), Lime (031), Turo (032), Transit (571), Citymapper (572), Moovit (573), Curb (574), Via (575), Bolt (576), FREE NOW (577), BlaBlaCar (578).

  **What to Build:**
  Original static prototypes (`index.html`, `package.json`, `src/styles.css`, `src/app.js`) for each of the 15 downstream repos covering:
  - Maps/navigation (Google Maps, Apple Maps, Waze): map view placeholder, search/directions, turn-by-turn placeholder, traffic/incidents, saved places, offline maps, speed cameras (Waze), community reports
  - Ride-hailing (Uber, Lyft, Curb, Bolt, FREE NOW): ride request flow, vehicle selection, fare estimate, driver/vehicle info, trip tracking placeholder, payment methods, ride history, ratings, scheduled rides
  - Micromobility (Lime): vehicle map, unlock flow, ride tracking, pricing, ride history
  - Car sharing (Turo): vehicle listings, search/filter, booking flow, host dashboard, trip details, insurance placeholder
  - Carpooling (Via, BlaBlaCar): ride matching, route/schedule, booking, passenger management
  - Transit (Transit, Citymapper, Moovit): real-time arrivals placeholder, route planning, multi-modal directions, transit map, service alerts, trip planner
  - All apps: explicit blockers for maps/geocoding APIs, real-time GPS, ride dispatch, payment processing, transit data feeds (GTFS-RT), vehicle IoT, and regulatory features

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. For each of the 15 repos, serially: clone to /tmp, read source spec for app-specific features, create prototype files (`index.html`, `package.json`, `src/styles.css`, `src/app.js`), run `npm run check`, commit, push, verify via `gh api` (PRIVATE, main, README, spec, commit, no-workflows).
  3. `gh api rate_limit` — record post-scan evidence.
  4. Update `tasks/todo.md` (mark step complete), `tasks/repo-seeding.md` (add implementation log entry), `tasks/history.md` (append session record).

  **Repo slugs (15):**
  `google-maps-mobile-clone`, `apple-maps-mobile-clone`, `waze-mobile-clone`, `uber-mobile-clone`, `lyft-mobile-clone`, `lime-mobile-clone`, `turo-mobile-clone`, `transit-mobile-clone`, `citymapper-mobile-clone`, `moovit-mobile-clone`, `curb-mobile-clone`, `via-mobile-clone`, `bolt-mobile-clone`, `free-now-mobile-clone`, `blablacar-mobile-clone`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 15 repos have `index.html`, `package.json`, `src/styles.css`, `src/app.js` committed and pushed.
  - `npm run check` passes in each repo.
  - Each repo verified PRIVATE with all required artifacts via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific blockers documented per app.

  **Ship-one-step handoff:** Implement only Step 20.2, validate it, then run `/ship` when done.

  **Files:** downstream repos (15), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [ ] Step 20.3: Second Travel & Transportation implementation tranche — Airlines (24 apps)
  - **Apps:** Delta (523), United Airlines (524), American Airlines (525), Southwest Airlines (526), JetBlue (527), Alaska Airlines (528), Spirit Airlines (529), Frontier Airlines (530), Hawaiian Airlines (531), Air Canada (532), British Airways (533), Lufthansa (534), Air France (535), KLM (536), Emirates (537), Qatar Airways (538), Singapore Airlines (539), Turkish Airlines (540), Ryanair (541), easyJet (542), Wizz Air (543), ANA (544), JAL (545), Cathay Pacific (546).

  **What to Build:**
  Original static prototypes (`index.html`, `package.json`, `src/styles.css`, `src/app.js`) for each of the 24 airline downstream repos covering:
  - Flight search and booking flow with origin/destination, dates, cabin class, passengers
  - Booking management with PNR/confirmation, seat selection, upgrade options
  - Check-in flow with boarding pass generation placeholder
  - Flight status and real-time tracking placeholder
  - Loyalty/frequent flyer program with miles/points, tier status, redemption
  - In-flight services placeholder (entertainment, Wi-Fi, meal selection)
  - Baggage tracking placeholder
  - Airport maps and lounge finder
  - Carrier-specific: low-cost carrier (Spirit, Frontier, Ryanair, easyJet, Wizz Air) ancillary upsells, premium carrier (Emirates, Qatar, Singapore) premium services, alliance benefits (Star Alliance, oneworld, SkyTeam)
  - Explicit blockers for GDS/PSS reservation systems, payment processing, check-in/boarding pass, real-time flight data, loyalty program engines, baggage systems, and airline regulatory compliance
  - All apps: unique brand-themed color scheme matching airline identity

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Read source specs from `specs/batch-27/` (523–546) for carrier-specific features.
  3. Write a Node.js generator script at `/tmp/generate-airline-prototypes.mjs` defining all 24 airlines with carrier-specific data (flight routes, loyalty programs, cabin classes, alliance membership, low-cost vs premium features).
  4. For each of the 24 repos, serially: clone to /tmp, create prototype files (`index.html`, `package.json`, `src/styles.css`, `src/app.js`), run `npm run check`, commit, push, verify via `gh api` (PRIVATE, main, README, spec, commit, no-workflows).
  5. `gh api rate_limit` — record post-scan evidence.
  6. Update `tasks/todo.md` (mark step complete), `tasks/repo-seeding.md` (add implementation log entry), `tasks/history.md` (append session record).

  **Repo slugs (24):**
  `delta-mobile-clone`, `united-airlines-mobile-clone`, `american-airlines-mobile-clone`, `southwest-airlines-mobile-clone`, `jetblue-mobile-clone`, `alaska-airlines-mobile-clone`, `spirit-airlines-mobile-clone`, `frontier-airlines-mobile-clone`, `hawaiian-airlines-mobile-clone`, `air-canada-mobile-clone`, `british-airways-mobile-clone`, `lufthansa-mobile-clone`, `air-france-mobile-clone`, `klm-mobile-clone`, `emirates-mobile-clone`, `qatar-airways-mobile-clone`, `singapore-airlines-mobile-clone`, `turkish-airlines-mobile-clone`, `ryanair-mobile-clone`, `easyjet-mobile-clone`, `wizz-air-mobile-clone`, `ana-mobile-clone`, `jal-mobile-clone`, `cathay-pacific-mobile-clone`

  **Source specs:** `specs/batch-27/523-delta.md` through `specs/batch-27/546-cathay-pacific.md`

  **Carrier groups:**
  - US legacy (Delta, United, American, Southwest, JetBlue, Alaska, Hawaiian): SkyMiles/MileagePlus/AAdvantage, first/business/economy+, alliance benefits
  - US ultra-low-cost (Spirit, Frontier): bare fare + ancillary upsells (bags, seats, bundles), no loyalty tiers
  - Canadian/European legacy (Air Canada, British Airways, Lufthansa, Air France, KLM): Aeroplan/Avios/Miles&More/FlyingBlue, multi-cabin, alliance networks
  - Middle East premium (Emirates, Qatar): Skywards/Privilege Club, first/business suites, chauffeur, lounge
  - Asian premium (Singapore, ANA, JAL, Cathay Pacific): KrisFlyer/ANA Mileage Club/JAL Mileage Bank/Asia Miles, premium economy, in-flight chef
  - European low-cost (Ryanair, easyJet, Wizz Air): bare fare + priority/bags/seats, WIZZ Go/Plus bundles
  - Turkish (Turkish Airlines): Miles&Smiles, Star Alliance, Istanbul hub

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 24 repos have `index.html`, `package.json`, `src/styles.css`, `src/app.js` committed and pushed.
  - `npm run check` passes in each repo.
  - Each repo verified PRIVATE with all required artifacts via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific blockers documented per airline (GDS/PSS, payment, check-in, flight data, loyalty, baggage, regulatory).
  - Carrier-specific features: alliance membership, cabin class structure, loyalty program, LCC ancillary upsells, premium services.

  **Ship-one-step handoff:** Implement only Step 20.3, validate it, then run `/ship` when done.

  **Files:** downstream repos (24), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [ ] Step 20.4: Third Travel & Transportation implementation tranche — Hotels & Accommodation (20 apps)
  - **Apps:** Marriott Bonvoy (547), Hilton Honors (548), Hyatt (549), IHG One Rewards (550), Wyndham Hotels (551), Choice Hotels (552), Accor ALL (553), Hotels.com (554), Booking.com (034), Vrbo (555), Airbnb (033), Hostelworld (556), Couchsurfing (557), Klook (558), GetYourGuide (559), Viator (560), Roadtrippers (570), Tripadvisor (561), HotelTonight (569), Agoda (567).

  **What to Build:**
  Original static prototypes for each of the 20 hotel/accommodation/activity apps covering:
  - Hotel chains (Marriott, Hilton, Hyatt, IHG, Wyndham, Choice, Accor): property search, room booking, mobile check-in/key placeholder, loyalty program with points/tier, room preferences, special requests
  - OTA/meta-search (Hotels.com, Booking.com, Agoda, HotelTonight, Tripadvisor): property search/filter, price comparison, guest reviews, booking management, last-minute deals
  - Vacation rentals (Airbnb, Vrbo): listing search, property detail with photos/amenities, host messaging, booking/payment placeholder, reviews, hosting dashboard
  - Hostels (Hostelworld): hostel search, dorm/private room selection, social features
  - Social travel (Couchsurfing): host finder, request to stay, community events, references
  - Activities (Klook, GetYourGuide, Viator): activity/tour search, booking, voucher/ticket, reviews
  - Trip planning (Roadtrippers): route planner, points of interest, road trip itinerary
  - Explicit blockers for hotel PMS/CRS, OTA booking engines, payment processing, mobile key (BLE/NFC), loyalty engines, property listing verification, and hospitality regulatory compliance

  **Files:** downstream repos (20), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [ ] Step 20.5: Fourth Travel & Transportation implementation tranche — Travel Booking, Car Rental, Parking, EV & Vehicles (25 apps)
  - **Apps:** Expedia (035), Hopper (036), TripIt (037), Rome2Rio (562), Skyscanner (563), KAYAK (564), momondo (565), Priceline (566), trivago (568), Zipcar (579), Getaround (580), Enterprise Rent-A-Car (581), Hertz (582), Avis (583), SpotHero (584), ParkMobile (585), Passport Parking (586), PlugShare (587), ChargePoint (588), Electrify America (589), Tesla (590), FordPass (591), myChevrolet (592), Toyota (593), Hyundai Bluelink (594), BMW (595), Mercedes me (596).

  **Note:** This tranche has 27 apps (not 25) — adjusted to include all remaining apps.

  **What to Build:**
  Original static prototypes for each of the 27 remaining travel/transport apps covering:
  - Travel booking/OTA (Expedia, Hopper, Priceline, Skyscanner, KAYAK, momondo, trivago, Rome2Rio): multi-modal search (flights, hotels, cars, packages), price alerts/predictions (Hopper), fare comparison, booking management
  - Trip management (TripIt): itinerary aggregation, email parsing placeholder, travel timeline, flight/hotel/car details, sharing
  - Car rental (Zipcar, Getaround, Enterprise, Hertz, Avis): vehicle search, reservation, keyless unlock placeholder (Zipcar/Getaround), fleet availability, pickup/return, loyalty programs
  - Parking (SpotHero, ParkMobile, Passport Parking): parking search by location, reservation/payment, session management, meter extension
  - EV charging (PlugShare, ChargePoint, Electrify America): station finder with map, connector types, real-time availability placeholder, charging session, payment, station reviews
  - Vehicle connectivity (Tesla, FordPass, myChevrolet, Toyota, Hyundai Bluelink, BMW, Mercedes me): vehicle status (battery/fuel, range, tire pressure), remote commands (lock/unlock, climate, horn), trip history, service scheduling, charging management (EV models), OTA update placeholder
  - Explicit blockers for OTA/GDS integration, car rental fleet systems, parking meter APIs, EV charging protocols (OCPP/OCPI), vehicle telematics (OBD-II, CAN bus, manufacturer APIs), payment processing, and automotive regulatory compliance

  **Files:** downstream repos (27), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

### Milestone: Phase 20 — Travel & Transportation Complete
**Acceptance Criteria:**
- [ ] Exact Phase 20 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 20 apps have 5 working variants each or explicit local/toolchain/provider/booking/transit/vehicle/regulatory blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Search, booking, and itinerary flows, transit/navigation surfaces, ride-hailing/vehicle tracking, loyalty/rewards, and check-in/boarding flows are functional across variants or explicitly blocked by local/provider/regulatory constraints.
- [ ] Category-specific risk review for travel booking, airline operations, ride-hailing, transit, vehicle connectivity, parking/EV, and location/mapping features is documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 19 archive: `tasks/phases/phase-19.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
