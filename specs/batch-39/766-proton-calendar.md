# Proton Calendar-Style Clone Spec

> Metadata
> - Inspiration app: Proton Calendar
> - Category: Scheduling and appointments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-05.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on 2026-05-05; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: E2E encryption implementation, Proton account integration, key management and key transparency, encrypted sharing mechanics, import/export with encryption, calendar event invitation encryption, and subscription state across Proton ecosystem.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, licensed course/document content, school contracts, tenant data, or unlicensed integrations.

## Overview

Build an original mobile product inspired by Proton Calendar's public privacy-focused encrypted calendar workflow. The V1 clone focuses on end-to-end encrypted calendar events, zero-access architecture (server cannot read event data), Proton ecosystem integration (Mail, Drive, VPN), encrypted event sharing with other Proton users, CalDAV bridge for external client access, multiple calendars with color coding, recurring events, event notifications, calendar import/export (ICS), and privacy-first subscription entitlements.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, encryption, key-management, sharing, ecosystem, and provider behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first privacy-focused encrypted calendar experience with onboarding, encrypted event management, sharing, Proton ecosystem, and settings flows.
- Reproduce the functional job behind Proton Calendar using original product naming, original UI, original sample data, and licensed integrations.
- Preserve exact boundaries between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Define screens, entities, API contracts, encryption model, offline behavior, privacy/safety controls, analytics, tests, acceptance criteria, and build phases.

## Non-Goals

- Do not copy Proton branding, logos, screenshots, marketing copy, private APIs, proprietary encryption libraries, or protected media.
- Do not claim exact native behavior until lawful hands-on verification records evidence for iOS, Android, encryption, key management, and Proton ecosystem states.
- Do not implement production payments or real cryptographic key infrastructure without separate security and legal review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/proton-calendar-secure-planner/id1514709943 | iOS listing, privacy labels, release notes, encryption claims, and support links | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Google Play | https://play.google.com/store/apps/details?id=me.proton.android.calendar | Android listing, data safety, encryption claims, and release cadence | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official product site | https://proton.me/calendar | Product features, encryption model, privacy positioning, and ecosystem integration | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Official help center | https://proton.me/support/calendar | Calendar setup, encryption, sharing, import/export, CalDAV bridge, and troubleshooting | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Privacy policy | https://proton.me/legal/privacy | Zero-access encryption, data collection, jurisdiction, and third-party disclosure | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |
| Terms of service | https://proton.me/legal/terms | Service terms, subscriptions, acceptable use, and Swiss jurisdiction | Verified public URL or explicit platform blocker on 2026-05-05; hands-on native behavior still blocked. |

## Detailed Design

- Onboarding must support Proton account creation/login, key generation for new users, key import for existing users, calendar permission primer, and two-factor authentication.
- Encryption model must implement client-side E2E encryption: events encrypted with user's calendar key before upload; server stores only ciphertext; decryption happens exclusively on client.
- Calendar key management must support key generation, key rotation, key sharing (for shared calendars), key backup/recovery via Proton account recovery, and key transparency verification.
- Event creation must encrypt title, description, location, and attendee data client-side before API submission; only start/end times may be stored in a queryable format for notification delivery.
- Calendar views (day/week/month) must decrypt and render events client-side with performance optimization for large encrypted datasets.
- Sharing must support sharing calendars with other Proton users via encrypted key exchange; external sharing via ICS link (unencrypted export with user consent warning).
- Import/export must handle ICS import (encrypt on import), ICS export (decrypt on export with confirmation), and CalDAV bridge access for third-party calendar clients.
- Proton ecosystem must integrate with Proton Mail (event invitations), Proton Drive (attachment storage), and cross-app authentication.
- Settings must include calendars, encryption status, key management, sharing, notifications, Proton account, subscription, privacy, terms, data export, and delete-account.
- Entitlements must model free (limited calendars), paid Proton plans (more calendars, custom domains, priority support), and cross-product bundle states.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, and reduced motion.
- Offline behavior must cache encrypted events locally (still encrypted at rest), allow event creation offline (encrypt locally, queue for upload), and sync on reconnect.

