# Cash App-Style Clone Spec

> Metadata
> - Inspiration app: Cash App
> - Category: Finance, peer payments, stored value, debit card, banking partner services, bitcoin, investing, taxes, family accounts, offers, and business payments
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-17.
> - Verification basis: exact public marketplace pages, Cash App product pages, Cash App security/scam guidance, Cash App legal/privacy/terms/disclosure pages, Cash App Taxes pages, Cash App Families pages, and current public product notes.
> - Manual verification blockers: native iOS/Android screen capture, signup/login, phone/email verification, $cashtag creation, identity verification, bank/debit/credit linking, balance funding, peer payment send/request/refund/cancel, payment links, pools, cash out, direct deposit setup, mobile check capture, paper money deposit, Cash App Card order/activation/customization/lock/dispute, ATM withdrawals, offers, savings, overdraft coverage, Borrow, Afterpay, Cash App Pay, bitcoin buy/sell/send/receive/Lightning withdrawal, stock/ETF order placement, tax filing, sponsored teen account setup, sponsor controls, business-account switching, statements, disputes, data export, account deletion, support chat, push notifications, fraud/scam review, and regional availability still require lawful test devices/accounts before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, icons, $tag namespace, account identifiers, sample data, payment providers, bank partners, card issuer relationships, brokerage integrations, tax workflows, bitcoin custody/transfer providers, fraud systems, support scripts, and regulated-finance controls.

## Overview

Build an original mobile finance app inspired by Cash App's public workflow: phone/email account entry, $tag-style identity, peer-to-peer payments and requests, payment links, activity history, stored balance, linked funding sources, cash out to an external account, direct deposit, debit card, offers, savings goals, Cash App Pay-style merchant checkout, bitcoin entry points, stock investing entry points, tax filing entry points, teen/family sponsored accounts, business-account handling, support, security, scam education, privacy controls, statements, and account deletion.

The clone must not copy Cash App branding, screenshots, marketing copy, protected UI artwork, $Cashtag marks, private APIs, account identifiers, risk models, bank partner arrangements, card designs, brokerage disclosures, tax content, or support scripts. Functional parity should be expressed through original product language, licensed financial integrations, synthetic account data, independently designed risk and fraud controls, and jurisdiction-aware compliance gates.

This spec is implementation-ready for a V1 that targets documented public behavior. Any feature marked `Manual verification required` must ship behind a feature flag or acceptance-test blocker until lawful hands-on verification confirms native behavior and provider approval.

## Goals

