# StyleSeat-Style Clone Spec

> Metadata
> - Inspiration app: StyleSeat
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: instant payment processing, professional verification, client matching, marketing automation, cancellation protection fees, native iOS/Android screen capture, account lifecycle walkthrough.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by StyleSeat's public user-facing workflow. StyleSeat is a beauty professional booking and payment platform that emphasizes instant pay for professionals (get paid immediately after appointments, not on a delayed schedule), client management, marketing tools to fill empty slots, and a consumer marketplace for discovering beauty professionals.

StyleSeat positions itself as a business-empowerment platform for independent beauty professionals (hairstylists, barbers, nail techs, estheticians, makeup artists) who work as independent contractors or booth renters. Key differentiators: instant earnings access, cancellation protection fees, smart pricing suggestions, and automated marketing to fill schedule gaps.

## Goals

- Deliver a mobile-first beauty professional booking platform with instant pay, cancellation protection, client management, and smart marketing.
- Reproduce StyleSeat's functional model: empower independent beauty professionals with business tools and instant earnings access.
- Support both perspectives: professional (manage bookings, get paid instantly, market services) and client (discover, book, pay, review).
- Define complete data model, API contracts, and test plan for implementation-ready V1.

## Non-Goals

- Do not copy StyleSeat branding, logos, screenshots, marketing copy, private APIs, or proprietary datasets.
- Do not implement real instant payment disbursement without banking compliance review.
- Do not replicate StyleSeat's exact fee structure or pricing algorithms.
- Do not claim exact native behavior until hands-on verification.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/styleseat/id454564010 | iOS listing, privacy labels, release notes | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=com.styleseat.android | Android listing, data safety, feature blurbs | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official website | https://www.styleseat.com/ | Product features, professional signup, marketplace | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://www.styleseat.com/privacy | Data practices, retention, sharing | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://www.styleseat.com/terms | Usage terms, payment terms, liability | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- **Consumer marketplace**: Discover beauty professionals by location, service type (hair, nails, lashes, makeup, brows, skincare, barbering), rating, portfolio, price range, and availability.
- **Professional profiles**: Portfolio photos, service menu with pricing, reviews, availability, years of experience, "About Me" bio, and booking action. Emphasis on individual professional identity over salon brand.
- **Booking flow**: Select professional, choose service(s), pick date/time, add payment method (required for booking to enable cancellation protection), confirm. Client charged after appointment completion.
- **Instant pay**: After completing an appointment and client payment is processed, professional receives funds immediately (same-day) rather than standard bank processing delays. Platform takes a fee for instant access.
- **Cancellation protection**: Client pays a protection fee at booking; if they cancel within policy window or no-show, professional keeps the protection fee as compensation for lost income. Reduces no-show rates.
- **Smart pricing**: Platform suggests optimal pricing based on location, experience level, service type, demand patterns, and competitor rates. Professionals can accept, modify, or ignore suggestions.
- **Marketing automation**: "Fill My Chair" feature — when professional has open slots approaching, system automatically sends offers/reminders to past clients or exposes deals in marketplace.
- **Client management**: Client list with visit history, preferences, spending patterns, automatic reminders for rebooking, and personalized messaging.
- **Earnings dashboard**: Real-time revenue tracking, tips, cancellation fee income, transaction history, instant vs. standard payout selection, tax summary.
- **Professional verification**: Identity verification and optional license/certification upload for marketplace trust signals.

## Core User Journeys

