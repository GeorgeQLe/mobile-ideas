# Obsidian-Style Clone Spec

> Metadata
> - Inspiration app: Obsidian
> - Category: Notes
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, Obsidian help site — pending exact URL verification.
> - Manual verification blockers: native file-system vault behavior, plugin sandboxing, sync service, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original UI, branding, and optional sync.

## Overview

Build an original mobile Markdown notes app inspired by Obsidian: local-first vault, wiki-style backlinks, graph view, plugins, and optional encrypted sync.

The clone must not copy Obsidian branding, iconography, feature names, or plugin registry contents.

## Goals

- Local Markdown vault on device with folder structure.
- Wiki-style [[backlinks]] with live indexing.
- Graph view showing note connections.
- Plugin system with sandboxed execution.
- Optional end-to-end encrypted sync service.

## Non-Goals

- Do not imply Obsidian affiliation.
- Do not reuse plugin code or registry entries.
- Do not bypass platform file-system restrictions.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/obsidian-connected-notes/id1557175442 | iOS listing, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=md.obsidian | Android listing, data safety | Source discovery — pending exact URL verification |
| Obsidian Help | https://help.obsidian.md/ | Vaults, backlinks, plugins, sync | Source discovery — pending exact URL verification |
| Obsidian Security | https://obsidian.md/security | Local-first, sync encryption | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Vault stored as Markdown files on device.
- Backlinks indexed locally and updated on save.
- Graph view renders note-link graph interactively.
- Plugins loaded with permission prompts and sandbox.
- Sync service uses client-side encryption; server never sees plaintext.

## Core User Journeys

- User creates a new vault; picks folder on device.
- User creates a note, adds [[backlink]], sees linked note autocomplete.
- User opens graph view, inspects clusters.
- User installs a plugin after reviewing scopes.
- User enables sync, enters passphrase, sees vault reappear on second device.
- User exports vault as zip.
- User deletes a note; backlinks updated.
- User disables a plugin.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Vault Picker | Choose/create vault | pick folder | empty, loaded | permission denied |
| File Browser | Folders + notes | navigate | loaded, empty | disk full |
| Note Editor | Markdown editor | type, link | editing, saved | conflict |
| Preview | Rendered Markdown | toggle | rendered | render error |
| Backlinks Panel | Incoming links | tap | loaded, empty | stale index |
| Graph View | Interactive graph | pan/zoom | loaded | perf limit |
| Plugins | Browse/install/remove | install, disable | none, installed | sandbox violation |
| Sync | Enable/disable | passphrase | off, on, syncing | passphrase wrong |
| Settings | Appearance, hotkeys | toggles | loaded | restricted |

## Data Model

- `Vault` (path, settings), `Note` (path, content, mtime, checksum), `LinkIndex` (edges), `GraphSnapshot`, `Plugin` (manifest, scopes, state), `SyncConfig` (keys, device ids), `Entitlement`, `AuditEvent`.

## API And Backend Contracts

- Most operations are local; sync is the main network surface.
- `POST /sync/register` (device enroll), `POST /sync/keys` (public key exchange).
- `POST /sync/ops` (encrypted change log), `GET /sync/ops?since=`.
- `POST /billing/webhook`, `GET /entitlements` (for sync subscription).
- Plugin host: capability-based local API; no network unless plugin declares scope.

## Realtime, Push, And Offline Behavior

- Fully offline-capable; sync opportunistic.
- Encrypted sync uses CRDT or versioned ops; conflicts surface to user.
- Push not required; optional for sync completion.
- Plugins must not background-sync unless declared.

## Permissions, Privacy, And Safety

- File-system scope minimized per platform (iOS document picker; Android SAF).
- Sync uses E2EE; server stores only ciphertext and metadata.
- Plugins sandboxed; network/file scopes require user approval.
- Analytics exclude note content; only event types.
- No telemetry by default; opt-in.
- Data export as zip always available.

## Analytics And Monetization

- Events: vault opened, note created, backlink created, plugin installed, sync enabled.
- Model: free app; paid optional sync subscription.
- Paywall only at sync enablement.

## Edge Cases

- Large vault (10k+ notes) indexing time.
- File system renames outside app; index must reconcile.
- Sync conflict on same note edited on two devices.
- Plugin attempts disallowed API call.
- Passphrase lost; server cannot recover (by design).

## Test Plan

- Unit tests for link index, CRDT merge, plugin sandbox boundary.
- Contract tests for sync/ops endpoint.
- Integration tests for vault -> note -> link -> graph.
- Sync tests across two devices with conflicts.
- Plugin tests for scope enforcement.
- Accessibility tests for editor, preview, graph alternatives.
- Billing tests for sync subscription.
- Manual verification: file-system behavior per platform, sync across devices.

## Acceptance Criteria

- Source URLs verified.
- Local vault + backlinks + graph + plugins functional.
- Sync uses E2EE and is testable.
- Entitlements reconcile.
- Manual blockers feature-flagged.

## Open Questions

- Plugin language/runtime (JS sandbox)?
- Sync storage backend (object store)?
- Graph engine (WebGL, native)?
- Mobile plugin parity with desktop?

## Build Plan

- Phase 1: local vault + Markdown editor.
- Phase 2: backlinks + preview + search.
- Phase 3: graph view.
- Phase 4: plugin host + registry.
- Phase 5: E2EE sync + billing.
- Phase 6: accessibility + manual verification.

## Next Steps

- Verify source URLs.
- Choose plugin sandbox technology.
- Design E2EE sync protocol.
