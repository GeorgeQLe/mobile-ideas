# Mint/Credit Karma-Style Clone Spec

> Metadata
> - Inspiration app: Intuit Credit Karma, including Mint-successor personal finance patterns where public Credit Karma sources support them
> - Category: Personal finance, credit monitoring, net worth, account aggregation, spending insights, recommendations, tax/loan/insurance marketplace, and financial account support
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of 2026-04-18.
> - Verification basis: exact public marketplace pages, Credit Karma public product pages, Credit Karma support, Intuit/Credit Karma legal and privacy pages, and public security/help guidance.
> - Manual verification blockers: native iOS/Android screens, signup/login, credit bureau identity questions, credit-score display, credit report disputes, account aggregation, linked financial accounts, net worth migration/import, transaction categorization, Credit Karma Money Spend/Save, card/account funding, credit/loan/insurance recommendations, offer prequalification, tax handoff, data export, account deletion, support chat, push payloads, and regional/provider availability require lawful test accounts/devices and provider approval before one-for-one parity claims.
> - Legal scope: functional parity only; use original code, branding, copy, icons, sample data, scoring display rules, marketplace ranking, bank partners, tax providers, offer partners, support scripts, and regulated-finance controls.

## Overview

Build an original personal finance app inspired by Credit Karma's public workflow and Mint-successor user expectations: account creation, credit profile, credit scores and reports, monitoring alerts, linked accounts/net worth, spending and transaction insights, account recommendations, Credit Karma Money-style spend/save surfaces, loan/card/insurance marketplace offers, identity monitoring, support, privacy controls, data export, and account deletion.

The clone must not copy Credit Karma or Intuit branding, screenshots, marketing copy, protected UI artwork, private APIs, scoring/ranking models, offer marketplace logic, bank partner arrangements, credit bureau contracts, tax content, legal disclosure text, or support scripts. Public-source parity should be implemented through original product language, synthetic financial data, licensed credit/account providers, provider-specific consent flows, and clear manual blockers.

## Goals

- Provide a mobile-first personal finance experience with account onboarding, credit dashboard, linked-account/net-worth dashboard, transaction insights, recommendations, alerts, support, privacy, and security settings.
- Support finance-category trust expectations around credit data accuracy, bureau/source freshness, identity verification, linked account consent, sensitive-data minimization, recommendation conflicts, account deletion, and support escalation.
- Model credit, account aggregation, marketplace recommendations, banking-style spend/save products, tax handoff, and identity monitoring as provider-backed modules with eligibility and disclosure gates.
- Produce concrete screens, entities, API contracts, offline/realtime rules, analytics, safety controls, edge cases, acceptance tests, and build phases.
- Preserve the distinction between public-source requirements, inferred clone requirements, and manual verification blockers.

## Non-Goals

