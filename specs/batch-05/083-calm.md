# 083 Calm Clone Spec

## Legal Scope
- Clone meditation, sleep, breathing, and focus flows only.
- Use original branding, session names, visuals, and voice assets.
- Do not copy copyrighted stories, music, or branded collaborations.

## Product Goal
- Provide a low-friction relaxation app with quick access to breathing, sleep, and focus content.

## Research Verification Checklist
- Public listings, session categories, and subscription gating: verify.
- Onboarding, home layout, and reminder flows: verify.
- Offline playback and download limits: verify.

## Core User Journeys
- User opens app and starts a breathing exercise immediately.
- User browses sleep stories and downloads one for later.
- User sets a nightly reminder and checks streak progress.
- User upgrades for the full catalog.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Fast entry point | Quick actions, continue | Personalized, empty | No history |
| Breathing | Guided timer | Pattern, duration | Running, paused | Audio focus loss |
| Sleep Player | Long-form audio | Play, skip, download | Locked, offline | Background pause |
| Library | Browse content | Search, tags | Loaded, filtered | Region rules |
| Progress | Habits and usage | Date range | Weekly, monthly | Clock changes |

## Functional Requirements
- Support timed breathing patterns with visual and audio cues.
- Support sleep stories, soundscapes, focus music, and masterclasses.
- Track session completion and daily streaks.
- Persist downloads and playback position.
- Let the user save favorites and repeat recent sessions.

## Data Model
- `User`, `Session`, `Collection`, `Download`, `Favorite`, `Reminder`, `Streak`, `Subscription`.
- Session metadata includes duration, theme, narrator, and offline eligibility.

## API/Backend Contracts
- `GET /home`, `GET /collections`, `GET /sessions/{id}`.
- `POST /sessions/{id}/complete`.
- `POST /favorites/{id}` toggle.
- `POST /downloads/{id}` create download job.

## Realtime/Push/Offline
- Push for reminder and streak notifications.
- Offline playback for downloaded assets only.
- No realtime social features.

## Permissions/Privacy/Safety
- Notification permission requested after first meaningful action.
- Treat sleep and mental-health adjacent content carefully with non-clinical language.
- Provide delete-account and data-export controls.

## Analytics Events
- `breathing_started`, `breathing_completed`, `sleep_story_started`, `download_completed`, `favorite_added`, `reminder_set`, `subscription_started`, `session_resumed`.

## Monetization
- Freemium with locked premium sessions and annual subscription emphasis.

## Acceptance Tests
- Start breathing without creating an account.
- Download a sleep story and play it offline.
- Set a nightly reminder and confirm notification scheduling.
- Upgrade and unlock all locked sessions.

## Implementation Notes
- Keep timer state machine local and resilient to backgrounding.
- Use a shared audio player service across breathing and sleep content.
- Store minimal personal data to reduce privacy risk.