- **Client books beauty appointment**: Opens app, browses "Hairstylists near me," filters by availability this week, views professional's portfolio and reviews, selects "Highlights + Cut" service, picks Thursday 2pm, adds card (required), confirms with cancellation protection fee noted.
- **Professional completes appointment and gets paid**: Client arrives, service performed, professional marks appointment complete in app, client's card charged, professional sees funds available for instant transfer, taps "Get Paid Now," money in account within hours.
- **Client cancels late — protection kicks in**: Client cancels 2 hours before appointment (within protection window), cancellation protection fee charged to client, professional receives fee, slot freed for potential walk-in or marketing push.
- **Fill My Chair automation**: Professional has empty 3pm slot tomorrow, system detects gap, sends "Special offer: 15% off color services tomorrow" to 5 most-likely-to-book past clients, client accepts, slot filled.
- **Smart pricing suggestion**: New professional sets up services, platform analyzes comparable professionals in area, suggests "$85 for Women's Cut" based on location and experience, professional adjusts to $80 and saves.
- **Professional onboarding**: Downloads app, creates profile, uploads portfolio photos, sets services with pricing (guided by smart pricing), sets availability, completes identity verification, publishes to marketplace.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Explore/Search | Client discovery of beauty professionals | location, service type, filters, search | results loaded, personalized, first-time | location denied, no results, offline |
| Professional Profile | Portfolio, services, reviews, and booking | scroll gallery, tap book, read reviews | full profile, new pro, verified badge | pro inactive, stale availability |
| Booking Flow | Service/time selection with protection fee | service select, time, card, confirm | available, protection fee shown | slot taken, card declined, pro cancelled |
| My Appointments | Client bookings and history | view, cancel, reschedule | upcoming, past, empty | cancelled by pro |
| Pro Dashboard | Professional home: earnings, today's schedule | view earnings, manage schedule, respond to bookings | active day, empty, pending payments | payout error, sync issue |
| Earnings | Revenue tracking and payout management | view history, request instant pay, tax summary | funds available, pending, paid out | instant pay failed, minimum not met |
| Pro Calendar | Availability and appointment management | set hours, view bookings, block time | booked, available, auto-marketing active | conflict, offline |
| Portfolio Mgmt | Upload and curate professional portfolio | upload photos, categorize, reorder, delete | populated, empty (new), upload in progress | upload failed, storage limit |
| Fill My Chair | Marketing automation for empty slots | enable/disable, set discount, choose audience | active gaps found, no gaps, campaign sent | no response, client declined |
| Smart Pricing | Pricing suggestions and market comparison | view suggestions, accept/modify, compare | suggestions available, no data (new area) | insufficient data |
| Client List | Professional's client management | search, view history, send message | returning clients, new, flagged no-shows | offline, sync error |
| Reviews | Read/respond to reviews | star rating, text, photo | published, pending, own response | moderation removed |
| Cancellation Protection | Explain/manage protection policy | view policy, adjust window, view collected fees | active policy, disabled, fee collected | dispute in progress |
| Settings | Account, payout, verification, notifications | edit profile, banking info, verify identity | verified, unverified, payout setup needed | verification failed |

## Data Model

