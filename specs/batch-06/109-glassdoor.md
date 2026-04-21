# Glassdoor-Style Clone Spec

> Metadata
> - Inspiration app: Glassdoor
> - Category: Jobs and employer reviews
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public community guidelines.
> - Manual verification blockers: native iOS/Android screen capture, anonymous review lifecycle, employer response workflow, interview-experience posting, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile app inspired by Glassdoor: anonymous employer reviews, salary reports, interview-experience posts, job listings, and employer responses. The product centers on protected-anonymity user contributions and aggregated employer insights, with a strong moderation layer to balance free expression and defamation risk.

The clone must not copy Glassdoor branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or scraped salary datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide anonymous employer reviews with role-level context and ratings (overall, compensation, culture, work-life).
- Aggregate self-reported salary and interview-experience data with strict anonymization.
- Surface job listings and allow saved searches and application handoff.
- Enable employer accounts (verified domain) to respond to reviews.
- Keep contributor anonymity robust against reidentification attacks.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Glassdoor-branded app or imply affiliation.
- Do not scrape Glassdoor, replay proprietary ranking, or reuse private APIs.
- Do not ship scraped employer or salary datasets.
- Do not expose any information that could deanonymize a reviewer (precise dates, unique role strings, small-cohort counts).
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/glassdoor-job-search/id589698942 | iOS listing, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.glassdoor.app | Android listing, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Glassdoor Help | https://help.glassdoor.com/s/ | Reviews, salaries, interviews, employer responses | Source discovery — pending exact URL verification |
| Glassdoor Privacy Policy | https://www.glassdoor.com/about/privacy.htm | Data collection, anonymity, retention | Source discovery — pending exact URL verification |
| Glassdoor Terms | https://www.glassdoor.com/about/terms.htm | Acceptable use, defamation, account termination | Source discovery — pending exact URL verification |
| Glassdoor Community Guidelines | https://www.glassdoor.com/about/communityGuidelines.htm | Review rules, prohibited content, moderation | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Users must have an account to post reviews; anonymity is protected at the display layer, not at the account layer.
- Each review requires role, tenure bucket (not precise dates), employer, and ratings on multiple axes.
- Salary reports require role, location (city-level), total comp components, and tenure bucket; suppressed when cohort is too small.
- Interview-experience posts capture role, difficulty rating, question summary, outcome, and interview format.
- Employer responses require verified employer account (domain-proof); responses are public and cannot edit reviewer content.
- Job listings are sourced from verified employer accounts or licensed feeds; users can save and apply via hand-off.
- Anonymization: display only aggregated and bucketed metadata; never show precise start/end dates or unique combinations.
- Moderation: community guidelines enforced with human review for defamation, PII, and policy violations.

## Core User Journeys

- New user signs up, reads reviews for a target employer, sees aggregated ratings and salary bands.
- User posts an anonymous review with ratings and prose; moderation queue may delay publication.
- User contributes a salary report and sees their role's band update once cohort threshold met.
- User posts an interview-experience with difficulty, format, questions summary, and outcome.
- Employer admin verifies domain ownership and publishes a response to a review.
- User searches jobs, saves a listing, and applies via handoff to employer portal.
- User is deanonymization-threatened via lawsuit/subpoena; legal process documented in privacy policy.
- User requests data export (including all contributions) and account deletion.
- User flags a review as defamatory or violating guidelines; moderation handles appeal.
- User toggles notifications for followed employers and receives new-review or new-response alerts.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning | blocked region, fraud-flag |
| Employer Search | Find employer | query | loaded, empty | ambiguous match |
| Employer Page | Aggregated ratings, reviews, salaries | tap review, tap salary | loaded, followed | suppressed data due to small cohort |
| Review Composer | Post anonymous review | ratings, prose, role, tenure | drafting, submitted, moderation | policy block, PII flagged |
| Salary Composer | Submit salary report | comp fields, role, location | drafting, submitted | cohort too small to display |
| Interview Composer | Post interview experience | difficulty, questions, outcome | drafting, submitted | policy block |
| Employer Response | Admin reply to review | prose | drafting, submitted | claim unverified |
| Jobs Search | Keyword, filters | query, filters | loaded, empty | location denied |
| Job Detail | Role overview, apply handoff | save, apply | viewable, applied, closed | handoff unavailable |
| Settings | Notifications, privacy | toggles | loaded, saved | verification revoked |
| Data & Account | Export, delete | confirmation | idle, pending, complete | blocked by open moderation |
| Moderation Queue | Contributor view status | status | pending, published, rejected | appeal in progress |

## Data Model

