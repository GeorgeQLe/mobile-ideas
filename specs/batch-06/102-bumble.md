# Bumble-Style Clone Spec

> Metadata
> - Inspiration app: Bumble
> - Category: Dating / women-first messaging
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, and public community-guidelines material.
> - Manual verification blockers: native iOS/Android screen capture, subscription purchase/restore, video chat behavior on device, photo/ID verification handoff, and push-notification behavior need a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, and moderation pipelines.

## Overview

Build an original mobile dating app inspired by Bumble's women-first messaging pattern: onboarding with photos/prompts/badges, swipe discovery, a 24-hour match window where the woman-identified user must message first in hetero matches, video/voice chat, verified profiles, and mode-switching between dating, friends, and professional networking surfaces.

The clone must not copy Bumble branding, trademarked mode names (e.g., use "friends mode" and "bizz mode" generic names), screenshots, marketing copy, protected iconography, private APIs, or proprietary moderation logic.

Any feature marked `Manual verification required` must ship behind a feature flag until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a mobile-first dating experience with a 24-hour first-message window (configurable per orientation) and an extend-match option.
- Support mode switching between dating, friendship, and professional networking profiles with separate discovery stacks.
- Offer verified profiles (photo verification), video/voice chat inside matches, and safety badges.
- Keep privacy and safety prominent: block/report, unmatch, hidden-mode, NCII report, and women-first moderation policies.
- Support subscription state without copying proprietary plan names or pricing.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Bumble-branded app or imply affiliation with Bumble Inc.
- Do not reuse trademarked mode names, protected taglines, or brand iconography.
- Do not scrape Bumble, replay private APIs, or reuse proprietary recommendation logic.
- Do not ship dating for users under the platform minimum age or allow adult/explicit content.
- Do not claim exact App Store or Play Store parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/bumble-dating-app-meet-date/id930441707 | iOS listing, category, age rating, privacy labels, screenshots list | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.bumble.app | Android listing, content rating, data safety, feature blurbs | Source discovery — pending exact URL verification |
| Bumble Help Center | https://bumble.com/help | Matching, 24-hour window, extend, verification, modes, subscription tiers | Source discovery — pending exact URL verification |
| Bumble Safety Center | https://bumble.com/en/the-buzz/safety | Safety features, verification, reporting, community guidelines | Source discovery — pending exact URL verification |
| Bumble Privacy Policy | https://bumble.com/en/privacy | Data collection, location handling, retention, deletion | Source discovery — pending exact URL verification |
| Bumble Terms | https://bumble.com/en/terms | Age/access rules, prohibited conduct, subscription terms | Source discovery — pending exact URL verification |
| Bumble Community Guidelines | https://bumble.com/en/guidelines | Banned content, body-shaming, misogyny policy | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding captures phone auth, DOB (age gate), photos, prompts, badges (e.g., zodiac, politics, pets) with original labeling.
- Users pick a mode: dating, friendship, or professional networking. Each mode has a separate profile surface, discovery stack, and messaging rules.
- In dating hetero matches, the woman-identified user has 24 hours to send the first message or the match expires. Same-gender or non-binary matches have either user able to start, with a 24-hour window.
- Matches can be extended once (free or paid) to grant an additional 24-hour window; after expiration, match is archived.
- Profiles can display a verified badge after a pose-selfie photo verification pass.
- In-match video/voice calls are supported without exchanging phone numbers; calls are initiated from the chat thread.
- Professional-networking mode disallows romantic imagery and enforces profession/role fields.
- Subscription state includes free, trial, paid, expired, canceled, restored, web-managed, and app-store-managed states.

## Core User Journeys

