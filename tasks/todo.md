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
- [x] Upgrade Batch 04 finance/wallet specs: `061-065`.
- [x] Upgrade Batch 04 video/entertainment specs: `072-076`.
- [x] Upgrade Batch 04 education specs: `077-080`.
- [x] Upgrade Batch 05 education/wellness/fitness/health specs: `081-088`.
- [x] Upgrade the remaining 11 specs by batch after the Batch 01, Batch 02, Batch 03, Batch 04 finance/wallet, Batch 04 audio, Batch 04 video/entertainment, Batch 04 education, and Batch 05 education/wellness/fitness/health patterns are proven.

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
- [x] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 11 specs with exact first-party URLs.
- [x] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [x] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [x] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Choose the first downstream implementation candidate

### Scope

- Review the 100 implementation-ready public-source V1 specs and identify a first implementation candidate for a downstream repo.
- Prefer a candidate with clear lawful scope, low regulated/hardware risk, manageable provider dependencies, strong product value, and explicit blockers that can be deferred behind feature flags.
- Compare at least one lower-risk productivity/cloud/education candidate against at least one higher-risk media/finance/health/location/smart-home candidate so the trade-off is explicit.
- Update `tasks/todo.md`, `tasks/roadmap.md`, and `tasks/history.md` with the chosen candidate, rationale, deferred blockers, and next downstream planning action.

### Research Notes

- Use `tasks/implementation-readiness.md` for the readiness definition and status table.
- Use `tasks/spec-quality-audit.md` for current residual risks.
- Use candidate specs directly for blockers and app-specific build plan detail.
- Do not treat implementation-ready public-source V1 as native parity; manual blockers remain launch blockers until verified.

### Implementation Notes

- Produce a short candidate decision note in `tasks/todo.md` or a new task artifact if the comparison becomes too long.
- If a candidate is chosen, define the next downstream planning step: route map, API schema, data model, seed data, test checklist, target repo, and deferred manual blockers.
- If no candidate is suitable, record the blocking criteria and propose the smallest verification task needed to unblock selection.

### Validation

- Confirm the selected candidate is implementation-ready public-source V1.
- Confirm the decision does not require production credentials, paid plans, hardware, regulated approvals, or copied assets to start downstream planning.
- Confirm task docs point to the next implementation-planning action.
