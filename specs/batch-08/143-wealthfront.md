# Wealthfront-Style Clone Spec

> Metadata
> - Inspiration app: Wealthfront
> - Category: Robo-advisor, cash account, planning
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: automated portfolio construction, tax-loss harvesting, bond-ladder mechanics, and partner-bank cash account flows require hands-on verification on a funded account.
> - Legal scope: lawful functional parity only; original code, brand, copy, portfolio logic, and partner-broker/bank integrations. No proprietary strategy names or disclosure copy.

## Overview

Build an original automated-investing and cash-management app inspired by Wealthfront's workflow: automated diversified portfolios, tax-loss harvesting (taxable accounts), bond-ladder strategies for cash, a partner-bank cash account with fund sweeps, and financial-planning tooling.

The clone must use original product language and first-party broker/bank integrations. It must not imply personalized investment advice beyond the operator's actual RIA registration (if any) and must not copy Wealthfront disclosures.

This spec is Draft 1: product surfaces are ready; automated-strategy, TLH, and bond-ladder mechanics plus the cash-account sweep remain behind a regulatory review gate.

## Goals

- Offer automated model portfolios and periodic rebalancing.
- Offer automated tax-loss harvesting for taxable accounts with wash-sale avoidance logic.
- Offer a bond-ladder strategy for yield-seeking cash, with maturity-laddered treasury-type instruments (via partner-broker) disclosed accurately.
- Offer a partner-bank cash account with FDIC pass-through sweep and competitive APY disclosed as variable.
- Offer financial-planning flows (retirement, home purchase, college).
- Keep the RIA relationship, tax treatment, and fee structure transparent.

## Non-Goals

- Do not imply RIA/fiduciary status the operator does not hold.
- Do not copy Wealthfront strategy names, graphics, or marketing copy.
- Do not offer legal or tax advice; surface "consult a tax advisor" throughout.
- Do not launch automated strategies before partner-broker, partner-bank, and compliance sign-off.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/wealthfront/id419344152 | iOS features, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.wealthfront | Android features, data safety | Source discovery — pending exact URL verification |
| Product support | https://support.wealthfront.com/ | Portfolio, TLH, bond ladder, cash account | Source discovery — pending exact URL verification |
| Legal & disclosures | https://www.wealthfront.com/legal | Regulatory disclosures referenced | Source discovery — pending exact URL verification |
| SEC adviser filings | https://adviserinfo.sec.gov/ | RIA registration references | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Automated portfolios with risk-based allocations and periodic rebalancing.
- Tax-loss harvesting at the lot level with wash-sale detection across accounts the operator can observe.
- Bond-ladder strategy using short-duration treasury-type instruments laddered by maturity; yields shown as variable and not guaranteed.
- Partner-bank cash account with FDIC pass-through via multi-bank sweep; APY shown as variable.
- Planning tools for retirement, home purchase, and college goals; Monte-Carlo-style projections labeled as estimates.
- Retirement sub-accounts (IRA-equivalents) and trust-type accounts require suitability gating.
- ACH transfers between cash account and investment account with same-day limits disclosed.

## Core User Journeys

- New user completes KYC, risk survey, and opens a taxable account or cash account.
- User funds the account and sees initial portfolio construction with rebalance preview.
- TLH runs automatically; user sees realized-loss estimates and wash-sale-aware trades.
- User opens bond-ladder strategy and sees laddered maturities; rolls maturities automatically.
- User opens the cash account, funds it, and uses ACH pull/push; observes APY accrual.
- User opens a retirement sub-account, confirms suitability, contributes within limits.
- User runs a planning scenario (retirement, home, college) with goal-specific inputs.
- User withdraws to an external bank; sees settlement timing.
- User receives tax documents and statements.
- User cancels or closes account; transfer-out is supported.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Identity, risk, disclosures | name, DOB, SSN, risk survey | collecting, verified, approved | denied, manual review |
| Home | Portfolios, cash, goals | navigation | empty, invested | market-closed, data stale |
| Portfolio Detail | Allocations, rebalance, TLH | adjustments | default, custom-tilt | restricted lots |
| Bond Ladder | Maturities, roll settings | amount, horizon | active, maturing | rate-change impact |
| Cash Account | Balance, APY, transfers | ACH in/out, card (if any) | active, locked | partner outage |
| Planning | Goals and projections | goal inputs | on-track, behind | unrealistic goal warning |
| Retirement Account | IRA open/manage | type, contribution | eligible, at-limit | over-limit |
| Transfers | ACH in/out | amount, direction | pending, settled | NSF, return |
| Statements & Tax | Docs download | filter | loaded, empty | docs delayed |
| Settings | Security, profile | edits | loaded | MFA needed |
| Support | Cases | category | submitted, resolved | escalated |
| Subscription/Fees | Fee disclosures | view-only | loaded | disclosure mismatch |

## Data Model

