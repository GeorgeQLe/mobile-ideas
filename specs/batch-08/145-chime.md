# Chime-Style Clone Spec

> Metadata
> - Inspiration app: Chime
> - Category: Neobank
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: KYC/CIP, debit-card issuance, fee-free overdraft mechanic, secured credit-builder card, early-direct-deposit plumbing, and dispute flows require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, and partner-bank/card-issuer integrations. Neobank is not a bank; operator must clearly disclose partner-bank relationship and FDIC pass-through.

## Overview

Build an original mobile neobank experience inspired by Chime: partner-bank-backed checking and savings, a debit card, fee-free overdraft up to a limit, a secured credit-builder card, early direct deposit via ACH posting rules, round-ups into savings, and transactional alerts.

The clone must use original copy, iconography, and integrations. It must not imply it is itself a bank and must clearly surface partner-bank and FDIC disclosures.

This spec is Draft 1: surfaces ready; banking, card, credit-builder, and overdraft mechanics remain behind regulatory review.

## Goals

- Partner-bank checking and savings accounts with clear partner disclosures.
- Debit card with controls (lock, travel, PIN, digital wallet), instant push alerts.
- Fee-free discretionary overdraft up to a user-specific limit with eligibility criteria disclosed.
- Secured credit-builder card with on-time-payment reporting to bureaus (via partner).
- Early direct deposit leveraging ACH-posting policy with partner-bank.
- Round-ups from debit-card purchases into savings.
- Reg E dispute intake and resolution tracking.

## Non-Goals

- Do not imply the operator is a chartered bank.
- Do not copy Chime trademarks, SpotMe-like marks, or marketing copy.
- Do not market overdraft as guaranteed; discretionary eligibility must be disclosed.
- Do not offer lending without proper licensing; credit-builder is secured.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/chime-mobile-banking/id1068839305 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.onedebit.chime | Android features | Source discovery — pending exact URL verification |
| Product support | https://help.chime.com/ | Feature behavior | Source discovery — pending exact URL verification |
| Legal & disclosures | https://www.chime.com/terms/ | Partner-bank disclosure references | Source discovery — pending exact URL verification |
| FDIC reference | https://www.fdic.gov/resources/deposit-insurance/ | FDIC pass-through education | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Checking and savings accounts at a partner bank, FDIC-insured via the bank.
- Debit card with instant authorizations pushed to the app.
- Round-up transfers from checking to savings triggered by card swipes.
- Fee-free overdraft to a user limit, with eligibility criteria (e.g., qualifying direct deposits) disclosed without proprietary names.
- Secured credit-builder card: cash collateral, on-time payments reported to bureaus via partner.
- Early direct deposit: funds posted when ACH file arrives from payer, up to partner-bank policy.
- P2P money movement (intra-platform and external).
- Reg E dispute intake with timelines per regulation.

## Core User Journeys

- User signs up, completes KYC, and opens checking + savings at the partner bank.
- User receives a virtual card and orders a physical card; activates card on arrival.
- User sets up direct deposit and receives pay earlier than the scheduled date per partner-bank policy.
- User enables round-ups; each card purchase rounds up into savings.
- User overdrafts a small amount within eligibility; charge is covered fee-free.
- User applies for the secured credit-builder card; funds collateral from checking; uses the card; auto-pays in full.
- User disputes an unauthorized charge; case tracked per Reg E.
- User sends/receives P2P money internally and externally via ACH/real-time-payment rail.
- User locks/unlocks card, orders replacement if lost, switches PIN.
- User closes the account; funds transferred out; bureau reporting cleanup for credit-builder.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Identity, account open | name, DOB, SSN | collecting, verified | denied, manual review |
| Home | Checking/savings, card | navigation | empty, funded | partner outage |
| Card Controls | Lock, PIN, wallet | toggles | active, locked, replaced | fraud hold |
| Transactions | Activity, filters | search, filters | loaded, empty | pending posts |
| Transfers | ACH, internal, P2P | amount, recipient | pending, settled | NSF, return |
| Direct Deposit | Setup, status | employer form | active, pending | employer form lost |
| Overdraft Eligibility | Limit and criteria | view-only | eligible, ineligible | disqualifying event |
| Credit-Builder Card | Open, collateral, pay | collateral amount | active, closed | bureau error |
| Round-Ups | Toggle, summary | toggle | on, off | savings reach cap |
| Disputes | File/track | category, details | submitted, resolved | denied |
| Settings | Security, MFA, profile | edits | loaded | MFA needed |
| Support | Cases | category | submitted | escalated |

## Data Model

