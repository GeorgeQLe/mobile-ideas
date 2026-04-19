# Rocket Money-Style Clone Spec

> Metadata
> - Inspiration app: Rocket Money
> - Category: Personal finance, subscriptions, bills, budgeting, spending insights, account aggregation, savings, premium services, and bill negotiation/cancellation support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-18.
> - Verification basis: exact public marketplace pages, Rocket Money public product pages, Rocket Money help center, and Rocket Money privacy/legal/security pages.
> - Manual verification blockers: native iOS/Android screens, signup/login, account linking, Plaid/open-banking consent, subscription detection, subscription cancellation workflows, concierge actions, bill negotiation intake/outcome, premium subscription, smart savings, budgets, credit score display, transaction categorization, refund/fee handling, support chat, push payloads, data export, account deletion, and provider/regional availability require lawful test accounts/devices and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, branding, copy, icons, sample data, subscription-detection rules, bill-negotiation scripts, cancellation scripts, provider relationships, premium pricing, support scripts, and regulated-finance controls.

## Overview

Build an original personal finance app inspired by Rocket Money's public workflow: account linking, spending dashboard, subscription detection, recurring bill tracking, cancellation assistance, bill negotiation intake, budgeting, spending insights, smart-savings-style goals, premium subscription, credit/financial insights where licensed, support, privacy, data export, and account deletion.

The clone must not copy Rocket Money branding, screenshots, marketing copy, protected UI artwork, private APIs, subscription-detection logic, bill-negotiation scripts, cancellation scripts, Plaid/provider contracts, premium pricing, legal text, or support scripts. Functional parity should use original product language, synthetic transactions, licensed aggregation providers, provider-specific consent, and clear manual blockers for human-assisted workflows.

## Goals

- Provide a mobile-first finance assistant with account onboarding, linked accounts, spending dashboard, subscriptions, bills, cancellation/negotiation intake, budgets, savings, premium settings, support, privacy, and security controls.
- Support finance-category trust expectations around account consent, provider freshness, human-assisted actions, third-party biller contact, cancellation authority, savings transfers, fee disclosures, data deletion, and support escalation.
- Model account aggregation, bill negotiation, cancellation assistance, premium, smart savings, and credit/financial insights as provider-backed or human-assisted modules with explicit eligibility and disclosure gates.
- Produce concrete screens, entities, API contracts, offline/realtime rules, analytics, safety controls, edge cases, acceptance tests, and build phases.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Rocket Money-branded app or imply affiliation with Rocket Money, Rocket Companies, Plaid, banks, billers, credit bureaus, savings providers, or support/concierge teams.
- Do not perform production bill negotiation, subscription cancellation, account aggregation, savings transfers, credit-score display, paid concierge work, or financial advice without separate legal, provider, security, and support approval.
- Do not scrape Rocket Money, reuse private APIs, copy biller/cancellation scripts, copy premium offers, copy recommendation logic, or bypass app-store/payment rules.
- Do not treat account linking, bill negotiation, subscription cancellation, savings transfers, premium fees, support, or data rights as generic app behavior.
- Do not claim exact native-device, account-linking, cancellation, negotiation, support, notification, export/deletion, or provider/regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/rocket-money-bills-budgets/id1130616675 | Official iOS listing, developer, Finance category, subscription/budget/bill positioning, privacy labels, age rating, and app update context | Verified 2026-04-18 |
| Google Play | https://play.google.com/store/apps/details?id=com.truebill | Official Android listing, package id, data-safety orientation, bills/subscriptions/budget positioning, and support/developer links | Verified 2026-04-18 |
| Rocket Money Home | https://www.rocketmoney.com/ | Public product positioning for bills, subscriptions, budgeting, spending, savings, and premium finance assistance | Verified 2026-04-18 |
| Subscription Cancellation | https://www.rocketmoney.com/cancel-subscriptions | Public cancellation-assistance positioning, subscription detection, and user-action expectations | Verified 2026-04-18 |
| Bill Negotiation | https://www.rocketmoney.com/bill-negotiation | Public bill negotiation workflow orientation, bill upload/intake, savings claims, and human-assisted service expectations | Verified 2026-04-18 |
| Help Center | https://help.rocketmoney.com/en/ | First-party support taxonomy for subscriptions, bills, account linking, premium, savings, budgets, and troubleshooting | Verified 2026-04-18 |
| Terms | https://www.rocketmoney.com/terms | Account terms, premium/service boundaries, subscription cancellation/negotiation responsibilities, fees, and legal responsibilities | Verified 2026-04-18 |
| Privacy Policy | https://www.rocketmoney.com/privacy | Personal data, financial account data, sharing, retention, rights, and privacy choices | Verified 2026-04-18 |
| Security | https://www.rocketmoney.com/security | Public security and account-linking trust posture used for privacy/security requirements | Verified 2026-04-18 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support account creation, linked financial account consent, legal/privacy consent, premium entitlement state, support state, and signed-out, linked, stale, premium, canceled, restricted, and deleted states.
- Dashboard must show balances, spending, income, subscriptions, bills, alerts, budgets, savings, premium prompts, account connection health, and source/freshness timestamps.
- Account linking must support institution search, provider consent, MFA, linked accounts, refresh health, unlink/delete controls, stale credentials, duplicate accounts, and provider outage states.
- Subscription detection must identify recurring transactions, merchant, amount, frequency, next expected date, confidence, user confirmation, false-positive dismissal, cancellation eligibility, and history.
- Cancellation assistance must support user authorization, required credentials or biller information, status tracking, evidence, biller response, cancellation success/failure, refund/fee notes, and user-controlled stop/cancel.
- Bill negotiation must support bill upload/import, biller identification, service details, authorization, negotiation status, savings outcome, fee/commission disclosure, failed negotiation, and support escalation.
- Budgeting and spending insights must support category budgets, transaction categorization, recurring bills, alerts, trend summaries, hidden transactions, merchant/category edits, and export.
- Savings-style features must support goal setup, rules, transfers, provider status, limits, statements, and closure blockers only behind provider approval.
- Premium must model free, trial, active, canceled, expired, billing failed, refund requested, and benefit-unavailable states with original pricing/copy.
- Support, privacy, data export, account deletion, legal links, and linked-account removal must remain reachable from settings and relevant flow screens.

