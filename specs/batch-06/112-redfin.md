# Redfin-Style Clone Spec

> Metadata
> - Inspiration app: Redfin
> - Category: Real estate marketplace
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public fair-housing policy pages.
> - Manual verification blockers: native iOS/Android screen capture, licensed MLS ingestion, tour-scheduling hand-off, offer-tool behavior, saved-search alert cadence, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile real-estate app inspired by Redfin: map-first listings, rich filters (including school and commute), online tour scheduling, offer-preparation tools, saved searches with alerts, and agent hand-off. The product's differentiator is integrated tour scheduling and offer workflow while remaining fair-housing compliant.

The clone must not copy Redfin branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary valuation or tour-routing models, private APIs, or unlicensed MLS data. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide map-first discovery with rich filters including commute-time and school filters (compliant with fair-housing guidance).
- Support online tour scheduling and reschedule/cancel flows.
- Offer offer-preparation tools (pre-fill, disclosures hand-off) without acting as a licensed broker in this codebase.
- Support saved searches and alerts with push notifications.
- Maintain fair-housing compliance across filters, UX copy, and agent hand-off.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Redfin-branded app or imply affiliation.
- Do not scrape Redfin, replay proprietary ranking/valuation, or reuse private APIs.
- Do not ship unlicensed MLS data, tax data, or scraped school datasets.
- Do not act as a licensed brokerage in code; only facilitate hand-off to licensed agents.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/redfin-homes-for-sale-rent/id332242617 | iOS listing, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.redfin.android | Android listing, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Redfin Help | https://www.redfin.com/support | Saved searches, tours, alerts, offers | Source discovery — pending exact URL verification |
| Redfin Privacy | https://www.redfin.com/about/privacy-policy | Data collection, retention, deletion | Source discovery — pending exact URL verification |
| Redfin Terms | https://www.redfin.com/about/terms-of-use | Acceptable use, scraping, fair-housing | Source discovery — pending exact URL verification |
| Redfin Fair Housing | https://www.redfin.com/about/fair-housing | Fair-housing commitments and prohibited filtering | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Map-first search with pin clusters, draw-polygon, commute-time filter, and home-type filter.
- Listing detail shows photos, video tour, price, tax estimate, HOA, price history, and fair-housing compliant school info.
- Saved searches generate new-listing, price-drop, and open-house alerts; cadence configurable.
- Tour scheduling: user selects available slot (agent calendar), submits contact info, receives confirmation and reminders.
- Offer preparation: user inputs offer terms, uploads proof-of-funds/pre-approval, selects contingencies; submission routes to licensed agent.
- Saved homes and search sync across devices via account.
- Agent hand-off: contact form shares only user-typed info and selected listing.
- Rental section (if supported) is read-only in V1; no payment handling.

## Core User Journeys

