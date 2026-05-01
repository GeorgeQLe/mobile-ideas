# Hinge-Style Clone Spec

> Metadata
> - Inspiration app: Hinge
> - Category: Dating / prompt-based profiles
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public community-guidelines material.
> - Manual verification blockers: native iOS/Android screen capture, subscription purchase/restore, voice-prompt recording behavior, and push-notification behavior need a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample prompts, and moderation pipelines.

## Overview

Build an original mobile dating app inspired by Hinge's prompt-based profile pattern: onboarding with prompts, photos, and voice notes; discovery by scrolling profiles; like-with-comment on a specific prompt, photo, or voice clip; mutual-interest matches; standouts/featured queue; compatibility-based recommendation surface; and safety tooling.

The clone must not copy Hinge branding, trademarked feature names, screenshots, marketing copy, protected iconography, private APIs, or proprietary recommendation logic.

Any feature marked `Manual verification required` must ship behind a feature flag until hands-on verification confirms native behavior.

## Goals

- Provide a profile-first dating surface with prompts, photos, and voice notes; liking happens on a specific content piece and includes an optional comment.
- Offer a featured-profiles surface for higher-compatibility candidates with limited daily availability.
- Support compatibility-based recommendations using user-declared preferences (no opaque ranking claims).
- Keep privacy and safety prominent: age gate, block/report, unmatch, hidden-mode, NCII report, and harassment escalation.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for downstream implementation.

## Non-Goals

- Do not build a Hinge-branded app or imply affiliation with Match Group.
- Do not scrape Hinge or replay its private APIs; do not copy proprietary compatibility model.
- Do not ship dating for users under the platform minimum age or permit adult/explicit content.
- Do not expose precise location or raw profile data in analytics.
- Do not claim exact App Store/Play Store parity until manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/hinge-dating-relationships/id595287172 | iOS listing, category, age rating, privacy labels | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=co.hinge.app | Android listing, content rating, data safety | Verified 2026-05-01 |
| Hinge Help Center | https://hingeapp.zendesk.com/hc/en-us | Prompts, likes, matches, subscription tiers, verification | Verified 2026-05-01 |
| Hinge Safety Guidelines | https://hinge.co/safety | Safety features, reporting, community guidelines | Verified 2026-05-01 |
| Hinge Privacy Policy | https://hinge.co/privacy | Data collection, retention, deletion | Verified 2026-05-01 |
| Hinge Terms | https://hinge.co/terms | Age/access rules, subscription terms | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding collects phone auth, DOB (age gate), photos, up to N prompts chosen from a curated set, optional voice prompts, and attribute tags.
- Discovery surfaces full profiles one-at-a-time; user taps a specific piece of content (photo, prompt, voice) to like-with-comment or tap a generic like button.
- Likes-received queue shows inbound likes with the specific content that was liked; user selects send-back or dismiss.
- Featured-profiles queue refreshes daily and surfaces a limited set of higher-compatibility candidates.
- Photo verification grants a verified badge; ID verification optional higher tier.
- Video date / voice call inside match is optional Phase 2.
- Subscription state: free, trial, paid, expired, canceled, restored, web-managed, app-store-managed.

## Core User Journeys

