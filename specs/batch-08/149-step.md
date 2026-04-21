# Step-Style Clone Spec

> Metadata
> - Inspiration app: Step
> - Category: Teen banking, secured card, credit building
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: teen account opening with parental sponsorship, secured card issuance, credit reporting, savings/investing gating, and family transfers require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, and partner-bank/credit-bureau integrations. Teen accounts require parental sponsorship and data-minimization; operator is not a bank.

## Overview

Build an original teen-banking app inspired by Step: teen accounts sponsored by a parent/guardian, a secured card that reports on-time payments to credit bureaus (where allowed by law and age), family transfers (P2P), savings, and an entry-level investing experience.

The clone must use original copy and integrations. Regulatory posture must map to the operator's licensing via partner-bank and partner-custodian, and must meet FCRA and state-age rules for any credit reporting.

This spec is Draft 1: surfaces ready; partner-bank, card issuer, and bureau-reporting integrations remain behind compliance review.

## Goals

- Teen account sponsored by a parent/guardian with tiered gating by age.
- Secured-card-like product that auto-pays from the teen's balance and reports on-time payment history to credit bureaus where allowed.
- Family P2P transfers, allowance scheduling, and savings goals.
- Entry-level investing (fractional via custodial where the teen is minor, or a direct account at age of majority).
- Subscription or free tier with fee transparency.

## Non-Goals

- Do not imply banking licenses; operator uses partner-bank.
- Do not copy Step trademarks or marketing copy.
- Do not extend credit to minors in the legal sense; the card is secured and reports payment history only.
- Do not collect data beyond what is necessary for a minor account.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/step-banking-investing/id1485817790 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.stepmobile.stepmobile | Android features | Source discovery — pending exact URL verification |
| Product support | https://step.com/support | Feature behavior | Source discovery — pending exact URL verification |
| Legal & disclosures | https://step.com/legal | Partner-bank, bureau reporting | Source discovery — pending exact URL verification |
| CFPB teens & credit reference | https://www.consumerfinance.gov/ | Teen financial education | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Teen account sponsorship by a parent/guardian with a signed sponsorship attestation.
- Card functions like a debit card but is structured to allow reporting of on-time payments to bureaus where permitted.
- Auto-pay from balance avoids negative balance and missed-payment reports.
- Age-based feature gating: under-age threshold vs at-majority; at-majority the account can convert to an adult account.
- Family P2P transfers (child <-> parent/guardian and between teens in the same family group).
- Savings pockets and a basic investing feature via custodial flow for minors.
- Subscription-free base tier; optional paid tier for premium features.

## Core User Journeys

- Teen signs up with parent/guardian sponsorship; minimum data collected.
- Parent/guardian KYCs and links a funding source.
- Teen receives a virtual card, activates the physical card when it arrives.
- Teen uses the card; balance auto-pays; on-time payment history is reported to bureaus where allowed.
- Teen creates savings goals and invests via custodial flow with parent approval per trade.
- Teen hits age of majority; account converts to adult account with new T&Cs and independent control.
- Parent schedules allowance; family P2P transfers flow.
- Card lost/stolen; teen or parent locks and orders replacement.
- Teen downloads statements; parent can view transaction history per privacy settings.
- Account closure and data deletion, with bureau-reporting cleanup per law.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Teen Onboarding | Minimal data, sponsorship invite | name, DOB | awaiting sponsor, verified | underage floor |
| Parent/Guardian KYC | Identity, sponsorship | name, DOB, SSN | collecting, verified | denied |
| Home (Teen) | Balance, card, goals | navigation | empty, funded | partner outage |
| Card Controls | Lock, PIN, wallet | toggles | active, locked, replaced | fraud hold |
| Activity | Transactions | filter | loaded, empty | pending |
| Savings | Pockets, round-ups | amount | active, paused | funding blocked |
| Investing (Custodial) | Parent-approved trades | suitability, ticket | approved, pending | unsuitable |
| Family Transfers | P2P within family | amount, recipient | pending, settled | NSF, return |
| Credit History | On-time payment summary | view | reporting, not yet | bureau delay |
| Age-of-Majority | Account conversion | consent | pending, converted | denied conversion |
| Settings | Security, notifications, privacy | edits | loaded | MFA needed |
| Support | Cases | category | submitted | escalated |

## Data Model

