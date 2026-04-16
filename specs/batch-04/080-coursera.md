# Coursera-Style Clone Spec

## Legal Scope
- Build a course marketplace and learner app with original branding, copy, and artwork.
- Do not copy Coursera marks, partner catalog data, or proprietary certificates.
- Use licensed or synthetic course media for development.
- Keep certificates and payments as distinct modules that can be swapped later.

## Product Goal
- Let a learner browse courses, enroll, watch lessons, complete quizzes, and earn progress.
- Make deadlines, certificates, and offline learning visible from the course flow.

## Research Verification Checklist
- Verify marketplace browsing, course detail pages, and enrollment flow from public observation.
- Verify video lessons, quizzes, assignments, and progress tracking.
- Verify certificate surfaces, deadlines, and offline learning states if present.
- Verify subscription or purchase prompts and learner dashboard layout.

## Core User Journeys
- Learner browses a course, reads details, and enrolls.
- Learner watches a module lesson and completes a quiz.
- Learner downloads content for offline study and resumes later.
- Learner checks deadlines, progress, and certificate eligibility.
- Learner revisits a completed course and reviews materials.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Marketplace | Course browse | Search, category | Populated, empty | No results |
| Course Detail | Syllabus and enrollment | Course id | Open, locked | Capacity limit |
| Module | Lesson grouping | Module select | Expanded, collapsed | Missing lesson |
| Lesson Player | Video or reading | Play, pause | Active, paused | Offline media |
| Quiz | Assessment flow | Answers | Running, scored | Retry limit |
| Deadlines | Due date view | Calendar filter | Active, overdue | Timezone shift |
| Certificate | Completion proof | None | Eligible, earned | Incomplete course |
| Downloads | Offline content | Select item | Downloading, done | Storage full |
| Profile | Progress dashboard | None | Synced, stale | Shared device |

## Functional Requirements
- Support marketplace search, filtering, course detail, and enrollment.
- Support module and lesson navigation with progress tracking.
- Support quizzes, due dates, and deadlines with reminders.
- Support offline downloads for selected lessons and assets.
- Support certificates or completion badges when eligibility criteria are met.
- Support course reviews, bookmarks, and saved items if the later scope needs them.
- Track completion percentage at lesson, module, and course level.
- Keep the learner dashboard in sync with active enrollments.

## Data Model
- `User`: profile, enrollments, plan tier, notification prefs.
- `Course`: title, provider, duration, modules, price, certificate rules.
- `Module`: title, lesson ids, order, completion state.
- `Lesson`: type, media refs, transcript ref, quiz refs.
- `Quiz`: question list, scoring rule, retry policy.
- `Enrollment`: course id, status, progress, deadline state.
- `Certificate`: learner id, course id, issued at, verification id.

## API/Backend Contracts
- `GET /marketplace`, `GET /courses/{id}`, `POST /enrollments`.
- `GET /modules/{id}`, `GET /lessons/{id}`, `POST /lessons/{id}/progress`.
- `POST /quizzes/{id}/submit`, `GET /deadlines`, `PATCH /deadlines/{id}`.
- `GET /downloads`, `POST /downloads`, `GET /certificates`.
- Use progress sync events that can survive offline first usage.

## Realtime/Push/Offline
- Push deadline reminders, quiz due notices, and enrollment updates.
- Cache syllabus, downloaded lessons, and progress offline.
- Queue quiz submissions and lesson progress updates until reconnect.

## Permissions/Privacy/Safety
- Request notifications only for learner-approved reminders.
- Keep coursework progress private by default.
- Protect certificates from casual tampering with server verification ids.

## Analytics Events
- `course_viewed`, `enrolled`, `lesson_started`, `lesson_completed`
- `quiz_submitted`, `deadline_viewed`, `certificate_viewed`, `download_started`

## Monetization
- Use course purchase, subscription, or certificate fees as later placeholders.
- Keep the free browse path useful enough to support discovery.

## Acceptance Tests
- Learner can browse a course and enroll successfully.
- Learner can watch a lesson, submit a quiz, and see progress update.
- Learner can download a lesson and continue offline.
- Learner can view deadlines and receive reminders.
- Learner can earn a certificate when completion criteria are met.

## Implementation Notes
- Keep enrollment and progress as separate concepts to avoid brittle state coupling.
- Use course versioning so syllabus updates do not corrupt past progress.
- Make offline lesson caching granular by module or lesson.
