# 089 Notion Clone Spec

## Legal Scope
- Clone page editing, block composition, databases, sharing, and workspace sync.
- Use original branding placeholders and original iconography.

## Product Goal
- Provide a flexible notes and workspace system for personal and team organization.

## Research Verification Checklist
- Public product surfaces, block behaviors, and database views: verify.
- Collaboration, offline sync, and permissions rules: verify.
- Mobile editing limitations and sharing defaults: verify.

## Core User Journeys
- User creates a page and adds blocks.
- User builds a database and switches views.
- User shares a page with collaborators.
- User searches workspace content and reopens recent pages.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Workspace Home | Entry and recent pages | Create, search | Empty, loaded | No workspace |
| Page Editor | Block editing | Text, slash menu | Editing, read-only | Conflict |
| Database View | Structured content | Sort, filter, view | Table, board | Missing property |
| Share Dialog | Access control | Invite, role | Pending, active | Invalid email |
| Search | Find content | Query, filters | Results, none | Permission denied |

## Functional Requirements
- Support rich blocks: text, heading, checklist, todo, image, file, callout, table, database.
- Allow nested pages and templates.
- Support database records with properties and multiple views.
- Sync edits across devices and resolve conflicts safely.
- Preserve cursor position and undo history in editor.

## Data Model
- `Workspace`, `User`, `Page`, `Block`, `Database`, `Record`, `View`, `ShareGrant`, `Comment`, `Template`.
- Store block trees as versioned documents with per-block ids.

## API/Backend Contracts
- `GET /workspaces/{id}`
- `GET /pages/{id}`
- `POST /pages`
- `PATCH /pages/{id}`
- `POST /blocks/reorder`
- `POST /shares`

## Realtime/Push/Offline
- Realtime presence for collaborators and live cursors.
- Offline edits queue locally and reconcile on reconnect.
- Push for mentions, shares, and comment activity.

## Permissions/Privacy/Safety
- Respect page-level and workspace-level access control.
- Prevent leakage through search results and shared links.
- Include export and deletion tools for user content.

## Analytics Events
- `page_created`, `block_inserted`, `database_view_changed`, `share_sent`, `comment_added`, `search_used`, `conflict_resolved`, `offline_sync_completed`.

## Monetization
- Freemium with storage, collaboration, and advanced workspace features behind paid tiers.

## Acceptance Tests
- Create a page, insert blocks, and reopen it offline.
- Create a database and switch between table and board views.
- Share a page with read-only access and verify edits are blocked.
- Resolve an edit conflict without data loss.

## Implementation Notes
- Model all page content as block trees with stable block ids.
- Build sync around document patches rather than full-page replacement.
- Keep view rendering separate from content storage.

