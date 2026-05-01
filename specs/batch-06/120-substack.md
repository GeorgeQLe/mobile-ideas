# Substack-Style Clone Spec

> Metadata
> - Inspiration app: Substack
> - Category: Newsletter publishing and subscriptions
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace pages, company help/support pages, public privacy/terms pages, and applicable public policy/community-safety pages.
> - Manual verification blockers: native iOS/Android screen capture, paid subscription purchase/restore, creator payout/KYC, video/audio playback, chat/livestream behavior, comments/notes timeline, and push behavior remain blocked; publishing owner, billing owner, payout owner, safety lead, and accessibility owner must gate these before parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, policy copy, and moderation pipelines.

## Overview

Build an original mobile app inspired by Substack: newsletter subscriptions, long-form and audio posts, paid tiers, subscriber-only comments, a short-form notes timeline, and creator-subscriber notifications. The product combines email-driven subscription semantics with a native reading and listening experience.

The clone must not copy Substack branding, trademarked feature names, screenshots, marketing copy, protected iconography, proprietary ranking logic, private APIs, or scraped newsletter datasets. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide newsletter subscription management with free and paid tiers.
- Support long-form posts, audio posts, and short-form notes in a unified timeline.
- Enable subscriber-only comments with moderation tools for creators.
- Offer creator payout with KYC, subscriptions, and tax compliance.
- Maintain harassment and misinformation safety controls.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Substack-branded app or imply affiliation.
- Do not scrape Substack, replay proprietary ranking, or reuse private APIs.
- Do not ship scraped newsletter datasets or unlicensed media.
- Do not handle raw card data; use PCI-compliant processor tokens.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/substack/id1491431594 | iOS listing, privacy labels, screenshots list | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.substack.app | Android listing, data safety, feature blurbs | Verified 2026-05-01 |
| Substack Support Center | https://support.substack.com/hc/en-us | Subscriptions, posts, notes, chat, video/audio, creator tools, and account controls | Verified 2026-05-01 |
| Substack Privacy Policy | https://substack.com/privacy | Data collection, retention, deletion, payments, and privacy rights | Verified 2026-05-01 |
| Substack Terms of Use | https://substack.com/tos | Acceptable use, subscriptions, creator obligations, scraping limits, and account terms | Verified 2026-05-01 |
| Substack Content Guidelines | https://substack.com/content | Prohibited content, moderation, and enforcement | Verified 2026-05-01 |
| Substack Publisher Agreement | https://substack.com/pa | Publisher monetization, payments, fees, and creator obligations | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Free/paid subscriptions, posts, notes, video/audio, chat/livestreams, and creator-support surfaces are verified from official store/support/legal pages.
- Recommendation ranking, creator payout timing, tax workflow, and private-community behavior remain inferred until lawful publisher testing.
- Subscribers manage newsletters they follow; free and paid tiers per publication.
- Publication posts include long-form articles, audio narrations/podcasts, and short-form notes.
- Notes timeline is a short-form feed distinct from long-form posts.
- Subscriber-only comments gated by tier with creator moderation tools.
- Paid-tier purchase via in-app purchase or processor hand-off (subject to app-store rules).
- Creator payout with KYC and tax-form collection; payout via processor.
- Email is the canonical delivery channel; app offers mirrored feed and push notifications.
- Recommendations surface creators followed by creators you follow (opt-in).

## Core User Journeys

