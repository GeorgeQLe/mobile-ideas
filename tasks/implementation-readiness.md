# Implementation Readiness Gate

Created: 2026-04-16
Updated: 2026-04-17

## Verdict

The spec set is moving from Draft 1 scaffolds to implementation-ready specs by focused batches.

Current readiness count: 23 of 100.

## Readiness Definition

A numbered app spec is implementation-ready only when it has all of the following:

- Exact first-party App Store and Google Play URLs, or an explicit platform blocker.
- Exact first-party help, support, privacy, terms, and public product documentation URLs.
- Current public listing details summarized into source-backed requirements.
- App-specific screen inventory, data model, API contracts, offline behavior, analytics, edge cases, and tests.
- Manual verification blockers listed with owner/path, or hands-on notes captured from lawful test devices/accounts.
- Category risk review with launch-blocking mitigations for safety, privacy, regulated, marketplace, health, finance, location, media, AI, social, messaging, child/teen, or smart-home concerns.
- A build plan that names phases, major routes/entities/contracts, seed data needs, and acceptance tests.

## Status Table

| ID | App | Status | Notes |
|---:|---|---|---|
| 001 | ChatGPT | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; native/manual parity blockers remain explicit. |
| 002 | Claude | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; ai assistant risks and native/manual parity blockers remain explicit. |
| 003 | Perplexity | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; ai search risks and native/manual parity blockers remain explicit. |
| 004 | Character.AI | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; ai companion risks and native/manual parity blockers remain explicit. |
| 005 | Replika | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; ai companion risks and native/manual parity blockers remain explicit. |
| 007 | Instagram | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; social media risks and native/manual parity blockers remain explicit. |
| 008 | Snapchat | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; camera social risks and native/manual parity blockers remain explicit. |
| 009 | BeReal | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; social media risks and native/manual parity blockers remain explicit. |
| 010 | Reddit | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; community risks and native/manual parity blockers remain explicit. |
| 011 | X | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; social media risks and native/manual parity blockers remain explicit. |
| 012 | Bluesky | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; social media risks and native/manual parity blockers remain explicit. |
| 013 | Threads | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; social media risks and native/manual parity blockers remain explicit. |
| 014 | Pinterest | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; discovery risks and native/manual parity blockers remain explicit. |
| 015 | Lemon8 | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; lifestyle social risks and native/manual parity blockers remain explicit. |
| 006 | TikTok | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; creator, account, LIVE, Shop, Coins/gifts, notification, and teen/family manual blockers remain explicit. |
| 016 | WhatsApp | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; phone verification, contacts, backups, linked devices, calls, business, payments, AI, and native/manual parity blockers remain explicit. |
| 026 | Google Maps | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; live navigation, traffic, transit, offline maps, location sharing, Timeline/activity controls, contributions, business, AR, vehicle/watch, and native/manual parity blockers remain explicit. |
| 033 | Airbnb | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; booking, checkout, fees/taxes, messaging, reviews, wishlists, identity, cancellations/refunds, host tools, payouts, damage/disputes, safety, and native/manual parity blockers remain explicit. |
| 038 | DoorDash | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; restaurant/store marketplace, menu modifiers, cart/checkout fees, DashPass, SNAP/EBT, alcohol, order tracking, Dasher handoff, merchant tools, support/refunds, and native/manual parity blockers remain explicit. |
| 046 | Amazon | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; broad shopping marketplace, product search/detail, seller offers, cart/checkout, Prime-style membership, recurring orders, order tracking, returns/refunds/replacements, seller tools, sponsored listings, reviews, support, and native/manual parity blockers remain explicit. |
| 056 | Cash App | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; peer payments, requests, payment links, pools, balance, cash out, debit, direct deposit, savings/offers, merchant checkout, bitcoin, investing, taxes, sponsored accounts, business accounts, security/scam controls, and native/manual parity blockers remain explicit. |
| 066 | Spotify | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; music, podcasts, audiobooks, playlists, queue, downloads/offline, lyrics, device handoff, shared listening, family/young-listener controls, creator tools, ads, developer playback constraints, and native/manual parity blockers remain explicit. |
| 089 | Notion | Implementation-ready for public-source V1 | Exact public sources replaced discovery links; workspace pages, blocks, databases, search, sharing/permissions, comments/mentions, notifications, offline pages, imports/exports, AI, integrations/API, billing, privacy, security, and enterprise/admin blockers remain explicit. |
| 017-025, 027-032, 034-037, 039-045, 047-055, 057-065, 067-088, 090-100 | Remaining specs | Draft 1 scaffold | Must be upgraded app-by-app or by focused batch using the readiness definition above. |

## Repeatable Upgrade Loop

For each spec:

1. Archive the Draft 1 spec under `docs/history/archive/YYYY-MM-DD/<phase-or-batch>/`.
2. Replace source-discovery links with exact first-party URLs.
3. Capture public source evidence as source-backed product requirements.
4. Replace category-template sections with app-specific contracts.
5. Add manual verification blockers with explicit launch behavior.
6. Add a concrete build plan.
7. Update this file, `tasks/spec-quality-audit.md`, `specs/README.md`, `specs/batch-*/README.md`, `tasks/todo.md`, and `tasks/history.md`.

## Completed Pattern Set

- Top-ten architecture-teaching pattern set: `001-chatgpt.md`, `006-tiktok.md`, `016-whatsapp.md`, `026-google-maps.md`, `033-airbnb.md`, `038-doordash.md`, `046-amazon.md`, `056-cash-app.md`, `066-spotify.md`, and `089-notion.md`.
- Batch 01 public-source V1 expansion: `002-claude.md`, `003-perplexity.md`, `004-character-ai.md`, `005-replika.md`, and `007-instagram.md` through `015-lemon8.md`.

## Next Steps

- Upgrade the remaining Batch 01 tail specs: `017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md`.
- Continue Phase 3 exact source replacement and hands-on blocker documentation through later batches.
