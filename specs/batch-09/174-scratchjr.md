# ScratchJr-Style Clone Spec

> Metadata
> - Inspiration app: ScratchJr
> - Category: Kids coding (block-based)
> - Readiness status: Draft 1
> - Verification basis: public App Store and Play Store listings, public help-center discovery, and publicly available privacy/terms. Exact URLs pending verification.
> - Manual verification blockers: subscription (if any), offline-only behavior, and classroom sharing flows require hands-on verification.
> - Legal scope: functional parity only; original code, brand, copy, iconography, illustrations, characters, audio, and feature names. No proprietary characters or audio reuse.

## Overview

Build an original mobile block-based coding app for young learners (ages 5-8) inspired by ScratchJr: drag-and-drop command blocks arrange characters to move, talk, and interact in a storybook stage. Projects save locally and can be shared with original export formats. Kid-safe with COPPA-style review.

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
| Apple App Store | https://apps.apple.com/us/app/scratchjr/id895485086 | Features, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=org.pbskids.scratchjr | Features, data safety | Source discovery — pending exact URL verification |
| ScratchJr site | https://www.scratchjr.org | Feature how-to and learning goals | Source discovery — pending exact URL verification |
| ScratchJr privacy | https://www.scratchjr.org/privacy | Data handling | Source discovery — pending exact URL verification |
| ScratchJr terms | https://www.scratchjr.org/terms | Terms | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Visual canvas with stage and characters.
- Palette of command blocks grouped by category.
- Programming area with sequential scripts and triggers.
- Page navigation for multi-page projects.
- Save, rename, delete projects locally.
- Share via parent-gated email export.
- Optional teacher class code for collection.

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
- `ClassroomLink` (optional): teacher code, project submission list.
- `Settings`: language, accessibility.
- `AuditEvent`: export, share events.

## API And Backend Contracts

- Offline-first; no mandatory backend for core app.
- Optional: `POST /classrooms/:code/submissions` for classroom code collection.
- Optional: `POST /data-export` for parent export to email.
- Optional: `POST /support/cases` for parent support.

## Realtime, Push, And Offline Behavior

- Fully offline for core use.
- No push by default; if classroom submissions, only to teacher device.
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

- Storage full on device.
- Long scripts causing performance issues; show friendly throttle.
- Accidental delete; undo window.
- Parental gate bypass attempts; randomized challenge.
- Device rotation mid-script drag.
- Locale without translation.
- Large custom-drawn character files.
- Classroom code expired.

## Test Plan

- Unit tests for block execution engine, save/load, parental gate.
- Integration tests for editor flows.
- Privacy tests: no PII, no ads, no external calls without gate.
- Accessibility tests.
- Manual verification: native gestures on tablets, parental gate efficacy.

## Acceptance Criteria

- Core block-based coding experience functional offline.
- COPPA-style review complete.
- Parental gate enforced.
- Accessibility confirmed.

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
