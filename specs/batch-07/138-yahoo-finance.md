# Yahoo Finance-Style Clone Spec

> Metadata
> - Inspiration app: Yahoo Finance
> - Category: Finance news and markets
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-05-01.
> - Verification basis: exact public marketplace listings, first-party product/help pages, privacy policy, terms, and legal/disclosure pages verified on 2026-05-01.
> - Manual verification blockers: native portfolio-linking flows, broker aggregation provider behavior, real-time quote licensing, premium subscription restore, ad consent screens, and push payloads require finance/privacy owners plus a test device/account.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, market/news/provider data, disclosures, and UX.

## Overview

Build an original mobile finance news and markets app inspired by Yahoo Finance's public workflow: market quotes, portfolio tracking, linked holdings, watchlists, personalized finance news, alerts, charts, movers, earnings, crypto/bond coverage, and ad/subscription surfaces. The clone must not copy Yahoo Finance branding, protected UI artwork, screenshots, copy, private APIs, partner contracts, proprietary datasets, or regulated operating status.

This spec is implementation-ready for a public-source V1 that targets documented public behavior only. Account-, subscription-, KYC-, banking-, brokerage-, payment-, market-data-, child/teen-, native-device-, and region-gated behavior must ship behind feature flags or acceptance-test blockers until lawful hands-on verification and provider review complete.

## Goals

- Deliver the core finance news and markets jobs documented by the official app listings and first-party support/legal pages.
- Keep all regulated actions provider-backed, auditable, and reversible where the domain permits.
- Show risk, partner, fee, market-data, privacy, and non-affiliation disclosures before users rely on financial outputs.
- Preserve a hard boundary between verified public behavior, inferred implementation requirements, and blocked manual-verification areas.
- Produce concrete screens, entities, API contracts, offline rules, analytics, and tests for a downstream implementation repo.

## Non-Goals

- Do not build a Yahoo Finance-branded app or imply affiliation, endorsement, banking status, broker-dealer status, RIA status, publisher status, money-transmitter status, or insurance status.
- Do not scrape Yahoo Finance, reuse private APIs, replay app traffic, copy article text, reproduce proprietary algorithms, or use unlicensed market/account/card/payment data.
- Do not execute trades, money transfers, credit reporting, card issuance, lending, advisory recommendations, account aggregation, or child/teen financial flows without licensed partners and compliance sign-off.
- Do not make financial, tax, legal, medical, or investment advice claims from generic educational tooling.
- Do not claim one-for-one native parity until manual verification blockers are resolved with lawful device/account evidence.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/yahoo-finance-stock-market/id328412701 | Official iOS listing, device support, age rating, privacy label, feature claims, subscriptions or account disclosures where listed | Verified 2026-05-01 |
| Google Play | https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.finance | Official Android listing, feature claims, content rating, data safety, developer contact, partner/risk disclosures where listed | Verified 2026-05-01 |
| Yahoo Finance website | https://finance.yahoo.com | First-party product orientation and non-affiliation boundary for a lawful functional-parity clone | Verified 2026-05-01 |
| Yahoo Finance help/support | https://help.yahoo.com/kb/finance-for-web | Support taxonomy, account-management concepts, troubleshooting paths, and user-facing escalation expectations | Verified 2026-05-01 |
| Yahoo Finance Privacy Policy | https://legal.yahoo.com/us/en/yahoo/privacy/index.html | Personal, financial, device, location, analytics, support, retention, sharing, deletion, and privacy-rights obligations | Verified 2026-05-01 |
| Yahoo Finance Terms | https://legal.yahoo.com/us/en/yahoo/terms/otos/index.html | Eligibility, account rules, prohibited conduct, subscription/payment terms, risk language, user responsibilities, and dispute path | Verified 2026-05-01 |
| Yahoo Finance legal/disclosures | https://legal.yahoo.com/us/en/yahoo/terms/product-atos/finance/index.html | Finance, banking, brokerage, advisory, market-data, partner-bank, FDIC/SIPC, risk, or product-specific disclosures | Verified 2026-05-01 |

## Detailed Design

### Source-Backed Product Requirements

