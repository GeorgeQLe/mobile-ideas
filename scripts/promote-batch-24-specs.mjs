#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const verifiedDate = "2026-05-04";

const apps = [
  {
    id: 461,
    file: "461-vinted.md",
    name: "Vinted",
    category: "peer-to-peer fashion resale marketplace, buyer/seller profiles, listings, wardrobe discovery, offers, buyer protection, shipping, returns/disputes, payments, and moderation",
    product: "https://www.vinted.com/",
    support: "https://www.vinted.com/help",
    privacy: "https://www.vinted.com/privacy-policy",
    terms: "https://www.vinted.com/terms-and-conditions",
    program: "https://www.vinted.com/sell",
    ios: "https://apps.apple.com/us/app/vinted-buy-and-sell-clothing/id632064380",
    android: "https://play.google.com/store/apps/details?id=fr.vinted",
    focus:
      "fashion resale discovery, listing creation, buyer/seller profiles, favorites, offers, bundled purchases, buyer-protection states, prepaid shipping handoffs, returns/disputes, payments, and prohibited-item moderation",
    vertical: "resale",
  },
  {
    id: 462,
    file: "462-offerup.md",
    name: "OfferUp",
    category: "local recommerce marketplace, nearby listings, buyer/seller profiles, secure messaging, offers, shipping, ratings, payments, promotions, and trust controls",
    product: "https://offerup.com/",
    support: "https://help.offerup.com/",
    privacy: "https://offerup.com/privacy/",
    terms: "https://offerup.com/terms/",
    program: "https://offerup.com/sell/",
    ios: "https://apps.apple.com/us/app/offerup-buy-sell-letgo/id468996152",
    android: "https://play.google.com/store/apps/details?id=com.offerup",
    focus:
      "local marketplace browse/search, item listing, buyer/seller profiles, secure messaging, offers, promoted listings, local meetup/shipping handoffs, ratings, payments, fraud controls, and support",
    vertical: "resale",
  },
  {
    id: 463,
    file: "463-craigslist.md",
    name: "Craigslist",
    category: "local classifieds marketplace, city/category browsing, posts, replies, saved searches, maps, alerts, housing/jobs/service categories, moderation, and safety",
    product: "https://www.craigslist.org/",
    support: "https://www.craigslist.org/about/help/",
    privacy: "https://www.craigslist.org/about/privacy.policy",
    terms: "https://www.craigslist.org/about/terms.of.use",
    program: "https://www.craigslist.org/about/help/posting_fees",
    ios: "https://apps.apple.com/us/app/craigslist/id1336642410",
    android: "https://play.google.com/store/apps/details?id=org.craigslist.CraigslistMobile",
    focus:
      "local classifieds city selection, category browsing, posting/reply flows, saved searches, map/list views, alerts, housing/jobs/service category constraints, prohibited-content moderation, and scam controls",
    vertical: "classifieds",
  },
  {
    id: 464,
    file: "464-aliexpress.md",
    name: "AliExpress",
    category: "cross-border shopping marketplace, seller catalog, product discovery, cart, checkout, order tracking, coupons, buyer protection, returns/refunds, and support",
    product: "https://www.aliexpress.us/",
    support: "https://helpcenter.aliexpress.com/",
    privacy: "https://rulechannel.alibaba.com/icbu?type=detail&ruleId=2034",
    terms: "https://rulechannel.alibaba.com/icbu?type=detail&ruleId=2042",
    program: "https://sale.aliexpress.com/",
    ios: "https://apps.apple.com/us/app/aliexpress/id436672029",
    android: "https://play.google.com/store/apps/details?id=com.alibaba.aliexpresshd",
    focus:
      "global marketplace search, seller disclosure, product variants, coupons, cart/checkout, cross-border shipping estimates, order tracking, buyer protection, returns/refunds, taxes/duties blockers, and support",
    vertical: "marketplace",
  },
  {
    id: 465,
    file: "465-wish.md",
    name: "Wish",
    category: "discount shopping marketplace, personalized feed, merchant catalog, deals, cart, checkout, shipping, returns/refunds, reviews, and support",
    product: "https://www.wish.com/",
    support: "https://cs-help.wish.com/",
    privacy: "https://www.wish.com/privacy_policy",
    terms: "https://www.wish.com/terms",
    program: "https://merchant.wish.com/",
    ios: "https://apps.apple.com/us/app/wish-shop-and-save/id530621395",
    android: "https://play.google.com/store/apps/details?id=com.contextlogic.wish",
    focus:
      "discount marketplace feed, product discovery, merchant offers, coupons/deals, cart/checkout, shipping estimates, order tracking, returns/refunds, reviews, seller disclosure, and support",
    vertical: "marketplace",
  },
  {
    id: 466,
    file: "466-lazada.md",
    name: "Lazada",
    category: "Southeast Asia shopping marketplace, mall and seller catalog, vouchers, wallet/payment, cart, checkout, logistics, returns/refunds, and support",
    product: "https://www.lazada.com/",
    support: "https://www.lazada.com/helpcenter/",
    privacy: "https://www.lazada.com/privacy-policy/",
    terms: "https://www.lazada.com/terms-of-use/",
    program: "https://www.lazada.com/sell-on-lazada/",
    ios: "https://apps.apple.com/us/app/lazada-6-6-sale/id785385147",
    android: "https://play.google.com/store/apps/details?id=com.lazada.android",
    focus:
      "regional marketplace discovery, mall/seller storefronts, vouchers, coins/rewards, wallet/payment handoffs, cart/checkout, logistics tracking, returns/refunds, seller operations, and region availability",
    vertical: "marketplace",
  },
  {
    id: 467,
    file: "467-shopee.md",
    name: "Shopee",
    category: "Southeast Asia and Latin America shopping marketplace, seller catalog, vouchers, coins, wallet/payment, cart, logistics, returns/refunds, livestream/games, and support",
    product: "https://shopee.com/",
    support: "https://help.shopee.com/",
    privacy: "https://shopee.com/docs/3000",
    terms: "https://shopee.com/docs/3001",
    program: "https://seller.shopee.com/",
    ios: "https://apps.apple.com/us/app/shopee-6-6-sale/id959841449",
    android: "https://play.google.com/store/apps/details?id=com.shopee.app",
    focus:
      "marketplace search, seller shops, vouchers, coins/rewards, wallet/payment handoffs, cart/checkout, logistics tracking, livestream/game blockers, returns/refunds, seller support, and regional policy variation",
    vertical: "marketplace",
  },
  {
    id: 468,
    file: "468-flipkart.md",
    name: "Flipkart",
    category: "India shopping marketplace, product catalog, seller offers, cart, checkout, payments, delivery tracking, returns/refunds, rewards, and support",
    product: "https://www.flipkart.com/",
    support: "https://www.flipkart.com/helpcentre",
    privacy: "https://www.flipkart.com/pages/privacypolicy",
    terms: "https://www.flipkart.com/pages/terms",
    program: "https://seller.flipkart.com/",
    ios: "https://apps.apple.com/us/app/flipkart-online-shopping-app/id742044692",
    android: "https://play.google.com/store/apps/details?id=com.flipkart.android",
    focus:
      "India marketplace discovery, product variants, seller offers, SuperCoins-style rewards, cart/checkout, payment instruments, delivery tracking, exchange/returns/refunds, seller support, and regional availability",
    vertical: "marketplace",
  },
  {
    id: 469,
    file: "469-myntra.md",
    name: "Myntra",
    category: "fashion shopping marketplace, style discovery, product variants, wishlist, cart, checkout, delivery tracking, returns/exchanges, rewards, and support",
    product: "https://www.myntra.com/",
    support: "https://www.myntra.com/contactus",
    privacy: "https://www.myntra.com/privacypolicy",
    terms: "https://www.myntra.com/termsofuse",
    program: "https://www.myntra.com/myntrainsider",
    ios: "https://apps.apple.com/us/app/myntra-fashion-shopping-app/id907394059",
    android: "https://play.google.com/store/apps/details?id=com.myntra.android",
    focus:
      "fashion discovery, personalized collections, product size/color variants, wishlist, cart/checkout, payment instruments, delivery tracking, returns/exchanges, loyalty/rewards, and support",
    vertical: "fashion",
  },
  {
    id: 470,
    file: "470-rakuten.md",
    name: "Rakuten",
    category: "cash-back shopping and marketplace app, store discovery, offers, rewards, browser/app tracking handoffs, wallet/payment, payout, support, and privacy controls",
    product: "https://www.rakuten.com/",
    support: "https://www.rakuten.com/help",
    privacy: "https://www.rakuten.com/help/article/privacy-policy-360002101688",
    terms: "https://www.rakuten.com/help/article/terms-conditions-360002101348",
    program: "https://www.rakuten.com/referral/default.do",
    ios: "https://apps.apple.com/us/app/rakuten-cash-back-deals/id723134859",
    android: "https://play.google.com/store/apps/details?id=com.ebates",
    focus:
      "cash-back store discovery, offer activation, shopping handoff attribution, rewards balance, payout methods, referral/member states, missing-cashback support, ad-tech disclosure, and privacy controls",
    vertical: "cashback",
  },
  {
    id: 471,
    file: "471-newegg.md",
    name: "Newegg",
    category: "electronics and computer retail marketplace, product discovery, seller offers, specs, cart, checkout, order tracking, returns/RMA, reviews, and support",
    product: "https://www.newegg.com/",
    support: "https://kb.newegg.com/",
    privacy: "https://kb.newegg.com/knowledge-base/privacy-policy-newegg/",
    terms: "https://kb.newegg.com/knowledge-base/policy-agreement/",
    program: "https://www.newegg.com/sellers/",
    ios: "https://apps.apple.com/us/app/newegg-tech-shopping-online/id339059834",
    android: "https://play.google.com/store/apps/details?id=com.newegg.app",
    focus:
      "electronics search, technical specifications, marketplace seller offers, stock/price freshness, cart/checkout, order tracking, warranties, returns/RMA, reviews, seller disclosure, and support",
    vertical: "electronics",
  },
  {
    id: 472,
    file: "472-chase-mobile.md",
    name: "Chase Mobile",
    category: "banking and card servicing app, secure sign-in, account dashboard, deposits, transfers, bill pay, card controls, credit score, alerts, statements, investments, and support",
    product: "https://www.chase.com/digital/mobile-banking",
    support: "https://www.chase.com/digital/customer-service",
    privacy: "https://www.chase.com/digital/resources/privacy-security",
    terms: "https://www.chase.com/digital/resources/terms-of-use",
    program: "https://www.chase.com/digital/resources",
    ios: "https://apps.apple.com/us/app/chase-mobile-bank-invest/id298867247",
    android: "https://play.google.com/store/apps/details?id=com.chase.sig.android",
    focus:
      "secure banking sign-in, accounts dashboard, transaction details, mobile deposit, transfers, bill pay, card controls, alerts, statements, credit score, investing handoffs, fraud support, and compliance blockers",
    vertical: "banking",
  },
  {
    id: 473,
    file: "473-bank-of-america-mobile-banking.md",
    name: "Bank of America Mobile Banking",
    category: "banking and card servicing app, secure sign-in, accounts, transfers, bill pay, mobile deposit, card controls, alerts, budgeting, rewards, and support",
    product: "https://www.bankofamerica.com/online-banking/mobile-and-online-banking-features/overview/",
    support: "https://www.bankofamerica.com/customer-service/",
    privacy: "https://www.bankofamerica.com/security-center/privacy-overview/",
    terms: "https://www.bankofamerica.com/online-banking/service-agreement.go",
    program: "https://promotions.bankofamerica.com/preferredrewards/en",
    ios: "https://apps.apple.com/us/app/bank-of-america-mobile-banking/id284847138",
    android: "https://play.google.com/store/apps/details?id=com.infonow.bofa",
    focus:
      "secure banking sign-in, account dashboard, Zelle/transfer and bill-pay simulation, mobile deposit blockers, card controls, alerts, spending insights, Preferred Rewards-style states, support, and fraud controls",
    vertical: "banking",
  },
  {
    id: 474,
    file: "474-wells-fargo-mobile.md",
    name: "Wells Fargo Mobile",
    category: "banking and card servicing app, secure sign-in, accounts, transfers, bill pay, deposits, card controls, alerts, credit monitoring, statements, and support",
    product: "https://www.wellsfargo.com/online-banking/mobile/",
    support: "https://www.wellsfargo.com/help/",
    privacy: "https://www.wellsfargo.com/privacy-security/",
    terms: "https://www.wellsfargo.com/online-banking/online-access-agreement/",
    program: "https://www.wellsfargo.com/rewards/",
    ios: "https://apps.apple.com/us/app/wells-fargo-mobile/id311548709",
    android: "https://play.google.com/store/apps/details?id=com.wf.wellsfargomobile",
    focus:
      "secure sign-in, accounts dashboard, transfer/bill-pay simulation, mobile deposit blockers, card controls, alerts, credit monitoring, rewards/card states, statements, fraud support, and compliance blockers",
    vertical: "banking",
  },
  {
    id: 475,
    file: "475-citi-mobile.md",
    name: "Citi Mobile",
    category: "banking and card servicing app, secure sign-in, accounts/cards, payments, transfers, rewards, alerts, credit score, dispute/fraud support, and statements",
    product: "https://www.citi.com/online-banking/mobile-banking",
    support: "https://www.citi.com/customer-service",
    privacy: "https://online.citi.com/US/ag/privacy",
    terms: "https://online.citi.com/US/ag/terms",
    program: "https://www.citi.com/credit-cards/citi-thankyou-rewards",
    ios: "https://apps.apple.com/us/app/citi-mobile/id301724680",
    android: "https://play.google.com/store/apps/details?id=com.citi.citimobile",
    focus:
      "secure sign-in, accounts/cards dashboard, payments, transfers, rewards states, credit score, alerts, statements, card lock, dispute/fraud support, and regulated servicing blockers",
    vertical: "banking",
  },
  {
    id: 476,
    file: "476-capital-one-mobile.md",
    name: "Capital One Mobile",
    category: "banking and card servicing app, secure sign-in, accounts/cards, payments, transfers, mobile deposit, credit score, card controls, rewards, alerts, and support",
    product: "https://www.capitalone.com/digital/mobile-apps/",
    support: "https://www.capitalone.com/help-center/",
    privacy: "https://www.capitalone.com/privacy/",
    terms: "https://www.capitalone.com/terms-of-use/",
    program: "https://www.capitalone.com/credit-cards/rewards/",
    ios: "https://apps.apple.com/us/app/capital-one-mobile/id407558537",
    android: "https://play.google.com/store/apps/details?id=com.konylabs.capitalone",
    focus:
      "secure sign-in, account/card dashboard, payments, transfers, mobile deposit blockers, credit score, card lock and controls, rewards, alerts, fraud/support, and compliance blockers",
    vertical: "banking",
  },
  {
    id: 477,
    file: "477-american-express.md",
    name: "American Express",
    category: "card account servicing app, secure sign-in, card dashboard, payments, offers, rewards, statements, disputes, travel/benefit surfaces, alerts, and support",
    product: "https://www.americanexpress.com/us/customer-service/digital/american-express-app/",
    support: "https://www.americanexpress.com/us/customer-service/",
    privacy: "https://www.americanexpress.com/us/privacy-center/",
    terms: "https://www.americanexpress.com/us/legal-disclosures/website-rules-and-regulations/",
    program: "https://www.americanexpress.com/us/rewards/membership-rewards/",
    ios: "https://apps.apple.com/us/app/amex/id362348516",
    android: "https://play.google.com/store/apps/details?id=com.americanexpress.android.acctsvcs.us",
    focus:
      "secure card servicing, account dashboard, payments, transactions, offers, Membership Rewards-style states, statements, card benefits, disputes, fraud alerts, support, and regulated servicing blockers",
    vertical: "banking",
  },
  {
    id: 478,
    file: "478-discover-mobile.md",
    name: "Discover Mobile",
    category: "banking and card servicing app, secure sign-in, cards/deposit accounts, payments, rewards, FICO score, alerts, card controls, statements, and support",
    product: "https://www.discover.com/credit-cards/member-benefits/mobile/",
    support: "https://www.discover.com/customer-service/",
    privacy: "https://www.discover.com/privacy-statement/",
    terms: "https://www.discover.com/terms-of-use/",
    program: "https://www.discover.com/credit-cards/rewards/",
    ios: "https://apps.apple.com/us/app/discover-mobile/id338010821",
    android: "https://play.google.com/store/apps/details?id=com.discoverfinancial.mobile",
    focus:
      "secure card/banking sign-in, account dashboard, payments, rewards/cashback states, FICO score, alerts, card controls, statements, disputes, fraud support, and compliance blockers",
    vertical: "banking",
  },
  {
    id: 479,
    file: "479-u-s-bank.md",
    name: "U.S. Bank",
    category: "banking and card servicing app, secure sign-in, accounts, transfers, bill pay, mobile deposit, card controls, rewards, alerts, statements, and support",
    product: "https://www.usbank.com/online-mobile-banking/mobile-banking.html",
    support: "https://www.usbank.com/customer-service.html",
    privacy: "https://www.usbank.com/privacy.html",
    terms: "https://www.usbank.com/about-us-bank/terms-and-conditions.html",
    program: "https://www.usbank.com/credit-cards/rewards.html",
    ios: "https://apps.apple.com/us/app/u-s-bank-mobile-banking/id458734623",
    android: "https://play.google.com/store/apps/details?id=com.usbank.mobilebanking",
    focus:
      "secure sign-in, account dashboard, transfers, bill pay, mobile deposit blockers, card controls, rewards states, alerts, statements, support, fraud controls, and compliance blockers",
    vertical: "banking",
  },
  {
    id: 480,
    file: "480-pnc-mobile.md",
    name: "PNC Mobile",
    category: "banking and card servicing app, secure sign-in, accounts, transfers, bill pay, mobile deposit, card controls, alerts, statements, money management, and support",
    product: "https://www.pnc.com/en/personal-banking/banking/online-and-mobile-banking/mobile-banking.html",
    support: "https://www.pnc.com/en/customer-service.html",
    privacy: "https://www.pnc.com/en/privacy-policy.html",
    terms: "https://www.pnc.com/en/terms-and-conditions.html",
    program: "https://www.pnc.com/en/personal-banking/banking/services/pnc-purchase-payback.html",
    ios: "https://apps.apple.com/us/app/pnc-mobile-banking/id303113127",
    android: "https://play.google.com/store/apps/details?id=com.pnc.ecommerce.mobile",
    focus:
      "secure sign-in, account dashboard, transfers, bill pay, mobile deposit blockers, card controls, alerts, statements, money-management surfaces, purchase-payback/rewards states, support, and compliance blockers",
    vertical: "banking",
  },
];

