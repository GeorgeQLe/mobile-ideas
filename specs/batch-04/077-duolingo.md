# Duolingo-Style Clone Spec

## Legal Scope
- Build a gamified language learning app with original branding, art, and copy.
- Do not copy Duolingo marks, course content, character art, or proprietary lesson algorithms.
- Use original lesson content or licensed language packs only.
- Treat streaks, hearts, leagues, and premium as product mechanics, not brand copy.

## Product Goal
- Help users build daily learning habits through short lessons, streaks, and clear progress.
- Make the next lesson obvious and rewarding without hiding the curriculum structure.

## Research Verification Checklist
- Verify onboarding, language selection, placement test, and lesson launch flow.
- Verify hearts, streak, XP, leagues, daily quests, and reward screens.
- Verify lesson feedback, mistakes review, and subscription prompts.
- Verify notification timing and offline behavior from public observation.

## Core User Journeys
- New user selects a course, takes a placement test, and starts the first lesson.
- Returning user opens the app, sees the next lesson, and continues a streak.
- User completes practice, loses or regains hearts, and reviews mistakes.
- User checks weekly progress, league position, and daily quests.
- User subscribes, switches a premium feature on, and continues learning.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Welcome | Course selection | Language choice | New, returning | Unsupported locale |
| Placement | Level calibration | Answers | In progress, done | Skip path |
| Lesson | Exercise flow | Tap, type, speak | Active, finished | Mistake loop |
| Review | Mistakes recap | Drill selection | Ready, queued | No misses |
| Home | Next lesson and streak | None | Warm, cold start | Streak freeze |
| Hearts | Lives and recovery | Restore action | Full, empty | Paywall |
| Leagues | Leaderboard | None | Ranked, hidden | No competition |
| Quests | Daily tasks | None | Active, complete | Reset edge |
| Settings | Language and privacy | Toggles | Editable | Reauth required |

## Functional Requirements
- Support short lessons with immediate feedback and progress advancement.
- Support multiple exercise types: tap, listen, type, and speak placeholder.
- Track streaks, XP, hearts, quests, and leagues.
- Support course units, practice sessions, and review queues.
- Support placement tests and skill-path navigation.
- Provide subscription gating for offline, unlimited hearts, or advanced review if desired later.
- Save progress locally and sync it across devices.
- Offer hints, explanations, and mistake review.

## Data Model
- `User`: profile, course, streak, hearts, XP, subscription.
- `Course`: language pair, unit list, difficulty path.
- `Unit`: lessons, checkpoints, mastery state.
- `Lesson`: exercise list, reward XP, completion state.
- `Exercise`: type, prompt, correct answer, hint.
- `Quest`: objective, progress, reward.
- `LeagueEntry`: user id, rank, XP, week key.

## API/Backend Contracts
- `POST /courses/select`, `POST /placement/start`, `POST /placement/submit`.
- `GET /home`, `GET /courses`, `GET /units/{id}`, `GET /lessons/{id}`.
- `POST /lesson/start`, `POST /lesson/answer`, `POST /lesson/complete`.
- `GET /quests`, `GET /leagues`, `GET /streak`, `POST /streak/recover`.
- `POST /progress/sync`, `GET /mistakes`.
- Lesson content should be versioned and deliverable offline.

## Realtime/Push/Offline
- Push streak reminders, quest completions, and league rank changes.
- Cache lessons, review queues, and course progress offline.
- Queue answer submissions if connectivity drops mid-lesson.

## Permissions/Privacy/Safety
- Request microphone only for speaking exercises.
- Keep learning history and proficiency data private by default.
- Offer child-safe and account-sharing controls if the app later supports them.

## Analytics Events
- `course_selected`, `placement_completed`, `lesson_started`, `lesson_completed`
- `streak_updated`, `heart_lost`, `quest_completed`, `league_viewed`

## Monetization
- Use premium gating for unlimited hearts, offline mode, and advanced review.
- Keep subscription prompts tied to a value moment, not every mistake.

## Acceptance Tests
- User can complete placement and start a lesson immediately.
- User can finish a lesson and see XP, streak, and quest progress update.
- User can lose a heart, retry, and continue with feedback.
- User can open league standings and see current rank.
- Offline lesson answers queue and sync without losing completion state.

## Implementation Notes
- Keep exercise grading deterministic and testable.
- Store lesson content as versioned content graphs so curricula can evolve.
- Separate motivational state from learning state to reduce brittle coupling.
