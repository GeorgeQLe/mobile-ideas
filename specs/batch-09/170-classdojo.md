# ClassDojo-Style Clone Spec

> Metadata
> - Inspiration app: ClassDojo
> - Category: School communication
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-02.
> - Verification basis: exact public marketplace pages, official ClassDojo help-center pages, and public privacy/terms/student-privacy pages.
> - Manual verification blockers: teacher/admin onboarding, school/district agreements, roster import, parent invite-code delivery, subscription purchase/restore, translations, and production push payloads require lawful test accounts before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, illustrations, avatars, sample classrooms, behavior labels, and media assets.

## Overview

Build an original mobile school-community app inspired by ClassDojo's public workflows: teacher-led classroom spaces, family messaging, class stories, student portfolios, feedback points, classroom tools, and optional school/district oversight. The V1 targets comparable jobs and safety posture using original product language, original visual assets, and privacy-first student-data handling.

The clone must not copy ClassDojo branding, mascot/monster artwork, point labels, classroom sample content, screenshots, marketing copy, private APIs, or proprietary moderation/translation behavior. Account-, district-, subscription-, and permission-gated behavior remains blocked until verified hands-on.

## Goals

- Support teacher, parent/guardian, student, school leader, and support/admin roles with sharply separated permissions.
- Let teachers create classrooms, invite families/students, post class updates, moderate comments, and archive classes.
- Provide family-teacher messaging with attachment controls, translation states, office-hour policies, and abuse reporting.
- Support student portfolio assignments, drafts, approvals, teacher feedback, and family visibility.
- Track classroom feedback points/skills while avoiding harmful ranking, public shaming, or behavioral profiling outside the classroom context.
- Provide privacy, safety, retention, export/delete, accessibility, and school-policy controls suitable for K-12 student data.

## Non-Goals

- Do not build a ClassDojo-branded app or imply endorsement, partnership, or compatibility.
- Do not reuse protected avatars, classroom monsters, illustrations, screenshots, feature names, marketing copy, or sample data.
- Do not target advertising to students, sell student data, or use classroom content for behavioral ads.
- Do not expose student profiles, messages, media, points, or portfolios outside authorized classroom/school audiences.
- Do not claim FERPA/COPPA compliance or exact district parity until legal review and hands-on school-account verification are complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/classdojo/id552602056 | Official iOS listing, category, age rating, privacy labels, in-app purchase indicator, public feature framing | Verified 2026-05-02 |
| Google Play | https://play.google.com/store/apps/details?id=com.classdojo.android | Official Android listing, teacher/family/student feature bullets, data safety, Families Policy indicator, device support | Verified 2026-05-02 |
| ClassDojo Help Center | https://help.classdojo.com/hc/en-us | Official support taxonomy for teachers, families, students, school leaders, account setup, messaging, stories, portfolios, and points | Verified 2026-05-02 |
| Student Account Help | https://help.classdojo.com/hc/en-us/articles/360031432991-What-Do-Students-See-When-They-Access-Their-Accounts | Student-facing points, class story, assigned activities, portfolio drafts/completions/approvals, and student account surface | Verified 2026-05-02 |
| ClassDojo Privacy Policy | https://www.classdojo.com/privacy/ | Public data-handling, rights, retention, and account privacy obligations | Verified 2026-05-02 |
| ClassDojo Terms | https://www.classdojo.com/terms/ | Account rules, service usage boundaries, and contractual posture | Verified 2026-05-02 |
| ClassDojo Student Privacy | https://www.classdojo.com/privacycenter/ | Student-privacy positioning, school/family data controls, and K-12 safety expectations | Verified 2026-05-02 |

## Detailed Design

### Source-Backed Product Requirements

