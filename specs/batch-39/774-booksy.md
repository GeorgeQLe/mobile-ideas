# Booksy-Style Clone Spec

> Metadata
> - Inspiration app: Booksy
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: professional verification, review moderation, boost/promotion payment, mobile check-in flow, portfolio showcase, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Booksy's public user-facing workflow. Booksy is a barber and salon appointment booking platform focused on the barbering community, with strong emphasis on professional portfolios (before/after photos), mobile check-in, client reviews, and "Boost" visibility features for professionals to attract new clients. The platform connects clients with barbers, stylists, and beauty professionals through a marketplace that highlights work quality via photo portfolios.

Booksy differentiates through its focus on the barber/grooming segment, professional identity and portfolio features, and the mobile-first check-in experience that reduces front-desk friction.

## Goals

- Deliver a mobile-first barber/salon booking platform with portfolio-driven discovery, mobile check-in, reviews, and professional visibility tools.
- Reproduce Booksy's functional model: connect clients to barbers/stylists through work-quality showcases and frictionless mobile booking.
- Support professional identity (portfolio, reviews, specialties) as the primary discovery signal over business brand alone.
- Define complete data model, API contracts, and test plan for implementation-ready V1.

## Non-Goals

- Do not copy Booksy branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not implement real payment processing without PCI compliance review.
- Do not replicate Booksy's exact boost pricing or algorithm.
- Do not claim exact native behavior until hands-on verification.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/booksy-for-customers/id1065004752 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.booksy.app | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://booksy.com/ | Product features, professional signup, marketplace | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://booksy.com/privacy-policy | Data practices, retention, sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://booksy.com/terms-conditions | Usage terms, liability, disputes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Client marketplace**: Discover barbers, stylists, and beauty professionals by location, specialty (fade, braids, beard trim, color, extensions), rating, portfolio quality, availability, and price. Search emphasizes individual professionals over business establishments.
- **Professional profiles**: Portfolio gallery (before/after photos, style showcases), specialties, years of experience, certifications, service menu with pricing, reviews, availability calendar, and booking action.
- **Portfolio showcase**: Professionals upload photos of their work organized by style/service type. Clients browse portfolios to assess quality before booking. High-quality portfolios rank higher in search.
- **Mobile check-in**: Client arrives at barbershop, opens app, taps "I'm Here" — professional receives notification that client has arrived. Reduces front-desk overhead for busy shops. Optional: estimated wait time display.
- **Booking flow**: Select professional, choose service, pick available time slot, add payment method (optional deposit), confirm. Support for walk-in queue alongside scheduled appointments.
- **Reviews and ratings**: Post-appointment reviews with star rating, text, and optional photos of the result. Reviews tied to specific services. Professionals can respond.
- **Boost visibility**: Professionals pay to appear higher in search results for their area/specialty. Budget-based with impression/booking tracking.
- **Client management**: Professional views client history, preferences, notes (preferred fade length, usual products), and rebooking patterns.
- **Notifications and reminders**: Booking confirmations, appointment reminders, professional updates (new portfolio photos, availability changes), and rebooking suggestions.
- **Walk-in queue**: Professionals can enable a walk-in mode showing estimated wait time; clients can join the queue remotely and receive notification when their turn approaches.

## Core User Journeys

- **Client finds a barber**: Opens app, searches "Barber near me," browses results sorted by rating and portfolio quality, taps a professional to view their work gallery, likes the fade styles shown, books a "Skin Fade" for Saturday 10am.
- **Client checks in**: Arrives at barbershop on appointment day, opens app, sees "Your appointment is now" banner, taps "I'm Here," barber sees notification on their device, calls client to the chair.
- **Client leaves review with photo**: After haircut, client is prompted to review, takes a photo of the fresh cut, rates 5 stars, writes "Best fade in the city," photo added to professional's portfolio (with consent).
- **Professional builds portfolio**: After completing a great haircut, takes before/after photos, uploads to their portfolio organized under "Fades" category, adds description, posts.
- **Professional boosts visibility**: Notices fewer new clients this month, opens Boost section, sets $50/week budget for "Barbers in [City]" category, activates boost, monitors impressions and bookings.
- **Walk-in flow**: Client is in the area, checks app for barbers accepting walk-ins, sees 15-minute estimated wait at nearby shop, joins walk-in queue remotely, receives "Your turn in 5 min" notification, walks over.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Explore/Search | Client discovery of professionals | location, specialty filter, search text | results loaded, loading, first-time | location denied, no pros nearby, offline |
| Professional Profile | Portfolio, services, reviews, and booking | scroll gallery, tap service, tap book | full profile, new pro (few photos), top-rated | pro deactivated, stale availability |
| Portfolio Gallery | Full-screen photo browsing by category | swipe, tap category, zoom | populated, minimal, loading | photos failed to load |
| Booking Flow | Service/time selection and confirmation | select service, pick time, add card | available slots, limited, no same-day | slot taken, card declined, pro unavailable |
| Mobile Check-in | Client arrival confirmation | tap "I'm Here," view wait status | appointment now, early arrival, late | no appointment found, location mismatch |
| Walk-in Queue | Remote queue joining and status | tap join queue, view position, ETA | queue open, full, your turn approaching | queue closed, pro went offline |
| My Appointments | Client upcoming and past bookings | view, cancel, reschedule, rebook | has bookings, empty state | cancelled by pro |
| Reviews | Read and write post-appointment reviews | star rating, text, photo upload | prompt after appointment, browse reviews | upload failed, moderation rejected |
| Pro Dashboard | Professional home: today's schedule, metrics | view appointments, manage walk-ins, stats | busy day, empty, notifications | sync error |
| Pro Calendar | Professional schedule management | add block, set availability, view bookings | booked, available, blocked, recurring | conflict, offline |
| Pro Portfolio Mgmt | Upload and organize portfolio photos | upload photos, add categories, reorder | populated, empty (new pro), upload in progress | upload failed, storage limit |
| Boost | Visibility promotion management | set budget, choose area, activate/pause | active boost, paused, no boost | budget depleted, low performance |
| Client Notes | Professional's notes on specific clients | edit notes, view preferences, history | returning client, new client | sync conflict |
| Settings | Account, notifications, payment methods | edit profile, manage cards, notification prefs | complete, incomplete | subscription expired |