- New user completes phone OTP, age gate, photos, prompts, voice prompt, and lands on discovery.
- User scrolls profile, taps a prompt answer, adds a comment, and sends like.
- User reviews inbound likes with content context and sends back or dismisses.
- User opens featured-profiles queue and likes a featured candidate.
- User matches, enters chat, sends first message referencing liked prompt.
- User completes photo verification and earns a badge.
- User reports a profile for harassment, NCII, or impersonation; report submits evidence.
- User upgrades, cancels, restores subscription.
- User enables hidden-mode / pause-discovery; profile excluded from stacks.
- User requests data export and account deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone OTP, age gate | phone, OTP, DOB | new, returning, auth-error | underage, region blocked |
| Onboarding | Photos, prompts, voice, attributes | photos, prompt selection, audio | incomplete, complete | prompt rejected, audio too long |
| Discovery | Profile feed | scroll, like-with-comment | loaded, empty, offline | rate limit, location denied |
| Inbound Likes | See who liked (with content) | tap like | empty, with likes, gated | subscription expired |
| Featured Queue | Daily featured candidates | tap to like | fresh, consumed, empty | queue not yet refreshed |
| Profile Detail | Full profile view | scroll, like, comment | loaded, verified badge | reported, deleted |
| Chat Thread | Messaging | text, voice, photo | connecting, delivered, read | message blocked |
| Verification | Photo verification | pose selfie | not started, pending, verified, failed | repeated failures |
| Preferences | Filters, prompts, attributes | toggles, selectors | loaded, saved | conflict with profile |
| Safety Center | Block list, resources | manage | baseline | verification failed |
| Subscription | Plan, checkout, restore | plan, payment | free, paid, expired, restored | platform mismatch |
| Report Flow | Report category, evidence | reason, text | drafting, submitted | NCII fast-path |
| Settings | Account, privacy, data export | navigation, toggles | loaded, signed-out | deletion pending |

## Data Model

- `User`: identity, phone, DOB, locale, region, age-gate decision, auth providers, deletion/export state.
- `Profile`: name, photos (ordered), prompts (prompt id + answer), voice prompt (audio key + transcript), attributes.
- `Prompt`: prompt id, curated question text, category, active state.
- `VoicePrompt`: audio storage key, duration, transcript, moderation decision.
- `Preferences`: distance, age, orientation, dealbreakers, showMe, hidden-mode.
- `Like`: sender, recipient, target (photo id / prompt id / voice id / generic), comment text, delivered state.
- `Match`: pair id, created timestamp, archived state, origin like.
- `Message`: match id, sender, content, safety classification, delivered/read.
- `FeaturedQueueEntry`: user, candidate id, surfaced_at, consumed state, daily cohort.
- `VerificationRecord`: user, pose-selfie key, decision, retention policy.
- `Entitlement`: plan key, platform, purchase id, trial/renewal/expiration/refund state, rose/priority balance.
- `SafetyReport`: reporter, reported, category, evidence, decision.
- `AuditEvent`: append-only changes to account, privacy, safety, billing, verification, hidden-mode.

## API And Backend Contracts

- `POST /auth/otp`, `POST /auth/verify`, `DELETE /auth/session`: phone OTP auth with age gate.
- `GET /prompts`: curated prompt library.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile CRUD.
- `POST /photos`, `PUT /photos/:id/content`, `DELETE /photos/:id`: photo upload with scans.
- `POST /voice-prompts`, `PUT /voice-prompts/:id/content`: voice upload with transcription + moderation.
- `GET /discovery/feed?cursor=`: profile feed.
- `POST /likes`: like-with-comment tied to target content.
- `GET /likes/inbound?cursor=`: inbound likes queue.
- `GET /featured?day=`: daily featured queue.
- `GET /matches`, `GET /matches/:id`, `DELETE /matches/:id`: match list/detail/unmatch.
- `GET /matches/:id/messages`, `POST /matches/:id/messages`: messaging.
- `POST /verification/photo`, `GET /verification/photo/:id`: verification lifecycle.
- `GET /settings/preferences`, `PATCH /settings/preferences`: filters, hidden-mode.
- `POST /reports`, `POST /blocks`, `DELETE /blocks/:userId`: safety.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: billing.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Messaging uses websocket with reconnect; push wakes on match and new message.
- Push payloads redact content by default; reference match/like by opaque id.
- Featured queue precomputed server-side daily; client fetches lazily.
- Likes and swipe actions queued offline with idempotency keys; server deduplicates.
- Voice prompts require server-side transcription before publishing; failed transcription blocks publish.
- Offline cache: recent matches, recent messages, prompt library, own profile. Evict on block/unmatch sync.

## Permissions, Privacy, And Safety