### Build Plan

1. Foundation: users, linked accounts, transactions, merchants, subscriptions, bills, budgets, savings, premium, privacy, legal links, audit logs, feature flags, and synthetic fixtures.
2. Dashboard core: home, account list, transaction list, recurring subscriptions, bills, budgets, alerts, settings, support, notification center, and cached reads.
3. Assisted services: cancellation intake/status, bill negotiation intake/status, support evidence, user authorization, fee disclosure, and human-review queues.
4. Provider modules: account aggregation, savings transfers, premium billing, credit/financial insights, exports, and deletion behind provider/legal/security gates.
5. Trust hardening: consent boundaries, biller authorization, fee disclosures, evidence redaction, privacy-safe analytics, data export, and closure blockers.
6. Native verification: confirm iOS/Android screens, account linking, cancellation/negotiation status, premium, push payloads, support paths, and provider differences with lawful accounts.

## Core User Journeys

- New user signs up, links a checking account, consents to account aggregation, and lands on a dashboard with spending, subscriptions, bills, and connection health.
- User reviews detected subscriptions, confirms a recurring merchant, dismisses a false positive, and starts cancellation assistance for an eligible subscription.
- User uploads or selects a bill, authorizes negotiation, tracks human-assisted status, receives an outcome, and sees fee/savings disclosure.
- User creates category budgets, recategorizes transactions, gets overspending alerts, and exports transaction data.
- User enables a savings goal, reviews transfer rules, sees provider limits, and handles transfer failure or closure blockers.
- User starts premium, sees benefit unlocks, cancels, handles billing failure, and requests support.
- Privacy-focused user unlinks institutions, deletes imported data, requests export, starts account deletion, and sees active-service/retention caveats.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Signup, login, legal consent, premium teaser | email, phone, password/passkey | new, returning, locked | duplicate account, deleted account |
| Account Link Flow | Institution search and provider consent | search, credentials, MFA, consent | searching, linking, linked | MFA fail, provider outage, consent revoked |
| Dashboard | Spending, bills, subscriptions, alerts | account, bill, subscription, budget | loaded, zero, stale | missing data, provider degraded |
| Transactions | Imported transactions and categories | filter, merchant, category, split | pending, posted, categorized | duplicate, false merchant, hidden |
| Subscriptions | Recurring subscriptions and cancellation | merchant, confirm, cancel | detected, confirmed, canceling | false positive, ineligible, biller blocked |
| Cancellation Detail | Assisted cancellation status | authorization, evidence, stop | submitted, working, canceled | biller rejection, credentials needed |
| Bill Negotiation | Bill intake and outcome tracking | bill, provider, auth, evidence | draft, submitted, negotiating | missing bill, no savings, fee dispute |
| Budgets/Spending | Category budgets and trends | category, limit, alert | on-track, over, under | bad category, stale transactions |
| Savings | Goals and transfer rules | goal, amount, rule, transfer | active, pending, paused | provider hold, transfer fail |
| Premium | Entitlement, billing, cancellation | trial, subscribe, cancel | free, active, canceled | billing fail, refund request |
| Support/Privacy/Settings | Help, export, delete, unlink, legal | case, export, delete, unlink | open, pending, closed | active cancellation, legal retention |