- New user installs, verifies phone, completes age gate, picks mode, adds photos/prompts/badges, and lands on the discovery stack.
- User swipes, matches, and sees a countdown timer; the first-move user sends a message before expiration.
- User extends a match once to add 24 hours; receiver decides whether to respond.
- User starts an in-match voice or video call with consent confirmation on both sides.
- User switches mode from dating to friendship and sees a distinct profile, filter set, and conversation surface.
- User completes photo verification to earn a verified badge.
- User reports, blocks, or unmatches a connection; report submits with reason, evidence, and optional screenshot.
- User upgrades, cancels, restores purchase; entitlements reconcile across platforms.
- User enables hidden-mode to pause discovery; profile disappears from all stacks.
- User requests data export and account deletion from settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone OTP, age gate | phone, OTP, DOB | new, returning, OTP-pending, auth-error | underage, region blocked, carrier block |
| Mode Picker | Choose dating, friends, or pro | mode selection | new, switching | mode unavailable in region |
| Onboarding Profile | Photos, prompts, badges | photos, text, selectors | incomplete, complete | photo rejected, underage |
| Discovery Stack | Card-stack triage | swipe, tap | loaded, empty, offline | rate limit, location denied |
| Match Queue | Active matches with timers | tap match | with timer, extended, expired | expired before read |
| Chat Thread | Messaging + video/voice | text, call | connecting, active call, ended | call rejected, message blocked |
| Verification | Photo verification flow | pose selfie | not started, pending, verified, failed | repeated failures throttled |
| Settings/Preferences | Filters, hidden-mode, notifications | toggles | loaded, saved | location precise denied |
| Safety Center | Block list, verification, resources | manage | baseline, verified | verification failed |
| Subscription | Plan, checkout, restore | plan, payment | free, paid, expired, restored | platform mismatch, webhook delay |
| Report Flow | Report category, evidence | reason, text, screenshot | drafting, submitted | NCII fast-path |
| Mode Switch | Swap active mode | confirm | switching, completed | profile fields missing in target mode |

## Data Model

- `User`: identity, phone, DOB, locale, region, age-gate decision, auth providers, deletion/export state.
- `ModeProfile`: mode key (dating/friends/pro), display name, photos, prompts, badges, role/profession fields, visibility.
- `Preferences`: distance, age range, orientation, showMe, hidden-mode, mode-specific filters.
- `SwipeEvent`: swiper, swipee, mode, direction, timestamp.
- `Match`: pair id, mode, first-move user, expires_at, extended_once flag, archived state.
- `Message`: match id, sender, content parts, safety classification, delivered/read, retracted.
- `CallSession`: match id, initiator, type (voice/video), consent state, duration, interrupted state.
- `VerificationRecord`: user, pose-selfie key, decision, retention policy.
- `Photo`: storage key, order, scan results, moderation decision.
- `Entitlement`: plan key, platform, purchase id, trial/renewal/expiration/refund state, extension credits.
- `SafetyReport`: reporter, reported, category, evidence, decision, escalation state.
- `AuditEvent`: append-only changes to account, privacy, safety, billing, mode, and verification.

## API And Backend Contracts

- `POST /auth/otp`, `POST /auth/verify`, `DELETE /auth/session`: phone OTP auth with age gate.
- `POST /modes/:mode/profile`, `PATCH /modes/:mode/profile`, `GET /modes/:mode/profile`: mode-specific profile CRUD.
- `POST /photos`, `PUT /photos/:id/content`, `DELETE /photos/:id`: photo upload with scans.
- `GET /discovery/:mode/stack?cursor=`: mode-specific discovery.
- `POST /swipes`: idempotent swipe with mode and direction.
- `GET /matches?mode=&cursor=`, `GET /matches/:id`: match list and detail with countdown.
- `POST /matches/:id/extend`: consume extend credit.
- `DELETE /matches/:id`: unmatch.
- `POST /matches/:id/messages`, `GET /matches/:id/messages`: messaging with first-move rule enforcement server-side.
- `POST /matches/:id/call`, `PATCH /calls/:id`: initiate/accept/reject call with consent.
- `POST /verification/photo`, `GET /verification/photo/:id`: pose-selfie verification.
- `GET /settings/preferences`, `PATCH /settings/preferences`: filters, hidden-mode, notifications.
- `POST /reports`, `POST /blocks`, `DELETE /blocks/:userId`: safety workflows.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: billing.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Match countdown is server-authoritative; client renders time-remaining from server expires_at to avoid drift.
- Messaging and calls use websocket signaling with reconnect; push wakes app for new match or expiring-soon reminders.
- Push payloads must redact message body and match photos by default; expiring-soon reminders reference match by opaque id.
- Swipes queued offline and reconciled on reconnect with idempotency keys.
- First-move rule enforced server-side: server rejects message-send from non-first-move user until other party messages first.
- Call signaling must handle network drop, app backgrounding, and interrupted audio route.
- Mode switch evicts cached discovery stack and reloads preferences for new mode.

## Permissions, Privacy, And Safety

