# Mobile Ideas Roadmap

## Summary

This roadmap tracks the path from an initial clone-idea backlog to verified, implementation-ready mobile app specifications, then into one-by-one downstream implementation planning.

## Phase Overview

| Phase | Status | Outcome |
|---|---|---|
| Phase 1 | Complete | Initial 100-idea backlog and Draft 0 specs created. |
| Phase 2 | Complete | Hygiene and Draft 1 spec remediation. |
| Phase 3 | Complete | App-by-app implementation-readiness upgrades. |
| Phase 4 | Complete | Per-app implementation planning in downstream repos. |
| Phase 5 | Complete | High-level downstream implementation plan queue for all 100 specs. |
| Phase 6 | Complete | Seeded 100 private downstream repos; spec store published public 2026-04-20. |
| Phase 7 | Complete | Backlog extension pipeline for IDs 101-200 (Draft 0 -> readiness -> seeding). |
| Phase 8 | Complete | 1000-app backlog, implementation-ready specs, plan queue, and private downstream repos. |
| Phase 9 | Complete | Detailed build plans for all 1000 apps in downstream repos. |
| Phase 10 | Done | Benchmarking infrastructure, CI/CD templates, and multi-variant repo structure. |
| Phase 11 | Complete with carry-forward blockers | Implementation: AI & Assistants cluster advanced with 54 Flutter/Android Native toolchain blockers explicitly deferred by user approval on 2026-05-14. |
| Phase 12 | Active | Implementation: Social, Dating & Community cluster (39 apps × 5 variants). |
| Phase 13 | Pending | Implementation: Messaging & Email cluster (~37 apps × 5 variants). |
| Phase 14 | Pending | Implementation: Video & Music Streaming cluster (~53 apps × 5 variants). |
| Phase 15 | Pending | Implementation: Podcasts, Books & Reading cluster (~42 apps × 5 variants). |
| Phase 16 | Pending | Implementation: Photo & Video Creation cluster (~47 apps × 5 variants). |
| Phase 17 | Pending | Implementation: Shopping, Commerce & Classifieds cluster (~65 apps × 5 variants). |
| Phase 18 | Pending | Implementation: Food, Delivery & Grocery cluster (~77 apps × 5 variants). |
| Phase 19 | Pending | Implementation: Finance & Payments cluster (~65 apps × 5 variants). |
| Phase 20 | Pending | Implementation: Travel & Transportation cluster (~79 apps × 5 variants). |
| Phase 21 | Pending | Implementation: Health, Fitness & Wellness cluster (~81 apps × 5 variants). |
| Phase 22 | Pending | Implementation: Education & Learning cluster (~31 apps × 5 variants). |
| Phase 23 | Pending | Implementation: Productivity & Collaboration cluster (~72 apps × 5 variants). |
| Phase 24 | Pending | Implementation: News, Maps & Navigation cluster (~57 apps × 5 variants). |
| Phase 25 | Pending | Implementation: Home, Security, Cloud & Enterprise cluster (~137 apps × 5 variants). |
| Phase 26 | Pending | Cross-version benchmarking, winner selection, and regression audit for all 1000 apps. |
| Phase 27 | Pending | App Store & Play Store submission for all 1000 winning variants. |

## Phase 1: Initial Backlog And Draft 0 Specs

### Milestones

- [x] Create `tasks/ideas.md` with 100 mobile app clone ideas.
- [x] Create Draft 0 specs for all 100 ideas.
- [x] Publish the repository to GitHub.
- [x] Add a quality audit showing Draft 0 gaps.

### Acceptance Criteria

- 100 ideas exist.
- 100 numbered specs exist.
- Draft 0 quality limitations are documented.

## Phase 2: Hygiene And Draft 1 Remediation

### Milestones

- [x] Add missing lifecycle docs.
- [x] Normalize task documents with next steps.
- [x] Rewrite all numbered specs into canonical Draft 1 structure.
- [x] Run final hygiene and quality validation.
- [x] Commit and push remediation work.

### Acceptance Criteria

- `CLAUDE.md`, `tasks/roadmap.md`, `tasks/history.md`, `tasks/todo.md`, and `tasks/ideas.md` are present.
- Every numbered spec has canonical spec sections.
- Every numbered spec includes research sources, open questions, and next steps.
- Structural validation confirms no missing spec IDs from `001` through `100`.

## Phase 3: App-By-App Implementation Readiness

### Milestones

- [x] Define the implementation-readiness gate.
- [x] Upgrade `001-chatgpt.md` as the pilot implementation-ready public-source V1 spec.
- [x] Upgrade the remaining architecture-teaching top-ten specs.
- [x] Upgrade remaining specs by batch until all 100 pass the readiness gate.
- [x] Complete hands-on verification for each app where lawful and feasible, or mark blocked flows with explicit reason and owner/path.

### Acceptance Criteria

- Every spec has exact source links or a documented blocker.
- Every spec distinguishes verified behavior from inferred clone requirements.
- High-risk categories have category-specific risk review notes.
- Every spec has app-specific screens, data model, API contracts, tests, and build plan.

## Phase 4: Downstream Implementation Planning

### Milestones

- [x] Choose the first implementation candidate.
- [x] Produce a build plan with route map, API schema, data model, seed data, and test checklist.
- [x] Create or link the downstream implementation repository.

### Acceptance Criteria

- Implementation begins only from a verified spec.
- Original branding, original assets, licensed data, and lawful integrations are confirmed.
- Downstream implementation repository exists at `https://github.com/GeorgeQLe/todoist-mobile-clone` and is seeded with the source spec plus build plan.

## Phase 5: 100-App Downstream Implementation Plan Queue

### Goal

Populate the roadmap with one high-level implementation plan for each implementation-ready public-source V1 spec so the team can pick an app, expand that row into focused phases, and build in a downstream repository without losing the source-spec contract.

### Scope

- Treat each numbered spec as the source of truth for lawful functional parity, required routes, data models, API contracts, permissions, privacy, safety, monetization, tests, and manual verification blockers.
- Keep this planning repository code-free; downstream app code belongs in app-specific repositories or worktrees.
- Use each row below as the app-level plan. When an app is selected, create app-specific implementation phases from the referenced spec's `Build Plan`, not from memory.
- Preserve legal constraints: original brand, original copy, original assets, synthetic or licensed data, public APIs or approved providers, and no private API replay.
- Keep category-risk gates explicit before launch: AI safety, social moderation, messaging privacy, location safety, marketplace trust, delivery operations, regulated finance, licensed media, minors, health data, education integrity, creator licensing, cloud sharing, and smart-home security.

### Acceptance Criteria

Completion for this phase means the queue is populated. App implementation completion is tracked later in downstream app-specific phases.

- [x] All 100 implementation-ready specs have one high-level downstream implementation plan in this roadmap.
- [x] Every plan references its source spec path.
- [x] Every plan is high-level enough to defer detailed phase work until the app is selected.
- [x] Manual verification and regulated/provider/hardware blockers remain launch gates, not assumed completed work.
- [x] First focused app after Todoist can be selected directly from this queue and decomposed into app-specific phases.

**Parallelization:** agent-team
**Coordination Notes:** Each app should be expanded and implemented in its own downstream repository or isolated worktree. Shared planning artifacts in this repository are read-only contracts during implementation; any source-spec changes must be reconciled back here before a downstream parity claim.

### Implementation Plans

