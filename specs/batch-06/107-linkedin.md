# LinkedIn-Style Clone Spec

> Metadata
> - Inspiration app: LinkedIn
> - Category: Professional networking
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, premium purchase/restore, identity-verification challenge, recruiter/creator product gating, and push-notification behavior remain blocked; billing owner, safety/security lead, jobs owner, and accessibility owner must keep these behind acceptance-test blockers before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile professional-networking app inspired by LinkedIn's core jobs: identity-anchored profiles, a connection graph, a ranked feed of updates/articles, 1:1 messaging, job discovery and application, company pages, creator posts, and search across people, companies, and jobs. The app should emphasize verified identity, professional conduct, and discoverability while protecting sensitive workplace PII.

The clone must not copy LinkedIn branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or recruiter-only datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a mobile-first professional profile, connection graph, and ranked activity feed.
- Support 1:1 and small-group messaging with professional-tone safeguards.
- Offer job search, saved searches, one-tap apply with uploaded resume, and application tracking.
- Host company pages, employee affiliations, follow graph, and creator-style long-form posts.
- Keep identity, employment history, and contact-info controls prominent and privacy-preserving.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a LinkedIn-branded app or imply affiliation with Microsoft/LinkedIn.
- Do not scrape LinkedIn, replay proprietary ranking logic, or reuse private APIs or recruiter datasets.
- Do not ship scraped contact databases, resume caches, or email-harvesting flows.
- Do not expose precise contact info (email, phone) to non-connections without explicit consent.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040 | iOS listing, category, age rating, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.linkedin.android | Android listing, content rating, data safety, feature blurbs | Verified 2026-05-01 |
| LinkedIn Help Center | https://www.linkedin.com/help/linkedin | Profile, connections, messaging, jobs, premium, identity verification, and account controls | Verified 2026-05-01 |
| LinkedIn Privacy Policy | https://www.linkedin.com/legal/privacy-policy | Data collection, retention, deletion, contacts, advertising, and privacy rights | Verified 2026-05-01 |
| LinkedIn User Agreement | https://www.linkedin.com/legal/user-agreement | Acceptable use, scraping restrictions, account termination, and member obligations | Verified 2026-05-01 |
| LinkedIn Professional Community Policies | https://www.linkedin.com/legal/professional-community-policies | Authenticity, harassment, misinformation, scams, reporting, and safety moderation | Verified 2026-05-01 |
| LinkedIn Identity Verification Help | https://www.linkedin.com/help/linkedin/answer/a1359065 | Government ID/selfie verification partner flow and retention boundaries | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Identity verification and real-name challenge flows are verified from public LinkedIn help/legal material, while any vendor-specific review decisioning remains inferred and launch-blocked until a lawful account walkthrough.
- Jobs, profile, feed, and messaging requirements are verified from official store listings and help/legal pages; proprietary ranking, recruiter datasets, and Premium conversion logic must remain original.
- Onboarding captures real name, headline, location, current role, and optional profile photo; discourages anonymous handles.
- Profile supports experience, education, skills, endorsements, recommendations, certifications, and about section with original copy.
- Connection graph requires mutual acceptance; follows are asymmetric and apply to creators and companies.
- Feed shows posts, reshares, articles, and job suggestions from 1st/2nd-degree network and followed entities.
- Messaging is 1:1 or small group, gated by connection or paid-reach credits with recipient consent.
- Jobs module shows search, filters (location, remote, seniority, salary when disclosed), saved searches, alerts, and one-tap apply using stored resume.
- Company pages list headcount range (inferred), overview, posts, and employee follow count; never expose non-public employee rosters.
- Creator mode enables long-form posts, follower count visibility, and topic tagging.

## Core User Journeys

