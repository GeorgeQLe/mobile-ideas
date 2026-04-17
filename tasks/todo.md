# Todo

## Priority Task Queue

- [x] Upgrade `006-tiktok.md` to implementation-ready status using the `001-chatgpt.md` pattern.
- [x] Upgrade `016-whatsapp.md` to implementation-ready status.
- [x] Upgrade `026-google-maps.md` to implementation-ready status.
- [x] Upgrade `033-airbnb.md` to implementation-ready status.
- [x] Upgrade `038-doordash.md` to implementation-ready status.
- [x] Upgrade `046-amazon.md` to implementation-ready status.
- [ ] Upgrade the remaining top-ten architecture-teaching specs: `056-cash-app.md`, `066-spotify.md`, and `089-notion.md`.
- [ ] Upgrade the remaining 90 specs by batch after the top-ten patterns are proven.

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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 93 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade `056-cash-app.md`

### Scope

- Archive the current Draft 1 file at `specs/batch-03/056-cash-app.md` under `docs/history/archive/2026-04-17/`.
- Rewrite `specs/batch-03/056-cash-app.md` to implementation-ready public-source V1 status using the structure and evidence depth now present in `specs/batch-01/001-chatgpt.md`, `specs/batch-01/006-tiktok.md`, `specs/batch-01/016-whatsapp.md`, `specs/batch-02/026-google-maps.md`, `specs/batch-02/033-airbnb.md`, `specs/batch-02/038-doordash.md`, and `specs/batch-03/046-amazon.md`.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party Cash App and Block/Square URLs.
- Prioritize public sources for peer payments, Cash App balance, Cash Card, direct deposit, Boosts/offers, savings, paper money deposits, ATM withdrawals, cash out, tax forms, disputes/chargebacks, scams/fraud warnings, account security, limits, identity verification, bitcoin-like flows, investing entry points, teen/family accounts, business accounts, accessibility, privacy controls, data/account deletion, and platform terms.
- Keep device/account, identity, payment, banking, debit card, tax, bitcoin, investing, teen/family, dispute, chargeback, fraud, and regulated financial flows as manual blockers unless verified lawfully with test accounts/devices and any required sandbox/provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan.
- Treat money movement, stored value, debit cards, bank linking, KYC/identity verification, bitcoin, investing, taxes, disputes/chargebacks, fraud/scams, account takeover, teen/family controls, business payments, privacy, accessibility claims, and regional availability as category risk areas.
- Do not claim exact native parity for peer payments, cash out, Cash Card, Boosts, direct deposit, bank linking, bitcoin, investing, taxes, disputes, chargebacks, identity verification, push payloads, account deletion, or support flows until verified.

### Validation

- Confirm the upgraded spec has exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from `056-cash-app.md`.
- Confirm readiness counts and next-step references advance from Amazon completion to Cash App completion and then Spotify.