| ID | App | Source Spec | High-Level Implementation Plan |
|---:|---|---|---|
| 001 | ChatGPT | `specs/batch-01/001-chatgpt.md` | Build an original AI assistant with auth, chat history, streaming threads, multimodal uploads, voice, memory/data controls, entitlement gates, safety reporting, and offline/reconnect handling. |
| 002 | Claude | `specs/batch-01/002-claude.md` | Build an original AI workspace with conversational threads, file/context ingestion, project-style organization, artifact-style outputs, privacy controls, usage limits, subscriptions, and safety review gates. |
| 003 | Perplexity | `specs/batch-01/003-perplexity.md` | Build an AI answer/search app with query threads, cited source cards, follow-up exploration, collections, freshness controls, provider-backed retrieval, subscription gates, and citation-quality tests. |
| 004 | Character.AI | `specs/batch-01/004-character-ai.md` | Build an AI character chat platform with onboarding, character catalog, persona profiles, conversation rooms, creator tools, moderation, teen-safety controls, subscriptions, and abuse reporting. |
| 005 | Replika | `specs/batch-01/005-replika.md` | Build an AI companion app with relationship onboarding, memory/profile state, mood and journal loops, voice/chat surfaces, avatar-adjacent feature gates, wellbeing safeguards, and subscription controls. |
| 006 | TikTok | `specs/batch-01/006-tiktok.md` | Build a short-video social app with feed ranking, video capture/upload, profiles, comments, DMs, creator tools, LIVE/shop/coin stubs, recommendations, moderation, and teen privacy gates. |
| 007 | Instagram | `specs/batch-01/007-instagram.md` | Build a media social app with profile grid, feed, stories/reels-style surfaces, capture/upload, comments, DMs, discovery, creator/business tools, privacy settings, and moderation workflows. |
| 008 | Snapchat | `specs/batch-01/008-snapchat.md` | Build a camera-first messaging app with ephemeral snaps, chats, stories, lenses/effects stubs, map/location gates, memories, notifications, teen safety, privacy controls, and screenshot/retention rules. |
| 009 | BeReal | `specs/batch-01/009-bereal.md` | Build a timed social posting app with daily prompt windows, dual-camera capture, friend feed, reactions/comments, late-post state, privacy settings, notification timing, and authenticity edge cases. |
| 010 | Reddit | `specs/batch-01/010-reddit.md` | Build a community forum app with subreddit-style communities, posts, comments, voting, moderation queues, search, messaging, awards/entitlements stubs, safety reporting, and feed ranking tests. |
| 011 | X | `specs/batch-01/011-x.md` | Build a microblogging app with timelines, posts/replies/reposts, profiles, search/trends, DMs, media uploads, moderation, subscriptions/verification stubs, creator monetization gates, and abuse controls. |
| 012 | Bluesky | `specs/batch-01/012-bluesky.md` | Build a decentralized-social-inspired app with feeds, posts, replies, starter packs/lists, moderation labels, account portability stubs, custom feed controls, DMs where scoped, and safety tooling. |
| 013 | Threads | `specs/batch-01/013-threads.md` | Build a text social app with posts, replies, reposts, following/for-you feeds, media attachments, fediverse-adjacent controls, profile privacy, reporting, and account-linking boundaries. |
| 014 | Pinterest | `specs/batch-01/014-pinterest.md` | Build a visual discovery app with pins, boards, search, recommendations, save/share flows, shopping/creator stubs, image rights controls, moderation, and privacy-safe analytics. |
| 015 | Lemon8 | `specs/batch-01/015-lemon8.md` | Build a lifestyle social app with templated posts, topic feeds, photo/video publishing, creator profiles, search, recommendations, comments, commerce stubs, moderation, and youth-safety gates. |
| 016 | WhatsApp | `specs/batch-01/016-whatsapp.md` | Build an encrypted messaging app with phone auth, chats/groups, calls, media, contacts, linked-device/backups stubs, business/payments gates, privacy settings, and end-to-end encryption semantics. |
| 017 | Telegram | `specs/batch-01/017-telegram.md` | Build a cloud messaging app with chats, secret-chat constraints, groups/channels, media, bots, calls, stories/premium stubs, moderation, privacy settings, and multi-device sync. |
| 018 | Signal | `specs/batch-01/018-signal.md` | Build a privacy-first messenger with registration/PIN flows, encrypted chats/groups/calls, disappearing messages, backup/transfer blockers, donations stubs, minimal analytics, and safety verification. |
| 019 | Discord | `specs/batch-01/019-discord.md` | Build a community chat app with servers, channels, roles, permissions, voice/video, DMs, bots/apps stubs, Nitro-style entitlements, moderation logs, teen safety, and notification controls. |
| 020 | Slack | `specs/batch-01/020-slack.md` | Build a workplace collaboration app with workspaces, channels, DMs, huddles stubs, canvases/lists, search, apps/workflows, retention/export gates, enterprise admin controls, and privacy review. |
| 021 | Messenger | `specs/batch-02/021-messenger.md` | Build a social messaging app with encrypted personal chats, groups, calls, stories/notes, secure storage, assistant/business stubs, purchases gates, contacts, and privacy controls. |
| 022 | FaceTime | `specs/batch-02/022-facetime.md` | Build a calling app with contacts/account calling, group calls, call links, guest join states, screen share/co-presence stubs, captions, handoff blockers, and permission handling. |
| 023 | Zoom | `specs/batch-02/023-zoom.md` | Build a video meetings app with scheduling, join flow, waiting room, host controls, chat, screen share, recording/AI-summary stubs, enterprise policy, and meeting-security tests. |
| 024 | Gmail | `specs/batch-02/024-gmail.md` | Build an email client with inbox categories, threads, labels, search, compose/attachments, spam/phishing gates, smart-feature stubs, account export/delete, and Workspace policy controls. |
| 025 | Outlook | `specs/batch-02/025-outlook.md` | Build a mail/calendar client with focused inbox, multi-provider accounts, calendar/RSVP, files, suggested-reply/Copilot stubs, enterprise policy, and offline mailbox sync. |
| 026 | Google Maps | `specs/batch-02/026-google-maps.md` | Build a maps/navigation app with search, place cards, routes, live navigation, traffic/transit stubs, offline maps, location sharing, contribution controls, and location-safety review. |
| 027 | Apple Maps | `specs/batch-02/027-apple-maps.md` | Build a privacy-oriented maps app with search, place cards, guides, routes, offline maps, imagery stubs, platform companion gates, and minimal-location analytics. |
| 028 | Waze | `specs/batch-02/028-waze.md` | Build a driver navigation app with routes, crowdsourced reports, hazards/closures, toll/fuel/parking stubs, map-editing gates, ads controls, and in-car safety blockers. |
| 029 | Uber | `specs/batch-02/029-uber.md` | Build a rideshare app with rider auth, quote/route selection, dispatch simulation, live trip tracking, cancellation/fare review, safety toolkit, membership stubs, and provider-backed operations gates. |
| 030 | Lyft | `specs/batch-02/030-lyft.md` | Build a rideshare app with quote flow, scheduled rides, pickup/dropoff, dispatch simulation, no-show/cancellation handling, safety preferences, support, and assisted-mobility/provider blockers. |
| 031 | Lime | `specs/batch-02/031-lime.md` | Build a micromobility app with map discovery, unlock simulation, ride session, zones, parking evidence, billing stubs, fleet operations, city-rule gates, and hardware blockers. |
| 032 | Turo | `specs/batch-02/032-turo.md` | Build a car-sharing marketplace with search, vehicle detail, booking/protection, host/guest messaging, pickup-return evidence, claims, roadside support, and insurance/regional blockers. |
| 033 | Airbnb | `specs/batch-02/033-airbnb.md` | Build a lodging marketplace with search, listing detail, booking checkout, fees/taxes, messaging, reviews, wishlists, host tools, payouts/disputes stubs, and trust/safety gates. |
| 034 | Booking.com | `specs/batch-02/034-booking-com.md` | Build a travel lodging app with search, map/list comparison, room/rate selection, loyalty stubs, reservation management, property messaging, cancellation/refund states, and supplier handoffs. |
| 035 | Expedia | `specs/batch-02/035-expedia.md` | Build a travel booking app with flights/stays/cars/activities/packages, itinerary wallet, rewards stubs, cancellation/change/refund workflows, supplier handoffs, and support escalation. |
| 036 | Hopper | `specs/batch-02/036-hopper.md` | Build a travel deals app with price watches, prediction calendar, deal alerts, price-freeze/flexibility stubs, disruption assistance, payments gates, and provider freshness tests. |
| 037 | TripIt | `specs/batch-02/037-tripit.md` | Build an itinerary organizer with email/import parsing, trip timeline, documents, calendar sync, sharing, Pro-alert stubs, subscription gates, and travel-risk notification handling. |
| 038 | DoorDash | `specs/batch-02/038-doordash.md` | Build a delivery marketplace with restaurant/store discovery, menus/modifiers, cart, checkout fees, order tracking, courier handoff simulation, membership/EBT/alcohol gates, and refund support. |
| 039 | Uber Eats | `specs/batch-02/039-uber-eats.md` | Build a local-commerce delivery app with catalog search, menus/modifiers, checkout quote, courier tracking, membership/alcohol gates, merchant tools, refunds, and provider simulation. |
| 040 | Instacart | `specs/batch-02/040-instacart.md` | Build a grocery delivery app with retailer catalog, cart/replacements, delivery windows, shopper handoff simulation, membership/EBT/alcohol gates, refund support, and inventory freshness tests. |
| 041 | Starbucks | `specs/batch-03/041-starbucks.md` | Build a coffee ordering and loyalty app with store search, menu customization, cart, pickup ordering, stored-value/rewards stubs, eGifts, refunds, and franchise/provider blockers. |
| 042 | McDonald's | `specs/batch-03/042-mcdonalds.md` | Build a quick-service app with restaurant selection, menu/deals, rewards, mobile order/pay, pickup modes, delivery handoff stubs, refunds, and location/franchise variation tests. |
| 043 | OpenTable | `specs/batch-03/043-opentable.md` | Build a reservation marketplace with restaurant discovery, availability search, booking/waitlist/notify flows, reviews, points stubs, restaurant tools, and no-show/cancellation policies. |
| 044 | Yelp | `specs/batch-03/044-yelp.md` | Build a local discovery app with search, business pages, reviews/photos, messaging/quotes, transactions stubs, owner tools, moderation, privacy controls, and review-integrity workflows. |
| 045 | Too Good To Go | `specs/batch-03/045-too-good-to-go.md` | Build a surplus-food marketplace with discovery map/list, surprise bag purchase, pickup window, cancellation/refund states, impact metrics, partner tools, and food-safety gates. |
| 046 | Amazon | `specs/batch-03/046-amazon.md` | Build a shopping marketplace with search, product detail, seller offers, cart/checkout, order tracking, returns/refunds, reviews, membership/ad stubs, seller tools, and counterfeit/IP controls. |
| 047 | Temu | `specs/batch-03/047-temu.md` | Build a discount shopping app with catalog discovery, product detail, coupons/credits, cart/checkout, shipping/tracking, returns/refunds, support, IP/counterfeit reports, and deal-safety gates. |
| 048 | SHEIN | `specs/batch-03/048-shein.md` | Build a fashion commerce app with discovery feed, size/fit guidance, reviews/media, bag/checkout, coupons/points, shipping/returns, creator/social stubs, and content/licensing safety. |
| 049 | Etsy | `specs/batch-03/049-etsy.md` | Build a handmade marketplace with shop pages, custom listings, multi-shop cart, messages, seller listings, ads/payments stubs, cases, purchase protection, and IP/trust workflows. |
| 050 | eBay | `specs/batch-03/050-ebay.md` | Build a marketplace with search, auctions/offers, watchlist, checkout, authenticity stubs, seller listing tools, returns/refunds, buyer protection, promoted listings, and dispute support. |
| 051 | Facebook Marketplace | `specs/batch-03/051-facebook-marketplace.md` | Build a local marketplace with location/radius discovery, listing creation, messaging, pickup/shipping gates, checkout eligibility, commerce policy enforcement, purchase protection, and scam controls. |
| 052 | Poshmark | `specs/batch-03/052-poshmark.md` | Build a social resale app with closets, likes/shares, offers, bundles, prepaid shipping stubs, seller earnings, claims, community safety, and payout/provider gates. |
| 053 | Depop | `specs/batch-03/053-depop.md` | Build a resale fashion app with feed, shop profiles, listings, likes/follows, messages, offers, payments/shipping labels stubs, protections, payouts, and moderation. |
| 054 | StockX | `specs/batch-03/054-stockx.md` | Build a bid/ask marketplace with product market data, buy/sell flows, verification stubs, seller levels, fees/payouts, two-step security, buyer support, and authenticity blockers. |
| 055 | Shop | `specs/batch-03/055-shop.md` | Build a shopping utility with package tracking, email/order import, merchant discovery, wallet/rewards stubs, tracking sync, merchant channel gates, and privacy-safe inbox parsing. |
| 056 | Cash App | `specs/batch-03/056-cash-app.md` | Build a finance app prototype with auth, public handle, P2P payment simulation, requests/links, balance, card/direct-deposit/bitcoin/investing/tax stubs, scam controls, and compliance gates. |
| 057 | Venmo | `specs/batch-03/057-venmo.md` | Build a social payments prototype with send/request simulation, payment notes/feed, QR profiles, balance/instruments stubs, teen/business/crypto gates, privacy controls, and scam safety. |
| 058 | PayPal | `specs/batch-03/058-paypal.md` | Build a digital wallet prototype with send/request, checkout funding, balance, rewards/savings/pay-later/crypto stubs, package tracking, disputes, buyer/seller protection, and compliance gates. |
| 059 | Zelle | `specs/batch-03/059-zelle.md` | Build a bank-linked transfer prototype with enrollment aliases, recipient verification, send/request simulation, limits, delayed/blocked states, scam education, privacy, and bank-provider handoffs. |
| 060 | Robinhood | `specs/batch-03/060-robinhood.md` | Build an investing prototype with onboarding, portfolio, watchlists, quote/detail pages, order-ticket simulation, cash/crypto/retirement stubs, disclosures, support, and brokerage compliance gates. |
| 061 | Coinbase | `specs/batch-04/061-coinbase.md` | Build a crypto app prototype with onboarding, portfolio, asset detail, buy/sell/convert simulation, fiat funding, send/receive stubs, staking/tax/support, security, and jurisdiction gates. |
| 062 | Mint/Credit Karma | `specs/batch-04/062-mint-credit-karma.md` | Build a personal-finance app with credit profile, linked-account simulation, net worth, transactions, recommendations, identity monitoring stubs, support, privacy, and financial-data provider gates. |
| 063 | YNAB | `specs/batch-04/063-ynab.md` | Build a budgeting app with accounts, categories, zero-based budget assignments, targets, transactions, reconciliation, reports, sharing/API/export stubs, subscription gates, and import blockers. |
| 064 | Rocket Money | `specs/batch-04/064-rocket-money.md` | Build a finance assistant with account linking simulation, subscription detection, cancellation assistance workflow, bill negotiation stubs, budgets, savings, premium gates, and privacy controls. |
| 065 | Apple Wallet | `specs/batch-04/065-apple-wallet.md` | Build a wallet app prototype with cards/passes/tickets/orders, presentation mode, notifications, keys/ID/transit stubs, privacy controls, support, and platform entitlement blockers. |
| 066 | Spotify | `specs/batch-04/066-spotify.md` | Build a media app with catalog browsing, playback queue, playlists, downloads/offline stubs, lyrics, device handoff, shared listening, creator/ad/family gates, and licensed-content blockers. |
| 067 | Apple Music | `specs/batch-04/067-apple-music.md` | Build a music app with library, browse/search, player/queue, lyrics, downloads/offline stubs, shared listening, family/student subscriptions, device handoff, and licensed-media gates. |
| 068 | YouTube Music | `specs/batch-04/068-youtube-music.md` | Build a music/podcast app with discovery, samples/previews, audio-video switching stubs, uploads, playlists, downloads, supervised-account gates, ads, privacy, and licensing blockers. |
| 069 | SoundCloud | `specs/batch-04/069-soundcloud.md` | Build an audio creator platform with uploads, waveform playback/comments, profiles, likes/reposts, playlists, insights/monetization stubs, ads, copyright workflows, and privacy controls. |
| 070 | Audible | `specs/batch-04/070-audible.md` | Build an audiobook app with discovery, library, playback, chapters, bookmarks, sleep timer, credits/catalog stubs, returns, kids profile, privacy, and licensed-audio blockers. |
| 071 | Pocket Casts | `specs/batch-04/071-pocket-casts.md` | Build a podcast app with discovery, subscriptions, episode detail, Up Next, playlists/filters, playback effects, downloads, sync/OPML, Plus gates, and offline tests. |
| 072 | Netflix | `specs/batch-04/072-netflix.md` | Build a streaming video app prototype with profiles, catalog, recommendations, playback shell, downloads/offline stubs, kids/parental controls, ads/subscription gates, and licensed-video blockers. |
| 073 | YouTube | `specs/batch-04/073-youtube.md` | Build a video platform with feed, watch page, Shorts-style surface, channels/subscriptions, comments, uploads/live stubs, monetization/supervised gates, moderation, and copyright safety. |
| 074 | Twitch | `specs/batch-04/074-twitch.md` | Build a live-streaming app with channel discovery, live player, chat, clips/VODs, subscriptions/fan-funding stubs, creator dashboard, moderation, ads, and privacy controls. |
| 075 | Letterboxd | `specs/batch-04/075-letterboxd.md` | Build a film social app with diary entries, ratings/reviews, watchlist, lists, activity feed, subscriptions/rentals stubs, privacy controls, and moderation. |
| 076 | IMDb | `specs/batch-04/076-imdb.md` | Build an entertainment database app with title/person search, detail pages, watchlist/watched tracking, ratings/reviews, trailers/showtimes/availability stubs, and privacy controls. |
| 077 | Duolingo | `specs/batch-04/077-duolingo.md` | Build a gamified learning app with placement, lessons, progression path, hearts/streaks/quests/leagues, subscription/classroom stubs, minors privacy, and education-safety gates. |
| 078 | Khan Academy | `specs/batch-04/078-khan-academy.md` | Build an education app with course catalog, video/article lessons, practice/mastery, bookmarks/downloads, teacher/classroom stubs, child/parent privacy, and accessibility. |
| 079 | Quizlet | `specs/batch-04/079-quizlet.md` | Build a study app with flashcard sets, creation/import, learn/test/match-style modes, classes/folders, AI study stubs, subscriptions, privacy, and academic-integrity gates. |
| 080 | Coursera | `specs/batch-04/080-coursera.md` | Build a course marketplace app with enrollment, modules, video lessons, quizzes/assignments, deadlines, certificates/subscriptions stubs, enterprise gates, and learner privacy. |
| 081 | Photomath | `specs/batch-05/081-photomath.md` | Build a math help app with camera capture, OCR/problem parsing, solution steps, graphing, Plus gates, academic-integrity warnings, minor/classroom privacy, and manual OCR validation. |
| 082 | Headspace | `specs/batch-05/082-headspace.md` | Build a wellness app with meditation/sleep catalog, playback, routines, coaching/therapy/AI companion stubs, employer benefit gates, consumer-health-data controls, and subscriptions. |
| 083 | Calm | `specs/batch-05/083-calm.md` | Build a wellness media app with meditation, sleep stories, soundscapes, breathwork, Premium gates, licensed-content controls, consumer-health-data privacy, and playback/offline tests. |
| 084 | Strava | `specs/batch-05/084-strava.md` | Build a fitness social app with GPS activity recording, routes, segments, clubs/challenges, leaderboards, device sync stubs, subscription gates, and location privacy controls. |
| 085 | Nike Run Club | `specs/batch-05/085-nike-run-club.md` | Build a running app with run recording, guided-run playback, training plans, challenges, shoe tagging, health/device sync stubs, data retention, and fitness privacy review. |
| 086 | MyFitnessPal | `specs/batch-05/086-myfitnesspal.md` | Build a nutrition app with food logging, macros, barcode/AI meal-scan stubs, recipes, workouts, community privacy, ads/subscriptions, and nutrition-safety warnings. |
| 087 | Fitbit | `specs/batch-05/087-fitbit.md` | Build a health tracking app with wearable sync stubs, activity, sleep, heart/stress/nutrition surfaces, Premium gates, account migration blockers, and sensitive-health-data controls. |
| 088 | Flo | `specs/batch-05/088-flo.md` | Build a reproductive-health app with cycle tracking, predictions, pregnancy/fertility surfaces, anonymous/private mode, partner sharing stubs, subscriptions, and reproductive-health privacy gates. |
| 089 | Notion | `specs/batch-05/089-notion.md` | Build a productivity workspace with pages, blocks, databases, search, sharing/permissions, comments/mentions, notifications, offline pages, import/export/AI/API stubs, and enterprise gates. |
| 090 | Todoist | `specs/batch-05/090-todoist.md` | Continue the selected downstream build with auth, task inbox, projects/sections, quick add, labels/filters, reminders, comments, calendar/board views, integrations, teams, and privacy/export gates. |
| 091 | Trello | `specs/batch-05/091-trello.md` | Build a board productivity app with inbox capture, boards/lists/cards, checklists, planner/calendar sync stubs, offline mobile capture, automation/integration gates, and workspace visibility. |
| 092 | Google Calendar | `specs/batch-05/092-google-calendar.md` | Build a calendar app with event creation, recurring rules, multiple calendars, tasks, invitations, meeting links, working-location/booking stubs, shared calendars, privacy, and API sync. |
| 093 | Evernote | `specs/batch-05/093-evernote.md` | Build a notes app with notes/notebooks/tags, tasks, home dashboard, calendar connection, scanner, clipping/OCR/search stubs, audio/transcription/AI gates, sharing, and export. |
| 094 | Dropbox | `specs/batch-05/094-dropbox.md` | Build a cloud storage app with files/folders, uploads, camera upload stubs, offline files, previews, share links, file requests, transfer, scanning, version/deletion recovery, and team gates. |
| 095 | Google Drive | `specs/batch-05/095-google-drive.md` | Build a cloud collaboration app with My Drive, folders/shared drives, search/filters, scanning, offline files, sharing permissions, activity notifications, AI/eSignature/API stubs, and Workspace gates. |
| 096 | CapCut | `specs/batch-05/096-capcut.md` | Build a video editor with timeline, trim/split/merge, speed/keyframes, chroma/stabilization/captions, text-to-speech/background-removal stubs, templates/effects/music licensing, and export. |
| 097 | Canva | `specs/batch-05/097-canva.md` | Build a design editor with templates, photo/video editing, presentations, AI stubs, brand kit, content library, team collaboration, education controls, licensing, and export workflows. |
| 098 | Lightroom | `specs/batch-05/098-lightroom.md` | Build a photo editor with library/imports, camera capture, raw-editing shell, presets, masking/retouch/quick-action/generative stubs, cloud albums, metadata, and export. |
| 099 | Google Photos | `specs/batch-05/099-google-photos.md` | Build a photo library app with backup simulation, timeline, albums, search/editing/AI stubs, memories, locked folder, sharing, device cleanup, storage gates, and privacy review. |
| 100 | Ring | `specs/batch-05/100-ring.md` | Build a smart-home security app prototype with device dashboard, setup stubs, live view simulation, two-way talk, motion alerts, history/recordings, subscriptions, shared users, privacy zones, E2EE/law-enforcement controls, and hardware blockers. |
| 101 | Tinder | `specs/batch-06/101-tinder.md` | Build an original mobile dating app inspired by Tinder's swipe discovery pattern: onboarding with photo/bio/prompts, geo-bounded card stack, accept/reject/priority-like gestures, mutual-match celebration, realtime chat, visibility boosts, rewind, passport-style location swap, and a robust safety layer covering block/report/unmatch, minors protection, and non-consensual imagery reporting. |
| 102 | Bumble | `specs/batch-06/102-bumble.md` | Build an original mobile dating app inspired by Bumble's women-first messaging pattern: onboarding with photos/prompts/badges, swipe discovery, a 24-hour match window where the woman-identified user must message first in hetero matches, video/voice chat, verified profiles, and mode-switching between dating, friends, and professional networking surfaces. |
| 103 | Hinge | `specs/batch-06/103-hinge.md` | Build an original mobile dating app inspired by Hinge's prompt-based profile pattern: onboarding with prompts, photos, and voice notes; discovery by scrolling profiles; like-with-comment on a specific prompt, photo, or voice clip; mutual-interest matches; standouts/featured queue; compatibility-based recommendation surface; and safety tooling. |
| 104 | Grindr | `specs/batch-06/104-grindr.md` | Build an original mobile dating/chat app inspired by Grindr's location-grid discovery pattern for LGBTQ+ users: a grid of nearby profiles sorted by proximity, quick chat without mutual-match gate, profile tags covering role/position/interests, HIV/STI status with reminder fields (opt-in), inclusive identity (gender, pronouns, orientation), discreet-app-icon option, and a heavy safety layer covering block/report, sensitive-location detection, and photo-discretion tools. |
| 105 | Match | `specs/batch-06/105-match.md` | Build an original mobile dating app inspired by Match's long-form-profile pattern: rich multi-field profiles (lifestyle, values, relationship goals), search with filters, daily curated matches, event-style community gatherings, private messaging, photo verification, and tiered subscription state. |
| 106 | Coffee Meets Bagel | `specs/batch-06/106-coffee-meets-bagel.md` | Build an original mobile dating app inspired by Coffee Meets Bagel's daily-curated-matches pattern: a slow-dating surface where a small curated list of candidates appears daily, in-app tokens unlock priority actions, a Discover tab shows broader profiles, and community-style conversation starters help break the ice. |
| 107 | LinkedIn | `specs/batch-06/107-linkedin.md` | Build an original mobile professional-networking app inspired by LinkedIn's core jobs: identity-anchored profiles, a connection graph, a ranked feed of updates/articles, 1:1 messaging, job discovery and application, company pages, creator posts, and search across people, companies, and jobs. |
| 108 | Indeed | `specs/batch-06/108-indeed.md` | Build an original mobile job-search app inspired by Indeed: keyword/location search across aggregated job listings, resume upload and profile creation, one-tap apply, saved searches with alerts, employer company pages with reviews and salary signals, and a candidate application tracker. |
| 109 | Glassdoor | `specs/batch-06/109-glassdoor.md` | Build an original mobile app inspired by Glassdoor: anonymous employer reviews, salary reports, interview-experience posts, job listings, and employer responses. |
| 110 | ZipRecruiter | `specs/batch-06/110-ziprecruiter.md` | Build an original mobile app inspired by ZipRecruiter: candidate-employer matching, one-tap apply, recruiter chat, saved jobs, and an application tracker. |
| 111 | Zillow | `specs/batch-06/111-zillow.md` | Build an original mobile real-estate app inspired by Zillow: map-first search for homes for sale and rent, rich listing details, automated valuation estimates derived from licensed or user-provided data, saved homes and searches, alerts, and agent contact hand-off. |
| 112 | Redfin | `specs/batch-06/112-redfin.md` | Build an original mobile real-estate app inspired by Redfin: map-first listings, rich filters (including school and commute), online tour scheduling, offer-preparation tools, saved searches with alerts, and agent hand-off. |
| 113 | Realtor.com | `specs/batch-06/113-realtor.md` | Build an original mobile real-estate app inspired by Realtor.com: MLS-sourced listings with commute filters, mortgage calculator, agent directory, and home-value tracking for current homeowners. |
| 114 | Apartments.com | `specs/batch-06/114-apartments.md` | Build an original mobile rental marketplace app inspired by Apartments.com: searchable for-rent listings with 3D tours, saved filters, contact property flows, and rental application submission. |
| 115 | Zumper | `specs/batch-06/115-zumper.md` | Build an original mobile rental marketplace app inspired by Zumper: rental listings, instant push notifications for matches, credit-checked applications, and landlord-tenant messaging. |
| 116 | Nextdoor | `specs/batch-06/116-nextdoor.md` | Build an original mobile neighborhood social-network app inspired by Nextdoor: verified-neighborhood feed with posts, classifieds, recommendations, urgent alerts, and local business pages. |
| 117 | Meetup | `specs/batch-06/117-meetup.md` | Build an original mobile app inspired by Meetup: interest-based group discovery, event RSVPs, organizer tools, attendee lists, and calendar integration. |
| 118 | Eventbrite | `specs/batch-06/118-eventbrite.md` | Build an original mobile app inspired by Eventbrite: event discovery, ticket purchase, scannable tickets, organizer dashboards, and calendar integration. |
| 119 | Medium | `specs/batch-06/119-medium.md` | Build an original mobile app inspired by Medium: long-form article feed, personalized recommendations, reactions, highlights/annotations, paywall with metered access, writer profiles, and a writer payout program. |
| 120 | Substack | `specs/batch-06/120-substack.md` | Build an original mobile app inspired by Substack: newsletter subscriptions, long-form and audio posts, paid tiers, subscriber-only comments, a short-form notes timeline, and creator-subscriber notifications. |
| 121 | Wattpad | `specs/batch-07/121-wattpad.md` | Build an original mobile serialized-fiction app inspired by Wattpad's core loop: discover stories, read chapter-by-chapter with inline paragraph reactions, follow authors, build reading lists, get notified of new chapters, and optionally compose and publish original stories from a mobile writing surface. |
| 122 | Webtoon | `specs/batch-07/122-webtoon.md` | Build an original mobile comics app inspired by Webtoon's vertical-scroll reading experience: daily-schedule discovery, episode-by-episode reading with pinch/zoom controls, coin-based unlocks and time-gated previews, creator profiles, and a creator-side episode uploader. |
| 123 | Goodreads | `specs/batch-07/123-goodreads.md` | Build an original mobile book-social app inspired by Goodreads: a searchable book database, user shelves (to-read/reading/read plus custom), ratings and reviews, friends feed, annual reading challenge, and recommendations. |
| 124 | Kindle | `specs/batch-07/124-kindle.md` | Build an original mobile e-reader inspired by Kindle's workflow: an e-book library with cross-device progress sync, a reflowable reader with typography controls, in-line dictionary and definition tools, highlights and notes, contextual character/place references, and an in-app store gate. |
| 125 | Libby | `specs/batch-07/125-libby.md` | Build an original mobile library-borrowing app inspired by Libby: connect a library card, browse the library catalog, place holds, check out e-books and audiobooks, read/listen offline, tag books with personal shelves, and return or renew. |
| 126 | Apple Books | `specs/batch-07/126-apple-books.md` | Build an original mobile e-reader-and-audiobook app inspired by Apple Books: a personal library, a purchase/sample store, audiobooks with chapter navigation, collections, reading goals, and a system-integrated reading UI (widgets, share-sheet ingest of supported files). |
| 127 | Scribd | `specs/batch-07/127-scribd.md` | Build an original mobile subscription-reading app inspired by Scribd/Everand: one subscription unlocks a catalog of books, audiobooks, documents, magazines, and podcasts; the app provides unified reading, listening, and document viewing with progress sync, offline access, and saved lists. |
| 128 | Readwise | `specs/batch-07/128-readwise.md` | Build an original mobile highlights-and-review app inspired by Readwise: centralize highlights from connected reading apps and e-readers, surface a daily digest of past highlights, and present a spaced-repetition review queue. |
| 129 | Pocket | `specs/batch-07/129-pocket.md` | Build an original mobile read-later app inspired by Pocket: save articles via share sheet, fetch clean reader content, organize with tags and favorites, sync across devices, read offline, and listen via TTS. |
| 130 | Instapaper | `specs/batch-07/130-instapaper.md` | Build an original mobile read-later app inspired by Instapaper: save URLs, present an uncluttered typographic reader, highlight passages and attach notes, organize with folders, and export. |
| 131 | Feedly | `specs/batch-07/131-feedly.md` | Build an original mobile RSS/Atom reader inspired by Feedly: subscribe to sources, organize into feeds/collections, read in a clean reader, apply smart filters/keyword alerts, save for later, and share. |
| 132 | Apple News | `specs/batch-07/132-apple-news.md` | Build an original mobile news aggregator inspired by Apple News: follow topics and publications, browse curated top stories, save articles, and optionally subscribe to a premium bundle for premium publications. |
| 133 | The New York Times | `specs/batch-07/133-new-york-times.md` | Build an original mobile premium-news app inspired by The New York Times: sectioned article feed, paywalled reading with subscription, saved articles, audio articles, and a games/puzzles entry point. |
| 134 | Flipboard | `specs/batch-07/134-flipboard.md` | Build an original mobile magazine-style news app inspired by Flipboard: topic-following, magazine-style page layout, user-curated "smart magazines" of saved items, and social flipping to shared magazines. |
| 135 | SmartNews | `specs/batch-07/135-smartnews.md` | Build an original mobile news aggregator inspired by SmartNews: a horizontally swipable channel strip (Top, Business, Sports, etc.), offline news prefetch for commutes, breaking alerts, and a balanced-source reading mode that shows coverage across outlets on the same story. |
| 136 | Ground News | `specs/batch-07/136-ground-news.md` | Build an original mobile news app inspired by Ground News: every story shows coverage across sources labeled by political bias, factuality, and ownership; a blindspot feed highlights stories that one side of the spectrum under-covers. |
| 137 | Bloomberg | `specs/batch-07/137-bloomberg.md` | Build an original mobile finance news and markets app inspired by Bloomberg's public workflow: markets dashboard, watchlists, business-news reader, quote charts, alerts, live audio, podcasts, offline magazine reading, and subscription-gated premium journalism. |
| 138 | Yahoo Finance | `specs/batch-07/138-yahoo-finance.md` | Build an original mobile finance news and markets app inspired by Yahoo Finance's public workflow: market quotes, portfolio tracking, linked holdings, watchlists, personalized finance news, alerts, charts, movers, earnings, crypto/bond coverage, and ad/subscription surfaces. |
| 139 | Stocktwits | `specs/batch-07/139-stocktwits.md` | Build an original mobile social investing community app inspired by Stocktwits's public workflow: ticker-centered social feed, watchlists, bullish/bearish sentiment, rooms, direct chat, charts, earnings calendar, market news, premium subscriptions, and community moderation. |
| 140 | Public | `specs/batch-07/140-public.md` | Build an original mobile investing and brokerage app inspired by Public's public workflow: multi-asset self-directed investing, brokerage onboarding, portfolio transfer, stocks, options, bonds, crypto, retirement, high-yield cash, AI exploration, disclosures, and account approval. |
| 141 | Acorns | `specs/batch-08/141-acorns.md` | Build an original mobile automated investing and savings app inspired by Acorns's public workflow: automated ETF portfolios, Round-Ups-style spare-change investing, recurring deposits, checking, emergency savings, retirement, kids accounts, learning content, subscriptions, and security controls. |
| 142 | Stash | `specs/batch-08/142-stash.md` | Build an original mobile investing and banking app inspired by Stash's public workflow: managed portfolios, self-directed stocks/ETFs, Auto-Stash recurring transfers, Stock-Back debit rewards, retirement, custodial accounts, money coaching, subscription tiers, and banking partner disclosures. |
| 143 | Wealthfront | `specs/batch-08/143-wealthfront.md` | Build an original mobile automated investing and cash management app inspired by Wealthfront's public workflow: automated ETF portfolios, cash account, program-bank sweep, direct indexing, tax-loss harvesting, US Treasury bond ladder, stock investing, account linking, Path-style planning, and advisory disclosures. |
| 144 | Betterment | `specs/batch-08/144-betterment.md` | Build an original mobile robo-advisor and cash management app inspired by Betterment's public workflow: goal-based automated investing, cash reserve, checking, program-bank sweep, self-directed investing, portfolio recommendations, tax-loss harvesting, advisor access, outside accounts, and retirement planning. |
| 145 | Chime | `specs/batch-08/145-chime.md` | Build an original mobile mobile banking app inspired by Chime's public workflow: checking, savings, early direct deposit, overdraft coverage, credit builder, ATM locator, cash deposits, card controls, live support, security alerts, and banking partner disclosures. |
| 146 | Revolut | `specs/batch-08/146-revolut.md` | Build an original mobile global money and trading app inspired by Revolut's public workflow: multi-currency spend/send/save, cards, vaults, P2P transfers, bill splitting, budgeting, external account linking, kids accounts, savings, stock trading, subscriptions, and fraud controls. |
| 147 | Wise | `specs/batch-08/147-wise.md` | Build an original mobile international transfers and multi-currency account app inspired by Wise's public workflow: international money transfers, mid-market-rate pricing, multi-currency balances, local account details, card spend/withdrawals, rate alerts, business payments, instant notifications, and regulated-money-service disclosures. |
| 148 | Greenlight | `specs/batch-08/148-greenlight.md` | Build an original mobile kids and teen banking app inspired by Greenlight's public workflow: family finance, kids/teen debit, parent controls, chores, allowance, savings rewards, parent-approved investing, financial literacy, location sharing, crash/SOS alerts, identity protection, subscriptions, and banking partner disclosures. |
| 149 | Step | `specs/batch-08/149-step.md` | Build an original mobile teen banking and credit building app inspired by Step's public workflow: all-in-one teen money account, secured-style credit building, debit/credit card, cashback, savings yield, early-pay borrowing, paid plan, merchant blocking, fraud controls, and banking partner disclosures. |
| 150 | GoodRx | `specs/batch-08/150-goodrx.md` | Build an original prescription price-comparison and coupon app inspired by GoodRx: drug search, price comparison across nearby pharmacies, transferable discount coupons, pharmacy locator, a Gold-style optional subscription for deeper discounts, and optional telehealth add-ons via licensed partners. |
| 151 | Walgreens | `specs/batch-08/151-walgreens.md` | Build an original retail pharmacy companion app inspired by Walgreens: prescription refill management, store locator with services, photo-print ordering, retail shop, and a rewards program. |
| 152 | Zocdoc | `specs/batch-08/152-zocdoc.md` | Build an original doctor-booking marketplace inspired by Zocdoc: search providers by specialty, insurance, and availability; book appointments; complete intake forms; and read patient reviews. |
| 153 | Teladoc | `specs/batch-08/153-teladoc.md` | Build an original telehealth platform inspired by Teladoc: on-demand virtual visits, scheduled appointments, prescription workflows, and behavioral-health services. |
| 154 | BetterHelp | `specs/batch-08/154-betterhelp.md` | Build an original therapy-matching platform inspired by BetterHelp: questionnaire-based therapist matching, recurring video/phone/chat sessions, journaling, and worksheets. |
| 155 | Talkspace | `specs/batch-08/155-talkspace.md` | Build an original messaging-first therapy platform inspired by Talkspace: async text/voice/video messaging with a licensed therapist, optional psychiatry add-on, insurance or self-pay plans, and care-plan tooling. |
| 156 | Hims & Hers | `specs/batch-08/156-hims-hers.md` | Build an original direct-to-consumer telehealth and wellness platform inspired by Hims & Hers: condition-based intake, async clinician review, prescription fulfillment via partner pharmacies on subscription, and a complementary wellness product shop. |
| 157 | Ro | `specs/batch-08/157-ro.md` | Build an original direct-to-consumer telehealth platform inspired by Ro: condition-focused care paths (weight management, sexual health, hair health), clinician-led ongoing care, labs when required, prescription fulfillment, and subscription refills. |
| 158 | Oura | `specs/batch-08/158-oura.md` | Build an original sleep and wellness companion app inspired by Oura: sleep, readiness, and activity scoring from a wearable ring, trends for heart rate and temperature, and coaching content. |
| 159 | Whoop | `specs/batch-08/159-whoop.md` | Build an original fitness and recovery companion app inspired by Whoop: continuous strap sensor sync, recovery/strain/sleep scoring, behavioral journaling, coaching, and a membership-only hardware model. |
| 160 | Sleep Cycle | `specs/batch-08/160-sleep-cycle.md` | Build an original sleep-tracking app inspired by Sleep Cycle: sound-based sleep analysis via the device microphone, smart alarm that wakes within a light-sleep window, trends over time, and snoring detection. |
| 161 | Clue | `specs/batch-09/161-clue.md` | Build an original mobile menstrual-cycle tracker inspired by the Clue workflow: daily logging of period flow, symptoms, moods, and intimate-health signals; cycle predictions; fertile-window estimates; birth-control and conception modes; and privacy-first data handling aligned with current post-Dobbs expectations. |
| 162 | Ovia | `specs/batch-09/162-ovia.md` | Build an original mobile health-journey tracker inspired by Ovia's three-mode workflow: fertility tracking with cycle and ovulation predictions, pregnancy tracking with week-by-week logging, and parenting tracking with child growth and development milestones. |
| 163 | BabyCenter | `specs/batch-09/163-babycenter.md` | Build an original mobile pregnancy-and-parenting companion inspired by BabyCenter's workflow: week-by-week pregnancy content, baby tracking and milestones, a moderated community for parents, and tools (due-date calculator, kick counter, contraction timer) with original copy and medically reviewed content. |
| 164 | Huckleberry | `specs/batch-09/164-huckleberry.md` | Build an original mobile baby-tracking app inspired by Huckleberry: log sleep sessions, feedings, diapers, and pumping; deliver optimal sleep-window predictions based on age and recent sleep; provide sleep plans and content; and support premium features with original copy. |
| 165 | Cozi | `specs/batch-09/165-cozi.md` | Build an original mobile family organizer inspired by Cozi: shared family calendar, grocery and shopping lists, to-do lists, meal plans and recipes, chores, and a family journal. |
| 166 | Life360 | `specs/batch-09/166-life360.md` | Build an original mobile family-locator app inspired by Life360: create a family circle, share real-time location, receive place-based arrival/departure alerts, view driving reports with events like hard braking and speeding, trigger SOS alerts, and optionally summon roadside assistance. |
| 167 | Bark | `specs/batch-09/167-bark.md` | Build an original mobile parental-monitoring app inspired by Bark: parents pair their child's accounts and device; the app scans for concerning content patterns (self-harm, bullying, predators, adult content); parents receive alerts with guidance rather than raw content when possible; includes screen-time controls and location features. |
| 168 | Qustodio | `specs/batch-09/168-qustodio.md` | Build an original mobile parental-control app inspired by Qustodio: control app and website access on a child's device, enforce screen-time schedules, view activity reports, and manage multiple children across phones, tablets, and computers. |
| 169 | Google Family Link | `specs/batch-09/169-google-family-link.md` | Build an original mobile parental-controls app inspired by Google Family Link: supervise a child's device account, approve app downloads and in-app purchases, set screen-time limits, bedtime, and view device location. |
| 170 | ClassDojo | `specs/batch-09/170-classdojo.md` | Build an original mobile school-community app inspired by ClassDojo's public workflows: teacher-led classroom spaces, family messaging, class stories, student portfolios, feedback points, classroom tools, and optional school/district oversight. |
| 171 | Remind | `specs/batch-09/171-remind.md` | Build an original mobile school-messaging app inspired by Remind's public workflows: class announcements, teacher-family/student conversations, multi-channel delivery, contact privacy, translation, school/district oversight, and compliance-minded message history. |
| 172 | Canvas Student | `specs/batch-09/172-canvas-student.md` | Build an original mobile LMS student client inspired by Canvas Student's public workflows: institution selection, student sign-in, course dashboard, modules, assignments, submissions, discussions, quizzes, grades, calendar, notifications, and offline learning. |
| 173 | Google Classroom | `specs/batch-09/173-google-classroom.md` | Build an original mobile lightweight LMS inspired by Google Classroom's public workflows: class creation, class codes, stream announcements, classwork, assignments, file turn-in, comments, grading, due dates, guardian summaries, and cloud-file integration. |
| 174 | ScratchJr | `specs/batch-09/174-scratchjr.md` | Build an original mobile block-based coding app for young learners inspired by ScratchJr's public workflows: drag-and-drop command blocks, characters, painted sprites, recorded sounds, photos, and multi-page interactive stories. |
| 175 | ABCmouse | `specs/batch-09/175-abcmouse.md` | Build an original mobile kids-education app inspired by ABCmouse's public workflows: parent-owned subscription/account, child profiles, age/grade learning paths, books, videos, puzzles, songs, creative play, rewards, progress reporting, and offline lessons. |
| 176 | Khan Academy Kids | `specs/batch-09/176-khan-academy-kids.md` | Build an original mobile kids-learning app inspired by Khan Academy Kids: free adaptive PreK-2 lessons across reading, math, social-emotional learning, plus stories and creative play. |
| 177 | Epic! | `specs/batch-09/177-epic.md` | Build an original mobile kids-reading app inspired by Epic!: children's book, audiobook, and video subscription with reading logs, quizzes, and classroom teacher accounts. |
| 178 | YouTube Kids | `specs/batch-09/178-youtube-kids.md` | Build an original mobile kids-video app inspired by YouTube Kids: age-tiered video library, parental controls, timer, approved-content mode, and creator profile pages. |
| 179 | PBS Kids | `specs/batch-09/179-pbs-kids.md` | Build an original mobile kids-TV app inspired by PBS Kids: ad-free kids video catalog, live stream, and simple games with minimal or no sign-in. |
| 180 | Babbel | `specs/batch-09/180-babbel.md` | Build an original mobile language-learning app inspired by Babbel: structured lessons organized by course/level, a review manager for spaced repetition, speech recognition for pronunciation practice, and a subscription unlock for most content. |
| 181 | Rosetta Stone | `specs/batch-10/181-rosetta-stone.md` | Build an original mobile language-learning app inspired by immersion-style pedagogy: image-to-word association, in-context phrase building, speech grading against native reference, spaced review, stories/audio companions, and cross-device progress. |
| 182 | Busuu | `specs/batch-10/182-busuu.md` | Build an original mobile language-learning app inspired by a structured course path enhanced by community feedback, live classes, and optional certification milestones. |
| 183 | Google Translate | `specs/batch-10/183-google-translate.md` | Build an original mobile translation app inspired by Google Translate: text, voice, camera (OCR + overlay), conversation (two-speaker turn-taking), offline language packs, saved phrases, and handwriting input. |
| 184 | DeepL | `specs/batch-10/184-deepl.md` | Build an original mobile translation app inspired by DeepL's focus on high-quality text and document translation, glossary control, and alternative translations. |
| 185 | Otter.ai | `specs/batch-10/185-otter-ai.md` | Build an original mobile transcription app inspired by live meeting transcription with speaker labels, automatic summaries, importable audio files, and calendar-based meeting sync. |
| 186 | Grammarly | `specs/batch-10/186-grammarly.md` | Build an original mobile writing assistant inspired by Grammarly's mobile workflow: keyboard-assisted suggestions, in-app document editing, grammar/spelling/clarity checks, tone and rewrite assistance, writing goals, dictionary terms, account privacy controls, and paid entitlement states. |
| 187 | GitHub Mobile | `specs/batch-10/187-github-mobile.md` | Build an original mobile developer collaboration client inspired by GitHub Mobile: notification inbox, issues, pull requests, code review, repository browsing, search, Actions run monitoring, discussion/comment workflows, and scoped OAuth authentication. |
| 188 | Linear | `specs/batch-10/188-linear.md` | Build an original mobile issue-tracking client inspired by Linear's workflow: fast personal inbox, issue creation and triage, team backlogs, cycles, projects, roadmaps, comments, notifications, workspace switching, and realtime optimistic updates. |
| 189 | Jira | `specs/batch-10/189-jira.md` | Build an original agile project-management and issue-tracking app inspired by Jira's mobile workflows: project selection, boards, backlogs, issues, sprints, workflow transitions, comments, search/query, reports, notifications, and enterprise-ready permissions. |
| 190 | Asana | `specs/batch-10/190-asana.md` | Build an original mobile work-management app inspired by Asana's mobile workflows: My Tasks, projects, task details, subtasks, list/board/timeline/calendar views, goals, portfolios, inbox notifications, comments, attachments, workspace/team permissions, and entitlement-aware collaboration. |
| 191 | ClickUp | `specs/batch-10/191-clickup.md` | Build an original mobile work hub inspired by ClickUp's public mobile and help documentation: tasks, lists, boards, docs, chat-like collaboration, dashboards, whiteboards, reminders, time tracking, workspace hierarchy, and entitlement-aware enterprise controls. |
| 192 | Figma | `specs/batch-10/192-figma.md` | Build an original mobile design-review companion inspired by Figma's public mobile documentation: browse files, projects, workspaces, prototypes, slides, and boards; view and comment on files; play prototypes; mirror selected desktop frames; share links; and manage permissions from mobile. |
| 193 | Miro | `specs/batch-10/193-miro.md` | Build an original mobile collaborative whiteboard inspired by Miro's public mobile and help documentation: board browsing, infinite canvas, sticky notes, text, shapes, frames, connectors, comments, uploads, templates, AI-adjacent affordances, presentation/follow modes, sharing, and enterprise-ready permissions. |
| 194 | Calendly | `specs/batch-10/194-calendly.md` | Build an original mobile scheduling app inspired by Calendly's public mobile and help documentation: meeting/event types, availability schedules, booking links, invitee booking pages, calendar connections, upcoming meetings, reschedule/cancel flows, notifications, integrations, team scheduling, and entitlement-aware administration. |
| 195 | Fantastical | `specs/batch-10/195-fantastical.md` | Build an original mobile calendar and tasks app inspired by Fantastical's public product and support materials: unified calendar/task views, natural-language event/task entry, multiple calendar accounts, reminders/tasks, notifications, widgets, weather-aware agenda, conference links, and entitlement-aware premium features. |
| 196 | Things 3 | `specs/batch-10/196-things-3.md` | Build an original mobile task manager inspired by Things 3's public product and support materials: Inbox capture, day planning, scheduled/deadline views, projects, areas, headings, tags, checklists, quick entry, widgets, reminders, and optional cross-device sync. |
| 197 | Obsidian | `specs/batch-10/197-obsidian.md` | Build an original mobile Markdown notes app inspired by Obsidian's public product and help materials: local-first vaults, Markdown files, wiki links/backlinks, graph visualization, search, commands, themes, plugins, and optional encrypted sync. |
| 198 | Bear | `specs/batch-10/198-bear.md` | Build an original mobile Markdown notes app inspired by Bear's public product and marketplace materials: plain-text/Markdown writing, hashtag organization, nested tags, tasks, links/backlinks, attachments, themes, export, Siri/Shortcuts-style capture, lock/privacy features, and paid sync. |
| 199 | Day One | `specs/batch-10/199-day-one.md` | Build an original mobile journaling app inspired by Day One's public product and support materials: dated entries, photos/audio/video-style media, multiple journals, timeline/calendar/map/on-this-day views, streaks, reminders, prompts, import/export, app lock, and end-to-end encrypted sync. |
| 200 | AllTrails | `specs/batch-10/200-alltrails.md` | Build an original mobile outdoor discovery and navigation app inspired by AllTrails' public product and support materials: trail search/map/list discovery, trail detail pages, licensed maps/trail data, saved lists, activity recording, navigation, offline maps, reviews/photos, conditions/safety reports, live-share-style safety features, and subscription-gated planning tools. |
| 201 | Poe | `specs/batch-11/201-poe.md` | Build an original mobile AI assistant inspired by Poe's public product and policy materials. |
| 202 | Gemini | `specs/batch-11/202-gemini.md` | Build an original mobile AI assistant inspired by Gemini's public product and policy materials. |
| 203 | Microsoft Copilot | `specs/batch-11/203-microsoft-copilot.md` | Build an original mobile AI assistant inspired by Microsoft Copilot's public product and policy materials. |
| 204 | Grok | `specs/batch-11/204-grok.md` | Build an original mobile AI assistant inspired by Grok's public product and policy materials. |
| 205 | DeepSeek | `specs/batch-11/205-deepseek.md` | Build an original mobile AI assistant inspired by DeepSeek's public product and policy materials. |
| 206 | Meta AI | `specs/batch-11/206-meta-ai.md` | Build an original mobile AI assistant inspired by Meta AI's public product and policy materials. |
| 207 | You.com | `specs/batch-11/207-you-com.md` | Build an original mobile AI assistant inspired by You.com's public product and policy materials. |
| 208 | Pi | `specs/batch-11/208-pi.md` | Build an original mobile AI assistant inspired by Pi's public product and policy materials. |
| 209 | Phind | `specs/batch-11/209-phind.md` | Build an original mobile AI assistant inspired by Phind's public product and policy materials. |
| 210 | HuggingChat | `specs/batch-11/210-huggingchat.md` | Build an original mobile AI assistant inspired by HuggingChat's public product and policy materials. |
| 211 | Wysa | `specs/batch-11/211-wysa.md` | Build an original mobile AI assistant inspired by Wysa's public product and policy materials. |
| 212 | ELSA Speak | `specs/batch-11/212-elsa-speak.md` | Build an original mobile AI assistant inspired by ELSA Speak's public product and policy materials. |
| 213 | OtterPilot | `specs/batch-11/213-otterpilot.md` | Build an original mobile AI assistant inspired by OtterPilot's public product and policy materials. |
| 214 | Grammarly Keyboard | `specs/batch-11/214-grammarly-keyboard.md` | Build an original mobile AI assistant inspired by Grammarly Keyboard's public product and policy materials. |
| 215 | Wordtune | `specs/batch-11/215-wordtune.md` | Build an original mobile AI assistant inspired by Wordtune's public product and policy materials. |
| 216 | QuillBot | `specs/batch-11/216-quillbot.md` | Build an original mobile AI assistant inspired by QuillBot's public product and policy materials. |
| 217 | Ask AI | `specs/batch-11/217-ask-ai.md` | Build an original mobile AI assistant inspired by Ask AI's public product and policy materials. |
| 218 | Genie | `specs/batch-11/218-genie.md` | Build an original mobile AI assistant inspired by Genie's public product and policy materials. |
| 219 | Monica | `specs/batch-11/219-monica.md` | Build an original mobile AI assistant inspired by Monica's public product and policy materials. |
| 220 | Notion AI | `specs/batch-11/220-notion-ai.md` | Build an original mobile AI assistant inspired by Notion AI's public product and policy materials. |
| 221 | Forefront AI | `specs/batch-12/221-forefront-ai.md` | Build an original mobile ai assistant product inspired by Forefront AI's public product and policy materials. |
| 222 | Consensus | `specs/batch-12/222-consensus.md` | Build an original mobile ai assistant product inspired by Consensus's public product and policy materials. |
| 223 | Picsart | `specs/batch-12/223-picsart.md` | Build an original mobile photo editing product inspired by Picsart's public product and policy materials. |
| 224 | VSCO | `specs/batch-12/224-vsco.md` | Build an original mobile photo editing product inspired by VSCO's public product and policy materials. |
| 225 | Snapseed | `specs/batch-12/225-snapseed.md` | Build an original mobile photo editing product inspired by Snapseed's public product and policy materials. |
| 226 | Adobe Express | `specs/batch-12/226-adobe-express.md` | Build an original mobile photo editing product inspired by Adobe Express's public product and policy materials. |
| 227 | Photoshop Express | `specs/batch-12/227-photoshop-express.md` | Build an original mobile photo editing product inspired by Photoshop Express's public product and policy materials. |
| 228 | Procreate Pocket | `specs/batch-12/228-procreate-pocket.md` | Build an original mobile photo editing product inspired by Procreate Pocket's public product and policy materials. |
| 229 | Sketchbook | `specs/batch-12/229-sketchbook.md` | Build an original mobile photo editing product inspired by Sketchbook's public product and policy materials. |
| 230 | ibis Paint X | `specs/batch-12/230-ibis-paint-x.md` | Build an original mobile photo editing product inspired by ibis Paint X's public product and policy materials. |
| 231 | Clip Studio Paint | `specs/batch-12/231-clip-studio-paint.md` | Build an original mobile photo editing product inspired by Clip Studio Paint's public product and policy materials. |
| 232 | Bazaart | `specs/batch-12/232-bazaart.md` | Build an original mobile photo editing product inspired by Bazaart's public product and policy materials. |
| 233 | Prequel | `specs/batch-12/233-prequel.md` | Build an original mobile photo editing product inspired by Prequel's public product and policy materials. |
| 234 | Facetune | `specs/batch-12/234-facetune.md` | Build an original mobile photo editing product inspired by Facetune's public product and policy materials. |
| 235 | BeautyPlus | `specs/batch-12/235-beautyplus.md` | Build an original mobile photo editing product inspired by BeautyPlus's public product and policy materials. |
| 236 | SNOW | `specs/batch-12/236-snow.md` | Build an original mobile photo editing product inspired by SNOW's public product and policy materials. |
| 237 | Meitu | `specs/batch-12/237-meitu.md` | Build an original mobile photo editing product inspired by Meitu's public product and policy materials. |
| 238 | Polish | `specs/batch-12/238-polish.md` | Build an original mobile photo editing product inspired by Polish's public product and policy materials. |
| 239 | PhotoRoom | `specs/batch-12/239-photoroom.md` | Build an original mobile photo editing product inspired by PhotoRoom's public product and policy materials. |
| 240 | Pixelcut | `specs/batch-12/240-pixelcut.md` | Build an original mobile photo editing product inspired by Pixelcut's public product and policy materials. |
| 241 | Lensa | `specs/batch-13/241-lensa.md` | Build an original mobile photo/video editing product inspired by Lensa's public product and policy materials. |
| 242 | Remini | `specs/batch-13/242-remini.md` | Build an original mobile photo/video editing product inspired by Remini's public product and policy materials. |
| 243 | PicCollage | `specs/batch-13/243-piccollage.md` | Build an original mobile photo/video editing product inspired by PicCollage's public product and policy materials. |
| 244 | Layout | `specs/batch-13/244-layout.md` | Build an original mobile photo/video editing product inspired by Layout's public product and policy materials. |
| 245 | Hypic | `specs/batch-13/245-hypic.md` | Build an original mobile photo/video editing product inspired by Hypic's public product and policy materials. |
| 246 | Tezza | `specs/batch-13/246-tezza.md` | Build an original mobile photo/video editing product inspired by Tezza's public product and policy materials. |
| 247 | Unfold | `specs/batch-13/247-unfold.md` | Build an original mobile photo/video editing product inspired by Unfold's public product and policy materials. |
| 248 | InShot | `specs/batch-13/248-inshot.md` | Build an original mobile photo/video editing product inspired by InShot's public product and policy materials. |
| 249 | VN Video Editor | `specs/batch-13/249-vn-video-editor.md` | Build an original mobile photo/video editing product inspired by VN Video Editor's public product and policy materials. |
| 250 | KineMaster | `specs/batch-13/250-kinemaster.md` | Build an original mobile photo/video editing product inspired by KineMaster's public product and policy materials. |
| 251 | Splice | `specs/batch-13/251-splice.md` | Build an original mobile photo/video editing product inspired by Splice's public product and policy materials. |
| 252 | LumaFusion | `specs/batch-13/252-lumafusion.md` | Build an original mobile photo/video editing product inspired by LumaFusion's public product and policy materials. |
| 253 | Videoleap | `specs/batch-13/253-videoleap.md` | Build an original mobile photo/video editing product inspired by Videoleap's public product and policy materials. |
| 254 | Filmora | `specs/batch-13/254-filmora.md` | Build an original mobile photo/video editing product inspired by Filmora's public product and policy materials. |
| 255 | Alight Motion | `specs/batch-13/255-alight-motion.md` | Build an original mobile photo/video editing product inspired by Alight Motion's public product and policy materials. |
| 256 | Mojo | `specs/batch-13/256-mojo.md` | Build an original mobile photo/video editing product inspired by Mojo's public product and policy materials. |
| 257 | Apple Clips | `specs/batch-13/257-apple-clips.md` | Build an original mobile photo/video editing product inspired by Apple Clips's public product and policy materials. |
| 258 | Magisto | `specs/batch-13/258-magisto.md` | Build an original mobile photo/video editing product inspired by Magisto's public product and policy materials. |
| 259 | GoPro Quik | `specs/batch-13/259-gopro-quik.md` | Build an original mobile photo/video editing product inspired by GoPro Quik's public product and policy materials. |
| 260 | VivaVideo | `specs/batch-13/260-vivavideo.md` | Build an original mobile photo/video editing product inspired by VivaVideo's public product and policy materials. |
| 261 | VideoShow | `specs/batch-14/261-videoshow.md` | Build an original mobile video editing product inspired by VideoShow's public product and policy materials. |
| 262 | PowerDirector | `specs/batch-14/262-powerdirector.md` | Build an original mobile video editing product inspired by PowerDirector's public product and policy materials. |
| 263 | Adobe Premiere Rush | `specs/batch-14/263-adobe-premiere-rush.md` | Build an original mobile video editing product inspired by Adobe Premiere Rush's public product and policy materials. |
| 264 | Descript | `specs/batch-14/264-descript.md` | Build an original mobile video editing product inspired by Descript's public product and policy materials. |
| 265 | Captions | `specs/batch-14/265-captions.md` | Build an original mobile video editing product inspired by Captions's public product and policy materials. |
| 266 | OpusClip | `specs/batch-14/266-opusclip.md` | Build an original mobile video editing product inspired by OpusClip's public product and policy materials. |
| 267 | VEED | `specs/batch-14/267-veed.md` | Build an original mobile video editing product inspired by VEED's public product and policy materials. |
| 268 | TikTok Studio | `specs/batch-14/268-tiktok-studio.md` | Build an original mobile video editing product inspired by TikTok Studio's public product and policy materials. |
| 269 | YouTube Create | `specs/batch-14/269-youtube-create.md` | Build an original mobile video editing product inspired by YouTube Create's public product and policy materials. |
| 270 | Shazam | `specs/batch-14/270-shazam.md` | Build an original mobile music/audio product inspired by Shazam's public product and policy materials. |
| 271 | Bandcamp | `specs/batch-14/271-bandcamp.md` | Build an original mobile music/audio product inspired by Bandcamp's public product and policy materials. |
| 272 | Deezer | `specs/batch-14/272-deezer.md` | Build an original mobile music/audio product inspired by Deezer's public product and policy materials. |
| 273 | TIDAL | `specs/batch-14/273-tidal.md` | Build an original mobile music/audio product inspired by TIDAL's public product and policy materials. |
| 274 | Pandora | `specs/batch-14/274-pandora.md` | Build an original mobile music/audio product inspired by Pandora's public product and policy materials. |
| 275 | iHeartRadio | `specs/batch-14/275-iheartradio.md` | Build an original mobile music/audio product inspired by iHeartRadio's public product and policy materials. |
| 276 | SiriusXM | `specs/batch-14/276-siriusxm.md` | Build an original mobile music/audio product inspired by SiriusXM's public product and policy materials. |
| 277 | TuneIn Radio | `specs/batch-14/277-tunein-radio.md` | Build an original mobile music/audio product inspired by TuneIn Radio's public product and policy materials. |
| 278 | Amazon Music | `specs/batch-14/278-amazon-music.md` | Build an original mobile music/audio product inspired by Amazon Music's public product and policy materials. |
| 279 | Qobuz | `specs/batch-14/279-qobuz.md` | Build an original mobile music/audio product inspired by Qobuz's public product and policy materials. |
| 280 | Anghami | `specs/batch-14/280-anghami.md` | Build an original mobile music/audio product inspired by Anghami's public product and policy materials. |
| 281 | Musixmatch | `specs/batch-15/281-musixmatch.md` | Build an original mobile song recognition and lyrics product inspired by Musixmatch's public product and policy materials. |
| 282 | GarageBand | `specs/batch-15/282-garageband.md` | Build an original mobile mobile music creation product inspired by GarageBand's public product and policy materials. |
| 283 | BandLab | `specs/batch-15/283-bandlab.md` | Build an original mobile collaborative music creation product inspired by BandLab's public product and policy materials. |
| 284 | Voloco | `specs/batch-15/284-voloco.md` | Build an original mobile mobile music creation product inspired by Voloco's public product and policy materials. |
| 285 | Smule | `specs/batch-15/285-smule.md` | Build an original mobile karaoke and social audio product inspired by Smule's public product and policy materials. |
| 286 | StarMaker | `specs/batch-15/286-starmaker.md` | Build an original mobile karaoke and social audio product inspired by StarMaker's public product and policy materials. |
| 287 | SoundHound | `specs/batch-15/287-soundhound.md` | Build an original mobile song recognition and lyrics product inspired by SoundHound's public product and policy materials. |
| 288 | Sonos | `specs/batch-15/288-sonos.md` | Build an original mobile audio hardware control product inspired by Sonos's public product and policy materials. |
| 289 | Bose Music | `specs/batch-15/289-bose-music.md` | Build an original mobile audio hardware control product inspired by Bose Music's public product and policy materials. |
| 290 | JBL Portable | `specs/batch-15/290-jbl-portable.md` | Build an original mobile audio hardware control product inspired by JBL Portable's public product and policy materials. |
| 291 | Endel | `specs/batch-15/291-endel.md` | Build an original mobile wellness audio product inspired by Endel's public product and policy materials. |
| 292 | Brain.fm | `specs/batch-15/292-brain-fm.md` | Build an original mobile wellness audio product inspired by Brain.fm's public product and policy materials. |
| 293 | Overcast | `specs/batch-15/293-overcast.md` | Build an original mobile podcast playback product inspired by Overcast's public product and policy materials. |
| 294 | Castro | `specs/batch-15/294-castro.md` | Build an original mobile podcast playback product inspired by Castro's public product and policy materials. |
| 295 | Podbean | `specs/batch-15/295-podbean.md` | Build an original mobile podcast creator platform product inspired by Podbean's public product and policy materials. |
| 296 | Spotify for Podcasters | `specs/batch-15/296-spotify-for-podcasters.md` | Build an original mobile podcast creator platform product inspired by Spotify for Podcasters's public product and policy materials. |
| 297 | Anchor | `specs/batch-15/297-anchor.md` | Build an original mobile podcast creator platform product inspired by Anchor's public product and policy materials. |
| 298 | Podcast Addict | `specs/batch-15/298-podcast-addict.md` | Build an original mobile podcast playback product inspired by Podcast Addict's public product and policy materials. |
| 299 | Podimo | `specs/batch-15/299-podimo.md` | Build an original mobile podcast creator platform product inspired by Podimo's public product and policy materials. |
| 300 | Acast | `specs/batch-15/300-acast.md` | Build an original mobile podcast creator platform product inspired by Acast's public product and policy materials. |
| 301 | Player FM | `specs/batch-16/301-player-fm.md` | Build an original mobile podcast playback product inspired by Player FM's public product and policy materials. |
| 302 | Castbox | `specs/batch-16/302-castbox.md` | Build an original mobile podcast playback product inspired by Castbox's public product and policy materials. |
| 303 | RadioPublic | `specs/batch-16/303-radiopublic.md` | Build an original mobile podcast creator platform product inspired by RadioPublic's public product and policy materials. |
| 304 | NPR One | `specs/batch-16/304-npr-one.md` | Build an original mobile publisher audio product inspired by NPR One's public product and policy materials. |
| 305 | BBC Sounds | `specs/batch-16/305-bbc-sounds.md` | Build an original mobile publisher audio product inspired by BBC Sounds's public product and policy materials. |
| 306 | Libsyn | `specs/batch-16/306-libsyn.md` | Build an original mobile podcast creator platform product inspired by Libsyn's public product and policy materials. |
| 307 | Podchaser | `specs/batch-16/307-podchaser.md` | Build an original mobile podcast directory product inspired by Podchaser's public product and policy materials. |
| 308 | Pocket FM | `specs/batch-16/308-pocket-fm.md` | Build an original mobile serialized audio listening product inspired by Pocket FM's public product and policy materials. |
| 309 | Storytel | `specs/batch-16/309-storytel.md` | Build an original mobile audiobook and ebook streaming product inspired by Storytel's public product and policy materials. |
| 310 | Audacy | `specs/batch-16/310-audacy.md` | Build an original mobile radio and podcast streaming product inspired by Audacy's public product and policy materials. |
| 311 | iVoox | `specs/batch-16/311-ivoox.md` | Build an original mobile podcast creator platform product inspired by iVoox's public product and policy materials. |
| 312 | Goodpods | `specs/batch-16/312-goodpods.md` | Build an original mobile social podcast discovery product inspired by Goodpods's public product and policy materials. |
| 313 | Hulu | `specs/batch-16/313-hulu.md` | Build an original mobile streaming video product inspired by Hulu's public product and policy materials. |
| 314 | Disney+ | `specs/batch-16/314-disney-plus.md` | Build an original mobile streaming video product inspired by Disney+'s public product and policy materials. |
| 315 | Max | `specs/batch-16/315-max.md` | Build an original mobile streaming video product inspired by Max's public product and policy materials. |
| 316 | Peacock TV | `specs/batch-16/316-peacock-tv.md` | Build an original mobile streaming video product inspired by Peacock TV's public product and policy materials. |
| 317 | Paramount+ | `specs/batch-16/317-paramount-plus.md` | Build an original mobile streaming video product inspired by Paramount+'s public product and policy materials. |
| 318 | Prime Video | `specs/batch-16/318-prime-video.md` | Build an original mobile streaming video product inspired by Prime Video's public product and policy materials. |
| 319 | Crunchyroll | `specs/batch-16/319-crunchyroll.md` | Build an original mobile streaming video product inspired by Crunchyroll's public product and policy materials. |
| 320 | Plex | `specs/batch-16/320-plex.md` | Build an original mobile streaming video product inspired by Plex's public product and policy materials. |
| 321 | Tubi | `specs/batch-17/321-tubi.md` | Build an original mobile streaming video product inspired by Tubi's public product and policy materials. |
| 322 | Pluto TV | `specs/batch-17/322-pluto-tv.md` | Build an original mobile streaming video product inspired by Pluto TV's public product and policy materials. |
| 323 | Roku | `specs/batch-17/323-roku.md` | Build an original mobile streaming video product inspired by Roku's public product and policy materials. |
| 324 | Fandango at Home | `specs/batch-17/324-fandango-at-home.md` | Build an original mobile streaming video product inspired by Fandango at Home's public product and policy materials. |
| 325 | Vudu | `specs/batch-17/325-vudu.md` | Build an original mobile streaming video product inspired by Vudu's public product and policy materials. |
| 326 | MUBI | `specs/batch-17/326-mubi.md` | Build an original mobile streaming video product inspired by MUBI's public product and policy materials. |
| 327 | The Criterion Channel | `specs/batch-17/327-the-criterion-channel.md` | Build an original mobile streaming video product inspired by The Criterion Channel's public product and policy materials. |
| 328 | Kanopy | `specs/batch-17/328-kanopy.md` | Build an original mobile streaming video product inspired by Kanopy's public product and policy materials. |
| 329 | Hoopla | `specs/batch-17/329-hoopla.md` | Build an original mobile streaming video product inspired by Hoopla's public product and policy materials. |
| 330 | Nebula | `specs/batch-17/330-nebula.md` | Build an original mobile streaming video product inspired by Nebula's public product and policy materials. |
| 331 | Curiosity Stream | `specs/batch-17/331-curiosity-stream.md` | Build an original mobile streaming video product inspired by Curiosity Stream's public product and policy materials. |
| 332 | Gaia | `specs/batch-17/332-gaia.md` | Build an original mobile streaming video product inspired by Gaia's public product and policy materials. |
| 333 | Dropout | `specs/batch-17/333-dropout.md` | Build an original mobile streaming video product inspired by Dropout's public product and policy materials. |
| 334 | BritBox | `specs/batch-17/334-britbox.md` | Build an original mobile streaming video product inspired by BritBox's public product and policy materials. |
| 335 | Acorn TV | `specs/batch-17/335-acorn-tv.md` | Build an original mobile streaming video product inspired by Acorn TV's public product and policy materials. |
| 336 | YouTube TV | `specs/batch-17/336-youtube-tv.md` | Build an original mobile streaming video product inspired by YouTube TV's public product and policy materials. |
| 337 | Sling TV | `specs/batch-17/337-sling-tv.md` | Build an original mobile streaming video product inspired by Sling TV's public product and policy materials. |
| 338 | ESPN | `specs/batch-17/338-espn.md` | Build an original mobile sports and fitness product inspired by ESPN's public product and policy materials. |
| 339 | The Athletic | `specs/batch-17/339-the-athletic.md` | Build an original mobile sports and fitness product inspired by The Athletic's public product and policy materials. |
| 340 | Bleacher Report | `specs/batch-17/340-bleacher-report.md` | Build an original mobile sports and fitness product inspired by Bleacher Report's public product and policy materials. |
| 341 | Yahoo Sports | `specs/batch-18/341-yahoo-sports.md` | Build an original mobile sports and fitness product inspired by Yahoo Sports's public product and policy materials. |
| 342 | CBS Sports | `specs/batch-18/342-cbs-sports.md` | Build an original mobile sports and fitness product inspired by CBS Sports's public product and policy materials. |
| 343 | FOX Sports | `specs/batch-18/343-fox-sports.md` | Build an original mobile sports and fitness product inspired by FOX Sports's public product and policy materials. |
| 344 | NBA | `specs/batch-18/344-nba.md` | Build an original mobile sports and fitness product inspired by NBA's public product and policy materials. |
| 345 | NFL | `specs/batch-18/345-nfl.md` | Build an original mobile sports and fitness product inspired by NFL's public product and policy materials. |
| 346 | MLB | `specs/batch-18/346-mlb.md` | Build an original mobile sports and fitness product inspired by MLB's public product and policy materials. |
| 347 | NHL | `specs/batch-18/347-nhl.md` | Build an original mobile sports and fitness product inspired by NHL's public product and policy materials. |
| 348 | FIFA | `specs/batch-18/348-fifa.md` | Build an original mobile sports and fitness product inspired by FIFA's public product and policy materials. |
| 349 | Fubo | `specs/batch-18/349-fubo.md` | Build an original mobile sports and fitness product inspired by Fubo's public product and policy materials. |
| 350 | DAZN | `specs/batch-18/350-dazn.md` | Build an original mobile sports and fitness product inspired by DAZN's public product and policy materials. |
| 351 | FanDuel Sportsbook | `specs/batch-18/351-fanduel-sportsbook.md` | Build an original mobile sports and fitness product inspired by FanDuel Sportsbook's public product and policy materials. |
| 352 | DraftKings Sportsbook | `specs/batch-18/352-draftkings-sportsbook.md` | Build an original mobile sports and fitness product inspired by DraftKings Sportsbook's public product and policy materials. |
| 353 | Sleeper | `specs/batch-18/353-sleeper.md` | Build an original mobile sports and fitness product inspired by Sleeper's public product and policy materials. |
| 354 | ESPN Fantasy Sports | `specs/batch-18/354-espn-fantasy-sports.md` | Build an original mobile sports and fitness product inspired by ESPN Fantasy Sports's public product and policy materials. |
| 355 | Yahoo Fantasy Sports | `specs/batch-18/355-yahoo-fantasy-sports.md` | Build an original mobile sports and fitness product inspired by Yahoo Fantasy Sports's public product and policy materials. |
| 356 | Peloton | `specs/batch-18/356-peloton.md` | Build an original mobile sports and fitness product inspired by Peloton's public product and policy materials. |
| 357 | Zwift | `specs/batch-18/357-zwift.md` | Build an original mobile sports and fitness product inspired by Zwift's public product and policy materials. |
| 358 | Garmin Connect | `specs/batch-18/358-garmin-connect.md` | Build an original mobile sports and fitness product inspired by Garmin Connect's public product and policy materials. |
| 359 | Nike Training Club | `specs/batch-18/359-nike-training-club.md` | Build an original mobile sports and fitness product inspired by Nike Training Club's public product and policy materials. |
| 360 | Fitbod | `specs/batch-18/360-fitbod.md` | Build an original mobile sports and fitness product inspired by Fitbod's public product and policy materials. |
| 361 | Strong | `specs/batch-19/361-strong.md` | Build an original mobile fitness/training product inspired by Strong's public product and policy materials. |
| 362 | Hevy | `specs/batch-19/362-hevy.md` | Build an original mobile fitness/training product inspired by Hevy's public product and policy materials. |
| 363 | Runkeeper | `specs/batch-19/363-runkeeper.md` | Build an original mobile fitness/training product inspired by Runkeeper's public product and policy materials. |
| 364 | MapMyRun | `specs/batch-19/364-mapmyrun.md` | Build an original mobile fitness/training product inspired by MapMyRun's public product and policy materials. |
| 365 | Komoot | `specs/batch-19/365-komoot.md` | Build an original mobile fitness/training product inspired by komoot's public product and policy materials. |
| 366 | Relive | `specs/batch-19/366-relive.md` | Build an original mobile fitness/training product inspired by Relive's public product and policy materials. |
| 367 | TrainerRoad | `specs/batch-19/367-trainerroad.md` | Build an original mobile fitness/training product inspired by TrainerRoad's public product and policy materials. |
| 368 | TrainingPeaks | `specs/batch-19/368-trainingpeaks.md` | Build an original mobile fitness/training product inspired by TrainingPeaks's public product and policy materials. |
| 369 | Chick-fil-A | `specs/batch-19/369-chick-fil-a.md` | Build an original mobile restaurant ordering and loyalty product inspired by Chick-fil-A's public product and policy materials. |
| 370 | Dunkin' | `specs/batch-19/370-dunkin.md` | Build an original mobile restaurant ordering and loyalty product inspired by Dunkin's public product and policy materials. |
| 371 | Chipotle | `specs/batch-19/371-chipotle.md` | Build an original mobile restaurant ordering and loyalty product inspired by Chipotle's public product and policy materials. |
| 372 | Taco Bell | `specs/batch-19/372-taco-bell.md` | Build an original mobile restaurant ordering and loyalty product inspired by Taco Bell's public product and policy materials. |
| 373 | Subway | `specs/batch-19/373-subway.md` | Build an original mobile restaurant ordering and loyalty product inspired by Subway's public product and policy materials. |
| 374 | Panera Bread | `specs/batch-19/374-panera-bread.md` | Build an original mobile restaurant ordering and loyalty product inspired by Panera Bread's public product and policy materials. |
| 375 | Wendy's | `specs/batch-19/375-wendy-s.md` | Build an original mobile restaurant ordering and loyalty product inspired by Wendy's's public product and policy materials. |
| 376 | Burger King | `specs/batch-19/376-burger-king.md` | Build an original mobile restaurant ordering and loyalty product inspired by Burger King's public product and policy materials. |
| 377 | Domino's | `specs/batch-19/377-domino-s.md` | Build an original mobile restaurant ordering and loyalty product inspired by Domino's's public product and policy materials. |
| 378 | Pizza Hut | `specs/batch-19/378-pizza-hut.md` | Build an original mobile restaurant ordering and loyalty product inspired by Pizza Hut's public product and policy materials. |
| 379 | Papa Johns | `specs/batch-19/379-papa-johns.md` | Build an original mobile restaurant ordering and loyalty product inspired by Papa Johns's public product and policy materials. |
| 380 | Little Caesars | `specs/batch-19/380-little-caesars.md` | Build an original mobile restaurant ordering and loyalty product inspired by Little Caesars's public product and policy materials. |
| 381 | KFC | `specs/batch-20/381-kfc.md` | Build an original mobile product inspired by KFC's public product and policy materials. |
| 382 | Popeyes | `specs/batch-20/382-popeyes.md` | Build an original mobile product inspired by Popeyes's public product and policy materials. |
| 383 | Sonic Drive-In | `specs/batch-20/383-sonic-drive-in.md` | Build an original mobile product inspired by SONIC Drive-In's public product and policy materials. |
| 384 | Shake Shack | `specs/batch-20/384-shake-shack.md` | Build an original mobile product inspired by Shake Shack's public product and policy materials. |
| 385 | Sweetgreen | `specs/batch-20/385-sweetgreen.md` | Build an original mobile product inspired by sweetgreen's public product and policy materials. |
| 386 | Cava | `specs/batch-20/386-cava.md` | Build an original mobile product inspired by CAVA's public product and policy materials. |
| 387 | Wingstop | `specs/batch-20/387-wingstop.md` | Build an original mobile product inspired by Wingstop's public product and policy materials. |
| 388 | Dairy Queen | `specs/batch-20/388-dairy-queen.md` | Build an original mobile product inspired by Dairy Queen's public product and policy materials. |
| 389 | Dutch Bros | `specs/batch-20/389-dutch-bros.md` | Build an original mobile product inspired by Dutch Bros's public product and policy materials. |
| 390 | 7-Eleven | `specs/batch-20/390-7-eleven.md` | Build an original mobile product inspired by 7-Eleven's public product and policy materials. |
| 391 | Krispy Kreme | `specs/batch-20/391-krispy-kreme.md` | Build an original mobile product inspired by Krispy Kreme's public product and policy materials. |
| 392 | Jamba | `specs/batch-20/392-jamba.md` | Build an original mobile product inspired by Jamba's public product and policy materials. |
| 393 | Walmart | `specs/batch-20/393-walmart.md` | Build an original mobile product inspired by Walmart's public product and policy materials. |
| 394 | Target | `specs/batch-20/394-target.md` | Build an original mobile product inspired by Target's public product and policy materials. |
| 395 | Costco | `specs/batch-20/395-costco.md` | Build an original mobile product inspired by Costco's public product and policy materials. |
| 396 | Sam's Club | `specs/batch-20/396-sam-s-club.md` | Build an original mobile product inspired by Sam's Club's public product and policy materials. |
| 397 | Kroger | `specs/batch-20/397-kroger.md` | Build an original mobile product inspired by Kroger's public product and policy materials. |
| 398 | Safeway | `specs/batch-20/398-safeway.md` | Build an original mobile product inspired by Safeway's public product and policy materials. |
| 399 | Albertsons | `specs/batch-20/399-albertsons.md` | Build an original mobile product inspired by Albertsons's public product and policy materials. |
| 400 | Whole Foods Market | `specs/batch-20/400-whole-foods-market.md` | Build an original mobile product inspired by Whole Foods Market's public product and policy materials. |
| 401 | Publix | `specs/batch-21/401-publix.md` | Build an original mobile product inspired by Publix's public product and policy materials. |
| 402 | H-E-B | `specs/batch-21/402-h-e-b.md` | Build an original mobile product inspired by H-E-B's public product and policy materials. |
| 403 | Meijer | `specs/batch-21/403-meijer.md` | Build an original mobile product inspired by Meijer's public product and policy materials. |
| 404 | Aldi | `specs/batch-21/404-aldi.md` | Build an original mobile product inspired by ALDI's public product and policy materials. |
| 405 | Lidl | `specs/batch-21/405-lidl.md` | Build an original mobile product inspired by Lidl's public product and policy materials. |
| 406 | Wegmans | `specs/batch-21/406-wegmans.md` | Build an original mobile product inspired by Wegmans's public product and policy materials. |
| 407 | Food Lion | `specs/batch-21/407-food-lion.md` | Build an original mobile product inspired by Food Lion's public product and policy materials. |
| 408 | Giant Eagle | `specs/batch-21/408-giant-eagle.md` | Build an original mobile product inspired by Giant Eagle's public product and policy materials. |
| 409 | Stop & Shop | `specs/batch-21/409-stop-and-shop.md` | Build an original mobile product inspired by Stop & Shop's public product and policy materials. |
| 410 | ShopRite | `specs/batch-21/410-shoprite.md` | Build an original mobile product inspired by ShopRite's public product and policy materials. |
| 411 | FreshDirect | `specs/batch-21/411-freshdirect.md` | Build an original mobile product inspired by FreshDirect's public product and policy materials. |
| 412 | Misfits Market | `specs/batch-21/412-misfits-market.md` | Build an original mobile product inspired by Misfits Market's public product and policy materials. |
| 413 | Thrive Market | `specs/batch-21/413-thrive-market.md` | Build an original mobile product inspired by Thrive Market's public product and policy materials. |
| 414 | Ocado | `specs/batch-21/414-ocado.md` | Build an original mobile product inspired by Ocado's public product and policy materials. |
| 415 | Carrefour | `specs/batch-21/415-carrefour.md` | Build an original mobile product inspired by Carrefour's public product and policy materials. |
| 416 | Tesco | `specs/batch-21/416-tesco.md` | Build an original mobile product inspired by Tesco's public product and policy materials. |
| 417 | Sainsbury's | `specs/batch-21/417-sainsbury-s.md` | Build an original mobile product inspired by Sainsbury's's public product and policy materials. |
| 418 | Grubhub | `specs/batch-21/418-grubhub.md` | Build an original mobile product inspired by Grubhub's public product and policy materials. |
| 419 | Gopuff | `specs/batch-21/419-gopuff.md` | Build an original mobile product inspired by Gopuff's public product and policy materials. |
| 420 | Deliveroo | `specs/batch-21/420-deliveroo.md` | Build an original mobile product inspired by Deliveroo's public product and policy materials. |
| 421 | Just Eat | `specs/batch-22/421-just-eat.md` | Build an original mobile product inspired by Just Eat's public product and policy materials. |
| 422 | Glovo | `specs/batch-22/422-glovo.md` | Build an original mobile product inspired by Glovo's public product and policy materials. |
| 423 | Bolt Food | `specs/batch-22/423-bolt-food.md` | Build an original mobile product inspired by Bolt Food's public product and policy materials. |
| 424 | foodpanda | `specs/batch-22/424-foodpanda.md` | Build an original mobile product inspired by foodpanda's public product and policy materials. |
| 425 | Swiggy | `specs/batch-22/425-swiggy.md` | Build an original mobile product inspired by Swiggy's public product and policy materials. |
| 426 | Zomato | `specs/batch-22/426-zomato.md` | Build an original mobile product inspired by Zomato's public product and policy materials. |
| 427 | Rappi | `specs/batch-22/427-rappi.md` | Build an original mobile product inspired by Rappi's public product and policy materials. |
| 428 | Grab | `specs/batch-22/428-grab.md` | Build an original mobile product inspired by Grab's public product and policy materials. |
| 429 | Gojek | `specs/batch-22/429-gojek.md` | Build an original mobile product inspired by Gojek's public product and policy materials. |
| 430 | DiDi Food | `specs/batch-22/430-didi-food.md` | Build an original mobile product inspired by DiDi Food's public product and policy materials. |
| 431 | Meituan | `specs/batch-22/431-meituan.md` | Build an original mobile product inspired by Meituan's public product and policy materials. |
| 432 | Ele.me | `specs/batch-22/432-ele-me.md` | Build an original mobile product inspired by Ele.me's public product and policy materials. |
| 433 | Deliveroo Rider | `specs/batch-22/433-deliveroo-rider.md` | Build an original mobile product inspired by Deliveroo Rider's public product and policy materials. |
| 434 | DoorDash Dasher | `specs/batch-22/434-doordash-dasher.md` | Build an original mobile product inspired by DoorDash Dasher's public product and policy materials. |
| 435 | Uber Driver | `specs/batch-22/435-uber-driver.md` | Build an original mobile product inspired by Uber Driver's public product and policy materials. |
| 436 | Instacart Shopper | `specs/batch-22/436-instacart-shopper.md` | Build an original mobile product inspired by Instacart Shopper's public product and policy materials. |
| 437 | Shipt | `specs/batch-22/437-shipt.md` | Build an original mobile product inspired by Shipt's public product and policy materials. |
| 438 | Favor | `specs/batch-22/438-favor.md` | Build an original mobile product inspired by Favor's public product and policy materials. |
| 439 | SkipTheDishes | `specs/batch-22/439-skipthedishes.md` | Build an original mobile product inspired by SkipTheDishes's public product and policy materials. |
| 440 | Talabat | `specs/batch-22/440-talabat.md` | Build an original mobile product inspired by Talabat's public product and policy materials. |
| 441 | Mr D Food | `specs/batch-23/441-mr-d-food.md` | Build an original mobile product inspired by Mr D Food's public product and policy materials. |
| 442 | Best Buy | `specs/batch-23/442-best-buy.md` | Build an original mobile product inspired by Best Buy's public product and policy materials. |
| 443 | Home Depot | `specs/batch-23/443-home-depot.md` | Build an original mobile product inspired by Home Depot's public product and policy materials. |
| 444 | Lowe's | `specs/batch-23/444-lowe-s.md` | Build an original mobile product inspired by Lowe's's public product and policy materials. |
| 445 | IKEA | `specs/batch-23/445-ikea.md` | Build an original mobile product inspired by IKEA's public product and policy materials. |
| 446 | Wayfair | `specs/batch-23/446-wayfair.md` | Build an original mobile product inspired by Wayfair's public product and policy materials. |
| 447 | Kohl's | `specs/batch-23/447-kohl-s.md` | Build an original mobile product inspired by Kohl's's public product and policy materials. |
| 448 | Macy's | `specs/batch-23/448-macy-s.md` | Build an original mobile product inspired by Macy's's public product and policy materials. |
| 449 | Nordstrom | `specs/batch-23/449-nordstrom.md` | Build an original mobile product inspired by Nordstrom's public product and policy materials. |
| 450 | Sephora | `specs/batch-23/450-sephora.md` | Build an original mobile product inspired by Sephora's public product and policy materials. |
| 451 | Ulta Beauty | `specs/batch-23/451-ulta-beauty.md` | Build an original mobile product inspired by Ulta Beauty's public product and policy materials. |
| 452 | Nike | `specs/batch-23/452-nike.md` | Build an original mobile product inspired by Nike's public product and policy materials. |
| 453 | Adidas | `specs/batch-23/453-adidas.md` | Build an original mobile product inspired by Adidas's public product and policy materials. |
| 454 | Zara | `specs/batch-23/454-zara.md` | Build an original mobile product inspired by Zara's public product and policy materials. |
| 455 | H&M | `specs/batch-23/455-handm.md` | Build an original mobile product inspired by H&M's public product and policy materials. |
| 456 | Uniqlo | `specs/batch-23/456-uniqlo.md` | Build an original mobile product inspired by Uniqlo's public product and policy materials. |
| 457 | Lululemon | `specs/batch-23/457-lululemon.md` | Build an original mobile product inspired by Lululemon's public product and policy materials. |
| 458 | GOAT | `specs/batch-23/458-goat.md` | Build an original mobile product inspired by GOAT's public product and policy materials. |
| 459 | Grailed | `specs/batch-23/459-grailed.md` | Build an original mobile product inspired by Grailed's public product and policy materials. |
| 460 | Mercari | `specs/batch-23/460-mercari.md` | Build an original mobile product inspired by Mercari's public product and policy materials. |
| 461 | Vinted | `specs/batch-24/461-vinted.md` | Build an original mobile product inspired by Vinted's public product and policy materials. |
| 462 | OfferUp | `specs/batch-24/462-offerup.md` | Build an original mobile product inspired by OfferUp's public product and policy materials. |
| 463 | Craigslist | `specs/batch-24/463-craigslist.md` | Build an original mobile product inspired by Craigslist's public product and policy materials. |
| 464 | AliExpress | `specs/batch-24/464-aliexpress.md` | Build an original mobile product inspired by AliExpress's public product and policy materials. |
| 465 | Wish | `specs/batch-24/465-wish.md` | Build an original mobile product inspired by Wish's public product and policy materials. |
| 466 | Lazada | `specs/batch-24/466-lazada.md` | Build an original mobile product inspired by Lazada's public product and policy materials. |
| 467 | Shopee | `specs/batch-24/467-shopee.md` | Build an original mobile product inspired by Shopee's public product and policy materials. |
| 468 | Flipkart | `specs/batch-24/468-flipkart.md` | Build an original mobile product inspired by Flipkart's public product and policy materials. |
| 469 | Myntra | `specs/batch-24/469-myntra.md` | Build an original mobile product inspired by Myntra's public product and policy materials. |
| 470 | Rakuten | `specs/batch-24/470-rakuten.md` | Build an original mobile product inspired by Rakuten's public product and policy materials. |
| 471 | Newegg | `specs/batch-24/471-newegg.md` | Build an original mobile product inspired by Newegg's public product and policy materials. |
| 472 | Chase Mobile | `specs/batch-24/472-chase-mobile.md` | Build an original mobile product inspired by Chase Mobile's public product and policy materials. |
| 473 | Bank of America Mobile Banking | `specs/batch-24/473-bank-of-america-mobile-banking.md` | Build an original mobile product inspired by Bank of America Mobile Banking's public product and policy materials. |
| 474 | Wells Fargo Mobile | `specs/batch-24/474-wells-fargo-mobile.md` | Build an original mobile product inspired by Wells Fargo Mobile's public product and policy materials. |
| 475 | Citi Mobile | `specs/batch-24/475-citi-mobile.md` | Build an original mobile product inspired by Citi Mobile's public product and policy materials. |
| 476 | Capital One Mobile | `specs/batch-24/476-capital-one-mobile.md` | Build an original mobile product inspired by Capital One Mobile's public product and policy materials. |
| 477 | American Express | `specs/batch-24/477-american-express.md` | Build an original mobile product inspired by American Express's public product and policy materials. |
| 478 | Discover Mobile | `specs/batch-24/478-discover-mobile.md` | Build an original mobile product inspired by Discover Mobile's public product and policy materials. |
| 479 | U.S. Bank | `specs/batch-24/479-u-s-bank.md` | Build an original mobile product inspired by U.S. |
| 480 | PNC Mobile | `specs/batch-24/480-pnc-mobile.md` | Build an original mobile product inspired by PNC Mobile's public product and policy materials. |
| 481 | TD Bank | `specs/batch-25/481-td-bank.md` | Build an original mobile product inspired by TD Bank's public product and policy materials. |
| 482 | Truist | `specs/batch-25/482-truist.md` | Build an original mobile product inspired by Truist's public product and policy materials. |
| 483 | USAA | `specs/batch-25/483-usaa.md` | Build an original mobile product inspired by USAA's public product and policy materials. |
| 484 | Navy Federal Credit Union | `specs/batch-25/484-navy-federal-credit-union.md` | Build an original mobile product inspired by Navy Federal Credit Union's public product and policy materials. |
| 485 | SoFi | `specs/batch-25/485-sofi.md` | Build an original mobile product inspired by SoFi's public product and policy materials. |
| 486 | Ally | `specs/batch-25/486-ally.md` | Build an original mobile product inspired by Ally's public product and policy materials. |
| 487 | Marcus | `specs/batch-25/487-marcus.md` | Build an original mobile product inspired by Marcus's public product and policy materials. |
| 488 | Fidelity | `specs/batch-25/488-fidelity.md` | Build an original mobile product inspired by Fidelity's public product and policy materials. |
| 489 | Schwab Mobile | `specs/batch-25/489-schwab-mobile.md` | Build an original mobile product inspired by Schwab Mobile's public product and policy materials. |
| 490 | E*TRADE | `specs/batch-25/490-e-trade.md` | Build an original mobile product inspired by E*TRADE's public product and policy materials. |
| 491 | Webull | `specs/batch-25/491-webull.md` | Build an original mobile product inspired by Webull's public product and policy materials. |
| 492 | moomoo | `specs/batch-25/492-moomoo.md` | Build an original mobile product inspired by moomoo's public product and policy materials. |
| 493 | Interactive Brokers | `specs/batch-25/493-interactive-brokers.md` | Build an original mobile product inspired by Interactive Brokers's public product and policy materials. |
| 494 | Vanguard | `specs/batch-25/494-vanguard.md` | Build an original mobile product inspired by Vanguard's public product and policy materials. |
| 495 | Monzo | `specs/batch-25/495-monzo.md` | Build an original mobile product inspired by Monzo's public product and policy materials. |
| 496 | N26 | `specs/batch-25/496-n26.md` | Build an original mobile product inspired by N26's public product and policy materials. |
| 497 | Starling Bank | `specs/batch-25/497-starling-bank.md` | Build an original mobile product inspired by Starling Bank's public product and policy materials. |
| 498 | Skrill | `specs/batch-25/498-skrill.md` | Build an original mobile product inspired by Skrill's public product and policy materials. |
| 499 | Neteller | `specs/batch-25/499-neteller.md` | Build an original mobile product inspired by Neteller's public product and policy materials. |
| 500 | Remitly | `specs/batch-25/500-remitly.md` | Build an original mobile product inspired by Remitly's public product and policy materials. |
| 501 | WorldRemit | `specs/batch-26/501-worldremit.md` | Build an original mobile product inspired by WorldRemit's public product, support, policy, and marketplace materials. |
| 502 | Western Union | `specs/batch-26/502-western-union.md` | Build an original mobile product inspired by Western Union's public product, support, policy, and marketplace materials. |
| 503 | MoneyGram | `specs/batch-26/503-moneygram.md` | Build an original mobile product inspired by MoneyGram's public product, support, policy, and marketplace materials. |
| 504 | Xoom | `specs/batch-26/504-xoom.md` | Build an original mobile product inspired by Xoom's public product, support, policy, and marketplace materials. |
| 505 | Crypto.com | `specs/batch-26/505-crypto-com.md` | Build an original mobile product inspired by Crypto.com's public product, support, policy, and marketplace materials. |
| 506 | Binance | `specs/batch-26/506-binance.md` | Build an original mobile product inspired by Binance's public product, support, policy, and marketplace materials. |
| 507 | Kraken | `specs/batch-26/507-kraken.md` | Build an original mobile product inspired by Kraken's public product, support, policy, and marketplace materials. |
| 508 | Gemini Crypto | `specs/batch-26/508-gemini-crypto.md` | Build an original mobile product inspired by Gemini Crypto's public product, support, policy, and marketplace materials. |
| 509 | Phantom | `specs/batch-26/509-phantom.md` | Build an original mobile product inspired by Phantom's public product, support, policy, and marketplace materials. |
| 510 | MetaMask | `specs/batch-26/510-metamask.md` | Build an original mobile product inspired by MetaMask's public product, support, policy, and marketplace materials. |
| 511 | Trust Wallet | `specs/batch-26/511-trust-wallet.md` | Build an original mobile product inspired by Trust Wallet's public product, support, policy, and marketplace materials. |
| 512 | Exodus | `specs/batch-26/512-exodus.md` | Build an original mobile product inspired by Exodus's public product, support, policy, and marketplace materials. |
| 513 | Ledger Live | `specs/batch-26/513-ledger-live.md` | Build an original mobile product inspired by Ledger Live's public product, support, policy, and marketplace materials. |
| 514 | MoonPay | `specs/batch-26/514-moonpay.md` | Build an original mobile product inspired by MoonPay's public product, support, policy, and marketplace materials. |
| 515 | Strike | `specs/batch-26/515-strike.md` | Build an original mobile product inspired by Strike's public product, support, policy, and marketplace materials. |
| 516 | Current | `specs/batch-26/516-current.md` | Build an original mobile product inspired by Current's public product, support, policy, and marketplace materials. |
| 517 | Dave | `specs/batch-26/517-dave.md` | Build an original mobile product inspired by Dave's public product, support, policy, and marketplace materials. |
| 518 | Empower | `specs/batch-26/518-empower.md` | Build an original mobile product inspired by Empower's public product, support, policy, and marketplace materials. |
| 519 | EarnIn | `specs/batch-26/519-earnin.md` | Build an original mobile product inspired by EarnIn's public product, support, policy, and marketplace materials. |
| 520 | Klarna | `specs/batch-26/520-klarna.md` | Build an original mobile product inspired by Klarna's public product, support, policy, and marketplace materials. |
| 521 | Afterpay | `specs/batch-27/521-afterpay.md` | Build an original mobile product inspired by Afterpay's public product, support, policy, and marketplace materials. |
| 522 | Affirm | `specs/batch-27/522-affirm.md` | Build an original mobile product inspired by Affirm's public product, support, policy, and marketplace materials. |
| 523 | Delta | `specs/batch-27/523-delta.md` | Build an original mobile product inspired by Delta Air Lines's public product, support, policy, and marketplace materials. |
| 524 | United Airlines | `specs/batch-27/524-united-airlines.md` | Build an original mobile product inspired by United Airlines's public product, support, policy, and marketplace materials. |
| 525 | American Airlines | `specs/batch-27/525-american-airlines.md` | Build an original mobile product inspired by American Airlines's public product, support, policy, and marketplace materials. |
| 526 | Southwest Airlines | `specs/batch-27/526-southwest-airlines.md` | Build an original mobile product inspired by Southwest Airlines's public product, support, policy, and marketplace materials. |
| 527 | JetBlue | `specs/batch-27/527-jetblue.md` | Build an original mobile product inspired by JetBlue's public product, support, policy, and marketplace materials. |
| 528 | Alaska Airlines | `specs/batch-27/528-alaska-airlines.md` | Build an original mobile product inspired by Alaska Airlines's public product, support, policy, and marketplace materials. |
| 529 | Spirit Airlines | `specs/batch-27/529-spirit-airlines.md` | Build an original mobile product inspired by Spirit Airlines's public product, support, policy, and marketplace materials. |
| 530 | Frontier Airlines | `specs/batch-27/530-frontier-airlines.md` | Build an original mobile product inspired by Frontier Airlines's public product, support, policy, and marketplace materials. |
| 531 | Hawaiian Airlines | `specs/batch-27/531-hawaiian-airlines.md` | Build an original mobile product inspired by Hawaiian Airlines's public product, support, policy, and marketplace materials. |
| 532 | Air Canada | `specs/batch-27/532-air-canada.md` | Build an original mobile product inspired by Air Canada's public product, support, policy, and marketplace materials. |
| 533 | British Airways | `specs/batch-27/533-british-airways.md` | Build an original mobile product inspired by British Airways's public product, support, policy, and marketplace materials. |
| 534 | Lufthansa | `specs/batch-27/534-lufthansa.md` | Build an original mobile product inspired by Lufthansa's public product, support, policy, and marketplace materials. |
| 535 | Air France | `specs/batch-27/535-air-france.md` | Build an original mobile product inspired by Air France's public product, support, policy, and marketplace materials. |
| 536 | KLM | `specs/batch-27/536-klm.md` | Build an original mobile product inspired by KLM's public product, support, policy, and marketplace materials. |
| 537 | Emirates | `specs/batch-27/537-emirates.md` | Build an original mobile product inspired by Emirates's public product, support, policy, and marketplace materials. |
| 538 | Qatar Airways | `specs/batch-27/538-qatar-airways.md` | Build an original mobile product inspired by Qatar Airways's public product, support, policy, and marketplace materials. |
| 539 | Singapore Airlines | `specs/batch-27/539-singapore-airlines.md` | Build an original mobile product inspired by Singapore Airlines's public product, support, policy, and marketplace materials. |
| 540 | Turkish Airlines | `specs/batch-27/540-turkish-airlines.md` | Build an original mobile product inspired by Turkish Airlines's public product, support, policy, and marketplace materials. |
| 541 | Ryanair | `specs/batch-28/541-ryanair.md` | Build an original mobile product inspired by Ryanair's public product, support, policy, and marketplace materials. |
| 542 | easyJet | `specs/batch-28/542-easyjet.md` | Build an original mobile product inspired by easyJet's public product, support, policy, and marketplace materials. |
| 543 | Wizz Air | `specs/batch-28/543-wizz-air.md` | Build an original mobile product inspired by Wizz Air's public product, support, policy, and marketplace materials. |
| 544 | ANA | `specs/batch-28/544-ana.md` | Build an original mobile product inspired by ANA's public product, support, policy, and marketplace materials. |
| 545 | JAL | `specs/batch-28/545-jal.md` | Build an original mobile product inspired by JAL's public product, support, policy, and marketplace materials. |
| 546 | Cathay Pacific | `specs/batch-28/546-cathay-pacific.md` | Build an original mobile product inspired by Cathay Pacific's public product, support, policy, and marketplace materials. |
| 547 | Marriott Bonvoy | `specs/batch-28/547-marriott-bonvoy.md` | Build an original mobile product inspired by Marriott Bonvoy's public product, support, policy, and marketplace materials. |
| 548 | Hilton Honors | `specs/batch-28/548-hilton-honors.md` | Build an original mobile product inspired by Hilton Honors's public product, support, policy, and marketplace materials. |
| 549 | Hyatt | `specs/batch-28/549-hyatt.md` | Build an original mobile product inspired by Hyatt's public product, support, policy, and marketplace materials. |
| 550 | IHG One Rewards | `specs/batch-28/550-ihg-one-rewards.md` | Build an original mobile product inspired by IHG One Rewards's public product, support, policy, and marketplace materials. |
| 551 | Wyndham Hotels | `specs/batch-28/551-wyndham-hotels.md` | Build an original mobile product inspired by Wyndham Hotels's public product, support, policy, and marketplace materials. |
| 552 | Choice Hotels | `specs/batch-28/552-choice-hotels.md` | Build an original mobile product inspired by Choice Hotels's public product, support, policy, and marketplace materials. |
| 553 | Accor ALL | `specs/batch-28/553-accor-all.md` | Build an original mobile product inspired by Accor ALL's public product, support, policy, and marketplace materials. |
| 554 | Hotels.com | `specs/batch-28/554-hotels-com.md` | Build an original mobile product inspired by Hotels.com's public product, support, policy, and marketplace materials. |
| 555 | Vrbo | `specs/batch-28/555-vrbo.md` | Build an original mobile product inspired by Vrbo's public product, support, policy, and marketplace materials. |
| 556 | Hostelworld | `specs/batch-28/556-hostelworld.md` | Build an original mobile product inspired by Hostelworld's public product, support, policy, and marketplace materials. |
| 557 | Couchsurfing | `specs/batch-28/557-couchsurfing.md` | Build an original mobile product inspired by Couchsurfing's public product, support, policy, and marketplace materials. |
| 558 | Klook | `specs/batch-28/558-klook.md` | Build an original mobile product inspired by Klook's public product, support, policy, and marketplace materials. |
| 559 | GetYourGuide | `specs/batch-28/559-getyourguide.md` | Build an original mobile product inspired by GetYourGuide's public product, support, policy, and marketplace materials. |
| 560 | Viator | `specs/batch-28/560-viator.md` | Build an original mobile product inspired by Viator's public product, support, policy, and marketplace materials. |
| 561 | Tripadvisor | `specs/batch-29/561-tripadvisor.md` | Build an original mobile product inspired by Tripadvisor's public user-facing workflow. |
| 562 | Rome2Rio | `specs/batch-29/562-rome2rio.md` | Build an original mobile product inspired by Rome2Rio's public user-facing workflow. |
| 563 | Skyscanner | `specs/batch-29/563-skyscanner.md` | Build an original mobile product inspired by Skyscanner's public user-facing workflow. |
| 564 | KAYAK | `specs/batch-29/564-kayak.md` | Build an original mobile product inspired by KAYAK's public user-facing workflow. |
| 565 | momondo | `specs/batch-29/565-momondo.md` | Build an original mobile product inspired by momondo's public user-facing workflow. |
| 566 | Priceline | `specs/batch-29/566-priceline.md` | Build an original mobile product inspired by Priceline's public user-facing workflow. |
| 567 | Agoda | `specs/batch-29/567-agoda.md` | Build an original mobile product inspired by Agoda's public user-facing workflow. |
| 568 | trivago | `specs/batch-29/568-trivago.md` | Build an original mobile product inspired by trivago's public user-facing workflow. |
| 569 | HotelTonight | `specs/batch-29/569-hoteltonight.md` | Build an original mobile product inspired by HotelTonight's public user-facing workflow. |
| 570 | Roadtrippers | `specs/batch-29/570-roadtrippers.md` | Build an original mobile product inspired by Roadtrippers's public user-facing workflow. |
| 571 | Transit | `specs/batch-29/571-transit.md` | Build an original mobile product inspired by Transit's public user-facing workflow. |
| 572 | Citymapper | `specs/batch-29/572-citymapper.md` | Build an original mobile product inspired by Citymapper's public user-facing workflow. |
| 573 | Moovit | `specs/batch-29/573-moovit.md` | Build an original mobile product inspired by Moovit's public user-facing workflow. |
| 574 | Curb | `specs/batch-29/574-curb.md` | Build an original mobile product inspired by Curb's public user-facing workflow. |
| 575 | Via | `specs/batch-29/575-via.md` | Build an original mobile product inspired by Via's public user-facing workflow. |
| 576 | Bolt | `specs/batch-29/576-bolt.md` | Build an original mobile product inspired by Bolt's public user-facing workflow. |
| 577 | FREE NOW | `specs/batch-29/577-free-now.md` | Build an original mobile product inspired by FREE NOW's public user-facing workflow. |
| 578 | BlaBlaCar | `specs/batch-29/578-blablacar.md` | Build an original mobile product inspired by BlaBlaCar's public user-facing workflow. |
| 579 | Zipcar | `specs/batch-29/579-zipcar.md` | Build an original mobile product inspired by Zipcar's public user-facing workflow. |
| 580 | Getaround | `specs/batch-29/580-getaround.md` | Build an original mobile product inspired by Getaround's public user-facing workflow. |
| 581 | Enterprise Rent-A-Car | `specs/batch-30/581-enterprise-rent-a-car.md` | Build an original mobile product inspired by Enterprise Rent-A-Car's public user-facing workflow. |
| 582 | Hertz | `specs/batch-30/582-hertz.md` | Build an original mobile product inspired by Hertz's public user-facing workflow. |
| 583 | Avis | `specs/batch-30/583-avis.md` | Build an original mobile product inspired by Avis's public user-facing workflow. |
| 584 | SpotHero | `specs/batch-30/584-spothero.md` | Build an original mobile product inspired by SpotHero's public user-facing workflow. |
| 585 | ParkMobile | `specs/batch-30/585-parkmobile.md` | Build an original mobile product inspired by ParkMobile's public user-facing workflow. |
| 586 | Passport Parking | `specs/batch-30/586-passport-parking.md` | Build an original mobile product inspired by Passport Parking's public user-facing workflow. |
| 587 | PlugShare | `specs/batch-30/587-plugshare.md` | Build an original mobile product inspired by PlugShare's public user-facing workflow. |
| 588 | ChargePoint | `specs/batch-30/588-chargepoint.md` | Build an original mobile product inspired by ChargePoint's public user-facing workflow. |
| 589 | Electrify America | `specs/batch-30/589-electrify-america.md` | Build an original mobile product inspired by Electrify America's public user-facing workflow. |
| 590 | Tesla | `specs/batch-30/590-tesla.md` | Build an original mobile product inspired by Tesla's public user-facing workflow. |
| 591 | FordPass | `specs/batch-30/591-fordpass.md` | Build an original mobile product inspired by FordPass's public user-facing workflow. |
| 592 | myChevrolet | `specs/batch-30/592-mychevrolet.md` | Build an original mobile product inspired by myChevrolet's public user-facing workflow. |
| 593 | Toyota | `specs/batch-30/593-toyota.md` | Build an original mobile product inspired by Toyota's public user-facing workflow. |
| 594 | Hyundai Bluelink | `specs/batch-30/594-hyundai-bluelink.md` | Build an original mobile product inspired by Hyundai Bluelink's public user-facing workflow. |
| 595 | BMW | `specs/batch-30/595-bmw.md` | Build an original mobile product inspired by BMW's public user-facing workflow. |
| 596 | Mercedes me | `specs/batch-30/596-mercedes-me.md` | Build an original mobile product inspired by Mercedes me's public user-facing workflow. |
| 597 | Gaia GPS | `specs/batch-30/597-gaia-gps.md` | Build an original mobile product inspired by Gaia GPS's public user-facing workflow. |
| 598 | onX Hunt | `specs/batch-30/598-onx-hunt.md` | Build an original mobile product inspired by onX Hunt's public user-facing workflow. |
| 599 | Trailforks | `specs/batch-30/599-trailforks.md` | Build an original mobile product inspired by Trailforks's public user-facing workflow. |
| 600 | Wikiloc | `specs/batch-30/600-wikiloc.md` | Build an original mobile product inspired by Wikiloc's public user-facing workflow. |
| 601 | PeakVisor | `specs/batch-31/601-peakvisor.md` | Build an original mobile product inspired by PeakVisor's public user-facing workflow. |
| 602 | Windy | `specs/batch-31/602-windy.md` | Build an original mobile product inspired by Windy's public user-facing workflow. |
| 603 | The Weather Channel | `specs/batch-31/603-the-weather-channel.md` | Build an original mobile product inspired by The Weather Channel's public user-facing workflow. |
| 604 | AccuWeather | `specs/batch-31/604-accuweather.md` | Build an original mobile product inspired by AccuWeather's public user-facing workflow. |
| 605 | WeatherBug | `specs/batch-31/605-weatherbug.md` | Build an original mobile product inspired by WeatherBug's public user-facing workflow. |
| 606 | CARROT Weather | `specs/batch-31/606-carrot-weather.md` | Build an original mobile product inspired by CARROT Weather's public user-facing workflow. |
| 607 | MyRadar | `specs/batch-31/607-myradar.md` | Build an original mobile product inspired by MyRadar's public user-facing workflow. |
| 608 | NOAA Weather Radar | `specs/batch-31/608-noaa-weather-radar.md` | Build an original mobile product inspired by NOAA Weather Radar's public user-facing workflow. |
| 609 | Ventusky | `specs/batch-31/609-ventusky.md` | Build an original mobile product inspired by Ventusky's public user-facing workflow. |
| 610 | Surfline | `specs/batch-31/610-surfline.md` | Build an original mobile product inspired by Surfline's public user-facing workflow. |
| 611 | Fishbrain | `specs/batch-31/611-fishbrain.md` | Build an original mobile product inspired by Fishbrain's public user-facing workflow. |
| 612 | Navionics | `specs/batch-31/612-navionics.md` | Build an original mobile product inspired by Navionics's public user-facing workflow. |
| 613 | MarineTraffic | `specs/batch-31/613-marinetraffic.md` | Build an original mobile product inspired by MarineTraffic's public user-facing workflow. |
| 614 | Flightradar24 | `specs/batch-31/614-flightradar24.md` | Build an original mobile product inspired by Flightradar24's public user-facing workflow. |
| 615 | FlightAware | `specs/batch-31/615-flightaware.md` | Build an original mobile product inspired by FlightAware's public user-facing workflow. |
| 616 | GasBuddy | `specs/batch-31/616-gasbuddy.md` | Build an original mobile product inspired by GasBuddy's public user-facing workflow. |
| 617 | Homes.com | `specs/batch-31/617-homes-com.md` | Build an original mobile product inspired by Homes.com's public user-facing workflow. |
| 618 | Trulia | `specs/batch-31/618-trulia.md` | Build an original mobile product inspired by Trulia's public user-facing workflow. |
| 619 | HotPads | `specs/batch-31/619-hotpads.md` | Build an original mobile product inspired by HotPads's public user-facing workflow. |
| 620 | Rent.com | `specs/batch-31/620-rent-com.md` | Build an original mobile product inspired by Rent.com's public user-facing workflow. |
| 621 | Apartment List | `specs/batch-32/621-apartment-list.md` | Build an original mobile product inspired by Apartment List's public user-facing workflow. |
| 622 | StreetEasy | `specs/batch-32/622-streeteasy.md` | Build an original mobile product inspired by StreetEasy's public user-facing workflow. |
| 623 | LoopNet | `specs/batch-32/623-loopnet.md` | Build an original mobile product inspired by LoopNet's public user-facing workflow. |
| 624 | Redfin Rentals | `specs/batch-32/624-redfin-rentals.md` | Build an original mobile product inspired by Redfin Rentals's public user-facing workflow. |
| 625 | Zillow Rentals | `specs/batch-32/625-zillow-rentals.md` | Build an original mobile product inspired by Zillow Rentals's public user-facing workflow. |
| 626 | Houzz | `specs/batch-32/626-houzz.md` | Build an original mobile product inspired by Houzz's public user-facing workflow. |
| 627 | Angi | `specs/batch-32/627-angi.md` | Build an original mobile product inspired by Angi's public user-facing workflow. |
| 628 | Thumbtack | `specs/batch-32/628-thumbtack.md` | Build an original mobile product inspired by Thumbtack's public user-facing workflow. |
| 629 | Taskrabbit | `specs/batch-32/629-taskrabbit.md` | Build an original mobile product inspired by Taskrabbit's public user-facing workflow. |
| 630 | Handy | `specs/batch-32/630-handy.md` | Build an original mobile product inspired by Handy's public user-facing workflow. |
| 631 | Thumbtack Pro | `specs/batch-32/631-thumbtack-pro.md` | Build an original mobile product inspired by Thumbtack Pro's public user-facing workflow. |
| 632 | Porch | `specs/batch-32/632-porch.md` | Build an original mobile product inspired by Porch's public user-facing workflow. |
| 633 | Build.com | `specs/batch-32/633-build-com.md` | Build an original mobile product inspired by Build.com's public user-facing workflow. |
| 634 | Floor & Decor | `specs/batch-32/634-floor-and-decor.md` | Build an original mobile product inspired by Floor & Decor's public user-facing workflow. |
| 635 | Google Home | `specs/batch-32/635-google-home.md` | Build an original mobile product inspired by Google Home's public user-facing workflow. |
| 636 | Amazon Alexa | `specs/batch-32/636-amazon-alexa.md` | Build an original mobile product inspired by Amazon Alexa's public user-facing workflow. |
| 637 | Apple Home | `specs/batch-32/637-apple-home.md` | Build an original mobile product inspired by Apple Home's public user-facing workflow. |
| 638 | Samsung SmartThings | `specs/batch-32/638-samsung-smartthings.md` | Build an original mobile product inspired by Samsung SmartThings's public user-facing workflow. |
| 639 | Philips Hue | `specs/batch-32/639-philips-hue.md` | Build an original mobile product inspired by Philips Hue's public user-facing workflow. |
| 640 | Wyze | `specs/batch-32/640-wyze.md` | Build an original mobile product inspired by Wyze's public user-facing workflow. |
| 641 | Arlo Secure | `specs/batch-33/641-arlo-secure.md` | Build an original mobile product inspired by Arlo Secure's public smart-home security and device-control workflow. |
| 642 | Nest | `specs/batch-33/642-nest.md` | Build an original mobile product inspired by Nest's public smart-home security and device-control workflow. |
| 643 | Eufy Security | `specs/batch-33/643-eufy-security.md` | Build an original mobile product inspired by Eufy Security's public smart-home security and device-control workflow. |
| 644 | TP-Link Tapo | `specs/batch-33/644-tp-link-tapo.md` | Build an original mobile product inspired by TP-Link Tapo's public smart-home security and device-control workflow. |
| 645 | Kasa Smart | `specs/batch-33/645-kasa-smart.md` | Build an original mobile product inspired by Kasa Smart's public smart-home security and device-control workflow. |
| 646 | Smart Life | `specs/batch-33/646-smart-life.md` | Build an original mobile product inspired by Smart Life's public smart-home security and device-control workflow. |
| 647 | Tuya Smart | `specs/batch-33/647-tuya-smart.md` | Build an original mobile product inspired by Tuya Smart's public smart-home security and device-control workflow. |
| 648 | eWeLink | `specs/batch-33/648-ewelink.md` | Build an original mobile product inspired by eWeLink's public smart-home security and device-control workflow. |
| 649 | August Home | `specs/batch-33/649-august-home.md` | Build an original mobile product inspired by August Home's public smart-home security and device-control workflow. |
| 650 | Yale Access | `specs/batch-33/650-yale-access.md` | Build an original mobile product inspired by Yale Access's public smart-home security and device-control workflow. |
| 651 | Ecobee | `specs/batch-33/651-ecobee.md` | Build an original mobile product inspired by Ecobee's public smart-home security and device-control workflow. |
| 652 | Honeywell Home | `specs/batch-33/652-honeywell-home.md` | Build an original mobile product inspired by Honeywell Home's public smart-home security and device-control workflow. |
| 653 | myQ | `specs/batch-33/653-myq.md` | Build an original mobile product inspired by myQ's public smart-home security and device-control workflow. |
| 654 | SimpliSafe | `specs/batch-33/654-simplisafe.md` | Build an original mobile product inspired by SimpliSafe's public smart-home security and device-control workflow. |
| 655 | ADT Control | `specs/batch-33/655-adt-control.md` | Build an original mobile product inspired by ADT Control's public smart-home security and device-control workflow. |
| 656 | Vivint | `specs/batch-33/656-vivint.md` | Build an original mobile product inspired by Vivint's public smart-home security and device-control workflow. |
| 657 | Blink Home Monitor | `specs/batch-33/657-blink-home-monitor.md` | Build an original mobile product inspired by Blink Home Monitor's public smart-home security and device-control workflow. |
| 658 | MyChart | `specs/batch-33/658-mychart.md` | Build an original mobile product inspired by MyChart's public health, pharmacy, patient, or clinician workflow. |
| 659 | Doximity | `specs/batch-33/659-doximity.md` | Build an original mobile product inspired by Doximity's public health, pharmacy, patient, or clinician workflow. |
| 660 | CVS Health | `specs/batch-33/660-cvs-health.md` | Build an original mobile product inspired by CVS Health's public health, pharmacy, patient, or clinician workflow. |
| 661 | Express Scripts | `specs/batch-34/661-express-scripts.md` | Build an original mobile product inspired by Express Scripts's public health and medical workflow. |
| 662 | Amwell | `specs/batch-34/662-amwell.md` | Build an original mobile product inspired by Amwell's public health and medical workflow. |
| 663 | MDLIVE | `specs/batch-34/663-mdlive.md` | Build an original mobile product inspired by MDLIVE's public health and medical workflow. |
| 664 | Doctor On Demand | `specs/batch-34/664-doctor-on-demand.md` | Build an original mobile product inspired by Doctor On Demand's public health and medical workflow. |
| 665 | HealthTap | `specs/batch-34/665-healthtap.md` | Build an original mobile product inspired by HealthTap's public health and medical workflow. |
| 666 | One Medical | `specs/batch-34/666-one-medical.md` | Build an original mobile product inspired by One Medical's public health and medical workflow. |
| 667 | Carbon Health | `specs/batch-34/667-carbon-health.md` | Build an original mobile product inspired by Carbon Health's public health and medical workflow. |
| 668 | Nurx | `specs/batch-34/668-nurx.md` | Build an original mobile product inspired by Nurx's public health and medical workflow. |
| 669 | Maven Clinic | `specs/batch-34/669-maven-clinic.md` | Build an original mobile product inspired by Maven Clinic's public health and medical workflow. |
| 670 | Noom | `specs/batch-34/670-noom.md` | Build an original mobile product inspired by Noom's public health and medical workflow. |
| 671 | Lose It! | `specs/batch-34/671-lose-it.md` | Build an original mobile product inspired by Lose It!'s public health and medical workflow. |
| 672 | Cronometer | `specs/batch-34/672-cronometer.md` | Build an original mobile product inspired by Cronometer's public health and medical workflow. |
| 673 | Lifesum | `specs/batch-34/673-lifesum.md` | Build an original mobile product inspired by Lifesum's public health and medical workflow. |
| 674 | WaterMinder | `specs/batch-34/674-waterminder.md` | Build an original mobile product inspired by WaterMinder's public health and medical workflow. |
| 675 | Pillow | `specs/batch-34/675-pillow.md` | Build an original mobile product inspired by Pillow's public health and medical workflow. |
| 676 | AutoSleep | `specs/batch-34/676-autosleep.md` | Build an original mobile product inspired by AutoSleep's public health and medical workflow. |
| 677 | SleepScore | `specs/batch-34/677-sleepscore.md` | Build an original mobile product inspired by SleepScore's public health and medical workflow. |
| 678 | Withings Health Mate | `specs/batch-34/678-withings-health-mate.md` | Build an original mobile product inspired by Withings Health Mate's public health and medical workflow. |
| 679 | Samsung Health | `specs/batch-34/679-samsung-health.md` | Build an original mobile product inspired by Samsung Health's public health and medical workflow. |
| 680 | Apple Health | `specs/batch-34/680-apple-health.md` | Build an original mobile product inspired by Apple Health's public health and medical workflow. |
| 681 | Google Fit | `specs/batch-35/681-google-fit.md` | Build an original mobile product inspired by Google Fit's public health and medical workflow. |
| 682 | Athlytic | `specs/batch-35/682-athlytic.md` | Build an original mobile product inspired by Athlytic's public health and medical workflow. |
| 683 | Welltory | `specs/batch-35/683-welltory.md` | Build an original mobile product inspired by Welltory's public health and medical workflow. |
| 684 | Rise Sleep | `specs/batch-35/684-rise-sleep.md` | Build an original mobile product inspired by Rise Sleep's public health and medical workflow. |
| 685 | Pzizz | `specs/batch-35/685-pzizz.md` | Build an original mobile product inspired by Pzizz's public health and medical workflow. |
| 686 | The Bump | `specs/batch-35/686-the-bump.md` | Build an original mobile product inspired by The Bump's public parenting and family safety workflow. |
| 687 | What to Expect | `specs/batch-35/687-what-to-expect.md` | Build an original mobile product inspired by What to Expect's public parenting and family safety workflow. |
| 688 | Peanut | `specs/batch-35/688-peanut.md` | Build an original mobile product inspired by Peanut's public parenting and family safety workflow. |
| 689 | Find My Kids | `specs/batch-35/689-find-my-kids.md` | Build an original mobile product inspired by Find My Kids's public parenting and family safety workflow. |
| 690 | Family Link | `specs/batch-35/690-family-link.md` | Build an original mobile product inspired by Family Link's public parenting and family safety workflow. |
| 691 | OurPact | `specs/batch-35/691-ourpact.md` | Build an original mobile product inspired by OurPact's public parenting and family safety workflow. |
| 692 | Circle Parental Controls | `specs/batch-35/692-circle-parental-controls.md` | Build an original mobile product inspired by Circle Parental Controls's public parenting and family safety workflow. |
| 693 | FamCal | `specs/batch-35/693-famcal.md` | Build an original mobile product inspired by FamCal's public parenting and family safety workflow. |
| 694 | Winnie | `specs/batch-35/694-winnie.md` | Build an original mobile product inspired by Winnie's public parenting and family safety workflow. |
| 695 | Kinedu | `specs/batch-35/695-kinedu.md` | Build an original mobile product inspired by Kinedu's public parenting and family safety workflow. |
| 696 | Sprout Baby | `specs/batch-35/696-sprout-baby.md` | Build an original mobile product inspired by Sprout Baby's public parenting and family safety workflow. |
| 697 | FamilyAlbum | `specs/batch-35/697-familyalbum.md` | Build an original mobile product inspired by FamilyAlbum's public parenting and family safety workflow. |
| 698 | Blackboard Learn | `specs/batch-35/698-blackboard-learn.md` | Build an original mobile product inspired by Blackboard Learn's public education workflow. |
| 699 | Moodle | `specs/batch-35/699-moodle.md` | Build an original mobile product inspired by Moodle's public education workflow. |
| 700 | Schoology | `specs/batch-35/700-schoology.md` | Build an original mobile product inspired by Schoology's public education workflow. |
| 701 | Seesaw | `specs/batch-36/701-seesaw.md` | Build an original mobile product inspired by Seesaw's public education workflow. |
| 702 | Brainly | `specs/batch-36/702-brainly.md` | Build an original mobile product inspired by Brainly's public education workflow. |
| 703 | Chegg Study | `specs/batch-36/703-chegg-study.md` | Build an original mobile product inspired by Chegg Study's public education workflow. |
| 704 | Symbolab | `specs/batch-36/704-symbolab.md` | Build an original mobile product inspired by Symbolab's public education workflow. |
| 705 | WolframAlpha | `specs/batch-36/705-wolframalpha.md` | Build an original mobile product inspired by WolframAlpha's public education workflow. |
| 706 | Brilliant | `specs/batch-36/706-brilliant.md` | Build an original mobile product inspired by Brilliant's public education workflow. |
| 707 | Udemy | `specs/batch-36/707-udemy.md` | Build an original mobile product inspired by Udemy's public education workflow. |
| 708 | edX | `specs/batch-36/708-edx.md` | Build an original mobile product inspired by edX's public education workflow. |
| 709 | Codecademy Go | `specs/batch-36/709-codecademy-go.md` | Build an original mobile product inspired by Codecademy Go's public education workflow. |
| 710 | Sololearn | `specs/batch-36/710-sololearn.md` | Build an original mobile product inspired by Sololearn's public education workflow. |
| 711 | Mimo | `specs/batch-36/711-mimo.md` | Build an original mobile product inspired by Mimo's public education workflow. |
| 712 | HOMER | `specs/batch-36/712-homer.md` | Build an original mobile product inspired by HOMER's public education workflow. |
| 713 | Lingokids | `specs/batch-36/713-lingokids.md` | Build an original mobile product inspired by Lingokids's public education workflow. |
| 714 | Duolingo ABC | `specs/batch-36/714-duolingo-abc.md` | Build an original mobile product inspired by Duolingo ABC's public education workflow. |
| 715 | Drops | `specs/batch-36/715-drops.md` | Build an original mobile product inspired by Drops's public education workflow. |
| 716 | Mondly | `specs/batch-36/716-mondly.md` | Build an original mobile product inspired by Mondly's public education workflow. |
| 717 | Memrise | `specs/batch-36/717-memrise.md` | Build an original mobile product inspired by Memrise's public education workflow. |
| 718 | LingQ | `specs/batch-36/718-lingq.md` | Build an original mobile product inspired by LingQ's public education workflow. |
| 719 | Pimsleur | `specs/batch-36/719-pimsleur.md` | Build an original mobile product inspired by Pimsleur's public education workflow. |
| 720 | Microsoft 365 | `specs/batch-36/720-microsoft-365.md` | Build an original mobile product inspired by Microsoft 365's public productivity documents workflow. |
| 721 | Google Docs | `specs/batch-37/721-google-docs.md` | Build an original mobile product inspired by Google Docs's public productivity documents workflow. |
| 722 | Google Sheets | `specs/batch-37/722-google-sheets.md` | Build an original mobile product inspired by Google Sheets's public productivity documents workflow. |
| 723 | Google Slides | `specs/batch-37/723-google-slides.md` | Build an original mobile product inspired by Google Slides's public productivity documents workflow. |
| 724 | Microsoft Word | `specs/batch-37/724-microsoft-word.md` | Build an original mobile product inspired by Microsoft Word's public productivity documents workflow. |
| 725 | Microsoft Excel | `specs/batch-37/725-microsoft-excel.md` | Build an original mobile product inspired by Microsoft Excel's public productivity documents workflow. |
| 726 | Microsoft PowerPoint | `specs/batch-37/726-microsoft-powerpoint.md` | Build an original mobile product inspired by Microsoft PowerPoint's public productivity documents workflow. |
| 727 | OneNote | `specs/batch-37/727-onenote.md` | Build an original mobile product inspired by OneNote's public productivity documents workflow. |
| 728 | Apple Pages | `specs/batch-37/728-apple-pages.md` | Build an original mobile product inspired by Apple Pages's public productivity documents workflow. |
| 729 | Apple Numbers | `specs/batch-37/729-apple-numbers.md` | Build an original mobile product inspired by Apple Numbers's public productivity documents workflow. |
| 730 | Apple Keynote | `specs/batch-37/730-apple-keynote.md` | Build an original mobile product inspired by Apple Keynote's public productivity documents workflow. |
| 731 | iA Writer | `specs/batch-37/731-ia-writer.md` | Build an original mobile product inspired by iA Writer's public productivity documents workflow. |
| 732 | Ulysses | `specs/batch-37/732-ulysses.md` | Build an original mobile product inspired by Ulysses's public productivity documents workflow. |
| 733 | Craft | `specs/batch-37/733-craft.md` | Build an original mobile product inspired by Craft's public productivity documents workflow. |
| 734 | Roam Research | `specs/batch-37/734-roam-research.md` | Build an original mobile product inspired by Roam Research's public productivity documents workflow. |
| 735 | Logseq | `specs/batch-37/735-logseq.md` | Build an original mobile product inspired by Logseq's public productivity documents workflow. |
| 736 | Standard Notes | `specs/batch-37/736-standard-notes.md` | Build an original mobile product inspired by Standard Notes's public productivity documents workflow. |
| 737 | Joplin | `specs/batch-37/737-joplin.md` | Build an original mobile product inspired by Joplin's public productivity documents workflow. |
| 738 | Simplenote | `specs/batch-37/738-simplenote.md` | Build an original mobile product inspired by Simplenote's public productivity documents workflow. |
| 739 | Notesnook | `specs/batch-37/739-notesnook.md` | Build an original mobile product inspired by Notesnook's public productivity documents workflow. |
| 740 | Anytype | `specs/batch-37/740-anytype.md` | Build an original mobile product inspired by Anytype's public productivity documents workflow. |
| 741 | Coda | `specs/batch-38/741-coda.md` | Build an original mobile product inspired by Coda's public productivity documents workflow. |
| 742 | Airtable | `specs/batch-38/742-airtable.md` | Build an original mobile product inspired by Airtable's public productivity documents workflow. |
| 743 | Monday.com | `specs/batch-38/743-monday-com.md` | Build an original mobile product inspired by Monday.com's public tasks and project management workflow. |
| 744 | Basecamp | `specs/batch-38/744-basecamp.md` | Build an original mobile product inspired by Basecamp's public tasks and project management workflow. |
| 745 | Wrike | `specs/batch-38/745-wrike.md` | Build an original mobile product inspired by Wrike's public tasks and project management workflow. |
| 746 | Smartsheet | `specs/batch-38/746-smartsheet.md` | Build an original mobile product inspired by Smartsheet's public tasks and project management workflow. |
| 747 | Microsoft Planner | `specs/batch-38/747-microsoft-planner.md` | Build an original mobile product inspired by Microsoft Planner's public tasks and project management workflow. |
| 748 | Microsoft To Do | `specs/batch-38/748-microsoft-to-do.md` | Build an original mobile product inspired by Microsoft To Do's public tasks and project management workflow. |
| 749 | TickTick | `specs/batch-38/749-ticktick.md` | Build an original mobile product inspired by TickTick's public tasks and project management workflow. |
| 750 | OmniFocus | `specs/batch-38/750-omnifocus.md` | Build an original mobile product inspired by OmniFocus's public tasks and project management workflow. |
| 751 | Any.do | `specs/batch-38/751-any-do.md` | Build an original mobile product inspired by Any.do's public tasks and project management workflow. |
| 752 | Remember The Milk | `specs/batch-38/752-remember-the-milk.md` | Build an original mobile product inspired by Remember The Milk's public tasks and project management workflow. |
| 753 | Habitica | `specs/batch-38/753-habitica.md` | Build an original mobile product inspired by Habitica's public tasks and project management workflow. |
| 754 | Habitify | `specs/batch-38/754-habitify.md` | Build an original mobile product inspired by Habitify's public tasks and project management workflow. |
| 755 | Streaks | `specs/batch-38/755-streaks.md` | Build an original mobile product inspired by Streaks's public tasks and project management workflow. |
| 756 | Forest | `specs/batch-38/756-forest.md` | Build an original mobile product inspired by Forest's public tasks and project management workflow. |
| 757 | Structured | `specs/batch-38/757-structured.md` | Build an original mobile product inspired by Structured's public tasks and project management workflow. |
| 758 | Sunsama | `specs/batch-38/758-sunsama.md` | Build an original mobile product inspired by Sunsama's public tasks and project management workflow. |
| 759 | Akiflow | `specs/batch-38/759-akiflow.md` | Build an original mobile product inspired by Akiflow's public tasks and project management workflow. |
| 760 | Motion | `specs/batch-38/760-motion.md` | Build an original mobile product inspired by Motion's public tasks and project management workflow. |
| 761 | Reclaim.ai | `specs/batch-39/761-reclaim-ai.md` | Build an original mobile product inspired by Reclaim.ai's public AI-powered time orchestration workflow. |
| 762 | Doodle | `specs/batch-39/762-doodle.md` | Build an original mobile product inspired by Doodle's public group scheduling workflow. |
| 763 | BusyCal | `specs/batch-39/763-busycal.md` | Build an original mobile product inspired by BusyCal's public power-user calendar workflow. |
| 764 | Timepage | `specs/batch-39/764-timepage.md` | Build an original mobile product inspired by Timepage's public elegant calendar workflow. |
| 765 | Calendars by Readdle | `specs/batch-39/765-calendars-by-readdle.md` | Build an original mobile product inspired by Calendars by Readdle's public natural language calendar workflow. |
| 766 | Proton Calendar | `specs/batch-39/766-proton-calendar.md` | Build an original mobile product inspired by Proton Calendar's public privacy-focused encrypted calendar workflow. |
| 767 | Cal.com | `specs/batch-39/767-cal-com.md` | Build an original mobile product inspired by Cal.com's public open-source scheduling infrastructure workflow. |
| 768 | SavvyCal | `specs/batch-39/768-savvycal.md` | Build an original mobile product inspired by SavvyCal's public recipient-first scheduling workflow. |
| 769 | Acuity Scheduling | `specs/batch-39/769-acuity-scheduling.md` | Build an original mobile product inspired by Acuity Scheduling's public appointment scheduling workflow. |
| 770 | Square Appointments | `specs/batch-39/770-square-appointments.md` | Build an original mobile product inspired by Square Appointments's public user-facing workflow. |
| 771 | Vagaro | `specs/batch-39/771-vagaro.md` | Build an original mobile product inspired by Vagaro's public user-facing workflow. |
| 772 | Mindbody | `specs/batch-39/772-mindbody.md` | Build an original mobile product inspired by Mindbody's public user-facing workflow. |
| 773 | Fresha | `specs/batch-39/773-fresha.md` | Build an original mobile product inspired by Fresha's public user-facing workflow. |
| 774 | Booksy | `specs/batch-39/774-booksy.md` | Build an original mobile product inspired by Booksy's public user-facing workflow. |
| 775 | StyleSeat | `specs/batch-39/775-styleseat.md` | Build an original mobile product inspired by StyleSeat's public user-facing workflow. |
| 776 | Schedulicity | `specs/batch-39/776-schedulicity.md` | Build an original mobile product inspired by Schedulicity's public user-facing workflow. |
| 777 | Setmore | `specs/batch-39/777-setmore.md` | Build an original mobile product inspired by Setmore's public user-facing workflow. |
| 778 | Box | `specs/batch-39/778-box.md` | Build an original mobile-first enterprise cloud content management platform inspired by Box's public user-facing workflow. |
| 779 | OneDrive | `specs/batch-39/779-onedrive.md` | Build an original mobile-first cloud storage and file synchronization platform inspired by OneDrive's public user-facing workflow. |
| 780 | iCloud Drive | `specs/batch-39/780-icloud-drive.md` | Build an original mobile-first cloud file storage and synchronization platform inspired by iCloud Drive's public user-facing workflow. |
| 781 | MEGA | `specs/batch-40/781-mega.md` | Build an original mobile product inspired by MEGA's public cloud files and identity workflow. |
| 782 | pCloud | `specs/batch-40/782-pcloud.md` | Build an original mobile product inspired by pCloud's public cloud files and identity workflow. |
| 783 | Sync.com | `specs/batch-40/783-sync-com.md` | Build an original mobile product inspired by Sync.com's public cloud files and identity workflow. |
| 784 | WeTransfer | `specs/batch-40/784-wetransfer.md` | Build an original mobile product inspired by WeTransfer's public cloud files and identity workflow. |
| 785 | Adobe Acrobat Reader | `specs/batch-40/785-adobe-acrobat-reader.md` | Build an original mobile product inspired by Adobe Acrobat Reader's public cloud files and identity workflow. |
| 786 | CamScanner | `specs/batch-40/786-camscanner.md` | Build an original mobile product inspired by CamScanner's public cloud files and identity workflow. |
| 787 | Genius Scan | `specs/batch-40/787-genius-scan.md` | Build an original mobile product inspired by Genius Scan's public cloud files and identity workflow. |
| 788 | Scanner Pro | `specs/batch-40/788-scanner-pro.md` | Build an original mobile product inspired by Scanner Pro's public cloud files and identity workflow. |
| 789 | DocuSign | `specs/batch-40/789-docusign.md` | Build an original mobile product inspired by DocuSign's public cloud files and identity workflow. |
| 790 | Adobe Scan | `specs/batch-40/790-adobe-scan.md` | Build an original mobile product inspired by Adobe Scan's public cloud files and identity workflow. |
| 791 | Microsoft Lens | `specs/batch-40/791-microsoft-lens.md` | Build an original mobile product inspired by Microsoft Lens's public cloud files and identity workflow. |
| 792 | 1Password | `specs/batch-40/792-1password.md` | Build an original mobile product inspired by 1Password's public cloud files and identity workflow. |
| 793 | LastPass | `specs/batch-40/793-lastpass.md` | Build an original mobile product inspired by LastPass's public cloud files and identity workflow. |
| 794 | Bitwarden | `specs/batch-40/794-bitwarden.md` | Build an original mobile product inspired by Bitwarden's public cloud files and identity workflow. |
| 795 | Dashlane | `specs/batch-40/795-dashlane.md` | Build an original mobile product inspired by Dashlane's public cloud files and identity workflow. |
| 796 | Keeper | `specs/batch-40/796-keeper.md` | Build an original mobile product inspired by Keeper's public cloud files and identity workflow. |
| 797 | NordPass | `specs/batch-40/797-nordpass.md` | Build an original mobile product inspired by NordPass's public cloud files and identity workflow. |
| 798 | Proton Pass | `specs/batch-40/798-proton-pass.md` | Build an original mobile product inspired by Proton Pass's public cloud files and identity workflow. |
| 799 | Authy | `specs/batch-40/799-authy.md` | Build an original mobile product inspired by Authy's public cloud files and identity workflow. |
| 800 | Google Authenticator | `specs/batch-40/800-google-authenticator.md` | Build an original mobile product inspired by Google Authenticator's public cloud files and identity workflow. |
| 801 | Microsoft Authenticator | `specs/batch-41/801-microsoft-authenticator.md` | Build an original mobile product inspired by Microsoft Authenticator's public cloud files and identity workflow. |
| 802 | Okta Verify | `specs/batch-41/802-okta-verify.md` | Build an original mobile product inspired by Okta Verify's public cloud files and identity workflow. |
| 803 | Duo Mobile | `specs/batch-41/803-duo-mobile.md` | Build an original mobile product inspired by Duo Mobile's public cloud files and identity workflow. |
| 804 | NordVPN | `specs/batch-41/804-nordvpn.md` | Build an original mobile product inspired by NordVPN's public security and vpn workflow. |
| 805 | ExpressVPN | `specs/batch-41/805-expressvpn.md` | Build an original mobile product inspired by ExpressVPN's public security and vpn workflow. |
| 806 | Surfshark | `specs/batch-41/806-surfshark.md` | Build an original mobile product inspired by Surfshark's public security and vpn workflow. |
| 807 | Proton VPN | `specs/batch-41/807-proton-vpn.md` | Build an original mobile product inspired by Proton VPN's public security and vpn workflow. |
| 808 | Mullvad VPN | `specs/batch-41/808-mullvad-vpn.md` | Build an original mobile product inspired by Mullvad VPN's public security and vpn workflow. |
| 809 | TunnelBear | `specs/batch-41/809-tunnelbear.md` | Build an original mobile product inspired by TunnelBear's public security and vpn workflow. |
| 810 | Windscribe | `specs/batch-41/810-windscribe.md` | Build an original mobile product inspired by Windscribe's public security and vpn workflow. |
| 811 | Cloudflare WARP | `specs/batch-41/811-cloudflare-warp.md` | Build an original mobile product inspired by Cloudflare WARP's public security and vpn workflow. |
| 812 | Malwarebytes | `specs/batch-41/812-malwarebytes.md` | Build an original mobile product inspired by Malwarebytes's public security and vpn workflow. |
| 813 | Norton 360 | `specs/batch-41/813-norton-360.md` | Build an original mobile product inspired by Norton 360's public security and vpn workflow. |
| 814 | McAfee Security | `specs/batch-41/814-mcafee-security.md` | Build an original mobile product inspired by McAfee Security's public security and vpn workflow. |
| 815 | Avast One | `specs/batch-41/815-avast-one.md` | Build an original mobile product inspired by Avast One's public security and vpn workflow. |
| 816 | Bitdefender Mobile Security | `specs/batch-41/816-bitdefender-mobile-security.md` | Build an original mobile product inspired by Bitdefender Mobile Security's public security and vpn workflow. |
| 817 | 2FAS | `specs/batch-41/817-2fas.md` | Build an original mobile product inspired by 2FAS's public security and vpn workflow. |
| 818 | Yubico Authenticator | `specs/batch-41/818-yubico-authenticator.md` | Build an original mobile product inspired by Yubico Authenticator's public security and vpn workflow. |
| 819 | Salesforce | `specs/batch-41/819-salesforce.md` | Build an original mobile product inspired by Salesforce's public enterprise operations workflow. |
| 820 | HubSpot | `specs/batch-41/820-hubspot.md` | Build an original mobile product inspired by HubSpot's public enterprise operations workflow. |
| 821 | Zendesk | `specs/batch-42/821-zendesk.md` | Build an original mobile product inspired by Zendesk's public enterprise operations workflow. |
| 822 | Intercom | `specs/batch-42/822-intercom.md` | Build an original mobile product inspired by Intercom's public enterprise operations workflow. |
| 823 | Freshdesk | `specs/batch-42/823-freshdesk.md` | Build an original mobile product inspired by Freshdesk's public enterprise operations workflow. |
| 824 | ServiceNow | `specs/batch-42/824-servicenow.md` | Build an original mobile product inspired by ServiceNow's public enterprise operations workflow. |
| 825 | Workday | `specs/batch-42/825-workday.md` | Build an original mobile product inspired by Workday's public enterprise operations workflow. |
| 826 | BambooHR | `specs/batch-42/826-bamboohr.md` | Build an original mobile product inspired by BambooHR's public enterprise operations workflow. |
| 827 | ADP Mobile | `specs/batch-42/827-adp-mobile.md` | Build an original mobile product inspired by ADP Mobile's public enterprise operations workflow. |
| 828 | Gusto Wallet | `specs/batch-42/828-gusto-wallet.md` | Build an original mobile product inspired by Gusto Wallet's public enterprise operations workflow. |
| 829 | Rippling | `specs/batch-42/829-rippling.md` | Build an original mobile product inspired by Rippling's public enterprise operations workflow. |
| 830 | Deel | `specs/batch-42/830-deel.md` | Build an original mobile product inspired by Deel's public enterprise operations workflow. |
| 831 | Expensify | `specs/batch-42/831-expensify.md` | Build an original mobile product inspired by Expensify's public enterprise operations workflow. |
| 832 | SAP Concur | `specs/batch-42/832-sap-concur.md` | Build an original mobile product inspired by SAP Concur's public enterprise operations workflow. |
| 833 | QuickBooks | `specs/batch-42/833-quickbooks.md` | Build an original mobile product inspired by QuickBooks's public enterprise operations workflow. |
| 834 | Xero | `specs/batch-42/834-xero.md` | Build an original mobile product inspired by Xero's public enterprise operations workflow. |
| 835 | Square POS | `specs/batch-42/835-square-pos.md` | Build an original mobile product inspired by Square POS's public enterprise operations workflow. |
| 836 | Shopify | `specs/batch-42/836-shopify.md` | Build an original mobile product inspired by Shopify's public enterprise operations workflow. |
| 837 | Shopify Inbox | `specs/batch-42/837-shopify-inbox.md` | Build an original mobile product inspired by Shopify Inbox's public enterprise operations workflow. |
| 838 | Stripe Dashboard | `specs/batch-42/838-stripe-dashboard.md` | Build an original mobile product inspired by Stripe Dashboard's public enterprise operations workflow. |
| 839 | PayPal Business | `specs/batch-42/839-paypal-business.md` | Build an original mobile product inspired by PayPal Business's public enterprise operations workflow. |
| 840 | Mailchimp | `specs/batch-42/840-mailchimp.md` | Build an original mobile product inspired by Mailchimp's public enterprise operations workflow. |
| 841 | Hootsuite | `specs/batch-43/841-hootsuite.md` | Build an original mobile product inspired by Hootsuite's public enterprise operations workflow. |
| 842 | Buffer | `specs/batch-43/842-buffer.md` | Build an original mobile product inspired by Buffer's public enterprise operations workflow. |
| 843 | Sprout Social | `specs/batch-43/843-sprout-social.md` | Build an original mobile product inspired by Sprout Social's public enterprise operations workflow. |
| 844 | Later | `specs/batch-43/844-later.md` | Build an original mobile product inspired by Later's public enterprise operations workflow. |
| 845 | GitLab | `specs/batch-43/845-gitlab.md` | Build an original mobile product inspired by GitLab's public developer tools workflow. |
| 846 | Bitbucket | `specs/batch-43/846-bitbucket.md` | Build an original mobile product inspired by Bitbucket's public developer tools workflow. |
| 847 | Postman | `specs/batch-43/847-postman.md` | Build an original mobile product inspired by Postman's public developer tools workflow. |
| 848 | CodeSandbox | `specs/batch-43/848-codesandbox.md` | Build an original mobile product inspired by CodeSandbox's public developer tools workflow. |
| 849 | Stack Overflow | `specs/batch-43/849-stack-overflow.md` | Build an original mobile product inspired by Stack Overflow's public developer tools workflow. |
| 850 | DEV Community | `specs/batch-43/850-dev-community.md` | Build an original mobile product inspired by DEV Community's public developer tools workflow. |
| 851 | Hashnode | `specs/batch-43/851-hashnode.md` | Build an original mobile product inspired by Hashnode's public developer tools workflow. |
| 852 | Product Hunt | `specs/batch-43/852-product-hunt.md` | Build an original mobile product inspired by Product Hunt's public developer tools workflow. |
| 853 | Hacker News | `specs/batch-43/853-hacker-news.md` | Build an original mobile product inspired by Hacker News's public developer tools workflow. |
| 854 | DigitalOcean | `specs/batch-43/854-digitalocean.md` | Build an original mobile product inspired by DigitalOcean's public developer tools workflow. |
| 855 | AWS Console | `specs/batch-43/855-aws-console.md` | Build an original mobile product inspired by AWS Console's public developer tools workflow. |
| 856 | Google Cloud | `specs/batch-43/856-google-cloud.md` | Build an original mobile product inspired by Google Cloud's public developer tools workflow. |
| 857 | Microsoft Azure | `specs/batch-43/857-microsoft-azure.md` | Build an original mobile product inspired by Microsoft Azure's public developer tools workflow. |
| 858 | Cloudflare | `specs/batch-43/858-cloudflare.md` | Build an original mobile product inspired by Cloudflare's public developer tools workflow. |
| 859 | Vercel | `specs/batch-43/859-vercel.md` | Build an original mobile product inspired by Vercel's public developer tools workflow. |
| 860 | Netlify | `specs/batch-43/860-netlify.md` | Build an original mobile product inspired by Netlify's public developer tools workflow. |
| 861 | Sentry | `specs/batch-44/861-sentry.md` | Build an original mobile product inspired by Sentry's public developer tools workflow. |
| 862 | Datadog | `specs/batch-44/862-datadog.md` | Build an original mobile product inspired by Datadog's public developer tools workflow. |
| 863 | PagerDuty | `specs/batch-44/863-pagerduty.md` | Build an original mobile product inspired by PagerDuty's public developer tools workflow. |
| 864 | Opsgenie | `specs/batch-44/864-opsgenie.md` | Build an original mobile product inspired by Opsgenie's public developer tools workflow. |
| 865 | Grafana | `specs/batch-44/865-grafana.md` | Build an original mobile product inspired by Grafana's public developer tools workflow. |
| 866 | New Relic | `specs/batch-44/866-new-relic.md` | Build an original mobile product inspired by New Relic's public developer tools workflow. |
| 867 | Expo Go | `specs/batch-44/867-expo-go.md` | Build an original mobile product inspired by Expo Go's public developer tools workflow. |
| 868 | Termius | `specs/batch-44/868-termius.md` | Build an original mobile product inspired by Termius's public developer tools workflow. |
| 869 | Blink Shell | `specs/batch-44/869-blink-shell.md` | Build an original mobile product inspired by Blink Shell's public developer tools workflow. |
| 870 | Working Copy | `specs/batch-44/870-working-copy.md` | Build an original mobile product inspired by Working Copy's public developer tools workflow. |
| 871 | Code App | `specs/batch-44/871-code-app.md` | Build an original mobile product inspired by Code App's public developer tools workflow. |
| 872 | CNN | `specs/batch-44/872-cnn.md` | Build an original mobile product inspired by CNN's public news workflow. |
| 873 | BBC News | `specs/batch-44/873-bbc-news.md` | Build an original mobile product inspired by BBC News's public news workflow. |
| 874 | The Guardian | `specs/batch-44/874-the-guardian.md` | Build an original mobile product inspired by The Guardian's public news workflow. |
| 875 | Reuters | `specs/batch-44/875-reuters.md` | Build an original mobile product inspired by Reuters's public news workflow. |
| 876 | AP News | `specs/batch-44/876-ap-news.md` | Build an original mobile product inspired by AP News's public news workflow. |
| 877 | NPR | `specs/batch-44/877-npr.md` | Build an original mobile product inspired by NPR's public news workflow. |
| 878 | The Wall Street Journal | `specs/batch-44/878-the-wall-street-journal.md` | Build an original mobile product inspired by The Wall Street Journal's public news workflow. |
| 879 | Financial Times | `specs/batch-44/879-financial-times.md` | Build an original mobile product inspired by Financial Times's public news workflow. |
| 880 | The Washington Post | `specs/batch-44/880-the-washington-post.md` | Build an original mobile product inspired by The Washington Post's public news workflow. |
| 881 | USA Today | `specs/batch-45/881-usa-today.md` | Build an original mobile product inspired by USA Today's public news workflow. |
| 882 | Fox News | `specs/batch-45/882-fox-news.md` | Build an original mobile product inspired by Fox News's public news workflow. |
| 883 | NBC News | `specs/batch-45/883-nbc-news.md` | Build an original mobile product inspired by NBC News's public news workflow. |
| 884 | CBS News | `specs/batch-45/884-cbs-news.md` | Build an original mobile product inspired by CBS News's public news workflow. |
| 885 | ABC News | `specs/batch-45/885-abc-news.md` | Build an original mobile product inspired by ABC News's public news workflow. |
| 886 | Al Jazeera | `specs/batch-45/886-al-jazeera.md` | Build an original mobile product inspired by Al Jazeera's public news workflow. |
| 887 | The Economist | `specs/batch-45/887-the-economist.md` | Build an original mobile product inspired by The Economist's public news workflow. |
| 888 | Politico | `specs/batch-45/888-politico.md` | Build an original mobile product inspired by Politico's public news workflow. |
| 889 | Axios | `specs/batch-45/889-axios.md` | Build an original mobile product inspired by Axios's public news workflow. |
| 890 | Semafor | `specs/batch-45/890-semafor.md` | Build an original mobile product inspired by Semafor's public news workflow. |
| 891 | Vox | `specs/batch-45/891-vox.md` | Build an original mobile product inspired by Vox's public news workflow. |
| 892 | The Verge | `specs/batch-45/892-the-verge.md` | Build an original mobile product inspired by The Verge's public news workflow. |
| 893 | Engadget | `specs/batch-45/893-engadget.md` | Build an original mobile product inspired by Engadget's public news workflow. |
| 894 | TechCrunch | `specs/batch-45/894-techcrunch.md` | Build an original mobile product inspired by TechCrunch's public news workflow. |
| 895 | Ars Technica | `specs/batch-45/895-ars-technica.md` | Build an original mobile product inspired by Ars Technica's public news workflow. |
| 896 | Wired | `specs/batch-45/896-wired.md` | Build an original mobile product inspired by Wired's public news workflow. |
| 897 | Kobo Books | `specs/batch-45/897-kobo-books.md` | Build an original mobile product inspired by Kobo Books's public books & reference workflow. |
| 898 | Google Play Books | `specs/batch-45/898-google-play-books.md` | Build an original mobile product inspired by Google Play Books's public books & reference workflow. |
| 899 | Nook | `specs/batch-45/899-nook.md` | Build an original mobile product inspired by Nook's public books & reference workflow. |
| 900 | The StoryGraph | `specs/batch-45/900-the-storygraph.md` | Build an original mobile product inspired by The StoryGraph's public books & reference workflow. |
| 901 | Bookmate | `specs/batch-46/901-bookmate.md` | Build an original mobile product inspired by Bookmate's public books & reference workflow. |
| 902 | Blinkist | `specs/batch-46/902-blinkist.md` | Build an original mobile product inspired by Blinkist's public books & reference workflow. |
| 903 | Headway | `specs/batch-46/903-headway.md` | Build an original mobile product inspired by Headway's public books & reference workflow. |
| 904 | Serial Reader | `specs/batch-46/904-serial-reader.md` | Build an original mobile product inspired by Serial Reader's public books & reference workflow. |
| 905 | Inkitt | `specs/batch-46/905-inkitt.md` | Build an original mobile product inspired by Inkitt's public books & reference workflow. |
| 906 | Dreame | `specs/batch-46/906-dreame.md` | Build an original mobile product inspired by Dreame's public books & reference workflow. |
| 907 | Tapas | `specs/batch-46/907-tapas.md` | Build an original mobile product inspired by Tapas's public books & reference workflow. |
| 908 | Radish | `specs/batch-46/908-radish.md` | Build an original mobile product inspired by Radish's public books & reference workflow. |
| 909 | Webnovel | `specs/batch-46/909-webnovel.md` | Build an original mobile product inspired by Webnovel's public books & reference workflow. |
| 910 | MANGA Plus | `specs/batch-46/910-manga-plus.md` | Build an original mobile product inspired by MANGA Plus's public books & reference workflow. |
| 911 | Shonen Jump | `specs/batch-46/911-shonen-jump.md` | Build an original mobile product inspired by Shonen Jump's public books & reference workflow. |
| 912 | VIZ Manga | `specs/batch-46/912-viz-manga.md` | Build an original mobile product inspired by VIZ Manga's public books & reference workflow. |
| 913 | Marvel Unlimited | `specs/batch-46/913-marvel-unlimited.md` | Build an original mobile product inspired by Marvel Unlimited's public books & reference workflow. |
| 914 | DC Universe Infinite | `specs/batch-46/914-dc-universe-infinite.md` | Build an original mobile product inspired by DC Universe Infinite's public books & reference workflow. |
| 915 | Mastodon | `specs/batch-46/915-mastodon.md` | Build an original mobile product inspired by Mastodon's public social workflow. |
| 916 | Tumblr | `specs/batch-46/916-tumblr.md` | Build an original mobile product inspired by Tumblr's public social workflow. |
| 917 | Flickr | `specs/batch-46/917-flickr.md` | Build an original mobile product inspired by Flickr's public social workflow. |
| 918 | 500px | `specs/batch-46/918-500px.md` | Build an original mobile product inspired by 500px's public social workflow. |
| 919 | Clubhouse | `specs/batch-46/919-clubhouse.md` | Build an original mobile product inspired by Clubhouse's public social workflow. |
| 920 | Amino | `specs/batch-46/920-amino.md` | Build an original mobile product inspired by Amino's public social workflow. |
| 921 | Weverse | `specs/batch-47/921-weverse.md` | Build an original mobile product inspired by Weverse's public social workflow. |
| 922 | Patreon | `specs/batch-47/922-patreon.md` | Build an original mobile product inspired by Patreon's public social workflow. |
| 923 | Buy Me a Coffee | `specs/batch-47/923-buy-me-a-coffee.md` | Build an original mobile product inspired by Buy Me a Coffee's public social workflow. |
| 924 | Ko-fi | `specs/batch-47/924-ko-fi.md` | Build an original mobile product inspired by Ko-fi's public social workflow. |
| 925 | Cameo | `specs/batch-47/925-cameo.md` | Build an original mobile product inspired by Cameo's public social workflow. |
| 926 | Guilded | `specs/batch-47/926-guilded.md` | Build an original mobile product inspired by Guilded's public social workflow. |
| 927 | Geneva | `specs/batch-47/927-geneva.md` | Build an original mobile product inspired by Geneva's public social workflow. |
| 928 | Fizz | `specs/batch-47/928-fizz.md` | Build an original mobile product inspired by Fizz's public social workflow. |
| 929 | Yubo | `specs/batch-47/929-yubo.md` | Build an original mobile product inspired by Yubo's public social workflow. |
| 930 | Poparazzi | `specs/batch-47/930-poparazzi.md` | Build an original mobile product inspired by Poparazzi's public social workflow. |
| 931 | NGL | `specs/batch-47/931-ngl.md` | Build an original mobile product inspired by NGL's public social workflow. |
| 932 | Tellonym | `specs/batch-47/932-tellonym.md` | Build an original mobile product inspired by Tellonym's public social workflow. |
| 933 | Rumble | `specs/batch-47/933-rumble.md` | Build an original mobile product inspired by Rumble's public social workflow. |
| 934 | Truth Social | `specs/batch-47/934-truth-social.md` | Build an original mobile product inspired by Truth Social's public social workflow. |
| 935 | Viber | `specs/batch-47/935-viber.md` | Build an original mobile product inspired by Viber's public communication workflow. |
| 936 | WeChat | `specs/batch-47/936-wechat.md` | Build an original mobile product inspired by WeChat's public communication workflow. |
| 937 | LINE | `specs/batch-47/937-line.md` | Build an original mobile product inspired by LINE's public communication workflow. |
| 938 | KakaoTalk | `specs/batch-47/938-kakaotalk.md` | Build an original mobile product inspired by KakaoTalk's public communication workflow. |
| 939 | Skype | `specs/batch-47/939-skype.md` | Build an original mobile product inspired by Skype's public communication workflow. |
| 940 | Google Voice | `specs/batch-47/940-google-voice.md` | Build an original mobile product inspired by Google Voice's public communication workflow. |
| 941 | TextNow | `specs/batch-48/941-textnow.md` | Build an original mobile product inspired by TextNow's public communication workflow. |
| 942 | TextFree | `specs/batch-48/942-textfree.md` | Build an original mobile product inspired by TextFree's public communication workflow. |
| 943 | GroupMe | `specs/batch-48/943-groupme.md` | Build an original mobile product inspired by GroupMe's public communication workflow. |
| 944 | Marco Polo | `specs/batch-48/944-marco-polo.md` | Build an original mobile product inspired by Marco Polo's public communication workflow. |
| 945 | Voxer | `specs/batch-48/945-voxer.md` | Build an original mobile product inspired by Voxer's public communication workflow. |
| 946 | Microsoft Teams | `specs/batch-48/946-microsoft-teams.md` | Build an original mobile product inspired by Microsoft Teams's public communication workflow. |
| 947 | Cisco Webex | `specs/batch-48/947-cisco-webex.md` | Build an original mobile product inspired by Cisco Webex's public communication workflow. |
| 948 | Google Meet | `specs/batch-48/948-google-meet.md` | Build an original mobile product inspired by Google Meet's public communication workflow. |
| 949 | GoTo | `specs/batch-48/949-goto.md` | Build an original mobile product inspired by GoTo's public communication workflow. |
| 950 | BlueJeans | `specs/batch-48/950-bluejeans.md` | Build an original mobile product inspired by BlueJeans's public communication workflow. |
| 951 | Jitsi Meet | `specs/batch-48/951-jitsi-meet.md` | Build an original mobile product inspired by Jitsi Meet's public communication workflow. |
| 952 | Proton Mail | `specs/batch-48/952-proton-mail.md` | Build an original mobile product inspired by Proton Mail's public communication workflow. |
| 953 | Yahoo Mail | `specs/batch-48/953-yahoo-mail.md` | Build an original mobile product inspired by Yahoo Mail's public communication workflow. |
| 954 | AOL Mail | `specs/batch-48/954-aol-mail.md` | Build an original mobile product inspired by AOL Mail's public communication workflow. |
| 955 | Spark Mail | `specs/batch-48/955-spark-mail.md` | Build an original mobile product inspired by Spark Mail's public communication workflow. |
| 956 | Edison Mail | `specs/batch-48/956-edison-mail.md` | Build an original mobile product inspired by Edison Mail's public communication workflow. |
| 957 | BlueMail | `specs/batch-48/957-bluemail.md` | Build an original mobile product inspired by BlueMail's public communication workflow. |
| 958 | Canary Mail | `specs/batch-48/958-canary-mail.md` | Build an original mobile product inspired by Canary Mail's public communication workflow. |
| 959 | Fastmail | `specs/batch-48/959-fastmail.md` | Build an original mobile product inspired by Fastmail's public communication workflow. |
| 960 | HEY | `specs/batch-48/960-hey.md` | Build an original mobile product inspired by HEY's public communication workflow. |
| 961 | Tuta Mail | `specs/batch-49/961-tuta-mail.md` | Build an original mobile product inspired by Tuta Mail's public communication workflow. |
| 962 | Zoho Mail | `specs/batch-49/962-zoho-mail.md` | Build an original mobile product inspired by Zoho Mail's public communication workflow. |
| 963 | Spike | `specs/batch-49/963-spike.md` | Build an original mobile product inspired by Spike's public communication workflow. |
| 964 | Superhuman | `specs/batch-49/964-superhuman.md` | Build an original mobile product inspired by Superhuman's public communication workflow. |
| 965 | Shortwave | `specs/batch-49/965-shortwave.md` | Build an original mobile product inspired by Shortwave's public communication workflow. |
| 966 | Clean Email | `specs/batch-49/966-clean-email.md` | Build an original mobile product inspired by Clean Email's public communication workflow. |
| 967 | Unroll.Me | `specs/batch-49/967-unroll-me.md` | Build an original mobile product inspired by Unroll.Me's public communication workflow. |
| 968 | letgo | `specs/batch-49/968-letgo.md` | Build an original mobile product inspired by letgo's public shopping workflow. |
| 969 | VarageSale | `specs/batch-49/969-varagesale.md` | Build an original mobile product inspired by VarageSale's public shopping workflow. |
| 970 | Kijiji | `specs/batch-49/970-kijiji.md` | Build an original mobile product inspired by Kijiji's public shopping workflow. |
| 971 | Gumtree | `specs/batch-49/971-gumtree.md` | Build an original mobile product inspired by Gumtree's public shopping workflow. |
| 972 | CarGurus | `specs/batch-49/972-cargurus.md` | Build an original mobile product inspired by CarGurus's public shopping workflow. |
| 973 | AutoTrader | `specs/batch-49/973-autotrader.md` | Build an original mobile product inspired by AutoTrader's public shopping workflow. |
| 974 | Cars.com | `specs/batch-49/974-cars-com.md` | Build an original mobile product inspired by Cars.com's public shopping workflow. |
| 975 | Carvana | `specs/batch-49/975-carvana.md` | Build an original mobile product inspired by Carvana's public shopping workflow. |
| 976 | CarMax | `specs/batch-49/976-carmax.md` | Build an original mobile product inspired by CarMax's public shopping workflow. |
| 977 | TrueCar | `specs/batch-49/977-truecar.md` | Build an original mobile product inspired by TrueCar's public shopping workflow. |
| 978 | Copart | `specs/batch-49/978-copart.md` | Build an original mobile product inspired by Copart's public shopping workflow. |
| 979 | Bring a Trailer | `specs/batch-49/979-bring-a-trailer.md` | Build an original mobile product inspired by Bring a Trailer's public shopping workflow. |
| 980 | Autolist | `specs/batch-49/980-autolist.md` | Build an original mobile product inspired by Autolist's public shopping workflow. |
| 981 | Gumroad | `specs/batch-50/981-gumroad.md` | Build an original mobile product inspired by Gumroad's public shopping workflow. |
| 982 | Kajabi | `specs/batch-50/982-kajabi.md` | Build an original mobile product inspired by Kajabi's public business workflow. |
| 983 | Teachable | `specs/batch-50/983-teachable.md` | Build an original mobile product inspired by Teachable's public business workflow. |
| 984 | Thinkific | `specs/batch-50/984-thinkific.md` | Build an original mobile product inspired by Thinkific's public business workflow. |
| 985 | Podia | `specs/batch-50/985-podia.md` | Build an original mobile product inspired by Podia's public business workflow. |
| 986 | Mighty Networks | `specs/batch-50/986-mighty-networks.md` | Build an original mobile product inspired by Mighty Networks's public social networking workflow. |
| 987 | Circle Communities | `specs/batch-50/987-circle-communities.md` | Build an original mobile product inspired by Circle Communities's public social networking workflow. |
| 988 | Skool | `specs/batch-50/988-skool.md` | Build an original mobile product inspired by Skool's public social networking workflow. |
| 989 | Stan Store | `specs/batch-50/989-stan-store.md` | Build an original mobile product inspired by Stan Store's public shopping workflow. |
| 990 | Linktree | `specs/batch-50/990-linktree.md` | Build an original mobile product inspired by Linktree's public business workflow. |
| 991 | Beacons | `specs/batch-50/991-beacons.md` | Build an original mobile product inspired by Beacons's public business workflow. |
| 992 | Linkin.bio | `specs/batch-50/992-linkin-bio.md` | Build an original mobile product inspired by Linkin.bio's public business workflow. |
| 993 | Taplink | `specs/batch-50/993-taplink.md` | Build an original mobile product inspired by Taplink's public business workflow. |
| 994 | Yandex Maps | `specs/batch-50/994-yandex-maps.md` | Build an original mobile product inspired by Yandex Maps's public navigation workflow. |
| 995 | 2GIS | `specs/batch-50/995-2gis.md` | Build an original mobile product inspired by 2GIS's public navigation workflow. |
| 996 | HERE WeGo | `specs/batch-50/996-here-wego.md` | Build an original mobile product inspired by HERE WeGo's public navigation workflow. |
| 997 | MAPS.ME | `specs/batch-50/997-maps-me.md` | Build an original mobile product inspired by MAPS.ME's public navigation workflow. |
| 998 | OsmAnd | `specs/batch-50/998-osmand.md` | Build an original mobile product inspired by OsmAnd's public navigation workflow. |
| 999 | Sygic | `specs/batch-50/999-sygic.md` | Build an original mobile product inspired by Sygic's public navigation workflow. |
| 1000 | TomTom GO | `specs/batch-50/1000-tomtom-go.md` | Build an original mobile product inspired by TomTom GO's public navigation workflow. |

