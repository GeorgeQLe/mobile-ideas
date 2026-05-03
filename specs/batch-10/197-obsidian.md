# Obsidian-Style Clone Spec

> Metadata
> - Inspiration app: Obsidian
> - Category: Notes
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-03.
> - Verification basis: exact public marketplace listings, Obsidian help/security/sync/publish/pricing pages, and public mobile feature descriptions.
> - Manual verification blockers: native file-system vault behavior, plugin sandboxing, sync service, and accessibility passes still require a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, icons, screenshots, proprietary sync/plugin implementations, private APIs, plugin registry content, and customer note content.

## Overview

Build an original mobile Markdown notes app inspired by Obsidian's public product and help materials: local-first vaults, Markdown files, wiki links/backlinks, graph visualization, search, commands, themes, plugins, and optional encrypted sync.

The clone must not copy Obsidian branding, iconography, screenshots, UI copy, proprietary sync/plugin implementations, private APIs, community plugin registry content, or customer note content. V1 can reproduce comparable personal-knowledge-management jobs and interaction patterns with original terminology, original UI, and documented public behavior.

This spec is implementation-ready for a public-source V1. Any feature marked `Manual verification required` must remain feature-flagged until lawful hands-on verification confirms exact native behavior.

## Goals

- Local Markdown vault on device with folder structure.
- Wiki-style [[backlinks]] with live indexing.
- Graph view showing note connections.
- Plugin system with sandboxed execution.
- Optional end-to-end encrypted sync service.
- Search, command palette, themes, mobile toolbar customization, and safe import/export of vault folders.
- Local-first operation with no account required for core note editing.

## Non-Goals

- Do not imply Obsidian affiliation.
- Do not reuse plugin code or registry entries.
- Do not bypass platform file-system restrictions.
- Do not claim desktop/plugin parity until mobile plugin behavior is manually verified.
- Do not upload note text, filenames, backlinks, or vault metadata to analytics/support without explicit consent.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/obsidian-connected-notes/id1557175442 | Official iOS listing, mobile positioning, privacy labels, platform support | Verified 2026-05-03 |
| Google Play | https://play.google.com/store/apps/details?id=md.obsidian | Official Android listing, data-safety summary, mobile feature list | Verified 2026-05-03 |
| Obsidian Product Page | https://obsidian.md/ | Public local-first positioning, Markdown-file model, links, graph, plugins, sync/publish services | Verified 2026-05-03 |
| Obsidian Help | https://help.obsidian.md/ | Vaults, files, links/backlinks, graph, search, commands, mobile, plugins, sync support taxonomy | Verified 2026-05-03 |
| Obsidian Sync | https://obsidian.md/sync | Paid encrypted sync positioning, version history, device sync context | Verified 2026-05-03 |
| Obsidian Security | https://obsidian.md/security | Security posture, reporting channel, sync encryption context | Verified 2026-05-03 |
| Obsidian Pricing | https://obsidian.md/pricing | Commercial-use, Sync, Publish, and add-on entitlement signals | Verified 2026-05-03 |

## Detailed Design

### Source-Backed Product Requirements

- Vault stored as Markdown files on device.
- Backlinks indexed locally and updated on save.
- Graph view renders note-link graph interactively.
- Plugins loaded with permission prompts and sandbox.
- Sync service uses client-side encryption; server never sees plaintext.
- Core editor must work without account creation and store notes as user-accessible Markdown files where platform storage APIs permit.
- Vault picker must respect iOS document-provider and Android storage-access constraints; exact native file behavior remains `Manual verification required`.
- Backlink index must update on note create/edit/rename/delete and preserve unresolved links as first-class references.
- Graph view must provide a non-visual list alternative for accessibility and large-vault performance.
- Search must support filename, full-text, tag, backlink, and command-like scoped queries without sending content off device.
- Plugin host must be capability-based; file, network, clipboard, and vault metadata access require declared scopes and user review.
- Theme/custom CSS support must avoid copying Obsidian theme assets and must sandbox unsafe resource loads.
- Sync must encrypt note content client-side, provide conflict/version history, and explain unrecoverable-key behavior before enrollment.
- Publish/web publishing is out of V1 unless implemented as an original export/static-site flow with separate consent.

## Core User Journeys

