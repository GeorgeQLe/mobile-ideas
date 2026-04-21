# Betterment-Style Clone Spec

> Metadata
> - Inspiration app: Betterment
> - Category: Robo-advisor, goals, cash reserve
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: goal-based portfolio construction, rebalancing cadence, socially-responsible portfolio mechanics, cash-reserve sweep flows, and IRA flows require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, portfolio logic, and partner-broker/bank integrations. No proprietary portfolio names or disclosure copy.

## Overview

Build an original goal-based robo-advisor app inspired by Betterment's workflow: goal-first onboarding, diversified model portfolios with alternate focuses (e.g., socially-responsible), IRAs (traditional/Roth/SEP-equivalents), automated rebalancing and tax-aware behavior, and a partner-bank cash reserve product.

The clone must use original product language and first-party broker/bank integrations. It must not imply personalized investment advice beyond the operator's actual RIA registration.

This spec is Draft 1: surfaces ready; automated portfolios, IRA lifecycle, and cash reserve remain behind regulatory review.

## Goals

- Offer goal-based accounts (retirement, safety net, major purchase, general) with recommended allocations.
- Offer multiple portfolio flavors including a socially-responsible/ESG-style option, each with original labels and transparent holdings.
- Offer automated rebalancing and tax-aware buy/sell behaviors.
- Offer IRA account types with suitability and contribution-limit controls.
- Offer a partner-bank cash reserve with FDIC pass-through via sweep.

## Non-Goals

- Do not imply RIA/fiduciary status the operator does not hold.
- Do not copy Betterment portfolio names, graphics, or marketing copy.
- Do not launch automated strategies before broker/bank/compliance sign-off.
- Do not offer tax or legal advice as authoritative.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/betterment/id491421198 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.betterment | Android features | Source discovery — pending exact URL verification |
| Product support | https://www.betterment.com/resources/ | Features reference | Source discovery — pending exact URL verification |
| Legal & disclosures | https://www.betterment.com/legal | Disclosure references | Source discovery — pending exact URL verification |
| SEC adviser filings | https://adviserinfo.sec.gov/ | RIA registration references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Goal-based onboarding with recommended portfolios per goal and horizon.
- Multiple portfolio "flavors" (core, ESG-style, income-oriented) with original labels and transparent fund-level holdings.
- Automated rebalancing triggered by drift thresholds or cash flows.
- Tax-aware buy/sell selection at the lot level where applicable.
- IRA sub-accounts with traditional/Roth/SEP-equivalents; suitability and contribution-limit checks.
- Cash reserve via partner bank with FDIC pass-through sweep and variable APY.
- Direct deposit into cash reserve supported via partner.
- Advisory fee structure disclosed transparently (bps-based).

## Core User Journeys

- New user completes KYC, risk survey, picks a goal, selects a portfolio flavor, and funds.
- User schedules recurring deposits and sees goal pacing.
- Drift rebalance triggers; user sees explanatory UI.
- User opens IRA with suitability and contributes within limits.
- User opens cash reserve, funds it, and transfers to/from investment account.
- User changes portfolio flavor; sees tax-cost preview and confirms.
- User withdraws to external bank; sees settlement and potential tax consequences.
- User downloads statements and tax documents.
- User cancels subscription and/or transfers out (ACATS-equivalent).
- User manages beneficiaries and trusted contacts.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Identity, goal selection | name, DOB, SSN, goal | collecting, verified | denied, manual review |
| Home/Goals | Goals and balances | navigation | empty, funded | stale data |
| Goal Detail | Allocation, pacing, actions | deposit, withdraw | on-track, behind | unrealistic goal |
| Portfolio Picker | Core vs ESG-style etc. | flavor selection | default, switched | tax-cost warn |
| Rebalance History | Drift events, trades | filter | loaded, empty | market-closed |
| IRA Account | Open/manage | type, contribution | eligible, at-limit | over-limit |
| Cash Reserve | Balance, APY, transfers | ACH in/out | active, locked | partner outage |
| Transfers | ACH in/out | amount, direction | pending, settled | NSF, return |
| Statements & Tax | Docs | filter | loaded, empty | delayed |
| Beneficiaries | Manage beneficiaries | entries | saved, empty | eligibility issue |
| Settings | Security, notifications | edits | loaded | MFA needed |
| Support | Cases | category | submitted | escalated |

## Data Model

