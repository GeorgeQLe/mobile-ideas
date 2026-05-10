# Todo — Mobile Ideas

> Current phase: 10 of 27 — Benchmarking Infrastructure & Multi-Variant Repo Structure
> Source roadmap: `tasks/roadmap.md`
> Test strategy: none

## Phase 10: Benchmarking Infrastructure & Multi-Variant Repo Structure

### Goal

Build the shared CI/CD templates, benchmarking harness, and multi-variant branch/project structure that all 1000 apps will use during implementation phases.

### Scope

- Benchmarking harness repo with automated scoring across all dimensions:
  - **Performance**: cold start time, warm start time, frame rate (jank %), memory peak/average, CPU usage, battery drain rate
  - **Bundle size**: IPA size, APK/AAB size, OTA update size, asset breakdown
  - **UX fidelity**: spec compliance score (screen coverage, interaction coverage, edge case coverage)
  - **Code quality**: lint score, type coverage, test coverage, cyclomatic complexity, maintainability index
  - **Developer velocity**: clean build time, incremental build time, hot/live reload time, CI pipeline duration
  - **Accessibility**: automated a11y audit score (VoiceOver/TalkBack), contrast ratio compliance, touch target sizes
  - **Store compliance**: metadata completeness, policy compliance checklist, screenshot coverage, privacy manifest accuracy
- Shared CI/CD templates (GitHub Actions or equivalent) for building, testing, and benchmarking all five variants.
- Multi-variant repo structure convention: each downstream repo gets five variant directories or branches (`variants/react-native/`, `variants/flutter/`, `variants/expo/`, `variants/ios-native/`, `variants/android-native/`).
- Scorecard template and aggregation dashboard schema.

### Acceptance Criteria

- [ ] Benchmarking harness repo exists with automated scoring for all 7 benchmark dimensions.
- [ ] CI/CD templates cover build, test, lint, and benchmark for all 5 variant stacks.
- [ ] Multi-variant directory convention is documented and scaffolded in at least one pilot repo.
- [ ] Scorecard template produces a normalized 0-100 composite score per variant.
- [ ] Aggregation schema supports cross-app comparison and category-level rollups.

### Execution Profile

**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low (new infrastructure repo and templates — no contention with downstream repos)
**Review gates:** structural (benchmark dimension coverage, CI template correctness, variant scaffolding)

**Subagent lanes:** none

### Implementation

- [x] Step 10.1: Design benchmarking dimensions, scoring rubric, and scorecard schema
  - Files: create `templates/scorecard-template.json`, create `templates/benchmark-config.md`
  - Define the 7 benchmark dimensions with concrete metrics, measurement methods, and per-metric scoring rubrics (raw → normalized 0-100).
  - Design composite scoring formula (weighted average across dimensions).
  - Define scorecard JSON schema: per-variant scores, per-dimension breakdowns, metadata (app ID, category, variant, timestamp, CI run ID).
  - Define aggregation schema: cross-app comparison tables, category-level rollups, variant-vs-variant comparison.

