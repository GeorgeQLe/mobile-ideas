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
- Default batch size is 20 repos per hour with at least 30 seconds between repo seeds. After two clean batches, the maximum can rise to 40 repos per hour, still serial.
- Repeated runs must use `scripts/seed-downstream-batch.mjs` with the rolling hourly cap enabled; if it reports a future eligible time, wait instead of bypassing the guard.
- Stop immediately on any GitHub `403`, `429`, secondary-rate-limit message, auth/permission failure, naming failure, clone propagation failure, template placeholder failure, or non-private visibility result.
- On rate-limit responses, obey `retry-after` or `x-ratelimit-reset`; otherwise wait at least one minute and use exponential backoff. Continuing while rate-limited risks GitHub enforcement.
- Before and after each batch, check authenticated rate-limit status with `gh api rate_limit` and record evidence in `tasks/repo-seeding.md`.
- Each repo seed must verify `visibility == PRIVATE`, `README.md` exists, the copied source spec exists under `docs/source-specs/`, and a root commit exists before marking the manifest row done.
- IDs 101-1000 may be seeded as planning/scaffold repositories only while their source specs remain Draft 1. Do not claim implementation-ready parity for those downstream repos until exact-source verification and risk review are complete.
- Never make a downstream repo public without a separate explicit approval after original code/assets and legal/name/license review.

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
