# History

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

## Next Steps

- Begin Phase 6 Step 6.6: reconcile `GeorgeQLe/todoist-mobile-clone` with the shared downstream seed templates.
- Keep all downstream repos and this spec store private until the applicable legal/name/license/content review and explicit public-release approval are complete.
