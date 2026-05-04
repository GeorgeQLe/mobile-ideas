#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const today = "2026-05-04";

const apps = [
  {
    "id": 601,
    "file": "601-peakvisor.md",
    "name": "PeakVisor",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/hiking-and-skiing-peakvisor/id1187259191",
    "play": "https://play.google.com/store/apps/details?id=tips.routes.peakvisor",
    "product": "https://peakvisor.com/",
    "help": "https://peakvisor.com/en/faq.html",
    "privacy": "https://peakvisor.com/en/privacy.html",
    "terms": "https://peakvisor.com/en/terms.html",
    "focus": "3D mountain maps, peak identification, hiking and ski route planning, offline map access, GPS tracks, AR camera orientation, terrain layers, saved routes, subscriptions, and outdoor safety disclaimers",
    "manual": "AR peak identification, GPS track recording, offline map downloads, route export, premium entitlement restoration, camera/location prompts, push alerts, slope and avalanche-terrain overlays, and regional trail coverage",
    "screens": [
      "Discover Mountains",
      "AR Peak Finder",
      "3D Map",
      "Route Planner",
      "Route Detail",
      "GPS Track",
      "Offline Maps",
      "Ski/Terrain Layers",
      "Saved Peaks",
      "Flyover",
      "Premium",
      "Support"
    ],
    "entities": [
      "Mountain",
      "Trail",
      "RoutePlan",
      "GpsTrack",
      "OfflineMapPack",
      "TerrainLayer",
      "PeakIdentification",
      "SavedPlace",
      "SubscriptionEntitlement",
      "SafetyNotice"
    ]
  },
  {
    "id": 602,
    "file": "602-windy.md",
    "name": "Windy",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/windy-com/id1161387262",
    "play": "https://play.google.com/store/apps/details?id=com.windyty.android",
    "product": "https://www.windy.com/",
    "help": "https://community.windy.com/",
    "privacy": "https://www.windy.com/privacy",
    "terms": "https://www.windy.com/terms-and-conditions",
    "focus": "interactive weather maps, forecast model comparison, radar and satellite layers, favorites, alerts, widgets, route-oriented planning, premium forecasts, and location privacy controls",
    "manual": "forecast model switching, premium forecast intervals, weather alert creation, widgets, radar/satellite playback, route planner behavior, location prompts, push alerts, and regional forecast-layer availability",
    "screens": [
      "Weather Map",
      "Layer Picker",
      "Forecast Detail",
      "Meteogram",
      "Radar/Satellite",
      "Favorites",
      "Alert Builder",
      "Route Planner",
      "Widgets",
      "Premium",
      "Settings",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "WeatherLayer",
      "ForecastModel",
      "Meteogram",
      "WeatherAlert",
      "FavoritePlace",
      "RouteForecast",
      "MapViewport",
      "SubscriptionEntitlement",
      "WeatherStation"
    ]
  },
  {
    "id": 603,
    "file": "603-the-weather-channel.md",
    "name": "The Weather Channel",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/the-weather-channel-radar/id295646461",
    "play": "https://play.google.com/store/apps/details?id=com.weather.Weather",
    "product": "https://weather.com/",
    "help": "https://support.weather.com/",
    "privacy": "https://weather.com/en-US/twc/privacy-policy",
    "terms": "https://weather.com/en-US/twc/terms-of-use",
    "focus": "local forecasts, severe weather alerts, radar maps, hourly and daily conditions, news/video surfaces, saved locations, widgets, premium/ad states, and location privacy controls",
    "manual": "severe alert delivery, radar playback, video/news personalization, premium/ad removal, widgets, precise/background location prompts, push notification copy, and region-specific forecast coverage",
    "screens": [
      "Today Forecast",
      "Hourly",
      "Daily",
      "Radar Map",
      "Severe Alerts",
      "Saved Locations",
      "Video/News",
      "Health/Air Quality",
      "Widgets",
      "Premium",
      "Settings",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "HourlyForecast",
      "DailyForecast",
      "RadarFrame",
      "SevereAlert",
      "SavedLocation",
      "WeatherStory",
      "WidgetConfig",
      "SubscriptionEntitlement",
      "NotificationPreference"
    ]
  },
  {
    "id": 604,
    "file": "604-accuweather.md",
    "name": "AccuWeather",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/accuweather-weather-forecast/id300048137",
    "play": "https://play.google.com/store/apps/details?id=com.accuweather.android",
    "product": "https://www.accuweather.com/",
    "help": "https://support.accuweather.com/hc/en-us",
    "privacy": "https://www.accuweather.com/en/privacy",
    "terms": "https://www.accuweather.com/en/legal",
    "focus": "minute-by-minute forecasts, local conditions, severe alerts, radar maps, lifestyle forecasts, saved locations, widgets, premium/ad states, and location privacy controls",
    "manual": "MinuteCast behavior, severe alert timing, radar playback, lifestyle indices, premium/ad states, widgets, location prompts, push alerts, and regional forecast coverage",
    "screens": [
      "Current Conditions",
      "Minute Forecast",
      "Hourly",
      "Daily",
      "Radar Map",
      "Severe Alerts",
      "Lifestyle Indices",
      "Saved Locations",
      "Widgets",
      "Premium",
      "Settings",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "MinuteForecast",
      "HourlyForecast",
      "DailyForecast",
      "RadarFrame",
      "SevereAlert",
      "LifestyleIndex",
      "SavedLocation",
      "WidgetConfig",
      "SubscriptionEntitlement"
    ]
  },
  {
    "id": 605,
    "file": "605-weatherbug.md",
    "name": "WeatherBug",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/weatherbug-weather-forecast/id281940292",
    "play": "https://play.google.com/store/apps/details?id=com.aws.android",
    "product": "https://www.weatherbug.com/",
    "help": "https://www.weatherbug.com/about-us/contact",
    "privacy": "https://www.weatherbug.com/legal/privacy-policy",
    "terms": "https://www.weatherbug.com/legal/terms-of-use",
    "focus": "local forecasts, spark/lightning and severe weather alerts, radar maps, weather cameras, air quality, saved locations, widgets, and location privacy controls",
    "manual": "lightning alert delivery, weather-camera availability, radar playback, air-quality feeds, premium/ad states, widgets, location prompts, and regional station coverage",
    "screens": [
      "Home Forecast",
      "Hourly",
      "Daily",
      "Radar Map",
      "Lightning Alerts",
      "Weather Cameras",
      "Air Quality",
      "Saved Locations",
      "Widgets",
      "Premium",
      "Settings",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "HourlyForecast",
      "DailyForecast",
      "RadarFrame",
      "LightningAlert",
      "WeatherCamera",
      "AirQualityReading",
      "SavedLocation",
      "WidgetConfig",
      "SubscriptionEntitlement"
    ]
  },
  {
    "id": 606,
    "file": "606-carrot-weather.md",
    "name": "CARROT Weather",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574",
    "play": "https://play.google.com/store/apps/details?id=com.grailr.carrotweather",
    "product": "https://www.meetcarrot.com/weather/",
    "help": "https://support.meetcarrot.com/",
    "privacy": "https://www.meetcarrot.com/privacy/",
    "terms": "https://www.meetcarrot.com/terms/",
    "focus": "personality-driven forecasts, weather source selection, radar maps, alerts, widgets, Apple Watch-style surfaces, achievements, premium tiers, and privacy controls",
    "manual": "weather source switching, personality settings, achievements, premium tier restoration, widgets/watch surfaces, radar playback, location prompts, push alerts, and regional source availability",
    "screens": [
      "Forecast Home",
      "Hourly",
      "Daily",
      "Radar Map",
      "Alert Builder",
      "Weather Sources",
      "Widgets",
      "Achievements",
      "Locations",
      "Premium",
      "Settings",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "WeatherSource",
      "HourlyForecast",
      "DailyForecast",
      "RadarLayer",
      "WeatherAlert",
      "WidgetConfig",
      "Achievement",
      "SubscriptionEntitlement",
      "PersonalitySetting"
    ]
  },
  {
    "id": 607,
    "file": "607-myradar.md",
    "name": "MyRadar",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/myradar-accurate-weather-radar/id322439990",
    "play": "https://play.google.com/store/apps/details?id=com.acmeaom.android.myradar",
    "product": "https://myradar.com/",
    "help": "https://myradar.com/contact-us/",
    "privacy": "https://myradar.com/privacy-policy/",
    "terms": "https://myradar.com/terms-of-use/",
    "focus": "animated radar maps, weather layers, aviation and hurricane overlays, rain alerts, saved locations, widgets, premium layers, and location privacy controls",
    "manual": "radar animation timing, rain alert delivery, hurricane/aviation layers, premium layer restoration, widgets, location prompts, push alerts, and regional radar coverage",
    "screens": [
      "Radar Home",
      "Layer Picker",
      "Forecast Detail",
      "Rain Alerts",
      "Hurricane Tracker",
      "Aviation Layers",
      "Saved Locations",
      "Widgets",
      "Premium Layers",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "MapViewport",
      "RadarFrame",
      "WeatherLayer",
      "RainAlert",
      "StormTrack",
      "AviationOverlay",
      "SavedLocation",
      "WidgetConfig",
      "SubscriptionEntitlement",
      "NotificationPreference"
    ]
  },
  {
    "id": 608,
    "file": "608-noaa-weather-radar.md",
    "name": "NOAA Weather Radar",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/clime-noaa-weather-radar-live/id749133753",
    "play": "https://play.google.com/store/apps/details?id=com.apalon.weatherradar.free",
    "product": "https://climeradar.com/",
    "help": "https://support.climeradar.com/hc/en-us",
    "privacy": "https://climeradar.com/privacy-policy",
    "terms": "https://climeradar.com/terms-of-use",
    "focus": "NOAA-style radar maps, precipitation forecasts, severe alerts, hurricane tracking, saved locations, widgets, premium/ad states, and location privacy controls",
    "manual": "radar playback, alert delivery, hurricane tracker, premium/ad removal, widgets, NOAA data attribution, location prompts, push alerts, and regional radar coverage",
    "screens": [
      "Radar Map",
      "Layer Picker",
      "Forecast Detail",
      "Precipitation Timeline",
      "Severe Alerts",
      "Hurricane Tracker",
      "Saved Locations",
      "Widgets",
      "Premium",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "RadarFrame",
      "WeatherLayer",
      "PrecipitationForecast",
      "SevereAlert",
      "StormTrack",
      "SavedLocation",
      "WidgetConfig",
      "SubscriptionEntitlement",
      "DataProviderAttribution"
    ]
  },
  {
    "id": 609,
    "file": "609-ventusky.md",
    "name": "Ventusky",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/ventusky-weather-forecast/id1280984498",
    "play": "https://play.google.com/store/apps/details?id=cz.ackee.ventusky",
    "product": "https://www.ventusky.com/",
    "help": "https://www.ventusky.com/contact",
    "privacy": "https://www.ventusky.com/privacy",
    "terms": "https://www.ventusky.com/terms",
    "focus": "animated global weather maps, model layers, wind and precipitation visualization, forecast timelines, favorites, premium/ad states, and location privacy controls",
    "manual": "forecast model/layer behavior, timeline animation, premium layers, favorites sync, location prompts, push alerts where present, and regional forecast-source coverage",
    "screens": [
      "Weather Map",
      "Layer Picker",
      "Timeline",
      "Forecast Detail",
      "Wind Map",
      "Precipitation Map",
      "Favorites",
      "Premium",
      "Notifications",
      "Settings",
      "Legal",
      "Support"
    ],
    "entities": [
      "ForecastLocation",
      "WeatherLayer",
      "ForecastModel",
      "TimelineFrame",
      "MapViewport",
      "FavoritePlace",
      "SubscriptionEntitlement",
      "NotificationPreference",
      "ProviderAttribution",
      "LocaleSetting"
    ]
  },
  {
    "id": 610,
    "file": "610-surfline.md",
    "name": "Surfline",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/surfline-wave-surf-reports/id393782096",
    "play": "https://play.google.com/store/apps/details?id=com.surfline.android",
    "product": "https://www.surfline.com/",
    "help": "https://support.surfline.com/hc/en-us",
    "privacy": "https://www.surfline.com/privacy-policy",
    "terms": "https://www.surfline.com/terms-of-use",
    "focus": "surf spot discovery, wave and tide forecasts, live cams, favorites, alerts, sessions, premium forecast tools, and location privacy controls",
    "manual": "live cam playback, surf alert delivery, premium forecast tools, session tracking, tide/wind forecast accuracy, location prompts, push alerts, and regional spot coverage",
    "screens": [
      "Spot Map",
      "Spot Forecast",
      "Live Cam",
      "Favorites",
      "Surf Alerts",
      "Tide/Wind",
      "Session Log",
      "Premium Forecast",
      "Nearby Spots",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "SurfSpot",
      "WaveForecast",
      "TideForecast",
      "LiveCam",
      "SurfAlert",
      "SessionLog",
      "FavoriteSpot",
      "SubscriptionEntitlement",
      "NotificationPreference",
      "ProviderAttribution"
    ]
  },
  {
    "id": 611,
    "file": "611-fishbrain.md",
    "name": "Fishbrain",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/fishbrain-fishing-app/id477967747",
    "play": "https://play.google.com/store/apps/details?id=com.fishbrain.app",
    "product": "https://fishbrain.com/",
    "help": "https://support.fishbrain.com/hc/en-us",
    "privacy": "https://fishbrain.com/privacy-policy",
    "terms": "https://fishbrain.com/terms-and-conditions",
    "focus": "fishing maps, catch logging, species and waterbody discovery, forecasts, social feed, private spots, premium map layers, and location privacy controls",
    "manual": "catch logging, private spot controls, premium map layers, species recommendations, social moderation, location prompts, push alerts, and regional waterbody coverage",
    "screens": [
      "Fishing Map",
      "Waterbody Detail",
      "Catch Log",
      "Species Detail",
      "Forecast",
      "Social Feed",
      "Private Spots",
      "Premium Layers",
      "Messages",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "Waterbody",
      "FishingSpot",
      "CatchLog",
      "Species",
      "ForecastCondition",
      "MapLayer",
      "PrivateSpot",
      "SocialPost",
      "SubscriptionEntitlement",
      "ModerationReport"
    ]
  },
  {
    "id": 612,
    "file": "612-navionics.md",
    "name": "Navionics",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/navionics-boating/id744920098",
    "play": "https://play.google.com/store/apps/details?id=it.navionics.singleAppMarineLakesHD",
    "product": "https://www.navionics.com/apps/navionics-boating",
    "help": "https://www.navionics.com/support",
    "privacy": "https://www.garmin.com/en-US/privacy/global/",
    "terms": "https://www.garmin.com/en-US/legal/terms-of-use/",
    "focus": "marine and lake charts, route planning, tracks, sonar and map layers, offline chart downloads, subscriptions, device/sensor integrations, and location privacy controls",
    "manual": "chart downloads, route guidance, track recording, sonar/device integrations, subscription restoration, location prompts, chart update behavior, and regional marine chart coverage",
    "screens": [
      "Chart Map",
      "Route Planner",
      "Route Detail",
      "Track Recorder",
      "Chart Downloads",
      "Map Layers",
      "Sonar/Lake Data",
      "Saved Places",
      "Subscription",
      "Devices",
      "Settings",
      "Support"
    ],
    "entities": [
      "ChartRegion",
      "MarineRoute",
      "Track",
      "Waypoint",
      "MapLayer",
      "OfflineChartPack",
      "VesselProfile",
      "DeviceIntegration",
      "SubscriptionEntitlement",
      "SafetyNotice"
    ]
  },
  {
    "id": 613,
    "file": "613-marinetraffic.md",
    "name": "MarineTraffic",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/marinetraffic-ship-tracking/id563910324",
    "play": "https://play.google.com/store/apps/details?id=com.marinetraffic.android",
    "product": "https://www.marinetraffic.com/",
    "help": "https://help.marinetraffic.com/hc/en-us",
    "privacy": "https://www.marinetraffic.com/en/p/privacy-policy",
    "terms": "https://www.marinetraffic.com/en/p/terms-of-use",
    "focus": "ship and vessel tracking, AIS map layers, fleet/watch lists, port details, vessel alerts, subscriptions, data freshness, and location/privacy controls",
    "manual": "AIS freshness, vessel alert delivery, fleet tracking, paid data layers, port/ETA accuracy, location prompts, push alerts, and regional AIS coverage",
    "screens": [
      "Vessel Map",
      "Vessel Search",
      "Vessel Detail",
      "Fleet List",
      "Port Detail",
      "AIS Layers",
      "Alerts",
      "Route History",
      "Premium Data",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "Vessel",
      "VesselPosition",
      "Port",
      "FleetList",
      "AisLayer",
      "VesselAlert",
      "RouteHistory",
      "SubscriptionEntitlement",
      "ProviderAttribution",
      "NotificationPreference"
    ]
  },
  {
    "id": 614,
    "file": "614-flightradar24.md",
    "name": "Flightradar24",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/flightradar24-flight-tracker/id382233851",
    "play": "https://play.google.com/store/apps/details?id=com.flightradar24free",
    "product": "https://www.flightradar24.com/",
    "help": "https://support.fr24.com/support/home",
    "privacy": "https://www.flightradar24.com/privacy-policy",
    "terms": "https://www.flightradar24.com/terms-and-conditions",
    "focus": "live flight tracking, aircraft and airport search, alerts, AR plane identification, playback/history, premium tiers, data freshness, and location privacy controls",
    "manual": "live flight freshness, AR plane identification, alert delivery, playback/history, premium tier restoration, airport data, location prompts, push alerts, and regional ADS-B coverage",
    "screens": [
      "Flight Map",
      "Flight Search",
      "Flight Detail",
      "Airport Detail",
      "AR View",
      "Alerts",
      "Playback",
      "Fleet/Aircraft",
      "Premium",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "Flight",
      "Aircraft",
      "Airport",
      "FlightPosition",
      "FlightAlert",
      "PlaybackSession",
      "ArIdentification",
      "SubscriptionEntitlement",
      "ProviderAttribution",
      "NotificationPreference"
    ]
  },
  {
    "id": 615,
    "file": "615-flightaware.md",
    "name": "FlightAware",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/flightaware-flight-tracker/id316793974",
    "play": "https://play.google.com/store/apps/details?id=com.flightaware.android.liveFlightTracker",
    "product": "https://flightaware.com/",
    "help": "https://support.flightaware.com/",
    "privacy": "https://flightaware.com/about/privacy/",
    "terms": "https://flightaware.com/about/termsofuse/",
    "focus": "flight status tracking, airport and aircraft search, alerts, live maps, delay information, account watchlists, premium/ad states, and location privacy controls",
    "manual": "flight status freshness, alert delivery, push notification copy, airport delay data, account watchlists, premium/ad states, location prompts, and regional flight-data coverage",
    "screens": [
      "Flight Search",
      "Flight Status",
      "Live Map",
      "Airport Detail",
      "Aircraft Detail",
      "Alerts",
      "Watchlist",
      "Delay Board",
      "Premium",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "Flight",
      "Aircraft",
      "Airport",
      "FlightPosition",
      "DelayStatus",
      "FlightAlert",
      "Watchlist",
      "SubscriptionEntitlement",
      "ProviderAttribution",
      "NotificationPreference"
    ]
  },
  {
    "id": 616,
    "file": "616-gasbuddy.md",
    "name": "GasBuddy",
    "category": "Maps weather outdoors",
    "apple": "https://apps.apple.com/us/app/gasbuddy-find-pay-for-gas/id406719683",
    "play": "https://play.google.com/store/apps/details?id=gbis.gbandroid",
    "product": "https://www.gasbuddy.com/",
    "help": "https://help.gasbuddy.com/hc/en-us",
    "privacy": "https://www.gasbuddy.com/privacy",
    "terms": "https://www.gasbuddy.com/terms",
    "focus": "gas station discovery, fuel-price comparison, price reporting, savings programs, trip-cost planning, payments/rewards stubs, alerts, and location privacy controls",
    "manual": "fuel price reporting, station data freshness, Pay with GasBuddy/payment states, rewards, deal alerts, location prompts, push alerts, and regional station coverage",
    "screens": [
      "Station Map",
      "Station List",
      "Station Detail",
      "Price Report",
      "Trip Cost",
      "Deal Alerts",
      "Savings Program",
      "Payment",
      "Rewards",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "FuelStation",
      "FuelPrice",
      "PriceReport",
      "TripCostEstimate",
      "DealAlert",
      "SavingsAccount",
      "PaymentIntent",
      "RewardLedger",
      "ProviderAttribution",
      "NotificationPreference"
    ]
  },
  {
    "id": 617,
    "file": "617-homes-com.md",
    "name": "Homes.com",
    "category": "Real estate and home services",
    "apple": "https://apps.apple.com/us/app/homes-com-real-estate-rent/id306423353",
    "play": "https://play.google.com/store/apps/details?id=com.homes.android",
    "product": "https://www.homes.com/",
    "help": "https://www.homes.com/about/contact-us/",
    "privacy": "https://www.homes.com/about/privacy-policy/",
    "terms": "https://www.homes.com/about/terms-of-use/",
    "focus": "for-sale and rental listing search, map/list comparison, property detail pages, agent/lead contact, saved searches, alerts, neighborhood context, mortgage/rent affordability tools, and trust/safety controls",
    "manual": "listing freshness, agent lead routing, saved search alerts, mortgage/affordability tools, tours/contact forms, fair-housing copy, location prompts, push alerts, and regional listing coverage",
    "screens": [
      "Search Home",
      "Map Results",
      "List Results",
      "Property Detail",
      "Agent Contact",
      "Saved Homes",
      "Saved Searches",
      "Neighborhood",
      "Affordability",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "PropertyListing",
      "ListingMedia",
      "AgentProfile",
      "LeadRequest",
      "SavedSearch",
      "SavedProperty",
      "NeighborhoodProfile",
      "AffordabilityEstimate",
      "NotificationPreference",
      "ModerationReport"
    ]
  },
  {
    "id": 618,
    "file": "618-trulia.md",
    "name": "Trulia",
    "category": "Real estate and home services",
    "apple": "https://apps.apple.com/us/app/trulia-real-estate-rentals/id288487321",
    "play": "https://play.google.com/store/apps/details?id=com.trulia.android",
    "product": "https://www.trulia.com/",
    "help": "https://support.trulia.com/hc/en-us",
    "privacy": "https://privacy.zillowgroup.com/",
    "terms": "https://www.trulia.com/info/terms/",
    "focus": "home and rental search, map/list results, property details, neighborhood insights, commute and local overlays, agent/property contact, saved searches, alerts, and fair-housing controls",
    "manual": "listing freshness, contact/lead routing, saved search alerts, neighborhood overlays, commute tools, fair-housing copy, location prompts, push alerts, and regional listing coverage",
    "screens": [
      "Search Home",
      "Map Results",
      "List Results",
      "Property Detail",
      "Neighborhood Insights",
      "Commute",
      "Contact Form",
      "Saved Homes",
      "Saved Searches",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "PropertyListing",
      "ListingMedia",
      "NeighborhoodInsight",
      "CommuteEstimate",
      "LeadRequest",
      "SavedSearch",
      "SavedProperty",
      "AgentProfile",
      "NotificationPreference",
      "ModerationReport"
    ]
  },
  {
    "id": 619,
    "file": "619-hotpads.md",
    "name": "HotPads",
    "category": "Real estate and home services",
    "apple": "https://apps.apple.com/us/app/hotpads-apartment-rentals/id345957475",
    "play": "https://play.google.com/store/apps/details?id=com.hotpads.mobile",
    "product": "https://hotpads.com/",
    "help": "https://help.hotpads.com/hc/en-us",
    "privacy": "https://privacy.zillowgroup.com/",
    "terms": "https://hotpads.com/terms",
    "focus": "apartment and rental search, map/list comparison, filters, property details, landlord/contact workflows, saved searches, alerts, commute context, and trust/safety controls",
    "manual": "rental listing freshness, landlord/contact routing, saved search alerts, scam/report workflows, application/deposit handoffs, fair-housing copy, location prompts, push alerts, and regional rental coverage",
    "screens": [
      "Rental Search",
      "Map Results",
      "List Results",
      "Rental Detail",
      "Contact Landlord",
      "Saved Rentals",
      "Saved Searches",
      "Commute",
      "Filters",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "RentalListing",
      "ListingMedia",
      "LandlordProfile",
      "LeadRequest",
      "SavedSearch",
      "SavedRental",
      "CommuteEstimate",
      "FraudReport",
      "NotificationPreference",
      "ModerationReport"
    ]
  },
  {
    "id": 620,
    "file": "620-rent-com.md",
    "name": "Rent.com",
    "category": "Real estate and home services",
    "apple": "https://apps.apple.com/us/app/rent-apartments-and-homes/id388038507",
    "play": "https://play.google.com/store/apps/details?id=com.rent",
    "product": "https://www.rent.com/",
    "help": "https://help.rent.com/hc/en-us",
    "privacy": "https://www.rent.com/privacy-policy",
    "terms": "https://www.rent.com/terms-of-service",
    "focus": "apartment and home rental search, map/list comparison, property detail pages, availability and pricing, tour/contact workflows, saved searches, alerts, renter tools, and trust/safety controls",
    "manual": "availability and price freshness, tour/contact lead routing, saved search alerts, rental applications/deposit handoffs, fair-housing copy, location prompts, push alerts, and regional listing coverage",
    "screens": [
      "Rental Search",
      "Map Results",
      "List Results",
      "Property Detail",
      "Availability",
      "Tour/Contact",
      "Saved Rentals",
      "Saved Searches",
      "Renter Tools",
      "Notifications",
      "Settings",
      "Support"
    ],
    "entities": [
      "RentalListing",
      "UnitAvailability",
      "ListingMedia",
      "PropertyManager",
      "LeadRequest",
      "TourRequest",
      "SavedSearch",
      "SavedRental",
      "AffordabilityEstimate",
      "FraudReport"
    ]
  }
];

