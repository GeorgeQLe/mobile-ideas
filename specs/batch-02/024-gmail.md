# Gmail-Style Clone Spec

## Legal Scope
- Clone objective: a multi-account email client with inbox categories, thread view, search, labels, drafts, and attachments.
- Must not copy: Gmail branding, exact inbox styling, proprietary spam scoring, or Google account services.
- Original replacement brand: neutral email product name, color system, and copy.

## Product Goal
- Provide a high-performance email experience for personal and professional accounts.
- Make inbox triage fast with search, archive, labels, swipe actions, and multi-account switching.
- Keep the backend owned and lawful: message storage and sync only.

## Research Verification Checklist
- Verify category tabs, compose behavior, archive/delete gestures, and undo timing.
- Verify thread expansion, attachment preview, search operators, and offline drafting behavior.
- Verify account switching and any alias/signature support.
- Verification status: not yet confirmed from local backlog alone.

## Core User Journeys
- Add an account, sync mail, and land in the inbox.
- Search threads, open a conversation, archive or label messages, and reply.
- Compose a new email with attachments and save as draft if interrupted.
- Switch between accounts and review sent, starred, and trash views.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Account Setup | Add mailbox | email, password, token | connecting, connected | auth failure |
| Inbox | Primary triage | swipe, search, tabs | empty, populated | sync lag |
| Thread | Read conversation | reply, archive, label | read, unread | mixed recipients |
| Compose | Draft email | recipients, subject, body | draft, sending | attachment too large |
| Search | Query messages | keywords, filters | results, none | index stale |
| Labels | Organize mail | label create/edit | saved, error | conflicts |
| Settings | App and account prefs | signature, notifications | saved | revoked access |

## Functional Requirements
- Support threaded conversations, read/unread state, starred messages, labels, archive, trash, spam, and drafts.
- Search by sender, recipient, subject, body, label, and attachment presence.
- Attach files and inline images; allow later edit or resend from draft.
- Multi-account inbox switching without losing local search state.

## Data Model
- MailAccount, MailboxFolder, Thread, Message, Draft, Label, Attachment, Signature, DeviceToken.
- Thread stores participant summary, last activity, unread count, and folder membership.
- Message stores RFC-like headers plus local flags such as starred and archived.

## API/Backend Contracts
- Auth: account credential, OAuth-like token, refresh, revoke.
- Reads: `/accounts`, `/threads`, `/messages`, `/labels`, `/search`, `/drafts`.
- Writes: send mail, save draft, archive, star, label, delete, restore, mark read/unread.
- Realtime: inbox sync events, push for new mail, and optional server-side search index updates.

## Realtime/Push/Offline
- Cache recent mail, drafts, and search results for offline reading.
- Queue outbound sends and retry safely with idempotency keys.
- Push on new mail and high-priority thread updates; suppress noisy duplicates.

## Permissions/Privacy/Safety
- Request notifications only after account setup.
- Protect attachments, respect per-account privacy settings, and support app lock if required.
- Include phishing, suspicious attachment, and sender-blocking UX.

## Analytics Events
- `account_added`, `inbox_opened`, `thread_opened`, `message_sent`, `draft_saved`, `search_run`, `label_applied`, `mail_archived`, `attachment_added`.

## Monetization
- Freemium storage and advanced search tier.
- Business tier can add custom domains, shared inboxes, and retention policies.

## Acceptance Tests
- Add two accounts, switch between them, and verify inbox isolation.
- Compose offline, reconnect, and confirm the message sends once.
- Search by subject and attachment and open the result thread.
- Archive, label, and undo an action from the inbox.

## Implementation Notes
- Normalize message/thread state in a local cache to keep search fast.
- Treat draft autosave as mandatory because compose interruption is common.
- Keep swipe actions configurable so future account policies can change behavior.