- Provide a mobile-first money app with account entry, profile identity, peer payments, requests, QR/payment links, activity history, balance, linked instruments, cash out, card, merchant pay, savings/offers, support, privacy, and security settings.
- Support finance-category trust expectations around account takeover, mistaken transfers, scams, unauthorized card charges, identity verification, limits, regulated disclosures, chargebacks, tax records, minors, and customer support escalation.
- Represent banking partner services, debit card, direct deposit, savings, overdraft, bitcoin, investing, tax filing, teen/family controls, business accounts, and pay-over-time/borrow-like features as provider-backed modules with explicit compliance, eligibility, and feature-flag gates.
- Produce concrete screens, entities, API contracts, realtime/offline rules, analytics, safety controls, edge cases, acceptance tests, and build phases for a downstream implementation repo.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Cash App-branded app or imply affiliation with Cash App, Block, Square, Sutton Bank, The Bancorp Bank, Wells Fargo, Visa, FINRA, SIPC, FDIC, Afterpay, Bitcoin, Lightning Network, Cash App Taxes, or Cash App Investing.
- Do not process production P2P transfers, card purchases, ACH transfers, direct deposits, check deposits, paper-money deposits, merchant payments, bitcoin transfers, brokerage orders, tax filings, loans, overdrafts, or sponsored minor accounts without separate legal, compliance, provider, and security approval.
- Do not scrape Cash App, reuse private Cash App APIs, replay network traffic, copy risk models, copy card artwork, copy disclosure text, copy support scripts, or bypass marketplace/app-store rules.
- Do not treat stored balances, bitcoin, investments, tax filing, identity documents, biometrics-adjacent verification, debit card disputes, chargebacks, fraud decisions, or teen safety as generic app features.
- Do not claim exact App Store, Play Store, native-device, provider, payment, card, bitcoin, investing, tax, push-notification, support, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/cash-app/id711923939 | Official iOS listing, developer Block, Finance category, iPhone support, age rating 13+ with in-app controls, privacy labels, Wallet/Siri support, peer payments, bitcoin, Cash App Card, direct deposit, offers, savings, stocks, teen sponsorship, and current listing text | Verified 2026-04-17 |
| Google Play | https://play.google.com/store/apps/details?id=com.squareup.cash | Official Android listing, package id, ratings/download scale, ads disclosure, data safety, send/spend/save/invest positioning, Borrow, teen accounts, P2P, bitcoin, card, and release/update context | Verified 2026-04-17 |
| Cash App US Home | https://cash.app/us | Public product overview for paychecks, card, send, bank, savings, spend, security, Cash App Taxes, offers, support phone, in-app chat, and finance-platform disclaimers | Verified 2026-04-17 |
| Send Money | https://cash.app/send | Public send/request model, phone/email/$tag recipient entry, contacts sync, scam alerts, personalized payment notes, activity tracking, pools, security lock, fees, non-user acceptance window, and withdrawal fee orientation | Verified 2026-04-17 |
| Payment Links Press Note | https://cash.app/press/cash-app-launches-payment-links | Public 2026 payment-link request flow, shareable request links, reusable links, eligible customer/business availability, and normal request-flow entrypoint | Verified 2026-04-17 |
| Cash App Card | https://cash.app/card | Debit card positioning, customization, digital wallet usage, offers, concert access, Afterpay-like card purchase conversion, FDIC pass-through orientation, Cash App Green benefits, card/security lock, and support paths | Verified 2026-04-17 |
| Direct Deposit | https://cash.app/bank/direct-deposit | Direct deposit, early paycheck availability, linked bank/debit funding, mobile check capture, cash deposit locations, Green status benefits, overdraft, savings interest, and bank partner disclaimers | Verified 2026-04-17 |
| Cash App Pay | https://cash.app/cash-app-pay | Merchant checkout model, online/in-store payment by app or QR, Cash balance or linked debit funding, no-card checkout, and banking partner disclaimers | Verified 2026-04-17 |
| Access Cash | https://cash.app/access-cash | Borrow, Afterpay-like pay-over-time, overdraft coverage, direct deposit, savings, and eligibility-sensitive cash access features | Verified 2026-04-17 |
| Security | https://cash.app/security | Fraud monitoring, real-time alerts, security lock, card lock, data encryption, support channels, and FDIC pass-through orientation | Verified 2026-04-17 |
| Outsmart Scams | https://cash.app/outsmart-scams | Scam education, trusted-recipient guidance, verified-channel guidance, Security Lock, report/block prompts, and official support contact framing | Verified 2026-04-17 |
| Common Scams | https://cash.app/outsmart-scams/common-scams | Scam taxonomy for catfishing, surveys, giveaways, money flips, deposits, support impersonators, fake apps/glitches, pet deposits, accidental payments, and prevention guidance | Verified 2026-04-17 |
| Stocks | https://cash.app/stocks | Stock/ETF investing, fractional entry, commission-free positioning, search/browse, Round Ups, regulatory fee disclosure, and self-directed investing disclaimers | Verified 2026-04-17 |
| Lightning Network | https://cash.app/bitcoin/lightning | Bitcoin send/receive via Lightning, compatible wallet usage, Bitcoin tile entrypoint, and support contact framing | Verified 2026-04-17 |
| Bitcoin Product Note | https://cash.app/press/cash-bitcoin-updates-fees-withdrawals | 2026 public bitcoin updates around pricing clarity, withdrawal limits, funding rails, direct-deposit-to-bitcoin, Bitcoin Map, auto conversion, roundups, and self-custody handoff | Verified 2026-04-17 |
| Families | https://cash.app/families | Sponsored teen accounts, sponsor monitoring, transaction visibility, limits, feature permissions, Cash App Card, savings interest, FDIC pass-through orientation, and invite path | Verified 2026-04-17 |
| Teen Safety | https://cash.app/press/ensuring-teen-safety-on-cash-app | Public teen safety rationale, parent/guardian approval, activity oversight, block/report controls, feature controls, and risk/compliance monitoring | Verified 2026-04-17 |
| Taxes | https://cash.app/taxes | Cash App Taxes entrypoint, federal/state filing positioning, mobile/computer filing, refund estimate, guarantees, and tax-service separation from Cash App Investing | Verified 2026-04-17 |
| Cash App Taxes Terms | https://taxes.cash.app/pages/terms-of-service | Tax filing service provider, agreement structure, tax privacy reference, arbitration/class-action notice, and service boundaries | Verified 2026-04-17 |
| Terms of Service | https://cash.app/legal/us/en-us/tos | Eligibility, account types, restricted/prepaid/debit-flex accounts, sponsored accounts, balance funding, transfers to external accounts, P2P requests/pools, fees, card usage, Cash App Pay, paper money deposit, statements, disputes, AI feature constraints, and arbitration | Verified 2026-04-17 |
| Privacy Notice | https://cash.app/legal/us/en-us/legal/privacy | Personal data categories, identity verification data, financial information, transaction information, device/IP/authentication data, sharing, retention, choices, security, and contact paths | Verified 2026-04-17 |
| Bitcoin Disclosures | https://cash.app/legal/us/en-us/bitcoin-disclosures | Virtual currency risks, licensing limits by state, non-FDIC/SIPC treatment, transfer irreversibility, fee display, statements, recurring buys, and state-specific disclosures | Verified 2026-04-17 |
| Investing Disclosures | https://cash.app/legal/disclosures-in-app | Brokerage by Cash App Investing LLC, FINRA/SIPC membership, self-directed investing, non-bank/non-deposit treatment, fractional-share limits, bitcoin separation, tax implications, and disclosure library reference | Verified 2026-04-17 |
| Business Terms | https://cash.app/legal/us/en-us/cash-payment-terms | Business account purpose, business services scope, seller/goods/services framing, entity responsibility, and privacy/legal linkage | Verified 2026-04-17 |
| Customer Identity Verification FAQ | https://developers.cash.app/docs/partner/resources/frequently-asked-questions/customer-identity-verification | Identity-verification data, verified vs unverified customer limitations, daily limits orientation, and US-only Cash App Pay eligibility context | Verified 2026-04-17 |

