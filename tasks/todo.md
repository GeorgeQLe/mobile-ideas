# Todo

## Priority Task Queue

- [x] Upgrade `006-tiktok.md` to implementation-ready status using the `001-chatgpt.md` pattern.
- [x] Upgrade `016-whatsapp.md` to implementation-ready status.
- [x] Upgrade `026-google-maps.md` to implementation-ready status.
- [x] Upgrade `033-airbnb.md` to implementation-ready status.
- [x] Upgrade `038-doordash.md` to implementation-ready status.
- [x] Upgrade `046-amazon.md` to implementation-ready status.
- [x] Upgrade `056-cash-app.md` to implementation-ready status.
- [x] Upgrade `066-spotify.md` to implementation-ready status.
- [x] Upgrade the remaining top-ten architecture-teaching spec: `089-notion.md`.
- [x] Upgrade remaining Batch 01 AI/social Draft 1 specs: `002-005` and `007-015`.
- [x] Upgrade Batch 02 communication/email specs: `021-025`.
- [x] Upgrade Batch 02 maps/mobility specs: `027-032`.
- [x] Upgrade Batch 02 travel booking specs: `034-037`.
- [x] Upgrade Batch 02 food/grocery delivery specs: `039-040`.
- [ ] Upgrade the remaining 51 specs by batch after the Batch 01, Batch 02, and early Batch 03 patterns are proven.

## Phase 2: Hygiene And Draft 1 Remediation

- [x] Add `CLAUDE.md` with project conventions.
- [x] Add `tasks/roadmap.md` with phase structure.
- [x] Add `tasks/history.md` with dated project history.
- [x] Add `## Next Steps` to generated task artifacts.
- [x] Rewrite all numbered specs into canonical Draft 1 structure.
- [x] Run final hygiene and quality validation.
- [x] Commit and push remediation work.

## Phase 3: Exact Source Replacement And Hands-On Verification

- [x] Define the implementation-readiness gate in `tasks/implementation-readiness.md`.
- [x] Upgrade `001-chatgpt.md` from Draft 1 scaffold to implementation-ready public-source V1 spec.
- [x] Upgrade `017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md` to implementation-ready public-source V1 status.
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 51 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade Batch 03 commerce/resale specs

### Scope

- Upgrade the next Batch 03 Draft 1 specs: `specs/batch-03/047-temu.md`, `specs/batch-03/048-shein.md`, `specs/batch-03/049-etsy.md`, `specs/batch-03/050-ebay.md`, `specs/batch-03/051-facebook-marketplace.md`, `specs/batch-03/052-poshmark.md`, `specs/batch-03/053-depop.md`, `specs/batch-03/054-stockx.md`, and `specs/batch-03/055-shop.md`.
- Archive each current Draft 1 file under `docs/history/archive/2026-04-17/phase-3-batch-03-commerce-resale-readiness/` before rewriting.
- Rewrite each selected spec to implementation-ready public-source V1 status using the evidence depth now present in the completed `046-amazon.md`, `041-starbucks.md` through `045-too-good-to-go.md`, `038-doordash.md`, `039-uber-eats.md`, `040-instacart.md`, Batch 02 travel booking specs `034-037`, maps/mobility specs `027-032`, and Batch 02 communication/email patterns.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `specs/README.md`, `specs/batch-03/README.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party URLs for Temu, SHEIN, Etsy, eBay, Facebook Marketplace, Poshmark, Depop, StockX, and Shop.
- Prioritize public sources for account model, mobile screens, core workflows, help/support, safety/privacy, terms, buyer/seller protections, cart/checkout, product/listing detail, search/ranking, offers/bids, resale authentication, returns/refunds, disputes, shipping/tracking, notifications, data export/deletion, marketplace/business permissions, ads/promotions, payments/payouts, prohibited goods, regional availability, and accessibility.
- Keep account onboarding, paid membership enrollment, payment authorization, checkout, buyer/seller messaging, refunds/returns, shipping labels/tracking, seller payouts, dispute resolution, authenticity checks, ads/promotions, prohibited goods, push payloads, data deletion/export, and device-specific behavior as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan for each upgraded spec.
- Treat payments, identity, refunds/returns, taxes/fees, shipping, seller payouts, authenticity verification, review integrity, counterfeit/prohibited goods, marketplace trust, seller/business operations, ads/promotions, accessibility, data deletion, support/disputes, and regional availability as category risk areas where relevant.
- Do not claim exact native parity for any account, paid, notification, deletion/export, support, checkout, payment, payout, return/refund, shipping, seller, review moderation, ads, authentication, or platform-specific flow until verified.

### Validation

- Confirm the upgraded specs each have exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from each upgraded Batch 03 commerce/resale spec.
- Confirm readiness counts and next-step references advance from 49 completed specs to the new batch total.
