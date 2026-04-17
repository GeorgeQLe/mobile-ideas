# Notion-Style Clone Spec

> Metadata
> - Inspiration app: Notion
> - Category: Productivity, workspace docs, project management, knowledge base, collaboration, AI workspace, integrations, and enterprise administration
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Notion Help Center docs, Notion product/pricing pages, Notion security/privacy docs, Notion AI references, and public Notion API documentation.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, workspace creation, paid plan checkout/restore/cancel, AI outputs, AI Meeting Notes, mobile widgets/shortcuts, realtime collaboration cursors, comments, offline conflict resolution, imports, exports, page publishing, permission requests, enterprise admin controls, push payloads, data export, account deletion, support chat, API OAuth/install behavior, and regional availability still require lawful test devices/accounts and provider approvals before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, templates, sample data, AI prompts, import pipelines, automation logic, permission models, marketplace content, and provider integrations.

## Overview

Build an original mobile workspace app inspired by Notion's public workflow: account entry, workspace sidebar, pages, nested blocks, databases, templates, search, comments, mentions, sharing, permissions, teamspaces, notifications, offline pages, imports, exports, integrations, AI assistance, billing, support, security, privacy controls, and account deletion.

The clone must not copy Notion branding, screenshots, marketing copy, protected UI artwork, template marketplace content, private APIs, AI prompts, internal ranking systems, automation rules, or enterprise security implementation. Functional parity should be expressed with original product language, independently designed blocks/templates, licensed providers, and explicit authorization boundaries.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and account-specific constraints.

## Goals

- Provide a mobile-first workspace app with onboarding, personal/team workspaces, page editing, block composition, database organization, templates, search, sharing, comments, notifications, offline access, settings, support, and privacy controls.
- Model pages and database entries as composable nested content with explicit lifecycle, permissions, sync, export, and deletion behavior.
- Support collaboration expectations around workspace membership, guests, teamspaces, page-level access, comments, mentions, realtime presence, and enterprise restrictions.
- Preserve productivity-category trust expectations around private workspace content, file uploads, AI-generated content, imports/exports, customer data ownership, enterprise administration, minors/students, and billing.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.

## Non-Goals

