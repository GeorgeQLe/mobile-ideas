# Revolut-Style Clone Spec

> Metadata
> - Inspiration app: Revolut
> - Category: Multi-currency neobank / investing / crypto
> - Readiness status: Draft 1
> - Verification basis: source discovery of public marketplace listings, help articles, and regulatory disclosures pending exact URL verification.
> - Manual verification blockers: multi-currency wallet FX, stock/crypto trading, international transfers, card issuance, budgeting, and regional licensing flows require hands-on verification.
> - Legal scope: lawful functional parity only; original code, brand, copy, and partner-bank/broker/crypto integrations. Regulatory posture varies by jurisdiction; the operator must hold appropriate licenses or partner with licensed entities.

## Overview

Build an original multi-currency financial super-app inspired by Revolut's workflow: multi-currency wallets with FX, stock and crypto trading, international transfers, physical/virtual cards with spending controls, savings/vaults, budgets, and analytics.

The clone must use original copy, iconography, and integrations. Regulatory posture must map to operator's licenses by region (e.g., e-money, broker-dealer, MSB/VASP equivalents).

This spec is Draft 1: surfaces ready; wallet/FX, trading, transfers, and crypto remain behind regulatory review per jurisdiction.

## Goals

- Multi-currency wallet supporting hold/convert across a bounded set of fiat currencies with transparent FX margins.
- Stock and ETF trading (fractional where partner-broker allows) with market data licensing.
- Crypto buy/sell/hold via licensed partner custodian; clear risk disclosures.
- International transfers with upfront fee and FX disclosures.
- Physical and virtual debit cards with spending controls, disposable virtual cards, and travel mode.
- Savings vaults, budgeting, category analytics, and subscription tiers.

## Non-Goals

- Do not imply banking, brokerage, or VASP licenses the operator does not hold.
- Do not copy Revolut trademarks, tier names, or marketing copy.
- Do not offer margin, leverage, or derivatives without matching licenses.
- Do not support jurisdictions without a compliance path.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store listing | https://apps.apple.com/us/app/revolut/id932493382 | iOS features | Source discovery — pending exact URL verification |
| Google Play listing | https://play.google.com/store/apps/details?id=com.revolut.revolut | Android features | Source discovery — pending exact URL verification |
| Product support | https://www.revolut.com/help/ | Feature behavior | Source discovery — pending exact URL verification |
| Legal & disclosures | https://www.revolut.com/legal/ | Licensing disclosures references | Source discovery — pending exact URL verification |
| Regulator references | https://www.fca.org.uk/ | Licensing reference | Source discovery — pending exact URL verification |

## Detailed Design

### Source-Backed Product Requirements

- Multi-currency wallet with per-currency balances; conversions quoted at operator FX + transparent margin.
- Weekday vs weekend FX margin may vary; must be disclosed.
- Stock trading via partner-broker with market-data license compliance; fractional support where allowed.
- Crypto via licensed custodian partner; wallet custody not self-custody; withdrawals to external wallets if jurisdiction allows.
- International transfers via SWIFT/local rails; upfront fee + FX quote; purpose-of-payment fields for compliance.
- Card controls: freeze, change PIN, disposable virtual cards, travel mode, location-based auth, merchant categories.
- Savings vaults with round-ups and recurring contributions.
- Budget/categorization with merchant-based classification.
- Subscription tiers gate features (FX limits, ATM limits, card metals, insurance, lounge access). All names original.

## Core User Journeys

- User signs up, completes KYC (possibly enhanced KYC for crypto/trading), picks a home currency.
- User receives virtual card and orders physical card; activates on arrival.
- User adds funds and converts some to another currency; sees FX quote and margin.
- User sends an international transfer; purpose-of-payment selected; sees beneficiary confirmation.
- User buys a stock/ETF (fractional where supported) or crypto; sees disclosures.
- User sells holdings and withdraws back to home currency.
- User sets up a vault and round-ups.
- User uses budgets and analytics to see spending by category.
- User upgrades/downgrades subscription; sees feature changes.
- User reports card fraud or disputes a transaction.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Onboarding/KYC | Identity, tier selection | name, DOB, ID doc | collecting, verified | denied, enhanced review |
| Home | Balances per currency, actions | navigation | empty, funded | partner outage |
| Exchange | FX quote, convert | from/to, amount | quote-fresh, quote-expired | weekend-margin, rate-move |
| Cards | Controls, virtual cards | toggles, create disposable | active, frozen, replaced | fraud hold |
| Transfers | Local/international | beneficiary, amount, purpose | quoted, submitting, sent | compliance hold |
| Stocks | Search, quote, trade | query, trade ticket | buyable, halted | after-hours, fractional-min |
| Crypto | Buy/sell, external withdraw | amount, address | buyable, withdraw-allowed | geo-restricted |
| Vaults | Create, fund, round-ups | amount, cadence | active, paused | funding fail |
| Budgets | Categories, limits | limit inputs | on-track, exceeded | merchant reclassify |
| Subscription | Plans, benefits | select, confirm | current, upgraded | platform mismatch |
| Disputes | Card disputes | category | submitted, resolved | denied |
| Settings | Security, notifications | edits | loaded | MFA needed |

