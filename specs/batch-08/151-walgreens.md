# Walgreens-Style Clone Spec

> Metadata
> - Inspiration app: Walgreens
> - Category: Pharmacy and retail
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and retail pharmacy disclosures pending exact URL verification.
> - Manual verification blockers: prescription refill integration with a licensed pharmacy backend, photo-print fulfillment, loyalty-program ledger, and in-store pickup flows require hands-on verification with a real retail pharmacy partner.
> - Legal scope: lawful functional parity only; original code, brand, copy, and pharmacy/retail partnerships. Operator is not a pharmacy or prescriber; no medical advice.

## Overview

Build an original retail pharmacy companion app inspired by Walgreens: prescription refill management, store locator with services, photo-print ordering, retail shop, and a rewards program. The clone must use original copy and integrations. Prescription workflows are HIPAA-adjacent and require a licensed pharmacy-fulfillment partner.

This spec is Draft 1: surfaces ready; prescription-fulfillment backend, controlled-substance flows, age-gated product SKUs, and rewards ledger remain behind compliance/partner review.

## Goals

- Refill prescriptions by scanning or selecting saved Rx; show status and pickup readiness.
- Locate nearby stores; show services (pharmacy, clinic, photo, drive-through) and hours.
- Order photo prints from camera roll, cloud albums, or device; select fulfillment store.
- Browse and buy retail products with pickup or shipping.
- Enroll in a rewards program; earn and redeem points transparently.
- Manage family or caregiver prescriptions with explicit consent.

## Non-Goals

- Do not offer medical advice or symptom triage.
- Do not copy Walgreens trademarks, logos, or marketing copy.
- Do not process controlled-substance refills without compliance review.
- Do not show age-restricted products to unverified users.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/walgreens/id335894770 | iOS feature list | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.walgreens.android.application | Android feature list | Source discovery — pending exact URL verification |
| Customer help center | https://www.walgreens.com/topic/help/generalhelp/mainfaq.jsp | Support topics | Source discovery — pending exact URL verification |
| Privacy and legal | https://www.walgreens.com/topic/help/generalhelp/privacyandsecurity.jsp | PHI handling references | Source discovery — pending exact URL verification |
| Rewards program disclosures | https://www.walgreens.com/topic/promotion/mywalgreens.jsp | Loyalty terms references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Saved Rx list with status (ready for pickup, in progress, delayed), pharmacy location, and pickup window.
- Refill entry via barcode scan of an Rx label or from saved Rx list.
- Store locator with filters for services, hours, and drive-through availability.
- Photo print ordering with sizing, quantity, and paper finish; same-day in-store pickup where supported.
- Retail shop with categories, search, cart, checkout, pickup and ship options.
- Rewards program with points ledger, tier indicators, and redemption at checkout.
- Caregiver access for managing another person's Rx with documented consent.

## Core User Journeys

- User scans an Rx label barcode and requests a refill; receives status updates.
- User opens the store locator, selects a store, and pins it as the home store.
- User uploads photos, chooses prints, and picks an in-store pickup window.
- User browses retail products, adds to cart, and chooses ship-to-home.
- User enrolls in rewards, earns points on a purchase, and redeems at checkout.
- User adds a dependent with consent flow and manages the dependent's refills.
- User views prescription pickup notification and taps into order detail.
- User configures refill reminders for chronic medications.
- User chats with pharmacist support within scope-limited topics (not medical advice).
- User deletes account and data with PHI-aware data-deletion guardrails.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Home | Status and quick actions | refill, store, shop | loaded, empty | partner outage |
| Prescriptions | Saved Rx list | list | ready, in-progress, delayed | sync error |
| Rx Detail | Refill status | request refill | ready, processing | controlled-substance block |
| Barcode Refill | Scan label | camera | captured | invalid code |
| Store Locator | Nearby stores | filters, search | results | location denied |
| Photo Prints | Order prints | selection, sizing | in cart, submitted | upload failure |
| Shop | Retail catalog | browse, search | results | out of stock |
| Cart And Checkout | Place order | items, address | placed, failed | payment decline |
| Rewards | Points and tier | redeem | enrolled | enrollment pending |
| Caregiver | Dependent access | consent forms | active | revoked |
| Account | Profile, privacy | edits | loaded | locked |
| Support | Contact, FAQ | topic | submitted | escalated |

## Data Model