- New user signs up, subscribes to free newsletters, and reads a post.
- User upgrades to paid tier for a specific newsletter; receives paid-only posts and comments access.
- User plays an audio post with background playback and lock-screen controls.
- User posts a short-form note; followers see it in timeline.
- Creator publishes a post to free or paid audience and watches delivery metrics.
- Creator moderates subscriber comments with block, delete, or hold-for-review actions.
- Creator enrolls in payout program, completes KYC, and tracks earnings.
- User manages subscriptions, pauses notifications, or cancels paid tier.
- User reports a harassing note or misleading post; moderator reviews.
- User requests data export and account deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, email/OTP | email, password/OTP | new, returning | blocked region |
| Onboarding | Topic/creator picks | tap | incomplete, complete | none |
| Subscriptions | Managed subscriptions list | tap, cancel | free, paid, canceled, paused | processor sync delay |
| Inbox/Feed | Mirrored posts timeline | scroll, tap | loaded, empty, offline | delivery delayed |
| Notes Timeline | Short-form notes | scroll, react, reply | loaded, empty | throttled |
| Post Reader | Long-form article | scroll, react, comment | loaded, paywalled, offline | post removed |
| Audio Player | Background audio playback | play, scrub, rate | playing, buffering, paused | network loss, offline |
| Comments | Subscriber-only comments | text, reply, react | open, gated, moderated | block, hold |
| Creator Composer | Post/audio/note editor | rich text, audio upload, audience | drafting, scheduled, published | autosave fail |
| Creator Dashboard | Stats, earnings | navigate | loaded, enrolled | payout pending |
| Settings | Notifications, account | toggles | loaded, saved | none |
| Data & Account | Export, delete | confirmation | idle, pending, complete | active payout blocks delete |

## Data Model

- `User`: identity, email/phone, locale, consent state, deletion/export state.
- `Publication`: creator, name, tiers (free, paid), description, branding (user-provided assets).
- `Subscription`: user, publication, tier, state (active, canceled, paused, past-due), processor reference.
- `Post`: publication, title, body (rich), audio ref, audience (free/paid), state (draft, scheduled, published), moderation state.
- `Note`: author, body, media, audience, moderation state.
- `Comment`: post/note, author, body, parent, moderation state.
- `AudioAsset`: storage key, duration, transcript ref.
- `CreatorPayout`: creator, period, gross, fees, net, processor reference, tax-form state.
- `SafetyReport`, `Block`, `AuditEvent`, `DataLicense`: standard records.
- `Entitlement`: subscription platform (in-app vs. web), renewal state.

## API And Backend Contracts

