# Greenlight-Style Clone Spec

> Metadata
> - Inspiration app: Greenlight
> - Category: Kids banking and financial education
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: kids debit card issuance, parental controls, chores/allowance scheduling, investing-for-kids gating, and custodial account lifecycle require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, and partner-bank/broker integrations. Child accounts require explicit parental consent and data-minimization; operator is not a bank.

## Overview

Build an original kids-banking and financial-education app inspired by Greenlight: parent-owned subscription with linked kids, kids' debit cards, parental controls over store categories and spending limits, chores and allowance scheduling, savings goals, and parent-supervised investing for kids.

The clone must use original copy and integrations. Because child accounts are involved, a COPPA-adjacent parental-consent and data-minimization regime governs data collection, disclosures, and analytics.

This spec is Draft 1: surfaces ready; partner-bank, card issuer, broker-for-kids integrations, and the parental-consent regime remain behind compliance review.

## Goals

- Parent signs up, subscribes, and adds children as linked profiles.
- Each child receives a debit card funded from a parent-controlled wallet.
- Parents set per-merchant-category and per-store controls, spending limits, and ATM limits.
- Chores/allowance scheduling with automated transfers on completion.
- Savings goals (child-owned, parent-visible) with automated round-ups or transfers.
- Investing-for-kids via parental approval (custodial-for-minor) with suitability gating.
- Financial-education content appropriate to age band.

## Non-Goals

- Do not imply banking licenses; operator uses partner-bank.
- Do not copy Greenlight trademarks or marketing copy.
- Do not collect child data beyond what is necessary; no behavioral ad targeting to children.
- Do not offer credit or lending products to minors.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/greenlight-kids-teens-banking/id1124415861 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.greenlight.android | Android features | Source discovery — pending exact URL verification |
| Product support | https://greenlight.com/support | Feature behavior | Source discovery — pending exact URL verification |
| Legal & disclosures | https://greenlight.com/legal | Partner-bank and disclosures | Source discovery — pending exact URL verification |
| FTC COPPA reference | https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy | COPPA compliance education | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Parent is the account owner; children are linked sub-profiles without independent legal account ownership.
- Per-child debit card issued through partner-bank with parent-controlled limits and category allow/deny lists.
- Chores with one-time or recurring schedules; completion triggers allowance transfer when parent approves.
- Savings goals are child-visible and parent-visible; deposits executed from parent wallet.
- Investing-for-kids is a custodial account where the parent is custodian; suitability disclosures required.
- Subscription-based monetization (operator-funded rewards if any).
- Data minimization for children: no precise location by default, no behavioral ads, restricted analytics.

## Core User Journeys

- Parent signs up, completes KYC, subscribes, and funds wallet.
- Parent adds a child profile with minimum necessary info and orders a card.
- Parent activates the card, sets category/store controls and spending/ATM limits.
- Parent creates chores; child marks done; parent approves and allowance transfers.
- Child sets a savings goal; parent can auto-transfer or approve deposits.
- Parent opens a custodial investing account for the child and approves trades.
- Card is declined due to controls; child sees original messaging.
- Card is lost/stolen; parent locks and orders replacement.
- Parent updates controls or pauses the child's card.
- Parent exports data or deletes the child's profile; data-minimization regime applies.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Parent Onboarding/KYC | Identity, subscription, wallet | name, DOB, SSN | collecting, verified | denied, manual review |
| Add Child | Create child profile, order card | name, DOB, minimal data | created, card-ordered | underage below floor |
| Home (Parent) | Wallet, kids summary | navigation | empty, active | partner outage |
| Home (Kid) | Balance, goals, chores | navigation | empty, funded | controls pause |
| Card Controls | Limits, categories, store allow/deny | toggles | active, paused | fraud hold |
| Chores | Create/complete/approve | schedule, reward | pending, approved | disputed |
| Savings Goals | Create, fund, close | target, contributions | on-track, complete | funding blocked |
| Investing (Custodial) | Open/approve trades | suitability, ticket | approved, pending | unsuitable |
| Transfers | Wallet to child or vice versa | amount | pending, settled | NSF |
| Activity | Transactions | filter | loaded, empty | pending |
| Settings | Security, notifications, privacy | edits | loaded | MFA needed |
| Support | Cases | category | submitted | escalated |

## Data Model

