# Figma-Style Clone Spec

> Metadata
> - Inspiration app: Figma (mobile)
> - Category: Design
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Figma Help Center — pending exact URL verification.
> - Manual verification blockers: native file rendering performance, prototype playback, comments realtime, SSO, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, and rendering engine.

## Overview

Build an original mobile companion app inspired by Figma: browse design files, view frames, play prototypes, and leave comments. Editing is out of scope for V1.

The clone must not copy Figma branding, iconography, feature names, or private APIs.

## Goals

- Browse recent and team files.
- Open files read-only and navigate pages/frames.
- Play prototypes with hotspot-based transitions.
- Add and reply to comments with mentions.
- Share view links from mobile.

## Non-Goals

- Do not imply Figma affiliation.
- Do not implement full editing in V1.
- Do not reuse file format or internal APIs.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/figma/id1152747870 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.figma.mirror | Android listing, data safety | Source discovery — pending exact URL verification |
| Figma Help Center | https://help.figma.com/ | Comments, prototypes, mobile | Source discovery — pending exact URL verification |
| Figma Security | https://www.figma.com/security | SSO, data handling | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- File browser by team and recent.
- Viewer renders frames at high fidelity; pan/zoom.
- Prototype player supports common transition types and overlays.
- Comments anchored to coordinates; threaded replies.
- SSO and team permissions.

## Core User Journeys

- User signs in via SSO and sees recent files.
- User opens a file, navigates pages and frames.
- User plays a prototype from the starting frame and advances through hotspots.
- User adds a pinned comment on a frame and mentions a teammate.
- User replies to a thread and marks it resolved.
- User shares a view link with permissions preserved.
- User switches team or workspace.
- User receives push for mention.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Auth / SSO | Sign in | provider pick | waiting, authenticated | SSO failure |
| File Browser | Recent and team files | list, search | loaded, empty | permission denied |
| File Viewer | Pan/zoom | gestures | loaded, rendering | asset missing |
| Prototype Player | Hotspot playback | tap, swipe | playing, paused, ended | hotspot broken |
| Comments | Add/reply | write, mention | empty, thread, resolved | abusive content |
| Share | Generate view link | permission pick | created | permission mismatch |
| Team Switcher | Change team | select | loaded | access revoked |
| Settings | Account, notifications | toggles | loaded | admin-managed |

## Data Model

- `User`, `Team`, `Project`, `File` (manifest, pages, frames), `Frame` (tree of nodes), `Prototype` (flows, hotspots), `Comment` (anchor, thread, mentions), `ShareLink`, `Permission`, `AuditEvent`.

## API And Backend Contracts

- `POST /auth/sso/:provider`, `DELETE /auth/session`.
- `GET /teams`, `GET /teams/:id/files`.
- `GET /files/:id` (manifest), `GET /files/:id/pages/:pageId`, `GET /files/:id/frames/:frameId/assets`.
- `GET /prototypes/:id`.
- `GET /comments?fileId=`, `POST /comments`, `POST /comments/:id/reply`, `POST /comments/:id/resolve`.
- `POST /shares`, `GET /shares/:token`.
- `GET /entitlements`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Comments via WebSocket for realtime updates.
- File viewer caches manifests and used assets for offline review.
- Prototype playback may require connectivity for non-cached assets.
- Push for mentions and resolved threads — opaque.

## Permissions, Privacy, And Safety

- SSO for teams; file-level permissions.
- Share links scoped with expiry and viewer-level roles.
- Analytics exclude design content; only event types and file IDs (hashed).
- Audit log for admin actions.
- Data export + delete account.

## Analytics And Monetization

- Events: file opened, prototype started, comment added/resolved, share created, mention received.
- Tiers original; paywall identifies blocked feature (e.g. advanced sharing).

## Edge Cases

- Very large file manifest (>100MB).
- Prototype with unsupported transition type.
- Comment on deleted frame — anchor drift handling.
- Permission revoked mid-session.
- Push mention for file no longer accessible.

## Test Plan

- Unit tests for manifest parsing, anchor projection, share-link expiry.
- Contract tests for APIs.
- Integration tests for open file, play prototype, comment thread.
- Accessibility tests for pan/zoom alternatives and comment navigation.
- SSO tests.
- Manual verification: render quality, prototype playback, realtime comments.

## Acceptance Criteria

- Source URLs verified.
- File viewer and prototype playback functional.
- Comments and shares work with permission checks.
- SSO supported.
- Manual blockers feature-flagged.

## Open Questions

- Rendering engine (native, WebGL, skia)?
- Which prototype transitions ship V1?
- Offline file caching limits?
- Will editing be added in V2?

## Build Plan

- Phase 1: auth + file browser + viewer.
- Phase 2: prototype player.
- Phase 3: comments + mentions.
- Phase 4: share links + permissions.
- Phase 5: SSO + billing.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Pick rendering engine.
- Define file manifest format.
