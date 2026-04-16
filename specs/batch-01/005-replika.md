# Replika-Style Companion Clone Spec

## Legal Scope
- Clone objective: build a relationship-oriented AI companion with avatar personalization, mood tracking, diary entries, and premium coaching flows.
- Must not copy: Replika branding, avatar assets, proprietary relationship scripting, or subscription copy.
- Replacement brand/assets: use original companion name, avatar style, and emotional UI copy.

## Product Goal
- Help a user maintain an ongoing personal companion chat that can track mood, milestones, and self-reflection over time.
- Support a gentle, private, app-first companion experience with clear safety boundaries.

## Research Verification Checklist
- [ ] Avatar onboarding, naming, and personality setup
- [ ] Relationship state progression and unlocks
- [ ] Diary, mood tracking, and prompts
- [ ] Premium gates for voice, roleplay, or advanced coaching
- [ ] Privacy center, deletion, and export flows
- [ ] Notification cadence and reminder controls
- [ ] Crisis handling and support resources
- [ ] Offline history and sync behavior

## Core User Journeys
- User sets up a companion avatar, picks a tone, and begins chatting.
- User logs mood or diary content and receives a reflective response.
- User returns to the companion after several days and sees continuity.
- User changes relationship settings or privacy controls.
- User upgrades to unlock additional interactions or styling.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Onboarding | Create companion profile | first run, resume |
| Companion Chat | Ongoing conversation | streaming, quiet mode |
| Avatar Studio | Customize companion look | draft, saved, locked |
| Mood Check-in | Record state and prompt | skipped, completed |
| Diary | Review private entries | empty, list, tagged |
| Relationship | View progress and settings | locked, active, reset |
| Privacy Center | Data controls and exports | default, deletion pending |
| Subscription | Manage premium | free, trial, paid |

## Functional Requirements
- Persist companion profile, avatar configuration, and relationship state.
- Support mood logs, diary entries, and prompt-based reflections.
- Keep long-running memory notes separate from the raw message transcript.
- Provide gentle reminders, streaks, and milestone summaries.
- Allow content export and full account deletion from settings.
- Display premium unlocks without breaking the core free chat flow.

## Data Model
- User: id, plan, locale, privacy_settings, age_gate_status.
- CompanionProfile: id, user_id, name, tone, avatar_id, relationship_level.
- ChatThread: id, user_id, companion_id, title, last_active_at.
- Message: id, thread_id, role, content, sentiment_label.
- MoodEntry: id, user_id, mood_score, note, logged_at.
- DiaryEntry: id, user_id, title, body, visibility, created_at.
- MemoryNote: id, companion_id, fact, source_type, enabled.

## API/Backend Contracts
- `POST /onboarding/companion`, `PATCH /companions/:id`.
- `GET /threads/:id/messages`, `POST /threads/:id/messages`.
- `POST /mood`, `POST /diary`, `GET /diary`.
- `GET /relationship`, `PATCH /relationship`.
- Stream assistant replies and save memory notes through a guarded backend service.

## Realtime/Push/Offline
- Stream chat responses and mood reflection suggestions.
- Push gentle reminders, milestone updates, and billing notices.
- Cache the last active thread and diary drafts offline.
- Queue message sends and sync on reconnect.

## Permissions/Privacy/Safety
- Keep companion content private by default and minimize third-party analytics exposure.
- Make export and deletion easy to find and complete.
- Add crisis escalation copy and support links for self-harm or abuse signals.
- Avoid implying medical diagnosis or therapy; position as wellness support only.

## Analytics Events
- `companion_created`, `chat_started`, `message_sent`, `mood_logged`
- `diary_entry_saved`, `relationship_level_changed`, `premium_prompt_viewed`
- `subscription_started`, `subscription_canceled`, `data_exported`

## Monetization
- Free tier with core chat, limited memory depth, and basic avatar customization.
- Paid tier with voice, advanced companion behaviors, and richer personalization.

## Acceptance Tests
- User can create a companion and continue the same thread after app restart.
- User can log a mood entry and see it reflected in the companion flow.
- User can edit privacy controls and delete account data.
- Premium gate appears for locked features without blocking base chat.
- Offline draft syncs when connectivity returns.

## Implementation Notes
- Separate emotional memory from chat transcript to keep recovery and deletion reliable.
- Treat avatar and relationship unlocks as state machines, not ad hoc flags.
- Keep support and safety copy visible from chat settings.
- Verify exact onboarding steps and premium feature gates against live product behavior.

