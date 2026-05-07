# Todo — Mobile Ideas

> Current phase: 9 of 27 — Detailed Build Plans (All 1000 Apps)
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 9: Detailed Build Plans (All 1000 Apps)

### Goal

Generate app-specific build plans in every downstream repo's `docs/plans/README.md`, following the Todoist pilot pattern (Phase 4). Each plan covers route map, API schema, data model, seed data, feature flags, and blocked acceptance tests — tailored to the app's spec.

### Scope

- All 1000 downstream repos get a completed `docs/plans/README.md` with app-specific content derived from `docs/source-specs/`.
- Plans define five variant targets per app: React Native, Flutter, Expo, Native iOS (Swift/SwiftUI), Native Android (Kotlin/Jetpack Compose).
- Each plan includes variant-specific architectural notes (e.g., navigation library choices, state management, platform API access patterns).
- Category batches processed in parallel — each category's apps are independent repos.

### Acceptance Criteria

- [ ] All 1000 downstream repos have a completed `docs/plans/README.md` with route map, API schema, data model, seed data, and test checklist.
- [ ] Each plan defines variant-specific build notes for all five targets.
- [ ] Plans reference exact source spec sections and preserve manual verification blockers.
- [ ] No proprietary assets, trademarks, or copyrighted content introduced.

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low (all changes to this repo are sequential; downstream repos are independent)
**Review gates:** structural (route map completeness, API schema coverage, variant sections present, blocker preservation), legal scope

### Implementation

- [ ] Step 9.1: Design multi-variant build plan template
  - Files: create `templates/build-plan-template.md`
  - Extend the Todoist pilot pattern (`tasks/todoist-downstream-build-plan.md`) with five variant-specific architecture sections.
  - Template sections: Scope, Product Boundaries, Route Map, API Schema Plan, Data Model Plan, Seed Data Plan, Feature Flags and Blocked Acceptance Tests, Variant Architecture Notes (React Native, Flutter, Expo, Native iOS Swift/SwiftUI, Native Android Kotlin/Jetpack Compose), Test Checklist.
  - Each variant section covers: navigation library, state management, networking layer, local storage, platform API access patterns, recommended project structure.
  - Template uses placeholders (`{{APP_NAME}}`, `{{APP_ID}}`, `{{CATEGORY}}`, `{{SOURCE_SPEC_PATH}}`, etc.) for script-driven generation.

- [ ] Step 9.2: Create build plan generation script
  - Files: create `scripts/generate-build-plans.mjs`
  - Script reads the source spec from each downstream repo's `docs/source-specs/NNN-slug.md`.
  - Extracts: app name, category, screens/routes from spec, API contracts, data model entities, manual verification blockers, edge cases.
  - Generates an app-specific `docs/plans/README.md` using the template from Step 9.1.
  - Route map rows derived from spec's Screens section; API families from spec's Data Contracts/API section; data model from spec's Data Model section.
  - Supports `--from <id> --to <id>`, `--dry-run`, `--execute`, and `--delay-ms` flags (same pattern as `scripts/seed-downstream-batch.mjs`).
  - Serial execution with configurable delay between repos. Stops on first failure.
  - Clones each downstream repo to a temp directory, writes the plan, commits, and pushes.

- [ ] Step 9.3: Pilot on 3 diverse apps
  - Files: modify `tasks/todo.md` (mark pilot complete)
  - Run `scripts/generate-build-plans.mjs` on 3 apps from different categories: one AI app (e.g., ID 001), one shopping app (e.g., ID 046), one health app (e.g., ID 086).
  - Validate each generated plan has: complete route map matching spec screens, API schema families matching spec data contracts, data model matching spec entities, all five variant architecture sections, correct source spec references, preserved manual blockers.
  - Fix any template or script issues before proceeding to bulk generation.

- [ ] Step 9.4: Generate build plans — AI & Assistants cluster (~26 apps)
- [ ] Step 9.5: Generate build plans — Social, Dating & Community cluster (~31 apps)
- [ ] Step 9.6: Generate build plans — Messaging & Email cluster (~37 apps)
- [ ] Step 9.7: Generate build plans — Video & Music Streaming cluster (~53 apps)
- [ ] Step 9.8: Generate build plans — Podcasts, Books & Reading cluster (~42 apps)
- [ ] Step 9.9: Generate build plans — Photo & Video Creation cluster (~47 apps)
- [ ] Step 9.10: Generate build plans — Shopping, Commerce & Classifieds cluster (~65 apps)
- [ ] Step 9.11: Generate build plans — Food, Delivery & Grocery cluster (~77 apps)
- [ ] Step 9.12: Generate build plans — Finance & Payments cluster (~65 apps)
- [ ] Step 9.13: Generate build plans — Travel & Transportation cluster (~79 apps)
- [ ] Step 9.14: Generate build plans — Health, Fitness & Wellness cluster (~81 apps)
- [ ] Step 9.15: Generate build plans — Education & Learning cluster (~31 apps)
- [ ] Step 9.16: Generate build plans — Productivity & Collaboration cluster (~72 apps)
- [ ] Step 9.17: Generate build plans — News, Maps & Navigation cluster (~57 apps)
- [ ] Step 9.18: Generate build plans — Home, Security, Cloud & Enterprise cluster (~137 apps)

- [ ] Step 9.19: Verify completeness and update tracking
  - Files: create `tasks/build-plan-tracking.md`, modify `tasks/todo.md`
  - Verify all 1000 downstream repos have a non-empty `docs/plans/README.md` via `gh api`.
  - Spot-check 5 repos per cluster (75 total) for plan quality: route map completeness, API schema coverage, variant sections present, blocker preservation.
  - Create `tasks/build-plan-tracking.md` with per-repo completion status.
  - Record any repos that failed or need manual intervention.

### Reference

- Todoist pilot build plan (Phase 4 pattern): `tasks/todoist-downstream-build-plan.md`
- Seeding script (CLI pattern to follow): `scripts/seed-downstream-batch.mjs`
- Source specs: `specs/batch-01/` through `specs/batch-50/`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 5 plan queue (app-to-spec mapping): `tasks/roadmap.md` Phase 5 table
