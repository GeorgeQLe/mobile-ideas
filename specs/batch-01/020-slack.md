# Slack-Style Clone Spec

> Metadata
> - Inspiration app: Slack
> - Category: Workplace chat, channels, huddles, files, docs, workflows, integrations, enterprise administration, AI-assisted collaboration
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Slack Help Center, Slack feature/help pages, Slack privacy/legal pages, and current public listing notes.
> - Manual verification blockers: native iOS/Android screen capture, workspace creation/join, email/SSO login, enterprise/admin behavior, Slack Connect-style external channels, channel permissions, huddles, clips, canvases, lists, workflow builder, app integrations, Slack AI, search, notification payloads, export/deletion, retention, paid plan purchase/restore, and device/region-specific behavior still require lawful test workspaces/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample workspace data, messages, files, canvases, templates, app-directory data, workflow recipes, AI behavior, admin policy, payment integrations, and enterprise connectors.

## Overview

Build an original workplace collaboration app inspired by Slack's public workflow: workspace identity, channels, direct messages, threads, mentions, files, search, status, notifications, huddles, clips, canvases, lists, workflows, apps/integrations, external collaboration, enterprise administration, retention/export controls, AI-assisted search/summarization, paid plans, and account lifecycle controls.

The clone must not copy Slack branding, screenshots, marketing copy, protected UI artwork, private APIs, Slack App Directory data, Salesforce integrations, paid-plan names, templates, workflow recipes, AI output style, enterprise policies, or customer data. Functional parity should be expressed through original product language, synthetic workspace data, licensed providers, independently designed admin controls, and auditable privacy/security tooling.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior.

## Goals