- `User`: identity, email, auth providers, locale, consent state, deletion/export state.
- `Employer`: slug, verified-domain proof, aggregated ratings, admin roster.
- `Review`: employer, role, tenure bucket, overall and axis ratings, pros/cons prose, moderation state, employer response id.
- `SalaryReport`: employer, role, location bucket, base/bonus/equity bands, tenure bucket, inclusion flag.
- `InterviewExperience`: employer, role, difficulty, format, questions summary, outcome, date bucket.
- `EmployerResponse`: review id, employer admin id, prose, moderation state.
- `JobListing`: employer, title, location, seniority, description, apply handoff URL.
- `SavedEmployer`, `SavedJob`: user follow/save edges.
- `Flag`: user-reported content flag with reason codes.
- `AuditEvent`: append-only record for moderation decisions, employer verifications, and deletions.
- `AnonymityToken`: per-contribution opaque id decoupled from user account id.
- `ModerationCase`: case id, content ref, reviewer, decision, appeal state.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `GET /employers/search?q=`, `GET /employers/:slug`: employer discovery.
- `POST /reviews`, `GET /employers/:slug/reviews?cursor=`: review lifecycle.
- `POST /salary-reports`, `GET /employers/:slug/salaries`: salary contribution and aggregation with k-anonymity.
- `POST /interviews`, `GET /employers/:slug/interviews`: interview-experience lifecycle.
- `POST /employer-claims`, `POST /employer-claims/:id/verify-domain`: employer verification.
- `POST /employer-responses/:reviewId`: employer response with moderation queue.
- `GET /jobs?query=&filters=&cursor=`: job search.
- `POST /jobs/:id/apply-handoff`: application handoff record.
- `POST /flags`, `GET /flags/:id`: content flag lifecycle.
- `POST /data-export`, `DELETE /account`: privacy workflows with audit events.
- `GET /moderation/cases/mine`: contributor-visible case status.

## Realtime, Push, And Offline Behavior

- New review, new salary, and employer response notifications for followed employers delivered via push; payload redacts full body.
- Moderation decisions trigger push to contributor (approved/rejected with reason code); offline queue handled on reconnect.
- Job listing freshness refreshed on open; cached list available offline.
- Submission uses idempotency keys to prevent duplicate reviews/salary reports.
- Employer verification proofs (DNS TXT, email) verified via async polling.
- No realtime messaging feature in V1; all contributor-employer interaction is mediated through public responses.

## Permissions, Privacy, And Safety

- Anonymity layer: display name and account id decoupled from contribution via anonymity token; admin tooling requires audit event for deanonymization.
- Salary suppression: k-anonymity threshold (e.g., k>=5) before a cohort is visible; threshold configurable per region.
- PII filter: automated scan to remove names, phone numbers, emails, and identifiable details from prose before publication.
- Defamation defense: clear community guidelines, report and appeal path, documented legal-process response.
- Employer claim fraud: domain verification via DNS TXT or employer-domain email; revocation path when domain transfers.
- Moderator access logged; no bulk export of contributor identity without legal basis.
- Deletion: user can delete contributions; employer aggregate rollups recompute without losing historical cohort metadata.
- Data export includes contributions with original anonymity preserved in output.
- Minors: minimum age required; account creation gated.
- Regional compliance: GDPR/CCPA data export and deletion respected.

## Analytics And Monetization

- Track privacy-safe events: signup, employer searched, review started/submitted/published, salary submitted/published, interview submitted, employer response published, flag submitted, data export requested, account deletion requested.
- No raw review/salary/interview prose, no identifiable salary figures linked to user id in analytics.
- Monetization: free for contributors; employer-side paid tiers for enhanced pages, recruiting, and analytics with original plan names.
- Paywall only for employer-side features; contributor UX remains free.
- Server-side webhook reconciliation for employer billing.

## Edge Cases

- Review contains identifiable PII; PII filter redacts or rejects.
- Cohort too small to display salary; show "insufficient data" placeholder.
- Employer disputes review as defamatory; moderation case and appeal path.
- Employer domain transfers to new owner; revoke prior admins and require re-verification.
- Mass-review spam/astroturfing; velocity limits and pattern detection.
- Legal subpoena for contributor identity; documented counsel-reviewed process.
- Duplicate reviews from same user for same employer; allow only N-per-period with disclosed rule.
- User deletes account with active moderation case; preserve anonymized case record.
- Job listing links out to employer site; preserve handoff telemetry without user PII.
- Regional data-residency requirement; route data to compliant region.

## Test Plan

- Unit tests for anonymity token generation, k-anonymity salary suppression, PII filter, rating aggregation.
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for review/salary/interview submission, moderation decision flow, employer verification.
- Anonymity tests: ensure contribution payloads cannot be linked to user id without audit event.
- Safety tests: PII detection, spam detection, defamation appeal flow, employer claim fraud.
- Privacy tests: data export redaction, account deletion, moderator access audit.
- Billing tests (employer side): plan purchase, refund, suspension.
- Offline and realtime tests: queued submissions, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, color contrast.
- Manual verification tests: native iOS/Android screenshots, push payloads on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Glassdoor assets, private APIs, or trademarked feature names.
- Contributors can post reviews, salaries, and interviews anonymously with PII protection.
- Salary k-anonymity and PII filtering are covered by tests.
- Employer verification requires domain proof; responses are moderated.
- Legal-process response is documented and does not leak contributor identity beyond lawful order.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which k-anonymity threshold applies globally, and which regions require a higher bar?
- Will V1 include photo uploads in reviews (office photos) or defer?
- Which vendor provides PII scanning for user-submitted prose?
- What retention window applies to rejected moderation cases and appeals?
- How are legal-process deanonymization requests authenticated?

## Build Plan

- Phase 1: auth, employer search, review composer, moderation queue, aggregated ratings display.
- Phase 2: salary contribution with k-anonymity, interview experiences, contributor-visible case status.
- Phase 3: employer verification, employer responses, moderator tooling.
- Phase 4: job listings, saved employer follow, notification push with redacted payloads.
- Phase 5: data export, account deletion, regional compliance review.
- Phase 6: employer-side paid features, billing webhooks.
- Phase 7: accessibility pass, manual native verification, legal-process playbook.

## Next Steps

- Replace discovery URLs with verified first-party URLs before implementation kickoff.
- Engage legal counsel for defamation, deanonymization, and legal-process posture.
- Confirm PII scanning vendor and k-anonymity thresholds.
