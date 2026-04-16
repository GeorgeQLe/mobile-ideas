# 090 Todoist Clone Spec

## Legal Scope
- Clone task capture, projects, filters, recurring tasks, and reminders.
- Use original branding and task language, not copied copy or artwork.

## Product Goal
- Make task capture fast and keep personal and team work organized.

## Research Verification Checklist
- Public app surfaces, onboarding, and premium levels: verify.
- Natural-language task parsing and recurring rule behavior: verify.
- Notification timing and shared project semantics: verify.

## Core User Journeys
- User adds a task quickly from inbox.
- User organizes tasks into projects and labels.
- User views a filtered list for today or upcoming work.
- User completes recurring tasks and gets the next instance.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Inbox | Capture tasks | Title, due date | Empty, loaded | Duplicate task |
| Project | Organize work | Add, reorder | Active, empty | Archived project |
| Filter View | Focused lists | Query, labels | Results, none | Invalid filter |
| Task Detail | Task metadata | Notes, reminder | Open, closed | Recurrence error |
| Paywall | Convert free user | Plan, restore | Trial, error | Billing issue |

## Functional Requirements
- Support quick add with natural language due dates and priority.
- Support projects, sections, labels, comments, reminders, and recurring tasks.
- Allow drag and drop reordering inside lists.
- Track completion, snooze, and archived states.
- Support shared projects if collaboration is enabled.

## Data Model
- `User`, `Task`, `Project`, `Section`, `Label`, `Filter`, `Reminder`, `Comment`, `Subscription`.
- Store recurrence rules as normalized schedule definitions.

## API/Backend Contracts
- `POST /tasks`
- `PATCH /tasks/{id}`
- `GET /projects/{id}/tasks`
- `GET /filters/{id}`
- `POST /reminders`

## Realtime/Push/Offline
- Push for reminders and assignment updates.
- Offline task creation and completion queue.
- Realtime sync only for shared lists.

## Permissions/Privacy/Safety
- Calendar and notification access must be optional.
- Do not expose private task content through notifications.
- Support account deletion and data export.

## Analytics Events
- `task_added`, `task_completed`, `task_snoozed`, `project_created`, `filter_used`, `reminder_set`, `shared_task_updated`, `paywall_viewed`.

## Monetization
- Freemium with premium filters, reminders, themes, and collaboration options.

## Acceptance Tests
- Add a task with a natural-language due date.
- Complete a recurring task and receive the next instance.
- Work offline, create tasks, and sync later.
- Restore a premium subscription successfully.

## Implementation Notes
- Parse natural-language dates server-side for consistency across locales.
- Make task completion idempotent to avoid duplicate recurrence creation.
- Keep inbox capture latency extremely low.

