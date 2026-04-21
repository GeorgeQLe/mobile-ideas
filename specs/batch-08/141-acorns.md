# Acorns-Style Clone Spec

> Metadata
> - Inspiration app: Acorns
> - Category: Micro-investing and banking
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help center articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: account opening KYC flows, linked-bank round-up cadence, portfolio rebalance cadence, debit-card purchase flows, and family/custodial account lifecycles require hands-on verification on a real funded account.
> - Legal scope: lawful functional parity only; original code, brand, copy, iconography, portfolio construction logic, and partner-bank/broker integrations. No proprietary fund/portfolio names or marketing copy.

## Overview

Build an original micro-investing mobile app inspired by Acorns' workflow: round-up-based recurring investments into a diversified portfolio, goal-based deposits, linked banking with debit card, retirement sub-accounts, and custodial child accounts.

The clone must not copy Acorns branding, screenshots, portfolio names, partner disclosures, or marketing copy. It must use original product language and first-party integrations with a regulated broker-dealer, custodian, and banking partner under original agreements.

This spec is Draft 1: product surfaces and data model are implementation-ready, while broker/bank partner integrations and KYC/AML flows remain behind a regulatory review gate until partner contracts and compliance sign-off land.

## Goals

- Provide a mobile-first round-up investing experience with linked-bank round-ups, recurring deposits, one-time deposits, and goal-based pacing.
- Offer model-based diversified portfolios without implying personalized investment advice.
- Support banking features (direct deposit, debit card, round-ups-from-card) through a regulated bank partner under original agreements.
- Offer retirement sub-account and custodial-for-minor account types under distinct suitability flows.
- Keep privacy, fraud, and KYC/AML controls auditable and recoverable across the customer lifecycle.

## Non-Goals

- Do not imply registered-investment-advisor or fiduciary status the operator does not actually hold.
- Do not reuse Acorns portfolios, disclosure copy, fund selection, or promotional language.
- Do not offer tax, legal, retirement, or personalized investment advice as authoritative output.
- Do not launch real-money flows before broker-dealer, bank, and compliance partners are contracted and reviewed.
- Do not onboard minors into adult investing accounts; custodial flows require explicit custodial gating.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/acorns-invest-spare-change/id883324671 | iOS features, category, age rating, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.acorns.android | Android features, data safety, content rating | Source discovery — pending exact URL verification |
| Product help center | https://www.acorns.com/support/ | Round-up cadence, portfolio types, account lifecycle | Source discovery — pending exact URL verification |
| Customer agreements | https://www.acorns.com/terms/ | Broker/bank disclosures, arbitration, custodial rules | Source discovery — pending exact URL verification |
| SEC advisor disclosures | https://adviserinfo.sec.gov/ | Regulated-entity disclosures referenced by app | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Users link one or more external bank accounts for funding and round-up aggregation.
- Round-ups from linked-card transactions accumulate until a threshold (for example, a small dollar amount) and are swept to the investing account.
- Users choose from a small set of model portfolios varying by risk; the app must describe portfolios with original labels and show generic asset-class allocations.
- Users can schedule recurring deposits (daily/weekly/monthly) and set goals (target amount, target date).
- Retirement sub-accounts (traditional/Roth/SEP-style analogues) are suitability-gated and must present original tax-treatment education.
- Custodial-for-minor accounts require the custodian to be the legal owner until the minor reaches majority; the minor's profile must be data-minimized.
- Banking checking features require a bank partner; the app must surface FDIC coverage via the partner and never imply first-party FDIC insurance.
- Debit-card round-ups complement bank-linked round-ups and must reconcile against swept amounts to avoid double counting.
- Fees must be presented clearly with the subscription or per-transaction schedule in original copy.

## Core User Journeys