## Core User Journeys

- New user creates a Proton account, generates calendar encryption keys, and creates their first encrypted calendar event.
- Returning user logs in, decrypts local key, and sees their calendar with all events decrypted client-side.
- User creates an event with title, location, and description; all fields are encrypted before reaching the server.
- User shares a calendar with another Proton user; the calendar key is encrypted to the recipient's public key.
- User imports an ICS file; events are encrypted on import and stored securely.
- User exports their calendar; events are decrypted client-side and downloaded as standard ICS.
- User receives a calendar invitation via Proton Mail and adds it to their encrypted calendar.
- User sets up CalDAV bridge access for a third-party calendar client with encryption/decryption handled by the bridge.
- User enables two-factor authentication and manages recovery methods for key access.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
| Welcome/Auth | Proton login, 2FA, key setup | email, password, 2FA, key | new, returning, locked, recovery | auth failure, key corruption, 2FA lost |
| Day View | Decrypted events timeline | tap, scroll, create | loaded, decrypting, empty | decryption failure, key unavailable |
| Week View | 7-day grid with encrypted events | tap, swipe | loaded, decrypting, dense | slow decryption, many events |
| Month View | Month overview with event indicators | tap day, swipe | loaded, sparse, dense | performance with encrypted data |
| Event Create | Encrypted event entry | title, time, location, notes | draft, encrypting, saved | encryption failure, offline |
| Event Detail | Decrypted event information | view, edit, delete, share | decrypted, editing | key unavailable, sharing failure |
| Calendar Sharing | Share with Proton users | recipient, permissions | sharing, shared, pending | recipient not found, key exchange failure |
| Import/Export | ICS import (encrypt) / export (decrypt) | file selection, confirm | importing, exporting | large file, parse error, encryption |
| Key Management | Encryption keys and recovery | view keys, rotate, backup | active, rotating, recovering | key loss, rotation failure |
| Settings | Account, encryption, calendars, privacy | forms, toggles | loaded, editing | key error, subscription expired |

## Data Model

