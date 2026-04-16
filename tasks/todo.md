# Todo

## Priority Task Queue

- [x] Upgrade `006-tiktok.md` to implementation-ready status using the `001-chatgpt.md` pattern.
- [ ] Upgrade `016-whatsapp.md` to implementation-ready status.
- [ ] Upgrade `026-google-maps.md` to implementation-ready status.
- [ ] Upgrade `033-airbnb.md` to implementation-ready status.
- [ ] Upgrade `038-doordash.md` to implementation-ready status.
- [ ] Upgrade the remaining top-ten architecture-teaching specs: `046-amazon.md`, `056-cash-app.md`, `066-spotify.md`, and `089-notion.md`.
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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 98 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade `016-whatsapp.md`

### Scope

- Archive the current Draft 1 file at `specs/batch-01/016-whatsapp.md` under `docs/history/archive/2026-04-16/`.
- Rewrite `specs/batch-01/016-whatsapp.md` to implementation-ready public-source V1 status using the structure and evidence depth now present in `specs/batch-01/001-chatgpt.md` and `specs/batch-01/006-tiktok.md`.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party WhatsApp URLs.
- Prioritize public sources for end-to-end encrypted messaging, account/device linking, backups, groups, communities/channels, calls, media sharing, status, privacy settings, data/account deletion, safety/reporting, business/payment availability, and platform terms.
- Keep device/account flows as manual blockers unless verified lawfully with test accounts/devices.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan.
- Treat encryption, contacts/address book access, phone-number identity, child safety, spam/scams, abuse reporting, business messaging, payments, and backups as category risk areas.
- Do not claim exact native parity for message delivery receipts, backup restore, device linking, calls, push payloads, contacts import, or account deletion until verified.

### Validation

- Confirm the upgraded spec has exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from `016-whatsapp.md`.
- Confirm readiness counts and next-step references advance from TikTok to WhatsApp completion and then Google Maps.