## Data Model

- `User`: identity, contact methods, privacy choices, premium state, linked-provider consent, restrictions, and closure lifecycle.
- `DeviceSession`: device id, auth method, push token, risk markers, offline queue, and revocation state.
- `InstitutionConnection`: provider, consent scope, connection health, MFA state, refresh cursor, error code, and unlink state.
- `FinancialAccount`: account type, masked name, balance, freshness, hidden state, ownership, and deletion behavior.
- `Transaction`: account, merchant, amount, category, date, recurring candidate, pending/posted state, import id, and export metadata.
- `Subscription`: merchant, amount, frequency, confidence, next date, user confirmation, cancellation eligibility, and lifecycle state.
- `CancellationCase`: subscription, authorization, required evidence, owner queue, biller status, result, refund/fee notes, and user stop state.
- `Bill`: biller, account number token, service address token, amount, due date, uploaded evidence, and negotiation eligibility.
- `NegotiationCase`: bill, authorization, negotiation stage, outcome, savings estimate, fee disclosure, support case, and audit trail.
- `BudgetCategory`: category, monthly limit, spend, alert threshold, trend, and user override history.
- `SavingsGoal`: provider account, goal, transfer rule, balance, limits, status, and closure constraints.
- `PremiumEntitlement`: plan, billing source, trial, active/canceled/expired state, benefit flags, refund state, and renewal.
- `SupportCase`: issue type, linked account/subscription/bill, evidence, owner queue, SLA, resolution, and privacy flag.
- `AuditEvent`: append-only record for auth, linking, transaction, subscription, cancellation, bill negotiation, savings, premium, support, privacy, and deletion actions.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` manage account access and recovery.
- `GET /profile`, `PATCH /profile`, `GET /premium`, `POST /premium/checkout`, and `POST /premium/cancel` manage profile and entitlement lifecycle.
- `GET /institutions`, `POST /link-sessions`, `GET /connections`, `POST /connections/:id/refresh`, and `DELETE /connections/:id` manage account aggregation and consent.
- `GET /accounts`, `GET /transactions`, `PATCH /transactions/:id`, and `GET /spending/summary` manage account balances, transactions, categorization, and spending insights.
- `GET /subscriptions`, `PATCH /subscriptions/:id`, `POST /subscriptions/:id/cancellation-cases`, and `GET /cancellation-cases/:id` manage recurring detection and cancellation status.
- `GET /bills`, `POST /bills`, `POST /negotiation-cases`, `GET /negotiation-cases/:id`, and `POST /negotiation-cases/:id/evidence` manage bill intake, authorization, status, and outcomes.
- `GET /budgets`, `POST /budgets/categories`, `PATCH /budgets/categories/:id`, and `GET /alerts` manage budget limits and spending alerts.
- `GET /savings`, `POST /savings/goals`, `POST /savings/transfers/preview`, and `POST /savings/transfers` manage provider-backed savings features where enabled.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `GET /data-export/:id`, and `DELETE /account` expose data rights and closure blockers.
- `POST /support/cases`, `GET /support/cases/:id`, and `POST /support/cases/:id/evidence` handle help, premium issues, negotiation/cancellation disputes, and evidence upload.

## Realtime, Push, And Offline Behavior

- Account links, balances, transactions, subscriptions, cancellation cases, bill negotiation cases, budgets, savings, premium, support, privacy, and security states must reconcile from server-owned events.
- The client may cache dashboards, transaction lists, subscription summaries, bill cases, budgets, settings, support cases, and legal links for offline reads.
- Offline mode may preserve categorization edits, budget edits, and support drafts but must block account linking, cancellation submission, negotiation submission, savings transfers, premium changes, and account deletion.
- Account balances, transactions, subscription predictions, bill status, negotiation outcomes, savings rates, premium state, and provider status must display source and freshness.
- Push notifications must be opt-in and category-controlled for subscription changes, bill due dates, cancellation status, negotiation updates, budget alerts, premium, support, security, and export readiness.
- Push payloads must avoid account balances, merchant names by default, biller account details, transaction amounts, negotiation evidence, and support evidence unless policy and settings allow.

## Permissions, Privacy, And Safety

- Request notifications, camera, files/photos, biometric authentication, and local storage only when a feature requires them.
- Default analytics must exclude bank credentials, account numbers, balances, transaction amounts, merchant names, biller account details, uploaded bills, cancellation credentials, negotiation evidence, and support evidence.
- Account aggregation, cancellation assistance, bill negotiation, savings transfers, premium billing, credit insights, support, data export, and deletion require launch owners, provider contracts, audit logs, and manual verification gates.
- Assisted cancellation and bill negotiation must capture explicit user authorization, disclose fees, avoid deceptive biller contact, preserve evidence, and expose stop/escalation paths.
- Account deletion and data export must warn about linked accounts, active cancellation/negotiation cases, premium billing, savings transfers, support cases, legal holds, and provider retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, readable bill/fee disclosures, and accessible support paths.
- Launch owners: provider owner for aggregation/savings; legal owner for negotiation/cancellation authorization; billing owner for premium; privacy owner for data rights; support owner for assisted-service escalation; accessibility owner for finance UX.

## Analytics And Monetization

- Track privacy-safe events for onboarding, account link started/completed, dashboard viewed, subscription confirmed, cancellation case started, bill negotiation submitted, budget created, savings goal created, premium started/canceled, support case opened, export requested, and deletion requested.
- Events must use coarse object type, flow step, provider status, reason code, latency bucket, and feature flag rather than merchant names, balances, bill images, transaction amounts, or support evidence.
- Monetization may include original premium subscription, bill negotiation success fees, cancellation assistance, savings provider economics, and partner recommendations only with legal-reviewed fee/cancellation disclosures and user receipts.

## Edge Cases

- First launch offline, duplicate account, expired premium, provider outage, revoked account consent, institution MFA loop, deleted account, or app-store receipt mismatch.
- Subscription detection creates false positives, misses annual subscriptions, merchant changes name, subscription amount varies, cancellation requires phone call, or biller rejects authority.
- Bill negotiation has missing bill, biller unavailable, no savings, fee dispute, customer changes plan mid-negotiation, or outcome conflicts with biller confirmation.
- Budget category is wrong, pending transaction changes amount, duplicate import occurs, merchant/category override conflicts, savings transfer fails, or premium benefit disappears.
- Data export/deletion conflicts with linked accounts, active negotiation, active cancellation, premium billing, savings transfers, support cases, legal holds, or provider retention.

## Test Plan

- Validate exactly one H1, all canonical sections, exact source URLs, and no generic research placeholders.
- Unit test account-link states, recurring detection, subscription confidence, cancellation lifecycle, negotiation lifecycle, budget rules, savings state, premium lifecycle, closure blockers, and privacy-safe analytics.
- Contract test every documented API route, response shape, pagination cursor, provider status, error code, event replay, and authorization/disclosure acknowledgement.
- Integration test onboarding, account linking, dashboard, transactions, subscriptions, cancellation, bill negotiation, budgets, savings, premium, support, export, and deletion.
- Offline/realtime test cached dashboards, blocked assisted-service writes offline, stale labels, reconnect reconciliation, duplicate imports, push deep links, and provider outages.
- Security test tokenized account links, evidence redaction, session revocation, support evidence access, audit events, provider secret isolation, and deletion workflows.
- Accessibility test screen readers, focus order, dynamic type, contrast, reduced motion, table navigation, bill/fee disclosure, error recovery, and support paths.
- Manual verification test native screens, linked accounts, subscription detection/cancellation, negotiation, budgets, savings, premium, support, push payloads, export, and deletion before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party marketplace, help/support, privacy/legal, product, cancellation, bill negotiation, and security URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Rocket Money without copying assets, private APIs, provider contracts, cancellation/negotiation scripts, support scripts, premium pricing, or brand copy.
- Every account linking, subscription cancellation, bill negotiation, premium, savings, support, notification, deletion/export, provider, regional, and native-device behavior without lawful hands-on verification remains explicitly blocked.
- Account aggregation, subscriptions, cancellation, bill negotiation, budgets, savings, premium, support, and data rights have deterministic state models and tests.
- Sensitive data has consent boundaries, privacy controls, audit events, export/deletion paths, support escalation, and analytics minimization.
- Provider-backed and human-assisted modules remain feature-flagged until legal, provider, security, accessibility, billing, support, and manual verification owners approve launch.

## Open Questions

- Which account aggregation, savings, premium billing, support queue, cancellation, and negotiation providers will the implementation use?
- Which cancellation and negotiation workflows are legally safe for V1 versus support-only education?
- Which credit-score or recommendation surfaces belong in V1 rather than later provider-backed phases?
- Which synthetic bills, subscriptions, transactions, cases, and downstream implementation repos will be used for tests?

## Next Steps

- Use lawful test accounts/devices to verify native screens, account linking, subscriptions, cancellations, bill negotiation, budgets, savings, premium, push notifications, support, and data rights.
- Create synthetic users, connections, accounts, transactions, subscriptions, cancellation cases, bills, negotiation cases, budgets, savings goals, premium states, support cases, and provider events.
- Run legal, provider, privacy, security, accessibility, billing, and support review before enabling production account aggregation or assisted cancellation/negotiation.