- `User`: id, email, phone, name, role (client/professional), avatar_url, location, status, created_at.
- `Professional`: id, user_id, display_name, bio, specialties (array), years_experience, license_number, is_verified, rating_avg, review_count, portfolio_count, instant_pay_enabled, cancellation_protection_enabled, status.
- `Service`: id, professional_id, name, description, category, duration_minutes, price_cents, smart_price_suggestion_cents, is_active.
- `PortfolioItem`: id, professional_id, photo_url, category, description, service_id, created_at.
- `Availability`: id, professional_id, day_of_week, start_time, end_time, is_recurring, override_date, type (available/break/off).
- `Appointment`: id, professional_id, client_id, services (array), start_time, end_time, status (booked/confirmed/completed/cancelled_by_client/cancelled_by_pro/no_show), protection_fee_cents, protection_collected, source (marketplace/direct/fill_my_chair).
- `CancellationPolicy`: id, professional_id, protection_fee_cents, window_hours (cancellation within this window triggers fee), no_show_fee_cents, is_enabled.
- `Payment`: id, appointment_id, client_id, professional_id, service_amount_cents, tip_cents, protection_fee_cents, platform_fee_cents, total_charged_cents, professional_earnings_cents, status (pending/completed/refunded/disputed), payout_status (pending/instant_requested/paid), processed_at.
- `Payout`: id, professional_id, amount_cents, type (instant/standard), status (pending/processing/completed/failed), requested_at, completed_at, fee_cents.
- `FillMyChair`: id, professional_id, gap_start_time, gap_end_time, discount_percent, target_clients (array of client_ids), message, status (sent/viewed/booked/expired), created_at.
- `SmartPricingSuggestion`: id, professional_id, service_id, suggested_price_cents, market_average_cents, percentile_rank, factors (jsonb), generated_at.
- `Client`: id, professional_id, user_id, name, email, phone, notes, last_visit_at, total_visits, total_spent_cents, no_show_count, tags.
- `Review`: id, professional_id, client_id, appointment_id, rating, text, photo_urls, response_text, status, created_at.
- `Verification`: id, professional_id, type (identity/license/certification), document_url, status (pending/approved/rejected), verified_at.
- `AuditEvent`: id, actor_id, action, resource_type, resource_id, metadata, created_at.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/signup`, `POST /auth/recover`.
- Discovery: `GET /marketplace/professionals?lat&lng&radius&service_type&rating_min&available&price_range`, `GET /professionals/:id/profile`.
- Portfolio: `GET /professionals/:id/portfolio`, `POST /professionals/:id/portfolio`, `DELETE /portfolio/:id`.
- Services: `GET /professionals/:id/services`, `POST /professionals/:id/services`, `PUT /services/:id`.
- Availability: `GET /professionals/:id/availability?date_range`.
- Appointments: `POST /professionals/:id/appointments`, `PUT /appointments/:id`, `POST /appointments/:id/complete`, `POST /appointments/:id/cancel`.
- Payments: `POST /appointments/:id/charge`, `GET /professionals/:id/earnings?period`, `POST /professionals/:id/payouts` (request instant).
- Fill My Chair: `GET /professionals/:id/gaps`, `POST /professionals/:id/fill-my-chair`, `GET /professionals/:id/fill-my-chair/history`.
- Smart Pricing: `GET /professionals/:id/pricing-suggestions`, `PUT /services/:id/price`.
- Reviews: `GET /professionals/:id/reviews`, `POST /appointments/:id/review`, `PUT /reviews/:id/respond`.
- Clients: `GET /professionals/:id/clients`, `PUT /professionals/:id/clients/:client_id`, `POST /professionals/:id/clients/:client_id/message`.
- Verification: `POST /professionals/:id/verification`, `GET /professionals/:id/verification/status`.
- Cancellation: `GET /professionals/:id/cancellation-policy`, `PUT /professionals/:id/cancellation-policy`.
- Privacy: `POST /data-export`, `DELETE /account`.

## Realtime, Push, And Offline Behavior

- Cache professional's daily schedule, client list, and earnings summary offline.
- Client: cache upcoming bookings and favorites offline; booking requires connectivity.
- Push: new booking received, appointment reminder, cancellation and fee collected, instant pay completed, fill-my-chair response, new review.
- Realtime: earnings update after appointment completion; calendar refresh on new booking.
- Background: process fill-my-chair campaigns at scheduled times; calculate smart pricing updates periodically.
- Offline: view schedule and client info; block payments, payouts, and bookings.

## Permissions, Privacy, And Safety

- **Instant pay banking**: Bank account verification required; PCI/financial compliance; never log full account numbers.
- **Cancellation protection**: Clear disclosure at booking time; client must acknowledge fee before confirming; dispute path available.
- **Client data**: Professional-scoped; client info visible only to the professional they booked with.
- **Smart pricing**: Suggestions are advisory; professional always has final control; competitor pricing anonymized.
- **Verification documents**: Identity documents encrypted at rest; not accessible to other users; deleted after verification.
- **Reviews**: Verified attendance required; moderation for harassment; professional can respond but not delete.
- **Fill My Chair**: Marketing sent only to clients who have opted in to promotional messages.
- Location for discovery; camera for portfolio; notifications for bookings/payments.

## Analytics And Monetization

- Professional events: `profile_created`, `verification_completed`, `first_booking_received`, `instant_pay_requested`, `fill_my_chair_activated`.
- Booking events: `appointment_booked`, `appointment_completed`, `cancellation_protection_triggered`, `no_show_recorded`.
- Revenue events: `payment_processed`, `tip_received`, `instant_pay_disbursed`, `platform_fee_collected`, `cancellation_fee_collected`.
- Marketing events: `fill_my_chair_sent`, `fill_my_chair_booked`, `smart_pricing_accepted`, `smart_pricing_modified`.
- Monetization: platform fee per transaction (percentage of service amount); additional fee for instant pay vs standard; optional marketing boost spend. Do not copy StyleSeat's exact percentages.

## Edge Cases

- Instant pay fails (banking error) — fallback to standard payout schedule; notify professional; retry next business day.
- Client disputes cancellation protection fee — freeze fee, create case, professional provides evidence (booking confirmation, no-show proof).
- Fill My Chair discount results in below-minimum earnings — enforce minimum service price; cannot discount below platform fee threshold.
- Professional's account flagged during instant pay review — suspend instant pay only (standard still works); notify with explanation and resolution path.
- Smart pricing has insufficient data for new market — show regional averages or "insufficient data" state; no false precision.
- Client books through fill-my-chair discount then cancels — protection fee applies (discounted appointments still protected).
- Professional wants to increase price for existing recurring client — notification sent to client before next appointment; client can cancel without penalty.
- Multiple instant pay requests same day — enforce daily/weekly limits; queue excess for next eligible window.

## Test Plan

- Unit tests: cancellation protection fee calculation, instant pay eligibility check, smart pricing algorithm, fill-my-chair gap detection, earnings calculation with platform fees.
- Integration tests: full booking-to-instant-pay flow, cancellation protection trigger, fill-my-chair campaign-to-booking, verification workflow.
- Contract tests: payment endpoints enforce idempotency, payout endpoints validate banking, discovery API consistency.
- Offline tests: cached schedule display, earnings viewable offline, bookings and payouts blocked offline.
- Permission tests: client data professional-scoping, verification document access restrictions, financial data visibility limits.
- Safety tests: cancellation fee dispute flow, verification document handling, fill-my-chair opt-in enforcement.
- Accessibility tests: booking flow completable with assistive tech, earnings dashboard readable via VoiceOver.
- Billing tests: platform fee accuracy, instant pay fee calculation, cancellation fee collection timing.

## Acceptance Criteria

- Professional can complete an appointment and receive instant pay (simulated) within the same day.
- Cancellation protection fee is clearly disclosed at booking, charged on late cancel/no-show, and disputable by client.
- Fill My Chair automatically detects schedule gaps and sends targeted offers to past clients.
- Smart pricing provides data-backed suggestions that professionals can accept, modify, or ignore.
- Client can discover professionals by portfolio quality, book with required payment method, and leave verified reviews.
- Earnings dashboard accurately reflects all revenue streams (services, tips, protection fees) minus platform fees.
- At least 12 acceptance tests cover: booking flow, instant pay, cancellation protection, fill-my-chair, smart pricing, portfolio, reviews, verification, client management, offline behavior, accessibility, and data export.

## Open Questions

- What is StyleSeat's exact instant pay fee and processing timeline?
- How does smart pricing factor in professional experience vs. market rate?
- What is the minimum cancellation protection window (hours before appointment)?
- How does fill-my-chair choose which past clients to target (recency, frequency, service match)?

## Build Plan

- Phase 1: Verify URLs, document features from public website and app store listings.
- Phase 2: Build consumer marketplace discovery and professional profiles.
- Phase 3: Implement booking flow with cancellation protection disclosure and payment requirement.
- Phase 4: Build appointment completion and payment processing with instant pay simulation.
- Phase 5: Add cancellation protection enforcement and dispute flow.
- Phase 6: Implement fill-my-chair automation (gap detection, client targeting, offer sending).
- Phase 7: Build smart pricing engine with market analysis and suggestions.
- Phase 8: Add portfolio management, reviews, verification, and client management.
- Phase 9: Implement offline support, accessibility, and comprehensive test suite.
- Phase 10: Conduct hands-on verification and resolve blockers.

## Next Steps

- Create a StyleSeat professional account to document onboarding and instant pay setup flow.
- Research instant pay timing and fee structure from public help documentation.
- Design original UI for earnings dashboard and fill-my-chair automation.
- Extend downstream repo-seeding manifest after spec confirmed implementation-ready.