function h1(name) {
  return `# ${name}-Style Clone Spec`;
}

function researchSources(app) {
  return `## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | ${app.product} | Public product positioning, shopping, delivery, catalog, marketplace, membership, account, and app behavior | Verified ${verifiedDate} |
| Support/help center | ${app.support} | Public support taxonomy for account, ordering, payment, pickup, shipping, returns, seller, loyalty, troubleshooting, and deletion/export flows | Verified ${verifiedDate} |
| Privacy policy | ${app.privacy} | Account, profile, order, listing, location, device, advertising, analytics, support, seller, and user-rights handling | Verified ${verifiedDate} |
| Terms of service | ${app.terms} | Service usage, licensed content, payments, returns, marketplace conduct, seller/buyer limits, prohibited goods, and legal boundaries | Verified ${verifiedDate} |
| Rewards, membership, or seller program | ${app.program} | Reward, membership, loyalty, seller, service, authenticity, or entitlement orientation where public | Verified ${verifiedDate} |
| App Store listing | ${app.ios} | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified ${verifiedDate} |
| Google Play listing | ${app.android} | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified ${verifiedDate} |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, payment, push payloads, background location, provider integrations, regional availability, catalog/inventory, seller eligibility, payout, return, refund, and support behavior | Blocked pending lawful device/store verification |`;
}

