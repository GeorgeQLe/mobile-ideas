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

## Next Steps

- Upgrade `033-airbnb.md` using the `001-chatgpt.md`, `006-tiktok.md`, `016-whatsapp.md`, and `026-google-maps.md` patterns.
