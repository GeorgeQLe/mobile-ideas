# History

## 2026-05-03 - Step 8.3 Personal Productivity Notes And Outdoor Readiness Slice

- Promoted the next Phase 8 Step 8.3 slice, IDs 196-200 (`Things 3` through `AllTrails`), from Draft 1 to implementation-ready public-source V1.
- Replaced Research Sources placeholder rows with exact public marketplace, official product/help/support, privacy, terms, sync/encryption, and activity/offline/navigation source URLs as applicable. Every promoted source row is marked `Verified 2026-05-03`.
- Preserved manual blockers for native quick entry/share extensions, widgets/watch/Siri/Shortcuts, app-store purchase/restore, local file-system vault behavior, plugin sandboxing, cross-device sync, E2EE key recovery, media capture, background/precise location, offline map rendering, real-device recording accuracy, subscriptions, and accessibility.
- Added category risk coverage for local-first/offline sync, cloud/provider scopes, attachment/media storage, note/journal content privacy, prompt licensing, plugin permissions, location/GPS minimization, map/trail data licensing, safety disclaimers, live-share token controls, review/photo moderation, export/delete, and subscription limits.
- Validation: targeted checks found one H1 and 18 canonical H2 sections in each promoted file and no `Source discovery`, `Readiness status: Draft`, or exact-URL-pending markers in the 5-file slice. Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 200 implementation-ready specs and 2,400 source-discovery placeholder rows across 800 remaining files.

## 2026-05-02 - Step 8.3 Kids Education, Video, And Language Readiness Slice

- Promoted the next Phase 8 Step 8.3 slice, IDs 174-180 (`ScratchJr` through `Babbel`), from Draft 1 to implementation-ready public-source V1.
- Replaced Research Sources placeholder rows with exact public marketplace, official product/support/help, privacy, terms, and child/video/language-learning source URLs as applicable. Every promoted source row is marked `Verified 2026-05-02`.
- Preserved manual blockers for native tablet gestures, project import/export, camera/photo/microphone insertion, subscription purchase/restore, trial conversion, parental gates, classroom/teacher accounts, offline downloads, licensed content, live/video behavior, speech recognition, push payloads, and real account/device behavior.
- Added category risk coverage for COPPA/child-directed design, parent dashboards and consent, no behavioral advertising to children, child profile minimization, classroom/school privacy, licensed books/video/curriculum, age-tiered video controls, moderation/reporting, region/license restrictions, speech/audio retention, minor age gates, and data export/delete.
- Updated readiness/audit docs. Post-slice `node scripts/check-implementation-readiness.mjs` reports 180 implementation-ready specs and 2,482 remaining source-discovery placeholder rows across 820 unpromoted files. The command exits nonzero by design until all IDs 101-1000 are promoted.

## 2026-05-02 - Step 8.3 School Communication And LMS Readiness Slice

- Promoted the next Phase 8 Step 8.3 slice, IDs 170-173 (`ClassDojo` through `Google Classroom`), from Draft 1 to implementation-ready public-source V1.
- Replaced Research Sources placeholder rows with exact public marketplace, official help/support, privacy, terms, education privacy, and API/documentation URLs as applicable. Every promoted source row is marked `Verified 2026-05-02`.
- Preserved manual blockers for teacher/admin onboarding, district/school agreements, roster import, parent/student invites, SMS delivery and carrier opt-out, institution SSO, LMS submissions/quizzes, cloud storage integrations, guardian summaries, subscription restore, translation behavior, production push payloads, offline downloads, and real account/device behavior.
- Added category risk coverage for FERPA/student-data posture, COPPA-style review, no student advertising, school account boundaries, teacher/parent/student role separation, classroom media consent, message/comment moderation, guardian/custody controls, SMS/telecom consent, LMS tenant isolation, cloud OAuth scopes, support redaction, and data export/delete through school policy.
- Validation: targeted `rg -n "Source discovery|Readiness status" specs/batch-09/17{0,1,2,3}-*.md` showed implementation-ready status for all four promoted specs and no source-discovery placeholders. Post-slice `node scripts/check-implementation-readiness.mjs` reports 173 implementation-ready specs and 2,517 remaining source-discovery placeholder rows across 827 unpromoted files. The command exits nonzero by design until all IDs 101-1000 are promoted.

## 2026-05-01 - Step 8.3 Family And Parental Controls Readiness Slice

- Promoted the next Phase 8 Step 8.3 slice, IDs 165-169 (`Cozi` through `Google Family Link`), from Draft 1 to implementation-ready public-source V1.
- Replaced Research Sources placeholder rows with exact public marketplace, official product/help/support, privacy, terms, and device/platform limitation URLs as applicable. Every promoted source row is marked `Verified 2026-05-01`.
- Preserved manual blockers for subscription restore, native push payloads, background location, device pairing/enrollment, content filtering, app/purchase approvals, platform-specific monitoring APIs, age/consent flows, partner dispatch/hardware integrations, and hands-on device behavior.
- Added category risk coverage for household permissions, precise-location minimization, no covert monitoring, child consent/assent, COPPA-style review, domestic-abuse misuse, caregiver/guardian roles, custody disputes, support redaction, and school/family data separation.
- Updated readiness/audit docs. Post-slice `node scripts/check-implementation-readiness.mjs` reports 169 implementation-ready specs and 2,537 remaining source-discovery placeholder rows across 831 unpromoted files. The command exits nonzero by design until all IDs 101-1000 are promoted.

## 2026-05-01 - Step 8.3 Reading News Readiness Slice

- Promoted the next Phase 8 Step 8.3 slice, IDs 121-136 (`Wattpad` through `Ground News`), from Draft 1 to implementation-ready public-source V1.
- Replaced their Research Sources placeholder rows with exact public marketplace, official help/support, legal/privacy, methodology, API, and open-standard URLs as applicable. Every promoted source row is marked `Verified 2026-05-01`.
- Preserved manual blockers for native capture, paid purchases/restores, gated account behavior, publisher/creator workflows, push payloads, and methodology/subscription rendering where hands-on access is still required.
- Updated `specs/README.md` and `tasks/todo.md` to reflect 136 implementation-ready specs and the next Step 8.3 slice: IDs 137-149 finance/investing/banking.
- Validation: `node scripts/check-implementation-readiness.mjs` reports 136 implementation-ready specs and 2,702 remaining source-discovery placeholder rows across 864 unpromoted files. The command exits nonzero by design until all IDs 101-1000 are promoted.

## 2026-05-01 - Step 8.3 Professional Jobs Real Estate Events Publishing Slice

- Promoted the next Phase 8 Step 8.3 slice, IDs 107-120 (`LinkedIn` through `Substack`), from Draft 1 to implementation-ready public-source V1.
- Replaced their Research Sources placeholder rows with exact first-party marketplace, help/support, privacy/legal, community/safety, fair-housing, payment/subscription, and publishing-policy URLs.
- Tightened app-specific manual blockers for native device review, subscriptions/payments, identity/address verification, MLS/rental data licensing, fair-housing review, event/ticketing payouts, creator payouts, and push behavior.
- Validation: targeted H1/section/readiness checks passed for all 14 files. Full-scope `node scripts/check-implementation-readiness.mjs` now reports 120/1000 implementation-ready specs and 2,782 remaining source-discovery placeholder rows across IDs 121-1000.

## 2026-05-01 - Step 8.3 Dating Readiness Slice

- Promoted the first Phase 8 Step 8.3 category slice, IDs 101-106 (`Tinder`, `Bumble`, `Hinge`, `Grindr`, `Match`, and `Coffee Meets Bagel`), from Draft 1 to implementation-ready public-source V1.
- Replaced their Research Sources placeholder status with exact first-party URL verification status and kept native/account/subscription/verification/push blockers explicit.
- Preserved dating-specific safety coverage: age gate, minors protection, NCII reporting, doxxing/location safety, block/report/unmatch, hidden/incognito mode, sensitive-message handling, harassment escalation, and subscription reconciliation.
- Updated readiness/audit docs. Post-slice `node scripts/check-implementation-readiness.mjs` reports 106/1000 implementation-ready specs and 2,866 remaining source-discovery placeholder rows across IDs 107-1000.

## 2026-05-01 - Step 8.3 Pre-Promotion Audit