## Phase 6: Downstream Repository Seeding And Spec Store Publication

### Goal

Create one GitHub repository per clone implementation target using `gh`, seed each repository with its source spec and minimal implementation-planning docs, and keep this repository as the public canonical spec store once the legal/open-source audit is complete.

### Scope

- Use `tasks/repo-seeding.md` as the operational checklist and manifest for all 100 downstream repositories.
- Create downstream repos as private first unless a repo has completed legal/name/license review and the user explicitly approves public visibility.
- Seed each downstream repo with source-spec docs, source-store backlink, legal/non-affiliation notice, original-assets requirement, and an empty implementation task scaffold.
- Keep this repository code-free and authoritative for specs, readiness status, source links, blockers, and public-source V1 scope.
- Prepare this spec store for open-source publication with license, README, contribution guidance, disclaimers, and a final check for secrets, copied assets, proprietary content, and ambiguous affiliation language.

### Acceptance Criteria

- [x] `tasks/repo-seeding.md` lists all 100 target repos and source specs.
- [x] A reusable `gh` seeding command pattern exists.
- [x] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [x] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [x] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [x] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [x] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

**Parallelization:** implementation-safe
**Coordination Notes:** Repo creation can run by batch after the manifest and command template are reviewed. The spec-store publication task should remain serial because it changes project visibility and legal posture.

