# Stash-Style Clone Spec

> Metadata
> - Inspiration app: Stash
> - Category: Investing, fractional shares, banking
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: KYC approval, fractional order routing, card-rewards-to-stock mechanics, retirement suitability, custodial gating, and partner-bank debit flows require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, portfolio logic, and partner-broker/bank integrations. No proprietary theme/portfolio names or marketing copy.

## Overview

Build an original fractional-investing and banking app inspired by Stash's workflow: guided onboarding, fractional single-stock and ETF purchases, themed education, recurring investments, retirement sub-accounts, a debit-card-linked stock-rewards program, and custodial accounts for minors.

The clone must not copy Stash branding, screenshots, themed portfolio names, disclosures, or marketing copy. Use original product language and first-party broker/bank partner integrations.

This spec is Draft 1: product surfaces and data model are ready; broker-dealer, custodian, and banking partners, plus the card-rewards mechanic, remain behind a regulatory review gate.

## Goals

- Enable fractional buying and selling of single stocks and ETFs with clear order-routing disclosures.
- Support recurring investments (Auto-Invest-equivalent) with per-security schedules.
- Offer a stock-rewards debit card where card purchases trigger rewards allocated into user-chosen securities or a default.
- Offer retirement sub-accounts and custodial-for-minor accounts with suitability gating.
- Provide original educational content without implying personalized advice.

## Non-Goals

- Do not use Stash's themed names, rewards branding, or marketing copy.
- Do not imply registered-investment-advisor status the operator does not hold.
- Do not ship offer-based or contest-based mechanics that violate securities marketing rules.
- Do not treat stock rewards as risk-free; disclosures must apply.
- Do not launch real-money flows before partner contracts and compliance sign-off.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/stash-invest-save-bank/id930478006 | iOS features, category, privacy labels | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.stash.stash | Android features, data safety | Source discovery — pending exact URL verification |
| Product help center | https://www.stash.com/support | Feature surface, card rewards, retirement, custodial | Source discovery — pending exact URL verification |
| Customer agreements | https://www.stash.com/legal | Broker/bank disclosures | Source discovery — pending exact URL verification |
| SEC regulatory filings | https://adviserinfo.sec.gov/ | Regulated entity filings | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Fractional equity and ETF trading with minimum-notional checks and market-hour routing.
- Auto-Invest-equivalent recurring schedules (per-security or per-portfolio) with pause/resume.
- Debit-card program issued by a bank partner; card spending triggers rewards in fractional shares.
- Rewards must be funded by the operator and not framed as investment returns; disclosures required.
- Retirement sub-accounts (IRA-equivalents) with contribution-limit enforcement.
- Custodial-for-minor accounts with eligibility, beneficiary, and transfer-at-majority handling.
- Subscription tiers determine features (e.g., account types available, tooling, statements).
- Original educational content library; no claims of personalized advice.

## Core User Journeys

- User completes onboarding with KYC, risk questionnaire, and subscription selection.
- User funds an account, browses generic themes/categories, and buys a fractional share.
- User sets up Auto-Invest for a chosen security with cadence and amount.
- User applies for the banking partner's debit card and opts into stock rewards, choosing a default reward target.
- User spends on the card and sees reward fulfillment in their investment account after the defined cycle.
- User opens a retirement sub-account with suitability checks and makes a contribution within annual limits.
- User opens a custodial account for a minor, names beneficiary, and manages allocations.
- User reviews statements, tax documents, and activity; updates settings or subscription.
- User liquidates positions, initiates a withdrawal, and sees settlement delays explained.
- User transfers out (ACATS-equivalent) to an external broker, or closes account.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Identity, suitability, subscription | name, DOB, SSN, risk survey | collecting, verifying, approved | denied, manual review, ineligible |
| Home | Overview, watchlist, quick actions | navigation, quick invest | empty, invested, market-closed | degraded market data |
| Browse Securities | Search stocks/ETFs, categories | query, filters | results, empty, loading | listing restricted, paused |
| Security Detail | Price, fundamentals, trade | buy/sell, amount | buyable, not-orderable, halted | after-hours, fractional-min not met |
| Order Ticket | Place buy/sell | notional/share input | preview, submitting, filled | partial fill, rejected |
| Auto-Invest | Recurring schedules | cadence, amount, security | active, paused, canceled | funding fail, security delisted |
| Card & Rewards | Card controls, reward target | default target, toggles | active, locked, replaced | partner outage, card fraud |
| Retirement Sub-Account | IRA open/manage | type, contribution | eligible, at-limit | over-limit, ineligible |
| Custodial Account | Minor account manage | custodian, beneficiary | active, transferring | majority reached, custodian issue |
| Activity & Statements | Transactions, docs | filter, download | loaded, empty, pending | docs delayed |
| Settings & Subscription | Plan, security, notifications | edits, MFA | loaded, locked | verification needed |
| Support & Disputes | Help and cases | category, description | submitted, resolved | rejected, escalated |

## Data Model