- The public listings and help content describe a school communication product for teachers, parents, students, and school leaders across phones, tablets, computers, and classroom displays.
- Teacher onboarding must create a classroom, choose grade/subject metadata, add students, generate parent/student invitations, and show an empty-state checklist.
- Family onboarding must accept invite links/codes, claim one or more child profiles, choose notification language/channel, and support multiple children/classes.
- Student accounts must show active classes, point totals, assigned activities, class story, portfolio drafts, completed work, and teacher-approved portfolio items.
- Class story must support teacher-authored text/media posts, audience scoping, comments/reactions where enabled, post edits/deletes, and report flows.
- Messaging must support teacher-family conversations, attachment restrictions, translation states, read/delivery states, quiet hours, blocked contacts, and school/admin visibility where policy allows.
- Portfolio activities must support teacher-created prompts, student drafts, media/text/file responses, submission, teacher approval/return, comments, and family visibility.
- Feedback points must support positive/needs-work categories, teacher notes, per-student/per-class summaries, parent/student visibility rules, and configurable category sets.
- Classroom tools can include attendance, random/group picker, timer, noise meter-equivalent, calendar/events, and display-friendly modes, but all names/visuals must be original.
- School/district oversight must include roster/admin controls, staff management, policy settings, audit logs, and message/media retention controls behind verified institution agreements.
- Privacy center must expose data export, deletion requests, child profile management, notification controls, language controls, and school-policy contact paths.
- Premium/family subscription surfaces, if included, must use original packaging and must not pressure students or obscure free classroom communication.
- Push notifications must use generic payloads for student content by default and respect school quiet hours, family preferences, and per-child notification controls.
- Accessibility must cover dynamic type, screen readers, captions/alt text for class media where possible, reduced motion, contrast, and tablet/large-screen layouts.

## Core User Journeys

- Teacher signs up with school email, creates a class, adds students manually, and shares parent and student invite codes.
- Parent receives an invite, claims a child profile, chooses language and notification settings, and sees class story updates.
- Student signs in through an age-appropriate flow, views assigned activities, drafts a portfolio response, submits it, and waits for teacher approval.
- Teacher posts a photo/video class update, reviews audience/comment settings, publishes it, and parents receive a generic push notification.
- Parent sends a message to the teacher; the teacher reads it in the class inbox, uses translation, replies, and records a delivery/read state.
- Teacher awards feedback points to a student or group, optionally adds a private note, and views classroom trends without public ranking.
- Teacher assigns a portfolio activity, returns a submission for edits, approves the revision, and the parent views it in the child's portfolio.
- School leader joins through a verified school workspace, reviews class rosters, configures retention/reporting policies, and handles a reported post.
- Parent manages multiple children across classes and requests data export/delete through the policy-bound privacy center.
- Teacher archives the class at the end of term, preserving required records and removing active invite codes.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Role-aware entry and account creation | email, SSO, role, consent | new, returning, invite-linked | underage, blocked school, expired invite |
| Teacher Classroom Setup | Create class and roster | class name, grade, students | empty, importing, ready | duplicate students, roster failure |
| Family Invite Join | Claim child/class access | invite code/link, child relation | valid, pending approval | invalid code, custody conflict |
| Student Home | Student class and work surface | class select, activity select | active classes, no work | locked class, consent required |
| Class Story Feed | Classroom updates for families/students | post, comment, react, report | populated, empty, loading | offline, removed post, audience denied |
| Story Composer | Teacher post creation | text, media, audience, comments | draft, uploading, posted | media too large, consent blocked |
| Messages Inbox | Teacher-family conversations | search, thread select | unread, read, archived | off-hours, blocked, translation failed |
| Message Composer | Send text/attachments | body, file, language | draft, sending, sent | unsafe attachment, delivery failed |
| Portfolio Activities | Assigned and submitted work | create, start, submit, approve | assigned, draft, submitted, approved | returned, deleted activity |
| Feedback Points | Award and review skills | student/group, point category | awarded, adjusted, summary | admin-locked category, audit required |
| Classroom Tools | Attendance and classroom utilities | timer, groups, attendance | active, display mode | no roster, device permission denied |
| School Admin Console | Workspace oversight | staff, classes, policy, reports | configured, pending verification | unverified school, permission denied |
| Privacy Center | Export/delete and data controls | request, preference, child profile | idle, pending, complete | school-policy hold, identity recheck |
| Subscription/Entitlement | Optional family/school paid states | plan, restore, manage | free, trial, paid, expired | platform mismatch, refund |
| Support And Safety | Report and help workflows | report reason, message | submitted, in review, resolved | emergency misuse, abusive report |
| Settings | Account, notification, language | toggles, language, sign-out | loaded, saving | signed-out, sync conflict |

