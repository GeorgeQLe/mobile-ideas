# Indeed-Style Clone Spec

> Metadata
> - Inspiration app: Indeed
> - Category: Job search
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public employer policy pages.
> - Manual verification blockers: native iOS/Android screen capture, job-seeker account lifecycle, employer dashboard, resume upload/parse, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile job-search app inspired by Indeed: keyword/location search across aggregated job listings, resume upload and profile creation, one-tap apply, saved searches with alerts, employer company pages with reviews and salary signals, and a candidate application tracker.

The clone must not copy Indeed branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or scraped aggregator feeds. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a mobile-first job search with keyword, location, remote, and salary filters.
- Support resume upload, profile creation, and one-tap apply with original copy.
- Offer saved searches and alert cadences with push notifications.
- Surface employer pages with reviews, ratings, and disclosed salary bands.
- Keep job-seeker PII (resume, contact info) under strict visibility and retention controls.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build an Indeed-branded app or imply affiliation with Indeed/Recruit Holdings.
- Do not scrape Indeed, replay proprietary ranking, or reuse private APIs.
- Do not ship scraped employer datasets or unlicensed salary data.
- Do not expose resume/contact info to employers without explicit user submission.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/indeed-job-search/id309735670 | iOS listing, category, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.indeed.android.jobsearch | Android listing, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Indeed Help Center | https://support.indeed.com/hc/en-us | Account, resume, apply flows, alerts, employer controls | Source discovery — pending exact URL verification |
| Indeed Privacy Policy | https://www.indeed.com/legal | Data collection, retention, deletion, regional posture | Source discovery — pending exact URL verification |
| Indeed Terms | https://www.indeed.com/legal?hl=en#tos | Acceptable use, scraping, account termination | Source discovery — pending exact URL verification |
| Indeed Community Guidelines | https://www.indeed.com/legal/review-guidelines | Review authenticity, employer response rules | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding captures email, optional phone, location, desired role, and resume upload or inline builder.
- Search supports keyword, city/zip, remote-only toggle, salary filter (where disclosed), date-posted filter, and employer filter.
- One-tap apply uses stored resume snapshot and optional screening questions supplied by employer; off-site apply redirects open a warning.
- Saved searches generate daily/weekly alerts with unsubscribe controls.
- Employer pages aggregate reviews, ratings (overall, work-life, compensation), and disclosed salary bands for roles.
- Reviews require claimed work history or employer-domain email and enforce anonymity controls.
- Application tracker reflects submitted, viewed, contacted, declined states with self-reported updates.
- Contact info and resume visibility controlled per-application; user may redact PII from general searchable resume.

## Core User Journeys