- The V1 must center on market quotes, portfolio tracking, linked holdings, watchlists, personalized finance news, alerts, charts, movers, earnings, crypto/bond coverage, and ad/subscription surfaces, while using original product names, copy, visual design, data contracts, and content.
- The public app listings and first-party pages support portfolio tracking, linked holdings, quotes, market news, alerts, watchlists, ads, in-app purchases, privacy labels, and Yahoo Finance additional terms; any deeper account, paid, native, or regulated behavior remains blocked until hands-on verification.
- All onboarding must separate informational education from regulated account opening, with explicit eligibility checks before any money movement, investment, borrowing, or banking surface.
- Every screen that shows prices, balances, yields, projected growth, rewards, or market data must display stale-state, source/attribution, and risk/disclosure context.
- The app must never present itself as the inspiration app, a bank, broker-dealer, investment adviser, money transmitter, insurer, or licensed publisher unless the downstream operator actually has that status.
- Financial guidance must be framed as educational or tool output unless the downstream entity has a reviewed advisory model and licensed personnel/registration coverage.
- KYC/AML, sanctions, fraud, account-takeover, device-risk, and suspicious-activity workflows must be provider-backed and auditable before launch.
- Sensitive data collection must be minimized: financial account data, government IDs, card PANs, precise location, child data, trading intent, support attachments, and tax records require scoped retention and access logs.
- Push notifications must avoid sensitive balances, order details, child location, or personally identifying financial data by default.
- Subscription, advisory, banking, transfer, rewards, and trading fees must be represented with original copy and dated assumptions; dynamic fees must come from server-side configuration.
- Support paths must include account lock, fraud report, lost card, disputed transaction, transfer failure, investment/trading issue, privacy request, and complaint escalation.
- Accessibility must support dynamic type, screen readers, reduced motion, color-independent gains/losses, clear error recovery, and secure entry fields.
- Portfolio import and linked holdings are sensitive financial-data surfaces; V1 must support manual holdings first and keep brokerage aggregation behind a provider review gate.
- News, charts, video, podcasts, and explainers must be original or licensed, with paywall, copyright, and editorial review controls.
- Market-news personalization must not infer protected traits or target users with financial advertising from sensitive portfolio behavior without explicit consent.

## Core User Journeys

- New user installs the app, reviews original onboarding, sees non-affiliation and finance news and markets disclosures, and chooses sign-up or read-only exploration where permitted.
- User creates an account, completes email/phone verification, device trust, passcode/biometric setup, and receives a clear explanation of any financial-data collection.
- User starts a regulated flow, hits eligibility/KYC gates, uploads required information through a provider-backed path, and sees pending, approved, rejected, and retry states.
- User lands on the home dashboard, reviews balances/watchlists/news/tasks, and can distinguish cached, delayed, realtime, and unavailable data.
- User searches for a symbol, account, recipient, goal, card, article, or support topic and receives scoped results with empty and error states.
- User configures alerts, notification preferences, privacy settings, and disclosure acknowledgement without exposing sensitive details in push payloads.
- User initiates the primary money/content/investing action, reviews fees/risks/limits, confirms with strong authentication, and receives a durable receipt or audit event.
- User edits recurring automation, transfer schedule, watchlist, portfolio setting, chore/allowance, subscription, or saved preference and sees conflict-safe synchronization.
- User encounters an ineligible feature, risk block, region block, subscription gate, provider outage, or account hold and sees a support path rather than a broken control.
- User reports fraud, abuse, incorrect data, suspicious content, lost card, account takeover, or transaction dispute and sees escalation state.
- User exports data, deletes account, closes eligible financial products, or revokes connected accounts with clear retention and regulatory caveats.
- Returning user opens offline or after a long absence and sees stale data labels, cached read-only state, required reauthentication, and reconciliation after reconnect.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Entry, legal framing, sign-up, sign-in | email, phone, SSO where allowed | new, returning, locked, region-blocked | underage, unsupported region, failed verification |
| Eligibility/KYC | Regulated onboarding and risk gates | identity fields, document provider, consent | not-started, pending, approved, rejected | manual review, sanctions hit, provider outage |
| Home Dashboard | Primary account, markets, content, or family overview | navigation, cards, refresh | loaded, empty, cached, loading | stale data, partial provider outage |
| Search | Find symbols, accounts, recipients, articles, help topics | query, filters | empty, results, no-results | rate limited, restricted symbol/recipient |
| Detail View | Primary item detail and disclosure context | tabs, chart range, action buttons | loaded, delayed, realtime | unsupported item, licensing gap |
| Action Review | Confirm money movement, trade, transfer, subscription, alert, or family action | amount, target, schedule, auth | draft, review, confirmed | limit exceeded, blocked, duplicate |
| Activity/History | Receipts, transactions, posts, articles, alerts, audit trail | filters, item selection | loaded, pending, settled | reversal, correction, missing record |
| Alerts/Notifications | Topic, price, account, fraud, support, family alerts | toggle, threshold, channel | enabled, disabled, permission-needed | push denied, throttled |
| Support Center | Help, complaint, fraud, dispute, safety escalation | case form, attachment, reason | draft, submitted, in-review | SLA miss, duplicate case |
| Privacy Center | Data export, deletion, sharing controls, privacy rights | export, delete, opt-out | idle, pending, complete | regulated retention, identity recheck |
| Subscription/Fees | Plans, paid features, restore, fee schedule | plan choice, restore, manage | free, trial, paid, canceled | platform mismatch, refund, webhook delay |
| Legal/Disclosures | Risk, partner, license, market-data, banking, advisory copy | document links, acknowledgement | current, accepted | outdated disclosure, missing locale |
| Settings/Security | Profile, devices, passcode, biometrics, connected accounts | toggles, revoke, logout | loaded, verified | account hold, reauth required |

