# Mobile Ideas Roadmap

## Summary

This roadmap tracks the path from an initial clone-idea backlog to verified, implementation-ready mobile app specifications.

## Phase Overview

| Phase | Status | Outcome |
|---|---|---|
| Phase 1 | Complete | Initial 100-idea backlog and Draft 0 specs created. |
| Phase 2 | Complete | Hygiene and Draft 1 spec remediation. |
| Phase 3 | In progress | App-by-app implementation-readiness upgrades. |
| Phase 4 | Planned | Per-app implementation planning in downstream repos. |

## Phase 1: Initial Backlog And Draft 0 Specs

### Milestones

- [x] Create `tasks/ideas.md` with 100 mobile app clone ideas.
- [x] Create Draft 0 specs for all 100 ideas.
- [x] Publish the repository to GitHub.
- [x] Add a quality audit showing Draft 0 gaps.

### Acceptance Criteria

- 100 ideas exist.
- 100 numbered specs exist.
- Draft 0 quality limitations are documented.

## Phase 2: Hygiene And Draft 1 Remediation

### Milestones

- [x] Add missing lifecycle docs.
- [x] Normalize task documents with next steps.
- [x] Rewrite all numbered specs into canonical Draft 1 structure.
- [x] Run final hygiene and quality validation.
- [x] Commit and push remediation work.

### Acceptance Criteria

- `CLAUDE.md`, `tasks/roadmap.md`, `tasks/history.md`, `tasks/todo.md`, and `tasks/ideas.md` are present.
- Every numbered spec has canonical spec sections.
- Every numbered spec includes research sources, open questions, and next steps.
- Structural validation confirms no missing spec IDs from `001` through `100`.

## Phase 3: App-By-App Implementation Readiness

### Milestones

- [x] Define the implementation-readiness gate.
- [x] Upgrade `001-chatgpt.md` as the pilot implementation-ready public-source V1 spec.
- [x] Upgrade the remaining architecture-teaching top-ten specs.
- [ ] Upgrade remaining specs by batch until all 100 pass the readiness gate.
- [ ] Complete hands-on verification for each app where lawful and feasible, or mark blocked flows with explicit reason and owner/path.

### Acceptance Criteria

- Every spec has exact source links or a documented blocker.
- Every spec distinguishes verified behavior from inferred clone requirements.
- High-risk categories have category-specific risk review notes.
- Every spec has app-specific screens, data model, API contracts, tests, and build plan.

## Phase 4: Downstream Implementation Planning

### Milestones

- [ ] Choose the first implementation candidate.
- [ ] Produce a build plan with route map, API schema, data model, seed data, and test checklist.
- [ ] Create or link the downstream implementation repository.

### Acceptance Criteria

- Implementation begins only from a verified spec.
- Original branding, original assets, licensed data, and lawful integrations are confirmed.

## Cross-Phase Concerns

- Legal scope must remain functional parity only.
- Specs must not imply use of private APIs or copied proprietary assets.
- Research claims must be traceable to public sources or hands-on notes.
- Finance, health, location, marketplace, communication, media, and smart-home apps require elevated risk review.

## Next Steps

- Upgrade `041-starbucks.md`, `042-mcdonalds.md`, `043-opentable.md`, `044-yelp.md`, and `045-too-good-to-go.md` as the next Batch 03 food/local discovery pass.
- Continue the remaining 56 Draft 1 specs by batch using the completed Batch 01, top-ten, and Batch 02 pattern sets.