- `ParentUser`: identity, KYC, subscription, wallet.
- `ChildProfile`: minimal PII, age band, controls, card id, savings/investing refs.
- `Card`: partner-issued debit card, controls, state.
- `CardControl`: category allow/deny, store-level rules, ATM, online.
- `Chore`: schedule, reward, completion state, approval state.
- `SavingsGoal`: child id, target, contributions.
- `CustodialInvestmentAccount`: child id, custodian = parent, holdings.
- `Transfer`: parent wallet <-> child.
- `Transaction`: auth/post, mcc, merchant hash, control-decision trace.
- `Subscription`: parent plan.
- `AuditEvent`: append-only, parental-consent acknowledgements.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/start`, `GET /kyc/status`.
- `POST /children`, `PATCH /children/:id`, `DELETE /children/:id`.
- `POST /cards/for-child/:id`, `PATCH /cards/:id/controls`.
- `POST /chores`, `PATCH /chores/:id`, `POST /chores/:id/complete`, `POST /chores/:id/approve`.
- `POST /goals`, `PATCH /goals/:id`, `POST /goals/:id/fund`.
- `POST /custodial/accounts`, `POST /custodial/orders`.
- `POST /transfers/parent-to-child`, `POST /transfers/child-to-parent`.
- `GET /transactions/child/:id`, `POST /transactions/:id/dispute`.
- `POST /billing/subscribe`, `POST /billing/cancel`, `POST /billing/webhook`.
- `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Card authorizations stream to parent and optionally the child's app in real time.
- Chore completions and approvals update via push.
- Offline shows read-only cached data labeled stale; no controls changes offline.
- Push payloads never include PII or amounts beyond class-level.

## Permissions, Privacy, And Safety

- Parental consent required to create any child profile or card.
- Child data minimization: no precise location, no behavioral advertising, restricted analytics.
- Age-band gating for content and features.
- KYC/AML on parent; OFAC screening.
- Partner-bank and FDIC pass-through disclosures.
- Launch owners: compliance, privacy (COPPA-adjacent), partner-bank liaison, security.

## Analytics And Monetization

- Privacy-safe events only; children's analytics limited to service-critical signals with no behavioral targeting.
- Monetization via parent subscription; interchange from partner-bank arrangement possible.
- No third-party ad SDKs in child surfaces.

## Edge Cases

- Child turns age threshold; account must transition or be closed.
- Parent divorce/co-parent handoff; account ownership cannot be transferred without legal doc.
- Card declined at allowed merchant due to wrong MCC; self-serve override path.
- Chore dispute between parent and child; parent has final approval.
- Investing order placed by child (should be blocked); parent approves.
- Compromised parent account; child cards must freeze automatically.
- Account deletion must purge child data per policy.
- Subscription lapse disables new spend but preserves existing balances.

## Test Plan

- Parent KYC and subscription flows.
- Child creation with minimum data and card issuance.
- Controls and category/store rule enforcement at authorization.
- Chores schedule, completion, and approval flow.
- Goals funding and closure.
- Custodial investing with suitability and parent approval required.
- Transfers and activity reconciliation.
- Privacy tests: child data minimization, no precise location, no behavioral analytics.
- COPPA-adjacent consent audit.
- Accessibility for both adult and child UX.
- Manual verification: parent + child real-card walkthrough.

## Acceptance Criteria

- Child accounts cannot exist without parental consent and minimum data only.
- Card controls are enforced at authorization via partner-bank.
- Investing is custodial and parent-approved per trade.
- Analytics pipeline excludes children from behavioral targeting.
- Data deletion for children is complete and auditable.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Partner-bank and card issuer for V1?
- Which investing partner will power custodial accounts?
- Which age floor applies for card issuance?
- What data is disclosed between co-parents or separated households?
- Which jurisdictions are supported at launch?

## Build Plan

- Phase 1: parent auth, KYC, subscription, wallet.
- Phase 2: child profile, card issuance, controls.
- Phase 3: chores, allowance scheduling, savings goals.
- Phase 4: custodial investing for kids.
- Phase 5: privacy/COPPA-adjacent audit; advanced controls.
- Phase 6: support, accessibility, manual verification.

## Next Steps

- Partner RFPs (bank, card issuer, custodial broker).
- Privacy counsel review of COPPA-adjacent design.
- Replace discovery URLs with exact first-party URLs before implementation.