## Data Model

- `User`: account identity, role set, locale, region, age/consent state, auth providers, deletion/export state.
- `StudentProfile`: child display name, school roster ids, guardian links, consent flags, avatar reference to original clone-owned assets.
- `GuardianLink`: guardian user, student, relation, verified contact, access scope, custody/legal-hold flags.
- `SchoolWorkspace`: school/district identity, verified domain, admins, policy defaults, retention, export contacts.
- `Classroom`: teacher, school workspace, grade/subject metadata, roster, invite codes, archive state, policy overrides.
- `Membership`: user/student/classroom role, status, invite source, joined/left timestamps, notification scope.
- `StoryPost`: classroom, author, body, media refs, audience, comment policy, moderation state, edited/deleted timestamps.
- `StoryComment`: post, author, body, translation state, visibility, report/moderation state.
- `Conversation`: participants, classroom/student context, policy scope, office-hours state, archived/blocked status.
- `Message`: conversation, sender, body, attachments, translation pairs, delivery/read receipts, moderation flags.
- `PortfolioActivity`: classroom, prompt, instructions, due window, allowed response types, assigned students.
- `PortfolioEntry`: activity, student, content parts, draft/submitted/returned/approved state, teacher comments, family visibility.
- `FeedbackCategory`: classroom/school-owned label, polarity, icon/color using original assets, visibility rules, disabled state.
- `PointEvent`: student, classroom, category, value, note, awarded-by, adjusted-by, audit reason.
- `MediaAsset`: upload owner, storage key, MIME type, scan status, consent flags, retention policy, thumbnail refs.
- `Report`: target type/id, reporter, reason, severity, decision, escalation, evidence redaction state.
- `Entitlement`: plan key, purchaser, platform, renewal/expiration/refund state, feature limits.
- `PrivacyRequest`: export/delete/access request, requester identity, student scope, school-policy hold, fulfillment state.
- `AuditEvent`: append-only role, roster, message, media, point, policy, privacy, billing, and moderation changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`: role-aware auth with device session revocation.
- `POST /schools/verify`, `GET /schools/:id/policies`, `PATCH /schools/:id/policies`: verified school workspace and policy configuration.
- `POST /classrooms`, `PATCH /classrooms/:id`, `POST /classrooms/:id/archive`: classroom lifecycle with audit events.
- `POST /classrooms/:id/students`, `POST /classrooms/:id/roster-import`, `GET /classrooms/:id/roster`: roster management with duplicate handling.
- `POST /classrooms/:id/invites`, `POST /invites/:code/accept`, `DELETE /invites/:id`: family/student invite lifecycle.
- `GET /classrooms/:id/story`, `POST /classrooms/:id/story-posts`, `PATCH /story-posts/:id`, `DELETE /story-posts/:id`: class story feed and composer.
- `POST /story-posts/:id/comments`, `PATCH /story-comments/:id`, `DELETE /story-comments/:id`: comment lifecycle where enabled.
- `GET /conversations`, `POST /conversations`, `GET /conversations/:id/messages`, `POST /conversations/:id/messages`: scoped messaging with idempotency keys.
- `POST /messages/:id/translate`, `PATCH /conversations/:id/policy`, `POST /messages/:id/receipt`: translation, office-hours, and read/delivery states.
- `GET /portfolio/activities?classroom=`, `POST /portfolio/activities`, `POST /portfolio/entries`, `PATCH /portfolio/entries/:id`, `POST /portfolio/entries/:id/approve`: portfolio workflow.
- `GET /points/:studentId`, `POST /points`, `PATCH /points/:id`, `GET /classrooms/:id/feedback-summary`: feedback point ledger and summaries.
- `POST /uploads`, `PUT /uploads/:id/content`, `POST /uploads/:id/complete`: media upload with scanning, consent, and retention metadata.
- `POST /reports`, `POST /moderation/decisions`, `GET /admin/reports`: reporting and school/admin moderation.
- `GET /settings/privacy`, `PATCH /settings/privacy`, `POST /data-export`, `DELETE /account`, `DELETE /student-profiles/:id`: privacy workflows.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: optional paid states; server is entitlement source of truth.
- `POST /support/cases`, `GET /support/cases/:id`: support lifecycle with student-data redaction.

## Realtime, Push, And Offline Behavior

- Story, message, portfolio, and point updates use websocket/SSE where available with cursor-based reconnect and duplicate-event tolerance.
- Teacher story posts, messages, and portfolio drafts persist locally until upload/send succeeds; sensitive student content is encrypted at rest.
- Media uploads are resumable, scanned, and blocked from publication until complete and policy-permitted.
- Push notifications cover new story posts, messages, portfolio return/approval, class invites, policy/security changes, and export readiness.
- Push payloads must not include student names, message text, media thumbnails, point labels, or sensitive details unless a school/family policy explicitly permits richer previews.
- Offline mode supports reading cached class stories, portfolios, roster names needed for teaching, and drafts; no point or message mutation is final until server reconciliation.
- Translation failures show original text plus a retry/fallback state; translated content is not treated as authoritative where safety or legal meaning matters.

## Permissions, Privacy, And Safety

- FERPA-adjacent posture: classroom, roster, portfolio, media, message, and point data are scoped by school policy and never globally searchable.
- COPPA-style review is required for under-13 student accounts, direct student sign-in, portfolio sharing, push notifications, and analytics.
- No targeted ads to students, no sale of student data, no behavioral ad profiling, and no classroom content in marketing datasets.
- Parent/guardian access must support custody disputes, split households, revoked guardians, school-mediated access changes, and identity re-verification.
- Teachers can delete/hide posts, disable comments, block/limit messaging, configure office hours, and report abuse.
- School admins can review reports, manage staff/classes, set retention/export policies, and audit sensitive actions without broad raw-content access by default.
- Student-facing points must avoid public leaderboards, shame mechanics, durable behavioral labels, and cross-classroom profiling unless school policy explicitly approves.
- Media handling must include consent flags, deletion lifecycle, report retention, face/minor sensitivity review, malware scanning, and thumbnail redaction.
- Analytics must exclude message bodies, student names, raw media, portfolio content, private notes, point notes, and precise identifiers.
- Launch owners: education product lead, privacy/legal lead, child-safety lead, security lead, accessibility owner, and school-operations owner.

## Analytics And Monetization

- Track privacy-safe events only: class created, invite accepted, story post created, message sent, portfolio assigned/submitted/approved, point awarded, report submitted, export requested, entitlement changed.
- Events use opaque ids, role, platform, locale, feature area, and failure codes; never include message text, student content, media metadata beyond type/size, or point note bodies.
- Premium family or school plans may unlock original convenience features, storage, or admin tooling, but core classroom communication must remain accessible where promised.
- Paid surfaces must avoid student-directed upsell, must distinguish parent/family payer from school/district payer, and must include restore, refund, expired, and platform-owned states.

## Edge Cases

- Parent receives multiple invite codes for the same child and must merge or reject duplicate child profiles.
- Teacher leaves mid-year; school admin transfers or archives classes without losing required records.
- Student changes classes, schools, or guardians while portfolio and point history have retention obligations.
- Custody dispute restricts one guardian from seeing messages, media, location-like event details, or contact information.
- Class story post includes a student whose media consent is missing or revoked after publication.
- Translation changes meaning in a sensitive message; original text and audit metadata remain available.
- Student submits portfolio content offline, then teacher deletes the activity before sync.
- Point category is disabled by school policy after points have been awarded.
- Message is reported after deletion; moderation retains minimal evidence under policy.
- School admin requests export while parent requests deletion for the same student.
- Subscription expires while family-only premium content is cached.
- Device notification previews are enabled at OS level but school policy requires private payloads.
- Large class broadcast causes fan-out throttling and delayed delivery receipts.
- Accessibility setting changes during media composer or classroom display mode.

## Test Plan

- Unit tests for role permissions, guardian access, classroom lifecycle, invite code expiry, roster dedupe, point ledger adjustments, and policy inheritance.
- Contract tests for every documented route, including idempotency keys, pagination, permission errors, moderation decisions, and async privacy requests.
- Integration tests for teacher class setup, parent invite accept, student activity submission, story post publication, message send/translate, point award, and class archive.
- Privacy tests for cross-classroom isolation, guardian revocation, export/delete requests, analytics redaction, school-policy holds, and cached-content cleanup.
- Safety/moderation tests for abusive messages, reported media, removed posts, blocked conversations, emergency misuse copy, and admin audit logs.
- Media tests for unsupported files, malware scan fail, upload resume, consent-required publication, thumbnail generation, and deletion propagation.
- Offline/realtime tests for draft preservation, duplicate websocket events, reconnect cursors, delayed receipts, point conflict reconciliation, and failed translation retry.
- Billing tests if premium is enabled: free, trial, paid, expired, canceled, refunded, restored, family-payer, school-payer, and webhook duplicate states.
- Accessibility tests for screen-reader labels, focus order, dynamic type, reduced motion, color contrast, captions/alt text, tablet layout, and external keyboard navigation.
- Manual verification tests: teacher onboarding, parent/student invite flows, school admin workspace, push notification payloads, translation behavior, subscription purchase/restore, and class archive/export/delete on real accounts/devices.

## Acceptance Criteria

- Exact source links are verified and no source-discovery placeholders remain.
- A downstream team can build the V1 without proprietary ClassDojo assets, private APIs, screenshots, brand copy, or sample classroom data.
- Teacher, parent/guardian, student, and school/admin roles are enforced at API and UI layers.
- Classroom story, messaging, portfolio, feedback points, invites, and archive flows work end-to-end with deterministic failure states.
- Student data is scoped to classrooms/schools; guardian, media-consent, retention, export/delete, and audit workflows are covered by tests.
- Push, realtime, offline drafts, media upload, translation, moderation, and entitlement states have explicit contracts and regression tests.
- No student-directed ads or raw student content analytics exist in the V1.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which school/district verification model and roster import standards are in V1: manual upload, Clever/ClassLink-equivalent integrations, SIS CSV, or later?
- Which translation languages and providers are approved for student/family messages, and what retention applies to translated content?
- What premium surfaces, if any, belong in V1 without creating student-directed upsell?
- How should point data retention, reset, export, and deletion differ for teacher classroom use versus school/district oversight?
- What support process handles guardian disputes, student-data deletion conflicts, and school-policy holds?

## Build Plan

- Phase 1: implement auth, role model, classroom creation, roster, invite codes, parent/student joins, and school-policy baseline.
- Phase 2: build class story feed/composer, media upload/scanning, comments, generic push, and offline post drafts.
- Phase 3: add messaging, translation, receipts, office-hours policy, reports, and admin moderation.
- Phase 4: add student portfolio activities, submissions, approvals/returns, family visibility, and teacher feedback.
- Phase 5: add feedback point ledger, classroom tools, school admin workspace, audit logs, privacy center, export/delete workflows, and analytics redaction.
- Phase 6: add optional entitlement states, accessibility pass, legal/privacy/child-safety review, and hands-on native verification.

## Next Steps

- Resolve manual verification blockers with lawful teacher, parent, student, and school/admin test accounts before exact native parity claims.
- Select roster import, translation, media storage/scanning, push, and optional billing providers.
- Use this spec to update downstream scaffold repo docs only after the corresponding source-spec copy is refreshed.