- `User`: account, home store, notifications, privacy settings.
- `Prescription`: Rx id, drug, fills remaining, status, pickup store.
- `RefillRequest`: prescription id, channel, status, timestamps.
- `Store`: id, address, hours, services, geo.
- `PhotoOrder`: assets, sizing, fulfillment store, pickup window, status.
- `Product`: SKU, title, price, age restriction flag.
- `CartOrder`: items, totals, fulfillment method, status.
- `RewardsAccount`: points, tier, enrollment date.
- `CaregiverLink`: principal user, dependent, scope, consent artifacts.
- `AuditEvent`: PHI-related access and consent events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/magic-link`.
- `GET /prescriptions`, `GET /prescriptions/:id`, `POST /refills`.
- `POST /refills/barcode-scan` (submit scan payload).
- `GET /stores?zip=&services=`, `GET /stores/:id`.
- `POST /photo/orders`, `GET /photo/orders/:id`.
- `GET /shop/products`, `POST /shop/cart`, `POST /shop/orders`.
- `GET /rewards`, `POST /rewards/redeem`.
- `POST /caregiver/links`, `PATCH /caregiver/links/:id`.
- `POST /support/cases`.
- `POST /account/delete`.

## Realtime, Push, And Offline Behavior

- Push for refill readiness, pickup reminders, order shipping updates.
- Push payloads avoid PHI and drug names; use class-level copy.
- Offline: cached Rx list and store locator snapshot; writes require connectivity.
- Real-time refill status updates via pull-based polling with backoff.

## Permissions, Privacy, And Safety

- Location permission for store locator; ZIP entry is the default path.
- Camera permission only when scanning a barcode.
- Photo library permission only when ordering prints.
- Notification permission requested at contextual points.
- PHI minimization: drug/pharmacy linkages never flow to third-party analytics or ad SDKs.
- HIPAA-adjacent handling posture with BAAs with pharmacy partner.
- Age gating for restricted products with ID verification partner.
- Controlled-substance refill flows gated behind compliance review.
- Launch owners: privacy/HIPAA counsel, pharmacy partner ops, security, compliance, retail ops.

## Analytics And Monetization

- Privacy-safe events: feature usage at class level, checkout conversion, rewards enrollment.
- Monetization via retail margin and partner economics; no PHI data sharing for ads.
- Reward mechanics instrumented without drug-linkage exposure.

## Edge Cases

- Controlled-substance Rx; limited display and messaging.
- Refill denied by pharmacy (insurance, early-refill); show reason in partner-supplied copy.
- Multiple stores in a household; pinned home store logic.
- Photo print upload failure; resume with dedupe.
- Out-of-stock products; substitution opt-in.
- Rewards points pending; reconcile after fulfillment.
- Caregiver consent revoked mid-flow.
- Account deletion with open prescriptions.
- Partner backend outage; degraded UX with read-only mode.

## Test Plan

- Rx list, refill request, and status update pipeline.
- Barcode scan coverage and error paths.
- Store locator filters and geolocation fallbacks.
- Photo order sizing, pricing, and pickup window selection.
- Shop checkout across pickup and ship methods.
- Rewards accrual, redemption, and reconciliation.
- Caregiver consent lifecycle.
- PHI redaction in analytics, logs, and support tooling.
- Accessibility across refill and checkout screens.
- Manual verification with pharmacy and photo fulfillment partners.

## Acceptance Criteria

- Refill status reflects partner backend within stated SLO.
- Analytics pipeline excludes drug-linked events.
- Rewards ledger reconciles after order completion or cancellation.
- Controlled-substance flows gated behind compliance flag.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which pharmacy-fulfillment partner powers the Rx backend?
- Which photo-print fulfillment partner handles production?
- Which ID-verification partner supports age-gated products?
- Will V1 support mail-order pharmacy?
- How are insurance refill denials messaged to the patient?

## Build Plan

- Phase 1: store locator, account, shop browse, rewards enrollment.
- Phase 2: saved Rx, refill requests, barcode scan.
- Phase 3: photo printing, checkout, pickup windows.
- Phase 4: caregiver access, age-gated SKU gating, controlled-substance messaging.
- Phase 5: rewards redemption and ledger reconciliation.
- Phase 6: privacy audit, accessibility, manual verification.

## Next Steps

- Pharmacy and photo-fulfillment partner RFPs.
- Privacy/HIPAA counsel review.
- Replace discovery URLs with exact first-party URLs before implementation.