## Data Model

- `User`: id, email, phone, name, role (client/professional), avatar_url, location, status, created_at.
- `Professional`: id, user_id, display_name, bio, specialties (array), years_experience, certifications, location_id, rating_avg, review_count, portfolio_count, is_boost_active, accepts_walkins, status.
- `Location` (business/shop): id, name, address, coordinates, phone, opening_hours (jsonb), professionals (array of pro_ids).
- `PortfolioItem`: id, professional_id, photo_url, category (fade/braids/color/beard/etc.), description, service_id, before_photo_url, client_photo_consent, likes_count, created_at.
- `Service`: id, professional_id, name, description, duration_minutes, price_cents, category, is_active.
- `Appointment`: id, professional_id, client_id, service_id, start_time, end_time, status (booked/checked_in/in_progress/completed/cancelled/no_show), source (app/walkin), check_in_time, notes.
- `WalkInQueue`: id, professional_id, client_id, position, estimated_wait_minutes, status (waiting/called/serving/completed/left), joined_at.
- `Review`: id, professional_id, client_id, appointment_id, service_id, rating, text, photo_urls, professional_response, status (published/pending/removed), created_at.
- `ClientNote`: id, professional_id, client_id, content, preferences (jsonb: preferred_length, products, allergies), last_updated.
- `Boost`: id, professional_id, budget_cents, spent_cents, area_radius_km, target_specialties, status (active/paused/depleted/ended), impressions, bookings_attributed, started_at, ends_at.
- `Availability`: id, professional_id, day_of_week, start_time, end_time, is_recurring, override_date, type (available/break/off).
- `Reminder`: id, appointment_id, type (confirmation/reminder/review_request/rebooking), channel, scheduled_at, sent_at.
- `Payment`: id, appointment_id, client_id, amount_cents, tip_cents, method, status, processed_at.
- `AuditEvent`: id, actor_id, action, resource_type, resource_id, metadata, created_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup`, `POST /auth/recover`.
- Discovery: `GET /marketplace/professionals?lat&lng&radius&specialty&rating_min&available_today&accepts_walkins`, `GET /professionals/:id/profile`.
- Portfolio: `GET /professionals/:id/portfolio?category`, `POST /professionals/:id/portfolio` (upload), `DELETE /portfolio/:id`.
- Services: `GET /professionals/:id/services`, `POST /professionals/:id/services`, `PUT /services/:id`.
- Availability: `GET /professionals/:id/availability?date_range`, `PUT /professionals/:id/availability`.
- Appointments: `POST /professionals/:id/appointments`, `PUT /appointments/:id`, `POST /appointments/:id/check-in`, `POST /appointments/:id/complete`.
- Walk-ins: `GET /professionals/:id/walkin-queue`, `POST /professionals/:id/walkin-queue/join`, `PUT /walkin-queue/:id/status`.
- Reviews: `GET /professionals/:id/reviews`, `POST /appointments/:id/review`, `PUT /reviews/:id/respond`.
- Boost: `GET /professionals/:id/boost`, `POST /professionals/:id/boost`, `PUT /boost/:id` (pause/resume/update budget).
- Client notes: `GET /professionals/:id/clients/:client_id/notes`, `PUT /professionals/:id/clients/:client_id/notes`.
- Payments: `POST /appointments/:id/payment`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache professional's daily schedule, client notes, and portfolio offline.
- Client: cache upcoming appointments and favorite professionals offline; booking requires connectivity.
- Push: check-in notification (to professional), appointment reminder (to client), walk-in queue position update, new review received, boost performance weekly summary.
- Realtime: walk-in queue position updates via WebSocket; check-in status visible to professional immediately.
- Portfolio photo uploads queue in background; show progress indicator; retry on failure.
- Offline check-in: if client has no connectivity at shop, professional can manually mark as arrived.

## Permissions, Privacy, And Safety

- **Portfolio photos**: Client photo consent required before professional posts client images; client can request removal at any time.
- **Client notes**: Private to the professional; not visible to client; excluded from client data export unless legally required.
- **Reviews**: Only verified appointment completers can review; moderation for harassment/discrimination; professional can respond but not delete.
- **Location**: Required for proximity discovery; fallback to city search if denied.
- **Payment data**: Tokenized; PCI compliant; never stored in app.
- **Professional verification**: Professionals self-attest qualifications; platform does not verify licenses (noted in terms); flagging for impersonation.
- **Boost fairness**: Boosted results labeled as "Featured" or equivalent; organic results still visible; no pay-to-suppress competitors.
- Camera for portfolio uploads; notifications for check-in/reminders.

## Analytics And Monetization

- Discovery events: `search_performed`, `profile_viewed`, `portfolio_browsed`, `service_viewed`.
- Booking events: `appointment_booked`, `check_in_completed`, `appointment_completed`, `walkin_queue_joined`.
- Engagement events: `portfolio_uploaded`, `review_submitted`, `review_responded`, `client_note_updated`.
- Revenue events: `boost_activated`, `boost_impression`, `boost_booking_attributed`, `payment_processed`.
- Monetization: professional subscription for platform access + optional boost spend for increased visibility. Do not copy Booksy's exact subscription or boost pricing.

## Edge Cases

- Client checks in but professional is running behind — display wait time, offer "still on the way" option for client to browse.
- Walk-in queue client doesn't arrive when called — mark as "didn't show," advance queue, notify next person.
- Portfolio photo reported as inappropriate — remove immediately pending review; notify professional.
- Professional deactivates mid-day with existing appointments — notify affected clients, offer rebooking with other pros at same location.
- Boost budget depletes mid-day — stop showing boosted results immediately; notify professional; no over-charge.
- Review contains identifiable client photo without consent — moderation removes photo; text review preserved if policy-compliant.
- Concurrent booking for last slot — first confirmed wins; second gets next available or waitlist.
- Client disputes charge (no-show fee) — freeze charge, create case, professional provides evidence (check-in status).
- Professional with zero portfolio photos — still listed but ranked lower; prompt to add photos during onboarding.

## Test Plan

- Unit tests: availability slot generation, walk-in wait time estimation, boost budget depletion calculation, review eligibility validation.
- Integration tests: full booking-to-review flow, check-in notification delivery, walk-in queue lifecycle, boost activation-to-attribution.
- Contract tests: discovery API ranking consistency, portfolio upload and retrieval, check-in status propagation.
- Offline tests: cached schedule display, portfolio upload queuing, check-in fallback for connectivity loss.
- Permission tests: client note privacy, portfolio photo consent enforcement, review eligibility (verified appointments only).
- Safety tests: portfolio photo moderation, review content policy, professional impersonation detection.
- Accessibility tests: portfolio gallery navigable via VoiceOver, booking and check-in completable with assistive tech.
- Billing tests: boost budget tracking accuracy, subscription lifecycle, payment processing.

## Acceptance Criteria

- Client can discover professionals by location/specialty, browse portfolios, and book based on work quality evidence.
- Mobile check-in works: client taps "I'm Here," professional sees notification immediately.
- Walk-in queue accurately estimates wait time and notifies clients when their turn approaches.
- Portfolio system supports categorized before/after photos with client consent tracking.
- Boost system increases visibility measurably with transparent budget tracking and labeled results.
- Reviews are tied to verified appointments and include optional result photos.
- At least 12 acceptance tests cover: discovery/search, portfolio browsing, booking, check-in, walk-in queue, reviews with photos, boost activation, client notes, professional onboarding, offline behavior, accessibility, and data export.

## Open Questions

- How does Booksy's check-in work with multiple clients arriving simultaneously?
- What is the exact boost algorithm (impressions-based, clicks-based, or bookings-based billing)?
- How does Booksy handle professionals who work at multiple locations?
- Is there a minimum portfolio size required for marketplace visibility?

## Build Plan

- Phase 1: Verify URLs, document features from public app store listings and website.
- Phase 2: Build client marketplace discovery with professional profiles and portfolio galleries.
- Phase 3: Implement booking flow with service selection and availability checking.
- Phase 4: Build mobile check-in system with real-time notifications.
- Phase 5: Add walk-in queue with estimated wait times and remote joining.
- Phase 6: Implement portfolio management, photo upload, and consent tracking.
- Phase 7: Build review system with photo attachments and professional responses.
- Phase 8: Add boost/visibility promotion with budget tracking and performance metrics.
- Phase 9: Implement offline support, accessibility, and comprehensive test suite.
- Phase 10: Conduct hands-on verification and resolve blockers.

## Next Steps

- Download Booksy client app to document marketplace UX and check-in flow.
- Research boost pricing model from public professional signup pages.
- Design original UI for portfolio-driven discovery and mobile check-in.
- Extend downstream repo-seeding manifest after spec confirmed implementation-ready.