- User creates a new vault; picks folder on device.
- User creates a note, adds [[backlink]], sees linked note autocomplete.
- User opens graph view, inspects clusters.
- User installs a plugin after reviewing scopes.
- User enables sync, enters passphrase, sees vault reappear on second device.
- User exports vault as zip.
- User deletes a note; backlinks updated.
- User disables a plugin.
- User imports an existing folder of Markdown files and sees links indexed.
- User renames a note; inbound links are updated or surfaced for confirmation.
- User searches a large vault offline and opens matching notes.
- User changes theme/mobile toolbar settings.
- User loses sync passphrase and sees unrecoverable-data guidance.
- User exports/deletes sync account data while retaining local vault files by choice.

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
| Search / Command Palette | Find notes and actions | query, command | results, empty | index stale |
| Graph Detail | Inspect connections | pan, filter, select | loaded, filtered | too dense |
| Theme / Appearance | Customize editor | theme, font, CSS | applied | unsafe CSS |
| Import / Export | Move vault data | folder, zip | imported, exported | permission revoked |
| Account / Billing | Sync and commercial entitlements | login, restore | free, paid | entitlement stale |

## Data Model

- `Vault`: storage provider, root URI/path, settings, encryption/sync state, last indexed revision.
- `Note`: relative path, title, content reference, frontmatter, mtime, checksum, deleted/renamed state.
- `Folder`: relative path, children, sort order, external-change marker.
- `LinkIndex`: outbound links, inbound links, unresolved links, block anchors, tag refs.
- `SearchIndex`: token references, file refs, updated revision, corruption marker.
- `GraphSnapshot`: nodes, edges, filters, layout cache, accessibility summary.
- `Plugin`: manifest, source reference, version, requested scopes, enabled state, runtime health.
- `PluginPermission`: plugin, capability, grant state, last used, revocation reason.
- `Theme`: manifest, resources, CSS/safe-style policy, user settings.
- `SyncConfig`: account, device keys, vault key, passphrase status, sync cursor.
- `SyncOp`: encrypted payload, entity/path, base revision, conflict marker, idempotency key.
- `Entitlement`: sync/commercial/publish add-ons, billing owner, renewal/expiration.
- `AuditEvent`: vault, plugin, sync, permission, billing, export/delete, and support events.

## API And Backend Contracts

- Most operations are local; sync is the main network surface.
- `POST /sync/register` (device enroll), `POST /sync/keys` (public key exchange).
- `POST /sync/ops` (encrypted change log), `GET /sync/ops?since=`.
- `POST /billing/webhook`, `GET /entitlements` (for sync subscription).
- Plugin host: capability-based local API; no network unless plugin declares scope.
- `POST /vaults/import`, `GET /vaults/:id/export`: local/import-export facades for tests.
- `GET /search?q=`, `POST /index/rebuild`: local index/query surfaces.
- `POST /plugins/install`, `PATCH /plugins/:id/permissions`, `DELETE /plugins/:id`: plugin lifecycle.
- `POST /data-export`, `DELETE /account`: sync/account privacy lifecycle.

## Realtime, Push, And Offline Behavior

- Fully offline-capable; sync opportunistic.
- Encrypted sync uses CRDT or versioned ops; conflicts surface to user.
- Push not required; optional for sync completion.
- Plugins must not background-sync unless declared.
- File-system changes outside the app are detected through platform document/storage events where available and by safe rescan otherwise.
- Large-vault indexing runs incrementally with pause/resume and progress state.
- Conflict resolution stores both versions and never silently overwrites local Markdown files.
- Plugin execution is disabled while permission state is unknown or after runtime crash loops.

## Permissions, Privacy, And Safety

- File-system scope minimized per platform (iOS document picker; Android SAF).
- Sync uses E2EE; server stores only ciphertext and metadata.
- Plugins sandboxed; network/file scopes require user approval.
- Analytics exclude note content; only event types.
- No telemetry by default; opt-in.
- Data export as zip always available.
- Filenames, note titles, backlinks, tags, graph metadata, and plugin names are treated as sensitive by default.
- Sync credentials, vault keys, plugin tokens, and storage grants require encrypted storage and redacted logs.
- Plugin marketplace/registry browsing is a separate network feature and must not auto-install remote code.
- Support diagnostics require explicit user consent before including vault structure or plugin lists.
- Account delete removes cloud sync data while preserving local vault files only if the user chooses.

## Analytics And Monetization