> Test strategy: none

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** high
**Review gates:** correctness, security, docs/API conformance

**Subagent lanes:** none

### Implementation

- Step 6.1: Audit the current repo-seeding contract and choose the dry-run target
  - Files: modify `tasks/repo-seeding.md`
  - Confirm the manifest still lists 100 target repos, exactly one checked existing repo, and source specs that exist under `specs/`.
  - Select one low-risk non-Todoist dry-run target, preferably a productivity or notes app, and record why it is safe to test privately.
  - Add a status/log section for dry-run evidence, batch progress, failures, blockers, and explicit decisions to keep repos private.

- Step 6.2: Add reusable downstream seed templates
  - Files: create `templates/downstream/README.md`, create `templates/downstream/docs/plans/README.md`, create `templates/downstream/tasks/roadmap.md`, create `templates/downstream/tasks/todo.md`, create `templates/downstream/.gitignore`
  - Templates must use placeholders for app ID, app name, target repo, source spec path, source spec-store URL, non-affiliation language, legal scope, original-assets requirement, and manual verification blockers.
  - Templates must not include proprietary names as project branding, copied app-store media, screenshots, logos, private API language, production credentials, or real user data.

- Step 6.3: Add the local seeding utility and dry-run mode
  - Files: create `scripts/seed-downstream-repos.mjs`, modify `tasks/repo-seeding.md`
  - Parse the `tasks/repo-seeding.md` manifest and support a single-target dry run before any batch creation.
  - Generate seed files from `templates/downstream/`, copy the selected source spec into `docs/source-specs/`, and print the exact `gh` commands before executing them.
  - Default to private repos, refuse public creation, skip existing repos unless `--reconcile-existing` is provided, and write blocker evidence back to `tasks/repo-seeding.md`.

