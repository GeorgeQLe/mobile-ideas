# Wise-Style Clone Spec

> Metadata
> - Inspiration app: Wise (formerly TransferWise)
> - Category: International money transfer, multi-currency account
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: multi-currency account opening, transfer rail behavior, mid-market FX quoting, card issuance, and regional licensing flows require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, and partner-bank integrations. Licensing varies by jurisdiction; operator must hold appropriate licenses.

## Overview

Build an original international money transfer and multi-currency account app inspired by Wise: upfront-fee transfers at mid-market FX + transparent margin, a multi-currency account with local account details in supported currencies, a debit card, and receive-from-payers flows.

The clone must use original copy and integrations. Mid-market FX quoting and fee transparency are the core differentiation and must be preserved.

This spec is Draft 1: surfaces ready; payout rails, local-account details, and card issuance remain behind regulatory review per jurisdiction.

## Goals

- Quote transfers at mid-market FX + explicit fee before user confirms.
- Support SWIFT and local rails (ACH, SEPA, Faster Payments, etc.) where available.
- Issue a multi-currency account with local account details (IBAN/routing/sort-code-equivalents) in supported currencies.
- Issue a debit card tied to the multi-currency balance.
- Support receive-from-payers invoicing and tagging.
- Meet KYC/AML, travel-rule, and sanctions-screening requirements per jurisdiction.

## Non-Goals

- Do not imply banking licenses the operator does not hold.
- Do not copy Wise trademarks, pricing copy, or disclosures.
- Do not obscure fees or FX margins.
- Do not support jurisdictions without a compliance path.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/wise-formerly-transferwise/id612261027 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.transferwise.android | Android features | Source discovery — pending exact URL verification |
| Product support | https://wise.com/help/ | Transfer behavior, local account details | Source discovery — pending exact URL verification |
| Legal & disclosures | https://wise.com/legal/ | Licensing disclosures references | Source discovery — pending exact URL verification |
| FX reference | https://www.bis.org/ | Mid-market reference rate education | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Mid-market FX + explicit fee shown before confirmation; no hidden margin.
- Transfers routed over fastest compliant rail per corridor; estimated arrival windows shown.
- Multi-currency balances with local account details where available by jurisdiction.
- Debit card linked to multi-currency balance with automatic currency selection at point of sale.
- Receive-from-payers via unique account details or payment links.
- Batch-payments (for business-like flows) optional later.
- KYC/AML gating per corridor; enhanced checks above thresholds.
- Transparent fees for receiving/sending in various rails.

## Core User Journeys

- New user signs up, completes KYC, and opens a home-currency balance.
- User quotes a transfer to a supported country/currency; sees mid-market rate, fee, and estimated arrival.
- User adds beneficiary with compliant fields, confirms transfer, and pays via card/bank.
- User opens additional currency balances; gets local account details for supported currencies.
- User orders a debit card; uses it abroad with automatic currency selection or manual conversion.
- User receives payment from a payer via local rails; funds arrive in appropriate currency balance.
- User cancels a pending transfer before it is sent; sees refund timing.
- User uploads additional KYC documents for enhanced review.
- User disputes a card transaction or reports fraud.
- User closes account; balances withdrawn or refunded.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Identity | name, DOB, ID doc | collecting, verified | denied, enhanced review |
| Home | Currency balances | navigation | empty, funded | corridor paused |
| Send Money | Quote, beneficiary, pay | amount, currency, beneficiary | quoted, submitting, sent | compliance hold, quote-expired |
| Beneficiaries | Manage | person/business data | saved, empty | invalid fields |
| Receive | Local account details, payment link | currency | available, unavailable | KYC gate |
| Cards | Controls, PIN | toggles | active, frozen, replaced | fraud hold |
| Activity | Transactions, filters | search | loaded, empty | pending |
| Transfer Detail | Status, arrival estimate | view | submitted, sent, arrived | delayed, returned |
| FX Quote | Rate + fee preview | amount | fresh, expired | rate-moved |
| Settings | Security, notifications | edits | loaded | MFA needed |
| Support | Cases | category | submitted, resolved | escalated |
| Statements | Docs | filter | loaded, empty | delayed |

## Data Model

