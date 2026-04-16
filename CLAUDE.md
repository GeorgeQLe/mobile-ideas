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

## Edge Cases

- If a marketplace listing or help page cannot be verified, keep the requirement as an open question rather than inventing behavior.
- If a feature is regulated, safety-sensitive, health-adjacent, finance-related, child-directed, location-sensitive, or smart-home related, require a category-specific risk review before implementation.
- If implementation work begins in another repository, keep this repo as the source of product/spec history and link out to implementation repos.

## Test Plan

- Run hygiene checks after structural documentation changes.
- Run spec structure checks after bulk spec rewrites.
- Verify that every numbered spec has the canonical sections and exactly one H1.
- Verify that task files contain checkable items where workflows depend on task state.

## Acceptance Criteria

- Root project conventions are documented here.
- Planning files live under `tasks/`.
- Specifications live under `specs/`.
- The repo can be handed to a future agent without needing unstated project rules.

## Open Questions

- None for repo conventions.

## Next Steps

- Keep this file updated when project workflow rules change.
