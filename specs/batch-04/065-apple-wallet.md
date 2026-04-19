# Apple Wallet-Style Clone Spec

> Metadata
> - Inspiration app: Apple Wallet
> - Category: Digital wallet, payment cards, passes, tickets, keys, IDs, loyalty, transit, order tracking, NFC/secure-element-adjacent presentation, and platform wallet support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-18.
> - Verification basis: exact public marketplace page, Apple Wallet and Apple Pay product pages, Apple Support Wallet pages, Apple Platform Security, Apple privacy/legal pages, and Apple Developer Wallet/PassKit documentation.
> - Manual verification blockers: native iOS screens, hardware/device support, Face ID/Touch ID/passcode behavior, Apple Pay card provisioning, issuer verification, NFC presentation, Express Mode, transit cards, car/home/hotel keys, IDs, passes, tickets, order tracking, Wallet notifications, pass sharing, pass updates, removal/deletion, data export, Android parity decisions, support paths, and regional/issuer availability require lawful test devices/accounts, platform entitlement approval, and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, branding, copy, icons, sample passes, card art, issuer/provider relationships, NFC claims, secure-element claims, pass templates, legal text, and platform entitlements.

## Overview

Build an original wallet app inspired by Apple Wallet's public workflow: wallet home, payment-card-like credentials, passes, tickets, loyalty cards, transit passes, keys, IDs where legally available, order tracking, notifications, pass sharing, card/pass detail, privacy/security controls, support, and platform integrations.

The clone must not copy Apple branding, screenshots, marketing copy, protected UI artwork, Wallet card/pass designs, private APIs, issuer provisioning flows, Apple Pay tokenization, secure-element behavior, NFC behavior, legal text, or support scripts. Functional parity should be expressed through original wallet objects, sample passes, platform-approved APIs, licensed issuer/merchant integrations, and explicit manual blockers for native/hardware/issuer flows.

## Goals

- Provide a mobile-first digital wallet with wallet home, cards/passes, pass detail, presentation mode, barcode/QR display, issuer/provider status, notifications, sharing, support, privacy, and security settings.
- Support wallet-category trust expectations around device security, biometric/passcode gating, tokenized credentials, pass updates, lost device risk, issuer verification, data minimization, regional availability, and support escalation.
- Model payment-card provisioning, NFC/secure-element presentation, transit, IDs, keys, order tracking, and issuer/merchant pass updates as platform/provider-backed modules with explicit entitlement and manual verification gates.
- Produce concrete screens, entities, API contracts, offline/realtime rules, analytics, safety controls, edge cases, acceptance tests, and build phases.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build an Apple Wallet-branded app or imply affiliation with Apple, Apple Pay, Apple Cash, Apple Card, issuers, transit agencies, merchants, hotels, automakers, states, or platform entitlement providers.
- Do not process production payment tokenization, NFC card-present payments, government IDs, car/home/hotel keys, transit value, order tracking from merchants, or issuer support without separate platform, legal, provider, and security approval.
- Do not copy Wallet UI artwork, pass templates, card art, private APIs, secure-element claims, NFC implementation, issuer scripts, or legal/support text.
- Do not imply Android can reproduce Apple-only secure-element or Wallet entitlements; cross-platform V1 must define original equivalent capabilities.
- Do not claim exact native-device, hardware, payment, NFC, key, ID, transit, notification, support, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/apple-wallet/id1160481993 | Official iOS listing, developer Apple, built-in wallet positioning, privacy labels, device requirements, and release context | Verified 2026-04-18 |
| Apple Wallet | https://www.apple.com/wallet/ | Public product positioning for cards, passes, keys, IDs, and wallet organization | Verified 2026-04-18 |
| Apple Pay | https://www.apple.com/apple-pay/ | Apple Pay positioning for card payments, online/in-store use, security/privacy framing, and issuer requirements | Verified 2026-04-18 |
| Apple Support Wallet | https://support.apple.com/wallet | First-party support taxonomy for adding/using cards, passes, keys, IDs, transit, order tracking, and troubleshooting | Verified 2026-04-18 |
| Apple Pay Security | https://support.apple.com/guide/security/apple-pay-component-security-sec2561eb018/web | Platform security model, device account numbers, tokenization, authentication, and secure-element-oriented requirements | Verified 2026-04-18 |
| Apple Privacy | https://www.apple.com/privacy/ | Public privacy principles and data-minimization orientation for wallet/payment-like surfaces | Verified 2026-04-18 |
| Apple Pay Legal | https://www.apple.com/legal/applepayments/ | Apple Pay legal terms, regional legal references, and service-boundary requirements | Verified 2026-04-18 |
| Apple Developer Wallet | https://developer.apple.com/wallet/ | Wallet developer capabilities for passes, keys, IDs, and integration surface orientation | Verified 2026-04-18 |
| PassKit Documentation | https://developer.apple.com/documentation/passkit | Developer API orientation for passes, payment authorization, pass provisioning, and wallet-adjacent contracts | Verified 2026-04-18 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support wallet home, cards/passes list, pass detail, barcode/QR presentation, issuer/provider status, notification settings, privacy/security settings, support links, and signed-out/unavailable states where accounts are required.
- Card-like credentials must support eligibility, issuer/provider handoff, verification state, tokenized display, last four/masked metadata, transaction history where provider supplies it, remove/suspend, and device-security requirements.
- Passes must support event tickets, boarding passes, loyalty cards, coupons, gift cards, order tracking, and generic membership passes with pass fields, barcode/QR, expiration, location/time relevance, share eligibility, update state, and removal.
- Presentation mode must support bright barcode/QR view, offline availability, expired/revoked state, screenshot/security policy, accessibility labels, and no unsupported NFC claims.
- Keys, IDs, transit, and NFC-like flows must remain feature-flagged behind platform entitlement/provider gates and must use original equivalent copy if hardware-level behavior cannot be reproduced.
- Wallet notifications must support pass updates, order status, transaction status, expiry, location/time relevance where allowed, security alerts, and user category controls.
- Privacy/security must expose device lock requirements, session/device management for account-backed wallet objects, pass data sharing, issuer/provider data, remove all local wallet data, data export, and deletion/retention caveats.
- Support must route to issuer/provider/merchant where appropriate and distinguish app support from issuer/payment/network/platform support.