- New user installs, verifies email/phone, completes profile with experience/education, imports optional resume, and lands on feed.
- User searches for and sends connection request with optional note; recipient accepts/ignores/reports.
- User browses feed, reacts to a post with a professional-tone reaction, comments, and reshares with commentary.
- User publishes a long-form post or short update with optional media and topic tags.
- User searches jobs by keyword/location/remote, saves a search, enables alerts, and applies using stored resume with one-tap apply.
- User tracks applications in a pipeline (applied, viewed, in review, rejected, offered) with self-reported status.
- User follows a company page, receives updates, and visits employees-list filtered to 1st-degree connections only.
- User messages a connection, shares a file/link, and escalates a safety report on unprofessional content.
- User manages visibility: public profile, profile photo visibility, connection visibility, and contact-info sharing scope.
- User upgrades to premium-style tier for expanded search/applicant insights, then cancels/restores.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/phone verification | email, phone, password/OTP | new, returning, OTP-pending, auth-error | blocked region, fraud-flag, carrier block |
| Onboarding Profile | Name, headline, role, photo, resume import | name, role, company, photo | incomplete, complete, moderation-pending | photo rejected, name-policy violation |
| Feed | Ranked professional updates | scroll, react, comment, reshare | loaded, empty, offline, throttled | flagged content removed, post deleted |
| Post Composer | Publish update or article | text, media, topics, audience | drafting, scheduled, posted | media upload fail, policy block |
| Profile | View/edit identity, experience, skills | edit fields, add role | loaded, editing, viewing-other | restricted-by-privacy, blocked user |
| Connections/Network | Invites, suggestions, directory | accept, ignore, search | pending, accepted, blocked | spam-invite cooldown |
| Messaging | 1:1/group chat | text, attachment, reply | connecting, delivered, read, typing | blocked recipient, quota exceeded |
| Jobs Search | Keyword, filters, saved searches | query, filters | loaded, empty, saved-alert | precise location denied, no matches |
| Job Detail | Role overview, apply flow | apply, save, share | viewable, already-applied, closed | application withdrawn, job expired |
| Application Tracker | Pipeline of applied jobs | status, notes | applied, in-review, rejected, offered | self-reported stale |
| Company Page | Overview, posts, employees | follow, navigate | loaded, followed, unfollowed | inactive company |
| Settings/Privacy | Visibility, contacts, blocks | toggles, block list | loaded, saved | precise-location denied |
| Subscription | Plan selection, checkout, restore | plan, payment | free, paid, expired, canceled, restored | platform mismatch, webhook delay |

## Data Model

- `User`: account identity, email/phone, auth providers, locale, consent state, deletion/export state.
- `Profile`: real name, headline, about, location, industry, open-to-work flag, creator-mode flag, visibility settings.
- `Experience`: org, title, start/end, description, media; editable, redactable.
- `Education`, `Skill`, `Endorsement`, `Recommendation`, `Certification`: profile attachments with order and privacy scope.
- `Connection`: pair state (pending, accepted, withdrawn, blocked), direction, created_at.
- `Follow`: follower → target (user or company) asymmetric edge.
- `Post`: author, body, media, topics, audience scope, edit/delete state, moderation state.
- `Comment`, `Reaction`, `Reshare`: standard engagement records with rate limits.
- `Conversation`, `Message`: 1:1 or group threads, attachments, delivery/read receipts, moderation flags.
- `Company`: slug, overview, verified-domain proof, followers count, admin roster.
- `JobListing`: company, title, location, remote policy, seniority, salary range (optional), description, apply method.
- `Application`: user, job, resume snapshot, cover note, pipeline status, self-reported updates.
- `SavedSearch` / `JobAlert`: query, filters, cadence, last run, notification token.
- `Resume`: uploaded or profile-derived PDF, storage key, retention policy, version history.
- `SafetyReport`, `Block`, `AuditEvent`: standard safety and audit records.
- `Entitlement`: premium plan, platform, renewal state, paid-reach credit balance.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/phone auth with fraud checks.
- `POST /profile`, `PATCH /profile`, `GET /profile/:id`: profile lifecycle with audience scoping.
- `POST /profile/experience`, `PATCH /profile/experience/:id`, `DELETE /profile/experience/:id`: experience CRUD; parallel for education, skills, certifications.
- `POST /connections/:userId/invite`, `POST /connections/:userId/accept`, `DELETE /connections/:userId`: invite/accept/remove.
- `POST /follows/:entityId`, `DELETE /follows/:entityId`: follow/unfollow.
- `GET /feed?cursor=`: ranked feed with freshness cursor and reason codes.
- `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`: post lifecycle with audience scope.
- `POST /posts/:id/reactions`, `POST /posts/:id/comments`, `POST /posts/:id/reshare`: engagement.
- `GET /messages`, `POST /conversations`, `POST /conversations/:id/messages`: messaging with connection gating.
- `GET /jobs?query=&filters=&cursor=`: search with saved-search persistence.
- `POST /jobs/:id/apply`: one-tap apply with resume id and optional cover note.
- `GET /applications`: application tracker with pipeline state.
- `GET /companies/:slug`, `POST /companies/:slug/follow`: company page and follow.
- `POST /reports`, `POST /blocks`, `DELETE /blocks/:userId`: safety actions.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: subscription lifecycle.
- `POST /data-export`, `DELETE /account`: privacy workflows with audit events.

## Realtime, Push, And Offline Behavior

- Messages use websocket or SSE with resume cursor; push notification wakes the app without surfacing full message body by default.
- Connection invites, reactions, and comment notifications are debounced and bundled to avoid push spam.
- Feed and job search cache last N items for offline browse; engagement actions queue with idempotency keys.
- Resume uploads resume after interruption using chunked upload; failed uploads retry with backoff.
- Push payloads must exclude full message body, applicant contact info, or private-post content.
- Presence indicators are best-effort and suppressible via privacy setting.

