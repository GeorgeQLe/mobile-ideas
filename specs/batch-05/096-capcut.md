# 096 CapCut Clone Spec

## Legal Scope
- Clone mobile video editing workflow: import, trim, captions, effects, and export.
- Use original branding, templates, and visual assets.

## Product Goal
- Let a user produce a polished short-form video on mobile with minimal friction.

## Research Verification Checklist
- Public editor layout, effect library, and export options: verify.
- Caption generation, template behavior, and premium gates: verify.
- Project autosave, rendering, and offline asset handling: verify.

## Core User Journeys
- User creates a project and imports clips.
- User trims clips, adds captions, and applies effects.
- User previews the edit and exports a final file.
- User resumes a saved draft project later.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Projects | Draft management | New, open, delete | Empty, loaded | Corrupt draft |
| Editor | Timeline editing | Clips, effects | Active, render | Large project |
| Captions | Text and timing | Auto, manual | Generated, edited | Bad transcript |
| Export | Render output | Resolution, codec | Queued, done | Low storage |
| Asset Library | Media inputs | Import, favorites | Synced, local | Missing file |

## Functional Requirements
- Support multi-track timeline with clips, audio, text, effects, transitions, and stickers.
- Support trim, split, speed, crop, and volume adjustment.
- Support auto-caption generation and manual caption editing.
- Autosave projects locally and sync assets when signed in.
- Export with progress reporting and failure recovery.

## Data Model
- `Project`, `Track`, `Clip`, `AudioLayer`, `TextLayer`, `Effect`, `Template`, `Asset`, `ExportJob`.
- Store timeline as ordered clips with per-clip transform metadata.

## API/Backend Contracts
- `POST /projects`
- `GET /projects`
- `PATCH /projects/{id}`
- `POST /exports`
- `POST /captions/generate`
- `POST /assets/upload`

## Realtime/Push/Offline
- No realtime collaboration required for MVP.
- Offline project editing and asset import are required.
- Push only for export completion or cloud sync if enabled.

## Permissions/Privacy/Safety
- Camera and microphone permissions only when recording.
- Make imported media private by default.
- Be explicit about AI caption generation quality limits.

## Analytics Events
- `project_created`, `clip_added`, `caption_generated`, `effect_applied`, `export_started`, `export_completed`, `asset_imported`, `template_used`.

## Monetization
- Freemium with premium templates, effects, and higher export quality.

## Acceptance Tests
- Import clips, trim them, and export a video.
- Generate captions and edit a caption line.
- Save a project offline and reopen it later.
- Handle export failure and allow retry.

## Implementation Notes
- Keep timeline editing fully local-first to avoid lag.
- Use background export jobs and resumable rendering when possible.
- Store media proxies for playback to reduce memory pressure.

