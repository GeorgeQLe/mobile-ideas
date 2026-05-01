# ZipRecruiter-Style Clone Spec

> Metadata
> - Inspiration app: ZipRecruiter
> - Category: Job search and candidate matching
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, one-tap apply, candidate matching alerts, employer contact flows, privacy-choice exercise, and push notifications remain blocked; jobs owner, privacy owner, billing owner, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile app inspired by ZipRecruiter: candidate-employer matching, one-tap apply, recruiter chat, saved jobs, and an application tracker. The clone emphasizes a match-based job feed with swipe-like triage and bidirectional messaging between candidates and verified recruiters.

The clone must not copy ZipRecruiter branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary matching logic, private APIs, or scraped listings. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a candidate-facing mobile job feed with match-based ranking and triage UI.
- Support one-tap apply, saved jobs, and an application tracker.
- Enable recruiter-candidate chat with consent and moderation.
- Offer saved searches and push alerts with redacted payloads.
- Keep resume, contact info, and messaging content private to consenting parties.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a ZipRecruiter-branded app or imply affiliation.
- Do not scrape ZipRecruiter, replay proprietary matching logic, or reuse private APIs.
- Do not ship scraped job datasets or candidate databases.
- Do not expose candidate PII or resume to recruiters without explicit application consent.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/ziprecruiter-job-search/id541933937 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.ziprecruiter.android.release | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| ZipRecruiter FAQ | https://www.ziprecruiter.com/faq | Candidate and employer FAQ, matching, apply flows, alerts, and account controls | Verified 2026-05-01 |
| ZipRecruiter Privacy Policy | https://www.ziprecruiter.com/privacy | Data collection, retention, deletion, advertising, and privacy rights | Verified 2026-05-01 |
| ZipRecruiter Terms of Use | https://www.ziprecruiter.com/terms | Acceptable use, scraping restrictions, job-posting rules, and termination | Verified 2026-05-01 |
| ZipRecruiter California Privacy Notice | https://www.ziprecruiter.com/california-privacy-notice | California privacy disclosures and consumer rights | Verified 2026-05-01 |
| ZipRecruiter Privacy Choices | https://www.ziprecruiter.com/ccpa-opt-out | Opt-out and privacy-choice handling | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Candidate profile, matching, alerts, and one-tap apply requirements are verified from official store/legal/FAQ pages; match scoring remains inferred and must be original.
- Job aggregation and employer lead flows require source attribution, anti-scraping compliance, spam controls, and explicit candidate consent.
- Onboarding captures desired role, location, remote preference, salary expectation, and resume upload.
- Matching uses user-provided profile and resume to rank listings; no proprietary algorithm is replicated.
- Feed is a swipe-triage stack: interested/pass/save with one-tap apply on "interested".
- One-tap apply uses stored resume and answers to basic screening questions.
- Saved searches generate push alerts with configurable cadence.
- Recruiter chat is gated to recruiters who have viewed the candidate's application or where candidate initiates.
- Application tracker shows applied, viewed, contacted, declined, advanced states.
- Candidate visibility toggle controls whether verified recruiters can discover and invite-to-apply.

## Core User Journeys