- Step 6.4: Prepare this spec store for public release review
  - Files: create `README.md`, create `LICENSE`, create `CONTRIBUTING.md`, create `SECURITY.md`, modify `tasks/repo-seeding.md`
  - Document the repo purpose, lawful functional-parity scope, non-affiliation language, source/spec map, no-proprietary-assets rule, contribution expectations, source-correction process, manual verification evidence policy, and downstream repo linkage policy.
  - Keep the repository private until the manual approval task is complete.

- Step 6.5: Run one private non-Todoist dry-run seed
  - Files: modify `tasks/repo-seeding.md`
  - Verify `gh auth status`; if authentication fails, pause for the manual auth task instead of working around it.
  - Run the seeding utility against the selected dry-run target with private visibility.
  - Record the created repo URL, seeded files, commit SHA if available, and any blocker notes in `tasks/repo-seeding.md`.

- Step 6.6: Reconcile the existing Todoist downstream repo with the shared seed structure
  - Files: modify `tasks/repo-seeding.md`, update downstream repo `GeorgeQLe/todoist-mobile-clone`
  - Compare `GeorgeQLe/todoist-mobile-clone` against the template structure.
  - Add missing seed docs or record explicit differences that should remain because Todoist was created before the shared seed template.
  - Mark the Todoist row and batch checklist consistently after reconciliation evidence exists.

