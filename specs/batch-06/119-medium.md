# Medium-Style Clone Spec

> Metadata
> - Inspiration app: Medium
> - Category: Long-form publishing and reading
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, membership purchase/restore, writer payout, publication management, content moderation appeal, reading-list sync, and push behavior remain blocked; publishing owner, billing owner, safety lead, payout owner, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile app inspired by Medium: long-form article feed, personalized recommendations, reactions, highlights/annotations, paywall with metered access, writer profiles, and a writer payout program. The product emphasizes readable typography, clean focus mode, and creator economics.

The clone must not copy Medium branding, trademarked feature names (e.g., "claps" rendered as generic "reactions"), screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or scraped article datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a ranked feed of long-form articles with personalization based on topics and follows.
- Support article reading with readable typography, reactions, highlights, and comments.
- Offer paywall with metered free access for non-subscribers.
- Enable writers to publish, edit, and monetize long-form content with payout tracking.
- Maintain anti-harassment, anti-misinformation, and writer safety controls.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Medium-branded app or imply affiliation.
- Do not scrape Medium, replay proprietary ranking, or reuse private APIs.
- Do not ship scraped article datasets or unlicensed media.
- Do not use the trademarked "clap" term; use generic "reaction" wording.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/medium/id828256236 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.medium.reader | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| Medium Help Center | https://help.medium.com/hc/en-us | Accounts, reading, writing, publications, partner program, subscriptions, and account controls | Verified 2026-05-01 |
| Medium Privacy Policy | https://policy.medium.com/medium-privacy-policy-f03bf92035c9 | Data collection, retention, deletion, personalization, and privacy rights | Verified 2026-05-01 |
| Medium Terms of Service | https://policy.medium.com/medium-terms-of-service-9db0094a1e0f | Acceptable use, user content, partner program, scraping limits, and account terms | Verified 2026-05-01 |
| Medium Rules | https://policy.medium.com/medium-rules-30e5502c4eb4 | Content rules, prohibited conduct, moderation, and enforcement | Verified 2026-05-01 |
| Medium Partner Program Help | https://help.medium.com/hc/en-us/categories/360001913473-Medium-Partner-Program | Writer monetization, eligibility, payouts, and tax-adjacent workflow | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Reading, writing, publications, memberships, partner-program monetization, and content rules are verified from official store/help/policy pages.
- Recommendation ranking, distribution boosts, and payout formula behavior remain inferred and must use original methodology.
- Feed personalization by followed topics, authors, and publications; freshness and diversity controls.
- Article reading with typography controls (font size, line height), focus mode, reactions, highlights, and inline comments.
- Paywall: non-subscribers get metered free reads per month; subscribers get unlimited; writer/publication exclusions supported.
- Writer editor with rich text, code blocks, images, and formatting; draft, schedule, and publish states.
- Writer payouts: reads by subscribers drive compensation; disclosure of methodology; payout via payment processor.
- Writer profiles show bio, following/follower counts, recent articles, and publications.
- Publications are multi-author surfaces with editor roles.
- Reading list and bookmarks sync across devices.

## Core User Journeys