- Do not build a Credit Karma, Mint, or Intuit-branded app or imply affiliation with Intuit, credit bureaus, bank partners, tax products, lenders, insurers, or marketplace partners.
- Do not calculate or display production credit scores, credit reports, disputes, offers, account balances, bank transactions, tax records, identity monitoring, or financial advice without licensed providers and legal/compliance review.
- Do not scrape Credit Karma, reuse private APIs, copy recommendation/ranking models, copy disclosure text, copy support scripts, or import real Mint/Credit Karma data without explicit user consent and provider approval.
- Do not treat credit reporting, account aggregation, marketplace offers, banking products, tax handoff, identity monitoring, support, or data rights as generic app features.
- Do not claim exact native-device, account, notification, support, credit bureau, financial account, recommendation, deletion/export, or regional parity until manual verification blockers are resolved.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Apple App Store | https://apps.apple.com/us/app/intuit-credit-karma/id519817714 | Official iOS listing, developer, Finance category, credit/finance positioning, privacy labels, age rating, and app update context | Verified 2026-04-18 |
| Google Play | https://play.google.com/store/apps/details?id=com.creditkarma.mobile | Official Android listing, package id, data-safety orientation, credit and finance positioning, and support/developer links | Verified 2026-04-18 |
| Credit Karma Home | https://www.creditkarma.com/ | Public product positioning for credit scores, financial progress, recommendations, and member dashboard concepts | Verified 2026-04-18 |
| Credit Karma Support | https://support.creditkarma.com/ | First-party help taxonomy for account access, credit reports/scores, financial accounts, Credit Karma Money, tax, privacy, and support | Verified 2026-04-18 |
| Free Credit Score | https://www.creditkarma.com/free-credit-score | Credit-score access, monitoring orientation, score update and report framing | Verified 2026-04-18 |
| Net Worth | https://www.creditkarma.com/net-worth | Public net-worth/account-linking positioning and personal finance dashboard requirements | Verified 2026-04-18 |
| Credit Karma Money Spend | https://www.creditkarma.com/checking | Spend account, debit-card-style account positioning, banking partner dependencies, and account lifecycle requirements | Verified 2026-04-18 |
| Credit Karma Money Save | https://www.creditkarma.com/savings | Save account positioning, balance/interest/eligibility, and partner-backed account expectations | Verified 2026-04-18 |
| Identity Monitoring | https://www.creditkarma.com/id-monitoring | Public identity monitoring and breach-alert orientation | Verified 2026-04-18 |
| Terms Of Service | https://www.creditkarma.com/about/terms | Account terms, eligibility, service boundaries, user responsibilities, marketplace/product caveats, and arbitration | Verified 2026-04-18 |
| Privacy Policy | https://www.creditkarma.com/about/privacy | Data categories, credit/financial/account data, sharing, retention, privacy rights, and choices | Verified 2026-04-18 |
| Intuit Privacy Statement | https://www.intuit.com/privacy/statement/ | Intuit entity privacy scope, data rights, use/sharing, security, and cross-product privacy controls | Verified 2026-04-18 |
| Security | https://www.creditkarma.com/about/security | Public security practices, account protection, and trust requirements | Verified 2026-04-18 |

## Detailed Design

### Source-Backed Product Requirements

- V1 must support adult onboarding, email/phone authentication, identity verification for credit access, legal consent, privacy choices, account recovery, and signed-out, verification-required, verified, restricted, and closed states.
- Credit dashboard must show credit-score cards, source/freshness labels, score factors, alerts, report sections, dispute/support entrypoints, simulator/education tiles where licensed, and clear no-guarantee disclaimers.
- Net worth/account aggregation must support provider consent, linked institutions, account balances, account refresh, stale/failed connections, transaction imports, categorization, spending summaries, cash/debt/investment buckets, and unlink/delete controls.
- Transaction insights must support merchant/category normalization, rules, recategorization, recurring bills/subscriptions, budget-like summaries, duplicate/late imports, hidden/excluded transactions, and export.
- Recommendation marketplace must support cards, loans, insurance, banking products, and other offers with eligibility/prequalification state, partner handoff, sponsored/affiliate disclosure, no-guarantee copy, and privacy-safe ranking.
- Credit Karma Money-style spend/save products must be represented as partner-backed accounts with eligibility, account opening, balances, card, transfers, interest, statements, support, and closure blockers behind provider approval.
- Identity monitoring must expose breach/dark-web alert state, monitored identifiers, alert details, remediation education, and opt-in/out controls without exposing sensitive identifiers in analytics.
- Support, privacy, data export, account deletion, marketing preferences, linked-account deletion, and legal links must remain reachable from settings and relevant detail screens.

### Build Plan

1. Foundation: account, identity, consent, privacy, legal links, provider adapters, financial account tokens, feature flags, audit events, and synthetic credit/account fixtures.
2. Dashboard core: credit home, net worth home, alerts, recommendations, activity, support, settings, notification preferences, and cached reads with freshness labels.
3. Account aggregation: institution search, consent handoff, linked accounts, balances, transaction imports, categories, rules, stale states, and unlink/delete flows.
4. Marketplace modules: offer eligibility, partner handoff, sponsored disclosure, Credit Karma Money-style account gates, identity monitoring, and tax handoff behind compliance/provider flags.
5. Trust and privacy: score/source labels, recommendation disclosures, PII redaction, data export, account closure blockers, support evidence handling, and privacy-safe analytics.
6. Native verification: confirm iOS/Android screens, bureau/provider flows, push payloads, support paths, data rights, and regional/provider differences with lawful test accounts.

