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
- [ ] Upgrade the remaining 62 specs by batch after the Batch 01 and Batch 02 communication/email/maps/mobility patterns are proven.

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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 62 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade Batch 02 travel booking specs

### Scope

- Upgrade the next Batch 02 Draft 1 specs: `specs/batch-02/034-booking-com.md`, `specs/batch-02/035-expedia.md`, `specs/batch-02/036-hopper.md`, and `specs/batch-02/037-tripit.md`.
- Archive each current Draft 1 file under `docs/history/archive/2026-04-17/phase-3-batch-02-travel-booking-readiness/` before rewriting.
- Rewrite each selected spec to implementation-ready public-source V1 status using the evidence depth now present in the completed `033-airbnb.md`, maps/mobility specs `027-032`, `038-doordash.md`, and Batch 02 communication/email patterns.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `specs/README.md`, `specs/batch-02/README.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party URLs for Booking.com, Expedia, Hopper, and TripIt.
- Prioritize public sources for account model, mobile screens, core workflows, help/support, safety/privacy, terms, loyalty/subscriptions, data export/deletion, notifications, location permissions, lodging/flight/car/activity search, booking checkout, itinerary import/organization, price alerts, cancellation/refund policies, payments, disputes, marketplace/provider operations, regional availability, and travel disruption support.
- Keep account onboarding, paid/loyalty/member pricing, payment authorization, booking checkout, refund/cancellation, itinerary import from email/calendar, push payloads, partner-provider inventory, travel disruption, airline/hotel/car-provider handoff, data deletion/export, and device-specific behavior as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan for each upgraded spec.
- Treat payments, identity, cancellation/refund rules, taxes/fees, travel-provider handoff, lodging safety, flight disruption, price prediction/alerts, loyalty/member pricing, marketplace trust, itinerary import privacy, accessibility, data deletion, support/disputes, and regional availability as category risk areas where relevant.
- Do not claim exact native parity for any account, paid, notification, deletion/export, support, booking, itinerary import, provider inventory, cancellation/refund, loyalty, marketplace, admin, or platform-specific flow until verified.

### Validation

- Confirm the upgraded specs each have exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from each upgraded Batch 02 travel booking spec.
- Confirm readiness counts and next-step references advance from 38 completed specs to the new batch total.