- Do not build a Notion-branded app or imply affiliation with Notion Labs, Inc., Notion Calendar, Notion Mail, marketplace creators, or integration partners.
- Do not scrape Notion, reuse private Notion APIs, replay network traffic, copy Notion templates, clone Notion AI prompts, or copy proprietary permission/recommendation logic.
- Do not use real workspace documents, uploaded files, comments, AI prompts, meeting transcripts, or customer metadata as seed content without explicit permission.
- Do not treat desktop-only, web-only, enterprise-only, paid-plan, AI, integration, or admin behavior as mobile-verified until tested with lawful accounts.
- Do not claim exact App Store, Play Store, native-device, offline-sync, AI-output, permission, billing, enterprise, push-notification, API, import/export, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/notion-notes-docs-tasks/id1232780281 | Official iOS listing, developer, Productivity category, age rating, platform support, privacy labels, free/in-app purchase disclosure, notes/docs/tasks/AI positioning, template/import/integration claims, and current release context | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=notion.id | Official Android listing, package id, ratings/download scale, in-app purchase disclosure, data safety, support email, notes/docs/tasks/AI positioning, sync claims, and Android support context | Verified 2026-04-17 |
| Notion for Mobile | https://www.notion.com/help/notion-for-mobile | Mobile download/sign-in, mobile AI access, iOS shortcut/widget entry points, and documented mobile limitations for block selection, imports, account details, workspace deletion/leaving, security, and billing settings | Verified 2026-04-17 |
| Intro to Writing and Editing | https://www.notion.com/help/writing-and-editing-basics | Page/block editing model, plus menu, block handle actions, slash commands, block transforms, comments, suggested edits, Ask AI entry point, and mobile editing implications | Verified 2026-04-17 |
| Intro to Databases | https://www.notion.com/help/intro-to-databases | Databases as collections of pages, database item pages, properties, views, inline/full-page databases, duplicate behavior, and collaboration/permission references | Verified 2026-04-17 |
| Use Pages Offline | https://www.notion.com/help/use-pages-offline | Desktop/mobile offline availability, per-page downloads, paid-plan automatic recent/favorite downloads, first 50 database rows, offline block limitations, sync, and conflict risk | Verified 2026-04-17 |
| Search in Your Workspace | https://www.notion.com/help/search | Workspace search, recent pages, exact phrase search, AI search across sources, sorting/filtering, database search differences, page search, and search limitations | Verified 2026-04-17 |
| Sharing and Permissions | https://www.notion.com/help/sharing-and-permissions | Page sharing, guest invites, teamspace sharing, general access, public links, link expiration, access levels, inherited permissions, access requests, page-level database access, and enterprise restrictions | Verified 2026-04-17 |
| Comments, Mentions and Reactions | https://www.notion.com/help/comments-mentions-and-reminders | Top-level comments, inline comments, database comments, mentions, mention notifications, reactions, and collaboration workflows | Verified 2026-04-17 |
| Inbox and Notifications | https://www.notion.com/help/updates-and-notifications | Inbox updates, mentions, assignments, reminders, page changes, notification channels, preference behavior, and delivery expectations | Verified 2026-04-17 |
| Import Data Into Notion | https://www.notion.com/help/import-data-into-notion | Public import paths, source app/file coverage, import state, data movement constraints, and mobile limitation cross-check | Verified 2026-04-17 |
| Export Your Content | https://www.notion.com/help/export-your-content | Page/database/workspace export formats, PDF/HTML/Markdown/CSV handling, mobile page export, workspace export limits, Business/Enterprise PDF workspace export, email links, and disabled-export constraints | Verified 2026-04-17 |
| Delete Your Account | https://www.notion.com/help/delete-your-account | Account deletion effects, private/shared workspace ownership handling, removal from shared workspaces, and account lifecycle requirements | Verified 2026-04-17 |
| Pricing | https://www.notion.com/pricing | Free, Plus, Business, Enterprise-style entitlement framing, AI/trial capability references, forms/sites/calendar/mail positioning, and paid workspace gating | Verified 2026-04-17 |
| Privacy Practices | https://www.notion.com/help/privacy | Customer Data vs Account Information, user control of workspace content, account/workspace deletion, data export/import, backups, privacy compliance, and vendor/subprocessor expectations | Verified 2026-04-17 |
| Terms and Privacy Index | https://www.notion.so/Terms-and-Privacy-28ffdd083dc3473e9c2da6ec011b58ac | Public terms, privacy, supplementary AI terms, developer terms, marketplace terms, content/use policy, DMCA policy, subprocessors, and data processing references | Verified 2026-04-17 |
| Security | https://www.notion.com/security | Enterprise-grade security positioning, compliance/security program reference, and launch-blocking security expectations for workspace data | Verified 2026-04-17 |
| Notion AI | https://www.notion.com/ai | Public AI workspace positioning, AI search, writing, meeting notes, agents, enterprise search, and connected-workflow claims | Verified 2026-04-17 |
| Notion AI Security and Privacy Practices | https://www.notion.com/help/notion-ai-security-practices | AI permission honoring, AI subprocessors, web search controls, DLP references, AI terms, generated output ownership framing, and admin controls | Verified 2026-04-17 |
| Notion AI Safety | https://www.notion.com/help/ai-safety | AI safety pillars, model-provider transparency, no default workspace-data training claim, subprocessor restrictions, and moderation/safety controls | Verified 2026-04-17 |
| Notion API Introduction | https://developers.notion.com/reference/intro | Public API base URL, REST/JSON conventions, integration tokens, supported objects/endpoints, cursor pagination, request limits/status/versioning references, and developer constraints | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position the app as a free productivity workspace for notes, docs, tasks, projects, templates, collaboration, synced desktop/mobile work, and AI assistance with in-app purchases.
- V1 must support email/social account entry, signed-out blocked states, personal workspace creation, team workspace invite acceptance, guest access, expired session, locked account, underage/student eligibility blockers, and region-blocked states.
- Mobile must support reading, editing, and commenting on workspace content, but mobile-only parity must respect documented limitations: no desktop hover states, columns collapse to one column, and some admin/account/import/billing/security actions require desktop or web.
- Home/sidebar must support private pages, shared pages, teamspaces, favorites, recent pages, search, inbox, templates, settings, workspace switching, empty workspace education, and permission-limited content.
- Page editing must support nested pages and blocks, slash-command-style insertion, text, headings, to-dos, tables, lists, toggles, media/files, embeds, code, math, links/backlinks, synced blocks, comments, suggested edits, delete/duplicate/move, block links, and Ask AI entry points where enabled.
- Databases must support inline and full-page databases, every database item as a page, custom properties, multiple views, filters, sorts, groups, relations, rollups, templates, sub-items, dependencies, task/sprint patterns, locked views, and view-specific performance states.
- Search must support workspace search, recent pages, exact phrase matching, sorting by best match and date, filtering by title, creator, teamspace, page scope, and date, page-local search, database search for titles/properties, no-result states, and known gaps for comments and some mentions.
- Sharing must support specific people, groups, teamspaces, guests, workspace-wide access, public link access, link expiration, page publishing blockers, request access, request edit access, inherited permissions, broadest-access resolution, page-level database access rules, and enterprise security restrictions.
- Collaboration must support presence avatars, active/faded collaborator states, block-level cursors, comments, mentions, reactions, reminders, assignments, inbox updates, page-change notifications, resolved/unresolved comments, and access-request notifications.
- Offline mode must support explicit page downloads for all workspace members on desktop/mobile apps, paid-plan automatic recent/favorite downloads, downloaded database first-view row limits, essential block editing, unavailable advanced blocks, local draft preservation, sync after reconnect, and conflict risk warnings for non-text edits.
- Import flows must support provider/file-specific import jobs through desktop/web where required, with source authorization, progress, retry, duplicate handling, partial-failure reports, and mobile-visible imported content after completion.
- Export flows must support page/database PDF, HTML, Markdown, and CSV behavior, mobile page export with share sheet/download link/email delivery, workspace-level exports from desktop/web, Business/Enterprise PDF workspace export, disabled-export admin controls, and large export async delivery.
- Templates must support first-party starter templates, original clone templates, workspace-specific templates, marketplace-inspired discovery only with original/licensed content, duplicate-to-workspace behavior, preview, categories, permissions, and moderation.
- AI features must support workspace search/chat, writing/editing assistance, database generation/autofill, PDF/image analysis, AI Meeting Notes, web-search controls, provider/subprocessor disclosures, permission-aware retrieval, feedback, usage limits, and admin disablement.
- AI Meeting Notes-style behavior must support explicit consent, audio/microphone permission, transcript/summary/action-item lifecycle, meeting source links, calendar integration blockers, searchable meeting notes, language support blockers, and manual verification before exact native claims.
- Integrations/API must support OAuth/token install, workspace admin authorization, pages/blocks/databases/data sources/comments/files/search/users objects, cursor pagination, request limits, webhooks, file uploads, and revoke/disconnect behavior without treating Notion API behavior as a production dependency for the clone.
- Billing must model original Free, Plus-like, Business-like, Enterprise-like, education, trial, AI add-on, credits, canceled, expired, refunded, platform-owned, web-owned, invoice-managed, unavailable, and admin-restricted states without copying Notion plan names, prices, or offers.
- Settings/privacy/support must expose account preferences, language, notifications, workspace settings, members/guests, teamspaces, security, two-step verification/passkeys, connected integrations, AI controls, data export, account deletion, workspace deletion/leaving, support chat, legal links, and inaccessible-on-mobile notices.
- Enterprise controls must include SAML/SCIM-like identity, domain management, audit logs, managed users, data retention, legal holds, IP/network controls, device management, content search, export disabling, public sharing restrictions, guest restrictions, DLP hooks, and admin-level support paths.
- Page publishing/sites/forms/mail/calendar/custom agents are adjacent product areas; V1 can include placeholders or narrow versions, but each requires separate scope, entitlement, privacy, and manual verification before broad parity claims.

