# 085 Nike Run Club Clone Spec

## Legal Scope
- Clone guided run experiences, plans, audio coaching, achievements, and run history.
- Use original branding placeholders and bespoke coaching audio.
- Do not copy trademarks, voices, or branded training plans.

## Product Goal
- Make running approachable with guided sessions, easy start, and consistent training support.

## Research Verification Checklist
- Public app listing, plan structure, and coach content placement: verify.
- Run start flow, audio cues, and achievement rules: verify.
- Offline playback and training plan reminders: verify.

## Core User Journeys
- User starts an instant run from the home screen.
- User follows a guided coach session with audio prompts.
- User picks a plan and tracks progression across weeks.
- User reviews pace, splits, and achievements after a run.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Fast start | Run now, plans | Ready, training | No GPS |
| Guided Run | Audio coaching | Pace, milestones | Active, paused | Interruptions |
| Plan Detail | Training plan | Level, goal | Locked, enrolled | Missed week |
| Run Summary | Review metrics | Splits, map | Uploaded, local | Partial GPS |
| Achievements | Motivation | Badges, streaks | Earned, locked | Sync delay |

## Functional Requirements
- Support free run, guided run, interval, and training plan sessions.
- Provide audio cues for pace, distance, and milestones.
- Store run metrics, splits, and route map.
- Allow music or podcast handoff only if the OS permits.
- Track achievements, streaks, and plan progress.

## Data Model
- `User`, `Run`, `Split`, `Plan`, `PlanWeek`, `GuidedSession`, `Achievement`, `CoachAudio`.
- Persist device timezone and route metadata for summary rendering.

## API/Backend Contracts
- `POST /runs`, `POST /runs/{id}/points`, `GET /runs/{id}`.
- `GET /plans`, `POST /plans/{id}/enroll`, `POST /plans/{id}/progress`.
- `GET /achievements`.

## Realtime/Push/Offline
- Offline recording with delayed upload.
- Push for plan reminders, streak encouragement, and achievement unlocks.

## Permissions/Privacy/Safety
- Location and motion permissions required for live tracking.
- Offer privacy controls for route visibility.
- Use non-clinical fitness language.

## Analytics Events
- `run_started`, `guided_prompt_played`, `run_paused`, `run_completed`, `plan_enrolled`, `achievement_unlocked`, `summary_viewed`, `reminder_set`.

## Monetization
- Free core run tracking with premium plan library and advanced insights as optional upsell.

## Acceptance Tests
- Start a run from home in one tap.
- Complete a guided run and see coaching milestones.
- Resume a training plan after skipping a week.
- Upload a run from offline mode without losing splits.

## Implementation Notes
- Keep audio prompts synchronized with elapsed distance, not wall-clock alone.
- Use local event buffering for uninterrupted recording.
- Make achievement calculations idempotent to avoid double awards.

