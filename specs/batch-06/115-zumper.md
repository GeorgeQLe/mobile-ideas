# Zumper-Style Clone Spec

> Metadata
> - Inspiration app: Zumper
> - Category: Rental marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, applications, rent payment, tour booking, messaging, screening/FCRA review, fair-housing legal review, and push behavior remain blocked; rental-data owner, payments owner, legal owner, screening owner, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile rental marketplace app inspired by Zumper: rental listings, instant push notifications for matches, credit-checked applications, and landlord-tenant messaging. The product emphasizes instant-match alerts and streamlined applications with screening data.

The clone must not copy Zumper branding, trademarked feature names, screenshots, marketing copy, protected iconography, private APIs, or scraped listings. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide rental listing discovery with instant-notification alerts.
- Support credit-checked applications via licensed credit-screening vendor with clear disclosure and FCRA compliance.
- Enable landlord-tenant in-app messaging with verification.
- Maintain fair-housing compliance across filters, messaging, and application flow.
- Provide saved searches, saved listings, and application tracking.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Zumper-branded app or imply affiliation.
- Do not scrape Zumper, replicate proprietary ranking, or reuse private APIs.
- Do not run unlicensed credit checks; all screening via licensed vendor with consent.
- Do not process rent payments in V1.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/zumper-apartment-finder/id530819966 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.zumper.rentals | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| Zumper Help Center | https://help.zumper.com/ | Searches, alerts, applications, tours, messaging, payments, and account controls | Verified 2026-05-01 |
| Zumper Privacy Policy | https://www.zumper.com/privacy | Data collection, retention, deletion, FCRA-adjacent notices, and privacy rights | Verified 2026-05-01 |
| Zumper Terms of Use | https://www.zumper.com/terms-of-use | Acceptable use, listings, applications, payments, scraping limits, and account terms | Verified 2026-05-01 |
| Zumper Fair Housing | https://www.zumper.com/fair-housing | Fair-housing posture and anti-discrimination expectations | Verified 2026-05-01 |
| Zumper Accessibility | https://www.zumper.com/accessibility | Accessibility commitment and contact path | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Rental browsing, filters, alerts, tour requests, applications, and rent-payment claims are verified from official store/help/legal pages; screening and payment implementation details remain inferred.
- Any application, screening, or payment workflow must include FCRA-adjacent review, fair-housing controls, and explicit consent gates.
- Listings with filters: price, beds, pet-friendly, amenities, move-in date; fair-housing compliant.
- Instant push notifications when new matching listing is posted (near-real-time).
- Credit-checked application: user consents to FCRA-regulated screening via licensed vendor; result shareable with multiple landlords for a validity window.
- Landlord-tenant messaging: in-app chat with verified landlord accounts, rate limits, moderation.
- Saved searches and listings sync across devices.
- Application tracking with pipeline (submitted, reviewing, approved, declined).
- Landlord verification required before messaging or receiving applications.
- No rent payments in V1; hand-off to landlord-preferred flow.

## Core User Journeys

- New user installs, enables notifications, sets search criteria, and receives instant-match alerts.
- User opens a listing, reviews details, and saves it.
- User starts a credit-checked application, consents to screening, and completes with documents.
- Credit report delivered to user; user chooses to share with a specific landlord.
- Landlord reviews application and messages user via in-app chat.
- User tracks applications through pipeline states.
- User compares listings side-by-side.
- User reports a suspicious listing or landlord.
- User requests data export and account deletion; credit report purged per retention policy.
- User toggles instant-notifications off and verifies silence.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Optional sign up, email/OTP | email, password/OTP | guest, new, returning | blocked region |
| Search/Feed | Rental listings discovery | filters, scroll | loaded, empty | location denied |
| Listing Detail | Photos, rent, terms | scroll, save, share | loaded, saved, unavailable | listing removed |
| Filters | Price/beds/pet/amenity | toggles | default, applied | prohibited filter attempt |
| Instant Alerts | Configure notifications | toggles, cadence | active, paused | delivery failure |
| Credit Application | Consent flow + docs | consent, docs, fields | drafting, submitted, completed, declined | vendor unavailable |
| Application Tracker | Pipeline | status updates | submitted, reviewing, approved, declined | stale self-report |
| Chat | Landlord-tenant messaging | text, attachment | connecting, delivered, read | blocked, quota |
| Saved Homes/Searches | Manage saved content | tap, toggle | none, saved, alert-enabled | alert delivery failure |
| Compare | Side-by-side | select listings | two-selected | listing stale |
| Settings | Privacy, notifications | toggles | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open application blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `RentalListing`: source id, property, unit, address, coordinates, rent, fees, lease terms, beds/baths, amenities, pet policy, photos, freshness.
- `Landlord`: verified landlord record with domain or LLC proof.
- `SavedListing`, `SavedSearch`, `Alert`: standard records with near-real-time dispatch.
- `CreditApplication`: user, listing(s), consent record, vendor reference, result snapshot, validity window.
- `CreditReport`: storage key (encrypted), vendor, score range, generation timestamp, retention policy.
- `RentalApplication`: user, listing, docs, employment, rental history, pipeline status, linked credit-application.
- `Document`: storage key, type (ID, paystub), encryption, retention.
- `Conversation`, `Message`: landlord-tenant chat with moderation flags.
- `Report`, `Block`, `AuditEvent`, `DataLicense`: standard records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `GET /listings?filters=&cursor=`: search with instant-match subscription.
- `GET /listings/:id`: listing detail.
- `POST /saved-listings`, `POST /saved-searches`, `DELETE` counterparts: CRUD.
- `POST /credit-applications/start`, `POST /credit-applications/:id/consent`, `GET /credit-applications/:id`: credit-screening lifecycle with vendor hand-off.
- `POST /credit-applications/:id/share`: share report with specific landlord.
- `POST /applications`, `GET /applications/mine`: rental application lifecycle.
- `POST /documents`, `DELETE /documents/:id`: encrypted document upload.
- `GET /conversations`, `POST /conversations/:id/messages`: landlord-tenant chat.
- `POST /reports`, `POST /blocks`: safety actions.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Instant-match alerts delivered via push within near-real-time of listing publish; payload redacts precise address.
- Landlord messages delivered via websocket/SSE; push payload redacts body.
- Credit vendor callbacks handled via server-side webhook; client notified asynchronously.
- Cached recent listings and chat history available offline; actions queue with idempotency keys.
- Application and document uploads use chunked resumable upload with encryption.
- Alert cadence configurable with daily cap to prevent spam.