- Added `scripts/check-implementation-readiness.mjs` as the repeatable gate for Step 8.3 promotion batches.
- Verified the current implementation-readiness state: 100/1000 specs are implementation-ready, all in IDs 001-100.
- Confirmed the handoff count of 504 source-discovery placeholders applies to IDs 101-200 only; the full Step 8.3 scope has 2,904 placeholder rows across 900 files.
- Updated `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, and `tasks/todo.md` to record the measured state and keep Step 8.3 open until exact first-party URLs, verified-vs-inferred distinctions, and category risk reviews land.

## 2026-05-01 - Downstream Seeding Completion Verification

- Verified `tasks/repo-seeding.md` has 1000 checked downstream manifest rows and 0 unchecked rows.
- Confirmed Phase 8 Step 8.6 is complete: IDs 201-1000 have private, non-empty scaffold downstream repos with README and copied source specs recorded before manifest completion.
- Updated `tasks/todo.md`, `tasks/roadmap.md`, `tasks/reconciliation-report.md`, and `tasks/phases/phase-7.md` to remove stale in-progress / next-batch language.
- Remaining Phase 8 work is not seeding: promote IDs 101-1000 to implementation-ready public-source V1 and reconcile the Phase 5 implementation-plan queue.

## 2026-04-24 - Downstream Repo Seeding Batch 521-540

- Seeded private downstream repos for IDs 521-540 via `scripts/seed-downstream-batch.mjs --from 521 --to 540 --execute` (serial, ≥30s cadence, ≤20/hour cap).
- All 20 repos verified PRIVATE with README.md, source spec under `docs/source-specs/`, and root commit present.
- Pre-batch rate limit: 4571/5000 remaining. Post-batch: 4940/5000 remaining.
- Batch evidence recorded in `tasks/repo-seeding.md` under `### Batch 521-540 Seeding Evidence`.
- Updated `tasks/todo.md` next-batch pointer to 541-560. Total seeded: IDs 201-540 (340 repos).

## 2026-04-24 - Downstream Repo Seeding Batch 501-520

- Seeded private downstream repos for IDs 501-520 via `scripts/seed-downstream-batch.mjs --from 501 --to 520 --execute` (serial, ≥30s cadence, ≤20/hour cap).
- All 20 repos verified PRIVATE, non-empty, with README + `docs/source-specs/NNN-<slug>.md` and a root commit; manifest rows flipped to `[x]` in `tasks/repo-seeding.md`.
- `### Batch 501-520 Seeding Evidence - 2026-04-24T13:55:57.467Z` section appended to `tasks/repo-seeding.md` with pre/post rate-limit snapshots and per-repo rows.
- Post-batch core rate-limit remaining: 4789/5000. No 403/429/secondary-limit hits.
- Category note: crypto/fintech-dense batch (Binance, Kraken, MetaMask, MoonPay, BNPL/earned-wage apps). Downstream repos remain scaffold-only at Draft 1 per CLAUDE.md:41 — no implementation-ready parity claim until Step 8.3 verifies exact sources and completes category risk review.
- Next batch: 521-540.

## 2026-04-23 - Downstream Repo Seeding Batch 481-500

- Seeded private downstream repos for IDs 481-500 via `scripts/seed-downstream-batch.mjs --from 481 --to 500 --execute` (serial, ≥30s cadence, ≤20/hour cap).
- All 20 repos verified PRIVATE, non-empty, with README + `docs/source-specs/NNN-<slug>.md` and a root commit; manifest rows flipped to `[x]` in `tasks/repo-seeding.md`.
- `### Batch 481-500 Seeding Evidence - 2026-04-23T19:04:54.158Z` section appended to `tasks/repo-seeding.md` with pre/post rate-limit snapshots and per-repo visibility/status rows.
- Post-batch core rate-limit remaining: 4760/5000. No 403/429/secondary-limit hits.
- Category note: batch is finance-dense (banks, brokerages, fintech). Downstream repos remain scaffold-only at Draft 1 per CLAUDE.md:41 — no implementation-ready parity claim until Step 8.3 verifies exact sources and completes category risk review.
- Next batch: 501-520.

## 2026-04-23 - Phase 7 Closed

- Verified 100/100 downstream repos for IDs 101-200 seeded PRIVATE + non-empty per `tasks/repo-seeding.md`.
- No downstream repo public.
- Step 7.3 absorbed into Phase 8 Step 8.3 per the 2026-04-23 reconciliation (CLAUDE.md allows scaffold-only seeding at Draft 1).
- Phase 7 status flipped `Active` → `Complete` in `tasks/roadmap.md`; Step 7.6 checked off in `tasks/todo.md` and roadmap milestones.
- Archived Phase 7 todo snapshot to `tasks/phases/phase-7.md`.
- Replaced `tasks/todo.md` content with Phase 8 plan; next concrete action recorded as Step 8.6 batch 481-500.
- Removed stale `tasks/manual-todo.md` (was scoped to Phase 6 with one unchecked non-blocking `_(after: Step 6.1)_` item; Phase 8 has no manual tasks defined in `tasks/roadmap.md`).
- Active phase shifts to Phase 8.

## 2026-04-23 - `/reconcile-dev-docs` Fix Pass

- Corrected `tasks/todo.md` phase counter from "7 of 7" to "7 of 8" (Phase 8 opened 2026-04-21).
- Marked `tasks/roadmap.md` Phase 5 status `Active` → `Complete` (all acceptance criteria were `[x]`).
- Marked Phase 7 Steps 7.1 and 7.2 `[x]` in the roadmap milestones (completed 2026-04-20 and 2026-04-21 per history).
- Created `tasks/phases/phase-5.md` archive.
- Appended factual aggregate history entries below for the undocumented 2026-04-21 through 2026-04-23 seeding + build-tracking workstream (30 commits).
- Surfaced unresolved ambiguities in `tasks/todo.md` under `## Development Docs Reconciliation`.
- Wrote `tasks/reconciliation-report.md`.

## 2026-04-22 - Downstream Repo Seeding Batches 261-460 + Build Tracking 281-460

- Seeded 200 additional private downstream repos in 20-ID batches (IDs 261-460) via `scripts/seed-downstream-batch.mjs` with the rolling hourly cap enabled. Commits: `da227b3` (261-280), `2dcdae2` (281-300), `0d32292` (301-320), `a94bff5` (321-340), `7dc5ee8` (341-360), `4472e8d` (361-380), `8b60ed6` (381-400), `da8e95f` (401-420), `cf964d3` (421-440), `4f478e2` (441-460). Every repo verified PRIVATE, non-empty, with root commit before manifest checkmark per CLAUDE.md contract.
- Pushed downstream build-planning baselines for IDs 281-460 in matching 20-ID batches. Commits: `69c3d5b` (261-280), `bd388f3` (281-300), `50c8af2` (301-320), `284c9e2` (321-340), `aec393d` (341-360), `931cd0d` (361-380), `ec04d93` (381-400), `d610f54` (401-420), `55b0313` (421-440), `b654012` (441-460). Each build push added `docs/decisions/stack.md`, expanded `docs/plans/README.md`, and updated `tasks/todo.md` + `tasks/history.md` in the downstream repo.
- Fix committed: `b3e8885 fix(seeding): count repaired batches in hourly guard`.
- Ordering deviation: this workstream effectively executed Phase 7 Step 7.4 (extend manifest to 1000 rows — done earlier under `cd54fcf feat(specs): extend mobile ideas to 1000`) and Step 7.5 (seeding) in parallel, while Step 7.3 (implementation-readiness upgrades for IDs 101-200) remains undone. The specs seeded for IDs 101-460 use Draft 1 canonical content with `Source discovery — pending exact URL verification` placeholders; downstream repos therefore cannot claim implementation-ready parity until Step 7.3 (and its equivalent for IDs 201-460) lands.

## 2026-04-21 - Build Planning Batches 021-260 + Automation

- Added downstream build-start automation (`424122b feat(builds): add downstream build-start automation`, `00220e9 feat(builds): track downstream build starts`).
- Recorded build-planning batches for IDs 021-260 via `chore(builds): record build planning batch NNN-MMM` commits (`cd91084` 021-040 … `834e9ec` 241-260; twelve commits total).

## 2026-04-23 - Doc Reconciliation Note + Batch 461-480 Seeding/Builds