function screenRows(app) {
  const names =
    app.vertical === "banking"
      ? [
          "Welcome / Auth / Consent",
          "Identity / Security",
          "Account Dashboard",
          "Account / Card Detail",
          "Transaction Detail",
          "Transfer / Payment / Deposit",
          "Card Controls / Alerts",
          "Statements / Documents",
          "Rewards / Offers / Credit Score",
          "Dispute / Fraud Support",
          "Notifications / Messages",
          "Settings / Privacy",
          "Data Export / Delete",
          "Support / Recovery",
        ]
      : [
          "Welcome / Auth / Consent",
          "Home / Discovery",
          "Region / Store / Address Selector",
          "Search / Browse / Category",
          "Product / Menu / Listing Detail",
          "Variant / Modifier / Availability",
          "Cart / Bag / Offer Builder",
          "Checkout / Payment / Payout",
          "Order / Shipment / Delivery Status",
          "Rewards / Membership / Seller Hub",
          "Store / Pickup / Courier / Shipping Handoff",
          "Notifications / Messages",
          "Settings / Privacy",
          "Support / Returns / Disputes",
        ];
  return names
    .map(
      (screen) =>
        `| ${screen} | Defines the ${screen.toLowerCase()} workflow for ${app.name}-inspired behavior | taps, forms, search, filters, scan, image, deep links, location, payment, seller/buyer/customer selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store closed, item unavailable, seller ineligible, payment/payout failed, return blocked |`,
    )
    .join("\n");
}

