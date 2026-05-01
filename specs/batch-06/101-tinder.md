# Tinder-Style Clone Spec

> Metadata
> - Inspiration app: Tinder
> - Category: Dating / swipe discovery
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: public marketplace listings, company help center, public privacy/terms pages, public trust & safety guidance.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, subscription purchase/restore, ID verification handoff, and push-notification behavior still require a test device/account before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, tagline, sample data, safety copy, and moderation pipelines.

## Overview

Build an original mobile dating app inspired by Tinder's swipe discovery pattern: onboarding with photo/bio/prompts, geo-bounded card stack, accept/reject/priority-like gestures, mutual-match celebration, realtime chat, visibility boosts, rewind, passport-style location swap, and a robust safety layer covering block/report/unmatch, minors protection, and non-consensual imagery reporting.

The clone must not copy Tinder branding, trademarked feature names (e.g., no "Super Like" wording — use "priority like"), screenshots, marketing copy, protected iconography, ranking/ELO logic, private APIs, or proprietary moderation models. The implementation can reproduce comparable user jobs using original product language and first-party infrastructure.

Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until a lawful hands-on pass confirms the exact native behavior.

## Goals

- Provide a mobile-first dating experience with photo-rich profiles, prompt answers, and a geo-bounded discovery stack with gesture-driven triage.
- Offer match, chat, visibility boost, rewind, priority-like, and location-swap features behind original copy.
- Keep privacy and safety controls prominent: age gate, block/report, unmatch, hidden-mode, photo-verification, and abuse-reporting paths.
- Support subscription state (free, trial, paid, expired, canceled, restored) without copying proprietary plan names or pricing.
- Produce concrete routes, entities, API contracts, realtime rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Tinder-branded app or imply affiliation with Match Group.
- Do not scrape Tinder, replay proprietary ranking/recommendation logic, or reuse private APIs.
- Do not ship adult/explicit content, paid "arrangement" messaging, or dating for users under the platform minimum age.
- Do not expose precise latitude/longitude or home address to other users.
- Do not claim exact App Store, Play Store, or native-device parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/tinder-dating-new-people/id547702041 | iOS listing, category, age rating, privacy labels, screenshots list, support/policy links | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.tinder | Android listing, content rating, data safety, feature blurbs | Verified 2026-05-01 |
| Tinder Help Center | https://www.help.tinder.com/hc/en-us | Account creation, photo/bio rules, matching, messaging, subscription tiers, block/report | Verified 2026-05-01 |
| Tinder Safety Center | https://policies.tinder.com/safety/intl/en | Safety features, photo verification, reporting, community guidelines | Verified 2026-05-01 |
| Tinder Privacy Policy | https://policies.tinder.com/privacy/intl/en | Data collection, location handling, retention, deletion | Verified 2026-05-01 |
| Tinder Terms of Use | https://policies.tinder.com/terms/intl/en | Age/access rules, prohibited conduct, subscription terms | Verified 2026-05-01 |
| Tinder Community Guidelines | https://policies.tinder.com/community-guidelines/intl/en | Banned content, harassment, impersonation, nudity policy | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- Onboarding requires phone/email auth, date of birth (age gate >= platform minimum), at least one photo, display name, gender, and orientation/interest selections with original copy.
- Discovery is a card stack of nearby profiles gated by distance, age, and orientation preferences; direction-based gestures map to like/pass/priority-like with undo (rewind) as a paid feature.
- Mutual matches unlock a 1:1 chat; messaging is blocked pre-match to reduce harassment; in-chat photo/video send must be rate-limited and moderated.
- Profile must support up to N photos (original limit), short bio, prompts, selective attributes (job, education, distance), and orientation visibility toggle.
- Photo verification compares a user-submitted pose selfie against profile photos and grants a verified badge; ID verification is an optional higher-trust tier.
- Visibility boost temporarily elevates card placement in the queue; priority-like surfaces the sender's card at the top of the recipient's stack.
- Location swap (passport) lets the user browse from a chosen city; discovery distance must show the chosen city, not the user's home coordinates.
- Subscription state includes free, trial, paid, expired, canceled, restored, web-managed, and app-store-managed states with server-side webhook reconciliation.

## Core User Journeys

