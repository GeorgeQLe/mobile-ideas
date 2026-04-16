# 081 Photomath Clone Spec

## Legal Scope
- Clone only the functional flow: camera capture, math recognition, step solving, and history.
- Use original branding, icons, copy, and UI layout language.
- Do not copy proprietary OCR, solver code, or proprietary content.

## Product Goal
- Let a user point the camera at a math expression and get a readable solution path.
- Support algebra, fractions, equations, systems, graphs, and text problems at a practical MVP level.

## Research Verification Checklist
- App Store listing, screenshots, and review themes: verify.
- Public help pages and onboarding screens: verify.
- Live scan accuracy, step ordering, and paywall behavior: verify.
- Offline behavior for cached problem history: verify.

## Core User Journeys
- New user opens camera, scans a problem, and sees steps.
- Returning user opens history, replays prior solutions, and saves favorites.
- User switches between camera, typed input, and graphing mode.
- User upgrades for deeper steps, hints, and unlimited scans.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Camera Scan | Capture equation | Camera, flash, gallery | Detecting, recognized, failed | Blurry, rotated, low light |
| Solution Detail | Show steps | Taps, expand step | Short, full, premium locked | Ambiguous parse |
| Graph View | Plot functions | Expression, axes | Static, interactive | Multiple roots |
| History | Prior scans | Search, filters | Empty, populated | Deleted item |
| Paywall | Convert free user | Subscribe, restore | Trial, error | Family sharing |

## Functional Requirements
- Auto-detect handwritten and printed math on-device when possible.
- Parse into a normalized expression tree before solving.
- Present step-by-step derivation with optional hint mode.
- Keep a problem history with favorites and re-open from gallery.
- Offer manual typing for unsupported or low-confidence scans.

## Data Model
- `User`, `ScanSession`, `Problem`, `ExpressionTree`, `SolutionStep`, `Favorite`, `Subscription`.
- `Problem` stores source type, confidence, normalized tokens, and solved status.
- Cache last N scans locally for quick reopen and offline review.

## API/Backend Contracts
- `POST /scan`: upload image or local crop, return parse job id.
- `GET /problems/{id}`: fetch normalized problem and solution state.
- `POST /problems/{id}/solve`: request new derivation.
- `POST /favorites`: toggle favorite.
- `POST /billing/restore`: restore entitlement.

## Realtime/Push/Offline
- No realtime collaboration required.
- Push only for renewal, trial end, and study streak reminders.
- Offline: allow history browsing and manual input; queue uploads until online.

## Permissions/Privacy/Safety
- Camera permission required for scan mode only.
- Store images with user consent and clear deletion controls.
- Do not claim medical, financial, or exam-authority accuracy.
- Flag uncertain parses and allow user correction before solving.

## Analytics Events
- `scan_started`, `scan_success`, `scan_failed`, `solution_viewed`, `step_expanded`, `favorite_toggled`, `paywall_viewed`, `subscription_restored`.

## Monetization
- Freemium with limited daily scans and deeper steps behind subscription.
- Optional annual plan and family sharing if supported by platform rules.

## Acceptance Tests
- Scan a printed equation and receive a valid step list.
- Type an equation manually and get the same solver path.
- Open history offline and view cached scans.
- Deny camera permission and still reach typed input.

## Implementation Notes
- Separate OCR, normalization, and solving into distinct services.
- Keep solver explanations deterministic for repeatable tests.
- Add a confidence threshold that routes weak scans to manual review.

