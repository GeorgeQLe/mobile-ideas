# Spec Quality Audit

Created: 2026-04-16
Updated: 2026-05-03

## Verdict

The 200 technical specs for IDs 001-200 pass the Draft 1 structural and public-source V1 depth gate. Phase 3 implementation-readiness upgrades replaced discovery sources with exact first-party URLs for IDs 001-100, and Phase 8 Step 8.3 has promoted IDs 101-200.

Phase 7 Step 7.2 (2026-04-21) rewrote all 100 IDs 101-200 placeholders into canonical Draft 1 specs. Phase 8 Step 8.3 has now replaced their discovery URLs with exact first-party URLs, distinguished source-backed versus blocked hands-on behavior, expanded them to public-source V1 depth, and completed category risk reviews for IDs 101-200. IDs 201-1000 remain canonical Draft 1 scaffolds and do NOT yet meet the implementation-readiness gate.

The IDs 001-100 specs are not final one-for-one clone specs because hands-on verification remains blocked for native, paid, account, hardware, support, and regional flows.

Step 8.3 post-slice audit on 2026-05-03 confirmed the current full-scope state: 260 implementation-ready specs, 740 Draft 1 specs, and 2,220 source-discovery placeholder rows across IDs 261-1000.

## Audit Scope

- Reviewed `tasks/ideas.md` (now 1000 rows after the 2026-04-21 extension).
- Reviewed `specs/README.md`.
- Reviewed all 260 implementation-ready specs under `specs/batch-01/` through `specs/batch-13/`.
- Reviewed all 100 extension specs under `specs/batch-06/` through `specs/batch-10/` (normalized in Phase 7 Step 7.2 and promoted through Phase 8 Step 8.3).
- Checked lifecycle docs required by hygiene.
- Ran a structural metrics pass over all numbered spec files.

## Quality Gate Used

A Draft 1 or public-source V1 spec must meet these minimums:

- One H1 and all canonical sections.
- App-specific research source table with exact first-party URLs.
- App-specific source-backed requirements, screen inventory, data model, API/backend contracts, offline/realtime behavior, privacy/safety controls, analytics, edge cases, tests, acceptance criteria, open questions, and next steps.
- Explicit blocked hands-on verification notes for account, paid, native, notification, device, and regional behavior that has not been lawfully verified.

## Metrics Summary

- Numbered app specs present: 1000 (260 implementation-ready + 740 Draft 1 canonical/scaffold).
- Missing numeric IDs from `001` through `1000`: 0.
- Specs with exactly one H1: 1000.
- Specs with all canonical section headings present: 1000.
- Specs passing Draft 1 depth metrics: 260 (IDs 001-260); IDs 261-1000 are canonical Draft 1 scaffolds with lighter generated depth.
- Specs with exact first-party source URLs replacing discovery links or explicit native marketplace blockers: 260 (IDs 001-260); IDs 261-1000 still await Step 8.3 source replacement.
- Source-discovery placeholder rows remaining: 2,220 total across IDs 261-1000 (120 in IDs 201-300 and 300 in each 100-ID range from 301-1000).
- Specs with hands-on app behavior fully verified: 0.
- Specs upgraded to implementation-ready public-source V1: 260 (IDs 001-260); IDs 261-1000 remain queued in Step 8.3.

## Resolved Findings

### Resolved: Draft 0 Structure

All numbered specs have been rewritten from Draft 0 custom sections into canonical Draft 1 sections.

### Resolved: Uneven Depth Across Batches

All numbered specs now use the same canonical structure and pass the same depth gate.

### Resolved: Missing Hygiene Lifecycle Docs

`CLAUDE.md`, `tasks/roadmap.md`, and `tasks/history.md` now exist. Generated task artifacts include `## Next Steps`.

### Resolved: Batch 01 AI And Social Source Replacement

`002-claude.md`, `003-perplexity.md`, `004-character-ai.md`, `005-replika.md`, and `007-instagram.md` through `020-slack.md` now use exact first-party marketplace/help/privacy/legal sources instead of discovery links.

### Resolved: Batch 01 Messaging And Workplace Tail Source Replacement

`017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md` now use exact first-party marketplace/help/privacy/legal/product sources instead of discovery links and include app-specific messaging, community, safety, billing, admin, and manual-verification blockers.

### Resolved: Batch 02 Communication And Email Source Replacement