### Build Plan

1. Foundation: users, device capability model, wallet items, cards, passes, issuers, merchants, notifications, privacy settings, legal links, audit logs, feature flags, and synthetic fixtures.
2. Wallet core: home list, card/pass detail, barcode/QR presentation, search/filter, grouping, updates, expired/removed states, settings, support, and offline cache.
3. Provider modules: issuer provisioning handoff, pass update webhooks, order tracking, loyalty/ticket import, notification center, sharing, and remove/suspend workflows.
4. Entitlement-gated modules: payment tokenization, NFC presentation, transit, keys, IDs, and secure-element-adjacent flows behind platform/legal/provider/manual gates.
5. Trust hardening: device security checks, sensitive metadata redaction, support routing, data export/deletion, privacy-safe analytics, accessibility, and lost-device recovery.
6. Native verification: confirm iOS screens, device capabilities, issuer verification, pass updates, notifications, offline behavior, sharing, and platform limitations with lawful devices/accounts.

## Core User Journeys

- New user opens wallet home, adds a sample loyalty pass from a merchant link, sees it in the wallet, opens detail, presents the barcode, and removes it.
- User adds an event ticket, receives a time-sensitive update, shares it if allowed, presents it offline, and handles expired/revoked state.
- User starts adding a payment-card-like credential, enters issuer verification, sees pending/verified states, and removes/suspends the credential.
- User receives order tracking updates from a merchant, opens order detail, sees shipment milestones, and hides/removes the order pass.
- User configures notification categories, privacy choices, device-lock requirement, data export, and local data deletion.
- User attempts a key, ID, transit, or NFC-like flow, sees entitlement/provider blocker, and follows the provider/manual verification path.
- User loses device access, revokes sessions or provider tokens, and follows support escalation.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Wallet Home | Cards/passes, grouping, alerts | card, pass, search, add | empty, loaded, offline | device unsupported, provider degraded |
| Add Item | Add card/pass/order/key/ID | scan, file, link, issuer, provider | selecting, importing, verifying | unsupported item, entitlement missing |
| Card Detail | Credential metadata and status | verify, remove, suspend | pending, active, suspended | issuer decline, token unavailable |
| Pass Detail | Ticket/pass fields and actions | barcode, share, remove | active, relevant, updated | expired, revoked, duplicate |
| Presentation Mode | Bright barcode/QR or provider handoff | barcode, QR, NFC gate | ready, offline, locked | screen too dim, revoked, no NFC entitlement |
| Order Tracking | Merchant order status | order, shipment, support | placed, shipped, delivered | merchant disconnected, stale status |
| Keys/IDs/Transit Gate | Entitlement-gated wallet objects | apply, verify, provider | eligible, pending, blocked | region unavailable, device unsupported |
| Notifications | Wallet update categories | toggle, quiet hours | enabled, disabled | permission revoked, payload minimized |
| Support Routing | Issuer, merchant, app support | case, provider, evidence | routed, open, resolved | wrong support owner, legal hold |
| Privacy/Security Settings | Device lock, sharing, export, deletion | lock, export, delete, legal | secured, pending export | active item, provider retention |

