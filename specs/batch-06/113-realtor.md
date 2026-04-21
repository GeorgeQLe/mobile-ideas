# Realtor.com-Style Clone Spec

> Metadata
> - Inspiration app: Realtor.com
> - Category: Real estate marketplace
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public fair-housing policy pages.
> - Manual verification blockers: native iOS/Android screen capture, MLS ingestion, mortgage calculator disclosures, agent directory workflows, home-value tracking, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile real-estate app inspired by Realtor.com: MLS-sourced listings with commute filters, mortgage calculator, agent directory, and home-value tracking for current homeowners. The app emphasizes MLS freshness, affordability tools, and agent discovery.

The clone must not copy Realtor.com branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary valuation or lender-scoring models, private APIs, or unlicensed MLS data. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide MLS-licensed listing discovery with accuracy and freshness guarantees.
- Offer commute filters, mortgage calculator with clear disclosure, and affordability estimation.
- Support an agent directory with reviews and profiles (agents must verify license).
- Track a user's owned home value over time with disclosed methodology.
- Maintain fair-housing compliance across filters, UX copy, and agent hand-off.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Realtor.com-branded app or imply affiliation with Move/News Corp.
- Do not scrape Realtor.com, replicate proprietary valuation, or reuse private APIs.
- Do not ship unlicensed MLS data, mortgage-rate feeds, or agent-license datasets.
- Do not provide binding mortgage quotes; calculator is illustrative only.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/realtor-com-real-estate/id336698281 | iOS listing, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.move.realtor | Android listing, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Realtor.com Help | https://www.realtor.com/support/ | Searches, alerts, agent directory, home-value | Source discovery — pending exact URL verification |
| Realtor.com Privacy | https://www.realtor.com/about/privacy-policy/ | Data collection, retention, deletion | Source discovery — pending exact URL verification |
| Realtor.com Terms | https://www.realtor.com/about/terms-of-use/ | Acceptable use, scraping, fair-housing | Source discovery — pending exact URL verification |
| Realtor.com Fair Housing | https://www.realtor.com/about/fair-housing/ | Fair-housing commitments | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- MLS listings served from licensed feed with freshness metadata and takedown SLA.
- Filters: price, beds, baths, home type, square footage, lot size, commute time, days on market; fair-housing compliant.
- Mortgage calculator accepts price, down payment, rate, and term; disclosure states rates are illustrative and not a quote.
- Agent directory lists licensed agents with jurisdiction, reviews, and contact form; license verification required.
- Home-value tracker lets owner claim a home and receive periodic valuation updates with disclosed methodology.
- Saved searches generate alerts on new listings, price drops, and status changes.
- Agent contact form shares only user-typed content and selected listing.
- Rental section (if supported) is read-only in V1.

## Core User Journeys