## Data Model

- `User`: account identity, eligibility, locale, region, age/role flags, verification state, and privacy preferences.
- `DeviceSession`: device id, platform, app version, push token, biometric/passcode state, risk score, and session expiry.
- `IdentityVerification`: provider reference, required fields, document checks, sanctions/PEP status, pending/rejected/approved state, and evidence retention.
- `RiskReview`: fraud, AML, market-abuse, credit, family-safety, or account-takeover review state with owner and resolution reason.
- `ConsentRecord`: terms/privacy/disclosure/marketing/analytics/child-parent consent version, timestamp, actor, and revocation state.
- `DisclosureAcknowledgement`: legal document id, version, product surface, required/optional flag, and acceptance timestamp.
- `ConnectedAccount`: external account or brokerage connection, provider token, scopes, status, refresh time, and revocation.
- `FinancialAccount`: cash, card, brokerage, savings, transfer, family, or content subscription account with partner, status, limits, and owner role.
- `BalanceSnapshot`: account id, amount, currency, available/pending split, source, stale timestamp, and display restrictions.
- `Transaction`: money, card, transfer, order, subscription, reward, support, or content purchase event with lifecycle and dispute state.
- `TransferInstruction`: source, destination, amount, currency, quote, schedule, limits, risk check, idempotency key, and receipt.
- `PaymentInstrument`: card, bank account, wallet, or funding source token with network, verification, lock/freeze, and display-safe metadata.
- `InvestmentProfile`: risk tolerance, time horizon, goals, suitability inputs, portfolio selection, advisory acknowledgements, and blocked states.
- `Instrument`: symbol, asset class, exchange, issuer, quote eligibility, trade/support status, and disclosure requirements.
- `QuoteSnapshot`: instrument, bid/ask/last, change, timestamp, venue, delayed/realtime flag, attribution, and licensing scope.
- `OrderIntent`: non-executing or provider-backed action review for trade, transfer, card, borrowing, subscription, or family approval with risk checks.
- `AlertRule`: topic, symbol/account/role target, threshold, delivery channel, throttle, quiet hours, and permission state.
- `SubscriptionEntitlement`: plan, platform, renewal, trial, cancellation, refund, restore, feature gates, and billing support reference.
- `SupportCase`: reason, severity, attachments, redaction state, owner queue, SLA, audit events, and final resolution.
- `AuditEvent`: append-only record for Yahoo Finance-inspired auth, consent, disclosure, privacy, support, regulated-action, and admin changes.

## API And Backend Contracts

- `POST /auth/session`: creates, revokes, or strengthens authenticated device sessions with audit events.
- `DELETE /auth/session`: creates, revokes, or strengthens authenticated device sessions with audit events.
- `POST /auth/device-trust`: creates, revokes, or strengthens authenticated device sessions with audit events.
- `GET /me`: domain API.
- `PATCH /me/preferences`: domain API.
- `POST /identity/verifications`: starts and reads regulated identity/KYC/age/role verification through a provider-backed workflow.
- `GET /identity/verifications/:id`: starts and reads regulated identity/KYC/age/role verification through a provider-backed workflow.
- `GET /disclosures`: serves current legal/risk/partner disclosures and records acknowledgements.
- `POST /disclosures/:id/acknowledge`: serves current legal/risk/partner disclosures and records acknowledgements.
- `GET /dashboard`: returns the Yahoo Finance-inspired home summary with stale-data labels and feature flags.
- `GET /search?query=`: performs scoped search across allowed symbols, accounts, recipients, content, help, or family objects.
- `GET /accounts`: lists authorized financial or product accounts with role-scoped balances and status.
- `POST /connected-accounts`: lists authorized financial or product accounts with role-scoped balances and status.
- `DELETE /connected-accounts/:id`: lists authorized financial or product accounts with role-scoped balances and status.
- `GET /transactions?cursor=`: returns paginated activity with pending, posted, reversed, disputed, and hidden-sensitive states.
- `POST /transfers/quotes`: creates a server-side quote with fees, rates, limits, availability, and expiry.
- `POST /transfers`: submits or reads idempotent money movement, account transfer, or equivalent action state.
- `GET /transfers/:id`: submits or reads idempotent money movement, account transfer, or equivalent action state.
- `GET /instruments/:symbol`: returns display-safe instrument metadata with licensing and support flags.
- `GET /quotes?symbols=`: returns attributed quote snapshots with delayed/realtime and entitlement labels.
- `POST /orders/intents`: creates an action intent for provider-backed regulated execution or blocked review.
- `POST /alerts`: creates, updates, or deletes notification rules with permission and throttling state.
- `PATCH /alerts/:id`: creates, updates, or deletes notification rules with permission and throttling state.
- `GET /entitlements`: returns server-authoritative feature access and subscription state.
- `POST /billing/restore`: reconciles app-store or web purchases, refunds, cancellation, and restore state.
- `POST /support/cases`: creates a redacted support, fraud, dispute, abuse, or complaint case.
- `POST /data-export`: starts a privacy export workflow with identity recheck and delivery status.
- `DELETE /account`: starts account deletion/closure with regulatory retention caveats and product-specific preconditions.

