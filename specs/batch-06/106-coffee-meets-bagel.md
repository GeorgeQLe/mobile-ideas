# Coffee Meets Bagel-Style Clone Spec

> Metadata
> - Inspiration app: Coffee Meets Bagel
> - Category: Dating / daily curated matches
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public community guidelines.
> - Manual verification blockers: native iOS/Android screen capture, subscription purchase/restore, token economy behavior, and push-notification behavior need a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, and moderation pipelines.

## Overview

Build an original mobile dating app inspired by Coffee Meets Bagel's daily-curated-matches pattern: a slow-dating surface where a small curated list of candidates appears daily, in-app tokens unlock priority actions, a Discover tab shows broader profiles, and community-style conversation starters help break the ice.

The clone must not copy CMB branding, trademarked feature names (e.g., "bagels" → "daily picks"; "beans" → "credits"), screenshots, marketing copy, protected iconography, or private APIs.

## Goals

- Provide a slow-dating surface with N daily picks (server-curated) delivered on a fixed schedule.
- Support a broader Discover tab with additional profiles for active browsing.
- Offer a token-economy for priority actions (priority like, extend chat, unlock) with server-side balance.
- Provide community-style icebreaker prompts and conversation starters.
- Keep safety and privacy prominent (age gate, block/report, NCII, hidden-mode).
- Support subscription state without copying proprietary plan names or pricing.

## Non-Goals

- Do not build a CMB-branded app or imply affiliation.
- Do not scrape CMB or replay its private APIs; do not reuse trademarked feature names.
- Do not ship dating for users under the platform minimum age.
- Do not claim exact App Store/Play Store parity until manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/coffee-meets-bagel-dating-app/id630119301 | iOS listing, category, privacy labels | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.coffeemeetsbagel | Android listing, content rating, data safety | Source discovery — pending exact URL verification |
| Coffee Meets Bagel Support | https://coffeemeetsbagel.com/support | Daily picks, token economy, Discover tab | Source discovery — pending exact URL verification |
| CMB Privacy Policy | https://coffeemeetsbagel.com/privacy-policy | Data collection, retention, deletion | Source discovery — pending exact URL verification |
| CMB Terms | https://coffeemeetsbagel.com/terms | Age/access rules, subscription terms | Source discovery — pending exact URL verification |
| CMB Safety Center | https://coffeemeetsbagel.com/safety | Safety features, reporting | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding: phone/email, age gate, photos, prompts, attributes, preferences.
- Daily picks delivered at a fixed local time with a limited number of curated candidates.
- Discover tab shows a broader pool with filter/search capability.
- Token economy: daily token grant + purchased packs; tokens unlock priority like, extend chat window, view who-liked-you, etc.
- Mutual interest creates a chat; chats have an expiration window (configurable) that can be extended with tokens.
- Conversation starters / icebreaker prompts surfaced in chat UI.
- Subscription tiers: free (basic picks + tokens), paid (extra picks + tokens + features).

## Core User Journeys

- New user onboards, sets preferences, and sees first daily picks at next scheduled delivery time.
- User opens app, reviews daily picks, likes/passes each candidate.
- User browses Discover tab with additional filters.
- User earns daily tokens, purchases a token pack, and spends on priority like.
- Mutual match creates a chat with countdown window.
- User extends chat window with tokens before expiry.
- User uses icebreaker prompt in chat.
- User reports/blocks a profile.
- User upgrades/cancels/restores subscription.
- User requests data export and deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone/email + age gate | credentials, DOB | new, returning, auth-error | underage, region blocked |
| Onboarding | Photos, prompts, preferences | photos, fields | incomplete, complete | photo rejected |
| Daily Picks | Curated candidates today | tap to view, like/pass | fresh, consumed, empty | not yet delivered, missed |
| Discover | Broader pool | scroll, filter, like | loaded, empty | location denied |
| Likes Received | Inbound likes (gated) | tap to reveal | free-sample, paid-unlock | subscription expired |
| Profile Detail | Candidate view | scroll, like, comment | loaded, verified | reported, deleted |
| Chat List | Active chats with timers | tap thread | with timer, expired | blocked, unmatched |
| Chat Thread | Messaging | text, icebreaker, extend | active, expiring-soon, expired | message blocked |
| Token Wallet | Balance + purchase packs | view, buy pack | balance shown, low | checkout failure |
| Subscription | Plan, checkout, restore | plan, payment | free, paid, expired, restored | platform mismatch |
| Preferences | Filters for picks + Discover | selectors | loaded, saved | conflict |
| Safety Center | Block list, report history | manage | baseline | verification failed |
| Report Flow | Reason, evidence | text, screenshot | drafting, submitted | NCII fast-path |
| Settings | Account, privacy, export | navigation, toggles | loaded, signed-out | deletion pending |

## Data Model

- `User`: identity, phone/email, DOB, locale, region, age-gate decision, deletion/export state.
- `Profile`: display name, photos, prompts, attributes.
- `Preferences`: age, distance, orientation, dealbreakers, hidden-mode.
- `DailyPick`: user, candidate id, delivery cohort date, consumed state, decision (liked/passed).
- `DiscoverEntry`: user, candidate id, surfaced_at.
- `Like`: sender, recipient, priority flag (token-funded), timestamp.
- `Match`: pair id, chat expiry, extended count, archived state.
- `Message`: chat id, sender, content, icebreaker-prompt id (if used), safety classification, delivered/read.
- `TokenBalance`: user, balance, last-grant-at.
- `TokenTransaction`: user, delta, reason (grant, purchase, spend), reference id.
- `IcebreakerPrompt`: prompt id, text, category, active state.
- `Entitlement`: plan key, platform, purchase id, renewal/refund state.
- `SafetyReport`: reporter, reported, category, evidence, decision.
- `AuditEvent`: append-only account, privacy, safety, billing, token changes.

