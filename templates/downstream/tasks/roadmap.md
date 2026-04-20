# Roadmap - {{PROJECT_NAME}}

> Canonical source spec: `{{SOURCE_SPEC_STORE_URL}}/{{SOURCE_SPEC_PATH}}`
> Target repo: `{{TARGET_REPO}}`
> Source app for research orientation: `{{APP_NAME}}`

## Project Guardrails

- Non-affiliation: {{NON_AFFILIATION_NOTICE}}
- Legal scope: {{LEGAL_SCOPE}}
- Original assets: {{ORIGINAL_ASSETS_REQUIREMENT}}
- Manual blockers: {{MANUAL_VERIFICATION_BLOCKERS}}

## Phase 1: Implementation Plan And Technical Baseline

### Goal

Translate the seeded source spec into a concrete implementation plan, stack choice, data model, API contract, and test strategy for an original downstream app.

### Acceptance Criteria

- [ ] `docs/plans/README.md` is expanded into an app-specific implementation plan.
- [ ] The implementation stack is selected and documented.
- [ ] Core route, screen, data model, and API contracts are listed.
- [ ] Manual verification blockers from the source spec are preserved in task docs.
- [ ] Legal/name/asset guardrails are still satisfied.

### Implementation

- [ ] Step 1.1: Review the seeded source spec and extract V1 implementation surfaces.
- [ ] Step 1.2: Choose the implementation stack and repository structure.
- [ ] Step 1.3: Define the route map, data model, API contract, seed-data policy, and test plan.
- [ ] Step 1.4: Prepare the first build phase in `tasks/todo.md`.

## Phase 2: Core Original Implementation

### Goal

Build the first usable V1 workflow with original code, original assets, synthetic data, and test coverage.

### Acceptance Criteria

- [ ] The primary V1 workflow can be run locally.
- [ ] Tests cover the primary data and interaction contracts.
- [ ] No proprietary assets, screenshots, logos, private API details, production credentials, or real user data are committed.
- [ ] Blocked source-spec behavior remains explicitly marked until verified.

## Phase 3: Parity Review And Release Readiness

### Goal

Verify the implementation against the source spec, record gaps, and prepare a release only after legal/name/asset review passes.

### Acceptance Criteria

- [ ] Source-spec parity gaps are recorded.
- [ ] Manual verification evidence is linked or blockers remain open.
- [ ] Legal/name/attribution review is complete.
- [ ] Release notes and usage instructions are ready.
