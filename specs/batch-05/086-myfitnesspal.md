# MyFitnessPal-Style Clone Spec

> Metadata
> - Inspiration app: MyFitnessPal
> - Category: nutrition tracking, calorie and macro logging, food database, barcode/AI meal scan, recipes, workouts, device sync, ads/subscriptions, and health-safety boundaries
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-19.
> - Verification basis: exact public marketplace pages, official help/support pages, official privacy/legal pages, and public product documentation listed below.
> - Manual verification blockers: native iOS/Android screen capture, account signup/login, age gating, onboarding goals, food logging, barcode scan, AI meal scan, food database edits, recipes/meals, water/weight tracking, workout/device sync, community privacy, ads, Premium checkout/cancellation, data export/deletion, support escalation, and regional nutrition database availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, media, datasets, models, workflows, contracts, pricing, recommendations, and support materials.

## Overview

Build an original nutrition and fitness tracker inspired by MyFitnessPal's public workflow: set health goals, log foods and water, track macros/calories, scan barcodes or meals where scoped, add workouts, connect devices, view progress, manage Premium, participate in community where scoped, and control privacy/data rights.

The clone must not copy marks, food database, barcode database, recipes, meal plans, AI meal-scan models, community posts, workout content, premium features, pricing, copy, and nutrition guidance. Functional parity should use original or licensed content, synthetic test data, independently designed algorithms, platform-approved billing, and provider contracts approved for the downstream implementation.

This spec is implementation-ready for a V1 based on public sources. Any feature marked `Manual verification required` must remain behind a feature flag or launch blocker until lawful hands-on verification confirms native behavior and provider constraints.

## Goals

- Provide a mobile-first myfitnesspal-inspired product with onboarding, core workflow, history/detail, settings, support, privacy, entitlement, and recovery flows.
- Preserve user trust expectations around privacy, safety, accessibility, subscriptions, notifications, data export, account deletion, and category-specific harm controls.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Keep public-source requirements, inferred clone requirements, and manual verification blockers visibly separate.
- Make every source-backed feature buildable with original assets and lawful integrations.

## Non-Goals

- Do not build a MyFitnessPal-branded app or imply affiliation with MyFitnessPal, its parent company, app stores, providers, creators, clinicians, partners, device makers, or payment processors.
- Do not copy proprietary content, datasets, ranking formulas, model outputs, recommendation systems, UI trade dress, screenshots, private APIs, pricing copy, support copy, or provider contracts.
- Do not scrape, reverse engineer, replay network traffic, bypass paid gates, bypass privacy controls, or use private platform entitlements.
- Do not treat sensitive education, wellness, fitness, health, location, reproductive-health, or wearable behavior as generic; each relevant surface needs an explicit owner and launch review.
- Do not claim exact App Store, Play Store, native-device, subscription, notification, support, deletion/export, device, account, regional, or provider parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/myfitnesspal-calorie-counter/id341232718 | Official iOS listing, Health & Fitness category, calorie/macro tracking, AI food tracker, Apple Watch, age rating, subscriptions, ads/content warnings, and privacy labels | Verified 2026-04-19 |
| Google Play | https://play.google.com/store/apps/details?id=com.myfitnesspal.android | Official Android listing, package id, calorie and macro tracking, food database, workouts, Wear OS, ads/in-app purchases, and data-safety orientation | Verified 2026-04-19 |
| MyFitnessPal Help Center | https://support.myfitnesspal.com/hc/en-us | Public support entry for account, food logging, Premium, devices, community, and troubleshooting | Verified 2026-04-19 |
| MyFitnessPal Terms | https://www.myfitnesspal.com/terms-of-service | Age limit, Premium subscriptions, health/safety disclaimers, food database accuracy, AI limitations, community, and legal constraints | Verified 2026-04-19 |
| MyFitnessPal Privacy Policy | https://www.myfitnesspal.com/privacy-policy | Personal data, food/activity diary data, advertising, privacy rights, retention, and sharing | Verified 2026-04-19 |
| MyFitnessPal Privacy Rights Help | https://support.myfitnesspal.com/hc/en-us/articles/34887801585549-What-are-my-Privacy-Rights | Access, deletion, correction, opt-out, appeal, and privacy request routing | Verified 2026-04-19 |
| MyFitnessPal Privacy/Terms Help Section | https://support.myfitnesspal.com/hc/en-us/sections/360006073651-PRIVACY-POLICY-AND-TERMS | Privacy, retention, cookies, sharing, selling, personalized ads, and policy update topics | Verified 2026-04-19 |
| MyFitnessPal Report/Block Help | https://support.myfitnesspal.com/hc/en-us/articles/360032272932-How-do-I-report-inappropriate-users | Community safety, report, block, and profile privacy review area | Verified 2026-04-19 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings and MyFitnessPal pages position the service around food logging, calories, macros, workouts, weight goals, water, recipes, meal planning, AI/barcode-like logging, devices, ads, and Premium.
- V1 must model signed-out preview, adult account user, new logger, returning logger, Premium subscriber, expired subscriber, ads-supported user, device-connected user, community-visible user, restricted account, and deleted-account states.
- Onboarding must support age gate, health goal, height/weight/activity inputs, calorie/macro targets, safety disclaimers, privacy defaults, notification preference, and Premium education.
- Food logging must support search, recent/frequent foods, custom foods, recipes/meals, serving units, barcode/meal scan where scoped, verified/unverified nutrition, water, and edit history.
- Nutrition guidance must treat food database and AI outputs as informational, include error reporting, avoid medical advice, and warn against dangerous restriction or eating-disorder misuse.
- Fitness tracking must support workouts, steps, calories, weight/progress, Wear OS/Apple Watch/health-app sync where scoped, conflict handling, and user-controlled imports.
- Community features, if scoped, must support profile visibility, friend requests, private diaries, reports, blocking, moderation, and safe supportive content rules.
- Settings must expose Premium, ads/privacy choices, food diary privacy, devices, notifications, support, terms, privacy, access/export, and account deletion.

