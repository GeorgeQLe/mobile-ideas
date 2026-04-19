# YNAB-Style Clone Spec

> Metadata
> - Inspiration app: YNAB
> - Category: Zero-based budgeting, account import, spending categories, goals/targets, reconciliation, household sharing, subscription, and personal-finance education
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-18.
> - Verification basis: exact public marketplace pages, YNAB public product/pricing pages, YNAB support articles, YNAB API documentation, and YNAB legal/privacy/security pages.
> - Manual verification blockers: native iOS/Android screens, signup/login, trial/subscription, budget creation, direct import setup, linked account refresh, manual account entry, transaction approval/matching, category targets, scheduled transactions, reconciliation, loan planner, reports, YNAB Together household sharing, API token behavior, imports/exports, support chat, push payloads, data deletion, and regional/provider availability require lawful test accounts/devices before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, branding, copy, icons, sample data, budgeting method language, subscription terms, account-import providers, support scripts, educational content, and privacy/security controls.

## Overview

Build an original budgeting app inspired by YNAB's public workflow: budget setup, zero-based allocation, accounts, categories, targets, transaction entry/import, approval, matching, reconciliation, scheduled transactions, reports, loan tracking, household sharing, subscription management, API-style export/integration, support, privacy, and security settings.

The clone must not copy YNAB branding, screenshots, marketing copy, protected UI artwork, proprietary education content, budget method copy, import-provider contracts, private APIs, pricing copy, legal text, or support scripts. Functional parity should use original product language, synthetic budgets and transactions, licensed account-import providers, and clear manual verification blockers.

## Goals

- Provide a mobile-first budgeting experience with onboarding, budget creation, account setup, category allocation, transaction capture/import, approval, reconciliation, reports, sharing, support, privacy, and subscription settings.
- Support budgeting trust expectations around imported account consent, stale balances, category overspending, user-entered corrections, household permissions, data export, subscription cancellation, and support escalation.
- Model direct import, API access, household sharing, loan planner, reports, and subscription billing as provider-backed or entitlement-backed modules with explicit gates.
- Produce concrete screens, entities, API contracts, offline/realtime rules, analytics, safety controls, edge cases, acceptance tests, and build phases.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a YNAB-branded app or imply affiliation with YNAB, account-import providers, banks, app stores, payment processors, or support teams.
- Do not provide financial, tax, investment, debt, or credit advice; budgeting guidance must be educational and original.
- Do not scrape YNAB, reuse private APIs, copy YNAB's educational method copy, copy support scripts, copy subscription offers, or bypass app-store billing rules.
- Do not import real financial accounts or share household data without explicit user consent, provider approval, privacy review, and security review.
- Do not claim exact native-device, account-import, subscription, API, notification, support, export/deletion, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/ynab/id1010865877 | Official iOS listing, developer, Finance category, subscription positioning, privacy labels, age rating, and app update context | Verified 2026-04-18 |
| Google Play | https://play.google.com/store/apps/details?id=com.youneedabudget.evergreen.app | Official Android listing, package id, data-safety orientation, budgeting/subscription positioning, and support/developer links | Verified 2026-04-18 |
| YNAB Home | https://www.ynab.com/ | Public product positioning for budgeting, account sync, spending awareness, and financial habit workflows | Verified 2026-04-18 |
| Pricing | https://www.ynab.com/pricing | Subscription/trial structure, billing expectations, and entitlement lifecycle requirements | Verified 2026-04-18 |
| Help Center | https://support.ynab.com/en_us | First-party support taxonomy for budgets, accounts, transactions, imports, categories, targets, reconciliation, reports, and troubleshooting | Verified 2026-04-18 |
| Direct Import Support | https://www.ynab.com/help-center | Linked-account import, provider consent, refresh behavior, and import troubleshooting requirements from the current YNAB help center | Verified 2026-04-18 |
| YNAB Together | https://support.ynab.com/en_us/ynab-together-B1nS78Cki | Household/group sharing concepts, member access, billing owner, and permission requirements | Verified 2026-04-18 |
| API Documentation | https://api.ynab.com/ | Public API object model, budgets, accounts, categories, transactions, months, and integration expectations | Verified 2026-04-18 |
| Terms | https://www.ynab.com/terms | Account terms, subscription/payment responsibilities, user content, service boundaries, and legal responsibilities | Verified 2026-04-18 |
| Privacy Policy | https://www.ynab.com/privacy-policy | Personal data categories, financial data handling, sharing, retention, rights, and privacy choices | Verified 2026-04-18 |
| Security | https://www.ynab.com/security | Public security posture for account data, encryption, access, and trust requirements | Verified 2026-04-18 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support account creation, trial/subscription state, legal/privacy consent, first budget creation, default categories, onboarding education, and signed-out, trialing, subscribed, expired, locked, and deleted states.
- Budget home must show current month, ready-to-assign amount, category groups, category available amounts, assigned/activity values, overspending, underfunded targets, account balances, alerts, and freshness timestamps.
- Account setup must support manual accounts, linked accounts, cash/credit/loan/off-budget accounts, provider consent, import health, stale credentials, manual balance correction, and account closure.
- Transaction workflow must support manual entry, imported transactions, approval, matching, split transactions, transfers, scheduled transactions, payee/category memo fields, flags, attachments where allowed, search/filter, and undo/error recovery.
- Category and target workflow must support category groups, monthly assignment, target type, due date, rollover behavior, overspending handling, hidden categories, move-money interactions, and budget audit history.
- Reconciliation must support cleared/uncleared transactions, balance comparison, adjustment transaction, locked period treatment, and audit trail.
- Reports must support spending, net worth, income/expense, category trends, debt/loan snapshots, and export with source/freshness labels.
- YNAB Together-like sharing must support group owner, invited members, budget access, member removal, billing owner, activity visibility, and privacy boundaries.
- API/import/export must use token scopes, rate limits, sync cursors, deletion behavior, and support-visible integration troubleshooting.
- Subscription, support, privacy, data export, account deletion, and legal links must remain reachable from settings and entitlement gates.