- Provide a mobile-first workplace collaboration product with workspace onboarding, channels, DMs, threads, mentions, files, search, notifications, settings, support, and account controls.
- Preserve enterprise expectations around workspace ownership, roles, guests, external collaboration, app approvals, data retention, export/deletion, legal holds, SSO/SCIM, audit logs, privacy, and security.
- Use original collaboration documents, workflow templates, integrations, search/ranking, AI, notification, and entitlement systems with licensed or first-party sample content.
- Keep Slack Connect-style cross-organization channels, huddles, clips, canvases, lists, workflow builder, enterprise search, AI notes/summaries, app marketplace, and paid plans explicitly gated until product, legal, security, privacy, provider, and platform reviews clear them.
- Produce concrete screens, entities, API contracts, offline behavior, analytics, safety controls, edge cases, acceptance criteria, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Slack-branded app or imply affiliation with Slack, Salesforce, workspace customers, app developers, or enterprise partners.
- Do not scrape production services, use private APIs, replay mobile network traffic, copy proprietary datasets, clone exact admin policies, or bypass workspace access controls.
- Do not copy plan names, prices, promotional copy, templates, workflow recipes, App Directory entries, AI responses, customer examples, trust labels, or enterprise support processes.
- Do not treat public marketplace/help pages as proof of exact native state machines; signed-in, paid, enterprise, regional, notification, AI, and device-specific behavior remains blocked until verified.
- Do not build runtime application code in this repository; this repo remains the planning and specification source of truth.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/slack/id618783545 | Official iOS listing, category, age rating, supported devices, privacy labels, workspace collaboration, channels, huddles/video, files/docs, search, AI, integrations, and support/privacy links | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.Slack | Official Android listing, package id, rating/download scale, content rating, data safety, workspace collaboration, huddles, docs, tasks, apps, AI add-on, and support contact | Verified 2026-04-17 |
| Slack Help Center | https://slack.com/help | Official support entry point for getting started, channels, search, profiles/preferences, apps, workflows, administration, billing, and status | Verified 2026-04-17 |
| What Is A Channel | https://slack.com/help/articles/360017938993-What-is-a-channel | Public/private channel model, general channel constraints, search visibility, and channel best practices | Verified 2026-04-17 |
| Slack Huddles Help | https://slack.com/help/articles/4402059015315-Use-huddles-in-Slack | Huddle join/start flow, mobile support, participant limits by plan, screen sharing, reactions, captions, notes/canvas behavior, and leaving | Verified 2026-04-17 |
| Slack Canvas Help | https://slack.com/help/articles/203950418-Use-a-canvas-in-Slack | Canvas creation, sharing, tabs, mobile access, permissions, and collaboration behavior | Verified 2026-04-17 |
| Slack Huddles Security | https://slack.com/help/articles/115003560786-Security-for-Slack-huddles | WebRTC/SRTP/TLS orientation, huddle metadata, performance metrics, and IP-sharing caveats | Verified 2026-04-17 |
| Slack Privacy Policy | https://slack.com/trust/privacy/privacy-policy | Customer/workspace data handling, privacy terms, Salesforce relationship, and data processing commitments | Verified 2026-04-17 |
| Slack User Terms of Service | https://slack.com/terms-of-service/user | User obligations, service terms, workspace/customer relationship, paid services, acceptable use, and availability caveats | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings position Slack as a business collaboration app with channels, external partners, huddles/video/screen sharing, audio/video clips, shared docs/canvases, tasks/lists, 2,600+ app integrations, AI-powered search, huddle notes, templates, and paid-plan/add-on gates.
- Onboarding must support creating a workspace, joining by invite/email domain, signing in with email/password/SSO where configured, accepting workspace terms, setting profile/status, and handling deactivated/guest/enterprise-managed states.
- The default signed-in surface must support home/channel list, DMs, activity/mentions, search, compose, files/canvases/lists where enabled, huddles, notifications, profile/status, workspace switcher, settings, and help/legal access.
- Channels must support public/private visibility, general/default-channel constraints, topics/descriptions, members/guests, messages, files, threads, mentions, pins/bookmarks, tabs, canvases, huddles, notifications, search visibility, archive, and permission states.
- DMs and group DMs must support messages, threads, files, huddles, audio/video clips where enabled, reminders, reactions, status/presence, message retention, and block/report/support equivalents for workplace abuse.
- Huddles must support channel/DM start/join/leave, audio/video, screen sharing, reactions/stickers/GIFs where enabled, live captions, huddle threads, notes/canvas linkage, participant limits by plan, and security metadata disclosure.
- Files, canvases, lists, and clips must have explicit ownership, sharing permissions, retention, search indexing, deletion/export, and external-collaboration rules.
- Apps and workflow builder must be treated as third-party or admin-approved integrations with scopes, install targets, event subscriptions, webhooks, approval queues, audit logs, data access, revocation, and marketplace review.
- External collaboration must distinguish internal users, guests, external organization members, shared channels, invites, ownership boundaries, retention/export differences, and admin approvals.
- Slack AI-style summaries, search, huddle notes, agents, and enterprise search are not core V1. They require separate privacy, security, model/provider, retention, admin-control, and customer-data review before launch.
- Paid plans may gate history, huddle limits, canvases/lists/templates, workflows, AI add-ons, app controls, external collaboration, retention/export, SSO/SCIM, and audit logs, but all naming, pricing, offers, and promotional copy must be original.
- Account deletion, profile deactivation, workspace deletion, data export, retention settings, notification preferences, SSO/2FA, app authorization, support, terms, privacy policy, and billing paths must be reachable from appropriate settings/admin surfaces.

### Product Architecture Notes

- Use original navigation labels and component names while preserving the documented workplace jobs.
- Keep workspace-private, channel-public, channel-private, DM, group-DM, external-shared, file, canvas, list, huddle, workflow, app, and support data under distinct visibility and retention rules.
- Keep permission and role evaluation server-side with workspace policy snapshots, audit events, export/retention policy checks, and regression fixtures for channel/app/admin overrides.
- Model every external dependency as an adapter with feature flags, timeout behavior, data residency notes, provider-specific error mapping, and privacy/security review.
- Keep entitlement checks server-authoritative; the client may cache feature summaries but cannot grant paid, admin, external-collaboration, export, retention, AI, or app privileges alone.
- Store only normalized event codes in analytics and operational logs; raw messages, files, huddle content, canvas/list content, search terms, payment details, customer identifiers, and private support content are disallowed by default.
- Provide admin/support tooling with role-based access, redaction, escalation reasons, immutable audit events, legal hold states, and separate handling for workspace-owned versus user-owned data.

