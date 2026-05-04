#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const verifiedDate = "2026-05-04";

const apps = [
  {
    id: 441,
    file: "441-mr-d-food.md",
    name: "Mr D Food",
    category: "South Africa convenience, restaurant, grocery, Pick n Pay, TakealotNow, liquor-adjacent delivery, checkout, tracking, and support",
    product: "https://www.mrd.com/",
    support: "https://help.mrd.com/",
    privacy: "https://www.mrd.com/privacy-policy",
    terms: "https://www.mrd.com/terms-and-conditions",
    program: "https://www.mrd.com/",
    ios: "https://apps.apple.com/us/app/mr-d-groceries-takeaway/id1031141698",
    android: "https://play.google.com/store/apps/details?id=com.mrd.food",
    focus:
      "South Africa area serviceability, restaurants, Pick n Pay groceries, TakealotNow retail, Smart Shopper-style loyalty capture, payment methods, live courier tracking, refund/support, and age/pharmacy-adjacent blockers",
    vertical: "delivery",
  },
  {
    id: 442,
    file: "442-best-buy.md",
    name: "Best Buy",
    category: "electronics retail, marketplace sellers, product discovery, curbside pickup, order tracking, membership offers, service appointments, returns, and reviews",
    product: "https://www.bestbuy.com/",
    support: "https://www.bestbuy.com/site/help-topics/customer-service/pcmcat87800050001.c",
    privacy: "https://www.bestbuy.com/site/help-topics/privacy-policy/pcmcat204400050062.c",
    terms: "https://www.bestbuy.com/site/help-topics/conditions-of-use/pcmcat204400050067.c",
    program: "https://www.bestbuy.com/site/memberships/my-best-buy-memberships/pcmcat1679668710293.c",
    ios: "https://apps.apple.com/us/app/best-buy-shop-tech-deals/id314855255",
    android: "https://play.google.com/store/apps/details?id=com.bestbuy.android",
    focus:
      "electronics catalog search, product details, store inventory, curbside pickup, delivery, marketplace seller disclosure, membership deals, price-match support, returns, reviews, and service appointments",
    vertical: "electronics",
  },
  {
    id: 443,
    file: "443-home-depot.md",
    name: "Home Depot",
    category: "home improvement retail, store inventory, aisle/bay locator, image/barcode search, local ads, cart, checkout, pickup, delivery, rentals/services, and returns",
    product: "https://www.homedepot.com/",
    support: "https://www.homedepot.com/c/customer_service",
    privacy: "https://www.homedepot.com/privacy/privacy-and-security-statement",
    terms: "https://www.homedepot.com/c/Terms_of_Use",
    program: "https://www.homedepot.com/c/Pro_Xtra",
    ios: "https://apps.apple.com/us/app/the-home-depot/id342527639",
    android: "https://play.google.com/store/apps/details?id=com.thehomedepot",
    focus:
      "store selection, catalog discovery, image and barcode search, product details, local inventory, aisle/bay guidance, cart/checkout, pickup/delivery, Pro account surfaces, rentals/services blockers, returns, and local ads",
    vertical: "home improvement",
  },
  {
    id: 444,
    file: "444-lowe-s.md",
    name: "Lowe's",
    category: "home improvement retail, store inventory, product search, barcode scan, shopping lists, pickup, delivery, rewards, installation/services, returns, and support",
    product: "https://www.lowes.com/",
    support: "https://www.lowes.com/l/help",
    privacy: "https://www.lowes.com/l/about/privacy-and-security-statement",
    terms: "https://www.lowes.com/l/terms-and-conditions",
    program: "https://www.lowes.com/l/loyalty",
    ios: "https://apps.apple.com/us/app/lowes-home-improvement/id457954781",
    android: "https://play.google.com/store/apps/details?id=com.lowes.android",
    focus:
      "local store selection, product search, barcode scan, inventory, project lists, pickup/delivery, rewards/member pricing, installation/services blockers, order status, returns, and support",
    vertical: "home improvement",
  },
  {
    id: 445,
    file: "445-ikea.md",
    name: "IKEA",
    category: "furniture and home retail, room inspiration, product catalog, store inventory, family membership, cart, delivery/pickup, planning tools, and returns",
    product: "https://www.ikea.com/us/en/",
    support: "https://www.ikea.com/us/en/customer-service/",
    privacy: "https://www.ikea.com/us/en/customer-service/privacy-policy/",
    terms: "https://www.ikea.com/us/en/customer-service/terms-conditions/",
    program: "https://www.ikea.com/us/en/ikea-family/",
    ios: "https://apps.apple.com/us/app/ikea/id1452164827",
    android: "https://play.google.com/store/apps/details?id=com.ingka.ikea.app",
    focus:
      "room inspiration, product catalog, dimensions/materials, store inventory, IKEA Family-style membership, cart, delivery/pickup, planning-tool handoffs, returns, and assembly/service blockers",
    vertical: "furniture",
  },
  {
    id: 446,
    file: "446-wayfair.md",
    name: "Wayfair",
    category: "home goods marketplace, furniture catalog, visual search, room planning, 3D/AR preview, cart, delivery tracking, returns, and seller/provider support",
    product: "https://www.wayfair.com/",
    support: "https://www.wayfair.com/help/",
    privacy: "https://www.wayfair.com/privacy_policy",
    terms: "https://www.wayfair.com/terms",
    program: "https://www.wayfair.com/wayfair-professional/",
    ios: "https://apps.apple.com/us/app/wayfair-shop-all-things-home/id836767708",
    android: "https://play.google.com/store/apps/details?id=com.wayfair.wayfair",
    focus:
      "home catalog discovery, visual search, room inspiration, 3D/AR preview blockers, product variants, delivery estimates, assembly/provider handoffs, returns, seller/support cases, and sponsored placement disclosure",
    vertical: "furniture",
  },
  {
    id: 447,
    file: "447-kohl-s.md",
    name: "Kohl's",
    category: "department store retail, rewards, coupons, wallet, product catalog, store pickup, shipping, returns, and account support",
    product: "https://www.kohls.com/",
    support: "https://cs.kohls.com/",
    privacy: "https://www.kohls.com/feature/privacy-policy.jsp",
    terms: "https://www.kohls.com/feature/terms-conditions.jsp",
    program: "https://www.kohls.com/feature/kohls-rewards.jsp",
    ios: "https://apps.apple.com/us/app/kohls-shopping-discounts/id472014516",
    android: "https://play.google.com/store/apps/details?id=com.kohls.mcommerce.opal",
    focus:
      "department-store catalog discovery, coupons, rewards, wallet, product details, store pickup, shipping, order status, returns, card/account blockers, and support",
    vertical: "department store",
  },
  {
    id: 448,
    file: "448-macy-s.md",
    name: "Macy's",
    category: "department store retail, deals, Star Rewards, wallet/offers, product catalog, pickup, shipping, registry/gift services, returns, and support",
    product: "https://www.macys.com/",
    support: "https://customerservice-macys.com/",
    privacy: "https://www.macys.com/s/privacy-policy",
    terms: "https://www.macys.com/s/terms-and-conditions",
    program: "https://www.macys.com/s/star-rewards",
    ios: "https://apps.apple.com/us/app/macys-shopping-and-deals/id341036067",
    android: "https://play.google.com/store/apps/details?id=com.macys.android",
    focus:
      "department-store browse/search, deals, Star Rewards-style membership, wallet/offers, product variants, pickup/shipping, registry/gift services blockers, returns, and support",
    vertical: "department store",
  },
  {
    id: 449,
    file: "449-nordstrom.md",
    name: "Nordstrom",
    category: "fashion department store retail, Nordy Club, stylist/services, product catalog, wishlist, pickup, shipping, returns, and support",
    product: "https://www.nordstrom.com/",
    support: "https://www.nordstrom.com/browse/customer-service",
    privacy: "https://www.nordstrom.com/browse/customer-service/policy/privacy",
    terms: "https://www.nordstrom.com/browse/customer-service/policy/terms-conditions",
    program: "https://www.nordstrom.com/browse/nordy-club",
    ios: "https://apps.apple.com/us/app/nordstrom-shopping-fashion/id474349412",
    android: "https://play.google.com/store/apps/details?id=com.nordstrom.app",
    focus:
      "fashion catalog discovery, product variants, wishlist, Nordy Club-style rewards, stylist/service appointment blockers, pickup/shipping, returns, purchase history, and support",
    vertical: "fashion",
  },
  {
    id: 450,
    file: "450-sephora.md",
    name: "Sephora",
    category: "beauty retail, Beauty Insider, product discovery, shade tools, virtual try-on, reviews, cart, pickup/shipping, returns, and services",
    product: "https://www.sephora.com/",
    support: "https://www.sephora.com/beauty/customer-service",
    privacy: "https://www.sephora.com/beauty/privacy-policy",
    terms: "https://www.sephora.com/beauty/terms-of-use",
    program: "https://www.sephora.com/profile/BeautyInsider",
    ios: "https://apps.apple.com/us/app/sephora-buy-makeup-skincare/id393328150",
    android: "https://play.google.com/store/apps/details?id=com.sephora",
    focus:
      "beauty catalog discovery, shade/skin preferences, virtual try-on blockers, Beauty Insider-style rewards, product reviews, samples/offers, pickup/shipping, returns, services, and support",
    vertical: "beauty",
  },
  {
    id: 451,
    file: "451-ulta-beauty.md",
    name: "Ulta Beauty",
    category: "beauty retail, Ultamate Rewards, product discovery, virtual try-on, services, coupons, pickup/shipping, returns, and support",
    product: "https://www.ulta.com/",
    support: "https://www.ulta.com/guestservices/",
    privacy: "https://www.ulta.com/company/privacy",
    terms: "https://www.ulta.com/company/terms-and-conditions",
    program: "https://www.ulta.com/rewards/",
    ios: "https://apps.apple.com/us/app/ulta-beauty-makeup-skincare/id561930308",
    android: "https://play.google.com/store/apps/details?id=com.ulta",
    focus:
      "beauty catalog search, offers/coupons, Ultamate Rewards-style points, virtual try-on blockers, salon/service appointment blockers, pickup/shipping, returns, product reviews, and support",
    vertical: "beauty",
  },
  {
    id: 452,
    file: "452-nike.md",
    name: "Nike",
    category: "athletic retail, member access, product launches, SNKRS-adjacent drops, favorites, cart, checkout, pickup/shipping, returns, and support",
    product: "https://www.nike.com/",
    support: "https://www.nike.com/help/",
    privacy: "https://agreementservice.svs.nike.com/us/en_us/rest/agreement?agreementType=privacyPolicy",
    terms: "https://agreementservice.svs.nike.com/us/en_us/rest/agreement?agreementType=termsOfUse",
    program: "https://www.nike.com/membership",
    ios: "https://apps.apple.com/us/app/nike-shoes-apparel-stories/id1095459556",
    android: "https://play.google.com/store/apps/details?id=com.nike.omega",
    focus:
      "Nike member onboarding, product discovery, size/color variants, launch/drop access blockers, favorites, cart/checkout, pickup/shipping, returns, activity-app handoffs, and support",
    vertical: "athletic retail",
  },
  {
    id: 453,
    file: "453-adidas.md",
    name: "Adidas",
    category: "athletic retail, adiClub, product launches, confirmed/drop handoffs, favorites, cart, checkout, pickup/shipping, returns, and support",
    product: "https://www.adidas.com/us",
    support: "https://www.adidas.com/us/help",
    privacy: "https://www.adidas.com/us/privacy_policy",
    terms: "https://www.adidas.com/us/terms_and_conditions",
    program: "https://www.adidas.com/us/adiclub",
    ios: "https://apps.apple.com/us/app/adidas-shoes-clothing/id1266591536",
    android: "https://play.google.com/store/apps/details?id=com.adidas.app",
    focus:
      "athletic product discovery, adiClub-style rewards, product launch and confirmed/drop blockers, size/color variants, favorites, cart/checkout, delivery/returns, and support",
    vertical: "athletic retail",
  },
  {
    id: 454,
    file: "454-zara.md",
    name: "Zara",
    category: "fashion retail, new arrivals, store stock, barcode/scan, favorites, cart, checkout, pickup/shipping, returns, and support",
    product: "https://www.zara.com/us/",
    support: "https://www.zara.com/us/en/help-center",
    privacy: "https://www.zara.com/us/en/privacy-policy-c1118.html",
    terms: "https://www.zara.com/us/en/terms-and-conditions-c1117.html",
    program: "https://www.zara.com/us/",
    ios: "https://apps.apple.com/us/app/zara/id547951480",
    android: "https://play.google.com/store/apps/details?id=com.inditex.zara",
    focus:
      "fashion catalog discovery, new arrivals, store stock, barcode/scan blockers, favorites, cart/checkout, pickup/shipping, returns, country-specific catalog, and support",
    vertical: "fashion",
  },
  {
    id: 455,
    file: "455-handm.md",
    name: "H&M",
    category: "fashion retail, member offers, product discovery, store mode, scan/search, favorites, cart, checkout, pickup/shipping, returns, and support",
    product: "https://www2.hm.com/en_us/index.html",
    support: "https://www2.hm.com/en_us/customer-service.html",
    privacy: "https://www2.hm.com/en_us/customer-service/legal-and-privacy/privacy-notice.html",
    terms: "https://www2.hm.com/en_us/customer-service/legal-and-privacy/terms-and-conditions.html",
    program: "https://www2.hm.com/en_us/member.html",
    ios: "https://apps.apple.com/us/app/h-m-we-love-fashion/id834465911",
    android: "https://play.google.com/store/apps/details?id=com.hm.goe",
    focus:
      "fashion product discovery, member offers, favorites, store mode, barcode/visual search blockers, cart/checkout, pickup/shipping, returns, sustainability claims review, and support",
    vertical: "fashion",
  },
  {
    id: 456,
    file: "456-uniqlo.md",
    name: "Uniqlo",
    category: "fashion basics retail, membership, product catalog, inventory, scan, favorites, cart, checkout, pickup/shipping, returns, and support",
    product: "https://www.uniqlo.com/us/en/",
    support: "https://faq-us.uniqlo.com/",
    privacy: "https://www.uniqlo.com/us/en/privacy-policy",
    terms: "https://www.uniqlo.com/us/en/terms-of-use",
    program: "https://www.uniqlo.com/us/en/membership",
    ios: "https://apps.apple.com/us/app/uniqlo-us/id1268497089",
    android: "https://play.google.com/store/apps/details?id=com.uniqlo.usa.catalogue",
    focus:
      "fashion basics catalog, size/color inventory, membership barcode, store inventory, scan/search blockers, favorites, cart/checkout, pickup/shipping, returns, and support",
    vertical: "fashion",
  },
  {
    id: 457,
    file: "457-lululemon.md",
    name: "Lululemon",
    category: "athletic apparel retail, membership/community, product catalog, store inventory, favorites, cart, checkout, pickup/shipping, returns, and support",
    product: "https://shop.lululemon.com/",
    support: "https://shop.lululemon.com/contact-us",
    privacy: "https://shop.lululemon.com/legal/privacy",
    terms: "https://shop.lululemon.com/legal/terms-of-use",
    program: "https://shop.lululemon.com/membership",
    ios: "https://apps.apple.com/us/app/lululemon/id1496739665",
    android: "https://play.google.com/store/apps/details?id=com.lululemon.shop",
    focus:
      "athletic apparel discovery, fit/size variants, store inventory, membership/community blockers, favorites, cart/checkout, pickup/shipping, returns, events/classes handoffs, and support",
    vertical: "athletic retail",
  },
  {
    id: 458,
    file: "458-goat.md",
    name: "GOAT",
    category: "sneaker and apparel resale marketplace, buyer/seller accounts, listings, authentication, offers, checkout, shipping, returns, fraud, and support",
    product: "https://www.goat.com/",
    support: "https://support.goat.com/",
    privacy: "https://www.goat.com/privacy",
    terms: "https://www.goat.com/terms",
    program: "https://www.goat.com/sell",
    ios: "https://apps.apple.com/us/app/goat-sneakers-apparel/id966758561",
    android: "https://play.google.com/store/apps/details?id=com.airgoat.goat",
    focus:
      "sneaker/apparel marketplace discovery, buyer accounts, seller listings, authenticity review blockers, offers, checkout, shipping, returns, fraud holds, payout/tax blockers, and support",
    vertical: "resale",
  },
  {
    id: 459,
    file: "459-grailed.md",
    name: "Grailed",
    category: "menswear resale marketplace, buyer/seller profiles, listings, offers, messaging, authentication, payments, shipping, returns/disputes, and moderation",
    product: "https://www.grailed.com/",
    support: "https://help.grailed.com/",
    privacy: "https://www.grailed.com/privacy",
    terms: "https://www.grailed.com/about/terms",
    program: "https://www.grailed.com/sell",
    ios: "https://apps.apple.com/us/app/grailed-buy-sell-fashion/id935703943",
    android: "https://play.google.com/store/apps/details?id=com.grailed",
    focus:
      "resale marketplace browse/search, buyer/seller profiles, listings, offers, messaging, authentication blockers, payments, shipping, returns/disputes, trust/safety, and moderation",
    vertical: "resale",
  },
  {
    id: 460,
    file: "460-mercari.md",
    name: "Mercari",
    category: "consumer resale marketplace, listings, search, buyer/seller profiles, offers, messaging, payments, shipping, returns, ratings, and support",
    product: "https://www.mercari.com/",
    support: "https://www.mercari.com/us/help_center/",
    privacy: "https://www.mercari.com/us/privacy/",
    terms: "https://www.mercari.com/us/tos/",
    program: "https://www.mercari.com/us/sell/",
    ios: "https://apps.apple.com/us/app/mercari-buy-sell-things/id896130944",
    android: "https://play.google.com/store/apps/details?id=com.mercariapp.mercari",
    focus:
      "consumer marketplace discovery, listing creation, buyer/seller profiles, offers, messaging, payments, shipping labels, returns/disputes, ratings, prohibited-goods moderation, and support",
    vertical: "resale",
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
  const names = [
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
  const home = app.vertical === "home improvement" || app.vertical === "furniture";
  const domain = resale
    ? "buyer, seller, listing, authenticity, payment, payout, shipping, returns, disputes, moderation, advertising, and marketplace data"
    : delivery
      ? "restaurant, merchant, catalog/menu, courier, basket, payment, location, loyalty, promotion, analytics, support, advertising, and delivery marketplace data"
      : "customer, account, store, product catalog, inventory, pricing, offer, payment, fulfillment, return, loyalty, service, advertising, and retail data";
  const risk = resale
    ? "counterfeit/authenticity review, prohibited goods, seller fraud, buyer fraud, chargebacks, payout holds, tax reporting, listing moderation, harassment in messaging, shipping disputes, and return abuse"
    : delivery
      ? "merchant/menu/price/fee freshness, delivery ETA accuracy, courier location privacy, age/pharmacy-adjacent gates, refund/credit handling, loyalty eligibility, payment/tip handling, and support escalation"
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
  writeFileSync(join(process.cwd(), "specs", "batch-23", app.file), spec(app));
}

console.log(`Promoted ${apps.length} specs in specs/batch-23.`);