## Core User Journeys

- New individual installs the app, creates an account, accepts terms/privacy, creates a personal workspace, starts from a blank page or original template, edits blocks, and finds the page again from Home or Search.
- Returning user opens mobile Home, switches workspace, opens a recent page, edits a to-do block, adds a file or image, leaves a comment, and sees sync status after reconnect.
- Team member receives an invite, joins a workspace/teamspace, opens a shared project database, updates a status property, mentions a teammate, and receives an inbox notification when the teammate replies.
- Guest opens an invited page, signs in if required, sees only authorized content, comments with limited permission, requests edit access, and handles an approved or denied access request.
- Workspace owner shares a page with a person, group, teamspace, workspace, or public link, changes permission levels, sets link expiration where available, and confirms inherited subpage behavior.
- Mobile user loses connectivity, opens a downloaded page, creates a new page, edits text blocks, sees unavailable advanced blocks, reconnects, and resolves or reports conflicts.
- User builds a project database, adds properties, switches between table/board/calendar/list/gallery-style views, opens a database item page, applies filters/sorts, and handles locked view or permission limits.
- User searches globally, filters by creator/teamspace/date/page scope, opens a result, tries database search, searches within a page, and sees limitations for comments or unsupported mentions.
- User imports content from a supported source on desktop/web, monitors progress, handles partial failures, sees imported pages on mobile, and deletes or reorganizes imported content.
- User exports a page from mobile, receives a share sheet or download/email link, exports a workspace from desktop/web, and handles disabled export or inaccessible private pages.
- User invokes AI to draft, summarize, answer questions over accessible workspace content, autofill a database, or process a meeting note, then reviews citations, permission boundaries, and feedback controls.
- Admin configures members, guests, teamspaces, public sharing, export controls, security settings, AI controls, integrations, audit logs, and support escalation for sensitive workspace content.
- User opens settings, changes notification preferences, starts account deletion, reviews workspace ownership consequences, exports data, confirms deletion, and loses access according to account/workspace rules.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Account entry, legal consent, workspace invite acceptance | email/social auth, magic link, SSO, invite link | new, returning, guest invite, SSO | underage, blocked region, expired invite, failed auth |
| Workspace Home/Sidebar | Workspace switcher, private/shared/teamspace navigation, recents/favorites | workspace tap, search, page create, settings | empty, loaded, multi-workspace, offline | no access, removed workspace, stale sidebar, admin restriction |
| Page Editor | Read and edit nested block pages | text, slash menu, plus menu, block actions, media | viewing, editing, commentable, saving | read-only, conflict, unsupported block, upload failure |
| Block Insert/Action Sheet | Add, transform, move, duplicate, delete, comment, ask AI | block type, transform, destination, AI action | open, filtered, recent blocks, selected | unavailable offline, permission denied, mobile unsupported |
| Database View | Organize page collections by properties/views | new item, filters, sorts, group, view switch | table, board, list, calendar, gallery, chart/map placeholder | locked view, row limit offline, malformed property, slow query |
| Database Item Page | Edit the page behind a database row/card | property edits, blocks, comments, relations | loaded, changed, template-applied | property permission denied, relation missing, duplicate item |
| Search | Find workspace pages and database entries | query, filters, sort, recent page tap | recent, results, no-results, AI search | hidden page, comment not indexed, CJK edge, stale index |
| Inbox/Notifications | Mentions, comments, reminders, assignments, page updates | notification tap, filter, mark read | unread, read, grouped, muted | push denied, missing page access, duplicate delivery |
| Comments/Mentions | Async collaboration on pages, blocks, and database rows | comment, mention, reaction, resolve | top-level, inline, database, resolved | mention no access, deleted block, notification failure |
| Share/Permissions | Manage access and public links | invite, role dropdown, link copy, request | private, shared, workspace, public | guest limit, domain blocked, inherited leak, enterprise disabled |
| Teamspaces/Members | Team structure and member/guest controls | invite, role, teamspace move, group action | owner, member, guest, default teamspace | admin-only, member cap, conflicting permissions |
| Offline Manager | Downloaded pages and automatic download controls | available-offline toggle, search, remove | downloading, downloaded, auto-downloaded | device-only, first 50 rows, sync conflict, low storage |
| Templates/Marketplace | Start from original or licensed templates | category, preview, duplicate, search | empty, recommended, duplicated | unlicensed template, duplicate failure, workspace no access |
| Import Manager | Move data from files/providers | source select, upload, auth, progress | pending, importing, complete | desktop-required, auth revoked, partial import, duplicate data |
| Export/Backup | Export page/database/workspace content | format, include subpages, share, email | PDF, HTML, Markdown/CSV, workspace job | export disabled, no full access, large zip, expired link |
| AI Assistant | Workspace AI search, writing, database, meeting notes | prompt, selected block, file, voice/camera | composing, generating, cited, feedback | no entitlement, permission boundary, unsafe prompt, provider fail |
| Billing/Entitlements | Plans, AI usage, trials, restore/cancel paths | plan select, checkout, restore, cancel | free, paid, trial, expired | mobile unsupported, platform mismatch, invoice owner, refund delay |
| Settings/Privacy/Support | Account, notifications, workspace, security, export/delete, help | toggles, support chat, export, delete | loaded, admin, member, pending deletion | mobile unsupported, legal hold, last owner, support unavailable |
| Admin/Security | Enterprise security, audit, retention, DLP, SSO/SCIM | policy toggles, logs, domain, users | owner, admin, managed users, audit | enterprise-only, misconfigured SSO, export disabled, DLP alert |