- `User`: identity, KYC, partner-bank customer id.
- `BankingAccount`: partner-bank account, type, status.
- `Card`: virtual/physical, state (active/locked/replaced), wallet provisioning.
- `Transaction`: authorization vs post, mcc, merchant hash, status.
- `RoundUp`: source transaction id, amount, settled state.
- `OverdraftEligibility`: limit, last-reviewed-at, reason codes.
- `CreditBuilderAccount`: collateral amount, paid-in-full state, bureau reporting state.
- `DirectDeposit`: employer metadata (opaque), routing/account references, schedule observed.
- `P2PTransfer`: internal/external rail, amount, counterparty id.
- `Dispute`: Reg E case, reason code, status, resolution.
- `AuditEvent`: append-only.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/start`, `GET /kyc/status`.
- `POST /accounts/banking`, `PATCH /accounts/banking/:id`, `POST /accounts/savings`.
- `POST /cards`, `PATCH /cards/:id`, `POST /cards/:id/replace`, `POST /cards/:id/wallet`.
- `GET /transactions?cursor=`, `POST /transactions/:id/categorize`.
- `POST /transfers/ach`, `POST /transfers/internal`, `POST /transfers/p2p`.
- `GET /direct-deposit/form`, `POST /direct-deposit/confirm`.
- `GET /overdraft/eligibility`.
- `POST /credit-builder`, `POST /credit-builder/collateral`, `POST /credit-builder/pay`.
- `POST /disputes`, `GET /disputes/:id`.
- `POST /support/cases`.
- `POST /billing/webhook` (partner webhooks for auth, post, reversal, return).

## Realtime, Push, And Offline Behavior

- Card authorizations stream via push + in-app updates in near real-time.
- ACH posting events processed server-side; app reconciles via webhook-driven polling.
- Offline: read-only activity from cache, labeled stale.
- Push covers transaction alerts, direct-deposit posted, overdraft used, dispute updates, card-fraud alerts.

## Permissions, Privacy, And Safety

- Camera/notifications/biometrics at point of use.
- SSN/tax-id encrypted, redacted in analytics, PII minimized in support tooling.
- KYC/AML/OFAC via partner-bank; SAR workflow readiness.
- Reg E dispute timelines enforced.
- FCRA compliance for bureau reporting on credit-builder.
- Partner-bank and FDIC pass-through accurately disclosed; operator is not a bank.
- Launch owners: compliance, security, privacy, partner-bank liaison.

## Analytics And Monetization

- Privacy-safe events only: onboarding, KYC classes, card state changes (activated/locked), transfer classes, round-up, overdraft-usage (class only), credit-builder lifecycle, disputes (class).
- Monetization typically via interchange from partner-bank arrangements; no hidden fees.
- Always surface fee schedule and overdraft eligibility in plain language.

## Edge Cases

- Overdraft eligibility revoked mid-swipe; decline vs cover behavior.
- Direct-deposit file arriving late after user expected early pay.
- Card declined due to fraud hold; customer self-serve clear path.
- Credit-builder collateral shortfall after refund/chargeback; bureau reporting considerations.
- P2P external transfer to wrong recipient; recall/return handling.
- Joint account handling (if any).
- Account closure with outstanding disputes or bureau reporting.
- Sanctioned counterparty detection.

## Test Plan

- KYC state machine.
- Card lifecycle including wallet provisioning and replacement.
- Transaction auth/post/reversal reconciliation.
- Round-ups idempotency and aggregation.
- Overdraft eligibility edges (just above/below threshold).
- Credit-builder: collateral funding, auto-pay, bureau reporting staging (without real bureau submits in test).
- Direct-deposit posting with partner-bank policy.
- Reg E dispute flows including provisional credit and resolution.
- P2P success, failure, recall.
- Privacy and analytics redaction.
- Accessibility tests.
- Manual verification: funded account with real direct deposit and card activity.

## Acceptance Criteria

- Partner-bank disclosure and FDIC pass-through are clearly shown on key surfaces.
- Overdraft eligibility and fee structure are always accessible.
- Credit-builder reporting aligns with FCRA and partner contract.
- Disputes obey Reg E timelines.
- Card controls and fraud alerts are first-class.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which partner-bank and card issuer will back V1?
- Which ACH/RTP rails are supported for P2P?
- Does V1 offer paycheck advance (lending) or only discretionary overdraft?
- Does V1 include joint accounts?
- Which states/jurisdictions does V1 support at launch?

## Build Plan

- Phase 1: auth, KYC, partner-bank checking, debit card, basic transactions.
- Phase 2: savings, round-ups, direct deposit, transfers.
- Phase 3: overdraft eligibility and mechanic.
- Phase 4: secured credit-builder card and bureau reporting.
- Phase 5: P2P (internal/external) and dispute flows.
- Phase 6: support, compliance, accessibility, manual verification.

## Next Steps

- Partner-bank and card-issuer RFPs.
- Legal review of overdraft and credit-builder disclosures.
- Replace discovery URLs with exact first-party URLs before implementation.
