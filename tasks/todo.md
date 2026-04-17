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
- [ ] Upgrade the remaining 56 specs by batch after the Batch 01 and Batch 02 patterns are proven.

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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 56 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade Batch 03 food/local discovery specs

### Scope

- Upgrade the next Batch 03 Draft 1 specs: `specs/batch-03/041-starbucks.md`, `specs/batch-03/042-mcdonalds.md`, `specs/batch-03/043-opentable.md`, `specs/batch-03/044-yelp.md`, and `specs/batch-03/045-too-good-to-go.md`.
- Archive each current Draft 1 file under `docs/history/archive/2026-04-17/phase-3-batch-03-food-local-discovery-readiness/` before rewriting.
- Rewrite each selected spec to implementation-ready public-source V1 status using the evidence depth now present in the completed `038-doordash.md`, `039-uber-eats.md`, `040-instacart.md`, `033-airbnb.md`, Batch 02 travel booking specs `034-037`, maps/mobility specs `027-032`, and Batch 02 communication/email patterns.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `specs/README.md`, `specs/batch-03/README.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party URLs for Starbucks, McDonald's, OpenTable, Yelp, and Too Good To Go.
- Prioritize public sources for account model, mobile screens, core workflows, help/support, safety/privacy, terms, loyalty/rewards, data export/deletion, notifications, location/store/business permissions, restaurant ordering, reservations/waitlists, local search/reviews, surplus food pickup windows, cart/checkout where relevant, live order/reservation status, merchant/restaurant/business tooling, refunds/credits, regulated items, payments, disputes, regional availability, and accessibility.
- Keep account onboarding, paid membership or loyalty enrollment, payment authorization, checkout, refunds/credits, live order/reservation status, merchant/restaurant/business tooling, regulated items, push payloads, data deletion/export, and device-specific behavior as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan for each upgraded spec.
- Treat payments, identity, refunds/credits, tips, taxes/fees, loyalty/rewards, restaurant operations, reservation integrity, review integrity, surplus food safety, regulated items, marketplace trust, merchant/store/business operations, accessibility, data deletion, support/disputes, and regional availability as category risk areas where relevant.
- Do not claim exact native parity for any account, paid, notification, deletion/export, support, checkout, loyalty/reward, restaurant/store inventory, reservation, review moderation, merchant/business admin, or platform-specific flow until verified.

### Validation

- Confirm the upgraded specs each have exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from each upgraded Batch 03 food/local discovery spec.
- Confirm readiness counts and next-step references advance from 44 completed specs to the new batch total.
