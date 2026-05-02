# ScratchJr-Style Clone Spec

> Metadata
> - Inspiration app: ScratchJr
> - Category: Kids coding (block-based)
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official ScratchJr site/help pages, and public privacy/terms pages.
> - Manual verification blockers: native tablet gestures, camera/photo/microphone insertion, project import/export email behavior, classroom usage patterns, and offline storage limits require hands-on verification before one-for-one native parity claims.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, characters, audio, and feature names. No proprietary characters or audio reuse.

## Overview

Build an original mobile block-based coding app for young learners inspired by ScratchJr's public workflows: drag-and-drop command blocks, characters, painted sprites, recorded sounds, photos, and multi-page interactive stories. Projects save locally and can be shared only through adult-gated export paths using original formats and original assets.

The clone must not copy ScratchJr branding, block artwork, character designs, sample projects, copy, private implementation details, or classroom materials. Device-permission behavior and any school sharing flows remain blocked until verified hands-on.

## Goals

- Block-based visual programming with motion, look, sound, control, and end blocks.
- Storybook pages per project; characters with customizable appearance.
- Local save and export to a non-identifying share format (e.g., email file by parent).
- Optional classroom grouping via teacher-provided codes for sharing.
- Age-appropriate UX with no open chat, no accounts for kids.

## Non-Goals

- Do not copy proprietary characters, block designs, or brand.
- Do not include chat, external messaging, or advertising.
- Do not collect personal data from children beyond what is operationally essential.
- Do not open any social sharing from the child's device.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/scratchjr/id895485086 | Official iOS/iPadOS listing, age rating, feature framing, privacy labels, and tablet-oriented positioning | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=org.scratchjr.android | Official Android listing, tablet requirement, feature framing, data safety, and terms link | Verified 2026-05-02 |
| ScratchJr Site | https://www.scratchjr.org/ | Official product orientation, learning goals, and parent/educator-facing framing | Verified 2026-05-02 |
| ScratchJr Privacy Policy | https://www.scratchjr.org/privacy-policy | Public privacy posture for child-directed use and operational data handling | Verified 2026-05-02 |
| ScratchJr Terms/EULA | https://www.scratchjr.org/eula.html | Public usage terms and app-distribution boundaries | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings describe a young-child coding app where children snap graphical blocks together to make characters move, jump, dance, sing, and interact.
- V1 must provide a stage/canvas, character list, block palette, and script area with direct manipulation sized for tablet touch targets.
- Block categories must cover start/trigger, motion, looks, sound, control/end, and page/navigation behavior using original block art and labels.
- Characters must support add, select, move, resize, rotate where applicable, layer order, delete, and reset actions.
- A paint editor must allow child-safe drawing, color selection, eraser, undo/redo, and save/cancel without uploading artwork by default.
- Sound features must support built-in sounds and adult/permission-gated recording, with microphone denial and deletion states.
- Photo insertion, if shipped, must be permission-gated and local-only by default because children's images are sensitive content.
- Projects must support multiple pages/scenes, per-page backgrounds, character scripts, play mode, rename, duplicate, delete, and recovery from corrupt local saves.
- Project export/import must be adult-gated, use an original file format, and avoid exposing child names, photos, or location metadata.
- Tutorials and sample starters must use original curriculum, assets, and copy and must not import ScratchJr sample projects.
- Classroom use may support teacher-created collection codes only after school/guardian consent and data-retention policy are defined.
- The core experience must work offline with no account requirement, no ads, no open chat, and no background networking for child play.
- Accessibility must include large touch targets, spoken labels for controls, reduced motion during playback, color-blind-safe block categories, and tablet landscape/portrait handling.

## Core User Journeys

- Child opens app and creates a new project.
- Child drags motion blocks to move a character.
- Child adds a sound effect block.
- Child adds a second page and a "go to page" block.
- Child saves project; parent shares via gated email export.
- Child explores included tutorials.
- Teacher sets up a classroom code; children's projects submit to collection.
- Child deletes a project.
- Parent accesses parental-gate settings.
- Child plays a project full-screen.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home | Projects list | new, open | populated, empty | corrupted |
| Editor Canvas | Stage and scripts | drag blocks, select character | idle, playing | undo limit |
| Character Library | Add character | select | populated | custom missing |
| Drawing Tool | Customize characters | drawing tools | draft | save fail |
| Page Navigator | Multi-page | select | populated | limit |
| Palette | Block categories | drag | loaded | none |
| Parental Gate | Adult-only actions | challenge | passed, failed | skip |
| Share | Export via email | parent gate | idle, sent | send fail |
| Classroom Join | Enter teacher code | code | idle, joined | invalid |
| Settings | Language, accessibility | toggles | loaded | signed-out |
| Tutorials | Guided lessons | play | list | unavailable |
| About | Credits, licenses | none | loaded | none |

## Data Model

