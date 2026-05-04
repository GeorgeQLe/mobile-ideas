#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const verifiedDate = "2026-05-04";

const apps = [
  {
    id: 421,
    file: "421-just-eat.md",
    name: "Just Eat",
    category: "restaurant delivery marketplace, takeaway collection, postcode serviceability, restaurant menus, checkout, order tracking, offers, and support",
    product: "https://www.just-eat.co.uk/",
    support: "https://www.just-eat.co.uk/help",
    privacy: "https://www.just-eat.co.uk/privacy-policy",
    terms: "https://www.just-eat.co.uk/termsandconditions",
    rewards: "https://www.just-eat.co.uk/stampcards",
    ios: "https://apps.apple.com/gb/app/just-eat-food-delivery/id365800943",
    android: "https://play.google.com/store/apps/details?id=com.justeat.app.uk",
    focus:
      "UK postcode serviceability, restaurant discovery, menu browsing, collection or delivery checkout, discounts, order status, courier/restaurant handoff, refund/support, and country-specific availability",
  },
  {
    id: 422,
    file: "422-glovo.md",
    name: "Glovo",
    category: "multi-category delivery marketplace, restaurants, groceries, retail errands, Prime membership, courier tracking, support, and regional availability",
    product: "https://glovoapp.com/",
    support: "https://help.glovoapp.com/",
    privacy: "https://glovoapp.com/en/legal/privacy/",
    terms: "https://glovoapp.com/en/legal/terms/",
    rewards: "https://glovoapp.com/en/glovoprime/",
    ios: "https://apps.apple.com/us/app/glovo-food-delivery-and-more/id951812684",
    android: "https://play.google.com/store/apps/details?id=com.glovo",
    focus:
      "city serviceability, restaurant/grocery/store discovery, multi-category basket, courier assignment, Prime benefits, payment, live order tracking, support chat, and country-specific availability",
  },
  {
    id: 423,
    file: "423-bolt-food.md",
    name: "Bolt Food",
    category: "food and grocery delivery marketplace, pickup, scheduled ordering, Bolt Plus benefits, courier tracking, payments, and regional support",
    product: "https://food.bolt.eu/",
    support: "https://bolt.eu/en/support/",
    privacy: "https://bolt.eu/en/legal/privacy-for-users/",
    terms: "https://bolt.eu/en/legal/terms-for-users/",
    rewards: "https://bolt.eu/en/bolt-plus/",
    ios: "https://apps.apple.com/us/app/bolt-food/id1451492388",
    android: "https://play.google.com/store/apps/details?id=com.bolt.deliveryclient",
    focus:
      "address serviceability, restaurants and Bolt Market groceries, pickup/delivery, scheduled orders, Bolt Plus benefits, card/cash eligibility, courier tracking, and support recovery",
  },
  {
    id: 424,
    file: "424-foodpanda.md",
    name: "foodpanda",
    category: "Asian food and grocery delivery marketplace, pandamart, self-pickup, pandapro, deals, parcel delivery, order tracking, and help center",
    product: "https://www.foodpanda.com/",
    support: "https://www.foodpanda.com/contact/",
    privacy: "https://www.foodpanda.com/privacy-policy/",
    terms: "https://www.foodpanda.com/terms-and-conditions/",
    rewards: "https://www.foodpanda.com/pandapro/",
    ios: "https://apps.apple.com/us/app/foodpanda-food-groceries/id758103884",
    android: "https://play.google.com/store/apps/details?id=com.global.foodpanda.android",
    focus:
      "country/city serviceability, restaurants, pandamart grocery, self-pickup, pandapro benefits, vouchers, parcel-style delivery, checkout, live tracking, and support cases",
  },
  {
    id: 425,
    file: "425-swiggy.md",
    name: "Swiggy",
    category: "India food ordering, Instamart grocery, Dineout, Swiggy One membership, rail food delivery, payment methods, and order support",
    product: "https://www.swiggy.com/",
    support: "https://www.swiggy.com/support",
    privacy: "https://www.swiggy.com/privacy-policy",
    terms: "https://www.swiggy.com/terms-and-conditions",
    rewards: "https://www.swiggy.com/swiggy-one",
    ios: "https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920",
    android: "https://play.google.com/store/apps/details?id=in.swiggy.android",
    focus:
      "India city serviceability, restaurant food delivery, Instamart grocery, Dineout offers, Swiggy One benefits, train-food ordering blockers, multiple payment methods, live ETA, and support/refund handling",
  },
  {
    id: 426,
    file: "426-zomato.md",
    name: "Zomato",
    category: "restaurant discovery, food delivery, dining reservations and payments, Gold-style membership, reviews, order tracking, and support",
    product: "https://www.zomato.com/",
    support: "https://www.zomato.com/contact",
    privacy: "https://www.zomato.com/privacy",
    terms: "https://www.zomato.com/conditions",
    rewards: "https://www.zomato.com/gold",
    ios: "https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896",
    android: "https://play.google.com/store/apps/details?id=com.application.zomato",
    focus:
      "restaurant discovery, ratings/reviews, food delivery checkout, dining reservations and bill-pay, membership benefits, order tracking, support/refunds, and India-specific availability",
  },
  {
    id: 427,
    file: "427-rappi.md",
    name: "Rappi",
    category: "Latin America super-app delivery marketplace, restaurants, groceries, pharmacy-adjacent retail, RappiPro, courier tracking, payments, and support",
    product: "https://www.rappi.com/",
    support: "https://help.rappi.com/",
    privacy: "https://legal.rappi.com/united-states/privacy-policy",
    terms: "https://legal.rappi.com/united-states/terms-and-conditions",
    rewards: "https://www.rappi.com/pro",
    ios: "https://apps.apple.com/us/app/rappi-deliveries-in-minutes/id984044296",
    android: "https://play.google.com/store/apps/details?id=com.grability.rappi",
    focus:
      "country/city serviceability, restaurants, grocery/retail categories, pharmacy-adjacent blockers, RappiPro benefits, courier tracking, payment, support/refunds, and region-specific availability",
  },
  {
    id: 428,
    file: "428-grab.md",
    name: "Grab",
    category: "Southeast Asia super-app for transport, food, grocery, payments, rewards, delivery, wallet, and support",
    product: "https://www.grab.com/",
    support: "https://help.grab.com/passenger/en-us/",
    privacy: "https://www.grab.com/privacy/",
    terms: "https://www.grab.com/terms/",
    rewards: "https://www.grab.com/sg/rewards/",
    ios: "https://apps.apple.com/sg/app/grab-taxi-food-delivery/id647268330",
    android: "https://play.google.com/store/apps/details?id=com.grabtaxi.passenger",
    focus:
      "Southeast Asia country serviceability, GrabFood, groceries, ride/transport-adjacent blockers, GrabPay, rewards, delivery tracking, support, and regional product differences",
  },
  {
    id: 429,
    file: "429-gojek.md",
    name: "Gojek",
    category: "Indonesia/Southeast Asia super-app for GoFood, rides, logistics, groceries, wallet, subscriptions, driver communication, and support",
    product: "https://www.gojek.com/",
    support: "https://www.gojek.com/help/",
    privacy: "https://www.gojek.com/en-id/terms-and-condition/privacy-policies",
    terms: "https://www.gojek.com/en-id/terms-and-condition/",
    rewards: "https://www.gojek.com/en-id/gojek-plus/",
    ios: "https://apps.apple.com/id/app/gojek/id944875099",
    android: "https://play.google.com/store/apps/details?id=com.gojek.app",
    focus:
      "GoFood restaurant ordering, GoMart groceries, ride/logistics-adjacent blockers, Gojek PLUS benefits, driver communication, wallet/payment, order tracking, and Indonesia/Singapore regional availability",
  },
  {
    id: 430,
    file: "430-didi-food.md",
    name: "DiDi Food",
    category: "food delivery marketplace, restaurant menus, promotions, courier tracking, payment, help center, and Latin America/regional availability",
    product: "https://web.didiglobal.com/",
    support: "https://help.didiglobal.com/passenger-index.html",
    privacy: "https://web.didiglobal.com/us/privacy/",
    terms: "https://web.didiglobal.com/us/terms/",
    rewards: "https://web.didiglobal.com/",
    ios: "https://apps.apple.com/mx/app/didi-food-express-delivery/id1362398401",
    android: "https://play.google.com/store/apps/details?id=com.xiaojukeji.didi.global.customer",
    focus:
      "restaurant discovery, promotions/discount coupons, address serviceability, checkout, courier tracking, support, payment failure recovery, and country-specific service availability",
  },
  {
    id: 431,
    file: "431-meituan.md",
    name: "Meituan",
    category: "China local-services super-app for food delivery, reservations, deals, retail, travel, errands, group-buying, payments, and support",
    product: "https://www.meituan.com/",
    support: "https://kf.meituan.com/",
    privacy: "https://rules-center.meituan.com/",
    terms: "https://rules-center.meituan.com/",
    rewards: "https://www.meituan.com/",
    ios: "https://apps.apple.com/cn/app/%E7%BE%8E%E5%9B%A2-%E7%BE%8E%E5%A5%BD%E7%94%9F%E6%B4%BB%E5%B0%8F%E5%B8%AE%E6%89%8B/id423084029",
    android: "https://play.google.com/store/apps/details?id=com.sankuai.meituan",
    focus:
      "China city serviceability, food delivery, restaurant reservations, deals/group-buying, local-services listings, errands, payments, refunds, support, and regional/legal blockers",
  },
  {
    id: 432,
    file: "432-ele-me.md",
    name: "Ele.me",
    category: "China food and local retail delivery marketplace, restaurants, supermarket/convenience goods, coupons, membership, rider tracking, and support",
    product: "https://www.ele.me/",
    support: "https://help.ele.me/",
    privacy: "https://terms.alicdn.com/",
    terms: "https://terms.alicdn.com/",
    rewards: "https://www.ele.me/",
    ios: "https://apps.apple.com/cn/app/%E9%A5%BF%E4%BA%86%E4%B9%88-%E5%A4%96%E5%8D%96%E5%AE%89%E5%BF%83%E9%80%81/id507161324",
    android: "https://play.google.com/store/apps/details?id=me.ele",
    focus:
      "China address serviceability, restaurant and convenience retail delivery, coupons/membership, payment, rider tracking, support/refunds, and China-specific account/legal blockers",
  },
  {
    id: 433,
    file: "433-deliveroo-rider.md",
    name: "Deliveroo Rider",
    category: "courier/rider work app for application, right-to-work checks, scheduling, going online, offer acceptance, navigation, earnings, support, and safety kit",
    product: "https://riders.deliveroo.com/",
    support: "https://riders.deliveroo.com/en/support",
    privacy: "https://deliveroo.com/privacy",
    terms: "https://riders.deliveroo.com/en/terms-and-conditions",
    rewards: "https://riders.deliveroo.com/en/perks",
    ios: "https://apps.apple.com/gb/app/deliveroo-rider/id1197582301",
    android: "https://play.google.com/store/apps/details?id=com.deliveroo.driverapp",
    focus:
      "rider application, right-to-work and vehicle checks, going online, delivery offers, pickup/dropoff navigation, earnings, safety support, account status, and country-specific worker rules",
  },
  {
    id: 434,
    file: "434-doordash-dasher.md",
    name: "DoorDash Dasher",
    category: "delivery-driver work app for onboarding, background checks, scheduling, offer acceptance, navigation, earnings, payout, support, and safety",
    product: "https://dasher.doordash.com/",
    support: "https://help.doordash.com/dashers/s/",
    privacy: "https://help.doordash.com/legal/document?type=dx-privacy-policy",
    terms: "https://help.doordash.com/legal/document?type=dx-ica",
    rewards: "https://dasher.doordash.com/en-us/dasherdirect",
    ios: "https://apps.apple.com/us/app/doordash-dasher/id1451754591",
    android: "https://play.google.com/store/apps/details?id=com.doordash.driverapp",
    focus:
      "Dasher signup, identity/background checks, schedule or Dash Now, offer acceptance, merchant pickup, customer dropoff, tips/earnings, payout products, support, and safety incidents",
  },
  {
    id: 435,
    file: "435-uber-driver.md",
    name: "Uber Driver",
    category: "driver/courier work app for rides and delivery, onboarding, documents, going online, trips, deliveries, navigation, earnings, support, and safety",
    product: "https://www.uber.com/us/en/drive/",
    support: "https://help.uber.com/driving-and-delivering",
    privacy: "https://www.uber.com/legal/en/document/?name=privacy-notice",
    terms: "https://www.uber.com/legal/en/document/?name=general-terms-of-use",
    rewards: "https://www.uber.com/us/en/drive/uber-pro/",
    ios: "https://apps.apple.com/us/app/uber-driver-drive-deliver/id1131342792",
    android: "https://play.google.com/store/apps/details?id=com.ubercab.driver",
    focus:
      "driver/courier onboarding, document checks, going online, ride/delivery offers, pickup/dropoff navigation, earnings, Uber Pro-style status, safety toolkit, and regional eligibility",
  },
  {
    id: 436,
    file: "436-instacart-shopper.md",
    name: "Instacart Shopper",
    category: "shopper work app for signup, batch discovery, grocery picking, substitutions, checkout, delivery, earnings, cashout, support, and safety",
    product: "https://shoppers.instacart.com/",
    support: "https://shoppers.instacart.com/help",
    privacy: "https://www.instacart.com/privacy",
    terms: "https://www.instacart.com/terms",
    rewards: "https://shoppers.instacart.com/",
    ios: "https://apps.apple.com/us/app/instacart-shopper-earn-money/id1454056744",
    android: "https://play.google.com/store/apps/details?id=com.instacart.shopper",
    focus:
      "shopper signup, identity/background checks, batch selection, item picking, substitutions/customer chat, checkout card handling, delivery, tips/earnings, cashout, support, and safety",
  },
  {
    id: 437,
    file: "437-shipt.md",
    name: "Shipt",
    category: "shopper and package-delivery work app for onboarding, order offers, shopping, substitutions, delivery windows, messaging, earnings, support, and safety",
    product: "https://www.shipt.com/be-a-shopper/",
    support: "https://help.shipt.com/",
    privacy: "https://www.shipt.com/privacy-policy/",
    terms: "https://www.shipt.com/terms-of-service/",
    rewards: "https://www.shipt.com/be-a-shopper/",
    ios: "https://apps.apple.com/us/app/shipt-shopper-and-driver/id976353472",
    android: "https://play.google.com/store/apps/details?id=com.shipt.shopper",
    focus:
      "shopper/driver onboarding, eligibility checks, order offers, grocery picking, member messaging, substitutions, delivery windows, earnings, same-day pay, support, and safety",
  },
  {
    id: 438,
    file: "438-favor.md",
    name: "Favor",
    category: "Texas delivery marketplace and runner work app, H-E-B ecosystem, runner signup, order offers, shopping/delivery, earnings, support, and safety",
    product: "https://www.favordelivery.com/",
    support: "https://support.favordelivery.com/",
    privacy: "https://www.favordelivery.com/privacy-policy",
    terms: "https://www.favordelivery.com/terms-of-service",
    rewards: "https://run.favordelivery.com/",
    ios: "https://apps.apple.com/us/app/favor-runner-deliver-earn/id895749783",
    android: "https://play.google.com/store/apps/details?id=com.neighbfav.neighborfavor.runner",
    focus:
      "Texas market serviceability, runner onboarding, H-E-B/favor order offers, shopping/delivery tasks, customer messaging, tips/earnings, promos, support, and safety incidents",
  },
  {
    id: 439,
    file: "439-skipthedishes.md",
    name: "SkipTheDishes",
    category: "Canada food and grocery delivery marketplace, restaurants, retail, Skip+ membership, points, order tracking, support, refunds, and regional availability",
    product: "https://www.skipthedishes.com/",
    support: "https://www.skipthedishes.com/help",
    privacy: "https://www.skipthedishes.com/privacy-policy",
    terms: "https://www.skipthedishes.com/terms-of-service",
    rewards: "https://www.skipthedishes.com/skipplus",
    ios: "https://apps.apple.com/ca/app/skip-food-grocery-delivery/id858315554",
    android: "https://play.google.com/store/apps/details?id=com.ncconsulting.skipthedishes_android",
    focus:
      "Canada city serviceability, restaurant and retail discovery, cart/checkout, Skip+ benefits, points, order tracking, alcohol/pharmacy-adjacent blockers, support/refunds, and regional availability",
  },
  {
    id: 440,
    file: "440-talabat.md",
    name: "Talabat",
    category: "Middle East food, grocery, mart, flowers, pharmacy-adjacent retail, pro membership, rewards, order tracking, and support",
    product: "https://www.talabat.com/",
    support: "https://www.talabat.com/uae/contact-us",
    privacy: "https://www.talabat.com/uae/privacy",
    terms: "https://www.talabat.com/uae/terms",
    rewards: "https://www.talabat.com/uae/talabat-pro",
    ios: "https://apps.apple.com/ae/app/talabat-food-grocery-more/id451001072",
    android: "https://play.google.com/store/apps/details?id=com.talabat",
    focus:
      "UAE/GCC country serviceability, restaurants, talabat mart groceries, pharmacy-adjacent blockers, pro membership, rewards, Dine Out/Pickup, order tracking, support/refunds, and regional availability",
  },
];