`021-messenger.md`, `022-facetime.md`, `023-zoom.md`, `024-gmail.md`, and `025-outlook.md` now use exact first-party marketplace/help/privacy/legal/product sources instead of discovery links and include app-specific messaging, calling, meetings, email, calendar, safety, AI, enterprise/admin, and manual-verification blockers.

### Resolved: Batch 02 Maps And Mobility Source Replacement

`027-apple-maps.md`, `028-waze.md`, `029-uber.md`, `030-lyft.md`, `031-lime.md`, and `032-turo.md` now use exact first-party marketplace/help/privacy/legal/product sources instead of discovery links and include app-specific maps, navigation, rideshare, micromobility, car-sharing, safety, marketplace, insurance/protection, fleet, and manual-verification blockers.

### Resolved: Batch 02 Travel Booking Source Replacement

`034-booking-com.md`, `035-expedia.md`, `036-hopper.md`, and `037-tripit.md` now use exact first-party marketplace/help/privacy/legal/product URLs instead of discovery links and include app-specific lodging, multi-product travel booking, price prediction, trip flexibility, itinerary import, calendar sync, alerts, privacy, support, and manual-verification blockers.

### Resolved: Batch 02 Food And Grocery Delivery Source Replacement

`039-uber-eats.md` and `040-instacart.md` now use exact first-party marketplace/help/privacy/legal/product/merchant/shopper URLs instead of discovery links and include app-specific food delivery, grocery delivery, catalog/menu, substitutions, memberships, regulated-item, SNAP/EBT, courier/shopper, merchant/retailer, privacy, support, and manual-verification blockers.

### Resolved: Batch 03 Food And Local Discovery Source Replacement

`041-starbucks.md`, `042-mcdonalds.md`, `043-opentable.md`, `044-yelp.md`, and `045-too-good-to-go.md` now use exact first-party marketplace/help/privacy/legal/product/business URLs instead of discovery links and include app-specific coffee ordering, quick-service ordering, reservations, local discovery, surplus-food marketplace, loyalty/rewards, pickup, reviews/moderation, merchant/business tooling, privacy, support/refund, and manual-verification blockers.

### Resolved: Batch 03 Commerce And Resale Source Replacement

`047-temu.md`, `048-shein.md`, `049-etsy.md`, `050-ebay.md`, `051-facebook-marketplace.md`, `052-poshmark.md`, `053-depop.md`, `054-stockx.md`, and `055-shop.md` now use exact first-party marketplace, help/support, privacy/legal, product, seller, buyer-protection, shipping/tracking, rewards, verification, merchant, and policy URLs instead of discovery links and include app-specific discount shopping, fashion commerce, handmade/custom marketplace, auctions/offers, local marketplace, social resale, bid/ask market, package tracking, wallet/reward, seller/merchant tooling, privacy, support/refund/claim, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 03 Finance And Payment Source Replacement

`057-venmo.md`, `058-paypal.md`, `059-zelle.md`, and `060-robinhood.md` now use exact first-party marketplace, help/support, privacy/legal, product, safety, and disclosure URLs instead of discovery links and include app-specific social payments, digital wallet, bank-linked transfer, brokerage/investing, cards, bank links, savings, crypto, requests, disputes, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 04 Finance And Wallet Source Replacement

`061-coinbase.md`, `062-mint-credit-karma.md`, `063-ynab.md`, `064-rocket-money.md`, and `065-apple-wallet.md` now use exact first-party marketplace, help/support, privacy/legal, product, security, developer/platform, and disclosure URLs instead of discovery links and include app-specific crypto exchange, credit/personal finance, zero-based budgeting, subscription/bill negotiation, digital wallet/pass, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 04 Audio Source Replacement

`067-apple-music.md`, `068-youtube-music.md`, `069-soundcloud.md`, `070-audible.md`, and `071-pocket-casts.md` now use exact first-party marketplace, help/support, privacy/legal, product, subscription, creator/audiobook/podcast, playback, download/offline, sync/device, and policy URLs instead of discovery links and include app-specific music, video/audio switching, creator uploads, audiobook credits/returns, podcast queue/sync, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 04 Video And Entertainment Source Replacement

`072-netflix.md`, `073-youtube.md`, `074-twitch.md`, `075-letterboxd.md`, and `076-imdb.md` now use exact first-party marketplace, help/support, privacy/legal, product, subscription, upload/live, review/rating, watchlist, playback, download/offline, moderation, creator, rental, availability, and policy URLs instead of discovery links and include app-specific streaming video, user-generated video, live streaming, film social, entertainment database, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 04 Education Source Replacement

