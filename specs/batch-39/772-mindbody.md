# Mindbody-Style Clone Spec

> Metadata
> - Inspiration app: Mindbody
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: business marketplace discovery, class capacity/waitlists, virtual streaming, partner payment splits, intro offer validation, branded app behavior, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Mindbody's public user-facing workflow. Mindbody is a fitness and wellness marketplace that connects consumers with local studios, gyms, and wellness providers. Consumers discover classes (yoga, pilates, cycling, meditation, martial arts), book sessions, purchase intro offers and class packs, attend virtual classes, and leave reviews. Businesses use Mindbody to manage schedules, capacity, pricing, instructor assignments, and client relationships.

The consumer experience is marketplace-first: browse by activity type, location, time, and price; try new studios with intro offers; build a routine across multiple providers; and track wellness activity.

## Goals

- Deliver a mobile-first fitness/wellness class marketplace with discovery, booking, virtual attendance, intro offers, and activity tracking.
- Reproduce the functional job behind Mindbody: consumer discovery of local fitness/wellness classes with frictionless booking across multiple providers.
- Support the consumer journey (discover, try, commit, track) and business operations (schedule, price, fill, retain).
- Define screens, entities, API contracts, offline behavior, privacy/safety controls, analytics, tests, and acceptance criteria.

## Non-Goals

- Do not copy Mindbody branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, or protected media.
- Do not implement real payment splitting with businesses without legal review.
- Do not stream actual fitness classes — design the virtual class UX shell for V1.
- Do not claim exact native behavior until hands-on verification records evidence.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/mindbody-fitness-wellness/id689501356 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.mindbodyonline.connect | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.mindbodyonline.com/ | Product features, business solutions, marketplace info | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://company.mindbodyonline.com/legal/privacy-policy | Data collection, sharing, retention | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://company.mindbodyonline.com/legal/terms-of-service | Usage terms, liability, disputes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Marketplace discovery**: Browse fitness/wellness classes by category (yoga, HIIT, cycling, pilates, boxing, meditation, barre, swimming), location proximity, time of day, price range, and rating. Personalized recommendations based on activity history and preferences.
- **Class detail**: View class description, instructor bio, studio location/amenities, difficulty level, duration, capacity (spots remaining), pricing options (drop-in, class pack, membership, intro offer), and reviews from past attendees.
- **Intro offers**: New clients get discounted first visits (free first class, $30 for 30 days unlimited, 5 classes for $50). Validated per-consumer-per-business, one-time use, with expiration.
- **Booking and waitlist**: Reserve spot in class with payment. If full, join waitlist with automatic promotion and notification when spot opens. Cancel with configurable refund policy.
- **Class packs and memberships**: Purchase multi-class packs (10-pack, 20-pack) or monthly memberships at specific studios. Track remaining sessions, auto-renew memberships.
- **Virtual classes**: Join live-streamed classes or watch on-demand recordings. (V1: UX shell with placeholder streaming.)
- **Activity tracking**: Log completed classes, track weekly/monthly activity, streak counter, variety metrics (how many different activity types), personal bests.
- **Reviews and ratings**: Rate classes and instructors after attending; view aggregate ratings; filter by recent, relevant, or rating.
- **Favorites and history**: Save favorite studios, instructors, and class types for quick re-booking. View full attendance history.
- **Business schedule management**: Studios manage class schedules, instructor assignments, capacity limits, pricing tiers, and intro offer configurations.

## Core User Journeys

