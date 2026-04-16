# 097 Canva Clone Spec

## Legal Scope
- Clone design creation, templates, layers, sharing, and export workflows.
- Use original branding, templates, and design assets.

## Product Goal
- Let users create social graphics, presentations, posters, and simple branded designs on mobile.

## Research Verification Checklist
- Public template browsing, editor layout, and export options: verify.
- Brand kit, collaboration, and premium features: verify.
- Mobile editing limits and autosave behavior: verify.

## Core User Journeys
- User picks a template and edits text and images.
- User starts from a blank canvas and adds elements.
- User shares a design for comment or export.
- User revisits a saved design and continues editing.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Entry and templates | New, recent, browse | Loaded, empty | No templates |
| Editor | Canvas editing | Text, shapes, images | Editing, read-only | Conflict |
| Layers | Object ordering | Reorder, lock | Visible, hidden | Missing element |
| Share | Collaboration | Link, invite | Pending, active | Revoked access |
| Export | Final output | Type, size | Queued, done | Unsupported size |

## Functional Requirements
- Support text, image, shape, sticker, chart, and background elements.
- Support drag, resize, align, group, lock, and duplicate on the canvas.
- Support template start points and blank designs.
- Support comment and share permissions.
- Autosave and restore design state.

## Data Model
- `Design`, `Template`, `Layer`, `TextStyle`, `ImageAsset`, `BrandKit`, `Comment`, `ShareGrant`, `ExportJob`.
- Store canvas objects with stable ids and transform data.

## API/Backend Contracts
- `GET /templates`
- `POST /designs`
- `PATCH /designs/{id}`
- `POST /designs/{id}/comments`
- `POST /exports`
- `POST /brand-kits`

## Realtime/Push/Offline
- Realtime collaboration for shared designs.
- Offline editing with queued sync for local objects and text edits.
- Push for comments, invites, and export completion.

## Permissions/Privacy/Safety
- Respect design visibility and team access controls.
- Keep uploaded assets private unless shared.
- Do not prefill copyrighted stock content without a licensed source.

## Analytics Events
- `template_selected`, `element_added`, `element_resized`, `comment_added`, `share_created`, `export_started`, `export_completed`, `brand_kit_used`.

## Monetization
- Freemium with premium templates, brand kits, storage, and export quality tiers.

## Acceptance Tests
- Create a design from template and export it.
- Add text and image layers and reorder them.
- Share a design and leave a comment.
- Reopen a saved design offline and continue editing.

## Implementation Notes
- Keep canvas operations optimistic and reconcile only on save conflicts.
- Separate template metadata from editable document state.
- Use a deterministic layout engine for text wrapping and alignment.