function spec(app) {
  const resale = app.vertical === "resale";
  const delivery = app.vertical === "delivery";
  const beauty = app.vertical === "beauty";
  const banking = app.vertical === "banking";
  const classifieds = app.vertical === "classifieds";
  const cashback = app.vertical === "cashback";
  const home = app.vertical === "home improvement" || app.vertical === "furniture";
  const domain = resale
    ? "buyer, seller, listing, authenticity, payment, payout, shipping, returns, disputes, moderation, advertising, and marketplace data"
    : delivery
      ? "restaurant, merchant, catalog/menu, courier, basket, payment, location, loyalty, promotion, analytics, support, advertising, and delivery marketplace data"
      : banking
        ? "customer, identity, account, balance, transaction, card, payment, transfer, deposit, alert, statement, reward, dispute, fraud, support, compliance, and banking-provider data"
        : classifieds
          ? "buyer, seller, poster, listing, city, category, reply, saved search, alert, map, moderation, safety, fee, housing, jobs, services, and classifieds data"
          : cashback
            ? "member, store, offer, click attribution, shopping trip, cash-back ledger, payout, referral, support, advertising, and privacy-preference data"
            : "customer, account, store, product catalog, inventory, pricing, offer, payment, fulfillment, return, loyalty, service, advertising, and retail data";
  const risk = resale
    ? "counterfeit/authenticity review, prohibited goods, seller fraud, buyer fraud, chargebacks, payout holds, tax reporting, listing moderation, harassment in messaging, shipping disputes, and return abuse"
    : delivery
      ? "merchant/menu/price/fee freshness, delivery ETA accuracy, courier location privacy, age/pharmacy-adjacent gates, refund/credit handling, loyalty eligibility, payment/tip handling, and support escalation"
      : banking
        ? "KYC/AML, financial licensing, money movement, account takeover, card fraud, credential safety, payment disputes, credit-score disclosures, rewards correctness, statement retention, GLBA-style privacy, and regulator-facing auditability"
        : classifieds
          ? "scams, housing/job discrimination, prohibited listings, adult or unsafe content, user harassment, location privacy, reply anonymization, posting fees, moderation accuracy, and law-enforcement or legal request handling"
          : cashback
            ? "cash-back attribution, ad-tech disclosure, missing-trip disputes, payout timing, referral abuse, store offer accuracy, browser/app handoff tracking, privacy preferences, and rewards liability"
            : home
              ? "inventory/price freshness, store locator accuracy, delivery/install/rental service eligibility, hazardous materials, oversized delivery, assembly/provider handoffs, product safety, warranty handling, and return abuse"
              : beauty
                ? "shade/skin preference privacy, virtual try-on camera use, ingredient/allergen disclosures, claims substantiation, samples/offers, service booking, returns, review abuse, and ad-tech targeting"
                : "inventory/price freshness, product sizing, launch/drop fairness, membership eligibility, coupon/loyalty correctness, store pickup, shipping, returns, review abuse, sustainability/claim substantiation, and support escalation";
  const dataEntities = resale
    ? [
        "User",
        "AccountSession",
        "BuyerProfile",
        "SellerProfile",
        "Listing",
        "CatalogTaxonomy",
        "ListingMedia",
        "SavedSearch",
        "Offer",
        "MessageThread",
        "PaymentIntent",
        "PayoutInstrument",
        "Shipment",
        "AuthenticityReview",
        "ReturnCase",
        "DisputeCase",
        "ModerationCase",
        "AuditEvent",
        "LocalCacheRecord",
      ]
    : delivery
      ? [
          "User",
          "AccountSession",
          "Address",
          "Merchant",
          "MerchantCatalog",
          "MenuItem",
          "ModifierGroup",
          "Cart",
          "Promotion",
          "LoyaltyAccount",
          "PaymentInstrument",
          "Order",
          "CourierAssignment",
          "DeliveryStatus",
          "SupportCase",
          "RefundCase",
          "AgeGateReview",
          "AuditEvent",
          "LocalCacheRecord",
        ]
      : banking
        ? [
            "User",
            "AccountSession",
            "IdentityCheck",
            "BankAccount",
            "CardAccount",
            "BalanceSnapshot",
            "Transaction",
            "Transfer",
            "BillPayment",
            "MobileDeposit",
            "CardControl",
            "AlertPreference",
            "Statement",
            "RewardAccount",
            "DisputeCase",
            "FraudCase",
            "SupportCase",
            "AuditEvent",
            "LocalCacheRecord",
          ]
        : classifieds
          ? [
              "User",
              "AccountSession",
              "City",
              "Category",
              "Listing",
              "ListingMedia",
              "ReplyAlias",
              "SavedSearch",
              "SearchAlert",
              "MapLocation",
              "PostingFee",
              "ModerationCase",
              "SafetyReport",
              "SupportCase",
              "AuditEvent",
              "LocalCacheRecord",
            ]
          : cashback
            ? [
                "User",
                "AccountSession",
                "Store",
                "Offer",
                "ShoppingTrip",
                "AttributionEvent",
                "CashbackLedgerEntry",
                "PayoutInstrument",
                "Referral",
                "MissingCashbackCase",
                "PrivacyPreference",
                "SupportCase",
                "AuditEvent",
                "LocalCacheRecord",
              ]
            : [
          "User",
          "AccountSession",
          "Store",
          "Address",
          "Product",
          "ProductVariant",
          "InventorySnapshot",
          "PriceOffer",
          "LoyaltyAccount",
          "Wishlist",
          "Cart",
          "PaymentInstrument",
          "Order",
          "Fulfillment",
          "ReturnCase",
          "Review",
          "ServiceAppointment",
          "AuditEvent",
          "LocalCacheRecord",
        ];

  return `${h1(app.name)}

> Metadata
> - Inspiration app: ${app.name}
> - Category: ${app.category}
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${verifiedDate}.
> - Verification basis: exact public first-party product, support/help, privacy, terms, reward/membership/seller-program, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, seller/worker eligibility where relevant, payment/purchase/payout state, permission prompts, push notifications, provider integrations, store/merchant/courier/seller availability, catalog/menu/product inventory, pricing/tax/fee correctness, reward/membership/offer redemption, return/refund/order/support behavior, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary catalog/menu/product data, maps, media, private APIs, recommendation models, customer/seller/courier data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile product inspired by ${app.name}'s public product and policy materials. V1 focuses on ${app.focus}. The clone must use original branding, original UI copy, original sample data, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked \`Manual verification required\` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support ${app.focus} with clear retry, recovery, unavailable, region, entitlement, inventory, seller, and provider-aware states.
- Preserve boundaries between ${domain}.
- Implement guest, member, free, paid, expired, restored, refunded, seller-ineligible, store-owned, web-owned, provider-owned, region-blocked, and unavailable states without copying exact pricing, plan names, promotions, reward terms, seller terms, or worker policies.
- Include export/delete, support/report flows, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog/menu/product, location, payment/payout, device/permission, seller/safety, advertising, claim-substantiation, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with ${app.name} or its publisher.
- Do not copy proprietary feeds, menus, product catalogs, prices, promotions, media, artwork, recommendation models, screenshots, icons, brand names, seller policies, worker policies, or private API shapes.
- Do not send production user order, payment, payout, precise-location, loyalty, support, seller, delivery, scan, image, or try-on telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present nutrition, allergen, price, delivery-time, reward, membership, earnings, authenticity, warranty, fit, sizing, product safety, inventory, or availability output as professional, medical, legal, financial, employment, tax, or safety-critical advice.
- Do not enable autonomous purchases, account changes, seller-status changes, public listing changes, regulated workflows, age-restricted purchases, delivery dispatch, payout changes, returns, or irreversible external actions without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

${researchSources(app)}

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest or signed-out preview where allowed, account creation or restore, seller onboarding where relevant, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful order, listing, shopping, reward, membership, seller, store/merchant, and support state with signed-out, loading, empty, degraded-network, and stale-data variants.
- Store, merchant, address, seller zone, or location selection must distinguish GPS, manual search, saved/favorite locations, current hours, services, pickup/delivery/shipping/worker availability where relevant, and unavailable-region states.
- Catalog, menu, product, listing, service, batch, or offer browse must support categories, search, filters, availability, price/fee freshness, promotion labels, seller/route previews where relevant, safety notes, and original sample data.
- Detail screens must show availability, provider timestamp, rights state, seller/merchant disclosure, safety labels where relevant, save/favorite/share actions, and manual-verification warnings for native-only behavior.
- Cart, basket, offer, wallet, checkout, reward, order, pickup, delivery, courier, shipment, seller task, return, payout, or support jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Payment, payout, stored-value, earnings, reward, refund, and seller surfaces must be server-owned and tokenized; client-only state must never decide funds, rewards, credits, refunds, tips, memberships, payouts, listings, offers, or order dispatch.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, payment/payout or membership management, connected-provider controls, seller controls where relevant, and responsible-use controls.
- Entitlements must model guest, member, free, paid, expired, canceled, refunded, restored, seller-ineligible, store-owned, web-owned, provider-owned, quota-exhausted, region-blocked, and unavailable states.
- Analytics must avoid raw orders, payment credentials, payout credentials, exact arrival paths, loyalty identifiers, seller identifiers, support attachments, scan payloads, try-on media, and unredacted account identifiers.
- Provider calls require scoped credentials, redacted logs, request/response retention limits, per-provider data-processing notes, retry policies, and user-visible recovery.
- Manual verification required: native permission prompts, marketplace privacy labels, payment/payout, push payloads, background location, provider integrations, regional availability, and store/merchant/courier/seller/return/refund behavior.
- ${app.focus} must be treated as launch-blocking behavior with owners, mitigations, acceptance tests, and manual-verification notes.
- ${risk} must be treated as a launch-blocking risk area with owner, mitigation, and acceptance tests.
- Location privacy, local offers, ad-tech, personalization, fraud prevention, seller safety, product-safety claims, and support escalation must be treated as launch-blocking risk areas with explicit data minimization and user-visible recovery.

## Core User Journeys

- New user reviews consent, signs in or continues as guest where allowed, selects a store, merchant, address, region, or fulfillment context, and reaches the main catalog, ordering, selling, or shopping surface.
- Returning user reorders, rebuilds, relists, repeats, accepts, or resumes a favorite workflow, applies a qualifying reward, coupon, membership, earning, or offer, and checks out or completes the task.
- User switches pickup, curbside, delivery, shipping, in-store, seller, worker-zone, or courier mode where available and sees location-specific availability.
- User pays or receives payout with card, wallet, gift card, stored value, reward, membership benefit, split tender, tip, cashout, or provider-backed instrument where supported and handles authorization failure.
- User tracks order, pickup, delivery, courier, task, route, payout, shipment, return, or support status without exposing precise location unnecessarily.
- User sees item unavailable, merchant/store closed, catalog changed, fee changed, coupon invalid, variant sold out, subscription blocked, seller ineligible, route unsafe, authenticity review held, or promotion expired and can recover before consequential action.
- User requests support, refund, order correction, return, authenticity review, listing review, privacy export, or account deletion and receives durable case state.
- Manual verification required: background behavior, push payloads, OS permission prompts, marketplace labels, provider integrations, purchases/payments/payouts, seller eligibility, and regional availability.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
${screenRows(app)}

## Data Model

${dataEntities
  .map(
    (entity) =>
      `- \`${entity}\`: owner, lifecycle state, authorization boundary, sync state, retention policy, deletion/export behavior, and audit metadata for ${app.name}-inspired workflows.`,
  )
  .join("\n")}