- `User`: identity, tiered KYC, jurisdiction, tax residency.
- `CurrencyBalance`: currency, available, held, local-account-details ref.
- `LocalAccountDetails`: IBAN/routing/sort-code/etc. per currency.
- `Beneficiary`: name, bank, account info, address, relationship, compliance metadata.
- `Quote`: source/target currencies, mid-market rate, fee, expiry.
- `Transfer`: quote ref, rail, status lifecycle, estimated/actual arrival.
- `Card`: virtual/physical, controls, wallet provisioning.
- `CardTransaction`: amount, currency, conversion details.
- `PaymentRequest`: currency, amount, link, status.
- `ComplianceCase`: review state, requested docs, decision.
- `AuditEvent`: append-only compliance events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/start`, `POST /kyc/enhanced`, `GET /kyc/status`.
- `POST /quotes`, `GET /quotes/:id`.
- `POST /beneficiaries`, `PATCH /beneficiaries/:id`.
- `POST /transfers`, `GET /transfers/:id`, `DELETE /transfers/:id` (before send).
- `POST /balances`, `GET /balances`, `POST /balances/:currency/local-details`.
- `POST /cards`, `PATCH /cards/:id`, `POST /cards/:id/wallet`.
- `POST /payment-requests`, `GET /payment-requests/:id`.
- `GET /statements?period=`.
- `POST /support/cases`, `POST /disputes`.

## Realtime, Push, And Offline Behavior

- Quote freshness and expiry shown in UI; refresh via tap.
- Transfer status events push notifications at key milestones (submitted, sent, arrived, failed).
- Offline: read-only cache for balances and history, labeled stale.
- Push payloads never include full amounts/PII; class-level messaging only.

## Permissions, Privacy, And Safety

- Camera for ID capture; notifications; biometrics at point of use.
- KYC/AML/OFAC screening and travel-rule compliance per corridor.
- Enhanced KYC thresholds documented per jurisdiction.
- PII and IDs encrypted; redacted in analytics and support tooling.
- Fee and FX margin must always be visible before confirmation.
- Launch owners: compliance, regulatory affairs per jurisdiction, security, privacy.

## Analytics And Monetization

- Privacy-safe events only: onboarding, KYC classes, quote, transfer classes, card state changes, balance-open classes, payment-request classes.
- Monetization via transparent fees and FX margin; no hidden costs.
- Paywall states not applicable beyond tiered pricing for specific flows.

## Edge Cases

- Quote expired at confirmation; re-quote with explicit comparison.
- Compliance hold during transfer; extra docs requested.
- Sanctions match on beneficiary; transfer blocked with messaging.
- Receiving-bank rejects; automatic refund timing communicated.
- Local account details unavailable in some jurisdictions.
- Card declined due to balance or fraud; self-serve paths.
- Partial payment from payer (e.g., wire fees deducted by intermediary).
- Weekend/holiday timing affecting arrival estimates.
- User changes home currency.

## Test Plan

- KYC tiered flows per corridor.
- Quote/transfer idempotency and expiry.
- Rail routing selection tests (ACH/SEPA/SWIFT/etc.).
- Multi-currency account open and local-details assignment.
- Card lifecycle and POS currency selection.
- Receive flows including partial and over-payment.
- Refund and cancel-before-send flows.
- Compliance hold state machine.
- Statements and reporting.
- Privacy and analytics redaction.
- Accessibility.
- Manual verification: funded account across corridors and card use.

## Acceptance Criteria

- Mid-market FX + explicit fee shown before every transfer confirmation.
- Local account details issued only where jurisdictionally supported.
- Card flows and compliance holds are well-defined and testable.
- Receive flows reconcile correctly across rails.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which corridors and rails ship at launch?
- Which currencies get local account details in V1?
- Will V1 include card issuance in all launch jurisdictions?
- Will V1 support business accounts (batch payments, invoicing) or personal only?
- Which travel-rule framework applies to any crypto involvement (if any)?

## Build Plan

- Phase 1: auth, KYC, home-currency balance, mid-market quote/transfer over one corridor.
- Phase 2: additional currencies and local account details.
- Phase 3: additional rails (ACH, SEPA, SWIFT, etc.) and beneficiaries.
- Phase 4: debit card issuance and POS currency selection.
- Phase 5: receive-from-payers, payment requests.
- Phase 6: compliance, accessibility, manual verification.

## Next Steps

- Partner-bank and card-issuer RFPs per region.
- Legal and regulatory review per corridor.
- Replace discovery URLs with exact first-party URLs before implementation.