function h1(name) {
  return `# ${name}-Style Clone Spec`;
}

function researchSources(app) {
  return `## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
| Official product | ${app.product} | Public product positioning, service categories, ordering, worker, account, location, membership/reward, and app behavior | Verified ${verifiedDate} |
| Support/help center | ${app.support} | Public support taxonomy for account, order/activity, billing/payment, worker eligibility, provider issues, troubleshooting, and deletion/export flows | Verified ${verifiedDate} |
| Privacy policy | ${app.privacy} | Account, profile, order/work activity, location, device, advertising, analytics, support, worker, and user-rights handling | Verified ${verifiedDate} |
| Terms of service | ${app.terms} | Service usage, licensed content, payments, user/worker conduct, provider limits, regulated-flow boundaries, and legal boundaries | Verified ${verifiedDate} |
| Rewards, membership, or worker program | ${app.rewards} | Reward, membership, loyalty, worker, payout, offer, or entitlement orientation where public | Verified ${verifiedDate} |
| App Store listing | ${app.ios} | Canonical iOS listing, category, age rating, privacy label, compatibility, public feature claims, and native metadata | Verified ${verifiedDate} |
| Google Play listing | ${app.android} | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified ${verifiedDate} |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, payment, push payloads, background location, provider integrations, regional availability, worker eligibility, payout, and refund behavior | Blocked pending lawful device/store verification |`;
}

