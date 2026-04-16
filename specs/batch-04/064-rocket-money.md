# Rocket Money-Style Clone Spec

## Legal Scope
- Build a bill management and subscription tracking app with original branding and copy.
- Do not copy Rocket Money marks, partner negotiation flows, or proprietary cancellation scripts.
- Use sandbox account data and synthetic merchant subscriptions for the initial release.
- Surface any cancellation assistance as guided user actions, not unauthorized automation.

## Product Goal
- Help a user find recurring charges, understand spend, negotiate bills, and set savings goals.
- Keep the home screen focused on alerts and next actions rather than raw data volume.

## Research Verification Checklist
- Verify account-link onboarding, recurring charge detection, and alert placement.
- Verify subscription grouping, bill reminders, and savings goal flows with hands-on use.
- Verify cancellation assistance and negotiation entry points from public support docs.
- Verify premium feature gating and disclosures from app store and help pages.

## Core User Journeys
- New user links accounts and sees subscriptions, bills, and insights.
- Returning user opens a detected recurring charge and marks it as active, paused, or canceled.
- User sets a bill reminder or savings target and monitors progress.
- User requests help with a bill and tracks the case lifecycle.
- User reviews a spend trend and moves an item to a different category.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Welcome | Signup and value prop | Email, phone | New, returning | No supported region |
| Accounts | Linked financial accounts | Institution, consent | Synced, stale | Refresh failure |
| Subscriptions | Recurring charge list | Merchant match | Active, paused | False positive |
| Bill Detail | Bill due date and amount | Due date, notes | Open, paid | Partial payment |
| Negotiation | Help request flow | Bill metadata | Submitted, active | No partner coverage |
| Goals | Savings goals | Amount, deadline | On track, behind | Overdraw risk |
| Insights | Spend and trends | Filters | Loaded, empty | Sparse data |
| Alerts | Charge and due alerts | Thresholds | Enabled, muted | Noise suppression |
| Settings | Privacy and billing | Preferences | Editable | Reauth required |

## Functional Requirements
- Detect recurring transactions and cluster them by merchant and cadence.
- Show bill due dates, spending trends, and subscription status labels.
- Allow users to mark subscriptions canceled, paused, or still active.
- Support guided bill help requests with status tracking and message history.
- Allow manual bills and goals when account sync is not available.
- Support alert rules for large charges, renewals, and low balances.
- Provide exportable history for subscriptions, bills, and cases.
- Keep all suggested actions user-confirmed.

## Data Model
- `LinkedAccount`: institution, sync state, balance, last refresh.
- `RecurringCharge`: merchant, cadence, amount range, confidence, status.
- `Bill`: due date, amount, category, reminder state, payment state.
- `SupportCase`: type, subject account, notes, lifecycle state, timestamps.
- `SavingsGoal`: target amount, due date, funded amount, auto-transfer flag.
- `AlertRule`: event type, threshold, channel, active flag.

## API/Backend Contracts
- `POST /accounts/link`, `GET /accounts`, `POST /accounts/refresh`.
- `GET /recurring`, `PATCH /recurring/{id}`, `POST /recurring/{id}/confirm`.
- `GET /bills`, `POST /bills`, `PATCH /bills/{id}`.
- `POST /cases`, `GET /cases`, `POST /cases/{id}/message`.
- `GET /goals`, `POST /goals`, `PATCH /alerts/{id}`.
- Use a classification job to suggest recurring charges from transaction history.

## Realtime/Push/Offline
- Push on due dates, renewal events, case updates, and large charge detection.
- Cache recurring charges, bills, goals, and case history offline.
- Queue edits and sync when connectivity returns.

## Permissions/Privacy/Safety
- Request explicit financial consent and optional notification access.
- Redact account numbers, merchant tokens, and support text from logs.
- Make cancellation assistance user-directed with confirmation before each external step.

## Analytics Events
- `account_linked`, `recurring_detected`, `subscription_confirmed`, `subscription_canceled`
- `bill_created`, `bill_paid`, `goal_created`, `goal_funded`
- `case_opened`, `case_message_sent`, `alert_enabled`, `insight_viewed`

## Monetization
- Use premium subscription and success-based service placeholders.
- Keep negotiation or help fees clearly disclosed before a user submits a case.

## Acceptance Tests
- User can link an account and see recurring charges within the subscription tab.
- User can mark a subscription canceled and see status persist across refresh.
- User can create a bill reminder and receive a push event.
- User can file a bill help request and track its lifecycle.
- User can create a savings goal and update progress with manual deposits.
- Offline viewing shows the latest cached subscriptions and bills.

## Implementation Notes
- Build recurring detection as a separate scoring pipeline with explainable signals.
- Treat support cases as asynchronous jobs with user-visible status changes.
- Use merchant normalization to avoid duplicate subscription cards.