## Detailed Design

### Source-Backed Product Requirements

- Public listings position Cash App as a free finance app for sending, spending, saving, investing, bitcoin, debit card, direct deposit, offers, teen sponsorship, and security controls.
- V1 must support phone/email account entry, one-time-code authentication, profile identity, $tag-style public handle, QR code, contacts opt-in, and signed-out/locked/blocked account states.
- Peer payments must support amount, recipient by phone/email/handle/QR, funding source, optional note/styling, preview, scam warning for new or risky recipients, confirmation, activity receipt, refund/request/cancel states where applicable, and duplicate-tap idempotency.
- Payment links must support request creation from the request flow, shareable link generation, prefilled amount/note, reusable link behavior, expiry or disable controls, paid/partial/expired state, and business-account eligibility flags.
- Pools must support organizer, goal, purpose, contributor links, contribution list, close/transfer-to-balance behavior, non-account contributor constraints, and organizer-only management.
- Balance must show available, pending, held, restricted, overdraft, savings, bitcoin, investing, tax refund, and externally transferable sub-states with timestamped freshness and legal/provider caveats.
- Linked instruments must support bank account, debit card, credit card, digital wallet/card token, direct deposit account/routing details, check capture, and provider-specific error/verification states.
- Cash out must show standard transfer and instant transfer choices, destination, fee, estimated arrival, risk delay, irreversible/cannot-cancel warning where applicable, and confirmation receipt.
- Cash App Card-style debit card must support eligibility, order, customization, shipping, activation, digital wallet add, card lock, card replacement, ATM withdrawal, offers, charge dispute, unauthorized-charge path, and Zero Fraud Liability-like provider review without copying exact claims.
- Direct deposit must support account/routing detail display, employer form/share flow, deposit status, early availability copy, paycheck benefit eligibility, tax refund deposit, and stale/provider outage states.
- Savings and offers must support goal setup, Round Ups-like transfers, interest eligibility, Green-style status rules, offer discovery, offer activation, merchant restrictions, expiry, redemption receipt, and no-guarantee disclosures.
- Cash App Pay-style merchant payment must support merchant QR/deep link, approved merchant eligibility, funding source, checkout approval, receipt, refund/dispute entrypoint, and US-only/regional eligibility gates.
- Bitcoin must support education, buy/sell quote, fee/spread display, auto-invest/roundup configuration, send/receive, Lightning invoice, on-chain withdrawal/deposit, minimums, irreversible-transfer warnings, state licensing gates, self-custody handoff, tax forms, and volatility disclosure.
- Stock/ETF investing must support education, brokerage onboarding, search/browse/watchlist, fractional order ticket, market data freshness, order preview, trade confirmation, fee/regulatory disclosure, tax forms, transfer-out limits, and self-directed/no-advice warnings.
- Taxes must be treated as a linked filing product with separate provider, eligibility intake, document import, federal/state filing, refund estimate, e-file status, support, privacy, and retention controls.
- Families/sponsored accounts must support sponsor invite, teen acceptance, sponsor ownership, balance/activity visibility, card/spend controls, feature permissions, sponsor notifications, block/report controls, graduation/closure, and teen safety escalation.
- Business accounts must support switching/opening, goods/services receipt context, fees, business profile, payment acceptance, payment links, reporting, tax record, support, and separation from personal P2P usage.
- Support must expose in-app chat, official phone support, help articles, transaction-specific dispute/report actions, scam report, card dispute, identity support, data/privacy requests, and escalation state.
- Security and privacy settings must expose Security Lock, device/session management, card lock, contacts permissions, notification categories, privacy choices, data export, account deletion/closure, statements, tax/investing record caveats, and legal links.
- Any AI-powered assistant, recommendation, routing, or interface suggestion must be informational only and must not execute financial, investment, legal, or tax actions without explicit user confirmation.

## Core User Journeys