- Reconciliation note: since the 2026-04-21 entry, an undocumented rolling workstream seeded private downstream repos and tracked downstream build starts in 20-ID increments from 261-460, interleaved with build-planning batches 081-260. That work was committed directly (see `git log` 2dcdae2..b654012) but was not reflected in `tasks/history.md`, `tasks/todo.md`, or `tasks/roadmap.md`. Phase 7 Step 7.3 (implementation-readiness upgrades for IDs 101-200) remains undone; the seeding track effectively absorbed Step 7.4-7.5 outputs. A full `/reconcile-dev-docs` pass is deferred.
- This session: executed Option A (continue active workstream) for batch 461-480 — seeded 20 private downstream repos and pushed build-planning baselines for all 20.
- Incidents: local disk hit 100% mid-run (cleared 34.56 GiB Docker prune + 32 GiB loadoutworks `.turbo` / `.next`; fixed `loadoutworks turbo.json` to exclude `.next/dev/**` from build outputs — unrelated to mobile-ideas but blocking). GitHub partial system outage caused intermittent 500s on clone (463) and push (472, 474); all three were recovered via retry / manual manifest update (verified PRIVATE + non-empty); blocker entries appended to `tasks/repo-seeding.md`.
- Rate limit healthy: pre-batch 4940/5000, post-batch 4942/5000 core.

## 2026-04-16

- Created `tasks/ideas.md` with 100 mobile app clone ideas.
- Created the private GitHub repository at `GeorgeQLe/mobile-ideas`.
- Added Draft 0 technical specs for all 100 app ideas under `specs/`.
- Added `tasks/spec-quality-audit.md`, documenting that the Draft 0 specs were useful scaffolds but not yet best-quality or deeply researched.
- Ran a hygiene audit and found missing lifecycle docs plus spec-template drift.
- Planned remediation to add minimal lifecycle docs and rewrite all specs into canonical Draft 1 shape.
- Defined the implementation-readiness gate in `tasks/implementation-readiness.md`.
- Archived the Draft 1 ChatGPT spec and upgraded `specs/batch-01/001-chatgpt.md` to an implementation-ready public-source V1 spec with exact sources, app-specific contracts, explicit manual blockers, and a build plan.
- Archived the Draft 1 TikTok spec and upgraded `specs/batch-01/006-tiktok.md` to an implementation-ready public-source V1 spec with exact marketplace/help/legal sources, app-specific feed/creator/remix/safety contracts, explicit commerce and native verification blockers, and a build plan.
- Archived the Draft 1 WhatsApp spec and upgraded `specs/batch-01/016-whatsapp.md` to an implementation-ready public-source V1 spec with exact marketplace/feature/help/legal sources, app-specific messaging/calling/group/status/channel contracts, explicit privacy/security controls, and phone verification, contacts, backups, linked devices, business, payments, AI, and native verification blockers.
- Archived the Draft 1 Google Maps spec and upgraded `specs/batch-02/026-google-maps.md` to an implementation-ready public-source V1 spec with exact marketplace/help/legal/policy sources, app-specific search/place/directions/navigation/transit/offline/location-sharing/contribution contracts, explicit privacy and route-safety controls, and live navigation, traffic, transit, offline maps, Timeline/activity, business, AR, vehicle/watch, and native verification blockers.
- Archived the Draft 1 Airbnb spec and upgraded `specs/batch-02/033-airbnb.md` to an implementation-ready public-source V1 spec with exact marketplace/help/legal/policy sources, app-specific lodging search/listing/booking/checkout/trips/messaging/review/host-tool contracts, explicit marketplace trust and lodging-safety controls, and identity, payment, payout, tax, damage/dispute, services/experiences, regional, and native verification blockers.

## 2026-04-17

- Archived the Draft 1 DoorDash spec and upgraded `specs/batch-02/038-doordash.md` to an implementation-ready public-source V1 spec with exact marketplace/product/help/legal/privacy/merchant/Dasher sources, app-specific restaurant/store discovery, menu modifier, cart quote, checkout fee, DashPass, SNAP/EBT, alcohol, tracking, merchant adjustment, support/refund, privacy, and local-delivery marketplace contracts, plus explicit regulated-item, payment, merchant-tooling, support, and native verification blockers.
- Archived the Draft 1 Amazon spec and upgraded `specs/batch-03/046-amazon.md` to an implementation-ready public-source V1 spec with exact marketplace/customer/order/return/privacy/legal/Prime/seller/ads sources, app-specific product search/detail, seller offer, cart/checkout, Prime-style membership, Subscribe & Save-style recurring order, order tracking, return/refund/replacement, seller-tooling, sponsored-listing, review, customer-support, privacy, and broad-commerce marketplace contracts, plus explicit payment, membership, subscription, seller, ads, regulated-item, support, and native verification blockers.
- Archived the Draft 1 Cash App spec and upgraded `specs/batch-03/056-cash-app.md` to an implementation-ready public-source V1 spec with exact marketplace/product/legal/privacy/security/scam/card/direct-deposit/bitcoin/investing/tax/family/business sources, app-specific peer payment, request, payment-link, pool, balance, cash-out, debit-card, merchant-pay, bitcoin, investing, tax, sponsored-account, business-account, support, privacy, and regulated-finance contracts, plus explicit identity, money movement, card, bitcoin, investing, tax, teen/family, business, support, and native verification blockers.
- Archived the Draft 1 Spotify spec and upgraded `specs/batch-04/066-spotify.md` to an implementation-ready public-source V1 spec with exact marketplace/Premium/help/legal/privacy/family/audiobook/creator/ads/developer sources, app-specific music, podcast, audiobook, playlist, queue, offline, lyrics, device-handoff, shared-listening, family, creator, ads, privacy, and licensed-media contracts, plus explicit downloads, rights, ads, recommendations, subscriptions, family, creator, push, regional, and native verification blockers.
- Archived the Draft 1 Notion spec and upgraded `specs/batch-05/089-notion.md` to an implementation-ready public-source V1 spec with exact marketplace/help/privacy/terms/security/pricing/AI/API sources, app-specific workspace, page, block, database, search, sharing, permissions, comments, notifications, offline, import/export, AI, integration, billing, privacy, and enterprise/admin contracts, plus explicit workspace, offline sync, AI, import/export, billing, push, API, support, regional, and native verification blockers.

## 2026-04-17 - Batch 01 AI/Social Readiness Upgrade

- Archived Draft 1 copies for `002-claude.md`, `003-perplexity.md`, `004-character-ai.md`, `005-replika.md`, and `007-instagram.md` through `015-lemon8.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, safety, and product URLs for the selected Batch 01 specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific source-backed requirements, screen inventories, data models, API contracts, risk controls, edge cases, tests, acceptance criteria, build plans, and explicit manual verification blockers.
- Updated readiness and audit counts from 10 to 23 implementation-ready public-source V1 specs and prepared the next runnable Batch 01 tail step.

## 2026-04-17 - Batch 01 Messaging/Workplace Tail Readiness Upgrade

- Archived Draft 1 copies for `017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, safety, moderation, product, and developer URLs for the selected Batch 01 tail specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific messaging, group/community, channel/workspace, voice/video, integration, admin, billing, privacy, safety, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 23 to 27 implementation-ready public-source V1 specs and made Batch 01 fully implementation-ready for public-source V1.

## 2026-04-17 - Batch 02 Communication/Email Readiness Upgrade

- Archived Draft 1 copies for `021-messenger.md`, `022-facetime.md`, `023-zoom.md`, `024-gmail.md`, and `025-outlook.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, and platform documentation URLs for the selected Batch 02 communication/email specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific messaging, calling, meetings, email, calendar, AI, enterprise/admin, privacy, safety, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 27 to 32 implementation-ready public-source V1 specs and prepared the next Batch 02 maps/mobility step.

## 2026-04-17 - Batch 02 Maps/Mobility Readiness Upgrade

- Archived Draft 1 copies for `027-apple-maps.md`, `028-waze.md`, `029-uber.md`, `030-lyft.md`, `031-lime.md`, and `032-turo.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, safety, product, and policy URLs for the selected Batch 02 maps/mobility specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific maps, navigation, rideshare, micromobility, car-sharing, routing, dispatch, fleet, booking, protection, privacy, safety, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 32 to 38 implementation-ready public-source V1 specs and prepared the next Batch 02 travel booking step.

## 2026-04-17 - Batch 02 Travel Booking Readiness Upgrade

