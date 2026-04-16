# Bank Transfer Clone Spec

## Legal Scope
- Clone objective: reproduce bank-linked transfer onboarding, recipient verification, send/request, transaction history, and fraud warnings.
- Must not copy: bank branding, payment rail logos, partner marks, or proprietary enrollment flows.
- Original replacement brand/assets: use neutral bank-transfer branding and original onboarding copy.

## Product Goal
- Enable fast bank-to-bank transfers with clear recipient verification and limits.
- Preserve the main surfaces: bank link, send, request, contacts, history, and settings.
- Verify bank enrollment, limits, and refund/fraud messaging from lawful research.

## Research Verification Checklist
- [ ] Confirm onboarding, bank-link, and recipient verification flow.
- [ ] Verify send/request timing, history grouping, and limit displays.
- [ ] Verify fraud warnings, error states, and support prompts.
- [ ] Verify notification behavior for completed and failed transfers.
- [ ] Verify bank-eligibility and account status messaging.

## Core User Journeys
- User links a supported bank account.
- User sends money to an enrolled recipient.
- User requests money from a contact.
- User views transfer history and status.
- User reviews fraud warnings and transfer limits.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Bank Link | Enrollment flow | Routing, account | Verified, pending | Bank unsupported |
| Send | Transfer initiation | Recipient, amount | Valid, pending | Recipient unverified |
| Request | Collect money | Amount, note | Open, paid | Duplicate request |
| History | Transfer ledger | Filters, entries | Populated, empty | Sync delay |
| Safety | Fraud education | Alerts, tips | Visible, dismissed | Urgent lock |

## Functional Requirements
- Support bank-linked transfer enrollment and verification.
- Persist recipients, history, limits, and linked accounts.
- Restrict transfers to eligible banks and verified recipients per backend policy.
- Display clear status for pending, sent, failed, and returned transfers.
- Provide safety education and support routes.

## Data Model
- User, BankAccount, Recipient, Transfer, Request, LimitProfile, VerificationState, TransactionHistory, SafetyAlert.
- Transfer stores enrollment state, recipient verification, amount, and settlement timing.
- LimitProfile stores per-day, per-week, and per-transfer constraints.

## API/Backend Contracts
- `POST /bank-links`, `GET /recipients`, `POST /transfers`, `POST /requests`
- `GET /history`, `GET /limits`, `GET /safety-alerts`
- Use idempotency for transfer creation and recipient enrollment.

## Realtime/Push/Offline
- Push transfer sent, completed, failed, and request paid events.
- Cache history and recipient list offline.
- Transfers should surface as pending if the connection drops mid-request.

## Permissions/Privacy/Safety
- Request contacts only if recipient discovery is enabled.
- Protect bank credentials and transfer history.
- Rate-limit fraud attempts and repeated enrollment failures.
- Show clear warnings for unenrolled recipients and risky transfers.

## Analytics Events
- `bank_linked`, `send_transfer`, `request_money`, `view_history`, `limit_viewed`, `fraud_tip_opened`, `transfer_completed`

## Monetization
- Revenue comes from bank partnership fees or premium transfer features if enabled.
- Pricing and limit exceptions must be server-configurable.

## Acceptance Tests
- Bank link rejects unsupported institutions cleanly.
- Transfer cannot proceed to unverified recipients.
- History shows all statuses in stable order.
- Safety alerts remain accessible from failures.
- Offline mode preserves read-only transfer history.

## Implementation Notes
- Keep bank enrollment and transfer execution separate.
- Use original safety copy and neutral icons.
- Model limits as policy data, not hardcoded UI text.
- Mark bank, limit, and recipient verification details that need live verification.
