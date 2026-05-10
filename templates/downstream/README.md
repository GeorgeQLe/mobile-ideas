# {{PROJECT_NAME}}

{{PROJECT_SUMMARY}}

## Source Orientation

- App ID: `{{APP_ID}}`
- Source app for research orientation: `{{APP_NAME}}`
- Target repository: `{{TARGET_REPO}}`
- Canonical spec store: `{{SOURCE_SPEC_STORE_URL}}`
- Source spec path: `{{SOURCE_SPEC_PATH}}`
- Seeded source spec copy: `docs/source-specs/{{SOURCE_SPEC_FILENAME}}`

This repository is an original implementation workspace derived from public-source functional research. The source spec is copied here for implementation planning convenience; the canonical source of record remains the spec store above.

## Non-Affiliation

{{NON_AFFILIATION_NOTICE}}

Do not present this project as official, endorsed, sponsored, certified, or connected to the inspiration app owner or any third-party platform named in the source spec.

## Legal Scope

{{LEGAL_SCOPE}}

Implementation work must focus on lawful functional parity: original code, original data models, original UI composition, original assets, and public-source behavior requirements. Do not copy proprietary source code, private APIs, trademarks as branding, logos, screenshots, app-store media, copyrighted content, paywalled content, production credentials, real user data, or inaccessible platform internals.

## Original Assets Requirement

{{ORIGINAL_ASSETS_REQUIREMENT}}

All visual assets, icons, seed records, fixtures, demos, and screenshots committed to this repository must be original, permissively licensed, or generated specifically for this project with reviewable provenance. Record provenance before using any third-party asset.

## Manual Verification Blockers

{{MANUAL_VERIFICATION_BLOCKERS}}

Features that require a real account, paid subscription, regulated sandbox, regional availability, device permission, native device behavior, third-party approval, physical hardware, or sensitive data handling remain blocked until verified and recorded in the task docs.

## Project Structure

This repository uses the multi-variant directory convention. Each app is implemented in up to five variant stacks, all in a single repository under `variants/`. Shared resources live in `shared/`.

```
variants/
├── react-native/     # React Native CLI + TypeScript
├── flutter/          # Flutter + Dart
├── expo/             # Expo + TypeScript
├── ios-native/       # Swift (SwiftUI / UIKit)
└── android-native/   # Kotlin (Jetpack Compose)

shared/
├── assets/           # Icons, images, fonts (original only)
├── api-contracts/    # OpenAPI specs, shared types
└── test-fixtures/    # Mock data, snapshots, golden files
```

See [`variant-structure.md`](../variant-structure.md) for the full directory convention, per-variant file layouts, CI/CD integration, naming conventions, and gitignore patterns.

## Build and Run

### React Native

```bash
cd variants/react-native
npm install
npx react-native run-ios    # or run-android
```

### Flutter

```bash
cd variants/flutter
flutter pub get
flutter run
```

### Expo

```bash
cd variants/expo
npm install
npx expo start
```

### iOS Native

```bash
cd variants/ios-native
xcodebuild -scheme {{PROJECT_NAME}} -destination 'platform=iOS Simulator,name=iPhone 16'
```

### Android Native

```bash
cd variants/android-native
./gradlew assembleDebug
```

## Repository Map

- `variants/` - variant implementations (one per stack).
- `shared/` - cross-variant assets, API contracts, and test fixtures.
- `docs/source-specs/` - seeded copy of the source spec from the canonical spec store.
- `docs/plans/` - implementation planning notes and phase plans.
- `tasks/roadmap.md` - downstream implementation roadmap.
- `tasks/todo.md` - current executable task list.

## Next Step

Start with `tasks/todo.md`. Keep blockers explicit and update the canonical spec store if implementation work uncovers source-spec corrections.
