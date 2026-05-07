# {{APP_NAME}} Build Plan

> **App ID:** {{APP_ID}}
> **Category:** {{CATEGORY}}
> **Source spec:** `{{SOURCE_SPEC_PATH}}`
> **Downstream repo:** `{{DOWNSTREAM_REPO}}`
> **Generated:** {{GENERATED_DATE}}

## Scope

Source spec: `{{SOURCE_SPEC_PATH}}`

Downstream repository: `{{DOWNSTREAM_REPO}}`

This plan translates the implementation-ready public-source V1 {{APP_NAME}} spec into a downstream mobile build plan. It is implementation-agnostic until the downstream repository selects a stack. The downstream app must use original branding, original copy, original icons, original templates, synthetic seed data, documented public URLs, and provider stubs or feature flags for unverified behavior.

Do not create parity claims for native {{APP_NAME}} behavior until lawful hands-on verification resolves the blockers listed in this plan and in the source spec.

## Product Boundaries

{{PRODUCT_BOUNDARIES}}

## Route Map

| Route Or State | Screen Coverage | Primary Jobs | Required States | Blockers And Flags |
|---|---|---|---|---|
{{ROUTE_MAP_ROWS}}

## API Schema Plan

All write endpoints require idempotency keys, authorization rechecks, audit metadata, stale-revision detection, rate limits, and privacy-safe error responses. All list endpoints support cursor pagination, permission filtering, stale-index labels where relevant, and redacted analytics events.

| API Family | Routes | Owner | Request And Response Scope | Error States | Required Tests |
|---|---|---|---|---|---|
{{API_SCHEMA_ROWS}}

## Data Model Plan

| Entity | Ownership | Core Fields | Lifecycle And Authorization | Sync And Deletion Rules |
|---|---|---|---|---|
{{DATA_MODEL_ROWS}}

## Seed Data Plan

Seed data must be synthetic and brand-neutral. Do not use {{APP_NAME}} project names, {{APP_NAME}} templates, real personal data, real collaborator identities, real support text, copied examples, or private user data.

{{SEED_DATA_PLAN}}

## Feature Flags And Blocked Acceptance Tests

| Flag Or Blocked Test | Blocks | Owner Before Launch | Default V1 Behavior |
|---|---|---|---|
{{FEATURE_FLAGS_ROWS}}

## Variant Architecture Notes

### React Native

- **Navigation:** {{VARIANT_RN_NAVIGATION}}
- **State management:** {{VARIANT_RN_STATE}}
- **Networking:** {{VARIANT_RN_NETWORKING}}
- **Local storage / offline:** {{VARIANT_RN_STORAGE}}
- **Platform API access:** {{VARIANT_RN_PLATFORM_API}}
- **Project structure:** {{VARIANT_RN_STRUCTURE}}

### Flutter

- **Navigation:** {{VARIANT_FLUTTER_NAVIGATION}}
- **State management:** {{VARIANT_FLUTTER_STATE}}
- **Networking:** {{VARIANT_FLUTTER_NETWORKING}}
- **Local storage / offline:** {{VARIANT_FLUTTER_STORAGE}}
- **Platform API access:** {{VARIANT_FLUTTER_PLATFORM_API}}
- **Project structure:** {{VARIANT_FLUTTER_STRUCTURE}}

### Expo

- **Navigation:** {{VARIANT_EXPO_NAVIGATION}}
- **State management:** {{VARIANT_EXPO_STATE}}
- **Networking:** {{VARIANT_EXPO_NETWORKING}}
- **Local storage / offline:** {{VARIANT_EXPO_STORAGE}}
- **Platform API access:** {{VARIANT_EXPO_PLATFORM_API}}
- **Project structure:** {{VARIANT_EXPO_STRUCTURE}}

### Native iOS (Swift/SwiftUI)

- **Navigation:** {{VARIANT_IOS_NAVIGATION}}
- **State management:** {{VARIANT_IOS_STATE}}
- **Networking:** {{VARIANT_IOS_NETWORKING}}
- **Local storage / offline:** {{VARIANT_IOS_STORAGE}}
- **Platform API access:** {{VARIANT_IOS_PLATFORM_API}}
- **Project structure:** {{VARIANT_IOS_STRUCTURE}}

### Native Android (Kotlin/Jetpack Compose)

- **Navigation:** {{VARIANT_ANDROID_NAVIGATION}}
- **State management:** {{VARIANT_ANDROID_STATE}}
- **Networking:** {{VARIANT_ANDROID_NETWORKING}}
- **Local storage / offline:** {{VARIANT_ANDROID_STORAGE}}
- **Platform API access:** {{VARIANT_ANDROID_PLATFORM_API}}
- **Project structure:** {{VARIANT_ANDROID_STRUCTURE}}

## Test Checklist

{{TEST_CHECKLIST}}

## Acceptance Checks For This Plan

- Every required {{APP_NAME}} V1 screen maps to at least one route or navigation state.
- Every API family from the source spec has an owner, request/response scope, error states, and test coverage.
- The data model covers all entities required by the source spec with ownership, lifecycle, and sync/deletion rules.
- Seed data is synthetic and contains no {{APP_NAME}} branding, copied templates, real content, or private user data.
- Deferred manual blockers remain explicit and are not treated as completed native parity.
- Variant architecture notes are present for all five target stacks.

## Next Steps

- Select a target stack in the downstream repo before writing runtime app code.
- Keep this plan linked from `docs/plans/README.md` in the downstream repo.
- Keep `{{SOURCE_SPEC_PATH}}` linked from `docs/source-specs/` in the downstream repo.