- New user installs, verifies phone/email, completes age gate, adds photos, sets orientation/distance/age filters, and lands on the discovery stack.
- User swipes through the stack, receives a mutual-match celebration, and opens chat with an original icebreaker prompt.
- User sends a priority-like with an optional note; recipient sees the note gated by feature availability.
- User activates visibility boost and receives a post-session summary of extra views/matches attributable to the boost window.
- User uploads a pose selfie for photo verification, passes or fails, and sees a verified badge once approved.
- User toggles hidden-mode / discovery-off, hides age/distance, or switches to pause-discovery state and confirms profile no longer appears in card stacks.
- User blocks, reports, or unmatches a connection; report submits reason, evidence, and optional screenshot to moderation queue.
- User reports non-consensual imagery (NCII) or harassment and receives a priority-reviewed acknowledgement with safety resources.
- User upgrades, cancels, restores purchase, or moves subscription between platforms with reconciliation.
- User requests data export and account deletion from settings; deletion revokes active matches and removes profile from all stacks.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Sign up, phone/email OTP, age gate | phone, OTP, email, DOB | new, returning, OTP-pending, auth-error | underage, blocked region, carrier block, network failure |
| Onboarding Profile | Photos, name, DOB, orientation, interests | photos, bio, prompts | incomplete, complete, moderation-pending | photo rejected, underage DOB, NSFW flagged |
| Discovery Stack | Card-stack triage | swipe gestures, tap zones | loaded, empty-queue, offline, throttled | rate-limit hit, no candidates, location denied |
| Profile Detail | Expanded candidate view | scroll, like/pass/priority | loaded, verified-badge visible | reported profile, deleted profile |
| Matches List | Mutual matches and chats | tap match, search | empty, with matches, archived | unmatched mid-session, blocked user |
| Chat Thread | Realtime messaging | text, sticker, photo, report | connecting, delivered, read, typing | message blocked by safety, photo removed, user blocked |
| Likes Received | Paid feature: see who liked | tap to reveal | gated, revealed | subscription expired mid-view |
| Settings/Preferences | Distance, age, orientation, notifications | sliders, toggles | loaded, saved | precise-location denied |
| Safety Center | Block list, verification status, resources | manage block, start verification | baseline, verified, in-review | verification failed |
| Subscription | Plan selection, checkout, restore | plan, payment | free, paid, expired, canceled, restored | platform mismatch, webhook delay |
| Report Flow | Report category, evidence, submit | reason, text, screenshot | drafting, submitted, acknowledged | NCII fast-path, policy unavailable |
| Settings | Account, privacy, data export, deletion | navigation, toggles | loaded, signed-out | deletion pending |

## Data Model

- `User`: account identity, phone/email, DOB, age-gate decision, locale, region, auth providers, consent state, deletion/export state.
- `Profile`: display name, bio, prompts, photos (ordered), attributes, orientation, interests, verification tier, hidden-mode state.
- `Photo`: storage key, order, NSFW scan result, face-match state, moderation decision, retention policy.
- `PreferenceSet`: distance radius, age min/max, orientation filters, showMe state, discovery-paused flag, passport location.
- `DeviceSession`: device id, platform, app version, notification token, session expiry, last active.
- `Candidate`: anonymized snapshot used in discovery stack with eligibility flags (distance, block list, prior seen).
- `SwipeEvent`: swiper, swipee, direction (like/pass/priority), timestamp, boost window attribution.
- `Match`: pair id, created timestamp, last message id, unmatched_at, block_source, archived state.
- `Message`: match id, sender, content parts, safety classification, delivered/read receipts, retracted state.
- `VerificationRecord`: user, pose-selfie storage key, ID-doc reference (if used), decision, reviewer id, retention policy.
- `Entitlement`: plan key, platform, purchase id, trial/renewal/expiration/refund state, boost balance, priority-like balance.
- `SafetyReport`: reporter, reported user, category (harassment, NCII, impersonation, minor, spam, other), evidence, decision, escalation state.
- `AuditEvent`: append-only account, privacy, billing, deletion, safety, verification, and hidden-mode changes.

## API And Backend Contracts

