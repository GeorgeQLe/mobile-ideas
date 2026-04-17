# Todo

## Priority Task Queue

- [x] Upgrade `006-tiktok.md` to implementation-ready status using the `001-chatgpt.md` pattern.
- [x] Upgrade `016-whatsapp.md` to implementation-ready status.
- [x] Upgrade `026-google-maps.md` to implementation-ready status.
- [x] Upgrade `033-airbnb.md` to implementation-ready status.
- [x] Upgrade `038-doordash.md` to implementation-ready status.
- [x] Upgrade `046-amazon.md` to implementation-ready status.
- [x] Upgrade `056-cash-app.md` to implementation-ready status.
- [ ] Upgrade the remaining top-ten architecture-teaching specs: `066-spotify.md` and `089-notion.md`.
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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 92 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade `066-spotify.md`

### Scope

- Archive the current Draft 1 file at `specs/batch-04/066-spotify.md` under `docs/history/archive/2026-04-17/`.
- Rewrite `specs/batch-04/066-spotify.md` to implementation-ready public-source V1 status using the structure and evidence depth now present in `specs/batch-01/001-chatgpt.md`, `specs/batch-01/006-tiktok.md`, `specs/batch-01/016-whatsapp.md`, `specs/batch-02/026-google-maps.md`, `specs/batch-02/033-airbnb.md`, `specs/batch-02/038-doordash.md`, `specs/batch-03/046-amazon.md`, and `specs/batch-03/056-cash-app.md`.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party Spotify URLs.
- Prioritize public sources for music/podcast/audiobook discovery, search, library, playlists, downloads/offline mode, lyrics, queue, connect/device handoff, social sharing, recommendations, ads, subscriptions, family/duo/student plans, creator/artist/podcast entry points, privacy controls, account deletion, accessibility, platform rules, and developer/audio playback constraints.
- Keep device/account, subscription purchase/restore, downloads/offline playback, rights-licensed catalog behavior, ads delivery, recommendations, Spotify Connect-like device handoff, family plan controls, creator/artist/podcast tooling, push payloads, and regional availability as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan.
- Treat licensed media, recommendations, ads, subscriptions, minors/family plans, creator tools, payments, privacy, accessibility claims, and regional availability as category risk areas.
- Do not claim exact native parity for playback, downloads, queue behavior, Connect/device handoff, subscription purchase/restore, family controls, ad insertion, recommendation ranking, push payloads, account deletion, or support flows until verified.

### Validation

- Confirm the upgraded spec has exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from `066-spotify.md`.
- Confirm readiness counts and next-step references advance from Cash App completion to Spotify completion and then Notion.