function rows(app) {
  return [
    ["Apple App Store listing", app.apple, "iOS listing, category, age rating, privacy labels, release notes, support links", "Public source verified"],
    ["Google Play listing", app.play, "Android listing, content rating, data safety, feature blurbs, update cadence", "Public source verified"],
    ["Official product site", app.product, `Public product orientation for ${app.focus}`, "Public source verified"],
    ["Help/support center", app.help, "Support taxonomy, account, subscriptions, alerts, saved items, provider handoff, contact, privacy, and recovery flows", "Public source verified"],
    ["Privacy policy", app.privacy, "Personal data, location, payment, analytics, retention, export, deletion, and regional privacy rights", "Public source verified"],
    ["Terms/legal terms", app.terms, "Eligibility, acceptable use, subscription or lead terms, cancellation, liability, content, and regional service constraints", "Public source verified"],
  ]
    .map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} |`)
    .join("\n");
}

function spec(app) {
  const isRealEstate = app.category === "Real estate and home services";
  const primary = isRealEstate ? "listing search, property comparison, saved-search alerts, and lead/contact workflow" : "map, forecast, route, alert, sensor, and offline-planning workflow";
  const locationRisk = isRealEstate
    ? "home search locations, saved properties, lead/contact requests, tour preferences, commute context, and household-intent data"
    : "precise location, saved places, route plans, GPS tracks, sensor readings, outdoor activity context, and alert history";
  const paymentRisk = isRealEstate
    ? "lead/contact workflows, listing availability, pricing, deposits/application handoffs, promoted listings, tours, subscriptions, and support cases"
    : "subscriptions, premium map/weather layers, provider data access, purchases, refunds, alerts, saved places, and support cases";
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
- Model location, entitlement, account, notification, support, privacy, and deletion/export behavior explicitly.
- Keep provider/operator/supplier data, forecasts, map layers, listings, availability, ratings, station or property data, and maps synthetic or licensed until approved integrations exist.
- Support accessibility, localization, offline recovery, and safe retry behavior for high-consequence location, alert, lead, and transaction states.

## Non-Goals

- Do not copy ${app.name} branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, ranking systems, route algorithms, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence.
- Do not implement production payments, emergency services, professional weather warnings, regulated navigation, real property applications, deposits, brokerage services, payments, or production provider operations without separate legal/platform/provider review.
- Do not scrape private inventory, private listings, private forecast data or replay undocumented mobile APIs.
- Do not build runtime app code in this spec store.

## Research Sources

| Source | Exact URL | Evidence Used | Status |
|---|---|---|---|
${rows(app)}

## Detailed Design

- Source-backed requirement: the app must provide a mobile home surface that launches directly into ${primary}.
- Source-backed requirement: search and map/list results must expose availability, location, timing, price, alert, subscription, or lead context, and provider/operator caveats before commitment.
- Source-backed requirement: detail pages must separate source-backed public facts from inferred clone data and synthetic seed content.
- Source-backed requirement: alert, route, session, lead, contact, or provider-handoff flows must show availability, freshness, safety warnings, subscription or lead caveats, and provider handoff before the user confirms.
- Source-backed requirement: saved places, saved searches, favorites, alerts, history, receipts, and support cases must be recoverable after app restart.
- Source-backed requirement: notification preferences must distinguish transactional, reminder, disruption, marketing, reward, and safety categories.
- Inferred V1 requirement: local drafts may be queued for low-risk planning edits, but payment, provider handoff, alert delivery, lead submission, route guidance, or account deletion must require fresh server state.
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
- User receives a disruption, price, route, alert, forecast, listing, lead, or session-status notification and lands on the correct recovery screen.
- User denies location, notification, camera, Bluetooth, motion, files, or photos permission and receives a functional fallback.
- User loses connectivity mid-flow, sees local state preserved, and can retry, refresh, or discard without duplicate payments, duplicate alerts, duplicate leads, or duplicate saved items.
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
- \`AuditEvent\`: append-only record for account, payment, alert, route, lead, support, privacy, safety, and entitlement state changes.
- \`LocalCacheRecord\`: device-local record for offline reads, queued low-risk drafts, stale markers, sync attempts, conflict resolution, and cache expiry.

## API And Backend Contracts

- Auth: \`POST /auth/session\`, \`POST /auth/recover\`, \`DELETE /auth/session\`, and \`DELETE /auth/sessions\` with device-scoped session tracking.
- Profile: \`GET /me\`, \`PATCH /me\`, \`GET /privacy/settings\`, \`PATCH /privacy/settings\`, \`POST /data-export\`, and \`DELETE /account\`.
- Search: \`GET /search\` accepts query, coordinates, time window, filters, locale, currency, accessibility needs, safe-mode, and cursor.
- Results: \`GET /results/{id}\` returns source, freshness, availability, price, availability, subscription, or lead caveats, cancellation terms, and localization keys.
- Detail: \`GET /details/{id}\` returns public facts, media-license metadata, synthetic-review markers, provider terms, and user-save state.
- Save/history: \`POST /saved-items\`, \`DELETE /saved-items/{id}\`, \`GET /history\`, and \`DELETE /history/{id}\`.
- Quote: \`POST /quotes\` returns price, availability, subscription, or lead validity, taxes/fees, provider availability, expiration, risk warnings, and idempotency keys.
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
- Queue only low-risk drafts while offline; block payment, provider handoff, alert delivery, lead submission, route guidance, cancellation, and deletion until canonical server state is reachable.
- Realtime transport must reconcile after reconnect and reject duplicate status changes with idempotency keys.
- Push notifications must deep-link into route, alert, forecast, listing, lead, session, receipt, support, privacy, or safety states without exposing sensitive content on the lock screen.
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
- Keep provider/supplier/operator credentials, private APIs, production emergency alerting, regulated navigation, brokerage, listing syndication, lead sale, and payment capabilities out of V1 until approved.
- Use synthetic or licensed sample data only; do not commit real user locations, routes, catches, vessels, flights, property leads, messages, identity documents, or payment artifacts.

## Analytics And Monetization

- Onboarding events: \`onboarding_started\`, \`permission_primer_viewed\`, \`signup_started\`, \`signup_completed\`, and \`onboarding_skipped\` with source, locale, and experiment ids.
- Search events: \`search_started\`, \`filter_changed\`, \`map_moved\`, \`result_opened\`, \`availability_refreshed\`, and \`provider_handoff_started\`.
- Transaction events: \`quote_requested\`, \`quote_expired\`, \`commit_started\`, \`commit_completed\`, \`commit_failed\`, \`receipt_opened\`, and \`refund_requested\`.
- Retention events: \`favorite_saved\`, \`trip_saved\`, \`alert_created\`, \`notification_opened\`, \`history_opened\`, and \`offline_recovered\`.
- Safety events: \`safety_tool_opened\`, \`report_submitted\`, \`support_case_created\`, \`privacy_setting_changed\`, \`data_export_requested\`, and \`account_delete_requested\`.
- Monetization events: \`paywall_viewed\`, \`trial_started\`, \`purchase_started\`, \`purchase_completed\`, \`purchase_failed\`, \`subscription_canceled\`, and \`entitlement_expired\`.
- Monetization model: support original free/trial/paid, referral, reward, premium layer, lead, or subscription mechanics using original naming and synthetic pricing; do not copy exact plan names or promotional copy.
- Analytics rule: never send raw addresses, precise coordinates, route traces, payment credentials, identity documents, private messages, support transcripts, health/disability information, or child data as event properties.

## Edge Cases

- First launch with no network, no account, expired session, unsupported OS, or unavailable region.
- Permission denied, permission later revoked in OS settings, and permission granted after fallback use.
- Search results become stale, sold out, canceled, rerouted, delayed, hidden, region-locked, or provider-unavailable after display.
- Quote expires, fare changes, taxes/fees differ, payment authorization fails, duplicate tap occurs, or webhook delivery repeats.
- Provider handoff opens the wrong locale, currency, or deep link; user returns without confirmed status.
- Live alert/route/session/lead status misses an event and must reconcile from canonical server state.
- Support case, refund, safety report, or privacy request remains active while the account is deleted.
- Subscription restored on another platform, refunded externally, expired offline, or unavailable in the user's region.
- Map data, transit data, vehicle location, accommodation inventory, reviews, or place metadata has conflicting providers or missing accessibility attributes.
- User-generated content, reviews, rides, listings, or messages are spam, abusive, fraudulent, unsafe, or policy-violating.
- Device clock/time zone changes during booking, alert timing, forecast window, route timing, listing availability, lead response, or offer expiration.
- App terminated during payment, alert creation, lead submission, upload, route navigation, GPS tracking, or cancellation.

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
- Which providers will supply maps, weather data, route data, listings, lead/contact workflows, payments, identity, notification, analytics, and support services for the original clone?
- Which public-source claims need a dedicated research note before downstream implementation starts?
- Which features should be excluded from V1 because they require regulated review, production partnerships, hardware access, safety operations, or legal approval?
- What retention periods apply to ${locationRisk}, support cases, receipts, and audit records in each launch region?

## Build Plan

- Phase 1: Build the route map, design system, synthetic seed-data policy, source-provenance model, and legal asset guardrails.
- Phase 2: Implement onboarding, auth shell, home, search, map/list results, detail, saved/history, and settings with original copy.
- Phase 3: Add alert, route, track, lead/contact, session, and subscription shells, receipts, notification preferences, entitlement states, and support flows with blocked production-provider integrations.
- Phase 4: Add backend contracts, offline/retry handling, realtime reconciliation, stale-data markers, privacy export/delete, and audit events.
- Phase 5: Add safety/reporting, fraud-hold, provider-dispute, refund/cancellation, accessibility, localization, and regional-availability test coverage.
- Phase 6: Integrate approved providers only after legal/platform review; keep production emergency alerting, regulated navigation, brokerage, listing syndication, lead sale, and payment disabled until approved.
- Phase 7: Conduct lawful hands-on verification for ${app.manual}, then update this spec with evidence before any one-for-one parity claim.

## Next Steps

- Keep this spec as the source contract for a downstream private scaffold until hands-on verification clears the listed blockers.
- Capture public-source research notes for marketplace privacy labels, release notes, support taxonomy, and user-review themes without committing proprietary media.
- Select synthetic or licensed data providers for maps, routes, forecasts, listings, provider data, reviews, and notifications before implementation.
- Extend the Phase 5 implementation-plan queue and repo-seeding manifest only after the relevant promoted ID range is reconciled.
`;
}

for (const app of apps) {
  writeFileSync(join(process.cwd(), "specs", "batch-31", app.file), spec(app));
}

console.log(`Promoted ${apps.length} specs in specs/batch-31.`);
