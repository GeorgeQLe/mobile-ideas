# 082 Headspace Clone Spec

## Legal Scope
- Clone the meditation and habit loop only: sessions, programs, reminders, streaks, and progress.
- Use original artwork, names, and sound assets.
- Do not copy proprietary narration, music, or branded curricula.

## Product Goal
- Help users start a meditation session in under one tap and keep a consistent practice.
- Include sleep, focus, and anxiety-reduction flows at a high level.

## Research Verification Checklist
- App Store screenshots, onboarding, and subscription tiers: verify.
- Public help pages for downloads, downloads limits, and offline playback: verify.
- Session completion rules, streak logic, and reminder timing: verify.

## Core User Journeys
- New user selects a goal and starts a short introductory session.
- Returning user resumes a program, tracks streaks, and schedules reminders.
- User searches for a session by mood, duration, or theme.
- User downloads content for offline listening.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Personalized entry | Goal, streak, continue | New, returning | No recommendations |
| Session Player | Play audio | Play/pause, scrub | Locked, downloaded | Audio interruption |
| Library | Browse content | Search, filters | Empty, loaded | Region unavailable |
| Progress | Show habits | Date, streak, minutes | Weekly, monthly | Timezone shift |
| Paywall | Convert free user | Plan, trial, restore | Trial, error | Cancelled state |

## Functional Requirements
- Support short meditations, multi-day programs, and sleep tracks.
- Track completion, streaks, and minutes meditated.
- Allow reminders by time of day and days of week.
- Download selected audio for offline use.
- Keep onboarding lightweight with a goal picker.

## Data Model
- `User`, `Goal`, `Program`, `Session`, `AudioAsset`, `Download`, `Streak`, `Reminder`, `Subscription`.
- Store progress per session and aggregate weekly streak summaries.

## API/Backend Contracts
- `GET /home`: personalized feed.
- `GET /library`: browsable sessions and programs.
- `POST /sessions/{id}/complete`: log completion.
- `POST /reminders`: create or update reminder.
- `POST /downloads`: request asset download.

## Realtime/Push/Offline
- Push for reminder nudges and streak recovery prompts.
- Offline playback after asset download.
- No realtime multiplayer or collaboration.

## Permissions/Privacy/Safety
- Notification permission requested after goal selection.
- Do not present the product as treatment or diagnosis.
- Support data export and account deletion.
- Keep sleep and mood data access scoped and transparent.

## Analytics Events
- `goal_selected`, `session_started`, `session_completed`, `download_started`, `download_completed`, `reminder_set`, `streak_updated`, `paywall_viewed`.

## Monetization
- Free starter content with subscription for full library, downloads, and advanced programs.

## Acceptance Tests
- Start a session from home in one tap.
- Complete a downloaded session offline and sync later.
- Create a reminder and receive a test notification.
- Restore purchase and unlock premium content.

## Implementation Notes
- Keep audio playback resilient to background interruptions.
- Cache last-played position for resume.
- Use deterministic streak calculations based on local date and user timezone.

