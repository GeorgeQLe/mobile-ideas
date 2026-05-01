# Nextdoor-Style Clone Spec

> Metadata
> - Inspiration app: Nextdoor
> - Category: Neighborhood social network
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, address verification, neighborhood boundary construction, urgent alerts, local business onboarding, privacy-choice exercise, and push behavior remain blocked; safety lead, privacy owner, boundary-data owner, local-business owner, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile neighborhood social-network app inspired by Nextdoor: verified-neighborhood feed with posts, classifieds, recommendations, urgent alerts, and local business pages. The product centers on real-name, address-verified community interaction within defined neighborhood boundaries.

The clone must not copy Nextdoor branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or neighborhood-boundary datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a verified-neighborhood feed with local posts, classifieds, recommendations, urgent alerts, and events.
- Enforce address verification to gate community participation and prevent impersonation.
- Support local business pages with verification and recommendations.
- Maintain robust safety: anti-harassment, anti-hate, anti-misinformation, and fair-housing compliance in recommendations and classifieds.
- Offer privacy controls over address display precision.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Nextdoor-branded app or imply affiliation.
- Do not scrape Nextdoor, replicate proprietary ranking, or reuse private APIs.
- Do not purchase or reuse proprietary neighborhood-boundary datasets; use public sources or user-defined boundaries.
- Do not expose precise addresses to neighbors without explicit user opt-in.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/nextdoor-local-neighborhood/id640360962 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.nextdoor | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| Nextdoor Help Center | https://help.nextdoor.com/s/ | Posts, marketplace, recommendations, alerts, businesses, verification, and account controls | Verified 2026-05-01 |
| Nextdoor Privacy Policy | https://nextdoor.com/privacy_policy/ | Data collection, address verification, retention, deletion, advertising, and privacy rights | Verified 2026-05-01 |
| Nextdoor Member Agreement | https://nextdoor.com/member_agreement/ | Acceptable use, scraping restrictions, real-name/address rules, and termination | Verified 2026-05-01 |
| Nextdoor Community Guidelines | https://nextdoor.com/community_guidelines/ | Harassment, hate, discrimination, misinformation, reporting, and moderation | Verified 2026-05-01 |
| Nextdoor Do Not Sell Notice | https://nextdoor.com/do_not_sell/ | Privacy opt-out and advertising-choice handling | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Verified-neighbor, address, local alerts, marketplace, recommendations, groups, and local news requirements are verified from official store/help/legal pages.
- Neighborhood-boundary data, address-proof vendors, and alert escalation rules remain inferred and must be original, licensed, and abuse-tested.
- Signup requires email/phone and address; address verification via postcard, geocoded device location, or verified document.
- Neighborhood boundaries defined by moderator input, public boundary sources (with license), or user-drawn polygons (with moderator review).
- Feed shows posts (discussion, sale, recommendation, urgent alert, event) from user's neighborhood and opted-in adjacent neighborhoods.
- Classifieds support sale/free items, services, and housing (fair-housing compliant); no scam/pyramid posts.
- Recommendations support local businesses; users can recommend or ask for recommendations.
- Urgent alerts escalated via push to the neighborhood; restricted to approved categories (safety, outage, lost pet).
- Local business pages require owner verification (business-license or domain proof).
- Posts may be scoped to neighborhood-only or extended to nearby neighborhoods.

## Core User Journeys

- New user signs up, enters address, completes verification, and lands on neighborhood feed.
- User creates a post (discussion, sale, recommendation); selects scope (neighborhood, nearby).
- User posts a classified (item-for-sale) with photos and price; replies via in-app message.
- User requests a recommendation for a service; neighbors reply with local-business tags.
- User posts an urgent alert (category-gated); recipients receive push alert.
- User verifies their local business and responds to a recommendation.
- User blocks another member or reports content; moderator reviews.
- User toggles address-display precision (street-only, block-only) and sees how it appears to others.
- User requests data export and account deletion.
- User attends an event created by a neighbor; RSVPs and receives reminders.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, address entry | email, phone, address | new, returning, verification-pending | address unverifiable |
| Address Verification | Postcard/device-location/document | choice, code entry | pending, verified, failed | postcard lost, geo-mismatch |
| Feed | Neighborhood updates | scroll, tap, react | loaded, empty | moderation-hidden, network failure |
| Post Composer | Create post | type, scope, media, tags | drafting, posted | policy block, over scope |
| Classifieds | Items, services, housing | browse, filter, reply | loaded, empty | expired, flagged |
| Recommendations | Ask or give | tag business, prose | drafting, posted | business unverified |
| Urgent Alert | Emergency category post | category, prose | drafting, posted | category restriction, cooldown |
| Business Page | Local business profile | recommend, message | loaded, verified, unverified | verification pending |
| Messaging | Neighbor-neighbor chat | text, attachment | connecting, delivered, read | blocked, quota |
| Events | Create/RSVP events | time, location, RSVP | upcoming, past, canceled | neighbor-only scope |
| Settings/Privacy | Address display, notifications | toggles | loaded, saved | verification revoked |
| Moderation | Report, appeal | reason, evidence | drafting, submitted | policy lookup |

## Data Model