- `User`: identity, KYC, risk profile, tax residency, subscription id.
- `InvestmentAccount`: type, partner-broker id, cash balance, positions summary.
- `Position`: security id, quantity (fractional), cost basis lots.
- `Order`: side, notional/shares, status, route, fills, rejection reason.
- `AutoInvest`: schedule, security/portfolio pointer, amount, state.
- `BankingAccount`: partner-issued checking account reference.
- `RewardsCard`: card id, rewards default target, rewards-cycle state.
- `RewardEvent`: source transaction hash, computed reward amount, fulfillment trade id.
- `RetirementAccount`: sub-type, contribution-year ledger.
- `CustodialAccount`: custodian, beneficiary, majority date.
- `Subscription`: plan key, features, billing.
- `AuditEvent`: append-only compliance events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`: session and MFA.
- `POST /kyc/start`, `POST /kyc/documents`, `GET /kyc/status`.
- `POST /accounts/investment`, `GET /accounts/investment/:id`, `PATCH /accounts/investment/:id`.
- `GET /securities?query=`, `GET /securities/:id`, `GET /securities/:id/quote`.
- `POST /orders`, `GET /orders/:id`, `DELETE /orders/:id` (where allowed).
- `POST /autoinvest`, `PATCH /autoinvest/:id`, `DELETE /autoinvest/:id`.
- `POST /accounts/banking`, `POST /cards`, `PATCH /cards/:id`, `POST /cards/:id/reward-target`.
- `POST /rewards/reconcile` (internal), `GET /rewards/history`.
- `POST /retirement/contributions`, `GET /retirement/limits`.
- `POST /custodial`, `PATCH /custodial/:id`, `POST /custodial/:id/transfer-at-majority`.
- `GET /statements?year=`, `GET /tax-documents`.
- `POST /billing/subscribe`, `POST /billing/cancel`, `POST /billing/webhook`.

## Realtime, Push, And Offline Behavior

- Quotes must honor market-data licensing; clearly label real-time vs. delayed.
- Order status streams (fills, rejections) via SSE/webhook with idempotent reconciliation.
- Card authorizations update balance and rewards-accrual state in near real-time.
- Offline allows only read-only views and drafted (not submitted) orders.
- Push covers order fills, card alerts, statements, KYC next steps; no PII in payloads.

## Permissions, Privacy, And Safety

- Camera for ID capture, notifications, biometrics requested at point of use.
- SSN/tax-id encrypted, never logged in analytics, redacted in support tooling.
- KYC/AML, OFAC screening, ongoing monitoring, SAR readiness via partner.
- Market-data license compliance; redistribution rules.
- Disclosures for fractional rounding, rewards funding, retirement tax treatment.
- Banking partner disclosures, FDIC pass-through accuracy.
- Launch owners: compliance, security, privacy, regulatory-affairs sign off.

## Analytics And Monetization

- Privacy-safe events only: onboarding transitions, KYC classes, order submission classes, auto-invest changes, rewards-cycle completion classes, subscription changes, support classes.
- Monetization via subscription tiers and interchange on partner card.
- Paywall states must show feature, plan, price, cancel path, disclosures.
- No correlation between analytics and raw transaction descriptions.

## Edge Cases

- Fractional order below minimum notional, halted security, after-hours, delisted holdings.
- Reward calculation for refunded card transactions (clawback), merchant disputes.
- Retirement over-contribution, excess-contribution correction.
- Custodial transfer-at-majority disputes; custodian incapacity.
- Auto-Invest funding fail, security delisted mid-schedule.
- Subscription downgrade blocking account types already in use.
- Transfer-out with open auto-invest; partial ACATS.
- Banking partner outage; card fraud; Reg E disputes.

## Test Plan

- KYC/suitability/subscription state-machine tests.
- Fractional-order tests: min-notional, partial fills, fractional corporate actions.
- Auto-Invest scheduling across timezones, market holidays.
- Rewards calculation, clawback, fulfillment, and reconciliation tests.
- Retirement contribution-limit tests by year and type.
- Custodial lifecycle tests including majority transfer.
- Card lifecycle tests (activate, lock, fraud, disputes).
- Billing tests including webhook reconciliation.
- Privacy tests for PII redaction.
- Accessibility tests for dynamic type, screen reader.
- Manual verification: funded account end-to-end.

## Acceptance Criteria

- Real-money flows gated by KYC, suitability, partner approvals.
- Rewards mechanic is funded by the operator and disclosed with non-investment-return framing.
- Retirement, custodial, and subscription gating are consistently enforced across clients and server.
- Statements and tax documents reconcile with ledger and match partner-broker records.
- Manual verification blockers resolved or feature-flagged off.

## Open Questions

- Which partner-broker and partner-bank will back V1?
- Will V1 support retirement and custodial at launch or ship taxable-only first?
- How are rewards funded (operator-funded vs merchant-funded) and disclosed?
- What is the market-data licensing scope (real-time vs delayed)?
- Which jurisdictions are supported in V1?

## Build Plan

- Phase 1: auth, KYC, taxable investment account, search/quotes, basic orders.
- Phase 2: Auto-Invest, statements, tax documents.
- Phase 3: banking partner, debit card, rewards mechanic, reconciliation.
- Phase 4: retirement sub-accounts with suitability and limits.
- Phase 5: custodial accounts; transfer-at-majority.
- Phase 6: subscription, support/disputes, compliance/accessibility/manual verification.

## Next Steps

- RFPs for broker-dealer and banking partner.
- Legal review of rewards funding and disclosures.
- Replace discovery URLs with exact first-party URLs before implementation.
