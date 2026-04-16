# Coinbase-Style Clone Spec

## Legal Scope
- Build a functional crypto portfolio and transfer app with original branding, colors, copy, and icons.
- Do not copy Coinbase marks, trade dress, proprietary risk models, or exchange-specific partner flows.
- Do not ship real trading, custody, or KYC integrations until separately licensed and reviewed.
- Use synthetic market data, mock identities, and sandbox payment rails for the initial product.

## Product Goal
- Let a user create an account, view balances, buy/sell mock assets, move funds, and track price movement.
- Make the core flow fast on mobile: portfolio first, action second, detail pages third.

## Research Verification Checklist
- Verify first-run onboarding, region gating, and identity checks from public app listings and help docs.
- Verify portfolio layout, watchlist behavior, and asset detail information architecture.
- Verify buy/sell, send/receive, and recurring purchase flows with hands-on observation.
- Verify alert types, fee disclosures, and security settings from public support content.

## Core User Journeys
- New user signs up, secures the account, and lands on the portfolio dashboard.
- Returning user checks holdings, taps an asset, and executes a trade or transfer.
- User adds a watchlist asset, sets a price alert, and reviews notifications.
- User reviews transaction history, tax/export records, and account settings.
- User resolves an identity or transfer hold through a guided support flow.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Welcome | Entry and signup | Email, phone, password | New, returning | Region blocked |
| Verify | Identity and device trust | OTP, doc upload | Pending, approved | Retry, timeout |
| Portfolio | Total value and holdings | None | Loaded, empty | Stale prices |
| Asset Detail | Price, chart, actions | Asset symbol | Open, watchlisted | Halted, delisted |
| Trade Ticket | Buy/sell preview | Amount, source | Draft, confirmed | Insufficient funds |
| Transfer | Send/receive assets | Address, network | Draft, pending | Wrong chain warning |
| Activity | Orders and transfers | Filters | Synced, offline cache | Reversal, failure |
| Alerts | Price and security alerts | Thresholds | Active, muted | Spam prevention |
| Settings | Security and preferences | 2FA, notifications | Editable | Account lock |

## Functional Requirements
- Show portfolio summary, fiat equivalent, and per-asset allocation.
- Support watchlists, price charts, historical performance, and asset search.
- Support simulated buy, sell, send, receive, and recurring buy flows.
- Present fees, estimated slippage, and risk warnings before confirmation.
- Track order state transitions from draft to submitted to settled or failed.
- Provide account security controls: password, 2FA, device list, and session revoke.
- Support statements, tax/export download placeholders, and support entry points.
- Prevent unsupported operations with clear reason codes and recovery actions.

## Data Model
- `User`: profile, locale, verification state, security settings.
- `Portfolio`: fiat totals, holdings, cost basis, valuation timestamp.
- `Asset`: symbol, name, type, price, chart series, market status.
- `Order`: side, amount, fee estimate, status, timestamps, failure reason.
- `Transfer`: direction, address, network, confirmation status, tx hash.
- `AlertRule`: asset, threshold, delivery channel, active state.
- `DeviceSession`: device metadata, trusted flag, last seen.

## API/Backend Contracts
- `POST /auth/session`, `POST /auth/verify`, `POST /auth/logout`.
- `GET /portfolio`, `GET /assets`, `GET /assets/{id}`, `GET /activity`.
- `POST /orders/preview`, `POST /orders`, `POST /transfers`, `POST /alerts`.
- `GET /prices/stream` or `GET /prices/poll` for quote refresh.
- `GET /statements`, `GET /settings/security`, `DELETE /sessions/{id}`.
- Enforce idempotency keys for order and transfer writes.

## Realtime/Push/Offline
- Push on price alerts, order completion, verification issues, and security events.
- Use websocket or polling fallback for live quotes and order state.
- Cache watchlists, activity, and portfolio snapshots for offline viewing.
- Block writes while offline but preserve drafts for retry.

## Permissions/Privacy/Safety
- Require explicit consent for identity verification, notifications, and biometrics.
- Minimize sensitive PII in logs and analytics.
- Add transfer address warnings, chain mismatch checks, and suspicious activity holds.
- Offer session history, device management, and logout-all actions.

## Analytics Events
- `signup_started`, `signup_completed`, `kyc_started`, `kyc_completed`
- `portfolio_viewed`, `asset_opened`, `watchlist_added`, `alert_created`
- `trade_previewed`, `trade_submitted`, `trade_failed`, `transfer_submitted`
- `security_setting_changed`, `session_revoked`, `support_opened`

## Monetization
- Use spread, transfer, or premium tier placeholders rather than copying Coinbase pricing.
- Gate advanced features behind plan entitlements only if the later business model needs it.

## Acceptance Tests
- New user can finish signup and reach an empty portfolio state.
- User can preview and submit a mock buy order with fee disclosure.
- User can add an asset to watchlist and receive a price alert.
- User can initiate a transfer and see pending, success, and failure states.
- Offline user can still view cached holdings and activity.
- Security settings can revoke a device session and require re-authentication.

## Implementation Notes
- Start with mocked markets and a deterministic order engine.
- Separate quote refresh from order execution so the UI remains responsive.
- Keep all money-like values as decimal-safe strings in the backend.
- Replace public market data later with a licensed provider and a formal risk review.