- `TeenUser`: minimal PII, age band, sponsor ref, account state.
- `Sponsor`: KYC'd adult, relationship, consent evidence.
- `Card`: partner-issued, controls, state.
- `Transaction`: auth/post, merchant hash, control decisions.
- `CreditReportingPolicy`: jurisdiction eligibility, opt-in state.
- `PaymentReport`: period, on-time/late status, bureau submission id.
- `SavingsPocket`: goal, balance, auto-rules.
- `CustodialInvestmentAccount`: positions, approval trace.
- `FamilyTransfer`: source/target, amount, status.
- `ConversionAtMajority`: transition plan, T&Cs acceptance.
- `AuditEvent`: append-only consent/compliance events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/sponsor/start`, `GET /kyc/sponsor/status`.
- `POST /teens`, `PATCH /teens/:id`, `DELETE /teens/:id`.
- `POST /sponsorship`, `POST /sponsorship/:id/accept`, `POST /sponsorship/:id/revoke`.
- `POST /cards/for-teen/:id`, `PATCH /cards/:id/controls`, `POST /cards/:id/replace`.
- `GET /transactions/:teen_id`, `POST /transactions/:id/dispute`.
- `POST /pockets`, `PATCH /pockets/:id`.
- `POST /custodial/accounts`, `POST /custodial/orders`.
- `POST /transfers/family`, `GET /transfers?cursor=`.
- `POST /credit/opt-in`, `GET /credit/history`.
- `POST /conversion-at-majority/start`, `POST /conversion-at-majority/complete`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Card authorizations stream in real time to teen and (per privacy settings) sponsor.
- Credit reporting is batched monthly; app shows latest reported period.
- Offline shows read-only cached data labeled stale; no controls changes offline.
- Push payloads are class-level only, no amounts/PII.

## Permissions, Privacy, And Safety

- Sponsor consent required for any teen action that moves money beyond configured limits.
- Minimal teen PII; no behavioral ad targeting for minors; restricted analytics.
- KYC/AML on sponsor; OFAC screening.
- FCRA compliance for any credit-bureau reporting; written opt-in where required.
- Age-appropriate content in financial education.
- Partner-bank FDIC pass-through disclosures; operator is not a bank.
- Launch owners: compliance, privacy, FCRA counsel, partner-bank liaison, security.

## Analytics And Monetization

- Privacy-safe events only; no behavioral targeting to minors.
- Monetization via interchange from partner-bank arrangement and optional paid tier.
- Fee disclosures always visible.

## Edge Cases

- Teen reaches majority but sponsor denies conversion; legal considerations.
- Sponsor revokes support; account must pause spend and transition.
- Bureau-reporting disputes; FCRA-compliant handling.
- Card declined due to controls; self-serve override by sponsor only.
- Duplicate sponsorships; only one active sponsor.
- Lost/stolen device with active card; remote freeze path.
- Cross-border teen accounts not supported in V1.
- Investing order by minor without approval must be blocked.

## Test Plan

- Sponsor KYC and teen minimal-data flows.
- Sponsorship lifecycle (invite/accept/revoke).
- Card lifecycle and controls.
- Bureau-reporting submission simulation and dispute flow.
- Custodial investing with per-trade approval.
- Family transfers reconciliation.
- Age-of-majority conversion flow.
- Privacy tests: no minor behavioral analytics, no precise location.
- Accessibility for teen-age UX.
- Manual verification: funded sponsor + teen walkthrough including simulated bureau period.

## Acceptance Criteria

- Teen accounts require sponsor KYC and consent evidence stored in audit events.
- Credit reporting is opt-in, FCRA-compliant, and disputable.
- Card controls enforced at partner-bank authorization.
- Account conversion at majority is explicit and auditable.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Partner-bank and card-issuer for V1?
- Which credit bureaus will receive payment reports?
- Which jurisdictions allow minor-associated credit reporting and under what age?
- Will V1 include custodial investing at launch or later?
- What analytics are permissible for minor users?

## Build Plan

- Phase 1: sponsor KYC, teen onboarding, card issuance, basic transactions.
- Phase 2: savings pockets, family transfers, allowance scheduling.
- Phase 3: credit opt-in and bureau reporting pipeline.
- Phase 4: custodial investing and suitability.
- Phase 5: age-of-majority conversion flow.
- Phase 6: compliance, accessibility, manual verification.

## Next Steps

- Partner RFPs and FCRA counsel review.
- Privacy counsel review for minor data handling.
- Replace discovery URLs with exact first-party URLs before implementation.
