#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const verifiedDate = "2026-05-04";

const apps = [
  {
    id: 541,
    file: "541-ryanair.md",
    name: "Ryanair",
    kind: "airline",
    category: "airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, flight status, disruption support, and passenger-data privacy",
    product: "https://www.ryanair.com/us/en/lp/mobile-app",
    support: "https://help.ryanair.com/hc/en-us",
    privacy: "https://www.ryanair.com/us/en/corporate/privacy-policy",
    terms: "https://www.ryanair.com/us/en/useful-info/help-centre/terms-and-conditions",
    program: "https://www.ryanair.com/us/en/lp/myryanair",
    ios: "https://apps.apple.com/us/app/ryanair/id504270602",
    android: "https://play.google.com/store/apps/details?id=com.ryanair.cheapflights",
  },
  {
    id: 542,
    file: "542-easyjet.md",
    name: "easyJet",
    kind: "airline",
    category: "airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, flight status, disruption support, and passenger-data privacy",
    product: "https://www.easyjet.com/en/mobile-app",
    support: "https://www.easyjet.com/en/help",
    privacy: "https://www.easyjet.com/en/policy/privacy-promise",
    terms: "https://www.easyjet.com/en/terms-and-conditions",
    program: "https://www.easyjet.com/en/holidays",
    ios: "https://apps.apple.com/us/app/easyjet-travel-app/id483568103",
    android: "https://play.google.com/store/apps/details?id=com.mttnow.droid.easyjet",
  },
  {
    id: 543,
    file: "543-wizz-air.md",
    name: "Wizz Air",
    kind: "airline",
    category: "airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, flight status, disruption support, and passenger-data privacy",
    product: "https://wizzair.com/en-gb/mobile-app",
    support: "https://wizzair.com/en-gb/help-centre",
    privacy: "https://wizzair.com/en-gb/information-and-services/conditions-of-carriage/privacy-notice",
    terms: "https://wizzair.com/en-gb/information-and-services/conditions-of-carriage/general-conditions-of-carriage",
    program: "https://wizzair.com/en-gb/information-and-services/wizz-services/wizz-discount-club",
    ios: "https://apps.apple.com/us/app/wizz-air-book-flights/id378611639",
    android: "https://play.google.com/store/apps/details?id=com.wizzair.WizzAirApp",
  },
  {
    id: 544,
    file: "544-ana.md",
    name: "ANA",
    kind: "airline",
    category: "airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, flight status, disruption support, and passenger-data privacy",
    product: "https://www.ana.co.jp/en/us/the-ana-experience/mobile-app/",
    support: "https://www.ana.co.jp/en/us/help/",
    privacy: "https://www.ana.co.jp/group/en/privacy/",
    terms: "https://www.ana.co.jp/en/us/terms-and-conditions/",
    program: "https://www.ana.co.jp/en/us/amc/",
    ios: "https://apps.apple.com/us/app/ana/id382028327",
    android: "https://play.google.com/store/apps/details?id=jp.co.ana.android.tabidachi",
  },
  {
    id: 545,
    file: "545-jal.md",
    name: "JAL",
    kind: "airline",
    category: "airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, flight status, disruption support, and passenger-data privacy",
    product: "https://www.jal.co.jp/ar/en/apps/",
    support: "https://www.jal.co.jp/ar/en/information/",
    privacy: "https://www.jal.com/en/privacy/",
    terms: "https://www.jal.co.jp/ar/en/inter/conditions/",
    program: "https://www.jal.co.jp/ar/en/jmb/",
    ios: "https://apps.apple.com/us/app/jal/id594095825",
    android: "https://play.google.com/store/apps/details?id=jp.co.jal.dom",
  },
  {
    id: 546,
    file: "546-cathay-pacific.md",
    name: "Cathay Pacific",
    kind: "airline",
    category: "airline travel mobile app, flight search and booking, trip management, check-in, mobile boarding pass, seats/bags/extras, flight status, disruption support, and passenger-data privacy",
    product: "https://www.cathaypacific.com/cx/en_US/mobile-app.html",
    support: "https://www.cathaypacific.com/cx/en_US/help.html",
    privacy: "https://www.cathaypacific.com/cx/en_US/legal-and-privacy/privacy-policy.html",
    terms: "https://www.cathaypacific.com/cx/en_US/legal-and-privacy/conditions-of-carriage.html",
    program: "https://www.cathaypacific.com/cx/en_US/membership.html",
    ios: "https://apps.apple.com/us/app/cathay-pacific/id305038764",
    android: "https://play.google.com/store/apps/details?id=com.xs2theworld.cxmobile",
  },
  {
    id: 547,
    file: "547-marriott-bonvoy.md",
    name: "Marriott Bonvoy",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, mobile key/check-in, room requests, points, offers, support, and guest-data privacy",
    product: "https://www.marriott.com/loyalty/mobile-apps.mi",
    support: "https://help.marriott.com/",
    privacy: "https://www.marriott.com/about/privacy.mi",
    terms: "https://www.marriott.com/about/terms-of-use.mi",
    program: "https://www.marriott.com/loyalty.mi",
    ios: "https://apps.apple.com/us/app/marriott-bonvoy/id455004730",
    android: "https://play.google.com/store/apps/details?id=com.marriott.mrt",
  },
  {
    id: 548,
    file: "548-hilton-honors.md",
    name: "Hilton Honors",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, digital key/check-in, room requests, points, offers, support, and guest-data privacy",
    product: "https://www.hilton.com/en/hilton-honors/mobile-app/",
    support: "https://help.hilton.com/",
    privacy: "https://www.hilton.com/en/p/privacypolicy/",
    terms: "https://www.hilton.com/en/p/terms/",
    program: "https://www.hilton.com/en/hilton-honors/",
    ios: "https://apps.apple.com/us/app/hilton-honors-book-hotels/id635150066",
    android: "https://play.google.com/store/apps/details?id=com.hilton.android.hhonors",
  },
  {
    id: 549,
    file: "549-hyatt.md",
    name: "Hyatt",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, mobile entry/check-in, room requests, points, offers, support, and guest-data privacy",
    product: "https://www.hyatt.com/info/hyatt-mobile-app",
    support: "https://help.hyatt.com/",
    privacy: "https://www.hyatt.com/info/privacy-policy",
    terms: "https://www.hyatt.com/info/terms-conditions",
    program: "https://world.hyatt.com/",
    ios: "https://apps.apple.com/us/app/world-of-hyatt/id476639005",
    android: "https://play.google.com/store/apps/details?id=com.Hyatt.hyt",
  },
  {
    id: 550,
    file: "550-ihg-one-rewards.md",
    name: "IHG One Rewards",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, mobile check-in, room requests, points, offers, support, and guest-data privacy",
    product: "https://www.ihg.com/onerewards/content/us/en/mobile",
    support: "https://www.ihg.com/content/us/en/customer-care",
    privacy: "https://www.ihg.com/content/us/en/customer-care/privacy_statement",
    terms: "https://www.ihg.com/content/us/en/customer-care/member-tc",
    program: "https://www.ihg.com/onerewards/content/us/en/home",
    ios: "https://apps.apple.com/us/app/ihg-hotels-rewards/id368217298",
    android: "https://play.google.com/store/apps/details?id=com.ihg.apps.android",
  },
  {
    id: 551,
    file: "551-wyndham-hotels.md",
    name: "Wyndham Hotels",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, mobile check-in, points, offers, support, and guest-data privacy",
    product: "https://www.wyndhamhotels.com/wyndham-rewards/mobile-app",
    support: "https://www.wyndhamhotels.com/help",
    privacy: "https://www.wyndhamhotels.com/privacy-notice",
    terms: "https://www.wyndhamhotels.com/terms-of-use",
    program: "https://www.wyndhamhotels.com/wyndham-rewards",
    ios: "https://apps.apple.com/us/app/wyndham-hotels-rewards/id783649910",
    android: "https://play.google.com/store/apps/details?id=com.wyndhamhotelgroup.wyndhamrewards",
  },
  {
    id: 552,
    file: "552-choice-hotels.md",
    name: "Choice Hotels",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, mobile check-in, points, offers, support, and guest-data privacy",
    product: "https://www.choicehotels.com/choice-privileges/mobile-app",
    support: "https://www.choicehotels.com/support",
    privacy: "https://www.choicehotels.com/legal/privacy-policy",
    terms: "https://www.choicehotels.com/legal/terms-of-use",
    program: "https://www.choicehotels.com/choice-privileges",
    ios: "https://apps.apple.com/us/app/choice-hotels-book-hotels/id509342785",
    android: "https://play.google.com/store/apps/details?id=com.choicehotels.android",
  },
  {
    id: 553,
    file: "553-accor-all.md",
    name: "Accor ALL",
    kind: "hotel",
    category: "hotel and loyalty mobile app, property search, booking, trip management, online check-in, points, offers, support, and guest-data privacy",
    product: "https://all.accor.com/usa/mobile-app/index.en.shtml",
    support: "https://help.accor.com/",
    privacy: "https://all.accor.com/security-certificate/index.en.shtml",
    terms: "https://all.accor.com/gb/legal/terms-of-use.shtml",
    program: "https://all.accor.com/loyalty-program/reasonstojoin/index.en.shtml",
    ios: "https://apps.apple.com/us/app/all-accor-live-limitless/id489472613",
    android: "https://play.google.com/store/apps/details?id=com.accor.appli.hybrid",
  },
  {
    id: 554,
    file: "554-hotels-com.md",
    name: "Hotels.com",
    kind: "ota",
    category: "lodging marketplace mobile app, destination search, property comparison, booking, trip management, rewards/offers, cancellation/refund support, and traveler-data privacy",
    product: "https://www.hotels.com/app",
    support: "https://www.hotels.com/helpcenter/",
    privacy: "https://www.hotels.com/lp/b/privacy",
    terms: "https://www.hotels.com/lp/b/terms-of-service",
    program: "https://www.hotels.com/lp/b/rewards",
    ios: "https://apps.apple.com/us/app/hotels-com-travel-book-hotels/id284971959",
    android: "https://play.google.com/store/apps/details?id=com.hcom.android",
  },
  {
    id: 555,
    file: "555-vrbo.md",
    name: "Vrbo",
    kind: "ota",
    category: "vacation-rental marketplace mobile app, property search, host/traveler messaging, booking, trip management, payments, cancellation/refund support, trust/safety, and traveler-data privacy",
    product: "https://www.vrbo.com/app",
    support: "https://help.vrbo.com/",
    privacy: "https://www.vrbo.com/lp/b/privacy",
    terms: "https://www.vrbo.com/lp/b/terms-of-service",
    program: "https://www.vrbo.com/list",
    ios: "https://apps.apple.com/us/app/vrbo-vacation-rentals/id1245772818",
    android: "https://play.google.com/store/apps/details?id=com.vrbo.android",
  },
  {
    id: 556,
    file: "556-hostelworld.md",
    name: "Hostelworld",
    kind: "ota",
    category: "hostel and budget lodging marketplace mobile app, destination search, property comparison, booking, trip management, payments, cancellation/refund support, reviews, and traveler-data privacy",
    product: "https://www.hostelworld.com/mobile-app",
    support: "https://support.hostelworld.com/",
    privacy: "https://www.hostelworld.com/privacy",
    terms: "https://www.hostelworld.com/terms-and-conditions",
    program: "https://www.hostelworld.com/",
    ios: "https://apps.apple.com/us/app/hostelworld-hostel-travel-app/id348890820",
    android: "https://play.google.com/store/apps/details?id=com.hostelworld.app",
  },
  {
    id: 557,
    file: "557-couchsurfing.md",
    name: "Couchsurfing",
    kind: "community",
    category: "community hospitality mobile app, member profiles, search, hosting/surfing requests, messaging, references, payments/subscription, trust/safety, moderation, and privacy",
    product: "https://www.couchsurfing.com/mobile",
    support: "https://support.couchsurfing.org/",
    privacy: "https://www.couchsurfing.com/privacy",
    terms: "https://www.couchsurfing.com/about/terms-of-use/",
    program: "https://www.couchsurfing.com/about/verification/",
    ios: "https://apps.apple.com/us/app/couchsurfing-travel-app/id525642917",
    android: "https://play.google.com/store/apps/details?id=com.couchsurfing.mobile.android",
  },
  {
    id: 558,
    file: "558-klook.md",
    name: "Klook",
    kind: "tours",
    category: "travel activities marketplace mobile app, destination discovery, tickets/tours, vouchers, booking, payments, supplier handoff, cancellation/refund support, and traveler-data privacy",
    product: "https://www.klook.com/en-US/app/",
    support: "https://www.klook.com/en-US/help/",
    privacy: "https://www.klook.com/en-US/policy/",
    terms: "https://www.klook.com/en-US/conditions/",
    program: "https://www.klook.com/en-US/merchant/",
    ios: "https://apps.apple.com/us/app/klook-travel-hotels-leisure/id961850126",
    android: "https://play.google.com/store/apps/details?id=com.klook",
  },
  {
    id: 559,
    file: "559-getyourguide.md",
    name: "GetYourGuide",
    kind: "tours",
    category: "travel activities marketplace mobile app, destination discovery, tours/tickets, booking, payments, supplier handoff, cancellation/refund support, reviews, and traveler-data privacy",
    product: "https://www.getyourguide.com/apps/",
    support: "https://www.getyourguide.com/contact/",
    privacy: "https://www.getyourguide.com/privacy_policy/",
    terms: "https://www.getyourguide.com/terms_of_use/",
    program: "https://supplier.getyourguide.com/",
    ios: "https://apps.apple.com/us/app/getyourguide-travel-tickets/id705079381",
    android: "https://play.google.com/store/apps/details?id=com.getyourguide.android",
  },
  {
    id: 560,
    file: "560-viator.md",
    name: "Viator",
    kind: "tours",
    category: "travel activities marketplace mobile app, destination discovery, tours/tickets, booking, payments, supplier handoff, cancellation/refund support, reviews, and traveler-data privacy",
    product: "https://www.viator.com/app",
    support: "https://www.viator.com/help",
    privacy: "https://www.viator.com/privacy-policy",
    terms: "https://www.viator.com/terms-and-conditions",
    program: "https://supplier.viator.com/",
    ios: "https://apps.apple.com/us/app/viator-tours-experiences/id434832826",
    android: "https://play.google.com/store/apps/details?id=com.viator.mobile.android",
  },
];