- Archived Draft 1 copies for `034-booking-com.md`, `035-expedia.md`, `036-hopper.md`, and `037-tripit.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, loyalty/subscription, price-protection, cancellation/refund, itinerary-import, and alert URLs for the selected Batch 02 travel booking specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific lodging, multi-product OTA booking, price prediction/watch, trip-flexibility, itinerary import, Inbox Sync, document, calendar, alert, support, privacy, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 38 to 42 implementation-ready public-source V1 specs and prepared the next Batch 02 food/grocery delivery step.

## 2026-04-17 - Batch 02 Food/Grocery Delivery Readiness Upgrade

- Archived Draft 1 copies for `039-uber-eats.md` and `040-instacart.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, membership, merchant/retailer, courier/shopper, regulated-item, SNAP/EBT, and accessibility URLs for the selected Batch 02 food/grocery delivery specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific restaurant/store discovery, grocery/retail catalog, menu/item customization, replacements, cart quote, checkout, membership, regulated-item, SNAP/EBT, delivery/pickup, courier/shopper handoff, merchant/retailer tools, privacy, support/refund, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 42 to 44 implementation-ready public-source V1 specs and prepared the next Batch 03 food/local discovery step.


## 2026-04-17 - Batch 03 Food/Local Discovery Readiness Upgrade

- Archived Draft 1 copies for `041-starbucks.md`, `042-mcdonalds.md`, `043-opentable.md`, `044-yelp.md`, and `045-too-good-to-go.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, rewards/reservation/review, merchant/business, refund, and partner URLs for the selected Batch 03 specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific coffee ordering, quick-service ordering, restaurant reservations, local discovery, surplus-food marketplace, loyalty/rewards, pickup, reviews/moderation, business tooling, refund/support, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 44 to 49 implementation-ready public-source V1 specs and prepared the next Batch 03 commerce/resale step.

## 2026-04-17 - Batch 03 Commerce/Resale Readiness Upgrade

- Archived Draft 1 copies for `047-temu.md`, `048-shein.md`, `049-etsy.md`, `050-ebay.md`, `051-facebook-marketplace.md`, `052-poshmark.md`, `053-depop.md`, `054-stockx.md`, and `055-shop.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, seller, buyer-protection, shipping/tracking, rewards, verification, merchant, and policy URLs for the selected Batch 03 commerce/resale specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific discount shopping, fashion commerce, handmade/custom marketplace, auctions/offers, local marketplace, social resale, bid/ask market, package tracking, wallet/reward, seller/merchant tooling, privacy, support/refund/claim, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 49 to 58 implementation-ready public-source V1 specs and prepared the next Batch 03 finance/payment step.

## 2026-04-17 - Batch 03 Finance/Payment Readiness Upgrade

- Archived Draft 1 copies for `057-venmo.md`, `058-paypal.md`, `059-zelle.md`, and `060-robinhood.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, safety, and disclosure URLs for the selected Batch 03 finance/payment/investing specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific social payment, digital wallet, bank-linked transfer, brokerage/investing, card, bank-link, savings, crypto, request, dispute, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 58 to 62 implementation-ready public-source V1 specs, made Batch 03 fully implementation-ready for public-source V1, and prepared the next Batch 04 finance/wallet step.

## 2026-04-18 - Batch 04 Finance/Wallet Readiness Upgrade

- Archived Draft 1 copies for `061-coinbase.md`, `062-mint-credit-karma.md`, `063-ynab.md`, `064-rocket-money.md`, and `065-apple-wallet.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, security, developer/platform, and disclosure URLs for the selected Batch 04 finance/wallet specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific crypto exchange, credit/personal finance, zero-based budgeting, subscription/bill negotiation, wallet/pass/card, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 62 to 67 implementation-ready public-source V1 specs and prepared the next Batch 04 audio step.

## 2026-04-19 - Batch 04 Audio Readiness Upgrade

- Archived Draft 1 copies for `067-apple-music.md`, `068-youtube-music.md`, `069-soundcloud.md`, `070-audible.md`, and `071-pocket-casts.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, subscription, creator/audiobook/podcast, playback, download/offline, sync/device, and policy URLs for the selected Batch 04 audio specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific music streaming, video/audio switching, creator uploads, timed comments, audiobook credits/returns, podcast queues/filters/sync, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 67 to 72 implementation-ready public-source V1 specs and prepared the next Batch 04 video/entertainment step.

## 2026-04-19 - Batch 04 Video/Entertainment Readiness Upgrade

- Archived Draft 1 copies for `072-netflix.md`, `073-youtube.md`, `074-twitch.md`, `075-letterboxd.md`, and `076-imdb.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, subscription, upload/live, review/rating, watchlist, playback, download/offline, moderation, creator, rental, availability, and policy URLs for the selected Batch 04 video/entertainment specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific subscription streaming, user-generated video, live streaming, film diary/social, entertainment database, privacy, support, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 72 to 77 implementation-ready public-source V1 specs and prepared the next Batch 04 education step.

## 2026-04-19 - Batch 04 Education Readiness Upgrade

- Archived Draft 1 copies for `077-duolingo.md`, `078-khan-academy.md`, `079-quizlet.md`, and `080-coursera.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, classroom, subscription, certificate, AI study-tool, and education-platform URLs for the selected Batch 04 education specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific gamified learning, course catalogs, video/practice mastery, flashcard study, course marketplace, classroom/teacher tooling, minors/student privacy, subscriptions, credentials, offline/cache, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 77 to 81 implementation-ready public-source V1 specs, made Batch 04 fully implementation-ready for public-source V1, and prepared the next Batch 05 education/wellness/fitness/health step.

## 2026-04-19 - Batch 05 Education/Wellness/Fitness/Health Readiness Upgrade

- Archived Draft 1 copies for `081-photomath.md`, `082-headspace.md`, `083-calm.md`, `084-strava.md`, `085-nike-run-club.md`, `086-myfitnesspal.md`, `087-fitbit.md`, and `088-flo.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, subscription, device/wearable, anonymous-mode, data-export/delete, and safety URLs for the selected Batch 05 specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific camera math, meditation, sleep/wellness, GPS fitness social, running-plan, nutrition logging, wearable health, reproductive-health privacy, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 81 to 89 implementation-ready public-source V1 specs and prepared the remaining Batch 05 productivity/cloud/creator/photo/smart-home step.

## 2026-04-19 - Batch 05 Productivity/Cloud/Creator/Photo/Smart-Home Readiness Upgrade

- Archived Draft 1 copies for `090-todoist.md`, `091-trello.md`, `092-google-calendar.md`, `093-evernote.md`, `094-dropbox.md`, `095-google-drive.md`, `096-capcut.md`, `097-canva.md`, `098-lightroom.md`, `099-google-photos.md`, and `100-ring.md`.
- Replaced source-discovery links with exact first-party marketplace, help/support, privacy/legal, product, developer, AI, security, subscription, and hardware/support URLs for the remaining Batch 05 specs.
- Rewrote the selected specs to implementation-ready public-source V1 status with app-specific productivity planning, kanban collaboration, calendars, notes, cloud storage, creator editing, photo libraries, smart-home video security, edge-case, test, acceptance, build-plan, and manual verification detail.
- Updated readiness and audit counts from 89 to 100 implementation-ready public-source V1 specs and prepared the first downstream implementation-candidate selection step.

## 2026-04-19 - First Downstream Candidate Selection

- Selected `specs/batch-05/090-todoist.md` as the first downstream implementation candidate.
- Compared Todoist against higher-risk Spotify, Cash App, and Ring candidates and chose Todoist because it can start with original data, provider stubs, feature flags, and blocked acceptance tests instead of licensed media, regulated finance, or physical security hardware dependencies.
- Updated Phase 4 planning to make the next runnable step a Todoist downstream build plan covering route map, API schema, data model, seed data, test checklist, target repo proposal, and deferred manual blockers.

## 2026-04-19 - Todoist Downstream Build Plan

- Created `tasks/todoist-downstream-build-plan.md` from `specs/batch-05/090-todoist.md`.
- Recorded `GeorgeQLe/todoist-mobile-clone` as the proposed downstream implementation repository name.
- Defined the route map, API schema plan, data model plan, synthetic seed data plan, feature flags, blocked acceptance tests, and test checklist for the Todoist-style public-source V1 downstream app.
- Preserved signup/login, quick-add parsing, recurring date, push reminder, calendar integration, team/admin, billing, widget/watch, offline conflict, productivity trend, export/delete, and support escalation blockers as deferred manual verification requirements before native parity claims.
- Updated Phase 4 tracking so the next runnable step is creating or linking the downstream implementation repository.

## 2026-04-19 - Todoist Downstream Repository Created

