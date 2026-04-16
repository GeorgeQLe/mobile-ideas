# YNAB-Style Clone Spec

## Legal Scope
- Build a zero-based budgeting app with original branding, visuals, and copy.
- Do not copy YNAB naming, educational copy, or proprietary rules engine details.
- Support only lawful user-owned data imports and licensed sync providers.
- Keep the core math transparent so the implementation can be audited.

## Product Goal
- Help a user assign every dollar a job, reconcile accounts, and roll budget categories forward.
- Make budget state obvious at a glance: assigned, available, overspent, and aging.

## Research Verification Checklist
- Verify onboarding, account linking, and budget setup from public help content.
- Verify category behavior, rollover, overspending, and target rules through hands-on use.
- Verify reconciliation, imported transaction handling, and scheduled transaction flows.
- Verify export, sync, and subscription surfaces from app listings and support docs.

## Core User Journeys
- New user creates a budget, links an account, and assigns starting cash.
- Returning user reviews categories, moves funds, and enters transactions.
- User reconciles an account and resolves mismatched transactions.
- User sets targets, receives warnings, and adjusts category funding.
- User imports transactions from a file or sync provider and approves matches.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Welcome | Create budget | Name, currency | New, existing | Duplicate budget |
| Accounts | Account list and balances | Account type | Synced, stale | Negative balance |
| Budget | Category grid | Assigned amounts | Balanced, overspent | Hidden categories |
| Category Detail | Activity by category | Funding amount | Open, archived | No activity |
| Transaction Entry | Manual spending | Payee, amount, date | Draft, posted | Duplicate match |
| Reconcile | Match ledger to bank | Cleared balance | In sync, off by one | Pending items |
| Import | File or sync import | CSV, OFX, connection | Parsed, failed | Bad columns |
| Targets | Goals and deadlines | Target type, date | Active, reached | Impossible target |
| Settings | Sync and export | Preferences | Editable | Conflict merge |

## Functional Requirements
- Support zero-based assignment, category balances, and move-money actions.
- Track on-budget, off-budget, and uncategorized transactions separately.
- Support reconciliation with cleared versus working balances.
- Allow scheduled transactions, recurring income, and category targets.
- Preserve historical category activity and monthly rollover rules.
- Support CSV or OFX imports with duplicate detection and manual approval.
- Keep the UI usable offline with local edits queued for sync.
- Provide export of budget history and transaction history.

## Data Model
- `Budget`: currency, start date, month boundary, rollover settings.
- `Account`: name, type, on-budget flag, cleared balance, working balance.
- `CategoryGroup`: section name and ordering.
- `Category`: assigned, activity, available, target, archived state.
- `Transaction`: payee, amount, memo, account, category, cleared state.
- `ScheduledTransaction`: recurrence rule, next due date, auto-enter flag.
- `ReconciliationSession`: target balance, variance, resolved state.

## API/Backend Contracts
- `POST /budgets`, `GET /budgets/{id}`, `PATCH /budgets/{id}`.
- `GET /accounts`, `POST /accounts`, `PATCH /accounts/{id}`.
- `GET /categories`, `POST /categories`, `POST /categories/{id}/move-money`.
- `GET /transactions`, `POST /transactions`, `POST /transactions/import`.
- `POST /reconcile/start`, `POST /reconcile/commit`, `GET /scheduled-transactions`.
- Use idempotent writes and version checks for sync conflicts.

## Realtime/Push/Offline
- Sync changes in the background and preserve a local transaction queue.
- Push when imported transactions need review, reconciliation drifts, or targets are hit.
- Support full read access offline and limited write access for drafts.

## Permissions/Privacy/Safety
- Request only financial sync consent, notification consent, and optional biometrics.
- Treat budgets and transactions as sensitive personal data.
- Offer full data export, account unlink, and deletion workflows.

## Analytics Events
- `budget_created`, `category_added`, `money_moved`, `transaction_entered`
- `transaction_imported`, `transaction_approved`, `reconcile_started`, `reconcile_completed`
- `target_created`, `target_hit`, `sync_failed`, `export_requested`

## Monetization
- Use subscription gating for sync, advanced reports, or shared budgets if needed later.
- Keep the paid tier invisible until the user reaches a meaningful value moment.

## Acceptance Tests
- User can create a budget and assign funds until available reaches zero.
- User can enter a transaction and see category available update immediately.
- User can reconcile an account and resolve a one-cent variance.
- User can import a CSV and approve duplicates instead of double posting.
- User can set a target and see it progress month over month.
- Offline edits are queued and replayed without duplicating transactions.

## Implementation Notes
- Make the category math a pure domain module with property tests.
- Store monthly snapshots so reports do not depend on recomputing all history.
- Prefer explicit state transitions over hidden recalculation side effects.