- `POST /auth/signup`, `POST /auth/verify`, `DELETE /auth/session`: email/OTP auth.
- `POST /publications`, `PATCH /publications/:slug`, `GET /publications/:slug`: publication lifecycle.
- `POST /subscriptions`, `DELETE /subscriptions/:id`, `PATCH /subscriptions/:id`: subscription lifecycle with paid-tier hand-off.
- `GET /inbox?cursor=`, `GET /notes?cursor=`: mirrored feed and notes timeline.
- `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`: post CRUD.
- `POST /notes`, `DELETE /notes/:id`: note CRUD.
- `POST /posts/:id/comments`, `DELETE /comments/:id`: comment CRUD.
- `POST /audio-assets`, `GET /audio-assets/:id`: audio upload and streaming.
- `GET /creator/dashboard`, `GET /creator/payouts`: creator metrics and payouts.
- `POST /creator/enroll`: payout enrollment with KYC.
- `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: billing.
- `POST /reports`, `POST /blocks`: safety actions.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- New-post notifications delivered via push; payload redacts full body; deep-link to reader.
- Notes timeline supports realtime updates when viewing; polling fallback on older clients.
- Audio posts stream with seek and background playback; offline download for paid subscribers.
- Engagement actions (comments, reactions) queue offline with idempotency keys.
- Creator composer autosaves drafts with conflict resolution.
- Subscription state revalidated on app foreground and after webhook delivery.

## Permissions, Privacy, And Safety

- Creator payout KYC required; tax-form collection per jurisdiction.
- Harassment, hate, and misinformation policy enforced via classifier + human moderation.
- Creator moderation tools: delete comment, block subscriber, hold-for-review, turn off comments per post.
- Paid-tier gating enforced server-side; client cache invalidated on subscription change.
- Email delivery privacy: subscribers' email addresses never exposed to other subscribers; creators see aggregate metrics not individual emails unless subscriber opted in.
- Minors: minimum age enforced; age-restricted posts respected.
- Data minimization in analytics: no post body, note body, comment body, or reading history in analytics beyond bucketed metrics.
- Creator earnings private to creator.
- Account deletion: purges personal data; subscriptions canceled; creator publications handled per creator preference (transfer, anonymize, or delete).
- Audio transcripts for accessibility available on all audio posts.

## Analytics And Monetization

- Track privacy-safe events: signup, subscription started/paused/canceled/restored, post read, audio played, note posted, comment posted, creator enrolled, payout issued (bucketed).
- No post/note/comment body, subscriber email, or unbucketed payout amounts in analytics.
- Monetization: paid subscriptions via processor; platform fee disclosed; creator payouts via payment processor.
- App-store and web subscriptions reconcile through server-side webhooks; entitlement cache revalidates on login, foreground, and webhook delivery.
- Paywall states identify blocked content, current entitlement, restore path, and platform ownership.

## Edge Cases

- Subscription purchased on web but opened on iOS; reconcile via webhook.
- Paid content shared externally; graceful paywall on direct link with preview.
- Creator suspended for policy violation; hold subscriber payments and notify with refund policy.
- Chargeback on subscription; revoke entitlement with grace window.
- Audio upload with copyright issue (DMCA); takedown and creator notification.
- Comment harassment; classifier + creator moderation + platform moderator escalation.
- Cross-device draft conflict; last-write-wins with history.
- Payout threshold not met; carry forward.
- Account deletion with active creator publication; creator chooses transfer/anonymize/delete path.
- Audio playback offline when subscription expired mid-stream; revalidate and pause.

## Test Plan

- Unit tests for subscription state machine, paywall gating, audio playback control, comment moderation actions, payout calculation (stub).
- Contract tests for all documented API routes with pagination, error codes, and webhook idempotency.
- Integration tests for signup, subscribe/unsubscribe, post read, audio play, note post, comment post, creator publish, creator enroll.
- Audio tests: background playback, lock-screen controls, offline download for paid, transcript generation.
- Safety tests: harassment classifier, DMCA takedown, creator moderation, block persistence.
- Privacy tests: email-address visibility, analytics redaction, data export, account deletion, creator earnings privacy.
- Billing tests: subscription state transitions across platforms, webhook reconciliation, 3DS, chargeback, creator payouts.
- Offline and realtime tests: offline reading, downloaded audio, queued engagements, push payload redaction.
- Accessibility tests: dynamic type, screen-reader labels, audio transcripts, reduced motion, color contrast.
- Manual verification tests: native iOS/Android screenshots, subscription purchase/restore, push payloads on device, audio on lock screen.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Substack assets, private APIs, or trademarked feature names.
- Users can subscribe (free and paid), read posts, play audio, post notes, and comment with subscriber gating.
- Creators can publish, moderate comments, and enroll in payouts with KYC.
- Harassment, DMCA, and creator-suspension flows covered by tests.
- Subscriptions reconcile across platforms with server-side webhooks and platform policy compliance.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which KYC and payouts vendors handle creator onboarding and disbursement?
- How are iOS/Android in-app purchase policies reconciled with web-originating subscriptions?
- What is the platform fee structure and creator payout schedule?
- Will V1 include video posts or only text and audio?
- What retention window applies to deleted publications and creator earnings history?

## Build Plan

- Phase 1: auth, onboarding, free subscriptions, inbox/feed, post reader.
- Phase 2: notes timeline, comments with moderation, reactions.
- Phase 3: audio posts with streaming, background playback, transcripts.
- Phase 4: paid-tier subscriptions with webhook reconciliation, paywall gating.
- Phase 5: creator composer, dashboard, payout enrollment with KYC.
- Phase 6: safety tooling, DMCA, harassment moderation, accessibility pass.
- Phase 7: manual native verification, regional compliance review.

## Next Steps

- Keep exact first-party source URLs current before implementation kickoff and refresh this spec if public store/help/legal pages materially change.
- Engage legal for creator-suspension, DMCA, and payout posture.
- Confirm payments processor, KYC vendor, and transcript-generation vendor.