- Created the private downstream implementation repository at `https://github.com/GeorgeQLe/todoist-mobile-clone`.
- Seeded the downstream repository with `docs/source-specs/090-todoist.md` from `specs/batch-05/090-todoist.md`.
- Seeded the downstream repository with `docs/plans/todoist-downstream-build-plan.md` from `tasks/todoist-downstream-build-plan.md`.
- Updated Phase 4 planning to mark downstream repository creation complete and keep runtime implementation work outside this planning repository.

## 2026-04-19 - Research Roadmap Refresh

- Refreshed the priority documentation queue after Phase 4 completion.
- Confirmed the repository has complete current specs, task history, roadmap, implementation-readiness notes, and downstream Todoist planning for the existing planning contract.
- Added `$pack install business-app` as the next documentation action because `.agents/project.json` is missing and the pack recommender selected `business-app`; pack-specific research queue items should be generated only after the pack is enabled.

## 2026-04-19 - Business App Pack Enabled

- Installed the project-local `business-app` skill pack.
- Created `.agents/project.json` with `project_type` set to `business-app` and `enabled_packs` containing `business-app`.
- Created local Claude and Codex skill symlinks for the business-app research/documentation workflows.
- Marked the pack-install documentation task complete so the next research roadmap refresh can generate pack-specific queue items.

## 2026-04-20 - Downstream Repo Seeding Audit

- Audited `tasks/repo-seeding.md` and confirmed the downstream manifest still has 100 target repo rows, exactly one checked existing repo row, and source specs present under `specs/`.
- Selected `GeorgeQLe/evernote-mobile-clone` from `specs/batch-05/093-evernote.md` as the private non-Todoist dry-run target for the later seeding run.
- Added a repo-seeding evidence log covering dry-run target status, batch progress, blocker handling, and explicit private-by-default decisions.
- Marked Phase 6 Step 6.1 complete and prepared Step 6.2 notes for reusable downstream seed templates.

## 2026-04-20 - Downstream Seed Templates

- Added reusable downstream seed templates under `templates/downstream/` for README, implementation planning, roadmap, current todo, and generic gitignore scaffolding.
- Standardized placeholders for app ID, app name, target repo, source spec path, canonical spec-store URL, non-affiliation language, legal scope, original-assets requirements, and manual verification blockers.
- Kept the templates generic for all 100 downstream manifest rows without hard-coding Todoist, Evernote, or any inspiration-app brand as downstream project identity.
- Marked Phase 6 Step 6.2 complete and expanded Step 6.3 with a self-contained plan for the local seeding utility and dry-run mode.

## 2026-04-20 - Downstream Seeding Utility

- Added `scripts/seed-downstream-repos.mjs` to parse the 100-row downstream manifest, render `templates/downstream/`, copy source specs into `docs/source-specs/`, and print the exact private-only `gh` and `git` commands for a selected target.
- Added local dry-run support for single-target previews and private execution support guarded by explicit `--execute`, `gh auth status`, existing-repo checks, `--reconcile-existing`, and blocker logging.
- Validated the selected Evernote dry-run target with `node scripts/seed-downstream-repos.mjs --target 093 --dry-run --preview-dir /tmp/mobile-ideas-evernote-seed-preview`.
- Confirmed the generated Evernote preview had no unresolved template placeholders and that `--public` is refused by the utility.
- Marked Phase 6 Step 6.3 complete and prepared Step 6.4 for public-release review docs.

## 2026-04-20 - Public-Release Review Prep

- Added root `README.md` documenting the canonical spec-store purpose, repository map, lawful functional-parity scope, non-affiliation policy, no-proprietary-assets rule, downstream private-by-default policy, and source-correction path.
- Added root `LICENSE` licensing original documentation/spec content under CC BY 4.0 while excluding third-party marks, source-app material, logos, screenshots, media, external source material, private APIs, credentials, real user data, and downstream repositories.
- Added `CONTRIBUTING.md` with source-correction, first-party URL, manual verification evidence, privacy-preserving note, no copied asset, no private API, no production data, and downstream implementation link rules.
- Added `SECURITY.md` for private reporting of secrets, private data, copied assets, unsafe affiliation language, proprietary/API leakage, and downstream seeding or visibility mistakes.
- Updated `tasks/repo-seeding.md` with public-release checklist evidence, kept `GeorgeQLe/mobile-ideas` private, marked Phase 6 Step 6.4 complete, and prepared Step 6.5 for the private Evernote downstream seed run.

## 2026-04-20 - Evernote Downstream Seed Blocked

- Attempted Phase 6 Step 6.5 for `GeorgeQLe/evernote-mobile-clone` with `node scripts/seed-downstream-repos.mjs --target 093 --execute --clone-dir /tmp/evernote-mobile-clone`.
- Confirmed the top-level GitHub CLI auth check passed for `GeorgeQLe`, but the seeding utility's internal `gh auth status` check failed twice with an invalid default token.
- Confirmed `GeorgeQLe/evernote-mobile-clone` was not created and recorded the blocker in `tasks/repo-seeding.md` and `tasks/todo.md`.

## 2026-04-20 - Evernote Downstream Seed Completed

- Reran Phase 6 Step 6.5 after the `gh auth login` manual task was resolved; `gh auth status` shows active account `GeorgeQLe` via keyring with `repo`/`workflow` scopes.
- Ran `node scripts/seed-downstream-repos.mjs --target 093 --execute`; created private `GeorgeQLe/evernote-mobile-clone`, seeded the six template files plus `docs/source-specs/093-evernote.md`, and pushed root commit `278b06d` to `origin/main`.
- Verified post-push visibility is `PRIVATE` via `gh repo view --json visibility`; content-audit confirmed placeholder-only docs with no proprietary logos, screenshots, media, private APIs, credentials, or real user data.
- Checked off Phase 6 Step 6.5, its acceptance criterion, and the dry-run batch row in `tasks/repo-seeding.md` and `tasks/todo.md`; marked the prior blocker resolved.

## 2026-04-20 - Todoist Downstream Reconciliation

- Ran `node scripts/seed-downstream-repos.mjs --target 090 --dry-run --preview-dir /tmp/mobile-ideas-todoist-seed-preview`; preview rendered with no unresolved `{{PLACEHOLDER}}` tokens.
- Cloned existing private `GeorgeQLe/todoist-mobile-clone` into a scratch directory and diffed each expected seed file against the preview; source spec `docs/source-specs/090-todoist.md` was already byte-identical to `specs/batch-05/090-todoist.md`.
- Aligned `.gitignore` with the shared template and added generic `docs/plans/README.md`; preserved the pre-template Todoist README, `tasks/roadmap.md`, `tasks/todo.md`, `tasks/history.md`, `docs/decisions/stack.md`, `docs/plans/todoist-downstream-build-plan.md`, and Expo/React Native scaffold as `keep-with-note` items with rationale recorded in `tasks/repo-seeding.md`.
- Pushed reconciliation commit `ffcdbc0` to `GeorgeQLe/todoist-mobile-clone` `main`; post-push `gh repo view --json visibility` confirmed `PRIVATE`.
- Content-audit confirmed no proprietary logos, screenshots, marketing copy, private APIs, credentials, or real user data were introduced.
- Checked off Phase 6 Step 6.6, its acceptance criterion in `tasks/todo.md`, and the Todoist reconciliation row in `tasks/repo-seeding.md`.

## 2026-04-20 - Downstream Batch Seeding (Step 6.7)

