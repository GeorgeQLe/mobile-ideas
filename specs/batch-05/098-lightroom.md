# 098 Lightroom Clone Spec

## Legal Scope
- Clone photo import, non-destructive editing, presets, albums, and cloud sync.
- Use original branding and original preset names.

## Product Goal
- Help users improve photos with a fast editing pipeline and reusable presets.

## Research Verification Checklist
- Public editing controls, preset browser, and sync details: verify.
- Import flow, batch edits, and premium features: verify.
- Offline editing and cloud backup behavior: verify.

## Core User Journeys
- User imports a photo and applies a preset.
- User adjusts exposure, color, and crop.
- User saves edits non-destructively and syncs later.
- User organizes photos into albums and favorites.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Library | Browse photos | Import, select | Empty, loaded | Corrupt file |
| Editor | Non-destructive edit | Sliders, crop | Active, preview | Huge image |
| Presets | One-tap looks | Choose, save | Browsing, applied | Missing asset |
| Albums | Organize photos | Create, sort | Populated, empty | Duplicate item |
| Sync | Cloud status | Queue, retry | Pending, done | Low storage |

## Functional Requirements
- Support exposure, contrast, highlights, shadows, temperature, tint, crop, straighten, and detail adjustments.
- Support preset application and user-defined presets.
- Preserve original photo and store edit stack separately.
- Support batch selection and export/share.
- Sync edited metadata and rendered previews.

## Data Model
- `Photo`, `EditStack`, `Adjustment`, `Preset`, `Album`, `Favorite`, `SyncJob`, `ExportJob`.
- Store derived previews separately from original media.

## API/Backend Contracts
- `POST /photos/import`
- `GET /photos`
- `PATCH /photos/{id}/edits`
- `GET /presets`
- `POST /albums`
- `POST /sync`

## Realtime/Push/Offline
- Offline editing required.
- Push for sync completion only if cloud backup is enabled.
- No realtime collaboration needed.

## Permissions/Privacy/Safety
- Photos permission required for import.
- Keep originals and edits private by default.
- Do not infer face identity or sensitive attributes without explicit user action.

## Analytics Events
- `photo_imported`, `preset_applied`, `adjustment_changed`, `album_created`, `favorite_toggled`, `sync_completed`, `export_started`, `export_completed`.

## Monetization
- Freemium with premium presets, advanced tools, and cloud sync as paid features.

## Acceptance Tests
- Import a photo and apply a preset.
- Save a non-destructive crop and reopen the original.
- Batch edit several photos and export them.
- Work offline and queue a sync job.

## Implementation Notes
- Keep edit history as an ordered stack of operations.
- Render previews asynchronously to keep the editor responsive.
- Avoid destructive writes to originals.