- New user signs up, uploads resume, sets preferences, and enters match feed.
- User swipes through match feed; taps "interested" and completes one-tap apply.
- User saves a job for later review and returns to apply within session limit.
- User enables discovery and receives recruiter invite-to-apply; accepts or declines.
- Recruiter messages candidate through verified chat; candidate responds in-app.
- User sets saved-search alert with daily cadence and receives push notification.
- User tracks applications through pipeline states with self-reported outcomes.
- User blocks a recruiter or employer; block persists across reinstall.
- User reports a spam or scam listing; moderator reviews.
- User requests data export and account deletion; resume and messages cleared.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning | blocked region, fraud-flag |
| Onboarding | Role, location, salary, resume | fields, upload | incomplete, complete | resume parse fail |
| Match Feed | Swipe triage | swipe, tap apply | loaded, empty, throttled | location denied, no matches |
| Job Detail | Role overview, apply button | tap apply, save | viewable, applied, closed | listing expired |
| Apply Flow | Resume confirm, screening | answers, upload | drafting, submitted | validation error |
| Saved Jobs | Manage saved listings | tap, remove | none, saved | expired listing |
| Alerts | Saved-search management | toggles | none, active | delivery failure |
| Application Tracker | Pipeline | status updates | applied, viewed, contacted, declined, advanced | stale self-report |
| Chat | Recruiter-candidate messaging | text, attachment | connecting, delivered, read | blocked, quota |
| Discovery Settings | Visibility toggle | toggles | visible, hidden | regional restriction |
| Settings | Privacy, alerts, account | toggles, export | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | open chat blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Profile`: desired role, location, salary expectation, remote preference, visibility flag.
- `Resume`: storage key, parsed structure, version history, retention policy.
- `JobListing`: employer, title, location, seniority, salary range (optional), description, apply method, expiry.
- `Match`: user, listing, rank score, reason codes (opaque to client).
- `SwipeEvent`: user, listing, direction (interested/pass/save), timestamp.
- `Application`: user, listing, resume snapshot, screening answers, pipeline status.
- `SavedSearch` / `Alert`: query, filters, cadence, last run, push token.
- `Conversation`, `Message`: recruiter-candidate thread with moderation flags.
- `Recruiter`: verified employer admin identity with domain proof.
- `Block`, `SafetyReport`, `AuditEvent`: standard records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile lifecycle.
- `POST /resumes`, `PUT /resumes/:id/content`, `DELETE /resumes/:id`: resume lifecycle with parse.
- `GET /matches?cursor=`: match feed with cursor.
- `POST /swipes`: idempotent swipe event with direction.
- `POST /jobs/:id/apply`: one-tap apply with resume id and screening answers.
- `GET /applications`: application tracker.
- `POST /saved-searches`, `GET /saved-searches`, `DELETE /saved-searches/:id`: saved search CRUD.
- `GET /conversations`, `POST /conversations/:id/messages`: chat.
- `POST /recruiters/:id/invite-to-apply`: invite-to-apply (recruiter side).
- `POST /blocks`, `DELETE /blocks/:id`: block management.
- `POST /reports`: safety report.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Recruiter messages delivered over websocket/SSE; push payload redacts full body.
- New-match and saved-search alerts bundled by cadence.
- Cached recent match feed available offline; swipe events queue with idempotency keys.
- Resume upload uses chunked resumable upload with virus/macro scan.
- Application submission idempotent per job id to prevent duplicates.
- Expired listings reconciled on sync; in-flight swipes against expired listings rejected gracefully.

## Permissions, Privacy, And Safety

- Resume content only sent to employer upon explicit application; encrypted at rest.
- Candidate visibility flag controls whether verified recruiters can discover; default off.
- Precise contact info never shared until application submitted or candidate opts in during chat.
- Recruiter verification requires domain proof; revocation path when domain transfers.
- Spam and scam listing detection; repeat offenders suspended.
- Messaging moderation with rate limits and abuse classifier.
- Data minimization in analytics: no resume, no message body, no salary figures linked to user id.
- Block list persists across reinstall; blocked recruiter cannot contact.
- Account deletion clears resume, messages, profile, and applications.
- Minors: minimum age required; account creation gated.

## Analytics And Monetization

- Track privacy-safe events: signup, resume uploaded/parsed, swipe direction, apply started/completed, alert delivered/opened, chat message sent/received, block submitted, account deletion requested.
- No raw resume, message body, or salary figures in analytics.
- Monetization: free for candidates; employer-side paid tiers for listing placement and recruiting tools with original plan names.
- Paywall only for employer-side features; candidate UX remains free.
- Server-side webhook reconciliation for employer billing.

## Edge Cases

- Resume upload with unsupported format; graceful reparse.
- Match feed empty due to narrow preferences; prompt to widen filters.
- Listing expires mid-swipe; show graceful state.
- Recruiter violates messaging policy; suspension and candidate notification.
- Candidate swipes on already-applied listing; idempotent response.
- Alert cadence exceeded user's patience; automatic backoff suggestion.
- Recruiter invite-to-apply after candidate set visibility off; block delivery.
- Data export with open chat; redact other parties' PII.
- Account deletion with unread recruiter messages; confirmation prompt.
- Duplicate recruiter accounts for same employer; deduplication at verification time.

## Test Plan

- Unit tests for swipe idempotency, apply idempotency, match feed cursoring, visibility flag enforcement.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for signup, resume upload, match swipe/apply, saved-search alert, recruiter chat.
- Resume-upload tests: format validation, size limits, virus/macro scan.
- Safety tests: spam listing detection, recruiter abuse classifier, block persistence, recruiter verification.
- Privacy tests: resume visibility, analytics redaction, data export, account deletion.
- Billing tests (employer side): plan purchase, refund, suspension.
- Offline and realtime tests: queued swipes, message resume, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, reduced motion, color contrast.
- Manual verification tests: native iOS/Android screenshots, push payloads on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary ZipRecruiter assets, private APIs, or trademarked feature names.
- Candidates can match, apply, track, and chat with verified recruiters using original copy.
- Resume and contact info never leak to analytics or unintended recruiters.
- Recruiter verification and abuse classifier are covered by tests.
- Subscriptions (employer side) reconcile across platforms with server-side webhooks.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- What signals compose V1 match ranking without replicating proprietary logic?
- Will V1 include video/voice messaging in chat or defer?
- Which recruiter-verification vendor is used (domain DNS vs. email vs. both)?
- What retention window applies to declined applications and closed chats?
- Will V1 support employer-side dashboards or be candidate-only?

## Build Plan

- Phase 1: auth, profile, resume upload/parse, match feed, swipe triage, one-tap apply.
- Phase 2: application tracker, saved searches, alerts with redacted push payloads.
- Phase 3: recruiter verification, recruiter-candidate chat, invite-to-apply, visibility toggle.
- Phase 4: safety tooling, spam/scam detection, block, report, account deletion.
- Phase 5: employer-side monetization, listing placement, webhook reconciliation.
- Phase 6: accessibility pass, manual native verification, regional compliance review.
- Phase 7: analytics review and abuse-response tuning.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for recruiter verification, anti-spam, and listing-fraud posture.
- Confirm resume-parsing and recruiter-verification vendors.