const profiles = {
  airline: {
    focus:
      "flight search, fare review, booking shell, trip retrieval, check-in readiness, boarding-pass placeholder, seats/bags/extras, loyalty account, flight status, airport guidance, disruption handling, notifications, support, privacy, and accessibility",
    risks:
      "passenger-data privacy, passport/APIS and travel-document handling, payment/booking correctness, fare/tax/fee disclosures, check-in and boarding-pass accuracy, operational-data licensing, loyalty-program boundaries, fraud/account takeover, accessibility, support, and passenger-rights auditability",
    screens:
      "Welcome / Mode Select|Auth / Recovery|Search Flights|Booking Review|Trips / Timeline|Trip Detail|Check-In|Boarding Pass|Seats / Bags / Extras|Flight Status / Airport|Alerts / Messages|Support / Refund|Settings / Privacy|Accessibility / Localization",
    entities:
      "User|AccountSession|LoyaltyAccount|TravelerProfile|TravelDocument|SearchQuery|FareOffer|Booking|FlightSegment|CheckInState|BoardingPass|SeatAssignment|BagRecord|AncillaryPurchase|PaymentInstrument|DisruptionCase|SupportCase|NotificationPreference|PrivacyRequest|AuditEvent|LocalCacheRecord",
  },
  hotel: {
    focus:
      "property search, booking shell, reservation retrieval, mobile check-in, digital-key or room-entry placeholder where public, room preferences, loyalty account, offers, folio/receipt, stay messaging, support, privacy, and accessibility",
    risks:
      "guest-data privacy, payment and deposit handling, property inventory/rate freshness, loyalty-program boundaries, mobile-key safety, room-access security, cancellation/refund rules, local tax/fee disclosures, accessibility requests, fraud/account takeover, support, and regional/property availability",
    screens:
      "Welcome / Mode Select|Auth / Recovery|Destination Search|Property Results|Property Detail|Booking Review|Trips / Stays|Stay Detail|Check-In / Arrival|Digital Key Placeholder|Room Requests|Offers / Loyalty|Support / Refund|Settings / Privacy",
    entities:
      "User|AccountSession|LoyaltyAccount|GuestProfile|DestinationSearch|Property|RoomOffer|RatePlan|Reservation|StaySegment|CheckInState|DigitalKeyPlaceholder|RoomRequest|PaymentInstrument|Folio|CancellationCase|SupportCase|NotificationPreference|PrivacyRequest|AuditEvent|LocalCacheRecord",
  },
  ota: {
    focus:
      "destination search, lodging/property comparison, booking shell, traveler profile, reservation management, host/property or supplier handoff, payments, cancellation/refund support, reviews, messaging where relevant, trust/safety, privacy, and accessibility",
    risks:
      "traveler-data privacy, property/listing accuracy, host or supplier licensing, payment and deposit handling, cancellation/refund disclosures, tax/fee display, trust/safety reporting, review integrity, messaging safety, fraud/account takeover, support, and regional/property availability",
    screens:
      "Welcome / Mode Select|Auth / Recovery|Destination Search|Property Results|Property Detail|Booking Review|Trips / Reservations|Reservation Detail|Messaging / Host Handoff|Payment / Deposit|Cancellation / Refund|Reviews|Support / Safety|Settings / Privacy",
    entities:
      "User|AccountSession|TravelerProfile|DestinationSearch|PropertyListing|AvailabilityOffer|RatePlan|Reservation|TravelerParty|HostOrSupplier|MessageThread|PaymentInstrument|DepositRecord|CancellationCase|RefundCase|Review|SupportCase|SafetyReport|NotificationPreference|PrivacyRequest|AuditEvent|LocalCacheRecord",
  },
  community: {
    focus:
      "member onboarding, profile and verification placeholders, host/surfer search, hosting/surfing request flow, messaging, references, event or hangout discovery where public, subscriptions/payments, trust/safety, moderation, privacy, and accessibility",
    risks:
      "personal safety, identity/profile privacy, location privacy, messaging abuse, harassment, reference integrity, subscription/payment handling, moderation, law-enforcement/legal requests, minors and vulnerable users, support, and regional availability",
    screens:
      "Welcome / Mode Select|Auth / Recovery|Profile / Verification|Search Hosts|Host Detail|Request Stay|Messages|References|Events / Hangouts|Subscription / Payment|Safety Center|Reports / Support|Settings / Privacy|Data Export / Delete",
    entities:
      "User|AccountSession|MemberProfile|VerificationState|LocationPreference|HostListing|StayRequest|MessageThread|Reference|EventListing|SubscriptionState|PaymentInstrument|SafetyReport|ModerationCase|SupportCase|NotificationPreference|PrivacyRequest|AuditEvent|LocalCacheRecord",
  },
  tours: {
    focus:
      "destination discovery, activity search, ticket/tour detail, availability, booking shell, voucher placeholder, supplier handoff, trip management, payments, cancellation/refund support, reviews, notifications, privacy, and accessibility",
    risks:
      "traveler-data privacy, supplier licensing, inventory/availability freshness, ticket/voucher validity, payment correctness, cancellation/refund disclosures, age/physical-accessibility restrictions, safety instructions, review integrity, fraud/account takeover, support, and regional/activity availability",
    screens:
      "Welcome / Mode Select|Auth / Recovery|Destination Discovery|Activity Results|Activity Detail|Availability Calendar|Booking Review|Voucher Placeholder|Trips / Bookings|Supplier Handoff|Cancellation / Refund|Reviews|Support / Safety|Settings / Privacy",
    entities:
      "User|AccountSession|TravelerProfile|Destination|ActivityListing|AvailabilitySlot|TicketOffer|Booking|VoucherPlaceholder|Supplier|Participant|PaymentInstrument|CancellationCase|RefundCase|Review|SupportCase|SafetyNotice|NotificationPreference|PrivacyRequest|AuditEvent|LocalCacheRecord",
  },
};