## Data Model

- `User`: account-backed identity, region, privacy choices, wallet settings, deletion lifecycle, and support state.
- `DeviceCapability`: platform, OS version, biometric/passcode state, NFC availability, secure-element entitlement, notification permission, and offline storage status.
- `WalletItem`: type, issuer, owner, display metadata, ordering, status, relevance rules, removal state, and privacy classification.
- `CardCredential`: issuer, token reference, masked account, verification state, transaction feed status, suspend/remove state, and support route.
- `Pass`: pass type, fields, barcode/QR payload token, expiration, relevance, share policy, update token, and revocation state.
- `Ticket`: event, venue, seat, transfer/share eligibility, scan state, issuer updates, and expiration.
- `OrderPass`: merchant, order id token, milestones, shipment status, support route, and removal state.
- `KeyOrIdCredential`: credential type, entitlement, issuer/provider, verification state, device binding, and manual blocker reason.
- `NotificationPreference`: category, permission state, payload policy, quiet hours, and fallback channel.
- `SupportCase`: item, issuer/merchant/app route, evidence, owner queue, SLA, resolution, and privacy flag.
- `AuditEvent`: append-only record for add, update, present, share, remove, suspend, verify, support, privacy, and deletion actions.
- `LocalCacheRecord`: cached wallet items, pass assets, presentation payloads, settings, support cases, sync attempts, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` manage account-backed wallet access where required.
- `GET /device-capabilities`, `GET /wallet-items`, `POST /wallet-items`, `PATCH /wallet-items/:id`, and `DELETE /wallet-items/:id` manage wallet inventory, ordering, and item lifecycle.
- `POST /passes/import`, `POST /passes/:id/share`, `POST /passes/:id/present`, and `GET /passes/:id/updates` manage pass import, sharing, presentation, updates, and revocation.
- `POST /cards/provisioning-session`, `GET /cards/:id`, `POST /cards/:id/verify`, `POST /cards/:id/suspend`, and `DELETE /cards/:id` manage card-like credential verification and removal.
- `GET /orders`, `POST /orders/import`, `GET /orders/:id`, and `POST /orders/:id/hide` manage order tracking where merchant providers exist.
- `POST /credentials/eligibility`, `POST /credentials/apply`, and `GET /credentials/:id` expose key, ID, transit, and entitlement-gated credential blockers.
- `GET /notification-preferences`, `PATCH /notification-preferences`, and server fanout manage wallet updates, security alerts, order status, and expiry notifications.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `GET /data-export/:id`, and `DELETE /account` expose data rights and wallet-item deletion blockers.
- `POST /support/cases`, `GET /support/cases/:id`, and `POST /support/cases/:id/evidence` route support to app, issuer, merchant, or provider owners.

## Realtime, Push, And Offline Behavior

- Wallet items, cards, passes, orders, notifications, support, privacy, and security states must reconcile from server-owned events or provider update tokens.
- The client may cache wallet home, pass metadata, presentation payloads, order status, settings, support cases, and legal links for offline reads/presentation.
- Offline mode may present cached non-revoked barcode/QR passes where policy allows, but must block provisioning, verification, sharing, deletion, order updates, and entitlement-gated credential changes.
- Pass updates, revocations, order milestones, credential status, issuer verification, and notification permissions must display freshness and provider state.
- Push notifications must be opt-in and category-controlled for pass updates, order status, transaction/credential status, expiry, relevance reminders, support, security, and export readiness.
- Push payloads must avoid full card numbers, exact account data, sensitive credential data, government ID details, key data, travel details, order detail, and support evidence unless policy and settings allow.

## Permissions, Privacy, And Safety

- Request notifications, camera, NFC, location, biometric authentication, files/photos, and Bluetooth only when a feature requires them and only if the platform supports the feature.
- Default analytics must exclude card numbers, tokens, barcode payloads, ID details, key material, order identifiers, travel details, precise location, pass fields, issuer secrets, and support evidence.
- Payment cards, NFC, keys, IDs, transit, order tracking, issuer provisioning, pass sharing, support, data export, and deletion require launch owners, provider contracts, platform entitlements, audit logs, and manual verification gates.
- Presentation mode must avoid unsupported secure-element claims, clearly label barcode/QR versus NFC behavior, and show revoked/expired/unsupported states before presentation.
- Account deletion and local data removal must warn about provider-retained cards/passes, issuer accounts, order history, keys/IDs/transit credentials, support cases, legal holds, and device backups.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, accessible barcode alternatives, clear issuer/support routing, and readable pass fields.
- Launch owners: platform owner for entitlements; provider owner for issuers/merchants; security owner for credential storage; privacy owner for data rights; accessibility owner for presentation UX; support owner for routing/escalation.

## Analytics And Monetization

- Track privacy-safe events for wallet opened, item added, pass imported, pass presented, card provisioning started, verification state changed, item removed, notification changed, support case opened, export requested, and deletion requested.
- Events must use coarse item type, flow step, provider status, reason code, latency bucket, and feature flag rather than pass fields, card data, issuer tokens, barcodes, IDs, key material, order identifiers, or location.
- Monetization may include original issuer/merchant integrations, pass distribution, loyalty/order services, or enterprise wallet tooling only with legal-reviewed provider agreements and user consent.

## Edge Cases

- Device lacks passcode/biometric, OS unsupported, NFC unavailable, entitlement missing, user is offline, wallet item is revoked, or app is restored on a new device.
- Card issuer declines verification, token provisioning fails, card is suspended, transaction feed is unavailable, or user removes item while provider still retains account.
- Pass is duplicated, barcode expires, event changes, ticket is transferred, issuer update fails, location/time relevance is denied, or presentation occurs after revocation.
- Order tracking merchant disconnects, shipment status is stale, refund/cancellation changes order state, or support owner is merchant rather than app.
- Key/ID/transit feature is region-blocked, provider approval is missing, hardware entitlement unavailable, or user expects Apple-only secure-element behavior on another platform.
- Data export/deletion conflicts with active credentials, provider retention, issuer disputes, order history, support cases, legal holds, or device backups.

## Test Plan

- Validate exactly one H1, all canonical sections, exact source URLs, and no generic research placeholders.
- Unit test wallet item lifecycle, pass import/update/revocation, presentation state, credential eligibility, notification preferences, support routing, closure blockers, and privacy-safe analytics.
- Contract test every documented API route, response shape, provider status, error code, event replay, entitlement blocker, and disclosure acknowledgement.
- Integration test wallet home, add pass, present pass, share pass, remove item, card provisioning gate, order tracking, notifications, support, export, and deletion.
- Offline/realtime test cached presentation, blocked sensitive writes offline, stale labels, provider update tokens, revocation reconciliation, push deep links, and provider outages.
- Security test token redaction, pass payload storage, session revocation, support evidence access, audit events, platform secret isolation, and local data deletion.
- Accessibility test screen readers, focus order, dynamic type, contrast, reduced motion, barcode alternatives, pass field reading, error recovery, and support paths.
- Manual verification test native iOS screens, cards, passes, keys, IDs, transit, order tracking, push payloads, sharing, support, deletion/export, hardware behavior, and regional/provider differences before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party marketplace, Apple Wallet, Apple Pay, support, privacy/legal, security, developer, and PassKit URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Apple Wallet without copying assets, private APIs, pass templates, card art, secure-element claims, NFC behavior, issuer contracts, legal text, support scripts, or brand copy.
- Every card, pass, key, ID, transit, NFC, secure-element, issuer, support, notification, deletion/export, regional, and native-device behavior without lawful hands-on verification remains explicitly blocked.
- Wallet home, pass detail, presentation, provisioning gates, notifications, support routing, privacy, data export, and deletion have deterministic state models and tests.
- Sensitive wallet data has consent boundaries, privacy controls, audit events, local deletion paths, support escalation, and analytics minimization.
- Platform/provider-backed modules remain feature-flagged until legal, platform, provider, security, accessibility, support, and manual verification owners approve launch.

## Open Questions

- Which wallet capabilities are implemented as true platform Wallet integrations versus original in-app barcode/QR wallet equivalents?
- Which issuer, merchant, transit, key, ID, and order-tracking providers will the implementation use?
- Which Android-equivalent behavior is in scope when Apple-only secure-element or Wallet entitlements cannot be reproduced?
- Which synthetic cards, passes, tickets, orders, keys, IDs, providers, and downstream implementation repos will be used for tests?

## Next Steps

- Use lawful test devices/accounts to verify native Apple Wallet screens, card/pass/key/ID/transit/order workflows, notifications, sharing, support, deletion/export, and regional/provider behavior.
- Create synthetic cards, passes, tickets, loyalty cards, order passes, credential blockers, support cases, and provider events.
- Run legal, platform, provider, security, privacy, accessibility, and support review before enabling production wallet credentials or NFC/secure-element-adjacent features.