## API And Backend Contracts

- POST /auth/session, POST /auth/recover, DELETE /auth/session, and DELETE /account for account lifecycle.
- GET /regions, GET /locations, GET /locations/:id, GET /stores, GET /merchants, GET /catalogs/:locationId, GET /products/:id, GET /listings/:id, and GET /offers.
- POST /carts, PATCH /carts/:id, POST /carts/:id/items, PATCH /carts/:id/items/:itemId, and DELETE /carts/:id/items/:itemId.
- POST /checkout/quote, POST /orders, GET /orders/:id, POST /orders/:id/cancel, GET /orders/:id/status, POST /returns, and GET /returns/:id.
- GET /rewards, POST /rewards/enroll, POST /rewards/redeem, GET /memberships, GET /payment-instruments, and GET /payout-instruments where seller flows exist.
- GET /inventory, GET /variants, GET /fulfillment-windows, GET /seller/listings, POST /seller/listings, PATCH /seller/listings/:id, POST /offers/:id/accept, and POST /arrival-checkins where fulfillment requires store, merchant, seller, or courier handoff.
- POST /support/cases, GET /support/cases/:id, POST /refund-requests, POST /disputes, POST /incident-reports, POST /data-export, and DELETE /account.
- \`GET /privacy/settings\`, \`PATCH /privacy/settings\`, \`POST /data-export\`, and \`GET /data-export/:id\` for privacy lifecycle.
- \`GET /support/articles\`, \`POST /support/cases\`, \`GET /support/cases/:id\`, \`POST /reports\`, and \`GET /reports/:id\` for support, abuse, safety, counterfeit, prohibited-goods, and rights workflows.
- Provider webhook contracts must include idempotency keys, redacted payload logging, retry semantics, and canonical refetch after missed order, payment, payout, inventory, membership, seller, shipment, return, or delivery events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, refund/credit review, fraud hold review, payment dispute handling, authenticity review, seller incident/deactivation review, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, or proprietary provider schemas from ${app.name}.

## Realtime, Push, And Offline Behavior

- Recent home, catalog/menu/product, listing, settings, entitlement, earnings, and in-progress state cache locally with explicit size, retention, and purge rules.
- Long-running jobs use polling, SSE, websocket, or provider webhook fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and low-risk local drafts where allowed but blocks provider calls, billing/payment/payout changes, public publication, rights-affecting writes, profile-owner changes, age-restricted purchases, delivery dispatch, seller task acceptance, return submission, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether coupons, promotions, rewards, memberships, orders, tips, payments, payouts, seller offers, returns, or listing changes were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription/payment/payout, support, order/shipment/task status, rewards/offers, store/merchant arrival, delivery handoff, seller safety, listing moderation, and return/dispute states.
- Background tracking, location checks, local-network/device behavior, payment authorization, payout/cashout, loyalty redemption, store check-in, courier tracking, seller route state, scan/search, virtual try-on, AR/3D preview, and cloud sync behavior are \`Manual verification required\` and must stay disabled until platform-specific evidence exists.
- Cached uploads, product/listing media, activity/order/task history, payment/payout references, device metadata, location history, support attachments, catalog/menu refs, and seller records purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, precise location, approximate location, camera, media library, files, clipboard, contacts/share sheet, local network, Bluetooth, motion, background location, AR/3D sensors, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw order histories, payment credentials, payout credentials, exact arrival trails, loyalty tokens, seller identifiers, support attachments, scan images, try-on media, or private messages in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, support attachments, listing photos, delivery issue photos, identity documents, scan images, AR captures, and order issue photos must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, and private tags before export/share.
- Menu, order, payment, payout, reward, delivery, offer, membership, seller, nutrition, allergen, ingredient, product-safety, warranty, age-restricted, and resale-authenticity features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe behavior, fraud, and misleading attribution.
- Recommended, ad-targeted, factual, price, nutrition, allergen, location, authenticity, warranty, fit, sizing, ETA, or availability output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, store-limited, merchant-limited, seller-limited, or unavailable before consequential use.
- Catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, embargo, region, store, merchant, seller, warranty, product-safety, and availability restrictions in metadata.
- Support access to uploads, activity/order/listing/task history, profile data, diagnostics, account data, and seller data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, activity/order/listing/task history, generated outputs, reports, support cases, device associations, payment/payout tokens, rewards references, membership references, return/dispute records, and billing references where legally deletable.
- Fraud, account takeover, payment abuse, coupon/reward abuse, refund abuse, return abuse, courier/merchant/seller disputes, worker safety, counterfeit goods, prohibited goods, alcohol/age-gated goods where relevant, and unsafe delivery instructions require explicit review queues before production launch.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, product/listing opened, cart/list updated, quote viewed, order submitted/failed, offer viewed/accepted, favorite saved, report submitted, export/delete requested, payment/payout viewed, and notification preference changed.
- Event properties must use coarse category, provider capability class, latency buckets, error codes, duration buckets, ad state, entitlement/payment/payout state, and region/store/merchant/seller class only.
- Monetization may include subscriptions, memberships, service fees, convenience fees, delivery fees, rewards, stored value, gift cards, sponsored placement, retail media, marketplace commissions, tips, seller fees, payment processing, payouts, or premium fulfillment only after legal, tax, consumer-protection, labor, and disclosure review.
- Billing/payment/payout must handle app-store, web, in-store, wallet, gift-card, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, quota-exhausted, payment-failed, payout-failed, tax-hold, and region-blocked states.
- Paywalls and payment gates must not block safety reporting, account recovery, export/delete, privacy settings, returns/disputes, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/provider, unsupported store/merchant/device/seller status, or blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed catalog, route, menu item, product variant, listing, promotion, reward, price, store, merchant, provider, courier, seller offer, return, or order becomes unavailable, renamed, corrected, expired, geo-blocked, or takedown-blocked.
- Background tracking, order/task/shipment status, payment authorization, payout, feed refresh, score/order alert, courier tracking, scan/search, AR/3D preview, try-on render, or offline license refresh is interrupted by app termination.
- Subscription, membership, reward, coupon, stored value, payout, seller status, tip, return window, warranty status, or offer renews, refunds, expires, switches owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, return disputes, seller disputes, ad records, or provider logs remain active.
- Uploaded, indexed, listed, or saved data contains child data, private conversations, health data, financial data, identity documents, copyrighted material, counterfeit goods, recalled products, hazardous materials, or third-party confidential content.
- Provider/CDN/feed/device/store/merchant/payment/payout outage occurs after the user starts an action but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, copyright infringement, unsafe behavior, fraud, promotion abuse, refund abuse, return abuse, courier harassment, seller harassment, counterfeit sales, prohibited goods, or unsafe public sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, sensor/order/listing/task data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, provider, bundle, territory, regulator, store, merchant, franchise, membership, seller, warranty, authenticity, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement/payment/payout checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for catalog/menu/product validation, listing rules, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for profile, favorite, history, active job, provider-auth, retry gates, destructive confirmations, seller states, product-safety states, and license/availability propagation.
- Contract tests for auth, home, catalog/menu/products/listings, jobs, billing/payment/payout, privacy, support, reports, and provider routes where scoped.
- Integration tests for onboarding -> discover/shop/sell -> detail -> order/listing/task -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, provider timeouts, seller ineligibility, and availability failures.
- Offline tests for cached reads, allowed local drafts, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for reports, explicit-content gates, child/profile controls, fraud, impersonation, ad disclosures, delayed/provider data, responsible-use controls, seller safety, counterfeit/prohibited goods, unsafe behavior, and privacy redaction.
- Billing/payment/payout tests for trial, purchase, restore, renewal, refund, expiration, gift card, stored value, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, web-owned, tax-hold, cashout, and payout-failed states.
- Privacy/security tests for provider request redaction, support access consent, metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts where applicable, controls, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, purchase/payment/payout, push notifications, provider integrations, background behavior, seller eligibility, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/terms/marketplace URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed catalog/data.
- Onboarding, home, discover/shop/sell, detail, active-use/order/shipment/listing/task, notifications, export/share, settings, support, safety report, export/delete, and entitlement/payment/payout screens are specified.
- Account, profile, provider, billing/payment/payout, support, analytics, seller, order/location/loyalty/store/merchant/courier/product data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing/payment/payout, publication, rights, profile-owner, age-restricted, delivery-dispatch, seller-task, return/dispute, or irreversible operations while offline.
- Safety tests cover reports, explicit content, non-consensual uploads, impersonation, ad disclosures, provider delays, responsible-use controls, seller safety, counterfeit/prohibited goods, unsafe behavior, fraud, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions/payments/payouts, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, seller eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active job failure, quota exhaustion, seller ineligibility, offline recovery, export/delete, billing/payment/payout restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog data, maps/location, media, notifications, billing/payment/payout, analytics, support, recommendations, ads, courier tracking, seller eligibility, authenticity review, scan/search, AR/3D, try-on, or device integrations in the original implementation?
- Which uploads, drafts, histories, diagnostics, seller records, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, labor compliance, or legal obligations?
- Which regions, ages, stores, merchants, providers, devices, profiles, seller statuses, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, nutrition/allergen, ingredient, product-safety, warranty, authenticity, ad-tech, location, payment, payout, refund, courier, seller, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, special hardware, background permissions, platform integrations, geolocation, payment methods, payout instruments, identity documents, real orders, age verification, courier handoff, seller handoff, return shipment, authenticity review, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, payment/payout/location model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery/shop/sell, detail, active-use/order/shipment/listing/task, settings, support, and entitlement/payment/payout shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, fraud controls, seller controls, product-safety controls, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing/payment/payout, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, background behavior, and seller/location behavior where relevant.
- Verify account, payment, payout, reward/membership, seller eligibility, store/merchant availability, order, substitution, delivery, shipment, refund, return, authenticity, and support states with test accounts where allowed.
- Extend the Phase 5 implementation-plan queue after this ID is included in the readiness batch.
- Keep downstream scaffold repos private and label this source spec as implementation-ready only for original public-source V1 work.
`;
}

for (const app of apps) {
  writeFileSync(join(process.cwd(), "specs", "batch-24", app.file), spec(app));
}

console.log(`Promoted ${apps.length} specs in specs/batch-24.`);