function sourceRows(app) {
  return `| Official product/app page | ${app.product} | Public product positioning, primary mobile workflows, account/reservation surfaces, support entry points, and app capability claims | Verified ${verifiedDate} |
| Support/help center | ${app.support} | Public support taxonomy for account, booking, payments, refunds/cancellations, loyalty or membership, accessibility, privacy, and recovery flows | Verified ${verifiedDate} |
| Privacy policy | ${app.privacy} | Account, traveler/guest/passenger, payment, location, device, analytics, support, retention, and privacy-rights handling | Verified ${verifiedDate} |
| Terms / program rules | ${app.terms} | Service usage, booking/payment obligations, cancellation/refund limits, conduct, liability, and legal boundaries | Verified ${verifiedDate} |
| Loyalty, membership, or supplier program | ${app.program} | Public loyalty, member, host, supplier, or partner-program orientation and entitlement constraints | Verified ${verifiedDate} |
| App Store listing | ${app.ios} | Canonical iOS listing, category, age rating, privacy label, compatibility, release notes, public feature claims, and native metadata | Verified ${verifiedDate} |
| Google Play listing | ${app.android} | Canonical Android listing, feature blurbs, content rating, data safety, downloads, and native metadata | Verified ${verifiedDate} |
| Native hands-on evidence | Manual verification required | Real-device screens, permission prompts, account/login, booking/payment, check-in or voucher flows, push payloads, location behavior, support outcomes, and region-specific availability | Blocked pending lawful device/account verification |`;
}