`077-duolingo.md`, `078-khan-academy.md`, `079-quizlet.md`, and `080-coursera.md` now use exact first-party marketplace, help/support, privacy/legal, product, classroom, subscription, certificate, AI study-tool, and education-platform URLs instead of discovery links and include app-specific gamified lessons, course catalogs, flashcards, online-course marketplace, classroom/teacher tooling, minors/student privacy, subscriptions, credentials, offline/cache, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 05 Education Wellness Fitness And Health Source Replacement

`081-photomath.md`, `082-headspace.md`, `083-calm.md`, `084-strava.md`, `085-nike-run-club.md`, `086-myfitnesspal.md`, `087-fitbit.md`, and `088-flo.md` now use exact first-party marketplace, help/support, privacy/legal, product, subscription, device/wearable, anonymous-mode, data-export/delete, and safety URLs instead of discovery links and include app-specific camera math, meditation, sleep/wellness, GPS fitness social, running-plan, nutrition logging, wearable health, reproductive-health privacy, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 05 Productivity Cloud Creator Photo And Smart Home Source Replacement

`090-todoist.md`, `091-trello.md`, `092-google-calendar.md`, `093-evernote.md`, `094-dropbox.md`, `095-google-drive.md`, `096-capcut.md`, `097-canva.md`, `098-lightroom.md`, `099-google-photos.md`, and `100-ring.md` now use exact first-party marketplace, help/support, privacy/legal, product, developer, AI, security, subscription, and hardware/support URLs instead of discovery links and include app-specific productivity, calendar, notes, cloud storage, creator tool, photo library, smart-home/video security, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 06 Dating Source Replacement

`101-tinder.md`, `102-bumble.md`, `103-hinge.md`, `104-grindr.md`, `105-match.md`, and `106-coffee-meets-bagel.md` now use exact first-party marketplace, help/support, privacy/legal, safety, and community-guideline URLs instead of discovery links and include dating-specific age gate, minors protection, NCII reporting, doxxing/location safety, block/report/unmatch, hidden/incognito mode, subscription, edge-case, test, acceptance, build-plan, and manual verification detail.

### Resolved: Batch 06 Professional Jobs Real Estate Rentals Neighborhood Events And Publishing Source Replacement

`107-linkedin.md` through `120-substack.md` now use exact first-party marketplace, help/support, privacy/legal, safety/community, fair-housing, payment/subscription, and publishing-policy URLs instead of discovery links and include app-specific professional networking, job search, employer reviews, real estate/rental marketplace, neighborhood verification, events/ticketing, long-form publishing, newsletter subscription, privacy/safety, edge-case, test, acceptance, build-plan, and manual verification detail.

## Remaining Findings

### Resolved: Draft 0 Gap For IDs 101-200 (Phase 7 Step 7.1 → 7.2)

Phase 7 Step 7.2 (2026-04-21) rewrote all 100 Draft 0 placeholders under `specs/batch-06/` through `specs/batch-10/` into canonical Draft 1 specs. Each file has exactly one H1, the full metadata block (Inspiration app, Category, `Readiness status: Draft 1`, Verification basis, Manual verification blockers, Legal scope), and all 18 canonical sections populated with substantive non-TODO content at the required depth (8-12 journeys, 8-12 screens, 8-12 entities, 10-15 API routes, 8-12 edge cases, 8-12 tests, etc.). Category-specific risk notes were added for dating (101-106), finance/investing/banking (137-149), telehealth/therapy (153-157), wellness/health trackers (158-162), cycle/pregnancy (161-164), family locator/parental controls (166-169), and kids-directed (163-179) apps.

### High: Implementation-Readiness Gap For IDs 261-1000 (Phase 8 Step 8.3)

The Draft 1 specs for IDs 261-1000 still use plausible discovery URLs in Research Sources (all marked "Source discovery — pending exact URL verification"), do not distinguish verified vs inferred behavior beyond generic "inferred" flags, and have not yet passed full category risk review for high-risk routing categories.

Impact: IDs 261-1000 cannot be considered for downstream implementation candidate selection until they reach implementation-ready public-source V1 status.

Recommended fix:
- Phase 8 Step 8.3: replace discovery URLs with exact first-party URLs (marketplace/help/privacy/legal/product), distinguish verified vs inferred behavior, enumerate concrete screens/entities/API routes/permissions/subscription states/edge cases/analytics events/test matrix/build-plan phases at implementation-ready depth, add full category risk review (dating/finance/telehealth/health/kids/location/school/enterprise/security/marketplace), and mark blocked flows with owner/path.

