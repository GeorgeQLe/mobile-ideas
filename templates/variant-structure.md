# Multi-Variant Repository Structure Convention

This document defines the standard directory layout for all downstream implementation repositories. Each repo contains up to five variant implementations of the same app, sharing common assets and test fixtures.

## Top-Level Directory Tree

```
<repo-root>/
├── variants/
│   ├── react-native/
│   ├── flutter/
│   ├── expo/
│   ├── ios-native/
│   └── android-native/
├── shared/
│   ├── assets/
│   ├── api-contracts/
│   └── test-fixtures/
├── .github/
│   └── workflows/
├── docs/
│   ├── source-specs/
│   └── plans/
├── tasks/
├── .gitignore
└── README.md
```

## Variant Directories

Each variant lives under `variants/<stack>/` and is a self-contained project with its own dependency manifest, build configuration, and source tree. Variants are directory peers — not branches — so all implementations remain visible and diffable in a single checkout.

### `variants/react-native/`

```
variants/react-native/
├── package.json
├── tsconfig.json
├── metro.config.js
├── babel.config.js
├── app.json
├── index.js
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── types/
├── ios/
│   ├── Podfile
│   └── <ProjectName>/
├── android/
│   ├── build.gradle
│   ├── settings.gradle
│   └── app/
├── __tests__/
└── README.md
```

- **Runtime:** Node.js + React Native CLI
- **Language:** TypeScript
- **Build:** `npx react-native run-ios` / `npx react-native run-android`
- **Test:** `npx jest`
- **Lint:** `npx eslint src/`

### `variants/flutter/`

```
variants/flutter/
├── pubspec.yaml
├── analysis_options.yaml
├── lib/
│   ├── main.dart
│   ├── screens/
│   ├── widgets/
│   ├── models/
│   ├── services/
│   ├── providers/
│   └── utils/
├── ios/
│   └── Runner/
├── android/
│   └── app/
├── test/
├── integration_test/
└── README.md
```

- **Runtime:** Flutter SDK
- **Language:** Dart
- **Build:** `flutter run` (iOS/Android target auto-detected)
- **Test:** `flutter test`
- **Lint:** `flutter analyze`

### `variants/expo/`

```
variants/expo/
├── package.json
├── tsconfig.json
├── app.json
├── App.tsx
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── types/
├── assets/
├── __tests__/
└── README.md
```

- **Runtime:** Node.js + Expo CLI
- **Language:** TypeScript
- **Build:** `npx expo start` (dev) / `eas build` (production)
- **Test:** `npx jest`
- **Lint:** `npx eslint src/`

### `variants/ios-native/`

```
variants/ios-native/
├── <ProjectName>.xcodeproj/
├── <ProjectName>.xcworkspace/ (if CocoaPods/SPM)
├── Sources/
│   ├── App/
│   ├── Screens/
│   ├── Components/
│   ├── Models/
│   ├── Services/
│   ├── Navigation/
│   └── Utils/
├── Resources/
│   ├── Assets.xcassets/
│   ├── LaunchScreen.storyboard
│   └── Info.plist
├── Tests/
├── UITests/
└── README.md
```

- **Runtime:** Xcode + iOS SDK
- **Language:** Swift (SwiftUI preferred, UIKit where needed)
- **Build:** `xcodebuild -scheme <ProjectName> -destination 'platform=iOS Simulator,name=iPhone 16'`
- **Test:** `xcodebuild test -scheme <ProjectName>`
- **Lint:** `swiftlint`

### `variants/android-native/`

```
variants/android-native/
├── build.gradle.kts
├── settings.gradle.kts
├── gradle.properties
├── gradle/
│   └── wrapper/
├── app/
│   ├── build.gradle.kts
│   └── src/
│       ├── main/
│       │   ├── java/ (or kotlin/)
│       │   │   └── com/example/<projectname>/
│       │   │       ├── ui/
│       │   │       │   ├── screens/
│       │   │       │   ├── components/
│       │   │       │   └── navigation/
│       │   │       ├── data/
│       │   │       │   ├── models/
│       │   │       │   ├── repository/
│       │   │       │   └── remote/
│       │   │       └── utils/
│       │   ├── res/
│       │   └── AndroidManifest.xml
│       ├── test/
│       └── androidTest/
└── README.md
```

- **Runtime:** Android Studio + Android SDK
- **Language:** Kotlin (Jetpack Compose preferred, XML layouts where needed)
- **Build:** `./gradlew assembleDebug`
- **Test:** `./gradlew test` (unit) / `./gradlew connectedAndroidTest` (instrumented)
- **Lint:** `./gradlew ktlintCheck`

## Shared Directory

The `shared/` directory holds resources used across all variants. Variants reference shared resources via relative paths (`../../shared/...`).

### `shared/assets/`

Original visual assets shared across variants: app icons, splash screens, illustrations, fonts, and seed images. All assets must be original or permissively licensed with recorded provenance.

```
shared/assets/
├── icons/
│   ├── app-icon.svg
│   └── app-icon-adaptive.svg
├── images/
├── fonts/
└── provenance.md
```

### `shared/api-contracts/`

API specifications and shared type definitions that all variants implement against.

```
shared/api-contracts/
├── openapi.yaml
├── types.ts
└── mock-server/
    └── routes.json
```

### `shared/test-fixtures/`

Mock data, test snapshots, and golden files used for cross-variant test consistency.

```
shared/test-fixtures/
├── mock-data/
├── snapshots/
└── golden/
```

## CI/CD Integration

GitHub Actions workflow templates live in `.github/workflows/` and use a matrix strategy to build, test, lint, and benchmark each variant independently.

### Workflow-Variant Path Mapping

Workflow files reference variant paths using the matrix variable:

```yaml
strategy:
  matrix:
    variant: [react-native, flutter, expo, ios-native, android-native]
steps:
  - name: Build
    working-directory: variants/${{ matrix.variant }}
```

### Path-Filtered Triggers

Workflows trigger only when their variant's files change:

```yaml
on:
  push:
    paths:
      - 'variants/react-native/**'
      - 'shared/**'
```

### Benchmark Integration

The benchmark workflow invokes `mobile-benchmark-harness` against each variant's build output:

```yaml
- name: Benchmark
  run: npx @mobile-benchmark/harness --app ${{ github.repository }} --variant ${{ matrix.variant }} --output benchmark-results.json
  working-directory: variants/${{ matrix.variant }}
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Variant directory | lowercase, hyphenated | `react-native`, `ios-native` |
| Source directories | stack-idiomatic | `src/` (JS/TS), `lib/` (Dart), `Sources/` (Swift), `app/src/main/` (Kotlin) |
| Test directories | stack-idiomatic | `__tests__/` (JS), `test/` (Dart), `Tests/` (Swift), `app/src/test/` (Kotlin) |
| Shared asset files | lowercase, hyphenated | `app-icon.svg`, `onboarding-bg.png` |
| API contract files | lowercase, hyphenated | `openapi.yaml`, `types.ts` |

## Gitignore Patterns

The root `.gitignore` includes variant-specific build artifacts:

```gitignore
# React Native / Expo
node_modules/
*.jsbundle
.expo/

# Flutter
.dart_tool/
build/
.flutter-plugins
.flutter-plugins-dependencies

# iOS
*.xcworkspace/xcuserdata/
DerivedData/
Pods/

# Android
*.apk
*.aab
.gradle/
local.properties

# Shared
*.DS_Store
.env
.env.local

# Benchmark output
benchmark-results.json
```