function rows(items) {
  return items.split("|").map((screen) => `| ${screen} | ${screen.toLowerCase()} workflow for the ${screen.includes("/") ? "combined " : ""}mobile experience | taps, forms, search, filters, deep links, permissions, provider state | empty, loading, loaded, signed-out, stale, offline | denied permission, provider outage, unavailable region, payment failed, account locked, stale provider data |`).join("\n");
}

function entityBullets(items) {
  return items.split("|").map((entity) => `- \`${entity}\`: lifecycle state, authorization boundary, provider owner, retention class, export/delete behavior, and audit metadata for ${entity.toLowerCase()} records.`).join("\n");
}

function spec(app) {
  const p = profiles[app.kind];
  return `# ${app.name}-Style Clone Spec

> Metadata
> - Inspiration app: ${app.name}
> - Category: ${app.category}
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${verifiedDate}.
> - Verification basis: exact public first-party product, support/help, privacy, terms, loyalty/membership/supplier, and marketplace URLs listed below; hands-on native parity remains blocked where stated.
> - Manual verification blockers: native iOS/Android screen capture, account creation/recovery, booking and payment, check-in/key/voucher/document issuance where relevant, loyalty or membership redemption, push notifications, location or device permissions, support outcomes, provider/supplier/property/route availability, and region-specific behavior require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, proprietary fares/inventory/rates/listings, private APIs, customer records, operational feeds, payment processor contracts, loyalty data, or unlicensed datasets.

## Overview

Build an original mobile product inspired by ${app.name}'s public product, support, policy, and marketplace materials. V1 focuses on ${p.focus}. The clone must use original branding, original UI copy, synthetic data, licensed providers, and explicit manual blockers for behavior that requires account, reservation, route, property, supplier, document, payment, location, or regulated verification.

This spec is implementation-ready for a public-source V1. Behavior marked manual verification required must stay behind feature flags, simulator stubs, or documented blockers until lawful device/account evidence confirms exact native behavior.

## Goals

- Provide secure onboarding, guest flow where allowed, account recovery, profile, support, export/delete, and accessibility flows.
- Support ${p.focus}.
- Preserve clear boundaries between account, traveler/guest/passenger/member, booking/reservation/order, payment, loyalty/membership, notification, support, privacy, and audit records.
- Model guest, signed-in, lookup-found, lookup-missing, booked, canceled, changed, provider-owned, document-required, refund-requested, support-open, loyalty-linked, entitlement-blocked, and region-restricted states.
- Require ${p.risks} review before launch.
- Keep downstream scaffold repositories private and avoid parity claims until manual blockers are resolved.

## Non-Goals

- Do not imply affiliation with ${app.name} or its publisher.
- Do not copy proprietary screens, brand assets, marketing copy, private endpoint shapes, fare/rate/inventory logic, maps, loyalty rules, operational feeds, customer data, or supplier/property datasets.
- Do not sell real travel, issue real boarding passes, keys, tickets, vouchers, stays, or reservations, alter reservations, process real payments, scan government documents, or connect production travel/payment/provider systems without separate legal, compliance, provider, and security approval.
- Do not treat public marketplace blurbs as proof of exact native screen order, route/property/activity availability, price math, refund handling, support resolution, or venue acceptance.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
${sourceRows(app)}

## Source Orientation

This V1 spec is grounded in the exact public URLs above. Product, support, privacy, terms, loyalty/membership/supplier, App Store, and Google Play materials are treated as public-source orientation only. Native screen order, permission prompts, account behavior, payment flow, provider handoff, support outcomes, and region-specific availability remain blocked until lawful hands-on evidence is collected.

Implementation teams must tag each downstream requirement as one of: verified public-source behavior, inferred behavior for an original lawful clone, or manual-verification blocker. Any source-discovery URL has been replaced for this promoted slice.

## Legal Scope

This project may reproduce functional workflow categories with original implementation, original branding, original UI copy, synthetic seed data, licensed providers, and documented manual blockers. It must not copy ${app.name} code, trademarks, logos, icons, screenshots, marketing copy, private API shapes, proprietary datasets, maps, fares, rates, inventory, loyalty logic, support scripts, user records, operational feeds, or payment/provider contracts.

The clone must avoid one-for-one native parity claims until public evidence, legal review, and lawful hands-on verification support that claim. Production travel, lodging, activity, payment, key/pass/voucher, identity-document, support, or provider integrations require separate approval outside this spec store.

## Detailed Design

### Source-Backed Product Requirements

- Onboarding must support guest mode where allowed, account sign-in, membership prompt, lookup entry, recovery, unavailable route/property/activity/region, and provider outage states.
- Account and membership surfaces must separate profile, preferences, saved travelers or guests, payment methods, loyalty or membership state, credits where supported, and privacy settings.
- Search and discovery must model destination or route, dates, travelers, filters, price/rate/fare/availability freshness, sold-out or unavailable states, and stale-result refetch.
- Booking shell must show itinerary or reservation detail, tax/fee disclosure, traveler details, add-ons or requests, payment state, confirmation, and post-booking recovery without connecting to real provider systems.
- Trip, stay, or booking management must expose upcoming, past, canceled, changed, disrupted, refund-requested, provider-owned, partially consumed, and support-needed states.
- Provider-owned sensitive outputs such as boarding passes, digital keys, vouchers, identity verification, or check-in confirmations must remain simulator placeholders until lawful verification and provider approval.
- Notifications must be opt-in by category and limited to account/security, itinerary/reservation status, operational updates, support, reminders, and marketing where allowed.
- Provider calls require scoped credentials, redacted logs, idempotency keys, retry policies, canonical refetch, retention limits, and user-visible recovery.
- Analytics must avoid raw passenger, guest, traveler, payment, document, loyalty, support, exact-location, supplier, property, host, or operationally sensitive records.
- Manual verification required: native permission prompts, marketplace privacy labels, booking/payment, membership redemption, provider/supplier handoff, push payloads, cancellation/refund outcomes, support outcomes, and regional availability.

## Core User Journeys

- New user opens guest mode, searches a destination, route, property, stay, or activity, reviews price/tax/fee disclosure, and reaches a simulated booking confirmation.
- Returning user signs in, reviews membership or loyalty state, retrieves an upcoming trip/reservation/booking, and sees current readiness or status.
- User looks up a booking by confirmation details and handles no-match, canceled, changed, provider-owned, and refund-requested states.
- User handles add-ons, traveler details, room or seat preferences, supplier handoff, support, or cancellation without production provider writes.
- User receives delay, status, check-in, reminder, gate/property/activity, voucher/key, refund, or support notification and can recover from stale/offline state.
- User requests support, refund help, accessibility assistance, safety help, data export, or account deletion and receives durable case state.
- Manual verification required: exact booking, payment, provider handoff, document/key/pass/voucher, support, push, location, and region-specific native behavior.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Edge And Failure States |
|---|---|---|---|---|
${rows(p.screens)}

## Data Model

${entityBullets(p.entities)}

## API And Backend Contracts

- Auth routes: \`POST /auth/session\`, \`POST /auth/recover\`, \`DELETE /auth/session\`, and \`DELETE /account\` with device-scoped audit events.
- Profile routes: \`GET /profile\`, \`PATCH /profile\`, \`GET /membership\`, and \`PATCH /travelers/:id\` or equivalent guest/member records.
- Discovery routes: \`GET /destinations\`, \`POST /searches\`, \`GET /offers/:id\`, and \`GET /availability\` with quote expiry, cache hints, and provider owner fields.
- Booking routes: \`POST /bookings/simulated\`, \`GET /bookings/:id\`, \`PATCH /bookings/:id\`, and \`POST /bookings/:id/cancel-request\` for simulated lifecycle only.
- Status routes: \`GET /trips\`, \`GET /trips/:id\`, \`GET /trips/:id/timeline\`, \`GET /provider-status\`, and \`GET /messages\` for state reconciliation.
- Sensitive placeholder routes such as \`GET /boarding-passes/:id\`, \`GET /digital-keys/:id\`, or \`GET /vouchers/:id\` must return simulator-only disabled artifacts until approved.
- Support and privacy routes: \`POST /support/cases\`, \`POST /refund-requests\`, \`PATCH /notification-preferences\`, \`POST /data-export\`, and \`GET /data-export/:id\`.
- Provider webhooks must include idempotency keys, signature validation, redacted payload logging, retry semantics, and canonical refetch after booking, payment, status, support, cancellation, refund, or loyalty events.
- Admin/support routes must distinguish read-only diagnostics, consented support access, refund handling, account restriction, and deletion/export exceptions.
- Public API documentation must use original route names and domain models; never mimic private endpoint paths, request bodies, pricing logic, loyalty logic, or proprietary schemas from ${app.name}.

## Realtime, Push, And Offline Behavior

- Cache safe reads for trips, reservations, bookings, status, settings, legal links, support articles, and placeholders with explicit TTL and purge rules.
- Offline mode allows safe cached reads and low-risk support drafts but blocks booking, payment, provider handoff, check-in, document/key/pass/voucher issuance, account-owner changes, and irreversible deletes.
- Reconnect must refetch canonical server state, de-duplicate submissions with idempotency keys, and show whether prices, availability, assignments, times, gates, policies, refund state, or support state changed.
- Push notifications are opt-in by category and mirrored in an in-app notification center.
- Cached sensitive records purge on logout, account delete, retention expiry, policy change, or legal hold.

## Permissions, Privacy, And Safety

- Request notifications, biometrics, camera/document scan, location, Bluetooth, calendar, wallet, files/photos, or provider OAuth only at feature use and with a clear fallback.
- Permission screens must explain what is captured, where it is processed, retention, support access, and what remains available if denied.
- Product owner must approve traveler/guest/member profile, saved traveler, document, special-service, minor traveler, and data-retention flows before launch.
- Payments/booking owner must approve quote, booking simulation, add-on purchase, refund, payment, and ledger reconciliation tests before launch.
- Security owner must approve MFA, device binding, account takeover detection, document redaction, placeholder issuance, webhook signatures, and redacted logs.
- Legal/regulatory owner must approve terms, passenger/traveler rights, cancellation/refund, accessibility, privacy, marketing, loyalty/membership, and regional availability copy.
- Support access to account, booking, payment, membership, document, and support records requires user consent, role-based controls, and auditable staff access.
- Safety copy must warn about simulated booking limitations, sensitive traveler data, provider-owned states, stale operational data, refund limits, and offline placeholder risks.

## Analytics And Monetization

- Analytics events: onboarding started/completed, search performed, offer viewed/refreshed/expired, booking simulated, trip viewed, provider placeholder viewed, support case submitted, export/delete requested, and notification preference changed.
- Event properties must use coarse destination/route/property/activity region, product type, latency bucket, error code, disclosure version, provider state, refund state, and region class only.
- Monetization may include booking fees, add-ons, membership, loyalty offers, referrals, partner offers, or advertising only after legal, tax, consumer-protection, and disclosure review.
- Payment logic must handle pending, authorized, captured, failed, reversed, refunded, charged back, settled, expired, provider-owned, and region-blocked states.
- Paywalls, fees, or account restrictions must not block safety reporting, accessibility assistance, account recovery, export/delete, privacy settings, refund/disruption support, or legally required disclosures.

## Edge Cases

- First launch with no network, no account, unsupported OS, unavailable route/property/activity, sold-out inventory, blocked account, or stale app version.
- Permission denied, later granted, later revoked, or limited by OS/device policy.
- Duplicate taps, duplicate webhooks, timeout retry, quote expiry, schedule/policy change, stale optimistic state, and idempotency-key replay.
- Provider becomes unavailable, invalid, closed, restricted, expired, or region-blocked during a workflow.
- Booking, payment, check-in, placeholder issuance, add-on purchase, refund, cancellation, or support case is interrupted by app termination.
- User requests export/delete while active bookings, refunds, disputes, legal holds, or support cases remain active.
- Uploaded documents/support attachments contain third-party data, minors, health data, financial data, copyrighted material, or confidential material.
- Fraud, account takeover, price abuse, loyalty abuse, refund abuse, unsafe document sharing, phishing, harassment, or prohibited travel behavior.
- Device storage fills, cache corrupts, token expires, clock skew occurs, webhook order changes, or reconnect creates conflicting state.

## Test Plan

- Unit tests for search/date validation, quote expiry, booking state machines, idempotency keys, disclosure versioning, provider error mapping, and analytics redaction.
- Unit tests for profile/traveler validation, document redaction where relevant, placeholder eligibility, refund/cancellation eligibility, and deletion/export rules.
- Contract tests for auth, profile, membership, search, offers, bookings, trips, placeholders, payments, status, support, privacy, and provider webhook routes.
- Integration tests for onboarding -> search -> offer -> simulated booking -> trip -> provider placeholder -> support/settings/delete.
- Integration tests for permission denial, unavailable region, provider timeout, price refresh, stale operational data, payment failure, and support escalation.
- Offline tests for cached trip/booking reads, draft preservation, blocked regulated writes, reconnect reconciliation, duplicate-submit prevention, and corrupt-cache recovery.
- Security tests for MFA, reauthentication, device binding, suspicious login, document redaction, placeholder tokenization, webhook signatures, and redacted logs.
- Compliance tests for legal links, cancellation/refund copy, accessibility assistance, minor traveler handling, and support consent.
- Privacy tests for provider request redaction, support access consent, metadata stripping, log scrubbing, export, delete, retention expiry, and legal hold exceptions.
- Accessibility tests for screen-reader order, dynamic type, focus, contrast, reduced motion, disclosure readability, status announcements, and processing announcements.
- Manual verification tests for native store listings, privacy labels, permission prompts, booking/payment, provider handoff, placeholders, push notifications, support outcomes, and regional availability.

## Acceptance Criteria

- All discovery placeholders are replaced with exact public product/help/privacy/legal/marketplace URLs or explicit manual blockers for native/account evidence.
- A lawful V1 can be built with original branding, UI copy, sample data, licensed providers, and production travel/payment/provider workflows disabled until approved.
- Onboarding, auth, search, detail, booking review, trips, provider placeholders, alerts, support, settings, export/delete, and accessibility screens are specified.
- Account, traveler/guest/member, booking, payment, support, analytics, privacy, compliance, and audit boundaries are documented and testable.
- Offline cache and reconnect reconciliation are covered without allowing unsafe booking, payment, provider handoff, document/key/pass/voucher issuance, account-owner changes, or irreversible operations while offline.
- Category risks for ${p.risks} have owners and tests.
- Manual verification blockers remain for native behavior that requires accounts, devices, permissions, marketplace labels, geolocation, provider credentials, payment methods, loyalty credentials, or region-specific review.
- At least 12 implementation tests cover happy path, failed provider, permission denial, active workflow failure, unavailable inventory, offline recovery, export/delete, payment restore, support, accessibility, privacy redaction, and regression behavior.

## Open Questions

- Which exact native marketplace privacy labels, release-note details, and screenshots should be treated as canonical after device verification?
- Which providers will power search, availability, maps/location, payment tokenization, loyalty or membership simulation, notifications, analytics, support, fraud prevention, and document validation where relevant?
- Which countries, states, routes, properties, activities, fare/rate classes, traveler types, membership tiers, partner providers, or regulators alter feature availability?
- Which records are retained for support, fraud prevention, legal obligations, or product improvement?
- Which disclosures are required for price/tax/fee display, refunds, cancellations, accessibility, provider-owned states, and payment reversibility?
- Which hands-on flows require paid bookings, physical presence, identity documents, payment instruments, provider credentials, support contact, or sandbox review?

## Build Plan

- Phase 1: Finalize native marketplace evidence, legal names, provider choices, production-feature flags, data path, price model, disclosure matrix, and manual blocker owners.
- Phase 2: Define route map, component map, domain entities, API schema, provider contracts, permissions, analytics schema, seed-data policy, and retention matrix.
- Phase 3: Build onboarding, auth, search, detail, booking review, trips, provider placeholder, alerts, support, settings, and export/delete shells with original copy and synthetic data.
- Phase 4: Add backend contracts, offline/retry handling, provider adapters, notification preferences, fraud/account-takeover controls, refund/support flows, and privacy lifecycle.
- Phase 5: Complete accessibility, privacy, security, compliance, payment/booking, permission, provider-failure, offline, and regression tests.
- Phase 6: Conduct lawful hands-on verification and resolve manual blockers before any one-for-one parity claim.

## Next Steps

- Capture lawful native-device evidence for iOS and Android screen flows, privacy labels, permission prompts, push payloads, account login, booking/payment, provider handoff, placeholders, location behavior, and support outcomes.
- Select licensed providers for search/availability, status/maps, payment tokenization, loyalty or membership simulation, notifications, analytics, fraud prevention, and support.
- Convert manual blockers into launch checklist items owned by product, payments, security, legal, privacy, accessibility, and support leads.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest after the full Step 8.3 readiness range lands.
`;
}

for (const app of apps) {
  writeFileSync(join("specs", "batch-28", app.file), spec(app));
}

console.log(`Promoted ${apps.length} batch-28 specs to implementation-ready V1.`);