- New user signs up, completes KYC (identity verification, SSN/tax-id collection where required), links a funding bank, selects a portfolio, and funds the first deposit.
- User enables round-ups on linked cards, sees pending round-ups, and watches a sweep execute when threshold is reached.
- User schedules a recurring deposit and later edits cadence or pauses during a cash crunch.
- User creates a goal with a target amount and date, and receives pacing nudges without manipulative copy.
- User opens a retirement sub-account, confirms suitability, selects a sub-portfolio, and completes a first contribution within contribution-limit checks.
- Custodial parent opens a minor account, names a beneficiary, funds it, and manages allocations until minor reaches majority.
- User applies for the banking checking account, receives a debit card, sets up direct deposit, and uses it for card-based round-ups.
- User withdraws funds to an external bank, sees trade-settlement delay, and is warned about potential market impact and tax events.
- User cancels the subscription, consents to position liquidation or transfer, and completes account closure with audit events.
- User disputes a transaction (banking side) or reports unauthorized access; case lifecycle is tracked.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/KYC | Onboarding, identity verification, consent | name, address, SSN/tax-id, DOB | collecting, verifying, approved, manual-review | denied, restricted state, underage |
| Home Dashboard | Portfolio balance, pending round-ups, next deposit | navigation, quick actions | empty, funded, negative-day | market-closed, data stale, account-frozen |
| Portfolio Picker | Select model portfolio, view allocations | risk preference, confirm | default, switched, in-progress switch | switch blocked, unsuitable for retirement |
| Round-Ups Config | Link cards, toggle round-ups, set multiplier | card selection, multiplier | on, off, paused | linking failed, reauth needed, card expired |
| Recurring Deposits | Set cadence and amount | cadence, amount, start-date | active, paused, canceled | insufficient funds, bank-link broken |
| Goals | Create and track goals | target amount, target date | on-track, behind, complete | unrealistic goal warning |
| Retirement Sub-Account | Open/manage IRA-equivalent | type selection, contributions | eligible, contributing, at-limit | over-limit, ineligible, closed |
| Custodial Account | Open/manage minor's account | custodian, beneficiary | active, transferring at majority | custodian eligibility issue |
| Banking/Card | Checking features, debit card | funding, card controls | active, locked, replaced | card fraud hold, partner outage |
| Activity & Statements | Transactions, tax docs | filter, download | loaded, empty, pending docs | doc generation delayed |
| Profile & Settings | KYC updates, subscription, security | edits, toggles | default, MFA-enabled | locked-out, identity re-verification |
| Support & Disputes | Help and case filing | category, description | submitted, in-review, resolved | escalated, rejected |

## Data Model