- Age gate launch-blocking with server-side DOB enforcement.
- Minors protection: photo age-estimation, hold-on-suspected, legal reporting.
- NCII fast-path with hashing and expedited takedown.
- Location stalking mitigation: distance bucketed, precise coordinates never exposed.
- Voice-prompt scanning: server-side transcription + abuse/slur classifier before publish; rejected prompts reviewed and user notified with reason.
- Biometric verification: pose-selfie encrypted, retention limited, regional compliance.
- Photo content policy: explicit/minors/weapons/hate auto-blocked or queued.
- Block/report/unmatch: one-tap, no notification to blocked party.
- Hidden-mode: exclusion from all queues except users already liked.
- Sensitive-message scanning: opt-in warning with reconsider dialog.
- Harassment escalation: repeat offenders shadow-limited, suspended, banned with appeal.

## Analytics And Monetization

- Events: onboarding, photo/voice upload, prompt selected, profile published, like sent (with target type), match, message sent, featured queue viewed/consumed, verification, block/report, subscription lifecycle, export/deletion.
- No raw content, DOB, orientation, biometric, or precise location in analytics.
- Monetization: free tier, subscription tiers, consumables (priority likes / roses).
- Paywall states identify blocked feature, entitlement, restore path, platform ownership, support.
- Server-side webhook reconciliation for all billing events.

## Edge Cases

- User has fewer than required prompts on migration; forced onboarding step.
- Voice prompt uploaded in unsupported codec or exceeds duration limit.
- Like-with-comment on content that the recipient later deleted; comment orphaned, show generic like.
- Featured queue refresh delayed due to timezone; client must show last-known cohort with stale flag.
- Reported user deletes account; evidence retained per policy.
- Subscription purchased on web, opened on iOS; restore after refund.
- Hidden-mode enabled but liked-users attempting contact.
- Data export requested with active matches; deletion with open report.
- Inbound-likes gating: subscription lapses mid-review; content masked on next refresh.
- Voice prompt containing a third party without consent.

## Test Plan

- Unit tests for like-target resolution, featured cohort selection, age gate, entitlement checks, voice moderation gating.
- Contract tests for all API routes; pagination; webhook idempotency; upload states.
- Integration tests: auth, onboarding, profile publish with voice, feed scroll, like-with-comment, inbound likes, featured queue, match, chat, verification, block/report, deletion.
- Photo and voice pipeline tests: NSFW, minors, slurs, transcription failures.
- Safety tests: harassment, NCII, minor, impersonation categories.
- Privacy tests: hidden-mode, precise-location off, data export, deletion, analytics redaction.
- Billing tests: free/paid/expired/canceled/refunded/restored/cross-platform, consumable balances.
- Realtime tests: push redaction, message resume, featured queue staleness.
- Accessibility tests: dynamic type, screen reader, captions for voice prompts, reduced motion.
- Manual verification: native screenshots, subscription purchase/restore, voice recording on device.

## Acceptance Criteria

- Downstream team can build V1 without proprietary Hinge assets or trademarked feature names.
- Prompt library, like-with-comment, inbound likes, featured queue, and verification covered by tests.
- Age gate, minors, NCII, block/report, hidden-mode covered by tests and safety center docs.
- Subscriptions reconcile across platforms with webhooks.
- Precise location, DOB, biometric, and raw content never leak to analytics or other users.
- Manual verification blockers resolved or remain launch-blocking flags.

## Open Questions

- Will voice prompts require transcription display to recipient or audio only?
- What daily cap applies to featured queue in free vs. paid tiers?
- Which regions restrict voice-clip moderation due to biometric-voice classification?
- Will ID verification be in V1 or Phase 2?
- Will in-match video be supported in V1?

## Build Plan

- Phase 1: auth/OTP, age gate, onboarding (photos + prompts), discovery feed, like-with-comment, match, basic chat.
- Phase 2: inbound likes queue, featured queue, preferences, hidden-mode, data export, deletion.
- Phase 3: voice prompts with transcription and moderation; photo verification.
- Phase 4: subscriptions, consumables, paywalls, webhook reconciliation.
- Phase 5: safety tooling: block/report/unmatch, NCII fast-path, sensitive-message scanning, appeal flow.
- Phase 6: accessibility, realtime hardening, manual verification, regional compliance.

## Next Steps

- Refresh exact first-party URLs before implementation kickoff.
- Engage trust & safety reviewer for minors/NCII/voice-moderation flows.
- Draft original prompt library with legal review.