## Realtime, Push, And Offline Behavior

- Dashboard, quote, balance, transfer, support, and entitlement summaries may be cached for read-only offline use with visible stale timestamps.
- Money movement, trading, borrowing, account opening, child/teen authorization, card changes, and privacy deletion require an online server-confirmed state.
- Push notifications must use opaque identifiers and generic copy by default; sensitive balances, order details, child location, and account identifiers stay in-app.
- Realtime updates should use server-sent events or websockets where licensed; otherwise poll with backoff and show delayed-data labels.
- Local drafts for support messages, alerts, watchlists, and scheduled actions must reconcile through idempotent server requests after reconnect.
- Provider outages must degrade only the affected capability and keep legal/disclosure/support surfaces reachable.
- Audit events must be append-only for consent, disclosure, auth, device, money, privacy, support, and admin actions.
- Feature flags must gate every unresolved manual-verification blocker named in the metadata.

## Permissions, Privacy, And Safety

- Request camera, files, contacts, location, notifications, biometrics, and motion permissions only at point of use with original explanatory copy.
- Financial account numbers, card data, government IDs, tax documents, support attachments, child/teen data, precise location, and market/trading intent require field-level redaction in logs and analytics.
- Default analytics must exclude raw balances, transaction memo text, holdings, recipient names, article bodies, post bodies, support message content, child locations, and government-ID data.
- Account takeover controls must include device trust, step-up authentication, session revocation, password recovery hardening, and suspicious-change notifications.
- Fraud, dispute, abuse, market-manipulation, insider-information, harassment, child-safety, location-safety, and complaint flows must have named operational owners.
- Every investment, savings yield, cash sweep, card, transfer, borrowing, credit, insurance, or paid-plan claim must show dated assumptions and links to current disclosures.
- Accessibility owner must verify screen reader labels, dynamic type, keyboard/focus order, reduced motion, sufficient contrast, and non-color-only indicators.
- Launch owner: product owner for scope, compliance/legal owner for disclosures, privacy/security owner for data controls, support owner for escalation, accessibility owner for inclusive UX.

## Analytics And Monetization

- Track only privacy-safe events: onboarding step viewed, disclosure acknowledged, dashboard viewed, item opened, action reviewed, action confirmed, alert changed, support case submitted, entitlement changed, privacy request started, and provider error code.
- Use stable object types and coarse categories rather than raw symbols, balances, transaction memos, child location, article/post text, or recipient identifiers unless explicit consent and a compliance basis exist.
- Monetization can include original subscriptions, advisory fees, transfer fees, interchange-funded rewards, premium content, or partner fees only when copied plan names/prices/promotions are avoided.
- Fee schedules, APYs, cash yields, transfer rates, rewards, and subscription benefits must be server-configured with effective dates and rollback support.
- Paywalls and upgrade prompts must identify the blocked feature, current entitlement, fee/renewal rules, restore path, cancellation path, support path, and any regulatory caveat.
- Advertising, if used, must not target sensitive financial, child, location, health, or hardship behaviors.

## Edge Cases

