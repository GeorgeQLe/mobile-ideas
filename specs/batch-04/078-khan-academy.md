# Khan Academy-Style Clone Spec

## Legal Scope
- Build a learning app with original branding, copy, and lesson assets.
- Do not copy Khan Academy marks, proprietary curricula, or licensed video content.
- Use original or licensed instructional media only.
- Keep mastery logic explicit and inspectable.

## Product Goal
- Help learners browse courses, watch lessons, practice, and track mastery progress.
- Make navigation feel curriculum-first rather than feed-first.

## Research Verification Checklist
- Verify course catalog, lesson pages, exercises, and progress indicators from public observation.
- Verify bookmarks, account sync, and parent or learner profile concepts.
- Verify offline or low-bandwidth handling if present in public docs.
- Verify exercises, hints, and mastery badges through hands-on use.

## Core User Journeys
- Learner opens a course, watches a lesson, and completes a practice exercise.
- Learner bookmarks a lesson and returns later to continue.
- Learner reviews mastery progress across a topic map.
- Parent or coach views progress summaries if the app later exposes that role.
- Learner searches for a topic and jumps directly into a targeted lesson.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Learning entry point | None | Personalized, empty | Cold start |
| Catalog | Course browsing | Subject filter | Populated, empty | No course |
| Course Detail | Unit and lesson map | Course id | Expanded, collapsed | Sparse course |
| Lesson | Video or reading lesson | Playback, scroll | Playing, paused | Missing media |
| Practice | Exercise flow | Answers, hints | Active, complete | Wrong answer loop |
| Mastery | Skill progress map | None | Updated, stale | Unstarted skill |
| Bookmarks | Saved lessons | Add/remove | Populated, empty | Duplicate save |
| Profile | Learner progress | Avatar, goals | Active, hidden | Shared device |
| Settings | Notifications and sync | Preferences | Editable | Reauth required |

## Functional Requirements
- Support course browse, topic search, and lesson entry from multiple paths.
- Support video, reading, and practice modules.
- Track mastery at the skill and course level.
- Support hints, retries, explanations, and progress summaries.
- Support bookmarks and recently viewed items.
- Support basic offline caching for lesson metadata and downloaded media if enabled later.
- Provide role-aware progress views for learner and guardian modes if needed.
- Keep progress updates monotonic and recoverable.

## Data Model
- `User`: profile, role, locale, sync prefs.
- `Course`: subject, unit list, prerequisites.
- `Lesson`: type, title, media ref, exercise refs.
- `Exercise`: prompt, answer key, hint, mastery weight.
- `MasteryNode`: skill id, progress, threshold, last practiced.
- `Bookmark`: lesson id, saved at, note.
- `ProgressRecord`: lesson id, completion state, score, timestamp.

## API/Backend Contracts
- `GET /catalog`, `GET /courses/{id}`, `GET /lessons/{id}`.
- `POST /lessons/{id}/start`, `POST /lessons/{id}/submit`, `POST /lessons/{id}/complete`.
- `GET /mastery`, `GET /bookmarks`, `POST /bookmarks`.
- `GET /progress`, `POST /progress/sync`, `GET /search?q=`.
- Lesson content should support versioning and incremental download.

## Realtime/Push/Offline
- Push reminders for practice streaks and scheduled lessons.
- Cache course structures, lesson metadata, and recent progress offline.
- Queue exercise submissions and sync when connectivity resumes.

## Permissions/Privacy/Safety
- Request notifications only for user-approved reminders.
- Keep learner progress private by default.
- Add child-safe controls if guardian features are included later.

## Analytics Events
- `course_opened`, `lesson_started`, `lesson_completed`, `practice_submitted`
- `bookmark_added`, `mastery_viewed`, `search_performed`, `progress_synced`

## Monetization
- Keep the core learning path free.
- If a paid tier is added later, make it about support, downloads, or extra practice only.

## Acceptance Tests
- Learner can browse a course, start a lesson, and complete practice.
- Learner can bookmark a lesson and reopen it later.
- Mastery progress updates after successful practice.
- Search returns the expected course or lesson.
- Offline cached lesson metadata still opens correctly.

## Implementation Notes
- Separate mastery scoring from UI so it can be tested independently.
- Store progress deltas rather than full snapshots when possible.
- Make lesson content modular so reading and video paths can share exercises.