- Events: vault opened, note created, backlink created, plugin installed, sync enabled.
- Model: free app; paid optional sync subscription.
- Paywall only at sync enablement.
- Analytics payloads use event type, counts, latency, platform, failure code, and vault-size bucket only.
- Entitlements may gate sync, commercial use, publish-like add-ons, or advanced backup, but local editing remains available without an account.
- Billing must handle trial, active, expired, canceled, refunded, restored, web-owned, and store-owned states.

## Edge Cases

- Large vault (10k+ notes) indexing time.
- File system renames outside app; index must reconcile.
- Sync conflict on same note edited on two devices.
- Plugin attempts disallowed API call.
- Passphrase lost; server cannot recover (by design).
- External editor renames or deletes files while app is indexing.
- Markdown file has invalid encoding, huge attachments, or conflicting frontmatter.
- Backlink rename would update generated code blocks or fenced content incorrectly.
- Graph has 10k+ nodes and must fall back to filtered/list mode.
- Plugin requests network access after installation.
- Sync device restores with stale key material or partial encrypted ops.
- Storage permission revoked while editor has unsaved changes.

## Test Plan

- Unit tests for link index, CRDT merge, plugin sandbox boundary.
- Contract tests for sync/ops endpoint.
- Integration tests for vault -> note -> link -> graph.
- Sync tests across two devices with conflicts.
- Plugin tests for scope enforcement.
- Accessibility tests for editor, preview, graph alternatives.
- Billing tests for sync subscription.
- Manual verification: file-system behavior per platform, sync across devices.
- Unit tests for Markdown link parsing, backlink updates, rename propagation, search indexing, graph filtering, plugin permissions, sync encryption envelopes, and conflict resolution.
- Contract tests for encrypted sync ops, entitlements, plugin lifecycle, import/export, data export/delete, and audit events.
- Integration tests for vault create -> note -> backlink -> graph -> search -> export.
- Large-vault performance tests for indexing, graph summarization, search, and sync queue memory use.
- Privacy/security tests for analytics redaction, plugin sandbox escape attempts, storage grants, sync key handling, support diagnostics, and account deletion.
- Accessibility tests for editor, file browser, command palette, graph list alternative, focus order, dynamic type, keyboard navigation, and reduced motion.
- Manual verification tests: iOS/Android file-system behavior, mobile plugin runtime, sync enrollment/recovery, store purchase/restore, and mobile accessibility.

## Acceptance Criteria

- Source URLs verified.
- Local vault + backlinks + graph + plugins functional.
- Sync uses E2EE and is testable.
- Entitlements reconcile.
- Manual blockers feature-flagged.
- A downstream team can build V1 without Obsidian brand assets, proprietary plugin/sync code, private APIs, registry content, screenshots, UI copy, or customer notes.
- Vault storage, Markdown editing, backlinks, graph, search, plugins, themes, sync, import/export, billing, and account deletion have deterministic contracts and failure states.
- Analytics, logs, support diagnostics, plugin permissions, sync metadata, and graph/search indexes minimize note-content, filename, and vault-structure exposure.
- Local-first editing remains available without account signup, and sync enrollment clearly documents unrecoverable-key tradeoffs.
- Manual verification blockers remain feature flags or launch blockers until evidence is captured.

## Open Questions

- Plugin language/runtime (JS sandbox)?
- Sync storage backend (object store)?
- Graph engine (WebGL, native)?
- Mobile plugin parity with desktop?
- Which mobile storage model is V1: app sandbox, document provider, Android SAF, or user-selected folder only?
- Which plugin scopes are allowed in V1 and how are remote plugin updates reviewed?
- Is publish/static web export in scope or deferred behind a separate legal/privacy review?

## Build Plan

- Phase 1: scaffold local vault storage, Markdown editor/preview, file browser, safe import/export, and privacy-safe analytics.
- Phase 2: add backlink/tag parsing, search index, rename/delete reconciliation, command palette, and graph list fallback.
- Phase 3: add graph visualization, large-vault performance controls, theme/appearance system, and accessibility alternatives.
- Phase 4: add capability-based plugin host, permission review/revocation, sandbox tests, crash-loop handling, and no-copy theme/plugin policy.
- Phase 5: add encrypted sync account, device enrollment, conflict/version history, billing/entitlements, export/delete, and support diagnostics consent.
- Phase 6: complete storage-platform verification, sync/plugin/security tests, accessibility, privacy review, and manual native verification.

## Next Steps

- Resolve manual verification blockers before claiming one-for-one native parity.
- Decide V1 storage, plugin, graph, and sync/billing scope.
- Create or link the downstream implementation repository when Phase 1 is ready.