- New customer installs the app, enters phone or email, verifies a one-time code, creates a display name and public handle, reviews terms/privacy, optionally links a debit card, and lands on the money home with zero-balance education.
- Returning customer opens the app, passes Security Lock, sees balance and recent activity, sends money to a known recipient, reviews funding source and risk warning, confirms, receives a receipt, and sees realtime activity update.
- Customer requests money with a reusable payment link, shares it in a messaging app, tracks recipients who pay, disables the link, and transfers collected funds to balance.
- Customer receives a payment from a non-account user path, the recipient is prompted to create and verify an account, and funds return if acceptance does not complete within the documented window.
- Customer links a bank/debit card, adds cash, cashes out with standard or instant transfer, sees fee/arrival estimates, and handles fraud-screening delay or failed transfer recovery.
- Customer orders a debit card, customizes it, activates it, adds it to a digital wallet, uses an offer, locks the card after a suspicious transaction, and opens a card dispute.
- Customer sets up direct deposit, receives a paycheck, becomes eligible for higher-status benefits, enables savings/roundups, and sees eligibility change when deposits or spending fall below thresholds.
- Customer uses merchant QR checkout, chooses balance or linked debit funding, approves the purchase, receives a receipt, and starts a merchant/payment dispute from activity.
- Customer opens bitcoin, reviews risk disclosures, buys a small amount, sends via Lightning to a compatible wallet, sees irreversible-transfer warnings, and exports tax/reporting records.
- Customer opens investing, completes brokerage onboarding, searches a stock, places a fractional order after preview, receives a confirmation, and sees no-advice and tax caveats.
- Sponsor invites a teen, approves a sponsored account, monitors balance/activity, sets card or feature limits, receives a new-recipient alert, blocks/reports a risky recipient, and handles account graduation.
- Business owner switches to a business account, receives goods/services payments, shares payment links, exports records, and sees fee/tax/reporting separation from personal payments.
- Privacy-focused user reviews data sharing, downloads statements, requests data export, starts account closure, handles required balance/card/investing/tax restrictions, and receives retention caveats.
- Scam-targeted user receives a suspicious request, sees risk education, blocks/reports the account, contacts official support from in-app chat, and rotates sessions/security settings.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Phone/email entry, OTP, legal consent, and return login | phone, email, code, deep link | new, returning, locked, signed-out | code expired, unsupported region, underage, account closed |
| Profile And Handle | Public identity, QR, contacts, sponsor context | name, handle, QR, contacts permission | available, checking, claimed, private | handle taken, impersonation report, contacts denied |
| Money Home | Balance, activity, shortcuts, alerts, and feature tiles | send, request, card, cash out, bitcoin, stocks | loaded, zero, pending, restricted | stale balance, risk hold, provider outage |
| Send/Request Ticket | P2P amount, recipient, funding, note, link, pool | amount, recipient, source, share | draft, preview, submitted, completed | scam warning, limit exceeded, duplicate, irreversible |
| Recipient/Profile Detail | Recipient identity and relationship history | profile tap, block, report, pay/request | known, new, blocked, business | impersonation, suspicious account, unavailable |
| Payment Link/Pool | Shared requests and group collection | link, goal, contributors, close | active, paid, partially paid, closed | expired, disabled, non-account contributor, abuse report |
| Activity And Receipt | Transaction list, receipt, refund/dispute/report | filter, receipt, refund, dispute | pending, complete, failed, reversed | duplicate receipt, chargeback, fraud hold |
| Balance And Cash Out | Balance funding, add cash, transfer out | amount, source, destination, speed | available, held, pending, transferred | instant fee, bank fail, delayed review, cannot cancel |
| Bank/Card Linking | External instruments and verification | bank login, card entry, microcheck | linked, verifying, failed, removed | unsupported bank, name mismatch, token expired |
| Cash App Card | Debit card order, activation, lock, wallet, offers | order, design, activate, lock, replace | eligible, ordered, active, locked | lost/stolen, declined, dispute, shipping fail |
| Direct Deposit And Checks | Account details, employer form, check capture | copy, share, camera, deposit | setup, pending, posted, rejected | camera denied, check rejected, employer error |
| Savings And Offers | Goals, roundups, interest, offer activation | goal, roundup, offer, merchant | eligible, active, redeemed, expired | status lost, merchant mismatch, offer cap reached |
| Cash App Pay | Merchant QR/deep-link checkout | QR scan, approve, source | scanned, approved, paid, refunded | merchant ineligible, region blocked, source failed |
| Bitcoin | Buy/sell/send/receive/Lightning and disclosures | quote, order, invoice, wallet address | educational, quoted, pending, settled | state blocked, volatility, irreversible, network delay |
| Investing | Brokerage onboarding, search, ticket, portfolio | identity, symbol, quote, order | onboard, watchlist, order, filled | market closed, fee disclosure, KYC fail, no advice |
| Taxes | Tax filing entry, document flow, filing status | intake, forms, submit, support | eligible, drafting, filed, accepted | unsupported tax case, IRS reject, privacy handoff |
| Families/Sponsored Accounts | Sponsor invite, controls, teen activity | invite, permission, limit, report | invited, active, limited, graduated | sponsor revoked, teen blocked, prohibited merchant |
| Business Account | Switch/open, payment links, records, fees | business info, receive, export | personal, pending, business | verification fail, goods/services dispute, tax hold |
| Support And Disputes | Help, chat, phone, card/payment dispute, scam report | issue, evidence, chat, call | submitted, in review, resolved | support impersonator warning, duplicate, legal hold |
| Settings/Privacy/Security | Security Lock, sessions, data, legal, deletion | toggles, export, delete, legal links | signed-in, verified, pending export | active balance, active tax/invest records, 2FA fail |

## Data Model

