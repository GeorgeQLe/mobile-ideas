# Zillow-Style Clone Spec

> Metadata
> - Inspiration app: Zillow
> - Category: Real estate marketplace
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, MLS/tax/school data licenses, valuation disclosure review, agent-contact workflow, saved-home sync, fair-housing legal review, and push behavior remain blocked; data owner, legal owner, agent-lead owner, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile real-estate app inspired by Zillow: map-first search for homes for sale and rent, rich listing details, automated valuation estimates derived from licensed or user-provided data, saved homes and searches, alerts, and agent contact hand-off. The app emphasizes map exploration, filters, and fair-housing compliance across all surfaces.

The clone must not copy Zillow branding, trademarked feature names (e.g., automated valuations must use an original model name and disclosure, not a trademarked term), screenshots, marketing copy, protected iconography, proprietary valuation models, private APIs, or unlicensed MLS data. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide map-first discovery for for-sale and for-rent listings with rich filters.
- Offer listing detail with photos, price history, tax info, school context, and automated valuation with clear disclosure.
- Support saved homes, saved searches, and alerts with push notifications.
- Enable agent contact request hand-off for tours and offers.
- Ensure fair-housing compliance in UX copy, filter offerings, and targeting.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Zillow-branded app or imply affiliation.
- Do not scrape Zillow, replicate Zestimate trademark, replay proprietary valuation models, or reuse private APIs.
- Do not ship unlicensed MLS data, tax data, or proprietary school-ratings datasets.
- Do not expose user contact info or saved homes to agents without explicit consent.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/zillow-real-estate-rentals/id310738695 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.zillow.android.zillowmap | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| Zillow Help Center | https://zillow.zendesk.com/hc/en-us | Saved homes, searches, alerts, profile, agent contact, and listing controls | Verified 2026-05-01 |
| Zillow Privacy Notice | https://www.zillow.com/z/corp/privacy | Data collection, retention, deletion, advertising, and privacy rights | Verified 2026-05-01 |
| Zillow Terms of Use | https://www.zillow.com/z/corp/terms | Acceptable use, scraping, listing data constraints, and account termination | Verified 2026-05-01 |
| Zillow Fair Housing Policy | https://www.zillow.com/corp/fair-housing-policy/ | Fair-housing commitments and prohibited discriminatory behavior | Verified 2026-05-01 |
| Zillow Accessibility | https://www.zillow.com/accessibility/ | Accessibility commitment and support path | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Map search, saved homes/searches, agent contact, and listing alerts are verified from official store/help/legal pages; valuation internals and listing completeness are inferred and must use original licensed data.
- Fair-housing filter and school-context design require legal review before launch and must avoid protected-class proxies.
- Map-first search shows pin clusters and polygon/draw-area search; supports for-sale, for-rent, sold, and off-market filters.
- Filters: price, beds, baths, home type, square footage, lot size, HOA, days on market; explicitly prohibited filters removed per fair-housing.
- Listing detail shows photos/video tour, price, price history, taxes, estimated monthly payment, and valuation estimate with disclosure of model and data sources.
- Saved homes and saved searches sync across devices; alerts trigger on price drop, new listing, and status change.
- Agent contact is a request form; contact info shared only upon user submission.
- Home valuation model must be original and disclose inputs (recent comparables, tax records) and confidence interval.
- School context uses licensed or public data with original ratings methodology; avoid any filter that correlates with protected characteristics.
- Rental listings include application hand-off but do not handle payment in V1.

## Core User Journeys

