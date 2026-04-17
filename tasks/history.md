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

## Next Steps

- Upgrade `034-booking-com.md`, `035-expedia.md`, `036-hopper.md`, and `037-tripit.md` as the next Batch 02 travel booking pass.
- Continue the remaining 62 Draft 1 specs by batch using the completed Batch 01, top-ten, and Batch 02 communication/email/maps/mobility pattern sets.
