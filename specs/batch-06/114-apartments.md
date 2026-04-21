# Apartments.com-Style Clone Spec

> Metadata
> - Inspiration app: Apartments.com
> - Category: Rental marketplace
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public fair-housing policy pages.
> - Manual verification blockers: native iOS/Android screen capture, property-management integration, 3D tour playback, application submission flow, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile rental marketplace app inspired by Apartments.com: searchable for-rent listings with 3D tours, saved filters, contact property flows, and rental application submission. The product emphasizes rich media, filter persistence, and a consistent application experience across listings.

The clone must not copy Apartments.com branding, trademarked feature names, screenshots, marketing copy, protected iconography, private APIs, or scraped listings. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide map and list discovery of rental listings with filters (price, beds, baths, pets, amenities).
- Support 3D tour playback where available with graceful fallback.
- Offer contact-property form and optional rental application submission with uploaded documents.
- Support saved searches and alerts with push.
- Maintain fair-housing compliance in filters, UX copy, and property-manager hand-off.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build an Apartments.com-branded app or imply affiliation with CoStar.
- Do not scrape Apartments.com, replicate proprietary ranking, or reuse private APIs.
- Do not ship unlicensed rental datasets.
- Do not process rent payments in V1; application is hand-off only.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/apartments-com-rental-search/id413710295 | iOS listing, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.apartments.mobile.android | Android listing, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Apartments.com Help | https://www.apartments.com/help/ | Searches, alerts, contact property, applications | Source discovery — pending exact URL verification |
| Apartments.com Privacy | https://www.apartments.com/about/privacy/ | Data collection, retention, deletion | Source discovery — pending exact URL verification |
| Apartments.com Terms | https://www.apartments.com/about/terms/ | Acceptable use, scraping, fair-housing | Source discovery — pending exact URL verification |
| Apartments.com Fair Housing | https://www.apartments.com/about/fair-housing/ | Fair-housing commitments | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Map and list discovery with clusters, draw-area, and commute-time filters.
- Filters: price, beds, baths, pet-friendly, amenities, income requirement disclosure (where required).
- Listing detail shows photos, 3D tour where available, floorplans, rent, fees, lease terms, pet policy, amenities.
- Contact-property form captures name, email, phone, move-in date, and optional message; delivers to property manager.
- Rental application submission: upload documents (ID, paystubs), provide employment/rental history; submitted to property manager for review.
- Saved filters persist across devices and sessions; alerts trigger on new matching listings.
- 3D tour playback fallback to photo carousel when player unavailable.
- Fair-housing compliant: no filters for protected characteristics.

## Core User Journeys

- New user installs, browses map or list, applies filters, and opens a listing.
- User plays 3D tour or views photo carousel; saves listing.
- User saves a search with alerts and receives push when new matches appear.
- User fills contact-property form and submits to property manager.
- User starts a rental application, uploads ID and paystubs, and submits.
- User tracks submitted applications in a pipeline.
- User compares two listings side-by-side.
- User reports a suspicious listing.
- User requests data export and account deletion; documents purged.
- User toggles precise-location off and verifies search works with coarse location.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Optional sign up, email/OTP | email, password/OTP | guest, new, returning | blocked region |
| Map/List Search | Listings discovery | pan, zoom, filters | loaded, empty, clustered | location denied, tile failure |
| Filters | Price/beds/amenities | toggles, sliders | default, applied | prohibited filter attempt |
| Listing Detail | Photos, 3D tour, rent, terms | scroll, save, share | loaded, saved, unavailable | tour playback failed, listing removed |
| 3D Tour Player | Interactive tour | navigate, pan | loaded, failed | unsupported device, fallback to photos |
| Contact Property | Submit contact form | name, email, phone, message | drafting, submitted | delivery failed |
| Application Composer | Docs and history | upload docs, fields | drafting, submitted | missing docs, validation error |
| Application Tracker | Submitted apps pipeline | status | pending, reviewing, approved, declined | self-reported stale |
| Saved Homes/Searches | Manage saved content | tap, toggle | none, saved, alert-enabled | alert delivery failure |
| Compare | Side-by-side | select listings | two-selected | listing stale |
| Settings | Privacy, notifications | toggles | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open application blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `RentalListing`: source id, property id, unit, address, coordinates, rent, fees, lease terms, beds/baths, amenities, pet policy, photos, 3D tour reference, freshness.
- `Property`, `PropertyManager`: property record, verified manager with domain proof.
- `SavedListing`, `SavedSearch`, `Alert`: as in sibling specs.
- `ContactRequest`: listing id, user-submitted form, delivered_at.
- `RentalApplication`: user, listing, documents, employment, rental history, pipeline status.
- `Document`: storage key, type (ID, paystub), encryption, retention policy.
- `Report`, `AuditEvent`, `DataLicense`: standard records.
- `TourAsset`: 3D tour storage reference, player compatibility metadata.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: optional auth.
- `GET /listings?bbox=&polygon=&filters=&cursor=`: map/list search.
- `GET /listings/:id`: listing detail with tour asset reference.
- `GET /listings/:id/tour`: 3D tour asset metadata.
- `POST /listings/:id/contact`: contact property with consent.
- `POST /applications`, `GET /applications/mine`, `PATCH /applications/:id`: application lifecycle.
- `POST /documents`, `DELETE /documents/:id`: encrypted document upload.
- `POST /saved-listings`, `POST /saved-searches`, `DELETE` counterparts: CRUD.
- `POST /reports`: listing report.
- `POST /data-export`, `DELETE /account`: privacy workflows.
- `POST /compare`: compare listings.

