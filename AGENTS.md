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

## Test Plan

- Run hygiene checks after structural doc changes.
- Run spec-structure checks after bulk spec rewrites.
- Verify every numbered spec has canonical sections and one H1.