## Core User Journeys

- New user installs the app, creates or joins a workspace, verifies email or SSO, sets profile/status, reviews notification education, and lands in the home/channel list.
- Returning user opens the app, scans unread channels/DMs, replies in a thread, mentions a teammate, shares a file, reacts, saves/pins context, and updates status.
- Workspace owner creates channels, configures public/private visibility, invites members/guests, manages default/general-channel rules, and archives stale channels.
- User starts or joins a huddle from a channel/DM, grants microphone/camera permissions, shares screen where enabled, uses captions/reactions, takes notes in a thread/canvas, and leaves cleanly.
- User creates a canvas or list, shares it to a channel, edits collaboratively, sets permissions, searches for it later, and handles access denial.
- Admin approves an app or workflow, reviews scopes and event access, installs it to a workspace/channel, sees audit logs, and revokes it after a policy change.
- External collaboration user joins a shared channel or guest account, sees clear organization boundaries, sends messages/files, and encounters retention/export differences.
- User uses search to find messages, files, people, canvases, or AI-generated answers where enabled, and sees permission-aware results and no-results states.
- Owner upgrades, restores, cancels, expires, or loses paid-plan/add-on access and sees deterministic locked/unlocked states for huddles, history, workflows, AI, retention/export, and admin features.
- User or admin requests data export, account deactivation, workspace deletion, legal hold, or support; the app shows retention consequences and final status.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Workspace creation/join, login, consent | email, SSO, invite link, password | new, returning, invited, managed | invite expired, SSO failed, deactivated |
| Workspace Switcher | Multi-workspace navigation | workspace tap, add, sign out | single, multiple, guest, offline cached | removed workspace, enterprise restriction |
| Home/Channel List | Channels, DMs, unread, activity | search, compose, channel tap, filters | empty, unread, mentions, offline cached | permission denied, archived, stale policy |
| Channel | Workplace conversation | text, media, files, huddle, thread, mention | sending, delivered, threaded, failed | private denied, retention expired, legal hold |
| Thread | Focused replies and huddle notes | reply, mention, file, reaction | active, followed, resolved, muted | parent deleted, access revoked, archived |
| Direct Messages | One-to-one and group DMs | text, file, huddle, profile | active, muted, external, guest | deactivated user, external policy block |
| Compose/Search | Global create and retrieval | query, filters, recipient, attachments | results, no-results, draft, sent | permission redaction, search indexing delay |
| File/Clip Viewer | Uploaded files and recordings | open, share, download, delete | preview, processing, shared, deleted | too large, unsupported type, access revoked |
| Canvas/List | Shared documents and task lists | edit, share, assign, comment | editable, view-only, synced, offline cached | conflict, permission denied, retention lock |
| Huddle | Real-time audio/video/screen share | mic, camera, screen, reactions, captions | connecting, active, muted, notes | permission revoked, participant limit, network drop |
| Apps/Workflow | Integrations and automation | authorize, approve, run, revoke | pending, installed, disabled, failed | scope mismatch, admin denied, webhook timeout |
| External Channel | Cross-organization collaboration | invite, approve, message, file | pending, connected, restricted | org mismatch, export conflict, policy denial |
| Admin Console | Members, roles, retention, apps, audit | role, policy, export, app approval | owner, admin, member, guest | policy conflict, legal hold, audit failure |
| Billing/Entitlements | Paid plans and add-ons | subscribe, restore, cancel, invoice | free, paid, expired, restored | platform mismatch, webhook delay, unpaid invoice |
| Notifications/Preferences | Push, quiet hours, channel prefs | toggles, schedule, keyword | saved, pending, inherited | revoked OS permission, muted conflict |
| Settings/Profile | Account, status, privacy, data, help | profile, status, export, delete | loaded, managed, pending deletion | SSO lock, admin restriction, support unavailable |

## Data Model

