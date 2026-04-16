# 093 Evernote Clone Spec

## Legal Scope
- Clone note creation, notebooks, tags, search, attachments, and clipping-like capture workflows.
- Use original branding and note visuals.

## Product Goal
- Offer a fast note capture system with strong search and organization.

## Research Verification Checklist
- Public product structure, note editor, and OCR search behavior: verify.
- Notebook, tag, and sharing permissions: verify.
- Mobile clip, camera scan, and offline sync behavior: verify.

## Core User Journeys
- User creates a note from text or camera.
- User organizes notes into notebooks and tags.
- User searches text, image OCR, and attachments.
- User shares a note or exports it.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Notes List | Browse notes | Search, sort | Empty, loaded | Duplicate note |
| Editor | Create/edit note | Text, images | Editing, read-only | Conflict |
| Notebook View | Organize notes | Select notebook | Empty, populated | Archived item |
| Search | Find content | Query, filter | Results, none | OCR pending |
| Share | Collaborate/export | Email, link | Pending, sent | Revoked link |

## Functional Requirements
- Support rich text notes, checklists, images, files, and voice attachments.
- Support notebooks, tags, pinned notes, and reminders.
- Support OCR indexing for images and scans.
- Allow web clip or capture-style import where platform permits.
- Sync changes across devices.

## Data Model
- `User`, `Note`, `Notebook`, `Tag`, `Attachment`, `Reminder`, `OCRIndex`, `ShareLink`, `ExportJob`.
- Store note content as a versioned rich document.

## API/Backend Contracts
- `GET /notes`
- `POST /notes`
- `PATCH /notes/{id}`
- `GET /search?q=`
- `POST /attachments`
- `POST /shares`

## Realtime/Push/Offline
- Offline note creation and edits with queued sync.
- Push for reminders and shared note activity.
- Realtime only for shared editing if enabled.

## Permissions/Privacy/Safety
- Camera permission only for scanning.
- Keep OCR content and attachments private by default.
- Provide export and delete-account controls.

## Analytics Events
- `note_created`, `note_edited`, `note_tagged`, `search_used`, `attachment_added`, `ocr_indexed`, `share_created`, `reminder_set`.

## Monetization
- Freemium with increased storage, OCR search, and collaboration features behind subscription.

## Acceptance Tests
- Create a note from camera input and search it later.
- Tag notes and filter by tag.
- Work offline and sync an edited note later.
- Share a note with read-only access.

## Implementation Notes
- Make OCR indexing asynchronous and separate from note save latency.
- Store note versions so sync conflicts can be merged or recovered.
- Optimize search with both text and attachment indexes.

