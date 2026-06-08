# Phase 25: Implementation — Home, Security, Cloud & Enterprise (129 Apps × 6 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all six variant scaffolds for every app in the Home, Security, Cloud & Enterprise cluster.

**Scope**:
- Apps (129): Smart Home (24), Real Estate & Home Services (21), Jobs (3), Cloud/Identity — Password Managers & Authenticators (12), Security & VPN (15), Enterprise Operations (26), Developer Tools (28).
- Shared patterns: device management, property listings, job search, credential vaults, secure tunneling, enterprise dashboards, cloud infrastructure monitoring, code editing.
- Excludes: Parental Controls & Family (21 apps already built in Phase 21), Hacker News ID 853 (already built in Phase 24), Cloud Storage & Document Scanning (already built in Phase 23).

**Acceptance Criteria:**
- [x] Exact Phase 25 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 25 apps have 6 working variants each or explicit blockers.
- [ ] Every variant passes validation and has evidence recorded.
- [ ] Core workflows per sub-category functional across variants or explicitly blocked.
- [ ] Category-specific risk review for smart home (IoT device control), security (VPN/encryption), child-directed (parental controls overlap), enterprise (PII/financial), and developer tools (cloud infrastructure) documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Largest cluster — 129 apps across 7 sub-categories. Share device management, credential vault, dashboard, and listing patterns. Extra care for smart home IoT security, VPN/encryption compliance, enterprise PII handling, and cloud infrastructure access patterns.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, smart-home/security/enterprise/child-directed regulatory blocker review

### Implementation