- `User`: Proton account reference, public key, key ring state, calendar list, 2FA state, recovery methods, entitlement, and deletion/export status.
- `CalendarKey`: calendar reference, encrypted private key (encrypted to user's account key), public key, key ID, creation timestamp, rotation history, and active/revoked state.
- `Calendar`: name (encrypted), description (encrypted), color, owner, sharing state, CalDAV bridge enabled, and creation timestamp.
- `EncryptedEvent`: calendar reference, encrypted blob (title + description + location + attendees), start/end (minimally exposed for notifications), recurrence rule, UID, and sync state.
- `EventAttendee`: encrypted email, encrypted name, participation status, role, and RSVP state (all encrypted within event blob).
- `ShareGrant`: calendar reference, recipient user reference, recipient public key, encrypted calendar key (encrypted to recipient), permission level (view/edit), and acceptance state.
- `ImportJob`: source file hash, event count, encryption state (encrypting/complete/failed), error log, and timestamp.
- `ExportJob`: calendar reference, decryption state (decrypting/complete/failed), output file reference, and timestamp.
- `CalDAVBridge`: user reference, bridge credentials (encrypted), enabled state, last sync, and connected clients.
- `Notification`: event reference, trigger time, delivery state, and content (decrypted client-side only for display).
- `Entitlement`: user reference, Proton plan (free/mail-plus/proton-unlimited/business), calendar limits, feature flags, and billing state.
- `AuditEvent`: key rotation, sharing changes, import/export, account recovery, and security-sensitive actions (no event content logged).
- `LocalCacheRecord`: encrypted event cache (still encrypted at rest on device), key cache in secure enclave, sync state, and TTL.

## API And Backend Contracts

- Auth: `POST /auth/session`, `POST /auth/2fa`, `POST /auth/refresh`, `DELETE /auth/session` with Proton SRP-based authentication.
- Keys: `GET /keys`, `POST /keys/rotate`, `GET /keys/{keyId}/public`, `POST /keys/recover` for calendar key lifecycle.
- Calendars: `POST /calendars`, `GET /calendars`, `PATCH /calendars/{id}`, `DELETE /calendars/{id}` with encrypted name/description.
- Events: `POST /calendars/{id}/events` (accepts encrypted blob), `GET /calendars/{id}/events?start=&end=` (returns encrypted blobs), `PATCH /events/{id}`, `DELETE /events/{id}`.
- Sharing: `POST /calendars/{id}/shares`, `GET /calendars/{id}/shares`, `DELETE /calendars/{id}/shares/{shareId}`, `POST /shares/{shareId}/accept`.
- Import: `POST /calendars/{id}/import` accepting pre-encrypted event batch.
- Export: `GET /calendars/{id}/export` returning encrypted blobs for client-side decryption and ICS generation.
- CalDAV bridge: `POST /bridge/enable`, `GET /bridge/credentials`, `DELETE /bridge/disable`.
- Notifications: `POST /notification-preferences` with trigger configuration (server only knows timing, not content).
- Billing: `GET /entitlements`, Proton subscription management via web redirect.
- Privacy: `POST /data-export` (encrypted export), `DELETE /account` with key destruction confirmation.

## Realtime, Push, And Offline Behavior

- Cache encrypted events locally; device storage contains only ciphertext except during active decryption in memory.
- Queue event creates/edits as encrypted blobs offline; upload on reconnect with conflict detection by event UID and sequence number.
- Push notifications contain only timing metadata (not event content); client decrypts event details on notification tap.
- Calendar key cached in device secure enclave/keychain; re-authentication required after extended background or device lock.
- Sync uses incremental event fetch by modification timestamp; full re-sync available for corruption recovery.
- Background sync must not decrypt events; only fetch and cache encrypted blobs for freshness.

## Permissions, Privacy, And Safety

- Treat encryption key management, zero-access architecture, key recovery, and calendar sharing as launch-blocking security review areas.
- Zero-access principle: server must never have access to plaintext event content, titles, locations, attendees, or descriptions.
- Key recovery must use Proton's account recovery mechanism; lost keys without recovery = permanent data loss (warn user clearly).
- Sharing must use public-key cryptography; calendar key encrypted to recipient's public key, never transmitted in plaintext.
- Request notification permission for event alerts; notifications contain no event content (only "You have an upcoming event").
- Do not log, analyze, or crash-report any decrypted event content.
- Analytics must be privacy-preserving: no event content, no attendee info, no calendar names, no location data.
- Provide encrypted data export, account deletion with key destruction, and clear privacy documentation.
- CalDAV bridge access must warn users that bridge credentials allow unencrypted access and should be protected.

## Analytics And Monetization

- Onboarding events: `onboarding_started`, `account_created`, `keys_generated`, `calendar_created`, `onboarding_completed` with no content metadata.
- Core action events: `event_created`, `event_edited`, `calendar_shared`, `import_started`, `export_started` with only count/type metadata.
- Retention events: `app_opened`, `notification_opened`, `sync_completed`, `bridge_enabled`.
- Security events: `key_rotated`, `recovery_configured`, `2fa_enabled`, `sharing_accepted`, `sharing_revoked`.
- Monetization events: `paywall_viewed`, `plan_upgraded`, `plan_downgraded`, `subscription_canceled`.
- Monetization model: freemium within Proton ecosystem; do not copy exact Proton plan names or pricing.
- Analytics rule: absolutely no event content, calendar names, attendee info, locations, or decrypted data in any analytics payload.

## Edge Cases

- User loses account password and recovery method; calendar keys are unrecoverable; display permanent data loss warning.
- Key rotation during active sharing; all share recipients must receive re-encrypted calendar key.
- Large ICS import (1000+ events) must encrypt each event without blocking UI; show progress.
- CalDAV bridge credentials leaked; user must be able to revoke and regenerate immediately.
- Encrypted event blob corrupted in transit; client must detect via integrity check and request re-fetch.
- Recipient declines calendar share; encrypted key material must be destroyed.
- Offline event creation followed by key rotation on another device; queued events encrypted with old key must still be processable.
- Device secure enclave unavailable (old device); fall back to encrypted keychain with additional passphrase.
- Proton ecosystem login session expired; calendar must lock (show encrypted state) until re-authentication.
- Two-factor authentication device lost; recovery flow must not expose calendar content during recovery.
- Free plan calendar limit reached; additional calendar creation must be blocked with upgrade prompt.
- ICS export of shared calendar; respect permission level (view-only cannot export to non-Proton format without owner consent).

## Test Plan

- Unit tests for encryption/decryption, key generation, key rotation, share key derivation, ICS parsing, and event validation.
- Integration tests for auth flow, event CRUD with encryption, calendar sharing, import/export, and CalDAV bridge.
- Security tests for zero-access verification (server never sees plaintext), key rotation integrity, share revocation, and bridge credential management.
- Crypto tests for key generation randomness, encryption algorithm correctness, integrity verification, and cross-platform compatibility.
- Offline tests for encrypted cache storage, queued encrypted writes, key unavailability handling, and reconnect sync.
- Permission tests for notification denied, key access after device lock, and biometric/passcode gates.
- Performance tests for decrypting 1000+ events, large ICS import encryption, and calendar view rendering with decryption.
- Accessibility tests for screen reader labels, focus order, dynamic type, and contrast in all views.
- Billing tests for plan upgrade, downgrade, calendar limit enforcement, and feature gating.
- Recovery tests for password reset, 2FA loss, key recovery, and permanent data loss scenarios.

## Acceptance Criteria

- The app can be implemented with original branding while preserving the documented privacy-focused encrypted calendar workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers.
- Events are encrypted client-side before upload; server stores only ciphertext.
- Calendar sharing uses public-key cryptography; no plaintext key transmission.
- Import encrypts events on ingest; export decrypts client-side with user confirmation.
- CalDAV bridge provides third-party client access with appropriate security warnings.
- Key management supports generation, rotation, recovery, and sharing.
- All entities have owners, lifecycle states, encryption state, and deletion/export behavior.
- At least 10 acceptance tests cover encryption, sharing, import/export, key rotation, offline, recovery, accessibility, performance, billing, and security.
- Hands-on native parity remains blocked until manual verification blockers have recorded lawful evidence.

## Open Questions

- Which encryption library provides the required E2E primitives with mobile performance (OpenPGP.js equivalent for mobile)?
- What is the exact key transparency verification protocol for shared calendars?
- How does Proton handle calendar invitations with non-Proton users (unencrypted fallback)?
- What CalDAV bridge architecture supports transparent encryption/decryption?
- Which Proton plan boundaries affect calendar feature availability?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, encryption model, and security review checklist.
- Phase 2: Build auth, key generation, encrypted calendar/event CRUD, and basic day/week/month views with client-side decryption.
- Phase 3: Add calendar sharing with key exchange, import/export with encryption, and CalDAV bridge.
- Phase 4: Add Proton ecosystem integration, notification system, subscription flows, and key recovery.
- Phase 5: Complete security, crypto, performance, accessibility, billing, and regression tests.
- Phase 6: Conduct lawful hands-on verification and independent security audit before parity claims.

## Next Steps

- Capture native iOS/Android screen evidence for encrypted event creation, sharing flow, key management, and CalDAV bridge setup.
- Record encryption protocol details, key management behavior, and Proton ecosystem integration in a dedicated research note.
- Confirm cryptographic library selection and security review requirements before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
