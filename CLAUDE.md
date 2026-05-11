# Mobile Ideas Project Conventions

## Overview

This repository is a planning and specification workspace for mobile app clone ideas. It does not contain production application code.

## Goals

- Maintain a lawful backlog of mobile app clone ideas.
- Turn each idea into a detailed technical specification before implementation.
- Keep project planning artifacts under `tasks/`.
- Keep implementation specifications under `specs/`.
- Preserve a clear distinction between public-source research, inferred requirements, and hands-on verified behavior.

## Non-Goals

- Do not build runtime app code in this repository.
- Do not copy proprietary source code, private APIs, trademarks, logos, screenshots, copyrighted media, paywalled content, or unlicensed datasets.
- Do not treat inferred product behavior as verified one-for-one clone requirements.

## Detailed Design

- "Clone" means lawful functional parity research: reproduce workflows, interaction models, data contracts, and edge cases with original implementation and original assets.
- Every numbered app spec must include source orientation, legal scope, privacy and safety requirements, edge cases, test plan, acceptance criteria, open questions, and next steps.
- Any source-discovery link must be replaced with exact first-party URLs before implementation starts.
- Any behavior that requires a real account, paid subscription, regional availability, device permission, physical device, or regulated sandbox must be marked blocked until verified.
- Generated task and spec documents should use one H1 and stable Markdown headings so automation can parse them.

## Downstream Repo Seeding

- User approval for GitHub downstream repo creation batches was granted on 2026-04-21, with the constraint that every downstream repo must be private.
- Seeding must stay serial. Do not parallelize `gh repo create`, clone, commit, push, or verification calls.
- Do not use GitHub Actions for this project or downstream repos. Keep Actions disabled; do not enable Actions, trigger workflows, dispatch workflow runs, or rely on Actions as validation unless the user gives a new explicit approval that names GitHub Actions.
- Default batch size is 20 repos per hour with at least 30 seconds between repo seeds. After two clean batches, the maximum can rise to 40 repos per hour, still serial.
- Repeated runs must use `scripts/seed-downstream-batch.mjs` with the rolling hourly cap enabled; if it reports a future eligible time, wait instead of bypassing the guard.
- Stop immediately on any GitHub `403`, `429`, secondary-rate-limit message, auth/permission failure, naming failure, clone propagation failure, template placeholder failure, or non-private visibility result.
- On rate-limit responses, obey `retry-after` or `x-ratelimit-reset`; otherwise wait at least one minute and use exponential backoff. Continuing while rate-limited risks GitHub enforcement.
- Before and after each batch, check authenticated rate-limit status with `gh api rate_limit` and record evidence in `tasks/repo-seeding.md`.
- Each repo seed must verify `visibility == PRIVATE`, `README.md` exists, the copied source spec exists under `docs/source-specs/`, and a root commit exists before marking the manifest row done.
- IDs 101-1000 may be seeded as planning/scaffold repositories only while their source specs remain Draft 1. Do not claim implementation-ready parity for those downstream repos until exact-source verification and risk review are complete.
- Never make a downstream repo public without a separate explicit approval after original code/assets and legal/name/license review.

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Verification is mandatory, but routine no-op verification runs inside the active execution/shipping step. Enter plan mode for non-trivial remediation or new work discovered by verification, not for validation that already has clear commands and no expected source changes.
- Write detailed specs upfront to reduce ambiguity
- In Codex: use `update_plan` in Default mode and `request_user_input` only when already in Plan mode
- Do not assume a Claude-style clear-context-on-accept flow or related JSON setting exists

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution
- For `agent-team` parallel write lanes, require separate GitHub branches per lane and include a consolidation/PR review step before final integration. This is the explicit exception to direct-to-primary work.

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff your behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/roadmap.md` (full plan) and `tasks/todo.md` (current phase) with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Direct-To-Primary Git Flow**: Default to committing and pushing sequential work on the repository primary branch (`main` when present, otherwise `master`). Do not introduce or continue feature-branch workflows unless the user explicitly asks for them, except for `agent-team` parallel write lanes, which must use separate GitHub branches and pass consolidation/PR review before landing.
- **Always Ship Mutations**: If a task creates or modifies tracked files, finish by committing and pushing all intended changes before stopping unless the user explicitly says not to. Do not leave a dirty tracked tree or unpushed commits behind.
- **No GitHub Actions**: Do not create, modify, or suggest GitHub Actions workflows unless the user explicitly asks for GitHub Actions. This project does not use GitHub Actions for CI/CD by default.

## Edge Cases

- If a marketplace listing or help page cannot be verified, keep the requirement as an open question rather than inventing behavior.
- If a feature is regulated, safety-sensitive, health-adjacent, finance-related, child-directed, location-sensitive, or smart-home related, require a category-specific risk review before implementation.
- If implementation work begins in another repository, keep this repo as the source of product/spec history and link out to implementation repos.

## Test Plan

- Run hygiene checks after structural documentation changes.
- Run spec structure checks after bulk spec rewrites.
- Verify that every numbered spec has the canonical sections and exactly one H1.
- Verify that task files contain checkable items where workflows depend on task state.
- Verify downstream seeding scripts are single-target or serial-batch only, private-only, rate-limit-aware, and stop on failures.

## Acceptance Criteria

- Root project conventions are documented here.
- Planning files live under `tasks/`.
- Specifications live under `specs/`.
- The repo can be handed to a future agent without needing unstated project rules.

## Open Questions

- None for repo conventions.

## Next Steps

- Keep this file updated when project workflow rules change.
