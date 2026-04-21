# Bear-Style Clone Spec

> Metadata
> - Inspiration app: Bear
> - Category: Notes
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Shiny Frog support — pending exact URL verification.
> - Manual verification blockers: cross-device sync fidelity, themes, subscription purchase/restore, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, themes, and sync.

## Overview

Build an original mobile Markdown notes app inspired by Bear: hashtag-based organization, beautiful typography, rich-link previews, themes, and paid sync across devices.

The clone must not copy Bear branding, iconography, typography licensing, themes, or private APIs.

## Goals

- Markdown editor with inline hashtag organization.
- Nested hashtags automatically form a tag tree.
- Rich-link previews and image embedding.
- Themes and customizable typography.
- Cross-device sync (paid tier).

## Non-Goals

- Do not imply Shiny Frog affiliation.
- Do not copy themes or typography assets.
- Do not ship team collaboration in V1.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/bear-markdown-notes/id1016366447 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Bear Support | https://bear.app/faq/ | Hashtags, sync, themes | Source discovery — pending exact URL verification |
| Bear Privacy | https://bear.app/privacy/ | Personal data, sync | Source discovery — pending exact URL verification |
| Bear Product | https://bear.app/ | Product features | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Notes are Markdown with inline #hashtag organization.
- Nested hashtags with slash (e.g. #work/meetings) form a tree.
- Rich-link previews render in notes for URLs.
- Image embedding with local storage.
- Paid sync across devices with encryption in transit and at rest.

## Core User Journeys

- User creates a note with #work and #work/meetings; tag tree updates.
- User pastes a URL; preview card appears with fetched metadata.
- User embeds image from library.
- User changes theme and typography.
- User enables sync (paid) and sees notes across devices.
- User searches by text or hashtag.
- User pins favorite notes.
- User exports note as Markdown/PDF.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Sidebar | Tag tree + smart folders | navigate | empty, loaded | tag cycle |
| Notes List | Filtered notes | search, sort | empty, items | stale index |
| Editor | Markdown + preview | type, paste, embed | editing, saved | conflict |
| Link Preview | Fetched metadata | auto | loaded, failed | blocked domain |
| Themes | Switch appearance | pick | applied | resource missing |
| Settings | Sync, typography | toggles | loaded | sync error |
| Subscription | Plans and restore | plan, restore | free, paid | webhook delay |
| Export | Export formats | pick, share | generated | format unsupported |

## Data Model

- `Note` (id, content, tags, pinned, archived), `Tag`, `LinkPreviewCache`, `Image`, `Theme`, `Typography`, `SyncOp`, `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/session`, `DELETE /account`.
- `GET /notes`, `POST /notes`, `PATCH /notes/:id`, `DELETE /notes/:id`.
- `GET /sync/ops?since=`, `POST /sync/ops`.
- `POST /link-previews` (server-side fetch with safe rules).
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Offline-first; sync opportunistic.
- Link previews cached; refresh on demand.
- Push for sync status (optional).
- Images stored locally; uploaded to sync service when paid.

## Permissions, Privacy, And Safety

- No telemetry by default; opt-in.
- Link-preview fetcher uses SSRF-safe rules; no fetch from private networks.
- Sync E2EE optional (preferred) or in-transit encrypted; document the tradeoff.
- Analytics exclude note content.
- Export + delete account.

## Analytics And Monetization

- Events: note created/edited, tag created, link preview fetched, theme changed, sync enabled.
- Tiers: free + paid sync; original names.
- Paywall only at sync and premium themes.

## Edge Cases

- Nested hashtag with special chars.
- Link preview fetch timeout.
- Huge image embedded; resize on insert.
- Sync conflict with identical edits.
- Theme resource missing after update.

## Test Plan

- Unit tests for hashtag parser, tag tree builder, sync merge.
- Contract tests for notes and sync endpoints.
- Integration tests for create -> tag -> search -> export.
- SSRF-safety tests for link preview fetcher.
- Billing tests for sync subscription.
- Accessibility tests for editor and tag tree.
- Manual verification: themes, sync across devices.

## Acceptance Criteria

- Source URLs verified.
- Notes + hashtags + link previews + themes complete.
- Sync works across two devices (paid).
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- E2EE or server-side encryption for sync?
- Which platforms in V1 (iOS only? Android parity?)
- Desktop companion in V2?
- Typography licensing?

## Build Plan

- Phase 1: local notes + Markdown + hashtags.
- Phase 2: link previews + image embeds.
- Phase 3: themes + typography.
- Phase 4: sync + billing.
- Phase 5: export formats.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Choose sync encryption model.
- License or commission typography.