- `User`: identity, email/phone, address, verification state, display precision setting, consent state, deletion/export state.
- `Neighborhood`: id, boundary polygon, source (public, user, moderator), adjacency list, moderator list.
- `AddressVerification`: user, method, proof reference, status, timestamps.
- `Post`: author, neighborhood, type (discussion, sale, recommendation, urgent, event), body, media, scope, moderation state.
- `Classified`: post id, item/service metadata, price, status (active, pending, sold).
- `Recommendation`: business id, author, prose, rating.
- `UrgentAlert`: post id, category, dispatched_at, reach.
- `Business`: slug, verification proof, category, location, admin roster.
- `Event`: title, time, location, RSVP list, scope.
- `Message`, `Conversation`: neighbor-to-neighbor chat with moderation flags.
- `SafetyReport`, `Block`, `AuditEvent`: standard records.
- `DataLicense`: upstream boundary source license metadata.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/phone auth.
- `POST /address-verifications/start`, `POST /address-verifications/:id/code`: address verification lifecycle.
- `GET /neighborhoods/mine`, `GET /neighborhoods/:id`: neighborhood data.
- `GET /feed?cursor=`: neighborhood feed with scope filter.
- `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`: post lifecycle.
- `POST /classifieds`, `GET /classifieds?filters=`, `PATCH /classifieds/:id`: classifieds lifecycle.
- `POST /recommendations/:businessSlug`: recommendation.
- `POST /urgent-alerts`: urgent alert with category gate and cooldown.
- `POST /business-claims`, `POST /business-claims/:id/verify`: business verification.
- `GET /businesses/:slug`: business page.
- `POST /events`, `POST /events/:id/rsvp`: event lifecycle.
- `GET /conversations`, `POST /conversations/:id/messages`: neighbor chat.
- `POST /reports`, `POST /blocks`: safety actions.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Urgent alerts delivered via push with high-priority channel; payload includes category but redacts full body by default.
- Feed updates bundled; push notifications for replies, mentions, and RSVPs debounced.
- Messages via websocket/SSE with resume cursor; push payload redacts body.
- Cached feed and recent messages available offline; actions queue with idempotency.
- Address-verification postcard delivery is async; webhook or polling reconciliation.
- Event reminders scheduled locally and server-side.

## Permissions, Privacy, And Safety

- Address verification is launch-blocking for post/classified creation.
- Address display precision: user-configurable (street-only, block-only, neighborhood-only); default to block-only.
- Fair-housing compliance in housing classifieds: prohibited terms filter, UX copy review, audit of classifier.
- Anti-harassment, anti-hate, and anti-discrimination policy enforced via classifier plus human moderation.
- Urgent-alert abuse prevention: category gating, cooldown, moderator escalation on misuse.
- Local-business verification required before business-page claims; revocation on proof invalidation.
- Scam/pyramid/spam classifier with user reports routed to moderator queue.
- Data minimization in analytics: no post body, no precise address, no message body, no classified item identifiers.
- Block list persists across reinstall; blocked neighbors removed from feed and search.
- Account deletion purges posts (optionally preserved anonymized), messages, RSVPs, and verification records per retention.
- Minors: platform minimum age enforced.

## Analytics And Monetization

- Track privacy-safe events: signup, verification started/completed, post published, classified published/sold, recommendation submitted, urgent alert dispatched, RSVP, message sent, account deletion requested.
- No post body, precise address, or message body in analytics.
- Monetization: local-business ads with clear labeling; original plan names; no dark patterns.
- Paywall only for business-side features; consumer UX remains free.
- Server-side webhook reconciliation for business billing.

## Edge Cases

- Address unverifiable due to rural PO box; alternative verification path (document).
- User moves; re-verification required before posting in new neighborhood.
- Urgent alert misused for non-emergency; cooldown, moderator review, suspension.
- Housing classified with fair-housing-prohibited language; block and educate.
- Business claim disputed (change of ownership); re-verification process.
- Cross-neighborhood scope abuse (spam across many neighborhoods); rate limits.
- Impersonation of a public figure; name-policy challenge.
- Data license revoked for boundary source; switch to user-drawn or public source.
- Account deletion with active urgent alert; alert preserved (public-safety value) but author anonymized per policy.
- Message with harassment; classifier warning, report path.

## Test Plan

- Unit tests for boundary polygon intersection, address-verification state machine, urgent-alert category gate, cooldown math, classifier triggers.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for signup, verification, post/classified/recommendation lifecycle, urgent alert, business claim, messaging.
- Fair-housing tests on housing classifieds: prohibited terms, UX copy.
- Safety tests: harassment classifier, impersonation challenge, urgent-alert abuse cooldown, block persistence.
- Privacy tests: address precision display, data export, account deletion, analytics redaction.
- Billing tests: business plan purchase, refund.
- Offline and realtime tests: cached feed, message resume, push payload redaction, urgent alert dispatch.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast.
- Manual verification tests: native iOS/Android screenshots, push payloads on device, address-verification postcard flow.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Nextdoor assets, private APIs, or trademarked feature names.
- Users can verify address, post, message, and participate in a neighborhood community with fair-housing and anti-harassment compliance.
- Urgent-alert category gating and cooldown covered by tests.
- Address precision control and analytics redaction covered by tests.
- Business claim verification and revocation covered by tests.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which boundary source is licensed vs. user-drawn for V1 coverage?
- Which address-verification vendor(s) are used (postcard provider, document verification)?
- What retention window applies to verification proofs and denied attempts?
- What classifier target precision/recall for housing fair-housing compliance?
- Will V1 include paid local-business ads or defer?

## Build Plan

- Phase 1: auth, address verification, feed read path, basic post.
- Phase 2: classifieds, recommendations, events, neighbor messaging.
- Phase 3: local business pages with verification, business claim flow.
- Phase 4: urgent alerts with category gate and cooldown.
- Phase 5: safety and fair-housing compliance, moderator tooling.
- Phase 6: privacy controls (address precision, data export, deletion), accessibility pass.
- Phase 7: business-side monetization, manual native verification, regional compliance.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for fair-housing, anti-discrimination, and urgent-alert abuse posture.
- Confirm boundary source license and address-verification vendors.