- **New user discovers fitness classes**: Install, set location, browse categories, filter by time/distance, view class details, claim intro offer, book first class, receive confirmation with studio directions.
- **Regular user books weekly class**: Open app, view "Your Studios" or favorites, find preferred time slot, book with existing class pack, see spot confirmed, add to device calendar.
- **User tries new activity**: Browse "Explore" or "Try Something New" section, discover activity type they haven't tried, use intro offer at new studio, attend, rate experience.
- **Class is full — waitlist flow**: User attempts to book full class, offered waitlist position, receives push notification when spot opens, has limited time to confirm before spot goes to next in line.
- **Virtual class attendance**: User books virtual class, receives stream link before start time, joins live stream, class recorded for on-demand replay.
- **Activity review**: User opens profile/activity tab, views weekly stats, checks streak, sees variety breakdown, shares achievement if desired.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Explore/Home | Marketplace discovery with recommendations | location, category filter, search, time filter | personalized, first-time, location set | location denied, no results, empty area |
| Search/Filter | Detailed search with multiple filter criteria | text search, category, time, price, distance | results found, no results, loading | timeout, invalid filters |
| Class Detail | Full class info with booking action | tap book, tap waitlist, view instructor, reviews | available, full (waitlist), cancelled, past | class cancelled after viewing, price changed |
| Studio Profile | Business page with schedule, reviews, offers | browse schedule, view offers, read reviews | active, temporarily closed, new studio | studio deactivated |
| Booking Confirmation | Confirm class reservation and payment | select payment method, confirm, add to calendar | successful, pending, waitlisted | payment failed, class filled during checkout |
| My Schedule | Upcoming booked classes | view details, cancel, get directions | has bookings, empty, loading | class cancelled by studio |
| Activity/Stats | Personal fitness activity tracking | view period, filter activity type, share | has history, new user (empty), streak active | data sync error |
| Class Packs/Memberships | Purchase and manage passes | select pack, purchase, view remaining | active packs, expired, none purchased | billing failure, studio removed pack |
| Virtual Class | Live stream or on-demand video player | join stream, pause/play recording, react | live (connected), buffering, ended, on-demand | stream failure, bandwidth insufficient |
| Reviews | Rate and read class/instructor reviews | star rating, text review, helpful vote | has reviews, no reviews, own review | review removed by moderation |
| Profile/Favorites | Personal profile, saved studios, preferences | edit preferences, manage favorites, activity types | populated, new user, preferences set | sync error |
| Intro Offers | Available first-time offers at new studios | browse offers, claim, view terms | available offers, all claimed, expired | offer expired during checkout |
| Settings | Account, notifications, payment methods | edit profile, manage cards, notification prefs | complete, incomplete | payment method expired |

## Data Model