- [x] Step 25.1: Reconcile exact Home, Security, Cloud & Enterprise app inventory and downstream readiness (129 apps)

  **Results (2026-06-08):**
  - **129/129 PASS, 0 failures.** All repos verified PRIVATE, default branch `main`, README present, source spec under `docs/source-specs/`, root commit present, no `.github/workflows`.
  - Rate-limit evidence: pre=4911/5000, post=4477/5000 (~434 API calls).
  - ID 113 (Realtor.com) repo slug is `realtor-com-mobile-clone` (not `realtor-mobile-clone`) — known naming variation.
  - ID 853 (Hacker News) verified present but EXCLUDED from Phase 25 work (already built in Phase 24).
  - Phase 25 working set: **128 apps** (129 verified minus 1 excluded).
  - Exclusions confirmed: Phase 21 parental/family (21 apps), Phase 23 cloud storage/doc scanning (16 apps), Phase 24 Hacker News (ID 853).

  **Reconciled Inventory (129 repos, 128 Phase 25 apps + 1 excluded):**

  **Smart Home (24 apps):**

  | ID | App | Repo Slug | Source Spec | Status |
  |---:|---|---|---|---|
  | 100 | Ring | `ring-mobile-clone` | `specs/batch-05/100-ring.md` | PASS |
  | 635 | Google Home | `google-home-mobile-clone` | `specs/batch-32/635-google-home.md` | PASS |
  | 636 | Amazon Alexa | `amazon-alexa-mobile-clone` | `specs/batch-32/636-amazon-alexa.md` | PASS |
  | 637 | Apple Home | `apple-home-mobile-clone` | `specs/batch-32/637-apple-home.md` | PASS |
  | 638 | Samsung SmartThings | `samsung-smartthings-mobile-clone` | `specs/batch-32/638-samsung-smartthings.md` | PASS |
  | 639 | Philips Hue | `philips-hue-mobile-clone` | `specs/batch-32/639-philips-hue.md` | PASS |
  | 640 | Wyze | `wyze-mobile-clone` | `specs/batch-32/640-wyze.md` | PASS |
  | 641 | Arlo Secure | `arlo-secure-mobile-clone` | `specs/batch-33/641-arlo-secure.md` | PASS |
  | 642 | Nest | `nest-mobile-clone` | `specs/batch-33/642-nest.md` | PASS |
  | 643 | Eufy Security | `eufy-security-mobile-clone` | `specs/batch-33/643-eufy-security.md` | PASS |
  | 644 | TP-Link Tapo | `tp-link-tapo-mobile-clone` | `specs/batch-33/644-tp-link-tapo.md` | PASS |
  | 645 | Kasa Smart | `kasa-smart-mobile-clone` | `specs/batch-33/645-kasa-smart.md` | PASS |
  | 646 | Smart Life | `smart-life-mobile-clone` | `specs/batch-33/646-smart-life.md` | PASS |
  | 647 | Tuya Smart | `tuya-smart-mobile-clone` | `specs/batch-33/647-tuya-smart.md` | PASS |
  | 648 | eWeLink | `ewelink-mobile-clone` | `specs/batch-33/648-ewelink.md` | PASS |
  | 649 | August Home | `august-home-mobile-clone` | `specs/batch-33/649-august-home.md` | PASS |
  | 650 | Yale Access | `yale-access-mobile-clone` | `specs/batch-33/650-yale-access.md` | PASS |
  | 651 | Ecobee | `ecobee-mobile-clone` | `specs/batch-33/651-ecobee.md` | PASS |
  | 652 | Honeywell Home | `honeywell-home-mobile-clone` | `specs/batch-33/652-honeywell-home.md` | PASS |
  | 653 | myQ | `myq-mobile-clone` | `specs/batch-33/653-myq.md` | PASS |
  | 654 | SimpliSafe | `simplisafe-mobile-clone` | `specs/batch-33/654-simplisafe.md` | PASS |
  | 655 | ADT Control | `adt-control-mobile-clone` | `specs/batch-33/655-adt-control.md` | PASS |
  | 656 | Vivint | `vivint-mobile-clone` | `specs/batch-33/656-vivint.md` | PASS |
  | 657 | Blink Home Monitor | `blink-home-monitor-mobile-clone` | `specs/batch-33/657-blink-home-monitor.md` | PASS |

  **Real Estate & Home Services (21 apps):**

  | ID | App | Repo Slug | Source Spec | Status |
  |---:|---|---|---|---|
  | 111 | Zillow | `zillow-mobile-clone` | `specs/batch-06/111-zillow.md` | PASS |
  | 112 | Redfin | `redfin-mobile-clone` | `specs/batch-06/112-redfin.md` | PASS |
  | 113 | Realtor.com | `realtor-com-mobile-clone` | `specs/batch-06/113-realtor.md` | PASS |
  | 617 | Homes.com | `homes-com-mobile-clone` | `specs/batch-31/617-homes-com.md` | PASS |
  | 618 | Trulia | `trulia-mobile-clone` | `specs/batch-31/618-trulia.md` | PASS |
  | 619 | HotPads | `hotpads-mobile-clone` | `specs/batch-31/619-hotpads.md` | PASS |
  | 620 | Rent.com | `rent-com-mobile-clone` | `specs/batch-31/620-rent-com.md` | PASS |
  | 621 | Apartment List | `apartment-list-mobile-clone` | `specs/batch-32/621-apartment-list.md` | PASS |
  | 622 | StreetEasy | `streeteasy-mobile-clone` | `specs/batch-32/622-streeteasy.md` | PASS |
  | 623 | LoopNet | `loopnet-mobile-clone` | `specs/batch-32/623-loopnet.md` | PASS |
  | 624 | Redfin Rentals | `redfin-rentals-mobile-clone` | `specs/batch-32/624-redfin-rentals.md` | PASS |
  | 625 | Zillow Rentals | `zillow-rentals-mobile-clone` | `specs/batch-32/625-zillow-rentals.md` | PASS |
  | 626 | Houzz | `houzz-mobile-clone` | `specs/batch-32/626-houzz.md` | PASS |
  | 627 | Angi | `angi-mobile-clone` | `specs/batch-32/627-angi.md` | PASS |
  | 628 | Thumbtack | `thumbtack-mobile-clone` | `specs/batch-32/628-thumbtack.md` | PASS |
  | 629 | Taskrabbit | `taskrabbit-mobile-clone` | `specs/batch-32/629-taskrabbit.md` | PASS |
  | 630 | Handy | `handy-mobile-clone` | `specs/batch-32/630-handy.md` | PASS |
  | 631 | Thumbtack Pro | `thumbtack-pro-mobile-clone` | `specs/batch-32/631-thumbtack-pro.md` | PASS |
  | 632 | Porch | `porch-mobile-clone` | `specs/batch-32/632-porch.md` | PASS |
  | 633 | Build.com | `build-com-mobile-clone` | `specs/batch-32/633-build-com.md` | PASS |
  | 634 | Floor & Decor | `floor-and-decor-mobile-clone` | `specs/batch-32/634-floor-and-decor.md` | PASS |

  **Jobs (3 apps):**

  | ID | App | Repo Slug | Source Spec | Status |
  |---:|---|---|---|---|
  | 108 | Indeed | `indeed-mobile-clone` | `specs/batch-06/108-indeed.md` | PASS |
  | 109 | Glassdoor | `glassdoor-mobile-clone` | `specs/batch-06/109-glassdoor.md` | PASS |
  | 110 | ZipRecruiter | `ziprecruiter-mobile-clone` | `specs/batch-06/110-ziprecruiter.md` | PASS |

  **Cloud/Identity — Password Managers & Authenticators (12 apps):**

  | ID | App | Repo Slug | Source Spec | Status |
  |---:|---|---|---|---|
  | 792 | 1Password | `1password-mobile-clone` | `specs/batch-40/792-1password.md` | PASS |
  | 793 | LastPass | `lastpass-mobile-clone` | `specs/batch-40/793-lastpass.md` | PASS |
  | 794 | Bitwarden | `bitwarden-mobile-clone` | `specs/batch-40/794-bitwarden.md` | PASS |
  | 795 | Dashlane | `dashlane-mobile-clone` | `specs/batch-40/795-dashlane.md` | PASS |
  | 796 | Keeper | `keeper-mobile-clone` | `specs/batch-40/796-keeper.md` | PASS |
  | 797 | NordPass | `nordpass-mobile-clone` | `specs/batch-40/797-nordpass.md` | PASS |
  | 798 | Proton Pass | `proton-pass-mobile-clone` | `specs/batch-40/798-proton-pass.md` | PASS |
  | 799 | Authy | `authy-mobile-clone` | `specs/batch-40/799-authy.md` | PASS |
  | 800 | Google Authenticator | `google-authenticator-mobile-clone` | `specs/batch-40/800-google-authenticator.md` | PASS |
  | 801 | Microsoft Authenticator | `microsoft-authenticator-mobile-clone` | `specs/batch-41/801-microsoft-authenticator.md` | PASS |
  | 802 | Okta Verify | `okta-verify-mobile-clone` | `specs/batch-41/802-okta-verify.md` | PASS |
  | 803 | Duo Mobile | `duo-mobile-mobile-clone` | `specs/batch-41/803-duo-mobile.md` | PASS |

  **Security & VPN (15 apps):**

  | ID | App | Repo Slug | Source Spec | Status |
  |---:|---|---|---|---|
  | 804 | NordVPN | `nordvpn-mobile-clone` | `specs/batch-41/804-nordvpn.md` | PASS |
  | 805 | ExpressVPN | `expressvpn-mobile-clone` | `specs/batch-41/805-expressvpn.md` | PASS |
  | 806 | Surfshark | `surfshark-mobile-clone` | `specs/batch-41/806-surfshark.md` | PASS |
  | 807 | Proton VPN | `proton-vpn-mobile-clone` | `specs/batch-41/807-proton-vpn.md` | PASS |
  | 808 | Mullvad VPN | `mullvad-vpn-mobile-clone` | `specs/batch-41/808-mullvad-vpn.md` | PASS |
  | 809 | TunnelBear | `tunnelbear-mobile-clone` | `specs/batch-41/809-tunnelbear.md` | PASS |
  | 810 | Windscribe | `windscribe-mobile-clone` | `specs/batch-41/810-windscribe.md` | PASS |
  | 811 | Cloudflare WARP | `cloudflare-warp-mobile-clone` | `specs/batch-41/811-cloudflare-warp.md` | PASS |
  | 812 | Malwarebytes | `malwarebytes-mobile-clone` | `specs/batch-41/812-malwarebytes.md` | PASS |
  | 813 | Norton 360 | `norton-360-mobile-clone` | `specs/batch-41/813-norton-360.md` | PASS |
  | 814 | McAfee Security | `mcafee-security-mobile-clone` | `specs/batch-41/814-mcafee-security.md` | PASS |
  | 815 | Avast One | `avast-one-mobile-clone` | `specs/batch-41/815-avast-one.md` | PASS |
  | 816 | Bitdefender Mobile Security | `bitdefender-mobile-security-mobile-clone` | `specs/batch-41/816-bitdefender-mobile-security.md` | PASS |
  | 817 | 2FAS | `2fas-mobile-clone` | `specs/batch-41/817-2fas.md` | PASS |
  | 818 | Yubico Authenticator | `yubico-authenticator-mobile-clone` | `specs/batch-41/818-yubico-authenticator.md` | PASS |

  **Enterprise Operations (26 apps):**

  | ID | App | Repo Slug | Source Spec | Status |
  |---:|---|---|---|---|
  | 819 | Salesforce | `salesforce-mobile-clone` | `specs/batch-41/819-salesforce.md` | PASS |
  | 820 | HubSpot | `hubspot-mobile-clone` | `specs/batch-41/820-hubspot.md` | PASS |
  | 821 | Zendesk | `zendesk-mobile-clone` | `specs/batch-42/821-zendesk.md` | PASS |
  | 822 | Intercom | `intercom-mobile-clone` | `specs/batch-42/822-intercom.md` | PASS |
  | 823 | Freshdesk | `freshdesk-mobile-clone` | `specs/batch-42/823-freshdesk.md` | PASS |
  | 824 | ServiceNow | `servicenow-mobile-clone` | `specs/batch-42/824-servicenow.md` | PASS |
  | 825 | Workday | `workday-mobile-clone` | `specs/batch-42/825-workday.md` | PASS |
  | 826 | BambooHR | `bamboohr-mobile-clone` | `specs/batch-42/826-bamboohr.md` | PASS |
  | 827 | ADP Mobile | `adp-mobile-mobile-clone` | `specs/batch-42/827-adp-mobile.md` | PASS |
  | 828 | Gusto Wallet | `gusto-wallet-mobile-clone` | `specs/batch-42/828-gusto-wallet.md` | PASS |
  | 829 | Rippling | `rippling-mobile-clone` | `specs/batch-42/829-rippling.md` | PASS |
  | 830 | Deel | `deel-mobile-clone` | `specs/batch-42/830-deel.md` | PASS |
  | 831 | Expensify | `expensify-mobile-clone` | `specs/batch-42/831-expensify.md` | PASS |
  | 832 | SAP Concur | `sap-concur-mobile-clone` | `specs/batch-42/832-sap-concur.md` | PASS |
  | 833 | QuickBooks | `quickbooks-mobile-clone` | `specs/batch-42/833-quickbooks.md` | PASS |
  | 834 | Xero | `xero-mobile-clone` | `specs/batch-42/834-xero.md` | PASS |
  | 835 | Square POS | `square-pos-mobile-clone` | `specs/batch-42/835-square-pos.md` | PASS |
  | 836 | Shopify | `shopify-mobile-clone` | `specs/batch-42/836-shopify.md` | PASS |
  | 837 | Shopify Inbox | `shopify-inbox-mobile-clone` | `specs/batch-42/837-shopify-inbox.md` | PASS |
  | 838 | Stripe Dashboard | `stripe-dashboard-mobile-clone` | `specs/batch-42/838-stripe-dashboard.md` | PASS |
  | 839 | PayPal Business | `paypal-business-mobile-clone` | `specs/batch-42/839-paypal-business.md` | PASS |
  | 840 | Mailchimp | `mailchimp-mobile-clone` | `specs/batch-42/840-mailchimp.md` | PASS |
  | 841 | Hootsuite | `hootsuite-mobile-clone` | `specs/batch-43/841-hootsuite.md` | PASS |
  | 842 | Buffer | `buffer-mobile-clone` | `specs/batch-43/842-buffer.md` | PASS |
  | 843 | Sprout Social | `sprout-social-mobile-clone` | `specs/batch-43/843-sprout-social.md` | PASS |
  | 844 | Later | `later-mobile-clone` | `specs/batch-43/844-later.md` | PASS |

  **Developer Tools (28 IDs verified, 27 Phase 25 apps + 1 excluded):**

  | ID | App | Repo Slug | Source Spec | Status | Note |
  |---:|---|---|---|---|---|
  | 187 | GitHub Mobile | `github-mobile-mobile-clone` | `specs/batch-10/187-github-mobile.md` | PASS | |
  | 845 | GitLab | `gitlab-mobile-clone` | `specs/batch-43/845-gitlab.md` | PASS | |
  | 846 | Bitbucket | `bitbucket-mobile-clone` | `specs/batch-43/846-bitbucket.md` | PASS | |
  | 847 | Postman | `postman-mobile-clone` | `specs/batch-43/847-postman.md` | PASS | |
  | 848 | CodeSandbox | `codesandbox-mobile-clone` | `specs/batch-43/848-codesandbox.md` | PASS | |
  | 849 | Stack Overflow | `stack-overflow-mobile-clone` | `specs/batch-43/849-stack-overflow.md` | PASS | |
  | 850 | DEV Community | `dev-community-mobile-clone` | `specs/batch-43/850-dev-community.md` | PASS | |
  | 851 | Hashnode | `hashnode-mobile-clone` | `specs/batch-43/851-hashnode.md` | PASS | |
  | 852 | Product Hunt | `product-hunt-mobile-clone` | `specs/batch-43/852-product-hunt.md` | PASS | |
  | 853 | Hacker News | `hacker-news-mobile-clone` | `specs/batch-43/853-hacker-news.md` | PASS | **EXCLUDED** — Phase 24 |
  | 854 | DigitalOcean | `digitalocean-mobile-clone` | `specs/batch-43/854-digitalocean.md` | PASS | |
  | 855 | AWS Console | `aws-console-mobile-clone` | `specs/batch-43/855-aws-console.md` | PASS | |
  | 856 | Google Cloud | `google-cloud-mobile-clone` | `specs/batch-43/856-google-cloud.md` | PASS | |
  | 857 | Microsoft Azure | `microsoft-azure-mobile-clone` | `specs/batch-43/857-microsoft-azure.md` | PASS | |
  | 858 | Cloudflare | `cloudflare-mobile-clone` | `specs/batch-43/858-cloudflare.md` | PASS | |
  | 859 | Vercel | `vercel-mobile-clone` | `specs/batch-43/859-vercel.md` | PASS | |
  | 860 | Netlify | `netlify-mobile-clone` | `specs/batch-43/860-netlify.md` | PASS | |
  | 861 | Sentry | `sentry-mobile-clone` | `specs/batch-44/861-sentry.md` | PASS | |
  | 862 | Datadog | `datadog-mobile-clone` | `specs/batch-44/862-datadog.md` | PASS | |
  | 863 | PagerDuty | `pagerduty-mobile-clone` | `specs/batch-44/863-pagerduty.md` | PASS | |
  | 864 | Opsgenie | `opsgenie-mobile-clone` | `specs/batch-44/864-opsgenie.md` | PASS | |
  | 865 | Grafana | `grafana-mobile-clone` | `specs/batch-44/865-grafana.md` | PASS | |
  | 866 | New Relic | `new-relic-mobile-clone` | `specs/batch-44/866-new-relic.md` | PASS | |
  | 867 | Expo Go | `expo-go-mobile-clone` | `specs/batch-44/867-expo-go.md` | PASS | |
  | 868 | Termius | `termius-mobile-clone` | `specs/batch-44/868-termius.md` | PASS | |
  | 869 | Blink Shell | `blink-shell-mobile-clone` | `specs/batch-44/869-blink-shell.md` | PASS | |
  | 870 | Working Copy | `working-copy-mobile-clone` | `specs/batch-44/870-working-copy.md` | PASS | |
  | 871 | Code App | `code-app-mobile-clone` | `specs/batch-44/871-code-app.md` | PASS | |

  **Risk Groups & Carry-Forward Blockers:**

  - **Smart Home (24)**: IoT device protocols (Zigbee, Z-Wave, Matter, Thread, Wi-Fi), BLE smart lock pairing, garage door safety interlocks, HVAC thermostat control, camera RTSP/HLS/WebRTC live streaming, home security monitoring/alarm panels, geofencing, voice assistant integration (Alexa/Google/Siri).
  - **Real Estate & Home Services (21)**: MLS data licensing and IDX feeds, property listing aggregation APIs, mortgage/affordability calculators, 3D tour/AR room visualization, service provider background checks, payment processing for home services, map-based property search.
  - **Jobs (3)**: Job posting aggregation APIs, resume parsing/upload, application tracking, salary data licensing, company review content.
  - **Cloud/Identity (12)**: Zero-knowledge encryption architecture, master password key derivation (PBKDF2/Argon2), TOTP/HOTP code generation, biometric auth (Face ID/fingerprint), secure vault storage (Keychain/Keystore), autofill accessibility services (AutofillService/ASCredentialProvider), secure clipboard handling, breach monitoring APIs.
  - **Security & VPN (15)**: VPN tunnel protocols (WireGuard, OpenVPN, IKEv2), NetworkExtension/VpnService platform APIs, DNS-over-HTTPS/TLS, split tunneling, kill switch implementation, malware signature databases, device scanning permissions, real-time threat detection.
  - **Enterprise Operations (26)**: SSO/SAML/OAuth enterprise auth, PII handling compliance (GDPR, CCPA), financial data processing (PCI-DSS), payroll tax regulations, CRM data models and sync, expense receipt OCR, multi-tenant architecture, role-based access control (RBAC), e-commerce platform APIs.
  - **Developer Tools (27)**: Cloud provider APIs (AWS/GCP/Azure), code editing engines (syntax highlighting, LSP), SSH/terminal emulation (libssh2, pseudo-TTY), Git protocol implementation, CI/CD pipeline monitoring, observability data ingestion (metrics/traces/logs), IDE-grade features (autocomplete, debugging), app preview/hot-reload engines.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [ ] Step 25.2: Build static variant scaffolds for all Phase 25 Home, Security, Cloud & Enterprise apps
  - Build `variants/static/` scaffold for all 129 downstream repos.
  - Generator script at `/tmp/generate-homesec-prototypes.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.
  - 7 category-specific HTML/CSS/JS templates.

  **Ship-one-step handoff:** Implement only Step 25.2, validate it, then run `/ship` when done.

- [ ] Step 25.3: Build React Native variant scaffolds for all Phase 25 apps
  - Build `variants/react-native/` scaffold for all 129 downstream repos.
  - Generator script at `/tmp/generate-homesec-rn-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.
  - 7 category-specific RN templates.

  **Ship-one-step handoff:** Implement only Step 25.3, validate it, then run `/ship` when done.

