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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 90 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade remaining Batch 01 Draft 1 specs

### Scope

- Upgrade the remaining Batch 01 Draft 1 specs: `specs/batch-01/002-claude.md`, `specs/batch-01/003-gemini.md`, `specs/batch-01/004-copilot.md`, `specs/batch-01/005-perplexity.md`, and `specs/batch-01/007-instagram.md` through `specs/batch-01/015-telegram.md`.
- Archive each current Draft 1 file under `docs/history/archive/2026-04-17/phase-3-batch-01-readiness/` before rewriting.
- Rewrite each selected spec to implementation-ready public-source V1 status using the evidence depth now present in the completed top-ten pattern set.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `specs/README.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party URLs for each app.
- Prioritize public sources for account model, mobile screens, core workflows, help/support, safety/privacy, terms, subscriptions, data export/deletion, notifications, AI/provider behavior, integrations, and platform constraints.
- Keep native screens, account lifecycle, subscription purchase/restore/cancel, push payloads, regulated flows, private collaboration behavior, AI outputs, and region/device-specific behavior as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan for each upgraded spec.
- Treat AI, messaging, social graphs, media, subscriptions, identity, privacy, safety, payments, child/teen users, data deletion, accessibility claims, and regional availability as category risk areas where relevant.
- Do not claim exact native parity for any account, paid, AI, collaboration, notification, deletion/export, support, or platform-specific flow until verified.

### Validation

- Confirm the upgraded spec has exactly one H1 and all canonical sections.
- Confirm the upgraded specs each have exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from each upgraded Batch 01 spec.
- Confirm readiness counts and next-step references advance from 10 completed specs to the new batch total.