- New user signs up, picks topics of interest, and lands on personalized feed.
- User reads article; meter decrements for non-subscribers; paywall appears when exhausted.
- User highlights a passage and leaves a reaction or inline comment.
- User bookmarks an article and reads offline later.
- Writer drafts article in editor, previews, and publishes to profile or a publication.
- Writer enrolls in payout program, completes KYC, and tracks earnings.
- User subscribes to unlimited reading; cancels/restores.
- User reports a harassing or misleading article; moderator reviews.
- User follows an author or publication and receives new-article notifications.
- User requests data export and account deletion; articles optionally preserved as anonymized author.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning | blocked region |
| Onboarding | Topics picker | tap topics | incomplete, complete | none |
| Feed | Personalized article list | scroll, tap | loaded, empty, offline | rank stale |
| Article Reader | Long-form reading | scroll, highlight, react | loaded, paywalled, offline | article removed |
| Highlights | User highlights manager | tap, delete | none, listed | sync conflict |
| Reactions | Article reactions | tap | accepted, throttled | quota exceeded |
| Comments | Inline article comments | text, reply | loaded, threaded | blocked author |
| Writer Editor | Draft/edit/publish | rich text, media | drafting, scheduled, published | autosave fail |
| Writer Dashboard | Stats, earnings | navigate | loaded, enrolled, not-enrolled | payout pending |
| Publications | Multi-author surface | submit, edit | draft, pending, published | editor rejected |
| Subscription | Plan selection, checkout | plan, payment | free, trial, paid, expired, canceled, restored | 3DS required |
| Settings/Privacy | Preferences, notifications | toggles | loaded, saved | none |
| Data & Account | Export, delete | confirmation | idle, pending, complete | active payout blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Profile`: display name, bio, photo, social links, follower/following counts.
- `Article`: author, title, body (rich), media, topics, publication, state (draft, scheduled, published, unlisted), paywall flag.
- `Revision`: article snapshot for edit history.
- `Highlight`: user, article, range, note, visibility.
- `Comment`, `Reaction`: engagement records with rate limits.
- `Bookmark` / `ReadingList`: user, article, saved_at.
- `Follow`: follower → target (user or publication) edge.
- `Publication`: multi-author surface with editor roles.
- `MeterState`: user, period, reads consumed, quota.
- `Entitlement`: subscription plan, platform, renewal state.
- `Payout`: writer, period, qualifying-reads metric, amount, processor reference.
- `SafetyReport`, `Block`, `AuditEvent`: standard records.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `POST /profile`, `PATCH /profile`, `GET /profile/:id`: profile lifecycle.
- `GET /feed?cursor=`: personalized feed.
- `GET /articles/:id`: article with paywall check.
- `POST /articles`, `PATCH /articles/:id`, `DELETE /articles/:id`: article lifecycle.
- `POST /articles/:id/reactions`, `POST /articles/:id/comments`, `POST /articles/:id/highlights`: engagement.
- `POST /bookmarks`, `DELETE /bookmarks/:id`: bookmark CRUD.
- `POST /follows/:target`, `DELETE /follows/:target`: follow/unfollow.
- `GET /publications/:slug`, `POST /publications/:slug/submit`: publication submissions.
- `GET /meter/state`: reader meter.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: subscription lifecycle.
- `POST /writers/enroll`, `GET /writers/payouts`: writer payout enrollment and history.
- `POST /reports`, `POST /blocks`: safety actions.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Bookmarked articles downloadable for offline reading; highlights sync on reconnect.
- New-article notifications for followed authors/publications delivered via push; payload redacts full body.
- Engagement actions (reaction, highlight, comment) queue offline with idempotency keys.
- Editor autosaves drafts continuously with conflict resolution (last-write-wins with history).
- Paywall state recomputed server-side; client cache invalidated on subscription change.
- Writer dashboard stats eventually consistent; reconciled daily.

## Permissions, Privacy, And Safety

- Reader privacy: reading history not shared publicly; used only for personalization unless opted in.
- Writer payout KYC required for enrollment; tax forms collected per jurisdiction.
- Harassment, hate, misinformation policy enforced via classifier + human moderation.
- Article takedown for copyright (DMCA-style), policy violations, or legal demand; appeal path.
- Highlights visible to the user by default; public highlights optional and moderated.
- Block list persists across reinstall; blocked user's articles hidden from feed.
- Minors: account creation gated by minimum age.
- Data minimization in analytics: no article body, no highlight text, no comment body, no reading history in analytics beyond bucketed metrics.
- Writer earnings disclosed to writer only; never exposed to other users.
- Account deletion purges private data; articles optionally preserved as anonymized author per writer choice.

## Analytics And Monetization

- Track privacy-safe events: signup, topic selected, article viewed, reaction, highlight, comment, bookmark, follow, subscription started/renewed/canceled/restored, writer enrolled, payout issued (bucketed amount).
- No article body, comment body, highlight text, or unbucketed payout amounts in analytics.
- Monetization: subscription for unlimited reading; writer payout program; original plan names and pricing.
- Paywall states identify blocked article, current entitlement, restore path, platform ownership, support path.
- Server-side webhook reconciliation for subscriptions and payouts.

## Edge Cases

- Meter bypass attempts via clearing cookies/reinstall; server-side tracking defeats basic bypass.
- Writer article shared externally then paywalled; graceful paywall on direct link.
- Publication rejects submission; writer notification and resubmission.
- Payout threshold not met; carry forward to next period.
- Chargeback on subscription; revoke entitlement with delay.
- Copyright DMCA takedown; article removed pending resolution.
- Highlight on revised article; anchor to original range or mark orphaned.
- Cross-device bookmark conflict; last-write-wins with history.
- Writer enrolled in payout but fails KYC; block payouts until resolved.
- Account deletion with pending payout; disburse or forfeit per policy.

## Test Plan

- Unit tests for meter math, paywall gating, highlight anchoring, bookmark sync, entitlement checks, payout calculation (stub).
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for read, react, highlight, comment, bookmark, follow, article publish, subscription purchase, payout enrollment.
- Editor tests: autosave, conflict resolution, media upload.
- Safety tests: harassment classifier, misinformation flag, DMCA takedown, block persistence.
- Privacy tests: reading-history visibility, analytics redaction, data export, account deletion, writer earnings privacy.
- Billing tests: subscription state transitions, webhook reconciliation, 3DS, chargeback, payout.
- Offline and realtime tests: offline reading, queued engagements, push payload redaction.
- Accessibility tests: dynamic type, typography controls, screen-reader labels, reduced motion, color contrast.
- Manual verification tests: native iOS/Android screenshots, subscription purchase/restore, push payloads on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Medium assets, private APIs, or trademarked feature names.
- Users can read, react, highlight, comment, bookmark, and subscribe with metered paywall.
- Writers can publish, edit, and enroll in payout program with KYC.
- Harassment, misinformation, and DMCA takedown flows covered by tests.
- Subscriptions reconcile across platforms with server-side webhooks.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which KYC and payouts vendors handle writer onboarding and disbursement?
- What payout formula is used (read-time weighted by subscriber vs. flat read count)?
- What is the meter quota (reads per period) for non-subscribers?
- Will V1 include audio narrations or only text articles?
- What retention window applies to deleted articles and writer earnings history?

## Build Plan

- Phase 1: auth, onboarding, feed, article reader with typography controls.
- Phase 2: reactions, highlights, comments, bookmarks, follow, new-article notifications.
- Phase 3: writer editor, publications, draft/schedule/publish, autosave.
- Phase 4: paywall meter, subscriptions with webhook reconciliation.
- Phase 5: writer payout program with KYC and disbursement.
- Phase 6: safety tooling, DMCA takedown, accessibility pass.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for DMCA, misinformation, and payout-KYC posture.
- Confirm payments processor, KYC vendor, and classifier targets for harassment/misinformation.
