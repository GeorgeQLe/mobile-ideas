# Miro-Style Clone Spec

> Metadata
> - Inspiration app: Miro
> - Category: Whiteboard
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, help center — pending exact URL verification.
> - Manual verification blockers: native pan/zoom performance, realtime collaboration latency, templates gallery licensing, SSO, and accessibility passes still require a test account.
> - Legal scope: functional parity only; use original UI, branding, templates (licensed or original), and API.

## Overview

Build an original mobile collaborative whiteboard app inspired by Miro: infinite canvas, sticky notes, shapes, frames, templates, and realtime collaboration with pan/zoom UX.

The clone must not copy Miro branding, templates gallery content, iconography, or private APIs.

## Goals

- Infinite canvas with pan, zoom, and frame navigation.
- Sticky notes, shapes, connectors, text, and images.
- Realtime multi-user cursors and edits.
- Templates gallery (original or licensed content).
- Comment threads anchored to elements.

## Non-Goals

- Do not imply Miro affiliation.
- Do not copy templates from proprietary galleries.
- Do not ship enterprise DLP features in V1.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/miro-online-whiteboard/id1175579359 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.miro.android | Android listing, data safety | Source discovery — pending exact URL verification |
| Miro Help | https://help.miro.com/ | Canvas, sticky notes, frames, templates | Source discovery — pending exact URL verification |
| Miro Security | https://miro.com/trust/ | SSO, data handling | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Canvas supports pan/zoom with min/max.
- Sticky notes, rectangles, ellipses, text, connectors.
- Frames act as containers; presentation mode.
- Realtime presence with cursors.
- SSO for enterprise.

## Core User Journeys

- User signs in, picks a board, sees recent cursors.
- User drops sticky note, types content, changes color.
- User connects two elements with a connector.
- User creates a frame and groups items.
- User starts presentation mode and navigates frames.
- User opens comments thread on a sticky.
- User inserts template into canvas.
- User shares view/edit link with expiry.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / SSO | Sign in | provider pick | waiting, authenticated | SSO failure |
| Dashboard | Recent boards | list | empty, items | offline |
| Board | Canvas | pan/zoom, add | loaded, editing | conflict |
| Toolbar | Add elements | select type | selected | disabled (permission) |
| Frame / Presentation | Navigate frames | next/prev | presenting, idle | frame missing |
| Templates | Browse and insert | search | loaded, inserted | template too large |
| Comments | Anchored threads | add, reply | empty, thread | anchor drift |
| Share | Generate link | permission | created | mismatch |
| Settings | Account, notifications | toggles | loaded | admin-managed |

## Data Model

- `User`, `Team`, `Board`, `CanvasElement` (sticky, shape, text, image, connector), `Frame`, `Presentation`, `Presence` (cursor, selection), `Comment`, `Template`, `ShareLink`, `Permission`, `AuditEvent`, `Entitlement`.

## API And Backend Contracts

- `POST /auth/sso/:provider`, `DELETE /auth/session`.
- `GET /boards`, `POST /boards`, `GET /boards/:id` (manifest + recent elements).
- WebSocket `ws /boards/:id`: element create/update/delete, presence, comments.
- `POST /elements`, `PATCH /elements/:id`, `DELETE /elements/:id`.
- `POST /frames`, `POST /presentations/:id/start`.
- `GET /templates`, `POST /boards/:id/insert-template`.
- `GET /comments?boardId=`, `POST /comments`.
- `POST /shares`, `GET /shares/:token`.
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Realtime via WebSocket with CRDT or OT-style merges.
- Offline read of last state; offline writes queued for small edits only.
- Push for mentions and comment replies — opaque.
- Presentation state broadcast to all participants.

## Permissions, Privacy, And Safety

- Role-based permission on board.
- Share links with expiry and role.
- SSO for enterprise.
- Audit log for admin actions.
- Analytics exclude content; only event types.
- Export + delete account.

## Analytics And Monetization

- Events: board opened, element added, template inserted, presentation started, comment added, share created.
- Tiers original; paywall identifies blocked feature (template packs, participants).

## Edge Cases

- Large board with 10k elements on phone — viewport culling.
- Offline conflict with server-side delete.
- Connector pointing to deleted element.
- Template insertion over existing content.
- Presentation across slow networks.

## Test Plan

- Unit tests for CRDT merge, viewport culling, anchor projection.
- Contract tests for WebSocket events.
- Integration tests for multi-user presence, template insertion, presentation.
- SSO tests.
- Accessibility tests for alternatives to pan/zoom.
- Billing tests.
- Manual verification: realtime on device, large boards.

## Acceptance Criteria

- Source URLs verified.
- Canvas + realtime + templates + comments functional.
- SSO supported.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- CRDT library?
- Canvas rendering engine (native, WebGL)?
- Template licensing source?
- Offline editing scope?

## Build Plan

- Phase 1: auth + board + basic elements.
- Phase 2: realtime presence + edits.
- Phase 3: frames + presentation mode.
- Phase 4: templates + comments.
- Phase 5: sharing + SSO.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Pick CRDT and rendering engines.
- Define template licensing.