### Manual Verification Required

- native iOS/Android screen capture, account signup/login, age gating, onboarding goals, food logging, barcode scan, AI meal scan, food database edits, recipes/meals, water/weight tracking, workout/device sync, community privacy, ads, Premium checkout/cancellation, data export/deletion, support escalation, and regional nutrition database availability.
- Exact native navigation order, copy, permission timing, loading/error states, platform billing behavior, support outcomes, notification payloads, and regional differences.

## Core User Journeys

- New user installs the app, reviews an original value proposition, completes eligibility and preference setup, and reaches the default MyFitnessPal-style home surface without unsupported permissions.
- Returning user resumes the most recent meaningful activity, sees stale/offline state clearly, completes the core action, and confirms synced server state after reconnect.
- User denies a requested permission, receives a usable fallback, and can later re-enable that permission from settings without losing local work.
- User starts a paid trial or subscription, loses entitlement through cancellation/refund/expiration, and sees consistent locked/unlocked state across devices.
- Privacy-focused user changes notification/privacy settings, requests data export, deletes the account, and sees consequences for retained records before confirming.
- Support-seeking user reports a product, billing, privacy, or safety issue with redacted evidence and receives a trackable support case.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, adult gate, account | email, SSO, age | guest, new, returning | underage, auth fail, offline |
| Goal Setup | Weight/nutrition goals and safety copy | height, weight, activity, goal | complete, skipped | unsafe target, medical disclaimer |
| Dashboard/Diary | Daily calories, macros, water, exercise | meal tap, water, workout | empty, active, complete | stale sync, unsafe deficit |
| Food Search | Find foods and servings | query, barcode, filter | results, recent, verified | no match, wrong nutrition |
| Food Detail/Log | Serving, macros, meal assignment | serving, meal, save | draft, logged | unit mismatch, duplicate |
| Recipes/Meals | Custom reusable entries | ingredients, portions | empty, saved, edited | bad ingredient, stale nutrition |
| Scan/AI Meal Logging | Barcode or image-assisted logging | camera, photo, review | permission, recognized, corrected | denied camera, hallucinated item |
| Exercise/Devices | Workout, steps, wearable sync | connect, import, manual | connected, syncing | duplicate calories, token expired |
| Progress | Weight, macros, streaks, trends | date, chart, edit | empty, active | sensitive metric, chart misread |
| Community/Profile | Friends, privacy, reports where scoped | request, message, block | private, friends, public | harassment, inappropriate user |
| Premium/Ads | Trial, paid, restore, ad choices | checkout, restore, manage | free, trial, paid, expired | refund, ad opt-out conflict |
| Settings/Privacy/Support | Data rights, help, delete | export, delete, case | loaded, exporting, deleting | subscription active, identity verify fail |

## Data Model

