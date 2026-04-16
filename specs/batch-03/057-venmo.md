# Social Payments Clone Spec

## Legal Scope
- Clone objective: reproduce social payment feed, send/request, split bills, payment notes, and privacy controls.
- Must not copy: trademarked marks, social feed content, card art, or proprietary friend graph data.
- Original replacement brand/assets: use neutral social-wallet branding and synthetic feed data.

## Product Goal
- Make peer payments feel social, discoverable, and easy to reconcile.
- Preserve the main surfaces: home feed, send, request, split, transactions, cards, and privacy.
- Verify feed semantics, default privacy, and transfer states from lawful observation.

## Research Verification Checklist
- [ ] Confirm social feed composition and transaction visibility rules.
- [ ] Verify split-bill, request, and note editing behavior.
- [ ] Verify card linking, privacy defaults, and transaction reversal states.
- [ ] Verify notifications for received money, requests, and comments.
- [ ] Verify moderation or dispute handling for social notes.

## Core User Journeys
- User sends money with a note that appears in the feed if privacy allows.
- User requests payment from a friend or group.
- User splits a bill among participants.
- User changes privacy on a past transaction.
- User opens card or bank funding settings.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Feed | Social transaction stream | Friends, notes | Active, private | Hidden item |
| Send | Payment flow | Recipient, amount | Sent, pending | Recipient blocked |
| Request | Collect money | Amount, split | Open, paid | Partial payment |
| Split | Group settle-up | Participants, shares | Calculated, edited | Missing member |
| Privacy | Visibility controls | Transaction scope | Default, custom | Conflict with policy |

## Functional Requirements
- Support send/request, split payments, and payment notes.
- Persist feed items, transaction history, linked funding, and privacy settings.
- Allow default and per-transaction privacy levels.
- Support comments or reactions only if enabled and safe.
- Expose dispute and support flows for failed transfers.

## Data Model
- User, Contact, Payment, Request, SplitBill, FeedItem, FundingSource, PrivacyRule, Comment, Dispute.
- Payment stores sender, recipient, amount, note, privacy, and settlement state.
- SplitBill stores participants, shares, and settlement tracking.

## API/Backend Contracts
- `POST /payments`, `POST /requests`, `POST /splits`
- `GET /feed`, `GET /transactions`, `GET /privacy`
- `PATCH /payments/{id}/privacy`, `POST /disputes`
- Use idempotency for transfers and split settlement.

## Realtime/Push/Offline
- Push received money, request paid, split updated, and security events.
- Cache recent transactions offline.
- Preserve draft requests and split calculations locally.

## Permissions/Privacy/Safety
- Request contacts only for friend discovery if enabled.
- Protect bank details and transaction notes.
- Rate-limit spam requests, scam notes, and duplicate settlements.
- Make privacy defaults easy to understand before send.

## Analytics Events
- `view_feed`, `send_payment`, `request_payment`, `split_bill`, `change_privacy`, `funding_added`, `dispute_opened`, `notification_tapped`

## Monetization
- Revenue comes from instant transfer fees, card interchange, and premium features.
- Sponsored payment products must be clearly labeled.

## Acceptance Tests
- Privacy changes affect future visibility without corrupting transaction history.
- Split bill recalculates shares after participant edits.
- Payment notes appear correctly in feed when allowed.
- Duplicate payment submissions are blocked by idempotency.
- Offline view still shows cached transactions only.

## Implementation Notes
- Keep feed rendering separate from payment settlement.
- Use original color system and terminology.
- Model privacy rules as policy data, not UI-only toggles.
- Mark transfer, privacy, and split behavior that needs live verification.