- `POST /auth/otp`, `POST /auth/verify`, `DELETE /auth/session`: phone/email OTP auth with age-gate enforcement.
- `POST /profile`, `PATCH /profile`, `GET /profile/me`: profile creation and edits with moderation precheck.
- `POST /photos`, `PUT /photos/:id/content`, `DELETE /photos/:id`: signed photo upload with NSFW and face-match scan.
- `GET /discovery/stack?cursor=`: returns next batch of eligible candidates with cursor and freshness token.
- `POST /swipes`: idempotent swipe record with direction and optional priority-like note.
- `GET /matches?cursor=`: paginated match list with last message and unread counts.
- `DELETE /matches/:id`: unmatch with reason code.
- `GET /matches/:id/messages`, `POST /matches/:id/messages`: paginated message history and idempotent send.
- `POST /uploads/photo-message`: inline photo send with scan-before-deliver.
- `POST /verification/photo`, `GET /verification/photo/:id`: pose-selfie verification lifecycle.
- `POST /boosts`, `GET /boosts/current`: activate visibility boost; return active window and summary.
- `POST /priority-likes`: consume priority-like balance and deliver to recipient queue.
- `POST /passport/location`: set passport city with geocoded approximation (no precise coords).
- `GET /settings/preferences`, `PATCH /settings/preferences`: discovery filters, hidden-mode, showMe.
- `POST /reports`: harassment/NCII/impersonation report with evidence; NCII fast-path flag.
- `POST /blocks`, `DELETE /blocks/:userId`: block list management.
- `GET /entitlements`, `POST /checkout/session`, `POST /billing/restore`, `POST /billing/webhook`: entitlement lifecycle.
- `POST /data-export`, `DELETE /account`: privacy workflows with audit events and async status.

## Realtime, Push, And Offline Behavior

- Matches and messages use websocket or SSE with resume cursor; push notification triggers wake-on-receive without full message preview by default.
- Message payloads must pass safety scan before delivery; blocked messages are retained for moderator review but not surfaced to recipient.
- Typing and read receipts are best-effort and must tolerate connection drops.
- Local caches may hold recent matches and message history; unmatch/block must evict local cache on next sync.
- Swipes and profile edits may be queued offline with idempotency keys and reconciled on reconnect.
- Push content must avoid surfacing message body, photo previews, or match photos by default; deep-link into the app requires re-auth if session expired.
- Location updates must use coarse granularity unless precise permission is granted and feature requires it.

## Permissions, Privacy, And Safety

- Age gate is launch-blocking: DOB required, minimum age enforced server-side, attempts to circumvent (edit DOB down) blocked and logged.
- Minors protection: ML-based age estimation on profile photos, mandatory review queue when age is uncertain; any profile suspected to be a minor goes to immediate hold and law-enforcement reporting if applicable.
- Non-consensual imagery: dedicated NCII report path with hashing (industry-standard hash sharing where lawful) and expedited takedown SLA.
- Doxxing/location-stalking mitigation: distance is bucketed (e.g., rounded to nearest mile/km), precise coordinates never exposed; passport city shows city-level only; do not surface workplace or school names unless user opted in.
- Biometric/ID verification: pose-selfie and ID documents stored encrypted, retention limited to decision window, never shown to other users, redacted in support tooling, subject to regional biometric law disclosures.
- Photo content policy: explicit nudity, minors, weapons, and hate imagery auto-blocked or queued for review; moderation rationale surfaced to user on rejection.
- Block/report/unmatch: all three are one-tap, do not notify the blocked party, and persist across reinstall.
- Hidden-mode / incognito: user profile is excluded from all discovery stacks, only surfaces to users they have liked; state is reversible and shown in settings.
- Sensitive-message scanning: opt-in on-device or server-side scan for harassment/explicit content; surfaces a gentle warning to recipient and prompts sender with reconsider dialog; no sensitive content logged.
- Harassment escalation: repeated reports trigger shadow limits, suspension, or permanent ban with appeal path; safety team contact surfaced in-app.
- Data minimization: analytics must exclude message content, photos, DOB, precise location, verification imagery, and orientation identifiers.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, photo uploaded/approved/rejected, profile published, swipe (direction, boost-window flag), match created, first message sent, chat reply within 24h, boost activated/ended, priority-like sent, verification submitted/approved, block/report submitted, subscription started/renewed/canceled/restored, data export requested, account deletion requested.
- No raw content, message text, photo bytes, DOB, orientation, or precise location in analytics.
- Monetization tiers: free, standard subscription, premium subscription, and consumable packs (boosts, priority-likes) with original plan names and pricing.
- Paywall states must identify blocked feature, current entitlement, restore path, platform ownership, and support path.
- App-store and web subscriptions must reconcile through server-side webhooks; entitlement cache must revalidate on login, app foreground, and webhook delivery.