- `User`: identity, locale, country/region, age/eligibility, auth providers, restrictions, and deletion/export state.
- `NutritionProfile`: app-specific nutritionprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `GoalPlan`: app-specific goalplan state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `FoodItem`: app-specific fooditem state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `FoodServing`: app-specific foodserving state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DiaryEntry`: app-specific diaryentry state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Meal`: app-specific meal state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `Recipe`: app-specific recipe state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `BarcodeRecord`: app-specific barcoderecord state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `MealScanCandidate`: app-specific mealscancandidate state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `WaterEntry`: app-specific waterentry state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `WeightEntry`: app-specific weightentry state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `ExerciseEntry`: app-specific exerciseentry state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `DeviceConnection`: app-specific deviceconnection state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `CommunityProfile`: app-specific communityprofile state, lifecycle, ownership, authorization, version, and deletion/export behavior.
- `SubscriptionEntitlement`: plan, provider, trial, renewal, expiration, refund, feature flags, and server verification status.
- `PrivacyRequest`: access/export, deletion, correction, consent withdrawal, identity verification, delivery, retention, and status metadata.
- `AuditEvent`: append-only record for auth, sensitive data, privacy, billing, support, moderation, and account transitions.
- `LocalCacheRecord`: device-local cached objects, queued writes, stale timestamps, sync attempts, encryption state, and conflict metadata.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: adult account auth with locale, age, and deletion state.
- `PATCH /nutrition/profile`, `GET /diary/:date`, `PATCH /goals`: goals, diary summary, calories/macros, and safety validation.
- `GET /foods`, `GET /foods/:id`, `POST /foods`, `POST /foods/:id/report`: food search, custom foods, nutrition data, verification, and correction reports.
- `POST /diary/entries`, `PATCH /diary/entries/:id`, `DELETE /diary/entries/:id`: food, water, exercise, weight entries with idempotency and audit.
- `POST /recipes`, `PATCH /recipes/:id`, `POST /meals`: reusable recipes/meals, ingredient resolution, serving math, and versioning.
- `POST /scans/barcode`, `POST /scans/meal`, `PATCH /scans/:id/review`: barcode or AI-assisted candidates with user review before logging.
- `GET /device-connections`, `POST /device-connections`, `DELETE /device-connections/:id`: health/device imports, calorie conflict rules, and revocation.
- `POST /community/reports`, `POST /users/:id/block`, `PATCH /privacy/diary`: community safety and diary/profile visibility.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: Premium and ads/feature-gate verification.
- `POST /data-export`, `DELETE /account`, `POST /support/cases`: privacy rights, deletion, nutrition-data export, and support workflows.

## Realtime, Push, And Offline Behavior

- Cache diary, recent foods, custom foods, recipes, settings, goals, and entitlement snapshots with nutrition-data version labels.
- Allow local food/water/exercise/weight drafts offline; block barcode/AI scan, community actions, checkout, export, deletion, and support evidence upload.
- Diary sync must be idempotent, preserve meal ordering, resolve duplicate entries, and flag stale nutrition versions for user review.
- Device imports must reconcile duplicate workouts/steps and avoid double-counting calories after reconnect.
- Push payloads must avoid exact weight, calories, food names, health goals, community messages, and payment state.
- Food database and AI outputs must keep user review as the source of truth before impacting goal or progress calculations.

## Permissions, Privacy, And Safety

- Nutrition/weight guidance, eating-disorder risk, AI food recognition, food database accuracy, ads, community safety, device sync, and subscriptions are launch blockers with named owners.
- Do not provide medical advice, disease treatment, clinical nutrition plans, or dangerous low-calorie goals; route high-risk patterns to reviewed resources.
- Food and barcode databases require licensing, verification, correction workflows, allergens/disclaimer copy, and no copied proprietary datasets.
- AI meal scan must disclose uncertainty, require confirmation, avoid medical claims, and never log inferred meals without user approval.
- Community profiles and diaries should default private or clearly explain visibility; report/block must be available before social launch.
- Accessibility must cover serving inputs, barcode alternatives, chart summaries, screen-reader diary totals, dynamic type, and color-independent macro feedback.

## Analytics And Monetization

- Track privacy-safe events: goal_setup_completed, food_searched, diary_entry_logged, barcode_scan_started, meal_scan_reviewed, workout_imported, privacy_diary_changed, premium_paywall_viewed.
- Every event must use opaque object ids, version ids, result buckets, latency buckets, entitlement state, locale, and error codes rather than raw user content or sensitive health/location/payment data.
- Separate product telemetry from safety, billing, support, and privacy audit records so deletion/export policies can be applied correctly.
- Do not send raw images, precise location, exact health entries, therapy/care details, private notes, food diaries, reproductive-health details, payment credentials, or support evidence as analytics properties.
- Monetization may include original subscriptions, trials, sponsored benefits, or licensed bundles only after legal, privacy, payment, and platform review.
- Any paid feature must disclose price, trial, renewal, cancellation path, refund/support owner, regional availability, and data-sharing implications before launch.