- `Project`: id, name, pages, characters, scripts.
- `Page`: ordered list, background.
- `Character`: sprite id (built-in or custom), position.
- `Script`: ordered sequence of block instances attached to trigger.
- `Block`: category, type, parameters.
- `BlockParameter`: numeric/text/color/page/audio parameter with validation and localized display.
- `MediaAsset`: local drawing, photo, sound, or background with permission source, size, and deletion state.
- `ProjectExport`: generated bundle, schema version, redaction state, parent-gate approval, created-at.
- `Tutorial`: original lesson metadata, steps, completion state, and asset references.
- `ClassroomLink` (optional): teacher code, project submission list.
- `Settings`: language, accessibility.
- `PermissionGrant`: camera/photo/microphone state and last prompted timestamp.
- `AuditEvent`: export, share events.

## API And Backend Contracts

- Offline-first; no mandatory backend for core app.
- Optional: `POST /classrooms/:code/submissions` for classroom code collection.
- Optional: `GET /classrooms/:code/policy` before any student submission.
- Optional: `POST /project-exports` to create an adult-approved share package.
- Optional: `POST /project-imports/validate` to scan and validate imported packages before opening.
- Optional: `POST /data-export` for parent export to email.
- Optional: `POST /support/cases` for parent support.

## Realtime, Push, And Offline Behavior

- Fully offline for core use.
- Autosave uses local durable storage with transactional writes and previous-version recovery.
- Imported projects are validated against schema and media-size limits before entering the child project list.
- No push by default; if classroom submissions exist, notifications go only to teacher/caregiver accounts.
- No background networking.

## Permissions, Privacy, And Safety

- COPPA-style review required: no accounts for children; minimal data.
- Parental gate for any action that leaves app (share, external link, purchase).
- No advertising, no third-party analytics with behavioral targeting.
- Drawing tool saves only locally.
- Accessibility: dynamic type, VoiceOver, larger touch targets, color-blind-safe palette.
- Launch owner: privacy lead, child-safety lead, accessibility owner.

## Analytics And Monetization

- Minimal, privacy-safe analytics only (e.g., app open count, anonymous); child-content never in analytics.
- Either free or one-time parent purchase with original paywall copy; no IAP for kids.

## Edge Cases

- Storage full during autosave, sound recording, photo insertion, or export.
- Long scripts or recursive message triggers cause runaway playback; throttle with a child-safe pause state.
- Accidental project, character, page, or script deletion requires undo/recovery windows.
- Parental gate bypass attempts must fail closed and avoid revealing adult-only destinations.
- Device rotation or split-view changes during block drag, paint editing, recording, or playback.
- Locale without translation falls back to icons and default language without mixed broken labels.
- Large custom drawings, photos, or recordings exceed local project limits.
- Imported project uses unsupported schema, oversized media, or malformed scripts.
- Layer selection conflicts when characters overlap or have transparent hitboxes.
- Microphone/camera/photo permission is denied, revoked mid-session, or unavailable on managed devices.
- Classroom code expired, revoked, or belongs to a different school policy.
- Child tries to export directly from playback or editor without adult approval.

## Test Plan

- Unit tests for block execution, parameter validation, trigger dispatch, page navigation, and playback throttling.
- Unit tests for local save/load, autosave recovery, project duplication, delete undo, and corrupt-project quarantine.
- Unit tests for paint-editor operations, character layering, hit testing, and media-size limits.
- Permission tests for microphone, camera/photo, managed-device denial, revocation, and local-only storage.
- Integration tests for create project, add character, drag blocks, play, add page, record sound, draw sprite, and save.
- Import/export tests for adult gate, schema validation, metadata redaction, malformed package rejection, and version upgrades.
- Privacy tests: no child PII requirement, no ads, no background networking, no analytics with child content, and no external calls without adult gate.
- Classroom tests if enabled: code validation, school policy fetch, consent state, submission audit, and teacher-only access.
- Offline tests for first launch, project editing, tutorials, media playback, and export preparation without connectivity.
- Accessibility tests for screen-reader labels, focus order, large targets, reduced motion, color contrast, and tablet layouts.
- Performance tests for large projects, many sprites, long scripts, audio playback, and low-storage devices.
- Manual verification tests: native tablet gestures, project import/export mail/share sheet, camera/photo/microphone insertion, and parental gate efficacy.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- Core block-based coding experience works offline without child accounts, ads, chat, or background networking.
- Original block visuals, characters, sounds, tutorials, copy, and export formats replace all protected ScratchJr assets.
- Local project save/load, autosave recovery, paint editor, sound/photo permission states, and adult-gated export are deterministic.
- COPPA-style child-directed review, parental-gate review, and accessibility review are complete.
- Classroom sharing, if present, is feature-flagged until school/guardian consent, retention, and hands-on verification evidence exist.

## Open Questions

- Classroom-code feature scope for V1.
- Paid vs free distribution.
- Translation languages.
- Support for stylus drawing.

## Build Plan

- Phase 1: scaffold, canvas, palette, block engine.
- Phase 2: characters, drawing, pages.
- Phase 3: save/load, tutorials.
- Phase 4: parental gate, share, classroom code.
- Phase 5: accessibility, legal review.
- Phase 6: manual verification, rollout.

## Next Steps

- Verify URLs.
- Commission COPPA-style and accessibility review.
- Define classroom feature scope.