- Step 6.7: Seed the remaining downstream repos in controlled private batches
  - Files: modify `tasks/repo-seeding.md`
  - Create repos batch by batch only after the dry-run and Todoist reconciliation pass.
  - Keep every downstream repo private, preserve source-spec links and manual blockers, and record per-repo creation evidence or explicit blocker notes.
  - Stop the batch on authentication, permission, naming, rate-limit, or template validation failures and record the blocker instead of partially guessing.

- Step 6.8: Verify the full downstream repo manifest
  - Files: modify `tasks/repo-seeding.md`
  - Confirm every target repo either exists privately with the expected seeded files and source-spec backlink, or has an explicit blocker note.
  - Confirm no downstream repo was made public and no proprietary assets, screenshots, logos, private APIs, production credentials, or real user data were seeded.
  - Confirm `tasks/repo-seeding.md` has batch-level and per-repo evidence for the dry run, Todoist reconciliation, and all remaining repos.

- Step 6.9: Publish the spec store only after explicit approval
  - Files: modify `tasks/repo-seeding.md`
  - Complete the public-release checklist in `tasks/repo-seeding.md`.
  - After the manual approval task is checked off, run the visibility change for `GeorgeQLe/mobile-ideas`.
  - Record the approval evidence, command used, resulting visibility, and any follow-up blocker notes.