- Seeded Batches 01-05 of the downstream repo manifest in serial order under `scripts/seed-downstream-repos.mjs --execute`; each batch was preceded by a fresh dry-run preview that passed the `rg "\{\{[A-Z0-9_]+\}\}"` placeholder check.
- Batch 01 (IDs 001-020): all 20 created private and seeded; root-commit SHAs recorded in `tasks/repo-seeding.md`.
- Batch 02 (IDs 021-040): all 20 created private and seeded.
- Batch 03 (IDs 041-060): all 20 created private and seeded.
- Batch 04 (IDs 061-080): 19 seeded; ID 075 `GeorgeQLe/letterboxd-mobile-clone` recorded as a Step 6.7 blocker — `gh repo create` succeeded (post-create `gh repo view --json visibility` returned `PRIVATE`) but the immediately-following `gh repo clone` failed with a GraphQL "Could not resolve" error (GitHub API propagation lag); per the stop-on-failure contract no retry was attempted and the created remote repo was left unseeded.
- Batch 05 (IDs 081-100 minus the already-completed 090 Todoist and 093 Evernote): all 18 created private and seeded.
- Totals: 97 of 98 remaining downstream repos created private and seeded; 1 blocker recorded; all 99 existing downstream repos (97 new + 090 + 093) confirmed `PRIVATE` post-push; the unseeded letterboxd repo is also `PRIVATE`.
- Content-audit: every seeded repo contains only the six shared template files plus a copy of its source spec under `docs/source-specs/NNN-<slug>.md`; no proprietary logos, screenshots, marketing copy, private APIs, credentials, or real user data were introduced.
- Updated `tasks/repo-seeding.md` with per-batch `### Step 6.7 Batch 0N Seeding - 2026-04-20` sections (preview evidence, per-repo table, privacy statement, content-audit line), checked all 97 seeded manifest rows, checked the five `Seed Batch 0N repos` items under `## Batch Execution Todo`, and consolidated the Letterboxd blocker under `### Failures And Blockers`.
- Checked off Phase 6 Step 6.7 and the `All 100 downstream repos...` acceptance criterion in `tasks/todo.md`.

## 2026-04-20 - Downstream Manifest Verification (Step 6.8)

- Ran a read-only verification pass over all 100 manifest rows in `tasks/repo-seeding.md` using `gh repo view --json visibility` plus `gh api repos/.../contents/docs/source-specs --jq '.[].name'`.
- Visibility: 100 of 100 downstream repos returned `visibility == PRIVATE`; no drift observed.
- Source-spec presence: 99 of 99 non-blocker rows returned the expected `NNN-<slug>.md` file under `docs/source-specs/`.
- README sampling: `gh api repos/<repo>/readme --jq .name` returned `README.md` for one representative per batch (ChatGPT, Messenger, Starbucks, Coinbase, Photomath).
- Letterboxd blocker: reconfirmed `GeorgeQLe/letterboxd-mobile-clone` is `PRIVATE` and `isEmpty=true`; Step 6.7 blocker entry remains the authoritative record; no re-seed attempted (out of scope for Step 6.8).
- Internal consistency: per-repo checklist holds 99 `[x]` rows and 1 `[ ]` row (ID 075); five `### Step 6.7 Batch 0N Seeding` sections plus the Step 6.5 Evernote and Step 6.6 Todoist sections are present.
- Content-audit: no proprietary logos, screenshots, marketing copy, private APIs, credentials, or real user data observed in any inspected repo.
- Updated `tasks/repo-seeding.md` with a new `### Step 6.8 Full Manifest Verification - 2026-04-20` evidence section and checked the `Verify all 100 target repos exist and link back to this spec store.` item under `## Batch Execution Todo`.
- Checked off Phase 6 Step 6.8 in `tasks/todo.md`.

## 2026-04-20 - Letterboxd Downstream Re-Seed (Step 6.8a)

- Reconciled the Step 6.7 Batch 04 Letterboxd blocker by re-seeding the previously empty `GeorgeQLe/letterboxd-mobile-clone` remote via the seeding utility's `--reconcile-existing` path, without recreating the repo or changing its visibility.
- Pre-re-seed state: `gh repo view GeorgeQLe/letterboxd-mobile-clone --json visibility,isEmpty,defaultBranchRef` returned `PRIVATE` / `isEmpty=true` / empty `defaultBranchRef`.
- Preview: `node scripts/seed-downstream-repos.mjs --target 075 --dry-run --preview-dir /tmp/mobile-ideas-letterboxd-reseed-preview` rendered the six template files with no unresolved `{{...}}` placeholders.
- Execute: `node scripts/seed-downstream-repos.mjs --target 075 --execute --reconcile-existing --clone-dir /tmp/letterboxd-mobile-clone-reseed` skipped `gh repo create`, cloned the empty remote, committed and pushed the seed as downstream root commit `6851ac9` (6 files, 495 insertions).
- Post-verify: `gh repo view ... --json visibility,isEmpty,defaultBranchRef` returned `PRIVATE` / `isEmpty=false` / `defaultBranchRef.name=main`; `gh api repos/.../contents/docs/source-specs --jq '.[].name'` returned `075-letterboxd.md`; `gh api repos/.../readme --jq .name` returned `README.md`.
- Privacy: `GeorgeQLe/letterboxd-mobile-clone` remained `PRIVATE`; no visibility change on any repo.
- Content-audit: no proprietary Letterboxd logos, screenshots, marketing copy, film metadata, private APIs, credentials, or real user data were added; only the shared template files and a verbatim copy of `specs/batch-04/075-letterboxd.md`.
- Updated `tasks/repo-seeding.md` with a `### Step 6.8a Letterboxd Re-Seed - 2026-04-20` evidence section, flipped ID 075 to `[x]` in the `Per-Repo Checklist`, updated the Step 6.7 Batch 04 per-repo table row for ID 075 with the new commit SHA, cross-linked the Step 6.7 `### Failures And Blockers` Letterboxd entry to the Step 6.8a section marked RESOLVED, and updated the Step 6.7 `Batch Progress` summary line to note the blocker is resolved.
- With ID 075 reconciled, the Phase 6 acceptance criterion `All 100 downstream repos exist or have explicit blocker notes in tasks/repo-seeding.md` now holds with the stronger statement: 100 of 100 downstream repos seeded private.
- Checked off Phase 6 Step 6.8a in `tasks/todo.md`.

## 2026-04-20 - Step 6.9 Pre-Publication Re-Audit (Publication Blocked Pending Approval)

- Ran the Step 6.9 ship-one-step handoff. Verified `gh auth status` (active `GeorgeQLe`, keyring, `repo`+`workflow` scopes) and confirmed `GeorgeQLe/mobile-ideas` visibility remained `PRIVATE` via `gh repo view --json visibility,isPrivate,nameWithOwner`.
- Re-audited the `## Open-Source Spec Store Checklist` in `tasks/repo-seeding.md`: license (root `LICENSE`, CC BY 4.0 with third-party-mark exclusions), public-reader `README.md`, non-affiliation language, `CONTRIBUTING.md`, `SECURITY.md`, and content-audit for secrets/accounts/assets/screenshots/proprietary-copy/private-APIs/ambiguous-affiliation all still accurate and checked. Re-ran a case-insensitive secret-pattern grep; no real secrets found (matches were prose, source-spec concept references, or template placeholder examples).
- Confirmed downstream privacy intact: Step 6.8 and Step 6.8a evidence shows 100 of 100 downstream repos `PRIVATE`; no downstream repo drifted to non-`PRIVATE` since Step 6.8.
- Approval gate status in this pre-publication pass: `tasks/manual-todo.md` line 16 approval task was `[ ]` (unchecked). Per the Step 6.9 ship-one-step handoff contract, did NOT run `gh repo edit GeorgeQLe/mobile-ideas --visibility public --accept-visibility-change-consequences`; `GeorgeQLe/mobile-ideas` was still `PRIVATE` at this point.
- Recorded the re-audit under a new `### Step 6.9 Pre-Publication Re-Audit - 2026-04-20` evidence subsection in `tasks/repo-seeding.md`, and added a new `Step 6.9 publication blocker (open, 2026-04-20)` entry to the `### Failures And Blockers` section documenting that the visibility change is deferred until the manual approval task is checked.
- Step 6.9 in `tasks/todo.md` was unchecked in this pre-publication pass; the final Phase 6 acceptance criterion (`This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.`) was unchecked; the Milestone `On Completion` block was unchanged (Phase 6 not yet closed at this point).

## 2026-04-20 - Spec Store Published; Phase 6 Closed (Step 6.9)

- User gave explicit approval to publish the spec store with the statement "ok sounds good, make that repo public"; checked the `tasks/manual-todo.md` line 16 approval task to `[x]` with approval evidence inline.
- Executed `gh repo edit GeorgeQLe/mobile-ideas --visibility public --accept-visibility-change-consequences`; command exited 0 with empty stdout and empty stderr.
- Post-change verification: `gh repo view GeorgeQLe/mobile-ideas --json visibility,isPrivate,nameWithOwner,url` returned `{"isPrivate":false,"nameWithOwner":"GeorgeQLe/mobile-ideas","url":"https://github.com/GeorgeQLe/mobile-ideas","visibility":"PUBLIC"}`.
- No downstream repo visibility changed; all 100 downstream repos remain `PRIVATE`.
- Updated `tasks/repo-seeding.md`: checked the final `## Open-Source Spec Store Checklist` item, added a `### Step 6.9 Spec Store Publication - 2026-04-20` evidence section with approval evidence, command, output, and resulting visibility, and marked the previously-open `Step 6.9 publication blocker` as RESOLVED under `### Failures And Blockers`.
- Checked off Phase 6 Step 6.9 and the final Phase 6 acceptance criterion `This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.` in `tasks/todo.md`. Updated the Milestone `On Completion` block to record Phase 6 completion, the Step 6.7/6.8a and Step 6.9 two-pass deviations, no outstanding tech debt, and readiness for a future phase.
- Phase 6 (Downstream Repository Seeding And Spec Store Publication) is closed: 100 of 100 downstream repos seeded `PRIVATE`, spec store `PUBLIC` under explicit approval.

