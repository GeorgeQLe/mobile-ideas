# Digital Wallet Clone Spec

## Legal Scope
- Clone objective: reproduce wallet balances, send/request money, merchant history, linked cards/banks, disputes, and security center.
- Must not copy: trademarks, partner logos, checkout buttons, or proprietary risk engines.
- Original replacement brand/assets: use neutral wallet branding and original financial copy.

## Product Goal
- Provide a trusted wallet for consumer transfers and merchant payment history.
- Preserve the main surfaces: wallet home, send/request, activity, cards/banks, disputes, and security.
- Verify dispute, refund, and checkout history detail from lawful research.

## Research Verification Checklist
- [ ] Confirm wallet home modules and activity grouping.
- [ ] Verify send/request flow and funding source selection.
- [ ] Verify merchant activity, refund, and dispute entry points.
- [ ] Verify security center actions and alerts.
- [ ] Verify notification categories for transfers and claim outcomes.

## Core User Journeys
- User links bank accounts and cards.
- User sends or requests money.
- User reviews merchant purchases and opens a dispute.
- User checks wallet balance and transfer status.
- User manages security settings and login devices.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Wallet Home | Balance and shortcuts | Balance, activity | Active, empty | Funding missing |
| Send/Request | Transfer flow | Recipient, amount | Valid, pending | Recipient unknown |
| Activity | Transaction ledger | Filters, entries | Populated, empty | Sync lag |
| Disputes | Buyer protection | Transaction, reason | Open, resolved | Late filing |
| Security | Account safety | Devices, auth | Configured, alert | Login risk |

## Functional Requirements
- Support consumer transfers, merchant history, refunds, and disputes.
- Persist linked funding, balance, activity, and security settings.
- Provide receipt detail, support contact, and claim state transitions.
- Require risk checks for new recipients and high-value actions.
- Support multiple currencies only if the backend configuration enables it.

## Data Model
- User, Wallet, Balance, Transfer, Request, FundingSource, Transaction, Dispute, SecuritySetting, DeviceSession, Receipt.
- Transaction stores category, counterparty, amount, fee, and state.
- Dispute stores reason, evidence, and resolution timeline.

## API/Backend Contracts
- `GET /wallet`, `POST /transfers`, `POST /requests`
- `GET /activity`, `GET /activity/{id}`, `POST /disputes`
- `POST /funding-sources`, `GET /security`, `POST /security/devices`
- Use idempotency for transfer and dispute creation.

## Realtime/Push/Offline
- Push transfer completion, request response, refund, and security alerts.
- Cache recent activity offline.
- Show pending states locally until the backend settles.

## Permissions/Privacy/Safety
- Request contacts only if friend discovery is enabled.
- Protect bank and card tokens, claim evidence, and device sessions.
- Rate-limit spam claims, duplicate requests, and account-takeover attempts.
- Surface clear warning states for suspicious activity.

## Analytics Events
- `view_wallet`, `send_transfer`, `request_transfer`, `view_activity`, `open_dispute`, `add_funding_source`, `security_viewed`, `refund_received`

## Monetization
- Revenue comes from commercial checkout fees, instant transfer fees, and premium services.
- Fee and FX logic must be server-configurable.

## Acceptance Tests
- Activity loads with stable grouping after refresh.
- Dispute can attach evidence and preserve timeline.
- New recipient transfer triggers risk gating when needed.
- Offline mode preserves read-only activity and balance.
- Security center lists active devices and sign-out actions.

## Implementation Notes
- Separate consumer wallet from merchant checkout modules.
- Use original terminology and generic iconography.
- Keep dispute workflows auditable and stateful.
- Mark policy, fee, and risk rules that need live verification.