- `User`: identity, KYC, risk profile, tax residency.
- `InvestmentAccount`: type, target allocation, rebalance policy.
- `Position`: security id, lots with cost basis and acquisition dates.
- `RebalancePlan`: trades, reasons, TLH-flag.
- `TLHEvent`: replaced pair, realized loss estimate, wash-sale check status.
- `BondLadder`: rungs (maturity buckets), roll policy.
- `CashAccount`: partner-bank account refs, sweep banks, APY state, balance.
- `Transfer`: ACH direction, amount, status, return code.
- `Goal`: retirement/home/college inputs, projection state.
- `RetirementAccount`: sub-type, contributions ledger.
- `Statement`, `TaxDocument`: periodic documents.
- `AuditEvent`: append-only compliance events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/start`, `GET /kyc/status`.
- `POST /accounts/investment`, `PATCH /accounts/investment/:id`.
- `GET /portfolios/:id`, `POST /portfolios/:id/rebalance` (admin-internal), `GET /portfolios/:id/allocations`.
- `GET /tlh/events`, `POST /tlh/opt` (opt-in/out).
- `POST /ladders`, `PATCH /ladders/:id`, `GET /ladders/:id/rungs`.
- `POST /accounts/cash`, `GET /accounts/cash/:id`, `POST /transfers`, `GET /transfers?cursor=`.
- `POST /goals`, `PATCH /goals/:id`, `GET /projections/:goal_id`.
- `POST /retirement/contributions`, `GET /retirement/limits`.
- `GET /statements`, `GET /tax-documents`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Rebalance and TLH run as server jobs; clients see updates via SSE/webhook-driven polling with idempotent reconciliation.
- Cash-account APY and sweep-bank roster updates are surfaced with effective dates.
- Offline shows read-only cached balances labeled with staleness.
- Push covers rebalance completion, TLH realized-loss summaries (amounts not in payload), transfer status, statements ready, security alerts.

## Permissions, Privacy, And Safety

- Camera for ID capture, notifications, biometrics requested at point of use.
- SSN/tax-id encrypted, redacted in analytics and support tooling.
- KYC/AML/OFAC via partner-broker and partner-bank.
- Market-data and research-data licensing enforced.
- Wash-sale logic must consider observable accounts at the operator; disclose unobservable account risk.
- FDIC pass-through accuracy for cash-account disclosures.
- Planning projections labeled as estimates, not guarantees.
- Launch owners: compliance, RIA operations, security, privacy.

## Analytics And Monetization

- Privacy-safe events only: onboarding, KYC classes, rebalance completion classes, TLH event classes (no amounts), transfer classes, goal creation/updates, cash-account APY change awareness, support classes.
- Monetization via advisory fee on managed investment accounts (transparent bps) and interest-margin or partner economics on cash.
- No paywall manipulation; fee disclosures are always accessible.
- No correlation between analytics events and raw security identifiers where sensitive.

## Edge Cases

- Wash-sale across spouse/external accounts unobservable to operator; disclose the limit.
- Bond-ladder roll during rate spikes; insufficient liquidity.
- Cash-account sweep-bank outage; FDIC cap reached per bank.
- Partial ACATS transfer-out with managed-account restrictions.
- Retirement rollover with conflicting tax-year contributions.
- Large withdrawal during rebalance lock period.
- Corporate actions affecting TLH pairs.
- Goal projections with unrealistic inputs; mandatory warnings.

## Test Plan

- KYC and suitability flows.
- Rebalance-plan correctness under varied allocations and tax lots.
- TLH wash-sale detection across observable accounts; replacement-pair selection.
- Bond-ladder roll and maturity scheduling.
- Cash-account sweep reconciliation and APY change propagation.
- ACH in/out with NSF, return, and idempotency.
- Retirement contribution-limit enforcement.
- Planning projections with boundary inputs.
- Statement/tax-doc generation and delivery.
- Privacy and analytics redaction tests.
- Accessibility tests across forms and charts.
- Manual verification: funded account end-to-end for each strategy.

## Acceptance Criteria

- Automated strategies are gated by compliance and partner approvals.
- TLH and rebalance actions are idempotent, audited, and reconciled with ledger and partner-broker.
- Cash account discloses FDIC pass-through and APY variability accurately.
- Planning UIs label projections as estimates, not guarantees.
- Transfer-out and account closure paths exist.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which partner-broker, custodian, and partner-bank will back V1?
- Will V1 ship TLH at launch or behind a later phase?
- What bond-ladder instruments does V1 support and through which custodian?
- Which jurisdictions are supported; does V1 handle non-US tax residents?
- Will V1 offer direct indexing or stock-level tilts?

## Build Plan

- Phase 1: auth, KYC, taxable investment account, basic portfolios, rebalance.
- Phase 2: tax-loss harvesting with wash-sale logic.
- Phase 3: partner-bank cash account, ACH transfers, sweep disclosures.
- Phase 4: bond-ladder strategy and maturity rolls.
- Phase 5: retirement accounts and planning tools.
- Phase 6: statements/tax docs, support, compliance, accessibility, manual verification.

## Next Steps

- Broker-dealer, custodian, and bank partner RFPs.
- Legal review of strategy disclosures and RIA registration.
- Replace discovery URLs with exact first-party URLs before implementation.