- [x] Step 10.2: Create benchmarking harness repo on GitHub
  - Files: new repo `GeorgeQLe/mobile-benchmark-harness` (private)
  - Scaffold repo structure: `src/dimensions/`, `src/scoring/`, `src/aggregation/`, `templates/`, `docs/`, `package.json`, `tsconfig.json`, `README.md`.
  - Use Node.js/TypeScript as the harness runtime (consistent with existing scripts in this repo).
  - Include the scorecard schema from Step 10.1.
  - Seed with `gh repo create` following the same private-repo pattern as downstream seeding.

  **Implementation Plan — Step 10.2:**

  **What to build:**
  Create a new private GitHub repo `GeorgeQLe/mobile-benchmark-harness` and scaffold it with the directory structure, TypeScript configuration, package manifest, and documentation needed for the benchmarking harness that Steps 10.3–10.6 will populate with measurement modules.

  **Steps:**
  1. Create the repo: `gh repo create GeorgeQLe/mobile-benchmark-harness --private --description "Mobile app benchmark harness — scoring and comparison across 7 dimensions and 5 variant stacks"`.
  2. Clone it locally to `/tmp/mobile-benchmark-harness`.
  3. Create directory structure:
     - `src/dimensions/` — will hold performance.ts, bundle-size.ts, ux-fidelity.ts, code-quality.ts, dev-velocity.ts, accessibility.ts, store-compliance.ts (placeholder index.ts only for now)
     - `src/scoring/` — will hold composite.ts (placeholder index.ts)
     - `src/aggregation/` — will hold schema.ts, rollup.ts (placeholder index.ts)
     - `src/cli/` — will hold CLI entry point (placeholder index.ts)
     - `templates/` — copy `scorecard-template.json` from mobile-ideas repo
     - `docs/` — copy `benchmark-config.md` from mobile-ideas repo as `docs/benchmark-config.md`
  4. Create `package.json` with name `@mobile-benchmark/harness`, TypeScript/Node dependencies (`typescript`, `@types/node`), and scripts (`build`, `lint`, `test`, `benchmark`).
  5. Create `tsconfig.json` with strict mode, ES2022 target, Node16 module resolution, `outDir: dist/`.
  6. Create `README.md` with project overview, directory structure, usage instructions, and link to benchmark-config.md.
  7. Create placeholder `src/index.ts` that re-exports from dimensions, scoring, and aggregation.
  8. Create placeholder `src/dimensions/index.ts`, `src/scoring/index.ts`, `src/aggregation/index.ts`, `src/cli/index.ts` with TODO stubs.
  9. Commit and push the scaffold.
  10. Verify: `gh repo view GeorgeQLe/mobile-benchmark-harness --json visibility` returns `PRIVATE`, README exists, scorecard schema exists under `templates/`.

  **Key decisions:**
  - Node.js/TypeScript runtime (consistent with `scripts/` in mobile-ideas repo).
  - Strict TypeScript for type safety in metric handling.
  - Flat directory structure under `src/` — one file per dimension module.
  - CLI entry via `npx benchmark` (configured in package.json `bin` field).

  **Execution Profile:**
  - Parallel mode: serial
  - Integration owner: main agent
  - Test strategy: none (scaffold only, no runtime logic yet)

  **Acceptance Criteria:**
  - Private repo `GeorgeQLe/mobile-benchmark-harness` exists on GitHub with `visibility == PRIVATE`.
  - Directory structure matches: `src/dimensions/`, `src/scoring/`, `src/aggregation/`, `src/cli/`, `templates/`, `docs/`.
  - `package.json` and `tsconfig.json` are valid.
  - `README.md` exists with project overview.
  - `templates/scorecard-template.json` matches the schema from Step 10.1.
  - Root commit exists and is pushed to `main`.

  **Ship-one-step handoff contract:**
  Implement only Step 10.2. Validate it. Mark Step 10.2 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 10.3's plan. Then run `/ship` when done.

- [x] Step 10.3: Implement performance and bundle size benchmark modules
  - Files: create `src/dimensions/performance.ts`, `src/dimensions/bundle-size.ts` in harness repo
  - Performance module: measure cold start (via `adb shell am start` / Xcode Instruments), warm start, frame rate (systrace/Instruments), memory (profiler snapshots), CPU, battery drain (estimated via power profiler).
  - Bundle size module: measure IPA size, APK/AAB size, OTA update size, asset breakdown (images, fonts, JS bundle, native libs).
  - Each module exports a `measure()` function returning raw metrics and a `score()` function returning normalized 0-100.

  **Implementation Plan — Step 10.3:**

  **What to build:**
  Two dimension modules in `GeorgeQLe/mobile-benchmark-harness`: `src/dimensions/performance.ts` and `src/dimensions/bundle-size.ts`. Each module defines TypeScript types for its metrics, implements a `measure()` function that shells out to platform-specific profiling tools and returns raw metric values, and a `score()` function that applies the rubric thresholds from `docs/benchmark-config.md` to produce normalized 0-100 scores. Also create shared types in `src/types.ts` and update `src/dimensions/index.ts` to export the new modules.

  **Steps:**
  1. Clone harness repo to `/tmp/mobile-benchmark-harness` (or use existing clone).
  2. Create `src/types.ts` with shared types: `MetricResult` (`{ raw: number; score: number }`), `DimensionResult` (`{ score: number; weight: number; metrics: Record<string, MetricResult> }`), `Variant` enum, `MeasureOptions` interface.
  3. Create `src/dimensions/performance.ts`:
     - Define `PerformanceMetrics` type with 8 metric fields matching the scorecard schema.
     - Implement `measure(appPath: string, variant: Variant, opts?: MeasureOptions): Promise<PerformanceMetrics>` — shells out to `adb shell am start` (Android) or parses Xcode Instruments output (iOS) for cold/warm start; uses systrace/Instruments for frame rate; reads profiler snapshots for memory/CPU; estimates battery drain.
     - Implement `score(metrics: PerformanceMetrics): DimensionResult` — applies 4-tier thresholds (100/75/50/25) from benchmark-config.md with linear interpolation within tiers.
     - Export both functions.
  4. Create `src/dimensions/bundle-size.ts`:
     - Define `BundleSizeMetrics` type with 6 metric fields.
     - Implement `measure(buildDir: string, variant: Variant): Promise<BundleSizeMetrics>` — reads file sizes from build output directories, uses `bundletool` for AAB, `xcrun altool` for IPA, Metro output for JS bundle.
     - Implement `score(metrics: BundleSizeMetrics, variant: Variant): DimensionResult` — applies thresholds, marks N/A metrics as 100 for non-applicable variants.
     - Export both functions.
  5. Update `src/dimensions/index.ts` to re-export performance and bundle-size modules.
  6. Update `src/index.ts` if needed to export new types.
  7. Run `npx tsc --noEmit` to verify type correctness.
  8. Commit and push.

  **Key decisions:**
  - Shell-out approach for measurement (child_process.execFile) — harness orchestrates external tools rather than embedding profilers.
  - Linear interpolation between rubric tiers for finer granularity (e.g., cold start of 3000ms scores 87.5, midway between 100-tier and 75-tier).
  - N/A handling: metrics not applicable to a variant (e.g., JS bundle size for native) default to score 100.

  **Execution Profile:**
  - Parallel mode: serial
  - Integration owner: main agent
  - Test strategy: `tsc --noEmit` type check only (no runtime tests for measurement stubs)

  **Acceptance Criteria:**
  - `src/dimensions/performance.ts` and `src/dimensions/bundle-size.ts` exist with typed `measure()` and `score()` functions.
  - `src/types.ts` defines shared metric types.
  - `tsc --noEmit` passes with no errors.
  - `src/dimensions/index.ts` re-exports both modules.
  - Committed and pushed to `GeorgeQLe/mobile-benchmark-harness`.

  **Ship-one-step handoff contract:**
  Implement only Step 10.3. Validate it. Mark Step 10.3 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 10.4's plan. Then run `/ship` when done.