## Data Model

- `User`: identity, tiered-KYC, jurisdiction, tax residency, subscription id.
- `Wallet`: per-currency balance, held amounts, pending FX.
- `Card`: virtual/physical/disposable, controls, wallet provisioning.
- `Transaction`: currency, amount, fx pair, merchant hash, category, status.
- `FxQuote`: pair, rate, margin, expiry.
- `Transfer`: rail (local/SWIFT), beneficiary id, purpose-of-payment, status.
- `StockAccount`, `StockPosition`, `StockOrder`.
- `CryptoAccount`, `CryptoPosition`, `CryptoOrder`, `ExternalWalletAddress` (whitelisted).
- `Vault`: linked currency, rule set, balance.
- `Budget`: category, limit, period.
- `Subscription`: plan, benefits, billing.
- `AuditEvent`: append-only compliance events.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/mfa`.
- `POST /kyc/start`, `POST /kyc/enhanced`, `GET /kyc/status`.
- `POST /wallets/:currency/add`, `POST /wallets/convert` (with quote id), `GET /wallets`.
- `POST /fx/quote`.
- `POST /cards`, `PATCH /cards/:id`, `POST /cards/disposable`, `POST /cards/:id/freeze`.
- `POST /transfers/local`, `POST /transfers/international`, `GET /transfers/:id`.
- `POST /stocks/orders`, `GET /stocks/positions`.
- `POST /crypto/orders`, `POST /crypto/withdrawals`, `POST /crypto/addresses`.
- `POST /vaults`, `PATCH /vaults/:id`.
- `POST /budgets`, `PATCH /budgets/:id`.
- `POST /subscriptions`, `POST /subscriptions/cancel`, `POST /billing/webhook`.
- `POST /disputes`, `POST /support/cases`.

## Realtime, Push, And Offline Behavior

- Card authorizations and FX quote expirations are real-time via push + SSE.
- Crypto price streams require licensed data; rate-limit clients appropriately.
- Offline: read-only cached balances and activity, labeled stale.
- Push covers transactions, quotes, transfer status, trade fills, KYC next steps, card fraud.

## Permissions, Privacy, And Safety

- Camera/notifications/biometrics/location at point of use (location used for travel mode and fraud).
- Enhanced KYC for crypto/trading; travel-rule compliance for crypto where applicable.
- PII and IDs encrypted; redacted in analytics and support tooling.
- Sanctions screening and transaction monitoring via partner.
- Tier-specific disclosures (FX limits, insurance scope) in plain language.
- Licensing disclosures by jurisdiction (e-money, broker, VASP equivalents).
- Launch owners: compliance, security, privacy, regulatory affairs per region.

## Analytics And Monetization

- Privacy-safe events only: onboarding, KYC classes, convert classes (no amounts), trade classes, transfer classes, card state changes, subscription changes.
- Monetization via interchange, FX margin, trading fees, subscription tiers.
- Margins and fees are always visible before confirmation.

## Edge Cases

- Quote expiry during confirmation; user sees fresh quote.
- Weekend FX margin change without user awareness; disclose clearly.
- Crypto withdrawal to unsupported or non-whitelisted address.
- International transfer compliance hold; additional docs required.
- Card travel mode false positives; self-serve override.
- Disposable card reuse attempt after use.
- Stock after-hours order routing; halted security.
- Sanctions match on beneficiary; transfer blocked with appropriate messaging.
- Subscription downgrade revokes features mid-month.

## Test Plan

- KYC tiered flows.
- FX quote/convert idempotency and expiry.
- Card lifecycle including disposable and travel mode.
- Transfer flows (local and international) with fee/FX previews.
- Stock and crypto order flows with partner-broker/custodian integration mocks.
- Crypto external withdrawal whitelist tests.
- Vaults, budgets, and categorization.
- Subscription tier gating.
- Dispute and support flows.
- Privacy and analytics redaction.
- Accessibility.
- Manual verification: funded account across currencies, card, and trading.

## Acceptance Criteria

- Multi-currency and trading flows are gated by jurisdiction and license posture.
- FX and fee disclosures visible before confirmation on every flow.
- Crypto is custodian-held by default; external withdrawals constrained by compliance.
- Card controls (including disposable) are first-class.
- Subscription tier changes are server-authoritative.
- Manual verification blockers resolved or feature-flagged.

## Open Questions

- Which jurisdictions ship in V1 and under what license/partner model?
- Will V1 include crypto at launch or later?
- Which partner-broker handles stocks; which custodian handles crypto?
- Which rails are supported for international transfers in V1?
- Which subscription tiers and features ship at launch?

## Build Plan

- Phase 1: auth, KYC, home-currency wallet, cards, transactions.
- Phase 2: FX + multi-currency wallets and conversions.
- Phase 3: international transfers and purpose-of-payment.
- Phase 4: stocks and crypto with licensed partners.
- Phase 5: vaults, budgets, analytics, subscriptions.
- Phase 6: compliance, accessibility, manual verification.

## Next Steps

- Partner and licensing strategy per jurisdiction.
- Legal review of fee/margin disclosures.
- Replace discovery URLs with exact first-party URLs before implementation.