## Edge Cases

- Underage signup attempt, region-blocked account, VPN-masked location, OTP replay attack, SIM-swap recovery.
- Empty discovery stack due to narrow filters or sparse region; offline state mid-swipe; rate-limit hit.
- Priority-like sent then sender unmatched/blocked before delivery; boost purchased while app was offline.
- Verification failure due to poor lighting, hat/mask, or mismatched face; repeated failures throttled.
- Photo uploaded that contains another identifiable person who has not consented; NCII report with law-enforcement preservation request.
- Reported user deletes account mid-investigation; evidence must be preserved per policy retention.
- Mutual match where one user blocks the other mid-chat; chat must close, history retained for moderator access only.
- Location spoofing detection; passport use while travelling; time-zone skew on boost window.
- Subscription purchased on web but opened on iOS; app-store restore after refund; webhook delayed beyond visible boost window.
- Data export requested with active subscription; account deletion with open safety report.

## Test Plan

- Unit tests for swipe idempotency, match creation, block/unmatch state machine, boost window math, priority-like balance, entitlement checks, and age-gate server enforcement.
- Contract tests for all documented API routes, including pagination, error codes, photo-upload states, and webhook idempotency.
- Integration tests for auth, onboarding, profile publish, swipe-to-match, chat, unmatch, block, and account deletion.
- Photo pipeline tests for NSFW, face-match, minors-suspected, and non-consenting-bystander scans.
- Verification tests for pose-selfie pass/fail, ID-doc optional path, retention cleanup.
- Safety tests for every launch-blocking category: harassment, NCII, minor, impersonation, self-harm referrals.
- Privacy tests for hidden-mode, precise-location off, data export, account deletion, analytics redaction.
- Billing tests for free/paid/expired/canceled/refunded/restored/web-owned/app-store-owned states and consumable balances.
- Offline and realtime tests: queued swipes, message resume, push payload redaction, unmatch cache eviction.
- Accessibility tests: dynamic type, VoiceOver/TalkBack labels on cards, reduced motion, color contrast, captions on video.
- Manual verification tests: native iOS/Android screenshots, subscription purchase/restore, push payloads, boost timing on device.

## Acceptance Criteria

- A downstream team can build V1 without proprietary Tinder assets, private APIs, or trademarked feature names.
- New users can onboard, publish a profile, swipe, match, and chat with original copy and first-party infra.
- Age gate, minors protection, NCII report, block/report/unmatch, and hidden-mode are covered by tests and documented in the safety center screen.
- Subscriptions reconcile across platforms with server-side webhooks and refund/restore cases covered.
- Precise location, DOB, orientation, and biometric data never leak to other users or analytics.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which ID-verification vendor and which biometric-law regions require explicit consent banners?
- Will V1 include video chat, voice notes, or ephemeral media, or defer to Phase 2?
- Which regions require disclosed age-estimation and human review for minors-suspected profiles?
- Will priority-like notes be moderated pre-delivery or post-delivery with report path?
- What retention window applies to NCII evidence vs. standard safety reports?

## Build Plan

- Phase 1: auth/OTP, age gate, onboarding, profile, photo upload with scans, discovery stack, swipe, match creation, basic chat.
- Phase 2: safety center — block, report, unmatch, NCII fast-path, hidden-mode, precise-location controls, data export, account deletion.
- Phase 3: verification (pose-selfie), passport/location swap, visibility boost, priority-like, likes-received surface.
- Phase 4: subscriptions, consumable packs, paywalls, server-side webhook reconciliation, restore purchase.
- Phase 5: realtime hardening, push payload redaction, offline queueing, rate limiting, abuse analytics.
- Phase 6: accessibility pass, manual native verification, moderator tooling, appeal flows, regional compliance review.

## Next Steps

- Refresh exact first-party URLs before implementation kickoff and keep unsupported native flows feature-flagged.
- Engage a trust & safety reviewer for NCII/minor/harassment flows before any public launch.
- Confirm ID-verification vendor and regional biometric compliance posture.