- [ ] Step 10.4: Implement UX fidelity and code quality benchmark modules
  - Files: create `src/dimensions/ux-fidelity.ts`, `src/dimensions/code-quality.ts` in harness repo
  - UX fidelity module: parse the build plan's route map and compare against implemented screens (directory listing), check interaction coverage against spec edge cases, output spec compliance percentage.
  - Code quality module: run lint (ESLint/SwiftLint/ktlint/flutter analyze), type coverage (tsc --noEmit/strict), test coverage (jest/xctest/gradle), compute cyclomatic complexity and maintainability index.

  **Implementation Plan — Step 10.4:**

  **What to build:**
  Two dimension modules in `GeorgeQLe/mobile-benchmark-harness`: `src/dimensions/ux-fidelity.ts` (4 metrics) and `src/dimensions/code-quality.ts` (5 metrics). Each module defines TypeScript types for its metrics, implements `measure()` and `score()` functions following the same pattern as performance and bundle-size modules. Update `src/dimensions/index.ts` to re-export.

  **Steps:**
  1. Clone or use existing clone of harness repo at `/tmp/mobile-benchmark-harness`.
  2. Create `src/dimensions/ux-fidelity.ts`:
     - Define `UxFidelityMetrics` type with 4 fields: `screenCoverage`, `interactionCoverage`, `edgeCaseCoverage`, `specCompliance` (all percentages).
     - Implement `measure(buildPlanPath: string, implementationDir: string, variant: Variant): Promise<UxFidelityMetrics>` — parse route map JSON, list implemented screen files, compare interactions and edge cases against spec.
     - Implement `score(metrics: UxFidelityMetrics): DimensionResult` — apply thresholds from benchmark-config.md. Dimension score = specCompliance score (the weighted composite metric, not the average).
  3. Create `src/dimensions/code-quality.ts`:
     - Define `CodeQualityMetrics` type with 5 fields: `lintScore`, `typeCoverage`, `testCoverage` (percentages), `cyclomaticComplexity` (avg per function), `maintainabilityIndex` (0-100).
     - Implement `measure(projectDir: string, variant: Variant): Promise<CodeQualityMetrics>` — shell out to ESLint/SwiftLint/ktlint/flutter analyze for lint, tsc/dart analyzer for type coverage, jest/xctest/gradle for test coverage, lizard for complexity.
     - Implement `score(metrics: CodeQualityMetrics): DimensionResult` — apply thresholds. Note cyclomaticComplexity is lower-better (inverted scoring).
  4. Update `src/dimensions/index.ts` to re-export uxFidelity and codeQuality.
  5. Run `npx tsc --noEmit` to verify type correctness.
  6. Commit and push.

  **Key decisions:**
  - UX fidelity dimension score uses specCompliance (the weighted composite) rather than averaging all 4 metrics, per benchmark-config.md.
  - Cyclomatic complexity uses lower-better scoring (same interpolation pattern as performance metrics).
  - Variant-specific tool dispatch: lint tool depends on variant stack (ESLint for RN/Expo, SwiftLint for iOS, ktlint for Android, flutter analyze for Flutter).

  **Execution Profile:**
  - Parallel mode: serial
  - Integration owner: main agent
  - Test strategy: `tsc --noEmit` type check only

  **Acceptance Criteria:**
  - `src/dimensions/ux-fidelity.ts` and `src/dimensions/code-quality.ts` exist with typed `measure()` and `score()` functions.
  - `tsc --noEmit` passes with no errors.
  - `src/dimensions/index.ts` re-exports all 4 dimension modules.
  - Committed and pushed to `GeorgeQLe/mobile-benchmark-harness`.

  **Ship-one-step handoff contract:**
  Implement only Step 10.4. Validate it. Mark Step 10.4 done in `tasks/todo.md`. Update `tasks/history.md`. Commit and push. Write Step 10.5's plan. Then run `/ship` when done.