- [ ] Step 25.4: Build Flutter variant scaffolds for all Phase 25 apps
  - Build `variants/flutter/` scaffold for all 129 downstream repos.
  - Generator script at `/tmp/generate-homesec-flutter-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.
  - 7 category-specific Flutter templates.

  **Ship-one-step handoff:** Implement only Step 25.4, validate it, then run `/ship` when done.

- [ ] Step 25.5: Build Expo variant scaffolds for all Phase 25 apps
  - Build `variants/expo/` scaffold for all 129 downstream repos.
  - Generator script at `/tmp/generate-homesec-expo-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.
  - 7 category-specific Expo Router templates.

  **Ship-one-step handoff:** Implement only Step 25.5, validate it, then run `/ship` when done.

- [ ] Step 25.6: Build iOS Native (SwiftUI) variant scaffolds for all Phase 25 apps
  - Build `variants/ios-native/` scaffold for all 129 downstream repos.
  - Generator script at `/tmp/generate-homesec-ios-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.
  - 7 category-specific SwiftUI templates.

  **Ship-one-step handoff:** Implement only Step 25.6, validate it, then run `/ship` when done.

- [ ] Step 25.7: Build Android Native (Kotlin/Jetpack Compose) variant scaffolds for all Phase 25 apps
  - Build `variants/android-native/` scaffold for all 129 downstream repos.
  - Generator script at `/tmp/generate-homesec-android-variants.mjs`.
  - Serial execution with 32s delays. Record pre/post rate-limit evidence.
  - 7 category-specific Jetpack Compose templates.

  **Ship-one-step handoff:** Implement only Step 25.7, validate it, then run `/ship` when done.

### Milestone: Phase 25 — Home, Security, Cloud & Enterprise Complete
**Acceptance Criteria:**
- [ ] Exact Phase 25 inventory reconciled.
- [ ] All apps have 6 variants addressed or explicit blockers.
- [ ] Every variant passes validation with evidence recorded.
- [ ] Core workflows per sub-category functional or explicitly blocked.
- [ ] Category-specific risk review documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 24 pattern (same approach): `tasks/phases/phase-24.md`
- Phase 23 pattern (same approach): `tasks/phases/phase-23.md`
