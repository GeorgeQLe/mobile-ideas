#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const today = "2026-05-04";

const apps = [
  {
    id: 561,
    file: "561-tripadvisor.md",
    name: "Tripadvisor",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/tripadvisor-plan-book-trips/id284876795",
    play: "https://play.google.com/store/apps/details?id=com.tripadvisor.tripadvisor",
    product: "https://www.tripadvisor.com/",
    help: "https://www.tripadvisorsupport.com/",
    privacy: "https://tripadvisor.mediaroom.com/us-privacy-policy",
    terms: "https://tripadvisor.mediaroom.com/us-terms-of-use",
    focus: "reviews-led trip planning, lodging and activity search, saved trips, booking handoff, traveler rewards, itinerary organization, notifications, support, and moderation",
    manual: "native saved-trip and itinerary flows, reward accrual/redemption, hotel/experience booking handoff, user review/report moderation, payment/refund states, location prompts, push alerts, and region-specific inventory",
    screens: ["Trip Inspiration", "Search", "Place Results", "Hotel Detail", "Things To Do Detail", "Restaurant Detail", "Trip Planner", "Booking Handoff", "Traveler Reviews", "Rewards Wallet", "Messages/Alerts", "Support"],
    entities: ["Destination", "Place", "HotelOffer", "ExperienceOffer", "Restaurant", "Review", "TripPlan", "SavedItem", "BookingReferral", "RewardLedger"],
  },
  {
    id: 562,
    file: "562-rome2rio.md",
    name: "Rome2Rio",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/rome2rio-trip-planner/id569793256",
    play: "https://play.google.com/store/apps/details?id=com.rome2rio.www",
    product: "https://www.rome2rio.com/",
    help: "https://support.rome2rio.com/hc/en-us",
    privacy: "https://www.rome2rio.com/privacy-policy/",
    terms: "https://www.rome2rio.com/terms/",
    focus: "multi-modal route discovery, fare and duration comparison, transit/operator handoff, itinerary planning, map exploration, booking links, and route freshness",
    manual: "operator booking handoff, live timetable freshness, fare accuracy, deep links, account history, location prompts, offline route behavior, and regional transport coverage",
    screens: ["Route Search", "Origin/Destination Picker", "Route Comparison", "Route Detail", "Operator Handoff", "Map", "Saved Trips", "Timetable", "Fare Detail", "Nearby", "Alerts", "Support"],
    entities: ["RouteQuery", "RouteOption", "TransportLeg", "Operator", "FareEstimate", "Schedule", "Station", "Place", "SavedRoute", "BookingLink"],
  },
  {
    id: 563,
    file: "563-skyscanner.md",
    name: "Skyscanner",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/skyscanner-flights-travel/id415458524",
    play: "https://play.google.com/store/apps/details?id=net.skyscanner.android.main",
    product: "https://www.skyscanner.com/",
    help: "https://help.skyscanner.net/hc/en-us",
    privacy: "https://www.skyscanner.net/privacy-policy",
    terms: "https://www.skyscanner.net/terms-of-service",
    focus: "flight, hotel, and car search, price comparison, flexible-date exploration, alerts, booking-provider handoff, trip planning, and partner-price freshness",
    manual: "provider redirect accuracy, fare/fee freshness, price alert delivery, traveler profile state, booking partner support, payment handoff, and region/currency availability",
    screens: ["Explore", "Flight Search", "Flight Results", "Flight Detail", "Hotel Search", "Car Search", "Price Alerts", "Trip Planner", "Provider Handoff", "Saved Searches", "Notifications", "Support"],
    entities: ["SearchQuery", "FlightOffer", "FareCalendar", "HotelOffer", "CarOffer", "Provider", "PriceAlert", "Trip", "TravelerProfile", "ReferralSession"],
  },
  {
    id: 564,
    file: "564-kayak.md",
    name: "KAYAK",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/kayak-flights-hotels-cars/id305204535",
    play: "https://play.google.com/store/apps/details?id=com.kayak.android",
    product: "https://www.kayak.com/",
    help: "https://www.kayak.com/help",
    privacy: "https://www.kayak.com/privacy",
    terms: "https://www.kayak.com/terms-of-use",
    focus: "travel metasearch across flights, hotels, cars, vacation rentals, trips, price alerts, flight tracking, offline itinerary access, and provider handoff",
    manual: "Trips inbox sync, flight tracker alerts, bag-measure camera flow, provider redirect accuracy, price-change behavior, payment handoff, and regional partner inventory",
    screens: ["Home Search", "Flight Results", "Hotel Results", "Car Results", "Explore", "Trip Detail", "Flight Tracker", "Price Alert", "Bag Measure", "Provider Handoff", "Account", "Support"],
    entities: ["SearchQuery", "FlightOffer", "StayOffer", "CarOffer", "Trip", "ItineraryItem", "PriceAlert", "TrackedFlight", "Provider", "ReferralSession"],
  },
  {
    id: 565,
    file: "565-momondo.md",
    name: "momondo",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/momondo-flights-hotels-cars/id436736538",
    play: "https://play.google.com/store/apps/details?id=com.momondo.flightsearch",
    product: "https://www.momondo.com/",
    help: "https://www.momondo.com/help",
    privacy: "https://www.momondo.com/privacy",
    terms: "https://www.momondo.com/terms-of-use",
    focus: "flight, hotel, and car metasearch, Explore budget discovery, price alerts, Trips itinerary organization, offline trip access, and provider handoff",
    manual: "provider redirect accuracy, price/fee freshness, Trips sync, price-alert delivery, traveler profile, payment handoff, and regional/currency availability",
    screens: ["Home Search", "Flight Results", "Hotel Results", "Car Results", "Explore", "Trip Detail", "Price Alert", "Provider Handoff", "Saved Search", "Account", "Notifications", "Support"],
    entities: ["SearchQuery", "FlightOffer", "StayOffer", "CarOffer", "Trip", "ItineraryItem", "BudgetExploreOption", "PriceAlert", "Provider", "ReferralSession"],
  },
  {
    id: 566,
    file: "566-priceline.md",
    name: "Priceline",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/priceline-hotel-flight-car/id336381998",
    play: "https://play.google.com/store/apps/details?id=com.priceline.android.negotiator",
    product: "https://www.priceline.com/",
    help: "https://help.priceline.com/",
    privacy: "https://www.priceline.com/privacy",
    terms: "https://www.priceline.com/terms",
    focus: "hotel, flight, car, and package deals, opaque or limited-detail offers, checkout, trip management, VIP-style loyalty, cancellation/refund support, and provider handoff",
    manual: "opaque deal disclosure, checkout, payment authorization, cancellation/refund policy display, loyalty tier state, support escalation, taxes/fees, and regional supplier availability",
    screens: ["Deal Home", "Hotel Search", "Hotel Detail", "Flight Search", "Car Search", "Package Builder", "Checkout", "Trip Detail", "Cancellation", "Rewards", "Notifications", "Support"],
    entities: ["SearchQuery", "HotelOffer", "FlightOffer", "CarOffer", "PackageQuote", "Booking", "PaymentIntent", "CancellationPolicy", "RewardAccount", "SupportCase"],
  },
  {
    id: 567,
    file: "567-agoda.md",
    name: "Agoda",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/agoda-cheap-flights-hotels/id440676901",
    play: "https://play.google.com/store/apps/details?id=com.agoda.mobile.consumer",
    product: "https://www.agoda.com/",
    help: "https://www.agoda.com/info/contact.html",
    privacy: "https://www.agoda.com/info/privacy.html",
    terms: "https://www.agoda.com/info/termsofuse.html",
    focus: "hotel, flight, home, and activity booking, multilingual/currency localization, voucher wallet, booking management, member offers, host handoff, support, and refund workflows",
    manual: "voucher retrieval, booking edit/cancel flows, payment/refund states, host/property messaging, member offers, local taxes/fees, support chat, and regional inventory/language behavior",
    screens: ["Home Search", "Accommodation Results", "Property Detail", "Room Selection", "Flight Search", "Booking Checkout", "Voucher Wallet", "Booking Manage", "Host Messages", "Member Offers", "Notifications", "Support"],
    entities: ["SearchQuery", "Property", "RoomOffer", "FlightOffer", "Booking", "Voucher", "PaymentIntent", "HostMessage", "MemberOffer", "SupportCase"],
  },
  {
    id: 568,
    file: "568-trivago.md",
    name: "trivago",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/trivago-compare-hotel-prices/id376888389",
    play: "https://play.google.com/store/apps/details?id=com.trivago",
    product: "https://www.trivago.com/",
    help: "https://support.trivago.com/hc/en-us",
    privacy: "https://company.trivago.com/privacy-policy/",
    terms: "https://company.trivago.com/terms-and-conditions/",
    focus: "hotel price comparison, accommodation filters, mobile-rate discovery, price-drop alerts, favorite comparison, aggregated reviews, and booking-site handoff",
    manual: "provider price freshness, mobile-rate eligibility, booking-site redirect, price-drop alert delivery, aggregated review provenance, region/currency coverage, and support routing",
    screens: ["Hotel Search", "Map Results", "List Results", "Hotel Detail", "Offer Comparison", "Provider Handoff", "Favorites", "Price Drop Alert", "Review Summary", "Filters", "Notifications", "Support"],
    entities: ["SearchQuery", "Accommodation", "HotelOffer", "Provider", "Favorite", "PriceAlert", "ReviewAggregate", "FilterSet", "ReferralSession", "SupportCase"],
  },
  {
    id: 569,
    file: "569-hoteltonight.md",
    name: "HotelTonight",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/hoteltonight-hotel-booking/id407690035",
    play: "https://play.google.com/store/apps/details?id=com.hoteltonight.android.prod",
    product: "https://www.hoteltonight.com/",
    help: "https://help.hoteltonight.com/",
    privacy: "https://www.hoteltonight.com/privacy-policy",
    terms: "https://www.hoteltonight.com/terms",
    focus: "last-minute and short-window hotel booking, app-only deals, daily drops, reward/perk state, checkout, booking wallet, cancellation support, and region-limited promotions",
    manual: "daily-drop timer, app-only deal eligibility, checkout/payment, reward credit eligibility, cancellation/refund states, booking wallet, support chat, and US/UK promotion availability",
    screens: ["Deal Home", "Nearby Hotels", "Hotel Detail", "Daily Drop", "Checkout", "Booking Confirmation", "Trips", "Rewards/Perks", "Cancellation", "Notifications", "Account", "Support"],
    entities: ["SearchQuery", "HotelDeal", "DailyDrop", "Booking", "PaymentIntent", "RewardCredit", "CancellationPolicy", "Trip", "NotificationPreference", "SupportCase"],
  },
  {
    id: 570,
    file: "570-roadtrippers.md",
    name: "Roadtrippers",
    category: "Travel booking",
    apple: "https://apps.apple.com/us/app/roadtrippers-trip-planner/id944060491",
    play: "https://play.google.com/store/apps/details?id=com.roadtrippers",
    product: "https://roadtrippers.com/",
    help: "https://support.roadtrippers.com/hc/en-us",
    privacy: "https://roadtrippers.com/privacy-policy",
    terms: "https://roadtrippers.com/tos",
    focus: "road-trip route planning, points of interest, campground/RV filters, route overlays, trip collaboration, premium stop limits, navigation export, and US/Canada availability",
    manual: "premium entitlement/restoration, RV routing and offline maps, POI freshness, campground review provenance, route export, collaboration, CarPlay/navigation behavior, and US/Canada coverage",
    screens: ["Trip Wizard", "Route Planner", "Map", "Places Search", "POI Detail", "Campground Detail", "Trip Stops", "Route Overlays", "Collaboration", "Export", "Premium", "Support"],
    entities: ["Trip", "Route", "Stop", "Place", "Campground", "OverlayLayer", "Collaborator", "PremiumEntitlement", "ExportJob", "SupportCase"],
  },
  {
    id: 571,
    file: "571-transit.md",
    name: "Transit",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/transit-subway-bus-times/id498151501",
    play: "https://play.google.com/store/apps/details?id=com.thetransitapp.droid",
    product: "https://transitapp.com/",
    help: "https://help.transitapp.com/",
    privacy: "https://transitapp.com/privacy",
    terms: "https://transitapp.com/terms",
    focus: "real-time public-transit departures, route planning, line favorites, disruption alerts, multimodal options, GO navigation, agency data freshness, and Royale entitlement states",
    manual: "GO navigation, real-time vehicle freshness, ticketing/payment where available, Royale subscription, crowdsourced reports, push alerts, location prompts, and agency-specific coverage",
    screens: ["Nearby Lines", "Trip Planner", "Route Options", "Line Detail", "Stop Detail", "GO Navigation", "Disruption Alerts", "Favorites", "Tickets", "Royale", "Settings", "Support"],
    entities: ["Agency", "Line", "Stop", "Departure", "TripPlan", "VehiclePosition", "ServiceAlert", "Favorite", "TicketOffer", "Entitlement"],
  },
  {
    id: 572,
    file: "572-citymapper.md",
    name: "Citymapper",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/citymapper/id469463298",
    play: "https://play.google.com/store/apps/details?id=com.citymapper.app.release",
    product: "https://citymapper.com/",
    help: "https://intercom.help/citymapper/en/",
    privacy: "https://citymapper.com/privacy",
    terms: "https://citymapper.com/terms",
    focus: "multimodal city route comparison, live transit navigation, walking/cycling/scooter routing, disruption data, saved places, fare-aware options, and city coverage",
    manual: "GO navigation, transit/ride-share/scooter availability, fare estimates, live disruption freshness, location prompts, push alerts, subscription/ad behavior, and city-specific coverage",
    screens: ["City Home", "Route Planner", "Route Comparison", "GO Navigation", "Line Status", "Nearby Stops", "Saved Places", "Bike/Scooter Map", "Fare Detail", "Alerts", "Settings", "Support"],
    entities: ["City", "RouteQuery", "RouteOption", "TransportLeg", "Stop", "LineStatus", "SharedMobilityVehicle", "FareEstimate", "SavedPlace", "ServiceAlert"],
  },
  {
    id: 573,
    file: "573-moovit.md",
    name: "Moovit",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/moovit-bus-transit-tracker/id498477945",
    play: "https://play.google.com/store/apps/details?id=com.tranzmate",
    product: "https://moovitapp.com/",
    help: "https://support.moovitapp.com/hc/en-us",
    privacy: "https://moovitapp.com/en-us/legal/privacy-policy-en",
    terms: "https://moovitapp.com/en-us/legal/terms-of-service-en",
    focus: "urban transit route planning, real-time arrivals, alerts, live navigation, ticketing where available, AR wayfinding, community reports, offline maps, and subscription/ad controls",
    manual: "ticket purchase/validation, AR wayfinding, real-time arrival freshness, community reporting, offline maps, push alerts, subscription/ad states, and agency/city coverage",
    screens: ["Home Transit", "Route Planner", "Arrival Board", "Line Detail", "Live Navigation", "Ticketing", "AR Wayfinder", "Service Alerts", "Favorites", "Offline Maps", "Premium", "Support"],
    entities: ["Agency", "Line", "Stop", "Arrival", "RouteOption", "Ticket", "ServiceAlert", "CommunityReport", "OfflineMap", "Entitlement"],
  },
  {
    id: 574,
    file: "574-curb.md",
    name: "Curb",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/curb-request-pay-for-taxis/id299226386",
    play: "https://play.google.com/store/apps/details?id=com.ridecharge.android.taximagic",
    product: "https://www.gocurb.com/",
    help: "https://support.gocurb.com/hc/en-us",
    privacy: "https://www.gocurb.com/privacy-policy",
    terms: "https://www.gocurb.com/terms-of-use",
    focus: "taxi request, schedule, pair-and-pay, upfront fare estimates, wheelchair-accessible vehicle options, live trip state, receipts, offers, and city availability",
    manual: "taxi dispatch, Pair & Pay, upfront fare adjustment, driver/taxi authority complaint routing, payment/tip/receipt states, scheduled rides, location prompts, and city-specific availability",
    screens: ["Pickup Map", "Destination Entry", "Vehicle Options", "Ride Now", "Ride Later", "Pair & Pay", "Live Ride", "Receipt", "Offers", "Accessibility", "Trip History", "Support"],
    entities: ["RideRequest", "TaxiVehicle", "Driver", "FareEstimate", "PaymentIntent", "Tip", "Receipt", "Promotion", "CityMarket", "SupportCase"],
  },
  {
    id: 575,
    file: "575-via.md",
    name: "Via",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/via-smarter-mobility/id657777015",
    play: "https://play.google.com/store/apps/details?id=via.rider",
    product: "https://ridewithvia.com/",
    help: "https://support.ridewithvia.com/hc/en-us",
    privacy: "https://ridewithvia.com/privacy-policy/",
    terms: "https://ridewithvia.com/terms-of-use/",
    focus: "on-demand shared ride booking, corner pickup/dropoff, service-zone eligibility, live vehicle tracking, fares, passes, accessibility support, receipts, and local program rules",
    manual: "service-zone eligibility, shared-route assignment, live vehicle tracking, fare/pass purchase, accessibility accommodations, driver/support handoff, payment/refund states, and local program rules",
    screens: ["Service Zone", "Pickup/Dropoff", "Ride Options", "Booking Confirm", "Walk To Pickup", "Live Ride", "Fare/Passes", "Receipt", "Accessibility", "Trip History", "Notifications", "Support"],
    entities: ["ServiceZone", "RideRequest", "SharedRide", "PickupPoint", "Vehicle", "FareQuote", "Pass", "PaymentIntent", "Receipt", "SupportCase"],
  },
  {
    id: 576,
    file: "576-bolt.md",
    name: "Bolt",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/bolt-request-a-ride/id675033630",
    play: "https://play.google.com/store/apps/details?id=ee.mtakso.client",
    product: "https://bolt.eu/",
    help: "https://bolt.eu/en/support/",
    privacy: "https://bolt.eu/en/legal/privacy-for-riders/",
    terms: "https://bolt.eu/en/legal/terms-for-riders/",
    focus: "ride request, multimodal mobility, upfront pricing, driver tracking, payment methods, safety toolkit, emergency assist, audio recording where available, receipts, and market availability",
    manual: "driver dispatch, scooter/e-bike availability, safety/emergency assist, audio trip recording, payment/cash/tip states, cancellation fees, location prompts, and country/city availability",
    screens: ["Pickup Map", "Destination Entry", "Ride Types", "Fare Quote", "Driver Match", "Live Trip", "Safety Toolkit", "Payment", "Receipt", "Promotions", "Trip History", "Support"],
    entities: ["RideRequest", "RideType", "Driver", "Vehicle", "FareQuote", "PaymentMethod", "SafetyEvent", "Receipt", "Promotion", "Market"],
  },
  {
    id: 577,
    file: "577-free-now.md",
    name: "FREE NOW",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/free-now-mobility/id357852748",
    play: "https://play.google.com/store/apps/details?id=taxi.android.client",
    product: "https://www.free-now.com/",
    help: "https://support.free-now.com/hc/en-gb",
    privacy: "https://www.free-now.com/uk/privacy-policy/",
    terms: "https://www.free-now.com/uk/terms/",
    focus: "taxi and mobility booking, destination quote, driver matching, business travel profiles, receipts, vouchers, city availability, payment, cancellation, and support",
    manual: "taxi dispatch, mobility-mode availability, business profile billing, vouchers, cancellation fees, driver/support handoff, payment/refund states, location prompts, and country/city availability",
    screens: ["Pickup Map", "Destination Entry", "Taxi Options", "Fare Quote", "Driver Match", "Live Trip", "Business Profile", "Vouchers", "Payment", "Receipt", "Trip History", "Support"],
    entities: ["RideRequest", "MobilityMode", "Driver", "Vehicle", "FareQuote", "BusinessProfile", "Voucher", "PaymentIntent", "Receipt", "Market"],
  },
  {
    id: 578,
    file: "578-blablacar.md",
    name: "BlaBlaCar",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/blablacar-carpooling-and-bus/id341329033",
    play: "https://play.google.com/store/apps/details?id=com.comuto",
    product: "https://www.blablacar.com/",
    help: "https://support.blablacar.com/hc/en-gb",
    privacy: "https://www.blablacar.com/privacy-policy",
    terms: "https://www.blablacar.com/terms-and-conditions",
    focus: "intercity carpool and bus search, ride publishing, seat booking/request, profile trust, ratings, payments, messages, cancellations, and cross-border availability",
    manual: "ride publication, seat request/instant booking, payment release, bus carrier handoff, messaging, ratings, cancellations/refunds, identity/trust checks, and regional availability",
    screens: ["Trip Search", "Ride Results", "Ride Detail", "Seat Booking", "Publish Ride", "Messages", "Trip Day", "Payment", "Ratings", "Profile Trust", "Cancellations", "Support"],
    entities: ["TripSearch", "RideOffer", "DriverProfile", "PassengerProfile", "SeatBooking", "BusTicket", "PaymentIntent", "MessageThread", "Rating", "CancellationPolicy"],
  },
  {
    id: 579,
    file: "579-zipcar.md",
    name: "Zipcar",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/zipcar-cars-on-demand/id329384702",
    play: "https://play.google.com/store/apps/details?id=com.zc.android",
    product: "https://www.zipcar.com/",
    help: "https://support.zipcar.com/hc/en-us",
    privacy: "https://www.zipcar.com/privacy",
    terms: "https://www.zipcar.com/terms",
    focus: "membership onboarding, car availability search, hourly/day booking, vehicle unlock, pickup/return instructions, fuel/insurance rules, receipts, support, and roadside assistance",
    manual: "driver eligibility, membership approval, vehicle unlock/Bluetooth, fuel card and inspection flows, damage reporting, booking changes, roadside assistance, payment/refund states, and market availability",
    screens: ["Join", "Nearby Cars", "Car Detail", "Booking", "Pickup Instructions", "Unlock/Lock", "Trip Session", "Fuel/Rules", "Damage Report", "Receipt", "Trip History", "Roadside Support"],
    entities: ["Member", "Vehicle", "VehicleLocation", "Reservation", "UnlockSession", "InspectionReport", "FuelPolicy", "PaymentIntent", "Receipt", "SupportCase"],
  },
  {
    id: 580,
    file: "580-getaround.md",
    name: "Getaround",
    category: "Transportation",
    apple: "https://apps.apple.com/us/app/getaround-car-rental/id492238016",
    play: "https://play.google.com/store/apps/details?id=com.c4mprod.voiturelib",
    product: "https://www.getaround.com/",
    help: "https://getaround.com/help",
    privacy: "https://www.getaround.com/privacy",
    terms: "https://www.getaround.com/terms",
    focus: "peer-to-peer car rental search, hourly/day/month booking, owner listing, app unlock, insurance, business rentals, receipts, support, and European market availability",
    manual: "identity/driver eligibility, app unlock or key handoff, vehicle inspection, owner listing and payout flows, insurance/claims, payment/refund states, business rentals, and country availability",
    screens: ["Search Map", "Vehicle Results", "Vehicle Detail", "Booking", "Identity Check", "Pickup/Unlock", "Trip Session", "Return/Inspection", "Owner Listing", "Business Rental", "Receipt", "Support"],
    entities: ["Renter", "Owner", "Vehicle", "VehicleLocation", "Availability", "Reservation", "UnlockSession", "InspectionReport", "InsuranceCase", "Payout"],
  },
];