- `User`: identity, auth, KYC state, CIP evidence, risk profile, tax residency, locale.
- `ExternalBankLink`: aggregator token, masked account, status, reauth state, ACH micro-deposit state.
- `Card`: card network, masked PAN, issuer, round-up enabled, last4, expiry.
- `InvestmentAccount`: type (`taxable` | `ira_traditional` | `ira_roth` | `custodial`), status, model-portfolio id, cash balance, positions summary.
- `BankAccount`: checking/savings partner-backed account, routing masked, card id, direct-deposit status.
- `RoundUp`: source transaction id (hash), amount, accumulated bucket state, sweep id.
- `Sweep`: aggregate round-ups, initiated/settled timestamps, ACH id, status.
- `RecurringDeposit`: cadence, amount, next-run-at, paused state.
- `Goal`: target amount, target date, progress, allocation pointer.
- `Trade`: order id, side, quantity, price, status, settlement date, corporate-action flags.
- `Subscription`: plan key, features, renewal, cancellation, grace period.
- `AuditEvent`: append-only KYC, account, suitability, funds-movement, and disclosure acknowledgements.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`, `DELETE /auth/session`: session lifecycle with MFA enforcement for funds movement.
- `POST /kyc/start`, `POST /kyc/documents`, `GET /kyc/status`: identity verification with retry and manual-review branches.
- `POST /bank-links`, `GET /bank-links`, `POST /bank-links/:id/reauth`, `DELETE /bank-links/:id`: aggregator-backed linking.
- `POST /cards`, `PATCH /cards/:id`, `DELETE /cards/:id`: linked-card management for round-ups.
- `POST /accounts/investment`, `GET /accounts/investment/:id`, `PATCH /accounts/investment/:id`: account open, portfolio select, suitability updates.
- `POST /accounts/banking`, `POST /accounts/banking/card`, `PATCH /accounts/banking/card`: partner-bank account and card controls.
- `POST /deposits`, `POST /withdrawals`, `GET /transfers?cursor=`: funds-movement orchestration with idempotency keys.
- `GET /roundups/pending`, `POST /roundups/sweep-now`: aggregation and manual sweep.
- `POST /goals`, `PATCH /goals/:id`, `DELETE /goals/:id`: goal lifecycle.
- `GET /trades`, `GET /positions`, `GET /statements?year=`: reporting and tax documents.
- `POST /billing/subscribe`, `POST /billing/cancel`, `POST /billing/webhook`: subscription with server-side truth.
- `POST /support/cases`, `POST /disputes`: support and Reg E-style dispute intake.

## Realtime, Push, And Offline Behavior

- Market data and balance reads must tolerate market-closed states and stale caches labeled explicitly as delayed.
- Transfer status, trade fills, and settlement events must stream via server-sent events or webhook-driven polling with idempotent client reconciliation.
- Sensitive actions (funds movement, beneficiary changes, payout) require re-auth/MFA and are never cached offline.
- Local state is limited to read-only summaries; pending forms can be drafted offline but never submitted until reconnect.
- Push notifications cover sweep completion, deposit failure, card fraud, KYC next steps, statements ready, and security alerts. Payload must not include PII or balances.

## Permissions, Privacy, And Safety

- Device permissions (camera for ID capture, notifications, biometrics) are requested only at point of use.
- SSN/tax-id is encrypted at rest with restricted access, never logged in analytics, and redacted in support tooling.
- KYC/AML program: CIP, OFAC screening, ongoing monitoring, SAR workflow readiness.
- Suitability for retirement and custodial accounts must be explicitly captured with disclosures acknowledged.
- No investment advice; all educational content must include originality and not-advice disclaimers.
- Banking partner disclosures (including FDIC pass-through through the partner) must be presented accurately without implying first-party insurance.
- Launch owners: compliance, security, privacy, and regulatory-affairs leads must each sign off.

## Analytics And Monetization

- Privacy-safe events only: onboarding step transitions, KYC decision classes, link-bank status classes, round-up sweep completion classes, deposit/withdrawal classes, portfolio-switch, subscription state changes, support/dispute classes.
- Monetization via original subscription tiers and/or interchange from the banking partner under contract.
- No manipulative paywalls; paywall states must surface feature, plan, price, cancel path, and partner disclosures.
- Never correlate analytics events with raw transaction descriptions or counterparty names.

## Edge Cases

- KYC manual review, duplicate SSN, sanctioned or restricted jurisdiction, address mismatch, under-18 adult-account attempt.
- Linked-bank reauth required mid-sweep, ACH return, NSF, micro-deposit mismatch.
- Market holiday or halted security delaying trade settlement; partial fills; fractional-share corporate actions.
- Round-up double-count from debit card round-up overlapping bank-linked round-up on same transaction.
- Retirement over-contribution, excess-contribution correction, ineligible account type.
- Custodial account where the minor reaches majority and refuses transfer; custodian death/incapacity.
- Banking card lost/stolen, Reg E dispute, chargeback, skimming compromise.
- Subscription cancel with open positions; transfer-out (ACATS-equivalent) to external broker.
- App store subscription restore mismatch, refund, trial abuse.

## Test Plan

- KYC state-machine tests across verified, denied, manual review, and reapply paths.
- Bank-linking tests: success, reauth, micro-deposit, disconnection, aggregator outage.
- Round-up accumulation and sweep tests with deterministic fixtures and double-entry ledger reconciliation.
- Recurring deposit and goal pacing tests across timezones and market holidays.
- Portfolio switch tests with rebalance simulation, fractional-share edge cases.
- Retirement contribution-limit tests per tax year and per account type.
- Custodial lifecycle tests including coming-of-age transfer.
- Banking/debit-card tests for activation, lock, fraud, and disputes.
- Billing tests for subscription lifecycle and webhook reconciliation.
- Privacy tests for PII redaction in analytics and support tooling.
- Accessibility tests for dynamic type, screen reader, focus order on forms.
- Manual verification: real funded account walkthrough for round-ups, sweeps, trades, statements, tax docs.

## Acceptance Criteria

- Users cannot move real money until KYC, suitability, and partner-side approvals have completed.
- Round-up, sweep, deposit, withdrawal, trade, and statement flows reconcile on a double-entry ledger with full audit events.
- Portfolio switches, goal changes, and subscription changes are logged and reversible where regulation requires.
- All educational copy passes a "not investment advice" review.
- Banking disclosures reflect the partner and FDIC pass-through accurately.
- Manual verification blockers are resolved or feature-flagged off before launch.

## Open Questions

- Which broker-dealer, custodian, and banking partner will back real-money flows?
- Which round-up sources (aggregator transactions vs. card-network authorization feed) will V1 use?
- Will V1 support retirement and custodial accounts, or ship taxable only first?
- How are referral bonuses (if any) funded and disclosed?
- What jurisdictions does V1 support (US-only vs multi-region), and what are tax-residency edges?

## Build Plan

- Phase 1: auth, KYC scaffolding, bank linking, taxable investment account, model portfolios, first deposit.
- Phase 2: round-ups, sweeps, recurring deposits, goals, statements.
- Phase 3: retirement sub-accounts with suitability and contribution controls.
- Phase 4: banking partner, debit card, direct deposit, card-based round-ups.
- Phase 5: custodial-for-minor, tax documents, transfer-out.
- Phase 6: subscription, support/disputes, compliance audit, accessibility, manual verification.

## Next Steps

- Engage broker-dealer, custodian, and banking partner RFPs.
- Finalize KYC/AML program with compliance counsel.
- Replace source-discovery URLs with exact first-party URLs and regulatory filings before implementation.
