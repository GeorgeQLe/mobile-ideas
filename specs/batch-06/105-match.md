# Match-Style Clone Spec

> Metadata
> - Inspiration app: Match
> - Category: Dating / long-form profiles
> - Readiness status: Draft 1
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, community guidelines.
> - Manual verification blockers: native iOS/Android screen capture, subscription purchase/restore, event feature localization, and push-notification behavior need a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, and moderation pipelines.

## Overview

Build an original mobile dating app inspired by Match's long-form-profile pattern: rich multi-field profiles (lifestyle, values, relationship goals), search with filters, daily curated matches, event-style community gatherings, private messaging, photo verification, and tiered subscription state.

The clone must not copy Match branding, trademarked feature names, screenshots, marketing copy, protected iconography, private APIs, or proprietary matching logic.

## Goals

- Provide a long-form profile surface with lifestyle/values/relationship-goals fields.
- Offer search with detailed filters and a daily curated-matches surface.
- Support virtual/local events (opt-in) with RSVP and chat.
- Provide photo verification, messaging, favorites, and saved searches.
- Keep safety and privacy prominent (age gate, block/report, NCII, hidden-mode).
- Support subscription state without copying proprietary plan names or pricing.

## Non-Goals

- Do not build a Match-branded app or imply affiliation with Match Group.
- Do not scrape Match or replay its private APIs.
- Do not ship dating for users under the platform minimum age.
- Do not claim exact App Store/Play Store parity until manual verification is complete.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/match-dating-meet-singles/id305939712 | iOS listing, age rating, privacy labels, feature blurbs | Source discovery — pending exact URL verification |
| Google Play | https://play.google.com/store/apps/details?id=com.match.android.matchmobile | Android listing, content rating, data safety | Source discovery — pending exact URL verification |
| Match Help Center | https://www.match.com/help | Search, daily matches, events, subscription tiers, verification | Source discovery — pending exact URL verification |
| Match Privacy Policy | https://www.match.com/privacypolicy | Data collection, retention, deletion | Source discovery — pending exact URL verification |
| Match Terms | https://www.match.com/registration/membagr.aspx | Age/access rules, subscription terms | Source discovery — pending exact URL verification |
| Match Safety Tips | https://www.match.com/help/safety-tips | Safety guidance, reporting | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding: email/phone, age gate, rich profile (bio, values, lifestyle, relationship goals), photos, search filters.
- Search: filters for age, distance, values, lifestyle, education, religion, relationship goal, with saved searches.
- Daily curated list: N candidates per day based on declared preferences.
- Events: optional virtual or local events with RSVP, attendee list, post-event chat.
- Messaging: private 1:1 chat with receipts and photo share; report/block/unmatch available.
- Photo verification: pose-selfie badge.
- Subscription tiers: free, paid, premium with different message/search limits; consumables optional.

## Core User Journeys

- New user onboards, fills long-form profile, and lands on search/daily matches.
- User runs search, saves search, receives daily-match list.
- User favorites candidates, sends message (subject to entitlement), receives reply.
- User RSVPs to virtual event, joins event chat pre/during, exchanges messages.
- User verifies photo and earns badge.
- User reports or blocks a profile; report submitted with evidence.
- User upgrades, cancels, restores subscription.
- User enables hidden-mode; profile hidden from search and daily matches.
- User requests data export and account deletion.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, age gate | email/phone, DOB | new, returning, auth-error | underage, region blocked |
| Onboarding | Long-form profile + photos | fields, photos | incomplete, complete | photo rejected |
| Search | Filter candidates | filters, sort | empty, results, loading | filter conflict, no results |
| Daily Matches | Curated list | tap to view | with list, consumed, empty | regenerate next day |
| Profile Detail | Candidate view | scroll, favorite, message | loaded, verified badge | reported, deleted |
| Events | List of events | browse, RSVP | upcoming, attending, past | full event, canceled |
| Event Detail | Event info + attendees | RSVP, chat | attending, attended | canceled |
| Messages | Inbox | tap thread | empty, with threads | message blocked |
| Chat Thread | Messaging | text, photo, report | delivered, read | message blocked |
| Verification | Photo verification | pose selfie | pending, verified, failed | repeated failures |
| Saved Searches | Manage saved queries | edit, delete | empty, saved | sync error |
| Subscription | Plan, checkout, restore | plan, payment | free, paid, expired, restored | platform mismatch |
| Report Flow | Reason, evidence | text, screenshot | drafting, submitted | NCII fast-path |
| Settings | Account, privacy, hidden-mode, export | navigation, toggles | loaded, signed-out | deletion pending |

## Data Model

- `User`: identity, email/phone, DOB, locale, region, age-gate decision, deletion/export state.
- `Profile`: display name, photos, bio, values, lifestyle, relationship-goal, education, religion, attributes.
- `Preferences`: age, distance, values filters, lifestyle filters, dealbreakers, hidden-mode.
- `SavedSearch`: query params, name, created_at, alert frequency.
- `DailyMatch`: user, candidate id, cohort date, consumed state.
- `Favorite`: user, favorite user, timestamp.
- `Message`: chat id, sender, content parts, safety classification, delivered/read, retracted.
- `Event`: title, description, venue (virtual/physical), start/end, capacity, RSVP list.
- `EventRSVP`: user, event id, state (going, waitlist, canceled), joined-at.
- `VerificationRecord`: user, pose-selfie key, decision, retention.
- `Entitlement`: plan key, platform, purchase id, renewal/refund state, message credits.
- `SafetyReport`: reporter, reported, category, evidence, decision.
- `AuditEvent`: append-only changes to account, privacy, safety, billing, hidden-mode, verification.