## Permissions, Privacy, And Safety

- FCRA compliance: user consent for credit check, adverse-action notice on decline, dispute process for errors, regulated retention window.
- Credit report storage: encrypted at rest, access scoped to user and landlords the user explicitly shared with, purged at retention expiry.
- Location permission: coarse sufficient; precise only for map centering.
- Fair-housing compliance: prohibited filters removed; UX copy avoids steering; landlord messaging monitored for violations.
- Landlord verification: domain/LLC/EIN proof required before listing or messaging.
- Data license enforcement: no scraped or unlicensed data in serve path.
- Analytics redaction: no credit report, document content, precise location, or chat body in analytics.
- Block list persists across reinstall; blocked landlord cannot message or view applications.
- Account deletion purges credit report, documents, and messages per retention policy.
- Minors: account creation gated by minimum age.

## Analytics And Monetization

- Track privacy-safe events: search run, filter changed, listing viewed, saved/unsaved, credit-app consented/completed, application submitted, message sent, alert delivered/opened, account deletion requested.
- No credit report details, document content, precise location, or message body in analytics.
- Monetization: free for renters; landlord-side paid placements and credit-screening fees with original plan names.
- Application-fee pass-through to credit vendor may apply; disclosed clearly at consent time.
- Server-side webhook reconciliation for landlord billing and vendor settlements.

## Edge Cases

- Credit vendor unavailable; graceful retry and user notification.
- Credit-screening declined due to insufficient data; adverse-action notice displayed.
- User disputes credit-report errors; dispute workflow with vendor.
- Landlord violates fair-housing in message; auto-flag, moderation, possible suspension.
- Listing removed while user has application in progress; preserve user docs, notify.
- Instant-alert backoff when user marks not-interested frequently.
- Duplicate rental applications; idempotent per user/listing.
- Data license revoked; listings removed.
- Account deletion with shared credit report active; revoke sharing, purge per retention.
- Minor attempts signup; age gate blocks.

## Test Plan

- Unit tests for alert cadence, credit-application state machine, consent capture, adverse-action trigger, document encryption.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for search, alert delivery, credit-app flow with vendor stub, application submission, landlord chat.
- FCRA tests: consent capture, adverse-action notice, retention purge, dispute process.
- Fair-housing tests: prohibited filters blocked, chat message classifier, UX copy review.
- Privacy tests: coarse vs. precise location, credit-report encryption, analytics redaction, data export, account deletion.
- Billing tests: application-fee pass-through, landlord plan purchase/refund.
- Offline and realtime tests: cached listings, message resume, push payload redaction, instant alerts.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, credit-vendor integration on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Zumper assets, private APIs, or unlicensed data.
- Renters can search, receive instant alerts, submit credit-checked applications, and message verified landlords.
- FCRA compliance (consent, adverse action, dispute, retention) covered by tests.
- Fair-housing compliance in filters, messaging, and UX copy covered by tests.
- Credit report and documents encrypted and purged per retention policy.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which licensed credit-screening vendor is used and what is their compliance posture?
- What retention window applies to credit reports and uploaded documents?
- Which jurisdictions require additional screening disclosures or source-of-income protections?
- Will V1 allow renter-paid application fees or be fully free?
- What is the fair-housing classifier's precision/recall target for chat moderation?

## Build Plan

- Phase 1: auth, search, listing detail, basic filters.
- Phase 2: saved content, instant alerts with redacted push payloads.
- Phase 3: credit-screening integration with FCRA-compliant consent, adverse action, dispute.
- Phase 4: rental application submission, document encryption, application tracker.
- Phase 5: landlord verification, landlord-tenant chat with moderation.
- Phase 6: fair-housing review, accessibility pass, monetization.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for FCRA and fair-housing compliance review.
- Confirm credit-screening vendor, retention policy, and chat-moderation vendor.