## Edge Cases

- unsafe calorie target
- wrong barcode match
- duplicate device calories
- AI hallucinated meal
- community harassment
- private diary exposure
- allergen reliance
- delete account with active subscription

## Test Plan

- Unit tests for validation, state machines, entitlement gates, privacy-safe analytics payloads, and deletion/export eligibility.
- Contract tests for every documented API route, including idempotency, validation errors, authorization, pagination, stale versions, and sensitive-state responses.
- Integration tests for auth, onboarding, home, core workflow, detail/history, settings, support, subscription, privacy export, and deletion.
- Offline tests for cached reads, queued drafts, blocked sensitive writes, stale data labels, corrupt cache, disk-full behavior, and reconnect reconciliation.
- Permission tests for denied, granted, revoked, limited, and platform-unavailable states for every scoped OS permission.
- Billing tests for free, trial, paid, canceled, expired, refunded, unavailable, restored, family/sponsored where scoped, and store-sync-pending states.
- Privacy tests for data minimization, consent withdrawal, export completeness, delete warnings, retained records, audit events, and sensitive analytics redaction.
- Safety tests for category-specific harms, report/escalation paths, blocked launch areas, age/region restrictions, and unsupported claim prevention.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, chart/media alternatives, and error recovery.
- Manual verification tests for native iOS/Android screen capture, account signup/login, age gating, onboarding goals, food logging, barcode scan, AI meal scan, food database edits, recipes/meals, water/weight tracking, workout/device sync, community privacy, ads, Premium checkout/cancellation, data export/deletion, support escalation, and regional nutrition database availability.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing marks, food database, barcode database, recipes, meal plans, AI meal-scan models, community posts, workout content, premium features, pricing, copy, and nutrition guidance.
- New and returning users can complete onboarding, use the core workflow, recover from permission/offline failures, manage entitlements, and reach settings/support with original or licensed data.
- All documented entities have lifecycle states, owners, authorization rules, audit behavior, and deletion/export handling.
- Signed-out, signed-in, paid, expired, permission-denied, offline, stale-data, restricted, and deleted-account states are covered by tests.
- Every manual verification blocker remains behind a launch-blocking feature flag or explicit owner/path until lawful test-device evidence is captured.
- Privacy, safety, accessibility, subscription, support, data export, and deletion flows have acceptance tests before app implementation starts.
- The spec uses exact first-party URLs and does not claim one-for-one native parity for unverified behavior.

## Open Questions

- Which original content, datasets, algorithms, providers, and licenses will back the downstream clone?
- Which features are V1 versus later, especially paid, device, health, community, AI, or partner/provider-dependent surfaces?
- Which jurisdictions, age gates, accessibility standards, privacy laws, app-store rules, and retention obligations are launch requirements?
- Which support, moderation, refund, safety, and escalation owners must approve the product before release?
- Which manual verification blockers can be resolved with lawful test accounts/devices before implementation begins?

## Build Plan

- Phase 1: app shell, adult auth, goal setup, diary dashboard, manual food/water/exercise logging, settings, and privacy-safe analytics.
- Phase 2: food search, custom foods, recipes/meals, nutrition versioning, correction reports, and diary sync tests.
- Phase 3: barcode scan and AI meal scan behind review gates, camera permissions, uncertainty handling, and safety tests.
- Phase 4: device/health sync, progress charts, duplicate calorie handling, and health data/accessibility tests.
- Phase 5: Premium, ads/privacy choices, community profile/report/block if scoped, support, export/delete, and billing/privacy tests.
- Phase 6: launch review for nutrition safety, eating-disorder risk, food data licensing, AI, ads, community, subscriptions, accessibility, and regional availability.

## Next Steps

- Resolve MyFitnessPal manual verification blockers before claiming one-for-one native logging, database, Premium, ads, or device-sync parity.
- Create or link the downstream implementation repository when this app is selected for build planning.
- Continue Phase 3 implementation-readiness upgrades with the remaining Batch 05 productivity, cloud, creator, photo, and smart-home specs: `090-todoist.md` through `100-ring.md`.