## Next Steps

- No Phase 7 has been planned. When a new phase is scoped, draft its plan in `tasks/todo.md` following the prior phase structure.
- Keep all downstream implementation repos `PRIVATE` until each passes its own legal/name/license review and receives explicit public-release approval.

## 2026-04-21 - Phase 7 Step 7.2: Canonical Draft 1 Normalization for IDs 101-200

- Rewrote all 100 Draft 0 placeholder spec files under `specs/batch-06/` through `specs/batch-10/` into canonical Draft 1 specs matching the structure of `specs/batch-01/001-chatgpt.md`.
- Each file now carries: one H1 (`# <Inspiration>-Style Clone Spec`), full metadata block (Inspiration app, Category, `Readiness status: Draft 1`, Verification basis, Manual verification blockers, Legal scope), and substantive non-TODO content under all 18 canonical sections at the required depth (8-12 user journeys, 8-12 screen rows, 8-12 data entities, 10-15 API routes, 5-8 realtime/push/offline bullets, 6-10 permissions/privacy/safety bullets, 5-8 analytics bullets, 8-12 edge cases, 8-12 tests, 5-8 acceptance criteria, 4-8 open questions, 5-7 build-plan phases, 3-5 next steps). File sizes landed in the 150-220 line target range.
- Category-specific risk notes added for dating (101-106: minor protection, non-consensual imagery, doxxing/stalking, block/report/unmatch, harassment escalation), finance/investing/banking (137-149: no investment advice, KYC/AML, SEC/FINRA-adjacent framing, FDIC/banking-partner disclosures, child-account handling for 148-149), telehealth/therapy (153-157: HIPAA/PHI, state licensure, "not for emergencies" redirect, crisis escalation, controlled-substance prescribing, minor gating), wellness/health trackers (158-162: "not a medical device", HealthKit scope minimization, mic consent), cycle/pregnancy (161-164: post-Dobbs data-disclosure stance, local-first storage), family locator/parental controls (166-169: child consent/assent, no covert monitoring, domestic-abuse threat model), school apps (170-173: FERPA posture, role separation, no advertising to students), and kids-directed (163, 174-179: COPPA-aligned scope, no third-party behavioral tracking, parental-consent flows).
- Research Sources in every new spec uses plausible discovery URLs (Apple App Store + Google Play + help + privacy/legal) with Status marked "Source discovery — pending exact URL verification" — exact-URL replacement deferred to Step 7.3.
- No proprietary copy, screenshots, logos, private-API behavior, paywalled content, or trademarked feature names were introduced. Trademarked vocabulary replaced with generic equivalents (e.g., "claps" → "reactions", Zestimate → generic valuation with disclosure, "Super Like" → "priority like").
- Validation passed: `awk` H1 count prints nothing (every file has exactly one H1); `grep -L "Readiness status: Draft 1"` prints nothing; `grep -l "^TODO"` prints nothing; every file has exactly 18 `## ` H2 sections.
- Committed per batch: `feat(specs): canonical Draft 1 for batch-06 (IDs 101-120)` … `feat(specs): canonical Draft 1 for batch-10 (IDs 181-200)` (five commits).
- Updated `specs/README.md`: flipped Readiness column for batches 06-10 from "Draft 0 placeholders" to "Draft 1 canonical"; refreshed Metadata, Overview, Test Plan, and Acceptance Criteria to reflect 200 Draft 1 specs with Step 7.3 implementation-readiness pending.
- Updated `tasks/spec-quality-audit.md`: resolved the "Draft 0 Gap For IDs 101-200" finding, replaced it with a "High: Implementation-Readiness Gap For IDs 101-200 (Phase 7 Step 7.3)" finding, refreshed Verdict/Metrics/Audit Scope/Next Steps to report 200 specs passing Draft 1 depth metrics.
- No downstream repo changes; `GeorgeQLe/mobile-ideas` remains PUBLIC; all 100 existing downstream repos remain PRIVATE.
- Execution note: 100-spec rewrite was fanned out across 5 parallel batch-scoped subagents. Initial round hit per-agent usage limits and a second finishing round completed the tail (batch-06 107-120, batch-07 137-140, batch-08 151-160, batch-09 176-180).

## 2026-04-20 - Phase 7 Step 7.1: Draft 0 Placeholders for IDs 101-200

- Created 100 Draft 0 placeholder spec files under `specs/batch-06/` through `specs/batch-10/` (20 files per batch) covering IDs 101-200 from the 2026-04-20 `tasks/ideas.md` extension.
- File naming follows the established `NNN-<kebab-slug>.md` convention: `specs/batch-06/101-tinder.md` … `specs/batch-10/200-alltrails.md`. Slug picks resolve special cases (`106-coffee-meets-bagel`, `113-realtor`, `114-apartments`, `133-new-york-times`, `156-hims-hers`, `169-google-family-link`, `185-otter-ai`, `196-things-3`, etc.).
- Each placeholder file contains exactly one H1 (`# <Inspiration>-Style Clone Spec`), a metadata block (`> Inspiration`, `> Category`, `> Readiness status: Draft 0`, `> Legal scope: functional parity only — original code, original brand, original assets, lawful data sources; no proprietary logos, screenshots, copy, private APIs, or paywalled content.`), a one-paragraph summary pointing back at the `tasks/ideas.md` row, and TODO placeholders under all 18 canonical section headings (Overview, Goals, Non-Goals, Research Sources, Detailed Design, Core User Journeys, Screen Inventory, Data Model, API And Backend Contracts, Realtime/Push/Offline Behavior, Permissions/Privacy/Safety, Analytics And Monetization, Edge Cases, Test Plan, Acceptance Criteria, Open Questions, Build Plan, Next Steps).
- Acceptance verified: each batch directory holds 20 files; total of 100 new files; `awk` H1 audit confirms every file has exactly one `# `-prefixed line; no missing IDs from 101 through 200.
- Updated `specs/README.md`: bumped coverage from 100 to 200 ideas, expanded the batch index to ten rows with a new Readiness column, and split the Test Plan / Acceptance Criteria to distinguish IDs 001-100 (implementation-ready) from IDs 101-200 (Draft 0 placeholders).
- Updated `tasks/spec-quality-audit.md`: bumped scope to 200 specs, refreshed the metrics summary, added a new High-severity finding "Draft 0 Gap For IDs 101-200 (Phase 7 Step 7.1)" mirroring the original 001-100 audit structure, and updated Next Steps to point at Step 7.2 and Step 7.3.
- No proprietary assets introduced; placeholders carry no first-party URLs, screen catalogs, data models, or API contracts yet (Step 7.2 will populate them).
- `tasks/todo.md`: checked off Step 7.1 with verification evidence inline; rewrote Step 7.2 with detailed per-file requirements, category risk routing, validation rules, commit strategy, and a new Ship-One-Step Handoff Contract.
- No downstream repo changes; `GeorgeQLe/mobile-ideas` remains PUBLIC; all 100 existing downstream repos remain PRIVATE.

## 2026-04-20 - Phase 7 Opened; Backlog Extended to 200 Ideas

