# Mint/Credit Karma-Style Clone Spec

## Legal Scope
- Build a personal finance dashboard that aggregates accounts, budgets, credit health, and alerts.
- Do not copy Intuit, Credit Karma, bureau branding, scoring models, or lender offer content.
- Use sandbox aggregators, synthetic credit data, and placeholder offers for the first release.
- Never imply bureau reporting or lending decisions without licensed data and legal review.

## Product Goal
- Help a user understand cash flow, debts, credit trends, and upcoming bills in one mobile home screen.
- Drive clear actions: connect accounts, monitor credit, adjust budgets, and review offers.

## Research Verification Checklist
- Verify onboarding, bank-link prompts, and account refresh behavior from public materials.
- Verify credit score presentation, monitoring alerts, and identity monitoring placement.
- Verify budget creation, cash flow views, and bill reminder surfaces with hands-on use.
- Verify offer cards, disclosures, and privacy language from support pages and app listings.

## Core User Journeys
- New user links accounts, sees net worth, and configures refresh permissions.
- Returning user checks score trend, recent transactions, and cash flow runway.
- User sets or edits budget categories and bill reminders.
- User reviews a credit alert, opens the explanation, and resolves the action item.
- User taps an offer or product recommendation and sees a disclosure-first detail page.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Welcome | Signup and consent | Email, phone | New, returning | Region blocked |
| Link Accounts | Financial aggregation | Institution, MFA | Connected, retrying | Login failure |
| Dashboard | Net worth and summary | None | Populated, empty | Stale data |
| Credit View | Score and factors | None | Active, frozen | No bureau data |
| Budget | Category planning | Amounts, goals | Balanced, overspent | Zero transactions |
| Bills | Due dates and reminders | Due date, amount | Upcoming, paid | Duplicate bill |
| Insights | Spending analysis | Filters | Loaded, offline | Sparse history |
| Offers | Product recommendations | Disclosures | Listed, dismissed | No eligible offers |
| Settings | Privacy and refresh | Permissions | Editable | Reauth required |

## Functional Requirements
- Aggregate account balances, transactions, and categorized spend.
- Present net worth, cash flow, and budget progress with trend charts.
- Show credit score history, factor explanations, and alert history.
- Support bill reminders, spend alerts, and category-based budget thresholds.
- Provide offer cards with clear disclosures, dismiss actions, and archive state.
- Support account refresh, reconnect, and credential-expired recovery flows.
- Allow manual account entry when aggregation is unavailable.
- Export or share summaries in a privacy-safe, user-controlled format.

## Data Model
- `User`: contact info, consent flags, locale, privacy settings.
- `LinkedAccount`: institution, type, balance, sync state, last refresh.
- `Transaction`: merchant, amount, category, pending flag, account link.
- `BudgetCategory`: target, spent, remaining, rollover policy.
- `CreditSnapshot`: score, date, factor list, alert state.
- `Bill`: due date, amount, recurrence, reminder status, payment status.
- `Offer`: source, disclosure text, eligibility, dismissed state.

## API/Backend Contracts
- `POST /auth/session`, `POST /accounts/link`, `POST /accounts/refresh`.
- `GET /dashboard`, `GET /transactions`, `GET /budgets`, `POST /budgets`.
- `GET /credit/snapshot`, `GET /credit/alerts`, `GET /bills`, `POST /bills`.
- `GET /offers`, `POST /offers/{id}/dismiss`.
- Use event-driven refresh jobs for linked accounts and credit snapshots.

## Realtime/Push/Offline
- Push on bill due, large transaction, credit change, and refresh completion.
- Keep last-known balances, score, and budgets offline.
- Defer refresh and classification jobs until connectivity returns.

## Permissions/Privacy/Safety
- Request explicit consent for account aggregation and notifications.
- Treat financial data and credit data as sensitive and redact it from logs.
- Offer data deletion, account unlink, and notification preference controls.
- Avoid manipulative offer placement; label sponsored content clearly.

## Analytics Events
- `account_link_started`, `account_linked`, `refresh_failed`
- `dashboard_viewed`, `budget_created`, `budget_updated`, `bill_added`
- `credit_viewed`, `credit_alert_opened`, `offer_viewed`, `offer_dismissed`
- `notification_enabled`, `privacy_setting_changed`

## Monetization
- Use sponsored offer placements and premium monitoring tiers as placeholders.
- Keep paid surfaces clearly separated from neutral financial summaries.

## Acceptance Tests
- User can connect a sandbox account and see balances on dashboard.
- User can create a budget category and see remaining amount update after a transaction.
- User can view a score history panel with factor explanations.
- User can add a bill reminder and receive a reminder event.
- User can dismiss an offer and not see it again in the same session.
- Offline user can still view cached balances and budgets.

## Implementation Notes
- Build a classification layer for transaction categorization and merchant normalization.
- Model bureau and offer data as pluggable adapters so providers can change later.
- Keep all money values decimal-safe and timezone-aware.
- Use a single refresh pipeline for accounts, credit data, and bill detection.
