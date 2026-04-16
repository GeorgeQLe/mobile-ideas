# Peer Payments Wallet Clone Spec

## Legal Scope
- Clone objective: reproduce peer transfers, stored balance, linked cards/banks, debit card, investing entry point, and security settings.
- Must not copy: trademarks, card art, bitcoin branding, proprietary cash card designs, or financial partner logos.
- Original replacement brand/assets: use neutral wallet branding and original financial UI copy.

## Product Goal
- Let users send money, receive money, hold a balance, and manage connected funding sources.
- Preserve the main structure: home, payments, balance, card, linked accounts, and security.
- Verify transfer timing, limits, and identity-check behavior from lawful research.

## Research Verification Checklist
- [ ] Confirm send/request flow and note fields.
- [ ] Verify balance display, transfer timing, and linked account management.
- [ ] Verify card ordering, card controls, and payment method selection.
- [ ] Verify investing/bitcoin-like entry point treatment if present in scope.
- [ ] Verify push notifications for incoming transfers and security events.

## Core User Journeys
- User links a bank account or card and adds balance.
- User sends money to a contact or requests payment.
- User views transaction history and balance changes.
- User manages a debit card and security settings.
- User opens an investing or crypto-like module if enabled by product scope.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Balance and shortcuts | Contacts, balance | Active, empty | Unlinked funding |
| Send Money | Transfer flow | Recipient, amount | Valid, pending | Recipient not found |
| Request Money | Pull payment | Amount, note | Sent, cancelled | Duplicate request |
| Card | Debit card controls | Limits, PIN, lock | Active, frozen | Lost card |
| Security | Account safety | Passcode, device | Configured, alert | Trusted device lost |

## Functional Requirements
- Support peer transfers by handle, phone, or contact list if enabled.
- Persist balance, transfer history, cards, linked funding, and security state.
- Support payment notes and split-request flows.
- Require server-side risk checks on first-time recipients and large transfers.
- Allow transaction receipts and support contact entry points.

## Data Model
- User, ContactHandle, BalanceAccount, Transfer, Request, FundingSource, Card, SecuritySetting, RiskCheck, Receipt.
- Transfer stores recipient, amount, memo, state, and settlement timing.
- BalanceAccount tracks available, pending, and reserved funds.

## API/Backend Contracts
- `POST /transfers`, `POST /requests`, `GET /activity`
- `POST /funding-sources`, `GET /balance`, `PATCH /card`
- `GET /security`, `POST /security/pin`
- Use idempotency keys for transfers and requests.

## Realtime/Push/Offline
- Push incoming transfer, transfer complete, request responded, and security alert events.
- Cache recent activity offline.
- Transfers should remain visible with pending state when network is lost.

## Permissions/Privacy/Safety
- Request contacts only if the product enables contact matching.
- Protect bank tokens, card data, and transfer history.
- Rate-limit fraud attempts, account takeovers, and repeated failed transfers.
- Show clear warning states for risky or newly added recipients.

## Analytics Events
- `view_home`, `add_funding_source`, `send_transfer`, `request_money`, `view_activity`, `card_locked`, `security_alert_opened`

## Monetization
- Revenue comes from instant transfer fees, interchange, and premium account features.
- Fee logic must be server-configurable.

## Acceptance Tests
- Transfer to a new recipient triggers risk review when thresholds are exceeded.
- Balance updates after settlement and appears in activity history.
- Card lock prevents new card transactions until unlocked.
- Request payment can be cancelled before acceptance.
- Offline mode preserves pending transfer details.

## Implementation Notes
- Keep payment rails abstracted behind adapters.
- Use original balance and card styling only.
- Separate contacts from transfer recipients.
- Mark transfer, compliance, and limit behavior that needs live verification.