## API And Backend Contracts

- `POST /auth/otp`, `POST /auth/verify`, `DELETE /auth/session`: phone/email auth with age gate.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile CRUD.
- `POST /photos`, `PUT /photos/:id/content`: photo upload with scans.
- `GET /daily-picks?date=`: daily picks cohort.
- `GET /discover?cursor=&filters=`: Discover pool.
- `POST /likes` with optional `priority=true`: like with optional token spend.
- `GET /likes/inbound`: inbound likes (subscription gated).
- `GET /matches`, `GET /matches/:id`, `POST /matches/:id/extend`: match list/detail/extend.
- `GET /matches/:id/messages`, `POST /matches/:id/messages`: messaging.
- `GET /icebreakers`: curated prompt library.
- `GET /tokens/balance`, `POST /tokens/packs/:packId`: wallet and purchase.
- `POST /reports`, `POST /blocks`, `DELETE /blocks/:id`: safety.
- `GET /settings/preferences`, `PATCH /settings/preferences`: filters, hidden-mode.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: billing.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Daily picks precomputed server-side and released at scheduled local time; push notifies user of daily delivery.
- Messaging via websocket with reconnect; push wakes for match/new message with redacted content.
- Token grants are server-authoritative and idempotent per day.
- Chat expiry is server-authoritative with client-rendered countdown.
- Offline cache: recent chats, daily picks, icebreaker prompts. Evict on block/unmatch.
- Token pack purchases reconcile via webhook before credit is applied.

## Permissions, Privacy, And Safety

- Age gate launch-blocking; minors protection with photo age estimation.
- NCII fast-path with hashing and expedited takedown.
- Distance bucketed; precise coordinates never exposed.
- Photo content policy: explicit/minors/weapons/hate blocked.
- Block/report/unmatch: one-tap, no notification, persist across reinstall.
- Hidden-mode excludes from Discover and daily-picks cohorts; surfaces only to prior matches.
- Sensitive-message scanning opt-in with reconsider dialog.
- Token economy safety: no "pay to unlock identity"; tokens only accelerate existing consent-based interactions.
- Harassment escalation: repeat offenders shadow-limited, suspended, banned with appeal.

## Analytics And Monetization

- Events: onboarding, profile publish, daily-picks opened, like sent, priority like spent, match, message sent, extend used, token granted/purchased/spent, icebreaker used, block/report, subscription lifecycle, export/deletion.
- No raw content, DOB, precise location, or biometric data in analytics.
- Monetization: free tier with daily tokens, paid subscription with extra tokens/features, token pack consumables.
- Paywall states identify blocked feature, entitlement, restore path, platform, support.
- Server-side webhook reconciliation for all billing events with refund handling on token packs.

## Edge Cases

- Daily picks not yet delivered due to timezone or grant job lag.
- Token spent on priority like but recipient had blocked sender first; refund token.
- Chat expires while user is composing; message rejected with clear error.
- Extend purchased after expiry; server rejects and refunds token.
- Subscription purchased on web, opened on iOS; restore after refund; token refunded on pack refund.
- Hidden-mode enabled but prior matches attempting contact.
- Reported user deletes account; evidence retained per policy.
- Data export requested with token history and transactions.
- Underage signup attempt with edited DOB.
- Icebreaker prompt deprecated mid-chat; show original text snapshot.

## Test Plan

- Unit tests for daily-picks cohort determinism, token ledger integrity, match-extend math, age gate, hidden-mode visibility.
- Contract tests for all API routes, pagination, webhook idempotency.
- Integration tests: auth, onboarding, daily picks, Discover, like, match, extend, messaging, report/block, deletion.
- Photo pipeline tests: NSFW, minors.
- Safety tests: harassment, NCII, token-spend-no-unmask enforcement.
- Privacy tests: hidden-mode, analytics redaction.
- Billing tests: subscription lifecycle, token pack refund, cross-platform.
- Realtime tests: push redaction, chat-expiry countdown, daily-delivery.
- Accessibility tests: dynamic type, screen reader, reduced motion, contrast.
- Manual verification: native screenshots, subscription purchase/restore, token pack purchase on device.

## Acceptance Criteria

- Downstream team can build V1 without proprietary CMB assets or trademarked feature names.
- Daily picks, Discover, token economy, icebreaker prompts, and match-extend covered by tests.
- Age gate, minors, NCII, block/report, hidden-mode covered by tests and safety docs.
- Subscriptions and token packs reconcile via webhooks with refund handling.
- Precise location, DOB, and raw content never leak to analytics or other users.
- Manual verification blockers resolved or remain launch-blocking flags.

## Open Questions

- How many daily picks per day in free vs. paid tier?
- What is the default chat-expiry window and extension cost?
- Will V1 offer priority-like notes to recipient?
- Will V1 include video date features?
- What refund policy applies to consumed tokens?

## Build Plan

- Phase 1: auth, age gate, onboarding, daily picks, Discover, like/pass, match, basic chat.
- Phase 2: safety center (block/report/unmatch, NCII, hidden-mode), data export, deletion.
- Phase 3: token economy (grants, packs, priority like, extend), icebreakers.
- Phase 4: subscriptions, paywalls, webhooks, restore purchase.
- Phase 5: realtime hardening, push redaction, rate limiting.
- Phase 6: accessibility, manual verification, regional compliance.

## Next Steps

- Replace discovery URLs with verified first-party URLs.
- Engage trust & safety reviewer for token-economy safety and minors/NCII flows.
- Draft original icebreaker prompt library with legal review.
