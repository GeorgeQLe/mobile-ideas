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

## Next Steps

- Upgrade `089-notion.md` using the `001-chatgpt.md`, `006-tiktok.md`, `016-whatsapp.md`, `026-google-maps.md`, `033-airbnb.md`, `038-doordash.md`, `046-amazon.md`, `056-cash-app.md`, and `066-spotify.md` patterns.