## Data Model

- `User`: identity, email(s), auth providers, locale, language, accessibility preferences, notification preferences, account deletion state, SSO/passkey/two-step state, and support profile.
- `DeviceSession`: device id, platform, app version, workspace list, offline capability, push token, local encryption state, session expiry, and last sync cursor.
- `Workspace`: name, owner/admins, plan, billing owner, domains, settings, security controls, export/delete state, data residency, AI policy, and lifecycle status.
- `Teamspace`: workspace id, visibility, default/private state, owners, members, groups, default permissions, content roots, and archived/deleted state.
- `Page`: title, parent, workspace/teamspace, icon/cover metadata, access policy, publish state, archived/deleted state, verification/staleness status, and last edited metadata.
- `Block`: page id, parent block, type, order, rich text/content payload, media references, synced-block pointer, comment anchors, AI state, and unsupported/offline capability flags.
- `Database`: source page, schema, data sources, views, templates, row count, permission rules, locked views, performance metadata, and relation/rollup dependencies.
- `DatabaseItem`: database id, page id, property values, status, assignee/person references, date/reminder fields, relation links, formula outputs, and audit metadata.
- `Template`: source, category, preview metadata, licensing/moderation state, target workspace, duplication options, and version.
- `CommentThread`: page/block/database item anchor, author, mentions, reactions, resolved state, notification fanout, and deleted-anchor fallback.
- `PermissionGrant`: subject type, role, inherited/direct/public/workspace/teamspace source, link expiration, request state, admin override, and broadest-access resolution.
- `Notification`: event type, actor, target object, delivery channels, read state, grouping key, deep link, and permission recheck result.
- `OfflinePageBundle`: device, page, selected subpages, database row subset, download status, last sync cursor, local edits, conflict markers, and storage footprint.
- `ImportJob`: source provider/file, auth, workspace destination, mapping rules, progress, warnings, partial failures, duplicate strategy, and created pages.
- `ExportJob`: scope, format, include subpages/files/comments flags, requester access snapshot, async delivery link, expiry, failure reason, and audit event.
- `AIInteraction`: prompt, selected context, accessible-source ids, provider, response, citations, safety classification, feedback, usage/credit state, and retention policy.
- `IntegrationInstall`: integration type, OAuth/token metadata, capability scopes, installed workspace, user/admin approver, webhook endpoints, rate limits, and revocation state.
- `Subscription`: plan type, platform owner, workspace owner, trial/renewal/cancel/refund state, AI credits, invoice state, education eligibility, and feature gates.
- `AuditEvent`: append-only auth, workspace, permission, export, deletion, billing, AI, admin, integration, import, support, and security-sensitive changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `POST /auth/sso`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: account auth with invite, SSO, expired session, blocked account, and device state.
- `GET /workspaces`, `POST /workspaces`, `PATCH /workspaces/:id`, `DELETE /workspaces/:id`: workspace lifecycle with owner/admin authorization, plan context, and deletion blockers.
- `GET /teamspaces`, `POST /teamspaces`, `PATCH /teamspaces/:id`, `POST /teamspaces/:id/members`: teamspace membership, visibility, default permissions, and audit events.
- `GET /sidebar`, `GET /home`, `GET /recents`, `POST /favorites`: workspace navigation with cache hints, authorization status, stale labels, and offline-ready summaries.
- `GET /pages/:id`, `POST /pages`, `PATCH /pages/:id`, `DELETE /pages/:id`, `POST /pages/:id/restore`: page lifecycle, parent changes, archive/delete/restore, idempotency, and permission checks.
- `GET /pages/:id/blocks`, `POST /blocks`, `PATCH /blocks/:id`, `POST /blocks/reorder`, `DELETE /blocks/:id`: block tree CRUD, ordering, transform, comments, unsupported block errors, and conflict versions.
- `GET /databases/:id`, `POST /databases`, `PATCH /databases/:id/schema`, `POST /databases/:id/query`: database schemas, view filters/sorts/groups, cursor pagination, permission-limited rows, and performance hints.
- `POST /databases/:id/items`, `PATCH /database-items/:id`, `DELETE /database-items/:id`: database item pages, property validation, relation integrity, and audit events.
- `GET /search?q=&scope=&sort=&cursor=`, `POST /search/ai`: workspace, database, page-local, and AI search with permissions, filters, index freshness, result explanations, and no-result states.
- `GET /permissions/:objectType/:id`, `POST /permissions/grants`, `PATCH /permissions/grants/:id`, `DELETE /permissions/grants/:id`, `POST /permissions/requests`: sharing, roles, public links, link expiration, request access, and enterprise policy denial.
- `GET /comments`, `POST /comments`, `PATCH /comments/:id`, `POST /comments/:id/reactions`, `POST /comments/:id/resolve`: top-level, inline, database, mention, reaction, and deleted-anchor workflows.
- `GET /notifications`, `PATCH /notifications/:id`, `PATCH /notification-preferences`: inbox, push/email/mobile preferences, read state, grouping, and permission rechecks on open.
- `POST /offline/pages/:id`, `DELETE /offline/pages/:id`, `GET /offline/status`, `POST /sync/push`, `GET /sync/pull`: downloaded pages, auto-download state, local edits, server cursors, conflict detection, and storage limits.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`, `DELETE /uploads/:id`: signed upload flow with MIME/size validation, malware scanning, file lifecycle, and permission checks.
- `POST /imports`, `GET /imports/:id`, `POST /imports/:id/cancel`: import provider/file jobs with auth, progress, mapping, duplicate handling, partial failures, and desktop/web-only blockers.
- `POST /exports`, `GET /exports/:id`, `DELETE /exports/:id`: page/database/workspace export jobs with format flags, include-subpages/files/comments options, email/share delivery, expiry, and disabled-export policy errors.
- `GET /templates`, `POST /templates/:id/duplicate`, `POST /templates/:id/report`: template discovery, preview, original/licensed template duplication, moderation, and workspace destination checks.
- `POST /ai/chat`, `POST /ai/write`, `POST /ai/database/autofill`, `POST /ai/meeting-notes`, `POST /ai/feedback`: permission-aware AI context retrieval, provider usage, citations, safety codes, usage limits, and admin disablement.
- `GET /integrations`, `POST /integrations/oauth/start`, `POST /integrations/oauth/callback`, `DELETE /integrations/:id`: integration install, scopes, webhooks, rate limits, reconnect, and revoke.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/cancel`, `POST /billing/webhook`: workspace subscription lifecycle with platform/web ownership, delayed webhooks, credits, invoice-managed workspaces, and mobile unsupported states.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, `DELETE /workspaces/:id`: privacy choices, data export, account deletion, workspace deletion, legal hold, last-owner, and async cleanup.
- `GET /admin/audit-log`, `GET /admin/content-search`, `PATCH /admin/security`, `POST /support/cases`: admin/security/support workflows with role checks, sensitive-data redaction, and audit trails.

