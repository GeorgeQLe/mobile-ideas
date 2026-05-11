# Mobile Apps Ideas Project Conventions

## Overview

Planning and specification workspace for mobile app clone ideas. Not runtime code.

## Goals

- Lawful backlog of mobile app clone ideas.
- Turn each idea into a detailed technical specification before implementation.
- `tasks/` for planning; `specs/` for specifications.
- Preserve distinction between public-source research, inferred requirements, and hands-on verified behavior.

## Non-Goals

- No runtime app code here.
- No proprietary source code, private APIs, trademarks, logos, screenshots, copyrighted media, paywalled content, or unlicensed datasets.
- Do not treat inferred product behavior as verified one-for-one clone requirements.

## Detailed Design

- "Clone" = lawful functional parity with original implementation and original assets.
- Every numbered spec must include source orientation, legal scope, privacy/safety, edge cases, test plan, acceptance criteria, open questions, build plan, and next steps.
- Every source-discovery link must be replaced with exact first-party URLs before implementation.
- Account-, subscription-, region-, permission-, hardware-, or regulator-gated behavior stays blocked until verified.
- Generated docs must use one H1 and stable Markdown headings.

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

## Test Plan

- Run hygiene checks after structural doc changes.
- Run spec-structure checks after bulk spec rewrites.
- Verify every numbered spec has canonical sections and one H1.
- Verify downstream seeding scripts are single-target or serial-batch only, private-only, rate-limit-aware, and stop on failures.