## Cross-Phase Concerns

- Legal scope must remain functional parity only.
- Specs must not imply use of private APIs or copied proprietary assets.
- Research claims must be traceable to public sources or hands-on notes.
- Finance, health, location, marketplace, communication, media, and smart-home apps require elevated risk review.
- Every downstream implementation must begin by expanding exactly one Phase 5 plan row into app-specific implementation phases and tests.

## Phase 7: Backlog Extension Pipeline (IDs 101-200)

### Milestones

- [x] Step 7.1: Draft 0 placeholder specs for all 100 new ideas under `specs/batch-06/` through `specs/batch-10/`.
- [x] Step 7.2: Draft 1 canonical normalization for IDs 101-200.
- [x] Step 7.3: Implementation-readiness upgrades for IDs 101-200. **Absorbed into Phase 8 Step 8.3** on 2026-04-23 — same operation applied across IDs 101-1000 at once (CLAUDE.md allows scaffold seeding at Draft 1 without implementation-ready parity claims).
- [x] Step 7.4: Extend `tasks/roadmap.md` Phase 5 plan queue and `tasks/repo-seeding.md` manifest to 200 rows. Superseded by `cd54fcf feat(specs): extend mobile ideas to 1000` which took the manifest directly to 1000 rows.
- [x] Step 7.5: Seed 100 new private downstream repos via `scripts/seed-downstream-repos.mjs`. IDs 101-200 all verified PRIVATE + non-empty in `tasks/repo-seeding.md`.
- [x] Step 7.6: Close Phase 7 after verification.

### Acceptance Criteria

- 100 new spec files exist with canonical sections.
- All 100 pass implementation-readiness gate.
- 100 new private downstream repos exist (or explicit blockers logged).
- No downstream repo made public during Phase 7.

### Detail

Full step-level plan lives in `tasks/todo.md` Phase 7.

## Phase 8: 1000-App Extension Pipeline (IDs 201-1000)

### Milestones

- [x] Step 8.1: Add 800 backlog rows for IDs 201-1000 in `tasks/ideas.md`.
- [x] Step 8.2: Create canonical Draft 1 scaffold specs under `specs/batch-11/` through `specs/batch-50/`.
- [x] Step 8.3: Replace source-discovery links with exact first-party URLs and promote IDs 101-1000 to implementation-ready public-source V1 (absorbs Phase 7 Step 7.3; scope now 900 specs rather than 800).
- [x] Step 8.4: Extend Phase 5 implementation-plan queue to 1000 rows.
- [x] Step 8.5: Extend and verify `tasks/repo-seeding.md` manifest to 1000 rows.
- [x] Step 8.6: Seed downstream private scaffold repos for IDs 201-1000 with explicit approval and batch-level controls.

### Acceptance Criteria

- 1000 total spec files exist with canonical sections.
- All 1000 IDs are represented in `tasks/ideas.md` and `specs/batch-*`.
- `tasks/repo-seeding.md` has 1000 checked downstream rows and zero unchecked rows.
- Downstream scaffold repos are PRIVATE, non-empty, and verified with README plus copied source specs before being marked done.
- No downstream repo is made public during the extension.

### Outcome

Phase 8 completed 2026-05-06. All 1000 IDs have backlog rows, implementation-ready public-source V1 specs, Phase 5 plan queue entries, and verified private downstream repos. The scaffold-only caveat for IDs 201-1000 is resolved — all specs passed the implementation-readiness gate.

## Phase 9: Detailed Build Plans (All 1000 Apps)

**Goal**: Generate app-specific build plans in every downstream repo's `docs/plans/README.md`, following the Todoist pilot pattern (Phase 4). Each plan covers route map, API schema, data model, seed data, feature flags, and blocked acceptance tests — tailored to the app's spec.

**Scope**:
- All 1000 downstream repos get a completed `docs/plans/README.md` with app-specific content derived from `docs/source-specs/`.
- Plans define five variant targets per app: React Native, Flutter, Expo, Native iOS (Swift/SwiftUI), Native Android (Kotlin/Jetpack Compose).
- Each plan includes variant-specific architectural notes (e.g., navigation library choices, state management, platform API access patterns).
- Category batches processed in parallel — each category's apps are independent repos.

**Acceptance Criteria:**
- [x] All 1000 downstream repos have a completed `docs/plans/README.md` with route map, API schema, data model, seed data, and test checklist.
- [x] Each plan defines variant-specific build notes for all five targets.
- [x] Plans reference exact source spec sections and preserve manual verification blockers.
- [x] No proprietary assets, trademarks, or copyrighted content introduced.

**Parallelization:** serial

**Coordination Notes:** All changes to this planning repo (template, script, manifest) are sequential. The generation script handles downstream repo parallelism internally — each downstream repo is independent. Downgraded from agent-team to serial because the only files modified in this repo are the shared template, generation script, and tracking manifest.

**On Completion:**
- Deviations from plan: Two plan formats emerged — full 5-variant template (majority) and simpler single-stack format (subset from later batch runs). Both contain substantive app-specific content.
- Tech debt / follow-ups: Simpler-format plans could be upgraded to full 5-variant template in a future pass if needed.
- Ready for next phase: Yes — Phase 10 (Benchmarking Infrastructure & Multi-Variant Repo Structure).

### Implementation

- Step 9.1: Design multi-variant build plan template
  - Files: create `templates/build-plan-template.md`
  - Extend the Todoist pilot pattern (`tasks/todoist-downstream-build-plan.md`) with five variant-specific architecture sections.
  - Template sections: Scope, Product Boundaries, Route Map, API Schema Plan, Data Model Plan, Seed Data Plan, Feature Flags and Blocked Acceptance Tests, Variant Architecture Notes (React Native, Flutter, Expo, Native iOS Swift/SwiftUI, Native Android Kotlin/Jetpack Compose), Test Checklist.
  - Each variant section covers: navigation library, state management, networking layer, local storage, platform API access patterns, recommended project structure.
  - Template uses placeholders (`{{APP_NAME}}`, `{{APP_ID}}`, `{{CATEGORY}}`, `{{SOURCE_SPEC_PATH}}`, etc.) for script-driven generation.

- Step 9.2: Create build plan generation script
  - Files: create `scripts/generate-build-plans.mjs`
  - Script reads the source spec from each downstream repo's `docs/source-specs/NNN-slug.md`.
  - Extracts: app name, category, screens/routes from spec, API contracts, data model entities, manual verification blockers, edge cases.
  - Generates an app-specific `docs/plans/README.md` using the template from Step 9.1.
  - Route map rows derived from spec's Screens section; API families from spec's Data Contracts/API section; data model from spec's Data Model section.
  - Supports `--from <id> --to <id>`, `--dry-run`, `--execute`, and `--delay-ms` flags (same pattern as `scripts/seed-downstream-batch.mjs`).
  - Serial execution with configurable delay between repos. Stops on first failure.
  - Clones each downstream repo to a temp directory, writes the plan, commits, and pushes.

- Step 9.3: Pilot on 3 diverse apps
  - Files: modify `tasks/todo.md` (mark pilot complete)
  - Run `scripts/generate-build-plans.mjs` on 3 apps from different categories: one AI app (e.g., ID 001), one shopping app (e.g., ID 046), one health app (e.g., ID 086).
  - Validate each generated plan has: complete route map matching spec screens, API schema families matching spec data contracts, data model matching spec entities, all five variant architecture sections, correct source spec references, preserved manual blockers.
  - Fix any template or script issues before proceeding to bulk generation.

- Step 9.4: Generate build plans — AI & Assistants cluster
  - Files: downstream repos for AI & Assistants category apps
  - Run `scripts/generate-build-plans.mjs` for all apps in the AI & Assistants cluster (~26 apps).
  - Verify each repo's `docs/plans/README.md` exists and is non-empty after generation.

- Step 9.5: Generate build plans — Social, Dating & Community cluster
  - Files: downstream repos for Social, Dating & Community category apps
  - Run generation for 39 apps in this cluster.

- Step 9.6: Generate build plans — Messaging & Email cluster
  - Files: downstream repos for Messaging & Email category apps
  - Run generation for ~37 apps in this cluster.

- Step 9.7: Generate build plans — Video & Music Streaming cluster
  - Files: downstream repos for Video & Music Streaming category apps
  - Run generation for ~53 apps in this cluster.

- Step 9.8: Generate build plans — Podcasts, Books & Reading cluster
  - Files: downstream repos for Podcasts, Books & Reading category apps
  - Run generation for ~42 apps in this cluster.

- Step 9.9: Generate build plans — Photo & Video Creation cluster
  - Files: downstream repos for Photo & Video Creation category apps
  - Run generation for ~47 apps in this cluster.

- Step 9.10: Generate build plans — Shopping, Commerce & Classifieds cluster
  - Files: downstream repos for Shopping, Commerce & Classifieds category apps
  - Run generation for ~65 apps in this cluster.

- Step 9.11: Generate build plans — Food, Delivery & Grocery cluster
  - Files: downstream repos for Food, Delivery & Grocery category apps
  - Run generation for ~77 apps in this cluster.

- Step 9.12: Generate build plans — Finance & Payments cluster
  - Files: downstream repos for Finance & Payments category apps
  - Run generation for ~65 apps in this cluster.

- Step 9.13: Generate build plans — Travel & Transportation cluster
  - Files: downstream repos for Travel & Transportation category apps
  - Run generation for ~79 apps in this cluster.

- Step 9.14: Generate build plans — Health, Fitness & Wellness cluster
  - Files: downstream repos for Health, Fitness & Wellness category apps
  - Run generation for ~81 apps in this cluster.