## Realtime, Push, And Offline Behavior

- Page edits, block edits, comments, mentions, database item changes, permission changes, notifications, import/export jobs, AI jobs, billing changes, integration events, and admin policy changes must reconcile from server-owned event streams.
- Realtime collaboration must show active collaborators, block-level presence, save status, version cursors, and conflict warnings without exposing unauthorized users or hidden pages.
- Clients may cache sidebar, home, recent pages, favorites, settings, entitlement summary, selected pages, downloaded database rows, notifications, comments, and support status with stale labels.
- Offline mode may create new pages, view/edit downloaded pages, use essential block types, preserve drafts, and queue low-risk text/block edits for sync.
- Offline mode must block or degrade sharing, permission edits, public publishing, imports, billing changes, account deletion, workspace deletion/leaving, admin/security settings, AI blocks, forms, buttons, embeds requiring network, and provider-backed integrations.
- Downloaded page availability is device-local; paid-plan automatic downloads should be modeled separately from explicit downloads and expose a user-visible opt-out.
- Database offline behavior must limit downloaded rows according to selected view constraints, expose incomplete-data labels, and require explicit row/page downloads for critical subpages.
- Sync events must be idempotent, ordered by server cursor, and resilient to duplicate delivery, app termination, background refresh, token expiry, clock skew, and workspace permission changes.
- Conflict handling must auto-merge safe text edits where possible and surface non-text conflicts, property conflicts, relation conflicts, deleted-parent conflicts, and permission-changed conflicts to the user.
- Push notifications must be opt-in and category-controlled for mentions, comments, reminders, assignments, access requests, shared page changes, invite events, support, security, export readiness, and billing alerts.
- Push payloads must minimize sensitive content; default payloads should avoid raw page text, private page names where possible, AI prompts, uploaded file names, meeting transcript text, billing details, and admin/security evidence.
- Long-running flows must expose pending, complete, failed, canceled, expired, blocked, held, and provider-degraded states with recovery actions.