- `User`: id, email, name, avatar_url, location (lat/lng), preferred_categories, activity_streak_days, total_classes_attended, created_at.
- `Business`: id, name, type, address, coordinates, description, amenities, photos, rating_avg, review_count, is_virtual_enabled, timezone, status.
- `Instructor`: id, business_id, name, bio, photo_url, specialties, rating_avg, certifications.
- `ClassDefinition`: id, business_id, name, description, category, difficulty (beginner/intermediate/advanced), duration_minutes, capacity, is_virtual, equipment_needed.
- `ClassSession`: id, class_definition_id, instructor_id, start_time, end_time, capacity, spots_remaining, status (scheduled/in_progress/completed/cancelled), virtual_stream_url.
- `Booking`: id, user_id, class_session_id, status (confirmed/waitlisted/attended/cancelled/no_show), payment_method, amount_paid_cents, pack_session_used_id, booked_at, cancelled_at.
- `Waitlist`: id, user_id, class_session_id, position, status (waiting/promoted/expired/cancelled), promoted_at, expires_at.
- `IntroOffer`: id, business_id, name, description, offer_type (free_class/discounted_pack/unlimited_period), price_cents, original_price_cents, sessions_included, valid_days, max_claims.
- `ClaimedOffer`: id, user_id, intro_offer_id, claimed_at, expires_at, sessions_remaining, status (active/used/expired).
- `ClassPack`: id, business_id, name, sessions_total, price_cents, valid_days, applicable_classes (class_definition_ids).
- `UserClassPack`: id, user_id, class_pack_id, sessions_remaining, purchased_at, expires_at, status.
- `Membership`: id, business_id, name, price_cents, billing_cycle, included_classes, unlimited (boolean).
- `UserMembership`: id, user_id, membership_id, status (active/paused/cancelled), next_billing_at, classes_used_this_cycle.
- `Review`: id, user_id, class_session_id, business_id, instructor_id, rating, text, helpful_count, status, created_at.
- `ActivityLog`: id, user_id, class_session_id, category, duration_minutes, calories_estimate, completed_at.
- `Favorite`: id, user_id, target_type (business/instructor/class_definition), target_id, created_at.
- `Payment`: id, user_id, amount_cents, type (booking/pack/membership/intro_offer), reference_id, status, processed_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup`, `POST /auth/recover`, social OAuth (Google, Apple, Facebook).
- Discovery: `GET /marketplace/classes?lat&lng&radius&category&time_start&time_end&price_max&difficulty`, `GET /marketplace/studios?lat&lng&category`.
- Classes: `GET /classes/:id`, `GET /studios/:id/schedule?date_range`, `GET /classes/:id/reviews`.
- Booking: `POST /classes/:session_id/book`, `POST /classes/:session_id/waitlist`, `DELETE /bookings/:id` (cancel), `POST /bookings/:id/confirm-promotion` (waitlist promoted).
- Offers: `GET /marketplace/intro-offers?lat&lng`, `POST /intro-offers/:id/claim`, `GET /users/me/offers`.
- Packs/Memberships: `GET /studios/:id/packs`, `POST /packs/:id/purchase`, `GET /studios/:id/memberships`, `POST /memberships/:id/subscribe`.
- Activity: `GET /users/me/activity?period`, `GET /users/me/stats`, `GET /users/me/streak`.
- Reviews: `POST /bookings/:id/review`, `GET /studios/:id/reviews`, `GET /instructors/:id/reviews`.
- Favorites: `GET /users/me/favorites`, `POST /users/me/favorites`, `DELETE /users/me/favorites/:id`.
- Virtual: `GET /classes/:session_id/stream-url` (authenticated, time-limited), `GET /studios/:id/on-demand`.
- Business (admin): `POST /studios/:id/classes`, `PUT /class-sessions/:id`, `POST /studios/:id/intro-offers`, `GET /studios/:id/analytics`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache upcoming bookings, favorite studios, and recent activity for offline viewing.
- Booking requires connectivity (real-time capacity check); show cached schedule with "verify availability" prompt offline.
- Push: booking confirmation, class reminder (2h and 30min before), waitlist promotion (with expiry countdown), class cancelled by studio, intro offer expiring.
- Realtime: spots_remaining updates on class detail page via WebSocket; waitlist position updates.
- Virtual class streaming requires persistent connection; show reconnection UI on drop; recording available after live ends.
- Background: sync activity log, refresh upcoming bookings, update streak counter.

## Permissions, Privacy, And Safety

- **Location**: Required for marketplace proximity search; fallback to manual city/zip entry if denied.
- **Payment data**: PCI-compliant tokenized storage; never log card details.
- **Health/fitness data**: Activity logs are user-private; never share across businesses; optional HealthKit/Google Fit export with explicit consent.
- **Reviews**: Moderation for harassment/spam; business cannot delete unfavorable reviews; only platform can remove for policy violation.
- **Intro offer fraud**: One intro offer per consumer per business; identity verification if repeat claims detected.
- **Child safety**: If classes include minors, require parental consent and restrict instructor direct messaging.
- Minimize PII in analytics; do not track precise class attendance patterns as behavioral profile without consent.

## Analytics And Monetization

- Discovery events: `marketplace_viewed`, `category_filtered`, `class_detail_opened`, `studio_profile_viewed`, `intro_offer_viewed`.
- Booking events: `booking_started`, `booking_completed`, `booking_cancelled`, `waitlist_joined`, `waitlist_promoted`.
- Engagement events: `class_attended`, `review_submitted`, `favorite_added`, `activity_viewed`, `streak_milestone`.
- Revenue events: `intro_offer_claimed`, `class_pack_purchased`, `membership_started`, `membership_renewed`, `membership_cancelled`.
- Monetization: platform takes percentage of bookings/packs/memberships processed through marketplace; businesses pay subscription for listing visibility and tools. Do not copy Mindbody's exact commission rates.

## Edge Cases

- Class cancelled after booking — auto-refund or credit, notify user, suggest alternatives.
- Waitlist promotion expires — spot released to next person; user notified of missed opportunity.
- Intro offer claimed but never used before expiration — no refund for free offers; paid offers follow refund policy.
- Studio closes permanently — cancel all future bookings, refund unused packs/memberships, archive reviews.
- User books at capacity-1, another user gets last spot milliseconds earlier — graceful "class just filled" with waitlist offer.
- Membership billing failure — grace period (3 days), retry, suspend booking ability if unresolved, notify user.
- Virtual class technical failure — auto-refund or credit if stream down >5 minutes, recording made available.
- Review bombing — rate-limit reviews per user, flag suspicious patterns, require verified attendance.
- Timezone confusion — always display class times in studio's local timezone with user's timezone noted if different.

## Test Plan

- Unit tests: availability/capacity calculation, waitlist promotion logic, intro offer eligibility validation, streak calculation, timezone conversion.
- Integration tests: full booking flow (discover -> book -> attend -> review), waitlist promotion end-to-end, intro offer claim-to-use, membership billing cycle.
- Contract tests: marketplace API pagination/filtering, booking endpoint capacity enforcement, waitlist promotion timing.
- Offline tests: cached bookings display, booking blocked offline, activity history viewable offline.
- Permission tests: consumer data isolation between studios, review visibility rules, instructor access limits.
- Safety tests: intro offer fraud detection, review moderation, minor attendance safeguards.
- Accessibility tests: marketplace filterable via VoiceOver, booking flow completable with assistive tech, virtual class controls accessible.
- Billing tests: pack purchase, membership auto-renewal, refund on cancellation, intro offer payment.

## Acceptance Criteria

- Consumer can discover classes by category/location/time, view details with capacity info, and book with one tap from detail page.
- Waitlist functions correctly: user joins, gets promoted when spot opens, has limited confirmation window, spot passes to next if expired.
- Intro offers are validated per-consumer-per-business and cannot be re-claimed.
- Activity tracking accurately reflects attended classes with streak and variety metrics.
- Virtual class UX shell is complete (join, view, reconnect states) even if actual streaming is deferred.
- Businesses can manage schedules, pricing, and capacity from admin endpoints.
- At least 12 acceptance tests cover: discovery, booking, waitlist, intro offers, class packs, memberships, virtual class, activity tracking, reviews, offline behavior, accessibility, and data export.

## Open Questions

- How does Mindbody calculate personalized recommendations (collaborative filtering, activity history, or editorial)?
- What is the exact waitlist promotion window timing (minutes to confirm)?
- How are virtual class recordings stored and for how long are they available?
- What happens to class packs purchased at a studio that leaves the platform?

## Build Plan

- Phase 1: Verify URLs, document marketplace features from public listings and help center.
- Phase 2: Build marketplace discovery, search/filter, and class detail pages.
- Phase 3: Implement booking flow with capacity enforcement, waitlist system, and payment.
- Phase 4: Add intro offers, class packs, and membership purchase/management.
- Phase 5: Build activity tracking, streak system, reviews, and favorites.
- Phase 6: Design virtual class UX shell with streaming placeholder.
- Phase 7: Implement business admin schedule/pricing management.
- Phase 8: Add offline support, accessibility, and comprehensive test suite.
- Phase 9: Conduct hands-on verification and resolve blockers.

## Next Steps

- Test Mindbody consumer app with a free account to document discovery UX and booking flow.
- Research waitlist mechanics and timing from public help documentation.
- Design original UI for class marketplace and booking confirmation.
- Extend downstream repo-seeding manifest after this spec is confirmed implementation-ready.