- New user installs, browses map, applies filters including commute time, and opens a listing.
- User uses mortgage calculator to estimate monthly payment; reads disclosure.
- User saves home, saves search, and enables alerts.
- Homeowner claims their address (via ownership proof workflow) and tracks valuation over time.
- User searches agent directory, reads reviews, and submits contact form.
- User compares two saved homes side-by-side.
- User toggles commute filter and sees routes with map overlay.
- User reports a listing as stale or fraudulent.
- User requests data export and account deletion.
- User toggles precise-location off and verifies app works with coarse location.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Optional sign up, email/OTP | email, password/OTP | guest, new, returning | blocked region |
| Map Search | Map-first discovery | pan, zoom, filters | loaded, empty, clustered | location denied, tile failure |
| Filters | Price/beds/commute/type | toggles, sliders | default, applied | prohibited filter attempt |
| Listing Detail | Photos, price, tax, history | scroll, save, share | loaded, saved, unavailable | sold, off-market |
| Mortgage Calculator | Inputs and output | price, down, rate, term | idle, computed | invalid inputs, disclosure shown |
| Agent Directory | Browse agents | query, filters | loaded, empty | license unverified |
| Agent Profile | Reviews, contact | tap contact | loaded, contacted | license revoked |
| Home Value | Owner-claimed home tracker | claim flow, view trend | claimed, pending, denied | proof required |
| Saved Homes/Searches | Manage saved content | tap, toggle | none, saved | alert delivery failure |
| Compare | Side-by-side two homes | select saved | two-selected | listing stale |
| Settings | Privacy, location, notifications | toggles | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open claim blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Listing`: source id, type, address, coordinates, price, status, beds, baths, sqft, lot, HOA, photos, description, freshness timestamp.
- `SavedHome`, `SavedSearch`, `Alert`: as in sibling specs.
- `MortgageInputs`: user-scoped saved inputs for recomputation with new rates.
- `Agent`: licensed agent record, jurisdiction, license verification proof, rating, review count.
- `AgentReview`: user, agent, rating, prose, moderation state.
- `HomeClaim`: user, address, ownership proof, status (pending, verified, denied).
- `Valuation`: home id, estimate, confidence, methodology version, source comparables.
- `Report`, `AuditEvent`, `DataLicense`: standard records.
- `RateSnapshot`: licensed mortgage-rate reference snapshot with provider and disclosure.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: optional auth.
- `GET /listings?bbox=&polygon=&filters=&cursor=`: map search with commute filter support.
- `GET /listings/:id`: listing detail.
- `POST /mortgage/estimate`: compute estimate with disclosure metadata.
- `GET /agents?query=&cursor=`: agent directory search.
- `GET /agents/:id`: agent profile.
- `POST /agents/:id/contact`: agent contact request.
- `POST /agents/:id/reviews`: submit review (moderated).
- `POST /home-claims`, `GET /home-claims/mine`: claim lifecycle with proof submission.
- `GET /home-values/:id/history`: owner-claimed home value trend.
- `POST /saved-homes`, `POST /saved-searches`, `DELETE` counterparts: CRUD.
- `POST /reports`: listing or agent report.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Saved-search alerts, price-drop, status-change, and home-value updates delivered via push with redacted payloads.
- Map tiles cached briefly for offline browse.
- Agent contact forms retry with backoff if offline at submit.
- Home-value computation runs async and notifies when ready.
- Cached listings marked stale when freshness timestamp expires.
- Offline writes for saved content sync on reconnect with idempotency.

## Permissions, Privacy, And Safety

- Location permission: coarse sufficient; precise only for map centering and not shared with agents.
- Fair-housing compliance: prohibited filters removed; UX copy avoids steering; commute filter tested for proxy effects.
- Mortgage calculator disclosure: rates illustrative, not a quote; no binding financial advice.
- Home-claim proof handling: ownership documents encrypted at rest; retention limited to verification window.
- Agent license verification: required before listing in directory; revocation removes agent.
- Agent reviews moderated; defamation/PII redaction; appeal path.
- Data license enforcement: no scraped or unlicensed data in serve path.
- Analytics redaction: no precise location, no ownership-proof content, no mortgage inputs in analytics beyond bucketed ranges.
- Account deletion clears saved content, home claims, reviews (optionally anonymized), and agent contacts.
- Minors: account creation gated by minimum age; browsing allowed without account.

## Analytics And Monetization

- Track privacy-safe events: search run, filter changed, mortgage estimate computed, listing viewed, saved/unsaved, agent contacted, home claim submitted, alert delivered/opened, account deletion requested.
- No precise coordinates, ownership-proof content, or unbucketed mortgage inputs in analytics.
- Monetization: free for consumers; agent-side paid placements and directory upgrades with original plan names.
- Paywall only for agent-side; consumer UX remains free.
- Server-side webhook reconciliation for agent billing.

## Edge Cases

- Home-claim proof is ambiguous; manual review queue with SLA.
- Mortgage calculator inputs out of range (e.g., negative); validation and disclosure.
- Agent license expires while in directory; auto-remove until renewed.
- Fair-housing filter phrase in free-text review; block or flag.
- Listing stale beyond freshness SLA; mark stale and notify saved-home owners.
- Commute filter returns sparse results; suggest widening.
- Data license revoked for upstream source; listings removed.
- Account deletion with pending home claim; purge user PII, preserve audit record per retention.
- Duplicate agent profile; deduplication at verification time.
- Precise-location denied; map still usable with coarse location.

## Test Plan

- Unit tests for mortgage estimate math, commute filter intersection, home-claim state machine, alert cadence.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for map search, mortgage calculator, agent directory, contact submission, home claim, valuation update.
- Fair-housing tests: prohibited filters blocked, commute filter proxy review, UX copy review.
- Licensing tests: MLS inclusion/exclusion, agent-license verification, rate-snapshot provider attribution.
- Privacy tests: coarse vs. precise location, ownership-proof encryption, analytics redaction, data export, account deletion.
- Billing tests (agent side): plan purchase, refund, suspension.
- Offline and realtime tests: cached tiles, saved-content sync, push payload redaction, home-value updates.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast, map alternatives.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, mortgage disclosure copy.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Realtor.com assets, private APIs, or unlicensed data.
- Users can search, compute mortgage estimates, browse licensed agents, and track claimed home value with fair-housing compliance.
- Mortgage calculator includes clear illustrative-not-a-quote disclosure.
- Agent license verification and review moderation are covered by tests.
- Coarse-location and ownership-proof encryption enforced and tested.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which MLS, tax, and mortgage-rate providers are licensed?
- Which jurisdictions require additional agent-license display formats?
- Will home-claim proof use document upload, utility-bill proof, or notarized verification?
- What retention window applies to ownership proof and denied claims?
- What methodology and name is used for the home-value estimate?

## Build Plan

- Phase 1: auth (optional), map search, listing detail, basic filters.
- Phase 2: saved homes, saved searches, alerts with redacted push payloads.
- Phase 3: mortgage calculator with disclosure, commute filter, compare.
- Phase 4: agent directory, license verification, contact form, reviews with moderation.
- Phase 5: home-claim workflow, owner valuation tracker with disclosed methodology.
- Phase 6: fair-housing compliance review, accessibility pass, agent-side monetization.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Replace discovery URLs with verified first-party URLs before implementation kickoff.
- Engage legal for fair-housing, mortgage-disclosure, and agent-license posture.
- Confirm MLS, rate, and license-verification vendors.