- Age gate is launch-blocking with server-side DOB enforcement and attempt logging.
- Minors protection: age-estimation on photos, mandatory hold on minors-suspected accounts, legal reporting pipeline.
- NCII report fast-path with hashing and expedited takedown.
- Doxxing/location-stalking mitigation: distance bucketed, precise coordinates never exposed, no workplace/school name exposure without opt-in.
- Biometric handling: pose-selfie encrypted, retention to decision window, never shown to other users, regional disclosures.
- Photo content policy: explicit/minor/weapon/hate imagery auto-blocked; professional-mode disallows romantic imagery.
- Block/report/unmatch: one-tap, do not notify blocked party, persist across reinstall.
- Hidden-mode: full exclusion from discovery stacks, surfaces only to users already liked.
- Sensitive-message scanning: opt-in warning for harassment/explicit content with reconsider dialog.
- Harassment escalation: repeat offenders shadow-limited, suspended, or banned with appeal path.
- Women-first policy enforcement must be configurable per orientation and logged for audit.

## Analytics And Monetization

- Privacy-safe events: onboarding, mode switch, profile publish, swipe, match, first-move sent, match extended, call initiated/ended, verification submitted/approved, block/report, subscription lifecycle, export/deletion.
- No raw content, DOB, precise location, biometric data, or orientation identifiers in analytics.
- Monetization: free tier, standard subscription, premium subscription, consumables (extends, priority-likes, boosts) with original copy.
- Paywall states identify blocked feature, entitlement, restore path, platform ownership, and support path.
- Server-side webhook reconciliation for app-store and web subscriptions with refund/restore coverage.

## Edge Cases

- Match created at 11:59pm local; timer crosses midnight and DST boundary.
- Extend purchased after match expired; server rejects and refunds credit.
- Video call from a match where one party revoked camera permission mid-call.
- Mode-switch mid-session with pending swipes in prior mode; reconciliation required.
- Reported user deletes account mid-investigation; evidence preserved.
- First-move user never responds; match archives automatically with notification opt-in.
- Hidden-mode enabled but liked-users attempting contact; behavior must match documented spec.
- Subscription purchased on web but opened on iOS; restore after refund.
- Data export requested with active matches; account deletion with open report.
- Professional mode message with romantic content; auto-flag and warn.

## Test Plan

- Unit tests for countdown math (timezones, DST, extension), first-move rule, mode-switch state, entitlement checks, age gate.
- Contract tests for all API routes including pagination, webhook idempotency, upload states.
- Integration tests: auth, onboarding per mode, swipe-to-match, first-move send, extend, call, verification, block/report, account deletion.
- Photo pipeline tests: NSFW, minors-suspected, professional-mode romantic-content flag.
- Safety tests: harassment, NCII, impersonation, minor, women-first enforcement per orientation.
- Privacy tests: hidden-mode, precise-location off, data export, deletion, analytics redaction.
- Billing tests: free/paid/expired/canceled/refunded/restored/cross-platform, extend credit balance.
- Realtime tests: timer drift, push payload redaction, call reconnect, message resume.
- Accessibility tests: dynamic type, screen reader, reduced motion, captions for video calls.
- Manual verification: native screenshots, subscription purchase/restore, call quality on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Bumble assets or trademarked mode names.
- Mode switching, 24-hour window, extend, verification, and video/voice are covered by tests.
- Age gate, minors, NCII, block/report, hidden-mode covered by tests and safety-center documentation.
- Subscriptions reconcile across platforms with webhook coverage.
- Precise location, DOB, and biometric data never leak to other users or analytics.
- Manual verification blockers resolved with evidence or remain launch-blocking flags.

## Open Questions

- Which regions restrict women-first messaging rules; does the product offer opt-out per orientation?
- Will V1 include in-app video-date features (e.g., icebreaker games) or defer?
- Which biometric-law regions require consent banners for photo verification?
- Extension credit: consumable or included in subscription?
- Will professional mode require LinkedIn-style role verification?

## Build Plan

- Phase 1: auth/OTP, age gate, mode picker, onboarding (dating mode), discovery, swipe, match, basic chat, first-move rule.
- Phase 2: safety center (block/report/unmatch, NCII, hidden-mode), data export, deletion, match countdown and extend.
- Phase 3: additional modes (friends, professional) with distinct filters and moderation.
- Phase 4: photo verification, in-match voice/video calls with consent and signaling.
- Phase 5: subscriptions, consumables, webhooks, restore purchase.
- Phase 6: accessibility, realtime hardening, manual verification, regional compliance.

## Next Steps

- Replace discovery URLs with verified first-party URLs.
- Engage trust & safety reviewer for women-first enforcement and minors/NCII flows.
- Confirm biometric compliance vendor and regional posture.