- `User`: legal identity status, public profile, handle, country/state, age/sponsor state, auth identifiers, consent, account type, restrictions, and privacy lifecycle.
- `DeviceSession`: device id, platform, app version, OTP state, Security Lock state, biometric availability, push token, session expiry, and risk score.
- `PublicProfile`: display name, handle, QR token, avatar metadata, business marker, sponsored-account marker, report/block status, and relationship summary.
- `AccountBalance`: cash balance, pending funds, holds, overdraft state, savings balance, sweep/bank partner eligibility, stale timestamp, and transfer restrictions.
- `FundingInstrument`: bank account, debit card, credit card, card network token, direct deposit account, verification state, owner match, limits, and removal constraints.
- `Payment`: sender, recipient, amount, currency, funding source, note/styling, risk flags, idempotency key, lifecycle state, receipt, refund/cancel/dispute state, and audit ids.
- `PaymentLink`: requester, amount, note, reusable flag, share token, contributor list, paid state, expiry, disabled state, and abuse controls.
- `Pool`: organizer, goal, purpose, contributor records, balance, close/withdrawal state, non-account contribution metadata, and audit trail.
- `CardAccount`: card product, design metadata, issuer/provider token, shipping, activation, lock state, wallet tokens, ATM capability, offer eligibility, and dispute state.
- `DirectDepositAccount`: routing/account token, employer form state, deposit events, paycheck status, early availability, tax refund marker, and benefit eligibility.
- `CheckDeposit`: captured images, device/location permission state, OCR result, review state, rejection reason, hold period, and deletion/retention state.
- `SavingsGoal`: owner, goal name, balance, roundup rules, interest eligibility, rate snapshot, sponsor approval, and transfer history.
- `Offer`: merchant, eligibility, activation, cap, expiry, redemption receipt, restrictions, and merchant-support routing.
- `MerchantPayment`: merchant, QR/deep link token, source, authorization, receipt, refund/dispute route, region eligibility, and provider status.
- `BitcoinWallet`: hosted balance, quote, fee/spread, buy/sell/transfer orders, Lightning invoice, on-chain address, limits, tax lots, and jurisdiction block.
- `InvestmentAccount`: brokerage onboarding, risk acknowledgements, portfolio, watchlist, order tickets, confirmations, tax documents, transfer requests, and disclosure acknowledgements.
- `TaxFilingCase`: tax provider account, intake status, documents, filing status, refund destination, rejection codes, support case, privacy retention, and service boundary.
- `SponsoredAccount`: sponsor, teen/child, permissions, spend/card/investing controls, notifications, activity visibility, block/report controls, graduation state, and closure state.
- `BusinessAccount`: legal/business info, verification, payment acceptance state, business profile, fee plan, tax records, payment links, and goods/services dispute state.
- `SupportCase`: issue type, linked transaction/card/account, evidence, owner queue, SLA, appeal/escalation, fraud/scam flag, legal hold, and resolution.
- `AuditEvent`: append-only record for auth, identity, balance, payment, instrument, card, deposit, bitcoin, investing, tax, sponsor, business, support, privacy, and security-sensitive changes.
- `LocalCacheRecord`: cached home, activity, receipts, settings, drafts, selected recipients, cards/offers, feature flags, sync attempts, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify-code`, `POST /auth/recover`, `DELETE /auth/session`, `DELETE /auth/sessions/:id`: phone/email OTP authentication with device risk, age/region gates, locked account, and session revocation.
- `GET /profile`, `PATCH /profile`, `GET /profiles/:handle`, `POST /contacts/sync`, `POST /profiles/:id/block`, `POST /profiles/:id/report`: public identity, QR profile, contacts matching, block/report, and impersonation controls.
- `GET /home`, `GET /balances`, `GET /activity?cursor=&filter=`, `GET /receipts/:id`: money home, balances, paginated activity, receipt details, stale-data hints, and authorization state.
- `POST /payments/preview`, `POST /payments`, `POST /payments/:id/cancel`, `POST /payments/:id/refund`, `POST /payments/:id/report`: P2P preview, scam warnings, limits, fee disclosure, idempotency, lifecycle, and support handoff.
- `POST /payment-links`, `PATCH /payment-links/:id`, `GET /payment-links/:token`, `POST /payment-links/:token/pay`: reusable request links, share tokens, link disable, non-account acceptance, payment completion, and abuse checks.
- `POST /pools`, `PATCH /pools/:id`, `POST /pools/:id/contributions`, `POST /pools/:id/close`: group collection with organizer permissions, goal state, contributor receipts, and balance transfer.
- `GET /instruments`, `POST /instruments/bank`, `POST /instruments/card`, `DELETE /instruments/:id`, `POST /balances/add-cash`, `POST /transfers/cash-out`: funding sources, verification, add cash, standard/instant cash out, fee/arrival estimates, and fraud delay.
- `GET /card`, `POST /card/order`, `POST /card/activate`, `PATCH /card/lock`, `POST /card/replace`, `POST /card/disputes`: debit card lifecycle, wallet token handoff, shipping, lock, replacement, unauthorized charge dispute, and audit logging.
- `GET /direct-deposit`, `POST /direct-deposit/forms`, `GET /deposits`, `POST /checks/capture`, `GET /checks/:id`: account/routing display, employer forms, deposit events, check capture, review/reject states, and retention handling.
- `GET /savings`, `POST /savings/goals`, `PATCH /savings/goals/:id`, `POST /roundups/rules`, `GET /offers`, `POST /offers/:id/activate`: savings goals, roundup rules, interest eligibility, offer discovery, activation, redemption, and expiry.
- `POST /merchant-pay/scan`, `POST /merchant-pay/authorize`, `GET /merchant-pay/:id`: QR/deep-link checkout, approved merchant checks, funding source, confirmation, refund/dispute routing, and regional eligibility.
- `GET /bitcoin`, `POST /bitcoin/quote`, `POST /bitcoin/orders`, `POST /bitcoin/withdrawals`, `POST /bitcoin/lightning/invoices`, `GET /bitcoin/tax-documents`: bitcoin quote/order/transfer with fee, spread, minimums, limits, disclosure acceptance, and irreversibility warnings.
- `GET /investing/onboarding`, `POST /investing/onboarding`, `GET /investing/search`, `POST /investing/orders/preview`, `POST /investing/orders`, `GET /investing/tax-documents`: brokerage onboarding, search, quotes, order preview, confirmation, no-advice acknowledgements, and tax documents.
- `GET /taxes/session`, `POST /taxes/handoff`, `GET /taxes/status`: tax filing handoff, provider boundary, filing status, refund destination, rejection codes, and tax support.
- `GET /families`, `POST /families/invites`, `PATCH /families/:id/permissions`, `GET /families/:id/activity`, `POST /families/:id/report`: sponsored account invite, sponsor controls, activity visibility, teen safety, graduation, and block/report.
- `GET /business`, `POST /business/switch`, `PATCH /business/profile`, `GET /business/records`: business verification, profile, payment acceptance, business links, fee/tax exports, and account separation.
- `POST /support/cases`, `GET /support/cases/:id`, `POST /support/cases/:id/evidence`, `POST /support/cases/:id/appeal`: help, disputes, scam/fraud reports, card claims, identity support, escalation, and support-safe evidence upload.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, `GET /statements`: privacy settings, export, account closure, statements, retention caveats, and active-product blockers.

## Realtime, Push, And Offline Behavior

- Balance, payment, request, payment-link, pool, card transaction, direct deposit, cash out, check deposit, merchant pay, offer redemption, bitcoin, investing, tax filing, sponsored account, business payment, dispute, and support states must reconcile from server-owned event streams.
- The client may cache home, balances with stale labels, activity summaries, receipts, saved recipients, drafts, card/offer tiles, settings, support cases, and legal links for offline reads.
- Offline mode may preserve drafts for payments, requests, payment links, support messages, tax intake notes, and card design, but must block money movement, card lock/unlock, merchant pay, cash out, direct deposit changes, bitcoin transfers, brokerage orders, tax filing, account deletion, and sponsor permission changes.
- Realtime updates must be idempotent and ordered with stable event ids; clients must refetch canonical state after reconnect, app foreground, token refresh, or clock skew detection.
- Push notifications must be opt-in and category-controlled for payment received, request, link/pool contribution, card transaction, security alert, direct deposit, cash out, bitcoin/investing status, teen activity, support case, and privacy export readiness.
- Push payloads must minimize sensitive content; default payloads should avoid full names, amounts, tax data, bitcoin addresses, investment symbols/order details, teen details, and support evidence unless explicitly allowed by settings and policy.
- Quotes, fees, exchange prices, market prices, savings rates, offer eligibility, direct deposit benefit status, transfer arrival estimates, bitcoin limits, and investing buying power must expire and refresh before confirmation.
- Long-running flows must expose pending, complete, failed, canceled, reversed, disputed, expired, held, and provider-degraded states with recovery actions.

## Permissions, Privacy, And Safety

- Camera, contacts, notifications, files/photos, location, biometric authentication, and digital wallet permissions must be requested only when the related feature is invoked.
- Default analytics must exclude raw phone numbers, emails, SSN/tax identifiers, government ID images, bank/card numbers, account/routing numbers, balances, payment notes, recipient names, precise locations, bitcoin addresses, brokerage holdings, tax documents, teen details, and support evidence.
- Identity verification must be treated as a regulated launch blocker with legal/compliance owner, data retention limits, manual review queue, provider contracts, and appeal/support path.
- P2P payments must include trusted-recipient education, new-recipient warnings, duplicate detection, irreversible/mistaken-transfer guidance, request blocking, recipient reporting, and support escalation.
- Scam controls must cover support impersonators, fake giveaways, money flips, fake apps/glitches, catfishing, rental/pet deposits, accidental-payment scams, phishing links, and social engineering.
- Card, ACH, cash out, direct deposit, check capture, paper money deposit, merchant pay, refunds, disputes, and chargebacks require provider-backed error handling, statements, dispute timelines, audit logs, and customer support owner.
- Bitcoin and investing must include suitability/eligibility gates, jurisdiction gates, fee and risk disclosures, irreversible-transfer warnings, volatility warnings, tax document paths, no-investment-advice treatment, and provider status.
- Tax filing must stay isolated from product analytics and must keep federal/state filing data, documents, and refund details governed by separate provider privacy, retention, and support paths.
- Sponsored teen accounts must include sponsor approval, sponsor visibility, age gates, feature permissions, merchant restrictions, reporting/blocking, safety monitoring, and graduation/closure behavior.
- Business accounts must separate personal and goods/services payments, disclose fees, preserve records, prevent deceptive account switching, and route merchant/customer disputes appropriately.
- Account closure and data export must warn about balances, pending transfers, card disputes, tax filings, investing records, bitcoin holdings, sponsored accounts, business records, regulatory retention, and legal holds.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, clear fee/total breakdowns, accessible QR alternatives, and accessible support channels.
- Launch owners: compliance owner for identity, money movement, banking, bitcoin, investing, taxes, and minors; payments owner for transfer/card/merchant rails; privacy owner for data rights; trust/safety owner for scam/fraud controls; accessibility owner for inclusive finance UX; support owner for disputes and escalations.

## Analytics And Monetization

- Track privacy-safe events: onboarding started/completed, security lock enabled, recipient selected, payment previewed, payment submitted, request/link created, pool created, cash out previewed, card ordered, card locked, direct deposit viewed, offer activated, merchant pay approved, bitcoin education viewed, investing education viewed, tax handoff started, sponsored invite sent, support case opened, data export requested, and account deletion requested.
- Every event must use object type, flow step, provider status, reason code, latency bucket, and feature flag rather than raw payment notes, recipient identifiers, bank/card details, account balances, tax details, bitcoin addresses, or security evidence.
- Risk analytics must separate scam-warning impressions, new-recipient friction, duplicate-prevention, support impersonation reports, account takeover signals, device/session changes, suspicious requests, card lock, and dispute outcomes.
- Payments/card analytics must capture quote freshness, transfer speed selection, fee disclosure display, provider decline category, receipt state, dispute state, and recovery path without exposing financial account data.
- Bitcoin/investing analytics must capture education, disclosure acceptance, quote/order status, provider latency, jurisdiction gate, and error category without storing asset holdings or order amounts in product analytics.
- Teen/family analytics must be minimized and aggregated; sponsor/teen details must not be sent to general analytics beyond safety-critical reason codes and feature usage counts.
- Monetization may include original instant-transfer fees, card customization, business payment fees, merchant acceptance, offers/affiliate-funded rewards, spread/fee-backed bitcoin services, brokerage economics, pay-over-time provider economics, and tax/refund-adjacent offerings later, but pricing, names, fee rates, and promotional copy must be original and legal-reviewed.
- Any monetized financial product must disclose fees before confirmation, support receipts/statements, expose cancellation where applicable, and record provider/legal approval before launch.

## Edge Cases

- First launch offline, unsupported region, underage without sponsor, phone/email reuse, lost phone number, OTP delivery failure, SIM-swap risk, account locked, deceased user/sponsor, or old account recovery.
- Handle is taken, impersonates a public figure, violates policy, is linked to a scam report, or conflicts with a business/sponsored profile.
- Recipient is new, blocked, reported, deleted, business-marked, sponsored teen, non-user, outside contacts, or has multiple matching identifiers.
- Payment has insufficient balance, linked source failure, credit-card fee, risk hold, duplicate submit, typo in amount, wrong recipient, non-user acceptance timeout, refund request, or dispute.
- Payment link or pool is overshared, reused unexpectedly, paid by wrong person, abused for goods/services, expires, is disabled, or receives suspicious contributions.
- Cash out delayed by fraud screening, destination closed, instant transfer unavailable, standard transfer pending over weekend/holiday, Mastercard-standard-transfer limitation, or transfer cannot be canceled.
- Direct deposit arrives early, arrives late, is returned, exceeds limits, comes from unsupported employer, uses stale account/routing details, or changes eligibility for Green-style benefits.
- Card transaction declined, merchant preauthorization holds funds, card lost/stolen, digital wallet token stale, ATM operator fee applies, unauthorized card charge occurs, or merchant dispute is out of Cash App scope.
- Bitcoin price changes after quote, Lightning invoice expires, on-chain address is invalid, withdrawal minimum not met, network congested, state eligibility changes, transfer is irreversible, or tax lot export fails.
- Stock quote stale, market closed, halt occurs, fractional order cannot transfer, regulatory fee applies, KYC fails, tax form delayed, or user interprets educational content as advice.
- Tax filing case has unsupported form/state, imported document mismatch, IRS/state rejection, refund routing failure, amended return need, or tax support escalation.
- Sponsored account sponsor revokes approval, teen reaches graduation age, sponsor dies or account closes, teen attempts prohibited merchant, or feature permission changes mid-transaction.
- Business account receives personal payment, personal account sells goods/services, buyer disputes goods, tax export fails, or business verification requires additional documents.
- Data export requested with active account closure, account deletion requested with balance/hold/card dispute/investing/tax records, privacy request conflicts with legal retention, or support case continues after closure.

## Test Plan

- Unit tests for account state, Security Lock, handle validation, payment/request/link/pool state machines, idempotency keys, fee preview, limits, quote expiry, and privacy-safe analytics payload construction.
- Contract tests for every documented API route, response shape, error code, pagination cursor, provider status, duplicate event, and disclosure acknowledgement.
- Integration tests for auth, profile, contacts opt-in/denial, known recipient payment, new-recipient warning, request, payment link, pool contribution, refund/cancel where applicable, activity receipt, and support report.
- Balance and transfer tests for add cash, linked instrument failure, standard cash out, instant cash out fee, fraud delay, stale balance refresh, pending hold, and destination removal.
- Card tests for eligibility, order, customization, activation, wallet token handoff, lock/unlock, lost/stolen replacement, transaction alert, offer redemption, ATM fee disclosure, and dispute creation.
- Direct deposit/check tests for account detail copy, employer form, paycheck deposit event, mobile check capture permission denial, check rejection, paper money deposit barcode expiry, and benefit eligibility changes.
- Cash App Pay tests for QR/deep link scan, merchant eligibility, source selection, approval, receipt, refund/dispute route, and US/region block.
- Bitcoin tests for education, disclosure acceptance, buy/sell quote, fee display, quote expiry, Lightning invoice, on-chain withdrawal, irreversible warning, jurisdiction block, and tax document export.
- Investing tests for brokerage onboarding, disclosure acceptance, stock/ETF search, market data stale state, order preview, order confirmation, market closed/halt, fee disclosure, and no-advice copy.
- Taxes tests for tax service handoff, unsupported tax situation, document upload, e-file status, rejection recovery, refund destination, privacy isolation, and tax support case.
- Families tests for sponsor invite, teen acceptance, sponsor visibility, card/spend/feature permissions, new-recipient notification, block/report, sponsor revocation, and graduation/closure.
- Business tests for account switch, business verification, payment link availability, goods/services payment receipt, fee/tax export, and dispute routing.
- Privacy/security tests for Security Lock, session revocation, card lock, contacts deletion, scam report, data export, account closure blockers, legal retention caveats, and support evidence redaction.
- Offline/realtime tests for cached home/activity, blocked financial writes while offline, draft preservation, reconnect reconciliation, duplicate event delivery, push deep links, provider outage, and corrupt cache.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, QR alternatives, amount entry, fee disclosure, error recovery, and support paths.
- Manual verification tests: native iOS/Android screenshots, signup/login, payment send/request/link/pool, cash out, direct deposit, card order/activation/lock/dispute, offers, Cash App Pay, bitcoin, investing, taxes, sponsored accounts, business accounts, support chat, notifications, data export, and account deletion on lawful test accounts.

## Acceptance Criteria

- Exact source links in this spec remain current or are refreshed before implementation starts.
- A downstream team can build the V1 without needing Cash App assets, network traffic, private APIs, risk models, bank relationships, card artwork, tax content, support scripts, or brand copy.
- New and returning users can create an account, secure it, view balance/activity, send/request money, create a payment link, cash out, and recover from network/provider failure.
- P2P, link, pool, card, direct deposit, merchant pay, bitcoin, investing, taxes, sponsored accounts, business accounts, support, and privacy workflows have deterministic state models and API contracts.
- All financial writes require server-owned confirmation, idempotency, audit events, risk checks, fee/quote refresh, and user-visible receipt or failure state.
- Security, scam prevention, privacy controls, statements, data export, and account closure are accessible from settings and covered by tests.
- Regulated finance, identity, card, bitcoin, investing, tax, teen, business, and dispute flows are feature-flagged until legal/compliance/provider/manual verification blockers are resolved.
- Manual verification blockers are either resolved with evidence or remain launch-blocking feature flags.

## Open Questions

- Which licensed providers will back money movement, bank linking, card issuing, merchant QR checkout, bitcoin custody/transfer, brokerage, taxes, identity verification, fraud screening, and support case management?
- Which V1 flows are allowed before regulated provider approvals: P2P simulation, sandbox card, sandbox merchant pay, bitcoin education, watchlist-only investing, or tax handoff only?
- Will V1 support sponsored teen accounts, business accounts, payment links, pools, Borrow/pay-over-time, Cash App Pay-style merchant checkout, or defer them behind flags?
- What jurisdiction set is in scope for launch, and how will state-level money transmission, virtual currency, lending, brokerage, tax, and minor-account rules be enforced?
- What retention model applies to statements, receipts, tax documents, identity documents, support evidence, bitcoin records, brokerage records, sponsored-account records, and account deletion?

## Build Plan

- Phase 1: scaffold app shell, auth, Security Lock, profile/handle, money home, activity, basic payment/request preview, receipt, support shell, and privacy-safe analytics.
- Phase 2: add linked instruments, add cash, cash out, payment links, pools, scam warnings, idempotency, realtime activity, statements, and data export/closure blockers.
- Phase 3: add card lifecycle, offers, direct deposit, check/paper-money deposit placeholders, merchant pay sandbox, provider status surfaces, and dispute/support workflows.
- Phase 4: add savings, roundups, Green-style eligibility, overdraft/Borrow/pay-over-time placeholders, and benefit eligibility tests behind compliance flags.
- Phase 5: add bitcoin education, quote/order sandbox, Lightning/on-chain transfer flags, investing onboarding/watchlist/order sandbox, disclosures, tax documents, and compliance tests.
- Phase 6: add tax handoff, sponsored accounts, sponsor controls, business accounts, fraud/scam review queues, accessibility pass, offline/realtime hardening, and manual native verification.

## Next Steps

- Continue the architecture-teaching upgrades with `066-spotify.md`.
- Resolve Cash App manual verification blockers before claiming one-for-one native or provider parity.
- Create or link the downstream implementation repository only after finance-provider, legal, compliance, privacy, security, and support owners approve the selected V1 scope.
