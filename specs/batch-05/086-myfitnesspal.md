# 086 MyFitnessPal Clone Spec

## Legal Scope
- Clone food logging, calorie goals, barcode entry, macro tracking, and weight progress.
- Use original branding and data entry UX, not copied database content.

## Product Goal
- Help users log meals quickly and understand calories, macros, and progress over time.

## Research Verification Checklist
- Public listing, scan flow, and premium features: verify.
- Database search, meal templates, and streak behavior: verify.
- Weight, water, and exercise integration details: verify.

## Core User Journeys
- User logs a meal by search, barcode, or recent items.
- User sets a calorie goal and sees daily progress.
- User tracks weight and macro totals across days.
- User upgrades for advanced insights and meal planning.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Dashboard | Daily progress | Calories, macros | Empty, active | Goal missing |
| Food Search | Find foods | Search, barcode | Loading, results | No network |
| Meal Log | Edit meals | Quantity, servings | Draft, saved | Invalid units |
| Progress | Weight trends | Date range | Weekly, monthly | Sparse data |
| Paywall | Convert free user | Plan, restore | Trial, error | Cancelled |

## Functional Requirements
- Support manual food entry, search, favorites, recipes, and barcode scanning.
- Maintain daily calorie, protein, carb, and fat totals.
- Allow custom goals for weight loss, gain, or maintenance.
- Track water, exercise calories, and weight entries.
- Provide quick-add and repeat-last-meal shortcuts.

## Data Model
- `User`, `Goal`, `FoodItem`, `MealEntry`, `Recipe`, `BarcodeLookup`, `WeightEntry`, `WaterEntry`, `Subscription`.
- Cache recent food searches and favorite meals locally.

## API/Backend Contracts
- `GET /dashboard`
- `GET /foods/search?q=`
- `POST /meals`
- `PATCH /meals/{id}`
- `POST /weights`, `POST /water`

## Realtime/Push/Offline
- Offline meal draft creation with later sync.
- Push for streak nudges and goal check-ins.
- No realtime collaboration required.

## Permissions/Privacy/Safety
- Camera permission only for barcode scanning.
- Treat nutrition data as sensitive personal data.
- Provide export and delete-account paths.

## Analytics Events
- `food_searched`, `food_added`, `meal_updated`, `goal_set`, `weight_logged`, `barcode_scanned`, `streak_updated`, `paywall_viewed`.

## Monetization
- Freemium with advanced goal planning, insights, and ad removal behind subscription.

## Acceptance Tests
- Search a food and add it to lunch.
- Scan a barcode and create a meal entry.
- Log weight for seven days and view a trend.
- Work offline, create a draft meal, and sync later.

## Implementation Notes
- Normalize serving units before totals are computed.
- Keep food database search index separate from user-generated entries.
- Make totals recompute from entries rather than storing only a final number.

