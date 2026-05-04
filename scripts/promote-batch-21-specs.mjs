#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const verifiedDate = "2026-05-04";

const apps = [
  {
    id: 401,
    file: "401-publix.md",
    name: "Publix",
    category: "grocery deals, Club Publix, digital coupons, prepared-food ordering, shopping lists, pickup/delivery, and in-store checkout",
    product: "https://www.publix.com/",
    support: "https://www.publix.com/contact",
    privacy: "https://www.publix.com/privacy-policy",
    terms: "https://www.publix.com/terms-of-use",
    rewards: "https://www.publix.com/myaccount/register",
    ios: "https://apps.apple.com/us/app/publix/id562794249",
    android: "https://play.google.com/store/apps/details?id=com.publix.main",
    focus:
      "Club Publix sign-in, weekly ads, clipped digital coupons, shopping lists with aisle locations, barcode scanning, prepared-food ordering, pickup/delivery handoff, and in-store coupon redemption",
  },
  {
    id: 402,
    file: "402-h-e-b.md",
    name: "H-E-B",
    category: "grocery pickup/delivery, coupons, weekly ads, recipes, in-store maps, prescriptions, SNAP EBT, and Texas-region store shopping",
    product: "https://www.heb.com/",
    support: "https://www.heb.com/static-page/contact-us",
    privacy: "https://www.heb.com/static-page/privacy-policy",
    terms: "https://www.heb.com/static-page/terms-and-conditions",
    rewards: "https://www.heb.com/digital-coupon/coupon-selection",
    ios: "https://apps.apple.com/us/app/my-h-e-b/id1477891300",
    android: "https://play.google.com/store/apps/details?id=com.heb.myheb",
    focus:
      "store selection, curbside pickup, delivery windows, coupons, weekly ads, shopping lists, recipes, purchase-history reorder, prescription management, SNAP EBT, and barcode lookup",
  },
  {
    id: 403,
    file: "403-meijer.md",
    name: "Meijer",
    category: "supercenter grocery/retail shopping, mPerks loyalty, pickup/delivery, pharmacy, weekly ads, coupons, and in-store savings",
    product: "https://www.meijer.com/",
    support: "https://help.meijer.com/",
    privacy: "https://www.meijer.com/shopping/privacy-policy.html",
    terms: "https://www.meijer.com/shopping/terms-and-conditions.html",
    rewards: "https://www.meijer.com/mperks.html",
    ios: "https://apps.apple.com/us/app/meijer-delivery-pickup/id583752985",
    android: "https://play.google.com/store/apps/details?id=com.meijer.mobile.meijer",
    focus:
      "mPerks account, coupons, weekly ad, grocery and general-merchandise browse, pickup/delivery, pharmacy links, EBT/payment handling, order tracking, and returns/support",
  },
  {
    id: 404,
    file: "404-aldi.md",
    name: "ALDI",
    category: "discount grocery browsing, weekly ads, store locator, Instacart-style delivery handoff, favorites, and limited-assortment discovery",
    product: "https://www.aldi.us/",
    support: "https://www.aldi.us/about-us/contact-us/",
    privacy: "https://www.aldi.us/privacy/",
    terms: "https://www.aldi.us/terms-of-use/",
    rewards: "https://new.aldi.us/",
    ios: "https://apps.apple.com/us/app/aldi-usa/id429396645",
    android: "https://play.google.com/store/apps/details?id=de.apptiv.business.android.aldi_us",
    focus:
      "weekly ads, ALDI Finds discovery, store locator, product browse, limited-time availability, shopping list, delivery partner handoff, and low-data retail account flows",
  },
  {
    id: 405,
    file: "405-lidl.md",
    name: "Lidl",
    category: "discount grocery browsing, Lidl Plus loyalty, weekly offers, coupons, store locator, receipts, and shopping-list planning",
    product: "https://www.lidl.com/",
    support: "https://help.lidl.com/",
    privacy: "https://www.lidl.com/privacy-policy",
    terms: "https://www.lidl.com/terms-of-use",
    rewards: "https://www.lidl.com/lidl-plus",
    ios: "https://apps.apple.com/us/app/lidl-us/id1220932787",
    android: "https://play.google.com/store/apps/details?id=com.lidl.eci.lidlplus",
    focus:
      "Lidl Plus account, coupons, rewards, digital receipts, weekly offers, store selection, shopping list, promotion freshness, and cross-region feature availability",
  },
  {
    id: 406,
    file: "406-wegmans.md",
    name: "Wegmans",
    category: "grocery pickup/delivery, digital coupons, recipes, shopping lists, item-location maps, meals, and pharmacy-adjacent support",
    product: "https://www.wegmans.com/",
    support: "https://www.wegmans.com/service/contact-us/",
    privacy: "https://www.wegmans.com/privacy-policy/",
    terms: "https://www.wegmans.com/terms-and-conditions/",
    rewards: "https://www.wegmans.com/service/shoppers-club/",
    ios: "https://apps.apple.com/us/app/wegmans/id371707711",
    android: "https://play.google.com/store/apps/details?id=com.wegmans.wegmansapp",
    focus:
      "digital coupons, recipes to grocery lists, item-location list sorting, pickup/delivery, saved orders, shopper account, store context, and support recovery",
  },
  {
    id: 407,
    file: "407-food-lion.md",
    name: "Food Lion",
    category: "MVP loyalty, Shop & Earn rewards, coupons, weekly ads, digital card, online grocery, pickup/delivery, and in-store savings",
    product: "https://www.foodlion.com/",
    support: "https://www.foodlion.com/customer-service/",
    privacy: "https://www.foodlion.com/privacy-policy/",
    terms: "https://www.foodlion.com/terms-and-conditions/",
    rewards: "https://www.foodlion.com/mvp-program/",
    ios: "https://apps.apple.com/us/app/food-lion/id1191337971",
    android: "https://play.google.com/store/apps/details?id=com.foodlion.mobile",
    focus:
      "MVP enrollment, digital card scan, clipped coupons, Shop & Earn rewards, weekly ad, grocery cart, pickup/delivery, substitutions, and EBT/payment risk handling",
  },
  {
    id: 408,
    file: "408-giant-eagle.md",
    name: "Giant Eagle",
    category: "grocery pickup/delivery, myPerks rewards, digital wallet, coupons, weekly deals, fuel savings, pharmacy, and scan/pay flows",
    product: "https://www.gianteagle.com/",
    support: "https://www.gianteagle.com/contact-us",
    privacy: "https://www.gianteagle.com/privacy-policy",
    terms: "https://www.gianteagle.com/terms-of-use",
    rewards: "https://www.gianteagle.com/myperks",
    ios: "https://apps.apple.com/us/app/giant-eagle/id1465897036",
    android: "https://play.google.com/store/apps/details?id=com.gianteagle.apps.grocery",
    focus:
      "myPerks balance, loyalty wallet, weekly deals, digital coupons, curbside/delivery, fuel redemption, pharmacy links, payment methods, and scan/pay eligibility",
  },
  {
    id: 409,
    file: "409-stop-and-shop.md",
    name: "Stop & Shop",
    category: "Go Rewards loyalty, coupons, weekly ad, digital card, Scan It, deli order-ahead, pickup/delivery, and fuel/grocery rewards",
    product: "https://stopandshop.com/",
    support: "https://stopandshop.com/pages/customer-care",
    privacy: "https://stopandshop.com/pages/privacy-policy",
    terms: "https://stopandshop.com/pages/terms-and-conditions",
    rewards: "https://stopandshop.com/pages/go-rewards",
    ios: "https://apps.apple.com/us/app/stop-shop/id423801622",
    android: "https://play.google.com/store/apps/details?id=com.stopandshop.mobile.droid",
    focus:
      "Go Rewards points, bonus offers, weekly ad, clipped coupons, digital card wallet, Scan It eligibility, deli order-ahead, pickup/delivery, and checkout recovery",
  },
  {
    id: 410,
    file: "410-shoprite.md",
    name: "ShopRite",
    category: "grocery pickup/delivery, digital coupons, weekly circular, recipes, loyalty card, promotions, and store-specific inventory",
    product: "https://www.shoprite.com/",
    support: "https://www.shoprite.com/sm/planning/rsid/3000/contact-us",
    privacy: "https://www.shoprite.com/sm/planning/rsid/3000/privacy-policy",
    terms: "https://www.shoprite.com/sm/planning/rsid/3000/terms-and-conditions",
    rewards: "https://www.shoprite.com/sm/planning/rsid/3000/digital-coupon-center",
    ios: "https://apps.apple.com/us/app/shoprite/id338803306",
    android: "https://play.google.com/store/apps/details?id=com.wakefern.shoprite",
    focus:
      "Price Plus card, coupons, weekly circular, recipes, favorites, pickup/delivery, substitutions, store-owned inventory, payment/EBT, and promotions",
  },
  {
    id: 411,
    file: "411-freshdirect.md",
    name: "FreshDirect",
    category: "online grocery delivery, fresh food catalog, delivery windows, order modification, previous purchases, lists, and customer support",
    product: "https://www.freshdirect.com/",
    support: "https://www.freshdirect.com/help",
    privacy: "https://www.freshdirect.com/help/privacy_policy.jsp",
    terms: "https://www.freshdirect.com/help/terms.jsp",
    rewards: "https://www.freshdirect.com/browse.jsp?id=fd_reserve",
    ios: "https://apps.apple.com/us/app/freshdirect-grocery-delivery/id346631494",
    android: "https://play.google.com/store/apps/details?id=com.freshdirect.android",
    focus:
      "delivery-zone gating, delivery window booking, cart modification, previous-purchase reorder, grocery lists, fresh item quality notes, support escalation, and business/residential account differences",
  },
  {
    id: 412,
    file: "412-misfits-market.md",
    name: "Misfits Market",
    category: "subscription grocery delivery, rescued food catalog, weekly customization, order minimums, shipping fees, notifications, and skip/cancel flows",
    product: "https://www.misfitsmarket.com/",
    support: "https://www.misfitsmarket.com/contact-us",
    privacy: "https://www.misfitsmarket.com/privacy",
    terms: "https://www.misfitsmarket.com/terms",
    rewards: "https://www.misfitsmarket.com/how-it-works",
    ios: "https://apps.apple.com/us/app/misfits-market-grocery-app/id1459277007",
    android: "https://play.google.com/store/apps/details?id=com.misfitsmarket",
    focus:
      "weekly subscription lifecycle, rescued-food catalog, cart customization, order minimums, shipping/cold-pack fees, skip/cancel controls, delivery notifications, and sustainability claims",
  },
  {
    id: 413,
    file: "413-thrive-market.md",
    name: "Thrive Market",
    category: "membership grocery delivery, organic/sustainable catalog, filters, autoship, member savings, giving model, and carbon-neutral fulfillment claims",
    product: "https://thrivemarket.com/",
    support: "https://help.thrivemarket.com/",
    privacy: "https://thrivemarket.com/privacy",
    terms: "https://thrivemarket.com/terms",
    rewards: "https://thrivemarket.com/membership",
    ios: "https://apps.apple.com/us/app/thrive-market/id1077909668",
    android: "https://play.google.com/store/apps/details?id=com.thrivemarket.app",
    focus:
      "paid membership, member-only pricing, diet/lifestyle filters, autoship reminders, shipping thresholds, gifts/deals, sponsored membership claims, and cancellation/refund handling",
  },
  {
    id: 414,
    file: "414-ocado.md",
    name: "Ocado",
    category: "UK online supermarket delivery, grocery catalog, delivery slots, trolley editing, substitutions, recipes, offers, and Smart Pass membership",
    product: "https://www.ocado.com/",
    support: "https://help.ocado.com/",
    privacy: "https://www.ocado.com/webshop/content/informationCustomerServices/privacyAndCookies",
    terms: "https://www.ocado.com/webshop/content/informationCustomerServices/termsAndConditions",
    rewards: "https://www.ocado.com/webshop/content/informationCustomerServices/smartPass",
    ios: "https://apps.apple.com/gb/app/ocado-supermarket-shopping/id454391365",
    android: "https://play.google.com/store/apps/details?id=com.ocado.mobile.android",
    focus:
      "UK postcode/serviceability, delivery-slot booking, trolley editing, substitutions, offers, Smart Pass, recipes, low-price promise/voucher handling, and customer-service chat",
  },
  {
    id: 415,
    file: "415-carrefour.md",
    name: "Carrefour",
    category: "international supermarket shopping, loyalty, coupons, drive/pickup, delivery, marketplace retail, store services, and regional catalog rules",
    product: "https://www.carrefour.com/",
    support: "https://www.carrefour.com/en/contact",
    privacy: "https://www.carrefour.com/en/privacy-policy",
    terms: "https://www.carrefour.com/en/terms-and-conditions",
    rewards: "https://www.carrefour.fr/services/carte-carrefour",
    ios: "https://apps.apple.com/fr/app/carrefour-drive-livraison/id488575683",
    android: "https://play.google.com/store/apps/details?id=com.carrefour.fid.android",
    focus:
      "country/region selection, loyalty card, coupons, drive pickup, home delivery, marketplace/catalog boundaries, store services, payment, substitutions, and multilingual support",
  },
  {
    id: 416,
    file: "416-tesco.md",
    name: "Tesco",
    category: "UK grocery and Clubcard shopping, delivery, Click+Collect, Whoosh, marketplace, stock check, lists, vouchers, and subscriptions",
    product: "https://www.tesco.com/",
    support: "https://www.tesco.com/help/",
    privacy: "https://www.tesco.com/help/privacy-and-cookies/privacy-centre/privacy-policy-information/privacy-policy/",
    terms: "https://www.tesco.com/help/terms-and-conditions/",
    rewards: "https://www.tesco.com/clubcard/",
    ios: "https://apps.apple.com/gb/app/tesco-grocery-clubcard/id389581236",
    android: "https://play.google.com/store/apps/details?id=com.tesco.grocery.view",
    focus:
      "Clubcard barcode, points/vouchers, Clubcard Prices, grocery basket, home delivery, Click+Collect, Whoosh, marketplace orders, stock check, shopping lists, and accessibility/security features",
  },
  {
    id: 417,
    file: "417-sainsbury-s.md",
    name: "Sainsbury's",
    category: "UK grocery delivery, Click & Collect, Nectar rewards, offers, favorites, registered grocery accounts, and order editing",
    product: "https://www.sainsburys.co.uk/",
    support: "https://help.sainsburys.co.uk/",
    privacy: "https://privacy-hub.sainsburys.co.uk/privacy-policy/",
    terms: "https://help.sainsburys.co.uk/help/terms-and-conditions",
    rewards: "https://www.sainsburys.co.uk/gol-ui/nectar",
    ios: "https://apps.apple.com/us/app/sainsburys-groceries/id1086056964",
    android: "https://play.google.com/store/apps/details?id=com.sainsburys.gol",
    focus:
      "registered grocery account, Nectar linking, product browse/search, favorites, order creation/editing, delivery or Click & Collect slots, offers, and UK serviceability",
  },
  {
    id: 418,
    file: "418-grubhub.md",
    name: "Grubhub",
    category: "restaurant and convenience delivery marketplace, pickup, Grubhub+ membership, upfront fees, real-time tracking, gift cards, support, and guarantees",
    product: "https://www.grubhub.com/",
    support: "https://www.grubhub.com/help/contact-us",
    privacy: "https://www.grubhub.com/legal/privacy-policy",
    terms: "https://www.grubhub.com/legal/terms-of-use",
    rewards: "https://lp.grubhub.com/legal/plus/",
    ios: "https://apps.apple.com/us/app/grubhub-food-delivery/id302920553",
    android: "https://play.google.com/store/apps/details?id=com.grubhub.android",
    focus:
      "restaurant discovery, menus, ratings, cart customizations, upfront fees, pickup/delivery, Grubhub+ entitlement, order tracking, courier handoff, refunds/credits, and support cases",
  },
  {
    id: 419,
    file: "419-gopuff.md",
    name: "Gopuff",
    category: "instant convenience delivery, micro-fulfillment catalog, alcohol/age gates, FAM membership, student membership, fast delivery, and support",
    product: "https://www.gopuff.com/",
    support: "https://www.gopuff.com/go/support",
    privacy: "https://www.gopuff.com/go/privacy-policy",
    terms: "https://www.gopuff.com/go/terms",
    rewards: "https://www.gopuff.com/go/fam",
    ios: "https://apps.apple.com/us/app/gopuff-food-drink-delivery/id722804810",
    android: "https://play.google.com/store/apps/details?id=com.main.gopuff",
    focus:
      "address serviceability, micro-fulfillment inventory, cart/checkout, fast-delivery estimates, FAM/student FAM membership, alcohol eligibility, payment, courier tracking, and support recovery",
  },
  {
    id: 420,
    file: "420-deliveroo.md",
    name: "Deliveroo",
    category: "restaurant, grocery, and retail delivery marketplace, pickup, Plus membership, live tracking, rider handoff, refunds, and regional availability",
    product: "https://deliveroo.com/",
    support: "https://deliveroo.com/faq",
    privacy: "https://deliveroo.com/privacy",
    terms: "https://deliveroo.com/legal",
    rewards: "https://deliveroo.com/plus",
    ios: "https://apps.apple.com/gb/app/deliveroo-food-shopping/id1001501844",
    android: "https://play.google.com/store/apps/details?id=com.deliveroo.orderapp",
    focus:
      "postcode serviceability, restaurant/grocery discovery, menus, cart customization, delivery/pickup checkout, Plus membership, rider tracking, substitutions, refund/support, and country-specific availability",
  },
];