### High: Hands-On Verification Remains Blocked

All specs still have hands-on account/device verification incomplete. Implementation-ready specs list manual native/parity blockers explicitly rather than treating them as generic unresolved research.

Impact: Subscription-gated flows, physical-device flows, region-specific flows, account recovery, deletion/export, and notification behavior may still differ from production apps.

Recommended fix: Use lawful test accounts/devices to verify reachable flows. Mark paid, regulated, hardware, or region-blocked flows explicitly.

## Positive Observations

- The repo has complete numerical coverage from `001` through `100`.
- Every numbered spec includes canonical hygiene sections.
- Every numbered spec includes legal guardrails, research-source orientation, privacy/safety requirements, edge cases, test plan, acceptance criteria, open questions, and next steps.
- The spec set now distinguishes source discovery from exact verification and hands-on behavior.
- Batch 01 now has implementation-ready public-source V1 coverage for AI assistant, AI search, AI companion, short-video, social-media, camera-social, community, decentralized-social, visual-discovery, lifestyle-social, private messaging, cloud messaging, privacy messaging, community chat, and workplace chat patterns.
- Batch 02 now has implementation-ready public-source V1 coverage for communication, calling, meetings, email, maps, navigation, rideshare, micromobility, car-sharing, lodging marketplace, multi-product travel booking, travel deals, itinerary organization, local delivery, food delivery, and grocery delivery patterns.
- Batch 04 now has implementation-ready public-source V1 coverage for crypto exchange, credit/personal finance, zero-based budgeting, subscription and bill management, digital wallet/pass, music streaming, social audio, audiobooks, podcast player, streaming video, user-generated video, live streaming, film social, entertainment database, gamified lessons, broad course learning, flashcard study, and online course marketplace patterns.
- Batch 05 now has implementation-ready public-source V1 coverage for camera math learning, meditation, sleep/wellness, GPS fitness social, running plans, nutrition logging, wearable health dashboards, reproductive-health tracking, productivity planning, kanban collaboration, calendars, notes, cloud storage, creator tools, photo editing, photo libraries, and smart-home video security patterns.

## Next Steps

- Phase 8 Step 8.3: upgrade IDs 261-1000 from canonical Draft 1 to implementation-ready public-source V1 with exact first-party sources, verified-vs-inferred distinction, full category risk review, and explicit blockers. Use `node scripts/check-implementation-readiness.mjs` as the pre/post batch gate.
- Complete hands-on verification where lawful and feasible.

## 1000-App Extension Addendum - 2026-04-21

The backlog now targets 1000 mobile app clone projects. IDs 201-1000 were added as canonical Draft 1 scaffolds with one H1, the canonical section set, source-discovery research rows, legal-scope guardrails, screen/entity/API/test/build-plan scaffolding, and explicit manual verification blockers.

Metrics after extension:

- Numbered app specs present: 1000.
- Missing numeric IDs from `001` through `1000`: 0 after structural validation.
- Implementation-ready public-source V1 specs: 100 (IDs 001-100).
- Canonical Draft 1 specs/scaffolds awaiting exact-source replacement: 900 (IDs 101-1000).
- Hands-on app behavior fully verified: 0; manual blockers remain explicit.

Remaining high-priority gap: promote IDs 101-1000 to implementation-ready public-source V1 by replacing discovery URLs with exact first-party URLs, distinguishing verified vs inferred behavior, and completing category-specific risk reviews.

## Step 8.3 Pre-Promotion Audit - 2026-05-01

`node scripts/check-implementation-readiness.mjs` reports:

| Range | Specs | Ready | Files With Placeholders | Placeholder Rows |
|---|---:|---:|---:|---:|
| 001-100 | 100 | 100 | 0 | 0 |
| 101-200 | 100 | 0 | 100 | 504 |
| 201-300 | 100 | 0 | 100 | 300 |
| 301-400 | 100 | 0 | 100 | 300 |
| 401-500 | 100 | 0 | 100 | 300 |
| 501-600 | 100 | 0 | 100 | 300 |
| 601-700 | 100 | 0 | 100 | 300 |
| 701-800 | 100 | 0 | 100 | 300 |
| 801-900 | 100 | 0 | 100 | 300 |
| 901-1000 | 100 | 0 | 100 | 300 |