- KYC provider returns pending manual review after the user has already started account setup.
- User is in an unsupported region or product availability changes after onboarding.
- Market data is delayed, unavailable, corrected, or licensed only for display after login.
- User attempts a transaction while offline, with stale balance, or after session expiry.
- Duplicate tap or retry creates two intents; idempotency must prevent duplicate money movement.
- Funding source is reversed, returned, or disconnected after a scheduled transfer is queued.
- Push notification arrives after the relevant price, transaction, location, or support state has changed.
- Subscription is active on one platform but not yet reconciled server-side.
- Account is locked for fraud review while the user has pending transfers or support cases.
- User requests deletion where financial records must be retained for legal/regulatory reasons.
- Accessibility user relies on screen reader and cannot use color alone to understand loss/gain or risk.
- Provider outage affects only cards, transfers, quotes, identity, push, or support while other surfaces remain usable.
- A disclosure, rate, fee, APY, plan name, eligibility rule, or partner-bank relationship changes without an app release.

## Test Plan

- Unit tests for disclosure placement, eligibility rules, risk copy, stale-data labels, currency/amount formatting, and idempotency keys.
- Unit tests for role permissions, support-case state transitions, alert-rule evaluation, and privacy-safe analytics payloads.
- Contract tests for auth, identity, disclosures, dashboard, search, accounts, transactions, transfers, quotes, entitlements, support, export, and deletion APIs.
- Integration tests for onboarding through KYC pending/approved/rejected states.
- Integration tests for the primary dashboard to detail to action-review to receipt journey.
- Integration tests for subscription restore, cancellation, webhook delay, refund, and cross-platform entitlement mismatch.
- Provider-failure tests for identity, market-data, banking, brokerage, transfer, card, notification, and support dependencies.
- Security tests for device binding, biometric fallback, session revocation, sensitive-data redaction, and account-takeover recovery.
- Privacy tests for export/delete, consent revocation, child/teen data where applicable, and analytics exclusion of raw financial content.
- Accessibility tests for dynamic type, screen reader labels, focus order, reduced motion, and color-independent indicators.
- Compliance tests asserting no investment-advice, no bank-status, no FDIC/SIPC overstatement, no unlicensed market-data, and no copied brand/copy.
- Manual verification blockers must remain feature-flagged until native device/account evidence resolves the owner path.

## Acceptance Criteria

- Research Sources contain exact first-party URLs with no source-discovery placeholders.
- Readiness metadata states implementation-ready as of 2026-05-01, while manual blockers remain explicit and feature-flagged.
- No proprietary brand, copy, screenshots, private APIs, partner-only data, market content, or regulated status claims are introduced.
- Finance-risk review covers no-investment-advice framing, KYC/AML, fraud/account takeover, market-data licensing, partner-bank/FDIC or SIPC boundaries, and support escalation.
- Regulated account, banking, brokerage, advisory, money-transmission, subscription, and provider-gated flows are blocked until lawful sandbox or hands-on verification exists.
- Screen inventory, data model, API contracts, edge cases, tests, and build plan are detailed enough for downstream implementation planning.
- Accessibility, privacy, security, support, and compliance owners are named in launch gates.

## Open Questions

- Which licensed providers will supply identity, account aggregation, banking, brokerage, card, transfer, market-data, notification, and support infrastructure for V1?
- Which countries, states, account types, age groups, and subscription tiers are in scope for the first implementation?
- Which app-store native flows, account-review decisions, partner disclosures, and push payloads differ between iOS and Android?
- What retention schedule applies to identity documents, financial records, child/teen records, support attachments, audit logs, and deleted accounts?
- Which manual verification sessions are scheduled, and who owns the evidence capture for each blocked flow?
- Which claims require legal/compliance approval before public demo, beta, or launch?

## Build Plan

- Phase 1: Establish original product shell, auth/session management, disclosure registry, feature flags, audit logging, and privacy-safe analytics.
- Phase 2: Build read-only dashboard, search, detail screens, support center, settings, privacy center, and legal/disclosure surfaces using mocked provider data.
- Phase 3: Add regulated-provider integration adapters for identity, accounts, market data, transfers/cards/trading/content as applicable, all behind sandbox flags.
- Phase 4: Implement action review, receipts/history, alerts, notifications, subscription/fee configuration, support escalation, and provider-failure recovery.
- Phase 5: Complete security hardening, accessibility pass, privacy export/delete, compliance review, data-retention review, and abuse/fraud runbooks.
- Phase 6: Resolve manual verification blockers with lawful device/account evidence; unflag only verified flows and keep unresolved parity claims out of release notes.

## Next Steps

- Confirm provider choices and legal operating model before downstream implementation begins.
- Create acceptance-test blockers for every metadata blocker and assign product, compliance, privacy/security, support, and accessibility owners.
- Keep the downstream repo private until original code/assets, naming, licensing, data-provider, and legal reviews are complete.