## Permissions, Privacy, And Safety

- Notifications, photos/files, camera, microphone, speech recognition, calendar, contacts, local network, and location permissions must be requested only when the related feature is invoked.
- Default analytics must exclude raw page content, comments, database property values, search queries where possible, AI prompts/outputs, meeting transcripts, uploaded files, private page names, user emails, device names, billing details, and support evidence.
- Workspace content, file uploads, comments, AI context, meeting transcripts, imports, exports, and integration data are sensitive customer-data launch blockers with privacy/security owners.
- Page permission resolution must be tested for inherited access, broadest-access wins, public links, link expiration, guest limits, default teamspaces, private teamspaces, page-level database rules, moved pages, backlinks/relations, and enterprise restrictions.
- AI retrieval must honor existing permissions at query time, avoid training on workspace data by default, disclose provider/subprocessor use, expose admin controls, and prevent prompt-injection leakage across pages or integrations.
- AI outputs must be treated as assistive drafts; sensitive decisions, legal/medical/financial advice, personnel decisions, and automated decisions about individuals require warnings or policy blocks.
- AI Meeting Notes must require clear participant consent, microphone/system-audio permission, transcript visibility controls, retention rules, share controls, and deletion/export behavior before launch.
- Imports must scan files, preserve provenance, validate unsupported formats, avoid hidden external sharing, and warn when source access or structure cannot be fully preserved.
- Exports must enforce requester access, enterprise disablement, link expiration, email/inbox delivery safety, comments/files inclusion flags, long path limitations, and legal hold or retention restrictions.
- Public publishing and template sharing must include content-reporting, takedown, spam, malware, copyright, impersonation, and private-data leakage controls.
- Enterprise/admin tooling must maintain audit trails, role separation, least privilege, DLP hooks, SSO/SCIM safeguards, content-search justification, and support access approval.
- Account deletion and workspace deletion must warn about private workspace deletion, shared workspace admin consequences, billing ownership, integration revocation, exports, legal holds, and support cases.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels for block controls, visible focus, reduced motion, keyboard/external input on tablets, accessible database controls, and nonvisual alternatives for charts/maps.
- Launch owners: privacy owner for customer data and AI context; security owner for permissions/admin/integrations; productivity owner for page/database/editor UX; billing owner for entitlements; legal owner for templates/import/export/public publishing; accessibility owner for editor and database flows.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, workspace created/joined, page created/opened/edited, block inserted/transformed, database created/queried, search performed, comment created/resolved, mention sent, share started/completed, offline page downloaded, sync recovered, import completed, export requested, AI used, entitlement changed, data export requested, and account deletion requested.
- Every event must use object type, surface, feature flag, entitlement state, workspace size bucket, region bucket, error code, latency bucket, and provider status rather than raw content, page names, database values, comments, prompts, file names, or emails.
- Collaboration analytics must separate invite sent, access requested, permission changed, comment/reaction, notification opened, and conflict resolved without exposing collaborator names or private page titles.
- Search analytics must bucket query length/type and filters, avoid raw query logging by default, and separate database search, workspace search, page search, and AI search.
- AI analytics must capture feature type, provider, token/credit bucket, safety code, permission-source count bucket, success/failure, feedback state, and admin-disabled state without storing prompt/output text in product analytics.
- Import/export analytics must track source/format, size bucket, duration bucket, partial-failure reason, disabled-export state, delivery channel, and retry count without exposing imported/exported content.
- Monetization may include original free, paid workspace, business, enterprise, education, AI usage, credits, advanced permissions, automatic offline downloads, analytics, admin/security, integrations, and support tiers after legal review.
- Any paid plan, AI credit, workspace member billing, enterprise feature, marketplace template sale, or integration add-on must disclose price, renewal/cancellation, refund/support path, platform ownership, data use, and admin ownership before launch.

