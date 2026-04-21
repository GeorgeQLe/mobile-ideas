# Mobile Clone Technical Specs

Created: 2026-04-16

> Metadata
> - Spec set status: Draft 1 canonical rewrite complete for all 200 IDs; Phase 3 implementation-readiness upgrades complete for public-source V1 (IDs 001-100). Phase 7 Step 7.2 canonical Draft 1 normalization complete for IDs 101-200; implementation-readiness upgrade (exact first-party URLs, verified/inferred distinction, category risk reviews) queued in Step 7.3.
> - Coverage: 200 of 200 app ideas (100 implementation-ready + 100 Draft 1 canonical)
> - Research state: 100 implementation-ready public-source V1 specs with exact first-party source replacement and explicit hands-on verification blockers; 100 Draft 1 canonical specs awaiting implementation-readiness upgrade (exact URL replacement + category risk review in Step 7.3)

## Overview

This directory contains technical specs for all 200 mobile app clone ideas in `tasks/ideas.md`. The first 100 numbered specs (IDs 001-100) are upgraded to implementation-ready public-source V1 status. The second 100 numbered specs (IDs 101-200) are canonical Draft 1 as of Phase 7 Step 7.2; Step 7.3 will replace discovery URLs with exact first-party URLs, distinguish verified vs inferred behavior, and complete category risk reviews to reach implementation-ready status.

The specs are implementation-oriented planning documents. They define lawful functional parity targets, product flows, data models, backend contracts, privacy and safety requirements, analytics, edge cases, test plans, acceptance criteria, open questions, and next steps.

## Goals

- Keep every clone concept represented by one numbered spec.
- Use one consistent spec structure across all batches.
- Make legal scope and research status explicit.
- Provide enough detail for downstream implementation planning.
- Preserve blocked hands-on research items instead of inventing unsupported product behavior.

## Non-Goals

- Do not implement application code in this repository.
- Do not copy branding, trade dress, logos, screenshots, copyrighted media, private APIs, proprietary data, or paywalled content.
- Do not treat source-discovery links as a substitute for exact verified first-party URLs.

## Detailed Design

The numbered specs live in ten batches:

| Batch | App Range | Focus Areas | Directory | Readiness |
|---|---:|---|---|---|
| Batch 01 | 001-020 | AI, social, messaging, workplace chat | `specs/batch-01/` | Implementation-ready V1 |
| Batch 02 | 021-040 | calling, email, maps, mobility, travel, delivery | `specs/batch-02/` | Implementation-ready V1 |
| Batch 03 | 041-060 | food, local discovery, commerce, resale, finance | `specs/batch-03/` | Implementation-ready V1 |
| Batch 04 | 061-080 | crypto, budgeting, wallet, audio/video, education | `specs/batch-04/` | Implementation-ready V1 |
| Batch 05 | 081-100 | wellness, fitness, productivity, cloud, creator tools, smart home | `specs/batch-05/` | Implementation-ready V1 |
| Batch 06 | 101-120 | dating, professional networking, jobs, real estate, rentals, neighborhood/events, blogging, newsletters | `specs/batch-06/` | Draft 1 canonical |
| Batch 07 | 121-140 | fiction/comics, e-readers, library, read-later, RSS, news aggregation, finance news, investing social | `specs/batch-07/` | Draft 1 canonical |
| Batch 08 | 141-160 | micro-investing, robo-advisors, neobanks, FX, kids/teen banking, pharmacy, telehealth, therapy, sleep/recovery trackers | `specs/batch-08/` | Draft 1 canonical |
| Batch 09 | 161-180 | period/pregnancy/baby tracking, family organizer/locator, parental controls, school comms, LMS, kids learning, language learning | `specs/batch-09/` | Draft 1 canonical |
| Batch 10 | 181-200 | language learning, translation, transcription, writing, dev tools, project management, design, scheduling, calendars, tasks, notes, journaling, hiking | `specs/batch-10/` | Draft 1 canonical |

Every numbered spec uses these canonical sections:

- Overview
- Goals
- Non-Goals
- Research Sources
- Detailed Design
- Core User Journeys
- Screen Inventory
- Data Model
- API And Backend Contracts
- Realtime, Push, And Offline Behavior
- Permissions, Privacy, And Safety
- Analytics And Monetization
- Edge Cases
- Test Plan
- Acceptance Criteria
- Open Questions
- Next Steps

## Edge Cases

- Exact marketplace/help/privacy URLs may differ by region, device platform, or app ownership.
- Exact marketplace/help/privacy URLs may need periodic refresh before build start.
- Some features require paid subscriptions, test accounts, physical devices, regulated sandboxes, or region-specific availability and remain explicitly blocked until verified.

## Test Plan

- Confirm exactly 200 numbered app specs exist (100 implementation-ready + 100 Draft 1 canonical).
- Confirm no missing numeric IDs from `001` through `200`.
- Confirm every numbered spec has exactly one H1.
- Confirm every numbered spec has all canonical sections.
- For IDs 001-100, confirm public-source V1 quality metrics pass for line count, screen rows, detailed-design bullets, data entities, API bullets, journeys, tests, sources, safety, analytics, blockers, and next steps.
- For IDs 101-200, confirm Draft 1 canonical structure (one H1, metadata block with `Readiness status: Draft 1`, all 18 section headings present with substantive non-TODO content, ~150-220 lines per file, Research Sources marked "Source discovery — pending exact URL verification"); Step 7.3 adds exact-URL replacement and full implementation-readiness depth.

## Acceptance Criteria

- All 100 IDs 001-100 specs use canonical Draft 1 structure with exact first-party source links and explicit native/manual parity blockers.
- All 100 IDs 101-200 specs are canonical Draft 1 with exactly one H1, metadata block (`Readiness status: Draft 1`), all 18 canonical section headings, and substantive non-TODO content in every section (bodies are normalized; exact-URL verification and implementation-readiness depth pending Step 7.3).
- Every spec remains legally scoped to original code, original assets, synthetic or licensed data, and lawful integrations.
- Phase 4 remains responsible for choosing an implementation candidate; Phase 7 remains responsible for promoting IDs 101-200 to Draft 1 and implementation-ready V1 status.

## Open Questions

- Which exact public-source V1 spec should be the first downstream implementation candidate?
- Which blocked paid, hardware, region, regulated, or partner-integration flows should be manually verified before candidate selection?

## Next Steps

- Choose the first implementation candidate for downstream planning.
- Update each spec with hands-on verified behavior and remove blocked notes only when evidence is captured.