function rows(app) {
  return [
    ["Apple App Store listing", app.apple, "iOS listing, category, age rating, privacy labels, release notes, support links", "Public source verified"],
    ["Google Play listing", app.play, "Android listing, content rating, data safety, feature blurbs, update cadence", "Public source verified"],
    ["Official product site", app.product, `Public product orientation for ${app.focus}`, "Public source verified"],
    ["Help/support center", app.help, "Support taxonomy, account, booking, cancellation, refund, ticketing, trip, and recovery flows", "Public source verified"],
    ["Privacy policy", app.privacy, "Personal data, location, payment, analytics, retention, export, deletion, and regional privacy rights", "Public source verified"],
    ["Terms/legal terms", app.terms, "Eligibility, acceptable use, booking/payment terms, cancellation, liability, content, and regional service constraints", "Public source verified"],
  ]
    .map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} |`)
    .join("\n");
}

function spec(app) {
  const isTransport = app.category === "Transportation";
  const primary = isTransport ? "route, ride, vehicle, or transit session" : "trip planning, search, booking, or provider handoff";
  const locationRisk = isTransport
    ? "precise pickup/dropoff, live route, vehicle proximity, and trip history data"
    : "destination, itinerary, nearby search, and saved trip data";
  const paymentRisk = isTransport
    ? "fares, tips, passes, bookings, refunds, penalties, tolls, deposits, claims, and receipts"
    : "booking quotes, taxes, fees, rewards, vouchers, refunds, supplier handoffs, and receipts";
  const screenRows = app.screens
    .map((screen, index) => {
      const purpose = index < 4 ? "Core discovery and decision flow" : index < 8 ? "Transaction, live state, or management flow" : "Trust, account, recovery, or support flow";
      return `| ${screen} | ${purpose} | taps, forms, filters, map gestures, deep links, permissions | empty, loading, loaded, signed-out, saved, unavailable | denied permission, stale inventory, offline, region-locked, provider error, blocked entitlement |`;
    })
    .join("\n");
  const entities = app.entities
    .map((entity) => `- \`${entity}\`: stores lifecycle state, ownership, source provenance, authorization rules, sync status, deletion/export treatment, and audit metadata for ${app.name}-style workflows.`)
    .join("\n");

  return `# ${app.name}-Style Clone Spec

> Metadata
> - Inspiration app: ${app.name}
> - Category: ${app.category}
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${today}.
> - Verification basis: exact public marketplace, official product, support, privacy, and legal URLs listed below; hands-on native/account/provider behavior remains blocked until verified.
> - Manual verification blockers: ${app.manual} require lawful test evidence before one-for-one native parity claims.
> - Legal scope: functional parity only; use original code, brand, copy, iconography, sample data, media, policies, and integrations.

## Overview

Build an original mobile product inspired by ${app.name}'s public user-facing workflow. The clone focus is ${app.focus}. This public-source V1 spec is implementation-ready for an original build, but every behavior marked \`Manual verification required\` must remain behind a documented blocker until lawful hands-on evidence confirms the exact native behavior.

## Goals

- Deliver a mobile-first ${app.category.toLowerCase()} experience centered on ${primary}.
- Preserve a clear distinction between public-source evidence, inferred clone requirements, and blocked hands-on behavior.
- Model location, payment, account, notification, support, privacy, and deletion/export behavior explicitly.
- Keep provider/operator/supplier data, fares, availability, inventory, ratings, and maps synthetic or licensed until approved integrations exist.
- Support accessibility, localization, offline recovery, and safe retry behavior for high-consequence trip and transaction states.

## Non-Goals

- Do not copy ${app.name} branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, ranking systems, route algorithms, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not implement production payments, ticketing, dispatch, vehicle unlock, insurance, identity verification, regulated mobility services, or real supplier bookings without separate legal/platform/provider review.
- Do not scrape private inventory or replay undocumented mobile APIs.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
${rows(app)}

## Detailed Design

- Source-backed requirement: the app must provide a mobile home surface that launches directly into ${primary}.
- Source-backed requirement: search and map/list results must expose availability, location, timing, price or fare context, and provider/operator caveats before commitment.
- Source-backed requirement: detail pages must separate source-backed public facts from inferred clone data and synthetic seed content.
- Source-backed requirement: booking, ticketing, referral, or session flows must show quote validity, taxes/fees, cancellation terms, and provider handoff before the user confirms.
- Source-backed requirement: saved trips, favorites, alerts, history, receipts, and support cases must be recoverable after app restart.
- Source-backed requirement: notification preferences must distinguish transactional, reminder, disruption, marketing, reward, and safety categories.
- Inferred V1 requirement: local drafts may be queued for low-risk planning edits, but booking/payment/dispatch/unlock/ticket validation must require fresh server state.
- Inferred V1 requirement: provider/operator availability must carry timestamp, source, locale, currency, region, and stale-data markers.
- Manual verification required: ${app.manual}.
- Manual verification required: marketplace privacy labels, OS permission prompts, push notification copy, subscription or payment recovery, and region-specific behavior.
- Legal implementation rule: use original names, original visual design, synthetic locations/offers/routes, and licensed providers only.
- Accessibility requirement: all map, route, booking, timer, live-status, and support controls must have screen-reader labels, visible focus, dynamic type support, contrast compliance, and reduced-motion alternatives.
- Privacy requirement: analytics must never include raw addresses, full route traces, payment credentials, private messages, identity documents, precise coordinates, or support transcripts.
- Safety requirement: ${locationRisk} must be minimized, scoped, retained only as needed, and deleted/exported under user privacy requests unless retention is legally required.

## Core User Journeys

- New user installs, reviews an original value proposition, creates or restores an account, and reaches the primary home surface.
- Returning user searches or opens a saved item, compares options, and reaches a detail page with current availability and caveats.
- User filters by time, price, location, accessibility, cancellation, provider, or service type and understands why results changed.
- User starts ${primary}, sees all important terms, and can cancel before irreversible commitment.
- User receives a disruption, price, route, booking, ticket, or trip-status notification and lands on the correct recovery screen.
- User denies location, notification, camera, Bluetooth, motion, files, or photos permission and receives a functional fallback.
- User loses connectivity mid-flow, sees local state preserved, and can retry, refresh, or discard without duplicate charges or duplicate bookings.
- User requests support, dispute, refund, safety help, or provider escalation and receives durable case status.
- User exports data, deletes the account, or changes privacy settings from the mobile app.
- User attempts a blocked paid, provider, region, or hardware-dependent flow and sees a documented manual-verification blocker in non-production builds.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
${screenRows}

## Data Model

${entities}
- \`User\`: stores profile, auth lifecycle, locale, accessibility preferences, privacy settings, notification settings, export/delete state, and blocked-account status.
- \`LocationContext\`: stores coarse or precise coordinates, permission state, freshness, source, geofence/region rules, and minimization metadata.
- \`PaymentIntent\`: stores quoted amount, currency, taxes/fees, authorization state, idempotency key, refundability, provider handoff, and audit trail.
- \`NotificationPreference\`: stores transactional, reminder, disruption, safety, reward, and marketing opt-in state by device and channel.
- \`SupportCase\`: stores issue category, object reference, user-visible state, escalation path, attachments metadata, audit trail, and retention policy.
- \`AuditEvent\`: append-only record for account, payment, booking, ticketing, unlock, support, privacy, safety, and entitlement state changes.
- \`LocalCacheRecord\`: device-local record for offline reads, queued low-risk drafts, stale markers, sync attempts, conflict resolution, and cache expiry.

## API And Backend Contracts

- Auth: \`POST /auth/session\`, \`POST /auth/recover\`, \`DELETE /auth/session\`, and \`DELETE /auth/sessions\` with device-scoped session tracking.
- Profile: \`GET /me\`, \`PATCH /me\`, \`GET /privacy/settings\`, \`PATCH /privacy/settings\`, \`POST /data-export\`, and \`DELETE /account\`.
- Search: \`GET /search\` accepts query, coordinates, time window, filters, locale, currency, accessibility needs, safe-mode, and cursor.
- Results: \`GET /results/{id}\` returns source, freshness, availability, price/fare caveats, cancellation terms, and localization keys.
- Detail: \`GET /details/{id}\` returns public facts, media-license metadata, synthetic-review markers, provider terms, and user-save state.
- Save/history: \`POST /saved-items\`, \`DELETE /saved-items/{id}\`, \`GET /history\`, and \`DELETE /history/{id}\`.
- Quote: \`POST /quotes\` returns price/fare validity, taxes/fees, provider availability, expiration, risk warnings, and idempotency keys.
- Commit: \`POST /bookings\`, \`POST /rides\`, \`POST /tickets\`, or \`POST /sessions\` requires a fresh quote, payment authorization, policy acceptance, and audit event.
- Live state: \`GET /active/{id}\` plus websocket/SSE/polling fallback for status, alerts, provider updates, and missed-event reconciliation.
- Notifications: \`GET /notification-preferences\` and \`POST /notification-preferences\` with category, device token, locale, quiet-hours, and revocation support.
- Payments: \`POST /checkout/session\`, \`POST /payment-methods\`, \`GET /receipts/{id}\`, and webhook-backed payment/refund/chargeback reconciliation.
- Support: \`POST /support-cases\`, \`GET /support-cases/{id}\`, \`POST /reports\`, and \`POST /refund-requests\` with attachment metadata and escalation paths.
- Entitlements: \`GET /entitlements\`, \`POST /entitlements/restore\`, and webhook-backed trial, paid, expired, canceled, refunded, and unavailable states.
- Admin/review: internal endpoints must exist for fraud holds, safety reports, provider disputes, refund review, content moderation, and privacy request processing before launch.

## Realtime, Push, And Offline Behavior

- Cache home, recent searches, details, saved items, settings, entitlements, active trips, and support cases for offline reads.
- Mark every cached result with freshness, source, locale, and user-visible stale-state copy.
- Queue only low-risk drafts while offline; block booking, payment, ticket validation, dispatch, vehicle unlock, cancellation, and deletion until canonical server state is reachable.
- Realtime transport must reconcile after reconnect and reject duplicate status changes with idempotency keys.
- Push notifications must deep-link into route, booking, trip, vehicle, ticket, receipt, support, privacy, or safety states without exposing sensitive content on the lock screen.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, time-zone changes, and provider outage.
- Long-running actions must expose pending, complete, failed, canceled, expired, refunded, and disputed states with recovery actions.
- Offline support must preserve accessibility state and avoid map-only recovery paths.

## Permissions, Privacy, And Safety

- Treat ${locationRisk} as a launch-blocking privacy review area with owner, mitigation, retention policy, and acceptance tests.
- Treat ${paymentRisk} as a launch-blocking financial/support review area with owner, mitigation, refund/dispute rules, and acceptance tests.
- Treat fraud, spam, review abuse, unsafe pickup/meeting points, identity misuse, provider impersonation, and account takeover as launch-blocking safety risks.
- Request location, notifications, camera, Bluetooth, motion, contacts, photos, files, microphone, or calendar access only at the moment the user invokes a feature needing it.
- Provide denied-permission fallbacks, settings education, and no dark patterns around consent.
- Use coarse location by default for discovery and require explicit justification for precise/background location.
- Minimize sensitive data in analytics, logs, crash reports, support tooling, and A/B experiments.
- Provide privacy policy, terms, data export, delete account, report abuse/safety issue, block/mute where relevant, and support escalation from settings.
- Keep provider/supplier/operator credentials, private APIs, production ticketing, dispatch, unlock, insurance, and payment capabilities out of V1 until approved.
- Use synthetic or licensed sample data only; do not commit real user trips, routes, receipts, messages, identity documents, or payment artifacts.

## Analytics And Monetization

- Onboarding events: \`onboarding_started\`, \`permission_primer_viewed\`, \`signup_started\`, \`signup_completed\`, and \`onboarding_skipped\` with source, locale, and experiment ids.
- Search events: \`search_started\`, \`filter_changed\`, \`map_moved\`, \`result_opened\`, \`availability_refreshed\`, and \`provider_handoff_started\`.
- Transaction events: \`quote_requested\`, \`quote_expired\`, \`commit_started\`, \`commit_completed\`, \`commit_failed\`, \`receipt_opened\`, and \`refund_requested\`.
- Retention events: \`favorite_saved\`, \`trip_saved\`, \`alert_created\`, \`notification_opened\`, \`history_opened\`, and \`offline_recovered\`.
- Safety events: \`safety_tool_opened\`, \`report_submitted\`, \`support_case_created\`, \`privacy_setting_changed\`, \`data_export_requested\`, and \`account_delete_requested\`.
- Monetization events: \`paywall_viewed\`, \`trial_started\`, \`purchase_started\`, \`purchase_completed\`, \`purchase_failed\`, \`subscription_canceled\`, and \`entitlement_expired\`.
- Monetization model: support original free/trial/paid, referral, reward, booking-fee, pass, or subscription mechanics using original naming and synthetic pricing; do not copy exact plan names or promotional copy.
- Analytics rule: never send raw addresses, precise coordinates, route traces, payment credentials, identity documents, private messages, support transcripts, health/disability information, or child data as event properties.

## Edge Cases

- First launch with no network, no account, expired session, unsupported OS, or unavailable region.
- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.
- Search results become stale, sold out, canceled, rerouted, delayed, hidden, region-locked, or provider-unavailable after display.
- Quote expires, fare changes, taxes/fees differ, payment authorization fails, duplicate tap occurs, or webhook delivery repeats.
- Provider handoff opens the wrong locale, currency, or deep link; user returns without confirmed status.
- Live trip/session/ticket status misses an event and must reconcile from canonical server state.
- Support case, refund, safety report, or privacy request remains active while the account is deleted.
- Subscription restored on another platform, refunded externally, expired offline, or unavailable in the user's region.
- Map data, transit data, vehicle location, accommodation inventory, reviews, or place metadata has conflicting providers or missing accessibility attributes.
- User-generated content, reviews, rides, listings, or messages are spam, abusive, fraudulent, unsafe, or policy-violating.
- Device clock/time zone changes during booking, ticket validation, route timing, pickup window, or offer expiration.
- App terminated during checkout, ticketing, dispatch, unlock, upload, route navigation, or cancellation.

## Test Plan

- Unit tests for validation, state machines, quote expiry, entitlement checks, idempotency keys, stale markers, and privacy-safe analytics payload construction.
- Integration tests for auth, search, filters, map/list results, detail, saved items, history, notification preferences, support, export, and deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, quote freshness, provider handoff, and realtime reconciliation path.
- Offline tests for cached reads, queued low-risk drafts, blocked high-risk writes, reconnect reconciliation, corrupt-cache recovery, and app termination.
- Permission tests for denied, granted, revoked, limited, approximate, precise, background, notification, camera, Bluetooth, motion, files, and photos states where relevant.
- Payment and entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, unavailable market, failed authorization, duplicate webhook, and receipt generation.
- Safety tests for report submission, fraud hold, unsafe pickup/location warning, account takeover recovery, support escalation, and moderation/policy state changes.
- Accessibility tests for screen-reader labels, map alternatives, focus order, dynamic type, contrast, reduced motion, timers, live status, and media alternatives.
- Localization tests for currency, taxes/fees, distance units, time zones, translated legal links, regional inventory, and right-to-left layouts where supported.
- Regression tests for every acceptance criterion before marking downstream implementation complete.
- Manual verification checklist tests for ${app.manual}.
- Legal/source tests confirming no copied brand assets, screenshots, marketing copy, private APIs, unlicensed datasets, or proprietary media enter the implementation repo.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- Public source-discovery links are replaced with exact marketplace, product, support, privacy, and legal URLs.
- Every source-backed behavior is distinguishable from inferred V1 behavior and manual-verification blockers.
- A new user can complete onboarding and reach the default home surface without unsupported permissions.
- A returning user can complete ${primary}, recover from a network failure, and confirm canonical server state after reconnect.
- Search/browse, detail, save/share, notification, settings, support, receipt, and deletion/export flows are represented in routes and tests.
- All data entities have owners, lifecycle states, authorization rules, source provenance, and deletion/export behavior.
- Location, payment, provider/operator, safety, support, accessibility, and regional availability risks have explicit blockers and acceptance tests.
- At least 12 acceptance tests cover happy path, empty state, permission denial, offline behavior, stale data, accessibility, support/safety, billing/entitlements, notifications, data deletion/export, region lock, and regression behavior.

## Open Questions

- Which hands-on flows require paid access, production provider credentials, identity verification, physical vehicle/device access, or region-specific availability?
- Which providers will supply maps, transit feeds, route data, inventory, fares, payment, ticketing, unlock, identity, notification, analytics, and support services for the original clone?
- Which public-source claims need a dedicated research note before downstream implementation starts?
- Which features should be excluded from V1 because they require regulated review, production partnerships, hardware access, safety operations, or legal approval?
- What retention periods apply to ${locationRisk}, support cases, receipts, and audit records in each launch region?

## Build Plan

- Phase 1: Build the route map, design system, synthetic seed-data policy, source-provenance model, and legal asset guardrails.
- Phase 2: Implement onboarding, auth shell, home, search, map/list results, detail, saved/history, and settings with original copy.
- Phase 3: Add quote, booking/referral/session/ticket shells, receipts, notification preferences, entitlement states, and support flows with blocked production-provider integrations.
- Phase 4: Add backend contracts, offline/retry handling, realtime reconciliation, stale-data markers, privacy export/delete, and audit events.
- Phase 5: Add safety/reporting, fraud-hold, provider-dispute, refund/cancellation, accessibility, localization, and regional-availability test coverage.
- Phase 6: Integrate approved providers only after legal/platform review; keep production payment, ticketing, dispatch, unlock, insurance, and supplier bookings disabled until approved.
- Phase 7: Conduct lawful hands-on verification for ${app.manual}, then update this spec with evidence before any one-for-one parity claim.

## Next Steps

- Keep this spec as the source contract for a downstream private scaffold until hands-on verification clears the listed blockers.
- Capture public-source research notes for marketplace privacy labels, release notes, support taxonomy, and user-review themes without committing proprietary media.
- Select synthetic or licensed data providers for maps, routes, inventory, fares, reviews, and notifications before implementation.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest only after the relevant promoted ID range is reconciled.
`;
}

for (const app of apps) {
  writeFileSync(join(process.cwd(), "specs", "batch-29", app.file), spec(app));
}

console.log(`Promoted ${apps.length} specs in specs/batch-29.`);