### Build Plan

1. Foundation: users, budgets, accounts, categories, months, transactions, subscriptions, privacy, legal links, audit logs, feature flags, and synthetic fixtures.
2. Budget core: month view, category assignment, account list, transaction list, manual entry, import inbox, search, settings, and local cache.
3. Import/reconcile: linked accounts, provider consent, import health, matching, approval, reconciliation, scheduled transactions, and stale-state recovery.
4. Sharing/reports/API: household sharing, reports, loan planner, exports, public API-compatible contracts, and subscription gates.
5. Trust and privacy: permission boundaries, audit history, account deletion, data export, support evidence redaction, and privacy-safe analytics.
6. Native verification: confirm iOS/Android screens, import providers, subscription state, push payloads, support paths, exports, and regional differences with lawful test accounts.

## Core User Journeys

- New user starts a trial, creates a first budget, adds manual accounts, assigns available money to categories, and sees a balanced current month.
- User links a checking account, completes provider consent, imports transactions, approves matches, and handles stale credentials.
- User overspends in a category, moves money from another category, sees the month update, and preserves audit history.
- User enters a transaction manually while offline, later receives an imported match, approves the match, and avoids duplicate spending.
- User reconciles an account, compares cleared balance, creates an adjustment if needed, and locks a reconciled point.
- User creates targets for rent, groceries, yearly expenses, and savings, sees underfunded categories, and adjusts assignments.
- Household owner invites a partner, shares a budget, removes access, and sees permission/billing effects.
- User exports budget data, manages API tokens, cancels subscription, requests deletion, and sees retention/subscription caveats.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Signup, login, trial, subscription | email, password/passkey, app-store purchase | new, trialing, active, expired | billing fail, locked, deleted |
| Budget Setup | First budget, currency, categories | name, currency, template, account | empty, guided, ready | duplicate budget, invalid currency |
| Budget Month | Current month allocation and categories | assign, move, category, month | balanced, underfunded, overspent | negative ready-to-assign, stale import |
| Account List | Manual/linked accounts and balances | account, refresh, reconcile | manual, linked, stale | provider outage, account closed |
| Transaction List | Import inbox and history | search, approve, edit, split | pending, approved, matched | duplicate, bad category, deleted payee |
| Transaction Editor | Manual entry, transfer, split, memo | amount, payee, category, flag | draft, saved, matched | offline, invalid split, locked period |
| Categories/Targets | Category setup and goal tracking | target, due date, assign | funded, underfunded, hidden | target missed, rollover conflict |
| Reconciliation | Cleared balance and adjustment | account, cleared, adjustment | matching, adjusted, locked | mismatch, pending imports |
| Reports | Spending, net worth, income/expense | range, account, category | loaded, filtered, exported | missing data, stale connection |
| Sharing | Household members and permissions | invite, remove, role | owner, member, invited | billing owner removed, privacy concern |
| API/Export | Tokens, integrations, data exports | token, scope, download | active, revoked, exported | rate limit, token leak, deletion conflict |
| Settings/Support | Subscription, privacy, support, deletion | cancel, case, export, delete | active, pending, closed | retention hold, support escalation |