## Permissions, Privacy, And Safety

- Identity controls: real-name policy with challenge flow; profile photo moderation for impersonation and NSFW.
- Contact info visibility: email/phone only shown to 1st-degree connections who have accepted; user controls granularity.
- Open-to-work and recruiter-visibility flags hide signal from current-employer domain when opted in.
- Messaging throttles and spam classifier to curb recruiter spam and phishing; report path with reason codes.
- Creator posts subject to professional-community policy: harassment, hate, impersonation, misleading claims.
- Sensitive PII (DOB, government IDs) never required and never shown to other users.
- Scraper defense: rate limits, request signing, and terms-of-service acceptance for any bulk export.
- Data minimization in analytics: no message body, no resume content, no precise location, no private-audience post body.
- Block list persists across reinstall; blocked users removed from search, suggestions, and mutual-connections view.
- Minors: account creation requires confirmed minimum age; limit public discoverability for under-18 profiles if allowed.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, profile completeness change, connection sent/accepted, post published, reaction/comment/reshare, job viewed, job saved, job applied, application status updated, message sent, subscription started/renewed/canceled/restored.
- No raw message text, resume content, or private-post body in analytics.
- Monetization tiers: free, premium subscriptions (career/business), and consumable paid-reach credits with original plan names and pricing.
- Paywall states must identify blocked feature, current entitlement, restore path, platform ownership, and support path.
- App-store and web subscriptions reconcile through server-side webhooks; entitlement cache revalidates on login, foreground, and webhook delivery.

## Edge Cases

- Name-policy violation (pseudonym or impersonation); challenge flow with optional ID check.
- Duplicate profile reconciliation when user signs up with different email/phone.
- Connection invite storm; cooldown and per-day caps.
- Job listing expires or is withdrawn while user is mid-apply; graceful blocked state.
- Resume upload with embedded macro or malformed PDF; sandboxed parse and reject.
- Salary disclosure varies by jurisdiction; surface only when provided by employer and legal.
- Company page claim disputes; domain-verification flow required.
- Premium subscription purchased on web but opened on iOS; reconciliation via webhook.
- Messaging quota exhausted; graceful prompt with no PII leak.
- Account deletion with pending applications; preserve anonymized analytic record, remove PII.

## Test Plan

- Unit tests for connection state machine, invite throttles, application pipeline, idempotent apply, entitlement checks.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for onboarding, connection/follow, post/react/comment/reshare, message send, job search/save/apply, application tracker updates.
- Resume-upload tests: format validation, size limits, virus/macro scan, chunked resume.
- Safety tests: impersonation report, harassment report, spam classifier, block persistence.
- Privacy tests: contact-info visibility, open-to-work hiding from current employer, analytics redaction, data export, account deletion.
- Billing tests: free/paid/expired/canceled/restored states across platforms, credit balances.
- Offline and realtime tests: queued engagements, message resume, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast, captions on video posts.
- Manual verification tests: native iOS/Android screenshots, subscription purchase/restore, push payloads on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary LinkedIn assets, private APIs, or trademarked feature names.
- New users can onboard, publish a profile, connect, post, message, and apply to a job with original copy and first-party infra.
- Contact-info visibility, open-to-work hiding, impersonation/harassment reports, and blocks are covered by tests.
- Subscriptions reconcile across platforms with server-side webhooks and refund/restore cases covered.
- Resume content, message body, and private-audience post body never leak to analytics or third parties.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which regional salary-disclosure laws apply (NY, CA, CO, EU pay transparency) and how to gate display?
- Will V1 include creator long-form articles or only short posts?
- Which identity-proof vendor (if any) is used for name-policy challenges?
- Will paid-reach messaging be purely credit-based or include free windows?
- What retention window applies to withdrawn applications and declined invites?

## Build Plan

- Phase 1: auth, onboarding, profile with experience/education/skills, search, feed read path.
- Phase 2: connection graph, invites, follows, basic post/react/comment/reshare.
- Phase 3: messaging, notifications, presence, push with payload redaction.
- Phase 4: jobs search, saved searches, alerts, one-tap apply, application tracker.
- Phase 5: company pages, creator mode, analytics, admin tooling.
- Phase 6: subscriptions, premium tiers, paywalls, webhook reconciliation.
- Phase 7: accessibility pass, manual native verification, safety tooling, regional compliance review.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for name-policy, salary-disclosure, and scraping-defense posture.
- Confirm identity-proof vendor and resume-parsing vendor selection.