## API And Backend Contracts

- `POST /auth/email`, `POST /auth/phone`, `DELETE /auth/session`: auth with age gate.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile CRUD.
- `POST /photos`, `PUT /photos/:id/content`: photo upload with scans.
- `GET /search?filters=&cursor=`: filtered search.
- `POST /saved-searches`, `GET /saved-searches`, `DELETE /saved-searches/:id`: saved-search CRUD.
- `GET /daily-matches?date=`: daily curated list.
- `POST /favorites`, `DELETE /favorites/:id`, `GET /favorites`: favorites.
- `GET /chats`, `GET /chats/:id/messages`, `POST /chats/:id/messages`: messaging.
- `GET /events`, `GET /events/:id`, `POST /events/:id/rsvp`, `DELETE /events/:id/rsvp`: events.
- `GET /events/:id/chat`, `POST /events/:id/chat/messages`: event chat.
- `POST /verification/photo`: photo verification.
- `POST /reports`, `POST /blocks`, `DELETE /blocks/:id`: safety.
- `GET /settings/preferences`, `PATCH /settings/preferences`: filters, hidden-mode.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: billing.
- `POST /data-export`, `DELETE /account`: privacy workflows.

## Realtime, Push, And Offline Behavior

- Messaging via websocket with reconnect; push wakes for new message and event reminder.
- Push payloads redact content by default.
- Daily-match cohort precomputed server-side; client fetches lazily; cohort is user-scoped and deterministic per date.
- Saved-search alerts delivered as push with debounce.
- Offline cache: recent chats, favorites, saved searches. Evict on block/sync.
- Event chat timeboxed to pre/during/post event window.

## Permissions, Privacy, And Safety

- Age gate launch-blocking; minors protection with photo age estimation.
- NCII fast-path with hashing and expedited takedown.
- Distance bucketed; precise coordinates never exposed.
- Biometric handling for photo verification with encrypted storage and retention limits.
- Photo content policy: explicit/minors/weapons/hate blocked.
- Block/report/unmatch one-tap, no notification to blocked party.
- Hidden-mode excludes from search and daily matches; surfaces only to favorites or already-messaged users.
- Sensitive-message scanning opt-in with reconsider dialog.
- Event safety: in-person event warnings, meet-in-public advice, reporting path inside event chat.
- Harassment escalation: repeat offenders shadow-limited, suspended, banned with appeal.

## Analytics And Monetization

- Events: onboarding, profile publish, search ran, saved-search created, daily-match opened, favorite added, message sent, event RSVP, verification, block/report, subscription lifecycle, export/deletion.
- No raw content, DOB, precise location, or biometric data in analytics.
- Monetization: free, standard subscription, premium subscription, consumables (boost, highlights).
- Paywall states identify blocked feature, entitlement, restore path, platform, support.
- Server-side webhook reconciliation for all billing events.

## Edge Cases

- Saved search with filters that return zero results; alert suspended.
- Daily-match cohort crosses timezone; deterministic per user/date pair.
- Event canceled after RSVP; notify attendees and refund if paid event.
- In-person event where two users block each other; event chat permissions adjusted.
- Subscription purchased on web, opened on iOS; restore after refund.
- Hidden-mode enabled but favorited users attempting contact.
- Data export requested with saved searches and event history.
- Photo verification repeated failures throttled.
- Reported user deletes account; evidence retained per policy.
- Underage signup attempt with edited DOB.

## Test Plan

- Unit tests for search filter resolution, daily-match cohort determinism, entitlement gating, age gate, hidden-mode visibility.
- Contract tests for all API routes, pagination, webhook idempotency.
- Integration tests: auth, onboarding, search, saved search, daily match, message, event RSVP, verification, block/report, deletion.
- Photo pipeline tests: NSFW, minors.
- Safety tests: harassment, NCII, event-safety banner.
- Privacy tests: hidden-mode, analytics redaction.
- Billing tests: free/paid/expired/canceled/refunded/restored/cross-platform, message credits.
- Realtime tests: push redaction, event-chat windowing.
- Accessibility tests: dynamic type, screen reader, reduced motion, contrast.
- Manual verification: native screenshots, subscription purchase/restore, push payloads.

## Acceptance Criteria

- Downstream team can build V1 without proprietary Match assets or trademarked feature names.
- Long-form profile, search, daily match, events, verification, messaging covered by tests.
- Age gate, minors, NCII, block/report, hidden-mode covered by tests and safety docs.
- Subscriptions reconcile across platforms with webhooks.
- Precise location, DOB, biometric data, and raw content never leak to analytics or other users.
- Manual verification blockers resolved or remain launch-blocking flags.

## Open Questions

- Will V1 include paid events or only free community events?
- Which regions require explicit consent for religion/values filters under anti-discrimination law?
- Will V1 include video profiles or only photos?
- Will saved-search alerts be push-only or also email-based?
- What is the retention for event chat history?

## Build Plan

- Phase 1: auth, age gate, long-form onboarding, search, daily match, messaging, favorites.
- Phase 2: saved searches, hidden-mode, data export, deletion, safety center.
- Phase 3: events with RSVP and event chat, verification.
- Phase 4: subscriptions, consumables, webhooks, restore purchase.
- Phase 5: realtime hardening, push redaction, rate limiting, abuse analytics.
- Phase 6: accessibility, manual verification, regional compliance review.

## Next Steps

- Replace discovery URLs with verified first-party URLs.
- Engage trust & safety and legal review for event-safety content and profile fields.
- Draft original lifestyle/values field library with anti-discrimination review.
