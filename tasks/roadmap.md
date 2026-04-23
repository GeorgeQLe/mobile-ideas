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
| Phase 7 | Active | Backlog extension pipeline for IDs 101-200 (Draft 0 -> readiness -> seeding). |
| Phase 8 | Active | Backlog and Draft 1 scaffold extension for IDs 201-1000. |

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
- [ ] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [ ] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [ ] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [ ] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

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

### Milestone: Phase 6 Downstream Repository Seeding And Spec Store Publication

**Acceptance Criteria:**

- [x] `tasks/repo-seeding.md` lists all 100 target repos and source specs.
- [x] A reusable `gh` seeding command pattern exists.
- [ ] The `gh` seeding command pattern has been tested on one non-Todoist repo.
- [ ] Existing `GeorgeQLe/todoist-mobile-clone` is reconciled with the same seed structure used for the other repos.
- [ ] All 100 downstream repos exist or have explicit blocker notes in `tasks/repo-seeding.md`.
- [ ] This spec-store repo has a public-release checklist covering license, README, contribution policy, legal scope, attribution/non-affiliation language, and content audit.
- [ ] This spec-store repo is made public only after the open-source checklist is complete and explicitly approved.

**On Completion**

- Deviations from plan: none recorded yet.
- Tech debt / follow-ups: none recorded yet.
- Ready for next phase: no.

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
- [ ] Step 7.3: Implementation-readiness upgrades for IDs 101-200.
- [ ] Step 7.4: Extend `tasks/roadmap.md` Phase 5 plan queue and `tasks/repo-seeding.md` manifest to 200 rows.
- [ ] Step 7.5: Seed 100 new private downstream repos via `scripts/seed-downstream-repos.mjs`.
- [ ] Step 7.6: Close Phase 7 after verification.

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
- [ ] Step 8.3: Replace source-discovery links with exact first-party URLs and promote IDs 201-1000 to implementation-ready public-source V1.
- [ ] Step 8.4: Extend Phase 5 implementation-plan queue to 1000 rows.
- [ ] Step 8.5: Extend `tasks/repo-seeding.md` manifest to 1000 rows after readiness upgrades.
- [ ] Step 8.6: Seed downstream private repos only with explicit approval and batch-level controls.

### Acceptance Criteria

- 1000 total spec files exist with canonical sections.
- All 1000 IDs are represented in `tasks/ideas.md` and `specs/batch-*`.
- IDs 201-1000 remain clearly marked Draft 1 scaffold until exact first-party source replacement and category-risk review are complete.
- No downstream repo is made public during the extension.

## Next Steps

- Complete Phase 7 Step 7.3 for IDs 101-200 and Phase 8 Step 8.3 for IDs 201-1000 before downstream seeding.
- Continue implementation planning and scaffolding in `https://github.com/GeorgeQLe/todoist-mobile-clone` for Phase 5 plan `090`.
- Select the next Phase 5 plan row when ready, then expand that app into detailed downstream implementation phases from its source spec.
- Keep all manual verification blockers deferred until lawful hands-on verification evidence exists.
