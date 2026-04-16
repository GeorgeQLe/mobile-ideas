# Outlook-Style Clone Spec

## Legal Scope
- Clone objective: integrated email and calendar client with focused inbox, agenda, meeting RSVP, and contacts.
- Must not copy: Outlook branding, Microsoft account UI, proprietary mail sync internals, or Office service integrations.
- Original replacement brand: independent visual identity and neutral enterprise-friendly copy.

## Product Goal
- Help users triage mail, manage calendar time, and respond to meetings in one app.
- Support personal and business accounts with account policies and calendar sharing.
- Provide a clear split between inbox, calendar, and people without copying exact UI chrome.

## Research Verification Checklist
- Verify focused inbox rules, calendar navigation, RSVP flows, and contact surfaces.
- Verify attachment handling, account policies, and any mail snooze/archive patterns.
- Verify whether task integration or shared calendars are in scope.
- Verification status: pending research.

## Core User Journeys
- Add an account, land in focused inbox, and reply to a message.
- Open calendar agenda, accept or decline a meeting, and join when time arrives.
- Search mail and calendar together for a person or topic.
- Review contacts, signatures, out-of-office settings, and notification preferences.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Account Setup | Connect mail/calendar | account, token | connected, failed | policy blocked |
| Focused Inbox | Prioritized mail | swipe, search | populated, empty | filter misclassify |
| Calendar Agenda | Time-based view | create, RSVP | today, upcoming | timezone drift |
| Event Detail | Manage meeting | accept, decline, edit | saved | invite revoked |
| Compose | Write mail | recipients, attachments | draft, sending | large file |
| People | Contacts directory | search, add | synced | duplicate contacts |
| Settings | Account policies | signature, notifications | saved | admin locked |

## Functional Requirements
- Unified search across mail, people, and calendar items.
- Focused inbox and other folder views with snooze, archive, flag, and move actions.
- Event creation, RSVP, attendee visibility, and join-link display.
- Shared calendar support and read-only policy enforcement where needed.

## Data Model
- Account, MailThread, Message, CalendarEvent, Attendee, Contact, Signature, Policy, Attachment.
- Event stores recurrence, reminders, location, conferencing link, and attendee response.
- Thread and event indexes should share the same search pipeline.

## API/Backend Contracts
- Auth: account token, refresh, revoke, device registration.
- Reads: `/mail/threads`, `/calendar/events`, `/contacts`, `/search`, `/policies`.
- Writes: send mail, archive, flag, snooze, create/edit/delete event, RSVP, update signature.
- Realtime: push for mail, reminders, meeting changes, and shared calendar updates.

## Realtime/Push/Offline
- Local cache for inbox, agenda, and drafts.
- Offline event creation should queue and reconcile when connectivity returns.
- Push reminder notifications for upcoming meetings and high-priority mail.

## Permissions/Privacy/Safety
- Request calendar, contacts, mic, and notifications only when a feature needs them.
- Support admin policy banners, restricted actions, and data-loss prevention messaging.
- Include phishing and meeting-invite safety warnings.

## Analytics Events
- `account_added`, `mail_opened`, `mail_replied`, `event_created`, `event_rsvp_changed`, `calendar_viewed`, `search_run`, `policy_banner_shown`, `attachment_opened`.

## Monetization
- Subscription tier for advanced account features, retention, or admin controls.
- Enterprise licensing can unlock policy, compliance, and shared mailbox features.

## Acceptance Tests
- Add an account, mark mail focused, and search across mail and calendar.
- Create an event, invite attendees, RSVP on another device, and confirm sync.
- Open an attachment and confirm offline read cache works.
- Deny contacts permission and verify the app still functions for core mail.

## Implementation Notes
- Keep mail and calendar synchronized through a shared account and sync layer.
- Treat policy enforcement as server-driven so enterprise restrictions are consistent.
- Use deterministic reminders so calendar alerts are testable.