## Realtime, Push, And Offline Behavior

- Saved-search alerts delivered via push with redacted payloads (no precise address).
- 3D tour assets streamed on demand; fallback to photos if bandwidth low.
- Document uploads use chunked resumable upload with encryption and virus scan.
- Cached listings available offline briefly; freshness checked on reconnect.
- Contact-property submissions retry with backoff; idempotency keys prevent duplicates.
- Application status updates from property manager delivered via push or in-app badge.

## Permissions, Privacy, And Safety

- Location permission: coarse sufficient; precise only for map centering.
- Fair-housing compliance: prohibited filters removed; UX copy avoids steering; amenity filters reviewed for proxy effects.
- Document handling: ID and paystubs encrypted at rest; retention limited per regional law; purge after decision window.
- Contact-property form shares only user-typed content; no background PII.
- Property manager verification: domain proof required before listing in V1.
- Listing moderation: fraud/duplicate detection, user reports with queue.
- Data license enforcement: no scraped or unlicensed data in serve path.
- Analytics redaction: no precise location, no document content, no application prose in analytics.
- Account deletion purges documents, application records (with anonymized audit), and saved content.
- Minors: account creation gated by minimum age.

## Analytics And Monetization

- Track privacy-safe events: search run, filter changed, listing viewed, tour played, saved/unsaved, contact submitted, application started/submitted, alert delivered/opened, account deletion requested.
- No precise coordinates, document content, or contact-form prose in analytics.
- Monetization: free for renters; property-manager side paid placements and application-processing fees with original plan names.
- Paywall only for property-manager side; renter UX remains free.
- Server-side webhook reconciliation for property-manager billing.

## Edge Cases

- 3D tour unsupported on device; graceful fallback to photos.
- Application submitted with missing required docs; validation blocks.
- Property manager inactive; route contact to fallback or show unavailability.
- Fair-housing prohibited filter phrase in free-text message; warn and block.
- Document upload with malformed PDF or large size; sandboxed parse and reject.
- Listing removed mid-application; preserve user data, notify, allow re-route.
- Duplicate application submission; idempotent per user/listing.
- Precise-location denied; map still usable with coarse location.
- Data license revoked; listings removed.
- Account deletion with pending application; preserve anonymized record per retention policy.

## Test Plan

- Unit tests for filter state persistence, application state machine, document encryption, alert cadence.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for map/list search, saved content, contact submission, application submission with docs.
- 3D tour tests: asset streaming, fallback to photos, unsupported device handling.
- Fair-housing tests: prohibited filters blocked, UX copy review.
- Licensing tests: upstream-feed inclusion/exclusion enforcement.
- Privacy tests: coarse vs. precise location, document encryption, analytics redaction, data export, account deletion.
- Billing tests (property-manager side): plan purchase, refund, suspension.
- Offline and realtime tests: cached tiles, saved-content sync, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast, alternative to 3D tour.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, 3D tour playback.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Apartments.com assets, private APIs, or unlicensed data.
- Users can search, play 3D tours, contact properties, and submit applications with fair-housing compliance.
- Documents encrypted at rest and purged per retention policy.
- Contact-property and application scopes limit PII to user-typed content.
- 3D tour fallback and alternative-text for accessibility are covered by tests.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which licensed rental data feeds are used?
- Which 3D tour vendor (and player) is embedded?
- What retention window applies to submitted applications and documents by jurisdiction?
- Will V1 support payment of application fee or defer to hand-off?
- Which jurisdictions require additional income/rent-burden disclosures?

## Build Plan

- Phase 1: auth (optional), map/list search, listing detail, basic filters.
- Phase 2: saved homes, saved searches, alerts with redacted push payloads.
- Phase 3: 3D tour integration with fallback, compare.
- Phase 4: contact-property form, rental application composer with encrypted document upload.
- Phase 5: fair-housing compliance review, accessibility pass.
- Phase 6: property-manager monetization, webhook reconciliation.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Replace discovery URLs with verified first-party URLs before implementation kickoff.
- Engage legal for fair-housing and application-document-retention posture.
- Confirm 3D tour vendor and licensed-feed providers.
