# Phase 5 Archive — 100-App Downstream Implementation Plan Queue

> Archived on 2026-04-23 during `/reconcile-dev-docs` fix pass. All acceptance criteria met.

## Goal

Populate the roadmap with one high-level implementation plan for each implementation-ready public-source V1 spec so the team can pick an app, expand that row into focused phases, and build in a downstream repository without losing the source-spec contract.

## Acceptance Criteria (all met)

- [x] All 100 implementation-ready specs have one high-level downstream implementation plan in `tasks/roadmap.md`.
- [x] Every plan references its source spec path.
- [x] Every plan is high-level enough to defer detailed phase work until the app is selected.
- [x] Manual verification and regulated/provider/hardware blockers remain launch gates, not assumed completed work.
- [x] First focused app after Todoist can be selected directly from this queue and decomposed into app-specific phases.

## Outcome

The Phase 5 implementation-plan table lives in `tasks/roadmap.md` under `## Phase 5: 100-App Downstream Implementation Plan Queue`. 100 rows cover IDs 001-100, each bound to its source spec in `specs/batch-01/` through `specs/batch-05/`. Phase 6 (downstream seeding) built on this queue.

## Follow-ups

- Phase 5 queue extension to 200 rows (Step 7.4) and to 1000 rows (Step 8.4) remain open in the successor phases.
- No deviations from plan; no tech debt recorded.