- New user signs up, uploads a resume, sets desired role and location, and browses recommended jobs.
- User searches with filters, saves a search, enables daily alerts, and opens push notification to a job detail.
- User applies to a job with one-tap apply using stored resume and answers screening questions.
- User writes an employer review (anonymous, with role context) and rates work-life balance, compensation, and culture.
- User opens employer page to view reviews, salary bands, and related roles.
- User tracks submitted applications through pipeline states; receives employer message and responds in-app.
- User redacts phone and address from general resume and keeps them visible only on direct apply.
- User requests data export, blocks an employer from contacting them, and deletes account.
- User toggles off-site redirects with a warning and returns to the app without losing state.
- User reports a suspicious listing (scam/MLM) and sees acknowledgement.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning, OTP-pending | blocked region, fraud-flag |
| Onboarding | Role, location, resume upload | role, city, resume | incomplete, complete | resume parse fail, format unsupported |
| Search | Keyword, location, filters | query, filters | loaded, empty, loading | location denied, no matches |
| Job Detail | Role overview, apply button | tap apply, save | viewable, applied, closed, off-site | listing expired, employer suspended |
| Apply Flow | Resume confirm, screening questions | answers, upload | drafting, submitted | validation error, attachment fail |
| Saved Searches | Manage, unsubscribe | tap, toggle | none, saved, alert-enabled | alert delivery failure |
| Application Tracker | Pipeline | status updates | applied, viewed, contacted, declined | self-reported stale |
| Employer Page | Overview, reviews, salaries | tap role, tap review | loaded, followed | inactive employer |
| Review Composer | Post anonymous review | rating, text | drafting, submitted, moderation | policy block, duplicate |
| Messaging | Employer-candidate chat | text, attachment | connecting, delivered, read | blocked contact, quota |
| Settings | Privacy, resume visibility, alerts | toggles | loaded, saved | precise-location denied |
| Data & Account | Export, delete | confirmation | idle, pending, complete | blocked by open application |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Profile`: desired role, location preferences, remote preference, salary expectation, visibility settings.
- `Resume`: storage key, parsed structure (experience, education, skills), version history, retention policy.
- `JobListing`: employer, title, location, remote policy, seniority, salary range (optional), description, apply method, expiry.
- `Employer`: slug, verified-domain proof, aggregated rating, review count, admin roster.
- `Review`: employer, anonymized role context, ratings, text, moderation state, employer response.
- `SalaryReport`: role, employer, self-reported compensation, tenure bucket, anonymization checks.
- `Application`: user, listing, resume snapshot, screening answers, pipeline status.
- `SavedSearch` / `Alert`: query, filters, cadence, last run, push token.
- `Message`, `Conversation`: employer-candidate chat with moderation flags.
- `Block`, `SafetyReport`, `AuditEvent`: standard safety and audit records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile lifecycle.
- `POST /resumes`, `PUT /resumes/:id/content`, `DELETE /resumes/:id`: resume lifecycle with parse pipeline.
- `GET /jobs?query=&filters=&cursor=`: search with aggregated results.
- `GET /jobs/:id`: job detail.
- `POST /jobs/:id/apply`: one-tap apply with resume id and screening answers.
- `GET /applications`: application tracker.
- `POST /saved-searches`, `GET /saved-searches`, `DELETE /saved-searches/:id`: saved search CRUD.
- `GET /employers/:slug`, `GET /employers/:slug/reviews`, `GET /employers/:slug/salaries`: employer surfaces.
- `POST /reviews`, `POST /salary-reports`: user-generated data with anonymization.
- `GET /conversations`, `POST /conversations/:id/messages`: messaging.
- `POST /reports`, `POST /blocks`: safety actions.
- `POST /data-export`, `DELETE /account`: privacy workflows with audit events.

## Realtime, Push, And Offline Behavior

- Push alerts for saved-search matches bundled by cadence to avoid spam; payload excludes salary and employer identity when sensitive.
- Employer messages delivered over websocket/SSE with resume cursor; push payload redacts full message body.
- Cached last-N jobs available offline; apply actions queue with idempotency keys and sync on reconnect.
- Resume upload uses chunked resumable upload with virus/macro scan.
- Application submission is idempotent per job id to prevent duplicate submissions.
- Expired/closed listing reconciliation on next sync; locally cached listings flagged as stale.

## Permissions, Privacy, And Safety

- Resume content: only sent to employer upon explicit apply; never indexed by third parties; encryption at rest.
- Contact info (phone/address) redactable from general resume; visible only on submitted applications.
- Anonymous reviews protect role/tenure but enforce policy: no defamation, no PII of other individuals, no proprietary info.
- Employer claim requires domain verification before posting or responding to reviews.
- Scam/MLM detection: pattern-matching and user reports route to review queue; repeat offenders suspended.
- Salary data anonymization: suppress small cohorts (k-anonymity threshold) to prevent reidentification.
- Data minimization in analytics: no resume content, no message body, no salary figures linked to user id.
- Block employer: removes listings from alerts and search results for that user.
- Account deletion removes resume, PII, reviews (optionally preserved anonymized), and messaging history.

## Analytics And Monetization

- Track privacy-safe events: signup, resume uploaded/parsed, search run, filter used, job viewed, job saved, apply started/completed, alert delivered/opened, review posted, employer message received/sent.
- No raw resume content, message body, or review text in analytics.
- Monetization: free for candidates; employer-side paid plans for listing boosts, featured placement, and applicant tools with original plan names.
- Paywall applies to employer tier only; candidate side remains free.
- Server-side webhook reconciliation for employer billing; refund/chargeback flow.

## Edge Cases

- Resume upload with unsupported format or malformed PDF; graceful reparse attempt.
- Off-site apply that opens external URL; preserve local application-tracker stub.
- Scam listing reported mid-application; warn user, preserve evidence.
- Employer suspended while user has active conversation; graceful state and moderator note.
- Salary data suppression for under-populated role/location cohorts.
- Alert frequency overwhelms user; automatic backoff suggestion.
- Duplicate apply attempt via shared listing id on multiple boards; idempotency key.
- Review flagged by employer as defamatory; moderator review path, appeal flow.
- Data export with open conversations; redact other parties' PII.
- Account deletion while alerts active; cancel all push tokens.

## Test Plan

- Unit tests for search ranking stubs, idempotent apply, resume parse, alert cadence logic, salary anonymization thresholds.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for signup, resume upload, search, apply, saved-search alert delivery, application tracker updates.
- Resume-upload tests: format validation, size limits, virus/macro scan, chunked resume.
- Safety tests: scam reporting, defamation flag on reviews, block employer, salary suppression.
- Privacy tests: redact contact info, analytics redaction, data export, account deletion.
- Billing tests (employer side): listing purchase, refund, suspension.
- Offline and realtime tests: queued apply, message resume, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, color contrast.
- Manual verification tests: native iOS/Android screenshots, push payloads on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Indeed assets, private APIs, or trademarked feature names.
- Candidates can search, apply, track applications, and write employer reviews with original copy.
- Resume and contact info never leak to analytics or unintended employers.
- Salary data enforces k-anonymity and is sourced from opted-in user reports.
- Employer review moderation and scam-listing reporting are covered by tests.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which jurisdictions require disclosed pay ranges and how are listings gated?
- Will V1 include employer dashboards or only candidate-side experience?
- Which resume-parsing vendor is used, and what is the retention window?
- What is the k-anonymity threshold for salary cohorts?
- Will reviews allow employer responses in V1 or Phase 2?

## Build Plan

- Phase 1: auth, profile, resume upload/parse, job search, job detail, one-tap apply.
- Phase 2: saved searches, alerts, application tracker, push with redacted payloads.
- Phase 3: employer pages, reviews, salary reports with anonymization.
- Phase 4: messaging between candidate and verified employer.
- Phase 5: safety tooling, scam detection, block employer, data export, account deletion.
- Phase 6: employer monetization, listing boosts, webhook reconciliation.
- Phase 7: accessibility pass, manual native verification, regional compliance review.

## Next Steps

- Replace discovery URLs with verified first-party URLs before implementation kickoff.
- Engage legal for pay-transparency posture and review-defamation policy.
- Confirm resume-parsing vendor and salary-anonymization thresholds.