## Edge Cases

- First launch offline, unsupported OS, unsupported region, expired invite, expired session, SSO outage, user removed from workspace, guest limit reached, or locked workspace.
- Page opens through a stale link after deletion, move, permission change, workspace removal, public-link expiration, or teamspace archival.
- Two users edit the same text block, property, relation, database row, or permission while one is offline or after one user loses access.
- Columns collapse on mobile, a desktop-only block/action is opened on mobile, a hover-only action needs a mobile replacement, or an advanced block is unavailable offline.
- Database view contains more rows than available offline, relation targets are not downloaded, formulas reference missing data, or a locked view prevents changes.
- Search result points to hidden/deleted content, comments are not searchable, recently edited content is stale, CJK tokenization behaves differently, or AI search returns a permission-filtered answer.
- Import job loses source auth, maps unsupported properties, duplicates pages, partially imports files, or creates private content in the wrong workspace/teamspace.
- Export job includes inaccessible subpages, fails over to another format, exceeds mobile/browser limits, sends an email link to a disabled inbox, or expires before download.
- AI prompt references restricted content, connected-app permissions change during retrieval, provider times out, unsafe content is generated, or admin disables AI mid-session.
- Public page/template contains private data, copyrighted material, malware, abusive content, impersonation, or an external embed that changes after publication.
- Account deletion is requested by the last workspace admin, by a billing owner, during an export/import, with active integrations, with legal hold, or from a mobile flow that redirects to web.

## Test Plan

