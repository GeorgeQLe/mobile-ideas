# Spec Quality Audit

Created: 2026-04-16
Updated: 2026-04-20

## Verdict

The 100 technical specs for IDs 001-100 pass the Draft 1 structural and public-source V1 depth gate. Phase 3 implementation-readiness upgrades have replaced discovery sources with exact first-party URLs for all 100 of those specs.

Phase 7 Step 7.1 added 100 new Draft 0 placeholder specs for IDs 101-200 across `specs/batch-06/` through `specs/batch-10/`. Those placeholders meet the Draft 0 structural gate (exactly one H1, metadata block, canonical section headings present) but explicitly do NOT yet meet the Draft 1 depth gate, the implementation-readiness gate, or the exact-first-party-source gate. Step 7.2 will normalize them to canonical Draft 1; Step 7.3 will upgrade them to implementation-ready public-source V1.

The IDs 001-100 specs are not final one-for-one clone specs because hands-on verification remains blocked for native, paid, account, hardware, support, and regional flows.

## Audit Scope

- Reviewed `tasks/ideas.md` (now 200 rows after the 2026-04-20 extension).
- Reviewed `specs/README.md`.
- Reviewed all 100 implementation-ready specs under `specs/batch-01/` through `specs/batch-05/`.
- Reviewed all 100 Draft 0 placeholder specs under `specs/batch-06/` through `specs/batch-10/` (added Phase 7 Step 7.1, 2026-04-20).
- Checked lifecycle docs required by hygiene.
- Ran a structural metrics pass over all numbered spec files.

## Quality Gate Used

A Draft 1 or public-source V1 spec must meet these minimums:

- One H1 and all canonical sections.
- App-specific research source table with exact first-party URLs.
- App-specific source-backed requirements, screen inventory, data model, API/backend contracts, offline/realtime behavior, privacy/safety controls, analytics, edge cases, tests, acceptance criteria, open questions, and next steps.
- Explicit blocked hands-on verification notes for account, paid, native, notification, device, and regional behavior that has not been lawfully verified.

## Metrics Summary

- Numbered app specs present: 200 (100 implementation-ready + 100 Draft 0 placeholders).
- Missing numeric IDs from `001` through `200`: 0.
- Specs with exactly one H1: 200.
- Specs with all canonical section headings present: 200.
- Specs passing Draft 1 depth metrics: 100 (IDs 001-100); 0 of the Draft 0 placeholders (IDs 101-200) yet.
- Specs failing Draft 1 depth metrics by intent (Draft 0 placeholders): 100 (IDs 101-200).
- Specs with exact first-party source URLs replacing discovery links: 100 (IDs 001-100); 0 (IDs 101-200) — placeholder Research Sources section is still TODO.
- Specs with hands-on app behavior fully verified: 0.
- Specs upgraded to implementation-ready public-source V1: 100 (IDs 001-100).

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

## Remaining Findings

### High: Draft 0 Gap For IDs 101-200 (Phase 7 Step 7.1)

Phase 7 Step 7.1 added 100 Draft 0 placeholder specs for IDs 101-200 across `specs/batch-06/` through `specs/batch-10/`. Each file has exactly one H1, the `> Inspiration / > Category / > Readiness status: Draft 0 / > Legal scope` metadata block, and all canonical section headings. Section bodies are TODO placeholders pointing back at `tasks/ideas.md` for the inspiration brief.

These specs do NOT yet meet the Draft 1 depth gate, do NOT have exact first-party source URLs, do NOT enumerate screens/data/API/edge-cases, and do NOT carry manual verification blockers. They are explicitly placeholder scaffolds, mirroring the original 001-100 Draft 0 gap that was later closed by the canonical Draft 1 normalization.

Impact: IDs 101-200 cannot be considered for downstream implementation candidate selection until they reach implementation-ready public-source V1 status (Phase 7 Step 7.3).

Recommended fix:
- Phase 7 Step 7.2: rewrite each placeholder into the canonical Draft 1 structure used by IDs 001-100. Include the full metadata block (Inspiration, Category, Readiness status, Verification basis, Manual verification blockers, Legal scope) and populate every section, even where content is still inferred-only.
- Phase 7 Step 7.3: replace any discovery links with exact first-party URLs, distinguish verified vs inferred behavior, enumerate concrete screens/entities/API routes/permissions/subscription states/edge cases/analytics events/test matrix/build-plan phases, add category risk notes (dating/finance/health/kids categories are heavily represented — flag child-directed and health-adjacent apps for category-specific risk review), and mark blocked flows with owner/path.

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

- Phase 7 Step 7.2: normalize the 100 IDs 101-200 Draft 0 placeholders into canonical Draft 1 specs.
- Phase 7 Step 7.3: upgrade IDs 101-200 to implementation-ready public-source V1 with exact first-party sources and explicit blockers.
- Complete hands-on verification where lawful and feasible.