function h1(name) {
  return `# ${name}-Style Clone Spec`;
}

function researchSources(app) {
  return `## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | ${app.product} | Public product positioning, catalog/menu or retail surfaces, ordering/shopping, account, location, membership/reward, and app behavior | Verified ${verifiedDate} |
| Support/help center | ${app.support} | Public support taxonomy for account, order/activity, billing/payment, store/provider issues, troubleshooting, and deletion/export flows | Verified ${verifiedDate} |
| Privacy policy | ${app.privacy} | Account, profile, order/purchase, location, device, advertising, analytics, support, and user-rights handling | Verified ${verifiedDate} |
| Terms of service | ${app.terms} | Service usage, licensed content, payments, user conduct, provider limits, regulated-flow boundaries, and legal boundaries | Verified ${verifiedDate} |
| Rewards or membership terms | ${app.rewards} | Reward, membership, loyalty, offer, stored-value, or entitlement orientation where public | Verified ${verifiedDate} |
| App Store listing | ${app.ios} | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified ${verifiedDate} |
| Google Play listing | ${app.android} | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified ${verifiedDate} |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, payment, push payloads, background behavior, provider integrations, regional availability, and store/payment/loyalty/refund behavior | Blocked pending lawful device/store verification |`;
}

function screenRows(app) {
  const names = [
    "Welcome / Auth / Consent",
    "Home / Personalized Hub",
    "Store / Location Selector",
    "Catalog / Menu Browse",
    "Search / Filter Results",
    "Item Detail / Customizer",
    "Cart / Basket / List",
    "Checkout / Payment",
    "Order / Fulfillment Status",
    "Rewards / Membership / Coupons",
    "Delivery / Pickup / Courier Tracking",
    "Notifications / Messages",
    "Settings / Privacy",
    "Support / Refunds",
  ];
  return names
    .map(
      (screen) =>
        `| ${screen} | Defines the ${screen.toLowerCase()} workflow for ${app.name}-inspired behavior | taps, forms, search, filters, deep links, location, payment, store/merchant selection | empty, loading, loaded, signed-out, offline, entitlement-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, store/merchant closed, item unavailable, payment failed |`,
    )
    .join("\n");
}