function screenRows(app) {
  const names = [
    "Welcome / Auth / Consent",
    "Home / Work Hub",
    "Region / Address / Zone Selector",
    "Merchant / Offer Browse",
    "Search / Filter Results",
    "Item / Task Detail",
    "Cart / Batch / Offer Builder",
    "Checkout / Accept / Payment",
    "Active Order / Active Task",
    "Membership / Rewards / Earnings",
    "Tracking / Navigation / Handoff",
    "Notifications / Messages",
    "Settings / Privacy",
    "Support / Refunds / Incidents",
  ];
  return names
    .map(
      (screen) =>
        `| ${screen} | Defines the ${screen.toLowerCase()} workflow for ${app.name}-inspired behavior | taps, forms, search, filters, deep links, location, payment, identity, merchant/customer/courier selection | empty, loading, loaded, signed-out, offline, entitlement-aware, region-aware | permission denied, stale state, entitlement blocked, provider failed, region unavailable, merchant closed, item unavailable, worker ineligible, payment/payout failed |`,
    )
    .join("\n");
}

function spec(app) {
  const worker = app.id >= 433 && app.id <= 438;
  const domain = worker
    ? "worker, identity, eligibility, task, merchant, customer, route, location, earnings, payout, safety, support, advertising, and marketplace data"
    : "restaurant, merchant, catalog/menu, courier, basket, payment, location, membership, promotion, analytics, support, advertising, and marketplace data";
  const risk = worker
    ? "worker classification, background/identity checks, right-to-work eligibility, vehicle/insurance checks, offer fairness, route safety, precise-location privacy, customer messaging, earnings/payout correctness, tax documents, deactivation appeals, and incident escalation"
    : "merchant/menu/price/fee freshness, delivery ETA accuracy, courier location privacy, alcohol/age/pharmacy-adjacent gates where relevant, refund/credit handling, subscription eligibility, payment/tip handling, and support escalation";
  const dataEntities = worker
    ? [
        "Worker",
        "AccountSession",
        "EligibilityProfile",
        "RegionZone",
        "VehicleDocument",
        "AvailabilityState",
        "Offer",
        "Task",
        "MerchantPickup",
        "CustomerDropoff",
        "RouteLeg",
        "EarningsLedger",
        "PayoutInstrument",
        "SafetyIncident",
        "SupportCase",
        "AppealCase",
        "AuditEvent",
        "LocalCacheRecord",
      ]
    : [
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
      ];
  return `${h1(app.name)}

> Metadata
> - Inspiration app: ${app.name}
> - Category: ${app.category}
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${verifiedDate}.
> - Verification basis: exact public first-party product, support/help, privacy, terms, reward/membership/worker-program, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account lifecycle walkthrough, identity/worker eligibility where relevant, payment/purchase/payout state, permission prompts, push notifications, provider integrations, store/merchant/courier/worker availability, catalog/menu/pricing/tax/fee correctness, reward/membership/earnings redemption, refund/order/support behavior, marketplace privacy labels beyond public listing pages, and region-specific behavior still require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary catalog/menu/product data, maps, media, private APIs, recommendation models, customer/worker data, marketplace assets, and unlicensed datasets.

## Overview

Build an original mobile product inspired by ${app.name}'s public product and policy materials. V1 focuses on ${app.focus}. The clone must use original branding, original UI copy, original sample data, licensed providers, and explicit disclosures when a feature is inferred from public materials rather than verified hands-on behavior.

This spec is implementation-ready for a public-source V1. Any behavior marked \`Manual verification required\` must stay behind a feature flag or documented blocker until lawful hands-on verification confirms exact native behavior.

## Goals

- Provide mobile onboarding, consent, account recovery, settings, support, and data lifecycle flows.
- Support ${app.focus} with clear retry, recovery, unavailable, region, entitlement, worker, and provider-aware states.
- Preserve boundaries between ${domain}.
- Implement guest, member, free, paid, expired, restored, refunded, worker-ineligible, store-owned, web-owned, provider-owned, region-blocked, and unavailable states without copying exact pricing, plan names, promotions, reward terms, or worker policies.
- Include export/delete, support/report flows, privacy controls, accessibility, and manual-verification paths before downstream implementation.
- Document provider, catalog/menu, location, payment/payout, device/permission, worker/safety, advertising, and marketplace risks before any implementation claim.

## Non-Goals

- Do not imply affiliation with ${app.name} or its publisher.
- Do not copy proprietary feeds, menus, product catalogs, prices, promotions, media, artwork, recommendation models, screenshots, icons, brand names, worker policies, or private API shapes.
- Do not send production user order, payment, payout, precise-location, loyalty, support, worker, delivery, or courier telemetry to any third-party provider without explicit consent and a documented data-processing path.
- Do not present nutrition, allergen, price, delivery-time, reward, membership, earnings, worker-status, pharmacy, or availability output as professional, medical, legal, financial, employment, tax, or safety-critical advice.
- Do not enable autonomous purchases, account changes, worker-status changes, public profile changes, regulated workflows, age-restricted purchases, delivery dispatch, payout changes, or irreversible external actions without a separate confirmation and risk review.
- Do not build runtime app code in this spec store.

${researchSources(app)}

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest or signed-out preview where allowed, account creation or restore, worker onboarding where relevant, blocked-account state, unavailable-region state, and entitlement-unavailable state.
- Home must expose the latest meaningful order, task, shopping, reward, membership, earnings, store/merchant, and support state with signed-out, loading, empty, degraded-network, and stale-data variants.
- Store, merchant, address, worker zone, or location selection must distinguish GPS, manual search, saved/favorite locations, current hours, services, pickup/delivery/worker availability where relevant, and unavailable-region states.
- Catalog, menu, product, batch, or offer browse must support categories, search, filters, availability, price/fee freshness, promotion labels, earnings/route previews where relevant, safety notes, and original sample data.
- Detail screens must show availability, provider timestamp, rights state, safety labels where relevant, save/favorite/share actions, and manual-verification warnings for native-only behavior.
- Cart, basket, list, wallet, checkout, reward, order, pickup, delivery, courier, worker task, earnings, payout, or support jobs must expose pending, active, paused, failed, canceled, expired, and recovered states.
- Payment, payout, stored-value, earnings, and reward surfaces must be server-owned and tokenized; client-only state must never decide funds, rewards, credits, refunds, tips, memberships, payouts, offer acceptance, or order dispatch.
- Settings must include profile/account, notification preferences, privacy policy, terms, support, export/delete, payment/payout or membership management, connected-provider controls, worker controls where relevant, and responsible-use controls.
- Entitlements must model guest, member, free, paid, expired, canceled, refunded, restored, worker-ineligible, store-owned, web-owned, provider-owned, quota-exhausted, region-blocked, and unavailable states.
- Analytics must avoid raw orders, payment credentials, payout credentials, precise arrival paths, loyalty identifiers, worker identifiers, support attachments, and unredacted account identifiers.
- Provider calls require scoped credentials, redacted logs, request/response retention limits, per-provider data-processing notes, retry policies, and user-visible recovery.
- Manual verification required: native permission prompts, marketplace privacy labels, payment/payout, push payloads, background location, provider integrations, regional availability, and store/merchant/courier/worker/refund behavior.
- ${app.focus} must be treated as launch-blocking behavior with owners, mitigations, acceptance tests, and manual-verification notes.
- ${risk} must be treated as a launch-blocking risk area with owner, mitigation, and acceptance tests.
- Location privacy, local offers, ad-tech, personalization, fraud prevention, worker safety, and support escalation must be treated as launch-blocking risk areas with explicit data minimization and user-visible recovery.

## Core User Journeys

- New user reviews consent, signs in or continues as guest where allowed, selects a store, merchant, address, zone, or fulfillment context, and reaches the main catalog, ordering, or work surface.
- Returning user reorders, rebuilds, repeats, accepts, or resumes a favorite workflow, applies a qualifying reward, coupon, membership, earning, or offer, and checks out or completes the task.
- User switches pickup, curbside, delivery, shipping, in-store, worker-zone, or courier mode where available and sees location-specific availability.
- User pays or receives payout with card, wallet, gift card, stored value, reward, membership benefit, split tender, tip, cashout, or provider-backed instrument where supported and handles authorization failure.
- User tracks order, pickup, delivery, courier, task, route, payout, or support status without exposing precise location unnecessarily.
- User sees item unavailable, merchant/store closed, catalog changed, fee changed, coupon invalid, substitution needed, membership blocked, worker ineligible, route unsafe, or promotion expired and can recover before consequential action.
- User requests support, refund, order correction, incident review, privacy export, or account deletion and receives durable case state.
- Manual verification required: background behavior, push payloads, OS permission prompts, marketplace labels, provider integrations, purchases/payments/payouts, worker eligibility, and regional availability.

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
- GET /regions, GET /locations, GET /locations/:id, GET /merchants, GET /catalogs/:locationId, GET /items/:id, and GET /offers.
- POST /carts, PATCH /carts/:id, POST /carts/:id/items, PATCH /carts/:id/items/:itemId, and DELETE /carts/:id/items/:itemId.
- POST /checkout/quote, POST /orders, GET /orders/:id, POST /orders/:id/cancel, and GET /orders/:id/status.
- GET /rewards, POST /rewards/enroll, POST /rewards/redeem, GET /memberships, GET /payment-instruments, and GET /payout-instruments where worker flows exist.
- GET /inventory, GET /substitutions, PATCH /substitutions/:id, GET /fulfillment-windows, GET /worker/offers, POST /worker/offers/:id/accept, and POST /arrival-checkins where fulfillment requires store, merchant, worker, or courier handoff.
- POST /support/cases, GET /support/cases/:id, POST /refund-requests, POST /incident-reports, POST /data-export, and DELETE /account.
- \`GET /privacy/settings\`, \`PATCH /privacy/settings\`, \`POST /data-export\`, and \`GET /data-export/:id\` for privacy lifecycle.
- \`GET /support/articles\`, \`POST /support/cases\`, \`GET /support/cases/:id\`, \`POST /reports\`, and \`GET /reports/:id\` for support, abuse, safety, and rights workflows.
- Provider webhook contracts must include idempotency keys, redacted payload logging, retry semantics, and canonical refetch after missed order, payment, payout, inventory, membership, worker, or delivery events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, refund/credit review, fraud hold review, payment dispute handling, worker incident/deactivation review, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, or proprietary provider schemas from ${app.name}.

## Realtime, Push, And Offline Behavior

- Recent home, catalog/menu, task, settings, entitlement, earnings, and in-progress state cache locally with explicit size, retention, and purge rules.
- Long-running jobs use polling, SSE, websocket, or provider webhook fallback and must support cancel, timeout, retry, and canonical refetch after reconnect.
- Offline mode allows safe cached reads and low-risk local drafts where allowed but blocks provider calls, billing/payment/payout changes, public publication, rights-affecting writes, profile-owner changes, age-restricted purchases, delivery dispatch, worker task acceptance, and irreversible deletes.
- Reconnect must reconcile duplicate submits through idempotency keys and show whether coupons, promotions, rewards, memberships, orders, tips, payments, payouts, or worker offers were consumed for failed/canceled attempts.
- Push notifications are opt-in by category and limited to account/security, subscription/payment/payout, support, order/task status, rewards/offers, store/merchant arrival, delivery handoff, worker safety, and moderation states.
- Background tracking, location checks, local-network/device behavior, payment authorization, payout/cashout, loyalty redemption, store check-in, courier tracking, worker route state, and cloud sync behavior are \`Manual verification required\` and must stay disabled until platform-specific evidence exists.
- Cached uploads, activity/order/task history, payment/payout references, device metadata, location history, support attachments, catalog/menu refs, and worker records purge on logout, account delete, retention expiry, policy change, rights expiry, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, precise location, approximate location, camera, media library, files, clipboard, contacts/share sheet, local network, Bluetooth, motion, background location, or provider OAuth only at feature use.
- Permission screens must state what is captured, where it is processed, how long it is retained, and what fallback remains if denied.
- Do not collect raw order histories, payment credentials, payout credentials, exact arrival trails, loyalty tokens, worker identifiers, support attachments, or private messages in analytics or crash logs.
- Provider calls must use scoped credentials, redacted logs, request/response retention limits, and per-provider data-processing notes.
- Media imports, profile images, support attachments, delivery issue photos, identity documents, and order issue photos must strip or let users control EXIF, GPS, filenames, embedded captions, contact names, and private tags before export/share.
- Menu, order, payment, payout, reward, delivery, offer, membership, worker, nutrition, allergen, pharmacy-adjacent, age-restricted, and product-safety features must block non-consensual publication, child exploitation, doxxing, harassment, impersonation, illegal content, unsafe behavior, fraud, and misleading attribution.
- Recommended, ad-targeted, factual, price, nutrition, allergen, location, earnings, ETA, or availability output must show that results can be inaccurate, delayed, sponsored, rights-limited, region-limited, age-restricted, store-limited, merchant-limited, worker-limited, or unavailable before consequential use.
- Catalog/feed libraries must preserve source, license, attribution, commercial-use, takedown, explicit-content, privacy, rating, embargo, region, store, merchant, worker, and availability restrictions in metadata.
- Support access to uploads, activity/order/task history, profile data, diagnostics, account data, and worker data requires explicit user consent and auditable staff access.
- Export/delete must cover account data, uploads, drafts, activity/order/task history, generated outputs, reports, support cases, device associations, payment/payout tokens, rewards references, membership references, and billing references where legally deletable.
- Fraud, account takeover, payment abuse, coupon/reward abuse, refund abuse, courier/merchant disputes, worker safety, alcohol/age-gated goods where relevant, and unsafe delivery instructions require explicit review queues before production launch.

## Analytics And Monetization

- Analytics events: onboarding started/completed, permission primer viewed, search performed, item opened, cart/list updated, quote viewed, order submitted/failed, offer viewed/accepted, favorite saved, report submitted, export/delete requested, payment/payout viewed, and notification preference changed.
- Event properties must use coarse category, provider capability class, latency buckets, error codes, duration buckets, ad state, entitlement/payment/payout state, and region/store/merchant/worker class only.
- Monetization may include subscriptions, memberships, service fees, convenience fees, delivery fees, rewards, stored value, gift cards, sponsored placement, retail media, marketplace commissions, tips, worker payouts, or premium fulfillment only after legal, tax, consumer-protection, labor, and disclosure review.
- Billing/payment/payout must handle app-store, web, in-store, wallet, gift-card, trial, paid, ad-supported, expired, canceled, refunded, restored, unavailable, provider-owned, quota-exhausted, payment-failed, payout-failed, tax-hold, and region-blocked states.
- Paywalls and payment gates must not block safety reporting, account recovery, export/delete, privacy settings, or access to already-created user content where legally required.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable territory, disabled catalog/provider, unsupported store/merchant/device/worker status, or blocked account.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate provider events, duplicate webhook delivery, timeout retry, and stale optimistic state.
- Licensed catalog, route, menu item, promotion, reward, price, store, merchant, provider, courier, worker offer, or order becomes unavailable, renamed, corrected, expired, geo-blocked, or takedown-blocked.
- Background tracking, order/task status, payment authorization, payout, feed refresh, score/order alert, courier tracking, or offline license refresh is interrupted by app termination.
- Subscription, membership, reward, coupon, stored value, payout, worker status, or tip renews, refunds, expires, switches owner, changes platform owner, or loses provider authorization during active use.
- User requests export/delete while jobs, reports, support cases, billing disputes, rights disputes, worker disputes, ad records, or provider logs remain active.
- Uploaded, indexed, or saved data contains child data, private conversations, health data, financial data, identity documents, copyrighted material, or third-party confidential content.
- Provider/CDN/feed/device/store/merchant/payment/payout outage occurs after the user starts an action but before canonical state is persisted.
- User attempts misleading attribution, impersonation, review abuse, non-consensual publication, copyright infringement, unsafe behavior, fraud, promotion abuse, refund abuse, courier harassment, worker harassment, or unsafe public sharing.
- Device storage fills, cache corrupts, token expires, clock skew occurs, sensor/order/task data is malformed, or reconnect creates a profile/queue conflict.
- Account, family, provider, bundle, health, territory, regulator, store, merchant, franchise, membership, worker, or device policy disables a feature after content has been cached locally.

## Test Plan

- Unit tests for state machines, entitlement/payment/payout checks, eligibility gates, idempotency keys, provider error mapping, and analytics redaction.
- Unit tests for catalog/menu validation, rights states, rating labels, retention flags, permissions, and deletion/export eligibility.
- Unit tests for profile, favorite, history, active job, provider-auth, retry gates, destructive confirmations, worker states, and license/availability propagation.
- Contract tests for auth, home, catalog/menu, jobs, billing/payment/payout, privacy, support, reports, and provider routes where scoped.
- Integration tests for onboarding -> discover/work -> detail -> order/task -> save/share -> settings/support/delete.
- Integration tests for permission denied, granted, revoked, limited access, oversized uploads, unsupported inputs, provider timeouts, worker ineligibility, and availability failures.
- Offline tests for cached reads, allowed local drafts, local queues, reconnect reconciliation, duplicate-submit prevention, and blocked unsafe writes.
- Safety tests for reports, explicit-content gates, child/profile controls, fraud, impersonation, ad disclosures, delayed/provider data, responsible-use controls, worker safety, unsafe behavior, and privacy redaction.
- Billing/payment/payout tests for trial, purchase, restore, renewal, refund, expiration, gift card, stored value, provider owner, region unavailable, quota exhausted, ad-supported, app-store-owned, web-owned, tax-hold, cashout, and payout-failed states.
- Privacy/security tests for provider request redaction, support access consent, metadata controls, log scrubbing, export, delete, retention expiry, and rights expiry.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, captions/transcripts where applicable, controls, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, purchase/payment/payout, push notifications, provider integrations, background behavior, worker eligibility, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/terms/marketplace URLs or explicit manual blockers for native marketplace evidence.
- A lawful V1 can be built with original branding, UI copy, sample content, providers, and licensed catalog/data.
- Onboarding, home, discover/work, detail, active-use/order/task, notifications, export/share, settings, support, safety report, export/delete, and entitlement/payment/payout screens are specified.
- Account, profile, provider, billing/payment/payout, support, analytics, worker, order/location/loyalty/store/merchant/courier data boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe provider, billing/payment/payout, publication, rights, profile-owner, age-restricted, delivery-dispatch, worker-task, or irreversible operations while offline.
- Safety tests cover reports, explicit content, non-consensual uploads, impersonation, ad disclosures, provider delays, responsible-use controls, worker safety, unsafe behavior, fraud, and privacy redaction.
- Manual verification blockers remain for native behavior that requires accounts, subscriptions/payments/payouts, devices, permissions, marketplace labels, geolocation, provider auth, regulated eligibility, worker eligibility, background behavior, or regional access.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active job failure, quota exhaustion, worker ineligibility, offline recovery, export/delete, billing/payment/payout restore, safety report, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact mobile marketplace privacy labels, release-note details, and native screenshots should be treated as canonical after device verification?
- Which provider(s) will power catalog data, maps/location, media, notifications, billing/payment/payout, analytics, support, recommendations, ads, courier tracking, worker eligibility, or device integrations in the original implementation?
- Which uploads, drafts, histories, diagnostics, worker records, and exports are retained for product improvement, support, abuse prevention, rights accounting, ads, labor compliance, or legal obligations?
- Which regions, ages, stores, merchants, providers, devices, profiles, worker statuses, regulators, or enterprise policies should block or alter feature availability?
- Which attribution, rating, nutrition/allergen, safety, ad-tech, location, payment, payout, refund, courier, worker, or disclosure rules are required by platform policy, rights contracts, provider contracts, regulators, or local law?
- Which hands-on flows require paid access, special hardware, background permissions, platform integrations, geolocation, payment methods, payout instruments, identity documents, real orders, age verification, courier handoff, worker handoff, or regulated review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, source notes, provider choices, legal names, rights model, eligibility model, payment/payout/location model, and feature flags for all manual blockers.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, home, discovery/work, detail, active-use/order/task, settings, support, and entitlement/payment/payout shells with original copy and licensed sample data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, data export/delete, safety/reporting flows, fraud controls, worker controls, and responsible-use gates.
- Phase 5: Complete accessibility, privacy, safety, billing/payment/payout, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before parity claims.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, background behavior, and worker/location behavior where relevant.
- Verify account, payment, payout, reward/membership, worker eligibility, store/merchant availability, order, substitution, delivery, refund, and support states with test accounts where allowed.
- Extend the Phase 5 implementation-plan queue after this ID is included in the readiness batch.
- Keep downstream scaffold repos private and label this source spec as implementation-ready only for original public-source V1 work.
`;
}

for (const app of apps) {
  writeFileSync(join(process.cwd(), "specs", "batch-22", app.file), spec(app));
}

console.log(`Promoted ${apps.length} specs in specs/batch-22.`);
