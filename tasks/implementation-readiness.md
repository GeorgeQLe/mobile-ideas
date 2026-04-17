# Implementation Readiness Gate

Created: 2026-04-16
Updated: 2026-04-16

## Verdict

The spec set is moving from Draft 1 scaffolds to implementation-ready specs one app at a time.

Current readiness count: 6 of 100.

## Readiness Definition

A numbered app spec is implementation-ready only when it has all of the following:

- Exact first-party App Store and Google Play URLs, or an explicit platform blocker.
- Exact first-party help, support, privacy, terms, and public product documentation URLs.
- Current public listing details summarized into source-backed requirements.
- App-specific screen inventory, data model, API contracts, offline behavior, analytics, edge cases, and tests.
- Manual verification blockers listed with owner/path, or hands-on notes captured from lawful test devices/accounts.
- Category risk review with launch-blocking mitigations for safety, privacy, regulated, marketplace, health, finance, location, media, or smart-home concerns.
- A build plan that names phases, major routes/entities/contracts, seed data needs, and acceptance tests.

## Status Table

| ID | App | Status | Notes |
|---:|---|---|---|
| 001 | ChatGPT | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; native/manual parity blockers remain explicit. |
| 006 | TikTok | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; creator, account, LIVE, Shop, Coins/gifts, notification, and teen/family manual blockers remain explicit. |
| 016 | WhatsApp | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; phone verification, contacts, backups, linked devices, calls, business, payments, AI, and native/manual parity blockers remain explicit. |
| 026 | Google Maps | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; live navigation, traffic, transit, offline maps, location sharing, Timeline/activity controls, contributions, business, AR, vehicle/watch, and native/manual parity blockers remain explicit. |
| 033 | Airbnb | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; booking, checkout, fees/taxes, messaging, reviews, wishlists, identity, cancellations/refunds, host tools, payouts, damage/disputes, safety, and native/manual parity blockers remain explicit. |
| 038 | DoorDash | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; restaurant/store marketplace, menu modifiers, cart/checkout fees, DashPass, SNAP/EBT, alcohol, order tracking, Dasher handoff, merchant tools, support/refunds, and native/manual parity blockers remain explicit. |
| 002-005, 007-015, 017-025, 027-032, 034-037, 039-100 | Remaining specs | Draft 1 scaffold | Must be upgraded app-by-app using the readiness definition above. |

## Repeatable Upgrade Loop

For each spec:

1. Archive the Draft 1 spec under `docs/history/archive/YYYY-MM-DD/HHMMSS/`.
2. Replace source-discovery links with exact first-party URLs.
3. Capture public source evidence as source-backed product requirements.
4. Replace category-template sections with app-specific contracts.
5. Add manual verification blockers with explicit launch behavior.
6. Add a concrete build plan.
7. Update this file, `tasks/spec-quality-audit.md`, `tasks/todo.md`, and `tasks/history.md`.

## Current Batch Priority

Start with the architecture-teaching apps from `tasks/ideas.md`:

1. `001-chatgpt.md`
2. `006-tiktok.md`
3. `016-whatsapp.md`
4. `026-google-maps.md`
5. `033-airbnb.md`
6. `038-doordash.md`
7. `046-amazon.md`
8. `056-cash-app.md`
9. `066-spotify.md`
10. `089-notion.md`

## Next Steps

- Upgrade `046-amazon.md` using the same readiness gate.
- Continue the top-ten architecture-teaching apps before remediating the remaining 90 by batch.