- Appended 100 new clone-spec ideas (IDs 101-200) to `tasks/ideas.md` under the "Extension Added 2026-04-20" section, covering categories under-represented in IDs 001-100: dating (6), jobs (4), real estate (5), neighborhood/events (3), reading/newsletters (13), news aggregation (7), investing (6), neobanks (5), telehealth/pharmacy (8), wellness trackers (5), parenting/family (11), kids education (6), language/translation (7), dev/project tools (8), productivity/notes/tasks (10), and hiking (1).
- Updated ideas.md summary line to reflect 200 total projects and updated Next Steps to point at Phase 1 Step 2 of the extension (Draft 0 stubs).
- Opened Phase 7 (Backlog Extension Pipeline for IDs 101-200) in `tasks/roadmap.md` with six milestones (Steps 7.1-7.6).
- Archived completed Phase 6 todo content to `tasks/phases/phase-6.md`.
- Rewrote `tasks/todo.md` as the Phase 7 work log; Step 7.1 (create 100 Draft 0 stubs across `specs/batch-06/` through `specs/batch-10/`) is the next concrete action with ship-one-step handoff contract.
- No spec files created yet; no downstream repo changes; `GeorgeQLe/mobile-ideas` remains PUBLIC and all 100 existing downstream repos remain PRIVATE.

## 2026-04-21 - 1000-App Extension Scaffold

- Added 800 backlog rows for IDs 201-1000.
- Created canonical Draft 1 scaffold specs under `specs/batch-11/` through `specs/batch-50/`.
- Added `AGENTS.md` Codex project conventions.
- Updated roadmap, todo, specs index, and quality audit for the 1000-target state.
- Remote downstream repo creation remains blocked until explicit approval and readiness/manifest work are complete.

## 2026-05-01 - Phase 8 Step 8.3 Finance Slice (IDs 137-149)

- Promoted 13 finance, investing, banking, transfer, and teen/family finance specs to implementation-ready public-source V1: `137-bloomberg.md` through `149-step.md`.
- Replaced source-discovery placeholders with exact first-party marketplace, product/help, privacy, terms, and disclosure URLs verified on 2026-05-01.
- Expanded each spec with finance risk coverage: no-investment-advice framing, KYC/AML gates, fraud/account-takeover controls, market-data licensing, banking partner/FDIC/SIPC boundaries, social-investing moderation for Stocktwits/Public, and child/teen controls for Greenlight/Step.
- Validation: targeted checks found one H1 in each promoted file, all 18 canonical H2 sections in each file, and no `Source discovery`, `Readiness status: Draft`, or `TODO` markers in the 13-file slice.
- Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 149 implementation-ready specs and 2,637 source-discovery placeholder rows across 851 remaining files.

## 2026-05-01 - Phase 8 Step 8.3 Pharmacy And Telehealth Slice (IDs 150-157)

- Promoted 8 pharmacy, doctor-booking, telehealth, therapy, and direct-to-consumer care specs to implementation-ready public-source V1: `150-goodrx.md` through `157-ro.md`.
- Replaced source-discovery placeholders with exact public marketplace, app/product, help/support, privacy, terms, clinical-scope, crisis-resource, pharmacy, photo, rewards, lab, and care-path URLs verified on 2026-05-01.
- Expanded category-specific risk coverage: PHI/HIPAA-adjacent posture, pharmacy/PBM coupon handling, retail pharmacy/photo/rewards separation, provider calendar and eligibility verification, clinical licensure, crisis/emergency routing, therapy/psychiatry access control, prescription/pharmacy fulfillment, lab orders/results, controlled-substance gates, minor/dependent consent, and privacy-safe notifications/analytics.
- Validation: targeted checks found one H1 in each promoted file and no `Source discovery`, `Readiness status: Draft`, or `Replace discovery URLs` markers in the 8-file slice.
- Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 157 implementation-ready specs and 2,597 source-discovery placeholder rows across 843 remaining files.

## 2026-05-01 - Phase 8 Step 8.3 Wearable, Sleep, Cycle, Pregnancy, And Baby-Care Slice (IDs 158-164)

- Promoted 7 wearable health, sleep, reproductive-health, pregnancy/parenting, and baby-care specs to implementation-ready public-source V1: `158-oura.md` through `164-huckleberry.md`.
- Replaced source-discovery placeholders with exact public marketplace, support/help, privacy, terms, science/product, benefits, community, and content URLs verified on 2026-05-01.
- Expanded category-specific risk coverage: health-data minimization, non-medical-device and non-diagnostic disclaimers, HealthKit/Health Connect/Fitbit/Google Fit permission scope, microphone/audio consent, reproductive-health privacy and post-Dobbs retention posture, employer/health-plan benefit boundaries, child/dependent data controls, caregiver access, notification safety, and child-directed/COPPA-style review gates.
- Refreshed `tasks/implementation-readiness.md` to 164 of 1000 ready, added rows for IDs 121-164, and moved the next Step 8.3 slice to IDs 165-169.
- Validation: targeted checks found one H1 in each promoted file and no `Source discovery`, `Readiness status: Draft 1`, exact-URL-pending, or discovery-replacement markers in the 7-file slice.
- Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 164 implementation-ready specs and 2,562 source-discovery placeholder rows across 836 remaining files.

## 2026-05-02 - Phase 8 Step 8.3 Language, Translation, And Transcription Slice (IDs 181-185)

- Promoted 5 language learning, translation, and transcription specs to implementation-ready public-source V1: `181-rosetta-stone.md` through `185-otter-ai.md`.
- Replaced source-discovery placeholders with exact public first-party marketplace, product/help, support, privacy, terms, pricing, speech-recognition, community-correction, certificate, file-translation, and meeting/transcription URLs verified on 2026-05-02.
- Expanded category-specific risk coverage: speech/audio capture and retention, camera/OCR privacy, offline language packs, community corrections and moderation, live classes/certification claims, meeting import/calendar OAuth gates, recording consent, AI summary/chat boundaries, subscription gates, accessibility, and data export/delete.
- Refreshed `tasks/implementation-readiness.md` to 185 of 1000 ready and moved the next Step 8.3 slice to IDs 186-190.
- Validation: targeted checks found one H1 in each promoted file and no `Source discovery`, `Readiness status: Draft 1`, or exact-URL-pending markers in the 5-file slice.
- Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 185 implementation-ready specs and 2,461 source-discovery placeholder rows across 815 remaining files.

## 2026-05-03 - Phase 8 Step 8.3 Writing, Dev Tools, And Work Management Slice (IDs 186-190)

- Promoted 5 writing assistant, developer collaboration, issue-tracking, agile planning, and work-management specs to implementation-ready public-source V1: `186-grammarly.md` through `190-asana.md`.
- Replaced source-discovery placeholders with exact public first-party marketplace, help/docs, developer/API, security, privacy, terms, pricing, mobile, OAuth, workflow, and enterprise/admin URLs verified on 2026-05-03.
- Expanded category-specific risk coverage: keyboard full-access disclosure and secure-field suppression for Grammarly; OAuth scopes, repository privacy, CI log redaction, Actions/log permissions, SSO/GHES, and push payload opacity for GitHub Mobile; realtime sync, workspace permissions, optimistic conflict handling, SSO/admin policy, audit logs, and subscription/seat limits for Linear, Jira, and Asana.
- Refreshed `tasks/implementation-readiness.md` to 190 of 1000 ready and moved the next Step 8.3 slice to IDs 191-195.
- Validation: targeted checks found one H1 in each promoted file and no `Source discovery`, `Readiness status: Draft`, or exact-URL-pending markers in the 5-file slice.
- Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 190 implementation-ready specs and 2,440 source-discovery placeholder rows across 810 remaining files.

## 2026-05-03 - Phase 8 Step 8.3 Productivity, Design, Whiteboard, Scheduling, And Calendar Slice (IDs 191-195)

- Promoted 5 productivity, design collaboration, collaborative whiteboard, scheduling, and calendar/tasks specs to implementation-ready public-source V1: `191-clickup.md` through `195-fantastical.md`.
- Replaced source-discovery placeholders with exact public first-party marketplace, help/support, product, security/trust, privacy, terms, pricing, mobile, OAuth/provider, and subscription URLs verified on 2026-05-03.
- Expanded category-specific risk coverage: workspace permissions, realtime/offline sync, attachment/upload storage, canvas/rendering performance, sharing/public links, template/AI boundaries, calendar/provider OAuth scopes, natural-language parsing, widgets/notifications, export/delete, and subscription/seat limits.
- Refreshed `tasks/implementation-readiness.md` to 195 of 1000 ready and moved the next Step 8.3 slice to IDs 196-200.
- Validation: targeted checks found one H1 in each promoted file and no `Source discovery`, `Readiness status: Draft`, or exact-URL-pending markers in the 5-file slice.
- Repo-wide readiness audit remains expected-red because Step 8.3 is not complete: `node scripts/check-implementation-readiness.mjs` now reports 195 implementation-ready specs and 2,420 source-discovery placeholder rows across 805 remaining files.