## Data Model

- `User`: identity, locale, currency, subscription, privacy choices, group membership, support state, and deletion lifecycle.
- `DeviceSession`: device id, platform, auth method, push token, offline queue, and session revocation.
- `Budget`: owner, name, currency, month range, members, hidden categories, settings, archive state, and deletion state.
- `BudgetMonth`: budget, month, ready-to-assign, assigned/activity/available totals, overspending, and freshness.
- `CategoryGroup`: budget, name, ordering, collapsed/hidden state, and category children.
- `Category`: target, assigned, activity, available, rollover, hidden, notes, and audit trail.
- `Account`: type, balance, cleared balance, linked/manual state, import provider, reconciliation point, and closure state.
- `Transaction`: account, payee, category, amount, date, cleared state, approval, import id, match id, split lines, memo, flag, and attachment metadata.
- `ScheduledTransaction`: recurrence, next date, account, category, amount, approval state, and skip/edit history.
- `ImportConnection`: institution, consent scope, refresh health, MFA state, cursor, error code, and unlink state.
- `Reconciliation`: account, cleared balance, adjustment transaction, timestamp, user, and audit notes.
- `ShareGroup`: owner, members, invitations, access levels, billing owner, removal state, and activity visibility.
- `ApiToken`: user, scopes, created date, last used, revoked state, rate limit, and integration label.
- `SupportCase`: issue type, budget/account/transaction link, evidence, owner queue, SLA, and resolution.
- `AuditEvent`: append-only record for budget, account, category, transaction, import, reconciliation, sharing, subscription, privacy, and support changes.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` manage account access and recovery.
- `GET /profile`, `PATCH /profile`, `GET /subscription`, `POST /subscription/checkout`, and `POST /subscription/cancel` manage profile and entitlement lifecycle.
- `GET /budgets`, `POST /budgets`, `GET /budgets/:id`, `PATCH /budgets/:id`, and `DELETE /budgets/:id` manage budget ownership and deletion.
- `GET /budgets/:id/months/:month`, `PATCH /budgets/:id/months/:month/categories`, and `POST /budgets/:id/move-money` handle assignment and category state.
- `GET /accounts`, `POST /accounts`, `PATCH /accounts/:id`, `POST /accounts/:id/reconcile`, and `DELETE /accounts/:id` manage manual/linked accounts and reconciliation.
- `POST /imports/link-session`, `GET /imports/connections`, `POST /imports/connections/:id/refresh`, and `DELETE /imports/connections/:id` manage provider consent and account import.
- `GET /transactions`, `POST /transactions`, `PATCH /transactions/:id`, `POST /transactions/:id/approve`, `POST /transactions/:id/match`, and `DELETE /transactions/:id` manage manual/imported transactions.
- `GET /reports`, `GET /exports`, `POST /data-export`, `GET /api-tokens`, `POST /api-tokens`, and `DELETE /api-tokens/:id` expose reports, export, and API integrations.
- `GET /sharing/groups`, `POST /sharing/invites`, `PATCH /sharing/members/:id`, and `DELETE /sharing/members/:id` manage household access and billing owner constraints.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `DELETE /account`, `POST /support/cases`, and `GET /support/cases/:id` expose privacy rights, deletion blockers, and support.

## Realtime, Push, And Offline Behavior

- Budgets, months, accounts, transactions, imports, categories, targets, reconciliation, sharing, subscription, support, and privacy states must reconcile from server-owned events.
- The client may cache budgets, current month, account balances, transaction history, reports, settings, support cases, and legal links for offline reads.
- Offline mode may allow manual transactions, category edits, memo changes, and support drafts, but must block account linking, subscription changes, sharing changes, data deletion, and provider refresh.
- Import health, account balances, reports, targets, subscription state, API token state, and support status must display freshness and provider state.
- Push notifications must be opt-in and category-controlled for import issues, overspending, scheduled transactions, subscription, sharing, support, security, and data export readiness.
- Push payloads must avoid raw balances, payee names, transaction amounts, budget names, member data, API token data, and support evidence unless explicitly allowed by policy.

## Permissions, Privacy, And Safety

- Request notifications, files/photos, camera, biometric authentication, and local storage permissions only when a feature needs them.
- Default analytics must exclude account names, institution names, balances, transaction amounts, payees, memos, budget names, household member identities, API tokens, and support evidence.
- Direct import, household sharing, subscription billing, public API access, data export, and account deletion require launch owners, provider contracts, audit logs, and manual verification gates.
- Budget education must avoid personalized financial advice; recommendations should be framed as budgeting assistance and user-controlled rules.
- Account deletion and data export must warn about active subscription, shared budgets, API tokens, linked import connections, support cases, and backup/retention windows.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, accessible tables, readable budget math, and keyboard/switch-friendly controls.
- Launch owners: privacy owner for financial data; provider owner for direct import; billing owner for subscriptions; accessibility owner for budgeting UX; support owner for escalations.

## Analytics And Monetization

- Track privacy-safe events for onboarding, budget created, account added, import linked, transaction entered/imported/approved, category funded, target created, reconciliation completed, report viewed, share invite sent, API token created, support case opened, export requested, and deletion requested.
- Events must use coarse object type, flow step, provider status, reason code, latency bucket, and feature flag rather than balances, payees, amounts, category names, budget names, or member identities.
- Monetization may include original subscription tiers, trial, education content, household sharing, and support benefits only with legal-reviewed pricing/cancellation copy and app-store/payment compliance.

## Edge Cases

- First launch offline, expired trial, app-store receipt mismatch, duplicate budget, wrong currency, budget deleted while open, or user removed from shared budget.
- Import provider outage, stale credentials, MFA failure, duplicate imported transaction, delayed pending transaction, balance mismatch, or account closed at the institution.
- Manual transaction later imports, transfer between accounts is mismatched, split lines do not total, category is hidden, target due date changes, or overspending crosses month boundary.
- Reconciliation adjustment is needed, cleared balance changes after import, scheduled transaction lands during offline use, or locked period receives edits.
- Share member loses access, owner cancels subscription, billing owner changes, API token is revoked, export is requested during deletion, or support case remains open after account closure.

## Test Plan

- Validate exactly one H1, all canonical sections, exact source URLs, and no generic research placeholders.
- Unit test budget/month math, category targets, move-money rules, transaction splits, matching, import states, reconciliation, sharing permissions, subscription lifecycle, API tokens, closure blockers, and privacy-safe analytics.
- Contract test every documented API route, response shape, pagination cursor, provider status, error code, event replay, and consent/disclosure acknowledgement.
- Integration test onboarding, budget setup, manual account, linked account, transaction import/approval, category assignment, target creation, reconciliation, reports, sharing, API token, support, export, and deletion.
- Offline/realtime test cached budgets, manual transaction queue, blocked sensitive writes offline, stale labels, reconnect reconciliation, duplicate imports, push deep links, and provider outages.
- Security test tokenized imports, API token storage, PII redaction, session revocation, support evidence access, audit events, and deletion workflows.
- Accessibility test screen readers, focus order, dynamic type, contrast, reduced motion, table navigation, amount entry, category math, error recovery, and support paths.
- Manual verification test native screens, signup, budget creation, imports, transactions, reconciliation, sharing, subscription, API, exports, support, notifications, and deletion before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party marketplace, help/support, privacy/legal, product, pricing, direct-import, sharing, API, and security URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by YNAB without copying assets, private APIs, import-provider contracts, educational copy, pricing copy, support scripts, or brand copy.
- Every account import, subscription, sharing, API, support, notification, deletion/export, regional, and native-device behavior without lawful hands-on verification remains explicitly blocked.
- Budget math, imports, transactions, categories, targets, reconciliation, sharing, API/export, support, and subscription behavior have deterministic state models and tests.
- Sensitive data has privacy controls, audit events, export/deletion paths, support escalation, and analytics minimization.
- Provider-backed modules remain feature-flagged until legal, provider, security, accessibility, billing, and manual verification owners approve launch.

## Open Questions

- Which account-import provider, subscription provider, public API strategy, and household-sharing permission model will the implementation use?
- Which budgeting method language must be rewritten to avoid copying YNAB educational content while preserving functional workflow?
- Which reports, loan-planner features, and import/export formats belong in V1 versus later phases?
- Which synthetic budgets, transactions, institutions, shared households, and downstream implementation repos will be used for tests?

## Next Steps

- Use lawful test accounts/devices to verify native screens, onboarding, subscription, direct import, budget workflows, sharing, API/export, notifications, support, and data rights.
- Create synthetic users, budgets, accounts, categories, transactions, imports, reports, share groups, API tokens, support cases, and provider events.
- Run legal, privacy, security, accessibility, billing, provider, and support review before enabling production account import or billing.
