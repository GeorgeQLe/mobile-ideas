# Benchmark Configuration

Defines the 7 benchmark dimensions, per-metric scoring rubrics, composite scoring formula, and aggregation schema used across all 1000 mobile app clone implementations.

## Dimensions and Metrics

### 1. Performance (Weight: 20%)

Measures runtime responsiveness, smoothness, and resource efficiency.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| Cold Start | ms | `adb shell am start` (Android) / Xcode Instruments Time Profiler (iOS) | <2000 | <4000 | <8000 | >=8000 |
| Warm Start | ms | Same tooling, app already in memory | <500 | <1000 | <2000 | >=2000 |
| Frame Rate | fps | systrace (Android) / Instruments Core Animation (iOS), median during scroll | >=58 | >=50 | >=40 | <40 |
| Jank % | % | Frames exceeding 16.67ms budget / total frames during 30s scroll | <2 | <5 | <10 | >=10 |
| Memory Peak | MB | Android Profiler / Xcode Memory Graph, peak during first 60s | <150 | <250 | <400 | >=400 |
| Memory Avg | MB | Same tooling, average over 60s steady-state | <100 | <175 | <300 | >=300 |
| CPU % | % | Average CPU usage during typical 60s interaction session | <15 | <25 | <40 | >=40 |
| Battery Drain | %/hr | Estimated via Android Battery Historian / Xcode Energy Impact, idle+active blend | <3 | <5 | <8 | >=8 |

Dimension score = average of all 8 metric scores.

### 2. Bundle Size (Weight: 10%)

Measures download and install footprint.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| IPA Size | MB | `xcrun altool --validate-app` output or Xcode Organizer | <30 | <60 | <100 | >=100 |
| APK Size | MB | `bundletool get-size total` for AAB or raw APK size | <25 | <50 | <80 | >=80 |
| OTA Update Size | MB | Diff between two consecutive release builds | <10 | <20 | <40 | >=40 |
| JS Bundle Size | KB | Metro/webpack output size (RN/Expo only; N/A for native = 100) | <500 | <1000 | <2000 | >=2000 |
| Native Libs Size | MB | Size of `.so`/`.dylib` files in the final package | <10 | <20 | <35 | >=35 |
| Assets Size | MB | Total images, fonts, and bundled media | <15 | <30 | <50 | >=50 |

Dimension score = average of all 6 metric scores. Metrics marked N/A for a variant receive a score of 100.

### 3. UX Fidelity (Weight: 25%)

Measures how closely the implementation matches the source spec.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| Screen Coverage | % | Implemented screens / screens in build plan route map | >=95 | >=80 | >=60 | <60 |
| Interaction Coverage | % | Implemented interactions (taps, gestures, transitions) / spec interactions | >=90 | >=75 | >=55 | <55 |
| Edge Case Coverage | % | Handled edge cases / spec edge cases | >=85 | >=65 | >=45 | <45 |
| Spec Compliance | % | Weighted composite: 40% screen + 35% interaction + 25% edge case | >=90 | >=75 | >=55 | <55 |

Dimension score = spec compliance score (the weighted composite metric).

### 4. Code Quality (Weight: 15%)

Measures maintainability, type safety, and test coverage.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| Lint Score | % | ESLint (RN/Expo) / flutter analyze / SwiftLint / ktlint — (1 - errors/lines) * 100 | >=98 | >=90 | >=75 | <75 |
| Type Coverage | % | `tsc --noEmit` pass rate (TS), Dart analyzer (Flutter), Swift/Kotlin intrinsic | >=95 | >=85 | >=70 | <70 |
| Test Coverage | % | jest --coverage / xctest / gradle jacocoTestReport / flutter test --coverage | >=80 | >=60 | >=40 | <40 |
| Cyclomatic Complexity | avg | ESComplexity / lizard — average per-function complexity | <5 | <10 | <15 | >=15 |
| Maintainability Index | 0-100 | radon (Python adapter) or lizard MI — per-module average | >=80 | >=60 | >=40 | <40 |

Dimension score = average of all 5 metric scores.

### 5. Developer Velocity (Weight: 10%)

Measures build and iteration speed.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| Clean Build | sec | `time` wrapper on clean build command (cold cache) | <60 | <120 | <240 | >=240 |
| Incremental Build | sec | `time` wrapper after single-file change | <5 | <15 | <30 | >=30 |
| Hot/Live Reload | sec | Time from save to rendered update (RN/Flutter/Expo); N/A for native = 50 | <1 | <3 | <5 | >=5 |
| CI Pipeline | sec | GitHub Actions total workflow duration | <300 | <600 | <900 | >=900 |