- `User`: identity, KYC, risk profile, tax residency.
- `Goal`: type, target amount/date, horizon, linked accounts.
- `InvestmentAccount`: goal ref, portfolio flavor, rebalance policy.
- `Position`: security id, lots with cost basis.
- `RebalancePlan`: trades, drift-reasons, tax-awareness flags.
- `IRAAccount`: sub-type, contribution-year ledger.
- `CashReserve`: partner-bank refs, sweep banks, APY.
- `Transfer`: ACH direction, amount, status.
- `Beneficiary`: person or trust, allocation pct.
- `Statement`, `TaxDocument`.
- `AuditEvent`: append-only.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/start`, `GET /kyc/status`.
- `POST /goals`, `PATCH /goals/:id`, `DELETE /goals/:id`.
- `POST /accounts/investment`, `PATCH /accounts/investment/:id`.
- `GET /portfolios/flavors`, `PATCH /accounts/investment/:id/flavor`.
- `POST /rebalance/preview`, `POST /rebalance/execute` (internal).
- `POST /accounts/ira`, `POST /ira/contributions`, `GET /ira/limits`.
- `POST /accounts/cash`, `POST /transfers`, `GET /transfers?cursor=`.
- `POST /beneficiaries`, `PATCH /beneficiaries/:id`.
- `GET /statements`, `GET /tax-documents`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Rebalance and trade execution run as server jobs; clients get SSE/webhook-driven status.
- Cash-reserve APY and sweep-bank list changes surface with effective dates.
- Offline shows stale-labeled read-only balances.
- Push covers rebalance completion, IRA next steps, transfer status, statements ready, security alerts.

## Permissions, Privacy, And Safety

- Camera/notifications/biometrics requested at point of use.
- SSN/tax-id encrypted, redacted in analytics and support tooling.
- KYC/AML/OFAC via partner-broker and partner-bank.
- Market-data licensing respected.
- IRA suitability and contribution-limit enforcement.
- FDIC pass-through disclosures for cash reserve.
- Launch owners: compliance, RIA operations, security, privacy.

## Analytics And Monetization

- Privacy-safe events: onboarding transitions, KYC classes, goal creation, deposit/withdrawal classes, rebalance classes, IRA contributions (class only, not amount), subscription changes.
- Monetization via advisory fee on managed assets and partner economics on cash reserve.
- Fee disclosures always accessible; no manipulative paywalls.

## Edge Cases

- Portfolio-flavor switch creating large tax impact; confirmation and cost preview required.
- Drift rebalance during thin-liquidity day.
- Cash-reserve sweep-bank FDIC cap reached; automatic re-allocation across banks.
- IRA contribution across tax years with ambiguous date; default to earliest year with explicit confirmation.
- Beneficiary eligibility issues (minors, trusts).
- Partial ACATS during transfer-out.
- ACH return mid-rebalance; partial fills.

## Test Plan

- KYC, goal, and suitability flows.
- Rebalance correctness across drift thresholds and deposits.
- Portfolio-flavor switch with tax-cost preview and confirmation.
- IRA contribution-limit enforcement and tax-year handling.
- Cash-reserve sweep reconciliation and APY changes.
- ACH in/out with NSF, return, idempotency.
- Beneficiary allocation sum must equal 100% constraints.
- Statement/tax-doc generation.
- Privacy and analytics redaction.
- Accessibility tests.
- Manual verification: funded account end-to-end.

## Acceptance Criteria

- Goal-based accounts, portfolio flavors, IRAs, and cash reserve all gated by compliance and partner approvals.
- Rebalances are idempotent, audited, and reconciled against broker records.
- Portfolio-flavor switch preview includes tax cost where applicable.
- Transfer-out and account closure paths exist.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which partner-broker, custodian, and partner-bank will back V1?
- Which portfolio flavors ship at launch?
- Does V1 support SEP/SIMPLE IRA or only traditional/Roth?
- Which jurisdictions supported; non-US tax residents?
- Direct-indexing or stock tilts in V1 or later?

## Build Plan

- Phase 1: auth, KYC, goals, taxable investment account, core portfolio.
- Phase 2: ESG/alternative portfolio flavors and switching.
- Phase 3: IRAs with suitability and contribution limits.
- Phase 4: cash reserve with sweep and transfers.
- Phase 5: rebalance/tax-aware logic hardening.
- Phase 6: statements, support, compliance, accessibility, manual verification.

## Next Steps

- Partner RFPs and RIA legal review.
- Replace discovery URLs with exact first-party URLs before implementation.
- Stand up compliance audit program before any real-money flow.