- [ ] Step 10.5: Implement developer velocity, accessibility, and store compliance modules
  - Files: create `src/dimensions/dev-velocity.ts`, `src/dimensions/accessibility.ts`, `src/dimensions/store-compliance.ts` in harness repo
  - Dev velocity: time clean build, incremental build, hot/live reload, CI pipeline duration.
  - Accessibility: run automated a11y audits (axe-core for RN/Expo, accessibility_scanner for Android, Accessibility Inspector for iOS), measure contrast ratios, touch target sizes.
  - Store compliance: check metadata completeness (app name, description, screenshots, privacy policy URL, categories), policy compliance checklist, privacy manifest accuracy.

- [ ] Step 10.6: Build composite scoring engine and aggregation dashboard schema
  - Files: create `src/scoring/composite.ts`, `src/aggregation/schema.ts`, `src/aggregation/rollup.ts` in harness repo
  - Composite scoring: weighted average across 7 dimensions (configurable weights with sensible defaults).
  - Aggregation: produce cross-app comparison JSON, category-level rollup summaries, variant-vs-variant comparison tables.
  - CLI entry point: `npx benchmark --app <repo> --variant <variant> --output <path>`.

- [ ] Step 10.7: Design and document multi-variant repo structure convention
  - Files: create `templates/variant-structure.md`, modify `templates/downstream/README.md`
  - Document the directory convention: `variants/react-native/`, `variants/flutter/`, `variants/expo/`, `variants/ios-native/`, `variants/android-native/`.
  - Each variant directory contains: `src/`, `package.json` or equivalent, variant-specific config, `README.md` with build/run instructions.
  - Shared assets directory: `shared/assets/`, `shared/api-contracts/`, `shared/test-fixtures/`.
  - Document how CI/CD templates reference variant paths.

- [ ] Step 10.8: Create CI/CD workflow templates for all 5 variant stacks
  - Files: create `templates/ci/react-native.yml`, `templates/ci/flutter.yml`, `templates/ci/expo.yml`, `templates/ci/ios-native.yml`, `templates/ci/android-native.yml`, `templates/ci/benchmark.yml`
  - Each template: build, lint, type check, test, and benchmark for its variant stack.
  - Benchmark workflow: runs after build, invokes the harness, uploads scorecard JSON as artifact.
  - Templates use reusable workflow patterns (GitHub Actions composite actions or reusable workflows).

- [ ] Step 10.9: Scaffold multi-variant structure in pilot repo
  - Files: modify pilot downstream repo (Todoist: `GeorgeQLe/todoist-mobile-clone`)
  - Create `variants/` directory structure with placeholder READMEs for each variant.
  - Copy CI/CD templates into `.github/workflows/`.
  - Add `shared/` directory scaffold.
  - Push and verify the structure is correct via `gh api`.

- [ ] Step 10.10: End-to-end pilot validation
  - Files: modify `tasks/todo.md` (mark 10.10 done), modify `tasks/history.md`
  - Run the benchmarking harness against the pilot repo's scaffold (expect baseline/zero scores since no implementation exists yet).
  - Verify scorecard JSON output has all 7 dimensions, composite score, and correct metadata.
  - Verify CI/CD templates parse correctly (GitHub Actions syntax validation).
  - Verify aggregation schema produces valid cross-app comparison output.
  - Document any issues and fix before marking Phase 10 complete.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Source specs: `specs/batch-01/` through `specs/batch-50/`
- Phase 9 tracking: `tasks/build-plan-tracking.md`
- Seeding script (CLI pattern): `scripts/seed-downstream-batch.mjs`
