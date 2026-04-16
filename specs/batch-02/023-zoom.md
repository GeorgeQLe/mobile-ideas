# Zoom-Style Clone Spec

## Legal Scope
- Clone objective: meeting scheduling, join flow, host controls, chat, screen share, and attendance records.
- Must not copy: Zoom branding, meeting IDs, UI chrome, or proprietary meeting transport behavior.
- Original replacement brand: new meeting app identity with neutral copy and visuals.

## Product Goal
- Support scheduled and ad hoc meetings for small teams and external guests.
- Keep the host workflow explicit: create, invite, admit, present, manage, and end.
- Provide enough controls for real meeting operations without copying exact visuals.

## Research Verification Checklist
- Verify join-before-host behavior, waiting room flow, and participant list ordering.
- Verify screen share, chat, recording indicator, and breakout-room scope.
- Verify whether webinar-style modes or whiteboard features are required.
- Verification status: pending lawful research.

## Core User Journeys
- Schedule a meeting, invite participants, and review it in the calendar.
- Join with meeting code, enter waiting room, and get admitted by host.
- Present screen, chat with attendees, mute participants, and end the meeting.
- Review past meetings, attendance, and recordings if enabled.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Entry and quick actions | schedule, join, settings | signed in, guest | token expired |
| Schedule | Create meeting | title, time, invitees | draft, saved | timezone mismatch |
| Join | Enter meeting | code, name | waiting, joining | invalid code |
| Meeting | Live session | mute, video, share, chat | live, degraded | host lost, network drop |
| Waiting Room | Admission queue | admit, deny | pending, admitted | full room |
| Participants | Manage attendees | pin, mute, remove | live, hidden | permission denied |
| Recording | Recording state | start/stop | active, unavailable | policy restricted |

## Functional Requirements
- Create personal and scheduled meetings with unique codes and calendar integration hooks.
- Offer host controls: admit, mute all, lock meeting, remove participant, and manage chat.
- Screen share, content view, and in-meeting text chat.
- Persist meeting history with attendance and any recording metadata.

## Data Model
- User, Meeting, MeetingInvite, Participant, ChatMessage, Recording, AttendanceRecord, DeviceCapability.
- Meeting stores schedule, recurrence, host, lobby policy, and lock state.
- AttendanceRecord stores join/leave timestamps and join source.

## API/Backend Contracts
- Auth: account session and guest token join flow.
- Reads: `/meetings`, `/meetings/{id}`, `/participants`, `/recordings`, `/attendance`.
- Writes: create/update/cancel meeting, join/leave, admit/deny, mute, chat send, start/stop recording.
- Realtime: signaling for participant state, chat, hand-raise-like reactions, and share status.

## Realtime/Push/Offline
- Push meeting reminders, invites, and host admission alerts.
- If offline, allow calendar browsing but block join until connectivity returns.
- Cache recent meetings and scheduled items locally.

## Permissions/Privacy/Safety
- Request camera, mic, screen-capture, calendar, and notifications at the point of use.
- Add meeting lock, waiting room, participant removal, and report abuse controls.
- Expose clear recording consent and visible recording state.

## Analytics Events
- `meeting_created`, `meeting_joined`, `waiting_room_entered`, `participant_admitted`, `screen_share_started`, `chat_sent`, `recording_started`, `meeting_ended`.

## Monetization
- Freemium with limits on meeting duration, participant count, or cloud recording.
- Enterprise tier can add admin policy, branding, and retention controls.

## Acceptance Tests
- Schedule a meeting, join from two devices, and verify host controls work.
- Enter waiting room, admit participant, and observe state transition.
- Share screen, send chat, and then end the meeting gracefully.
- Test invalid code, no-permission camera flow, and poor-network reconnection.

## Implementation Notes
- Separate meeting orchestration from media transport so host controls remain responsive.
- Use deterministic code generation for invites and guest joins.
- Keep guest join friction low, but do not skip consent prompts.

