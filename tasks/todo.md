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
- [ ] Upgrade the remaining top-ten architecture-teaching spec: `089-notion.md`.
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
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 91 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade `089-notion.md`

### Scope

- Archive the current Draft 1 file at `specs/batch-05/089-notion.md` under `docs/history/archive/2026-04-17/`.
- Rewrite `specs/batch-05/089-notion.md` to implementation-ready public-source V1 status using the structure and evidence depth now present in `specs/batch-01/001-chatgpt.md`, `specs/batch-01/006-tiktok.md`, `specs/batch-01/016-whatsapp.md`, `specs/batch-02/026-google-maps.md`, `specs/batch-02/033-airbnb.md`, `specs/batch-02/038-doordash.md`, `specs/batch-03/046-amazon.md`, `specs/batch-03/056-cash-app.md`, and `specs/batch-04/066-spotify.md`.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party Notion URLs.
- Prioritize public sources for workspace setup, pages, blocks, databases, templates, search, comments, mentions, sharing, permissions, teamspaces, sync/offline behavior, file uploads, imports/exports, calendar/mail integrations, AI features, automations, notifications, subscription plans, privacy controls, account deletion, security/compliance, accessibility, and API/developer constraints.
- Keep account/workspace creation, native iOS/Android screens, collaboration/realtime sync, offline behavior, AI outputs, imports/exports, file uploads, workspace permissions, subscription purchase/restore, enterprise/admin controls, push payloads, and regional availability as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan.
- Treat workspace privacy, collaboration, permissions, file content, AI-generated content, enterprise administration, payments, imports/exports, data deletion, accessibility claims, and regional availability as category risk areas.
- Do not claim exact native parity for workspace onboarding, realtime collaboration, offline sync, database behavior, AI features, automations, imports/exports, subscription purchase/restore, push payloads, account deletion, or support flows until verified.

### Validation

- Confirm the upgraded spec has exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from `089-notion.md`.
- Confirm readiness counts and next-step references advance from Spotify completion to Notion completion and then batch remediation.