- `User`: account identity, email, display profile, status, locale, region, account lifecycle, consent state, deletion/export state.
- `Workspace`: organization, owner, plan, domain, settings, retention policy, export policy, external-collaboration policy, data residency, deletion state.
- `WorkspaceMembership`: user/workspace role, guest/external state, SSO/SCIM state, deactivation state, notification defaults, audit metadata.
- `Channel`: workspace, name, topic, public/private/shared state, members, guest policy, retention policy, tabs, archive/delete state.
- `Conversation`: channel, DM, group DM, thread, huddle thread, app/system/support context with membership, visibility, retention, mute, and sync policy.
- `Message`: sender, conversation, content parts, thread parent, mentions, reactions, pins/bookmarks, edit/delete state, retention/legal-hold state.
- `ContentPart`: text, file, image, video, audio clip, link preview, canvas reference, list reference, workflow output, app payload, AI summary, scan state.
- `FileAsset`: owner, workspace, storage key, MIME type, size, scan result, permissions, retention state, external sharing state, deletion/export state.
- `Canvas`: owner, workspace, channel/DM tabs, collaborators, permissions, content version, comments, retention, export state.
- `ListTask`: list, assignee, status, due date, linked messages/files, permissions, workflow triggers, retention state.
- `HuddleSession`: conversation, participants, audio/video/screen state, captions, notes/canvas reference, metadata, quality metrics, retention state.
- `AppIntegration`: developer owner, scopes, install target, approval state, bot user, webhook/event subscriptions, data access, revocation state.
- `Workflow`: trigger, steps, app dependencies, permissions, run history, failure state, audit metadata.
- `ExternalConnection`: partner organization, shared channel, invite/approval state, retention/export policy mapping, revocation state.
- `Entitlement`: plan key, platform, invoice/receipt id, renewal/expiration/refund state, feature gates, AI add-on state, restore state.
- `AuditEvent`: append-only account, auth, membership, role, channel, app, workflow, huddle, retention, export, billing, privacy, deletion, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions`: device-scoped auth with SSO/2FA, workspace selection, audit events, and abuse throttles.
- `POST /workspaces`, `GET /workspaces`, `PATCH /workspaces/:id`, `DELETE /workspaces/:id`: workspace lifecycle, ownership, domain, plan, retention, export, and deletion states.
- `POST /workspaces/:id/invites`, `POST /invites/:code/accept`, `GET /members`, `PATCH /members/:id`: member/guest/external invitation, role assignment, deactivation, and SCIM/SSO hooks.
- `GET /channels`, `POST /channels`, `PATCH /channels/:id`, `DELETE /channels/:id`: public/private/shared channel lifecycle, archive, topic, retention, tabs, and permission checks.
- `GET /conversations/:id/messages?cursor=`, `POST /conversations/:id/messages`, `PATCH /messages/:id`, `DELETE /messages/:id`: message lifecycle with idempotency keys, threading, mentions, retention, and legal-hold failure codes.
- `POST /messages/:id/reactions`, `POST /messages/:id/pin`, `POST /messages/:id/bookmark`: message actions with authorization, audit, and notification behavior.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: signed file/clip upload with size/type validation, malware scanning, transcode/thumbnail states, and entitlement limits.
- `GET /search`, `GET /search/suggestions`: permission-aware search across messages, files, channels, canvases, lists, people, and optional AI answers.
- `POST /huddles`, `PATCH /huddles/:id`, `POST /huddles/:id/end`: huddle signaling abstraction with participant, permission, caption, screen-share, notes, and network states.
- `GET /canvases`, `POST /canvases`, `PATCH /canvases/:id`, `POST /canvases/:id/share`: canvas lifecycle with collaborators, permissions, versioning, and retention/export rules.
- `GET /lists`, `POST /lists`, `PATCH /lists/:id`, `PATCH /tasks/:id`: list/task lifecycle with assignees, status, due dates, workflow triggers, and permission checks.
- `GET /apps`, `POST /apps/:id/approve`, `POST /apps/:id/install`, `DELETE /apps/:id/install`: app authorization with scopes, approval, event subscriptions, and revocation.
- `POST /workflows`, `POST /workflows/:id/run`, `GET /workflow-runs/:id`: workflow builder runtime with permission checks, app dependencies, retries, and audit events.
- `POST /external-connections`, `PATCH /external-connections/:id`, `DELETE /external-connections/:id`: shared-channel invites, approvals, external organization policy mapping, and revocation.
- `GET /admin/audit-log`, `GET /admin/exports`, `POST /admin/exports`, `PATCH /admin/retention`: audit, retention, legal hold, and export workflows with strict role checks.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: server-authoritative paid feature lifecycle.
- `POST /data-export`, `DELETE /account`, `GET /privacy/requests/:id`: user privacy workflows with workspace ownership, retention, legal hold, and admin-controlled data caveats.
- `GET /support/cases/:id`, `POST /support/cases`: support escalation with redaction, abuse controls, and account recovery states.

## Realtime, Push, And Offline Behavior

- Message, thread, mention, reaction, channel, membership, app, workflow, and huddle events use websocket/SSE or push-assisted sync with canonical server reconciliation after reconnect.
- Workspace policy changes must invalidate affected channel, app, retention, export, huddle, and external-collaboration caches immediately on reconnect and before sensitive writes.
- The client may cache workspace/channel lists, recent DMs/messages, settings, entitlement summary, files metadata, canvases/lists summaries, and safe drafts for offline reads.
- Queue low-risk drafts locally with retry metadata; block admin policy changes, app installs, external-channel approvals, retention/export actions, account deletion, paid transactions, and workflow side effects while offline.
- Huddles must tolerate permission revocation, app backgrounding, Bluetooth route changes, network handoff, duplicate join events, captions failure, reconnect, and participant limits.
- Uploads must resume or fail with visible recovery; partially uploaded or unscanned files/clips cannot be published or indexed.
- Search and AI answers must be permission-aware and must not return content hidden by channel membership, private channel access, external boundaries, retention expiry, deletion, or legal-hold restrictions.
- Push notifications must be opt-in, workspace/channel scoped, quiet-hour aware, mention-aware, muted-channel aware, and free of sensitive message/file/payment/customer details by default.
- Deleted, private, deactivated, external-revoked, retained, legal-held, archived, or entitlement-locked objects must be redacted consistently from caches and notifications.

## Permissions, Privacy, And Safety

- Treat workspace data ownership, retention/export, legal hold, and admin access as launch-blocking review areas with owners, mitigation, test coverage, and manual-verification status.
- Treat external collaboration, guest access, app scopes, workflow side effects, AI summaries/search, and huddle metadata as launch-blocking privacy/security areas.
- Treat workplace abuse, harassment, impersonation, confidential data leakage, malware links, phishing, and privilege escalation as launch-blocking safety areas.
- Request camera, microphone, photos/files, notifications, contacts/calendar, local network, clipboard, or screen recording only when the user invokes a feature that needs it.
- Provide permission-denied fallbacks, settings education, no dark patterns, and no silent re-prompts.
- Provide user-visible privacy policy, terms, data export/deletion route, notification settings, app authorization review, support escalation, and workspace/admin contact paths.
- Minimize sensitive data in analytics, crash reports, AI/model logs, support tooling, search indexes, huddle telemetry, app callbacks, and workflow run logs.
- Redact or hash private identifiers in logs; store raw content only where needed for product function, legal obligation, enterprise export, retention policy, or user-requested support.
- Apps/workflows/AI/huddles must disclose scopes, install targets, data access, retention, external provider identity, revocation path, and admin approval state.
- Launch owner: privacy/security lead for workspace data controls, admin owner for roles/export/retention, platform owner for apps/workflows, realtime owner for huddles, AI owner for summaries/search, billing owner for entitlements, accessibility owner for mobile coverage.

## Analytics And Monetization

- Track privacy-safe lifecycle events: onboarding started/completed, workspace joined, channel viewed, message send succeeded/failed, thread reply sent, file upload failed, huddle joined/left, canvas/list opened, app installed/revoked, workflow run succeeded/failed, external channel connected, export requested, retention setting changed, entitlement state changed.
- Every event must use stable object types, coarse counts, feature surface, latency, and failure codes, not raw user-visible text, messages, files, search terms, huddle content, AI prompts/outputs, payment details, customer identifiers, or private identifiers.
- Monetization can include original free, paid, enterprise, AI add-on, workflow, retention/export, or storage tiers later, but names, prices, bundles, benefits, and promotional copy must be original.
- Paywall states must identify blocked feature, current entitlement, restore path, platform owner, server confirmation state, invoice state, and support/admin contact path.
- AI, search, app marketplace, and workflow monetization must separate targeting signals from sensitive workplace content and expose opt-out/admin controls where required.
- Billing tests must cover app-store-owned, web-owned, invoice-owned, restored, expired, canceled, refunded, grace-period, seat-count change, workspace downgrade, AI add-on removal, and unavailable states.

## Edge Cases

- First launch offline, unsupported OS, expired session, SSO outage, locked domain, deactivated user, deleted workspace, guest invited to wrong workspace, or enterprise restriction.
- Invite expired, email domain mismatch, SSO required after password login, SCIM deprovision races with active session, or user removed while composing.
- Channel converted public/private, archived while open, general channel constraints, guest cannot access thread, external partner removed, or retention policy deletes parent message.
- Role/admin permission conflict, app approval revoked, workflow runs with stale permission, external channel policy mismatch, audit log write failure, or legal hold blocks deletion.
- Message sent while offline, duplicate tap, mention suppressed, thread parent deleted, file scan failed, canvas conflict, list assignee deactivated, or search index delayed.
- Huddle starts with denied microphone/camera, participant joins from mobile, screen share unavailable, captions unavailable, AI notes disabled, network handoff drops audio, or participant limit reached.
- App integration token compromised, webhook timeout, workflow loops, app posts to wrong channel, external provider outage, or admin revokes scopes mid-run.
- AI summary includes restricted content, search returns stale private result, huddle notes shared too broadly, or external user sees internal-only canvas reference.
- Paid plan purchased on web but opened on iOS, app-store restore fails, invoice unpaid, webhook delayed, refund changes feature access, or plan downgrade hides history/features.
- Data export/account deletion requested while legal hold, retention policy, workspace ownership, support case, upload, invoice, or external-channel relationship is active.

## Test Plan

- Unit tests for auth, workspace selection, SSO/2FA, invite validation, role/admin permissions, notification settings, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.
- Unit tests for channel visibility, public/private/shared state, general-channel constraints, guest/external access, retention rules, export rules, legal hold, and archive/delete behavior.
- Unit tests for conversation/message state: send, retry, mentions, threads, reactions, pins/bookmarks, edit/delete, file attachment states, retention expiry, and search indexing.
- Unit tests for app/workflow authorization, scopes, approval queues, event subscriptions, retry/failure state, audit logs, and revocation effects.
- Contract tests for every API route, including pagination, authorization errors, upload states, huddle states, app errors, workflow errors, billing webhooks, privacy request, and admin export states.
- Integration tests for onboarding, workspace join, channel post, DM, thread reply, mention notification, file upload, huddle join, canvas/list sharing, app approval, workflow run, billing restore, export request, and account deactivation.
- Huddle tests for mic/camera denied/granted/revoked, mute, video, screen sharing flag, captions unavailable, notes/canvas linkage, network drop, reconnect, and participant limit.
- Privacy/security tests for workspace data ownership, retention, legal hold, export permissions, external channels, guest access, app scopes, AI disabled state, support redaction, and analytics redaction.
- Safety tests for harassment, phishing link, confidential data leakage, impersonation, malware upload, privilege escalation, app abuse, external-channel abuse, and support escalation.
- Offline tests for cached workspace/channel lists, queued drafts, blocked sensitive writes, reconnect reconciliation, stale policy invalidation, corrupt cache recovery, and deleted-object cache cleanup.
- Notification tests for opt-in, denied, revoked, quiet hours, muted channel, thread follow, mention rules, huddle notification, external channel, deep link, and sensitive-payload redaction.
- Billing tests for free, paid, enterprise, invoice-owned, expired, canceled, refunded, restored, web-owned, app-store-owned, seat-count change, AI add-on, and unavailable entitlements.
- Accessibility tests for dynamic type, screen-reader labels, focus order, reduced motion, captions/alt text where relevant, color contrast, large touch targets, and keyboard/external input on tablets.
- Manual verification tests for native iOS screenshots, native Android screenshots, workspace creation/join, SSO, channels, huddles, canvas/list, app integrations, AI, paid purchase/restore, push payloads, admin/export/deletion completion, and region/device-specific behavior.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without proprietary Slack assets, private APIs, network traffic, brand copy, customer data, App Directory data, workflow templates, AI outputs, paid-plan names, or enterprise policy tooling.
- New and returning users can complete workspace onboarding, primary channel/DM workflow, thread/file/search workflow, settings, support, notification, and data/account lifecycle paths.
- Workspaces, channels, DMs, threads, files, huddles, apps, workflows, external collaboration, retention/export, billing, and notifications have deterministic API contracts, failure codes, audit events, and tests.
- Workspace-private, channel-public, channel-private, DM, external-shared, file, canvas/list, huddle, app/workflow, AI, and support content have explicit visibility, retention, deletion/export, and permission behavior.
- Category-specific launch blockers are either resolved with evidence or remain behind explicit feature flags and acceptance-test blockers.
- Manual verification blockers are preserved until lawful hands-on evidence confirms exact native behavior.

## Open Questions

- Which downstream implementation repository, framework, realtime provider, media provider, search provider, AI provider, admin console, and billing provider will own this clone?
- Which features are V1 versus deferred: huddles, clips, canvases, lists, workflow builder, external shared channels, app marketplace, enterprise search, AI notes/summaries, and enterprise admin exports?
- Which paid, account-linked, enterprise-managed, external-collaboration, regional, notification, or device-specific flows can be lawfully verified with available test workspaces/devices?
- Which retention/export, legal-hold, data residency, app approval, and AI provider policies must be completed before public beta?
- How will the downstream team model customer/workspace ownership so user deletion, workspace exports, and legal holds do not conflict?

## Build Plan

- Phase 1: scaffold app shell, auth/session model, workspace create/join, profile/status, channel list, DMs, settings/legal links, privacy-safe analytics, and accessibility baseline.
- Phase 2: add channels, messages, threads, mentions, reactions, pins/bookmarks, files, local drafts, offline cache/reconnect behavior, and notification preferences.
- Phase 3: add workspace roles, guests, public/private channel permissions, admin settings, audit logs, retention policy placeholders, and deterministic permission tests.
- Phase 4: add search across messages/files/people, saved/history surfaces, support flows, account deactivation, data export request, and support redaction.
- Phase 5: add huddles with provider-backed signaling/media, permission handling, captions flag, notes/canvas linkage, reconnect behavior, and huddle notifications.
- Phase 6: add canvases, lists, clips, file sharing permissions, conflict handling, versioning, retention/export coverage, and mobile accessibility tests.
- Phase 7: add app approval/install/revoke, workflow builder runtime, webhook/event subscriptions, audit logs, and app/workflow abuse controls.
- Phase 8: add entitlements, paywall states, checkout/restore/webhooks, invoice states, plan downgrade behavior, AI add-on placeholders, and billing regression tests.
- Phase 9: evaluate external shared channels, enterprise admin, SCIM/SSO, legal holds, data residency, AI summaries/search, and app marketplace only after separate legal, provider, privacy, security, and platform-policy approvals.
- Phase 10: complete account deletion/export, workspace deletion, accessibility pass, offline/reconnect validation, performance validation, security review, and manual native verification.

## Next Steps

- Resolve the manual verification blockers before claiming one-for-one native parity.
- Recheck marketplace listings and first-party help/legal/product URLs immediately before implementation kickoff.
- Create or link the downstream implementation repository when Phase 1 is ready to begin.
