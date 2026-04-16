# Quizlet-Style Clone Spec

## Legal Scope
- Build a flashcard and study app with original branding, copy, and card styles.
- Do not copy Quizlet marks, existing study-set content, or proprietary quiz modes.
- Use original or licensed study materials only.
- OCR or scan import should be treated as a separate, optional module.

## Product Goal
- Let users create study sets, learn them in multiple modes, and track progress over time.
- Make set creation and study mode switching frictionless on mobile.

## Research Verification Checklist
- Verify flashcard set creation, studying, and progress surfaces from public observation.
- Verify learn, test, and matching-style modes if present in the app.
- Verify class folders, imports, and study streak behavior.
- Verify premium gating and collaborative sharing details from support content.

## Core User Journeys
- User creates a flashcard set and begins studying immediately.
- User switches between learn, test, and matching modes.
- User imports a set from scan or text and edits cards.
- User organizes sets into classes or folders and shares them.
- User reviews mistakes and returns to weak cards later.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Recent sets and streak | None | Populated, empty | No sets |
| Set Detail | Card list and actions | Set id | Editable, shared | Empty set |
| Editor | Card creation | Term, definition | Draft, saved | Duplicate card |
| Learn Mode | Guided study | Swipe, tap | Active, complete | Wrong answer |
| Test Mode | Assessment flow | Answer input | Running, scored | Skip action |
| Match Mode | Timed matching game | Drag, tap | Active, finished | Small screen |
| Classes | Folder organization | Class select | Populated, empty | Shared conflict |
| Import | Scan or paste content | Camera, text | Parsing, failed | OCR error |
| Profile | Progress and settings | None | Active, hidden | Shared device |

## Functional Requirements
- Support create, edit, duplicate, and delete flashcard sets.
- Support learn, test, and matching study modes.
- Support tagging, folders, and class organization.
- Support scan or text import as an optional ingestion path.
- Track streaks, progress, weak cards, and recent sessions.
- Support sharing and collaboration with explicit permissions.
- Provide question shuffling, answer grading, and retry loops.
- Make study sessions resumable across app restarts.

## Data Model
- `User`: profile, streak, subscription, study prefs.
- `Set`: title, owner, visibility, tags, folder id.
- `Card`: front, back, hint, media refs, ordering.
- `StudySession`: mode, score, duration, weak card ids.
- `ClassFolder`: name, members, set ids.
- `ImportJob`: source, progress, parse results, failure reason.
- `Streak`: count, last studied date, freeze state.

## API/Backend Contracts
- `GET /home`, `GET /sets/{id}`, `POST /sets`, `PATCH /sets/{id}`.
- `POST /cards`, `PATCH /cards/{id}`, `DELETE /cards/{id}`.
- `POST /study/start`, `POST /study/answer`, `POST /study/complete`.
- `GET /classes`, `POST /classes`, `POST /imports`, `GET /imports/{id}`.
- `GET /streak`, `POST /share`, `POST /duplicate`.
- Study mode content should be versioned and cursor-based for large sets.

## Realtime/Push/Offline
- Push streak reminders, shared set updates, and import completion.
- Cache recent sets, weak cards, and session progress offline.
- Queue answer submissions if connectivity is lost during study.

## Permissions/Privacy/Safety
- Request camera only for scan import and only when used.
- Keep study content private unless the user explicitly shares it.
- Provide report and block controls for shared sets.

## Analytics Events
- `set_created`, `card_added`, `study_started`, `study_completed`
- `mode_selected`, `import_started`, `import_completed`, `set_shared`
- `streak_updated`, `weak_card_reviewed`

## Monetization
- Use premium gating for advanced study modes, offline, and large-set tools.
- Keep the core create-and-study loop free enough to remain useful.

## Acceptance Tests
- User can create a set, add cards, and start study immediately.
- User can switch from learn to test mode in one session.
- User can import a set and correct parsing mistakes.
- User can create a class folder and move sets into it.
- Offline session progress resumes without losing answer state.

## Implementation Notes
- Keep answer grading logic deterministic and isolated from UI state.
- Treat scan import as an async pipeline so OCR failures are recoverable.
- Preserve card ordering explicitly so study sessions are reproducible.