Dimension score = average of all 4 metric scores.

### 6. Accessibility (Weight: 10%)

Measures inclusive design compliance.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| Audit Score | % | axe-core (RN/Expo), accessibility_scanner (Android), Accessibility Inspector (iOS) | >=95 | >=80 | >=60 | <60 |
| Contrast Ratio Compliance | % | Elements meeting WCAG AA (4.5:1 text, 3:1 large text) / total | >=95 | >=85 | >=70 | <70 |
| Touch Target Compliance | % | Interactive elements >= 44x44pt (iOS) / 48x48dp (Android) / total | >=95 | >=85 | >=70 | <70 |
| Screen Reader Coverage | % | Screens with complete VoiceOver/TalkBack annotations / total screens | >=90 | >=75 | >=55 | <55 |

Dimension score = average of all 4 metric scores.

### 7. Store Compliance (Weight: 10%)

Measures App Store / Play Store submission readiness.

| Metric | Unit | Measurement Method | 100 | 75 | 50 | 25 |
|---|---|---|---|---|---|---|
| Metadata Completeness | % | Required fields filled (name, description, categories, screenshots, privacy URL, support URL) / total required | 100 | >=85 | >=65 | <65 |
| Policy Compliance | % | Checklist items passed (content rating, COPPA, export compliance, permissions justification) / total | 100 | >=90 | >=75 | <75 |
| Screenshot Coverage | % | Required device sizes with screenshots / total required sizes | >=90 | >=75 | >=50 | <50 |
| Privacy Manifest Accuracy | % | Declared data types and APIs matching actual usage / total actual usage | 100 | >=90 | >=75 | <75 |

Dimension score = average of all 4 metric scores.

## Composite Scoring Formula

```
composite = sum(dimension_score[i] * weight[i]) for i in 1..7
```

Default weights:

| Dimension | Weight |
|---|---|
| Performance | 0.20 |
| Bundle Size | 0.10 |
| UX Fidelity | 0.25 |
| Code Quality | 0.15 |
| Developer Velocity | 0.10 |
| Accessibility | 0.10 |
| Store Compliance | 0.10 |
| **Total** | **1.00** |

Weights are configurable per benchmark run via the harness CLI (`--weights` flag or config file). The sum of all weights must equal 1.00.

The composite score is a single 0-100 value per variant per app.

## Aggregation Schema

### Cross-App Comparison Table

Groups all variants for all apps, sortable by any dimension or composite score.

| Column | Type | Description |
|---|---|---|
| appId | integer | Spec ID (1-1000) |
| appName | string | Human-readable name |
| category | string | Cluster category |
| variant | string | One of 5 variant identifiers |
| composite | number | Overall 0-100 score |
| performance | number | Dimension score |
| bundleSize | number | Dimension score |
| uxFidelity | number | Dimension score |
| codeQuality | number | Dimension score |
| devVelocity | number | Dimension score |
| accessibility | number | Dimension score |
| storeCompliance | number | Dimension score |

### Category-Level Rollup

Aggregates scores within each of the 15 cluster categories.

| Column | Type | Description |
|---|---|---|
| category | string | Cluster category name |
| appCount | integer | Number of apps in the category |
| avgComposite | number | Mean composite across all apps x variants |
| bestVariant | string | Variant with highest mean composite |
| bestVariantAvg | number | Mean composite of the best variant |
| worstVariant | string | Variant with lowest mean composite |
| worstVariantAvg | number | Mean composite of the worst variant |
| weakestDimension | string | Dimension with lowest category-wide average |

### Variant-vs-Variant Comparison

Per-app comparison of all 5 variants side by side.

| Column | Type | Description |
|---|---|---|
| appId | integer | Spec ID |
| appName | string | Human-readable name |
| reactNative | number | Composite score |
| flutter | number | Composite score |
| expo | number | Composite score |
| iosNative | number | Composite score |
| androidNative | number | Composite score |
| winner | string | Variant with highest composite |
| margin | number | Score difference between 1st and 2nd place |

## Scorecard JSON Schema

The canonical scorecard structure is defined in `templates/scorecard-template.json`. Each benchmark run produces one JSON file per variant per app, following that schema.

Key structural decisions:
- Flat structure per variant with nested dimension breakdowns (not a single file containing all variants).
- Every metric carries both `raw` (original measured value) and `score` (normalized 0-100).
- Aggregation fields are optional and populated during cross-app rollup, not during individual runs.
- Metadata includes CI run ID for traceability and harness version for reproducibility.