- Step 9.15: Generate build plans — Education & Learning cluster
  - Files: downstream repos for Education & Learning category apps
  - Run generation for ~31 apps in this cluster.

- Step 9.16: Generate build plans — Productivity & Collaboration cluster
  - Files: downstream repos for Productivity & Collaboration category apps
  - Run generation for ~72 apps in this cluster.

- Step 9.17: Generate build plans — News, Maps & Navigation cluster
  - Files: downstream repos for News, Maps & Navigation category apps
  - Run generation for ~57 apps in this cluster.

- Step 9.18: Generate build plans — Home, Security, Cloud & Enterprise cluster
  - Files: downstream repos for Home, Security, Cloud & Enterprise category apps
  - Run generation for ~137 apps in this cluster.

- Step 9.19: Verify completeness and update tracking
  - Files: modify `tasks/build-plan-tracking.md` (new), modify `tasks/todo.md`
  - Verify all 1000 downstream repos have a non-empty `docs/plans/README.md` via `gh api`.
  - Spot-check 5 repos per cluster (75 total) for plan quality: route map completeness, API schema coverage, variant sections present, blocker preservation.
  - Create `tasks/build-plan-tracking.md` with per-repo completion status.
  - Record any repos that failed or need manual intervention.

### Milestone: Phase 9 — Build Plans Complete
**Acceptance Criteria:** (preserved from roadmap)
- [x] All 1000 downstream repos have a completed `docs/plans/README.md` with route map, API schema, data model, seed data, and test checklist.
- [x] Each plan defines variant-specific build notes for all five targets.
- [x] Plans reference exact source spec sections and preserve manual verification blockers.
- [x] No proprietary assets, trademarks, or copyrighted content introduced.

**On Completion**:
- Deviations from plan: GitHub Actions stayed disabled per project rules; local validation and benchmark artifacts replaced CI evidence. Flutter and Android Native validation/benchmarking remain unresolved because local Flutter, Java runtime, and Gradle toolchains are unavailable. User approved carrying those 54 blocker records forward on 2026-05-14 so development can continue.
- Tech debt / follow-ups: Install or otherwise provide approved executable evidence for Flutter and Android Native validation/benchmarking, then regenerate Phase 11 scorecards and blocker artifacts.
- Ready for next phase: Yes, with carry-forward blockers preserved in `tasks/phase-11-validation-report.md` and `tasks/scorecards/phase-11/benchmark-blockers.json`.

---

## Phase 10: Benchmarking Infrastructure & Multi-Variant Repo Structure

**Goal**: Build the shared CI/CD templates, benchmarking harness, and multi-variant branch/project structure that all 1000 apps will use during implementation phases.

**Scope**:
- Benchmarking harness repo with automated scoring across all dimensions:
  - **Performance**: cold start time, warm start time, frame rate (jank %), memory peak/average, CPU usage, battery drain rate
  - **Bundle size**: IPA size, APK/AAB size, OTA update size, asset breakdown
  - **UX fidelity**: spec compliance score (screen coverage, interaction coverage, edge case coverage)
  - **Code quality**: lint score, type coverage, test coverage, cyclomatic complexity, maintainability index
  - **Developer velocity**: clean build time, incremental build time, hot/live reload time, CI pipeline duration
  - **Accessibility**: automated a11y audit score (VoiceOver/TalkBack), contrast ratio compliance, touch target sizes
  - **Store compliance**: metadata completeness, policy compliance checklist, screenshot coverage, privacy manifest accuracy
- Shared CI/CD templates (GitHub Actions or equivalent) for building, testing, and benchmarking all five variants.
- Multi-variant repo structure convention: each downstream repo gets five variant directories or branches (`variants/react-native/`, `variants/flutter/`, `variants/expo/`, `variants/ios-native/`, `variants/android-native/`).
- Scorecard template and aggregation dashboard schema.

**Acceptance Criteria:**
- [ ] Benchmarking harness repo exists with automated scoring for all 7 benchmark dimensions.
- [ ] CI/CD templates cover build, test, lint, and benchmark for all 5 variant stacks.
- [ ] Multi-variant directory convention is documented and scaffolded in at least one pilot repo.
- [ ] Scorecard template produces a normalized 0-100 composite score per variant.
- [ ] Aggregation schema supports cross-app comparison and category-level rollups.

**Parallelization:** serial

**Coordination Notes:** This phase produces shared infrastructure consumed by all subsequent implementation phases. Must complete before Phases 11-25 begin. Pilot with 1-2 apps from different categories to validate the full pipeline end-to-end.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low (new infrastructure repo and templates — no contention with downstream repos)
**Review gates:** structural (benchmark dimension coverage, CI template correctness, variant scaffolding)

**Subagent lanes:** none

### Implementation

- Step 10.1: Design benchmarking dimensions, scoring rubric, and scorecard schema
  - Files: create `templates/scorecard-template.json`, create `templates/benchmark-config.md`
  - Define the 7 benchmark dimensions with concrete metrics, measurement methods, and per-metric scoring rubrics (raw → normalized 0-100).
  - Design composite scoring formula (weighted average across dimensions).
  - Define scorecard JSON schema: per-variant scores, per-dimension breakdowns, metadata (app ID, category, variant, timestamp, CI run ID).
  - Define aggregation schema: cross-app comparison tables, category-level rollups, variant-vs-variant comparison.

- Step 10.2: Create benchmarking harness repo on GitHub
  - Files: new repo `GeorgeQLe/mobile-benchmark-harness` (private)
  - Scaffold repo structure: `src/dimensions/`, `src/scoring/`, `src/aggregation/`, `templates/`, `docs/`, `package.json`, `tsconfig.json`, `README.md`.
  - Use Node.js/TypeScript as the harness runtime (consistent with existing scripts in this repo).
  - Include the scorecard schema from Step 10.1.
  - Seed with `gh repo create` following the same private-repo pattern as downstream seeding.

- Step 10.3: Implement performance and bundle size benchmark modules
  - Files: create `src/dimensions/performance.ts`, `src/dimensions/bundle-size.ts` in harness repo
  - Performance module: measure cold start (via `adb shell am start` / Xcode Instruments), warm start, frame rate (systrace/Instruments), memory (profiler snapshots), CPU, battery drain (estimated via power profiler).
  - Bundle size module: measure IPA size, APK/AAB size, OTA update size, asset breakdown (images, fonts, JS bundle, native libs).
  - Each module exports a `measure()` function returning raw metrics and a `score()` function returning normalized 0-100.

- Step 10.4: Implement UX fidelity and code quality benchmark modules
  - Files: create `src/dimensions/ux-fidelity.ts`, `src/dimensions/code-quality.ts` in harness repo
  - UX fidelity module: parse the build plan's route map and compare against implemented screens (directory listing), check interaction coverage against spec edge cases, output spec compliance percentage.
  - Code quality module: run lint (ESLint/SwiftLint/ktlint/flutter analyze), type coverage (tsc --noEmit/strict), test coverage (jest/xctest/gradle), compute cyclomatic complexity and maintainability index.

- Step 10.5: Implement developer velocity, accessibility, and store compliance modules
  - Files: create `src/dimensions/dev-velocity.ts`, `src/dimensions/accessibility.ts`, `src/dimensions/store-compliance.ts` in harness repo
  - Dev velocity: time clean build, incremental build, hot/live reload, CI pipeline duration.
  - Accessibility: run automated a11y audits (axe-core for RN/Expo, accessibility_scanner for Android, Accessibility Inspector for iOS), measure contrast ratios, touch target sizes.
  - Store compliance: check metadata completeness (app name, description, screenshots, privacy policy URL, categories), policy compliance checklist, privacy manifest accuracy.

- Step 10.6: Build composite scoring engine and aggregation dashboard schema
  - Files: create `src/scoring/composite.ts`, `src/aggregation/schema.ts`, `src/aggregation/rollup.ts` in harness repo
  - Composite scoring: weighted average across 7 dimensions (configurable weights with sensible defaults).
  - Aggregation: produce cross-app comparison JSON, category-level rollup summaries, variant-vs-variant comparison tables.
  - CLI entry point: `npx benchmark --app <repo> --variant <variant> --output <path>`.

- Step 10.7: Design and document multi-variant repo structure convention
  - Files: create `templates/variant-structure.md`, modify `templates/downstream/README.md`
  - Document the directory convention: `variants/react-native/`, `variants/flutter/`, `variants/expo/`, `variants/ios-native/`, `variants/android-native/`.
  - Each variant directory contains: `src/`, `package.json` or equivalent, variant-specific config, `README.md` with build/run instructions.
  - Shared assets directory: `shared/assets/`, `shared/api-contracts/`, `shared/test-fixtures/`.
  - Document how CI/CD templates reference variant paths.

- Step 10.8: Create CI/CD workflow templates for all 5 variant stacks
  - Files: create `templates/ci/react-native.yml`, `templates/ci/flutter.yml`, `templates/ci/expo.yml`, `templates/ci/ios-native.yml`, `templates/ci/android-native.yml`, `templates/ci/benchmark.yml`
  - Each template: build, lint, type check, test, and benchmark for its variant stack.
  - Benchmark workflow: runs after build, invokes the harness, uploads scorecard JSON as artifact.
  - Templates use reusable workflow patterns (GitHub Actions composite actions or reusable workflows).

- Step 10.9: Scaffold multi-variant structure in pilot repo
  - Files: modify pilot downstream repo (Todoist: `GeorgeQLe/todoist-mobile-clone`)
  - Create `variants/` directory structure with placeholder READMEs for each variant.
  - Copy CI/CD templates into `.github/workflows/`.
  - Add `shared/` directory scaffold.
  - Push and verify the structure is correct via `gh api`.

- Step 10.10: End-to-end pilot validation
  - Files: modify `tasks/todo.md` (mark 10.10 done), modify `tasks/history.md`
  - Run the benchmarking harness against the pilot repo's scaffold (expect baseline/zero scores since no implementation exists yet).
  - Verify scorecard JSON output has all 7 dimensions, composite score, and correct metadata.
  - Verify CI/CD templates parse correctly (GitHub Actions syntax validation).
  - Verify aggregation schema produces valid cross-app comparison output.
  - Document any issues and fix before marking Phase 10 complete.

### Milestone: Phase 10 — Benchmarking Infrastructure & Multi-Variant Repo Structure

**Acceptance Criteria:**
- [x] Benchmarking harness repo exists with automated scoring for all 7 benchmark dimensions.
- [x] CI/CD templates cover build, test, lint, and benchmark for all 5 variant stacks.
- [x] Multi-variant directory convention is documented and scaffolded in at least one pilot repo.
- [x] Scorecard template produces a normalized 0-100 composite score per variant.
- [x] Aggregation schema supports cross-app comparison and category-level rollups.

**On Completion** (filled 2026-05-10):
- Deviations from plan: None. All 10 steps completed as planned.
- Tech debt / follow-ups: GitHub Actions disabled on pilot repo until implementation begins. CLI entry point in harness is a stub (Step 10.6 deferred full CLI ergonomics).
- Ready for next phase: Yes — Phase 11 (Implementation: AI & Assistants).

---

## Phase 11: Implementation — AI & Assistants (~26 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the AI & Assistants category cluster to functional completion, passing the benchmarking harness.

**Scope**:
- Apps: AI assistants (ChatGPT, Gemini, Claude, Copilot, etc.), AI companions, and related AI-first apps.
- Per app: implement all five variants (React Native, Flutter, Expo, Native iOS, Native Android) following the build plan from Phase 9.
- Each variant must pass lint, type check, test suite, and benchmarking harness from Phase 10.
- Functional parity with the source spec — all screens, flows, edge cases, and data contracts implemented with original code and assets.

**Acceptance Criteria:**
- [ ] All ~26 apps have 5 working variants each (~130 app builds).
- [ ] Every variant passes CI (build, lint, type check, tests).
- [ ] Every variant has benchmark scores recorded in the scorecard.
- [ ] No proprietary assets, no trademark infringement, no copied code.
- [ ] Manual verification blockers documented but not falsely claimed as resolved.

**Parallelization:** agent-team

**Coordination Notes:** All apps in this cluster are independent repos. All 27 apps (and all 5 variants within each) can build in parallel. Share architectural patterns for LLM integration, streaming responses, conversation persistence, and tool/function calling across AI apps.

### Execution Profile

**Parallel mode:** agent-team
**Integration owner:** main agent
**Conflict risk:** low (each app is an independent GitHub repo)
**Review gates:** CI passing, benchmark scores, spec compliance, legal/asset review

**Subagent lanes:** none (per-step lanes defined at execution time — each step scaffolds or implements one app in its own downstream repo with no cross-repo writes)

### Implementation

- Step 11.1: Scaffold multi-variant structure across all 27 AI & Assistants repos
- Step 11.2: Implement pilot app 1 — ChatGPT clone (all 5 variants)
- Step 11.3: Implement pilot app 2 — Claude clone (all 5 variants)
- Step 11.4: Implement pilot app 3 — Perplexity clone (all 5 variants)
- Step 11.5: Implement pilot app 4 — Character.AI clone (all 5 variants)
- Step 11.6: Implement pilot app 5 — Replika clone (all 5 variants)
- Step 11.7: Implement batch apps 201-205 — Poe, Gemini, Copilot, Grok, DeepSeek (all 5 variants each)
- Step 11.8: Implement batch apps 206-210 — Meta AI, You.com, Pi, Phind, HuggingChat (all 5 variants each)
- Step 11.9: Implement batch apps 211-216 — Wysa, ELSA Speak, OtterPilot, Grammarly Keyboard, Wordtune, QuillBot (all 5 variants each)
- Step 11.10: Implement batch apps 217-222 — Ask AI, Genie, Monica, Notion AI, Forefront AI, Consensus (all 5 variants each)
- Step 11.11: Enable GitHub Actions and run CI validation across all 27 repos
- Step 11.12: Run benchmarking harness and record scorecards
- Step 11.13: Phase 11 final validation and cleanup

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 12: Implementation — Social, Dating & Community (39 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Social, Dating & Community cluster.

**Scope**:
- Apps: Social media (Instagram, TikTok, X, etc.), dating (Tinder, Bumble, Hinge, etc.), creator communities.
- Shared patterns: feed/timeline, profiles, matching algorithms, real-time messaging, content moderation, media upload/processing.

**Acceptance Criteria:**
- [ ] All 39 apps have 5 working variants each (195 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Content moderation and safety flows implemented per spec.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share feed rendering, media pipeline, and real-time messaging patterns across the cluster.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 13: Implementation — Messaging & Email (~37 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Messaging & Email cluster.

**Scope**:
- Apps: Messaging (WhatsApp, Signal, Telegram, etc.), email (Gmail, Outlook, ProtonMail, etc.), calling, video conferencing.
- Shared patterns: E2E encryption, real-time delivery, push notifications, thread/conversation views, attachment handling, offline queuing.

**Acceptance Criteria:**
- [ ] All ~37 apps have 5 working variants each (~185 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Encryption and privacy flows implemented per spec requirements.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share encryption, real-time transport, and notification patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 14: Implementation — Video & Music Streaming (~53 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Video & Music Streaming cluster.

**Scope**:
- Apps: Video streaming (YouTube, Netflix, Disney+, etc.), music streaming (Spotify, Apple Music, etc.), audio platforms.
- Shared patterns: adaptive bitrate streaming, offline downloads, playback controls, recommendation engines, content libraries, DRM-adjacent flows.

**Acceptance Criteria:**
- [ ] All ~53 apps have 5 working variants each (~265 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Streaming playback, queue management, and offline flows functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share media player, streaming infrastructure, and download manager patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 15: Implementation — Podcasts, Books & Reading (~42 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Podcasts, Books & Reading cluster.

**Scope**:
- Apps: Podcast players (Pocket Casts, Overcast, etc.), e-readers (Kindle, Libby, etc.), read-later (Pocket, Instapaper), book discovery.
- Shared patterns: RSS/feed parsing, audio playback with variable speed, reading progress sync, annotation/highlighting, offline content.

**Acceptance Criteria:**
- [ ] All ~42 apps have 5 working variants each (~210 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Reading/listening progress sync and offline content functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share audio player, content parser, and progress sync patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 16: Implementation — Photo & Video Creation (~47 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Photo & Video Creation cluster.

**Scope**:
- Apps: Photo editors (Snapseed, VSCO, Lightroom, etc.), video editors (CapCut, InShot, etc.), camera apps.
- Shared patterns: image/video processing pipelines, filter/effect systems, layer compositing, export/share, timeline editing, GPU-accelerated rendering.

**Acceptance Criteria:**
- [ ] All ~47 apps have 5 working variants each (~235 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Core editing workflows (crop, filter, adjust, export) functional across variants.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share image processing, filter pipeline, and export patterns. Native variants may have significant advantages for GPU access.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 17: Implementation — Shopping, Commerce & Classifieds (~65 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Shopping, Commerce & Classifieds cluster.

**Scope**:
- Apps: Shopping (Amazon, eBay, Etsy, etc.), creator commerce (Gumroad, Shopify, etc.), classifieds (Craigslist, OfferUp, etc.), automotive marketplaces.
- Shared patterns: product catalog, search/filter, cart/checkout, payment integration, seller dashboards, listing creation, reviews/ratings.

**Acceptance Criteria:**
- [ ] All ~65 apps have 5 working variants each (~325 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Browse, search, cart, and checkout flows functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share catalog, search, cart, and payment patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 18: Implementation — Food, Delivery & Grocery (~77 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Food, Delivery & Grocery cluster.

**Scope**:
- Apps: Food delivery (DoorDash, UberEats, etc.), grocery (Instacart, Walmart, etc.), restaurant loyalty, meal planning, recipe apps.
- Shared patterns: location-based search, real-time order tracking, cart/checkout, driver/delivery tracking, menu/catalog browsing, loyalty programs.

**Acceptance Criteria:**
- [ ] All ~77 apps have 5 working variants each (~385 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Order flow, real-time tracking, and location-based features functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share location services, order tracking, and map integration patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 19: Implementation — Finance & Payments (~65 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Finance & Payments cluster.

**Scope**:
- Apps: Banking (Chase, Revolut, etc.), investing (Robinhood, E*TRADE, etc.), payments (PayPal, Venmo, etc.), crypto, budgeting, neobanks.
- Shared patterns: account dashboards, transaction history, transfer flows, portfolio views, charts/graphs, biometric auth, PCI-adjacent security patterns.

**Acceptance Criteria:**
- [ ] All ~65 apps have 5 working variants each (~325 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Financial data display, transaction flows, and security patterns functional.
- [ ] Category-specific risk review for finance/regulated features documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share financial chart, transaction, and security patterns. Extra care for regulated feature blockers.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 20: Implementation — Travel & Transportation (~79 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Travel & Transportation cluster.

**Scope**:
- Apps: Travel booking (Booking.com, Airbnb, Expedia, etc.), airlines (United, Delta, etc.), ride-hailing (Uber, Lyft, etc.), transit, car rental.
- Shared patterns: search/filter with dates/locations, booking flows, itinerary management, real-time vehicle tracking, boarding passes, maps integration.

**Acceptance Criteria:**
- [ ] All ~79 apps have 5 working variants each (~395 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Search, booking, and itinerary flows functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share booking, calendar, map, and itinerary patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 21: Implementation — Health, Fitness & Wellness (~81 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Health, Fitness & Wellness cluster.

**Scope**:
- Apps: Fitness (Strava, Peloton, MyFitnessPal, etc.), health (WebMD, MyChart, etc.), wellness (Calm, Headspace, etc.), telehealth, parenting/family safety.
- Shared patterns: activity tracking, workout logging, health data visualization, HealthKit/Google Fit integration, guided content playback, appointment booking.

**Acceptance Criteria:**
- [ ] All ~81 apps have 5 working variants each (~405 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Health data tracking, workout flows, and guided content functional.
- [ ] Category-specific risk review for health/medical features documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share health data, activity tracking, and guided content patterns. Extra care for health-adjacent regulatory blockers.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 22: Implementation — Education & Learning (~31 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Education & Learning cluster.

**Scope**:
- Apps: Education (Duolingo, Khan Academy, Coursera, etc.), language learning, LMS platforms, tutoring.
- Shared patterns: lesson/course structure, progress tracking, quizzes/assessments, gamification, spaced repetition, video lessons, certificates.

**Acceptance Criteria:**
- [ ] All ~31 apps have 5 working variants each (~155 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Lesson flow, progress tracking, and assessment features functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share lesson structure, gamification, and progress tracking patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 23: Implementation — Productivity & Collaboration (~72 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Productivity & Collaboration cluster.

**Scope**:
- Apps: Task management (Todoist, Notion, Trello, etc.), documents (Google Docs, etc.), scheduling (Calendly, etc.), notes, project management, cloud storage, translation, creator tools.
- Shared patterns: CRUD with real-time sync, drag-and-drop, rich text editing, calendar views, file management, sharing/permissions, offline support.

**Acceptance Criteria:**
- [ ] All ~72 apps have 5 working variants each (~360 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Core CRUD, sync, and collaboration features functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share real-time sync, rich text editing, and file management patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 24: Implementation — News, Maps & Navigation (~57 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the News, Maps & Navigation cluster.

**Scope**:
- Apps: News (Reddit, Flipboard, etc.), maps/weather (Google Maps, Weather Channel, etc.), outdoor/navigation, international navigation.
- Shared patterns: feed/article rendering, map rendering, turn-by-turn navigation, weather data display, offline maps, location services.

**Acceptance Criteria:**
- [ ] All ~57 apps have 5 working variants each (~285 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Feed rendering, map display, and navigation flows functional.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share map rendering, feed, and location patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 25: Implementation — Home, Security, Cloud & Enterprise (~137 Apps × 5 Variants)

**Goal**: Build all five variants for every app in the Home, Security, Cloud & Enterprise cluster. Largest cluster — may be split into sub-phases during `/plan-phase`.

**Scope**:
- Apps: Smart home (Nest, Ring, Hue, etc.), security/VPN (NordVPN, 1Password, etc.), cloud/identity (Google Drive, Dropbox, etc.), enterprise ops (Salesforce, ServiceNow, etc.), developer tools (GitHub, VS Code, etc.), real estate, jobs, parental controls.
- Shared patterns: device management, secure tunneling, file sync, enterprise dashboards, code editing, property listings, job search, family controls.

**Acceptance Criteria:**
- [ ] All ~137 apps have 5 working variants each (~685 app builds).
- [ ] Every variant passes CI and has benchmark scores recorded.
- [ ] Core workflows per sub-category functional.
- [ ] Category-specific risk reviews for smart home, security, child-directed, and enterprise features documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Largest cluster — `/plan-phase` should consider splitting into 2-3 sub-phases (e.g., Home/Security, Cloud/Enterprise, DevTools/Other) to manage scope. Share device integration, file sync, and dashboard patterns.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 26: Cross-Version Benchmarking & Winner Selection

**Goal**: Run the full benchmarking suite across all 5000 app variants (1000 apps × 5 variants), select the winning variant per app, and produce a comprehensive comparison report.

**Scope**:
- Run automated benchmarks for all 7 dimensions on every variant:
  - Performance (cold start, warm start, frame rate, memory, CPU, battery)
  - Bundle size (IPA, APK/AAB, OTA, asset breakdown)
  - UX fidelity (spec compliance: screens, interactions, edge cases)
  - Code quality (lint, type coverage, test coverage, complexity, maintainability)
  - Developer velocity (clean build, incremental build, hot reload, CI duration)
  - Accessibility (VoiceOver/TalkBack audit, contrast, touch targets)
  - Store compliance (metadata, policy, screenshots, privacy manifest)
- Per-app scorecard with normalized 0-100 composite score per variant.
- Category-level rollup reports showing which variant stack wins most often per category.
- Global summary: overall stack ranking across all 1000 apps.
- Winner selection per app based on composite score (ties broken by performance, then bundle size).
- Regression audit: verify winners still pass full CI after final selection.

**Acceptance Criteria:**
- [ ] All 5000 variants have complete benchmark scorecards.
- [ ] Per-app winner selected with documented rationale.
- [ ] Category-level and global rollup reports generated.
- [ ] All 1000 winning variants pass full CI regression.
- [ ] Benchmark data stored in a queryable format for future analysis.

**Parallelization:** agent-team

**Coordination Notes:** Benchmarking is read-only against built artifacts — all 1000 apps can benchmark in parallel. Scorecard aggregation is serial. Winner selection requires all scorecards complete.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Phase 27: App Store & Play Store Submission

**Goal**: Prepare and submit all 1000 winning app variants to the Apple App Store and Google Play Store.

**Scope**:
- Per app: prepare store assets for the winning variant:
  - App icon (1024×1024 + required sizes)
  - Screenshots (iPhone 6.7", 6.5", 5.5"; iPad 12.9"; Android phone + tablet)
  - App preview videos (optional but recommended)
  - Store listing copy (title, subtitle, description, keywords, category)
  - Privacy policy URL and privacy nutrition label / data safety form
  - Age rating questionnaire
  - App signing (iOS certificates + provisioning profiles; Android signing key)
- Build release artifacts (IPA for App Store, AAB for Play Store).
- Submit to App Store Connect and Google Play Console.
- Address review feedback and resubmit as needed.
- Track approval status per app.

**Manual Tasks:**
- Apple Developer Program enrollment ($99/year) and provisioning profile setup _(blocks: Step 27.1)_
- Google Play Developer account enrollment ($25 one-time) _(blocks: Step 27.1)_
- Privacy policy hosting for all 1000 apps _(blocks: Step 27.2)_
- App Store review response and resubmission for rejections _(after: Step 27.4)_
- Play Store review response and resubmission for rejections _(after: Step 27.4)_

**Acceptance Criteria:**
- [ ] All 1000 apps submitted to both App Store and Play Store.
- [ ] All store listings have complete metadata, screenshots, and privacy policies.
- [ ] All apps pass automated store compliance checks before submission.
- [ ] Submission status tracked per app with approval/rejection/resubmission state.
- [ ] No trademark infringement, no proprietary assets, no copied code in any submission.

**Parallelization:** agent-team

**Coordination Notes:** Store asset generation is parallelizable across apps. Submissions may need to be staggered to avoid bulk-submission flags from Apple/Google. Review response is inherently serial per app.

**On Completion** (fill in when phase is done):
- Deviations from plan: 
- Tech debt / follow-ups: 
- Ready for next phase: 

---

## Deferred / Future Work

- Post-launch analytics, crash monitoring, and user feedback collection for all 1000 apps.
- Version 2.0 feature updates based on store reviews and user feedback.
- A/B testing between top-2 variant stacks per app category.
- Monetization strategy per app (ads, subscriptions, in-app purchases).
- Localization and internationalization for non-English markets.
- Watch/TV/tablet-specific variants beyond phone form factor.

## Cross-Phase Concerns

### Multi-Variant Build Infrastructure
- Phase 10 produces shared CI/CD and benchmarking infrastructure consumed by Phases 11-26.
- All implementation phases (11-25) must use the same variant directory convention and scorecard format.

### Legal & Compliance
- Every phase must maintain lawful functional parity — no proprietary assets, trademarks, or copied code.
- Regulated categories (finance, health, child-directed, smart home) require category-specific risk review before store submission.
- Privacy policies must be app-specific and accurate to each app's data practices.

### Store Submission Strategy
- Apple and Google may flag bulk submissions from a single developer account.
- Consider multiple developer accounts or staggered submission windows.
- Each app needs a unique bundle ID / package name.

## Next Steps

- Begin Phase 9: generate detailed build plans for all 1000 downstream repos.
- Keep all manual verification blockers deferred until lawful hands-on verification evidence exists.
