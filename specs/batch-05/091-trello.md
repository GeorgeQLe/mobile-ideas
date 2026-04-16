# 091 Trello Clone Spec

## Legal Scope
- Clone board, list, card, assignment, attachment, and basic automation flows.
- Use original branding and card styling, not copied icons or templates.

## Product Goal
- Give teams a simple visual board for planning and status tracking.

## Research Verification Checklist
- Public board behaviors, templates, and premium features: verify.
- Card detail, drag/drop, and notification semantics: verify.
- Sharing and permission levels: verify.

## Core User Journeys
- User creates a board and adds lists.
- User adds cards, assigns members, and attaches files.
- User reorders cards with drag and drop.
- User opens activity history and notification inbox.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Board | Visual planning | Lists, cards | Empty, populated | Huge board |
| Card Detail | Task detail | Notes, members | Open, closed | Missing attachment |
| Activity | Change history | Filters | Recent, older | Deleted actor |
| Templates | Fast setup | Choose board | Loaded, empty | No template |
| Share | Access control | Invite, role | Pending, active | Expired link |

## Functional Requirements
- Support boards, lists, cards, labels, due dates, checklists, and attachments.
- Support drag and drop between lists and boards.
- Track card activity and comments.
- Provide board templates and simple automation rules.
- Maintain a fast board load path with incremental fetch.

## Data Model
- `Workspace`, `Board`, `List`, `Card`, `ChecklistItem`, `Label`, `Member`, `Attachment`, `Activity`.
- Store card position as an ordered index for cheap reordering.

## API/Backend Contracts
- `GET /boards/{id}`
- `POST /boards`
- `POST /lists`
- `PATCH /cards/{id}`
- `POST /cards/{id}/attachments`
- `POST /automation/rules`

## Realtime/Push/Offline
- Realtime board updates for shared users.
- Offline card edits queue and reconcile on reconnect.
- Push for mentions, assignments, and due dates.

## Permissions/Privacy/Safety
- Respect board, list, and card-level visibility.
- Hide private attachment URLs behind signed access.
- Support deletion and export.

## Analytics Events
- `board_created`, `card_added`, `card_moved`, `attachment_added`, `member_invited`, `automation_used`, `due_date_set`, `notification_opened`.

## Monetization
- Freemium with advanced automation, larger attachments, and admin features behind paid tiers.

## Acceptance Tests
- Create a board, add lists, and move a card between them.
- Invite a collaborator and verify permissions.
- Work offline and sync a card edit later.
- Open activity history and confirm actions are recorded.

## Implementation Notes
- Use ordered list and card positions to prevent expensive reindexing.
- Keep drag/drop optimistic but reconcile server ordering on conflict.
- Make templates server-defined so they can be updated independently.