## Core User Journeys

- New user creates an account, verifies identity for credit access, accepts terms/privacy, and lands on a credit dashboard with score freshness and onboarding education.
- Returning user opens the app, sees credit score changes, reviews score factors, opens a report item, and starts a dispute/support path.
- User links financial accounts, reviews consent, sees net worth and transaction imports, handles stale credentials, and unlinks an institution.
- User recategorizes transactions, creates category rules, sees spending summaries, and exports transaction data.
- User opens a card or loan recommendation, reviews prequalification and sponsored disclosures, follows a partner handoff, and later returns to the app.
- User opens Credit Karma Money-style spend/save surfaces, sees eligibility/provider states, statements, transfer blockers, and support paths.
- User receives identity monitoring alert, reviews masked details, follows remediation steps, and changes notification preferences.
- Privacy-focused user downloads data, deletes linked accounts, starts account deletion, and sees legal/provider retention caveats.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
| Welcome/Auth | Signup, login, legal consent, recovery | email, phone, password/passkey, OTP | new, returning, locked | duplicate account, unsupported age, closed account |
| Identity/Credit Setup | Credit-profile verification | SSN fragment, DOB, address, questions | required, pending, verified | bureau mismatch, thin file, manual review |
| Credit Dashboard | Scores, factors, alerts, report entry | score card, factor, alert | loaded, no-score, stale | bureau outage, score delayed, restricted |
| Credit Report Detail | Accounts, inquiries, collections, disputes | section, item, dispute | current, changed, disputed | incorrect item, bureau unavailable |
| Net Worth Home | Linked accounts, balances, trends | institution, account, refresh | linked, zero, stale | consent expired, provider outage |
| Account Link Flow | Institution search and consent handoff | search, credentials, consent | searching, linking, linked | MFA fail, unsupported bank, revoked consent |
| Transactions/Spending | Imported transactions and insights | filter, category, rule | loaded, categorized, hidden | duplicate, pending, merchant mismatch |
| Recommendations | Cards, loans, insurance, accounts | offer, filter, apply | eligible, prequalified, sponsored | denied, expired, partner unavailable |
| Money Spend/Save | Partner account surfaces | open, transfer, statement | eligible, active, pending | provider hold, transfer fail, closure blocked |
| Identity Monitoring | Alerts and remediation | alert, identifier, settings | opted-in, alert, resolved | sensitive identifier masked, false positive |
| Support/Privacy/Settings | Help, notifications, export, delete | case, export, delete, legal | open, pending export, closure | legal retention, linked account remaining |

## Data Model

- `User`: identity status, contact methods, region, consent, privacy choices, score access, restrictions, and closure lifecycle.
- `DeviceSession`: device id, platform, auth method, push token, risk markers, and session revocation.
- `CreditProfile`: bureau source, score snapshot, factors, report sections, alert history, freshness, dispute state, and provider status.
- `FinancialInstitution`: provider id, consent scope, connection health, MFA state, refresh cadence, and unlink state.
- `LinkedAccount`: account type, masked name, balance, currency, provider status, ownership, hidden/excluded flag, and deletion behavior.
- `Transaction`: account, merchant, amount, category, pending/posted state, import source, rule match, exclusion, and export metadata.
- `CategoryRule`: merchant/category pattern, user override, priority, effective date, and audit trail.
- `Recommendation`: product type, partner, eligibility, prequalification, sponsored disclosure, ranking reason, expiry, and handoff state.
- `MoneyAccount`: partner-backed spend/save account, balance, card, transfers, statements, interest/rate snapshot, provider restrictions, and closure state.
- `IdentityAlert`: monitored identifier, breach/source category, masked detail, severity, remediation, notification state, and resolution.
- `SupportCase`: issue type, linked credit item/account/offer, evidence, owner queue, SLA, resolution, appeal, and privacy flag.
- `AuditEvent`: append-only record for auth, identity, credit access, account linking, recommendation, money account, support, privacy, and deletion actions.
- `LocalCacheRecord`: cached dashboard, reports, balances, transactions, offers, settings, support cases, sync attempts, and offline expiry.

## API And Backend Contracts