- New user installs, browses map, applies filters (price, beds, commute time), and opens a listing.
- User saves home, saves search, and enables alerts for new listings and price drops.
- User schedules a tour by selecting an agent calendar slot and receives confirmation.
- User reschedules or cancels a tour from the tour list.
- User prepares an offer, uploads proof-of-funds, and submits to agent for review.
- User compares two saved homes side-by-side with price, tax, sqft, and HOA.
- User toggles fair-housing compliant school filter with methodology disclosure.
- User reports a listing as fraudulent or incorrect.
- User requests data export and account deletion; tours canceled with agent notification.
- User toggles precise-location off and verifies map works with coarse location.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Optional sign up, email/OTP | email, password/OTP | guest, new, returning | blocked region |
| Map Search | Map-first discovery | pan, zoom, draw, filters | loaded, empty, clustered | location denied, tile failure |
| Filters | Price/beds/commute/type | toggles, sliders | default, applied | prohibited filter attempt |
| Listing Detail | Photos, price, tax, history | scroll, save, share | loaded, saved, unavailable | sold, off-market, removed |
| Tour Scheduler | Agent calendar slot | slot, contact info | available, booked | no-slots, agent unavailable |
| Tour List | Upcoming tours | reschedule, cancel | upcoming, past, canceled | agent canceled |
| Offer Composer | Offer terms, docs | price, contingencies, proof-of-funds | drafting, submitted | missing docs, validation error |
| Saved Homes | Manage saved listings | tap, remove | none, saved | removed listing |
| Saved Searches | Manage saved searches | toggles, cadence | none, active | alert delivery failure |
| Compare | Side-by-side two homes | select saved homes | two-selected | listing stale |
| Settings | Privacy, location, notifications | toggles | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open tour blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Listing`: source id, type, address, coordinates, price, status, beds, baths, sqft, lot, HOA, photos, video tour, description.
- `PriceHistory`: listing, date, price, event.
- `SavedHome`, `SavedSearch`, `Alert`: as in real-estate-sibling specs.
- `Tour`: user, listing, agent id, slot start/end, status (scheduled, rescheduled, canceled, completed).
- `Offer`: user, listing, offer terms, contingencies, docs references, submitted_at, agent assigned.
- `Document`: storage key, type (proof-of-funds, pre-approval), retention policy, encryption.
- `Agent`: licensed agent record, jurisdiction, calendar integration reference.
- `School`: name, type, licensed-ratings snapshot, methodology disclosure.
- `Report`, `AuditEvent`, `DataLicense`: safety/audit/license records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: optional auth.
- `GET /listings?bbox=&polygon=&filters=&cursor=`: map search.
- `GET /listings/:id`: listing detail.
- `POST /saved-homes`, `GET /saved-homes`, `DELETE /saved-homes/:id`: saved home CRUD.
- `POST /saved-searches`, `GET /saved-searches`, `DELETE /saved-searches/:id`: saved search CRUD.
- `GET /listings/:id/tour-slots`, `POST /tours`, `PATCH /tours/:id`, `DELETE /tours/:id`: tour lifecycle.
- `POST /offers`, `GET /offers/mine`, `PATCH /offers/:id`: offer lifecycle.
- `POST /documents`, `DELETE /documents/:id`: document upload with encryption.
- `GET /listings/:id/schools`: school context with methodology.
- `POST /reports`: listing report.
- `POST /data-export`, `DELETE /account`: privacy workflows.
- `POST /compare`: compare listings.

## Realtime, Push, And Offline Behavior

- Tour reminders, reschedule notices, and saved-search alerts delivered via push; payload redacts full address precision.
- Map tiles and recent listings cached for brief offline browse.
- Tour calendar slots fetched fresh on open; booking is idempotent with conflict resolution.
- Offer documents upload via chunked resumable upload with encryption.
- Saved homes and searches sync across devices with last-write-wins and version.
- Cached listing state marked stale when server status changes (price drop, status change).

## Permissions, Privacy, And Safety

- Location permission: coarse sufficient; precise only for map centering and not shared with agents.
- Fair-housing compliance: prohibited filters removed; UX copy avoids steering language; school filter surfaces methodology disclosure.
- Document handling: proof-of-funds and pre-approval encrypted at rest; retention per regional rules.
- Agent hand-off shares only fields user typed; no background PII or saved-home list shared.
- Tour scheduling collects minimum PII (name, phone, email) with consent.
- Offer-tool is non-binding; disclose that submission requires licensed agent signature.
- Listing moderation: fraud and duplicate detection, user reports with moderator queue.
- Data license enforcement: no scraped or unlicensed upstream data in serve path.
- Analytics redaction: no precise location, no offer documents, no saved-home lists in analytics.
- Account deletion cancels upcoming tours and notifies agents; documents purged per retention.

## Analytics And Monetization

- Track privacy-safe events: search run, filter changed, listing viewed, saved/unsaved, tour scheduled/rescheduled/canceled, offer started/submitted, alert delivered/opened, account deletion requested.
- No precise coordinates, document content, or offer terms in analytics.
- Monetization: free for consumers; agent-side paid placements and lead subscriptions with original plan names.
- Paywall only for agent-side features; consumer UX remains free.
- Server-side webhook reconciliation for agent billing.

## Edge Cases

- Agent calendar returns no slots; fallback to contact form.
- Tour double-booking attempt; idempotent booking and conflict response.
- Offer submitted without required docs; validation blocks submission.
- Listing status changes to pending/sold while user schedules tour; reconcile and notify.
- Fair-housing prohibited filter phrase in free-text notes; warn and block.
- Document upload with malformed PDF; sandboxed parse and reject.
- Precise-location denied; map still usable with coarse location.
- Agent inactive or jurisdiction mismatch; route to fallback agent.
- Data license revoked; listings removed from serve path.
- Account deletion with pending offer; preserve agent-side record per legal retention, purge user PII.

## Test Plan

- Unit tests for tour-slot booking idempotency, saved-search cadence, alert dispatch, document encryption.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for map search, saved home/search, tour lifecycle, offer composer, document upload.
- Fair-housing tests: prohibited filter terms blocked, school-filter methodology visible, UX copy review.
- Licensing tests: upstream-feed inclusion/exclusion, redistribution terms enforcement.
- Privacy tests: coarse vs. precise location, agent form PII scope, document encryption, data export, account deletion.
- Billing tests (agent side): plan purchase, refund, suspension.
- Offline and realtime tests: cached tiles, saved-home sync, push payload redaction, tour reminders.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast, map alternatives.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, offer-tool disclosure copy.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Redfin assets, private APIs, or unlicensed data.
- Users can search, schedule tours, prepare offers, and save searches with fair-housing compliance.
- Documents encrypted at rest with retention policy tested.
- Agent hand-off scope and coarse-location rules enforced and tested.
- Tour and offer flows include appropriate non-binding disclosures and licensed-agent routing.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which MLS/tax/school data providers are licensed and what redistribution terms apply?
- Will V1 include rental application submission or defer?
- What licensed-agent routing logic is used (jurisdiction, capacity, rating)?
- What retention window applies to submitted offers and uploaded documents?
- Which jurisdictions require e-signature or wet-signature on offers?

## Build Plan

- Phase 1: auth (optional), map search, listing detail, basic filters.
- Phase 2: saved homes, saved searches, alerts with redacted push payloads.
- Phase 3: tour scheduler with agent calendar integration, reminders, reschedule/cancel.
- Phase 4: offer composer, document upload with encryption, non-binding disclosures.
- Phase 5: fair-housing compliance review, accessibility pass.
- Phase 6: agent-side monetization, webhook reconciliation.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Replace discovery URLs with verified first-party URLs before implementation kickoff.
- Engage legal for fair-housing and brokerage-licensing posture.
- Confirm MLS, tax, school providers, and agent-calendar integration vendor.