function spec(app) {
  const deliveryMarketplace = app.id >= 418;
  const groceryLike = !deliveryMarketplace;
  const commerceNouns = deliveryMarketplace
    ? "restaurant, merchant, menu, courier, basket, payment, location, membership, analytics, support, advertising, and marketplace data"
    : "account, profile, order/cart/list, payment, location, loyalty, analytics, support, pharmacy/health-adjacent, advertising, and public catalog data";
  const risky = deliveryMarketplace
    ? "merchant/menu/price/fee freshness, delivery ETA accuracy, courier location privacy, alcohol/age gates where relevant, refund/credit handling, subscription eligibility, payment/tip handling, and support escalation"
    : "menu/product/promotion/tax/fee/availability freshness, substitution/refund handling, loyalty redemption, payment privacy, age-restricted goods, pharmacy/health-adjacent data where relevant, store/franchise availability, and support escalation";
  const focus = app.focus;
  const dataEntities = deliveryMarketplace
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
        "Membership",
        "PaymentInstrument",
        "Order",
        "CourierAssignment",
        "DeliveryStatus",
        "SupportCase",
        "RefundCase",
        "AuditEvent",
        "LocalCacheRecord",
      ]
    : [
        "User",
        "AccountSession",
        "CustomerProfile",
        "StoreLocation",
        "Catalog",
        "CatalogItem",
        "InventorySnapshot",
        "Cart",
        "ShoppingList",
        "Order",
        "PaymentInstrument",
        "RewardAccount",
        "Offer",
        "Fulfillment",
        "SubstitutionPreference",
        "SupportCase",
        "RefundCase",
        "AuditEvent",
        "LocalCacheRecord",
      ];
  return `${h1(app.name)}

> Metadata
> - Inspiration app: ${app.name}
> - Category: ${app.category}
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${verifiedDate}.
> - Verification basis: exact public first-party product, support/help, privacy, terms, reward/membership, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, payment/purchase state, permission prompts, push notifications, provider integrations, store/merchant availability, catalog/menu/pricing/tax/fee correctness, loyalty or membership redemption, refund/order-support behavior, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary catalog/menu/product data, maps, media, private APIs, recommendation models, customer data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile product inspired by ${app.name}'s public product and policy materials. V1 focuses on ${focus}. The clone must use original branding, original UI copy, original sample data, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked \`Manual verification required\` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support ${focus} with clear retry, recovery, unavailable, region, entitlement, and provider-aware states.
- Preserve boundaries between ${commerceNouns}.
- Implement guest, member, free, paid, expired, restored, refunded, store-owned, web-owned, provider-owned, region-blocked, and unavailable states without copying exact pricing, plan names, promotions, or loyalty terms.
- Include export/delete, support/report flows, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog/menu, location, payment, device/permission, safety, advertising, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with ${app.name} or its publisher.
- Do not copy proprietary feeds, menus, product catalogs, prices, promotions, media, artwork, recommendation models, screenshots, icons, brand names, or private API shapes.
- Do not send production user order, payment, precise-location, loyalty, support, prescription/pharmacy, delivery, or courier telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present nutrition, allergen, price, delivery-time, reward, membership, pharmacy, or availability output as professional, medical, legal, financial, or safety-critical advice.
- Do not enable autonomous purchases, account changes, public profile changes, regulated workflows, pharmacy actions, age-restricted purchases, or irreversible external actions without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

${researchSources(app)}

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest or signed-out preview where allowed, account creation or restore, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful order, shopping, reward, membership, store/merchant, and support state with signed-out, loading, empty, degraded-network, and stale-data variants.
- Store, merchant, address, or location selection must distinguish GPS, manual search, saved/favorite locations, current hours, services, pickup/delivery/shipping/fuel/pharmacy availability where relevant, and unavailable-region states.
- Catalog, menu, or product browse must support categories, search, filters, availability, price/fee freshness, promotion labels, nutrition/allergen or product-safety notes, and original sample data.
- Detail screens must show availability, provider timestamp, rights state, safety labels where relevant, save/favorite/share actions, and manual-verification warnings for native-only behavior.
- Cart, basket, list, wallet, checkout, reward, gift-card, order, pickup, delivery, shipping, fuel, pharmacy, courier, or support jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Payment and stored-value surfaces must be server-owned and tokenized; client-only state must never decide funds, rewards, credits, refunds, tips, fuel discounts, memberships, or order acceptance.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, payment or membership management, connected-provider controls, and responsible-use controls where relevant.
- Entitlements must model guest, member, free, paid, expired, canceled, refunded, restored, store-owned, web-owned, provider-owned, quota-exhausted, region-blocked, and unavailable states.
- Analytics must avoid raw orders, payment credentials, precise arrival paths, loyalty identifiers, pharmacy/prescription details, support attachments, and unredacted account identifiers.
- Provider calls require scoped credentials, redacted logs, request/response retention limits, per-provider data-processing notes, retry policies, and user-visible recovery.
- Manual verification required: native permission prompts, marketplace privacy labels, payment, push payloads, background behavior, provider integrations, regional availability, and store/merchant/payment/loyalty/refund behavior.
- ${focus} must be treated as launch-blocking behavior with owners, mitigations, acceptance tests, and manual-verification notes.
- ${risky} must be treated as a launch-blocking risk area with owner, mitigation, and acceptance tests.
- Location privacy, local offers, ad-tech, personalization, fraud prevention, and support escalation must be treated as launch-blocking risk areas with explicit data minimization and user-visible recovery.

## Core User Journeys

- New user reviews consent, signs in or continues as guest where allowed, selects a store, merchant, address, or fulfillment context, and reaches the main catalog or ordering surface.
- Returning user reorders, rebuilds, or repeats a favorite workflow, applies a qualifying reward, coupon, membership, or offer, and checks out.
- User switches pickup, curbside, delivery, shipping, scan-and-go, fuel, pharmacy, or in-store mode where available and sees location-specific availability.
- User pays with card, wallet, gift card, stored value, reward, membership benefit, split tender, tip, or provider-backed instrument where supported and handles authorization failure.
- User tracks order, pickup, delivery, courier, shipping, fuel, prescription, or support status without exposing precise location unnecessarily.
- User sees item unavailable, merchant/store closed, catalog changed, fee changed, coupon invalid, substitution needed, membership blocked, or promotion expired and can recover before payment.
- User requests support, refund, order correction, privacy export, or account deletion and receives durable case state.
- Manual verification required: background behavior, push payloads, OS permission prompts, marketplace labels, provider integrations, purchases/payments, and regional availability.

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
- GET /locations, GET /locations/:id, GET /catalogs, GET /catalogs/:locationId, GET /items/:id, and GET /offers.
- POST /carts, PATCH /carts/:id, POST /carts/:id/items, PATCH /carts/:id/items/:itemId, and DELETE /carts/:id/items/:itemId.
- POST /checkout/quote, POST /orders, GET /orders/:id, POST /orders/:id/cancel, and GET /orders/:id/status.
- GET /rewards, POST /rewards/enroll, POST /rewards/redeem, GET /gift-cards, POST /gift-cards/reload, and GET /payment-instruments.
- GET /inventory, GET /substitutions, PATCH /substitutions/:id, GET /fulfillment-windows, and POST /arrival-checkins where fulfillment requires store, merchant, or courier handoff.
- POST /support/cases, GET /support/cases/:id, POST /refund-requests, POST /data-export, and DELETE /account.
- \`GET /privacy/settings\`, \`PATCH /privacy/settings\`, \`POST /data-export\`, and \`GET /data-export/:id\` for privacy lifecycle.
- \`GET /support/articles\`, \`POST /support/cases\`, \`GET /support/cases/:id\`, \`POST /reports\`, and \`GET /reports/:id\` for support, abuse, safety, and rights workflows.
- Provider webhook contracts must include idempotency keys, redacted payload logging, retry semantics, and canonical refetch after missed order, payment, inventory, membership, or delivery events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, refund/credit review, fraud hold review, payment dispute handling, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, or proprietary provider schemas from ${app.name}.

## Realtime, Push, And Offline Behavior

- Recent home, catalog/menu, settings, entitlement, and in-progress state cache locally with explicit size, retention, and purge rules.
- Long-running jobs use polling, SSE, websocket, or provider webhook fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and low-risk local drafts where allowed but blocks provider calls, billing/payment changes, public publication, rights-affecting writes, profile-owner changes, pharmacy/health actions, age-restricted purchases, delivery dispatch, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether coupons, promotions, licenses, rewards, memberships, orders, tips, or payments were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription/payment, support, order status, rewards/offers, store/merchant arrival, delivery handoff, and moderation states.
- Background tracking, location checks, local-network/device behavior, payment authorization, loyalty redemption, store check-in, courier tracking, pharmacy status, and cloud sync behavior are \`Manual verification required\` and must stay disabled until platform-specific evidence exists.
- Cached uploads, activity/order history, payment references, device metadata, location history, support attachments, catalog/menu refs, and pharmacy-adjacent records purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, precise location, approximate location, motion/fitness, camera, media library, files, clipboard, contacts/share sheet, local network, Bluetooth, health-store access, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw order histories, payment credentials, exact arrival trails, loyalty tokens, pharmacy/prescription details, support attachments, or private messages in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, support attachments, delivery issue photos, and order issue photos must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, and private tags before export/share.
- Menu, order, payment, reward, delivery, offer, membership, nutrition, allergen, pharmacy, age-restricted, and product-safety features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe behavior, fraud, and misleading attribution.
- Recommended, ad-targeted, factual, price, nutrition, allergen, location, pharmacy, ETA, or availability output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, store-limited, or unavailable before consequential use.
- Catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, embargo, region, store, merchant, and availability restrictions in metadata.
- Support access to uploads, activity/order history, profile data, diagnostics, account data, and pharmacy-adjacent data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, activity/order history, generated outputs, reports, support cases, device associations, payment tokens, rewards references, membership references, and billing references where legally deletable.
- Fraud, account takeover, payment abuse, coupon/reward abuse, refund abuse, courier/merchant disputes, alcohol/age-gated goods where relevant, and unsafe delivery instructions require explicit review queues before production launch.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, item opened, cart/list updated, quote viewed, order submitted/failed, favorite saved, report submitted, export/delete requested, payment viewed, and notification preference changed.
- Event properties must use coarse category, provider capability class, latency buckets, error codes, duration buckets, ad state, entitlement/payment state, and region/store/merchant class only.
- Monetization may include subscriptions, memberships, service fees, convenience fees, delivery fees, fuel savings, rewards, stored value, gift cards, sponsored placement, retail media, marketplace commissions, tips, or premium fulfillment only after legal, tax, consumer-protection, and disclosure review.
- Billing/payment must handle app-store, web, in-store, wallet, gift-card, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, quota-exhausted, and payment-failed states.
- Paywalls and payment gates must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/provider, unsupported store/merchant/device, or blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed catalog, route, menu item, promotion, reward, price, store, merchant, provider, activity, courier, or order becomes unavailable, renamed, corrected, expired, geo-blocked, or takedown-blocked.
- Background tracking, order status, payment authorization, feed refresh, score/order alert, courier tracking, or offline license refresh is interrupted by app termination.
- Subscription, membership, reward, coupon, or stored value renews, refunds, expires, switches owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, ad records, or provider logs remain active.
- Uploaded, indexed, or saved data contains child data, private conversations, health data, financial data, copyrighted material, or third-party confidential content.
- Provider/CDN/feed/device/store/merchant/payment outage occurs after the user starts an action but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, copyright infringement, unsafe behavior, fraud, promotion abuse, refund abuse, courier harassment, or unsafe public sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, sensor/order data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, provider, bundle, health, territory, regulator, store, merchant, franchise, membership, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement/payment checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for catalog/menu validation, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for profile, favorite, history, active job, provider-auth, retry gates, destructive confirmations, and license/availability propagation.
- Contract tests for auth, home, catalog/menu, jobs, billing/payment, privacy, support, reports, and provider routes where scoped.
- Integration tests for onboarding -> discover -> detail -> start/order/shop -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, provider timeouts, and availability failures.
- Offline tests for cached reads, allowed local drafts, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for reports, explicit-content gates, child/profile controls, fraud, impersonation, ad disclosures, delayed/provider data, responsible-use controls, unsafe behavior, and privacy redaction.
- Billing/payment tests for trial, purchase, restore, renewal, refund, expiration, gift card, stored value, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, and web-owned states.
- Privacy/security tests for provider request redaction, support access consent, metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts where applicable, controls, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, purchase/payment, push notifications, provider integrations, background behavior, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact first-party product/help/privacy/terms URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed catalog/data.
- Onboarding, home, discover, detail, active-use/order/shop, notifications, export/share, settings, support, safety report, export/delete, and entitlement/payment screens are specified.
- Account, profile, provider, billing/payment, support, analytics, and order/location/loyalty/store/merchant/courier data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing/payment, publication, rights, profile-owner, pharmacy/health, age-restricted, delivery-dispatch, or irreversible operations while offline.
- Safety tests cover reports, explicit content, non-consensual uploads, impersonation, ad disclosures, provider delays, responsible-use controls, unsafe behavior, fraud, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions/payments, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active job failure, quota exhaustion, offline recovery, export/delete, billing/payment restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog data, maps/location, media, notifications, billing/payment, analytics, support, recommendations, ads, courier tracking, or device integrations in the original implementation?
- Which uploads, drafts, histories, diagnostics, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, or legal obligations?
- Which regions, ages, stores, merchants, providers, devices, profiles, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, nutrition/allergen, safety, ad-tech, location, payment, refund, courier, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, special hardware, background permissions, platform integrations, geolocation, payment methods, real orders, pharmacy access, age verification, courier handoff, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, payment/location model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery, detail, active-use/order/shop, settings, support, and entitlement/payment shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, fraud controls, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing/payment, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, and background behavior.
- Verify account, payment, reward/membership, store/merchant availability, order, substitution, delivery, refund, and support states with test accounts where allowed.
- Extend the Phase 5 implementation-plan queue after this ID is included in the readiness batch.
- Keep downstream scaffold repos private and label this source spec as implementation-ready only for original public-source V1 work.
`;
}

for (const app of apps) {
  writeFileSync(join(process.cwd(), "specs", "batch-21", app.file), spec(app));
}

console.log(`Promoted ${apps.length} specs in specs/batch-21.`);