- `POST /auth/session`, `POST /auth/verify`, `POST /auth/recover`, `DELETE /auth/session`, and `DELETE /auth/sessions/:id` manage secure access and recovery.
- `GET /profile`, `PATCH /profile`, `POST /identity/credit-check`, and `GET /eligibility` return identity, bureau, feature, provider, and manual-verification gates.
- `GET /credit/summary`, `GET /credit/report`, `GET /credit/alerts`, and `POST /credit/disputes` expose scores, report sections, changes, disputes, and provider state.
- `GET /institutions`, `POST /institutions/link-session`, `GET /linked-accounts`, `POST /linked-accounts/:id/refresh`, and `DELETE /linked-accounts/:id` manage account aggregation and consent.
- `GET /transactions`, `PATCH /transactions/:id`, `POST /category-rules`, and `GET /spending/summary` handle imports, categorization, user rules, and summaries.
- `GET /recommendations`, `POST /recommendations/:id/prequalify`, and `POST /recommendations/:id/handoff` manage marketplace offers, disclosures, eligibility, and partner handoff.
- `GET /money-accounts`, `POST /money-accounts/open`, `POST /money-accounts/transfers/preview`, `POST /money-accounts/transfers`, and `GET /statements` model partner-backed spend/save accounts.
- `GET /identity-monitoring`, `PATCH /identity-monitoring/settings`, and `POST /identity-alerts/:id/resolve` model alert preferences and remediation state.
- `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `GET /data-export/:id`, and `DELETE /account` expose data rights, linked-account deletion, and closure blockers.
- `POST /support/cases`, `GET /support/cases/:id`, and `POST /support/cases/:id/evidence` handle help, disputes, privacy requests, and support-safe evidence upload.

## Realtime, Push, And Offline Behavior

- Credit score/report, linked-account, transaction, recommendation, money-account, identity-alert, support, privacy, and security states must reconcile from server-owned events.
- The client may cache dashboards, score snapshots with freshness labels, balances, transactions, offers, support cases, settings, and legal links for offline reads.
- Offline mode may preserve categorization edits and support drafts but must block account linking, money transfers, offer applications, disputes, data deletion, and provider state changes.
- Credit scores, balances, transactions, recommendations, rates, eligibility, and provider statuses must display source and freshness and refresh before sensitive decisions.
- Push notifications must be opt-in and category-controlled for credit changes, identity alerts, account connection issues, offer updates, money-account activity, support, security, and data export readiness.
- Push payloads must avoid full SSNs, credit scores by default, balances, transaction details, partner offer data, identity-alert identifiers, and support evidence unless explicitly allowed by policy.

## Permissions, Privacy, And Safety

- Request notifications, files/photos, contacts, camera, biometric authentication, and location only when a feature requires them.
- Default analytics must exclude raw SSNs, credit report items, credit scores, balances, transactions, account numbers, bank credentials, identity-alert identifiers, offer details, tax data, and support evidence.
- Credit reporting, account aggregation, marketplace offers, banking-style accounts, identity monitoring, disputes, tax handoff, support, data export, and deletion require launch owners, provider contracts, audit logs, and manual verification gates.
- Recommendation flows must disclose sponsored/partner relationships, eligibility uncertainty, prequalification limits, and no-guarantee/no-financial-advice treatment.
- Account deletion and data export must warn about credit provider retention, linked financial accounts, money accounts, support cases, tax/provider records, legal holds, and regulatory retention.
- Accessibility must target WCAG 2.2 AA where applicable, dynamic type, screen-reader labels, visible focus, reduced motion, readable score explanations, chart alternatives, and accessible support paths.
- Launch owners: compliance owner for credit/account/marketplace products; privacy owner for data rights; provider owner for aggregation and Credit Karma Money-style accounts; trust/safety owner for identity alerts; accessibility owner for finance UX; support owner for disputes.

## Analytics And Monetization

- Track privacy-safe events for onboarding, credit verification state, dashboard viewed, score factor opened, account link started/completed, transaction categorized, recommendation viewed, partner handoff started, identity alert opened, support case opened, data export requested, and account deletion requested.
- Events must use coarse categories, reason codes, provider status, feature flags, latency bucket, and flow step rather than raw credit, account, transaction, identity, tax, or offer data.
- Monetization may include original sponsored recommendations, affiliate marketplace economics, partner-backed accounts, and premium monitoring features only with legal-reviewed disclosures, opt-outs, and privacy controls.

## Edge Cases

- First launch offline, lost email/phone, duplicate account, thin credit file, frozen credit file, bureau mismatch, identity questions unavailable, locked account, or closed account.
- Credit score changes unexpectedly, report item is disputed, bureau data is delayed, alert is a false positive, or score source differs across providers.
- Bank connection requires MFA, credentials expire, institution is unsupported, duplicate accounts import, pending transactions change, merchant/category is wrong, or historical Mint-like data is incomplete.
- Recommendation prequalification expires, partner denies application, offer terms change, sponsored ranking changes, or user interprets education as financial advice.
- Money account transfer fails, statement is unavailable, partner account is restricted, interest/rate changes, or closure is blocked by pending activity.
- Data export/deletion conflicts with linked accounts, support cases, provider retention, tax records, money accounts, legal holds, or unresolved disputes.

## Test Plan

- Validate exactly one H1, all canonical sections, exact source URLs, and no generic research placeholders.
- Unit test account state, credit verification gates, linked-account connection states, transaction categorization, category rules, recommendation eligibility, money-account blockers, identity-alert state, closure blockers, and privacy-safe analytics.
- Contract test every documented API route, response shape, pagination cursor, provider status, error code, event replay, and consent/disclosure acknowledgement.
- Integration test onboarding, credit dashboard, report detail, account linking, net worth, transaction rules, recommendations, money account surfaces, identity monitoring, support, data export, and account deletion.
- Offline/realtime test cached dashboards, stale source labels, blocked sensitive writes offline, reconnect reconciliation, duplicate imports, push deep links, and provider outages.
- Security test tokenized account links, PII redaction, session revocation, support evidence access, audit events, provider secret isolation, and deletion workflows.
- Accessibility test screen readers, focus order, dynamic type, contrast, reduced motion, chart alternatives, score explanations, error recovery, and support paths.
- Manual verification test native screens, credit profile, account aggregation, transaction imports, recommendations, money accounts, support, push payloads, data export, account deletion, and provider-specific behavior before removing launch gates.

## Acceptance Criteria

- The spec has exactly one H1 and all canonical sections.
- Exact first-party marketplace, help/support, privacy/legal, product, security, credit, net-worth, money-account, and identity-monitoring URLs replace generic research placeholders.
- A downstream team can build a lawful public-source V1 inspired by Credit Karma/Mint-successor finance patterns without copying assets, network traffic, private APIs, scoring/ranking models, disclosure text, support scripts, or brand copy.
- Every credit, account aggregation, financial account, recommendation, money account, tax, support, notification, deletion/export, regional, and native-device behavior without lawful hands-on verification remains explicitly blocked.
- Sensitive reads and writes require provider consent, source/freshness labels, audit events, privacy controls, and user-visible support or failure state.
- Privacy, security, recommendation disclosures, data export, account deletion, and support escalation are represented in screens, entities, APIs, and tests.
- Regulated and provider-backed modules remain feature-flagged until legal, compliance, provider, security, accessibility, and manual verification owners approve launch.

## Open Questions

- Which Mint-successor import, net-worth, and transaction history behaviors are available through public Credit Karma flows and lawful test accounts?
- Which credit bureau, aggregation, banking, identity monitoring, tax, and offer providers will the implementation use?
- Which recommendations or money-account features should be removed from V1 rather than shipped behind blockers?
- Which synthetic fixtures and downstream implementation repos will be used for credit, linked-account, transaction, offer, and identity-alert tests?

## Next Steps

- Use lawful test accounts/devices to verify native screens, credit profile, linked accounts, net worth, transaction insights, recommendations, money accounts, push notifications, support, and data rights.
- Create synthetic users, credit profiles, linked accounts, transactions, category rules, recommendations, money accounts, identity alerts, support cases, and provider events.
- Run legal, compliance, privacy, trust/safety, accessibility, provider, and support review before enabling production credit, account aggregation, offers, or banking-style workflows.