- Unit tests for page/block tree operations, block transforms, database schema/property validation, permission resolution, notification preference logic, idempotency keys, and privacy-safe analytics payload construction.
- Contract tests for every documented API route, including pagination, error codes, permission denials, version conflicts, sync cursors, upload states, export/import states, and billing webhooks.
- Integration tests for auth, workspace creation/join, sidebar load, page create/edit/delete/restore, block reorder, database item update, search, comments, sharing, notifications, and settings.
- Realtime tests for concurrent block edits, comments, presence, permission changes, database updates, duplicate events, stale cursors, reconnect, app foreground, and token refresh.
- Offline tests for page download, paid automatic downloads, database row subset limits, local page creation, unsupported blocks, queued edits, sync recovery, conflict resolution, corrupt cache, and low storage.
- Permission tests for owner/admin/member/guest/public roles, inherited access, teamspace defaults, page-level database rules, broadest-access wins, request access, public link expiration, and enterprise-disabled sharing/export.
- Import/export tests for supported formats, source auth revoked, partial imports, duplicate handling, PDF/HTML/Markdown/CSV outputs, comments/files inclusion, disabled export, expired links, and async email/inbox delivery.
- AI tests for permission-aware retrieval, workspace-only answer, connected-source answer, web-search confirmation, prompt-injection defense, unsafe prompt handling, provider timeout, feedback, admin disablement, and credit/usage limits.
- Billing tests for free, paid, trial, expired, canceled, refunded, platform-owned, web-owned, invoice-managed, education-eligible, AI-credit-exhausted, and unavailable plan states.
- Privacy/security tests for analytics redaction, file scanning, support redaction, audit logs, data export, account deletion, workspace deletion, integration revocation, public publishing report/takedown, and DLP hooks.
- Accessibility tests for dynamic type, screen-reader labels, editor/block controls, database views, drag/reorder alternatives, focus order, reduced motion, color contrast, and keyboard/external input on tablets.
- Manual verification tests: native iOS screenshots, native Android screenshots, mobile widget/shortcut behavior, signup/login, workspace creation, paid plan checkout/restore/cancel, realtime collaboration cursors, offline conflict behavior, AI Meeting Notes, imports/exports, push payloads, support chat, enterprise admin controls, API install/OAuth, data export, and account deletion.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing proprietary Notion assets, network traffic, private APIs, protected templates, private AI prompts, or brand copy.
- New and returning users can create or join a workspace, create pages, edit blocks, organize database items, search content, comment, share, and receive notifications.
- Pages, blocks, databases, comments, permissions, notifications, offline bundles, imports, exports, AI interactions, integrations, entitlements, and audit events have deterministic owners, lifecycle states, authorization rules, and deletion/export behavior.
- Mobile limitations are explicit and testable rather than assumed away; desktop/web-only actions have clear mobile fallback or blocker states.
- Offline reads/edits, sync recovery, conflict handling, permission changes, and downloaded database row limits have deterministic API contracts and acceptance tests.
- AI, import/export, file upload, public sharing, templates, and integrations are privacy-reviewed and launch-blocked unless permissions, retention, and provider constraints are implemented.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which V1 features are intentionally mobile-native versus desktop/web redirect: imports, workspace deletion/leaving, billing, security settings, and enterprise administration?
- Which AI provider and retrieval stack will back workspace chat, writing/editing, database autofill, meeting notes, image/PDF analysis, and web search?
- Will V1 support public publishing/sites/forms/mail/calendar/custom agents, or keep those as explicitly out-of-scope adjacent products?
- Which import sources and export formats are required for V1, and what fidelity guarantees are acceptable for nested pages, comments, files, and database properties?
- How will the clone price AI usage, automatic offline downloads, workspace member seats, advanced permissions, and enterprise controls without copying Notion plan names or prices?

## Build Plan

- Phase 1: scaffold app shell, auth, workspace creation/join, sidebar/home, page editor, block tree, basic comments, privacy-safe analytics, and core accessibility coverage.
- Phase 2: add databases with schemas, properties, views, filters/sorts, database item pages, templates, search, and deterministic permission checks.
- Phase 3: add sharing, guests, teamspaces, page-level database access, notifications/inbox, reminders, realtime collaboration, access requests, and conflict handling.
- Phase 4: add offline page downloads, automatic-download entitlement states, database row subset handling, local edit queue, sync reconciliation, and storage/corrupt-cache recovery.
- Phase 5: add file uploads, imports, exports, original template gallery, public sharing/publishing controls, report/takedown workflows, and legal/privacy review gates.
- Phase 6: add AI assistant, database autofill, meeting-note workflow, provider safety controls, AI admin settings, prompt-injection tests, and usage/credit limits.
- Phase 7: add billing, education/trial states, workspace admin/security, integrations/API install, audit logs, data export, account/workspace deletion, support tooling, and manual native verification.

## Next Steps

- Use this spec as the final top-ten architecture-teaching pattern before batch remediation of the remaining Draft 1 specs.
- Resolve the manual verification blockers before claiming one-for-one native, offline, AI, enterprise, billing, import/export, or API parity.
- Continue Phase 3 exact first-party source replacement for the remaining Draft 1 specs.