- New user installs, grants optional location, and explores map for listings near current position.
- User applies filters (price, beds) and draws a polygon to constrain search.
- User opens listing, reviews photos, price history, and valuation estimate; saves listing.
- User saves a search and enables new-listing and price-drop alerts.
- User requests a tour or more info; form submits to agent with only the info user typed.
- User views school context on a listing with original methodology disclosed.
- User compares two saved homes side-by-side.
- User reports a listing as suspicious or showing inappropriate content.
- User toggles coarse-location mode and verifies no precise location is sent to agents.
- User requests data export and account deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP (optional for browse) | email, password/OTP | guest, new, returning | blocked region |
| Map Search | Map-first discovery | pan, zoom, draw, filters | loaded, empty, clustered | location denied, tile failure |
| Filters | Price/beds/home-type | toggles, sliders | default, applied | prohibited filter attempt |
| Listing Detail | Photos, price, valuation, history | scroll, save, share | loaded, saved, unavailable | off-market, sold, removed |
| Valuation Panel | Disclosed estimate with confidence | info tap | shown, not-computable | insufficient comparables |
| Saved Homes | Manage saved listings | tap, remove | none, saved | removed listing |
| Saved Searches | Manage saved searches | toggles, cadence | none, active | alert delivery failure |
| Agent Contact | Request tour/info | name, email, phone, message | drafting, submitted | agent unavailable |
| School Context | School info with disclosure | tap school | loaded | data unavailable |
| Settings | Privacy, location, notifications | toggles | loaded, saved | precise-location denied |
| Compare | Side-by-side two homes | select saved homes | two-selected, one-selected | listing stale |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open contact blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Listing`: source id, property type, address (with precision controls), coordinates, price, status (for-sale/for-rent/sold/off-market), beds, baths, sqft, lot, HOA, photos, video tour, description, days on market.
- `PriceHistory`: listing id, date, price, event (listed, reduced, pending, sold).
- `Valuation`: listing id, estimate value, confidence interval, model version, input comparables reference.
- `SavedHome`: user, listing, saved_at, notes.
- `SavedSearch`: user, query polygon/filters, cadence, last run, push token.
- `Alert`: saved search id, event (new, price_drop, status_change), dispatched_at.
- `AgentContactRequest`: user-submitted form with message, listing id, agent reference, consent flag.
- `School`: name, type, licensed-ratings snapshot, methodology disclosure link.
- `Report`, `AuditEvent`: safety/audit records.
- `DataLicense`: upstream data source id, license terms, retention and redistribution rules.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: optional auth.
- `GET /listings?bbox=&polygon=&filters=&cursor=`: map search with bbox and filters.
- `GET /listings/:id`: listing detail with photos, price history, valuation ref.
- `GET /listings/:id/valuation`: disclosed valuation with confidence interval and model version.
- `GET /listings/:id/schools`: school context with methodology link.
- `POST /saved-homes`, `GET /saved-homes`, `DELETE /saved-homes/:id`: saved home CRUD.
- `POST /saved-searches`, `GET /saved-searches`, `DELETE /saved-searches/:id`: saved search CRUD.
- `POST /listings/:id/contact-agent`: agent contact request with consent.
- `POST /reports`: listing report.
- `POST /data-export`, `DELETE /account`: privacy workflows.
- `POST /compare`: compare two listings.
- `GET /alerts?cursor=`: alert history.

## Realtime, Push, And Offline Behavior

- Saved-search alerts delivered via push bundled by cadence; payload redacts address precision.
- Map tiles and recent listing details cached for brief offline browse.
- Saved homes sync across devices via account; conflict resolution uses last-write-wins with version.
- Listing status changes (price drop, pending, sold) reconciled on open; cached listings flagged stale.
- Agent contact requests retry with exponential backoff if offline at submit.
- Location coarsening: app never transmits precise coordinates to agents; agents receive neighborhood-level only.

## Permissions, Privacy, And Safety

- Location permission handling: coarse location sufficient; precise only for map centering and not shared with agents.
- Fair-housing compliance: filters referencing protected characteristics (race, religion, family status, etc.) are not offered; UX copy avoids steering language.
- School information disclosure includes original methodology and avoids filters or rankings that function as proxies for protected classes.
- Agent contact form shares only fields the user typed; no background PII or saved-homes list shared.
- Valuation disclosure: show model version, confidence interval, and link to methodology; no trademarked term.
- Listing moderation: scam/fraud detection, duplicate-listing dedupe, and user reports route to moderation.
- Data licenses enforced server-side: MLS/tax/school feeds must honor redistribution terms; no scraped upstream data.
- Analytics redaction: no precise location, no identifiable contact requests, no saved-home lists in analytics.
- Account deletion clears saved homes, searches, contact requests, and alert history; anonymized usage retained per retention policy.
- Minors: account creation gated by minimum age; browse allowed without account.

## Analytics And Monetization

- Track privacy-safe events: search run, filter changed, listing viewed, saved/unsaved, alert delivered/opened, agent contact submitted, account deletion requested.
- No precise coordinates, contact-form content, or saved-home lists in analytics.
- Monetization: free for browsers; agent-side paid placements and lead subscriptions with original plan names.
- Paywall only for agent-side features; consumer UX remains free.
- Server-side webhook reconciliation for agent billing.

## Edge Cases

- Listing removed from source feed while user has it saved; show removed state with last-known snapshot.
- Precise-location denied; fallback to coarse location or manual city entry.
- Valuation not computable due to insufficient comparables; show unavailable with explanation.
- User attempts prohibited fair-housing filter phrasing in free-text notes; warn and block send.
- Agent contact submitted but agent account inactive; route to fallback agent per licensing agreement.
- Alert storm when many listings match; cadence backoff and bundling.
- Cross-device conflict on saved-home list; last-write-wins with version and audit.
- Data license revoked for upstream source; listings from that source pulled from serve path.
- Account deletion with open contact request; preserve anonymized record per retention policy.
- Fraudulent listing reported; takedown SLA and reporter acknowledgement.

## Test Plan

- Unit tests for map bbox search, polygon intersection, saved-search cadence, alert dispatch, valuation confidence math.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for map search, saved home, saved search, alert delivery, agent contact submission.
- Fair-housing tests: prohibited filter terms blocked, UX copy review, school-filter proxies forbidden.
- Licensing tests: upstream-feed inclusion/exclusion, redistribution terms enforcement.
- Privacy tests: coarse vs. precise location, agent form PII scope, analytics redaction, data export, account deletion.
- Billing tests (agent side): plan purchase, refund, suspension.
- Offline and realtime tests: cached tiles, saved-home sync, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast, map alternatives.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, valuation disclosure copy.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Zillow assets, trademarks, private APIs, or unlicensed data.
- Users can search on map, save homes, save searches, receive alerts, and contact agents with fair-housing compliance.
- Valuation estimates disclose model version and confidence; trademarked terms not used.
- Coarse-location and agent-contact PII scope enforced and tested.
- Fair-housing filter review is documented and covered by tests.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which MLS/tax/school data providers are licensed and what redistribution terms apply?
- Will V1 include rental application submission or defer to Phase 2?
- What original name and methodology is used for the valuation estimate?
- Which jurisdictions require additional fair-housing disclosures?
- What retention window applies to agent contact requests and alert history?

## Build Plan

- Phase 1: auth (optional), map search, listing detail, basic filters.
- Phase 2: saved homes, saved searches, alerts with redacted push payloads.
- Phase 3: valuation model with disclosure, price history, school context with methodology.
- Phase 4: agent contact hand-off, listing report, moderation tooling.
- Phase 5: fair-housing compliance review, accessibility pass.
- Phase 6: agent-side monetization, webhook reconciliation.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for fair-housing review and data-licensing posture.
- Confirm MLS, tax, and school data providers and redistribution terms.
